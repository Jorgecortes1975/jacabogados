---
name: imitador-de-voz
description: Extrae el perfil de voz de Jorge Cortés a partir de 3 muestras reales de su propia escritura (blog, LinkedIn, newsletter) y lo aplica a contenido nuevo para mantener consistencia de voz entre canales, marcando cualquier desviación en el borrador y sin inventar muletillas o hábitos que las muestras no enseñen. Úsala cuando el usuario pida mantener consistencia de voz entre piezas, escribir contenido nuevo que suene como Jorge, o revisar si un borrador se aleja de la voz habitual del despacho.
---

# Imitador de voz — consistencia entre canales, sin inventar lo que no está en la muestra

La voz del despacho no vive en una guía de estilo, vive en lo que Jorge
Cortés ya escribió — el blog jurídico, los LinkedIn Articles, la
newsletter "Consulta Jurídica Ejecutiva". Esta skill extrae esa voz con
precisión de un conjunto real de muestras y la aplica a una pieza nueva,
para que el lector no note que dos artículos con meses de diferencia los
escribió la misma persona por casualidad y no por método.

## Regla de veracidad obligatoria (anti-alucinación de voz)

1. **Nunca inventes muletillas, tics o hábitos que las muestras no
   enseñan.** Esta es la regla central de toda la skill: si una
   expresión, estructura o hábito de puntuación no aparece al menos una
   vez en las muestras entregadas, no puede aparecer en el brief de voz ni
   en el contenido nuevo, por más "natural" que suene para un abogado
   corporativo colombiano en general. Confundir "cómo escribe un abogado
   corporativo típico" con "cómo escribe Jorge Cortés específicamente" es
   exactamente el tipo de alucinación que esta skill existe para evitar.
2. **Todo patrón identificado debe poder señalarse en la muestra.** Cuando
   el brief de voz (Paso 3) afirme un patrón ("usa preguntas retóricas
   cortas al abrir secciones"), debe poder citarse dónde aparece en al
   menos una de las 3 muestras. Si el patrón solo aparece una vez en una
   sola muestra, márcalo como "patrón débil (una sola aparición)" en vez
   de presentarlo con la misma confianza que un patrón que se repite en
   las 3.
3. **El contenido nuevo no puede inventar hechos ni citas nuevas para
   "sonar más como Jorge".** Imitar la voz es imitar cómo se dice algo,
   nunca es licencia para agregar una cifra, un caso o una cita normativa
   que no venía ya confirmada por el usuario para la pieza nueva.
   Cualquier cita normativa específica en el contenido nuevo sigue la
   regla estándar: "[verificar antes de publicar — correr
   `verificacion-citas-co`]".
4. **Marca cada desviación del brief en el draft final.** Si en algún
   punto del contenido nuevo no fue posible sostener una dimensión del
   perfil de voz (por ejemplo, el tema obliga a una oración más larga de
   lo habitual en la muestra), señálalo explícitamente al final del draft
   — no lo dejes pasar en silencio.

## Cuándo usar esta skill

Cuando Jorge quiera que una pieza nueva (blog, LinkedIn, newsletter) suene
consistente con lo que ya ha publicado, o cuando alguien más del despacho
redacte contenido en su nombre y necesite un brief de voz confiable en
vez de "escribir como te parezca que suena un abogado".

## Proceso operativo

**Paso 1 — Pide 3 muestras reales de la voz objetivo.**
Deben ser piezas completas ya publicadas o ya finalizadas por Jorge
Cortés (idealmente de canales distintos: un post de blog, un LinkedIn
Article, una edición de la newsletter), no fragmentos sueltos ni piezas
editadas por alguien más. Si el usuario solo tiene 1 o 2, dilo
explícitamente: el perfil de voz con menos de 3 muestras es menos
confiable, y hay que marcarlo como tal en el brief.

**Paso 2 — Extrae el perfil de voz.**
Analiza las 3 muestras y registra, con evidencia de dónde aparece cada
patrón:
- Distribución de longitud de oración (predominan cortas, largas, o
  alterna deliberadamente).
- Nivel de vocabulario (técnico jurídico directo, o traducido a lenguaje
  llano para el lector no abogado).
- Densidad de párrafo (párrafos de 1-2 líneas vs. bloques de 4-5 líneas).
- Frases firma o expresiones que se repiten en más de una muestra.
- Hábitos de puntuación (uso de dos puntos, listas, preguntas retóricas,
  paréntesis).
- Patrones de apertura (cómo arrancan los párrafos o piezas).
- Patrones de cierre (cómo termina, si hay una fórmula recurrente de CTA
  o de frase final).

**Paso 3 — Devuelve el brief de voz en 10 bullets.**
Un bullet por dimensión (las 7 de arriba pueden expandirse o combinarse
hasta llegar a 10 si hay suficiente evidencia), cada uno con una cita
textual corta de la muestra que lo respalda. Si una dimensión no tiene
evidencia clara en las 3 muestras, dilo en el bullet en vez de rellenarlo
con una suposición genérica.

**Paso 4 — Pide confirmación del brief.**
Antes de escribir una sola línea de contenido nuevo, entrega el brief y
pide a Jorge que lo confirme o corrija. No avances al Paso 5 sin esa
confirmación, salvo que el usuario explícitamente pida "sigue directo".

**Paso 5 — Redacta el contenido nuevo matcheando cada dimensión
confirmada.**
Usa el brief confirmado como especificación, dimensión por dimensión. Al
entregar el draft, agrega una nota corta de cualquier desviación según el
punto 4 de la Regla de veracidad.

## Reglas de formato (no negociables)

- El brief de voz siempre en 10 bullets numerados, nunca en prosa
  corrida.
- Cada bullet del brief lleva su cita de evidencia entre comillas.
- Cero em dashes (—) en el contenido nuevo si las muestras no los usan
  (si sí los usan, es la única excepción a la regla general de cero em
  dashes del resto de skills del despacho — la fidelidad a la muestra
  manda sobre la regla de formato general).

## Mini-ejemplo (aplicado a un tema del banco de contenido)

**Muestras entregadas**: 2 posts de blog y 1 edición de la newsletter,
todos de Jorge Cortés (contenido real del usuario; en este ejemplo se
resumen sus rasgos en vez de transcribirlos completos).

**Brief de voz (extracto, 5 de 10 bullets por espacio)**:
1. Oraciones predominantemente cortas (12-18 palabras), con una oración
   larga cada 3-4 para variar el ritmo — "constituir una SAS toma un día
   y un documento privado" (muestra 1).
2. Vocabulario técnico jurídico traducido de inmediato a consecuencia
   práctica, nunca dejado sin explicar — "contrato realidad, es decir,
   cuando un juez decide que sí hubo relación laboral aunque el papel
   diga otra cosa" (muestra 2).
3. Párrafos de 2-3 líneas, casi nunca bloques de más de 4.
4. Frase firma recurrente en las 3 muestras: arranca el cierre con "La
   pregunta no es..." seguido de la pregunta que sí importa.
5. Patrón débil (una sola aparición, muestra 2): uso de una lista
   numerada dentro del cuerpo del texto, no solo al final.

**Contenido nuevo aplicando el brief** (tema: auditoría de compliance
laboral para pymes, pilar Laboral y Litigios):

```
Una auditoría de compliance laboral no es un trámite de fin de
año. Es la diferencia entre encontrar un contrato realidad tú
mismo, o que lo encuentre un juez con la sanción ya calculada.

La mayoría de pymes revisa la nómina cuando el contador se lo
pide, no cuando el riesgo lo pide. Eso significa revisar el
papel, no revisar la relación real con cada persona que trabaja
para la empresa.

La pregunta no es si tu empresa tiene el papel en regla. Es si
la relación de trabajo diaria coincide con lo que ese papel dice.
```
*(Nota de desviación: la muestra 2 usaba ocasionalmente una lista
numerada en el cuerpo; en esta pieza no se usó porque el tema no
lo pedía — se prioriza la estructura de párrafos cortos, que es
el patrón fuerte de las 3 muestras.)*

## Cierre — límite de esta skill

Esta skill nunca decide qué contenido nuevo escribir, solo cómo debe
sonar una vez que el tema y los datos ya están definidos. Ningún patrón
de voz se inventa sin evidencia en las muestras entregadas, y ninguna
cita normativa o dato nuevo se agrega al contenido solo para "sonar más
auténtico". La responsabilidad final de que el contenido publicado suene
y sea Jorge Cortés — y de lo que ese contenido afirma frente a terceros
bajo la Ley 1123 de 2007 — es siempre de Jorge Cortés.
