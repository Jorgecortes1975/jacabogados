import test from 'node:test';
import assert from 'node:assert/strict';
import { generarSlots, quitarOcupados } from '../lib/horarios.js';
import { config } from '../lib/config.js';
import { cuposLibres } from '../api/disponibilidad.js';

const cfg = {
  consulta: { duracionMin: 45 }, diasHabiles: [1, 2, 3, 4, 5],
  franjas: [['08:00', '12:00'], ['14:00', '17:00']],
  margenMin: 15, antelacionHoras: 24, diasVentana: 14, festivos: [],
};
// Domingo 2026-10-18 12:00 en Colombia
const ahora = new Date('2026-10-18T12:00:00-05:00');

test('siete cupos por día hábil con 45 min + 15 min de margen: cuatro en la mañana y tres en la tarde', () => {
  const martes = generarSlots(ahora, cfg).filter((s) => s.fecha === '2026-10-20');
  assert.deepEqual(martes.map((s) => s.inicio), [
    '2026-10-20T13:00:00.000Z', '2026-10-20T14:00:00.000Z', '2026-10-20T15:00:00.000Z', '2026-10-20T16:00:00.000Z',
    '2026-10-20T19:00:00.000Z', '2026-10-20T20:00:00.000Z', '2026-10-20T21:00:00.000Z',
  ]); // 8, 9, 10, 11 a. m. y 2, 3, 4 p. m. hora de Colombia; el último termina 4:45 p. m.
});

test('no ofrece fines de semana ni festivos', () => {
  const s = generarSlots(ahora, { ...cfg, festivos: ['2026-10-21'] });
  assert.ok(!s.some((x) => ['2026-10-24', '2026-10-25', '2026-10-21'].includes(x.fecha)));
});

test('respeta la antelación mínima de 24 horas', () => {
  const s = generarSlots(ahora, cfg);
  assert.ok(s.every((x) => new Date(x.inicio) >= new Date(ahora.getTime() + 24 * 3600000)));
  const lunes = s.filter((x) => x.fecha === '2026-10-19').map((x) => x.inicio);
  assert.deepEqual(lunes, ['2026-10-19T19:00:00.000Z', '2026-10-19T20:00:00.000Z', '2026-10-19T21:00:00.000Z']); // solo las de la tarde
});

test('un evento ocupado bloquea su cupo y el contiguo por el margen', () => {
  const s = generarSlots(ahora, cfg).filter((x) => x.fecha === '2026-10-20');
  const libres = quitarOcupados(s, [{ inicio: s[0].inicio, fin: s[0].fin }], cfg.margenMin);
  assert.equal(libres.length, s.length - 1); // el cupo siguiente queda justo a 15 min: permitido
  const cercano = quitarOcupados(s, [{ inicio: s[0].inicio, fin: new Date(new Date(s[0].fin).getTime() + 5 * 60000).toISOString() }], cfg.margenMin);
  assert.equal(cercano.length, s.length - 2); // un evento externo que termina 5 min después también bloquea el siguiente
});

test('los festivos de noviembre y diciembre de 2026 no se ofrecen', () => {
  const desdeOctubre = new Date('2026-10-18T12:00:00-05:00');
  const fechas = new Set(generarSlots(desdeOctubre, { ...config, diasVentana: 90 }).map((x) => x.fecha));
  for (const f of ['2026-11-02', '2026-11-16', '2026-12-08', '2026-12-25']) assert.ok(!fechas.has(f), f);
  assert.ok(fechas.has('2026-11-03')); // el día siguiente sí se ofrece
});

test('festivos de 2027 cargados (incluido el 12 de julio, sin verificar y bloqueado por prudencia)', () => {
  const fechas = new Set(generarSlots(new Date('2026-12-30T12:00:00-05:00'), { ...config, diasVentana: 400 }).map((x) => x.fecha));
  for (const f of ['2027-01-01', '2027-01-11', '2027-03-22', '2027-03-25', '2027-03-26', '2027-05-10', '2027-05-31', '2027-06-07', '2027-07-05', '2027-07-12', '2027-07-20', '2027-08-16', '2027-10-18', '2027-11-01', '2027-11-15', '2027-12-08']) {
    assert.ok(!fechas.has(f), f);
  }
  assert.ok(fechas.has('2027-01-12')); // el día siguiente a un festivo sí se ofrece
  assert.equal(config.festivos.filter((f) => f.startsWith('2027')).length, 19); // 18 verificados + 12 de julio
});

test('un año sin festivos cargados no se ofrece (falla cerrado)', async () => {
  process.env.MODO_PRUEBA = '1';
  const libres = await cuposLibres(new Date('2027-12-20T12:00:00-05:00'));
  assert.ok(libres.length > 0);
  assert.ok(libres.every((s) => s.fecha.startsWith('2027')), 'no debe ofrecer fechas de 2028');
});
