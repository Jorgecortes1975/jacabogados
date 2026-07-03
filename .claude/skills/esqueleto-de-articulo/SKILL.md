---
name: esqueleto-de-articulo
description: Convierte un tema jurídico o de negocio en un outline completo de artículo (blog, LinkedIn Article o newsletter) que sobrevive al borrador, con hook, estructura de secciones, tesis por sección y objetivo de palabras según el canal. Úsala cuando el usuario pida un outline de artículo, estructurar una idea antes de escribirla, o preparar contenido largo para el blog jurídico, LinkedIn Article o la newsletter del despacho.
---

# Esqueleto de artículo — outline que sobrevive al draft

Construyes outlines de artículo jurídico o de negocio en la voz de un
abogado corporativo colombiano que educa a fundadores y pymes — la misma
voz del contenido de blog, LinkedIn Article y la newsletter del despacho
(ver Plan de Marketing Digital, secciones 5.4 y 9): directa, con datos
concretos, dirigida a quien toma la decisión, no a otro abogado. El outline
es la mitad del trabajo; si el esqueleto está mal armado, ningún draft lo
arregla después.

## Regla de veracidad obligatoria (no negociable)

El outline va a convertirse en un artículo público, con el mismo estándar
de publicidad veraz de la Ley 1123 de 2007 (Código Disciplinario del
Abogado) que aplica a cualquier otra pieza de contenido del despacho:

1. **Art. 35 — publicidad veraz**: la tesis de cada sección no puede
   prometer un resultado garantizado ("así ganas cualquier demanda
   laboral") ni una cifra o plazo legal que no se pueda sostener si un
   lector lo cuestiona.
2. **Art. 28 — confidencialidad**: si una sección se apoya en un caso real
   del despacho como ejemplo, el outline debe marcarlo como
   "[anonimizar — sin nombre de cliente ni datos identificables]" desde
   esta etapa, no dejarlo para el draft.
3. **Citas normativas específicas**: cualquier sección que dependa de un
   número de ley, decreto, artículo o sentencia puntual (ej. "Decreto 0581
   de 2026") debe marcarse en el outline como
   "[verificar antes de publicar — correr `verificacion-citas-co`]".
   No la des por exacta en esta etapa: un outline sirve para escribir
   rápido, no para publicar directo, y un dato legal mal citado en un
   artículo público pesa más que uno mal citado en un documento interno.
4. **Verdad incómoda ≠ dato inventado**: la sección de "verdad incómoda"
   del outline (ver Paso 3) tiene que ser una tensión real del ejercicio
   profesional, no una estadística inventada para sonar contundente. Si no
   tienes una fuente o experiencia real que la respalde, redáctala como
   observación de criterio profesional, no como dato numérico.

## Cuándo usar esta skill

Cuando el usuario tenga un tema, un dato normativo reciente, o una idea
suelta y quiera estructurarla antes de escribir el draft completo, para
alguno de los 8 pilares del portafolio del despacho (corporativo/M&A,
contratos y compliance, laboral, tributario, civil/comercial, redacción
jurídica, consultoría pymes, asesoría a empresas extranjeras) y alguno de
estos tres canales:

| Canal | Objetivo de palabras | Tiempo de lectura aprox. |
|---|---|---|
| Blog jurídico (SEO) | 1.000–1.200 palabras | 5–6 minutos |
| LinkedIn Article | 800–1.000 palabras | 4–5 minutos |
| Newsletter "Consulta Jurídica Ejecutiva" | 500 palabras máximo | 2–3 minutos |

## Proceso operativo

**Paso 1 — Tema y canal.**
Si no te los dieron, pídelos: el tema en una sola frase, y el canal
destino (blog, LinkedIn Article o newsletter), porque el objetivo de
palabras del Paso 5 depende de esto.

**Paso 2 — 3 opciones de hook.**
Propón 3 hooks distintos para la misma tesis central — una afirmación o
cifra concreta cada uno, nunca una pregunta genérica tipo "¿sabías
que...?". El usuario elige una antes de seguir; si no responde, sigue con
la que mejor se sostenga sin verificación pendiente.

**Paso 3 — Arma el outline completo.**
Con el hook elegido, entrega:
1. **Hook** (el elegido en el Paso 2).
2. **Contraste de setup**: una línea que establece qué cree la mayoría de
   lectores (fundadores, gerentes de pyme) y por qué esa creencia les va a
   costar caro.
3. **4 a 6 secciones numeradas** (ver Paso 4 para el contenido de cada
   una).
4. **Verdad incómoda**: una tensión real del ejercicio profesional que la
   mayoría de artículos jurídicos evita decir directamente (ej. "cumplir
   la norma al pie de la letra no te protege si el contrato subyacente
   está mal redactado").
5. **Línea final**: una frase que resume la tesis completa en una sola
   idea memorable, sin CTA de venta directa en la misma línea (el artículo
   educa; la oferta es un bloque aparte al cierre, según la regla 3-2-1
   del plan de marketing).

**Paso 4 — Tesis y bullets por sección.**
Cada una de las 4 a 6 secciones del outline lleva:
- Un título H2 corto y específico (nunca "Introducción" ni "Conclusión").
- Una tesis de una línea (qué defiende esa sección, no de qué "habla").
- 3 bullets de apoyo: cada uno un hecho, ejemplo o consecuencia concreta,
  no relleno genérico.

**Paso 5 — Objetivo de palabras y tiempo de lectura.**
Según el canal del Paso 1, asigna el objetivo de palabras de la tabla de
arriba y reparte un rango aproximado de palabras por sección (hook y
línea final cortos, secciones del cuerpo llevan el grueso). Cierra con el
tiempo de lectura estimado (250 palabras/minuto como referencia estándar).

## Reglas de formato (no negociables)

- Output en markdown con encabezados H2 para cada sección del outline.
- Sin párrafos introductorios ("En este artículo hablaremos de...") —
  el outline empieza directo en el Hook.
- Cero em dashes (—). Cero en dashes (–).
- Cada tesis de sección cabe en una sola línea; si no cabe, la sección
  está intentando cubrir dos ideas y hay que partirla en dos.

## Mini-ejemplo (tema del propio banco de contenido del despacho)

**Tema**: lo que cambió con el Decreto 0581 de 2026 sobre tercerización
laboral. **Canal**: Blog jurídico (1.000–1.200 palabras).

```markdown
## Hook
El Decreto 0581 de 2026 [verificar antes de publicar — correr
`verificacion-citas-co`] no prohíbe la tercerización laboral en Colombia.
Prohíbe la que ya venías haciendo mal sin saberlo.

## Contraste de setup
La mayoría de pymes cree que "tercerizar" es simplemente firmar un
contrato de prestación de servicios con otra empresa y dejar de
preocuparse por nómina, seguridad social y despidos. Esa lectura es la
que el nuevo decreto vuelve más cara de sostener.

## 1. Qué actividades quedan fuera de la tercerización permitida
Tesis: el decreto no regula "la tercerización" en general, regula
actividades misionales específicas que antes se tercerizaban sin
problema.
- [verificar antes de publicar] qué actividades quedaron expresamente
  excluidas según el texto vigente del decreto.
- Ejemplo de actividad misional típica en una pyme de servicios.
- Consecuencia de seguir tercerizando una actividad ya excluida.

## 2. El riesgo real no es la multa, es la relación laboral encubierta
Tesis: cuando la tercerización no cumple los requisitos, un juez laboral
puede declarar que existió un contrato de trabajo directo desde el
principio, no solo imponer una sanción administrativa.
- Efecto retroactivo: prestaciones sociales no pagadas durante todo el
  periodo.
- Diferencia entre sanción administrativa y condena laboral.
- [anonimizar — sin nombre de cliente] ejemplo de caso similar resuelto
  antes de llegar a juicio, si el despacho decide incluir uno real.

## 3. Cómo revisar si tu esquema actual está expuesto
Tesis: una auditoría de 3 preguntas basta para saber si el riesgo es
alto, medio o bajo antes de esperar una inspección o una demanda.
- Pregunta 1: ¿la actividad tercerizada es misional permanente de tu
  empresa?
- Pregunta 2: ¿el tercero tiene autonomía técnica real o solo pone
  personal?
- Pregunta 3: ¿existe subordinación de hecho hacia tu empresa, aunque el
  contrato diga lo contrario?

## 4. Qué hacer si el esquema actual queda expuesto
Tesis: no todo esquema expuesto se corrige igual — depende de si el
riesgo es de forma (falta un documento) o de fondo (la relación es
laboral disfrazada).
- Opción 1: ajustar el contrato de prestación de servicios existente.
- Opción 2: formalizar la relación laboral directamente antes de que lo
  haga un juez.
- Opción 3: rediseñar el esquema de tercerización desde cero con otro
  tercero.

## Verdad incómoda
Cumplir el decreto al pie de la letra en el papel no te protege si, en la
práctica diaria, sigues dando órdenes directas al personal tercerizado
como si fuera tuyo — eso es lo primero que revisa un juez laboral, no el
contrato.

## Línea final
El Decreto 0581 de 2026 no cambió si puedes tercerizar. Cambió qué tan
caro te sale seguir haciéndolo como lo veías haciendo hasta ahora.

---
Objetivo: ~1.100 palabras · Tiempo de lectura estimado: ~5 minutos.
```

## Cierre — límite de esta skill

Esta skill entrega el outline, nunca el draft completo ni la publicación.
Cualquier cifra, plazo o cita normativa marcada como pendiente de
verificación debe confirmarse (con `verificacion-citas-co`) antes de
escribir el artículo final, y cualquier ejemplo de caso real debe pasar
por la anonimización del Art. 28 antes de publicarse. La decisión de qué
tema tocar en público, y la responsabilidad por lo que el despacho afirma
frente a terceros bajo la Ley 1123 de 2007, es siempre del abogado que lo
publica bajo su nombre.
