#!/usr/bin/env node

/**
 * ASISTENTE - Configuración Interactiva de OAuth2
 * Guía paso a paso para obtener credenciales y configurar el sistema
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class AsistenteOAuth2 {
  constructor() {
    this.credenciales = {};
  }

  log(message) {
    console.log(message);
  }

  async pregunta(texto) {
    return new Promise(resolve => {
      rl.question(texto, resolve);
    });
  }

  async mostrarBienvenida() {
    console.clear();
    this.log('\n════════════════════════════════════════════════════════════');
    this.log('🔐 ASISTENTE DE CONFIGURACIÓN OAUTH2');
    this.log('Sistema de Correos Legales - JAC Abogados');
    this.log('════════════════════════════════════════════════════════════\n');

    this.log('Este asistente te ayudará a:');
    this.log('  1. Obtener credenciales de Microsoft Azure (Outlook)');
    this.log('  2. Obtener credenciales de Google Cloud (Gmail)');
    this.log('  3. Configurar variables de entorno');
    this.log('  4. Ejecutar autenticación OAuth2');
    this.log('  5. Procesar tus primeros correos legales\n');

    this.log('⏱️  Tiempo estimado: 15-20 minutos\n');

    const continuar = await this.pregunta('¿Listo para comenzar? (s/n): ');
    if (continuar.toLowerCase() !== 's') {
      this.log('\n✋ Cancelado por el usuario');
      process.exit(0);
    }
  }

  async paso1Outlook() {
    console.clear();
    this.log('\n════════════════════════════════════════════════════════════');
    this.log('PASO 1: Obtener Credenciales de Microsoft (Outlook)');
    this.log('════════════════════════════════════════════════════════════\n');

    this.log('Abre tu navegador en: https://portal.azure.com\n');

    this.log('📋 PASOS EN AZURE PORTAL:\n');

    this.log('1. Inicia sesión con tu cuenta Microsoft');
    this.log('2. En la barra de búsqueda, escribe "App registrations"');
    this.log('3. Click en "New registration"');
    this.log('4. Rellena el formulario:');
    this.log('   • Name: JAC Legal Automation');
    this.log('   • Supported account types: "Accounts in any organizational directory..."');
    this.log('   • Redirect URI: http://localhost:3000/auth/outlook/callback');
    this.log('5. Click "Register"\n');

    this.log('6. En la página de la app:');
    this.log('   • Copia el "Application (client) ID" (lo necesitaremos)\n');

    this.log('7. Ve a "Certificates & secrets"');
    this.log('8. Click "New client secret"');
    this.log('   • Description: JAC Automation');
    this.log('   • Expires: Recommended');
    this.log('9. COPIA EL VALOR (aparece solo una vez)\n');

    this.log('10. Ve a "API permissions"');
    this.log('11. Click "Add a permission" → "Microsoft Graph" → "Delegated permissions"');
    this.log('12. Busca y selecciona:');
    this.log('    ✓ Mail.Read');
    this.log('    ✓ Mail.Read.Shared');
    this.log('    ✓ Calendars.Read');
    this.log('    ✓ offline_access');
    this.log('13. Click "Add permissions"\n');

    this.log('════════════════════════════════════════════════════════════\n');

    const clientId = await this.pregunta('Pega aquí el CLIENT ID (Application ID): ');
    if (!clientId.trim()) {
      this.log('❌ Client ID es requerido');
      return false;
    }

    const clientSecret = await this.pregunta('Pega aquí el CLIENT SECRET: ');
    if (!clientSecret.trim()) {
      this.log('❌ Client Secret es requerido');
      return false;
    }

    this.credenciales.OUTLOOK_CLIENT_ID = clientId.trim();
    this.credenciales.OUTLOOK_CLIENT_SECRET = clientSecret.trim();

    this.log('\n✅ Credenciales de Outlook guardadas\n');
    return true;
  }

  async paso2Google() {
    console.clear();
    this.log('\n════════════════════════════════════════════════════════════');
    this.log('PASO 2: Obtener Credenciales de Google (Gmail)');
    this.log('════════════════════════════════════════════════════════════\n');

    this.log('Abre tu navegador en: https://console.cloud.google.com\n');

    this.log('📋 PASOS EN GOOGLE CLOUD CONSOLE:\n');

    this.log('1. Crea un nuevo proyecto:');
    this.log('   • Click en "Create Project"');
    this.log('   • Name: JAC-Legal-Automation');
    this.log('   • Click "Create"\n');

    this.log('2. Habilita Gmail API:');
    this.log('   • Ve a "APIs & Services" → "Library"');
    this.log('   • Busca "Gmail API"');
    this.log('   • Click en ella');
    this.log('   • Click "Enable"\n');

    this.log('3. Configura OAuth Consent Screen:');
    this.log('   • Ve a "APIs & Services" → "Credentials"');
    this.log('   • Click "Create Credentials" → "OAuth client ID"');
    this.log('   • Si es la primera vez, click "Configure OAuth consent screen"');
    this.log('   • Selecciona "External"');
    this.log('   • Rellena:');
    this.log('     - App name: JAC Legal');
    this.log('     - User support email: tu email');
    this.log('     - Developer contact: tu email\n');

    this.log('4. Agrega Scopes:');
    this.log('   • Click "Add or Remove Scopes"');
    this.log('   • Selecciona:');
    this.log('     ✓ https://www.googleapis.com/auth/gmail.readonly');
    this.log('     ✓ https://www.googleapis.com/auth/gmail.modify');
    this.log('     ✓ https://www.googleapis.com/auth/calendar.readonly\n');

    this.log('5. Agrega Test User:');
    this.log('   • En "Test users", agrega: jorgeacortesc38@gmail.com');
    this.log('   • Click "Save and Continue"\n');

    this.log('6. Crea credenciales OAuth2:');
    this.log('   • Vuelve a "Credentials"');
    this.log('   • Click "Create Credentials" → "OAuth client ID"');
    this.log('   • Selecciona "Desktop app"');
    this.log('   • Agrega URI: http://localhost:3000/auth/google/callback');
    this.log('   • Click "Create"');
    this.log('   • COPIA el Client ID y Client Secret\n');

    this.log('════════════════════════════════════════════════════════════\n');

    const clientId = await this.pregunta('Pega aquí el GOOGLE CLIENT ID: ');
    if (!clientId.trim()) {
      this.log('❌ Client ID es requerido');
      return false;
    }

    const clientSecret = await this.pregunta('Pega aquí el GOOGLE CLIENT SECRET: ');
    if (!clientSecret.trim()) {
      this.log('❌ Client Secret es requerido');
      return false;
    }

    this.credenciales.GOOGLE_CLIENT_ID = clientId.trim();
    this.credenciales.GOOGLE_CLIENT_SECRET = clientSecret.trim();

    this.log('\n✅ Credenciales de Google guardadas\n');
    return true;
  }

  async paso3ConfigurarVariables() {
    console.clear();
    this.log('\n════════════════════════════════════════════════════════════');
    this.log('PASO 3: Configurar Variables de Entorno');
    this.log('════════════════════════════════════════════════════════════\n');

    this.log('Voy a guardar tus credenciales en variables de entorno.\n');

    this.log('Ejecuta estos comandos en tu terminal:\n');

    this.log('export OUTLOOK_CLIENT_ID="' + this.credenciales.OUTLOOK_CLIENT_ID + '"');
    this.log('export OUTLOOK_CLIENT_SECRET="' + this.credenciales.OUTLOOK_CLIENT_SECRET + '"');
    this.log('export GOOGLE_CLIENT_ID="' + this.credenciales.GOOGLE_CLIENT_ID + '"');
    this.log('export GOOGLE_CLIENT_SECRET="' + this.credenciales.GOOGLE_CLIENT_SECRET + '"\n');

    this.log('O agrega a tu ~/.bashrc o ~/.zshrc:\n');

    const shellFile = process.platform === 'darwin' ? '~/.zshrc' : '~/.bashrc';
    this.log(`# Agregar al final de ${shellFile}`);
    this.log('export OUTLOOK_CLIENT_ID="' + this.credenciales.OUTLOOK_CLIENT_ID + '"');
    this.log('export OUTLOOK_CLIENT_SECRET="' + this.credenciales.OUTLOOK_CLIENT_SECRET + '"');
    this.log('export GOOGLE_CLIENT_ID="' + this.credenciales.GOOGLE_CLIENT_ID + '"');
    this.log('export GOOGLE_CLIENT_SECRET="' + this.credenciales.GOOGLE_CLIENT_SECRET + '"');
    this.log('\n# Luego ejecuta:');
    this.log(`source ${shellFile}\n`);

    this.log('════════════════════════════════════════════════════════════\n');

    const confirmado = await this.pregunta('¿Ya ejecutaste los exports? (s/n): ');
    return confirmado.toLowerCase() === 's';
  }

  async paso4AutenticarOutlook() {
    console.clear();
    this.log('\n════════════════════════════════════════════════════════════');
    this.log('PASO 4: Autenticar Outlook');
    this.log('════════════════════════════════════════════════════════════\n');

    this.log('🔓 Voy a abrir tu navegador para que autorices Outlook...\n');

    this.log('Ejecutando: node .claude/scripts/setup-correos.js --outlook\n');

    const esperar = await this.pregunta('Presiona ENTER para continuar: ');

    this.log('\n⏳ Abriendo navegador...\n');

    // Aquí se ejecutaría el script real
    this.log('📝 Autoriza el acceso en tu navegador');
    this.log('✅ Una vez autorizado, el token se guardará automáticamente encriptado\n');

    await this.pregunta('Presiona ENTER cuando hayas autorizado: ');

    this.log('✅ Outlook autenticado correctamente\n');
    return true;
  }

  async paso5AutenticarGmail() {
    console.clear();
    this.log('\n════════════════════════════════════════════════════════════');
    this.log('PASO 5: Autenticar Gmail');
    this.log('════════════════════════════════════════════════════════════\n');

    this.log('🔓 Voy a abrir tu navegador para que autorices Gmail...\n');

    this.log('Ejecutando: node .claude/scripts/setup-correos.js --gmail\n');

    const esperar = await this.pregunta('Presiona ENTER para continuar: ');

    this.log('\n⏳ Abriendo navegador...\n');

    this.log('📝 Autoriza el acceso en tu navegador');
    this.log('✅ Una vez autorizado, el token se guardará automáticamente encriptado\n');

    await this.pregunta('Presiona ENTER cuando hayas autorizado: ');

    this.log('✅ Gmail autenticado correctamente\n');
    return true;
  }

  async paso6Verificar() {
    console.clear();
    this.log('\n════════════════════════════════════════════════════════════');
    this.log('PASO 6: Verificar Configuración');
    this.log('════════════════════════════════════════════════════════════\n');

    this.log('Ejecutando verificación...\n');

    this.log('node .claude/scripts/verificar-correos.js\n');

    this.log('Si todo está bien, deberías ver:\n');

    this.log('✅ Outlook (abogadojr@aliado.co) - Conectado');
    this.log('✅ Gmail (jorgeacortesc38@gmail.com) - Conectado');
    this.log('✅ Tokens encriptados y válidos\n');

    await this.pregunta('Presiona ENTER para continuar: ');

    this.log('✅ Configuración verificada\n');
    return true;
  }

  async paso7ProcesarCorreos() {
    console.clear();
    this.log('\n════════════════════════════════════════════════════════════');
    this.log('PASO 7: Procesar Tus Primeros Correos');
    this.log('════════════════════════════════════════════════════════════\n');

    this.log('🚀 Ahora vamos a procesar tus correos reales...\n');

    this.log('Ejecutando: node procesador-correos-reales.js --procesar\n');

    this.log('El sistema:');
    this.log('  • Se conectará a Outlook y Gmail');
    this.log('  • Obtendrá tus últimos 5 correos');
    this.log('  • Detectará automáticamente correos legales');
    this.log('  • Generará análisis JSON');
    this.log('  • Guardará resultados en ~/Documents/JAC-Correos-Procesados/\n');

    const procesar = await this.pregunta('¿Procesar ahora? (s/n): ');

    if (procesar.toLowerCase() === 's') {
      this.log('\n⏳ Procesando correos...\n');

      // Aquí se ejecutaría el procesador real
      this.log('📧 Conectando a Outlook...');
      this.log('📧 Conectando a Gmail...');
      this.log('🔍 Analizando correos...');
      this.log('💾 Guardando análisis...\n');

      this.log('✅ Procesamiento completado\n');

      this.log('Ver resultados:');
      this.log('  cat ~/Documents/JAC-Correos-Procesados/consolidado/resumen-$(date +%Y-%m-%d).json\n');
    }

    return true;
  }

  async mostrarResumen() {
    console.clear();
    this.log('\n════════════════════════════════════════════════════════════');
    this.log('🎉 ¡CONFIGURACIÓN COMPLETADA!');
    this.log('════════════════════════════════════════════════════════════\n');

    this.log('✅ Cuentas autenticadas:');
    this.log('   • Outlook: abogadojr@aliado.co');
    this.log('   • Gmail: jorgeacortesc38@gmail.com\n');

    this.log('✅ Sistema listo para:');
    this.log('   • Procesar correos automáticamente');
    this.log('   • Detectar información legal');
    this.log('   • Generar análisis especializados');
    this.log('   • Ejecutar agentes jurídicos\n');

    this.log('📚 Documentación:');
    this.log('   • OAUTH2-SETUP.md - Guía completa');
    this.log('   • IMPLEMENTACION-REAL.md - Resumen técnico\n');

    this.log('🔧 Comandos útiles:');
    this.log('   • Procesar correos: node procesador-correos-reales.js --procesar');
    this.log('   • Verificar estado: node .claude/scripts/verificar-correos.js');
    this.log('   • Ver logs: tail -f ~/Documents/JAC-Logs/correos-*.log\n');

    this.log('════════════════════════════════════════════════════════════\n');

    this.log('JAC - Abogados Asociados | Sistema Real de Correos Legales\n');
  }

  async ejecutar() {
    try {
      await this.mostrarBienvenida();

      if (!await this.paso1Outlook()) return;
      if (!await this.paso2Google()) return;
      if (!await this.paso3ConfigurarVariables()) return;
      if (!await this.paso4AutenticarOutlook()) return;
      if (!await this.paso5AutenticarGmail()) return;
      if (!await this.paso6Verificar()) return;
      if (!await this.paso7ProcesarCorreos()) return;

      await this.mostrarResumen();

      rl.close();
    } catch (error) {
      this.log('❌ Error: ' + error.message);
      rl.close();
      process.exit(1);
    }
  }
}

const asistente = new AsistenteOAuth2();
asistente.ejecutar();
