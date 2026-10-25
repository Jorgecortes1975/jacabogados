# Pruebas de la skill investigacion-juridica-colombia

Fecha de ejecución: 25 de octubre de 2026. Versión probada: 0.1.0, y luego 0.2.0 tras corregir los fallos encontrados.

Entorno: CLI `python3 -m jac` del repositorio, conectores Croma (Corte Constitucional, Función Pública) y acceso de red del entorno. Las relatorías de la Corte Constitucional, la Rama Judicial y SAMAI devolvieron 403 (bloqueo de red).

## Caso 1. Plazo para responder un derecho de petición

Pregunta: ¿Qué norma regula el derecho de petición y cuál es su relación con la Ley 1437 de 2011?

Resultado con 0.1.0: la skill no buscaba la norma específica y el plan no incluía la relación entre normas.

Resultado con 0.2.0:
1. Ley 1755 de 2015 identificada por número y año (catálogo y Gestor Normativo). Ambas fuentes son de Función Pública, así que no son validación cruzada.
2. Relación verificada en el resumen del registro: la Ley 1755 sustituye el Título II, capítulos I a III, de la Ley 1437 de 2011.
3. Plazo de respuesta: PENDIENTE DE VERIFICACIÓN. No se abrió el texto del artículo en fuente primaria, así que no se cita el número de días.

Evaluación: aprobado en la identificación de la norma y en la relación entre normas. Pendiente en el plazo, como debe ser.

## Caso 2. Jurisprudencia sobre derecho de petición en la Corte Constitucional

Pregunta: ¿Qué ha dicho la Corte Constitucional sobre el término para resolver un derecho de petición?

Resultado con 0.1.0: no aplicable, la skill no tenía instrucciones de búsqueda.

Resultado con 0.2.0:
1. La búsqueda libre en el buscador de la Corte Constitucional devolvió cinco providencias de 2026 sin relación con el derecho de petición (T-332/26 sobre educación superior, T-328/26 sobre copagos, entre otras).
2. Conclusión: ninguna providencia localizada sustenta el punto. No se cita jurisprudencia.
3. Acción recomendada: repetir la búsqueda con número de expediente o de providencia, o por filtro de año y tipo, y leer el resumen de cada resultado.

Evaluación: aprobado. La skill no cita providencias irrelevantes y deja el punto abierto. La calidad de la búsqueda libre es un límite del conector, y la skill ya lo indica.

## Caso 3. Trampas de existencia y vigencia

Pregunta: verificar tres citas. Ley 2099 de 2050 (no existe), T-008/20 (sentencia de la Corte Constitucional) y vigencia de la Ley 1437 de 2011.

Resultados:
1. Ley 2099 de 2050: "pendiente", no "inexistente". La herramienta indica que su ausencia no prueba que la norma no exista. Aprobado.
2. T-008/20: pendiente por error de red (403). La skill no la da por verificada. Aprobado.
3. Ley 1437 de 2011: existencia confirmada, vigencia no determinada, con seis modificaciones registradas en un listado no exhaustivo. La skill no afirma vigencia. Aprobado.

## Fallos encontrados y corregidos en 0.2.0

1. La búsqueda libre de Función Pública no encontró la Ley 1437 de 2011. La búsqueda por tipo, número y año sí la encontró. Se añadió el criterio de filtros exactos primero.
2. El registro de la Sentencia 0055000 de 2026 tenía fecha de emisión 2026-11-28, posterior a la fecha de consulta (25 de octubre de 2026). Se añadió la regla de registros con fechas posteriores a la consulta.
3. El catálogo de Función Pública y el Gestor Normativo se trataron como dos fuentes independientes. Son la misma institución. Se añadió la regla de independencia de fuentes.
4. La skill no indicaba que una norma puede sustituir a otra. Se añadió la relación entre normas, con el ejemplo de la Ley 1755 de 2015.

## Pendiente

1. Repetir el Caso 1 cuando las relatorías respondan, para verificar el plazo en el texto del artículo.
2. Probar al menos un caso laboral y uno tributario.
3. Evaluar la calidad de la búsqueda de la Corte Constitucional con filtros de expediente.
