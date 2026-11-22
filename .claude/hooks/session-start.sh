#!/bin/bash
# SessionStart (síncrono): deja instaladas las dependencias de prueba en sesiones de la nube.
# Solo actúa cuando CLAUDE_CODE_REMOTE=true. Es idempotente: si nada cambió desde la última
# instalación correcta, no vuelve a instalar.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-.}"

# Dependencias Python (pytest) y el propio paquete del repositorio en modo editable.
# El archivo de hashes vive en el directorio de paquetes de ese Python, no en el repositorio:
# si el contenedor es nuevo, el hash desaparece y la instalación se repite.
pyhashes="$(python3 -I -c 'import sysconfig; print(sysconfig.get_path("purelib"))')/.session-start.sha256"
if ! sha256sum --check --status "$pyhashes" 2>/dev/null; then
  # Borrar el hash antes de instalar: si la instalación falla, se repetirá la próxima vez.
  rm -f "$pyhashes"
  python3 -m pip install -q -r requirements-dev.txt
  # pyproject.toml no tiene código que compilar; la instalación editable no necesita reconstruirse.
  python3 -m pip install -q -e .
  # Lista de archivos que deciden la instalación, incluido este propio script.
  sha256sum .claude/hooks/session-start.sh requirements.txt requirements-dev.txt pyproject.toml > "$pyhashes" || rm -f "$pyhashes"
fi
