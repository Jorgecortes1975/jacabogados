'use strict';

// Carga y validación de la configuración `lectorWeb` y coincidencia de dominios (RF-001, RF-002, RF-014).
// Falla cerrada: una configuración inválida deshabilita el lector.

const fs = require('node:fs');
const net = require('node:net');

const DEFAULTS = Object.freeze({
  maxBytes: 5 * 1024 * 1024,
  timeoutMs: 20000,
  maxRedirecciones: 3,
  userAgent: 'JAC-LectorWebOficial/1.0',
  rutaAuditoria: 'logs/lector-web-auditoria.jsonl',
});

const CLAVES_CONFIG = ['enabled', 'maxBytes', 'timeoutMs', 'maxRedirecciones', 'userAgent', 'rutaAuditoria', 'dominios'];
const CLAVES_DOMINIO = [
  'host',
  'autoridad',
  'incluyeSubdominios',
  'transporteRelacionado',
  'activo',
  'verificadoEn',
  'fuenteVerificacion',
  'notas',
];

const RE_HOST = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/;
const RE_FECHA = /^\d{4}-\d{2}-\d{2}$/;

function esObjeto(v) {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

function entero(v, min, max) {
  return Number.isInteger(v) && v >= min && v <= max;
}

function claveDesconocida(obj, permitidas) {
  return Object.keys(obj).find((k) => !permitidas.includes(k)) || null;
}

function hostValido(host) {
  if (typeof host !== 'string' || host.length > 253) return false;
  if (!RE_HOST.test(host)) return false;
  if (net.isIP(host)) return false;
  const ultima = host.split('.').pop();
  return !/^\d+$/.test(ultima);
}

function fechaValida(v) {
  return typeof v === 'string' && RE_FECHA.test(v) && !Number.isNaN(Date.parse(`${v}T00:00:00Z`));
}

function validarDominio(d, i) {
  const ref = `dominios[${i}]`;
  if (!esObjeto(d)) return `${ref} debe ser un objeto`;
  const extra = claveDesconocida(d, CLAVES_DOMINIO);
  if (extra) return `${ref} contiene la propiedad no permitida "${extra}"`;
  if (!hostValido(d.host)) return `${ref}.host no es un nombre de dominio válido (minúsculas, sin esquema, puerto, ruta ni IP)`;
  if (typeof d.autoridad !== 'string' || d.autoridad.trim().length < 3) return `${ref}.autoridad es obligatoria`;
  if (typeof d.activo !== 'boolean') return `${ref}.activo debe ser booleano`;
  if (d.incluyeSubdominios !== undefined && typeof d.incluyeSubdominios !== 'boolean') {
    return `${ref}.incluyeSubdominios debe ser booleano`;
  }
  if (d.transporteRelacionado !== undefined && typeof d.transporteRelacionado !== 'string') {
    return `${ref}.transporteRelacionado debe ser texto`;
  }
  if (d.notas !== undefined && typeof d.notas !== 'string') return `${ref}.notas debe ser texto`;
  if (d.verificadoEn !== undefined && d.verificadoEn !== null && !fechaValida(d.verificadoEn)) {
    return `${ref}.verificadoEn debe ser una fecha AAAA-MM-DD`;
  }
  if (d.fuenteVerificacion !== undefined && d.fuenteVerificacion !== null &&
      (typeof d.fuenteVerificacion !== 'string' || d.fuenteVerificacion.trim().length < 5)) {
    return `${ref}.fuenteVerificacion debe ser una referencia de al menos 5 caracteres`;
  }
  if (d.activo === true) {
    if (!fechaValida(d.verificadoEn) || typeof d.fuenteVerificacion !== 'string' || d.fuenteVerificacion.trim().length < 5) {
      return `${ref} no puede estar activo sin verificadoEn y fuenteVerificacion`;
    }
  }
  return null;
}

// Devuelve { ok: true, config } o { ok: false, motivo }.
function validarConfiguracion(raw) {
  if (!esObjeto(raw)) return { ok: false, motivo: 'No existe la clave lectorWeb o no es un objeto' };
  const extra = claveDesconocida(raw, CLAVES_CONFIG);
  if (extra) return { ok: false, motivo: `Propiedad no permitida en lectorWeb: "${extra}"` };
  if (typeof raw.enabled !== 'boolean') return { ok: false, motivo: 'lectorWeb.enabled debe ser booleano' };
  if (!Array.isArray(raw.dominios)) return { ok: false, motivo: 'lectorWeb.dominios debe ser una lista' };

  const cfg = { ...DEFAULTS, ...raw };
  if (!entero(cfg.maxBytes, 1024, 20 * 1024 * 1024)) return { ok: false, motivo: 'lectorWeb.maxBytes fuera de rango (1024 a 20971520)' };
  if (!entero(cfg.timeoutMs, 1000, 60000)) return { ok: false, motivo: 'lectorWeb.timeoutMs fuera de rango (1000 a 60000)' };
  if (!entero(cfg.maxRedirecciones, 0, 5)) return { ok: false, motivo: 'lectorWeb.maxRedirecciones fuera de rango (0 a 5)' };
  if (typeof cfg.userAgent !== 'string' || !cfg.userAgent) return { ok: false, motivo: 'lectorWeb.userAgent debe ser texto' };
  if (typeof cfg.rutaAuditoria !== 'string' || !cfg.rutaAuditoria) return { ok: false, motivo: 'lectorWeb.rutaAuditoria debe ser texto' };

  const vistos = new Set();
  for (let i = 0; i < raw.dominios.length; i++) {
    const motivo = validarDominio(raw.dominios[i], i);
    if (motivo) return { ok: false, motivo };
    const host = raw.dominios[i].host;
    if (vistos.has(host)) return { ok: false, motivo: `Dominio duplicado: ${host}` };
    vistos.add(host);
  }
  return { ok: true, config: cfg };
}

class ListaAutorizada {
  constructor(dominios) {
    this._dominios = dominios.map((d) =>
      Object.freeze({
        host: d.host,
        autoridad: d.autoridad,
        incluyeSubdominios: d.incluyeSubdominios === true,
        activo: d.activo === true,
        verificadoEn: d.verificadoEn || null,
        fuenteVerificacion: d.fuenteVerificacion || null,
        transporteRelacionado: d.transporteRelacionado || null,
      })
    );
  }

  // Coincidencia exacta del host, o subdominio solo si la entrada lo declara (RF-002).
  // Las entradas inactivas se ignoran.
  coincidir(host) {
    if (typeof host !== 'string' || !host) return null;
    const h = host.toLowerCase();
    for (const e of this._dominios) {
      if (!e.activo) continue;
      if (h === e.host) return e;
      if (e.incluyeSubdominios && h.endsWith(`.${e.host}`)) return e;
    }
    return null;
  }

  todas() {
    return this._dominios;
  }

  activos() {
    return this._dominios.filter((d) => d.activo);
  }
}

function cargarDesdeArchivo(rutaConfig) {
  let json;
  try {
    json = JSON.parse(fs.readFileSync(rutaConfig, 'utf8'));
  } catch (e) {
    return { ok: false, motivo: `No se pudo leer ${rutaConfig}: ${e.message}` };
  }
  return validarConfiguracion(json.lectorWeb);
}

module.exports = { DEFAULTS, validarConfiguracion, ListaAutorizada, cargarDesdeArchivo };
