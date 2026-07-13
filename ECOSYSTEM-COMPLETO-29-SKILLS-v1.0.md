# ABOGADOS ASOCIADOS JAC — ECOSYSTEM COMPLETO 31 SKILLS
**Versión**: 1.1 (Actualizado) | **Fecha**: 13 de Julio, 2026  
**Responsable**: Jorge Ángel Cortés Cartagena, T.P. 365.594

---

## DESCRIPCIÓN GENERAL

Este documento compila la arquitectura completa del sistema de **31 agentes jurídicos especializados** para Abogados Asociados JAC, cada uno implementado con:

✅ **16-Component Protocolo JAC v1.0** (nombre, misión, alcance, asuntos, entrada, fuentes, tareas, formato, verificación, riesgos, errores prohibidos, criterio aprobación, responsable, entregable, cierre, integración)

✅ **Guardias Automáticas** (3-7 validaciones especializadas por skill)

✅ **ACTA de Control** (8-16 puntos verificables)

✅ **Test Suite** (8-17 casos de validación)

✅ **Estándar Universal v2.0** (61 items de cumplimiento)

✅ **Anti-Hallucination v4.2** (Matriz de Confianza: ALTA/MEDIA/BAJA)

✅ **Protocolo Alta Corte** (lenguaje magistral en all deliverables)

✅ **OSCOLA Citations** (formato jurisprudencia verificado)

✅ **FLUJO-INTEGRADO v1.0** (orquestación automática entre skills)

---

## DISTRIBUCIÓN POR CATEGORÍA

**Total: 31 Skills**
- Intake & Diagnóstico: 3
- Litigación & Procedimiento: 5
- Redacción & Calidad: 4
- Derecho Sustantivo: 14 ⭐ (incluyendo nuevas especialidades)
- Procedimientos Administrativos: 2
- Estrategia & Comunicación: 2
- Conocimiento & Datos: 2
- Sistema: 1

### CATEGORÍA A: INTAKE & DIAGNÓSTICO (3 Skills)

#### 1. **INTAKE-001: AGENTE RECEPCIÓN CLIENTE**
- **Misión**: Captura inicial de información del cliente
- **Entrada**: Cliente nuevo + problema legal
- **Salida**: `{EMPRESA}/01-INTAKE.md` (datos estructurados)
- **Guardias**: 4 (Confidencialidad, urgencia, legitimidad, conflicto interés)
- **ACTA**: 8 puntos

#### 2. **DIAGNOSTICO-002: AGENTE DIAGNÓSTICO**
- **Misión**: Análisis del problema contra normativa vigente
- **Entrada**: Información del cliente (INTAKE)
- **Salida**: `{EMPRESA}/02-DIAGNOSTICO.md` (hallazgos clasificados)
- **Guardias**: 4 (Normativa vigente, data quality, urgencia, riesgo)
- **ACTA**: 10 puntos

#### 3. **RECOMENDACIONES-003: AGENTE RECOMENDACIONES**
- **Misión**: Plan de acción y propuesta al cliente
- **Entrada**: Diagnóstico completado
- **Salida**: `{EMPRESA}/03-RECOMENDACIONES.md` (timeline, costo, alternativas)
- **Guardias**: 3 (Viabilidad, costo-beneficio, riesgo residual)
- **ACTA**: 8 puntos

---

### CATEGORÍA B: LITIGACIÓN & PROCEDIMIENTO (5 Skills)

#### 4. **PEN-027: ASESOR DERECHO PENAL** ⭐ NEW
- **Misión**: Defensa penal, tipificación delictiva, estrategia de defensa
- **Entrada**: Resolución de imputación / acusación fiscal
- **Salida**: `DEFENSA-PENAL-{ACUSADO}.md` + matrices + recurso
- **Guardias**: 7 (Imputación legal, prueba ilícita, medidas cautelares, prescripción)
- **ACTA**: 15 puntos
- **Test Suite**: 17 casos
- **Certificación**: ✅ PREMIUM si ≥14/15 + G1-G7

#### 5. **ALEGATOS-008: AGENTE ALEGATOS AUDIENCIA**
- **Misión**: Redacción de alegatos de apertura y cierre
- **Entrada**: Caso documentado + teoría del caso
- **Salida**: `ALEGATOS-{CASO}.docx` (magistrales, persuasivos)
- **Guardias**: 4 (Protocolo Alta Corte, coherencia, jurisprudencia, rigor)
- **ACTA**: 10 puntos

#### 6. **RECURSOS-007: ASESOR RECURSOS APELACIÓN**
- **Misión**: Recursos, reposición, apelación, casación
- **Entrada**: Sentencia/resolución desfavorable
- **Salida**: `ESCRITO-APELACIÓN.docx` + fundamentos jurídicos
- **Guardias**: 5 (Error identificado, plazo vigente, causal viável, jurisprudencia)
- **ACTA**: 11 puntos

#### 7. **INTERROGATORIO-009: ASESOR INTERROGATORIO**
- **Misión**: Estrategia de prueba, questioning, cross-examination
- **Entrada**: Caso en litigio + testigos identificados
- **Salida**: `PROTOCOLO-INTERROGATORIO.docx` + preguntas + strategy
- **Guardias**: 4 (Admisibilidad, relevancia, pericia testigo)
- **ACTA**: 9 puntos

#### 8. **ANALISIS-CASO-004: AGENTE ANÁLISIS DE CASO**
- **Misión**: Análisis integral de jurisprudencia y precedentes
- **Entrada**: Caso planteado
- **Salida**: `ANÁLISIS-JURISPRUDENCIA.md` + matriz precedentes
- **Guardias**: 3 (Citas verificables, aplicabilidad, vigencia)
- **ACTA**: 9 puntos

---

### CATEGORÍA C: REDACCIÓN & CALIDAD (4 Skills)

#### 9. **REDACTOR-010: REDACTOR PREMIUM**
- **Misión**: Redacción magistral multi-jurisdiccional
- **Entrada**: Draft + requerimientos estilo
- **Salida**: Documento final (Protocolo Alta Corte + OSCOLA)
- **Guardias**: 5 (Lenguaje magistral, coherencia, rigor, formato)
- **ACTA**: 12 puntos

#### 10. **AUDITOR-011: AUDITOR CALIDAD PRE-ENTREGA**
- **Misión**: Checklist de 16 puntos antes de enviar cliente
- **Entrada**: Documento completo
- **Salida**: ✅ APROBADO / ❌ RECHAZADO + correcciones
- **Guardias**: 4 (Integridad, legalidad, formato, confidencialidad)
- **ACTA**: 16 puntos

#### 11. **REDACCIÓN-INFORMES-005: AGENTE REDACCIÓN INFORMES JURÍDICOS**
- **Misión**: Informes especializados por área del derecho
- **Entrada**: Materia prima (análisis, matrices, recomendaciones)
- **Salida**: `INFORME-{TEMA}.md` o `.docx` (estructurado)
- **Guardias**: 3 (Estructura, claridad, verificación)
- **ACTA**: 8 puntos

#### 12. **EXPERIENCIA-018: AGENTE EXPERIENCIA CLIENTE**
- **Misión**: Traducción a lenguaje ejecutivo (cliente no abogado)
- **Entrada**: Documento jurídico complejo
- **Salida**: `COMUNICADO-CLIENTE.docx` (claro, accesible)
- **Guardias**: 3 (Lenguaje simple, implicaciones prácticas, próximos pasos)
- **ACTA**: 8 puntos

---

### CATEGORÍA D: DERECHO SUSTANTIVO — ESPECIALIDADES (12 Skills)

#### 13. **TAX-028: ASESOR DERECHO TRIBUTARIO** ⭐ NEW
- **Misión**: Impuestos, DIAN, liquidación, planificación fiscal
- **Entrada**: Requerimiento DIAN / declaración / consulta tributaria
- **Salida**: `ANÁLISIS-TRIBUTARIO-{EMPRESA}.md` + matrices
- **Guardias**: 7 (Régimen correcto, prescripción, retenciones, plazo recurso)
- **ACTA**: 16 puntos
- **Test Suite**: 15 casos
- **Certificación**: ✅ PREMIUM si ≥15/16 + G1-G7

#### 14. **ENV-029: ASESOR DERECHO AMBIENTAL** ⭐ NEW
- **Misión**: Licencias ambientales, impacto, cumplimiento, defensa
- **Entrada**: Proyecto / operación / acto ANLA
- **Salida**: `ANÁLISIS-AMBIENTAL-{EMPRESA}.md` + planes gestión
- **Guardias**: 7 (Categoría ambiental, monitoreo, plazo recurso, zona protegida)
- **ACTA**: 15 puntos
- **Test Suite**: 14 casos
- **Certificación**: ✅ PREMIUM si ≥14/15 + G1-G7

#### 15. **LABORAL-013: ASESOR DERECHO LABORAL & SEGURIDAD SOCIAL**
- **Misión**: Contratos, afiliaciones, prestaciones, conflictos
- **Entrada**: Contrato / reclamación / inconsistencia seguridad social
- **Salida**: `ANÁLISIS-LABORAL-{EMPRESA}.md` + templates contractuales
- **Guardias**: 5 (Normativa vigente, afiliación, aportes, formalización)
- **ACTA**: 12 puntos

#### 16. **CONTRACTUAL-012: ASESOR REDACCIÓN CONTRACTUAL**
- **Misión**: Revisión y redacción de contratos bajo derecho colombiano
- **Entrada**: Contrato existente / solicitud redacción
- **Salida**: `CONTRATO-{TIPO}-{FECHA}.docx` (revisado/redactado)
- **Guardias**: 5 (Clausulas críticas, riesgos, vigencia normativa)
- **ACTA**: 11 puntos

#### 17. **SOCIETARIO-014: ASESOR DERECHO SOCIETARIO & CORPORATIVO**
- **Misión**: Governance, accionistas, fusiones, escisiones, liquidaciones
- **Entrada**: Estructura societaria / operación propuesta
- **Salida**: `ANÁLISIS-SOCIETARIO-{EMPRESA}.md` + impacto tributario
- **Guardias**: 5 (Legalidad operación, impacto tributario, registro mercantil)
- **ACTA**: 12 puntos

#### 18. **FINANCIERO-015: ASESOR DERECHO FINANCIERO & BANCARIO**
- **Misión**: Créditos, garantías, títulos valores, cumplimiento IFRS
- **Entrada**: Operación financiera propuesta / contrato financiero
- **Salida**: `ANÁLISIS-FINANCIERO-{OPERACIÓN}.md` + estructura
- **Guardias**: 4 (Garantías legales, cumplimiento superintendencia, tasas)
- **ACTA**: 10 puntos

#### 19. **CONSTITUCIONAL-022: ASESOR DERECHOS CONSTITUCIONALES**
- **Misión**: Tutelas, acciones populares, derechos fundamentales
- **Entrada**: Violación presunta de derecho fundamental
- **Salida**: `DEMANDA-TUTELA.docx` o `ACCIÓN-POPULAR.docx`
- **Guardias**: 4 (Vulneración clara, legitimidad, oportunidad)
- **ACTA**: 10 puntos

#### 20. **SUCESIONES-023: ASESOR DERECHO DE SUCESIONES & FAMILIA**
- **Misión**: Herencias, testamentos, protección de menores, alimentos
- **Entrada**: Conflicto sucesorio / familia
- **Salida**: `ANÁLISIS-SUCESORIO-{CASO}.md` + recomendaciones
- **Guardias**: 4 (Testamento válido, legitimarios, orden sucesorio)
- **ACTA**: 10 puntos

#### 21. **COMPLIANCE-016: ASESOR CUMPLIMIENTO NORMATIVO**
- **Misión**: Auditoría integral de cumplimiento regulatorio
- **Entrada**: Empresa + áreas auditar
- **Salida**: `AUDITORÍA-COMPLIANCE-{EMPRESA}.md` + hallazgos + plan
- **Guardias**: 5 (Regulación vigente, gaps críticos, timeline)
- **ACTA**: 12 puntos

#### 22. **SUPERVISION-025: ASESOR SUPERVISIÓN BANCARIA & AML**
- **Misión**: Cumplimiento AML/KYC, reportes UIAF, prevención terrorismo
- **Entrada**: Empresa financiera / transacción sospechosa
- **Salida**: `AUDITORIA-AML-KYC-{EMPRESA}.md` + políticas + matriz riesgos
- **Guardias**: 3 (PPE, origen fondos, reportes a autoridades)
- **ACTA**: 8 puntos

#### 23. **INS-030: ASESOR DERECHO DE SEGUROS** ⭐ NEW
- **Misión**: Pólizas, reclamaciones, cobertura, negociación aseguradora
- **Entrada**: Póliza / reclamación siniestro / negativa aseguradora
- **Salida**: `ANÁLISIS-SEGUROS-{ASEGURADO}.md` + matrices + defensa
- **Guardias**: 6 (Siniestro notificado, plazo caducidad, póliza vigente, límites)
- **ACTA**: 14 puntos
- **Test Suite**: 14 casos
- **Certificación**: ✅ PREMIUM si ≥13/14 + G1-G6

#### 24. **TRX-031: ASESOR DERECHO DE TRÁNSITO** ⭐ NEW
- **Misión**: Infracciones, retención vehículos, accidentes, licencias
- **Entrada**: Acta infracción / retención / accidente / DUI
- **Salida**: `ANÁLISIS-TRÁNSITO-{CASO}.md` + escrito impugnación
- **Guardias**: 7 (Plazo recurso, vicios acta, retención ilegal, DUI, licencia)
- **ACTA**: 14 puntos
- **Test Suite**: 13 casos
- **Certificación**: ✅ PREMIUM si ≥13/14 + G1-G7

---

### CATEGORÍA E: PROCEDIMIENTOS ADMINISTRATIVOS (2 Skills)

#### 25. **DERECHOS-PETICION-020: ASESOR DERECHOS DE PETICIÓN**
- **Misión**: Derechos de petición, acceso a información, recursos ante entidades públicas
- **Entrada**: Acto administrativo / negativa información
- **Salida**: `DERECHO-PETICIÓN-{ENTIDAD}.docx` + recurso si procede
- **Guardias**: 4 (Legitimidad, plazo, competencia entidad)
- **ACTA**: 9 puntos

#### 26. **CONCILIACION-021: ASESOR CONCILIACIÓN & MEDIACIÓN**
- **Misión**: Estrategia conciliación, negoción, mediación prejudicial
- **Entrada**: Conflicto en fase prejuicio
- **Salida**: `ESTRATEGIA-CONCILIACIÓN.md` + acta conciliación
- **Guardias**: 3 (Viabilidad, buena fe, legalidad acuerdo)
- **ACTA**: 9 puntos

---

### CATEGORÍA F: ESTRATEGIA & COMUNICACIÓN (2 Skills)

#### 27. **REPUTACION-024: ASESOR REPUTACIÓN & CRISIS**
- **Misión**: Gestión de crisis reputacional, comunicados, stakeholders
- **Entrada**: Crisis identificada
- **Salida**: `PLAN-CRISIS-{TEMA}.md` + comunicados pre-redactados
- **Guardias**: 3 (Comunicado responsable, riesgos legales, timeline respuesta)
- **ACTA**: 8 puntos

#### 28. **COMERCIAL-017: AGENTE COMERCIAL & COMUNICACIÓN**
- **Misión**: Artículos blog, guías legales, análisis tendencias, SEO
- **Entrada**: Tema jurídico relevante
- **Salida**: `ARTICULO-{TEMA}.md` + versión web + LinkedIn
- **Guardias**: 3 (Rigor jurídico, citas verificadas, recomendaciones accionables)
- **ACTA**: 8 puntos

---

### CATEGORÍA G: CONOCIMIENTO & DATOS (2 Skills)

#### 29. **CONOCIMIENTO-019: ASESOR CONOCIMIENTO INTERNO**
- **Misión**: Documentación de casos de éxito, argumentos validados, templates reutilizables
- **Entrada**: Caso cerrado exitoso
- **Salida**: `CASO-EXITO-{TEMA}.md` + template + jurisprudencia
- **Guardias**: 3 (Desidentificación datos, generalización argumentos, templates)
- **ACTA**: 8 puntos

#### 30. **LEXIUS-026: CONSULTOR LEGAL LEXIUS (Acceso Base Datos)**
- **Misión**: Acceso a appcolombia.lexius.io para consultas jurídicas verificadas
- **Entrada**: Query de normativa/jurisprudencia/análisis
- **Salida**: Resultado verificado + Matriz Confianza + cita OSCOLA
- **Guardias**: 7 (Autenticación, vigencia, matriz confianza, lenguaje Alta Corte)
- **ACTA**: 15 puntos
- **Test Suite**: 17 casos
- **Certificación**: ✅ PREMIUM si ≥14/15
- **Seguridad**: Credenciales vía env variables (NUNCA hardcoded)

---

### CATEGORÍA H: SISTEMA (1 Skill)

#### 31. **ANTI-HALLUCINATION-004: GUARDIÁN ANTI-ALUCINACIÓN v4.2**
- **Misión**: Validar que TODA afirmación legal sea verificable
- **Entrada**: Cualquier documento jurídico producido
- **Salida**: ✅ VERIFICADO / ❌ RECHAZO + correcciones
- **Guardias**: 4 (100% verificabilidad, citas OSCOLA, matriz confianza, lenguaje)
- **ACTA**: 10 puntos
- **Validación**: Debe correr en TODOS los documentos antes entrega cliente

---

## MATRIZ DE REFERENCIA: SKILLS POR PROBLEMA TIPO

### Problema: Acusación Penal
**Flujo Recomendado**: INTAKE-001 → DIAGNOSTICO-002 → PEN-027 → ALEGATOS-008 → RECURSOS-007 → AUDITOR-011

### Problema: Operación Tributaria / Requerimiento DIAN
**Flujo Recomendado**: INTAKE-001 → DIAGNOSTICO-002 → TAX-028 → REDACTOR-010 → AUDITOR-011

### Problema: Licencia Ambiental / Acto ANLA
**Flujo Recomendado**: INTAKE-001 → DIAGNOSTICO-002 → ENV-029 → REDACTOR-010 → AUDITOR-011

### Problema: Contrato Laboral / Conflicto Trabajo
**Flujo Recomendado**: INTAKE-001 → DIAGNOSTICO-002 → LABORAL-013 → CONTRACTUAL-012 → AUDITOR-011

### Problema: Litigio Comercial / Deuda
**Flujo Recomendado**: INTAKE-001 → DIAGNOSTICO-002 → ANÁLISIS-CASO-004 → INTERROGATORIO-009 → ALEGATOS-008 → RECURSOS-007

### Problema: Fusión / Reestructuración Societaria
**Flujo Recomendado**: INTAKE-001 → SOCIETARIO-014 → TAX-028 → REDACTOR-010 → AUDITOR-011

### Problema: Crédito / Operación Financiera
**Flujo Recomendado**: INTAKE-001 → FINANCIERO-015 → CONTRACTUAL-012 → SUPERVISION-025 (si es bancaria)

### Problema: Tutela / Derechos Fundamentales
**Flujo Recomendado**: INTAKE-001 → DIAGNOSTICO-002 → CONSTITUCIONAL-022 → REDACTOR-010 → AUDITOR-011

### Problema: Crisis Reputacional
**Flujo Recomendado**: INTAKE-001 → REPUTACION-024 → EXPERIENCIA-018 → REDACTOR-010

### Problema: Consulta General sobre Normativa
**Flujo Recomendado**: LEXIUS-026 (búsqueda base datos) → CONOCIMIENTO-019 (documentar resultado)

---

## TABLA RESUMEN: 31 SKILLS COMPLETOS

| # | Código | Nombre | Categoría | Guardias | ACTA | Test | Premium |
|----|--------|--------|-----------|----------|------|------|---------|
| 1 | INTAKE-001 | Recepción Cliente | Intake | 4 | 8 | 8 | Si 7/8 |
| 2 | DIAG-002 | Diagnóstico | Intake | 4 | 10 | 10 | Si 8/10 |
| 3 | REC-003 | Recomendaciones | Intake | 3 | 8 | 8 | Si 7/8 |
| 4 | PEN-027 | Derecho Penal ⭐ | Litig. | 7 | 15 | 17 | Si ≥14/15 |
| 5 | ALE-008 | Alegatos | Litig. | 4 | 10 | 12 | Si 8/10 |
| 6 | REC-007 | Recursos Apelación | Litig. | 5 | 11 | 13 | Si 9/11 |
| 7 | INT-009 | Interrogatorio | Litig. | 4 | 9 | 11 | Si 7/9 |
| 8 | ANA-004 | Análisis Caso | Litig. | 3 | 9 | 9 | Si 7/9 |
| 9 | RED-010 | Redactor Premium | Calidad | 5 | 12 | 14 | Si 10/12 |
| 10 | AUD-011 | Auditor Calidad | Calidad | 4 | 16 | 16 | Si ≥14/16 |
| 11 | RED-005 | Redacción Informes | Calidad | 3 | 8 | 8 | Si 7/8 |
| 12 | EXP-018 | Experiencia Cliente | Calidad | 3 | 8 | 8 | Si 7/8 |
| 13 | TAX-028 | Derecho Tributario ⭐ | Sustantivo | 7 | 16 | 15 | Si ≥15/16 |
| 14 | ENV-029 | Derecho Ambiental ⭐ | Sustantivo | 7 | 15 | 14 | Si ≥14/15 |
| 15 | LAB-013 | Derecho Laboral | Sustantivo | 5 | 12 | 12 | Si 10/12 |
| 16 | CON-012 | Redacción Contractual | Sustantivo | 5 | 11 | 11 | Si 9/11 |
| 17 | SOC-014 | Derecho Societario | Sustantivo | 5 | 12 | 12 | Si 10/12 |
| 18 | FIN-015 | Derecho Financiero | Sustantivo | 4 | 10 | 10 | Si 8/10 |
| 19 | COS-022 | Derechos Constitucionales | Sustantivo | 4 | 10 | 10 | Si 8/10 |
| 20 | SUC-023 | Derecho Sucesiones | Sustantivo | 4 | 10 | 10 | Si 8/10 |
| 21 | CUM-016 | Compliance | Sustantivo | 5 | 12 | 12 | Si 10/12 |
| 22 | SUP-025 | Supervisión Bancaria | Sustantivo | 3 | 8 | 8 | Si 7/8 |
| 23 | INS-030 | Derecho de Seguros ⭐ | Sustantivo | 6 | 14 | 14 | Si ≥13/14 |
| 24 | TRX-031 | Derecho de Tránsito ⭐ | Sustantivo | 7 | 14 | 13 | Si ≥13/14 |
| 25 | DPE-020 | Derechos Petición | Admin. | 4 | 9 | 9 | Si 7/9 |
| 26 | CON-021 | Conciliación | Admin. | 3 | 9 | 9 | Si 7/9 |
| 27 | REP-024 | Reputación Crisis | Comun. | 3 | 8 | 8 | Si 7/8 |
| 28 | COM-017 | Comercial/Blog | Comun. | 3 | 8 | 8 | Si 7/8 |
| 29 | CON-019 | Conocimiento Interno | Conocim. | 3 | 8 | 8 | Si 7/8 |
| 30 | LEX-026 | Consultor Lexius | Datos | 7 | 15 | 17 | Si ≥14/15 |
| 31 | AHV4-004 | Anti-Hallucination v4.2 | Sistema | 4 | 10 | 10 | Si 8/10 |

---

## ARQUITECTURA DE FLUJO INTEGRADO v1.0

El sistema funciona mediante **orquestación automática**: cada skill sabe:
1. **De quién recibe** (entrada de qué otro skill)
2. **A quién envía** (salida para qué otro skill)
3. **Qué validar** (Guardias especializadas)
4. **Cuándo escalar** (a especialista humano)

**Ejemplo de flujo**: Acusación Penal
```
Cliente llega → INTAKE-001 (captura)
            ↓
            DIAGNOSTICO-002 (análisis urgencia)
            ↓
            PEN-027 (análisis imputación + estrategia)
            ↓
            ALEGATOS-008 (redacción alegatos)
            ↓
            REDACTOR-010 (validación estilo magistral)
            ↓
            AUDITOR-011 (16-point checklist)
            ↓
            CLIENTE → Informe + Estrategia + Documentos
```

Cada transición tiene:
- ✅ Validación de entrada (datos completos)
- ✅ Guardias automáticas (no pasar si hay crítico)
- ✅ Matriz de confianza (ALTA/MEDIA/BAJA en cada cita)
- ✅ OSCOLA citations (formato jurisprudencia verificado)
- ✅ Protocolo Alta Corte (lenguaje magistral)

---

## MATRIZ DE CONFIANZA (Anti-Hallucination v4.2)

**CONFIANZA ALTA**: 
- Norma vigente (Código, Ley, Decreto)
- Jurisprudencia Corte Suprema/Constitucional <2 años
- Máximo score verificación

**CONFIANZA MEDIA**:
- Jurisprudencia Juzgados <5 años
- Interpretaciones Concepto DIAN/MADS
- Requiere validación en contexto

**CONFIANZA BAJA**:
- Jurisprudencia >5 años
- Norma en reforma/debate
- Interpretación personal
- REQUIERE validación humana antes usar

---

## CICLO DE VIDA DE CADA SKILL

1. **INTAKE**: Cliente proporciona información
2. **ANÁLISIS**: Skill aplica normativa + jurisprudencia
3. **MATRIZ/DOCUMENTO**: Genera deliverable
4. **GUARDIAS**: Valida automaticamente
5. **ANTI-HALLUCINATION**: Verifica TODA cita
6. **AUDITOR**: 16-point checklist
7. **REDACTOR**: Pulimento lenguaje
8. **CLIENTE**: Entregable final
9. **CONOCIMIENTO**: Documenta lecciones → CON-019

---

## ESTÁNDARES APLICABLES A TODOS LOS SKILLS

### 1. Protocolo Alta Corte
Todo documento entregado a cliente/juez/entidad debe usar lenguaje magistral.

### 2. OSCOLA Citations
Toda cita jurisprudencial en formato: "Sentencia XYZ, Corte ABC, Sala DEF, Fecha".

### 3. Matriz de Confianza
Cada cita legal marcada como ALTA/MEDIA/BAJA.

### 4. Anti-Hallucination v4.2
100% de afirmaciones jurídicas verificables en fuente confiable.

### 5. Estándar Universal v2.0
61 items de cumplimiento aplicables según categoría.

### 6. Revisión Humana Obligatoria
Ningún documento sale sin firma del abogado responsable.

### 7. Trazabilidad Completa
Toda actuación documentada, con responsable, fecha, versión.

---

## RESPONSABLES POR ÁREA (SUGERIDO)

| Área | Skills | Responsable Sugerido |
|------|--------|----------------------|
| Penal | PEN-027 | Especialista Penal (≥5 años) |
| Tributario | TAX-028 | Abogado + CPA Fiscal |
| Ambiental | ENV-029 | Abogado + Ingeniero Ambiental |
| Laboral | LAB-013 | Especialista Laboral (≥5 años) |
| Civil/Comercial | CONTRACTUAL, SOCIETARIO, FINANCIERO | Abogado Civil/Corporativo |
| Constitucional | COS-022, PEN-027 (habeas corpus) | Especialista Derechos |
| Litigación | ALE-008, REC-007, INT-009 | Abogado Litigante (≥7 años) |
| Compliance | CUM-016, SUP-025 | Especialista Compliance |
| Datos | LEXIUS-026 | Investigador Jurídico |
| Calidad | AUD-011, RED-010 | Senior Redactor |

---

## PRÓXIMOS PASOS IMPLEMENTACIÓN

1. ✅ **31 Skills creados** (v1.0 completada — incluyendo Penal, Tributario, Ambiental, Seguros, Tránsito)
2. ✅ **Protocolo maestro documentado** (16-component)
3. ✅ **Guardias + ACTA + Test Suite** (especificado cada skill)
4. ⏳ **Capacitación abogados** (cómo usar cada skill)
5. ⏳ **Pruebas piloto** (2-3 casos por skill)
6. ⏳ **Ajustes basados en uso real**
7. ⏳ **Documentación de casos** → CON-019 (conocimiento interno)
8. ⏳ **Revisión anual** (normativa vigente, jurisprudencia nueva)

---

## GARANTÍAS DE CALIDAD

Cada skill entregado:
- ✅ Cumple 16-component protocolo
- ✅ Pasa Guardias automáticas (3-7)
- ✅ Completa ACTA de control (8-16 puntos)
- ✅ Valida Test Suite (8-17 casos)
- ✅ Matriz de confianza 100% ALTA/MEDIA/BAJA
- ✅ OSCOLA citations verificadas
- ✅ Protocolo Alta Corte en lenguaje
- ✅ Anti-Hallucination v4.2 aprobado
- ✅ Auditor de calidad checklist ✅
- ✅ Revisión firma abogado especialista

---

**Certificación**: El sistema completo de 29 skills está certificado **PREMIUM** cuando ≥80% de capacidades activas pasan validación integral.

---

**Firma Responsable**:  
Jorge Ángel Cortés Cartagena  
T.P. 365.594  
Abogados Asociados JAC  
Medellín, Antioquia, Colombia

**Fecha**: 13 de Julio de 2026  
**Versión**: 1.0 — Completo  
**Estado**: ✅ PRODUCTIVO

