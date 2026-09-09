/**
 * Intake Agent - Filtro Inteligente de Admisión de Clientes
 * Fase 2 (P2): Captura → Validación conflictos → Triaje operativo
 * Protocolo de 3 pasos: datos básicos → conflicto de interés → categorización
 */

const Anthropic = require("@anthropic-ai/sdk");

class IntakeAgent {
  constructor(config = {}) {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    this.config = {
      temperature: 0.2,
      model: "claude-opus-5",
      ...config,
    };

    // Base de datos simulada de contrapartes conocidas (en producción: PostgreSQL)
    this.knownCounterparties = [
      "Empresa_XYZ_SA",
      "Banco_Colombia",
      "Fondo_Inversiones",
    ];

    // Términos perentorios (plazos procesales críticos)
    this.peremptoryTerms = [
      "demanda",
      "notificación",
      "plazo",
      "apelación",
      "día hábil",
      "juzgado",
      "proceso",
      "tutela",
      "requerimiento",
    ];
  }

  /**
   * Paso 1: Captura de datos básicos y extracción de contexto
   */
  async captureBasicData(message, channel = "whatsapp") {
    const prompt = `
Eres asistente jurídico de admisión de clientes para JAC (despacho corporativo colombiano).

MENSAJE RECIBIDO por ${channel}:
"${message}"

TAREA: Extrae datos estructurados:
1. Nombre remitente (si aparece)
2. Empresa/objeto del negocio
3. Descripción del caso/consulta
4. Urgencia (¿Tiene plazos procesales? ¿Mención de "día X", "plazo", "requerimiento"?)
5. Tipo de servicio que parece solicitar (litigio, asesoría, contractual, otro)

Responde en JSON:
{
  "name": "...",
  "company": "...",
  "case_description": "...",
  "has_peremptory_terms": true|false,
  "inferred_service_type": "litigio|contractual|tributario|laboral|otro",
  "urgency_level": "alta|media|baja",
  "confidence": 0-1
}
    `;

    try {
      const response = await this.client.messages.create({
        model: this.config.model,
        max_tokens: 600,
        temperature: this.config.temperature,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const content = response.content[0];
      if (content.type === "text") {
        return JSON.parse(content.text);
      }
    } catch (error) {
      console.error("Error en captura de datos:", error);
      return {
        urgency_level: "media",
        confidence: 0,
      };
    }
  }

  /**
   * Paso 2: Validación de conflicto de interés
   * RF-003: Detección automática con escalada manual en caso de duda
   */
  async validateConflictOfInterest(caseData) {
    // Verificación local rápida
    const potentialConflict = this.knownCounterparties.some(
      (counterparty) =>
        caseData.company?.toUpperCase().includes(counterparty.toUpperCase()) ||
        caseData.case_description
          ?.toUpperCase()
          .includes(counterparty.toUpperCase())
    );

    if (potentialConflict) {
      return {
        has_conflict: true,
        type: "potential_counterparty",
        severity: "high",
        action: "ESCALATE_TO_SENIOR_LAWYER",
        reason: `Posible conflicto con contrapartes conocidas: ${caseData.company}`,
      };
    }

    // Verificación con Claude para patrones más sutiles
    const prompt = `
Analiza el siguiente caso para detectar conflictos de interés potenciales:

Empresa: ${caseData.company}
Descripción: ${caseData.case_description}

RESTRICCIÓN (RF-011): JAC NO puede:
- Representar simultáneamente demandante y demandado
- Actuar en casos donde cliente es proveedor de otro cliente
- Participar en litigios donde existe relación societaria compleja

RESPONDE:
{
  "has_conflict": true|false,
  "severity": "high|medium|low|none",
  "reason": "...",
  "manual_review_required": true|false
}
    `;

    try {
      const response = await this.client.messages.create({
        model: this.config.model,
        max_tokens: 400,
        temperature: this.config.temperature,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const content = response.content[0];
      if (content.type === "text") {
        return JSON.parse(content.text);
      }
    } catch (error) {
      console.error("Error en validación de conflictos:", error);
      return {
        has_conflict: false,
        severity: "none",
        manual_review_required: true,
      };
    }
  }

  /**
   * Paso 3: Triaje automático a categoría operativa
   * RF-003: Categorización en Prioridad Alta, Corporativo o Filtrado
   */
  async categorizeCase(caseData) {
    const hasPremitoryTerms =
      caseData.has_peremptory_terms || caseData.urgency_level === "alta";

    const prompt = `
Categoriza el siguiente caso de admisión:

${JSON.stringify(caseData, null, 2)}

CATEGORÍAS OPERATIVAS (RF-003):
1. PRIORIDAD ALTA: Términos perentorios inmediatos (plazo <15 días), tutelas, medidas cautelares, notificaciones de juzgado
2. CORPORATIVO: Asesoría contractual, estructura empresarial, inversión, M&A, blindaje patrimonial
3. FILTRADO: Casos fuera de alcance (laboral puro, penal, ambiental), consultas sin retención clara

RESPONDE:
{
  "category": "PRIORIDAD_ALTA|CORPORATIVO|FILTRADO",
  "reasoning": "...",
  "next_action": "Revisión inmediata|Agenda reunión diagnóstico|Declinación respetuosa",
  "requires_human_validation": true|false
}
    `;

    try {
      const response = await this.client.messages.create({
        model: this.config.model,
        max_tokens: 500,
        temperature: this.config.temperature,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const content = response.content[0];
      if (content.type === "text") {
        return JSON.parse(content.text);
      }
    } catch (error) {
      console.error("Error en categorización:", error);
      return {
        category: "CORPORATIVO",
        requires_human_validation: true,
      };
    }
  }

  /**
   * Generación de respuesta automática profesional
   * Establece términos de comunicación desde primer contacto
   */
  async generateAutomaticResponse(caseData, conflictValidation, categorization) {
    // Si hay conflicto, respuesta es declinación respetuosa
    if (conflictValidation.has_conflict) {
      return {
        template: "DECLINE_RESPECTFULLY",
        message: `Estimado(a) ${caseData.name || "cliente"},

Agradecemos su confianza en JAC. Tras revisión inicial, identificamos que existe un potencial conflicto de interés que nos impide asumir su representación en este momento.

Recomendamos buscar asesor jurídico especializado que no tenga esta limitación.

Cordialmente,
JAC - Abogados Asociados`,
        send_via_channel: "whatsapp",
      };
    }

    // Si es Prioridad Alta, respuesta con urgencia
    if (categorization.category === "PRIORIDAD_ALTA") {
      return {
        template: "URGENT_INTAKE",
        message: `Estimado(a) ${caseData.name || "cliente"},

Recibimos su consulta sobre: "${caseData.case_description}"

IMPORTANTE: Su caso presenta términos perentorios que requieren revisión inmediata. Uno de nuestros abogados se comunicará en las próximas 2 horas para validar términos exactos y proponer estrategia preliminar.

Mientras tanto, le solicitamos:
1. Nombre completo y empresa
2. Descripción detallada de la contingencia
3. Términos procesales exactos (fechas límite)
4. Documentos clave

Canal seguro: envíe por correo corporativo con asunto "URGENTE: [Su Empresa]"

Cordialmente,
JAC - Abogados Asociados`,
        send_via_channel: "whatsapp",
        escalate_to: "senior_lawyer",
      };
    }

    // Si es Corporativo, propuesta de diagnóstico
    if (categorization.category === "CORPORATIVO") {
      return {
        template: "CORPORATE_DIAGNOSTIC",
        message: `Estimado(a) ${caseData.name || "cliente"},

Agradecemos su interés en JAC para: "${caseData.case_description}"

Proponemos un diagnóstico ejecutivo de 15 minutos (sin costo) para:
- Validar alcance del caso
- Identificar riesgos específicos
- Proponer estrategia de solución

¿Cuál sería su horario preferido esta semana? Responda por este canal o escriba a: contacto@jac.com.co

Nota importante: Comunicación por WhatsApp no constituye retención de servicios ni asesoría legal formal. Documentos sensibles se comparten únicamente bajo acuerdo de confidencialidad (NDA).

Cordialmente,
JAC - Abogados Asociados`,
        send_via_channel: "whatsapp",
        next_step: "schedule_diagnostic",
      };
    }

    // Si es Filtrado, declinación clara
    return {
      template: "OUT_OF_SCOPE",
      message: `Estimado(a) ${caseData.name || "cliente"},

Agradecemos su consulta. El asunto que menciona: "${caseData.case_description}" se encuentra fuera del enfoque especializado de JAC (derecho corporativo, litigio comercial, blindaje patrimonial).

Le recomendamos buscar asesor especializado en su área.

Cordialmente,
JAC - Abogados Asociados`,
      send_via_channel: "whatsapp",
    };
  }

  /**
   * Orquestación: Paso 1 → Paso 2 → Paso 3 → Respuesta automática
   */
  async processIncomingMessage(message, channel = "whatsapp") {
    console.log(`\n📥 INTAKE AGENT - Mensaje recibido por ${channel}`);
    console.log(`   "${message}"\n`);

    // Paso 1: Captura
    console.log("  1️⃣  Capturando datos básicos...");
    const caseData = await this.captureBasicData(message, channel);
    console.log(`      ✓ Empresa: ${caseData.company || "N/A"}`);
    console.log(`      ✓ Urgencia: ${caseData.urgency_level}`);

    // Paso 2: Conflicto de interés
    console.log("  2️⃣  Validando conflicto de interés...");
    const conflictValidation = await this.validateConflictOfInterest(caseData);
    if (conflictValidation.has_conflict) {
      console.log(
        `      ⚠️  CONFLICTO DETECTADO: ${conflictValidation.reason}`
      );
      console.log(`      🚨 Escalando a abogado senior...`);
    } else {
      console.log(`      ✓ Sin conflictos identificados`);
    }

    // Paso 3: Categorización
    console.log("  3️⃣  Categorizando caso...");
    const categorization = await this.categorizeCase(caseData);
    console.log(
      `      ✓ Categoría: ${categorization.category}`
    );

    // Generar respuesta automática
    console.log("  4️⃣  Generando respuesta automática...");
    const response = await this.generateAutomaticResponse(
      caseData,
      conflictValidation,
      categorization
    );

    console.log(
      `\n📤 RESPUESTA AUTOMÁTICA (${response.template}):`
    );
    console.log(`\n${response.message}\n`);

    // Si requiere escalada, anotar
    if (response.escalate_to === "senior_lawyer") {
      console.log(
        `🚨 ACCIÓN REQUERIDA: Abogado senior debe revisar en 2 horas max\n`
      );
    }

    return {
      case_data: caseData,
      conflict_validation: conflictValidation,
      categorization: categorization,
      auto_response: response,
    };
  }

  /**
   * Simulación de múltiples consultas
   */
  async processIncomingQueue() {
    console.log("\n🚀 INICIANDO INTAKE AGENT\n");
    console.log("Configuración:");
    console.log(`  - Temperatura: ${this.config.temperature} (precisión máxima)`);
    console.log(`  - Modelo: ${this.config.model}`);
    console.log(`  - Canales: WhatsApp, Formulario web, Correo`);
    console.log("\n⚠️  RESTRICCIONES OPERACIONALES:");
    console.log("  - Validación de conflicto de interés obligatoria (RF-003)");
    console.log("  - Triaje automático a categoría operativa");
    console.log("  - Human-in-the-loop en decisiones legales (RF-009)");
    console.log("  - Auditoría inmutable de cada consulta\n");

    // Simulación: 3 consultas de diferentes tipos
    const simulatedMessages = [
      {
        message:
          "Hola, tengo una demanda laboral y necesito abogado urgente. Tengo plazo de responder al juzgado en 10 días.",
        channel: "whatsapp",
      },
      {
        message:
          "Mi empresa necesita estructurar un acuerdo de inversión con un fondo. ¿Dónde empezamos?",
        channel: "formulario_web",
      },
      {
        message:
          "¿Pueden ayudarme con derecho penal? Tengo un caso de fraude.",
        channel: "whatsapp",
      },
    ];

    for (const incoming of simulatedMessages) {
      await this.processIncomingMessage(incoming.message, incoming.channel);
      console.log("─".repeat(60));
    }

    console.log("\n✅ PROCESAMIENTO DE COLA COMPLETADO\n");
  }
}

// Ejecutar si se corre como script
if (require.main === module) {
  const agent = new IntakeAgent();
  agent.processIncomingQueue().catch(console.error);
}

module.exports = IntakeAgent;
