---
name: skill-creator
description: Meta-skill que construye otras Claude Skills nuevas para este despacho de principio a fin — en modo descubrimiento hace 2-3 preguntas sobre el día a día del usuario y propone 2-3 skills candidatas con lo que le enseñarían a Claude y su frase de activación, o en modo directo convierte un archivo de referencia o una descripción del proceso en un SKILL.md completo en el house style de LEXA-LAB (regla de veracidad, cuándo usar, proceso operativo, mini-ejemplo trabajado, cierre), revisa duplicados contra las skills ya instaladas, la instala en .claude/skills/, la valida con validate_skill.py y audit_skills.py, y cierra con una prueba de activación de 5 peticiones. Úsala cuando el usuario pida crear una skill nueva, no sepa qué skill construir y quiera que le ayudes a pensarla, o pida convertir una plantilla, manual o proceso repetido del despacho en una skill de Claude.
---

# Skill Creator — el meta-skill que construye otras skills de LEXA-LAB

Esta skill es la única de las 55+ instaladas en `.claude/skills/` que no resuelve
una tarea jurídica o comercial del despacho: resuelve la construcción de las
demás. Jorge la usa directamente, sin pedirle a otro asistente que orqueste
nada — el proceso completo (pensar la idea, revisar duplicados, escribir el
archivo, instalarlo, validarlo y probar que se activa) vive aquí.

**Origen de este proceso.** Está inspirado en el skill-creator oficial de
Anthropic (`anthropics/skills`, carpeta `skills/skill-creator/`). Se pudo
acceder a su contenido real vía WebFetch (no de memoria): confirma un proceso
de "progressive disclosure" (frontmatter siempre cargado → cuerpo del
SKILL.md bajo ~500 líneas → recursos extra en `references/`, `scripts/`,
`assets/` cargados solo cuando hacen falta — el mismo patrón que ya usan
`verificacion-citas-co`, `gobierno-corporativo-co` y otras 9 skills de este
repo), un ciclo de captura de intención → borrador → casos de prueba →
evaluación → iteración, y un paso final de **optimización de la
description** generando ~20 peticiones de prueba (algunas que deberían
activar la skill, otras que no) para ajustarla hasta que dispare bien. Ese
último paso es exactamente el Paso 8 de abajo ("La prueba"), adaptado a una
escala manual de 5 peticiones en vez de 20, porque este despacho no corre un
harness de evaluación con subagentes ni un visor en navegador — aquí el
"evaluador" es Jorge leyendo la predicción y decidiendo si tiene sentido. La
parte de Anthropic que **no** se trasplantó (el visor HTML `eval-viewer`, la
ejecución paralela con subagentes, el benchmarking cuantitativo) no aplica a
un despacho de un solo abogado-operador construyendo sus propias skills; en
su lugar, esta skill se apoya en las dos herramientas deterministas que ya
existen en este repo: `scripts/validate_skill.py` y `scripts/audit_skills.py`.

## Regla de veracidad obligatoria (no negociable)

El riesgo específico de esta skill no es citar mal una norma — es **producir
una skill nueva que le enseñe a Claude a alucinar** dentro de otra
conversación futura, o que duplique silenciosamente una skill que ya existe.

1. **Nunca inventes el proceso de negocio.** Si el usuario describe una
   tarea del despacho a medias (falta el criterio con que decide algo, falta
   un umbral, falta el formato exacto de un documento o columna de datos),
   pregúntalo antes de escribir el SKILL.md. Una skill nueva construida
   sobre un supuesto inventado no es un ahorro de tiempo, es una fuente
   nueva de errores que se repite cada vez que alguien la invoque.
2. **Nunca omitas la sección de regla de veracidad/seguridad de la skill
   nueva, y nunca la copies genérica.** Cada skill que produzcas debe tener
   su propia regla adaptada al riesgo real de ESA tarea (¿cita normas?
   ¿calcula plazos o vencimientos? ¿genera un documento que un tercero
   podría tomar como definitivo? ¿toca datos de clientes?). Si copias la
   regla de otra skill sin adaptarla, esta skill-creator falló en su único
   trabajo no negociable.
3. **Nunca declares "creada e instalada" sin correr las dos validaciones.**
   `validate_skill.py` (bloqueante: frontmatter, name, description) y
   `audit_skills.py` (estructural: las 5 secciones del house style) deben
   correr y pasar, o el usuario debe ver exactamente qué falló, antes de dar
   la skill nueva por lista.
4. **Nunca asumas que una skill parecida no existe.** Revisa la lista real
   de `.claude/skills/` antes de proponer una skill nueva — 55 nombres caben
   en una sola pantalla, no hay excusa para no mirarlos.

## Cuándo usar esta skill

Cuando el usuario quiera una skill de Claude nueva para el despacho y no
sepa cómo empezar (modo descubrimiento), cuando ya traiga un archivo de
referencia (una plantilla, un manual interno, un ejemplo de documento) y
quiera convertirlo directo en skill, o cuando describa con sus propias
palabras un proceso que repite seguido y quiera que Claude deje de
tener que explicárselo cada vez.

## Proceso operativo

**Paso 1 — Detecta el modo.**
Si el usuario trae una idea concreta, un archivo de referencia, o describe
el proceso con detalle suficiente para escribir un proceso operativo
numerado, ve directo al Paso 3 (modo directo). Si dice algo como "no sé qué
skill pedir", "ayúdame a pensar en una skill", o describe su semana en
general sin pedir nada puntual, entra en modo descubrimiento (Paso 2).

**Paso 2 — Modo descubrimiento.**
Haz 2-3 preguntas concretas sobre su trabajo del día a día — nunca
abstractas tipo "¿qué necesitas?". Buenas preguntas:
- "¿Qué tarea de esta semana no era pensar el derecho de fondo, sino más
  bien seguimiento o administración, y aun así te quitó tiempo?"
- "¿Hay algún documento que redactas casi igual cada vez, cambiando solo
  2-3 datos?"
- "¿Qué se te ha pasado por poco, o te preocupa que se te pase?"

Con las respuestas, propón 2-3 skills candidatas (nunca solo una — dale a
elegir), cada una con: qué le enseñaría a Claude en una frase, y con qué
frase exacta se activaría. Prioriza la que ataque el riesgo más caro
(plata o plazo perdido), no solo la que más tiempo ahorre en minutos.

**Paso 3 — Modo directo (archivo o descripción).**
Si hay un archivo de referencia (plantilla, manual, ejemplo de documento),
léelo completo antes de escribir nada — el proceso operativo de la skill
nueva debe reflejar cómo se hace de verdad, no una versión genérica. Si el
usuario solo describe el proceso de palabra, repítele de vuelta en 2-3
frases qué entendiste antes de escribir el SKILL.md completo, para
confirmar que no falta ningún paso.

**Paso 4 — Chequeo de duplicados.**
Antes de escribir una sola línea del archivo nuevo, corre `ls
.claude/skills/` (o revisa la lista de las 55+ carpetas ya instaladas) y
compara la función propuesta contra skills existentes de categoría
parecida. Si una ya cubre el 80% de la función, dilo explícitamente y
ofrece dos caminos: usar la existente, o ampliarla — nunca crear una
skill nueva que compita en silencio con una que ya existe.

**Paso 5 — Pregunta antes de inventar contenido de negocio.**
Cualquier dato específico del despacho que la skill nueva vaya a necesitar
(umbrales, plazos, formato exacto de una plantilla, columnas de un Excel,
criterio de clasificación) se pregunta explícitamente si no vino dado. Nunca
se completa con un valor razonable "de relleno" — ese valor razonable es
exactamente el tipo de alucinación que este despacho audita en las otras 55
skills.

**Paso 6 — Construye el SKILL.md en el house style obligatorio.**
El archivo nuevo debe tener, siempre, estas piezas (son las mismas 5
secciones que audita `scripts/audit_skills.py`, más el frontmatter que
exige `scripts/validate_skill.py`):

1. **Frontmatter**: `name` en kebab-case puro (sin "claude" ni "anthropic"),
   y `description` de una sola frase larga que combine QUÉ hace + "Úsala
   cuando el usuario pida..." con 2-3 frases gatillo concretas y
   verificables (nunca "úsala para tareas legales" — eso no activa nada),
   bajo 1024 caracteres, sin tags XML/HTML.
2. **Regla de veracidad/seguridad**: adaptada al riesgo específico de ESA
   skill nueva — nunca genérica, nunca copiada de otra skill sin ajustar.
3. **Cuándo usar esta skill**: el escenario concreto de entrada y salida.
4. **Proceso operativo numerado**: pasos ejecutables ("Paso 1 — ...", "Paso
   2 — ..."), no una descripción de alto nivel.
5. **Mini-ejemplo completo y trabajado**: con datos ficticios pero
   realistas, de principio a fin — nunca un placeholder tipo "[ejemplo
   aquí]". Si el ejemplo requiere una plantilla larga, resume aquí y mueve
   el detalle a `references/<archivo>.md`.
6. **Cierre**: una frase explícita de qué decisión NUNCA toma esta skill
   por sí sola, y de quién es esa responsabilidad.

Si el cuerpo se acerca a las 5000 palabras (el umbral de advertencia de
`validate_skill.py`) o a ~500 líneas, mueve el detalle reutilizable
(plantillas largas, checklists extensos, listados) a `references/` dentro
de la misma carpeta de la skill nueva, siguiendo el mismo patrón de
progressive disclosure que ya usan 11 skills de este repo.

**Paso 7 — Instalación real.**
Guarda el archivo en `.claude/skills/<nombre-kebab-case>/SKILL.md`. Nunca
crees un `README.md` dentro de la carpeta de la skill — el único archivo
que Claude lee es `SKILL.md`. Después, dile al usuario que corra, en este
orden:

```
python3 scripts/validate_skill.py --path .claude/skills/<nombre>/SKILL.md
python3 scripts/audit_skills.py --path .claude/skills/<nombre>
```

Si `validate_skill.py` falla, corrige lo señalado y vuelve a correrlo antes
de seguir — no se declara "creada" una skill que no pasa esto. Si
`audit_skills.py` marca una sección faltante o "MEDIA"/"BAJA" completitud,
complétala. Si el usuario también quiere el `.zip` para subirlo a
Claude.ai, Claude Desktop o Cowork, dile que corra:

```
./scripts/package_skills_for_upload.sh <nombre>
```

**Paso 8 — La prueba (test de activación).**
Propón 5 peticiones de ejemplo que un usuario real escribiría — algunas que
deberían activar la skill nueva, otras que no deberían (incluye al menos
una que se parezca pero pertenezca a otra skill existente, para probar que
no hay solapamiento). Para cada una, predice "SÍ activa" o "NO activa"
citando la frase exacta de la `description` que lo justifica. Si alguna
petición que debería activarla no lo hace con la description actual,
ajústala (agrega la frase gatillo que faltaba) y repite la prueba hasta que
las 5 predicciones sean correctas.

## Mini-ejemplo trabajado (modo descubrimiento → skill instalada)

**Jorge:** "No sé qué skill pedir, ayúdame a pensar."

**Paso 2 — 3 preguntas y respuestas reales:**

1. *"¿Qué tarea de esta semana no era pensar el derecho de fondo, sino más
   bien seguimiento o administración, y aun así te quitó tiempo?"*
   Jorge: "Reviso a mano, en un Excel, las fechas de renovación ante la SIC
   de las marcas de 6 clientes. La semana pasada casi se me pasa una."
2. *"¿Hay algún documento que redactas casi igual cada vez, cambiando solo
   2-3 datos?"*
   Jorge: "La carta de aceptación de poder, para cada cliente nuevo."
3. *"De esas dos, ¿cuál te da más miedo que se te pase, no cuál te quita
   más tiempo?"*
   Jorge: "El vencimiento de marcas. Una carta tarde es pena; una marca
   vencida es plata del cliente perdida."

**Candidatas propuestas:**

| Candidata | Qué le enseñaría a Claude | Frase de activación |
|---|---|---|
| **A. `seguimiento-marcas-co`** | Lee el Excel de marcas del despacho, calcula días restantes a cada fecha de renovación ante la SIC, clasifica por banda de urgencia con margen de seguridad, y entrega una tabla semanal ordenada por lo más urgente. | "revisar vencimientos de marcas", "qué marcas se vencen este mes" |
| **B. `carta-aceptacion-poder`** | Arma la carta de aceptación de poder a partir de 4 datos del cliente nuevo (nombre, cédula/NIT, asunto, tipo de poder). | "redactar carta de aceptación de poder para [cliente]" |
| C. checklist de cierre de expediente | *(no se propone como skill nueva)* — se parece demasiado a `gestion-conocimiento-co`, que ya sugiere qué documentar al cerrar un caso. Se avisa del solapamiento en vez de duplicar. | — |

Jorge elige **A**, porque el vencimiento de marcas es el riesgo más caro.

**Paso 4 — Chequeo de duplicados:** `ls .claude/skills/` muestra
`monitoreo-litigios-co` (vencimientos de **términos procesales** ante Rama
Judicial/SAMAI, no de propiedad industrial) y `gestion-conocimiento-co`
(precedentes y memos, no vencimientos). Ninguna cubre marcas ante la SIC.
Se procede.

**Paso 5 — Pregunta antes de inventar:** se le pregunta a Jorge el margen
de seguridad y el formato real del Excel. Responde: alerta a 90 días antes
del vencimiento, y las columnas son `Cliente, Marca, Clase Niza, Fecha de
registro, Fecha de vencimiento, Estado`.

**Paso 6 — SKILL.md nuevo, instalado en
`.claude/skills/seguimiento-marcas-co/SKILL.md`:**

```markdown
---
name: seguimiento-marcas-co
description: Lee el Excel o CSV de marcas registradas de los clientes del despacho ante la Superintendencia de Industria y Comercio (SIC), calcula los días restantes a cada fecha de vencimiento con un margen de seguridad de 90 días, clasifica cada marca en banda de urgencia (vencida, crítica, próxima, vigente) y entrega una tabla semanal ordenada de más a menos urgente, señalando cualquier fila con dato faltante o inconsistente. Úsala cuando el usuario pida revisar los vencimientos de marcas del despacho, saber qué marcas se vencen este mes, o preparar el reporte semanal de renovaciones de propiedad industrial.
---

# Seguimiento de marcas — vencimientos ante la SIC

## Regla de veracidad obligatoria (no negociable)

Una fecha de vencimiento de marca es un dato legal-crítico: si esta skill
calcula mal los días restantes o pasa por alto un vencimiento, el cliente
puede perder el registro por falta de renovación oportuna.

1. Nunca calcules ni asumas una fecha de vencimiento que no venga explícita
   en la fuente entregada — si falta, la fila se marca "FALTA FECHA", no se
   estima.
2. Nunca marques una marca como "vigente" sin la fecha de vencimiento
   explícita que lo respalde.
3. Esta tabla es un insumo de seguimiento interno, nunca reemplaza la
   consulta directa al estado real de la marca ante la SIC antes de
   confirmarle al cliente que está a salvo o de dejar vencer un plazo.

## Cuándo usar esta skill

Cuando el usuario suba o pegue el Excel/CSV de marcas del despacho (columnas
Cliente, Marca, Clase Niza, Fecha de registro, Fecha de vencimiento, Estado)
y quiera saber cuáles necesitan atención esta semana o este mes.

## Proceso operativo

**Paso 1 — Valida columnas.** Confirma que existan las 6 columnas
esperadas. Si falta alguna, dilo y pide la columna faltante en vez de
adivinar su contenido.

**Paso 2 — Calcula días restantes.** Para cada fila, días restantes =
fecha de vencimiento - fecha de hoy.

**Paso 3 — Clasifica por banda.**
- Vencida: días restantes < 0.
- Crítica: 0-30 días.
- Próxima: 31-90 días.
- Vigente: > 90 días.

**Paso 4 — Ordena y entrega la tabla**, de más a menos urgente, marcando
aparte cualquier fila con dato faltante o fecha inconsistente (p. ej.
vencimiento anterior al registro).

## Mini-ejemplo

Datos de entrada (fragmento, hoy = 3 de julio de 2026):

| Cliente | Marca | Clase Niza | Fecha de registro | Fecha de vencimiento | Estado |
|---|---|---|---|---|---|
| Textiles Andina S.A.S. | ANDINA WEAR | 25 | 2016-07-10 | 2026-07-10 | Vigente |
| Café Sierra Alta | SIERRA ALTA | 30 | 2015-09-02 | 2025-09-02 | Vigente |
| Insumos del Valle | (sin fecha) | 6 | 2018-03-01 | — | Vigente |

Tabla de salida:

| Banda | Cliente | Marca | Días restantes | Nota |
|---|---|---|---|---|
| VENCIDA | Café Sierra Alta | SIERRA ALTA | -304 | Vencida desde 2025-09-02, confirmar estado real ante la SIC de inmediato |
| CRÍTICA | Textiles Andina S.A.S. | ANDINA WEAR | 7 | Vence 2026-07-10, radicar renovación esta semana |
| FALTA FECHA | Insumos del Valle | (sin fecha) | — | No se puede calcular banda: falta fecha de vencimiento en la fuente |

## Cierre — límite de esta skill

Esta skill entrega una tabla de seguimiento interno, nunca radica la
renovación ante la SIC ni decide si una marca se renueva o se abandona —
esa decisión, y la confirmación del estado oficial vigente, es siempre del
abogado responsable del cliente.
```

**Paso 7 — instalación real (comandos que se le dan a Jorge):**

```
python3 scripts/validate_skill.py --path .claude/skills/seguimiento-marcas-co/SKILL.md
python3 scripts/audit_skills.py --path .claude/skills/seguimiento-marcas-co
./scripts/package_skills_for_upload.sh seguimiento-marcas-co   # opcional, para subir el .zip
```

**Paso 8 — La prueba (5 peticiones):**

| # | Petición | ¿Activa `seguimiento-marcas-co`? | Por qué |
|---|---|---|---|
| 1 | "¿Qué marcas se vencen este mes?" | SÍ | Coincide literal con la frase gatillo de la description. |
| 2 | "Súbeme el Excel de marcas y dime cuáles urgen" | SÍ | "revisar los vencimientos de marcas del despacho" cubre este caso. |
| 3 | "¿Cuánto le queda al término para contestar la demanda de Textiles Andina?" | NO | Es un término procesal, no un vencimiento de marca — activa `monitoreo-litigios-co`, no esta. |
| 4 | "Prepara el reporte semanal de renovaciones de propiedad industrial" | SÍ | Frase gatillo explícita en la description. |
| 5 | "Redacta la carta de aceptación de poder de Café Sierra Alta" | NO | Es la candidata B (no construida en este ejemplo) — otra función, otra skill. |

Las 5 predicciones coinciden con el comportamiento esperado, así que la
description no necesitó ajuste en esta pasada. Si alguna hubiera fallado
(por ejemplo, si la petición 2 no hubiera activado la skill), el ajuste
habría sido agregar esa frase o una muy parecida como gatillo explícito en
la description, y repetir la prueba.

## Cierre — límite de esta skill

Esta skill-creator escribe, instala y valida estructuralmente la skill
nueva, pero nunca decide por Jorge qué función del despacho merece
automatizarse, nunca aprueba una skill que toque datos de clientes sin que
él revise el contenido de negocio final, y nunca reemplaza el juicio
profesional sobre si el resultado de la skill nueva es correcto en un caso
real — eso, igual que en las otras 55 skills de este repo, es siempre
responsabilidad del abogado que la usa.
