# Demo de subagentes de Claude Code — jacabogados

Este directorio es una demo funcional (no un artículo) de cómo usar
subagentes en Claude Code, aplicada al propio proyecto **jacabogados**
(gestión de casos para despachos de abogados). Reproduce, con código y
resultados reales, las dos formas de crear subagentes y los dos usos más
frecuentes: **investigar** y **diseñar**.

## Las dos formas de crear subagentes

### 1. Al vuelo (ad hoc)

No hace falta configurar nada: el agente principal decide que una tarea
encaja como subagente, abre una sesión con contexto en blanco, le pasa el
encargo y solo recoge el resultado. Es lo que se usó para generar todo lo
que hay en `demo/` (ver más abajo).

### 2. Personalizados (reutilizables)

Se definen una vez como archivos en `.claude/agents/` y quedan disponibles
en cualquier sesión futura sobre este repo, seleccionables con `/agents` o
invocables por nombre:

- [`.claude/agents/investigador.md`](../.claude/agents/investigador.md) —
  solo lectura y búsqueda (`Read, Grep, Glob, WebSearch, WebFetch`).
  Explora una pregunta concreta y devuelve señal, no el proceso.
- [`.claude/agents/disenador-ui.md`](../.claude/agents/disenador-ui.md) —
  solo escritura (`Write`). Genera una única opción de UI por invocación,
  pensada para lanzarse varias veces en paralelo con enfoques distintos.

La pieza que de verdad importa en cada archivo es `description`: es lo que
Claude lee para decidir cuándo delegar en ese subagente sin que se lo pidas
explícitamente.

## Ejecución real 1 — Investigar (señal contra ruido)

Se lanzaron **3 subagentes en paralelo**, cada uno mirando una faceta
distinta y sin verse entre sí:

1. Stack técnico recomendado.
2. Cumplimiento legal y protección de datos (RGPD/LOPDGDD, secreto
   profesional del abogado).
3. Funcionalidades base del MVP.

Cada uno devolvió un resumen corto con una conclusión al final. El
orquestador (este agente) nunca vio el proceso de búsqueda de ninguno,
solo la señal ya filtrada. Resultado combinado:
[`demo/informe-investigacion.md`](demo/informe-investigacion.md).

## Ejecución real 2 — Diseñar (varias opciones en paralelo)

Se lanzaron **3 subagentes en paralelo**, cada uno con instrucciones para
diseñar la pantalla de login de jacabogados de una forma deliberadamente
distinta a las demás:

- **Opción A** — corporativo clásico (azul marino, tarjeta centrada).
- **Opción B** — SaaS moderno (panel dividido, acento esmeralda-violeta).
- **Opción C** — modo oscuro tipo dashboard técnico (acentos dorado,
  balanza de la justicia en SVG).

Verlas juntas: abrir [`demo/index.html`](demo/index.html) en un navegador
(las tres se cargan en iframes, lado a lado). Cada opción también es un
archivo HTML independiente y autocontenido en `demo/`.

Flujo pensado para producción: se elige una opción, se piden 4-5 variantes
parecidas a esa (no iguales), se itera un par de rondas más, y solo
entonces se lleva ese resultado final al código real de la app. Los HTML de
`demo/` son desechables — sirven para decidir, no para desplegar.

## Nota sobre esta sesión

Los subagentes personalizados definidos aquí (`investigador`,
`disenador-ui`) quedan guardados en el repo, pero el selector de tipos de
esta sesión concreta ya se había cargado antes de crear los archivos, así
que la ejecución real de arriba se hizo con el agente genérico
(`general-purpose`) pasándole las mismas restricciones por prompt. En una
sesión nueva sobre este repo, `/agents` los mostrará directamente
disponibles por nombre.
