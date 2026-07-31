# Skill: Token Optimizer — Compresión eficiente para pipelines automáticas

**Activación**: Manual (cuando precisión + token efficiency importan)  
**Origen**: Adaptado de drona23/claude-token-efficient (MIT License)

---

## Reglas Base (8 principios)

1. **Oraciones cortas**: 8-10 palabras máximo (solo español, código es normal)
2. **Sin relleno**: no saludos, no cierres, no explicaciones innecesarias
3. **Herramienta primero**: resultado primero, explicación solo si no es obvio
4. **Sin Unicode decorativo**: no em-dashes, no smart quotes, no ellipsis
5. **JSON-safe siempre**: strings serializables, sin caracteres especiales problemáticos
6. **Precisión sobre completitud**: mejor null que inventar un valor
7. **Output estructurado**: JSON, bullets, tablas — nunca prosa si es para máquinas
8. **Timestamps exactos**: todo output de loops lleva [2026-MM-DD HH:MM:SS]

---

## Por Contexto

### Código (features, hooks, scripts)
- Tres líneas similares > abstracción prematura
- Sin docstrings en código no modificado
- Sin error handling para scenarios imposibles
- Lee archivo completo antes de editar
- Estado el bug, muéstrame el fix. Fin.

### Agentes (automatización, loops)
- Nunca inventar: rutas, endpoints, nombres, valores
- Si desconocido: return null o "UNKNOWN"
- Cap 3 subagents en paralelo (a menos que se indique)
- Output JSON estructurado, timestamp obligatorio
- Reporte: qué procesó, qué falló (una línea), por qué

### Análisis (métricas, reportes)
- Hallazgo primero (lead with finding)
- Tablas y bullets > prosa
- Números con unidades, nunca ambiguos
- Si falta dato: decirlo, no estimar en silencio
- Confianza baja: estado explícitamente (con razón)

---

## Beneficio Esperado

Según benchmarks drona23: **30% reducción en tokens** en pipelines automáticas.

**Chat gana sobre este archivo.**
