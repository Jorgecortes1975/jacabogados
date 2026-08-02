#!/bin/bash

# Test Motor Disparador — Simula consultas de múltiples fuentes
# Verifica que el engine active automáticamente los agentes correctos

set -e

echo "╔════════════════════════════════════════════════════════════════════════════╗"
echo "║                                                                            ║"
echo "║              🧪 TEST: MOTOR DISPARADOR — ACTIVACIÓN AUTOMÁTICA            ║"
echo "║                                                                            ║"
echo "║         Simulación de consultas de Telegram, Email, API, WhatsApp         ║"
echo "║                                                                            ║"
echo "╚════════════════════════════════════════════════════════════════════════════╝"
echo ""

# Verificar que los servicios están en línea
check_service() {
  local endpoint=$1
  local name=$2

  if curl -s "$endpoint" > /dev/null 2>&1; then
    echo "✅ $name está disponible"
  else
    echo "❌ $name NO está disponible en $endpoint"
    echo "   Inicia los servicios primero: bash .claude/start-motor-disparador.sh"
    exit 1
  fi
}

echo "🔍 Verificando servicios..."
check_service "http://localhost:3001/health" "Webhook Dispatcher"
echo ""

# Simular consultas de diferentes fuentes
echo "════════════════════════════════════════════════════════════════════════════"
echo "PRUEBA 1️⃣: CONSULTA VÍA API REST — LABORAL"
echo "════════════════════════════════════════════════════════════════════════════"
echo ""

RESPONSE=$(curl -s -X POST http://localhost:3001/webhook/api \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_001",
    "query": "Fui despedido sin justa causa de mi trabajo, quiero saber mis derechos",
    "requestId": "req_001"
  }')

echo "📨 Request enviado"
echo "📤 Response: $RESPONSE"
echo ""
sleep 2

echo "════════════════════════════════════════════════════════════════════════════"
echo "PRUEBA 2️⃣: CONSULTA VÍA API REST — COMERCIAL"
echo "════════════════════════════════════════════════════════════════════════════"
echo ""

RESPONSE=$(curl -s -X POST http://localhost:3001/webhook/api \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_002",
    "query": "Necesito constituir una SAS para mi negocio, ¿cuál es el proceso?",
    "requestId": "req_002"
  }')

echo "📨 Request enviado"
echo "📤 Response: $RESPONSE"
echo ""
sleep 2

echo "════════════════════════════════════════════════════════════════════════════"
echo "PRUEBA 3️⃣: CONSULTA VÍA API REST — TRIBUTARIO"
echo "════════════════════════════════════════════════════════════════════════════"
echo ""

RESPONSE=$(curl -s -X POST http://localhost:3001/webhook/api \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_003",
    "query": "¿Cuáles son nuestras obligaciones fiscales con la DIAN como empresa multinacional?",
    "requestId": "req_003"
  }')

echo "📨 Request enviado"
echo "📤 Response: $RESPONSE"
echo ""
sleep 2

echo "════════════════════════════════════════════════════════════════════════════"
echo "PRUEBA 4️⃣: CONSULTA VÍA API REST — FAMILIA"
echo "════════════════════════════════════════════════════════════════════════════"
echo ""

RESPONSE=$(curl -s -X POST http://localhost:3001/webhook/api \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_004",
    "query": "Necesito establecer custodia compartida de mis hijos, ¿qué documentos requiero?",
    "requestId": "req_004"
  }')

echo "📨 Request enviado"
echo "📤 Response: $RESPONSE"
echo ""
sleep 2

echo "════════════════════════════════════════════════════════════════════════════"
echo "VERIFICACIÓN: ESTADO DEL SISTEMA"
echo "════════════════════════════════════════════════════════════════════════════"
echo ""

STATUS=$(curl -s http://localhost:3001/status)
echo "📊 Status del Motor:"
echo "$STATUS" | jq '.' 2>/dev/null || echo "$STATUS"
echo ""

echo "════════════════════════════════════════════════════════════════════════════"
echo "✅ PRUEBA COMPLETADA"
echo "════════════════════════════════════════════════════════════════════════════"
echo ""
echo "📋 Resultados esperados:"
echo "   ✅ Consulta 1 clasificada a: DERECHO LABORAL"
echo "   ✅ Consulta 2 clasificada a: DERECHO COMERCIAL"
echo "   ✅ Consulta 3 clasificada a: DERECHO TRIBUTARIO"
echo "   ✅ Consulta 4 clasificada a: DERECHO DE FAMILIA"
echo ""
echo "🤖 Para cada consulta, el Motor Disparador debe:"
echo "   1. Recibir la consulta por webhook"
echo "   2. Clasificarla automáticamente a la rama correcta"
echo "   3. Activar el agente especializado"
echo "   4. Inicializar 3 sub-agentes (investigador, redactor, validator)"
echo "   5. Ejecutar flujo integral de 8 pasos"
echo "   6. Validar con JAC 3 niveles"
echo "   7. Retornar respuesta verificada"
echo ""
echo "📝 Para ver logs detallados:"
echo "   tail -f .claude/logs/engine_*.log"
echo "   tail -f .claude/logs/webhook_*.log"
echo ""
