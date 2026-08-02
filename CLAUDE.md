# JAC - Abogados Asociados | Sistema MCP Jurídico Especializado

> **Sistema autónomo de consulta jurídica colombiana con verificación de datos en fuentes oficiales**

## 🎯 Visión General

Sistema completo que integra:
- ✅ **9 fuentes legales oficiales colombianas**
- ✅ **Agente jurídico automatizado** para investigación autónoma
- ✅ **Verificación de datos** contra múltiples fuentes
- ✅ **Sin alucinaciones** - solo información oficial
- ✅ **Jurisprudencia verificada** de cortes colombianas
- ✅ **Leyes y normas actualizadas**

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

Un agente autónomo que consulta automáticamente jurisprudencia, leyes, normas, decretos y resoluciones de fuentes oficiales colombianas verificadas.

### Capacidades

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
   - Valida información contra múltiples fuentes
   - Evita alucinaciones
   - Garantiza información verificada

5. **Generación de Reportes**
   - Reportes jurídicos documentados
   - Citas verificables
   - Análisis profesional

### Fuentes Integradas (9 Instituciones Oficiales)

| Fuente | Contenido | Estado |
|--------|-----------|--------|
| **Corte Constitucional** | Jurisprudencia, sentencias, auto-acordos | ✓ Activo |
| **Consejo de Estado** | Jurisprudencia, sentencias, decisiones | ✓ Activo |
| **Corte Suprema de Justicia** | Jurisprudencia, sentencias, providencias | ✓ Activo |
| **Legal Data Hunter** | 38M+ documentos, 230+ jurisdicciones | ✓ Activo |
| **Diario Oficial** | Decretos, resoluciones, normas, edictos | ✓ Activo |
| **SUIN** | Leyes, decretos, resoluciones normativas | ✓ Activo |
| **Congreso de la República** | Proyectos de ley, leyes, actos legislativos | ✓ Activo |
| **Superintendencia de Sociedades** | Jurisprudencia, circulares, resoluciones | ✓ Activo |
| **DIAN** | Normas tributarias, conceptos, resoluciones | ✓ Activo |

---

## 💻 Comandos de Consulta

### Sintaxis General

```bash
node agente-juridico-especializado.js consulta <tipo> "<pregunta>"
```

### Tipos de Consulta

#### 1. **Jurisprudencia** - Buscar sentencias oficiales

```bash
node agente-juridico-especializado.js consulta jurisprudencia \
  "despido sin justa causa sentencias corte suprema"
```

**Retorna:**
- Sentencias de Corte Constitucional
- Decisiones de Corte Suprema
- Precedentes del Consejo de Estado
- Análisis de jurisprudencia

#### 2. **Norma** - Buscar leyes, decretos, resoluciones

```bash
node agente-juridico-especializado.js consulta norma \
  "código sustantivo del trabajo artículos 1 a 30"
```

**Retorna:**
- Texto normativo vigente
- Modificaciones posteriores
- Normas relacionadas
- Fuente oficial

#### 3. **Análisis** - Analizar caso contra jurisprudencia

```bash
node agente-juridico-especializado.js consulta analisis \
  "Mi cliente fue despedido sin justa causa. ¿Qué dice la jurisprudencia?"
```

**Retorna:**
- Jurisprudencia aplicable
- Precedentes relevantes
- Análisis caso a caso
- Recomendaciones legales

#### 4. **Verificar** - Verificar información legal

```bash
node agente-juridico-especializado.js consulta verificar \
  "El salario mínimo en Colombia es $1.600.000"
```

**Retorna:**
- Verificación contra fuentes oficiales
- Estado actual de la norma
- Fuentes que lo confirman
- Validez de la información

#### 5. **Reporte** - Generar reporte jurídico completo

```bash
node agente-juridico-especializado.js consulta reporte \
  "Análisis completo sobre derechos de trabajadores en Colombia"
```

**Retorna:**
- Reporte estructurado
- Jurisprudencia relevante
- Normativa aplicable
- Citas verificables
- Análisis profesional

---

## 🛡️ Garantías de Seguridad Jurídica

### Protección contra Alucinaciones

✓ **Verificación Múltiple**: Cada dato se valida contra múltiples fuentes oficiales
✓ **Fuentes Oficiales**: Solo información de instituciones verificadas
✓ **Sin Fabricación**: No genera precedentes inexistentes
✓ **Citable**: Todas las respuestas tienen referencias verificables

### Control de Calidad

✓ **Instituciones Verificadas**: Solo fuentes oficiales colombianas
✓ **Datos Actualizados**: Información vigente de SUIN y Diario Oficial
✓ **Jurisprudencia Oficial**: Sentencias directas de cortes
✓ **Validación Cruzada**: Confirmación en múltiples fuentes

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
- El agente requiere múltiples fuentes - algunos temas pueden tener menos cobertura

---

## 📞 Soporte

**Rama:** `claude/colombia-legal-prospects-gask4u`  
**Sistema:** Agente Jurídico Especializado JAC  
**Versión:** 1.0  
**Última actualización:** 2026-08-02

---

**JAC - Abogados Asociados | Sistema de Investigación Jurídica Automatizada**
