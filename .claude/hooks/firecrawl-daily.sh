#!/bin/bash
# Hook: Daily Firecrawl Research Loop
# Trigger: 0 6 * * * (6 AM daily)
# Purpose: Automatic jurisprudence + market research

set -e

AGENT_PATH="$(dirname "$PWD")/.claude/agents/business-automation"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
LOG_FILE="$AGENT_PATH/logs/firecrawl-daily-$(date +%Y%m%d).log"

echo "[$TIMESTAMP] 🔄 Iniciando Firecrawl Daily Loop..." >> "$LOG_FILE"

# 1. Firecrawl: Buscar jurisprudencia nueva
echo "[$TIMESTAMP] 📊 Ejecutando búsqueda de jurisprudencia..." >> "$LOG_FILE"
claude run --agent investigador --prompt "
Busca jurisprudencia nueva de hoy en las 5 áreas principales:
1. Derecho Laboral (Sentencias corte suprema)
2. Derecho Civil (Tutelas relevantes)
3. Derecho Penal (Jurisprudencia constitucional)
4. Derecho Comercial (Contratos y obligaciones)
5. Derecho Constitucional (Derechos fundamentales)

Usa: SUIN-Juriscol, LexisNexis Colombia, Google Scholar.
Formato: [Tribunal] [Fecha] [Número de caso] [Resumen 3 líneas]
" 2>> "$LOG_FILE"

# 2. Anti-Hallucination: Validar sources
echo "[$TIMESTAMP] ✅ Validando con Anti-Hallucination v3..." >> "$LOG_FILE"
claude run --agent anti-hallucination-v3 --prompt "
Valida cada fuente de jurisprudencia encontrada:
- ¿Existe en SUIN-Juriscol?
- ¿Es sentencia auténtica?
- ¿Links funcionales?

Marca hallucinations encontrados.
" 2>> "$LOG_FILE"

# 3. Notificar Dashboard
echo "[$TIMESTAMP] 📢 Enviando a Dashboard..." >> "$LOG_FILE"
curl -X POST http://localhost:3000/api/task-complete \
  -H "Content-Type: application/json" \
  -d '{
    "task": "firecrawl-daily",
    "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'",
    "status": "completed",
    "log": "'$LOG_FILE'"
  }' 2>> "$LOG_FILE" || echo "Dashboard offline, continuando..." >> "$LOG_FILE"

echo "[$TIMESTAMP] ✅ Firecrawl Daily completado" >> "$LOG_FILE"
exit 0
