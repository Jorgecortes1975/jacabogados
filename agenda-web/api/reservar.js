import { randomBytes } from 'node:crypto';
import { config } from '../lib/config.js';
import { calendario } from '../lib/calendario.js';
import { crearCheckout } from '../lib/pagos.js';
import { cuposLibres } from './disponibilidad.js';
import { enviar, origen } from '../lib/http.js';

const limpio = (v, max) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') return enviar(res, 405, { error: 'Método no permitido.' });
  const b = req.body || {};
  const datos = {
    nombre: limpio(b.nombre, 120),
    email: limpio(b.email, 160).toLowerCase(),
    telefono: limpio(b.telefono, 30),
    tema: limpio(b.tema, 200),
  };
  if (datos.nombre.length < 3) return enviar(res, 400, { error: 'Escriba su nombre completo.' });
  if (!EMAIL.test(datos.email)) return enviar(res, 400, { error: 'Escriba un correo válido.' });
  if (datos.telefono.replace(/\D/g, '').length < 7) return enviar(res, 400, { error: 'Escriba un celular válido.' });
  if (datos.tema.length < 3) return enviar(res, 400, { error: 'Indique en una frase el tema de su consulta.' });
  if (b.autoriza !== true) return enviar(res, 400, { error: 'Debe aceptar el tratamiento de datos personales para continuar.' });

  try {
    const cupo = (await cuposLibres()).find((s) => s.inicio === new Date(b.inicio).toISOString());
    if (!cupo) return enviar(res, 409, { error: 'Ese horario ya no está disponible. Escoja otro.' });

    const referencia = `jac${randomBytes(10).toString('hex')}`;
    await calendario.crearReserva({ id: referencia, inicio: cupo.inicio, fin: cupo.fin, datos });
    const url = crearCheckout({
      referencia,
      montoCOP: config.consulta.precioCOP,
      urlRetorno: `${origen(req)}/gracias.html?ref=${referencia}`,
    });
    enviar(res, 200, { referencia, url });
  } catch (e) {
    console.error(e);
    enviar(res, 503, { error: 'No fue posible reservar el horario. Intente de nuevo.' });
  }
}
