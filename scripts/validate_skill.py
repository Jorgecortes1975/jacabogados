#!/usr/bin/env python3
"""
validate_skill.py — Validación determinista de calidad de un SKILL.md
del ecosistema LEXA-LAB (Bufete Cortés Cartagena).

Verifica, en orden, las 4 reglas de calidad que se han aplicado manualmente
durante las auditorías de skills de este proyecto:

  1. El frontmatter YAML existe (delimitado por '---' al inicio y al cierre).
  2. El campo 'name' está en kebab-case y no contiene 'claude' ni 'anthropic'.
  3. El campo 'description' (plegado YAML '>') mide 1024 caracteres o menos.
  4. La description no contiene tags tipo XML/HTML ('<algo>').
  5. (Advertencia, no bloqueante) El cuerpo del archivo supera las 5000 palabras
     y debería dividirse en references/.

Exit code 0 -> todas las validaciones bloqueantes (1-4) pasaron.
Exit code 1 -> al menos una validación bloqueante falló. El mensaje indica
               qué falló y cómo corregirlo.

Uso:
    python scripts/validate_skill.py --path /ruta/al/SKILL.md
"""

import argparse
import re
import sys


def leer_frontmatter(texto):
    """Devuelve (name, description_cruda, cuerpo_despues_del_frontmatter) o
    lanza ValueError si el frontmatter no existe o está mal delimitado."""
    if not texto.startswith("---\n"):
        raise ValueError(
            "El archivo no empieza con '---' en la primera línea. "
            "Todo SKILL.md debe abrir el frontmatter YAML en la línea 1."
        )
    resto = texto[4:]
    cierre = resto.find("\n---")
    if cierre == -1:
        raise ValueError(
            "No se encontró el '---' de cierre del frontmatter. "
            "Verifica que el bloque YAML esté correctamente delimitado."
        )
    frontmatter = resto[:cierre]
    cuerpo = resto[cierre + len("\n---"):]

    m_name = re.search(r"^name:\s*(.+)$", frontmatter, re.MULTILINE)
    name = m_name.group(1).strip() if m_name else None

    m_desc = re.search(r"description:\s*>\s*\n((?:^[ \t].*\n?)+)", frontmatter, re.MULTILINE)
    if m_desc:
        desc_raw = m_desc.group(1)
    else:
        m_desc_inline = re.search(r"^description:\s*(.+)$", frontmatter, re.MULTILINE)
        desc_raw = m_desc_inline.group(1) if m_desc_inline else None

    return name, desc_raw, cuerpo


def normalizar_description(desc_raw):
    """Aplica el plegado YAML '>': junta líneas con espacio, recorta indentación."""
    lineas = [l.strip() for l in desc_raw.split("\n") if l.strip() != ""]
    return " ".join(lineas)


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

    # Regla 2: name en kebab-case, sin claude/anthropic
    if not name:
        errores.append(
            "Falta el campo 'name:' en el frontmatter. "
            "Agrega una línea 'name: tu-skill-en-kebab-case'."
        )
    else:
        if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", name):
            errores.append(
                f"El campo name ('{name}') no está en kebab-case puro "
                "(solo minúsculas, dígitos y guiones, sin espacios ni mayúsculas). "
                "Corrígelo a un formato como 'mi-skill-nueva'."
            )
        if "claude" in name.lower() or "anthropic" in name.lower():
            errores.append(
                f"El campo name ('{name}') contiene 'claude' o 'anthropic'. "
                "Elimina esa palabra del nombre de la skill."
            )

    # Regla 3 y 4: description bajo 1024 caracteres, sin tags XML
    if not desc_raw:
        errores.append(
            "Falta el campo 'description:' en el frontmatter, o no se pudo "
            "interpretar su formato (se esperaba 'description: >' seguido de "
            "líneas indentadas, o 'description: texto en una sola línea')."
        )
    else:
        desc = normalizar_description(desc_raw) if "\n" in desc_raw else desc_raw.strip()
        largo = len(desc)
        if largo > 1024:
            errores.append(
                f"La description mide {largo} caracteres, supera el límite de 1024. "
                "Recorta triggers menos críticos o frases repetidas hasta bajar de 1024. "
                f"Sobran {largo - 1024} caracteres."
            )
        if re.search(r"<[a-zA-Z][^>]*>", desc):
            errores.append(
                "La description contiene un tag tipo XML/HTML (algo entre '<' y '>'). "
                "Elimínalo; estos tags pueden hacer fallar la carga de la skill."
            )

    # Regla 5 (advertencia, no bloqueante): tamaño del cuerpo
    palabras_totales = len(texto.split())
    if palabras_totales > 5000:
        advertencias.append(
            f"El archivo completo tiene {palabras_totales} palabras, supera las "
            "5000 recomendadas. Considera mover el detalle profundo (plantillas "
            "largas, checklists extensos, ejemplos) a archivos en references/ "
            "y dejar en el SKILL.md solo las reglas críticas y el flujo principal."
        )

    return errores, advertencias


def main():
    parser = argparse.ArgumentParser(
        description="Valida un SKILL.md contra las reglas de calidad de LEXA-LAB."
    )
    parser.add_argument("--path", required=True, help="Ruta al archivo SKILL.md a validar")
    args = parser.parse_args()

    errores, advertencias = validar(args.path)

    if advertencias:
        print("⚠️  Advertencias (no bloquean, pero deberías revisarlas):")
        for i, a in enumerate(advertencias, 1):
            print(f"  {i}. {a}")
        print()

    if errores:
        print(f"❌ Validación fallida — {len(errores)} problema(s) encontrado(s):\n")
        for i, e in enumerate(errores, 1):
            print(f"  {i}. {e}")
        print("\nCorrige lo señalado arriba y vuelve a correr el script antes de "
              "instalar o subir esta skill.")
        sys.exit(1)

    print("✅ todas las validaciones pasaron")
    sys.exit(0)


if __name__ == "__main__":
    main()
