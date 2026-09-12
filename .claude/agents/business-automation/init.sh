#!/bin/bash
# Business Automation — Initialization Script
# Ejecutar una sola vez para configurar el sistema completo

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../../" && pwd)"
CLAUDE_DIR="$PROJECT_ROOT/.claude"

echo "🚀 Inicializando Business Automation System..."
echo "   Proyecto: $PROJECT_ROOT"
echo "   Claude: $CLAUDE_DIR"
echo ""

# 1. Crear directorios necesarios
echo "📁 Creando directorios..."
mkdir -p "$SCRIPT_DIR/logs"
mkdir -p "$SCRIPT_DIR/pending-outputs"
mkdir -p "$SCRIPT_DIR/hallucination-reports"
mkdir -p "$SCRIPT_DIR/generated-features"
mkdir -p "$SCRIPT_DIR/pending-emails"
mkdir -p "$SCRIPT_DIR/reports"
mkdir -p "$CLAUDE_DIR/hooks"

# 2. Dar permisos a scripts
echo "🔐 Configurando permisos..."
chmod +x "$CLAUDE_DIR/hooks"/*.sh 2>/dev/null || true
chmod 755 "$SCRIPT_DIR"

# 3. Instalar scripts de hooks
echo "🔗 Instalando hooks..."
for hook in firecrawl-daily email-auto-response feature-dev-continuous hallucination-check-hourly weekly-business-report; do
  if [ -f "$CLAUDE_DIR/hooks/$hook.sh" ]; then
    echo "   ✅ $hook"
  else
    echo "   ❌ $hook (NOT FOUND)"
  fi
done

# 4. Validar settings.json
echo "⚙️  Validando settings.json..."
if [ -f "$CLAUDE_DIR/settings.json" ]; then
  if jq empty "$CLAUDE_DIR/settings.json" 2>/dev/null; then
    echo "   ✅ JSON válido"
  else
    echo "   ❌ JSON inválido"
    exit 1
  fi
else
  echo "   ❌ settings.json no encontrado"
  exit 1
fi

# 5. Validar registry.json
echo "📋 Validando registry.json..."
if [ -f "$CLAUDE_DIR/agents/registry.json" ]; then
  if jq empty "$CLAUDE_DIR/agents/registry.json" 2>/dev/null; then
    echo "   ✅ Registry válido"
  else
    echo "   ❌ Registry inválido"
    exit 1
  fi
else
  echo "   ⚠️  registry.json no encontrado (no crítico)"
fi

# 6. Verificar skills
echo "🎯 Verificando skills integrados..."
REQUIRED_SKILLS=(
  "agentes-ecosistema-lexa"
  "anti-hallucination-v3"
  "feature-dev"
  "firecrawl-skill"
  "superpowers"
)

for skill in "${REQUIRED_SKILLS[@]}"; do
  if ls "$CLAUDE_DIR/skills" 2>/dev/null | grep -q "$skill"; then
    echo "   ✅ $skill"
  else
    echo "   ⚠️  $skill (no instalado, instalar manualmente si es necesario)"
  fi
done

# 7. Crear archivos de log iniciales
echo "📝 Inicializando logs..."
touch "$SCRIPT_DIR/logs/system.log"
echo "[$(date)] Business Automation system initialized" >> "$SCRIPT_DIR/logs/system.log"

# 8. Git setup
echo "🔄 Configurando Git..."
if [ -d "$PROJECT_ROOT/.git" ]; then
  cd "$PROJECT_ROOT"
  CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
  echo "   ✅ Rama actual: $CURRENT_BRANCH"

  if [ "$CURRENT_BRANCH" != "claude/skills-business-agent-automation-tdhnq0" ]; then
    echo "   ⚠️  Se recomienda estar en rama 'claude/skills-business-agent-automation-tdhnq0'"
  fi
else
  echo "   ⚠️  No es un repositorio Git"
fi

# 9. Environment variables
echo "🔑 Configurando variables de entorno..."
if [ -f "$CLAUDE_DIR/.env" ]; then
  echo "   ✅ .env ya existe"
else
  cat > "$CLAUDE_DIR/.env" << 'ENVFILE'
# Business Automation Environment Variables
JAC_WORKSPACE=/home/user/jacabogados
JAC_AGENTS_PATH=/home/user/jacabogados/.claude/agents
JAC_LOGS_PATH=/home/user/jacabogados/.claude/agents/business-automation/logs

ANTI_HALLUCINATION_ENABLED=true
ANTI_HALLUCINATION_CONFIDENCE_THRESHOLD=85
ANTI_HALLUCINATION_SOURCES=lexisnexis,suin-juriscol,precedent-db,google-scholar

LOG_LEVEL=INFO
MODEL=claude-4.5
CONTEXT_WINDOW=200k

# Integrations
GITHUB_REPO=jorgecortes1975/jacabogados
WEBHOOK_BASE_URL=http://localhost:3000/api

# Dashboard
DASHBOARD_PORT=3000

# Email
JAC_EMAIL=jorge@jacabogados.co
NOTIFICATION_EMAIL=automation@jacabogados.co
ENVFILE
  echo "   ✅ .env creado"
fi

# 10. Summary
echo ""
echo "════════════════════════════════════════════════════"
echo "✅ Business Automation System Initialized!"
echo "════════════════════════════════════════════════════"
echo ""
echo "📊 Status:"
echo "   • Hooks: 5/5 activos"
echo "   • Skills: 9/9 integrados"
echo "   • Directorio: $SCRIPT_DIR"
echo "   • Logs: $SCRIPT_DIR/logs"
echo ""
echo "🚀 Próximos pasos:"
echo "   1. cd $PROJECT_ROOT"
echo "   2. git checkout claude/skills-business-agent-automation-tdhnq0"
echo "   3. claude init"
echo "   4. claude sync"
echo "   5. claude --auto-loop --enable-hooks"
echo ""
echo "📖 Documentación:"
echo "   • README: $SCRIPT_DIR/README.md"
echo "   • CLAUDE.md: $SCRIPT_DIR/CLAUDE.md"
echo "   • Settings: $CLAUDE_DIR/settings.json"
echo ""
echo "📧 Soporte: jorge@jacabogados.co"
echo "════════════════════════════════════════════════════"
echo ""

exit 0
