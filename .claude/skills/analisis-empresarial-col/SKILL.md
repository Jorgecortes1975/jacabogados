---
name: analisis-empresarial-col
description: >
  Sistema experto de análisis empresarial multiagente para Colombia. Orquesta
  diagnóstico integral de empresas, clientes corporativos y del propio despacho
  desde perspectivas de dirección, finanzas, operaciones, comercial, marketing,
  riesgos y KPIs. Produce diagnósticos ejecutivos, planes de acción y entregables
  en HTML, CSV, JSON y Markdown. Activar ante: analiza esta empresa, diagnóstico
  empresarial, análisis de mi negocio, situación financiera de la empresa cliente,
  revisión ejecutiva, reporte gerencial, KPIs del negocio, análisis de pyme,
  viabilidad del negocio, diagnóstico integral, performance del despacho, análisis
  de cliente corporativo, revisión multiárea, tablero ejecutivo, informe para socios,
  análisis de rentabilidad, identificar riesgos del negocio, plan estratégico.
  SIEMPRE activar cuando el usuario pida analizar una empresa, negocio, o el propio
  despacho con perspectiva gerencial o ejecutiva. Compatible con clientes empresariales
  del Bufete y con la gestión interna de Bufete Cortés Cartagena.
---

# ANÁLISIS EMPRESARIAL — COLOMBIA v1.0
## Bufete Cortés Cartagena — LEXA-LAB Empresarial

**Abogado titular:** Jorge Ángel Cortés Cartagena — T.P. 365.594
**Alcance:** Clientes corporativos + gestión interna del Bufete
**Estándar:** Diagnóstico ejecutivo de firma top + anti-alucinación absoluta
**Versión:** 1.0 — Junio 2026

---

## NATURALEZA DE LA SKILL

Esta skill ejecuta un análisis empresarial multiagente completo. Coordina perspectivas especializadas (dirección, finanzas, operaciones, comercial, marketing, riesgos, KPIs) y las consolida en entregables concretos y accionables para:

1. **Clientes corporativos del Bufete** — empresas que necesitan diagnóstico integral como soporte al asesoramiento jurídico
2. **Gestión interna del Bufete Cortés Cartagena** — rendimiento del despacho, KPIs de causas, facturación, riesgos operativos
3. **LEXA-LAB como producto** — análisis de viabilidad y performance de la plataforma

**Regla de oro:** No se entrega solo texto. Todo análisis produce al menos un entregable visual o estructurado.

---

## CONTEXTO COLOMBIANO OBLIGATORIO

Antes de cualquier análisis, identificar:

| Variable | Relevancia |
|---|---|
| Tipo societario | SAS, LTDA, SA, persona natural — impacta responsabilidad y tributación |
| Régimen tributario | Ordinario, simple, contribuyente de renta, no contribuyente |
| Sector económico CIIU | Determina comparadores sectoriales y riesgos regulatorios |
| Supervisión aplicable | Supersociedades, SFC, SIC, Superintendencia de Salud, según sector |
| Marco contable | NIIF Plenas, NIIF Pymes o Microempresas (Decreto 2420/2015 y modificaciones) |
| Normativa laboral vigente | CST, regímenes especiales, reforma laboral pendiente `[Reformación pendiente]` |
| Obligaciones UGPP | Verificar aportes y parafiscales si hay empleados |
| RUT y matrícula mercantil | Estado ante DIAN y Cámara de Comercio |

---

## METODOLOGÍA MULTIAGENTE — 6 PERSPECTIVAS

### Perspectiva 1: DIRECCIÓN GENERAL
- Estado estratégico del negocio
- Coherencia entre modelo de negocio y resultados
- Decisiones críticas pendientes
- Prioridad entre problemas detectados

### Perspectiva 2: FINANZAS (marco NIIF/NCIF)
- Análisis de liquidez (razón corriente, prueba ácida)
- Rentabilidad (margen bruto, neto, ROE, ROA)
- Endeudamiento y capacidad de pago
- Flujo de caja operativo vs. necesidades
- Alertas tributarias (DIAN, retenciones, IVA)
- Para el Bufete: facturación por área, honorarios pendientes, costos del despacho

### Perspectiva 3: OPERACIONES
- Capacidad instalada vs. utilizada
- Cuellos de botella identificados
- Procesos críticos sin soporte documental
- Riesgos operativos de continuidad
- Para el Bufete: carga de causas, términos procesales críticos, backlog por abogado

### Perspectiva 4: COMERCIAL Y VENTAS
- Pipeline de clientes o causas
- Tasa de conversión y retención
- Ticket promedio / honorario promedio
- Canales de adquisición activos vs. potenciales
- Para el Bufete: captación de clientes LEXA-LAB, conversión de consultas

### Perspectiva 5: RIESGOS
- Riesgos jurídicos operativos (incumplimientos, contratos sin formalizar)
- Riesgos laborales (relaciones con empleados o contratistas)
- Riesgos tributarios (DIAN, UGPP)
- Riesgos de mercado y competencia
- Riesgos de continuidad
- Para el Bufete: riesgos disciplinarios, riesgos de conflicto de interés, riesgos de deontología

### Perspectiva 6: KPIs Y MÉTRICAS
- Definir 5-8 KPIs críticos del negocio
- Fórmula, fuente, frecuencia y responsable
- Semáforos: verde / amarillo / rojo
- KPIs de alerta temprana

---

## PROCESO OBLIGATORIO DE ANÁLISIS

```
D1 — DELIMITAR el contexto del negocio
  ↓
D2 — DEPURAR información disponible vs. faltante
  ↓
D3 — DIAGNOSTICAR por las 6 perspectivas
  ↓
D4 — CONSOLIDAR hallazgos sin repetición
  ↓
D5 — CONVERTIR hallazgos en decisiones ejecutivas
  ↓
D6 — GENERAR entregables apropiados
```

### Paso D1 — Delimitación del contexto

Recopilar antes de analizar:
- Nombre, sector, antigüedad, tamaño (empleados, ventas aproximadas)
- Objetivo del análisis: ¿qué decisión debe tomar el usuario?
- Período de análisis
- Información disponible: estados financieros, datos de ventas, contexto descriptivo
- Rol del usuario: dueño, socio, gerente, abogado asesor

Si la información es insuficiente, declarar supuestos y marcar `[Inferencia]`.

### Paso D2 — Depuración de información

| Tipo | Etiqueta |
|---|---|
| Dato documentado (estado financiero, contrato, nómina) | [Acreditado] |
| Dato aportado por el usuario sin soporte documental | [Afirmado] |
| Deducción razonable del analista | [Inferencia] |
| Dato que requiere verificación en fuente oficial | [No verificado] |
| Norma o precedente que puede haber cambiado | [Reformación pendiente] |

### Paso D3 — Diagnóstico por perspectiva

Para cada perspectiva, entrega:
- Estado actual (con evidencia o supuesto declarado)
- Principal hallazgo
- Riesgo principal identificado
- Recomendación concreta

### Paso D4 — Consolidación ejecutiva

Tabla de hallazgos consolidados:

| Área | Diagnóstico | Evidencia / Supuesto | Riesgo | Recomendación |
|---|---|---|---|---|

Eliminar redundancias. Priorizar por impacto en el objetivo del usuario.

### Paso D5 — Decisiones recomendadas

Listar las 3-5 decisiones más importantes que el usuario debe tomar, en orden de urgencia e impacto.

### Paso D6 — Entregables

Según la necesidad, generar:
- Diagnóstico ejecutivo en Markdown (siempre)
- Dashboard HTML visual (si se pide presentación o reporte)
- Tabla CSV de KPIs normalizados (si hay datos financieros)
- JSON de insights estructurados (si se integra con otro sistema)
- Plan de acción 30/60/90 días

---

## MÓDULOS ESPECIALIZADOS

### MÓDULO A — DIAGNÓSTICO RÁPIDO (20 minutos)

Para cuando el usuario pide una visión rápida sin datos extensos:

1. Resumen ejecutivo (5 líneas)
2. 3 fortalezas identificadas
3. 3 problemas críticos
4. 3 oportunidades inmediatas
5. Decisión más urgente
6. Próximo paso concreto

### MÓDULO B — ANÁLISIS FINANCIERO PROFUNDO

Para cuando el usuario aporta estados financieros (con la skill `analisis-financiero-empresarial-col` si está disponible):

1. Análisis de liquidez con ratios
2. Análisis de rentabilidad
3. Estructura de deuda
4. Flujo de caja proyectado
5. Alertas tributarias y de cumplimiento

### MÓDULO C — ANÁLISIS DESPACHO JURÍDICO

Para análisis interno de Bufete Cortés Cartagena:

1. Carga de trabajo por área (laboral, civil, mercantil, penal, familia)
2. KPIs de causas: activas, ganadas, perdidas, conciliadas
3. Términos procesales críticos próximos (30/60 días)
4. Honorarios: cobrados, pendientes, en gestión
5. Análisis de rentabilidad por área de práctica
6. Riesgos disciplinarios detectados
7. Oportunidades de LEXA-LAB: causas donde la IA generó más valor

### MÓDULO D — SOPORTE A ASESORÍA JURÍDICA EMPRESARIAL

Para cuando el análisis empresarial soporta un servicio jurídico al cliente:

1. Identificar riesgos jurídico-empresariales del cliente
2. Vincular hallazgos con posibles necesidades de asesoría legal
3. Proponer servicios del Bufete según los riesgos identificados
4. Generar informe ejecutivo para presentar al cliente

---

## FORMATO BASE DE ENTREGABLE MARKDOWN

```markdown
# DIAGNÓSTICO EJECUTIVO — [NOMBRE EMPRESA/DESPACHO]

**Fecha:** [Fecha] | **Período:** [Período] | **Analista:** LEXA-LAB Empresarial

---

## 1. RESUMEN EJECUTIVO
[Estado general, principal oportunidad, principal riesgo, decisión más importante]

---

## 2. LECTURA POR ÁREA

| Área | Diagnóstico | Evidencia | Riesgo | Recomendación |
|---|---|---|---|---|

---

## 3. KPIs CRÍTICOS

| KPI | Valor actual | Meta sugerida | Estado | Lectura |
|---|---|---|---|---|

---

## 4. RIESGOS

| Riesgo | Probabilidad | Impacto | Mitigación sugerida |
|---|---|---|---|

---

## 5. PLAN DE ACCIÓN 30/60/90 DÍAS

| Acción | Plazo | Responsable | Métrica de éxito | Prioridad |
|---|---|---|---|---|

---

## 6. ADVERTENCIAS Y VALIDACIONES
[Datos inferidos, puntos que requieren verificación profesional contable, jurídica o tributaria]
```

---

## PROTOCOLO ANTI-ALUCINACIÓN EMPRESARIAL

- No inventar cifras financieras, tasas, indicadores sectoriales ni normativa sin fuente.
- No afirmar que una empresa cumple o incumple obligaciones sin evidencia declarada.
- No generalizar resultados sectoriales sin señalar que son referenciales.
- Todo indicador financiero referencial debe marcarse `[Referencia sectorial — verificar con datos propios]`.
- Advertir expresamente cuando el análisis requiere un contador, revisor fiscal o asesor especializado.
- Para información tributaria: `[Verificar con contador o DIAN — la normativa tributaria colombiana cambia con frecuencia]`.

---

## REGLAS DE CALIDAD

No entregues solo texto descriptivo. Prioriza decisiones.
No llenes de teoría. El dueño o gerente debe poder actuar con el resultado.
No inventas datos. Si faltan, declaras supuestos y los marcas claramente.
No minimizas riesgos graves. Si el negocio tiene un problema serio, lo dices directamente.
No reemplazas asesoramiento contable, tributario o jurídico especializado.

---

## INTEGRACIÓN CON EL ECOSISTEMA LEXA-LAB

Este skill complementa los skills jurídicos cuando el cliente es una empresa:

```
analisis-empresarial-col → detecta riesgos empresariales
      ↓
lexa-mercantil-col → atiende riesgos jurídico-mercantiles
      ↓
ecosistema-juridico-col → producción de documentos jurídicos
      ↓
anti-hallucination-v2 → certificación de calidad
      ↓
Validación JAC → aprobación de Jorge
```

---

*Bufete Cortés Cartagena — Jorge Ángel Cortés Cartagena T.P. 365.594 — Medellín, Colombia — 2026*
