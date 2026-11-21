#!/usr/bin/env python3
"""Verificador determinista de publicidad jurídica del despacho.

Uso:
    python3 marketing/verificador_publicidad.py <archivo_piezas.md> [--adn <ADN-despacho.md>]

Por cada pieza (secciones que empiezan por "## Pieza") informa APTA, REVISAR o NO APTA,
con los hallazgos y su número de línea. Código de salida: 0 solo si todas las piezas son
APTA; 1 en cualquier otro caso; 2 si no se puede leer un archivo.

Qué comprueba:
  1. Promesas de resultado, superlativos y cifras de éxito (BLOQUEO).
  2. Frases de riesgo: gratuidad, urgencia, comparaciones económicas, efectos sin fuente (ALERTA).
  3. Placeholders sin resolver y piezas marcadas como no publicables (BLOQUEO).
  4. Correos, teléfonos y cédulas (BLOQUEO). Los datos encontrados no se imprimen.
  5. Normas citadas que no figuran con estado verificado en la sección 4 del ADN (BLOQUEO).
  6. Referencias a providencias o expedientes, que este script no puede verificar (BLOQUEO).
  7. Fórmula de aclaración aprobada presente en la pieza (BLOQUEO si falta).
  8. Registro del Consejo: Estado PASS, Revisor y Fecha de revisión completados (BLOQUEO si falta).

Qué NO comprueba: veracidad de los hechos, vigencia de normas, ni la decisión jurídica.
Eso corresponde al Consejo (.claude/agents/jac-consejo.md) y al abogado responsable. Un resultado
APTA no es una certificación ni sustituye la revisión humana.
"""

import argparse
import re
import sys
import unicodedata
from pathlib import Path

DISCLAIMER = "Esta información es general y no constituye asesoría para un caso particular."

BLOQUEO_PATRONES = [
    (r"\bgarantiz", "promesa de resultado (garantiz)"),
    (r"\bresultados? asegurad", "promesa de resultado (asegurado)"),
    (r"\b100\s?%", "cifra de éxito o certeza absoluta (100 %)"),
    (r"\bel mejor\b|\blos mejores\b|\bel mas\b", "superlativo comparativo"),
    (r"\bganamos\b|\bganara\b|\bcasos ganados\b|\bgano\b", "promesa o cifra de éxito"),
    (r"\bcasos? de exito\b|\btestimonio", "testimonio o caso de éxito (requiere consentimiento escrito)"),
    (r"\bno (publicar|activar)\b", "pieza marcada como no publicable"),
]

ALERTA_PATRONES = [
    (r"\bgratis\b|\bgratuit", "gratuidad: requiere confirmación escrita del despacho"),
    (r"\bsin compromiso\b", "fórmula de consulta sin compromiso: requiere confirmación"),
    (r"\bmas barato\b|\bmejor precio\b|\bmas economic", "comparación económica sin fuente"),
    (r"\bahorr", "efecto o beneficio sin fuente"),
    (r"\bmas precis", "efecto de precisión sin fuente"),
    (r"\burgente\b|\bultima oportunidad\b|\bno pierda\b|\bhoy mismo\b", "urgencia artificial"),
    (r"\bprimera orientacion\b|\bconsulta gratuita\b", "servicio no confirmado en el ADN"),
    (r"\bmuchos\b|\bla mayoria\b|\bsiempre\b|\bnunca\b", "afirmación general sin fuente"),
    (r"\$\s?\d|\bdesde \$|\btarifa", "tarifa o precio: requiere confirmación escrita"),
]

PATRON_PLACEHOLDER = r"\[[^\]]*\bpendientes?\b[^\]]*\]"
PATRON_PENDIENTE = r"\bpendientes?\b"
PATRON_NORMA = r"\b(ley|decreto)\s+(\d{1,4})\s+de\s+(\d{4})\b"
PATRON_PROVIDENCIA = r"\b(sentencia|auto|radicado|expediente|providencia)\b"
PATRON_CORREO = r"\b[\w.+-]+@[\w-]+\.[\w.-]+"
PATRON_TELEFONO = r"(\+?57[\s-]?)?\b3\d{2}[\s-]?\d{3}[\s-]?\d{4}\b"
PATRON_CEDULA = r"\bc\.?\s?c\.?\s*\d"


def normalizar(texto: str) -> str:
    """Minúsculas y sin tildes, para comparar frases sin depender de la forma escrita."""
    descompuesto = unicodedata.normalize("NFKD", texto)
    sin_tildes = "".join(c for c in descompuesto if not unicodedata.combining(c))
    return sin_tildes.lower()


def normas_verificadas(adn_lineas: list[str]) -> set[str]:
    """Normas con estado verificado: aparecen en la sección 4 del ADN en una línea sin 'pendiente'."""
    inicio = next((i for i, l in enumerate(adn_lineas) if l.startswith("## 4.")), None)
    fin = next((i for i, l in enumerate(adn_lineas) if l.startswith("## 5.")), None)
    if inicio is None or fin is None or fin <= inicio:
        raise ValueError("No se encontró la sección 4 del ADN entre '## 4.' y '## 5.'.")
    verificadas = set()
    for linea in adn_lineas[inicio:fin]:
        n = normalizar(linea)
        if re.search(PATRON_PENDIENTE, n):
            continue
        for tipo, num, anio in re.findall(PATRON_NORMA, n):
            verificadas.add(f"{tipo} {num} de {anio}")
    return verificadas


def dividir_piezas(lineas: list[str]) -> list[tuple[str, list[tuple[int, str]]]]:
    """Devuelve (nombre, [(número_de_línea, texto)]) por pieza. Sin cabeceras, el documento es una sola pieza."""
    indices = [i for i, l in enumerate(lineas) if l.startswith("## Pieza")]
    if not indices:
        return [("Documento completo", list(enumerate(lineas, start=1)))]
    piezas = []
    for k, inicio in enumerate(indices):
        fin = indices[k + 1] if k + 1 < len(indices) else len(lineas)
        nombre = lineas[inicio].lstrip("# ").strip()
        piezas.append((nombre, [(n + 1, lineas[n]) for n in range(inicio, fin)]))
    return piezas


def analizar_pieza(lineas: list[tuple[int, str]], verificadas: set[str]) -> list[tuple[str, int, str]]:
    hallazgos: list[tuple[str, int, str]] = []
    texto_total = []
    ultima_linea = lineas[-1][0] if lineas else 0

    for num, original in lineas:
        n = normalizar(original)
        texto_total.append(n)

        for patron, msg in BLOQUEO_PATRONES:
            if re.search(patron, n):
                hallazgos.append(("BLOQUEO", num, msg))
        for patron, msg in ALERTA_PATRONES:
            if re.search(patron, n):
                hallazgos.append(("ALERTA", num, msg))

        if re.search(PATRON_PLACEHOLDER, n):
            hallazgos.append(("BLOQUEO", num, "placeholder sin resolver"))
        if re.search(PATRON_CORREO, original):
            hallazgos.append(("BLOQUEO", num, "correo electrónico (dato personal; no se imprime)"))
        if re.search(PATRON_TELEFONO, original):
            hallazgos.append(("BLOQUEO", num, "posible número de teléfono (dato personal; no se imprime)"))
        if re.search(PATRON_CEDULA, n):
            hallazgos.append(("BLOQUEO", num, "posible número de cédula (dato personal; no se imprime)"))

        for m in re.finditer(PATRON_NORMA, n):
            clave = f"{m.group(1)} {m.group(2)} de {m.group(3)}"
            if clave not in verificadas:
                hallazgos.append(("BLOQUEO", num, f"norma citada sin verificación en ADN sección 4: {clave}"))

        if re.search(PATRON_PROVIDENCIA, n):
            hallazgos.append(("BLOQUEO", num, "referencia a providencia o expediente: no verificable por este script"))

    if normalizar(DISCLAIMER) not in " ".join(texto_total):
        hallazgos.append(("BLOQUEO", ultima_linea, "falta la fórmula de aclaración aprobada"))

    estado_ok = False
    revisor_ok = False
    fecha_ok = False
    for _, original in lineas:
        m_estado = re.match(r"^Estado:\s*(\S+)", original)
        if m_estado and m_estado.group(1) == "PASS":
            estado_ok = True
        m_revisor = re.match(r"^Revisor:\s*(.+)$", original.strip())
        if m_revisor and not re.search(PATRON_PENDIENTE, normalizar(m_revisor.group(1))) and m_revisor.group(1).strip():
            revisor_ok = True
        m_fecha = re.match(r"^Fecha de revisión:\s*(.+)$", original.strip())
        if m_fecha and not re.search(PATRON_PENDIENTE, normalizar(m_fecha.group(1))) and m_fecha.group(1).strip():
            fecha_ok = True
    if not (estado_ok and revisor_ok and fecha_ok):
        hallazgos.append(("BLOQUEO", ultima_linea, "sin registro de revisión PASS del Consejo (Estado, Revisor y Fecha de revisión)"))

    return hallazgos


def resultado(hallazgos: list[tuple[str, int, str]]) -> str:
    if any(h[0] == "BLOQUEO" for h in hallazgos):
        return "NO APTA"
    if any(h[0] == "ALERTA" for h in hallazgos):
        return "REVISAR"
    return "APTA"


def evaluar_documento(texto: str, adn_texto: str) -> list[tuple[str, str, list[tuple[str, int, str]]]]:
    verificadas = normas_verificadas(adn_texto.splitlines())
    piezas = dividir_piezas(texto.splitlines())
    salida = []
    for nombre, lineas in piezas:
        hallazgos = analizar_pieza(lineas, verificadas)
        salida.append((nombre, resultado(hallazgos), hallazgos))
    return salida


def main() -> int:
    parser = argparse.ArgumentParser(description="Verificador determinista de publicidad jurídica.")
    parser.add_argument("archivo", help="Archivo Markdown con las piezas a verificar.")
    parser.add_argument(
        "--adn",
        default=str(Path(__file__).resolve().parent / "ADN-despacho.md"),
        help="Ruta al ADN del despacho (por defecto marketing/ADN-despacho.md).",
    )
    args = parser.parse_args()

    try:
        texto = Path(args.archivo).read_text(encoding="utf-8")
        adn_texto = Path(args.adn).read_text(encoding="utf-8")
    except OSError as e:
        print(f"Error al leer archivo: {e}", file=sys.stderr)
        return 2

    try:
        informe = evaluar_documento(texto, adn_texto)
    except ValueError as e:
        print(f"Error en el ADN: {e}", file=sys.stderr)
        return 2

    todas_aptas = True
    for nombre, estado, hallazgos in informe:
        print(f"{nombre}: {estado}")
        if estado != "APTA":
            todas_aptas = False
        for nivel, num, msg in hallazgos:
            print(f"  [{nivel}] línea {num}: {msg}")
        print()

    print("Resultado global:", "APTA" if todas_aptas else "NO APTA o REVISAR")
    print("Este verificador no certifica la veracidad de los hechos ni sustituye la revisión del Consejo ni del abogado responsable.")
    return 0 if todas_aptas else 1


if __name__ == "__main__":
    sys.exit(main())
