---
name: constructor-de-forecast
description: Construye un forecast defendible de ingresos o clientes nuevos captados a 12 semanas, con bandas low/base/high, supuestos explícitos calificados por confianza y un stress test de ±20%, listo para presentar ante los socios. Úsala cuando el usuario pida proyectar ingresos o nuevos clientes de los próximos meses, preparar un forecast para la reunión de socios, o estimar si se va a cumplir la meta trimestral de captación.
---

# Constructor de forecast — ingresos y captación de JA Abogados

Modelo recomendado: **Claude Sonnet 5** (`claude-sonnet-5`). Un forecast que
se va a defender frente a los socios exige justificar la elección de modelo y
calibrar la confianza de cada supuesto — juicio que un modelo de menor
capacidad no debe cargar solo.

Esta skill proyecta hacia adelante una métrica de negocio del despacho
(ingresos mensuales, clientes nuevos cerrados, prospectos calificados) a
partir de su historia reciente. No es una fórmula mágica: el valor de esta
skill es dejar explícito qué se está asumiendo y qué tan seguro está ese
supuesto, para que la junta pueda cuestionarlo con conocimiento de causa.

## Regla de seguridad obligatoria (anti-alucinación)

1. **Nunca inventes un punto de la serie histórica que el usuario no haya
   entregado.** Si faltan semanas de historia, dilo explícitamente y decide
   el modelo con lo que sí hay — no rellenes huecos con interpolación
   silenciosa presentada como dato real.
2. **Toda cifra de la banda low/base/high debe mostrar la fórmula o el
   razonamiento que la produjo** (ej. "base = promedio móvil de 8 semanas =
   (suma de las últimas 8 semanas) / 8"), nunca solo el número final.
3. **Cada supuesto se marca con un nivel de confianza explícito** (alta /
   media / baja) según qué tan sólida es la evidencia detrás — nunca se
   presenta un supuesto como hecho.
4. **Si la métrica a proyectar es ingresos derivados de horas facturables**,
   no calcules el detalle de horas ni WIP con lógica propia — toma el
   ingreso histórico como dato de entrada y, si hace falta profundizar en el
   registro de horas detrás de esa cifra, remite a `facturacion-horas-co`.
5. Si el forecast va a compartirse fuera del despacho (inversionista externo,
   banco), y la serie histórica incluye nombres de clientes identificables,
   anonimiza antes de compartir.

## Cuándo usar esta skill

Cuando el usuario tenga al menos 8–10 puntos de historia reciente de una
métrica de negocio (idealmente 26 semanas) y necesite proyectarla 12 semanas
hacia adelante con una banda de incertidumbre defendible, en vez de una sola
cifra optimista.

## Proceso operativo

**Paso 1 — Pide métrica, historia y eventos conocidos.**
Pide: qué métrica se proyecta, la serie histórica completa punto por punto
(mínimo 8 semanas; 26 semanas es lo ideal para capturar estacionalidad), y
cualquier evento conocido que vaya a romper la tendencia (vacaciones
judiciales, campaña de marketing planeada, salida de un socio, cierre de un
cliente grande). Si hay menos de 8 puntos, dilo explícitamente: el forecast
será de baja confianza y debe presentarse como tal.

**Paso 2 — Elige el modelo y justifícalo.**
- **Lineal**: si la serie muestra tendencia sostenida sin estacionalidad
  visible y hay suficiente historia para ajustarla con confianza.
- **Estacional**: si hay un patrón que se repite (ej. caída en vacaciones de
  fin de año, pico en enero por presupuestos nuevos de clientes).
- **Judgment (basado en criterio)**: si la historia es corta, muy volátil, o
  hay un evento conocido que invalida la proyección puramente estadística
  (ej. la firma acaba de contratar un socio nuevo y la captación va a
  cambiar de forma que los datos históricos no capturan).
Explica en una frase por qué se eligió ese modelo y no otro.

**Paso 3 — Forecast de 12 semanas con bandas.**
Genera semana a semana: low, base, high. El "base" es el resultado directo
del modelo elegido; "low" y "high" se derivan aplicando la variabilidad
observada en la historia (ej. ± una desviación estándar de los residuos), no
un porcentaje arbitrario inventado. Muestra el cálculo de la banda.

**Paso 4 — Lista de supuestos con nivel de confianza.**
Enumera cada supuesto detrás del forecast (ej. "el ritmo de mensajes de
primer contacto se mantiene en 10/semana", "no hay salida de ningún abogado
del equipo comercial") con su nivel de confianza (alta/media/baja) y por qué.

**Paso 5 — Los 2 supuestos más sensibles.**
De la lista del Paso 4, identifica los 2 supuestos cuyo cambio movería más
el resultado final, y explica por qué son los más sensibles.

**Paso 6 — Stress test ±20%.**
Recalcula el escenario base aplicando −20% y +20% sobre el supuesto más
sensible identificado en el Paso 5, mostrando el nuevo resultado y la
diferencia contra el base.

## Mini-ejemplo (forecast de clientes nuevos cerrados, abreviado)

**Historia disponible** (10 de las 26 semanas ideales — se declara baja
confianza por historia corta): últimas 10 semanas, clientes nuevos cerrados:
0, 1, 0, 1, 1, 0, 1, 2, 1, 1 (total 8 clientes en 10 semanas, promedio 0.8
clientes/semana = 8/10).

**Modelo elegido**: judgment apoyado en promedio móvil, no lineal puro —
la serie es corta y discreta (no tiene sentido ajustar una recta a conteos de
1 y 0 por semana); se usa el promedio de las últimas 10 semanas como base y
se ajusta con el evento conocido (el despacho va a lanzar la secuencia de
nurturing de la sección 8 del Plan de Marketing en la semana 3, lo que
debería aumentar el ritmo, según el objetivo mensual de la sección 10 de
1–2 clientes nuevos cerrados por mes).

**Forecast 12 semanas (fragmento, semanas 1–4)**:

| Semana | Low | Base | High |
|---|---|---|---|
| 1 | 0.4 (0.8 − 0.4 de variabilidad observada) | 0.8 (promedio histórico) | 1.2 (0.8 + 0.4) |
| 2 | 0.4 | 0.8 | 1.2 |
| 3 | 0.6 (ajuste +0.2 por lanzamiento de nurturing, baja confianza) | 1.0 | 1.4 |
| 4 | 0.6 | 1.0 | 1.4 |

**Supuestos**:
- El ritmo de captación de las últimas 10 semanas se mantiene (confianza
  media — historia corta).
- La secuencia de nurturing de la semana 3 añade +0.2 clientes/semana desde
  entonces (confianza baja — no hay dato histórico de un lanzamiento previo
  para calibrar este número).
- Ningún abogado del equipo comercial sale del despacho en el periodo
  (confianza alta — no hay señal de que esto vaya a pasar).

**2 supuestos más sensibles**: (1) el efecto de +0.2 de la secuencia de
nurturing, porque es el único ajuste al alza y su confianza es baja; (2) que
el promedio histórico de 0.8/semana sea representativo, dado que se calcula
sobre solo 10 puntos.

**Stress test ±20% sobre el supuesto de nurturing**: si el efecto real es
+0.16 en vez de +0.2 (−20%), el acumulado a 12 semanas baja de ~10.8 a ~10.4
clientes; si es +0.24 (+20%), sube a ~11.2. La banda base ya cubre este rango
razonablemente.

## Cierre — límite de esta skill

Esta skill construye y justifica el forecast, nunca decide metas comerciales
ni compromete cifras frente a un tercero en nombre del despacho. La decisión
de qué forecast presentar como oficial ante los socios, y la responsabilidad
por cualquier compromiso derivado de él, es siempre del socio a cargo.
