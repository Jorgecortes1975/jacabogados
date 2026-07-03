---
name: auditor-de-citas
description: Audita, cita por cita, cualquier documento que contenga links o referencias a fuentes externas (memos con derecho comparado, informes sectoriales, borradores de contenido, due diligence) — confirma que el link exista, que el texto citado sea textual, que la fuente respalde la afirmación, y marca links muertos, paráfrasis presentadas como cita directa, fuentes que contradicen lo afirmado o fuentes probablemente generadas por IA. Úsala cuando el usuario pida auditar las citas o links de un documento que no sea exclusivamente sobre normas o jurisprudencia colombiana. Para un escrito jurídico colombiano cuyas citas son normas o sentencias de Colombia, usa `verificacion-citas-co` en su lugar.
---

# Auditor de citas (propósito general)

Esta skill es el fact-checker de propósito general del despacho: audita cualquier documento con links o referencias a fuentes externas — un memo que compara regulación de otro país, un informe sectorial usado en due diligence, un borrador de contenido con datos citados, un brief de research. No reemplaza a `verificacion-citas-co`; la complementa.

## Diferencia de alcance con `verificacion-citas-co` (léela antes de usar esta skill)

- **`verificacion-citas-co`**: exclusiva para citas normativas y jurisprudenciales **colombianas** (leyes, decretos, sentencias de Corte Constitucional, Corte Suprema, Consejo de Estado). Tiene su propia jerarquía de fuentes oficiales (SUIN-Juriscol, relatorías de las altas cortes) y su propio proceso de 5 pasos. Úsala siempre que el documento sea un escrito jurídico colombiano (tutela, demanda, concepto, memorando) cuyas citas sean ese tipo de fuente.
- **`auditor-de-citas` (esta skill)**: para cualquier documento con citas o links que **no** sean exclusivamente normas/jurisprudencia colombiana — memos de derecho comparado, informes de mercado, due diligence con fuentes mixtas, contenido de marketing con datos citados, o un documento mixto que combine normas colombianas con fuentes de otro tipo.
- **Documento mixto**: audita con esta skill todas las citas que no sean normas/jurisprudencia CO, y remite las que sí lo sean a `verificacion-citas-co` — no reinventes su proceso aquí.

## Regla de veracidad obligatoria (no negociable)

1. **No confirmes la existencia de una fuente sin haberla revisado realmente en el entorno de trabajo.** Si no tienes acceso real para abrir el link o buscar la fuente, dilo explícitamente en la tabla de resultados — no marques "confirmado" por default.
2. **Comparación textual palabra por palabra**, no aproximada. Una cita marcada como "directa" ("...") debe coincidir exactamente con el texto fuente; cualquier diferencia (aunque sea de una palabra) es una paráfrasis presentada como cita directa, y se marca como hallazgo.
3. **Nunca asumas que una fuente respalda una afirmación solo porque el tema coincide.** Confirma que la fuente diga específicamente lo que el documento le atribuye, no un tema relacionado.
4. **Marca explícitamente cualquier fuente que parezca generada por IA** (sin autor identificable, sin fecha, redacción genérica de "resumen", estructura típica de contenido sintético sin verificación humana visible).

## Cuándo usar esta skill

Sobre cualquier documento con links o citas a fuentes externas que no sea exclusivamente un escrito jurídico con citas normativas/jurisprudenciales colombianas.

## Proceso operativo

**Paso 1 — Extrae cada cita como lista numerada.**
Lee el documento completo y lista cada cita o referencia a una fuente externa, con el texto exacto tal como aparece en el documento y el link o referencia asociada.

**Paso 2 — Confirma que la fuente exista en el link.**
Si tienes acceso real para verificarlo, hazlo y anota el resultado. Si no tienes acceso real en este entorno, dilo explícitamente en la columna de status — nunca reportes "link válido" sin haberlo comprobado.

**Paso 3 — Confirma que el texto citado sea textual.**
Compara palabra por palabra la cita del documento contra el contenido real de la fuente.

**Paso 4 — Confirma que la fuente respalde la afirmación.**
No basta con que la fuente exista y la cita sea textual: confirma que lo que el documento concluye a partir de esa cita realmente se sostiene con el contexto completo de la fuente, no con una frase sacada de contexto.

**Paso 5 — Clasifica cada cita.**
- **OK**: fuente existe, cita textual, y respalda la afirmación.
- **Link muerto**: la fuente no es accesible en el link dado.
- **Paráfrasis como cita directa**: el texto entre comillas no coincide palabra por palabra con la fuente.
- **Fuente contradice la afirmación**: la fuente existe y es accesible, pero dice algo distinto o más matizado que lo que el documento afirma.
- **Fuente probablemente generada por IA**: sin autor ni fecha identificables, estructura de contenido sintético.
- **Norma o sentencia colombiana**: remitir a `verificacion-citas-co`, no clasificar aquí.

**Paso 6 — Entrega la tabla de resultados.**

| # | Cita original | Status | Fix sugerido |
|---|---|---|---|

## Mini-ejemplo (memo de due diligence con fuentes mixtas)

Documento auditado: un memo de due diligence para un cliente que va a adquirir una empresa con operación en México, con tres citas.

| # | Cita original | Status | Fix sugerido |
|---|---|---|---|
| 1 | "Según el reporte de [firma consultora ilustrativa], el 68% de los deals fallidos en la región citan pasivo laboral oculto." | Fuente probablemente generada por IA — no se identifica autor, fecha ni metodología en el link provisto; no se pudo confirmar acceso real al reporte en este entorno | Solicitar el reporte original al usuario o correr `cazador-de-fuentes` para localizar la fuente primaria antes de dejar esta cifra en el memo |
| 2 | "La Ley Federal del Trabajo de México, artículo 47, establece..." (con link a un blog de terceros) | Paráfrasis como cita directa — el link es un resumen de blog, no el texto oficial; el texto entre comillas no se pudo confirmar palabra por palabra contra la fuente oficial en este entorno | Buscar el texto oficial de la norma mexicana (fuente primaria) antes de mantener el formato de cita directa; si se trata en cambio de una norma colombiana, usar `verificacion-citas-co` |
| 3 | Link a comunicado de la autoridad reguladora mexicana citado en el memo | No se pudo verificar en esta sesión — sin acceso real de búsqueda en el entorno de trabajo en el momento de este ejemplo | Confirmar el link y el contenido en el momento real de la auditoría, no asumir que está vigente |

## Cierre — límite de esta skill

Esta skill confirma o refuta la fidelidad de una cita frente a su fuente; no evalúa si el argumento general del documento es correcto ni sustituye el criterio del abogado que firma el documento. Para citas normativas o jurisprudenciales colombianas, el proceso correcto sigue siendo `verificacion-citas-co`. Ningún documento con hallazgos "link muerto", "paráfrasis como cita directa", "fuente contradice la afirmación" o "fuente probablemente generada por IA" debe salir del despacho sin corregirse.
