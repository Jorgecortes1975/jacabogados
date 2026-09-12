---
name: consulta-normas
description: Acceso a normas colombianas vigentes: leyes, decretos, resoluciones y normas técnicas directamente de SUIN, Diario Oficial y Congreso de la República.
---

# Consulta Normas Colombianas

Skill para búsqueda y consulta de normas legales colombianas vigentes.

## Capacidades

### Acceso a Normas Oficiales
- Leyes de la República (Ley 1234 de 2023)
- Decretos Presidenciales (Decreto 1234 de 2023)
- Resoluciones Ministeriales (Resolución 1234 de 2023)
- Actos Legislativos
- Normas técnicas (ICONTEC)

### Fuentes Integradas
1. **SUIN Juriscol** - Sistema Único de Información Normativa
2. **Diario Oficial** - Decretos, resoluciones, normas
3. **Congreso de la República** - Leyes y actos legislativos
4. **Ministerios Especializados** - Normas sectoriales

## Cómo Usar

```bash
# Activar el agente
node agente-juridico-especializado.js activar

# Consulta de ley específica
node agente-juridico-especializado.js consulta norma \
  "código sustantivo del trabajo artículos 1 a 50"

# Buscar norma por tema
node agente-juridico-especializado.js consulta norma \
  "salario mínimo 2024"

# Buscar decreto específico
node agente-juridico-especializado.js consulta norma \
  "Decreto 1234 de 2023"
```

## Estructura de Respuesta

Cada consulta retorna:
- Identificación completa de la norma
- Texto vigente
- Modificaciones y derogaciones
- Fecha de vigencia
- Autoridad expedidora
- Normas conexas
- Link a fuente oficial SUIN

## Ejemplos

### Ejemplo 1: Código Sustantivo del Trabajo
```
Consulta: "contrato de trabajo requisitos artículo 23"
Retorna: Artículo 23 CST, modificaciones, jurisprudencia relacionada
```

### Ejemplo 2: Decreto Sobre Salario Mínimo
```
Consulta: "salario mínimo mensual 2024 decreto"
Retorna: Decreto vigente, valor, fecha vigencia, comparativo años anteriores
```

### Ejemplo 3: Resolución de Superintendencia
```
Consulta: "requisitos constitución sociedad anónima"
Retorna: Norma aplicable, artículos, procedimiento, documentos requeridos
```

## Garantías

✓ Normas vigentes de SUIN
✓ Acceso directo a Diario Oficial
✓ Sin normas derogadas o modificadas sin advertencia
✓ Trazabilidad completa de modificaciones
✓ Citas verificables en fuentes oficiales

## Integración con Agente JAC

Este skill se ejecuta cuando el agente recibe consultas sobre normas, leyes, decretos o requisitos legales. Se integra automáticamente con el Agente Jurídico Especializado.

## Archivos Relacionados

- `agente-juridico-especializado.js` - Motor de consultas
- `mcp-config.json` - Configuración de transportes
- SUIN: https://suin-juriscol.cuenta.unal.edu.co

---

**Skill: Consulta Normas | Versión 1.0 | JAC - Abogados Asociados**
