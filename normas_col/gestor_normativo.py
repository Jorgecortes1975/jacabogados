"""Confirmación en vivo de una norma del catálogo contra su página oficial.

Solo usa el patrón de URL verificado (norma.php?i=<id>). No implementa búsqueda por
cita: el formulario de consulta no se ha inspeccionado y no se inventa.
"""
from __future__ import annotations

import re
from typing import Optional, Tuple

from jurisprudencia_col.http import FuenteNoDisponible, obtener

from .catalogo import Norma


def confirmar_en_vivo(norma: Norma, cliente=None) -> Tuple[Optional[bool], str]:
    """(True|False|None, detalle). None: la fuente no respondió (no concluyente)."""
    if not norma.url:
        return None, "la norma no tiene URL oficial registrada"
    try:
        r = obtener(norma.url, cliente=cliente)
    except FuenteNoDisponible as e:
        return None, str(e)
    if r.status_code != 200:
        return (False, f"HTTP {r.status_code} en {norma.url}") if r.status_code == 404 else (None, f"HTTP {r.status_code}")
    texto = r.text
    if re.search(rf"\b{int(norma.numero)}\b", texto) and str(norma.anio) in texto:
        return True, "La página oficial responde y contiene número y año"
    return False, "La página oficial responde pero no contiene el número y el año citados; revisar manualmente"
