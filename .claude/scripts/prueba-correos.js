#!/usr/bin/env node

/**
 * PRUEBA - Sistema de Correos Legales
 * Simula el procesamiento de correos legales sin requerir OAuth2
 *
 * Uso:
 *   node .claude/scripts/prueba-correos.js
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

class PruebaCorreosLegales {
  constructor() {
    this.configDir = path.join(__dirname, '..', 'config');
    this.configFile = path.join(this.configDir, 'cuentas-correo.json');
    this.logsDir = this.expandUser('~/Documents/JAC-Logs');
    this.procesadosDir = this.expandUser('~/Documents/JAC-Correos-Procesados');
  }

  expandUser(filepath) {
    if (filepath[0] === '~') {
      return path.join(os.homedir(), filepath.slice(1));
    }
    return filepath;
  }

  async mostrarBienvenida() {
    console.log('\n════════════════════════════════════════════════════════════');
    console.log('🧪 PRUEBA - Sistema de Procesamiento de Correos Legales');
    console.log('════════════════════════════════════════════════════════════\n');
  }

  async verificarConfiguracion() {
    console.log('📋 1. Verificando configuración...\n');

    if (!fs.existsSync(this.configFile)) {
      console.log('❌ Archivo de configuración no encontrado:', this.configFile);
      return false;
    }

    try {
      const config = JSON.parse(fs.readFileSync(this.configFile, 'utf8'));

      console.log('✅ Configuración cargada correctamente\n');
      console.log('📧 Cuentas configuradas:');

      config.cuentas.forEach(cuenta => {
        console.log(`  • ${cuenta.email}`);
        console.log(`    - Proveedor: ${cuenta.proveedor}`);
        console.log(`    - Habilitada: ${cuenta.habilitada ? 'Sí' : 'No'}`);
        console.log(`    - Estado: ${cuenta.autenticacion.estado}\n`);
      });

      console.log('🔑 Palabras clave jurídicas monitoreadas:');
      console.log(`  • Total: ${config.procesamiento_global.palabrasClaveJuridicas.length}`);
      console.log(`  • Ejemplos: ${config.procesamiento_global.palabrasClaveJuridicas.slice(0, 5).join(', ')}...\n`);

      console.log('⚙️  Configuración de procesamiento:');
      console.log(`  • Frecuencia: ${config.procesamiento_global.frecuencia_chequeo}`);
      console.log(`  • Procesamiento automático: ${config.procesamiento_global.procesamiento_automatico ? 'Sí' : 'No'}`);
      console.log(`  • Ejecutar agentes: ${config.procesamiento_global.ejecutar_agentes ? 'Sí' : 'No'}\n`);

      return config;
    } catch (error) {
      console.log('❌ Error al leer configuración:', error.message);
      return false;
    }
  }

  async simularCorreoLegal(config) {
    console.log('🧪 2. Simulando procesamiento de correo legal...\n');

    // Correo de prueba con contenido legal
    const correoSimulado = {
      id: 'test-correo-001',
      asunto: 'Re: Sentencia de la Corte Suprema - Caso de despido sin justa causa',
      remitente: 'cliente@example.com',
      contenido: `
        Adjunto encontrarás la sentencia relacionada con tu caso.

        Se trata de un caso similar donde se reconoció la indemnización por despido injustificado.
        El tribunal aplicó el artículo 50 del Código Sustantivo del Trabajo.

        Además, hay referencias a jurisprudencia de la Corte Suprema de Justicia sobre
        la reparación integral del daño y las obligaciones contractuales incumplidas.

        Favor revisar la demanda adjunta y los decretos relacionados.
      `,
      timestamp: new Date().toISOString()
    };

    console.log(`De: ${correoSimulado.remitente}`);
    console.log(`Asunto: ${correoSimulado.asunto}`);
    console.log(`Fecha: ${correoSimulado.timestamp}\n`);

    // Detectar si es legal
    const esLegal = this.detectarCorreoLegal(correoSimulado, config);

    if (esLegal.esLegal) {
      console.log('✅ Correo clasificado como LEGAL\n');
      console.log(`📌 Tipos detectados: ${esLegal.tipos.join(', ')}`);
      console.log(`🔑 Palabras clave: ${esLegal.palabrasClave.slice(0, 5).join(', ')}`);
      console.log(`📊 Confianza: ${esLegal.confianza.toFixed(1)}%\n`);

      // Simular análisis
      const analisis = this.generarAnalisisSimulado(correoSimulado, esLegal);
      console.log('📋 ANÁLISIS GENERADO:\n');
      console.log(JSON.stringify(analisis, null, 2));

      // Mostrar agentes que se ejecutarían
      console.log('\n🤖 Agentes que se ejecutarían:');
      const agentes = this.obtenerAgentes(esLegal.tipos);
      agentes.forEach(agente => {
        console.log(`  • ${agente}`);
      });

      return { analisis, agentes };
    } else {
      console.log('ℹ️  Correo clasificado como NO LEGAL');
      console.log('   Se ignoraría en el procesamiento automático');
      return null;
    }
  }

  detectarCorreoLegal(correo, config) {
    const palabrasClaveJuridicas = config.procesamiento_global.palabrasClaveJuridicas;
    const texto = (correo.asunto + ' ' + correo.contenido).toLowerCase();
    const palabrasEncontradas = palabrasClaveJuridicas.filter(p => texto.includes(p));

    const tipos = [];
    if (texto.includes('sentencia') || texto.includes('fallo')) tipos.push('sentencia');
    if (texto.includes('contrato') || texto.includes('acuerdo')) tipos.push('contrato');
    if (texto.includes('demanda')) tipos.push('demanda');
    if (texto.includes('decreto') || texto.includes('ley')) tipos.push('normativo');

    return {
      esLegal: palabrasEncontradas.length > 0,
      palabrasClave: palabrasEncontradas,
      tipos: tipos.length > 0 ? tipos : [],
      confianza: (palabrasEncontradas.length / palabrasClaveJuridicas.length) * 100
    };
  }

  generarAnalisisSimulado(correo, clasificacion) {
    return {
      timestamp: new Date().toISOString(),
      correo_id: correo.id,
      asunto: correo.asunto,
      remitente: correo.remitente,
      tipos_detectados: clasificacion.tipos,
      palabras_clave: clasificacion.palabrasClave.slice(0, 10),
      confianza: `${clasificacion.confianza.toFixed(1)}%`,
      acciones_recomendadas: this.obtenerAcciones(clasificacion.tipos),
      agentes_a_ejecutar: this.obtenerAgentes(clasificacion.tipos),
      estado: 'procesado-exitosamente'
    };
  }

  obtenerAcciones(tipos) {
    const acciones = [];
    tipos.forEach(tipo => {
      switch (tipo) {
        case 'sentencia':
          acciones.push('Análisis jurisprudencial');
          acciones.push('Verificar precedentes');
          break;
        case 'contrato':
          acciones.push('Auditoría contractual');
          acciones.push('Análisis de riesgos');
          break;
        case 'demanda':
          acciones.push('Análisis de viabilidad');
          acciones.push('Búsqueda jurisprudencial');
          break;
      }
    });
    return [...new Set(acciones)];
  }

  obtenerAgentes(tipos) {
    const agentes = [];
    tipos.forEach(tipo => {
      switch (tipo) {
        case 'sentencia':
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

  async verificarIntegraciones(config) {
    console.log('\n════════════════════════════════════════════════════════════');
    console.log('3. Verificando integraciones...\n');

    const integraciones = config.integraciones;
    console.log('Módulos integrados:');

    Object.entries(integraciones).forEach(([nombre, config]) => {
      if (config.habilitada) {
        console.log(`  ✅ ${nombre}`);
      } else {
        console.log(`  ⏳ ${nombre} (deshabilitado)`);
      }
    });

    console.log('\nAgentes disponibles:');
    console.log('  • investigador-jurisprudencial');
    console.log('  • auditor-contractual');
    console.log('  • consultor-comunicaciones');
    console.log('  • redactor-ejecutivo');
  }

  async mostrarProximosPasos() {
    console.log('\n════════════════════════════════════════════════════════════');
    console.log('📋 PRÓXIMOS PASOS');
    console.log('════════════════════════════════════════════════════════════\n');

    console.log('✅ El sistema está configurado y listo.\n');

    console.log('Para activar la integración real:\n');

    console.log('PASO 1: Conectar Outlook (abogadojr@aliado.co)');
    console.log('  node .claude/scripts/setup-correos.js --outlook\n');

    console.log('PASO 2: Conectar Gmail (jorgeacortesc38@gmail.com)');
    console.log('  node .claude/scripts/setup-correos.js --gmail\n');

    console.log('PASO 3: Verificar ambas cuentas');
    console.log('  node .claude/scripts/verificar-correos.js\n');

    console.log('PASO 4: Activar procesamiento automático');
    console.log('  node .claude/scripts/activar-hooks-correos.js\n');

    console.log('Donde se guardarán los análisis:');
    console.log('  📁 ~/Documents/JAC-Correos-Procesados/\n');

    console.log('Logs del procesamiento:');
    console.log('  📄 ~/Documents/JAC-Logs/correos-*.log\n');

    console.log('════════════════════════════════════════════════════════════\n');
  }

  async ejecutar() {
    await this.mostrarBienvenida();

    const config = await this.verificarConfiguracion();
    if (!config) {
      console.log('❌ No se pudo continuar sin configuración');
      process.exit(1);
    }

    await this.simularCorreoLegal(config);
    await this.verificarIntegraciones(config);
    await this.mostrarProximosPasos();
  }
}

// Ejecutar
const prueba = new PruebaCorreosLegales();
prueba.ejecutar().catch(console.error);
