---
name: tu-nombre-de-skill
description: [QUÉ hace la skill en una frase + CUÁNDO usarla. Formato recomendado: "Hace X, Y y Z. Úsala cuando el usuario pida [frase 1] o [frase 2]." Esta línea es lo único que Claude ve para decidir si activa la skill — sé específico, no genérico.]
---

# [Nombre legible de la skill]

<!--
GUÍA DE USO DE ESTE TEMPLATE (borra este bloque de comentario antes de subir):
- El frontmatter (name/description) es lo más importante del archivo — es lo
  único que se carga siempre. El cuerpo solo se lee cuando la skill ya se
  activó, así que puede ser largo y detallado sin costo de "siempre presente".
- Sigue el patrón ya validado en .claude/skills/ de este repo: una regla de
  seguridad temprana si la skill puede citar normas/jurisprudencia o generar
  documentos que un tercero podría malinterpretar como definitivos, un
  proceso operativo numerado, un mini-ejemplo con datos ficticios, y un
  cierre explícito de qué decisión NUNCA toma la skill por sí sola.
- Si algún contenido es largo y reutilizable (plantillas, checklists,
  prompts de rol, listados de fuentes), muévelo a references/ y referencia
  el archivo desde aquí en vez de duplicarlo — mantiene este archivo enfocado
  en el proceso, no en el contenido de referencia.
-->

## Regla de seguridad obligatoria (anti-alucinación)

[Completa solo si aplica. Si esta skill puede citar normas, jurisprudencia,
conceptos de una autoridad, o generar un documento que alguien podría usar
sin revisión, copia y adapta el patrón usado en las otras 14 skills:
1. Qué tipo de cita nunca se marca como "verificada" sin advertencia explícita.
2. Qué normas SÍ son de conocimiento tan asentado que se pueden citar con
   confianza, y cuáles necesitan el marcador "[confirmar antes de usar]".
3. Que ningún resultado de esta skill es definitivo — siempre insumo sujeto
   a revisión humana antes de usarse con un cliente o ante una autoridad.
Si la skill no cita fuentes externas ni genera documentos de riesgo (p. ej.
una skill puramente organizativa), borra esta sección.]

## Cuándo usar esta skill

[Describe el escenario concreto en 2-4 frases: qué información de entrada
espera (documento cargado, hechos narrados, datos de un cliente) y qué
entrega produce. Evita descripciones abstractas — sé tan específico como
lo permita el caso de uso real.]

## Instructions / Proceso operativo

[Numera los pasos como una receta ejecutable, no como una descripción de
alto nivel. Cada paso debe decirle a Claude exactamente qué hacer, no solo
qué lograr. Ejemplo de nivel de detalle esperado:

**Paso 1 — [Nombre del paso].**
[Qué se hace exactamente, con qué criterio se decide algo, qué formato
tiene la salida de este paso.]

**Paso 2 — [Nombre del paso].**
...

Si un paso requiere una plantilla larga o un prompt de rol completo, escribe
aquí solo el resumen y pon el texto completo en `references/<archivo>.md`,
referenciándolo explícitamente.]

## Steps (resumen ejecutable de una línea por paso)

[Lista corta, tipo checklist, de los mismos pasos de arriba pero en una
línea cada uno — útil como referencia rápida una vez que el proceso ya se
conoce. No dupliques el detalle, solo el orden.]

1. [Paso 1]
2. [Paso 2]
3. [Paso 3]

## Examples

[Al menos un mini-ejemplo con datos FICTICIOS pero realistas: entrada de
ejemplo → salida de ejemplo. Si la skill produce una tabla, muestra la
tabla con 3-4 filas de ejemplo. Si produce un documento, muestra un
fragmento representativo, no el documento completo si es muy largo (en
ese caso, referencia `references/ejemplo-completo.md`).]

## Troubleshooting

[Casos límite y qué debe hacer Claude cuando pasan — no lo que "debería"
pasar en el caso feliz. Ejemplos de preguntas a responder aquí:
- ¿Qué hace la skill si falta información de entrada (documento no
  cargado, dato no provisto)? → nunca inventar, siempre señalar el vacío.
- ¿Qué hace si dos instrucciones de esta skill entran en conflicto con
  otra skill del despacho (ej. `verificacion-citas-co`)? → cuál prevalece
  y por qué.
- ¿Qué hace si el usuario pide que la skill tome la decisión final que
  esta sección de cierre dice que nunca debe tomar? → recordar el límite
  y ofrecer el insumo, no la decisión.]

## Cierre — límite de esta skill

[Una frase final, explícita, de qué decisión NUNCA toma esta skill por sí
sola y de quién es esa responsabilidad (el abogado responsable, el socio
a cargo, el comité de ética, etc.) — el mismo patrón de cierre que usan
las otras 14 skills de este despacho.]
