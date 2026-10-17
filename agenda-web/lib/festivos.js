// Festivos nacionales de Colombia que la agenda no ofrece. Se agregan por año.
// Verificado el 17-oct-2026 contra prensa nacional (Noticias Caracol, Blu Radio, Portafolio, El Universal),
// que coincide con la regla de traslado al lunes del art. 2 de la Ley 51 de 1983 (Gestor Normativo, Función Pública).
// No se abrió el texto de la ley ni se confirmó su vigencia: Función Pública avisa que no responde por ella.
// 2026: solo desde noviembre (los anteriores ya pasaron). 2027: año completo, verificado el 17-oct-2026 contra
// El Universal, Publimetro, Radio Nacional, calendariodecolombia.com y festivos.com.co; coincide con la regla de la Ley 51 de 1983.
// Los años que no estén aquí NO se ofrecen en la agenda (ver api/disponibilidad.js): hay que cargarlos antes.
export const FESTIVOS = {
  2026: [
    '2026-11-02', // Todos los Santos (1 de noviembre cae domingo; pasa al lunes)
    '2026-11-16', // Independencia de Cartagena (11 de noviembre pasa al lunes)
    '2026-12-08', // Inmaculada Concepción (fijo)
    '2026-12-25', // Navidad (fijo)
  ],
  2027: [
    '2027-01-01', '2027-01-11', // Año Nuevo; Reyes Magos (6 de enero pasa al lunes)
    '2027-03-22', '2027-03-25', '2027-03-26', // San José (19 de marzo pasa al lunes); Jueves y Viernes Santo
    '2027-05-01', '2027-05-10', '2027-05-31', // Día del Trabajo (sábado); Ascensión; Corpus Christi
    '2027-06-07', '2027-07-05', '2027-07-20', // Sagrado Corazón; San Pedro y San Pablo; Independencia
    '2027-08-07', '2027-08-16', '2027-10-18', // Batalla de Boyacá (sábado); Asunción; Día de la Raza
    '2027-11-01', '2027-11-15', '2027-12-08', '2027-12-25', // Todos los Santos; Independencia de Cartagena; Inmaculada; Navidad
    // SIN VERIFICAR: unas fuentes cuentan 19 festivos en 2027 por un nuevo festivo el viernes 9 de julio (con descanso
    // el lunes 12) que atribuyen a la "Ley 2578 de 2026"; otras cuentan 18. No pude confirmar esa ley. Se bloquea por
    // prudencia (ofrecer un festivo cuesta más que ocultar un día hábil). Confirmar en fuente oficial.
    '2027-07-12',
  ],
};
