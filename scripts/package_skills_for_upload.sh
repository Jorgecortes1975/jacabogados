#!/usr/bin/env bash
# package_skills_for_upload.sh
#
# Empaqueta cada skill de .claude/skills/ como un .zip individual, listo
# para subir vía Settings → Skills → Add Skill en Claude.ai web, Claude
# Desktop o Cowork (Vía 01 de la guía de instalación unificada).
#
# El zip queda con el mismo nombre que la carpeta de la skill, tal como
# exige el flujo de subida manual.
#
# Uso:
#   ./scripts/package_skills_for_upload.sh              # empaqueta las 15
#   ./scripts/package_skills_for_upload.sh verificacion-citas-co   # solo una

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SKILLS_DIR="$SCRIPT_DIR/../.claude/skills"
DIST_DIR="$SCRIPT_DIR/../dist"
ONLY_SKILL="${1:-}"

mkdir -p "$DIST_DIR"

package_one() {
  local skill_path="$1"
  local skill_name
  skill_name=$(basename "$skill_path")

  # Valida antes de empaquetar — no tiene sentido subir un SKILL.md roto.
  if ! python3 "$SCRIPT_DIR/validate_skill.py" --path "$skill_path/SKILL.md" > /tmp/validate_out.txt 2>&1; then
    echo "SALTADO: $skill_name — no pasa validate_skill.py:"
    cat /tmp/validate_out.txt
    echo "---"
    return
  fi

  local zip_file="$DIST_DIR/${skill_name}.zip"
  rm -f "$zip_file"
  (cd "$skill_path/.." && zip -rq "$zip_file" "$skill_name" -x "*.DS_Store")
  echo "OK: $zip_file"
}

if [[ -n "$ONLY_SKILL" ]]; then
  package_one "$SKILLS_DIR/$ONLY_SKILL"
else
  for skill_path in "$SKILLS_DIR"/*/; do
    package_one "${skill_path%/}"
  done
fi

echo ""
echo "Zips listos en: $DIST_DIR"
echo "Súbelos uno por uno en claude.ai → Settings → Skills → Add Skill"
echo "(o en Claude Desktop / Cowork, mismo flujo)."
