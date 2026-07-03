---
name: ordenador-de-brain-dump
description: Ordena un brain dump crudo (notas de voz transcritas, lista mental descargada de un tirón, apuntes de una audiencia o reunión) en TAREA, IDEA, PREGUNTA, SENTIMIENTO y RUIDO, con máxima prioridad y separación explícita para cualquier fragmento que suene a plazo procesal o judicial. Úsala cuando el usuario pida ordenar un brain dump, descargar todo lo que tiene en la cabeza antes de que se le olvide, o convertir notas sueltas de una audiencia o reunión en tareas concretas.
---

# Ordenador de brain dump — de descarga mental a acción

Entre audiencias, reuniones de cliente y desarrollo de negocio, a Jorge
Cortés se le acumulan ideas, pendientes y preguntas sueltas que anota
donde puede (nota de voz, servilleta, chat consigo mismo) y nunca vuelve a
mirar. Esta skill toma ese dump crudo y lo convierte en algo accionable,
sin perder ni inventar nada en el camino.

## Regla de veracidad obligatoria (anti-alucinación)

1. **Nunca inventes una tarea, fecha límite o intención que no esté en el
   dump crudo.** Si un fragmento es ambiguo sobre si es tarea o idea, o no
   trae fecha, no le asignes tú un deadline plausible — clasifícalo con
   la fecha en blanco o pregunta al usuario, nunca completes el vacío con
   una suposición.
2. **Máxima prioridad para cualquier fragmento que suene a plazo procesal
   o judicial** (palabras como "término", "traslado", "audiencia",
   "radicado", "notificación", "vence el..."). Ese fragmento **nunca** se
   clasifica como TAREA genérica: se separa en su propia categoría, se
   marca **NO REPROGRAMABLE**, se reporta primero, antes que el resto del
   ordenamiento, y se remite a `monitoreo-litigios-co` para confirmar el
   vencimiento exacto. Perder un término judicial es un riesgo
   disciplinario y de responsabilidad civil, no un pendiente más de la
   lista.
3. Si el dump menciona un cliente o un caso, trata esa información como
   confidencial (Art. 28, Ley 1123 de 2007) — la salida es un documento
   de trabajo interno, no una pieza para compartir sin revisar.

## Cuándo usar esta skill

Justo después de una audiencia, una reunión larga, o cualquier momento en
que Jorge "descargue" mentalmente todo lo que trae encima antes de que se
le olvide, y necesite convertirlo en algo accionable en vez de una lista
plana.

## Proceso operativo

**Paso 0 — Filtro de plazos NO REPROGRAMABLES (antes que todo lo demás).**
Antes de clasificar el resto, revisa cada fragmento del dump contra las
palabras de alerta procesal de la regla 2. Cualquier fragmento que
aplique se reporta primero, en su propio bloque, marcado **NO
REPROGRAMABLE**, con la recomendación de confirmar el vencimiento exacto
en `monitoreo-litigios-co` antes de seguir.

**Paso 1 — Clusteriza el resto del dump en 4 categorías.**
- **TAREA**: algo accionable con dueño (siempre Jorge, salvo que se
  delegue explícitamente) — se redacta en imperativo más fecha límite si
  el usuario la dio, o "sin fecha — asignar" si no la dio.
- **IDEA**: algo que no requiere acción inmediata pero vale la pena
  guardar — se etiqueta con el proyecto o pilar al que pertenece y va a
  una lista de ideas, no a la lista de tareas.
- **PREGUNTA**: algo que Jorge necesita que alguien más le responda — se
  identifica quién puede responderla y se redacta el mensaje concreto
  para enviarle, listo para copiar.
- **SENTIMIENTO**: una reacción emocional o de frustración sin acción
  clara detrás — se convierte en una nota de diario personal, no en una
  tarea disfrazada.
- **RUIDO**: no aporta nada accionable ni de valor de registro — se
  descarta explícitamente (se dice que se borra, no se deja flotando sin
  categoría).

**Paso 2 — Salida organizada por categoría**, con el bloque NO
REPROGRAMABLE del Paso 0 siempre primero, seguido de TAREA, IDEA,
PREGUNTA, SENTIMIENTO y, al final, la lista de RUIDO descartado (para que
el usuario pueda revisar qué se botó, por si algo se clasificó mal).

## Reglas de formato

- Un fragmento por línea, nunca fusiones dos ideas distintas en una sola
  tarea aunque vengan juntas en el dump original.
- Toda TAREA se redacta en imperativo ("enviar", "revisar", "confirmar"),
  nunca en gerundio o sustantivo suelto ("enviando", "revisión").
- Toda PREGUNTA trae el mensaje ya redactado, listo para enviar tal cual
  o después de un ajuste mínimo.

## Mini-ejemplo

**Dump crudo de Jorge (nota de voz transcrita después de una audiencia):**

"Ok entre lo que tengo en la cabeza: me acaban de notificar en la
audiencia que el juez decretó un traslado de tres días para pronunciarme
sobre las excepciones del caso Torres, eso hay que revisarlo ya. También
tengo que mandarle a Netux el segundo mensaje de seguimiento de LinkedIn
que llevo debiendo como una semana. Se me ocurrió que podría hacer un
carrusel sobre el Decreto 0581 de tercerización laboral, encaja con el
pilar laboral. No sé si el contador ya radicó la renovación de la matrícula
mercantil de este año, tengo que preguntarle. Salí de la audiencia
frustrado porque el juez volvió a aplazar la fijación de fecha para la
inspección judicial, ya van dos veces. Ah y me llegó un correo de una
plataforma de curso online que no me interesa para nada."

**Procesamiento:**

**NO REPROGRAMABLE — plazo procesal detectado**
- Traslado de tres días decretado en audiencia para pronunciarse sobre
  las excepciones del caso Torres. Confirmar el vencimiento exacto con
  `monitoreo-litigios-co` antes de cualquier otra prioridad de la semana.

**TAREA**
- Enviar a Netux el segundo mensaje de seguimiento de LinkedIn de la
  secuencia de nurturing a 30 días — hoy o mañana (ya lleva ~1 semana de
  atraso frente al plan de 30 días del plan de marketing, sección 8).
- Preguntar al contador si ya radicó la renovación de la matrícula
  mercantil de este año — sin fecha límite dada, asignar esta semana.

**IDEA**
- Carrusel sobre el Decreto 0581 de tercerización laboral — pilar
  Laboral y Litigios, para el banco de contenido (evaluar con
  `esqueleto-de-articulo` o `arquitecto-de-hilos` según formato final).

**PREGUNTA**
- A quién: el contador del despacho.
- Mensaje redactado: "Hola, ¿ya quedó radicada la renovación de la
  matrícula mercantil de este año? Quiero confirmar que estamos al día
  antes de fin de mes."

**SENTIMIENTO**
- Frustración por el segundo aplazamiento de la fijación de fecha para la
  inspección judicial — nota de diario personal, no genera una tarea
  nueva (la actuación procesal en sí ya la cubre el monitoreo de
  litigios).

**RUIDO (descartado)**
- Correo de la plataforma de curso online sin interés — se borra.

## Cierre — límite de esta skill

Esta skill ordena, nunca decide estrategia ni calcula el vencimiento
exacto de un término — eso es siempre trabajo de `monitoreo-litigios-co`
y del criterio del abogado responsable. Su única función es asegurar que,
en medio de un brain dump con tareas, ideas y plazos mezclados, un plazo
NO REPROGRAMABLE nunca quede enterrado entre pendientes de negocio
comunes.
