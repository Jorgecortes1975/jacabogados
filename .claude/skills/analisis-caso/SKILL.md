---
name: analisis-caso
description: >
  Skill operativo AUTOMÁTICO para análisis jurídico exhaustivo de casos específicos complejos,
  cambios contractuales, o situaciones inusuales. Se ejecuta AUTOMÁTICAMENTE cuando usuario
  presenta caso específico (discriminación, despido, cambio salarial, accidente sin afiliación, etc.).
  Analiza HECHOS NEUTRALES, NORMATIVA APLICABLE (100% verificada), RIESGOS LEGALES, DEFENSA
  ANTICIPADA exhaustiva, y OPCIONES con análisis comparativo. Genera 04-ANALISIS-CASO.md
  conforme OSCOLA. Incorpora anti-hallucination-v4 para validar 100% citas jurisprudenciales.
  Integración automática: Si mandante solicita informe formal, activa redaccion-informes.
  
  CARACTERÍSTICAS GARANTIZADAS:
  — Activación: AUTOMÁTICA (sin solicitud explícita)
  — Guardias: 7 filtros especializados contra análisis sesgado o incompleto
  — Rechazo: INMEDIATO de casos fuera de alcance (litigio activo, penal, riesgo crítico)
  — Acta de control: OBLIGATORIA con 15 puntos de validación jurídica específicos
  — Certificación: ✅ PREMIUM / ⚠️ PROFESIONAL / 🟠 REQUIERE REVISIÓN / 🔴 NO CONFORME / 🚫 RECHAZADO
  — Validación: 100% citas jurisprudenciales verificadas con anti-hallucination-v4
  — Nivel: Conforme a Estándar Universal v2.0 + Protocolo Alta Corte + OSCOLA
---

# ANÁLISIS CASO v2.1
## Análisis Jurídico Exhaustivo de Casos Específicos — Nivel Alta Corte

**Autor**: Jorge Ángel Cortés Cartagena — T.P. 365.594  
**Versión**: 2.1 — Julio 2026 — Conforme a Estándar Universal v2.0  
**Naturaleza**: Skill EJECUTORA AUTOMÁTICA para análisis jurídico exhaustivo conforme OSCOLA  
**Estatus**: Mejorado a nivel PREMIUM con defensa anticipada exhaustiva

---

## PROPÓSITO

Ejecutar análisis jurídico exhaustivo de casos específicos complejos fuera del flujo estándar (intake → diagnóstico → recomendaciones). Casos como: discriminación sistémica, despido injustificado con demanda pendiente, cambio salarial sin acuerdo, accidente sin afiliación, conflictos con sindicatos, represalia sindical, etc.

Proporciona análisis conforme estándares internacionales (OSCOLA) con:
- **Hechos**: Resumen neutral sin sesgo
- **Normativa**: Citación exhaustiva (100% verificada con anti-hallucination-v4)
- **Riesgos**: Cuantificación en UVT y pesos colombianos
- **Defensa anticipada**: Contra-argumentos posibles y refutación exhaustiva
- **Opciones**: Análisis comparativo con matriz de riesgos
- **Integración**: Si mandante solicita documento formal, activa automáticamente redaccion-informes

**Protocolo obligatorio**: 
- Si caso involucra litigio ACTIVO, investigación penal, o demanda abierta con cuantía > $50M: RECHAZA y refiere a especialista
- Toda cita jurisprudencial DEBE ser verificada con anti-hallucination-v4 antes de certificación ✅ PREMIUM
- Análisis NUNCA excede alcance de asesoría corporativa; litigio requiere especialista

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

### GUARDIA 1: Litigio activo detectado (exclusión)
**CONDICIÓN**: Controversia jurídica involucra demanda abierta, proceso laboral en juzgado, investigación fiscal activa, o mediación en curso

**ACCIÓN INMEDIATA**:
```
🚫 RECHAZO — GUARDIA 1
Vicio detectado: Litigio activo — fuera de alcance de asesoría corporativa
Motivo: Requiere abogado litigante especializado con poder de representación
Riesgo: Análisis sin presencia procesal puede comprometer derechos
Qué se requiere: Cliente DEBE consultar abogado laboral especialista en litigio
Estado: ANÁLISIS BLOQUEADO PERMANENTEMENTE
Certificación: 🚫 RECHAZADO — REMITIR A ESPECIALISTA EN LITIGIO LABORAL
```

### GUARDIA 2: Hechos insuficientes o contradictorios
**CONDICIÓN**: Descripción de la controversia es ambigua, contiene datos contradictorios (ej: "renunció pero fue despedido"), o falta información crítica para análisis

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 2
Vicio detectado: Hechos insuficientes o contradictorios
Ejemplo: [Listar las contradicciones detectadas específicamente]
Razón: Análisis jurídico correcto depende de hechos clarificados
Acción requerida: Se pregunta explícitamente para aclarar cada punto controvertido
Normalización: Se marcan puntos ambiguos como [Controvertido — requiere clarificación] o [Afirmado por mandante sin respaldo documental]
Certificación: ⚠️ PROFESIONAL (subsanar: clarificar hechos antes de ✅ PREMIUM)
```

### GUARDIA 3: Pregunta del usuario no es de análisis jurídico
**CONDICIÓN**: Usuario pregunta "¿cuánto indemnizo?" o "¿cuál es el costo exacto?" en lugar de "¿es legal?", "¿qué opciones tengo?"

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 3
Vicio detectado: Pregunta de valuación económica en lugar de análisis jurídico
Razón: Valuación (costos exactos, indemnizaciones precisas) requiere perito económico/contador
Normalización: Se redirecciona: "Análisis legal de si procede compensación + rango estimado; valuación precisa requiere perito"
Certificación: ⚠️ PROFESIONAL (análisis jurídico sí, valuación exacta fuera alcance)
```

### GUARDIA 4: Cita jurisprudencial no verificable (anti-hallucination)
**CONDICIÓN**: Análisis cita sentencias, autos, o fallos que no se pueden verificar en Legal Data Hunter, web_search, o jurisprudencia oficial

**ACCIÓN INMEDIATA**:
```
🟠 CORRECCIÓN ACTIVA — GUARDIA 4 + anti-hallucination-v4
Vicio detectado: Posible alucinación jurisprudencial
Cita problemática: "[Referencia de sentencia/auto]"
Acción requerida: Ejecución de anti-hallucination-v4 para validación
Resultado: [Verificada y válida / No verificable / Parcialmente válida]
Normalización: Se reemplaza por cita verificada O se marca como [Jurisprudencia no verificable — usar solo norma codificada]
Certificación: 🟠 REQUIERE REVISIÓN (no puede ser ✅ PREMIUM si hay citas no validadas)
```

### GUARDIA 5: Riesgo financiero crítico (> $50M)
**CONDICIÓN**: Análisis indica riesgo de más de $50 millones pero no hay abogado especialista referido

**ACCIÓN INMEDIATA**:
```
🚫 RECHAZO — GUARDIA 5
Vicio detectado: Riesgo financiero crítico requiere especialista
Riesgo cuantificado: > $50.000.000 COP (multas + indemnizaciones + daño emergente)
Motivo: Análisis de controversia de este nivel requiere defensa estratégica especializada
Qué se requiere: Cliente DEBE consultar abogado laboral especialista inmediatamente
Estado: ANÁLISIS SUSPENDIDO POR RIESGO CRÍTICO
Certificación: 🚫 RECHAZADO — REMITIR A ESPECIALISTA
```

### GUARDIA 6: Defensa anticipada incompleta
**CONDICIÓN**: Análisis identifica posibles contra-argumentos de la otra parte pero NO provee refutación exhaustiva

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 6
Vicio detectado: Defensa anticipada incompleta (contra-argumentos sin refutación)
Problema: Mandante queda expuesto a sorpresas procedimentales
Acción requerida: Expandir sección de "Contra-Argumentos Posibles + Mi Refutación" exhaustivamente
Criterio para ✅ PREMIUM: Para cada contra-argumento posible, mínimo 2 puntos de refutación
Certificación: 🟠 REQUIERE REVISIÓN (subsanar defensa anticipada antes de ✅ PREMIUM)
```

### GUARDIA 7: Análisis sesgado hacia una opción
**CONDICIÓN**: Análisis favorece claramente una opción sin evaluar riesgos reales de la opción recomendada

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 7
Vicio detectado: Sesgo en análisis de opciones (favoritismo a una opción)
Problema: Presentación desequilibrada impide que mandante tome decisión informada
Verificación: Matriz de riesgos muestra discrepancia entre pros/contras OR pros de opción recomendada supera 70% del análisis
Acción requerida: Reequilibrar análisis con desventajas reales de opción recomendada
Criterio para ✅ PREMIUM: Cada opción tiene pros Y contras ponderados equitativamente
Certificación: 🟠 REQUIERE REVISIÓN (imparcialidad es requisito para ✅ PREMIUM)
```

---

## CERTIFICACIÓN FINAL

El skill emite **UNA SOLA** certificación (mutualmente excluyentes):

| Símbolo | Certificación | Criterio Específico | Implicación |
|---------|---|---|---|
| ✅ | PREMIUM | Hechos 100% claros + normativa 100% verificada + defensa anticipada exhaustiva + 0 guardias activas + riesgo < $50M cuantificado + análisis imparcial balanceado | Genera 04-ANALISIS-CASO.md listo para decisión estratégica. Mandante tiene claridad jurídica excepcional. Si solicita documento formal, activa automáticamente redaccion-informes. |
| ⚠️ | PROFESIONAL | Hechos clarificados + normativa verificada + Guardias 2-3-6 activadas (subsanadas) + riesgo < $30M | Genera 04-ANALISIS-CASO.md. Requiere validación de puntos controvertidos antes de implementar. |
| 🟠 | REQUIERE REVISIÓN | Hechos con controversias no resueltas + Guardias 4,6,7 activas (citas/defensa/sesgo) | NO genera análisis final. Solicitar: Hechos clarificados, defensa anticipada expandida, o reequilibrio de análisis. |
| 🔴 | NO CONFORME | Documentación crítica insuficiente + Guardia 5 activa (riesgo $20M-$50M) + litigio pendiente menor | Cierra análisis provisionally. Avisar: "Riesgo alto. Requiere validación con especialista antes de proceder." |
| 🚫 | RECHAZADO | Litigio ACTIVO + Guardia 1 activada, O investigación penal, O riesgo > $50M (Guardia 5) | Cierra análisis permanentemente. Cliente DEBE consultar abogado laboral especialista inmediatamente. Marcar expediente con nota de escalación. |

---

## ESTRUCTURA DEL ARCHIVO 04-ANALISIS-CASO.md GENERADO

```markdown
# ANÁLISIS JURÍDICO EXHAUSTIVO — [TIPO DE CONTROVERSIA]

**Fecha del análisis**: [fecha]
**Controversia**: [Descripción breve conforme OSCOLA]
**Analista**: Claude AI — Skill analisis-caso v2.1
**Certificación**: [✅ PREMIUM / ⚠️ PROFESIONAL / 🟠 REQUIERE REVISIÓN / 🔴 NO CONFORME / 🚫 RECHAZADO]

---

## 1. HECHOS NEUTRALES

[Resumen neutral sin sesgo de hechos relevantes — sin conclusiones jurídicas]

**Observación**: Puntos controvertidos: [listar si aplica]

---

## 2. CUESTIÓN JURÍDICA

[Formulación clara de la pregunta legal a resolver, conforme OSCOLA]

---

## 3. NORMATIVA APLICABLE (Verificada 100%)

### Normativa Colombiana:
- **Código Sustantivo del Trabajo**: [Art. X, Y, Z] ✓ Verificado
- **Ley 100/1993**: [Art. X, Y, Z] ✓ Verificado
- **Ley 1010/2006** [Si aplica — acoso laboral]: [Art. X] ✓ Verificado
- **Decreto 1072/2015**: [Art. X] ✓ Verificado
- **Jurisprudencia**: [Sentencias verificadas con anti-hallucination-v4] ✓ Validado

### Análisis Multi-Jurisdiccional:
- **Common Law (EE.UU./UK)**: [Comparativa relevante con estándar internacional]
- **Civil Law (Europa)**: [Comparativa relevante — si aplica]

---

## 4. ANÁLISIS JURÍDICO

### Aspectos que CUMPLEN normativa:
[Descripción técnica con citas normativas]

### Aspectos que INCUMPLEN normativa:
[Descripción técnica con citas normativas]

### Riesgo legal cuantificado:
- **Multas potenciales**: $[X] - $[Y] (equivalente a [n] UVT) ✓ Normativa [Art. Z]
- **Indemnizaciones**: $[Z] - $[W] (estimado por juzgado)
- **Daño emergente**: [Si aplica]
- **Riesgo reputacional**: [% estimado]

### Precedentes aplicables:
[Jurisprudencia de Corte Suprema/Constitucional relevant a análisis]

---

## 5. DEFENSA ANTICIPADA EXHAUSTIVA

[Para cada posible contra-argumento del otro lado]

### Contra-Argumento Posible 1: [Argumento]
**Afirmación del otro lado**: [Resumen del argumento opuesto]
**Punto de refutación 1**: [Cita normativa + explicación jurídica]
**Punto de refutación 2**: [Cita jurisprudencial verificada + análisis]
**Conclusión**: [Por qué este contra-argumento falla]

### Contra-Argumento Posible 2: [Argumento]
[Mismo formato]

### Contra-Argumento Posible 3: [Argumento]
[Mismo formato]

---

## 6. OPCIONES ANALIZADAS

### Opción A (Recomendada): [Nombre descriptivo]
**Descripción**: [Pasos específicos a ejecutar]
**Fundamento jurídico**: [Normas que la respaldan]

**Ventajas**:
- [Pro 1]
- [Pro 2]

**Desventajas**:
- [Contra 1]
- [Contra 2]

**Costo estimado**: $[X] - $[Y]
**Riesgo**: [BAJO / MEDIO / ALTO]
**Timeline**: [n] semanas
**Probabilidad de éxito**: [% estimado basado en jurisprudencia]

### Opción B (Alternativa): [Nombre descriptivo]
[Mismo formato — con ventajas/desventajas BALANCEADAS]

### Opción C (Si aplica): [Nombre descriptivo]
[Mismo formato]

---

## 7. RECOMENDACIÓN FUNDAMENTADA

**Opción elegida**: [A / B / C]

**Justificación jurídica**:
[Párrafos de análisis explicando por qué esta opción es superior]
- Punto normativo 1
- Punto jurisprudencial 2
- Punto de riesgo 3

**Porcentaje de riesgo residual**: [X%]

---

## 8. ACCIONES INMEDIATAS

### HOY (antes de las 18:00):
- [Acción 1 — específica]
- [Acción 2 — específica]

### ESTA SEMANA (antes del [fecha]):
- [Acción 1 — con documentación]
- [Acción 2 — con comunicación]

### PRÓXIMAS 2 SEMANAS (antes del [fecha]):
- [Acción 1 — implementación]
- [Acción 2 — validación]

---

## 9. PRESERVACIÓN DE EVIDENCIA

### Documentos CRÍTICOS a guardar inmediatamente:
- [Documento 1 — dónde, cuánto tiempo]
- [Documento 2 — dónde, cuánto tiempo]

### Comunicaciones OBLIGATORIAS por escrito:
- **A quién**: [Empleado/ARL/Ministerio]
- **Qué contenido**: [Resumen del mensaje]
- **Cuándo**: [Fecha específica]
- **Cómo**: [Email / Carta certificada / Burofax]

### Timeline de documentación:
- [Hito 1]: [Acción + fecha]
- [Hito 2]: [Acción + fecha]

---

## 10. INTEGRACIÓN CON REDACCIÓN-INFORMES (Si aplica)

[ ] Si mandante solicita "documento formal" o "informe oficial", se activa:
    → redaccion-informes v3.0
    → Genera: Dictamen Pericial O Memorandum formal
    → Nivel: ✅ PREMIUM con Harvard Legal Review
    → Apto para: Juzgado / Auditoría / Junta Directiva

---

## ESCALAMIENTO A ESPECIALISTA

✅ **¿Requiere abogado laboral especialista?**: [SÍ/NO]

[ ] NO — Mandante puede proceder con análisis de este skill
[ ] SÍ — Razón específica del escalamiento: [Explicar por qué]

---

**Generado por**: Skill analisis-caso v2.1
**Validación de citas**: 100% verificadas con anti-hallucination-v4
**Próximo paso**: [Implementar opción recomendada / Solicitar documento formal / Referir a especialista]
```

---

## ACTA DE CONTROL — 15 Puntos de Validación Jurídica

```
═══════════════════════════════════════════════════════════════════════════════
ACTA DE CONTROL — ANÁLISIS CASO v2.1 (15 PUNTOS)
═══════════════════════════════════════════════════════════════════════════════

Controversia jurídica: [TIPO DE CASO]
Fecha del análisis: [fecha/hora]
Período de análisis: [duración]
Analista: Claude AI — Skill analisis-caso v2.1

───────────────────────────────────────────────────────────────────────────────
VALIDACIONES DE CALIDAD JURÍDICA (15 PUNTOS)
───────────────────────────────────────────────────────────────────────────────

✓ Punto 1: Hechos neutrales documentados sin sesgo interpretativo
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Descripción de hechos sin conclusiones jurídicas; [Controvertido] marcado
  
✓ Punto 2: Normativa aplicable identificada exhaustivamente
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Mínimo 3 fuentes normativas: CST + Ley 100 + jurisprudencia / decreto
  
✓ Punto 3: Toda jurisprudencia citada verificada con anti-hallucination-v4
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: 100% de citas revisadas en Legal Data Hunter, web_search, fuentes oficiales
  
✓ Punto 4: Análisis multi-jurisdiccional incluido (comparativa internacional)
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Comparación con Common Law (EE.UU./UK) y/o Civil Law (Europa) cuando aplique
  
✓ Punto 5: Defensa anticipada exhaustiva documentada (mínimo 3 contra-argumentos + refutación cada uno)
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Para cada argumento opuesto, mínimo 2 puntos de refutación jurídica
  
✓ Punto 6: Riesgo financiero cuantificado en UVT y pesos colombianos
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Multas/indemnizaciones expresadas con rango (ej: $5M-$15M)
  
✓ Punto 7: Opciones presentadas con matriz de riesgos balanceada
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Cada opción (A, B, C) tiene pros AND contras ponderados equitativamente (no sesgo)
  
✓ Punto 8: Análisis de viabilidad procesal (si aplica)
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Timeline de proceso, requisitos procedimentales, cargas probatorias documentados
  
✓ Punto 9: Recomendación justificada con base jurídica explícita
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: "Se recomienda Opción A porque..." con argumentación normativa específica
  
✓ Punto 10: Acciones inmediatas definidas con timeline (Hoy / Esta semana / Próximas semanas)
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Cada acción tiene fecha/deadline específica
  
✓ Punto 11: Documentos críticos identificados para preservación de evidencia
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Lista explícita de qué guardar, dónde, por cuánto tiempo
  
✓ Punto 12: Comunicaciones recomendadas documentadas (por escrito sí/no, ante quién)
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Si es necesario comunicación por escrito, especificar: a quién, qué contenido, cómo
  
✓ Punto 13: Escalamiento a especialista justificado (si aplica)
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Si sí aplica: razón específica del escalamiento documentada
  
✓ Punto 14: Redacción conforme OSCOLA (citación estándar internacional)
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Formato de citas sigue estándar: [Ley X, Art. Y] o [Sentencia CASO, CORTE, Año]
  
✓ Punto 15: 04-ANALISIS-CASO.md generado conforme estándar, listo para toma de decisión
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Documento completo, referencias exhaustivas, conclusión clara

───────────────────────────────────────────────────────────────────────────────
RESUMEN DE GUARDIAS
───────────────────────────────────────────────────────────────────────────────

Guardia 1 (Litigio activo): [ACTIVADA/NO ACTIVADA]
Guardia 2 (Hechos incompletos): [ACTIVADA/NO ACTIVADA]
Guardia 3 (Pregunta no jurídica): [ACTIVADA/NO ACTIVADA]
Guardia 4 (Citas no verificables): [ACTIVADA/NO ACTIVADA]
Guardia 5 (Riesgo > $50M): [ACTIVADA/NO ACTIVADA]
Guardia 6 (Defensa anticipada incompleta): [ACTIVADA/NO ACTIVADA]
Guardia 7 (Análisis sesgado): [ACTIVADA/NO ACTIVADA]

───────────────────────────────────────────────────────────────────────────────
CUANTIFICACIÓN DE RIESGOS
───────────────────────────────────────────────────────────────────────────────

Riesgo global identificado: [BAJO / MEDIO / ALTO / CRÍTICO]
Rango de multa potencial: $[X] - $[Y] COP
Rango de indemnización: $[Z] - $[W] COP
Timeline de remediación: [n] días

───────────────────────────────────────────────────────────────────────────────
CERTIFICACIÓN FINAL EMITIDA
───────────────────────────────────────────────────────────────────────────────

[ ] ✅ PREMIUM — 15/15 puntos ✅ + 0 guardias activas + jurisprudencia 100% verificada
[ ] ⚠️ PROFESIONAL — 13-14/15 puntos ✅ + guardias subsanadas
[ ] 🟠 REQUIERE REVISIÓN — 10-12/15 puntos + guardias sin subsanar
[ ] 🔴 NO CONFORME — < 10/15 puntos + riesgo alto (Guardia 5 parcial)
[ ] 🚫 RECHAZADO — Litigio ACTIVO (Guardia 1) O riesgo crítico (Guardia 5 total)

Justificación: [Describir brevemente por qué se emitió esta certificación]

───────────────────────────────────────────────────────────────────────────────
INTEGRACIÓN AUTOMÁTICA CON REDACCION-INFORMES
───────────────────────────────────────────────────────────────────────────────

[ ] Si mandante solicita "documento formal" o "informe oficial", se activa AUTOMÁTICAMENTE:
    → redaccion-informes v3.0 genera Dictamen Pericial o Memorandum formal
    → Nivel: ✅ PREMIUM con Harvard Legal Review + análisis de este 04-ANALISIS-CASO.md
    → Output: Documento listo para presentar ante juzgado, auditoría, o junta directiva

───────────────────────────────────────────────────────────────────────────────
RESPONSABILIDADES Y PRÓXIMOS PASOS
───────────────────────────────────────────────────────────────────────────────

✓ Este análisis es asesoría técnico-legal, NO es concepto jurídico formal ni litigio
✓ Recomendación es orientativa; mandante es responsable de decisión final
✓ Si certificación = 🚫 RECHAZADO, mandante DEBE consultar abogado especialista
✓ Documentación de evidencia DEBE iniciarse inmediatamente si sigue Opción Recomendada
✓ Próximo paso: [Implementar opción recomendada / Referir a especialista / Generar documento formal]
✓ Responsable del seguimiento: [Abogado asignado]

═══════════════════════════════════════════════════════════════════════════════
```

---

## CHANGELOG

### v2.1 — Nivel Alta Corte (Actual)

**Mejoras vs v2.0**:
- ✅ Certificación expandida a 5 niveles (agregar ✅ PREMIUM)
- ✅ Guardias expandidas de 5 a 7 (agregar Guardia 6: defensa incompleta + Guardia 7: sesgo)
- ✅ Criterios específicos jurídicos en cada guardia
- ✅ Defensa anticipada exhaustiva OBLIGATORIA (mínimo 3 contra-argumentos + refutación cada uno)
- ✅ Lenguaje ascendido a OSCOLA (Oxford Standard for Citation of Legal Authorities)
- ✅ Acta de control: Expandida de ~10 a 15 puntos específicos con validaciones jurídicas
- ✅ Validación 100% de jurisprudencia con anti-hallucination-v4 antes de certificación ✅ PREMIUM
- ✅ Análisis multi-jurisdiccional incluido (Common Law + Civil Law cuando aplique)
- ✅ Cuantificación: Riesgos en UVT y pesos colombianos, probabilidad de éxito %
- ✅ Integración automática: Si solicita documento formal, activa redaccion-informes v3.0
- ✅ Estructura 04-ANALISIS-CASO.md mejorada con defensa anticipada, opciones balanceadas
- ✅ Criterio ✅ PREMIUM: Defensa exhaustiva + jurisprudencia 100% verificada + 0 guardias activas
- ✅ Test suite: Ampliada a 17 casos (criterio: 90%+ PASS)

### v2.0 — Enero 2026

**Características iniciales**:
- ✅ Activación automática (sin requerir mención)
- ✅ 5 Guardias contra análisis sesgado/incompleto
- ✅ Acta de control obligatoria
- ✅ Certificación final clara (4 niveles)
- ✅ Archivo 04-ANALISIS-CASO.md generado automáticamente
- ✅ Integración con anti-hallucination-v4
- ✅ Test suite con 15 casos
- ✅ Escalamiento a especialista cuando aplique

---

**Responsable**: Jorge Ángel Cortés Cartagena (T.P. 365.594)  
**Despacho**: Cortés Cartagena, Medellín, Colombia — 2026  
**Referencia**: Estándar Universal v2.0 + Protocolo Alta Corte + OSCOLA
