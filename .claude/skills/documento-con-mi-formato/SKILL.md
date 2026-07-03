---
name: documento-con-mi-formato
description: Aprende la estructura, el orden de secciones y el tono de un tipo de documento recurrente del despacho (informe de due diligence, memorando interno, minuta de reunión, propuesta de honorarios) a partir de 1-2 documentos reales de referencia, y lo aplica de ahí en adelante sin que el usuario tenga que volver a explicar el formato cada vez. Úsala cuando el usuario pida que un tipo de documento se genere siempre con su formato habitual, enseñarle a Claude la estructura de un reporte que pide seguido, o dejar de explicar cada vez cómo se arma cierto documento.
---

# Documento con mi formato

Le enseñas a esta skill la forma de un documento una sola vez — su estructura,
su orden de secciones, su tono — para que deje de explicarse cada vez que se
pide. Esto es distinto de `imitador-de-voz` (que copia el estilo de
*redacción* de Jorge Cortés para contenido de marketing) y de las skills que
ya generan un documento específico con su propia lógica (`facturacion-horas-co`
para cuentas de cobro, `gobierno-corporativo-co` para actas): esta skill sirve
para cualquier OTRO documento recurrente del despacho que todavía no tiene una
skill propia — informes de due diligence, memorandos internos, minutas,
propuestas de honorarios, cartas de encargo.

## Regla de veracidad obligatoria (no negociable)

Esta skill copia la **forma** del documento, nunca su **contenido de fondo**:

1. **Nunca traslada hechos, cifras ni nombres del documento de referencia al
   documento nuevo.** El documento de referencia enseña estructura y tono —
   secciones, orden, longitud por sección, nivel de formalidad — no datos.
   Si el resultado incluye algo que suena sacado del documento de referencia
   y no de lo que el usuario pidió para el documento nuevo, es un error de
   esta skill, no una función.
2. **Nunca inventa una cita normativa, cifra o conclusión jurídica para
   llenar una sección que el usuario no completó.** Si una sección de la
   plantilla exige un dato que no se ha dado (ej. "fundamento normativo"),
   la sección queda marcada `[PENDIENTE — completar antes de enviar]`, nunca
   rellena con algo plausible.
3. **Confidencialidad del documento de referencia (Art. 28, Ley 1123 de
   2007)**: si el documento de referencia es de un cliente real, debe
   anonimizarse antes de usarse como muestra — nombres, cifras y hechos
   identificables se reemplazan por marcadores genéricos. Esta skill nunca
   guarda ni reutiliza el contenido de fondo de un documento de cliente,
   solo su forma.
4. **Cualquier cita normativa específica** que aparezca en el documento
   nuevo debe marcarse `[verificar antes de enviar — correr
   `verificacion-citas-co`]` si no se verificó en esta misma sesión.

## Cuándo usar esta skill

Cuando el usuario pida un tipo de documento que se repite en el despacho y
todavía no tenga su propia skill dedicada — un informe, una propuesta, una
minuta, una carta — y quiera que a partir de ahora se genere siempre con la
misma estructura sin tener que volver a explicarla.

## Proceso operativo

**Paso 1 — Preguntar el tipo de documento y sus parámetros.**
Si no te los dieron, pregunta: qué tipo de documento es, a quién va dirigido
(cliente, socio, autoridad), extensión objetivo aproximada, y nivel de
formalidad (ej. "carta formal a un juzgado" vs. "correo interno entre
socios"). No asumas ninguno de estos cuatro datos.

**Paso 2 — Pedir 1 o 2 documentos reales de referencia.**
Pide al usuario que pegue o adjunte 1-2 ejemplos reales del mismo tipo de
documento que ya haya escrito o aprobado. Si el documento es de un cliente
real, recuérdale anonimizarlo antes de compartirlo (Regla 3 de arriba) —
no proceses un documento de cliente sin esa anonimización.

**Paso 3 — Extraer la plantilla de forma, no de fondo.**
De los documentos de referencia, extrae únicamente: las secciones fijas y su
orden, el encabezado y nivel de detalle de cada una, la extensión relativa
entre secciones (cuál es más larga, cuál es solo un párrafo), y el registro
de tono (formal/informal, primera o tercera persona, uso o no de citas
normativas dentro del cuerpo). No copies ninguna cifra, nombre o conclusión
de fondo del documento de referencia.

**Paso 4 — Confirmar la plantilla con el usuario antes de aplicarla.**
Presenta la plantilla extraída como una lista de secciones con una línea de
qué va en cada una (nunca el contenido completo, solo la función de la
sección). Pide confirmación explícita o ajustes antes de usarla. Esta
plantilla confirmada es la que se reutiliza de ahí en adelante para ese tipo
de documento — no hace falta repetir los pasos 1-3 la próxima vez que se pida
el mismo tipo de documento, salvo que el usuario quiera cambiarla.

**Paso 5 — Generar el documento nuevo con esa plantilla.**
Aplica la plantilla confirmada al contenido real que el usuario pida en cada
ocasión futura. Cualquier sección sin suficiente información recibida queda
marcada `[PENDIENTE]` en vez de rellenarse con contenido inventado.

## Mini-ejemplo

**Tipo de documento**: informe de seguimiento mensual de un caso para el
cliente (distinto del reporte de avance de `status-update`, que es semanal y
más corto — este es el informe formal mensual que se archiva en el
expediente).

*Documento de referencia (anonimizado que trajo el usuario, resumen de su
forma)*: encabezado con datos del caso y periodo → "1. Actuaciones del
periodo" (la sección más larga) → "2. Análisis de riesgo actualizado" →
"3. Próximos pasos y plazos" → "4. Honorarios y gastos del periodo" (remite a
`facturacion-horas-co` para el desglose) → firma del abogado responsable.

*Plantilla confirmada con el usuario*:
1. Encabezado: cliente, número de expediente, periodo cubierto.
2. Actuaciones del periodo — la sección más extensa, en orden cronológico.
3. Análisis de riesgo actualizado — 1 párrafo, con nivel (bajo/medio/alto)
   y qué cambió desde el informe anterior.
4. Próximos pasos y plazos — lista con fechas.
5. Honorarios y gastos del periodo — remite al desglose de
   `facturacion-horas-co`, nunca lo recalcula por su cuenta.
6. Firma del abogado responsable.

*Aplicación futura*: la próxima vez que el usuario pida "el informe mensual
de [cliente]", esta skill ya no vuelve a preguntar la estructura — solo pide
el contenido real de cada sección para ese caso y periodo específico, y
marca `[PENDIENTE]` cualquier sección sin datos suficientes.

## Cierre — límite de esta skill

Esta skill nunca redacta contenido jurídico de fondo por su cuenta — solo
aplica una forma ya confirmada por el usuario a datos que el propio usuario
aporta en cada ocasión. Cualquier cita normativa específica queda marcada
para verificación, cualquier sección sin información suficiente queda
marcada `[PENDIENTE]`, y la revisión final del documento antes de enviarlo a
un cliente o presentarlo ante una autoridad es siempre responsabilidad del
abogado que lo firma.
