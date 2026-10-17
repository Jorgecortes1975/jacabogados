// Calendario en memoria para el modo de prueba. No toca ningún calendario real.
const reservas = (globalThis.__reservasPrueba ??= new Map());

export async function ocupados() {
  return [...reservas.values()].map((r) => ({ inicio: r.inicio, fin: r.fin }));
}
export async function crearReserva({ id, inicio, fin, datos }) {
  reservas.set(id, { id, inicio, fin, datos, estado: 'pendiente', creada: Date.now() });
  return { id };
}
export async function obtenerReserva(id) {
  return reservas.get(id) || null;
}
export async function confirmarReserva(id) {
  const r = reservas.get(id);
  r.estado = 'confirmada';
  r.meetUrl = 'https://meet.google.com/enlace-de-prueba';
  return { meetUrl: r.meetUrl };
}
export function limpiarPrueba() { reservas.clear(); }
