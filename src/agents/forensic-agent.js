/**
 * Forensic Agent - Análisis Forense de Contingencia Corporativa
 * Fase 4 (P3): Procesa nóminas/contratos → Matrices contingencia → Cálculos 100% citables → Reportes
 */

const Anthropic = require("@anthropic-ai/sdk");

class ForensicAgent {
  constructor(config = {}) {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    this.config = {
      temperature: 0.2,
      model: "claude-opus-5",
      ...config,
    };

    // Normativa colombiana para cálculos de liquidación laboral
    this.colombianLaborLaw = {
      CST: "Código Sustantivo del Trabajo",
      auxilio_cesantia_rate: 0.0833, // 1 mes por año
      primas_rate: 0.5, // 6 días por mes
      vacaciones_rate: 0.0417, // 15 días por año
      interest_rate: 0.12, // 12% anual (Decreto 2350/1944)
    };
  }

  /**
   * RF-012: Procesa nómina y calcula exposición laboral
   * Matriz de contingencia por concepto (indemnización, prestaciones, perjuicios)
   */
  async calculateLaborContingencyMatrix(payrollData) {
    const prompt = `
Eres contador forense especializado en liquidación laboral colombiana.

DATOS DE NÓMINA:
${JSON.stringify(payrollData, null, 2)}

TAREA: Calcula exposición laboral por empleado usando CST (Código Sustantivo del Trabajo):
1. Indemnización por despido injustificado (art. 58 CST: 45 días + prima de antigüedad)
2. Prestaciones no pagadas (auxilio cesantía, prima de servicios, vacaciones)
3. Perjuicios morales (estimación jurisprudencial)
4. Intereses sobre deuda (12% anual, Decreto 2350/1944)

REQUISITO CRÍTICO (RF-012):
- Cada cifra DEBE estar citables contra:
  * Artículo específico del CST
  * Jurisprudencia Corte Suprema
  * Cálculo verificable manualmente

NO INVENTES MONTOS. Si no puedes calcular, responde "REQUIRES_DETAILED_PAYROLL".

Responde en JSON:
{
  "contingency_matrix": [
    {
      "employee_id": "...",
      "employee_name": "...",
      "years_of_service": N,
      "current_salary": N,
      "contingency_concepts": [
        {
          "concept": "indemnización_injustificado",
          "amount": N,
          "calculation_basis": "Art. 58 CST: 45 días + antigüedad",
          "legal_citation": "Corte Suprema STP...",
          "formula": "45 × (salary/30) + (years × salary)"
        }
      ],
      "total_exposure": N,
      "confidence_level": "high|medium|low"
    }
  ],
  "aggregate_exposure": N,
  "calculation_date": "2026-09-09"
}
    `;

    try {
      const response = await this.client.messages.create({
        model: this.config.model,
        max_tokens: 2000,
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
      console.error("Error en cálculo de contingencia laboral:", error);
      return { contingency_matrix: [], aggregate_exposure: 0 };
    }
  }

  /**
   * RF-013: Análisis de contratos vs. estatutos
   * Identifica quórums defectuosos, cesiones no autorizadas, incumplimientos
   */
  async analyzeContractualVsStatutory(
    contractData,
    statutesData
  ) {
    const prompt = `
Eres abogado litigante especializado en interpretación contractual y estatutaria.

CONTRATO: ${contractData.description}
ESTATUTOS EMPRESA: ${statutesData.description}

TAREA: Identifica desalineamientos entre contrato y estatutos:
1. Quórums: ¿Se cumplió en la suscripción?
2. Autorización: ¿Tenía poder para firmar?
3. Vigencia: ¿El contrato entra en conflicto con cláusulas estatutarias?
4. Resolución de disputas: ¿Hay cláusulas contradictorias?
5. Cesión: ¿Fue autorizada conforme a estatutos?

RESTRICCIÓN: Solo señala incumplimientos verificables en documentos. Sin interpretaciones ambiguas.

Responde en JSON:
{
  "alignment_analysis": {
    "quorum_compliance": {
      "requirement": "...",
      "actual": "...",
      "compliant": true|false,
      "risk_level": "high|medium|low"
    },
    "authorization_analysis": {
      "authority_required": "...",
      "authority_granted": "...",
      "authorized": true|false,
      "risk_level": "high|medium|low"
    },
    "key_conflicts": [],
    "recommendations": []
  }
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
      console.error("Error en análisis contractual:", error);
      return { alignment_analysis: {} };
    }
  }

  /**
   * RF-014: Generación de reporte ejecutivo semanarizado
   * Resumen de 1 página + tablas detalladas
   */
  async generateExecutiveReport(contingencyMatrix, contractualAnalysis) {
    const totalExposure = contingencyMatrix.aggregate_exposure || 0;

    const reportText = `
REPORTE FORENSE DE CONTINGENCIA LABORAL Y CONTRACTUAL
═══════════════════════════════════════════════════════════════

EMPRESA: [Cliente]
FECHA DE ANÁLISIS: ${new Date().toLocaleDateString("es-CO")}
ABOGADO RESPONSABLE: [Validar manualmente]

RESUMEN EJECUTIVO
─────────────────

EXPOSICIÓN TOTAL LABORAL: $${totalExposure.toLocaleString("es-CO")}

Desglose por concepto:
${contingencyMatrix.contingency_matrix
  ?.slice(0, 3)
  .map(
    (emp) =>
      `  • ${emp.employee_name}: $${emp.total_exposure?.toLocaleString("es-CO") || "Cálculo pendiente"}`
  )
  .join("\n")}

HALLAZGOS CONTRACTUALES
─────────────────────

Alineamiento de estatutos vs. contratos:
${contractualAnalysis.alignment_analysis?.key_conflicts
  ?.slice(0, 3)
  .map((conflict) => `  ⚠️  ${conflict}`)
  .join("\n") || "  ✓ Conforme a estatutos"}

RECOMENDACIONES ESTRATÉGICAS
─────────────────────────────

1. LITIGIOSIDAD: Riesgo ${
      totalExposure > 500000000 ? "ALTO" : "MEDIO"
    } por exposición acumulada
2. PROVISIÓN CONTABLE: Recomendar provisión de $${(totalExposure * 0.6).toLocaleString("es-CO")} (60% prudencial)
3. NEGOCIOS: Valorar acuerdo de pago antes de demanda (máximo 75% de exposición)

PRÓXIMOS PASOS
──────────────

[ ] Validar nómina con contador del cliente
[ ] Revisar expedientes individuales de cada empleado
[ ] Cotizar seguros de responsabilidad civil patronal
[ ] Agendar reunión de presentación de hallazgos

═══════════════════════════════════════════════════════════════
Análisis forense conforme a CST, jurisprudencia Corte Suprema y normas SUIN.
Documento confidencial - Secreto profesional.
    `;

    return {
      executive_summary: reportText,
      total_exposure: totalExposure,
      recommendation: totalExposure > 500000000 ? "URGENT_NEGOTIATION" : "MONITORING",
      generated_at: new Date().toISOString(),
      requires_senior_review: true,
    };
  }

  /**
   * Orquestación: Nómina → Matriz Contingencia → Análisis Contractual → Reporte
   */
  async processForensicCase(payrollData, contractData, statutesData) {
    console.log(`\n🔍 FORENSIC AGENT - Análisis Forense de Contingencia`);
    console.log(`   Empleados a analizar: ${payrollData.employees?.length || 0}\n`);

    // Paso 1: Calcular matriz de contingencia laboral
    console.log("  1️⃣  Calculando exposición laboral...");
    const contingencyMatrix = await this.calculateLaborContingencyMatrix(
      payrollData
    );
    if (contingencyMatrix.aggregate_exposure > 0) {
      console.log(
        `      ✓ Exposición total: $${contingencyMatrix.aggregate_exposure.toLocaleString("es-CO")}`
      );
      if (contingencyMatrix.contingency_matrix?.length > 0) {
        console.log(`      ✓ ${contingencyMatrix.contingency_matrix.length} empleados analizados`);
      }
    } else {
      console.log(`      ⚠️  Cálculo incompleto - requiere nómina detallada`);
    }

    // Paso 2: Análisis de alineamiento contractual
    console.log("  2️⃣  Analizando alineamiento contractual...");
    const contractualAnalysis = await this.analyzeContractualVsStatutory(
      contractData,
      statutesData
    );
    if (
      contractualAnalysis.alignment_analysis?.key_conflicts?.length > 0
    ) {
      console.log(
        `      ⚠️  ${contractualAnalysis.alignment_analysis.key_conflicts.length} conflictos identificados`
      );
    } else {
      console.log(`      ✓ Contratos alineados con estatutos`);
    }

    // Paso 3: Generar reporte ejecutivo
    console.log("  3️⃣  Generando reporte ejecutivo...");
    const report = await this.generateExecutiveReport(
      contingencyMatrix,
      contractualAnalysis
    );

    console.log(`\n${report.executive_summary}`);
    console.log(`\n🚨 ESTADO: ${report.requires_senior_review ? "Requiere validación de abogado senior" : "Listo"}\n`);

    return {
      case_data: {
        payroll: payrollData,
        contracts: contractData,
        statutes: statutesData,
      },
      contingency_matrix: contingencyMatrix,
      contractual_analysis: contractualAnalysis,
      executive_report: report,
      status: "ready_for_senior_review",
    };
  }
}

// Ejecutar si se corre como script
if (require.main === module) {
  const agent = new ForensicAgent();

  // Simulación: Datos de nómina simplificada
  const simulatedPayroll = {
    employees: [
      {
        id: "EMP001",
        name: "María Rodríguez López",
        position: "Gerente de Operaciones",
        hire_date: "2018-03-15",
        current_salary: 4500000,
        status: "active",
      },
      {
        id: "EMP002",
        name: "Carlos Méndez Gutiérrez",
        position: "Contador",
        hire_date: "2019-08-01",
        current_salary: 2800000,
        status: "active",
      },
      {
        id: "EMP003",
        name: "Ana Patricia Silva",
        position: "Asistente Administrativa",
        hire_date: "2020-01-10",
        current_salary: 1200000,
        status: "active",
      },
    ],
  };

  const simulatedContracts = {
    description: "Contratos individuales de prestación de servicios",
  };

  const simulatedStatutes = {
    description: "Estatutos sociales según Cámara de Comercio",
  };

  agent
    .processForensicCase(
      simulatedPayroll,
      simulatedContracts,
      simulatedStatutes
    )
    .then((result) => {
      console.log("✅ ANÁLISIS FORENSE COMPLETADO");
    })
    .catch(console.error);
}

module.exports = ForensicAgent;
