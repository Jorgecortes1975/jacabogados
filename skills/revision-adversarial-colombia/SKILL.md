---
name: revision-adversarial-colombia
description: Segunda lectura hostil de un contrato, política, concepto o escrito jurídico colombiano antes de firmarlo, enviarlo, publicarlo o basarse en él. Un revisor que no lo redactó y que parte de la premisa de que está mal comprueba normas y citas, restos de otra jurisdicción, contenido obligatorio ausente, exigibilidad, mecánica de redacción y si la posición del cliente sobrevivió. Devuelve VEREDICTO PASS o FIX, con hallazgos bloqueantes, mayores y menores, y correcciones listas para pegar. Repite el ciclo borrador, revisión, corrección y nueva revisión hasta PASS. Usar para "revisión adversarial", "ataque este documento", "revisa esto como si fueras la contraparte", "¿lo firmaría un socio?", "¿qué atacaría la contraparte?" o como último paso antes de enviar cualquier documento.
---

# Revisión adversarial colombiana

> Procedencia y metadatos de la skill:
> adaptado_de: "Sprintlaw, skill adversarial-review (descripción pública; texto original no disponible en esta sesión)"
> jurisdiccion: "Colombia"
> version: "0.1.0"
> complementa: "jac-gauntlet (protocolo de control de escritos) y jac-revisor (agente revisor del plugin)"

Esta skill es una segunda lectura hostil. Quien revisa no redactó el documento y lo trata como incorrecto hasta que se demuestre lo contrario. Su función es encontrar lo que atacaría la contraparte o el juez, no mejorar el estilo.

## No negociables

1. El revisor no defiende al redactor. Cada hallazgo se demuestra con el texto del documento y con una fuente.
2. Ninguna norma, sentencia o cifra se da por correcta sin verificación. Lo no verificado queda como PENDIENTE DE VERIFICACIÓN, no como error ni como acierto.
3. Un hallazgo sin ubicación exacta (página, cláusula o párrafo), sin explicación y sin corrección propuesta no cuenta.
4. El veredicto PASS no sustituye la revisión del abogado responsable.

## Cuándo se usa

Antes de firmar un contrato, enviar una comunicación a una contraparte, presentar un escrito, publicar una política de datos o basar una decisión en un concepto. No se usa como sustituto de la investigación previa; para eso está investigacion-juridica-colombia.

## Ciclo

1. Recibir el documento y, si existe, el contexto: partes, objetivo, jurisdicción y fecha de referencia.
2. Revisar con las comprobaciones de la lista de abajo.
3. Emitir hallazgos con gravedad: BLOQUEANTE (invalida o expone al cliente a una pérdida grave), MAYOR (debilita la posición o genera una contingencia), MENOR (redacción o precisión).
4. Proponer corrección lista para pegar.
5. Corregir y volver a revisar solo lo afectado, hasta que no quede ningún BLOQUEANTE ni MAYOR. Emitir PASS solo entonces. Si quedan hallazgos sin resolver, emitir FIX con la lista.

## Lista de comprobaciones

1. Partes y capacidad: identificación correcta, representación y poderes, personas jurídicas con certificado de existencia vigente. Verificar en el registro mercantil o RUES cuando el documento dependa de ello.
2. Jurisdicción y ley aplicable: restos de otra jurisdicción o de otro país (por ejemplo, referencias a leyes de otro estado), y cláusula de ley aplicable coherente con el objeto.
3. Normas citadas: existencia y vigencia en fuente oficial, con `python3 -m jac norma "<norma>"`. Si una norma fue derogada o modificada, el hallazgo es mayor.
4. Sentencias citadas: existencia con `python3 -m jac sentencia "<número>"`. Una cita sin número, fecha o corporación confirmada queda PENDIENTE.
5. Contenido obligatorio ausente: requisitos de forma y de fondo que la norma aplicable exige para ese tipo de documento. Liste la norma y marque PENDIENTE hasta verificarla.
6. Exigibilidad: cláusulas que dependen de un plazo, de una condición o de un acto que no define el documento; obligaciones sin sujeto; penas que no tienen base en el documento.
7. Coherencia interna: fechas, montos, plazos y definiciones que cambian de una sección a otra. Calcule cada plazo con su fecha de referencia.
8. Posición del cliente: si la versión final todavía refleja lo que el cliente pidió. Compare con la instrucción original.
9. Mecánica de redacción: remisiones a anexos inexistentes, numeración rota, firmas, espacios en blanco y versiones contradictorias.

## Formato del informe

VEREDICTO: PASS o FIX.

Hallazgos, en orden de gravedad:

1. Gravedad, ubicación exacta, qué está mal, con qué fuente o prueba se comprueba, y corrección propuesta.

Comprobaciones realizadas y no realizadas, con la fecha de verificación.

Pendientes de verificación, con la fuente que los resolvería.

## Límites

Esta revisión no determina la vigencia de normas que no pudo verificar, no valida hechos ni pruebas, y no calcula términos sin la fecha de referencia. Si el documento va a radicarse ante una autoridad judicial, use después jac-gauntlet para el control de escritos.
