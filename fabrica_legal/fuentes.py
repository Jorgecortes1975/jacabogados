"""Consulta a fuentes oficiales colombianas, con estado explícito por fuente.

Reutiliza los conectores ya existentes en el repositorio (jurisprudencia_col y
normas_col) y no inventa endpoints de búsqueda. Cada respuesta informa:

- estado: OK, FUENTE_NO_DISPONIBLE, CITA_NO_RECONOCIDA, SIN_CONECTOR, etc.
- detalle: qué se intentó y qué respondió la fuente en esta ejecución.

Una respuesta OK no es una verificación de vigencia. Existir no es estar vigente,
y la ausencia de resultados no prueba que una providencia no exista. Un resultado
vacío significa "no encontrado en la fuente consultada", nunca "no existe".
"""

from __future__ import annotations

from typing import Dict, List, Optional

from jurisprudencia_col import rama_judicial, relatoria_cc, samai, socrata_cc
from jurisprudencia_col.citas import parsear_cita
from jurisprudencia_col.http import ErrorHTTP, FuenteNoDisponible, obtener
from normas_col import catalogo
from normas_col.gestor_normativo import confirmar_en_vivo

MAX_LIMITE_SOCRATA = 1000

FUENTES_SIN_CONECTOR = [
    ("Consejo de Estado (jurisprudencia)", "Sin búsqueda confirmada. SAMAI solo permite consultar procesos por radicado."),
    ("Corte Suprema de Justicia (relatoría)", "Sin búsqueda confirmada en esta versión."),
    ("SUIN Juriscol (normas)", "Sin búsqueda por cita confirmada."),
    ("Diario Oficial", "Sin conector en esta versión."),
    ("Congreso de la República", "Sin conector en esta versión."),
    ("Superintendencia de Sociedades", "Sin conector en esta versión."),
    ("DIAN (doctrina y normas tributarias)", "Sin conector en esta versión."),
]


def _anio_de(fecha: str) -> Optional[int]:
    try:
        return int(fecha[:4])
    except (TypeError, ValueError):
        return None


def buscar_jurisprudencia_cc(
    texto: str = "",
    anio_desde: Optional[int] = None,
    anio_hasta: Optional[int] = None,
    limite: int = 100,
    max_paginas: int = 5,
    cliente=None,
) -> Dict:
    """Metadatos de sentencias de la Corte Constitucional (datos.gov.co), filtrados por año.

    El filtro por año se aplica en el cliente: la búsqueda pagina el dataset y
    se detiene al agotar las páginas. Si se alcanza max_paginas sin agotar el
    dataset, limite_alcanzado es True y la cobertura del resultado está incompleta.
    """
    fuente = "Corte Constitucional, metadatos (datos.gov.co, Socrata)"
    tamano = max(1, min(int(limite), MAX_LIMITE_SOCRATA))
    resultados: List[dict] = []
    paginas = 0
    agotado = False
    try:
        while paginas < max_paginas:
            params: Dict[str, object] = {"$limit": tamano, "$offset": paginas * tamano}
            if texto.strip():
                params["$q"] = texto.strip()
            r = obtener(socrata_cc.BASE_URL, params=params, headers=socrata_cc._cabeceras(), cliente=cliente)
            r.raise_for_status()
            filas = r.json()
            paginas += 1
            for fila in filas:
                s = socrata_cc.a_sentencia(fila)
                anio = _anio_de(s.fecha)
                if anio_desde is not None and (anio is None or anio < anio_desde):
                    continue
                if anio_hasta is not None and (anio is None or anio > anio_hasta):
                    continue
                resultados.append({
                    "sentencia": s.sentencia,
                    "proceso": s.proceso,
                    "expediente": s.expediente,
                    "magistrado": s.magistrado,
                    "sala": s.sala,
                    "fecha": s.fecha[:10],
                    "url_relatoria": s.fuente_url,
                })
            if len(filas) < tamano:
                agotado = True
                break
    except (FuenteNoDisponible, ErrorHTTP) as e:
        return {"fuente": fuente, "estado": "FUENTE_NO_DISPONIBLE", "detalle": str(e),
                "resultados": resultados, "paginas_revisadas": paginas, "limite_alcanzado": False}
    except ValueError as e:  # JSON no válido: se informa, no se oculta
        return {"fuente": fuente, "estado": "FUENTE_NO_DISPONIBLE",
                "detalle": f"Respuesta no interpretable: {e}",
                "resultados": [], "paginas_revisadas": paginas, "limite_alcanzado": False}

    return {
        "fuente": fuente,
        "estado": "OK",
        "detalle": "Consulta completa del dataset" if agotado else "Se alcanzó max_paginas; cobertura incompleta",
        "resultados": resultados,
        "paginas_revisadas": paginas,
        "limite_alcanzado": not agotado,
    }


def texto_sentencia_cc(cita: str, cliente=None) -> Dict:
    """Texto de una sentencia de la Corte Constitucional por cita (T-008/20, C-080/18...)."""
    if parsear_cita(cita) is None:
        return {"cita": cita, "estado": "CITA_NO_RECONOCIDA", "url": "", "texto": "",
                "detalle": "El formato no corresponde a una cita de la Corte Constitucional."}
    try:
        url, texto = relatoria_cc.descargar_texto(cita, cliente=cliente)
    except FuenteNoDisponible as e:
        return {"cita": cita, "estado": "FUENTE_NO_DISPONIBLE", "url": "", "texto": "", "detalle": str(e)}
    if not texto:
        return {"cita": cita, "estado": "NO_OBTENIDO", "url": url, "texto": "",
                "detalle": "Ninguna variante de URL de la relatoría respondió con el texto. Verificar manualmente."}
    return {"cita": cita, "estado": "OK", "url": url, "texto": texto,
            "detalle": "Texto obtenido de la relatoría oficial en esta ejecución."}


def confirmar_norma(tipo: str, numero, anio: int, cliente=None) -> Dict:
    """Existencia de una norma en el catálogo local y confirmación en su página oficial.

    Solo confirma existencia y fecha. Nunca confirma vigencia (ver CLAUDE.md).
    """
    cat = catalogo.cargar()
    norma = catalogo.buscar(cat, tipo, numero, anio)
    if norma is None:
        return {"norma": f"{tipo} {numero} de {anio}", "estado": "PENDIENTE_DE_VERIFICACION",
                "detalle": "No está en el catálogo local. Su ausencia no prueba que la norma no exista."}
    confirmada, detalle = confirmar_en_vivo(norma, cliente=cliente)
    estado = {True: "EXISTENCIA_CONFIRMADA", False: "NO_CONFIRMADA", None: "FUENTE_NO_DISPONIBLE"}[confirmada]
    return {"norma": f"{tipo} {numero} de {anio}", "estado": estado, "url": norma.url,
            "detalle": detalle, "vigencia": "NO DETERMINADA: requiere verificación en fuente oficial"}


def estado_fuentes(cliente=None) -> List[Dict]:
    """Accesibilidad de cada fuente desde este entorno, en esta ejecución."""
    filas: List[Dict] = []

    try:
        r = obtener(socrata_cc.BASE_URL, params={"$limit": 1}, headers=socrata_cc._cabeceras(), cliente=cliente)
        filas.append({"fuente": "Corte Constitucional, metadatos (datos.gov.co)",
                      "estado": "ACCESIBLE" if r.status_code == 200 else f"HTTP {r.status_code}"})
    except FuenteNoDisponible as e:
        filas.append({"fuente": "Corte Constitucional, metadatos (datos.gov.co)",
                      "estado": "FUENTE_NO_DISPONIBLE", "detalle": str(e)})

    rel = texto_sentencia_cc("T-008/20", cliente=cliente)
    filas.append({"fuente": "Corte Constitucional, relatoría (texto)",
                  "estado": rel["estado"], "detalle": rel["detalle"]})

    rj = rama_judicial.verificar_disponibilidad(cliente=cliente)
    filas.append({"fuente": "Rama Judicial, relatoría unificada",
                  "estado": "ACCESIBLE" if rj.get("accesible") else "FUENTE_NO_DISPONIBLE",
                  "detalle": rj.get("error", "Solo diagnóstico: no hay búsqueda automatizada.")})

    sa = samai.verificar_samai(cliente=cliente)
    filas.append({"fuente": "SAMAI (Consejo de Estado)",
                  "estado": "ACCESIBLE" if sa.get("accesible") else "FUENTE_NO_DISPONIBLE",
                  "detalle": sa.get("error", "Solo consulta por radicado; sin búsqueda temática.")})

    for nombre, motivo in FUENTES_SIN_CONECTOR:
        filas.append({"fuente": nombre, "estado": "SIN_CONECTOR", "detalle": motivo})

    filas.append({"fuente": "Catálogo local de normas (Función Pública)",
                  "estado": "CATALOGO_LOCAL", "detalle": "Existencia y fecha de normas del catálogo. Sin vigencia."})
    return filas
