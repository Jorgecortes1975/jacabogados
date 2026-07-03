---
name: pipeline-de-lectura
description: Procesa el backlog de lectura acumulado de boletines jurídicos, doctrina, jurisprudencia reciente y artículos de negocio que Jorge Cortés guarda para leer después, y por cada pieza entrega resumen de una línea, 3 takeaways con cita o referencia puntual, y una etiqueta de acción (APLICA/COMPARTE/ARCHIVA/IGNORA) con la acción concreta correspondiente. Úsala cuando el usuario pida vaciar su backlog de lectura, procesar los artículos o boletines que guardó para leer después, o decidir qué hacer con la jurisprudencia reciente que acumuló.
---

# Pipeline de lectura — vaciar el backlog sin perder el valor

Jorge Cortés guarda boletines de jurisprudencia, doctrina, artículos de
negocio y newsletters de competidores "para leer después", y como
cualquier abogado-operador, casi nunca vuelve. Esta skill vacía ese
backlog de forma sistemática: cada pieza sale con una decisión concreta —
aplicarla, compartirla, archivarla o ignorarla — nunca vuelve a la pila
de "pendiente".

## Regla de veracidad obligatoria (anti-alucinación)

1. **Nunca inventes el contenido de un artículo que no fue provisto.** Si
   el usuario solo da una URL sin pegar el texto y no hay forma de
   acceder a ese contenido, dilo explícitamente: "no puedo procesar esta
   pieza sin su texto" — no generes un resumen plausible basado en el
   título o en lo que "probablemente dice" un artículo con ese nombre.
2. **Los 3 takeaways deben anclarse a una cita, timestamp o referencia
   textual puntual del material entregado**, nunca a una paráfrasis
   genérica que podría aplicar a cualquier artículo del tema. Si el
   material no da para 3 takeaways sustentados, entrega los que sí den y
   dilo — no rellenes el tercero con relleno.
3. **No inventes metas, clientes o proyectos del despacho al sugerir la
   acción APLICA o COMPARTE.** Si sugieres compartir con "un cliente
   relevante", debe ser un cliente o segmento que el usuario ya haya
   mencionado o que sea evidente del propio contenido (ej. un artículo
   sobre compliance financiero aplica a clientes fintech reales del
   portafolio), nunca una invención de a quién le podría interesar.

## Cuándo usar esta skill

Cuando el backlog de lectura (bandeja de "guardado para después",
carpeta de PDFs, hilo de WhatsApp con links, o carpeta de boletines sin
abrir) ya pesa más de lo que Jorge puede procesar artículo por artículo
sin un criterio de corte.

## Proceso operativo

**Paso 1 — Pide la lista completa.**
URLs, archivos o textos guardados. Si algún ítem no trae texto y no es
accesible, márcalo aparte como "sin contenido disponible — no procesado"
en vez de omitirlo silenciosamente.

**Paso 2 — Skim test de 30 segundos por pieza.**
¿Tiene un punto claro en el título o primer párrafo? ¿El autor o la
fuente son identificables? ¿Hay contenido real disponible? Si una pieza
falla el skim test, pregúntale al usuario si igual quiere que se procese
a fondo o se descarte directo — no la proceses a fondo por default solo
porque la guardó.

**Paso 3 — Por cada pieza que pasa el skim test:**
- **Resumen de 1 línea.**
- **3 takeaways**, cada uno con su cita, timestamp o referencia textual
  puntual (no parafraseo genérico).
- **Etiqueta de acción**:
  - **APLICA** — acción concreta con fecha límite (ej. "actualizar la
    cláusula de fuerza mayor de la plantilla de contrato de suministro
    antes del viernes").
  - **COMPARTE** — a quién y por qué: un cliente relevante (mencionado
    de forma anonimizada si el ejemplo sale del despacho) o como insumo
    para el banco de contenido, remitiendo a `mapeador-de-tendencias` (si
    es una tendencia regulatoria naciente) o a `esqueleto-de-articulo`
    (si ya está listo para convertirse en pieza propia).
  - **ARCHIVA** — al banco de conocimiento interno del despacho, remitiendo
    a `gestion-conocimiento-co` si aplica como precedente reutilizable.
  - **IGNORA** — no aporta valor accionable ni de contenido; se descarta.

**Paso 4 — Tabla consolidada final.**
Una fila por pieza, en el orden en que se procesó, para que el usuario
vea de un vistazo cuánto backlog realmente valía la pena.

## Reglas de formato

- Una fila o bloque por pieza, nunca agrupes varias piezas distintas bajo
  un solo resumen aunque sean del mismo tema.
- La columna/campo de takeaways nunca queda vacía ni con relleno genérico
  ("tiene información relevante") — si no hay takeaway sustentado, se
  reduce a los que sí hay.

## Mini-ejemplo

**Backlog entregado por Jorge (3 piezas):**

1. Boletín de la Corte Constitucional resumiendo una sentencia reciente
   sobre estabilidad laboral reforzada por debilidad manifiesta, con el
   texto completo pegado.
2. Artículo de una revista de negocios sobre inversión extranjera en
   Antioquia en 2026, con el texto pegado.
3. Un link a un newsletter de un despacho competidor sin texto pegado ni
   acceso disponible.

**Procesamiento:**

| Pieza | Resumen (1 línea) | Takeaways | Etiqueta | Acción |
|---|---|---|---|---|
| Sentencia sobre estabilidad laboral reforzada | La Corte reitera que la presunción de despido discriminatorio aplica aunque el empleador no conociera formalmente el diagnóstico, si existían señales objetivas de la condición de salud. | 1) "no se exige conocimiento formal, basta que existieran elementos objetivos que permitieran inferirlo" (cita textual del extracto). 2) Reitera la carga de la prueba en cabeza del empleador para desvirtuar la presunción. 3) Aplica también a incapacidades reiteradas, no solo a discapacidad certificada. | **APLICA** | Revisar la plantilla de checklist de terminaciones que usa `auditoria-laboral-co` antes del viernes, para incluir el criterio de "señales objetivas" y no solo diagnóstico formal. |
| Inversión extranjera en Antioquia 2026 | Reporta un aumento de fondos de EE. UU. y España mirando fintech y agroindustria en Antioquia. | 1) Cifra de inversión reportada para el sector fintech (cita del artículo). 2) Menciona Medellín como "hub secundario" tras Bogotá para inversión extranjera. 3) Cita a un gremio local sobre el crecimiento esperado para 2027. | **COMPARTE** | Insumo para `mapeador-de-tendencias` — posible tema de contenido para el pilar de Asesoría a Empresas Extranjeras; también compartible (de forma anonimizada si se usa como ejemplo) con un prospecto fintech del Grupo A del CRM. |
| Newsletter del competidor | — | — | Sin procesar | Sin contenido disponible — no se puede resumir ni etiquetar sin el texto. Pide el texto o descarta. |

## Cierre — límite de esta skill

Esta skill no decide por su cuenta qué norma sigue vigente ni evalúa la
calidad jurídica del contenido leído — solo lo organiza en una decisión
accionable. Si una pieza va a convertirse en contenido público o en un
memo interno, pasa por las skills correspondientes (`esqueleto-de-articulo`,
`mapeador-de-tendencias`, `gestion-conocimiento-co`) antes de publicarse o
archivarse formalmente.
