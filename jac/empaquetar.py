"""Empaqueta JAC Legal OS como archivo .plugin (zip) para Claude Cowork o Claude Code.

Usa una LISTA BLANCA: solo viaja lo necesario. El resto del repositorio (CRM de prospectos,
planes de marketing, hojas de cálculo) no se incluye nunca.
"""
from __future__ import annotations

import json
import zipfile
from pathlib import Path
from typing import List

RAIZ = Path(__file__).resolve().parent.parent
INCLUIR = [".claude-plugin", "skills", "agents", "hooks", "bin", "jac", "jurisprudencia_col", "gauntlet_jac", "normas_col"]
EXCLUIR_PARTES = {"__pycache__", ".pytest_cache", ".DS_Store"}
EXCLUIR_SUFIJOS = {".pyc", ".pyo"}


def archivos(raiz: Path = RAIZ) -> List[Path]:
    out = []
    for nombre in INCLUIR:
        base = raiz / nombre
        if not base.exists():
            continue
        for f in sorted(base.rglob("*")) if base.is_dir() else [base]:
            if f.is_file() and not (set(f.parts) & EXCLUIR_PARTES) and f.suffix not in EXCLUIR_SUFIJOS:
                out.append(f)
    return out


def empaquetar(salida: str = "jac-legal-os.plugin", raiz: Path = RAIZ) -> dict:
    if not (raiz / ".claude-plugin" / "plugin.json").is_file():
        raise FileNotFoundError("No se encontró .claude-plugin/plugin.json: ejecute `empaquetar` desde una copia "
                                "del repositorio (git clone), no desde una instalación con pip.")
    manifiesto = json.loads((raiz / ".claude-plugin" / "plugin.json").read_text(encoding="utf-8"))
    destino = Path(salida)
    lista = archivos(raiz)
    with zipfile.ZipFile(destino, "w", zipfile.ZIP_DEFLATED) as z:
        for f in lista:
            z.write(f, f.relative_to(raiz).as_posix())      # conserva permisos de ejecución
        guia = raiz / "AGENTE-JAC.md"
        if guia.is_file():
            z.write(guia, "README.md")
    return {"archivo": str(destino), "plugin": manifiesto["name"], "version": manifiesto["version"],
            "archivos": len(lista) + 1, "bytes": destino.stat().st_size}
