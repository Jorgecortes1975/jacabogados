#!/bin/bash

# Motor Disparador Production Deployment Script
# Domain: jacabogados.co
# Updated: 2026-08-02

set -e

echo ""
echo "════════════════════════════════════════════════════════════════════════════"
echo "           MOTOR DISPARADOR - PRODUCCIÓN DEPLOYMENT JACABOGADOS.CO"
echo "════════════════════════════════════════════════════════════════════════════"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if running as root for some operations
check_root() {
    if [[ $EUID -ne 0 ]]; then
        echo -e "${YELLOW}⚠️  Some operations require sudo. You may be prompted for password.${NC}"
    fi
}

# 1. Verify prerequisites
echo -e "${GREEN}[1] Verificando prerrequisitos...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js no instalado${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js $(node -v)${NC}"

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm no instalado${NC}"
    exit 1
fi
echo -e "${GREEN}✅ npm $(npm -v)${NC}"
echo ""

# 2. Install dependencies
echo -e "${GREEN}[2] Instalando dependencias de Node...${NC}"
npm install --silent
echo -e "${GREEN}✅ Dependencias instaladas${NC}"
echo ""

# 3. Verify .env exists
echo -e "${GREEN}[3] Verificando .env...${NC}"
if [ ! -f ".claude/.env" ]; then
    echo -e "${RED}❌ .env no encontrado${NC}"
    echo "Ejecuta: cp .claude/.env.example .claude/.env"
    echo "Luego llena los valores requeridos"
    exit 1
fi

if grep -q "^TELEGRAM_BOT_TOKEN=$" .claude/.env; then
    echo -e "${YELLOW}⚠️  TELEGRAM_BOT_TOKEN vacío - necesita configuración${NC}"
fi
echo -e "${GREEN}✅ .env presente${NC}"
echo ""

# 4. Verify config files
echo -e "${GREEN}[4] Verificando archivos de configuración...${NC}"
[ -f ".claude/motor-config.json" ] && echo -e "${GREEN}✅ motor-config.json${NC}" || echo -e "${RED}❌ motor-config.json${NC}"
[ -f "ecosystem.config.js" ] && echo -e "${GREEN}✅ ecosystem.config.js${NC}" || echo -e "${RED}❌ ecosystem.config.js${NC}"
echo ""

# 5. Test system locally
echo -e "${GREEN}[5] Test de sistema en localhost...${NC}"
bash .claude/start-motor-disparador.sh > /tmp/test.log 2>&1 &
TEST_PID=$!
sleep 3

if curl -s http://localhost:3001/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Motor respondiendo en localhost:3001${NC}"
else
    echo -e "${RED}❌ Motor no responde - revisar logs${NC}"
    cat /tmp/test.log
    kill $TEST_PID 2>/dev/null || true
    exit 1
fi

# Test query
RESPONSE=$(curl -s -X POST http://localhost:3001/webhook/api \
    -H "Content-Type: application/json" \
    -d '{"userId":"test","query":"test query","requestId":"test_001"}')

if echo "$RESPONSE" | grep -q "received"; then
    echo -e "${GREEN}✅ Procesamiento de consultas funcionando${NC}"
else
    echo -e "${YELLOW}⚠️  Revisar respuesta de consulta${NC}"
fi

# Kill test processes
pkill -f "agent-trigger-engine" 2>/dev/null || true
pkill -f "webhook-dispatcher" 2>/dev/null || true
sleep 1
echo ""

# 6. SSL certificate check
echo -e "${GREEN}[6] Certificado SSL...${NC}"
if [ -f "/etc/letsencrypt/live/jacabogados.co/fullchain.pem" ]; then
    echo -e "${GREEN}✅ Certificado SSL encontrado${NC}"
    EXPIRY=$(sudo openssl x509 -enddate -noout -in /etc/letsencrypt/live/jacabogados.co/fullchain.pem | cut -d= -f2)
    echo "   Expira: $EXPIRY"
else
    echo -e "${YELLOW}⚠️  Certificado SSL no encontrado${NC}"
    echo ""
    echo "Para obtener certificado SSL:"
    echo "  sudo apt-get install certbot"
    echo "  sudo certbot certonly --standalone -d jacabogados.co"
    echo ""
fi
echo ""

# 7. PM2 setup
echo -e "${GREEN}[7] Configurando PM2...${NC}"
if command -v pm2 &> /dev/null; then
    echo -e "${GREEN}✅ PM2 instalado ($(pm2 -v))${NC}"
    echo "   Para iniciar: pm2 start ecosystem.config.js"
    echo "   Para estado: pm2 status"
    echo "   Para logs: pm2 logs"
else
    echo -e "${YELLOW}⚠️  PM2 no instalado${NC}"
    echo "   Para instalar: npm install -g pm2"
fi
echo ""

# 8. Nginx configuration
echo -e "${GREEN}[8] Configuración Nginx...${NC}"
if [ -f "/etc/nginx/sites-available/jacabogados" ]; then
    echo -e "${GREEN}✅ Nginx config presente${NC}"
else
    echo -e "${YELLOW}⚠️  Nginx config no encontrada${NC}"
    echo "   Archivo de referencia en: /tmp/jacabogados-nginx.conf"
    echo ""
fi
echo ""

# 9. Summary
echo "════════════════════════════════════════════════════════════════════════════"
echo -e "${GREEN}✅ VERIFICACIÓN COMPLETADA${NC}"
echo "════════════════════════════════════════════════════════════════════════════"
echo ""
echo "PRÓXIMOS PASOS:"
echo ""
echo "1. Verifica que .env tiene credenciales reales:"
echo "   cat .claude/.env | grep -E 'TOKEN|PASSWORD|API_KEY'"
echo ""
echo "2. Obtén certificado SSL (si no lo tienes):"
echo "   sudo certbot certonly --standalone -d jacabogados.co"
echo ""
echo "3. Configura Nginx:"
echo "   sudo cp /tmp/jacabogados-nginx.conf /etc/nginx/sites-available/jacabogados"
echo "   sudo ln -sf /etc/nginx/sites-available/jacabogados /etc/nginx/sites-enabled/"
echo "   sudo nginx -t"
echo "   sudo systemctl restart nginx"
echo ""
echo "4. Inicia Motor Disparador con PM2:"
echo "   npm install -g pm2  # Si no está instalado"
echo "   pm2 start ecosystem.config.js"
echo "   pm2 startup"
echo "   pm2 save"
echo ""
echo "5. Verifica estado:"
echo "   curl https://jacabogados.co/health"
echo "   curl https://jacabogados.co/status | jq ."
echo ""
echo "════════════════════════════════════════════════════════════════════════════"
echo ""
