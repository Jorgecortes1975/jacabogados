#!/usr/bin/env bash
# capture-signal.sh — hook PostToolUse de `aprende`
#
# GARANTÍA DURA: este script NUNCA escribe un aprendizaje.
# Solo appendea una línea de señal a .aprende-signals.md para que /aprende
# la lea después. Los aprendizajes los escribe exclusivamente el flujo
# /aprende confirmado por el usuario.
#
# Entrada: JSON del hook por stdin.
# Salida: nada en stdout (silencioso). Exit 0 siempre — un hook que falla
#         no debe romper la sesión.

set -uo pipefail

payload="$(cat 2>/dev/null || true)"
[ -z "$payload" ] && exit 0

slug="$(pwd | sed 's/[^A-Za-z0-9]/-/g')"
dir="${HOME}/.claude/projects/${slug}"
signals="${dir}/.aprende-signals.md"

mkdir -p "$dir" 2>/dev/null || exit 0

# Extrae campos sin depender de jq (puede no estar instalado).
field() {
  printf '%s' "$payload" | grep -o "\"$1\"[[:space:]]*:[[:space:]]*\"[^\"]*\"" \
    | head -1 | sed 's/.*:[[:space:]]*"//; s/"$//'
}

tool="$(field tool_name)"
[ -z "$tool" ] && exit 0

now="$(date '+%Y-%m-%d %H:%M')"

note=""

# Señal 1 — el resultado de la herramienta trae un error.
if printf '%s' "$payload" | grep -qiE '"(is_error|isError)"[[:space:]]*:[[:space:]]*true'; then
  note="fallo en ${tool}"
elif printf '%s' "$payload" | grep -qiE 'command not found|no such file|permission denied|traceback|fatal:|SyntaxError|exit code [1-9]'; then
  note="error reportado por ${tool}"
fi

# Señal 2 — el mismo archivo editado 3+ veces en la sesión.
if [ "$tool" = "Edit" ] || [ "$tool" = "Write" ]; then
  target="$(field file_path)"
  if [ -n "$target" ]; then
    # grep -c ya imprime 0 cuando no hay match (y sale 1), así que no se
    # encadena un `|| echo 0` — duplicaría el número y rompería el test.
    count="$(grep -cF "edit:${target}" "$signals" 2>/dev/null || true)"
    count="${count:-0}"
    printf -- '- %s edit:%s\n' "$now" "$target" >> "$signals"
    if [ "$count" -ge 2 ]; then
      note="${note:+$note; }reintentos repetidos sobre $(basename "$target")"
    fi
  fi
fi

[ -z "$note" ] && exit 0

printf -- '- %s **señal**: %s\n' "$now" "$note" >> "$signals"
exit 0
