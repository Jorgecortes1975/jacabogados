#!/usr/bin/env node

/**
 * Executor - Prompts Search Console + Legal
 * Ejecuta secuencialmente los 11 prompts para análisis de Search Console
 *
 * Uso:
 *   node executor-prompts-legal-search-console.js ejecutar <paso-inicio>
 *   node executor-prompts-legal-search-console.js status
 *   node executor-prompts-legal-search-console.js help
 */

const fs = require('fs');
const path = require('path');

class ExecutorPromptsLegal {
  constructor() {
    this.version = "1.0";
    this.baseDir = path.join(__dirname, 'prompts-search-console');
    this.logFile = path.join(__dirname, 'logs', 'executor-sc.log');
    this.progressFile = path.join(__dirname, '.progress-sc.json');

    // Crear directorio de logs
    const logsDir = path.dirname(this.logFile);
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    this.secuencia = [
      {
        orden: 1,
        id: "inventario",
        grupo: "grupo1_diagnostico",
        nombre: "Paso 1: Inventario de Exportación Legal",
        archivo: "paso-1-inventario-legal.md",
        duracion: "10 min",
        estado: "pendiente"
      },
      {
        orden: 2,
        id: "huecos_contenido",
        grupo: "grupo2_huecos",
        nombre: "Paso 2A: Huecos de Contenido Legal",
        archivo: "paso-2a-huecos-contenido-legal.md",
        duracion: "15 min",
        estado: "pendiente"
      },
      {
        orden: 3,
        id: "zona_casi",
        grupo: "grupo2_huecos",
        nombre: "Paso 2B: Zona de Casi (Posición 8-20)",
        archivo: "paso-2b-zona-casi.md",
        duracion: "15 min",
        estado: "pendiente"
      },
      {
        orden: 4,
        id: "ctr_bajo",
        grupo: "grupo2_huecos",
        nombre: "Paso 2C: Sales Alto Pero No Te Dan Clic",
        archivo: "paso-2c-ctr-bajo.md",
        duracion: "15 min",
        estado: "pendiente"
      },
      {
        orden: 5,
        id: "canibalizacion",
        grupo: "grupo2_huecos",
        nombre: "Paso 2D: Canibalización [OPCIONAL]",
        archivo: "paso-2d-canibalizacion.md",
        duracion: "15 min",
        estado: "pendiente",
        opcional: true
      },
      {
        orden: 6,
        id: "tabla_priorizada",
        grupo: "grupo3_priorizacion",
        nombre: "Paso 3: Tabla de Qué Hago Primero",
        archivo: "paso-3-tabla-priorizada.md",
        duracion: "20 min",
        estado: "pendiente"
      },
      {
        orden: 7,
        id: "brief_legal",
        grupo: "grupo4_produccion",
        nombre: "Paso 4A: Brief Antes del Artículo Legal",
        archivo: "paso-4a-brief-legal.md",
        duracion: "20 min",
        estado: "pendiente"
      },
      {
        orden: 8,
        id: "articulo_completo",
        grupo: "grupo4_produccion",
        nombre: "Paso 4B: Artículo Completo (Con Datos Legales)",
        archivo: "paso-4b-articulo-completo.md",
        duracion: "45 min",
        estado: "pendiente"
      },
      {
        orden: 9,
        id: "auditoria_plugin",
        grupo: "grupo5_auditoria",
        nombre: "Paso 5A: Auditar con Plugin",
        archivo: "paso-5a-auditoria-plugin.md",
        duracion: "15 min",
        estado: "pendiente"
      },
      {
        orden: 10,
        id: "titulos_descripciones",
        grupo: "grupo5_auditoria",
        nombre: "Paso 5B: Reescribir Títulos y Descripciones",
        archivo: "paso-5b-titulos-descripciones.md",
        duracion: "20 min",
        estado: "pendiente"
      },
      {
        orden: 11,
        id: "comparacion_6semanas",
        grupo: "grupo6_medicion",
        nombre: "Paso 6: Medir a las Seis Semanas",
        archivo: "paso-6-comparacion-6-semanas.md",
        duracion: "20 min",
        estado: "pendiente"
      }
    ];
  }

  /**
   * Ejecutar la secuencia desde un paso específico
   */
  ejecutar(pasoInicio = 1) {
    console.log("\n🚀 EXECUTOR - Prompts Search Console + Legal");
    console.log("═══════════════════════════════════════════════════════════════\n");

    const estado = this.cargarProgreso();

    if (pasoInicio < 1 || pasoInicio > this.secuencia.length) {
      console.log(`❌ Error: Paso debe estar entre 1 y ${this.secuencia.length}`);
      return;
    }

    const pasoActual = this.secuencia[pasoInicio - 1];

    console.log(`📍 Iniciando en: ${pasoActual.nombre}`);
    console.log(`⏱️  Duración estimada: ${pasoActual.duracion}\n`);

    // Mostrar instrucciones
    this.mostrarInstrucciones(pasoActual, pasoInicio);

    // Guardar progreso
    this.guardarProgreso({
      ultimo_paso: pasoInicio,
      ultimo_paso_id: pasoActual.id,
      timestamp: new Date().toISOString(),
      estado: "en_ejecucion"
    });
  }

  /**
   * Mostrar instrucciones para el paso actual
   */
  mostrarInstrucciones(paso, numeroOrden) {
    console.log("📋 INSTRUCCIONES:");
    console.log("─────────────────────────────────────────────────────────────\n");

    // Mostrar el contenido del prompt
    const rutaPrompt = path.join(this.baseDir, paso.grupo, paso.archivo);

    if (fs.existsSync(rutaPrompt)) {
      const contenido = fs.readFileSync(rutaPrompt, 'utf8');
      console.log(contenido);
    } else {
      console.log(`⚠️  Archivo no encontrado: ${paso.archivo}`);
      console.log(`📂 Ruta esperada: ${rutaPrompt}`);
    }

    console.log("\n─────────────────────────────────────────────────────────────");
    this.mostrarProximosPasos(numeroOrden);
  }

  /**
   * Mostrar próximos pasos después del actual
   */
  mostrarProximosPasos(pasoActual) {
    console.log("\n📌 FLUJO RECOMENDADO:");
    console.log("─────────────────────────────────────────────────────────────");

    if (pasoActual === 1) {
      console.log("1. ✓ Ejecutas PASO 1 (Inventario)");
      console.log("2. → Esperas respuesta de Claude");
      console.log("3. → Copias el resultado");
      console.log("4. → Ejecutas: node executor-prompts-legal-search-console.js ejecutar 2");
      console.log("5. → Continúas paso a paso...\n");
    } else if (pasoActual < this.secuencia.length) {
      const proximoPaso = this.secuencia[pasoActual];
      console.log(`Paso actual: ${pasoActual} / ${this.secuencia.length}`);
      console.log(`Próximo: node executor-prompts-legal-search-console.js ejecutar ${pasoActual + 1}\n`);
    } else {
      console.log("🎉 ¡ÚLTIMO PASO COMPLETADO!");
      console.log("Próximo ciclo: Espera 6 semanas → Descarga nuevo export → Paso 1\n");
    }
  }

  /**
   * Mostrar estado actual del progreso
   */
  status() {
    console.log("\n📊 ESTADO - Prompts Search Console + Legal");
    console.log("═══════════════════════════════════════════════════════════════\n");

    const estado = this.cargarProgreso();

    if (!estado.ultimo_paso) {
      console.log("Estado: NO INICIADO");
      console.log("Próximo paso: Paso 1 (Inventario)");
      console.log("\nComando: node executor-prompts-legal-search-console.js ejecutar 1\n");
      return;
    }

    console.log(`Estado: ${estado.estado.toUpperCase()}`);
    console.log(`Último paso ejecutado: ${estado.ultimo_paso_id}`);
    console.log(`Timestamp: ${estado.timestamp}\n`);

    // Mostrar progreso visual
    console.log("Progreso:");
    this.secuencia.forEach((paso, idx) => {
      const completado = idx + 1 <= estado.ultimo_paso ? "✓" : "○";
      const actual = idx + 1 === estado.ultimo_paso ? " ← AQUÍ" : "";
      console.log(`  [${completado}] Paso ${paso.orden}: ${paso.nombre}${actual}`);
    });

    console.log(`\n${estado.ultimo_paso}/${this.secuencia.length} pasos`);
    console.log(`Porcentaje: ${Math.round(estado.ultimo_paso / this.secuencia.length * 100)}%\n`);

    console.log("Próximo comando:");
    if (estado.ultimo_paso < this.secuencia.length) {
      const proximoPaso = estado.ultimo_paso + 1;
      console.log(`node executor-prompts-legal-search-console.js ejecutar ${proximoPaso}\n`);
    } else {
      console.log("Ciclo completado. Espera 6 semanas y descarga nuevo export.\n");
    }
  }

  /**
   * Cargar progreso desde archivo
   */
  cargarProgreso() {
    if (fs.existsSync(this.progressFile)) {
      const contenido = fs.readFileSync(this.progressFile, 'utf8');
      return JSON.parse(contenido);
    }
    return { ultimo_paso: 0, estado: "no_iniciado" };
  }

  /**
   * Guardar progreso en archivo
   */
  guardarProgreso(datos) {
    fs.writeFileSync(this.progressFile, JSON.stringify(datos, null, 2), 'utf8');
    this.log(`Progreso guardado: Paso ${datos.ultimo_paso}`);
  }

  /**
   * Registrar en log
   */
  log(mensaje) {
    const timestamp = new Date().toISOString();
    const linea = `[${timestamp}] ${mensaje}\n`;
    fs.appendFileSync(this.logFile, linea, 'utf8');
  }

  /**
   * Mostrar ayuda
   */
  help() {
    console.log(`
╔════════════════════════════════════════════════════════════════╗
║  EXECUTOR - Prompts Search Console + Legal para JAC           ║
╚════════════════════════════════════════════════════════════════╝

COMANDOS:

  # Ejecutar desde un paso específico
  node executor-prompts-legal-search-console.js ejecutar <paso>
  node executor-prompts-legal-search-console.js ejecutar 1    # Desde paso 1
  node executor-prompts-legal-search-console.js ejecutar 3    # Desde paso 3

  # Ver estado actual del progreso
  node executor-prompts-legal-search-console.js status

  # Ver esta ayuda
  node executor-prompts-legal-search-console.js help

FLUJO DE TRABAJO:

  1. Descarga exportación de Google Search Console (16 meses, CSV)
  2. Crea carpeta: /home/user/jacabogados/search-console-FECHA/
  3. Ejecuta: node executor-prompts-legal-search-console.js ejecutar 1
  4. Abre Claude Code en esa carpeta
  5. Copia el prompt que te muestra el executor
  6. Pegalo en Claude y espera la respuesta
  7. Ejecuta: node executor-prompts-legal-search-console.js ejecutar 2
  8. Repite hasta paso 11

PASOS:

  Paso 1:  Inventario (10 min)
  Paso 2A: Huecos de contenido (15 min)
  Paso 2B: Zona de casi (15 min)
  Paso 2C: CTR bajo (15 min)
  Paso 2D: Canibalización [OPCIONAL] (15 min)
  Paso 3:  Tabla priorizada (20 min)
  Paso 4A: Brief (20 min)
  Paso 4B: Artículo (45 min)
  Paso 5A: Auditar (15 min)
  Paso 5B: Títulos (20 min)
  Paso 6:  Comparación (20 min)

DURACIÓN TOTAL: 3-4 horas (primera vuelta)

ARCHIVO DE PROGRESO: .progress-sc.json
LOG: logs/executor-sc.log

    `);
  }
}

// Main
const comando = process.argv[2] || 'help';
const argumento = parseInt(process.argv[3]) || 1;
const executor = new ExecutorPromptsLegal();

switch(comando) {
  case 'ejecutar':
    executor.ejecutar(argumento);
    break;
  case 'status':
    executor.status();
    break;
  case 'help':
  default:
    executor.help();
}
