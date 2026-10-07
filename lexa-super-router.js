#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const CONFIG_FILE = path.join(process.cwd(), 'mcp-config.json');

/**
 * LEXA Super Router
 *
 * ESTADO REAL: este router solo clasifica un mensaje por coincidencia de palabras clave y
 * construye un plan de flujo en texto. No despacha a agentes, no consulta fuentes, no valida,
 * no firma ni envía nada. Los agentes, el dashboard y los canales de entrada son definiciones de
 * diseño sin implementación. No persiste nada en disco.
 */
class LEXASuperRouter {
  constructor() {
    this.config = this.loadConfig();
    this.inicializarEcosistema();
  }

  loadConfig() {
    if (fs.existsSync(CONFIG_FILE)) {
      return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    }
    return { version: '1.0', transports: {}, servers: {}, agents: {}, ecosystem: {} };
  }

  inicializarEcosistema() {
    if (!this.config.ecosystem) {
      this.config.ecosystem = {};
    }

    // Definir capas del ecosistema LEXA
    this.config.ecosystem = {
      version: '2.0-INTEGRADO',
      nombre: 'LEXA-JAC Ecosistema Integrado',
      descripcion: 'Diseño de 3 capas para el despacho. Ninguna capa está implementada',
      estado: 'diseno-no-implementado',
      capas: {
        dashboard: {
          nombre: 'Dashboard de Monitoreo',
          puerto: '3000',
          funcion: 'Monitoreo de agentes (diseño, no implementado)',
          estado: 'no-implementado'
        },
        router: {
          nombre: 'Super Router LEXA-JAC',
          funcion: 'Clasifica un mensaje por palabras clave. No despacha',
          estado: 'solo-clasificacion',
          entradas: ['linea-de-comandos'],
          entradas_objetivo: ['telegram', 'email', 'whatsapp', 'api-rest']
        },
        agentes_especializados: {
          juridico: {
            nombre: 'Agente Jurídico Especializado',
            ruta: '~/agents/juridico/',
            funciones: ['escritos-procesales', 'tutelas', 'laboralista'],
            sub_agentes: ['investigador', 'redactor', 'jac-validator'],
            fuentes_objetivo: 'las 9 fuentes oficiales configuradas',
            validacion_objetivo: true,
            estado: 'no-implementado'
          },
          mercantil: {
            nombre: 'Agente Mercantil',
            ruta: '~/agents/mercantil/',
            funciones: ['contratos', 'SAS', 'litigio-comercial'],
            sub_agentes: ['contratos', 'litigio-mercantil', 'investigador-mercantil'],
            estado: 'no-implementado'
          },
          email: {
            nombre: 'Agente de Comunicaciones',
            ruta: '~/agents/email/',
            funciones: ['correos', 'comunicaciones', 'reportes'],
            sub_agentes: ['classifier', 'drafter', 'summarizer'],
            estado: 'no-implementado'
          },
          tributario: {
            nombre: 'Agente Tributario',
            ruta: '~/agents/tributario/',
            funciones: ['impuestos', 'DIAN', 'compliance-tributario'],
            sub_agentes: ['analista-impuestos', 'redactor-tributario', 'validator-dian'],
            fuentes_objetivo: ['DIAN', 'suin-normativo', 'legal-data-hunter'],
            estado: 'no-implementado'
          },
          ambiental: {
            nombre: 'Agente Ambiental',
            ruta: '~/agents/ambiental/',
            funciones: ['licencias-ambientales', 'normativa-ambiental', 'litigio-ambiental'],
            sub_agentes: ['investigador-ambiental', 'redactor-ambiental', 'validator'],
            estado: 'no-implementado'
          },
          laboral: {
            nombre: 'Agente Laboral Avanzado',
            ruta: '~/agents/laboral/',
            funciones: ['conflictos-laborales', 'nómina', 'seguridad-social'],
            sub_agentes: ['analista-laboral', 'redactor-laboral', 'validator'],
            estado: 'no-implementado'
          }
        }
      },
      dispatch_table: {
        'escritos procesales|tutelas|laboralista': 'juridico',
        'contratos|SAS|comercial': 'mercantil',
        'correos|comunicaciones|reportes': 'email',
        'impuestos|DIAN|tributario': 'tributario',
        'ambiental|licencias|normativa-ambiental': 'ambiental',
        'laboral|conflictos-laborales|nómina': 'laboral',
        '[REQUIERE VALIDACIÓN JAC]': 'juridico-validado'
      },
      validacion: {
        implementada: false,
        revision_humana_obligatoria: true,
        contra_fuentes_objetivo: ['SUIN', 'Juriscol', 'Legal Data Hunter'],
        firma_digital: false
      }
    };
    // Definición en memoria: no se persiste en mcp-config.json.
  }

  clasificarMensaje(contenido) {
    const dispatch = this.config.ecosystem.dispatch_table;

    for (const [criterio, agente] of Object.entries(dispatch)) {
      const palabras = criterio.split('|');
      for (const palabra of palabras) {
        if (contenido.toLowerCase().includes(palabra.toLowerCase())) {
          return {
            agente,
            tipo: criterio,
            metodo: 'coincidencia-de-palabra-clave',
            requiereRevisionHumana: true,
            timestamp: new Date().toISOString()
          };
        }
      }
    }

    // Default a jurídico si no hay match
    return {
      agente: 'juridico',
      tipo: 'consulta-general',
      metodo: 'sin-coincidencia-asignacion-por-defecto',
      requiereRevisionHumana: true,
      timestamp: new Date().toISOString()
    };
  }

  procesarConsulta(mensaje) {
    const clasificacion = this.clasificarMensaje(mensaje);

    return {
      clasificacion,
      flujo: this.construirFlujo(clasificacion),
      timestamp: new Date().toISOString(),
      status: 'clasificado-sin-ejecucion'
    };
  }

  construirFlujo(clasificacion) {
    const agente = this.config.ecosystem.capas.agentes_especializados[clasificacion.agente];

    if (!agente) {
      return { error: 'Agente no encontrado' };
    }

    return {
      aviso: 'PLAN TEORICO. No se ejecuto ningun paso: no hay agentes, fuentes ni validacion implementados',
      paso1_entrada: 'Router clasifica el mensaje por palabra clave (unico paso real)',
      paso2_despacho_objetivo: `Agente destino previsto: ${agente.nombre} (no implementado)`,
      paso3_sub_agentes_objetivo: `Sub-agentes previstos: ${agente.sub_agentes.join(', ')}`,
      paso4_validacion_objetivo: agente.validacion_objetivo ? 'Validacion JAC prevista (no implementada)' : 'Sin validacion adicional prevista',
      paso5_salida_objetivo: 'Revision del abogado responsable antes de cualquier salida',
      fuentes_objetivo: agente.fuentes_objetivo || 'fuentes estandar'
    };
  }

  mostrarArquitectura() {
    console.log(`
ESTADO REAL: este diagrama es un DISEÑO OBJETIVO. Hoy solo existe la clasificación por palabras clave.
No hay agentes, dashboard, canales, validación ni firma implementados.

╔════════════════════════════════════════════════════════════════════════════╗
║                                                                            ║
║          🌟 LEXA-JAC ECOSISTEMA INTEGRADO V2.0 🌟                         ║
║                                                                            ║
║  Super Router Orquestador - Entrada Única para Servicios Legales          ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝

ARQUITECTURA DE 3 CAPAS:

┌─────────────────────────────────────────────────────────────────────────┐
│ 📊 DASHBOARD LEXA                                                       │
│ Monitoreo en tiempo real de todos los agentes · Métricas · Auditoría    │
└─────────────────────────────────────────────────────────────────────────┘
                                  ↓
┌─────────────────────────────────────────────────────────────────────────┐
│ 🔀 SUPER ROUTER CENTRAL                                                 │
│ Entrada única: Telegram · Email · WhatsApp · API REST                  │
│ Clasifica y despacha automáticamente a agente especializado             │
└─────────────────────────────────────────────────────────────────────────┘
                                  ↓ ↓ ↓ ↓ ↓ ↓
┌──────────────────┬──────────────────┬──────────────────┬────────────────────┬──────────────────┬──────────────────┐
│ 📜 JURÍDICO      │ 💼 MERCANTIL     │ ✉️ COMUNICACIONES│ 🏛️ TRIBUTARIO     │ 🌱 AMBIENTAL     │ 👥 LABORAL       │
├──────────────────┼──────────────────┼──────────────────┼────────────────────┼──────────────────┼──────────────────┤
│ • Escritos       │ • Contratos      │ • Correos        │ • Impuestos        │ • Licencias      │ • Conflictos     │
│ • Tutelas        │ • SAS            │ • Reportes       │ • DIAN             │ • Normativa      │ • Nómina         │
│ • Laboral        │ • Comercial      │ • Dossiers       │ • Compliance       │ • Litigio        │ • Seguridad      │
│                  │                  │                  │                    │                  │                  │
│ Sub-agentes:     │ Sub-agentes:     │ Sub-agentes:     │ Sub-agentes:       │ Sub-agentes:     │ Sub-agentes:     │
│ • Investigador   │ • Contratos      │ • Classifier     │ • Analista         │ • Investigador   │ • Analista       │
│ • Redactor       │ • Litigio        │ • Drafter        │ • Redactor         │ • Redactor       │ • Redactor       │
│ • Validator JAC  │ • Investigador   │ • Summarizer     │ • Validator DIAN   │ • Validator      │ • Validator      │
│                  │                  │                  │                    │                  │                  │
│ Fuentes objetivo │ Fuentes objetivo │ (sin definir)    │ Fuentes objetivo   │ Fuentes objetivo │ Fuentes objetivo │
│ (sin conexión)   │ (sin conexión)   │                  │ DIAN · SUIN · LDH  │ (sin conexión)   │ (sin conexión)   │
└──────────────────┴──────────────────┴──────────────────┴────────────────────┴──────────────────┴──────────────────┘

FLUJO DE MENSAJES:

[Usuario / Entrada Externa]
         ↓
[Super Router - Clasifica]
         ↓
[Agente Especializado]
         ↓
[Sub-agentes especializados]
         ↓
[Validación + Verificación de Fuentes (objetivo)]
         ↓
[Revisión del abogado responsable]
         ↓
[Salida al usuario, solo tras revisión humana]

TABLA DE DESPACHO (Dispatch Table):

    Consulta contiene...              → Enviar a...
    ─────────────────────────────────────────────────
    escritos, tutelas, laboral        → JURÍDICO (9 fuentes)
    contratos, SAS, comercial         → MERCANTIL (4 fuentes)
    correos, reportes, comunicaciones → EMAIL/COMUN. (generador)
    impuestos, DIAN, tributario       → TRIBUTARIO (DIAN + SUIN)
    ambiental, licencias, normativa   → AMBIENTAL (3 fuentes)
    laboral, nómina, conflictos       → LABORAL (5 fuentes)
    [REQUIERE VALIDACIÓN JAC]         → JURÍDICO + JAC-VALIDATOR

ESTADO DE CAPACIDADES:

Implementada:
✓ Clasificación de mensajes por coincidencia de palabras clave

Objetivos de diseño, NO implementados:
· Entrada multi-canal
· Despacho a agentes y sub-agentes especializados
· Validación de datos contra múltiples fuentes
· Auditoría y monitoreo
· Escalabilidad horizontal y documentación automática

La firma, radicación y notificación son siempre actos del abogado responsable.

═════════════════════════════════════════════════════════════════════════════

MÉTRICAS DEL ECOSISTEMA:

Agentes implementados:    0 de 6 definidos
Precisión de la clasificación: no medida
Disponibilidad:           sin compromiso
Cifras de cobertura (38M+ documentos, 230+ jurisdicciones): del proveedor Legal Data Hunter, no verificadas aquí

═════════════════════════════════════════════════════════════════════════════
`);
  }

  mostrarComandos() {
    console.log(`
🚀 COMANDOS DISPONIBLES - LEXA SUPER ROUTER

Aviso: el router solo clasifica por palabras clave. No despacha, no consulta fuentes ni valida.

VER LA ARQUITECTURA OBJETIVO (diseño, no implementado):
  $ node lexa-super-router.js arquitectura

CLASIFICAR CONSULTA (no la procesa):
  $ node lexa-super-router.js procesar "Tu consulta aquí"

EJEMPLO - Consulta Jurídica:
  $ node lexa-super-router.js procesar "Necesito escribir una demanda de despido"
  → Clasificado como: jurídico (no se ejecuta ningún agente)

EJEMPLO - Consulta Tributaria:
  $ node lexa-super-router.js procesar "¿Cuál es mi obligación fiscal?"
  → Clasificado como: tributario (no se ejecuta ningún agente)

EJEMPLO - Consulta Mercantil:
  $ node lexa-super-router.js procesar "Necesito crear una SAS"
  → Clasificado como: mercantil (no se ejecuta ningún agente)

EJEMPLO - Consulta Ambiental:
  $ node lexa-super-router.js procesar "¿Qué permisos ambientales necesito?"
  → Clasificado como: ambiental (no se ejecuta ningún agente)

EJEMPLO - Consulta Laboral:
  $ node lexa-super-router.js procesar "Tengo un conflicto laboral"
  → Clasificado como: laboral (no se ejecuta ningún agente)

LISTAR AGENTES:
  $ node lexa-super-router.js agentes

LISTAR FUENTES:
  $ node lexa-super-router.js fuentes

ESTADO DEL SISTEMA:
  $ node lexa-super-router.js status

HELP:
  $ node lexa-super-router.js help

═════════════════════════════════════════════════════════════════════════════
`);
  }

  listarAgentes() {
    console.log('\n🤖 AGENTES DEFINIDOS EN EL DISEÑO LEXA (ninguno implementado)\n');

    const agentes = this.config.ecosystem.capas.agentes_especializados;

    Object.entries(agentes).forEach(([clave, agente]) => {
      console.log(`· ${agente.nombre}`);
      console.log(`  Tipo: ${clave}`);
      console.log(`  Funciones: ${agente.funciones.join(', ')}`);
      console.log(`  Sub-agentes: ${agente.sub_agentes.join(', ')}`);
      if (agente.fuentes_objetivo) {
        console.log(`  Fuentes objetivo: ${Array.isArray(agente.fuentes_objetivo) ? agente.fuentes_objetivo.join(', ') : agente.fuentes_objetivo}`);
      }
      console.log(`  Estado: ${agente.estado}`);
      console.log();
    });
  }

  mostrarStatus() {
    const capas = this.config.ecosystem.capas;

    console.log(`
╔════════════════════════════════════════════════════════════════════════════╗
║                     ESTADO DEL ECOSISTEMA LEXA-JAC                        ║
╚════════════════════════════════════════════════════════════════════════════╝

DASHBOARD:       ${capas.dashboard.estado.toUpperCase()}
ROUTER:          ${capas.router.estado.toUpperCase()}
AGENTES:         ${Object.values(capas.agentes_especializados).filter(a => a.estado === 'implementado').length}/${Object.keys(capas.agentes_especializados).length} IMPLEMENTADOS

DETALLES POR CAPA:

Dashboard:
  Estado: ${capas.dashboard.estado}
  Puerto: ${capas.dashboard.puerto}
  Función: ${capas.dashboard.funcion}
  (No existe un dashboard en el puerto indicado)

Router:
  Estado: ${capas.router.estado}
  Entradas implementadas: ${capas.router.entradas.join(', ')}
  Entradas objetivo (no implementadas): ${capas.router.entradas_objetivo.join(', ')}
  Función: ${capas.router.funcion}

Agentes Especializados:
`);

    Object.entries(capas.agentes_especializados).forEach(([clave, agente]) => {
      console.log(`  • ${agente.nombre} [${agente.estado.toUpperCase()}]`);
    });

    console.log(`

RESUMEN:
  Agentes definidos: ${Object.keys(capas.agentes_especializados).length}, implementados: 0
  Canales de entrada implementados: ${capas.router.entradas.length}
  Validación y fuentes: no implementadas
  Precisión y disponibilidad: no medidas

════════════════════════════════════════════════════════════════════════════════
`);
  }
}

function parseArgs() {
  const args = process.argv.slice(2);
  const result = { command: args[0] };

  // Si hay argumentos adicionales, el segundo es el mensaje
  if (args.length > 1) {
    // Unir todos los argumentos desde el segundo
    result.mensaje = args.slice(1).join(' ');
  }

  return result;
}

async function main() {
  try {
    const args = parseArgs();
    const router = new LEXASuperRouter();

    switch (args.command) {
      case 'arquitectura':
        router.mostrarArquitectura();
        break;

      case 'procesar':
        if (!args.mensaje) {
          console.error('❌ Uso: node lexa-super-router.js procesar "mensaje"');
          process.exit(1);
        }
        const resultado = router.procesarConsulta(args.mensaje);
        console.log('\n📨 CONSULTA CLASIFICADA (NO PROCESADA)');
        console.log('Solo se clasificó por palabras clave. No se ejecutó ningún agente, búsqueda ni validación.');
        console.log('═'.repeat(80));
        console.log(`Mensaje: "${args.mensaje}"`);
        console.log(`\nClasificación:`);
        console.log(`  Agente: ${resultado.clasificacion.agente}`);
        console.log(`  Tipo: ${resultado.clasificacion.tipo}`);
        console.log(`  Método: ${resultado.clasificacion.metodo} (sin medida de confianza)`);
        console.log(`  Requiere revisión humana: sí`);
        console.log(`\nFlujo de Procesamiento:`);
        Object.entries(resultado.flujo).forEach(([paso, desc]) => {
          console.log(`  ${paso}: ${desc}`);
        });
        break;

      case 'agentes':
        router.listarAgentes();
        break;

      case 'status':
        router.mostrarStatus();
        break;

      case 'help':
      case '--help':
      case '-h':
        router.mostrarComandos();
        break;

      default:
        router.mostrarComandos();
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { LEXASuperRouter };
