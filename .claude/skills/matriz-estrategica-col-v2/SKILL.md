---
name: matriz-estrategica-col-v2
description: >
  Análisis de decisión, mapa de riesgos y viabilidad para decisiones jurídicas y
  empresariales de ABOGADOS ASOCIADOS J.A.C. y de sus clientes. Entrega una recomendación
  con posición tomada, la matriz ponderada que la sustenta, los riesgos priorizados y las
  condiciones que deben cumplirse. Activar ante: qué opción elijo, compara alternativas,
  analiza los riesgos, mapa de riesgos, matriz de decisión, cómo decidir, viabilidad,
  decide si demandamos, probabilidad de ganar, análisis costo-beneficio jurídico, plan
  estratégico. No estima probabilidades sin base declarada y no cita normas ni precedentes
  sin marcarlos para verificación.
---

# Matriz estratégica (v2)

Versión 2 de `matriz-estrategica-col`. Cambia el orden de salida, exige bases para cada
estimación y separa lo verificado de lo inferido. La metodología de matriz, mapa de riesgos
y viabilidad se conserva.

## 1. Propósito y regla de oro

Esta skill ayuda a decidir. Entrega una recomendación concreta. No entrega un análisis que
termine en "depende" sin decir de qué depende, qué lo inclinaría hacia cada lado y qué
decisión conviene tomar mientras tanto.

## 2. Modos

| Modo | Activar ante | Entrega |
|---|---|---|
| DECISIÓN | Elegir entre alternativas | Matriz ponderada y recomendación |
| RIESGOS | Mapa de riesgos | Riesgos priorizados y plan de mitigación |
| CASO JURÍDICO | Viabilidad de demandar, tutelar o recurrir | Viabilidad, costo-beneficio y condiciones |
| COMPLETO | Decisión compleja o pedido explícito | Los tres anteriores integrados |

Si el usuario no indica el modo, se elige el que corresponda a su pregunta y se declara en la primera línea.

## 3. Reglas de integridad

1. Etiquetas obligatorias en cada dato: [Acreditado] si consta en documento, [Afirmado] si lo aporta el usuario sin soporte, [Inferencia] si es deducción del análisis, [No verificado] si requiere fuente oficial.
2. Toda probabilidad de éxito va con [Inferencia] y con la base en que se apoya: hechos acreditados, precedente verificado o experiencia declarada. Sin base, se escribe "No estimable con la información disponible".
3. No inventar precedentes ni sentencias para sostener una recomendación. Un precedente se cita solo si se confirma su existencia, número, fecha y órgano en fuente oficial. Si no se confirma, se escribe [No verificado].
4. Toda norma citada lleva la advertencia de vigencia: [Verificar vigencia en fuente oficial].
5. No ocultar riesgos graves. Si la viabilidad es baja, se dice sin eufemismos.
6. Los pesos de la matriz suman 100 por ciento. Si no suman, no se entrega el puntaje.

## 4. Orden de salida (obligatorio)

1. Decisión recomendada en una línea, con la acción que debe ejecutarse esta semana.
2. Matriz ponderada (sección 5).
3. Condiciones para que la recomendación siga siendo válida.
4. Riesgo principal que la invalidaría.
5. Mapa de riesgos priorizado (sección 6).
6. Viabilidad jurídica, solo en modo CASO JURÍDICO o COMPLETO (sección 7).
7. Advertencias de validación: normas, precedentes, hechos y cifras pendientes de confirmar.

Estilo: español formal, frases cortas, voz activa. Sin asteriscos. Para enumerar, usar numeración o tablas, no viñetas con guion.

## 5. Matriz de decisión

Proceso:

1. Objetivo de la decisión en una línea.
2. Entre 2 y 5 alternativas.
3. Entre 5 y 8 criterios, con peso que sume 100.
4. Calificación de 1 a 5 por alternativa y criterio, con una frase de justificación en la tabla de soporte.
5. Puntaje ponderado.
6. Recomendación fundamentada. No es automáticamente la de mayor puntaje: si la alternativa líder tiene un riesgo crítico sin mitigación, se explica.

Criterios para decisiones jurídicas: viabilidad jurídica, probabilidad de éxito, costo, tiempo de resolución, riesgo probatorio, impacto en el cliente, exposición a defensa, alternativa negociada.

Criterios para decisiones empresariales: impacto en ingresos, costo de implementación, riesgo de ejecución, tiempo de retorno, riesgo regulatorio, reversibilidad.

Formato:

Objetivo de la decisión: una línea.
Contexto: máximo tres líneas.

| Criterio | Peso | Alternativa A | Alternativa B | Alternativa C |
|---|---|---|---|---|
| Criterio 1 | 20 % | 1 a 5 | 1 a 5 | 1 a 5 |
| Puntaje ponderado | 100 % | X,X | X,X | X,X |

Recomendación: opción y razones principales.
Condiciones: qué debe ser verdad para que la recomendación sea válida.
Riesgo principal: qué la haría incorrecta.

## 6. Mapa de riesgos

Categorías a revisar según el caso:

Riesgos jurídicos del caso: pérdida por fundamento o prueba, prescripción o caducidad, nulidades procesales, competencia mal determinada, falta de legitimación.

Riesgos jurídico-empresariales del cliente: laborales, tributarios, contractuales, societarios, regulatorios según el sector.

Riesgos propios de la firma: disciplinarios, conflicto de interés, vencimiento de términos, pérdida de cliente por calidad, responsabilidad civil profesional.

Escala de valoración:

| Probabilidad | Impacto | Nivel |
|---|---|---|
| Alta | Alto | CRÍTICO, atender hoy |
| Alta | Medio, o Media con impacto alto | ALTO, mitigación urgente |
| Media | Medio, o Baja con impacto alto | MEDIO, incluir en el plan |
| Baja | Bajo o Medio | BAJO, monitorear o aceptar |

Tabla:

| Riesgo | Probabilidad | Impacto | Nivel | Mitigación concreta | Responsable | Fecha de revisión |
|---|---|---|---|---|---|---|

Cada riesgo CRÍTICO o ALTO tiene responsable único y fecha. Los riesgos aceptados llevan la razón de la aceptación.

## 7. Viabilidad jurídica (modo CASO JURÍDICO o COMPLETO)

Conclusión: procede, no procede o procede con condiciones.
Nivel de confianza: alto, medio o bajo, con la razón.

Fundamento:
Norma principal: ley y artículo, con advertencia de vigencia.
Jurisprudencia relevante: solo si se verificó existencia, número, fecha y órgano; si no, [No verificado].
Obstáculos normativos identificados.

Análisis probatorio:
Pruebas disponibles, cada una con [Acreditado] o [Afirmado].
Pruebas críticas faltantes.
Fortaleza probatoria general: alta, media o baja.

Costo-beneficio:
Beneficio esperado en caso de éxito, cuantificado solo si hay cifras.
Costo aproximado: honorarios, costas, peritos y tiempo.
Probabilidad de éxito: con [Inferencia] y su base.
Valor esperado: beneficio por probabilidad, menos costo. Solo se calcula si ambas cifras tienen base.
Alternativa negociada: existe, no existe, o conviene explorarla.

Recomendación final: concreta y no ambigua.
Condiciones para proceder: lista de lo que debe confirmarse antes de iniciar.

## 8. Integración con el ecosistema

Las skills del repositorio y del listado que pueden seguir a esta:
`analisis-empresarial-col-v2` o `analisis-empresarial-col` para el diagnóstico previo.
`lexa-mercantil-col` para riesgos jurídico-mercantiles.
`ecosistema-juridico-col` para producir la estrategia elegida.
`anti-hallucination-v3` para certificar antes de presentar al cliente.
La validación final la hace el abogado responsable, no la skill.

## 9. Cierre

Cerrar con: decisión a tomar, quién la toma, en qué plazo y qué información falta para tomarla con certeza.
