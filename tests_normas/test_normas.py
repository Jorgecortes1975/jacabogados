import json
from datetime import date

import httpx
import pytest

from gauntlet_jac import informe
from normas_col import catalogo as C, cli, confirmaciones, gestor_normativo, verificar as V

REF = date(2026, 10, 12)
CAT = C.cargar("/nonexistent.json")


def cliente(handler):
    return httpx.Client(transport=httpx.MockTransport(handler))


def test_semilla_carga_y_tiene_datos_clave():
    assert len(CAT) == 13
    n = C.buscar(CAT, "ley", 1437, 2011)
    assert (n.id, n.expedida, n.vigencia_desde) == ("41249", "2011-01-18", "2012-07-02")
    assert n.url.endswith("norma.php?i=41249")


def test_existencia_no_es_vigencia():
    r = V.verificar("ley", 1437, 2011, fecha_ref=REF, catalogo=CAT)
    assert r["estado"] == "verificada" and r["vigencia"]["estado"] == "no_determinada"
    assert "no exhaustivo" in r["vigencia"]["detalle"]


def test_ausente_queda_pendiente_nunca_no_encontrada():
    r = V.verificar("ley", 57, 1887, catalogo=CAT)
    assert r["estado"] == "pendiente" and "NO prueba" in r["detalle"]


def test_mismo_numero_otro_anio_alerta_sin_bloquear():
    r = V.verificar("ley", 1437, 2012, catalogo=CAT)
    assert r["estado"] == "pendiente" and "Ley 1437 de 2011" in r["detalle"]


def test_fecha_citada_discrepante_es_critica():
    ok = V.verificar("decreto", 2591, 1991, "1991-11-19", REF, CAT)
    mal = V.verificar("decreto", 2591, 1991, "1991-11-20", REF, CAT)
    assert ok["estado"] == "verificada"
    assert mal["estado"] == "datos_discrepantes" and "1991-11-19" in mal["detalle"]


def test_fecha_oficial_ausente_no_genera_discrepancia():
    assert V.verificar("decreto", 1072, 2015, "2015-05-26", REF, CAT)["estado"] == "verificada"


def test_derogacion_registrada():
    n = C.Norma("1", "ley", "7", 2000, "Ley 7 de 2000", modificaciones=["Derogado por Ley 9 de 2005", "Modificado por Ley 8 de 2001"])
    r = V.verificar("ley", 7, 2000, catalogo={n.clave: n}, fecha_ref=REF)
    assert r["vigencia"]["estado"] == "derogacion_registrada" and "Ley 9 de 2005" in r["vigencia"]["detalle"]


def test_confirmacion_manual_con_caducidad(tmp_path):
    ruta = str(tmp_path / "c.json")
    confirmaciones.registrar("ley 1437 de 2011", "Dra. X", date(2026, 10, 1), "SUIN-Juriscol", ruta=ruta)
    vivo = V.verificar("ley", 1437, 2011, fecha_ref=REF, catalogo=CAT, ruta_confirmaciones=ruta)
    assert vivo["vigencia"]["estado"] == "confirmada_manual" and "Dra. X" in vivo["vigencia"]["detalle"]
    caducada = V.verificar("ley", 1437, 2011, fecha_ref=date(2026, 12, 1), catalogo=CAT, ruta_confirmaciones=ruta)
    assert caducada["vigencia"]["estado"] == "no_determinada"
    antes = V.verificar("ley", 1437, 2011, fecha_ref=date(2026, 9, 1), catalogo=CAT, ruta_confirmaciones=ruta)
    assert antes["vigencia"]["estado"] == "no_determinada"


def test_en_vivo_ok_caida_y_negativa():
    n = C.buscar(CAT, "ley", 1437, 2011)
    assert gestor_normativo.confirmar_en_vivo(n, cliente(lambda r: httpx.Response(200, text="Ley 1437 de 2011")))[0] is True
    assert gestor_normativo.confirmar_en_vivo(n, cliente(lambda r: httpx.Response(200, text="otra cosa")))[0] is False
    assert gestor_normativo.confirmar_en_vivo(n, cliente(lambda r: httpx.Response(404)))[0] is False
    assert gestor_normativo.confirmar_en_vivo(n, cliente(lambda r: httpx.Response(403)))[0] is None


def test_en_vivo_caido_no_cambia_el_resultado_pero_se_informa(monkeypatch):
    monkeypatch.setattr("time.sleep", lambda s: None)
    r = V.verificar("ley", 1437, 2011, fecha_ref=REF, catalogo=CAT, en_vivo=True, cliente=cliente(lambda q: httpx.Response(503)))
    assert r["estado"] == "verificada" and "no disponible" in r["detalle"] and r["fuentes"] == ["catalogo_funcion_publica"]


def test_catalogo_del_despacho_prevalece_y_se_persiste(tmp_path):
    ruta = str(tmp_path / "u.json")
    C.agregar_usuario(C.Norma("999", "ley", "57", 1887, "Ley 57 de 1887", expedida="1887-04-15"), ruta)
    cat = C.cargar(ruta)
    assert len(cat) == 14 and V.verificar("ley", 57, 1887, catalogo=cat)["estado"] == "verificada"
    assert json.load(open(ruta))["normas"][0]["id"] == "999"


def test_cli(tmp_path, capsys, monkeypatch):
    monkeypatch.chdir(tmp_path)
    assert cli.main(["consultar", "Ley 1437 de 2011"]) == 0
    assert '"estado": "verificada"' in capsys.readouterr().out
    assert cli.main(["consultar", "texto raro"]) == 3
    assert cli.main(["confirmar", "Ley 1437 de 2011", "--por", "X", "--fuente", "SUIN"]) == 0


# ---- integración con gauntlet_jac
def test_escrito_con_normas_confirmadas_llega_a_pass_automatico(tmp_path):
    ruta = str(tmp_path / "c.json")
    for k in ("ley 1437 de 2011", "decreto 2591 de 1991"):
        confirmaciones.registrar(k, "Dra. X", date(2026, 10, 10), "SUIN-Juriscol", ruta=ruta)
    i = informe.ejecutar("Ley 1437 de 2011 y Decreto 2591 del 19 de noviembre de 1991.", REF, sin_red=True, ruta_confirmaciones=ruta)
    assert i["estado"] == "PASS_AUTOMATICO" and {c["estado"] for c in i["citas"]} == {"verificada"}


def test_escrito_con_fecha_de_norma_equivocada_se_bloquea():
    i = informe.ejecutar("Decreto 2591 del 20 de noviembre de 1991.", REF, sin_red=True)
    assert i["estado"] == "BLOCKED" and i["citas"][0]["estado"] == "datos_discrepantes"


def test_vigencia_se_reporta_una_vez_por_norma():
    i = informe.ejecutar("Ley 100 de 1993.\n\nOtra vez Ley 100 de 1993.", REF, sin_red=True)
    assert [h["codigo"] for h in i["hallazgos"]].count("VIGENCIA_NO_DETERMINADA") == 1 and len(i["citas"]) == 2


def test_decreto_ley_y_acto_legislativo_no_rompen():
    i = informe.ejecutar("Decreto Ley 2663 de 1950 y Acto Legislativo 1 de 2017.", REF, sin_red=True)
    assert {c["estado"] for c in i["citas"]} == {"pendiente"}
