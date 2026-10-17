import test from 'node:test';
import assert from 'node:assert/strict';
process.env.MODO_PRUEBA = '1';
const { config } = await import('../lib/config.js');
const { calendario } = await import('../lib/calendario.js');
const { default: webhook } = await import('../api/webhook.js');

const llamar = async (cuerpo) => {
  const res = { codigo: null, cuerpo: null, status(c) { this.codigo = c; return this; }, json(o) { this.cuerpo = o; return this; } };
  await webhook({ body: cuerpo }, res);
  return res;
};
const reservar = async (id) => calendario.crearReserva({ id, inicio: '2026-11-03T14:00:00.000Z', fin: '2026-11-03T14:45:00.000Z', datos: {}, monto: 150000 });

test('si la pasarela aún no encuentra el pago, el aviso responde error para que reintente', async () => {
  await reservar('jac' + 'a'.repeat(20));
  const fetchOriginal = globalThis.fetch;
  config.modoPrueba = false; // solo cambia cómo se verifica el pago; el calendario sigue siendo el de prueba
  globalThis.fetch = async () => ({ ok: false, status: 404 });
  try {
    const r = await llamar({ data: { transaction: { id: '1', reference: 'jac' + 'a'.repeat(20) } } });
    assert.equal(r.codigo, 503);
    assert.equal(r.cuerpo.estado, 'pendiente');
    // un fallo temporal de la pasarela también debe reintentarse
    globalThis.fetch = async () => ({ ok: false, status: 500 });
    assert.equal((await llamar({ data: { transaction: { id: '1', reference: 'jac' + 'a'.repeat(20) } } })).codigo, 503);
  } finally { globalThis.fetch = fetchOriginal; config.modoPrueba = true; }
});

test('resultados definitivos responden 200: confirmada, rechazada y referencia que ya no existe', async () => {
  await reservar('jac' + 'b'.repeat(20));
  assert.equal((await llamar({ data: { transaction: { id: 'prueba', reference: 'jac' + 'b'.repeat(20) } } })).codigo, 200);
  await reservar('jac' + 'c'.repeat(20));
  assert.equal((await llamar({ data: { transaction: { id: 'rechazado', reference: 'jac' + 'c'.repeat(20) } } })).codigo, 200);
  assert.equal((await llamar({ data: { transaction: { id: 'prueba', reference: 'jac' + 'd'.repeat(20) } } })).codigo, 200); // no existe
});
