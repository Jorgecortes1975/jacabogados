// Lógica pura de horarios. Colombia no tiene cambio de hora: siempre UTC-5.
const OFFSET = '-05:00';
const MIN = 60000;

export function fechaColombia(date) {
  return new Date(date.getTime() - 5 * 3600000).toISOString().slice(0, 10);
}
function sumarDias(fecha, n) {
  const d = new Date(`${fecha}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}
const diaSemana = (fecha) => new Date(`${fecha}T12:00:00Z`).getUTCDay();
const aMs = (fecha, hhmm) => new Date(`${fecha}T${hhmm}:00${OFFSET}`).getTime();

export function generarSlots(ahora, cfg) {
  const dur = cfg.consulta.duracionMin * MIN;
  const paso = dur + cfg.margenMin * MIN;
  const minInicio = ahora.getTime() + cfg.antelacionHoras * 3600000;
  const hoy = fechaColombia(ahora);
  const slots = [];
  for (let i = 0; i <= cfg.diasVentana; i++) {
    const fecha = sumarDias(hoy, i);
    if (!cfg.diasHabiles.includes(diaSemana(fecha)) || cfg.festivos.includes(fecha)) continue;
    for (const [ini, fin] of cfg.franjas) {
      const finFranja = aMs(fecha, fin);
      for (let t = aMs(fecha, ini); t + dur <= finFranja; t += paso) {
        if (t < minInicio) continue;
        slots.push({ fecha, inicio: new Date(t).toISOString(), fin: new Date(t + dur).toISOString() });
      }
    }
  }
  return slots;
}

// Un cupo no se ofrece si se cruza con un evento ocupado, ampliado por el margen.
export function quitarOcupados(slots, ocupados, margenMin) {
  const m = margenMin * MIN;
  const bloques = ocupados.map((o) => [new Date(o.inicio).getTime() - m, new Date(o.fin).getTime() + m]);
  return slots.filter((s) => {
    const a = new Date(s.inicio).getTime();
    const b = new Date(s.fin).getTime();
    return !bloques.some(([x, y]) => a < y && b > x);
  });
}
