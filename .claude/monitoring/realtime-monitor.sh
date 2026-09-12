#!/bin/bash

# Motor Disparador - Real-Time Monitoring Dashboard
# Shows live metrics and status

DOMAIN="jacabogados.co"

clear

while true; do
    clear

    echo "════════════════════════════════════════════════════════════════════════════"
    echo "     MOTOR DISPARADOR - REAL-TIME MONITORING DASHBOARD"
    echo "     Domain: $DOMAIN | Updated: $(date '+%Y-%m-%d %H:%M:%S')"
    echo "════════════════════════════════════════════════════════════════════════════"
    echo ""

    # Health Status
    echo "🔴 HEALTH STATUS:"
    HEALTH=$(curl -s --max-time 5 "https://$DOMAIN/health" 2>/dev/null)
    if echo "$HEALTH" | grep -q "ok"; then
        echo "   ✅ Health:     ONLINE"
    else
        echo "   ❌ Health:     OFFLINE"
    fi
    echo ""

    # System Status
    echo "📊 SYSTEM STATUS:"
    STATUS=$(curl -s --max-time 5 "https://$DOMAIN/status" 2>/dev/null)

    if echo "$STATUS" | grep -q "LEXA-JAC"; then
        SISTEMA=$(echo "$STATUS" | jq -r '.sistema' 2>/dev/null || echo "N/A")
        ESTADO=$(echo "$STATUS" | jq -r '.estado' 2>/dev/null || echo "N/A")
        CONSULTAS=$(echo "$STATUS" | jq -r '.consultas_procesadas' 2>/dev/null || echo "0")
        AGENTES=$(echo "$STATUS" | jq -r '.agentes_activados' 2>/dev/null || echo "0")

        echo "   Sistema:      $SISTEMA"
        echo "   Estado:       $ESTADO"
        echo "   Consultas:    $CONSULTAS"
        echo "   Agentes:      $AGENTES"
    else
        echo "   ⚠️  Status endpoint not responding"
    fi
    echo ""

    # Process Status
    echo "⚙️  PROCESSES:"
    if command -v pm2 &> /dev/null; then
        pm2_status=$(pm2 list 2>/dev/null)

        if echo "$pm2_status" | grep -q "motor-disparador-engine"; then
            echo "   ✅ Engine:      $(echo "$pm2_status" | grep motor-disparador-engine | awk '{print $8}')"
        else
            echo "   ❌ Engine:      NOT RUNNING"
        fi

        if echo "$pm2_status" | grep -q "webhook-dispatcher"; then
            echo "   ✅ Webhook:     $(echo "$pm2_status" | grep webhook-dispatcher | awk '{print $8}')"
        else
            echo "   ❌ Webhook:     NOT RUNNING"
        fi
    else
        echo "   ⚠️  PM2 not installed"
    fi
    echo ""

    # Resource Usage
    echo "💾 RESOURCES:"
    DISK=$(df /home/user/jacabogados 2>/dev/null | awk 'NR==2 {print $5}')
    MEMORY=$(free | awk 'NR==2 {printf("%d", $3/$2 * 100)}')
    CPU=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)

    echo "   Disk:         $DISK used"
    if [ "${DISK%\%}" -gt 80 ]; then
        echo "   ⚠️  WARNING: Disk usage high"
    fi

    echo "   Memory:       ${MEMORY}%"
    if [ "$MEMORY" -gt 80 ]; then
        echo "   ⚠️  WARNING: Memory usage high"
    fi

    echo "   CPU:          ${CPU}%"
    echo ""

    # Recent Activity
    echo "📝 RECENT ACTIVITY (last 10 lines):"
    if [ -f /home/user/jacabogados/.claude/logs/engine_*.log ]; then
        tail -5 /home/user/jacabogados/.claude/logs/engine_*.log 2>/dev/null | sed 's/^/   /'
    else
        echo "   (no logs yet)"
    fi
    echo ""

    # Endpoints
    echo "🌐 ENDPOINTS:"
    echo "   Health:      https://$DOMAIN/health"
    echo "   Status:      https://$DOMAIN/status"
    echo "   Telegram:    https://$DOMAIN/webhook/telegram"
    echo "   WhatsApp:    https://$DOMAIN/webhook/whatsapp"
    echo "   API:         https://$DOMAIN/webhook/api"
    echo ""

    # Commands
    echo "════════════════════════════════════════════════════════════════════════════"
    echo "Commands: [p]rocesses | [l]ogs | [r]estart | [q]uit"
    echo "════════════════════════════════════════════════════════════════════════════"

    # Read command with timeout
    read -t 60 -n 1 cmd

    case "$cmd" in
        p) pm2 status; sleep 3 ;;
        l) pm2 logs --lines 50; sleep 5 ;;
        r) pm2 restart all; sleep 3 ;;
        q) exit 0 ;;
        *) ;; # Continue with auto-refresh
    esac
done
