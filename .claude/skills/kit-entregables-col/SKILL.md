---
name: kit-entregables-col
description: >
  Empaqueta y entrega resultados del ecosistema LEXA-LAB en formatos profesionales
  listos para clientes, socios, directivos o despachos judiciales: HTML ejecutivo,
  Word (.docx), PDF, CSV, JSON y Markdown. Coordina la entrega final de cualquier
  análisis, diagnóstico, estrategia o reporte generado en el Bufete Cortés
  Cartagena. Activar cuando el usuario quiera convertir un análisis o resultado
  en un entregable descargable y presentable. También activar ante: empaqueta
  esto, genera el archivo final, quiero el entregable, dame el Word, genera el
  PDF, crea el HTML, exporta esto, quiero enviarlo al cliente, arma el paquete,
  reporte descargable, presentación para directivos, entregable para el cliente,
  informe para socios, pack de documentos, compila los resultados, haz el
  documento final. SIEMPRE activar cuando el usuario pida convertir un análisis
  en un producto descargable o presentable. Compatible con todos los skills del
  ecosistema LEXA-LAB.
---

# KIT DE ENTREGABLES — COLOMBIA v1.0
## Bufete Cortés Cartagena — LEXA-LAB

**Abogado titular:** Jorge Ángel Cortés Cartagena — T.P. 365.594
**Versión:** 1.0 — Junio 2026
**Fuente arquitectónica:** Pack IA Dirección Ejecutiva PRO (adaptación colombiana)

---

## NATURALEZA DE LA SKILL

Esta skill es la capa final del ecosistema: toma el output de cualquier otro
skill y lo convierte en un entregable profesional que el cliente puede abrir,
ver, compartir o presentar directamente, sin rearmarlo manualmente.

**Principio de valor:** El usuario no debería tener que formatear lo que recibe.
El entregable sale listo.

---

## CATÁLOGO DE ENTREGABLES

### ENTREGABLES JURÍDICOS

| Producto | Formato | Skill que lo genera | Cuándo usarlo |
|---|---|---|---|
| Demanda / Contestación / Recurso | Word .docx | `ecosistema-juridico-col` + `docx` | Radicación ante despacho |
| Tutela | Word .docx | `ecosistema-juridico-col` + `docx` | Presentación urgente |
| Concepto jurídico | Word .docx | `redactor-juridico-col` + `docx` | Entrega a cliente empresarial |
| Análisis de sentencia | Word .docx | `analista-sentencias-col` + `docx` | Informe interno o para cliente |
| Hoja de encargo | Word .docx | `hoja-encargo-col` + `docx` | Inicio de relación cliente |
| Contrato de arrendamiento | Word .docx | `contrato-arrendamiento-col` + `docx` | Entrega al cliente |
| Reglamento Interno de Trabajo | Word .docx | `rit` + `docx` | Entrega a empresa cliente |

### ENTREGABLES EMPRESARIALES

| Producto | Formato | Skill que lo genera | Cuándo usarlo |
|---|---|---|---|
| Dashboard ejecutivo | HTML | `dashboard-ejecutivo-col` | Presentación a directivos |
| Diagnóstico multiagente | Markdown + HTML | `analisis-empresarial-col` | Reunión de diagnóstico |
| KPIs normalizados | CSV | `normalizador-datos-col` | Análisis de datos |
| Insights estructurados | JSON | `normalizador-datos-col` | Integración con sistemas |
| Plan de 90 días | Markdown / Word | `plan-90-dias-col` | Entrega de plan de acción |
| Reporte financiero | Word / HTML | `analisis-financiero-empresarial-col` | Cliente o uso interno |
| Análisis FODA | HTML / Word | `analisis-empresarial-col` | Planificación estratégica |

### ENTREGABLES DE MARKETING / LEXA-LAB

| Producto | Formato | Skill que lo genera | Cuándo usarlo |
|---|---|---|---|
| Plan de contenido | Markdown | `marketing-digital-col` | Ejecutar en redes |
| Estrategia de contenido | Word | `estrategia-contenido` | Presentar a equipo |
| Reporte de KPIs digitales | HTML | `dashboard-ejecutivo-col` | Reunión de marketing |

---

## PROCESO DE EMPAQUETADO

### Paso 1: IDENTIFICAR AUDIENCIA Y DESTINO

| Audiencia | Formato recomendado | Nivel de formalidad |
|---|---|---|
| Cliente persona natural | Word simple + PDF | Formal pero accesible |
| Cliente empresa mediana | Word corporativo + HTML | Alto — membrete y firma |
| Directivos internos | HTML ejecutivo | Muy alto — visual y sintético |
| Juzgado / Tribunal | Word en formato memorial | Máximo — estricto procesal |
| Socios / Inversionistas LEXA-LAB | HTML + PDF ejecutivo | Muy alto — datos y proyecciones |
| Uso interno del despacho | Markdown + JSON | Técnico — sin adornos |

### Paso 2: SELECCIONAR COMPONENTES DEL PAQUETE

Para cada entregable, confirmar qué incluye:

- **Portada** con membrete Bufete Cortés Cartagena (#1F3864 / #B8860B)
- **Resumen ejecutivo** (máximo 1 página)
- **Cuerpo del análisis** o escrito
- **Tablas y gráficos** si aplica
- **Plan de acción** si aplica
- **Advertencias de validación JAC** si contiene referencias jurídicas
- **Bloque de firma** con T.P. 365.594

### Paso 3: GENERAR ARCHIVOS

Según el tipo de entregable:

**Para Word (.docx):**
```
Activar skill docx con:
- Paleta: #1F3864 (azul institucional) / #B8860B (dorado)
- Alineación: JUSTIFIED
- Interlineado: line 276
- Tamaño: Carta (Letter)
- Márgenes: { top: 1440, right: 1260, bottom: 1440, left: 1440 }
- Numeración de páginas: sí
- Bloque firma: Jorge Ángel Cortés Cartagena — T.P. 365.594
- Output: /mnt/user-data/outputs/[nombre-documento].docx
```

**Para HTML:**
```
Activar skill dashboard-ejecutivo-col con:
- CSS interno autocontenido
- Sin JavaScript externo
- Responsive básico
- Paleta corporativa
- Output: /mnt/user-data/outputs/[nombre-reporte].html
```

**Para CSV / JSON:**
```
Generar directamente en /mnt/user-data/outputs/
Incluir README.md de uso si hay múltiples archivos
```

### Paso 4: VERIFICACIÓN ANTES DE ENTREGAR

**Para entregables jurídicos — checklist pre-entrega:**
- Todo escrito procesal pasa por `anti-hallucination-v2` antes de empaquetar
- Las normas citadas tienen etiqueta de certidumbre
- Los radicados de sentencias son verificables
- El encabezado, la firma y el T.P. son correctos
- El juzgado y la parte están correctamente identificados

**Para entregables empresariales — checklist pre-entrega:**
- Los datos tienen fuente declarada
- Los supuestos están etiquetados `[Inferencia]`
- El período cubierto está claro
- Las cifras en COP tienen el período monetario identificado
- El reporte es legible sin conocimiento previo del caso

### Paso 5: README DE USO (cuando hay múltiples archivos)

Si el entregable tiene más de un archivo, crear `README-entregable.md` con:
- Qué contiene cada archivo
- Cómo leerlos o abrirlos
- A quién está dirigido cada uno
- Fecha de generación y período cubierto

---

## PAQUETES TIPO LISTOS PARA ACTIVAR

### Paquete A: "Diagnóstico Empresarial Completo"
```
1. dashboard_ejecutivo.html — tablero visual para directivos
2. diagnostico_empresarial.docx — informe formal Word
3. kpis_normalizados.csv — datos para seguimiento
4. insights.json — hallazgos estructurados
```

### Paquete B: "Expediente Judicial del Cliente"
```
1. demanda_[nombre_caso].docx — escrito procesal
2. concepto_juridico_[tema].docx — soporte de análisis
3. plan_accion_juridico.md — estrategia procesal
```

### Paquete C: "Reporte LEXA-LAB para Socios"
```
1. dashboard_lexa_lab.html — indicadores de plataforma
2. reporte_ejecutivo.docx — informe formal
3. kpis_lexa.csv — datos de seguimiento
```

### Paquete D: "Entregable Mensual del Despacho"
```
1. dashboard_despacho_[mes].html — KPIs internos
2. informe_causas_activas.docx — estado de causas
3. reporte_facturacion.csv — datos financieros
```

---

## INTEGRACIÓN CON EL ECOSISTEMA

```
ANÁLISIS:
normalizador-datos-col → analisis-empresarial-col → analisis-financiero-empresarial-col
                                    ↓
                          kit-entregables-col (ESTA SKILL)
                                    ↓
ENTREGABLES:
dashboard-ejecutivo-col (HTML) + docx (Word) + CSV/JSON
```

---

*Bufete Cortés Cartagena — Jorge Ángel Cortés Cartagena T.P. 365.594 — Medellín, Colombia — 2026*
