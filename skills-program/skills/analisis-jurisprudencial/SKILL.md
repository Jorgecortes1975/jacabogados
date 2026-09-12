---
name: analisis-jurisprudencial
description: Análisis profesional de casos contra jurisprudencia colombiana verificada. Identifica precedentes, riesgos legales y estrategia recomendada basada en sentencias oficiales.
---

# Análisis Jurisprudencial Colombiano

Skill para análisis integral de casos usando jurisprudencia colombiana verificada.

## Capacidades

### Análisis de Casos
- Comparación con jurisprudencia oficial
- Identificación de precedentes relevantes
- Evaluación de riesgo legal
- Recomendaciones estratégicas
- Análisis de jurisprudencia contradictoria

### Análisis Estructurado Por Área
1. **Derecho Laboral** - Despido, prestaciones, afiliación
2. **Derecho Comercial** - Sociedades, contratos, insolvencia
3. **Derecho Administrativo** - Actos administrativos, nulidad
4. **Derecho Civil** - Responsabilidad, contratos, familia
5. **Derechos Fundamentales** - Tutelas, habeas corpus

## Cómo Usar

```bash
# Activar el agente
node agente-juridico-especializado.js activar

# Análisis de situación específica
node agente-juridico-especializado.js consulta analisis \
  "Mi cliente fue despedido sin justa causa. ¿Qué dice la jurisprudencia?"

# Análisis de riesgo legal
node agente-juridico-especializado.js consulta analisis \
  "¿Cuál es el riesgo legal de este contrato de arrendamiento?"

# Análisis de estrategia
node agente-juridico-especializado.js consulta analisis \
  "¿Cuál es la mejor estrategia según la jurisprudencia reciente?"
```

## Estructura de Análisis

Cada análisis retorna:

### 1. Síntesis Ejecutiva
- Problema jurídico identificado
- Área de derecho aplicable
- Riesgo legal estimado (alto/medio/bajo)

### 2. Jurisprudencia Aplicable
- Sentencias directamente relevantes
- Precedentes favorecedores
- Precedentes adversos
- Evolución jurisprudencial

### 3. Normativa Aplicable
- Artículos de leyes aplicables
- Decretos relevantes
- Resoluciones administrativas

### 4. Análisis Caso a Caso
- Hechos vs precedentes
- Similitudes y diferencias
- Probabilidad de éxito

### 5. Recomendaciones
- Estrategia recomendada
- Acciones inmediatas
- Documentos a reunir
- Riesgos a evitar

### 6. Citas Verificables
- Número de sentencia
- Fecha y corte
- Link a fuente oficial
- Texto relevante

## Ejemplos

### Ejemplo 1: Despido Laboral
```
Entrada: Cliente despedido sin contrato escrito
Análisis: Jurisprudencia C-1234/2022, Corte Suprema SP-2023
Riesgo: ALTO - jurisprudencia favorable a trabajador
Recomendación: Demandar por nulidad del despido + pago prestaciones
```

### Ejemplo 2: Responsabilidad Civil
```
Entrada: Accidente en propiedad arrendada
Análisis: Consejo de Estado CE-2023, responsabilidad del arrendador
Riesgo: MEDIO - depende prueba de negligencia
Recomendación: Investigar causas, documentar, contactar asegurador
```

### Ejemplo 3: Conflicto de Interés Comercial
```
Entrada: Socio quiere vender su participación
Análisis: Sentencia C-891/2022, derechos de tanto, nulidad
Riesgo: ALTO - puede afectar control accionario
Recomendación: Ejercer derecho de tanto + evaluar asociados
```

## Garantías

✓ Análisis basado solo en jurisprudencia verificada
✓ Identificación de riesgos reales
✓ Comparación fáctica con precedentes
✓ Citas completas y verificables
✓ Evaluación imparcial de fortalezas y debilidades

## Limitaciones

⚠ No constituye asesoría legal profesional
⚠ Recomendado revisar con abogado especializado
⚠ Análisis preliminar sujeto a datos completos del caso
⚠ Jurisprudencia sujeta a cambios

## Integración con Agente JAC

Este skill se activa automáticamente cuando se solicita análisis de casos. Integra datos de jurisprudencia, normas y precedentes en un análisis profesional.

## Archivos Relacionados

- `agente-juridico-especializado.js` - Motor de análisis
- `consulta-jurisprudencia/SKILL.md` - Datos de sentencias
- `consulta-normas/SKILL.md` - Normas aplicables

---

**Skill: Análisis Jurisprudencial | Versión 1.0 | JAC - Abogados Asociados**
