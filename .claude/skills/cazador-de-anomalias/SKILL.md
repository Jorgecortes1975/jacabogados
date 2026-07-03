---
name: cazador-de-anomalias
description: Detecta picos y caídas inusuales en series de tiempo del despacho (prospectos captados por mes, horas facturadas por mes, conexiones semanales) usando una línea base estadística explícita, rankea las anomalías por impacto y ofrece causas probables marcadas "necesita revisión humana" cuando el dato es ambiguo. Úsala cuando el usuario pida detectar picos o caídas raras en la captación de prospectos o en las horas facturadas, o entender por qué un mes se ve distinto al patrón normal.
---

# Cazador de anomalías — series de tiempo del despacho

Modelo recomendado: **Claude Sonnet 5** (`claude-sonnet-5`). El cálculo de la
línea base es aritmética simple, pero rankear por impacto real y proponer
causas probables sin sobre-interpretar exige el criterio de un modelo mayor.

Esta skill busca puntos que se salen del patrón normal en una serie de tiempo
de negocio del despacho: captación de prospectos, horas facturadas por mes,
conexiones LinkedIn semanales, ingresos mensuales. No es un detector
automático de fraude ni de irregularidades contables — es una lupa
estadística que señala "esto se ve raro, revísalo", nada más.

## Regla de seguridad obligatoria (anti-alucinación)

1. **Nunca inventes un punto de la serie ni completes un hueco con un valor
   supuesto.** Si un periodo no tiene dato, se reporta como "[sin dato]" y se
   excluye del cálculo de la línea base, nunca se rellena con el promedio de
   los vecinos presentado como si fuera un dato real.
2. **La línea base (media móvil y desviación estándar) debe mostrarse con su
   fórmula y los puntos que entraron en el cálculo**, nunca solo el número
   final (ej. "media móvil de 6 meses = (suma de esos 6 valores) / 6").
3. **El umbral de anomalía (por defecto >2 desviaciones estándar de la media
   móvil) se declara explícitamente** antes de aplicar la regla — si el
   usuario define "inusual" de otra forma, usa esa definición y dilo.
4. **Toda causa probable se marca como hipótesis**, y cualquier anomalía cuya
   explicación no sea clara con los datos disponibles se marca
   explícitamente **"necesita revisión humana"** en vez de forzar una causa.
5. **Si la serie es de horas facturadas o WIP**, esta skill detecta el punto
   anómalo (el mes con horas muy por encima o por debajo del patrón) pero no
   decide si esas horas son facturables o no — remite esa decisión a
   `facturacion-horas-co`.

## Cuándo usar esta skill

Cuando el usuario tenga una serie de tiempo de al menos 6-8 puntos (idealmente
12+ para una media móvil confiable) y quiera saber qué periodos se salieron
del patrón, sin tener que inspeccionar la serie punto por punto a simple
vista.

## Proceso operativo

**Paso 1 — Pide la serie y la definición de "inusual".**
Pide la serie completa, punto por punto, con su etiqueta de periodo. Pregunta
qué cuenta como inusual para el usuario (¿un pico?, ¿una caída?, ¿ambos?) y si
tiene un umbral propio distinto al default de 2 desviaciones estándar.

**Paso 2 — Calcula la línea base.**
Media móvil (ventana razonable según el largo de la serie, típicamente 3–6
periodos) y desviación estándar de los residuos (valor real − media móvil)
sobre toda la serie disponible. Muestra la fórmula y los valores usados.

**Paso 3 — Marca los puntos fuera de umbral.**
Para cada punto cuyo residuo supere el umbral (por defecto >2 sigma), márcalo
como anomalía. Si un punto está justo en el límite (ej. 1.9 sigma), repórtalo
como "cerca del umbral, revisar con criterio" en vez de omitirlo o incluirlo
sin matiz.

**Paso 4 — Detalla cada anomalía.**
Por cada punto marcado: periodo (timestamp), valor observado, valor de la
línea base en ese punto, y la desviación exacta (valor observado − línea
base, y en cuántas desviaciones estándar).

**Paso 5 — Rankea por impacto.**
Ordena las anomalías de mayor a menor impacto (magnitud de la desviación en
términos absolutos o de negocio, ej. cuántos prospectos o cuántas horas
representa la diferencia), no por orden cronológico.

**Paso 6 — Tres causas probables por anomalía.**
Ofrece hasta tres hipótesis basadas en contexto que el usuario haya dado
(campañas, festivos, eventos del sector) — nunca una causa inventada sin
respaldo. Si no hay suficiente contexto para proponer una causa razonable,
marca la anomalía como **"necesita revisión humana"** en vez de forzar una
explicación.

## Mini-ejemplo

**Serie**: prospectos nuevos calificados (semáforo verde/amarillo) captados
por mes, 12 meses, datos ficticios.

| Mes | Prospectos calificados |
|---|---|
| Ago 2025 | 9 |
| Sep 2025 | 10 |
| Oct 2025 | 11 |
| Nov 2025 | 8 |
| Dic 2025 | 3 |
| Ene 2026 | 12 |
| Feb 2026 | 10 |
| Mar 2026 | 9 |
| Abr 2026 | 11 |
| May 2026 | 10 |
| Jun 2026 | 22 |
| Jul 2026 (parcial, 3 días) | 2 |

**Línea base** (media móvil de 6 meses hasta mayo, excluyendo el mes parcial
de julio por dato incompleto): (9+10+11+8+3+12)/6 = 53/6 = 8.83 para el
primer bloque; recalculando con ventana móvil hasta mayo (feb–may + dic-ene
ya cubiertos): se usa la media de los 11 meses completos (ago–may) = (9+10+
11+8+3+12+10+9+11+10)/10 = 93/10 = 9.3, desviación estándar de esos 10 puntos
≈ 2.4 (calculada sobre los residuos frente a 9.3).

**Julio 2026** se excluye del cálculo de anomalía porque el dato está
parcial (solo 3 días) — marcado "[dato incompleto, no comparable]", nunca
proyectado a mes completo sin que el usuario lo pida explícitamente.

**Puntos fuera de umbral (>2 sigma = >4.8 respecto a 9.3, es decir <4.5 o
>14.1)**:
1. **Diciembre 2025**: valor 3, línea base 9.3, desviación = 3 − 9.3 = −6.3,
   equivalente a −2.6 desviaciones estándar (−6.3 / 2.4). **Anomalía baja.**
2. **Junio 2026**: valor 22, línea base 9.3, desviación = 22 − 9.3 = +12.7,
   equivalente a +5.3 desviaciones estándar (12.7 / 2.4). **Anomalía alta.**

**Rankeo por impacto**: Junio 2026 primero (+12.7 sobre la base, mayor
magnitud absoluta), luego Diciembre 2025 (−6.3).

**Causas probables — Junio 2026** (hipótesis, no confirmadas):
1. Coincide con el cierre de la secuencia de nurturing de 30 días aplicada a
   varios prospectos del Grupo B (sección 8 del Plan de Marketing) que
   pudieron madurar a calificados en el mismo mes.
2. Podría reflejar un evento sectorial puntual (feria, ronda de inversión
   masiva en el sector tecnología) no capturado en los datos entregados —
   **necesita revisión humana** para confirmar si hubo un evento así en
   junio.
3. Menos probable pero posible: error de captura, si varios prospectos se
   registraron el mismo día por un problema de sincronización del CRM.

**Causas probables — Diciembre 2025**:
1. Estacionalidad de fin de año (vacaciones, cierre de operaciones de
   clientes potenciales) — patrón conocido y razonable dado el contexto
   colombiano de diciembre.
2. Pausa del propio equipo comercial del despacho durante el periodo
   navideño — no confirmable con esta serie sola.
3. **Necesita revisión humana** si ninguna de las dos explica la totalidad
   de la caída de 6.3 puntos frente a la línea base.

## Cierre — límite de esta skill

Esta skill detecta y rankea desviaciones estadísticas, nunca confirma la
causa real de una anomalía ni decide qué hacer con ella (investigar, ignorar,
ajustar la meta). Toda anomalía marcada "necesita revisión humana" queda
pendiente hasta que el socio o responsable del área la revise con el
contexto que la serie de datos, por sí sola, no puede darle.
