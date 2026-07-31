# 📋 SOLICITUD DE PRUEBA INTEGRAL — Business Automation System

**Fecha:** 31 de Julio de 2026  
**Solicitante:** Jorge Cortés  
**Despacho:** ABOGADOS ASOCIADOS J.A.C.  
**Objetivo:** Validación completa de sistema de automatización empresarial  

---

## 🎯 PRUEBA 1: Búsqueda Automática de Jurisprudencia (Firecrawl Daily)

**Objetivo:** Verificar que el hook Firecrawl busca y valida jurisprudencia automáticamente

### Solicitud:

```
TEMA: Búsqueda de jurisprudencia en Derecho Laboral

Por favor, buscar y resumir las 5 sentencias más recientes de la Corte Suprema 
de Justicia sobre despido intempestivo en Colombia durante los últimos 30 días.

Incluir:
- Número de sentencia
- Fecha de proferimiento
- Tribunal que la expidió
- Ratio decidendi (máxima jurídica)
- Link verificable en SUIN-Juriscol o LexisNexis

VALIDACIÓN REQUERIDA: Anti-Hallucination v3 debe verificar cada fuente
con confianza mínima de 85%.
```

**Sistema que se activa:**
- 🔍 Firecrawl Skill → Web scraping en SUIN-Juriscol + LexisNexis
- 🛡️ Anti-Hallucination v3 → Valida cada sentencia
- 📊 Genera reporte en logs/hallucination-*.log

**Tiempo esperado:** 5-10 minutos

---

## 🎯 PRUEBA 2: Respuesta Automática a Email (Email Auto-Response)

**Objetivo:** Verificar clasificación automática y generación de respuestas

### Solicitud (simular como si fuera un email entrante):

```
DE: cliente@empresa.co
ASUNTO: Necesitamos revisar contrato de arrendamiento comercial

Hola JAC,

Acabamos de recibir un contrato de arrendamiento comercial de un local 
en Bogotá por 3 años. Nos gustaría que lo revisaran antes de firmarlo.

El contrato incluye:
- Cláusula de penalización por incumplimiento
- Clausula de reajuste de canon
- Clásulas sobre mejoras del inmueble

¿Pueden hacer una revisión rápida y decirme si tiene cláusulas problemáticas?

Gracias,
Cliente
```

**Sistema que se activa:**
- 📧 Email Classifier → Categoriza como [MERCANTIL] [NORMAL]
- ✍️ Email Drafter → Genera respuesta profesional
- ⏳ Pending approval → Guarda en pending-emails/
- 🔔 Notifica a jorge-mailbox para aprobación

**Esperado en logs:**
- email-20260731.log con clasificación
- pending-emails/*.json con respuesta generada
- Notificación en slack #jac-operations

**Tiempo esperado:** 1-2 minutos

---

## 🎯 PRUEBA 3: Generación Automática de Features (Feature Dev Continuous)

**Objetivo:** Verificar que Feature Dev genera código + tests automáticamente

### Solicitud (simular como PR merge):

```
SIMULACIÓN: PR #100 mergeado a main

TÍTULO: Endpoint para búsqueda de jurisprudencia por palabra clave

DESCRIPCIÓN:
Implementar un nuevo endpoint REST que permita buscar jurisprudencia
usando palabras clave y retornar resultados ordenados por relevancia.

REQUISITOS:
1. GET /api/jurisprudencia/search?q=despido+intempestivo
2. Retornar máximo 50 resultados con paginación
3. Cada resultado incluya: sentencia, fecha, tribunal, ratio decidendi
4. Validar que todas las fuentes sean verificables
5. Response time < 2 segundos

TECNOLOGÍA: Python + FastAPI

CRITERIOS DE ACEPTACIÓN:
- Endpoint funcional y documentado
- Tests unitarios con 100% coverage
- Validación con Anti-Hallucination
```

**Sistema que se activa:**
- 📐 Feature Dev → Genera specs técnicas
- ⚡ Superpowers → Genera código Python
- 🧪 pytest → Corre tests (100% coverage)
- 🛡️ Anti-Hallucination → Valida lógica
- 📊 Genera logs en feature-dev-*.log

**Esperado:**
- generated-features/pr-100/ con código
- tests/ con 100% coverage
- README.md con documentación
- ✅ Validación exitosa

**Tiempo esperado:** 5-15 minutos

---

## 🎯 PRUEBA 4: Validación Horaria de Hallucinations

**Objetivo:** Verificar detección y reporte de alucinaciones cada hora

### Solicitud:

```
Colocar 3 textos en pending-outputs/ con:

TEXTO 1 (Correcto):
"La Corte Constitucional en sentencia T-123/2020 estableció que..."
✓ Debe pasar validación (alta confianza)

TEXTO 2 (Potencial hallucination):
"La Corte Suprema en sentencia C-456/2021 sobre derechos laborales..."
⚠️ Debe ser flagged (si no existe en SUIN-Juriscol)

TEXTO 3 (Correcto):
"El Código Sustantivo del Trabajo en artículo 57 define..."
✓ Debe pasar validación

Sistema debe:
- Validar contra LexisNexis + SUIN-Juriscol
- Flagged items en hallucination-reports/
- Generar reporte horario JSON
```

**Sistema que se activa:**
- 🛡️ Hallucination Check Hourly (ejecutar manualmente o esperar)
- 🔍 Anti-Hallucination v3 → Valida cada claim
- 📊 Genera reporte en hallucination-reports/
- 🔔 Notifica slack #jac-quality si hay alertas

**Esperado en logs:**
```
hallucination-20260731.log:
[2026-07-31 XX:XX:XX] 🛡️ Starting hourly validation...
[2026-07-31 XX:XX:XX] 📋 Found 3 pending outputs
[2026-07-31 XX:XX:XX] ✅ Confidence: 96% (PASSED)
[2026-07-31 XX:XX:XX] ⚠️ Confidence: 62% (FLAGGED)
[2026-07-31 XX:XX:XX] 📊 Hallucination rate: 33.3%
```

**Tiempo esperado:** 2-5 minutos

---

## 🎯 PRUEBA 5: Reporte Semanal Automático (Weekly Report)

**Objetivo:** Verificar generación de reporte con análisis y recomendaciones

### Solicitud (simular):

```
Generar reporte ejecutivo con:

MÉTRICAS (última semana):
- Tareas completadas: 47
- Features generadas: 3
- Emails procesados: 12
- Hallucinations detectados: 0
- Test coverage promedio: 100%

ANÁLISIS REQUERIDO:
1. Resumen ejecutivo (3-4 líneas)
2. Logros principales (5-10 bullet points)
3. Oportunidades de mejora
4. Recomendaciones para próxima semana
5. Métricas de calidad y confiabilidad

SALIDA:
- Markdown con tablas
- Enviar a Slack #jac-operations + email jorge@jacabogados.co
```

**Sistema que se activa:**
- 📊 Business Automation Reporter → Agregacióne de métricas
- 📈 Análisis de tendencias
- ✍️ Generación de reporte Markdown
- 📧 Envío a Slack + Email
- 📁 Almacenado en reports/

**Esperado:**
- reports/report-20260731.md con análisis completo
- Notificación en Slack con resumen
- Email a jorge@jacabogados.co

**Tiempo esperado:** 3-5 minutos

---

## 🎯 PRUEBA INTEGRADA: Flujo Completo de 4 Capas

**Objetivo:** Validar que el router orqueste correctamente todas las capas

### Solicitud integrada:

```
Solicitud múltiple al sistema:

1. CAPA 1 - ROUTER:
   Recibe: "Necesito escritura de tutela constitucional contra decisión 
   administrativa que viola derechos fundamentales"
   ✓ Debe identificar: [LEGAL] [URGENTE] [TUTELA]

2. CAPA 2 - ORQUESTADOR:
   ✓ Investigación: Busca jurisprudencia sobre tutelas similares
   ✓ Redacción: Genera estructura del escrito
   ✓ Validación: Anti-Hallucination verifica cada argumento
   ✓ Automatización: Genera versión inicial

3. CAPA 3 - SUB-AGENTES:
   ✓ juridico/investigador: Busca sentencias de Corte Constitucional
   ✓ juridico/redactor: Redacta petitorio
   ✓ juridico/jac-validator: Valida contra estándar de Altas Cortes

4. CAPA 4 - DASHBOARD:
   ✓ Muestra progreso en tiempo real
   ✓ Notifica cada etapa
   ✓ Genera logs de auditoría
```

**Esperado:**
- Logs de cada capa
- Documento de tutela generado
- Validaciones exitosas
- Dashboard actualizado

---

## 📊 MATRIZ DE VALIDACIÓN

Marcar ✅ conforme se completen las pruebas:

| Prueba | Activación | Logs | Output | Validación | Status |
|--------|-----------|------|--------|-----------|--------|
| 1. Firecrawl Daily | ✅ | hallucination-*.log | Jurisprudencia | Anti-Hall v3 | ⏳ |
| 2. Email Auto-Response | ✅ | email-*.log | pending-emails/ | Approval | ⏳ |
| 3. Feature Dev Continuous | ✅ | feature-dev-*.log | generated-features/ | pytest + AH | ⏳ |
| 4. Hallucination Check | ✅ | hallucination-*.log | hallucination-reports/ | AH v3 | ⏳ |
| 5. Weekly Report | ✅ | weekly-report.log | reports/ | Slack + Email | ⏳ |
| 6. Flujo Completo 4 Capas | ✅ | system.log | Dashboard | Todas | ⏳ |

---

## 🎬 CÓMO EJECUTAR ESTA SOLICITUD

### Opción 1: Automática (Recomendada)

```bash
# 1. Inicializar sistema
bash .claude/agents/business-automation/init.sh

# 2. Activar hooks y loops
claude --auto-loop --enable-hooks

# 3. Los hooks se ejecutarán automáticamente:
#    - Firecrawl Daily: 6:00 AM (próximo día)
#    - Email Auto-Response: Al recibir email
#    - Feature Dev: Al mergear PR
#    - Hallucination Check: Cada hora (próxima hora)
#    - Weekly Report: Lunes 9 AM (próximo lunes)

# 4. Monitorear en tiempo real
tail -f .claude/agents/business-automation/logs/*.log
```

### Opción 2: Pruebas Manuales

```bash
# Prueba 1: Activar Firecrawl manualmente
claude run --agent investigador --prompt "Busca sentencias sobre despido intempestivo"

# Prueba 2: Simular email
echo "email@test.co,Contrato de arrendamiento" | \
  bash .claude/hooks/email-auto-response.sh

# Prueba 3: Simular PR merge
bash .claude/hooks/feature-dev-continuous.sh 100 "feature/search-api" "Endpoint de búsqueda"

# Prueba 4: Activar validación horaria
bash .claude/hooks/hallucination-check-hourly.sh

# Prueba 5: Generar reporte
bash .claude/hooks/weekly-business-report.sh
```

### Opción 3: Validación en Dashboard

```bash
# Abrir dashboard cuando esté activo
open http://localhost:3000/dashboard

# Verá en tiempo real:
# - Status de cada hook
# - Logs en vivo
# - Métricas de performance
# - Alertas si hay hallucinations
```

---

## ✅ CRITERIOS DE ÉXITO

### Prueba 1 (Firecrawl):
- ✅ Encuentra mínimo 3 sentencias verificables
- ✅ Anti-Hallucination confidence ≥ 85%
- ✅ Links funcionales en SUIN-Juriscol

### Prueba 2 (Email):
- ✅ Email clasificado correctamente
- ✅ Respuesta generada profesionalmente
- ✅ Guardado en pending-emails/ para aprobación

### Prueba 3 (Feature Dev):
- ✅ Código generado y sintacticamente correcto
- ✅ 100% test coverage
- ✅ Tests pasan exitosamente
- ✅ Anti-Hallucination valida lógica

### Prueba 4 (Hallucination):
- ✅ Detecta hallucinations si los hay
- ✅ Genera reporte JSON estructurado
- ✅ Notifica en Slack si hay alertas
- ✅ Confidence scores precisos

### Prueba 5 (Weekly Report):
- ✅ Reporte con datos agregados correctos
- ✅ Análisis coherente y accionable
- ✅ Enviado a Slack + Email
- ✅ Formato Markdown limpio

### Flujo Integrado (4 Capas):
- ✅ Router clasifica correctamente
- ✅ Orquestador activa componentes adecuados
- ✅ Sub-agentes entregan outputs especializados
- ✅ Dashboard muestra progreso
- ✅ Logs de auditoría completos

---

## 📊 MÉTRICAS ESPERADAS DESPUÉS DE PRUEBAS

| Métrica | Baseline | Esperado | Actual |
|---------|----------|----------|--------|
| Tiempo consulta jurisprudencia | 30 min | < 5 min | ⏳ |
| Emails respondidos automáticamente | 0% | 80%+ | ⏳ |
| Features con 100% coverage | 0% | 100% | ⏳ |
| Hallucinations detectados | - | < 2% | ⏳ |
| Disponibilidad sistema | - | 99.9% | ⏳ |

---

## 📧 NOTIFICACIÓN DE RESULTADOS

Después de ejecutar cada prueba, verificar:

```bash
# Logs de sistema
cat .claude/agents/business-automation/logs/system.log

# Hallucinations encontrados
ls -la .claude/agents/business-automation/hallucination-reports/

# Emails pendientes
ls -la .claude/agents/business-automation/pending-emails/

# Features generadas
ls -la .claude/agents/business-automation/generated-features/

# Reportes
ls -la .claude/agents/business-automation/reports/
```

---

## 🎯 PRÓXIMOS PASOS

1. ✅ Ejecutar: `bash .claude/agents/business-automation/init.sh`
2. ✅ Activar: `claude --auto-loop --enable-hooks`
3. ✅ Monitorear: `tail -f .claude/agents/business-automation/logs/*.log`
4. ✅ Completar matriz de validación
5. ✅ Revisar logs y documentar resultados
6. ✅ Ajustar thresholds si es necesario
7. ✅ Pasar a producción

---

**Solicitud preparada por:** Claude Code  
**Fecha:** 31 de Julio de 2026  
**Sistema:** Business Automation v1.0  
**Status:** 🟢 LISTO PARA PRUEBAS

---

*Documento de pruebas — CONFIDENCIAL JAC*
