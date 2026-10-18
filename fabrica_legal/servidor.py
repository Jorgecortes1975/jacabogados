"""Servidor MCP de la Fábrica Legal Digital (FastMCP).

Expone el motor determinista de fabrica_legal.calculos como herramientas de solo
lectura. Los importes llegan como texto para conservar la precisión decimal.

Herramientas que el manual nombra y no se implementan aquí, porque requieren
servicios externos que no existen en este repositorio: mcp_ocr_expediente
(OCR de estados electrónicos) y agendar_vencimiento_critico (Google Calendar).
"""

from datetime import date
from decimal import Decimal
from pathlib import Path
from typing import Literal, Optional

from mcp.types import ToolAnnotations

from fabrica_legal import calculos

try:  # mcp 2.x
    from mcp.server.mcpserver import MCPServer as _Servidor
except ImportError:  # mcp 1.x
    from mcp.server.fastmcp import FastMCP as _Servidor

mcp = _Servidor("JAC-Fabrica-Legal-Colombia")

SOLO_LECTURA = ToolAnnotations(readOnlyHint=True, destructiveHint=False, idempotentHint=True)


@mcp.tool(annotations=SOLO_LECTURA)
def calcular_termino_judicial_colombia(
    fecha_evento_iso: str,
    tipo_notificacion: calculos.TipoNotificacion,
    dias_habiles_termino: int,
) -> dict:
    """Vencimiento de un término en días hábiles con vacancia y festivos. PENDIENTE DE VERIFICACIÓN de norma y calendario."""
    return calculos.calcular_termino_judicial(date.fromisoformat(fecha_evento_iso), tipo_notificacion, dias_habiles_termino)


@mcp.tool(annotations=SOLO_LECTURA)
def liquidar_contrato_laboral_colombia(
    fecha_inicio_iso: str,
    fecha_terminacion_iso: str,
    salario_basico_mensual_cop: str,
    smlmv_cop: str,
    auxilio_transporte_cop: str,
    aplica_auxilio_transporte: bool,
    tipo_contrato: Literal["INDEFINIDO", "FIJO", "OBRA_LABOR"],
    con_justa_causa: bool,
    dias_vacaciones_pendientes: int,
    fecha_vencimiento_fijo_iso: Optional[str] = None,
) -> dict:
    """Prestaciones e indemnización del Art. 64 CST. SMLMV y auxilio son obligatorios y deben estar verificados para la vigencia."""
    return calculos.liquidar_contrato_laboral(
        fecha_inicio=date.fromisoformat(fecha_inicio_iso),
        fecha_terminacion=date.fromisoformat(fecha_terminacion_iso),
        salario_basico_mensual=Decimal(salario_basico_mensual_cop),
        smlmv=Decimal(smlmv_cop),
        auxilio_transporte=Decimal(auxilio_transporte_cop),
        aplica_auxilio_transporte=aplica_auxilio_transporte,
        tipo_contrato=tipo_contrato,
        con_justa_causa=con_justa_causa,
        dias_vacaciones_pendientes=dias_vacaciones_pendientes,
        fecha_vencimiento_fijo=date.fromisoformat(fecha_vencimiento_fijo_iso) if fecha_vencimiento_fijo_iso else None,
    )


@mcp.tool(annotations=SOLO_LECTURA)
def proyectar_costo_jornada_ley_2101(
    salario_mensual_cop: str,
    horas_extras_diurnas: str = "0",
    horas_extras_nocturnas: str = "0",
    horas_recargo_nocturno_ordinario: str = "0",
    horas_dominicales_festivas_diurnas: str = "0",
) -> dict:
    """Valor de hora y recargos con jornada de 42 horas (divisor 210) frente a 44 horas (divisor 220)."""
    return calculos.proyectar_costo_jornada(
        Decimal(salario_mensual_cop),
        Decimal(horas_extras_diurnas),
        Decimal(horas_extras_nocturnas),
        Decimal(horas_recargo_nocturno_ordinario),
        Decimal(horas_dominicales_festivas_diurnas),
    )


@mcp.tool(annotations=SOLO_LECTURA)
def generar_tabla_amortizacion_credito(
    capital_cop: str,
    tasa_efectiva_anual_porcentaje: str,
    plazo_meses: int,
    sistema: Literal["CUOTA_FIJA_FRANCES", "ABONO_CONSTANTE_CAPITAL_ALEMAN"],
) -> dict:
    """Tabla de amortización con conversión EA a EM en Decimal."""
    return calculos.generar_tabla_amortizacion(
        Decimal(capital_cop), Decimal(tasa_efectiva_anual_porcentaje), plazo_meses, sistema
    )


@mcp.tool(annotations=SOLO_LECTURA)
def convertir_smlmv_uvt_colombia(
    cantidad: str,
    unidad: Literal["SMLMV", "UVT", "COP"],
    smlmv_cop: str,
    uvt_cop: str,
) -> dict:
    """Convierte SMLMV, UVT o pesos usando los valores que el llamador confirme para la vigencia."""
    return calculos.convertir_smlmv_uvt(Decimal(cantidad), unidad, Decimal(smlmv_cop), Decimal(uvt_cop))


@mcp.resource("expediente://{expediente_id}/constitucion")
def cargar_constitucion_expediente(expediente_id: str) -> str:
    """EXPEDIENTE.md del caso, para montarlo en el contexto antes de redactar."""
    ruta = Path("expedientes_activos") / expediente_id / "EXPEDIENTE.md"
    if not ruta.exists():
        return (
            f"ERROR_CRITICO: no existe EXPEDIENTE.md para el caso {expediente_id}. "
            "Detener la redacción y solicitar la ficha fáctica."
        )
    return ruta.read_text(encoding="utf-8")


if __name__ == "__main__":
    mcp.run()
