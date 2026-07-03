---
name: escritor-de-docstrings
description: Escribe docstrings que un desarrollador (interno o contratado) sí lee, para las funciones sin documentar de las herramientas internas del despacho, como scripts/validate_skill.py o scripts/package_skills_for_upload.sh. Úsala cuando el usuario pida documentar una función de un script interno, agregar docstrings a un archivo que no los tiene, o revisar si la documentación de una función coincide con lo que de verdad hace.
---

# Escritor de docstrings — herramientas internas de JA Abogados

Los scripts del despacho (`scripts/validate_skill.py`,
`scripts/package_skills_for_upload.sh`, y cualquier otro que se sume para
el CRM de prospectos o el portal de clientes) los va a tocar, con el tiempo,
alguien que no es quien los escribió primero — un desarrollador contratado
puntualmente, o el propio Jorge Cortés meses después habiendo olvidado el
detalle. Esta skill documenta esas funciones para esa persona futura, sin
tocar ni una línea de la lógica que ya funciona.

## Regla de seguridad obligatoria (anti-alucinación)

1. **Nunca describas en el docstring un comportamiento que no confirmaste
   leyendo el cuerpo real de la función.** Si la función tiene una rama de
   código que no entiendes del todo, dilo explícitamente en vez de resumir
   con una frase genérica que suene plausible.
2. **Nunca inventes el tipo de un argumento o de un valor de retorno que no
   esté explícito en el código** (type hints, valor por defecto, uso
   dentro de la función). Si el tipo no se puede determinar con certeza a
   partir del código, escribe el tipo más específico que sí se pueda
   confirmar y anota la incertidumbre en vez de adivinar uno más preciso.
3. **El ejemplo de uso del docstring debe ser un input realista para el
   dominio del despacho, pero nunca un dato real de cliente o prospecto.**
   Si la función procesa datos de un caso, un cliente o un prospecto, el
   ejemplo debe ser ficticio, por la Ley 1581 de 2012 — incluso dentro de
   un comentario de código que nadie va a publicar.
4. **Nunca modifiques el cuerpo de la función.** Esta skill solo agrega o
   corrige el docstring; si detectas que el docstring existente describe
   algo que el código ya no hace, señala la discrepancia explícitamente en
   vez de "arreglar" el código para que coincida con lo que dice el
   docstring.

## Cuándo usar esta skill

Cuando el usuario tenga un archivo o una función de una herramienta interna
del despacho sin docstring, con un docstring desactualizado, o quiera
confirmar que la documentación existente coincide con el comportamiento
real del código.

## Proceso operativo

**1. Pedir el archivo o la función completa.**
No documentes a partir de un nombre de función solo ("documenta
`validar`") — pide o localiza el cuerpo completo. Sin el cuerpo real no hay
forma de confirmar qué hace, qué puede fallar, ni qué devuelve.

**2. Para cada función pública, escribir:**
- **Resumen de una línea**: qué hace la función, en modo imperativo o
  descriptivo según el estilo ya usado en el archivo (revisar los
  docstrings existentes del mismo archivo antes de elegir el tono).
- **Args**: cada argumento con su tipo (confirmado en el código, no
  inventado) y cualquier restricción real (¿acepta `None`? ¿espera una ruta
  que exista? ¿un formato de string específico?).
- **Returns**: qué devuelve exactamente, incluyendo la forma del dato si es
  una tupla o estructura compuesta (por ejemplo, "una tupla de dos listas
  de strings", no solo "una tupla").
- **Raises**, si aplica: qué excepción lanza la función y bajo qué
  condición exacta, solo si el código realmente lanza algo explícito —
  nunca inventar una excepción que el código no lanza.
- **Ejemplo**: un input realista para el dominio del despacho, con datos
  ficticios si el dominio involucra clientes o prospectos.

**3. Igualar el estilo ya existente en el archivo.**
Si otras funciones del mismo archivo ya tienen docstrings, replica su
formato (comillas triples, idioma, si usan secciones "Args/Returns" en
español o inglés, si son de una línea o de varias). No introduzcas un
estilo nuevo en un archivo que ya tiene uno establecido.

**4. Nunca tocar el cuerpo de la función.**
El diff que produce esta skill debe limitarse estrictamente a agregar o
reemplazar el docstring — cero cambios en la lógica, cero renombrado de
variables, cero "mientras estoy aquí, también arreglo esto otro".

## Reglas de formato

- Docstrings en el mismo idioma que el resto del archivo (español, en el
  caso de los scripts actuales del despacho).
- Una sección por bloque (Args, Returns, Raises) solo si aplica —no
  incluyas "Raises" si la función no lanza nada explícito.
- El ejemplo siempre con datos ficticios cuando el dominio toca clientes o
  prospectos.

## Mini-ejemplo completo

**Función real sin documentar**: `validar(path)` en
`/home/user/jacabogados/scripts/validate_skill.py`. El archivo ya tiene
docstrings en otras dos funciones (`leer_frontmatter` y
`normalizar_description`) en español, con el patrón "resumen en una línea +
detalle si aplica", así que el docstring nuevo sigue ese mismo estilo.

**Cuerpo real de la función** (sin modificar, solo para referencia):
```python
def validar(path):
    errores = []
    advertencias = []
    try:
        with open(path, "r", encoding="utf-8") as f:
            texto = f.read()
    except FileNotFoundError:
        return [f"No se encontró el archivo en la ruta: {path}. Verifica la ruta con --path."], []
    except Exception as e:
        return [f"No se pudo leer el archivo ({type(e).__name__}: {e})."], []
    try:
        name, desc_raw, cuerpo = leer_frontmatter(texto)
    except ValueError as e:
        return [str(e)], []
    # ... (reglas 2 a 5, cada una agrega a errores o advertencias) ...
    return errores, advertencias
```

**Docstring propuesto (agregado, sin tocar el cuerpo):**
```python
def validar(path):
    """Valida un SKILL.md contra las 4 reglas bloqueantes y la advertencia
    de tamaño del ecosistema LEXA-LAB, sin lanzar excepciones hacia el
    llamador: cualquier fallo de lectura o de formato se devuelve como
    parte de la lista de errores.

    Args:
        path (str): ruta al archivo SKILL.md a validar. No necesita existir
            de antemano — si la ruta es inválida o el archivo no existe,
            la función lo reporta como error en vez de lanzar una excepción.

    Returns:
        tuple[list[str], list[str]]: una tupla `(errores, advertencias)`.
        `errores` contiene un mensaje por cada regla bloqueante que falló
        (frontmatter ausente o mal delimitado, `name` inválido o con
        "claude"/"anthropic", `description` ausente, mayor a 1024
        caracteres, o con un tag tipo XML). `advertencias` contiene, como
        máximo, un mensaje si el cuerpo del archivo supera las 5000
        palabras recomendadas. Si `errores` está vacío, el archivo pasó
        todas las validaciones bloqueantes, independientemente de si hay
        advertencias.

    Ejemplo:
        >>> errores, advertencias = validar(
        ...     ".claude/skills/disenador-de-api/SKILL.md"
        ... )
        >>> errores
        []
        >>> advertencias
        []
    """
    errores = []
    advertencias = []
    # ... cuerpo original sin ningún cambio ...
```

Nota de discrepancia (si existiera): si al leer el código real la función
ya no devolviera exactamente esa tupla, o lanzara una excepción en algún
caso no cubierto por el `try/except`, el docstring anterior no debe
escribirse como está — hay que ajustarlo a lo que el código hace de
verdad, y señalar la diferencia encontrada en vez de documentar el
comportamiento "esperado" en lugar del real.

## Cierre — límite de esta skill

Esta skill agrega o corrige documentación; nunca cambia el comportamiento
de la función que documenta. Si al leer el código encuentras que hace algo
distinto de lo que el docstring anterior decía, repórtalo como una
discrepancia para que un humano decida si el bug está en el código o en la
documentación vieja — no lo resuelvas por tu cuenta cambiando la lógica. Si
el ejemplo de uso de una función necesita ilustrar datos de clientes o
prospectos, esos datos deben ser siempre ficticios, por la Ley 1581 de
2012.
