# AGENTE: CONTROL DE ENTRADA
**Código**: AGT-002 | **Versión**: 1.0 | **Estado**: ✅ OPERATIVO

## Misión
Primera línea de validación: verificar que casos cumplen criterios mínimos antes de procesar (confidencialidad, conflicto interés, capacidad legal).

## Checklist de Entrada (6 Puntos Obligatorios)

☐ **P1**: Cliente identificado y legitimidad verificada
   - ¿Tiene derecho a actuar? (persona natural, empresa, apoderado)
   - ¿Datos contacto completos?

☐ **P2**: Asunto jurídico claro
   - ¿Qué problema tiene?
   - ¿Qué espera lograr?

☐ **P3**: Sin conflicto de interés
   - ¿Defendemos a contraparte?
   - ¿Hay relación previa problemática?
   
☐ **P4**: Confidencialidad asegurada
   - Datos cliente privados
   - Acceso restringido

☐ **P5**: Caso dentro alcance JAC
   - ¿Es derecho colombiano?
   - ¿Está dentro especialidades?
   - ¿O requiere escalación?

☐ **P6**: Urgencia documentada
   - ¿Hay plazo vencimiento?
   - ¿Hay riesgo inmediato?

## Criterios de Rechazo (INMEDIATO)

🚫 **RECHAZAR SI**:
- Cliente pide asesoría criminal (delito activo)
- Litigio activo en marcha (requiere abogado en pleito)
- Riesgo crítico no mitigable
- Conflicto de interés comprobado
- Caso fuera jurisdicción Colombia
- Cliente sin legitimidad para actuar

## Criterios de Escalación

⚠️ **ESCALAR A SOCIO-DIRECTOR SI**:
- Cliente VIP o de alto valor
- Caso muy complejo (multi-skill)
- Riesgo reputacional elevado
- Presupuesto solicitado > $500M
- Asunto de prensa/visibilidad

## Flujo de Entrada

```
CLIENTE LLEGA
    ↓
CONTROL_ENTRADA:
├─ ¿Identificado? → SI/NO
├─ ¿Asunto claro? → SI/NO
├─ ¿Conflicto? → NO (O RECHAZO)
├─ ¿Confidencialidad OK? → SI
├─ ¿En alcance? → SI (O ESCALAR/RECHAZAR)
└─ ¿Urgencia? → DOCUMENTADA
    ↓
✅ APROBADO → INTAKE-001
❌ RECHAZADO → Comunicar cliente
⚠️ ESCALAR → SOCIO-DIRECTOR
```

## Responsable
**Especialista**: Gestor Control de Entrada

---

**Respuesta Máxima**: 24 horas desde presentación cliente
