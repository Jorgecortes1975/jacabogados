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
