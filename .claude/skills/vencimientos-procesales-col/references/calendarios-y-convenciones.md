# CALENDARIOS Y CONVENCIONES — Gestor de vencimientos

## IDs verificados (18-jul-2026, en vivo)

| Calendario | ID | Rol |
|---|---|---|
| Principal | `jorgeacortesc38@gmail.com` | Destino de todos los eventos. TZ America/Bogota |
| Festivos en Colombia | `es.co#holiday@group.v.calendar.google.com` | Solo lectura — fuente de inhábiles |
| Biblioteca Libre FJ 21 | `classroom107594171684010698171@group.calendar.google.com` | NO usar para vencimientos |

## ⚠️ FILTRADO DE FESTIVOS — la trampa documentada

El calendario de Google "Festivos en Colombia" contiene TRES tipos de entradas;
solo UNA cuenta para el cómputo:

| Tipo (campo description) | ¿Inhábil? | Ejemplos reales verificados (2026) |
|---|---|---|
| "Día festivo" | **SÍ** | Día de la Independencia (20-jul), Batalla de Boyacá (7-ago), Asunción (17-ago), Fieles Difuntos (2-nov), Independencia de Cartagena (16-nov), Inmaculada (8-dic) |
| "Celebración" | **NO** | Amor y Amistad (19-sep), Halloween (31-oct), Día de la Mujer Colombiana (14-nov), Velitas (7-dic), Noche Buena (24-dic) |
| Duplicados de fiestas trasladadas (Ley 51/1983) | Solo la entrada "Día festivo" | Asunción aparece 15-ago (Celebración) Y 17-ago (Día festivo) → inhábil SOLO el 17; Fieles Difuntos 1-nov (Celebración) y 2-nov (Día festivo); Independencia de Cartagena 11-nov (Celebración) y 16-nov (Día festivo) |

Procedimiento: `list_events` sobre el calendario de festivos con `startTime`/
`endTime` cubriendo TODO el rango del cómputo (+15 días de margen), y quedarse
solo con los eventos cuya `description` comience por "Día festivo". Documentar
en el cómputo qué festivos se excluyeron y cuáles se descartaron por ser
"Celebración".

## Convenciones de eventos

| Elemento | Convención |
|---|---|
| Título vencimiento | `⚖️ VENCE — [actuación] — [cliente] ([radicado])` |
| Título preparación | `🟡 PREPARAR — [actuación] — [cliente]` |
| Título alerta fatal | `🔴 FATAL en 10 días hábiles — [actuación] — [cliente]` |
| Color | `colorId: "11"` (rojo) para VENCE; `"5"` (amarillo) para PREPARAR |
| Hora | 8:00–9:00 a.m. America/Bogota (evento con hora, no all-day: los recordatorios de all-day son menos confiables) |
| Recordatorios VENCE | `overrideReminders`: email 1440 min + popup 1440 min + popup 60 min |
| Duplicados | Antes de crear: `list_events` con `fullText` = radicado; si ya existe, actualizar en vez de duplicar (con confirmación) |

## Plantilla de descripción del evento

```
TÉRMINO: [n días hábiles/calendario] — [base legal]
NOTIFICACIÓN: [fecha y forma]
CÓMPUTO: inicia [fecha]; inhábiles excluidos: [lista]; vence [fecha]
CASO: casos/[carpeta] — radicado [n]
Registro: casos/00-VENCIMIENTOS.md
⚠️ Cómputo asistido ([fecha de cálculo]) — confirmar contra estados/expediente.
```
