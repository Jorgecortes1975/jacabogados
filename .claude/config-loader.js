#!/usr/bin/env node

/**
 * Configuration Loader — LEXA-JAC v2.0
 *
 * Loads motor-disparador configuration from:
 * 1. Environment variables (.env)
 * 2. motor-config.json
 * 3. Default values
 *
 * Prioritizes environment variables over file config (for production secrets)
 */

const fs = require('fs');
const path = require('path');

class ConfigLoader {
  constructor() {
    this.config = {};
    this.loadConfig();
  }

  loadConfig() {
    // Load JSON config
    const configPath = path.join(__dirname, 'motor-config.json');
    if (fs.existsSync(configPath)) {
      try {
        this.config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      } catch (e) {
        console.error('Error loading motor-config.json:', e.message);
      }
    }

    // Override with environment variables
    this.loadEnvVariables();

    return this.config;
  }

  loadEnvVariables() {
    // Integraciones
    if (process.env.TELEGRAM_BOT_TOKEN) {
      this.config.integraciones = this.config.integraciones || {};
      this.config.integraciones.telegram = this.config.integraciones.telegram || {};
      this.config.integraciones.telegram.bot_token = process.env.TELEGRAM_BOT_TOKEN;
      this.config.integraciones.telegram.habilitado = true;
    }

    if (process.env.WHATSAPP_ACCESS_TOKEN) {
      this.config.integraciones = this.config.integraciones || {};
      this.config.integraciones.whatsapp = this.config.integraciones.whatsapp || {};
      this.config.integraciones.whatsapp.access_token = process.env.WHATSAPP_ACCESS_TOKEN;
      this.config.integraciones.whatsapp.business_account_id = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID;
      this.config.integraciones.whatsapp.phone_number_id = process.env.WHATSAPP_PHONE_NUMBER_ID;
      this.config.integraciones.whatsapp.habilitado = true;
    }

    if (process.env.EMAIL_PASSWORD) {
      this.config.integraciones = this.config.integraciones || {};
      this.config.integraciones.email = this.config.integraciones.email || {};
      this.config.integraciones.email.email_address = process.env.EMAIL_ADDRESS || 'consultas@jacabogados.co';
      this.config.integraciones.email.password = process.env.EMAIL_PASSWORD;
      this.config.integraciones.email.imap_server = process.env.IMAP_SERVER || 'imap.gmail.com';
      this.config.integraciones.email.imap_port = parseInt(process.env.IMAP_PORT || '993');
      this.config.integraciones.email.habilitado = true;
    }

    if (process.env.API_PORT) {
      this.config.integraciones = this.config.integraciones || {};
      this.config.integraciones.api_rest = this.config.integraciones.api_rest || {};
      this.config.integraciones.api_rest.puerto = parseInt(process.env.API_PORT);
      this.config.integraciones.api_rest.habilitado = true;
    }

    // Fuentes jurídicas
    if (process.env.LEXISNEXIS_API_KEY) {
      this.config.fuentes_juridicas = this.config.fuentes_juridicas || {};
      this.config.fuentes_juridicas.lexisnexis = this.config.fuentes_juridicas.lexisnexis || {};
      this.config.fuentes_juridicas.lexisnexis.api_key = process.env.LEXISNEXIS_API_KEY;
      this.config.fuentes_juridicas.lexisnexis.habilitado = true;
    }

    if (process.env.LEGAL_DATA_HUNTER_API_KEY) {
      this.config.fuentes_juridicas = this.config.fuentes_juridicas || {};
      this.config.fuentes_juridicas.legal_data_hunter = this.config.fuentes_juridicas.legal_data_hunter || {};
      this.config.fuentes_juridicas.legal_data_hunter.api_key = process.env.LEGAL_DATA_HUNTER_API_KEY;
      this.config.fuentes_juridicas.legal_data_hunter.habilitado = true;
    }

    // Validación JAC
    if (process.env.JORGE_CORTES_EMAIL) {
      this.config.validacion_jac = this.config.validacion_jac || {};
      this.config.validacion_jac.jorge_cortes_email = process.env.JORGE_CORTES_EMAIL;
    }

    // Node environment
    this.config.node_env = process.env.NODE_ENV || 'production';
    this.config.log_level = process.env.LOG_LEVEL || 'info';

    return this.config;
  }

  get(path, defaultValue) {
    const keys = path.split('.');
    let value = this.config;

    for (const key of keys) {
      value = value[key];
      if (value === undefined) {
        return defaultValue;
      }
    }

    return value;
  }

  validate() {
    const errors = [];

    // Validar que al menos una integración esté habilitada
    const integrations = this.config.integraciones || {};
    const hasIntegration = Object.values(integrations).some(i => i.habilitado);
    if (!hasIntegration) {
      errors.push('Warning: No integrations enabled. API REST is enabled by default.');
    }

    // Validar puerto API
    const apiPort = this.get('integraciones.api_rest.puerto', 3001);
    if (apiPort < 1024 || apiPort > 65535) {
      errors.push(`Invalid API port: ${apiPort}`);
    }

    // Validar si Telegram está habilitado pero falta token
    if (integrations.telegram && integrations.telegram.habilitado) {
      if (!integrations.telegram.bot_token || integrations.telegram.bot_token.includes('YOUR_')) {
        errors.push('Telegram enabled but bot_token not configured');
      }
    }

    if (errors.length > 0) {
      console.error('\n⚠️  Configuration Validation Errors:\n');
      errors.forEach(err => console.error(`  • ${err}`));
      console.error('\nSee DEPLOYMENT-GUIDE.md for instructions.\n');
    }

    return errors.length === 0;
  }

  print() {
    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║                  MOTOR DISPARADOR — CONFIGURACIÓN              ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    console.log('🔧 INTEGRACIONES:\n');
    const integrations = this.config.integraciones || {};
    for (const [name, config] of Object.entries(integrations)) {
      const status = config.habilitado ? '✅' : '❌';
      console.log(`  ${status} ${name.toUpperCase()}`);
      if (config.habilitado) {
        if (config.bot_token) console.log(`     Token: ${config.bot_token.substring(0, 10)}...`);
        if (config.email_address) console.log(`     Email: ${config.email_address}`);
        if (config.puerto) console.log(`     Port: ${config.puerto}`);
      }
    }

    console.log('\n📚 FUENTES JURÍDICAS:\n');
    const sources = this.config.fuentes_juridicas || {};
    for (const [name, config] of Object.entries(sources)) {
      const status = config.habilitado ? '✅' : '❌';
      console.log(`  ${status} ${name}`);
    }

    console.log('\n🔐 VALIDACIÓN JAC:\n');
    const jac = this.config.validacion_jac || {};
    console.log(`  Nivel 1 (Automático): ${jac.nivel_1_automatico ? '✅' : '❌'}`);
    console.log(`  Nivel 2 (Especialista): ${jac.nivel_2_especialista ? '✅' : '❌'}`);
    console.log(`  Nivel 3 (Firma Digital): ${jac.nivel_3_firma_digital ? '✅' : '❌'}`);
    console.log(`  Contact: ${jac.jorge_cortes_email}\n`);

    console.log('🤖 AGENTES:\n');
    const agents = this.config.agentes || {};
    console.log(`  Pool Size: ${agents.pool_size}/20`);
    console.log(`  Sub-agentes: ${agents.subagentes_por_rama} per branch`);
    console.log(`  Standby: ${agents.standby_permanente ? '24/7 ✅' : '❌'}\n`);

    console.log('════════════════════════════════════════════════════════════════\n');
  }
}

// Export for use as module
module.exports = ConfigLoader;

// Run standalone config check
if (require.main === module) {
  const loader = new ConfigLoader();
  loader.print();

  if (!loader.validate()) {
    process.exit(1);
  }

  console.log('✅ Configuración válida\n');
}
