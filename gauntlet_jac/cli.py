"""CLI: python3 -m gauntlet_jac <validar-escrito|inventario> ...

Códigos de salida de validar-escrito: 0 PASS_AUTOMATICO, 1 CONDITIONAL, 2 BLOCKED, 3 error de uso.
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
import zipfile
from datetime import date

from . import informe, inventario

SALIDA = {"PASS_AUTOMATICO": 0, "CONDITIONAL": 1, "BLOCKED": 2}


def leer_entrada(arg: str) -> str:
    """Ruta a .txt/.md/.docx, o el texto literal del escrito."""
    if not os.path.isfile(arg):
        return arg
    if arg.lower().endswith(".pdf"):
        raise ValueError("PDF no soportado: convierta a texto o docx antes de validar")
    if arg.lower().endswith(".docx"):
        with zipfile.ZipFile(arg) as z:
            xml = z.read("word/document.xml").decode("utf-8")
        xml = re.sub(r"</w:p>", "\n\n", xml)
        xml = re.sub(r"<w:tab/>", "\t", xml)
        txt = re.sub(r"<[^>]+>", "", xml)
        return txt.replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">").replace("&quot;", '"').replace("&apos;", "'")
    with open(arg, "rb") as f:
        crudo = f.read()
    try:
        return crudo.decode("utf-8")
    except UnicodeDecodeError:
        return crudo.decode("cp1252")


def main(argv=None) -> int:
    p = argparse.ArgumentParser(prog="gauntlet_jac")
    sub = p.add_subparsers(dest="cmd", required=True)
    v = sub.add_parser("validar-escrito")
    v.add_argument("entrada")
    v.add_argument("--fecha-ref", help="AAAA-MM-DD (por defecto, hoy)")
    v.add_argument("--radicado", help="Radicado del asunto fijado (Matter Lock)")
    v.add_argument("--sin-red", action="store_true")
    v.add_argument("--json", dest="salida_json")
    v.add_argument("--previo", help="JSON de una ejecución anterior, para comparar")
    i = sub.add_parser("inventario")
    i.add_argument("carpeta")
    i.add_argument("--json", dest="salida_json")
    a = p.parse_args(argv)
    try:
        if a.cmd == "inventario":
            filas = inventario.inventariar(a.carpeta)
            print(inventario.a_texto(filas))
            if a.salida_json:
                json.dump(filas, open(a.salida_json, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
            return 0
        texto = leer_entrada(a.entrada)
        previo = json.load(open(a.previo, encoding="utf-8")) if a.previo else None
        ref = date.fromisoformat(a.fecha_ref) if a.fecha_ref else None
        inf = informe.ejecutar(texto, ref, a.radicado, sin_red=a.sin_red, previo=previo)
        print(informe.a_texto(inf))
        if a.salida_json:
            json.dump(inf, open(a.salida_json, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
        return SALIDA[inf["estado"]]
    except (OSError, ValueError, zipfile.BadZipFile, KeyError) as e:
        print(f"Error de uso: {e}", file=sys.stderr)
        return 3
