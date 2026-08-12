#!/usr/bin/env node

/**
 * PROCESADOR DE CORREOS LEGALES JAC
 * Procesa automáticamente correos legales y actualiza el ecosistema
 *
 * Uso:
 *   node procesador-correos-legales.js buscar
 *   node procesador-correos-legales.js procesar
 *   node procesador-correos-legales.js activar-hook
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// Configuración
const config = {
  email: 'abogadojr@aliado.co',
  proveedor: 'outlook',
  outputDir: path.join(os.homedir(), 'Documents', 'JAC-Correos-Procesados'),
  logsDir: path.join(os.homedir(), 'Documents', 'JAC-Logs'),
  timestamp: new Date().toISOString().split('T')[0],
  palabrasClaveJuridicas: [
    'sentencia', 'jurisprudencia', 'fallo', 'recurso', 'apelación',
    'demanda', 'contrato', 'acuerdo', 'negociación', 'norma',
    'ley', 'decreto', 'resolución', 'artículo', 'legal',
    'litigio', 'pleito', 'conflicto', 'derecho', 'obligación',
    'responsabilidad', 'indemnización', 'daño', 'perjuicio',
    'cláusula', 'incumplimiento', 'sanción', 'multa',
    'procedimiento', 'término', 'vencimiento', 'caducidad',
    'parte demandante', 'parte demandada', 'tribunal', 'juzgado',
    'corte', 'magistrado', 'juez', 'abogado', 'letrado'
  ]
};

// Crear directorios si no existen
if (!fs.existsSync(config.outputDir)) fs.mkdirSync(config.outputDir, { recursive: true });
if (!fs.existsSync(config.logsDir)) fs.mkdirSync(config.logsDir, { recursive: true });

class ProcesadorCorreosLegales {
  constructor() {
    this.correosProcessados = [];
    this.correosNoProcessados = [];
    this.actualizacionesEcosistema = [];
  }

  log(nivel, mensaje) {
    const timestamp = new Date().toISOString();
    const linea = `[${timestamp}] ${nivel}: ${mensaje}`;
    console.log(linea);

    const logFile = path.join(config.logsDir, `correos-${config.timestamp}.log`);
    fs.appendFileSync(logFile, linea + '\n');
  }

  esCorreoLegal(asunto, contenido) {
    const texto = (asunto + ' ' + contenido).toLowerCase();
    return config.palabrasClaveJuridicas.some(palabra => texto.includes(palabra));
  }

  extraerInformacionLegal(asunto, contenido) {
    const info = {
      asunto,
      fecha: new Date().toISOString(),
      tipoDocumento: this.detectarTipo(asunto, contenido),
      palabrasClave: this.extraerPalabrasClave(contenido),
      entidades: this.extraerEntidades(contenido),
      resumen: this.generarResumen(contenido),
      accionesRecomendadas: []
    };

    // Determinar acciones recomendadas
    if (info.tipoDocumento.includes('sentencia')) {
      info.accionesRecomendadas.push('Análisis jurisprudencial');
      info.accionesRecomendadas.push('Verificar precedentes');
    }
    if (info.tipoDocumento.includes('contrato')) {
      info.accionesRecomendadas.push('Auditoría contractual');
      info.accionesRecomendadas.push('Análisis de riesgos');
    }
    if (info.tipoDocumento.includes('demanda')) {
      info.accionesRecomendadas.push('Análisis de viabilidad');
      info.accionesRecomendadas.push('Búsqueda jurisprudencial');
    }

    return info;
  }

  detectarTipo(asunto, contenido) {
    const tipos = [];
    const texto = (asunto + ' ' + contenido).toLowerCase();

    if (texto.includes('sentencia') || texto.includes('fallo')) tipos.push('sentencia');
    if (texto.includes('contrato') || texto.includes('acuerdo')) tipos.push('contrato');
    if (texto.includes('demanda')) tipos.push('demanda');
    if (texto.includes('recurso') || texto.includes('apelación')) tipos.push('recurso');
    if (texto.includes('norma') || texto.includes('ley') || texto.includes('decreto')) tipos.push('normativo');
    if (texto.includes('jurisprudencia') || texto.includes('precedente')) tipos.push('jurisprudencia');

    return tipos.length > 0 ? tipos : ['información legal general'];
  }

  extraerPalabrasClave(contenido) {
    const palabras = new Set();
    config.palabrasClaveJuridicas.forEach(palabra => {
      if (contenido.toLowerCase().includes(palabra)) {
        palabras.add(palabra);
      }
    });
    return Array.from(palabras).slice(0, 10);
  }

  extraerEntidades(contenido) {
    const entidades = {
      leyes: [],
      artículos: [],
      tribunales: [],
      personas: []
    };

    // Buscar leyes (patrón: "Ley XXXX")
    const leyPattern = /Ley\s+(\d+\s+de\s+\d+)/gi;
    const leyes = contenido.match(leyPattern);
    if (leyes) entidades.leyes = [...new Set(leyes)];

    // Buscar artículos (patrón: "Art. XX" o "Artículo XX")
    const artPattern = /(?:Art\.|Artículo)\s+(\d+)/gi;
    const arts = contenido.match(artPattern);
    if (arts) entidades.artículos = [...new Set(arts)];

    // Buscar tribunales
    const tribunales = ['Corte Constitucional', 'Corte Suprema', 'Consejo de Estado', 'Juzgado'];
    tribunales.forEach(tribunal => {
      if (contenido.includes(tribunal)) {
        entidades.tribunales.push(tribunal);
      }
    });

    return entidades;
  }

  generarResumen(contenido) {
    const oraciones = contenido.split(/[.!?]+/).filter(o => o.trim().length > 0);
    const primerasOraciones = oraciones.slice(0, 3).join('. ').trim();
    return primerasOraciones.substring(0, 500) + (primerasOraciones.length > 500 ? '...' : '');
  }

  procesarCorreo(correoid, asunto, remitente, contenido) {
    try {
      this.log('INFO', `Procesando correo de ${remitente}: ${asunto}`);

      // Verificar si es un correo legal
      if (!this.esCorreoLegal(asunto, contenido)) {
        this.log('INFO', `Correo ignorado (no contiene información legal)`);
        this.correosNoProcessados.push({ correoid, asunto, remitente });
        return null;
      }

      // Extraer información legal
      const infoLegal = this.extraerInformacionLegal(asunto, contenido);

      // Guardar análisis
      this.guardarAnalisis(correoid, infoLegal, remitente, contenido);

      // Actualizar ecosistema
      this.actualizarEcosistema(infoLegal, correoid);

      this.correosProcessados.push({ correoid, asunto, remitente, infoLegal });
      this.log('SUCCESS', `✓ Correo procesado exitosamente`);

      return infoLegal;
    } catch (error) {
      this.log('ERROR', `Error procesando correo: ${error.message}`);
      return null;
    }
  }

  guardarAnalisis(correoid, infoLegal, remitente, contenido) {
    const analisis = {
      id: correoid,
      email: config.email,
      remitente,
      fecha: new Date().toISOString(),
      tipo: infoLegal.tipoDocumento,
      asunto: infoLegal.asunto,
      palabrasClave: infoLegal.palabrasClave,
      entidades: infoLegal.entidades,
      resumen: infoLegal.resumen,
      accionesRecomendadas: infoLegal.accionesRecomendadas,
      contenidoCompleto: contenido
    };

    const filename = path.join(
      config.outputDir,
      `analisis-${correoid}-${config.timestamp}.json`
    );
    fs.writeFileSync(filename, JSON.stringify(analisis, null, 2));
    this.log('INFO', `Análisis guardado: ${filename}`);
  }

  actualizarEcosistema(infoLegal, correoid) {
    const actualizacion = {
      timestamp: new Date().toISOString(),
      correoid,
      tipo: infoLegal.tipoDocumento[0],
      palabrasClave: infoLegal.palabrasClave,
      entidades: infoLegal.entidades,
      accionesRecomendadas: infoLegal.accionesRecomendadas,
      estado: 'procesado'
    };

    this.actualizacionesEcosistema.push(actualizacion);

    // Guardar actualización en archivo de estado
    const stateFile = path.join(config.outputDir, 'ecosistema-estado.json');
    let estado = { ultimas_actualizaciones: [] };
    if (fs.existsSync(stateFile)) {
      estado = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    }
    estado.ultimas_actualizaciones.unshift(actualizacion);
    estado.ultimas_actualizaciones = estado.ultimas_actualizaciones.slice(0, 100);
    fs.writeFileSync(stateFile, JSON.stringify(estado, null, 2));
  }

  generarReporteEcosistema() {
    const reporte = {
      timestamp: new Date().toISOString(),
      email: config.email,
      estadisticas: {
        correosProcessados: this.correosProcessados.length,
        correosNoProcessados: this.correosNoProcessados.length,
        actualizacionesEcosistema: this.actualizacionesEcosistema.length,
        tiposDocumentosEncontrados: this.obtenerTiposDocumentos(),
        palabrasClaveFrequentes: this.obtenerPalabrasClaveFrequentes(),
        entidadesLegalesEncontradas: this.obtenerEntidadesLegales()
      },
      correosProcessados: this.correosProcessados.map(c => ({
        id: c.correoid,
        asunto: c.asunto,
        remitente: c.remitente,
        tipo: c.infoLegal.tipoDocumento
      })),
      accionesRecomendadas: this.obtenerAccionesRecomendadas()
    };

    const filename = path.join(
      config.outputDir,
      `reporte-ecosistema-${config.timestamp}.json`
    );
    fs.writeFileSync(filename, JSON.stringify(reporte, null, 2));
    this.log('INFO', `Reporte generado: ${filename}`);

    return reporte;
  }

  obtenerTiposDocumentos() {
    const tipos = {};
    this.correosProcessados.forEach(c => {
      c.infoLegal.tipoDocumento.forEach(t => {
        tipos[t] = (tipos[t] || 0) + 1;
      });
    });
    return tipos;
  }

  obtenerPalabrasClaveFrequentes() {
    const frecuencia = {};
    this.correosProcessados.forEach(c => {
      c.infoLegal.palabrasClave.forEach(p => {
        frecuencia[p] = (frecuencia[p] || 0) + 1;
      });
    });
    return Object.entries(frecuencia)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {});
  }

  obtenerEntidadesLegales() {
    const entidades = {
      leyes: new Set(),
      artículos: new Set(),
      tribunales: new Set()
    };

    this.correosProcessados.forEach(c => {
      if (c.infoLegal.entidades) {
        (c.infoLegal.entidades.leyes || []).forEach(l => entidades.leyes.add(l));
        (c.infoLegal.entidades.artículos || []).forEach(a => entidades.artículos.add(a));
        (c.infoLegal.entidades.tribunales || []).forEach(t => entidades.tribunales.add(t));
      }
    });

    return {
      leyes: Array.from(entidades.leyes),
      artículos: Array.from(entidades.artículos),
      tribunales: Array.from(entidades.tribunales)
    };
  }

  obtenerAccionesRecomendadas() {
    const acciones = {};
    this.actualizacionesEcosistema.forEach(a => {
      (a.accionesRecomendadas || []).forEach(accion => {
        acciones[accion] = (acciones[accion] || 0) + 1;
      });
    });
    return Object.entries(acciones)
      .sort((a, b) => b[1] - a[1])
      .reduce((obj, [k, v]) => ({ ...obj, [k]: v }), {});
  }

  mostrarEstadistica() {
    console.log('\n════════════════════════════════════════════════════════════');
    console.log('📊 ESTADÍSTICAS DE PROCESAMIENTO DE CORREOS LEGALES');
    console.log('════════════════════════════════════════════════════════════\n');

    console.log(`📧 Email: ${config.email}`);
    console.log(`📁 Directorio: ${config.outputDir}\n`);

    console.log(`✅ Correos Procesados: ${this.correosProcessados.length}`);
    console.log(`⏭️  Correos Ignorados: ${this.correosNoProcessados.length}`);
    console.log(`🔄 Actualizaciones Ecosistema: ${this.actualizacionesEcosistema.length}\n`);

    const tipos = this.obtenerTiposDocumentos();
    if (Object.keys(tipos).length > 0) {
      console.log('📋 Tipos de Documentos Encontrados:');
      Object.entries(tipos).forEach(([tipo, count]) => {
        console.log(`   • ${tipo}: ${count}`);
      });
      console.log('');
    }

    const palabras = this.obtenerPalabrasClaveFrequentes();
    if (Object.keys(palabras).length > 0) {
      console.log('🔑 Palabras Clave Frecuentes:');
      Object.entries(palabras).slice(0, 10).forEach(([palabra, count]) => {
        console.log(`   • ${palabra}: ${count}`);
      });
      console.log('');
    }

    const acciones = this.obtenerAccionesRecomendadas();
    if (Object.keys(acciones).length > 0) {
      console.log('🎯 Acciones Recomendadas:');
      Object.entries(acciones).slice(0, 10).forEach(([accion, count]) => {
        console.log(`   • ${accion}: ${count}`);
      });
      console.log('');
    }

    console.log('════════════════════════════════════════════════════════════\n');
  }
}

// Simulación de ejemplo (en producción se conectaría a Gmail real)
async function ejemploDemo() {
  const procesador = new ProcesadorCorreosLegales();

  console.log('\n🚀 DEMOSTRACIÓN: Procesador de Correos Legales');
  console.log('════════════════════════════════════════════════════════════\n');

  // Ejemplos de correos legales
  const ejemplosCorreos = [
    {
      id: 'msg-001',
      asunto: 'Sentencia Corte Suprema - Caso Empresa XYZ',
      remitente: 'cliente@empresa.com',
      contenido: `
        Se adjunta copia de la sentencia proferida por la Corte Suprema de Justicia,
        Sala Laboral, en el caso sobre despido sin justa causa.

        La Ley 1564 de 2012 (CPCC) y el Código Sustantivo del Trabajo establecen los
        requisitos procedimentales para la acción.

        Se recomienda análisis jurisprudencial de precedentes.
      `
    },
    {
      id: 'msg-002',
      asunto: 'Contrato de Arrendamiento - Revisión de Cláusulas',
      remitente: 'abogado@estudio.co',
      contenido: `
        Se requiere auditoría contractual del documento adjunto.
        Existen varias cláusulas que requieren análisis de riesgos.

        Artículos relevantes: Código Civil 1864-1899, Ley 1618 sobre discriminación.

        Procede análisis de viabilidad y negociación de términos.
      `
    },
    {
      id: 'msg-003',
      asunto: 'Demanda por Cobro de Cartera',
      remitente: 'cliente-empresa@bussiness.co',
      contenido: `
        Se radica demanda por cobro de cartera por valor de $50.000.000.

        Fundamentos: Ley 1564/2012 (CPCC), Código de Comercio artículos 1384-1432.

        Se requiere búsqueda de jurisprudencia sobre carga probatoria en procesos comerciales.
      `
    }
  ];

  ejemplosCorreos.forEach(correo => {
    procesador.procesarCorreo(correo.id, correo.asunto, correo.remitente, correo.contenido);
  });

  // Generar reporte
  const reporte = procesador.generarReporteEcosistema();
  procesador.mostrarEstadistica();

  console.log('\n✅ Demostración completada');
  console.log(`📊 Archivos generados en: ${config.outputDir}\n`);
}

// Ejecutar según comando
const comando = process.argv[2] || 'demo';

switch (comando) {
  case 'demo':
    ejemploDemo().catch(console.error);
    break;
  case 'buscar':
    console.log('🔍 Buscando correos legales en Gmail...');
    console.log('(Requiere integración con Gmail API)');
    break;
  case 'procesar':
    console.log('⚙️  Procesando correos legales...');
    console.log('(Requiere integración con Gmail API)');
    break;
  case 'activar-hook':
    console.log('🪝 Activando hook de eventos...');
    console.log('(Requiere configuración en .claude/hooks)');
    break;
  default:
    console.log('Uso:');
    console.log('  node procesador-correos-legales.js demo        - Demo con ejemplos');
    console.log('  node procesador-correos-legales.js buscar      - Buscar correos en Gmail');
    console.log('  node procesador-correos-legales.js procesar    - Procesar correos');
    console.log('  node procesador-correos-legales.js activar-hook - Activar procesamiento automático');
}
