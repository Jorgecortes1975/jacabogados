---
name: esquema-de-base-de-datos
description: Diseña esquemas de base de datos que escalan más allá del demo, para herramientas internas del despacho como el CRM de prospectos (si crece de Google Sheets/Notion a una base de datos real) o el futuro portal de clientes. Úsala cuando el usuario pida diseñar el schema de una tabla o de varias tablas relacionadas, migrar el CRM de prospectos de una hoja de cálculo a una base de datos, o revisar si un diseño de tablas soporta las consultas reales que necesita el despacho.
---

# Esquema de base de datos — CRM de prospectos y otras tablas internas

El despacho lleva hoy su CRM de prospectos en Google Sheets o Notion
(sección 7 del plan de marketing digital), y HubSpot gratuito como opción
si el volumen crece. Tarde o temprano, si el volumen de prospectos o de
casos crece lo suficiente, alguien va a proponer moverlo a una base de
datos real, o el portal de clientes va a necesitar tablas propias para
casos, documentos y facturación. Esta skill diseña ese esquema antes de que
exista, para que aguante consultas reales y no solo el demo inicial de 20
filas de prueba.

## Regla de seguridad obligatoria (anti-alucinación)

1. **Nunca afirmes que una query "devuelve tal resultado" sin haberla
   ejecutado contra una base real.** Todo ejemplo de query en este diseño
   es ilustrativo del patrón de acceso esperado, no un resultado observado
   — márcalo como tal.
2. **Nunca inventes nombres de columnas, tablas o tipos de dato del sistema
   actual del despacho** si no te los confirmaron. Si estás diseñando desde
   cero (migrando de Google Sheets), dilo explícitamente: los nombres de
   columna de este esquema son una propuesta de diseño basada en la
   sección 7 del plan de marketing, no un hecho ya confirmado con el
   despacho.
3. **Cualquier tabla que almacene datos de un prospecto o cliente**
   (nombre, empresa, decisor, contacto, NIT, notas) cae bajo la Ley 1581 de
   2012 (habeas data). El diseño debe considerar desde el inicio: quién
   puede leer esa tabla, si se necesita un campo de consentimiento o
   autorización de tratamiento de datos, y que cualquier dato de ejemplo en
   este documento debe ser ficticio — nunca el nombre real de un prospecto
   o cliente del despacho.

## Cuándo usar esta skill

Cuando el usuario necesite diseñar el esquema de una tabla o de varias
tablas relacionadas para una herramienta interna del despacho: el CRM de
prospectos si migra de hoja de cálculo a base de datos, las tablas de casos
y documentos de un futuro portal de clientes, o cualquier otro sistema
interno con datos estructurados.

## Proceso operativo

**1. Pedir la descripción de la funcionalidad, los patrones de consulta y
el volumen de escritura esperado.**
¿Qué se necesita poder responder con esta tabla? ("¿cuántos prospectos
están en estado 'Contactado' hace más de 7 días?", "¿cuál es el histórico
de interacciones de una empresa concreta?"). ¿Cuántas filas se escriben por
día o por semana? Un despacho pequeño no tiene el mismo volumen que un
producto masivo — no sobre-diseñes para una escala que nunca va a existir,
pero tampoco subestimes lo que la tabla necesita soportar en 2-3 años si el
despacho crece.

**2. Tablas con columnas, tipos, nullability y defaults.**
Para cada tabla: cada columna con su tipo de dato, si acepta NULL o no, y
su valor por defecto si aplica. Toda decisión de nullability debe
justificarse (¿por qué este campo puede quedar vacío y ese otro no?).

**3. Llaves primarias, llaves foráneas y constraints únicos.**
Cada tabla con su PK (preferible un ID generado, no un dato de negocio que
puede cambiar como el nombre de la empresa). Cada relación entre tablas
como FK explícita. Cualquier combinación que no debe repetirse (por
ejemplo, no dos prospectos con el mismo NIT) como constraint único, no como
una regla que se valida solo en la aplicación.

**4. Índices atados a consultas reales.**
Cada índice propuesto debe justificarse con la consulta específica del
paso 1 que lo necesita — nunca "por si acaso". Si una consulta filtra por
`estado` y ordena por `fecha_proximo_contacto`, ese es el índice compuesto
a proponer, no un índice genérico sobre cada columna.

**5. Decisiones de desnormalización, si aplican.**
Si guardar un dato calculado o repetido (por ejemplo, el nombre del sector
copiado en la tabla de prospectos en vez de solo el ID de una tabla de
sectores) ahorra un join costoso en una consulta frecuente, decláralo
explícito con el trade-off: qué se gana en velocidad de lectura y qué se
pierde en consistencia si el dato origen cambia.

**6. Script de migración a 30 días.**
Un plan de migración por fases que no requiera apagar el sistema actual de
un día para otro: por ejemplo, correr la hoja de Google Sheets y la base de
datos nueva en paralelo durante un periodo de validación antes de cortar el
proceso viejo.

## Reglas de formato (no negociables)

- Nombres de tabla en snake_case, siempre en plural (`prospectos`, no
  `Prospecto` ni `tblProspecto`).
- Nombres de columna en snake_case (`fecha_primer_contacto`, no
  `FechaPrimerContacto`).
- Toda tabla incluye `created_at` y `updated_at` con timestamp, sin
  excepción, incluso si hoy parece innecesario — es lo primero que se
  necesita el día que algo sale mal y nadie sabe cuándo cambió.

## Mini-ejemplo completo — CRM de prospectos (migrando de Google Sheets)

**Descripción de la feature**: migrar la tabla de seguimiento de
prospectos de la sección 7 del plan de marketing (Empresa, Sector, Decisor,
Canal, Fecha, Estado, Señal de oportunidad, Servicio probable, Puntaje
semáforo, Próxima acción, Notas) de Google Sheets a una base de datos
relacional, porque el volumen ya supera lo manejable en una hoja compartida.

**Patrones de consulta esperados:**
- "Prospectos en estado X ordenados por próxima acción más próxima."
- "Historial completo de interacciones de una empresa concreta."
- "Prospectos con puntaje semáforo verde sin contacto en los últimos 7 días."

**Volumen de escritura**: bajo (decenas de prospectos nuevos al mes, unas
pocas actualizaciones de estado por prospecto por semana) — no requiere
particionamiento ni arquitectura de alta escritura.

**Tablas:**

```sql
-- Tabla de catálogo: los 8 pilares del portafolio de servicios del despacho
CREATE TABLE servicios (
    id            SERIAL PRIMARY KEY,
    nombre        VARCHAR(80) NOT NULL UNIQUE,
    creado_en     TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- Nota: nombre de columna 'creado_en' vs 'created_at' — el despacho
-- redacta internamente en español; se mantiene snake_case en español
-- aquí de forma consistente. Confirmar con el desarrollador cuál
-- convención prefiere el equipo antes de aplicar en código real.

CREATE TABLE prospectos (
    id                      SERIAL PRIMARY KEY,
    empresa                 VARCHAR(200) NOT NULL,
    nit                     VARCHAR(20)  NULL,  -- puede no conocerse en el primer contacto
    sector                  VARCHAR(80)  NOT NULL,
    decisor_nombre          VARCHAR(150) NOT NULL,
    decisor_cargo           VARCHAR(100) NULL,
    canal_primer_contacto   VARCHAR(30)  NOT NULL,  -- 'linkedin' | 'email' | 'whatsapp' | 'referido'
    fecha_primer_contacto   DATE         NOT NULL,
    estado                  VARCHAR(30)  NOT NULL DEFAULT 'nuevo',
        -- 'nuevo' | 'contactado' | 'en_conversacion' | 'propuesta_enviada' | 'cliente' | 'descartado'
    senal_oportunidad       TEXT         NULL,
    servicio_id             INTEGER      NULL REFERENCES servicios(id),
    puntaje_semaforo        SMALLINT     NOT NULL DEFAULT 0
        CHECK (puntaje_semaforo BETWEEN 0 AND 40),
    proxima_accion          TEXT         NULL,
    fecha_proxima_accion    DATE         NULL,
    notas                   TEXT         NULL,
    creado_en               TIMESTAMPTZ  NOT NULL DEFAULT now(),
    actualizado_en          TIMESTAMPTZ  NOT NULL DEFAULT now(),

    CONSTRAINT uq_prospectos_nit UNIQUE (nit)  -- evita duplicar el mismo prospecto por NIT
);

-- Historial de interacciones: una fila por cada contacto, no solo el
-- estado actual del prospecto en la tabla principal.
CREATE TABLE interacciones_prospecto (
    id              SERIAL PRIMARY KEY,
    prospecto_id    INTEGER NOT NULL REFERENCES prospectos(id) ON DELETE CASCADE,
    canal           VARCHAR(30) NOT NULL,
    fecha           TIMESTAMPTZ NOT NULL DEFAULT now(),
    resumen         TEXT NOT NULL,
    creado_en       TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

**PKs, FKs y constraints únicos**: `id` autoincremental como PK en las tres
tablas (nunca `empresa` o `nit` como PK, porque un dato de negocio puede
corregirse después). `servicio_id` y `prospecto_id` como FK explícitas.
`nit` con constraint único en `prospectos` para evitar el bug de
duplicación descrito en el mini-ejemplo de `repro-de-bug`.

**Índices atados a consultas:**
```sql
-- Para "prospectos en estado X ordenados por próxima acción más próxima"
CREATE INDEX idx_prospectos_estado_proxima_accion
    ON prospectos (estado, fecha_proxima_accion);

-- Para "historial completo de interacciones de una empresa concreta"
CREATE INDEX idx_interacciones_prospecto_id
    ON interacciones_prospecto (prospecto_id, fecha DESC);

-- Para "prospectos verdes sin contacto en los últimos 7 días"
CREATE INDEX idx_prospectos_puntaje_semaforo
    ON prospectos (puntaje_semaforo, fecha_primer_contacto);
```

**Decisión de desnormalización**: `senal_oportunidad` se guarda como texto
libre directamente en `prospectos` en vez de en una tabla de catálogo
separada, porque en la práctica cada señal es distinta por prospecto (no es
un valor repetido de una lista corta) — normalizarla no ahorraría ningún
join útil.

**Script de migración a 30 días (alto nivel):**
1. **Semana 1**: crear las tablas en un entorno de prueba; exportar la
   hoja de Google Sheets actual a CSV con datos reales y cargarla ahí,
   nunca en un entorno compartido con terceros.
2. **Semana 2**: correr ambos sistemas en paralelo — la hoja sigue siendo
   la fuente de verdad, la base de datos se llena por un script de
   sincronización de solo lectura, para validar que los datos migran bien
   sin arriesgar el original.
3. **Semana 3**: invertir la fuente de verdad — la base de datos pasa a
   ser la que se edita directamente; la hoja de Google Sheets se congela en
   modo solo lectura como respaldo visual para quien no tenga acceso a la
   base de datos todavía.
4. **Semana 4**: retirar el script de sincronización, confirmar con el
   responsable de protección de datos del despacho que el acceso a la base
   de datos nueva está restringido igual o mejor que el acceso a la hoja
   de Google Sheets original, y documentar quién tiene permisos de lectura
   y escritura.

## Cierre — límite de esta skill

Esta skill entrega el diseño del esquema, nunca lo ejecuta contra una base
de datos real ni certifica que las queries de ejemplo devuelven lo que
describen — eso solo se confirma corriéndolas. Cualquier tabla que termine
almacenando datos reales de prospectos o clientes del despacho debe
revisarse contra la Ley 1581 de 2012 antes de entrar en producción, y
ningún dato de este documento debe copiarse tal cual a una tabla real: son
ejemplos ficticios para ilustrar la estructura, no datos de un prospecto
verdadero.
