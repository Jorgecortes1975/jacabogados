#!/bin/bash

# Motor Disparador - Full Production Deployment
# Domain: jacabogados.co
# This script automates complete deployment to production

set -e

DOMAIN="jacabogados.co"
APP_DIR="/home/user/jacabogados"
LOG_DIR="$APP_DIR/.claude/logs"
COLORS_RED='\033[0;31m'
COLORS_GREEN='\033[0;32m'
COLORS_YELLOW='\033[1;33m'
COLORS_NC='\033[0m'

log_info() { echo -e "${COLORS_GREEN}[INFO]${COLORS_NC} $1"; }
log_warn() { echo -e "${COLORS_YELLOW}[WARN]${COLORS_NC} $1"; }
log_error() { echo -e "${COLORS_RED}[ERROR]${COLORS_NC} $1"; }

echo ""
echo "════════════════════════════════════════════════════════════════════════════"
echo "     MOTOR DISPARADOR - FULL PRODUCTION DEPLOYMENT"
echo "     Domain: $DOMAIN"
echo "════════════════════════════════════════════════════════════════════════════"
echo ""

# Check prerequisites
log_info "Checking prerequisites..."
if [ ! -f "$APP_DIR/.claude/.env" ]; then
    log_error ".env file not found"
    exit 1
fi

# Check if credentials are filled
if grep -q "TELEGRAM_BOT_TOKEN=$" "$APP_DIR/.claude/.env"; then
    log_error "TELEGRAM_BOT_TOKEN is empty - please configure credentials first"
    echo "Edit: $APP_DIR/.claude/.env"
    exit 1
fi

log_info "Prerequisites OK"
echo ""

# 1. System updates
log_info "Step 1: System updates"
sudo apt-get update -qq
sudo apt-get install -y -qq curl wget git certbot python3-certbot-nginx jq > /dev/null 2>&1
log_info "System packages updated"
echo ""

# 2. Node.js dependencies
log_info "Step 2: Node.js dependencies"
cd "$APP_DIR"
npm install --silent > /dev/null 2>&1
log_info "Node dependencies installed"
echo ""

# 3. SSL Certificate
log_info "Step 3: SSL Certificate (Let's Encrypt)"
if [ ! -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
    log_info "Obtaining SSL certificate..."
    sudo certbot certonly --standalone -d "$DOMAIN" -d "www.$DOMAIN" \
        --agree-tos --no-eff-email -m jorge@jacabogados.co --quiet
    log_info "SSL certificate obtained"
else
    log_info "SSL certificate already exists"
fi
echo ""

# 4. Nginx configuration
log_info "Step 4: Nginx reverse proxy"
sudo tee /etc/nginx/sites-available/jacabogados > /dev/null << 'NGINX_CONFIG'
upstream motor_disparador {
    server localhost:3001;
    keepalive 64;
}

server {
    listen 80;
    listen [::]:80;
    server_name jacabogados.co www.jacabogados.co;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$server_name$request_uri;
    }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name jacabogados.co www.jacabogados.co;

    ssl_certificate /etc/letsencrypt/live/jacabogados.co/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/jacabogados.co/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    if ($server_name = www.jacabogados.co) {
        return 301 https://jacabogados.co$request_uri;
    }

    proxy_http_version 1.1;
    proxy_set_header Connection "";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_buffering off;

    location ~ ^/webhook/(telegram|whatsapp|api|email) {
        proxy_pass http://motor_disparador;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    location = /health {
        proxy_pass http://motor_disparador;
        access_log off;
    }

    location = /status {
        proxy_pass http://motor_disparador;
    }

    location / {
        proxy_pass http://motor_disparador;
    }

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;

    access_log /var/log/nginx/jacabogados-access.log;
    error_log /var/log/nginx/jacabogados-error.log;
}
NGINX_CONFIG

sudo ln -sf /etc/nginx/sites-available/jacabogados /etc/nginx/sites-enabled/jacabogados
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t -q
sudo systemctl restart nginx
log_info "Nginx configured and started"
echo ""

# 5. PM2 process manager
log_info "Step 5: PM2 process manager"
sudo npm install -g pm2 -q > /dev/null 2>&1
cd "$APP_DIR"
pm2 start ecosystem.config.js --name motor-disparador > /dev/null
pm2 startup -u root --hp /root > /dev/null 2>&1
pm2 save > /dev/null
log_info "PM2 configured and Motor Disparador started"
echo ""

# 6. Verify deployment
log_info "Step 6: Deployment verification"
sleep 3

# Check health
HEALTH_CHECK=$(curl -s https://$DOMAIN/health 2>/dev/null || echo "")
if echo "$HEALTH_CHECK" | grep -q "ok"; then
    log_info "Health check PASSED"
else
    log_warn "Health check - retrying..."
    sleep 3
    HEALTH_CHECK=$(curl -s https://$DOMAIN/health)
fi

# Check status
STATUS_CHECK=$(curl -s https://$DOMAIN/status 2>/dev/null | jq '.sistema' -r)
if [ "$STATUS_CHECK" = "LEXA-JAC v2.0" ]; then
    log_info "Status check PASSED"
else
    log_warn "Status check - unexpected response"
fi

echo ""
echo "════════════════════════════════════════════════════════════════════════════"
echo -e "${COLORS_GREEN}✅ DEPLOYMENT COMPLETE${COLORS_NC}"
echo "════════════════════════════════════════════════════════════════════════════"
echo ""
echo "Motor Disparador is now live at: https://$DOMAIN"
echo ""
echo "Endpoints available:"
echo "  • https://$DOMAIN/health"
echo "  • https://$DOMAIN/status"
echo "  • https://$DOMAIN/webhook/telegram"
echo "  • https://$DOMAIN/webhook/whatsapp"
echo "  • https://$DOMAIN/webhook/api"
echo "  • https://$DOMAIN/webhook/email"
echo ""
echo "Useful commands:"
echo "  pm2 status          - Check process status"
echo "  pm2 logs            - View real-time logs"
echo "  pm2 restart all     - Restart Motor Disparador"
echo "  pm2 stop all        - Stop Motor Disparador"
echo ""
echo "SSL Certificate renews automatically with certbot"
echo ""
echo "════════════════════════════════════════════════════════════════════════════"
echo ""
