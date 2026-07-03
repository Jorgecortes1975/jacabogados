---
name: redaccion-tutela-co
description: Genera el borrador estructurado de una acción de tutela colombiana (hechos, derecho invocado, pretensiones, pruebas), citando exclusivamente fuentes cargadas por el usuario en la conversación. Úsala cuando el usuario pida redactar una tutela o un primer borrador por vulneración de un derecho fundamental.
---

# Redacción de acción de tutela (Colombia)

## Cuándo usar este Skill

Cuando el abogado necesita un primer borrador de una acción de tutela (artículo 86 de la Constitución Política, Decreto 2591 de 1991) a partir de los hechos del caso, ya sea para vulneración directa de un derecho fundamental o como mecanismo transitorio para evitar un perjuicio irremediable.

## Regla de veracidad obligatoria (no negociable): solo fuentes cargadas

Este Skill cita exclusivamente jurisprudencia, normas y hechos que el usuario haya cargado explícitamente en la conversación (documentos adjuntos, texto pegado, o hechos narrados directamente). Si el borrador necesita invocar un precedente de la Corte Constitucional y ese precedente no fue cargado por el usuario, el Skill debe:
1. Marcar el espacio con `[VERIFICAR: cita pendiente — Corte Constitucional, tema: {tema}]`, y
2. Recomendar correr el Skill `verificacion-citas-co` antes de completar esa sección.
No se inventan números de sentencia, años ni contenido jurisprudencial bajo ninguna circunstancia. Un borrador con huecos marcados es aceptable; un borrador con citas fabricadas no lo es.

## Estructura obligatoria de la tutela

El borrador debe seguir, en este orden y conforme a los requisitos del Decreto 2591 de 1991, estas siete secciones: (1) Encabezado, (2) Hechos, (3) Derecho fundamental invocado, (4) Procedibilidad de la tutela, (5) Pretensiones, (6) Pruebas, (7) Juramento y anexos finales.

Ver `references/estructura-tutela.md` para el detalle completo y los requisitos específicos de cada sección — en particular la sección 4 (Procedibilidad), que no puede omitirse porque es el punto que más frecuentemente motiva el rechazo o la improcedencia, y la sección 5 (Pretensiones), que debe redactarse siempre como orden judicial ejecutable y nunca en términos genéricos.

## Proceso operativo

1. Solicitar al usuario, si no los ha dado ya, los hechos completos, el derecho que considera vulnerado y cualquier documento de soporte.
2. Redactar la sección de Hechos primero y hacer que el usuario la confirme antes de continuar — es la base de todo lo demás.
3. Redactar Derecho invocado y Procedibilidad, marcando explícitamente cualquier cita no verificada.
4. Redactar Pretensiones en lenguaje de orden judicial ejecutable.
5. Listar Pruebas contra los documentos efectivamente cargados.
6. Entregar el borrador completo con todas las marcas `[VERIFICAR: ...]` visibles, y recordar al usuario correr `verificacion-citas-co` antes de radicar.

## Mini-ejemplo (hechos ficticios anonimizados)

**Hechos aportados por el usuario**: la accionante, "AA" (nombre real conocido solo por el abogado, no incluido en el borrador de trabajo), fue desvinculada de su EPS ficticia "Salud Total Andina" tras dejar de cotizar dos meses por pérdida de empleo. Requiere continuar un tratamiento oncológico en curso y la EPS le informó verbalmente que el servicio queda suspendido hasta que se pongan al día los aportes.

**Fragmento del borrador que produciría esta skill:**

> **3. Derecho fundamental invocado**: derecho a la salud (artículo 49 de la Constitución Política) en conexidad con el derecho a la vida digna, de la accionante AA, actualmente en tratamiento oncológico activo.
>
> **4. Procedibilidad de la tutela**: se invoca la tutela como mecanismo principal por tratarse de un sujeto de especial protección constitucional (paciente con enfermedad catastrófica en tratamiento activo), donde la suspensión del servicio genera un perjuicio irremediable si se exige agotar la vía administrativa ordinaria ante la EPS. `[VERIFICAR: cita pendiente — Corte Constitucional, tema: continuidad del servicio de salud pese a mora en aportes durante desempleo]`.
>
> **5. Pretensiones**: PRIMERO. Ordenar a Salud Total Andina EPS que reanude, de forma inmediata e ininterrumpida, el tratamiento oncológico de la accionante AA, sin exigir como condición previa el pago de los aportes en mora. SEGUNDO. Ordenar que dicho pago en mora se gestione por el mecanismo de recobro o cobro persuasivo que corresponda, sin que ello suspenda la prestación del servicio.

Nótese la marca `[VERIFICAR: ...]` en la sección de Procedibilidad: el usuario no cargó jurisprudencia sobre continuidad del servicio de salud en mora, así que la skill no inventa un número de sentencia — deja el hueco marcado y recomienda correr `verificacion-citas-co` antes de completarlo.

## Cierre — límite de esta skill

Este Skill produce un borrador de trabajo, no una tutela lista para radicar. Nunca presenta la tutela ante el juez de reparto ni decide su viabilidad procesal — esas son decisiones y actos exclusivos del abogado responsable del caso. La decisión de radicar, el juez de reparto exacto, la estrategia frente al término de 10 días para el fallo, y la firma del escrito corresponden a ese abogado.
