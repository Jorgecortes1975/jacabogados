# Skill: Generador de Reportes Ejecutivos Automatizados

> **Transforma análisis jurídicos en reportes profesionales listos para clientes corporativos**

## 🎯 Propósito

Genera automáticamente reportes profesionales que sintetizan:
- Análisis jurisprudencial verificado
- Síntesis de comunicaciones legales
- Evaluación de riesgos contractuales
- Recomendaciones estratégicas
- Documentos listos para presentar a clientes/junta

**Impacto**: De análisis a presentación ejecutiva en 2 minutos vs 4 horas.

---

## 📋 Modo de Uso

### Generación Manual

```bash
/generador-reportes-ejecutivos \
  --tipo "analisis-integral" \
  --caso "Caso Laboral XYZ" \
  --incluir "jurisprudencia, contratos, comunicaciones"
```

### Generación Automática (Loop Mensual)

Se ejecuta cada fin de mes:
- Recopila todos los análisis del mes
- Genera reporte mensual de casos activos
- Exporta a PDF profesional
- Sincroniza con Google Drive

---

## 🔧 Prompt Maestro Profesional

\`\`\`
[CONTEXTO PROFESIONAL]
Eres director ejecutivo de asuntos legales redactando reporte 
para junta directiva o cliente C-level.

Tu tarea: transforma análisis técnicos en narrativa ejecutiva
que genera confianza y orienta decisiones estratégicas.

[ESTRUCTURA REQUERIDA]

PORTADA
- Logo despacho
- Título del reporte
- Fecha
- Confidencial

EJECUTIVO (1 página máximo)
- Situación actual en 3 líneas
- 3-5 recomendaciones clave
- Próximos pasos inmediatos

ANÁLISIS JURÍDICO
- Estado del caso/asunto
- Jurisprudencia aplicable (citas verificadas)
- Riesgos y oportunidades

EVALUACIÓN DE RIESGOS
- Matriz de riesgo (probabilidad × impacto)
- Mitigaciones implementadas
- Recomendaciones pendientes

PLAN DE ACCIÓN
- Acciones corto plazo (30 días)
- Acciones mediano plazo (90 días)
- Cronograma con responsables

ANEXOS
- Jurisprudencia relevante (tablas)
- Documentos de soporte
- Plantillas de respuesta/demanda

[TONO Y ESTILO]
✓ Profesional, confiable, directo
✓ Números y datos concretos (no "muy probable")
✓ Orientado a decisiones comerciales
✓ Sin lenguaje alarmista
✓ Soluciones específicas, no diagnósticos

[FORMATO VISUAL]
- Logo del despacho en encabezado
- Colores corporativos consistentes
- Tablas resumen de riesgos
- Gráficos de cronograma
- Resaltados de puntos críticos
- Numeración clara de recomendaciones

[IDIOMA Y NIVEL]
Lenguaje ejecutivo: presume conocimiento legal
Pero explica conceptos complejos en párrafo separado
Dirigido a: socios, clientes C-level, juntas directivas
\`\`\`

---

## 🔄 Loop Automático

**Frecuencia**: Último viernes de cada mes a las 4:00 PM  
**Fuentes compiladas**:
- Síntesis de email del mes
- Análisis jurisprudencial acumulado
- Evaluación de contratos
- Comunicaciones con clientes

**Salidas**:
- PDF profesional → `/outputs/reportes/`
- Versión Google Drive → Sincronización automática
- Alerta ejecutiva por email

**Configuración en hooks**:
```json
{
  "trigger": "loop-reporte-mensual",
  "schedule": "0 16 * * 5",
  "when": "last_friday_of_month",
  "action": "generador-reportes-ejecutivos",
  "sources": [
    "outputs/síntesis/",
    "outputs/jurisprudencia/",
    "outputs/contratos/"
  ],
  "output_formats": ["pdf", "docx", "html"],
  "sync_to_drive": {
    "enabled": true,
    "folder": "JAC/Reportes Ejecutivos/"
  },
  "notifications": {
    "email": "socios@jacabogados.co",
    "slack": "#reportes-legales"
  }
}
```

---

## 📊 Plantillas de Output

### Plantilla Estándar (Reporte Integral)

```
╔════════════════════════════════════════════════════════════════╗
║                                            [LOGO JAC]
║           REPORTE JURÍDICO EJECUTIVO
║           [NOMBRE DEL CASO]
║           [MES/AÑO]
║                                    CONFIDENCIAL
╚════════════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 RESUMEN EJECUTIVO

SITUACIÓN ACTUAL
[2-3 párrafos máximo describiendo dónde estamos]

🎯 3 RECOMENDACIONES CLAVE
1. [Acción estratégica principal] — Impacto: [Cuantificado]
2. [Acción defensiva] — Reduce riesgo de: [Específico]
3. [Acción oportunidad] — Genera ventaja: [Cuantificada]

✅ PRÓXIMOS PASOS (Próximos 30 días)
- @[Responsable]: [Tarea] para DD/MM/YYYY
- @[Responsable]: [Tarea] para DD/MM/YYYY

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SECCIÓN 1: ESTADO DEL ASUNTO

[Descripción profesional del caso, partes, historia relevante]

Cronología crítica:
| Fecha | Evento | Impacto |
|---|---|---|
| DD/MM/YYYY | [Evento] | [Efecto] |

SECCIÓN 2: ANÁLISIS JURÍDICO

Jurisprudencia aplicable:
- [Sentencia CC T-XXX-XX (2024)]: Fundamento clave
- [Sentencia CSJ (2023)]: Precedente relevante
- [Sentencia CE (2024)]: Estándar de prueba

Normativa aplicable:
- Artículos [X-Y] del Código [Aplicable]
- Resolución [Número] de [Año]

SECCIÓN 3: EVALUACIÓN DE RIESGOS

📊 MATRIZ DE RIESGO

| Riesgo | Probabilidad | Impacto | Score | Mitigación |
|---|---|---|---|---|
| [Riesgo 1] | Alta (80%) | Alto ($$$) | 8/10 | [Acción] |
| [Riesgo 2] | Media (50%) | Medio ($$) | 5/10 | [Acción] |

Riesgos críticos identificados: 2
Riesgos moderados: 1
Riesgos bajos: 3

⚖️ BALANCE: Favorable/Desfavorable/Neutral

SECCIÓN 4: PLAN DE ACCIÓN

🔴 ACCIONES URGENTES (Próximos 15 días)
1. @[Responsable]: [Acción específica] — Vencimiento DD/MM
2. @[Responsable]: [Acción específica] — Vencimiento DD/MM

🟡 ACCIONES CORTO PLAZO (30 días)
1. @[Responsable]: [Acción] — Para DD/MM
2. @[Responsable]: [Acción] — Para DD/MM

🟢 ACCIONES MEDIANO PLAZO (90 días)
1. @[Responsable]: [Acción] — Estratégica

CRONOGRAMA DE IMPLEMENTACIÓN
[Gráfico Gantt visual de hitos]

SECCIÓN 5: IMPACTO FINANCIERO

| Escenario | Probabilidad | Efecto Financiero | Escenario Base |
|---|---|---|---|
| Favorable | 30% | +$[X] | |
| Esperado | 50% | $[Y] | ← Base |
| Desfavorable | 20% | -$[Z] | |

Valor en riesgo: $[Monto]
Potencial de oportunidad: $[Monto]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ANEXOS

ANEXO A: Jurisprudencia Verificada
[Tabla con radicados, fechas, ratio decidendi]

ANEXO B: Documentos de Soporte
[Referencias a documentos base]

ANEXO C: Plantillas de Respuesta
[Drafts listos para usar]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Reporte preparado por: [Nombre] — Abogado [Especialidad]
Fecha: DD/MM/YYYY
Próxima revisión: DD/MM/YYYY
Estado: CONFIDENCIAL — Privilegio Abogado-Cliente
```

---

## 🎓 Tipos de Reportes Automatizables

### Reporte Mensual (Default)
Compilación de todos los casos activos con resumen de avances

### Reporte de Caso Específico
Deep dive sobre un caso con toda la jurisprudencia y análisis

### Reporte de Oportunidad
Identifica oportunidades legales de negocio

### Reporte de Cumplimiento
Verifica que procesos cumplan con normativa

### Reporte de Riesgo (Risk Report)
Matriz de riesgos corporativos y mitigaciones

### Reporte de Benchmarking
Compara prácticas legales contra estándares de mercado

---

## 🛠️ Integración con Otros Skills

- **← síntesis-jurídica-emails**: Incluir puntos clave del mes
- **← búsqueda-jurisprudencial**: Jurisprudencia verificada más reciente
- **← análisis-contractual**: Resumen de riesgos contractuales identificados

---

## 📊 Formatos de Salida

```bash
# PDF profesional (recomendado para clientes)
/generador-reportes-ejecutivos --formato pdf

# Word editable (para ajustes internos)
/generador-reportes-ejecutivos --formato docx

# HTML interactivo (para intranet)
/generador-reportes-ejecutivos --formato html

# Diapositivas (para presentaciones)
/generador-reportes-ejecutivos --formato pptx
```

---

## ⏰ Cronograma de Salida

**Reporte Mensual**: Último viernes 16:00 → Google Drive + Email  
**Reportes ad-hoc**: Disponible on-demand 24/7  
**Actualizaciones**: Si hay cambios jurisprudenciales relevantes  

---

## 🎯 Estándar de Calidad

✓ Todos los datos verificables en fuentes oficiales  
✓ Citas jurisprudenciales con radicado y fecha  
✓ Lenguaje ejecutivo (no técnico innecesario)  
✓ Recomendaciones accionables (no especulativas)  
✓ Formatos profesionales listos para cliente  

---

## 📞 Soporte

**¿Necesitas un formato especial?**  
→ Proporciona template o describir estructura deseada

**¿Reporte no incluye información X?**  
→ Verifica que esté en los análisis previos

**¿Necesitas más detalles?**  
→ Solicita "reporte profundo" vs reporte estándar
