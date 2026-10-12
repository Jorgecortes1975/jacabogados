"""CLI: python3 -m jurisprudencia_col <verificar|esquema|buscar|texto|url> ..."""
from __future__ import annotations

import argparse
import json
import sys

from . import rama_judicial, relatoria_cc, samai, socrata_cc
from .citas import parsear_cita, urls_candidatas
from .http import FuenteNoDisponible, obtener


def _verificar() -> int:
    objetivos = {
        "Socrata CC": socrata_cc.BASE_URL + "?$limit=1",
        "Relatoría CC": "https://www.corteconstitucional.gov.co/relatoria/2020/T-008-20.htm",
    }
    ok = True
    for nombre, url in objetivos.items():
        try:
            r = obtener(url, reintentos=2)
            print(f"{r.status_code} | {len(r.content):>9} bytes | {nombre}")
            ok &= r.status_code == 200
        except FuenteNoDisponible as e:
            print(f"ERROR | {nombre} | {e}")
            ok = False
    for nombre, res in (("Rama Judicial", rama_judicial.verificar_disponibilidad()),
                        ("SAMAI", samai.verificar_samai())):
        print(f"{nombre}: {json.dumps(res, ensure_ascii=False)}")
        ok &= bool(res.get("accesible"))
    if not ok:
        print("\nAlguna fuente no respondió. Si ve 403 en CONNECT, el bloqueo es de red/proxy "
              "de su entorno (lista de hosts permitidos), no del código.")
    return 0 if ok else 2


def main(argv=None) -> int:
    p = argparse.ArgumentParser(prog="jurisprudencia_col")
    sub = p.add_subparsers(dest="cmd", required=True)
    sub.add_parser("verificar")
    sub.add_parser("esquema")
    b = sub.add_parser("buscar"); b.add_argument("consulta"); b.add_argument("--limite", type=int, default=10)
    t = sub.add_parser("texto"); t.add_argument("cita"); t.add_argument("--max", type=int, default=3000)
    u = sub.add_parser("url"); u.add_argument("cita")
    a = p.parse_args(argv)
    try:
        if a.cmd == "verificar":
            return _verificar()
        if a.cmd == "esquema":
            print("\n".join(socrata_cc.esquema()))
        elif a.cmd == "buscar":
            for s in socrata_cc.buscar_cc(a.consulta, a.limite):
                print(f"{s.sentencia} | {s.proceso} | {s.magistrado} | {s.fecha[:10]} | {s.fuente_url}")
        elif a.cmd == "texto":
            url, texto = relatoria_cc.descargar_texto(a.cita)
            if not texto:
                print(f"No se obtuvo texto. URL intentada: {url or 'cita no reconocida'}. Verificar manualmente.")
                return 1
            print(f"Fuente: {url}\n\n{texto[:a.max]}")
        elif a.cmd == "url":
            if not parsear_cita(a.cita):
                print("Cita no reconocida (ej.: T-008/20, C-080/18, SU.502/25)."); return 1
            print("\n".join(urls_candidatas(a.cita)))
    except FuenteNoDisponible as e:
        print(f"Fuente no disponible: {e}", file=sys.stderr)
        return 2
    return 0
