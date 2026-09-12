#!/bin/bash

# Motor Disparador - 24/7 Health Check Script
# Runs every 15 minutes via cron
# Alerts on failure, auto-recovery attempts

DOMAIN="jacabogados.co"
ALERT_EMAIL="jorge@jacabogados.co"
LOG_FILE="/home/user/jacabogados/.claude/logs/health-check.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Create log directory if not exists
mkdir -p "$(dirname "$LOG_FILE")"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

check_health() {
    local health_response=$(curl -s --max-time 5 "https://$DOMAIN/health")

    if echo "$health_response" | grep -q "ok"; then
        return 0
    else
        return 1
    fi
}

check_status() {
    local status_response=$(curl -s --max-time 5 "https://$DOMAIN/status")

    if echo "$status_response" | grep -q "LEXA-JAC"; then
        return 0
    else
        return 1
    fi
}

check_processes() {
    if pm2 list | grep -q "motor-disparador-engine"; then
        return 0
    else
        return 1
    fi
}

send_alert() {
    local subject="$1"
    local message="$2"

    log "ALERT: $subject"

    # Send email alert
    echo "$message" | mail -s "🚨 Motor Disparador Alert: $subject" "$ALERT_EMAIL"

    # Also log to system
    echo "ALERT: $message" | systemctl --user status || true
}

attempt_recovery() {
    log "Attempting recovery..."

    # Try restart
    pm2 restart all >> "$LOG_FILE" 2>&1
    sleep 5

    # Check if recovered
    if check_health; then
        log "✅ Recovery successful"
        echo "Motor Disparador recovered successfully" | \
            mail -s "✅ Motor Disparador Recovered" "$ALERT_EMAIL"
        return 0
    else
        log "❌ Recovery failed - manual intervention needed"
        send_alert "Recovery Failed" "Motor Disparador failed to recover. Manual intervention required."
        return 1
    fi
}

# Main health checks
log "Starting health check..."

# Check 1: Health endpoint
if ! check_health; then
    log "❌ Health endpoint failed"
    send_alert "Health Endpoint Down" "Motor Disparador health endpoint not responding at https://$DOMAIN/health"
    attempt_recovery
    exit 1
fi
log "✅ Health endpoint OK"

# Check 2: Status endpoint
if ! check_status; then
    log "❌ Status endpoint failed"
    send_alert "Status Endpoint Down" "Motor Disparador status endpoint not responding at https://$DOMAIN/status"
    attempt_recovery
    exit 1
fi
log "✅ Status endpoint OK"

# Check 3: Processes
if ! check_processes; then
    log "❌ Motor Disparador processes not running"
    send_alert "Processes Down" "Motor Disparador processes not found. Attempting restart..."
    attempt_recovery
    exit 1
fi
log "✅ Processes running"

# Check 4: Nginx
if ! curl -s -o /dev/null -w "%{http_code}" "https://$DOMAIN/health" | grep -q "200"; then
    log "❌ Nginx/SSL issue"
    send_alert "HTTP Status Error" "Motor Disparador returning non-200 HTTP status"
    exit 1
fi
log "✅ Nginx/SSL OK"

# Check 5: Disk space
DISK_USAGE=$(df /home/user/jacabogados | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -gt 90 ]; then
    log "⚠️  Disk usage at ${DISK_USAGE}%"
    send_alert "Disk Space Warning" "Disk usage at ${DISK_USAGE}%. Cleanup recommended."
fi

# Check 6: Memory
MEMORY_USAGE=$(free | awk 'NR==2 {printf("%d", $3/$2 * 100)}')
if [ "$MEMORY_USAGE" -gt 90 ]; then
    log "⚠️  Memory usage at ${MEMORY_USAGE}%"
    send_alert "Memory Usage Warning" "Memory usage at ${MEMORY_USAGE}%. Consider restarting."
fi

# All checks passed
log "✅ All health checks passed"
echo "✅ $(date '+%Y-%m-%d %H:%M:%S') - All systems healthy"
