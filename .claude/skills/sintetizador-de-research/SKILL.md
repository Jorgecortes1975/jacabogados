---
name: sintetizador-de-research
description: Comprime varios archivos o informes de research (sectoriales, de due diligence, regulatorios) en una recomendación accionable de máximo 400 palabras, atada a la decisión concreta que el despacho está tomando — extrae las afirmaciones más fuertes, marca contradicciones entre fuentes, cita cada dato y cierra con una frase de recomendación. Úsala cuando el usuario pida resumir varios informes antes de una decisión, comprimir research de due diligence en una recomendación, o sintetizar lecturas dispersas en una sola conclusión accionable.
---

# Sintetizador de research

Antes de una decisión de negocio (aceptar o no un mandato de M&A, entrar o no a un nuevo pilar de servicio, asesorar a un cliente sobre un mercado que no conoce a fondo), el despacho suele acumular varios informes, artículos y fuentes dispersas. Esta skill los comprime en una sola recomendación accionable — sin perder la atribución de cada dato.

## Regla de veracidad obligatoria (no negociable)

1. **Cada claim de la síntesis lleva la atribución a la fuente exacta de la que salió** (nombre del archivo/link y, si aplica, la sección o página). Nada se presenta como conclusión propia si en realidad viene de una sola fuente sin contraste.
2. **Nunca inventes un dato para llenar un hueco del análisis.** Si las fuentes entregadas no cubren un punto necesario para la decisión, dilo explícitamente ("las fuentes entregadas no cubren X") en vez de completarlo con una cifra o afirmación plausible.
3. **Si el usuario no entregó los archivos/links reales y solo describió el research de memoria, dilo explícitamente** — esta skill sintetiza fuentes que puede examinar, no reconstruye contenido que no tiene delante.
4. **Toda cifra de mercado o estadística sin fuente primaria clara en el material entregado se marca como "no verificada en las fuentes provistas"**, nunca como dato confirmado.

## Cuándo usar esta skill

Cuando el usuario tenga varias fuentes de research (archivos, links, informes) y una decisión concreta pendiente que esa lectura debe informar — por ejemplo, un cuarto de datos de due diligence de M&A, varios informes sectoriales antes de recomendar la entrada a un nuevo mercado, o research de comparado antes de asesorar a un cliente extranjero.

## Proceso operativo

**Paso 1 — Pide las fuentes y la decisión.**
Pide los archivos o links exactos (no un resumen verbal de lo que dicen) y la decisión concreta que el usuario está tomando, en una frase ("¿aceptamos representar a X en la adquisición de Y?", "¿invertimos en contenido para el pilar de compliance financiero este trimestre?").

**Paso 2 — Extrae las 3 afirmaciones más fuertes en todas las fuentes.**
No las 3 más repetidas — las 3 que, si son ciertas, más cambian la decisión. Cada una con su atribución exacta.

**Paso 3 — Anota contradicciones entre fuentes, explícitas.**
Si dos fuentes dicen cosas distintas sobre el mismo punto, repórtalo como contradicción abierta — nunca elijas en silencio cuál fuente "tiene razón" sin decir que había una discrepancia y por qué te inclinas por una (si te inclinas).

**Paso 4 — Extrae 5 datos específicos con atribución.**
Cifras, fechas, nombres, montos — cada uno con la fuente exacta de la que salió.

**Paso 5 — Identifica la opinión consenso y la opinión contraintuitiva.**
Qué dicen la mayoría de las fuentes, y qué dice la fuente (si alguna) que se aparta del consenso, con su propia justificación.

**Paso 6 — Cierra con una frase de recomendación atada a la decisión.**
Una sola frase, directamente conectada a la decisión concreta del Paso 1 — no una conclusión genérica sobre el tema.

**Tope de 400 palabras para toda la síntesis.** Cita cada claim.

## Mini-ejemplo (due diligence antes de una adquisición)

**Fuentes entregadas**: memo laboral interno (`memo-laboral-adquirente.pdf`), informe financiero del target (`estados-financieros-target-2025.pdf`), un artículo de prensa económica sobre el sector (`articulo-sector-logistica.pdf`).

**Decisión**: "¿recomendamos a nuestro cliente seguir adelante con la adquisición de la empresa de logística, o pedir ajuste de precio antes de firmar?"

**Síntesis (formato, tope 400 palabras)**:

> Las 3 afirmaciones más fuertes: (1) el memo laboral interno señala pasivo estimado por contrato realidad no provisionado en el target (`memo-laboral-adquirente.pdf`, sección 2); (2) los estados financieros muestran caída de margen operativo de 8 puntos en el último año (`estados-financieros-target-2025.pdf`, p. 4); (3) el artículo de prensa reporta consolidación acelerada del sector logístico con presión de precios (`articulo-sector-logistica.pdf`).
>
> Contradicción abierta: el memo laboral interno estima el pasivo como "significativo", mientras los estados financieros del target no muestran ninguna provisión para contingencias laborales — esta discrepancia no está resuelta por las fuentes entregadas y debe aclararse directamente con el target antes de cerrar.
>
> 5 datos con atribución: [aquí van los 5 datos concretos extraídos, cada uno con archivo y página/sección — no se completan en este mini-ejemplo de formato porque no se cargaron los archivos reales en esta sesión].
>
> Consenso: el sector está en consolidación con presión de precios. Contraintuitivo: el memo laboral sugiere que el riesgo real no es el precio de la operación sino el pasivo oculto no provisionado — que además "estimador-de-mercado" o `due-diligence-ma-co` deberían dimensionar en pesos con las mismas fuentes.
>
> **Recomendación**: no seguir adelante sin resolver la contradicción sobre el pasivo laboral — pedir al target la provisión documentada o ajustar el precio antes de firmar.

**Nota de honestidad**: los "5 datos con atribución" no se completaron en este mini-ejemplo porque los archivos no estaban realmente cargados en esta sesión — la skill lo dice explícitamente en vez de inventar cifras de un memo que no existe.

## Cierre — límite de esta skill

Esta skill comprime y organiza research existente; no genera datos nuevos, no reemplaza al revisor especializado de cada área (para M&A, ver `due-diligence-ma-co`), y no toma la decisión de negocio. La recomendación final que entrega es un insumo para que el socio decida, no la decisión misma.
