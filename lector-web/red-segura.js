'use strict';

// Red segura: validación de direcciones de destino y descarga HTTPS con límites (RF-004 a RF-008).
// Solo módulos nativos de Node.js.

const dns = require('node:dns');
const https = require('node:https');
const net = require('node:net');
const zlib = require('node:zlib');
const { CODIGOS_FALLO: C } = require('./resultado');

class ErrorLector extends Error {
  constructor(codigo, detalle = {}) {
    super(codigo);
    this.name = 'ErrorLector';
    this.codigoFallo = codigo;
    this.detalle = detalle;
  }
}

// ---------- Rangos prohibidos (D-05) ----------

const RANGOS_V4 = [
  ['0.0.0.0', 8],
  ['10.0.0.0', 8],
  ['100.64.0.0', 10],
  ['127.0.0.0', 8],
  ['169.254.0.0', 16],
  ['172.16.0.0', 12],
  ['192.0.0.0', 24],
  ['192.0.2.0', 24],
  ['192.168.0.0', 16],
  ['198.18.0.0', 15],
  ['198.51.100.0', 24],
  ['203.0.113.0', 24],
  ['224.0.0.0', 4],
  ['240.0.0.0', 4],
];

function parseIPv4(texto) {
  if (!net.isIPv4(texto)) return null;
  return texto.split('.').map(Number);
}

function aEntero(octetos) {
  return ((octetos[0] << 24) | (octetos[1] << 16) | (octetos[2] << 8) | octetos[3]) >>> 0;
}

const RANGOS_V4_ENTEROS = RANGOS_V4.map(([base, bits]) => ({
  base: aEntero(parseIPv4(base)),
  mascara: bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0,
}));

function v4Prohibida(octetos) {
  const n = aEntero(octetos);
  return RANGOS_V4_ENTEROS.some((r) => ((n & r.mascara) >>> 0) === ((r.base & r.mascara) >>> 0));
}

function parseIPv6(entrada) {
  let s = entrada.split('%')[0];
  if (!net.isIPv6(s)) return null;
  const incrustada = s.match(/^(.*:)(\d+\.\d+\.\d+\.\d+)$/);
  if (incrustada) {
    const p = parseIPv4(incrustada[2]);
    if (!p) return null;
    s = `${incrustada[1]}${((p[0] << 8) | p[1]).toString(16)}:${((p[2] << 8) | p[3]).toString(16)}`;
  }
  let grupos;
  if (s.includes('::')) {
    const [izq, der] = s.split('::');
    const a = izq ? izq.split(':') : [];
    const b = der ? der.split(':') : [];
    const faltan = 8 - a.length - b.length;
    if (faltan < 0) return null;
    grupos = [...a, ...Array(faltan).fill('0'), ...b];
  } else {
    grupos = s.split(':');
  }
  if (grupos.length !== 8) return null;
  const valores = grupos.map((g) => parseInt(g || '0', 16));
  return valores.some((v) => Number.isNaN(v)) ? null : valores;
}

function v4Incrustada(g, a, b) {
  return [g[a] >> 8, g[a] & 255, g[b] >> 8, g[b] & 255];
}

function v6Prohibida(g) {
  // IPv4 mapeada (::ffff:a.b.c.d) o compatible (::a.b.c.d); incluye :: y ::1
  if (g.slice(0, 5).every((v) => v === 0) && (g[5] === 0 || g[5] === 0xffff)) {
    return v4Prohibida(v4Incrustada(g, 6, 7));
  }
  // NAT64 (64:ff9b::/96)
  if (g[0] === 0x64 && g[1] === 0xff9b && g.slice(2, 6).every((v) => v === 0)) {
    return v4Prohibida(v4Incrustada(g, 6, 7));
  }
  // 6to4 (2002::/16)
  if (g[0] === 0x2002) return v4Prohibida(v4Incrustada(g, 1, 2));
  if ((g[0] & 0xfe00) === 0xfc00) return true; // fc00::/7 local única
  if ((g[0] & 0xffc0) === 0xfe80) return true; // fe80::/10 enlace local
  if ((g[0] & 0xffc0) === 0xfec0) return true; // fec0::/10 sitio local (obsoleta)
  if ((g[0] & 0xff00) === 0xff00) return true; // ff00::/8 multidifusión
  if (g[0] === 0x2001 && g[1] === 0x0db8) return true; // documentación
  if (g[0] === 0x2001 && g[1] === 0) return true; // Teredo
  if (g[0] === 0x0100 && g[1] === 0 && g[2] === 0 && g[3] === 0) return true; // descarte
  return false;
}

function esLoopback(direccion) {
  const v4 = parseIPv4(direccion);
  if (v4) return v4[0] === 127;
  const v6 = parseIPv6(direccion);
  if (!v6) return false;
  if (v6.slice(0, 7).every((v) => v === 0) && v6[7] === 1) return true;
  if (v6.slice(0, 5).every((v) => v === 0) && v6[5] === 0xffff) return (v6[6] >> 8) === 127;
  return false;
}

// Cierra por defecto: una dirección que no se puede interpretar se considera prohibida.
// `permitirLoopback` es una opción exclusiva de pruebas y solo exonera 127.0.0.0/8 y ::1.
function esDireccionProhibida(direccion, { permitirLoopback = false } = {}) {
  if (typeof direccion !== 'string') return true;
  if (permitirLoopback && esLoopback(direccion)) return false;
  const v4 = parseIPv4(direccion);
  if (v4) return v4Prohibida(v4);
  const v6 = parseIPv6(direccion);
  if (v6) return v6Prohibida(v6);
  return true;
}

// ---------- Resolución validada ----------

function resolutorPorDefecto(host) {
  return dns.promises.lookup(host, { all: true, verbatim: true });
}

async function validarDestino(host, { resolver = resolutorPorDefecto, permitirLoopback = false } = {}) {
  let lista;
  try {
    lista = await resolver(host);
  } catch (e) {
    throw new ErrorLector(C.FUENTE_NO_DISPONIBLE, { motivo: 'No se pudo resolver el dominio', causa: e.code || e.message });
  }
  if (!Array.isArray(lista) || lista.length === 0) {
    throw new ErrorLector(C.FUENTE_NO_DISPONIBLE, { motivo: 'El dominio no tiene direcciones' });
  }
  for (const d of lista) {
    if (esDireccionProhibida(d.address, { permitirLoopback })) {
      throw new ErrorLector(C.DESTINO_NO_PUBLICO, { dominio: host, direccion: d.address });
    }
  }
  return lista;
}

// Función `lookup` para https.request: valida TODAS las direcciones en el momento de conectar y entrega
// a la conexión esa misma dirección, lo que impide el cambio de DNS entre la validación y la conexión (D-02).
// Atiende ambos modos de llamada: una dirección o todas (`all: true`).
function crearLookup({ resolver = resolutorPorDefecto, permitirLoopback = false } = {}) {
  return function lookupSeguro(hostname, opciones, callback) {
    if (typeof opciones === 'function') {
      callback = opciones;
      opciones = {};
    }
    opciones = opciones || {};
    validarDestino(hostname, { resolver, permitirLoopback }).then(
      (lista) => {
        const normal = lista.map((d) => ({
          address: d.address,
          family: d.family || (net.isIPv6(d.address) ? 6 : 4),
        }));
        if (opciones.all) callback(null, normal);
        else callback(null, normal[0].address, normal[0].family);
      },
      (err) => callback(err)
    );
  };
}

// ---------- Descarga ----------

const RE_TLS = /^(CERT_|DEPTH_ZERO|SELF_SIGNED|UNABLE_TO_(VERIFY|GET)|ERR_TLS_CERT|HOSTNAME_MISMATCH)/;

function mapearError(err) {
  if (err instanceof ErrorLector) return err;
  const codigo = err && err.code ? String(err.code) : '';
  if (RE_TLS.test(codigo)) return new ErrorLector(C.CERTIFICADO_INVALIDO, { causa: codigo });
  return new ErrorLector(C.FUENTE_NO_DISPONIBLE, { causa: codigo || (err && err.message) || 'error de red' });
}

const REDIRECCIONES = [301, 302, 303, 307, 308];

// Descarga real. Una sola petición, sin seguir redirecciones: el orquestador revalida cada salto.
// Devuelve { estado, cabeceras, cuerpo, bytesRecibidos } o { estado, cabeceras, redireccion }.
function descargarReal({ url, timeoutMs, maxBytes, userAgent, lookup, opcionesRedPrueba = {} }) {
  return new Promise((resolve, reject) => {
    let terminado = false;
    let temporizador = null;
    let req = null;
    const finalizar = (fn, valor) => {
      if (terminado) return;
      terminado = true;
      clearTimeout(temporizador);
      fn(valor);
    };
    const abortar = (err) => {
      if (req) req.destroy();
      finalizar(reject, err);
    };

    const opciones = {
      protocol: 'https:',
      hostname: url.hostname,
      port: opcionesRedPrueba.puerto || 443,
      path: `${url.pathname}${url.search}`,
      method: 'GET',
      headers: {
        'User-Agent': userAgent,
        Accept: 'text/html, application/xhtml+xml, text/plain;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        Connection: 'close',
      },
      lookup,
      agent: false,
      servername: url.hostname,
      rejectUnauthorized: true,
    };
    if (opcionesRedPrueba.ca) opciones.ca = opcionesRedPrueba.ca;

    temporizador = setTimeout(() => abortar(new ErrorLector(C.TIEMPO_AGOTADO, { timeoutMs })), Math.max(1, timeoutMs));

    req = https.request(opciones, (res) => {
      const estado = res.statusCode;
      const cabeceras = res.headers;

      if (REDIRECCIONES.includes(estado) && cabeceras.location) {
        res.resume();
        return finalizar(resolve, { estado, cabeceras, redireccion: String(cabeceras.location) });
      }

      const declarado = Number(cabeceras['content-length']);
      if (Number.isFinite(declarado) && declarado > maxBytes) {
        return abortar(new ErrorLector(C.TAMANO_EXCEDIDO, { maxBytes, declarado }));
      }

      const codificacion = String(cabeceras['content-encoding'] || 'identity').toLowerCase().trim();
      let descompresor = null;
      if (codificacion === 'gzip' || codificacion === 'x-gzip') descompresor = zlib.createGunzip();
      else if (codificacion === 'deflate') descompresor = zlib.createInflate();
      else if (codificacion === 'br') descompresor = zlib.createBrotliDecompress();
      else if (codificacion !== 'identity' && codificacion !== '') {
        return abortar(new ErrorLector(C.FORMATO_NO_SOPORTADO, { codificacion }));
      }

      let crudos = 0;
      let descomprimidos = 0;
      const partes = [];
      const fallaContenido = () => {
        if (descompresor) descompresor.destroy();
        abortar(new ErrorLector(C.FUENTE_NO_DISPONIBLE, { motivo: 'Contenido interrumpido o corrupto' }));
      };

      res.on('data', (trozo) => {
        crudos += trozo.length;
        if (crudos > maxBytes) {
          if (descompresor) descompresor.destroy();
          abortar(new ErrorLector(C.TAMANO_EXCEDIDO, { maxBytes }));
        }
      });
      res.on('error', fallaContenido);
      res.on('close', () => {
        if (!res.complete) fallaContenido();
      });

      const lector = descompresor ? res.pipe(descompresor) : res;
      // El límite se cuenta manualmente sobre los bytes descomprimidos: no se depende de maxOutputLength (D-07).
      lector.on('data', (trozo) => {
        descomprimidos += trozo.length;
        if (descomprimidos > maxBytes) {
          res.destroy();
          if (descompresor) descompresor.destroy();
          return abortar(new ErrorLector(C.TAMANO_EXCEDIDO, { maxBytes, descomprimido: true }));
        }
        partes.push(trozo);
      });
      lector.on('end', () =>
        finalizar(resolve, { estado, cabeceras, cuerpo: Buffer.concat(partes), bytesRecibidos: crudos })
      );
      if (descompresor) descompresor.on('error', fallaContenido);
    });

    req.on('error', (err) => finalizar(reject, mapearError(err)));
    req.end();
  });
}

module.exports = {
  ErrorLector,
  esDireccionProhibida,
  validarDestino,
  crearLookup,
  descargarReal,
  mapearError,
  parseIPv6,
};
