"""Metadatos de sentencias de la Corte Constitucional vía datos.gov.co (Socrata).

Dataset: https://www.datos.gov.co/resource/v2k4-2t8s.json
Devuelve SOLO metadatos. Los nombres de columna no están garantizados por este
módulo: se resuelven por alias y `esquema()` muestra los reales de la fuente.
"""
from __future__ import annotations

import os
from dataclasses import dataclass, field
from typing import Dict, List, Optional

from .citas import urls_candidatas
from .http import obtener

BASE_URL = "https://www.datos.gov.co/resource/v2k4-2t8s.json"

ALIAS = {
    "sentencia": ("sentencia", "providencia", "numero_sentencia", "n_mero_de_sentencia"),
    "proceso": ("proceso", "tipo_proceso", "tipo_de_proceso"),
    "expediente": ("expediente", "expediente_numero", "numero_expediente", "n_mero_de_expediente"),
    "magistrado": ("magistrado_a", "magistrado", "magistrado_ponente", "magistrado_a_ponente"),
    "sala": ("sala", "sala_decision"),
    "fecha": ("fecha_sentencia", "fecha", "fecha_providencia"),
}


@dataclass
class SentenciaCC:
    sentencia: str = ""
    proceso: str = ""
    expediente: str = ""
    magistrado: str = ""
    sala: str = ""
    fecha: str = ""
    fuente_url: str = ""
    raw: Dict = field(default_factory=dict, repr=False)


def _primero(d: dict, claves) -> str:
    for k in claves:
        if d.get(k) not in (None, ""):
            return str(d[k])
    return ""


def _cabeceras() -> dict:
    token = os.environ.get("SOCRATA_APP_TOKEN")  # opcional: eleva el límite de uso
    return {"X-App-Token": token} if token else {}


def a_sentencia(d: dict) -> SentenciaCC:
    s = SentenciaCC(raw=d, **{k: _primero(d, a) for k, a in ALIAS.items()})
    urls = urls_candidatas(s.sentencia)
    s.fuente_url = urls[0] if urls else ""
    return s


def esquema(cliente=None) -> List[str]:
    """Nombres reales de columna según la fuente (consulta de 1 fila)."""
    r = obtener(BASE_URL, params={"$limit": 1}, headers=_cabeceras(), cliente=cliente)
    r.raise_for_status()
    datos = r.json()
    return sorted(datos[0].keys()) if datos else []


def buscar_cc(consulta: str = "", limite: int = 50, cliente=None) -> List[SentenciaCC]:
    """Búsqueda de texto libre ($q de SoQL) con parámetros URL-encoded por httpx."""
    params: Dict[str, object] = {"$limit": max(1, min(int(limite), 1000))}
    if consulta.strip():
        params["$q"] = consulta.strip()
    r = obtener(BASE_URL, params=params, headers=_cabeceras(), cliente=cliente)
    r.raise_for_status()
    return [a_sentencia(d) for d in r.json()]


def verificar_existencia(cita: str, cliente=None) -> Optional[SentenciaCC]:
    """Comprueba que la cita exista en el dataset; None si no aparece."""
    from .citas import parsear_cita

    c = parsear_cita(cita)
    if not c:
        return None
    for s in buscar_cc(c.canonica, limite=20, cliente=cliente):
        p = parsear_cita(s.sentencia)
        if p and p.canonica == c.canonica:
            return s
    return None
