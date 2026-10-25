---
name: investigacion-juridica-colombia
description: Investigación de derecho colombiano con verificación oficial: pregunta, jurisdicción, vigencia, sentencias y memorando con citas. Usar para investigar una norma o jurisprudencia o saber si algo cambió.
---

# Investigación jurídica colombiana

> Procedencia y metadatos de la skill:
> adaptado_de: "Sprintlaw, skill de investigación jurídica v0.1.0 (licencia MIT, jurisdicciones AU, UK, NZ, US)"
> jurisdiccion: "Colombia"
> version: "0.3.0"
> complementa: "investigacion-juridica-col (matriz de fuentes y relatoría) y jac-agente (herramientas deterministas)"

Esta skill ejecuta el método de investigación por pasos sobre el derecho colombiano. Responde con las fuentes primarias a la vista, separa lo verificado de lo pendiente y entrega un memorando que un abogado pueda revisar. Para la matriz de fuentes y la búsqueda en relatoría, use también la skill investigacion-juridica-col. Para la verificación determinista de citas, use jac-agente.

## No negociables

1. Las fuentes primarias (Constitución, leyes, decretos, resoluciones y sentencias) son la autoridad. Doctrina, conceptos de entidades, blogs y respuestas generadas son orientación, nunca fundamento.
2. Cada fuente en la que se apoya la conclusión debe abrirse y leerse en la sesión, con la fecha de verificación. Lo que no se pudo leer se marca PENDIENTE DE VERIFICACIÓN.
3. No cite una sentencia que no haya localizado en fuente oficial (relatoría de la Corte Constitucional, relatoría de la Corte Suprema de Justicia, relatoría del Consejo de Estado o Rama Judicial). Tampoco cite una norma cuya existencia no haya confirmado.
4. Existir no es estar vigente. La vigencia, la derogatoria, la suspensión provisional y los condicionamientos se confirman en la fuente oficial, no por memoria.
5. Separe las jurisdicciones: ordinaria, contencioso-administrativa, constitucional y especiales. Separe también el nivel de la norma: nacional, departamental, distrital y municipal. No aplique una jurisdicción o un nivel a un caso del otro.
6. Si una herramienta no responde, dígalo. No complete el vacío con la memoria del modelo.

## Paso 1. Marco

Anote esto antes de buscar:

1. La pregunta precisa, como la formularía un abogado colombiano. Por ejemplo: no "¿me pueden despedir?", sino "¿qué norma regula la indemnización por terminación sin justa causa de un contrato a término fijo celebrado en 2024, y qué versión aplica a un despido ocurrido en marzo de 2026?".
2. La jurisdicción y el nivel territorial.
3. La fecha relevante. Determine qué versión de la norma rige: la vigente al momento del hecho, del acto o de la presentación de la demanda, según el caso. Revise la cláusula de vigencia y las disposiciones transitorias, porque suelen determinar qué versión se aplica.
4. Para qué sirve la respuesta: decisión, escrito (demanda, tutela, recurso), concepto o negociación. Esto define cuánta profundidad se necesita.

## Paso 2. Plan

Liste las fuentes probables, los términos de búsqueda y la regla de parada: el punto en el que ya hay información suficiente para responder. Para una investigación de alto riesgo, muestre el plan al usuario antes de ejecutarlo.

Consulte las fuentes en este orden de autoridad:

1. Diario Oficial, para el texto expedido.
2. SUIN-Juriscol, para la norma consolidada y sus modificaciones.
3. Secretaría del Senado y Congreso de la República, para leyes y proyectos.
4. Función Pública, para normas de empleo público y sus reglamentos.
5. Corte Constitucional, relatoría oficial.
6. Corte Suprema de Justicia, relatoría oficial.
7. Consejo de Estado, relatoría oficial.
8. Rama Judicial.
9. Ministerio del Trabajo, cuando el asunto sea laboral.
10. Superintendencias competentes, cuando el asunto sea societario, financiero, de consumidor, de salud, de servicios públicos o de datos personales.

Herramientas disponibles en este repositorio, en el orden en que conviene usarlas:

1. `python3 -m jac consulta "<texto>"` enruta una cita, un texto o un archivo a la verificación correspondiente.
2. `python3 -m jac sentencia "<número>"` verifica una sentencia de la Corte Constitucional.
3. `python3 -m jac norma "<norma>"` verifica existencia y fecha de una norma del catálogo. No determina vigencia.
4. Los conectores de Croma para Consejo de Estado, Corte Suprema, SAMAI, Función Pública, DIAN y Supersociedades, si están conectados.
5. Legal Data Hunter, con el código de país CO, si está conectado.

Si una herramienta no está disponible, la fuente correspondiente queda PENDIENTE DE VERIFICACIÓN. No la sustituya por memoria.

Criterios de búsqueda, aprendidos en las pruebas:

1. Busque primero por filtros exactos (tipo, número y año) y solo después por texto libre. En las pruebas, la búsqueda libre devolvió normas y providencias sin relación con la consulta.
2. Un resultado solo prueba el punto si su resumen o sus temas coinciden con la pregunta. Si el resumen es nulo o no coincide, marque el punto como PENDIENTE DE VERIFICACIÓN.
3. Registre cada consulta en el registro del Paso 6, incluidas las que no devolvieron resultados.
4. En el entorno de pruebas, las relatorías de la Corte Constitucional, la Rama Judicial y SAMAI respondieron con 403 (bloqueo de red). Trátelas como no disponibles hasta comprobar el acceso.

## Técnicas avanzadas de búsqueda

Use estas técnicas cuando la primera búsqueda sea insuficiente. Cada una debe quedar registrada en el Paso 6.

1. Ampliación de términos. Busque sinónimos y expresiones jurídicas equivalentes: "derecho de petición" con "petición", "solicitud", "respuesta"; "plazo" con "término" y "caducidad". Registre qué término dio resultados.
2. Encadenamiento de citas. Desde cada norma o sentencia relevante, siga las normas que cita y las providencias que la citan. Un registro que cita la norma es un punto de partida, no una prueba de su vigencia.
3. Búsqueda de contradicción. Busque la norma junto con "inexequible", "nulidad", "suspensión provisional" y "condicionado". Si no encuentra nada, anótelo: una búsqueda negativa también es un resultado.
4. Cortes por fecha. Cuando la pregunta depende de una versión, reduzca la búsqueda a la ventana de fechas que corresponda al hecho o al acto.
5. Triangulación. Un punto solo queda confirmado si una fuente de otra institución lo confirma. Dos registros de Función Pública no cuentan como dos fuentes.
6. Criterio de parada. Pare cuando la pregunta quede respondida, cuando una ronda adicional no aporte fuentes nuevas, o cuando se agote el presupuesto de consultas. Diga cuál de los tres ocurrió.

Para ejecutar esta investigación en bucle, use `bin/jac investigar "<pregunta>" --rondas 3`. Cada ronda registra sus consultas. El bucle se detiene solo por las reglas de parada del punto 6.

## Paso 3. Fuentes primarias, leídas en contexto

Para cada norma, lea:

1. Encabezado: tipo, número, año, autoridad emisora y fecha de expedición.
2. Objeto y ámbito: a quién y a qué situaciones aplica.
3. Definiciones.
4. Excepciones, exclusiones y regímenes especiales.
5. Sanciones o consecuencias jurídicas.
6. Vigencia y derogatoria: cláusula final y normas que la modifican o la derogan.
7. Reglamentos: decretos o resoluciones que la desarrollan.
8. Transitorios: qué ocurre con las situaciones anteriores.
9. Relaciones con otras normas: si la norma sustituye, modifica o deroga un título o artículo de otra, léala en esa relación. El registro de Función Pública lo expresa en el resumen y en el campo de modificaciones.

Ejemplo verificado en las pruebas: la Ley 1755 de 2015 sustituye el Título II, capítulos I a III, de la Ley 1437 de 2011 en materia de derecho de petición. Por eso, para un punto sobre derecho de petición, la Ley 1437 sola no basta.

Para cada sentencia, identifique:

1. Corporación, sala o sección, tipo de providencia (por ejemplo, sentencia de constitucionalidad, de unificación, de tutela, de casación o de nulidad), número, fecha y magistrado ponente.
2. Problema jurídico planteado.
3. Ratio decidendi, separada de los obiter dicta.
4. Resolutivo y efectos: inter partes, erga omnes o de unificación, según el tipo de providencia. Confirme el tipo en la fuente antes de atribuir un efecto obligatorio.
5. Condicionamientos, por ejemplo "exequible bajo el entendido de que" o "inexequible".
6. Tratamiento posterior: si la providencia ha sido reiterada, aplicada, matizada, cambiada o anulada. Si no pudo verificarlo, indíquelo.

## Paso 4. Vigencia y cambios

Antes de cerrar la respuesta, verifique:

1. La versión consolidada más reciente en fuente oficial, con su fecha.
2. Las modificaciones, derogatorias y reglamentos posteriores a la versión que leyó. Para normas comerciales, tributarias y de contratación de la última década, compruebe si fueron modificadas por la Ley 2294 de 2023 (Plan Nacional de Desarrollo 2022-2026), que modificó varias de ellas.
3. Los proyectos de ley o reformas en trámite, con su estado.
4. Las sentencias de inexequibilidad, nulidad o suspensión provisional que afecten la norma.
5. Las cifras que se actualizan cada año, como el salario mínimo o la UVT. Confirme el valor del año que corresponda al caso.
6. Fecha de vigencia vacía en el registro: la vigencia no está determinada. No la deduzca de la fecha de expedición.
7. Fechas de emisión posteriores a la fecha de consulta: el registro es inconsistente. No lo use como fuente y repórtelo.
8. Independencia de fuentes: el catálogo de Función Pública y el Gestor Normativo son la misma institución. Para la validación cruzada hace falta una fuente de otra institución, como Diario Oficial, SUIN-Juriscol, la relatoría o la Secretaría del Senado. Si no está disponible, la validación cruzada queda PENDIENTE DE VERIFICACIÓN.

## Paso 5. Encuesta comparada

Cuando la pregunta exige comparar reglas entre entidades territoriales o entre entidades (por ejemplo, acuerdos municipales de un mismo tema):

| Entidad o jurisdicción | Regla en una línea | Norma o sentencia (identificación completa) | Fecha de verificación | Fuente | Notas |

Llene una fila solo con datos de una fuente que haya abierto. Deje una fila en PENDIENTE DE VERIFICACIÓN antes que inferirla de una entidad vecina.

## Paso 6. Registro de investigación

Mantenga el registro durante la investigación. En tareas cortas va en la respuesta; en tareas largas, en un archivo.

| # | Fuente (nombre y enlace que devolvió la herramienta) | Versión o fecha | Qué dice (artículo, párrafo o considerando) | Relevancia |

## Paso 7. Memorando

Estructura obligatoria:

1. Pregunta.
2. Respuesta breve.
3. Jurisdicción, nivel y norma aplicable según la fecha.
4. Hechos supuestos, indicados como supuestos.
5. Marco jurídico: normas y sentencias con cita completa, fuente y estado de verificación.
6. Análisis: aplicación al caso, el argumento contrario más fuerte y cómo lo vería probablemente un juez o la entidad.
7. Vigencia y cambios recientes o pendientes.
8. Preguntas abiertas y autoridad contradictoria.
9. Fuentes consultadas, con fecha de verificación.
10. Estado de verificación: qué se comprobó con herramientas y qué quedó pendiente.

Formato de cita:

1. Norma: Ley 1437 de 2011, artículo 137. Estado: vigente según [fuente], verificado el [fecha]. Si no confirmó la vigencia, escriba "vigencia PENDIENTE DE VERIFICACIÓN".
2. Sentencia: Corte Constitucional, Sentencia T-XXX de AAAA, M.P. [nombre], fuente [relatoría], verificada el [fecha]. Si no confirmó número, fecha, corporación o ponente, marque el dato como PENDIENTE DE VERIFICACIÓN.

## Responder

Entregue primero la respuesta breve, luego el memorando y al final el estado de verificación. Si la investigación muestra que la premisa del usuario es errónea, dígalo en la primera línea.

Si no pudo confirmar la existencia o la vigencia de una fuente, abra la respuesta con: "No puedo confirmar en este momento la vigencia o existencia exacta de las fuentes jurídicas. Entrego una respuesta preliminar sujeta a verificación en fuente oficial."

## Límites

1. Esta investigación no sustituye al abogado responsable. Entregue el resultado para que se aplique a la situación concreta del cliente.
2. Las fuentes abiertas no siempre muestran el análisis completo de una providencia. Si la conclusión depende de que una sentencia siga vigente y no pudo confirmarlo, indíquelo.
3. Si el resultado va a incorporarse a un escrito, use después jac-gauntlet para el control de calidad.
4. Redacte en español formal, sin asteriscos y sin guiones como viñetas, con títulos, numeración y párrafos breves.
