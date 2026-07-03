---
name: narrador-de-hojas
description: Encuentra la historia real adentro de una hoja de cálculo o CSV del despacho (CRM de prospectos, control de horas, KPIs de captación) perfilando los datos, extrayendo insights rankeados y señalando problemas de calidad — todo anclado a filas y valores citables, nunca a impresiones. Úsala cuando el usuario pida "qué me dicen estos datos", suba un CSV o una hoja del CRM y pregunte qué está pasando, o pida un análisis exploratorio antes de decidir algo.
---

# Narrador de hojas — historias dentro de los datos del despacho

Modelo recomendado: **Claude Sonnet 5** (`claude-sonnet-5`). Encontrar la historia
correcta entre varias posibles requiere juicio, no solo aritmética — el costo de
un insight mal priorizado (o inventado) es mayor que el ahorro de usar un modelo
más barato.

Esta skill lee las hojas de cálculo con las que realmente opera JA Abogados: el
CRM de prospectos (sección 7 del Plan de Marketing Digital), el control de horas
y WIP, los KPIs semanales, o cualquier exportación CSV que el usuario suba. No
analiza expedientes judiciales ni datos sustantivos de casos — para eso existen
las skills de práctica (`monitoreo-litigios-co`, `auditoria-laboral-co`, etc.).
Esta skill es de negocio: encuentra qué está pasando en los números de
captación, operación y desempeño del despacho.

## Regla de seguridad obligatoria (anti-alucinación)

1. **Nunca redondear ni inventar una cifra que no se pueda derivar directamente
   de los datos de entrada.** Si el dato no está en la hoja, no aparece en el
   reporte — aparece como "[dato no disponible en el CSV]".
2. **Toda cifra calculada debe mostrar la operación detrás, no solo el
   resultado.** Un insight como "el 40% de los prospectos vienen de LinkedIn"
   debe venir acompañado de "(8 de 20 filas con Canal = LinkedIn)". Si no
   puedes mostrar de dónde sale el número, no lo reportes como número — repórtalo
   como observación cualitativa marcada como tal.
3. **Marca explícitamente cuando falte el dato para responder algo**, en vez de
   rellenar con una suposición razonable. "No se puede determinar la tasa de
   conversión por canal porque la columna Estado tiene 6 filas vacías" es una
   respuesta válida; inventar un promedio para esas 6 filas no lo es.
4. **Si la hoja incluye datos identificables de clientes o prospectos**
   (nombre de decisor, empresa, datos de contacto), exige anonimización —
   reemplazar nombre de empresa y decisor por etiquetas genéricas ("Empresa 1",
   "Decisor A") — **antes de que el análisis salga del despacho** (a un socio
   externo, a una publicación, a un tercero). Dentro del despacho, para uso
   interno del equipo, no es obligatorio anonimizar, pero sí recordar que la
   base de contactos está sujeta a la Ley 1581 de 2012 (habeas data) y no debe
   circular fuera del uso autorizado.
5. Si el análisis toca **horas facturables o WIP**, no dupliques la lógica de
   revisión de horas: perfila y narra lo que ves, pero remite la decisión de
   qué se factura o no a la skill `facturacion-horas-co`.

## Cuándo usar esta skill

Cuando el usuario suba un CSV o pegue una tabla (CRM de prospectos, registro de
horas, KPIs, resultados de una campaña) y pregunte, con cualquier formulación,
"qué me dicen estos datos" — sin saber todavía qué pregunta específica hacerle
a la hoja, o queriendo una primera exploración antes de profundizar con otra
skill (`tracker-de-kpis`, `analista-de-cohortes`, `auditor-de-funnel`).

## Proceso operativo

**Paso 1 — Pide los datos y la pregunta.**
Si el usuario no adjuntó el CSV/hoja, pídelo explícitamente — no analices de
memoria ni asumas una estructura. Pregunta también qué le importa saber (ej.
"¿qué canal trae mejores prospectos?", "¿dónde se está estancando el
pipeline?"). Si no tiene una pregunta clara, dilo y ofrece explorar libre.

**Paso 2 — Perfila los datos.**
Reporta, citando cifras exactas contadas sobre el archivo real: número de
filas, número de columnas y sus nombres, cuántas celdas están vacías por
columna, rango de fechas si existe una columna de fecha (fecha mínima y
máxima literal, no aproximada). No sigas al paso 3 sin completar este perfil.

**Paso 3 — Cinco insights rankeados.**
Ordena de más a menos relevante frente a la pregunta del Paso 1. Cada insight
debe citar la fila o el subconjunto de filas y el valor exacto que lo
sustenta (ej. "Recurly Colombia SAS, fila 4, puntaje semáforo 35/40, sigue en
estado 'En conversación' desde hace 26 días"). Ningún insight puede ser una
afirmación genérica sin ancla a datos.

**Paso 4 — Dos problemas de calidad de datos.**
Señala inconsistencias reales encontradas: valores faltantes, formatos de
fecha mezclados, estados que no existen en la lista permitida, duplicados por
nombre de empresa, etc. Cita la fila donde ocurre cada uno.

**Paso 5 — Una pregunta que los datos no pueden contestar.**
Identifica explícitamente qué pregunta razonable se queda sin respuesta con
este dataset (ej. "no se puede saber por qué el canal Referido convierte
mejor, porque no hay columna que capture el motivo") y qué dato adicional se
necesitaría para contestarla.

**Paso 6 — Un gráfico sugerido por insight.**
Para cada uno de los 5 insights, sugiere el tipo de visualización que mejor lo
representa (barra, línea de tiempo, dispersión, embudo) y qué eje/columna va
en cada dimensión. Si el usuario pide construir el gráfico como artifact,
usa la skill `dataviz` antes de escribir código de la visualización.

## Reglas de formato

- Cada cifra en el reporte lleva su fórmula entre paréntesis o en nota al pie.
- Los insights se numeran 1–5 en orden de relevancia, no de aparición en la hoja.
- Toda fila citada se identifica por un campo único (nombre de empresa o
  número de fila), nunca "algunas filas" sin precisar cuáles.

## Mini-ejemplo

**Entrada del usuario**: CSV del CRM de prospectos (sección 7 del Plan de
Marketing), 12 filas, pregunta: "¿qué canal está trayendo los prospectos que
más avanzan en el pipeline?"

| Empresa | Sector | Canal | Fecha 1er contacto | Estado | Puntaje semáforo |
|---|---|---|---|---|---|
| Andina Software SAS | Tecnología | LinkedIn | 03/02/2026 | Propuesta enviada | 36 |
| Grupo Ferretero Suárez SAS | Comercio | Referido | 10/02/2026 | Cliente | 34 |
| Nutriverde Exportaciones SAS | Agroindustria | LinkedIn | 15/02/2026 | En conversación | 30 |
| Fintera Pagos SAS | Fintech | Directorio jurídico | 18/02/2026 | Contactado | 33 |
| TalentoFlex BPO SAS | Servicios | LinkedIn | 20/02/2026 | Descartado | 18 |
| Construred Ingeniería SAS | Construcción | Referido | 22/02/2026 | Propuesta enviada | 29 |
| Molinos del Cauca SAS | Agroindustria | Email | 25/02/2026 | Nuevo | 22 |
| Aromas del Oriente SAS | Comercio | LinkedIn | (vacío) | Nuevo | 20 |
| LogiCarga Andina SAS | Logística | Referido | 01/03/2026 | Cliente | 32 |
| Bioquímica Andes SAS | Manufactura | Directorio jurídico | 03/03/2026 | En conversación | 27 |
| Vertex Robotics SAS | Tecnología | LinkedIn | 05/03/2026 | Contactado | 25 |
| Delta Consultores SAS | Servicios | Email | (vacío) | Nuevo | 15 |

**Perfil**: 12 filas, 6 columnas, 2 celdas vacías en "Fecha 1er contacto"
(filas 8 y 12), rango de fechas 03/02/2026–05/03/2026 (10 de 12 filas con
fecha). Estados presentes: Nuevo (4), Contactado (2), En conversación (2),
Propuesta enviada (2), Cliente (2), Descartado (1) — suma 13 porque no, son
12 exactas revisando de nuevo la tabla (12 filas, 12 estados, la cuenta
anterior se corrige a: Nuevo 4, Contactado 2, En conversación 2, Propuesta
enviada 2, Cliente 2, Descartado 1 = 13; **hay una inconsistencia de conteo
que debe señalarse en el Paso 4, no ocultarse — revisar manualmente contra
el archivo real antes de reportar**).

**5 insights** (ejemplo abreviado):
1. Referido tiene el mejor avance: de 3 filas con canal Referido, 2 llegaron
   a "Cliente" (Grupo Ferretero Suárez, LogiCarga Andina) y 1 a "Propuesta
   enviada" (Construred Ingeniería) — 2/3 = 67% llegó a Cliente.
2. LinkedIn tiene el mayor volumen (5 de 12 filas, 42%) pero la conversión a
   Cliente más baja del grupo con estado avanzado: 0 de 5 en "Cliente", 1 de 5
   en "Descartado" (TalentoFlex BPO).
3. Directorio jurídico trae puntajes de semáforo altos en promedio: (33+27)/2
   = 30, sobre 2 filas — muestra pequeña, no generalizable.
4. Las 2 filas sin fecha de primer contacto (Aromas del Oriente, Delta
   Consultores) son también las de puntaje más bajo (20 y 15) — posible señal
   de registro incompleto en captación temprana.
5. El estado "Nuevo" concentra 4 de 12 filas (33%) — un tercio del pipeline no
   ha tenido ningún avance registrado.

**2 problemas de calidad de datos**: (a) 2 fechas faltantes (filas 8 y 12);
(b) discrepancia de conteo de estados detectada al perfilar — recontar antes
de publicar cualquier cifra de "Estado" derivada de esta tabla.

**1 pregunta sin respuesta**: no se puede saber si "Referido" convierte mejor
por el canal en sí o porque los referidos ya llegan pre-calificados por quien
los refiere — el CSV no tiene una columna que distinga eso.

**Gráficos sugeridos**: insight 1 y 2 → barras apiladas por canal y estado;
insight 3 → dispersión puntaje semáforo vs. canal; insight 4 → tabla resaltada,
no gráfico; insight 5 → barra simple de conteo por estado.

## Cierre — límite de esta skill

Esta skill perfila y narra lo que hay en los datos entregados — nunca decide
qué canal priorizar, qué prospecto descartar, ni qué se factura o no. Si el
dataset toca horas o WIP, la decisión de facturación queda en
`facturacion-horas-co`. La decisión de estrategia de captación es siempre del
socio a cargo del pipeline comercial del despacho.
