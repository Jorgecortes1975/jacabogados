# Skill: Análisis de Flujo Contractual

> **Monitoreo automatizado de contratos corporativos con alertas de cláusulas críticas**

## 🎯 Propósito

Analiza automáticamente contratos para:
- Identificar cláusulas riesgosas o inusuales
- Monitorear fechas críticas (vencimientos, opciones)
- Comparar contra estándares de mercado
- Generar alertas sobre cambios jurisprudenciales aplicables
- Preparar reportes de renegociación

**Impacto**: Mitiga riesgos legales en contratos corporativos. Evita sorpresas.

---

## 📋 Modo de Uso

### Análisis Manual

```bash
/análisis-flujo-contractual "suministro-2024.pdf"
```

### Monitoreo Automático (Loop Semanal)

Se ejecuta cada viernes a las 5:00 PM:
- Revisa todos los contratos en carpeta `/contratos/`
- Identifica cláusulas críticas nuevas
- Alerta sobre vencimientos próximos (30, 60, 90 días)

---

## 🔧 Prompt Maestro Profesional

\`\`\`
[CONTEXTO PROFESIONAL]
Eres abogado corporativo especializado en análisis de riesgos contractuales.
Tu tarea: identificar cláusulas problemáticas y proponer optimizaciones.

[ANÁLISIS REQUERIDO]
Analiza este contrato e identifica:

1. **DATOS BÁSICOS DEL CONTRATO**
   - Partes
   - Objeto
   - Vigencia
   - Valor (si aplica)
   - Ley aplicable

2. **OBLIGACIONES PRINCIPALES**
   - Obligaciones de cada parte
   - Plazos de cumplimiento
   - Condiciones suspensivas/resolutivas

3. **CLÁUSULAS DE RIESGO ALTO** 🚨
   - Responsabilidad civil ilimitada
   - Indemnización cruzada
   - Penalidades excesivas
   - Cumplimiento imposible
   - Ambigüedades legales

4. **CLÁUSULAS DE RIESGO MEDIO** ⚠️
   - Terminación unilateral
   - Modificaciones sin consentimiento
   - Confidencialidad asimétrica
   - Propiedad intelectual
   - Garantías incompletas

5. **OPORTUNIDADES DE MEJORA**
   - Cláusulas faltantes (usual en mercado)
   - Términos que pueden ser negociados
   - Protecciones adicionales recomendadas

6. **FECHAS CRÍTICAS**
   - Vencimiento principal
   - Opciones de renovación (si/no/automática)
   - Períodos de notificación
   - Opciones de compra/venta

7. **CONFORMIDAD CON JURISPRUDENCIA**
   - Cláusulas invalidadas por cortes
   - Jurisprudencia reciente aplicable
   - Normas imperativas incumplidas

8. **SCORE DE RIESGO**
   - Puntuación: 0-10 (0=sin riesgo, 10=riesgo extremo)
   - Justificación del score

[FORMATO OUTPUT]
Reporte ejecutivo de 3 páginas máximo.
Tabla de cláusulas por nivel de riesgo.
Resumen de acciones recomendadas.
Plantilla de enmiendas sugeridas.

[TONO]
Profesional, práctico, orientado a mitigación.
Evita lenguaje alarmista.
Ofrece soluciones específicas.
\`\`\`

---

## 🔄 Loop Automático

**Frecuencia**: Cada viernes a las 5:00 PM  
**Fuentes**: Contratos en `/contratos/` (todo tipo)  
**Alertas activadas**: 
- Vencimientos en próximos 30/60/90 días
- Cambios jurisprudenciales en cláusulas existentes
- Nuevas cláusulas riesgosas

**Configuración en hooks**:
```json
{
  "trigger": "loop-análisis-contractual-semanal",
  "schedule": "0 17 * * 5",
  "action": "análisis-flujo-contractual",
  "contract_sources": [
    "contratos/",
    "contratos-archivados/"
  ],
  "alert_thresholds": {
    "risk_score_above": 6,
    "expiration_days": [30, 60, 90],
    "jurisprudence_changes": true
  },
  "output": "outputs/contratos/",
  "notifications": ["slack", "email"]
}
```

---

## 📊 Plantillas de Output

### Reporte de Análisis Contractual
```
╔════════════════════════════════════════════════════════════════╗
║ ANÁLISIS DE RIESGO CONTRACTUAL
║ Contrato: [Nombre] | Fecha Análisis: DD/MM/YYYY
╚════════════════════════════════════════════════════════════════╝

📋 DATOS BÁSICOS
- Partes: [Parte 1] - [Parte 2]
- Objeto: [Descripción]
- Vigencia: DD/MM/YYYY - DD/MM/YYYY (X años)
- Valor: [Monto] (si aplica)
- Ley Aplicable: [Jurisdicción]

🚨 RIESGOS CRÍTICOS IDENTIFICADOS (Alto)
| Cláusula | Problema | Impacto | Recomendación |
|---|---|---|---|
| [Núm] | [Descripción] | [Efecto potencial] | [Solución] |

⚠️ RIESGOS MODERADOS (Medio)
[Similar a anterior]

✅ OPORTUNIDADES DE MEJORA
1. Agregar cláusula de: [Descripción]
2. Modificar término: [Cláusula] de [Texto actual] a [Texto propuesto]
3. Clarificar: [Ambigüedad identificada]

📅 FECHAS CRÍTICAS
| Evento | Fecha | Días Restantes | Acción |
|---|---|---|---|
| Vencimiento | DD/MM/YYYY | XX | Iniciar renegociación |
| Opción renovación | DD/MM/YYYY | XX | Notificar antes de |

⚖️ ANÁLISIS JURISPRUDENCIAL
- Cláusula de [X] ha sido declarada [inválida/válida] en: [Sentencia]
- Recomendación: [Acción]

📊 SCORE DE RIESGO: X/10
Justificación: [Análisis breve]

🎯 PLAN DE ACCIÓN
1. Inmediato: [Acción urgente]
2. Corto plazo: [Acción 30 días]
3. Mediano plazo: [Acción 90 días]
```

---

## 🎓 Ejemplos de Análisis Reales

### Caso 1: Contrato de Suministro Industrial
**Análisis**: 47 cláusulas revisadas  
**Riesgos encontrados**: 4 críticos, 7 moderados  
**Score**: 7.2/10 (Alto)  
**Resultado**: Renegociación exitosa en 3 puntos críticos  

### Caso 2: Acuerdo de Confidencialidad
**Análisis**: 12 cláusulas revisadas  
**Riesgos encontrados**: 0 críticos, 2 moderados  
**Score**: 2.1/10 (Bajo)  
**Resultado**: Aprobado con recomendaciones menores  

---

## 🛠️ Integración con Otros Skills

- **← síntesis-jurídica-emails**: Si hay disputas contractuales, escalar a análisis
- **← búsqueda-jurisprudencial**: Aplicar jurisprudencia nueva a contratos existentes
- **→ generador-reportes-ejecutivos**: Incluir resumen de riesgos contractuales

---

## 📋 Tipos de Contratos Analizables

✓ Contratos de suministro y compraventa  
✓ Acuerdos de confidencialidad y NDA  
✓ Contratos laborales y de asesoría  
✓ Acuerdos comerciales y partnerships  
✓ Términos de servicio y licencias  
✓ Arrendamientos comerciales  
✓ Acuerdos de fusión y adquisición  

---

## 🔧 Personalizaciones Disponibles

**Análisis Quick (5 min)**:
```bash
/análisis-flujo-contractual-quick "contrato.pdf"
# Solo riesgos críticos
```

**Análisis Profundo (20 min)**:
```bash
/análisis-flujo-contractual-profundo "contrato.pdf"
# Análisis exhaustivo + benchmarking de mercado
```

**Comparación de Versiones**:
```bash
/análisis-flujo-contractual-versiones "v1.pdf" vs "v2.pdf"
# Identifica cambios y sus implicaciones
```

---

## 📞 Soporte

**Problema**: Análisis identifica riesgo que creemos manejable  
**Solución**: Proporciona contexto comercial → reanalizar con contexto

**Problema**: Cláusula específica no se identifica bien  
**Solución**: Sugerir lenguaje alternativo para clarificar
