#!/usr/bin/env python3
"""
audit_skills.py — Inventario y auditoría de completitud de todas las skills
instaladas en .claude/skills/ (ecosistema LEXA-LAB).

Para cada skill reporta:
  - name y description tal como los vería Claude (el frontmatter).
  - Si pasa scripts/validate_skill.py (frontmatter válido, name/description
    correctos) — esto es un requisito de instalación, no de calidad.
  - Un puntaje de completitud estructural (0-5) contra el house style del
    repo: regla de veracidad/seguridad anti-alucinación, "Cuándo usar esta
    skill", proceso operativo numerado, mini-ejemplo trabajado, cierre con
    límite de responsabilidad.
  - Palabras totales del archivo.

Importante — qué SÍ y qué NO mide este script:
  Esto es un análisis ESTÁTICO de texto (busca encabezados y patrones). No
  invoca la skill ni verifica que Claude la use bien en una conversación
  real. Un puntaje alto significa "está completa y bien estructurada según
  el house style", no "se probó en producción". Para verificar que una
  skill realmente funciona como se espera, hay que invocarla en una
  conversación real y revisar el resultado.

Uso:
    python3 scripts/audit_skills.py                # tabla en terminal
    python3 scripts/audit_skills.py --json          # salida JSON estructurada
    python3 scripts/audit_skills.py --path <SKILL.md>  # una sola skill
"""

import argparse
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import validate_skill  # noqa: E402

SKILLS_DIR = Path(__file__).resolve().parent.parent / ".claude" / "skills"

# Agrupación editorial de las skills en categorías, solo para el reporte.
# Una skill que no aparezca aquí cae en "Sin categorizar".
CATEGORIAS = {
    "Práctica legal (Colombia)": [
        "due-diligence-ma-co", "monitoreo-litigios-co", "auditoria-laboral-co",
        "cumplimiento-datos-co", "gobierno-corporativo-co",
        "compliance-antisoborno-co", "contratacion-estatal-co",
        "control-conflictos-intake-co", "gestion-conocimiento-co",
        "facturacion-horas-co", "disclosure-cliente", "redaccion-tutela-co",
        "revision-contrato-mercantil-co", "verificacion-citas-co",
    ],
    "Escritura y contenido": [
        "arquitecto-de-hilos", "esqueleto-de-articulo", "email-en-frio",
        "repurposeador", "forja-de-titulares", "imitador-de-voz",
        "doctor-de-guiones",
    ],
    "Research y análisis": [
        "cazador-de-fuentes", "autopsia-de-competencia", "estimador-de-mercado",
        "mapeador-de-tendencias", "auditor-de-citas", "sintetizador-de-research",
        "generador-de-preguntas",
    ],
    "Código e ingeniería interna": [
        "descripcion-de-pr", "repro-de-bug", "generador-de-tests",
        "planeador-de-refactor", "disenador-de-api", "esquema-de-base-de-datos",
        "escritor-de-docstrings",
    ],
    "Email y comunicación": [
        "triaje-de-inbox", "respuesta-dificil", "recap-de-junta",
        "status-update", "brief-de-negociacion", "disculpa",
    ],
    "Data y reportes": [
        "narrador-de-hojas", "tracker-de-kpis", "analista-de-cohortes",
        "constructor-de-forecast", "cazador-de-anomalias", "auditor-de-funnel",
        "traductor-a-sql",
    ],
    "Personal y productividad": [
        "revision-semanal", "diario-de-decisiones", "pipeline-de-lectura",
        "traductor-de-metas", "disenador-de-habitos", "ordenador-de-brain-dump",
    ],
    "Meta / construcción de skills": [
        "skill-creator", "documento-con-mi-formato", "proceso-multipaso-con-plan-b",
    ],
    "Plantilla / scaffold": ["tu-nombre-de-skill"],
}
CATEGORIA_DE = {name: cat for cat, names in CATEGORIAS.items() for name in names}

# Secciones del house style LEXA-LAB. Cada tupla es
# (clave, patrón regex sobre el cuerpo, peso en el puntaje de completitud).
SECCIONES_HOUSE_STYLE = [
    ("regla_veracidad", r"^##\s*Regla de (veracidad|seguridad)", "Regla de veracidad/seguridad anti-alucinación"),
    ("cuando_usar", r"^##\s*Cu[aá]ndo usar", "Sección 'Cuándo usar esta skill'"),
    ("proceso", r"^##\s*Proceso operativo|\*\*Paso 1", "Proceso operativo numerado"),
    ("ejemplo", r"^##.*[Ee]jemplo", "Mini-ejemplo trabajado"),
    ("cierre", r"^##\s*Cierre", "Cierre con límite de responsabilidad"),
]


def analizar_skill(skill_dir: Path):
    skill_md = skill_dir / "SKILL.md"
    resultado = {
        "carpeta": skill_dir.name,
        "categoria": CATEGORIA_DE.get(skill_dir.name, "Sin categorizar"),
        "existe": skill_md.exists(),
    }
    if not skill_md.exists():
        resultado.update(name=None, description=None, valida=False,
                          errores=["No existe SKILL.md en esta carpeta."],
                          palabras=0, puntaje=0, secciones={}, nivel="NO INSTALABLE")
        return resultado

    texto = skill_md.read_text(encoding="utf-8")
    errores, advertencias = validate_skill.validar(str(skill_md))
    valida = not errores

    try:
        name, desc_raw, cuerpo = validate_skill.leer_frontmatter(texto)
        description = (validate_skill.normalizar_description(desc_raw)
                       if desc_raw and "\n" in desc_raw
                       else (desc_raw.strip() if desc_raw else None))
    except ValueError:
        name, description, cuerpo = None, None, texto

    palabras = len(texto.split())

    secciones = {}
    for clave, patron, _ in SECCIONES_HOUSE_STYLE:
        secciones[clave] = bool(re.search(patron, cuerpo, re.MULTILINE | re.IGNORECASE))
    puntaje = sum(secciones.values())

    es_scaffold = skill_dir.name == "tu-nombre-de-skill"

    if es_scaffold:
        nivel = "PLANTILLA (sin función real, pendiente de completar)"
    elif not valida:
        nivel = "NO INSTALABLE — falla validate_skill.py"
    elif puntaje == 5 and 250 <= palabras <= 5000:
        nivel = "ALTA — completa contra el house style"
    elif puntaje >= 3:
        nivel = "MEDIA — funcional, le faltan secciones del house style"
    else:
        nivel = "BAJA — estructura incompleta"

    if valida and palabras > 5000:
        nivel += " (excede 5000 palabras, candidata a mover detalle a references/)"

    resultado.update(
        name=name, description=description, valida=valida, errores=errores,
        advertencias=advertencias, palabras=palabras, secciones=secciones,
        puntaje=puntaje, nivel=nivel,
    )
    return resultado


def imprimir_tabla(resultados):
    orden_categorias = list(CATEGORIAS.keys()) + ["Sin categorizar"]
    por_categoria = {}
    for r in resultados:
        por_categoria.setdefault(r["categoria"], []).append(r)

    total = len(resultados)
    altas = sum(1 for r in resultados if r["nivel"].startswith("ALTA"))
    medias = sum(1 for r in resultados if r["nivel"].startswith("MEDIA"))
    bajas = sum(1 for r in resultados if r["nivel"].startswith("BAJA"))
    no_instalables = sum(1 for r in resultados if "NO INSTALABLE" in r["nivel"])
    plantillas = sum(1 for r in resultados if r["nivel"].startswith("PLANTILLA"))

    print(f"AUDITORÍA DE SKILLS — {total} carpetas en .claude/skills/\n")
    print(f"  Alta completitud:    {altas}")
    print(f"  Media completitud:   {medias}")
    print(f"  Baja completitud:    {bajas}")
    print(f"  No instalables:      {no_instalables}")
    print(f"  Plantillas/scaffold: {plantillas}")
    print()

    for cat in orden_categorias:
        if cat not in por_categoria:
            continue
        print(f"\n### {cat}\n")
        for r in sorted(por_categoria[cat], key=lambda x: x["carpeta"]):
            print(f"- **{r['carpeta']}** [{r['nivel']}] — {r['palabras']} palabras, "
                  f"puntaje {r.get('puntaje', 0)}/5")
            desc = r.get("description") or "(sin description legible)"
            print(f"  {desc}")
            if r.get("errores"):
                for e in r["errores"]:
                    print(f"  ERROR: {e}")


def main():
    parser = argparse.ArgumentParser(description="Audita las skills instaladas en .claude/skills/")
    parser.add_argument("--json", action="store_true", help="Salida en JSON en vez de tabla legible")
    parser.add_argument("--path", help="Audita una sola carpeta de skill (ruta a su SKILL.md o a la carpeta)")
    args = parser.parse_args()

    if args.path:
        p = Path(args.path)
        skill_dir = p.parent if p.name == "SKILL.md" else p
        resultados = [analizar_skill(skill_dir)]
    else:
        resultados = [analizar_skill(d) for d in sorted(SKILLS_DIR.iterdir()) if d.is_dir()]

    if args.json:
        print(json.dumps(resultados, ensure_ascii=False, indent=2))
    else:
        imprimir_tabla(resultados)


if __name__ == "__main__":
    main()
