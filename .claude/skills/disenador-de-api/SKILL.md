---
name: disenador-de-api
description: Diseña endpoints de API que envejecen bien para las herramientas internas del despacho, en particular un futuro portal de clientes (consulta de casos, envío de documentos, formularios de intake) o integraciones con la API de Claude. Úsala cuando el usuario pida diseñar un endpoint o un conjunto de endpoints para el portal de clientes, definir el modelo de recursos de una API interna, o revisar si un diseño de API expone datos de clientes de forma segura.
---

# Diseñador de API — portal de clientes e integraciones internas

El despacho no vende software, pero si construye o contrata un portal de
clientes (consulta de estado de casos, subida de documentos, formularios de
intake) o una integración propia con la API de Claude, ese diseño va a vivir
años y va a exponer datos de clientes reales apenas se despliegue. Esta
skill diseña esa superficie antes de que exista código, para que el primer
endpoint que se escriba ya nazca pensado para durar y para cumplir la ley
de protección de datos que aplica a cualquier sistema que toque información
de un cliente del despacho.

## Regla de seguridad obligatoria (anti-alucinación)

1. **Nunca afirmes que un endpoint "ya funciona" o que "devuelve tal
   respuesta" sin haberlo probado contra una implementación real.** Este
   diseño es una propuesta previa a la implementación — todo ejemplo de
   respuesta es ilustrativo, no un resultado observado, y debe quedar claro
   que se verifica solo una vez que exista el código real.
2. **Nunca inventes nombres de campos, tablas o columnas del sistema real
   del despacho** (por ejemplo, cómo se llama la columna de estado de un
   caso en la base de datos actual) si no te los confirmaron. Si no sabes
   cómo está modelado hoy el dato, dilo explícitamente y propone el nombre
   como una propuesta de diseño, no como un hecho verificado del sistema
   existente.
3. **Todo endpoint que exponga datos de un cliente (casos, documentos,
   datos de contacto, facturación) debe cumplir la Ley 1581 de 2012
   (habeas data).** Eso implica como mínimo: autenticación obligatoria sin
   excepción, autorización que confirme que el cliente autenticado solo ve
   sus propios datos (nunca los de otro cliente por error de diseño), y
   ningún ejemplo de request/response en este diseño debe usar el nombre,
   NIT, cédula o caso real de un cliente del despacho — siempre datos
   ficticios.

## Cuándo usar esta skill

Cuando el usuario necesite diseñar uno o varios endpoints para una
herramienta interna con superficie de API — el portal de clientes, una
integración con la API de Claude para las skills del despacho, o cualquier
otro sistema que vaya a exponer datos a través de una interfaz programática.

## Proceso operativo

**1. Pedir el dominio, los llamadores esperados y el presupuesto de
performance.**
¿Quién llama a esta API? (el cliente desde un navegador, un script interno
del despacho, un desarrollador externo). ¿Cuántas peticiones por minuto se
esperan realmente? (un portal de clientes de un despacho pequeño no tiene
el mismo perfil de carga que un producto masivo — no diseñes para una
escala que no existe).

**2. Modelo de recursos: 3 a 7 sustantivos.**
Identifica los sustantivos centrales del dominio, siempre en plural. Para
un portal de clientes de un despacho, ejemplos plausibles son `clientes`,
`casos`, `documentos`, `mensajes`, `facturas`. No inventes recursos que el
usuario no describió como necesarios.

**3. Endpoints, con método, path, auth, idempotencia y rate limit.**
Para cada endpoint: verbo HTTP, path con el recurso en plural, qué nivel de
autenticación exige (sesión de cliente, token de servicio interno, ninguna
si es genuinamente público), si es idempotente (una petición repetida con
el mismo `Idempotency-Key` no debe crear dos veces el mismo recurso), y un
límite de tasa razonable para el volumen real del despacho.

**4. Shapes de request y response, con ejemplos.**
JSON de ejemplo para el cuerpo de la petición y la respuesta exitosa, con
fechas en ISO 8601 y datos siempre ficticios.

**5. Códigos de error estructurados.**
Cada error como un objeto con `code`, `message` y, si aplica, `field` —
nunca un string suelto ni un código HTTP sin cuerpo explicativo.

**6. Versionado y política de deprecación.**
Cómo se versiona la API (prefijo de path `/v1/`, header, lo que aplique al
tamaño real del proyecto) y qué aviso mínimo se le da a un llamador antes
de retirar una versión o un campo.

**7. Tres breaking changes evitados por el diseño.**
Explica explícitamente tres decisiones de este diseño que evitan que un
cambio futuro razonable (agregar un campo, cambiar un estado, añadir un
tipo de documento) rompa a los llamadores existentes.

## Reglas de formato (no negociables)

- Recursos siempre en sustantivos plurales (`/casos`, no `/caso` ni
  `/getCaso`).
- Fechas siempre en ISO 8601 (`2026-07-03T14:00:00-05:00`), nunca formato
  local ambiguo.
- Errores siempre como objeto estructurado, nunca como string plano.

## Mini-ejemplo completo

**Dominio**: portal de clientes de JA Abogados, primera versión —
consultar el estado de los casos propios y enviar un documento de intake.
Llamadores esperados: el cliente autenticado desde un navegador, volumen
bajo (decenas de clientes activos, no miles).

**Modelo de recursos (5 sustantivos)**: `clientes`, `casos`, `documentos`,
`mensajes`, `intakes`.

**Endpoints:**

| Método | Path | Auth | Idempotente | Rate limit |
|---|---|---|---|---|
| GET | `/v1/casos` | Sesión de cliente autenticado | N/A (lectura) | 60 req/min por cliente |
| GET | `/v1/casos/{caso_id}` | Sesión de cliente autenticado; el servidor **debe** verificar que `caso_id` pertenece al cliente autenticado antes de responder | N/A | 60 req/min por cliente |
| POST | `/v1/intakes` | Token de formulario público de un solo uso (no requiere sesión previa, es el primer contacto) | Sí, vía header `Idempotency-Key` | 10 req/min por IP |
| POST | `/v1/casos/{caso_id}/documentos` | Sesión de cliente autenticado, mismo chequeo de pertenencia que GET | Sí, vía `Idempotency-Key` | 20 req/min por cliente |

**Shape de ejemplo — `GET /v1/casos/{caso_id}` (datos ficticios):**
```json
{
  "caso_id": "cas_8f2a1c",
  "cliente_id": "cli_4b90ee",
  "asunto": "Revisión de contrato de suministro",
  "estado": "en_curso",
  "abogado_responsable": "J. Ramírez",
  "creado_en": "2026-04-12T09:00:00-05:00",
  "actualizado_en": "2026-07-01T16:30:00-05:00"
}
```

**Shape de ejemplo — `POST /v1/intakes` (datos ficticios):**
```json
// Request
{
  "empresa": "Textiles Andinos S.A.S.",
  "sector": "manufactura",
  "contacto_nombre": "Laura Gómez",
  "contacto_email": "laura.gomez@ejemplo-ficticio.co",
  "servicio_solicitado": "corporativo_ma"
}
// Response (201)
{
  "intake_id": "int_1a2b3c",
  "estado": "recibido",
  "creado_en": "2026-07-03T08:15:00-05:00"
}
```

**Errores estructurados:**
```json
{
  "error": {
    "code": "recurso_no_pertenece_al_cliente",
    "message": "El caso solicitado no pertenece al cliente autenticado.",
    "field": "caso_id"
  }
}
```

**Versionado**: prefijo `/v1/` en el path. Un campo no se elimina nunca sin
antes marcarlo `deprecated` en la documentación del endpoint durante al
menos un ciclo de aviso a los clientes activos del portal (mínimo 60 días,
dado el volumen bajo y la relación directa con cada cliente) antes de
retirarlo en `/v2/`.

**Tres breaking changes evitados:**
1. `GET /v1/casos/{caso_id}` nunca acepta el ID interno de base de datos
   directamente — usa un identificador prefijado (`cas_...`) que permite
   cambiar el motor de almacenamiento sin cambiar el contrato con el
   cliente.
2. El campo `estado` de un caso es un string controlado documentado
   explícitamente (`en_curso`, `cerrado`, `en_espera_de_cliente`, etc.), no
   un booleano — agregar un estado nuevo no rompe a ningún llamador
   existente.
3. `POST /v1/intakes` exige `Idempotency-Key` desde el primer día, aunque
   hoy el volumen sea bajo — evita que un futuro reintento automático del
   formulario duplique el prospecto en el CRM que consume este endpoint.

## Cierre — límite de esta skill

Esta skill entrega el diseño, nunca lo implementa ni certifica que el
código real se comporta como el ejemplo. Todo shape de request/response
aquí es ilustrativo hasta que exista una implementación real y se pruebe
contra ella. Cualquier endpoint que termine exponiendo datos de un cliente
del despacho debe revisarse contra la Ley 1581 de 2012 antes de
desplegarse en producción — esta skill deja la estructura, no la
aprobación de cumplimiento, que corresponde al responsable de protección de
datos del despacho.
