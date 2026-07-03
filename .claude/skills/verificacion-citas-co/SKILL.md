---
name: verificacion-citas-co
description: Verifica que cada cita normativa y jurisprudencial de un documento jurídico colombiano sea real, localizable en fuentes oficiales y correctamente atribuida, antes de que el documento salga del despacho.
---

# Verificación de citas normativas y jurisprudenciales (Colombia)

## Por qué existe este Skill

En noviembre de 2025 la Corte Suprema de Justicia (Sala Civil), en la sentencia STC17832-2025, anuló una decisión de instancia porque el fallo contenía citas jurisprudenciales inventadas — sentencias que no existen o que decían algo distinto de lo atribuido. Ese es exactamente el riesgo que produce cualquier modelo de lenguaje, incluido Claude, cuando genera una cita sin que un proceso posterior la verifique: el texto suena plausible y el formato de la cita es correcto, pero el contenido puede ser total o parcialmente fabricado. Este Skill es el control de calidad obligatorio antes de que cualquier documento con citas normativas o jurisprudenciales salga del despacho — sin excepción, incluidos borradores "solo para uso interno" que terminan reenviándose.

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
No aceptes como fuente un resumen de segunda mano, un blog jurídico o la propia memoria del modelo sin verificación en la fuente primaria. Si no tienes acceso directo a estas bases en el entorno de trabajo, dilo explícitamente en vez de simular la verificación.

**Paso 4 — Clasificar cada cita.**
Asigna una de tres etiquetas a cada ítem:
- **VERIFICADA**: la fuente existe y respalda la afirmación tal como está redactada en el documento.
- **NO LOCALIZADA**: no fue posible encontrar la fuente citada en los sistemas oficiales consultados (puede ser un número de sentencia inexistente, un año equivocado, o una norma derogada sin señalarlo).
- **INCONSISTENTE**: la fuente existe, pero dice algo distinto, más limitado o más matizado que lo que el documento le atribuye.

**Paso 5 — Entregar tabla de resultados.**
Presenta una tabla con columnas: # | Cita textual en el documento | Fuente verificada (norma/sentencia) | Clasificación | Nota de corrección si aplica. Toda cita NO LOCALIZADA o INCONSISTENTE debe corregirse o eliminarse del documento antes de que salga del despacho — no se entrega el documento con el proceso de verificación pendiente.

## Regla de cierre

Ningún documento que contenga citas normativas o jurisprudenciales sale del despacho sin que este proceso se haya completado y sin que un abogado con matrícula vigente haya revisado la tabla de resultados. La verificación asistida por Claude reduce el trabajo mecánico de búsqueda; no reemplaza la responsabilidad profesional de quien firma el documento.
