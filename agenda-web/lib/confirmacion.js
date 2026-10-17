import { calendario } from './calendario.js';
import { verificarPago } from './pagos.js';

// Una sola lógica para quien confirma: la página de gracias y el aviso automático de la pasarela.
// Devuelve [código HTTP, cuerpo]. Es segura de repetir: confirmar dos veces no duplica nada.
export async function confirmarPago({ referencia, id }) {
  if (!/^jac[0-9a-f]{20}$/.test(referencia || '')) return [400, { estado: 'invalida' }];
  const reserva = await calendario.obtenerReserva(referencia);
  // Pagó pero el cupo ya se liberó (o la referencia no existe): requiere atención humana.
  if (!reserva) return [404, { estado: 'requiere_atencion' }];
  if (reserva.estado === 'confirmada') {
    return [200, { estado: 'confirmada', inicio: reserva.inicio, meetUrl: reserva.meetUrl }];
  }
  const pago = await verificarPago({ referencia, transaccionId: id || '', montoCOP: reserva.monto });
  if (!pago.aprobado) {
    // Si la pasarela no coincide con la reserva, quizá SÍ hubo un cobro: lo revisa una persona.
    const estado = { PENDING: 'pendiente', NO_ENCONTRADA: 'pendiente', NO_COINCIDE: 'requiere_atencion' }[pago.estado] || 'rechazado';
    return [200, { estado }];
  }
  const { meetUrl } = await calendario.confirmarReserva(referencia);
  return [200, { estado: 'confirmada', inicio: reserva.inicio, meetUrl }];
}
