'use strict';

// Resultados del lector web oficial.
// La vigencia es una constante: ninguna función de este módulo acepta otro valor (RF-011, D-11).

const ESTADO_VIGENCIA = 'PENDIENTE_VERIFICACION';
const TRATAMIENTO = 'DATO_NO_CONFIABLE';

const CODIGOS_FALLO = Object.freeze({
  URL_INVALIDA: 'URL_INVALIDA',
  FUENTE_NO_AUTORIZADA: 'FUENTE_NO_AUTORIZADA',
  DESTINO_NO_PUBLICO: 'DESTINO_NO_PUBLICO',
  DEMASIADAS_REDIRECCIONES: 'DEMASIADAS_REDIRECCIONES',
  TAMANO_EXCEDIDO: 'TAMANO_EXCEDIDO',
  TIEMPO_AGOTADO: 'TIEMPO_AGOTADO',
  CERTIFICADO_INVALIDO: 'CERTIFICADO_INVALIDO',
  FUENTE_NO_DISPONIBLE: 'FUENTE_NO_DISPONIBLE',
  DESAFIO_ANTIROBOT: 'DESAFIO_ANTIROBOT',
  FORMATO_NO_SOPORTADO: 'FORMATO_NO_SOPORTADO',
  SIN_TEXTO: 'SIN_TEXTO',
  LECTOR_DESHABILITADO: 'LECTOR_DESHABILITADO',
});

const MENSAJES = Object.freeze({
  URL_INVALIDA:
    'La dirección no es válida o no cumple las condiciones de seguridad (solo https, puerto 443, sin usuario ni contraseña).',
  FUENTE_NO_AUTORIZADA:
    'El dominio no está en la lista de fuentes oficiales autorizadas y activas. No se leyó su contenido. Consulte la fuente directamente o solicite su verificación y activación.',
  DESTINO_NO_PUBLICO:
    'La dirección resuelve a un destino de red no público. Por seguridad no se realizó la lectura.',
  DEMASIADAS_REDIRECCIONES:
    'La página encadenó más redirecciones de las permitidas o entró en un ciclo. No se realizó la lectura.',
  TAMANO_EXCEDIDO:
    'El contenido supera el tamaño máximo permitido. No se entrega contenido parcial.',
  TIEMPO_AGOTADO:
    'La fuente no respondió dentro del tiempo máximo permitido. No se entrega contenido parcial.',
  CERTIFICADO_INVALIDO:
    'El certificado de seguridad del sitio no pudo verificarse. No se continuó con la lectura.',
  FUENTE_NO_DISPONIBLE:
    'La fuente no está disponible o devolvió un error. Consulte el sitio oficial más tarde o por otro medio.',
  DESAFIO_ANTIROBOT:
    'El sitio presentó una verificación interactiva (anti-robot) y no se obtuvo el contenido. Consulte la fuente manualmente.',
  FORMATO_NO_SOPORTADO:
    'El formato del contenido no está soportado. Los PDF y otros formatos están fuera de la versión 1 del lector; consulte el documento manualmente en la fuente oficial.',
  SIN_TEXTO:
    'La página no contiene texto extraíble. No se devuelve un resultado vacío como éxito.',
  LECTOR_DESHABILITADO:
    'El lector web está deshabilitado o su configuración no es válida.',
});

function congelar(obj) {
  return Object.freeze(obj);
}

function fallo(codigo, detalle = {}, mensaje = null) {
  if (!Object.prototype.hasOwnProperty.call(CODIGOS_FALLO, codigo)) {
    throw new Error(`Código de fallo desconocido: ${codigo}`);
  }
  return congelar({
    ok: false,
    codigo,
    mensaje: mensaje || MENSAJES[codigo],
    detalle: congelar({ ...detalle }),
  });
}

// El estado de vigencia y el tratamiento se fijan al final: cualquier valor recibido en
// `metadatos` se sobrescribe.
function resultadoExitoso({ texto, metadatos, advertencias = [] }) {
  return congelar({
    ok: true,
    texto,
    metadatos: congelar({
      ...metadatos,
      redirecciones: congelar([...(metadatos.redirecciones || [])]),
      estadoVigencia: ESTADO_VIGENCIA,
      tratamiento: TRATAMIENTO,
    }),
    advertencias: congelar([...advertencias]),
  });
}

module.exports = {
  ESTADO_VIGENCIA,
  TRATAMIENTO,
  CODIGOS_FALLO,
  MENSAJES,
  fallo,
  resultadoExitoso,
};
