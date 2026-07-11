---
name: analisis-viabilidad-legal
description: Evalúa si un caso es legalmente viable antes de aceptarlo. Analiza fundamento legal, calidad de prueba, capacidad de pago del cliente y probabilidad de ganar. Usar después de consulta inicial para veredicto VIABLE/RIESGO ALTO/NO VIABLE.
---

# Skill: Análisis de Viabilidad Legal

## Objetivo

Determinar **antes de aceptar un caso** si es legalmente viable, considerando:
- Fundamento legal en normas colombianas
- Evidencia disponible vs. faltante
- Capacidad de pago del cliente
- Riesgo procesal y probabilidad de ganar
- Tiempo y costo estimado

**Resultado:** Veredicto con puntuación (1-10) y recomendación clara.

---

## Cuándo usar esta skill

- ✓ Después de consulta inicial con cliente (Procedimiento P-001, Paso 6)
- ✓ Cuando dudas si el caso es ganable
- ✓ Antes de proponer honorarios al cliente
- ✓ Para casos complejos o multi-rama
- ✓ Cuando cliente tiene pruebas débiles
- ❌ No usar: Para asiduos del despacho (ya evaluados)
- ❌ No usar: Casos de emergencia (tutelas, medidas cautelares — actúa primero, evalúa después)

---

## Instrucciones paso a paso

### PASO 1: Documenta la narrativa
Copia del cliente: ¿Qué pasó? ¿Quiénes son las partes? ¿Cuál es el daño? ¿Qué busca?

**Ejemplo:**
```
Cliente: María García (empleada)
Empresa: ABC Transportes SAS
Hecho: Despido injustificado sin causa
Daño: Perdió salario desde octubre 2025
Petición: Reconocimiento de salarios caídos + indemnización
```

### PASO 2: Identifica rama del derecho
- ¿Civil? (contratos, obligaciones, daño)
- ¿Penal? (delito)
- ¿Laboral? (trabajador-empleador)
- ¿Administrativo? (actos de administración pública)
- ¿Comercial? (entre comerciantes)
- ¿Constitucional? (derechos fundamentales)

Consulta Skill `redaccion-legal-colombia` para confirmación de códigos aplicables.

### PASO 3: Investiga fundamento legal
**Pregunta clave:** ¿Existe ley que proteja el derecho que alega el cliente?

**Haz:**
1. Identifica norma (Código, artículo, ley número)
2. Cita textualmente el artículo relevante
3. Verifica si está en vigencia (no derogada)
4. Busca jurisprudencia favorable (Corte Constitucional, Suprema)

**Registra:**
```
Fundamento Legal: Código Sustantivo del Trabajo, Artículo 58
"El contrato de trabajo puede celebrarse por tiempo determinado 
o indeterminado..."

¿Es favorable? ✓ SÍ (protege contrato de trabajo)

Jurisprudencia: Corte Suprema de Justicia, sentencia T-125/94
Precedente: Despido sin causa justa es nulidad
```

**Fortaleza:** FUERTE / MODERADA / DÉBIL

### PASO 4: Califica las pruebas disponibles
**Para cada prueba que el cliente tiene, pregunta:**
- ¿Es auténtica? (puedo verificar en juzgado)
- ¿Es directa? (prueba del hecho, no inferencia)
- ¿Es reciente o antigua?

**Tabla de evaluación:**

```
Prueba                    | Tipo      | Autenticidad | Directitud | Fortaleza
Contrato laboral firmado  | Docto.    | Fuerte       | Directa    | FUERTE
Email de jefe (despido)   | Docto.    | Moderada     | Directa    | MODERADA
Testigos que vieron       | Testimo.  | Moderada     | Indirecta  | DÉBIL
"Creo que fue así"        | Especula. | Débil        | No aplica  | DÉBIL
```

**Puntuación de prueba disponible:** ___/10

### PASO 5: Identifica pruebas faltantes
**Para cada elemento del caso, pregunta:** ¿Qué necesito probar pero NO tengo?

**Ejemplo laboralista:**
```
Hecho a probar: Relación laboral desde 01-01-2023
Tengo: Contrato de trabajo (fotocopia)
Falta: Nóminas 24 meses, acta de finiquito, testimonios

Riesgo: Si no tengo nóminas, es más difícil probar afiliación
Obteniéndola: ¿Fácil (cliente tiene), Difícil (poder pedir), Imposible?
```

### PASO 6: Evalúa capacidad de pago
**Estima costo total del caso:**
```
Honorarios (tarifa × horas):     $________
Costas procesales (depósitos):   $________
Pericia (si aplica):              $________
Traslados/notificaciones:         $________
TOTAL ESTIMADO:                   $________
```

**¿Puede el cliente pagar?**
- ¿Tiene dinero para depósito inicial (30-50%)?
- ¿Puede pagar cuotas mensuales?
- ¿Hay posibilidad de % de resultado?
- Si NO PUEDE: ¿Es caso de interés público?

**Capacidad:** ALTA / MODERADA / BAJA / NULA

### PASO 7: Estima probabilidad de ganar
**Matriz de puntuación:**

```
Factor                  | Evaluación     | Peso | Puntuación
─────────────────────────────────────────────────────────────
Fundamento legal        | [1-10]         | 30%  | ___ × 0.3
Prueba disponible       | [1-10]         | 40%  | ___ × 0.4
Jurisprudencia          | [1-10]         | 20%  | ___ × 0.2
Adversario              | [1-10] inverso | 10%  | ___ × 0.1
─────────────────────────────────────────────────────────────
PUNTUACIÓN FINAL (suma): ___/10 = ___%
```

**Interpretación:**
- 8-10: Probabilidad ALTA (> 70%)
- 5-7: Probabilidad MEDIA (40-70%)
- 2-4: Probabilidad BAJA (< 40%)

### PASO 8: Identifica riesgos específicos
Pregunta por cada riesgo potencial:

```
Riesgo: ¿Hay plazo vencido? (prescripción)
  → Respuesta: SÍ/NO
  → Impacto: Si sí, caso es inviable

Riesgo: ¿Hay defectos de forma que cierren el caso?
  → Ejemplo: Cliente no tiene legitimación (no es parte)
  → Impacto: Rechazo de demanda (sin ni siquiera revisar fondo)

Riesgo: ¿Hay conflicto de intereses?
  → Ejemplo: Ya representamos a la contraparte
  → Impacto: Rechazo del caso (deber ético)

Riesgo: ¿Hay riesgos reputacionales?
  → Ejemplo: Cliente tiene antecedentes penales
  → Impacto: Precaución si es delicado

Riesgo: ¿La contraparte tiene abogado muy fuerte?
  → Investigación: ¿Quién es? ¿Experiencia?
  → Impacto: Mayor complejidad
```

**Riesgos fatales:** Si identificas cualquiera, STOP → No viable

### PASO 9: Calcula escenarios de resultado
**Proyecta tres escenarios:**

```
ESCENARIO OPTIMISTA (Probabilidad: 25%)
─────────────────────────────────────
Cliente gana completamente.
Monto que recibe: $_________
Despacho recibe: $_________ (honorarios)
Tiempo total: ____ meses

ESCENARIO BASE (Probabilidad: 50%)
──────────────────────────────────
Cliente gana parcialmente (__% del monto).
Monto que recibe: $_________
Despacho recibe: $_________ (honorarios)
Tiempo total: ____ meses

ESCENARIO PESIMISTA (Probabilidad: 25%)
───────────────────────────────────────
Cliente pierde.
Monto que recibe: $0
Despacho recibe: $_________  (solo honorarios previos)
Tiempo total: ____ meses
```

---

## VEREDICTO FINAL

**Clasifica en UNA de estas categorías:**

### ✓ VIABLE
**Cuándo:** Todas estas condiciones se cumplen:
- Fundamento legal claro (artículo específico aplica)
- Prueba moderada a fuerte disponible
- Probabilidad de ganar > 60%
- Cliente puede pagar
- Riesgos manejables
- No hay riesgos fatales

**Acción:** ACEPTAR caso. Procede con P-001 Paso 8 (propuesta de honorarios)

**Ejemplo veredicto:**
```
VEREDICTO: VIABLE
Puntuación: 8/10
Probabilidad: 75%
Razón: Contrato está vigente, cliente tiene nóminas, jurisprudencia favorable

Recomendación: ACEPTAR. Caso fuerte.
Condición: Asegurar cliente puede pagar cuotas mensuales.
```

---

### 🟡 RIESGO ALTO
**Cuándo:** Una o más de estas condiciones:
- Fundamento legal cuestionable pero argumentable
- Prueba débil pero potencial de mejorar
- Probabilidad de ganar 40-60%
- Cliente con capacidad de pago marginal
- Riesgos significativos pero manejables

**Acción:** ESCALADA A SOCIO. Prepara memo (ver PASO 10)

**Ejemplo veredicto:**
```
VEREDICTO: RIESGO ALTO
Puntuación: 6/10
Probabilidad: 55%
Razón: Pruebas débiles, adversario es empresa grande

Recomendación: CONSULTAR CON SOCIO antes de decidir.
Posibles condiciones:
  - Aumentar depósito inicial (cliente asume más riesgo)
  - Asociar con especialista (distribuir riesgo)
  - Exigir pruebas adicionales antes de aceptar
```

---

### ❌ NO VIABLE
**Cuándo:** Una o más de estas condiciones:
- Fundamento legal débil o ausente en normas colombianas
- No hay pruebas y es imposible obtenerlas
- Probabilidad de ganar < 40%
- Cliente no puede pagar
- Hay riesgo fatal (prescripción, conflicto intereses, defecto de forma)

**Acción:** RECHAZAR CASO (P-001 Excepción 5). Comunica con claridad.

**Ejemplo veredicto:**
```
VEREDICTO: NO VIABLE
Puntuación: 2/10
Probabilidad: 15%
Razón: Prescripción vencida (pasó más de 3 años)

Recomendación: RECHAZAR.
Comunicación al cliente:
  "Lamentablemente el derecho que reclamas prescribió hace más de 1 año.
   Las normas colombianas no permiten cobrar después de 3 años. 
   Te recomiendo consultar con otro abogado si tienes dudas."
```

---

## FORMATO DE SALIDA

Cuando termines, entrega:

```markdown
# EVALUACIÓN DE VIABILIDAD: [Nombre Cliente]

## Resumen Ejecutivo
[2-3 líneas: qué se trata el caso]

## Análisis Legal
- Rama: [Civil/Penal/Laboral/Administrativo/etc]
- Fundamento: [Artículo específico]
- Fortaleza: [FUERTE/MODERADA/DÉBIL]

## Análisis de Prueba
- Disponible: [Puntuación /10]
- Faltante: [Qué falta y cómo obtenerlo]
- Evaluación: [FUERTE/MODERADA/DÉBIL]

## Capacidad de Pago
- Costo estimado: $[X]
- Capacidad cliente: [ALTA/MODERADA/BAJA]
- Depósito inicial requerido: $[X]

## Riesgos
- Riesgos manejables: [lista]
- Riesgos fatales: [ninguno / listar si existen]

## Probabilidad de Ganar
- Puntuación: [X]/10
- Porcentaje: [X]%
- Sustento: [Razones de la puntuación]

## VEREDICTO FINAL
**[VIABLE / RIESGO ALTO / NO VIABLE]**

Recomendación: [Acción específica]

Si RIESGO ALTO: [Condiciones para aceptar]
```

---

## Criterios de Calidad

✓ Veredicto es **específico** (no vago)
✓ Fundamentado en **normas colombianas reales**
✓ Puntuación es **justificable** (no arbitraria)
✓ Riesgos están **documentados**
✓ Probabilidad es **realista** (no optimista ni pesimista)
✓ Recomendación es **clara y accionable**

---

## Referencias

- Procedimiento P-001: Tomar Nuevo Caso
- Procedimiento P-002: Evaluar Viabilidad Legal (versión procedimiento)
- Skill: redaccion-legal-colombia (para normas por rama)
- MCP: Legal Data Hunter (para jurisprudencia)

---

## Notas Importantes

**No confundir:**
- Viabilidad legal ≠ Costo monetario
  - Un caso caro pero ganable = VIABLE
  - Un caso barato pero indefendible = NO VIABLE

**Actualización:**
- Si durante el caso descubres pruebas faltantes = renevalúa
- Si jurisprudencia cambia = renevalúa
- Si cliente no paga = puede ser NO VIABLE

**Escaladas:**
- Si cliente insiste en caso NO VIABLE = Socio decide
- Si duda entre VIABLE/RIESGO = Escala a Socio
- Si caso es penal = Consultar especialista

---

*Esta skill es autoridad en evaluación de viabilidad. Úsala ANTES de aceptar cualquier caso.*
