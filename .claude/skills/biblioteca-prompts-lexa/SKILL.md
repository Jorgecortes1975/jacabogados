---
name: biblioteca-prompts-lexa
description: >
  Biblioteca de prompts jurídicos listos para copiar, organizados por área de
  práctica del Bufete Cortés Cartagena. Usa la estructura R.A.C.F. (Rol, Acción,
  Contexto, Formato) adaptada al derecho colombiano. Activar ante: dame un prompt,
  necesito el prompt para, cómo le pregunto a Claude, qué prompt uso, prompt para
  demanda, prompt para tutela, prompt para concepto, prompt para contestación,
  prompt laboralista, prompt mercantil, prompt penal, biblioteca de prompts,
  prompt listo para copiar, cómo pedirle a Claude que, comando jurídico, instrucción
  para Claude. SIEMPRE activar cuando el usuario necesite una instrucción lista para
  pegar en Claude para cualquier tarea jurídica, empresarial o de marketing del
  despacho. Complementa lexa-lab-premium: este skill entrega el prompt copiable,
  aquel genera el meta-prompt complejo.
---

# BIBLIOTECA DE PROMPTS JURÍDICOS — LEXA-LAB v1.0
## Bufete Cortés Cartagena

**Abogado titular:** Jorge Ángel Cortés Cartagena — T.P. 365.594
**Versión:** 1.0 — Junio 2026
**Fuente metodológica:** Framework R.A.C.F. + Biblioteca de Prompts para Management (Victor Colussi) — adaptación colombiana al derecho

---

## ESTRUCTURA R.A.C.F. — CÓMO FUNCIONAN ESTOS PROMPTS

Todo prompt de esta biblioteca sigue la estructura R.A.C.F.:

```
ROL     → Quién debe ser Claude (abogado laboralista, penalista, etc.)
ACCIÓN  → Qué debe hacer (redactar, analizar, estructurar, revisar)
CONTEXTO → Qué situación enfrenta + datos del caso
FORMATO → Cómo debe entregarlo (memorial, tabla, concepto, escrito)
```

**Regla de uso:** Los corchetes `[COMPLETAR]` son campos que debes llenar con los datos reales del caso. No envíes el prompt con los corchetes vacíos.

**Versión básica:** R.A.C.F.
**Versión avanzada:** R.A.C.F. + Objetivo + Instrucciones + Restricciones + Formato de salida → usar `lexa-lab-premium` para esto.

---

## ÁREA 1: DERECHO LABORAL

### Prompt 1A — Demanda ordinaria laboral

```
ROL: Actúa como abogado laboralista colombiano senior, con estándar de
argumentación de la Sala de Casación Laboral de la CSJ.

ACCIÓN: Redacta una demanda ordinaria laboral completa ante el
[Juzgado Laboral del Circuito / Tribunal] de [ciudad].

CONTEXTO:
- Trabajador: [nombre, cargo, salario, tiempo de servicio]
- Empleador: [razón social, NIT, representante legal]
- Hechos: [describir cronológicamente]
- Pruebas disponibles: [contratos, nóminas, comunicaciones]
- Pretensiones: [cesantías, intereses, primas, vacaciones, indemnización]
- Causal: [despido sin justa causa / no pago / otra]
- Prescripción: [fecha del hecho / último pago]

FORMATO: Memorial procesal completo con encabezado, hechos numerados,
pretensiones principales y subsidiarias, fundamentos de derecho y pruebas.
Incluye advertencia de puntos a validar antes de radicar.
```

---

### Prompt 1B — Tutela por estabilidad laboral reforzada

```
ROL: Actúa como constitucionalista colombiano experto en tutela laboral
y estabilidad reforzada, con conocimiento de la línea de la Corte
Constitucional.

ACCIÓN: Redacta una acción de tutela urgente por vulneración del
derecho a la estabilidad laboral reforzada.

CONTEXTO:
- Accionante: [nombre, condición de salud/embarazo/fuero]
- Accionado: [empresa, área de RRHH, representante legal]
- Hechos: [fecha de diagnóstico, conocimiento del empleador, fecha de despido]
- Certificación médica: [existe / no existe]
- Urgencia: [inminencia de perjuicio / afectación mínimo vital]
- Autorización Ministerio del Trabajo: [se obtuvo / no se obtuvo]

FORMATO: Tutela con examen de subsidiariedad, inmediatez, identificación
del sujeto de especial protección, análisis de mínimo vital y solicitud
de medida provisional. Incluir sentencias líderes de la CC sobre el tema.
```

---

### Prompt 1C — Concepto jurídico laboral para empresa cliente

```
ROL: Actúa como abogado laboralista y consultor de relaciones laborales
para empresas colombianas.

ACCIÓN: Elabora un concepto jurídico ejecutivo sobre [tema] para el
área de RRHH o la gerencia de [empresa cliente].

CONTEXTO:
- Empresa: [sector, número de empleados, modalidad contractual]
- Situación: [describir el asunto concreto]
- Urgencia: [alta / media / baja]
- Decisión que deben tomar: [describir]

FORMATO: Concepto con problema jurídico, marco normativo vigente,
análisis, tres escenarios posibles, riesgos cuantificados, recomendación
concreta y no ambigua. Nivel de confianza del análisis. Puntos que
requieren verificación adicional.
```

---

### Prompt 1D — Análisis de viabilidad: ¿demandamos o no?

```
ROL: Actúa como socio de firma laboralista colombiana, con criterio
de negocio y litigio.

ACCIÓN: Analiza la viabilidad real de la demanda laboral y dame
una recomendación ejecutiva clara.

CONTEXTO:
- Pretensión: [describir qué se busca]
- Pruebas: [qué hay disponible]
- Empleador: [solvencia, tamaño, historial litigioso]
- Tiempo transcurrido: [desde el hecho]
- Recursos del cliente: [económicos y emocionales]

FORMATO: Análisis con fortaleza probatoria (1-10), probabilidad de
éxito estimada (%), costo aproximado, tiempo estimado, defensa probable
del empleador, y recomendación: demandar / negociar / abstenerse.
Sin ambigüedad. Tomar posición.
```

---

## ÁREA 2: DERECHO MERCANTIL

### Prompt 2A — Revisión de contrato comercial

```
ROL: Actúa como abogado corporativo colombiano experto en contratación
mercantil y prevención de litigios. Revisa como el abogado de la parte
más expuesta al riesgo.

ACCIÓN: Audita este contrato y detecta riesgos, vacíos y desequilibrios.

CONTEXTO:
[PEGAR EL TEXTO DEL CONTRATO]
Rol de mi cliente: [parte A / parte B]
Objetivo del negocio: [describir]
Riesgos principales que preocupan: [describir]

FORMATO: Tabla con cláusula analizada → riesgo detectado → nivel
(alto/medio/bajo) → propuesta de redacción mejorada. Luego resumen
ejecutivo con los 5 puntos más críticos para negociar.
```

---

### Prompt 2B — Requerimiento prejurídico de presión alta

```
ROL: Actúa como abogado mercantil litigante colombiano.

ACCIÓN: Redacta un requerimiento prejurídico de alto impacto para
presionar al deudor o incumplido sin revelar la estrategia procesal.

CONTEXTO:
- Acreedor/Afectado: [nombre]
- Deudor/Incumplido: [nombre]
- Contrato o soporte: [tipo, fecha, valor]
- Incumplimiento: [qué no se cumplió, desde cuándo, cuánto]
- Objetivo: [cobrar / terminar contrato / exigir cumplimiento]
- Plazo que se dará: [días]

FORMATO: Carta formal con identificación del vínculo, descripción del
incumplimiento, consecuencias jurídicas aplicables, requerimiento
puntual, plazo, advertencia firme y reserva de acciones. Tono
profesional, serio, sin amenazas vacías.
```

---

### Prompt 2C — Demanda ejecutiva por pagaré

```
ROL: Actúa como abogado comercial colombiano experto en cobro
ejecutivo de títulos valores.

ACCIÓN: Redacta demanda ejecutiva por cobro de pagaré ante el
Juzgado Civil del Circuito competente.

CONTEXTO:
- Demandante: [nombre]
- Demandado: [nombre, domicilio]
- Título: [pagaré, monto, fecha de suscripción, fecha de vencimiento]
- Estado: [exigible / vencido / parcialmente pagado]
- Codeudores o avalistas: [nombres si los hay]

FORMATO: Demanda ejecutiva con identificación del título, verificación
de exigibilidad, pretensiones de capital, intereses y costas, solicitud
de mandamiento de pago, medidas cautelares recomendadas.
```

---

## ÁREA 3: DERECHO PENAL (Sistema Acusatorio — Ley 906)

### Prompt 3A — Teoría del caso desde la defensa

```
ROL: Actúa como abogado penalista colombiano experto en sistema
acusatorio (Ley 906/2004), con énfasis en defensa técnica.

ACCIÓN: Construye la teoría del caso de la defensa para [tipo de delito].

CONTEXTO:
- Imputado: [perfil general, sin datos sensibles]
- Delito imputado: [tipo, grado, circunstancias]
- Hechos de la Fiscalía: [resumen]
- Versión del defendido: [descripción]
- Pruebas de la Fiscalía: [describir]
- Pruebas disponibles para la defensa: [describir]
- Etapa actual: [indagación / imputación / acusación / juicio oral]

FORMATO: Teoría del caso con versión fáctica, hecho jurídicamente
relevante, evidencia favorable, debilidades probatorias de la Fiscalía,
objetivo de la defensa y estrategia para cada audiencia.
```

---

### Prompt 3B — Análisis de medida de aseguramiento

```
ROL: Actúa como abogado penalista colombiano defensor.

ACCIÓN: Analiza la procedencia de la medida de aseguramiento y
construye los argumentos de oposición.

CONTEXTO:
- Delito: [tipo]
- Antecedentes del defendido: [ninguno / con antecedentes]
- Arraigo: [domicilio fijo / trabajo / familia]
- Argumento de la Fiscalía para la medida: [describir]
- Peligro para la comunidad alegado: [describir]
- Peligro de no comparecencia alegado: [describir]

FORMATO: Análisis de los tres fines de la medida (comparecencia,
obstrucción, peligro), argumento de oposición a cada uno,
alternativa a la privación de libertad, cita de jurisprudencia
de la Sala Penal de la CSJ sobre los criterios del art. 308 CPP.
```

---

## ÁREA 4: DERECHO CIVIL / FAMILIA

### Prompt 4A — Demanda de restitución de inmueble

```
ROL: Actúa como abogado civil colombiano experto en proceso verbal
sumario de restitución de inmueble arrendado.

ACCIÓN: Redacta demanda de restitución de inmueble ante Juzgado
Civil Municipal competente.

CONTEXTO:
- Demandante (arrendador): [nombre, identificación]
- Demandado (arrendatario): [nombre, identificación]
- Inmueble: [descripción, matrícula inmobiliaria, dirección]
- Contrato: [vigente / vencido / verbal]
- Causal: [no pago / expiración / subarriendo no autorizado]
- Meses de mora: [cantidad y valores]

FORMATO: Demanda verbal sumaria con competencia por cuantía, hechos
numerados, pretensiones (restitución + cánones adeudados + intereses),
fundamentos de derecho (Ley 820/2003 + CGP), pruebas y medidas
cautelares solicitadas.
```

---

### Prompt 4B — Concepto sobre custodia y alimentos

```
ROL: Actúa como abogado de familia colombiano con conocimiento
del CGP y la jurisprudencia de Sala Civil de la CSJ.

ACCIÓN: Elabora un concepto ejecutivo sobre la situación de
custodia y alimentos para el cliente.

CONTEXTO:
- Hijos: [número, edades]
- Situación actual: [con quién viven, régimen de visitas actual]
- Ingresos del padre: [aproximados]
- Ingresos de la madre: [aproximados]
- Punto de conflicto: [custodia compartida / alimentos / relación con el hijo]
- Acuerdos previos: [escritura / sentencia / ninguno]

FORMATO: Concepto con marco legal, criterios judiciales para custodia,
tabla de alimentos orientativa (porcentaje del ingreso), escenarios
posibles, ruta procesal recomendada y riesgos de cada vía.
```

---

## ÁREA 5: DERECHO ADMINISTRATIVO / CONTENCIOSO

### Prompt 5A — Nulidad y restablecimiento del derecho

```
ROL: Actúa como abogado administrativista colombiano con conocimiento
del CPACA (Ley 1437/2011) y la jurisprudencia del Consejo de Estado.

ACCIÓN: Elabora la estrategia procesal y los fundamentos de una
demanda de nulidad y restablecimiento del derecho.

CONTEXTO:
- Actor: [persona natural o jurídica afectada]
- Demandado: [entidad pública]
- Acto administrativo atacado: [resolución/acto, número, fecha]
- Vicio del acto: [nulidad / desviación de poder / falsa motivación]
- Perjuicio: [descripción del daño]
- Caducidad: [cuándo venció el plazo o si sigue en tiempo]

FORMATO: Análisis de procedencia, causal de nulidad con sustento
jurisprudencial del Consejo de Estado, pretensiones nulidad + indemnización,
medida cautelar de urgencia si aplica, advertencia sobre caducidad.
```

---

## ÁREA 6: TUTELA GENERAL

### Prompt 6A — Tutela urgente (cualquier derecho fundamental)

```
ROL: Actúa como constitucionalista colombiano experto en acción
de tutela con estándar de la Corte Constitucional.

ACCIÓN: Redacta una acción de tutela urgente por vulneración de
[derecho fundamental].

CONTEXTO:
- Accionante: [nombre, condición de vulnerabilidad si aplica]
- Accionado: [entidad pública / empresa / particular que ejerce función pública]
- Derecho vulnerado: [salud / trabajo / educación / mínimo vital / otro]
- Hechos: [cronología clara]
- Urgencia: [perjuicio irremediable / daño continuado]
- Subsidiariedad: [hay otro mecanismo / por qué es ineficaz]

FORMATO: Tutela con examen de subsidiariedad e inmediatez (explícitos),
identificación de sujeto de especial protección si aplica, hechos
cronológicos, fundamentos constitucionales, pretensión de amparo,
medida provisional si procede. Máximo 5 páginas.
```

---

## ÁREA 7: GESTIÓN DEL DESPACHO

### Prompt 7A — Análisis del estado de causas activas

```
ROL: Actúa como director de operaciones de un despacho jurídico colombiano.

ACCIÓN: Analiza el estado de las causas activas y genera un reporte
ejecutivo de gestión.

CONTEXTO:
[PEGAR LISTA DE CAUSAS CON: radicado, área, etapa, próxima actuación,
fecha límite, estado de honorarios]

FORMATO: Tabla organizada por urgencia → casos críticos (términos en 30 días),
casos en progreso, casos represados; KPIs del despacho (causas activas,
causas por área, promedio de etapas, cartera de honorarios); alertas
de términos procesales; recomendaciones de priorización.
```

---

### Prompt 7B — Respuesta profesional a cliente sobre su caso

```
ROL: Actúa como abogado titular de despacho jurídico colombiano.

ACCIÓN: Redacta una comunicación profesional al cliente informando
el estado de su caso.

CONTEXTO:
- Cliente: [nombre]
- Caso: [tipo de proceso, radicado]
- Novedad: [qué pasó en la última actuación]
- Próxima actuación: [qué viene, cuándo]
- Situación del cliente: [preocupado / conforme / urgente]

FORMATO: Comunicación clara, profesional y empática. Sin tecnicismos
innecesarios. Explicar qué pasó, qué significa, qué sigue y qué necesita
del cliente (documentos, decisiones). No más de 3 párrafos.
```

---

## ÁREA 8: MARKETING Y LEXA-LAB

### Prompt 8A — Post de LinkedIn para el Bufete

```
ROL: Actúa como estratega de contenido jurídico para LinkedIn.

ACCIÓN: Redacta un post de alto impacto sobre [tema jurídico] para
el perfil de Jorge Ángel Cortés Cartagena, abogado en Medellín.

CONTEXTO:
- Tema: [derecho laboral / empresarial / tutela / otro]
- Audiencia: [trabajadores / empresas / emprendedores / todos]
- Objetivo: [posicionamiento / captación / educación]
- Tono: [profesional pero accesible, sin jerga técnica]
- CTA deseado: [consulta / seguir / compartir]

FORMATO: Post de 200-300 palabras. Primera línea gancho. Máximo 5
párrafos breves. Sin viñetas. Sin emojis recargados. CTA final claro.
Hashtags específicos del nicho jurídico colombiano.
```

---

## ESTRUCTURA DE PROMPT PROFESIONAL V2 — REFERENCIA RÁPIDA

Para casos complejos, usa esta estructura extendida (formato V2):

```
ROL: Actúa como [especialidad] colombiano...

OBJETIVO: Quiero lograr [resultado concreto y medible].

CONTEXTO: [situación, datos del caso, restricciones].

INSTRUCCIONES:
1. [Primera tarea obligatoria]
2. [Segunda tarea obligatoria]
3. [Tercera tarea obligatoria]

RESTRICCIONES:
- No inventes normas, sentencias ni radicados.
- Usa lenguaje técnico colombiano.
- Si falta información, declara qué falta y continúa.
- Aplica etiquetas: [Acreditado] / [Afirmado] / [Inferencia] / [No verificado].

FORMATO DE SALIDA: [tipo de documento, secciones requeridas, extensión].
```

---

## INTEGRACIÓN CON EL ECOSISTEMA LEXA-LAB

```
biblioteca-prompts-lexa → entrega el prompt listo para copiar
      ↓ (para casos complejos)
lexa-lab-premium → genera el meta-prompt de máximo rendimiento
      ↓
ecosistema-juridico-col → ejecuta el escrito procesal
      ↓
anti-hallucination-v2 → certifica antes de entregar
      ↓
Validación JAC → aprobación de Jorge
```

---

*Bufete Cortés Cartagena — Jorge Ángel Cortés Cartagena T.P. 365.594 — Medellín, Colombia — 2026*
*Metodología: Framework R.A.C.F. adaptado al derecho colombiano (base: Colussi, V.R., 2026)*
