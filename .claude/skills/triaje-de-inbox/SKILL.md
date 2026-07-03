---
name: triaje-de-inbox
description: Triajea el inbox del despacho en cubetas de acción claras (responde ahora, hoy, esta semana, archiva, escala) a partir de un batch de correos con asunto, remitente y primeros 200 caracteres, con escalamiento inmediato para conflictos de interés, términos judiciales inminentes o quejas de cliente. Úsala cuando el usuario pida ordenar o triajear su bandeja de entrada, decidir qué correos responder primero, o revisar un lote de correos acumulados.
---

# Triaje de inbox del despacho

Un abogado litigante o corporativo en JA Abogados recibe, en el mismo día,
correos de clientes, de contrapartes, de despachos judiciales, de
prospectos que llegaron por LinkedIn o WhatsApp (ver CRM de prospectos,
Plan de Marketing Digital sección 7), y de proveedores. No todos pesan
igual: uno puede ser una cadena promocional y otro puede ser la
notificación de un traslado con término de tres días. Esta skill ordena
ese inbox en cubetas accionables sin necesidad de abrir cada correo
completo primero.

## Regla de veracidad obligatoria (no negociable)

1. **No inventes contenido que no está en el batch.** Solo tienes asunto,
   remitente y los primeros 200 caracteres. Si ese fragmento no alcanza
   para clasificar con confianza (por ejemplo, el asunto es genérico tipo
   "Seguimiento" y el cuerpo no aclara de qué), no adivines la categoría:
   márcalo como **"AMBIGUO — abrir correo completo antes de decidir"** en
   vez de asignarle una cubeta al azar.
2. **Confidencialidad (Art. 28, Ley 1123 de 2007).** El batch que te
   entrega el usuario puede contener nombres de clientes, cifras de
   negociación, o datos de terceros. La tabla de salida es un documento de
   trabajo interno del despacho: no la redactes pensando en que saldrá a
   un tercero, y no la uses como ejemplo público sin anonimizar antes.
3. **No caracterices el tono de un correo como una amenaza legal o una
   admisión de responsabilidad sin que el texto lo diga expresamente.**
   Clasificar mal un correo hostil como rutinario (o al revés, uno neutral
   como hostil) genera decisiones erradas aguas abajo; si tienes duda,
   señala la ambigüedad en vez de resolverla por tu cuenta.

## Cuándo usar esta skill

Al empezar el día con la bandeja acumulada, después de una audiencia o un
viaje, o cuando el volumen de correos de un solo abogado supera lo que
puede procesar uno por uno sin un criterio de orden. También sirve para
que un asistente o el propio abogado haga un primer corte antes de que el
socio revise personalmente los correos de mayor riesgo.

## Proceso operativo

**Paso 1 — Pide el batch.**
Solicita la lista completa: para cada correo, asunto, remitente y los
primeros 200 caracteres del cuerpo. Si el usuario entrega menos que eso
(solo asuntos, por ejemplo), avísale que la clasificación será menos
confiable y que cualquier cubeta asignada así debe tratarse como
provisional.

**Paso 2 — Filtro de escalamiento inmediato (antes que todo lo demás).**
Antes de correr el triaje ordinario, revisa cada correo contra estos tres
disparadores. Si alguno aplica, ese correo no espera el resto del
proceso — se marca ESCALA y se reporta primero, aparte de la tabla:

- **Conflicto de interés potencial**: el correo menciona una contraparte,
  empresa o persona que ya es cliente del despacho, o una operación donde
  el despacho ya representa al otro lado.
- **Término procesal inminente**: el correo es o referencia una
  notificación judicial, un auto, un traslado, o cualquier plazo con
  fecha de vencimiento cercana (ver también `monitoreo-litigios-co` para
  el cálculo exacto del término).
- **Queja de cliente**: el correo expresa insatisfacción, reclama por un
  error, o cuestiona la facturación o el manejo de su caso.

Ninguno de estos tres espera al triaje semanal ni queda archivado por
default. Repórtalos de inmediato al usuario, incluso si el resto del
inbox todavía no se ha procesado.

**Paso 3 — Clasifica el resto en las cuatro cubetas ordinarias.**
- **RESPONDE AHORA**: bloquea al cliente, a un tercero, o a un trámite si
  no se responde en horas (ej. una pregunta que impide que el cliente
  firme algo hoy).
- **RESPONDE HOY**: importante pero no bloquea nada en horas; puede
  esperar al final del día.
- **RESPONDE ESTA SEMANA**: relevante pero sin urgencia; encaja en el
  flujo normal de la semana.
- **ARCHIVA**: informativo, ya resuelto, o no requiere acción (boletines,
  confirmaciones automáticas, copias en "cc" sin pregunta directa).

**Paso 4 — Entrega la tabla.**
Una línea por correo, cinco columnas: **Remitente / Asunto**, **Categoría**,
**Señal detectada** (qué en el fragmento justifica la categoría),
**Acción sugerida**, **Plazo**. Los correos ESCALA van primero, en su
propio bloque, antes de la tabla ordinaria.

## Reglas de formato

- Una fila por correo, sin agrupar varios correos en una sola fila aunque
  sean del mismo remitente.
- La columna "Señal detectada" cita o parafrasea el fragmento concreto que
  motivó la categoría — nunca la dejes en blanco ni la llenes con una
  justificación genérica ("parece importante").
- Los correos marcados AMBIGUO van en la tabla igual, con la categoría
  provisional y la nota de qué falta para confirmarla.

## Mini-ejemplo

**Batch recibido (6 correos):**

1. De: gerencia@textilesnorte-co.com — Asunto: "Urgente — necesitamos
   firmar hoy" — "Buenas tardes, el banco nos pide la certificación de
   existencia y representación actualizada antes de las 4pm de hoy para
   desembolsar el crédito..."
2. De: notificacionjudicial@juzgado.gov.co — Asunto: "Notificación
   electrónica proceso 2024-00456" — "Se notifica a Ud. auto que resuelve
   traslado de excepciones, término de tres (3) días hábiles..."
3. De: contabilidad@proveedorlogistico.com — Asunto: "Seguimiento factura
   pendiente" — "Buenos días, quisiera confirmar el estado de pago de la
   factura #4521 emitida el mes pasado..."
4. De: representante.legal@confeccionesdelvalle.com — Asunto: "No estoy
   conforme con el manejo de mi caso" — "Llevamos dos semanas sin
   respuesta sobre el estado de la demanda laboral y no entiendo por qué
   no me han informado..."
5. De: news@revistalegal.com — Asunto: "Newsletter semanal de novedades
   normativas" — "Esta semana en el mundo jurídico..."
6. De: gerardo.pineda@abogadopineda.co — Asunto: "Propuesta de acuerdo
   caso Confecciones del Valle" — "Estimado colega, en representación de
   la contraparte le propongo explorar una fórmula de arreglo..."

**Escalamiento inmediato:**

| Remitente / Asunto | Disparador | Por qué |
|---|---|---|
| Confecciones del Valle — "No estoy conforme..." | Queja de cliente | Insatisfacción expresa por falta de comunicación en un proceso activo |
| Juzgado — "Notificación proceso 2024-00456" | Término procesal inminente | Traslado de excepciones con término de 3 días hábiles corriendo desde la notificación |
| Abogado Pineda — "Propuesta de acuerdo caso Confecciones del Valle" | Conflicto de interés potencial (mismo caso) + relacionado con la queja anterior | Debe leerse junto con el correo 4 antes de responder cualquiera de los dos; el mismo cliente está inconforme y la contraparte propone un arreglo el mismo día |

**Tabla ordinaria:**

| Remitente / Asunto | Categoría | Señal detectada | Acción sugerida | Plazo |
|---|---|---|---|---|
| Textiles del Norte — "Urgente, firmar hoy" | RESPONDE AHORA | Plazo del banco a las 4pm de hoy | Expedir certificación solicitada | Hoy antes de las 4pm |
| Proveedor logístico — "Seguimiento factura" | RESPONDE ESTA SEMANA | Consulta administrativa sin urgencia | Confirmar estado de pago con contabilidad | Esta semana |
| Revista Legal — Newsletter | ARCHIVA | Contenido informativo genérico | Ninguna | — |

## Cierre — límite de esta skill

Esta skill clasifica y prioriza, nunca redacta la respuesta de fondo ni
decide por su cuenta si hay o no un conflicto de interés real (para eso
existe `control-conflictos-intake-co`), ni resuelve una queja de cliente
por sí sola. Cuando un correo escala, la responsabilidad de decidir cómo y
cuándo responder es siempre del abogado a cargo del asunto — esta skill
solo garantiza que ese correo no se pierda esperando el triaje semanal.
