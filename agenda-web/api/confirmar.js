import { confirmarPago } from '../lib/confirmacion.js';

export default async function handler(req, res) {
  try {
    const [codigo, cuerpo] = await confirmarPago({ ...req.query, ...(req.body || {}) });
    res.status(codigo).json(cuerpo);
  } catch (e) {
    console.error(e);
    res.status(503).json({ estado: 'error' });
  }
}
