---
name: disenador-de-habitos
description: Diseña hábitos operativos del despacho que sobreviven a las semanas malas de un abogado que litiga, asesora y hace desarrollo de negocio al mismo tiempo — publicar contenido cada semana, revisar el CRM de prospectos cada lunes, registrar horas el mismo día — con trigger, acción mínima, apilamiento, reducción de fricción, regla de recuperación y check-in de 8 semanas. Úsala cuando el usuario pida diseñar o arreglar un hábito que no logra sostener, o construir una rutina nueva para el despacho que no dependa de fuerza de voluntad.
---

# Diseñador de hábitos — que sobrevivan a la semana mala

Un despacho unipersonal no tiene sistemas que sostengan un hábito cuando
Jorge Cortés tiene una semana de litigio pesado — no hay un asistente de
operaciones que publique el post si él no lo hace, ni un contador que
registre las horas si él no las anota. Esta skill diseña hábitos que
sobreviven precisamente esas semanas malas, en vez de hábitos que solo
funcionan cuando todo va bien.

## Regla de veracidad obligatoria (anti-alucinación)

1. **Nunca inventes el hábito, la frecuencia actual o la frecuencia
   objetivo que el usuario no haya dado.** Pregúntale explícitamente por
   los tres antes de diseñar nada — un hábito diseñado sobre una
   frecuencia inventada no sirve, porque el punto de partida real es la
   base de todo el diseño.
2. **No confundas un hábito de negocio con un plazo procesal.** Si lo que
   el usuario describe como "hábito que quiere instalar" es en realidad
   una obligación ligada a un término judicial (ej. "quiero acostumbrarme
   a revisar Rama Judicial cada mañana antes de que se me pase un
   término"), trátalo con una capa adicional: el chequeo mismo puede
   diseñarse como hábito, pero el vencimiento del término detrás nunca es
   negociable ni se "recupera" con la regla de recuperación de esta
   skill — remite a `monitoreo-litigios-co` para el cálculo real del
   término, y deja explícito que ese chequeo es un hábito de higiene
   operativa, no la única salvaguarda del plazo.

## Cuándo usar esta skill

Cuando un hábito de negocio, contenido o gestión del despacho (publicar,
registrar horas, revisar el CRM, prospectar) se cae cada vez que hay una
semana pesada de litigio o clientes, y Jorge quiere una versión que
resista eso en vez de reiniciar desde cero cada mes.

## Proceso operativo

**Paso 1 — Pide el hábito, frecuencia actual y frecuencia objetivo.**
Sin los tres datos, no diseñes nada — pregúntalos.

**Paso 2 — Trigger: un evento existente específico.**
Nunca "en algún momento del día" — ancla el hábito a algo que ya ocurre
sin falta (ej. "después de servir el primer café", "al cerrar la laptop
el domingo en la noche", "justo después de la revisión semanal").

**Paso 3 — Acción mínima de los primeros 14 días (menos de 2 minutos).**
La versión más pequeña posible del hábito, diseñada para que sea
imposible fallar por falta de tiempo, no para que produzca el resultado
final todavía. El objetivo de estos 14 días es que ocurra, no que
rinda.

**Paso 4 — Apilamiento (habit stacking).**
Ata el hábito nuevo a uno que ya existe y es sólido, en vez de crear un
recordatorio independiente que compite por atención con todo lo demás.

**Paso 5 — Reducción de fricción: 1 cosa lista la noche anterior.**
Identifica el único obstáculo de fricción que, resuelto la noche
anterior, hace que el hábito sea casi automático al día siguiente (ej.
dejar abierto el documento, dejar la hoja de horas visible en el
escritorio).

**Paso 6 — Regla de recuperación: nunca falles dos veces seguidas.**
Define explícitamente qué pasa si un día se falla — la regla no es
"nunca fallar", es que un fallo nunca se convierte en dos fallos
seguidos. Un fallo aislado no rompe la racha si al día siguiente se
retoma la acción mínima del Paso 3.

**Paso 7 — Check-in semanal por 8 semanas.**
Una revisión corta cada semana (puede integrarse a `revision-semanal`)
que solo pregunta: ¿se cumplió?, ¿cuántas veces se falló dos días
seguidos?, ¿hace falta bajar aún más la acción mínima?

## Reglas de formato

- El trigger siempre se redacta como un evento concreto y observable, no
  como una intención ("cuando tenga tiempo" no es un trigger válido).
- La acción mínima se describe en una frase ejecutable en menos de 2
  minutos, verificable como hecha o no hecha.

## Mini-ejemplo

**Hábito:** registrar las horas trabajadas el mismo día, en vez de
reconstruirlas al final de la semana (lo que además genera descripciones
vagas que `facturacion-horas-co` termina señalando como no defendibles).
**Frecuencia actual:** 1 vez por semana, el viernes en la noche, de
memoria.
**Frecuencia objetivo:** diaria, al cierre del día.

**1. Trigger**
Justo después de cerrar la última reunión o bloque de trabajo del día,
al apagar la pantalla del escritorio.

**2. Acción mínima (primeros 14 días)**
Escribir una sola línea por asunto trabajado ese día en la hoja de
horas, sin preocuparse todavía por el detalle completo que exige
`facturacion-horas-co` — solo que quede registrado el mismo día.

**3. Apilamiento**
Se ata a un hábito ya sólido: cerrar WhatsApp Business al final del día
(esto ya lo hace siempre). El registro de horas va inmediatamente
después de ese cierre, no antes.

**4. Reducción de fricción**
La noche anterior (o al iniciar el día), deja la hoja de horas abierta
en una pestaña fija del navegador, para que no haya que buscarla ni
abrirla desde cero al final del día.

**5. Regla de recuperación**
Si un día se le olvida registrar, se reconstruye al día siguiente en la
mañana usando el calendario del día anterior — nunca se deja acumular
un segundo día sin registro. Dos días seguidos sin registrar rompe la
racha y reinicia el conteo de las 8 semanas.

**6. Check-in semanal (8 semanas)**
Cada domingo, como parte de `revision-semanal`: ¿cuántos días de la
semana se registró el mismo día? ¿hubo dos días seguidos sin registrar?
Si a la semana 4 todavía falla más de 2 veces por semana, se baja la
acción mínima a "solo anotar el nombre del cliente y las horas
redondeadas", sin descripción, hasta estabilizar la frecuencia.

## Cierre — límite de esta skill

Esta skill diseña hábitos de negocio y de gestión del despacho — nunca
sustituye el cálculo real de un término procesal ni relaja su
exigibilidad. Ningún "fallo permitido" de esta skill aplica jamás a un
plazo NO REPROGRAMABLE: la regla de recuperación es para hábitos, no para
términos judiciales, que siguen las reglas de `monitoreo-litigios-co`.
