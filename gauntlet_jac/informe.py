"""Orquestación del control, informe legible y comparación entre rondas."""
from __future__ import annotations

import hashlib
import json
from datetime import date, datetime, timezone
from typing import List, Optional

from . import controles as C
from .extractor import extraer_citas, extraer_fechas
from .verificador import Verificador

LIMITES = ("Este control cubre solo verificaciones mecánicas (existencia de citas de la Corte Constitucional y de normas del catálogo, "
           "fechas, relleno pendiente y radicados). NO determina la vigencia de normas ni el texto de sus artículos, y no verifica hechos, pruebas, términos, "
           "cálculos ni estrategia. Requiere revisión adversarial y revisión final del abogado responsable.")


def ejecutar(texto: str, fecha_ref: Optional[date] = None, radicado: Optional[str] = None,
             cliente=None, sin_red: bool = False, previo: Optional[dict] = None,
             en_vivo: bool = False, catalogo_normas: Optional[dict] = None, ruta_confirmaciones: Optional[str] = None) -> dict:
    fecha_ref = fecha_ref or date.today()
    v = Verificador(cliente=cliente, sin_red=sin_red, fecha_ref=fecha_ref, en_vivo=en_vivo,
                    catalogo_normas=catalogo_normas, ruta_confirmaciones=ruta_confirmaciones)
    citas = []
    for c in extraer_citas(texto, fecha_ref):
        r = v.cc(c) if c.clase == "cc" else v.otra(c)
        citas.append({"clase": c.clase, "texto": c.texto, "clave": c.clave, "linea": c.linea,
                      "columna": c.columna, "parrafo": c.parrafo, **r})
    hallazgos: List[C.Hallazgo] = (
        C.hallazgos_de_citas(citas) + C.hallazgos_de_vigencia(citas) + C.controlar_placeholders(texto)
        + C.controlar_fechas(extraer_fechas(texto), fecha_ref) + C.controlar_radicados(texto, radicado))
    if not citas:
        hallazgos.append(C.Hallazgo("SIN_CITAS", C.ADVERTENCIA, "No se detectaron citas normativas ni jurisprudenciales para validar"))
    informe = {
        "version": 1,
        "generado": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "sha256_documento": hashlib.sha256(texto.encode("utf-8")).hexdigest(),
        "fecha_referencia": fecha_ref.isoformat(),
        "estado": C.decidir(hallazgos),
        "resumen": C.resumen_citas(citas),
        "citas": citas,
        "hallazgos": [h.a_dict() for h in hallazgos],
        "fuentes_consultadas": v.fuentes,
        "ejecuciones_de_control": (previo.get("ejecuciones_de_control", 0) if previo else 0) + 1,
        "limites": LIMITES,
    }
    if previo:
        antes = {f"{h['codigo']}|{h['ubicacion']}|{h['mensaje']}" for h in previo.get("hallazgos", [])}
        ahora = {h.clave for h in hallazgos}
        informe["comparacion"] = {"resueltos": sorted(antes - ahora), "nuevos": sorted(ahora - antes),
                                  "persistentes": sorted(antes & ahora),
                                  "documento_cambio": previo.get("sha256_documento") != informe["sha256_documento"]}
    return informe


def a_texto(i: dict) -> str:
    r = i["resumen"]
    L = [f"CONTROL AUTOMÁTICO JAC GAUNTLET | ESTADO: {i['estado']}",
         f"Fecha de referencia: {i['fecha_referencia']} | Documento sha256: {i['sha256_documento'][:16]} | Ejecución de control nº {i['ejecuciones_de_control']}",
         "", "1. RESUMEN DE CITAS",
         f"Total {r['total']} | verificadas {r['verificada']} | no encontradas {r['no_encontrada']} | "
         f"datos discrepantes {r['datos_discrepantes']} | pendientes {r['pendiente']}", ""]
    L.append("2. HALLAZGOS")
    orden = {C.CRITICO: 0, C.PENDIENTE: 1, C.ADVERTENCIA: 2}
    hs = sorted(i["hallazgos"], key=lambda h: orden[h["gravedad"]])
    if not hs:
        L.append("Sin hallazgos en los controles automáticos.")
    for n, h in enumerate(hs, 1):
        L.append(f"{n}. [{h['gravedad'].upper()}] {h['codigo']} {('(' + h['ubicacion'] + ')') if h['ubicacion'] else ''}: {h['mensaje']}")
    L += ["", "3. DETALLE DE CITAS"]
    for n, c in enumerate(i["citas"], 1):
        L.append(f"{n}. {c['texto']} (línea {c['linea']}) -> {c['estado']}. {c['detalle']}" + (f" Fuente: {c['url']}" if c.get("url") else ""))
    L += ["", "4. FUENTES CONSULTADAS EN ESTA EJECUCIÓN"]
    if not i["fuentes_consultadas"]:
        L.append("Ninguna.")
    for f, d in i["fuentes_consultadas"].items():
        L.append(f"{f}: {d['estado']} {d['detalle']}".strip())
    if "comparacion" in i:
        k = i["comparacion"]
        L += ["", "5. COMPARACIÓN CON LA EJECUCIÓN ANTERIOR",
              f"Resueltos {len(k['resueltos'])} | nuevos {len(k['nuevos'])} | persistentes {len(k['persistentes'])}"]
    L += ["", "LÍMITES: " + i["limites"]]
    return "\n".join(L)
