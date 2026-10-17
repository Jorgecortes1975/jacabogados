import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
process.env.MODO_PRUEBA = '1';
const { crearServidor } = await import('../servidor-local.js');

let servidor, base;
test.before(async () => {
  servidor = crearServidor();
  await new Promise((ok) => servidor.listen(0, ok));
  base = `http://localhost:${servidor.address().port}`;
});
test.after(() => servidor.close());

const post = (ruta, cuerpo) => fetch(base + ruta, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(cuerpo) });
const datos = { nombre: 'Ana Pérez', email: 'ana@example.com', telefono: '3001234567', tema: 'despido', autoriza: true };

test('flujo completo: agenda, reserva, pago aprobado y cupo ocupado', async () => {
  const disp = await (await fetch(base + '/api/disponibilidad')).json();
  assert.equal(disp.modoPrueba, true);
  const inicio = disp.dias[0].inicios[0];

  const r = await post('/api/reservar', { ...datos, inicio });
  assert.equal(r.status, 200);
  const { referencia, url } = await r.json();
  assert.match(referencia, /^jac[0-9a-f]{20}$/);
  assert.match(url, /pago-prueba\.html/);

  // el cupo retenido ya no se ofrece y no se puede reservar dos veces
  assert.equal((await post('/api/reservar', { ...datos, inicio })).status, 409);

  const c = await (await fetch(`${base}/api/confirmar?referencia=${referencia}&id=prueba`)).json();
  assert.equal(c.estado, 'confirmada');
  assert.ok(c.meetUrl);
  // idempotente
  assert.equal((await (await fetch(`${base}/api/confirmar?referencia=${referencia}&id=prueba`)).json()).estado, 'confirmada');
});

test('pago rechazado no confirma la reserva', async () => {
  const disp = await (await fetch(base + '/api/disponibilidad')).json();
  const { referencia } = await (await post('/api/reservar', { ...datos, inicio: disp.dias.at(-1).inicios[0] })).json();
  const c = await (await fetch(`${base}/api/confirmar?referencia=${referencia}&id=rechazado`)).json();
  assert.equal(c.estado, 'rechazado');
});

test('validaciones: sin autorización, correo inválido y horario inventado', async () => {
  const disp = await (await fetch(base + '/api/disponibilidad')).json();
  const inicio = disp.dias[1].inicios[0];
  assert.equal((await post('/api/reservar', { ...datos, inicio, autoriza: false })).status, 400);
  assert.equal((await post('/api/reservar', { ...datos, inicio, email: 'x' })).status, 400);
  assert.equal((await post('/api/reservar', { ...datos, inicio: '2026-10-20T03:00:00.000Z' })).status, 409);
  // varias direcciones o separadores: Google rechazaría la invitación después del pago
  for (const email of ['a,b@c.co', 'x;y@z.com', 'a b@c.co', 'a@b']) assert.equal((await post('/api/reservar', { ...datos, inicio, email })).status, 400, email);
  // correo con comillas o signos de etiqueta, y campos que no son texto
  assert.equal((await post('/api/reservar', { ...datos, inicio, email: 'x"><script>alert(2)</script>@example.com' })).status, 400);
  assert.equal((await post('/api/reservar', { ...datos, inicio, nombre: { a: 1 } })).status, 400);
  // sin horario o con horario ilegible: error del cliente (400), no fallo del servidor
  assert.equal((await post('/api/reservar', { ...datos })).status, 400);
  assert.equal((await post('/api/reservar', { ...datos, inicio: 'xx' })).status, 400);
});

test('el cupo de quien no paga se libera y su referencia deja de existir', async () => {
  const disp = await (await fetch(base + '/api/disponibilidad')).json();
  const inicio = disp.dias[3].inicios[0];
  const { referencia } = await (await post('/api/reservar', { ...datos, inicio })).json();
  const libre = async () => (await (await fetch(base + '/api/disponibilidad')).json()).dias.some((d) => d.inicios.includes(inicio));
  assert.equal(await libre(), false);
  globalThis.__reservasPrueba.get(referencia).creada -= 31 * 60000; // pasaron más de 30 minutos
  assert.equal(await libre(), true);
  assert.equal((await fetch(`${base}/api/confirmar?referencia=${referencia}&id=prueba`)).status, 404);
});

test('aviso automático de la pasarela confirma la reserva sin que el cliente vuelva', async () => {
  const disp = await (await fetch(base + '/api/disponibilidad')).json();
  const { referencia } = await (await post('/api/reservar', { ...datos, inicio: disp.dias[4].inicios[0] })).json();
  const aviso = (cuerpo) => post('/api/webhook', cuerpo);
  assert.equal((await aviso({ event: 'transaction.updated', data: {} })).status, 400); // aviso sin transacción
  assert.equal((await aviso({ data: { transaction: { id: 'rechazado', reference: referencia } } })).status, 200);
  assert.equal((await (await fetch(`${base}/api/confirmar?referencia=${referencia}&id=x`)).json()).estado, 'rechazado'); // un aviso falso no confirma
  assert.equal((await aviso({ data: { transaction: { id: 'prueba', reference: referencia } } })).status, 200);
  const c = await (await fetch(`${base}/api/confirmar?referencia=${referencia}`)).json(); // sin id: ya estaba confirmada por el aviso
  assert.equal(c.estado, 'confirmada');
  assert.equal((await aviso({ data: { transaction: { id: 'prueba', reference: referencia } } })).status, 200); // repetido: no duplica
});

test('referencia inválida o inexistente', async () => {
  assert.equal((await fetch(`${base}/api/confirmar?referencia=hack&id=prueba`)).status, 400);
  assert.equal((await fetch(`${base}/api/confirmar?referencia=jac${'0'.repeat(20)}&id=prueba`)).status, 404);
});

test('páginas legales y principal se sirven', async () => {
  for (const p of ['/', '/privacidad.html', '/terminos.html', '/cancelacion.html', '/gracias.html']) {
    assert.equal((await fetch(base + p)).status, 200, p);
  }
  // el cliente de pruebas normaliza las rutas, por eso se envían crudas
  const crudo = (path) => new Promise((ok) => http.get({ port: servidor.address().port, path }, (r) => { r.resume(); ok(r.statusCode); }));
  for (const p of ['/../package.json', '/%2e%2e/package.json', '/..%2fpackage.json']) assert.notEqual(await crudo(p), 200, p);
});
