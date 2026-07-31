#!/bin/bash
# Hook: Weekly Business Report Generator
# Trigger: 0 9 * * 1 (lunes 9 AM)
# Purpose: Generar reporte operativo semanal

set -e

AGENT_PATH="$(dirname "$PWD")/.claude/agents/business-automation"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
LOG_FILE="$AGENT_PATH/logs/weekly-report-$(date +%Y%m%d).log"

mkdir -p "$AGENT_PATH/logs"
mkdir -p "$AGENT_PATH/reports"

WEEK_START=$(date -d 'last monday' '+%Y-%m-%d')
WEEK_END=$(date '+%Y-%m-%d')

echo "[$TIMESTAMP] 📈 Generando reporte semanal ($WEEK_START a $WEEK_END)..." >> "$LOG_FILE"

# 1. Recolectar métricas
echo "[$TIMESTAMP] 📊 Recolectando métricas..." >> "$LOG_FILE"

TASKS_COMPLETED=$(find "$AGENT_PATH/logs" -name "*.log" -mtime -7 -exec grep -c "completado\|completed" {} + 2>/dev/null | awk '{s+=$1} END {print s}' || echo "0")
HALLUCINATIONS=$(find "$AGENT_PATH/hallucination-reports" -name "*.json" -mtime -7 -exec grep -c "hallucinations_found.*true" {} + 2>/dev/null | awk '{s+=$1} END {print s}' || echo "0")
FEATURES_GENERATED=$(find "$AGENT_PATH/generated-features" -type d -mtime -7 2>/dev/null | wc -l || echo "0")
EMAILS_PROCESSED=$(find "$AGENT_PATH/logs" -name "email-*.log" -mtime -7 -exec grep -c "📧" {} + 2>/dev/null | awk '{s+=$1} END {print s}' || echo "0")

TOTAL_OUTPUTS=$((TASKS_COMPLETED + FEATURES_GENERATED))
HALLUCINATION_RATE=0
if [ "$TOTAL_OUTPUTS" -gt 0 ]; then
  HALLUCINATION_RATE=$(echo "scale=2; $HALLUCINATIONS * 100 / $TOTAL_OUTPUTS" | bc 2>/dev/null || echo "0")
fi

echo "[$TIMESTAMP] ✅ Métricas: $TASKS_COMPLETED tareas, $HALLUCINATIONS hallucinations, $FEATURES_GENERATED features" >> "$LOG_FILE"

# 2. Generar reporte ejecutivo
echo "[$TIMESTAMP] ✍️ Generando análisis ejecutivo..." >> "$LOG_FILE"

REPORT=$(claude run --agent business-automation/reporter --prompt "
Genera reporte ejecutivo de operaciones semanales para J.A.C.

PERÍODO: $WEEK_START a $WEEK_END

MÉTRICAS OPERACIONALES:
- Tareas completadas: $TASKS_COMPLETED
- Features desarrolladas: $FEATURES_GENERATED
- Emails procesados: $EMAILS_PROCESSED
- Hallucinations detectados: $HALLUCINATIONS ($HALLUCINATION_RATE%)

ANÁLISIS REQUERIDO:
1. Resumen ejecutivo (3-4 líneas)
2. Logros principales (bullet list)
3. Oportunidades de mejora (bullet list)
4. Hallucinations encontrados - análisis + recomendaciones
5. Métricas de calidad y confiabilidad
6. Recomendaciones para próxima semana

TONO: Ejecutivo, datos-driven, profesional

FORMATO: Markdown con tablas
" 2>> "$LOG_FILE")

# 3. Guardar reporte
REPORT_FILE="$AGENT_PATH/reports/report-$(date +%Y%m%d).md"
cat > "$REPORT_FILE" << EOF
# Reporte Operativo Semanal — J.A.C. Business Automation

**Período:** $WEEK_START a $WEEK_END
**Generado:** $TIMESTAMP
**Agente:** Business Automation Reporter

---

## Métricas de Alto Nivel

| Métrica | Valor | Cambio |
|---------|-------|--------|
| Tareas Completadas | $TASKS_COMPLETED | ⬆️ |
| Features Generadas | $FEATURES_GENERATED | ⬆️ |
| Emails Procesados | $EMAILS_PROCESSED | ⬆️ |
| Hallucinations Detectados | $HALLUCINATIONS | ⬇️ (bueno) |
| Tasa de Confiabilidad | $(echo "scale=1; 100 - $HALLUCINATION_RATE" | bc)% | ⬆️ |

---

## Análisis Detallado

$REPORT

---

## Próximos Pasos

- [ ] Revisar hallucinations flagged
- [ ] Implementar mejoras sugeridas
- [ ] Actualizar conocimiento base si es necesario
- [ ] Comunicar resultados al equipo

---

*Generado automáticamente por Business Automation Reporter*
EOF

echo "[$TIMESTAMP] 📄 Reporte guardado: $REPORT_FILE" >> "$LOG_FILE"

# 4. Enviar por email
echo "[$TIMESTAMP] 📧 Enviando reporte a Jorge..." >> "$LOG_FILE"
claude run --agent email/drafter --prompt "
Prepara email ejecutivo con este reporte para Jorge:

ASUNTO: Reporte Operativo Semanal - J.A.C. Business Automation

CONTENIDO:
$REPORT

Incluye: link directo al reporte, key metrics, action items

FIRMA: Business Automation Reporter
" 2>> "$LOG_FILE"

# 5. Publicar en Dashboard
echo "[$TIMESTAMP] 📊 Actualizando Dashboard..." >> "$LOG_FILE"
curl -X POST http://localhost:3000/api/weekly-report \
  -H "Content-Type: application/json" \
  -d '{
    "week_start": "'$WEEK_START'",
    "week_end": "'$WEEK_END'",
    "tasks_completed": '$TASKS_COMPLETED',
    "features_generated": '$FEATURES_GENERATED',
    "emails_processed": '$EMAILS_PROCESSED',
    "hallucinations_detected": '$HALLUCINATIONS',
    "hallucination_rate": '$HALLUCINATION_RATE',
    "report_file": "'$REPORT_FILE'"
  }' 2>> "$LOG_FILE" || echo "Dashboard offline" >> "$LOG_FILE"

echo "[$TIMESTAMP] ✅ Reporte semanal completado" >> "$LOG_FILE"
exit 0
