import asyncio
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from fabrica_legal import servidor  # noqa: E402


class ServidorMCP(unittest.TestCase):
    def test_expone_las_herramientas_de_calculo_y_de_fuentes(self):
        nombres = {t.name for t in asyncio.run(servidor.mcp.list_tools())}
        self.assertEqual(nombres, {
            "calcular_termino_judicial_colombia",
            "liquidar_contrato_laboral_colombia",
            "proyectar_costo_jornada_ley_2101",
            "generar_tabla_amortizacion_credito",
            "convertir_smlmv_uvt_colombia",
            "buscar_jurisprudencia_cc",
            "texto_sentencia_cc",
            "confirmar_norma_oficial",
            "estado_fuentes_oficiales",
        })

    def test_expediente_inexistente_detiene_redaccion(self):
        texto = servidor.cargar_constitucion_expediente("CASO-QUE-NO-EXISTE")
        self.assertTrue(texto.startswith("ERROR_CRITICO"))


if __name__ == "__main__":
    unittest.main()
