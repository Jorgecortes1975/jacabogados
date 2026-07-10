# PROMPT — RECOMENDACIONES Y PLAN DE ACCIÓN

Úsalo después del diagnóstico para convertir hallazgos en plan de implementación.

---

## CÓPIALO Y PÉGALO EN CLAUDE

```
Tengo el diagnóstico completo de [EMPRESA]. Ahora necesito convertirlo en 
un PLAN DE ACCIÓN detallado con timeline y costo.

**Empresa**: [NOMBRE]
**Presupuesto cliente**: [APROX, o "por confirmar"]

Lee los documentos:
- CLAUDE.md
- 02-DIAGNOSTICO.md de este cliente
- Templates de contratos, reglamento, política

Tu tarea:

1. CONVIERTE cada hallazgo CRÍTICO en una acción concreta:
   Hallazgo: "3 empleados sin EPS"
   → Acción: "Diligenciar formulario de afiliación + enviar EPS"
   
2. PARA CADA ACCIÓN, especifica:
   - Descripción exacta (qué se hace)
   - Documentos/templates necesarios (si los hay)
   - Costo aproximado (si hay costo)
   - Timeline (día 1, día 3, día 7, etc.)
   - Responsable (empresa o JA Abogados)
   - Evidencia de cumplimiento (qué valida que se hizo)

3. GENERA TIMELINE:
   - Semana 1: Acciones urgentes (críticas)
   - Semana 2-3: Acciones importantes (moderadas)
   - Mes 2: Optimizaciones (bajas)

4. ESTIMA PRESUPUESTO TOTAL:
   - Servicio JA Abogados: Honorarios por cada acción
   - Trámites: Costos administrativos
   - Implementación: Costos por empleado o sistema

5. GENERA markdown 03-RECOMENDACIONES.md con:
   - Resumen ejecutivo (1 página)
   - Plan de acción (tabla: Acción | Urgencia | Timeline | Costo)
   - Detalle de cada acción
   - Timeline visual (Gantt o calendario)
   - Presupuesto desglosado
   - Próximos pasos

NO seas genérico. Sé específico: "Redactar nuevo contrato a término indefinido 
para empleado Juan" (no "redactar contratos")

Cuando termines, pasa el markdown para copiar/pegar.
```

---

## ESTRUCTURA DE COSTO

Típicamente:

| Acción | Costo Ejemplo |
|--------|---------------|
| Afiliación a EPS/AFP/ARL/Caja | $0 (tramite) |
| Redacción de contrato nuevo | $50-100k |
| Adenda de modificación | $30-50k |
| Redacción de reglamento interno | $200-300k |
| Política de acoso laboral | $100-150k |
| Asesoría en cambio salarial | $50-100k |
| Capacitación en cumplimiento | $300-500k |

**Nota**: Precios ejemplo. Varían según complejidad y cantidad de empleados.

---

## TIMELINE TÍPICO

- **Día 1-3**: Diagnóstico, presentación a cliente
- **Día 4-7**: Afiliaciones de faltantes, trámites urgentes
- **Semana 2**: Redacción de contratos nuevos/adendas
- **Semana 3**: Redacción de políticas
- **Semana 4**: Capacitación y comunicación a empleados
- **Mes 2**: Seguimiento de cumplimiento

---

**Uso**: Después de validar diagnóstico con cliente, corre este prompt.
