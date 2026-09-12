# Regla: Código — Pruebas Obligatorias

**Aplica a**: `src/`, `tests/`, `.claude/agents/`, cualquier `.sh`, `.py`, `.js`

## Antes de "listo"

Siempre corre pruebas. Si no corriste, dilo explícitamente.

### Por tipo de archivo

#### Bash (`.sh`)
```bash
bash -n script.sh              # Syntax check
bash run-tests.sh              # Full test suite
```
- Si falla: muéstrame la línea exacta, no escondas el error
- Si no hay tests: dilo ("no hay test suite para este script")

#### Python (`.py`)
```bash
python -m pytest tests/ -v --cov
```
- Coverage debe estar >90% para nuevos features
- Si baja: reporta el % exacto

#### Hooks (`.claude/hooks/*.sh`)
```bash
bash .claude/hooks/firecrawl-daily.sh --dry-run
# Verifica: logs se escriben, JSON es válido, no hay errores
```

#### Feature-dev (sub-agentes)
```bash
cd .claude/agents/business-automation
bash init.sh                   # Startup test
```

## Qué reportar si falla

1. **Una línea**: causa del fallo
2. **Comando que falló**: exacto
3. **Output real**: pegue el stderr/stdout (no lo escondas)
4. **No lo arregles**: dime qué falta, espera instrucciones

## Si no hay forma de verificar

Dilo así: "No puedo verificar [razón]. [Qué hice en su lugar]."

**Chat gana sobre esta regla.**
