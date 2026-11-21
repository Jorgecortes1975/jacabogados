#!/usr/bin/env python3
"""Canal local de control de piezas de marketing jurídico.

Ejecuta solo comprobaciones deterministas. No publica, no envía nada fuera del equipo,
no conecta canales y no programa tareas.

Uso:
    python3 marketing/pipeline.py <piezas.md> [--adn <ADN-despacho.md>] [--informe <salida.md>]

Pasos:
  1. Estado de aprobación del ADN (campo "Aprobado por" con nombre, matrícula y fecha, sin PENDIENTE).
  2. Verificador de publicidad sobre cada pieza (marketing/verificador_publicidad.py).
  3. Decisión: una pieza solo se considera PUBLICABLE si el ADN está aprobado, la pieza es APTA
     y tiene registro PASS del Consejo. Lo demás es NO PUBLICABLE, con la razón.

Código de salida: 0 si todas las piezas son PUBLICABLE; 1 en cualquier otro caso; 2 si hay error de lectura.
La decisión final de publicar sigue siendo del abogado responsable.
"""

import argparse
import datetime
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import verificador_publicidad as v  # noqa: E402

ADN_POR_DEFECTO = Path(__file__).resolve().parent / "ADN-despacho.md"


def estado_adn(adn_texto: str) -> tuple[bool, str]:
    """Devuelve (aprobado, detalle). Aprobado solo si 'Aprobado por' tiene contenido sin PENDIENTE."""
    m = re.search(r"^Aprobado por:\s*(.*)$", adn_texto, flags=re.MULTILINE)
    if not m:
        return False, "no se encontró el campo 'Aprobado por'"
    valor = m.group(1).strip()
    if not valor or re.search(r"\bpendientes?\b", v.normalizar(valor)):
        return False, f"campo 'Aprobado por' vacío o pendiente: '{valor or 'vacío'}'"
    return True, f"aprobado por: {valor}"


def main() -> int:
    parser = argparse.ArgumentParser(description="Canal local de control de piezas de marketing.")
    parser.add_argument("piezas", help="Archivo Markdown con las piezas.")
    parser.add_argument("--adn", default=str(ADN_POR_DEFECTO))
    parser.add_argument("--informe", help="Si se indica, guarda el informe en esta ruta.")
    args = parser.parse_args()

    try:
        piezas_texto = Path(args.piezas).read_text(encoding="utf-8")
        adn_texto = Path(args.adn).read_text(encoding="utf-8")
    except OSError as e:
        print(f"Error al leer archivo: {e}", file=sys.stderr)
        return 2

    try:
        informe_v = v.evaluar_documento(piezas_texto, adn_texto)
    except ValueError as e:
        print(f"Error en el ADN: {e}", file=sys.stderr)
        return 2

    aprobado, detalle_adn = estado_adn(adn_texto)
    lineas = [
        f"Informe del canal de control. Fecha: {datetime.date.today().isoformat()}",
        f"Archivo de piezas: {args.piezas}",
        f"ADN: {'APROBADO' if aprobado else 'NO APROBADO'} ({detalle_adn})",
        "",
    ]

    todas_publicables = aprobado
    for nombre, estado, hallazgos in informe_v:
        registro_pass = not any("sin registro de revisión PASS" in h[2] for h in hallazgos)
        if not aprobado:
            decision = "NO PUBLICABLE: el ADN no está aprobado"
        elif estado != "APTA":
            decision = f"NO PUBLICABLE: el verificador la marca {estado}"
        elif not registro_pass:
            decision = "NO PUBLICABLE: falta registro PASS del Consejo"
        else:
            decision = "PUBLICABLE, sujeta a aprobación final del abogado responsable"

        if decision != "PUBLICABLE, sujeta a aprobación final del abogado responsable":
            todas_publicables = False

        lineas.append(f"{nombre}: {estado}. {decision}")
        for nivel, num, msg in hallazgos:
            lineas.append(f"  [{nivel}] línea {num}: {msg}")
        lineas.append("")

    lineas.append("Resultado global: " + ("TODAS PUBLICABLES (pendiente de aprobación final)" if todas_publicables else "NINGUNA PUBLICABLE SIN CAMBIOS"))
    lineas.append("Este canal no publica ni certifica hechos. Sustituye la revisión del abogado responsable.")

    texto = "\n".join(lineas)
    print(texto)
    if args.informe:
        Path(args.informe).parent.mkdir(parents=True, exist_ok=True)
        Path(args.informe).write_text(texto + "\n", encoding="utf-8")
    return 0 if todas_publicables else 1


if __name__ == "__main__":
    sys.exit(main())
