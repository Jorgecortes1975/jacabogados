"""Controles mecánicos del escrito y decisión de liberación.

Gravedad: critico -> BLOCKED; pendiente -> CONDITIONAL; advertencia -> solo informa.
PASS_AUTOMATICO significa "ningún control automático encontró fallos"; NO equivale a PASS
del protocolo, que además exige revisión adversarial y del abogado.
"""
from __future__ import annotations

import re
from dataclasses import dataclass, asdict
from datetime import date
from typing import Dict, List, Optional

from .extractor import (RE_PENDIENTE, RE_PLACEHOLDER, Fecha, extraer_radicados, ubicacion)

CRITICO, PENDIENTE, ADVERTENCIA = "critico", "pendiente", "advertencia"


@dataclass
class Hallazgo:
    codigo: str
    gravedad: str
    mensaje: str
    ubicacion: str = ""

    @property
    def clave(self) -> str:
        return f"{self.codigo}|{self.ubicacion}|{self.mensaje}"

    def a_dict(self) -> dict:
        return asdict(self)


def controlar_placeholders(texto: str) -> List[Hallazgo]:
    out = []
    for m in RE_PENDIENTE.finditer(texto):
        l, _, _ = ubicacion(texto, m.start())
        out.append(Hallazgo("DATO_PENDIENTE", PENDIENTE, "Dato marcado PENDIENTE DE VERIFICACIÓN: no apto para firma ni radicación", f"línea {l}"))
    for m in RE_PLACEHOLDER.finditer(texto):
        l, _, _ = ubicacion(texto, m.start())
        out.append(Hallazgo("PLACEHOLDER", PENDIENTE, f"Texto de relleno sin completar: '{m.group(0)[:40]}'", f"línea {l}"))
    return out


def controlar_fechas(fechas: List[Fecha], fecha_ref: date) -> List[Hallazgo]:
    out = []
    for f in fechas:
        if f.valor is None:
            out.append(Hallazgo("FECHA_IMPOSIBLE", CRITICO, f"Fecha inexistente en el calendario: '{f.texto}'", f"línea {f.linea}"))
        elif f.valor > fecha_ref:
            out.append(Hallazgo("FECHA_POSTERIOR", ADVERTENCIA,
                                f"Fecha posterior a la fecha de referencia {fecha_ref.isoformat()}: '{f.texto}' (válida solo si es un plazo o una actuación futura)",
                                f"línea {f.linea}"))
    return out


def controlar_radicados(texto: str, esperado: Optional[str]) -> List[Hallazgo]:
    encontrados = extraer_radicados(texto)
    out = []
    if esperado:
        esp = re.sub(r"\D", "", esperado)
        if esp not in encontrados:
            out.append(Hallazgo("RADICADO_AUSENTE", PENDIENTE, f"El radicado esperado {esp} no figura en el escrito"))
        for r in encontrados:
            if r != esp:
                out.append(Hallazgo("RADICADO_AJENO", PENDIENTE,
                                    f"Radicado {r} distinto del asunto fijado: posible contaminación entre expedientes (o proceso conexo legítimo)"))
    elif len(encontrados) > 1:
        out.append(Hallazgo("RADICADOS_MULTIPLES", PENDIENTE,
                            "Se detectan varios radicados (" + ", ".join(encontrados) + "): confirmar que pertenecen al mismo asunto"))
    return out


def hallazgos_de_citas(citas: List[dict]) -> List[Hallazgo]:
    out = []
    for c in citas:
        ub = f"línea {c['linea']}, párrafo {c['parrafo']}"
        e = c["estado"]
        if e == "no_encontrada":
            out.append(Hallazgo("CITA_NO_ENCONTRADA", CRITICO, f"{c['texto']}: {c['detalle']}", ub))
        elif e == "datos_discrepantes":
            out.append(Hallazgo("CITA_DISCREPANTE", CRITICO, f"{c['texto']}: {c['detalle']}", ub))
        elif e == "pendiente":
            out.append(Hallazgo("CITA_PENDIENTE", PENDIENTE, f"{c['texto']}: {c['detalle']}", ub))
    return out


def hallazgos_de_vigencia(citas: List[dict]) -> List[Hallazgo]:
    """Una vez por norma distinta: existir no es estar vigente."""
    out, vistas = [], set()
    for c in citas:
        v = c.get("vigencia")
        if c["clase"] != "norma" or not v or c["clave"] in vistas or v["estado"] == "confirmada_manual":
            continue
        vistas.add(c["clave"])
        cod = "NORMA_DEROGACION_REGISTRADA" if v["estado"] == "derogacion_registrada" else "VIGENCIA_NO_DETERMINADA"
        out.append(Hallazgo(cod, PENDIENTE, f"{c['texto']}: {v['detalle']}", f"línea {c['linea']}, párrafo {c['parrafo']}"))
    return out


def decidir(hallazgos: List[Hallazgo]) -> str:
    if any(h.gravedad == CRITICO for h in hallazgos):
        return "BLOCKED"
    if any(h.gravedad == PENDIENTE for h in hallazgos):
        return "CONDITIONAL"
    return "PASS_AUTOMATICO"


def resumen_citas(citas: List[dict]) -> Dict[str, int]:
    r = {"total": len(citas), "verificada": 0, "no_encontrada": 0, "datos_discrepantes": 0, "pendiente": 0}
    for c in citas:
        r[c["estado"]] += 1
    return r
