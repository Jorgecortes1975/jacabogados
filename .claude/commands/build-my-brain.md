# BUILD MY BRAIN — PLAN DE MEJORA INTEGRAL DEL SISTEMA

**Fecha**: 19 de julio de 2026  
**Versión**: 1.0  
**Responsable**: Jorge Ángel Cortés Cartagena — T.P. 365.594  
**Estado**: ⏳ Pendiente de decisiones (ver DECISIONES)

---

## 🎯 OBJETIVO

Transformar un ecosistema de skills descentralizado y manual en un sistema operativo, automatizado y verificable que:
- ✅ Activar skills automáticamente sin intervención manual
- ✅ Loguear todo lo que hace el agente (observabilidad total)
- ✅ Centralizar contexto de cliente en Postgres (una BD, no 5 APIs)
- ✅ Evitar trabajo duplicado entre sesiones (memoria persistente)
- ✅ Documentar operación diaria para equipo (runbooks claros)

---

## 📊 ESTADO ACTUAL vs OBJETIVO

| Aspecto | Hoy | Objetivo | Brecha |
|--------|-----|----------|--------|
| Activación de skills | Manual (decir `/skill`) | Automática (por contexto) | 🔴 Alta |
| Logs y observabilidad | Ninguna | Structured JSON por sesión | 🔴 Alta |
| Contexto de cliente | Disperso en 5+ fuentes | Centralizado en Postgres | 🔴 Alta |
| Memoria entre sesiones | Ninguna (olvida todo) | Base de datos persistente | 🟡 Media |
| Documentación operativa | Instalación, no operación | Runbooks por caso de uso | 🟡 Media |
| Ollama en producción | Nunca testeado | Baseline + recomendación | 🟡 Media |

---

## 🏗️ 5 FASES DE IMPLEMENTACIÓN

### FASE 1: OBSERVABILIDAD (1-2 días) 🔴 CRÍTICA

**Qué**: Agregar logging estructurado al arnés_agente.py para ver qué hace, cuándo falla, cuánto cuesta.

**Por qué primero**: Sin observabilidad no puedo medir si el sistema funciona. Es la base de todo.

**Qué se entrega**:
- `arnés_agente.py` mejorado con logging JSON
- Carpeta `logs/{cliente_id}/sesión_{timestamp}.jsonl` con historial
- Script simple de dashboard: `python logs/generar_dashboard.py` → CSV/HTML
- Cada log incluye: timestamp, modelo, iteración, herramientas, tokens, duración, errores

**Pasos técnicos**:
1. Modificar arnés_agente.py: importar `logging` + `json`
2. Crear log_entry() que registre cada iteración en JSONL
3. Crear `logs/generar_dashboard.py` que lea JSONLs y produzca métricas
4. Testear con 3 preguntas reales, verificar logs

**Comando para ejecutar**:
```bash
python arnés_agente.py "Redacta demanda tutela" --verbose
# Genera: logs/default/sesión_2026-07-19_1430.jsonl
# Contenido: timestamp, model, iteration, tools_used, tokens, duration_ms, errors, status
```

**Métricas que rastrearemos**:
- Operaciones por cliente
- Tokens consumidos (costo)
- Duración promedio por operación
- Errores y patrones
- Skills más usados

---

### FASE 2: AUTOMATIZACIÓN (2-3 días) ⚠️ IMPORTANTE

**Qué**: Detectar automáticamente qué skill llamar según la pregunta del usuario.

**Por qué**: Cierra la brecha más grande de experiencia (de "quiero redactar demanda" a "automático").

**Cómo funciona**:
```
Usuario: "Redacta una demanda de tutela"
  ↓
Arnés busca en matriz_activadores.json:
  - Detecta palabra clave: "demanda" + "tutela"
  - Encuentra: módulo = "tutelas", skills = ["redactor-juridico-col", "jurisprudencia-col", "vigilancia-normativa-col"]
  ↓
Ejecuta en orden automático (sin preguntar)
  ↓
Al final, encadena anti-hallucination-v4 automático
  ↓
Entrega documento con acta de control (APTO / CONDICIONAL / REQUIERE REVISIÓN)
```

**Qué se entrega**:
- `matriz_activadores.json` (palabra clave → skill + módulo + orden)
- Lógica en arnés_agente.py para detectar y activar
- Anti-hallucination-v4 siempre al final de redacción
- Tests: 5 casos diferentes verificando activación correcta

**Pasos técnicos**:
1. Crear `matriz_activadores.json`:
```json
{
  "tutela": {
    "módulo": "tutelas",
    "skills": ["redactor-juridico-col", "jurisprudencia-col", "vigilancia-normativa-col"],
    "keywords": ["tutela", "demanda", "derechos fundamentales"]
  },
  "auditoría_código": {
    "módulo": "seguridad",
    "skills": ["code-reviewer", "cyber-neo"],
    "keywords": ["revisa código", "vulnerabilidades", "OWASP"]
  },
  ...
}
```

2. Integrar en arnés:
```python
def detectar_módulo(pregunta: str) -> dict:
    for módulo, config in matriz_activadores.items():
        if any(kw in pregunta.lower() for kw in config['keywords']):
            return config
    return None  # Módulo genérico

def ejecutar_cadena_automática(módulo_config):
    for skill in módulo_config['skills']:
        ejecutar_skill(skill)
    # Al final
    ejecutar_skill('anti-hallucination-v4')
```

3. Testear con 5 casos reales

**Comando para ejecutar**:
```bash
python arnés_agente.py "Redacta demanda de tutela" --auto
# Detecta automáticamente: módulo = tutelas, ejecuta 3 skills en orden, anti-hallucination al final
```

---

### FASE 3: POSTGRES CEREBRO (3-5 días) 🔴 CRÍTICA

**Qué**: Base de datos centralizada que reúne contexto de cliente, diagnósticos, términos procesales, cambios normativos.

**Por qué**: La brecha más grande (contexto disperso en 5+ APIs, trabajo duplicado entre sesiones).

**Estructura minimal** (schema):
```sql
CLIENTES
  ├─ id, nombre_empresa, nit, contacto
  ├─ fase_actual (INTAKE/DIAGNÓSTICO/IMPLEMENTACIÓN/SEGUIMIENTO)
  └─ última_sesión, módulos_aplicables

DIAGNÓSTICOS
  ├─ cliente_id, fecha, módulo_evaluado
  ├─ hallazgos (crítico/moderado/bajo)
  ├─ normas_verificadas (CST, Ley 100/1993, etc.)
  └─ fuentes_consultadas (SUIN-Juriscol, etc.)

TÉRMINOS_PROCESALES
  ├─ cliente_id, tipo (Demanda/Recurso/Audiencia)
  ├─ fecha_vencimiento, días_restantes
  ├─ alerta_crítica (< 48 horas)
  └─ estado (PENDIENTE/CUMPLIDO/VENCIDO)

CAMBIOS_NORMATIVOS
  ├─ norma_afectada (CST, UPC, etc.)
  ├─ tipo (REFORMA/SENTENCIA/RESOLUCIÓN)
  ├─ fecha_vigencia, descripción
  ├─ clientes_afectados_ids (array)
  └─ confirmado (boolean)

RECOMENDACIONES
  ├─ cliente_id, diagnóstico_id
  ├─ acción, urgencia, timeline
  └─ estado (PROPUESTA/APROBADA/COMPLETADA)
```

**Qué se entrega**:
- Schema SQL completo (DDL)
- Scripts de sync inicial (traer datos de HubSpot, GitHub, Calendar)
- Queries principales (cambios que afectan cliente X, términos próximos a vencer, diagnósticos previos, etc.)
- Integración en arnés_agente.py: consulta Postgres antes de llamar APIs externas

**Pasos técnicos**:
1. Elegir plataforma (Neon, Supabase, Railway)
2. Crear esquema (ejecutar DDL)
3. Script de sync inicial:
   - Traer clientes de HubSpot
   - Traer diagnósticos de GitHub (parsear archivos 02-DIAGNOSTICO.md)
   - Traer términos de Calendar
   - Traer cambios normativos de Legal Data Hunter
4. Queries principales (índices, vistas)
5. Integrar en arnés: `cliente_context = db.query(clientes).where(id=cliente_id)`

**Comando para ejecutar**:
```bash
# Setup inicial
python db/init_schema.py --platform=neon --connection-string=$DATABASE_URL
python db/sync_initial.py --source=hubspot --source=github --source=calendar

# Día a día: agente consulta esto automático
```

**Beneficio**:
- 40% más rápido (1 DB query vs 5 API calls)
- Sin trabajo duplicado (check si diagnóstico ya existe)
- Memoria persistente (contexto histórico)
- Trazabilidad (quién, cuándo, de dónde)

---

### FASE 4: OLLAMA EN PRODUCCIÓN (1-2 días) ⚠️ OPCIONAL PERO RECOMENDADO

**Qué**: Testear Ollama (Mistral 7B local) vs Claude, medir costo/velocidad.

**Por qué**: Potencial ahorro de 70-90% para dev, testing, prototipado. Y funciona offline.

**Cómo**:
```bash
# Instalar Ollama
brew install ollama  # macOS
# o Linux: curl https://ollama.ai/install.sh | sh

# Descargar Mistral 7B
ollama pull mistral

# Testear arnés con Ollama
MODELO=ollama/mistral python arnés_agente.py "Redacta demanda tutela" 

# Medir: tiempo, costo (gratis), calidad vs Claude
```

**Test real** (10 casos):
- 5 redacciones simples (contrato, análisis)
- 3 redacciones complejas (demanda Alta Corte)
- 2 auditorías código (cyber-neo)

**Métricas**:
- Tiempo: Ollama vs Claude
- Costo: $0 (Ollama local) vs ~$0.05 por pregunta (Claude)
- Calidad: Comparar redacciones lado a lado
- Decisión: ¿Dev con Ollama + Prod con Claude? ¿Híbrido? ¿Puro Claude?

**Entregable**:
- Baseline Ollama (documento)
- Recomendación costo/beneficio
- Flag `MODELO` actualizado en arnés (default Claude, override con env var)

---

### FASE 5: DOCUMENTACIÓN OPERATIVA (2-3 días) ⚠️ IMPORTANTE

**Qué**: Runbooks y guías paso a paso para usar el sistema día a día.

**Por qué**: Tu equipo necesita saber exactamente qué hacer sin adivinar.

**Qué se entrega** (carpeta `OPERACIÓN/`):

```
OPERACIÓN/
├── DEMANDA_TUTORIAL.md
│   └─ "Quiero redactar una demanda de tutela" → paso a paso
│
├── AUDITORÍA_CÓDIGO.md
│   └─ "Quiero auditar seguridad de un repositorio" → paso a paso
│
├── DISEÑO_APP.md
│   └─ "Quiero diseñar arquitectura de una SaaS" → paso a paso
│
├── TROUBLESHOOTING.md
│   └─ Errores comunes + soluciones
│
├── COSTOS_Y_MÉTRICAS.md
│   └─ Cuánto cuesta cada operación mensual, timeline
│
├── INTEGRACIONES.md
│   └─ Cómo conectar nuevas fuentes (HubSpot, Drive, etc.)
│
└── DASHBOARD_SIMPLE.md
    └─ Leer logs, interpretar métricas, saber si algo anda mal
```

**Pasos técnicos**:
1. Para cada runbook: screenshot + step-by-step claro
2. Troubleshooting: mapear errores comunes + soluciones
3. Dashboard: script que lea logs y produzca CSV legible
4. Integraciones: plantilla para agregar nueva fuente

**Ejemplo de runbook** (DEMANDA_TUTORIAL.md):
```markdown
# Redactar Demanda de Tutela

## Paso 1: Reunir información
- Cliente: nombre, NIT
- Hechos: describe qué pasó
- Derechos violados: cuáles derechos fundamentales

## Paso 2: Ejecutar agente
$ python arnés_agente.py "Redacta demanda tutela para [Cliente]"

## Paso 3: Revisar resultado
- ¿Documento generado?
- ¿Acta de control dice APTO PARA RADICAR?
- Si CONDICIONAL o REQUIERE REVISIÓN, ver observaciones

## Paso 4: Radicar
- Descargar documento
- Obtener firma digital cliente
- Radicar en Juzgado

## Troubleshooting
Si error "CST no encontrado":
  → Verificar en SUIN-Juriscol que CST esté vigente (normalmente sí)
  → Reintentar con: `python arnés_agente.py --retry 3`
```

---

## ⚙️ ORDEN DE EJECUCIÓN

```
Fase 1 (Observabilidad) — 1-2 días
    ↓
Fase 2 (Automatización) — 2-3 días (depende Fase 1)
    ↓
Fase 4 (Ollama) — 1-2 días (PARALELO, independiente)
    ↓
Fase 3 (Postgres) — 3-5 días (depende Fase 1 completada, tus decisiones)
    ↓
Fase 5 (Documentación) — 2-3 días (depende todas las anteriores)
    ↓
✅ SISTEMA COMPLETO Y OPERATIVO
```

**Total**: 9-15 días en paralelo.

---

## 🔴 DECISIONES PENDIENTES (NECESITO TU RESPUESTA)

### Decisión A: Postgres — ¿Qué plataforma?

| Opción | Costo | Setup | Free Tier | Recomendación |
|--------|-------|-------|-----------|---|
| **Neon** | $9-50/mes | 5 min | Generoso (1 DB, 3GB) | ✅ RECOMENDADO |
| **Supabase** | $25/mes | 10 min | Limitado | Bueno si necesitas auth |
| **Railway** | $5-50/mes | 5 min | Pequeño | Bueno pero sin free |
| **Self-hosted** | $0 | 1 hora | Gratis | Requiere mantenimiento |

**Mi recomendación**: **Neon** (free tier escala para tu caso, UI simple, serverless).

**Tu decisión**: ¿Neon? ¿Otra?

---

### Decisión B: Postgres — ¿Qué conectamos primero?

Opciones para sync inicial:
- HubSpot (clientes, deals)
- Legal Data Hunter (cambios normativos)
- GitHub (diagnósticos versionados)
- Google Calendar (términos procesales)
- Gmail (comunicaciones)

**Mi recomendación**: 
1. **Mínimo MVP**: HubSpot (clientes) + GitHub (diagnósticos)
2. **Luego**: Calendar (términos), Legal Data Hunter (cambios normativos)
3. **Eventual**: Gmail (comunicaciones)

**Tu decisión**: ¿Todas? ¿MVP? ¿Otra prioridad?

---

### Decisión C: Equipo — ¿Quién usa esto?

- Solo tú (1 persona)
- Tú + especialista legal (2 personas)
- Tú + equipo (3-5 personas)
- Tú + equipo + clientes (consulta web)

**Impacta**: Documentación, métricas, seguridad.

**Tu decisión**: ¿Cuántas personas?

---

### Decisión D: Ollama — ¿Quieres testear o saltarlo?

- ✅ Sí, quiero baseline Ollama (1-2 días de testing)
- ⏭️ No, solo usa Claude por ahora (saltamos Fase 4)

**Tu decisión**: ¿Sí o no?

---

## 📋 CHECKLIST DE APROBACIÓN

Para empezar, necesito tu OK en:

```
[ ] Entiendo el plan y la priorización
[ ] Décido: Neon para Postgres
[ ] Décido: Qué conectar primero (HubSpot + GitHub mínimo)
[ ] Décido: Cuántas personas usan esto
[ ] Décido: Sí o no a Ollama
[ ] Listo para empezar Fase 1 (Observabilidad)
```

---

## 🚀 PRÓXIMOS PASOS

1. **TÚ**: Responde las 4 DECISIONES
2. **YO**: Ejecuto Fase 1 (Observabilidad) completa
3. **CICLO**: Cada 2-3 días, presento resultados + pasamos a siguiente fase
4. **ENTREGA FINAL**: Archivo README.md con el sistema completo + dashboard

---

## 📞 REFERENCIAS

- INSTALACION_INTEGRACION.md — Cómo está instalado hoy
- OLLAMA_INTEGRACION.md — Guía de modelos locales
- System Prompt Fable 5 — Instrucciones del agente
- arnés_agente.py — Archivo principal (en /scratchpad/)

---

**Estado**: ⏳ Esperando tus decisiones  
**Versión**: 1.0  
**Última actualización**: 19 de julio de 2026
