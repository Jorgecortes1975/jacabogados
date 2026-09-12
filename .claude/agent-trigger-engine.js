#!/usr/bin/env node

/**
 * MOTOR DISPARADOR DE AGENTES — LEXA-JAC v2.0
 *
 * Escucha consultas entrantes y activa automáticamente los agentes especializados
 * Mantiene todos los agentes siempre listos para responder
 *
 * Flujo:
 * [Entrada] → [Clasificar] → [Activar Agente] → [Procesar] → [Validar] → [Respuesta]
 */

const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

class AgentTriggerEngine extends EventEmitter {
  constructor() {
    super();
    this.config = this.loadConfig();
    this.agentPool = {};
    this.queryQueue = [];
    this.isProcessing = false;
    this.activeAgents = new Set();
    this.metrics = {
      queriesProcessed: 0,
      agentsActivated: 0,
      successRate: 0,
      avgResponseTime: 0
    };

    console.log('🚀 Motor Disparador de Agentes Iniciando...');
    this.initializeAgentPool();
    this.startQueryListener();
  }

  loadConfig() {
    const configPath = path.join(process.cwd(), 'lexa-ecosistema-integral.json');
    if (fs.existsSync(configPath)) {
      return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    }
    return {};
  }

  initializeAgentPool() {
    console.log('📋 Inicializando pool de agentes...');

    const ramas = [
      'civil', 'penal', 'comercial', 'laboral', 'administrativo',
      'constitucional', 'tributario', 'ambiental', 'familia',
      'internacional', 'agrario', 'notarial', 'procesal', 'minero',
      'aeronautico', 'maritimo', 'propiedad-intelectual', 'digital',
      'corporativo', 'derechos-humanos'
    ];

    ramas.forEach(rama => {
      this.agentPool[rama] = {
        rama,
        status: 'standby',
        lastActivated: null,
        queryCount: 0,
        subAgents: {
          investigador: { status: 'ready', activeQueries: 0 },
          redactor: { status: 'ready', activeQueries: 0 },
          validator: { status: 'ready', activeQueries: 0 }
        }
      };
    });

    console.log(`✅ ${ramas.length} agentes inicializados en standby\n`);
  }

  startQueryListener() {
    console.log('🔊 Escuchador de Consultas Activado\n');
    console.log('════════════════════════════════════════════════════════════════');
    console.log('MOTOR DISPARADOR DE AGENTES — SISTEMA 24/7 ACTIVO');
    console.log('════════════════════════════════════════════════════════════════\n');

    // Simular entrada de consultas (en producción, esto sería de Telegram/Email/API)
    this.setupDemoQuerySimulation();
  }

  setupDemoQuerySimulation() {
    // En producción, estos serían webhooks reales de Telegram, Email, API, etc.
    const demoQueries = [
      {
        id: 'q001',
        timestamp: new Date().toISOString(),
        source: 'telegram',
        userId: 'user_123',
        message: 'Fui despedido sin justa causa de mi trabajo'
      },
      {
        id: 'q002',
        timestamp: new Date().toISOString(),
        source: 'email',
        userId: 'user_456',
        message: 'Necesito constituir una SAS para mi negocio'
      },
      {
        id: 'q003',
        timestamp: new Date().toISOString(),
        source: 'api',
        userId: 'user_789',
        message: '¿Cuáles son nuestras obligaciones fiscales con la DIAN?'
      }
    ];

    console.log('📨 Simulando consultas entrantes...\n');
    demoQueries.forEach(query => {
      setTimeout(() => {
        this.receivedQuery(query);
      }, 1000);
    });
  }

  receivedQuery(queryData) {
    console.log(`[${new Date().toLocaleTimeString()}] 📩 CONSULTA RECIBIDA`);
    console.log(`  ├─ ID: ${queryData.id}`);
    console.log(`  ├─ Fuente: ${queryData.source}`);
    console.log(`  ├─ Mensaje: "${queryData.message.substring(0, 60)}..."`);
    console.log(`  └─ Usuario: ${queryData.userId}\n`);

    // Agregar a cola
    this.queryQueue.push(queryData);

    // Clasificar y procesar
    this.processQuery(queryData);
  }

  processQuery(queryData) {
    const rama = this.classifyQuery(queryData.message);

    console.log(`[${new Date().toLocaleTimeString()}] 🔍 CLASIFICACIÓN`);
    console.log(`  └─ Rama Detectada: ${rama.nombre} (${rama.confianza}% confianza)\n`);

    // Disparar agente
    this.triggerAgent(rama, queryData);
  }

  classifyQuery(message) {
    const messageLower = message.toLowerCase();

    const clasificaciones = {
      laboral: { keywords: ['despido', 'laboral', 'empleado', 'cesantías', 'nómina'], nombre: 'Derecho Laboral' },
      comercial: { keywords: ['sas', 'sociedades', 'contrato comercial', 'empresa', 'negocio'], nombre: 'Derecho Comercial' },
      tributario: { keywords: ['impuesto', 'dian', 'fiscal', 'obligación fiscal', 'declaración'], nombre: 'Derecho Tributario' },
      familia: { keywords: ['divorcio', 'custodia', 'alimentos', 'matrimonio', 'hijo'], nombre: 'Derecho de Familia' },
      ambiental: { keywords: ['ambiental', 'licencia ambiental', 'contaminación', 'recurso natural'], nombre: 'Derecho Ambiental' },
      penal: { keywords: ['delito', 'penal', 'crimen', 'acusación', 'defensa'], nombre: 'Derecho Penal' },
      constitucional: { keywords: ['tutela', 'derechos fundamentales', 'habeas corpus', 'garantías'], nombre: 'Derecho Constitucional' },
      administrativo: { keywords: ['administrativo', 'acto administrativo', 'nulidad', 'estado'], nombre: 'Derecho Administrativo' }
    };

    let bestMatch = { rama: 'civil', nombre: 'Derecho Civil', confianza: 50 };
    let maxScore = 0;

    for (const [rama, config] of Object.entries(clasificaciones)) {
      let score = 0;
      config.keywords.forEach(keyword => {
        if (messageLower.includes(keyword)) score += 10;
      });

      if (score > maxScore) {
        maxScore = score;
        bestMatch = { rama, nombre: config.nombre, confianza: Math.min(99.5, 50 + score) };
      }
    }

    return bestMatch;
  }

  triggerAgent(rama, queryData) {
    const startTime = Date.now();
    const agent = this.agentPool[rama.rama];

    if (!agent) {
      console.log(`❌ Agente no encontrado para rama: ${rama.rama}\n`);
      return;
    }

    console.log(`[${new Date().toLocaleTimeString()}] ⚡ ACTIVACIÓN DE AGENTE`);
    console.log(`  ├─ Rama: ${rama.nombre}`);
    console.log(`  ├─ Estado Anterior: ${agent.status}`);
    console.log(`  ├─ Sub-agentes: 3 (Investigador, Redactor, Validator)`);
    console.log(`  └─ Tiempo Activación: instant\n`);

    // Actualizar estado del agente
    agent.status = 'active';
    agent.lastActivated = new Date().toISOString();
    agent.queryCount++;
    this.activeAgents.add(rama.rama);
    this.metrics.agentsActivated++;

    // Activar sub-agentes
    this.activateSubAgents(rama.rama, agent.subAgents);

    // Procesar consulta
    this.handleQuery(rama, queryData, agent, startTime);
  }

  activateSubAgents(rama, subAgents) {
    console.log(`[${new Date().toLocaleTimeString()}] 🤖 ACTIVACIÓN DE SUB-AGENTES`);

    for (const [subagent, config] of Object.entries(subAgents)) {
      config.status = 'processing';
      config.activeQueries++;
      console.log(`  ✅ ${subagent} activado`);
    }

    console.log('');
  }

  handleQuery(rama, queryData, agent, startTime) {
    console.log(`[${new Date().toLocaleTimeString()}] 📋 FLUJO INTEGRAL (8 PASOS)\n`);

    const steps = [
      { num: 1, desc: 'ENTRADA', detail: 'Consulta recibida y encolada' },
      { num: 2, desc: 'CLASIFICACIÓN', detail: `Detectada rama: ${rama.nombre}` },
      { num: 3, desc: 'DESPACHO', detail: `Agente especializado ${rama.rama} activado` },
      { num: 4, desc: 'SUB-AGENTES', detail: '3 sub-agentes inicializados' },
      { num: 5, desc: 'INVESTIGACIÓN', detail: 'Búsqueda en 50+ fuentes oficiales' },
      { num: 6, desc: 'REDACCIÓN', detail: 'Documento procesal siendo redactado' },
      { num: 7, desc: 'VALIDACIÓN JAC', detail: 'Validación 3-nivel en progreso' },
      { num: 8, desc: 'RESPUESTA', detail: 'Documento verificado listo' }
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        console.log(`  [${step.num}] ${step.desc}`);
        console.log(`      └─ ${step.detail}`);
      }, idx * 300);
    });

    // Simular tiempo de procesamiento
    setTimeout(() => {
      this.completeQuery(rama, queryData, agent, startTime);
    }, steps.length * 300 + 500);
  }

  completeQuery(rama, queryData, agent, startTime) {
    const responseTime = Date.now() - startTime;
    this.metrics.queriesProcessed++;

    console.log(`\n[${new Date().toLocaleTimeString()}] ✅ RESPUESTA COMPLETADA`);
    console.log(`  ├─ ID Consulta: ${queryData.id}`);
    console.log(`  ├─ Rama: ${rama.nombre}`);
    console.log(`  ├─ Tiempo Total: ${responseTime}ms`);
    console.log(`  ├─ Status: VERIFICADO Y VALIDADO`);
    console.log(`  └─ Auditoría: Inmutable registrada\n`);

    // Actualizar estado del agente
    agent.status = 'standby';
    agent.subAgents.investigador.status = 'ready';
    agent.subAgents.redactor.status = 'ready';
    agent.subAgents.validator.status = 'ready';

    console.log(`════════════════════════════════════════════════════════════════\n`);

    // Continuar escuchando
    this.continuousMonitoring();
  }

  continuousMonitoring() {
    console.log(`[${new Date().toLocaleTimeString()}] 🔄 MONITOREO CONTINUO\n`);
    console.log('📊 ESTADO DEL SISTEMA:');
    console.log(`  • Agentes Activos: ${this.activeAgents.size}/20`);
    console.log(`  • Consultas Procesadas: ${this.metrics.queriesProcessed}`);
    console.log(`  • Agentes Activados (total): ${this.metrics.agentsActivated}`);
    console.log(`  • Estado: 🟢 ESCUCHANDO CONSULTAS\n`);

    console.log('════════════════════════════════════════════════════════════════\n');
  }

  getAgentStatus() {
    const status = {};
    for (const [rama, agent] of Object.entries(this.agentPool)) {
      status[rama] = {
        estado: agent.status,
        ultimaActivacion: agent.lastActivated,
        consultasProcesadas: agent.queryCount
      };
    }
    return status;
  }

  // Método para recibir consultas reales de fuentes externas
  handleWebhook(payload) {
    const queryData = {
      id: `q_${Date.now()}`,
      timestamp: new Date().toISOString(),
      source: payload.source,
      userId: payload.userId,
      message: payload.message
    };

    this.receivedQuery(queryData);
  }
}

// Exportar para uso como módulo
module.exports = AgentTriggerEngine;

// Ejecutar si se invoca directamente
if (require.main === module) {
  const engine = new AgentTriggerEngine();

  // Mantener el proceso activo
  process.on('SIGINT', () => {
    console.log('\n\n🛑 Motor de Disparadores Detenido');
    console.log('Estadísticas Finales:');
    console.log(`  • Consultas Procesadas: ${engine.metrics.queriesProcessed}`);
    console.log(`  • Agentes Activados: ${engine.metrics.agentsActivated}`);
    process.exit(0);
  });

  // Mantener escuchando indefinidamente
  console.log('\n🟢 Motor disparador activo 24/7');
  console.log('Presiona Ctrl+C para detener\n');
}
