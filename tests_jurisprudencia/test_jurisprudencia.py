import httpx
import pytest

from jurisprudencia_col import rama_judicial, relatoria_cc, samai, socrata_cc
from jurisprudencia_col.citas import parsear_cita, urls_candidatas
from jurisprudencia_col.http import FuenteNoDisponible, obtener


def cliente(handler):
    return httpx.Client(transport=httpx.MockTransport(handler))


# URL oficiales verificadas contra la relatoría (Croma, 2026-10-12)
@pytest.mark.parametrize("cita,url", [
    ("T-008/20", "https://www.corteconstitucional.gov.co/relatoria/2020/T-008-20.htm"),
    ("C-080/18", "https://www.corteconstitucional.gov.co/relatoria/2018/C-080-18.htm"),
    ("T-012/92", "https://www.corteconstitucional.gov.co/relatoria/1992/T-012-92.htm"),
    ("t-008 de 2020", "https://www.corteconstitucional.gov.co/relatoria/2020/T-008-20.htm"),
    ("SU.502/25", "https://www.corteconstitucional.gov.co/relatoria/2025/SU-502-25.htm"),
])
def test_url_oficial_primera(cita, url):
    assert urls_candidatas(cita)[0] == url


@pytest.mark.parametrize("malo", ["", "TT-1/20", "X-008/20", "T-008", "T-008/85", "hola"])
def test_cita_invalida(malo):
    assert parsear_cita(malo) is None and urls_candidatas(malo) == []


def test_alias_socrata_y_url():
    s = socrata_cc.a_sentencia({"sentencia": "T-008/20", "magistrado": "X", "fecha": "2020-01-20T00:00:00"})
    assert s.magistrado == "X" and s.fuente_url.endswith("/2020/T-008-20.htm")


def test_buscar_cc_usa_q_y_limite():
    vistos = {}
    def h(req):
        vistos.update(dict(req.url.params))
        return httpx.Response(200, json=[{"sentencia": "C-080/18"}])
    r = socrata_cc.buscar_cc("o'brien", 5, cliente(h))
    assert vistos == {"$limit": "5", "$q": "o'brien"} and r[0].sentencia == "C-080/18"


def test_verificar_existencia():
    h = lambda req: httpx.Response(200, json=[{"sentencia": "T-009/20"}, {"sentencia": "T-008/20"}])
    assert socrata_cc.verificar_existencia("T-008/20", cliente(h)).sentencia == "T-008/20"
    assert socrata_cc.verificar_existencia("T-999/20", cliente(h)) is None


def test_descarga_prueba_variantes_y_decodifica_cp1252():
    pedidas = []
    def h(req):
        pedidas.append(req.url.path)
        if req.url.path.endswith("T-008-20.htm"):
            return httpx.Response(404)
        return httpx.Response(200, content="<p>Sentencia sección</p>".encode("cp1252"))
    url, txt = relatoria_cc.descargar_texto("T-008/20", cliente(h))
    assert url.endswith("t-008-20.htm") and "sección" in txt and len(pedidas) == 2


def test_descarga_sin_exito_devuelve_url_primera():
    url, txt = relatoria_cc.descargar_texto("T-008/20", cliente(lambda r: httpx.Response(404)))
    assert url.endswith("T-008-20.htm") and txt == ""


def test_reintenta_5xx_y_agota(monkeypatch):
    monkeypatch.setattr("time.sleep", lambda s: None)
    n = []
    def h(req):
        n.append(1)
        return httpx.Response(503)
    with pytest.raises(FuenteNoDisponible):
        obtener("https://x.test", cliente=cliente(h))
    assert len(n) == 3


def test_diagnosticos():
    html = '<form id="frm"><input name="javax.faces.ViewState"></form>'
    r = rama_judicial.verificar_disponibilidad(cliente(lambda q: httpx.Response(200, text=html)))
    assert r["tiene_viewstate"] and r["ids_formulario"] == ["frm"]
    assert samai.verificar_samai(cliente(lambda q: httpx.Response(200, text="ok")))["accesible"]
