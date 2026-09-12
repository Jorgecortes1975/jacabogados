# Motor Disparador - Quick Start Guide

**Domain:** jacabogados.co  
**Version:** LEXA-JAC v2.0  
**Status:** Production Ready

---

## One-Command Deployment

```bash
# Clone
git clone https://github.com/Jorgecortes1975/jacabogados.git
cd jacabogados

# Configure credentials
cp .claude/.env.example .claude/.env
nano .claude/.env

# Fill these values:
# TELEGRAM_BOT_TOKEN=
# WHATSAPP_BUSINESS_ACCOUNT_ID=
# WHATSAPP_ACCESS_TOKEN=
# WHATSAPP_PHONE_NUMBER_ID=
# EMAIL_PASSWORD=
# LEXISNEXIS_API_KEY=

# Deploy (automated - 5 minutes)
sudo bash .claude/deploy-full.sh

# Verify
curl https://jacabogados.co/health
curl https://jacabogados.co/status | jq .
```

---

## What Gets Deployed

✅ **System Packages**
- certbot (SSL)
- nginx (reverse proxy)
- jq (JSON parsing)

✅ **Node.js**
- express
- dotenv
- cors

✅ **SSL Certificate**
- Let's Encrypt automatic setup
- Auto-renewal configured

✅ **Nginx**
- HTTP→HTTPS redirect
- Reverse proxy to localhost:3001
- Security headers

✅ **PM2**
- Process management
- Auto-restart on failure
- Auto-start on reboot

✅ **Motor Disparador**
- 20 legal agents
- 60 sub-agents
- 50+ legal sources
- 24/7 standby mode

---

## Verify Deployment

```bash
# Health check
curl https://jacabogados.co/health

# Full status
curl https://jacabogados.co/status | jq .

# Check processes
pm2 status
pm2 logs

# Test query
curl -X POST https://jacabogados.co/webhook/api \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test_001",
    "query": "Despido sin justa causa",
    "requestId": "req_test_001"
  }'
```

---

## Webhooks Available

| Channel | URL |
|---------|-----|
| Telegram | `https://jacabogados.co/webhook/telegram` |
| WhatsApp | `https://jacabogados.co/webhook/whatsapp` |
| Email | `https://jacabogados.co/webhook/email` |
| API REST | `https://jacabogados.co/webhook/api` |

---

## Common Commands

```bash
# Check status
pm2 status

# View logs
pm2 logs motor-disparador-engine
pm2 logs webhook-dispatcher

# Restart all
pm2 restart all

# Stop all
pm2 stop all

# Start all
pm2 start ecosystem.config.js

# Monitor
pm2 monit
```

---

## Troubleshooting

**Motor not responding:**
```bash
pm2 logs
# Check for errors, then:
pm2 restart all
```

**SSL certificate issues:**
```bash
sudo certbot renew --dry-run
sudo systemctl restart nginx
```

**Port 3001 already in use:**
```bash
lsof -i :3001
# Kill the process, then restart:
pm2 restart all
```

**Check Nginx:**
```bash
sudo nginx -t
sudo systemctl restart nginx
sudo tail -f /var/log/nginx/jacabogados-error.log
```

---

## Support Files

- **Configuration**: `.claude/motor-config.json`
- **Credentials**: `.claude/.env` (never commit!)
- **Logs**: `.claude/logs/`
- **PM2 Config**: `ecosystem.config.js`
- **Documentation**: See `MOTOR-DISPARADOR-README.md`

---

## Next Steps

After deployment:

**Phase 2 (Week 2):**
- PostgreSQL for query persistence
- MongoDB for audit trail
- Redis for caching

**Phase 3 (Week 3):**
- Web dashboard
- Real-time metrics
- Analytics

**Phase 4 (Month 2):**
- Kubernetes
- Horizontal scaling
- Load balancing

---

**Total Setup Time:** ~5 minutes  
**Maintenance:** Minimal (auto-renewal, auto-restart)  
**Support:** See DEPLOYMENT-GUIDE.md for detailed instructions

Good luck! 🚀
