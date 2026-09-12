#!/bin/bash
# Hook: Hourly Hallucination Fact-Check
# Trigger: 0 * * * * (cada hora)
# Purpose: Validar outputs pendientes contra fuentes autorizadas

set -e

AGENT_PATH="$(dirname "$PWD")/.claude/agents/business-automation"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
LOG_FILE="$AGENT_PATH/logs/hallucination-$(date +%Y%m%d).log"

mkdir -p "$AGENT_PATH/logs"
mkdir -p "$AGENT_PATH/pending-outputs"
mkdir -p "$AGENT_PATH/hallucination-reports"

echo "[$TIMESTAMP] 🛡️ Iniciando verificación horaria de hallucinations..." >> "$LOG_FILE"

# 1. Recolectar outputs pendientes
PENDING_COUNT=$(find "$AGENT_PATH/pending-outputs" -type f -mmin -60 2>/dev/null | wc -l)
echo "[$TIMESTAMP] 📋 Encontrados $PENDING_COUNT outputs en última hora" >> "$LOG_FILE"

if [ "$PENDING_COUNT" -eq 0 ]; then
  echo "[$TIMESTAMP] ℹ️ Sin outputs para validar" >> "$LOG_FILE"
  exit 0
fi

# 2. Procesar cada output con Anti-Hallucination v3
HALLUCINATION_FOUND=0
VALIDATION_RESULTS="[]"

for output_file in $(find "$AGENT_PATH/pending-outputs" -type f -mmin -60 2>/dev/null); do
  echo "[$TIMESTAMP] 🔍 Validando: $output_file" >> "$LOG_FILE"

  OUTPUT_CONTENT=$(cat "$output_file")

  # Ejecutar Anti-Hallucination
  VALIDATION=$(claude run --agent anti-hallucination-v3 --prompt "
CONTEXTO: Validar este output legal/comercial

CONTENIDO:
$OUTPUT_CONTENT

ACCIÓN REQUERIDA:
1. Identifica cada claim factual (hechos, fechas, leyes, jurisprudencia)
2. Para cada claim, asigna confianza: ALTA|MEDIA|BAJA|HALLUCINATION
3. Lista sources que respaldan cada claim (LexisNexis, SUIN-Juriscol, etc.)
4. Si confidence < 85%, flag como REQUIERE_REVISIÓN

Formato JSON:
{
  \"overall_confidence\": 0-100,
  \"hallucinations_found\": true/false,
  \"claims\": [
    {
      \"claim\": \"texto\",
      \"confidence\": 0-100,
      \"source\": \"fuente\",
      \"requires_review\": true/false
    }
  ],
  \"summary\": \"resumen ejecutivo\"
}
" 2>> "$LOG_FILE")

  # Parsear resultado
  CONFIDENCE=$(echo "$VALIDATION" | grep -o '"overall_confidence": [0-9]*' | grep -o '[0-9]*' || echo "0")
  HALLUCINATION_FLAG=$(echo "$VALIDATION" | grep -o '"hallucinations_found": true' | wc -l)

  if [ "$HALLUCINATION_FLAG" -gt 0 ]; then
    HALLUCINATION_FOUND=$((HALLUCINATION_FOUND + 1))
    echo "[$TIMESTAMP] ⚠️ HALLUCINATION detectado en: $output_file (confidence: $CONFIDENCE%)" >> "$LOG_FILE"

    # Mover a carpeta de hallucinations
    HALLUC_FILENAME="hallucination-$(date +%s)-$(basename "$output_file")"
    cp "$output_file" "$AGENT_PATH/hallucination-reports/$HALLUC_FILENAME"
    echo "$VALIDATION" > "$AGENT_PATH/hallucination-reports/$HALLUC_FILENAME.validation"
  else
    echo "[$TIMESTAMP] ✅ Output válido: $output_file (confidence: $CONFIDENCE%)" >> "$LOG_FILE"
    rm "$output_file"  # Limpiar aprobado
  fi
done

# 3. Generar reporte horario
REPORT_FILE="$AGENT_PATH/hallucination-reports/report-$(date +%Y%m%d-%H00).json"
cat > "$REPORT_FILE" << EOF
{
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "hour": "$(date +%H)",
  "outputs_checked": $PENDING_COUNT,
  "hallucinations_found": $HALLUCINATION_FOUND,
  "hallucination_rate": $(echo "scale=2; $HALLUCINATION_FOUND * 100 / $PENDING_COUNT" | bc)%,
  "status": $([ $HALLUCINATION_FOUND -gt 0 ] && echo '"ALERT"' || echo '"OK"')
}
EOF

echo "[$TIMESTAMP] 📊 Reporte generado: $REPORT_FILE" >> "$LOG_FILE"

# 4. Si hay hallucinations, notificar
if [ $HALLUCINATION_FOUND -gt 0 ]; then
  echo "[$TIMESTAMP] 🚨 Enviando alerta..." >> "$LOG_FILE"
  curl -X POST http://localhost:3000/api/hallucination-alert \
    -H "Content-Type: application/json" \
    -d @"$REPORT_FILE" 2>> "$LOG_FILE" || echo "Webhook offline" >> "$LOG_FILE"
fi

echo "[$TIMESTAMP] ✅ Verificación horaria completada" >> "$LOG_FILE"
exit 0
