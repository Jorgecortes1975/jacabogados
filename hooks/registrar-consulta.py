"""Hook PostToolUse: anota en registro.jsonl cada consulta `python3 -m jac` de la investigación.

Solo actúa si JAC_REGISTRO está definida (la fija jac investigar). Fuera de ese flujo no hace nada.
Nunca falla: un error en el hook no debe bloquear las herramientas de la sesión.
"""
import json
import os
import sys
from datetime import datetime, timezone


def main() -> int:
    destino = os.environ.get("JAC_REGISTRO")
    if not destino:
        return 0
    try:
        evento = json.load(sys.stdin)
        comando = (evento.get("tool_input") or {}).get("command", "")
        if "-m jac" not in comando:
            return 0
        fila = {
            "ts": datetime.now(timezone.utc).isoformat(timespec="seconds"),
            "comando": comando[:500],
            "claves_del_evento": sorted(evento.keys()),
            "respuesta": str(evento.get("tool_response"))[:2000],
        }
        with open(destino, "a", encoding="utf8") as f:
            f.write(json.dumps(fila, ensure_ascii=False) + "\n")
    except Exception:
        pass
    return 0


if __name__ == "__main__":
    sys.exit(main())
