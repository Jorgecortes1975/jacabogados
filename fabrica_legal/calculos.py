"""Motor determinista de la Fábrica Legal Digital.

Toda aritmética de fechas, términos, prestaciones, jornada y amortización se
resuelve aquí con Decimal o date, nunca por predicción de texto de un modelo.

Parámetros que cambian por vigencia (SMLMV, auxilio de transporte) no se fijan
en el código: son argumentos obligatorios de cada cálculo que los necesita.
Las cifras transcritas de calendario y parámetros legales quedan marcadas con
PENDIENTE DE VERIFICACIÓN cuando no se confirmaron en fuente oficial.
"""

from datetime import date, datetime, timedelta
from decimal import ROUND_HALF_UP, Decimal, getcontext
from typing import Dict, List, Literal

getcontext().prec = 28

CENTAVO = Decimal("0.01")

# PENDIENTE DE VERIFICACIÓN contra calendario oficial de festivos 2026
# (Ley 51 de 1983). Transcrito del manual de la Fábrica Legal Digital.
FESTIVOS_COLOMBIA_2026 = frozenset({
    date(2026, 1, 1), date(2026, 1, 12), date(2026, 3, 23), date(2026, 4, 2),
    date(2026, 4, 3), date(2026, 5, 1), date(2026, 5, 18), date(2026, 6, 8),
    date(2026, 6, 15), date(2026, 6, 29), date(2026, 7, 20), date(2026, 8, 7),
    date(2026, 8, 17), date(2026, 10, 12), date(2026, 11, 2), date(2026, 11, 16),
    date(2026, 12, 8), date(2026, 12, 25),
})

TipoNotificacion = Literal[
    "ESTADO_ELECTRONICO_CGP",
    "PERSONAL_ELECTRONICA_LEY_2213",
    "PERSONAL_CPACA_CON_TRASLADO",
    "ESTRADOS_AUDIENCIA",
    "TERMINO_ADMINISTRATIVO_DIAS_HABILES",
]


def _redondear(valor: Decimal) -> str:
    return str(valor.quantize(CENTAVO, rounding=ROUND_HALF_UP))


def _dias360(inicio: date, fin: date) -> int:
    """Días comerciales 30/360 inclusivos, base de la liquidación laboral."""
    d1 = min(inicio.day, 30)
    d2 = fin.day
    if d2 == 31 and d1 == 30:
        d2 = 30
    return (fin.year - inicio.year) * 360 + (fin.month - inicio.month) * 30 + (d2 - d1) + 1


# ---------------------------------------------------------------------------
# 1. Términos judiciales y administrativos
# ---------------------------------------------------------------------------

def es_dia_habil_judicial(fecha: date, incluir_vacancia: bool = True) -> bool:
    """Día hábil judicial. Excluye fines de semana y festivos de FESTIVOS_COLOMBIA_2026.

    La vacancia judicial de fin de año (20 de diciembre a 10 de enero) y el 17 de
    diciembre se excluyen cuando incluir_vacancia es True. PENDIENTE DE VERIFICACIÓN:
    la norma que las fija debe confirmarse en fuente oficial antes de usar el cómputo.
    """
    if fecha.weekday() >= 5 or fecha in FESTIVOS_COLOMBIA_2026:
        return False
    if incluir_vacancia:
        if (fecha.month == 12 and fecha.day >= 20) or (fecha.month == 1 and fecha.day <= 10):
            return False
        if fecha.month == 12 and fecha.day == 17:
            return False
    return True


def calcular_termino_judicial(
    fecha_evento: date,
    tipo_notificacion: TipoNotificacion,
    dias_habiles_termino: int,
) -> Dict:
    """Calcula inicio, notificación efectiva y vencimiento de un término en días hábiles.

    Notificación personal electrónica: se cuentan dos días hábiles tras el envío
    antes de que la notificación se entienda surtida (Art. 8 Ley 2213 de 2022,
    según el manual). El término empieza el día hábil siguiente.
    """
    if dias_habiles_termino < 1:
        raise ValueError("dias_habiles_termino debe ser al menos 1")

    incluir_vacancia = tipo_notificacion != "TERMINO_ADMINISTRATIVO_DIAS_HABILES"
    cursor = fecha_evento
    dias_gracia = 0

    if tipo_notificacion in ("PERSONAL_ELECTRONICA_LEY_2213", "PERSONAL_CPACA_CON_TRASLADO"):
        while dias_gracia < 2:
            cursor += timedelta(days=1)
            if es_dia_habil_judicial(cursor, incluir_vacancia):
                dias_gracia += 1
        fecha_notificacion = cursor
    else:
        fecha_notificacion = fecha_evento

    traza: List[str] = []
    while len(traza) < dias_habiles_termino:
        cursor += timedelta(days=1)
        if es_dia_habil_judicial(cursor, incluir_vacancia):
            traza.append(cursor.isoformat())

    alerta_index = max(0, len(traza) - 3)
    return {
        "fecha_evento_inicial": fecha_evento.isoformat(),
        "tipo_notificacion_aplicada": tipo_notificacion,
        "fecha_notificacion_efectiva": fecha_notificacion.isoformat(),
        "primer_dia_habil_del_termino": traza[0],
        "fecha_alerta_preentrega_socio_48h": f"{traza[alerta_index]}T08:00:00-05:00",
        "fecha_vencimiento_fatal": f"{traza[-1]}T17:00:00-05:00",
        "total_dias_habiles_computados": len(traza),
        "calendario_dias_habiles_recorridos": traza,
        "advertencia": "PENDIENTE DE VERIFICACIÓN: festivos, vacancia judicial y norma aplicable al tipo de término.",
    }


# ---------------------------------------------------------------------------
# 2. Liquidación laboral (CST) con parámetros de vigencia explícitos
# ---------------------------------------------------------------------------

def liquidar_contrato_laboral(
    fecha_inicio: date,
    fecha_terminacion: date,
    salario_basico_mensual: Decimal,
    smlmv: Decimal,
    auxilio_transporte: Decimal,
    aplica_auxilio_transporte: bool,
    tipo_contrato: Literal["INDEFINIDO", "FIJO", "OBRA_LABOR"],
    con_justa_causa: bool,
    dias_vacaciones_pendientes: int,
    fecha_vencimiento_fijo: date | None = None,
) -> Dict:
    """Prestaciones del último período e indemnización del Art. 64 CST.

    dias_vacaciones_pendientes es un dato del expediente, no un valor por defecto:
    el cálculo de vacaciones usa esa cifra y el Art. 186 CST fija 15 días hábiles
    por año de servicio, de modo que el dato debe comprobarse antes de liquidar.
    """
    if fecha_terminacion < fecha_inicio:
        raise ValueError("La fecha de terminación es anterior a la de inicio")

    aux = auxilio_transporte if (aplica_auxilio_transporte and salario_basico_mensual <= smlmv * 2) else Decimal("0")
    base_prestacional = salario_basico_mensual + aux

    total_vinculo = _dias360(fecha_inicio, fecha_terminacion)
    inicio_anio = max(fecha_inicio, date(fecha_terminacion.year, 1, 1))
    dias_anio = _dias360(inicio_anio, fecha_terminacion)
    inicio_semestre = max(
        fecha_inicio,
        date(fecha_terminacion.year, 7, 1) if fecha_terminacion.month >= 7 else date(fecha_terminacion.year, 1, 1),
    )
    dias_semestre = _dias360(inicio_semestre, fecha_terminacion)

    cesantias = base_prestacional * Decimal(dias_anio) / Decimal(360)
    intereses = cesantias * Decimal(dias_anio) * Decimal("0.12") / Decimal(360)
    prima = base_prestacional * Decimal(dias_semestre) / Decimal(360)
    vacaciones = salario_basico_mensual * Decimal(dias_vacaciones_pendientes) / Decimal(720)

    indemnizacion = Decimal("0")
    dias_indemnizacion = Decimal("0")
    salario_diario = salario_basico_mensual / Decimal(30)

    if not con_justa_causa:
        if tipo_contrato == "INDEFINIDO":
            anios = Decimal(total_vinculo) / Decimal(360)
            if salario_basico_mensual < smlmv * 10:
                tasa_adicional = Decimal(20)
                primer_anio = Decimal(30)
            else:
                tasa_adicional = Decimal(15)
                primer_anio = Decimal(20)
            if anios <= 1:
                dias_indemnizacion = primer_anio
            else:
                dias_indemnizacion = primer_anio + (anios - 1) * tasa_adicional
            indemnizacion = dias_indemnizacion * salario_diario
        elif tipo_contrato == "FIJO" and fecha_vencimiento_fijo:
            # PENDIENTE DE REVISIÓN POR ABOGADO: aproximación 30/360 de los salarios
            # que faltan hasta el vencimiento del plazo fijo.
            faltan = max(0, _dias360(fecha_terminacion, fecha_vencimiento_fijo) - 1)
            dias_indemnizacion = Decimal(faltan)
            indemnizacion = dias_indemnizacion * salario_diario

    total = cesantias + intereses + prima + vacaciones + indemnizacion
    return {
        "parametros": {
            "dias_vinculo_360": total_vinculo,
            "dias_cesantias_anio": dias_anio,
            "dias_prima_semestre": dias_semestre,
            "salario_basico_mensual_cop": _redondear(salario_basico_mensual),
            "auxilio_transporte_aplicado_cop": _redondear(aux),
            "base_prestacional_cop": _redondear(base_prestacional),
            "smlmv_usado_cop": _redondear(smlmv),
        },
        "conceptos_cop": {
            "cesantias": _redondear(cesantias),
            "intereses_sobre_cesantias": _redondear(intereses),
            "prima_de_servicios": _redondear(prima),
            "vacaciones_compensadas": _redondear(vacaciones),
            "indemnizacion_art_64_cst": _redondear(indemnizacion),
            "dias_indemnizacion": str(dias_indemnizacion.quantize(CENTAVO)),
        },
        "total_cop": _redondear(total),
    }


# ---------------------------------------------------------------------------
# 3. Jornada Ley 2101 de 2021 y recargos (CST Arts. 168 y 179)
# ---------------------------------------------------------------------------

def proyectar_costo_jornada(
    salario_mensual: Decimal,
    horas_extras_diurnas: Decimal = Decimal(0),
    horas_extras_nocturnas: Decimal = Decimal(0),
    horas_recargo_nocturno_ordinario: Decimal = Decimal(0),
    horas_dominicales_festivas_diurnas: Decimal = Decimal(0),
) -> Dict:
    """Valor de hora y recargos con divisor 220 (44 h) frente a 210 (42 h)."""
    hora_44 = salario_mensual / Decimal(220)
    hora_42 = salario_mensual / Decimal(210)
    recargos = (
        hora_42 * Decimal("1.25") * horas_extras_diurnas
        + hora_42 * Decimal("1.75") * horas_extras_nocturnas
        + hora_42 * Decimal("0.35") * horas_recargo_nocturno_ordinario
        + hora_42 * Decimal("1.75") * horas_dominicales_festivas_diurnas
    )
    return {
        "jornada_vigente": "42 horas semanales (Ley 2101 de 2021, desde el 15 de julio de 2026)",
        "valor_hora_44h_cop": _redondear(hora_44),
        "valor_hora_42h_cop": _redondear(hora_42),
        "incremento_porcentual_hora": f"{((Decimal(220) / Decimal(210) - 1) * 100).quantize(CENTAVO)}%",
        "total_recargos_y_extras_cop": _redondear(recargos),
        "total_devengado_proyectado_cop": _redondear(salario_mensual + recargos),
    }


# ---------------------------------------------------------------------------
# 4. Amortización de créditos
# ---------------------------------------------------------------------------

def generar_tabla_amortizacion(
    capital: Decimal,
    tasa_efectiva_anual: Decimal,
    plazo_meses: int,
    sistema: Literal["CUOTA_FIJA_FRANCES", "ABONO_CONSTANTE_CAPITAL_ALEMAN"],
) -> Dict:
    """Tabla de amortización con TEM = (1 + TEA)^(1/12) - 1 en Decimal."""
    if plazo_meses < 1:
        raise ValueError("plazo_meses debe ser al menos 1")
    tea = tasa_efectiva_anual / Decimal(100)
    tem = (Decimal(1) + tea) ** (Decimal(1) / Decimal(12)) - 1

    saldo = capital
    tabla = []
    intereses_total = Decimal(0)

    if sistema == "CUOTA_FIJA_FRANCES":
        factor = (Decimal(1) + tem) ** plazo_meses
        cuota = capital * (tem * factor) / (factor - 1)
        for mes in range(1, plazo_meses + 1):
            interes = saldo * tem
            abono = cuota - interes
            if mes == plazo_meses:
                abono = saldo
                cuota = abono + interes
            saldo -= abono
            intereses_total += interes
            tabla.append((mes, cuota, interes, abono, max(Decimal(0), saldo)))
    else:
        abono_fijo = capital / Decimal(plazo_meses)
        for mes in range(1, plazo_meses + 1):
            interes = saldo * tem
            saldo -= abono_fijo
            intereses_total += interes
            tabla.append((mes, abono_fijo + interes, interes, abono_fijo, max(Decimal(0), saldo)))

    return {
        "capital_cop": _redondear(capital),
        "tasa_efectiva_anual": f"{tasa_efectiva_anual}%",
        "tasa_efectiva_mensual": f"{(tem * 100).quantize(Decimal('0.0001'))}%",
        "total_intereses_cop": _redondear(intereses_total),
        "total_pagado_cop": _redondear(capital + intereses_total),
        "tabla": [
            {
                "periodo_mes": m,
                "cuota_cop": _redondear(c),
                "interes_cop": _redondear(i),
                "abono_capital_cop": _redondear(a),
                "saldo_final_cop": _redondear(s),
            }
            for (m, c, i, a, s) in tabla
        ],
    }


# ---------------------------------------------------------------------------
# 5. Conversión SMLMV / UVT
# ---------------------------------------------------------------------------

def convertir_smlmv_uvt(cantidad: Decimal, unidad: Literal["SMLMV", "UVT", "COP"],
                        smlmv: Decimal, uvt: Decimal) -> Dict:
    """Convierte entre SMLMV, UVT y pesos con los valores que el llamador confirme."""
    if unidad == "SMLMV":
        pesos = cantidad * smlmv
    elif unidad == "UVT":
        pesos = cantidad * uvt
    else:
        pesos = cantidad
    return {
        "cop": _redondear(pesos),
        "smlmv_equivalentes": str((pesos / smlmv).quantize(Decimal("0.0001"))),
        "uvt_equivalentes": str((pesos / uvt).quantize(Decimal("0.0001"))),
        "smlmv_usado_cop": _redondear(smlmv),
        "uvt_usada_cop": _redondear(uvt),
    }
