"""Interpretación de citas de la Corte Constitucional y construcción de URL.

Patrón oficial verificado (relatoría de la Corte Constitucional, 2026-10-12):
  T-008/20 -> https://www.corteconstitucional.gov.co/relatoria/2020/T-008-20.htm
  C-080/18 -> https://www.corteconstitucional.gov.co/relatoria/2018/C-080-18.htm
  T-012/92 -> https://www.corteconstitucional.gov.co/relatoria/1992/T-012-92.htm
Tipo en mayúscula, número a 3 dígitos, año de 2 dígitos. Para autos y variantes
no verificadas se generan candidatos alternos que el llamador prueba en orden.
"""
from __future__ import annotations

import re
from dataclasses import dataclass
from datetime import date
from typing import List, Optional

BASE_RELATORIA = "https://www.corteconstitucional.gov.co/relatoria"

_PATRON = re.compile(
    r"^\s*(SU|T|C|A)\s*[.\-]?\s*(\d{1,4})\s*([A-Z])?\s*(?:/|-|\s+DE\s+|\s+)\s*(\d{4}|\d{2})\s*$",
    re.IGNORECASE,
)
TIPOS = {"T": "Tutela", "C": "Constitucionalidad", "SU": "Unificación", "A": "Auto"}


@dataclass(frozen=True)
class Cita:
    tipo: str
    numero: int
    sufijo: str
    anio: int

    @property
    def canonica(self) -> str:
        return f"{self.tipo}-{self.numero:03d}{self.sufijo}/{self.anio % 100:02d}"


def parsear_cita(texto: str) -> Optional[Cita]:
    """Devuelve la Cita o None si el texto no tiene formato reconocible."""
    m = _PATRON.match(texto or "")
    if not m:
        return None
    tipo, num, sufijo, anio = m.groups()
    anio_n = int(anio)
    if len(anio) == 2:
        # La Corte inicia en 1991/1992: 91-99 es siglo XX, el resto siglo XXI.
        anio_n += 1900 if anio_n >= 91 else 2000
    if not 1991 <= anio_n <= date.today().year + 1:
        return None
    return Cita(tipo.upper(), int(num), (sufijo or "").upper(), anio_n)


def urls_candidatas(texto: str) -> List[str]:
    """URL de relatoría por orden de probabilidad (la primera es la verificada)."""
    c = parsear_cita(texto)
    if not c:
        return []
    yy = f"{c.anio % 100:02d}"
    formas = [
        f"{c.tipo}-{c.numero:03d}{c.sufijo}-{yy}",
        f"{c.tipo.lower()}-{c.numero:03d}{c.sufijo.lower()}-{yy}",
        f"{c.tipo}-{c.numero}{c.sufijo}-{yy}",
    ]
    vistas, urls = set(), []
    for f in formas:
        if f not in vistas:
            vistas.add(f)
            urls.append(f"{BASE_RELATORIA}/{c.anio}/{f}.htm")
    return urls
