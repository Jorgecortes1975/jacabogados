import test from 'node:test';
import assert from 'node:assert/strict';
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
});

test('referencia inválida o inexistente', async () => {
  assert.equal((await fetch(`${base}/api/confirmar?referencia=hack&id=prueba`)).status, 400);
  assert.equal((await fetch(`${base}/api/confirmar?referencia=jac${'0'.repeat(20)}&id=prueba`)).status, 404);
});

test('páginas legales y principal se sirven', async () => {
  for (const p of ['/', '/privacidad.html', '/terminos.html', '/cancelacion.html', '/gracias.html']) {
    assert.equal((await fetch(base + p)).status, 200, p);
  }
  assert.equal((await fetch(base + '/../package.json')).status !== 200, true);
});
