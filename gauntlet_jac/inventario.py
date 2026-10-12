"""Inventario documental de una carpeta: nada se omite y los duplicados se detectan.

Identifica por contenido (sha256), no por nombre: los nombres de archivo no son fiables.
"""
from __future__ import annotations

import hashlib
import os
from typing import List

TEXTO_DIRECTO = {".txt", ".md", ".csv", ".json", ".html", ".htm"}


def inventariar(carpeta: str) -> List[dict]:
    filas, vistos = [], {}
    for raiz, _, archivos in sorted(os.walk(carpeta)):
        for nombre in sorted(archivos):
            ruta = os.path.join(raiz, nombre)
            with open(ruta, "rb") as f:
                h = hashlib.sha256(f.read()).hexdigest()
            ext = os.path.splitext(nombre)[1].lower()
            rel = os.path.relpath(ruta, carpeta)
            original = vistos.get(h, "")
            vistos.setdefault(h, rel)
            filas.append({
                "archivo": rel, "extension": ext,
                "bytes": os.path.getsize(ruta), "sha256": h[:16],
                "duplicado_de": original,
                "lectura": "texto directo" if ext in TEXTO_DIRECTO else "requiere extraccion (docx/pdf/imagen)",
                "estado": "PENDIENTE DE LECTURA",
            })
    return filas


def a_texto(filas: List[dict]) -> str:
    L = [f"INVENTARIO DOCUMENTAL: {len(filas)} archivos, {sum(1 for f in filas if f['duplicado_de'])} duplicados por contenido",
         "Cada archivo debe pasar de PENDIENTE DE LECTURA a leído o ilegible antes de afirmar que se revisó el expediente.", ""]
    for n, f in enumerate(filas, 1):
        dup = f" DUPLICADO de {f['duplicado_de']}" if f["duplicado_de"] else ""
        L.append(f"{n}. {f['archivo']} | {f['bytes']} bytes | {f['sha256']} | {f['lectura']}{dup}")
    return "\n".join(L)
