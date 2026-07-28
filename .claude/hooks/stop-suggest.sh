#!/usr/bin/env bash
# stop-suggest.sh — hook Stop de `aprende`
#
# GARANTÍA DURA: este script NUNCA escribe un aprendizaje.
# Solo emite un recordatorio de una línea si quedaron señales sin atender.
#
# Salida: una línea de texto (el recordatorio) o nada.
# Exit 0 siempre.

set -uo pipefail

slug="$(pwd | sed 's/[^A-Za-z0-9]/-/g')"
signals="${HOME}/.claude/projects/${slug}/.aprende-signals.md"

[ -f "$signals" ] || exit 0

# Cuenta solo las líneas de señal real, no los registros de edit.
n="$(grep -c '\*\*señal\*\*' "$signals" 2>/dev/null || true)"
n="${n:-0}"
[ "$n" -eq 0 ] && exit 0

printf 'Quedaron %s señales sin capturar en esta sesión. Corre /aprende antes de cerrar para no perderlas.\n' "$n"
exit 0
