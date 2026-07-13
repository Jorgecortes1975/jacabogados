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
  — Guardias: 5 filtros especializados contra datos incompletos o incoherentes
  — Rechazo: INMEDIATO si información crítica falta o es contradictoria
  — Acta de control: OBLIGATORIA con 15 puntos de validación específicos
  — Certificación: ✅ PREMIUM / ⚠️ PROFESIONAL / 🟠 REQUIERE REVISIÓN / 🔴 NO CONFORME / 🚫 RECHAZADO
  — Validación: Formato NIT, email, teléfono, coherencia de datos
  — Nivel: Conforme a Estándar Universal v2.0 + Criterios Alta Corte
  — Fail-safe: Si usuario no responde preguntas, marca [s/d] (sin dato)
---

# INTAKE CLIENTE v2.1
## Recopilación Estructurada de Datos de Cliente — Nivel Alta Corte

**Autor**: Jorge Ángel Cortés Cartagena — T.P. 365.594  
**Versión**: 2.1 — Julio 2026 — Conforme a Estándar Universal de Skills v2.0  
**Naturaleza**: Skill EJECUTORA AUTOMÁTICA para onboarding de clientes con validación Alta Corte  
**Estatus**: Mejorado a nivel PREMIUM con 15 puntos de validación

---

## PROPÓSITO

Recopilar información estructurada del mandante nuevo en el proceso de onboarding del despacho Cortés Cartagena. Sustituye cuestionarios desestructurados con flujo sistemático de 7 preguntas guiadas que capturan datos esenciales para:
- **Identificación jurídica** de la persona moral/jurídica mandante
- **Contacto verificado** de autoridad competente para decisiones
- **Escala operacional** (personal dependiente e independiente)
- **Estado actual de afiliación** en sistemas de seguridad social
- **Servicios solicitados** con especificidad clara
- **Urgencia operativa** y riesgos inmediatos

**Protocolo obligatorio**: Todo mandante nuevo DEBE pasar por intake formal conforme a este protocolo. No se inicia encargo profesional sin 01-INTAKE.md debidamente documentado en expediente.

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

### GUARDIA 1: Identificación jurídica incompleta o inválida
**CONDICIÓN**: Falta nombre empresa, NIT inválido (no 12 dígitos), sector CIIU no especificado, o ubicación municipal ambigua

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 1
Vicio detectado: Identificación jurídica de mandante incompleta
Fragmentos específicos faltantes: [Nombre | NIT válido | Sector CIIU | Ubicación municipal]

Verificaciones:
  ✓ NIT: Debe ser 12 dígitos (formato: 123456789-0)
  ✓ Nombre: Debe incluir razón social completa o persona natural
  ✓ Sector CIIU: Código de clasificación (ej: 6201, 6810, etc.)
  ✓ Ubicación: Municipio y departamento (ej: Medellín, Antioquia)

Razón: Sin identificación jurídica válida no se puede abrir expediente formal
Acción requerida: Se solicita información completa y verificable
Nota: No se genera 01-INTAKE.md hasta obtener datos válidos
Certificación: 🟠 REQUIERE REVISIÓN (subsanar antes de continuar)
```

### GUARDIA 2: Contacto de autoridad competente inefectivo
**CONDICIÓN**: Falta nombre del decisor, email sin formato válido, o teléfono incompleto

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 2
Vicio detectado: Contacto de autoridad competente inefectivo
Fragmentos específicos faltantes: [Nombre decisor | Email válido | Teléfono verificable]

Verificaciones:
  ✓ Nombre: Persona natural completa (nombre y apellido mínimo)
  ✓ Email: Formato válido (xxx@dominio.com o .co, .com.co, etc.)
  ✓ Teléfono: Mínimo 10 dígitos, formato +57 o 60X-XXXXXXX

Razón: Sin contacto verificable no se puede comunicar avances ni tomar decisiones conjuntas
Acción requerida: Se solicita contacto primario verificable (email O teléfono, preferible ambos)
Certificación: 🟠 REQUIERE REVISIÓN (subsanar antes de continuar)
```

### GUARDIA 3: Escala operacional incoherente
**CONDICIÓN**: Total de empleados no coincide con suma de formales + informales + contratistas, O número de empleados no es validable

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 3
Vicio detectado: Escala operacional incoherente
Condición detectada: Total ≠ (Formales + Informales + Contratistas)

Verificación: 
  Ejemplo válido: 15 totales = 8 formales + 4 informales + 3 contratistas ✓
  Ejemplo inválido: 15 totales = 8 formales + 10 informales [SUMA EXCEDE] ✗

Razón: Incoherencia indica datos no validados con mandante
Acción requerida: Se solicita revalidación de número de empleados
Acción automática: Se marca cada elemento con [s/d] hasta aclaración
Certificación: 🟠 REQUIERE REVISIÓN (coherencia de datos)
```

### GUARDIA 4: Servicios solicitados ambiguos o insuficientes
**CONDICIÓN**: Pregunta 5 sin respuesta clara, con "todo", "lo que sea necesario", o sin especificar al menos 1 servicio

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 4
Vicio detectado: Servicios solicitados sin especificidad legal
Condición detectada: Respuesta genérica, ambigua o incompleta

Verificación: Debe seleccionar MÍNIMO 1 de estos:
  ✓ Auditoría de conformidad normativa
  ✓ Formalización de vinculación laboral
  ✓ Reforma y actualización de nómina
  ✓ Asesoría en modificaciones contractuales
  ✓ Gestión de conflicto laboral abierto
  ✓ Capacitación especializada
  ✓ Otro (especificar)

Razón: Sin servicios claros no se puede estimar honorarios, timeline ni asignación de especialista
Acción requerida: Se pregunta nuevamente: "¿Cuál es el PRINCIPAL servicio de asesoría que solicita?"
Certificación: 🟠 REQUIERE REVISIÓN (especificidad de servicios)
```

### GUARDIA 5: Riesgos no documentados o coherencia imposible
**CONDICIÓN**: Respuesta a Pregunta 7 es "no sé", "no se aplica", [s/d], o hay contradicción (ej: "0 empleados" PERO "caso abierto de MinTrabajo")

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 5
Vicio detectado: Información de riesgos inmediatos no documentada o contradictoria
Condición detectada: Evasión, omisión, o contradicción lógica en datos

Verificación de coherencia:
  ✓ Si tiene empleados → Debe afirmar o negar EPS/AFP/ARL
  ✓ Si niega casos abiertos → Debe ser coherente con sector de riesgo
  ✓ Si marca "Urgencia inmediata" → Debe documentar riesgo específico
  ✓ Si niega riesgos → Certificación NO puede ser ✅ PREMIUM (datos limitados)

Razón: Riesgos inmediatos determinan urgencia, timeline y costo
Acción automática: Se reinterpreta como "[Afirmado por mandante] — Sin casos abiertos reportados"
Nota: Ausencia de riesgo reportado ≠ Ausencia de riesgo real (verificar en diagnóstico)
Certificación: ⚠️ PROFESIONAL (datos tomados en fe pero requieren verificación en diagnóstico)
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

El skill emite **UNA SOLA** certificación (mutualmente excluyentes):

| Símbolo | Certificación | Criterio Específico | Implicación |
|---------|---|---|---|
| ✅ | PREMIUM | 7/7 preguntas + Todas guardias PASAN + NIT válido + Email verificable + Coherencia de datos 100% + Servicios claros + Riesgos documentados | Genera 01-INTAKE.md listo para diagnóstico. Datos excepcionales, mandante bien documentado, sin retrasos. |
| ⚠️ | PROFESIONAL | 6-7/7 preguntas + Guardias 2-4 activadas una vez (subsanadas) + Datos mínimos presentes pero imperfectos | Genera 01-INTAKE.md con [s/d] en máximo 2 campos. Requiere validación en diagnóstico. |
| 🟠 | REQUIERE REVISIÓN | 5-6/7 preguntas + Guardias 1,3,5 activadas (datos incompletos/incoherentes) + Falta identificación jurídica clara O servicios no especificados | NO genera 01-INTAKE.md. Solicitar revalidación de Preguntas críticas (1,2,5). Continuar solo cuando se subsanen. |
| 🔴 | NO CONFORME | <5/7 preguntas respondidas O NIT/Decisor/Servicios fundamentalmente faltantes + Guardia 5 activa y NO aclarada | Cierra intake. Avisar mandante: "Información incompleta para proceder. Requiere revalidación antes de continuar." |
| 🚫 | RECHAZADO | Mandante se rehúsa a responder preguntas críticas, O información es manifiestamente falsa/contradictoria, O datos no son verificables | Cierra intake permanentemente. Requiere escalado a decisor (Jorge Ángel Cortés). Marcar expediente con nota de rechazo. |

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

## ACTA DE CONTROL — 15 Puntos de Validación Específica

```
═══════════════════════════════════════════════════════════════════════════════
ACTA DE CONTROL — INTAKE CLIENTE v2.1 (15 PUNTOS)
═══════════════════════════════════════════════════════════════════════════════

Mandante procesado: [RAZÓN SOCIAL / PERSONA NATURAL]
Fecha de procesamiento: [fecha/hora]
Registrado por: Claude AI — Skill intake-cliente v2.1

───────────────────────────────────────────────────────────────────────────────
VALIDACIONES DE CALIDAD (15 PUNTOS)
───────────────────────────────────────────────────────────────────────────────

✓ Punto 1: Nombre empresa/razón social completa registrado
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Contiene nombre legal completo (no "empresa X")
  
✓ Punto 2: NIT validado (formato 12 dígitos + dígito verificador)
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Cumple XX-XXXXXXXXX-X (cédula simple o tipo persona natural)
  
✓ Punto 3: Sector económico/CIIU especificado
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Código CIIU 4 dígitos (ej: 6201, 6810) O descripción clara
  
✓ Punto 4: Ubicación municipal clara (Municipio + Departamento)
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Medellín, Antioquia (no "región" ni "departamento solo")
  
✓ Punto 5: Nombre completo de decisor registrado
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Nombre + Apellido (no iniciales, no "señor" solamente)
  
✓ Punto 6: Email del decisor en formato válido
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: usuario@dominio.com / usuario@dominio.com.co
  
✓ Punto 7: Teléfono del decisor verificable (10+ dígitos)
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Formato +57-60X-XXXXXXX O 60X-XXXXXXX (colombiano)
  
✓ Punto 8: Total de empleados como número válido
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: "10 empleados" ✓ vs "como 10" o "aprox 10-15" ✗
  
✓ Punto 9: Coherencia aritmética de escala operacional
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Total = Formales + Informales + Contratistas
  
✓ Punto 10: Servicios solicitados especificados (mínimo 1)
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Al menos 1 servicio de lista (no "lo necesario")
  
✓ Punto 11: Nivel de urgencia explícitamente definido
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Inmediato / Corto plazo / Mediano plazo (no vago)
  
✓ Punto 12: Riesgos inmediatos documentados o explícitamente negados
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Detalla riesgos O "[Afirmado] Sin casos abiertos" (no [s/d])
  
✓ Punto 13: Contacto del mandante es verificable (probado en < 48h)
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Enviado email/WhatsApp de confirmación a decisor
  
✓ Punto 14: Expediente jurídico listo para formalización
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: Todos datos críticos (1-9) en ✅ VÁLIDO o ⚠️ PARCIAL
  
✓ Punto 15: Próximos pasos claramente definidos
  Estado: [✅ VÁLIDO | ⚠️ PARCIAL | 🟠 REQUIERE CORRECCIÓN]
  Verificación: "Solicitar X documentos para diagnóstico en Semana Z"

───────────────────────────────────────────────────────────────────────────────
RESUMEN DE GUARDIAS
───────────────────────────────────────────────────────────────────────────────

Guardia 1 (Identificación jurídica): [ACTIVADA/NO ACTIVADA]
Guardia 2 (Contacto efectivo): [ACTIVADA/NO ACTIVADA]
Guardia 3 (Escala coherente): [ACTIVADA/NO ACTIVADA]
Guardia 4 (Servicios claros): [ACTIVADA/NO ACTIVADA]
Guardia 5 (Riesgos documentados): [ACTIVADA/NO ACTIVADA]

───────────────────────────────────────────────────────────────────────────────
CERTIFICACIÓN FINAL EMITIDA
───────────────────────────────────────────────────────────────────────────────

[ ] ✅ PREMIUM — 15/15 puntos ✅ + 0 guardias activadas
[ ] ⚠️ PROFESIONAL — 13-14/15 puntos ✅ + 1-2 guardias subsanadas
[ ] 🟠 REQUIERE REVISIÓN — 10-12/15 puntos + guardias sin subsanar
[ ] 🔴 NO CONFORME — < 10/15 puntos + guardias críticas (1,3,5)
[ ] 🚫 RECHAZADO — Mandante se rehúsa o datos manifiestamente falsos

Justificación: [Describir brevemente por qué se emitió esta certificación]

───────────────────────────────────────────────────────────────────────────────
RESPONSABILIDADES Y PRÓXIMOS PASOS
───────────────────────────────────────────────────────────────────────────────

✓ Este acta documenta RECOPILACIÓN INICIAL, no análisis legal
✓ Datos deben ser validados con mandante antes de usar en documentos oficiales
✓ Campos con [s/d] requieren seguimiento para completar información
✓ Si certificación ≠ ✅ PREMIUM, documentar retrasos esperados
✓ Próximo paso: Solicitar documentos para 02-DIAGNOSTICO.md dentro de [n] días
✓ Responsable del seguimiento: [Abogado asignado]

═══════════════════════════════════════════════════════════════════════════════
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

## CHANGELOG

### v2.1 — Nivel Alta Corte (Actual)

**Mejoras vs v2.0**:
- ✅ Certificación expandida a 5 niveles (agregar ✅ PREMIUM)
- ✅ Guardias expandidas de 4 a 5 (agregar Guardia 5: coherencia)
- ✅ Validación de formato: NIT (12 dígitos), Email (xxx@dominio), Teléfono (10+ dígitos)
- ✅ Acta de control: Expandida de ~10 a 15 puntos específicos
- ✅ Lenguaje: Ascendido a nivel Alta Corte magistral
  - "cliente" → "mandante"
  - "empresa" → "persona jurídica mandante"
  - "contacto" → "autoridad competente"
  - "datos mínimos" → "identificación jurídica"
- ✅ Guardia 3 mejorada: Validación aritmética (total = formales + informales + contratistas)
- ✅ Criterio ✅ PREMIUM: 7/7 preguntas + todas guardias pasan + datos excepcionales coherentes
- ✅ Integración: Referencia explícita a flujo 6-skills
- ✅ Test suite: Ampliada a 17 casos (criterio: 90%+ PASS)

### v2.0 — Enero 2026

**Características iniciales**:
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
**Despacho**: Cortés Cartagena, Medellín, Colombia — 2026  
**Referencia**: Estándar Universal v2.0 + Protocolo Alta Corte
