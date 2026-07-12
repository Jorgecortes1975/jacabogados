---
name: contratos-corporativos-col
version: "3.0"
tier: enterprise
description: >
  Revisión, redacción y negociación de contratos empresariales de alto valor. Cubre:
  contratos de empleo ejecutivo con acuerdos de retención/no-compete, contratos de
  prestación de servicios profesionales (abogados, consultores, agencias), contratos
  mercantiles (distribución, suministro, agencia, comisión), acuerdos de confidencialidad
  multinivel, términos de referencia, acuerdos de inversión, cláusulas de propiedad
  intelectual, garantías y responsabilidades. Entrega matriz de riesgos de alto impacto,
  redlines con justificación normativa, cláusulas alternativas, playbook de negociación.
  Actívala para: revisar contrato antes de firma, negociar términos con contraparte,
  validar laboralización encubierta, M&A contracts due diligence, redacción de términos
  complejos, análisis de cláusulas abusivas o leoninas.
license: MIT
compatibility: "Claude Code, Cowork, API Enterprise"
metadata:
  author: "Bufete Cortés Cartagena — LEXA-LAB Enterprise v3.0"
  locale: es-CO, en-US (bilingüe)
  tier_audience: "General Counsel, Chief Commercial Officer, Procurement Officer, Legal Operations"
  benchmark: "Latham & Watkins, Paul Hastings, White & Case M&A standard"
  regulatory_baseline: "CST, Código Civil, Código de Comercio, Ley 527/1999, Ley 1581/2012"
  integration_ecosystem: "playbook-contratos-col, demandas-civiles-col, jurisprudencia-col, anti-hallucination-v3"
---

# CONTRATOS CORPORATIVOS — NIVEL ENTERPRISE
## Revisión, Redacción, Negociación de Alto Impacto
### Bufete Cortés Cartagena — LEXA-LAB Enterprise v3.0

**Abogado Titular**: Jorge Ángel Cortés Cartagena — T.P. 365.594  
**Jurisdicciones**: Colombia (primary), Latinoamérica (secondary), multistate (tertiary)  
**Estándar de Producción**: International Top-Tier (BigLaw Level)  
**Modelo de Entrega**: Executive Summary + Risk Matrix + Redlines + Negotiation Playbook + Final Version

---

## VALOR CORPORATIVO

Este skill traduce "riesgo contractual" en "dinero que puede perderse" y "decisiones que no pueden fallar".

**Promesa:**
- Cláusula-by-cláusula: Qué riesgo, cuánto riesgo, cómo mitigarlo
- Redlines con justificación: "Change this because [norma X] says [thing Y], not what you wrote"
- Playbook de negociación: Trade-offs, límites, walk-away point
- Bloqueo de laboralización: Detectar relación laboral encubierta ANTES de firma
- Protección de IP: Asegurar que propiedad intelectual se cede o licencia correctamente
- Evaluación de impacto financiero: Contingencias, cláusulas de pago, terminación

---

## ACTIVACIÓN

✓ **Triggers Inmediatos:**
- Contrato crítico a revisar antes de firma (cualquier valor >$100k o plazo >12 meses)
- Renegociación: Contraparte propone cambios a términos existentes
- Laboralización: ¿Es contrato civil pero tiene características laborales?
- Confidencialidad: NDAs, acuerdos de no-compete, acuerdos de retención ejecutiva
- IP: Asignación de propiedad intelectual, licencias, confidencialidad de know-how
- Terminación anticipada: Cliente quiere salirse; contrato dice X; ¿qué impacto?
- M&A: Contracts due diligence, material contracts review
- Acuerdos multipartita: Contratos entre más de 2 partes, conflictos de interés

✓ **Triggers de Frecuencia:**
- Revisión trimestral: Contratos maduros, evaluación de renewal terms
- Benchmarking: Contrato de competidor; ¿cómo está más favorable?
- Reforma normativa: Ley 2466/2025 cambia reglas; ¿qué contratos necesitan ajuste?

---

## METODOLOGÍA: 4 FASES

### FASE 1 — INGESTA Y CLASIFICACIÓN (1-2 horas)

**Input:**
- Borrador (docx/pdf)
- Datos de partes (legal entities, domicilios, poder de firma)
- Contexto del negocio (qué se contrata, valor estimado, plazo, contrapartes)
- Cláusulas no negociables (lo que NO puede cambiar)
- Restricciones operacionales

**Output de Fase 1:**
- **Contract Classification**: Tipo legal (empleo ejecutivo / servicios profesionales / distribución / suministro / confidencialidad / IP assignment / etc.)
- **Risk Color**: 🔴 Crítico (cláusulas que rompen el negocio) / 🟠 Alto (riesgos significativos) / 🟡 Medio (ajustes recomendados) / 🟢 Bajo (issues formales)
- **Quick Flag List**: 3-5 riesgos jump-out (lo que debe cambiar sí o sí)

---

### FASE 2 — ANÁLISIS CLÁUSULA-BY-CLÁUSULA (3-6 horas)

**Ejecución por Secciones:**

1. **PARTES & RECITALES**
   - ¿Legal entities correctas? (Nombre, NIT, domicilio verificado)
   - ¿Capacidad de firma? (Quién tiene poder, vigencia de acto constitutivo)
   - ¿Recitales claros? (Antecedentes, finalidad, definiciones de términos)

2. **OBJETO**
   - ¿Descripción clara de qué se contrata?
   - ¿Ambigüedad en alcance? (Puede generar disputa)
   - ¿Obligaciones simétricas?

3. **CONSIDERACIÓN / PRECIO**
   - ¿Dinero definido o fórmula de cálculo?
   - ¿Forma de pago clara? (Anticipo/vencimiento, cuenta bancaria verificada)
   - ¿Condiciones de pago ajustadas a realidad operacional?
   - ¿Riesgo de insolvencia de contraparte?

4. **PLAZO**
   - ¿Inicio y terminación especificados?
   - ¿Renovación automática? (Riesgo: olvidar terminar)
   - ¿Preaviso requerido para no-renewal?

5. **OBLIGACIONES PRINCIPALES**
   - ¿Delivery/performance standards definidos?
   - ¿Métricas de cumplimiento?
   - ¿Remediación ante incumplimiento? (Cura, reparación, terminación)

6. **TERMINACIÓN**
   - 🚩 **ALERTA**: ¿Permitida terminación unilateral sin causa? → **RIESGO LABORAL CRÍTICO**
   - ¿Justa causa definida? (Insolvencia, incumplimiento material, cambio de control)
   - ¿Preaviso requerido? (Plazo de cure, plazo de notificación)
   - ¿Termination for convenience? (¿Quién paga terminación anticipada?)

7. **CONFIDENCIALIDAD**
   - ¿Duración de obligación de secreto?
   - ¿Excepciones? (Revelación obligatoria por ley, defensa legal, etc.)
   - ¿Impacto en know-how empresarial?

8. **PROPIEDAD INTELECTUAL**
   - 🚩 **ALERTA CRÍTICA**: ¿Quién es owner del código/contenido/desenvolvimiento?
   - ¿Se cede a empresa o licencia? (Cesión = ownership; licencia = derecho de uso)
   - ¿Fundador/contratista retiene derechos? (Riesgo de demanda posterior)
   - ¿Third-party IP identificada?

9. **RESPONSABILIDAD & GARANTÍAS**
   - ¿Garantías ofrecidas? (Calidad, no-infringement, conformidad)
   - ¿Exclusiones de responsabilidad? (Typical: consequential damages, lost profits)
   - ¿Capped liability?
   - ¿Duración de warranty period?

10. **RESOLUCIÓN DE DISPUTAS**
    - ¿Arbitraje o litigio?
    - ¿Qué jurisdicción? (Corte de Medellín, Bogotá, Nueva York, etc.)
    - ¿Mediation requerida antes de litigio?
    - ¿Renuncia de jury trial (si aplicable en jurisdicción)?

11. **LEY APLICABLE**
    - ¿Qué ley rige? (Colombian law, US law, etc.)
    - ¿Coherente con jurisdicción de disputas?

12. **CLÁUSULAS ESPECIALES**
    - No-compete: ¿Alcance razonable? (Tiempo, territorio, materia — Const. Art. 25, 333)
    - Confidentiality exceptions: ¿Employee puede defende en juicio? (Protección whistleblower)
    - Change of control: ¿Qué pasa si empresa es adquirida?
    - Indemnification: ¿Por qué se indemiza? ¿A quién? ¿Cuánto?

---

### FASE 3 — MATRIZ DE RIESGOS Y REDLINES (2-3 horas)

**Output:**

| Riesgo | Cláusula | Severidad | Norma Violada | Redline Propuesto | Trade-off |
|--------|----------|-----------|---------------|------------------|-----------|
| Laboralización | Terminación unilateral sin causa | 🔴 CRÍTICO | CST art. 58 | Cambiar a "por justa causa o con X días preaviso" | Contraparte pedirá extensión de plazo |
| IP no asignada | "Desarrollos futuros son de [Developer]" | 🔴 CRÍTICO | Decisión Andina 351 (derechos de autor) | "Todos los desarrollos se ceden a [Empresa]" con compensación | Aumentar fee al developer |
| Terminación por conveniencia | "Puedo terminar en cualquier momento" | 🟠 ALTO | CGP art. 58 (buena fe contractual) | "Terminación por conveniencia con X días preaviso + indemnización" | Costo de exit strategy |
| Cláusula penal leonina | "Incumplimiento = multa X (200% del contrato)" | 🟠 ALTO | Código Civil art. 2408 (moderación) | "Reducir a 20-30% del valor del contrato" | Contraparte asume más riesgo |
| Cobertura de seguros | "Contratista se asegura por cuenta propia" | 🟡 MEDIO | Ley de Seguros | "Empresa obtiene póliza; contratista reembolsa" | Costo de póliza |

---

### FASE 4 — PLAYBOOK DE NEGOCIACIÓN (1-2 horas)

**Estructura:**
1. **Walk-Away Points**: Qué NO puede cambiar (restricciones del cliente)
2. **Trad-offs**: Para cada redline, ¿qué está dispuesto el cliente a dar?
3. **Negotiation Strategy**: Presentar redlines por orden (críticos primero)
4. **Alternative Language**: Si contraparte rechaza propuesta, language #2, #3
5. **Escalation Path**: Si estancamiento, cuándo escalar a management

**Ejemplo:**

```
REDLINE #1 (CRÍTICO): Cambiar Terminación de "unilateral sin causa" a "por justa causa"

JUSTIFICACIÓN: CST art. 58 prohíbe terminación sin causa en relación laboral. 
Si contrato parece laboral (horario fijo, control, exclusividad), terminar sin causa = nulidad.

PROPUESTA 1: "Término definitivo: Este contrato termina el [fecha]. Renovación sujeta a acuerdo escrito de las partes."

SI RECHAZA: PROPUESTA 2: "Terminación por conveniencia: Cualquiera de las partes puede terminar con 30 días de preaviso escrito, + indemnización de 1 mes de servicios."

SI RECHAZA: PROPUESTA 3: Mantener "unilateral sin causa" pero: (a) reducir a 15 días preaviso, (b) agregar "máximo 2 veces/año", (c) cuantificar indemnización.

TRADE-OFF: Si contraparte cede en Terminación, nosotros cedemos en [Cláusula Y, que tiene menos riesgo].

WALK-AWAY: Si no aceptamos límites a Terminación, no firmamos (riesgo laboralización es inaceptable).
```

---

## ENTREGABLES ESTÁNDAR

### A. EXECUTIVE SUMMARY (2-3 páginas)

```
CONTRATO: [Descripción + Partes + Valor + Plazo]

RIESGO GENERAL: 🟠 ALTO
Razón: [3-5 riesgos principales — formato ejecutivo]

RECOMENDACIÓN: 
Procede a firma CON REDLINES siguientes:
1. [Redline crítico #1 — obligatorio]
2. [Redline crítico #2 — obligatorio]
3. [Redline alto #3 — recomendado]

Si contraparte no acepta redlines críticos: NO FIRMAR.

TIMELINE: Negociación estimada 5-7 días. Firma objetivo: [Fecha].
```

### B. MATRIX DE RIESGOS (Tabla completa — Cláusula-by-Cláusula)

### C. REDLINES CON JUSTIFICACIÓN NORMATIVA
- NOT: "Change this."
- YES: "Art. X de [Ley Y] requiere [cosa Z]. Tu redacción dice [cosa A]. Propongo: [cosa Z]."

**Formato:**
```
REDLINE [#]:
CLÁUSULA ORIGINAL: "[Texto actual del contrato]"
REDLINE PROPUESTO: "[Texto nuevo]"
JUSTIFICACIÓN: "CST art. 58 + jurisprudencia CC T-XXXX/YYYY exigen que..."
IMPACTO SI NO CAMBIA: "Riesgo de [consecuencia]; exposición estimada $X millones"
```

### D. PLAYBOOK DE NEGOCIACIÓN
- Walk-away points
- Propuestas 1/2/3 por cada redline
- Trade-offs posibles
- Timeline recomendado

### E. VERSIÓN LIMPIA (FINAL)
Una vez acuerdos alcanzados, versión lista para firma (con todos los cambios incorporados, sin track changes).

---

## CHECKLIST DE LABORALIZACIÓN — MATRIZ CRÍTICA

Si cliente dice "Es contrato de servicios, no relación laboral", OBLIGATORIO verificar 8 elementos:

| Elemento | Presente | Evidencia | Conclusión |
|----------|----------|-----------|-----------|
| Horario fijo | □ SÍ □ NO | [Contrato dice...] | |
| Lugar de trabajo determinado | □ SÍ □ NO | [Contrato dice...] | |
| Control directo sobre la actividad | □ SÍ □ NO | [Contrato dice...] | |
| Integración a estructura organizacional | □ SÍ □ NO | [Contrato dice...] | |
| Equipos/herramientas provistos por empresa | □ SÍ □ NO | [Contrato dice...] | |
| Recepción de órdenes y reportes jerárquicos | □ SÍ □ NO | [Contrato dice...] | |
| Exclusividad o dedicación preferente | □ SÍ □ NO | [Contrato dice...] | |
| Beneficios de seguridad social por empresa | □ SÍ □ NO | [Contrato dice...] | |

**RESULTADO:**
- ✓ ≥6 elementos = **RELACIÓN LABORAL EVIDENTE** → NO FIRMAR COMO CIVIL (riesgo crítico)
- ✓ 4-5 elementos = **RELACIÓN LABORAL PROBABLE** → Redlines laborales obligatorios
- ✓ <4 elementos = Civil/Comercial probable → Procede con precaución

**🚩 SI LABORALIZACIÓN EVIDENTE:** 
"ALERTA CRÍTICA: Este contrato tiene características de relación laboral (matriz 8/8). Si firmamos como servicios y fiscalía o demandante reclasifica, exponemos a: (1) Reclasificación retroactiva laboral, (2) Pago de aportes + intereses, (3) Multa a empresa, (4) Reconocimiento de vínculo laboral no querido. RECOMENDACIÓN: Redactar como contrato laboral O eliminar características que generan laboralización."

---

## PROTECCIÓN DE PROPIEDAD INTELECTUAL

### Matriz de Decisión: ¿Cesión o Licencia?

| Escenario | Tipo | Redacción | Impacto |
|-----------|------|-----------|--------|
| Desarrollador crea software para empresa | **CESIÓN TOTAL** | "Desarrollador cede TODOS los derechos de autor (software, documentación, know-how) a [Empresa]." | Empresa es owner; Desarrollador renuncia |
| Agencia de marketing genera contenido | **CESIÓN TOTAL** | "Todos los trabajos creativos (diseños, copys, estrategias) son propiedad de [Cliente]." | Cliente puede reutilizar; Agencia no |
| Consultor aporta metodología propia | **LICENCIA EXCLUSIVA** | "Consultor licencia derecho de usar su metodología exclusivamente a [Empresa] durante [plazo]. Retiene propiedad." | Empresa usa; Consultor sigue siendo dueño |
| Contratista usa third-party software | **NO-INFRINGEMENT + INDEMNITY** | "Contratista garantiza que nada viola derechos third-party. Si hay claim, Contratista indemiza a [Empresa]." | Empresa protegida contra reclamos |

---

## RESTRICCIONES OPERATIVAS

### 🚫 NUNCA
- Permitir terminación unilateral sin causa en contrato que tenga ≥6 elementos de laboralización
- Dejar propiedad intelectual ambigua ("Desarrollador retiene derechos de futuras mejoras" = disaster)
- Aceptar cláusulas que violen Constitución (no-compete sin límites de tiempo/territorio/materia)
- Omitir confidentiality sobre datos personales si hay tratamiento (GDPR, Ley 1581)
- Firmar contrato sin verificar poder de firma de contraparte
- Aceptar arbitraje internacional sin evaluar costos y complejidad

### ✓ SIEMPRE
- Anexar Certificado de Existencia de Contraparte (verificado)
- Incluir cláusula de Ley Aplicable alineada con Jurisdicción
- Definir explícitamente Propiedad Intelectual
- Incluir Confidentiality period con excepciones para defensa legal
- Especificar qué cláusulas sobreviven terminación (confidentialidad, no-compete, indemnity)
- Revisar y actualizar contratos evergreen (renovación automática)

---

## GARANTÍA DE CALIDAD

Antes de enviar a cliente:

☑ ¿Partes identificadas correctamente (legal names, NIT, domicilios)?  
☑ ¿Objeto claro (sin ambigüedad)?  
☑ ¿Consideración definida (dinero, fórmula, o favor)?  
☑ ¿Plazo especificado (inicio, terminación)?  
☑ ¿Obligaciones principales descritas?  
☑ ¿Terminación claramente regulada?  
☑ ¿Confidentiality y IP asignados?  
☑ ¿Matriz de 8 elementos completada (si hay dudas de laboralización)?  
☑ ¿Riesgos con semáforo y redlines justificados?  
☑ ¿Playbook de negociación listo?  
☑ ¿Revisor senior validó?  

**Si no: REGRESA A REVISIÓN.**

---

## DATOS FIJOS DE BUFETE

**Abogado Titular**: Jorge Ángel Cortés Cartagena — T.P. 365.594  
**Bufete**: Cortés Cartagena — Medellín, Antioquia  
**Autoridades**: Colegio de Abogados de Antioquia, CCM, CRC  
**Experiencia**: Contratos corporativos desde 1985; M&A, empleadores, startups, multinacionales

---

*LEXA-LAB Enterprise v3.0 — Bufete Cortés Cartagena*  
*Estándar BigLaw: Latham & Watkins, Paul Hastings, White & Case*  
*Medellín, Colombia — 2026*
