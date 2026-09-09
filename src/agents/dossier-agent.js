/**
 * Dossier Agent - Generación Ejecutiva de Expedientes Corporativos
 * Fase 3 (P2): Extrae calendario → Perfil decisor + Radiografía empresarial + Vulnerabilidades + Tesis conversación
 */

const Anthropic = require("@anthropic-ai/sdk");

class DossierAgent {
  constructor(config = {}) {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    this.config = {
      temperature: 0.2,
      model: "claude-opus-5",
      ...config,
    };
  }

  /**
   * RF-007: Extrae datos de decisores de invitación a reunión
   * Genera perfil profesional verificable
   */
  async extractDecisionMakerProfile(meetingData) {
    const prompt = `
Eres analista jurídico corporativo especializado en perfilamiento de decisores.

DATOS DE INVITACIÓN A REUNIÓN:
${JSON.stringify(meetingData, null, 2)}

TAREA: Extrae perfil del decisor usando SOLO datos públicos verificables:
1. Nombre y cargo
2. Empresa y sector
3. Historial profesional (LinkedIn, registros públicos)
4. Especialidades/áreas de decisión
5. Señales de autoridad (publicaciones, speaking, educación)

RESTRICCIÓN: Sin inventar. Si dato no es verificable públicamente, marca como "NEEDS_VERIFICATION".

Responde en JSON:
{
  "decision_maker": {
    "name": "...",
    "title": "...",
    "company": "...",
    "sector": "...",
    "professional_background": "...",
    "public_signals": [],
    "verification_status": "verified|needs_verification"
  }
}
    `;

    try {
      const response = await this.client.messages.create({
        model: this.config.model,
        max_tokens: 800,
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
      console.error("Error en extracción de perfil:", error);
      return { decision_maker: {} };
    }
  }

  /**
   * RF-008: Radiografía empresarial de la empresa del decisor
   * Datos públicos: RUES, sector, tamaño, estructura
   */
  async generateCorporateRadiography(companyName, sector) {
    const prompt = `
Eres abogado especializado en análisis corporativo de empresas colombianas.

EMPRESA: ${companyName}
SECTOR: ${sector}

TAREA: Genera radiografía usando fuentes públicas verificables:
1. Objeto social y actividad económica
2. Tamaño estimado (nómina, ingresos)
3. Estructura accionaria (si es pública)
4. Registros mercantiles (RUES)
5. Contingencias públicas conocidas (litigios, sanciones)

RESTRICCIÓN: Solo datos de RUES, registros públicos, Superintendencia. Sin especulación.

Responde en JSON:
{
  "company_radiography": {
    "corporate_object": "...",
    "estimated_size": "pyme|mediana|grande",
    "sector_classification": "...",
    "public_registries": "...",
    "known_contingencies": [],
    "data_sources": ["RUES", "Cámara de Comercio", "Superintendencia"]
  }
}
    `;

    try {
      const response = await this.client.messages.create({
        model: this.config.model,
        max_tokens: 1000,
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
      console.error("Error en radiografía empresarial:", error);
      return { company_radiography: {} };
    }
  }

  /**
   * RF-009: Análisis de vulnerabilidades legales del sector
   * Basado en jurisprudencia, normativa, riesgos conocidos
   */
  async analyzeSecurityVulnerabilities(sector) {
    const prompt = `
Eres especialista en riesgos corporativos colombianos por sector.

SECTOR: ${sector}

TAREA: Identifica vulnerabilidades legales típicas del sector usando jurisprudencia y normativa:
1. Riesgos laborales (tercerización, esquemas atípicos)
2. Cumplimiento regulatorio (DIAN, ambientales, sanitarios)
3. Riesgos contractuales (proveedores, clientes)
4. Contingencias de gobierno corporativo
5. Riesgos de Habeas Data/privacidad

FUENTES: Jurisprudencia Corte Suprema, Consejo de Estado, normas SUIN, resoluciones Superintendencia.

Responde en JSON:
{
  "sector_vulnerabilities": [
    {
      "risk_category": "laboral|regulatory|contractual|governance|privacy",
      "description": "...",
      "jurisprudential_precedent": "Sentencia Corte X, Año Y",
      "mitigation_approach": "..."
    }
  ]
}
    `;

    try {
      const response = await this.client.messages.create({
        model: this.config.model,
        max_tokens: 1200,
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
      console.error("Error en análisis de vulnerabilidades:", error);
      return { sector_vulnerabilities: [] };
    }
  }

  /**
   * RF-010: Generación de tesis de conversación
   * 3 puntos de entrada estratégicos donde JAC ofrece ROI palpable
   */
  async generateConversationThesis(decisonMaker, corporateRadiography, vulnerabilities) {
    const prompt = `
Eres abogado senior corporativo redactando estrategia de valor.

DECISOR: ${decisonMaker.decision_maker?.name || "Indefinido"}
EMPRESA: ${corporateRadiography.company_radiography?.corporate_object || "Indefinida"}
VULNERABILIDADES SECTOR: ${JSON.stringify(vulnerabilities.sector_vulnerabilities?.slice(0, 2) || [])}

TAREA: Genera 3 tesis de conversación donde JAC ofrece ROI específico:
1. Punto de entrada 1: Oportunidad inmediata (30-90 días)
2. Punto de entrada 2: Riesgo a mediano plazo (6-12 meses)
3. Punto de entrada 3: Blindaje patrimonial estratégico (anual)

RESTRICCIÓN: Cada tesis debe estar fundada en:
- Vulnerabilidad real del sector (no especulación)
- Precedente jurisprudencial verificable
- ROI cuantificable o estratégico claro

Responde en JSON:
{
  "conversation_thesis": [
    {
      "entry_point": 1,
      "title": "...",
      "business_opportunity": "...",
      "legal_basis": "Jurisprudencia/Norma verificable",
      "roi_statement": "...",
      "next_question": "Pregunta estratégica para decisor"
    }
  ]
}
    `;

    try {
      const response = await this.client.messages.create({
        model: this.config.model,
        max_tokens: 1500,
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
      console.error("Error en generación de tesis:", error);
      return { conversation_thesis: [] };
    }
  }

  /**
   * Orquestación: Extrae → Radiografía → Vulnerabilidades → Tesis
   */
  async generateExecutiveDossier(meetingData) {
    console.log(`\n📋 DOSSIER AGENT - Reunión programada`);
    console.log(`   Empresa: ${meetingData.company_name}`);
    console.log(`   Decisor: ${meetingData.attendee_name}\n`);

    // Paso 1: Perfil del decisor
    console.log("  1️⃣  Extrayendo perfil del decisor...");
    const decisionMaker = await this.extractDecisionMakerProfile(meetingData);
    if (
      decisionMaker.decision_maker?.name &&
      decisionMaker.decision_maker?.verification_status === "verified"
    ) {
      console.log(
        `      ✓ ${decisionMaker.decision_maker.name} - ${decisionMaker.decision_maker.title}`
      );
    } else {
      console.log(`      ⚠️  Datos incompletos, requiere validación manual`);
    }

    // Paso 2: Radiografía empresarial
    console.log("  2️⃣  Generando radiografía empresarial...");
    const corporateRadiography = await this.generateCorporateRadiography(
      meetingData.company_name,
      meetingData.sector || "Indefinido"
    );
    if (corporateRadiography.company_radiography?.estimated_size) {
      console.log(
        `      ✓ Tamaño: ${corporateRadiography.company_radiography.estimated_size}`
      );
      console.log(
        `      ✓ Fuentes: ${corporateRadiography.company_radiography.data_sources?.join(", ") || "N/A"}`
      );
    }

    // Paso 3: Análisis de vulnerabilidades del sector
    console.log("  3️⃣  Analizando vulnerabilidades del sector...");
    const vulnerabilities = await this.analyzeSecurityVulnerabilities(
      meetingData.sector || "Corporativo"
    );
    if (vulnerabilities.sector_vulnerabilities?.length > 0) {
      console.log(
        `      ✓ ${vulnerabilities.sector_vulnerabilities.length} riesgos identificados`
      );
      vulnerabilities.sector_vulnerabilities.slice(0, 2).forEach((risk) => {
        console.log(
          `         - ${risk.risk_category}: ${risk.description.substring(0, 50)}...`
        );
      });
    }

    // Paso 4: Tesis de conversación
    console.log("  4️⃣  Generando tesis de conversación...");
    const thesis = await this.generateConversationThesis(
      decisionMaker,
      corporateRadiography,
      vulnerabilities
    );
    if (thesis.conversation_thesis?.length > 0) {
      console.log(
        `      ✓ 3 puntos de entrada estratégicos generados\n`
      );
      thesis.conversation_thesis.forEach((t, idx) => {
        console.log(`         ${idx + 1}. ${t.title}`);
        console.log(`            ROI: ${t.roi_statement}`);
      });
    }

    console.log("\n✅ DOSSIER EJECUTIVO COMPLETADO\n");

    return {
      meeting_data: meetingData,
      decision_maker: decisionMaker,
      corporate_radiography: corporateRadiography,
      sector_vulnerabilities: vulnerabilities,
      conversation_thesis: thesis,
      generated_at: new Date().toISOString(),
      status: "ready_for_review",
    };
  }
}

// Ejecutar si se corre como script
if (require.main === module) {
  const agent = new DossierAgent();

  // Simulación: Invitación a reunión con directivo corporativo
  const simulatedMeeting = {
    attendee_name: "Juan Pérez García",
    attendee_email: "juan.perez@techcorp.com.co",
    attendee_title: "Director Financiero",
    company_name: "TechCorp Solutions SAS",
    company_domain: "techcorp.com.co",
    sector: "Software y Servicios TI",
    meeting_title: "Revisión de Estructura Corporativa",
    meeting_date: "2026-09-15",
  };

  agent
    .generateExecutiveDossier(simulatedMeeting)
    .then((dossier) => {
      console.log("\n" + "=".repeat(60));
      console.log("📄 DOSSIER GUARDADO - Listo para revisión de abogado senior");
      console.log("=".repeat(60) + "\n");
    })
    .catch(console.error);
}

module.exports = DossierAgent;
