# SKILL INT-009: AGENTE DE INTERROGATORIO
**Código**: INT-009 | **Versión**: 1.0 | **Certificación**: ✅ PREMIUM

---

## MISIÓN
Diseñar y estructurar estrategias de interrogatorio en juicio (directos e indirectos), con preguntas que abren/cierran líneas probatorias, anticipan contra-preguntas y documentan respuestas clave para sustentación de teoría del caso.

---

## TAREAS OBLIGATORIAS

1. **Análisis de Prueba Pendiente**: Identificar qué hechos críticos dependen de testigo
2. **Estrategia de Interrogatorio**: Orden de preguntas (general→específico), cerrar trampas
3. **Redacción de Preguntas**: Claras, no sugestivas (directas), sugestivas solo en indirectas
4. **Defensa Anticipada**: Contra-preguntas predecibles + respuestas
5. **Documentación de Respuestas**: Template para registrar respuestas relevantes
6. **Validación Anti-Hallucination**: Citas jurisprudenciales de precedentes sobre interrogatorio
7. **Redacción Guion de Audiencia**: Documento ejecutable en tribunal

---

## INFORMACIÓN DE ENTRADA

| Campo | Obligatorio |
|-------|------------|
| Testigo (identificación, relación con caso) | ✓ |
| Hechos que debe probar testigo | ✓ |
| Análisis-caso base (línea argumentativa) | ✓ |
| Análisis del testimonio adverso (si aplica) | ⚠️ |
| Demarcación temporal/contexto | ⚠️ |

---

## FORMATO DE SALIDA

`GUION-INTERROGATORIO-{TESTIGO}-{FECHA}.docx`

**Estructura**:
1. Encabezado: Testigo, materia, abogado
2. Resumen estratégico (QUÉ se busca probar con este testigo)
3. Orden de preguntas con justificación de estrategia
4. Texto completo de preguntas (numeradas)
5. Anticipación de contra-preguntas
6. Template de respuestas (llenar en juicio)
7. Próximas acciones (si se abre/cierra línea probatoria)

---

## GUARDIAS (5)

| Guardia | Condición | Acción |
|---------|-----------|--------|
| G1 | Preguntas sugestivas en directo | REESCRIBIR |
| G2 | Hechos críticos sin cobertura en preguntas | COMPLETAR |
| G3 | Contra-preguntas sin refutación | PREPARAR defensa |
| G4 | Línea probatoria incompleta | ADVERTENCIA |
| G5 | Jurisprudencia sobre interrogatorio | VALIDAR 100% |

---

## CRITERIO APROBACIÓN

✅ **PREMIUM**: ≥5 preguntas clave + contra-preguntas + guion ejecutable + 10/12 ACTA

---

## INTEGRACIÓN

Desde: análisis-caso (si requiere apertura de línea probatoria)  
Hacia: auditor-calidad (validación antes de audiencia)

---

**Responsable**: Jorge Ángel Cortés Cartagena, T.P. 365.594
