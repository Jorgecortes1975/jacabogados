---
paths: ["**/*.json", ".claude/settings*.json", "settings.json"]
---

# Regla: Settings.json — Lectura sí, escritura no

Aplica a: Cualquier archivo `.json` en el proyecto, especialmente `settings.json`

## Restricción

- **LEER** settings.json: siempre permitido
- **ESCRIBIR** settings.json: nunca sin aprobación
- Contiene: credenciales, hooks, thresholds

Si necesitas valores por defecto, léelos del archivo. Nunca lo modifiques.

**Chat gana sobre esta regla.**
