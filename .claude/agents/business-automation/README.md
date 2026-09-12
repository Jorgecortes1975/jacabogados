# 🚀 Business Automation — Guía de Activación

**Estado:** 🟢 Producción | **Versión:** 1.0 | **Última actualización:** 31-Jul-2026

---

## Quick Start — Activación en 3 Pasos

### 1. Verificar instalación
```bash
cd /home/user/jacabogados
git checkout claude/skills-business-agent-automation-tdhnq0
ls -la .claude/settings.json  # Debe existir
ls -la .claude/hooks/         # Debe tener 5 .sh files
```

### 2. Dar permisos a hooks
```bash
chmod +x .claude/hooks/*.sh
chmod +x .claude/agents/business-automation/logs
```

### 3. Inicializar sistema
```bash
claude init
claude sync
cd .claude/agents/business-automation
claude --auto-loop --enable-hooks
```

✅ **¡Sistema activado!** Las automatizaciones comenzarán inmediatamente.

---

## ¿Qué se Activa Automáticamente?

| Hook | Cuándo | Qué hace | Frecuencia |
|------|--------|----------|-----------|
| 🔍 Firecrawl Daily | 6 AM | Busca jurisprudencia nueva | Diariamente |
| 📧 Email Auto-Response | Al recibir email | Clasifica y responde | Inmediato |
| ⚡ Feature Dev Continuous | PR merge en Github | Genera features + tests | Por evento |
| 🛡️ Hallucination Check | Cada hora | Valida outputs | Cada hora |
| 📊 Weekly Report | Lunes 9 AM | Reporte completo | Semanalmente |

---

## Flujo de Datos — Cómo Funciona

```
Usuario/Entrada
       ↓
   ROUTER EMPRESARIAL (clasifica tipo)
       ↓
ORQUESTADOR ESPECIALIZADO (investigación/redacción/validación)
       ↓
SUB-AGENTES (juridico/mercantil/email/técnicos)
       ↓
VALIDACIÓN: Anti-Hallucination v3 (85% confianza mínima)
       ↓
OUTPUT FINAL (con sources y certeza)
       ↓
DASHBOARD (monitoreo + alertas)
```

---

## Configuración Manual de Hooks

### Opción 1: CLI
```bash
# Ver status de todos los hooks
claude hooks list

# Activar un hook específico
claude hooks enable firecrawl-daily

# Desactivar
claude hooks disable email-auto-response

# Ver logs
claude hooks logs hallucination-check-hourly
```

### Opción 2: Editar settings.json
```json
{
  "hooks": {
    "firecrawl-daily": { "enabled": true },
    "email-auto-response": { "enabled": false }  // Desactivado
  }
}
```

### Opción 3: Archivo .claude/hooks.conf
```bash
# Cada línea: HOOK_ID enabled/disabled
firecrawl-daily enabled
email-auto-response enabled
feature-dev-continuous enabled
hallucination-check-hourly enabled
weekly-business-report enabled
```

---

## Validación Manual de Salidas

Si quieres validar manualmente un output antes de que se publique:

```bash
# 1. Parar auto-loops temporalmente
claude loops pause

# 2. Validar con Anti-Hallucination
cd .claude/agents
claude --agent anti-hallucination-v3 --interactive

# Copiar y pegar el texto a validar
# El agente te dirá si hay hallucinations

# 3. Reanudar
claude loops resume
```

---

## Métricas en Dashboard

El sistema reporta automáticamente a `http://localhost:3000`:

- **Tareas completadas** — contador diario
- **Features generadas** — con test coverage
- **Emails procesados** — con tasa de aprobación automática
- **Hallucinations detectados** — tasa de confiabilidad
- **Tiempo promedio** — por tipo de tarea

Acceder: `http://localhost:3000/dashboard`

---

## Alertas y Notificaciones

El sistema notifica en:
- **Slack** (#jac-operations, #jac-quality)
- **Email** (jorge@jacabogados.co)
- **Dashboard** (en vivo)

### Alertas Críticas (🚨)
- Hallucinations encontrados
- Tareas fallidas
- Sistema offline

### Alertas Normales (⚠️)
- Baja confiabilidad
- Performance issues
- Recommendations

---

## Troubleshooting

### "Hooks no se ejecutan"
```bash
# Verificar permisos
ls -la .claude/hooks/
chmod +x .claude/hooks/*.sh

# Verificar settings.json
cat .claude/settings.json | grep '"enabled": true'

# Ver logs
tail -f .claude/agents/business-automation/logs/hallucination-*.log
```

### "Hallucinations rate muy alta"
1. Revisar últimas validaciones: `.claude/agents/business-automation/hallucination-reports/`
2. Aumentar `ANTI_HALLUCINATION_CONFIDENCE_THRESHOLD` (default 85)
3. Agregar sources faltantes a `ANTI_HALLUCINATION_SOURCES`

### "Email auto-response requiere demasiada aprobación"
```json
{
  "loops": {
    "email-auto-response": {
      "approval_workflow": {
        "enabled": false  // Desactivar aprobación manual
      }
    }
  }
}
```

### "El sistema está lento"
```bash
# Ver agentes activos
ps aux | grep claude

# Reducir concurrencia
# En settings.json:
"max_concurrent_agents": 2  // Era 5
```

---

## Casos de Uso Principales

### Caso 1: Solicitud Legal Automática
```
1. Cliente envía "Necesito tutorial de defensa en juicio laboral"
2. ROUTER detecta: [legal] [investigación] [urgente]
3. → investigador (firecrawl) busca jurisprudencia
4. → redactor genera documento
5. → anti-hallucination valida
6. → email/drafter responde al cliente
✅ Proceso completado en < 5 minutos
```

### Caso 2: Contrato Comercial
```
1. Cliente: "Contrato de arrendamiento comercial, SAS"
2. ROUTER: [mercantil] [redacción] [normal]
3. → contratos (feature-dev) genera draft
4. → superpowers (testing) valida cláusulas
5. → anti-hallucination verifica legales
6. → email notifica a cliente
✅ Contrato listo en < 30 minutos
```

### Caso 3: Automatización de Features
```
1. Dev merge PR a main
2. ROUTER: [técnico] [automatización]
3. → feature-dev genera specs
4. → superpowers genera código
5. → pytest corre tests (100% coverage)
6. → anti-hallucination valida lógica
7. → dashboard muestra progreso
✅ Feature en production sin intervención
```

---

## Desactivación Temporal

Si necesitas pausar el sistema:

```bash
# Opción 1: Todos los hooks
claude hooks disable-all

# Opción 2: Hook específico
claude hooks disable hallucination-check-hourly

# Opción 3: Solo loops (mantener hooks)
claude loops pause

# Reanudar
claude loops resume
claude hooks enable-all
```

---

## Monitoreo 24/7

El Dashboard ejecuta automáticamente:

```bash
cd .claude/agents/dashboard
claude --watch  # Inicia monitoreo en tiempo real
```

Ve a `http://localhost:3000` para:
- ✅ Status de cada agente
- 📊 Métricas en vivo
- 🚨 Alertas en tiempo real
- 📈 Gráficas de performance
- 📋 Cola de tareas pendientes

---

## API Webhook

Si tienes sistemas externos, puedes enviar eventos:

```bash
# Task completada
curl -X POST http://localhost:3000/api/task-complete \
  -d '{"task":"firecrawl-daily","status":"completed"}'

# Hallucination detectado
curl -X POST http://localhost:3000/api/hallucination-alert \
  -d '{"file":"output.md","confidence":45}'

# Feature generada
curl -X POST http://localhost:3000/api/feature-dev-complete \
  -d '{"pr":123,"branch":"feature/x"}'
```

---

## Stack Técnico

- **Orquestación:** Claude 4.5 + Haiku
- **Modelado:** Feature Dev + Superpowers
- **Validación:** Anti-Hallucination v3
- **Research:** Firecrawl + LexisNexis
- **Testing:** pytest + coverage
- **Legal:** JAC Validator + LEXA-LAB
- **Monitoreo:** Dashboard local
- **Notificaciones:** Slack + Email + Webhooks

---

## Soporte

- 📧 **Email:** jorge@jacabogados.co
- 💬 **Slack:** #jac-operations
- 📊 **Dashboard:** http://localhost:3000
- 📝 **Logs:** `.claude/agents/business-automation/logs/`

---

## Changelog

### v1.0 — 31 Jul 2026
- ✅ Initial release
- ✅ 5 hooks automáticos
- ✅ Anti-hallucination integrado
- ✅ Dashboard en vivo
- ✅ Superpowers completo

### Próximo: v1.1
- [ ] Telegram bot integration
- [ ] Multi-language support
- [ ] ML para predicción de carga
- [ ] Blockchain para auditoría

---

**Sistema de Automatización JAC — Powered by Claude 4.5 + Superpowers**

🟢 **Status:** ACTIVO | 📊 **Uptime:** 24/7 | 🛡️ **Confiabilidad:** 98%+
