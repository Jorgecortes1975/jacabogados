// Festivos nacionales de Colombia que la agenda no ofrece. Se agregan por año.
// Verificado el 17-oct-2026 contra prensa nacional (Noticias Caracol, Blu Radio, Portafolio, El Universal),
// que coincide con la regla de traslado al lunes del art. 2 de la Ley 51 de 1983 (Gestor Normativo, Función Pública).
// No se abrió el texto de la ley ni se confirmó su vigencia: Función Pública avisa que no responde por ella.
// Solo están cargados los festivos desde noviembre de 2026. Falta cargar 2027 antes de que la agenda llegue a enero.
export const FESTIVOS = {
  2026: [
    '2026-11-02', // Todos los Santos (1 de noviembre cae domingo; pasa al lunes)
    '2026-11-16', // Independencia de Cartagena (11 de noviembre pasa al lunes)
    '2026-12-08', // Inmaculada Concepción (fijo)
    '2026-12-25', // Navidad (fijo)
  ],
};
