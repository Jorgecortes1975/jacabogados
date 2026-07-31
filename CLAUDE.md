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

## Arquitectura y contexto
- **4 Capas**: Router → Orquestadores → Sub-agentes → Dashboard
- **5 Hooks**: firecrawl-daily, email-auto-response, feature-dev-continuous, hallucination-check-hourly, weekly-business-report
- **9 Skills**: agentes-ecosistema-lexa, anti-hallucination-v3, feature-dev, firecrawl-skill, superpowers, artefactos-juridicos-lexa, investigacion-juridica-col, redactor-juridico-col, lexa-mercantil-col
- **Normativa**: CLAUDE.md es fuente única de verdad legal

## Nunca se toca
- CLAUDE.md (norma base)
- settings.json (credenciales, hooks, thresholds)
- /clients/* (datos confidenciales)
- Commits previos (historia es auditoría)

**Chat gana sobre este archivo.**
