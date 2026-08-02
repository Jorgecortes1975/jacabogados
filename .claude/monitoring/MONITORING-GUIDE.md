# Motor Disparador - 24/7 Monitoring Guide

**Version:** LEXA-JAC v2.0  
**Domain:** jacabogados.co  
**Alert Email:** jorge@jacabogados.co

---

## Quick Setup

```bash
# Make scripts executable
chmod +x /home/user/jacabogados/.claude/monitoring/*.sh

# Run setup (configures cron + alerts)
sudo bash /home/user/jacabogados/.claude/monitoring/setup-monitoring.sh

# View real-time dashboard
bash /home/user/jacabogados/.claude/monitoring/realtime-monitor.sh
```

---

## What Gets Monitored

### 🔴 Health Checks (Every 15 Minutes)

✅ **Health Endpoint**
- `GET https://jacabogados.co/health`
- Should return: `{"status":"ok"}`

✅ **Status Endpoint**
- `GET https://jacabogados.co/status`
- Should return LEXA-JAC system info

✅ **Processes**
- Motor Disparador engine running
- Webhook dispatcher running
- Via PM2

✅ **SSL/TLS**
- HTTPS connections working
- Certificate validity

✅ **Resources**
- Disk usage (alert if > 90%)
- Memory usage (alert if > 90%)
- CPU load

---

## Monitoring Scripts

### 1. Health Check Script
**File:** `health-check.sh`  
**Frequency:** Every 15 minutes (cron)  
**Action:** Automatic recovery + email alerts

```bash
# Manual run:
bash /home/user/jacabogados/.claude/monitoring/health-check.sh

# Automated (via cron):
*/15 * * * * bash /home/user/jacabogados/.claude/monitoring/health-check.sh
```

**What it does:**
1. Checks health endpoint
2. Checks status endpoint
3. Verifies processes running
4. Checks Nginx/SSL
5. Monitors disk space
6. Monitors memory usage
7. On failure: Attempts auto-recovery
8. Sends email alerts

### 2. Real-Time Dashboard
**File:** `realtime-monitor.sh`  
**Frequency:** Manual (interactive)  
**Display:** Live metrics, logs, commands

```bash
# Launch interactive dashboard:
bash /home/user/jacabogados/.claude/monitoring/realtime-monitor.sh

# Commands while running:
[p] - Show processes (pm2 status)
[l] - Show logs (pm2 logs)
[r] - Restart all (pm2 restart all)
[q] - Quit
```

**Displays:**
- Health status
- System status (queries, agents)
- Process status
- Resource usage (disk, memory, CPU)
- Recent activity
- Available endpoints

### 3. Setup Script
**File:** `setup-monitoring.sh`  
**Frequency:** One-time setup  
**Action:** Configures cron + log rotation

```bash
# Run once to setup monitoring:
sudo bash /home/user/jacabogados/.claude/monitoring/setup-monitoring.sh
```

**Does:**
- Makes scripts executable
- Adds cron job (every 15 min)
- Configures log rotation
- Tests health check

---

## Alerts & Notifications

### Email Alerts

Sent to: `jorge@jacabogados.co`

**Alert Types:**
1. **Health Endpoint Down**
   - Triggered: Health check fails
   - Action: Auto-restart attempt + email

2. **Status Endpoint Down**
   - Triggered: Status endpoint not responding
   - Action: Auto-restart attempt + email

3. **Processes Down**
   - Triggered: Motor engine or webhook not running
   - Action: PM2 restart + email

4. **HTTP/SSL Error**
   - Triggered: Non-200 HTTP status
   - Action: Email notification

5. **Disk Space Warning**
   - Triggered: Disk usage > 90%
   - Action: Email notification (manual cleanup)

6. **Memory Usage Warning**
   - Triggered: Memory usage > 90%
   - Action: Email notification (consider restart)

7. **Recovery Failed**
   - Triggered: Auto-recovery unsuccessful
   - Action: Email with "manual intervention required"

---

## Log Files

### Locations

```bash
# Health check logs
tail -f /home/user/jacabogados/.claude/logs/health-check.log

# Monitoring logs
tail -f /home/user/jacabogados/.claude/logs/monitoring.log

# Motor Disparador engine logs
tail -f /home/user/jacabogados/.claude/logs/engine_*.log

# Webhook dispatcher logs
tail -f /home/user/jacabogados/.claude/logs/webhook_*.log

# All logs
ls -la /home/user/jacabogados/.claude/logs/
```

### Log Rotation

Configured via `/etc/logrotate.d/motor-disparador`

- **Frequency:** Daily
- **Retention:** 7 days
- **Compression:** Yes (gzip)
- **Action:** PM2 restart after rotation

---

## Manual Commands

### Check Health
```bash
curl https://jacabogados.co/health | jq .
```

### View System Status
```bash
curl https://jacabogados.co/status | jq .
```

### PM2 Commands
```bash
# Show processes
pm2 status

# View logs
pm2 logs

# Real-time monitoring
pm2 monit

# Restart all
pm2 restart all

# Stop all
pm2 stop all

# Start all
pm2 start ecosystem.config.js
```

### View Cron Jobs
```bash
# List all cron jobs
crontab -l

# Remove specific job
crontab -e
```

### Check Resources
```bash
# Disk usage
df -h /home/user/jacabogados

# Memory usage
free -h

# CPU usage
top -bn1 | grep "Cpu(s)"

# Process details
ps aux | grep -E "node|motor|webhook"
```

---

## Alert Response Guide

### If Health Endpoint Down

**Auto-response:**
1. Script attempts PM2 restart
2. Waits 5 seconds
3. Re-checks health
4. Sends email if still down

**Manual response:**
```bash
# Check status
pm2 status
pm2 logs motor-disparador-engine

# Restart
pm2 restart all

# Verify
curl https://jacabogados.co/health
```

### If Processes Not Running

**Auto-response:**
1. Script stops and starts via PM2
2. Waits for startup
3. Re-checks health

**Manual response:**
```bash
# Restart
pm2 start ecosystem.config.js

# Check logs
pm2 logs

# If still down, check:
tail -20 /home/user/jacabogados/.claude/logs/engine_*.log
tail -20 /home/user/jacabogados/.claude/logs/webhook_*.log
```

### If Disk Space High

**Auto-response:**
- Email alert (no auto-recovery)

**Manual response:**
```bash
# Check usage
du -sh /home/user/jacabogados/*

# Clean logs (safe)
rm /home/user/jacabogados/.claude/logs/*.log.gz  # Old compressed logs
find /home/user/jacabogados/.claude/logs -name "*.log" -mtime +7 -delete

# Check npm cache
npm cache clean --force
```

### If Memory High

**Auto-response:**
- Email alert (recommendation to restart)

**Manual response:**
```bash
# Check memory usage
ps aux --sort=-%mem | head -10

# Restart Motor (will clear memory)
pm2 restart all

# Or reboot entire server (if needed)
sudo reboot
```

---

## Testing Monitoring

### Test Health Check Script
```bash
bash /home/user/jacabogados/.claude/monitoring/health-check.sh
```

### Test Email Alerts
```bash
# Manually send test email
echo "Test alert from Motor Disparador" | \
  mail -s "Test Alert" jorge@jacabogados.co
```

### Simulate Failure (for testing)
```bash
# Stop Motor Disparador
pm2 stop all

# Run health check (will trigger alert)
bash /home/user/jacabogados/.claude/monitoring/health-check.sh

# Restart
pm2 start ecosystem.config.js
```

---

## Dashboard Shortcuts

### Quick Status Check
```bash
# All in one
echo "=== HEALTH ===" && \
curl -s https://jacabogados.co/health | jq . && \
echo -e "\n=== STATUS ===" && \
curl -s https://jacabogados.co/status | jq '.sistema, .estado, .consultas_procesadas, .agentes_activados' && \
echo -e "\n=== PROCESSES ===" && \
pm2 status
```

### Watch Logs Live
```bash
# Combined logs
tail -f /home/user/jacabogados/.claude/logs/engine_*.log \
        /home/user/jacabogados/.claude/logs/webhook_*.log | \
  grep -E "ACTIVACIÓN|ERROR|CONSULTA"
```

### Monitor Metrics
```bash
# Every 10 seconds
watch -n 10 'curl -s https://jacabogados.co/status | jq . | head -20'
```

---

## Troubleshooting

### Cron Job Not Running

Check if cron is active:
```bash
sudo systemctl status cron
# or
sudo systemctl status crond
```

Re-add cron job:
```bash
(crontab -l; echo "*/15 * * * * bash /home/user/jacabogados/.claude/monitoring/health-check.sh") | crontab -
```

### Email Not Sending

Check mail service:
```bash
sudo systemctl status postfix
sudo tail -f /var/log/mail.log
```

### Logs Not Rotating

Check logrotate:
```bash
sudo logrotate -f /etc/logrotate.d/motor-disparador
sudo cat /var/lib/logrotate/status | grep motor
```

### High CPU on health-check.sh

The script uses curl with 5-second timeout. If frequent timeouts occur:
- Check network connectivity
- Check if Motor is overloaded
- Check if Nginx is responding

---

## Configuration

### Change Alert Email
Edit health-check.sh:
```bash
ALERT_EMAIL="your-email@jacabogados.co"
```

### Change Check Frequency
Edit crontab:
```bash
# Every 5 minutes (more aggressive)
*/5 * * * * bash /home/user/jacabogados/.claude/monitoring/health-check.sh

# Every 30 minutes (less frequent)
*/30 * * * * bash /home/user/jacabogados/.claude/monitoring/health-check.sh
```

### Change Resource Thresholds
Edit health-check.sh:
```bash
# Disk warning threshold (currently 90%)
if [ "$DISK_USAGE" -gt 90 ]; then

# Memory warning threshold (currently 90%)
if [ "$MEMORY_USAGE" -gt 90 ]; then
```

---

## Summary

✅ **Health checks every 15 minutes**  
✅ **Automatic email alerts**  
✅ **Auto-recovery attempts**  
✅ **Real-time dashboard available**  
✅ **Log rotation configured**  
✅ **Resource monitoring active**  

System is monitored 24/7 with automatic response to failures.

For support: jorge@jacabogados.co
