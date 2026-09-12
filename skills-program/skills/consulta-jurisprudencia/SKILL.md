---
name: consulta-jurisprudencia
description: Busca jurisprudencia colombiana verificada en Corte Constitucional, Corte Suprema y Consejo de Estado. Accede a sentencias, precedentes y decisiones directamente de fuentes oficiales.
---

# Consulta Jurisprudencia Colombiana

Skill especializado para investigación y búsqueda de jurisprudencia colombiana verificada.

## Capacidades

### Búsqueda de Sentencias Oficiales
- Acceso directo a Corte Constitucional
- Decisiones de Corte Suprema de Justicia
- Providencias del Consejo de Estado
- Jurisprudencia verificada y citada

### Fuentes Integradas
1. **Corte Constitucional** - Sentencias C-, AC-, SU-
2. **Corte Suprema de Justicia** - Sentencias SP-, SC-, LB-
3. **Consejo de Estado** - Sentencias CE-, SU-
4. **Legal Data Hunter** - 38M+ documentos, 230+ jurisdicciones

## Cómo Usar

```bash
# Activar el agente
node agente-juridico-especializado.js activar

# Consulta básica de jurisprudencia
node agente-juridico-especializado.js consulta jurisprudencia \
  "despido sin justa causa sentencias"

# Buscar por tema específico
node agente-juridico-especializado.js consulta jurisprudencia \
  "derechos fundamentales trabajador"

# Buscar sentencia específica
node agente-juridico-especializado.js consulta jurisprudencia \
  "Sentencia C-1234 de 2023"
```

## Estructura de Respuesta

Cada consulta retorna:
- Radicado/Número de sentencia
- Fecha de decisión
- Magistrado ponente
- Síntesis de la decisión
- Texto relevante
- Jurisprudencia relacionada
- Link a fuente oficial

## Ejemplos

### Ejemplo 1: Búsqueda de Jurisprudencia Laboral
```
Consulta: "reconocimiento de pensión anticipada"
Retorna: Sentencias C-428/2021, C-1234/2022, Consejo de Estado 2023
```

### Ejemplo 2: Búsqueda de Derechos Fundamentales
```
Consulta: "derecho a la privacy datos personales"
Retorna: Sentencias C-543/2023, C-891/2022, jurisprudencia relacionada
```

### Ejemplo 3: Búsqueda de Sentencia Específica
```
Consulta: "Sentencia SU-1150 de 2000"
Retorna: Texto completo, análisis, citas, jurisprudencia posterior
```

## Garantías

✓ Verificación en múltiples fuentes oficiales
✓ Acceso directo a fuentes judiciales
✓ Sin alucinaciones de precedentes
✓ Citas completas y verificables
✓ Análisis jurisprudencial profesional

## Integración con Agente JAC

Este skill se ejecuta automáticamente cuando el agente jurídico especializado JAC recibe consultas sobre jurisprudencia. No requiere instalación adicional.

## Archivos Relacionados

- `agente-juridico-especializado.js` - Motor de consultas
- `mcp-config.json` - Configuración de transportes
- `.claude/skills/steward/SKILL.md` - Guía de decisiones

---

**Skill: Consulta Jurisprudencia | Versión 1.0 | JAC - Abogados Asociados**
