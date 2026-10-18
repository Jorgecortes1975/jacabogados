"""Pruebas de la lógica de fabrica_legal.fuentes con un cliente simulado.

Estas pruebas verifican paginación, filtro por año, estados y mensajes de error.
NO verifican que las fuentes oficiales respondan ni que sus datos sean correctos:
eso solo puede hacerse con acceso de red a esos sitios (ver estado_fuentes()).
"""

import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from fabrica_legal import fuentes  # noqa: E402
from jurisprudencia_col import socrata_cc  # noqa: E402
from jurisprudencia_col.simulado import ClienteSimulado, Resp  # noqa: E402

FILAS = [
    {"sentencia": "T-008/20", "fecha_sentencia": "2020-02-04T00:00:00.000"},
    {"sentencia": "C-080/18", "fecha_sentencia": "2018-03-01T00:00:00.000"},
    {"sentencia": "SU-003/18", "fecha_sentencia": "2018-02-15T00:00:00.000"},
]


def cliente_socrata(filas, codigo=200):
    def handler(peticion):
        if peticion.url.startswith(socrata_cc.BASE_URL):
            if codigo != 200:
                return Resp(status_code=codigo, text="")
            off = int(peticion.url.params.get("$offset", 0))
            lim = int(peticion.url.params.get("$limit", 1000))
            return Resp(json=filas[off:off + lim])
        return Resp(status_code=404, text="")
    return ClienteSimulado(handler)


class BuscarJurisprudencia(unittest.TestCase):
    def test_filtra_por_rango_de_anios_y_agota_el_dataset(self):
        r = fuentes.buscar_jurisprudencia_cc(anio_desde=2018, anio_hasta=2018, limite=10,
                                             cliente=cliente_socrata(FILAS))
        self.assertEqual(r["estado"], "OK")
        self.assertEqual([x["sentencia"] for x in r["resultados"]], ["C-080/18", "SU-003/18"])
        self.assertFalse(r["limite_alcanzado"])

    def test_pagina_hasta_agotar(self):
        r = fuentes.buscar_jurisprudencia_cc(limite=2, max_paginas=5, cliente=cliente_socrata(FILAS))
        self.assertEqual(len(r["resultados"]), 3)
        self.assertEqual(r["paginas_revisadas"], 2)
        self.assertFalse(r["limite_alcanzado"])

    def test_informa_cobertura_incompleta_si_se_alcanza_el_maximo_de_paginas(self):
        r = fuentes.buscar_jurisprudencia_cc(limite=1, max_paginas=2, cliente=cliente_socrata(FILAS))
        self.assertTrue(r["limite_alcanzado"])
        self.assertIn("incompleta", r["detalle"])

    def test_http_403_se_reporta_como_fuente_no_disponible(self):
        r = fuentes.buscar_jurisprudencia_cc(cliente=cliente_socrata(FILAS, codigo=403))
        self.assertEqual(r["estado"], "FUENTE_NO_DISPONIBLE")
        self.assertEqual(r["resultados"], [])


class TextoSentencia(unittest.TestCase):
    def test_cita_no_reconocida(self):
        r = fuentes.texto_sentencia_cc("esto no es una cita", cliente=ClienteSimulado(lambda p: Resp(404)))
        self.assertEqual(r["estado"], "CITA_NO_RECONOCIDA")

    def test_no_obtenido_cuando_ninguna_url_responde_200(self):
        r = fuentes.texto_sentencia_cc("T-008/20", cliente=ClienteSimulado(lambda p: Resp(404, text="")))
        self.assertEqual(r["estado"], "NO_OBTENIDO")
        self.assertEqual(r["texto"], "")

    def test_texto_obtenido_si_la_relatoria_responde(self):
        html = "<html><body><p>Sentencia T-008 de 2020.</p></body></html>"
        r = fuentes.texto_sentencia_cc("T-008/20", cliente=ClienteSimulado(lambda p: Resp(200, text=html)))
        self.assertEqual(r["estado"], "OK")
        self.assertIn("Sentencia T-008 de 2020", r["texto"])


class EstadoFuentes(unittest.TestCase):
    def test_fuentes_sin_conector_no_se_presentan_como_accesibles(self):
        filas = fuentes.estado_fuentes(cliente=ClienteSimulado(lambda p: Resp(403, text="")))
        sin = [f for f in filas if f["estado"] == "SIN_CONECTOR"]
        self.assertTrue(any("Consejo de Estado" in f["fuente"] for f in sin))
        self.assertTrue(any("SUIN" in f["fuente"] for f in sin))


if __name__ == "__main__":
    unittest.main()
