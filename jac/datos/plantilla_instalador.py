_G = [__import__("atexit").register(lambda: getattr(__import__("sys"), "_jac_ok", False) or (__import__("sys").stderr.write("ERROR: El instalador esta incompleto (el archivo termina antes de lo previsto). Vuelva a descargarlo completo.\n"), __import__("sys").stderr.flush(), __import__("os")._exit(2)))]
"""Instalador autocontenido de JAC Legal OS @@VERSION@@ (Abogados Asociados JAC).

Un solo archivo, solo biblioteca estándar de Python 3.9 o superior. Hace, en orden:
  1. Comprueba Python y que el contenido incrustado no esté alterado (SHA-256).
  2. Extrae el agente en una carpeta (por defecto ./jac-legal-os) sin sobrescribir nada ajeno.
  3. Crea el archivo jac-legal-os.plugin para cargarlo en Claude Cowork o Claude Code.
  4. Ejecuta la prueba de aceptación y el diagnóstico. Solo declara éxito si pasan.

Uso:   python3 instalar_jac_cowork.py [--destino CARPETA] [--red] [--forzar] [--sin-prueba]
  --red         además prueba el acceso a las fuentes oficiales (informativo; no hace fallar la instalación)
  --forzar      reemplaza una carpeta existente aunque no sea una instalación de JAC
  --sin-prueba  omite la prueba de aceptación (no recomendado)
Códigos de salida: 0 correcto, 1 la prueba falló, 2 contenido alterado o dañado, 3 error de uso o de entorno.
"""
import argparse
import base64
import hashlib
import io
import os
import shutil
import subprocess
import sys
import tempfile
import zipfile
from pathlib import Path


VERSION = "@@VERSION@@"
SHA256 = "@@SHA256@@"
MARCA = ".jac_instalado"


def salir(codigo, mensaje):
    print(("ERROR: " if codigo else "") + mensaje, file=sys.stderr if codigo else sys.stdout)
    sys.exit(codigo)


INICIO = "# --JAC-PAYLOAD-INICIO--"
FIN = "# --JAC-PAYLOAD-FIN--"


def leer_payload():
    """El contenido va en comentarios: un archivo cortado sigue siendo Python válido y se detecta aquí."""
    try:
        lineas = Path(__file__).resolve().read_text(encoding="utf-8").splitlines()
        i, j = lineas.index(INICIO), lineas.index(FIN)
    except (OSError, ValueError, UnicodeDecodeError):
        salir(2, "El instalador está incompleto o fue modificado (faltan las marcas del contenido). "
                 "Vuelva a descargarlo completo y no lo abra ni lo guarde con un editor.")
    return "".join(l[1:].strip() for l in lineas[i + 1:j] if l.startswith("#"))


def cargar_contenido():
    try:
        crudo = base64.b64decode(leer_payload(), validate=True)
    except ValueError:
        salir(2, "El contenido incrustado está dañado (base64 inválido). Vuelva a descargar el instalador.")
    if hashlib.sha256(crudo).hexdigest() != SHA256:
        salir(2, "El contenido incrustado está alterado o dañado (la huella SHA-256 no coincide). "
                 "Vuelva a descargar el instalador; no lo edite ni lo copie por un medio que modifique el texto.")
    try:
        z = zipfile.ZipFile(io.BytesIO(crudo))
        if z.testzip() is not None:
            raise zipfile.BadZipFile("entrada dañada")
    except zipfile.BadZipFile as e:
        salir(2, f"El paquete incrustado no es un zip válido: {e}")
    return crudo, z


def extraer(z, destino):
    base = destino.resolve()
    for info in z.infolist():
        objetivo = (destino / info.filename).resolve()
        if base != objetivo and base not in objetivo.parents:
            salir(2, f"Entrada insegura en el paquete: {info.filename}")
    z.extractall(destino)
    for info in z.infolist():                       # restaura permisos de ejecución (bin/jac, hooks)
        modo = info.external_attr >> 16
        if modo and not info.is_dir():
            os.chmod(destino / info.filename, modo & 0o777)


def ejecutar(destino, *args, timeout=180):
    entorno = {**os.environ, "PYTHONPATH": str(destino), "PYTHONDONTWRITEBYTECODE": "1"}
    return subprocess.run([sys.executable, "-m", "jac", *args], cwd=tempfile.gettempdir(), env=entorno,
                          capture_output=True, text=True, timeout=timeout)


def main():
    sys._jac_ok = True
    p = argparse.ArgumentParser(description="Instala JAC Legal OS " + VERSION)
    p.add_argument("--destino", default="jac-legal-os")
    p.add_argument("--red", action="store_true")
    p.add_argument("--forzar", action="store_true")
    p.add_argument("--sin-prueba", action="store_true")
    a = p.parse_args()

    if sys.version_info < (3, 9):
        salir(3, f"Se requiere Python 3.9 o superior; este es {sys.version.split()[0]}.")
    crudo, z = cargar_contenido()
    print(f"[1/4] Contenido íntegro (SHA-256 {SHA256[:16]}…), {len(z.namelist())} archivos.")

    destino = Path(a.destino).expanduser().resolve()
    if destino.exists() and any(destino.iterdir()):
        if (destino / MARCA).is_file() or a.forzar:
            if not (destino / MARCA).is_file():
                print(f"AVISO: {destino} no era una instalación de JAC; se reemplaza por --forzar.")
            shutil.rmtree(destino)
        else:
            salir(3, f"{destino} ya existe y no es una instalación de JAC. Elija otra carpeta con --destino o use --forzar.")
    try:
        destino.mkdir(parents=True, exist_ok=True)
        extraer(z, destino)
        (destino / MARCA).write_text(VERSION + "\n", encoding="utf-8")
        archivo_plugin = destino.parent / "jac-legal-os.plugin"
        archivo_plugin.write_bytes(crudo)
    except OSError as e:
        salir(3, f"No se pudo escribir en {destino.parent}: {e}. Elija otra carpeta con --destino.")
    print(f"[2/4] Agente instalado en {destino}")
    print(f"[3/4] Archivo para Cowork creado: {archivo_plugin}")

    if a.sin_prueba:
        print("[4/4] Prueba omitida (--sin-prueba). La instalación NO está verificada.")
    else:
        try:
            r = ejecutar(destino, "prueba")
        except (OSError, subprocess.TimeoutExpired) as e:
            salir(1, f"No se pudo ejecutar la prueba de aceptación: {e}")
        lineas = r.stdout.strip().splitlines()
        resumen = next((l for l in lineas if "PRUEBA DE ACEPTACIÓN" in l), "")
        if r.returncode != 0:
            print("\n".join(lineas[-30:]) + "\n" + r.stderr[-1500:], file=sys.stderr)
            salir(1, "La prueba de aceptación falló: la instalación NO es confiable. No cargue el .plugin en Cowork.")
        d = ejecutar(destino, "doctor")
        if d.returncode != 0:
            print(d.stdout + d.stderr, file=sys.stderr)
            salir(1, "El diagnóstico de instalación falló.")
        print(f"[4/4] {resumen}")

    if a.red:
        print("\nAcceso a fuentes oficiales (informativo):")
        print(ejecutar(destino, "doctor", "--red", timeout=240).stdout)

    print(f"""
INSTALACIÓN COMPLETA
  Carpeta del agente : {destino}
  Archivo para Cowork: {archivo_plugin}

Siguientes pasos
  Claude Cowork : cargue {archivo_plugin.name} en Cowork y acepte el plugin. Luego pruebe:
                  /jac-legal-os:jac-verificar T-008/20 y Ley 1437 de 2011
  Claude Code   : claude --plugin-dir "{destino}"
  Sin Claude    : {sys.executable} -m jac consulta "T-008/20"   (con PYTHONPATH={destino})
  Diagnóstico   : python3 {Path(sys.argv[0]).name} --red   (comprueba si su red alcanza las fuentes oficiales)

Límites: no determina vigencia de normas ni verifica hechos, términos o cálculos. PASS_AUTOMATICO no es PASS.
El abogado responsable es el último filtro.""")


if __name__ == "__main__":
    main()

# --JAC-PAYLOAD-INICIO--
@@PAYLOAD@@
# --JAC-PAYLOAD-FIN--
