#!/usr/bin/env bash
# deploy-skills-to-cowork.sh
#
# Empaqueta cada Skill de .claude/skills/ y lo sube a Claude vía la Skills API
# (beta) para que quede disponible como Skill instalable en Cowork/claude.ai,
# no solo como Skill de proyecto local en este repositorio.
#
# ADVERTENCIA — VERIFICAR ANTES DE EJECUTAR EN PRODUCCIÓN:
# Este script se construyó con el mismo criterio anti-alucinación que exige
# el resto de esta guía: no se asume como confirmado lo que no se pudo
# verificar en vivo contra la documentación vigente. Antes de correrlo:
#   1. Confirma en platform.claude.com/docs/en/agents-and-tools/skills el
#      nombre exacto del campo multipart que espera POST /v1/skills (aquí se
#      usa "files" y "display_name" como la forma más probable, sin garantía).
#   2. Confirma si la API espera el .zip del directorio completo (incluido
#      SKILL.md y references/) o los archivos sueltos.
#   3. Si tu organización se autentica con OAuth en vez de API key, cambia el
#      header `x-api-key` por `Authorization: Bearer $(ant auth print-credentials --access-token)`
#      y agrega `anthropic-beta: oauth-2025-04-20`.
#   4. Ejecuta primero contra UN solo skill (ver USO abajo) y confirma en la
#      consola de Anthropic que se creó correctamente antes de subir los 14.
#
# USO:
#   ANTHROPIC_API_KEY=sk-ant-... ./deploy-skills-to-cowork.sh                 # los 14
#   ANTHROPIC_API_KEY=sk-ant-... ./deploy-skills-to-cowork.sh verificacion-citas-co  # solo uno

set -euo pipefail

SKILLS_DIR="$(dirname "$0")/skills"
BETA_HEADER="skills-2025-10-02"
API_KEY="${ANTHROPIC_API_KEY:?Configura ANTHROPIC_API_KEY antes de ejecutar (o usa 'ant auth login' y adapta el header de autenticación — ver advertencia arriba)}"
API_VERSION="2023-06-01"
ONLY_SKILL="${1:-}"

deploy_one() {
  local skill_path="$1"
  local skill_name
  skill_name=$(basename "$skill_path")

  echo "=== $skill_name — empaquetando ==="
  local zip_file
  zip_file="$(mktemp -d)/${skill_name}.zip"
  (cd "$skill_path" && zip -rq "$zip_file" . -x "*.DS_Store")

  echo "=== $skill_name — subiendo a la Skills API ==="
  local response
  response=$(curl -s -X POST https://api.anthropic.com/v1/skills \
    -H "x-api-key: $API_KEY" \
    -H "anthropic-version: $API_VERSION" \
    -H "anthropic-beta: $BETA_HEADER" \
    -F "display_name=${skill_name}" \
    -F "files=@${zip_file}")

  if echo "$response" | python3 -c "import json,sys; json.load(sys.stdin)" 2>/dev/null; then
    echo "$response" | python3 -m json.tool
  else
    echo "RESPUESTA NO-JSON (probable error de autenticación o de campo del formulario):"
    echo "$response"
  fi
  echo "---"
}

if [[ -n "$ONLY_SKILL" ]]; then
  deploy_one "$SKILLS_DIR/$ONLY_SKILL"
else
  for skill_path in "$SKILLS_DIR"/*/; do
    deploy_one "$skill_path"
  done
fi

echo "Listo. Verifica en platform.claude.com > Skills que cada uno aparezca con el contenido correcto antes de habilitarlo para todo el despacho en Cowork."
