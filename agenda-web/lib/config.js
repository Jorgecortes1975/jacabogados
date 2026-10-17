const env = process.env;

export const config = {
  // Seguro por defecto: solo se cobra de verdad si MODO_PRUEBA=0 de forma expresa.
  modoPrueba: env.MODO_PRUEBA !== '0',
  sitioUrl: (env.SITIO_URL || '').replace(/\/$/, ''),

  consulta: {
    nombre: env.CONSULTA_NOMBRE || 'Consulta jurídica inicial',
    duracionMin: 45,
    precioCOP: Number(env.CONSULTA_PRECIO_COP) || 150000, // provisional
  },

  // Horario aprobado: lunes a viernes, hora de Colombia (UTC-5, sin cambio de hora).
  diasHabiles: [1, 2, 3, 4, 5],
  franjas: [['08:00', '12:00'], ['14:00', '17:00']],
  margenMin: 60,
  antelacionHoras: 24, // supuesto: coherente con la regla de 24 horas; ajustable
  diasVentana: 30,     // supuesto: cuántos días hacia adelante se ofrece agenda
  retencionMin: 30,    // tiempo que se reserva el cupo mientras el cliente paga
  festivos: (env.FESTIVOS || '').split(',').map((s) => s.trim()).filter(Boolean),
};
