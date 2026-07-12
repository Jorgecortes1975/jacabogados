---
name: playbook-contratos-col
description: >
  Revisión de contratos con semáforo de riesgo ROJO/AMARILLO/VERDE aplicando el Playbook
  de Riesgos del despacho. Detecta cláusulas inaceptables (ROJO), negociables (AMARILLO)
  y aceptables (VERDE) y genera contrapropuestas en lenguaje claro. Adapta la revisión
  al tipo de contrato y a la posición del cliente (contratante / contratista / arrendador /
  arrendatario). Activar ante: revisar contrato, auditar cláusulas, señalar riesgos,
  contrato tiene cláusulas peligrosas, qué riesgos tiene este contrato, semáforo de
  riesgos, playbook contractual, posición del cliente en este contrato, qué cláusulas
  no debemos firmar, recomendación firmar o no firmar, due diligence contractual,
  contrapropuesta de cláusula. SIEMPRE activar cuando se entregue un contrato para
  revisión con perspectiva crítica y estratégica.
---

# Playbook de Contratos — Revisión con Semáforo de Riesgo
## Sistema de Revisión Contractual Estratégica para Colombia

---

## PROPÓSITO DE ESTE SKILL

Transformar la revisión de contratos de una lectura lineal en un análisis estructurado
con criterio. El output no es una lista de problemas: es un mapa de decisiones que le
permite al cliente y al abogado negociar con claridad.

**Regla de oro:** Nunca recomendar firmar sin señalar los riesgos residuales,
aunque sean menores.

---

## FASE 0 — LECTURA Y CLASIFICACIÓN INICIAL

Antes de aplicar el semáforo, ejecuta:

1. **Identificar las partes** y la posición del cliente (¿quién redactó el contrato?
   ¿Quién tiene mayor poder de negociación?)
2. **Clasificar el tipo de contrato**: prestación de servicios, suministro,
   compraventa, arrendamiento, distribución, NDA, SaaS, obra, etc.
3. **Mapear las secciones críticas**: objeto, precio, plazo, obligaciones de cada parte,
   garantías, responsabilidad, penalidades, resolución de conflictos, terminación.
4. **Identificar el derecho aplicable y el juez competente**: si es extranjero o de
   jurisdicción fuera de Colombia, marcar como RIESGO JURISDICCIONAL.

---

## SISTEMA DE SEMÁFORO

### 🔴 ROJO — BLOQUEANTE (nunca firmar sin modificar)

Posiciones que el despacho no acepta bajo ninguna circunstancia sin negociación previa:

- Jurisdicción exclusiva fuera de Colombia para contratos de ejecución local
- Renuncia anticipada a fuero propio o a acciones por responsabilidad civil
- Cláusulas de indemnidad asimétricas sin tope (solo a favor del proveedor/prestador)
- Penalidades que superen el valor total del contrato o sean abusivas
- Renuncia al derecho de excepción de incumplimiento de la contraparte
- Cláusulas de confidencialidad perpetua sin posibilidad de excepción legal
- Cesión del contrato sin consentimiento previo del cliente (si el cliente es el cedente)
- Cláusulas que excluyan totalmente la responsabilidad por dolo o culpa grave
- Modificación unilateral del precio o de las condiciones esenciales

### 🟡 AMARILLO — NEGOCIABLE (requiere análisis y contrapropuesta)

- Plazos de notificación de incumplimiento menores a 15 días hábiles
- Limitación de responsabilidad inferior al valor total del contrato
- Cláusulas de auditoría sin preaviso mínimo de 10 días hábiles
- Prórroga automática sin posibilidad de aviso de no renovación con 30 días
- Garantías de cumplimiento desproporcionadas al riesgo real
- Jurisdicción de arbitramento en ciudad diferente a la del domicilio del cliente
- Exclusividad unilateral sin contraprestación adecuada
- Modificación de condiciones con aviso unilateral menor a 30 días

### 🟢 VERDE — ACEPTABLE

- Renovación automática con preaviso de 30 días o más
- Arbitramento con sede en Colombia, ley colombiana aplicable
- Penalidades proporcionadas al valor del contrato (máximo 10-20%)
- Limitación de responsabilidad equivalente al valor del contrato
- Confidencialidad con excepciones legales estándar (información pública, mandato judicial)
- Cláusula de jurisdicción alternativa (arbitramento o juez ordinario a elección)

---

## PROTOCOLO DE EJECUCIÓN

### Paso 1 — Lectura integral

Lee el contrato completo antes de emitir cualquier opinión. No clasifiques cláusulas
sobre la marcha; forma una visión del conjunto primero.

### Paso 2 — Identificar si hay Playbook específico

Si el usuario aporta su propio Playbook de Riesgos (documento interno del despacho
o del cliente), aplícalo primero. El semáforo genérico de este skill es el default
cuando no hay Playbook específico.

### Paso 3 — Generar el Reporte de Semáforo

**Estructura obligatoria del reporte:**

```
SEMÁFORO DE RIESGOS — [NOMBRE DEL CONTRATO]
Revisado por: [Fecha de análisis]
Contrato redactado por: [Parte redactora — si se identifica]

══════════════════════════════════════
🔴 CLÁUSULAS BLOQUEANTES
══════════════════════════════════════
[Nº de cláusula o sección] — [Título de la cláusula]
PROBLEMA: [Qué riesgo concreto genera]
TEXTO ACTUAL: [Transcripción exacta o paráfrasis fiel]
CONTRAPROPUESTA: [Texto alternativo que protege al cliente]
[Repetir por cada cláusula roja]

══════════════════════════════════════
🟡 CLÁUSULAS A NEGOCIAR
══════════════════════════════════════
[Nº de cláusula] — [Título]
RIESGO: [Descripción del riesgo]
POSICIÓN ACTUAL: [Texto actual]
ALTERNATIVA SUGERIDA: [Propuesta de modificación]
[Repetir por cada cláusula amarilla]

══════════════════════════════════════
🟢 CLÁUSULAS SIN OBJECIONES
══════════════════════════════════════
[Lista de secciones o cláusulas aceptables]

══════════════════════════════════════
⚠️ FUERA DE PLAYBOOK
══════════════════════════════════════
[Cláusulas no contempladas en el playbook estándar que representan riesgo inusual]

══════════════════════════════════════
RESUMEN EJECUTIVO (máximo 5 líneas)
══════════════════════════════════════
Posición general del contrato: [favorable / equilibrado / desfavorable] para el cliente
Principales riesgos identificados: [lista en una línea]
Riesgos bloqueantes: [sí/no — cuántos]
RECOMENDACIÓN: [FIRMAR / NEGOCIAR PRIMERO / RECHAZAR]
Próximo paso: [Acción concreta — enviar contrapropuesta / solicitar reunión / etc.]
```

### Paso 4 — Clausulado de apoyo (solo si se solicita)

Si el usuario pide redactar la contrapropuesta formal, generar las cláusulas alternativas
en lenguaje contractual colombiano estándar, listas para enviar a la contraparte.

---

## NORMAS DE REFERENCIA PARA CONTRATOS EN COLOMBIA

Aplica según el tipo de contrato:

- **Código Civil colombiano** (arts. 1602-1617, condiciones generales de los contratos)
- **Código de Comercio** (Título I, arts. 822-831 para contratos mercantiles)
- **Ley 1480/2011 Estatuto del Consumidor** (si hay relación B2C)
- **Decreto 2153/1992 y Ley 1340/2009** (competencia desleal y prácticas restrictivas)
- **Ley 1581/2012** (protección de datos — obligatoria en cláusulas de confidencialidad)
- **Ley 1258/2008** (SAS — para contratos societarios y pactos de accionistas)
- **Ley 820/2003** (arrendamiento de vivienda urbana)
- **Ley 361/1997 y CST** (contratos laborales — verificar que el contrato no encubra relación laboral)

---

## ADVERTENCIA ANTI-ALUCINACIÓN

Antes de citar cualquier norma como argumento para clasificar una cláusula como ROJA:

1. Verificar que la norma citada existe y está vigente
2. Verificar que el artículo citado corresponde a la materia
3. Si hay duda sobre vigencia: marcar [VERIFICAR EN SUIN-JURISCOL]
4. No inventar jurisprudencia de la Corte Suprema sobre cláusulas abusivas sin citar fuente

---

## CLÁUSULAS CRÍTICAS POR TIPO DE CONTRATO

### Prestación de servicios profesionales
- Alcance negativo (qué NO incluye el servicio)
- Criterios de aprobación de entregables y efecto del silencio
- Titularidad de propiedad intelectual sobre lo producido
- Independencia del contratista (verificar que no encubra contrato laboral — art. 23 CST)

### Tecnología / SaaS
- SLA con penalidades medibles (uptime %, tiempo de respuesta)
- Titular de los datos generados por el usuario (Ley 1581/2012)
- Plan de continuidad ante cese del servicio del proveedor
- Uso de IA en el desarrollo: titularidad del código resultante

### NDA bilateral
- Definición precisa de "Información Confidencial"
- Excepciones al deber (información pública, mandato judicial, autorización previa)
- Plazo post-terminación (no indefinido sin razón)
- Obligación de devolver o destruir documentos al terminar

### Contrato de distribución o agencia comercial
- Exclusividad y territorio
- Comisiones y liquidación al terminar
- Indemnización al terminar si hay agencia comercial (Código de Comercio, art. 1324)

### Arrendamiento comercial
- Índice de actualización del canon (IPC, acuerdo de partes)
- Gastos a cargo de cada parte (expensas, servicios, impuestos)
- Subarriendo y cesión del contrato
- Condiciones de entrega y restitución del inmueble

---

## INTEGRACIÓN CON EL ECOSISTEMA

- **Antes de este skill**: recibir el contrato y verificar quién lo redactó
- **Después de este skill**: `redactor-juridico-col` para pulir las contrapropuestas
- **Control de calidad**: `anti-hallucination-v2` si se citan normas específicas
- **Entregable final**: `kit-entregables-col` para formato Word/PDF de entrega al cliente
