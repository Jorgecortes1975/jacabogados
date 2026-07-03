---
name: proceso-multipaso-con-plan-b
description: Codifica un proceso operativo del despacho de varios pasos en orden fijo (ej. alta de cliente nuevo, cierre de expediente) con un plan B explícito para cada cosa que realistamente puede fallar en cada paso, deteniéndose a preguntar ante cualquier evento no contemplado en vez de improvisar. Úsala cuando el usuario pida encadenar un proceso de varios pasos con orden estricto, dejar por escrito qué hacer si un paso del proceso falla, o construir un procedimiento operativo repetible del despacho con su plan de contingencia.
---

# Proceso de varios pasos con plan B

Le enseñas a esta skill un proceso operativo del despacho —una secuencia de
pasos que siempre va en el mismo orden— junto con qué hacer si alguno de esos
pasos falla de una forma que ya sabes que puede fallar. La diferencia con
pedirle el proceso suelto cada vez: aquí el orden queda fijo (nunca se salta
un paso sin cerrar el anterior) y las contingencias ya conocidas quedan
resueltas de antemano, sin que el proceso se detenga a esperar instrucciones
para algo que ya se sabía que podía pasar. Lo que NO estaba contemplado sí
detiene el proceso — nunca lo improvisa.

## Regla de veracidad obligatoria (no negociable)

1. **Orden fijo, sin excepciones**: el proceso nunca avanza al paso N+1 sin
   confirmar que el paso N se completó. Si no hay confirmación de que el
   paso N terminó, la skill se detiene ahí y lo dice explícitamente — nunca
   asume que "probablemente ya se hizo".
2. **Plan B solo para lo que el usuario efectivamente listó**: esta skill
   nunca inventa una contingencia ni una solución alterna que el usuario no
   haya aprobado. Si ocurre algo que no está en la tabla de contingencias
   del proceso, el proceso se detiene y pregunta qué hacer — no improvisa
   una salida "razonable" por su cuenta.
3. **Ningún paso que requiera criterio profesional se automatiza**: si un
   paso del proceso implica decidir sobre un conflicto de interés, aceptar
   un cliente, fijar honorarios, o cualquier otra decisión que la Ley 1123
   de 2007 reserva al criterio del abogado, esta skill ejecuta la parte
   mecánica del paso (generar el formulario, cruzar los nombres, armar el
   borrador) pero **nunca decide** — remite esa decisión al socio
   responsable exactamente igual que lo hacen `control-conflictos-intake-co`
   y `facturacion-horas-co`, que siguen esta misma regla.
4. **Datos de clientes**: si el proceso maneja datos de contacto o
   personales, recuerda que aplica la Ley 1581 de 2012 (habeas data) —
   ningún paso puede tratar esos datos fuera de la finalidad ya autorizada
   por el cliente.

## Cuándo usar esta skill

Cuando el usuario quiera dejar codificado un proceso operativo del despacho
que tiene varios pasos en orden fijo y quiera además dejar por escrito qué
hacer ante las 2-3 formas más comunes en que ese proceso se atasca en la
práctica, para que el proceso no se detenga a esperar instrucciones cada vez
que pasa algo ya conocido.

## Proceso operativo

**Paso 1 — Recibir el proceso y sus pasos en orden fijo.**
Pide al usuario: el nombre del proceso, y cada paso en el orden exacto en que
ocurre, incluyendo qué sistema, plataforma o persona interviene en cada uno
(ej. "Paso 2: generar el link de cobro en [la pasarela de pago del
despacho]"). No completes un paso que el usuario no haya descrito — pregunta
en vez de asumir cuál es el sistema o la herramienta.

**Paso 2 — Para cada paso, preguntar qué puede fallar de verdad.**
Pide al usuario 1-2 formas realistas en que ese paso concreto suele atascarse
en la práctica (no hipotéticas genéricas) y cuál es la alternativa exacta
para cada una. Si el usuario no tiene una lista clara, propónsela tú
basándote en el tipo de paso, pero dile explícitamente que son sugerencias
por confirmar, nunca las des por aprobadas sin que el usuario las valide.

**Paso 3 — Codificar el proceso con su tabla de contingencias.**
Entrega el proceso como una secuencia numerada de pasos, y debajo de cada
paso su propia tabla "Si pasa esto → haz esto", solo con las contingencias
que el usuario aprobó en el Paso 2.

**Paso 4 — Regla de detención explícita.**
Cierra el proceso codificado con una regla fija: "Si ocurre algo que no está
en ninguna tabla de contingencias de arriba, deténte en ese paso y pregúntale
al usuario qué hacer — nunca sigas al siguiente paso ni inventes una
solución no aprobada."

## Mini-ejemplo (alta de cliente nuevo en JA Abogados)

**Proceso**: alta de un cliente nuevo, desde que acepta la propuesta hasta
que queda activo en el CRM.

```
PASO 1 — Chequeo de conflictos y apertura de expediente
Ejecuta: `control-conflictos-intake-co` (cruce de partes + formulario de
apertura). Esta skill NUNCA decide si hay conflicto — solo señala.

Si pasa esto → haz esto:
- Si el cruce arroja "conflicto potencial" o "conflicto real" → DETENTE.
  No continúes al Paso 2 bajo ninguna circunstancia. Avisa al socio
  responsable y espera su decisión explícita antes de seguir.
- Si el cruce no arroja coincidencias → continúa al Paso 2, dejando la
  constancia estándar de "ausencia de coincidencia no es ausencia de
  conflicto" (ver `control-conflictos-intake-co`).

PASO 2 — Aviso de datos, autorización y cuenta de cobro del anticipo
Ejecuta: `disclosure-cliente` (aviso + autorización) y arma el borrador de
cuenta de cobro del anticipo pactado (revisado por el socio, nunca
facturado automáticamente — ver regla de `facturacion-horas-co`).

Si pasa esto → haz esto:
- Si el cliente no ha firmado la autorización de datos en 5 días hábiles →
  envía un recordatorio, NO continúes al Paso 3 sin la autorización firmada.
- Si el anticipo no se confirma pagado en 10 días hábiles → envía un
  recordatorio de pago (usando `respuesta-dificil` si el tono debe ser firme)
  en vez de pasar al correo de bienvenida del Paso 3.

PASO 3 — Correo de bienvenida y estado "Cliente" en el CRM
Cuando el anticipo se confirme pagado Y la autorización esté firmada:
envía el correo de bienvenida (plantilla del despacho) y actualiza el estado
del registro en el CRM de "Propuesta enviada" a "Cliente" (ver el schema de
`traductor-a-sql` y `auditor-de-funnel` para los estados del CRM).

Si pasa esto → haz esto:
- Si el correo de bienvenida rebota o el email es incorrecto → verifica el
  dato de contacto en el CRM antes de reintentar, no lo reintentes a ciegas.

REGLA DE DETENCIÓN: cualquier evento en cualquier paso que no esté en las
tablas de arriba detiene el proceso ahí mismo. Pregúntale al socio
responsable qué hacer — nunca inventes una salida no aprobada.
```

## Cierre — límite de esta skill

Esta skill nunca decide sobre un conflicto de interés, un pago o una
aceptación de cliente — solo ejecuta la parte mecánica de cada paso y aplica
las contingencias ya aprobadas por el usuario. Cualquier evento fuera de la
tabla de contingencias detiene el proceso para consulta humana, y cualquier
paso que la Ley 1123 de 2007 reserve al criterio del abogado sigue
requiriendo su decisión explícita antes de continuar.
