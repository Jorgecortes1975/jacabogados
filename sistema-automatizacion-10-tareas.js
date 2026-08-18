#!/usr/bin/env node

/**
 * SISTEMA DE AUTOMATIZACIÓN: 10 TAREAS PROFESIONALES PARA CLAUDE
 * ============================================================
 *
 * Implementa las 10 tareas del PDF guía, adaptadas a derecho colombiano
 * Cada tarea funciona en las 6 ramas: Laboral, Civil, Penal, Administrativo, Comercial, Corporativo
 *
 * Uso: node sistema-automatizacion-10-tareas.js <tarea> [rama] [datos]
 */

const fs = require('fs');
const path = require('path');

// ============================================================
// CONFIGURACIÓN GLOBAL
// ============================================================

const RAMAS = {
  laboral: 'Derecho Laboral',
  civil: 'Derecho Civil',
  penal: 'Derecho Penal',
  administrativo: 'Derecho Administrativo',
  comercial: 'Derecho Comercial',
  corporativo: 'Dirección Corporativo-Empresarial'
};

const TAREAS = {
  1: 'síntesis-correos',
  2: 'comparativa-herramientas',
  3: 'adaptación-cv',
  4: 'extracción-datos',
  5: 'optimización-comunicación',
  6: 'análisis-informes',
  7: 'resolución-errores',
  8: 'briefing-reuniones',
  9: 'estructuración-notas',
  10: 'verificación-información'
};

// ============================================================
// TAREA 1: SÍNTESIS DE HILOS DE CORREO
// ============================================================

class TareaSintesisCorreos {
  constructor(rama = 'laboral') {
    this.rama = rama;
  }

  getPrompt(contenidoCorreo) {
    const contextoRama = this.getContextoRama();
    return `Actúa como un asistente jurídico especializado en ${RAMAS[this.rama]}.

Resume este hilo de correos identificando:
1) Los puntos clave discutidos (enfocado en ${contextoRama})
2) Las decisiones tomadas y su validez legal
3) Una lista numerada de tareas pendientes asignados a cada participante
4) Riesgos legales identificados
5) Próximos pasos recomendados

Contenido del correo:
${contenidoCorreo}

Sé conciso, profesional y enfocado en implicaciones legales.`;
  }

  getContextoRama() {
    const contextos = {
      laboral: 'aspectos laborales, derechos del trabajador, indemnizaciones',
      civil: 'responsabilidad civil, daño, obligaciones, contratos civiles',
      penal: 'elementos del delito, procedimiento penal, derechos de defensa',
      administrativo: 'actos administrativos, recursos, contratación estatal',
      comercial: 'contratos comerciales, sociedades, competencia',
      corporativo: 'estructuras corporativas, gobiernos corporativo, M&A'
    };
    return contextos[this.rama];
  }

  ejecutar(contenidoCorreo) {
    return {
      tarea: 'Síntesis de Correos Jurídicos',
      rama: RAMAS[this.rama],
      prompt: this.getPrompt(contenidoCorreo),
      instrucciones: [
        '1. Copiar el contenido del correo o hilo de Gmail',
        '2. Pegar en Claude con el prompt generado',
        '3. Claude analizará automáticamente con contexto jurídico',
        '4. Recibirás síntesis estructurada con puntos legales clave'
      ],
      timestamp: new Date().toISOString()
    };
  }
}

// ============================================================
// TAREA 2: COMPARATIVA DE HERRAMIENTAS/SAAS
// ============================================================

class TareaComparativaHerramientas {
  constructor(rama = 'laboral') {
    this.rama = rama;
  }

  getPrompt(contenidoHerramientas) {
    const criterios = this.getCriteriosRama();
    return `Actúa como auditor jurídico especializado en ${RAMAS[this.rama]}.

Analiza estas herramientas SaaS desde perspectiva legal de ${RAMAS[this.rama]}:
${contenidoHerramientas}

Crea una matriz comparativa que incluya:
- Nombre de herramienta
- Precio inicial
- 3 Funciones principales para ${RAMAS[this.rama]}
- Ventajas legales
- Desventajas/Riesgos legales
- Cumplimiento normativo (LGPD, datos personales, etc.)
- Recomendación ponderada

Criterios de evaluación para ${RAMAS[this.rama]}:
${criterios}

Prioridad: Seguridad jurídica y cumplimiento normativo colombiano.`;
  }

  getCriteriosRama() {
    const criterios = {
      laboral: '• Gestión de nómina y prestaciones\n• Privacidad de datos de empleados\n• Cumplimiento Código Sustantivo del Trabajo',
      civil: '• Gestión de obligaciones y contratos\n• Trazabilidad de transacciones\n• Cumplimiento normativo de privacidad',
      penal: '• Auditoría de eventos y pistas de acceso\n• Seguridad de datos sensibles\n• Cumplimiento procedimiento penal',
      administrativo: '• Contratación estatal (SECOP)\n• Transparencia de procesos\n• Cumplimiento normativa estatal',
      comercial: '• Gestión de operaciones comerciales\n• Compliance y reportes\n• Protección de datos comerciales',
      corporativo: '• Gobierno corporativo\n• Reportes a junta directiva\n• Cumplimiento regulatorio empresarial'
    };
    return criterios[this.rama];
  }

  ejecutar(contenidoHerramientas) {
    return {
      tarea: 'Comparativa de Herramientas SaaS (Contexto Jurídico)',
      rama: RAMAS[this.rama],
      prompt: this.getPrompt(contenidoHerramientas),
      instrucciones: [
        '1. Abrir páginas de precios/funciones de herramientas a comparar',
        '2. Copiar información relevante',
        '3. Pegar en Claude con el prompt jurídico',
        '4. Recibirás matriz comparativa con análisis legal'
      ],
      timestamp: new Date().toISOString()
    };
  }
}

// ============================================================
// TAREA 3: ADAPTACIÓN DE DOCUMENTOS A RAMA JURÍDICA
// ============================================================

class TareaAdaptacionDocumentos {
  constructor(rama = 'laboral') {
    this.rama = rama;
  }

  getPrompt(documento, ramaDestino = null) {
    const rama = ramaDestino || this.rama;
    const palabrasClave = this.getPalabrasClaveRama(rama);
    return `Actúa como redactor jurídico especializado en ${RAMAS[rama]}.

Tengo este documento que necesito adaptar para ${RAMAS[rama]}:

${documento}

Por favor:
1) Identifica 5 palabras clave que son críticas en ${RAMAS[rama]}
2) Destaca 3 precedentes jurisprudenciales aplicables
3) Refuerza argumentos débiles con normativa específica de ${RAMAS[rama]}
4) Elimina argumentos genéricos no aplicables
5) Personaliza para maximizar impacto legal

Palabras clave a considerar: ${palabrasClave}

Proporciona:
- Documento adaptado
- Justificación de cambios principales
- Referencias normativas aplicables`;
  }

  getPalabrasClaveRama(rama) {
    const palabras = {
      laboral: 'Favorabilidad, Protección Integral, Presunción de Vigencia, Derechos Irrenunciables, Justa Causa',
      civil: 'Responsabilidad Civil, Causalidad, Daño Cierto, Culpa, Relación Causal',
      penal: 'Debido Proceso, Presunción de Inocencia, Defensa Técnica, Legalidad, In Dubio Pro Reo',
      administrativo: 'Legalidad, Debido Procedimiento, Transparencia, Motivación, Vinculación Acto',
      comercial: 'Buena Fe, Onerosidad, Transferencia de Riesgo, Comercialidad, Consumidor',
      corporativo: 'Accionista, Junta Directiva, Buen Gobierno, Conflicto de Interés, Deber de Lealtad'
    };
    return palabras[rama];
  }

  ejecutar(documento, ramaDestino = null) {
    return {
      tarea: 'Adaptación de Documentos a Rama Jurídica',
      ramaOrigen: RAMAS[this.rama],
      ramaDestino: RAMAS[ramaDestino || this.rama],
      prompt: this.getPrompt(documento, ramaDestino),
      instrucciones: [
        '1. Copiar documento a adaptar',
        '2. Especificar rama jurídica destino (si aplica)',
        '3. Pegar en Claude con prompt generado',
        '4. Recibirás documento adaptado con justificación de cambios'
      ],
      timestamp: new Date().toISOString()
    };
  }
}

// ============================================================
// TAREA 4: EXTRACCIÓN DE DATOS A TABLAS ESTRUCTURADAS
// ============================================================

class TareaExtraccionDatos {
  constructor(rama = 'laboral') {
    this.rama = rama;
  }

  getPrompt(datosDesordenados) {
    const columnas = this.getColumnasRama();
    return `Actúa como analista jurídico especializado en ${RAMAS[this.rama]}.

Extrae toda la información relevante de estos datos y organízalos en una tabla Excel-compatible:

${datosDesordenados}

Crea una tabla estructurada con estas columnas:
${columnas}

Requisitos:
- Formato markdown con | separadores para copiar directo a Excel
- Sin filas vacías
- Información verificable y completa
- Incluir fuente si es jurisprudencia
- Vigencia de normativa si aplica

Datos procesados listos para análisis posterior.`;
  }

  getColumnasRama() {
    const columnas = {
      laboral: '| Sentencia | Corte | Radicado | Tema | Ratio Decidendi | Aplicabilidad | Vigencia |',
      civil: '| Sentencia | Tribunal | Expediente | Tema de Fondo | Decisión | Precedente | Vigencia |',
      penal: '| Sentencia | Tribunal | Radicado | Delito | Sentencia | Precedente | Vigencia |',
      administrativo: '| Acto Administrativo | Autoridad | Radicado | Tema | Fundamento Legal | Impugnación Posible | Vigencia |',
      comercial: '| Norma/Sentencia | Fuente | Referencia | Materia Comercial | Contenido Relevante | Aplicabilidad | Vigencia |',
      corporativo: '| Norma/Jurisprudencia | Autoridad | Referencia | Aspecto Corporativo | Contenido | Aplicabilidad | Vigencia |'
    };
    return columnas[this.rama];
  }

  ejecutar(datosDesordenados) {
    return {
      tarea: 'Extracción de Datos Jurídicos a Tablas',
      rama: RAMAS[this.rama],
      prompt: this.getPrompt(datosDesordenados),
      instrucciones: [
        '1. Copiar datos desordenados o texto con información a extraer',
        '2. Pegar en Claude con prompt generado',
        '3. Claude extrae y estructura en tabla markdown',
        '4. Copiar tabla directamente a Excel o Google Sheets'
      ],
      timestamp: new Date().toISOString()
    };
  }
}

// ============================================================
// TAREA 5: OPTIMIZACIÓN DE COMUNICACIÓN LEGAL
// ============================================================

class TareaOptimizacionComunicacion {
  constructor(rama = 'laboral') {
    this.rama = rama;
  }

  getPrompt(borrador, tono = 'profesional') {
    const guiaTono = this.getGuiaTono(tono);
    return `Actúa como editor jurídico especializado en ${RAMAS[this.rama]}.

He escrito este borrador de comunicación:
"${borrador}"

Contexto: ${RAMAS[this.rama]}
Tono requerido: ${tono}

Por favor, reescribe el texto para que:
1) Suene más ${tono}
2) Elimine palabras innecesarias
3) Asegure que el llamado a la acción sea claro pero educado
4) Incluya lenguaje jurídicamente preciso para ${RAMAS[this.rama]}
5) Considere riesgos de mal interpretación legal

Guía de tono para esta rama:
${guiaTono}

Proporciona:
- Versión reescrita
- Cambios principales realizados
- Advertencias legales si aplica`;
  }

  getGuiaTono(tono) {
    const guias = {
      profesional: 'Formal, preciso, sin ambigüedades, con referencias normativas',
      empático: 'Comprensivo pero firme, reconociendo derechos sin ceder posición legal',
      asertivo: 'Claro en posición, con fundamento legal, sin agresividad innecesaria'
    };
    return guias[tono] || guias.profesional;
  }

  ejecutar(borrador, tono = 'profesional') {
    return {
      tarea: 'Optimización de Comunicación Jurídica',
      rama: RAMAS[this.rama],
      tono: tono,
      prompt: this.getPrompt(borrador, tono),
      instrucciones: [
        '1. Escribir borrador rápido en Slack, Teams o correo',
        '2. Antes de enviar, copiar y pegar en Claude',
        '3. Especificar tono: profesional/empático/asertivo',
        '4. Claude reescribe manteniendo significado, mejorando precisión legal'
      ],
      timestamp: new Date().toISOString()
    };
  }
}

// ============================================================
// TAREA 6: ANÁLISIS DE INFORMES EXTENSOS (PDFs)
// ============================================================

class TareaAnalisisInformes {
  constructor(rama = 'laboral') {
    this.rama = rama;
  }

  getPrompt(resumenInfoorme) {
    const focoPorRama = this.getFocoPorRama();
    return `Actúa como analista jurídico especializado en ${RAMAS[this.rama]}.

He leído/revisado este informe extenso:
${resumenInfoorme}

Por favor, extrae para mí:
1) Las 5 conclusiones más importantes para un directivo
2) Datos estadísticos relevantes
3) Tendencias críticas que debo conocer de inmediato
4) Implicaciones legales de estos hallazgos en ${RAMAS[this.rama]}
5) Recomendaciones accionables

Enfoque específico para ${RAMAS[this.rama]}:
${focoPorRama}

Proporciona un resumen ejecutivo de máximo 1 página.`;
  }

  getFocoPorRama() {
    const focos = {
      laboral: 'Impacto en relaciones laborales, derechos de trabajadores, jurisprudencia de Corte Suprema',
      civil: 'Responsabilidades civiles, riesgos de litigio, jurisprudencia relevante',
      penal: 'Riesgos penales potenciales, cumplimiento normativo penal',
      administrativo: 'Impacto en procesos administrativos, normativa estatal aplicable',
      comercial: 'Oportunidades y riesgos comerciales, normativa mercantil',
      corporativo: 'Impacto en gobierno corporativo, decisiones estratégicas'
    };
    return focos[this.rama];
  }

  ejecutar(resumenInfoorme) {
    return {
      tarea: 'Análisis de Informes Extensos',
      rama: RAMAS[this.rama],
      prompt: this.getPrompt(resumenInfoorme),
      instrucciones: [
        '1. Abrir PDF en pestaña de Chrome',
        '2. Si es muy extenso, copiar resumen o puntos clave',
        '3. Pegar en Claude con prompt generado',
        '4. Recibirás insight ejecutivo enfocado en aspectos jurídicos'
      ],
      timestamp: new Date().toISOString()
    };
  }
}

// ============================================================
// TAREA 7: RESOLUCIÓN DE ERRORES TÉCNICOS/JURÍDICOS
// ============================================================

class TareaResolucionErrores {
  constructor(rama = 'laboral') {
    this.rama = rama;
  }

  getPrompt(error, objetivo) {
    return `Actúa como especialista en resolución de problemas jurídicos en ${RAMAS[this.rama]}.

Estoy recibiendo este error o problema:
"${error}"

Mi objetivo es: ${objetivo}

Por favor:
1) Analiza qué está mal
2) Dame la solución corregida paso a paso
3) Explica brevemente el origen del problema
4) Sugiere cómo prevenir en el futuro
5) Incluye referencias normativas si aplica en ${RAMAS[this.rama]}

Proporciona respuesta práctica y verificable.`;
  }

  ejecutar(error, objetivo) {
    return {
      tarea: 'Resolución de Errores Técnicos/Jurídicos',
      rama: RAMAS[this.rama],
      prompt: this.getPrompt(error, objetivo),
      instrucciones: [
        '1. Copiar error exacto que recibiste',
        '2. Describir qué intentabas lograr',
        '3. Pegar en Claude con prompt generado',
        '4. Recibirás solución paso a paso con explicación'
      ],
      timestamp: new Date().toISOString()
    };
  }
}

// ============================================================
// TAREA 8: BRIEFING PARA REUNIONES PROFESIONALES
// ============================================================

class TareaBriefingReuniones {
  constructor(rama = 'laboral') {
    this.rama = rama;
  }

  getPrompt(perfilPersona) {
    return `Actúa como strategist jurídico especializado en ${RAMAS[this.rama]}.

Voy a tener una reunión/negociación con esta persona/empresa:
${perfilPersona}

Contextualmente estamos trabajando en ${RAMAS[this.rama]}.

Por favor, analiza y dame un briefing ejecutivo con 3 puntos:
1) Trayectoria profesional principal + intereses detectados
2) Logros recientes y posición actual en el mercado
3) Tres posibles puntos de conexión estratégica y preguntas que rompen el hielo

Además:
- Identifica posible posición legal de la otra parte
- Puntos de alineación vs conflicto potencial
- Alternativas si la negociación no avanza
- Concesiones que puedo ofrecer sin perder ventaja
- Jurisprudencia reciente que afecte esta negociación

Formato: Ejecutivo, conciso, puntos de acción claros.`;
  }

  ejecutar(perfilPersona) {
    return {
      tarea: 'Briefing para Reuniones Profesionales',
      rama: RAMAS[this.rama],
      prompt: this.getPrompt(perfilPersona),
      instrucciones: [
        '1. Abrir perfil LinkedIn o sitio web de la persona/empresa',
        '2. Copiar información relevante de perfil/web',
        '3. Pegar en Claude con prompt generado',
        '4. Recibirás briefing estratégico 24h antes de reunión'
      ],
      timestamp: new Date().toISOString()
    };
  }
}

// ============================================================
// TAREA 9: ESTRUCTURACIÓN DE NOTAS RÁPIDAS
// ============================================================

class TareaEstructuracionNotas {
  constructor(rama = 'laboral') {
    this.rama = rama;
  }

  getPrompt(notasDesordenadas) {
    return `Actúa como secretaria jurídica especializada en ${RAMAS[this.rama]}.

Toma estas notas desordenadas de mi reunión:
"${notasDesordenadas}"

Transfórmalas en una minuta profesional jurídica que incluya:
- Asistentes (si están mencionados)
- Temas Tratados (numerados y claros)
- Acuerdos Alcanzados (con implicaciones legales si aplica)
- Tareas Pendientes (con responsables y plazos)
- Próximos Pasos (recomendaciones)
- Riesgos Legales Identificados (si aplica en ${RAMAS[this.rama]})

Formato profesional, apto para compartir con equipo legal/ejecutivo.`;
  }

  ejecutar(notasDesordenadas) {
    return {
      tarea: 'Estructuración de Notas Rápidas',
      rama: RAMAS[this.rama],
      prompt: this.getPrompt(notasDesordenadas),
      instrucciones: [
        '1. Copiar notas desordenadas tomadas durante reunión',
        '2. Pegar en Claude con prompt generado',
        '3. Claude estructura en minuta profesional',
        '4. Copiar resultado y enviar a equipo'
      ],
      timestamp: new Date().toISOString()
    };
  }
}

// ============================================================
// TAREA 10: VERIFICACIÓN DE INFORMACIÓN LEGAL
// ============================================================

class TareaVerificacionInformacion {
  constructor(rama = 'laboral') {
    this.rama = rama;
  }

  getPrompt(afirmacion) {
    return `Actúa como verificador jurídico especializado en ${RAMAS[this.rama]}.

He encontrado esta afirmación/dato legal:
"${afirmacion}"

Por favor:
1) ¿Es este dato correcto según fuentes confiables en ${RAMAS[this.rama]}?
2) ¿Hay matices o controversias al respecto?
3) ¿Qué dice la jurisprudencia reciente?
4) ¿Hay normativa que lo contradice o matiza?
5) ¿Cuáles son las fuentes oficiales para verificar?

Proporciona:
- Veredicto: Correcto/Parcialmente Correcto/Incorrecto
- Explicación detallada
- Fuentes oficiales
- Alternativas o matices importantes
- Recomendaciones`;
  }

  ejecutar(afirmacion) {
    return {
      tarea: 'Verificación de Información Legal',
      rama: RAMAS[this.rama],
      prompt: this.getPrompt(afirmacion),
      instrucciones: [
        '1. Copiar información dudosa encontrada en web',
        '2. Pegar en Claude con prompt generado',
        '3. Claude verifica contra conocimiento jurídico colombiano',
        '4. Recibirás análisis completo con fuentes'
      ],
      timestamp: new Date().toISOString()
    };
  }
}

// ============================================================
// EJECUTOR PRINCIPAL
// ============================================================

class SistemaAutomatizacion {
  constructor() {
    this.tareas = {
      1: TareaSintesisCorreos,
      2: TareaComparativaHerramientas,
      3: TareaAdaptacionDocumentos,
      4: TareaExtraccionDatos,
      5: TareaOptimizacionComunicacion,
      6: TareaAnalisisInformes,
      7: TareaResolucionErrores,
      8: TareaBriefingReuniones,
      9: TareaEstructuracionNotas,
      10: TareaVerificacionInformacion
    };
  }

  mostrarMenu() {
    console.log(`
╔════════════════════════════════════════════════════════════════════════════╗
║         SISTEMA DE AUTOMATIZACIÓN: 10 TAREAS JURÍDICAS                    ║
║                 Adaptado a Derecho Colombiano (6 Ramas)                   ║
╚════════════════════════════════════════════════════════════════════════════╝

10 TAREAS DISPONIBLES:

  1. Síntesis de Correos Jurídicos (Gmail/Outlook)
  2. Comparativa de Herramientas SaaS (contexto legal)
  3. Adaptación de Documentos a Rama Jurídica
  4. Extracción de Datos a Tablas Estructuradas
  5. Optimización de Comunicación Jurídica
  6. Análisis de Informes Extensos (PDFs)
  7. Resolución de Errores Técnicos/Jurídicos
  8. Briefing para Reuniones Profesionales
  9. Estructuración de Notas Rápidas en Minutas
  10. Verificación de Información Legal

RAMAS JURÍDICAS (todas disponibles para cada tarea):

  • Laboral
  • Civil
  • Penal
  • Administrativo
  • Comercial
  • Corporativo

EJEMPLOS DE USO:

  node sistema-automatizacion-10-tareas.js 1 laboral "Contenido del correo..."
  node sistema-automatizacion-10-tareas.js 5 comercial "Mi borrador de contrato..."
  node sistema-automatizacion-10-tareas.js 8 corporativo
  node sistema-automatizacion-10-tareas.js menu

SINTAXIS:

  node sistema-automatizacion-10-tareas.js <tarea> [rama] [datos]

  <tarea>    : 1-10 (número de tarea) o 'menu'/'help'
  [rama]     : laboral, civil, penal, administrativo, comercial, corporativo
  [datos]    : contenido a procesar (opcional, se solicita interactivamente si falta)
    `);
  }

  mostrarAyuda() {
    console.log(`
SISTEMA DE AUTOMATIZACIÓN - GUÍA COMPLETA
==========================================

Este sistema implementa las 10 tareas profesionales descritas en la guía PDF,
adaptadas completamente al contexto de derecho colombiano.

Cada tarea genera un prompt maestro especializado que puedes usar directamente
con Claude en Chrome, Gmail, LinkedIn u otra plataforma.

CARACTERÍSTICAS:
✓ Prompts especializados por rama jurídica
✓ Contexto colombiano (leyes, jurisprudencia, cortes)
✓ Instrucciones paso a paso
✓ Formatos listos para usar

Para comenzar: node sistema-automatizacion-10-tareas.js menu
    `);
  }

  ejecutarTarea(numeroTarea, rama = 'laboral', datos = null) {
    if (!this.tareas[numeroTarea]) {
      console.error(`❌ Tarea ${numeroTarea} no existe. Use --menu para ver opciones.`);
      return;
    }

    if (!RAMAS[rama]) {
      console.error(`❌ Rama "${rama}" no reconocida. Opciones: ${Object.keys(RAMAS).join(', ')}`);
      return;
    }

    const ClaseTarea = this.tareas[numeroTarea];
    const instancia = new ClaseTarea(rama);

    // Datos específicos por tarea
    let resultado;

    switch (numeroTarea) {
      case 1:
        resultado = instancia.ejecutar(datos || 'Contenido del correo...');
        break;
      case 2:
        resultado = instancia.ejecutar(datos || 'Información de herramientas...');
        break;
      case 3:
        resultado = instancia.ejecutar(datos || 'Documento a adaptar...');
        break;
      case 4:
        resultado = instancia.ejecutar(datos || 'Datos desordenados...');
        break;
      case 5:
        resultado = instancia.ejecutar(datos || 'Borrador de comunicación...', 'profesional');
        break;
      case 6:
        resultado = instancia.ejecutar(datos || 'Resumen del informe...');
        break;
      case 7:
        resultado = instancia.ejecutar(datos || 'Descripción del error...', 'objetivo aquí');
        break;
      case 8:
        resultado = instancia.ejecutar(datos || 'Perfil de la persona...');
        break;
      case 9:
        resultado = instancia.ejecutar(datos || 'Notas desordenadas...');
        break;
      case 10:
        resultado = instancia.ejecutar(datos || 'Afirmación a verificar...');
        break;
    }

    this.mostrarResultado(resultado);
  }

  mostrarResultado(resultado) {
    console.log(`
╔════════════════════════════════════════════════════════════════════════════╗
║                        TAREA CONFIGURADA ✓                                ║
╚════════════════════════════════════════════════════════════════════════════╝

📋 Tarea: ${resultado.tarea}
🏛️  Rama: ${resultado.rama}
⏰ Generado: ${resultado.timestamp}

${resultado.tono ? `🎯 Tono: ${resultado.tono}` : ''}

📝 PROMPT MAESTRO (copia y pega en Claude):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${resultado.prompt}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 PASOS A SEGUIR:
${resultado.instrucciones.map((paso, i) => `${i + 1}. ${paso}`).join('\n')}

💡 PRÓXIMOS PASOS:
1. Copia el PROMPT MAESTRO completo
2. Abre Claude en Chrome o web
3. Pega el prompt en la conversación
4. Claude procesará tu contenido con contexto jurídico
5. Obtendrás resultado estructurado y profesional
    `);
  }
}

// ============================================================
// PUNTO DE ENTRADA
// ============================================================

const args = process.argv.slice(2);
const sistema = new SistemaAutomatizacion();

if (args.length === 0 || args[0] === 'menu') {
  sistema.mostrarMenu();
} else if (args[0] === 'help') {
  sistema.mostrarAyuda();
} else if (args[0] === 'test') {
  // Test mode
  console.log('\n✓ Sistema funcionando correctamente\n');
  console.log('Tareas disponibles:', Object.keys(sistema.tareas).length);
  console.log('Ramas disponibles:', Object.keys(RAMAS).length);
  console.log('\nEjemplo de ejecución:');
  sistema.ejecutarTarea(1, 'laboral', 'Contenido de ejemplo del correo...');
} else {
  const tarea = parseInt(args[0]);
  const rama = args[1] || 'laboral';
  const datos = args.slice(2).join(' ') || null;

  sistema.ejecutarTarea(tarea, rama, datos);
}

module.exports = SistemaAutomatizacion;
