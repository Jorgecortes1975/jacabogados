#!/bin/bash
# Hook: Feature Dev Continuous Integration
# Trigger: on:github:pr:merge (cada PR que se mergea)
# Purpose: Auto-generar features + tests usando Superpowers

set -e

AGENT_PATH="$(dirname "$PWD")/.claude/agents/business-automation"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
PR_NUMBER="$1"
PR_BRANCH="$2"
PR_TITLE="$3"
PR_BODY="$4"

LOG_FILE="$AGENT_PATH/logs/feature-dev-$(date +%Y%m%d).log"
mkdir -p "$AGENT_PATH/logs"

echo "[$TIMESTAMP] 🔨 Iniciando Feature Dev Continuous para PR #$PR_NUMBER..." >> "$LOG_FILE"

# 1. Feature Dev: Generar specs + arquitectura
echo "[$TIMESTAMP] 📐 Generando especificación técnica..." >> "$LOG_FILE"
SPECS=$(claude run --agent feature-dev --prompt "
Crea especificación técnica para esta feature:

RAMA: $PR_BRANCH
TÍTULO: $PR_TITLE
DESCRIPCIÓN:
$PR_BODY

Incluye:
1. Requisitos funcionales (bullet list)
2. Requisitos técnicos (stack, dependencias)
3. Arquitectura (diagrama en ASCII)
4. Casos de uso (3-5 principales)
5. Criterios de aceptación (testeable)
6. Riegos y mitigaciones

Formato: JSON estructurado
" 2>> "$LOG_FILE")

echo "[$TIMESTAMP] ✅ Specs generadas" >> "$LOG_FILE"

# 2. Superpowers: Generar código + tests
echo "[$TIMESTAMP] ⚡ Ejecutando Superpowers (code generation)..." >> "$LOG_FILE"
CODE=$(claude run --agent superpowers-toolkit --prompt "
Genera código production-ready basado en estas specs:

$SPECS

Entregables:
1. src/implementation.py (o .ts/.js según stack)
2. tests/test_implementation.py (pytest)
3. README.md (documentación)
4. requirements.txt (o package.json)

Requisitos:
- Type hints obligatorio
- 100% test coverage
- Docstrings en cada función
- Error handling robusto
- Logging estructurado
" 2>> "$LOG_FILE")

echo "[$TIMESTAMP] ✅ Código generado" >> "$LOG_FILE"

# 3. Save outputs
FEATURE_DIR="$AGENT_PATH/generated-features/pr-$PR_NUMBER"
mkdir -p "$FEATURE_DIR"

echo "$SPECS" > "$FEATURE_DIR/specs.json"
echo "$CODE" > "$FEATURE_DIR/code.output"

# 4. Run tests automatically
echo "[$TIMESTAMP] 🧪 Ejecutando tests automáticos..." >> "$LOG_FILE"
cd "$FEATURE_DIR" || exit 1
pytest tests/ --cov=src --cov-report=json 2>> "$LOG_FILE" || {
  echo "[$TIMESTAMP] ❌ Tests fallaron" >> "$LOG_FILE"
  curl -X POST http://localhost:3000/api/feature-dev-failed \
    -H "Content-Type: application/json" \
    -d '{"pr": '$PR_NUMBER', "error": "tests_failed"}' 2>> "$LOG_FILE" || true
  exit 1
}

echo "[$TIMESTAMP] ✅ Todos los tests pasaron" >> "$LOG_FILE"

# 5. Anti-Hallucination validation
echo "[$TIMESTAMP] 🛡️ Validando código con Anti-Hallucination..." >> "$LOG_FILE"
claude run --agent anti-hallucination-v3 --prompt "
Valida este código generado:

$CODE

Checklist:
- ¿Sintaxis correcta?
- ¿Lógica coherente?
- ¿Sin vulnerabilidades OWASP?
- ¿Manejo de errores robusto?
- ¿Matches las specs?

Responde: VALIDADO|REQUIERE_REVISIÓN + lista de issues
" 2>> "$LOG_FILE"

# 6. Notificar éxito
echo "[$TIMESTAMP] 📢 Notificando éxito..." >> "$LOG_FILE"
curl -X POST http://localhost:3000/api/feature-dev-complete \
  -H "Content-Type: application/json" \
  -d '{
    "pr": '$PR_NUMBER',
    "branch": "'$PR_BRANCH'",
    "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'",
    "specs_file": "'$FEATURE_DIR/specs.json'",
    "code_dir": "'$FEATURE_DIR'",
    "status": "completed"
  }' 2>> "$LOG_FILE" || true

echo "[$TIMESTAMP] ✅ Feature Dev Continuous completado" >> "$LOG_FILE"
exit 0
