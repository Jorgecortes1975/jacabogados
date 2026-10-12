"""Registro de sentencias de las que se leyó el texto o la relatoría.

Estar en el registro NO prueba vigencia de la regla ni que sea precedente
obligatorio. Las sentencias con estado VERIFICADA_EN_TEXTO_APORTADO se
contrastaron solo contra un texto aportado por el usuario; falta confirmarlas
en la relatoría oficial.
"""
from __future__ import annotations

import json
import os
import re
from typing import Dict, List, Optional

RUTA = os.path.join(os.path.dirname(os.path.abspath(__file__)), "datos", "registro_sentencias.json")


def _norm(clave: str) -> str:
    return re.sub(r"[\s_]+", "", clave.upper().replace("DE", "-").replace("/", "-")).replace("--", "-")


def cargar(ruta: str = RUTA) -> List[Dict]:
    with open(ruta, encoding="utf-8") as f:
        return json.load(f)["sentencias"]


def buscar(clave: str, ruta: str = RUTA) -> Optional[Dict]:
    """Devuelve la ficha cuya clave coincide con la cita, o None (None no prueba inexistencia)."""
    k = re.sub(r"[^A-Z0-9]", "", clave.upper())
    for s in cargar(ruta):
        for c in s["claves"]:
            if re.sub(r"[^A-Z0-9]", "", c.upper()) == k:
                return s
    return None
