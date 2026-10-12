"""Catálogo de normas: semilla verificada + catálogo propio del despacho."""
from __future__ import annotations

import json
import os
import re
from dataclasses import dataclass, field
from datetime import date
from typing import Dict, List, Optional

DIR_DATOS = os.path.join(os.path.dirname(__file__), "datos")
SEMILLA = os.path.join(DIR_DATOS, "catalogo_funcion_publica.json")
ARCHIVO_USUARIO = os.environ.get("JAC_NORMAS_CATALOGO", "normas_usuario.json")
PATRON_DEROGA = re.compile(r"\bderog", re.IGNORECASE)


@dataclass
class Norma:
    id: str
    tipo: str
    numero: str
    anio: int
    titulo: str
    expedida: Optional[str] = None
    vigencia_desde: Optional[str] = None
    publicada_en: Optional[str] = None
    modificaciones: List[str] = field(default_factory=list)
    url: str = ""
    origen: str = "semilla"

    @property
    def clave(self) -> str:
        return clave(self.tipo, self.numero, self.anio)

    @property
    def derogaciones(self) -> List[str]:
        return [m for m in self.modificaciones if PATRON_DEROGA.search(m)]


def clave(tipo: str, numero, anio: int) -> str:
    return f"{tipo.lower()} {int(str(numero).replace('.', ''))} de {int(anio)}"


def _leer(ruta: str, origen: str) -> List[Norma]:
    if not os.path.isfile(ruta):
        return []
    with open(ruta, encoding="utf-8") as f:
        datos = json.load(f)
    return [Norma(origen=origen, **n) for n in datos.get("normas", [])]


def cargar(ruta_usuario: Optional[str] = None) -> Dict[str, Norma]:
    """La semilla se carga primero; el catálogo del despacho prevalece si repite una clave."""
    catalogo: Dict[str, Norma] = {}
    for n in _leer(SEMILLA, "semilla") + _leer(ruta_usuario or ARCHIVO_USUARIO, "despacho"):
        catalogo[n.clave] = n
    return catalogo


def buscar(cat: Dict[str, Norma], tipo: str, numero, anio: int) -> Optional[Norma]:
    return cat.get(clave(tipo, numero, anio))


def mismo_numero_otro_anio(cat: Dict[str, Norma], tipo: str, numero, anio: int) -> List[Norma]:
    """La numeración se reinicia cada año: coincidencia de número con otro año es solo una alerta."""
    n = int(str(numero).replace(".", ""))
    return [x for x in cat.values() if x.tipo == tipo.lower() and int(x.numero) == n and x.anio != int(anio)]


def agregar_usuario(norma: Norma, ruta: Optional[str] = None) -> str:
    ruta = ruta or ARCHIVO_USUARIO
    doc = {"normas": []}
    if os.path.isfile(ruta):
        with open(ruta, encoding="utf-8") as f:
            doc = json.load(f)
    doc["normas"] = [n for n in doc["normas"] if clave(n["tipo"], n["numero"], n["anio"]) != norma.clave]
    d = {k: v for k, v in norma.__dict__.items() if k != "origen"}
    doc["normas"].append(d)
    with open(ruta, "w", encoding="utf-8") as f:
        json.dump(doc, f, ensure_ascii=False, indent=1)
    return ruta
