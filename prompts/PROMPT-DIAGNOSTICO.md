# PROMPT — DIAGNÓSTICO AUTOMÁTICO

Úsalo para generar un diagnóstico completo en base a documentos del cliente.

---

## CÓPIALO Y PÉGALO EN CLAUDE

```
Voy a hacer un diagnóstico de cumplimiento normativo de un cliente. 
Lee CLAUDE.md y la normativa base (CST-RESUMEN.md y LEY-100-RESUMEN.md) antes de empezar.

**Empresa**: [NOMBRE]
**Decisor**: [NOMBRE]
**Empleados**: [CANTIDAD]

Te voy a pasar:
1. Nómina actual (últimos 2 meses)
2. Copias de contratos (si existen)
3. Constancias de afiliación EPS/AFP/ARL/Caja (si existen)
4. Reporte SUI (si existe)

Mi tarea para ti:
1. REVISA cada documento contra normativa (CST Art. 200-203, Ley 100, Decreto 1072)
2. IDENTIFICA hallazgos en 3 categorías:
   - 🔴 CRÍTICO (< 30 días): Riesgos inmediatos, multas potenciales
   - 🟡 MODERADO (30-90 días): Mejoras importantes
   - 🟢 BAJO (90+ días): Optimizaciones

3. PARA CADA HALLAZGO, especifica:
   - Qué está mal
   - Artículo/normativa que se incumple
   - Riesgo legal (multa, demanda, etc.)
   - Acción correctiva concreta
   - Costo aproximado

4. GENERA archivo markdown 02-DIAGNOSTICO.md con estructura:
   - Resumen ejecutivo
   - Área 1: Seguridad Social (Afiliación, Cotización, SUI)
   - Área 2: Derecho Laboral (Contratos, Jornada, Prestaciones)
   - Área 3: Políticas y Capacitación
   - Hallazgos detallados (CRÍTICO, MODERADO, BAJO)
   - Recomendaciones iniciales

NO inventes datos. Si falta información, marca "s/d" (sin dato) y pide al cliente.

Cuando termines, pasa el markdown para copiar/pegar.
```

---

## DOCUMENTOS QUE NECESITAS DEL CLIENTE

1. **Nómina últimos 2 meses** (archivo Excel o PDF)
   - Salarios
   - Descuentos (EPS, AFP, otros)
   - Auxilio transporte
   - Bonificaciones

2. **Contratos vigentes** (copias de empleados actuales)
   - Tipo (indefinido, fijo, obra)
   - Cargo
   - Salario
   - Fechas

3. **Constancias de afiliación** (de cada empleado):
   - EPS: Certificado de afiliación
   - AFP: Certificado de afiliación
   - ARL: Póliza vigente
   - Caja: Comprobante de afiliación

4. **Reporte SUI** (si existe):
   - Últimas novedades de ingresos/retiros
   - Nómina reportada vs. nómina real

5. **Políticas internas** (si existen):
   - Reglamento
   - Política de acoso laboral
   - Manual de convivencia

---

## OUTPUT ESPERADO

Un archivo markdown con:
- Tabla resumen de hallazgos por urgencia
- Análisis detallado de cada área
- Citación de normativa específica
- Estimación de riesgos
- Acciones correctivas

Ejemplo de hallazgo crítico:

```
🔴 CRÍTICO: 3 empleados sin afiliación a EPS

**Normativa**: Art. 200-201 CST
**Riesgo**: Multa desde 1 UVT por empleado (2026: $45.000) = $135.000
**Acción**: Diligenciar formulario de afiliación + enviar a EPS dentro de 5 días
**Costo**: $0 (solo tramite)
```

---

**Uso**: Después del Intake, pide al cliente los documentos y corre este prompt.
