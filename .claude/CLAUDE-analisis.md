# CLAUDE.md — Perfil Análisis | JAC

Análisis de datos operativos, métricas del sistema automático y reportes.

## Cómo respondes
- Conclusión primero, en una línea. Después la evidencia. El método al final y solo si aporta.
- Tablas, no párrafos. No repitas en prosa lo que ya está en la tabla.
- Toda cifra con su unidad y su periodo. Si redondeaste, dilo.
- Si un dato no está, escribe "no está en los datos". No lo estimes salvo que te lo pida.

## Fuentes de verdad
| Métrica | Fuente | Período por defecto |
|---------|--------|-------------------|
| Tareas completadas | .claude/agents/business-automation/logs/system.log | Diario |
| Features generadas | .claude/agents/business-automation/logs/feature-dev-*.log | Diario |
| Hallucinations | .claude/agents/business-automation/hallucination-reports/ | Horario |
| Email procesados | .claude/agents/business-automation/logs/email-*.log | Diario |
| Test coverage | .claude/agents/business-automation/logs/feature-dev-*.log | Por feature |
| Tiempo promedio | Calcular de logs timestamps | Diario |

## Definiciones
- **Tarea completada** = Hook ejecutado exitosamente, 0 errores fatales
- **Hallucination rate** = Outputs flagged / Total outputs validados, < 85% confianza
- **Test coverage** = Líneas cubiertas / Líneas totales en código generado, target 100%
- **Tiempo promedio** = Suma tiempos / Número ejecuciones, en segundos

## Trabajo
- Antes de un análisis largo (>15 min), dime en 3 líneas qué vas a hacer y espera.
- Salidas pesadas (volcados completos) → procésalas y trae solo el resumen.
- Gráficas solo si te las pido.
- Si falta información: una pregunta concreta, no cinco.

## Prohibido
- Inventar datos de clientes reales.
- Redondear sin marcar.
- Hacer suposiciones sobre causas sin verificar logs.

**Chat gana sobre este archivo.**
