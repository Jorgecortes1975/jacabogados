# 🏗️ PLAN MAESTRO DE IMPLEMENTACIÓN — Sistema Completo JA Abogados

**Análisis en Plan Mode**  
**Fecha**: 19 de julio de 2026  
**Estado**: Listo para ejecutar (todo investigado, sin tocar código aún)

---

## 📊 INVENTARIO ACTUAL

### ✅ YA EXISTE E INSTALADO

**Skills Jurídicos (16)**
- vigilancia-normativa-col (con capa anti-fallas)
- redactor-juridico-col (v2.0, 6 disciplinas)
- jurisprudencia-col (verificación EN VIVO)
- meta-prompt-maestro-col (5 capas)
- liquidador-aportes-col (seguridad social)
- vencimientos-procesales-col (control de términos)
- derecho-comparado-intl
- due-diligence-col
- revision-tabular-col
- acuerdos-confidencialidad-col
- acuerdos-datos-col
- clasificacion-laboral-col
- cumplimiento-societario-col
- riesgo-ia-proveedores-col

**Skills Técnicos (3)**
- anti-hallucination-v4 (12 puntos control)
- cyber-neo (OWASP 2025 + CWE Top 25)
- code-reviewer (bugs + seguridad)

**Frameworks**
- The Architect (4 fases, blueprints auto-ejecutables)
- Cyber-Neo References (14 guías seguridad)

**Documentación Instalada**
- CLAUDE.md (instrucciones del sistema)
- INSTALACION_INTEGRACION.md (cómo funciona integrado)
- OLLAMA_INTEGRACION.md (modelos locales)

**Agente Python**
- arnés_agente.py (14.3 KB, funcional)
  - 3 herramientas: leer, escribir, bash
  - LiteLLM agnóstico (Claude, GPT, Ollama)
  - System prompt Fable 5 optimizado
  - Max 10 iteraciones

**Documentación de Comandos** (nueva, esta sesión)
- build-my-brain.md (plan integral 5 fases)
- PLAN_DE_SYNCS.md (automatización)
- RUTINA_SEMANAL_RESYNC.md (operación semanal)
- SEGURIDAD_MCP_ROLES.md (protección)
- AGENTES_EN_ACCION_CASOS_REALES.md (flujos reales)

### ❌ FALTA IMPLEMENTAR

**ETAPA 1: PostgreSQL + Syncs**
```
[ ] Crear DB en Neon / Supabase / Railway
[ ] Ejecutar schema_completo.sql
[ ] Crear scripts de sync (dlt):
    [ ] gmail_sync.py
    [ ] calendar_sync.py
    [ ] github_sync.py
    [ ] legal_data_hunter_sync.py
[ ] Configurar Airbyte (HubSpot)
[ ] Configurar n8n (Slack webhooks)
```

**ETAPA 2: Seguridad**
```
[ ] Crear role claude_readonly
[ ] Instalar postgres-mcp (crystaldba)
[ ] Conectar a Claude Code
[ ] Verificar modo restricted
```

**ETAPA 3: Automatización del Arnés**
```
[ ] Crear matriz_activadores.json
[ ] Integrar detección en arnés_agente.py
[ ] Logging estructurado (JSON)
[ ] Dashboard de frescura
```

**ETAPA 4: Operación Diaria**
```
[ ] Runbooks ejecutables (copy-paste ready)
[ ] Cron jobs configurados
[ ] Alertas de frescura
[ ] Procedimiento re-sync semanal
```

---

## 🔗 MAPA DE DEPENDENCIAS

```
┌─ CORE JURÍDICO ───────────────────────────────────────┐
│                                                        │
│  19 skills + arnés_agente.py                          │
│  ↓                                                     │
│  System prompt Fable 5 (ya integrado)                 │
│  ↓                                                     │
│  Matriz de activadores (FALTA)                        │
│                                                        │
└────────────────┬─────────────────────────────────────┘
                 │
        ┌────────▼──────────┐
        │   CONTEXTO        │
        │   PostgreSQL      │
        │   (FALTA crear)   │
        └────────┬──────────┘
                 │
        ┌────────▼──────────┐
        │   DATOS           │
        │   Syncs           │
        │   (FALTA conf)    │
        │                   │
        │  • Gmail (dlt)    │
        │  • Calendar (dlt) │
        │  • HubSpot (AB)   │
        │  • Slack (n8n)    │
        │  • GitHub (dlt)   │
        │  • LDH (dlt)      │
        └────────┬──────────┘
                 │
        ┌────────▼──────────┐
        │   SEGURIDAD       │
        │   MCP + Roles     │
        │   (FALTA conf)    │
        └───────────────────┘

FLUJO: Skills + Contexto Fresco + Seguridad = Sistema Completo
```

---

## 📋 ORDEN DE EJECUCIÓN (CRÍTICO)

### FASE 1: PostgreSQL Base (Día 1)
**Sin esto, todo lo demás no funciona.**

```
1. Elegir plataforma: Neon (recomendado) / Supabase / Railway
2. Crear DB (5 min)
3. Ejecutar schema_completo.sql (2 min)
4. Test de conexión con psql (3 min)
   
✓ Resultado: DB vacío pero con estructura lista
✓ Tiempo: 15 minutos
```

**Riesgo**: Si la conexión falla, todo se detiene.  
**Contingencia**: Tener 2 plataformas listas (Neon + backup Supabase).

---

### FASE 2: Sincs Iniciales (Días 2-3)
**Llenar el cerebro con datos reales.**

```
Orden (por dependencia):

2.1 dlt Gmail (cada hora)
    └─ Trae correos, crea messages
    └─ Tiempo: 1 hora setup + 1 hora testing
    ✓ Test: SELECT COUNT(*) FROM messages WHERE channel='email';

2.2 dlt Calendar (diario 8 AM)
    └─ Trae reuniones, crea meetings
    └─ Tiempo: 30 min setup + 30 min testing
    ✓ Test: SELECT COUNT(*) FROM meetings;

2.3 Airbyte HubSpot (continuo)
    └─ Trae clientes, crea/actualiza clients
    └─ Tiempo: 1 hora setup + 1 hora testing
    ✓ Test: SELECT COUNT(*) FROM clients WHERE source_app='hubspot';

2.4 n8n Slack (webhook real-time)
    └─ Trae mensajes Slack, crea messages
    └─ Tiempo: 30 min setup + 30 min testing
    ✓ Test: SELECT COUNT(*) FROM messages WHERE channel='slack';

2.5 dlt GitHub (semanal lunes)
    └─ Trae diagnósticos versionados
    └─ Tiempo: 30 min setup + 30 min testing
    ✓ Test: SELECT COUNT(*) FROM messages WHERE source_app='github';

2.6 dlt Legal Data Hunter (diario 9 AM)
    └─ Trae cambios normativos, crea ai_signals
    └─ Tiempo: 30 min setup + 30 min testing
    ✓ Test: SELECT COUNT(*) FROM ai_signals;

✓ Resultado: Cerebro lleno de datos, syncs corriendo
✓ Tiempo total: 2-3 días (paralelo posible)
```

**Riesgo**: Un sync falla y datos quedan viejos.  
**Contingencia**: Tabla sync_logs para auditoría; dashboard de frescura.

---

### FASE 3: Seguridad MCP (Día 4)
**Conectar Claude a Postgres de forma segura.**

```
3.1 Crear role claude_readonly (SQL, 5 min)
    └─ Permisos mínimos: SELECT GOLD only
    └─ ✓ Verify: SELECT * FROM information_schema.role_table_grants WHERE grantee='claude_readonly';

3.2 Instalar postgres-mcp (5 min)
    └─ pipx install postgres-mcp
    └─ ✓ Verify: postgres-mcp --version

3.3 Conectar a Claude Code (5 min)
    └─ claude mcp add postgres --env DATABASE_URI="..." -- postgres-mcp --access-mode=restricted
    └─ ✓ Verify: SELECT 1; (debe funcionar, SELECT INSERT debe fallar)

✓ Resultado: Claude lee Postgres, sin poder escribir
✓ Tiempo: 15 minutos
```

**Riesgo**: Role no quedó restringido (puede escribir).  
**Contingencia**: Script de verificación de permisos.

---

### FASE 4: Automatización del Arnés (Día 5)
**Los skills se activan solos por palabra clave.**

```
4.1 Crear matriz_activadores.json (30 min)
    └─ Mapeo: palabra clave → skill → orden ejecución
    └─ Ejemplo: "demanda" + "tutela" → [redactor, jurisprudencia, vigilancia, anti-hall]

4.2 Integrar en arnés_agente.py (1 hora)
    └─ Función detectar_modulo(pregunta) → dict config
    └─ Función ejecutar_cadena(config) → ejecuta en orden
    └─ Encadena anti-hallucination-v4 siempre al final

4.3 Logging estructurado (1 hora)
    └─ Cada iteración → logs/cliente/sesión_timestamp.jsonl
    └─ Campos: timestamp, modelo, iteración, herramientas, tokens, duración, errores

4.4 Tests de activación (1 hora)
    └─ 5 casos reales: demanda, concepto, auditoría, análisis, diseño
    └─ ✓ Verify: "Cada caso activa los skills correctos"

✓ Resultado: Arnés automatizado, logs completos
✓ Tiempo: 4 horas
```

**Riesgo**: Matriz incompleta (faltan casos de uso).  
**Contingencia**: Fallback a activación manual + aviso.

---

### FASE 5: Operación Diaria (Día 6)
**Runbooks listos, sistema operativo.**

```
5.1 Rutina semanal de re-sync (15 min)
    └─ Lunes 10 AM: 5 pasos documentados
    └─ Check: frescura, integridad, costo, signals

5.2 Cron jobs (30 min)
    └─ Gmail: 0 * * * * (cada hora)
    └─ Calendar: 0 8 * * * (diario 8 AM)
    └─ Legal Data Hunter: 0 9 * * * (diario 9 AM)
    └─ GitHub: 0 8 * * 1 (lunes 8 AM)
    └─ Airbyte + n8n: ya corriendo continuo

5.3 Alertas y monitoreo (30 min)
    └─ Si synced_at > umbral → alerta
    └─ Si filas huérfanas > 0 → alerta
    └─ Dashboard de frescura (SQL query simple)

5.4 Documentación operativa (1 hora)
    └─ Copy-paste ready:
       ├─ Runbook demanda
       ├─ Runbook concepto
       ├─ Runbook auditoría
       ├─ Troubleshooting
       └─ Dashboard queries

✓ Resultado: Sistema operativo, listo para producción
✓ Tiempo: 2-3 horas
```

---

## ⚠️ PUNTOS CRÍTICOS Y RIESGOS

| Punto Crítico | Riesgo | Mitigación |
|---|---|---|
| DB creation | Credenciales mal | Test conexión antes de sync |
| Schema execution | SQL error (typo) | Ejecutar por partes, verificar cada tabla |
| HubSpot API | Token expirado | Generar nuevo en HubSpot, documentar en .env |
| n8n webhook | URL pública falla | Usar ngrok para testing local |
| dlt scripts | Módulo no encontrado | venv aislado, dependencias explícitas |
| Matriz activadores | Caso de uso falta | Fallback a manual, agregar iterativamente |
| Permisos MCP | Role puede escribir | Verificar con INSERT test (debe fallar) |
| Syncs en paralelo | Race condition | Uso de timestamps, evitar overlaps |
| Cron timing | Slack entre syncs | Escalonar: Gmail 00, Calendar 08, LDH 09 |

---

## 📊 TIMELINE REALISTA

```
Día 1 (Día 1 hoy): PostgreSQL setup
  Morning: Crear DB Neon (15 min)
  Noon: Ejecutar schema (10 min)
  Afternoon: Verificar conexión (10 min)
  ✓ Status: DB listo

Día 2-3: Syncs
  Day 2 morning: dlt Gmail + Calendar (2h)
  Day 2 afternoon: Airbyte HubSpot (2h)
  Day 3 morning: n8n Slack (1h)
  Day 3 afternoon: dlt GitHub + LDH (1h)
  ✓ Status: Datos fluyendo

Día 4: Seguridad
  Morning: MCP setup (1h)
  Afternoon: Test + troubleshoot (1h)
  ✓ Status: Claude conectado, seguro

Día 5: Automatización
  All day: Matriz + arnés + logging (4h)
  ✓ Status: Arnés automático

Día 6: Operación
  All day: Runbooks + monitoreo (3h)
  ✓ Status: Listo para producción

TOTAL: 6 días de trabajo concentrado
```

---

## ✅ VERIFICACIÓN POR ETAPA

### Después de FASE 1 (PostgreSQL)
```sql
\d clients;          -- Debería mostrar tabla completa
SELECT COUNT(*) FROM clients;  -- 0 (aún vacío, es normal)
\dv                  -- Debería mostrar 3 vistas GOLD
```

### Después de FASE 2 (Syncs)
```sql
SELECT COUNT(*) FROM messages WHERE channel='email';  -- > 0
SELECT COUNT(*) FROM meetings;  -- > 0
SELECT COUNT(*) FROM clients WHERE source_app='hubspot';  -- > 0
SELECT MAX(synced_at) FROM messages;  -- Debe ser reciente
```

### Después de FASE 3 (MCP)
```bash
# Conecta como claude_readonly
psql postgresql://claude_readonly:PASSWORD@host:5432/tu_db

SELECT * FROM client_activity LIMIT 1;  -- Debe funcionar
INSERT INTO clients VALUES (...);  -- Debe fallar: permission denied
```

### Después de FASE 4 (Arnés)
```bash
python arnés_agente.py "Redacta demanda de tutela"
# Debe:
# 1. Detectar módulo TUTELAS
# 2. Activar 4 skills automático
# 3. Retornar documento + acta de control
```

### Después de FASE 5 (Operación)
```bash
# Lunes 10 AM
python rutina_resync.py
# Debe:
# 1. Disparar 6 syncs
# 2. Verificar frescura
# 3. Chequear integridad
# 4. Reportar costo
```

---

## 🚀 RESUMEN EJECUTIVO

**Qué tienes ahora:**
- 19 skills listos
- Documentación completa
- Arnés funcional
- Sistema diseñado

**Qué falta (ejecutable en 6 días):**
1. PostgreSQL + Schema (15 min)
2. Syncs configurados (16 horas)
3. MCP conectado (15 min)
4. Arnés automatizado (4 horas)
5. Operación lista (3 horas)

**Resultado final:**
- Sistema operativo 100%
- Automatización completa
- Seguridad implementada
- Documentación ejecutable

**Riesgo general:** Bajo (todo investigado, sin incógnitas)  
**Confianza:** Alta (plan claro, dependencias mapeadas)

---

## ✋ PUNTOS DE APROBACIÓN

Antes de ejecutar, aprueba:

```
[ ] Entiendo el orden: DB → Syncs → Seguridad → Arnés → Operación
[ ] Acepto timeline: 6 días de trabajo concentrado
[ ] Tengo credenciales: Neon/Supabase + HubSpot + Google + Slack
[ ] Tengo ambiente: Python venv, dlt, Airbyte, n8n listos
[ ] Tengo backup: 2 plataformas DB en caso de falla
[ ] Listo para ejecutar FASE 1 (PostgreSQL) HOY
```

---

**Estado**: 🟢 PLAN APROBADO Y LISTO PARA EJECUTAR  
**Próximo paso**: Tú dices "GO" y empiezo FASE 1 (PostgreSQL)

