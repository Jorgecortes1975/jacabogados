import test from 'node:test';
import assert from 'node:assert/strict';
import { generarSlots, quitarOcupados } from '../lib/horarios.js';

const cfg = {
  consulta: { duracionMin: 45 }, diasHabiles: [1, 2, 3, 4, 5],
  franjas: [['08:00', '12:00'], ['14:00', '17:00']],
  margenMin: 60, antelacionHoras: 24, diasVentana: 14, festivos: [],
};
// Domingo 2026-10-18 12:00 en Colombia
const ahora = new Date('2026-10-18T12:00:00-05:00');

test('cuatro cupos por día hábil con 45 min + 60 min de margen', () => {
  const lunes = generarSlots(ahora, cfg).filter((s) => s.fecha === '2026-10-20'); // martes tras la antelación
  assert.equal(lunes.length, 4);
  assert.deepEqual(lunes.map((s) => s.inicio), [
    '2026-10-20T13:00:00.000Z', '2026-10-20T14:45:00.000Z', '2026-10-20T19:00:00.000Z', '2026-10-20T20:45:00.000Z',
  ]);
});

test('no ofrece fines de semana ni festivos', () => {
  const s = generarSlots(ahora, { ...cfg, festivos: ['2026-10-21'] });
  assert.ok(!s.some((x) => ['2026-10-24', '2026-10-25', '2026-10-21'].includes(x.fecha)));
});

test('respeta la antelación mínima de 24 horas', () => {
  const s = generarSlots(ahora, cfg);
  assert.ok(s.every((x) => new Date(x.inicio) >= new Date(ahora.getTime() + 24 * 3600000)));
  const lunes = s.filter((x) => x.fecha === '2026-10-19').map((x) => x.inicio);
  assert.deepEqual(lunes, ['2026-10-19T19:00:00.000Z', '2026-10-19T20:45:00.000Z']); // solo las de la tarde
});

test('un evento ocupado bloquea su cupo y el contiguo por el margen', () => {
  const s = generarSlots(ahora, cfg).filter((x) => x.fecha === '2026-10-20');
  const libres = quitarOcupados(s, [{ inicio: s[0].inicio, fin: s[0].fin }], cfg.margenMin);
  assert.equal(libres.length, 3); // el cupo siguiente queda justo a 60 min: permitido
});
