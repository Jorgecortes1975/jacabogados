'use strict';

const test = require('node:test');
const assert = require('node:assert');
const ext = require('../../lector-web/extraccion-texto');

// ---------- T023: extracción ----------

test('elimina script, style, navegación, encabezado y pie', () => {
  const html = `<html><head><style>.a{color:red}</style><script>var x = "secreto";</script></head>
    <body><header>Encabezado</header><nav><a href="/">Inicio</a></nav>
    <main><h1>Artículo 1</h1><p>Contenido principal.</p></main>
    <aside>Publicidad</aside><footer>Pie</footer><noscript>Active JS</noscript></body></html>`;
  const { texto } = ext.htmlATexto(html);
  assert.match(texto, /Artículo 1/);
  assert.match(texto, /Contenido principal\./);
  for (const fuera of ['secreto', 'color:red', 'Encabezado', 'Inicio', 'Publicidad', 'Pie', 'Active JS']) {
    assert.ok(!texto.includes(fuera), `no debía incluir "${fuera}"`);
  }
});

test('convierte bloques en saltos de línea y no pega párrafos', () => {
  const { texto } = ext.htmlATexto('<p>Primero</p><p>Segundo</p><ul><li>Uno</li><li>Dos</li></ul>');
  assert.deepStrictEqual(texto.split('\n').filter(Boolean), ['Primero', 'Segundo', 'Uno', 'Dos']);
});

test('decodifica entidades nombradas y numéricas', () => {
  const { texto } = ext.htmlATexto('<p>Art&iacute;culo&nbsp;5 &ndash; &laquo;vigencia&raquo; &#241; &#xF1; &amp; &copy;</p>');
  assert.strictEqual(texto, 'Artículo 5 – «vigencia» ñ ñ & ©');
});

test('la decodificación es de una sola pasada (sin doble decodificación)', () => {
  assert.strictEqual(ext.decodificarEntidades('&amp;lt;script&amp;gt;'), '&lt;script&gt;');
});

test('entidades numéricas inválidas no rompen el texto', () => {
  assert.strictEqual(ext.decodificarEntidades('&#0; &#99999999; &#xD800;'), '� � �');
  assert.strictEqual(ext.decodificarEntidades('&noexiste;'), '&noexiste;');
});

test('conserva un signo menor que no es etiqueta', () => {
  const { texto } = ext.htmlATexto('<p>Si a < b entonces c</p>');
  assert.match(texto, /a < b entonces c/);
});

test('HTML mal formado: script sin cierre se descarta y se advierte', () => {
  const r = ext.htmlATexto('<p>Texto previo</p><script>var a = 1; <p>resto</p>');
  assert.match(r.texto, /Texto previo/);
  assert.ok(!r.texto.includes('var a'));
  assert.ok(r.advertencias.length >= 1);
});

test('decodifica UTF-8 declarado por cabecera', () => {
  const r = ext.decodificar(Buffer.from('Constitución política', 'utf8'), 'text/html; charset=utf-8');
  assert.strictEqual(r.texto, 'Constitución política');
});

test('decodifica ISO-8859-1 declarado por cabecera', () => {
  const r = ext.decodificar(Buffer.from('Constitución política', 'latin1'), 'text/html; charset=ISO-8859-1');
  assert.strictEqual(r.texto, 'Constitución política');
});

test('decodifica ISO-8859-1 declarado por <meta charset>', () => {
  const html = '<html><head><meta charset="iso-8859-1"></head><body>Año</body></html>';
  const r = ext.decodificar(Buffer.from(html, 'latin1'), 'text/html');
  assert.match(r.texto, /Año/);
});

test('decodifica codificación declarada por <meta http-equiv>', () => {
  const html = '<meta http-equiv="Content-Type" content="text/html; charset=windows-1252"><p>Señor</p>';
  const r = ext.decodificar(Buffer.from(html, 'latin1'), 'text/html');
  assert.match(r.texto, /Señor/);
});

test('codificación desconocida: usa UTF-8 y advierte', () => {
  const r = ext.decodificar(Buffer.from('hola', 'utf8'), 'text/html; charset=inventada-99');
  assert.strictEqual(r.texto, 'hola');
  assert.ok(r.advertencias.length === 1);
});

test('texto plano: normaliza espacios y saltos de línea', () => {
  assert.strictEqual(ext.textoPlano('a   b\r\n\r\n\r\n\r\nc\t d  '), 'a b\n\nc d');
});

// ---------- Detección de desafío anti-robot y PDF ----------

test('detecta el desafío anti-robot por estado y marcas', () => {
  assert.strictEqual(ext.esDesafioAntirobot(403, '<title>Just a moment...</title>'), true);
  assert.strictEqual(ext.esDesafioAntirobot(429, 'Please complete the CAPTCHA'), true);
  assert.strictEqual(ext.esDesafioAntirobot(503, '<script src="/cdn-cgi/challenge-platform/h/b"></script>'), true);
  assert.strictEqual(ext.esDesafioAntirobot(200, '<html><title>Just a moment...</title>'), true);
});

test('no confunde contenido normal con un desafío', () => {
  assert.strictEqual(ext.esDesafioAntirobot(200, '<p>El formulario captcha de la ley no aplica</p>'), false);
  assert.strictEqual(ext.esDesafioAntirobot(403, 'Acceso denegado'), false);
  assert.strictEqual(ext.esDesafioAntirobot(500, ''), false);
});

test('detecta PDF por tipo declarado o por firma', () => {
  assert.strictEqual(ext.esPdf(Buffer.from('x'), 'application/pdf'), true);
  assert.strictEqual(ext.esPdf(Buffer.from('%PDF-1.7 ...'), 'text/html'), true);
  assert.strictEqual(ext.esPdf(Buffer.from('<html>'), 'text/html'), false);
  assert.strictEqual(ext.esPdf(Buffer.alloc(0), ''), false);
});

// ---------- Rendimiento con HTML roto u hostil (regresión de un hallazgo de la revisión adversarial) ----------
// Con expresiones regulares perezosas sobre el documento completo, estos casos tardaban más de 25 s
// (costo cuadrático) y bloqueaban el proceso sin que el temporizador de lectura pudiera interrumpirlos.

const MIB = 1024 * 1024;
const HOSTILES = {
  'script sin cierre': '<script>'.repeat(Math.floor((5 * MIB) / 8)),
  'comentario sin cierre': '<!--'.repeat(Math.floor((5 * MIB) / 4)),
  'etiqueta "<a" sin ">"': '<a'.repeat(Math.floor((5 * MIB) / 2)),
  'nav sin cierre': '<nav>'.repeat(Math.floor((5 * MIB) / 5)),
  'style sin cierre': '<style>'.repeat(Math.floor((5 * MIB) / 7)),
  'etiquetas abiertas anidadas': '<div>'.repeat(Math.floor((5 * MIB) / 5)),
  'atributos largos sin cierre': '<a href="'.repeat(Math.floor((5 * MIB) / 9)),
  'nav y cierre alternados': '<nav>x</nav>'.repeat(Math.floor((5 * MIB) / 12)),
  'signos menor sueltos': '< '.repeat(Math.floor((5 * MIB) / 2)),
  'entidades sin punto y coma': '&aaaa'.repeat(Math.floor((5 * MIB) / 5)),
};

for (const [nombre, html] of Object.entries(HOSTILES)) {
  test(`rendimiento lineal con HTML hostil de 5 MiB: ${nombre}`, () => {
    const t0 = process.hrtime.bigint();
    ext.htmlATexto(html);
    const ms = Number(process.hrtime.bigint() - t0) / 1e6;
    assert.ok(ms < 3000, `tardó ${ms.toFixed(0)} ms`);
  });
}

// ---------- Comportamiento del recorrido lineal ----------

test('etiquetas en mayúsculas o mixtas se tratan igual', () => {
  const { texto } = ext.htmlATexto('<SCRIPT>malo()</SCRIPT><Nav>menú</Nav><P>Cuerpo</P>');
  assert.strictEqual(texto, 'Cuerpo');
});

test('un comentario sin cierre descarta el resto y advierte', () => {
  const r = ext.htmlATexto('<p>Antes</p><!-- sin cierre <p>Después</p>');
  assert.match(r.texto, /Antes/);
  assert.ok(!r.texto.includes('Después'));
  assert.ok(r.advertencias.length >= 1);
});

test('doctype, declaraciones y comentarios no aparecen en el texto', () => {
  const { texto } = ext.htmlATexto('<?xml version="1.0"?><!doctype html><!-- nota --><p>Contenido</p>');
  assert.strictEqual(texto, 'Contenido');
});

test('elimina el contenido de etiquetas anidadas del mismo tipo hasta su cierre', () => {
  const { texto } = ext.htmlATexto('<p>A</p><nav><nav>interno</nav> resto del menú</nav><p>B</p>');
  assert.match(texto, /A/);
  assert.match(texto, /B/);
  assert.ok(!texto.includes('interno'));
});

test('una etiqueta eliminable sin cierre conserva el contenido que la sigue', () => {
  const { texto } = ext.htmlATexto('<p>Antes</p><header><p>Se conserva</p>');
  assert.match(texto, /Se conserva/);
});

test('el nombre de la etiqueta se lee completo: <scripty> no es <script>', () => {
  const { texto } = ext.htmlATexto('<scripty>visible</scripty>');
  assert.strictEqual(texto, 'visible');
});

test('caracteres Unicode que cambian de longitud al pasar a minúsculas no desalinean la lectura', () => {
  const { texto } = ext.htmlATexto('<p>İİİİ Ǆ ß</p><script>oculto()</script><p>visible</p>');
  assert.match(texto, /visible/);
  assert.ok(!texto.includes('oculto'));
});

test('celdas de tabla se separan con espacio y filas con salto de línea', () => {
  const { texto } = ext.htmlATexto('<table><tr><td>a</td><td>b</td></tr><tr><td>c</td></tr></table>');
  assert.deepStrictEqual(texto.split('\n').filter(Boolean), ['a b', 'c']);
});
