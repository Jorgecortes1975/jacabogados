# Memoria persistente del despacho — `aprende` + `curador-memoria`

**Fecha**: 28 de julio de 2026
**Estado**: instalado a nivel de proyecto (versionado en el repo)

---

## 1. Qué encontré antes de instalar

Auditoría del estado real:

| Componente | Estado previo | Nota |
|---|---|---|
| Skill `aprende` | ✅ existía en `~/.claude/skills/aprende/` | Pero en el **contenedor remoto efímero**, no en tu PC |
| Alias `/learn` | ❌ no existía | El sitio lo lista como comando 2 |
| Subagente de memoria | ❌ no existía | No hay `~/.claude/agents/` en absoluto |
| Hooks PostToolUse / Stop | ❌ no existían | No hay `~/.claude/settings.json` |
| Scripts `capture-signal.sh` / `stop-suggest.sh` | ❌ no existían | Sin ellos los hooks no pueden correr |
| Plugin instalado | ❌ no | No hay `~/.claude/plugins/` |

**Lo importante:** esta sesión corre en un contenedor remoto que se recicla.
Todo lo que viva solo en `~/.claude/` se pierde. Por eso la instalación quedó
**dentro del repo**, en `.claude/` — así viaja por git y aplica en cualquier
máquina donde clones el proyecto.

---

## 2. Por qué `/aprende` NO es un subagente (y qué sí lo es)

Lo pediste como subagente. La respuesta honesta: **`/aprende` no puede ser un
subagente y funcionar.**

Un subagente arranca con contexto propio y **no ve la conversación del hilo
principal**. El pase A de `/aprende` consiste precisamente en leer esa
conversación para encontrar tus correcciones. Un subagente ahí devolvería una
lista vacía siempre.

Así que la arquitectura correcta es la que quedó:

| Pieza | Forma | Por qué |
|---|---|---|
| `/aprende`, `/learn` | **Skill** | Necesita leer la conversación en curso |
| `@curador-memoria` | **Subagente** | Trabaja sobre archivos ya escritos — autocontenido, largo y mecánico. Aislarlo libera contexto del hilo principal |
| `capture-signal.sh`, `stop-suggest.sh` | **Hooks** | Corren en eventos del harness, no en el modelo |

---

## 3. Lo que quedó instalado

```
.claude/
├── settings.json                    # registra los 2 hooks (proyecto)
├── skills/
│   ├── aprende/
│   │   ├── SKILL.md                 # flujo A→E (+ enlace a señales jurídicas)
│   │   ├── prompts/confirmation-template.md
│   │   └── references/
│   │       ├── lesson-format.md
│   │       ├── memory-format.md
│   │       ├── review-workflow.md
│   │       ├── signal-patterns.md
│   │       └── signal-patterns-juridico.md   ← NUEVO
│   └── learn/SKILL.md               # alias inglés (delegado, no duplicado)
├── agents/
│   └── curador-memoria.md           # NUEVO subagente de auditoría
└── hooks/
    ├── capture-signal.sh            # NUEVO — acumula señales
    └── stop-suggest.sh              # NUEVO — recuerda correr /aprende

scripts/
└── instalar-aprende.sh              # NUEVO — replica todo en tu PC
```

---

## 4. La mejora que le hice para trabajo jurídico

`references/signal-patterns-juridico.md` cambia cómo `aprende` puntúa las
señales en este despacho:

**a) Correcciones normativas siempre son `high`.** En el sistema base, "si
dudas no guardes". Aquí es al revés: si corriges una norma, una cifra o un
radicado, se guarda. Repetir una alucinación normativa cuesta un rechazo de
auto; una memoria de más no cuesta nada.

**b) Alucinación jurídica detectada = `lesson` obligatoria.** Con las 4
secciones Reflexion completas, y la "señal de detección" tiene que decir cómo
reconocer el patrón **antes** de repetirlo. El caso Ley 2270/2024 y Ley
2261/2024 (leyes que no existen y estaban citadas en los templates) es
exactamente esto.

**c) Regla dura de confidencialidad.** Nunca se guarda en `~/.claude/`:
nombre completo + cédula, domicilios de clientes, radicados de expedientes
activos, credenciales, ni honorarios pactados con cliente nombrado. Si una
señal los contiene, se desidentifica o se descarta. Viene de `CLAUDE.md`,
sección Confidencialidad.

**d) Señales propias del despacho**: competencia y plazos mal aplicados,
preferencias de redacción ("texto corrido, sin tablas"), patrones de cliente
desidentificados, y workflows repetidos que ya podrían existir entre las 18+
skills jurídicas del repo (con chequeo de overlap).

---

## 5. Uso diario

**Al cerrar una sesión donde corregiste algo:**
```
/aprende
```
Te muestra la lista numerada con confidence. Respondes `1,3`, `all`, `none`,
`drop low`, `edit 2: <texto>` o `skip 4`. **Nada se escribe antes de que
respondas.**

**Una vez al mes:**
```
@curador-memoria audita la memoria del proyecto
```
Devuelve semáforo 🟢🟡🔴, duplicados, lessons con formato incompleto y —
primero de todo — cualquier dato confidencial que se haya colado. No edita
hasta que apruebes por número. Nunca borra: marca `status: retired`.

**Antes de abrir el proyecto en Codex:**
```
/aprende --portable
```

---

## 6. Instalarlo en tu PC

```bash
git clone <este-repo> && cd jacabogados
bash scripts/instalar-aprende.sh
```

Copia skills, subagente y hooks a `~/.claude/`, y fusiona los hooks en tu
`settings.json` **dejando backup con fecha** antes de tocarlo. Variantes:

```bash
bash scripts/instalar-aprende.sh --sin-hooks   # solo skills + subagente
bash scripts/instalar-aprende.sh --quitar      # remueve los hooks, deja backup
```

Reinicia Claude Code después. Si ya tienes un `settings.json` con contenido, el
instalador necesita `jq` para fusionarlo sin romperlo; sin `jq` te imprime el
bloque para que lo pegues a mano.

---

## 7. Verificación

Los dos hooks se probaron en este contenedor:

- `capture-signal.sh` detecta errores de herramienta y acumula la señal
- Detecta 3+ ediciones al mismo archivo y emite "reintentos repetidos"
- `stop-suggest.sh` cuenta solo señales reales y calla cuando no hay ninguna
- Ambos salen con código 0 siempre — un hook que falla no rompe tu sesión
- `settings.json` valida como JSON; los 3 scripts pasan `bash -n`

Un bug encontrado y corregido durante la prueba: `grep -c` ya imprime `0`
cuando no hay match, así que encadenar `|| echo 0` producía `"0\n0"` y rompía
la comparación numérica. Corregido en ambos scripts.

---

## 8. Lo que NO hice

- **No instalé el plugin oficial** (`/plugin marketplace add Hainrixz/aprende-skill`).
  Esos comandos los tienes que escribir tú en tu sesión — yo no puedo ejecutar
  slash commands por ti. Lo que hice equivale a la instalación manual, más las
  piezas que la instalación manual deja fuera (hooks y subagente).
- **No creé los comandos `/aprende-enable-hooks` y `/aprende-disable-hooks`.**
  El instalador cubre ambos casos (`--quitar` desactiva), y esos comandos solo
  existen dentro del plugin oficial.
- **No toqué tu `~/.claude/settings.json`** — no existe en este contenedor, y
  aunque existiera, sería el del contenedor, no el tuyo.

---

**Autor**: Sistema JA Abogados
**Licencia de `aprende`**: MIT — https://github.com/Hainrixz/aprende-skill
