'use strict';

// Normalización y validación de la dirección solicitada (RF-006).
// Solo https, puerto 443, sin credenciales y sin direcciones IP escritas directamente.

const net = require('node:net');

const MAX_LONGITUD = 2048;

function invalida(motivo) {
  return { ok: false, motivo };
}

// Devuelve { ok: true, url } con una URL normalizada y sin fragmento, o { ok: false, motivo }.
function validarUrl(entrada) {
  if (typeof entrada !== 'string') return invalida('La dirección debe ser texto');
  const texto = entrada.trim();
  if (!texto) return invalida('La dirección está vacía');
  if (texto.length > MAX_LONGITUD) return invalida('La dirección es demasiado larga');
  // eslint-disable-next-line no-control-regex
  if (/[\u0000- \u007f\\]/.test(texto)) return invalida('La dirección contiene espacios, caracteres de control o barras invertidas');

  let url;
  try {
    url = new URL(texto);
  } catch {
    return invalida('La dirección no se puede interpretar');
  }

  if (url.protocol !== 'https:') return invalida('Solo se permite el esquema https');
  if (url.username || url.password) return invalida('La dirección no puede incluir usuario ni contraseña');
  if (url.port !== '') return invalida('Solo se permite el puerto estándar de https (443)');

  const host = url.hostname;
  if (!host) return invalida('La dirección no tiene dominio');
  if (host.startsWith('[') || net.isIP(host)) return invalida('No se permiten direcciones IP escritas directamente');
  if (host.endsWith('.')) return invalida('No se permite un dominio con punto final');
  if (!/^[a-z0-9.-]+$/.test(host)) return invalida('El dominio contiene caracteres no permitidos');

  url.hash = '';
  return { ok: true, url };
}

module.exports = { validarUrl, MAX_LONGITUD };
