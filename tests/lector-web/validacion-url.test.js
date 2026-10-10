'use strict';

const test = require('node:test');
const assert = require('node:assert');
const { validarUrl } = require('../../lector-web/validacion-url');

test('acepta https en el puerto estándar y normaliza', () => {
  const r = validarUrl('  HTTPS://WWW.Dian.GOV.co/Ruta?a=1#fragmento  ');
  assert.strictEqual(r.ok, true);
  assert.strictEqual(r.url.hostname, 'www.dian.gov.co');
  assert.strictEqual(r.url.hash, '');
  assert.strictEqual(r.url.pathname, '/Ruta');
});

test('el puerto 443 explícito equivale al estándar', () => {
  assert.strictEqual(validarUrl('https://www.dian.gov.co:443/x').ok, true);
});

for (const [descripcion, entrada] of [
  ['http', 'http://www.dian.gov.co/'],
  ['ftp', 'ftp://www.dian.gov.co/'],
  ['file', 'file:///etc/passwd'],
  ['javascript', 'javascript:alert(1)'],
  ['data', 'data:text/html,<p>x</p>'],
  ['puerto distinto de 443', 'https://www.dian.gov.co:8443/'],
  ['puerto 80 sobre https', 'https://www.dian.gov.co:80/'],
  ['usuario y contraseña', 'https://usuario:clave@www.dian.gov.co/'],
  ['solo usuario', 'https://usuario@www.dian.gov.co/'],
  ['IPv4', 'https://93.184.216.34/'],
  ['IPv4 local', 'https://127.0.0.1/'],
  ['IPv4 decimal', 'https://2130706433/'],
  ['IPv4 hexadecimal', 'https://0x7f000001/'],
  ['IPv4 octal', 'https://0177.0.0.1/'],
  ['IPv6', 'https://[::1]/'],
  ['IPv6 mapeada', 'https://[::ffff:127.0.0.1]/'],
  ['punto final', 'https://www.dian.gov.co./'],
  ['espacio interno', 'https://www.dian.gov.co/a b'],
  ['salto de línea interno', 'https://www.dian.gov.co/a\nb'],
  ['barra invertida', 'https://www.dian.gov.co\\@ejemplo.com/'],
  ['vacía', ''],
  ['solo espacios', '   '],
  ['sin esquema', 'www.dian.gov.co'],
  ['no es texto (número)', 123],
  ['no es texto (nulo)', null],
  ['no es texto (objeto)', {}],
]) {
  test(`rechaza: ${descripcion}`, () => {
    const r = validarUrl(entrada);
    assert.strictEqual(r.ok, false, `debía rechazar ${JSON.stringify(entrada)}`);
    assert.ok(r.motivo);
  });
}

test('rechaza direcciones demasiado largas', () => {
  assert.strictEqual(validarUrl(`https://www.dian.gov.co/${'a'.repeat(3000)}`).ok, false);
});

test('los nombres internacionales se convierten a su forma ASCII', () => {
  const r = validarUrl('https://dián.gov.co/');
  assert.strictEqual(r.ok, true);
  assert.match(r.url.hostname, /^xn--/);
});
