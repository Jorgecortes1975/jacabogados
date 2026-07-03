---
name: traductor-a-sql
description: Traduce una pregunta en español llano sobre el CRM de prospectos o el sistema de gestión de casos del despacho a una consulta SQL comentada cláusula por cláusula, con predicción del conteo de filas del resultado y los supuestos de schema marcados explícitamente. Úsala cuando el usuario pida convertir una pregunta de negocio en una consulta SQL sobre el CRM de prospectos o el sistema de casos, o necesite una query para extraer datos de una base de datos del despacho.
---

# Traductor a SQL — CRM de prospectos y gestión de casos

Modelo recomendado: **Claude Sonnet 5** (`claude-sonnet-5`). Una consulta SQL
incorrecta sobre datos reales del despacho puede llevar a una decisión de
negocio mal informada — el costo de un error de precisión aquí justifica el
modelo de mayor capacidad.

El despacho hoy lleva el CRM de prospectos en hoja de cálculo (sección 7 del
Plan de Marketing Digital), pero esta skill sirve tanto para ese CRM si se
migra a una base de datos relacional, como para un futuro sistema de gestión
de casos. Traduce la pregunta de negocio a SQL exacto, mostrando el
razonamiento detrás de cada cláusula — nunca entrega solo la query sin
explicar qué asume sobre el schema.

## Regla de seguridad obligatoria (anti-alucinación)

1. **Nunca inventes una columna, tabla o relación que no esté en el schema
   entregado por el usuario.** Si la pregunta requiere un dato que el schema
   no tiene, dilo explícitamente ("esta pregunta no se puede responder con el
   schema dado — falta la columna X") en vez de escribir una query que
   asuma su existencia.
2. **Toda predicción de conteo de filas del resultado debe mostrar el
   razonamiento detrás** (ej. "de las filas de muestra, X% cumplen la
   condición, así que se espera un resultado de aproximadamente Y filas"),
   marcada siempre como estimación, nunca como cifra exacta garantizada.
3. **Todo supuesto sobre el schema que no esté 100% confirmado por la
   muestra o la definición de tabla entregada se marca explícitamente**
   ("se asume que 'estado' es un campo de texto libre y no un enum
   validado — confirmar con el esquema real antes de ejecutar").
4. **Si la tabla incluye columnas con datos identificables de clientes o
   prospectos** (nombre, decisor, contacto), y la query o su resultado va a
   compartirse fuera del despacho, recuerda explícitamente anonimizar antes
   de exportar (Ley 1581 de 2012).
5. Si la pregunta busca calcular horas facturables o ingresos por hora desde
   una tabla de time entries, no reinterpretes esa lógica de negocio en la
   query — genera el SQL de extracción, pero remite la decisión de qué se
   factura a `facturacion-horas-co`.

## Cuándo usar esta skill

Cuando el usuario tenga una pregunta en español sobre datos del despacho y un
schema de tabla (o al menos una fila de muestra representativa) de una base
de datos real o hipotética, y necesite la consulta SQL exacta para
responderla, con el dialecto que use su motor de base de datos (por defecto,
PostgreSQL si no especifica otro).

## Proceso operativo

**Paso 1 — Pide la pregunta, el schema y el dialecto.**
Pide la pregunta de negocio en una frase, el schema de la(s) tabla(s)
involucradas (nombre de columnas y tipos, o al menos una fila de muestra) y
el dialecto SQL (PostgreSQL, MySQL, SQLite). Si no especifica dialecto, usa
PostgreSQL y dilo explícitamente.

**Paso 2 — Reformula la pregunta con precisión.**
Antes de escribir SQL, reescribe la pregunta en una frase inequívoca que deje
claro qué se cuenta, en qué ventana de tiempo y qué se excluye (ej. "¿cuántas
empresas del sector Tecnología están en estado 'Cliente' a la fecha de
corte?" en vez de "¿cuántos clientes de tecnología tenemos?", que es ambigua
sobre si incluye "Propuesta enviada").

**Paso 3 — Escribe la query con comentario por cláusula.**
Cada cláusula (SELECT, FROM, WHERE, JOIN, GROUP BY, ORDER BY) lleva un
comentario en línea explicando qué hace y por qué. Usa CTEs (`WITH ... AS`)
en vez de subqueries anidadas cuando la lógica tenga más de un paso lógico.
Nunca uses `SELECT *` — lista explícitamente las columnas necesarias.

**Paso 4 — Predice el conteo de filas del resultado.**
Con base en la muestra de datos entregada (o, si no hay muestra, marcando la
predicción como no disponible), estima cuántas filas debería devolver la
query, mostrando el razonamiento.

**Paso 5 — Marca los supuestos sobre el schema.**
Lista explícitamente cualquier supuesto no confirmado (tipos de dato,
nulabilidad, si un campo es enum o texto libre, si existen duplicados
posibles).

**Paso 6 — Sugiere una optimización.**
Propone un índice, una reescritura, o una forma de reducir el costo de la
query si el volumen de datos crece (ej. "si la tabla de prospectos supera
los cientos de miles de filas, indexar `canal_contacto` y `fecha_contacto`
aceleraría este filtro").

## Mini-ejemplo

**Pregunta del usuario**: "¿cuántas empresas de sector Tecnología o Fintech,
contactadas por LinkedIn, llegaron a estado Cliente en el segundo trimestre
de 2026?"

**Schema entregado** (tabla `prospectos`, según las columnas de la sección 7
del CRM):

```
prospectos (
  id               integer,
  empresa          text,
  sector           text,
  decisor          text,
  canal_contacto   text,   -- LinkedIn / Email / WhatsApp / Referido / Directorio jurídico
  fecha_contacto   date,
  estado           text,   -- Nuevo / Contactado / En conversación / Propuesta enviada / Cliente / Descartado
  senal_oportunidad text,
  servicio_probable text,
  puntaje_semaforo integer,
  proxima_accion   text
)
```

**Reformulación precisa**: contar empresas con `sector` en ('Tecnología',
'Fintech'), `canal_contacto` = 'LinkedIn', `estado` = 'Cliente', y
`fecha_contacto` entre 2026-04-01 y 2026-06-30 (se asume que
`fecha_contacto` es la fecha de primer contacto, no la fecha en que llegó a
"Cliente" — el schema entregado no tiene una columna separada para "fecha en
que cambió a Cliente"; si existe, la pregunta debería filtrar por esa
columna en vez de `fecha_contacto`).

```sql
-- CTE: filtra prospectos del sector y canal relevantes en la ventana de tiempo pedida
WITH prospectos_filtrados AS (
  SELECT
    id,
    empresa,
    sector,
    estado
  FROM prospectos
  WHERE sector IN ('Tecnología', 'Fintech')          -- sectores pedidos por el usuario
    AND canal_contacto = 'LinkedIn'                   -- canal pedido
    AND fecha_contacto BETWEEN '2026-04-01' AND '2026-06-30'  -- Q2 2026, según fecha de primer contacto
)
-- Conteo final: solo los que llegaron a estado Cliente
SELECT
  COUNT(*) AS empresas_cliente_q2
FROM prospectos_filtrados
WHERE estado = 'Cliente';
```

**Predicción de conteo de filas**: sobre una muestra de 12 filas del CRM (ver
el mini-ejemplo de `narrador-de-hojas`), 2 filas cumplían sector
Tecnología/Fintech + canal LinkedIn + fecha en rango, y 0 de esas 2 estaban en
"Cliente" — con esa muestra pequeña, la estimación es **0 o 1 fila de
resultado**, marcada explícitamente como estimación de baja confianza por el
tamaño reducido de la muestra usada para proyectar.

**Supuestos marcados**:
- Se asume que `estado` es texto libre validado por convención (no un enum a
  nivel de base de datos) — si hay valores mal escritos ("cliente" en
  minúscula, espacios extra), la query los perdería silenciosamente. Se
  recomienda normalizar con `LOWER(TRIM(estado))` si no hay certeza de que el
  campo esté limpio.
- Se asume que `fecha_contacto` nunca es nula para las filas relevantes; si
  hay nulos, esas filas quedan excluidas del filtro `BETWEEN` sin error
  visible.

**Optimización sugerida**: si la tabla crece más allá de unos miles de
prospectos, un índice compuesto sobre `(sector, canal_contacto,
fecha_contacto)` aceleraría este filtro específico; con el volumen actual del
despacho (decenas de filas) no es necesario.

## Cierre — límite de esta skill

Esta skill traduce la pregunta a SQL y explica sus supuestos, nunca ejecuta
la query contra una base de datos de producción ni decide qué hacer con el
resultado. Ejecutar la consulta y validar sus efectos en un sistema real es
responsabilidad de quien administre esa base de datos en el despacho.
