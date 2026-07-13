---
name: recomendaciones-cliente
description: >
  Skill operativo AUTOMÁTICO para convertir hallazgos de diagnóstico en PLAN DE ACCIÓN
  detallado. Se ejecuta AUTOMÁTICAMENTE después de 02-DIAGNÓSTICO.md. Lee diagnóstico,
  convierte cada hallazgo CRÍTICO en acción concreta, genera timeline (semana 1-2-mes 2),
  estima presupuesto desglosado (honorarios + trámites + implementación), y crea
  03-RECOMENDACIONES.md con tabla de acciones, timeline visual, y próximos pasos.
  
  CARACTERÍSTICAS GARANTIZADAS:
  — Activación: AUTOMÁTICA (sin solicitud explícita)
  — Guardias: 4 filtros contra planes incompletos o incoherentes
  — Rechazo: INMEDIATO si diagnóstico falta o es incompleto
  — Acta de control: OBLIGATORIA con acciones y presupuesto
  — Certificación: ✅ PLAN COMPLETO / ⚠️ PARCIAL / 🔴 INCOMPLETO / 🚫 RECHAZADO
  — Presupuesto: Desglosado por concepto (honorarios, trámites, implementación)
---

# RECOMENDACIONES CLIENTE v2.0
## Plan de Acción Detallado con Timeline y Presupuesto

**Autor**: Jorge Ángel Cortés Cartagena — T.P. 365.594  
**Versión**: 2.0 — Julio 2026 — Conforme a Estándar Universal  
**Naturaleza**: Skill EJECUTORA AUTOMÁTICA para planificación operativa

---

## PROPÓSITO

Convertir hallazgos del diagnóstico en plan de acción práctico, ejecutable y presupuestado. Ordena acciones por urgencia (CRÍTICO → MODERADO → BAJO). Define timeline específico (día 1, día 3, semana 1, semana 2, mes 2). Estima costo por acción. Genera 03-RECOMENDACIONES.md con: resumen ejecutivo, tabla de acciones, timeline visual, presupuesto desglosado, y próximos pasos.

**Regla absoluta**: Cada acción DEBE ser específica (no "redactar contratos" sino "redactar contrato a término indefinido para Juan López"). Presupuesto DEBE ser desglosado por concepto.

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

### GUARDIA 1: Diagnóstico faltante o incompleto
**CONDICIÓN**: No hay 02-DIAGNÓSTICO.md O diagnóstico no tiene hallazgos claros

**ACCIÓN INMEDIATA**:
```
🚫 RECHAZO — GUARDIA 1
Motivo: Diagnóstico indispensable y no disponible
Riesgo: Sin diagnóstico no se puede hacer plan de acción
Qué se requiere: Completar 02-DIAGNÓSTICO.md primero
Estado: PLAN BLOQUEADO
Certificación: 🚫 RECHAZADO
```

### GUARDIA 2: Hallazgos SIN acciones claras
**CONDICIÓN**: Diagnóstico tiene hallazgos pero no se puede derivar acción concreta

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 2
Vicio detectado: Hallazgo sin acción derivable
Ejemplo: "Empresa dice que cambios normativos son complicados" (no es hallazgo)
Razón: Acción requiere hallazgo técnico específico
Texto reencuadrado: Se marca como [Comentario] NO como hallazgo; se busca hallazgo real
Certificación: ⚠️ PARCIAL (subsanar: hallazgos deben ser técnicos)
```

### GUARDIA 3: Presupuesto no desagregado o genérico
**CONDICIÓN**: Plan dice "implementación: $500k" pero no especifica qué incluye

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 3
Vicio detectado: Presupuesto genérico sin desglose
Razón: Cliente necesita saber "¿$500k por qué?"
Texto reencuadrado: Se desglosa en:
  - Honorarios redacción de contrato: $X
  - Trámite de afiliación: $Y
  - Capacitación de personal: $Z
Certificación: ⚠️ PARCIAL (presupuesto debe ser transparente)
```

### GUARDIA 4: Timeline irreal (acciones conflictivas)
**CONDICIÓN**: Plan dice "Semana 1: redactar 20 contratos" (imposible en 1 semana)

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 4
Vicio detectado: Timeline irrealista
Ejemplo: "20 contratos en 1 semana" requiere 4+ semanas
Razón: Plan debe ser ejecutable
Texto reencuadrado: Se redistribuye:
  - Semana 1: [5 contratos + otros urgentes]
  - Semana 2-3: [15 contratos restantes]
Certificación: ⚠️ PARCIAL (ajustar timeline a realidad)
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

| Símbolo | Certificación | Criterio | Implicación |
|---------|---|---|---|
| ✅ | PLAN COMPLETO | Acciones específicas + timeline realista + presupuesto desagregado | Genera 03-RECOMENDACIONES.md listo para cliente |
| ⚠️ | PARCIAL | Acciones claras pero timeline o presupuesto incompleto | Genera archivo; subsanar antes de presentar a cliente |
| 🔴 | INCOMPLETO | Faltan acciones de hallazgos críticos O presupuesto no desagregado | NO genera archivo; subsanar primero |
| 🚫 | RECHAZADO | Diagnóstico faltante O plan es incoherente | Cierra; requiere diagnóstico completo |

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
# RECOMENDACIONES — [EMPRESA]

**Fecha de recomendaciones**: [fecha]
**Empresa**: [nombre]
**Presupuesto estimado total**: $[X]
**Timeline total**: [n semanas / n meses]

---

## RESUMEN EJECUTIVO

**Situación**: [Resumen de hallazgos del diagnóstico]

**Objetivos del plan**:
1. [Objetivo 1]
2. [Objetivo 2]
3. [Objetivo 3]

**Costo total**: $[X] + implementación interna
**Tiempo estimado**: [n semanas]

---

## TABLA DE ACCIONES

| # | Acción | Urgencia | Timeline | Costo | Responsable |
|---|--------|----------|----------|-------|-------------|
| 1 | [Acción específica] | CRÍTICO | Día 2 | $X | JA Abogados |
| 2 | [Acción específica] | CRÍTICO | Semana 1 | $Y | Empresa |
| 3 | [Acción específica] | MODERADO | Semana 2 | $Z | JA Abogados |

---

## DETALLE DE ACCIONES

### Acción 1: [Nombre específico]
- **Descripción**: [Qué se hace exactamente]
- **Responsable**: [JA Abogados / Empresa]
- **Timeline**: [Día X / Semana X]
- **Documentos**: [Qué templates o formularios se usan]
- **Costo**: [Desglosado]
- **Evidencia de cumplimiento**: [Qué valida que se hizo]

[Repetir para cada acción]

---

## TIMELINE VISUAL

**Semana 1 (Acciones urgentes)**:
- [Lista acciones semana 1]

**Semana 2-3 (Acciones importantes)**:
- [Lista acciones semana 2-3]

**Mes 2 (Optimizaciones)**:
- [Lista acciones mes 2]

---

## PRESUPUESTO DESGLOSADO

| Concepto | Detalle | Costo Unitario | Cantidad | Costo Total |
|----------|---------|---|---|---|
| Honorarios redacción | Contrato a término indefinido | $50k | 3 | $150k |
| Honorarios afiliación | Trámite de afiliación EPS/AFP | $0 | 3 | $0 |
| Capacitación | Sesión de 2 horas | $200k | 1 | $200k |
| **TOTAL**  | | | | **$350k** |

---

## PRÓXIMOS PASOS

1. **Validación**: Cliente revisa plan y presupuesto
2. **Aprobación**: Cliente aprueba y firma carta de encargo
3. **Ejecución**: JA Abogados inicia implementación según timeline
4. **Seguimiento**: Reporte semanal de avance

---

**Generado por**: Skill recomendaciones-cliente v2.0
**Próximo paso**: Presentar a cliente para aprobación
```

---

## ACTA DE CONTROL — Cierre Obligatorio

```
═══════════════════════════════════════════════════════════════════
ACTA DE CONTROL — RECOMENDACIONES CLIENTE v2.0
═══════════════════════════════════════════════════════════════════

Empresa: [NOMBRE]
Plan basado en: [02-DIAGNÓSTICO.md]
Fecha de creación del plan: [fecha]

INDICADORES DE EJECUCIÓN:
🔴 Acciones críticas: [cantidad]
🟡 Acciones moderadas: [cantidad]
🟢 Acciones bajas: [cantidad]

GUARDIA ACTIVADAS:
⚠️ Guardia 1 (diagnóstico faltante): [SÍ/NO]
⚠️ Guardia 2 (hallazgos sin acción): [SÍ/NO]
⚠️ Guardia 3 (presupuesto genérico): [SÍ/NO]
⚠️ Guardia 4 (timeline irreal): [SÍ/NO]

PLAN EJECUTIVO:
Acciones totales: [número]
Timeline total: [semanas / meses]
Presupuesto total: $[X]

PRESUPUESTO POR CONCEPTO:
- Honorarios de redacción: $[X]
- Trámites administrativos: $[X]
- Capacitación: $[X]
- Implementación: $[X]

ARCHIVO 03-RECOMENDACIONES.md: [GENERADO/PENDIENTE]

CERTIFICACIÓN FINAL:
  ✅ PLAN COMPLETO (acciones específicas + timeline + presupuesto)
  ⚠️ PARCIAL (información incompleta: [especificar])
  🔴 INCOMPLETO (acciones o presupuesto faltante)
  🚫 RECHAZADO (diagnóstico insuficiente)

RESPONSABILIDADES:
- Este plan es orientativo; cliente decide si ejecutar
- Presupuesto está basado en información del diagnóstico
- Costo final puede variar según detalles adicionales
- Próximo paso: Presentación a cliente y aprobación

═══════════════════════════════════════════════════════════════════
```

---

**Responsable**: Jorge Ángel Cortés Cartagena (T.P. 365.594)  
**Bufete**: Cortés Cartagena, Medellín, Colombia — 2026
