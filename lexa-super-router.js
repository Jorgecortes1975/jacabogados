#!/usr/bin/env node

/**
 * LEXA Super Router
 *
 * ESTADO REAL: este router solo clasifica un mensaje por coincidencia de palabras clave y
 * construye un plan de flujo en texto. No despacha a agentes, no consulta fuentes, no valida,
 * no firma ni envía nada. Los agentes, el dashboard y los canales de entrada son definiciones de
 * diseño sin implementación. No lee ni escribe archivos.
 */
class LEXASuperRouter {
  constructor() {
    this.config = { ecosystem: {} };
    this.inicializarEcosistema();
  }

  inicializarEcosistema() {
    // Definir capas del ecosistema LEXA
    this.config.ecosystem = {
      version: '2.0-DISENO',
      nombre: 'LEXA-JAC Ecosistema (diseño)',
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
        'laboral|conflictos-laborales|nómina': 'laboral'
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

  // Normaliza a palabras completas: minúsculas, sin acentos, sin puntuación y con plural simplificado.
  // La coincidencia es por palabra completa (no por subcadena) y la primera entrada de la tabla gana.
  tokenizar(texto) {
    const singular = (t) => {
      if (t.length > 4 && t.endsWith('es')) return t.slice(0, -2);
      if (t.length > 3 && t.endsWith('s')) return t.slice(0, -1);
      return t;
    };
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .split(/[^a-z0-9]+/)
      .filter(Boolean)
      .map(singular);
  }

  contieneSecuencia(tokensTexto, tokensClave) {
    if (tokensClave.length === 0) return false;
    for (let i = 0; i + tokensClave.length <= tokensTexto.length; i++) {
      if (tokensClave.every((t, j) => tokensTexto[i + j] === t)) return true;
    }
    return false;
  }

  clasificarMensaje(contenido) {
    const dispatch = this.config.ecosystem.dispatch_table;
    const tokensTexto = this.tokenizar(contenido);

    for (const [criterio, agente] of Object.entries(dispatch)) {
      const palabras = criterio.split('|');
      for (const palabra of palabras) {
        if (this.contieneSecuencia(tokensTexto, this.tokenizar(palabra))) {
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
      return {
        aviso: 'PLAN TEORICO. No se ejecuto ningun paso: no hay agentes, fuentes ni validacion implementados',
        error: 'Agente no encontrado en la definicion'
      };
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
    const dispatch = this.config.ecosystem.dispatch_table;
    const tablaClasificacion = Object.entries(dispatch)
      .map(([criterio, agente]) => `    ${criterio.split('|').join(', ')}  →  ${agente}`)
      .join('\n');
    const agentesDefinidos = Object.values(this.config.ecosystem.capas.agentes_especializados);
    const nDefinidos = agentesDefinidos.length;
    const nImplementados = agentesDefinidos.filter(a => a.estado === 'implementado').length;
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
│ Monitoreo de agentes · Métricas · Auditoría (objetivo, no implementado) │
└─────────────────────────────────────────────────────────────────────────┘
                                  ↓
┌─────────────────────────────────────────────────────────────────────────┐
│ 🔀 SUPER ROUTER CENTRAL                                                 │
│ Entrada única: Telegram · Email · WhatsApp · API REST                  │
│ Hoy solo clasifica por palabras clave; el despacho es objetivo          │
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

TABLA DE CLASIFICACIÓN (palabras clave; gana la primera coincidencia; sin coincidencia se asigna jurídico por defecto):

${tablaClasificacion}

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

Agentes implementados:    ${nImplementados} de ${nDefinidos} definidos
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

CLASIFICAR CONSULTA (no la procesa; 'procesar' es un alias de 'clasificar'):
  $ node lexa-super-router.js procesar "Tu consulta aquí"

EJEMPLO - Coincidencia con "escritos procesales":
  $ node lexa-super-router.js clasificar "Necesito apoyo con escritos procesales"
  → Clasificado como: jurídico, por coincidencia de palabra clave (no se ejecuta ningún agente)

EJEMPLO - Consulta Tributaria:
  $ node lexa-super-router.js clasificar "Necesito asesoría sobre impuestos"
  → Clasificado como: tributario, por coincidencia de palabra clave (no se ejecuta ningún agente)

EJEMPLO - Consulta Mercantil:
  $ node lexa-super-router.js clasificar "Necesito crear una SAS"
  → Clasificado como: mercantil, por coincidencia de palabra clave (no se ejecuta ningún agente)

EJEMPLO - Consulta Ambiental:
  $ node lexa-super-router.js clasificar "Necesito una licencia ambiental"
  → Clasificado como: ambiental, por coincidencia de palabra clave (no se ejecuta ningún agente)

EJEMPLO - Consulta Laboral:
  $ node lexa-super-router.js clasificar "Tengo un conflicto laboral"
  → Clasificado como: laboral, por coincidencia de palabra clave (no se ejecuta ningún agente)

EJEMPLO - Sin coincidencia:
  $ node lexa-super-router.js clasificar "Necesito una demanda de despido"
  → Asignado a jurídico POR DEFECTO, no por coincidencia. El resultado "jurídico" puede ser solo el valor por defecto.

LISTAR AGENTES:
  $ node lexa-super-router.js agentes

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
  (El router no inicia ningún dashboard)

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
  Agentes definidos: ${Object.keys(capas.agentes_especializados).length}, implementados: ${Object.values(capas.agentes_especializados).filter(a => a.estado === 'implementado').length}
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

      case 'clasificar':
      case 'procesar':
        if (!args.mensaje) {
          console.error('❌ Uso: node lexa-super-router.js clasificar "mensaje"');
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
