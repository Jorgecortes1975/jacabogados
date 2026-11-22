#!/bin/sh
# Verificación completa del repositorio en un solo comando.
# Uso: sh scripts/verificar-todo.sh
# Sale con código 0 solo si todas las comprobaciones automáticas pasan.
# No modifica archivos versionados. Las comprobaciones que requieren una sesión interactiva
# o la red del despacho se listan al final como PENDIENTE; no se dan por hechas.

RAIZ="$(cd "$(dirname "$0")/.." && pwd)"
cd "$RAIZ" || exit 1
FALLOS=0

comprobar() {
  nombre="$1"; shift
  if "$@" >/tmp/verificar-$$.log 2>&1; then
    echo "OK     $nombre"
  else
    echo "FALLA  $nombre"
    tail -5 /tmp/verificar-$$.log | sed 's/^/       /'
    FALLOS=$((FALLOS + 1))
  fi
}

comprobar "suite de pruebas tests_jac" python3 -m pytest tests_jac -q
comprobar "suite de pruebas tests_gauntlet (control de escritos)" python3 -m pytest tests_gauntlet -q
comprobar "bin/jac prueba (aceptación)" ./bin/jac prueba
comprobar "puerta de verificación (hook Stop)" sh -c "CLAUDE_PROJECT_DIR='$RAIZ' sh hooks/gate-verificacion.sh"
comprobar "copias del revisor idénticas" cmp -s agents/jac-revisor.md .claude/agents/jac-revisor.md
comprobar "JSON de configuración válido" sh -c "python3 -m json.tool .claude/settings.json >/dev/null && python3 -m json.tool plantillas/requisitos-escrito.json >/dev/null"
comprobar "sintaxis de scripts de shell" sh -n hooks/gate-verificacion.sh
for js in agente-juridico-especializado.js lexa-super-router.js claude-mcp-transport.js; do
  comprobar "sintaxis Node $js" node --check "$js"
done
if command -v claude >/dev/null 2>&1; then
  comprobar "claude plugin validate (proyecto)" claude plugin validate .claude/agents
  comprobar "claude plugin validate (plugin)" claude plugin validate agents
else
  echo "OMITIDO claude plugin validate: la CLI 'claude' no está instalada"
fi

# Limpieza de cachés generados (ignorados por git)
find . -name __pycache__ -not -path "./.git/*" -prune -exec rm -rf {} + 2>/dev/null
find . -name .pytest_cache -not -path "./.git/*" -prune -exec rm -rf {} + 2>/dev/null
rm -f /tmp/verificar-$$.log

echo ""
echo "PENDIENTE (requiere sesión interactiva o red del despacho, no verificable aquí):"
echo "  - /hooks y /agents en una sesión con el diálogo de confianza aceptado"
echo "  - /retomar-asunto con un asunto ficticio, en sesión interactiva"
echo "  - verificación de sentencias (bin/jac sentencia) desde la red del despacho"

if [ "$FALLOS" -eq 0 ]; then
  echo ""
  echo "RESULTADO: todas las comprobaciones automáticas pasaron."
  exit 0
fi
echo ""
echo "RESULTADO: $FALLOS comprobación(es) fallaron."
exit 1
