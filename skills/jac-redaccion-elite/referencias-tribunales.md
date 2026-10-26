# Referencia por tribunal: qué comprobar antes de redactar

Este documento complementa la Fase 2 de jac-redaccion-elite. Su función es indicar qué debe verificarse en cada tribunal o jurisdicción. No contiene reglas procesales verificadas: ningún artículo ni plazo se da por vigente aquí. Todo dato se confirma en fuente oficial antes de usarlo en un escrito.

## Estado de las normas base

1. Código General del Proceso, Ley 1564 de 2012. Existencia y fecha de expedición confirmadas en el catálogo de Función Pública (Diario Oficial 48489 de 12 de julio de 2012). Los artículos, su vigencia y sus modificaciones están PENDIENTES DE VERIFICACIÓN en fuente oficial.
2. Código de Procedimiento Administrativo y de lo Contencioso Administrativo, Ley 1437 de 2011. Existencia y fecha confirmadas en el catálogo (Diario Oficial 47956 de 18 de enero de 2011; vigencia desde el 2 de julio de 2012, según el catálogo). El texto de los artículos y sus reformas están PENDIENTES DE VERIFICACIÓN.
3. Las demás normas procesales (tutela, código de procedimiento laboral, código de procedimiento penal, decretos reglamentarios) no están confirmadas en el catálogo. Antes de citarlas, ejecute `python3 -m normas_col consultar "<norma>"` y confirme el resultado en fuente oficial.

## Restricción de esta sesión

Las fuentes oficiales de texto normativo (Secretaría del Senado) y de jurisprudencia (relatoría de la Corte Constitucional, Rama Judicial, SAMAI, Datos Abiertos) no fueron accesibles durante la última revisión. Por tanto, cualquier regla de este documento queda sin verificar hasta que se confirme desde un equipo con acceso.

## Jurisdicción civil y de familia

Qué comprobar: requisitos formales de la demanda y su subsanación en el Código General del Proceso; cuantía y competencia; trámite verbal o verbal sumario; anexos obligatorios; plazos de contestación y de excepciones previas; audiencias; medidas cautelares.

Estado: PENDIENTE DE VERIFICACIÓN para todos los artículos.

## Jurisdicción laboral

Qué comprobar: requisitos de la demanda ordinaria en el Código Procesal del Trabajo y de la Seguridad Social y en las reformas posteriores; agotamiento de la reclamación administrativa cuando la norma lo exija; prescripción y caducidad; audiencias; apelación y consulta; casación laboral.

Estado: PENDIENTE DE VERIFICACIÓN. La norma procesal laboral no figura en el catálogo y debe confirmarse por separado.

## Jurisdicción contencioso administrativa

Qué comprobar: medio de control adecuado; requisito de procedibilidad (conciliación prejudicial cuando aplique); término de caducidad del medio de control; competencia por cuantía y territorio; contenido de la demanda y anexos; medidas cautelares; recursos.

Estado: PENDIENTE DE VERIFICACIÓN para los artículos del Código de Procedimiento Administrativo y de lo Contencioso Administrativo (Ley 1437 de 2011, cuya existencia sí está confirmada).

## Jurisdicción penal

Qué comprobar: etapa procesal, requisitos de la imputación, medida de aseguramiento, recursos y términos. La norma procesal penal no figura en el catálogo.

Estado: PENDIENTE DE VERIFICACIÓN. No redacte escritos penales sin confirmar la norma vigente.

## Acción de tutela ante jueces

Qué comprobar: legitimación; inmediatez; subsidiariedad; término de decisión; impugnación y su término; procedencia contra providencias (requisitos de la jurisprudencia constitucional).

Estado: PENDIENTE DE VERIFICACIÓN. La norma reglamentaria de la tutela no figura confirmada en el catálogo.

## Corte Constitucional

Qué comprobar: selección y revisión de tutelas; insistencia; precedente en sentencias de unificación y de constitucionalidad; sentido de la decisión y efectos. Las citas de sentencias de la Corte Constitucional son las únicas que el control automático puede verificar, y solo cuando la relatoría responde.

Estado: PENDIENTE DE VERIFICACIÓN en esta sesión (relatoría no accesible).

## Corte Suprema de Justicia (Salas Civil, Laboral y Penal)

Qué comprobar: requisitos de la demanda de casación, interés para recurrir, técnica de casación, precedente de cada sala y número de radicado de la providencia citada.

Estado: PENDIENTE DE VERIFICACIÓN. El control automático no verifica estas providencias.

## Consejo de Estado

Qué comprobar: sección competente, precedente de unificación, recursos extraordinarios, y el número de expediente y la fecha de cada providencia citada.

Estado: PENDIENTE DE VERIFICACIÓN. El control automático no verifica estas providencias.

## Procedimiento para cerrar cada pendiente

1. Confirmar la norma en fuente oficial (Diario Oficial, SUIN Juriscol o Secretaría del Senado) y registrar fecha y responsable con `python3 -m normas_col confirmar "<norma>" --por <nombre> --fuente <fuente>`.
2. Confirmar cada providencia en la relatoría oficial del tribunal, con órgano, sala, número, fecha, ponente y regla.
3. Registrar la verificación en el control final. Sin esos datos, el estado no puede ser PASS.
