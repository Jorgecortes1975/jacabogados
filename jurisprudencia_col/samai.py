"""SAMAI (Consejo de Estado): consulta de procesos por radicado, no buscador temático."""
from __future__ import annotations

from .http import FuenteNoDisponible, obtener

SAMAI_BASE = "https://samai.consejodeestado.gov.co"


def verificar_samai(cliente=None) -> dict:
    try:
        r = obtener(SAMAI_BASE, cliente=cliente)
    except FuenteNoDisponible as e:
        return {"accesible": False, "error": str(e)}
    return {"accesible": r.status_code == 200, "status": r.status_code, "bytes": len(r.text)}
