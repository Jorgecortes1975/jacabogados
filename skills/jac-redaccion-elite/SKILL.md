---
name: jac-redaccion-elite
description: Comando único de redacción jurídica de alta calidad para derecho colombiano. Integra el protocolo JAC Gauntlet Elite, los controles automáticos de citas, las skills de redacción y de litigio disponibles y la revisión adversarial en un solo flujo, con estado final BLOCKED, CONDITIONAL o PASS. Usar cuando el usuario escriba /JAC-REDACCION-ELITE o pida redactar una demanda, tutela, recurso, contestación, contrato, concepto o memorial de importancia con control de calidad completo.
---

# JAC Redacción Elite

Este skill es el punto de entrada único para redactar. No reemplaza los skills que integra: ordena su uso y exige el control final. Derecho aplicable: colombiano.

Lo que este flujo garantiza es la verificación de lo verificable: existencia de citas de la Corte Constitucional, existencia y fecha de normas del catálogo, cálculos reproducibles y ausencia de relleno. No garantiza vigencia de normas, hechos, pruebas, términos ni la estrategia. Esa decisión corresponde al abogado responsable.

## Fase 0. Activación y delimitación (Matter Lock)

1. Confirme el producto exacto: tipo de escrito, despacho o autoridad destinataria, partes, radicado, jurisdicción y especialidad.
2. Fije la fecha de referencia. Todo término, interés o cálculo se deriva de ella y nunca de la fecha implícita de hoy.
3. Fije el asunto. No incorpore hechos ni documentos de otros asuntos. Si el usuario mezcla expedientes, sepárelos antes de continuar.
4. Si hay una carpeta de expediente, ejecute `python3 -m jac inventario <carpeta>`. Identifique cada documento por su contenido y no declare revisado el expediente mientras quede algún archivo sin leer.
5. Si faltan datos indispensables, márquelos PENDIENTE DE VERIFICACIÓN y pida solo los que cambien el resultado. No decida por su cuenta una ambigüedad jurídica determinante.

## Fase 1. Selección de skills de redacción

Use las skills que estén disponibles en el entorno. Si una no está instalada, anótelo en el control final y continúe con las demás.

1. Redacción base: redactor-juridico-col o escritos-colombianos para la estructura formal; artefactos-juridicos-lexa para piezas del ecosistema Lexa.
2. Litigio: demand-draft o litigation-legal:demand-draft para demandas; litigation-legal:brief-section-drafter para secciones de un escrito. Para tipos concretos, use la skill lit-* correspondiente de litigacion-colombia (por ejemplo lit-civil-demanda-verbal, lit-laboral-demanda-ordinaria, lit-const-tutela, lit-ca-nulidad-restablecimiento, lit-penal-recursos-apelacion-casacion).
3. Contratos y documentos corporativos: playbook-contratos-col, commercial-legal:review, corporate-legal:board-minutes o corporate-legal:written-consent, según el caso.
4. Estilo: humanizar-la-escritura solo al final de la Fase 4, después de que las citas y los hechos estén verificados. Nunca antes.

## Fase 2. Producción

1. Redacte la versión inicial con la estructura formal del tipo de escrito: identificación, competencia, legitimación, hechos numerados, fundamentos, pretensiones, pruebas y anexos.
2. Cada hecho determinante enlaza la prueba que lo respalda. Un hecho sin prueba se marca PENDIENTE DE VERIFICACIÓN.
3. Cada cita de jurisprudencia incluye órgano, número, fecha y regla. Distinga ratio decidendi de obiter dicta. Si no puede confirmar alguno de estos datos, no cite la providencia.
4. Cada norma se cita con nombre completo, número, año y artículo. Su vigencia queda en estado VIGENCIA_NO_DETERMINADA hasta que el abogado la confirme en fuente oficial.
5. No entregue esta versión. Pase a la Fase 3.

## Fase 3. Controles automáticos

1. Guarde el texto en un archivo .md o .docx dentro de la carpeta de trabajo.
2. Ejecute `python3 -m jac validar <archivo> --radicado <radicado> --json ronda1.json`. Si el radicado no está fijado, omita el parámetro y declare que el control de radicado ajeno no se ejecutó.
3. Ejecute `python3 -m jac consulta "<texto con las citas>"` para verificar de forma independiente las citas de jurisprudencia y de normas. Use el resultado sin modificarlo. Una cita no encontrada no se da por inexistente si la fuente no respondió.
4. Clasifique cada hallazgo como crítico (cita inexistente o discrepante, error procesal, fecha imposible, contradicción sustancial, error de cálculo), mayor (requisito formal, anexo faltante, hecho sin prueba) o menor (estilo, redundancia).
5. Si no puede ejecutar código, aplique el procedimiento manual del skill jac-agente y declárelo en el control final.

## Fase 4. Revisión adversarial y corrección

1. Invoque el agente jac-revisor con la herramienta Agent. Entréguele únicamente el documento, sus fuentes y el informe de la Fase 3. Nunca entregue el razonamiento del productor. El revisor debe comparar el texto contra los documentos originales y no contra el resumen que usted hizo.
2. Si está instalado el plugin croma-jac, puede sumar croma-revisar y croma-release como segunda revisión. Si no, declare que la revisión es interna y no independiente.
3. Corrija los hallazgos críticos y mayores. Corrija los menores solo si no alteran el sentido.
4. Revalide con `python3 -m jac validar <archivo> --radicado <radicado> --previo ronda1.json --json ronda2.json`. Revise solo lo afectado.
5. Ejecute auditoria-pre-radicacion-col o auditor-redaccion-col como control previo a la radicación, si están instalados.
6. Límite: dos rondas. Una tercera solo si quedan fallos críticos corregibles. Registre solo las rondas efectivamente realizadas.
7. Aplique humanizar-la-escritura al final, sin cambiar citas, cifras, fechas ni pretensiones.

## Fase 5. Estado final

1. BLOCKED: hay al menos una cita inexistente o discrepante, un error procesal crítico, una fecha imposible, una contradicción sustancial o un error de cálculo material. No apto para firma ni radicación.
2. CONDITIONAL: no hay fallos críticos abiertos, pero quedan verificaciones pendientes, como vigencia de normas o datos de hechos. No apto para firma ni radicación hasta cerrarlas.
3. PASS: todos los controles exigibles se superaron y el abogado responsable hizo la revisión final. PASS_AUTOMATICO de la herramienta nunca equivale a PASS.

## Fase 6. Entrega

Entregue el documento completo y utilizable, con los datos faltantes marcados PENDIENTE DE VERIFICACIÓN, y un control final con este contenido:

1. Estado: BLOCKED, CONDITIONAL o PASS, con la razón.
2. Fuentes efectivamente consultadas y fuentes que no respondieron o no tienen conector.
3. Rondas realizadas y hallazgos resueltos, nuevos y persistentes.
4. Si la revisión fue independiente o interna.
5. Skills que no estaban disponibles.
6. Pendientes y riesgos que requieren decisión del abogado: vigencia de normas, hechos no probados, términos y estrategia.

## Reglas permanentes

No invente hechos, normas, sentencias, radicados, fechas, cifras, enlaces ni nombres de magistrados. No prometa porcentajes de exactitud. No elogie el borrador en la revisión. No presente como verificado lo que no abrió en fuente oficial. Este flujo no sustituye la firma ni la responsabilidad profesional del abogado.
