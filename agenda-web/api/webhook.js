import { confirmarPago } from '../lib/confirmacion.js';

// Aviso automático de la pasarela: confirma la reserva aunque el cliente cierre el navegador.
// No se confía en el contenido del aviso: solo se toman el número de transacción y la referencia,
// y confirmarPago le vuelve a preguntar a la pasarela. La forma del aviso es un SUPUESTO sin verificar.
export default async function handler(req, res) {
  const t = req.body?.data?.transaction;
  if (!t?.id || !t?.reference) return res.status(400).json({ error: 'Aviso sin transacción.' });
  try {
    const [, cuerpo] = await confirmarPago({ referencia: t.reference, id: t.id });
    // 'pendiente' = el pago aún no está aprobado: se responde con error para que la pasarela reintente
    // (que reintente ante un error es un SUPUESTO sin verificar). Los demás resultados ya son definitivos.
    res.status(cuerpo.estado === 'pendiente' ? 503 : 200).json({ ok: cuerpo.estado === 'confirmada', estado: cuerpo.estado });
  } catch (e) {
    console.error(e);
    res.status(503).json({ ok: false }); // un error de verdad: que la pasarela reintente
  }
}
