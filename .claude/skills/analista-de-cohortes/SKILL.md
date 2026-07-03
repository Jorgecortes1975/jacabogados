---
name: analista-de-cohortes
description: Lee cohortes de prospectos captados por mes y canal (LinkedIn, referido, directorio jurídico) como las leería un inversionista, mostrando la tabla de cohorte, la cohorte que rompe el patrón, el cambio porcentual entre la mejor y la peor, y explicaciones plausibles marcadas como hipótesis, no como hechos. Úsala cuando el usuario pida analizar cómo convierten los prospectos captados en distintos meses o canales, o comparar el desempeño de captación mes a mes.
---

# Analista de cohortes — captación de prospectos por mes y canal

Modelo recomendado: **Claude Sonnet 5** (`claude-sonnet-5`). Detectar qué
cohorte rompe el patrón y generar explicaciones plausibles exige razonamiento
comparativo entre varias dimensiones a la vez — no es aritmética simple.

Un análisis de cohortes agrupa a los prospectos por el mes en que entraron al
pipeline (o por canal de captación) y sigue qué fracción de cada grupo avanzó
a "Cliente" con el tiempo. Es la vista que un inversionista pediría antes de
poner dinero en la estrategia de captación del despacho: no "¿cuántos
prospectos tenemos?" sino "¿el prospecto que entra hoy convierte mejor o peor
que el que entró hace tres meses, y por qué canal?".

## Regla de seguridad obligatoria (anti-alucinación)

1. **Nunca redondear ni inventar una tasa de conversión que no se derive
   directamente de contar filas del CRM entregado.** Toda tasa se reporta como
   "(X clientes / Y prospectos de esa cohorte) = Z%", nunca solo el porcentaje.
2. **Todo cambio porcentual entre cohortes debe mostrar la resta o división
   detrás**: "cohorte de enero convirtió 25% vs. cohorte de marzo 8% → caída de
   17 puntos porcentuales (25% − 8%)", no solo "cayó fuerte".
3. **Si una cohorte tiene muestra insuficiente** (ej. menos de 5 prospectos),
   márcalo explícitamente como "muestra pequeña, no concluyente" en vez de
   tratarla con la misma confianza que una cohorte de 30.
4. **Las explicaciones de por qué una cohorte rompe el patrón son siempre
   hipótesis, nunca hechos.** Etiquétalas como "explicación plausible" y no
   como causa confirmada, salvo que el usuario haya entregado un dato que
   confirme la causa explícitamente.
5. Si la tabla de cohortes identifica empresas o decisores por nombre y el
   análisis va a compartirse fuera del despacho, anonimiza antes de enviarlo
   (Ley 1581 de 2012). Si el análisis toca ingresos por cliente cerrado y el
   usuario quiere profundizar en las horas detrás de ese ingreso, remite a
   `facturacion-horas-co` en vez de calcularlo aquí.

## Cuándo usar esta skill

Cuando el usuario tenga datos del CRM de prospectos con fecha de primer
contacto, canal y estado, y quiera saber si la captación está mejorando o
empeorando con el tiempo, o qué canal produce prospectos que realmente
avanzan (no solo que entran).

## Proceso operativo

**Paso 1 — Pide los datos de eventos y la dimensión de cohorte.**
Necesitas, por prospecto: fecha de primer contacto (para asignar el mes de
cohorte), canal, y estado actual (o fecha en que llegó a "Cliente", si existe).
Pregunta explícitamente qué dimensión de cohorte le interesa al usuario: por
mes de entrada, por canal, o cruzada (mes × canal). Pregunta también qué
métrica de conversión importa (a "Cliente", a "Propuesta enviada", u otra).

**Paso 2 — Construye la tabla de cohorte.**
Filas = cohorte (mes de entrada o canal), columnas = etapa del pipeline o
periodo transcurrido, celdas = conteo y % sobre el tamaño de la cohorte,
mostrando siempre el conteo absoluto junto al porcentaje.

**Paso 3 — Señala la cohorte que rompe el patrón.**
Identifica la cohorte cuya conversión se desvía más del resto (muy por
encima o muy por debajo), citando su cifra exacta contra el promedio o
mediana de las demás cohortes, con la resta mostrada.

**Paso 4 — Cambio porcentual entre la mejor y la peor cohorte.**
Reporta la resta en puntos porcentuales entre la cohorte de mejor y peor
conversión, mostrando ambos valores y la operación.

**Paso 5 — Tres explicaciones plausibles.**
Ofrece hasta tres hipótesis de por qué la cohorte atípica se comporta así,
basadas en lo que el dataset sí muestra (ej. concentración de canal,
estacionalidad, cambio de mensaje) — nunca una causa externa que el dataset no
pueda sustentar, y siempre etiquetadas "hipótesis, no confirmado".

**Paso 6 — Un análisis de seguimiento.**
Sugiere una pregunta o corte adicional de datos que confirmaría o
descartaría la explicación más probable (ej. "cruzar esta cohorte contra el
abogado que hizo el primer contacto, si ese dato existe").

## Mini-ejemplo

**Entrada**: prospectos del CRM agrupados por mes de entrada y canal, con
estado final observado a la fecha de corte (03/07/2026). Datos ficticios.

| Cohorte (mes de entrada) | Canal | Prospectos | Llegaron a Cliente | % conversión |
|---|---|---|---|---|
| Enero 2026 | LinkedIn | 10 | 1 | 1/10 = 10% |
| Enero 2026 | Referido | 4 | 2 | 2/4 = 50% |
| Febrero 2026 | LinkedIn | 12 | 2 | 2/12 = 17% |
| Febrero 2026 | Referido | 3 | 1 | 1/3 = 33% |
| Marzo 2026 | LinkedIn | 15 | 1 | 1/15 = 7% |
| Marzo 2026 | Referido | 2 | 2 | 2/2 = 100% (muestra pequeña, no concluyente) |
| Abril 2026 | LinkedIn | 9 | 0 | 0/9 = 0% |
| Abril 2026 | Referido | 5 | 1 | 1/5 = 20% |

**Cohorte que rompe el patrón**: Marzo 2026 – Referido, 100% de conversión,
pero con solo 2 prospectos — se marca explícitamente como muestra
insuficiente y se excluye de la comparación principal. Excluyendo esa fila,
la cohorte más fuerte es Enero 2026 – Referido (50%, 2/4) y la más débil es
Abril 2026 – LinkedIn (0%, 0/9).

**Cambio porcentual mejor vs. peor (excluyendo muestra insuficiente)**: 50% −
0% = 50 puntos porcentuales de diferencia entre Enero–Referido y Abril–LinkedIn.

**3 explicaciones plausibles (hipótesis, no confirmado)**:
1. El canal Referido llega pre-calificado por quien refiere, lo que podría
   explicar la conversión sistemáticamente más alta que LinkedIn en todos los
   meses del dataset (10%, 17%, 7%, 0% en LinkedIn vs. 50%, 33%, 20% en
   Referido, excluyendo la muestra pequeña de marzo).
2. El volumen de LinkedIn crece mes a mes (10 → 12 → 15 → 9) mientras la
   conversión cae — posible saturación del mensaje o fatiga del mismo gancho
   usado repetidamente, pero el dataset no tiene columna de "mensaje usado"
   para confirmarlo.
3. Abril–LinkedIn en 0% podría deberse a que los prospectos de abril aún no
   han tenido tiempo suficiente de avanzar en el pipeline al momento del
   corte (03/07/2026) — no necesariamente peor calidad de prospecto.

**Análisis de seguimiento sugerido**: repetir esta tabla en 60 días, cuando
la cohorte de abril tenga el mismo tiempo de maduración que la de enero, para
descartar la hipótesis 3 antes de concluir que LinkedIn empeoró.

## Cierre — límite de esta skill

Esta skill muestra el patrón y ofrece hipótesis explícitamente marcadas como
tales — nunca concluye la causa real ni decide reasignar presupuesto entre
canales. Esa decisión, y la de cuánto invertir en cada canal de captación, es
del socio o responsable de marketing del despacho.
