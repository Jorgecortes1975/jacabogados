# Skill: Síntesis Jurídica de Comunicaciones

> **Automatiza la lectura y síntesis de hilos de correo complejos en abogacía**

## 🎯 Propósito

Resume automáticamente comunicaciones legales (correos, chats, documentos) identificando:
- Puntos clave del litigio/consulta
- Decisiones tomadas y acuerdos
- Tareas pendientes por participante
- Riesgos legales identificados
- Próximos pasos recomendados

**Impacto**: Ahorra 2-3 horas diarias de lectura manual.

---

## 📋 Modo de Uso

### Activación Manual

```bash
# Desde Claude Code Web
/síntesis-jurídica-emails

# O directamente en el navegador
# Copiar contenido de Gmail/Outlook → Ejecutar skill
```

### Activación Automática (Loop Diario)

Se ejecuta automáticamente cada mañana a las 8:00 AM sobre:
- Correos no leídos de las últimas 24h
- Hilos con clientes principales
- Comunicaciones con contraparte

---

## 🔧 Prompt Maestro Profesional

\`\`\`
[CONTEXTO PROFESIONAL]
Actúas como analista jurídico sénior de un despacho corporativo.
Tu tarea: analizar comunicaciones legales complejas y extraer 
inteligencia procesable para la toma de decisiones.

[ANÁLISIS REQUERIDO]
Analiza esta comunicación jurídica e identifica:

1. **PARTES Y ROLES**
   - Quiénes son los interlocutores
   - Interés de cada parte
   - Poder de decisión

2. **ASUNTOS CRÍTICOS**
   - Qué se negocia/discute
   - Precedentes legales mencionados
   - Riesgos identificados

3. **DECISIONES TOMADAS**
   - Qué se acordó explícitamente
   - Qué está pendiente de acuerdo
   - Condicionalidades

4. **TAREAS PENDIENTES** (Formato: @Responsable)
   - @[Nombre]: [Tarea] [Fecha límite]
   - Prioridad: ALTA/MEDIA/BAJA

5. **ANÁLISIS DE RIESGOS**
   - Cláusulas problemáticas
   - Vacíos legales
   - Recomendaciones inmediatas

6. **PRÓXIMOS PASOS RECOMENDADOS**
   - Acciones estratégicas
   - Plazos críticos
   - Preparación para fases siguientes

[FORMATO OUTPUT]
Genera un documento ejecutivo de máximo 2 páginas.
Usa tablas para tareas pendientes.
Resalta en rojo cualquier riesgo legal crítico.

[TONO]
Profesional, conciso, orientado a resultados.
Dirígete a: socios, directores de litigio, gerentes legales.
\`\`\`

---

## 🔄 Loop Automático

**Frecuencia**: Cada día laboral a las 8:00 AM  
**Fuentes**: Gmail (bandeja de entrada filtrada)  
**Outputs**: 
- Resumen ejecutivo en `/outputs/síntesis/`
- Alertas en Slack (si hay riesgos ALTA)

**Configuración en hooks**:
```json
{
  "trigger": "loop-diario-síntesis-emails",
  "schedule": "0 8 * * 1-5",
  "action": "síntesis-jurídica-emails",
  "filters": {
    "unread": true,
    "from": ["clientes_principales", "contraparte"],
    "last_24h": true
  },
  "output": "outputs/síntesis/"
}
```

---

## 📊 Plantillas de Output

### Resumen Ejecutivo
```
╔════════════════════════════════════════╗
║ SÍNTESIS JURÍDICA DIARIA
║ Fecha: DD/MM/YYYY | Asunto: [Caso]
╚════════════════════════════════════════╝

📌 PUNTO CRÍTICO IDENTIFICADO
[Si hay riego ALTA]

🎯 PUNTOS CLAVE
• [Punto 1 - Decisión/acuerdo]
• [Punto 2 - Precedente legal]
• [Punto 3 - Oportunidad]

📋 TAREAS PENDIENTES
| Responsable | Tarea | Vencimiento | Prioridad |
|---|---|---|---|
| @[Nombre] | [Tarea] | DD/MM | ALTA/MEDIA/BAJA |

⚠️ RIESGOS IDENTIFICADOS
- [Riesgo 1]: Análisis y recomendación
- [Riesgo 2]: Análisis y recomendación

✅ PRÓXIMOS PASOS
1. [Acción inmediata]
2. [Acción estratégica]
3. [Preparación para fase siguiente]
```

---

## 🎓 Ejemplos de Casos Reales

### Caso 1: Negociación de Contrato de Suministro
**Input**: 15 correos entre abogado interno y contraparte  
**Output**: Resumen 1 página identificando 3 cláusulas problemáticas  
**Tiempo de lectura manual**: 45 minutos  
**Tiempo con skill**: 2 minutos  

### Caso 2: Litigio Laboral Complejo
**Input**: Hilo con cliente + emails internos + documentos adjuntos  
**Output**: Cronología de eventos + estrategia recomendada  
**Tiempo de lectura manual**: 2 horas  
**Tiempo con skill**: 3 minutos  

---

## 🛠️ Integración con Otros Skills

- **→ análisis-contractual**: Si se identifica contrato, escalarlo automáticamente
- **→ búsqueda-jurisprudencial**: Si hay precedentes mencionados, investigar automáticamente
- **→ generador-reportes-ejecutivos**: Output apto para reporte mensual

---

## 📞 Soporte y Mejoras

**Problemas comunes**:
- "No identifica decisiones implícitas" → Proporcionar contexto histórico del caso
- "Tareas sin responsable" → Usar @Responsable explícitamente en el correo

**Sugerencias de mejora**:
Contáctanos con:
- Casos donde falló el análisis
- Formatos de output que prefieras
- Nuevas fuentes a integrar (WhatsApp, Teams)
