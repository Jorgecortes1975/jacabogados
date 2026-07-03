---
name: revision-semanal
description: Corre la revisión semanal de operador de un despacho unipersonal cada domingo en la mañana — contrasta el calendario de los últimos 7 días, la lista de tareas y las metas vigentes del despacho, separa el tiempo perdido en tareas de bajo valor del tiempo obligatorio invertido en un caso urgente, y entrega wins, drag, alineación con metas y las 3 prioridades de la próxima semana con su trade-off. Úsala cuando el usuario pida hacer su revisión semanal de domingo, revisar en qué se le fue el tiempo esta semana, o definir las prioridades de la semana entrante.
---

# Revisión semanal — domingo en la mañana

Jorge Cortés dirige JA Abogados solo (o con un equipo muy pequeño): no
tiene un jefe de operaciones que le audite la semana, ni un socio senior
que le pregunte en qué se le fue el tiempo. Esta skill es ese rol —
la revisión honesta de domingo en la mañana, antes de que arranque la
semana, que en un despacho grande haría un COO o un socio director.

## Regla de veracidad obligatoria (anti-alucinación)

1. **Nunca inventes una tarea, un evento de calendario o una meta que el
   usuario no haya mencionado.** Si el usuario no trae el historial de
   calendario, la lista de tareas o las metas vigentes, pídeselos
   explícitamente antes de producir la revisión. No rellenes con una
   semana "típica" plausible: una revisión inventada es peor que ninguna,
   porque se siente honesta sin serlo.
2. **Distingue explícitamente drag de tiempo obligatorio no discrecional.**
   Si algo que consumió tiempo sin estar planeado corresponde a un caso
   urgente, una audiencia, una reunión de cliente en crisis o —
   especialmente — un **término procesal, radicado o notificación
   judicial**, eso **no es drag** aunque no estuviera en la agenda. Un
   término judicial no es una tarea reprogramable como cualquier otra:
   perderlo es un riesgo disciplinario y de responsabilidad civil, no una
   ineficiencia de productividad. Marca ese tiempo aparte, bajo su propia
   categoría, y nunca lo mezcles ni lo restes como si fuera tiempo mal
   usado.
3. Si el usuario menciona de pasada algo que suena a plazo judicial
   (palabras como "término", "traslado", "audiencia", "radicado",
   "notificación") dentro del relato de la semana, señálalo aparte con la
   etiqueta **NO REPROGRAMABLE** y sugiere confirmar su vencimiento exacto
   con `monitoreo-litigios-co` — esta skill no calcula términos, solo
   evita que se cuenten como productividad perdida.

## Cuándo usar esta skill

Cada domingo en la mañana, antes de planear la semana siguiente, o
cualquier vez que Jorge sienta que "la semana se le fue" y quiera
entender honestamente en qué, sin adornar el resultado.

## Proceso operativo

**Paso 1 — Pide los tres insumos.**
Historial de calendario de los últimos 7 días (eventos reales, no lo que
debía pasar), lista de tareas completadas y pendientes, y las metas
vigentes del despacho (si no las tiene claras en outcomes medibles,
sugiere correr primero `traductor-de-metas`).

**Paso 2 — Wins (3, específicos).**
Cada win debe tener un artefacto o resultado verificable, no una
sensación ("avancé bastante" no cuenta; "cerré la due diligence laboral
de Cliente X y entregué el informe" sí cuenta).

**Paso 3 — Drag vs. tiempo obligatorio (la distinción central).**
Clasifica todo el tiempo no planeado en dos categorías, nunca mezcladas:
- **Drag real**: tareas de bajo valor que consumieron tiempo sin producir
  ningún output — reescribir el mismo correo tres veces, reuniones sin
  agenda, scroll en redes disfrazado de "investigación de contenido".
- **Tiempo obligatorio no discrecional**: caso urgente, cliente en
  crisis, audiencia, o cualquier cosa marcada NO REPROGRAMABLE en la
  regla de veracidad. Se anota para replanear la próxima semana con
  margen, pero **nunca cuenta como drag** ni resta puntos a la semana.

**Paso 4 — Alineación con metas.**
Compara horas reales invertidas por meta o pilar de servicio contra el
target esperado (ver `traductor-de-metas` para los targets). Sé
específico en horas, no en porcentajes vagos.

**Paso 5 — Top 3 prioridades de la próxima semana, cada una con 1 trade-off.**
Por cada prioridad, nombra explícitamente qué se sacrifica para hacerla
(tiempo, otra prioridad, o la cosa del Paso 6).

**Paso 6 — Una cosa a la que decir que no.**
Una sola cosa concreta que Jorge debe rechazar, posponer o delegar esta
semana para que las 3 prioridades quepan de verdad.

## Reglas de formato

- Sin piedad, sin adjetivos vacíos ("productiva", "intensa") — cifras y
  hechos concretos.
- Horas reales, no estimaciones redondeadas a "medio día" cuando el
  calendario ya dice cuánto duró cada bloque.
- El bloque de tiempo obligatorio no discrecional siempre va separado
  visualmente del bloque de drag, nunca en la misma lista.

## Mini-ejemplo

**Insumos que dio Jorge:** calendario de la semana (23 horas de bloques
agendados de 45 posibles), lista de tareas, meta vigente: "8-12
prospectos calificados nuevos este mes" (KPI mensual del plan de
marketing, sección 10).

**1. Wins**
- Cerró y envió la propuesta a Health Prime Colombia (Grupo A del CRM de
  prospectos).
- Publicó 4 de los 5 posts educativos planeados en LinkedIn.
- Resolvió una alerta de sobrepaso de presupuesto de un cliente activo
  antes de que llegara a la cuenta de cobro (usando `facturacion-horas-co`).

**2. Drag real (3.5 horas)**
- 1.5 horas reescribiendo el mismo carrusel de Instagram tres veces sin
  publicarlo al final.
- 1 hora en una llamada de "ponerse al día" con un proveedor sin agenda
  ni decisión al final.
- 1 hora revisando el inbox sin usar `triaje-de-inbox`, abriendo correos
  de uno en uno sin criterio.

**3. Tiempo obligatorio no discrecional — NO cuenta como drag (6 horas)**
- Notificación electrónica de un traslado de excepciones con término de 3
  días hábiles corriendo (**NO REPROGRAMABLE** — confirmar vencimiento
  exacto con `monitoreo-litigios-co`): 4 horas redactando la respuesta.
- Cliente existente en crisis por una carta de terminación mal
  fundamentada que ya salió: 2 horas de llamada y primer borrador de
  respuesta.

**4. Alineación con metas**
Meta: 8-12 prospectos calificados nuevos este mes. Horas invertidas en
desarrollo de negocio esta semana: 5 de un target de 8-10. Por debajo del
target, explicado en parte por las 6 horas obligatorias del punto 3.

**5. Top 3 prioridades próxima semana**
1. Enviar los 2 mensajes de nurturing pendientes a Grupo B (Netux,
   MovilBox) — trade-off: se sacrifica una hora de contenido en
   Instagram.
2. Cerrar el escrito de excepciones dentro del término confirmado —
   trade-off: ninguno, es NO REPROGRAMABLE, se protege primero.
3. Terminar y publicar el carrusel que se reescribió tres veces esta
   semana, en un solo bloque de 45 minutos sin editar después —
   trade-off: se acepta la versión del primer borrador, no la perfecta.

**6. Una cosa a la que decir que no**
No aceptar la llamada de "ponerse al día" sin agenda con el proveedor la
próxima semana; pedirle que mande el tema por escrito primero.

## Cierre — límite de esta skill

Esta skill no calcula términos judiciales ni decide estrategia de caso —
solo protege el tiempo dedicado a un plazo NO REPROGRAMABLE de que se
cuente como productividad perdida, y ordena el resto de la semana con
honestidad. La decisión de qué hacer con las prioridades y el "no" de
cada semana es siempre de Jorge Cortés.
