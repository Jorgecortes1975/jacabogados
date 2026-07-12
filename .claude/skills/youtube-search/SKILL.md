---
name: youtube-search
version: "2.0"
description: >
  Búsqueda y análisis de videos en YouTube usando yt-dlp. Retorna resultados
  estructurados con título, canal, suscriptores, vistas, duración, fecha y ratio
  de engagement. Admite filtros por meses y por límite de resultados. Activar
  cuando el usuario pida: buscar en YouTube, encontrar videos sobre un tema,
  investigar contenido de YouTube, busca videos de, qué dicen en YouTube sobre,
  analizar contenido YouTube, videos recientes de, canales sobre, tendencias en
  YouTube, material audiovisual sobre, busca tutoriales de, search YouTube.
  También activar ante: investigación de contenido para LinkedIn, búsqueda de
  referencias visuales para redes sociales, análisis de competencia en YouTube,
  contenido para estrategia de marketing, videos jurídicos o legales colombianos,
  material educativo sobre derecho. SIEMPRE activar cuando se pida búsqueda,
  análisis o descubrimiento de contenido en la plataforma YouTube.
license: MIT
compatibility: "Claude Code, Cowork, claude.ai"
metadata:
  author: "Bufete Cortés Cartagena — LEXA-LAB v2.0"
  locale: es-CO
  base-original: "youtube-search v1 by @AlvaroMoralesIA"
  upgraded: "Junio 2026 — LEXA-LAB standard"
---

# YOUTUBE SEARCH — LEXA-LAB v2.0
## Bufete Cortés Cartagena

**Abogado titular:** Jorge Ángel Cortés Cartagena — T.P. 365.594
**Jurisdicción de contexto:** República de Colombia
**Versión:** 2.0 — Junio 2026

---

## NATURALEZA DE LA SKILL

Esta skill ejecuta búsquedas en YouTube vía `yt-dlp` y retorna resultados estructurados,
enriquecidos y listos para análisis. No solo lista videos: calcula ratios de engagement,
filtra por temporalidad y permite análisis de contenido por categoría.

**Uso principal en el ecosistema:**
- Investigación jurídica audiovisual (jurisprudencia explicada, doctrina, cátedras)
- Investigación de marketing y estrategia de contenido
- Análisis de competencia y posicionamiento
- Búsqueda de material educativo para clientes
- Identificación de tendencias de contenido

---

## VINCULACIÓN CON EL ECOSISTEMA LEXA-LAB

| Skill | Relación |
|---|---|
| `notebooklm-lexa` | Envía URLs encontradas aquí para análisis profundo en NotebookLM |
| `marketing-digital-col` | Alimenta con tendencias de YouTube para estrategia de contenido |
| `estrategia-contenido` | Recibe resultados para identificar pilares y oportunidades |
| `jurisprudencia-col` | Complementa con explicaciones audiovisuales de líneas jurisprudenciales |
| `analisis-empresarial-col` | Usa videos sectoriales para contexto de mercado |

**Cadena típica de uso:**

```
youtube-search → notebooklm-lexa (análisis profundo) → insight para escrito o estrategia
youtube-search → marketing-digital-col (tendencias) → estrategia de contenido
youtube-search → estrategia-contenido (gaps de contenido) → plan editorial
```

---

## REQUISITOS TÉCNICOS

Verificar antes de usar:

```bash
# Verificar yt-dlp instalado
yt-dlp --version

# Si no está instalado:
pip3 install yt-dlp --break-system-packages

# Verificar Python3
python3 --version
```

Si `yt-dlp` no está disponible en el entorno actual, indicarlo al usuario con la
instrucción de instalación exacta.

---

## MODOS DE OPERACIÓN

| Modo | Cuándo usar | Parámetros |
|---|---|---|
| **RÁPIDO** | Búsqueda simple, hasta 5 resultados | query + --limit 5 |
| **ESTÁNDAR** | Investigación general, últimos 6 meses | query + --months 6 + --limit 10 |
| **PROFUNDO** | Análisis completo, últimos 12 meses | query + --months 12 + --limit 20 |
| **RECIENTE** | Solo contenido nuevo, último mes | query + --months 1 + --limit 10 |
| **COMPETENCIA** | Análisis de canal específico | query + canal + --months 12 |

---

## SINTAXIS DE EJECUCIÓN

```bash
bash ~/.claude/skills/youtube-search/search.sh "<query>" [--months N] [--limit N]
```

### Parámetros

| Parámetro | Obligatorio | Default | Descripción |
|---|---|---|---|
| `query` | Sí | — | Términos de búsqueda (entre comillas) |
| `--months N` | No | 6 | Filtrar a los últimos N meses |
| `--limit N` | No | 20 | Número máximo de resultados |

### Ejemplos por caso de uso

```bash
# Jurisprudencia laboral colombiana
bash ~/.claude/skills/youtube-search/search.sh "estabilidad laboral reforzada Colombia" --months 12 --limit 10

# Tutela derecho al trabajo
bash ~/.claude/skills/youtube-search/search.sh "tutela laboral Colombia Corte Constitucional" --months 6 --limit 8

# Marketing jurídico
bash ~/.claude/skills/youtube-search/search.sh "marketing para abogados Colombia redes sociales" --months 6 --limit 10

# Análisis de tendencia reciente
bash ~/.claude/skills/youtube-search/search.sh "reforma laboral Colombia 2025" --months 3 --limit 15

# Competencia directa
bash ~/.claude/skills/youtube-search/search.sh "bufete abogado Medellín" --months 12 --limit 20

# Contenido educativo para clientes
bash ~/.claude/skills/youtube-search/search.sh "derechos laborales empleado Colombia" --months 6 --limit 10
```

---

## ESTRUCTURA DEL OUTPUT

Cada resultado incluye:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Título:        [nombre del video]
URL:           https://www.youtube.com/watch?v=...
Canal:         [nombre del canal]
Suscriptores:  [número formateado]
Vistas:        [número formateado]
Engagement:    [ratio vistas/suscriptores — indica viralidad]
Duración:      [HH:MM:SS]
Fecha:         [YYYY-MM-DD]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Interpretación del ratio de engagement:**
- Ratio > 1.0 → Video viral (más vistas que suscriptores)
- Ratio 0.5–1.0 → Alto rendimiento
- Ratio 0.1–0.5 → Rendimiento normal
- Ratio < 0.1 → Bajo rendimiento relativo

---

## MÓDULOS DE PRODUCTO

### MÓDULO M1 — BÚSQUEDA DE INVESTIGACIÓN JURÍDICA

Cuando el usuario pida investigar un tema jurídico en YouTube:

1. Ejecutar búsqueda con términos técnicos colombianos
2. Filtrar por últimos 12 meses (contenido relevante y vigente)
3. Identificar canales con autoridad (alta audiencia + alto engagement)
4. Separar: contenido educativo / contenido de opinión / jurisprudencia explicada
5. Listar URLs para envío a NotebookLM si se requiere análisis profundo

```bash
bash ~/.claude/skills/youtube-search/search.sh "[TEMA JURÍDICO] Colombia" --months 12 --limit 15
```

### MÓDULO M2 — ANÁLISIS DE COMPETENCIA

Cuando el usuario pida analizar presencia de competidores en YouTube:

1. Buscar nombre del bufete / abogado competidor
2. Buscar categoría + ciudad (ej: "abogado laboral Medellín")
3. Analizar: volumen de contenido, engagement, frecuencia, temas cubiertos
4. Identificar gaps de contenido no cubiertos
5. Construir tabla comparativa

```bash
# Paso 1: Buscar competencia directa
bash ~/.claude/skills/youtube-search/search.sh "abogado laboral Medellín" --months 12 --limit 20

# Paso 2: Buscar categoría amplia
bash ~/.claude/skills/youtube-search/search.sh "abogado Colombia consulta laboral" --months 6 --limit 20
```

### MÓDULO M3 — INVESTIGACIÓN DE TENDENCIAS DE CONTENIDO

Cuando el usuario pida identificar qué temas tienen demanda en YouTube para su estrategia:

1. Buscar 3–5 variaciones del tema objetivo
2. Comparar volumen de vistas entre variaciones
3. Identificar el formato con mayor engagement (cortos vs. largos)
4. Detectar preguntas frecuentes sin responder (gaps)
5. Entregar brief de contenido con oportunidades identificadas

### MÓDULO M4 — PIPELINE YOUTUBE → NOTEBOOKLM

Cuando el usuario pida análisis profundo del contenido encontrado:

1. Ejecutar búsqueda (esta skill)
2. Extraer las URLs de los 5–10 mejores resultados
3. Enviar URLs a `notebooklm-lexa` para:
   - Crear notebook temático
   - Cargar videos como fuentes
   - Ejecutar análisis de contenido
   - Generar síntesis ejecutiva

```
Flujo: youtube-search → extraer URLs → notebooklm-lexa → análisis → insight
```

---

## PROTOCOLO DE CALIDAD Y ADVERTENCIAS

### Advertencias técnicas

- La extracción de metadatos completos (incluyendo suscriptores) usa el modo full, no flat-playlist.
  Esto hace la búsqueda más lenta (~1–2 segundos por resultado) pero proporciona datos más ricos.
- Los resultados están ordenados por relevancia según el algoritmo de YouTube, no por fecha.
  Para ordenar por recencia, usar `--months 1` o `--months 3`.
- YouTube puede limitar requests frecuentes desde el mismo IP. Si ocurre error de rate limit,
  esperar 5–10 minutos antes de reintentar.

### Protocolo anti-alucinación

- NO inventar resultados si la búsqueda falla. Reportar el error exacto.
- NO completar datos faltantes de suscriptores o vistas con estimaciones.
- NO afirmar que un video "dice X" sin haberlo analizado con NotebookLM.
- Si el canal no tiene datos de suscriptores visibles, indicar: `[No disponible]`
- Si el video fue eliminado o es privado, indicar: `[No accesible]`

### Limitaciones conocidas

- Videos privados, de pago o bloqueados geográficamente no aparecen en resultados.
- El conteo de suscriptores puede tener retraso de 24–48 horas respecto al valor real.
- Búsquedas muy específicas pueden retornar menos resultados que el límite solicitado.
- Para análisis de CONTENIDO del video (transcripción, temas), usar `notebooklm-lexa`.

---

## FORMATO BASE DE RESPUESTA

Al entregar resultados de una búsqueda, incluir:

1. Número total de resultados encontrados
2. Período cubierto (últimos N meses)
3. Tabla o listado estructurado de resultados
4. Top 3 por engagement (si hay suficientes resultados)
5. Observaciones sobre la calidad y diversidad del contenido
6. Sugerencia de siguiente acción (enviar a NotebookLM, ajustar búsqueda, etc.)

---

## INSTALACIÓN DEL SCRIPT SUBYACENTE

Si el script `search.sh` no existe en `~/.claude/skills/youtube-search/`, ejecutar:

```bash
# 1. Crear directorio
mkdir -p ~/.claude/skills/youtube-search

# 2. Instalar yt-dlp
pip3 install yt-dlp --break-system-packages

# 3. Verificar instalación
yt-dlp --version
```

El script `search.sh` debe estar presente en el directorio de skills de Claude Code.
Si no existe, solicitar al usuario que lo reinstale desde el repositorio de origen.

---

*Bufete Cortés Cartagena — Jorge Ángel Cortés Cartagena T.P. 365.594 — LEXA-LAB v2.0 — Medellín, Colombia — 2026*
