"""jac: un solo comando para toda consulta jurídica verificable.

  jac consulta "<texto, cita, archivo o carpeta>"   # enruta solo
  jac validar escrito.docx --radicado ...           # control Gauntlet de un escrito
  jac sentencia T-008/20  |  jac sentencia "tutela salud"
  jac norma "Ley 1437 de 2011"
  jac inventario ./expediente
  jac fuentes | doctor | protocolo | agente "<consulta abierta>"
"""
from __future__ import annotations

import argparse
import json
import os
import shutil
import subprocess
import sys
from pathlib import Path

from . import __version__
from .enrutador import enrutar

RAIZ = Path(__file__).resolve().parent.parent
HOSTS = {
    "Socrata (datos.gov.co)": "https://www.datos.gov.co/resource/v2k4-2t8s.json?$limit=1",
    "Relatoría Corte Constitucional": "https://www.corteconstitucional.gov.co/relatoria/2020/T-008-20.htm",
    "Rama Judicial (relatoría)": "https://jurisprudencia.ramajudicial.gov.co/WebRelatoria/consulta/index.xhtml",
    "SAMAI": "https://samai.consejodeestado.gov.co",
    "Gestor Normativo (Función Pública)": "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=41249",
}
SIN_ANALISIS = """La consulta no contiene citas verificables ni es una búsqueda de jurisprudencia: es un análisis abierto.
Este comando solo ejecuta controles deterministas; el análisis lo hace el agente (Claude) con estas herramientas.
  Dentro de Claude Code con el plugin jac-legal-os:   /jac-legal-os:jac-agente <su consulta>
  Desde la terminal (modo automático):                jac agente "<su consulta>"
Si ya tiene el texto del escrito o las citas, páselos a `jac consulta` o `jac validar` para verificarlos."""


def _informe(texto: str, args) -> int:
    from gauntlet_jac import informe
    inf = informe.ejecutar(texto, sin_red=args.sin_red, en_vivo=getattr(args, "en_vivo", False))
    print(json.dumps(inf, ensure_ascii=False, indent=1) if args.json else informe.a_texto(inf))
    return {"PASS_AUTOMATICO": 0, "CONDITIONAL": 1, "BLOCKED": 2}[inf["estado"]]


def cmd_consulta(args) -> int:
    ruta = enrutar(args.entrada)
    if ruta == "inventario":
        from gauntlet_jac import cli as g
        return g.main(["inventario", args.entrada])
    if ruta == "validar_archivo":
        from gauntlet_jac import cli as g
        return g.main(["validar-escrito", args.entrada] + (["--sin-red"] if args.sin_red else []))
    if ruta == "verificar_citas":
        return _informe(args.entrada, args)
    if ruta == "buscar_jurisprudencia":
        from jurisprudencia_col import cli as j
        return j.main(["buscar", args.entrada])
    print(SIN_ANALISIS)
    return 4


def cmd_sentencia(args) -> int:
    from jurisprudencia_col import cli as j
    from jurisprudencia_col.citas import parsear_cita
    if parsear_cita(args.texto):
        return _informe(args.texto, args)
    return j.main(["buscar", args.texto])


def cmd_norma(args) -> int:
    from normas_col import cli as n
    return n.main(["consultar", args.cita] + (["--en-vivo"] if args.en_vivo else []))


def cmd_validar(args) -> int:
    from gauntlet_jac import cli as g
    return g.main(["validar-escrito"] + args.resto)


def cmd_inventario(args) -> int:
    from gauntlet_jac import cli as g
    return g.main(["inventario", args.carpeta])


def cmd_fuentes(args) -> int:
    from jurisprudencia_col import cli as j
    return j.main(["verificar"])


PROTOCOLO = Path(__file__).resolve().parent / "datos" / "JAC-GAUNTLET-ELITE.md"


def cmd_protocolo(args) -> int:
    if not PROTOCOLO.is_file():
        print(f"No se encontró el protocolo en {PROTOCOLO}", file=sys.stderr)
        return 3
    print(PROTOCOLO.read_text(encoding="utf-8"))
    return 0


def cmd_prueba(args) -> int:
    from . import autoprueba
    res = autoprueba.ejecutar(red=args.red)
    print(autoprueba.a_texto(res))
    if args.json:
        Path(args.json).write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
    return 0 if res["veredicto"] == "APROBADA" else 1


def cmd_empaquetar(args) -> int:
    from . import empaquetar
    try:
        r = empaquetar.empaquetar(args.salida)
    except FileNotFoundError as e:
        print(e, file=sys.stderr)
        return 3
    print(f"Creado {r['archivo']}: plugin {r['plugin']} {r['version']}, {r['archivos']} archivos, {r['bytes']} bytes")
    return 0


def cmd_doctor(args) -> int:
    ok = True

    def linea(estado: bool, texto: str, critico: bool = True):
        nonlocal ok
        print(("OK   " if estado else ("FALLA" if critico else "AVISO")) + " | " + texto)
        ok &= estado or not critico

    linea(sys.version_info >= (3, 9), f"Python {sys.version.split()[0]} (se requiere 3.9 o superior)")
    for mod in ("jac", "jurisprudencia_col", "gauntlet_jac", "normas_col"):
        try:
            __import__(mod)
            linea(True, f"paquete {mod}")
        except Exception as e:  # noqa: BLE001
            linea(False, f"paquete {mod}: {e}")
    try:
        from normas_col import catalogo
        linea(len(catalogo.cargar()) >= 13, f"catálogo de normas: {len(catalogo.cargar())} normas")
    except Exception as e:  # noqa: BLE001
        linea(False, f"catálogo de normas: {e}")
    linea(PROTOCOLO.is_file(), "protocolo JAC-GAUNTLET-ELITE.md")
    linea(bool(shutil.which("claude")), "CLI de Claude Code (necesaria solo para `jac agente`)", critico=False)
    if args.red:
        from jurisprudencia_col.http import FuenteNoDisponible, nuevo_cliente, obtener
        for nombre, url in HOSTS.items():
            try:
                r = obtener(url, cliente=nuevo_cliente(timeout=8), reintentos=1)
                linea(r.status_code == 200, f"red: {nombre} responde HTTP {r.status_code}", critico=False)
            except FuenteNoDisponible as e:
                linea(False, f"red: {nombre} no responde ({str(e).split('->')[-1].strip()})", critico=False)
    else:
        print("INFO | use `jac doctor --red` para probar el acceso a las fuentes oficiales")
    return 0 if ok else 1


def cmd_agente(args) -> int:
    claude = shutil.which("claude")
    if not claude:
        print("No se encontró la CLI `claude`. Instale Claude Code o use /jac-legal-os:jac-agente dentro de una sesión.", file=sys.stderr)
        return 3
    prompt = ("Atiende esta consulta jurídica colombiana siguiendo el skill jac-agente del plugin jac-legal-os: "
              + args.consulta)
    cmd = [claude, "-p", prompt, "--plugin-dir", str(RAIZ), "--max-turns", str(args.max_turnos),
           "--allowedTools", "Bash(python3 -m jac:*)", "Read", "Glob", "Grep", "WebFetch", "WebSearch"]
    if args.modelo:
        cmd += ["--model", args.modelo]
    env = {**os.environ, "PYTHONPATH": str(RAIZ) + os.pathsep + os.environ.get("PYTHONPATH", "")}
    return subprocess.call(cmd, env=env)


def main(argv=None) -> int:
    p = argparse.ArgumentParser(prog="jac", description="Agente jurídico JAC: consulta verificable de derecho colombiano.")
    p.add_argument("--version", action="version", version=f"jac {__version__}")
    s = p.add_subparsers(dest="cmd")

    def comun(sp):
        sp.add_argument("--sin-red", action="store_true", help="no consultar fuentes en red")
        sp.add_argument("--json", action="store_true", help="salida JSON")
        sp.add_argument("--en-vivo", action="store_true", help="confirmar normas contra su página oficial")
    c = s.add_parser("consulta", help="enruta solo: cita, texto, archivo o carpeta"); c.add_argument("entrada"); comun(c); c.set_defaults(f=cmd_consulta)
    t = s.add_parser("sentencia", help="verifica una cita (T-008/20) o busca jurisprudencia"); t.add_argument("texto"); comun(t); t.set_defaults(f=cmd_sentencia)
    n = s.add_parser("norma", help="verifica una norma (Ley 1437 de 2011)"); n.add_argument("cita"); n.add_argument("--en-vivo", action="store_true"); n.set_defaults(f=cmd_norma)
    v = s.add_parser("validar", help="control Gauntlet de un escrito (.txt .md .docx)"); v.add_argument("resto", nargs=argparse.REMAINDER); v.set_defaults(f=cmd_validar)
    i = s.add_parser("inventario", help="inventario documental de una carpeta"); i.add_argument("carpeta"); i.set_defaults(f=cmd_inventario)
    s.add_parser("fuentes", help="diagnóstico de las fuentes oficiales").set_defaults(f=cmd_fuentes)
    s.add_parser("protocolo", help="imprime el protocolo JAC Gauntlet Elite").set_defaults(f=cmd_protocolo)
    d = s.add_parser("doctor", help="comprueba la instalación"); d.add_argument("--red", action="store_true"); d.set_defaults(f=cmd_doctor)
    q = s.add_parser("prueba", help="prueba de aceptación reproducible"); q.add_argument("--red", action="store_true", help="incluye citas reales en las fuentes oficiales"); q.add_argument("--json", help="guarda la evidencia en este archivo"); q.set_defaults(f=cmd_prueba)
    e = s.add_parser("empaquetar", help="crea el archivo .plugin para Cowork"); e.add_argument("--salida", default="jac-legal-os.plugin"); e.set_defaults(f=cmd_empaquetar)
    a = s.add_parser("agente", help="modo automático: Claude atiende una consulta abierta con estas herramientas")
    a.add_argument("consulta"); a.add_argument("--modelo"); a.add_argument("--max-turnos", type=int, default=30); a.set_defaults(f=cmd_agente)
    args = p.parse_args(argv)
    if not args.cmd:
        p.print_help()
        return 0
    return args.f(args)
