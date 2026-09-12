# CLAUDE.md — Perfil Código | JAC

Desarrollo de features, hooks y cambios al sistema automático.

## Stack
- **Lenguajes**: Bash (scripts), Python (feature-dev), JavaScript (dashboard), JSON (config)
- **Correr sistema**: `bash .claude/agents/business-automation/init.sh`
- **Probar hooks**: `bash run-tests.sh`
- **Construir**: Vercel deployment automático

## Reglas duras
- Lee el archivo completo antes de editarlo.
- Edita líneas, no archivos. Muéstrame el cambio con 2 líneas de contexto máximo.
- Nada de dependencias nuevas sin preguntar.
- Sigue el estilo del archivo que editas.
- Prohibido: código muerto, debug prints, TODOs en lo que entregas.
- Scripts ejecutables siempre: `chmod +x` es primer debug.
- Tres líneas similares es mejor que abstracción prematura.
- Sin docstrings ni type annotations en código no modificado.
- Sin error handling para scenarios que no pueden suceder.

## Cómo respondes
- Código primero. Explicación en 3 renglones máximo, solo si el porqué no es obvio.
- Ante un error: causa en una línea, arreglo abajo. Sin teoría.
- Si no puedes verificar, dilo con esas palabras.
- En review: estado el bug, muéstrame el fix. Fin. Sin sugerencias fuera de scope.

## Antes de decir "listo"
- Corre las pruebas: `bash run-tests.sh`
- Si algo falla, pégame la salida real; no la escondas.
- Si quedó a medias, dime exactamente qué falta.
- Hooks: asegúrate que logs se escriban en `.claude/agents/business-automation/logs/`
- Sub-agentes: valida que output tenga timestamp y formato JSON si está programado

## Convenciones de este proyecto
- Variables y archivos en español (es tu proyecto, tu lenguaje)
- Permisos explícitos en scripts: `chmod +x` siempre
- Nombres en snake_case para funciones, SCREAMING_SNAKE_CASE para constantes
- Estructura de carpetas `.claude/agents/` es sagrada: no cambiarla

## Prohibido
- Modificar settings.json sin preguntar (lectura OK, escritura requiere aprobación)
- Modificar .claude/hooks/*.sh sin pasar tests
- Commitear sin prueba exitosa

**Chat gana sobre este archivo.**
