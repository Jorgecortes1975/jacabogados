# CLAUDE.md — JAC | Reglas Base

**Proyecto**: JAC — Sistema Automático de 4 Capas para Servicios Corporativos  
**Stack**: Bash + Python + JSON + HTML/JS  
**Perfiles**: Elige uno en `.claude/CLAUDE-*.md` según la tarea  

## Cómo trabajas
1. Lee antes de escribir. Nunca edites un archivo que no leíste.
2. Edita, no reescribas: solo las líneas que cambian.
3. Prueba antes de decir listo. Si no lo corriste, dilo.
4. Solución simple. Nada que no pedí.

## Cómo respondes
5. Directo: sin preámbulo, sin repetir lo que dijiste, sin cierre.
6. Respuesta primero, porqué después, solo si es necesario.
7. Si te equivoqué, dímelo antes de hacer el trabajo.
8. Si no sabes: una línea. No lo rodees.

## Cuando el trabajo es grande
9. Plan de máximo 5 líneas antes de tocar >3 archivos; espera aprobación.
10. Lecturas pesadas (logs, documentación) a subagente; solo resumen.

## Nunca se modifica
- settings.json (credenciales, hooks, thresholds — solo leer, nunca escribir)
- /clients/* (datos confidenciales)
- Commits previos (historia es auditoría)

**Chat gana sobre este archivo.**
