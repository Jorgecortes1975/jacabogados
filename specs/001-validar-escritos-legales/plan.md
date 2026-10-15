# Implementation Plan: Validación de Escritos Legales Completos

**Branch**: `001-validar-escritos-legales` | **Date**: 2026-08-20 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-validar-escritos-legales/spec.md`

## Summary

Agregar el tipo de consulta `validar-escrito` a `agente-juridico-especializado.js`: recibe un
escrito legal completo, extrae sus citas normativas y jurisprudenciales con expresiones regulares,
verifica cada una contra las fuentes oficiales de `mcp-config.json` reutilizando una función de
verificación compartida (nueva, pero también necesaria para que `verificar` deje de ser un stub), y
entrega un reporte de consola (texto y `--json`) que clasifica cada cita como verificada, no
encontrada o con datos discrepantes.

## Technical Context

**Language/Version**: Node.js (>=18; entorno de desarrollo actual: v22.22.2), CommonJS — mismo
patrón que `agente-juridico-especializado.js`.

**Primary Dependencies**: Ninguna dependencia npm nueva. Solo módulos nativos de Node (`fs`,
`path`, `http`/`https` para las llamadas a las fuentes oficiales) — restricción explícita del
despacho para esta feature.

**Storage**: N/A. Sin base de datos; la única persistencia es `mcp-config.json`, que ya existe y no
se modifica su esquema.

**Testing**: Sin framework de pruebas automatizadas (el repo no tiene ninguno hoy — ver
`research.md` §4). Validación manual vía `quickstart.md`.

**Target Platform**: CLI de Node.js ejecutada localmente por el abogado, mismo entorno que el resto
del agente jurídico.

**Project Type**: CLI de un solo proyecto (sin frontend/backend separados).

**Performance Goals**: Procesar un escrito de hasta ~40 páginas (caso borde del spec) sin bloquear
la terminal; si la verificación toma más de unos segundos, la CLI debe mostrar progreso en vez de
quedar en silencio (spec: edge case de escritos extensos).

**Constraints**: Sin dependencias npm nuevas. Debe integrarse al mismo `switch` de comandos que ya
maneja `activar`, `fuentes`, `consulta`, `help`. Debe reutilizar los transportes ya definidos en
`mcp-config.json`, sin agregar fuentes nuevas (Regla V de la constitución).

**Scale/Scope**: Uso interno del despacho, un abogado por ejecución (sin concurrencia
multiusuario); un escrito por invocación de la CLI.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Regla | Evaluación |
|-------|------------|
| I. Sin Alucinaciones | **PASS** — es la razón de ser de la feature: ninguna cita se marca "verificada" sin confirmación de fuente oficial (FR-004). |
| II. Verificación Cruzada Multi-Fuente | **PASS** — reutiliza el mismo principio ya exigido a `verificar`, vía la función compartida `verificarContraFuentesOficiales` (ver research.md §2). |
| III. Español Jurídico Colombiano | **PASS** — el reporte, sus etiquetas de estado y los mensajes de la CLI están en español. |
| IV. Trazabilidad y Citabilidad | **PASS** — cada cita reporta su ubicación en el texto y la fuente que la confirmó o refutó (FR-005, FR-006). |
| V. Simplicidad sobre Extensión del Ecosistema | **PASS** — no se crea agente ni transporte nuevo; se extiende el switch de comandos existente y se reutiliza `mcp-config.json` tal cual. |

Sin violaciones. No se requiere tabla de Complexity Tracking.

*(Re-chequeo post-diseño, tras Fase 1: sigue en PASS — `data-model.md` y `contracts/` no introducen
ninguna fuente, agente o dependencia nueva más allá de lo ya aprobado aquí.)*

## Project Structure

### Documentation (this feature)

```text
specs/001-validar-escritos-legales/
├── plan.md              # Este archivo
├── research.md          # Fase 0 — incógnitas técnicas resueltas
├── data-model.md         # Fase 1 — entidades
├── quickstart.md        # Fase 1 — guía de validación manual
├── contracts/
│   └── cli-validar-escrito.md   # Contrato del comando CLI
└── tasks.md             # Fase 2 — generado por /speckit-tasks (no por este comando)
```

### Source Code (repository root)

El repositorio es plano (sin `src/`, sin `tests/`): tres scripts Node.js en la raíz
(`agente-juridico-especializado.js`, `claude-mcp-transport.js`, `lexa-super-router.js`), config en
`mcp-config.json`. Esta feature respeta ese patrón y solo añade una carpeta `lib/` mínima:

```text
agente-juridico-especializado.js   # +1 caso en el switch: 'validar-escrito' (delega a lib/)
lib/
├── validar-escrito.js             # Orquesta: leer escrito → extraer citas → verificar → reportar
├── extraccion-citas.js            # Expresiones regulares por familia de cita (research.md §3)
└── verificacion-fuentes.js        # verificarContraFuentesOficiales(dato, fuentes) — compartida
                                    # con el tipo de consulta 'verificar' (research.md §2)
mcp-config.json                    # Sin cambios de esquema; se lee, no se modifica
```

**Structure Decision**: Módulo `lib/` nuevo y pequeño (3 archivos) requerido desde el CLI existente,
en vez de una carpeta `src/` con capas (`models/services/cli`) que no encajaría con el estilo plano
del resto del repo. `verificacion-fuentes.js` queda separado de `validar-escrito.js` porque
`verificar` (tipo de consulta existente) también la necesitará — evita duplicar esa lógica.

## Complexity Tracking

*Sin violaciones que justificar — tabla omitida.*
