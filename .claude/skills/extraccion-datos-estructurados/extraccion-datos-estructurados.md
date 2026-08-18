# Skill: Extracción de Datos Jurídicos a Tablas Estructuradas

**Versión:** 2.0  
**Tipo:** Data Organization & Analysis  
**Ramas:** Todas (Laboral, Civil, Penal, Administrativo, Comercial, Corporativo)  
**Modelo:** Claude - Extractor de datos jurídicos  

## 📋 Descripción

Extrae datos de jurisprudencia, normas, artículos, o documentos desordenados y los organiza en tablas limpias y estructuradas para análisis posterior en Excel o Google Sheets.

## 🎯 Casos de Uso

- Extracción de jurisprudencia de un fallo completo
- Organización de sentencias por criterio jurídico
- Tablas de normas y artículos modificados
- Listado de decisiones de magistrados
- Análisis de precedentes por tema
- Extracción de multas o sanciones administrativas
- Compilación de requisitos procedimentales

## 🔧 Prompt Maestro

```
Extrae los datos relevantes de este documento/página jurídico 
y organízalos en una tabla Excel-compatible.

DOCUMENTO A ANALIZAR:
[Contenido o descripción de página]

ESTRUCTURA REQUERIDA:
Crea una tabla con estas columnas:
- [Columna 1 específica para rama]
- [Columna 2 específica para rama]
- [Columna 3 específica para rama]
- Fundamento Legal
- Aplicabilidad
- Vigencia

RAMA JURÍDICA: [especificar]
CONTEXTO: [describir para qué necesitas estos datos]

Formato de salida: Markdown con | separadores para copiar 
directamente a Excel
```

## 📊 Salida Esperada

| Sentencia | Corte | Radicado | Tema | Ratio Decidendi | Vigencia | Aplicabilidad |
|-----------|-------|----------|------|-----------------|----------|---------------|
| SCS-2019-001 | Corte Suprema | 12345-2019 | Despido sin justa causa | Empleador debe probar... | VIGENTE | Nacional |

## 🔌 Integración

- **Trigger:** Manual (extracción a demanda)
- **Interacción:** Investigador Jurisprudencial
- **Salida:** Tabla estructurada + formato Excel-ready
- **Almacenamiento:** `outputs/datos-estructurados/`

## ✅ Criterios de Calidad

- ✓ Datos completos y precisos
- ✓ Encabezados claros
- ✓ Formato copeable a Excel
- ✓ Información verificable
- ✓ Sin omisiones de datos relevantes
