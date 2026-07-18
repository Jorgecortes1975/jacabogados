---
name: vencimientos-procesales-col
description: >
  Gestión de términos y vencimientos procesales y regulatorios del despacho con
  cómputo verificado de días hábiles (consulta EN VIVO el calendario oficial de
  festivos de Colombia en Google Calendar, con filtrado de celebraciones no
  festivas), doble control del conteo día a día y agenda automática en Google
  Calendar con alertas escalonadas y registro auditable en el repositorio.
  Activar ante: vencimiento, término procesal, plazo para contestar / apelar /
  subsanar / recurrir, cuándo vence, computa el término, cuántos días hábiles,
  ejecutoria, traslado, agenda el plazo, recuérdame la audiencia, caducidad,
  prescripción, plazo regulatorio (SG-SST, UGPP, pila, renovación mercantil),
  registra en mi calendario, qué vence esta semana, semáforo de plazos.
  SIEMPRE activar cuando una fecha límite legal, procesal o regulatoria deba
  calcularse, agendarse o revisarse, incluso si el usuario solo pide "un
  recordatorio".
---

# GESTOR DE VENCIMIENTOS PROCESALES — Colombia

**Regla fundacional**: un término perdido es un daño irreversible al cliente y
una falta profesional. Por eso este skill computa de forma conservadora, cuenta
dos veces, agenda con alertas escalonadas y deja registro auditable doble
(calendario + repositorio). Un recordatorio sin cómputo verificado es un riesgo
disfrazado de ayuda.

---

## CALENDARIOS DEL DESPACHO (verificados en vivo el 18-jul-2026)

| Calendario | ID | Uso |
|---|---|---|
| Principal (Jorge) | `jorgeacortesc38@gmail.com` | Aquí se crean los eventos de vencimiento. TZ: America/Bogota |
| Festivos en Colombia | `es.co#holiday@group.v.calendar.google.com` | Fuente EN VIVO de días inhábiles — con filtrado obligatorio (abajo) |

**⚠️ REGLA DE FILTRADO DE FESTIVOS (obligatoria, verificada con datos reales)**:
el calendario de Google mezcla festivos legales con celebraciones. Solo cuenta
como día inhábil el evento cuya descripción dice **"Día festivo"**. Los eventos
"Celebración" (Amor y Amistad, Halloween, Velitas, Noche Buena, Día de la Mujer
Colombiana, etc.) **NO son inhábiles**. Las fiestas trasladadas por la Ley 51 de
1983 aparecen DUPLICADAS (ej. Asunción: 15-ago "Celebración" y 17-ago "Día
festivo") — el inhábil es solo la entrada "Día festivo". Detalle y ejemplos en
`references/calendarios-y-convenciones.md`.

---

## FLUJO

### FASE 1 — Captura del término (nunca suponer)

Obtener del usuario o del expediente; lo que falte se pregunta:
- Actuación y término legal aplicable (cuántos días y de qué tipo). El término
  lo confirma el abogado o se verifica en la norma en vivo — la tabla de
  términos comunes de `references/reglas-computo.md` es orientación, NO fuente.
- Fecha y forma de notificación (estado, personal, estrados, correo). **Si la
  fecha es incierta, se computa con el peor escenario** (la más temprana).
- Cliente, radicado, carpeta en `/casos/`, y si el término es **FATAL**
  (caducidad, prescripción, término para recurrir) — cambia las alertas.

### FASE 2 — Cómputo con doble control

1. Leer `references/reglas-computo.md` (reglas de inicio, tipo de días,
   vencimiento en inhábil, ejecutoria).
2. Obtener los inhábiles del rango EN VIVO: `list_events` sobre el calendario
   de festivos (con el filtrado obligatorio) + sábados y domingos.
3. Contar **día por día**, mostrando la tabla completa del conteo: fecha, día
   de la semana, hábil/inhábil (y por qué), número de día del término.
4. **Doble control**: recontar en sentido inverso desde la fecha resultado y
   verificar que ningún día contado como hábil aparezca en la lista de
   inhábiles. Si los dos conteos difieren: corregir antes de seguir.
5. Vacancia judicial y cierres extraordinarios de despachos judiciales: si el
   término cruza diciembre-enero o hay paro/cierre conocido, marcar **s/d** y
   exigir verificación del acuerdo correspondiente antes de confiar en la fecha.

### FASE 3 — Agenda en Google Calendar

Crear en el calendario principal (previa verificación de que no exista ya un
evento igual — buscar con `list_events` fullText por el radicado):

1. **Evento del vencimiento**: día del vencimiento 8:00–9:00 a.m. (America/Bogota),
   título `⚖️ VENCE — [actuación] — [cliente] ([radicado])`, color rojo
   (`colorId: "11"`), recordatorios `overrideReminders`: popup y email 1 día
   antes (1440 min) y popup 1 hora antes (60 min).
2. **Alerta de preparación**: N días hábiles antes, título `🟡 PREPARAR — ...`:
   5 días hábiles antes por defecto; 2 si el término es ≤ 5 días.
3. **Si es FATAL**: alerta adicional 10 días hábiles antes, título
   `🔴 FATAL en 10 días hábiles — ...`.

Descripción de cada evento (plantilla): término y base legal · fecha y forma de
notificación · resumen del cómputo (inicio, inhábiles excluidos, resultado) ·
carpeta del caso · "Cómputo asistido — confirmar contra estados/expediente" ·
fecha de cálculo.

Reportar al usuario los enlaces de los eventos creados.

### FASE 4 — Registro auditable

Asentar cada vencimiento en `casos/00-VENCIMIENTOS.md` (tabla central) con
estado ACTIVO. El calendario avisa; el registro es la memoria del despacho:
cuando el usuario informe que la actuación se cumplió (o venció), actualizar a
CUMPLIDO / VENCIDO con fecha. El registro nunca se borra, se marca.

### FASE 5 — Semáforo ("¿qué vence?")

Cuando pidan el estado de plazos: cruzar `casos/00-VENCIMIENTOS.md` con
`list_events` (fullText "VENCE", próximos 15 días) y entregar el semáforo:
- 🔴 ROJO: vence en ≤ 3 días hábiles (o FATAL en ≤ 10)
- 🟡 AMARILLO: vence en ≤ 10 días hábiles
- 🟢 VERDE: el resto, informativo
Discrepancias entre calendario y registro se reportan — nunca se ignoran.

---

## REGLAS DURAS

1. Todo resultado se entrega como **"cómputo asistido — confirmar contra los
   estados y el expediente"**: los estados del juzgado mandan sobre cualquier
   cálculo. Esta línea va en el entregable y en cada evento.
2. Término FATAL = peor escenario en toda duda + margen de preparación.
3. El conteo siempre se muestra completo (tabla día a día). Un resultado sin
   conteo visible no se entrega.
4. Festivos: solo el calendario consultado EN VIVO con el filtrado obligatorio.
   Jamás de memoria.
5. Nunca modificar ni eliminar eventos `VENCE` existentes sin confirmación
   expresa del usuario.
6. Si el término aplicable es discutible (norma ambigua, jurisprudencia
   dividida): computar TODAS las hipótesis, agendar por la más corta y marcar
   [Ambiguo — criterio pendiente].
7. Señal/ruido (regla 8 de `vigilancia-normativa-col`): la fecha de vencimiento
   va primero; el detalle del cómputo la respalda, no la entierra.

## VINCULACIÓN

| Skill | Relación |
|---|---|
| `cronologia-procesal-col` | Aporta las fechas y actuaciones del expediente |
| `vigilancia-normativa-col` | Detecta nuevos plazos regulatorios (ej. SG-SST 31-jul) y cambios en términos legales |
| `ecosistema-juridico-col` | Estrategia procesal alrededor del término |
| `anti-hallucination-v3` | Cierre de entregables con cómputos a cliente |

## REFERENCIAS

- `references/reglas-computo.md` — reglas de cómputo con base legal y tabla
  orientativa de términos comunes (NO fuente). **Leer antes de la FASE 2.**
- `references/calendarios-y-convenciones.md` — IDs, filtrado de festivos con
  ejemplos reales, convenciones de eventos y recordatorios.
