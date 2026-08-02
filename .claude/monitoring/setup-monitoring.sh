#!/bin/bash

# Motor Disparador - Setup 24/7 Monitoring
# Configures cron jobs and automated alerts

echo ""
echo "════════════════════════════════════════════════════════════════════════════"
echo "           SETUP 24/7 MONITORING - MOTOR DISPARADOR"
echo "════════════════════════════════════════════════════════════════════════════"
echo ""

# Make scripts executable
chmod +x /home/user/jacabogados/.claude/monitoring/health-check.sh
chmod +x /home/user/jacabogados/.claude/monitoring/realtime-monitor.sh

echo "✅ Scripts made executable"
echo ""

# Setup cron job for health checks
echo "Setting up cron job for health checks (every 15 minutes)..."

# Create cron job (avoid duplicates)
CRON_CMD="/home/user/jacabogados/.claude/monitoring/health-check.sh"
CRON_JOB="*/15 * * * * $CRON_CMD >> /home/user/jacabogados/.claude/logs/monitoring.log 2>&1"

# Check if cron already exists
if crontab -l 2>/dev/null | grep -q "$CRON_CMD"; then
    echo "   ℹ️  Cron job already exists"
else
    # Add cron job
    (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -
    echo "   ✅ Cron job added (every 15 minutes)"
fi

echo ""

# Test health check script
echo "Testing health check script..."
bash /home/user/jacabogados/.claude/monitoring/health-check.sh > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "   ✅ Health check test passed"
else
    echo "   ⚠️  Health check test completed with warnings (check logs)"
fi

echo ""

# Setup log rotation
echo "Setting up log rotation..."
if [ ! -f /etc/logrotate.d/motor-disparador ]; then
    cat > /tmp/motor-disparador-logrotate << 'EOF'
/home/user/jacabogados/.claude/logs/*.log {
    daily
    rotate 7
    compress
    missingok
    notifempty
    create 0640 root root
    sharedscripts
    postrotate
        pm2 restart all > /dev/null 2>&1 || true
    endscript
}
EOF

    sudo mv /tmp/motor-disparador-logrotate /etc/logrotate.d/motor-disparador
    echo "   ✅ Log rotation configured"
else
    echo "   ℹ️  Log rotation already configured"
fi

echo ""

# Display cron status
echo "════════════════════════════════════════════════════════════════════════════"
echo "✅ MONITORING SETUP COMPLETE"
echo "════════════════════════════════════════════════════════════════════════════"
echo ""
echo "Current cron jobs:"
crontab -l 2>/dev/null | grep motor-disparador || echo "   (none)"
echo ""
echo "Monitoring features enabled:"
echo "   ✅ Health checks every 15 minutes"
echo "   ✅ Automatic alerts on failure"
echo "   ✅ Auto-recovery attempts"
echo "   ✅ Email notifications to: jorge@jacabogados.co"
echo "   ✅ Log rotation (daily, 7-day retention)"
echo "   ✅ Process monitoring"
echo "   ✅ Disk/Memory warnings"
echo ""
echo "To view real-time dashboard:"
echo "   bash /home/user/jacabogados/.claude/monitoring/realtime-monitor.sh"
echo ""
echo "To view monitoring logs:"
echo "   tail -f /home/user/jacabogados/.claude/logs/monitoring.log"
echo ""
echo "To view health checks:"
echo "   tail -f /home/user/jacabogados/.claude/logs/health-check.log"
echo ""
echo "════════════════════════════════════════════════════════════════════════════"
echo ""
