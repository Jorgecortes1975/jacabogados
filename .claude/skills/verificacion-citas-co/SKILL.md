---
name: verificacion-citas-co
description: Verifica que cada cita normativa y jurisprudencial de un documento jurídico colombiano sea real, localizable en fuentes oficiales y correctamente atribuida, antes de que el documento salga del despacho. Úsala cuando el usuario pida verificar las citas de un escrito jurídico o confirmar que una norma o sentencia citada es real.
---

# Verificación de citas normativas y jurisprudenciales (Colombia)

## Por qué existe este Skill

En noviembre de 2025 la Corte Suprema de Justicia (Sala Civil), en la sentencia STC17832-2025, anuló una decisión de instancia porque el fallo contenía citas jurisprudenciales inventadas — sentencias que no existen o que decían algo distinto de lo atribuido. Ese es exactamente el riesgo que produce cualquier modelo de lenguaje, incluido Claude, cuando genera una cita sin que un proceso posterior la verifique: el texto suena plausible y el formato de la cita es correcto, pero el contenido puede ser total o parcialmente fabricado. Este Skill es el control de calidad obligatorio antes de que cualquier documento con citas normativas o jurisprudenciales salga del despacho — sin excepción, incluidos borradores "solo para uso interno" que terminan reenviándose.

## Regla de veracidad obligatoria (no negociable)

Complementando lo anterior: esta skill **nunca acepta una cita como válida sin verificarla en una fuente primaria oficial** (SUIN-Juriscol, Relatoría de la Corte Constitucional, Relatoría de la Corte Suprema, Relatoría del Consejo de Estado — ver Paso 3). Tampoco **simula** una verificación que no pudo hacer: si no tiene acceso directo a esas bases en el entorno de trabajo, debe decirlo explícitamente en la tabla de resultados en vez de marcar la cita como VERIFICADA por plausibilidad o por coincidir con lo que "suena correcto". Una cita sin verificación real documentada se trata siempre como NO LOCALIZADA, nunca como VERIFICADA por defecto.

## Cuándo usar este Skill

Actívalo sobre cualquier documento generado o editado con ayuda de Claude que contenga referencias a leyes, decretos, circulares, sentencias de la Corte Constitucional, la Corte Suprema de Justicia o el Consejo de Estado — conceptos, memorandos, tutelas, demandas, contestaciones, escritos de casación.

## Proceso (5 pasos)

**Paso 1 — Extraer cada afirmación normativa o jurisprudencial como lista numerada.**
Lee el documento completo y extrae, en una lista numerada, cada oración que invoque una norma o un precedente judicial. Incluye la cita tal como aparece en el texto (ej. "Sentencia T-406 de 1992" o "artículo 86 de la Constitución Política") y la afirmación específica que el documento le atribuye a esa fuente. No agrupes citas distintas en un mismo ítem, aunque aparezcan en el mismo párrafo.

**Paso 2 — Formular cada una como pregunta verificable.**
Convierte cada ítem de la lista en una pregunta que se pueda responder con sí/no contra una fuente primaria. Ejemplo: la afirmación "la Corte Constitucional en T-406 de 1992 estableció que la tutela procede contra particulares en posición de subordinación" se convierte en la pregunta "¿Existe la Sentencia T-406 de 1992 de la Corte Constitucional y establece esa regla específica?" No aceptes preguntas vagas tipo "¿es correcta esta cita en general?" — la pregunta debe apuntar a la existencia de la fuente Y al contenido atribuido, por separado si es necesario.

**Paso 3 — Verificar contra fuentes oficiales.**
Busca cada pregunta contra fuentes oficiales, en este orden de prioridad:
1. SUIN-Juriscol (sistema único de información normativa) para leyes, decretos y códigos.
2. Relatoría de la Corte Constitucional (buscador de sentencias por número y año) para tutelas y control de constitucionalidad.
3. Relatoría de la Corte Suprema de Justicia (por sala — Civil, Laboral, Penal) para casación y tutelas de esa corporación.
4. Relatoría del Consejo de Estado para asuntos contencioso-administrativos.
Ver `references/fuentes-oficiales.md` para el detalle de qué cubre cada fuente, cómo buscar en ella y los errores frecuentes que producen falsos "NO LOCALIZADA" o falsos "VERIFICADA" (numeración derogada, prefijo o sala equivocados, etc.).
No aceptes como fuente un resumen de segunda mano, un blog jurídico o la propia memoria del modelo sin verificación en la fuente primaria. Si no tienes acceso directo a estas bases en el entorno de trabajo, dilo explícitamente en vez de simular la verificación.

**Paso 4 — Clasificar cada cita.**
Asigna una de tres etiquetas a cada ítem:
- **VERIFICADA**: la fuente existe y respalda la afirmación tal como está redactada en el documento.
- **NO LOCALIZADA**: no fue posible encontrar la fuente citada en los sistemas oficiales consultados (puede ser un número de sentencia inexistente, un año equivocado, o una norma derogada sin señalarlo).
- **INCONSISTENTE**: la fuente existe, pero dice algo distinto, más limitado o más matizado que lo que el documento le atribuye.

**Paso 5 — Entregar tabla de resultados.**
Presenta una tabla con columnas: # | Cita textual en el documento | Fuente verificada (norma/sentencia) | Clasificación | Nota de corrección si aplica. Toda cita NO LOCALIZADA o INCONSISTENTE debe corregirse o eliminarse del documento antes de que salga del despacho — no se entrega el documento con el proceso de verificación pendiente.

## Mini-ejemplo (tabla del Paso 5 aplicada a citas ficticias)

| # | Cita textual en el documento | Fuente verificada (norma/sentencia) | Clasificación | Nota de corrección si aplica |
|---|---|---|---|---|
| 1 | "El artículo 86 de la Constitución Política consagra la acción de tutela como mecanismo preferente y sumario para la protección de derechos fundamentales." | Constitución Política, art. 86 | **VERIFICADA** | Ninguna — el texto y el contenido atribuido coinciden con la fuente oficial. |
| 2 | "La Corte Constitucional, en Sentencia T-9999 de 2023, estableció que toda EPS debe autorizar tratamientos experimentales sin excepción." | No se encontró Sentencia T-9999 de 2023 en la Relatoría consultada | **NO LOCALIZADA** | Verificar si el número, la sala o el año son correctos; no incluir esta cita en el documento final hasta confirmarla o reemplazarla. |
| 3 | "La Sentencia C-590 de 2005 de la Corte Constitucional establece que la tutela procede contra cualquier providencia judicial sin necesidad de cumplir requisitos de procedibilidad." | Sentencia C-590 de 2005 (Corte Constitucional) | **INCONSISTENTE** | La sentencia existe y trata la procedencia de la tutela contra providencias judiciales, pero sí exige el cumplimiento de requisitos generales y específicos de procedibilidad — la afirmación del documento omite esa condición central y debe corregirse, no eliminarse sin más. |

Los ítems 2 y 3 no pueden salir del despacho tal como están redactados: el ítem 2 debe corregirse o retirarse, y el ítem 3 debe reescribirse para reflejar los requisitos de procedibilidad que la sentencia sí exige.

## Cierre — límite de esta skill

Ningún documento que contenga citas normativas o jurisprudenciales sale del despacho sin que este proceso se haya completado y sin que un abogado con matrícula vigente haya revisado la tabla de resultados. Esta skill nunca certifica por sí sola que un documento está listo para radicarse o enviarse — solo produce la tabla de verificación. La verificación asistida por Claude reduce el trabajo mecánico de búsqueda; no reemplaza la responsabilidad profesional de quien firma el documento.
