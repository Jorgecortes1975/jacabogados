# Sistema de Análisis Legal desde Search Console
## Para JAC Abogados - Integración con GAL y 10 Agentes Especializados

---

## 📊 GRUPO 1: DIAGNÓSTICO E INVENTARIO
### Paso 1: Inventario de Exportación Legal
**Contexto:** Determina qué tienes, cuánto historial real y si los datos están truncados.

```
Dentro de esta carpeta están los archivos que exporté de Google Search Console. 
Los nombres pueden estar en español o en inglés según el idioma en el que tenía la interfaz.

Ábrelos y hazme un inventario LEGAL antes de analizar nada:

1. Lista cada archivo con cuántas filas tiene y qué columnas trae.
2. Dime el rango de fechas real que cubre la exportación (búscalo en el archivo de fechas y en el de filtros).
3. Dime si el archivo de filtros indica que apliqué algún filtro al exportar: rama legal específica (laboral/penal/civil/comercial/corporativo/administrativo), página o sección del sitio.
4. Dame los totales del periodo: clics, impresiones, CTR promedio y posición promedio.
5. Revisa si el archivo de consultas y el de páginas tienen exactamente 1000 filas. Si es así, avísame en negritas: significa que Google truncó los datos y que lo que estoy viendo son solo mis filas más grandes (mis casos de referencia), no todas las búsquedas reales.

CONTEXTO ADICIONAL:
- Soy abogado en Colombia especializando en: laboral, penal, civil, administrativo, comercial y corporativo.
- Mi audiencia busca: demandas, acuerdos, procedimientos, jurisprudencia, protección de derechos.
- Los temas que me interesan son búsquedas que traigan clientes con casos o documentación legal.

No analices oportunidades todavía. Solo quiero saber con qué estoy trabajando.
```

---

## 🎯 GRUPO 2: IDENTIFICACIÓN DE HUECOS (3 CORTES DISTINTOS)

### Paso 2A: Huecos de Contenido Legal (Sin página propia)
**Contexto:** Google te muestra para ese tema legal pero no tienes contenido específico. Necesitas escribir.

```
Usa el archivo de consultas de mi exportación de Search Console.

Quiero encontrar huecos de contenido legal: búsquedas donde ya aparezco pero para las que no tengo una página dedicada.
Búsquedas que significan que hay demandantes, gente en conflicto, o que necesitan asesoría legal.

Hazlo así:
1. Quédate solo con las consultas que tengan impresiones relevantes dentro de mi escala. No uses un número fijo: mira la distribución de mi archivo y elige tú el corte, y dime cuál elegiste y por qué.
2. Descarta las consultas que no son legales:
   - Consultas de marca (Nombre de mis competidores, firmas rivales, abogados específicos que no soy yo)
   - Búsquedas puramente informativas sin intención legal (definiciones genéricas, historia del derecho)
   - Consultas que no llevan a un cliente potencial
3. Agrupa las consultas restantes por rama legal Y por tema, no por texto exacto. Diez formas de preguntar por un mismo procedimiento laboral son un solo hueco, no diez.
4. Para cada grupo dime: 
   - Rama legal (laboral/penal/civil/administrativo/comercial/corporativo)
   - El tema en una frase (ej: "cálculo de indemnización por despido sin justa causa")
   - Las consultas que lo forman (lista de búsquedas reales)
   - Las impresiones sumadas
   - La posición promedio
   - Los clics totales
   - Quién podría ser mi cliente (demandante/demandado/ambos)
5. Ordena los grupos por impresiones sumadas, de mayor a menor.

AVISO IMPORTANTE: El archivo de páginas y el de consultas son tablas independientes, no traen la relación de qué página rankea para qué consulta. Así que NO adivines qué página cubre cada tema. Si quieres confirmarlo, dime qué páginas debo filtrar y volver a exportar.

Devuélvemelo como tabla con las columnas: Rama | Tema | Consultas | Impresiones | Posición | Clics | Perfil Cliente
```

### Paso 2B: Zona de Casi (Posición 8 a 20)
**Contexto:** Ya estás cerca de la primera página. No escribas, mejora lo que existe. El salto aquí es barato.

```
Usa el archivo de consultas de mi exportación de Search Console.

Quiero la lista de las búsquedas legales donde estoy cerca de la primera página pero no entro: posición promedio entre 8 y 20.

Para cada una dame: 
- La consulta exacta (tal como la escribe la gente)
- La rama legal (laboral/penal/civil/administrativo/comercial/corporativo)
- La posición promedio
- Las impresiones
- Los clics
- El CTR

Después ordénalas poniendo arriba las que más me convienen, y explícame el criterio que usaste. La lógica que quiero es esta: entre dos consultas en la misma posición, vale más la que tiene más impresiones, porque el mismo empujón rinde más tráfico y clientes potenciales.

Al final sepáralas en dos grupos y dímelo claro:
- Las que ya tienen una página mía apuntando al tema legal específico y solo necesitan que esa página mejore (título, descripción, profundidad).
- Las que no tienen nada propio y necesitan contenido nuevo dedicado.

Si no puedes distinguir entre los dos grupos con los archivos que te di, dímelo en vez de suponerlo: el export de la interfaz no trae la relación consulta-página.

ORDENAMIENTO SUGERIDO: Primero impresiones altas en zona 8-15 (más rentable). Después impresiones medianas en 16-20 (más fácil de mover).
```

### Paso 2C: Sales Alto Pero No Te Dan Clic (CTR Bajo - Posición 1 a 10)
**Contexto:** El título y descripción no convencen. No escribas, reescribe metadatos. Es lo más rápido de los tres.

```
Usa el archivo de consultas y el de páginas de mi exportación de Search Console.

Quiero detectar dónde estoy perdiendo clics que ya me había ganado en temas legales.
Estos son los clientes que buscan pero no entran porque el resultado no les llamó la atención.

1. En el archivo de consultas, encuentra las búsquedas donde tengo una posición promedio de 1 a 10 pero un CTR claramente por debajo de lo que se esperaría en esa posición. Compara contra el CTR promedio de mis propias filas en posiciones parecidas, no contra tablas de internet.

2. Para cada caso:
   - La consulta
   - Rama legal
   - Posición promedio
   - CTR actual
   - CTR promedio de mis filas en esa posición (el que debería tener)
   - Brecha (diferencia)

3. Ordena por clics potenciales recuperables: (impresiones × diferencia de CTR).

4. Dime para cada una cuánto tráfico adicional tendría si el CTR subiera al promedio de mis filas en esa misma posición. Preséntalo como un rango (es una estimación, no una promesa).

No me propongas todavía títulos nuevos. Primero quiero ver dónde está la fuga y cuánto vale.
```

### Paso 2D: Canibalización (Opcional - Solo si tienes múltiples exportaciones filtradas por página)
**Contexto:** Dos páginas tuyas compiten por lo mismo. Ambas rankean peor. Necesitas elegir una.

```
Te voy a dar varias exportaciones de Search Console, cada una filtrada por una página distinta de mi sitio. 
En cada carpeta, el archivo de filtros dice a qué página corresponde.

Quiero detectar canibalización legal: consultas sobre el mismo tema de derecho para las que más de una de mis páginas está apareciendo.

1. Cruza las consultas de cada página filtrada y encuentra las que se repiten en dos o más páginas.
2. Para cada consulta repetida, dime en qué páginas aparece, con qué posición promedio y con cuántas impresiones en cada una.
3. Márcame los casos serios: cuando dos páginas tienen posiciones parecidas para la misma consulta, están dividiendo la señal y ambas rankean peor.
4. Para cada caso serio, propón cuál de las dos páginas debería quedarse el tema legal y por qué, según:
   - Cuál tiene mejor posición
   - Cuál tiene más impresiones acumuladas
   - Cuál tiene intención más cercana a la búsqueda
   - Cuál es más reciente o está mejor desarrollada

No me digas que fusione o redirija páginas sin explicarme qué pierdo si lo hago.
```

---

## 🔍 GRUPO 3: FILTRADO Y PRIORIZACIÓN

### Paso 3: Tabla de Qué Hago Primero (Priorización Legal)
**Contexto:** Junta los tres cortes, filtra por intención y esfuerzo real. Este es tu calendario del mes.

```
Ya tienes mis huecos de contenido legal, mi zona de casi y mis fugas de CTR.
Júntalo todo en una sola tabla priorizada para abogado.

Para cada oportunidad quiero:
- La consulta o tema legal
- Rama del derecho (laboral/penal/civil/administrativo/comercial/corporativo)
- Tipo de oportunidad: 
  * "Contenido nuevo" (artículo/demanda/guía que no existe)
  * "Mejorar página existente" (profundidad, jurisprudencia, casos)
  * "Reescribir título y descripción" (solo metadatos)
- Impresiones actuales
- Posición actual
- Perfil de cliente (quién busca esto: demandante/demandado/abogado/empresa)
- El esfuerzo, en alto, medio o bajo:
  * BAJO = Reescribir metadatos (1-2 horas)
  * MEDIO = Mejorar página existente (4-8 horas)
  * ALTO = Escribir contenido nuevo completo (8-24 horas)
- Una nota de una línea con el porqué

Ordénalas por lo que yo haría primero si solo tuviera tiempo para cinco cosas este mes:
1. Primero: Esfuerzo BAJO + impresiones ALTAS (recupero clics rápido)
2. Segundo: Esfuerzo MEDIO + zona casi (bajo riesgo, alto retorno)
3. Tercero: Esfuerzo BAJO + alto potencial (costo nulo, impacto inmediato)
4. Cuarto: Esfuerzo ALTO + impresiones muy altas (larga cola, mucho potencial)

Y ahora lo difícil: quítame de la lista las oportunidades que NO debería perseguir aunque los números se vean bien.
Sepáralas en una sección "DESCARTADAS - Por qué no las hago" y dime exactamente por qué las sacas:

- Búsquedas que no tienen nada que ver con lo que ofrezco (asesoria, litigios, documentos)
- Búsquedas con marca de competidores (No voy a posicionarme por marca ajena)
- Temas donde compito contra Wikipedia, Banco de la República, Superintendencias (terreno perdido a priori)
- Búsquedas puramente informativas que nunca llevan a un cliente (definiciones, historia legal)
- El volumen fantasma (3-5 impresiones en 16 meses, es ruido, no tendencia)

Explicaciones claras: para cada fila descartada dime textualmente por qué no merece mi tiempo, para que yo pueda estar en desacuerdo si quiero.

RESULTADO: Una tabla corta y ejecutable. Si tiene más de 10 oportunidades, redúcelas a 10.
```

---

## ✍️ GRUPO 4: PRODUCCIÓN DE CONTENIDO

### Paso 4A: Brief Antes del Artículo Legal
**Contexto:** No escribas aún. Primero, estructura qué responde y qué datos tuyos entran.

```
Toma la oportunidad número [PON EL NÚMERO] de la tabla priorizada.

Antes de escribir nada, ármame un brief legal completo:

1. La búsqueda principal y las variantes que agrupamos en ese tema.
   Ejemplo: "cálculo indemnización despido sin justa causa" + "cuánto me pagan si me despiden injustamente" + "tabla despidos injustificados 2026"

2. Quién busca esto de verdad (analiza por rama y tipo de cliente):
   - ¿Busca entender algo (informativo)?
   - ¿Busca comparar opciones (evaluativo)?
   - ¿Ya está listo para contratar un abogado (transaccional)?
   - ¿Es un demandante buscando defensa o un demandado buscando defensa?

3. Qué tendría que contestar la página para que esa persona se dé por servida y NO vuelva a Google:
   - Qué preguntas clave necesita respuesta
   - Qué cálculos o fórmulas específicas
   - Qué jurisprudencia aplicable (sentencias reales, no genéricas)
   - Qué pasos procedimentales específicos

4. Un esquema con los encabezados propuestos, en el orden que debe ir:
   Estructura sugerida para legal:
   - Síntesis ejecutiva (una frase que responda la pregunta)
   - Definición del problema legal (qué es, norma aplicable)
   - Requisitos o elementos (Art. XX, Ley XXX)
   - Jurisprudencia verificada (Corte Suprema, Consejo de Estado, Corte Constitucional)
   - Cálculos específicos (si aplica)
   - Procedimiento paso a paso
   - Defensas esperadas y contramedicinas
   - Casos reales o ejemplos verificados
   - Cuándo actuar y con quién (abogado, autoridad)

5. Qué preguntas concretas debe responder el texto de forma directa y corta:
   (Esto permite que se extraiga como respuesta en buscadores de IA tipo ChatGPT, Perplexity)

6. **Lo más importante - Qué datos, ejemplos o capturas hacen falta que SOLO YO puedo dar:**
   - Cuántos casos de este tipo he llevado
   - Cuánto tiempo toma (mi experiencia real)
   - Cuánto cuesta (mis honorarios, no promedios de internet)
   - Documentos reales que demuestren el proceso (formatos de demanda, respuestas, sentencias anónimas)
   - Objeciones que tus clientes te hacen por teléfono
   - Errores que ha visto los clientes cometer antes de contratar
   - Resultados que ha logrado (sentencias favorables, acuerdos, cifras)

**Ese último punto es el crítico**: Si el brief te pide material tuyo y no tienes nada que poner, la oportunidad no es para esta semana. 
Sin datos propios, el artículo va a sonar como los otros 50 en internet y no va a rankear por encima.

Todavía no escribas el artículo. Solo quiero el brief estructurado.
```

### Paso 4B: Artículo Completo (Con Datos Legales Propios)
**Contexto:** Con el brief aprobado y tu material dentro. Uno a la vez, no en lote.

```
Con el brief que ya aprobamos y la información que te di, escribe el artículo completo para posicionarse en Search Console.

Reglas de redacción LEGAL:

- Responde la pregunta principal en los primeros dos párrafos. No hagas introducción larga antes de llegar al punto.
- Cada encabezado del esquema debe poder leerse solo, sin leer el resto, y tener sentido completo.
- Donde haya una pregunta concreta, contéstala en dos o tres oraciones antes de desarrollarla. Directo primero, contexto después.
- Usa mis datos y mis ejemplos donde los di. Si te di un porcentaje de éxito, un plazo que toma, un costo, inclúyelo.
- Cita jurisprudencia verificada: si digo "La Corte Suprema ha establecido..." dame la sentencia, el año y la ratio decidendi.
- Nunca inventes estadísticas, fechas, estudios ni citas. Si un dato hace falta, déjame una marca clara en vez de rellenarla tú.
  Formato: [FALTA: Verificar porcentaje de casos ganados en demandas de este tipo en juzgados de Bogotá]
- No repitas la búsqueda una y otra vez para forzar la keyword. Escribe como se habla en un caso legal.
- Español natural, sin frases de relleno ni clichés.
- Si menciono un artículo de código, pon el código exacto y la norma:
  Formato: "(Art. 57, Código Sustantivo del Trabajo)"
- Estructura los ejemplos: describe el caso real, muestra cómo se aplicó la norma, y el resultado que se logró.

Cuando termines:
1. Dime en una lista aparte qué le falta al texto para publicarse:
   - Qué imágenes (diagramas procedimentales, plantillas de demanda, tablas de cálculo)
   - Qué enlaces internos a otras páginas mías (otras ramas, procedimientos relacionados)
   - Qué debería verificar yo personalmente antes de subirlo (citas, fechas, cifras)
   - Qué documentos anónimos podría adjuntar (modelos de demanda, respuestas)

2. Identifica el tono: ¿suena como escrito por abogado o como texto generado? Si detectas tono de IA, dímelo.

Regla dura: NINGÚN dato que no puedas rastrear hasta su fuente.
Una cifra inventada en una página de legal que rankea es una bomba: se queda meses, alguien la cita, y el que queda mal cuando se verifica eres tú.

Si el dato no lo tienes verificado, sale del artículo o queda marcado.
```

---

## 🔧 GRUPO 5: AUDITORÍA Y PUBLICACIÓN

### Paso 5A: Auditar con Plugin (Sin Código)
**Contexto:** La página está publicada. Ahora que Google y los buscadores de IA la puedan leer.

```
Audita esta página con el plugin de SEO que tengo instalado: [PEGA AQUÍ LA URL]

Quiero las dos notas por separado:
1. SEO de Google (títulos, metadatos, estructura)
2. Visibilidad en buscadores de IA (datos estructurados, respuestas directas, llms.txt)

Y que NO me las promedies en una sola.

Para cada problema que encuentres dime:
- Qué está mal, en una frase
- Qué tan grave es y por qué me afecta (especialmente en derecho: ¿pierde Google mi página? ¿No pueden citarla los buscadores de IA?)
- Qué evidencia encontraste en la página
- Cómo compruebo yo mismo que es cierto

Al final, sepárame los hallazgos en tres grupos:
1. AUTOMÁTICOS: Los que se arreglan automáticamente (metadatos, JSON-LD, robots, canónicas)
2. POR APROBAR: Los que necesitan tu sí (títulos, descripciones, enlaces internos)
3. SOLO RECOMENDACIÓN: Los que son sugerencias tuyas (mejoras de contenido, rendimiento)

No cambies ningún archivo todavía. Solo quiero el diagnóstico completo.
```

### Paso 5B: Reescribir Títulos y Descripciones Que No Ganan Clics
**Contexto:** Para las búsquedas donde estás en posición 1-10 pero CTR bajo. Cambias dos líneas, suben los clics.

```
Toma la lista de consultas/páginas con buena posición y CTR bajo que sacamos de Search Console.

Para cada una, escríbeme tres opciones nuevas de título y de meta descripción.

Reglas para los TÍTULOS (en contexto legal):
- Que quepan sin cortarse en el resultado de búsqueda de Google (máx. 55-60 caracteres, dime el largo exacto de cada opción)
- Que contengan la búsqueda real por la que la gente llega (ej: si buscan "cómo cobrar un pagaré incumplido", no puedo poner "Cobro de Cartera - Explicado")
- Que digan qué se lleva la persona si entra (Ej: "Cálculo de indemnización por despido - Tablas 2026" > "Despido sin Justa Causa")
- Que incluyan la rama legal si es evidente (Ej: "Demanda Laboral" vs. "Demanda Penal" son cosas distintas)
- Sin mayúsculas de más, sin signos de exclamación, sin "guía definitiva"
- En tono abogado, no en tono marketing

Reglas para las DESCRIPCIONES (en contexto legal):
- Que continúen el título en vez de repetirlo
- Que hagan urgente actuar (ej: "Prescripción en 3 años desde que descubres el daño" > "Leer más")
- Que respondan la objeción de quien duda si el artículo le sirve (ej: "Aplica a demandas de cualquier sector, no solo privado")
- Que mencionen lo que única mi página tiene (jurisprudencia verificada, calculadora de daños, modelo de demanda)
- Sin prometer nada que la página no tenga de verdad
- Máx. 155-160 caracteres

Para cada opción dime en una línea por qué crees que ganaría el clic frente al título actual.
Ponme al lado el título actual, para comparar.

Formato:
| Opción | Título | Largo | Descripción | Largo | Por qué gana | vs. Actual |

No las apliques todavía. Quiero revisar y elegir.
```

---

## 📈 GRUPO 6: MEDICIÓN Y COMPARACIÓN

### Paso 6: Medir a las Seis Semanas (Cierre del Ciclo)
**Contexto:** Volviste a exportar. Compara contra la exportación vieja. ¿Funcionó?

```
Te voy a dar dos exportaciones de Search Console: la vieja (donde decidimos qué escribir) y la nueva (que acabas de bajar hace poco).

Compáralas y dime si funcionó mi estrategia legal.

1. Para cada tema/consulta en el que publiqué o mejoré algo, dime:
   - Consulta
   - Rama legal
   - Cómo se movió la posición promedio (posición vieja → posición nueva)
   - Cómo se movieron las impresiones
   - Cómo se movieron los clics
   - El cambio en porcentaje

2. Sepárame lo que SUBIÓ (gané posiciones, impresiones o clics), lo que se quedó IGUAL, y lo que BAJÓ.

3. Dime qué consultas NUEVAS aparecieron que no estaban en la exportación vieja. Esas son las que gané de cero.

4. Dime qué consultas DESAPARECIERON (si desaparecieron, no si bajaron a la fila 1001).

5. Con eso, arma la lista de qué hago en la siguiente vuelta (va al paso 2, ciclo nuevo).

DOS ADVERTENCIAS antes de sacar conclusiones:

TRAMPA 1: El techo de las mil filas.
Si los dos archivos tienen exactamente 1000 filas en consultas O páginas, la cola larga no es comparable.
Una búsqueda puede haber "desaparecido" solo porque otra creció y la empujó fuera del corte. No se cayó, se salió de la foto.
Avísame si pasa.

TRAMPA 2: Los periodos.
Si un archivo cubre 30 días y el otro 45, o si uno cae en temporada alta de demandas laborales y el otro en temporada muerta, las cifras no se pueden leer de frente.
Si los periodos no son iguales, dímelo antes de conclusiones.

RESULTADO: Una lista de lo que funcionó, lo que no, y qué cambio hago en la siguiente exportación.
Esto cierra el ciclo: exportas → analizas → escribes → publicas → auditas → esperas 6 semanas → comparas → repites.
```

---

## 🔗 MAPEO AL SISTEMA GAL

### Integración con Agentes (10 Agentes Especializados)

| Paso | Prompt | Agente GAL Asignado | Descripción |
|------|--------|-------------------|-------------|
| 1 | Inventario | Agente 8: Extracción de Datos | Lee CSV, estructura información |
| 2A | Huecos de Contenido | Agente 1: Síntesis Normativa | Agrupa por rama legal, identifica temas |
| 2B | Zona de Casi | Agente 5: Prescripción | Prioriza por posición, esfuerzo |
| 2C | CTR Bajo | Agente 4: Análisis de Prueba | Detecta fugas, calcula impacto |
| 2D | Canibalización | Agente 6: Legitimación | Resuelve conflictos entre páginas |
| 3 | Priorización | Agente 10: Puntuación Final | Ranking ejecutable |
| 4A | Brief Legal | Agente 2: Jurisprudencia | Estructura con jurisprudencia |
| 4B | Artículo Completo | Agente 3: Análisis de Procedimiento | Redacta con normas aplicables |
| 5A | Auditoría Plugin | Agente 7: Competencia/Readabilidad | Verifica lectura Google + IA |
| 5B | Títulos y Descripciones | Agente 9: Contramedicinas | Redacta títulos defensivos |
| 6 | Comparación 6 Semanas | Agente 10: Puntuación Final | Valida resultados, ciclo nuevo |

---

## ⚙️ INSTALACIÓN Y EJECUCIÓN

### Comandos de Instalación (Previos)
```bash
# 1. Agrupar prompts en un archivo único
node installador-prompts-legal-sc.js agrupar

# 2. Integrar con GAL (Gestor Automático Legal)
node gal-automatizacion.js integrar-search-console

# 3. Validar que los 10 agentes leen el archivo
node agentes-10-independientes.js validar-prompts-sc

# 4. Activar el sistema de loops automáticos (diario: exportación > análisis > escritura)
node loops-agentes-automaticos.js activar-ciclo-search-console

# 5. Activar webhooks de nuevo contenido publicado
node hooks-eventos.js activar contenido-publicado
```

### Ejecución en Orden (Claude Code)
```
Carpeta: /home/user/jacabogados

1. Descarga el CSV de Search Console (16 meses, todas las ramas)
2. Guárdalo en: /home/user/jacabogados/search-console-2026-08-12/
3. Abre Claude Code en esa carpeta
4. Copia EXACTAMENTE este prompt:

[COPIAR EL PROMPT DEL PASO 1 - INVENTARIO]

5. Espera el inventario completo
6. Copia el prompt del paso que sigue (2A, 2B, etc.)
7. Repite hasta llegar a paso 6 (comparación)
```

---

**Guía de Integración JAC + Search Console + GAL**  
Versión 1.0 | 12 de Agosto 2026  
Adaptada de: "Google ya te dijo qué escribir" (11 paradas)  
Especializada en: Derecho Colombiano | 6 Ramas | 10 Agentes | Zero Alucinaciones
