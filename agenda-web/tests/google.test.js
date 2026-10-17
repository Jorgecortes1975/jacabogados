import test from 'node:test';
import assert from 'node:assert/strict';
const google = await import('../lib/calendario-google.js');

// Respuestas simuladas de Google: la forma real es un SUPUESTO sin verificar contra su documentación.
async function conGoogle(rutas, prueba) {
  const original = globalThis.fetch;
  globalThis.fetch = async (url, opciones = {}) => {
    const u = String(url);
    if (u.includes('oauth2.googleapis.com')) return { ok: true, status: 200, json: async () => ({ access_token: 't', expires_in: 3600 }) };
    for (const [patron, respuesta] of Object.entries(rutas)) {
      if (u.includes(patron) && (!respuesta.metodo || respuesta.metodo === (opciones.method || 'GET'))) {
        return { ok: respuesta.status < 400, status: respuesta.status, json: async () => respuesta.cuerpo ?? {}, text: async () => JSON.stringify(respuesta.cuerpo ?? {}) };
      }
    }
    return { ok: true, status: 200, json: async () => ({ items: [] }), text: async () => '' };
  };
  try { return await prueba(); } finally { globalThis.fetch = original; }
}

test('un error de Google en la consulta de horas ocupadas NO se lee como "nada ocupado"', async () => {
  await conGoogle({ '/freeBusy': { status: 200, cuerpo: { calendars: { primary: { errors: [{ reason: 'notFound' }] } } } } }, async () => {
    await assert.rejects(google.ocupados('2026-11-03T00:00:00Z', '2026-11-04T00:00:00Z'), /no pudo consultar el calendario/);
  });
  await conGoogle({ '/freeBusy': { status: 200, cuerpo: {} } }, async () => {
    await assert.rejects(google.ocupados('2026-11-03T00:00:00Z', '2026-11-04T00:00:00Z'), /no pudo consultar/);
  });
  await conGoogle({ '/freeBusy': { status: 200, cuerpo: { calendars: { primary: { busy: [{ start: 'a', end: 'b' }] } } } } }, async () => {
    assert.deepEqual(await google.ocupados('2026-11-03T00:00:00Z', '2026-11-04T00:00:00Z'), [{ inicio: 'a', fin: 'b' }]);
  });
});

test('si Google no encuentra el calendario al crear la reserva, falla antes de mandar a pagar', async () => {
  await conGoogle({ '/events?sendUpdates=none': { status: 404, metodo: 'POST' } }, async () => {
    await assert.rejects(
      google.crearReserva({ id: 'jac' + '0'.repeat(20), inicio: '2026-11-03T14:00:00-05:00', fin: '2026-11-03T14:45:00-05:00', datos: { nombre: 'A', email: 'a@b.co', telefono: '1', tema: 't' }, monto: 150000 }),
      /no encontró el calendario/,
    );
  });
});

test('si el evento desapareció tras el pago, confirmar devuelve null (lo resuelve una persona) en vez de romperse', async () => {
  await conGoogle({ '/events/jac': { status: 404 } }, async () => {
    assert.equal(await google.confirmarReserva('jac' + '0'.repeat(20)), null);
  });
});
