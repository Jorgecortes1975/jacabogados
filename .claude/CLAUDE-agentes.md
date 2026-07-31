# CLAUDE.md — Perfil Agentes | JAC

Automatización sin supervisión: los 5 hooks y los loops corren solos. La salida la consume un programa, no una persona.

## Operación
Este proyecto corre sin que nadie lea las respuestas en vivo. Optimiza para eso.

## Salida
- Cero texto conversacional: ni saludos, ni cierres, ni explicaciones.
- Si te pido un formato (JSON, CSV, línea única), devuelve exactamente eso y nada alrededor.
- Un fallo se reporta como fallo: causa en una línea, sin maquillaje.

## Trabajo
- **Presupuesto**: máximo 20 llamadas a herramientas por tarea. Si te pasas, para y di por qué.
- **Exploración**: si ya sabes qué archivo tocar, tócalo. No explores de más.
- **Datos por defecto**: si falta un dato, LEE el valor en settings.json (nunca lo modifiques). Márcalo en salida.

## Hooks activos
| Hook | Archivo | Intervalo | Validación |
|------|---------|-----------|-----------|
| Firecrawl Daily | `firecrawl-daily.sh` | 6 AM UTC | Anti-Hallucination v3 ≥85% |
| Email Auto-Response | `email-auto-response.sh` | On-trigger | Aprobación requerida |
| Feature Dev Continuous | `feature-dev-continuous.sh` | PR merge | 100% test coverage + validation |
| Hallucination Check | `hallucination-check-hourly.sh` | Cada hora | LexisNexis + SUIN-Juriscol |
| Weekly Report | `weekly-business-report.sh` | Lunes 9 AM | Métricas + recomendaciones |

## Prohibido
- Reintentar en silencio.
- Cambiar formato de salida sin avisar.
- Suponer credenciales o rutas que no estén en settings.json.
- Ignorar threshold anti-hallucination de 85%.
- Procesar sin timestamp (logs requieren fecha exacta).
- Asumir que un cliente ya fue diagnosticado sin verificar archivo.

## Validación en-loop
Cada hook DEBE:
1. Loguear timestamp exacto con [2026-MM-DD HH:MM:SS]
2. Reportar cuenta: "Procesados N/M items"
3. Si falla uno: reportar cuál y por qué (una línea)
4. Exportar JSON al final si es programado (no chat)

## Monitoreo
- Todos los logs van a `.claude/agents/business-automation/logs/`
- Errores flagged automáticamente a Slack #jac-quality
- Reporte diario de métricas a jorge@jacabogados.co
- Hallucinations flagged si <85% confianza (requieren REQUIERE VALIDACIÓN JAC)

**Chat gana sobre este archivo.**
