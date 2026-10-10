'use strict';

// Lector web de fuentes oficiales colombianas (spec 002).
// Lee una página solo si su dominio está en la lista autorizada y activa de `mcp-config.json`,
// descarga directamente (sin servicios de terceros), valida el destino de red, limita tamaño y tiempo,
// extrae el texto y devuelve trazabilidad. La vigencia siempre queda PENDIENTE_VERIFICACION.

const crypto = require('node:crypto');
const path = require('node:path');

const { validarUrl } = require('./validacion-url');
const { validarConfiguracion, cargarDesdeArchivo, ListaAutorizada } = require('./lista-autorizada');
const { ErrorLector, validarDestino, crearLookup, descargarReal } = require('./red-segura');
const ext = require('./extraccion-texto');
const { Auditoria } = require('./auditoria');
const { ESTADO_VIGENCIA, CODIGOS_FALLO: C, fallo, resultadoExitoso } = require('./resultado');

const RAIZ = path.join(__dirname, '..');
const TIPOS_HTML = ['text/html', 'application/xhtml+xml'];
const TIPOS_TEXTO = ['text/plain'];

function sha256(datos) {
  return crypto.createHash('sha256').update(datos).digest('hex');
}

function conTiempo(promesa, ms) {
  let temporizador;
  const limite = new Promise((_, rechazar) => {
    temporizador = setTimeout(() => rechazar(new ErrorLector(C.TIEMPO_AGOTADO, { timeoutMs: ms })), Math.max(1, ms));
  });
  return Promise.race([promesa, limite]).finally(() => clearTimeout(temporizador));
}

function opcionesPrueba(entrada) {
  const o = entrada && typeof entrada === 'object' ? entrada : {};
  return Object.freeze({
    puerto: Number.isInteger(o.puerto) && o.puerto > 0 && o.puerto < 65536 ? o.puerto : undefined,
    ca: o.ca || undefined,
    permitirLoopback: o.permitirLoopback === true,
  });
}

class LectorWebOficial {
  // opciones: config, resolver, requestFn, ahora, rutaAuditoria, opcionesRedPrueba (exclusiva de pruebas)
  constructor(opciones = {}) {
    this._ahora = opciones.ahora || (() => new Date());
    this._resolver = opciones.resolver || undefined;
    this._requestFn = opciones.requestFn || descargarReal;
    // Solo se lee del constructor; nunca de mcp-config.json (el esquema rechaza esas claves).
    this._opcionesRed = opcionesPrueba(opciones.opcionesRedPrueba);

    const validacion =
      opciones.config !== undefined
        ? validarConfiguracion(opciones.config)
        : cargarDesdeArchivo(path.join(RAIZ, 'mcp-config.json'));

    this._habilitado = false;
    this._motivo = null;
    this._config = null;
    this._lista = new ListaAutorizada([]);
    this._auditoria = null;

    if (!validacion.ok) {
      this._motivo = validacion.motivo;
    } else {
      this._config = validacion.config;
      this._lista = new ListaAutorizada(validacion.config.dominios);
      if (!validacion.config.enabled) {
        this._motivo = 'El lector está deshabilitado en la configuración (lectorWeb.enabled = false)';
      } else {
        this._habilitado = true;
      }
      const ruta = opciones.rutaAuditoria || path.resolve(RAIZ, validacion.config.rutaAuditoria);
      this._auditoria = new Auditoria(ruta, this._ahora);
    }
  }

  estado() {
    return {
      habilitado: this._habilitado,
      motivo: this._motivo,
      dominiosActivos: this._lista.activos().length,
    };
  }

  fuentesAutorizadas() {
    return this._lista.todas().map((d) => ({
      host: d.host,
      autoridad: d.autoridad,
      incluyeSubdominios: d.incluyeSubdominios,
      activo: d.activo,
      verificadoEn: d.verificadoEn,
    }));
  }

  // Nunca lanza por causas esperadas: siempre devuelve un objeto con `ok`.
  async leer(entrada) {
    const inicio = Date.now();
    let resultado;
    let dominio = null;
    try {
      const interno = await this._leerInterno(entrada);
      resultado = interno.resultado;
      dominio = interno.dominio;
    } catch (e) {
      resultado = e instanceof ErrorLector
        ? fallo(e.codigoFallo, e.detalle)
        : fallo(C.FUENTE_NO_DISPONIBLE, { causa: (e && e.message) || 'error inesperado' });
    }

    const escrito = this._auditoria
      ? this._auditoria.registrar({
          urlSolicitada: typeof entrada === 'string' ? entrada : null,
          dominio,
          resultado: resultado.ok ? 'OK' : 'FALLO',
          codigo: resultado.ok ? null : resultado.codigo,
          hashContenido: resultado.ok ? resultado.metadatos.hashContenido : null,
          duracionMs: Date.now() - inicio,
        })
      : true;

    if (!escrito && resultado.ok) {
      return resultadoExitoso({
        texto: resultado.texto,
        metadatos: resultado.metadatos,
        advertencias: [...resultado.advertencias, 'No se pudo escribir el registro de auditoría de esta lectura.'],
      });
    }
    return resultado;
  }

  async _leerInterno(entrada) {
    if (!this._habilitado) {
      return {
        resultado: fallo(C.LECTOR_DESHABILITADO, { motivo: this._motivo }, `${fallo(C.LECTOR_DESHABILITADO).mensaje} Motivo: ${this._motivo}`),
        dominio: null,
      };
    }
    const cfg = this._config;
    const v = validarUrl(entrada);
    if (!v.ok) return { resultado: fallo(C.URL_INVALIDA, { motivo: v.motivo }), dominio: null };

    const solicitada = v.url.href;
    const limite = Date.now() + cfg.timeoutMs;
    const redirecciones = [];
    const visitadas = new Set([solicitada]);
    const permitirLoopback = this._opcionesRed.permitirLoopback;
    const lookup = crearLookup({ resolver: this._resolver, permitirLoopback });

    let actual = v.url;
    let respuesta = null;
    let entradaLista = null;

    for (let salto = 0; ; salto++) {
      entradaLista = this._lista.coincidir(actual.hostname);
      if (!entradaLista) {
        return {
          resultado: fallo(C.FUENTE_NO_AUTORIZADA, { dominio: actual.hostname, trasRedireccion: salto > 0 }),
          dominio: actual.hostname,
        };
      }

      const restante = limite - Date.now();
      if (restante <= 0) throw new ErrorLector(C.TIEMPO_AGOTADO, { timeoutMs: cfg.timeoutMs });

      // Verificación previa del destino: falla antes de abrir ningún socket. La conexión real vuelve a
      // validar en `lookup` en el momento de conectar (D-02).
      await conTiempo(validarDestino(actual.hostname, { resolver: this._resolver, permitirLoopback }), restante);

      respuesta = await this._requestFn({
        url: actual,
        timeoutMs: Math.max(1, limite - Date.now()),
        maxBytes: cfg.maxBytes,
        userAgent: cfg.userAgent,
        lookup,
        opcionesRedPrueba: this._opcionesRed,
      });

      if (!respuesta.redireccion) break;

      if (salto >= cfg.maxRedirecciones) {
        throw new ErrorLector(C.DEMASIADAS_REDIRECCIONES, { maxRedirecciones: cfg.maxRedirecciones });
      }
      let siguiente;
      try {
        siguiente = new URL(respuesta.redireccion, actual).href;
      } catch {
        throw new ErrorLector(C.URL_INVALIDA, { motivo: 'Redirección con dirección no interpretable' });
      }
      const vs = validarUrl(siguiente);
      if (!vs.ok) throw new ErrorLector(C.URL_INVALIDA, { motivo: `Redirección no permitida: ${vs.motivo}` });
      if (visitadas.has(vs.url.href)) throw new ErrorLector(C.DEMASIADAS_REDIRECCIONES, { ciclo: true });
      visitadas.add(vs.url.href);
      redirecciones.push(vs.url.href);
      actual = vs.url;
    }

    return { resultado: this._procesar(respuesta, { solicitada, actual, entradaLista, redirecciones, cfg }), dominio: actual.hostname };
  }

  _procesar(resp, { solicitada, actual, entradaLista, redirecciones, cfg }) {
    const cuerpo = Buffer.isBuffer(resp.cuerpo) ? resp.cuerpo : Buffer.from(resp.cuerpo || '');
    const estado = resp.estado;
    const cabeceras = resp.cabeceras || {};
    const tipoDeclarado = String(cabeceras['content-type'] || '');
    const tipo = tipoDeclarado.split(';')[0].trim().toLowerCase();
    const muestra = cuerpo.subarray(0, 8192).toString('latin1');

    if (cuerpo.length > cfg.maxBytes) throw new ErrorLector(C.TAMANO_EXCEDIDO, { maxBytes: cfg.maxBytes });

    if (ext.esDesafioAntirobot(estado, muestra)) {
      return fallo(C.DESAFIO_ANTIROBOT, { estadoHttp: estado });
    }
    if (estado < 200 || estado >= 300) {
      return fallo(C.FUENTE_NO_DISPONIBLE, { estadoHttp: estado });
    }
    if (ext.esPdf(cuerpo, tipoDeclarado)) {
      return fallo(
        C.FORMATO_NO_SOPORTADO,
        { tipo: 'pdf', tipoDeclarado: tipo },
        'El documento es un PDF. Los PDF están fuera de la versión 1 del lector; consulte el documento manualmente en la fuente oficial.'
      );
    }

    let esHtml = TIPOS_HTML.includes(tipo);
    const esTexto = TIPOS_TEXTO.includes(tipo);
    if (!esHtml && !esTexto) {
      if (!tipo && /^\s*(<!doctype html|<html|<head|<body)/i.test(muestra)) esHtml = true;
      else return fallo(C.FORMATO_NO_SOPORTADO, { tipoDeclarado: tipo || null });
    }

    const dec = ext.decodificar(cuerpo, tipoDeclarado);
    const extraido = esHtml ? ext.htmlATexto(dec.texto) : { texto: ext.textoPlano(dec.texto), advertencias: [] };
    const advertencias = [...dec.advertencias, ...extraido.advertencias];

    if (extraido.texto.length < ext.MIN_TEXTO) return fallo(C.SIN_TEXTO, { caracteres: extraido.texto.length });
    if (extraido.texto.length < ext.AVISO_TEXTO_CORTO) {
      advertencias.push('El texto extraído es muy corto; verifique en la fuente que la página se leyó completa.');
    }

    return resultadoExitoso({
      texto: extraido.texto,
      metadatos: {
        autoridad: entradaLista.autoridad,
        dominio: actual.hostname,
        urlSolicitada: solicitada,
        urlFinal: actual.href,
        redirecciones,
        fechaConsulta: this._ahora().toISOString(),
        estadoHttp: estado,
        tipoContenido: tipo || 'desconocido',
        bytes: cuerpo.length,
        // Huella del contenido ya descomprimido: no depende de la compresión de transporte.
        hashContenido: sha256(cuerpo),
        hashTexto: sha256(extraido.texto),
      },
      advertencias,
    });
  }
}

module.exports = {
  LectorWebOficial,
  ESTADO_VIGENCIA,
  CODIGOS_FALLO: C,
};
