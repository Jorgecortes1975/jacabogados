# Aplicación de los esquemas a las skills jurídicas instaladas

Este documento propone cómo usar el catálogo de esquemas (esquemas.md) junto con las skills que ya están instaladas en la cuenta. No modifica esas skills: viven en una carpeta sincronizada (/root/.claude/skills/synced/...) que se sobrescribe en cada sincronización. Si se quieren cambios permanentes, deben hacerse en la fuente de esas skills.

Los nombres y funciones se toman de las descripciones que las skills publican. Las que no se revisaron completas figuran como "según descripción".

## Correspondencia

1. subsuncion-juridica-col (según descripción: conectar jurisprudencia de Altas Cortes con hechos concretos en escritos procesales). Esquemas aplicables: 34 (analogía legis, para conectar un caso con la regla), 35 (precedentes), 16 (instrumentos públicos, para hechos documentados). Uso: en el paso de subsunción, reconstruir la conexión como esquema con premisas explícitas.

2. jurisprudencia-col (según descripción: redacción con estándar de Altas Cortes, mínimo cuatro sentencias verificables). Esquemas: 35 (precedentes), 37 (histórica, si se invoca la evolución de la norma), 38 (doctrina). Uso: cada sentencia citada debe ubicarse en el esquema que sostiene. Una sentencia sin esquema claro es cita decorativa.

3. redactor-juridico-col (según descripción: analizar, depurar y reescribir textos jurídicos). Esquemas: 8 a 10 (consecuencias y abducción) para revisar si la conclusión es proporcionada a la premisa. Uso: después de la reescritura, comprobar que cada párrafo conserva su esquema.

4. cotejo-juridico-col (según descripción: protocolo de supervisión antes de radicar o enviar). Esquemas: lista de comprobación del paso 4 y 5 de SKILL.md. Uso: antes de radicar, verificar que cada premisa tiene su soporte y que la conclusión no supera lo que el esquema permite.

5. anti-hallucination-v3. Esquemas: 14 a 17 (testigos, instrumentos, expertos), porque toda premisa de hecho o de autoridad debe tener fuente. Uso: control de citas. No aplica a los esquemas en sí, sino a las premisas que alimentan.

6. Serie litigacion-colombia (lit-ca-*, lit-civil-*, lit-laboral-*, lit-penal-*, lit-const-*, lit-comercial-*, lit-core-*). Según nombre, cubren procedimientos concretos. Esquemas por tipo:
   a. Penal (lit-penal-*): 19, 20 (pruebas materiales y grabaciones) y 15 (testigos).
   b. Constitucional (lit-const-*): 33 (evolutivo), 40 (principios) y 39 (reducción al absurdo).
   c. Laboral (lit-laboral-*): 22 y 36 (a fortiori, si la conducta es más grave que la sancionada), 35 (precedentes).
   d. Civil y comercial (lit-civil-*, lit-comercial-*): 34 (analogía legis) cuando falte norma expresa, 24 y 23 (rúbrica y sedes materiae) para interpretar la ubicación de la norma.

7. croma-jac:jac-legal-counsel y croma-jac:jac-review-chamber. Según descripción: análisis y revisión con verificación de fuentes. Esquemas: el revisor debe comprobar que la reconstrucción es fiel al argumento original (paso 2 de SKILL.md) antes de emitir su clasificación.

## Propuesta de mejora de la estructura argumentativa

1. Antes de redactar, identificar el esquema de cada argumento principal y dejarlo escrito en una línea.
2. Por cada párrafo argumentativo, indicar la premisa más débil y su forma de soporte.
3. Incluir, en cada escrito, una sección breve de objeciones previstas, con la respuesta.
4. Llevar un registro de qué esquemas se usan con más frecuencia en el despacho, para decidir qué skills conviene reforzar.

Esta propuesta debe aprobarse antes de incorporarse a las skills instaladas, porque implica cambios en su fuente.
