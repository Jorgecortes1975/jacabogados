#!/usr/bin/env node

/**
 * PROCESADOR REAL - Correos Legales con APIs Genuinas
 * Conecta a Outlook y Gmail, procesa correos legales automaticamente
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const OAuthManager = require('./.claude/lib/oauth-manager');
const EmailClient = require('./.claude/lib/email-client');

class ProcesadorCorreosReales {
  constructor() {
    this.configDir = path.join(__dirname, '.claude', 'config');
    this.oauthConfigFile = path.join(this.configDir, 'oauth-config.json');
    this.emailConfigFile = path.join(this.configDir, 'cuentas-correo.json');
    this.libDir = path.join(__dirname, '.claude', 'lib');

    this.oauthManager = new OAuthManager(this.oauthConfigFile);
    this.emailConfig = JSON.parse(fs.readFileSync(this.emailConfigFile, 'utf8'));

    this.procesadosDir = this.expandPath('~/Documents/JAC-Correos-Procesados');
    this.logsDir = this.expandPath('~/Documents/JAC-Logs');
    this.ensureDirs();
  }

  expandPath(filepath) {
    if (filepath.startsWith('~')) {
      return path.join(os.homedir(), filepath.slice(1));
    }
    return filepath;
  }

  ensureDirs() {
    [this.procesadosDir, this.logsDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }

  log(message) {
    const timestamp = new Date().toISOString();
    const logFile = path.join(
      this.logsDir,
      `correos-${new Date().toISOString().split('T')[0]}.log`
    );
    const logMessage = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(logFile, logMessage);
    console.log(message);
  }

  /**
   * Obtiene cliente de email configurado
   */
  async getEmailClient(provider, email) {
    try {
      const token = await this.oauthManager.getValidToken(provider, email);
      return new EmailClient(provider, token, this.emailConfig);
    } catch (error) {
      this.log(`❌ Error obteniendo cliente para ${email}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Detecta si el correo contiene información legal
   */
  esCorreoLegal(asunto, contenido) {
    const palabrasClaveJuridicas = this.emailConfig.procesamiento_global.palabrasClaveJuridicas;
    const texto = (asunto + ' ' + contenido).toLowerCase();
    const palabrasEncontradas = palabrasClaveJuridicas.filter(p => texto.includes(p));

    return {
      esLegal: palabrasEncontradas.length > 0,
      palabrasClave: palabrasEncontradas,
      confianza: (palabrasEncontradas.length / palabrasClaveJuridicas.length) * 100
    };
}

  /**
   * Detecta tipo de documento legal
   */
  detectarTipos(texto) {
    const tipos = [];
    if (texto.includes('sentencia') || texto.includes('fallo')) tipos.push('sentencia');
    if (texto.includes('contrato') || texto.includes('acuerdo')) tipos.push('contrato');
    if (texto.includes('demanda')) tipos.push('demanda');
    if (texto.includes('recurso') || texto.includes('apelación')) tipos.push('recurso');
    if (texto.includes('ley') || texto.includes('decreto')) tipos.push('normativo');
    if (texto.includes('jurisprudencia')) tipos.push('jurisprudencia');
    return tipos.length > 0 ? tipos : ['información legal'];
  }

  /**
   * Obtiene agentes que deben ejecutarse
   */
  obtenerAgentes(tipos) {
    const agentes = [];
    tipos.forEach(tipo => {
      switch (tipo) {
        case 'sentencia':
        case 'jurisprudencia':
          agentes.push('investigador-jurisprudencial');
          break;
        case 'contrato':
          agentes.push('auditor-contractual');
          break;
        case 'demanda':
          agentes.push('investigador-jurisprudencial');
          agentes.push('auditor-contractual');
          break;
      }
    });
    return [...new Set(agentes)];
  }

  /**
   * Genera análisis del correo
   */
  generarAnalisis(email, clasificacion) {
    const texto = (email.subject || email.asunto || '') + ' ' + (email.content || email.contenido || '');
    const tipos = this.detectarTipos(texto.toLowerCase());

    return {
      timestamp: new Date().toISOString(),
      correo_id: email.id,
      asunto: email.subject || email.asunto,
      remitente: email.from || email.remitente,
      tipos: tipos,
      palabras_clave: clasificacion.palabrasClave.slice(0, 15),
      confianza: `${clasificacion.confianza.toFixed(1)}%`,
      agentes_asignados: this.obtenerAgentes(tipos),
      estado: 'procesado-exitosamente'
    };
  }

  /**
   * Guarda análisis en archivo
   */
  guardarAnalisis(provider, email, analisis) {
    const fecha = new Date().toISOString().split('T')[0];
    const carpeta = path.join(this.procesadosDir, provider, fecha);

    if (!fs.existsSync(carpeta)) {
      fs.mkdirSync(carpeta, { recursive: true });
    }

    const archivo = path.join(carpeta, `analisis-${email.id}.json`);
    fs.writeFileSync(archivo, JSON.stringify(analisis, null, 2));

    return archivo;
  }

  /**
   * Procesa correos de una cuenta
   */
  async procesarCuenta(provider, email) {
    this.log(`\n🔍 Procesando cuenta ${provider}: ${email}`);

    try {
      const cliente = await this.getEmailClient(provider, email);
      const correos = await cliente.getRecentEmails(5);

      this.log(`📧 Se encontraron ${correos.length} correos recientes`);

      let procesados = 0;
      let legales = 0;

      for (const correo of correos) {
        // Obtener cuerpo completo
        const detalles = await cliente.getEmailBody(correo.id);
        const clasificacion = this.esCorreoLegal(
          detalles.subject,
          detalles.content
        );

        if (clasificacion.esLegal) {
          legales++;
          const analisis = this.generarAnalisis(detalles, clasificacion);
          const archivo = this.guardarAnalisis(provider, detalles, analisis);

          this.log(`  ✅ Correo legal detectado: ${detalles.subject.substring(0, 50)}...`);
          this.log(`     Archivo: ${archivo}`);
          this.log(`     Agentes: ${analisis.agentes_asignados.join(', ')}`);
        }

        procesados++;
      }

      this.log(`✅ Cuenta completada: ${procesados} procesados, ${legales} legales`);
      return { procesados, legales };

    } catch (error) {
      this.log(`❌ Error procesando ${email}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Procesa todas las cuentas configuradas
   */
  async procesarTodasLasCuentas() {
    console.log('\n════════════════════════════════════════════════════════════');
    console.log('🚀 PROCESADOR REAL DE CORREOS LEGALES');
    console.log('════════════════════════════════════════════════════════════');

    this.log('\n🚀 Iniciando procesamiento de correos legales');
    this.log(`Fecha: ${new Date().toISOString()}`);

    const resultados = {};

    for (const cuenta of this.emailConfig.cuentas) {
      if (!cuenta.habilitada) {
        this.log(`⏭️  Saltando cuenta deshabilitada: ${cuenta.email}`);
        continue;
      }

      if (cuenta.autenticacion.estado !== 'activa') {
        this.log(`⚠️  Cuenta no autenticada: ${cuenta.email}`);
        this.log(`   Estado: ${cuenta.autenticacion.estado}`);
        this.log(`   Ejecuta: node .claude/scripts/setup-correos.js`);
        continue;
      }

      try {
        resultados[cuenta.email] = await this.procesarCuenta(
          cuenta.proveedor,
          cuenta.email
        );
      } catch (error) {
        resultados[cuenta.email] = { error: error.message };
      }
    }

    this.mostrarResumen(resultados);
  }

  /**
   * Muestra resumen de procesamiento
   */
  mostrarResumen(resultados) {
    console.log('\n════════════════════════════════════════════════════════════');
    console.log('📊 RESUMEN DE PROCESAMIENTO');
    console.log('════════════════════════════════════════════════════════════\n');

    let totalProcesados = 0;
    let totalLegales = 0;

    Object.entries(resultados).forEach(([email, resultado]) => {
      if (resultado.error) {
        console.log(`❌ ${email}: ${resultado.error}`);
      } else {
        console.log(`✅ ${email}`);
        console.log(`   • Procesados: ${resultado.procesados}`);
        console.log(`   • Legales detectados: ${resultado.legales}\n`);
        totalProcesados += resultado.procesados;
        totalLegales += resultado.legales;
      }
    });

    console.log('════════════════════════════════════════════════════════════');
    console.log(`Total: ${totalProcesados} correos procesados, ${totalLegales} contienen información legal`);
    console.log(`Análisis guardados en: ${this.procesadosDir}`);
    console.log(`Logs: ${this.logsDir}`);
    console.log('════════════════════════════════════════════════════════════\n');

    this.log(`\n✅ Procesamiento completado: ${totalProcesados} correos, ${totalLegales} legales`);
  }

  /**
   * Configura autenticación OAuth2
   */
  async configurarAutenticacion() {
    console.log('\n════════════════════════════════════════════════════════════');
    console.log('🔐 CONFIGURACIÓN DE AUTENTICACIÓN OAUTH2');
    console.log('════════════════════════════════════════════════════════════\n');

    console.log('Para utilizar el procesador real, necesitas:');
    console.log('\n1️⃣  PARA OUTLOOK (abogadojr@aliado.co)');
    console.log('   • Crear aplicación en: https://portal.azure.com');
    console.log('   • Copiar Client ID y Secret');
    console.log('   • Configurar: export OUTLOOK_CLIENT_ID="..."');
    console.log('   • Configurar: export OUTLOOK_CLIENT_SECRET="..."\n');

    console.log('2️⃣  PARA GMAIL (jorgeacortesc38@gmail.com)');
    console.log('   • Crear proyecto en: https://console.cloud.google.com');
    console.log('   • Habilitar Gmail API');
    console.log('   • Descargar credenciales OAuth2');
    console.log('   • Configurar: export GOOGLE_CLIENT_ID="..."');
    console.log('   • Configurar: export GOOGLE_CLIENT_SECRET="..."\n');

    console.log('3️⃣  EJECUTAR AUTENTICACIÓN');
    console.log('   • node .claude/scripts/setup-correos.js --outlook');
    console.log('   • node .claude/scripts/setup-correos.js --gmail\n');

    console.log('Las credenciales se guardarán encriptadas en:');
    console.log(`   ~/.config/jac/tokens/\n`);
  }

  async ejecutar() {
    const args = process.argv.slice(2);

    if (args.includes('--setup')) {
      await this.configurarAutenticacion();
    } else if (args.includes('--procesar')) {
      await this.procesarTodasLasCuentas();
    } else {
      console.log('\n📖 USO:');
      console.log('   node procesador-correos-reales.js --procesar   # Procesa correos');
      console.log('   node procesador-correos-reales.js --setup      # Configurar OAuth2\n');
    }
  }
}

const procesador = new ProcesadorCorreosReales();
procesador.ejecutar().catch(console.error);
