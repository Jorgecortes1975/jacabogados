---
name: analisis-caso
description: >
  Skill operativo AUTOMÁTICO para análisis jurídico de casos específicos complejos,
  cambios contractuales, o situaciones inusuales. Se ejecuta AUTOMÁTICAMENTE cuando
  usuario presenta caso específico (discriminación, despido, cambio salarial, accidente
  sin afiliación, etc.). Analiza HECHOS, NORMATIVA APLICABLE, RIESGOS LEGALES, y
  OPCIONES con pros/contras. Genera 04-ANALISIS-CASO.md con recomendación final y
  acciones inmediatas. Incorpora anti-hallucination-v4 para validar citas jurisprudenciales.
  
  CARACTERÍSTICAS GARANTIZADAS:
  — Activación: AUTOMÁTICA (sin solicitud explícita)
  — Guardias: 5 filtros contra análisis sesgado o incompleto
  — Rechazo: INMEDIATO de casos fuera de alcance (litigio activo, penal, etc.)
  — Acta de control: OBLIGATORIA con opciones y recomendación
  — Certificación: ✅ ANÁLISIS COMPLETO / ⚠️ PARCIAL / 🔴 REQUIERE ESPECIALISTA / 🚫 RECHAZADO
  — Validación: Ejecuta anti-hallucination-v4 en citas jurisprudenciales
---

# ANÁLISIS CASO v2.0
## Análisis Jurídico de Casos Específicos

**Autor**: Jorge Ángel Cortés Cartagena — T.P. 365.594  
**Versión**: 2.0 — Julio 2026 — Conforme a Estándar Universal  
**Naturaleza**: Skill EJECUTORA AUTOMÁTICA para análisis de casos

---

## PROPÓSITO

Analizar casos específicos complejos que salen del flujo estándar (intake → diagnóstico → recomendaciones). Casos como: discriminación, despido injustificado, cambio salarial sin acuerdo, accidente sin afiliación, conflictos con sindicatos, etc. Proporciona análisis con HECHOS, NORMATIVA, RIESGOS, OPCIONES y RECOMENDACIÓN.

**Regla absoluta**: Si caso involucra litigio activo, investigación penal, o demanda abierta, se RECHAZA y refiere a especialista.

---

## ACTIVACIÓN — Automática y Obligatoria

Este skill se ejecuta **AUTOMÁTICAMENTE cada vez que**:
1. Usuario presenta "caso de...", "situación de...", "problema laboral..."
2. Usuario describe conflicto específico entre empresa y empleado
3. Usuario pregunta "¿es legal esto?" sobre acción laboral específica
4. Usuario aporta documentos (email, comunicado, contrato) con pregunta legal

NO requiere mención explícita.

---

## OPERACIONES EN SECUENCIA OBLIGATORIA

1. **PASO 1 — IDENTIFICACIÓN**: Clasifica tipo de caso
2. **PASO 2 — REVISAR HECHOS**: Lee y resume hechos de forma neutral
3. **PASO 3 — IDENTIFICAR NORMATIVA**: Cita artículos específicos del CST, Ley 100, etc.
4. **PASO 4 — VALIDAR CITAS**: Ejecuta anti-hallucination-v4 en jurisprudencia
5. **PASO 5 — ANALIZAR**: Conexión hechos ↔ norma; riesgos; costos
6. **PASO 6 — OPCIONES**: Presenta Opción A + Opción B con pros/contras
7. **PASO 7 — RECOMENDACIÓN**: Elige opción + justificación
8. **PASO 8 — ACCIONES**: Pasos concretos hoy/semana/próximas semanas
9. **PASO 9 — ACTA DE CONTROL**: Emite acta con análisis

---

## GUARDIAS AUTOMÁTICAS — Detención Inmediata

### GUARDIA 1: Litigio activo detectado
**CONDICIÓN**: Caso involucra demanda abierta, proceso laboral en juzgado, investigación fiscal

**ACCIÓN INMEDIATA**:
```
🚫 RECHAZO — GUARDIA 1
Motivo: Caso fuera de alcance de servicios corporativos
Riesgo: Requiere abogado litigante especializado
Qué se requiere: Refiera a abogado especialista en laboral litigioso
Estado: ANÁLISIS BLOQUEADO
Certificación: 🚫 RECHAZADO — REFERIR A ESPECIALISTA
```

### GUARDIA 2: Hechos insuficientes o contradictorios
**CONDICIÓN**: Descripción del caso es ambigua, tiene datos contradictorios, o falta información crítica

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 2
Vicio detectado: Hechos incompletos o contradictorios
Ejemplo: "Empleado dice fue despedido sin causa, pero también dice renunció"
Razón: Análisis correcto depende de hechos claros
Texto reencuadrado: Se pregunta explícitamente para aclarar
Nota: Se marcan puntos ambiguos como [Controvertido] o [Afirmado]
Certificación: ⚠️ PARCIAL (subsanar: clarificar hechos)
```

### GUARDIA 3: Pregunta del usuario no es jurídica
**CONDICIÓN**: Usuario pregunta "¿cuánto le debo pagar?" (costo) en lugar de "¿es legal?"

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 3
Vicio detectado: Pregunta no es de análisis jurídico sino de valuación
Razón: Valuación (costos, indemnizaciones exactas) requiere especialista
Texto reencuadrado: Se redirecciona: "Análisis legal de si procede compensación; costo exacto requiere especialista"
Certificación: ⚠️ PARCIAL (análisis sí, valuación requiere otro)
```

### GUARDIA 4: Cita jurisprudencial no verificable
**CONDICIÓN**: Análisis cita sentencias que no se pueden verificar en Legal Data Hunter

**ACCIÓN INMEDIATA**:
```
🟠 CORRECCIÓN ACTIVA — GUARDIA 4 + anti-hallucination-v4
Vicio detectado: [Alucinación jurisprudencial — ver acta de anti-hallucination-v4]
Acción: Se reemplaza cita por norma verificada O se marca como [No verificado]
Certificación: 🟠 REQUIERE REVISIÓN (cita juridica debe ser validada)
```

### GUARDIA 5: Riesgo > $50M y no hay especialista referido
**CONDICIÓN**: Análisis indica riesgo de más de $50 millones pero usuario no tiene abogado especialista

**ACCIÓN INMEDIATA**:
```
🚫 RECHAZO — GUARDIA 5
Motivo: Caso de riesgo muy alto requiere especialista
Riesgo detectado: [riesgo > $50M]
Qué se requiere: Cliente debe consultar abogado laboral especialista
Estado: ANÁLISIS SUSPENDIDO POR RIESGO ALTO
Certificación: 🚫 RECHAZADO — REFERIR A ESPECIALISTA
```

---

## CERTIFICACIÓN FINAL

| Símbolo | Certificación | Criterio | Implicación |
|---------|---|---|---|
| ✅ | ANÁLISIS COMPLETO | Hechos claros + normativa verificada + riesgo < $50M | Genera 04-ANÁLISIS-CASO.md; cliente puede tomar decisión |
| ⚠️ | PARCIAL | Hechos clarificados pero con [Controvertido] O cita jurisprudencial pendiente | Genera archivo; aclarar puntos contradictorios antes de actuar |
| 🔴 | REQUIERE ESPECIALISTA | Caso es complejo, múltiples opciones, o riesgo alto | NO genera análisis final; referir a especialista |
| 🚫 | RECHAZADO | Litigio activo, investigación penal, riesgo > $50M | Cierra análisis; cliente DEBE consultar abogado especialista |

---

## ESTRUCTURA DEL ARCHIVO 04-ANALISIS-CASO.md GENERADO

```markdown
# ANÁLISIS — [TIPO DE CASO]

**Fecha del análisis**: [fecha]
**Caso**: [Descripción breve del caso]
**Analista**: Claude/AI — Skill analisis-caso v2.0

---

## 1. HECHOS

[Resumen neutral de hechos relevantes — sin interpretación jurídica]

---

## 2. NORMATIVA APLICABLE

- **Código Sustantivo del Trabajo**: [Artículos específicos]
- **Ley 100/1993**: [Artículos específicos]
- **Ley 1010/2006**: [Si aplica — acoso laboral]
- **Jurisprudencia**: [Sentencias verificadas]

---

## 3. ANÁLISIS

### ¿Qué está bien?
[Aspectos del caso que cumplen normativa]

### ¿Qué está mal?
[Aspectos del caso que incumplen normativa]

### Riesgo legal concreto:
[Qué podría pasarle a la empresa: multa, demanda, indemnización, etc.]

### Costo potencial:
[Estimación de multa, indemnización, o costo legal]

---

## 4. OPCIONES

### Opción A (Recomendada): [Nombre]
**Descripción**: [Qué se hace]
**Pros**: [Ventajas]
**Contras**: [Desventajas]
**Costo**: [$X]
**Riesgo**: [BAJO / MEDIO / ALTO]

### Opción B (Alternativa): [Nombre]
**Descripción**: [Qué se hace]
**Pros**: [Ventajas]
**Contras**: [Desventajas]
**Costo**: [$X]
**Riesgo**: [BAJO / MEDIO / ALTO]

---

## 5. MI RECOMENDACIÓN

**Opción elegida**: [A / B]
**Justificación**: [Por qué esta opción es mejor]

---

## 6. ACCIONES INMEDIATAS

### Hoy:
- [Acción 1]
- [Acción 2]

### Esta semana:
- [Acción 1]
- [Acción 2]

### Próximas semanas:
- [Acción 1]
- [Acción 2]

---

## 7. EVIDENCIA

### Documentos a guardar:
- [Lista de documentos]

### Comunicaciones por escrito:
- [Qué comunicar por escrito al empleado, ARL, etc.]

### Cuándo documentar:
- [Timeline de documentación]

---

## ESCALAMIENTO

⚠️ **¿Requiere especialista?**: [SÍ/NO]  
**Razón**: [Si aplica]

---

**Generado por**: Skill analisis-caso v2.0
**Próximo paso**: [Si es SÍ, referir a especialista. Si es NO, proceder con opción recomendada]
```

---

## ACTA DE CONTROL — Cierre Obligatorio

```
═══════════════════════════════════════════════════════════════════
ACTA DE CONTROL — ANÁLISIS CASO v2.0
═══════════════════════════════════════════════════════════════════

Caso analizado: [TIPO DE CASO]
Fecha del análisis: [fecha]
Riesgo identificado: [BAJO / MEDIO / ALTO / CRÍTICO]

GUARDIAS ACTIVADAS:
⚠️ Guardia 1 (litigio activo): [SÍ/NO → Si SÍ: RECHAZADO]
⚠️ Guardia 2 (hechos incompletos): [SÍ/NO]
⚠️ Guardia 3 (pregunta no jurídica): [SÍ/NO]
⚠️ Guardia 4 (cita no verificable): [SÍ/NO]
⚠️ Guardia 5 (riesgo > $50M): [SÍ/NO → Si SÍ: RECHAZADO]

NORMATIVA CONSULTADA:
✓ CST: [Artículos específicos]
✓ Ley 100: [Artículos específicos]
✓ Jurisprudencia: [Validadas mediante anti-hallucination-v4]

ANÁLISIS:
Hechos: [claridad de hechos]
Normativa: [número de artículos aplicables]
Opciones presentadas: [Opción A / Opción B]
Recomendación: [Opción elegida]

RIESGO POTENCIAL:
Costo estimado: [$X]
Tipo de riesgo: [Multa / Demanda / Indemnización]

ESCALAMIENTO A ESPECIALISTA: [SÍ/NO]
Razón: [Si aplica]

CERTIFICACIÓN FINAL:
  ✅ ANÁLISIS COMPLETO (hechos claros + normativa verificada)
  ⚠️ PARCIAL (hechos con controversias pendientes)
  🔴 REQUIERE ESPECIALISTA (caso complejo o riesgo alto)
  🚫 RECHAZADO (litigio activo / riesgo crítico)

RESPONSABILIDADES:
- Este análisis es técnico-legal, NO es concepto formal de abogado
- Si resultado es RECHAZADO, cliente DEBE consultar especialista
- Recomendación es orientativa; cliente decide si actuar
- Próximo paso: [Implementar opción recomendada / Referir a especialista]

═══════════════════════════════════════════════════════════════════
```

---

**Responsable**: Jorge Ángel Cortés Cartagena (T.P. 365.594)  
**Bufete**: Cortés Cartagena, Medellín, Colombia — 2026
