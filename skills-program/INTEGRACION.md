# Integración del Programa Skills con Agente JAC

> **Guía técnica de integración del programa skills con el Agente Jurídico Especializado JAC**

---

## 📋 Contenido

1. [Arquitectura](#arquitectura)
2. [Componentes](#componentes)
3. [Flujo de Integración](#flujo-de-integración)
4. [Configuración](#configuración)
5. [Ejemplos de Integración](#ejemplos-de-integración)
6. [Troubleshooting](#troubleshooting)

---

## Arquitectura

### Diagrama de Integración

```
┌─────────────────────────────────────────────┐
│   USUARIO / CLIENTE                         │
└────────────────┬────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────┐
│   Agente Jurídico Especializado JAC         │
│   (agente-juridico-especializado.js)        │
└────────────────┬────────────────────────────┘
                 │
                 ▼
        ┌────────────────┐
        │  Skills Program │
        │  (skills-prog)  │
        └────────────────┘
                 │
        ┌────────┼────────┬──────────┐
        │        │        │          │
        ▼        ▼        ▼          ▼
    ┌────────┐ ┌──────┐ ┌────────┐ ┌──────────┐
    │Jurispru│ │Normas│ │Análisis│ │Reportes  │
    │dencia  │ │      │ │        │ │          │
    └────────┘ └──────┘ └────────┘ └──────────┘
        │        │        │          │
        └────────┼────────┼──────────┘
                 │
        ┌────────▼────────┐
        │  MCP Transportes │
        │  (mcp-config)    │
        └────────┬────────┘
                 │
    ┌────────────┼────────────┬──────────┐
    │            │            │          │
    ▼            ▼            ▼          ▼
 CORTES      SUIN/Diario   CONGRESO  LEGAL DATA
 OFICIALES   OFICIAL       REPÚBLICA  HUNTER
```

---

## Componentes

### 1. Agente Principal (`agente-juridico-especializado.js`)

**Rol:** Orquestador central que:
- Recibe consultas del usuario
- Determina qué skill utilizar
- Ejecuta el skill apropiado
- Procesa y retorna resultados

**Interface:**
```bash
node agente-juridico-especializado.js <comando> <tipo> "<consulta>"
```

### 2. Programa Skills (`skills-program/`)

**Rol:** Contenedor de skills especializados

**Skills incluidos:**
- `consulta-jurisprudencia` - Búsqueda de sentencias
- `consulta-normas` - Búsqueda de leyes/decretos
- `analisis-jurisprudencial` - Análisis de casos
- `generador-reportes-juridicos` - Reportes profesionales

### 3. Transportes MCP (`mcp-config.json`)

**Rol:** Define conexiones a fuentes oficiales

**Incluye:**
- Corte Constitucional (HTTP)
- Corte Suprema de Justicia (HTTP)
- Consejo de Estado (HTTP)
- SUIN (HTTP)
- Diario Oficial (HTTP)
- Congreso (HTTP)
- Legal Data Hunter (API)

---

## Flujo de Integración

### Flujo General de Consulta

```
USUARIO
  │
  ├─► Consulta: "despido sin justa causa"
  │
  ▼
AGENTE JURÍDICO JAC
  │
  ├─► Analiza: tipo de consulta = "jurisprudencia"
  │
  ├─► Carga: skill "consulta-jurisprudencia"
  │
  ├─► Prepara: parámetros de búsqueda
  │
  ▼
SKILL: CONSULTA JURISPRUDENCIA
  │
  ├─► Busca: en Corte Constitucional
  ├─► Busca: en Corte Suprema
  ├─► Busca: en Consejo de Estado
  ├─► Busca: en Legal Data Hunter
  │
  ▼
MCP TRANSPORTES
  │
  ├─► Conexión: Corte Constitucional
  ├─► Conexión: Corte Suprema
  ├─► Conexión: Consejo de Estado
  ├─► Conexión: Legal Data Hunter
  │
  ▼
FUENTES OFICIALES
  │
  ├─► Respuesta: Sentencia C-1234/2022
  ├─► Respuesta: Sentencia SP-2023
  ├─► Respuesta: Precedentes relacionados
  │
  ▼
MCP TRANSPORTES (consolidado)
  │
  ▼
SKILL (procesa resultados)
  │
  ▼
AGENTE JURÍDICO JAC (formatea)
  │
  ▼
USUARIO
  └─► Resultado estructurado y verificado
```

### Decisión de Skill

```javascript
function determinarSkill(consulta) {
  if (consulta.includes(['sentencia', 'jurisprudencia', 'precedente'])) {
    return 'consulta-jurisprudencia';
  }
  
  if (consulta.includes(['ley', 'decreto', 'resolución', 'norma'])) {
    return 'consulta-normas';
  }
  
  if (consulta.includes(['análisis', 'riesgo', 'caso'])) {
    return 'analisis-jurisprudencial';
  }
  
  if (consulta.includes(['reporte', 'memorando', 'investigación'])) {
    return 'generador-reportes-juridicos';
  }
}
```

---

## Configuración

### 1. Cargar Skills Disponibles

**Archivo:** `mcp-config.json`

```json
{
  "version": "1.0",
  "skills": {
    "consulta-jurisprudencia": {
      "enabled": true,
      "path": "./skills-program/skills/consulta-jurisprudencia",
      "description": "Busca jurisprudencia verificada"
    },
    "consulta-normas": {
      "enabled": true,
      "path": "./skills-program/skills/consulta-normas",
      "description": "Acceso a normas vigentes"
    },
    "analisis-jurisprudencial": {
      "enabled": true,
      "path": "./skills-program/skills/analisis-jurisprudencial",
      "description": "Análisis de casos"
    },
    "generador-reportes-juridicos": {
      "enabled": true,
      "path": "./skills-program/skills/generador-reportes-juridicos",
      "description": "Generador de reportes"
    }
  }
}
```

### 2. Configurar Transportes MCP

**Archivo:** `mcp-config.json`

```json
{
  "transports": {
    "corte-constitucional": {
      "type": "http",
      "url": "https://www.corteconstitucional.gov.co",
      "api": "https://www.corteconstitucional.gov.co/wp-json/wp/v2",
      "fuente": "Corte Constitucional",
      "skill": "consulta-jurisprudencia"
    },
    "corte-suprema": {
      "type": "http",
      "url": "https://www.cortesuprema.gov.co",
      "skill": "consulta-jurisprudencia"
    },
    "consejo-estado": {
      "type": "http",
      "url": "https://www.consejodeestado.gov.co",
      "skill": "consulta-jurisprudencia"
    },
    "suin": {
      "type": "http",
      "url": "https://suin-juriscol.cuenta.unal.edu.co",
      "skill": "consulta-normas"
    }
  }
}
```

### 3. Inicializar Programa

**Comando:**
```bash
npm run setup
```

**Qué hace:**
1. Verifica Node.js >= 22.20.0
2. Crea directorios
3. Instala dependencias
4. Carga skills en memoria

---

## Ejemplos de Integración

### Ejemplo 1: Consulta Simple

```bash
# Usuario solicita jurisprudencia
$ node agente-juridico-especializado.js consulta jurisprudencia \
    "despido sin justa causa"

# Flujo:
# 1. Agente recibe consulta
# 2. Identifica: tipo = "jurisprudencia"
# 3. Carga skill: "consulta-jurisprudencia"
# 4. Ejecuta búsquedas en paralelo:
#    - Corte Constitucional
#    - Corte Suprema
#    - Consejo de Estado
#    - Legal Data Hunter
# 5. Consolida resultados
# 6. Retorna: 3+ sentencias verificadas
```

### Ejemplo 2: Análisis de Caso

```bash
# Usuario solicita análisis
$ node agente-juridico-especializado.js consulta analisis \
    "Cliente fue despedido sin contrato escrito, quiere saber riesgos"

# Flujo:
# 1. Agente recibe consulta
# 2. Identifica: tipo = "analisis"
# 3. Carga skill: "analisis-jurisprudencial"
# 4. Internamente usa:
#    - skill "consulta-jurisprudencia" para encontrar sentencias
#    - skill "consulta-normas" para normas aplicables
# 5. Ejecuta análisis comparativo
# 6. Evalúa: riesgo ALTO
# 7. Retorna: Análisis con jurisprudencia y recomendaciones
```

### Ejemplo 3: Generación de Reporte

```bash
# Usuario solicita reporte
$ node agente-juridico-especializado.js consulta reporte \
    "Derechos laborales completo en Colombia"

# Flujo:
# 1. Agente recibe consulta
# 2. Identifica: tipo = "reporte"
# 3. Carga skill: "generador-reportes-juridicos"
# 4. Skill ejecuta internamente:
#    - Búsqueda masiva de jurisprudencia (consulta-jurisprudencia)
#    - Compilación de normas (consulta-normas)
#    - Análisis estructurado (analisis-jurisprudencial)
# 5. Genera reporte de 15+ páginas
# 6. Retorna: PDF/Markdown con citas verificables
```

---

## Troubleshooting

### Problema 1: Skill no cargado

**Síntoma:** Error "Skill no encontrado"

**Solución:**
```bash
# Verificar skills disponibles
node agente-juridico-especializado.js fuentes

# Recargar skills
npm run setup

# Verificar mcp-config.json
cat mcp-config.json | grep skills
```

### Problema 2: Fuente oficial no disponible

**Síntoma:** Error de conexión a Corte Constitucional

**Solución:**
```bash
# Verificar transportes
node claude-mcp-transport.js list

# Activar transporte específico
node claude-mcp-transport.js activate corte-constitucional

# Probar conexión
curl https://www.corteconstitucional.gov.co
```

### Problema 3: Resultado incompleto

**Síntoma:** Jurisprudencia falta, normas no se encuentran

**Solución:**
```bash
# Activar modo verbose
DEBUG=true node agente-juridico-especializado.js consulta jurisprudencia "tema"

# Verificar logs de transportes
tail -n 100 logs/mcp-transport.log
```

### Problema 4: Lentitud en búsqueda

**Síntoma:** Consultas tardan > 30 segundos

**Solución:**
```bash
# Verificar parallelización
grep "parallel" mcp-config.json

# Aumentar timeout
export MCP_TIMEOUT=60000

# Ejecutar
node agente-juridico-especializado.js consulta jurisprudencia "tema"
```

---

## Archivos de Integración

| Archivo | Rol | Actualizado |
|---------|-----|-------------|
| `agente-juridico-especializado.js` | Motor principal | ✓ Soporta skills |
| `mcp-config.json` | Configuración transportes | ✓ Incluye skills |
| `skills-program/` | Programa de skills | ✓ Nuevo módulo |
| `skills-program/SKILLS.yaml` | Definición de skills | ✓ Nuevo archivo |
| `.claude/skills/steward/SKILL.md` | Guía de decisiones | ✓ Referencia |

---

## Verificación de Integración

### Checklist Post-Instalación

```bash
# 1. Verificar instalación
node agente-juridico-especializado.js activar
# Expected: ✓ Agente activado

# 2. Ver skills cargados
npm run -prefix skills-program help
# Expected: 4 skills listados

# 3. Ver fuentes integradas
npm run -prefix skills-program sources
# Expected: 9+ fuentes oficiales

# 4. Test de consulta
node agente-juridico-especializado.js consulta jurisprudencia "prueba"
# Expected: Mínimo 1 resultado

# 5. Verificar MCP
node claude-mcp-transport.js list
# Expected: Transportes activos listados
```

---

## Documentación Relacionada

- `README.md` - Guía de uso
- `SKILLS.yaml` - Definición técnica de skills
- `../CLAUDE.md` - Instrucciones del proyecto principal
- `../mcp-config.json` - Configuración completa

---

**Programa Skills JAC | Versión 1.0.0 | Integración Completa**
