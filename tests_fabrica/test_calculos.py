import sys
import unittest
from datetime import date
from decimal import Decimal
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from fabrica_legal import calculos as c  # noqa: E402


class TerminosJudiciales(unittest.TestCase):
    def test_simulacion_manual_notificacion_personal_ley_2213(self):
        r = c.calcular_termino_judicial(date(2026, 10, 13), "PERSONAL_ELECTRONICA_LEY_2213", 10)
        self.assertEqual(r["fecha_notificacion_efectiva"], "2026-10-15")
        self.assertEqual(r["primer_dia_habil_del_termino"], "2026-10-16")
        self.assertEqual(r["fecha_vencimiento_fatal"], "2026-10-29T17:00:00-05:00")
        self.assertEqual(r["fecha_alerta_preentrega_socio_48h"], "2026-10-27T08:00:00-05:00")
        self.assertEqual(r["total_dias_habiles_computados"], 10)

    def test_festivo_no_cuenta(self):
        # 12 de octubre de 2026 es festivo: el término de estado del 9 de octubre empieza el 13.
        r = c.calcular_termino_judicial(date(2026, 10, 9), "ESTADO_ELECTRONICO_CGP", 1)
        self.assertEqual(r["primer_dia_habil_del_termino"], "2026-10-13")

    def test_vacancia_judicial_excluida(self):
        self.assertFalse(c.es_dia_habil_judicial(date(2026, 12, 28)))
        self.assertTrue(c.es_dia_habil_judicial(date(2026, 12, 28), incluir_vacancia=False))

    def test_termino_cero_falla(self):
        with self.assertRaises(ValueError):
            c.calcular_termino_judicial(date(2026, 10, 13), "ESTADO_ELECTRONICO_CGP", 0)


class DiasComerciales(unittest.TestCase):
    def test_dias360_inclusivos(self):
        self.assertEqual(c._dias360(date(2026, 1, 1), date(2026, 9, 30)), 270)
        self.assertEqual(c._dias360(date(2026, 7, 1), date(2026, 9, 30)), 90)
        self.assertEqual(c._dias360(date(2021, 3, 15), date(2026, 9, 30)), 1996)


class LiquidacionLaboral(unittest.TestCase):
    def setUp(self):
        # Simulación del manual. Auxilio y SMLMV son entradas explícitas; el manual
        # no las verificó y aquí no se fijan por defecto.
        self.parametros = dict(
            fecha_inicio=date(2021, 3, 15),
            fecha_terminacion=date(2026, 9, 30),
            salario_basico_mensual=Decimal("3850000"),
            smlmv=Decimal("1750905"),
            auxilio_transporte=Decimal("249095"),
            aplica_auxilio_transporte=False,
            tipo_contrato="INDEFINIDO",
            con_justa_causa=False,
            dias_vacaciones_pendientes=270,
        )

    def test_conceptos_coinciden_con_simulacion_manual(self):
        r = c.liquidar_contrato_laboral(**self.parametros)["conceptos_cop"]
        self.assertEqual(r["cesantias"], "2887500.00")
        self.assertEqual(r["intereses_sobre_cesantias"], "259875.00")
        self.assertEqual(r["prima_de_servicios"], "962500.00")
        self.assertEqual(r["vacaciones_compensadas"], "1443750.00")

    def test_indemnizacion_art_64_menos_de_diez_smlmv(self):
        r = c.liquidar_contrato_laboral(**self.parametros)
        dias = Decimal(r["conceptos_cop"]["dias_indemnizacion"])
        # 30 días el primer año + 20 por cada año adicional, sobre 5,5444 años.
        esperado = Decimal(30) + (Decimal(1996) / Decimal(360) - 1) * Decimal(20)
        self.assertAlmostEqual(float(dias), float(esperado), places=2)

    def test_aux_transporte_solo_si_salario_no_supera_dos_smlmv(self):
        p = dict(self.parametros, aplica_auxilio_transporte=True, salario_basico_mensual=Decimal("1000000"))
        r = c.liquidar_contrato_laboral(**p)["parametros"]
        self.assertEqual(r["auxilio_transporte_aplicado_cop"], "249095.00")
        p["salario_basico_mensual"] = Decimal("3850000")
        r = c.liquidar_contrato_laboral(**p)["parametros"]
        self.assertEqual(r["auxilio_transporte_aplicado_cop"], "0.00")

    def test_fecha_terminacion_anterior_falla(self):
        p = dict(self.parametros, fecha_terminacion=date(2020, 1, 1))
        with self.assertRaises(ValueError):
            c.liquidar_contrato_laboral(**p)


class Jornada(unittest.TestCase):
    def test_valor_hora_42_y_43_horas(self):
        r = c.proyectar_costo_jornada(Decimal("2100000"))
        self.assertEqual(r["valor_hora_44h_cop"], "9545.45")
        self.assertEqual(r["valor_hora_42h_cop"], "10000.00")
        self.assertEqual(r["incremento_porcentual_hora"], "4.76%")

    def test_recargo_nocturno_ordinario(self):
        r = c.proyectar_costo_jornada(Decimal("2100000"), horas_recargo_nocturno_ordinario=Decimal(10))
        self.assertEqual(r["total_recargos_y_extras_cop"], "35000.00")


class Amortizacion(unittest.TestCase):
    def test_frances_salda_capital(self):
        r = c.generar_tabla_amortizacion(Decimal("10000000"), Decimal("12"), 12, "CUOTA_FIJA_FRANCES")
        self.assertEqual(r["tabla"][-1]["saldo_final_cop"], "0.00")
        self.assertEqual(len(r["tabla"]), 12)

    def test_aleman_abono_constante(self):
        r = c.generar_tabla_amortizacion(Decimal("12000000"), Decimal("12"), 12, "ABONO_CONSTANTE_CAPITAL_ALEMAN")
        self.assertEqual(r["tabla"][0]["abono_capital_cop"], "1000000.00")
        self.assertEqual(r["tabla"][-1]["saldo_final_cop"], "0.00")


class Conversion(unittest.TestCase):
    def test_smlmv_a_cop_con_valor_explicito(self):
        r = c.convertir_smlmv_uvt(Decimal(2), "SMLMV", smlmv=Decimal("1750905"), uvt=Decimal("52374"))
        self.assertEqual(r["cop"], "3501810.00")


if __name__ == "__main__":
    unittest.main()
