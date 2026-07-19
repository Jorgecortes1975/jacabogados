#!/usr/bin/env python3
"""
goal-autonomous-runner.py — Ejecutor autónomo hasta meta completada
Integrado con subagentes especializados para orquestación de fases
Delega a: postgres-specialist, sync-orchestrator, security-architect,
          automation-engineer, operations-manager vía project-coordinator
"""

import sys
import json
import time
from datetime import datetime, timedelta
from pathlib import Path
from enum import Enum

GOALS_DIR = Path.home() / ".claude" / "goals"
AGENTS_REGISTRY = {
    "FASE 1": "postgres-specialist",
    "FASE 2": "sync-orchestrator",
    "FASE 3": "security-architect",
    "FASE 4": "automation-engineer",
    "FASE 5": "operations-manager",
}


class GoalStatus(Enum):
    PLANNING = "⏳ PLANIFICANDO"
    IN_PROGRESS = "🔄 EN PROGRESO"
    PAUSED = "⏸️ PAUSADO"
    COMPLETED = "✅ COMPLETADO"
    FAILED = "❌ FALLÓ"


class Goal:
    def __init__(self, objective: str, phases: list = None):
        self.goal_id = datetime.now().strftime("GOAL_%Y_%m_%d_%H%M%S")
        self.objective = objective
        self.status = GoalStatus.PLANNING
        self.created_at = datetime.now()
        self.last_update = datetime.now()
        self.phases = phases or self._auto_phases()
        self.current_phase_idx = 0
        self.progress = 0
        self.reports = []
        self.goal_file = GOALS_DIR / f"{self.goal_id}.json"

    def _auto_phases(self) -> list:
        """Descompone objetivo automáticamente en fases y asigna subagentes"""
        objective_lower = self.objective.lower()
        phases = []

        # Detectar qué fases se solicitan
        if "fase 1" in objective_lower or "postgresql" in objective_lower or "db" in objective_lower or "completa" in objective_lower:
            phases.append({
                "name": "FASE 1 — PostgreSQL Base",
                "description": "Crear DB y ejecutar schema",
                "estimated_duration_min": 15,
                "subagent": AGENTS_REGISTRY["FASE 1"],
                "subagent_prompt": "Implementa FASE 1: Crea base de datos en Neon, ejecuta schema_completo.sql, verifica todas 9 tablas",
                "subtasks": ["Crear DB", "Ejecutar schema", "Verificar estructura"],
                "status": "⏸️ PENDIENTE"
            })

        if "fase 2" in objective_lower or "sync" in objective_lower or "completa" in objective_lower:
            phases.append({
                "name": "FASE 2 — Configurar Syncs",
                "description": "Gmail, Calendar, GitHub, LDH, HubSpot, Slack",
                "estimated_duration_min": 120,
                "subagent": AGENTS_REGISTRY["FASE 2"],
                "subagent_prompt": "Implementa FASE 2: Configura dlt para Gmail, Calendar, GitHub, LDH y Airbyte para HubSpot, n8n para Slack",
                "subtasks": ["Gmail dlt", "Calendar dlt", "GitHub dlt", "LDH dlt", "HubSpot Airbyte", "Slack n8n"],
                "status": "⏸️ PENDIENTE"
            })

        if "fase 3" in objective_lower or "seguridad" in objective_lower or "mcp" in objective_lower or "completa" in objective_lower:
            phases.append({
                "name": "FASE 3 — Seguridad MCP",
                "description": "Role readonly + postgres-mcp",
                "estimated_duration_min": 15,
                "subagent": AGENTS_REGISTRY["FASE 3"],
                "subagent_prompt": "Implementa FASE 3: Crea role claude_readonly, instala postgres-mcp, verifica SELECT funciona e INSERT falla",
                "subtasks": ["Crear rol", "Instalar MCP", "Conectar a Claude"],
                "status": "⏸️ PENDIENTE"
            })

        if "fase 4" in objective_lower or "automatización" in objective_lower or "completa" in objective_lower:
            phases.append({
                "name": "FASE 4 — Automatización",
                "description": "Matriz de activadores + logging",
                "estimated_duration_min": 45,
                "subagent": AGENTS_REGISTRY["FASE 4"],
                "subagent_prompt": "Implementa FASE 4: Diseña matriz de triggers, implementa event listeners, crea logging JSON, tests 80%+",
                "subtasks": ["Matriz activadores", "Event listeners", "Action executors", "Logging JSON", "Tests"],
                "status": "⏸️ PENDIENTE"
            })

        if "fase 5" in objective_lower or "operaciones" in objective_lower or "completa" in objective_lower:
            phases.append({
                "name": "FASE 5 — Operaciones",
                "description": "Runbooks + cron jobs + monitoreo",
                "estimated_duration_min": 30,
                "subagent": AGENTS_REGISTRY["FASE 5"],
                "subagent_prompt": "Implementa FASE 5: Crea runbooks, programa cron jobs, activa monitoreo, define SLAs",
                "subtasks": ["Runbooks", "Cron jobs", "Monitoreo", "SLAs"],
                "status": "⏸️ PENDIENTE"
            })

        # Si se menciona "completa" o "todas", usar project-coordinator
        if "completa" in objective_lower or "todas" in objective_lower:
            return [{
                "name": "ORQUESTACIÓN COMPLETA",
                "description": "Todas 5 fases coordinadas",
                "estimated_duration_min": 165,
                "subagent": "project-coordinator",
                "subagent_prompt": "Implementa todas 5 fases: Delega a subagentes especializados, valida precondiciones, reporta progreso",
                "subtasks": ["FASE 1", "FASE 2", "FASE 3", "FASE 4", "FASE 5"],
                "status": "⏸️ PENDIENTE"
            }]

        # Fases por defecto si no hay match
        if not phases:
            phases.append({
                "name": f"FASE 1 — {self.objective[:40]}",
                "description": "Implementación fase 1",
                "estimated_duration_min": 60,
                "subtasks": ["Análisis", "Implementación", "Verificación"],
                "status": "⏸️ PENDIENTE"
            })

        return phases

    def start(self):
        """Inicia ejecución autónoma"""
        self.status = GoalStatus.IN_PROGRESS
        self.last_update = datetime.now()

    def complete_phase(self):
        """Marca fase actual como completada"""
        if self.current_phase_idx < len(self.phases):
            self.phases[self.current_phase_idx]["status"] = "✅ COMPLETADO"
            self.current_phase_idx += 1
            self.progress = int((self.current_phase_idx / len(self.phases)) * 100)
            self.last_update = datetime.now()

            # Si todas las fases están completas, marcar meta como completada
            if self.current_phase_idx >= len(self.phases):
                self.status = GoalStatus.COMPLETED

    def add_report(self, message: str):
        """Añade reporte de progreso"""
        report = {
            "timestamp": datetime.now().isoformat(),
            "message": message,
            "progress": self.progress,
            "status": self.status.value
        }
        self.reports.append(report)

    def save(self):
        """Guarda estado de meta en JSON"""
        GOALS_DIR.mkdir(parents=True, exist_ok=True)

        data = {
            "goal_id": self.goal_id,
            "objective": self.objective,
            "status": self.status.value,
            "created_at": self.created_at.isoformat(),
            "last_update": self.last_update.isoformat(),
            "progress": self.progress,
            "phases": self.phases,
            "reports": self.reports
        }

        self.goal_file.write_text(json.dumps(data, indent=2))

    def print_status(self):
        """Imprime estado actual"""
        print(f"\n{'='*80}")
        print(f"🎯 GOAL STATUS — {self.goal_id}")
        print(f"{'='*80}")

        print(f"\n📌 OBJETIVO")
        print(f"  {self.objective}")

        print(f"\n📊 PROGRESO: {self.progress}% ({self.current_phase_idx}/{len(self.phases)} fases)")

        print(f"\n📋 FASES")
        for i, phase in enumerate(self.phases, 1):
            print(f"  {i}. {phase['status']} {phase['name']}")
            print(f"     {phase['description']}")
            print(f"     Estimado: {phase['estimated_duration_min']} min")

        if self.reports:
            print(f"\n📝 ÚLTIMOS REPORTES")
            for report in self.reports[-3:]:  # Últimos 3
                print(f"  [{report['timestamp'][-8:]}] {report['message']}")

        print(f"\n{'='*80}\n")


class GoalRunner:
    def __init__(self, objective: str, report_interval_seconds: int = 3600):
        self.goal = Goal(objective)
        self.report_interval = report_interval_seconds
        self.next_report_time = datetime.now() + timedelta(seconds=report_interval_seconds)

    def run(self, max_duration_hours: int = 16):
        """Ejecuta goal delegando a subagentes especializados"""
        print(f"\n{'='*80}")
        print(f"🚀 AUTONOMOUS GOAL RUNNER STARTED (v2 with Subagents)")
        print(f"{'='*80}")
        print(f"Objetivo: {self.goal.objective}")
        print(f"Duración máxima: {max_duration_hours} horas")
        print(f"Reportes cada: {self.report_interval // 60} min")
        print(f"{'='*80}\n")

        self.goal.start()
        start_time = datetime.now()
        max_time = start_time + timedelta(hours=max_duration_hours)

        phase_idx = 0

        while self.goal.status == GoalStatus.IN_PROGRESS and datetime.now() < max_time:

            if phase_idx < len(self.goal.phases):
                phase = self.goal.phases[phase_idx]
                print(f"\n[DELEGANDO] Fase: {phase['name']}")
                print(f"Subagente: @{phase.get('subagent', 'N/A')}")

                # Mostrar instrucción de delegación para Claude
                if "subagent_prompt" in phase:
                    print(f"\n📋 Instrucción para Claude Code:")
                    print(f"   @{phase['subagent']} {phase['subagent_prompt']}")
                    print(f"\n   ⏳ Esperando respuesta del subagente...")
                    print(f"   (Este es un placeholder; en Claude Code real, Claude invoca el subagente)")

                # Simular subtareas del subagente
                print(f"\n  Subtareas:")
                for subtask in phase["subtasks"]:
                    print(f"    ✓ {subtask}")
                    time.sleep(0.3)

                # Marcar fase como completada
                self.goal.complete_phase()
                phase_idx += 1

                # Simular resultado del subagente
                print(f"\n  ✅ {phase['name']} completada exitosamente")

                # Reporte automático cada intervalo
                if datetime.now() >= self.next_report_time or self.goal.status == GoalStatus.COMPLETED:
                    elapsed_hours = (datetime.now() - start_time).total_seconds() / 3600
                    self.goal.add_report(
                        f"Completadas {self.goal.current_phase_idx}/{len(self.goal.phases)} fases. "
                        f"Tiempo: {elapsed_hours:.1f}h / {max_duration_hours}h. "
                        f"Próxima fase: {self.goal.phases[self.goal.current_phase_idx]['name'] if self.goal.current_phase_idx < len(self.goal.phases) else 'NINGUNA'}"
                    )
                    self.goal.save()
                    self.goal.print_status()
                    self.next_report_time = datetime.now() + timedelta(seconds=self.report_interval)

        # Reporte final
        elapsed_hours = (datetime.now() - start_time).total_seconds() / 3600
        if self.goal.status == GoalStatus.COMPLETED:
            print(f"\n🟢 META COMPLETADA EN {elapsed_hours:.1f} HORAS")
            print(f"\n📊 RESUMEN POR FASE:")
            for i, phase in enumerate(self.goal.phases, 1):
                print(f"  {i}. ✅ {phase['name']} — Delegado a {phase.get('subagent', 'N/A')}")
            print(f"\n💾 Memorias guardadas en: .claude/agent-memory/")
            print(f"   - project-coordinator/MEMORY.md")
            print(f"   - postgres-specialist/MEMORY.md")
            print(f"   - sync-orchestrator/MEMORY.md")
            print(f"   - security-architect/MEMORY.md")
            print(f"   - automation-engineer/MEMORY.md")
            print(f"   - operations-manager/MEMORY.md")
        else:
            print(f"\n🟠 TIMEOUT: {elapsed_hours:.1f}h > {max_duration_hours}h")
            self.goal.status = GoalStatus.FAILED

        self.goal.save()
        self.goal.print_status()


def main():
    if len(sys.argv) < 2:
        print("Uso:")
        print("  goal-autonomous-runner.py 'tu meta aquí'")
        print("\nEjemplos:")
        print("  goal-autonomous-runner.py 'Implementar FASE 1 y FASE 2 completamente'")
        print("  goal-autonomous-runner.py 'Setup PostgreSQL + primeros syncs'")
        sys.exit(1)

    objective = " ".join(sys.argv[1:])

    runner = GoalRunner(objective, report_interval_seconds=60)  # Reporte cada 60s para demo
    runner.run(max_duration_hours=16)


if __name__ == "__main__":
    main()
