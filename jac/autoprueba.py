"""Prueba de aceptación reproducible de JAC Legal OS.

Qué prueba: que cada control detecta lo que debe, que no marca como error lo correcto y que el
ciclo Gauntlet (ronda 1 BLOCKED, corrección, ronda 2 sin hallazgos) funciona de principio a fin.
Qué NO prueba: la calidad del análisis jurídico ni el comportamiento de las fuentes reales
(salvo con --red). Las fuentes de la parte determinista están SIMULADAS; los errores sembrados
son sintéticos y pocos: es una prueba de regresión y de aceptación, no una garantía estadística.
"""
from __future__ import annotations

import contextlib
import hashlib
import io
import json
import os
import tempfile
import zipfile
from datetime import date
from pathlib import Path
from typing import Callable, List

from gauntlet_jac import cli as gcli, informe, inventario
from jurisprudencia_col.simulado import ClienteSimulado, Resp
from normas_col import catalogo as cat_mod, confirmaciones
from .enrutador import enrutar

DATOS = Path(__file__).resolve().parent / "datos"
FECHA = date(2026, 10, 12)
RADICADO = "11001-31-05-001-2026-00123-00"
SOCRATA = [
    {"sentencia": "T-008/20", "magistrado_a": "DIANA CONSTANZA FAJARDO RIVERA", "fecha_sentencia": "2020-01-20T00:00:00"},
    {"sentencia": "C-080/18", "magistrado_a": "ANTONIO JOSE LIZARAZO OCAMPO", "fecha_sentencia": "2018-08-15T00:00:00"},
]
EXISTEN = {"/relatoria/2020/T-008-20.htm", "/relatoria/2018/C-080-18.htm"}


def fuentes_simuladas() -> ClienteSimulado:
    def h(req):
        if "datos.gov.co" in str(req.url):
            return Resp(200, json=SOCRATA)
        return Resp(200 if req.url.path in EXISTEN else 404)
    return ClienteSimulado(h)


def _hay(inf: dict, codigo: str, contiene: str = "") -> bool:
    return any(h["codigo"] == codigo and contiene in h["mensaje"] for h in inf["hallazgos"])


def _estado(inf: dict, clave: str) -> str:
    return next(c["estado"] for c in inf["citas"] if c["clave"] == clave)


# Errores sembrados en ejemplo_ronda1.txt: (descripción, función que verifica que se detectó)
SEMBRADOS: List[tuple] = [
    ("Texto de relleno sin completar [NOMBRE DEL ACCIONANTE]", lambda i: _hay(i, "PLACEHOLDER")),
    ("Fecha inexistente: 31 de febrero de 2026", lambda i: _hay(i, "FECHA_IMPOSIBLE", "31 de febrero")),
    ("Dato marcado PENDIENTE DE VERIFICACIÓN", lambda i: _hay(i, "DATO_PENDIENTE")),
    ("Radicado ajeno al asunto fijado (Matter Lock)", lambda i: _hay(i, "RADICADO_AJENO", "05001310300220190045600")),
    ("Decreto 2591 con fecha equivocada (20 en vez de 19 de noviembre de 1991)", lambda i: _hay(i, "CITA_DISCREPANTE", "Decreto 2591")),
    ("Sentencia T-008/20 con magistrado ponente equivocado", lambda i: _hay(i, "CITA_DISCREPANTE", "T-008")),
    ("Sentencia imposible T-999 de 1985 (la Corte inició en 1991)", lambda i: _hay(i, "CITA_NO_ENCONTRADA", "T-999")),
    ("Sentencia inexistente T-777/20 (las fuentes responden y no la conocen)", lambda i: _hay(i, "CITA_NO_ENCONTRADA", "T-777")),
]
# Citas correctas que NO deben generar hallazgos críticos (control de falsos positivos).
CORRECTAS = [("C-080/18", "verificada"), ("ley 1437 de 2011", "verificada")]


class Registro:
    def __init__(self):
        self.filas: List[dict] = []

    def check(self, nombre: str, condicion: bool, detalle: str = ""):
        self.filas.append({"prueba": nombre, "ok": bool(condicion), "detalle": detalle})


def ejecutar(red: bool = False) -> dict:
    r = Registro()
    ronda1 = (DATOS / "ejemplo_ronda1.txt").read_text(encoding="utf-8")
    ronda2 = (DATOS / "ejemplo_ronda2.txt").read_text(encoding="utf-8")
    with tempfile.TemporaryDirectory() as tmp:
        tmp = Path(tmp)
        conf, usuario = str(tmp / "conf.json"), str(tmp / "usuario.json")
        i1 = informe.ejecutar(ronda1, FECHA, RADICADO, cliente=fuentes_simuladas(), ruta_confirmaciones=conf)

        # 1. Detección de errores sembrados
        detectados = 0
        for desc, f in SEMBRADOS:
            ok = f(i1)
            detectados += ok
            r.check("Detecta: " + desc, ok)
        # 2. Sin falsos positivos sobre citas correctas
        for clave, esperado in CORRECTAS:
            r.check(f"No marca como error la cita correcta {clave}", _estado(i1, clave) == esperado)
        r.check("COVID-19 y 'hasta el 5 de mayo de 2020' no se toman por citas", not any("COVID" in c["texto"] for c in i1["citas"]))
        r.check("Norma fuera del catálogo (Ley 57 de 1887) queda pendiente, no inexistente", _estado(i1, "ley 57 de 1887") == "pendiente")
        r.check("Existencia no es vigencia: toda norma deja VIGENCIA_NO_DETERMINADA", _hay(i1, "VIGENCIA_NO_DETERMINADA", "Ley 1437"))
        r.check("Ronda 1 queda BLOCKED", i1["estado"] == "BLOCKED", i1["estado"])

        # 3. Ciclo Gauntlet: corrección, norma verificada por el abogado y revalidación
        cat_mod.agregar_usuario(cat_mod.Norma("manual", "ley", "57", 1887, "Ley 57 de 1887", expedida="1887-04-15"), usuario)
        for k in ("ley 57 de 1887", "ley 1437 de 2011", "decreto 2591 de 1991"):
            confirmaciones.registrar(k, "Abogado responsable (prueba)", date(2026, 10, 10), "SUIN-Juriscol (simulado)", ruta=conf)
        i2 = informe.ejecutar(ronda2, FECHA, RADICADO, cliente=fuentes_simuladas(), previo=i1,
                              catalogo_normas=cat_mod.cargar(usuario), ruta_confirmaciones=conf)
        k = i2["comparacion"]
        r.check("Ronda 2 (corregida y con vigencias confirmadas) llega a PASS_AUTOMATICO", i2["estado"] == "PASS_AUTOMATICO", i2["estado"])
        r.check("La comparación entre rondas muestra hallazgos resueltos y ninguno nuevo", len(k["resueltos"]) >= 8 and not k["nuevos"],
                f"resueltos {len(k['resueltos'])}, nuevos {len(k['nuevos'])}")
        r.check("El conteo de ejecuciones de control es 2", i2["ejecuciones_de_control"] == 2)

        # 4. Fuente caída: nunca se presume inexistencia
        def caida(req):
            return Resp(503)
        import time
        t0, time.sleep = time.sleep, (lambda s: None)
        try:
            i3 = informe.ejecutar("Sentencia T-008 de 2020.", FECHA, cliente=ClienteSimulado(caida))
        finally:
            time.sleep = t0
        r.check("Con las fuentes caídas la cita queda pendiente (no 'no encontrada')", _estado(i3, "T-008/20") == "pendiente")
        r.check("Con fuentes caídas el estado es CONDITIONAL, no BLOCKED", i3["estado"] == "CONDITIONAL")

        # 5. Archivos, inventario, enrutador y códigos de salida
        (tmp / "exp").mkdir()
        (tmp / "exp" / "escaneo_004.txt").write_text("contenido igual")
        (tmp / "exp" / "FINAL_v3.txt").write_text("contenido igual")
        (tmp / "exp" / "otro.pdf").write_bytes(b"%PDF")
        filas = inventario.inventariar(str(tmp / "exp"))
        r.check("Inventario: 3 archivos y 1 duplicado detectado por contenido", len(filas) == 3 and sum(1 for f in filas if f["duplicado_de"]) == 1)
        docx = tmp / "escrito.docx"
        with zipfile.ZipFile(docx, "w") as z:
            z.writestr("word/document.xml", "<w:document><w:p><w:r><w:t>Ver la T-999 de 1985.</w:t></w:r></w:p></w:document>")
        with contextlib.redirect_stdout(io.StringIO()):
            codigo_docx = gcli.main(["validar-escrito", str(docx), "--sin-red"])
        r.check("Lee .docx y devuelve BLOCKED (código de salida 2) con una cita imposible", codigo_docx == 2)
        r.check("Enrutador: carpeta, cita, búsqueda y análisis abierto",
                [enrutar(str(tmp / "exp")), enrutar("T-008/20"), enrutar("sentencias sobre tutela"), enrutar("¿cómo contesto una demanda?")]
                == ["inventario", "verificar_citas", "buscar_jurisprudencia", "analisis"])

    resultado = {
        "fecha": FECHA.isoformat(),
        "errores_sembrados": {"total": len(SEMBRADOS), "detectados": detectados},
        "pruebas": r.filas,
        "aprobadas": sum(1 for f in r.filas if f["ok"]),
        "total": len(r.filas),
        "sha256_ejemplo_ronda1": hashlib.sha256(ronda1.encode()).hexdigest()[:16],
        "alcance": ("Prueba determinista con fuentes simuladas sobre un escrito sintético. No evalúa la calidad del análisis jurídico "
                    "ni sustituye la revisión del abogado."),
    }
    if red:
        resultado["red"] = _prueba_red()
    resultado["veredicto"] = "APROBADA" if resultado["aprobadas"] == resultado["total"] else "FALLA"
    return resultado


def _prueba_red() -> List[dict]:
    """Citas reales (verificadas contra la relatoría) consultadas en las fuentes oficiales reales."""
    out = []
    for cita, esperado in (("T-008/20", "verificada"), ("C-080/18", "verificada"), ("T-012/92", "verificada"), ("Ley 1437 de 2011", "verificada")):
        inf = informe.ejecutar(cita, FECHA)
        estado = inf["citas"][0]["estado"]
        out.append({"cita": cita, "esperado": esperado, "obtenido": estado,
                    "resultado": "OK" if estado == esperado else ("NO CONCLUYENTE (fuente sin respuesta)" if estado == "pendiente" else "FALLA"),
                    "fuentes": inf["citas"][0].get("fuentes", [])})
    return out


def a_texto(res: dict) -> str:
    L = [f"PRUEBA DE ACEPTACIÓN JAC LEGAL OS | {res['veredicto']} | {res['aprobadas']} de {res['total']} comprobaciones",
         f"Errores sembrados detectados: {res['errores_sembrados']['detectados']} de {res['errores_sembrados']['total']}", ""]
    for f in res["pruebas"]:
        L.append(("[OK]    " if f["ok"] else "[FALLA] ") + f["prueba"] + (f"  ({f['detalle']})" if f["detalle"] else ""))
    if "red" in res:
        L += ["", "FUENTES OFICIALES REALES"]
        for x in res["red"]:
            L.append(f"[{x['resultado']}] {x['cita']}: esperado {x['esperado']}, obtenido {x['obtenido']} {x['fuentes']}")
    L += ["", "ALCANCE: " + res["alcance"]]
    return "\n".join(L)
