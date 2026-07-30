# PLAN DE MEJORAS — Todos Skills a v2.1 (Nivel Alta Corte)
## Cambios Específicos + Implementación Secuencial

**Fecha**: 2026-07-13  
**Versiones Objetivo**: v2.1 para 5 skills (redaccion-informes permanece v3.0 PREMIUM)  
**Alcance**: Nivel Alta Corte + Bufetes Internacionales  
**Timeline**: 7 días

---

## SKILL 1: intake-cliente v2.1

### Cambios Específicos

#### 1. YAML Header (Línea 15)
**ANTES**:
```yaml
— Certificación: ✅ INTAKE COMPLETO / ⚠️ PARCIAL / 🔴 INCOMPLETO / 🚫 RECHAZADO
```

**DESPUÉS**:
```yaml
— Certificación: ✅ PREMIUM / ⚠️ PROFESIONAL / 🟠 REQUIERE REVISIÓN / 🔴 NO CONFORME / 🚫 RECHAZADO
— Validación: 15 puntos de calidad en acta de control
— Nivel Objetivo: Alta Corte + Bufetes Internacionales
```

#### 2. Sección CERTIFICACIÓN (Nueva estructura)

**AGREGAR después de "FAIL-SAFE"**:

```markdown
## CERTIFICACIÓN FINAL — 5 Niveles

| Símbolo | Certificación | Criterio | Implicación |
|---------|---|---|---|
| ✅ | PREMIUM | 7/7 preguntas respondidas + NIT válido + decisor verificable + servicios claros + datos excepcionales coherentes | Genera 01-INTAKE.md listo para diagnóstico inmediato |
| ⚠️ | PROFESIONAL | 6/7 preguntas respondidas O datos mínimos completos | Genera 01-INTAKE.md; completar faltantes en próximo contacto |
| 🟠 | REQUIERE REVISIÓN | 5/7 preguntas respondidas O datos mínimos incompletos | Genera 01-INTAKE.md con [s/d]; requiere validación antes de diagnóstico |
| 🔴 | NO CONFORME | <5/7 preguntas respondidas O NIT/decisor/servicios faltantes | NO genera archivo; requiere reintento de intake |
| 🚫 | RECHAZADO | Cliente no colabora O información incoherente (empresa de 1 persona pero 20 empleados) | Cierra intake; requiere re-calificación de cliente |
```

#### 3. Acta de Control Expandida a 15 Puntos

**REEMPLAZAR sección "ACTA DE CONTROL"**:

```markdown
## ACTA DE CONTROL — 15 Puntos de Validación

═══════════════════════════════════════════════════════════════════
ACTA DE CONTROL — INTAKE CLIENTE v2.1
═══════════════════════════════════════════════════════════════════

Entrada procesada: Nuevo cliente [EMPRESA]
Fecha de procesamiento: [fecha/hora]
Versión: v2.1 (Nivel Alta Corte)

EVALUACIÓN DE 15 PUNTOS DE CALIDAD:

1. ✅ Nombre empresa: [Completo y sin ambigüedad]
2. ✅ NIT: [Formato válido: 10-11 dígitos, verificado]
3. ✅ Sector económico: [Específico con CIIU según Cámara de Comercio]
4. ✅ Ubicación: [Municipio específico + departamento, no genérico]
5. ✅ Decisor identificado: [Nombre + cargo + rol específico]
6. ✅ Email decisor: [Formato válido, verificado]
7. ✅ Teléfono decisor: [Formato +57 válido, alternativa si email falla]
8. ✅ Total empleados: [Número específico, no rango aproximado]
9. ✅ Empleados formales: [Número coherente vs total]
10. ✅ Sistemas seguridad social: [SÍ/NO/NO SÉ explícito para cada uno]
11. ✅ Servicios requeridos: [Específicos, no genéricos (ej: "auditoría de afiliaciones EPS" no "auditoría")]
12. ✅ Urgencia: [Inmediato/Corto/Mediano con contexto]
13. ✅ Riesgos abiertos: [Documentados si existen, o "Sin riesgos conocidos" si ninguno]
14. ✅ Coherencia: [Datos no contradictorios (ej: empleados formales < total)]
15. ✅ Siguiente paso: [Cliente entiende qué sigue: "Diagnóstico en 2-3 días"]

GUARDIAS ACTIVADAS:
⚠️ Guardia 1 (datos empresa): [SÍ/NO]
⚠️ Guardia 2 (decisor contacto): [SÍ/NO]
⚠️ Guardia 3 (riesgos): [SÍ/NO]
⚠️ Guardia 4 (servicios): [SÍ/NO]

EVALUACIÓN TÉCNICA:
Preguntas respondidas: [n/7]
Datos mínimos (NIT, decisor, servicios): [SÍ/NO]
Coherencia interna: [SÍ/NO — sin contradicciones]
Archivo 01-INTAKE.md: [GENERADO/PENDIENTE]

CERTIFICACIÓN FINAL:
  ✅ PREMIUM (7/7 + datos excepcionales)
  ⚠️ PROFESIONAL (6/7 + datos mínimos OK)
  🟠 REQUIERE REVISIÓN (5/7 + falta información)
  🔴 NO CONFORME (<5/7 O falta crítica)
  🚫 RECHAZADO (cliente no colabora)

IMPACTO LEGAL:
— NIT válido: Permite abrir expediente formal ante reguladores
— Decisor verificable: Garantiza cadena de comunicación
— Servicios claros: Delimita alcance de retención
— Coherencia: Indica cliente confiable para procesamiento

RESPONSABILIDADES:
— Intake es RECOPILACIÓN INICIAL, no análisis
— Datos deben validarse con cliente antes de usar en documentos oficiales
— Si hay [s/d], hacer seguimiento en próximo contacto
— Próximo step: Solicitar documentos para diagnóstico

═══════════════════════════════════════════════════════════════════
```

#### 4. Lenguaje Mejorado (Nivel Alta Corte)

**REVISAR TODO el documento reemplazando**:
```
❌ "Cliente nuevo"       → ✅ "Nuevo cliente legal"
❌ "Datos de empresa"    → ✅ "Identificación legal de persona jurídica"
❌ "Contacto decisor"    → ✅ "Contacto verificable del decisor autorizado"
❌ "Empleados"           → ✅ "Personal vinculado (formal/informal/contratistas)"
❌ "Servicios"           → ✅ "Servicios especializados requeridos"
❌ "Urgencia"            → ✅ "Clasificación temporal de requerimiento"
❌ "Riesgos abiertos"    → ✅ "Contingencias jurídicas conocidas"
```

#### 5. Guardias Mejoradas (Más específicas)

**Reemplazar cada guardia con versión mejorada**:

```markdown
### GUARDIA 1: Identificación legal incompleta o inválida
**CONDICIÓN**: Falta NIT O NIT inválido (no es 10-11 dígitos) O sector sin CIIU O ubicación ambigua

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 1
Defecto detectado: Identificación legal de persona jurídica incompleta
Fragmento faltante: [NIT | Sector específico CIIU | Ubicación municipal]
Riesgo legal: Sin NIT válido, expediente no es aceptado por autoridades
Texto reencuadrado: Se solicita reexplícitamente [campos específicos]
Nota: NIT formato: 10-11 dígitos; Sector: CIIU de Cámara Comercio; Ubicación: municipio + depto
Requisito para generar: TODOS los datos de identificación deben estar 100% completos
Certificación: ⚠️ PROFESIONAL si se subsana / 🔴 NO CONFORME si no se puede validar
```
```

### GUARDIA 2: Contacto de decisor incompleto o no verificable
**CONDICIÓN**: Falta email O teléfono O nombre del decisor no coincide con cargo

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 2
Defecto detectado: Contacto de decisor autorizado no verificable
Fragmento faltante: [Email válido | Teléfono formato +57 | Nombre/Cargo coinciden]
Riesgo operacional: Sin contacto verificable, imposible comunicar avances
Validación email: Formato debe ser [nombre]@[empresa].[dominio] (no genérico)
Validación teléfono: Formato +57[área][número] o celular 3XX-XXXXXXX
Nota: Mínimo AMBOS (email + teléfono); si uno falla, validar el otro
Requisito para generar: Decisor debe ser identificable y contactable en próximas 24 horas
Certificación: ⚠️ PROFESIONAL si se subsana / 🔴 NO CONFORME si contacto no verificable
```
```

### GUARDIA 3: Riesgos jurídicos no declarados o evasivos
**CONDICIÓN**: Respuesta a "¿hay riesgos?" es "no sé", "no se aplica" sin aclaración, o cliente omite inspecciones/litigios conocidos

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 3
Defecto detectado: Declaración de riesgos jurídicos incompleta
Riesgo legal: Omisión de litigio activo u inspección puede exponer a JA Abogados
Reinterpretación: "[Afirmado por cliente] — No hay riesgos jurídicos conocidos" O "[Documentado] — Inspección pendiente MinTrabajo [fecha]"
Validación: Si cliente dice "no sé", solicitar explícitamente: "¿Ha recibido comunicación de MinTrabajo, sindicato, o empleados con amenaza de demanda en últimos 12 meses?"
Nota: CUALQUIER respuesta "no sé" debe reemplazarse por SÍ o NO luego de aclaración
Requisito para generar: Riesgos deben estar SÍ o NO, nunca ambiguo
Certificación: ⚠️ PROFESIONAL si se clarifica / 🔴 NO CONFORME si ambigüedad permanece
```
```

### GUARDIA 4: Servicios requeridos no específicos o genéricos
**CONDICIÓN**: Pregunta 5 sin respuesta clara O cliente dice "todo" / "auditoría" sin especificar cuál

**ACCIÓN INMEDIATA**:
```
🔴 CORRECCIÓN ACTIVA — GUARDIA 4
Defecto detectado: Servicios solicitados sin especificidad operativa
Vicio: Cliente dice "auditoría" pero NO especifica si es de afiliaciones, nómina, contratos, etc.
Riesgo: Sin servicios claros, no se puede estimar costo, timeline, especialista requerido
Reencuadramiento: "¿Cuál es el SERVICIO PRINCIPAL que necesita?" + seguimiento con opciones:
  → "¿Auditoría de cumplimiento en qué área? (Afiliaciones / Nómina / Contratos / Seguridad)"
  → "¿Formalización significa qué? (Crear contratos nuevos / Ajustar existentes / Ambas)"
  → "¿Asesoría en cambios laborales para quién? (1 empleado específico / múltiples / política general)"
Nota: Mínimo 1 servicio ESPECÍFICO debe estar claro; máximo pueden haber 3 servicios
Requisito para generar: Servicios deben ser accionables (se entiende qué se va a hacer)
Certificación: ⚠️ PROFESIONAL si se especifica / 🔴 NO CONFORME si permanece genérico
```
```

---

## SKILL 2: diagnostico-cliente v2.1

### Cambios Clave

1. **Certificación a 5 niveles**: Agregar ✅ PREMIUM (si 0 hallazgos críticos perdidos + 100% normativa vigente)
2. **Acta a 15 puntos**: Validación normativa, errores detectados, documentos analizados, etc.
3. **Anti-hallucination integrado**: Marcar en acta si citas fueron validadas
4. **Análisis comparativo**: Agregar análisis de "cómo lo haría un bufete internacional"
5. **Lenguaje Alta Corte**: Reemplazar "hallazgos" por "incumplimientos normativo identificados"

**Cambio de Header**:
```yaml
— Certificación: ✅ PREMIUM / ⚠️ PROFESIONAL / 🟠 REQUIERE REVISIÓN / 🔴 NO CONFORME / 🚫 RECHAZADO
— Validación: 15 puntos de calidad normativa + anti-hallucination-v4
— Análisis: Multi-jurisdiccional (Colombia + Derecho Comparado)
```

---

## SKILL 3: analisis-caso v2.1

### Cambios Clave

1. **Certificación a 5 niveles**: ✅ PREMIUM si jurisprudencia 100% verificada
2. **Acta a 15 puntos**: Verificación de cada cita, precedentes, jurisprudencia internacional
3. **Defensa anticipada mejorada**: Guardia 7 expandida a análisis exhaustivo
4. **Redacción integrada**: Automatizar llamada a redaccion-informes si cliente solicita documento
5. **Lenguaje Alta Corte**: "Análisis jurídico exhaustivo" no "análisis de caso"

**Cambio de Header**:
```yaml
— Certificación: ✅ PREMIUM / ⚠️ PROFESIONAL / 🟠 REQUIERE REVISIÓN / 🔴 NO CONFORME / 🚫 RECHAZADO
— Validación: 15 puntos + verificación jurisprudencial 100% + anti-alucinación obligatoria
— Integración: Llamada automática a redaccion-informes si cliente necesita documento
```

---

## SKILL 4: recomendaciones-cliente v2.1

### Cambios Clave

1. **Certificación a 5 niveles**: ✅ PREMIUM si presupuesto 100% desglosado + timeline realista validado
2. **Acta a 15 puntos**: Validación presupuestal, coherencia timeline-acciones, análisis ROI
3. **Impacto financiero**: Agregar análisis de "costo de no hacer nada" vs "costo de implementar"
4. **Validación de experto**: ¿Es realista 20 acciones en 1 semana? Sistema calcula y avisa
5. **Lenguaje Alta Corte**: "Plan de remediación normativa" no "recomendaciones"

**Cambio de Header**:
```yaml
— Certificación: ✅ PREMIUM / ⚠️ PROFESIONAL / 🟠 REQUIERE REVISIÓN / 🔴 NO CONFORME / 🚫 RECHAZADO
— Validación: 15 puntos jurídicos + presupuestal + timeline + ROI
— Análisis: Impacto financiero (costo de implementación vs costo de incumplimiento)
```

---

## SKILL 5: anti-hallucination-v4 v4.2

### Cambios Clave

1. **Certificación mejorada**: Expansión a jurisprudencia internacional
2. **Acta a 15 puntos**: Matriz de confianza (Alto/Medio/Bajo), cobertura por país, limitaciones
3. **Multi-jurisdiccional**: No solo Colombia, también Common Law y Civil Law
4. **Documentación de confianza**: Cada cita marca nivel de confianza en su validación
5. **Idiomas adicionales**: Validar citas en inglés y español europeo

**Cambio de Header**:
```yaml
— Certificación: ✅ PREMIUM / ⚠️ PROFESIONAL / 🟠 REQUIERE REVISIÓN / 🔴 NO CONFORME / 🚫 RECHAZADO
— Validación: 15 puntos + matriz de confianza (Alto/Medio/Bajo) + multi-jurisdiccional
— Cobertura: Colombia + Common Law (EE.UU., UK) + Civil Law (Europa) + Idiomas
```

---

## PROCESO DE IMPLEMENTACIÓN

### Orden de Actualización (Secuencial - Evitar confusión):

1. **Día 1**: Actualizar intake-cliente v2.1
   - Commit: "intake-cliente v2.1 — Nivel Alta Corte con 5 certificaciones + 15 puntos"

2. **Día 2**: Actualizar diagnostico-cliente v2.1
   - Commit: "diagnostico-cliente v2.1 — Premium certification + multi-jurisdiccional"

3. **Día 3**: Actualizar analisis-caso v2.1
   - Commit: "analisis-caso v2.1 — Jurisprudencia validada + integración redacción"

4. **Día 4**: Actualizar recomendaciones-cliente v2.1
   - Commit: "recomendaciones-cliente v2.1 — ROI analysis + presupuestal validado"

5. **Día 5**: Actualizar anti-hallucination-v4 v4.2
   - Commit: "anti-hallucination-v4 v4.2 — Multi-jurisdiccional + matriz confianza"

6. **Día 6**: Crear integración automática
   - Commit: "INTEGRACIÓN AUTOMÁTICA — 6 skills coordinados en flujo único"

7. **Día 7**: Validación integral + documentación
   - Commit: "VALIDACIÓN COMPLETA — 102 test cases ejecutados + SOP"

---

## BENEFICIOS ESPERADOS

Al completar estos cambios:

✅ Todos 6 skills al mismo nivel de calidad (61/61 items)
✅ Certificación ✅ PREMIUM disponible en todos (si cumplen criterios)
✅ 15 puntos de validación específicos por dominio
✅ Lenguaje nivel Alta Corte en 100% de documentos
✅ Análisis multi-jurisdiccional (donde aplica)
✅ Integración automática (flujo sin gaps)
✅ Equivalencia técnica con bufetes internacionales

**Status Post-Mejoras**: ✅ PRODUCCIÓN NIVEL ALTA CORTE

---

**Documento Referencia**: AUDITORIA-COMPLETA-6-SKILLS-NIVEL-ALTA-CORTE.md  
**Próximo Paso**: Iniciar Día 1 con actualización intake-cliente v2.1
