/**
 * Procesador de Cesiones
 * Detecta automáticamente y procesa TODAS las cesiones en correos legales
 */

class ProcesadorCesiones {
  constructor(config) {
    this.config = config;
    this.palabrasClavesCesion = [
      'cesión',
      'cedente',
      'cesionario',
      'cede',
      'cedido',
      'cesión de derechos',
      'cesión de crédito',
      'cesión de acciones',
      'cesión de participaciones',
      'transfer',
      'transferencia de derechos',
      'endoso',
      'endosante',
      'endosatario',
      'traspaso de derechos',
      'traspaso de obligaciones',
      'sucesión de derechos',
      'subrogación'
    ];
  }

  /**
   * Detecta si un correo contiene una cesión
   */
  detectarCesion(asunto, contenido) {
    const texto = (asunto + ' ' + contenido).toLowerCase();
    const palabrasEncontradas = this.palabrasClavesCesion.filter(p => texto.includes(p));

    return {
      esCesion: palabrasEncontradas.length > 0,
      palabrasClave: palabrasEncontradas,
      confianza: (palabrasEncontradas.length / this.palabrasClavesCesion.length) * 100
    };
  }

  /**
   * Extrae información relevante de la cesión
   */
  extraerInformacionCesion(contenido) {
    const info = {
      cedente: this.extraerCedente(contenido),
      cesionario: this.extraerCesionario(contenido),
      tipoDerechos: this.extraerTipoDerechos(contenido),
      monto: this.extraerMonto(contenido),
      fecha: this.extraerFecha(contenido),
      referenciaNormativa: this.extraerNormativa(contenido),
      riesgosDetectados: this.detectarRiesgos(contenido)
    };

    return info;
  }

  /**
   * Extrae nombre del cedente
   */
  extraerCedente(contenido) {
    // Busca patrones comunes: "cedente", "el cedente", "quien cede"
    const regex = /(?:el\s+cedente|cedente\s+es|quien\s+cede)[\s:,]*([^,.;]*?)(?:[,.;]|y\s+el)/i;
    const match = contenido.match(regex);
    return match ? match[1].trim() : 'No identificado';
  }

  /**
   * Extrae nombre del cesionario
   */
  extraerCesionario(contenido) {
    // Busca patrones comunes: "cesionario", "a favor de", "beneficiario"
    const regex = /(?:cesionario|a\s+favor\s+de|en\s+beneficio\s+de)[\s:,]*([^,.;]*?)(?:[,.;]|y\s+el)/i;
    const match = contenido.match(regex);
    return match ? match[1].trim() : 'No identificado';
  }

  /**
   * Extrae tipo de derechos cedidos
   */
  extraerTipoDerechos(contenido) {
    const tipos = [];
    if (contenido.toLowerCase().includes('crédito')) tipos.push('Crédito');
    if (contenido.toLowerCase().includes('derecho')) tipos.push('Derechos');
    if (contenido.toLowerCase().includes('acción')) tipos.push('Acciones');
    if (contenido.toLowerCase().includes('participación')) tipos.push('Participaciones');
    if (contenido.toLowerCase().includes('propiedad')) tipos.push('Propiedad');
    if (contenido.toLowerCase().includes('usufructo')) tipos.push('Usufructo');
    if (contenido.toLowerCase().includes('marca')) tipos.push('Propiedad Intelectual');

    return tipos.length > 0 ? tipos : ['Tipo no especificado'];
  }

  /**
   * Extrae monto monetario
   */
  extraerMonto(contenido) {
    // Busca patrones de dinero: $1.000.000, USD 50000, etc.
    const regex = /(?:\$|USD|COP|EUR|AUD)[\s]*([0-9.,]+)/g;
    const matches = contenido.match(regex);
    return matches ? matches : [];
  }

  /**
   * Extrae fecha de la cesión
   */
  extraerFecha(contenido) {
    // Busca patrones de fecha
    const regex = /(?:fecha|del|en)[\s:]*(\d{1,2}[\s/-]\d{1,2}[\s/-]\d{4})/i;
    const match = contenido.match(regex);
    return match ? match[1] : 'No especificada';
  }

  /**
   * Extrae referencias normativas
   */
  extraerNormativa(contenido) {
    const normativas = [];

    // Busca artículos del Código Civil
    if (contenido.match(/artículo\s*1972|1972|cesión/i)) {
      normativas.push('Código Civil Colombiano - Art. 1972');
    }

    // Busca referencias a ley comercial
    if (contenido.match(/código\s+comercial|ley\s+comercial/i)) {
      normativas.push('Código de Comercio');
    }

    // Busca referencias generales
    const articulosRegex = /artículo\s+(\d+)/gi;
    let match;
    while ((match = articulosRegex.exec(contenido)) !== null) {
      normativas.push(`Artículo ${match[1]}`);
    }

    return [...new Set(normativas)];
  }

  /**
   * Detecta riesgos legales en la cesión
   */
  detectarRiesgos(contenido) {
    const riesgos = [];
    const texto = contenido.toLowerCase();

    // Riesgo 1: Sin mención de contraprestación
    if (!texto.includes('pago') && !texto.includes('contraprestación') && !texto.includes('valor')) {
      riesgos.push({
        nivel: 'ALTO',
        riesgo: 'Posible cesión sin contraprestación - Verificar validez legal',
        accion: 'Solicitar documento de contraprestación'
      });
    }

    // Riesgo 2: Sin identificación clara de partes
    if (!texto.includes('cédula') && !texto.includes('nit') && !texto.includes('ruc')) {
      riesgos.push({
        nivel: 'MEDIO',
        riesgo: 'Identificación de partes incompleta',
        accion: 'Verificar datos de cedente y cesionario'
      });
    }

    // Riesgo 3: Sin consentimiento expreso
    if (!texto.includes('autoriza') && !texto.includes('consiente') && !texto.includes('acepta')) {
      riesgos.push({
        nivel: 'ALTO',
        riesgo: 'No hay evidencia de consentimiento expreso',
        accion: 'Obtener consentimiento escrito y firmado'
      });
    }

    // Riesgo 4: Sin fecha clara
    if (!texto.match(/\d{1,2}[\s/-]\d{1,2}[\s/-]\d{4}/)) {
      riesgos.push({
        nivel: 'MEDIO',
        riesgo: 'Fecha de cesión no clara',
        accion: 'Establecer fecha exacta de efectividad'
      });
    }

    // Riesgo 5: Posible fraude
    if (texto.includes('urgente') && texto.includes('confidencial') && texto.includes('sin consulta')) {
      riesgos.push({
        nivel: 'CRÍTICO',
        riesgo: 'Indicadores de posible fraude o suplantación',
        accion: 'Verificar identidad de remitente y autenticidad de documento'
      });
    }

    return riesgos;
  }

  /**
   * Asigna agentes especializados para la cesión
   */
  obtenerAgentes(tipoDerechos, riesgos) {
    const agentes = [];

    // Siempre ejecutar auditor contractual
    agentes.push('auditor-contractual');

    // Si hay crédito, ejecutar investigador jurisprudencial
    if (tipoDerechos.includes('Crédito')) {
      agentes.push('investigador-jurisprudencial');
    }

    // Si hay riesgos críticos, ejecutar consultor de comunicaciones
    if (riesgos.some(r => r.nivel === 'CRÍTICO')) {
      agentes.push('consultor-comunicaciones');
    }

    // Siempre ejecutar redactor ejecutivo para resumen
    agentes.push('redactor-ejecutivo');

    return [...new Set(agentes)];
  }

  /**
   * Genera análisis completo de la cesión
   */
  generarAnalisisCesion(correo, deteccion, informacion) {
    const riesgos = informacion.riesgosDetectados || [];
    const nivelRiesgo = this.calcularNivelRiesgoGlobal(riesgos);

    return {
      timestamp: new Date().toISOString(),
      correo_id: correo.id,
      asunto: correo.subject || correo.asunto,
      remitente: correo.from || correo.remitente,
      tipo_documento: 'Cesión',

      deteccion: {
        esCesion: deteccion.esCesion,
        confianza: `${deteccion.confianza.toFixed(1)}%`,
        palabrasClaveTotales: deteccion.palabrasClave.length
      },

      informacion_extractada: {
        cedente: informacion.cedente,
        cesionario: informacion.cesionario,
        tipo_derechos: informacion.tipoDerechos,
        montos: informacion.monto,
        fecha_cesion: informacion.fecha,
        normativa_aplicable: informacion.referenciaNormativa
      },

      analisis_riesgos: {
        nivel_global: nivelRiesgo,
        cantidad_riesgos: riesgos.length,
        riesgos: riesgos,
        recomendaciones: this.generarRecomendaciones(riesgos)
      },

      agentes_asignados: this.obtenerAgentes(informacion.tipoDerechos, riesgos),

      estado: 'procesada-exitosamente'
    };
  }

  /**
   * Calcula nivel de riesgo global
   */
  calcularNivelRiesgoGlobal(riesgos) {
    if (riesgos.some(r => r.nivel === 'CRÍTICO')) return 'CRÍTICO';
    if (riesgos.filter(r => r.nivel === 'ALTO').length >= 2) return 'ALTO';
    if (riesgos.some(r => r.nivel === 'ALTO')) return 'MEDIO-ALTO';
    if (riesgos.some(r => r.nivel === 'MEDIO')) return 'MEDIO';
    return 'BAJO';
  }

  /**
   * Genera recomendaciones basadas en riesgos
   */
  generarRecomendaciones(riesgos) {
    const recomendaciones = [];

    riesgos.forEach(riesgo => {
      recomendaciones.push(riesgo.accion);
    });

    // Recomendaciones generales
    recomendaciones.push('Revisar validez de la cesión según normativa colombiana');
    recomendaciones.push('Verificar que no haya restricciones a la cesión en el título original');
    recomendaciones.push('Confirmar que la cesión se haya ejecutado con los requisitos formales');
    recomendaciones.push('Registrar la cesión ante autoridades competentes si es requerido');

    return [...new Set(recomendaciones)];
  }
}

module.exports = ProcesadorCesiones;
