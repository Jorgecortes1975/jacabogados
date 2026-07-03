---
name: revision-contrato-mercantil-co
description: Identifica y clasifica cláusulas de riesgo en contratos mercantiles colombianos frente al Código de Comercio, entregando una tabla priorizada de hallazgos para revisión del abogado responsable. Úsala cuando el usuario pida revisar un contrato mercantil o identificar cláusulas de riesgo en un contrato comercial.
---

# Revisión de contrato mercantil (Colombia)

## Regla de seguridad obligatoria (anti-alucinación)

Los artículos del Código de Comercio de conocimiento general muy asentado (ej. art. 1324 sobre la prestación en agencia comercial) pueden citarse con confianza. **Cualquier otro número de artículo específico —incluidos los citados como "arts. 909 y ss." sobre compraventa mercantil o cualquier remisión a un régimen especial— debe marcarse como "[confirmar numeración exacta antes de usar]"**, y remitirse al Skill `verificacion-citas-co` antes de que la cláusula analizada llegue a un concepto final o a una negociación. Nunca se completa una cita normativa "por aproximación" solo porque suena plausible.

## Cuándo usar este Skill

Sobre cualquier contrato mercantil cargado por el usuario (suministro, distribución, agencia comercial, compraventa de establecimiento de comercio, prestación de servicios, franquicia) cuando se necesita una primera pasada de identificación de riesgo antes de la revisión detallada del abogado.

## Proceso operativo

**Paso 1 — Inventario de cláusulas.**
Lee el contrato completo y numera cada cláusula (o subsección relevante) en una lista de trabajo, con un resumen de una línea de su contenido. No omitas anexos ni otrosíes si fueron cargados junto con el contrato principal — un riesgo frecuente está en la inconsistencia entre el cuerpo del contrato y sus anexos.

**Paso 2 — Cotejo contra el Código de Comercio y regímenes especiales aplicables.**
Para cada cláusula, evalúa si:
- Modifica, limita o excluye normas del Código de Comercio que son de orden público y por tanto no son disponibles para las partes (ej. terminación unilateral en agencia comercial — art. 1324 C.Co., que limita la posibilidad de renuncia anticipada a la cesantía comercial).
- Se aparta de normas supletivas del Código de Comercio sin que la desviación esté claramente pactada (ej. plazos de garantía, lugar de cumplimiento de la obligación, momento de transferencia del riesgo en compraventa mercantil — arts. 909 y ss.).
- Activa un régimen especial adicional al Código de Comercio: cláusulas de exclusividad de largo plazo (posible tema de libre competencia, Ley 1340 de 2009), cláusulas de tratamiento de datos de clientes o proveedores (Ley 1581 de 2012), o cláusulas cambiarias si hay pagos en moneda extranjera (régimen del Banco de la República).

**Paso 3 — Clasificación de cláusulas de riesgo.**
Para cada hallazgo, entrega:
1. Número y cita textual breve de la cláusula (máx. 25 palabras).
2. Tipo de riesgo: económico, operativo, de salida/terminación, regulatorio, o de orden público (cláusula potencialmente inválida por contrariar norma imperativa).
3. Severidad: alta / media / baja, con la razón en una frase.
4. Norma específica del Código de Comercio o régimen especial en juego, cuando aplique — si la cláusula requiere verificación normativa adicional, márcala para el Skill `verificacion-citas-co` en vez de asumir la cita.

**Paso 4 — Identificar vacíos, no solo cláusulas problemáticas.**
El riesgo contractual no siempre está en lo que el contrato dice — a menudo está en lo que omite: ausencia de cláusula de fuerza mayor, ausencia de mecanismo de resolución de disputas, ausencia de tratamiento del inventario o los activos en tránsito ante terminación, ausencia de cláusula de cesión. Señala estos vacíos como hallazgos independientes, con la misma estructura de severidad.

**Paso 5 — Entregar tabla priorizada.**
Presenta los hallazgos ordenados de mayor a menor severidad, en una tabla con columnas: # | Cláusula/vacío | Tipo de riesgo | Severidad | Norma en juego | Recomendación de acción (negociar / aceptar como riesgo asumido / requiere opinión adicional). Cierra con una nota explícita: esta tabla es un insumo de trabajo, no el concepto final sobre el contrato.

## Uso en revisión paralela con roles diferenciados

Este Skill está diseñado para correr como uno de varios sub-agentes en un ejercicio de due diligence (ver Módulo 05, caso resuelto de revisión paralela). Cuando se usa en ese contexto, restringe tu análisis exclusivamente al riesgo contractual frente al Código de Comercio — no dupliques el trabajo de los agentes de cumplimiento normativo general ni el del agente adversarial; cada uno tiene su propio mandato y los resultados se consolidan después en una sola tabla.

## Límite del Skill

La clasificación de severidad es una primera estimación para priorizar la atención del abogado, no una valoración jurídica definitiva. La decisión de qué cláusula negociar, qué riesgo asumir y qué recomendación dar al cliente corresponde al abogado responsable del expediente.
