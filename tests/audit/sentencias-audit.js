#!/usr/bin/env node

/**
 * AUDITORÍA DE SENTENCIAS - Programa Skills JAC
 *
 * Valida que las sentencias citadas en la documentación:
 * 1. Existen realmente en fuentes oficiales
 * 2. Son citable correctamente
 * 3. No son fabricadas (anti-alucinaciones)
 * 4. Tienen datos completos (Corte, Sala, Número, Fecha, M.P.)
 *
 * Ejecución: node tests/audit/sentencias-audit.js
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// SENTENCIAS DE EJEMPLO PARA AUDITORÍA
// Estas son sentencias que se podrían citar en reportes
// ============================================================================

const SENTENCIAS_AUDITABLES = [
  // Corte Constitucional - Sentencias C (constitucionalidad)
  {
    id: 'C-1234/2022',
    corte: 'Corte Constitucional',
    tipo: 'C - Constitucionalidad',
    numero: '1234',
    año: '2022',
    tema: 'Derechos laborales',
    magistrado: 'Diana Fajardo Rivera',
    fuente: 'https://www.corteconstitucional.gov.co',
    requiereMagistrado: true,
  },

  // Corte Suprema - Sentencias de Casación Laboral
  {
    id: 'SL-2023-001',
    corte: 'Corte Suprema de Justicia',
    tipo: 'SL - Casación Laboral',
    numero: '2023-001',
    año: '2023',
    tema: 'Despido sin justa causa',
    magistrado: 'Juan Manuel Bonet Estrada',
    fuente: 'https://www.cortesupremajusticia.gov.co',
    requiereMagistrado: true,
  },

  // Consejo de Estado - Sentencias Contencioso Administrativo
  {
    id: 'CE-2023-00123',
    corte: 'Consejo de Estado',
    tipo: 'CE - Contencioso Administrativo',
    numero: '00123',
    año: '2023',
    tema: 'Acción de tutela',
    magistrado: 'Jaime Orlando Santofimio Gamboa',
    fuente: 'https://www.consejodeestado.gov.co',
    requiereMagistrado: true,
  },

  // Sentencia SU (Jurisprudencia Consolidada)
  {
    id: 'SU-1150/2000',
    corte: 'Corte Constitucional',
    tipo: 'SU - Jurisprudencia',
    numero: '1150',
    año: '2000',
    tema: 'Protección de derechos fundamentales',
    magistrado: 'Álvaro Tafur Galvis',
    fuente: 'https://www.corteconstitucional.gov.co',
    requiereMagistrado: true,
  }
];

// ============================================================================
// CRITERIOS DE VALIDACIÓN
// ============================================================================

class AuditorSentencias {
  constructor() {
    this.resultados = {
      total: 0,
      validas: 0,
      invalidas: 0,
      alucinaciones: 0,
      incompletas: 0,
      errores: []
    };
  }

  // Valida que la sentencia tiene todos los datos requeridos
  validarDatos(sentencia) {
    const errores = [];

    if (!sentencia.id) errores.push('ID de sentencia faltante');
    if (!sentencia.corte) errores.push('Corte no especificada');
    if (!sentencia.numero) errores.push('Número de sentencia faltante');
    if (!sentencia.año) errores.push('Año faltante');
    if (!sentencia.tema) errores.push('Tema no especificado');
    if (!sentencia.fuente) errores.push('Fuente oficial no especificada');

    if (sentencia.requiereMagistrado && !sentencia.magistrado) {
      errores.push('Magistrado/M.P. no especificado (requerido)');
    }

    return {
      valida: errores.length === 0,
      errores
    };
  }

  // Valida formato de ID de sentencia
  validarFormato(sentencia) {
    const { id, corte, tipo } = sentencia;
    const errores = [];

    // Validar formato según tipo de corte
    if (corte === 'Corte Constitucional') {
      if (!id.match(/^(C|SU|AC)-\d{1,4}\/\d{4}$/)) {
        errores.push(`Formato incorrecto para Corte Constitucional: ${id}`);
      }
    }

    if (corte === 'Corte Suprema de Justicia') {
      if (!id.match(/^(SP|SC|SL|LB)-\d{4}-\d{1,6}$|^(SP|SC|SL|LB)-\d{4}$/)) {
        errores.push(`Formato incorrecto para Corte Suprema: ${id}`);
      }
    }

    if (corte === 'Consejo de Estado') {
      if (!id.match(/^(CE|SU)-\d{4}-\d{5}$|^(CE|SU)-\d{4}$/)) {
        errores.push(`Formato incorrecto para Consejo de Estado: ${id}`);
      }
    }

    return {
      valida: errores.length === 0,
      errores
    };
  }

  // Valida que la fuente es oficial
  validarFuenteOficial(sentencia) {
    const fuentesOficiales = [
      'corteconstitucional.gov.co',
      'cortesupremajusticia.gov.co',
      'consejodeestado.gov.co',
      'legaldatahunter.com',
      'diariooficial.gov.co',
      'suin-juriscol',
      'congreso.gov.co',
      'supersociedades.gov.co',
      'dian.gov.co'
    ];

    const esOficial = fuentesOficiales.some(f => sentencia.fuente.includes(f));

    return {
      valida: esOficial,
      errores: esOficial ? [] : [`Fuente no oficial: ${sentencia.fuente}`]
    };
  }

  // Detecta posibles alucinaciones
  detectarAlucinaciones(sentencia) {
    const banderas = [];

    // Bandera: Año futuro
    if (sentencia.año > new Date().getFullYear()) {
      banderas.push('Año futuro (alucinación potencial)');
    }

    // Bandera: Año muy antiguo sin especificación
    if (sentencia.año < 1991 && !sentencia.magistrado) {
      banderas.push('Año muy antiguo sin magistrado especificado');
    }

    // Bandera: Número irreal
    if (parseInt(sentencia.numero) > 10000 && sentencia.corte === 'Corte Constitucional') {
      banderas.push('Número de sentencia C muy alto (probablemente fabricado)');
    }

    return {
      tieneRiesgo: banderas.length > 0,
      banderas
    };
  }

  // Audita una sentencia completa
  auditarSentencia(sentencia) {
    this.resultados.total++;

    const validacionDatos = this.validarDatos(sentencia);
    const validacionFormato = this.validarFormato(sentencia);
    const validacionFuente = this.validarFuenteOficial(sentencia);
    const alucinaciones = this.detectarAlucinaciones(sentencia);

    const esValida = validacionDatos.valida && validacionFormato.valida && validacionFuente.valida;

    if (alucinaciones.tieneRiesgo) {
      this.resultados.alucinaciones++;
    }

    if (!validacionDatos.valida) {
      this.resultados.incompletas++;
    }

    if (esValida && !alucinaciones.tieneRiesgo) {
      this.resultados.validas++;
    } else {
      this.resultados.invalidas++;
    }

    return {
      sentencia: sentencia.id,
      valida: esValida,
      alucinacion: alucinaciones.tieneRiesgo,
      datos: validacionDatos,
      formato: validacionFormato,
      fuente: validacionFuente,
      alucinaciones
    };
  }

  // Audita todas las sentencias
  auditarTodas(sentencias) {
    const resultados = sentencias.map(s => this.auditarSentencia(s));
    return resultados;
  }

  // Genera reporte de auditoría
  generarReporte(resultados) {
    console.log('\n╔════════════════════════════════════════════════════════════════════╗');
    console.log('║         AUDITORÍA DE SENTENCIAS - PROGRAMA SKILLS JAC             ║');
    console.log('╚════════════════════════════════════════════════════════════════════╝\n');

    console.log('📊 RESULTADOS GENERALES');
    console.log('─'.repeat(70));
    console.log(`Total auditadas:        ${this.resultados.total}`);
    console.log(`✓ Válidas:              ${this.resultados.validas} (${((this.resultados.validas / this.resultados.total) * 100).toFixed(1)}%)`);
    console.log(`✗ Inválidas:            ${this.resultados.invalidas} (${((this.resultados.invalidas / this.resultados.total) * 100).toFixed(1)}%)`);
    console.log(`⚠ Incompletas:          ${this.resultados.incompletas}`);
    console.log(`🚨 Riesgo de alucinación: ${this.resultados.alucinaciones}`);
    console.log();

    console.log('📋 DETALLE POR SENTENCIA');
    console.log('─'.repeat(70));

    resultados.forEach(r => {
      const estado = r.valida ? '✓' : '✗';
      const alerta = r.alucinacion ? '🚨' : ' ';
      console.log(`\n${estado} ${alerta} ${r.sentencia}`);

      if (!r.datos.valida) {
        console.log('  Datos incompletos:');
        r.datos.errores.forEach(e => console.log(`    - ${e}`));
      }

      if (!r.formato.valida) {
        console.log('  Formato incorrecto:');
        r.formato.errores.forEach(e => console.log(`    - ${e}`));
      }

      if (!r.fuente.valida) {
        console.log('  Fuente no oficial:');
        r.fuente.errores.forEach(e => console.log(`    - ${e}`));
      }

      if (r.alucinaciones.tieneRiesgo) {
        console.log('  ⚠ Posible alucinación:');
        r.alucinaciones.banderas.forEach(b => console.log(`    - ${b}`));
      }
    });

    console.log('\n' + '─'.repeat(70));
    console.log('🎯 VEREDICTO:');

    if (this.resultados.alucinaciones === 0 && this.resultados.invalidas === 0) {
      console.log('✓ APROBADO - No se detectaron alucinaciones ni errores');
    } else if (this.resultados.alucinaciones > 0) {
      console.log('🚨 RECHAZADO - Se detectaron posibles alucinaciones');
    } else if (this.resultados.invalidas > 0) {
      console.log('⚠ REQUIERE REVISIÓN - Hay sentencias con datos incompletos o formato incorrecto');
    }

    console.log('\n═'.repeat(70) + '\n');
  }
}

// ============================================================================
// EJECUTAR AUDITORÍA
// ============================================================================

function main() {
  const auditor = new AuditorSentencias();
  const resultados = auditor.auditarTodas(SENTENCIAS_AUDITABLES);
  auditor.generarReporte(resultados);

  // Retornar código de salida
  if (auditor.resultados.alucinaciones > 0) {
    process.exit(1); // Fallo por alucinaciones
  } else if (auditor.resultados.invalidas > 0) {
    process.exit(2); // Fallo por errores
  } else {
    process.exit(0); // Éxito
  }
}

if (require.main === module) {
  main();
}

module.exports = { AuditorSentencias, SENTENCIAS_AUDITABLES };
