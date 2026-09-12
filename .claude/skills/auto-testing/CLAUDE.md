# Skill: Auto-Testing — Validación automática de código

**Activación**: Automática cuando se detecta cambio en `src/`, `tests/`, `.claude/agents/`

## Procedimiento

### 1. Detectar tipo de cambio
```bash
git diff --name-only | grep -E '\.(sh|py|js)$'
```

### 2. Ejecutar pruebas según tipo

**Bash**:
```bash
bash -n <file>
bash run-tests.sh
```

**Python**:
```bash
pytest tests/ -v --cov --cov-report=term-missing
```

**Hooks**:
```bash
bash .claude/hooks/<hook>.sh --dry-run
```

### 3. Validar output

- ✅ Exit code = 0 → PASS
- ❌ Exit code ≠ 0 → FAIL, muestra stdout + stderr
- ⚠️ Coverage < 90% → WARN, muestra líneas no cubiertas

### 4. Reportar al Dashboard

```json
{
  "test_run_id": "auto-test-YYYYMMDD-HHMMSS",
  "status": "PASS|FAIL|WARN",
  "files_tested": N,
  "coverage": "XX%",
  "failures": [{
    "file": "path/to/file.py",
    "error": "AssertionError: expected X, got Y",
    "line": 42
  }],
  "timestamp": "2026-07-31T12:34:56Z"
}
```

### 5. Bloquear o permitir commit

- PASS: "✅ Listo para commit"
- FAIL: "❌ Falla en tests. No commits hasta arreglar."
- WARN: "⚠️ Coverage bajo. Revisar líneas no cubiertas."

## Límites

- Timeout: 5 minutos por suite
- Si excede: reporta como TIMEOUT, no fuerces parada

## Salida

- Texto puro (sin emoji) si es programado
- Tabla si es modal (Jorge revisa)
- JSON si consume otro programa

**Chat gana sobre este skill.**
