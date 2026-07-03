---
name: generador-de-tests
description: Genera casos de test que sí detectan bugs reales (happy path, boundary, input inválido, concurrencia si aplica, regresión) para funciones de las herramientas internas del despacho, como scripts/validate_skill.py o un futuro script de sincronización del CRM de prospectos. Úsala cuando el usuario pida generar tests para una función, pida cobertura de casos borde para un script interno, o quiera un test de regresión después de corregir un bug real.
---

# Generador de tests — herramientas internas de JA Abogados

El despacho corre código propio sin equipo de QA: `scripts/validate_skill.py`
decide si una skill se sube o no, `scripts/package_skills_for_upload.sh`
empaqueta lo que termina en `dist/`, y cualquier script futuro de
sincronización del CRM de prospectos o del portal de clientes puede fallar
en silencio si nadie lo prueba. Esta skill genera los tests que un dev (el
propio Jorge Cortés con ayuda de un desarrollador contratado, o el
desarrollador solo) correría antes de confiar en que el script hace lo que
dice hacer.

## Regla de seguridad obligatoria (anti-alucinación)

1. **Nunca afirmes que un test generado pasa.** Un test recién escrito por
   esta skill no se ha ejecutado todavía. Cada bloque de tests debe cerrar
   con la nota explícita **"no ejecutado — correr `pytest` (o el runner que
   aplique) contra el código real antes de asumir que pasan o que fallan"**.
2. **Nunca inventes el comportamiento de la función bajo prueba.** Si no
   tienes el código fuente completo de la función, dilo explícitamente y
   pide que lo compartan antes de generar asserts que asuman un
   comportamiento no confirmado. Un test que afirma un resultado que nadie
   verificó contra el código real es peor que no tener test, porque da
   falsa confianza.
3. **Nunca inventes nombres de columnas, campos o claves de un dict/JSON**
   que la función use si no aparecen literalmente en el código fuente que
   te dieron.
4. **Si los datos de prueba representan un caso de cliente real** (un
   registro del CRM de prospectos, un caso o expediente), los valores deben
   ser ficticios o anonimizados — nunca el nombre, NIT, cédula o dato real
   de un cliente o prospecto, por la Ley 1581 de 2012.

## Cuándo usar esta skill

Cuando el usuario tenga una función de una herramienta interna del despacho
y un framework de test (pytest, unittest, jest, lo que aplique) y quiera
generar los casos de test antes de confiar en que el código funciona, o
después de corregir un bug real y necesite fijar un test de regresión.

## Proceso operativo

**1. Pedir la función completa y el framework.**
No generes tests sobre una descripción de la función ("algo que valida
skills") — pide el código fuente real. Pide también el framework exacto
(pytest, unittest, jest) para usar su sintaxis nativa, no una genérica.

**2. Generar exactamente este conjunto de casos, salvo justificación explícita:**
- **1 happy path** — el input típico, esperado, sin errores.
- **3 boundary** — límites exactos de cualquier validación numérica o de
  longitud presente en la función (por ejemplo, exactamente en el límite,
  uno por debajo, uno por encima).
- **2 input inválido** — datos malformados, vacíos, de tipo incorrecto, o
  que violen una precondición explícita del código.
- **1 race/concurrencia, si aplica** — si la función no tiene estado
  compartido ni I/O concurrente, no inventes un test de concurrencia:
  escribe explícitamente "no aplica — la función es pura/sin estado
  compartido, se omite el test de concurrencia por esa razón", en vez de
  omitirlo en silencio.
- **1 regresión, si hay historial de bug documentado** — si no hay ningún
  bug previo conocido para esa función, escribe "no aplica — sin historial
  de bug documentado para esta función; agregar aquí el primero que
  aparezca", en vez de inventar uno.

**3. Nombrar cada test de forma descriptiva.**
El nombre debe decir qué input recibe y qué comportamiento se espera, sin
usar `test1`, `test2`, o `should_work`. Ejemplo de nombre aceptable:
`test_name_con_mayusculas_es_rechazado_por_kebab_case`.

**4. Cerrar con el estado de ejecución.**
Deja explícito que los tests generados no se han corrido, y da el comando
exacto que hay que ejecutar para confirmarlo.

## Reglas de formato

- Un `assert` por comportamiento verificado, no varios comportamientos
  mezclados en un solo test.
- Nombres de test descriptivos, nunca genéricos.
- Datos de prueba ficticios si el dominio involucra clientes o prospectos.

## Mini-ejemplo completo

**Función real bajo prueba**: `validar(path)` en
`/home/user/jacabogados/scripts/validate_skill.py` — lee un `SKILL.md`,
valida frontmatter, `name` en kebab-case sin "claude"/"anthropic",
`description` bajo 1024 caracteres sin tags XML, y advierte (sin bloquear)
si el cuerpo supera 5000 palabras. Framework: `pytest`.

```python
# test_validate_skill.py
# no ejecutado — correr `pytest test_validate_skill.py` antes de asumir
# que estos casos pasan o fallan contra el código real.

import pytest
from scripts.validate_skill import validar

def escribir_skill(tmp_path, frontmatter, cuerpo="Contenido de prueba."):
    contenido = f"---\n{frontmatter}\n---\n\n{cuerpo}"
    archivo = tmp_path / "SKILL.md"
    archivo.write_text(contenido, encoding="utf-8")
    return str(archivo)

# --- 1 happy path ---
def test_skill_valida_con_name_kebab_case_y_description_corta(tmp_path):
    ruta = escribir_skill(
        tmp_path,
        "name: mi-skill-de-prueba\ndescription: Hace algo concreto y corto.",
    )
    errores, advertencias = validar(ruta)
    assert errores == []

# --- 3 boundary (límite de 1024 caracteres en description) ---
def test_description_de_exactamente_1024_caracteres_pasa(tmp_path):
    desc = "a" * 1024
    ruta = escribir_skill(tmp_path, f"name: mi-skill\ndescription: {desc}")
    errores, _ = validar(ruta)
    assert errores == []

def test_description_de_1023_caracteres_pasa(tmp_path):
    desc = "a" * 1023
    ruta = escribir_skill(tmp_path, f"name: mi-skill\ndescription: {desc}")
    errores, _ = validar(ruta)
    assert errores == []

def test_description_de_1025_caracteres_falla(tmp_path):
    desc = "a" * 1025
    ruta = escribir_skill(tmp_path, f"name: mi-skill\ndescription: {desc}")
    errores, _ = validar(ruta)
    assert any("1024" in e for e in errores)

# --- 2 input inválido ---
def test_name_con_mayusculas_es_rechazado_por_kebab_case(tmp_path):
    ruta = escribir_skill(
        tmp_path, "name: Mi-Skill-Invalida\ndescription: Texto válido."
    )
    errores, _ = validar(ruta)
    assert any("kebab-case" in e for e in errores)

def test_name_con_palabra_claude_es_rechazado(tmp_path):
    ruta = escribir_skill(
        tmp_path, "name: skill-de-claude\ndescription: Texto válido."
    )
    errores, _ = validar(ruta)
    assert any("claude" in e.lower() for e in errores)

# --- 1 race/concurrencia ---
# no aplica: validar() solo lee un archivo y hace parsing en memoria, sin
# estado compartido ni I/O concurrente entre llamadas. Se omite el test de
# concurrencia por esa razón, no por descuido.

# --- 1 regresión ---
# no aplica: sin historial de bug documentado para validar() al momento de
# escribir este archivo. Si aparece un bug real reportado sobre esta
# función, agregar aquí un test que lo reproduzca antes de corregirlo.
```

**Estado**: ninguno de estos 6 tests se ha ejecutado. Correr
`pytest test_validate_skill.py -v` desde la raíz del repo y confirmar el
resultado real antes de asumir que la lógica de `validar()` se comporta
como se describe arriba.

## Cierre — límite de esta skill

Esta skill genera los casos y los nombra bien; no ejecuta los tests ni
certifica que la función bajo prueba es correcta. La única forma de saber si
un test pasa es correrlo. Si la función probada procesa datos de clientes o
prospectos reales, los valores de ejemplo usados en los tests deben ser
siempre ficticios, por la Ley 1581 de 2012 — nunca copies un registro real
del CRM o del portal de clientes a un archivo de test.
