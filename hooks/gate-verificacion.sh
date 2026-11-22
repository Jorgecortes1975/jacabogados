#!/bin/sh
# Puerta de verificación del proyecto (Stop hook definido en .claude/settings.json).
# Ejecuta la prueba de aceptación de bin/jac solo si el turno modificó archivos que
# afectan a los controles. Si la prueba falla, sale con código 2: Claude Code no cierra
# el turno y devuelve el motivo a Claude por stderr.
# Principio: verificación determinista con evidencia (ver informe del 2026-11-22).

RAIZ="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/.." && pwd)}"
cd "$RAIZ" || exit 0
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || exit 0

CAMBIOS=$(git status --porcelain | awk '{print $NF}')
[ -z "$CAMBIOS" ] && exit 0

RELEVANTE=$(printf '%s\n' "$CAMBIOS" | grep -E '^(CLAUDE\.md|skills/|agents/|jac/|gauntlet_jac/|normas_col/|jurisprudencia_col/|tests_|bin/|hooks/|\.claude/|pyproject\.toml)' || true)
[ -z "$RELEVANTE" ] && exit 0

# Copias gemelas del revisor (plugin y proyecto): deben ser idénticas.
if [ -f agents/jac-revisor.md ] && [ -f .claude/agents/jac-revisor.md ] && ! cmp -s agents/jac-revisor.md .claude/agents/jac-revisor.md; then
  echo "Las copias de jac-revisor divergen: agents/jac-revisor.md y .claude/agents/jac-revisor.md deben ser idénticas. Corrija antes de terminar el turno." >&2
  exit 2
fi

if command -v timeout >/dev/null 2>&1; then
  SALIDA=$(timeout 300 ./bin/jac prueba 2>&1)
else
  SALIDA=$(./bin/jac prueba 2>&1)
fi
CODIGO=$?

if [ "$CODIGO" -ne 0 ]; then
  {
    echo "La puerta de verificación falló (bin/jac prueba, código $CODIGO). Corrija los fallos antes de terminar el turno:"
    printf '%s\n' "$SALIDA" | grep -v '^\[OK\]' | tail -40
  } >&2
  exit 2
fi
exit 0
