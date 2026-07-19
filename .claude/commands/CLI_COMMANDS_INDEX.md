# 📟 CLI COMMANDS INDEX — 6 Comandos de Automatización

**Ubicación**: `.claude/commands/`  
**Estado**: ✅ Implementados y listos para usar  
**Integración**: Se vinculan en `CLAUDE.md` como comandos oficiales

---

## 🎯 RESUMEN RÁPIDO

| Comando | Función | Script | Estado |
|---------|---------|--------|--------|
| `/memory load` | Carga resumen sesión anterior | memory-manager.py | ✅ |
| `/memory save` | Guarda resumen sesión actual | memory-manager.py | ✅ |
| `/agents 5 <tarea>` | 5 subagentes en paralelo | agents-orchestrator.py | ✅ |
| `/batch new` | Crea cola de tareas | batch-executor.py | ✅ |
| `/batch run` | Ejecuta cola secuencialmente | batch-executor.py | ✅ |
| `/plan <objetivo>` | Plan Mode automático | plan-mode-trigger.py | ✅ |
| `/rewind N` | Revierte N commits (git) | git-rewind-wrapper.sh | ✅ |
| `/goal <meta>` | Modo autónomo iterativo | goal-autonomous-runner.py | ✅ |

---

## 1️⃣ `/memory` — PERSISTENCIA DE CONTEXTO

### ¿Qué hace?
Guarda y recupera resumen de sesión entre sesiones. Elimina necesidad de re-explicar contexto.

### Archivos
- Script: `.claude/commands/memory-manager.py`
- Almacenamiento: `~/.claude/memory/`
  - `current.md` (sesión activa)
  - `sessions/` (snapshots históricos)
  - `index.json` (metadatos)

### Uso

**Cargar memoria de sesión anterior:**
```bash
python .claude/commands/memory-manager.py load
```

**Guardar resumen actual (interactivo):**
```bash
python .claude/commands/memory-manager.py save
# Ingresa 5 secciones, luego Ctrl+D
```

**Ver template:**
```bash
python .claude/commands/memory-manager.py template
```

**Listar sesiones guardadas:**
```bash
python .claude/commands/memory-manager.py list
```

### Ejemplo
```
# Al cerrar sesión:
$ python memory-manager.py save
Ingresa resumen de sesión (Ctrl+D):
# TAREA PRINCIPAL
Implementar FASE 1 PostgreSQL

# ESTADO ACTUAL
✅ Plan maestro creado
✅ Schema SQL listo
❌ DB no creada aún

...

✅ Sesión guardada: 2026-07-19_145300

# En siguiente sesión:
$ python memory-manager.py load
# Muestra resumen completo, contexto recuperado
```

---

## 2️⃣ `/agents` — PARALELIZACIÓN DE SUBAGENTES

### ¿Qué hace?
Lanza N perspectivas independientes sobre una tarea. Ideal para análisis multi-disciplinario.

### Archivos
- Script: `.claude/commands/agents-orchestrator.py`
- Resultados: `~/.claude/agents/agents_results_*.json`

### Perspectivas disponibles
```
- legal: Análisis jurídico contra normativa
- fiscal: Implicaciones tributarias
- laboral: Seguridad social y derechos
- riesgos: Identificación de riesgos
- compliance: Cumplimiento integral
```

### Uso

**Lanzar 5 agentes sobre contrato:**
```bash
python .claude/commands/agents-orchestrator.py 5 "Revisa contrato laboral Telepatía"
```

**Lanzar 3 agentes sobre diagnóstico:**
```bash
python .claude/commands/agents-orchestrator.py 3 "Audita nómina empresa X"
```

### Ejemplo
```
[AGENTS] Lanzando 5 agentes
[AGENTS] Tarea: Revisa contrato laboral Telepatía
[AGENTS] Perspectivas: legal, fiscal, laboral, riesgos, compliance

[AGENTE 1 — LEGAL]
Status: ✅ COMPLETADO
Output: Análisis completado

[AGENTE 2 — FISCAL]
Status: ✅ COMPLETADO
...

SÍNTESIS: Los 5 agentes convergieron en:
  1. [legal] Punto principal
  2. [fiscal] Punto principal
  ...
  
✅ Resultados guardados: ~/.claude/agents/agents_results_20260719_145300.json
```

---

## 3️⃣ `/batch` — EJECUTOR DE COLA DE TAREAS

### ¿Qué hace?
Encadena N tareas secuencialmente. Si una falla, pausa o continúa (configurable).

### Archivos
- Script: `.claude/commands/batch-executor.py`
- Colas: `~/.claude/batches/BATCH_*.json`

### Uso

**Crear nuevo batch (interactivo):**
```bash
python .claude/commands/batch-executor.py new
# Ingresa tareas, una por línea:
# Formato: tipo|descripción
# Ejemplo:
#   DIAGNÓSTICO|Analizar Telepatía
#   RECOMENDACIONES|Plan de acción
#   Ctrl+D
```

**Ejecutar batch:**
```bash
python .claude/commands/batch-executor.py run BATCH_2026_07_19_145300
```

**Ver estado:**
```bash
python .claude/commands/batch-executor.py status BATCH_2026_07_19_145300
```

**Listar batches recientes:**
```bash
python .claude/commands/batch-executor.py list
```

### Ejemplo
```
$ python batch-executor.py new
Creando nuevo batch: BATCH_2026_07_19_145300
Ingresa tareas (Ctrl+D para finalizar):
DIAGNÓSTICO|Analizar Telepatía
RECOMENDACIONES|Crear plan acción
✅ Batch creado: BATCH_2026_07_19_145300
Tareas: 2

$ python batch-executor.py run BATCH_2026_07_19_145300
================================================================================
EJECUTANDO BATCH: BATCH_2026_07_19_145300
================================================================================

[BATCH] Ejecutando: TASK_001 (DIAGNÓSTICO)
  Descripción: Analizar Telepatía
✅ COMPLETADO

[BATCH] Ejecutando: TASK_002 (RECOMENDACIONES)
  Descripción: Crear plan acción
✅ COMPLETADO

================================================================================
RESUMEN DE BATCH
================================================================================
Total: 2 | ✅ 2 | ❌ 0
Estado: COMPLETED
```

---

## 4️⃣ `/plan` — PLAN MODE AUTOMÁTICO

### ¿Qué hace?
Entra en Plan Mode (solo lectura), investiga, genera plan, solicita confirmación.

### Archivos
- Script: `.claude/commands/plan-mode-trigger.py`
- Planes: `~/.claude/plans/PLAN_*.json`

### Uso

**Generar plan para objetivo:**
```bash
python .claude/commands/plan-mode-trigger.py "Implementar PostgreSQL en Neon"
```

**Detecta automáticamente:**
- PostgreSQL → FASE 1 (15 min)
- Syncs → FASE 2 (90 min)
- Seguridad → FASE 3 (15 min)
- Automatización → FASE 4 (240 min)

### Ejemplo
```
$ python plan-mode-trigger.py "Implementar PostgreSQL en Neon"

[PLAN MODE] Analizando objetivo...

================================================================================
PLAN MODE — FASE 1 — PostgreSQL Base
================================================================================

📋 OBJETIVO
  Implementar PostgreSQL en Neon

✅ PRECONDICIONES
  [1] Email de acceso Neon/Supabase
  [2] Contraseña generada (32 caracteres)
  [3] schema_completo.sql descargado
  [4] psql instalado localmente

📝 PASOS
  Paso 1: Crear base de datos
    Descripción: Neon dashboard → New Project → jacabogados
    Duración: 5 min
    Validación: Copiar connection string

  Paso 2: Ejecutar schema
    Descripción: psql '...' < schema_completo.sql
    Duración: 2 min
    Validación: \d clients; debe mostrar tabla

  Paso 3: Verificar estructura
    Descripción: SELECT COUNT(*) FROM clients;
    Duración: 3 min
    Validación: Debe retornar 0

🔍 VALIDACIONES (después de completar)
  [1] Tabla clients existe
  [2] Tabla meetings existe
  [3] Vista client_activity existe
  [4] INSERT test rechazado

⚠️ RIESGOS IDENTIFICADOS
  • Credenciales mal (Impacto: CRÍTICO)
    → Test conexión antes de schema
  • SQL typo (Impacto: CRÍTICO)
    → Ejecutar por partes, verificar cada CREATE TABLE

⏱️ TIEMPO ESTIMADO: 20 minutos
  (15 min trabajo + 5 min buffer)

================================================================================
¿Ejecutar este plan? (s/n): s

✅ Procede con ejecución
Usa los scripts apropiados:
  - PostgreSQL: batch-executor.py run BATCH_...
```

---

## 5️⃣ `/rewind` — GIT UNDO SEGURO

### ¿Qué hace?
Revierte N últimos commits sin perder cambios (en staging).

### Archivos
- Script: `.claude/commands/git-rewind-wrapper.sh`

### Uso

**Reverter últimos 3 commits:**
```bash
bash .claude/commands/git-rewind-wrapper.sh 3
```

**Confirma y revierte:**
```
📋 ÚLTIMOS 3 COMMITS:
  abc123d Añadir middleware de logs
  def456e Cambiar schema: añadir columna audit_log
  ghi789f Actualizar rutina_semanal.md

¿Reverter estos 3 commits? (s/n): s

✅ Revertidos 3 commits
📝 Cambios en staging (listos para revisar/stash/commit):
   Archivos: 5
   Cambios: +42, -15

Opciones:
  1. Revisar: git diff --cached
  2. Stash: git stash
  3. Nuevo commit: git commit -m 'Descripción'
```

---

## 6️⃣ `/goal` — MODO AUTÓNOMO

### ¿Qué hace?
Ejecuta iterativamente hasta completar meta. Reporta cada 1h, detiene cuando ✅.

### Archivos
- Script: `.claude/commands/goal-autonomous-runner.py`
- Metas: `~/.claude/goals/GOAL_*.json`

### Uso

**Iniciar meta:**
```bash
python .claude/commands/goal-autonomous-runner.py "Implementar FASE 1 y FASE 2 completamente"
```

**Sistema detecta fases automáticamente:**
- FASE 1 PostgreSQL (15 min)
- FASE 2 Syncs (120 min)
- FASE 3 Seguridad (15 min)
- FASE 4 Automatización (240 min)

**Reporta cada 1 hora** (configurable)

### Ejemplo
```
================================================================================
🚀 AUTONOMOUS GOAL RUNNER STARTED
================================================================================
Objetivo: Implementar FASE 1 y FASE 2 completamente
Duración máxima: 16 horas
Reportes cada: 60 min
================================================================================

[WORKING] Fase: FASE 1 — PostgreSQL Base
  ✓ Crear DB
  ✓ Ejecutar schema
  ✓ Verificar estructura

[WORKING] Fase: FASE 2 — Configurar Syncs
  ✓ Gmail dlt
  ✓ Calendar dlt
  ✓ HubSpot Airbyte
  ✓ Slack n8n

[REPORTE 01:00] Avance total: 50% (1.5h / 3h)
  Completadas 2/4 fases
  Continuando...

[REPORTE 02:00] Avance total: 100% (2.0h / 3h)

🟢 META COMPLETADA EN 2.0 HORAS
  Todas las subtareas: ✅

================================================================================
🎯 GOAL STATUS — GOAL_2026_07_19_145300
================================================================================

📌 OBJETIVO
  Implementar FASE 1 y FASE 2 completamente

📊 PROGRESO: 100% (4/4 fases)

📋 FASES
  1. ✅ COMPLETADO FASE 1 — PostgreSQL Base
  2. ✅ COMPLETADO FASE 2 — Configurar Syncs
  3. ✅ COMPLETADO FASE 3 — Seguridad MCP
  4. ✅ COMPLETADO FASE 4 — Automatización

================================================================================
```

---

## 📚 FLUJO INTEGRADO — CASO REAL

### Escenario: "Montar cerebro completo en 1 día"

**Paso 1: Cargar memoria de trabajo anterior**
```bash
python .claude/commands/memory-manager.py load
# Contexto recuperado: planes pendientes, decisiones previas
```

**Paso 2: Generar plan de acción**
```bash
python .claude/commands/plan-mode-trigger.py "Implementar PostgreSQL + primeros syncs"
# Plan generado: FASE 1 + FASE 2, 20+ pasos, riesgos mapeados
# Confirma: s
```

**Paso 3: Crear batch de tareas**
```bash
python .claude/commands/batch-executor.py new
# FASE_1_DB|Crear base Neon y ejecutar schema
# FASE_2_GMAIL|Configurar dlt Gmail sync
# FASE_2_CALENDAR|Configurar dlt Calendar sync
# Ctrl+D
# Batch creado: BATCH_2026_07_19_160000
```

**Paso 4: Ejecutar en modo autónomo**
```bash
python .claude/commands/goal-autonomous-runner.py "Completar PostgreSQL + Gmail + Calendar"
# Sistema ejecuta iterativamente
# Reportes cada 1 hora
# Auto-detiene cuando ✅
```

**Paso 5: Si algo falla, rewind**
```bash
bash .claude/commands/git-rewind-wrapper.sh 2
# Revierte últimos 2 commits
# Cambios en staging para revisión
```

**Paso 6: Guardar progreso**
```bash
python .claude/commands/memory-manager.py save
# Resumen: qué se completó, qué falta, decisiones clave
# Listo para siguiente sesión
```

---

## 🔧 INSTALACIÓN Y SETUP

### Requisitos
```bash
# Python 3.8+
python --version

# Git
git --version

# Bash (Linux/macOS) o WSL (Windows)
bash --version
```

### Hacer ejecutables
```bash
chmod +x .claude/commands/*.py
chmod +x .claude/commands/*.sh
```

### Agregar a PATH (opcional)
```bash
# Para llamar directamente: memory-manager.py en lugar de python .claude/commands/memory-manager.py
export PATH="$PATH:$HOME/.claude/commands"
```

### Crear estructura de directorios
```bash
mkdir -p ~/.claude/{memory,agents,batches,plans,goals}
```

---

## 📊 ALMACENAMIENTO Y AUDITORÍA

| Comando | Almacena | Localización | Retención |
|---------|----------|--------------|-----------|
| `/memory` | Resúmenes sesión | `~/.claude/memory/sessions/` | Últimas 10 |
| `/agents` | Resultados análisis | `~/.claude/agents/` | Todos (JSON) |
| `/batch` | Estado de colas | `~/.claude/batches/` | Todos (JSON) |
| `/plan` | Planes generados | `~/.claude/plans/` | Todos (JSON) |
| `/goal` | Metas completadas | `~/.claude/goals/` | Todos (JSON) |

**Limpieza:**
```bash
# Borrar sesiones antiguas
find ~/.claude/memory/sessions -mtime +30 -delete

# Ver tamaño total
du -sh ~/.claude/
```

---

## 🚨 TROUBLESHOOTING

### Script no es ejecutable
```bash
chmod +x .claude/commands/memory-manager.py
```

### Módulo Python no encontrado
```bash
# Todos los scripts usan solo stdlib (json, pathlib, datetime, etc.)
# No requieren instalación de dependencias
```

### Permisos denegados en ~/.claude/
```bash
mkdir -p ~/.claude/{memory,agents,batches,plans,goals}
chmod 755 ~/.claude/
```

---

## 📋 CHECKLIST DE INTEGRACIÓN

```
[ ] Todos los 6 scripts creados en .claude/commands/
[ ] Scripts ejecutables (chmod +x)
[ ] Directorios creados (~/.claude/memory, etc.)
[ ] Documentación en CLI_COMMANDS_INDEX.md
[ ] Probados cada comando con caso simple
[ ] Integrados en CLAUDE.md como comandos oficiales
[ ] Hooks configurados (on-start: load memory, on-exit: save memory)
[ ] Agregados a PATH (opcional)
[ ] Backups de colas/metas (git tracking)
```

---

**Estado**: 🟢 Implementación completa, lista para producción  
**Próxima fase**: FASE 1 — PostgreSQL setup con PLAN_MODE + GOAL_MODE

