import { randomBytes } from 'node:crypto';
import { config } from '../lib/config.js';
import { calendario } from '../lib/calendario.js';
import { crearCheckout } from '../lib/pagos.js';
import { cuposLibres } from './disponibilidad.js';

const limpio = (v, max) => (typeof v === 'string' ? v : '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
const EMAIL = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/; // una sola dirección; Google rechaza lo demás al invitar

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido.' });
  const b = req.body || {};
  const datos = {
    nombre: limpio(b.nombre, 120),
    email: limpio(b.email, 160).toLowerCase(),
    telefono: limpio(b.telefono, 30),
    tema: limpio(b.tema, 200),
  };
  if (datos.nombre.length < 3) return res.status(400).json({ error: 'Escriba su nombre completo.' });
  if (!EMAIL.test(datos.email)) return res.status(400).json({ error: 'Escriba un correo válido.' });
  if (datos.telefono.replace(/\D/g, '').length < 7) return res.status(400).json({ error: 'Escriba un celular válido.' });
  if (datos.tema.length < 3) return res.status(400).json({ error: 'Indique en una frase el tema de su consulta.' });
  if (b.autoriza !== true) return res.status(400).json({ error: 'Debe aceptar el tratamiento de datos personales para continuar.' });

  const inicio = new Date(b.inicio);
  if (!b.inicio || Number.isNaN(inicio.getTime())) return res.status(400).json({ error: 'Escoja un horario.' });

  try {
    const cupo = (await cuposLibres()).find((s) => s.inicio === inicio.toISOString());
    if (!cupo) return res.status(409).json({ error: 'Ese horario ya no está disponible. Escoja otro.' });

    const referencia = `jac${randomBytes(10).toString('hex')}`;
    await calendario.crearReserva({ id: referencia, inicio: cupo.inicio, fin: cupo.fin, datos, monto: config.consulta.precioCOP });
    const url = crearCheckout({
      referencia,
      montoCOP: config.consulta.precioCOP,
      urlRetorno: `${process.env.SITIO_URL ?? ''}/gracias.html?ref=${referencia}`,
    });
    res.status(200).json({ referencia, url });
  } catch (e) {
    console.error(e);
    res.status(503).json({ error: 'No fue posible reservar el horario. Intente de nuevo.' });
  }
}
