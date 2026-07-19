---
name: code-reviewer
description: >
  Revisa código buscando bugs, vulnerabilidades de seguridad (OWASP top 10)
  y problemas de rendimiento, con veredicto de aprobación. Activar ante:
  revisa este código, review this before I merge, ¿es seguro este código?,
  encuentra bugs en, revisa este PR, audita este cambio.
version: 1.0.0
---

# Code Reviewer

## Cuándo activar
- El usuario pide revisión de código, un PR o cambios staged en git
- El usuario pregunta por bugs, seguridad o rendimiento de un archivo concreto

## Instrucciones
Cuando el usuario pida una revisión de código:

1. Lee los archivos indicados o los cambios staged en git
2. Analiza en este orden:
   - Bugs potenciales y errores lógicos
   - Vulnerabilidades de seguridad (OWASP top 10)
   - Problemas de rendimiento
   - Legibilidad y mantenibilidad
3. Presenta hallazgos agrupados por severidad:
   - Crítico — debe corregirse antes de merge
   - Advertencia — recomendado corregir
   - Sugerencia — mejora opcional
4. Para cada hallazgo incluye: archivo y línea, descripción del problema, código sugerido de corrección
5. Al final, da un veredicto: aprobar, aprobar con cambios, o solicitar cambios

## Formato de salida
Hallazgos agrupados por severidad, cada uno con archivo/línea, descripción y corrección sugerida. Cierra siempre con el veredicto.
