# Token Optimizer — Reglas Detalladas

Basadas en drona23/claude-token-efficient. Aplicar según contexto.

## Formatting & Encoding

- **Oraciones cortas**: máximo 8-10 palabras en español
- **Sin decoración Unicode**: hyphens normales, comillas rectas, sin ellipsis
- **Naturales**: acentos y caracteres CJK OK si es contenido real
- **JSON-safe**: todo string escapado, sin problemas de serialización

## Code Context

### Regla: Simplicidad
```
✅ Solución más simple que funcione
✅ Tres líneas similares > abstracción
❌ Over-engineering
❌ Features especulativas ("podrías también...")
```

### Regla: Lectura + Edición
```
✅ Lee archivo completo antes de editar
✅ Edita solo líneas que cambian
❌ Nunca editar a ciegas
❌ Reescribir todo el archivo
```

### Regla: Documentación
```
✅ Comentarios donde lógica no es clara
✅ Nombres descriptivos = docs implícitos
❌ Docstrings en código sin cambios
❌ Type annotations en código sin cambios
```

### Regla: Error Handling
```
✅ Manejo de errores reales
❌ Error handling para scenarios imposibles
❌ Try-catch innecesarios
```

### Regla: Review
```
Formato: Estado el bug → Muéstrame el fix → Fin

✅ "Línea 42: typo en variable. Cambiar `kljd` a `key_id`."
❌ "Este código es bueno, también podrías..."
❌ Sugerencias fuera de scope
```

## Agent Context

### Regla: Hallucination Prevention
```
❌ Nunca inventar:
   - Rutas de archivo
   - API endpoints
   - Nombres de funciones
   - Valores de campos
   - IDs de recursos

✅ Si desconocido: null | "UNKNOWN" | omitir
✅ Si no leído: no referenciar su contenido
```

### Regla: Token Efficiency
```
✅ Output mínimo que satisfaga spec
✅ Sin explicaciones innecesarias
✅ Presupuesto: máximo 20 llamadas a herramientas
✅ Cap 3 subagents en paralelo

❌ Narrativa fluff
❌ Reintento silencioso
❌ Supuestos sobre credenciales
```

### Regla: Output Estructurado
```
✅ JSON (parseable, sin post-processing)
✅ CSV (headers + datos)
✅ Bullets (uno por línea)
✅ Timestamps: [2026-MM-DD HH:MM:SS]

❌ Prosa conversacional
❌ Explicaciones en vivo
❌ Saludos/cierres
```

## Analysis Context

### Regla: Lead with Finding
```
✅ Resumen primero (3 bullets máx)
✅ Datos de soporte segundo
✅ Caveats último

❌ Narrativa primero
❌ Contexto antes de resultado
```

### Regla: Accuracy
```
✅ Números con unidades
✅ Fuente o derivación de cada número
✅ Si falta dato: decirlo explícitamente
✅ Si confianza baja: estado con razón

❌ Estimación silenciosa
❌ Números ambiguos
❌ Redondeo agresivo
```

### Regla: Distinction
```
✅ "Basado en la tendencia..." (inferencia explícita)
✅ Distinguir dato de inferencia
✅ Label especulaciones

❌ Inferencias como hechos
❌ Datos fabricados
❌ Citations inventadas
```

---

## Checklist Antes de Entregar

- [ ] Oraciones ≤10 palabras (código/output normal)
- [ ] Sin Unicode decorativo
- [ ] JSON/CSV/bullets estructurado
- [ ] Timestamp en logs/outputs programados
- [ ] Sin valores inventados
- [ ] Fuente o "desconocido" en cada claim
- [ ] Confianza baja: declarada con razón

**Si no cumple ≥80% de checklist: no listo para entregar.**
