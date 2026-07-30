---
name: recomendaciones-cliente
description: >
  Skill operativo AUTOMÁTICO para convertir incumplimientos de diagnóstico en PLAN DE REMEDIACIÓN
  NORMATIVA detallado. Se ejecuta AUTOMÁTICAMENTE después de 02-DIAGNÓSTICO.md. Lee diagnóstico,
  convierte cada incumplimiento CRÍTICO en acción concreta con validación de viabilidad,
  genera timeline con análisis de realismo, estima presupuesto exhaustivamente desglosado
  (honorarios + trámites + implementación + costo de NO hacer nada), y crea 03-RECOMENDACIONES.md.
  Análisis ROI: impacto financiero de remediar vs no remediar. Validación: detecta timelines
  imposibles. Nivel Alta Corte: lenguaje magistral + cuantificación precisa.
  
  CARACTERÍSTICAS GARANTIZADAS:
  — Activación: AUTOMÁTICA (sin solicitud explícita)
  — Guardias: 5 filtros especializados contra planes incompletos o incoherentes
  — Rechazo: INMEDIATO si diagnóstico falta o plan es irreal
  — Acta de control: OBLIGATORIA con 15 puntos de validación presupuestal y de coherencia
  — Certificación: ✅ PREMIUM / ⚠️ PROFESIONAL / 🟠 REQUIERE REVISIÓN / 🔴 NO CONFORME / 🚫 RECHAZADO
  — Presupuesto: Exhaustivamente desglosado por concepto (honorarios, trámites, implementación, costo de inacción)
  — ROI: Análisis de costo-beneficio (impacto de remediar vs costo de no hacer nada)
  — Nivel: Conforme a Estándar Universal v2.0 + Protocolo Alta Corte
---

# RECOMENDACIONES CLIENTE v2.1
## Plan de Remediación Normativa — Nivel Alta Corte

**Autor**: Jorge Ángel Cortés Cartagena — T.P. 365.594  
**Versión**: 2.1 — Julio 2026 — Conforme a Estándar Universal v2.0  
**Naturaleza**: Skill EJECUTORA AUTOMÁTICA para planificación normativa con validación ROI  
**Estatus**: Mejorado a nivel PREMIUM con análisis financiero de remediación vs inacción

---

## PROPÓSITO

Convertir incumplimientos normativos del diagnóstico en plan de remediación normativa práctico, ejecutable, presupuestado y viable. Ordena acciones por urgencia (CRÍTICO → MODERADO → BAJO). Define timeline específico con análisis de realismo (detecta si 20 acciones en 1 semana es imposible). Estima costo por acción EXHAUSTIVAMENTE.

Genera 03-RECOMENDACIONES.md conforme Alta Corte con:
- **Resumen ejecutivo** de incumplimientos
- **Tabla de acciones** con urgencia, timeline, costo, responsable
- **Análisis ROI**: Costo de remediar vs costo de NO hacer nada (impacto regulatorio + financiero + reputacional)
- **Timeline visual** con validación de realismo
- **Presupuesto exhaustivamente desglosado** (honorarios + trámites + implementación + contingencia)
- **Próximos pasos** y métricas de cumplimiento

**Protocolos obligatorios**:
- Cada acción DEBE ser específica y medible (no "redactar contratos" sino "redactar contrato indefinido para Juan López, con cláusulas [lista]")
- Presupuesto DEBE ser desglosado por concepto + contingencia (10%)
- Timeline DEBE ser realista: máximo 4 acciones CRÍTICAS por semana
- ROI DEBE incluir: costo remediación vs multa potencial + daño reputacional + tiempo perdido

---

## ACTIVACIÓN — Automática y Obligatoria

Este skill se ejecuta **AUTOMÁTICAMENTE cada vez que**:
1. Usuario aporta 02-DIAGNOSTICO.md completo
2. Usuario pregunta "¿cuál es el plan?" después de diagnóstico
3. Usuario pregunta "¿cuánto cuesta?" implementar recomendaciones
4. Usuario pregunta "¿cuánto tiempo toma?" implementar cambios

NO requiere solicitud explícita.

---

## OPERACIONES EN SECUENCIA OBLIGATORIA

1. **PASO 1 — VALIDACIÓN**: Verifica que diagnóstico esté completo y accesible
2. **PASO 2 — INVENTARIO**: Lista todos los hallazgos del diagnóstico
3. **PASO 3 — CONVERSIÓN**: Convierte cada hallazgo en acción concreta
4. **PASO 4 — TIMELINE**: Asigna cada acción a un período (día/semana/mes)
5. **PASO 5 — PRESUPUESTO**: Estima costo por acción (honorarios + trámites + implementación)
6. **PASO 6 — VALIDEZ**: Verifica que acciones sean coherentes entre sí (sin duplicados, sin conflictos)
7. **PASO 7 — GENERACIÓN**: Crea 03-RECOMENDACIONES.md
8. **PASO 8 — ACTA DE CONTROL**: Emite acta con plan y presupuesto

---

## GUARDIAS AUTOMÁTICAS — Detención Inmediata

### GUARDIA 1: Diagnóstico faltante, incompleto o sin incumplimientos documentados
**CONDICIÓN**: No hay 02-DIAGNÓSTICO.md accesible, OR diagnóstico no tiene incumplimientos clasificados (CRÍTICO/MODERADO/BAJO)

**ACCIÓN INMEDIATA**:
```
🚫 RECHAZO — GUARDIA 1
Vicio detectado: Diagnóstico indispensable no disponible o sin clasificación de incumplimientos
Motivo: Plan requiere base diagnóstica verificada
Riesgo: Sin diagnóstico no se puede derivar acciones válidas
Qué se requiere: Completar y validar 02-DIAGNÓSTICO.md conforme Estándar v2.1 primero
Estado: PLAN BLOQUEADO PERMANENTEMENTE
Certificación: 🚫 RECHAZADO — REQUIERE DIAGNÓSTICO PREVIO
```

### GUARDIA 2: Incumplimientos SIN acciones concretas y medibles
**CONDICIÓN**: Diagnóstico tiene incumplimientos pero plan no puede derivar acciones específicas de cada uno

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 2
Vicio detectado: Incumplimiento sin acción concreta derivable
Ejemplo: "Incumplimiento de "cambios normativos" (genérico, no específico)
Verificación: Acción debe ser: "Afiliación de Juan López a EPS en Día 2" (específica + medible)
Razón: Plan requiere acciones concretas, asignables, verificables
Acción requerida: Se marca como [Requiere aclaración] y se busca incumplimiento técnico
Certificación: 🟠 REQUIERE REVISIÓN (acciones deben derivar de incumplimientos técnicos)
```

### GUARDIA 3: Presupuesto genérico, no desglosado o sin contingencia
**CONDICIÓN**: Plan dice "implementación: $500k" sin especificar componentes, O no incluye contingencia (10%)

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 3
Vicio detectado: Presupuesto genérico sin desglose o contingencia
Ejemplo: "$500k implementación" SIN decir qué incluye
Verificación: Cada línea debe tener: Concepto | Detalle | Unitario | Cantidad | Total
Razón: Cliente necesita transparencia: "¿$500k por qué? ¿Y si cuesta más?"
Normalización: Se desglosa exhaustivamente en:
  - Honorarios redacción: $X (n contratos × tarifa)
  - Trámites administrativos: $Y (afiliaciones, impuestos, etc.)
  - Capacitación: $Z (horas × tarifa)
  - Contingencia (10%): $[10% del total]
Certificación: 🟠 REQUIERE REVISIÓN (desglose + contingencia son obligatorios)
```

### GUARDIA 4: Timeline irreal (carga horaria imposible)
**CONDICIÓN**: Plan propone "Semana 1: 20 acciones" o timeline viola realismo (más de 4 acciones CRÍTICAS por semana)

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 4
Vicio detectado: Timeline irrealista (sobrecarga de acciones)
Ejemplo: "20 contratos en 1 semana" requiere 40-50 horas, es imposible
Validación: Máximo 4 acciones CRÍTICAS por semana (20 horas de asesoría interna)
Razón: Plan debe ser ejecutable con calidad
Normalización: Se redistribuye a múltiples semanas:
  - Semana 1: [4 acciones CRÍTICAS máximo + urgentes]
  - Semana 2-3: [Siguientes 4 acciones CRÍTICAS]
  - Mes 2: [Acciones MODERADAS y BAJO]
Certificación: 🟠 REQUIERE REVISIÓN (timeline debe ser realista)
```

### GUARDIA 5: Análisis ROI ausente (no compara costo remediación vs costo inacción)
**CONDICIÓN**: Plan no incluye análisis de "¿cuánto cuesta NO hacer nada?" vs "¿cuánto cuesta remediar?"

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 5
Vicio detectado: ROI incompleto (falta análisis de costo de inacción)
Ejemplo: Plan dice "afiliación $0" pero no dice "si no afilias: multa $500k + demandas"
Verificación: Debe incluir: Costo remediar vs Multa potencial vs Daño reputacional vs Tiempo perdido
Razón: Cliente necesita comprender por qué remediar ahora es mejor que esperar
Normalización: Se agrega tabla ROI:
  | Escenario | Costo | Riesgo | Impacto Reputacional |
  | Remediar ahora | $350k | BAJO | Positivo |
  | NO hacer nada | $0 | ALTO ($500k multa) | Negativo (-20% clientes) |
  | Esperar 6 meses | $500k | CRÍTICO | Crítico |
Certificación: 🟠 REQUIERE REVISIÓN (ROI análisis es obligatorio para ✅ PREMIUM)
```

---

## CONVERSIÓN DE HALLAZGO A ACCIÓN

**Regla de especificidad**: Toda acción es específica, mesurable, asignable.

| Hallazgo Diagnóstico | ❌ GENÉRICO | ✅ ESPECÍFICO |
|-----|-----|-----|
| "3 empleados sin EPS" | "Afiliación a EPS" | "Diligenciar formulario de afiliación de Juan, María, Pedro a EPS y enviar en día 2" |
| "Contratos sin cláusulas" | "Redactar contratos" | "Redactar nuevo contrato indefinido para empleado Juan López con cláusulas de confidencialidad y jornada laboral" |
| "Nómina con errores" | "Ajustar nómina" | "Recalcular aportes a EPS de empleados (actual: 8%, correcto: 8.5%) para nómina de julio y realizar descuentos retroactivos" |

---

## CERTIFICACIÓN FINAL

El skill emite **UNA SOLA** certificación (mutualmente excluyentes):

| Símbolo | Certificación | Criterio Específico | Implicación |
|---------|---|---|---|
| ✅ | PREMIUM | Acciones 100% específicas + timeline realista (máx 4 CRÍTICAS/semana) + presupuesto exhaustivamente desglosado con contingencia (10%) + análisis ROI completo (remediar vs inacción) + 0 guardias activas | Genera 03-RECOMENDACIONES.md listo para presentación a mandante. Presupuesto transparente, timeline ejecutable, decisión informada garantizada. |
| ⚠️ | PROFESIONAL | Acciones claras + timeline ajustado + Guardias 3-4 subsanadas (desglose + timeline) | Genera 03-RECOMENDACIONES.md. Verificar desglose presupuestal y timeline antes de presentar. |
| 🟠 | REQUIERE REVISIÓN | Acciones parciales + Guardias 2-5 activas (incumplimientos sin acción, presupuesto incompleto, timeline irreal, ROI faltante) | NO genera 03-RECOMENDACIONES.md final. Solicitar: acciones concretas por incumplimiento, desglose presupuestal, timeline ajustado, análisis ROI. |
| 🔴 | NO CONFORME | Faltan acciones de incumplimientos CRÍTICOS + Guardia 1 parcial (diagnóstico accesible pero sin clasificación) | Cierra plan provisionally. Avisar: "Diagnóstico incompleto. Requiere reclasificación de incumplimientos antes de continuar." |
| 🚫 | RECHAZADO | Diagnóstico FALTANTE (Guardia 1 total) O plan es manifiestamente incoherente | Cierra plan permanentemente. Cliente DEBE completar 02-DIAGNÓSTICO.md conforme Estándar v2.1 antes de proceder. |

---

## FAIL-SAFE — Si Diagnóstico Incompleto

- Se marca como `[s/d]` (sin dato) en recomendaciones
- Se genera 03-RECOMENDACIONES.md PERO con certificación ⚠️ PARCIAL
- Se avisa: "Plan está basado en información incompleta del diagnóstico"
- Se declara explícitamente en acta

**Nunca se genera ✅ COMPLETO si diagnóstico es incompleto.**

---

## ESTRUCTURA DEL ARCHIVO 03-RECOMENDACIONES.md GENERADO

```markdown
# PLAN DE REMEDIACIÓN NORMATIVA — [RAZÓN SOCIAL MANDANTE]

**Fecha del plan**: [fecha]
**Mandante**: [nombre]
**Presupuesto estimado total**: $[X] + contingencia (10%) = $[X + 10%]
**Timeline total**: [n semanas / n meses]
**Certificación**: [✅ PREMIUM / ⚠️ PROFESIONAL / 🟠 REQUIERE REVISIÓN / 🔴 NO CONFORME / 🚫 RECHAZADO]

---

## RESUMEN EJECUTIVO

**Situación**: [Resumen magistral de incumplimientos identificados en 02-DIAGNÓSTICO.md]

**Riesgo de inacción**:
- Multas potenciales: $[X] (en UVT)
- Indemnizaciones: $[Y]
- Daño reputacional: -[n]% confianza de clientes en [meses]
- **Costo total de NO remediar: $[X+Y]**

**Objetivos del Plan de Remediación**:
1. Remediar [n] incumplimientos CRÍTICOS en [n] semanas
2. Reducir riesgo legal de ALTO → BAJO
3. Garantizar conformidad normativa permanente

**Costo de remediación**: $[Z]
**ROI**: Costo remediar ($Z) vs Costo inacción ($X+Y) = [Ratio]%
**Recomendación**: REMEDIAR INMEDIATAMENTE (ROI positivo: ahorrar $[X+Y-Z])

---

## ANÁLISIS ROI (COSTO-BENEFICIO)

| Escenario | Costo | Riesgo Legal | Impacto Reputacional | Riesgo Operativo | TOTAL IMPACTO |
|-----------|-------|---|---|---|---|
| **REMEDIAR AHORA** | $[Z] | BAJO | Positivo (+5% confianza) | 0 | $[Z] (invertido) |
| **NO HACER NADA** | $0 | ALTO ($[X] multa) | Negativo (-20% confianza) | $[Y] daño | $[X+Y] (pérdida) |
| **ESPERAR 6 MESES** | $[Z+Z'] | CRÍTICO ($[2X] multa) | Crítico (-50% confianza) | $[2Y] daño | $[2X+2Y+Z'] (catastrófico) |

**Conclusión**: Remediar ahora es [X+Y-Z] UVT más económico que esperar.

---

## TABLA DE ACCIONES ORDENADAS POR URGENCIA

| # | Acción Específica | Urgencia | Timeline | Responsable | Costo | Evidencia de Cumplimiento |
|---|---|---|---|---|---|---|
| 1 | [Acción específica + medible] | CRÍTICO | Día 2 | JA Abogados | $X | Documento / Constancia |
| 2 | [Acción específica + medible] | CRÍTICO | Semana 1 | Mandante | $Y | Email confirmación |
| 3 | [Acción específica + medible] | MODERADO | Semana 2 | JA Abogados | $Z | Reporte de implementación |

[Continuar para todas las acciones — máx 4 CRÍTICAS por semana]

---

## DETALLE DE CADA ACCIÓN

### Acción 1: [Nombre descriptivo específico]
- **Incumplimiento que remedia**: [Referencia al incumplimiento del diagnóstico]
- **Descripción exacta**: [Qué se hace, paso a paso, sin ambigüedad]
- **Responsable**: [JA Abogados / Mandante / Tercero]
- **Timeline**: [Día X de Semana Y, o fecha específica]
- **Documentos/Templates**: [Referencia a template v2.1 o formulario oficial]
- **Costo**: Desglosado:
  - Honorarios: $[X] (n horas × tarifa)
  - Trámites: $[Y] (impuestos, registros, etc.)
  - Material: $[Z] (si aplica)
- **Métrica de cumplimiento**: [Cómo se valida: constancia, documento, certificado]
- **Riesgo si NO se hace**: [Multa, demanda, tiempo perdido]

[Repetir para todas las acciones]

---

## TIMELINE VISUAL (MÁXIMO 4 CRÍTICAS POR SEMANA)

### SEMANA 1 — ACCIONES CRÍTICAS (Máx 4)
- [Acción 1 — Responsable — Costo]
- [Acción 2 — Responsable — Costo]
- [Acción 3 — Responsable — Costo]
- [Acción 4 — Responsable — Costo]
- **Subtotal Semana 1**: $[X] + tiempo interno ≈ 20 horas

### SEMANA 2-3 — ACCIONES MODERADAS
- [Acción 5 — Responsable — Costo]
- [Acción 6 — Responsable — Costo]

### MES 2 — ACCIONES BAJO Y OPTIMIZACIÓN
- [Acción 7 — Responsable — Costo]
- [Acción 8 — Responsable — Costo]

---

## PRESUPUESTO EXHAUSTIVAMENTE DESGLOSADO

| Concepto | Detalle Específico | Unitario | Cant | Total |
|----------|---|---|---|---|
| **HONORARIOS** | | | | |
| Redacción de contratos | Contrato indefinido por empleado | $50k | 3 | $150k |
| Trámite de afiliación | Diligenciamiento + seguimiento por empleado | $25k | 3 | $75k |
| Capacitación | Sesión RH 2 horas + documentación | $200k | 1 | $200k |
| **TRÁMITES ADMINISTRATIVOS** | | | | |
| Impuesto de registro (si aplica) | % según municipio | $[X] | 1 | $[X] |
| Certificados de afiliación | Por empleado | $10k | 3 | $30k |
| **IMPLEMENTACIÓN INTERNA** | | | | |
| Capacitación interna | Horas equipo RH × tarifa | $[X]/hr | n hrs | $[X] |
| **SUBTOTAL DIRECTO** | | | | **$[Z]** |
| **CONTINGENCIA (10%)** | Imprevistos y ajustes | 10% | 1 | **$[10% Z]** |
| **TOTAL PRESUPUESTO** | | | | **$[Z + 10%]** |

---

## PRÓXIMOS PASOS

### 1. REVISIÓN (Esta semana)
- [ ] Mandante revisa plan de remediación y presupuesto
- [ ] Mandante valida que acciones son viables internamente
- [ ] Mandante confirma timeline

### 2. APROBACIÓN (Antes de Día 2)
- [ ] Mandante aprueba plan por escrito (email o carta de encargo)
- [ ] Se define autoridad competente para firmar documentos
- [ ] Se asigna contacto interno (RH/Operaciones)

### 3. EJECUCIÓN (Semana 1)
- [ ] JA Abogados inicia Acción 1 (Día 1)
- [ ] Mandante ejecuta Acciones asignadas
- [ ] Reportes de avance cada 3 días

### 4. SEGUIMIENTO (Semanal)
- [ ] Reporte de cumplimiento de acciones vs timeline
- [ ] Validación de métricas de cumplimiento
- [ ] Ajustes si timeline requiere cambios

---

**Generado por**: Skill recomendaciones-cliente v2.1
**Validación**: Plan fue validado conforme Estándar Universal v2.0 + Protocolo Alta Corte
**Próximo paso**: Presentar a mandante para aprobación y firma de encargo de implementación
```

---

## ACTA DE CONTROL — 15 Puntos de Validación Presupuestal y Coherencia

```
═══════════════════════════════════════════════════════════════════════════════
ACTA DE CONTROL — RECOMENDACIONES CLIENTE v2.1 (15 PUNTOS)
═══════════════════════════════════════════════════════════════════════════════

Mandante: [RAZÓN SOCIAL]
Plan basado en: [02-DIAGNÓSTICO.md — Referencia]
Fecha de creación del plan: [fecha/hora]
Analista: Claude AI — Skill recomendaciones-cliente v2.1

───────────────────────────────────────────────────────────────────────────────
VALIDACIONES DE CALIDAD PRESUPUESTAL Y COHERENCIA (15 PUNTOS)
───────────────────────────────────────────────────────────────────────────────

✓ Punto 1: Cada incumplimiento crítico tiene 1+ acción derivada
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: [Número incumplimientos CRÍTICO] = [Número acciones CRÍTICAS]
  
✓ Punto 2: Cada acción es específica, medible y asignable
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: No genérico ("redactar contratos") → Específico ("redactar contrato indefinido para Juan López")
  
✓ Punto 3: Cada acción tiene responsable documentado (JA Abogados / Mandante)
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Rol responsable explícito en tabla de acciones
  
✓ Punto 4: Timeline es realista (máx 4 acciones CRÍTICAS por semana)
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Semana 1 CRÍTICOS ≤ 4 acciones, Semana 2-3 ≤ 4, Mes 2 ≤ restantes
  
✓ Punto 5: Presupuesto desglosado completamente (concepto + detalle + unitario + cantidad + total)
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Tabla tiene 5 columnas mínimo: Concepto | Detalle | Unitario | Cantidad | Total
  
✓ Punto 6: Contingencia incluida (10% del presupuesto total)
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Presupuesto total = (Líneas directas) + 10%
  
✓ Punto 7: No hay duplicación de costos entre líneas de presupuesto
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Revisar que un costo no aparezca en 2+ líneas (ej: afiliación EPS en 2 líneas)
  
✓ Punto 8: Análisis ROI incluido (costo remediación vs costo inacción)
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Tabla ROI muestra: Costo remediar | Multa si no hace | Daño reputacional | Timeline
  
✓ Punto 9: Métricas de cumplimiento definidas (cómo validar que acción se cumplió)
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Cada acción tiene "Evidencia de cumplimiento": constancia, documento, reporte, etc.
  
✓ Punto 10: Acciones CRÍTICAS enfocadas en remediación de riesgo inmediato
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Acciones CRÍTICAS (Semana 1) = Remediación de incumplimientos > $1M multa
  
✓ Punto 11: No hay conflictos entre acciones (una acción no invalida otra)
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Ej: No decir "cambiar a contrato indefinido" semana 1 y "terminar y re-afiliación" semana 2
  
✓ Punto 12: Documentos template/formularios asociados a cada acción
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Cada acción referencia template (ej: "Contrato Indefinido Template v2.1")
  
✓ Punto 13: Comunicaciones recomendadas documentadas (qué, a quién, cómo, cuándo)
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Si acción requiere comunicación: destinatario, contenido, formato, fecha
  
✓ Punto 14: Presupuesto es realista comparado con mercado
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Honorarios abogado ≈ $150-250k/día, afiliación ≈ $0-50k por empleado, etc.
  
✓ Punto 15: 03-RECOMENDACIONES.md generado conforme Estándar Alta Corte
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Incluye: resumen ejecutivo, tabla, ROI, presupuesto, próximos pasos, métricas

───────────────────────────────────────────────────────────────────────────────
RESUMEN DE INDICADORES DE EJECUCIÓN
───────────────────────────────────────────────────────────────────────────────

Acciones CRÍTICAS identificadas: [cantidad] — Timeline Semana 1-2
Acciones MODERADAS identificadas: [cantidad] — Timeline Semana 3-4 / Mes 2
Acciones BAJO identificadas: [cantidad] — Timeline Mes 2+

───────────────────────────────────────────────────────────────────────────────
RESUMEN DE GUARDIAS
───────────────────────────────────────────────────────────────────────────────

Guardia 1 (Diagnóstico completo): [ACTIVADA/NO ACTIVADA]
Guardia 2 (Acciones concretas): [ACTIVADA/NO ACTIVADA]
Guardia 3 (Presupuesto desglosado): [ACTIVADA/NO ACTIVADA]
Guardia 4 (Timeline realista): [ACTIVADA/NO ACTIVADA]
Guardia 5 (Análisis ROI): [ACTIVADA/NO ACTIVADA]

───────────────────────────────────────────────────────────────────────────────
CUANTIFICACIÓN PRESUPUESTAL
───────────────────────────────────────────────────────────────────────────────

Presupuesto directo (acciones): $[X]
Contingencia (10%): $[Y]
PRESUPUESTO TOTAL: $[X+Y]

Costo de NO remediar (potencial):
- Multas: $[A] (en UVT)
- Indemnizaciones: $[B]
- Daño reputacional: $[C]
- Impacto total: $[A+B+C]

ROI Remediación: [Costo remediar vs Costo inacción = (A+B+C) / (X+Y)]

───────────────────────────────────────────────────────────────────────────────
CERTIFICACIÓN FINAL EMITIDA
───────────────────────────────────────────────────────────────────────────────

[ ] ✅ PREMIUM — 15/15 puntos ✅ + 0 guardias activas + presupuesto transparente + ROI favorable
[ ] ⚠️ PROFESIONAL — 13-14/15 puntos ✅ + guardias subsanadas
[ ] 🟠 REQUIERE REVISIÓN — 10-12/15 puntos + guardias sin subsanar
[ ] 🔴 NO CONFORME — < 10/15 puntos + acciones o presupuesto incompleto
[ ] 🚫 RECHAZADO — Diagnóstico FALTANTE (Guardia 1 total)

Justificación: [Describir brevemente por qué se emitió esta certificación]

───────────────────────────────────────────────────────────────────────────────
RESPONSABILIDADES Y PRÓXIMOS PASOS
───────────────────────────────────────────────────────────────────────────────

✓ Plan es orientativo; mandante es responsable de decisión final
✓ Presupuesto está basado en información del 02-DIAGNÓSTICO.md
✓ Costo final puede variar ±10% según detalles adicionales descubiertos en implementación
✓ Si certificación ≠ ✅ PREMIUM, documentar retrasos esperados en ejecución
✓ Próximo paso: Presentación a mandante con 03-RECOMENDACIONES.md para aprobación
✓ Responsable de seguimiento: [Abogado asignado]
✓ Métrica de éxito: Remediación de 100% de incumplimientos CRÍTICOS en timeline

═══════════════════════════════════════════════════════════════════════════════
```

---

## CHANGELOG

### v2.1 — Nivel Alta Corte (Actual)

**Mejoras vs v2.0**:
- ✅ Certificación expandida a 5 niveles (agregar ✅ PREMIUM)
- ✅ Guardias expandidas de 4 a 5 (agregar Guardia 5: análisis ROI)
- ✅ Lenguaje ascendido a nivel Alta Corte ("plan" → "plan de remediación normativa")
- ✅ Acta de control: Expandida de ~10 a 15 puntos específicos con validaciones presupuestales
- ✅ Validación de realismo: Guardia 4 detecta timelines imposibles (máx 4 CRÍTICAS/semana)
- ✅ Análisis ROI OBLIGATORIO: "Costo remediar" vs "costo de NO hacer nada" (multa + daño reputacional)
- ✅ Presupuesto exhaustivamente desglosado: Concepto | Detalle | Unitario | Cantidad | Total
- ✅ Contingencia incluida: 10% de presupuesto para imprevistos
- ✅ Métricas de cumplimiento: Cada acción tiene "evidencia de cumplimiento" definida
- ✅ Acciones específicas y medibles: No genéricas, no vagas
- ✅ Documento 03-RECOMENDACIONES.md: Enhanced con ROI table, timeline visual, presupuesto desglosado
- ✅ Criterio ✅ PREMIUM: Acciones específicas + timeline realista + presupuesto transparente + ROI favorable + 0 guardias activas
- ✅ Test suite: Ampliada a 17 casos (criterio: 90%+ PASS)

### v2.0 — Enero 2026

**Características iniciales**:
- ✅ Activación automática (sin requerir mención)
- ✅ 4 Guardias contra planes incompletos/incoherentes
- ✅ Acta de control obligatoria
- ✅ Certificación final clara (4 niveles)
- ✅ Archivo 03-RECOMENDACIONES.md generado automáticamente
- ✅ Conversión de hallazgos a acciones
- ✅ Presupuesto por acción
- ✅ Timeline visual
- ✅ Test suite con 14 casos

---

**Responsable**: Jorge Ángel Cortés Cartagena (T.P. 365.594)  
**Despacho**: Cortés Cartagena, Medellín, Colombia — 2026  
**Referencia**: Estándar Universal v2.0 + Protocolo Alta Corte
