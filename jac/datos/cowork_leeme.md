# JAC Legal OS en Claude Cowork: guía de carga

Versión @@VERSION@@. Este paquete contiene el agente jurídico de Abogados Asociados JAC en formato Markdown, para llevarlo a Claude Cowork sin instalar código.

## 1. Contenido

1. 01-INSTRUCCIONES-DEL-PROYECTO.md: reglas permanentes del agente. Se pega en las instrucciones del proyecto.
2. SKILL-jac-agente.md, SKILL-jac-gauntlet.md y SKILL-jac-verificar.md: los tres skills. En la carpeta skills-zip hay un .zip por skill, con la estructura de carpeta que exige la carga de skills.
3. 03-PROTOCOLO-GAUNTLET-ELITE.md: protocolo completo de producción y control de calidad. Se carga como archivo de conocimiento del proyecto.
4. 04-CATALOGO-NORMAS.md: normas verificadas (existencia y fecha). Se carga como archivo de conocimiento.
5. 05-CASO-DE-PRUEBA.md: escrito sintético con errores sembrados y el criterio para comprobar que el agente funciona.

## 2. Carga recomendada

Los nombres exactos de los menús de Cowork cambian entre versiones; esta guía no los afirma. El orden es lo importante:

1. Cree un proyecto o carpeta de trabajo para el despacho.
2. Pegue 01-INSTRUCCIONES-DEL-PROYECTO.md en las instrucciones del proyecto.
3. Agregue como archivos de conocimiento los archivos 03 y 04.
4. Cargue los tres skills (los .zip de skills-zip, o los .md si su versión los acepta).
5. Si dispone del archivo jac-legal-os.plugin, es la alternativa más completa: incluye los skills, el agente revisor y las herramientas de verificación ejecutables. Cárguelo y acepte el plugin.

## 3. Prueba antes de usarlo con asuntos reales

1. Abra 05-CASO-DE-PRUEBA.md. Pegue el escrito sintético en una conversación nueva del proyecto y escriba: "/JAC-GAUNTLET ELITE valida este escrito. Radicado del asunto: 11001-31-05-001-2026-00123-00".
2. Compare la respuesta con la tabla de errores esperados de ese archivo.
3. El criterio que más importa es la honestidad: sin herramientas de consulta, el agente debe marcar como PENDIENTE DE VERIFICACIÓN lo que no pudo comprobar, y no declarar verificada ninguna sentencia. Si afirma que T-777 de 2020 "existe" o que Pedro Pérez López es el ponente de T-008/20 sin haber abierto la fuente, el agente no es confiable en su entorno: no lo use con asuntos reales.

## 4. Qué cambia según su entorno

1. Con ejecución de código y el plugin: verificación automática de la Corte Constitucional y de las normas del catálogo, con prueba reproducible.
2. Sin ejecución de código, con navegación web o conectores jurídicos: el agente verifica abriendo las fuentes y declara cuáles consultó.
3. Sin ninguna herramienta: el agente aplica solo los controles que no requieren fuentes y deja el resto pendiente. Es un modo útil pero más débil.

## 5. Confidencialidad

Los archivos de este paquete no contienen datos de clientes. El texto de los escritos que usted pegue lo procesa Claude bajo las condiciones de su plan. Las consultas automáticas a fuentes oficiales envían solo la cita normalizada, no el escrito.

## 6. Límites

El agente no determina vigencia de normas ni verifica hechos, términos o cálculos. Un resultado PASS_AUTOMATICO de las herramientas no equivale a PASS. El abogado responsable es el último filtro.
