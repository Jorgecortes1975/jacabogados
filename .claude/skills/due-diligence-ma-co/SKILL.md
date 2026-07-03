---
name: due-diligence-ma-co
description: Orquesta revisores paralelos (laboral, tributario, societario, adversarial) sobre un cuarto de datos de M&A en Colombia y consolida los hallazgos en una matriz única de riesgos con severidad y fuente normativa. Úsese al iniciar o consolidar una due diligence legal previa al cierre de una adquisición o fusión.
---

# Due Diligence M&A Colombia — Orquestador Multi-Revisor

## Regla de seguridad (no negociable)

1. **Jurisprudencia**: nunca marques una cita jurisprudencial específica (número de sentencia) como "verificada" o "confirmada", salvo que sea un fallo estructural universalmente conocido (ej. T-760 de 2008 sobre salud). Cualquier otra sentencia citada como ejemplo debe llevar el marcador **"[verificar contra la Relatoría antes de usar]"**.
2. **Artículos de código**: solo se citan con plena confianza los que son de conocimiento general muy asentado en la práctica colombiana (ej. art. 23 CST, art. 1324 C.Co sobre agencia comercial). Cualquier otro número de artículo específico —sobre todo si mezcla materias (penal, tributario, administrativo) o define plazos y procedimientos puntuales— debe llevar el marcador **"[confirmar código y numeración exacta]"**, incluso si el modelo muestra alta confianza aparente. Un artículo atribuido al código equivocado (p. ej. una norma penal citada como si fuera tributaria) es un error real, no una hipótesis: verifícalo siempre antes de usarlo en un informe al comité de inversión.

## Proceso operativo (5 pasos)

**1. Segmentar el cuarto de datos.** Clasifica los documentos en categorías fijas: laboral, tributario, societario/corporativo, contratos comerciales, litigios, propiedad intelectual, ambiental/regulatorio. No mezclar categorías en un mismo revisor.

**2. Asignar un revisor por categoría (modelo: Claude Sonnet 5).** Cada revisor recibe únicamente su categoría y el prompt de rol siguiente:

> "Eres el revisor de [CATEGORÍA] en una due diligence de M&A colombiana. Analiza únicamente los documentos de esta categoría. Para cada hallazgo relevante produce: (a) descripción del hecho, (b) por qué es un riesgo para el comprador, (c) severidad 1 (bajo) / 2 (medio) / 3 (alto) según el marco de niveles de riesgo del despacho, (d) fuente normativa exacta (artículo de código o norma estable). Si citas jurisprudencia específica, agrégale el marcador [verificar contra la Relatoría antes de usar] — nunca la des por confirmada. No opines sobre el precio ni sobre si la operación debe cerrarse. Entrega en formato de lista, un hallazgo por ítem."

Ejemplo del revisor laboral: buscar indicios de tercerización que active la presunción de contrato laboral del art. 23 del Código Sustantivo del Trabajo, o brechas en aportes parafiscales fiscalizables por la UGPP.

**3. Ejecutar el pase adversarial (modelo: Claude Opus 4.8).** Un único revisor adicional recibe **todos** los hallazgos de los revisores anteriores más el cuarto de datos completo, con este prompt:

> "Eres el revisor adversarial. Tu único mandato es refutar y encontrar lo que los demás omitieron. Para cada hallazgo de los otros revisores: (a) evalúa si la severidad asignada es razonable o si debe subirse/bajarse, (b) señala si la fuente normativa citada realmente sostiene la conclusión, (c) marca cualquier cita jurisprudencial no verificada. Adicionalmente, revisa el cuarto de datos completo buscando categorías de riesgo que ningún revisor cubrió (ej. contingencias cruzadas entre tributario y societario, cláusulas de cambio de control no detectadas, pasivos ambientales no clasificados). No suavices ni valides por cortesía: tu valor está en encontrar lo que falta o está mal calificado. No opines sobre precio ni sobre cierre de la operación."

**4. Consolidar en matriz de riesgos única (modelo: Claude Opus 4.8).** Columnas fijas, sin variación: **Hallazgo | Severidad (1-3) | Fuente normativa | Nota adversarial**. La columna "Nota adversarial" siempre existe, incluso si dice "sin objeción del revisor adversarial" — nunca se omite ni se deja vacía.

**5. Entregar recomendación de estructura de cierre — solo como insumo.** A partir de la matriz, sugiere mecanismos de mitigación (escrow, condiciones suspensivas, ajustes de precio, indemnidades específicas) ligados a los hallazgos de severidad 2 y 3. Esta recomendación se entrega marcada explícitamente como **insumo para discusión**, nunca como decisión.

## Mini-ejemplo de matriz de salida

| Hallazgo | Severidad | Fuente normativa | Nota adversarial |
|---|---|---|---|
| 40% de la planta de producción de la target opera bajo contratos de prestación de servicios con exclusividad y subordinación de facto | 3 | Art. 23, Código Sustantivo del Trabajo (presunción de contrato realidad) | Confirmado y agravado: el volumen (40%, no un caso aislado) sugiere exposición sistémica de la UGPP, no solo laboral individual |
| Créditos fiscales por IVA descontable de 2022-2023 sin soporte documental completo en el 30% de las facturas revisadas | 2 | Arts. 488 y 771-2, Estatuto Tributario [confirmar numeración vigente] | Severidad debe subir a 3: la DIAN tiene término de firmeza abierto hasta 2027 sobre esas vigencias |
| Retenciones en la fuente practicadas y no consignadas en 2 periodos de 2024 detectadas en la conciliación de tesorería | 3 | Omisión del agente retenedor: **Código Penal** (Ley 599 de 2000), no el Estatuto Tributario — este tipo de conducta suele confundirse de código; **[confirmar numeración exacta del artículo vigente]** | Hallazgo crítico: expone a los representantes legales de la época a responsabilidad penal individual, no solo a la sociedad — puede afectar cláusulas de indemnidad del vendedor |
| Estatutos sociales no actualizados tras la última reforma de capital de 2021 | 1 | Art. 158, Código de Comercio | Sin objeción; riesgo menor y subsanable antes del cierre |
| Cláusula de cambio de control en contrato de distribución exclusiva, no identificada por el revisor de contratos comerciales | 2 | N/A (cláusula contractual, no norma legal) | Hallazgo aportado en el pase adversarial — el revisor original no cubrió cambio de control |

## Cierre

Esta skill nunca decide si la operación se cierra, ni el precio, ni la estructura definitiva de mitigación. Consolida evidencia y genera insumos verificables. La decisión final es exclusiva del comité de inversión y sus abogados externos.
