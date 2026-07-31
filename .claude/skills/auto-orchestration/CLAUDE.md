# Skill: Auto-Orchestration — Enrutamiento automático de solicitudes

**Activación**: Automática cuando:
1. Email entra a inbox (gmail)
2. Webhook recibe solicitud en `/api/solicitud`
3. Archivo aparece en `pending-requests/`

## Procedimiento

### 1. Clasificar solicitud

```bash
# Extrae: tema, urgencia, actor, documentos
jq '.tema, .urgencia, .actor' < solicitud.json
```

**Matriz de clasificación**:

| Tema | Tipo | Orquestador | Sub-agente | Urgencia? |
|------|------|-------------|------------|-----------|
| "contrato indefinido" | LABORAL | juridico | redactor | NORMAL |
| "SAS nueva" | MERCANTIL | mercantil | contratos | NORMAL |
| "email respuesta" | EMAIL | email | drafter | ON-TRIGGER |
| "Firecrawl search" | INVESTIGACIÓN | juridico | investigador | BATCH |
| "Feature dev" | TÉCNICA | dev | developer | ON-MERGE |

### 2. Enrutar a orquestador correcto

```bash
case $TEMA in
  LABORAL|JUDICIAL|SEGURIDAD-SOCIAL)
    → .claude/agents/juridico/CLAUDE.md ;;
  MERCANTIL|TÍTULOS-VALORES|SAS)
    → .claude/agents/mercantil/CLAUDE.md ;;
  EMAIL|COMUNICACIÓN)
    → .claude/agents/email/CLAUDE.md ;;
esac
```

### 3. Esperar output del orquestador

- Timeout: 5 minutos
- Si excede: notifica "Procesando, requiere más tiempo"
- Si falla: captura error y notifica

### 4. Validar output

Automáticamente:
1. ✅ Triggering auto-hallucination-check skill
2. ✅ Extrayendo timestamp
3. ✅ Verificando formato JSON/markdown

### 5. Reportar al Dashboard

```json
{
  "request_id": "req-20260731-12345",
  "tema": "contrato indefinido",
  "urgencia": "NORMAL",
  "orquestador": "juridico",
  "status": "IN_PROGRESS|COMPLETED|FAILED",
  "output_id": "output_001.md",
  "timestamp_inicio": "2026-07-31T12:00:00Z",
  "timestamp_fin": "2026-07-31T12:03:15Z",
  "duracion_segundos": 195,
  "confianza": 94,
  "next_action": "Jorge revisa"
}
```

### 6. Notificaciones

#### Completado (PASS)
```
✅ Solicitud completada: [tema]
📊 Confianza: 94%
⏱️ Tiempo: 3m 15s
👤 Siguiente: Jorge para firma
→ Slack #jac-operations
```

#### Flagged
```
⚠️ Solicitud requiere revisión: [tema]
📊 Confianza: 78% (bajo)
🔍 Revisar: output_002.md
→ Slack #jac-quality + Email Jorge
```

#### Fallo
```
❌ Solicitud falló: [tema]
🐛 Razón: [error]
🔄 Acción: Reintentar en 1h
→ Slack #jac-operations
```

## Limites

- **Presupuesto herramientas**: 30 llamadas por solicitud
- **Timeout**: 5 minutos por orquestador
- **Concurrencia**: máximo 4 solicitudes simultáneas (evitar sobrecarga)

## Logs

Escribe en: `.claude/agents/business-automation/logs/orchestration-YYYYMMDD.log`

```
[2026-07-31 12:00:00] 📨 Solicitud recibida: req-001
[2026-07-31 12:00:02] 🔍 Clasificando: LABORAL → juridico
[2026-07-31 12:00:03] 📤 Enrutando a juridico/redactor
[2026-07-31 12:03:15] ✅ Completado en 3m 15s, confianza 94%
[2026-07-31 12:03:16] 📢 Notificando Dashboard
```

## Configuración

```json
{
  "max_concurrent": 4,
  "timeout_segundos": 300,
  "tool_budget": 30,
  "notificaciones": {
    "slack": true,
    "email": true,
    "dashboard": true
  }
}
```

**Chat gana sobre este skill.**
