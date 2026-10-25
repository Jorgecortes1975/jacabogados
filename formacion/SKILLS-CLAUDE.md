# Skills de Claude: método para transferir el criterio del abogado

**Versión:** 1.0 | **Fecha de elaboración:** 2026-10-25 | **Uso:** interno, formación del equipo

---

## 0. Origen, alcance y verificación

**Origen.** Ocho diapositivas de una publicación patrocinada en Instagram (cuenta con etiqueta "Publicidad") sobre cómo crear Skills de Claude. Se extrajo su método, se depuró y se adaptó al despacho. No se reproduce el texto de las diapositivas.

**Verificación.** No puedo confirmar en este momento la vigencia o existencia exacta de las funciones que describe la publicación, como la grabación de pantalla para crear una Skill. Entrego una versión preliminar sujeta a verificación en la documentación oficial de Anthropic.

| Afirmación de la publicación | Estado | Acción |
|---|---|---|
| Una Skill transfiere proceso, criterios, reglas, excepciones y estándar de calidad | Método de diseño; se adopta como criterio de trabajo | Aplicar en el despacho; no depende de una función concreta |
| "Record a Skill" graba la pantalla y la voz para crear una Skill | No verificado | Confirmar en documentación oficial antes de usarlo |
| Reducción de tiempo y consistencia en reportes | Afirmación comercial | Medir en el caso piloto (sección 7) |
| Ejemplo de reporte de reunión con cliente | Ilustrativo | Usar la plantilla propia del despacho (sección 6) |
| Imagen de la Corte Constitucional sobre la Sentencia T-158 de 2026 | No verificado: el control del repositorio no pudo consultar las fuentes oficiales (error 403 del proxy) | No citar hasta confirmarla en la relatoría oficial |

**Nivel de certeza:** alto para el método (proceso, criterios, excepciones y calidad); sujeto a verificación para cualquier función del producto.

---

## 1. Respuesta directa

Una Skill es un procedimiento escrito que Claude puede aplicar de forma repetible. Su valor no está en los clics ni en los pasos mecánicos, sino en el criterio: qué incluir, qué excluir, qué regla no se rompe y cómo se reconoce un resultado correcto.

Para el despacho, la regla práctica es esta: documentar el criterio del abogado responsable, no solo el procedimiento. Un reporte que dice qué se hizo es insuficiente si no dice qué se decidió dejar fuera ni por qué.

---

## 2. Anatomía de una Skill

La publicación propone cinco componentes. Los mantenemos y añadimos dos que el despacho necesita.

| Componente | Pregunta que responde | Ejemplo para el despacho |
|---|---|---|
| Proceso | ¿Cuáles son los pasos? | Revisar notas, filtrar, redactar, aplicar formato |
| Criterios de decisión | ¿Qué incluir y qué excluir? | Incluir compromisos del cliente; excluir datos de terceros |
| Reglas | ¿Qué siempre se hace? | Máximo tres próximos pasos; no inventar avances |
| Excepciones | ¿Qué caso no sigue la regla? | Reunión sin acuerdos concretos: se registra como sin avances |
| Estándar de calidad | ¿Cómo se reconoce un buen resultado? | Formato fijo, nomenclatura de archivo, revisión humana antes de enviar |
| Límites de datos (añadido) | ¿Qué información no puede salir del despacho? | Secreto profesional, datos personales, información de otros clientes |
| Fuentes (añadido) | ¿De dónde sale cada afirmación? | Notas de la reunión, documentos del expediente; nunca memoria del modelo |

---

## 3. Método para grabar el criterio

La publicación propone mostrar la tarea mientras se explica en voz alta. Es útil, con una precaución: explicar el criterio, no solo los clics.

1. Elegir una tarea real y repetitiva, sin datos de clientes en pantalla.
2. Ejecutar la tarea como se hace habitualmente.
3. Explicar en voz alta cada decisión: qué se incluye, qué se excluye y por qué.
4. Anotar las excepciones que aparecieron.
5. Redactar la Skill a partir de la explicación, y no de la grabación.
6. Revisar la Skill con un segundo abogado antes de usarla.

**Lo que no debe decirse en la grabación.** Nombres de clientes, datos de contacto, expedientes, contenido confidencial. Si aparecen, se corta la grabación y se repite con un caso anonimizado.

---

## 4. Buenas prácticas y antipatrones

| Buena práctica | Antipatrón |
|---|---|
| "Esto sí va al cliente y esto es confidencial, lo excluyo" | "Copio y pego las notas" |
| Máximo tres próximos pasos | Lista de veinte pendientes que nadie ejecuta |
| Si no hubo avances, decir que no hubo avances | Inventar avances para llenar el formato |
| Mismo formato y misma nomenclatura cada vez | Cambiar el formato según quien redacta |
| Explicar la decisión, no solo la acción | Describir solo los clics |
| Revisión humana antes de salir del despacho | Enviar el resultado sin revisar |

---

## 5. Por qué importa para el despacho

Una Skill bien escrita reduce la variación entre abogados, facilita la revisión y deja trazabilidad de los criterios. Una mal escrita propaga errores con más velocidad. Por eso cada Skill del despacho debe tener un responsable, una fecha de revisión y un caso de prueba.

---

## 6. Plantilla adoptada: reporte de reunión con cliente

Implementada en `skills/jac-reporte-reunion/SKILL.md`. Resumen:

1. Entrada: notas desordenadas de la reunión.
2. Salida: reporte con resumen, temas tratados, avances, próximos pasos y observaciones internas.
3. Reglas: máximo tres próximos pasos; sin avances inventados; datos confidenciales y de terceros excluidos del reporte al cliente.
4. Revisión: el abogado responsable revisa antes de enviar.

---

## 7. Plan de prueba en el despacho

1. Elegir una reunión pasada, anonimizada, con notas conocidas.
2. Aplicar la Skill y comparar el resultado con el reporte que redactó el abogado.
3. Medir: tiempo de redacción, omisiones, datos sensibles que salieron por error e inventos.
4. Ajustar la Skill y repetir con dos casos más.
5. Adoptar la Skill solo si no aparecen datos sensibles ni inventos en los tres casos.

---

## 8. Conclusión operativa

La Skill del despacho debe transferir el criterio del abogado: qué incluir, qué excluir y cuándo no hay avances que reportar. El método de grabación sirve para capturar ese criterio, pero la Skill se escribe y se revisa por escrito. Antes de usar cualquier función del producto que describe la publicación, confirmar su existencia en la documentación oficial.
