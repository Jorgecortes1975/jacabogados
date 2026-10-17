// Calendario en memoria para el modo de prueba. No toca ningún calendario real.
import { config } from './config.js';

const reservas = (globalThis.__reservasPrueba ??= new Map());

// Igual que en Google: el cupo de quien no paga se libera pasado el tiempo de retención.
function liberarVencidas() {
  const limite = Date.now() - config.retencionMin * 60000;
  for (const [id, r] of reservas) if (r.estado === 'pendiente' && r.creada < limite) reservas.delete(id);
}

export async function ocupados() {
  liberarVencidas();
  return [...reservas.values()].map((r) => ({ inicio: r.inicio, fin: r.fin }));
}
export async function crearReserva({ id, inicio, fin, monto }) {
  reservas.set(id, { id, inicio, fin, monto, estado: 'pendiente', creada: Date.now() });
  return { id };
}
export async function obtenerReserva(id) {
  liberarVencidas();
  return reservas.get(id) || null;
}
export async function confirmarReserva(id) {
  const r = reservas.get(id);
  if (!r) return null;
  r.estado = 'confirmada';
  r.meetUrl = 'https://meet.google.com/enlace-de-prueba';
  return { meetUrl: r.meetUrl };
}
