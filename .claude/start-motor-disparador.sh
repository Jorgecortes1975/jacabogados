#!/bin/bash

# Motor Disparador de Agentes — Startup Script
# Inicia el motor en modo producción: engine + webhooks + monitoreo

set -e

echo "╔════════════════════════════════════════════════════════════════════════════╗"
echo "║                                                                            ║"
echo "║                     🚀 MOTOR DISPARADOR — LEXA-JAC v2.0                   ║"
echo "║                                                                            ║"
echo "║           Activación automática de agentes especializados 24/7             ║"
echo "║                                                                            ║"
echo "╚════════════════════════════════════════════════════════════════════════════╝"
echo ""

# Verificar que Node.js está disponible
if ! command -v node &> /dev/null; then
  echo "❌ Error: Node.js no está instalado"
  exit 1
fi

echo "✅ Verificación de dependencias completada"
echo ""

# Crear directorio de logs si no existe
mkdir -p .claude/logs
LOG_TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
ENGINE_LOG=".claude/logs/engine_${LOG_TIMESTAMP}.log"
WEBHOOK_LOG=".claude/logs/webhook_${LOG_TIMESTAMP}.log"

echo "📝 Logs:"
echo "   • Engine:  $ENGINE_LOG"
echo "   • Webhook: $WEBHOOK_LOG"
echo ""

# Iniciar motor disparador en background
echo "🔧 Iniciando Motor Disparador de Agentes..."
node .claude/agent-trigger-engine.js > "$ENGINE_LOG" 2>&1 &
ENGINE_PID=$!
echo "   └─ PID: $ENGINE_PID"
sleep 1

# Iniciar webhook dispatcher en background
echo "🔧 Iniciando Webhook Dispatcher..."
node .claude/webhook-dispatcher.js > "$WEBHOOK_LOG" 2>&1 &
WEBHOOK_PID=$!
echo "   └─ PID: $WEBHOOK_PID"
sleep 2

echo ""
echo "════════════════════════════════════════════════════════════════════════════"
echo ""

# Verificar que ambos procesos se iniciaron correctamente
if ! ps -p $ENGINE_PID > /dev/null; then
  echo "❌ Error: Motor Disparador no se inició correctamente"
  cat "$ENGINE_LOG"
  exit 1
fi

if ! ps -p $WEBHOOK_PID > /dev/null; then
  echo "❌ Error: Webhook Dispatcher no se inició correctamente"
  cat "$WEBHOOK_LOG"
  exit 1
fi

echo "🟢 SISTEMA ACTIVO"
echo ""
echo "📊 COMPONENTES EN LÍNEA:"
echo "   ✅ Motor Disparador de Agentes (PID $ENGINE_PID)"
echo "   ✅ Webhook Dispatcher en http://localhost:3001"
echo ""
echo "🔌 ENDPOINTS DISPONIBLES:"
echo "   📱 Telegram:     POST http://localhost:3001/webhook/telegram"
echo "   📧 Email:        POST http://localhost:3001/webhook/email"
echo "   🔌 API REST:     POST http://localhost:3001/webhook/api"
echo "   💬 WhatsApp:     POST http://localhost:3001/webhook/whatsapp"
echo "   💓 Health:       GET  http://localhost:3001/health"
echo "   📊 Status:       GET  http://localhost:3001/status"
echo ""
echo "════════════════════════════════════════════════════════════════════════════"
echo ""
echo "📡 MONITOREO EN TIEMPO REAL:"
echo ""
echo "   Engine:   tail -f $ENGINE_LOG"
echo "   Webhook:  tail -f $WEBHOOK_LOG"
echo ""
echo "🛑 DETENER SISTEMA:"
echo "   kill $ENGINE_PID $WEBHOOK_PID"
echo "   O: pkill -f agent-trigger-engine; pkill -f webhook-dispatcher"
echo ""
echo "════════════════════════════════════════════════════════════════════════════"
echo ""

# Mantener procesos en foreground
wait $ENGINE_PID $WEBHOOK_PID
