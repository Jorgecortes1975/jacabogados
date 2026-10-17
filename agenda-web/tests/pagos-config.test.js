import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { config } from '../lib/config.js';
import { verificarPago } from '../lib/pagos.js';

// La forma de la respuesta de Wompi es un SUPUESTO sin verificar contra su documentación.
const tx = (extra) => ({ ok: true, json: async () => ({ data: { status: 'APPROVED', reference: 'jacX', amount_in_cents: 15000000, currency: 'COP', ...extra } }) });
async function conRespuesta(respuesta, args) {
  const fetchOriginal = globalThis.fetch;
  config.modoPrueba = false;
  globalThis.fetch = async () => respuesta;
  try { return await verificarPago(args); } finally { globalThis.fetch = fetchOriginal; config.modoPrueba = true; }
}
const args = { referencia: 'jacX', transaccionId: '1', montoCOP: 150000 };

test('pago aprobado que coincide con la reserva', async () => {
  assert.equal((await conRespuesta(tx({}), args)).aprobado, true);
});
test('pago aprobado por otro valor no se confirma y pide revisión', async () => {
  const r = await conRespuesta(tx({ amount_in_cents: 100 }), args);
  assert.deepEqual([r.aprobado, r.estado], [false, 'NO_COINCIDE']);
});
test('pago aprobado con otra referencia no se confirma', async () => {
  assert.equal((await conRespuesta(tx({ reference: 'otra' }), args)).aprobado, false);
});
test('pago rechazado y transacción inexistente', async () => {
  assert.equal((await conRespuesta(tx({ status: 'DECLINED' }), args)).estado, 'DECLINED');
  assert.equal((await conRespuesta({ ok: false, status: 404 }, args)).estado, 'NO_ENCONTRADA');
});
test('sin número de transacción queda pendiente y no se consulta a la pasarela', async () => {
  const r = await conRespuesta({ ok: true, json: async () => { throw new Error('no debía consultarse'); } }, { ...args, transaccionId: '' });
  assert.deepEqual([r.aprobado, r.estado], [false, 'PENDING']);
});
test('una respuesta de Wompi sin datos se trata como error, no como aprobada ni rechazada', async () => {
  await assert.rejects(conRespuesta({ ok: true, json: async () => ({}) }, args), /sin datos/);
});
test('un fallo temporal de Wompi (5xx, 429) no se toma como "no existe"', async () => {
  await assert.rejects(conRespuesta({ ok: false, status: 500 }, args), /Wompi respondió 500/);
  await assert.rejects(conRespuesta({ ok: false, status: 429 }, args), /429/);
});

const arrancar = (env) => {
  try {
    execFileSync(process.execPath, ['-e', "import('./lib/config.js')"], { env: { PATH: process.env.PATH, ...env }, stdio: 'pipe' });
    return null;
  } catch (e) { return String(e.stderr); }
};
const completo = { MODO_PRUEBA: '0', SITIO_URL: 'https://x.co', WOMPI_PUBLIC_KEY: 'a', WOMPI_INTEGRITY_SECRET: 'b', GOOGLE_CLIENT_ID: 'c', GOOGLE_CLIENT_SECRET: 'd', GOOGLE_REFRESH_TOKEN: 'e' };

test('en producción no arranca sin llaves ni con un precio mal escrito', () => {
  assert.match(arrancar({ MODO_PRUEBA: '0' }), /Falta configurar/);
  assert.match(arrancar({ ...completo }), /CONSULTA_PRECIO_COP/);              // sin precio
  assert.match(arrancar({ ...completo, CONSULTA_PRECIO_COP: '150.000' }), /CONSULTA_PRECIO_COP/); // se leería como 150 pesos
  assert.equal(arrancar({ ...completo, CONSULTA_PRECIO_COP: '150000' }), null);
});
