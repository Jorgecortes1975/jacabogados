#!/bin/bash
# Hook: Email Auto-Response Classifier
# Trigger: on:email:receive (cada email entrante)
# Purpose: Clasificar y responder emails automáticamente

set -e

AGENT_PATH="$(dirname "$PWD")/.claude/agents/business-automation"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
EMAIL_SUBJECT="$1"
EMAIL_BODY="$2"
SENDER="$3"

LOG_FILE="$AGENT_PATH/logs/email-$(date +%Y%m%d).log"
mkdir -p "$AGENT_PATH/logs"

echo "[$TIMESTAMP] 📧 Email recibido de: $SENDER - Asunto: $EMAIL_SUBJECT" >> "$LOG_FILE"

# 1. Classifier: Categorizar email
echo "[$TIMESTAMP] 🏷️ Clasificando email..." >> "$LOG_FILE"
CATEGORY=$(claude run --agent email/classifier --prompt "
Clasifica este email de cliente:

DE: $SENDER
ASUNTO: $EMAIL_SUBJECT
CUERPO:
$EMAIL_BODY

Categorías: [urgente|normal|bajo] + [legal|administrativo|facturación|otro]
Responde solo: CATEGORIA:tipo:prioridad
" 2>> "$LOG_FILE")

echo "[$TIMESTAMP] ✅ Categoría detectada: $CATEGORY" >> "$LOG_FILE"

# 2. Drafter: Generar respuesta automática
echo "[$TIMESTAMP] ✍️ Generando respuesta..." >> "$LOG_FILE"
RESPONSE=$(claude run --agent email/drafter --prompt "
Genera respuesta profesional para este email:

CATEGORÍA: $CATEGORY
REMITENTE: $SENDER
CONTENIDO: $EMAIL_BODY

Tone: Formal, profesional, del bufete J.A.C.
Incluye: Fecha, número de referencia, firma JAC
NO incluyas: Promesas legales, diagnósticos sin revisión
" 2>> "$LOG_FILE")

echo "[$TIMESTAMP] 📨 Respuesta generada, aguardando aprobación..." >> "$LOG_FILE"

# 3. Guardar para revisión de Jorge
PENDING_FILE="$AGENT_PATH/pending-emails/$(date +%s)-$SENDER.json"
mkdir -p "$AGENT_PATH/pending-emails"

cat > "$PENDING_FILE" << EOF
{
  "from": "$SENDER",
  "subject": "$EMAIL_SUBJECT",
  "category": "$CATEGORY",
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "original_body": "$EMAIL_BODY",
  "auto_response": "$RESPONSE",
  "status": "pending-review",
  "log": "$LOG_FILE"
}
EOF

echo "[$TIMESTAMP] ⏳ Email en cola para revisión: $PENDING_FILE" >> "$LOG_FILE"

# 4. Notificar a Jorge via webhook
curl -X POST http://localhost:3000/api/email-pending \
  -H "Content-Type: application/json" \
  -d @"$PENDING_FILE" 2>> "$LOG_FILE" || echo "Webhook offline" >> "$LOG_FILE"

echo "[$TIMESTAMP] ✅ Email guardado para revisión" >> "$LOG_FILE"
exit 0
