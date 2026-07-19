# ⚡ FASE 1 — PostgreSQL + Scripts Integrados

**Objetivo**: Crear base PostgreSQL en Neon/Supabase + ejecutar schema, usando los 6 comandos de automatización.

**Duración**: 30-40 minutos (15 min tareas + 15 min buffer)

**Estado**: Listo para ejecutar AHORA

---

## 🎯 META COMPLETA (Usando `/goal`)

```bash
python .claude/commands/goal-autonomous-runner.py "Implementar FASE 1 PostgreSQL base: crear DB, ejecutar schema, verificar estructura"
```

**Sistema ejecutará automáticamente:**
1. Crear base de datos en Neon/Supabase
2. Ejecutar `schema_completo.sql`
3. Verificar que todas las tablas/vistas existen
4. Reportar éxito o errores cada fase

---

## 📋 ALTERNATIVA: PASO A PASO CON SCRIPTS

Si prefieres control manual, sigue este flujo:

### PASO 1️⃣: CARGAR MEMORIA DE TRABAJO ANTERIOR

```bash
python .claude/commands/memory-manager.py load
```

**Esperado**: Resumen de sesión anterior (si existe)

---

### PASO 2️⃣: GENERAR PLAN CON VERIFICACIÓN DE RIESGOS

```bash
python .claude/commands/plan-mode-trigger.py "Crear PostgreSQL en Neon + ejecutar schema_completo.sql"
```

**Sistema retorna:**
```
================================================================================
PLAN MODE — FASE 1 — PostgreSQL Base
================================================================================

📋 OBJETIVO
  Crear PostgreSQL en Neon + ejecutar schema_completo.sql

✅ PRECONDICIONES
  [1] Email y password de Neon/Supabase
  [2] schema_completo.sql descargado (está en .claude/database/)
  [3] psql instalado en máquina local
  [4] 30 minutos sin interrupciones

📝 PASOS
  Paso 1: Crear base de datos (5 min)
    Neon dashboard → New Project → Nombre: jacabogados
    Copiar connection string: postgresql://user:pass@host:5432/jacabogados

  Paso 2: Ejecutar schema (2 min)
    psql "postgresql://user:pass@host/jacabogados" < schema_completo.sql

  Paso 3: Verificar tablas (3 min)
    psql "postgresql://user:pass@host/jacabogados"
    \d clients;  (debe mostrar tabla completa)
    SELECT COUNT(*) FROM clients;  (debe dar 0)

🔍 VALIDACIONES
  [1] Tabla clients existe
  [2] Tabla meetings existe
  [3] Tabla messages existe
  [4] Vista client_activity existe
  [5] INSERT test rechazado (permiso denegado)

⚠️ RIESGOS
  • Credenciales mal (CRÍTICO)
    → Mitigation: Test conexión antes de schema
  • SQL typo en schema (CRÍTICO)
    → Mitigation: Ejecutar por partes
  • Timeout durante schema (MODERADO)
    → Mitigation: Reintentar en chunks

⏱️ TIEMPO: 20 minutos (15 trabajo + 5 buffer)

================================================================================
¿Ejecutar este plan? (s/n):
```

**Responde**: `s` para continuar

---

### PASO 3️⃣: CREAR BATCH DE TAREAS

```bash
python .claude/commands/batch-executor.py new
```

**Ingresa tareas (Ctrl+D al finalizar):**
```
FASE_1_CREATE_DB|Crear base de datos "jacabogados" en Neon
FASE_1_EXECUTE_SCHEMA|Ejecutar schema_completo.sql via psql
FASE_1_VERIFY_TABLES|Verificar que todas las tablas existen
FASE_1_VERIFY_VIEWS|Verificar que las 3 vistas GOLD existen
FASE_1_TEST_PERMISSIONS|Test: INSERT debe fallar (permisos)
```

**Sistema crea batch:** `BATCH_2026_07_19_XXXXXX`

---

### PASO 4️⃣: EJECUTAR BATCH

```bash
python .claude/commands/batch-executor.py run BATCH_2026_07_19_XXXXXX
```

**Sistema ejecuta cada tarea:**
```
================================================================================
EJECUTANDO BATCH: BATCH_2026_07_19_XXXXXX
================================================================================

[BATCH] Ejecutando: TASK_001 (FASE_1_CREATE_DB)
  Descripción: Crear base de datos "jacabogados" en Neon
✅ COMPLETADO (5 min)

[BATCH] Ejecutando: TASK_002 (FASE_1_EXECUTE_SCHEMA)
  Descripción: Ejecutar schema_completo.sql via psql
✅ COMPLETADO (2 min)

[BATCH] Ejecutando: TASK_003 (FASE_1_VERIFY_TABLES)
  Descripción: Verificar que todas las tablas existen
✅ COMPLETADO (3 min)

[BATCH] Ejecutando: TASK_004 (FASE_1_VERIFY_VIEWS)
  Descripción: Verificar que las 3 vistas GOLD existen
✅ COMPLETADO (1 min)

[BATCH] Ejecutando: TASK_005 (FASE_1_TEST_PERMISSIONS)
  Descripción: Test: INSERT debe fallar (permisos)
✅ COMPLETADO (2 min)

================================================================================
RESUMEN DE BATCH
================================================================================
Total: 5 | ✅ 5 | ❌ 0
Estado: COMPLETED

Archivo de progreso: ~/.claude/batches/BATCH_2026_07_19_XXXXXX.json
```

---

### PASO 5️⃣: VERIFICAR MANUALMENTE (5 SQL queries)

Abre terminal y conecta a tu DB:

```bash
psql "postgresql://user:password@host:5432/jacabogados"
```

**Query 1: Tabla clients**
```sql
\d clients;
-- Esperado: Descripción completa de la tabla
```

**Query 2: Tabla meetings**
```sql
SELECT COUNT(*) FROM meetings;
-- Esperado: 0 (aún vacía)
```

**Query 3: Vista GOLD — client_activity**
```sql
SELECT COUNT(*) FROM client_activity;
-- Esperado: 0 (aún sin datos de syncs)
```

**Query 4: Vista GOLD — client_status_summary**
```sql
\d client_status_summary;
-- Esperado: Descripción de la vista
```

**Query 5: Test INSERT (debe fallar después de crear role readonly)**
```sql
INSERT INTO clients (name, email, source_app, source_id) 
VALUES ('TEST', 'test@example.com', 'test', 'test_001');
-- Esperado POR AHORA: ✅ INSERTADO (rol aún no creado)
-- Esperado DESPUÉS FASE 3: ❌ ERROR permission denied
```

---

### PASO 6️⃣: GUARDAR PROGRESO

```bash
python .claude/commands/memory-manager.py save
```

**Ingresa resumen (Ctrl+D al finalizar):**
```
# TAREA PRINCIPAL
Implementar FASE 1 PostgreSQL

# ESTADO ACTUAL
✅ Base de datos creada en Neon
✅ Schema ejecutado sin errores
✅ Todas las tablas verificadas
✅ Todas las vistas verificadas
❌ Role readonly aún no creado (es FASE 3)
Completitud: 33% (1/3 fases principales)

# ARCHIVOS CREADOS
- BATCH_2026_07_19_XXXXXX.json (batch execution log)

# PENDIENTES
1. FASE 2: Configurar syncs (Gmail, Calendar, HubSpot, Slack)
2. FASE 3: Crear role readonly y conectar postgres-mcp
3. FASE 4: Automatizar matriz de activadores

# CONTEXTO CRÍTICO
- Database conexión string: postgresql://...
- Todas las 9 tablas core+bronze creadas
- Las 3 vistas GOLD están listos para consultas
- Próximo paso: Llenar datos con syncs
```

---

## 🔄 FLUJO INTEGRADO COMPLETO (Bonus)

Si quieres hacer FASE 1 + FASE 2 + FASE 3 de una sola vez:

```bash
# 1. Cargar memoria anterior
python .claude/commands/memory-manager.py load

# 2. Generar plan integrado
python .claude/commands/plan-mode-trigger.py "Implementar FASE 1, 2 y 3 completas"

# 3. Crear batch con todas las tareas
python .claude/commands/batch-executor.py new
# (ingresa 15+ tareas para 3 fases)

# 4. Ejecutar en modo AUTÓNOMO
python .claude/commands/goal-autonomous-runner.py "Completar FASE 1 + FASE 2 + FASE 3"
# Sistema reporta cada hora hasta completar

# 5. Guardar resumen final
python .claude/commands/memory-manager.py save
```

**Duración total**: ~4-5 horas (automatizado, sin intervención)

---

## 🚨 SI ALGO FALLA

### Error: "Could not connect to database"
- ✅ Verificar credenciales en connection string
- ✅ Verificar que la DB existe en Neon/Supabase
- ✅ Verificar que psql está instalado: `psql --version`

### Error: "SQL syntax error"
- ✅ Usar schema_completo.sql del repo (está probado)
- ✅ Ejecutar por partes si falla: `psql ... < schema_silver.sql` primero
- ✅ Si typo, usar `/rewind` para deshacer commits

### Error: "Permission denied"
- ✅ Normal si aún no has creado rol readonly (es FASE 3)
- ✅ Continúa con FASE 2, regresa a FASE 3 luego

### ¿Revertir todo?
```bash
# Revierte últimos 3 commits
bash .claude/commands/git-rewind-wrapper.sh 3

# Cambios están en staging, revísalos:
git diff --cached

# Descartar completamente:
git reset --hard HEAD~3
```

---

## ✅ CHECKLIST DE COMPLETITUD

```
FASE 1 COMPLETADA cuando:

[ ] Base de datos creada en Neon/Supabase
[ ] Connection string funciona: psql "postgresql://..." -c "SELECT 1;"
[ ] Schema ejecutado sin errores
[ ] Tabla clients existe con 10+ columnas
[ ] Tabla meetings existe con FK a clients
[ ] Tabla messages existe con FK a clients
[ ] Tabla ai_signals existe
[ ] 6 tablas BRONZE existen (gmail_raw, hubspot_raw, etc.)
[ ] Vista client_activity existe
[ ] Vista client_status_summary existe
[ ] Vista urgent_signals existe
[ ] INSERT funciona (permisos aún no restringidos)
[ ] Batch TASK_001 - TASK_005 = ✅ COMPLETADO
[ ] Resumen guardado en memory

INDICADOR: "FASE 1 COMPLETADA: 100% (1/3 fases)"
```

---

## 📊 RELACIÓN CON OTRAS FASES

```
FASE 1 ✅ (Infraestructura base)
   ↓
FASE 2 ⏳ (Llenar datos con syncs)
   └─ dlt Gmail, Calendar, GitHub, LDH
   └─ Airbyte HubSpot
   └─ n8n Slack
   ↓
FASE 3 ⏳ (Seguridad MCP)
   └─ Crear role readonly
   └─ Instalar postgres-mcp
   └─ Conectar a Claude
   ↓
FASE 4 ⏳ (Automatización)
   └─ Matriz de activadores
   └─ Logging JSON
   └─ Tests de ejecución
   ↓
FASE 5 ⏳ (Operación diaria)
   └─ Runbooks
   └─ Cron jobs
   └─ Monitoreo
```

---

**Estado**: 🟢 FASE 1 lista para ejecutar  
**Próxima revisión**: Después FASE 1 exitosa, proceder a FASE 2 (syncs)

