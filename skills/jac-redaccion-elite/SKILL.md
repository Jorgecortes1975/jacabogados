---
name: jac-redaccion-elite
description: Comando único de redacción jurídica de alta calidad para derecho colombiano, desde un concepto hasta el proyecto de sentencia de una alta corte. Integra el protocolo JAC Gauntlet Elite, los controles automáticos de citas, las skills de redacción y litigio disponibles, técnicas de argumentación y la revisión adversarial en un solo flujo, con estado final BLOCKED, CONDITIONAL o PASS. Usar cuando el usuario escriba /JAC-REDACCION-ELITE o pida redactar, revisar o estructurar cualquier documento jurídico de importancia.
---

# JAC Redacción Elite

Este skill es el punto de entrada único para redactar. No reemplaza los skills que integra: ordena su uso, aplica técnicas de argumentación y exige el control final. Derecho aplicable: colombiano.

Lo que este flujo garantiza es la verificación de lo verificable: existencia de citas de la Corte Constitucional, existencia y fecha de normas del catálogo, cálculos reproducibles y ausencia de relleno. No garantiza vigencia de normas, hechos, pruebas, términos, ni la estrategia. Esa decisión corresponde al abogado responsable. Ninguna técnica de redacción garantiza un resultado procesal.

## Fase 0. Activación y delimitación (Matter Lock)

1. Confirme el producto exacto: tipo de documento (véase el catálogo de la Fase 1), autoridad o despacho destinatario, partes, radicado, jurisdicción y especialidad.
2. Fije la fecha de referencia. Todo término, interés o cálculo se deriva de ella y nunca de la fecha implícita de hoy.
3. Fije el asunto. No incorpore hechos ni documentos de otros asuntos. Si el usuario mezcla expedientes, sepárelos antes de continuar.
4. Si hay una carpeta de expediente, ejecute `python3 -m jac inventario <carpeta>`. Identifique cada documento por su contenido y no declare revisado el expediente mientras quede algún archivo sin leer.
5. Si faltan datos indispensables, márquelos PENDIENTE DE VERIFICACIÓN y pida solo los que cambien el resultado. No decida por su cuenta una ambigüedad jurídica determinante.
6. Antes de redactar para un tribunal o alta corte, lea `referencias-tribunales.md` en esta carpeta. Indica qué comprobar en cada jurisdicción y qué normas están confirmadas en el catálogo y cuáles no.

## Fase 1. Catálogo de documentos y skills de apoyo

Use las skills que estén disponibles en el entorno. Si una no está instalada, anótelo en el control final y continúe con las demás.

1. Concepto jurídico: redactor-juridico-col, matriz-estrategica-col y subsuncion-juridica-col. El concepto responde una pregunta concreta, con hechos, norma, análisis y conclusión.
2. Derecho de petición y comunicaciones: escritos-colombianos. Pretensión clara, plazo y fundamento verificable.
3. Poderes, contratos y actas: playbook-contratos-col, hoja-encargo-col, commercial-legal:review, corporate-legal:board-minutes y corporate-legal:written-consent.
4. Demanda ordinaria: demand-draft, litigation-legal:demand-draft y demandas-civiles-col. Para tipos concretos, use la skill lit-* correspondiente de litigacion-colombia (por ejemplo lit-civil-demanda-verbal o lit-laboral-demanda-ordinaria).
5. Demanda ante la jurisdicción contencioso-administrativa: lit-ca-* de litigacion-colombia (nulidad, nulidad y restablecimiento, reparación directa, controversias contractuales).
6. Tutela y acción de cumplimiento: lit-const-tutela, lit-const-tutela-salud-eps, lit-const-tutela-contra-providencia, lit-const-cumplimiento-desacato.
7. Contestación, excepciones y reconvención: lit-civil-contestacion-reconvencion, lit-civil-excepciones-previas, lit-civil-excepciones-ejecutivo.
8. Recursos y casación: lit-civil-recursos-ordinarios, lit-civil-casacion, lit-laboral-casacion, lit-penal-recursos-apelacion-casacion, lit-ca-recursos-apelacion-queja-suplica.
9. Alegatos y audiencias: litigation-legal:brief-section-drafter, lit-laboral-alegatos-minimo-decisorio, lit-ca-alegatos-disciplinario, lit-civil-audiencias-372-373.
10. Proyecto de sentencia y análisis de providencias de alta corte: anthropic-skills:jurisprudencia-col, subsuncion-juridica-col y investigacion-juridica-col. Sirven para estructurar la decisión y analizar precedentes; no reemplazan la relatoría oficial.
11. Estilo: humanizar-la-escritura solo en la Fase 4, después de que las citas y los hechos estén verificados.

## Fase 2. Producción con técnicas de argumentación

Aplique estas técnicas en todo documento. Cada una tiene un criterio de comprobación que el control final debe revisar.

1. Tesis antes de desarrollo. Enuncie en una frase la conclusión que el documento sostiene. Comprobación: la tesis aparece en el primer párrafo sustantivo y coincide con la pretensión o la conclusión final.
2. Estructura de argumento. Cada argumento sigue el orden: premisa normativa, premisa fáctica, subsunción, conclusión parcial y, si aplica, respuesta anticipada a la objeción más fuerte. Comprobación: ningún argumento queda sin una de estas partes cuando el documento lo exige.
3. Jerarquía de hechos. Los hechos van numerados, en orden cronológico y con una sola idea por numeral. Cada hecho determinante enlaza su prueba. Un hecho sin prueba se marca PENDIENTE DE VERIFICACIÓN. Comprobación: ningún hecho determinante queda sin prueba o marcado.
4. Precedentes con método. Cada providencia se cita con órgano, sala, número, fecha y regla. Distinga ratio decidendi de obiter dicta y explique por qué el caso es análogo o diferente. No cite una providencia si no puede confirmar esos datos. Comprobación: ninguna providencia figura sin fuente verificable.
5. Normas con precisión. Cada norma se cita con nombre completo, número, año y artículo. Su vigencia queda en VIGENCIA_NO_DETERMINADA hasta que el abogado la confirme en fuente oficial.
6. Pretensiones medibles. Cada pretensión es concreta, ejecutable y coherente con los hechos. Comprobación: ninguna pretensión depende de un hecho no probado o de una norma no verificada.
7. Contraargumentación explícita. Anticipe la objeción más fuerte de la contraparte o del juez y respóndala con fuente. Comprobación: existe al menos una respuesta a la objeción principal en los escritos de parte y en los conceptos.
8. Economía de palabras. Elimine repetición, adjetivación sin función y lenguaje decorativo. Comprobación: cada párrafo aporta una idea o una prueba.
9. Coherencia entre piezas. Hechos, fundamentos y pretensiones no pueden contradecir las pruebas ni las fechas del inventario documental. Comprobación: el control de contradicciones no reporta hallazgos.
10. Esquema argumentativo. Cada argumento se reconstruye como uno de los 40 esquemas de `anexo-argumentos.md`, con premisas explícitas y conclusión marcada como necesaria o plausible. Comprobación: cada argumento del escrito indica su número de esquema y cada premisa tiene su fuente.
11. Estructura de sentencia de alta corte. Para proyectos de decisión: antecedentes, problema jurídico, consideraciones con precedente y análisis del caso, decisión y, si aplica, salvamentos o aclaraciones. El requisito formal de cada elemento debe verificarse en la norma aplicable; si no se verifica, queda PENDIENTE DE VERIFICACIÓN.

Use estas técnicas en el orden de la Fase 1 y no las aplique como plantilla rígida. Si el tipo de documento exige una estructura legal específica, esa estructura prevalece.

## Fase 3. Controles automáticos

1. Guarde el texto en un archivo .md o .docx dentro de la carpeta de trabajo.
2. Ejecute `python3 -m jac validar <archivo> --radicado <radicado> --json ronda1.json`. Si el radicado no está fijado, omita el parámetro y declare que el control de radicado ajeno no se ejecutó.
3. Ejecute `python3 -m jac consulta "<texto con las citas>"` para verificar de forma independiente las citas. Use el resultado sin modificarlo. Una cita no encontrada no se da por inexistente si la fuente no respondió.
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
2. CONDITIONAL: no hay fallos críticos abiertos, pero quedan verificaciones pendientes, como vigencia de normas, requisitos formales no verificados o datos de hechos. No apto para firma ni radicación hasta cerrarlas.
3. PASS: todos los controles exigibles se superaron y el abogado responsable hizo la revisión final. PASS_AUTOMATICO de la herramienta nunca equivale a PASS.

## Fase 6. Entrega

Entregue el documento completo y utilizable, con los datos faltantes marcados PENDIENTE DE VERIFICACIÓN, y un control final con este contenido:

1. Estado: BLOCKED, CONDITIONAL o PASS, con la razón.
2. Fuentes efectivamente consultadas y fuentes que no respondieron o no tienen conector. Las altas cortes distintas de la Corte Constitucional quedan PENDIENTES hasta que exista un conector.
3. Rondas realizadas y hallazgos resueltos, nuevos y persistentes.
4. Si la revisión fue independiente o interna.
5. Skills que no estaban disponibles.
6. Pendientes y riesgos que requieren decisión del abogado: vigencia de normas, requisitos formales no verificados, hechos no probados, términos y estrategia.

## Anexo de argumentos

Los 40 esquemas argumentativos del anexo están en `anexo-argumentos.md`, en esta carpeta. Son 20 esquemas generales y probatorios y 20 de interpretación normativa, con premisas, conclusión y lista de comprobación. Su fuente es un documento de formación (Prof. Luis Alfonso Malavé Naime), no normativa ni jurisprudencia. Sus ejemplos extranjeros no se citan como derecho colombiano.

Regla de uso en la Fase 2: cada argumento del escrito debe reconstruirse como uno de los 40 esquemas. Si ninguno encaja, el argumento no está listo. Los esquemas presuntivos se marcan con "plausiblemente" y anticipan su objeción. El control final revisa la lista de comprobación del anexo.

## Reglas permanentes

No invente hechos, normas, sentencias, radicados, fechas, cifras, enlaces ni nombres de magistrados. No prometa porcentajes de exactitud ni resultados procesales. No elogie el borrador en la revisión. No presente como verificado lo que no abrió en fuente oficial. Este flujo no sustituye la firma ni la responsabilidad profesional del abogado.
