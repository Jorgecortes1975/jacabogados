#!/bin/sh
# Hace que `python3 -m jac` funcione en la sesión sin instalar nada: expone la raíz del plugin en PYTHONPATH.
[ -n "$CLAUDE_ENV_FILE" ] && [ -n "$CLAUDE_PLUGIN_ROOT" ] || exit 0
printf 'export PYTHONPATH="%s${PYTHONPATH:+:$PYTHONPATH}"\n' "$CLAUDE_PLUGIN_ROOT" >> "$CLAUDE_ENV_FILE"
exit 0
