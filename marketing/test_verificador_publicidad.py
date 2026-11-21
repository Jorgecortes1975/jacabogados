import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import verificador_publicidad as v  # noqa: E402

ADN_MINIMO = """# ADN

## 4. Normas citables

| Norma | Artículo | Estado | Fuente | Fecha |
|---|---|---|---|---|
| Ley 1123 de 2007 (Código Disciplinario del Abogado) | Arts. 28, 34, 35 | VERIFICADO SUIN | https://www.suin-juriscol.gov.co | 2026-11-21 |
| Ley 1581 de 2012 (Habeas Data) | PENDIENTE | PENDIENTE DE VERIFICACIÓN | PENDIENTE | PENDIENTE |

## 5. Prohibiciones
"""

REGISTRO_PASS = "Estado: PASS\nRevisor: Consejo independiente\nFecha de revisión: 2026-11-21\n"


def pieza(cuerpo: str, registro: str = REGISTRO_PASS) -> str:
    return f"## Pieza 1. Prueba\n\n{cuerpo}\n\n{v.DISCLAIMER}\n\n{registro}"


class VerificadorTest(unittest.TestCase):
    def evaluar(self, texto):
        return v.evaluar_documento(texto, ADN_MINIMO)[0]

    def test_pieza_limpia_es_apta(self):
        nombre, estado, hall = self.evaluar(pieza("Texto informativo general sobre la organización de documentos."))
        self.assertEqual(estado, "APTA", hall)

    def test_promesa_de_resultado_no_apta(self):
        _, estado, _ = self.evaluar(pieza("Garantizamos el éxito de su proceso."))
        self.assertEqual(estado, "NO APTA")

    def test_placeholder_no_apta(self):
        _, estado, _ = self.evaluar(pieza("Atendemos en [HORARIO PENDIENTE]."))
        self.assertEqual(estado, "NO APTA")

    def test_correo_no_apta_y_no_se_imprime(self):
        _, estado, hall = self.evaluar(pieza("Escriba a contacto@ejemplo.com para su caso."))
        self.assertEqual(estado, "NO APTA")
        self.assertFalse(any("contacto@ejemplo.com" in h[2] for h in hall))

    def test_falta_aclaracion_no_apta(self):
        texto = f"## Pieza 1. Prueba\n\nTexto general.\n\n{REGISTRO_PASS}"
        _, estado, hall = v.evaluar_documento(texto, ADN_MINIMO)[0]
        self.assertEqual(estado, "NO APTA")
        self.assertTrue(any("aclaración" in h[2] for h in hall))

    def test_norma_no_verificada_no_apta(self):
        _, estado, hall = self.evaluar(pieza("Según la Ley 1581 de 2012 los datos requieren autorización."))
        self.assertEqual(estado, "NO APTA")
        self.assertTrue(any("ley 1581 de 2012" in h[2] for h in hall))

    def test_norma_verificada_no_bloquea_por_norma(self):
        _, _, hall = self.evaluar(pieza("Según la Ley 1123 de 2007 el abogado debe actuar con lealtad."))
        self.assertFalse(any("sin verificación" in h[2] for h in hall))

    def test_independiente_no_es_pendiente(self):
        _, estado, hall = self.evaluar(pieza("Texto informativo general."))
        self.assertEqual(estado, "APTA", hall)

    def test_sin_registro_pass_no_apta(self):
        _, estado, _ = self.evaluar(pieza("Texto informativo general.", registro="Estado: CONDITIONAL\nRevisor: X\nFecha de revisión: 2026-11-21\n"))
        self.assertEqual(estado, "NO APTA")

    def test_frase_de_riesgo_da_revisar(self):
        _, estado, _ = self.evaluar(pieza("Organizar sus documentos le ahorra tiempo."))
        self.assertEqual(estado, "REVISAR")

    def test_providencia_no_apta(self):
        _, estado, _ = self.evaluar(pieza("La Sentencia T-123 de 2020 lo confirma."))
        self.assertEqual(estado, "NO APTA")


if __name__ == "__main__":
    unittest.main()
