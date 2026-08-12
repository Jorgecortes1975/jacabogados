/**
 * HOOK: Procesador Automático de Correos Legales
 * Se dispara automáticamente cuando llegan correos a abogadojc@aliado.co
 */

module.exports = {
  name: 'procesador-correos-legales',
  event: 'email-received',
  email: 'abogadojr@aliado.co',
  proveedor: 'outlook',
  enabled: true,
  config: {
    procesarAutomaticamente: true,
    palabrasClaveJuridicas: true,
    actualizarEcosistema: true,
    generarAnalisis: true,
    notificaciones: true,
    frecuencia: 'en-tiempo-real'
  },

  /**
   * Procesa correos legales entrantes
   */
  async procesarCorreo(correo) {
    console.log(`\n🪝 [HOOK] Correo recibido: ${correo.asunto}`);
    console.log(`   De: ${correo.remitente}`);
    console.log(`   ID: ${correo.id}`);

    const acciones = {
      procesado: false,
      analizando: false,
      actualizandoEcosistema: false,
      generandoAnalisis: false,
      enviandoNotificacion: false
    };

    try {
      // 1. Analizar contenido
      acciones.analizando = true;
      console.log(`   ⚙️  Analizando contenido...`);
      const analisis = await this.analizarContenido(correo);

      if (!analisis.esLegal) {
        console.log(`   ℹ️  Correo no contiene información legal. Ignorado.`);
        return;
      }

      // 2. Procesar información legal
      acciones.procesado = true;
      console.log(`   ✓ Tipo: ${analisis.tipos.join(', ')}`);
      console.log(`   ✓ Palabras clave: ${analisis.palabrasClave.slice(0, 3).join(', ')}`);

      // 3. Actualizar ecosistema legal
      acciones.actualizandoEcosistema = true;
      console.log(`   🔄 Actualizando ecosistema...`);
      await this.actualizarEcosistema(correo, analisis);

      // 4. Generar análisis detallado
      acciones.generandoAnalisis = true;
      console.log(`   📋 Generando análisis...`);
      const infoAnalisis = await this.generarAnalisis(correo, analisis);

      // 5. Enviar notificación al usuario
      acciones.enviandoNotificacion = true;
      console.log(`   📧 Enviando notificación...`);
      await this.enviarNotificacion(correo, infoAnalisis);

      console.log(`   ✅ Correo procesado exitosamente\n`);

    } catch (error) {
      console.error(`   ❌ Error: ${error.message}\n`);
      throw error;
    }

    return acciones;
  },

  /**
   * Analiza si el correo contiene información legal
   */
  async analizarContenido(correo) {
    const palabrasClaveJuridicas = [
      'sentencia', 'jurisprudencia', 'fallo', 'recurso', 'apelación',
      'demanda', 'contrato', 'acuerdo', 'negociación', 'norma',
      'ley', 'decreto', 'resolución', 'artículo', 'legal',
      'litigio', 'pleito', 'conflicto', 'derecho', 'obligación'
    ];

    const texto = (correo.asunto + ' ' + correo.contenido).toLowerCase();
    const palabrasEncontradas = palabrasClaveJuridicas.filter(p => texto.includes(p));

    return {
      esLegal: palabrasEncontradas.length > 0,
      palabrasClave: palabrasEncontradas,
      tipos: this.detectarTipos(texto),
      confianza: (palabrasEncontradas.length / palabrasClaveJuridicas.length) * 100
    };
  },

  /**
   * Detecta el tipo de documento legal
   */
  detectarTipos(texto) {
    const tipos = [];
    if (texto.includes('sentencia') || texto.includes('fallo')) tipos.push('sentencia');
    if (texto.includes('contrato') || texto.includes('acuerdo')) tipos.push('contrato');
    if (texto.includes('demanda')) tipos.push('demanda');
    if (texto.includes('recurso') || texto.includes('apelación')) tipos.push('recurso');
    if (texto.includes('ley') || texto.includes('decreto')) tipos.push('normativo');
    if (texto.includes('jurisprudencia')) tipos.push('jurisprudencia');
    return tipos.length > 0 ? tipos : ['información legal'];
  },

  /**
   * Actualiza el ecosistema legal
   */
  async actualizarEcosistema(correo, analisis) {
    // Aquí se actualizarían:
    // - Bibliotecas de jurisprudencia
    // - Contratos modelo
    // - Casos activos
    // - Términos y vencimientos
    // - Precedentes aplicables

    return {
      timestamp: new Date().toISOString(),
      correoid: correo.id,
      tipos: analisis.tipos,
      palabrasClave: analisis.palabrasClave,
      estado: 'actualizado'
    };
  },

  /**
   * Genera análisis detallado del correo
   */
  async generarAnalisis(correo, analisis) {
    // Aquí se ejecutarían los agentes para análisis profundo
    return {
      timestamp: new Date().toISOString(),
      correoid: correo.id,
      asunto: correo.asunto,
      tipos: analisis.tipos,
      palabrasClave: analisis.palabrasClave,
      accionesRecomendadas: this.obtenerAccionesRecomendadas(analisis.tipos),
      agentesAEjecutar: this.obtenerAgentes(analisis.tipos)
    };
  },

  /**
   * Obtiene acciones recomendadas según el tipo
   */
  obtenerAccionesRecomendadas(tipos) {
    const acciones = [];

    tipos.forEach(tipo => {
      switch (tipo) {
        case 'sentencia':
          acciones.push('Análisis jurisprudencial');
          acciones.push('Verificar precedentes');
          acciones.push('Buscar similitudes con casos');
          break;
        case 'contrato':
          acciones.push('Auditoría contractual');
          acciones.push('Análisis de riesgos');
          acciones.push('Revisar cláusulas');
          break;
        case 'demanda':
          acciones.push('Análisis de viabilidad');
          acciones.push('Búsqueda jurisprudencial');
          acciones.push('Evaluación de riesgos');
          break;
        case 'normativo':
          acciones.push('Verificar vigencia');
          acciones.push('Identificar modificaciones');
          acciones.push('Actualizar base de datos');
          break;
      }
    });

    return [...new Set(acciones)]; // Eliminar duplicados
  },

  /**
   * Obtiene los agentes que deben ejecutarse
   */
  obtenerAgentes(tipos) {
    const agentes = [];

    tipos.forEach(tipo => {
      switch (tipo) {
        case 'sentencia':
        case 'jurisprudencia':
          agentes.push('investigador-jurisprudencial');
          break;
        case 'contrato':
          agentes.push('auditor-contractual');
          break;
        case 'demanda':
          agentes.push('investigador-jurisprudencial');
          agentes.push('auditor-contractual');
          break;
      }
    });

    return [...new Set(agentes)]; // Eliminar duplicados
  },

  /**
   * Envía notificación al usuario
   */
  async enviarNotificacion(correo, infoAnalisis) {
    const mensaje = `
📧 CORREO LEGAL PROCESADO AUTOMÁTICAMENTE

De: ${correo.remitente}
Asunto: ${correo.asunto}

🏷️  Tipos: ${infoAnalisis.tipos.join(', ')}
🔑 Palabras clave: ${infoAnalisis.palabrasClave.slice(0, 5).join(', ')}

🎯 Acciones Recomendadas:
${infoAnalisis.accionesRecomendadas.map(a => `  • ${a}`).join('\n')}

🤖 Agentes que se ejecutarán:
${infoAnalisis.agentesAEjecutar.map(a => `  • ${a}`).join('\n')}

Archivo de análisis: ~/Documents/JAC-Correos-Procesados/analisis-${correo.id}-*.json
    `;

    console.log('   📬 Notificación:');
    console.log(mensaje);

    // En producción, esto enviaría:
    // - Email de resumen
    // - Notificación en Slack
    // - Push notification en móvil
    // - Actualización en dashboard
  }
};
