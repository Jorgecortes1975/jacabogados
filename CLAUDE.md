# JAC - Abogados Asociados | Sistema MCP Jurídico Especializado

> **Sistema de consulta jurídica colombiana con protocolo de verificación en fuentes oficiales (diseño en desarrollo)**

> ESTADO REAL DE IMPLEMENTACIÓN (verificado el 2026-10-07 leyendo el código). Este documento describe el diseño objetivo, no capacidades en operación. El CLI `agente-juridico-especializado.js` solo muestra configuración (`activar`, `fuentes`, `help`); su comando `consulta` no está implementado: no busca ni verifica. El router `lexa-super-router.js` clasifica por palabras clave y construye un plan de flujo en texto; no despacha a agentes ni consulta fuentes. Ningún componente carga `agente-config.json`. Las cifras de precisión, disponibilidad y tiempos son metas sin medición. Hoy la verificación de normas y sentencias se hace como protocolo de trabajo (abogado o sesión de Claude con herramientas MCP conectadas), conforme a `PARAMETROS-AGENTE-ELITE.md`.

## 🎯 Visión General

Objetivos del sistema (diseño; ver el estado real al inicio de este documento):
- **9 fuentes legales oficiales colombianas** configuradas en `mcp-config.json` (conexión no verificada)
- **Agente de investigación asistida** bajo revisión del abogado responsable
- **Verificación de datos** contra múltiples fuentes como objetivo y como protocolo de trabajo manual
- **Meta de cero alucinaciones**: ninguna cita se presenta como cierta sin verificación en fuente oficial
- **Jurisprudencia y normas** a verificar en relatoría oficial, Diario Oficial o SUIN antes de usarlas

---

## 🚀 INICIO RÁPIDO: Activar Agente Jurídico

```bash
# Activar agente jurídico especializado
node agente-juridico-especializado.js activar

# Ver fuentes integradas
node agente-juridico-especializado.js fuentes

# Ver ejemplos de consultas
node agente-juridico-especializado.js help
```

---

## 📚 Agente Jurídico Especializado

### ¿Qué es?

Definición de un agente de investigación asistida para jurisprudencia, leyes, normas, decretos y resoluciones de fuentes oficiales colombianas. Hoy el CLI solo muestra su configuración; la consulta y verificación efectivas se hacen como protocolo de trabajo (ver `PARAMETROS-AGENTE-ELITE.md`).

### Capacidades objetivo (diseño, no implementadas en el CLI)

1. **Búsqueda de Jurisprudencia**
   - Sentencias de Corte Constitucional
   - Decisiones de Corte Suprema
   - Providencias de Consejo de Estado

2. **Consulta de Normas**
   - Leyes vigentes
   - Decretos presidenciales
   - Resoluciones ministeriales
   - Via SUIN (Sistema Único de Información Normativa)

3. **Análisis de Casos**
   - Compara tu caso con jurisprudencia oficial
   - Identifica precedentes relevantes
   - Genera análisis fundamentado

4. **Verificación de Datos**
   - Objetivo: validar información contra múltiples fuentes oficiales
   - Objetivo: no presentar como cierto lo que no se pudo verificar
   - Hoy se cumple solo mediante verificación humana o de sesión, con registro de fuente y fecha

5. **Generación de Reportes**
   - Reportes jurídicos documentados
   - Citas verificables
   - Análisis profesional

### Fuentes Integradas (9 Instituciones Oficiales)

| Fuente | Contenido | Estado |
|--------|-----------|--------|
| **Corte Constitucional** | Jurisprudencia, sentencias, auto-acordos | Configurada (conexión no verificada) |
| **Consejo de Estado** | Jurisprudencia, sentencias, decisiones | Configurada (conexión no verificada) |
| **Corte Suprema de Justicia** | Jurisprudencia, sentencias, providencias | Configurada (conexión no verificada) |
| **Legal Data Hunter** | 38M+ documentos, 230+ jurisdicciones (cifras del proveedor) | Configurada (conexión no verificada) |
| **Diario Oficial** | Decretos, resoluciones, normas, edictos | Configurada (conexión no verificada) |
| **SUIN** | Leyes, decretos, resoluciones normativas | Configurada (conexión no verificada) |
| **Congreso de la República** | Proyectos de ley, leyes, actos legislativos | Configurada (conexión no verificada) |
| **Superintendencia de Sociedades** | Jurisprudencia, circulares, resoluciones | Configurada (conexión no verificada) |
| **DIAN** | Normas tributarias, conceptos, resoluciones | Configurada (conexión no verificada) |

---

## 💻 Comandos de Consulta

### Sintaxis General

Aviso: el comando `consulta` no está implementado. Imprime una advertencia y termina con código de salida 2. Las secciones siguientes describen el resultado objetivo de diseño.

```bash
node agente-juridico-especializado.js consulta <tipo> "<pregunta>"
```

### Tipos de Consulta

#### 1. **Jurisprudencia** - Buscar sentencias oficiales

```bash
node agente-juridico-especializado.js consulta jurisprudencia \
  "despido sin justa causa sentencias corte suprema"
```

**Resultado objetivo de diseño (no implementado):**
- Sentencias de Corte Constitucional
- Decisiones de Corte Suprema
- Precedentes del Consejo de Estado
- Análisis de jurisprudencia

#### 2. **Norma** - Buscar leyes, decretos, resoluciones

```bash
node agente-juridico-especializado.js consulta norma \
  "código sustantivo del trabajo artículos 1 a 30"
```

**Resultado objetivo de diseño (no implementado):**
- Texto normativo vigente
- Modificaciones posteriores
- Normas relacionadas
- Fuente oficial

#### 3. **Análisis** - Analizar caso contra jurisprudencia

```bash
node agente-juridico-especializado.js consulta analisis \
  "Mi cliente fue despedido sin justa causa. ¿Qué dice la jurisprudencia?"
```

**Resultado objetivo de diseño (no implementado):**
- Jurisprudencia aplicable
- Precedentes relevantes
- Análisis caso a caso
- Recomendaciones legales

#### 4. **Verificar** - Verificar información legal

```bash
node agente-juridico-especializado.js consulta verificar \
  "El salario mínimo en Colombia es $1.600.000"
```

**Resultado objetivo de diseño (no implementado):**
- Verificación contra fuentes oficiales
- Estado actual de la norma
- Fuentes que lo confirman
- Validez de la información

#### 5. **Reporte** - Generar reporte jurídico completo

```bash
node agente-juridico-especializado.js consulta reporte \
  "Análisis completo sobre derechos de trabajadores en Colombia"
```

**Resultado objetivo de diseño (no implementado):**
- Reporte estructurado
- Jurisprudencia relevante
- Normativa aplicable
- Citas verificables
- Análisis profesional

---

## 🛡️ Protocolo de Verificación (objetivos de diseño)

El software actual no ofrece garantías de verificación. Estos son los objetivos y el protocolo que rigen el trabajo, definidos en `PARAMETROS-AGENTE-ELITE.md` y en `.specify/memory/constitution.md`:

1. Ninguna norma o sentencia se cita sin confirmar existencia, texto, vigencia, autoridad, fecha y fuente oficial.
2. Cada conclusión indica su nivel de certeza: alto, medio o sujeto a verificación.
3. Sin verificación, se usa la advertencia obligatoria y la respuesta se entrega como preliminar.
4. Toda salida es un borrador sujeto a revisión del abogado responsable. El agente no firma, radica ni notifica.
5. La verificación cruzada en varias fuentes es un objetivo de la implementación futura, no una capacidad actual.

---

## 📋 Sistema de Transportes MCP

### Configuración de Transportes

Los transportes se almacenan en `mcp-config.json` y se gestionan mediante el CLI `claude-mcp-transport.js`.

### Uso del Comando CLI

```bash
# Agregar un nuevo transporte
node claude-mcp-transport.js add --transport stdio --name "legal-search" --command "node server.js"

# Listar transportes activos
node claude-mcp-transport.js list

# Activar un transporte
node claude-mcp-transport.js activate legal-search

# Eliminar un transporte
node claude-mcp-transport.js remove legal-search
```

### Tipos de Transporte Soportados

#### 1. **stdio** (Entrada/Salida Estándar)
Comunicación directa con procesos locales.

#### 2. **sse** (Server-Sent Events)
Conexiones persistentes bidireccionales para servidores remotos.

#### 3. **http** (HTTP/HTTPS)
Transporte REST para APIs legales.

---

## 🔧 Configuración Avanzada

### Estructura de Configuración

```json
{
  "version": "1.0",
  "transports": {
    "corte-constitucional": {
      "type": "http",
      "url": "https://www.corteconstitucional.gov.co",
      "api": "https://www.corteconstitucional.gov.co/wp-json/wp/v2",
      "fuente": "Corte Constitucional de Colombia",
      "contenido": ["jurisprudencia", "sentencias", "auto-acordos"],
      "enabled": true,
      "oficial": true
    }
  },
  "agents": {
    "juridico-especializado": {
      "nombre": "Agente Jurídico Especializado JAC",
      "tipo": "investigador-juridico-automatizado",
      "funciones": ["búsqueda-jurisprudencia", "consulta-normas", ...],
      "verificacionDatos": {
        "enabled": true,
        "requiereMultiplesFuentes": true,
        "validarContraOficial": true
      }
    }
  }
}
```

---

## 🧭 Spec Kit: Desarrollo Guiado por Especificaciones

Este repositorio integra [Spec Kit](https://github.com/github/spec-kit) (GitHub), instalado como
skills de Claude Code en `.claude/skills/speckit-*`. Se usa para planear y construir cambios
medianos o grandes del ecosistema (nuevas fuentes, nuevos tipos de consulta, nuevos agentes) antes
de escribir código, en lugar de improvisar directamente sobre `agente-juridico-especializado.js`,
`lexa-super-router.js` o los transportes MCP.

### Principios del proyecto

Los principios rectores (sin alucinaciones, verificación multi-fuente, español jurídico por
defecto, trazabilidad, simplicidad) están en `.specify/memory/constitution.md`, derivados
directamente de las garantías de este documento. Actualízalos con:

```bash
/speckit-constitution
```

### Flujo recomendado para una funcionalidad nueva

```bash
/speckit-specify   "Descripción de la funcionalidad en términos de qué y por qué"
/speckit-clarify    # opcional: resolver ambigüedades antes de planear
/speckit-plan       "Stack y decisiones técnicas (Node.js, MCP, fuente X, etc.)"
/speckit-tasks
/speckit-analyze    # opcional pero recomendado si toca verificación de datos
/speckit-implement
```

Cada spec y plan se genera en español dentro de `specs/`, salvo identificadores técnicos, siguiendo
el principio III de la constitución.

---

## 📖 Ejemplos de Uso Práctico

### Caso 1: Consulta Rápida de Jurisprudencia

```bash
node agente-juridico-especializado.js consulta jurisprudencia \
  "abandono injustificado del trabajo consecuencias"
```

### Caso 2: Verificación Normativa

```bash
node agente-juridico-especializado.js consulta norma \
  "requisitos para terminar contrato por justa causa"
```

### Caso 3: Análisis de Situación Específica

```bash
node agente-juridico-especializado.js consulta analisis \
  "Cliente tiene conflicto de interés con su empleador. ¿Cómo procede?"
```

### Caso 4: Reporte Profesional

```bash
node agente-juridico-especializado.js consulta reporte \
  "Estado actual del derecho de huelga en Colombia"
```

---

## 🐛 Troubleshooting

**Error: "Agente no activado"**
- Ejecuta: `node agente-juridico-especializado.js activar`

**Error: "Fuente no disponible"**
- Verifica: `node agente-juridico-especializado.js fuentes`

**Resultado no verificado**
- Todo resultado debe verificarse en fuente oficial. El agente no verifica automáticamente.

---

## 📞 Soporte

**Rama:** `claude/colombia-legal-prospects-gask4u`  
**Sistema:** Agente Jurídico Especializado JAC  
**Versión:** 1.0  
**Última actualización:** 2026-08-02

---

**JAC - Abogados Asociados | Sistema de Investigación Jurídica Automatizada**
