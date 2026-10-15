# ⚙️ PROMPT MAESTRO: Diseño de Workflows Autónomos

## Automatización de Procesos Jurídicos Sin Intervención Manual | JAC

---

## 📋 ESTRUCTURA BASE - Plantilla Mejorada

### BLOQUE 1: DEFINIR EL PROCESO A AUTOMATIZAR

**Mejora del original:**
```
"Quieres automatizar [PROCESO/FLUJO].

CONTEXTO DEL PROCESO:
├─ Nombre: [Qué se automatiza]
│  └─ Ejemplo: "Búsqueda de jurisprudencia relacionada"
│  └─ Ejemplo: "Generación de alertas de plazos"
│  └─ Ejemplo: "Procesamiento de contratos nuevos"
│
├─ Proceso ACTUAL (Cómo funciona hoy):
│  ├─ Paso 1: [Abogado recibe solicitud]
│  ├─ Paso 2: [Abre navegador, va a Corte Constitucional]
│  ├─ Paso 3: [Busca jurisprudencia manualmente]
│  ├─ Paso 4: [Copia-pega en Word]
│  ├─ Paso 5: [Crea email con resultado]
│  └─ Paso 6: [Envía a cliente]
│  └─ Tiempo total: 45 minutos
│
├─ Objetivo de automatización:
│  ├─ Eliminar: Pasos manuales 2-5
│  ├─ Mantener: Control humano en paso 1 (recibir solicitud) y 6 (aprobación antes de enviar)
│  ├─ Acelerar: De 45 min a <5 min
│  └─ Liberar: Tiempo para trabajo de mayor valor
│
├─ ENTRADAS (Qué dispara el proceso):
│  ├─ Trigger 1: Email de cliente con pregunta jurídica
│  ├─ Trigger 2: Nuevo expediente abierto en sistema
│  ├─ Trigger 3: Plazo dentro de X días
│  ├─ Trigger 4: Cambio de norma detectado
│  └─ Trigger 5: Timer diario (si es batch)
│
├─ SALIDAS DESEADAS (Qué produce):
│  ├─ Salida 1: Reporte de jurisprudencia relevante
│  ├─ Salida 2: Email al cliente listo para envío
│  ├─ Salida 3: Resumen ejecutivo para abogado
│  ├─ Salida 4: Notificación en Slack de socios
│  └─ Salida 5: Registro en BD de búsqueda realizada (auditoría)
│
├─ RESTRICCIONES TÉCNICAS:
│  ├─ APIs disponibles: [SUIN, Corte Constitucional, Legal Data Hunter]
│  ├─ Sistemas disponibles: [CRM, email SMTP, Slack API, BD interna]
│  ├─ Lenguaje: [Node.js / Python / Go]
│  ├─ Uptime requerido: [99.9% / 99% / Best effort]
│  ├─ Latencia máxima: [<5 min / <1 hora / Batch diario]
│  └─ Datos sensibles: [Sí, requiere encriptación]
│
├─ RESTRICCIONES LEGALES/POLÍTICAS:
│  ├─ Confidencialidad abogado-cliente: SÍ, respetar
│  ├─ Datos personales: LGPD aplicable
│  ├─ Aprobación humana requerida: SÍ, en decisiones críticas
│  ├─ Auditoría de cambios: SÍ, loguear todo
│  └─ Límites de automatización: No enviar directamente a cliente sin revisión
│
└─ ÉXITO MEDIDO POR:
   ├─ Tiempo economizado: X horas/mes
   ├─ Errores reducidos: De Y a Z% (meta: 0%)
   ├─ Satisfacción usuario: NPS score
   └─ Uptime sistema: >99%
"
```

### BLOQUE 2: MAPEAR EL FLUJO ACTUAL

**Mejora del original:**
```
ANALIZAR PROCESO PASO A PASO:

FLUJO ACTUAL (Búsqueda de Jurisprudencia Manual):

┌─────────────────────────────────────────────────────┐
│ ENTRADA: Cliente pregunta sobre despido sin justa  │
│ causa, qué dice jurisprudencia reciente            │
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│ PASO 1: Abogado recibe email                       │
│ Tiempo: 0 min (pasivo, recibe)                     │
│ Manual: Sí, recibe notificación                    │
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│ PASO 2: Abre navegador, va a corteconstitucional   │
│ Tiempo: 2 min                                       │
│ Manual: SÍ, navega                                 │
│ Error possible: Navegador lento, sitio offline     │
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│ PASO 3: Busca jurisprudencia "despido injustificado│
│ Tiempo: 8 min (lectura, selección)                 │
│ Manual: SÍ, criterio humano                        │
│ Error possible: Busca incompleta, miss casos nuevos│
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│ PASO 4: Copia resultados relevantes, pega en Word │
│ Tiempo: 10 min (selección, formateo)              │
│ Manual: SÍ, copia-pega                            │
│ Error possible: Datos faltantes, formato incorrecto│
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│ PASO 5: Redacta email explicando resultados       │
│ Tiempo: 15 min (redacción)                        │
│ Manual: SÍ, escribe                               │
│ Error possible: Explicación poco clara             │
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│ PASO 6: Revisa, aprueba, envía a cliente          │
│ Tiempo: 10 min (revisión)                         │
│ Manual: SÍ, revisión importante                   │
│ Error possible: Sin revisión, confidencialidad    │
└──────────────────┬──────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────────────────┐
│ SALIDA: Cliente recibe email con jurisprudencia   │
│ Tiempo total: 45 minutos                          │
│ Hecho: 1 abogado                                  │
│ Repeticiones: 5-10 por semana                     │
│ Tiempo semanal: 4-8 horas                         │
└─────────────────────────────────────────────────────┘

ANÁLISIS DE OPORTUNIDAD:
├─ Pasos automatizables: 2, 3, 4, 5 (32 min de 45)
├─ Pasos requieren humano: 1 (recibir), 6 (aprobar)
├─ Potencial de automatización: 71%
├─ Economía: 3-6 horas/semana por abogado
└─ Impacto: Si 5 abogados, 15-30 horas/semana liberadas


IDENTIFICAR PUNTOS DE DECISIÓN:

En el flujo actual, ¿dónde decide el abogado?

Decisión 1: ¿Es jurisprudencia realmente relevante?
├─ Hoy: Abogado elige manualmente
├─ Automatizable: Parcial (ML puede sugerir, humano confirma)
└─ Riesgo: Si IA excluye caso importante

Decisión 2: ¿Cuántos resultados incluir?
├─ Hoy: Abogado decide criterio (últimas 5, 10, todas desde 2020)
├─ Automatizable: Regla fija (últimas N relevantes)
└─ Riesgo: Si regla es muy restrictiva, miss casos

Decisión 3: ¿Qué explicación dar?
├─ Hoy: Abogado escribe basado en experiencia
├─ Automatizable: Template + datos extraídos
└─ Riesgo: Respuesta genérica vs personalizada


IDENTIFICAR CUELLOS DE BOTELLA:

¿Dónde se desperdicia tiempo?
├─ PASO 2: Navegar a sitio (2 min) → Automatizar acceso directo a API
├─ PASO 3: Búsqueda manual (8 min) → Automatizar query + ranking
├─ PASO 4: Copiar-pegar (10 min) → Automatizar extracción + formateo
└─ PASO 5: Redactar (15 min) → Template + completar automático

¿Dónde se cometen errores?
├─ PASO 3: Búsqueda incompleta → Solución: Query más exhaustiva
├─ PASO 4: Formato incorrecto → Solución: Template estándar
├─ PASO 5: Explicación poco clara → Solución: Revisor que valida
└─ PASO 6: Sin revisión → Solución: Workflow requiere aprobación explícita
```

### BLOQUE 3: DISEÑAR FLUJO AUTOMATIZADO

**Mejora del original:**
```
FLUJO AUTOMATIZADO (Búsqueda de Jurisprudencia):

┌──────────────────────────────────────────────────────────┐
│ TRIGGER 1: Email nuevo recibido                        │
│ Condición: Contiene palabra clave "jurisprudencia" o   │
│            viene de cliente conocido                    │
│ Acción: Parser extrae tema y contexto                  │
└─────────────────────────┬────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────┐
│ PASO 1: EXTRAER INFORMACIÓN DEL EMAIL                   │
│ Herramienta: Parser de email + NLP                      │
│ Input: Email body                                       │
│ Output:                                                 │
│   ├─ tema: "despido sin justa causa"                    │
│   ├─ cliente_id: "C-12345"                              │
│   ├─ expediente: "2026-00234"                           │
│   ├─ urgencia: "normal" (o "urgente" si menciona plazo)│
│   └─ email_remitente: "cliente@empresa.com"            │
│ Tiempo: <1 segundo                                      │
│ Error handling:                                         │
│   └─ Si NLP no entiende: Enviar a cola manual (humano) │
└─────────────────────────┬────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────┐
│ PASO 2: VALIDAR PERMISO DE ACCESO                       │
│ Lógica: ¿Abogado asignado a cliente tiene permisos?    │
│ BD query: SELECT abogados FROM cliente WHERE id=C-12345│
│ Resultado:                                              │
│   ├─ Si cliente es válido y datos disponibles: Continuar│
│   ├─ Si cliente es confidencial: Requiere aprobación   │
│   └─ Si cliente no existe: Notificar abogado, stop      │
│ Tiempo: <1 segundo                                      │
│ Seguridad: LGPD compliance check                        │
└─────────────────────────┬────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────┐
│ PASO 3: BUSCAR JURISPRUDENCIA (PARALELO)               │
│ Fuentes consultadas en paralelo:                        │
│                                                         │
│ ┌─ API 1: Corte Constitucional                        │
│ │ Query: "despido injustificado" (últimos 5 años)     │
│ │ Returns: 12 sentencias ordenadas por relevancia     │
│ │ Timeout: 10 segundos, si falla → usar backup        │
│                                                         │
│ ┌─ API 2: Legal Data Hunter                           │
│ │ Query: Similar, scope 230+ jurisdicciones           │
│ │ Returns: 45 documentos, filter Colombia             │
│ │ Timeout: 10 segundos                                │
│                                                         │
│ └─ API 3: Consejo de Estado                           │
│   Query: Jurisprudencia administrativa similar         │
│   Returns: 8 sentencias                                │
│                                                         │
│ Output consolidado:                                     │
│   ├─ Sentencias por relevancia (score 1-10)           │
│   ├─ Duplicados removidos                              │
│   ├─ Ordenadas por fecha (más recientes primero)       │
│   └─ Top 5 seleccionadas automáticamente               │
│                                                         │
│ Tiempo: <5 segundos (paralelo)                         │
│ Fallback: Si todas las APIs fallan → escalate a humano │
└─────────────────────────┬────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────┐
│ PASO 4: EXTRAER Y FORMATEAR INFORMACIÓN                 │
│ Para cada sentencia top 5:                              │
│   ├─ Número sentencia: "T-045/2025"                     │
│   ├─ Fecha: "15 de febrero de 2025"                     │
│   ├─ Magistrado: "Dr. Jose Garcia"                      │
│   ├─ Tribunal: "Corte Constitucional"                   │
│   ├─ Resumen (primeros 300 caracteres)                  │
│   ├─ Ratio decidendi (principio clave)                  │
│   ├─ Aplicabilidad al caso (SÍ/NO/PARCIAL)             │
│   └─ URL de acceso público                              │
│                                                         │
│ Formateo:                                               │
│   ├─ Markdown para lectura fácil                        │
│   ├─ Links verificables                                │
│   ├─ Dates estandarizadas (AAAA-MM-DD)                 │
│   └─ Citations en formato legal standard               │
│                                                         │
│ Output: JSON structured data + Markdown formatted       │
│ Tiempo: <2 segundos                                     │
└─────────────────────────┬────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────┐
│ PASO 5: GENERAR ANÁLISIS EXPLICATIVO (Template)        │
│ Template con variables:                                 │
│                                                         │
│ "Respecto a su pregunta sobre {tema}:                  │
│                                                         │
│  La jurisprudencia reciente de {tribunal} ha establecido│
│  que {ratio_decidendi}.                                 │
│                                                         │
│  Sentencias clave:                                      │
│  1. {sentencia1}: {resumen1}                            │
│     Link: {url1}                                        │
│  2. {sentencia2}: {resumen2}                            │
│     Link: {url2}                                        │
│  [...hasta 5 sentencias]                               │
│                                                         │
│  Aplicabilidad a su caso: {aplicabilidad}              │
│  Análisis: {comentario_análisis}                        │
│                                                         │
│  Actualización: Este análisis fue generado en           │
│  {fecha_hoy} basado en fuentes públicas verificadas.   │
│  Para casos críticos, se recomienda revisión abogado."  │
│                                                         │
│ LLM call (Claude):                                      │
│   Prompt: "Resumen de 2 párrafos por qué estas 5       │
│            sentencias son relevantes para {tema}"       │
│   Output: comentario_análisis                          │
│                                                         │
│ Tiempo: <3 segundos                                     │
│ Fallback: Si LLM falla, usar template simple sin análsis│
└─────────────────────────┬────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────┐
│ PASO 6: CREAR EMAIL LISTO PARA REVISIÓN                 │
│ Email body generado:                                    │
│   To: cliente@empresa.com                              │
│   Subject: RE: {tema_original} - Análisis jurisprudencia│
│   Body: [Análisis completo del PASO 5]                  │
│   Attachments: PDF con sentencias (si aplica)          │
│                                                         │
│ Email metadata:                                         │
│   ├─ status: "PENDING_REVIEW" (no enviado aún)         │
│   ├─ created_by: "AutoSearchAgent"                      │
│   ├─ created_at: "2026-08-15T14:32:00Z"               │
│   ├─ generated_from_email_id: "{email_id_original}"    │
│   └─ sources_used: ["Corte Constitucional", "LDH",...]│
│                                                         │
│ Tiempo: <1 segundo                                      │
└─────────────────────────┬────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────┐
│ PASO 7: NOTIFICAR AL ABOGADO PARA REVISIÓN              │
│ Canales (en paralelo):                                  │
│   ├─ Email: "Email de cliente esperando revisión"      │
│   ├─ Slack: "@abogado_asignado Nueva búsqueda lista"   │
│   ├─ Dashboard: Marcar como "Pending Review" en CRM    │
│   └─ SMS: Si es urgente                                │
│                                                         │
│ Contenido notificación:                                 │
│   ├─ Cliente: {cliente_nombre}                         │
│   ├─ Tema: {tema}                                      │
│   ├─ Sentencias encontradas: 5                         │
│   ├─ Link para revisar: {dashboard_link}              │
│   └─ TTL (Time to Live): Espera aprobación 24 horas   │
│                                                         │
│ Tiempo: <1 segundo                                      │
│ Retry: Si abogado no responde en 24h → escalate        │
└─────────────────────────┬────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────┐
│ PASO 8: ABOGADO REVISA EN DASHBOARD                      │
│ UI mostra:                                              │
│   ├─ Email original del cliente (contexto)             │
│   ├─ Análisis generado automáticamente                 │
│   ├─ Botón 1: "APROBAR Y ENVIAR"                       │
│   ├─ Botón 2: "EDITAR ANTES DE ENVIAR"                 │
│   ├─ Botón 3: "RECHAZAR, BUSCAR MANUALMENTE"           │
│   └─ Checkbox: "Guardar esta búsqueda como template"   │
│                                                         │
│ Acción abogado:                                         │
│   ├─ Revisa análisis (2-3 minutos vs 45 min manual)    │
│   ├─ Verifica sentencias son correctas                 │
│   ├─ Decide: Aprobar, editar, o rechazar              │
│   └─ Click acción                                      │
│                                                         │
│ Tiempo: 2-5 minutos (vs 45 minutos antes)              │
└─────────────────────────┬────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────┐
│ PASO 9: ENVIAR O RECHAZAR (BASADO EN APROBACIÓN)        │
│                                                         │
│ SI APROBADO:                                            │
│   ├─ Email se envía automáticamente a cliente          │
│   ├─ CC a abogado (copia del envío)                    │
│   ├─ Log: Registra envío en BD                         │
│   ├─ Notificación: Confirmar a abogado "Enviado"       │
│   └─ Archivo: Guardar en expediente digital            │
│                                                         │
│ SI EDITADO:                                             │
│   ├─ Email edits se guardan                            │
│   ├─ Versión final se envía                            │
│   ├─ Log: Registra cambios realizados                  │
│   └─ Notificación: "Enviado con ediciones"             │
│                                                         │
│ SI RECHAZADO:                                           │
│   ├─ Email NO se envía                                  │
│   ├─ Draft se guarda para referencia                   │
│   ├─ Escalate: Si frecuente, notificar a socios        │
│   └─ Notificación: "Búsqueda rechazada, requiere manual"│
│                                                         │
│ Tiempo: <1 segundo                                      │
└─────────────────────────┬────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────┐
│ SALIDA FINAL: Email enviado o guardado en draft        │
│ Tiempo total: 5-10 minutos (vs 45 minutos manual)       │
│ Ahorro: 35-40 minutos por búsqueda                      │
│ Calidad: Mejor, más exhaustivo, menos errores          │
│ Auditoría: Completamente loguado                        │
│ Cumplimiento: LGPD checked, confidencialidad respetada  │
└──────────────────────────────────────────────────────────┘

COMPARATIVA:

PROCESO MANUAL:
├─ Tiempo: 45 minutos
├─ Trabajo: Abogado (100% dedicado)
├─ Completitud: 60-70% (misses jurisprudencia nueva)
├─ Calidad: Variable (depende de abogado)
├─ Repetibilidad: Baja (cada búsqueda diferente)
└─ Scalabilidad: Baja (requiere más abogados)

PROCESO AUTOMATIZADO:
├─ Tiempo: 5-10 minutos (solo revisión)
├─ Trabajo: Sistema (<1 seg) + Abogado (2-5 min revisión)
├─ Completitud: 95%+ (todas las APIs consultadas)
├─ Calidad: Consistente (mismo formato, mismo rigor)
├─ Repetibilidad: Alta (mismo flujo cada vez)
└─ Scalabilidad: Alta (N consultas en paralelo)

ECONOMÍA:
├─ 10 búsquedas/semana × 35 min/ahorro = 5.8 horas/semana
├─ 5 abogados × 5.8 horas = 29 horas/semana liberadas
├─ 29 horas × $200/hora = $5,800/semana de valor
├─ Anual: $302,000 de tiempo liberado
├─ Menos errores: Evitar 1 error por mes (confidencialidad) = $50K anual
└─ Total: ~$350K anual de beneficio
```

### BLOQUE 4: PUNTOS DE APROBACIÓN HUMANA

**Mejora del original:**
```
¿DÓNDE DEBE INTERVENIR EL HUMANO?

PUNTO 1: RECEPCIÓN (Trigger)
├─ Decisión: ¿Es solicitud legítima o spam?
├─ Automatización: NLP + blacklist → 95% detecta
├─ Intervención humana: SÍ, casos ambiguos
├─ Impacto si falla: Bajo (spam no es crítico)
└─ Recomendación: Automático con notificación manual si duda

PUNTO 2: VALIDACIÓN DE PERMISO
├─ Decisión: ¿Abogado tiene derecho a esta información?
├─ Automatización: BD query + RBAC → 100% preciso
├─ Intervención humana: NO, lógica clara
├─ Impacto si falla: CRÍTICO (breach de confidencialidad)
└─ Recomendación: Automático, log cualquier acceso negado

PUNTO 3: BÚSQUEDA EN FUENTES
├─ Decisión: ¿Son resultados realmente relevantes?
├─ Automatización: Relevance scoring + rank → 80% correcto
├─ Intervención humana: SÍ, validar top resultados
├─ Impacto si falla: MEDIO (malos resultados dan mala impresión)
└─ Recomendación: Automático con sugerencias, humano valida

PUNTO 4: ANÁLISIS EXPLICATIVO
├─ Decisión: ¿Explicación es clara y correcta?
├─ Automatización: Template + LLM → 85% bueno
├─ Intervención humana: SÍ, revisor abogado
├─ Impacto si falla: MEDIO (análisis débil, cliente confundido)
└─ Recomendación: Automático + revisión antes de envío

PUNTO 5: APROBACIÓN FINAL ANTES DE ENVÍO
├─ Decisión: ¿Email está listo para enviar?
├─ Automatización: Validaciones formales → 95% ok
├─ Intervención humana: SÍ, abogado revisa
├─ Impacto si falla: CRÍTICO (información incorrecta al cliente)
└─ Recomendación: REQUIERE aprobación explícita (click button)

PUNTO 6: ESCALACIÓN DE PROBLEMAS
├─ Decisión: ¿Hay problema que requiere atención?
├─ Automatización: Detect errores, timeout, acceso denegado
├─ Intervención humana: SÍ, notificar al manager
├─ Impacto si falla: MEDIO (problema no se resuelve)
└─ Recomendación: Automático + alert a socios si crítico


MATRIZ DE DECISIÓN:

Riesgo     | Automático? | Intervalo | Escalate?
-----------|-------------|-----------|----------
CRÍTICO    | NO          | Manual    | SÍ siempre
ALTO       | Parcial     | Automático + review | Si detiene flujo
MEDIO      | SÍ          | Automático + notif | Si frecuente
BAJO       | SÍ          | Automático | No
```

### BLOQUE 5: MANEJO DE FALLOS Y RECUPERACIÓN

**Mejora del original:**
```
¿QUÉ PASA CUANDO ALGO FALLA?

FALLO TIPO 1: API Externa No Responde

Escenario: API Corte Constitucional está offline

Estrategia de recuperación:
├─ Inmediato (1er intento falla):
│   └─ Retry con backoff exponencial: Espera 2s, reintentar
│
├─ Segundo intento (2s después, aún falla):
│   └─ Retry con backoff: Espera 4s, reintentar
│
├─ Tercer intento (4s después, aún falla):
│   └─ Retry con backoff: Espera 8s, reintentar
│
├─ Timeout (3 reintentos = 14s, aún falla):
│   └─ Usar fuente alternativa (Legal Data Hunter)
│   └─ Si esa también falla, continuar con fuentes restantes
│
└─ Fallback completo (todas las fuentes fallan):
    ├─ Notificar abogado: "Las APIs externas no están disponibles"
    ├─ Ofrecimiento: "Deseas que lo haga manualmente o esperar 30 min?"
    ├─ Timeout máximo: 30 minutos, si aún falla → escalate
    └─ Log: Registrar error, alertar a equipo infraestructura

Tiempo total: 14 segundos antes de fallback
Automatización: 100% automático, sin intervención

FALLO TIPO 2: Datos Incompletos

Escenario: Email del cliente no tiene tema claro

Estrategia de recuperación:
├─ Detección: NLP score <0.6 (threshold confianza)
│
├─ Acción 1: Pedir clarificación automática
│   └─ Bot responde: "Entendí que es sobre {tema_probable}. ¿Correcto?"
│   └─ Cliente responde SÍ/NO
│
├─ Acción 2: Si NO o sin respuesta en 2 horas
│   └─ Escalar a abogado: "Cliente no aclaró tema, requiere seguimiento"
│
└─ Verificación: Abogado interactúa, clarifica tema, reinicia búsqueda

Tiempo de resolución: Inmediato a 2 horas
Automatización: 60% automático, 40% humano

FALLO TIPO 3: Confiabilidad Baja en Resultados

Escenario: Relevance score es bajo para todos los resultados (<5/10)

Estrategia de recuperación:
├─ Detección: Promedio de scores <5.0
│
├─ Acción: No generar análisis automático
│   └─ En su lugar: Mostrar raw results sin análisis
│   └─ Notificar abogado: "Resultados con confianza baja, requiere análisis manual"
│
├─ Abogado puede:
│   ├─ Opción A: Aceptar resultados así (bajo riesgo, bajo valor)
│   ├─ Opción B: Hacer búsqueda manual (alto valor, manual)
│   └─ Opción C: Rechazar, intentar después (APIs pueden mejorar)
│
└─ Log: Registrar casos de baja confianza para mejorar futuro

Tiempo de resolución: 5-10 minutos
Automatización: 80% automático, 20% decisión humana

FALLO TIPO 4: Email No Aprobado por 24 Horas

Escenario: Abogado no revisa email en cola

Estrategia de recuperación:
├─ En 4 horas: Recordatorio Slack al abogado
├─ En 12 horas: Escalate a manager del abogado
├─ En 24 horas:
│   ├─ Opción 1: Enviar email con disclaimer "Pending review for 24h"
│   ├─ Opción 2: Asignar a otro abogado
│   └─ Opción 3: Guardar en draft, no enviar (requiere aprobación explícita)
│
└─ Decision: Configurado por firma (qué hacer por defecto)

Tiempo de resolución: 24 horas
Automatización: 90% automático, 10% si escala a humano


FALLO TIPO 5: Hallazgo de Dato Sensible

Escenario: Sistema detecta que está sobre procesar información clasificada

Estrategia de recuperación:
├─ Detección: Pattern matching de palabras clave (contraseña, token, etc)
│
├─ Acción inmediata:
│   ├─ STOP el proceso
│   ├─ No guardar en logs
│   ├─ Notificar al abogado: "Dato sensible detectado"
│   └─ Alertar a compliance: Posible data leak risk
│
├─ Investigación:
│   ├─ Revisar qué fue expuesto
│   ├─ Cuántos sistemas lo vieron
│   └─ Quién tiene acceso
│
└─ Acción: Posible activación de incident response

Tiempo de resolución: Inmediato
Automatización: 100% automático + alertas


MONITOREO Y ALERTAS:

Métrica 1: Tasa de Éxito
├─ Meta: >98% de búsquedas completadas exitosamente
├─ Rojo: <95% (investigar qué está fallando)
├─ Acción: Page on-call engineer si rojo

Métrica 2: Tiempo de Respuesta
├─ Meta: <10 segundos búsqueda completa
├─ Rojo: >20 segundos (performance issue)
├─ Acción: Check APIs, database, cache

Métrica 3: Aprobación Rate
├─ Meta: >85% de emails aprobados por abogados
├─ Amarillo: 70-85% (quality issue? usability issue?)
├─ Acción: Revisar feedback de abogados

Métrica 4: Escapes de Seguridad
├─ Meta: 0 (zero tolerance)
├─ Rojo: >0 (incident inmediato)
└─ Acción: Investigation + remediation
```

### BLOQUE 6: ESPECIFICACIÓN TÉCNICA DEL FLUJO

**Mejora del original:**
```
PSEUDOCÓDIGO DEL FLUJO AUTOMATIZADO:

```javascript
// ========================================================
// WORKFLOW AUTÓNOMO: Búsqueda de Jurisprudencia
// ========================================================

async function searchJurisprudenceWorkflow(emailEvent) {
  
  // ========================================================
  // PASO 1: Validar y extraer información
  // ========================================================
  try {
    const extracted = await extractEmailData(emailEvent);
    
    if (extracted.confidence < 0.6) {
      // Baja confianza, pedir clarificación
      await sendClarificationRequest(emailEvent.from);
      return {
        status: "PENDING_CLARIFICATION",
        timestamp: now()
      };
    }
  } catch (error) {
    // Error en parsing, escalar a humano
    await escalateToHuman("parsing_error", error);
    return { status: "ESCALATED", reason: "parse_error" };
  }

  // ========================================================
  // PASO 2: Validar permisos LGPD
  // ========================================================
  try {
    const permission = await checkAccess(
      extracted.lawyerId,
      extracted.clientId,
      extracted.dataClassification
    );
    
    if (!permission.allowed) {
      // Acceso denegado por compliance
      await notifyComplianceOfficer("access_denied", {
        lawyer: extracted.lawyerId,
        client: extracted.clientId,
        reason: permission.reason
      });
      return { status: "DENIED", reason: permission.reason };
    }
  } catch (error) {
    // Error de validación, seguridad primero
    await escalateToHuman("security_check_failed", error);
    return { status: "ESCALATED", reason: "security" };
  }

  // ========================================================
  // PASO 3: Buscar en múltiples fuentes (paralelo)
  // ========================================================
  const searchPromises = [
    searchCorteConstitucional(extracted.theme, {timeout: 10000}),
    searchLegalDataHunter(extracted.theme, {timeout: 10000}),
    searchConsejoDeEstado(extracted.theme, {timeout: 10000})
  ];

  let results = [];
  try {
    const responses = await Promise.allSettled(searchPromises);
    
    responses.forEach((response, idx) => {
      if (response.status === 'fulfilled') {
        results.push(...response.value);
      } else {
        // Falla en una API, loguear pero continuar
        logger.warn(`API ${idx} failed:`, response.reason);
      }
    });

    if (results.length === 0) {
      // Todas las fuentes fallaron
      await notifyLawyer(extracted.lawyerId, {
        type: "SEARCH_FAILED",
        message: "No pudimos contactar las fuentes de jurisprudencia"
      });
      return { status: "ALL_SOURCES_FAILED" };
    }
  } catch (error) {
    await escalateToHuman("search_error", error);
    return { status: "ESCALATED", reason: "search_error" };
  }

  // ========================================================
  // PASO 4: Procesar y rankear resultados
  // ========================================================
  const ranked = results
    .map(item => ({
      ...item,
      relevanceScore: calculateRelevance(item, extracted.theme)
    }))
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 5); // Top 5

  if (ranked[0].relevanceScore < 5) {
    // Baja confianza en resultados
    await notifyLawyer(extracted.lawyerId, {
      type: "LOW_CONFIDENCE",
      message: "Resultados tienen confianza baja, requiere revisión manual"
    });
    // No generar análisis automático
    return { status: "LOW_CONFIDENCE", data: ranked };
  }

  // ========================================================
  // PASO 5: Generar análisis con LLM
  // ========================================================
  let analysis;
  try {
    analysis = await generateAnalysis(
      extracted.theme,
      ranked,
      extracted.context
    );
  } catch (error) {
    // LLM falla, usar template simple
    analysis = await generateSimpleTemplate(ranked);
  }

  // ========================================================
  // PASO 6: Crear email para revisión
  // ========================================================
  const email = {
    to: extracted.clientEmail,
    subject: `RE: ${extracted.theme} - Análisis Jurisprudencia`,
    body: formatEmailBody(analysis, ranked),
    status: "PENDING_REVIEW",
    createdAt: now(),
    createdBy: "AutoSearchAgent",
    sources: ranked.map(r => r.source),
    requiresApproval: true
  };

  await saveDraft(email);

  // ========================================================
  // PASO 7: Notificar al abogado
  // ========================================================
  await notifyLawyer(extracted.lawyerId, {
    type: "REVIEW_PENDING",
    email_id: email.id,
    client: extracted.clientName,
    theme: extracted.theme,
    ttl: "24 hours"
  });

  return {
    status: "PENDING_REVIEW",
    email_id: email.id,
    completedAt: now(),
    timeSpent: Math.round((now() - emailEvent.timestamp) / 1000) + "s"
  };
}

// ========================================================
// MANEJADOR DE APROBACIÓN
// ========================================================
async function handleApproval(emailId, action, edits = null) {
  const email = await getDraft(emailId);
  
  switch(action) {
    case "APPROVE":
      // Enviar email tal como está
      await sendEmail(email);
      await logAudit("email_sent", { emailId, approvedBy: user.id });
      return { status: "SENT" };
      
    case "EDIT_AND_APPROVE":
      // Aplicar edits y enviar
      email.body = edits.body;
      email.editedBy = user.id;
      await sendEmail(email);
      await logAudit("email_sent_edited", { emailId, edits });
      return { status: "SENT_WITH_EDITS" };
      
    case "REJECT":
      // Guardar draft pero no enviar
      email.status = "REJECTED";
      email.rejectedBy = user.id;
      await saveDraft(email);
      await logAudit("email_rejected", { emailId, rejectedBy: user.id });
      return { status: "REJECTED_SAVED_DRAFT" };
  }
}

// ========================================================
// MONITOREO Y RECUPERACIÓN
// ========================================================
setInterval(async () => {
  // Cada hora, revisar pendientes
  const pending = await getPendingReviews({ olderThan: "4 hours" });
  
  pending.forEach(async (email) => {
    await sendReminder(email.lawyerId, email.id);
  });
}, 3600000);

setInterval(async () => {
  // Cada día, escalate si aún pendiente
  const veryOld = await getPendingReviews({ olderThan: "24 hours" });
  
  veryOld.forEach(async (email) => {
    await escalateToManager(email.lawyerId, email.id);
  });
}, 86400000);
```

DETALLES TÉCNICOS:

Lenguaje: Node.js + TypeScript
Base de datos: PostgreSQL + Redis (cache)
APIs:
  ├─ Legal Data Hunter: SDK oficial
  ├─ Corte Constitucional: HTTP scraper (si no hay API)
  ├─ Consejo de Estado: HTTP scraper
  └─ Claude API: Análisis con LLM

Dependencias clave:
  ├─ axios (HTTP requests)
  ├─ nodemailer (email)
  ├─ redis (cache)
  ├─ winston (logging)
  ├─ joi (validation)
  └─ @anthropic-ai/sdk (LLM)

Deployment:
  ├─ Docker container
  ├─ Kubernetes para scaling
  ├─ PM2 para process management
  └─ GitHub Actions para CI/CD

Monitoring:
  ├─ Prometheus (metrics)
  ├─ Grafana (dashboards)
  ├─ Sentry (error tracking)
  ├─ CloudWatch (logs)
  └─ PagerDuty (alerts)
```

### BLOQUE 7: CHECKLIST DE IMPLEMENTACIÓN

**Mejora del original:**
```
ANTES DE LANZAR EL WORKFLOW:

☐ ARQUITECTURA & DISEÑO
  ☐ Flujo documentado en detalle
  ☐ Puntos de decisión identificados
  ☐ Fallos y recuperación planeados
  ☐ Seguridad LGPD revieweada
  ☐ Performance targets definidos

☐ CÓDIGO
  ☐ Código escrito y testeado
  ☐ Error handling exhaustivo
  ☐ Logging en todos los pasos críticos
  ☐ Unit tests >80% cobertura
  ☐ Integration tests funciona
  ☐ Code review aprobado

☐ SEGURIDAD
  ☐ Secrets management (no credenciales en código)
  ☐ Rate limiting en APIs externas
  ☐ Input validation en todos los inputs
  ☐ Encriptación de datos en tránsito
  ☐ Auditoría logging configurada
  ☐ Compliance review por abogado

☐ PERFORMANCE & SCALING
  ☐ Benchmarks: <10 segundos por búsqueda
  ☐ Load testing: Simula 10x usuarios
  ☐ Database queries optimizadas (índices)
  ☐ Caching configurado y testado
  ☐ Parallel requests funciona
  ☐ Timeout handling probado

☐ OPERACIÓN
  ☐ Monitoring dashboards creados
  ☐ Alertas configuradas
  ☐ Playbooks de incident response
  ☐ On-call rotation establecida
  ☐ Runbook documentation
  ☐ Training completado para operadores

☐ USUARIO
  ☐ UI/UX para aprobación testeada
  ☐ Email templates probados
  ☐ Notificaciones funciona en todos los canales
  ☐ Rollback plan definido
  ☐ Feedback mechanism establecido

☐ LANZAMIENTO
  ☐ Pilot con 2-3 abogados
  ☐ Feedback colectado y ajustado
  ☐ Full rollout planeado
  ☐ Communication plan listo
  ☐ Support team trained
  ☐ Go/no-go decision made

CHECKLIST DE CALIDAD POST-LANZAMIENTO (Primera Semana):

☐ Cero errores críticos
☐ >95% búsquedas exitosas
☐ <10 segundos promedio
☐ >80% emails aprobados en <1 hora
☐ 0 data breaches
☐ Team satisfecho (NPS >7)
☐ Métricas están siendo tracked
```

---

## 🎯 CASO DE USO: IMPLEMENTACIÓN REAL

```
EJEMPLO: Búsqueda de Jurisprudencia en JAC

ESTADO ACTUAL:
├─ Abogados hacen búsqueda manual: 45 min/búsqueda
├─ 10 búsquedas/semana: 7.5 horas/semana
├─ 5 abogados: 37.5 horas/semana
├─ Anual: 1,950 horas = ~$390,000

IMPLEMENTACIÓN:
├─ Phase 1 (Semana 1-2): Diseño + Especificación técnica
├─ Phase 2 (Semana 3-8): Desarrollo + Testing
├─ Phase 3 (Semana 9): Pilot (2 abogados)
├─ Phase 4 (Semana 10): Full rollout

DESPUÉS DEL LANZAMIENTO:
├─ Tiempo por búsqueda: 5 min (solo revisión)
├─ 10 búsquedas/semana: 50 min/semana
├─ 5 abogados: 250 min = 4.2 horas/semana
├─ Ahorro: 33 horas/semana
├─ Anual: 1,716 horas = $343,200

BENEFICIOS:
├─ Tiempo liberado: $343K anual
├─ Menos errores: $50K (confidencialidad breach evitado)
├─ Mejor cliente experience: NPS +15 puntos
├─ Escalabilidad: Puede hacer 50 búsquedas/semana sin staff extra
└─ TOTAL ROI: ~$400K anual
```

---

**JAC - Abogados Asociados**  
**Sistema de Workflows Autónomos**  
**Versión 2.0 - Prompt Mejorado**  
**Última actualización: 15/08/2026**
