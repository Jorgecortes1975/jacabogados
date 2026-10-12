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


# ---------------- paquete .md para Cowork ----------------
@pytest.fixture(scope="module")
def pack(tmp_path_factory):
    d = tmp_path_factory.mktemp("pack") / "cowork-jac"
    return d, empaquetar.generar_pack_cowork(str(d))


def test_pack_cowork_contenido_y_skills_zip(pack):
    d, r = pack
    esperados = {"00-LEEME-COWORK.md", "01-INSTRUCCIONES-DEL-PROYECTO.md", "03-PROTOCOLO-GAUNTLET-ELITE.md", "04-CATALOGO-NORMAS.md",
                 "05-CASO-DE-PRUEBA.md", "SKILL-jac-agente.md", "SKILL-jac-gauntlet.md", "SKILL-jac-verificar.md"}
    assert esperados == set(r["archivos"]) and r["skills"] == 3
    for z in (d / "skills-zip").glob("*.zip"):
        nombres = zipfile.ZipFile(z).namelist()
        assert nombres == [f"{z.stem}/SKILL.md"], "estructura carpeta/SKILL.md exigida para cargar skills"
        assert zipfile.ZipFile(z).read(nombres[0]).decode().startswith(f"---\nname: {z.stem}\n")
    assert zipfile.ZipFile(r["paquete"]).testzip() is None


def test_catalogo_md_coincide_con_el_json(pack):
    from normas_col import catalogo
    d, _ = pack
    md = (d / "04-CATALOGO-NORMAS.md").read_text(encoding="utf-8")
    normas = catalogo.cargar("/nonexistent.json")
    assert len(normas) == 13 and all(n.titulo in md and n.url in md for n in normas.values())
    assert "NO acredita vigencia" in md and "Ley 57 de 1887" in md


def test_caso_de_prueba_md_lista_todos_los_errores_sembrados(pack):
    d, _ = pack
    md = (d / "05-CASO-DE-PRUEBA.md").read_text(encoding="utf-8")
    assert all(desc in md for desc, _ in autoprueba.SEMBRADOS)
    assert (autoprueba.DATOS / "ejemplo_ronda1.txt").read_text(encoding="utf-8").strip() in md
    assert md.count("PENDIENTE DE VERIFICACIÓN") >= 3


def test_md_de_cowork_sin_asteriscos_ni_guiones_como_vinetas(pack):
    """Preferencia de estilo del despacho: títulos, numeración y párrafos."""
    d, _ = pack
    for f in d.glob("*.md"):
        txt = f.read_text(encoding="utf-8")
        assert "*" not in txt, f.name
        assert not re.search(r"^\s*- ", txt, re.M), f.name


def test_skills_funcionan_sin_herramientas():
    for n in ("jac-agente", "jac-verificar", "jac-gauntlet"):
        txt = (RAIZ / "skills" / n / "SKILL.md").read_text(encoding="utf-8")
        assert re.search(r"sin ejecución de código|Modo sin herramientas", txt, re.I), n


# ---------------- agentes de otro plugin (p. ej. croma-jac), sin copiar su contenido al repositorio ----------------
def plugin_ajeno(tmp_path):
    """Plugin sintético: dos agentes, skills con dependencias y un enrutador."""
    base = tmp_path / "ajeno"
    (base / "agents").mkdir(parents=True)
    (base / "agents" / "ag-uno.md").write_text("---\nname: ag-uno\ndescription: x\n---\nUsa el skill alfa.\n", encoding="utf-8")
    (base / "agents" / "ag-dos.md").write_text("---\nname: ag-dos\ndescription: y\n---\nSin dependencias.\n", encoding="utf-8")
    nombres = ["alfa", "beta", "gamma", "d1", "d2", "d3", "d4", "d5"]
    for n in nombres:
        (base / "skills" / n).mkdir(parents=True)
    cuerpos = {"alfa": "Requiere beta y enruta.", "beta": "Fin.", "gamma": "Independiente.",
               "d1": "x", "d2": "x", "d3": "x", "d4": "x", "d5": "x"}
    cuerpos["alfa"] += " " + " ".join(["d1", "d2", "d3", "d4", "d5", "gamma"])   # 7 menciones: enrutador, no se expande
    for n in nombres:
        (base / "skills" / n / "SKILL.md").write_text(f"---\nname: {n}\ndescription: z\n---\n{cuerpos[n]}\n", encoding="utf-8")
    (base / "skills" / "alfa" / "references").mkdir()
    (base / "skills" / "alfa" / "references" / "ref.md").write_text("referencia", encoding="utf-8")
    return base


def nombres_zip(r):
    return set(zipfile.ZipFile(r["archivo"]).namelist())


def test_agentes_modo_solo(tmp_path):
    b = plugin_ajeno(tmp_path)
    r = empaquetar.empaquetar(str(tmp_path / "x.plugin"), con_agentes=str(b), modo_agentes="solo")
    n = nombres_zip(r)
    assert {"agents/ag-uno.md", "agents/ag-dos.md", "agents/jac-revisor.md"} <= n and not any(x.startswith("skills/alfa") for x in n)
    assert zipfile.ZipFile(r["archivo"]).read("agents/ag-uno.md") == (b / "agents" / "ag-uno.md").read_bytes(), "sin modificar"


def test_agentes_modo_apoyo_cierre_sin_expandir_enrutadores(tmp_path):
    b = plugin_ajeno(tmp_path)
    n = nombres_zip(empaquetar.empaquetar(str(tmp_path / "x.plugin"), con_agentes=str(b)))
    assert "skills/alfa/SKILL.md" in n and "skills/alfa/references/ref.md" in n
    assert "skills/beta/SKILL.md" not in n, "alfa es un enrutador (más de 5 menciones): no se expande"
    assert "skills/gamma/SKILL.md" not in n and "skills/d1/SKILL.md" not in n


def test_agentes_modo_completo(tmp_path):
    b = plugin_ajeno(tmp_path)
    n = nombres_zip(empaquetar.empaquetar(str(tmp_path / "x.plugin"), con_agentes=str(b), modo_agentes="completo"))
    assert all(f"skills/{s}/SKILL.md" in n for s in ("alfa", "beta", "gamma", "d1"))


def test_agentes_rechaza_colisiones_y_encabezados_invalidos(tmp_path):
    b = plugin_ajeno(tmp_path)
    (b / "agents" / "jac-revisor.md").write_text("---\nname: jac-revisor\ndescription: x\n---\n", encoding="utf-8")
    with pytest.raises(ValueError, match="Colisión"):
        empaquetar.empaquetar(str(tmp_path / "x.plugin"), con_agentes=str(b))
    (b / "agents" / "jac-revisor.md").unlink()
    (b / "agents" / "ag-uno.md").write_text("---\nname: otro-nombre\ndescription: x\n---\n", encoding="utf-8")
    with pytest.raises(ValueError, match="encabezado"):
        empaquetar.empaquetar(str(tmp_path / "x.plugin"), con_agentes=str(b))
    (b / "agents" / "ag-uno.md").write_text("---\nname: ag-uno\ndescription: x\n---\nUsa jac-agente.\n", encoding="utf-8")
    (b / "skills" / "jac-agente").mkdir()
    (b / "skills" / "jac-agente" / "SKILL.md").write_text("---\nname: jac-agente\ndescription: x\n---\n", encoding="utf-8")
    with pytest.raises(ValueError, match="Colisión"):
        empaquetar.empaquetar(str(tmp_path / "x.plugin"), con_agentes=str(b))


def test_agentes_auto_sin_plugin_instalado(tmp_path, monkeypatch):
    monkeypatch.setattr(Path, "home", classmethod(lambda cls: tmp_path))
    with pytest.raises(FileNotFoundError, match="croma-jac"):
        empaquetar.localizar_agentes("auto")


def test_agentes_cli_error_claro(tmp_path, capsys):
    assert cli.main(["empaquetar", "--salida", str(tmp_path / "x.plugin"), "--con-agentes", str(tmp_path / "no-existe")]) == 3
    assert "No hay agentes" in capsys.readouterr().err


def test_el_repositorio_no_contiene_agentes_ajenos():
    """El repositorio es público: el contenido de croma-jac no debe versionarse aquí."""
    assert sorted(p.name for p in (RAIZ / "agents").glob("*.md")) == ["jac-revisor.md"]
    assert sorted(p.name for p in (RAIZ / "skills").iterdir()) == ["jac-agente", "jac-gauntlet", "jac-verificar"]


def test_instalador_lleva_los_agentes_ajenos(tmp_path):
    b = plugin_ajeno(tmp_path)
    inst = tmp_path / "inst.py"
    r = empaquetar.generar_instalador(str(inst), con_agentes=str(b))
    assert "agents/ag-uno.md" in r["agentes_externos"]
    res = correr(inst, "--destino", str(tmp_path / "jac"), "--sin-prueba", cwd=tmp_path)
    assert res.returncode == 0 and (tmp_path / "jac" / "agents" / "ag-uno.md").is_file()
    assert (tmp_path / "jac" / "skills" / "alfa" / "references" / "ref.md").is_file()
