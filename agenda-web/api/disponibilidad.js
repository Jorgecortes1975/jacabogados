import { config } from '../lib/config.js';
import { calendario } from '../lib/calendario.js';
import { generarSlots, quitarOcupados } from '../lib/horarios.js';

export async function cuposLibres(ahora = new Date()) {
  // Un año sin lista de festivos no se ofrece: es mejor ocultar días que vender un festivo como hábil.
  const todos = generarSlots(ahora, config);
  const slots = todos.filter((s) => config.aniosConFestivos.includes(s.fecha.slice(0, 4)));
  if (slots.length < todos.length) console.warn('Hay fechas ocultas porque no hay festivos cargados para su año (lib/festivos.js).');
  if (!slots.length) return [];
  const ocupados = await calendario.ocupados(slots[0].inicio, slots.at(-1).fin);
  return quitarOcupados(slots, ocupados, config.margenMin);
}

export default async function handler(req, res) {
  try {
    const libres = await cuposLibres();
    const dias = {};
    for (const s of libres) (dias[s.fecha] ||= []).push(s.inicio);
    res.status(200).json({
      modoPrueba: config.modoPrueba,
      consulta: config.consulta,
      dias: Object.entries(dias).map(([fecha, inicios]) => ({ fecha, inicios })),
    });
  } catch (e) {
    console.error(e);
    res.status(503).json({ error: 'No fue posible consultar la agenda. Intente de nuevo en unos minutos.' });
  }
}
