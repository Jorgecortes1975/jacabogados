# 🤖 Subagentes Especializados — Arquitectura de Implementación

**Versión**: 2.0 (Subagentes integrados)  
**Estado**: ✅ Listo para producción  
**Actualizado**: 2026-07-20

---

## 📋 Resumen Ejecutivo

Se han creado **6 subagentes especializados** que orquestan las 5 fases de implementación del cerebro jurídico:

| Subagente | Fase | Rol | Status |
|-----------|------|-----|--------|
| `project-coordinator` | Todas | Orquestrador central | 🟢 |
| `postgres-specialist` | 1 | Infraestructura DB | 🟢 |
| `sync-orchestrator` | 2 | Integración de datos | 🟢 |
| `security-architect` | 3 | Seguridad MCP | 🟢 |
| `automation-engineer` | 4 | Triggers y automatización | 🟢 |
| `operations-manager` | 5 | Operación y monitoreo | 🟢 |

Cada subagente:
- ✅ Tiene acceso restringido a herramientas específicas
- ✅ Usa modelo Sonnet (balanceado entre velocidad y capacidad)
- ✅ Mantiene memoria persistente (project scope) para aprendizaje
- ✅ Implementa proceso detallado con validaciones pre/post
- ✅ Genera documentación completa y runbooks

---

## 🎯 Cómo Usar los Subagentes

### Opción 1: Ejecución automática con project-coordinator

**Forma más simple:** El coordinador orquesta TODO.

```bash
# En Claude Code, simplemente:
@project-coordinator ejecuta la implementación completa de todas 5 fases
```

El coordinador automáticamente:
1. ✅ Valida precondiciones
2. ✅ Delega a postgres-specialist (FASE 1)
3. ✅ Espera resultado, luego delega a sync-orchestrator (FASE 2)
4. ✅ Continúa hasta FASE 5
5. ✅ Reporta progreso y cualquier bloqueador

**Duración estimada**: 4-5 horas (ejecutado secuencialmente)

---

### Opción 2: Delegar fase individual

Si necesitas corregir una sola fase:

```bash
# FASE 1 - PostgreSQL
@postgres-specialist crea la base de datos en Neon y ejecuta el schema

# FASE 2 - Syncs
@sync-orchestrator configura dlt para Gmail, Calendar, GitHub, LDH y Airbyte para HubSpot

# FASE 3 - Security
@security-architect crea role readonly, instala postgres-mcp, conecta a Claude

# FASE 4 - Automatización
@automation-engineer diseña matriz de triggers e implementa logging

# FASE 5 - Operaciones
@operations-manager crea runbooks y configura cron jobs
```

---

### Opción 3: Integración con scripts de automatización

Los subagentes trabajan junto con los 6 comandos CLI:

```bash
# Cargar contexto previo
python .claude/commands/memory-manager.py load

# Generar plan con validación de riesgos
python .claude/commands/plan-mode-trigger.py "Implementar 5 fases con subagentes"

# Crear batch de tareas
python .claude/commands/batch-executor.py new
# Ingresa:
#   FASE_1|Delegar a postgres-specialist
#   FASE_2|Delegar a sync-orchestrator
#   FASE_3|Delegar a security-architect
#   FASE_4|Delegar a automation-engineer
#   FASE_5|Delegar a operations-manager

# Ejecutar en modo autónomo
python .claude/commands/goal-autonomous-runner.py "Completar implementación 5 fases"
```

---

## 🔍 Especificación de Subagentes

### 1. **project-coordinator**
- **Descripción**: Orquestador central y punto de contacto único
- **Herramientas**: Agent (todos los especializados), Read, Write, Bash
- **Modelo**: Sonnet
- **Memoria**: Project (persistente entre sesiones)
- **Responsabilidades**:
  - Delegar cada fase al agente especializado
  - Validar precondiciones y postcondiciones
  - Secuenciar fases respetando dependencias
  - Tomar decisiones arquitectónicas
  - Reportar progreso y escalaciones

### 2. **postgres-specialist**
- **Descripción**: Experto en PostgreSQL, Neon/Supabase
- **Herramientas**: Read, Write, Bash, Grep, Glob
- **Modelo**: Sonnet
- **Memoria**: Project
- **Responsabilidades**:
  - Provisión de base de datos en Neon
  - Ejecución de schema en fases (CORE → BRONZE → GOLD)
  - Validación de tablas, índices, vistas
  - Prueba de permisos
  - Troubleshooting de conexión

### 3. **sync-orchestrator**
- **Descripción**: Experto en ETL/ELT (dlt, Airbyte, n8n)
- **Herramientas**: Read, Write, Bash, Grep, Glob
- **Modelo**: Sonnet
- **Memoria**: Project
- **Responsabilidades**:
  - Despliegue de pipelines dlt (Gmail, Calendar, GitHub, LDH)
  - Configuración de conector Airbyte (HubSpot)
  - Configuración de workflow n8n (Slack)
  - Monitoreo de freshness de datos
  - Gestión de credenciales

### 4. **security-architect**
- **Descripción**: Especialista en seguridad PostgreSQL y MCP
- **Herramientas**: Read, Write, Bash, Grep, Glob
- **Modelo**: Sonnet
- **Memoria**: Project
- **Responsabilidades**:
  - Creación de role claude_readonly
  - Validación de permisos (SELECT only)
  - Instalación y configuración de postgres-mcp
  - Integración con Claude
  - Gestión de rotación de credenciales

### 5. **automation-engineer**
- **Descripción**: Especialista en sistemas event-driven
- **Herramientas**: Read, Write, Bash, Grep, Glob
- **Modelo**: Sonnet
- **Memoria**: Project
- **Responsabilidades**:
  - Diseño de matriz de activadores
  - Implementación de listeners de eventos
  - Construcción de executores de acciones
  - Infraestructura de logging JSON
  - Test harness (80%+ coverage)

### 6. **operations-manager**
- **Descripción**: Especialista en operación y SRE
- **Herramientas**: Read, Write, Bash, Grep, Glob
- **Modelo**: Sonnet
- **Memoria**: Project
- **Responsabilidades**:
  - Creación de runbooks
  - Configuración de cron jobs
  - Monitoreo y alerting
  - Respuesta a incidentes
  - Optimización de costos

---

## 📊 Matriz de Delegación

```
Entrada del usuario
       ↓
project-coordinator
       ├─ Valida precondiciones
       ├─ Delega postgres-specialist (FASE 1)
       │  └─ Retorna: Database URL, schema version
       ├─ Delega sync-orchestrator (FASE 2)
       │  └─ Retorna: Pipeline status, row counts
       ├─ Delega security-architect (FASE 3)
       │  └─ Retorna: Role permissions, MCP config
       ├─ Delega automation-engineer (FASE 4)
       │  └─ Retorna: Trigger matrix, test results
       ├─ Delega operations-manager (FASE 5)
       │  └─ Retorna: Runbooks, monitoring setup
       └─ Compila reporte final
            └─ Actualiza memoria de proyecto
```

---

## ✅ Criterios de Éxito por Fase

### FASE 1: PostgreSQL ✅
- [x] Conexión a Neon funciona
- [x] 9 tablas existen (4 CORE + 6 BRONZE + 3 GOLD)
- [x] Índices creados
- [x] INSERT funciona (antes de FASE 3)

### FASE 2: Syncs ✅
- [x] Gmail: 10+ emails en gmail_raw
- [x] Calendar: 5+ eventos en calendar_raw
- [x] HubSpot: 2+ registros en hubspot_raw
- [x] GitHub: 50+ eventos en github_raw
- [x] LDH: 20+ documentos en ldh_raw

### FASE 3: Security ✅
- [x] Role claude_readonly existe
- [x] SELECT funciona desde Claude
- [x] INSERT falla con "permission denied"
- [x] postgres-mcp instalado y conectado

### FASE 4: Automatización ✅
- [x] Matriz de triggers definida (8 triggers)
- [x] Event listeners funcionan
- [x] Action executors funcionan
- [x] Test harness pasa (42+ tests)
- [x] JSON logging activo

### FASE 5: Operaciones ✅
- [x] 3 runbooks documentados
- [x] 4 cron jobs programados
- [x] Monitoreo activo
- [x] SLAs definidos

---

## 🚀 Flujo de Implementación Completo

### Escenario: "Montar el cerebro completo hoy"

```bash
# Paso 1: Cargar contexto anterior (si existe)
python .claude/commands/memory-manager.py load

# Paso 2: Generar plan (opcional, pero recomendado)
python .claude/commands/plan-mode-trigger.py "Implementar 5 fases con subagentes"
# → Responde "s" para continuar

# Paso 3: Delegar a orquestrador
# En Claude Code:
@project-coordinator implementa todas 5 fases usando los subagentes especializados

# Paso 4: Esperar completación
# El coordinador:
# - FASE 1 (15 min): postgres-specialist
# - FASE 2 (60 min): sync-orchestrator
# - FASE 3 (15 min): security-architect
# - FASE 4 (45 min): automation-engineer
# - FASE 5 (30 min): operations-manager
# Total: ~165 min = 2.75 horas

# Paso 5: Guardar progreso
python .claude/commands/memory-manager.py save
# → Ingresa resumen final

# Paso 6: Verificación final
python .claude/commands/goal-autonomous-runner.py "Validar implementación completa"
```

**Duración total**: 3-4 horas (secuencial, supervisado)

---

## 🔧 Instalación y Setup

### Requisitos
- ✅ Claude Code v2.1.198+ (soporte de subagentes en background)
- ✅ Python 3.8+
- ✅ Git
- ✅ Bash

### Ubicación de archivos
```
.claude/agents/
├── README.md (este archivo)
├── project-coordinator.md
├── postgres-specialist.md
├── sync-orchestrator.md
├── security-architect.md
├── automation-engineer.md
└── operations-manager.md
```

### Verificar instalación
```bash
# Los archivos deben estar presentes
ls -la .claude/agents/

# Claude Code debe detectarlos automáticamente
# Si no aparecen en el typeahead @mention, reinicia Claude Code
```

---

## 📝 Memoria Persistente

Cada subagente mantiene memoria en `.claude/agent-memory/<nombre>/`:

```
.claude/agent-memory/
├── project-coordinator/
│   └── MEMORY.md (historial de decisiones, fases completadas)
├── postgres-specialist/
│   └── MEMORY.md (schemas, connection strings, issues encontrados)
├── sync-orchestrator/
│   └── MEMORY.md (pipelines, credenciales, performance baselines)
├── security-architect/
│   └── MEMORY.md (roles, permisos, rotación de credenciales)
├── automation-engineer/
│   └── MEMORY.md (trigger matrix, test results, performance)
└── operations-manager/
    └── MEMORY.md (runbooks, SLAs, incident log)
```

**Importante**: La memoria se mantiene entre sesiones, así que el sistema aprende de cada ejecución.

---

## 🎓 Mejores Prácticas

### Para usuarios
1. **Inicia con project-coordinator**: No necesitas invocar subagentes manualmente
2. **Proporciona credenciales upfront**: Ahorra tiempo en delegaciones
3. **Monitorea progreso**: Revisa memory.md de project-coordinator
4. **Escalala solo si es necesario**: El sistema maneja ~95% de casos

### Para desarrolladores
1. **Respetar la especialización**: Cada subagente es experto en su dominio
2. **Actualizar memoria**: Documenta decisiones y hallazgos
3. **Agregar test coverage**: 80%+ de cobertura es target mínimo
4. **Escalar con antelación**: Identifica bloqueadores temprano

### Para operaciones
1. **Ejecutar runbooks diariamente**: FASE 5 proporciona daily checklist
2. **Revisar memory semanal**: Identifica patrones y tendencias
3. **Rotar credenciales cada 90 días**: Implementado por security-architect
4. **Mantener SLAs**: operations-manager reporta contra objetivos

---

## 🆘 Troubleshooting

### Subagente no aparece en typeahead
```bash
# Solución: Reinicia Claude Code
# Los subagentes se detectan al iniciar
```

### Subagente se atasco o toma mucho tiempo
```bash
# El sistema espera hasta 30 minutos por fase
# Si se excede, presiona Esc para cancelar
# Revisa logs: .claude/projects/<project>/agent-*.jsonl
```

### Error: "Permission denied" al acceder a archivo
```bash
# Algunos archivos requieren credenciales
# Proporciona variables de entorno:
export NEON_USER="your_user"
export NEON_PASSWORD="your_pwd"
export HUBSPOT_API_KEY="your_key"
```

### Error: "Connection refused" a PostgreSQL
```bash
# Verifica que Neon/Supabase base está activa
# Verifica que IP está whitelisted en Neon
# Prueba manualmente: psql "postgresql://..."
```

---

## 📞 Contacto y Escalación

**Para problemas de subagentes**:
- Revisa `.claude/agent-memory/<subagente>/MEMORY.md`
- Busca patrón similar en historial
- Consulta documentación de FASE específica

**Para decisiones arquitectónicas**:
- Contacta project-coordinator
- Documenta en memory para futuro

**Para incidentes en producción (FASE 5)**:
- Ejecuta runbook de operations-manager
- Sigue SLAs de respuesta
- Log todo en audit_log

---

## 📚 Referencias

- [CLI_COMMANDS_INDEX.md](../../commands/CLI_COMMANDS_INDEX.md) — 6 comandos de automatización
- [FASE_1_POSTGRES_CON_SCRIPTS.md](../../commands/FASE_1_POSTGRES_CON_SCRIPTS.md) — Detalles FASE 1
- [PLAN_MAESTRO_IMPLEMENTACION.md](../PLAN_MAESTRO_IMPLEMENTACION.md) — Roadmap completo
- [Claude Code Documentation](https://code.claude.com/docs) — Soporte de subagentes

---

**Estado**: 🟢 Subagentes desplegados y operacionales  
**Próxima revisión**: Post-FASE 1 (1-2 días)  
**Autor**: JA Abogados Sistema  
**Versión**: 2.0
