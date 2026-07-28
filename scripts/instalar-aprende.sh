#!/usr/bin/env bash
# instalar-aprende.sh — instala la memoria del despacho en TU máquina.
#
# Qué hace:
#   1. Copia las skills `aprende` y `learn` a ~/.claude/skills/
#   2. Copia el subagente `curador-memoria` a ~/.claude/agents/
#   3. Copia los 2 hooks a ~/.claude/hooks/ y los registra en ~/.claude/settings.json
#   4. Deja backup con fecha de settings.json antes de tocarlo
#
# Uso:
#   bash scripts/instalar-aprende.sh            # instala todo
#   bash scripts/instalar-aprende.sh --sin-hooks # solo skills + subagente
#   bash scripts/instalar-aprende.sh --quitar    # desinstala los hooks (deja backup)
#
# Requiere: bash, y `jq` solo si ya tienes un settings.json con contenido.

set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST="${HOME}/.claude"
STAMP="$(date +%Y%m%d-%H%M%S)"
MODO="${1:-completo}"

say()  { printf '  %s\n' "$*"; }
ok()   { printf '  \033[32m✓\033[0m %s\n' "$*"; }
warn() { printf '  \033[33m!\033[0m %s\n' "$*"; }
die()  { printf '  \033[31m✗\033[0m %s\n' "$*" >&2; exit 1; }

echo
echo "instalar-aprende — memoria persistente para el despacho"
echo "  repo:    $REPO"
echo "  destino: $DEST"
echo

# ---------------------------------------------------------------- desinstalar
if [ "$MODO" = "--quitar" ]; then
  settings="${DEST}/settings.json"
  [ -f "$settings" ] || die "No hay $settings — nada que quitar."
  cp "$settings" "${settings}.bak-${STAMP}"
  ok "Backup: ${settings}.bak-${STAMP}"
  if command -v jq >/dev/null 2>&1; then
    tmp="$(mktemp)"
    jq 'del(.hooks.PostToolUse, .hooks.Stop)' "$settings" > "$tmp" && mv "$tmp" "$settings"
    ok "Hooks PostToolUse y Stop removidos de settings.json"
  else
    warn "jq no está instalado. Edita $settings a mano y borra las claves hooks.PostToolUse y hooks.Stop."
  fi
  say "Las lessons y memories ya guardadas NO se tocaron."
  echo
  exit 0
fi

# ------------------------------------------------------------------- verificar
[ -d "${REPO}/.claude/skills/aprende" ] || die "No encuentro ${REPO}/.claude/skills/aprende"

if command -v claude >/dev/null 2>&1; then
  ok "Claude Code detectado: $(claude --version 2>/dev/null | head -1)"
else
  warn "No encontré el comando 'claude'. Instálalo con: npm install -g @anthropic-ai/claude-code"
fi

mkdir -p "${DEST}/skills" "${DEST}/agents" "${DEST}/hooks"

# --------------------------------------------------------------------- skills
for s in aprende learn; do
  src="${REPO}/.claude/skills/${s}"
  [ -d "$src" ] || { warn "Falta ${src}, la salto."; continue; }
  if [ -d "${DEST}/skills/${s}" ]; then
    mv "${DEST}/skills/${s}" "${DEST}/skills/${s}.bak-${STAMP}"
    warn "Versión previa de '${s}' movida a ${s}.bak-${STAMP}"
  fi
  cp -r "$src" "${DEST}/skills/"
  ok "skill  → ~/.claude/skills/${s}/"
done

# ------------------------------------------------------------------ subagente
agent="${REPO}/.claude/agents/curador-memoria.md"
if [ -f "$agent" ]; then
  cp "$agent" "${DEST}/agents/"
  ok "agente → ~/.claude/agents/curador-memoria.md"
else
  warn "No encontré curador-memoria.md"
fi

# ---------------------------------------------------------------------- hooks
if [ "$MODO" = "--sin-hooks" ]; then
  say "Modo --sin-hooks: no toco settings.json."
  echo
  ok "Listo. Abre Claude Code y escribe /aprende."
  echo
  exit 0
fi

cp "${REPO}/.claude/hooks/capture-signal.sh" "${DEST}/hooks/"
cp "${REPO}/.claude/hooks/stop-suggest.sh"   "${DEST}/hooks/"
chmod +x "${DEST}/hooks/capture-signal.sh" "${DEST}/hooks/stop-suggest.sh"
ok "hooks  → ~/.claude/hooks/"

settings="${DEST}/settings.json"
hooks_json="$(cat <<JSON
{
  "PostToolUse": [
    { "matcher": "Bash|Edit|Write",
      "hooks": [ { "type": "command", "command": "bash \$HOME/.claude/hooks/capture-signal.sh", "timeout": 5 } ] }
  ],
  "Stop": [
    { "hooks": [ { "type": "command", "command": "bash \$HOME/.claude/hooks/stop-suggest.sh", "timeout": 5 } ] }
  ]
}
JSON
)"

if [ ! -f "$settings" ]; then
  printf '{\n  "hooks": %s\n}\n' "$hooks_json" > "$settings"
  ok "settings.json creado con los 2 hooks"
elif command -v jq >/dev/null 2>&1; then
  cp "$settings" "${settings}.bak-${STAMP}"
  ok "Backup: ${settings}.bak-${STAMP}"
  tmp="$(mktemp)"
  jq --argjson h "$hooks_json" '.hooks = ((.hooks // {}) + $h)' "$settings" > "$tmp" && mv "$tmp" "$settings"
  ok "Hooks registrados en settings.json (lo demás quedó intacto)"
else
  warn "Ya tienes settings.json pero no tengo jq para fusionarlo sin romperlo."
  warn "Instala jq y vuelve a correr, o pega esto a mano bajo la clave \"hooks\":"
  printf '%s\n' "$hooks_json"
fi

# -------------------------------------------------------------------- resumen
echo
echo "Instalado:"
say "/aprende            — captura aprendizajes al cerrar sesión"
say "/learn              — alias en inglés"
say "@curador-memoria    — audita y poda la memoria (mensual)"
say "hooks               — acumulan señales; NUNCA escriben aprendizajes"
echo
say "Reinicia Claude Code para que aparezcan en el typeahead."
say "Para quitar los hooks:  bash scripts/instalar-aprende.sh --quitar"
echo
