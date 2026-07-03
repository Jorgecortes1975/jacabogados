---
name: tracker-de-kpis
description: Arma el reporte semanal o mensual de KPIs del despacho (conexiones LinkedIn, mensajes enviados, prospectos calificados, propuestas, clientes cerrados) comparando valor actual contra anterior y contra meta, ordenado por los indicadores más atrasados primero. Úsala cuando el usuario pida el reporte de KPIs de la semana, revisar cómo va el despacho contra sus metas de captación, o preparar el resumen de indicadores para la reunión de los lunes.
---

# Tracker de KPIs — captación y operación de JA Abogados

Modelo recomendado: **Claude Haiku 4.5** (`claude-haiku-4-5`). Es una tarea de
comparación mecánica (actual vs. anterior vs. meta) sobre una lista corta de
indicadores — bajo riesgo si se sigue la regla de no inventar cifras, y de
volumen recurrente (cada lunes) que no justifica el costo de un modelo mayor.

Esta skill produce el reporte de indicadores que el Plan de Marketing Digital
del despacho pide revisar "cada lunes" (sección 10): KPIs semanales de
captación (conexiones, mensajes, respuestas, consultas agendadas, posts,
reseñas) y KPIs mensuales de pipeline (prospectos calificados, propuestas,
clientes cerrados, tasa de conversión, ingresos por canal digital).

## Regla de seguridad obligatoria (anti-alucinación)

1. **Nunca redondear ni inventar un valor de KPI que el usuario no haya
   entregado.** Si el usuario da el valor actual pero no el anterior, el
   delta se marca "[no calculable — falta valor anterior]", nunca se estima.
2. **Todo delta y todo % de avance contra meta debe mostrar la resta o
   división exacta**, no solo el resultado: "18 de 20 conexiones nuevas
   (18/20 = 90% de la meta semanal)", nunca solo "90%".
3. **Marca explícitamente los KPIs sin dato de este periodo** en vez de
   arrastrar el valor anterior como si fuera el actual, o de asumir que "se
   mantuvo igual".
4. **Si el KPI es "ingresos generados" o toca horas facturables/WIP**, no
   calcules ni interpretes esa cifra con lógica propia de facturación —
   toma el número que el usuario entregue como dato de entrada y, si el
   usuario pide revisar el detalle de horas detrás de ese ingreso, remite a
   `facturacion-horas-co`.
5. Si el reporte va a compartirse fuera del despacho (ej. con un socio
   inversionista o un tercero), y algún KPI incluye nombres de prospectos o
   decisores identificables, anonimiza esos nombres antes de compartirlo —
   la base de contactos está protegida por la Ley 1581 de 2012.

## Cuándo usar esta skill

Cuando el usuario tenga una lista de KPIs con sus valores (los de la sección
10 del Plan de Marketing Digital, u otros que el despacho decida trackear) y
quiera el reporte semanal o mensual listo para la reunión de revisión, sin
tener que comparar manualmente cada indicador contra su meta.

## Proceso operativo

**Paso 1 — Pide la lista de KPIs con sus tres valores.**
Para cada KPI necesitas: nombre/definición, valor actual del periodo, valor
del periodo anterior (si existe) y meta/target. Si el usuario solo da el
valor actual, pídelo explícitamente antes de calcular cualquier delta o
status — no asumas ni completes con un placeholder que parezca un dato real.

**Paso 2 — Calcula delta y status por KPI.**
- Delta = valor actual − valor anterior, mostrando la resta.
- % de meta = valor actual / meta, mostrando la división.
- Status: **Cumplido** (≥100% de la meta), **En riesgo** (70–99% de la meta),
  **Atrás** (<70% de la meta). Estos umbrales son un default razonable — si el
  despacho define otros, úsalos y dilo explícitamente.

**Paso 3 — Redacta un comentario de una línea por KPI.**
El comentario debe explicar el status con lo que hay en los datos (ej. "cayó
de 25 a 12 conexiones porque la semana incluyó Semana Santa" solo si el
usuario dio esa razón — si no la dio, el comentario se limita a describir el
número, sin inventar causa: "cayó de 25 a 12 conexiones; causa no reportada").

**Paso 4 — Ordena de más atrasado a más cumplido.**
La tabla final se ordena por status (Atrás primero, luego En riesgo, luego
Cumplido) para que la reunión del lunes empiece por lo que necesita atención,
no por el orden en que llegaron los datos.

**Paso 5 — Cierra con el resumen de una línea.**
Una frase que diga cuántos KPIs están Atrás / En riesgo / Cumplidos del total,
con la cuenta mostrada (ej. "3 de 8 KPIs atrás, 2 en riesgo, 3 cumplidos").

## Reglas de formato

- Un KPI por fila de tabla; nunca agrupar varios KPIs en una sola celda.
- El status va siempre acompañado del cálculo que lo sustenta, no solo la
  etiqueta.
- Si un KPI no tiene meta definida, el status se marca "[sin meta — no
  clasificable]", nunca se le asigna Cumplido/Atrás por defecto.

## Mini-ejemplo

**Entrada del usuario** — KPIs semanales, semana del 29/jun al 03/jul/2026
(datos ficticios, formato de la sección 10 del Plan de Marketing):

| KPI | Actual | Anterior | Meta |
|---|---|---|---|
| Conexiones nuevas LinkedIn | 14 | 26 | 20–30 |
| Mensajes de primer contacto enviados | 10 | 9 | 10 |
| Respuestas recibidas | 2 | 4 | ≥3 |
| Consultas agendadas | 0 | 2 | 1–2 |
| Posts publicados | 5 | 4 | 5 |
| Reseñas Google Business | 1 | 0 | 1/mes |

**Reporte generado**:

| KPI | Actual | Anterior | Delta | % de meta | Status | Comentario |
|---|---|---|---|---|---|---|
| Consultas agendadas | 0 | 2 | 0 − 2 = −2 | 0/1 = 0% (meta mínima) | **Atrás** | Cayó a 0; sin dato de causa reportado |
| Respuestas recibidas | 2 | 4 | 2 − 4 = −2 | 2/3 = 67% de la meta mínima | **Atrás** | Bajó a la mitad; causa no reportada |
| Conexiones nuevas LinkedIn | 14 | 26 | 14 − 26 = −12 | 14/20 = 70% de la meta mínima | **En riesgo** | Justo en el borde del umbral de riesgo |
| Posts publicados | 5 | 4 | 5 − 4 = +1 | 5/5 = 100% | **Cumplido** | Meta semanal alcanzada exacta |
| Mensajes de primer contacto enviados | 10 | 9 | 10 − 9 = +1 | 10/10 = 100% | **Cumplido** | Meta alcanzada |
| Reseñas Google Business | 1 | 0 | 1 − 0 = +1 | 1/1 = 100% (meta mensual, revisar si aplica a la semana) | **Cumplido** | Meta mensual ya cubierta esta semana — verificar que no se duplique el conteo el resto del mes |

**Resumen**: 2 de 6 KPIs atrás, 1 en riesgo, 3 cumplidos.

## Cierre — límite de esta skill

Esta skill calcula y ordena, nunca decide qué acción tomar frente a un KPI
atrasado ni reinterpreta metas del plan de marketing. La decisión de ajustar
la estrategia de captación (más mensajes, cambiar de canal, pausar una
campaña) es del socio o del responsable de marketing del despacho, con este
reporte como insumo.
