#!/usr/bin/env python3
"""
goal-autonomous-runner.py — Ejecutor autónomo hasta meta completada
Ejecuta iterativamente, reporta cada 1 hora, DETIENE cuando meta = ✅
"""

import sys
import json
import time
from datetime import datetime, timedelta
from pathlib import Path
from enum import Enum

GOALS_DIR = Path.home() / ".claude" / "goals"


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
        """Descompone objetivo automáticamente en fases"""
        # Heurística: detectar palabras clave y crear fases
        objective_lower = self.objective.lower()

        phases = []

        if "fase 1" in objective_lower or "postgresql" in objective_lower or "db" in objective_lower:
            phases.append({
                "name": "FASE 1 — PostgreSQL Base",
                "description": "Crear DB y ejecutar schema",
                "estimated_duration_min": 15,
                "subtasks": ["Crear DB", "Ejecutar schema", "Verificar estructura"],
                "status": "⏸️ PENDIENTE"
            })

        if "fase 2" in objective_lower or "sync" in objective_lower:
            phases.append({
                "name": "FASE 2 — Configurar Syncs",
                "description": "Gmail, Calendar, HubSpot, Slack",
                "estimated_duration_min": 120,
                "subtasks": ["Gmail dlt", "Calendar dlt", "HubSpot Airbyte", "Slack n8n"],
                "status": "⏸️ PENDIENTE"
            })

        if "seguridad" in objective_lower or "mcp" in objective_lower:
            phases.append({
                "name": "FASE 3 — Seguridad MCP",
                "description": "Role readonly + postgres-mcp",
                "estimated_duration_min": 15,
                "subtasks": ["Crear rol", "Instalar MCP", "Conectar a Claude"],
                "status": "⏸️ PENDIENTE"
            })

        if "automatización" in objective_lower or "scripts" in objective_lower:
            phases.append({
                "name": "FASE 4 — Automatización",
                "description": "Matriz de activadores + logging",
                "estimated_duration_min": 240,
                "subtasks": ["Matriz activadores", "Integrar arnés", "Logging JSON"],
                "status": "⏸️ PENDIENTE"
            })

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
        """Ejecuta goal hasta completar o timeout"""
        print(f"\n{'='*80}")
        print(f"🚀 AUTONOMOUS GOAL RUNNER STARTED")
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

            # Simular trabajo en fase actual
            if phase_idx < len(self.goal.phases):
                phase = self.goal.phases[phase_idx]
                print(f"[WORKING] Fase: {phase['name']}")

                # Simular subtareas
                for subtask in phase["subtasks"]:
                    print(f"  ✓ {subtask}")
                    time.sleep(0.5)  # Placeholder

                # Marcar fase como completada
                self.goal.complete_phase()
                phase_idx += 1

                # Reporte automático cada intervalo
                if datetime.now() >= self.next_report_time or self.goal.status == GoalStatus.COMPLETED:
                    elapsed_hours = (datetime.now() - start_time).total_seconds() / 3600
                    self.goal.add_report(
                        f"Completadas {self.goal.current_phase_idx}/{len(self.goal.phases)} fases. "
                        f"Tiempo: {elapsed_hours:.1f}h / {max_duration_hours}h"
                    )
                    self.goal.save()
                    self.goal.print_status()
                    self.next_report_time = datetime.now() + timedelta(seconds=self.report_interval)

        # Reporte final
        elapsed_hours = (datetime.now() - start_time).total_seconds() / 3600
        if self.goal.status == GoalStatus.COMPLETED:
            print(f"\n🟢 META COMPLETADA EN {elapsed_hours:.1f} HORAS")
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
