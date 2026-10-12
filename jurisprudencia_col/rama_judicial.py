"""Sistema unificado de relatoría de la Rama Judicial (JSF/PrimeFaces).

Solo diagnóstico: la búsqueda requiere ViewState de sesión y el HTML real del
formulario, que no se ha inspeccionado; no se automatiza para no inventar el POST.
"""
from __future__ import annotations

import re

from .http import FuenteNoDisponible, obtener

BASE = "https://jurisprudencia.ramajudicial.gov.co/WebRelatoria/consulta"


def verificar_disponibilidad(cliente=None) -> dict:
    try:
        r = obtener(f"{BASE}/index.xhtml", cliente=cliente)
    except FuenteNoDisponible as e:
        return {"accesible": False, "error": str(e)}
    html = r.text
    return {
        "accesible": r.status_code == 200,
        "status": r.status_code,
        "bytes": len(html),
        "tiene_viewstate": "javax.faces.ViewState" in html,
        "ids_formulario": sorted(set(re.findall(r'<form[^>]+id="([^"]+)"', html))),
    }
