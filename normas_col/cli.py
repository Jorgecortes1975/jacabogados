"""CLI: python3 -m normas_col <consultar|listar|agregar|confirmar> ..."""
from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import date

from . import catalogo as C, confirmaciones, verificar as V


def _cita(texto: str):
    m = re.match(r"^\s*(Ley|Decreto(?: Ley)?|Decreto Legislativo|Resoluci[oó]n|Acuerdo|Acto Legislativo|Circular)\s+(\d{1,4}(?:\.\d{3})?)\s+de\s+(\d{4})\s*$", texto, re.I)
    if not m:
        raise ValueError("Cita no reconocida; use el formato 'Ley 1437 de 2011'")
    from gauntlet_jac.extractor import sin_acentos
    return sin_acentos(m.group(1)).lower(), m.group(2).replace(".", ""), int(m.group(3))


def main(argv=None) -> int:
    p = argparse.ArgumentParser(prog="normas_col")
    s = p.add_subparsers(dest="cmd", required=True)
    c = s.add_parser("consultar"); c.add_argument("cita"); c.add_argument("--en-vivo", action="store_true"); c.add_argument("--fecha-ref")
    s.add_parser("listar")
    a = s.add_parser("agregar"); a.add_argument("cita"); a.add_argument("--id", default=""); a.add_argument("--expedida"); a.add_argument("--publicada-en"); a.add_argument("--url", default="")
    f = s.add_parser("confirmar"); f.add_argument("cita"); f.add_argument("--por", required=True); f.add_argument("--fuente", required=True); f.add_argument("--nota", default=""); f.add_argument("--fecha")
    x = p.parse_args(argv)
    try:
        if x.cmd == "listar":
            for n in sorted(C.cargar().values(), key=lambda n: (n.tipo, n.anio, int(n.numero))):
                print(f"{n.titulo} | id {n.id} | expedida {n.expedida or '-'} | {len(n.modificaciones)} modif. | {n.origen}")
            return 0
        tipo, num, anio = _cita(x.cita)
        if x.cmd == "consultar":
            ref = date.fromisoformat(x.fecha_ref) if x.fecha_ref else None
            print(json.dumps(V.verificar(tipo, num, anio, fecha_ref=ref, en_vivo=x.en_vivo), ensure_ascii=False, indent=1))
        elif x.cmd == "agregar":
            n = C.Norma(id=x.id, tipo=tipo, numero=num, anio=anio, titulo=f"{tipo.capitalize()} {num} de {anio}",
                        expedida=x.expedida, publicada_en=x.publicada_en, url=x.url)
            print("Registrada en", C.agregar_usuario(n), "(verifique que los datos provienen de fuente oficial)")
        elif x.cmd == "confirmar":
            ruta = confirmaciones.registrar(C.clave(tipo, num, anio), x.por, date.fromisoformat(x.fecha) if x.fecha else date.today(), x.fuente, x.nota)
            print(f"Vigencia confirmada manualmente; válida {confirmaciones.DIAS_VALIDEZ} días. Archivo: {ruta}")
        return 0
    except (ValueError, OSError) as e:
        print(f"Error: {e}", file=sys.stderr)
        return 3
