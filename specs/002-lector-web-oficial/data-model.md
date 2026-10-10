# Modelo de Datos (Fase 1): Lector Web de Fuentes Oficiales

Las entidades se expresan como estructuras JSON. No hay base de datos.

## 1. FuenteAutorizada (en `mcp-config.json`, clave `lectorWeb.dominios`)

| Campo | Tipo | Regla |
|---|---|---|
| host | texto | Obligatorio. Minúsculas, ASCII, sin esquema, puerto ni ruta. No puede ser una dirección IP. |
| autoridad | texto | Obligatorio. Nombre de la entidad emisora en español. |
| incluyeSubdominios | booleano | Por defecto `false`. Si es `true`, se aceptan hosts que terminen en `.` + host. |
| transporteRelacionado | texto | Opcional. Clave en `transports` de `mcp-config.json`. |
| activo | booleano | Por defecto `false`. Solo puede ser `true` si existen `verificadoEn` y `fuenteVerificacion`. |
| verificadoEn | fecha (AAAA-MM-DD) | Fecha en que un responsable confirmó el dominio. Nulo mientras `activo` sea `false`. |
| fuenteVerificacion | texto | Referencia oficial usada para confirmar el dominio. Nulo mientras `activo` sea `false`. |
| notas | texto | Opcional. Por ejemplo, inconsistencias detectadas. |

Reglas de validación al cargar:
1. `activo: true` sin `verificadoEn` o sin `fuenteVerificacion` invalida la configuración y detiene el módulo (falla cerrada).
2. Hosts duplicados invalidan la configuración.
3. Un host con IP, esquema, puerto, ruta o caracteres no ASCII invalida la configuración.

## 2. ConfiguracionLector (en `mcp-config.json`, clave `lectorWeb`)

| Campo | Tipo | Valor por defecto |
|---|---|---|
| enabled | booleano | `true` |
| maxBytes | entero | 5242880 |
| timeoutMs | entero | 20000 |
| maxRedirecciones | entero | 3 |
| userAgent | texto | `JAC-LectorWebOficial/1.0` |
| rutaAuditoria | texto | `logs/lector-web-auditoria.jsonl` |
| dominios | lista de FuenteAutorizada | lista candidata, todos inactivos |

Esquema formal en [contracts/config-lector-web.schema.json](./contracts/config-lector-web.schema.json). El esquema no admite propiedades adicionales: claves como `puerto`, `ca` u `opcionesRedPrueba` en `mcp-config.json` invalidan la configuración. Esas opciones existen solo como parámetro del constructor para pruebas.

## 3. SolicitudLectura (entrada)

| Campo | Tipo | Regla |
|---|---|---|
| url | texto | Obligatorio. Esquema `https`, puerto 443 o implícito, sin usuario ni contraseña. |

## 4. ResultadoLectura (salida exitosa)

| Campo | Tipo | Descripción |
|---|---|---|
| ok | booleano | `true`. |
| texto | texto | Texto extraído. Dato no confiable. |
| metadatos.autoridad | texto | Entidad emisora según la lista. |
| metadatos.dominio | texto | Host de la dirección final. |
| metadatos.urlSolicitada | texto | Dirección entregada por el usuario, normalizada. |
| metadatos.urlFinal | texto | Dirección tras redirecciones. |
| metadatos.redirecciones | lista de texto | Direcciones intermedias, en orden. |
| metadatos.fechaConsulta | texto ISO 8601 UTC | Momento de la descarga. |
| metadatos.estadoHttp | entero | Código de respuesta. |
| metadatos.tipoContenido | texto | Cabecera `Content-Type` normalizada. |
| metadatos.bytes | entero | Bytes recibidos. |
| metadatos.hashContenido | texto | SHA-256 hexadecimal de los bytes recibidos. Junto con `hashTexto` forma las huellas de integridad. |
| metadatos.hashTexto | texto | SHA-256 hexadecimal del texto extraído. |
| metadatos.estadoVigencia | texto | Siempre `PENDIENTE_VERIFICACION`. |
| metadatos.tratamiento | texto | Siempre `DATO_NO_CONFIABLE`. |
| advertencias | lista de texto | En español. Por ejemplo, texto corto o HTML mal formado. |

## 5. FalloLectura (salida de error)

| Campo | Tipo | Descripción |
|---|---|---|
| ok | booleano | `false`. |
| codigo | texto | Uno de los códigos de la tabla siguiente. |
| mensaje | texto | Explicación en español para el abogado. |
| detalle | objeto | Datos técnicos mínimos, sin contenido de la página. |

Códigos de fallo:

| Código | Situación |
|---|---|
| URL_INVALIDA | Dirección mal formada, esquema distinto de https, puerto distinto de 443 o credenciales incrustadas. |
| FUENTE_NO_AUTORIZADA | Dominio fuera de la lista o inactivo. Incluye redirecciones a dominios no autorizados. |
| DESTINO_NO_PUBLICO | La dirección resuelve a un rango prohibido. |
| DEMASIADAS_REDIRECCIONES | Se superó el máximo. |
| TAMANO_EXCEDIDO | Se superó el máximo de bytes, recibidos o descomprimidos. |
| TIEMPO_AGOTADO | Se superó el tiempo máximo. |
| CERTIFICADO_INVALIDO | Falla en la verificación TLS. |
| FUENTE_NO_DISPONIBLE | Error de conexión o estado HTTP de servidor. |
| DESAFIO_ANTIROBOT | El sitio presentó un control de acceso interactivo. |
| FORMATO_NO_SOPORTADO | Tipo de contenido no permitido, incluidos los PDF. |
| SIN_TEXTO | La página no contiene texto extraíble. |
| LECTOR_DESHABILITADO | `enabled` es `false` o la configuración es inválida. |

## 6. RegistroAuditoria (una línea JSON por solicitud)

| Campo | Tipo |
|---|---|
| fecha | texto ISO 8601 UTC |
| urlSolicitada | texto |
| dominio | texto o nulo |
| resultado | `OK` o `FALLO` |
| codigo | texto o nulo |
| hashContenido | texto o nulo |
| duracionMs | entero |

El registro nunca incluye el texto de la página.

## Transiciones de estado de una solicitud

`RECIBIDA` → `URL_VALIDADA` → `DOMINIO_AUTORIZADO` → `DESTINO_VALIDADO` → `DESCARGADA` → `TEXTO_EXTRAIDO` → `ENTREGADA`.
Cualquier etapa puede terminar en `FALLO` con su código. Tras cada redirección se regresa a `URL_VALIDADA`.
