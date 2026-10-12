"""Enrutamiento determinista de una consulta: qué herramienta la atiende.

No usa modelos: decide por la forma de la entrada. Lo que no es verificable
mecánicamente (análisis, estrategia, redacción) se declara y se delega al agente.
"""
from __future__ import annotations

import os
import re

from gauntlet_jac.extractor import extraer_citas

RE_BUSQUEDA = re.compile(r"\b(sentencias?|jurisprudencia|providencias?|precedente|corte constitucional|tutela)\b", re.IGNORECASE)


def enrutar(entrada: str) -> str:
    """Devuelve: inventario | validar_archivo | verificar_citas | buscar_jurisprudencia | analisis."""
    if os.path.isdir(entrada):
        return "inventario"
    if os.path.isfile(entrada):
        return "validar_archivo"
    if extraer_citas(entrada):
        return "verificar_citas"
    if RE_BUSQUEDA.search(entrada):
        return "buscar_jurisprudencia"
    return "analisis"
