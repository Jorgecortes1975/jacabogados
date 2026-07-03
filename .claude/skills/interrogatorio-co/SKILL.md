---
name: interrogatorio-co
description: Diseña cuestionarios de interrogatorio de parte, testimonio (directo y contrainterrogatorio) e interrogatorio de perito para audiencias en procesos judiciales colombianos, ligando cada pregunta al motor de hechos (probado/afirmado/inferido/controvertido/perjudicial/por probar) y a la técnica correcta según el tipo de declarante. Úsala cuando el usuario pida preparar un interrogatorio de parte, armar el contrainterrogatorio de un testigo de la contraparte, redactar preguntas cerradas para audiencia, o construir el cuestionario de interrogatorio a un perito.
---

# Diseñador de interrogatorios para audiencia (Colombia)

Un interrogatorio mal diseñado desperdicia la única oportunidad de fijar un
hecho en audiencia o expone al abogado a una respuesta que no puede
controlar. Esta skill construye el cuestionario — pregunta por pregunta,
ligada al hecho que busca fijar o a la contradicción que busca exponer —
antes de entrar a la sala. No reemplaza el criterio del litigante en vivo.

## Regla de veracidad obligatoria (no negociable)

1. **Nunca se inventan hechos, pruebas, declaraciones previas o antecedentes
   del caso** que el usuario no haya aportado en la conversación. Si falta
   un hecho, una prueba o el contenido exacto de una declaración previa que
   la pregunta necesita para anclarse, se marca `[DATO NO SUMINISTRADO]` y
   se pide antes de redactar esa pregunta — no se rellena con un supuesto
   razonable.
2. **Ninguna pregunta puede dar por probado un hecho que el motor de hechos
   clasificó como "controvertido" o "por probar"**. La pregunta debe estar
   diseñada para *probar* ese hecho (o para exponer que la contraparte no
   puede sostenerlo), nunca para asumirlo ya establecido. Una pregunta como
   "¿por qué usted incumplió el contrato?" da por probado el incumplimiento
   antes de que exista prueba de él — está prohibida mientras ese hecho siga
   en "controvertido" o "por probar".
3. **Distinguir siempre el tipo de declarante y no mezclar sus reglas**:
   - **Interrogatorio de PARTE** (a la contraparte): se permiten preguntas
     asertivas/sugestivas dirigidas a obtener confesión, formuladas de modo
     que solo admitan sí/no o un dato puntual.
   - **Interrogatorio DIRECTO de testigo propio**: las preguntas sugestivas
     están limitadas — se prefieren preguntas abiertas que dejen narrar al
     testigo con sus propias palabras.
   - **Contrainterrogatorio de testigo de la contraparte**: se permiten
     preguntas cerradas/sugestivas para controlar la respuesta y exponer
     contradicciones.
   - **Interrogatorio a perito**: combina preguntas cerradas sobre la
     metodología y los datos del dictamen (para fijar lo verificable) con
     preguntas dirigidas a exponer los límites o supuestos no sustentados
     del peritaje — nunca se asume que una conclusión pericial es correcta
     solo porque viene de un perito.
   Aplicar la técnica equivocada al tipo de declarante equivocado (por
   ejemplo, preguntas sugestivas al propio testigo en directo) es un defecto
   que esta skill debe señalar y corregir, no reproducir.
4. **Todo artículo específico del Código General del Proceso o del Código de
   Procedimiento Penal que no se verifique contra fuente oficial en esta
   sesión se marca `[REFERENCIA NO VERIFICADA]`** — nunca se cita un número
   de artículo de memoria sin esa marca.

## Cuándo usar esta skill

Antes de una audiencia donde el usuario va a interrogar a la contraparte
(interrogatorio de parte), a su propio testigo (directo), al testigo de la
contraparte (contrainterrogatorio), o a un perito — y necesita el
cuestionario preparado con antelación, no improvisado en la sala.

## Proceso operativo

**Paso 1 — Identifica el tipo de interrogatorio y el estado de cada hecho.**
Pregunta (si no está dado): ¿el declarante es la contraparte (parte),
testigo propio, testigo de la contraparte, o perito? Para cada hecho que el
usuario quiera abordar, ubícalo en una de las 7 categorías del motor de
hechos de `protocolo-control-antialucinacion-co`
(`references/fase3-6-hechos-pruebas-normas-jurisprudencia.md`): probado,
afirmado (sin prueba suficiente), inferido, controvertido, perjudicial, por
probar, irrelevante. Las preguntas prioritarias son las que buscan mover un
hecho **controvertido** o **por probar** hacia **probado**, o las que
exponen la debilidad de un hecho que la contraparte solo **afirmó** sin
soporte.

**Paso 2 — Para interrogatorio de PARTE o CONTRAINTERROGATORIO: construye
preguntas cerradas efectivas.**
- Una premisa fáctica por pregunta (nunca dos hechos compuestos en la misma
  pregunta).
- Formulada de modo que solo admita sí/no o un dato concreto (fecha, cifra,
  nombre) — nada que abra espacio a una narrativa.
- Anclada a un hecho o prueba que ya existe en el expediente (documento,
  declaración previa, confesión anterior, testimonio ya rendido). Nunca una
  pregunta "de pesca" sin ancla — si no hay ancla documental o testimonial,
  la pregunta se reformula o se descarta.
- Secuenciada: primero las preguntas que fijan hechos favorables o neutros
  que el declarante difícilmente puede negar, y solo después la pregunta que
  expone la contradicción — nunca al revés, porque alertar la contradicción
  demasiado pronto le da al declarante la oportunidad de matizar las
  respuestas previas.

**Paso 3 — Para interrogatorio DIRECTO de testigo propio: construye
preguntas abiertas.**
Preguntas que dejen narrar al testigo con sus propias palabras ("¿qué
ocurrió después de...?", "¿cómo se enteró de...?"), evitando la
sugestividad. Si una pregunta puede reformularse quitándole la respuesta
implícita, reformúlala. El objetivo es que el relato salga del testigo, no
del abogado.

**Paso 4 — Para interrogatorio a PERITO: combina ambos registros.**
Preguntas cerradas para fijar metodología, datos de entrada y alcance
declarado del dictamen; preguntas dirigidas (no necesariamente abiertas)
para exponer supuestos no verificados, datos faltantes o conclusiones que
exceden lo que la metodología permite sostener.

**Paso 5 — Anota, por cada pregunta, el objetivo probatorio y el riesgo.**
Qué hecho busca fijar o qué contradicción busca exponer, y qué pasa si la
respuesta no sale como se espera — con una repregunta de respaldo lista
para esa contingencia.

**Paso 6 — Remite al control adversarial.**
Antes de dar el cuestionario por terminado, remite a
`protocolo-control-antialucinacion-co` (Fase 9 — Control adversarial) para
anticipar cómo la contraparte podría objetar una pregunta (por ejemplo, por
compuesta, capciosa o irrelevante) o cómo el declarante podría evadirla, y
ajustar la redacción o preparar la reformulación antes de la audiencia.

## Reglas de formato

El cuestionario se entrega siempre en tabla con estas columnas: número,
pregunta, tipo (cerrada/abierta), hecho u objetivo probatorio, riesgo y
repregunta de respaldo. Cada fila debe poder leerse en voz alta tal como
está escrita — sin necesidad de improvisar la redacción en la sala.

## Mini-ejemplo (contrainterrogatorio — proceso laboral, testigo de la contraparte)

**Contexto (hechos aportados por el usuario, caso ficticio)**: proceso
laboral por despido sin justa causa. El testigo de la contraparte (el
empleador) es el jefe directo del extrabajador y va a declarar que el
despido fue por justa causa (abandono del puesto durante tres días). El
usuario aportó: (a) los registros de nómina muestran pago de salario
completo esos tres días; (b) hay un correo del propio testigo, fechado dos
días después del supuesto abandono, pidiéndole al extrabajador que
"retomara" una tarea pendiente; (c) la carta de despido, revisada por el
usuario, no menciona la palabra "abandono" sino "bajo rendimiento".

**Motor de hechos aplicado**: "el extrabajador abandonó el puesto tres
días" → **afirmado** por la contraparte, sin soporte documental aportado
hasta ahora; "el salario de esos tres días fue pagado íntegro" →
**probado** (registro de nómina); "el testigo le escribió pidiéndole
retomar una tarea dos días después del supuesto abandono" → **probado**
(correo); "la carta de despido invoca bajo rendimiento, no abandono" →
**probado** (documento). El cuestionario está diseñado para que el testigo
fije primero los hechos probados y solo al final quede expuesta la
contradicción con lo que acaba de afirmar.

| # | Pregunta | Tipo | Hecho/objetivo probatorio | Riesgo y repregunta de respaldo |
|---|----------|------|---------------------------|----------------------------------|
| 1 | ¿Usted era el jefe directo del señor [extrabajador] en la fecha del despido? | Cerrada | Fija la calidad del testigo como jefe directo, base de credibilidad de lo que sigue | Bajo riesgo — si niega, repreguntar con el organigrama o la carta de despido que lo identifica como firmante |
| 2 | ¿Usted firmó la carta de despido de fecha [fecha]? | Cerrada | Ancla al testigo al documento que se va a confrontar después | Si dice no recordar, exhibir el documento y repreguntar: "¿reconoce su firma en este documento?" |
| 3 | ¿Esa carta invoca como causal "bajo rendimiento" y no "abandono del puesto"? | Cerrada | Fija — con el documento a la vista — que la causal escrita no es la que el testigo acaba de declarar | Si el testigo intenta reinterpretar el texto, repreguntar cerrado: "¿sí o no, el texto dice 'bajo rendimiento'?" |
| 4 | ¿Durante los tres días que usted llama de abandono, la empresa pagó el salario completo del señor [extrabajador]? | Cerrada | Confronta la tesis de abandono con el registro de nómina (probado) — un abandono real normalmente suspende el pago | Riesgo: puede decir que fue un error de nómina — repreguntar si reportó o corrigió ese "error" en algún momento; si no, queda sin explicación |
| 5 | ¿Dos días después de la fecha que usted señala como el último día de abandono, usted le escribió un correo pidiéndole que retomara una tarea pendiente? | Cerrada | Expone la contradicción central: no se le pide "retomar" algo a quien se cree que abandonó el puesto de forma definitiva | Riesgo alto de evasión ("no recuerdo el correo") — tener el correo impreso listo para exhibir y repreguntar sobre el documento directamente |

**Nota de secuencia**: las preguntas 1-2 fijan hechos que el testigo
difícilmente puede negar (su rol, su firma); la 3 y la 4 acercan la
contradicción usando documentos ya en el expediente; la 5 es la pregunta
que expone la contradicción central y se deja para el final, cuando el
testigo ya está anclado a los hechos previos y no puede retractarse de ellos
sin perder credibilidad frente al juez.

## Cierre — límite de esta skill

Esta skill diseña el cuestionario de preparación; nunca ejecuta el
interrogatorio en audiencia ni decide la estrategia probatoria final del
caso. La conducción real frente al juez — el tono, el ritmo, la decisión de
insistir, cambiar de tema o dejar pasar una respuesta evasiva, y cualquier
ajuste táctico en vivo según cómo responda el declarante — es siempre del
abogado litigante presente en la sala.
