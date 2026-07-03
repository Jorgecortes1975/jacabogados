---
name: redaccion-tutela-co
description: Genera el borrador estructurado de una acción de tutela colombiana (hechos, derecho invocado, pretensiones, pruebas), citando exclusivamente fuentes cargadas por el usuario en la conversación.
---

# Redacción de acción de tutela (Colombia)

## Cuándo usar este Skill

Cuando el abogado necesita un primer borrador de una acción de tutela (artículo 86 de la Constitución Política, Decreto 2591 de 1991) a partir de los hechos del caso, ya sea para vulneración directa de un derecho fundamental o como mecanismo transitorio para evitar un perjuicio irremediable.

## Regla no negociable: solo fuentes cargadas

Este Skill cita exclusivamente jurisprudencia, normas y hechos que el usuario haya cargado explícitamente en la conversación (documentos adjuntos, texto pegado, o hechos narrados directamente). Si el borrador necesita invocar un precedente de la Corte Constitucional y ese precedente no fue cargado por el usuario, el Skill debe:
1. Marcar el espacio con `[VERIFICAR: cita pendiente — Corte Constitucional, tema: {tema}]`, y
2. Recomendar correr el Skill `verificacion-citas-co` antes de completar esa sección.
No se inventan números de sentencia, años ni contenido jurisprudencial bajo ninguna circunstancia. Un borrador con huecos marcados es aceptable; un borrador con citas fabricadas no lo es.

## Estructura obligatoria de la tutela

El borrador debe seguir esta estructura, en este orden, conforme a los requisitos del Decreto 2591 de 1991:

**1. Encabezado**
Juez de reparto competente (regla general: juez del lugar donde ocurrió la vulneración o donde produce efectos), datos completos del accionante y del accionado.

**2. Hechos**
Narración cronológica, numerada, de los hechos que dan lugar a la acción. Cada hecho debe ser una afirmación verificable y debe corresponder a lo narrado o documentado por el usuario — no se infieren hechos no mencionados ni se rellenan vacíos narrativos con suposiciones.

**3. Derecho fundamental invocado**
Identificación precisa del derecho o derechos fundamentales presuntamente vulnerados o amenazados (ej. salud, debido proceso, petición, mínimo vital), con la relación directa entre cada hecho narrado y el derecho que ese hecho vulnera. Si el usuario cargó jurisprudencia de sustento, se cita aquí con la referencia exacta que el usuario proporcionó.

**4. Procedibilidad de la tutela**
Argumento breve sobre por qué no existe otro mecanismo de defensa judicial eficaz, o por qué —existiendo— se invoca como mecanismo transitorio para evitar un perjuicio irremediable (art. 86 C.P., inciso 3). Esta sección no puede omitirse: es el punto que más frecuentemente motiva el rechazo o la improcedencia.

**5. Pretensiones**
Listado numerado y concreto de lo que se pide al juez de tutela — nunca pretensiones genéricas tipo "que se tutelen los derechos". Cada pretensión debe ser una orden específica y ejecutable (ej. "Ordenar a la EPS X autorizar y practicar el procedimiento Y dentro de las 48 horas siguientes a la notificación del fallo").

**6. Pruebas**
Listado de los documentos anexos aportados por el usuario, identificados uno por uno (no como bloque genérico "se anexan pruebas"). Si el usuario no cargó soporte documental para un hecho relevante, se señala expresamente como pendiente.

**7. Juramento y anexos finales**
Declaración de no haber presentado otra acción de tutela por los mismos hechos y derechos (art. 37 Decreto 2591 de 1991), salvo que el usuario indique lo contrario.

## Proceso operativo

1. Solicitar al usuario, si no los ha dado ya, los hechos completos, el derecho que considera vulnerado y cualquier documento de soporte.
2. Redactar la sección de Hechos primero y hacer que el usuario la confirme antes de continuar — es la base de todo lo demás.
3. Redactar Derecho invocado y Procedibilidad, marcando explícitamente cualquier cita no verificada.
4. Redactar Pretensiones en lenguaje de orden judicial ejecutable.
5. Listar Pruebas contra los documentos efectivamente cargados.
6. Entregar el borrador completo con todas las marcas `[VERIFICAR: ...]` visibles, y recordar al usuario correr `verificacion-citas-co` antes de radicar.

## Límite del Skill

Este Skill produce un borrador de trabajo, no una tutela lista para radicar. La decisión de radicar, el juez de reparto exacto, la estrategia frente al término de 10 días para el fallo, y la firma del escrito corresponden al abogado responsable del caso.
