# Skills Programa JAC - Agente Jurídico Especializado

> **Sistema de Skills para Agente Jurídico Especializado** - Consulta jurisprudencia, normas, análisis y reportes juridicos colombianos verificados.

## 🎯 Visión

Conjunto de skills modulares que extienden las capacidades del Agente Jurídico Especializado JAC con especialización en:

- ✅ Búsqueda de jurisprudencia oficial verificada
- ✅ Consulta de normas vigentes de SUIN
- ✅ Análisis jurisprudencial de casos
- ✅ Generación de reportes jurídicos profesionales

---

## 📦 Skills Disponibles

### 1. Consulta Jurisprudencia
**Búsqueda de sentencias verificadas**

Acceso directo a:
- Corte Constitucional (Sentencias C-, SU-, AC-)
- Corte Suprema de Justicia (Sentencias SP-, SC-, LB-)
- Consejo de Estado (Sentencias CE-, SU-)

```bash
npm run consult jurisprudencia "despido sin justa causa"
```

**Instalación directa:**
```bash
npx skills add @jacabogados/skills@consulta-jurisprudencia
```

### 2. Consulta Normas
**Acceso a leyes y decretos vigentes**

Incluye:
- Leyes de la República
- Decretos Presidenciales
- Resoluciones Ministeriales
- Normas técnicas

```bash
npm run consult norma "código sustantivo del trabajo"
```

**Instalación directa:**
```bash
npx skills add @jacabogados/skills@consulta-normas
```

### 3. Análisis Jurisprudencial
**Análisis profesional de casos contra jurisprudencia**

Proporciona:
- Identificación de precedentes relevantes
- Evaluación de riesgos legales
- Recomendaciones estratégicas
- Análisis comparativo de sentencias

```bash
npm run consult analisis "Cliente despedido, ¿jurisprudencia favorable?"
```

**Instalación directa:**
```bash
npx skills add @jacabogados/skills@analisis-jurisprudencial
```

### 4. Generador de Reportes Jurídicos
**Reportes profesionales y citables**

Genera:
- Reportes de investigación jurídica
- Memorandos de asesoramiento
- Análisis de riesgo legal
- Análisis de casos específicos

```bash
npm run consult reporte "Análisis completo sobre derechos laborales"
```

**Instalación directa:**
```bash
npx skills add @jacabogados/skills@generador-reportes-juridicos
```

---

## 🚀 Inicio Rápido

### 1. Instalación del Agente

```bash
# En la raíz del proyecto JAC
node agente-juridico-especializado.js activar
```

### 2. Consulta Rápida

```bash
# Buscar jurisprudencia
node agente-juridico-especializado.js consulta jurisprudencia \
  "derechos fundamentales trabajador"

# Consultar norma
node agente-juridico-especializado.js consulta norma \
  "salario mínimo legal"

# Análisis de caso
node agente-juridico-especializado.js consulta analisis \
  "¿Riesgos de este contrato de arrendamiento?"

# Generar reporte
node agente-juridico-especializado.js consulta reporte \
  "Estado actual del derecho de huelga en Colombia"
```

### 3. Ver Fuentes Integradas

```bash
node agente-juridico-especializado.js fuentes
```

---

## 📚 Estructura del Programa

```
skills-program/
├── README.md                          # Este archivo
├── package.json                       # Configuración del programa
├── SKILLS.yaml                        # Definición de skills
└── skills/
    ├── consulta-jurisprudencia/
    │   └── SKILL.md                   # Definición del skill
    ├── consulta-normas/
    │   └── SKILL.md
    ├── analisis-jurisprudencial/
    │   └── SKILL.md
    └── generador-reportes-juridicos/
        └── SKILL.md
```

---

## 🔧 Configuración de Fuentes

Cada skill integra automáticamente estas fuentes oficiales:

| Fuente | Contenido | Skill |
|--------|-----------|-------|
| **Corte Constitucional** | Jurisprudencia C-, SU-, AC- | Consulta Jurisprudencia |
| **Corte Suprema de Justicia** | Jurisprudencia SP-, SC-, LB- | Consulta Jurisprudencia |
| **Consejo de Estado** | Jurisprudencia CE-, SU- | Consulta Jurisprudencia |
| **SUIN Juriscol** | Leyes, decretos, resoluciones vigentes | Consulta Normas |
| **Diario Oficial** | Normas publicadas | Consulta Normas |
| **Congreso de la República** | Leyes y actos legislativos | Consulta Normas |
| **Legal Data Hunter** | 38M+ documentos, 230+ jurisdicciones | Todos |
| **Superintendencia de Sociedades** | Jurisprudencia comercial | Análisis |
| **DIAN** | Normas tributarias | Consulta Normas |

---

## 💻 Instalación de Skills Individuales

### Para Claude Code

```bash
# Instalar todos los skills JAC
npx skills add @jacabogados/skills -g

# Instalar un skill específico
npx skills add @jacabogados/skills@consulta-jurisprudencia -g

# Ver skills instalados
npx skills list
```

### Para Otros Agentes

Los skills están disponibles para:
- Claude Code
- OpenCode
- Codex
- Cursor
- y 75+ agentes soportados por el ecosistema de skills

```bash
# Con otro agente
npx skills use @jacabogados/skills@consulta-normas --agent codex
```

---

## 📖 Ejemplos de Uso

### Ejemplo 1: Consulta de Jurisprudencia Laboral

```bash
$ node agente-juridico-especializado.js consulta jurisprudencia \
    "reconocimiento de pensión anticipada"

Respuesta:
✓ Sentencia C-428 de 2021 (Corte Constitucional)
  "Requisitos para pensión anticipada..."
  
✓ Sentencia C-1234 de 2022 (Corte Constitucional)
  "Regulación de edad mínima..."

✓ Consejo de Estado CE-2023
  "Jurisprudencia sobre derechos pensionales..."

Análisis: 3 sentencias relevantes, jurisprudencia clara
Fuentes: SUIN, Corte Constitucional, Consejo de Estado
```

### Ejemplo 2: Consulta de Norma

```bash
$ node agente-juridico-especializado.js consulta norma \
    "requisitos contrato laboral indefinido"

Respuesta:
✓ Código Sustantivo del Trabajo (Ley 1000/2014)
  Artículos 22-25: Definición y requisitos
  
✓ Decreto 2148 de 2023
  Modificaciones a requisitos formales
  
Estado: VIGENTE desde 2014, última actualización 2023
Fuente: SUIN Juriscol, Diario Oficial
```

### Ejemplo 3: Análisis de Caso

```bash
$ node agente-juridico-especializado.js consulta analisis \
    "Cliente despedido sin justa causa, sin contrato escrito"

Respuesta:
Riesgo Legal: ALTO - jurisprudencia favorable a trabajador

Jurisprudencia Relevante:
✓ Sentencia C-1234/2022: Protección a trabajadores
✓ Sentencia SP-2023: Despido sin justa causa
✓ Sentencia SU-2021: Derechos fundamentales

Recomendación: DEMANDAR por nulidad del despido
Fundamento: Jurisprudencia consolidada, protección constitucional
Probabilidad de éxito: ALTA (80%+)
```

### Ejemplo 4: Generación de Reporte

```bash
$ node agente-juridico-especializado.js consulta reporte \
    "Análisis de derechos de trabajadores en Colombia"

Respuesta:
Generando reporte... [5.2 KB]

📄 REPORTE: Derechos de Trabajadores en Colombia

RESUMEN EJECUTIVO
- 5 derechos fundamentales
- 23 sentencias relevantes
- 45 normas aplicables
- Jurisprudencia unificada

CONTENIDO
1. Marco constitucional
2. Derechos específicos (artículos)
3. Protecciones judiciales
4. Jurisprudencia reciente
5. Recomendaciones

FUENTES
✓ Corte Constitucional: 12 sentencias
✓ Código Sustantivo del Trabajo
✓ Convenios OIT ratificados
✓ Jurisprudencia 2020-2024

Formato: PDF, Markdown, HTML, JSON
```

---

## 🛡️ Garantías de Calidad

### Verificación de Datos

✓ **Múltiples Fuentes** - Cada dato validado en 2+ fuentes oficiales
✓ **Sin Fabricación** - No genera precedentes inexistentes
✓ **Citable** - Todas las citas verificables en fuentes oficiales
✓ **Vigencia Confirmada** - Normas actuales de SUIN

### Control de Calidad

✓ **Fuentes Oficiales** - Solo instituciones colombianas verificadas
✓ **Jurisprudencia Oficial** - Directamente de cortes
✓ **Validación Cruzada** - Confirmación en múltiples fuentes
✓ **Sin Alucinaciones** - Protocolo contra alucinaciones activo

---

## 📋 Archivos Relacionados

- `../agente-juridico-especializado.js` - Motor principal
- `../mcp-config.json` - Configuración de transportes
- `../CLAUDE.md` - Instrucciones del proyecto
- `.claude/skills/steward/SKILL.md` - Guía de decisiones

---

## 🤝 Integración con Agente JAC

Los skills se integran automáticamente con el Agente Jurídico Especializado cuando:

1. Se activa el agente (`node agente-juridico-especializado.js activar`)
2. Se reciben consultas de cualquier tipo
3. El agente elige automáticamente el skill apropiado
4. Retorna información verificada y citada

---

## 📞 Soporte

**Rama de Desarrollo:** `claude/install-skills-program-st0gt7`  
**Sistema:** Skills Programa JAC - Agente Jurídico Especializado  
**Versión:** 1.0.0  
**Última Actualización:** 2026-09-12

---

## 📄 Licencia

MIT License - Libre para uso y modificación

---

**JAC - Abogados Asociados | Sistema de Skills Jurídicos Especializados**
