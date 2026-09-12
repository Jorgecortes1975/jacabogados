# Motor Disparador — Production Deployment Guide

**Setup complete and ready for real-world activation**

## ✅ Prerequisites

- Node.js 16+ installed
- Server with public IP or domain (for webhooks)
- SSL certificate for HTTPS (Let's Encrypt recommended)
- PM2 or systemd for process management

## 🔐 Step 1: Secure Credential Setup

### 1.1 Create Environment File

```bash
cd .claude
cp .env.example .env
chmod 600 .env
```

### 1.2 Fill in Credentials

Edit `.env` with real credentials (see section below for how to get each one):

```bash
nano .env
```

**IMPORTANT:** Never commit `.env` to version control!

### 1.3 Add to .gitignore

```bash
echo ".env" >> ../../.gitignore
git add .gitignore
git commit -m "Add .env to gitignore"
```

---

## 📋 Step 2: Obtain Credentials

### Telegram Bot Token

1. Open Telegram and search for **@BotFather**
2. Send `/newbot` command
3. Follow prompts to create bot
4. Copy bot token (looks like: `123456789:ABCDEFGHIJKLmnopqrstuvwxyz`)
5. Paste in `.env`: `TELEGRAM_BOT_TOKEN=<token>`

### WhatsApp Business API

1. Go to https://developers.facebook.com/
2. Create app → WhatsApp Business
3. Get **Business Account ID**, **Access Token**, **Phone Number ID**
4. Paste in `.env`:
   ```
   WHATSAPP_BUSINESS_ACCOUNT_ID=<account_id>
   WHATSAPP_ACCESS_TOKEN=<token>
   WHATSAPP_PHONE_NUMBER_ID=<phone_id>
   ```

### Email (Gmail)

1. Enable 2-Factor Authentication on Gmail
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Paste in `.env`:
   ```
   EMAIL_ADDRESS=consultas@jacabogados.co
   EMAIL_PASSWORD=<16-char-app-password>
   ```

### LexisNexis API

1. Contact LexisNexis Colombia sales
2. Request API access for legal research
3. Get API key from account dashboard
4. Paste in `.env`: `LEXISNEXIS_API_KEY=<key>`

### Legal Data Hunter

1. Go to https://www.legaldatahunter.com/
2. Sign up for account
3. Generate API key in settings
4. Paste in `.env`: `LEGAL_DATA_HUNTER_API_KEY=<key>`

---

## 🚀 Step 3: Configure for Production

### 3.1 Update Motor Config

Create production config from template:

```bash
cp motor-config-template.json motor-config.json
```

Edit `motor-config.json` and enable integrations:

```json
{
  "integraciones": {
    "telegram": {
      "habilitado": true,
      "bot_token": "${TELEGRAM_BOT_TOKEN}",
      "webhook_url": "https://jacabogados.co/webhook/telegram"
    },
    "whatsapp": {
      "habilitado": true,
      "access_token": "${WHATSAPP_ACCESS_TOKEN}"
    },
    "email": {
      "habilitado": true,
      "email_address": "${EMAIL_ADDRESS}",
      "password": "${EMAIL_PASSWORD}"
    },
    "api_rest": {
      "habilitado": true,
      "puerto": 3001
    }
  }
}
```

### 3.2 Set Domain and SSL

Replace `https://jacabogados.co` with your actual domain:

```bash
# Update webhook URLs
sed -i 's/jacabogados.co/your-domain.com/g' motor-config.json

# Set up SSL with Let's Encrypt
sudo certbot certonly --standalone -d your-domain.com
```

---

## 🔧 Step 4: Setup Process Management

### Option A: Using PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Create PM2 ecosystem config
cat > ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: 'motor-disparador-engine',
      script: './.claude/agent-trigger-engine.js',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production'
      },
      error_file: './.claude/logs/engine-error.log',
      out_file: './.claude/logs/engine-out.log',
      log_file: './.claude/logs/engine-combined.log',
      time_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true
    },
    {
      name: 'webhook-dispatcher',
      script: './.claude/webhook-dispatcher.js',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      error_file: './.claude/logs/webhook-error.log',
      out_file: './.claude/logs/webhook-out.log',
      log_file: './.claude/logs/webhook-combined.log',
      time_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true
    }
  ]
};
EOF

# Start motor disparador
pm2 start ecosystem.config.js

# Make it start on reboot
pm2 startup
pm2 save
```

### Option B: Using systemd

Create `/etc/systemd/system/motor-disparador.service`:

```ini
[Unit]
Description=Motor Disparador de Agentes - LEXA-JAC v2.0
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/home/user/jacabogados
EnvironmentFile=/home/user/jacabogados/.claude/.env
ExecStart=/usr/bin/node /home/user/jacabogados/.claude/start-motor-disparador.sh
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOF

# Enable and start
sudo systemctl enable motor-disparador
sudo systemctl start motor-disparador
sudo systemctl status motor-disparador
```

---

## 🌐 Step 5: Configure Reverse Proxy

### Nginx Configuration

```nginx
upstream motor_disparador {
    server localhost:3001;
}

server {
    listen 80;
    server_name jacabogados.co;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name jacabogados.co;

    ssl_certificate /etc/letsencrypt/live/jacabogados.co/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/jacabogados.co/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location /webhook/ {
        proxy_pass http://motor_disparador;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /health {
        proxy_pass http://motor_disparador;
    }

    location /status {
        proxy_pass http://motor_disparador;
    }
}
```

---

## 📊 Step 6: Setup Monitoring

### Monitor Logs

```bash
# Real-time engine logs
tail -f .claude/logs/engine_*.log

# Real-time webhook logs
tail -f .claude/logs/webhook_*.log

# All logs with grep
tail -f .claude/logs/*.log | grep "ACTIVACIÓN\|ERROR\|CONSULTA"
```

### Health Checks

```bash
# Check health endpoint (runs every 30 seconds via cron)
*/30 * * * * curl -s https://jacabogados.co/health | jq -e '.status == "ok"' || alert

# Check status endpoint
curl https://jacabogados.co/status | jq '.agentes_estado | to_entries | .[] | select(.value.estado == "active")'
```

### Setup Alerts

Create `/home/user/jacabogados/.claude/health-check.sh`:

```bash
#!/bin/bash
HEALTH=$(curl -s http://localhost:3001/health)
if [ $? -ne 0 ]; then
  echo "Motor disparador health check FAILED" | mail -s "ALERT: Motor Disparador Down" jorge@jacabogados.co
fi
```

Add to crontab:
```bash
crontab -e
# */5 * * * * bash /home/user/jacabogados/.claude/health-check.sh
```

---

## ✅ Step 7: Deployment Checklist

### Pre-Deployment
- [ ] Node.js 16+ installed
- [ ] SSL certificate obtained
- [ ] Domain configured and DNS propagated
- [ ] Credentials obtained for all services
- [ ] `.env` file created and filled
- [ ] `motor-config.json` updated with domain
- [ ] Process manager configured (PM2 or systemd)
- [ ] Reverse proxy configured (Nginx)
- [ ] Health check script created
- [ ] Monitoring/logging configured

### Deployment
```bash
# Start motor disparador
pm2 start ecosystem.config.js
# OR
sudo systemctl start motor-disparador

# Verify services are running
curl https://jacabogados.co/health
curl https://jacabogados.co/status

# Check logs
tail -f .claude/logs/engine_*.log
tail -f .claude/logs/webhook_*.log
```

### Post-Deployment
- [ ] Motor disparador responding to requests
- [ ] Webhook endpoints accessible from internet
- [ ] Telegram bot receiving queries
- [ ] WhatsApp Business receiving messages
- [ ] Email polling working
- [ ] All 20 agents in standby status
- [ ] Metrics showing queries processed
- [ ] Audit trail recording actions
- [ ] SSL certificate valid (check with: `curl -vI https://jacabogados.co/health`)

---

## 🧪 Step 8: Test Real Queries

### Test via API
```bash
curl -X POST https://jacabogados.co/webhook/api \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test_001",
    "query": "Fui despedido sin justa causa",
    "requestId": "req_001"
  }'
```

### Test via Telegram
1. Message your bot: "Necesito constituir una SAS"
2. Check logs for automatic agent activation
3. Verify system status: `curl https://jacabogados.co/status`

### Test via Email
1. Send email to `consultas@jacabogados.co`
2. System should process within 60 seconds
3. Check status endpoint for agent activation

---

## 📈 Step 9: Scale for Production

### Database Setup (Phase 2)
```bash
# PostgreSQL for persistent queries
docker run -d --name motor-postgres \
  -e POSTGRES_PASSWORD=secure_password \
  -v postgres_data:/var/lib/postgresql/data \
  postgres:14

# MongoDB for audit trail
docker run -d --name motor-mongo \
  -v mongo_data:/data/db \
  mongo:5.0

# Redis for caching
docker run -d --name motor-redis \
  -v redis_data:/data \
  redis:7.0
```

### Kubernetes Deployment (Phase 3)
```bash
kubectl apply -f k8s/motor-disparador-deployment.yaml
kubectl apply -f k8s/webhook-dispatcher-service.yaml
kubectl apply -f k8s/motor-config-configmap.yaml
```

---

## 🚨 Troubleshooting

### Motor not responding
```bash
# Check if processes are running
pm2 list
ps aux | grep -E "agent-trigger|webhook-dispatcher"

# Restart
pm2 restart all
# OR
sudo systemctl restart motor-disparador
```

### High latency
```bash
# Check logs for slow queries
grep "TIEMPO\|latencia" .claude/logs/engine_*.log

# Check server resources
top
df -h
free -m
```

### Webhook not receiving
```bash
# Verify URL is accessible
curl -v https://jacabogados.co/webhook/api

# Check firewall
sudo iptables -L | grep 3001
sudo ufw status
```

### Credentials not working
```bash
# Verify .env is loaded
echo $TELEGRAM_BOT_TOKEN

# Test credential
curl -X GET "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe"
```

---

## 📞 Support

- **Technical Issues:** devops@jacabogados.co
- **Legal Questions:** legal@jacabogados.co
- **Operations:** jorge@jacabogados.co
- **Slack Channel:** #jac-operations

---

**Document:** DEPLOYMENT-GUIDE.md  
**Version:** LEXA-JAC v2.0  
**Status:** Production Ready
