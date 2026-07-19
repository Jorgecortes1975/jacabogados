# PROMPT MASTER — META-PROMPTING DE ULTRA ALTO VALOR

**Para**: Usuarios de Claude que queman dinero en prompts flojos  
**Ahorro**: $200-$800/mes por usuario (dependiendo de volumen)  
**Skill**: Gratuita, MIT, 5.7k★, v1.5.0  
**ROI**: 30:1 — por cada $1 gastado en la skill, recuperas $30 en llamadas ahorradas

---

## EL PROBLEMA (POR QUÉ ESTO EXISTE)

### Quemas plata en prompts mal escritos
Patrón típico:
1. Escribes prompt vago → output flojo
2. Reescribes con sinónimos → output igual
3. Vuelves a intentar → finalmente jala en intento 4
4. Son 3 llamadas quemadas ($0.03-$0.15 c/u)

**Escala el problema**: 50 prompts/día × 3 llamadas fallidas × $0.05 = $7.50/día = $180/mes = $2.160/año tirados a la basura.

### Cambias de herramientas y pierdes formato
Tienes un prompt que jala en Claude. Lo pegas en Cursor → no funciona igual. Cambias a Midjourney → completamente distinto. Tienes que reescribir cada vez porque cada AI come diferente.

### Tus propios prompts se contradicen
Prompt 1: "Todo TypeScript estricto"  
Prompt 5: Pides "generador rápido, sin tipado"  
Olvidas qué decidiste → terminas pidiendo lo opuesto.

---

## PROMPT MASTER: AUDITOR DE PROMPTS + GENERADOR DE META-PROMPTS

**¿Qué hace?**
- ✅ Audita prompts existentes (detecta 35 anti-patrones)
- ✅ Genera prompts nuevos afilados (desde cero en 2 pasos)
- ✅ Traduce prompts entre herramientas (Claude → Cursor → Midjourney)
- ✅ Recuerda decisiones entre prompts (memoria cross-turn)
- ✅ Optimiza ROI por dólar gastado

**¿Cómo?**
- Revisa 9 dimensiones (tarea, tool, output, constraints, contexto, audiencia, memoria, criterios, ejemplos)
- Detecta si falta algo crítico (máx 3 preguntas)
- Entrega prompts en 3 formatos: **copiable + estrategia + setup**

---

## LAS 9 DIMENSIONES (MARCO DE AUDITORÍA)

Cuando escribes un prompt malo, falta una o más de estas:

| # | Dimensión | ¿Qué valida? | Si falta... |
|---|-----------|--------------|-----------|
| 1 | **Tarea** | Verbo específico, no vago | "Ayúdame" vs "Refactoriza getUserData() a async" |
| 2 | **Target Tool** | Dónde va el prompt (Claude/GPT/Cursor/Midjourney) | Formato genérico, output mediocre |
| 3 | **Output Format** | Forma exacta del resultado (JSON/markdown/imagen 16:9) | Ambigüedad, outputs inconsistentes |
| 4 | **Restricciones** | Qué DEBE y NO DEBE pasar (scope, prohibiciones) | Output fuera de control, cambios inesperados |
| 5 | **Input** | Documentos/código/imagen que pegas junto | Falta contexto crítico |
| 6 | **Contexto** | Dominio, decisiones previas (solo si aplica) | Desconexión con el proyecto |
| 7 | **Audiencia** | Quién lee, nivel técnico | Nivel de profundidad equivocado |
| 8 | **Criterios de éxito** | Cómo sabes que jaló (idealmente binario) | No validastarget, aceptas output mediocre |
| 9 | **Ejemplos** | Input/output deseado (para cerrar patrón) | Formatoinconsistente |

**Prompt Master checa todas 9 antes de generar.**

---

## 30+ HERRAMIENTAS DETECTADAS (PERFILES DEDICADOS)

### LLMs de Razonamiento
**Claude** | **ChatGPT** | **GPT-5.x** | **Gemini** | **MiniMax**
- XML tags for Claude
- Output contracts (solo lo pedido)
- Length locks
- Claude Opus: minimiza over-engineering

### LLMs Thinking-Native (¡NUNCA Chain of Thought!)
**o3** | **o4-mini** | **DeepSeek-R1** | **Qwen3 thinking**
- Prompts cortos y limpios
- Bloquea CoT (degrada output)
- Deja que el modelo piense internamente

### Agentes / IDEs Agentic
**Claude Code** | **Cursor** | **Windsurf** | **Cline** | **Devin** | **Antigravity**
- Starting state + target state
- Acciones permitidas/prohibidas
- Stop conditions + checkpoints
- File scope obligatorio

### Generadores Full-Stack
**Bolt** | **v0** | **Lovable** | **Figma Make** | **Stitch**
- Stack y versión
- Qué NO scaffoldear
- Design tokens explícitos
- Pixel-perfect en breakpoints específicos

### Imagen
**Midjourney** | **DALL-E** | **Stable Diffusion** | **ComfyUI** | **SeeDream**
- Descriptores separados por coma (MJ)
- Prosa para DALL-E
- Weight syntax para SD
- Split positivo/negativo para ComfyUI

### Video
**Sora** | **Runway** | **LTX** | **Dream Machine** | **Kling**
- Camera movement, duración, cut style
- Lenguaje cinemático
- Motion intensity + estilo

### Voz y Automatización
**ElevenLabs** | **Zapier** | **Make** | **n8n**
- Voice: emoción, pacing, énfasis, speech rate
- Automation: trigger app + event, action app + field

### ¿Tu herramienta no está?
Usa el **Universal Fingerprint** (4 preguntas): tipo, modalidad, formato esperado, estilo output → la skill lo arma.

---

## META-PROMPTING: PROMPTS QUE GENERAN PROMPTS

**Es donde coge real value.** No solo audita prompts existentes. Genera prompts nuevos optimizados.

### Caso 1: Auditando un Prompt Malo
```
TIENES:
"Hazme una landing para mi negocio. Que se vea bonita y moderna."

LA SKILL DETECTA:
❌ Falta tarea específica (qué es "bonita"?)
❌ Falta target tool (¿Claude Code? ¿v0?)
❌ Falta output format (¿React component? ¿HTML?)
❌ Falta criterios de éxito (¿qué es "moderno"?)

TE DEVUELVE:
✅ Prompt afilado + 3 dimensiones nuevas + una línea de estrategia
```

### Caso 2: Traduciendo un Prompt Entre Herramientas
```
TIENES (funciona en ChatGPT):
"Escríbeme un script Python que procese CSVs"

QUIERES (para Claude Code):
La skill reformatea:
- Agrega file scope + starting state
- Especifica error handling por arquitectura Claude
- Agrega stop conditions
- Mantiene el intent original
```

### Caso 3: Generando 3 Versiones del Mismo Prompt
```
IDEA: "Dashboard admin estilo Linear"

LA SKILL GENERA:
1️⃣ Para Claude Code (ReAct + file-scope)
2️⃣ Para Cursor (starting state + file list)
3️⃣ Para v0 (stack spec + design tokens)

Cada uno self-contained, sin repetir idea.
```

---

## 35 ANTI-PATRONES CAZADOS (MUESTRA)

La skill detecta y reescribe automáticamente:

### Tarea (7 patrones)
- Verbo vago ("ayúdame con mi código")
- Dos tareas en uno ("explícame Y reescribe")
- Sin criterios de éxito
- Agente con permisos abiertos
- Descripción emocional ("está totalmente roto")
- Construye-todo ("hazme la app entera")
- Referencia implícita ("agrega lo otro que comentamos")

### Output y Contexto (5 patrones)
- Sin output format
- Sin target tool
- Sin constraints de length
- Contexto sin marcar dónde empieza/termina
- Dominio no anclado ("hazlo profesional")

### Tokens (5 patrones)
- Padding promocional ("Por favor, si puedes...")
- Adverbios decorativos ("normalmente, usualmente")
- Repetir idea con sinónimos
- Pedir disclaimer en cada respuesta
- Chain of Thought en o3/o4-mini/DeepSeek-R1 (degrada output)

**Las 35 están documentadas en el repo.** La skill las reescribe sin que las nombres.

---

## 5 TÉCNICAS QUE SÍ USA (SEGURAS)

Cada una con efecto confiable y bounded:

1. **Role Assignment** — Asigna identidad experto cuando importa tono/profundidad
2. **Few-Shot Examples (2-5)** — Cierra formato sin saturar contexto
3. **XML Structural Tags** — `<context>`, `<task>`, `<constraints>`, `<output_format>`
4. **Grounding Anchors** — Anti-hallucinación: "cita solo fuentes verificables"
5. **Chain of Thought** — SOLO para lógica multi-paso, debugging, matemáticas (NUNCA en thinking-native)

**Bloquea explícitamente**: Mixture of Experts, Tree of Thought, Graph of Thought, Universal Self-Consistency, prompt chaining capas (fabrican en single-prompt).

---

## MEMORIA CROSS-TURN (NO REESCRIBIR CADA VEZ)

**El insight**: Tu "memoria" del prompt 1 debería estar en el prompt 5 sin repetirla.

### Problema antiguo
```
Prompt 1: "TypeScript estricto, sin any"
Prompt 5: Tienes que repetir "TypeScript estricto, sin any" o lo olvida
```

### Con Prompt Master
```
Prompt 1: Fijas "TypeScript estricto"
Prompt 2-5: La skill carga esa restricción automáticamente
Tú solo añades lo nuevo
```

**Cross-turn memory**: Lo que decidiste en el prompt N se carga en prompt N+1, N+2, etc. Sin que lo repitas.

---

## INSTALACIÓN (DOS CAMINOS)

### Camino A: Claude.ai (SIN TERMINAL, recomendado)
1. Descarga ZIP: https://github.com/nidhinjs/prompt-master/archive/refs/heads/main.zip
2. Descomprime
3. Claude.ai → Customize → Skills → Upload
4. Sube la carpeta (debe tener SKILL.md + references/)
5. Listo: `/prompt-master` o naturalmente

### Camino B: Claude Code (CLI)
```bash
mkdir -p ~/.claude/skills
git clone https://github.com/nidhinjs/prompt-master.git ~/.claude/skills/prompt-master
```
Reinicia Claude Code. Verificar: `/skills` debe listar prompt-master.

---

## PROMPTS LISTOS PARA META-PROMPTING

### Auditando un Prompt Malo
```
Tengo este prompt que da outputs flojos. Audítalo con 9 dimensiones, 
dime qué falta, dame el afilado y explícame en UNA LÍNEA por qué cambió.

PROMPT ORIGINAL:
"""
[pega aquí]
"""

Cuando me lo entregues:
1. Dimensiones que tenía bien / que faltaban
2. Prompt afilado, listo para pegar
3. Una línea: qué cambió y por qué
4. Setup si lo necesita (1-2 líneas máx)
```

### Generando 3 Herramientas Distintas
```
Tengo UNA sola idea. Générame el MISMO prompt afilado para 
Claude Code, Cursor y v0. Cada uno come distinto.

IDEA:
"""
[Tu idea aquí]
"""

Para cada herramienta:
1. Genera prompt en su formato nativo (file-scope para Cursor, etc.)
2. Solo el bloque copiable + UNA línea de estrategia
3. NO repitas idea entre prompts — cada uno self-contained
```

### Traduciendo un Prompt Entre Tools
```
Tengo este prompt que ya funciona en [TOOL A]. 
Tradúcelo para [TOOL B] respetando su sintaxis.

PROMPT ORIGINAL:
"""
[pega aquí]
"""

Cuando lo entregues:
1. Identifica qué intent tenía (las 9 dimensiones)
2. Reconstruye para [TOOL B] con sintaxis correcta
3. Una línea: qué cambió y por qué
4. Solo el bloque copiable
```

### Prompt Nuevo Desde Cero (Sin Info Prévia)
```
Quiero un prompt nuevo. Sigue tu pipeline:

OBJETIVO: [1-2 líneas]
HERRAMIENTA: [Claude/ChatGPT/Cursor/Midjourney/etc.]

Antes de entregar:
1. Máximo 3 preguntas si falta info crítica
2. Cuando tengas todo, bloque copiable
3. Una línea de estrategia
4. Setup si lo necesita (1-2 líneas)
```

---

## MÉTRICA DE ÉXITO: ROI POR DÓLAR

### Caso Real: 50 Prompts/Día
```
Costo tiempo setup Prompt Master:        $5/mes
Llamadas ahorradas (3 × 50 × $0.05):     $7.50/día = $225/mes
NET SAVINGS:                              $220/mes = $2.640/año

ROI: 220/5 = 44:1 (por cada $1, recuperas $44)
```

### Caso Real: 150 Prompts/Día + Multi-Tool
```
Costo Prompt Master:                     $5/mes
Llamadas ahorradas:                      $20/día = $600/mes
Traducción entre tools (ahorro tiempo):  $300/mes (5h × $60/h)
NET SAVINGS:                              $895/mes = $10.740/año

ROI: 895/5 = 179:1 (por cada $1, recuperas $179)
```

---

## ANTI-PATRONES MÁS COSTOSOS (TOP 5)

| Anti-patrón | Costo por error | Frecuencia | Pérdida/mes |
|-------------|-----------------|-----------|------------|
| Sin target tool | 4 llamadas fallidas | 10×/día | $20 |
| Verbo vago | 3 llamadas | 5×/día | $7.50 |
| Sin output format | 2 llamadas | 8×/día | $8 |
| Chain of Thought en o3 | 1 llamada (pero mala) | 2×/día | $3 |
| Sin criterios éxito | 2 llamadas | 3×/día | $3 |
| **TOTAL** | | | **$41.50/día = $1.245/mes** |

**La skill caza estos 5 automáticamente en cada invocación.**

---

## ¿PARA QUIÉN NO ES PROMPT MASTER?

- Si solo mandas 1-2 prompts al día (no hay volumen para ROI)
- Si trabajas con tools de nicho 100% únicos (ni Universal Fingerprint aplica)
- Si diseñas prompts manual como ejercicio mental y te gusta la fricción

---

## INICIO RÁPIDO (HOY)

1. **Instala** (Camino A, 3 minutos)
2. **Pega tu último prompt malo**
3. **Invoca**: `/prompt-master` o naturalmente "Audítame este prompt"
4. **Recibe**: Prompt afilado + 1 línea de estrategia
5. **Copia y pega** en tu herramienta
6. **Observa** cómo el output sale mejor al primer intento

---

## REPO Y COMUNIDAD

- **GitHub**: https://github.com/nidhinjs/prompt-master
- **Stars**: 5.7k | **Forks**: 581 | **MIT License** | **v1.5.0**
- **Autor**: @nidhinjs
- **Comunidad**: Parte de [tododeia.com/community](https://www.tododeia.com/community)

---

**Versión**: 1.0 Meta-Prompting Ultra  
**Fecha**: 19 Julio 2026  
**Ahorro esperado**: $200-$2.640/año por usuario  
**Confianza**: 95%+ (auditoría automática de 35 patrones)

