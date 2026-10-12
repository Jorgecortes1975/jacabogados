"""Confirmaciones manuales de vigencia hechas por el abogado, con fecha y caducidad.

La vigencia cambia con el tiempo y no es verificable automáticamente: se registra quién
la confirmó, cuándo y en qué fuente. Caduca para obligar a reverificar.
"""
from __future__ import annotations

import json
import os
from datetime import date, timedelta
from typing import Optional

ARCHIVO = os.environ.get("JAC_NORMAS_CONFIRMACIONES", "normas_confirmadas.json")
DIAS_VALIDEZ = 30


def _leer(ruta: str) -> dict:
    if os.path.isfile(ruta):
        with open(ruta, encoding="utf-8") as f:
            return json.load(f)
    return {}


def registrar(clave: str, por: str, fecha: date, fuente: str, nota: str = "", ruta: Optional[str] = None) -> str:
    ruta = ruta or ARCHIVO
    datos = _leer(ruta)
    datos[clave] = {"por": por, "fecha": fecha.isoformat(), "fuente": fuente, "nota": nota}
    with open(ruta, "w", encoding="utf-8") as f:
        json.dump(datos, f, ensure_ascii=False, indent=1)
    return ruta


def vigente(clave: str, fecha_ref: date, ruta: Optional[str] = None, dias: int = DIAS_VALIDEZ) -> Optional[dict]:
    """Devuelve la confirmación si es reciente respecto de la fecha de referencia; si no, None."""
    c = _leer(ruta or ARCHIVO).get(clave)
    if not c:
        return None
    f = date.fromisoformat(c["fecha"])
    return c if timedelta(0) <= fecha_ref - f <= timedelta(days=dias) else None
