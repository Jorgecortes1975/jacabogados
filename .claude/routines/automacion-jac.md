# Routines Automáticas - Despacho J.A. Abogados

**Versión:** 1.0  
**Propósito:** Ejecución automática de agentes y skills según horarios y eventos  
**Activación:** Hooks + Loops agentivos integrados en settings.json

---

## 🕐 ROUTINE 1: Vigilancia Matutina de Vencimientos

**Nombre:** `check-vencimientos-diarios`  
**Horario:** Todos los días a las 08:00 AM (UTC-5 Colombia)  
**Duración:** 5 minutos  
**Skills activadas:** `vencimientos-procesales-col`, `cumplimiento-societario-col`

### Tareas
```yaml
1. Revisar vencimientos procesales próximos 30 días
   - Plazos de demandas
   - Recursos en trámite
   - Tutelas pendientes
   
2. Revisar cumplimiento societario
   - Renovación de matrícula mercantil (próximo mes)
   - Asamblea ordinaria programada
   - Reportes a Supersociedades
   
3. Generar reporte
   - Alertas CRÍTICAS (vence en 3 días)
   - Alertas ALTAS (vence en 7 días)
   - Alertas MEDIAS (vence en 30 días)
   
4. Enviar por email
   - Destinatario: jorgeacortesc38@gmail.com
   - Formato: HTML con colores por urgencia
```

### Salida
- Reporte en email (Asunto: "Vencimientos JAC - [FECHA]")
- CSV con detalles si hay alertas CRÍTICAS
- Copia en dashboard local

---

## 🕐 ROUTINE 2: Vigilancia Normativa Matutina

**Nombre:** `check-normativa-cambios`  
**Horario:** Todos los días a las 20:00 PM (UTC-5 Colombia)  
**Duración:** 3 minutos  
**Skills activadas:** `vigilancia-normativa-col`

### Tareas
```yaml
1. Buscar cambios normativos desde ayer
   - Decreto-Leyes
   - Sentencias de Cortes que cambien línea
   - Cambios en resoluciones DIAN, Minsalud
   - Cambios en regulación Supersociedades
   
2. Filtrar por relevancia para JAC
   - Laboral/UGPP
   - Societario
   - Contractual
   - Datos personales
   
3. Clasificar por impacto
   - CRÍTICO: Afecta casos activos
   - ALTO: Afecta práctica general
   - MEDIO: Informativo
   
4. Enviar alertas
```

### Salida
- Alert email si hay cambios CRÍTICOS o ALTOS
- Digest diario opcional (agrupar en un email)
- Referencias actualizadas en base de conocimiento

---

## 📅 ROUTINE 3: Auditoría Semanal de Cumplimiento Societario

**Nombre:** `audit-cumplimiento-semanal`  
**Día/Horario:** Lunes a las 09:00 AM  
**Duración:** 10 minutos  
**Skills activadas:** `cumplimiento-societario-col`

### Tareas
```yaml
1. Revisar todas las sociedades en cartera JAC
   - SAS, SA, Ltda registradas
   - Sucursales de extranjeras
   
2. Validar estado de cumplimiento
   - Matrícula mercantil activa
   - Libros de comercio al día
   - RUB (Beneficiario Final) registrado
   - Asamblea ordinaria calendarizada
   
3. Generar tracker YAML
   - Próximos 90 días
   - Vencimientos por sociedad
   - Responsable asignado
   
4. Identificar brechas
   - Sociedades en riesgo de cancelación
   - Falta de asamblea
   - Beneficiario final no registrado
   
5. Generar informe
```

### Salida
- Tracker YAML actualizado
- Reporte de brechas (si hay)
- Lista de acciones para la semana
- Email a jorge@jacabogados (si hay hallazgos críticos)

---

## 📊 ROUTINE 4: Revisión de Documentos Jurídicos (AL CARGAR)

**Nombre:** `auto-analyze-legal-documents`  
**Trigger:** Al cargar PDF/DOCX jurídico  
**Duración:** 15-20 minutos  
**Agent activado:** `agente-jurisprudencia-prompting`

### Tareas
```yaml
1. Detectar tipo de documento
   - Contrato
   - Demanda/Escrito procesal
   - Sentencia
   - Acuerdo
   - Reporte
   
2. Ejecutar loop agentivo
   - Investigar jurisprudencia pertinente
   - Optimizar prompt para IA si aplica
   - Redactar análisis o recomendaciones
   - Auditar coherencia
   
3. Entregar
   - Documento original (guardado)
   - Análisis jurisprudencial (si aplica)
   - Prompt optimizado (si aplica)
   - Reporte de auditoría
```

### Salida
- Carpeta del cliente > Documento + Análisis
- Email notificando análisis completado
- Dashboard visual de hallazgos

---

## 🔄 ROUTINE 5: Loop Jurisprudencia Bajo Demanda

**Nombre:** `loop-jurisprudencia-on-demand`  
**Trigger:** Usuario pide "fundamenta con jurisprudencia" o similar  
**Duración:** 20-30 minutos  
**Agent activado:** `agente-jurisprudencia-prompting`

### Flujo (Automático)
```
Entrada (usuario)
  ↓
FASE 1: Diagnóstico (5 min)
  ├─ Clasificar por área de derecho
  ├─ Extraer temas clave
  └─ Determinar Altas Cortes competentes
  ↓
FASE 2: Investigación Paralela (10-15 min)
  ├─ [Paralelo] Buscar jurisprudencia (4+ sentencias)
  ├─ [Paralelo] Optimizar prompt IA (si necesario)
  └─ [Paralelo] Validar coherencia
  ↓
FASE 3: Síntesis & Redacción (15-20 min)
  ├─ Redactar escrito base (con jurisprudencia)
  ├─ Integrar análisis IA (si aplica)
  └─ Auditar coherencia final
  ↓
FASE 4: Entrega (2-5 min)
  ├─ Escrito procesual (DOCX + PDF)
  ├─ Referencias jurisprudenciales (Excel)
  ├─ Prompt optimizado (TXT)
  ├─ Reporte de auditoría (MD)
  └─ Consideraciones regulatorias (MD)
```

### Auto-Refinamiento
Si iteración N no alcanza calidad ≥95%:
- Refinar parámetros
- Buscar sentencias adicionales
- Reescribir argumentación
- Reintentar (máx 3 iteraciones)

---

## ⚡ ROUTINE 6: Escalado de Urgencia (CRÍTICO)

**Nombre:** `escalado-urgencia-critica`  
**Trigger:** Documento flaggado como CRÍTICO  
**Duración:** Inmediata (2-5 min)  
**Acción:** Notificación + Ejecución rápida

### Tareas
```yaml
1. Identificar urgencia
   - Vencimiento <3 días
   - Riesgo legal alto
   - Cliente VIP
   - Impacto regulatorio
   
2. Ejecutar agente jurisprudencia
   - Con iteraciones máximas
   - Escalado a especialista si bloqueo
   
3. Notificar
   - Email + SMS a Jorge
   - Prioridad en cola
   - Marker en dashboard (ROJO)
   
4. Entregar
   - Resultado prioritario
   - Validación humana si es muy crítico
```

---

## 📋 ROUTINE 7: Reporte Mensual Integrado

**Nombre:** `reporte-mensual-integrado`  
**Día/Horario:** Primer viernes del mes, 14:00  
**Duración:** 30 minutos  
**Consolidación de:** Todos los datos del mes

### Contenido
```
1. Resumen de actividades
   - Documentos procesados
   - Escritos redactados
   - Jurisprudencias compiladas
   
2. Análisis de cumplimiento
   - Vencimientos manejados
   - Cumplimiento societario
   - Normativa vigilada
   
3. Indicadores de impacto
   - Tiempo promedio de análisis
   - Calidad de escritos (auditoría)
   - Eficiencia de loops agentivos
   
4. Alertas y recomendaciones
   - Sociedades en riesgo
   - Cambios normativos críticos
   - Mejoras propuestas para procesos
```

### Salida
- Reporte PDF ejecutivo
- Dashboard actualizado
- Datos agregados para análisis

---

## 🔐 Configuración de Seguridad para Routines

```yaml
security:
  - Todas las routines se ejecutan con auditoría completa
  - Logs guardados por 1 año
  - Datos confidenciales encriptados en tránsito
  - Acceso limitado a usuario autorizado (Jorge)
  - Notificaciones de ejecución a correo
```

---

## 📱 Canales de Notificación

| Tipo de Alerta | Canales | Tiempo |
|---|---|---|
| CRÍTICA | Email + SMS | Inmediato |
| ALTA | Email + Dashboard | <1 hora |
| MEDIA | Email digest | Diario |
| BAJA | Dashboard solo | Consulta manual |

---

## ✅ Estado de Routines

| Routine | Estado | Próxima Ejecución |
|---|---|---|
| Vencimientos diarios | ✅ ACTIVA | Mañana 08:00 |
| Normativa cambios | ✅ ACTIVA | Hoy 20:00 |
| Auditoría semanal | ✅ ACTIVA | Próximo lunes 09:00 |
| Auto-análisis docs | ✅ ACTIVA | Al cargar |
| Loop jurisprudencia | ✅ ACTIVA | Bajo demanda |
| Escalado urgencia | ✅ ACTIVA | Inmediato si aplica |
| Reporte mensual | ✅ ACTIVA | Primer viernes 14:00 |

---

**Instalación:** Ver settings.json  
**Gestión:** Usar `/loop` CLI o dashboard  
**Monitoreo:** Logs en `.claude/logs/routines.log`
