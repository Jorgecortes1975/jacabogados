---
name: normalizador-datos-col
description: >
  Normaliza, limpia y estructura datos empresariales, financieros, operativos
  y de causas jurídicas para producir KPIs, diagnósticos e insumos listos para
  dashboards HTML, reportes ejecutivos, análisis NIIF/NCIF y entregables del
  Bufete Cortés Cartagena. Activar cuando el usuario cargue CSV, tablas pegadas,
  exportaciones de Excel, datos de facturación, registros de causas, estados
  financieros, datos de nómina o cualquier información desestructurada que
  requiera limpieza y conversión a formato ejecutivo. También activar ante:
  normaliza estos datos, limpia este archivo, calcula KPIs, convierte a tabla,
  tengo datos sucios, necesito métricas de esto, procesa este CSV, estructura
  esta información, ¿qué dicen estos números?, diagnóstico de datos, datos de
  la empresa cliente, datos del despacho, registros de causas, datos de
  honorarios, libro de bancos, flujo de caja. SIEMPRE activar cuando el usuario
  aporte datos numéricos o tabulares sin estructura ejecutiva clara.
---

# NORMALIZADOR DE DATOS — COLOMBIA v1.0
## Bufete Cortés Cartagena — LEXA-LAB Empresarial

**Abogado titular:** Jorge Ángel Cortés Cartagena — T.P. 365.594
**Versión:** 1.0 — Junio 2026
**Fuente arquitectónica:** Pack IA Dirección Ejecutiva PRO (adaptación colombiana)

---

## NATURALEZA DE LA SKILL

Esta skill transforma datos brutos, sucios o desestructurados en insumos limpios,
verificados y listos para análisis ejecutivo. Opera como capa 0 del ecosistema
de análisis empresarial: los datos que procesa aquí alimentan `analisis-empresarial-col`,
`dashboard-ejecutivo-col` y `analisis-financiero-empresarial-col`.

**Principio operativo:** No se embellecen datos malos. Si la información tiene
vacíos o inconsistencias, se declaran expresamente antes de calcular.

---

## TIPOS DE DATOS QUE PROCESA

| Tipo | Ejemplos | Skill destino |
|---|---|---|
| Financiero empresarial | Estado de resultados, balance, flujo de caja | `analisis-financiero-empresarial-col` |
| Operativo de empresa cliente | Ventas, producción, inventario, RRHH | `analisis-empresarial-col` |
| Causas y expedientes | Radicados activos, etapas, términos, honorarios | `kpi-juridico-col` |
| Facturación del despacho | Honorarios facturados, cartera, gastos | `analisis-empresarial-col` (modo despacho) |
| Nómina y parafiscales | Salarios, prestaciones, UGPP, seguridad social | `analisis-financiero-empresarial-col` |
| Marketing y digital | Métricas de redes, leads, conversiones | `marketing-digital-col` |

---

## PROCESO OBLIGATORIO

### Paso 1: RECONOCIMIENTO DE ESTRUCTURA

- Identificar columnas y su significado real
- Detectar el período que cubren los datos
- Identificar la unidad de medida (pesos COP, USD, unidades, casos, días)
- Detectar si hay datos NIIF o simplificados
- Verificar si hay IVA incluido o excluido en cifras monetarias

### Paso 2: DIAGNÓSTICO DE CALIDAD

Declarar el estado de los datos antes de procesar:

| Problema | Tipo | Acción |
|---|---|---|
| Nulos o celdas vacías | Vacío | Identificar y declarar supuesto |
| Duplicados | Duplicado | Eliminar y documentar |
| Valores atípicos extremos | Outlier | Marcar `[Revisar — valor atípico]` |
| Fechas inconsistentes | Formato | Estandarizar a DD/MM/AAAA |
| Monedas mixtas (COP/USD) | Tipo | Convertir con TRM indicada o marcar `[Requiere TRM]` |
| Categorías sin etiqueta | Clasificación | Solicitar al usuario o inferir con `[Inferencia]` |
| Datos contradictorios | Conflicto | Declarar el conflicto, no ignorarlo |

### Paso 3: ESTANDARIZACIÓN

- Normalizar nombres de columnas en español técnico colombiano
- Estandarizar formatos de fecha, moneda y porcentaje
- Clasificar filas según categoría relevante para el análisis
- Crear columna de estado: Verificado / Inferido / Requiere revisión

### Paso 4: CÁLCULO DE KPIs DERIVADOS

**Para datos financieros colombianos:**
- Razón corriente: Activo corriente / Pasivo corriente (saludable: > 1.5)
- Prueba ácida: (Activo corriente - Inventarios) / Pasivo corriente
- Margen operacional: Utilidad operacional / Ingresos totales
- Margen neto: Utilidad neta / Ingresos totales
- Endeudamiento total: Pasivo total / Activo total (alerta: > 70%)
- Rotación de cartera: Ingresos / Cuentas por cobrar

**Para datos de causas/despacho:**
- Causas activas por abogado
- Promedio días por etapa procesal
- Tasa de éxito por área de práctica
- Facturación por causa activa
- Cartera vencida vs. corriente

**Para datos operativos de empresa cliente:**
- Crecimiento de ventas período anterior
- Ticket promedio
- Índice de rotación de personal
- Productividad por empleado

### Paso 5: SALIDA ESTRUCTURADA

Entregar en este orden:

1. **Ficha del dataset:** origen, período, registros, cobertura
2. **Reporte de calidad:** problemas encontrados y acciones tomadas
3. **Diccionario de datos:** columna → significado → tipo → fuente
4. **KPIs calculados:** con fórmula, valor y semáforo
5. **Datos normalizados:** tabla limpia, lista para usar
6. **Supuestos declarados:** todo lo que se infirió o completó
7. **Recomendaciones:** qué datos adicionales mejorarían el análisis

---

## FORMATOS DE SALIDA

| Formato | Cuándo usarlo |
|---|---|
| Tabla Markdown | Análisis en conversación, vista rápida |
| CSV estructurado | Para alimentar dashboards o análisis posteriores |
| JSON de KPIs | Para consumo por `dashboard-ejecutivo-col` |
| Reporte Word | Para entregar al cliente como documento formal |

Cuando el usuario pida archivo, usar skill `docx` para Word o generar CSV/JSON en `/mnt/user-data/outputs/`.

---

## PROTOCOLO ANTI-ALUCINACIÓN

- No calcular promedios ni totales si hay nulos no declarados
- No afirmar tendencias si hay menos de 3 períodos comparables
- No convertir monedas sin TRM oficial declarada `[Requiere TRM — verificar en Banco de la República]`
- No clasificar datos en categorías CIIU sin el código exacto
- Marcar siempre: `[Verificado]` / `[Inferencia]` / `[Requiere revisión del cliente]`
- Si los datos son insuficientes para el análisis pedido: declararlo y no inventar cifras

---

## INTEGRACIÓN CON EL ECOSISTEMA LEXA-LAB

```
Datos brutos del usuario
    ↓
normalizador-datos-col (ESTA SKILL) → datos limpios + KPIs
    ↓
analisis-financiero-empresarial-col → análisis NIIF/daños
analisis-empresarial-col → diagnóstico multiagente
    ↓
dashboard-ejecutivo-col → entregable HTML
kit-entregables-col → empaquetado final
```

---

## CERTIFICACIÓN DE CALIDAD

Antes de entregar, verificar:

1. Todo nulo fue declarado, no ignorado
2. Todo supuesto está etiquetado `[Inferencia]`
3. Los KPIs tienen fórmula explícita
4. La moneda y período están claramente identificados
5. El diccionario de datos está completo
6. El reporte de calidad declara los problemas encontrados

| Resultado | Criterio |
|---|---|
| APTO PARA ANÁLISIS | 6/6 verificados |
| CONDICIONAL | 4-5/6 — aclarar antes de usar |
| REQUIERE CORRECCIÓN | < 4/6 — no proceder hasta subsanar |

---

*Bufete Cortés Cartagena — Jorge Ángel Cortés Cartagena T.P. 365.594 — Medellín, Colombia — 2026*
