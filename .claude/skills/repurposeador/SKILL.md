---
name: repurposeador
description: Convierte un artículo ya escrito (blog jurídico, LinkedIn Article) en variantes nativas para los canales reales del despacho — post de LinkedIn con ángulo contrario, intro de newsletter "Consulta Jurídica Ejecutiva" y caption de Instagram — manteniendo la voz, los datos y las advertencias de verificación del artículo fuente, sin inventar cifras nuevas. Úsala cuando el usuario pida repurposear un artículo ya escrito, sacar contenido de redes de una pieza larga, o adaptar el blog jurídico o un LinkedIn Article a otros canales del plan de marketing.
---

# Repurposeador — de un artículo a todos los canales

Conviertes una pieza larga ya escrita (blog jurídico o LinkedIn Article del
despacho) en variantes nativas por canal, sin reescribir la tesis ni
inventar datos nuevos — el trabajo de fondo ya está hecho en el artículo
fuente (ver `esqueleto-de-articulo`); esta skill solo lo traduce al
formato de cada canal real del Plan de Marketing Digital (secciones 5 y
9): LinkedIn, newsletter "Consulta Jurídica Ejecutiva", Instagram y, para
X, remite a `arquitecto-de-hilos` en vez de duplicar su lógica.

## Regla de veracidad obligatoria (no negociable)

1. **Ningún dato nuevo**: cada variante debe usar exclusivamente los
   datos, cifras, plazos y ejemplos que ya aparecen en el artículo fuente.
   Si una variante "necesita" un dato adicional para funcionar en el
   formato (ej. una cifra de gancho para el hilo de X), y ese dato no está
   en el artículo fuente, no lo inventes: dilo explícitamente y pide al
   usuario que lo confirme, o ajusta el gancho a un dato que sí esté en la
   fuente.
2. **Las etiquetas de verificación pendiente se heredan, nunca se
   resuelven solas**: si el artículo fuente trae una cita marcada como
   "[verificar antes de publicar — correr `verificacion-citas-co`]" o un
   caso marcado como "[anonimizar]", cada variante que use ese fragmento
   hereda la misma etiqueta. No la quites ni la des por resuelta porque el
   artículo "ya se veía publicado" — si el artículo fuente no pasó aún por
   `verificacion-citas-co`, ninguna de sus variantes cortas puede darse
   por lista para publicar tampoco.
3. **Art. 35 — publicidad veraz**: el ángulo más corto y directo de cada
   variante (el hook del post de LinkedIn, la pregunta de cierre, la
   primera línea del caption) no puede convertir una afirmación matizada
   del artículo fuente en una promesa de resultado. Repurposear no es
   licencia para exagerar lo que el artículo original decía con cuidado.
4. **Art. 28 — confidencialidad**: si el artículo fuente incluye un
   ejemplo de caso real ya anonimizado, cada variante debe mantener
   exactamente el mismo nivel de anonimización, nunca agregar detalles
   "para que suene más real".

## Cuándo usar esta skill

Cuando el usuario ya tenga un artículo completo (blog jurídico, LinkedIn
Article, o incluso el outline de `esqueleto-de-articulo` ya redactado
como borrador) y quiera derivarlo hacia otros canales sin reescribirlo
desde cero.

## Proceso operativo

**Paso 1 — Recibe el artículo fuente y los canales destino.**
Pide el texto completo del artículo (no un resumen del usuario) y qué
canales quiere: por defecto, ofrece las cuatro variantes de esta skill
(LinkedIn, newsletter, Instagram, y remisión a `arquitecto-de-hilos` para
X); si el usuario solo pide una, entrega solo esa.

**Paso 2 — Extrae el material reutilizable.**
Antes de escribir ninguna variante, lista aparte:
- La tesis central del artículo, en una frase.
- 3 a 5 datos o cifras específicas que aparecen en el texto (con su
  etiqueta de verificación si la traen).
- El ejemplo o caso real, si lo hay, con su nivel de anonimización actual.
- El ángulo contrario disponible: qué creencia común contradice el
  artículo (útil para el Paso 3).

**Paso 3 — Genera las variantes pedidas.**
- **X (hilo)**: no la escribas aquí. Entrega la tesis central y los datos
  extraídos del Paso 2 y dile al usuario que invoque `arquitecto-de-hilos`
  con ese material — esa skill ya tiene la lógica completa de gancho,
  ancla de guardado, cuerpo y cierre para hilos.
- **LinkedIn (post de 6 párrafos)**: arranca con el ángulo contrario del
  artículo (no repitas el hook original tal cual, dale una entrada
  distinta), desarrolla en 6 párrafos cortos usando los mismos datos del
  Paso 2, y cierra con una sola pregunta abierta al lector (nunca una
  oferta de venta en la misma línea).
- **Intro de newsletter "Consulta Jurídica Ejecutiva"**: 120 palabras,
  tono conversacional (como si Jorge le escribiera directo a un gerente
  que ya lo conoce), sin subtítulos, que termine con una línea de enlace
  tipo "Lee el análisis completo aquí →". Recuerda que la newsletter
  completa tiene un límite de 500 palabras (sección 9 del plan) — esta
  intro es la puerta de entrada al artículo, no un resumen que reemplace
  la necesidad de leerlo.
- **Caption de Instagram**: exactamente 4 líneas, con un salto de línea
  entre cada una, cada línea una idea que se sostiene sola; la última
  línea es el CTA o el gancho hacia el link en bio, nunca las cuatro
  líneas repitiendo el mismo dato con otras palabras.

**Paso 4 — Matchea la voz original.**
Todas las variantes deben sonar como si las hubiera escrito la misma
persona que escribió el artículo fuente — mismo nivel de formalidad,
mismas expresiones si el artículo tiene alguna característica
reconocible. Si el usuario necesita una consistencia de voz más rigurosa
entre piezas, esa calibración fina es el trabajo de `imitador-de-voz`, no
de esta skill.

**Paso 5 — Entrega con trazabilidad.**
Presenta cada variante rotulada por canal, y al final una lista corta de
qué etiquetas de verificación pendiente (si las hay) se heredaron del
artículo fuente a cuáles variantes.

## Reglas de formato (no negociables)

- Cero em dashes (—). Cero en dashes (–).
- Sin emojis, salvo que el usuario los pida explícitamente.
- Nunca generes la variante de X directamente en esta skill — siempre
  remite a `arquitecto-de-hilos`.
- Cada variante rotulada con un encabezado claro (### LinkedIn, ###
  Newsletter, ### Instagram) para que el usuario pueda copiar cada una
  por separado.

## Mini-ejemplo (artículo del banco de contenido del despacho)

**Artículo fuente** (resumen para el ejemplo): blog jurídico ya redactado
sobre "3 errores que cometen las startups colombianas al firmar contratos
con clientes internacionales" (tema del banco de contenido, sección 9 del
plan). Datos extraídos: (1) el error más común es no pactar la ley
aplicable ni la jurisdicción; (2) el segundo es aceptar el idioma del
contrato del cliente extranjero sin una versión en español con la misma
fuerza vinculante; (3) el tercero es no definir moneda y forma de pago
frente a variación cambiaria. Ángulo contrario: la mayoría cree que el
riesgo está en el precio, y en realidad está en qué juez y qué idioma
deciden si algo sale mal.

```markdown
### LinkedIn (post de 6 párrafos)

La mayoría de fundadores que firman su primer contrato con un
cliente en Estados Unidos revisa el precio con lupa y el resto
del contrato por encima. Ese orden está al revés.

Lo que de verdad decide si un problema se resuelve rápido o se
vuelve un dolor de cabeza de meses no es el valor del contrato.
Es qué juez tiene competencia y en qué idioma se interpreta el
texto si hay una disputa.

El primer error que veo repetirse: no pactar ley aplicable ni
jurisdicción. Sin esa cláusula, un desacuerdo simple puede
terminar discutiéndose primero sobre dónde discutirlo, antes de
discutir el fondo.

El segundo: firmar en el idioma que propone el cliente extranjero
sin una versión en español con la misma fuerza vinculante. Si el
contrato solo existe en inglés, cualquier matiz se interpreta
según ese texto, no según lo que ambas partes creían haber
acordado.

El tercero: no fijar moneda y forma de pago frente a variación
cambiaria. Una startup colombiana que factura en dólares sin esa
cláusula asume un riesgo cambiario que nadie negoció a propósito,
solo por omisión.

¿Cuál de estos tres ya está sin resolver en el contrato que tu
empresa tiene firmado hoy con un cliente en el exterior?

### Intro de newsletter "Consulta Jurídica Ejecutiva"

Este mes hablamos de algo que casi nadie revisa a tiempo: el
contrato con el primer cliente en el exterior. Cuando una startup
colombiana empieza a facturarle a Estados Unidos o Europa, la
atención se va casi toda al precio y casi nada a tres cláusulas
que terminan pesando más si algo sale mal: la ley aplicable, el
idioma con fuerza vinculante y la moneda de pago. Ninguna de las
tres es complicada de resolver antes de firmar. Las tres son
caras de resolver después. Te cuento qué mirar primero y cómo
una revisión de 20 minutos puede evitarte un problema de meses.
Lee el análisis completo aquí →

### Instagram (caption, 4 líneas)

El precio no es lo que más arriesgas en un contrato internacional.

Es no saber qué juez decide si algo sale mal.

3 errores que veo repetirse en contratos con clientes en el exterior.

Guárdalo antes de firmar el siguiente.

---
Etiquetas heredadas del artículo fuente: ninguna cita normativa
pendiente de verificar en este artículo; sin ejemplo de caso real,
no aplica anonimización.
```

## Cierre — límite de esta skill

Esta skill nunca escribe el hilo de X (eso es trabajo de
`arquitecto-de-hilos`) ni publica ni programa nada en ninguna plataforma.
Cualquier etiqueta de verificación pendiente heredada del artículo fuente
debe resolverse (con `verificacion-citas-co` si aplica) antes de publicar
cualquier variante, y cualquier caso real debe seguir anonimizado según el
Art. 28 en todas las variantes por igual. La decisión de qué tanto
simplificar un matiz legal al pasarlo a formato corto, y la
responsabilidad por lo que el despacho afirma en cada canal bajo la Ley
1123 de 2007, es siempre del abogado que publica bajo su nombre.
