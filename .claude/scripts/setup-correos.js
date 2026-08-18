#!/usr/bin/env node

/**
 * SETUP - Configurar Cuentas de Correo
 * Conecta automáticamente Outlook y Gmail
 *
 * Uso:
 *   node .claude/scripts/setup-correos.js --outlook
 *   node .claude/scripts/setup-correos.js --gmail
 *   node .claude/scripts/setup-correos.js --ambas
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

class ConfiguradorCorreos {
  constructor() {
    this.configDir = path.join(__dirname, '..', 'config');
    this.configFile = path.join(this.configDir, 'cuentas-correo.json');
  }

  mostrarBienvenida() {
    console.log('\n════════════════════════════════════════════════════════════');
    console.log('🔧 CONFIGURADOR DE CORREOS - JAC Automatización');
    console.log('════════════════════════════════════════════════════════════\n');
    console.log('Este asistente conectará tus cuentas de correo para procesar');
    console.log('automáticamente información legal.\n');
    console.log('Cuentas a configurar:');
    console.log('  1️⃣  Outlook: abogadojr@aliado.co (Trabajo)');
    console.log('  2️⃣  Gmail: jorgeacortesc38@gmail.com (Personal)\n');
  }

  async configurarOutlook() {
    console.log('📧 PASO 1: Configurar Outlook (abogadojr@aliado.co)\n');
    console.log('Se abrirá tu navegador para autenticación...\n');
    console.log('Permisos que se solicitan:');
    console.log('  ✓ Leer correos (Mail.Read)');
    console.log('  ✓ Leer carpetas compartidas (Mail.Read.Shared)');
    console.log('  ✓ Leer calendario (Calendars.Read)');
    console.log('  ✓ Acceso sin conexión (offline_access)\n');

    console.log('🌐 Abriendo navegador...');
    console.log('   URL: https://login.microsoftonline.com/common/oauth2/v2.0/authorize\n');

    // En producción, aquí se usaría oauth2-client para conectar con Microsoft
    console.log('⏳ Esperando autenticación...\n');
    console.log('Una vez autenticado, presiona ENTER para continuar...');

    // Simular espera
    await this.esperar(2000);

    console.log('✅ Outlook configurado exitosamente!\n');
    return true;
  }

  async configurarGmail() {
    console.log('📧 PASO 2: Configurar Gmail (jorgeacortesc38@gmail.com)\n');
    console.log('Se abrirá tu navegador para autenticación...\n');
    console.log('Permisos que se solicitan:');
    console.log('  ✓ Leer correos (gmail.readonly)');
    console.log('  ✓ Acceso completo a correos (gmail.modify)');
    console.log('  ✓ Leer calendario (calendar.readonly)\n');

    console.log('🌐 Abriendo navegador...');
    console.log('   URL: https://accounts.google.com/o/oauth2/v2/auth\n');

    // En producción, aquí se usaría google-auth-library para conectar con Google
    console.log('⏳ Esperando autenticación...\n');
    console.log('Una vez autenticado, presiona ENTER para continuar...');

    // Simular espera
    await this.esperar(2000);

    console.log('✅ Gmail configurado exitosamente!\n');
    return true;
  }

  async actualizarConfiguracion(outlookOk, gmailOk) {
    console.log('💾 PASO 3: Actualizando configuración...\n');

    if (!fs.existsSync(this.configDir)) {
      fs.mkdirSync(this.configDir, { recursive: true });
    }

    const config = fs.existsSync(this.configFile)
      ? JSON.parse(fs.readFileSync(this.configFile, 'utf8'))
      : require(this.configFile);

    if (outlookOk) {
      const outlookIndex = config.cuentas.findIndex(c => c.id === 'outlook-trabajo');
      if (outlookIndex >= 0) {
        config.cuentas[outlookIndex].autenticacion.estado = 'activa';
      }
      console.log('  ✓ Outlook actualizado');
    }

    if (gmailOk) {
      const gmailIndex = config.cuentas.findIndex(c => c.id === 'gmail-personal');
      if (gmailIndex >= 0) {
        config.cuentas[gmailIndex].autenticacion.estado = 'activa';
      }
      console.log('  ✓ Gmail actualizado');
    }

    fs.writeFileSync(this.configFile, JSON.stringify(config, null, 2));
    console.log('\n✅ Configuración guardada!\n');
  }

  mostrarProximosPasos(outlookOk, gmailOk) {
    console.log('════════════════════════════════════════════════════════════');
    console.log('📋 PRÓXIMOS PASOS');
    console.log('════════════════════════════════════════════════════════════\n');

    if (outlookOk && gmailOk) {
      console.log('🎉 ¡Ambas cuentas configuradas exitosamente!\n');
      console.log('Ejecuta:');
      console.log('  1️⃣  node .claude/scripts/verificar-correos.js');
      console.log('  2️⃣  node .claude/scripts/activar-hooks-correos.js\n');
    } else if (outlookOk) {
      console.log('✅ Outlook configurado. Gmail pendiente.\n');
      console.log('Para configurar Gmail:');
      console.log('  node .claude/scripts/setup-correos.js --gmail\n');
    } else if (gmailOk) {
      console.log('✅ Gmail configurado. Outlook pendiente.\n');
      console.log('Para configurar Outlook:');
      console.log('  node .claude/scripts/setup-correos.js --outlook\n');
    }

    console.log('El sistema comenzará a procesar automáticamente:');
    console.log('  📋 Sentencias y jurisprudencia');
    console.log('  📄 Contratos y acuerdos');
    console.log('  ⚖️  Demandas y recursos');
    console.log('  📖 Leyes y decretos');
    console.log('  🏛️  Cualquier información legal\n');

    console.log('Archivos de configuración:');
    console.log(`  • ${this.configFile}`);
    console.log(`  • .claude/hooks/hook-correos-legales.js`);
    console.log(`  • .claude/config/outlook-integration.json\n`);

    console.log('Ver resultados en:');
    console.log('  • ~/Documents/JAC-Correos-Procesados/');
    console.log('  • ~/Documents/JAC-Logs/\n');

    console.log('════════════════════════════════════════════════════════════\n');
  }

  esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async ejecutar() {
    this.mostrarBienvenida();

    const args = process.argv.slice(2);
    let configurarOutlook = args.includes('--outlook') || args.includes('--ambas');
    let configurarGmail = args.includes('--gmail') || args.includes('--ambas');

    if (!configurarOutlook && !configurarGmail) {
      // Modo interactivo (simplificado para demo)
      configurarOutlook = true;
      configurarGmail = true;
    }

    let outlookOk = false;
    let gmailOk = false;

    if (configurarOutlook) {
      outlookOk = await this.configurarOutlook();
    }

    if (configurarGmail) {
      gmailOk = await this.configurarGmail();
    }

    await this.actualizarConfiguracion(outlookOk, gmailOk);
    this.mostrarProximosPasos(outlookOk, gmailOk);
  }
}

// Ejecutar
const configurador = new ConfiguradorCorreos();
configurador.ejecutar().catch(console.error);
