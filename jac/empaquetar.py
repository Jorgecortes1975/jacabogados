"""Empaqueta JAC Legal OS como archivo .plugin (zip) para Claude Cowork o Claude Code.

Usa una LISTA BLANCA: solo viaja lo necesario. El resto del repositorio (CRM de prospectos,
planes de marketing, hojas de cálculo) no se incluye nunca.
"""
from __future__ import annotations

import json
import zipfile
from pathlib import Path
from typing import List, Optional

RAIZ = Path(__file__).resolve().parent.parent
INCLUIR = [".claude-plugin", "skills", "agents", "hooks", "bin", "jac", "jurisprudencia_col", "gauntlet_jac", "normas_col"]
EXCLUIR_PARTES = {"__pycache__", ".pytest_cache", ".DS_Store"}
EXCLUIR_SUFIJOS = {".pyc", ".pyo"}


def localizar_agentes(origen: str) -> Path:
    """Carpeta con los .md de agentes. `auto` busca el plugin croma-jac instalado; acepta la raíz del plugin o su carpeta agents."""
    if origen == "auto":
        base = Path.home() / ".claude" / "plugins"
        hallados = sorted(base.rglob("croma-jac/agents")) if base.is_dir() else []
        if not hallados:
            raise FileNotFoundError("No se encontró el plugin croma-jac en ~/.claude/plugins; indique la ruta con --con-agentes RUTA.")
        return hallados[0]
    p = Path(origen).expanduser()
    p = p / "agents" if (p / "agents").is_dir() else p
    if not p.is_dir() or not list(p.glob("*.md")):
        raise FileNotFoundError(f"No hay agentes (.md) en {p}")
    return p


MODOS_AGENTES = ("solo", "apoyo", "completo")


def _skills_de_apoyo(raiz_plugin: Path, texto_agentes: str, modo: str) -> List[Path]:
    """Skills de otro plugin que sus agentes necesitan. `apoyo`: cierre por menciones sin expandir enrutadores
    (un skill que nombra a más de 5 skills es un enrutador y no se expande); `completo`: todos."""
    import re
    skills = {d.name: d for d in sorted((raiz_plugin / "skills").glob("*")) if (d / "SKILL.md").is_file()}
    if modo == "completo":
        return list(skills.values())

    def menciones(texto: str, excepto: str = "") -> set:
        return {n for n in skills if n != excepto and re.search(rf"(?<![\w-]){re.escape(n)}(?![\w-])", texto)}

    cierre, pendientes = set(menciones(texto_agentes)), list(menciones(texto_agentes))
    while pendientes:
        n = pendientes.pop()
        hijos = menciones((skills[n] / "SKILL.md").read_text(encoding="utf-8"), n)
        if len(hijos) > 5:              # enrutador: lista casi todos los comandos; no se expande
            continue
        for h in hijos - cierre:
            cierre.add(h)
            pendientes.append(h)
    return [skills[n] for n in sorted(cierre)]


def _agentes_externos(origen: str, propios_agentes: set, propios_skills: set, modo: str = "apoyo") -> List[tuple]:
    """[(nombre_en_zip, bytes)] de los agentes de otro plugin (y, según el modo, de los skills que necesitan), SIN modificarlos.
    Valida el encabezado y rechaza colisiones de nombres."""
    import re
    if modo not in MODOS_AGENTES:
        raise ValueError(f"Modo inválido {modo!r}; use uno de {MODOS_AGENTES}")
    carpeta = localizar_agentes(origen)
    out, textos = [], []
    for f in sorted(carpeta.glob("*.md")):
        contenido = f.read_bytes()
        m = re.match(r"^---\r?\nname: ([^\r\n]+)\r?\n", contenido.decode("utf-8"))
        if not m or m.group(1).strip().strip('"') != f.stem:
            raise ValueError(f"{f.name}: el encabezado no tiene name igual al nombre del archivo")
        if f.name in propios_agentes:
            raise ValueError(f"Colisión: ya existe un agente propio llamado {f.name}")
        out.append((f"agents/{f.name}", contenido))
        textos.append(contenido.decode("utf-8"))
    raiz_plugin = carpeta.parent
    if modo != "solo" and (raiz_plugin / "skills").is_dir():
        for d in _skills_de_apoyo(raiz_plugin, "\n".join(textos), modo):
            if d.name in propios_skills:
                raise ValueError(f"Colisión: ya existe un skill propio llamado {d.name}")
            md = (d / "SKILL.md").read_bytes().decode("utf-8")
            if not re.match(rf"^---\r?\nname: {re.escape(d.name)}\r?\n", md):
                raise ValueError(f"skills/{d.name}/SKILL.md: el encabezado no tiene name igual al directorio")
            for f in sorted(d.rglob("*")):
                if f.is_file():
                    out.append((f"skills/{d.name}/{f.relative_to(d).as_posix()}", f.read_bytes()))
    return out


def archivos(raiz: Path = RAIZ) -> List[Path]:
    out = []
    for nombre in INCLUIR:
        base = raiz / nombre
        if not base.exists():
            continue
        for f in sorted(base.rglob("*")) if base.is_dir() else [base]:
            if f.is_file() and not (set(f.parts) & EXCLUIR_PARTES) and f.suffix not in EXCLUIR_SUFIJOS:
                out.append(f)
    return out


def empaquetar(salida: str = "jac-legal-os.plugin", raiz: Path = RAIZ, con_agentes: Optional[str] = None, modo_agentes: str = "apoyo") -> dict:
    if not (raiz / ".claude-plugin" / "plugin.json").is_file():
        raise FileNotFoundError("No se encontró .claude-plugin/plugin.json: ejecute `empaquetar` desde una copia "
                                "del repositorio (git clone), no desde una instalación con pip.")
    manifiesto = json.loads((raiz / ".claude-plugin" / "plugin.json").read_text(encoding="utf-8"))
    destino = Path(salida)
    lista = archivos(raiz)
    externos = (_agentes_externos(con_agentes, {f.name for f in lista if f.parent.name == "agents"},
                                  {f.parent.name for f in lista if f.name == "SKILL.md"}, modo_agentes) if con_agentes else [])
    with zipfile.ZipFile(destino, "w", zipfile.ZIP_DEFLATED) as z:
        for f in lista:
            z.write(f, f.relative_to(raiz).as_posix())      # conserva permisos de ejecución
        for nombre, contenido in externos:
            z.writestr(nombre, contenido)
        guia = raiz / "AGENTE-JAC.md"
        if guia.is_file():
            z.write(guia, "README.md")
    import hashlib
    return {"archivo": str(destino), "plugin": manifiesto["name"], "version": manifiesto["version"],
            "archivos": len(lista) + 1 + len(externos), "bytes": destino.stat().st_size,
            "agentes_externos": {n: hashlib.sha256(c).hexdigest()[:16] for n, c in externos}}


def generar_instalador(salida: str = "instalar_jac_cowork.py", raiz: Path = RAIZ, con_agentes: Optional[str] = None, modo_agentes: str = "apoyo") -> dict:
    """Un solo archivo .py con el agente completo incrustado, autoverificable y listo para llevar."""
    import base64
    import hashlib
    import tempfile

    plantilla = (raiz / "jac" / "datos" / "plantilla_instalador.py")
    if not plantilla.is_file():
        raise FileNotFoundError("No se encontró la plantilla del instalador; ejecute desde una copia del repositorio (git clone).")
    with tempfile.TemporaryDirectory() as tmp:
        paquete = Path(tmp) / "jac-legal-os.plugin"
        info = empaquetar(str(paquete), raiz, con_agentes, modo_agentes)
        crudo = paquete.read_bytes()
    b64 = base64.b64encode(crudo).decode("ascii")
    cuerpo = "\n".join("# " + b64[i:i + 76] for i in range(0, len(b64), 76))
    texto = (plantilla.read_text(encoding="utf-8")
             .replace("@@VERSION@@", info["version"]).replace("@@SHA256@@", hashlib.sha256(crudo).hexdigest())
             .replace("@@PAYLOAD@@", cuerpo))
    destino = Path(salida)
    destino.write_text(texto, encoding="utf-8")
    destino.chmod(0o755)
    return {"archivo": str(destino), "version": info["version"], "archivos": info["archivos"], "bytes": destino.stat().st_size, "agentes_externos": info["agentes_externos"],
            "sha256_contenido": hashlib.sha256(crudo).hexdigest()}


def _catalogo_md() -> str:
    from normas_col import catalogo
    filas = sorted(catalogo.cargar("/nonexistent.json").values(), key=lambda n: (n.tipo, n.anio, int(n.numero)))
    L = ["# Catálogo de normas verificadas", "",
         "Fuente: Gestor Normativo de Función Pública, consultado el 2026-10-12 a través de Croma (servicio que replica el registro).",
         "Acredita EXISTENCIA y datos de expedición. NO acredita vigencia: el registro es incompleto (la Ley 2080 de 2021 declara que modifica la Ley 1437 de 2011 y la ficha de esta no la lista) y la ausencia de una norma tampoco prueba su inexistencia (la Ley 57 de 1887 no figura).", "",
         "| Norma | Expedida | Publicación oficial | Modificaciones registradas | Enlace |", "| --- | --- | --- | --- | --- |"]
    for n in filas:
        L.append(f"| {n.titulo} | {n.expedida or 'no registrada'} | {n.publicada_en or 'no registrada'} | {len(n.modificaciones)} | {n.url} |")
    L += ["", "Uso: si la norma citada figura aquí, confirme existencia y fecha. Si no figura, queda PENDIENTE DE VERIFICACIÓN.",
          "Si la fecha citada difiere de la expedición registrada, es un dato discrepante y debe corregirse."]
    return "\n".join(L) + "\n"


def _caso_prueba_md() -> str:
    from . import autoprueba
    ronda1 = (autoprueba.DATOS / "ejemplo_ronda1.txt").read_text(encoding="utf-8")
    L = ["# Caso de prueba sintético", "",
         "Ningún dato corresponde a una persona, proceso o hecho real. Pegue el texto de la sección 1 en una conversación nueva y escriba: /JAC-GAUNTLET ELITE valida este escrito. Radicado del asunto: " + autoprueba.RADICADO, "",
         "## 1. Escrito", "", ronda1, "",
         "## 2. Errores sembrados y qué debe hacer el agente", "",
         "| N | Error sembrado | Se puede detectar sin fuentes |", "| --- | --- | --- |"]
    sin_fuentes = {0, 1, 2, 3, 6}
    for i, (desc, _) in enumerate(autoprueba.SEMBRADOS):
        if i == 4:
            detectable = "Sí, si el catálogo de normas (archivo 04) está cargado; si no, PENDIENTE DE VERIFICACIÓN"
        else:
            detectable = "Sí" if i in sin_fuentes else "No: sin fuentes debe quedar PENDIENTE DE VERIFICACIÓN"
        L.append(f"| {i + 1} | {desc} | {detectable} |")
    L += ["", "## 3. Criterio de aceptación", "",
          "1. Estado final BLOCKED, porque hay una fecha inexistente y una sentencia imposible.",
          "2. Detecta los errores 1, 2, 3, 4 y 7 sin necesidad de fuentes.",
          "3. Con el catálogo cargado, detecta el error 5 (el Decreto 2591 de 1991 se expidió el 19 de noviembre de 1991). En los errores 6 y 8, si no consultó fuentes, los marca PENDIENTE DE VERIFICACIÓN. Si los da por correctos o por inexistentes sin haber consultado, reprueba la prueba.",
          "4. La Ley 1437 de 2011 y la Ley 57 de 1887 no pueden figurar como vigentes: la vigencia queda pendiente. La Ley 57 de 1887 no debe declararse inexistente.",
          "5. No trata COVID-19 ni la fecha 5 de mayo de 2020 como citas.",
          "6. Declara si su revisión fue interna o independiente y qué fuentes consultó.", "",
          "Con las herramientas ejecutables, la misma prueba se corre con: jac prueba."]
    return "\n".join(L) + "\n"


def generar_pack_cowork(destino: str = "cowork-jac", raiz: Path = RAIZ) -> dict:
    """Paquete de archivos .md para Claude Cowork, generado desde las fuentes canónicas."""
    import shutil
    from . import __version__
    if not (raiz / "skills").is_dir():
        raise FileNotFoundError("No se encontró la carpeta skills: ejecute `empaquetar --cowork-md` desde una copia del repositorio (git clone), no desde una instalación con pip.")
    d = Path(destino)
    shutil.rmtree(d, ignore_errors=True)
    (d / "skills-zip").mkdir(parents=True)
    datos = raiz / "jac" / "datos"
    escritos = []

    def escribir(nombre: str, texto: str):
        (d / nombre).write_text(texto, encoding="utf-8")
        escritos.append(nombre)

    escribir("00-LEEME-COWORK.md", (datos / "cowork_leeme.md").read_text(encoding="utf-8").replace("@@VERSION@@", __version__))
    escribir("01-INSTRUCCIONES-DEL-PROYECTO.md", (datos / "cowork_instrucciones.md").read_text(encoding="utf-8"))
    escribir("03-PROTOCOLO-GAUNTLET-ELITE.md", (datos / "JAC-GAUNTLET-ELITE.md").read_text(encoding="utf-8"))
    escribir("04-CATALOGO-NORMAS.md", _catalogo_md())
    escribir("05-CASO-DE-PRUEBA.md", _caso_prueba_md())
    for skill in sorted((raiz / "skills").iterdir()):
        md = (skill / "SKILL.md").read_text(encoding="utf-8")
        escribir(f"SKILL-{skill.name}.md", md)
        with zipfile.ZipFile(d / "skills-zip" / f"{skill.name}.zip", "w", zipfile.ZIP_DEFLATED) as z:
            z.writestr(f"{skill.name}/SKILL.md", md)
    paquete = d.with_suffix(".zip") if d.suffix == "" else Path(str(d) + ".zip")
    with zipfile.ZipFile(paquete, "w", zipfile.ZIP_DEFLATED) as z:
        for f in sorted(d.rglob("*")):
            if f.is_file():
                z.write(f, f.relative_to(d.parent).as_posix())
    return {"carpeta": str(d), "paquete": str(paquete), "archivos": escritos, "skills": len(list((d / "skills-zip").iterdir()))}
