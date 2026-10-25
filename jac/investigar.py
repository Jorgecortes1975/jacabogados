"""Bucle de investigación jurídica: varias rondas de `claude -p` con criterio de parada.

Cada ronda ejecuta la skill investigacion-juridica-colombia sobre la pregunta. El hook
PostToolUse (hooks/registrar-consulta.py) anota cada consulta `python3 -m jac` en
registro.jsonl. El bucle para cuando:

  1. una ronda devuelve ESTADO: COMPLETO o ESTADO: SIN_NUEVAS_FUENTES, o
  2. una ronda no añade ninguna entrada nueva al registro (parada por falta de avance), o
  3. se agotan las rondas.
"""
from __future__ import annotations

import json
import os
import shutil
import subprocess
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
MARCA_COMPLETO = "ESTADO: COMPLETO"
MARCA_SIN_NUEVAS = "ESTADO: SIN_NUEVAS_FUENTES"
MAX_RONDAS = 5


def _claude() -> str | None:
    # JAC_CLAUDE permite sustituir la CLI en pruebas sin llamar al modelo.
    return os.environ.get("JAC_CLAUDE") or shutil.which("claude")


def _lineas(registro: Path) -> int:
    if not registro.exists():
        return 0
    return sum(1 for _ in registro.open(encoding="utf8"))


def _resumen_registro(registro: Path, ultimas: int = 30) -> str:
    if not registro.exists():
        return "(ninguno)"
    filas = registro.read_text(encoding="utf8").splitlines()[-ultimas:]
    return "\n".join(filas) or "(ninguno)"


def _prompt(pregunta: str, ronda: int, rondas: int, registro: Path) -> str:
    return f"""Investigue con la skill investigacion-juridica-colombia del plugin jac-legal-os la siguiente pregunta de derecho colombiano:

{pregunta}

Ronda {ronda} de {rondas}. Registro de consultas de las rondas anteriores (no las repita; complete lo que falte):
{_resumen_registro(registro)}

Reglas de esta ronda:
1. Verifique cada cita con python3 -m jac (norma, sentencia o consulta). Pendiente no es inexistente.
2. Use las técnicas avanzadas de la skill que aún no aparezcan en el registro: ampliación de términos, encadenamiento de citas, búsqueda de contradicción y cortes por fecha.
3. Termine la respuesta con exactamente una de estas líneas:
   {MARCA_COMPLETO}  (la pregunta queda respondida con fuentes verificadas o marcadas como pendientes con razón)
   {MARCA_SIN_NUEVAS}  (esta ronda no aportó fuentes nuevas)
   ESTADO: CONTINUAR  (en otro caso)
4. Solo entregue el memorando completo si escribe COMPLETO. No invente citas, fechas ni radicados.
"""


def _ejecutar_ronda(prompt: str, registro: Path, modelo: str | None, max_turnos: int) -> str:
    claude = _claude()
    if not claude:
        raise FileNotFoundError("No se encontró la CLI `claude`. Instale Claude Code o defina JAC_CLAUDE.")
    cmd = [claude, "-p", prompt, "--plugin-dir", str(RAIZ), "--max-turns", str(max_turnos),
           "--allowedTools", "Bash(python3 -m jac:*)", "Read", "Glob", "Grep", "WebFetch", "WebSearch"]
    if modelo:
        cmd += ["--model", modelo]
    env = {**os.environ,
           "PYTHONPATH": str(RAIZ) + os.pathsep + os.environ.get("PYTHONPATH", ""),
           "JAC_REGISTRO": str(registro)}
    resultado = subprocess.run(cmd, env=env, capture_output=True, text=True, timeout=1800)
    return resultado.stdout


def _estado(salida: str) -> str:
    for linea in reversed(salida.strip().splitlines()):
        linea = linea.strip()
        if linea in (MARCA_COMPLETO, MARCA_SIN_NUEVAS, "ESTADO: CONTINUAR"):
            return linea.removeprefix("ESTADO: ")
    return "SIN_MARCA"


def investigar(pregunta: str, rondas: int = 3, salida: Path | None = None,
               modelo: str | None = None, max_turnos: int = 30) -> dict:
    rondas = max(1, min(rondas, MAX_RONDAS))
    salida = salida or RAIZ / "investigaciones" / "ultima"
    salida.mkdir(parents=True, exist_ok=True)
    registro = salida / "registro.jsonl"
    registro.write_text("", encoding="utf8")

    historial = []
    estado_final = "AGOTADAS_RONDAS"
    texto = ""
    for ronda in range(1, rondas + 1):
        antes = _lineas(registro)
        texto = _ejecutar_ronda(_prompt(pregunta, ronda, rondas, registro), registro, modelo, max_turnos)
        (salida / f"ronda-{ronda}.md").write_text(texto, encoding="utf8")
        estado = _estado(texto)
        nuevas = _lineas(registro) - antes
        historial.append({"ronda": ronda, "estado": estado, "consultas_nuevas": nuevas})
        if estado in ("COMPLETO", "SIN_NUEVAS_FUENTES"):
            estado_final = estado
            break
        if nuevas == 0:
            estado_final = "SIN_AVANCE"
            break

    (salida / "memorando.md").write_text(texto, encoding="utf8")
    resumen = {"pregunta": pregunta, "estado": estado_final, "rondas": historial,
               "consultas_registradas": _lineas(registro), "salida": str(salida)}
    (salida / "resumen.json").write_text(json.dumps(resumen, ensure_ascii=False, indent=2), encoding="utf8")
    return resumen
