---
name: jac-redaccion-elite
description: Comando único de redacción jurídica para derecho colombiano, desde un concepto hasta el proyecto de sentencia de una alta corte. Integra el protocolo JAC Gauntlet Elite, los controles automáticos de citas, las skills de redacción y litigio disponibles, 40 esquemas argumentativos y la revisión adversarial, con estado final BLOCKED, CONDITIONAL o PASS. Usar cuando el usuario escriba /JAC-REDACCION-ELITE, /jac-legal-os:jac-redaccion-elite o pida redactar, revisar o estructurar un documento jurídico de importancia.
---

# JAC Redacción Elite

Este skill ordena la redacción jurídica en seis fases y exige un control final. No reemplaza las skills que integra ni la responsabilidad profesional del abogado. Derecho aplicable: colombiano.

## Qué verifica y qué no

Verifica de forma automática: la existencia de citas de la Corte Constitucional cuando la relatoría responde; la existencia y la fecha de expedición de las normas del catálogo de Función Pública; la coherencia de fechas, radicados y cálculos; y la ausencia de relleno pendiente.

No verifica: la vigencia de normas; el texto de los artículos; los requisitos procesales de cada tribunal; los hechos y las pruebas; los términos; y la estrategia. Tampoco garantiza un resultado procesal. Las citas de la Corte Suprema, del Consejo de Estado y de otras altas cortes quedan PENDIENTES DE VERIFICACIÓN hasta que exista un conector.

## Fase 0. Activación y delimitación (Matter Lock)

1. Confirme el producto: tipo de documento (véase la Fase 1), autoridad o despacho destinatario, partes, radicado, jurisdicción y especialidad.
2. Fije la fecha de referencia, en formato AAAA-MM-DD. Todo término, interés o cálculo se deriva de ella y nunca de la fecha implícita de hoy. Use esa misma fecha en `--fecha-ref`.
3. Fije el asunto. No incorpore hechos ni documentos de otros asuntos. Si el usuario mezcla expedientes, sepárelos antes de continuar.
4. Si hay una carpeta de expediente, ejecute `python3 -m jac inventario <carpeta>`. Identifique cada documento por su contenido. No declare revisado el expediente mientras quede algún archivo sin leer.
5. Si faltan datos indispensables, márquelos PENDIENTE DE VERIFICACIÓN y pida solo los que cambien el resultado. No decida por su cuenta una ambigüedad jurídica determinante.
6. Antes de redactar para un tribunal o alta corte, lea `referencias-tribunales.md`. Indica qué comprobar en cada jurisdicción y qué normas están confirmadas en el catálogo.

## Fase 1. Catálogo de documentos y skills de apoyo

Use las skills que estén instaladas en el entorno. Si una no está, anótelo en el control final y continúe con las demás. Los nombres siguientes son referencias a skills de otros plugins; no se ejecutan desde este repositorio.

1. Concepto jurídico: redactor-juridico-col, matriz-estrategica-col y subsuncion-juridica-col. El concepto responde una pregunta concreta, con hechos, norma, análisis y conclusión.
2. Derecho de petición y comunicaciones: escritos-colombianos. Pretensión clara, plazo y fundamento verificable.
3. Poderes, contratos y actas: playbook-contratos-col, hoja-encargo-col, commercial-legal:review, corporate-legal:board-minutes y corporate-legal:written-consent.
4. Demanda ordinaria: demand-draft, litigation-legal:demand-draft y demandas-civiles-col. Para tipos concretos use las skills lit-civil, lit-laboral o lit-penal de litigacion-colombia (por ejemplo lit-civil-demanda-verbal o lit-laboral-demanda-ordinaria).
5. Demanda contencioso-administrativa: skills lit-ca de litigacion-colombia (nulidad, nulidad y restablecimiento, reparación directa, controversias contractuales).
6. Tutela y cumplimiento: lit-const-tutela, lit-const-tutela-salud-eps, lit-const-tutela-contra-providencia y lit-const-cumplimiento-desacato.
7. Contestación, excepciones y reconvención: lit-civil-contestacion-reconvencion, lit-civil-excepciones-previas y lit-civil-excepciones-ejecutivo.
8. Recursos y casación: lit-civil-recursos-ordinarios, lit-civil-casacion, lit-laboral-casacion, lit-penal-recursos-apelacion-casacion y lit-ca-recursos-apelacion-queja-suplica.
9. Alegatos y audiencias: litigation-legal:brief-section-drafter, lit-laboral-alegatos-minimo-decisorio, lit-ca-alegatos-disciplinario y lit-civil-audiencias-372-373.
10. Proyecto de sentencia y análisis de providencias: jurisprudencia-col, subsuncion-juridica-col e investigacion-juridica-col. Estructuran la decisión y analizan precedentes; no reemplazan la relatoría oficial.
11. Estilo: humanizar-la-escritura, solo en la Fase 4 y después de verificar citas, hechos y cifras.

## Fase 2. Producción con técnicas de argumentación

Aplique estas técnicas en todo documento. Cada una tiene un criterio de comprobación que el control final debe revisar.

1. Tesis inicial. Enuncie en una frase la conclusión que el documento sostiene. Comprobación: aparece en el primer párrafo sustantivo y coincide con la pretensión o la conclusión.
2. Estructura de argumento. Cada argumento sigue el orden: premisa normativa, premisa fáctica, subsunción, conclusión parcial y, si aplica, respuesta a la objeción más fuerte. Comprobación: ningún argumento que el documento exija queda incompleto.
3. Jerarquía de hechos. Los hechos van numerados, en orden cronológico y con una sola idea por numeral. Cada hecho determinante enlaza su prueba. Un hecho sin prueba se marca PENDIENTE DE VERIFICACIÓN. Comprobación: ningún hecho determinante queda sin prueba o sin marca.
4. Precedentes con método. Cada providencia se cita con órgano, sala, número, fecha y regla. Distinga ratio decidendi de obiter dicta. Si no puede confirmar esos datos, no cite la providencia. Comprobación: ninguna providencia figura sin fuente verificable.
5. Normas con precisión. Cada norma se cita con nombre completo, número, año y artículo. Su vigencia queda en VIGENCIA_NO_DETERMINADA hasta que el abogado la confirme en fuente oficial. Comprobación: ninguna norma se presenta como vigente sin confirmación registrada.
6. Pretensiones medibles. Cada pretensión es concreta, ejecutable y coherente con los hechos. Comprobación: ninguna pretensión depende de un hecho no probado ni de una norma no verificada.
7. Contraargumentación explícita. Anticipe la objeción más fuerte de la contraparte o del juez y respóndala con fuente. Comprobación: los escritos de parte y los conceptos contienen respuesta a la objeción principal.
8. Economía de palabras. Elimine repetición, adjetivos sin función y lenguaje decorativo. Comprobación: cada párrafo aporta una idea o una prueba.
9. Coherencia entre piezas. Hechos, fundamentos y pretensiones no contradicen las pruebas ni las fechas del inventario. Comprobación: el control de contradicciones no reporta hallazgos.
10. Esquema argumentativo. Cada argumento se reconstruye como uno de los 40 esquemas de `anexo-argumentos.md`, con premisas explícitas y conclusión marcada como necesaria o plausible. Los esquemas presuntivos llevan "plausiblemente" y anticipan su objeción. Comprobación: cada argumento indica su número de esquema y cada premisa tiene fuente.
11. Estructura de sentencia de alta corte. Para proyectos de decisión: antecedentes, problema jurídico, consideraciones con precedente y análisis del caso, decisión y, si aplica, salvamentos o aclaraciones. Los requisitos formales de cada elemento se verifican en la norma aplicable; si no se verifican, quedan PENDIENTE DE VERIFICACIÓN. Comprobación: ningún requisito formal figura como cumplido sin verificación.

Si el tipo de documento exige una estructura legal específica, esa estructura prevalece sobre estas técnicas.

## Fase 3. Controles automáticos

1. Guarde el texto en un archivo .md o .docx dentro de la carpeta de trabajo.
2. Ejecute `python3 -m jac validar <archivo> --radicado <radicado> --fecha-ref <AAAA-MM-DD> --json ronda1.json`. Si no hay red, añada `--sin-red` y declárelo en el control final. Si el radicado no está fijado, omítalo y declare que el control de radicado ajeno no se ejecutó.
3. Ejecute `python3 -m jac consulta "<texto con las citas>" --json` para verificar las citas de forma independiente. Use el resultado sin modificarlo. Una cita no encontrada no se da por inexistente si la fuente no respondió.
4. Para confirmar la existencia de una norma del catálogo, ejecute `python3 -m normas_col consultar "<norma>"`. Ese resultado no confirma vigencia. La vigencia solo se registra cuando el abogado la confirma en fuente oficial, con `python3 -m normas_col confirmar "<norma>" --por <nombre> --fuente <fuente>`.
5. Clasifique cada hallazgo como crítico (cita inexistente o discrepante, error procesal, fecha imposible, contradicción sustancial, error de cálculo), mayor (requisito formal, anexo faltante, hecho sin prueba) o menor (estilo, redundancia).
6. Si no puede ejecutar código, aplique el procedimiento manual del skill jac-agente y declárelo en el control final.

## Fase 4. Revisión adversarial y corrección

1. Invoque el agente jac-revisor con la herramienta Agent. Entréguele solo el documento, sus fuentes y el informe de la Fase 3. Nunca entregue el razonamiento del productor. El revisor compara el texto contra los documentos originales, no contra su resumen.
2. Si está instalado el plugin croma-jac, puede sumar croma-revisar y croma-release. Si no, declare que la revisión es interna y no independiente.
3. Corrija los hallazgos críticos y mayores. Corrija los menores solo si no alteran el sentido.
4. Revalide con `python3 -m jac validar <archivo> --radicado <radicado> --fecha-ref <AAAA-MM-DD> --previo ronda1.json --json ronda2.json`. Revise solo lo afectado.
5. Si están instaladas, ejecute auditoria-pre-radicacion-col o auditor-redaccion-col como control previo a la radicación.
6. Límite: dos rondas. Una tercera solo si quedan fallos críticos corregibles. Registre solo las rondas efectivamente realizadas.
7. Aplique humanizar-la-escritura al final, sin cambiar citas, cifras, fechas ni pretensiones.

## Fase 5. Estado final

1. BLOCKED: hay al menos una cita inexistente o discrepante, un error procesal crítico, una fecha imposible, una contradicción sustancial o un error de cálculo material. No apto para firma ni radicación.
2. CONDITIONAL: no hay fallos críticos abiertos, pero quedan verificaciones pendientes, como vigencia de normas, requisitos formales no verificados, citas de altas cortes sin conector o datos de hechos. No apto para firma ni radicación hasta cerrarlas.
3. PASS: todos los controles exigibles se superaron y el abogado responsable hizo la revisión final. PASS_AUTOMATICO de la herramienta nunca equivale a PASS.

## Fase 6. Entrega

Entregue el documento completo y utilizable, con los datos faltantes marcados PENDIENTE DE VERIFICACIÓN, y un control final con este contenido:

1. Estado: BLOCKED, CONDITIONAL o PASS, con la razón.
2. Fuentes consultadas y fuentes que no respondieron o no tienen conector.
3. Rondas realizadas y hallazgos resueltos, nuevos y persistentes.
4. Si la revisión fue independiente o interna.
5. Skills que no estaban instaladas.
6. Pendientes para el abogado: vigencia de normas, requisitos formales no verificados, citas de altas cortes, hechos no probados, términos y estrategia.

## Anexo de argumentos

Los 40 esquemas están en `anexo-argumentos.md`, en esta carpeta: 20 generales y probatorios y 20 de interpretación normativa, con premisas, conclusión y lista de comprobación. Es un documento de formación del Prof. Luis Alfonso Malavé Naime, no fuente normativa ni jurisprudencial. Sus ejemplos extranjeros no se citan como derecho colombiano.

## Archivos de esta skill

1. `SKILL.md`: este flujo.
2. `anexo-argumentos.md`: los 40 esquemas argumentativos.
3. `referencias-tribunales.md`: qué comprobar en cada jurisdicción y el estado de cada norma base.

## Reglas permanentes

No invente hechos, normas, sentencias, radicados, fechas, cifras, enlaces ni nombres de magistrados. No cite un artículo, un plazo o una providencia que no haya confirmado en fuente oficial; márquelo PENDIENTE DE VERIFICACIÓN. No prometa porcentajes de exactitud ni resultados procesales. No elogie el borrador en la revisión. No presente como verificado lo que no abrió en fuente oficial. Este flujo no sustituye la firma ni la responsabilidad profesional del abogado.
