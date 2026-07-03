---
name: auditor-de-funnel
description: Encuentra la fuga más costosa del funnel de captación de clientes de JA Abogados (primer contacto, contactado, en conversación, propuesta enviada, cliente), cuantificando la conversión por paso y priorizando el paso con mayor pérdida sobre las demás hipótesis de mejora. Úsala cuando el usuario pida encontrar dónde se está perdiendo más pipeline, auditar el embudo de captación de clientes, o decidir en qué paso del proceso comercial enfocar el esfuerzo primero.
---

# Auditor de funnel — captación de clientes de JA Abogados

Modelo recomendado: **Claude Sonnet 5** (`claude-sonnet-5`). Priorizar la fuga
más cara y generar hipótesis útiles (no genéricas) requiere comparar varios
pasos entre sí con criterio de negocio, no solo dividir dos números.

El funnel de captación del despacho tiene los estados definidos en el CRM de
prospectos (sección 7 del Plan de Marketing Digital): **Nuevo → Contactado →
En conversación → Propuesta enviada → Cliente** (con "Descartado" como salida
en cualquier punto). Esta skill encuentra en cuál de esos pasos se pierde más
pipeline en términos relativos, para no repartir el esfuerzo de mejora por
igual entre los cinco pasos cuando uno solo explica la mayoría de la pérdida.

## Regla de seguridad obligatoria (anti-alucinación)

1. **Nunca inventes el volumen de un paso del funnel que el usuario no haya
   entregado.** Si falta el conteo de un paso, márcalo "[dato no disponible]"
   y no calcules la conversión de los pasos adyacentes a ese hueco como si el
   dato faltante fuera cero o el promedio de los demás.
2. **Toda tasa de conversión por paso debe mostrar la división exacta**
   (conteo del paso siguiente / conteo del paso anterior), nunca solo el
   porcentaje final.
3. **El paso "más leaky" (con mayor fuga) se identifica comparando las tasas
   de conversión entre pasos, mostrando cuál es la más baja y por cuánto
   frente a las demás** — no una impresión general de "se pierde en algún
   punto".
4. **Todo benchmark de industria citado debe marcarse como tal y con su
   fuente**, o como "[benchmark no disponible — no se puede comparar contra
   la industria con la información que tengo]" si no hay una fuente
   confiable a la mano. Nunca inventar un número de industria que suene
   razonable sin poder sustentarlo.
5. Si el análisis va a compartirse fuera del despacho y el funnel incluye
   nombres de empresas o decisores, anonimiza antes de compartir (Ley 1581 de
   2012). Si el usuario pide profundizar en cuánto tiempo (horas) tomó cada
   paso del funnel por abogado, remite esa pieza a `facturacion-horas-co` en
   vez de estimarla aquí.

## Cuándo usar esta skill

Cuando el usuario tenga, para una ventana de tiempo definida, el volumen de
prospectos en cada uno de los pasos del funnel de captación y quiera saber
dónde enfocar el esfuerzo de mejora primero, en vez de repartirlo por igual
entre los cinco pasos.

## Proceso operativo

**Paso 1 — Pide los pasos, el volumen por paso y la ventana de tiempo.**
Confirma los pasos exactos (por defecto, los cinco del CRM del despacho) y
pide el conteo de prospectos que pasaron por cada uno dentro de la ventana
que le importa al usuario (ej. el trimestre, el mes). Si el usuario usa
nombres de estado distintos, pídele el mapeo exacto contra estos cinco antes
de calcular nada.

**Paso 2 — Calcula la conversión por paso.**
Para cada par de pasos consecutivos, calcula (conteo del paso siguiente /
conteo del paso anterior), mostrando la operación. Presenta también la
conversión acumulada desde "Nuevo" hasta "Cliente".

**Paso 3 — Cuantifica el paso más leaky.**
Compara las tasas de conversión entre los cuatro pares de pasos consecutivos
y señala cuál es la más baja, con la diferencia exacta frente a la segunda
más baja (ej. "el paso Contactado → En conversación convierte 25%, 15 puntos
porcentuales por debajo del siguiente peor paso, que convierte 40%").

**Paso 4 — Tres hipótesis sobre la causa de esa fuga.**
Ofrece hasta tres hipótesis concretas y accionables (no genéricas tipo "falta
seguimiento") basadas en el contexto que el usuario dé sobre ese paso —
tiempo de respuesta, calidad del mensaje, calificación previa del prospecto.
Márcalas como hipótesis, no como causa confirmada.

**Paso 5 — Una prueba barata para validar la hipótesis principal.**
Sugiere un experimento de bajo costo y corto plazo (ej. "cambiar el mensaje
de seguimiento en ese paso para 10 prospectos del próximo mes y comparar
conversión contra el resto") que el despacho pueda correr sin inversión
significativa.

**Paso 6 — Benchmark de industria, si se conoce.**
Si el usuario o el conocimiento verificable disponible incluye una referencia
de conversión típica para despachos B2B o servicios profesionales
comparables, inclúyela citando la fuente. Si no hay una fuente confiable,
márcalo explícitamente como no disponible en vez de estimarlo.

## Mini-ejemplo

**Entrada**: funnel de captación de JA Abogados, segundo trimestre 2026
(datos ficticios).

| Paso | Volumen |
|---|---|
| Nuevo | 60 |
| Contactado | 42 |
| En conversación | 18 |
| Propuesta enviada | 12 |
| Cliente | 7 |

**Conversión por paso**:
- Nuevo → Contactado: 42/60 = 70%
- Contactado → En conversación: 18/42 = 43%
- En conversación → Propuesta enviada: 12/18 = 67%
- Propuesta enviada → Cliente: 7/12 = 58%
- Acumulada Nuevo → Cliente: 7/60 = 12%

**Paso más leaky**: Contactado → En conversación, con 43% de conversión, 14
puntos porcentuales por debajo del siguiente paso más débil (Propuesta
enviada → Cliente, 58%). Es el punto donde más pipeline se pierde en
términos relativos: de los 42 contactados, 24 no avanzaron a "En
conversación" (42 − 18 = 24).

**3 hipótesis (no confirmadas)**:
1. El primer mensaje de seguimiento después del contacto inicial tarda
   demasiado en enviarse, y el prospecto pierde interés.
2. El gancho usado en el mensaje de primer contacto genera respuesta pero no
   logra sostener el interés en el segundo intercambio — puede ser un
   problema de la segunda pieza de contenido, no de la primera.
3. Una parte de los "Contactados" corresponde a prospectos de puntaje
   semáforo bajo (naranja/rojo) que nunca debieron pasar de "Nuevo" —
   posible problema de calificación previa, no de seguimiento.

**Prueba barata sugerida**: para los próximos 15 prospectos que lleguen a
"Contactado", enviar el segundo mensaje dentro de las 24 horas siguientes
(en vez del ritmo actual) y comparar la tasa de avance a "En conversación"
contra el resto del trimestre.

**Benchmark de industria**: [no disponible — no se cuenta con una fuente
verificable de tasas de conversión típicas para funnels de servicios legales
B2B en Colombia; no se debe inventar una cifra de referencia sin esa fuente].

## Cierre — límite de esta skill

Esta skill cuantifica la fuga y propone hipótesis y una prueba barata, nunca
decide cambiar el proceso comercial del despacho ni reasigna quién hace el
seguimiento a cada prospecto. Esa decisión es del socio o responsable
comercial, con este análisis como insumo.
