# Protocolo de consulta a fuentes oficiales colombianas

Aplica a todos los agentes y skills de la Fábrica Legal Digital. Las herramientas están en el servidor MCP fabrica_legal/servidor.py.

## Herramientas

1. buscar_jurisprudencia_cc: metadatos de sentencias de la Corte Constitucional por texto y rango de años. Cubre cualquier año que contenga el dataset. Revisar siempre limite_alcanzado.
2. texto_sentencia_cc: texto íntegro de una sentencia de la Corte Constitucional a partir de su cita (por ejemplo T-008/20).
3. confirmar_norma_oficial: confirma existencia y fecha de una norma del catálogo. No confirma vigencia.
4. estado_fuentes_oficiales: accesibilidad de cada fuente en la ejecución y lo que cubre cada una.

## Reglas

1. Antes de citar una sentencia de la Corte Constitucional, llamar texto_sentencia_cc. Si el estado es OK, anotar la URL y la fecha de consulta. Si no, marcar PENDIENTE DE VERIFICACIÓN.
2. Antes de citar una norma del catálogo, llamar confirmar_norma_oficial. La respuesta confirma existencia, nunca vigencia. La vigencia se marca siempre como NO DETERMINADA salvo verificación en fuente oficial.
3. Las fuentes sin conector (Consejo de Estado, Corte Suprema, SUIN, Diario Oficial, Congreso, Superintendencia de Sociedades y DIAN) no se consultan automáticamente. Sus providencias y normas se marcan PENDIENTE DE VERIFICACIÓN. Prohibido citarlas de memoria.
4. Un resultado vacío significa "no encontrado en la fuente consultada". Nunca se afirma que la providencia o la norma no existe.
5. Si una fuente no responde, la cita queda PENDIENTE. Una fuente caída no equivale a una cita inexistente.
6. Al inicio de cualquier informe que use estas fuentes, llamar estado_fuentes_oficiales e indicar qué fuentes estuvieron accesibles en esa ejecución.
7. Las cifras de SMLMV, auxilio de transporte y UVT no se toman de estas herramientas: se confirman con el decreto o resolución vigente.

## Limitaciones conocidas

La cobertura de la búsqueda por texto depende del dataset de datos.gov.co. No es un buscador exhaustivo de la relatoría.

No existe búsqueda confirmada por cita en el catálogo de normas. La existencia se confirma solo para las normas que ya están en el catálogo local.

El acceso a las fuentes oficiales depende de la red del entorno donde se ejecute el servidor. Desde algunos entornos de ejecución pueden estar bloqueadas. En ese caso, el resultado es FUENTE_NO_DISPONIBLE y no debe tratarse como un hallazgo jurídico.
