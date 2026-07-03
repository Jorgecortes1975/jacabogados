---
name: generador-de-preguntas
description: Genera las 20 preguntas que se olvidan hacer antes de una reunión clave (intake con cliente nuevo, llamada de due diligence, negociación con contraparte), organizadas en 4 cubetas de 5 (Diagnóstico, Stakes, Historia, Cierre), cada una bajo 15 palabras, sin preguntas de sí/no ni preguntas sesgadas. Úsala cuando el usuario pida preparar preguntas para una reunión con un cliente nuevo, una llamada de due diligence, o una negociación, o cuando necesite estructurar un intake antes de aceptar un asunto.
---

# Generador de preguntas para juntas clave

Antes de una reunión con peso real — el primer intake con un cliente nuevo, una llamada de due diligence con la contraparte, una negociación de términos — casi siempre se preguntan las mismas cinco cosas obvias y se olvidan las que de verdad revelan el riesgo o la oportunidad. Esta skill fuerza esas preguntas antes de entrar a la sala.

## Regla de veracidad obligatoria (no negociable)

1. **Las preguntas se generan a partir de lo que el usuario indique sobre el tipo de junta, la contraparte y su objetivo** — no inventes hechos sobre la contraparte ni asumas antecedentes que el usuario no dio. Si falta contexto para que una pregunta tenga sentido, pídelo antes de generarla.
2. **Ninguna pregunta puede presuponer un hecho no confirmado** ("¿por qué su empresa incumplió el contrato anterior?" presupone el incumplimiento) — eso es una pregunta sesgada (leading), y está prohibida por el proceso, no solo desaconsejada.
3. Si el usuario menciona cifras o antecedentes específicos de la contraparte que se van a usar como base de una pregunta, y esos antecedentes provienen de una fuente que debería verificarse (un dato de mercado, una cita normativa), remite a la skill correspondiente (`cazador-de-fuentes`, `verificacion-citas-co`) antes de dar esos datos por ciertos en la pregunta.

## Cuándo usar esta skill

Antes de una reunión de intake con un cliente nuevo, una llamada de due diligence (M&A, laboral, tributaria), o una negociación con contraparte donde vale la pena llegar con preguntas preparadas y no improvisadas.

**Si la junta es específicamente el primer intake con un cliente potencial nuevo**, después de generar las preguntas recuerda al usuario correr `control-conflictos-intake-co` para el chequeo de conflictos de interés y el formulario de apertura de expediente — esta skill prepara las preguntas de la reunión, no reemplaza ese control.

## Proceso operativo

**Paso 1 — Pide tipo de junta, nombre de la contraparte y objetivo.**
Tipo de junta: intake de cliente nuevo, llamada de due diligence, negociación, comité de riesgo. Contraparte: nombre de la empresa o persona (o "cliente potencial" si aún no tiene nombre confirmado). Objetivo: qué necesita salir claro de esa reunión, en una frase.

**Paso 2 — Genera 20 preguntas en 4 cubetas de 5.**
- **Diagnóstico (5)**: preguntas que revelan el problema real detrás de lo que la contraparte dice que necesita.
- **Stakes (5)**: preguntas que revelan qué pasa si esto no se resuelve — costo, plazo, urgencia real.
- **Historia (5)**: preguntas sobre qué se ha intentado antes, con quién, y por qué no funcionó.
- **Cierre (5)**: preguntas que mueven la conversación hacia una decisión o un siguiente paso concreto.

**Paso 3 — Aplica el filtro de formato a cada pregunta.**
- Bajo 15 palabras.
- Sin preguntas de sí/no (si una pregunta se puede responder con una sola palabra, reformúlala para que exija una respuesta desarrollada).
- Sin preguntas sesgadas (leading) — no presuponer un hecho, una culpa o una conclusión.

**Paso 4 — Si aplica, remite a la skill de conflictos.**
Si el tipo de junta es intake de cliente nuevo, cierra con el recordatorio de correr `control-conflictos-intake-co`.

## Mini-ejemplo (intake — pyme exportadora que busca asesoría antes de su primer contrato con un cliente en EE.UU.)

**Tipo de junta**: intake de cliente nuevo.
**Contraparte**: cliente potencial — pyme de manufactura en Medellín que va a firmar su primer contrato de exportación con un comprador en EE.UU.
**Objetivo**: decidir si el despacho acepta el mandato y bajo qué alcance (pilar de contratos y compliance + asesoría a empresas extranjeras, en este caso desde el lado del exportador colombiano).

**Diagnóstico (5)**
1. ¿Qué cláusula del contrato le preocupa más ahora mismo?
2. ¿Quién en su empresa negoció los términos hasta hoy?
3. ¿Qué moneda y jurisdicción propone el comprador para disputas?
4. ¿Qué garantías de pago exige el comprador estadounidense?
5. ¿Ya tienen un incoterm acordado para esta operación?

**Stakes (5)**
6. ¿Qué pasa con su flujo de caja si el pago se atrasa 60 días?
7. ¿Cuánto representa este contrato del ingreso anual de la empresa?
8. ¿Qué penalidad les cobrarían por incumplir el plazo de entrega?
9. ¿Perderían la relación comercial si piden ajustar una cláusula ahora?
10. ¿Qué tan urgente es firmar frente a otras opciones del comprador?

**Historia (5)**
11. ¿Han exportado antes bajo un contrato similar a este?
12. ¿Qué abogado o asesor revisó el borrador hasta ahora?
13. ¿Qué cláusula ya rechazaron o cuestionaron en versiones anteriores?
14. ¿Cómo llegaron a este comprador en particular?
15. ¿Han tenido disputas comerciales con compradores extranjeros antes?

**Cierre (5)**
16. ¿Para cuándo necesitan el contrato revisado y firmado?
17. ¿Quién decide internamente si aceptan los cambios que propongamos?
18. ¿Prefieren que revisemos solo el contrato o todo el proceso de exportación?
19. ¿Qué presupuesto tienen definido para esta asesoría puntual?
20. ¿Podemos ver el borrador actual antes de la próxima reunión?

**Recordatorio de cierre para este caso**: al tratarse de un intake de cliente nuevo, correr `control-conflictos-intake-co` para el chequeo de conflictos y el formulario de apertura de expediente antes de aceptar el mandato.

## Cierre — límite de esta skill

Esta skill prepara las preguntas de la reunión; no conduce la reunión, no evalúa las respuestas que dé la contraparte, y no decide si el despacho acepta el asunto (para el chequeo de conflictos y el formulario de apertura de expediente en un intake nuevo, usar `control-conflictos-intake-co`). El criterio para adaptar o descartar preguntas en vivo, según cómo se desarrolle la conversación, es siempre del abogado que está en la sala.
