---
name: descripcion-de-pr
description: Escribe descripciones de Pull Request completas y verificables a partir de un diff real o el nombre de una rama, pensadas para cambios sobre el propio repo del despacho (skills de .claude/skills, scripts/validate_skill.py, scripts/package_skills_for_upload.sh o cualquier otra herramienta interna). Úsala cuando el usuario pida redactar la descripción de un PR, convertir un diff en un resumen listo para revisión, o preparar el "qué cambió y por qué" antes de abrir el Pull Request.
---

# Descripción de PR — herramientas internas de JA Abogados

El despacho no es una fábrica de software, pero sí mantiene código propio: las
skills de `.claude/skills/`, los scripts de validación y empaquetado
(`scripts/validate_skill.py`, `scripts/package_skills_for_upload.sh`), y
eventualmente el CRM de prospectos o el portal de clientes si se contratan a
desarrollo. Cada cambio a ese código pasa por un PR, y quien lo revisa —Jorge
Cortés, o un desarrollador externo contratado— casi nunca tiene tiempo de leer
el diff completo antes de decidir si lo mira con cuidado o lo aprueba de
salida. Esta skill escribe la descripción que hace esa decisión posible.

## Regla de seguridad obligatoria (anti-alucinación)

El riesgo central de esta skill es inventar qué hace el cambio en lugar de
leerlo. Nunca es aceptable:

1. **Afirmar que un test pasa, que un bug quedó resuelto, o que un script
   produce cierto resultado sin haberlo ejecutado.** Si no corriste
   `python scripts/validate_skill.py --path ...` o el test suite real, el
   "Test plan" debe decir explícitamente **"no ejecutado — verificar
   corriendo el comando real antes de aprobar"**, nunca "los tests pasan".
2. **Nunca inventar nombres de funciones, columnas, campos de frontmatter o
   argumentos de CLI que no aparezcan literalmente en el diff.** Si el diff
   toca `scripts/validate_skill.py`, cita las funciones y variables tal como
   están escritas (`leer_frontmatter`, `normalizar_description`, `validar`),
   no una versión aproximada de memoria.
3. **Si el cambio toca cualquier dato de cliente** (por ejemplo, un script
   que lee el CRM de prospectos, una tabla de casos, o cualquier campo con
   datos personales), recuerda en la descripción que aplica la Ley 1581 de
   2012 (habeas data) y que ningún ejemplo en el PR puede usar un nombre,
   NIT o dato real de un cliente sin anonimizar.

Si el usuario no te da el diff, pídeselo o pide el nombre de la rama para
leerlo tú mismo (`git diff main...rama`). No redactes la descripción sobre lo
que el usuario *dice* que cambió si el diff está disponible y no lo has
leído — léelo primero.

## Cuándo usar esta skill

Cuando haya un diff o una rama lista para abrir Pull Request contra el repo
del despacho: una skill nueva o corregida en `.claude/skills/`, un cambio a
`validate_skill.py` o `package_skills_for_upload.sh`, o cualquier script de
una herramienta interna (sincronización del CRM, automatización de
documentos, endpoints del portal de clientes).

## Proceso operativo

**1. Obtener el diff real.**
Pide el diff completo o el nombre de la rama. Si te dan la rama, ejecuta
`git diff` contra la rama base antes de escribir una sola línea. No resumas
un cambio que no has leído completo.

**2. Identificar el "qué" y el "por qué" por separado.**
El diff te dice el qué. El por qué casi nunca está en el código — pregúntalo
si no es evidente por el commit message o el contexto de la conversación.
Nunca inventes una motivación de negocio o técnica que nadie mencionó.

**3. Producir el output exacto, en este orden:**

- **Title** — imperativo, presente, menos de 60 caracteres. ("Agrega
  validación de nombres duplicados a validate_skill.py", no "Fix bug".)
- **What** — 2 bullets, cada uno una acción concreta y verificable en el
  diff (archivo tocado + qué cambió en él).
- **Why** — 1 frase. La razón de negocio o técnica, no una repetición del
  "what".
- **How** — 3 bullets con el mecanismo del cambio (qué función, qué lógica,
  qué decisión de diseño), no una lista de nombres de archivo sin contexto.
- **Test plan** — 3 pasos numerados y ejecutables. Cada paso marcado como
  "ejecutado, resultado: ..." (con el resultado real observado) o como
  "no ejecutado — verificar corriendo `<comando exacto>` antes de aprobar".
  Nunca mezclar los dos sin dejar explícito cuál es cuál.
- **Screenshots** — placeholder `[pendiente]` si el cambio tiene superficie
  visual (un output de CLI con formato, un HTML), o se omite la sección por
  completo si no aplica. Nunca un placeholder para un cambio puramente de
  lógica interna.

**4. Revisar contra la lista de prohibidos antes de entregar.**
Elimina cualquier aparición de "este PR" (usa el sujeto real: "agrega",
"corrige", "elimina"), "minor refactor", "varios cambios", "mejoras
generales", o cualquier frase que no un reviewer no podría verificar contra
el diff línea por línea.

## Reglas de formato (no negociables)

- Title bajo 60 caracteres, verbo en imperativo al inicio.
- What: exactamente 2 bullets. Why: exactamente 1 frase. How: exactamente 3
  bullets. Test plan: exactamente 3 pasos.
- Cero frases genéricas ("mejoras varias", "limpieza de código", "ajustes
  menores") — cada bullet debe ser específico y trazable al diff.
- Sin "este PR" como sujeto de ninguna oración.

## Mini-ejemplo completo

**Contexto real**: se agrega una quinta regla bloqueante a
`scripts/validate_skill.py` para rechazar un `name` que ya exista como
carpeta en `.claude/skills/`, evitando subir dos skills con el mismo nombre
al zip de `dist/`.

```
Title: Rechaza en validate_skill.py un name duplicado entre skills

What:
- Agrega en validar() una comprobación que compara el `name` del
  frontmatter contra los nombres de las demás carpetas en
  .claude/skills/, antes de las reglas 2-4 existentes.
- Agrega el mensaje de error correspondiente a la lista `errores`
  cuando encuentra una coincidencia, con la ruta de la carpeta en
  conflicto.

Why: package_skills_for_upload.sh empaquetaba dos skills con el mismo
`name` sin advertirlo, y Claude.ai solo conserva la última subida al
instalar por Settings → Skills.

How:
- validar() recibe ahora la lista de carpetas hermanas vía
  os.listdir(os.path.dirname(path) + "/..") y la compara antes de
  construir el frontmatter.
- La comparación es case-insensitive porque kebab-case ya fuerza
  minúsculas, pero se normaliza explícito por si acaso.
- El mensaje de error nuevo sigue el mismo formato que los otros 4
  (qué falló + cómo corregirlo), para no romper el patrón que lee
  package_skills_for_upload.sh al capturar la salida.

Test plan:
1. Ejecutado, resultado: `python scripts/validate_skill.py --path
   .claude/skills/facturacion-horas-co/SKILL.md` sigue devolviendo
   exit 0 (no hay falso positivo contra las skills existentes).
2. No ejecutado — verificar corriendo el validador contra dos copias
   de SKILL.md con el mismo `name` en carpetas distintas y confirmar
   exit 1 con el mensaje nuevo.
3. No ejecutado — verificar que
   `./scripts/package_skills_for_upload.sh` salta ambas carpetas
   duplicadas en vez de generar dos .zip silenciosamente.

Screenshots: [no aplica — cambio de lógica de CLI sin superficie visual]
```

## Cierre — límite de esta skill

Esta skill entrega la descripción, nunca abre el Pull Request ni lo aprueba
por su cuenta. El "Test plan" marcado como "no ejecutado" es una instrucción
para quien revisa, no una promesa de que el cambio funciona — la única forma
de confirmar que un test pasa, que un bug quedó resuelto, o que un script
produce el resultado esperado es correrlo de verdad. Si el diff toca datos
de cliente, la responsabilidad de confirmar que no hay filtración de datos
reales en el PR (Ley 1581 de 2012) es siempre de quien lo abre y de quien lo
aprueba, no de esta skill.
