import json
import re
import zipfile
from pathlib import Path

import pytest

from jac import autoprueba, cli, empaquetar
from jac.enrutador import enrutar

RAIZ = Path(__file__).resolve().parent.parent


def test_enrutador(tmp_path):
    f = tmp_path / "e.txt"; f.write_text("x")
    assert enrutar(str(tmp_path)) == "inventario" and enrutar(str(f)) == "validar_archivo"
    assert enrutar("Ley 1437 de 2011") == "verificar_citas" and enrutar("T-008/20") == "verificar_citas"
    assert enrutar("jurisprudencia sobre tutela y salud") == "buscar_jurisprudencia"
    assert enrutar("¿cómo estructuro una contestación?") == "analisis"


def test_consulta_con_citas_y_codigos_de_salida(capsys):
    assert cli.main(["consulta", "T-999 de 1985", "--sin-red"]) == 2
    assert cli.main(["consulta", "Texto cualquiera sin citas ni búsqueda"]) == 4
    assert "análisis abierto" in capsys.readouterr().out


def test_consulta_json(capsys):
    cli.main(["consulta", "Ley 100 de 1993", "--json", "--sin-red"])
    assert json.loads(capsys.readouterr().out)["citas"][0]["estado"] == "verificada"


def test_prueba_de_aceptacion_aprobada_y_con_evidencia(tmp_path, capsys):
    out = tmp_path / "ev.json"
    assert cli.main(["prueba", "--json", str(out)]) == 0
    ev = json.loads(out.read_text())
    assert ev["veredicto"] == "APROBADA" and ev["errores_sembrados"] == {"total": 8, "detectados": 8}


def test_la_prueba_falla_si_se_desactiva_un_control(monkeypatch):
    from gauntlet_jac import controles
    monkeypatch.setattr(controles, "controlar_fechas", lambda *a, **k: [])
    assert autoprueba.ejecutar()["veredicto"] == "FALLA"


def test_empaquetado_con_lista_blanca(tmp_path):
    r = empaquetar.empaquetar(str(tmp_path / "x.plugin"))
    nombres = zipfile.ZipFile(r["archivo"]).namelist()
    assert ".claude-plugin/plugin.json" in nombres and "jac/cli.py" in nombres and "README.md" in nombres
    assert not [n for n in nombres if re.search(r"crm|marketing|\.xlsx|\.csv|specs/|tests_|CLAUDE\.md|\.pyc|__pycache__", n)]
    info = zipfile.ZipFile(r["archivo"]).getinfo("bin/jac")
    assert (info.external_attr >> 16) & 0o111, "bin/jac debe conservar el permiso de ejecución"


def test_manifiestos_y_skills_validos():
    plugin = json.loads((RAIZ / ".claude-plugin/plugin.json").read_text())
    assert plugin["name"] == "jac-legal-os" and re.match(r"^\d+\.\d+\.\d+$", plugin["version"])
    mk = json.loads((RAIZ / ".claude-plugin/marketplace.json").read_text())
    assert mk["plugins"][0]["name"] == plugin["name"]
    for skill in (RAIZ / "skills").iterdir():
        txt = (skill / "SKILL.md").read_text(encoding="utf-8")
        m = re.match(r"^---\nname: (.+)\ndescription: .+\n---\n", txt)
        assert m and m.group(1) == skill.name, skill
    for ag in (RAIZ / "agents").glob("*.md"):
        assert re.match(r"^---\nname: .+\ndescription: .+", ag.read_text(encoding="utf-8"))
    assert version_coherente(plugin["version"])


def version_coherente(v):
    import jac
    return jac.__version__ == v and f'version = "{v}"' in (RAIZ / "pyproject.toml").read_text()


def test_agente_sin_claude_instalado(monkeypatch, capsys):
    monkeypatch.setattr("shutil.which", lambda n: None)
    assert cli.main(["agente", "consulta"]) == 3


def test_doctor_y_protocolo(capsys):
    assert cli.main(["doctor"]) == 0
    assert cli.main(["protocolo"]) == 0 and "GAUNTLET ELITE" in capsys.readouterr().out


def test_pyproject_empaqueta_todos_los_archivos_de_datos():
    """Un archivo de datos sin su patrón en package-data falla solo en instalaciones reales."""
    toml = (RAIZ / "pyproject.toml").read_text()
    for paquete in ("jac", "normas_col"):
        patrones = re.findall(rf'{paquete} = \[(.*?)\]', toml)[0]
        for f in (RAIZ / paquete / "datos").iterdir():
            assert f'datos/*{f.suffix}' in patrones, f"{f.name} no está en package-data de {paquete}"


def test_empaquetar_fuera_del_repositorio_da_error_claro(tmp_path):
    with pytest.raises(FileNotFoundError, match="git clone"):
        empaquetar.empaquetar(str(tmp_path / "x.plugin"), raiz=tmp_path)


# ---------------- instalador autocontenido ----------------
import os
import subprocess
import sys


@pytest.fixture(scope="module")
def instalador(tmp_path_factory):
    d = tmp_path_factory.mktemp("inst")
    r = empaquetar.generar_instalador(str(d / "instalar_jac_cowork.py"))
    return d, Path(r["archivo"])


def correr(archivo, *args, cwd):
    env = {k: v for k, v in os.environ.items() if k != "PYTHONPATH"}
    return subprocess.run([sys.executable, str(archivo), *args], cwd=cwd, env=env, capture_output=True, text=True, timeout=120)


def test_instalador_instala_verifica_y_crea_plugin(instalador, tmp_path):
    _, f = instalador
    r = correr(f, "--destino", str(tmp_path / "jac"), cwd=tmp_path)
    assert r.returncode == 0 and "22 de 22" in r.stdout and "INSTALACIÓN COMPLETA" in r.stdout
    assert (tmp_path / "jac" / ".claude-plugin" / "plugin.json").is_file() and (tmp_path / "jac-legal-os.plugin").is_file()
    assert zipfile.ZipFile(tmp_path / "jac-legal-os.plugin").testzip() is None
    assert correr(f, "--destino", str(tmp_path / "jac"), cwd=tmp_path).returncode == 0, "debe ser idempotente"


def test_instalador_no_toca_carpetas_ajenas(instalador, tmp_path):
    _, f = instalador
    (tmp_path / "ajena").mkdir()
    (tmp_path / "ajena" / "cliente.txt").write_text("dato")
    r = correr(f, "--destino", str(tmp_path / "ajena"), cwd=tmp_path)
    assert r.returncode == 3 and (tmp_path / "ajena" / "cliente.txt").read_text() == "dato"


def test_instalador_detecta_contenido_alterado(instalador, tmp_path):
    _, f = instalador
    txt = f.read_text(encoding="utf-8")
    i = txt.index("# --JAC-PAYLOAD-INICIO--\n# ") + 27
    alterado = tmp_path / "alt.py"
    alterado.write_text(txt[:i] + ("B" if txt[i] != "B" else "C") + txt[i + 1:], encoding="utf-8")
    r = correr(alterado, "--destino", str(tmp_path / "x"), cwd=tmp_path)
    assert r.returncode == 2 and "alterado" in r.stderr and not (tmp_path / "x").exists()


def test_instalador_acepta_saltos_de_linea_de_windows(instalador, tmp_path):
    _, f = instalador
    crlf = tmp_path / "crlf.py"
    crlf.write_bytes(f.read_bytes().replace(b"\n", b"\r\n"))
    assert correr(crlf, "--destino", str(tmp_path / "x"), "--sin-prueba", cwd=tmp_path).returncode == 0


def test_instalador_truncado_nunca_termina_en_silencio(instalador, tmp_path):
    """Un archivo cortado en cualquier punto debe fallar de forma explícita (nunca exit 0)."""
    _, f = instalador
    datos = f.read_bytes()
    n = len(datos)
    cortes = list(range(1, 2600, 97)) + [n // 4, n // 2, n - 200, n - 30, n - 10, n - 2]
    for k in cortes:
        corte = tmp_path / "corte.py"
        corte.write_bytes(datos[:k])
        r = correr(corte, "--destino", str(tmp_path / "x"), cwd=tmp_path)
        assert r.returncode != 0 and not (tmp_path / "x").exists(), f"corte en {k} terminó con código {r.returncode}"


def test_instalador_destino_imposible(instalador, tmp_path):
    _, f = instalador
    solo_archivo = tmp_path / "archivo"
    solo_archivo.write_text("x")
    assert correr(f, "--destino", str(solo_archivo / "jac"), cwd=tmp_path).returncode == 3
