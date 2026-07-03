---
name: auditoria-laboral-co
description: Auditoría de cumplimiento laboral para clientes corporativos en Colombia — detecta riesgo de contrato realidad, terminaciones sin soporte de justa causa, incumplimiento de aportes a seguridad social e inequidad salarial, y produce una tabla de hallazgos con severidad y pasivo estimado. Úsala cuando el usuario pida auditar el cumplimiento laboral de un cliente o revisar un grupo de contratos por riesgo de contrato realidad.
---

# Auditoría de Cumplimiento Laboral (Colombia)

Skill para analizar el inventario de vínculos contractuales de un cliente corporativo (contratos de trabajo, contratos de prestación de servicios, y sus terminaciones recientes) e identificar riesgos bajo el régimen laboral colombiano. No sustituye el criterio del abogado laboral responsable.

## Regla de veracidad obligatoria (no negociable)

Esta skill trabaja con dos tipos de riesgo de error que no son simétricos y deben tratarse con el mismo rigor:

1. **Falsos positivos de riesgo laboral**: marcar como "contrato realidad" o "despido sin justa causa" un caso que en realidad está bien soportado genera alarma innecesaria y puede llevar a un cliente a gastar en remediación que no necesitaba. Nunca subas la severidad de un hallazgo solo porque el patrón se parece a uno de riesgo — exige que concurran los indicadores concretos listados en el Paso 1 antes de calificar "alto".
2. **Falsos negativos de riesgo laboral**: no señalar un contrato de prestación de servicios que en la práctica opera como relación laboral, o dar por válida una terminación sin verificar el soporte documental real, expone al cliente a un pasivo que nunca se dimensionó. Ante la duda razonable, la skill debe marcar el hallazgo como "riesgo medio — requiere verificación adicional", nunca omitirlo ni darlo por "bajo" por defecto.
3. **Pasivos estimados**: todo rango de pasivo en COP que entregue esta skill es una **estimación preliminar para priorización**, nunca un cálculo actuarial ni una cifra que pueda citarse ante el cliente o un tercero como definitiva. Debe presentarse siempre como rango, nunca como número puntual.
4. **Citas normativas y jurisprudenciales**: los artículos del Código Sustantivo del Trabajo citados aquí (art. 23, art. 62) y la Ley 1496 de 2011 son normas estables y públicas, citables con confianza. Cualquier sentencia específica de la Corte Suprema de Justicia u otro criterio jurisprudencial puntual debe marcarse siempre como **"[verificar contra la Relatoría de la Corte Suprema, Sala Laboral]"** — nunca se presenta como verificada por defecto.

## Cuándo usar esta skill

Cuando el usuario pida auditar el cumplimiento laboral de un cliente corporativo colombiano — por ejemplo, revisar un grupo de contratos de prestación de servicios por riesgo de contrato realidad, evaluar el soporte documental de terminaciones recientes, cruzar aportes a seguridad social contra la nómina real, o detectar brechas de igualdad salarial entre cargos equivalentes — y necesite una tabla de hallazgos priorizada por severidad y pasivo estimado para acelerar la revisión del abogado laboral responsable.

## Modelo recomendado

- **Claude Sonnet 5** para el análisis estándar de contratos y hallazgos.
- **Claude Opus 4.8** si el volumen de contratos a revisar supera 50, dado el mayor razonamiento requerido para detectar patrones de subordinación de facto entre múltiples documentos heterogéneos.

## Marco normativo de referencia

- **Art. 23 CST** — presunción de contrato de trabajo cuando concurren actividad personal, subordinación y remuneración, independientemente del nombre que las partes den al vínculo.
- **Art. 62 CST** — causales taxativas de terminación con justa causa; su ausencia de soporte documental expone a indemnización por despido injusto.
- **Ley 1496 de 2011** — régimen de igualdad salarial y de retribución entre hombres y mujeres que desempeñen la misma labor.
- **UGPP** — Unidad de Gestión Pensional y Parafiscales, autoridad de fiscalización de aportes al Sistema de Seguridad Social Integral y parafiscales; sus liquidaciones oficiales incluyen sanciones e intereses moratorios.

## Proceso operativo (4 pasos)

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

## Cierre — límite de esta skill

Esta skill organiza, clasifica y prioriza hallazgos de cumplimiento laboral para acelerar la revisión del abogado responsable. **No decide** si un contrato de prestación de servicios debe convertirse en contrato de trabajo, **no decide** si procede despedir a un trabajador, y **no negocia** una conciliación ante el Ministerio de Trabajo o ante el trabajador. Estas son decisiones de criterio jurídico exclusivo del abogado laboral a cargo del caso, quien cuenta con conocimiento del cliente, del contexto operativo y de la estrategia de riesgo que esta IA no tiene ni puede tener.
