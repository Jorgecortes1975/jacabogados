#!/usr/bin/env node

/**
 * Instalador de Prompts Search Console + Legal
 * Integra Google Search Console con JAC Legal Audit + GAL (10 Agentes)
 *
 * Uso:
 *   node installador-prompts-legal-search-console.js instalar
 *   node installador-prompts-legal-search-console.js validar
 *   node installador-prompts-legal-search-console.js listar
 */

const fs = require('fs');
const path = require('path');

class InstaladorPromptsLegal {
  constructor() {
    this.version = "1.0";
    this.baseDir = path.join(__dirname, 'prompts-search-console');
    this.configFile = path.join(__dirname, 'config-prompts-sc.json');

    this.prompts = {
      grupo1_diagnostico: {
        paso1_inventario: {
          nombre: "Inventario de Exportación Legal",
          archivo: "paso-1-inventario-legal.md",
          agente: "Agente 8: Extracción de Datos",
          duracion: "10 minutos"
        }
      },
      grupo2_huecos: {
        paso2a_huecos_contenido: {
          nombre: "Huecos de Contenido Legal (Sin página propia)",
          archivo: "paso-2a-huecos-contenido-legal.md",
          agente: "Agente 1: Síntesis Normativa",
          duracion: "15 minutos"
        },
        paso2b_zona_casi: {
          nombre: "Zona de Casi (Posición 8-20)",
          archivo: "paso-2b-zona-casi.md",
          agente: "Agente 5: Prescripción",
          duracion: "15 minutos"
        },
        paso2c_ctr_bajo: {
          nombre: "Sales Alto Pero No Te Dan Clic (CTR Bajo)",
          archivo: "paso-2c-ctr-bajo.md",
          agente: "Agente 4: Análisis de Prueba",
          duracion: "15 minutos"
        },
        paso2d_canibalizacion: {
          nombre: "Canibalización (Opcional - Múltiples Exportaciones)",
          archivo: "paso-2d-canibalizacion.md",
          agente: "Agente 6: Legitimación",
          duracion: "15 minutos",
          opcional: true
        }
      },
      grupo3_priorizacion: {
        paso3_tabla_priorizada: {
          nombre: "Tabla de Qué Hago Primero (Priorización Legal)",
          archivo: "paso-3-tabla-priorizada.md",
          agente: "Agente 10: Puntuación Final",
          duracion: "20 minutos"
        }
      },
      grupo4_produccion: {
        paso4a_brief: {
          nombre: "Brief Antes del Artículo Legal",
          archivo: "paso-4a-brief-legal.md",
          agente: "Agente 2: Jurisprudencia",
          duracion: "20 minutos"
        },
        paso4b_articulo: {
          nombre: "Artículo Completo (Con Datos Legales Propios)",
          archivo: "paso-4b-articulo-completo.md",
          agente: "Agente 3: Análisis de Procedimiento",
          duracion: "45 minutos"
        }
      },
      grupo5_auditoria: {
        paso5a_auditoria_plugin: {
          nombre: "Auditar con Plugin (Sin Código)",
          archivo: "paso-5a-auditoria-plugin.md",
          agente: "Agente 7: Competencia/Readabilidad",
          duracion: "15 minutos"
        },
        paso5b_titulos: {
          nombre: "Reescribir Títulos y Descripciones Que No Ganan Clics",
          archivo: "paso-5b-titulos-descripciones.md",
          agente: "Agente 9: Contramedicinas",
          duracion: "20 minutos"
        }
      },
      grupo6_medicion: {
        paso6_comparacion: {
          nombre: "Medir a las Seis Semanas (Cierre del Ciclo)",
          archivo: "paso-6-comparacion-6-semanas.md",
          agente: "Agente 10: Puntuación Final",
          duracion: "20 minutos"
        }
      }
    };
  }

  /**
   * Instalar: Crear directorio de prompts y distribuir archivos
   */
  instalar() {
    console.log("\n🔧 INSTALADOR - Prompts Search Console + Legal");
    console.log("═══════════════════════════════════════════════════════════════\n");

    // 1. Crear directorio base
    if (!fs.existsSync(this.baseDir)) {
      fs.mkdirSync(this.baseDir, { recursive: true });
      console.log(`✓ Directorio creado: ${this.baseDir}`);
    }

    // 2. Crear subdirectorios por grupo
    const grupos = Object.keys(this.prompts);
    grupos.forEach(grupo => {
      const dirGrupo = path.join(this.baseDir, grupo);
      if (!fs.existsSync(dirGrupo)) {
        fs.mkdirSync(dirGrupo, { recursive: true });
      }
    });
    console.log(`✓ Subdirectorios por grupo: ${grupos.length} creados\n`);

    // 3. Extraer prompts del archivo maestro y guardar cada uno
    const archivoMaestro = path.join(__dirname, 'prompts-search-console-legal-agrupados.md');
    if (fs.existsSync(archivoMaestro)) {
      this.distribuirPrompts(archivoMaestro);
    }

    // 4. Crear archivo de configuración
    this.crearConfiguracion();

    // 5. Crear índice de ejecución
    this.crearIndiceEjecucion();

    console.log("\n✅ INSTALACIÓN COMPLETADA");
    console.log("═══════════════════════════════════════════════════════════════");
    console.log("\nPróximos pasos:");
    console.log("1. node installador-prompts-legal-search-console.js validar");
    console.log("2. node executor-prompts-legal-search-console.js ejecutar");
    console.log("3. Abre la carpeta en Claude Code e introduce el primer prompt\n");
  }

  /**
   * Distribuir cada prompt a su archivo individual
   */
  distribuirPrompts(archivoMaestro) {
    const contenido = fs.readFileSync(archivoMaestro, 'utf8');
    let promptCount = 0;

    Object.keys(this.prompts).forEach(grupo => {
      const pasos = this.prompts[grupo];

      Object.keys(pasos).forEach(paso => {
        const metadata = pasos[paso];
        const dirGrupo = path.join(this.baseDir, grupo);
        const archivoPaso = path.join(dirGrupo, metadata.archivo);

        // Extraer contenido del prompt
        const regex = new RegExp(`### ${metadata.nombre}.*?(?=###|## |$)`, 's');
        const match = contenido.match(regex);

        if (match) {
          fs.writeFileSync(archivoPaso, match[0], 'utf8');
          promptCount++;
          console.log(`  ✓ ${paso}: ${metadata.nombre}`);
        }
      });
    });

    console.log(`\n✓ ${promptCount} prompts distribuidos en archivos individuales\n`);
  }

  /**
   * Crear archivo de configuración JSON
   */
  crearConfiguracion() {
    const config = {
      version: this.version,
      sistema: "JAC Legal Audit v2.0 + Search Console",
      distribucion: "11 prompts + 6 grupos + 10 agentes GAL",
      baseDir: this.baseDir,
      ramas: ["laboral", "penal", "civil", "administrativo", "comercial", "corporativo"],
      agentes: 10,
      prompts: this.prompts,
      instalacion: {
        fecha: new Date().toISOString(),
        version_node: process.version,
        estado: "instalado"
      }
    };

    fs.writeFileSync(this.configFile, JSON.stringify(config, null, 2), 'utf8');
    console.log(`✓ Configuración guardada: ${this.configFile}`);
  }

  /**
   * Crear índice de ejecución (orden secuencial)
   */
  crearIndiceEjecucion() {
    const indice = {
      titulo: "Índice de Ejecución - Prompts Search Console Legal",
      descripcion: "Orden secuencial en que deben ejecutarse los prompts",
      ciclo_completo_duracion: "3-4 horas (primera vuelta)",
      pasos: [
        {
          orden: 1,
          grupo: "Diagnóstico",
          paso: "Paso 1: Inventario",
          descripcion: "Analiza la exportación de Google Search Console",
          duracion: "10 min",
          agente: "Agente 8",
          precondicion: "Exportación CSV descargada"
        },
        {
          orden: 2,
          grupo: "Huecos",
          paso: "Paso 2A: Huecos de Contenido",
          descripcion: "Identifica búsquedas donde apareces pero sin página propia",
          duracion: "15 min",
          agente: "Agente 1",
          precondicion: "Inventario completado"
        },
        {
          orden: 3,
          grupo: "Huecos",
          paso: "Paso 2B: Zona de Casi",
          descripcion: "Búsquedas en posición 8-20: a un empujón de la primera página",
          duracion: "15 min",
          agente: "Agente 5",
          precondicion: "Inventario completado"
        },
        {
          orden: 4,
          grupo: "Huecos",
          paso: "Paso 2C: CTR Bajo",
          descripcion: "Posición buena pero pocos clics: reescribir títulos",
          duracion: "15 min",
          agente: "Agente 4",
          precondicion: "Inventario completado"
        },
        {
          orden: 5,
          grupo: "Huecos",
          paso: "Paso 2D: Canibalización [OPCIONAL]",
          descripcion: "Detectar páginas que compiten entre ellas",
          duracion: "15 min",
          agente: "Agente 6",
          precondicion: "Múltiples exportaciones filtradas (avanzado)",
          opcional: true
        },
        {
          orden: 6,
          grupo: "Priorización",
          paso: "Paso 3: Tabla Priorizada",
          descripcion: "Junta los tres cortes en un calendario ejecutable",
          duracion: "20 min",
          agente: "Agente 10",
          precondicion: "Pasos 2A, 2B, 2C completados"
        },
        {
          orden: 7,
          grupo: "Producción",
          paso: "Paso 4A: Brief Legal",
          descripcion: "Estructura del artículo ANTES de escribir",
          duracion: "20 min",
          agente: "Agente 2",
          precondicion: "Tabla priorizada + seleccionar fila"
        },
        {
          orden: 8,
          grupo: "Producción",
          paso: "Paso 4B: Artículo Completo",
          descripcion: "Redacta con datos legales propios (jurisprudencia, casos)",
          duracion: "45 min",
          agente: "Agente 3",
          precondicion: "Brief aprobado + material tuyo compilado"
        },
        {
          orden: 9,
          grupo: "Auditoría",
          paso: "Paso 5A: Auditar con Plugin",
          descripcion: "Verificar que Google y buscadores de IA puedan leer",
          duracion: "15 min",
          agente: "Agente 7",
          precondicion: "Artículo publicado en vivo"
        },
        {
          orden: 10,
          grupo: "Auditoría",
          paso: "Paso 5B: Títulos y Descripciones",
          descripcion: "Reescribir metadatos para ganar clics",
          duracion: "20 min",
          agente: "Agente 9",
          precondicion: "Análisis CTR completado"
        },
        {
          orden: 11,
          grupo: "Medición",
          paso: "Paso 6: Comparación 6 Semanas",
          descripcion: "Descargar nuevo export y medir si funcionó",
          duracion: "20 min",
          agente: "Agente 10",
          precondicion: "6 semanas desde publicación"
        }
      ],
      observaciones: [
        "Ejecuta paso a paso en orden, no en paralelo",
        "Espera la respuesta completa antes de pasar al siguiente",
        "Los pasos 2A, 2B y 2C pueden ejecutarse en cualquier orden (son independientes)",
        "Paso 2D (Canibalización) es opcional y requiere setup especial",
        "Entre paso 8 (escribir) y paso 9 (auditar), debe pasar tiempo real de publicación",
        "Paso 11 requiere esperar 4-6 semanas después de paso 8",
        "Repite el ciclo cada 6 semanas: paso 1 → paso 2 → ... → paso 11 → paso 1"
      ]
    };

    const archivoIndice = path.join(__dirname, 'indice-ejecucion-prompts-sc.json');
    fs.writeFileSync(archivoIndice, JSON.stringify(indice, null, 2), 'utf8');
    console.log(`✓ Índice de ejecución guardado: ${archivoIndice}`);
  }

  /**
   * Validar instalación
   */
  validar() {
    console.log("\n✅ VALIDACIÓN - Prompts Search Console + Legal");
    console.log("═══════════════════════════════════════════════════════════════\n");

    let archivosEncontrados = 0;
    let archivosEsperados = 0;

    Object.keys(this.prompts).forEach(grupo => {
      const pasos = this.prompts[grupo];

      Object.keys(pasos).forEach(paso => {
        const metadata = pasos[paso];
        const dirGrupo = path.join(this.baseDir, grupo);
        const archivoPaso = path.join(dirGrupo, metadata.archivo);

        archivosEsperados++;

        if (fs.existsSync(archivoPaso)) {
          archivosEncontrados++;
          console.log(`  ✓ ${paso}`);
        } else {
          console.log(`  ✗ ${paso} [FALTA]`);
        }
      });
    });

    console.log(`\n📊 ESTADO: ${archivosEncontrados}/${archivosEsperados} prompts encontrados`);

    if (fs.existsSync(this.configFile)) {
      console.log(`✓ Configuración: OK`);
    } else {
      console.log(`✗ Configuración: FALTA`);
    }

    console.log("\nPróximo paso:");
    console.log("node executor-prompts-legal-search-console.js ejecutar\n");
  }

  /**
   * Listar todos los prompts disponibles
   */
  listar() {
    console.log("\n📋 PROMPTS DISPONIBLES - Search Console + Legal");
    console.log("═══════════════════════════════════════════════════════════════\n");

    Object.keys(this.prompts).forEach(grupo => {
      console.log(`\n${grupo.toUpperCase().replace(/_/g, ' ')}:`);

      const pasos = this.prompts[grupo];
      Object.keys(pasos).forEach(paso => {
        const metadata = pasos[paso];
        const opcional = metadata.opcional ? " [OPCIONAL]" : "";
        console.log(`  • ${metadata.nombre}${opcional}`);
        console.log(`    Agente: ${metadata.agente} | Duración: ${metadata.duracion}`);
      });
    });

    console.log("\n═══════════════════════════════════════════════════════════════");
    console.log(`Total: 11 prompts | 6 grupos | 10 agentes GAL\n`);
  }
}

// Main
const comando = process.argv[2] || 'instalar';
const instalador = new InstaladorPromptsLegal();

switch(comando) {
  case 'instalar':
    instalador.instalar();
    break;
  case 'validar':
    instalador.validar();
    break;
  case 'listar':
    instalador.listar();
    break;
  default:
    console.log(`
╔════════════════════════════════════════════════════════════════╗
║  INSTALADOR - Prompts Search Console + Legal para JAC         ║
╚════════════════════════════════════════════════════════════════╝

COMANDOS:
  node installador-prompts-legal-search-console.js instalar
  node installador-prompts-legal-search-console.js validar
  node installador-prompts-legal-search-console.js listar

DESCRIPCIÓN:
  Instala 11 prompts especializados en derecho colombiano,
  integrados con Google Search Console, GAL y 10 agentes.

INFO:
  📁 Estructura: 6 grupos + 11 prompts individuales
  🤖 Agentes: 10 agentes GAL (síntesis, jurisprudencia, etc.)
  ⚙️ Ramas: Civil, Laboral, Penal, Administrativa, Comercial, Corporativo
  🔗 Integración: GAL, Loops Automáticos, Hooks, Audit

    `);
}
