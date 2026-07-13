---
name: diagnostico-cliente
description: >
  Skill operativo AUTOMÁTICO para diagnóstico de cumplimiento normativo basado en
  documentos del cliente. Se ejecuta AUTOMÁTICAMENTE cuando cliente aporta nómina,
  contratos, constancias de afiliación, o reporte SUI. Revisa contra normativa
  vigente (CST, Ley 100, Decreto 1072). Identifica hallazgos en 3 categorías
  (CRÍTICO/MODERADO/BAJO). Genera archivo 02-DIAGNOSTICO.md con análisis completo
  y recomendaciones iniciales.
  
  CARACTERÍSTICAS GARANTIZADAS:
  — Activación: AUTOMÁTICA (sin solicitud explícita)
  — Guardias: 5 filtros contra documentos incompletos o inconsistentes
  — Rechazo: INMEDIATO si documentación crítica falta
  — Acta de control: OBLIGATORIA con hallazgos encontrados
  — Certificación: ✅ DIAGNÓSTICO COMPLETO / ⚠️ PARCIAL / 🔴 INCOMPLETO / 🚫 RECHAZADO
  — Validación: Verifica contra normativa vigente (CST, Ley 100, Decreto 1072)
---

# DIAGNÓSTICO CLIENTE v2.0
## Análisis de Cumplimiento Normativo

**Autor**: Jorge Ángel Cortés Cartagena — T.P. 365.594  
**Versión**: 2.0 — Julio 2026 — Conforme a Estándar Universal  
**Naturaleza**: Skill EJECUTORA AUTOMÁTICA para análisis normativo

---

## PROPÓSITO

Analizar documentos del cliente contra normativa laboral y de seguridad social vigente en Colombia. Identificar brechas, incumplimientos y riesgos. Clasificar hallazgos por urgencia (CRÍTICO < 30 días, MODERADO 30-90 días, BAJO > 90 días). Generar 02-DIAGNOSTICO.md con análisis área por área, hallazgos detallados y estimación de riesgos.

**Regla absoluta**: Todo diagnóstico DEBE basarse en normativa vigente. Ningún análisis sin cita de norma específica (CST, Ley 100, Decreto 1072, etc.).

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

### GUARDIA 1: Nómina faltante o ilegible
**CONDICIÓN**: No hay nómina O nómina no se puede leer (imagen borrosa, PDF corrupto)

**ACCIÓN INMEDIATA**:
```
🚫 RECHAZO — GUARDIA 1
Motivo: Nómina indispensable y no disponible
Riesgo: Sin nómina no se puede analizar salarios, aportes, descuentos
Qué se requiere: Solicitar nómina clara (últimos 2 meses) en Excel o PDF legible
Estado: DIAGNÓSTICO BLOQUEADO
Certificación: 🚫 RECHAZADO
```

### GUARDIA 2: Contratos faltantes (para empresas con empleados)
**CONDICIÓN**: Empresa tiene empleados pero no aporta contratos

**ACCIÓN INMEDIATA**:
```
🚫 RECHAZO — GUARDIA 2
Motivo: Contratos indispensables y no disponibles
Riesgo: Sin contratos no se puede validar tipo, plazo, términos contra CST
Qué se requiere: Aportar copias de contratos vigentes (al menos 2 ejemplos)
Estado: DIAGNÓSTICO BLOQUEADO
Certificación: 🚫 RECHAZADO
```

### GUARDIA 3: Constancias de afiliación inconsistentes con nómina
**CONDICIÓN**: Nómina muestra 5 empleados pero hay constancias de solo 2

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 3
Vicio detectado: Inconsistencia entre nómina y afiliaciones
Hallazgo: [n empleados en nómina] vs [m en constancias]
Razón: Posible incumplimiento en afiliación (Art. 200 CST)
Texto reencuadrado: Se marca como [HALLAZGO CRÍTICO] en diagnóstico
Nota: Requiere validación con cliente: ¿3 empleados no afiliados?
Certificación: 🔴 CRÍTICO (≤ 30 días — afiliación inmediata)
```

### GUARDIA 4: Datos de afiliación sin fecha vigencia
**CONDICIÓN**: Constancias de EPS/AFP sin fecha de vigencia clara

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 4
Vicio detectado: Documento de afiliación sin fecha de vigencia
Razón: No se puede validar si afiliación sigue vigente
Texto reencuadrado: Se marca como [No verificado] en diagnóstico
Nota: Se solicita reexplícitamente constancia actualizada
Certificación: ⚠️ PARCIAL (subsanar: pedir constancia vigente)
```

### GUARDIA 5: Nómina con cálculos evidentemente erróneos (≥2)
**CONDICIÓN**: Múltiples errores aritméticos en salarios, aportes o deducciones

**ACCIÓN INMEDIATA**:
```
🟠 CORRECCIÓN ACTIVA — GUARDIA 5
Vicio detectado: Errores aritméticos en nómina (cálculos incorrectos)
Hallazgos: [lista de errores encontrados]
Razón: Pueden indicar incumplimiento inadvertido en aportes
Texto reencuadrado: Se marca como [HALLAZGO MODERADO] con cálculo correcto
Nota: Se requiere corrección inmediata
Certificación: 🟡 MODERADO (30-90 días — ajustar nómina)
```

---

## MATRIZ DE HALLAZGOS POR URGENCIA

| Urgencia | Plazo | Ejemplos |
|----------|-------|----------|
| 🔴 CRÍTICO | < 30 días | Empleados sin afiliación EPS, AFP, ARL; incumplimiento de decreto vigente; inspección pendiente |
| 🟡 MODERADO | 30-90 días | Errores en cálculo de aportes, contratos sin cláusulas obligatorias, retraso en pago de cotizaciones |
| 🟢 BAJO | > 90 días | Optimización de proveedores, política de acoso laboral desactualizada, capacitación pendiente |

---

## CERTIFICACIÓN FINAL

| Símbolo | Certificación | Criterio | Implicación |
|---------|---|---|---|
| ✅ | DIAGNÓSTICO COMPLETO | Todos documentos analizados + 0 guardias activas | Genera 02-DIAGNOSTICO.md listo; sigue a Recomendaciones |
| ⚠️ | PARCIAL | Documentos analizados pero con [s/d] en algunos campos | Genera archivo con notas de información faltante |
| 🔴 | INCOMPLETO | Documentación crítica faltante (nómina O contratos) | NO genera archivo; solicita documentos faltantes |
| 🚫 | RECHAZADO | Documentos ilegibles, inconsistentes o cliente no aporta | Cierra diagnóstico; requiere revalidación |

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
# DIAGNÓSTICO — [EMPRESA]

**Fecha del diagnóstico**: [fecha]
**Período analizado**: [mes/año a mes/año]
**Analista**: Claude/AI — Skill diagnostico-cliente v2.0

---

## RESUMEN EJECUTIVO

- **Hallazgos CRÍTICOS encontrados**: [número]
- **Hallazgos MODERADOS encontrados**: [número]
- **Hallazgos BAJO encontrados**: [número]
- **Riesgo global**: [ALTO / MEDIO / BAJO]
- **Acción inmediata requerida**: [SÍ/NO — qué]

---

## ÁREA 1: SEGURIDAD SOCIAL (Afiliación, Cotización, SUI)

### Análisis:
[Revisión de EPS, AFP, ARL, Caja de Compensación contra Ley 100, Art. 200-203 CST]

### Hallazgos en esta área:
[Lista de hallazgos CRÍTICO/MODERADO/BAJO]

---

## ÁREA 2: DERECHO LABORAL (Contratos, Jornada, Prestaciones)

### Análisis:
[Revisión de contratos, términos, salario mínimo, auxilio transporte, contra CST Art. 37-48]

### Hallazgos en esta área:
[Lista de hallazgos CRÍTICO/MODERADO/BAJO]

---

## ÁREA 3: POLÍTICAS Y CAPACITACIÓN

### Análisis:
[Revisión de reglamento interno, política de acoso laboral (Ley 1010/2006), capacitación]

### Hallazgos en esta área:
[Lista de hallazgos CRÍTICO/MODERADO/BAJO]

---

## HALLAZGOS DETALLADOS

### 🔴 CRÍTICOS (< 30 días)

[Para cada hallazgo crítico]:
- **Qué está mal**: [Descripción]
- **Normativa**: [Art. X de Ley Y]
- **Riesgo legal**: [Multa, demanda, etc.]
- **Acción correctiva**: [Paso a paso]
- **Costo aproximado**: [$0 / $X]

[Repetir para cada hallazgo crítico]

### 🟡 MODERADOS (30-90 días)

[Mismo formato para cada hallazgo moderado]

### 🟢 BAJO (> 90 días)

[Mismo formato para cada hallazgo bajo]

---

## PRÓXIMOS PASOS

1. Abordar hallazgos CRÍTICOS
2. Solicitar plan de acción a 02-RECOMENDACIONES.md
3. Reunión con cliente para socializar diagnóstico

---

**Generado por**: Skill diagnostico-cliente v2.0
**Próximo paso**: Generar Plan de Acción (03-RECOMENDACIONES.md)
```

---

## ACTA DE CONTROL — Cierre Obligatorio

```
═══════════════════════════════════════════════════════════════════
ACTA DE CONTROL — DIAGNÓSTICO CLIENTE v2.0
═══════════════════════════════════════════════════════════════════

Empresa analizada: [NOMBRE]
Período: [fecha inicio - fecha fin]
Documentos analizados: [Nómina / Contratos / Afiliaciones / SUI]

INDICADORES DE RIESGO:
🔴 Hallazgos críticos: [cantidad]
🟡 Hallazgos moderados: [cantidad]
🟢 Hallazgos bajo: [cantidad]

GUARDIAS ACTIVADAS:
⚠️ Guardia 1 (nómina): [SÍ/NO]
⚠️ Guardia 2 (contratos): [SÍ/NO]
⚠️ Guardia 3 (inconsistencias): [SÍ/NO]
⚠️ Guardia 4 (fechas de vigencia): [SÍ/NO]
⚠️ Guardia 5 (errores aritméticos): [SÍ/NO]

ÁREAS ANALIZADAS:
✓ Seguridad Social (EPS, AFP, ARL, Caja)
✓ Derecho Laboral (Contratos, salario, prestaciones)
✓ Políticas y Capacitación

NORMATIVA CONSULTADA:
✓ Código Sustantivo del Trabajo (CST)
✓ Ley 100 de 1993 (Sistema Integral de Seguridad Social)
✓ Decreto 1072 de 2015 (Decreto Único Reglamentario)
✓ [Otras normas según hallazgos]

ARCHIVO 02-DIAGNOSTICO.md: [GENERADO/PENDIENTE]

CERTIFICACIÓN FINAL:
  ✅ DIAGNÓSTICO COMPLETO (todos documentos analizados)
  ⚠️ PARCIAL (información faltante: [especificar])
  🔴 INCOMPLETO (documentación crítica faltante)
  🚫 RECHAZADO (documentos ilegibles/inconsistentes)

RESPONSABILIDADES:
- Hallazgos están basados en documentos aportados
- Diagnóstico es análisis técnico, NO es concepto jurídico formal
- Recomendaciones deben ser validadas con abogado especialista antes de implementar
- Próximo paso: 03-RECOMENDACIONES.md

═══════════════════════════════════════════════════════════════════
```

---

**Responsable**: Jorge Ángel Cortés Cartagena (T.P. 365.594)  
**Bufete**: Cortés Cartagena, Medellín, Colombia — 2026
