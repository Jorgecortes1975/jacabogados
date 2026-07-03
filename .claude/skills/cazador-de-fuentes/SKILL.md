---
name: cazador-de-fuentes
description: Encuentra fuentes primarias verificables (regulación extranjera, comunicados de superintendencias y entidades oficiales, filings corporativos, papers peer-reviewed, piezas firmadas por periodistas) para sustentar una afirmación de negocio o de derecho comparado, con cita textual y referencia exacta de página o párrafo — nunca un resumen de segunda mano ni una fuente generada por IA. Úsala cuando el usuario pida encontrar fuentes primarias para sustentar una afirmación, verificar un dato de un informe sectorial, o respaldar una afirmación sobre regulación de otro país para un cliente con operación extranjera. Si la afirmación es específicamente una norma o sentencia colombiana, usa `verificacion-citas-co` en su lugar.
---

# Cazador de fuentes primarias

El despacho asesora empresas extranjeras que entran a Colombia, pymes exportadoras y clientes en due diligence de M&A: buena parte de ese trabajo exige sustentar afirmaciones sobre regulación de otros países (SEC, GDPR, autoridades tributarias extranjeras), cifras de papers económicos, o comunicados de entidades oficiales — material que **no** cubre `verificacion-citas-co`, porque esa skill está diseñada solo para normas y jurisprudencia colombianas contra SUIN-Juriscol y las relatorías de las altas cortes. Esta skill es el equivalente para todo lo demás.

## Regla de veracidad obligatoria (no negociable)

1. **Nunca inventes un link, una cita textual, un autor o una institución.** Si no puedes localizar una fuente primaria real para una afirmación, repórtalo como "sin fuente primaria localizada" — no rellenes el hueco con algo plausible.
2. **Si no tienes acceso real de búsqueda en el entorno de trabajo en este momento, dilo explícitamente.** No simules una búsqueda ni presentes una tabla de fuentes como si las hubieras confirmado cuando no lo hiciste. Esta es la misma disciplina del Paso 3 de `verificacion-citas-co`.
3. **Toda cifra de mercado, dato estadístico o estimación que no venga de una fuente primaria confirmada se marca como "estimación no verificada"** con su nivel de confianza (alto/medio/bajo), nunca como dato duro.
4. **Antes de aceptar una tarea, revisa si la afirmación es en realidad una norma o sentencia colombiana** (ley, decreto, circular, o fallo de Corte Constitucional/Corte Suprema/Consejo de Estado). Si lo es, detén el proceso y remite al usuario a `verificacion-citas-co`, que tiene el proceso de 5 pasos y la jerarquía de fuentes oficiales correcta para eso.

## Cuándo usar esta skill

Cuando el usuario necesite sustentar con fuente primaria una afirmación que **no** sea una cita normativa o jurisprudencial colombiana: regulación extranjera relevante para un cliente con operación internacional, un dato usado en un memo de due diligence, una cifra citada en un informe sectorial, o cualquier afirmación de un borrador de contenido que vaya a salir en público.

## Proceso operativo

**Paso 1 — Aísla la afirmación exacta.**
Pide al usuario la oración específica que necesita sourcing, palabra por palabra. No trabajes sobre un tema genérico ("cómo funciona el GDPR") sino sobre la afirmación puntual que el documento hace ("una transferencia internacional de datos sin base legal puede generar una multa de hasta el 4% de la facturación anual global bajo el GDPR").

**Paso 2 — Filtro de jurisdicción.**
Si la afirmación es una norma o sentencia colombiana, detente y remite a `verificacion-citas-co`. Si es regulación extranjera, jurisprudencia comparada, un dato económico o un hecho corporativo, continúa.

**Paso 3 — Busca hasta 5 fuentes primarias.**
Tipos aceptados: texto oficial de la norma extranjera (diario oficial, sitio del regulador), comunicados o resoluciones de la autoridad competente (SEC, autoridades de protección de datos, superintendencias equivalentes), filings corporativos públicos, papers peer-reviewed, piezas firmadas por periodistas especializados con nombre y medio identificables. Nunca cuentan como fuente primaria: Wikipedia, foros/Reddit, agregadores de noticias sin firma, resúmenes generados por IA, blogs de otras firmas de abogados presentados como si fueran la fuente original.

**Paso 4 — Para cada fuente, registra:**
- Link completo.
- Fecha de publicación o de la norma/decisión.
- Autor o institución.
- Quote textual exacto (no parafraseado).
- Referencia de página, artículo o párrafo dentro de la fuente.

**Paso 5 — Marca cualquier afirmación sin fuente primaria localizada.**
Si después de una búsqueda real no aparece una fuente primaria que sostenga la afirmación, repórtalo como tal — no la reemplaces por una fuente secundaria disfrazada de primaria.

**Paso 6 — Entrega la tabla numerada.**

| # | Afirmación cubierta | Fuente (link) | Fecha | Autor/institución | Quote textual | Referencia (pág./párr.) |
|---|---|---|---|---|---|---|

## Mini-ejemplo (cliente con operación en Europa)

**Contexto**: una pyme colombiana de software con usuarios en la Unión Europea le pide al despacho confirmar la cifra máxima de sanción bajo el GDPR antes de firmar un contrato de procesamiento de datos con un cliente español.

**Afirmación a sustentar**: "Bajo el Reglamento General de Protección de Datos (GDPR), una infracción grave puede sancionarse hasta con el 4% de la facturación anual global de la empresa o 20 millones de euros, lo que sea mayor."

**Paso 2 (filtro)**: no es norma colombiana → continúa esta skill (no aplica `verificacion-citas-co`).

**Resultado del Paso 3-4** (formato de entrega — en un caso real cada fila debe llenarse con la búsqueda efectivamente realizada en el momento, no copiarse de este ejemplo):

| # | Afirmación cubierta | Fuente (link) | Fecha | Autor/institución | Quote textual | Referencia |
|---|---|---|---|---|---|---|
| 1 | Techo de sanción del 4%/20M EUR | [pendiente — buscar texto consolidado del Reglamento (UE) 2016/679 en EUR-Lex en el momento de la tarea] | — | Parlamento Europeo y Consejo de la UE | [pendiente de extracción textual del Art. 83(5)] | Art. 83, numeral 5 |
| 2 | — | sin fuente primaria localizada en esta sesión (no se ejecutó una búsqueda real) | — | — | — | — |

Nota de honestidad: en este mini-ejemplo no se realizó una búsqueda real contra EUR-Lex, así que la fila 1 se deja marcada como pendiente en vez de rellenarse con un texto inventado. Al usar la skill sobre un caso real, esta fila debe completarse con el link y el quote efectivamente confirmados, o quedar como "sin fuente primaria localizada" si la búsqueda no tuvo éxito.

## Cierre — límite de esta skill

Esta skill encuentra y documenta fuentes; no interpreta si esa fuente es aplicable al caso del cliente ni sustituye el análisis legal del abogado responsable. Tampoco decide si una afirmación sin fuente localizada debe eliminarse o matizarse del documento final — eso lo decide el abogado que firma. Para citas normativas o jurisprudenciales colombianas, el control de calidad correcto sigue siendo `verificacion-citas-co`, no esta skill.
