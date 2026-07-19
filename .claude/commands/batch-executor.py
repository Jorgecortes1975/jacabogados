#!/usr/bin/env python3
"""
batch-executor.py — Ejecutor de cola de tareas secuencial
Ejecuta tareas en orden, reporta progreso, pausa en errores
"""

import sys
import json
import time
from datetime import datetime
from pathlib import Path
from dataclasses import dataclass, asdict

BATCH_DIR = Path.home() / ".claude" / "batches"


@dataclass
class Task:
    id: str
    type: str
    description: str
    status: str = "⏸️ EN COLA"
    timestamp: str = None
    output: str = ""
    error: str = ""

    def to_dict(self):
        return asdict(self)


class BatchExecutor:
    def __init__(self, batch_id: str = None):
        self.batch_id = batch_id or datetime.now().strftime("BATCH_%Y_%m_%d_%H%M%S")
        self.tasks = []
        self.results = {
            "batch_id": self.batch_id,
            "created_at": datetime.now().isoformat(),
            "status": "RUNNING",
            "tasks": [],
            "summary": {
                "total": 0,
                "completed": 0,
                "in_progress": 0,
                "queued": 0,
                "failed": 0
            }
        }
        self.batch_file = BATCH_DIR / f"{self.batch_id}.json"

    def add_task(self, task_id: str, task_type: str, description: str):
        """Añade tarea a la cola"""
        task = Task(id=task_id, type=task_type, description=description)
        self.tasks.append(task)

    def load_batch(self, batch_id: str):
        """Carga batch desde archivo"""
        batch_file = BATCH_DIR / f"{batch_id}.json"
        if batch_file.exists():
            data = json.loads(batch_file.read_text())
            self.batch_id = batch_id
            self.results = data
            self.tasks = [Task(**t) for t in data["tasks"]]
            return True
        return False

    def execute_task(self, task: Task) -> bool:
        """Ejecuta una tarea (placeholder para integración real)"""
        print(f"\n[{self.batch_id}] Ejecutando: {task.id} ({task.type})")
        print(f"  Descripción: {task.description}")

        task.status = "⏳ EN PROGRESO"
        task.timestamp = datetime.now().isoformat()
        self._save_progress()

        # Simula ejecución
        try:
            time.sleep(1)  # Placeholder
            task.status = "✅ COMPLETADO"
            task.output = f"Completado exitosamente: {task.description}"
            self.results["summary"]["completed"] += 1
            return True
        except Exception as e:
            task.status = "❌ ERROR"
            task.error = str(e)
            self.results["summary"]["failed"] += 1
            return False

    def run(self, stop_on_error: bool = False):
        """Ejecuta todas las tareas en secuencia"""
        self.results["summary"]["total"] = len(self.tasks)
        print(f"\n{'='*80}")
        print(f"EJECUTANDO BATCH: {self.batch_id}")
        print(f"{'='*80}")
        print(f"Total tareas: {len(self.tasks)}")
        print(f"Hora inicio: {datetime.now().isoformat()}\n")

        for task in self.tasks:
            success = self.execute_task(task)

            if not success and stop_on_error:
                print(f"\n❌ DETENIDO: Error en {task.id}")
                self.results["status"] = "STOPPED"
                break

        self.results["status"] = "COMPLETED" if not any(
            t.status == "❌ ERROR" for t in self.tasks
        ) else "COMPLETED_WITH_ERRORS"

        self._save_progress()
        self.print_summary()

    def _save_progress(self):
        """Guarda progreso en JSON"""
        BATCH_DIR.mkdir(parents=True, exist_ok=True)
        self.results["tasks"] = [t.to_dict() for t in self.tasks]
        self.results["summary"]["in_progress"] = sum(
            1 for t in self.tasks if t.status == "⏳ EN PROGRESO"
        )
        self.results["summary"]["queued"] = sum(
            1 for t in self.tasks if t.status == "⏸️ EN COLA"
        )
        self.batch_file.write_text(json.dumps(self.results, indent=2))

    def print_summary(self):
        """Imprime resumen de ejecución"""
        summary = self.results["summary"]
        print(f"\n{'='*80}")
        print("RESUMEN DE BATCH")
        print(f"{'='*80}")
        print(f"Batch ID: {self.batch_id}")
        print(f"Total: {summary['total']} | ✅ {summary['completed']} | ❌ {summary['failed']} | ⏳ {summary['in_progress']}")
        print(f"Estado: {self.results['status']}")

        print(f"\nDetalle por tarea:")
        for task in self.tasks:
            print(f"  {task.status} {task.id} ({task.type})")

        print(f"\nArchivo de progreso: {self.batch_file}")

    @staticmethod
    def list_batches():
        """Lista batches completados"""
        BATCH_DIR.mkdir(parents=True, exist_ok=True)
        batches = sorted(BATCH_DIR.glob("*.json"), reverse=True)
        print("Batches recientes:")
        for batch_file in batches[:10]:
            data = json.loads(batch_file.read_text())
            print(
                f"  {data['batch_id']} | {data['status']} | "
                f"{data['summary']['completed']}/{data['summary']['total']} "
            )


def main():
    if len(sys.argv) < 2:
        print("Uso:")
        print("  batch-executor.py new <tarea1> <tarea2> ... → Crea nuevo batch")
        print("  batch-executor.py run <batch_id>           → Ejecuta batch")
        print("  batch-executor.py status <batch_id>        → Ver estado")
        print("  batch-executor.py list                     → Listar batches")
        sys.exit(1)

    command = sys.argv[1]

    if command == "new":
        executor = BatchExecutor()
        print(f"[BATCH] Creando nuevo batch: {executor.batch_id}")
        print("Ingresa tareas (Ctrl+D para finalizar):")
        print("Formato: tipo|descripción (ej: DIAGNÓSTICO|Analizar Telepatía)")

        task_num = 1
        for line in sys.stdin:
            line = line.strip()
            if "|" in line:
                task_type, description = line.split("|", 1)
                executor.add_task(
                    f"TASK_{task_num:03d}",
                    task_type.strip(),
                    description.strip()
                )
                task_num += 1

        if executor.tasks:
            executor._save_progress()
            print(f"\n✅ Batch creado: {executor.batch_id}")
            print(f"Tareas: {len(executor.tasks)}")
            print("Ejecuta con: batch-executor.py run " + executor.batch_id)
        else:
            print("❌ Sin tareas")

    elif command == "run":
        batch_id = sys.argv[2] if len(sys.argv) > 2 else None
        if not batch_id:
            print("❌ Especifica batch_id")
            sys.exit(1)

        executor = BatchExecutor()
        if executor.load_batch(batch_id):
            executor.run(stop_on_error=False)
        else:
            print(f"❌ Batch no encontrado: {batch_id}")

    elif command == "status":
        batch_id = sys.argv[2] if len(sys.argv) > 2 else None
        if not batch_id:
            print("❌ Especifica batch_id")
            sys.exit(1)

        batch_file = BATCH_DIR / f"{batch_id}.json"
        if batch_file.exists():
            data = json.loads(batch_file.read_text())
            print(f"Batch: {batch_id}")
            print(f"Status: {data['status']}")
            print(f"Progreso: {data['summary']['completed']}/{data['summary']['total']}")
        else:
            print(f"❌ Batch no encontrado: {batch_id}")

    elif command == "list":
        BatchExecutor.list_batches()


if __name__ == "__main__":
    main()
