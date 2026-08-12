# Skill: Resolución de Errores Jurídicos y Procedimentales

**Versión:** 2.0  
**Tipo:** Problem Solving & Technical Legal  
**Ramas:** Todas (Laboral, Civil, Penal, Administrativo, Comercial, Corporativo)  
**Modelo:** Claude - Análisis de errores legales  

## 📋 Descripción

Identifica y resuelve errores en documentos legales, cálculos, procedimientos, o interpretaciones normativas. Análiza el error contextualmente y proporciona la solución exacta con explicación jurídica.

## 🎯 Casos de Uso

- Error en cálculo de indemnización laboral
- Fórmula incorrecta de liquidación de salarios
- Término procesal incorrecto en demanda
- Requisito formal omitido en documento
- Cita jurisprudencial que no coincide con contenido
- Término administrativo mal calculado
- Error de interpretación normativa

## 🔧 Prompt Maestro

```
Analiza este error jurídico o procedimental:

CONTEXTO:
- Rama del derecho: [laboral/civil/penal/administrativo/comercial/corporativo]
- Objetivo: [descripción de qué se intenta lograr]
- Error identificado: [copiar el error, código, fórmula, interpretación]

PREGUNTA:
¿Cuál es el error exacto y cuál es la solución correcta?

Proporciona:
1. Identificación exacta del error
2. Consecuencia legal del error (si se hubiera dejado)
3. Solución correcta paso a paso
4. Fundamento normativo o jurisprudencial
5. Prevención de errores similares
6. Nivel de gravedad: CRÍTICO / IMPORTANTE / MENOR
```

## 📊 Salida Esperada

```
ERROR IDENTIFICADO: Cálculo incorrecto de salario integral
GRAVEDAD: CRÍTICO (afecta prestaciones sociales)

SOLUCIÓN CORRECTA:
[Fórmula correcta con ejemplo]

FUNDAMENTO: Código Sustantivo del Trabajo, Art. 132
JURISPRUDENCIA: CSJ Sentencia 2019-12345

IMPACTO EVITADO: $2.5M en pasivo laboral
```

## 🔌 Integración

- **Trigger:** Manual (cuando se detecta error)
- **Interacción:** Auditor de Riesgos Contractuales
- **Salida:** Análisis de error + solución + prevención
- **Almacenamiento:** `outputs/errores-resueltos/`

## ✅ Criterios de Calidad

- ✓ Identificación precisa del error
- ✓ Solución verificable
- ✓ Fundamento normativo citado
- ✓ Análisis de consecuencias
- ✓ Prevención de errores recurrentes
