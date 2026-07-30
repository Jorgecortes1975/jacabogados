# Manual de Ingeniería de Prompts Multimodal - Julio 2026

**Versión:** 1.0 Consolidada  
**Fecha:** 30 de Julio de 2026  
**Alcance:** Modelos de Frontera (Gemini 3.5, GPT-5.5/o3, Claude 5, Midjourney V8.1, Qwen 3, MiniMax)

---

## 📖 Tabla de Contenidos

1. [Google Gemini](#1-google-gemini)
2. [OpenAI & ChatGPT](#2-openai--chatgpt)
3. [Anthropic Claude](#3-anthropic-claude)
4. [Midjourney](#4-midjourney)
5. [Qwen (Alibaba)](#5-qwen-alibaba)
6. [MiniMax & Hailuo AI](#6-minimax--hailuo-ai)

---

## 1. Google Gemini

**Versiones:** Gemini 3.5 Pro/Flash, Gemini Omni

### Directrices Técnicas

#### 🔹 Framework de 4 Partes (Recomendado para Productividad)

Estructura el prompt con:
1. **Persona:** Rol que asume la IA
2. **Tarea:** Acción específica a realizar
3. **Contexto:** Datos, archivos (con `@`) o información de fondo
4. **Formato:** Tabla, bullet points, correo, JSON, etc.

**Ejemplo:**
```
Persona: Eres un analista de datos experto en marketing.
Tarea: Analiza este CSV de campañas y resume el ROI por canal.
Contexto: @campanas.csv
Formato: Tabla con columnas: Canal | Gasto | Retorno | ROI% | Recomendación
```

#### 🔹 Procesamiento de Archivos (Video/Audio/Documentos)

- **Videos >20MB:** Usa Files API
- **Procesamiento:** 1 FPS por defecto (ralentizar si hay movimiento rápido)
- **Audio:** 32 tokens/segundo
- **Ubicación de instrucciones:** Al principio O al final para optimizar contexto

#### 🔹 URLs Oficiales

| Recurso | URL |
|---|---|
| Estrategias de Prompting | https://ai.google.dev/gemini-api/docs/prompting-strategies |
| Entrada de Archivos Multimodal | https://ai.google.dev/gemini-api/docs/file-input-methods |
| System Instructions | https://ai.google.dev/gemini-api/docs/system-instructions |
| Guía Prompts 101 Workspace (PDF) | https://services.google.com/fh/files/misc/workspace_with_gemini_prompting_guide.pdf |

---

## 2. OpenAI & ChatGPT

**Versiones:** GPT-5.5, GPT-5.4, Serie o (o3, o3-pro, o4-mini)

### Directrices Técnicas

#### 🔹 Modelos de Razonamiento (o3/o4-mini)

⚠️ **PROHIBIDO:** Chain of Thought manual ("piensa paso a paso", "take a deep breath")  
✅ **Por qué:** Estos modelos ya tienen razonamiento interno optimizado. Forzar CoT degrada rendimiento.

**Patrón correcto:**
- Prompts lo más simples, directos y concisos
- Enfoque en el **QUÉ** (objetivo y restricciones estrictas)
- NO describas el **CÓMO** (el modelo lo decide)

**Ejemplo:**
```
BIEN: "Escribe un algoritmo para ordenar arrays en O(n log n)"
MAL: "Piensa paso a paso: primero considera el problema, 
luego la estructura de datos, y finalmente implementa"
```

#### 🔹 Modelos Generales (GPT-5.5/GPT-5.4)

Aplica las 6 estrategias tradicionales:
1. Instrucciones claras
2. Texto de referencia
3. Dividir tareas complejas en sub-tareas simples
4. Dar tiempo para pensar (aquí SÍ puedes usar CoT)
5. Usar herramientas externas
6. Realizar pruebas sistemáticas

#### 🔹 URLs Oficiales

| Recurso | URL |
|---|---|
| Prompt Engineering Principal | https://platform.openai.com/docs/guides/prompt-engineering |
| 6 Estrategias Clave | https://platform.openai.com/docs/guides/prompt-engineering/six-strategies-for-getting-better-results |
| Buenas Prácticas Razonamiento | https://platform.openai.com/docs/guides/reasoning-best-practices |
| Structured Outputs (JSON) | https://platform.openai.com/docs/guides/structured-outputs |
| Help Center Público | https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-openai-api |

---

## 3. Anthropic Claude

**Versiones:** Claude 5, Claude Sonnet 5, Claude Fable 5

### Directrices Técnicas

#### 🔹 Estructura con XML (Nativa para Claude)

Claude procesa óptimamente **etiquetas XML**. Siempre envuelve secciones:

```xml
<instructions>
Lo que debe hacer exactamente.
</instructions>

<context>
Información de fondo, datos, referencias.
</context>

<rules>
Restricciones, limitaciones, formatos estrictos.
</rules>

<output_format>
Cómo debe entregar la respuesta (JSON, tabla, etc.).
</output_format>
```

**Ventaja:** Claude diferencia perfectamente instrucciones de datos de entrada → menos alucinaciones.

#### 🔹 Prellenado de Respuestas

Fuerza el inicio de la respuesta:
```
Asistente: Aquí está el JSON solicitado: {
```
vs.
```
Asistente: {
```

El prellenado guía el formato sin necesidad de rodeos.

#### 🔹 URLs Oficiales

| Recurso | URL |
|---|---|
| Guía de Prompting | https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview |
| Biblioteca de Prompts | https://docs.anthropic.com/en/docs/resources/prompt-library |
| System Prompts Avanzados | https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts |

---

## 4. Midjourney

**Versión:** V8.1 (y V7)

### Directrices Técnicas

#### 🔹 Descripción Visual Directa

- **Idioma:** Inglés obligatorio
- **Qué incluir:** Sujeto, medio artístico, iluminación, color, composición
- **Qué EVITAR:** Palabras vacías como "photorealistic" o "hyperdetailed"
- **Alternativa:** Describe físicamente (ej: "shot on 35mm film", "oil painting", "sculpture")

#### 🔹 Parámetros de Control (Al Final del Prompt)

```
[Descripción visual] [parámetros técnicos]
```

Parámetros:
- `--ar X:Y` - Aspect ratio (ej: --ar 16:9)
- `--s N` - Stylize (0-1000, default 100)
- `--c N` - Chaos (0-100, más caos = más variedad)
- `--weird N` - Estilo extraño/único
- `--sref` - Referencia de estilo visual
- `--cref` - Referencia de personaje (consistencia)
- `--v 8.1` - Versión del modelo

**Ejemplo:**
```
A serene Japanese garden at sunset, with stone lanterns, 
a wooden bridge over koi pond, moss-covered rocks, 
shot on Kodachrome film --ar 3:2 --s 750 --c 30 --v 8.1
```

#### 🔹 Multi-Prompts y Weights

Usa `::` para dividir conceptos y asignar pesos:
```
landscape::2 figure::0.5 abstract::1
```

#### 🔹 URLs Oficiales

| Recurso | URL |
|---|---|
| Guía Básica de Prompts | https://docs.midjourney.com/docs/prompts |
| Lista de Parámetros | https://docs.midjourney.com/docs/parameter-list |
| Image Prompts & Referencias | https://docs.midjourney.com/docs/image-prompts |
| Multi-Prompts & Weights | https://docs.midjourney.com/docs/multi-prompts |

---

## 5. Qwen (Alibaba)

**Versiones:** Qwen 3, Qwen 2.5, Model Studio

### Directrices Técnicas

#### 🔹 Estructura de System Instruction

Diferencia estrictamente:
- **System:** Limitaciones éticas, formatos, reglas globales
- **User:** Input del usuario
- **Assistant:** Respuesta (opcional para inicializar comportamiento)

#### 🔹 Modelos de Razonamiento Qwen 3

⚠️ **NO uses CoT manual**  
✅ El modelo genera tokens de pensamiento interno naturalmente

- Usa **delimitadores estrictos** para separar código y datos complejos
- Claridad sobre qué es código vs. contexto

#### 🔹 URLs Oficiales

| Recurso | URL |
|---|---|
| GitHub QwenLM | https://github.com/QwenLM/Qwen2.5 |
| Blog Oficial | https://qwenlm.github.io/blog/ |
| Prompt Engineering Alibaba | https://www.alibabacloud.com/help/en/model-studio/user-guide/prompt-engineering |

---

## 6. MiniMax & Hailuo AI

**Modelo:** Hailuo Video 2.3

### Directrices Técnicas

#### 🔹 Comandos de Cámara en Corchetes (OBLIGATORIO)

Para controlar **físicamente** la cámara, incluye comandos de movimiento:

**Comandos soportados:**
- `[Push in]` - Acercamiento
- `[Pull out]` - Alejamiento
- `[Pan left]` / `[Pan right]` - Movimiento lateral
- `[Tilt up]` / `[Tilt down]` - Movimiento vertical
- `[Zoom in]` / `[Zoom out]` - Zoom
- `[Tracking shot]` - Seguimiento de sujeto
- `[Static shot]` - Sin movimiento (estabiliza fondos, evita deformaciones)

#### 🔹 Descripción del Plano y Duración

- **Límite:** 2000 caracteres máximo
- **Qué incluir:** Sujeto, ropa, fondo, iluminación, acción física (detalles)
- **Duración recomendada:** 5-6 segundos (coherencia física en render)

**Ejemplo:**
```
[Static shot] A barista in a cozy café, wearing a maroon apron, 
pulls espresso with morning light streaming through windows, 
steam rising from the cup, warm ochre tones, soft ambient lighting, 
close-up of hands on the espresso machine [Zoom in] 
to the golden crema forming.
```

#### 🔹 URLs Oficiales

| Recurso | URL |
|---|---|
| GitHub MiniMax AI | https://github.com/MiniMax-AI |
| API Documentation | https://www.minimaxi.com/document/guide |
| Hailuo Web Platform | https://www.hailuoai.com |

---

## 📊 Matriz Comparativa de Directrices por Modelo

| Aspecto | Gemini | GPT-5.5 | o3/o4-mini | Claude | Midjourney | Qwen | MiniMax |
|---|---|---|---|---|---|---|---|
| **Estructura** | 4 partes | Libre | Simples | XML | Visual + params | System/User | Textual + comandos |
| **CoT Manual** | No necesario | Sí (6 est.) | ❌ PROHIBIDO | Opcional | N/A | ❌ PROHIBIDO | N/A |
| **Formato** | Flexible | Flex | Simple | XML tags | Parámetros | Delimitadores | Corchetes |
| **Few-shot** | Recomendado | Sí | No | Sí | N/A | Sí | N/A |
| **Idioma** | Flexible | Flexible | Flexible | Flexible | 🇬🇧 Inglés | Flexible | Flexible |

---

## 🎯 Guía Rápida: Elige Tu Patrón

### Si usas **Gemini** → Framework 4 Partes
```
Persona: [rol]
Tarea: [acción]
Contexto: [datos/@archivos]
Formato: [estructura deseada]
```

### Si usas **Claude** → XML Structure
```xml
<instructions>Acción</instructions>
<context>Datos</context>
<rules>Límites</rules>
<output_format>Formato</output_format>
```

### Si usas **o3/o4-mini** → Simple & Directo
```
[Objetivo claro y restricciones estrictas]
[SIN "piensa paso a paso"]
```

### Si usas **Midjourney** → Visual + Parámetros
```
[Descripción visual en inglés]
--ar 16:9 --s 750 --v 8.1
```

### Si usas **Hailuo Video** → Texto + Comandos Cámara
```
[Static shot] [Descripción detallada del plano]
[Zoom in] [próxima acción]
```

---

## ✨ Mejores Prácticas Universales

1. **Claridad:** Instrucciones directas, sin ambigüedades
2. **Contexto:** Proporciona información suficiente
3. **Ejemplos:** Few-shot prompting cuando sea posible
4. **Formato:** Define claramente cómo debe verse la respuesta
5. **Restricciones:** Explica lo que NO debe hacer
6. **Iteración:** Prueba, mide, ajusta

---

## 📝 Changelog

- **v1.0 (30 Jul 2026):** Consolidación inicial, eliminación de duplicados, validación de URLs

---

**Última revisión:** 30 de Julio de 2026  
**Fuentes:** Documentación oficial OpenAI, Google, Anthropic, Midjourney, Alibaba, MiniMax
