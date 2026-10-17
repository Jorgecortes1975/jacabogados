import { FESTIVOS } from './festivos.js';

const env = process.env;
const modoPrueba = env.MODO_PRUEBA !== '0'; // seguro por defecto: solo se cobra si MODO_PRUEBA=0 de forma expresa

// En producción no se arranca con datos faltantes ni con un precio dudoso: es dinero real.
if (!modoPrueba) {
  const requeridas = ['SITIO_URL', 'WOMPI_PUBLIC_KEY', 'WOMPI_INTEGRITY_SECRET', 'GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'GOOGLE_REFRESH_TOKEN'];
  const faltan = requeridas.filter((k) => !env[k]);
  if (faltan.length) throw new Error(`Falta configurar: ${faltan.join(', ')}`);
  if (!/^[1-9]\d*$/.test(env.CONSULTA_PRECIO_COP || '')) {
    throw new Error('CONSULTA_PRECIO_COP debe ser un número entero de pesos, sin puntos ni comas (ej. 150000).');
  }
}

export const config = {
  modoPrueba,
  consulta: {
    nombre: env.CONSULTA_NOMBRE || 'Consulta jurídica inicial',
    duracionMin: 45,
    precioCOP: modoPrueba ? Number(env.CONSULTA_PRECIO_COP) || 150000 : Number(env.CONSULTA_PRECIO_COP), // 150000 solo en prueba
  },

  // Horario aprobado: lunes a viernes, hora de Colombia (UTC-5, sin cambio de hora).
  diasHabiles: [1, 2, 3, 4, 5],
  franjas: [['08:00', '12:00'], ['14:00', '17:00']],
  margenMin: 15,
  antelacionHoras: 24, // supuesto: coherente con la regla de 24 horas; ajustable
  diasVentana: 30,     // supuesto: cuántos días hacia adelante se ofrece agenda
  retencionMin: 30,    // tiempo que se reserva el cupo mientras el cliente paga
  festivos: [...Object.values(FESTIVOS).flat(), ...(env.FESTIVOS || '').split(',').map((s) => s.trim()).filter(Boolean)],
  aniosConFestivos: Object.keys(FESTIVOS),
};
