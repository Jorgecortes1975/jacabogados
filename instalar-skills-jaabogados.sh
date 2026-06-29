#!/usr/bin/env bash
# =============================================================================
# Instalador de Skills — JA Abogados
# Instala los 21 skills de Claude Code en cualquier proyecto
# Uso: bash instalar-skills-jaabogados.sh [ruta-del-proyecto]
# =============================================================================

set -euo pipefail

REPO="https://github.com/Jorgecortes1975/jacabogados.git"
BRANCH="claude/content-extraction-install-h776f8"
TMP_DIR=$(mktemp -d)
TARGET_DIR="${1:-.}"

VERDE="\033[0;32m"
AMARILLO="\033[1;33m"
ROJO="\033[0;31m"
AZUL="\033[0;34m"
RESET="\033[0m"
NEGRITA="\033[1m"

ok()   { echo -e "${VERDE}✅  $1${RESET}"; }
info() { echo -e "${AZUL}ℹ️   $1${RESET}"; }
warn() { echo -e "${AMARILLO}⚠️   $1${RESET}"; }
fail() { echo -e "${ROJO}❌  $1${RESET}"; exit 1; }

echo ""
echo -e "${NEGRITA}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo -e "${NEGRITA}  Instalador de Skills Claude Code — JA Abogados         ${RESET}"
echo -e "${NEGRITA}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo ""

# ── Verificar dependencias ──────────────────────────────────────────────────
command -v git >/dev/null 2>&1 || fail "git no está instalado. Instálalo desde https://git-scm.com"

# ── Resolver directorio destino ─────────────────────────────────────────────
TARGET_DIR="$(cd "${TARGET_DIR}" && pwd)"
info "Directorio destino: ${TARGET_DIR}"

COMMANDS_DIR="${TARGET_DIR}/.claude/commands"
SETTINGS_FILE="${TARGET_DIR}/.claude/settings.json"

# ── Clonar repositorio (sparse checkout para no bajar todo) ─────────────────
info "Descargando skills desde GitHub..."
git clone \
  --no-checkout \
  --depth=1 \
  --branch "${BRANCH}" \
  "${REPO}" \
  "${TMP_DIR}/repo" \
  --quiet 2>&1 || fail "No se pudo conectar al repositorio. Verifica tu conexión a internet."

cd "${TMP_DIR}/repo"
git sparse-checkout init --cone --quiet
git sparse-checkout set .claude --quiet
git checkout --quiet

ok "Repositorio descargado"

# ── Crear estructura de directorios ─────────────────────────────────────────
mkdir -p "${COMMANDS_DIR}"
ok "Directorio .claude/commands listo"

# ── Copiar skills ────────────────────────────────────────────────────────────
echo ""
echo -e "${NEGRITA}Instalando skills:${RESET}"
echo ""

SKILLS=(
  "alerta-legal|⚖️  Alerta Legal Urgente"
  "auditoria-cumplimiento|⚖️  Auditoría de Cumplimiento"
  "comunicacion-cliente|⚖️  Comunicación al Cliente"
  "estructura-empresa|⚖️  Estructura Jurídica"
  "implementar-sistema-legal|⚖️  Implementar Sistema Legal"
  "lider-juridico|⚖️  Líder Jurídico"
  "optimizar-proceso-legal|⚖️  Optimizar Proceso Legal"
  "reorganizar-documentacion|⚖️  Reorganizar Documentación"
  "revisar-contrato|⚖️  Revisar Contrato"
  "auditoria-codigo|💻  Auditoría de Código"
  "auditoria-seguridad|💻  Auditoría de Seguridad"
  "arquitectura-limpia|💻  Arquitectura Limpia"
  "backend-startup|💻  Backend Startup"
  "debug-produccion|💻  Debug Producción"
  "devops-despliegue|💻  DevOps Despliegue"
  "frontend-senior|💻  Frontend Senior"
  "lider-tecnico|💻  Líder Técnico"
  "mvp-startup|💻  MVP Startup"
  "optimizar-rendimiento|💻  Optimizar Rendimiento"
  "generar-crm|🗂️  Generar CRM"
  "actualizar-prospectos|🗂️  Actualizar Prospectos"
)

INSTALADOS=0
OMITIDOS=0

for entry in "${SKILLS[@]}"; do
  nombre="${entry%%|*}"
  etiqueta="${entry##*|}"
  src="${TMP_DIR}/repo/.claude/commands/${nombre}.md"
  dst="${COMMANDS_DIR}/${nombre}.md"

  if [[ ! -f "${src}" ]]; then
    warn "Archivo no encontrado: ${nombre}.md — omitiendo"
    (( OMITIDOS++ )) || true
    continue
  fi

  if [[ -f "${dst}" ]]; then
    # Hacer backup si ya existe
    cp "${dst}" "${dst}.bak"
    warn "${nombre}.md ya existía — respaldo guardado como ${nombre}.md.bak"
  fi

  cp "${src}" "${dst}"
  echo -e "  ${VERDE}✓${RESET}  /$(printf '%-30s' "${nombre}")  ${etiqueta}"
  (( INSTALADOS++ )) || true
done

# ── Configurar settings.json (solo si no existe) ────────────────────────────
echo ""
if [[ -f "${SETTINGS_FILE}" ]]; then
  warn "settings.json ya existe — no se sobreescribe"
  info "Verifica manualmente que contenga los permisos necesarios"
else
  cat > "${SETTINGS_FILE}" <<'SETTINGS'
{
  "permissions": {
    "allow": [
      "Bash(git status)",
      "Bash(git diff*)",
      "Bash(git log*)",
      "Bash(git add*)",
      "Bash(git commit*)",
      "Bash(git push*)",
      "Bash(git checkout*)",
      "Bash(git branch*)",
      "Bash(python3*)",
      "Bash(pip3 install*)",
      "Bash(ls*)",
      "Bash(cat*)"
    ]
  }
}
SETTINGS
  ok "settings.json creado con permisos básicos"
fi

# ── Limpieza ─────────────────────────────────────────────────────────────────
cd /
rm -rf "${TMP_DIR}"

# ── Resumen ──────────────────────────────────────────────────────────────────
echo ""
echo -e "${NEGRITA}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo -e "  ${VERDE}${NEGRITA}Instalación completa${RESET}"
echo -e "  Skills instalados : ${VERDE}${INSTALADOS}${RESET}"
[[ "${OMITIDOS}" -gt 0 ]] && echo -e "  Omitidos          : ${AMARILLO}${OMITIDOS}${RESET}"
echo -e "  Directorio        : ${TARGET_DIR}/.claude/commands/"
echo -e "${NEGRITA}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo ""
echo -e "${NEGRITA}Cómo usar los skills en Claude Code:${RESET}"
echo ""
echo -e "  ${AZUL}/revisar-contrato${RESET}        contrato_proveedor.pdf"
echo -e "  ${AZUL}/alerta-legal${RESET}            demanda laboral recibida hoy"
echo -e "  ${AZUL}/estructura-empresa${RESET}      startup tech 3 socios, buscamos inversión"
echo -e "  ${AZUL}/auditoria-cumplimiento${RESET}  empresa 25 empleados, sector salud"
echo ""
echo -e "${VERDE}¡Listo! Abre Claude Code en ${TARGET_DIR} y escribe / para ver los skills.${RESET}"
echo ""
