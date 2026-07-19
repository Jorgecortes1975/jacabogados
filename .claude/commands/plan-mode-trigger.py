#!/usr/bin/env python3
"""
plan-mode-trigger.py — Activador de Plan Mode automático
Investiga objetivo, genera plan, solicita confirmación antes de ejecutar
"""

import sys
import json
from datetime import datetime
from pathlib import Path

PLANS_DIR = Path.home() / ".claude" / "plans"


class PlanModeEngine:
    def __init__(self, objective: str):
        self.objective = objective
        self.plan_id = datetime.now().strftime("PLAN_%Y_%m_%d_%H%M%S")
        self.plan_file = PLANS_DIR / f"{self.plan_id}.json"

    def analyze_objective(self) -> dict:
        """Analiza objetivo y determina requisitos"""
        # Aquí iría lógica real de análisis; por ahora retorna template
        if "postgresql" in self.objective.lower() or "db" in self.objective.lower():
            return self._plan_postgresql()
        elif "sync" in self.objective.lower():
            return self._plan_syncs()
        elif "security" in self.objective.lower() or "mcp" in self.objective.lower():
            return self._plan_security()
        else:
            return self._generic_plan()

    def _plan_postgresql(self) -> dict:
        """Plan para setup de PostgreSQL (FASE 1)"""
        return {
            "objective": self.objective,
            "phase": "FASE 1 — PostgreSQL Base",
            "preconditions": [
                "Email de acceso Neon/Supabase",
                "Contraseña generada (32 caracteres)",
                "schema_completo.sql descargado",
                "psql instalado localmente"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Crear base de datos",
                    "description": "Neon dashboard → New Project → jacabogados",
                    "duration_min": 5,
                    "validation": "Copiar connection string"
                },
                {
                    "step": 2,
                    "title": "Ejecutar schema",
                    "description": "psql '...' < schema_completo.sql",
                    "duration_min": 2,
                    "validation": "\\d clients; debe mostrar tabla"
                },
                {
                    "step": 3,
                    "title": "Verificar estructura",
                    "description": "SELECT COUNT(*) FROM clients;",
                    "duration_min": 3,
                    "validation": "Debe retornar 0 (normal)"
                }
            ],
            "validations": [
                "Tabla clients existe",
                "Tabla meetings existe",
                "Vista client_activity existe",
                "INSERT test rechazado (permisos)"
            ],
            "risks": [
                {
                    "risk": "Credenciales mal",
                    "impact": "CRÍTICO",
                    "mitigation": "Test conexión antes de schema"
                },
                {
                    "risk": "SQL typo",
                    "impact": "CRÍTICO",
                    "mitigation": "Ejecutar por partes, verificar cada CREATE TABLE"
                },
                {
                    "risk": "Timeout durante schema",
                    "impact": "MODERADO",
                    "mitigation": "Reintentar o ejecutar en chunks"
                }
            ],
            "estimated_time_minutes": 15,
            "buffer_minutes": 5
        }

    def _plan_syncs(self) -> dict:
        """Plan para setup de syncs (FASE 2)"""
        return {
            "objective": self.objective,
            "phase": "FASE 2 — Syncs Iniciales",
            "preconditions": [
                "Database creada y verificada",
                "dlt instalado (pip install dlt[postgres])",
                "Credenciales Google (Gmail, Calendar)",
                "Credenciales HubSpot API token"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Configurar dlt Gmail",
                    "description": "pip install dlt[postgres] google-auth-oauthlib",
                    "duration_min": 30,
                    "validation": "SELECT COUNT(*) FROM messages WHERE channel='email' > 0"
                },
                {
                    "step": 2,
                    "title": "Configurar dlt Calendar",
                    "description": "Credenciales Google Calendar OAuth",
                    "duration_min": 30,
                    "validation": "SELECT COUNT(*) FROM meetings > 0"
                }
            ],
            "risks": [
                {
                    "risk": "API credentials expiran",
                    "impact": "ALTO",
                    "mitigation": "Generar nuevos tokens cada 90 días"
                }
            ],
            "estimated_time_minutes": 90,
            "buffer_minutes": 30
        }

    def _plan_security(self) -> dict:
        """Plan para setup de seguridad (FASE 3)"""
        return {
            "objective": self.objective,
            "phase": "FASE 3 — Seguridad MCP",
            "preconditions": [
                "PostgreSQL funcionando",
                "pipx instalado",
                "Claude Code CLI disponible"
            ],
            "steps": [
                {
                    "step": 1,
                    "title": "Crear rol claude_readonly",
                    "description": "Ejecutar SQL de SEGURIDAD_MCP_ROLES.md",
                    "duration_min": 5,
                    "validation": "SELECT * FROM information_schema.role_table_grants WHERE grantee='claude_readonly'"
                },
                {
                    "step": 2,
                    "title": "Instalar postgres-mcp",
                    "description": "pipx install postgres-mcp",
                    "duration_min": 5,
                    "validation": "postgres-mcp --version"
                },
                {
                    "step": 3,
                    "title": "Conectar a Claude",
                    "description": "claude mcp add postgres --access-mode=restricted",
                    "duration_min": 5,
                    "validation": "SELECT 1; debe funcionar, INSERT debe fallar"
                }
            ],
            "risks": [
                {
                    "risk": "Role puede escribir",
                    "impact": "CRÍTICO",
                    "mitigation": "Verificar REVOKE se ejecutó; test INSERT"
                }
            ],
            "estimated_time_minutes": 15,
            "buffer_minutes": 5
        }

    def _generic_plan(self) -> dict:
        """Plan genérico para objetivo desconocido"""
        return {
            "objective": self.objective,
            "phase": "ANÁLISIS REQUERIDO",
            "preconditions": ["Objetivo clarificado"],
            "steps": [{"step": 1, "title": "Analizar", "description": self.objective}],
            "risks": [],
            "estimated_time_minutes": 60,
            "buffer_minutes": 30
        }

    def generate_plan(self) -> dict:
        """Genera plan completo"""
        plan_data = self.analyze_objective()
        plan_data["plan_id"] = self.plan_id
        plan_data["generated_at"] = datetime.now().isoformat()

        # Guardar plan
        PLANS_DIR.mkdir(parents=True, exist_ok=True)
        self.plan_file.write_text(json.dumps(plan_data, indent=2))

        return plan_data

    def print_plan(self, plan_data: dict):
        """Imprime plan en formato legible"""
        print(f"\n{'='*80}")
        print(f"PLAN MODE — {plan_data['phase']}")
        print(f"{'='*80}")

        print(f"\n📋 OBJETIVO")
        print(f"  {plan_data['objective']}")

        print(f"\n✅ PRECONDICIONES")
        for i, cond in enumerate(plan_data["preconditions"], 1):
            print(f"  [{i}] {cond}")

        print(f"\n📝 PASOS")
        for step in plan_data["steps"]:
            print(f"\n  Paso {step['step']}: {step['title']}")
            print(f"    Descripción: {step['description']}")
            print(f"    Duración: {step['duration_min']} min")
            print(f"    Validación: {step['validation']}")

        print(f"\n🔍 VALIDACIONES (después de completar)")
        for i, val in enumerate(plan_data["validations"], 1):
            print(f"  [{i}] {val}")

        print(f"\n⚠️ RIESGOS IDENTIFICADOS")
        for risk in plan_data["risks"]:
            print(f"  • {risk['risk']} (Impacto: {risk['impact']})")
            print(f"    → {risk['mitigation']}")

        total_time = plan_data["estimated_time_minutes"] + plan_data["buffer_minutes"]
        print(f"\n⏱️ TIEMPO ESTIMADO: {total_time} minutos")
        print(f"  ({plan_data['estimated_time_minutes']} min trabajo + {plan_data['buffer_minutes']} min buffer)")

        print(f"\n{'='*80}")
        print(f"Plan guardado: {self.plan_file}")
        print(f"{'='*80}\n")

    def confirm_execution(self) -> bool:
        """Solicita confirmación antes de ejecutar"""
        print(f"\n📌 NOTA: Este plan será ejecutado por subagentes especializados:")
        print(f"  - postgres-specialist (FASE 1)")
        print(f"  - sync-orchestrator (FASE 2)")
        print(f"  - security-architect (FASE 3)")
        print(f"  - automation-engineer (FASE 4)")
        print(f"  - operations-manager (FASE 5)")
        print(f"\n💡 Usa @project-coordinator para orquestación automática")
        response = input("\n¿Ejecutar este plan? (s/n): ").lower().strip()
        return response == "s"


def main():
    if len(sys.argv) < 2:
        print("Uso:")
        print("  plan-mode-trigger.py 'tu objetivo aquí'")
        print("\nEjemplos:")
        print("  plan-mode-trigger.py 'Implementar PostgreSQL en Neon'")
        print("  plan-mode-trigger.py 'Configurar syncs Gmail y Calendar'")
        print("  plan-mode-trigger.py 'Setup seguridad MCP con postgres-mcp'")
        sys.exit(1)

    objective = " ".join(sys.argv[1:])
    engine = PlanModeEngine(objective)

    print(f"\n[PLAN MODE] Analizando objetivo...")
    plan = engine.generate_plan()
    engine.print_plan(plan)

    if engine.confirm_execution():
        print("\n✅ Procede con ejecución")
        print("Usa los scripts apropiados:")
        print("  - PostgreSQL: batch-executor.py run BATCH_...")
        print("  - Syncs: batch-executor.py run BATCH_...")
        print("  - Seguridad: bash git-rewind-wrapper.sh")
    else:
        print("\n⏸️ Ejecución cancelada")


if __name__ == "__main__":
    main()
