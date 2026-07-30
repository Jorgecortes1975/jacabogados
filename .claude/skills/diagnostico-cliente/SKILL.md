---
name: diagnostico-cliente
description: >
  Skill operativo AUTOMÁTICO para diagnóstico exhaustivo de incumplimientos normativos
  basado en documentos del mandante. Se ejecuta AUTOMÁTICAMENTE cuando mandante aporta
  nómina, contratos, constancias de afiliación, o reporte SUI. Analiza contra normativa
  vigente (CST, Ley 100, Decreto 1072) + análisis multi-jurisdiccional (Colombia vs
  Common Law vs Civil Law). Identifica incumplimientos en 3 categorías (CRÍTICO/MODERADO/BAJO).
  Genera archivo 02-DIAGNOSTICO.md conforme Alta Corte. Validación 100% citas vía anti-hallucination-v4.
  
  CARACTERÍSTICAS GARANTIZADAS:
  — Activación: AUTOMÁTICA (sin solicitud explícita)
  — Guardias: 5 filtros especializados contra documentos incompletos o inconsistentes
  — Rechazo: INMEDIATO si documentación crítica falta
  — Acta de control: OBLIGATORIA con 15 puntos de validación específicos
  — Certificación: ✅ PREMIUM / ⚠️ PROFESIONAL / 🟠 REQUIERE REVISIÓN / 🔴 NO CONFORME / 🚫 RECHAZADO
  — Validación: 100% citas verificadas con anti-hallucination-v4
  — Análisis: Multi-jurisdiccional (Colombia + Common Law + Civil Law)
  — Nivel: Conforme a Estándar Universal v2.0 + Protocolo Alta Corte
---

# DIAGNÓSTICO CLIENTE v2.1
## Análisis Exhaustivo de Incumplimientos Normativos — Nivel Alta Corte

**Autor**: Jorge Ángel Cortés Cartagena — T.P. 365.594  
**Versión**: 2.1 — Julio 2026 — Conforme a Estándar Universal v2.0  
**Naturaleza**: Skill EJECUTORA AUTOMÁTICA para análisis normativo con validación Alta Corte  
**Estatus**: Mejorado a nivel PREMIUM con análisis multi-jurisdiccional

---

## PROPÓSITO

Ejecutar diagnóstico jurídico exhaustivo de incumplimientos normativos en documentos del mandante contra:
- **Normativa vigente colombiana**: CST, Ley 100, Decreto 1072, Ley 2288/2023 (reforma pensional)
- **Estándares internacionales**: Análisis comparativo con Common Law (EE.UU., UK) y Civil Law (Europa)
- **Rigor magistral**: Toda cita verificada con anti-hallucination-v4, clasificación de riesgo exhaustiva

Identificar incumplimientos en 3 categorías de urgencia (CRÍTICO < 30 días, MODERADO 30-90 días, BAJO > 90 días). Generar 02-DIAGNOSTICO.md con análisis por área, hallazgos detallados con normalización, análisis multi-jurisdiccional, y estimación de riesgos cuantificados.

**Protocolo obligatorio**: 
- Todo diagnóstico DEBE basarse ÚNICAMENTE en normativa vigente oficial
- Cada cita de norma DEBE ser verificada (ley, artículo, vigencia)
- Análisis multi-jurisdiccional OBLIGATORIO para contexto internacional
- Validación 100% de citas con anti-hallucination-v4 antes de certificación ✅ PREMIUM

---

## ACTIVACIÓN — Automática y Obligatoria

Este skill se ejecuta **AUTOMÁTICAMENTE cada vez que**:
1. Cliente aporta nómina (últimos 2 meses)
2. Cliente aporta contratos vigentes
3. Cliente aporta constancias de afiliación (EPS/AFP/ARL/Caja)
4. Cliente aporta reporte SUI
5. Usuario dice "analiza esto" refiriéndose a documentos laborales

NO requiere activación explícita.

---

## OPERACIONES EN SECUENCIA OBLIGATORIA

1. **PASO 1 — RECEPCIÓN**: Identifica documentos aportados
2. **PASO 2 — VALIDACIÓN FORMAL**: Verifica que documentos sean legibles y completos
3. **PASO 3 — ANÁLISIS NÓMINA**: Revisa salarios, descuentos, auxilio transporte contra normativa
4. **PASO 4 — ANÁLISIS CONTRATOS**: Revisa tipo, plazo, cláusulas contra CST Art. 37-48
5. **PASO 5 — ANÁLISIS AFILIACIONES**: Verifica EPS, AFP, ARL, Caja contra Ley 100, Art. 200-203 CST
6. **PASO 6 — CLASIFICACIÓN**: Agrupa hallazgos en CRÍTICO/MODERADO/BAJO
7. **PASO 7 — GENERACIÓN**: Crea 02-DIAGNOSTICO.md
8. **PASO 8 — ACTA DE CONTROL**: Emite acta con hallazgos

---

## GUARDIAS AUTOMÁTICAS — Detención Inmediata

### GUARDIA 1: Documentación de nómina faltante o inauténtica
**CONDICIÓN**: Sin nómina (últimos 2 meses) O nómina no se puede leer (imagen borrosa, PDF corrupto, formato no soportado)

**ACCIÓN INMEDIATA**:
```
🚫 RECHAZO — GUARDIA 1
Vicio detectado: Documentación de nómina indispensable y no disponible/ilegible
Motivo: Sin documento base no se puede analizar salarios, aportes, descuentos
Riesgo legal: Diagnóstico sin nómina = análisis incompleto e inadecuado
Qué se requiere: Nómina clara (últimos 2 meses) en Excel, PDF legible o formato electrónico
Validación: Debe ser de sistema de nómina (SAP, Nomina RRHH, etc.), no fotografía manual
Estado: DIAGNÓSTICO BLOQUEADO hasta obtener documento
Certificación: 🚫 RECHAZADO (no puede procederse sin documento base)
```

### GUARDIA 2: Contratos laborales faltantes o ambiguos
**CONDICIÓN**: Empresa con empleados pero sin aportar contratos de trabajo, O contratos no especifican tipo/plazo/salario

**ACCIÓN INMEDIATA**:
```
🚫 RECHAZO — GUARDIA 2
Vicio detectado: Documentación de contratos laborales indispensable y no disponible
Motivo: Sin contratos no se puede validar tipo (indefinido/fijo/obra/aprendizaje), plazo, términos contra CST Art. 37-48
Riesgo legal: Contratos ambiguos pueden violar garantías mínimas de estabilidad (Ley 789/2002)
Qué se requiere: Copias de contratos vigentes (mínimo 2 ejemplos, o 1 de cada tipo si hay variedad)
Validación: Debe incluir: Fecha, partes, tipo de contrato, duración, salario, cargo
Estado: DIAGNÓSTICO BLOQUEADO hasta obtener documentos
Certificación: 🚫 RECHAZADO (análisis de legalidad imposible sin contratos)
```

### GUARDIA 3: Inconsistencia entre nómina y afiliaciones (diferencia ≥20%)
**CONDICIÓN**: Nómina muestra [n empleados] pero constancias de afiliación muestran [m empleados] con divergencia > 20%

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 3
Vicio detectado: Inconsistencia crítica entre nómina y constancias de afiliación
Hallazgo: [n empleados en nómina] vs [m en constancias de EPS/AFP/ARL]
Razón: Discrepancia sugiere incumplimiento de afiliación (Art. 200-203 CST, Ley 100)
Normalización: Se marca como [INCUMPLIMIENTO CRÍTICO — Afiliación] en diagnóstico
Nota: Requiere validación inmediata con mandante: ¿[n-m] empleados sin afiliación activa?
Acción requerida: Cliente debe aclarar antes de certificación ✅ PREMIUM
Certificación: 🔴 NO CONFORME (hasta aclarar inconsistencia)
```

### GUARDIA 4: Constancias de seguridad social sin verificación de vigencia
**CONDICIÓN**: Constancias de EPS/AFP/ARL sin fecha de vigencia clara, O fechas anteriores a período de análisis

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 4
Vicio detectado: Documento de afiliación sin verificación de vigencia actual
Problema: Constancia desactualizada (ej: constancia de Feb 2026 pero se analiza Jul 2026)
Razón: No se puede validar si afiliación sigue vigente, cambios de EPS/AFP no documentados
Normalización: Se marca como [No verificado — Vigencia pendiente] en diagnóstico
Acción requerida: Se solicita constancia actualizada (< 30 días)
Validación anti-alucinación: Confirmar con Legal Data Hunter vigencia de cotizante
Certificación: ⚠️ PROFESIONAL (subsanar: validar vigencia de afiliaciones)
```

### GUARDIA 5: Errores aritméticos en nómina (≥2 errores en aportes/descuentos)
**CONDICIÓN**: Múltiples cálculos incorrectos detectados (ej: aporte EPS calculado incorrectamente, AFP mal descontada, etc.)

**ACCIÓN INMEDIATA**:
```
🟠 CORRECCIÓN ACTIVA — GUARDIA 5
Vicio detectado: Errores aritméticos críticos en cálculo de aportes y descuentos
Hallazgos: [lista específica de errores: "Aporte EPS debería ser $XXX, se registró $YYY", etc.]
Razón: Errores en nómina pueden indicar incumplimiento inadvertido en aportes/deducciones
Impacto legal: Aportes incorrectos violan Ley 100 Art. 200, pueden resultar en multas (UVT $3.181)
Normalización: Se marca como [INCUMPLIMIENTO MODERADO — Errores de nómina] con cálculos corregidos
Acción requerida: Corrección inmediata de nómina + ajuste de aportes retroactivos
Certificación: 🟠 REQUIERE REVISIÓN (subsanar cálculos antes de ✅ PREMIUM)
```

---

## MATRIZ DE INCUMPLIMIENTOS NORMATIVOS POR URGENCIA

| Urgencia | Plazo Remediación | Ejemplos de Incumplimientos |
|----------|---|---|
| 🔴 CRÍTICO | < 30 días | Empleados sin afiliación a EPS/AFP/ARL (Art. 200 CST); omisión de cotización a seguridad social; violación de decreto vigente; inspección de MinTrabajo activa |
| 🟡 MODERADO | 30-90 días | Errores aritméticos en cálculo de aportes; contratos sin cláusulas legales obligatorias; retraso en pago/remesa de cotizaciones; discriminación en trato |
| 🟢 BAJO | > 90 días | Optimización de cobertura en fondos de pensión; reglamento interno de trabajo desactualizado; política de acoso laboral (Ley 1010) sin implementar; capacitación obligatoria pendiente |

---

## CERTIFICACIÓN FINAL

El skill emite **UNA SOLA** certificación (mutualmente excluyentes):

| Símbolo | Certificación | Criterio Específico | Implicación |
|---------|---|---|---|
| ✅ | PREMIUM | Todos documentos analizados + 0 guardias activas + normativa 100% verificada + análisis multi-jurisdiccional completo + 100% citas validadas con anti-hallucination-v4 + 0 incumplimientos críticos perdidos | Genera 02-DIAGNOSTICO.md listo para Recomendaciones. Mandante bien documentado, cero riesgos ocultos, análisis excepcional magistral. |
| ⚠️ | PROFESIONAL | Documentos analizados + Guardias 4-5 activadas (subsanadas) + Normativa verificada pero con [s/d] en máximo 2 campos | Genera 02-DIAGNOSTICO.md con notas de información faltante. Requiere validación en implementación. |
| 🟠 | REQUIERE REVISIÓN | Documentación parcial (falta uno de nómina/contratos) + Guardias 3-5 activas no subsanadas | NO genera 02-DIAGNOSTICO.md completo. Solicitar revalidación de documentos críticos (Guardias 1-2). Continuar solo cuando se subsanen. |
| 🔴 | NO CONFORME | Documentación crítica faltante (nómina Y contratos) + Guardias 1-2 activas no subsanadas | Cierra análisis. Avisar mandante: "Documentación incompleta. Requiere aportar nómina y contratos antes de proceder." |
| 🚫 | RECHAZADO | Documentos ilegibles/manifiestamente falsos, inconsistencias no aclarables, o mandante se rehúsa a aportar | Cierra diagnóstico permanentemente. Requiere escalado a decisor (Jorge Ángel Cortés). Marcar expediente con nota de rechazo. |

---

## FAIL-SAFE — Si Documentos Incompletos

- Se marca como `[s/d]` (sin dato) en diagnóstico
- Se genera 02-DIAGNOSTICO.md PERO con certificación ⚠️ PARCIAL
- Se avisa: "Información faltante en X área. Intenta obtener: [documento específico]"
- Se declara explícitamente en acta

**Nunca se genera ✅ COMPLETO si hay documentos críticos sin información.**

---

## ESTRUCTURA DEL ARCHIVO 02-DIAGNOSTICO.md GENERADO

```markdown
# DIAGNÓSTICO JURÍDICO — [RAZÓN SOCIAL MANDANTE]

**Fecha del diagnóstico**: [fecha]
**Período analizado**: [mes/año a mes/año]
**Analista**: Claude AI — Skill diagnostico-cliente v2.1
**Certificación**: [✅ PREMIUM / ⚠️ PROFESIONAL / 🟠 REQUIERE REVISIÓN / 🔴 NO CONFORME / 🚫 RECHAZADO]

---

## RESUMEN EJECUTIVO

- **Incumplimientos CRÍTICOS identificados**: [número] (remediación < 30 días)
- **Incumplimientos MODERADOS identificados**: [número] (remediación 30-90 días)
- **Incumplimientos BAJO identificados**: [número] (remediación > 90 días)
- **Riesgo legal global**: [ALTO / MEDIO / BAJO]
- **Multas potenciales (UVT)**: $[X] - $[Y]
- **Acción inmediata requerida**: [SÍ — incumplimientos específicos / NO]

---

## ÁREA 1: CUMPLIMIENTO DE SEGURIDAD SOCIAL (Afiliación, Cotización, SUI)

### Análisis Normativo:
[Revisión de EPS, AFP, ARL, Caja de Compensación contra Ley 100 Art. 10, Art. 200-203 CST, Decreto 1072/2015, Resoluciones MINSALUD vigentes]

### Análisis Multi-Jurisdiccional:
- **Colombia**: [Requerimientos específicos CST/Ley 100]
- **Common Law (EE.UU./UK)**: [Comparativa: FLSA, Social Security Act, National Insurance]
- **Civil Law (Europa)**: [Comparativa: Directiva de Seguridad Social, RGPD si aplica]

### Incumplimientos en esta área:
[Lista de incumplimientos CRÍTICO/MODERADO/BAJO con clasificación]

---

## ÁREA 2: CUMPLIMIENTO DE DERECHO LABORAL (Contratos, Jornada, Prestaciones)

### Análisis Normativo:
[Revisión de contratos, términos, salario mínimo, auxilio transporte, Ley 789/2002, contra CST Art. 37-48, Ley 2294/2023]

### Análisis Multi-Jurisdiccional:
- **Colombia**: [Garantías mínimas, estabilidad en el empleo, igualdad de trato]
- **Common Law (EE.UU./UK)**: [At-will employment, statutory rights, Equal Pay Act]
- **Civil Law (Europa)**: [Diretiva Trabajadores, Derecho al descanso, Congedi]

### Incumplimientos en esta área:
[Lista de incumplimientos CRÍTICO/MODERADO/BAJO]

---

## ÁREA 3: POLÍTICAS, INCLUSIÓN Y CAPACITACIÓN

### Análisis Normativo:
[Revisión de reglamento interno, política de acoso laboral (Ley 1010/2006), capacitación obligatoria, no discriminación]

### Incumplimientos en esta área:
[Lista de incumplimientos CRÍTICO/MODERADO/BAJO]

---

## INCUMPLIMIENTOS DETALLADOS (NORMALIZADO A LENGUAJE ALTA CORTE)

### 🔴 CRÍTICOS (Remediación < 30 días)

[Para cada incumplimiento crítico]:
- **Incumplimiento identificado**: [Descripción magistral]
- **Normativa aplicable**: [Ley X, Art. Y, vigencia Z] ✓ Verificada con anti-hallucination-v4
- **Riesgo legal cuantificado**: [Multa en UVT, sanción, demanda, etc.]
- **Acción correctiva requerida**: [Pasos específicos]
- **Costo de remediación**: [$X - $Y]
- **Impacto si no se remedia**: [Consecuencias legales, reputacionales, financieras]

[Repetir para cada incumplimiento crítico]

### 🟡 MODERADOS (Remediación 30-90 días)

[Mismo formato para cada incumplimiento moderado]

### 🟢 BAJO (Remediación > 90 días)

[Mismo formato para cada incumplimiento bajo]

---

## PRÓXIMOS PASOS

1. Revisar incumplimientos CRÍTICOS y aprobar plan de remediación
2. Solicitar 03-RECOMENDACIONES.md con plan de acción detallado
3. Reunión con autoridades competentes del mandante para socializar diagnóstico
4. Implementación conforme timeline de urgencia

---

**Generado por**: Skill diagnostico-cliente v2.1
**Validación citas**: 100% verificadas con anti-hallucination-v4
**Próximo paso**: Generar Plan de Acción Normativo (03-RECOMENDACIONES.md)
```

---

## ACTA DE CONTROL — 15 Puntos de Validación Jurídica

```
═══════════════════════════════════════════════════════════════════════════════
ACTA DE CONTROL — DIAGNÓSTICO CLIENTE v2.1 (15 PUNTOS)
═══════════════════════════════════════════════════════════════════════════════

Mandante analizado: [RAZÓN SOCIAL / PERSONA NATURAL]
Período de análisis: [fecha inicio - fecha fin]
Fecha de procesamiento: [fecha/hora]
Analista: Claude AI — Skill diagnostico-cliente v2.1

───────────────────────────────────────────────────────────────────────────────
VALIDACIONES DE CALIDAD JURÍDICA (15 PUNTOS)
───────────────────────────────────────────────────────────────────────────────

✓ Punto 1: Documentos de nómina analizados y auténticos (últimos 2 meses)
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Documento legible, proveniente de sistema de nómina, período completo
  
✓ Punto 2: Contratos de trabajo analizados (mínimo 2 ejemplos o 1 por tipo)
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Incluyen: fecha, partes, tipo, duración, salario, cargo
  
✓ Punto 3: Constancias de afiliación EPS validadas y vigentes
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Con fecha de vigencia ≤ 30 días de cierre de análisis
  
✓ Punto 4: Constancias de afiliación AFP validadas y vigentes
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Con fecha de vigencia ≤ 30 días de cierre de análisis
  
✓ Punto 5: Constancias de afiliación ARL validadas y vigentes
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Con fecha de vigencia ≤ 30 días de cierre de análisis
  
✓ Punto 6: Coherencia entre nómina y afiliaciones (divergencia < 5%)
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Número de empleados en nómina = empleados en constancias (margen máximo 5%)
  
✓ Punto 7: Cálculos aritméticos de nómina verificados (aportes, descuentos)
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: 0 errores en EPS (8.5%), AFP (10%), ARL (0.5%-3%), Caja (min 2%)
  
✓ Punto 8: Normativa colombiana aplicable revisada exhaustivamente
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: CST, Ley 100, Decreto 1072, Ley 2288, Resoluciones MINSALUD vigentes
  
✓ Punto 9: Análisis multi-jurisdiccional incluido (Colombia + Common Law + Civil Law)
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Comparación de incumplimientos colombianos con estándares internacionales
  
✓ Punto 10: Todas las citas normativas validadas (100%) con anti-hallucination-v4
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Legal Data Hunter + web_search + verificación manual de vigencia
  
✓ Punto 11: Incumplimientos normalizados a lenguaje Alta Corte (no "hallazgos")
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: "Incumplimiento de afiliación" no "hallazgo de falta de EPS", etc.
  
✓ Punto 12: Riesgos cuantificados (monetarios, legales, reputacionales)
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Multas en UVT, % de riesgo reputacional, timeline de remediación
  
✓ Punto 13: Incumplimientos clasificados correctamente (CRÍTICO/MODERADO/BAJO)
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Criterios de urgencia (< 30 días / 30-90 / > 90) correctamente aplicados
  
✓ Punto 14: Consistencia de análisis (0 incumplimientos críticos perdidos)
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Todos los datos de nómina/contratos se analizaron, ninguno omitido
  
✓ Punto 15: 02-DIAGNOSTICO.md generado conforme Estándar Alta Corte
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Resumen ejecutivo, análisis por área, hallazgos detallados, próximos pasos claros

───────────────────────────────────────────────────────────────────────────────
RESUMEN DE GUARDIAS
───────────────────────────────────────────────────────────────────────────────

Guardia 1 (Nómina auténtica): [ACTIVADA/NO ACTIVADA]
Guardia 2 (Contratos disponibles): [ACTIVADA/NO ACTIVADA]
Guardia 3 (Inconsistencia nómina/afiliaciones): [ACTIVADA/NO ACTIVADA]
Guardia 4 (Vigencia de afiliaciones): [ACTIVADA/NO ACTIVADA]
Guardia 5 (Errores aritméticos): [ACTIVADA/NO ACTIVADA]

───────────────────────────────────────────────────────────────────────────────
CUANTIFICACIÓN DE INCUMPLIMIENTOS
───────────────────────────────────────────────────────────────────────────────

Incumplimientos CRÍTICOS (< 30 días): [cantidad]
Incumplimientos MODERADOS (30-90 días): [cantidad]
Incumplimientos BAJO (> 90 días): [cantidad]

Riesgo legal global: [ALTO / MEDIO / BAJO]
Multas potenciales (UVT): $[X] - $[Y]
Indemnizaciones potenciales: $[Z] (estimado)

───────────────────────────────────────────────────────────────────────────────
CERTIFICACIÓN FINAL EMITIDA
───────────────────────────────────────────────────────────────────────────────

[ ] ✅ PREMIUM — 15/15 puntos ✅ + 0 guardias activas + normativa 100% verificada
[ ] ⚠️ PROFESIONAL — 13-14/15 puntos ✅ + guardias subsanadas
[ ] 🟠 REQUIERE REVISIÓN — 10-12/15 puntos + guardias sin subsanar
[ ] 🔴 NO CONFORME — < 10/15 puntos + guardias críticas (1-2)
[ ] 🚫 RECHAZADO — Documentos ilegibles o mandante se rehúsa

Justificación: [Describir brevemente por qué se emitió esta certificación]

───────────────────────────────────────────────────────────────────────────────
RESPONSABILIDADES Y PRÓXIMOS PASOS
───────────────────────────────────────────────────────────────────────────────

✓ Este diagnóstico es análisis técnico basado en documentos aportados
✓ Todas las citas normativas han sido verificadas contra fuentes oficiales
✓ Análisis multi-jurisdiccional incluido para contexto internacional
✓ Si certificación ≠ ✅ PREMIUM, documentar retrasos esperados
✓ Próximo paso: Generar 03-RECOMENDACIONES.md (plan de remediación)
✓ Responsable del seguimiento: [Abogado asignado]
✓ Última revisión recomendada: Antes de implementar cambios

═══════════════════════════════════════════════════════════════════════════════
```

---

## CHANGELOG

### v2.1 — Nivel Alta Corte (Actual)

**Mejoras vs v2.0**:
- ✅ Certificación expandida a 5 niveles (agregar ✅ PREMIUM)
- ✅ Guardias expandidas con criterios más específicos (5 guardias con validaciones jurídicas)
- ✅ Lenguaje ascendido a nivel Alta Corte magistral
  - "hallazgos" → "incumplimientos normativos"
  - "cliente" → "mandante"
  - "empresa" → "persona jurídica mandante"
- ✅ Análisis multi-jurisdiccional OBLIGATORIO (Colombia + Common Law + Civil Law)
- ✅ Acta de control: Expandida de ~10 a 15 puntos específicos con criterios jurídicos
- ✅ Validación 100% de citas normativas con anti-hallucination-v4 antes de certificación ✅ PREMIUM
- ✅ Estructura de 02-DIAGNOSTICO.md mejorada con análisis multi-jurisdiccional
- ✅ Matriz de incumplimientos: Reemplazo de "hallazgos" por "incumplimientos normativos"
- ✅ Cuantificación: Riesgos expresados en UVT, %, timeline explícito
- ✅ Criterio ✅ PREMIUM: 0 incumplimientos críticos perdidos + 100% citas verificadas
- ✅ Test suite: Ampliada a 17 casos (criterio: 90%+ PASS)

### v2.0 — Enero 2026

**Características iniciales**:
- ✅ Activación automática (sin requerir mención)
- ✅ 5 Guardias contra documentos incompletos/inconsistentes
- ✅ Acta de control obligatoria
- ✅ Certificación final clara (4 niveles)
- ✅ Archivo 02-DIAGNOSTICO.md generado automáticamente
- ✅ Protocolo [s/d] para datos sin información
- ✅ Test suite con 14 casos
- ✅ Integración con flujo de Recomendaciones

---

**Responsable**: Jorge Ángel Cortés Cartagena (T.P. 365.594)  
**Despacho**: Cortés Cartagena, Medellín, Colombia — 2026  
**Referencia**: Estándar Universal v2.0 + Protocolo Alta Corte
