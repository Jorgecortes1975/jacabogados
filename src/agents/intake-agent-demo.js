/**
 * Intake Agent - DEMOSTRACIÓN
 * Fase 2 (P2): Captura inteligente, validación de conflictos, triaje operativo
 * [SIN API KEY REQUERIDA - DATOS SIMULADOS]
 */

class IntakeAgentDemo {
  constructor() {
    this.knownCounterparties = [
      "Empresa X SAS",
      "Competidor Y Ltda",
      "Antiguo cliente Z Corp",
    ];
  }

  simulateIncomingMessage() {
    return [
      {
        id: "msg_001",
        channel: "whatsapp",
        sender: "Carlos Méndez",
        company: "TechCorp Solutions",
        message:
          "Tenemos un conflicto con nuestros empleados sobre prestaciones no pagadas. Demanda llegó hace 3 días. Urgente.",
        urgency_signals: ["demanda", "3 días", "urgente"],
      },
      {
        id: "msg_002",
        channel: "web_form",
        sender: "María Rodríguez",
        company: "Inversiones Patrimoniales",
        message:
          "Consulta sobre estructura corporativa y optimización tributaria. Sin plazo específico.",
        urgency_signals: [],
      },
      {
        id: "msg_003",
        channel: "email",
        sender: "Juan López",
        company: "Empresa X SAS",
        message:
          "Requiero asesoría en contratación y cumplimiento laboral.",
        urgency_signals: [],
        conflict_flag: true,
      },
    ];
  }

  extractBasicData(message) {
    return {
      sender_name: message.sender,
      company: message.company,
      contact_channel: message.channel,
      case_description: message.message,
      urgency_detected: message.urgency_signals.length > 0,
    };
  }

  validateConflictOfInterest(caseData) {
    const conflict = this.knownCounterparties.some(
      (cp) => cp.toLowerCase() === caseData.company.toLowerCase()
    );

    return {
      conflict_detected: conflict,
      confidence_level: conflict ? "high" : "none",
      requires_escalation: conflict,
      recommendation: conflict
        ? "ESCALADA A ABOGADO SENIOR - Conflicto de interés identificado"
        : "Sin conflictos identificados",
    };
  }

  categorizeCase(caseData) {
    let category = "FILTRADO";
    let reason = "";

    if (caseData.urgency_detected) {
      category = "PRIORIDAD_ALTA";
      reason = "Demanda o plazo perentorio identificado";
    } else if (caseData.case_description.toLowerCase().includes("estructura")) {
      category = "CORPORATIVO";
      reason = "Asesoría corporativa / estructura empresarial";
    }

    return {
      category: category,
      reason: reason,
      suggested_response_time:
        category === "PRIORIDAD_ALTA" ? "<24 horas" : "<3 días",
    };
  }

  generateAutomaticResponse(caseData, conflict, categorization) {
    if (conflict.conflict_detected) {
      return `Estimado ${caseData.sender_name},

Agradecemos tu interés en JAC - Abogados Asociados.

Por motivos de política interna de conflictos de interés, no podemos asumir este asunto en este momento.

Recomendamos contactar con otro despacho especializado.

Saludos cordiales,
JAC - Abogados Asociados`;
    }

    if (categorization.category === "PRIORIDAD_ALTA") {
      return `Estimado ${caseData.sender_name},

Recibimos tu consulta urgente el ${new Date().toLocaleDateString("es-CO")}.

Tu caso ha sido categorizado como PRIORIDAD ALTA y será asignado a nuestro equipo senior inmediatamente.

Nos contactaremos en las próximas 24 horas para agendar reunión inicial.

Adjuntamos NDA confidencial para revisión.

Saludos,
JAC - Abogados Asociados`;
    }

    return `Estimado ${caseData.sender_name},

Recibimos tu consulta. Será revisada por nuestro equipo y nos contactaremos en 2-3 días hábiles.

Saludos,
JAC - Abogados Asociados`;
  }

  async processIncomingQueue() {
    console.log(`\n📋 INTAKE AGENT - DEMOSTRACIÓN`);
    console.log(`   Canales: WhatsApp, Formulario Web, Email`);
    console.log(`   Validación: Conflictos de interés, Triaje operativo\n`);

    const messages = this.simulateIncomingMessage();
    const results = {
      timestamp: new Date().toISOString(),
      messages_processed: messages.length,
      cases: [],
    };

    for (const msg of messages) {
      console.log(
        `📩 Mensaje ${msg.id} desde ${msg.channel.toUpperCase()} - ${msg.sender}`
      );

      // Paso 1: Extrae datos
      console.log(`   1️⃣  Capturando datos...`);
      const basicData = this.extractBasicData(msg);
      console.log(`      ✓ Empresa: ${basicData.company}`);

      // Paso 2: Valida conflictos
      console.log(`   2️⃣  Validando conflictos de interés...`);
      const conflictValidation = this.validateConflictOfInterest(basicData);
      if (conflictValidation.conflict_detected) {
        console.log(
          `      ⚠️  CONFLICTO DETECTADO: ${conflictValidation.recommendation}`
        );
      } else {
        console.log(`      ✓ Sin conflictos`);
      }

      // Paso 3: Categoriza caso
      console.log(`   3️⃣  Categorizando caso...`);
      const categorization = this.categorizeCase(basicData);
      console.log(`      ✓ Categoría: ${categorization.category}`);
      console.log(`      ✓ Razón: ${categorization.reason}`);
      console.log(`      ✓ Respuesta en: ${categorization.suggested_response_time}`);

      // Paso 4: Genera respuesta
      console.log(`   4️⃣  Generando respuesta automática...`);
      const response = this.generateAutomaticResponse(
        basicData,
        conflictValidation,
        categorization
      );
      console.log(`      ✓ Respuesta generada (${response.length} caracteres)\n`);

      results.cases.push({
        message_id: msg.id,
        sender: msg.sender,
        company: msg.company,
        channel: msg.channel,
        basic_data: basicData,
        conflict_validation: conflictValidation,
        categorization: categorization,
        auto_response: response,
        processed_at: new Date().toISOString(),
      });
    }

    console.log(`✅ PROCESAMIENTO COMPLETADO\n`);
    console.log(`RESUMEN:`);
    console.log(`   • Mensajes procesados: ${results.messages_processed}`);
    console.log(
      `   • Prioridad Alta: ${results.cases.filter((c) => c.categorization.category === "PRIORIDAD_ALTA").length}`
    );
    console.log(
      `   • Corporativo: ${results.cases.filter((c) => c.categorization.category === "CORPORATIVO").length}`
    );
    console.log(
      `   • Filtrado: ${results.cases.filter((c) => c.categorization.category === "FILTRADO").length}`
    );
    console.log(
      `   • Conflictos detectados: ${results.cases.filter((c) => c.conflict_validation.conflict_detected).length}\n`
    );

    return results;
  }
}

// Ejecutar demostración
if (require.main === module) {
  const agent = new IntakeAgentDemo();
  agent.processIncomingQueue().catch(console.error);
}

module.exports = IntakeAgentDemo;
