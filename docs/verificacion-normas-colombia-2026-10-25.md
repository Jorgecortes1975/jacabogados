# Verificación de normas citadas en las skills colombianas

Fecha de verificación: 25 de octubre de 2026.
Fuentes: catálogo de normas del repositorio (`python3 -m jac norma`) y Gestor Normativo de Función Pública (conector Croma). Ambas son de la misma institución; no constituyen validación cruzada.

| Norma | Existencia | Fuente | Observaciones | Skills que la citan |
|---|---|---|---|---|
| Ley 1258 de 2008 (SAS) | Confirmada | Gestor Normativo | Publicada en el Diario Oficial 47.194 de 5 de diciembre de 2008. Registro: modificada por la Ley 2294 de 2023. Vigencia del texto actual no determinada | constitucion-empresa-colombia, venta-empresa-colombia |
| Ley 222 de 1995 | Confirmada | Gestor Normativo | Resumen del registro: incluye responsabilidad de administradores y cesión de cuotas. Artículos concretos sin verificar | constitucion-empresa-colombia, venta-empresa-colombia |
| Ley 1563 de 2012 (arbitraje) | Confirmada | Gestor Normativo | Vigente desde el 12 de octubre de 2012 según el registro. Artículos concretos sin verificar | venta-empresa-colombia |
| Ley 1581 de 2012 (datos personales) | Confirmada | Catálogo y Gestor Normativo | Reglamentada por el Decreto 1377 de 2013 y por el Decreto 1081 de 2015, según el registro. Vigencia del texto actual no determinada | venta-empresa-colombia |
| Ley 1437 de 2011 (CPACA) | Confirmada | Catálogo y Gestor Normativo | Seis modificaciones registradas en listado no exhaustivo. Vigencia no determinada | investigacion-juridica-colombia |
| Ley 1755 de 2015 (derecho de petición) | Confirmada | Catálogo y Gestor Normativo | Sustituye el título II, capítulos I a III, de la Ley 1437. Vigencia no determinada | investigacion-juridica-colombia |

## Normas no verificadas

Los códigos (Código de Comercio, Código Sustantivo del Trabajo, Código General del Proceso) y los artículos concretos citados en las skills no se han verificado en esta revisión. Siguen marcados como "a confirmar".

## Límites

No se verificó la vigencia del texto de ningún artículo. Las fuentes oficiales de la Corte Constitucional, la Rama Judicial y SAMAI devolvieron 403 desde el entorno de verificación.

## Segunda verificación (misma fecha, revisión de vicios y vacíos)

| Norma | Existencia | Observaciones del registro | Skills que la citan |
|---|---|---|---|
| Decreto 410 de 1971 (Código de Comercio) | Confirmada | Modificado por la Ley 2195 de 2022; adicionado por la Ley 2294 de 2023 | constitucion-empresa-colombia, venta-empresa-colombia |
| Decreto 2663 de 1950 (Código Sustantivo del Trabajo) | Confirmada | Modificado parcialmente por el Decreto 2606 de 1998 (listado no exhaustivo) | venta-empresa-colombia |
| Ley 1564 de 2012 (Código General del Proceso) | Confirmada | Expedido el 12 de julio de 2012 | revision-adversarial-colombia |
| Ley 1340 de 2009 (protección de la competencia) | Confirmada | Modificada por la Ley 2195 de 2022. Señala a la Superintendencia de Industria y Comercio como autoridad | venta-empresa-colombia |
| Ley 2294 de 2023 (Plan Nacional de Desarrollo 2022-2026) | Confirmada | Modifica, entre otras, la Ley 1258 de 2008, el Decreto 410 de 1971 y el Decreto Ley 624 de 1989 | constitucion-empresa-colombia, venta-empresa-colombia, investigacion-juridica-colombia |
| Decreto Ley 624 de 1989 (Estatuto Tributario) | Confirmada | Reglamentado y modificado por varias normas, incluida la Ley 2294 de 2023 | venta-empresa-colombia |

Las vigencias de los textos actuales y los artículos concretos siguen sin verificar en todos los casos.

## Pendientes

1. El archivo docs/rules/domain/professional-domain-disclaimer.md, que se pidió como regla de dominio, no existe en el repositorio ni en sus ramas.
2. La consulta de sentencias de la Corte Constitucional, la Rama Judicial y SAMAI sigue bloqueada (403) desde el entorno de verificación.

## Ampliación del catálogo (25 de octubre de 2026)

El catálogo `normas_col/datos/catalogo_funcion_publica.json` pasó de 13 a 33 normas. Se agregaron 20 normas: Códigos Penal (Ley 599 de 2000, ya estaba), de Procedimiento Penal (Ley 906, ya estaba), de Infancia (Ley 1098 de 2006), Disciplinario General (Ley 1952 de 2019), Disciplinario Único anterior (Ley 734 de 2002), Nacional de Policía (Ley 1801 de 2016), Penal Militar (Ley 1407 de 2010), Electoral (Decreto 2241 de 1986), Minas (Ley 685 de 2001), Recursos Naturales (Decreto 2811 de 1974), Comercio (Decreto 410 de 1971), Sustantivo del Trabajo (Decreto 2663 de 1950), Procesal del Trabajo (Decreto 2158 de 1948), Tributario (Decreto Ley 624 de 1989), Contencioso Administrativo anterior (Decreto 1 de 1984), Procedimiento Civil anterior (Decreto 1400 de 1970), más las leyes 1258, 222, 1563, 1340, 2294, 1116 y 1581 (esta última ya estaba).

Lo que el catálogo NO demuestra:

1. Vigencia de los textos actuales. Solo existencia y datos de expedición.
2. Que estén vigentes todas las normas que no están en el catálogo. La lista de códigos es parcial: faltan códigos como el de Procedimiento Penal Militar y reglamentos sectoriales.
3. El Código Civil (Ley 84 de 1873 y Ley 57 de 1887) no figura en el registro. Queda pendiente.

Situaciones detectadas en el registro:

1. Derogadas: Decreto 1 de 1984 (por la Ley 1437 de 2011, art. 309) y Decreto 1400 de 1970 (por la Ley 1564 de 2012, art. 626). La herramienta las marca como derogación registrada.
2. Inexequible: Ley 1407 de 2010 (Código Penal Militar). La herramienta ahora la marca como inexequibilidad registrada y no como vigencia no determinada.
3. Parcialmente derogada: Ley 734 de 2002, por la Ley 1952 de 2019.
4. Inconsistencia del registro: Código de Minas (Ley 685 de 2001), con fecha de publicación de 2003 en la ficha. Verificar en el Diario Oficial.
5. Sin fecha de vigencia en el registro: Código Nacional de Policía (Ley 1801 de 2016) y Ley 2294 de 2023.

## Estado definitivo de los pendientes (25 de octubre de 2026)

Cada pendiente tiene una decisión o un bloqueo identificado. Ninguno queda abierto sin dueño.

### Cerrados con decisión

1. Artículos concretos de las leyes. Decisión: las skills no citan artículos. El artículo aplicable lo determina el abogado en el texto vigente. Cerrado.
2. Vigencia del texto actual. Decisión: el sistema no determina vigencia. La registra como dato del Gestor (modificaciones, derogaciones, inexequibilidad) y deja la conclusión al abogado. Cerrado como límite de alcance.
3. URL de ejemplo de la Corte Constitucional (T-008/20). Decisión: eliminada de la skill. La URL oficial es el campo `official_url` que devuelve la herramienta. Cerrado.
4. Campo `tool_response` del hook. Decisión: el hook registra ahora las claves exactas del evento (`claves_del_evento`). La primera ejecución real documenta el formato. Cerrado en el código.
5. Código Civil (Ley 84 de 1873 y Ley 57 de 1887). Decisión: no figura en el registro, así que no se cita ni se agrega al catálogo. Cerrado.
6. Ley 1407 de 2010, inexequible. Decisión: el catálogo la marca como inexequibilidad registrada y no se cita como vigente. Cerrado.
7. Ley 685 de 2001, fecha de publicación inconsistente. Decisión: se cita solo la fecha de expedición (15 de agosto de 2001). La fecha de publicación no se usa. Cerrado.
8. Hooks repetidos en las diez skills de Spec Kit. Decisión: no se compactan. La duplicación es inocua y cambiarla requiere tocar la estructura de Spec Kit. Cerrado.

### Bloqueados por el entorno (confirmado el 25 de octubre de 2026 con `jac doctor --red`)

1. Relatoría de la Corte Constitucional, Rama Judicial, SAMAI y Socrata: 403. Consecuencia definida: ninguna sentencia de estas fuentes se cita en las skills. Desbloqueo: acceso de red a esos hosts.
2. Gestor Normativo con conexión directa: 403. El conector Croma sí responde y es la fuente usada para toda norma del catálogo.

### Bloqueados por falta de material del usuario

1. Texto de la licencia MIT de la fuente de Sprintlaw. Sin él no puedo cumplir la obligación de incluir el aviso de licencia completo. Lo que sí consta: autor Sprintlaw y licencia MIT, indicados en cada skill derivada. Desbloqueo: entregar el archivo LICENSE de la fuente, o confirmar que basta la atribución indicada.
2. Archivo `docs/rules/domain/professional-domain-disclaimer.md`. No existe en el repositorio ni en sus ramas. Desbloqueo: entregar el archivo o su contenido.
3. Ubicación de instalación del plugin. Decisión provisional: el paquete queda en la carpeta de trabajo, no en la configuración global. Desbloqueo: indicar la ruta de instalación deseada.

## Resolución con fuentes oficiales y repositorios (25 de octubre de 2026, segunda ronda)

Las fuentes oficiales colombianas no resuelven por DNS desde el entorno (`www.corteconstitucional.gov.co`, `www.funcionpublica.gov.co`, `www.suin-juriscol.gov.co`). Se usó Legal Data Hunter, que sí da acceso al texto de SUIN-Juriscol, Gestor Normativo, Secretaría del Senado y relatoría de la Corte Constitucional.

### Cerrados con texto de fuente oficial

1. Plazo del derecho de petición. Ley 1755 de 2015, artículo 14 (texto del Gestor Normativo, vía Legal Data Hunter): 15 días siguientes a la recepción en general; 10 días para peticiones de documentos e información, y 30 días para consultas. El parágrafo permite prorrogar, con aviso motivado, hasta el doble del plazo inicial. Cerrado.
2. Derogatoria del Código Contencioso Administrativo. Ley 1437 de 2011, artículo 309: deroga expresamente el Decreto 01 de 1984 (SUIN-Juriscol, Leyes/1680117#art=309). Cerrado. El catálogo ya lo registra.
3. Sentencia T-008/20. Existe en la relatoría oficial: https://www.corteconstitucional.gov.co/relatoria/2020/T-008-20.htm, expediente 7521422 (Legal Data Hunter, CO/DatosGovCo). Cerrado en cuanto a existencia y URL.
4. Código Civil. Existencia confirmada por referencia en fuentes oficiales: la Ley 1060 de 2006 ("el artículo 224 del Código Civil quedará así") y la Ley 1518 de 2012 lo modifican (Secretaría del Senado, vía Legal Data Hunter). No se localizó el texto del código. Decisión: se cita por nombre; no se citan artículos ni se reproduce texto. Cerrado.

### Conflicto que no se puede resolver con las fuentes disponibles

1. Ley 1407 de 2010 (Código Penal Militar). El registro dice "inexequible". La búsqueda en la relatoría no encontró sentencia que la declare inexequible, y la Sentencia C-252/12 rechaza cargos de inexequibilidad. El catálogo la marca como CONFLICTO sin resolver (estado `conflicto_sin_resolver`). Decisión: no citarla ni como vigente ni como inexequible. Para resolverla se necesita localizar la sentencia de constitucionalidad completa, lo que requiere la relatoría oficial (ver punto 4 de bloqueados).

### Repositorios revisados

1. Jorgecortes1975/abogados-jac: plantilla de chatbot de Vercel (licencia Apache, Vercel, 2024). No contiene el archivo de reglas ni normas colombianas.
2. Jorgecortes1975/Clauderoutines1: vacío.
3. Jorgecortes1975/jacabogados: revisado; no contiene el archivo de reglas.
4. Sprintlaw/legal-skills: GitHub devuelve 404 para la URL pública, y el conector no lo tiene en alcance. No se pudo leer ni la licencia ni el disclaimer.

### Bloqueados que siguen abiertos

1. Archivo `docs/rules/domain/professional-domain-disclaimer.md`: no existe en ninguno de los tres repositorios revisados. Necesito que lo pases o me digas dónde está.
2. Texto de la licencia MIT de Sprintlaw: no accesible. Necesito el archivo LICENSE de la fuente, o confirmación de que basta la atribución.
3. Ruta de instalación del plugin: decisión del usuario.
4. Relatoría oficial de la Corte Constitucional y SUIN-Juriscol directo: sin DNS desde el entorno. Las consultas se hacen por Legal Data Hunter y Croma, que sí responden.
