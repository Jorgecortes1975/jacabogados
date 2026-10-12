from jurisprudencia_col import registro

CAMPOS = {"claves", "corporacion", "numero", "fecha", "radicado", "ponente", "estado", "decision", "regla", "limites"}


def test_registro_carga_y_tiene_campos():
    fichas = registro.cargar()
    assert len(fichas) >= 4
    for f in fichas:
        assert CAMPOS <= set(f)
        assert f["estado"] in {"VERIFICADA_EN_RELATORIA_Y_TEXTO", "VERIFICADA_EN_TEXTO_APORTADO"}


def test_busqueda_por_clave_y_ausencia():
    assert registro.buscar("C-683 de 2014")["numero"] == "C-683/14"
    assert registro.buscar("SC4855-2021")["estado"] == "VERIFICADA_EN_TEXTO_APORTADO"
    assert registro.buscar("T-000/99") is None
