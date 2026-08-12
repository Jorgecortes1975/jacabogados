#!/usr/bin/env node

/**
 * ORQUESTADOR DE LOOPS Y HOOKS
 * Sistema profesional que automatiza:
 * - Ejecución de loops en horarios fijos
 * - Detección de nuevas exportaciones Search Console
 * - Disparos de hooks automáticos
 * - Integración con GAL
 */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const chokidar = require('chokidar');

class OrquestadorLoopsHooks {
  constructor() {
    this.version = '1.0.0';
    this.baseDir = __dirname;
    this.settingsFile = path.join(this.baseDir, '.claude/settings.json');
    this.logsDir = path.join(this.baseDir, 'logs');
    this.logFile = path.join(this.logsDir, 'orquestador.log');
    this.stateFile = path.join(this.baseDir, '.orquestador-state.json');

    // Crear directorio de logs si no existe
    if (!fs.existsSync(this.logsDir)) {
      fs.mkdirSync(this.logsDir, { recursive: true });
    }

    this.estado = this.cargarEstado();
    this.intervales = [];
    this.watchers = [];
    this.loopsConfiguracion = {};
    this.hooksConfiguracion = {};

    this.log(`✓ Orquestador iniciado (v${this.version})`);
  }

  /**
   * Cargar configuración de loops y hooks desde settings.json
   */
  cargarConfiguracion() {
    try {
      const settings = JSON.parse(fs.readFileSync(this.settingsFile, 'utf8'));

      this.loopsConfiguracion = {
        'semanal-zona-casi': {
          nombre: 'Zona de Casi - Semanal',
          schedule: '0 9 * * 1',
          paso: 3,
          skills: settings.loops['semanal-zona-casi']
        },
        'quincenal-ctr-bajo': {
          nombre: 'CTR Bajo - Quincenal',
          schedule: '0 14 * * 5',
          paso: 4,
          skills: settings.loops['quincenal-ctr-bajo']
        },
        'mensual-huecos-contenido': {
          nombre: 'Huecos Mensuales',
          schedule: '0 10 1-7 * 1',
          paso: 2,
          skills: settings.loops['mensual-huecos-contenido']
        },
        'cada-6-semanas-ciclo-completo': {
          nombre: 'Ciclo Completo 6 Semanas',
          tipo: 'timer',
          duracion: '6 semanas',
          paso: 6,
          skills: settings.loops['cada-6-semanas-ciclo-completo']
        }
      };

      this.hooksConfiguracion = {
        'exportacion-descargada': {
          nombre: 'Exportación descargada',
          tipo: 'file-created',
          patron: 'search-console-*/Consultas.csv',
          paso: 1,
          skills: settings.hooks['exportacion-descargada']
        },
        'contenido-publicado': {
          nombre: 'Contenido publicado',
          tipo: 'manual-o-loop',
          paso: 5,
          skills: settings.hooks['contenido-publicado']
        },
        '6-semanas-transcurridas': {
          nombre: 'Ciclo 6 semanas completado',
          tipo: 'timer',
          duracion: '6 semanas',
          paso: 6,
          skills: settings.hooks['6-semanas-transcurridas']
        }
      };

      this.log('✓ Configuración de loops y hooks cargada');
      return true;
    } catch (error) {
      this.log(`✗ Error cargando configuración: ${error.message}`);
      return false;
    }
  }

  /**
   * Iniciar watchers y schedulers
   */
  iniciar() {
    this.log('═══════════════════════════════════════════════════════════════');
    this.log('🚀 INICIANDO ORQUESTADOR DE LOOPS Y HOOKS');
    this.log('═══════════════════════════════════════════════════════════════');

    if (!this.cargarConfiguracion()) {
      this.log('✗ No se pudo cargar configuración. Abortando.');
      return false;
    }

    // Iniciar detectores de archivos
    this.iniciarWatcherExportaciones();

    // Iniciar schedulers de loops
    this.iniciarLoopsSchedulers();

    // Iniciar timers para triggers de 6 semanas
    this.iniciarTimers6Semanas();

    this.log('✓ Orquestador listo. Escuchando eventos...');
    this.log('═══════════════════════════════════════════════════════════════\n');

    return true;
  }

  /**
   * Watcher: Detectar nuevas exportaciones de Search Console
   */
  iniciarWatcherExportaciones() {
    const patronBusqueda = 'search-console-*/Consultas.csv';
    const searchConsoleDirs = path.join(this.baseDir, 'search-console-*');

    const watcher = chokidar.watch(searchConsoleDirs, {
      ignored: /(^|[\/\\])\./,
      persistent: true,
      usePolling: true,
      interval: 1000
    });

    watcher.on('add', (filepath) => {
      if (filepath.endsWith('Consultas.csv')) {
        this.dispararHook('exportacion-descargada', filepath);
      }
    });

    this.watchers.push(watcher);
    this.log('✓ Watcher: Exportaciones Search Console activo');
  }

  /**
   * Scheduler: Ejecutar loops en horarios fijos (cron-like)
   */
  iniciarLoopsSchedulers() {
    const cronParser = require('cron-parser');

    Object.entries(this.loopsConfiguracion).forEach(([loopId, config]) => {
      if (config.tipo === 'timer') {
        this.log(`⏱️  Loop "${config.nombre}" (${config.duracion}) - Próxima ejecución: En ${config.duracion}`);
        return;
      }

      try {
        const interval = cronParser.parseExpression(config.schedule);
        const proximaEjecucion = interval.next().toDate();

        this.log(`📅 Loop "${config.nombre}" - Schedule: ${config.schedule}`);
        this.log(`   Próxima ejecución: ${proximaEjecucion.toLocaleString('es-CO')}`);

        // Schedulear usando timeout hasta próxima ejecución
        this.programarLoopEnHorario(loopId, config, proximaEjecucion);
      } catch (error) {
        this.log(`✗ Error parseando schedule para ${loopId}: ${error.message}`);
      }
    });
  }

  /**
   * Programar ejecución de loop en horario específico
   */
  programarLoopEnHorario(loopId, config, proximaEjecucion) {
    const ahora = new Date();
    const tiempoHasta = proximaEjecucion.getTime() - ahora.getTime();

    if (tiempoHasta > 0) {
      const timeout = setTimeout(() => {
        this.dispararLoop(loopId, config);
        // Reprogramar para próxima ejecución
        const cronParser = require('cron-parser');
        const interval = cronParser.parseExpression(config.schedule);
        const proxima = interval.next().toDate();
        this.programarLoopEnHorario(loopId, config, proxima);
      }, tiempoHasta);

      this.intervales.push(timeout);
    }
  }

  /**
   * Iniciar timers para triggers de 6 semanas
   */
  iniciarTimers6Semanas() {
    const seisSemanas = 6 * 7 * 24 * 60 * 60 * 1000; // ms

    // Verificar si hay ciclos pendientes de 6 semanas
    Object.entries(this.hooksConfiguracion).forEach(([hookId, config]) => {
      if (config.tipo === 'timer' && config.duracion === '6 semanas') {
        const ultimaEjecucion = this.estado.ultimasEjecuciones?.[hookId] || new Date(0);
        const ahora = new Date();
        const tiempoTranscurrido = ahora.getTime() - ultimaEjecucion.getTime();

        if (tiempoTranscurrido >= seisSemanas) {
          this.log(`⚠️  ${config.nombre} está VENCIDO - Ejecutando ahora`);
          this.dispararHook(hookId, null);
        } else {
          const proximaEjecucion = new Date(ultimaEjecucion.getTime() + seisSemanas);
          const tiempoHasta = proximaEjecucion.getTime() - ahora.getTime();

          this.log(`⏱️  ${config.nombre} - Próxima ejecución: ${proximaEjecucion.toLocaleString('es-CO')}`);

          const timeout = setTimeout(() => {
            this.dispararHook(hookId, null);
          }, tiempoHasta);

          this.intervales.push(timeout);
        }
      }
    });
  }

  /**
   * DISPARAR HOOK - Ejecutar paso cuando se detecta evento
   */
  dispararHook(hookId, datos) {
    const config = this.hooksConfiguracion[hookId];
    if (!config) return;

    this.log(`\n🔔 HOOK DISPARADO: ${config.nombre}`);
    this.log(`   Tipo: ${config.tipo}`);
    if (datos) this.log(`   Datos: ${datos}`);

    this.ejecutarPaso(config.paso, hookId, 'hook');

    // Guardar timestamp
    this.guardarEjecucion(hookId);
  }

  /**
   * DISPARAR LOOP - Ejecutar paso en horario programado
   */
  dispararLoop(loopId, config) {
    this.log(`\n📅 LOOP EJECUTADO: ${config.nombre}`);
    this.log(`   Paso: ${config.paso}`);

    this.ejecutarPaso(config.paso, loopId, 'loop');

    // Guardar timestamp
    this.guardarEjecucion(loopId);
  }

  /**
   * EJECUTAR PASO - Llamar al executor
   */
  ejecutarPaso(numeroPaso, origenId, tipo) {
    this.log(`\n⚙️  Ejecutando Paso ${numeroPaso}...`);

    const executor = spawn('node', [
      'executor-prompts-legal-search-console.js',
      'ejecutar',
      numeroPaso.toString()
    ], {
      cwd: this.baseDir,
      stdio: 'pipe'
    });

    let output = '';
    executor.stdout.on('data', (data) => {
      output += data.toString();
    });

    executor.stderr.on('data', (data) => {
      this.log(`⚠️  Stderr: ${data.toString()}`);
    });

    executor.on('close', (code) => {
      if (code === 0) {
        this.log(`✓ Paso ${numeroPaso} ejecutado exitosamente`);
        this.notificarGAL({
          tipo: 'paso-completado',
          paso: numeroPaso,
          origen: origenId,
          tipoOrigen: tipo,
          timestamp: new Date().toISOString()
        });
      } else {
        this.log(`✗ Error ejecutando Paso ${numeroPaso}: código ${code}`);
      }
    });
  }

  /**
   * Notificar a GAL sobre evento completado
   */
  notificarGAL(evento) {
    const archivoEventos = path.join(this.logsDir, 'eventos-gal.json');

    try {
      let eventos = [];
      if (fs.existsSync(archivoEventos)) {
        eventos = JSON.parse(fs.readFileSync(archivoEventos, 'utf8'));
      }

      eventos.push(evento);
      fs.writeFileSync(archivoEventos, JSON.stringify(eventos, null, 2), 'utf8');

      this.log(`✓ Evento notificado a GAL: ${evento.tipo}`);
    } catch (error) {
      this.log(`✗ Error notificando a GAL: ${error.message}`);
    }
  }

  /**
   * Guardar timestamp de ejecución
   */
  guardarEjecucion(id) {
    if (!this.estado.ultimasEjecuciones) {
      this.estado.ultimasEjecuciones = {};
    }
    this.estado.ultimasEjecuciones[id] = new Date().toISOString();
    this.guardarEstado();
  }

  /**
   * Cargar estado desde archivo
   */
  cargarEstado() {
    try {
      if (fs.existsSync(this.stateFile)) {
        return JSON.parse(fs.readFileSync(this.stateFile, 'utf8'));
      }
    } catch (error) {
      this.log(`⚠️  Error cargando estado: ${error.message}`);
    }
    return { ultimasEjecuciones: {} };
  }

  /**
   * Guardar estado en archivo
   */
  guardarEstado() {
    try {
      fs.writeFileSync(this.stateFile, JSON.stringify(this.estado, null, 2), 'utf8');
    } catch (error) {
      this.log(`✗ Error guardando estado: ${error.message}`);
    }
  }

  /**
   * Log
   */
  log(mensaje) {
    const timestamp = new Date().toISOString();
    const linea = `[${timestamp}] ${mensaje}`;
    console.log(linea);

    try {
      fs.appendFileSync(this.logFile, linea + '\n', 'utf8');
    } catch (error) {
      console.error(`Error escribiendo log: ${error.message}`);
    }
  }

  /**
   * Detener orquestador
   */
  detener() {
    this.log('\n🛑 Deteniendo orquestador...');

    // Limpiar intervalos
    this.intervales.forEach(interval => clearTimeout(interval));
    this.intervales = [];

    // Cerrar watchers
    this.watchers.forEach(watcher => watcher.close());
    this.watchers = [];

    this.log('✓ Orquestador detenido');
  }

  /**
   * Ver estado
   */
  verEstado() {
    console.log('\n╔════════════════════════════════════════════════════════════════╗');
    console.log('║         ESTADO DEL ORQUESTADOR                                 ║');
    console.log('╚════════════════════════════════════════════════════════════════╝\n');

    console.log('📅 LOOPS CONFIGURADOS:');
    Object.entries(this.loopsConfiguracion).forEach(([id, config]) => {
      console.log(`  • ${config.nombre} (${config.schedule || config.duracion})`);
    });

    console.log('\n🔔 HOOKS CONFIGURADOS:');
    Object.entries(this.hooksConfiguracion).forEach(([id, config]) => {
      console.log(`  • ${config.nombre} (${config.tipo})`);
    });

    console.log('\n⏱️  ÚLTIMAS EJECUCIONES:');
    if (Object.keys(this.estado.ultimasEjecuciones || {}).length === 0) {
      console.log('  (Ninguna aún)');
    } else {
      Object.entries(this.estado.ultimasEjecuciones).forEach(([id, timestamp]) => {
        const fecha = new Date(timestamp).toLocaleString('es-CO');
        console.log(`  • ${id}: ${fecha}`);
      });
    }

    console.log('\n');
  }
}

// Main
const comando = process.argv[2] || 'iniciar';
const orquestador = new OrquestadorLoopsHooks();

switch (comando) {
  case 'iniciar':
    orquestador.iniciar();
    // Mantener el proceso vivo
    process.on('SIGINT', () => {
      orquestador.detener();
      process.exit(0);
    });
    process.on('SIGTERM', () => {
      orquestador.detener();
      process.exit(0);
    });
    break;

  case 'status':
    orquestador.cargarConfiguracion();
    orquestador.verEstado();
    break;

  case 'help':
  default:
    console.log(`
╔════════════════════════════════════════════════════════════════╗
║  ORQUESTADOR DE LOOPS Y HOOKS - Sistema Automático            ║
╚════════════════════════════════════════════════════════════════╝

COMANDOS:

  # Iniciar orquestador automático (mantiene proceso activo)
  node orquestador-loops-hooks.js iniciar

  # Ver estado de loops y hooks
  node orquestador-loops-hooks.js status

  # Ver esta ayuda
  node orquestador-loops-hooks.js help

FUNCIONALIDADES:

  ✓ Detecta automáticamente nuevas exportaciones Search Console
  ✓ Ejecuta loops en horarios fijos (semanal, quincenal, mensual)
  ✓ Dispara hooks después de 6 semanas
  ✓ Integra con executor-prompts-legal-search-console.js
  ✓ Notifica a GAL sobre eventos completados
  ✓ Mantiene logs centralizados
  ✓ Persiste estado entre reinicios

ARQUITETURA:

  1. Watchers → Detectan eventos (file-created, timer)
  2. Schedulers → Ejecutan loops en horarios fijos
  3. Executor → Corre los pasos (1-11)
  4. GAL → Recibe notificaciones de eventos
  5. Logs → Registro completo de todo

ARCHIVOS GENERADOS:

  .orquestador-state.json        - Estado persistente
  logs/orquestador.log           - Historial de ejecuciones
  logs/eventos-gal.json          - Eventos para GAL

    `);
}
