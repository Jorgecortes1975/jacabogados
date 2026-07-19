#!/bin/bash
#
# git-rewind-wrapper.sh — Undo seguro con git (revierte N últimos commits)
# Uso: git-rewind-wrapper.sh 3 (revierte últimos 3 commits)
#

set -e

if [ $# -eq 0 ]; then
    echo "Uso: git-rewind-wrapper.sh <num_commits>"
    echo "Ejemplo: git-rewind-wrapper.sh 3  (revierte últimos 3 commits)"
    exit 1
fi

NUM_COMMITS=$1
REPO_DIR=$(git rev-parse --show-toplevel)

echo "================================================================================"
echo "GIT REWIND — Reverting last $NUM_COMMITS commit(s)"
echo "================================================================================"
echo ""

# Validar que num es número
if ! [[ "$NUM_COMMITS" =~ ^[0-9]+$ ]]; then
    echo "❌ Error: $NUM_COMMITS no es un número"
    exit 1
fi

# Contar commits en rama
TOTAL_COMMITS=$(git rev-list --count HEAD)
if [ "$NUM_COMMITS" -gt "$TOTAL_COMMITS" ]; then
    echo "❌ Error: Solo hay $TOTAL_COMMITS commits, no $NUM_COMMITS"
    exit 1
fi

echo "📋 ÚLTIMOS $NUM_COMMITS COMMITS:"
echo ""
git log --oneline -n "$NUM_COMMITS"
echo ""

# Solicitar confirmación
read -p "¿Reverter estos $NUM_COMMITS commits? (s/n): " -r CONFIRM
if [ "$CONFIRM" != "s" ]; then
    echo "⏸️ Cancelado"
    exit 0
fi

echo ""
echo "⏳ Ejecutando git reset --soft HEAD~$NUM_COMMITS ..."
git reset --soft HEAD~"$NUM_COMMITS"

CHANGED_FILES=$(git diff --cached --name-only | wc -l)
CHANGED_LINES=$(git diff --cached --stat | tail -1)

echo ""
echo "✅ Revertidos $NUM_COMMITS commits"
echo "📝 Cambios en staging (listos para revisar/stash/commit):"
echo "   Archivos: $CHANGED_FILES"
echo "   Cambios: $CHANGED_LINES"
echo ""

echo "Opciones:"
echo "  1. Revisar cambios:  git diff --cached"
echo "  2. Hacer stash:      git stash"
echo "  3. Nuevo commit:     git commit -m 'Descripción'"
echo "  4. Ver status:       git status"
echo ""

# Opción: crear resumen de cambios
echo "📸 Resumen de archivos modificados:"
git diff --cached --name-status | head -20
echo ""

echo "================================================================================"
echo "REWIND COMPLETADO"
echo "================================================================================"
