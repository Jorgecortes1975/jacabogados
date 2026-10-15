/**
 * Forensic Agent - DEMOSTRACIÓN
 * Fase 4 (P3): Análisis forense de contingencia laboral y contractual
 * [SIN API KEY REQUERIDA - DATOS SIMULADOS]
 */

class ForensicAgentDemo {
  constructor() {
    this.colombianLaborLaw = {
      auxilio_cesantia_rate: 0.0833,
      primas_rate: 0.5,
      vacaciones_rate: 0.0417,
      interest_rate: 0.12,
      days_per_month: 30,
    };
  }

  simulateLaborContingencyMatrix() {
    return {
      contingency_matrix: [
        {
          employee_id: "EMP001",
          employee_name: "María Rodríguez López",
          position: "Gerente de Operaciones",
          hire_date: "2018-03-15",
          years_of_service: 6.5,
          current_salary: 4500000,
          contingency_concepts: [
            {
              concept: "indemnización_injustificado",
              amount: 675000,
              calculation_basis:
                "Art. 58 CST: 45 días + prima de antigüedad (30 días × 6.5 años)",
              legal_citation:
                "Corte Suprema STP Sentencia 25890/2022: Indemnización por despido sin justa causa",
              formula: "(45 + 195) × (4.500.000/30) = COP 675.000",
            },
            {
              concept: "prestaciones_no_pagadas",
              amount: 1125000,
              calculation_basis:
                "Auxilio cesantía 6 meses + prima de servicios acumulada",
              legal_citation: "CST Artículos 248-250: Derecho a prestaciones",
              formula: "6.5 años × 4.500.000 × (0.0833 + 0.5) = COP 1.125.000",
            },
            {
              concept: "intereses_sobre_deuda",
              amount: 216000,
              calculation_basis: "12% anual sobre deuda total (Decreto 2350/1944)",
              legal_citation:
                "Decreto 2350/1944: Interés moratorio sobre acreencias laborales",
              formula:
                "(1.800.000 × 0.12 × 4 meses / 12) = COP 216.000",
            },
          ],
          total_exposure: 2016000,
          confidence_level: "high",
        },
        {
          employee_id: "EMP002",
          employee_name: "Carlos Méndez Gutiérrez",
          position: "Contador",
          hire_date: "2019-08-01",
          years_of_service: 5.2,
          current_salary: 2800000,
          contingency_concepts: [
            {
              concept: "indemnización_injustificado",
              amount: 364000,
              calculation_basis: "Art. 58 CST: 45 días + antigüedad",
              legal_citation:
                "Corte Suprema STP Sentencia 25890/2022: Indemnización por despido sin justa causa",
              formula: "(45 + 156) × (2.800.000/30) = COP 364.000",
            },
            {
              concept: "prestaciones_no_pagadas",
              amount: 595200,
              calculation_basis:
                "Auxilio cesantía + prima + vacaciones acumuladas",
              legal_citation: "CST Artículos 248-250",
              formula: "5.2 años × 2.800.000 × (0.0833 + 0.5 + 0.0417) = COP 595.200",
            },
          ],
          total_exposure: 959200,
          confidence_level: "high",
        },
        {
          employee_id: "EMP003",
          employee_name: "Ana Patricia Silva",
          position: "Asistente Administrativa",
          hire_date: "2020-01-10",
          years_of_service: 4.7,
          current_salary: 1200000,
          contingency_concepts: [
            {
              concept: "indemnización_injustificado",
              amount: 150000,
              calculation_basis: "Art. 58 CST: 45 días + antigüedad",
              legal_citation:
                "Corte Suprema STP Sentencia 25890/2022",
              formula: "(45 + 141) × (1.200.000/30) = COP 150.000",
            },
            {
              concept: "prestaciones_no_pagadas",
              amount: 254400,
              calculation_basis:
                "Auxilio cesantía + prima + vacaciones acumuladas",
              legal_citation: "CST Artículos 248-250",
              formula: "4.7 años × 1.200.000 × (0.0833 + 0.5 + 0.0417) = COP 254.400",
            },
          ],
          total_exposure: 404400,
          confidence_level: "high",
        },
      ],
      aggregate_exposure: 3379600,
      calculation_date: new Date().toLocaleDateString("es-CO"),
    };
  }

  simulateContractualAnalysis() {
    return {
      alignment_analysis: {
        quorum_compliance: {
          requirement: "Junta Directiva con 50% + 1 de accionistas",
          actual: "Última reunión: 4 de 6 accionistas (67%)",
          compliant: true,
          risk_level: "low",
        },
        authorization_analysis: {
          authority_required:
            "Autorización de Asamblea General para contratación > COP 100M",
          authority_granted: "Acta 2024-06-15: Autorizado hasta COP 500M",
          authorized: true,
          risk_level: "low",
        },
        key_conflicts: [
          "Cláusula de cesión de derechos en contrato laboral no consta en estatutos - verificar validez conforme CST Art. 14",
          "Período de prueba establecido en 6 meses en contrato, CST Art. 80 permite máximo 2 meses - REVISIÓN URGENTE",
        ],
        recommendations: [
          "Modificar contratos para período de prueba conforme a CST (máx 2 meses)",
          "Validar cláusulas de cesión con equipo legal",
          "Revisión anual de estatutos vs. contratos vigentes",
        ],
      },
    };
  }

  async generateExecutiveReport(contingencyMatrix, contractualAnalysis) {
    const totalExposure = contingencyMatrix.aggregate_exposure;

    const reportText = `
═══════════════════════════════════════════════════════════════════════════════
REPORTE FORENSE DE CONTINGENCIA LABORAL Y CONTRACTUAL
═══════════════════════════════════════════════════════════════════════════════

EMPRESA: TechCorp Solutions SAS
FECHA DE ANÁLISIS: ${new Date().toLocaleDateString("es-CO")}
ABOGADO RESPONSABLE: [Validación requerida - Abogado Senior]

───────────────────────────────────────────────────────────────────────────────
RESUMEN EJECUTIVO
───────────────────────────────────────────────────────────────────────────────

EXPOSICIÓN TOTAL LABORAL IDENTIFICADA:
COP ${totalExposure.toLocaleString("es-CO")}

DESGLOSE POR EMPLEADO:
${contingencyMatrix.contingency_matrix
  .map(
    (emp) =>
      `  • ${emp.employee_name}: COP ${emp.total_exposure.toLocaleString("es-CO")} (${emp.years_of_service} años de servicio)`
  )
  .join("\n")}

───────────────────────────────────────────────────────────────────────────────
HALLAZGOS CONTRACTUALES CRÍTICOS
───────────────────────────────────────────────────────────────────────────────

ALINEAMIENTO DE ESTATUTOS VS. CONTRATOS:
✓ Quórum: Conforme (últimas reuniones con 67% asistencia)
✓ Autorización: Conforme (Asamblea 2024-06-15 autorizó contratación)
⚠️  CONFLICTO IDENTIFICADO: Período de prueba en contratos (6 meses)
   • Requisito legal: CST Artículo 80 máximo 2 meses
   • Riesgo legal: Contratos pueden declararse ineficaces
   • Acción: REVISIÓN URGENTE de todos los contratos

───────────────────────────────────────────────────────────────────────────────
RECOMENDACIONES ESTRATÉGICAS
───────────────────────────────────────────────────────────────────────────────

1. LITIGIOSIDAD: Riesgo ALTO por exposición acumulada de COP 3.3M

2. PROVISIÓN CONTABLE RECOMENDADA:
   • Provisión prudencial: COP ${(totalExposure * 0.6).toLocaleString("es-CO")} (60% de exposición)
   • Justificación: Contempla posible resolución parcial y costos procesales

3. ESTRATEGIA DE NEGOCIACIÓN:
   • Máximo oferente: COP ${(totalExposure * 0.75).toLocaleString("es-CO")} (75% de exposición)
   • Rationale: Evita litigio, reduce costos administrativos y reputacionales
   • Plazo: Iniciar negociaciones dentro de 30 días

4. COMPLIANCE LABORAL:
   • Modificar todos los contratos: período de prueba a 2 meses máximo
   • Auditar cláusulas de cesión de derechos
   • Validar cumplimiento de aportes parafiscales

───────────────────────────────────────────────────────────────────────────────
PRÓXIMOS PASOS INMEDIATOS
───────────────────────────────────────────────────────────────────────────────

Semana 1:
[ ] Revisar expedientes individuales de cada empleado
[ ] Validar cálculos de prestaciones en nómina histórica
[ ] Obtener copia de todos los contratos vigentes

Semana 2:
[ ] Reunión con equipo de contador cliente para validar cifras
[ ] Evaluación de seguros de responsabilidad civil patronal existentes
[ ] Iniciar negociaciones confidenciales (si procede)

Semana 3:
[ ] Agendar reunión de presentación de hallazgos al equipo directivo
[ ] Elaborar propuesta de arreglo (si aplica)
[ ] Proyectar impacto financiero en estados contables 2026

═══════════════════════════════════════════════════════════════════════════════
Análisis forense conforme a:
• Código Sustantivo del Trabajo (CST) - Colombia
• Jurisprudencia Corte Suprema de Justicia
• Decreto 2350/1944 (Intereses moratorios)
• Normas SUIN - Sistema Único de Información Normativa

Documento Confidencial - Secreto Profesional Inviolable
═══════════════════════════════════════════════════════════════════════════════`;

    return {
      executive_summary: reportText,
      total_exposure: totalExposure,
      recommendation: totalExposure > 2000000 ? "URGENT_NEGOTIATION" : "MONITORING",
      generated_at: new Date().toISOString(),
      requires_senior_review: true,
    };
  }

  async processForensicCase() {
    console.log(`\n🔍 FORENSIC AGENT - DEMOSTRACIÓN`);
    console.log(`   Análisis: Contingencia laboral + Alineamiento contractual\n`);

    // Paso 1: Calcular matriz de contingencia laboral
    console.log(`  1️⃣  Calculando exposición laboral...`);
    const contingencyMatrix = this.simulateLaborContingencyMatrix();
    if (contingencyMatrix.aggregate_exposure > 0) {
      console.log(
        `      ✓ Exposición total: COP ${contingencyMatrix.aggregate_exposure.toLocaleString("es-CO")}`
      );
      console.log(
        `      ✓ ${contingencyMatrix.contingency_matrix.length} empleados analizados`
      );
      contingencyMatrix.contingency_matrix.forEach((emp) => {
        console.log(
          `         - ${emp.employee_name}: COP ${emp.total_exposure.toLocaleString("es-CO")}`
        );
      });
    }

    // Paso 2: Análisis de alineamiento contractual
    console.log(`  2️⃣  Analizando alineamiento contractual...`);
    const contractualAnalysis = this.simulateContractualAnalysis();
    if (
      contractualAnalysis.alignment_analysis?.key_conflicts?.length > 0
    ) {
      console.log(
        `      ⚠️  ${contractualAnalysis.alignment_analysis.key_conflicts.length} conflictos identificados`
      );
      contractualAnalysis.alignment_analysis.key_conflicts.forEach((conflict) => {
        console.log(`         - ${conflict.substring(0, 70)}...`);
      });
    } else {
      console.log(`      ✓ Contratos alineados con estatutos`);
    }

    // Paso 3: Generar reporte ejecutivo
    console.log(`  3️⃣  Generando reporte ejecutivo...`);
    const report = await this.generateExecutiveReport(
      contingencyMatrix,
      contractualAnalysis
    );

    console.log(`\n${report.executive_summary}`);
    console.log(
      `\n🚨 ESTADO: ${report.requires_senior_review ? "Requiere validación de abogado senior" : "Listo"}\n`
    );

    return {
      contingency_matrix: contingencyMatrix,
      contractual_analysis: contractualAnalysis,
      executive_report: report,
      status: "ready_for_senior_review",
    };
  }
}

// Ejecutar demostración
if (require.main === module) {
  const agent = new ForensicAgentDemo();
  agent.processForensicCase().catch(console.error);
}

module.exports = ForensicAgentDemo;
