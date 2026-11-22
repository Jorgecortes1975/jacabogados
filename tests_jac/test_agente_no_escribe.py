"""Regresión: los comandos del agente de Node no modifican mcp-config.json.

El archivo está versionado. Activar el agente, listar fuentes o consultar una norma
no deben cambiarlo. La prueba trabaja sobre una copia temporal, nunca sobre el repositorio.
"""
import os
import shutil
import subprocess
from pathlib import Path

import pytest

RAIZ = Path(__file__).resolve().parent.parent
AGENTE = RAIZ / "agente-juridico-especializado.js"
CONFIG = RAIZ / "mcp-config.json"

node = shutil.which("node")
pytestmark = pytest.mark.skipif(node is None, reason="node no está disponible")


@pytest.fixture
def copia(tmp_path):
    shutil.copy(AGENTE, tmp_path / AGENTE.name)
    shutil.copy(CONFIG, tmp_path / CONFIG.name)
    return tmp_path


@pytest.mark.parametrize("argumentos", [
    ["activar"],
    ["fuentes"],
    ["consulta", "norma", "Ley 1437 de 2011"],
])
def test_comando_no_modifica_mcp_config(copia, argumentos):
    antes = (copia / CONFIG.name).read_bytes()
    # El agente invoca `python3 -m normas_col` desde el directorio actual; la copia temporal
    # no contiene ese paquete, así que se expone la raíz del repositorio con PYTHONPATH.
    entorno = {**os.environ, "PYTHONPATH": str(RAIZ)}
    resultado = subprocess.run(
        [node, str(copia / AGENTE.name), *argumentos],
        cwd=copia, env=entorno, capture_output=True, text=True, timeout=60,
    )
    assert resultado.returncode == 0, resultado.stderr
    assert (copia / CONFIG.name).read_bytes() == antes


def test_consulta_funciona_desde_otro_directorio(tmp_path):
    # El agente resuelve la raíz por su propia ruta: no depende del directorio actual
    # ni de que PYTHONPATH esté definido.
    entorno = {k: v for k, v in os.environ.items() if k != "PYTHONPATH"}
    antes = CONFIG.read_bytes()
    resultado = subprocess.run(
        [node, str(AGENTE), "consulta", "norma", "Ley 1437 de 2011"],
        cwd=tmp_path, env=entorno, capture_output=True, text=True, timeout=60,
    )
    assert resultado.returncode == 0, resultado.stderr
    assert '"estado": "verificada"' in resultado.stdout
    assert CONFIG.read_bytes() == antes
