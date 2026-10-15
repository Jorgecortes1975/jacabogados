# Plan de Implementación: Automatización Jurídica Corporativa en 4 Fases + Social Listening

**Rama**: `claude/social-listening-legal-agents-6031yv` | **Fecha**: 2026-09-09 | **Specs**: [002-social-listening-legal-agents](../002-social-listening-legal-agents/spec.md), [003-automatizacion-juridica-4-fases](./spec.md)

**Entrada**: Especificaciones integradas de prospección quirúrgica corporativa (LinkedIn + redes sociales) → intake inteligente → dossier ejecutivo → análisis forense.

---

## Resumen Ejecutivo

JAC (Abogados Asociados, Medellín, 4 especialistas corporativos) automatiza la captación y gestión de clientes corporativos en 4 fases:

1. **Fase 1 (Social Listening)**: Detección autónoma de contingencias en X/Facebook/Instagram/TikTok + LinkedIn prospecting quirúrgica → Genera ganchos técnicos (sin lenguaje comercial) → DM privado con NDA
2. **Fase 2 (Intake Inteligente)**: Captura WhatsApp/formulario → Validación conflicto de interés → Triaje operativo (Prioridad Alta/Corporativo/Filtrado)
3. **Fase 3 (Dossier Ejecutivo)**: Extrae calendario → Genera perfil decisor + radiografía empresarial + vulnerabilidades sector + tesis conversación (verificables)
4. **Fase 4 (Análisis Forense)**: Procesa nóminas/contratos → Matrices contingencia laboral → Cálculos 100% citables contra CST/jurisprudencia → Reportes semanalizados

**Modelo de Honorarios**: Cuota Fija (proyectos corporativos), Cuota Liti (contingencia litigio), Retainer (asesoría mensual continua)

**Human-in-the-Loop**: Decisiones legales autónomas PROHIBIDAS. Abogado senior valida: conflictos, ganchos iniciales, dossiers, análisis forense, conceptos, propuestas de honorarios.

---

## Contexto Técnico

**Lenguaje/Versión**: Node.js 18+ (esyac con JavaScript/TypeScript moderno; alineado con `agente-juridico-especializado.js` existente)

**Dependencias Principales**:
- **Claude API** (Messages API con temperatura 0.2 para ganchos y análisis forense)
- **MCP Servers** (Legal Data Hunter, SUIN, Diario Oficial, jurisprudencia cortes)
- **APIs Sociales**: X (v2 Academic), Meta for Business (Facebook/Instagram), TikTok Ads API
- **LinkedIn**: Vendedor API (prospección quirúrgica) + web scraping verificado
- **WhatsApp**: Business API oficial (intake messaging)
- **Express.js** (backend web, intake forms, webhooks)
- **Playwright** (extracción de calendario, datos públicos)

**Almacenamiento**: PostgreSQL 15+ (auditoría inmutable, prospectos, conflictos, dossiers, cálculos forenses) + Redis (caché de validaciones, rate limiting)

**Testing**:
- Unit: Jest (lógica de detección, validación conflictos, cálculos de liquidación)
- Integration: Supertest (webhooks, intake, generación dossier)
- E2E: Playwright (flujos social listening → DM → conversión)
- Compliance: Tests de no-alucinación (verifica todas las citas contra fuentes oficiales)

**Plataforma Destino**: Linux server (AWS EC2 o similar, 24/7 uptime); CLI local para intake manual + análisis forense bajo demanda

**Tipo de Proyecto**: Web service + CLI + MCP aggregator (agente multi-canal que monitorea redes, gestiona intake, genera dossiers, calcula riesgos)

**Objetivos de Rendimiento**:
- Social listening: Monitoreo 4 plataformas en paralelo, <5min latencia detección→gancho publicado
- Intake: <30s respuesta automática + triage
- Dossier: <20min generación de expediente completo
- Análisis forense: Procesa nómina de 100 empleados en <10min

**Restricciones**:
- Cero datos de cliente en canales públicos (secreto profesional inviolable)
- Cero números inventados (100% citables contra CST/SUIN/jurisprudencia)
- 100% auditoría inmutable de cada acción (rastreabilidad legal)
- Temperatura 0.2 en todas las generaciones de texto (precisión sobre creatividad)
- Human-in-the-loop obligatorio en decisiones legales críticas

**Escala/Ámbito**:
- **Usuarios**: 1 equipo interno (4 abogados + 1 coordinador intake + 1 admin MCP)
- **Prospectos simultaneos**: 10-20 en pipeline de conversión activa
- **Volumen redes**: 50-100 menciones/día monitoradas, 5-10 convertidas a prospección activa
- **Clientes activos esperados**: 10-15 retainer, 5-10 proyectos fijos, 3-5 litigio contingencia simultáneos
- **Datos históricos**: 2 años auditoría legal (>5GB PostgreSQL)

## Verificación Constitucional

*GATE: Debe pasar antes de Phase 0 Research. Re-evaluar después de Phase 1 Design.*

| Principio | Verificación | Estado |
|-----------|--------------|--------|
| **I. Sin Alucinaciones** | Todos los ganchos (RF-004), dossiers (RF-007), cálculos forenses (RF-012) se generan con temperatura 0.2 + validación multi-fuente obligatoria. Ningún dato sin cita verificable. | ✅ CUMPLE |
| **II. Verificación Cruzada** | Contingencias detectadas (RF-003) validadas contra MÍNIMO 2 fuentes (SUIN + jurisprudencia O DIAN + decreto). Dossier usa solo datos públicos verificables. | ✅ CUMPLE |
| **III. Español Jurídico Colombiano** | Todos los mensajes (RF-004, RF-005, gancho técnico), reportes (Phase 4), documentos generados en español con terminología CST/SUIN/jurisprudencia colombiana. | ✅ CUMPLE |
| **IV. Trazabilidad** | Auditoría inmutable (RF-010, SC-11): Log de detección→gancho→DM→dossier→análisis. Cada acción con timestamp, usuario responsable, datos procesados. | ✅ CUMPLE |
| **V. Simplicidad** | Reutiliza `lexa-ecosystem.json` (6 agentes existentes), MCP config centralizada. No crea transportes o agents duplicados. | ✅ CUMPLE |

**Resultado Gate**: ✅ **PASA** - Ambas specs alineadas con constitución. Proceder a Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
