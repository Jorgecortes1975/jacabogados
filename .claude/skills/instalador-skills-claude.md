# Instalador Automático de Skills para Claude

## Descripción
Agente especializado en instalar y configurar los 329+ superpoderes (skills, agentes y comandos) del repositorio `alirezarezvani/claude-skills` para optimizar el flujo de trabajo del despacho J.A.C.

## Capacidades
- ✅ Instalar skills en Claude Desktop (app de escritorio)
- ✅ Instalar skills en Claude Code (terminal)
- ✅ Preparar archivos ZIP listos para subir
- ✅ Crear carpetas de pruebas sin afectar instalación principal
- ✅ Catalogar todas las skills disponibles por categoría
- ✅ Recomendar skills según tu rol (abogado, marketing, ingeniería)

## Casos de Uso

### 1. Quiero instalar skills rápidamente en la terminal
**Input**: "Instala las skills de marketing y derecho"
**Acción**: Ejecuta los comandos `/plugin install` necesarios

### 2. Necesito preparar ZIPs para la app de escritorio
**Input**: "Prepara los ZIPs de estas 5 skills"
**Acción**: Clona el repo, empaqueta ZIPs, los deja en Descargas

### 3. Quiero probar sin romper nada
**Input**: "Crea una carpeta de pruebas y cataloga todas las skills"
**Acción**: Crea carpeta isolated, lista todas las skills por categoría

## Requisitos Previos
- [ ] Claude Desktop instalado (descarga gratis en claude.ai/download)
- [ ] Settings → Capabilities: **Code Execution** activado
- [ ] Settings → Capabilities: **File Creation** activado
- [ ] (Opcional) Claude Code instalado para terminal

## Prompts Listos para Copiar

### Prompt 1: Instalar por nombre (Claude Code)
```
Quiero instalar estas skills del repo alirezarezvani/claude-skills:
[NOMBRES separados por comas, ej: marketing-skill, engineering-team]

Hazlo así:
1. Añade el marketplace con /plugin marketplace add alirezarezvani/claude-skills si aún no está añadido
2. Instala cada skill con /plugin install <nombre>@claude-code-skills
3. Si algún nombre no existe exactamente, busca el más parecido en el repo, dime cuál encontraste
4. Cuando termines, listame las skills instaladas y recuérdame que tengo que reiniciar Claude Code
```

### Prompt 2: Preparar ZIPs para app de escritorio
```
Necesito subir skills del repo alirezarezvani/claude-skills a la app de Claude Desktop.
La app solo acepta archivos .zip que contengan dentro un SKILL.md.

Por favor:
1. Clona el repo en una carpeta temporal
2. Empaqueta como ZIP independiente cada una de estas skills: [NOMBRES]
3. Verifica que cada ZIP tiene su SKILL.md en la raíz
4. Mueve los ZIPs finales a mi carpeta de Descargas
5. Dime exactamente qué archivos dejaste en Descargas para subirlos uno a uno
```

### Prompt 3: Crear carpeta de pruebas y catalogar
```
Quiero probar skills del repo alirezarezvani/claude-skills sin tocar mi instalación principal.

Hazlo así:
1. Crea una carpeta nueva en mi Escritorio: claude-skills-pruebas
2. Clona el repo: git clone https://github.com/alirezarezvani/claude-skills.git
3. Lista TODAS las skills disponibles agrupadas por categoría (marketing, ingeniería, producto, finanzas, productividad, derecho, legal)
4. Para cada skill: nombre + descripción en una línea
5. NO instales nada todavía. Espero a que te diga cuáles quiero activar
```

## Categorías de Skills Disponibles
- 🎯 **Marketing**: Copy, SEO, email, social media, influencer marketing
- 🏗️ **Ingeniería**: Code review, debugging, arquitectura, DevOps
- 📦 **Producto**: Roadmap, specks, user research, analytics
- 💰 **Finanzas**: Budgets, forecasting, reporting, análisis financiero
- ⚡ **Productividad**: Project management, time tracking, automation
- ⚖️ **Legal**: Contratos, investigación jurídica, redacción legal (ESPECIALIDAD J.A.C.)
- 📊 **Datos**: Análisis, visualización, dashboards

## Regla de Oro ⭐
**Empieza con 3-5 skills relacionadas con lo que TÚ haces de verdad.**

No instales 50 a la vez. Instalas pocas, las usas una semana, ves cuáles te sirven, luego añades más o quitas las que sobran.

## Pasos Rápidos

### Desktop (más sencillo)
1. Settings → Capabilities → Skills → Upload skill
2. Selecciona el .zip
3. Menciona la skill por nombre en un chat nuevo
4. Claude la activa automáticamente

### Terminal (más rápido)
```bash
/plugin marketplace add alirezarezvani/claude-skills
/plugin install marketing-skill@claude-code-skills
# Reinicia Claude Code para cargar
```

## Solución de Problemas

**P: ¿Por qué no aparece mi skill después de instalarla?**
R: Casi siempre: no activaste Code Execution o File Creation en Settings → Capabilities. Verifica.

**P: ¿Dónde se guardan las skills en terminal?**
R: En `~/.claude/skills/` automáticamente.

**P: ¿Puedo usar skills en el móvil?**
R: Todavía no. Solo app de escritorio, navegador (claude.ai) y terminal.

**P: ¿Cuál es la diferencia entre skill, agente y comando?**
- **Skill**: Un saber especializado (redactar copy). Claude lo activa solo cuando lo necesita.
- **Agente**: Un Claude que trabaja contigo en un rol (estratega, revisor, planner).
- **Comando**: Un atajo. `/algo` ejecuta una tarea entera.

## Fuente Original
Guía de AIMAX Agency (@david_ai_pro)
Repositorio: alirezarezvani/claude-skills (329 skills + 30 agentes + 70 comandos, gratis)

---

**¿Necesitas ayuda?** Usa estos prompts o dime qué quieres hacer y te guío paso a paso.
