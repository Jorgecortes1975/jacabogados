# NotebookLM - Recursos de Ingeniería de Prompts

**Última actualización:** Julio 2026  
**Enfoque:** Prompting de frontera para modelos de IA transmodal  
**Propósito:** Centralizar mejores prácticas y directrices técnicas de prompting para equipos que utilizan NotebookLM

---

## 📋 Contenido

### 1. **Guías Principales**
- `manual_prompting_frontera_consolidado.md` - Manual técnico completo sin duplicados
- `notebooklm_instruccion_maestra.md` - Instrucción del "cerebro" de NotebookLM para IA generativa
- `estado_ia_mundial_julio2026.md` - Análisis estratégico de IA (modelos, agentes, casos de uso)

### 2. **Recursos Técnicos**
- `urls_oficiales_prompting.md` - Todas las fuentes oficiales (OpenAI, Google, Anthropic, etc.)
- `modelos_frontera_comparativa.md` - Matriz comparativa de modelos 2026 (GPT-5.5, o3, Claude 5, Gemini 3.5, etc.)
- `casos_uso_impacto_2026.md` - Casos de uso prioritarios por industria

### 3. **Prompts Listos**
- `prompts/` - Templates de prompts optimizados por modelo y tarea

---

## 🚀 Instalación Rápida

### Opción 1: Copiar la Instrucción Maestra en NotebookLM

1. Abre tu notebook en [NotebookLM](https://notebooklm.google.com)
2. Ve a **Instrucciones de Guía** o **System Instructions**
3. Copia el contenido completo de `notebooklm_instruccion_maestra.md`
4. Pega y guarda
5. Tu notebook ahora tendrá el rol de Consultor Experto en Prompting

### Opción 2: Usar como Referencia Local

1. Clona este repositorio o descarga los archivos
2. Abre `manual_prompting_frontera_consolidado.md` en tu editor favorito
3. Consulta según la plataforma/modelo que uses (Gemini, GPT, Claude, Midjourney, etc.)

---

## 📚 Estructura por Modelo (2026)

### **Modelos de Razonamiento** (Simplicidad = Mejor)
- **OpenAI:** o3, o3-pro, o4-mini
- **Directriz clave:** NO uses Chain of Thought manual; deja que el modelo razone internamente
- **Patrón:** Prompts simples, directos, enfoque en el QUÉ (objetivo y restricciones)

### **Modelos Generales/Productividad**
- **Google:** Gemini 3.5 Flash/Pro
- **Anthropic:** Claude 5, Claude Sonnet 5
- **OpenAI:** GPT-5.5
- **Directriz clave:** Estructura de 4 partes (Persona, Tarea, Contexto, Formato) o XML para Claude
- **Patrón:** Few-shot examples, delimitadores claros

### **Imagen Generativa**
- **Midjourney:** V8.1
- **Directriz clave:** Descripción visual rica en inglés + parámetros al final
- **Patrón:** Avoid buzzwords ("photorealistic"), describe media (e.g., "shot on 35mm film")

### **Video Generativo**
- **MiniMax/Hailuo AI:** Hailuo Video 2.3
- **Directriz clave:** Comandos de cámara en corchetes + duración 5-6 segundos
- **Patrón:** [Push in], [Static shot], [Tracking shot], etc.

### **Otros**
- **Qwen 3 (Alibaba):** System/User/Assistant roles estrictos, NO CoT manual
- **Fuentes oficiales:** Ver `urls_oficiales_prompting.md`

---

## ⚙️ Cómo Usar Este Repositorio

### Si trabajas con **Gemini**:
→ Ve a `manual_prompting_frontera_consolidado.md`, sección **Google Gemini**  
→ Aplica el Framework de 4 Partes (Persona, Tarea, Contexto, Formato)

### Si trabajas con **Claude**:
→ Usa **etiquetas XML**: `<instructions>`, `<context>`, `<rules>`, `<output_format>`  
→ Consulta `manual_prompting_frontera_consolidado.md`, sección **Anthropic Claude**

### Si generas **imágenes con Midjourney**:
→ Lee la sección **Midjourney** del manual  
→ Estructura: [Descripción visual en inglés] + [Parámetros: --ar, --s, --c, --weird, --v 8.1]

### Si necesitas un prompt **de entrada a NotebookLM**:
→ Copia `notebooklm_instruccion_maestra.md` en las instrucciones del notebook  
→ Describe el modelo, tipo, objetivo y restricciones  
→ NotebookLM generará el prompt optimizado

---

## 📊 Matriz Rápida: ¿Qué Modelo Usar?

| Caso de Uso | Modelo Recomendado | Por Qué |
|---|---|---|
| **Código/QA de Alta Complejidad** | o3, Claude 5 | Razonamiento especializado |
| **Análisis de Documentos** | Claude 5, Gemini 3.5 | Excelente procesamiento multimodal |
| **Creatividad/Marketing** | GPT-5.5, Gemini 3.5 | Velocidad + calidad balanceada |
| **Agentes/Terminal** | Claude 5, Gemini 3.5 | Capacidades agentivas robustas |
| **Imágenes** | Midjourney V8.1 | Mejor control visual + estilo |
| **Video** | Hailuo Video 2.3 | Video nativo + audio sincronizado |

---

## 🔍 Validación y Mejoras Realizadas

✅ **Consolidado:** Eliminados documentos duplicados  
✅ **Actualizado:** Todas las URLs verificadas (Julio 2026)  
✅ **Estructurado:** Índice claro, navegación fácil  
✅ **Práctico:** Incluy directrices técnicas + ejemplos + comparativas  
✅ **Multimodal:** Cubre texto, imagen, video, agentes, razonamiento  

---

## 📞 Soporte y Referencias

- **Google Gemini:** https://ai.google.dev/gemini-api/docs/prompting-strategies
- **OpenAI:** https://platform.openai.com/docs/guides/prompt-engineering
- **Anthropic Claude:** https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
- **Midjourney:** https://docs.midjourney.com/docs/prompts
- **Qwen/Alibaba:** https://www.alibabacloud.com/help/en/model-studio/user-guide/prompt-engineering
- **MiniMax:** https://github.com/MiniMax-AI

Ver `urls_oficiales_prompting.md` para el listado completo.

---

## 📝 Licencia & Atribución

Contenido compilado de documentación oficial de:
- Google (Gemini, Workspace)
- OpenAI (GPT, o-series)
- Anthropic (Claude)
- Midjourney
- Alibaba (Qwen, Model Studio)
- MiniMax/Hailuo AI

Consolidado y mejorado para uso organizacional interno.  
**Fecha:** 30 de Julio de 2026

---

**¿Tienes dudas?** Consulta el manual completo o las URLs oficiales incluidas en este repositorio.
