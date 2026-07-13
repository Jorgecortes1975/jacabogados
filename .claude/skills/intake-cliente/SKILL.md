---
name: intake-cliente
description: >
  Skill operativo AUTOMÁTICO para recopilación estructurada de datos de clientes
  nuevos en servicios de Seguridad Social y Derecho Laboral. Se ejecuta
  AUTOMÁTICAMENTE cuando se recibe solicitud de nuevo cliente. Hace 7 preguntas
  guiadas (empresa, decisor, empleados, seguridad social, servicios, urgencia,
  casos abiertos). Genera archivo 01-INTAKE.md listo para implementación.
  
  CARACTERÍSTICAS GARANTIZADAS:
  — Activación: AUTOMÁTICA (sin mención explícita)
  — Guardias: 4 filtros contra datos incompletos o inservibles
  — Rechazo: INMEDIATO si información crítica falta
  — Acta de control: OBLIGATORIA con datos recopilados
  — Certificación: ✅ INTAKE COMPLETO / ⚠️ PARCIAL / 🔴 INCOMPLETO / 🚫 RECHAZADO
  — Fail-safe: Si usuario no responde preguntas, marca [s/d] (sin dato)
---

# INTAKE CLIENTE v2.0
## Recopilación Estructurada de Datos de Cliente Nuevo

**Autor**: Jorge Ángel Cortés Cartagena — T.P. 365.594  
**Versión**: 2.0 — Julio 2026 — Conforme a Estándar Universal de Skills  
**Naturaleza**: Skill EJECUTORA AUTOMÁTICA para onboarding de clientes

---

## PROPÓSITO

Recopilar información estructurada de cliente nuevo en el proceso de onboarding del bufete Cortés Cartagena. Sustituye cuestionarios desestructurados con flujo sistemático de 7 preguntas guiadas que capturan datos esenciales para:
- Identificación de empresa
- Contacto de decisor
- Escala operacional
- Estado actual de seguridad social
- Servicios requeridos
- Urgencia y riesgos inmediatos

**Regla absoluta**: Todo cliente nuevo DEBE pasar por intake formal. No se inicia proyecto sin 01-INTAKE.md en expediente.

---

## ACTIVACIÓN — Automática y Obligatoria

Este skill se ejecuta **AUTOMÁTICAMENTE cada vez que**:
1. Usuario comunica llegada de cliente nuevo (correo, WhatsApp, llamada)
2. Usuario dice "nuevo cliente", "cliente potencial", "quieren servicios"
3. Usuario aporta datos iniciales de empresa (nombre, NIT, contacto)

NO requiere mención explícita. Activación es INCONDICIONAL.

---

## OPERACIONES EN SECUENCIA OBLIGATORIA

Cuando se activa, ejecuta en este orden:

1. **PASO 1 — RECEPCIÓN**: Identifica que hay cliente nuevo
2. **PASO 2 — PRESENTACIÓN**: Explica qué es el intake (7 preguntas, 20-30 min)
3. **PASO 3 — PREGUNTA 1-7**: Formula cada pregunta en orden (una por una)
4. **PASO 4 — CAPTURA DE RESPUESTAS**: Registra respuesta a cada pregunta
5. **PASO 5 — VALIDACIÓN**: Verifica que datos mínimos estén completos
6. **PASO 6 — GENERACIÓN**: Crea archivo 01-INTAKE.md en formato markdown
7. **PASO 7 — ACTA DE CONTROL**: Emite acta con datos capturados

---

## LAS 7 PREGUNTAS OBLIGATORIAS

**Pregunta 1: Identificación de Empresa**
```
¿Nombre de empresa, NIT, sector económico y ubicación?
Ejemplo: "Telepatía, 123456789-0, IA/Tecnología, Medellín"
```

**Pregunta 2: Datos del Decisor**
```
¿Nombre, cargo, email y teléfono de la persona que toma decisiones?
Ejemplo: "María García, Directora RH, maria@telepatia.co, 3001234567"
```

**Pregunta 3: Escala de Personal**
```
¿Cuántos empleados tiene? (totales, formales, informales, contratistas)
Ejemplo: "10 totales, 8 formales, 2 contratistas"
```

**Pregunta 4: Seguridad Social Actual**
```
¿Qué sistemas tiene? (EPS, AFP, ARL, Caja de Compensación - sí/no/no sé)
Ejemplo: "EPS: Sí, AFP: No, ARL: Sí, Caja: No"
```

**Pregunta 5: Servicios Requeridos**
```
¿Qué servicios necesita? (marca múltiples si aplica)
- Auditoría de cumplimiento
- Formalización de empleados
- Reforma de nómina
- Asesoría en cambios laborales
- Conflicto laboral abierto
- Capacitación
- Otro (especificar)
```

**Pregunta 6: Urgencia**
```
¿Cuál es la urgencia?
- Inmediato (< 1 semana)
- Corto plazo (1-2 semanas)
- Mediano plazo (1-2 meses)
```

**Pregunta 7: Riesgos Inmediatos**
```
¿Hay casos abiertos, inspecciones, o empleados sin afiliación?
Ejemplo: "Inspección pendiente de MinTrabajo, 2 empleados sin EPS"
```

---

## GUARDIAS AUTOMÁTICAS — Detención Inmediata

### GUARDIA 1: Datos de empresa incompletos
**CONDICIÓN**: Falta NIT, sector, o ubicación de empresa

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 1
Vicio detectado: Datos de empresa incompletos
Fragmento faltante: [NIT | Sector | Ubicación]
Razón: Sin NIT no se puede abrir expediente formal
Texto reencuadrado: Se solicita reexplícitamente al usuario
Nota: No se genera 01-INTAKE.md hasta tener NIT completo
Certificación: ⚠️ PARCIAL (subsanar datos faltantes)
```

### GUARDIA 2: Decisor sin contacto
**CONDICIÓN**: Falta email o teléfono del decisor

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 2
Vicio detectado: Contacto de decisor incompleto
Fragmento faltante: [Email | Teléfono]
Razón: Sin contacto no se puede comunicar progreso
Texto reencuadrado: Se solicita reexplícitamente
Nota: Mínimo: email O teléfono (preferible ambos)
Certificación: ⚠️ PARCIAL (subsanar antes de generar archivo)
```

### GUARDIA 3: Pregunta 7 completamente evasiva
**CONDICIÓN**: Respuesta a "¿hay riesgos/casos abiertos?" es "no sé", "no se aplica", o no responde

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 3
Vicio detectado: Información de riesgos no explicitada
Razón: Riesgos inmediatos son críticos para timeline
Texto reencuadrado: Se reinterpreta como "[Afirmado] — Cliente dice no tener casos abiertos"
Nota: Si hay casos, son críticos y afectan prioridad
Certificación: ⚠️ PARCIAL si no se clarifica (marcar como [s/d] y avisar)
```

### GUARDIA 4: Servicios no especificados
**CONDICIÓN**: Pregunta 5 sin respuesta clara o con "todo" / "no sé"

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 4
Vicio detectado: Servicios solicitados sin especificidad
Razón: Sin servicios claros no se puede estimar costo/timeline
Texto reencuadrado: Se pregunta nuevamente: "¿Cuál es el PRINCIPAL servicio que necesita?"
Nota: Mínimo 1 servicio claro debe estar especificado
Certificación: ⚠️ PARCIAL (subsanar especificidad de servicios)
```

---

## PROTOCOLO DE REENCUADRE (Si aplica)

Cuando dato es unclear o ambiguo:

```
CORRECCIÓN ACTIVA
Hallazgo detectado: [Dato ambiguo o incompleto]
Fragmento original: "[Respuesta como vino]"
Razón de la corrección: [Normalización según estándar]
Dato reencuadrado: "[Versión estandarizada o clarificada]"
Nota: [Si hay duda, se marca [s/d] — sin dato — y se pide aclaración]
```

**Ejemplos**:
- Empresa: "Telepatía" → Normalizado: "Telepatía S.A.S."
- Empleados: "Como 15" → Normalizado: "[Afirmado] 15 empleados (aproximado)"
- EPS: "Creo que Sanitas" → Normalizado: "[No verificado] Cliente indica EPS Sanitas"

---

## CERTIFICACIÓN FINAL

El skill emite **UNA SOLA** certificación:

| Símbolo | Certificación | Criterio | Implicación |
|---------|---|---|---|
| ✅ | INTAKE COMPLETO | 7/7 preguntas respondidas + datos mínimos OK | Genera 01-INTAKE.md listo para expediente |
| ⚠️ | PARCIAL | 6/7 preguntas respondidas O datos mínimos incompletos | Genera 01-INTAKE.md con [s/d] en campos faltantes |
| 🔴 | INCOMPLETO | <5/7 preguntas respondidas O NIT/decisor/servicios faltantes | NO genera archivo; pide completar |
| 🚫 | RECHAZADO | Cliente se rehúsa a responder, o información es falsa/inconsistente | Cierra intake; requiere revalidación del cliente |

---

## FAIL-SAFE — Si Usuario No Responde Preguntas

Si usuario no responde una pregunta:
- Se marca como `[s/d]` (sin dato)
- Se genera 01-INTAKE.md PERO con certificación ⚠️ PARCIAL o 🔴 INCOMPLETO
- Se avisa al usuario: "Falta información de Pregunta X. Intenta obtenerla en próximo contacto."
- Se declara explícitamente en acta: "Cliente no proporcionó datos en X preguntas"

**Nunca se genera ✅ COMPLETO si hay preguntas sin respuesta.**

---

## ESTRUCTURA DEL ARCHIVO 01-INTAKE.md GENERADO

```markdown
# INTAKE — [NOMBRE EMPRESA]

**Fecha de intake**: [fecha]
**Registrado por**: Claude/AI
**Versión del intake**: 2.0

---

## 1. IDENTIFICACIÓN DE EMPRESA

- **Nombre**: [Respuesta P1]
- **NIT**: [Respuesta P1]
- **Sector económico**: [Respuesta P1]
- **Ubicación**: [Respuesta P1]

---

## 2. DATOS DEL DECISOR

- **Nombre**: [Respuesta P2]
- **Cargo**: [Respuesta P2]
- **Email**: [Respuesta P2]
- **Teléfono**: [Respuesta P2]

---

## 3. ESCALA DE PERSONAL

- **Total de empleados**: [Respuesta P3]
- **Formales**: [Respuesta P3]
- **Informales**: [Respuesta P3]
- **Contratistas**: [Respuesta P3]

---

## 4. SEGURIDAD SOCIAL ACTUAL

| Sistema | Estado |
|---------|--------|
| EPS | [Respuesta P4] |
| AFP | [Respuesta P4] |
| ARL | [Respuesta P4] |
| Caja Compensación | [Respuesta P4] |

---

## 5. SERVICIOS REQUERIDOS

[Respuesta P5 — lista de servicios marcados]

---

## 6. URGENCIA

- **Nivel**: [Respuesta P6]
- **Implicación**: [Automatizado basado en selección]

---

## 7. RIESGOS/CASOS ABIERTOS

- **Descripción**: [Respuesta P7]
- **Clasificación de riesgo**: [Automatizado: CRÍTICO/MODERADO/BAJO]

---

## PRÓXIMOS PASOS

1. **Paso 1**: [Recomendación basada en servicios]
2. **Paso 2**: [Recomendación basada en urgencia]
3. **Paso 3**: [Recomendación basada en riesgos]

---

**Generado por**: Skill intake-cliente v2.0
**Próximo paso**: Solicitar documentos para diagnóstico (02-DIAGNOSTICO.md)
```

---

## ACTA DE CONTROL — Cierre Obligatorio

```
═══════════════════════════════════════════════════════════════════
ACTA DE CONTROL — INTAKE CLIENTE v2.0
═══════════════════════════════════════════════════════════════════

Entrada procesada: Nuevo cliente [EMPRESA]
Fecha de procesamiento: [fecha/hora]

INDICADORES DE RIESGO:
🔴 Riesgos críticos identificados: [SÍ/NO — lista si aplica]
🟡 Datos incompletos: [Número de campos con [s/d]]
🟢 Intake completo y consistente: [SÍ/NO]

GUARDIAS ACTIVADAS:
⚠️ Guardia 1 (datos empresa): [SÍ/NO]
⚠️ Guardia 2 (decisor contacto): [SÍ/NO]
⚠️ Guardia 3 (riesgos): [SÍ/NO]
⚠️ Guardia 4 (servicios): [SÍ/NO]

EVALUACIÓN TÉCNICA:
Preguntas respondidas: [n/7]
Datos mínimos (NIT, decisor, servicios): [SÍ/NO]
Archivo 01-INTAKE.md: [GENERADO/PENDIENTE]

CAMPOS INCOMPLETOS (si aplica):
[Lista de Preguntas que tienen [s/d]]

CERTIFICACIÓN FINAL:
  ✅ INTAKE COMPLETO (7/7 preguntas)
  ⚠️ PARCIAL (6/7 o datos incompletos)
  🔴 INCOMPLETO (<5/7 preguntas)
  🚫 RECHAZADO (cliente no colabora)

RESPONSABILIDADES:
- Este intake es de RECOPILACIÓN INICIAL, no de análisis
- Los datos deben ser validados con cliente antes de usar en documentos oficiales
- Si hay [s/d], hacer seguimiento con cliente para obtener información
- Próximo paso: Solicitar documentos para diagnóstico

═══════════════════════════════════════════════════════════════════
```

---

## INTEGRACIÓN CON FLUJO LEXA-LAB

```
1. INTAKE CLIENTE (este skill) ← Genera 01-INTAKE.md
                    ↓
2. DIAGNOSTICO (skill diagnostico-cliente) ← Lee 01-INTAKE.md + documentos
                    ↓
3. ANÁLISIS CASO (skill analisis-caso) ← Si hay casos específicos
                    ↓
4. RECOMENDACIONES (skill recomendaciones-cliente) ← Plan de acción
                    ↓
5. IMPLEMENTACIÓN (JAC directamente)
```

---

## CHANGELOG v2.0

**Mejoras vs v1.0**:
- ✅ Activación automática (sin requerir mención)
- ✅ 4 Guardias contra datos incompletos
- ✅ Acta de control obligatoria
- ✅ Certificación final clara (4 niveles)
- ✅ Archivo 01-INTAKE.md generado automáticamente
- ✅ Protocolo [s/d] para datos sin información
- ✅ Test suite con 12 casos
- ✅ Integración con flujo LEXA-LAB

---

**Responsable**: Jorge Ángel Cortés Cartagena (T.P. 365.594)  
**Bufete**: Cortés Cartagena, Medellín, Colombia — 2026
