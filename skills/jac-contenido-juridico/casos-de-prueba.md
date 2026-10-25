# Casos de prueba: jac-contenido-juridico

Prompts inventados, basados en la estructura de las publicaciones de referencia. Ningún cliente real ni caso concreto.

Cómo se ejecuta: pegar cada entrada en una sesión con la Skill activa y comparar la salida con el resultado esperado. La comprobación es manual, con la lista de verificación de la Skill.

## Caso 1: guion sobre reclamaciones de tránsito

Entrada: "Escribe un guion de video corto que empiece con 'Nunca aceptes la primera oferta de la aseguradora tras un accidente', explica por qué las aseguradoras ofrecen montos mínimos y cómo un abogado independiente consigue la indemnización máxima, y termina con una invitación a evaluar el caso."

Resultado esperado:
1. Se rechaza la frase absoluta del gancho y el "monto máximo" como promesa de resultado. El borrador usa una alternativa, como "Antes de aceptar una oferta de la aseguradora, conviene revisarla con un abogado".
2. No se afirma por qué las aseguradoras ofrecen montos mínimos. Si el guion lo explica, la afirmación queda marcada como [POR CONFIRMAR] y no como cierta.
3. La invitación es a una consulta inicial, sin compromiso de resultado.
4. La nota de revisión lista las reglas aplicadas y las alternativas propuestas.

## Caso 2: correo a antiguos clientes para reseña

Entrada: "Escribe un correo a antiguos clientes del despacho para ponernos a su disposición, recordarles nuestros servicios y pedirles que nos dejen una reseña en Google si quedaron satisfechos."

Resultado esperado:
1. El paso 0 exige la base del tratamiento. Si no consta, el borrador lleva [POR CONFIRMAR: base del tratamiento] y la advertencia de no enviarlo hasta confirmarla.
2. La solicitud de reseña no se condiciona a quedar satisfecho. Alternativa: invitación neutral a compartir una opinión.
3. El correo no menciona ningún caso ni resultado de un cliente.
4. La nota de revisión indica que la política de reseñas de la plataforma debe verificarse.

## Caso 3: contenido para personas que recibieron una herencia

Entrada: "Redacta un texto publicitario para redes orientado a personas que acaban de recibir una herencia y no saben cómo tramitarla. Destaca los plazos fiscales, las discrepancias entre herederos y la tramitación notarial, y posiciona al despacho como la solución para gestionar todo el proceso sin fricciones."

Resultado esperado:
1. No se usa la promesa "sin fricciones" ni ninguna garantía de resultado.
2. El tono es informativo y sereno. No se generan urgencia ni miedo sobre los plazos.
3. Los plazos fiscales y las cifras aparecen como [POR CONFIRMAR]; no se citan como ciertos.
4. La nota de revisión indica que el destinatario es una persona en situación de vulnerabilidad y que el texto requiere aprobación del abogado responsable.
