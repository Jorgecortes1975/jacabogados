---
name: auditoria-laboral-co
description: Auditoría de cumplimiento laboral para clientes corporativos en Colombia — detecta riesgo de contrato realidad, terminaciones sin soporte de justa causa, incumplimiento de aportes a seguridad social e inequidad salarial, y produce una tabla de hallazgos con severidad y pasivo estimado.
---

# Auditoría de Cumplimiento Laboral (Colombia)

Skill para analizar el inventario de vínculos contractuales de un cliente corporativo (contratos de trabajo, contratos de prestación de servicios, y sus terminaciones recientes) e identificar riesgos bajo el régimen laboral colombiano. No sustituye el criterio del abogado laboral responsable.

## Modelo recomendado

- **Claude Sonnet 5** para el análisis estándar de contratos y hallazgos.
- **Claude Opus 4.8** si el volumen de contratos a revisar supera 50, dado el mayor razonamiento requerido para detectar patrones de subordinación de facto entre múltiples documentos heterogéneos.

## Marco normativo de referencia

- **Art. 23 CST** — presunción de contrato de trabajo cuando concurren actividad personal, subordinación y remuneración, independientemente del nombre que las partes den al vínculo.
- **Art. 62 CST** — causales taxativas de terminación con justa causa; su ausencia de soporte documental expone a indemnización por despido injusto.
- **Ley 1496 de 2011** — régimen de igualdad salarial y de retribución entre hombres y mujeres que desempeñen la misma labor.
- **UGPP** — Unidad de Gestión Pensional y Parafiscales, autoridad de fiscalización de aportes al Sistema de Seguridad Social Integral y parafiscales; sus liquidaciones oficiales incluyen sanciones e intereses moratorios.

## Proceso de 4 pasos

### Paso 1 — Clasificación de vínculos y detección de subordinación de facto

Para cada contrato en el inventario:
1. Clasifícalo como contrato de trabajo (término fijo/indefinido) o contrato de prestación de servicios.
2. En los de prestación de servicios, busca indicadores de subordinación de facto que activarían la presunción del art. 23 CST:
   - Horario fijo o control de asistencia.
   - Exclusividad de facto (sin posibilidad real de atender otros clientes).
   - Uso de correo corporativo, herramientas o supervisión jerárquica del cliente.
   - Continuidad ininterrumpida por más de un año con renovaciones automáticas.
   - Asignación de funciones idénticas a las de un cargo de nómina existente.
3. Marca cada contrato de prestación de servicios con nivel de riesgo de "contrato realidad": alto, medio o bajo, según cuántos indicadores concurran.

### Paso 2 — Terminaciones recientes sin soporte de justa causa

1. Filtra las terminaciones ocurridas en el período de auditoría (recomendado: últimos 12 meses).
2. Para cada terminación invocada como "justa causa" (art. 62 CST), verifica si existe soporte documental contemporáneo: cartas de descargo, actas de proceso disciplinario, evidencia de la conducta imputada, notificación oportuna.
3. Si la terminación carece de soporte o el soporte es posterior a la fecha de desvinculación, márcala como riesgo de despido sin justa causa comprobada (pasivo: indemnización + posible reintegro si aplica fuero).

### Paso 3 — Consistencia de aportes a seguridad social e igualdad salarial

1. **Aportes**: cruza la nómina reportada con los aportes efectivamente pagados a salud, pensión, ARL y parafiscales. Señala inconsistencias en el IBC (ingreso base de cotización) declarado versus el salario real, pagos con mora, o períodos sin cobertura — todo esto es materia de fiscalización UGPP.
2. **Igualdad salarial**: agrupa cargos equivalentes por funciones, responsabilidades y condiciones de trabajo. Compara la remuneración entre empleados que ocupen el mismo cargo o uno sustancialmente igual. Señala brechas no justificadas por antigüedad, desempeño certificado o educación, conforme a la Ley 1496 de 2011.

### Paso 4 — Tabla de hallazgos con severidad y pasivo estimado

Consolida todos los hallazgos de los pasos 1-3 en una tabla única, ordenada por severidad descendente. Cada fila debe indicar el hallazgo, la norma aplicable, la severidad (alta/media/baja) y un rango de pasivo estimado (nunca una cifra puntual — es una estimación preliminar para priorización, no un cálculo actuarial).

## Ejemplo de tabla de hallazgos (caso ficticio: "Manufacturas del Cauca S.A.")

| # | Hallazgo | Norma aplicable | Severidad | Pasivo estimado (COP) |
|---|---|---|---|---|
| 1 | 8 contratos de prestación de servicios en el área de logística con horario fijo, correo corporativo y supervisión directa del jefe de bodega, vigentes hace más de 2 años | Art. 23 CST (contrato realidad) | Alta | $180.000.000 – $260.000.000 (prestaciones sociales retroactivas + aportes) |
| 2 | Terminación de 3 empleados por "bajo rendimiento" sin evaluaciones de desempeño ni carta de descargos previa | Art. 62 CST | Alta | $45.000.000 – $70.000.000 (indemnización por despido injusto) |
| 3 | IBC reportado a la UGPP por debajo del salario real en 14 empleados con auxilio de rodamiento no incluido en la base | Aportes parafiscales / UGPP | Media | $25.000.000 – $40.000.000 (más intereses moratorios) |
| 4 | Brecha salarial del 22% entre dos analistas financieros senior (mismo cargo, misma antigüedad) sin justificación objetiva documentada | Ley 1496 de 2011 | Media | $8.000.000 – $12.000.000 (nivelación retroactiva) |

Nota jurisprudencial: si el análisis cita una sentencia específica de la Corte Suprema de Justicia (por ejemplo, sobre los criterios de subordinación) que no ha sido verificada directamente contra la fuente oficial, debe marcarse explícitamente como **"[verificar contra la Relatoría de la Corte Suprema, Sala Laboral]"**. Nunca se presenta una cita jurisprudencial de ejemplo como verificada. Los artículos del Código Sustantivo del Trabajo citados en este documento sí son normas estables y públicas, y pueden citarse con confianza.

## Límites de esta skill

Esta skill organiza, clasifica y prioriza hallazgos de cumplimiento laboral para acelerar la revisión del abogado responsable. **No decide** si un contrato de prestación de servicios debe convertirse en contrato de trabajo, **no decide** si procede despedir a un trabajador, y **no negocia** una conciliación ante el Ministerio de Trabajo o ante el trabajador. Estas son decisiones de criterio jurídico exclusivo del abogado laboral a cargo del caso, quien cuenta con conocimiento del cliente, del contexto operativo y de la estrategia de riesgo que esta IA no tiene ni puede tener.
