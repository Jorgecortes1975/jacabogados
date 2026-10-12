"""Extracción de citas, fechas y radicados de un escrito, con su ubicación."""
from __future__ import annotations

import re
import unicodedata
from dataclasses import dataclass
from datetime import date
from typing import List, Optional

from jurisprudencia_col.citas import parsear_cita

MESES = {m: i for i, m in enumerate(
    ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto",
     "septiembre", "octubre", "noviembre", "diciembre"], 1)}
MESES["setiembre"] = 9

# Corte Constitucional: tipo en mayúscula y separador obligatorio, para no confundir
# con palabras comunes (a, c, t) ni con COVID-19.
RE_CC = re.compile(
    r"(?<![A-Za-z0-9])(?P<tipo>SU|T|C|A)\s?[-.]\s?(?P<num>\d{1,4})\s?"
    r"(?:[/-](?P<a2>\d{4}|\d{2})|\s+de\s+(?P<a4>\d{4}))(?!\d)")
RE_CS = re.compile(r"(?<![A-Za-z0-9])(?P<tipo>SL|SC|SP|STL|STC|STP)(?P<num>\d{1,5})-(?P<anio>\d{4})(?!\d)")
RE_NORMA = re.compile(
    r"\b(?P<tipo>Ley|Decreto(?:[ -]Ley)?|Decreto Legislativo|Resoluci[oó]n|Acuerdo|Acto Legislativo|Circular)"
    r"\s+(?:No\.?|N[úu]mero|N[úu]m\.)?\s*(?P<num>\d{1,4}(?:\.\d{3})?)\s+(?:de|del)\s+"
    r"(?:(?P<dia>\d{1,2})\s+de\s+(?P<mes>[A-Za-zñáéíóú]+)\s+de\s+)?(?P<anio>\d{4})\b", re.IGNORECASE)
RE_FECHA = re.compile(r"\b(?P<d>\d{1,2})\s+de\s+(?P<m>[A-Za-zñáéíóú]+)\s+(?:de|del)\s+(?P<y>\d{4})\b", re.IGNORECASE)
RE_ISO = re.compile(r"\b(?P<y>\d{4})-(?P<m>\d{2})-(?P<d>\d{2})\b")
RE_RADICADO = re.compile(r"(?<!\d)\d{5}-?\d{2}-?\d{2}-?\d{3}-?\d{4}-?\d{5}-?\d{2}(?!\d)")
RE_PONENTE = re.compile(
    r"(?:M\.?\s?P\.?|magistrad[oa]\s+ponente)\s*[:\-]?\s*(?:Dr\.?|Dra\.?|doctora?)?\s*"
    r"((?:[A-ZÁÉÍÓÚÑ][\wáéíóúñ]+\s?){2,5})")
RE_PLACEHOLDER = re.compile(
    r"(_{3,}|\bX{3,}\b|lorem ipsum|\[\s*(?:\.\.\.|…|X+|completar|nombre|fecha|inserte|pendiente)[^\]\n]*\]"
    r"|\binserte\b|\bCOMPLETAR\b)", re.IGNORECASE)
RE_PENDIENTE = re.compile(r"PENDIENTE DE VERIFICACI[ÓO]N", re.IGNORECASE)


@dataclass
class Cita:
    clase: str            # cc | cs | norma
    texto: str            # tal como aparece en el escrito
    clave: str            # forma normalizada (agrupa apariciones repetidas)
    linea: int
    columna: int
    parrafo: int
    contexto: str = ""    # texto inmediato posterior (para ponente)
    problema: str = ""    # formato imposible detectado al extraer
    fecha: str = ""       # fecha completa citada (AAAA-MM-DD), si el escrito la incluye


@dataclass
class Fecha:
    texto: str
    valor: Optional[date]
    linea: int


def sin_acentos(s: str) -> str:
    return "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn")


def ubicacion(texto: str, pos: int):
    linea = texto.count("\n", 0, pos) + 1
    col = pos - (texto.rfind("\n", 0, pos) + 1) + 1
    parrafo = len(re.findall(r"\n\s*\n", texto[:pos])) + 1
    return linea, col, parrafo


def extraer_citas(texto: str, hoy: Optional[date] = None) -> List[Cita]:
    hoy = hoy or date.today()
    citas: List[Cita] = []
    for m in RE_CC.finditer(texto):
        anio = m.group("a2") or m.group("a4")
        c = parsear_cita(f"{m.group('tipo')}-{m.group('num')}/{anio}")
        linea, col, par = ubicacion(texto, m.start())
        citas.append(Cita(
            "cc", m.group(0), c.canonica if c else m.group(0).upper(), linea, col, par,
            texto[m.end():m.end() + 200],
            "" if c else "Año fuera de rango (la Corte Constitucional inició en 1991) o formato irreconocible"))
    for m in RE_CS.finditer(texto):
        linea, col, par = ubicacion(texto, m.start())
        citas.append(Cita("cs", m.group(0), f"{m.group('tipo')}{int(m.group('num'))}-{m.group('anio')}", linea, col, par))
    for m in RE_NORMA.finditer(texto):
        tipo = re.sub(r"[ -]+", " ", sin_acentos(m.group("tipo")).lower())
        num = m.group("num").replace(".", "")
        anio = int(m.group("anio"))
        linea, col, par = ubicacion(texto, m.start())
        prob = "" if 1886 <= anio <= hoy.year else f"Año {anio} imposible para una norma colombiana vigente"
        fecha = ""
        if m.group("dia"):
            mes = MESES.get(sin_acentos(m.group("mes")).lower())
            try:
                fecha = date(anio, mes, int(m.group("dia"))).isoformat() if mes else ""
            except ValueError:
                fecha = ""
        citas.append(Cita("norma", m.group(0), f"{tipo} {int(num)} de {anio}", linea, col, par, problema=prob, fecha=fecha))
    return sorted(citas, key=lambda c: (c.linea, c.columna))


def extraer_fechas(texto: str) -> List[Fecha]:
    out: List[Fecha] = []
    for m in RE_FECHA.finditer(texto):
        mes = MESES.get(sin_acentos(m.group("m")).lower())
        valor = None
        if mes:
            try:
                valor = date(int(m.group("y")), mes, int(m.group("d")))
            except ValueError:
                valor = None
            out.append(Fecha(m.group(0), valor, ubicacion(texto, m.start())[0]))
    for m in RE_ISO.finditer(texto):
        try:
            valor = date(int(m.group("y")), int(m.group("m")), int(m.group("d")))
        except ValueError:
            valor = None
        out.append(Fecha(m.group(0), valor, ubicacion(texto, m.start())[0]))
    return out


def extraer_radicados(texto: str) -> List[str]:
    return sorted({re.sub(r"\D", "", m.group(0)) for m in RE_RADICADO.finditer(texto)})


def ponente_en_contexto(contexto: str) -> str:
    m = RE_PONENTE.search(contexto[:200])
    return m.group(1).strip() if m else ""
