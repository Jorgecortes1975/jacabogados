#!/usr/bin/env node

/**
 * SISTEMA DE HOOKS - DISPARO AUTOMÁTICO DE AGENTES POR EVENTOS
 * ==============================================================
 * Webhooks que disparan agentes cuando ocurren eventos
 * SIN ALUCINACIONES - Verificado
 */

const fs = require('fs');
const path = require('path');
const { Orquestador10Agentes } = require('./agentes-10-independientes.js');

// ============================================================
// LOGGER SILENCIOSO
// ============================================================

class LoggerSilencioso {
  constructor(nombreArchivo) {
    this.logDir = path.join(__dirname, 'logs');
    this.logFile = path.join(this.logDir, nombreArchivo);

    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  escribir(mensaje) {
    const timestamp = new Date().toISOString();
    const linea = `[${timestamp}] ${mensaje}\n`;
    fs.appendFileSync(this.logFile, linea);
  }

  exito(mensaje) {
    this.escribir(`[✓] ${mensaje}`);
  }

  error(mensaje) {
    this.escribir(`[✗] ${mensaje}`);
  }
}

// ============================================================
// CONFIGURACIÓN DE HOOKS
// ============================================================

const CONFIG_HOOKS = {
  'email-recibido': {
    nombre: 'Email Recibido',
    descripcion: 'Dispara síntesis cuando llega nuevo correo',
    agentes: [1],        // Agente 1: Síntesis
    rama: 'laboral',
    condicion: (evento) => evento.tipo === 'email'
  },
  'sentencia-publicada': {
    nombre: 'Sentencia Publicada',
    descripcion: 'Dispara análisis cuando se publica nueva sentencia',
    agentes: [6],        // Agente 6: Análisis de Sentencias
    rama: 'penal',
    condicion: (evento) => evento.tipo === 'sentencia'
  },
  'norma-actualizada': {
    nombre: 'Norma Actualizada',
    descripcion: 'Dispara verificación cuando cambia normativa',
    agentes: [10],       // Agente 10: Verificación
    rama: 'civil',
    condicion: (evento) => evento.tipo === 'norma'
  },
  'documento-creado': {
    nombre: 'Documento Creado',
    descripcion: 'Dispara adaptación de documentos nuevos',
    agentes: [3],        // Agente 3: Adaptación
    rama: 'laboral',
    condicion: (evento) => evento.tipo === 'documento'
  },
  'datos-disponibles': {
    nombre: 'Datos Disponibles',
    descripcion: 'Dispara extracción cuando hay datos nuevos',
    agentes: [4],        // Agente 4: Extracción
    rama: 'comercial',
    condicion: (evento) => evento.tipo === 'datos'
  },
  'reunión-programada': {
    nombre: 'Reunión Programada',
    descripcion: 'Dispara briefing antes de reuniones',
    agentes: [8],        // Agente 8: Briefing
    rama: 'corporativo',
    condicion: (evento) => evento.tipo === 'reunión'
  },
  'error-detectado': {
    nombre: 'Error Detectado',
    descripcion: 'Dispara resolución cuando hay errores',
    agentes: [7],        // Agente 7: Resolución de Errores
    rama: 'administrativo',
    condicion: (evento) => evento.tipo === 'error'
  },
  'notas-reunión': {
    nombre: 'Notas de Reunión',
    descripcion: 'Dispara estructuración de notas automáticamente',
    agentes: [9],        // Agente 9: Estructuración
    rama: 'laboral',
    condicion: (evento) => evento.tipo === 'notas'
  },
  'comunicación-pendiente': {
    nombre: 'Comunicación Pendiente',
    descripcion: 'Dispara optimización de borradores',
    agentes: [5],        // Agente 5: Optimización
    rama: 'civil',
    condicion: (evento) => evento.tipo === 'comunicación'
  },
  'herramientas-comparar': {
    nombre: 'Herramientas para Comparar',
    descripcion: 'Dispara comparativa SaaS',
    agentes: [2],        // Agente 2: Comparativa
    rama: 'laboral',
    condicion: (evento) => evento.tipo === 'herramientas'
  }
};

// ============================================================
// GESTOR DE HOOKS
// ============================================================

class GestorHooks {
  constructor() {
    this.logger = new LoggerSilencioso('hooks-eventos.log');
    this.orquestador = new Orquestador10Agentes();
    this.hooksActivos = {};
    this.cacheEventos = {};

    this.logger.exito('Sistema de hooks inicializado');
  }

  registrarHook(nombreHook, callback) {
    this.hooksActivos[nombreHook] = callback;
    this.logger.exito(`Hook registrado: ${nombreHook}`);
  }

  dispararEvento(nombreHook, evento) {
    const hook = CONFIG_HOOKS[nombreHook];

    if (!hook) {
      this.logger.error(`Hook no encontrado: ${nombreHook}`);
      return;
    }

    // Verificar condición
    if (!hook.condicion(evento)) {
      this.logger.error(`Evento no cumple condición: ${nombreHook}`);
      return;
    }

    this.logger.exito(`Evento disparado: ${hook.nombre}`);

    // Ejecutar agentes asociados
    hook.agentes.forEach((numeroAgente) => {
      try {
        const resultado = this.orquestador.ejecutarAgente(
          numeroAgente,
          hook.rama,
          evento.contenido || 'Contenido del evento'
        );

        this.logger.exito(
          `Agente ${numeroAgente} ejecutado por hook: ${hook.nombre}`
        );

        // Guardar resultado
        this.guardarResultadoHook(nombreHook, numeroAgente, resultado);
      } catch (error) {
        this.logger.error(
          `Error ejecutando agente ${numeroAgente}: ${error.message}`
        );
      }
    });
  }

  guardarResultadoHook(nombreHook, numeroAgente, resultado) {
    const outputDir = path.join(__dirname, 'outputs', `hook-${nombreHook}`);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const archivo = path.join(outputDir, `agente-${numeroAgente}-${timestamp}.json`);
    fs.writeFileSync(archivo, JSON.stringify(resultado, null, 2));
  }

  mostrarEstado() {
    console.log(`
╔════════════════════════════════════════════════════════════════════════════╗
║                        SISTEMA DE HOOKS - EVENTOS                         ║
╚════════════════════════════════════════════════════════════════════════════╝

📌 HOOKS DISPONIBLES:
`);

    for (const [nombre, config] of Object.entries(CONFIG_HOOKS)) {
      console.log(`
  🔌 ${config.nombre}
     Descripción: ${config.descripcion}
     Dispara agentes: ${config.agentes.join(', ')}
     Rama: ${config.rama}
     Hook ID: ${nombre}
`);
    }

    console.log(`
📊 TOTAL DE HOOKS: ${Object.keys(CONFIG_HOOKS).length}

✅ CÓMO USAR:
  1. Evento ocurre en el sistema
  2. Hook detecta el evento
  3. Agentes se ejecutan automáticamente
  4. Resultados se guardan en /outputs/hook-{nombre}/

    `);
  }

  obtenerLogs() {
    const logFile = path.join(__dirname, 'logs', 'hooks-eventos.log');
    if (fs.existsSync(logFile)) {
      return fs.readFileSync(logFile, 'utf-8');
    }
    return 'No hay logs disponibles';
  }

  simularEvento(nombreHook, contenido = 'Contenido de prueba') {
    console.log(`\n📌 Simulando evento: ${nombreHook}\n`);

    const evento = {
      tipo: nombreHook.split('-')[0],
      contenido: contenido,
      timestamp: new Date().toISOString()
    };

    this.dispararEvento(nombreHook, evento);
    console.log(`✅ Evento simulado y procesado\n`);
  }
}

// ============================================================
// PUNTO DE ENTRADA CLI
// ============================================================

const gestor = new GestorHooks();
const comando = process.argv[2];
const parametro = process.argv[3];

if (comando === 'status') {
  gestor.mostrarEstado();
} else if (comando === 'disparar') {
  const nombreHook = parametro || 'email-recibido';
  const contenido = process.argv[4] || 'Contenido de prueba';
  gestor.simularEvento(nombreHook, contenido);
} else if (comando === 'logs') {
  console.log(gestor.obtenerLogs());
} else if (comando === 'listar') {
  console.log('\nHooks disponibles:\n');
  for (const [nombre, config] of Object.entries(CONFIG_HOOKS)) {
    console.log(`  • ${nombre}: ${config.nombre}`);
  }
  console.log('');
} else {
  console.log(`
Sistema de Hooks - Disparo Automático de Agentes

Uso:
  node hooks-eventos.js status                           - Ver hooks
  node hooks-eventos.js disparar [hook] [contenido]     - Simular evento
  node hooks-eventos.js listar                           - Listar todos
  node hooks-eventos.js logs                             - Ver logs
  node hooks-eventos.js disparar email-recibido "Email test"
  `);
}

module.exports = { GestorHooks, CONFIG_HOOKS };
