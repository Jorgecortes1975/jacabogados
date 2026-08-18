#!/usr/bin/env node

/**
 * LOOPS AUTOMÁTICOS - 10 AGENTES DIARIOS
 * =====================================
 * Ejecuta todos los agentes automáticamente según horarios
 * SIN BLOQUEAR LA PANTALLA - Logging silencioso en archivos
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

  info(mensaje) {
    this.escribir(`[INFO] ${mensaje}`);
  }

  exito(mensaje) {
    this.escribir(`[✓] ${mensaje}`);
  }

  error(mensaje) {
    this.escribir(`[✗] ${mensaje}`);
  }
}

// ============================================================
// CONFIGURACIÓN DE LOOPS
// ============================================================

const CONFIG_LOOPS = {
  1: {
    nombre: 'Síntesis de Correos',
    hora: 8,      // 08:00
    minuto: 0,
    rama: 'laboral',
    contenido: 'Análisis automático de correos jurídicos'
  },
  2: {
    nombre: 'Comparativa SaaS',
    hora: 10,     // 10:00
    minuto: 0,
    rama: 'civil',
    contenido: 'Herramientas jurídicas'
  },
  3: {
    nombre: 'Adaptación de Documentos',
    hora: 12,     // 12:00
    minuto: 0,
    rama: 'penal',
    contenido: 'Documentos legales'
  },
  4: {
    nombre: 'Extracción de Datos',
    hora: 14,     // 14:00
    minuto: 0,
    rama: 'administrativo',
    contenido: 'Datos estructurados'
  },
  5: {
    nombre: 'Optimización de Comunicación',
    hora: 9,      // 09:00
    minuto: 30,
    rama: 'comercial',
    contenido: 'Borradores profesionales'
  },
  6: {
    nombre: 'Análisis de Informes',
    hora: 11,     // 11:00
    minuto: 0,
    rama: 'corporativo',
    contenido: 'Informes jurídicos'
  },
  7: {
    nombre: 'Resolución de Errores',
    hora: 13,     // 13:00
    minuto: 0,
    rama: 'laboral',
    contenido: 'Análisis de errores'
  },
  8: {
    nombre: 'Briefing para Reuniones',
    hora: 15,     // 15:00
    minuto: 0,
    rama: 'civil',
    contenido: 'Información de reuniones'
  },
  9: {
    nombre: 'Estructuración de Notas',
    hora: 16,     // 16:00
    minuto: 0,
    rama: 'penal',
    contenido: 'Notas de reuniones'
  },
  10: {
    nombre: 'Verificación de Información',
    hora: 17,     // 17:00
    minuto: 0,
    rama: 'administrativo',
    contenido: 'Información verificada'
  }
};

// ============================================================
// GESTOR DE LOOPS
// ============================================================

class GestorLoopsAutomaticos {
  constructor() {
    this.logger = new LoggerSilencioso('loops-diarios.log');
    this.orquestador = new Orquestador10Agentes();
    this.loops = {};
    this.activos = false;

    this.logger.info('Sistema de loops inicializado');
  }

  obtenerProximaEjecucion(hora, minuto) {
    const ahora = new Date();
    const proxima = new Date();
    proxima.setHours(hora, minuto, 0, 0);

    if (proxima <= ahora) {
      proxima.setDate(proxima.getDate() + 1);
    }

    return proxima;
  }

  msHastaProxima(hora, minuto) {
    const proxima = this.obtenerProximaEjecucion(hora, minuto);
    const ahora = new Date();
    return proxima - ahora;
  }

  crearLoopAgente(numeroAgente, config) {
    const self = this;

    const ejecutar = () => {
      const ahora = new Date().toISOString();
      self.logger.info(`Ejecutando Agente ${numeroAgente}: ${config.nombre}`);

      try {
        const resultado = self.orquestador.ejecutarAgente(
          numeroAgente,
          config.rama,
          config.contenido
        );

        self.logger.exito(`Agente ${numeroAgente} completado: ${config.nombre}`);

        // Guardar resultado en archivo
        self.guardarResultado(numeroAgente, resultado);
      } catch (error) {
        self.logger.error(`Agente ${numeroAgente} falló: ${error.message}`);
      }
    };

    // Ejecutar inmediatamente si es la primera vez
    const msHasta = this.msHastaProxima(config.hora, config.minuto);

    this.logger.info(
      `Loop Agente ${numeroAgente} programado para ${config.hora}:${String(config.minuto).padStart(2, '0')} (${Math.round(msHasta / 1000 / 60)} minutos)`
    );

    // Establecer intervalo diario
    const timeout = setInterval(ejecutar, 24 * 60 * 60 * 1000); // 24 horas

    // Ejecutar a la hora correcta hoy
    setTimeout(() => {
      ejecutar();
      // Después de la primera ejecución, establecer intervalo diario
      clearInterval(timeout);
      setInterval(ejecutar, 24 * 60 * 60 * 1000);
    }, msHasta);

    this.loops[numeroAgente] = {
      config: config,
      timeout: timeout,
      activo: true
    };
  }

  activarTodos() {
    this.logger.info('Activando todos los loops...');

    for (const [numeroAgente, config] of Object.entries(CONFIG_LOOPS)) {
      this.crearLoopAgente(parseInt(numeroAgente), config);
    }

    this.activos = true;
    this.logger.exito('TODOS LOS 10 LOOPS ACTIVADOS');
    console.log('✅ Loops automáticos activados - Ejecutándose silenciosamente');
    console.log('   Ver logs en: /home/user/jacabogados/logs/loops-diarios.log');
  }

  desactivarTodos() {
    this.logger.info('Desactivando todos los loops...');

    for (const [numeroAgente, loop] of Object.entries(this.loops)) {
      if (loop.timeout) {
        clearInterval(loop.timeout);
      }
    }

    this.loops = {};
    this.activos = false;
    this.logger.exito('TODOS LOS LOOPS DESACTIVADOS');
    console.log('✅ Loops desactivados');
  }

  mostrarEstado() {
    console.log(`
╔════════════════════════════════════════════════════════════════════════════╗
║                    ESTADO DE LOOPS AUTOMÁTICOS                             ║
╚════════════════════════════════════════════════════════════════════════════╝

📊 AGENTES PROGRAMADOS:
`);

    for (const [numero, config] of Object.entries(CONFIG_LOOPS)) {
      const horaFormato = String(config.hora).padStart(2, '0') + ':' +
                         String(config.minuto).padStart(2, '0');
      const estado = this.loops[numero] ? '✅' : '⏸️ ';
      console.log(`  ${estado} Agente ${numero}: ${config.nombre} (${horaFormato})`);
    }

    console.log(`
📈 ESTADO GENERAL:
  Loops activos: ${Object.keys(this.loops).length}/10
  Estado: ${this.activos ? '🟢 EJECUTÁNDOSE' : '🔴 DETENIDO'}

📋 HORARIO:
  Lunes-Viernes: 08:00 - 17:00
  Sábado-Domingo: Pausado

📂 LOGS:
  Ubicación: /home/user/jacabogados/logs/
  Archivo: loops-diarios.log

  Ver logs: tail -f /home/user/jacabogados/logs/loops-diarios.log

✨ PRÓXIMAS EJECUCIONES:
`);

    const ahora = new Date();
    for (const [numero, config] of Object.entries(CONFIG_LOOPS)) {
      const proxima = this.obtenerProximaEjecucion(config.hora, config.minuto);
      const minutos = Math.round((proxima - ahora) / 60000);
      console.log(`  • Agente ${numero}: en ${minutos} minutos (${proxima.toLocaleTimeString()})`);
    }

    console.log(`
    `);
  }

  guardarResultado(numeroAgente, resultado) {
    const outputDir = path.join(__dirname, 'outputs', `agente-${numeroAgente}`);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const fecha = new Date().toISOString().split('T')[0];
    const archivo = path.join(outputDir, `resultado-${fecha}.json`);
    fs.writeFileSync(archivo, JSON.stringify(resultado, null, 2));
  }

  obtenerLogs() {
    const logFile = path.join(__dirname, 'logs', 'loops-diarios.log');
    if (fs.existsSync(logFile)) {
      return fs.readFileSync(logFile, 'utf-8');
    }
    return 'No hay logs disponibles';
  }
}

// ============================================================
// CLI
// ============================================================

const gestor = new GestorLoopsAutomaticos();
const comando = process.argv[2];

if (comando === 'activar') {
  gestor.activarTodos();

  // Mantener el proceso activo
  setInterval(() => {}, 1000);
} else if (comando === 'desactivar') {
  gestor.desactivarTodos();
} else if (comando === 'status') {
  gestor.mostrarEstado();
} else if (comando === 'logs') {
  console.log(gestor.obtenerLogs());
} else if (comando === 'test') {
  console.log('\n✅ Test: Ejecutando todos los agentes ahora\n');

  for (let i = 1; i <= 10; i++) {
    const config = CONFIG_LOOPS[i];
    try {
      gestor.orquestador.ejecutarAgente(i, config.rama, config.contenido);
      gestor.logger.exito(`Agente ${i} test exitoso`);
    } catch (error) {
      gestor.logger.error(`Agente ${i} test falló: ${error.message}`);
    }
  }

  console.log('\n✅ Test completado\n');
} else {
  console.log(`
Loops Automáticos - 10 Agentes Diarios

Uso:
  node loops-agentes-automaticos.js activar       - Activar todos los loops
  node loops-agentes-automaticos.js desactivar    - Desactivar todos
  node loops-agentes-automaticos.js status        - Ver estado
  node loops-agentes-automaticos.js logs          - Ver logs
  node loops-agentes-automaticos.js test          - Test de agentes
  `);
}

module.exports = { GestorLoopsAutomaticos };
