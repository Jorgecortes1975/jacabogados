# Token Optimizer Skill

Compresión y optimización de tokens para operación eficiente de pipelines automáticas de JAC.

## Cuándo Activar

- Desarrollo de features con alto output (redactor, investigador)
- Hooks que generan documentos largos
- Loops que procesan múltiples items
- Análisis con métricas + reportes
- Cualquier contexto donde tokens = dinero

## Cuándo NO Activar

- Respuestas a usuarios humanos (prioridar claridad sobre brevedad)
- Primeras iteraciones de un feature (iterar > optimizar temprano)
- Debugging en vivo (explicaciones necesarias)

## Cómo Usar

### Opción 1: Automático (por perfil)
Ya está integrado en CLAUDE-codigo.md, CLAUDE-agentes.md, CLAUDE-analisis.md

### Opción 2: Manual
```
/skill invoke token-optimizer
```

Luego pasame la tarea y usaré las reglas.

## Reglas Clave (Quick Reference)

| Contexto | Regla | Ejemplo |
|----------|-------|---------|
| Todas | Oraciones ≤10 palabras | "Cambiar `foo` a `bar` en línea 42." |
| Código | Tres líneas = abstracción? No. | 3x bucles similares > helper |
| Agentes | Nunca inventar valores | Si falta ID: null, no UUID aleatorio |
| Análisis | Hallazgo primero | "5 clientes +risk. Datos abajo." |

## Benchmark (drona23)

| Métrica | Resultado |
|---------|-----------|
| Reducción promedio | 30% tokens |
| CLAUDE.md vs inline rules | 30% más barato |
| Casos exitosos | 3/3 (CSV, SQLite, WebSocket) |

Fuente: https://github.com/drona23/claude-token-efficient

## Archivos de Referencia

- `CLAUDE.md` — 8 principios + por contexto
- `RULES.md` — Reglas detalladas con checklist
- `.claude/CLAUDE-codigo.md` — Integración en feature dev
- `.claude/CLAUDE-agentes.md` — Integración en loops automáticas

## FAQ

**P: ¿Pierdo precisión con token optimization?**  
R: No. Precisión > brevedad. Si hay conflicto, precisión gana. Optimizamos formato, no rigor.

**P: ¿Y si necesito explicar algo complejo?**  
R: Explica. Token optimizer es para relleno/fluff, no para lógica necesaria.

**P: ¿Aplica a cliente-facing documents?**  
R: No. Aplica a internals (logs, agentes, reportes programados). Cliente ve documento completo.

---

**Skill creado**: 2026-07-31  
**Origen**: drona23/claude-token-efficient (MIT)  
**Mantenedor**: JAC Business Automation
