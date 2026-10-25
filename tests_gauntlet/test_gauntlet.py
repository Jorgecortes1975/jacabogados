import json
from datetime import date

from jurisprudencia_col.simulado import ClienteSimulado, Resp
import pytest

from gauntlet_jac import cli, controles as C, informe, inventario
from gauntlet_jac.extractor import (extraer_citas, extraer_fechas, extraer_radicados,
                                    ponente_en_contexto)

REF = date(2026, 10, 12)


def cliente(handler):
    return ClienteSimulado(handler)


def fuentes(socrata_rows=None, existentes=(), socrata_ok=True, relatoria_ok=True):
    """Mock: Socrata devuelve filas; la relatoría responde 200 solo para las rutas dadas."""
    def h(req):
        if "datos.gov.co" in str(req.url):
            return Resp(200, json=socrata_rows or []) if socrata_ok else Resp(503)
        if not relatoria_ok:
            return Resp(500)
        return Resp(200 if req.url.path in existentes else 404)
    return h


# ---------- extracción ----------
def test_extrae_citas_y_descarta_falsos_positivos():
    t = "COVID-19, a 5 de mayo de 2020, la T-008 de 2020, C-080/18, SU-502/25, SL1234-2020, Ley 1437 de 2011, Decreto 2591 del 19 de noviembre de 1991."
    claves = [(c.clase, c.clave) for c in extraer_citas(t, REF)]
    assert ("cc", "T-008/20") in claves and ("cc", "C-080/18") in claves and ("cc", "SU-502/25") in claves
    assert ("cs", "SL1234-2020") in claves
    assert ("norma", "ley 1437 de 2011") in claves and ("norma", "decreto 2591 de 1991") in claves
    assert len(claves) == 6


def test_ano_de_dos_digitos_no_se_confunde_con_fecha():
    cs = extraer_citas("Véase la T-008 de 2020 y la T-008 de 20 de enero", REF)
    assert [c.clave for c in cs] == ["T-008/20"]


def test_citas_imposibles():
    cs = extraer_citas("T-999/85 y Ley 5 de 1700", REF)
    assert all(c.problema for c in cs) and len(cs) == 2


def test_ubicacion_y_ponente():
    c = extraer_citas("Primera.\n\nSegunda T-008/20, M.P. Diana Fajardo Rivera, dice.", REF)[0]
    assert (c.linea, c.parrafo) == (3, 2)
    assert ponente_en_contexto(c.contexto).startswith("Diana Fajardo Rivera")


def test_fechas_y_radicados():
    f = extraer_fechas("el 31 de febrero de 2021 y el 2026-13-40 y el 5 de mayo de 2020")
    assert [x.valor is None for x in f] == [True, False, True]
    assert extraer_radicados("11001-31-05-001-2020-00123-00 y 11001310500120200012300") == ["11001310500120200012300"]


# ---------- verificación ----------
FILA = {"sentencia": "T-008/20", "magistrado_a": "DIANA CONSTANZA FAJARDO RIVERA", "fecha_sentencia": "2020-01-20T00:00:00"}


def test_verificada_por_dos_fuentes():
    i = informe.ejecutar("Ver T-008 de 2020.", REF, cliente=cliente(fuentes([FILA], {"/relatoria/2020/T-008-20.htm"})))
    assert i["citas"][0]["estado"] == "verificada" and set(i["citas"][0]["fuentes"]) == {"socrata_cc", "relatoria_cc"}
    assert i["estado"] == "PASS_AUTOMATICO"


def test_no_encontrada_solo_si_ambas_fuentes_responden():
    i = informe.ejecutar("Ver T-777 de 2020.", REF, cliente=cliente(fuentes([])))
    assert i["citas"][0]["estado"] == "no_encontrada" and i["estado"] == "BLOCKED"


def test_fuente_caida_deja_pendiente_y_no_bloquea():
    i = informe.ejecutar("Ver T-008 de 2020 y C-080/18.", REF, cliente=cliente(fuentes(socrata_ok=False, relatoria_ok=False)))
    assert {c["estado"] for c in i["citas"]} == {"pendiente"} and i["estado"] == "CONDITIONAL"
    assert i["fuentes_consultadas"]["socrata_cc"]["estado"] == "caida"


def test_una_fuente_caida_y_otra_confirma():
    i = informe.ejecutar("Ver T-008 de 2020.", REF, cliente=cliente(fuentes(socrata_ok=False, existentes={"/relatoria/2020/T-008-20.htm"})))
    assert i["citas"][0]["estado"] == "verificada" and i["citas"][0]["fuentes"] == ["relatoria_cc"]


def test_variante_de_url_en_minuscula():
    i = informe.ejecutar("Ver T-008 de 2020.", REF, cliente=cliente(fuentes([], {"/relatoria/2020/t-008-20.htm"})))
    assert i["citas"][0]["estado"] == "verificada"


def test_ponente_discrepante():
    i = informe.ejecutar("T-008 de 2020, M.P. Pedro Pérez López, sostiene.", REF,
                         cliente=cliente(fuentes([FILA], {"/relatoria/2020/T-008-20.htm"})))
    c = i["citas"][0]
    assert c["estado"] == "datos_discrepantes" and "FAJARDO" in c["detalle"] and i["estado"] == "BLOCKED"


def test_apariciones_repetidas_se_reportan_todas_pero_se_consulta_una_vez():
    llamadas = []
    base = fuentes([FILA], {"/relatoria/2020/T-008-20.htm"})
    def h(req):
        llamadas.append(str(req.url)); return base(req)
    i = informe.ejecutar("T-008/20.\n\nOtra vez T-008 de 2020.", REF, cliente=cliente(h))
    # 2 consultas a Socrata: la sonda de esquema (una por ejecución) y la búsqueda de la cita; la repetición no consulta de nuevo
    assert len(i["citas"]) == 2 and len([u for u in llamadas if "datos.gov.co" in u]) == 2


def test_norma_del_catalogo_existe_pero_su_vigencia_queda_pendiente():
    i = informe.ejecutar("Ley 100 de 1993.", REF, cliente=cliente(fuentes()))
    assert i["citas"][0]["estado"] == "verificada"
    assert [h["codigo"] for h in i["hallazgos"]] == ["VIGENCIA_NO_DETERMINADA"] and i["estado"] == "CONDITIONAL"


def test_norma_fuera_del_catalogo_queda_pendiente_no_inexistente():
    i = informe.ejecutar("Ley 57 de 1887.", REF, cliente=cliente(fuentes()))
    assert i["citas"][0]["estado"] == "pendiente" and i["estado"] == "CONDITIONAL"


# ---------- controles y decisión ----------
def test_decision():
    H = C.Hallazgo
    assert C.decidir([]) == "PASS_AUTOMATICO"
    assert C.decidir([H("a", C.ADVERTENCIA, "")]) == "PASS_AUTOMATICO"
    assert C.decidir([H("a", C.PENDIENTE, "")]) == "CONDITIONAL"
    assert C.decidir([H("a", C.PENDIENTE, ""), H("b", C.CRITICO, "")]) == "BLOCKED"


def test_matter_lock():
    t = "Radicado 11001-31-05-001-2020-00123-00 y 05001-31-03-002-2019-00456-00."
    assert {h.codigo for h in C.controlar_radicados(t, "11001310500120200012300")} == {"RADICADO_AJENO"}
    assert {h.codigo for h in C.controlar_radicados("sin radicado", "11001310500120200012300")} == {"RADICADO_AUSENTE"}
    assert {h.codigo for h in C.controlar_radicados(t, None)} == {"RADICADOS_MULTIPLES"}


def test_placeholders_y_pendientes():
    cods = {h.codigo for h in C.controlar_placeholders("Nombre: ____ y [completar fecha] PENDIENTE DE VERIFICACIÓN")}
    assert cods == {"PLACEHOLDER", "DATO_PENDIENTE"}


def test_fecha_posterior_solo_advierte():
    hs = C.controlar_fechas(extraer_fechas("audiencia el 1 de diciembre de 2026"), REF)
    assert hs[0].gravedad == C.ADVERTENCIA


def test_sin_citas_se_informa():
    i = informe.ejecutar("Texto sin citas.", REF, sin_red=True)
    assert [h["codigo"] for h in i["hallazgos"]] == ["SIN_CITAS"] and i["estado"] == "PASS_AUTOMATICO"


def test_comparacion_entre_rondas():
    r1 = informe.ejecutar("Ley 100 de 1993. Nombre ______.", REF, sin_red=True)
    r2 = informe.ejecutar("Ley 100 de 1993. Nombre Juan.", REF, sin_red=True, previo=r1)
    k = r2["comparacion"]
    assert len(k["resueltos"]) == 1 and k["nuevos"] == [] and len(k["persistentes"]) == 1
    assert r2["ejecuciones_de_control"] == 2 and k["documento_cambio"]


# ---------- CLI e inventario ----------
def test_cli_codigos_de_salida_y_json(tmp_path, capsys):
    f = tmp_path / "e.txt"; f.write_text("Sin citas.", encoding="utf-8")
    out = tmp_path / "o.json"
    assert cli.main(["validar-escrito", str(f), "--sin-red", "--json", str(out)]) == 0
    assert json.load(open(out))["estado"] == "PASS_AUTOMATICO"
    f.write_text("Fecha 30 de febrero de 2020.", encoding="utf-8")
    assert cli.main(["validar-escrito", str(f), "--sin-red"]) == 2


def test_cli_pdf_rechazado(tmp_path):
    p = tmp_path / "a.pdf"; p.write_bytes(b"%PDF")
    assert cli.main(["validar-escrito", str(p)]) == 3


def test_cli_pdf_sin_extra_indica_como_instalarlo(tmp_path, monkeypatch):
    import sys
    monkeypatch.setitem(sys.modules, "pdfminer.high_level", None)
    p = tmp_path / "a.pdf"; p.write_bytes(b"%PDF-1.4 minimo")
    with pytest.raises(ValueError, match=r"extra pdf"):
        cli.leer_entrada(str(p))


def test_cli_pdf_con_contenido_no_pdf_se_rechaza(tmp_path):
    p = tmp_path / "a.pdf"; p.write_bytes(b"texto plano con extension pdf")
    with pytest.raises(ValueError, match="no es un PDF válido"):
        cli.leer_entrada(str(p))


def test_cli_pdf_corrupto_es_error_controlado(tmp_path):
    p = tmp_path / "a.pdf"; p.write_bytes(b"%PDF-1.4 no es pdf real")
    with pytest.raises(ValueError, match="No se pudo convertir el PDF"):
        cli.leer_entrada(str(p))


def test_cli_pdf_valido_extrae_texto(tmp_path):
    objs = [b"<< /Type /Catalog /Pages 2 0 R >>", b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
            b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 144] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
            b"<< /Length 44 >>\nstream\nBT /F1 18 Tf 20 100 Td (Ley 1581 de 2012) Tj ET\nendstream",
            b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"]
    out = b"%PDF-1.4\n"; offs = []
    for i, o in enumerate(objs, 1):
        offs.append(len(out)); out += f"{i} 0 obj\n".encode() + o + b"\nendobj\n"
    x = len(out)
    out += f"xref\n0 {len(objs)+1}\n0000000000 65535 f \n".encode() + b"".join(f"{o:010d} 00000 n \n".encode() for o in offs)
    out += f"trailer\n<< /Size {len(objs)+1} /Root 1 0 R >>\nstartxref\n{x}\n%%EOF\n".encode()
    p = tmp_path / "ok.pdf"; p.write_bytes(out)
    assert "Ley 1581 de 2012" in cli.leer_entrada(str(p))


def test_docx(tmp_path):
    import zipfile
    p = tmp_path / "a.docx"
    with zipfile.ZipFile(p, "w") as z:
        z.writestr("word/document.xml", "<w:document><w:p><w:r><w:t>Ver T-008 de 2020 &amp; más</w:t></w:r></w:p></w:document>")
    assert "T-008 de 2020 & más" in cli.leer_entrada(str(p))


def test_inventario_detecta_duplicados_por_contenido(tmp_path):
    (tmp_path / "escaneo_004.txt").write_text("igual"); (tmp_path / "FINAL_v3.txt").write_text("igual")
    (tmp_path / "otro.pdf").write_bytes(b"x")
    filas = inventario.inventariar(str(tmp_path))
    assert len(filas) == 3 and sum(1 for f in filas if f["duplicado_de"]) == 1
    assert any("requiere extraccion" in f["lectura"] for f in filas)


# ---------- defectos corregidos tras la revisión adversarial ----------
@pytest.mark.parametrize("texto,clave", [
    ("Decreto 2591/91", "decreto 2591 de 1991"), ("Decreto 2591/1991", "decreto 2591 de 1991"), ("Ley 100/93", "ley 100 de 1993"),
    ("Ley 1437/11", "ley 1437 de 2011"), ("Dec. 2591 de 1991", "decreto 2591 de 1991"), ("Resolución 1234/2020", "resolucion 1234 de 2020"),
])
def test_normas_con_barra_y_abreviaturas_se_detectan(texto, clave):
    assert [c.clave for c in extraer_citas(texto, REF)] == [clave]


def test_sentencia_sin_guion_y_sin_falsos_positivos():
    assert [c.clave for c in extraer_citas("la sentencia T 008 de 2020", REF)] == ["T-008/20"]
    assert extraer_citas("En 2020 hubo 12/20 casos, a 5 de mayo de 2020 y COVID-19", REF) == []


def test_referencias_a_constitucion_y_codigos_se_informan_sin_bloquear():
    i = informe.ejecutar("El artículo 29 de la Constitución Política y el Código General del Proceso.", REF, sin_red=True)
    assert i["referencias_no_verificables"] == ["Constitución Política", "Código General del Proceso"]
    assert [h["codigo"] for h in i["hallazgos"]].count("REFERENCIA_NO_VERIFICABLE") == 2 and i["estado"] == "PASS_AUTOMATICO"


def test_esquema_inesperado_de_socrata_nunca_da_no_encontrada():
    """Si las columnas del dataset no coinciden con los alias, ninguna sentencia real puede declararse inexistente."""
    def h(req):
        if "datos.gov.co" in str(req.url):
            return Resp(200, json=[{"col_x": "T-777/20", "col_y": "otro"}])
        return Resp(404)
    i = informe.ejecutar("Ver T-777 de 2020.", REF, cliente=ClienteSimulado(h))
    c = i["citas"][0]
    assert c["estado"] == "pendiente" and "esquema inesperado" in c["detalle"] and i["estado"] == "CONDITIONAL"
