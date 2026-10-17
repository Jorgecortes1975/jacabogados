import { calendario } from '../lib/calendario.js';
import { verificarPago } from '../lib/pagos.js';

export default async function handler(req, res) {
  const { referencia, id } = { ...req.query, ...(req.body || {}) };
  if (!/^jac[0-9a-f]{20}$/.test(referencia || '')) return res.status(400).json({ estado: 'invalida' });
  try {
    const reserva = await calendario.obtenerReserva(referencia);
    if (!reserva) {
      // Pagó pero el cupo ya se liberó (o la referencia no existe): requiere atención humana.
      return res.status(404).json({ estado: 'requiere_atencion' });
    }
    if (reserva.estado === 'confirmada') {
      return res.status(200).json({ estado: 'confirmada', inicio: reserva.inicio, meetUrl: reserva.meetUrl });
    }
    const pago = await verificarPago({ referencia, transaccionId: id || '', montoCOP: reserva.monto });
    if (!pago.aprobado) {
      // Si la pasarela no coincide con la reserva, quizá SÍ hubo un cobro: lo revisa una persona.
      const estado = { PENDING: 'pendiente', NO_ENCONTRADA: 'pendiente', NO_COINCIDE: 'requiere_atencion' }[pago.estado] || 'rechazado';
      return res.status(200).json({ estado });
    }
    const { meetUrl } = await calendario.confirmarReserva(referencia);
    res.status(200).json({ estado: 'confirmada', inicio: reserva.inicio, meetUrl });
  } catch (e) {
    console.error(e);
    res.status(503).json({ estado: 'error' });
  }
}
