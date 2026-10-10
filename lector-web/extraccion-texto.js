'use strict';

// Extracción de texto sin dependencias externas (D-06).
// Limitación declarada: es menos robusto que un analizador HTML completo; por eso el resultado
// incluye advertencias cuando el texto es corto o el HTML estaba mal formado.

const MIN_TEXTO = 30; // por debajo: SIN_TEXTO
const AVISO_TEXTO_CORTO = 200; // por debajo: advertencia

const ENTIDADES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ordm: 'º', ordf: 'ª', deg: '°', sect: '§',
  copy: '©', reg: '®', laquo: '«', raquo: '»', iexcl: '¡', iquest: '¿', ndash: '–', mdash: '—', hellip: '…',
  lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”', bull: '•', middot: '·', para: '¶', euro: '€', cent: '¢',
  aacute: 'á', eacute: 'é', iacute: 'í', oacute: 'ó', uacute: 'ú', ntilde: 'ñ', uuml: 'ü',
  Aacute: 'Á', Eacute: 'É', Iacute: 'Í', Oacute: 'Ó', Uacute: 'Ú', Ntilde: 'Ñ', Uuml: 'Ü',
  agrave: 'à', egrave: 'è', ccedil: 'ç', Ccedil: 'Ç',
};

function decodificarEntidades(texto) {
  // Una sola pasada: "&amp;lt;" produce "&lt;" y no "<".
  return texto.replace(/&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]*);/gi, (completo, cuerpo) => {
    if (cuerpo[0] === '#') {
      const num = cuerpo[1].toLowerCase() === 'x' ? parseInt(cuerpo.slice(2), 16) : parseInt(cuerpo.slice(1), 10);
      if (!Number.isInteger(num) || num <= 0 || num > 0x10ffff || (num >= 0xd800 && num <= 0xdfff)) return '�';
      return String.fromCodePoint(num);
    }
    return Object.prototype.hasOwnProperty.call(ENTIDADES, cuerpo) ? ENTIDADES[cuerpo] : completo;
  });
}

function etiquetaDeCodificacion(tipoContenido, muestra) {
  const cab = /charset\s*=\s*["']?([\w.:-]+)/i.exec(tipoContenido || '');
  if (cab) return cab[1];
  const meta =
    /<meta[^>]+charset\s*=\s*["']?\s*([\w.:-]+)/i.exec(muestra) ||
    /<meta[^>]+content\s*=\s*["'][^"']*charset\s*=\s*([\w.:-]+)/i.exec(muestra);
  return meta ? meta[1] : 'utf-8';
}

// Devuelve { texto, advertencias }.
function decodificar(buffer, tipoContenido) {
  const advertencias = [];
  const muestra = buffer.subarray(0, 2048).toString('latin1');
  const etiqueta = etiquetaDeCodificacion(tipoContenido, muestra);
  let decodificador;
  try {
    decodificador = new TextDecoder(etiqueta);
  } catch {
    decodificador = new TextDecoder('utf-8');
    advertencias.push(`La codificación "${etiqueta}" no es reconocida; se leyó el contenido como UTF-8.`);
  }
  return { texto: decodificador.decode(buffer), advertencias };
}

function normalizarEspacios(texto) {
  return texto
    .replace(/\r\n?/g, '\n')
    .replace(/[\t\f\v  ]+/g, ' ')
    .split('\n')
    .map((l) => l.trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const ELIMINAR = new Set(['script', 'style', 'noscript', 'svg', 'template', 'nav', 'header', 'footer', 'aside', 'form', 'iframe', 'select', 'button']);
const BLOQUE = new Set([
  'p', 'div', 'br', 'li', 'tr', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'section', 'article', 'table', 'ul', 'ol',
  'blockquote', 'pre', 'hr', 'main', 'dl', 'dt', 'dd', 'figure', 'figcaption',
]);
const CELDA = new Set(['td', 'th']);

function minusculasAscii(texto) {
  // No usa toLowerCase(): algunos caracteres Unicode cambian de longitud y desalinearían los índices.
  return texto.replace(/[A-Z]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 32));
}

function esLetra(c) {
  return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
}

function esCaracterDeNombre(c) {
  return (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') || c === '-' || c === ':';
}

// Recorrido lineal de una sola pasada. Se evita el uso de expresiones regulares con búsqueda perezosa
// sobre el documento completo: con HTML roto u hostil (muchas etiquetas sin cierre) su costo crece al
// cuadrado y bloquearía el proceso durante minutos, sin que el temporizador de lectura pueda interrumpirlo.
// Cada búsqueda hacia adelante que no encuentra su cierre se memoriza, por lo que no se repite.
function quitarEtiquetas(html) {
  const advertencias = [];
  const bajo = minusculasAscii(html);
  const n = html.length;
  const salida = [];
  const sinCierre = new Set();
  let i = 0;

  while (i < n) {
    const lt = html.indexOf('<', i);
    if (lt === -1) {
      salida.push(html.slice(i));
      break;
    }
    if (lt > i) salida.push(html.slice(i, lt));
    i = lt;

    if (html.startsWith('<!--', i)) {
      const fin = html.indexOf('-->', i + 4);
      if (fin === -1) {
        advertencias.push('El HTML estaba mal formado (comentario sin cierre); parte del contenido pudo omitirse.');
        break;
      }
      salida.push(' ');
      i = fin + 3;
      continue;
    }

    const c1 = html[i + 1];
    const cierre = c1 === '/';
    const inicioNombre = i + (cierre ? 2 : 1);
    const cn = html[inicioNombre];
    const esEtiqueta = c1 === '!' || c1 === '?' || (cn !== undefined && esLetra(cn));
    if (!esEtiqueta) {
      salida.push('<'); // un signo menor que no abre una etiqueta es texto
      i += 1;
      continue;
    }

    let j = inicioNombre;
    while (j < n && esCaracterDeNombre(bajo[j])) j++;
    const nombre = bajo.slice(inicioNombre, j);

    const gt = html.indexOf('>', j);
    if (gt === -1) {
      salida.push(html.slice(i)); // no queda ningún '>': el resto es texto
      break;
    }
    const finEtiqueta = gt + 1;

    if (!cierre && ELIMINAR.has(nombre)) {
      if (!sinCierre.has(nombre)) {
        const idxCierre = bajo.indexOf(`</${nombre}`, finEtiqueta);
        if (idxCierre !== -1) {
          const gt2 = html.indexOf('>', idxCierre);
          salida.push(' ');
          i = gt2 === -1 ? n : gt2 + 1;
          continue;
        }
        sinCierre.add(nombre);
      }
      if (nombre === 'script' || nombre === 'style') {
        advertencias.push('El HTML estaba mal formado (etiqueta sin cierre); parte del contenido pudo omitirse.');
        break; // se descarta desde aquí hasta el final
      }
      i = finEtiqueta; // otras etiquetas sin cierre: solo se omite la etiqueta
      continue;
    }

    if (BLOQUE.has(nombre)) salida.push('\n');
    else if (CELDA.has(nombre)) salida.push(' ');
    i = finEtiqueta;
  }
  return { texto: salida.join(''), advertencias };
}

// Devuelve { texto, advertencias }.
function htmlATexto(html) {
  const { texto, advertencias } = quitarEtiquetas(html);
  return { texto: normalizarEspacios(decodificarEntidades(texto)), advertencias };
}

function textoPlano(texto) {
  return normalizarEspacios(texto);
}

const MARCAS_DESAFIO = [
  'just a moment',
  'captcha',
  'attention required',
  '/cdn-cgi/challenge-platform/',
  'cf-chl',
  'performing security verification',
  'enable javascript and cookies',
];

// Detecta controles de acceso interactivos. No se intenta eludirlos (D-09).
function esDesafioAntirobot(estado, muestraCuerpo) {
  const m = String(muestraCuerpo || '').slice(0, 8192).toLowerCase();
  const hayMarca = MARCAS_DESAFIO.some((x) => m.includes(x));
  if (!hayMarca) return false;
  if ([403, 429, 503].includes(estado)) return true;
  return estado === 200 && /<title>[^<]*(just a moment|attention required)/.test(m);
}

function esPdf(buffer, tipoContenido) {
  if (/application\/pdf/i.test(tipoContenido || '')) return true;
  return buffer.length >= 5 && buffer.subarray(0, 5).toString('latin1') === '%PDF-';
}

module.exports = {
  MIN_TEXTO,
  AVISO_TEXTO_CORTO,
  decodificar,
  htmlATexto,
  textoPlano,
  decodificarEntidades,
  esDesafioAntirobot,
  esPdf,
};
