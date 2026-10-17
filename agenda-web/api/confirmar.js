import { config } from '../lib/config.js';
import { calendario } from '../lib/calendario.js';
import { verificarPago } from '../lib/pagos.js';
import { enviar } from '../lib/http.js';

export default async function handler(req, res) {
  const { referencia, id } = { ...req.query, ...(req.body || {}) };
  if (!/^jac[0-9a-f]{20}$/.test(referencia || '')) return enviar(res, 400, { estado: 'invalida' });
  try {
    const reserva = await calendario.obtenerReserva(referencia);
    if (!reserva) {
      // Pagó pero el cupo ya se liberó (o la referencia no existe): requiere atención humana.
      return enviar(res, 404, { estado: 'requiere_atencion' });
    }
    if (reserva.estado === 'confirmada') {
      return enviar(res, 200, { estado: 'confirmada', inicio: reserva.inicio, meetUrl: reserva.meetUrl });
    }
    const pago = await verificarPago({ referencia, transaccionId: id || '', montoCOP: config.consulta.precioCOP });
    if (!pago.aprobado) {
      const pendiente = ['PENDING', 'NO_ENCONTRADA'].includes(pago.estado);
      return enviar(res, 200, { estado: pendiente ? 'pendiente' : 'rechazado' });
    }
    const { meetUrl } = await calendario.confirmarReserva(referencia);
    enviar(res, 200, { estado: 'confirmada', inicio: reserva.inicio, meetUrl });
  } catch (e) {
    console.error(e);
    enviar(res, 503, { estado: 'error' });
  }
}
