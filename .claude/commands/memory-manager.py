#!/usr/bin/env python3
"""
memory-manager.py — Persistencia de contexto entre sesiones
Guarda resumen de sesión actual; recupera resumen de sesión anterior
"""

import os
import json
import sys
from datetime import datetime
from pathlib import Path

MEMORY_DIR = Path.home() / ".claude" / "memory"
CURRENT_FILE = MEMORY_DIR / "current.md"
SESSIONS_DIR = MEMORY_DIR / "sessions"
INDEX_FILE = MEMORY_DIR / "index.json"


def init_memory():
    """Inicializa estructura de directorios"""
    MEMORY_DIR.mkdir(parents=True, exist_ok=True)
    SESSIONS_DIR.mkdir(parents=True, exist_ok=True)


def load_previous_memory():
    """Carga resumen de sesión anterior"""
    if CURRENT_FILE.exists():
        return CURRENT_FILE.read_text()
    return None


def save_current_memory(summary: str, session_id: str = None):
    """
    Guarda resumen de sesión actual

    Args:
        summary: Texto de resumen (5 secciones)
        session_id: ID de sesión (auto-generado si no se proporciona)
    """
    if session_id is None:
        session_id = datetime.now().strftime("%Y-%m-%d_%H%M%S")

    # Guardar como current.md
    CURRENT_FILE.write_text(summary)

    # Guardar snapshot con timestamp
    snapshot_file = SESSIONS_DIR / f"{session_id}.md"
    snapshot_file.write_text(summary)

    # Actualizar índice
    update_index(session_id, summary)


def update_index(session_id: str, summary: str):
    """Actualiza índice de sesiones"""
    if INDEX_FILE.exists():
        index = json.loads(INDEX_FILE.read_text())
    else:
        index = {"sessions": [], "total_tokens": 0}

    # Contar líneas como aproximación de tokens
    token_count = len(summary.split()) * 1.3  # factor de conversión palabra→token

    index["sessions"].append({
        "session_id": session_id,
        "timestamp": datetime.now().isoformat(),
        "tokens": int(token_count),
        "file": str(SESSIONS_DIR / f"{session_id}.md")
    })

    index["total_tokens"] = sum(s.get("tokens", 0) for s in index["sessions"])

    # Guardar últimas 10 sesiones
    index["sessions"] = index["sessions"][-10:]

    INDEX_FILE.write_text(json.dumps(index, indent=2))


def template_memory() -> str:
    """Retorna template de resumen de 5 secciones"""
    return f"""# MEMORIA — Sesión {datetime.now().strftime('%Y-%m-%d %H:%M')}

## 1️⃣ TAREA PRINCIPAL
[Una línea del objetivo]

## 2️⃣ ESTADO ACTUAL
[✅/❌/⏳ de cada subtarea]
[% completitud total]

## 3️⃣ ARCHIVOS CREADOS
[Lista de rutas con líneas/tamaño]

## 4️⃣ PENDIENTES
[Qué falta para completar]

## 5️⃣ CONTEXTO CRÍTICO
[3 puntos que la próxima sesión DEBE recordar]
[Fechas vencimiento, tokens gastados, decisiones bloqueantes]

---
**Guardar este resumen para recuperarlo en la siguiente sesión.**
"""


def main():
    init_memory()

    if len(sys.argv) < 2:
        print("Uso:")
        print("  memory-manager.py load      → Carga resumen de sesión anterior")
        print("  memory-manager.py save      → Guarda resumen actual (interactivo)")
        print("  memory-manager.py template  → Muestra template")
        print("  memory-manager.py list      → Lista últimas 10 sesiones")
        sys.exit(1)

    command = sys.argv[1]

    if command == "load":
        prev = load_previous_memory()
        if prev:
            print("="*80)
            print("MEMORIA DE SESIÓN ANTERIOR")
            print("="*80)
            print(prev)
            print("="*80)
        else:
            print("[MEMORIA] Sin sesiones anteriores registradas")

    elif command == "save":
        session_id = sys.argv[2] if len(sys.argv) > 2 else None
        print("Ingresa resumen de sesión (Ctrl+D para finalizar):")
        lines = sys.stdin.readlines()
        summary = "".join(lines)
        save_current_memory(summary, session_id)
        print(f"✅ Sesión guardada: {session_id}")

    elif command == "template":
        print(template_memory())

    elif command == "list":
        if INDEX_FILE.exists():
            index = json.loads(INDEX_FILE.read_text())
            print("Últimas 10 sesiones:")
            for s in index["sessions"][-10:]:
                print(f"  {s['session_id']} | {s['tokens']} tokens")
        else:
            print("[MEMORIA] Sin sesiones registradas")


if __name__ == "__main__":
    main()
