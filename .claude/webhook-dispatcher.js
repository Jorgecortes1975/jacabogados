#!/usr/bin/env node

/**
 * WEBHOOK DISPATCHER — LEXA-JAC v2.0
 *
 * Recibe consultas de múltiples fuentes (Telegram, Email, API, WhatsApp)
 * y dispara automáticamente el agente especializado correcto
 *
 * Flujo:
 * [Telegram/Email/API/WhatsApp] → [Webhook] → [Clasificar] → [Disparar Agente]
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const AgentTriggerEngine = require('./agent-trigger-engine');

class WebhookDispatcher {
  constructor(port = 3001) {
    this.port = port;
    this.engine = new AgentTriggerEngine();
    this.requestLog = [];

    this.server = http.createServer((req, res) => {
      this.handleRequest(req, res);
    });
  }

  handleRequest(req, res) {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Content-Type', 'application/json');

    // Preflight
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    // Rutas
    if (req.url === '/health' && req.method === 'GET') {
      this.handleHealth(res);
    } else if (req.url === '/webhook/telegram' && req.method === 'POST') {
      this.handleTelegramWebhook(req, res);
    } else if (req.url === '/webhook/email' && req.method === 'POST') {
      this.handleEmailWebhook(req, res);
    } else if (req.url === '/webhook/api' && req.method === 'POST') {
      this.handleAPIWebhook(req, res);
    } else if (req.url === '/webhook/whatsapp' && req.method === 'POST') {
      this.handleWhatsAppWebhook(req, res);
    } else if (req.url === '/status' && req.method === 'GET') {
      this.handleStatus(res);
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
    }
  }

  readBody(req, callback) {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    req.on('end', () => {
      try {
        callback(JSON.parse(data));
      } catch (e) {
        callback(null);
      }
    });
  }

  handleHealth(res) {
    res.writeHead(200);
    res.end(JSON.stringify({
      status: 'ok',
      service: 'webhook-dispatcher',
      timestamp: new Date().toISOString()
    }));
  }

  handleTelegramWebhook(req, res) {
    this.readBody(req, (body) => {
      if (!body || !body.message) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Formato Telegram inválido' }));
        return;
      }

      const query = {
        source: 'telegram',
        userId: body.message.from.id,
        message: body.message.text,
        chatId: body.message.chat.id
      };

      console.log(`\n📱 [TELEGRAM] Mensaje de @${body.message.from.username}`);
      this.engine.handleWebhook(query);

      res.writeHead(200);
      res.end(JSON.stringify({ status: 'received' }));
    });
  }

  handleEmailWebhook(req, res) {
    this.readBody(req, (body) => {
      if (!body || !body.subject || !body.body) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Formato Email inválido' }));
        return;
      }

      const query = {
        source: 'email',
        userId: body.from,
        message: `${body.subject}\n${body.body}`,
        emailId: body.messageId
      };

      console.log(`\n📧 [EMAIL] De: ${body.from}`);
      this.engine.handleWebhook(query);

      res.writeHead(200);
      res.end(JSON.stringify({ status: 'received' }));
    });
  }

  handleAPIWebhook(req, res) {
    this.readBody(req, (body) => {
      if (!body || !body.query) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Formato API inválido' }));
        return;
      }

      const query = {
        source: 'api',
        userId: body.userId || 'api_user',
        message: body.query,
        requestId: body.requestId
      };

      console.log(`\n🔌 [API] Consulta recibida`);
      this.engine.handleWebhook(query);

      res.writeHead(200);
      res.end(JSON.stringify({ status: 'received', processId: query.requestId }));
    });
  }

  handleWhatsAppWebhook(req, res) {
    this.readBody(req, (body) => {
      if (!body || !body.messages) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Formato WhatsApp inválido' }));
        return;
      }

      body.messages.forEach(msg => {
        const query = {
          source: 'whatsapp',
          userId: msg.from,
          message: msg.text.body,
          messageId: msg.id
        };

        console.log(`\n💬 [WHATSAPP] De: ${msg.from}`);
        this.engine.handleWebhook(query);
      });

      res.writeHead(200);
      res.end(JSON.stringify({ status: 'received' }));
    });
  }

  handleStatus(res) {
    const agentStatus = this.engine.getAgentStatus();

    res.writeHead(200);
    res.end(JSON.stringify({
      sistema: 'LEXA-JAC v2.0',
      estado: '🟢 OPERATIVO',
      consultas_procesadas: this.engine.metrics.queriesProcessed,
      agentes_activados: this.engine.metrics.agentsActivated,
      agentes_estado: agentStatus,
      timestamp: new Date().toISOString()
    }));
  }

  start() {
    this.server.listen(this.port, () => {
      console.log(`\n╔════════════════════════════════════════════════════════════════════════════╗`);
      console.log(`║                                                                            ║`);
      console.log(`║          📡 WEBHOOK DISPATCHER — ACTIVACIÓN AUTOMÁTICA DE AGENTES         ║`);
      console.log(`║                                                                            ║`);
      console.log(`║                       🟢 SISTEMA EN LÍNEA Y ESCUCHANDO                   ║`);
      console.log(`║                                                                            ║`);
      console.log(`╚════════════════════════════════════════════════════════════════════════════╝\n`);

      console.log('🔊 WEBHOOKS ACTIVOS:\n');
      console.log(`  📱 Telegram:     http://localhost:${this.port}/webhook/telegram`);
      console.log(`  📧 Email:        http://localhost:${this.port}/webhook/email`);
      console.log(`  🔌 API REST:     http://localhost:${this.port}/webhook/api`);
      console.log(`  💬 WhatsApp:     http://localhost:${this.port}/webhook/whatsapp`);
      console.log(`\n📊 Status:        http://localhost:${this.port}/status`);
      console.log(`💓 Health:        http://localhost:${this.port}/health\n`);

      console.log('════════════════════════════════════════════════════════════════════════════\n');

      console.log('🟢 MOTOR DISPARADOR: ESCUCHANDO CONSULTAS ENTRANTES\n');
      console.log('Aguardando consultas de cualquier fuente...\n');
    });
  }

  stop() {
    this.server.close(() => {
      console.log('\n🛑 Webhook Dispatcher Detenido');
      process.exit(0);
    });
  }
}

// Ejecutar si se invoca directamente
if (require.main === module) {
  const dispatcher = new WebhookDispatcher(3001);
  dispatcher.start();

  process.on('SIGINT', () => {
    dispatcher.stop();
  });
}

module.exports = WebhookDispatcher;
