# Plan de Implementación: Lector Web de Fuentes Oficiales

**Rama**: `ccr-77a599ab-pcqqzx` | **Fecha**: 2026-10-10 | **Especificación**: [spec.md](./spec.md)

**Entrada**: Especificación en `specs/002-lector-web-oficial/spec.md`

## Resumen

Se agrega al agente jurídico existente una capacidad de lectura de páginas web que solo opera sobre una lista de dominios oficiales configurada en `mcp-config.json`. El enfoque técnico es un módulo Node.js sin dependencias externas, construido con módulos nativos (`https`, `dns`, `net`, `crypto`, `zlib`, `url`). Cada solicitud pasa por cuatro controles encadenados: validación de la dirección contra la lista, resolución y validación de la dirección de red en el momento de conectar, descarga con límites de tamaño, tiempo y redirecciones, y extracción de texto con metadatos de trazabilidad. El estado de vigencia es una constante `PENDIENTE_VERIFICACION` que ninguna ruta de código puede cambiar.

Decisión del usuario incorporada: los PDF quedan excluidos de la versión 1 y fallan con aviso explícito (ver `research.md`, D-08).

## Contexto Técnico

**Lenguaje/Versión**: JavaScript (CommonJS), Node.js 20 o superior (`node:test` es estable desde esa versión). El entorno de desarrollo usa Node 22.22.0. El ecosistema actual es CommonJS (`require`, `module.exports`).

**Dependencias principales**: Ninguna externa. Solo módulos nativos de Node.js: `https`, `dns`, `net`, `crypto`, `zlib`, `fs`, `path`, `url`. No existe `package.json` en el repositorio y el plan no lo exige.

**Almacenamiento**: Archivo de configuración `mcp-config.json` (lista de dominios y límites) y bitácora de auditoría en formato JSON Lines en `logs/lector-web-auditoria.jsonl` (excluida del control de versiones). El contenido leído no se persiste.

**Pruebas**: `node:test` y `node:assert` nativos (`node --test tests/lector-web/*.test.js`). Sin acceso a internet: se inyectan el resolutor DNS y la función de petición. Las pruebas de integración usan un servidor HTTPS local con un certificado de prueba generado al ejecutar las pruebas con `openssl` (no con `crypto`; no se versiona ninguna clave) y opciones de red exclusivas de prueba (puerto y certificado de confianza) que solo acepta el constructor, nunca la configuración.

**Plataforma objetivo**: Línea de comandos y módulo importable por el agente, en Linux, macOS y Windows con Node.js.

**Tipo de proyecto**: Biblioteca más subcomandos del CLI existente.

**Metas de rendimiento**: Lectura de una página oficial habitual en menos de 15 s en el 95 % de los casos (CE-004). Tiempo máximo duro configurable, por defecto 20 s.

**Restricciones**: Solo HTTPS, puerto 443, sin credenciales, sin cookies, sin servicios de terceros. Tamaño máximo por defecto 5 MiB (comprimido y descomprimido). Máximo 3 redirecciones. Sin ejecución de JavaScript de la página.

**Escala/Alcance**: Una página por solicitud, uso interno del despacho, decenas de lecturas por día. Sin concurrencia elevada.

## Verificación de la Constitución

*Puerta: debe pasar antes de la investigación de la Fase 0. Se vuelve a evaluar después del diseño de la Fase 1.*

| Principio | Evaluación | Cómo se cumple |
|---|---|---|
| I. Sin Alucinaciones | Cumple | El módulo no genera contenido jurídico. Entrega texto de la fuente con trazabilidad. Ante fallo, declara la causa y no completa. La vigencia es siempre `PENDIENTE_VERIFICACION`. |
| II. Verificación Cruzada | Cumple, con límite declarado | El lector no verifica vigencia ni existencia. Deja ese paso al protocolo del agente. No relaja `requiereMultiplesFuentes`. |
| III. Español Jurídico | Cumple | Mensajes, advertencias y documentos de usuario en español. Identificadores técnicos en inglés solo en nombres internos de código. |
| IV. Trazabilidad | Cumple | Cada resultado incluye autoridad, URL solicitada y final, fecha y hora, huellas SHA-256 y bitácora de auditoría. |
| Restricciones técnicas (lista de fuentes) | Cumple, con aclaración | La lista de dominios del lector es subordinada a las 9 fuentes oficiales y no agrega una décima fuente. Se documenta en `CLAUDE.md` como nota, no como fila de la tabla de fuentes. |
| V. Simplicidad | Cumple | Se extiende `AgentJuridicoEspecializado` (nuevo método y subcomandos) y `mcp-config.json`. No se crea agente, orquestador ni servidor MCP paralelo. Sin dependencias nuevas. |
| Restricciones técnicas | Cumple | La lista de dominios vive en `mcp-config.json`. No hay secretos. Cambios en la lista se reflejan en `CLAUDE.md`. |

Resultado de la puerta: sin violaciones. La sección Seguimiento de Complejidad no aplica.

**Reevaluación posterior al diseño**: sin cambios. El diseño no introduce dependencias, agentes ni fuentes nuevas.

## Estructura del Proyecto

### Documentación (esta funcionalidad)

```text
specs/002-lector-web-oficial/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── modulo-lector.md
│   ├── cli.md
│   └── config-lector-web.schema.json
├── checklists/requirements.md
└── tasks.md          # lo genera /speckit-tasks
```

### Código fuente (raíz del repositorio)

```text
lector-web/
├── index.js                 # LectorWebOficial: orquesta el flujo y expone la API pública
├── lista-autorizada.js      # carga y valida dominios; coincidencia exacta o por subdominio permitido
├── validacion-url.js        # normalización, esquema, puerto, credenciales
├── red-segura.js            # resolución DNS validada, rangos prohibidos, petición HTTPS con límites
├── extraccion-texto.js      # decodificación de caracteres, limpieza de HTML, detección de anti-robot
├── resultado.js             # constructores de resultado exitoso y de fallo, códigos y mensajes en español
└── auditoria.js             # bitácora JSON Lines

agente-juridico-especializado.js   # se agrega leerPaginaOficial(), subcomandos leer y fuentes-web, y la capacidad en crearAgenteJuridico()
mcp-config.json                    # se agrega lectorWeb y la capacidad lectura-web-oficial
CLAUDE.md                          # se documenta el comando y la advertencia sobre dominios candidatos
.gitignore                         # se agrega logs/

tests/lector-web/
├── helpers.js                 # utilidades: servidor HTTPS local, resolutor y petición simulados
├── lista-autorizada.test.js
├── validacion-url.test.js
├── auditoria.test.js
├── red-segura.test.js
├── extraccion-texto.test.js
├── integracion.test.js
├── vigencia-invariante.test.js
├── cli.test.js
└── fixtures/
    └── openssl-prueba.cnf     # plantilla; el certificado se genera al ejecutar las pruebas
```

**Decisión de estructura**: carpeta propia `lector-web/` en la raíz, coherente con la disposición plana del repositorio. Se separa por responsabilidad para que cada control de seguridad se pruebe de forma aislada.

## Decisiones Técnicas Clave

1. Validación de dominio por lista exacta. Un subdominio solo se acepta si la entrada de la lista lo declara con `incluyeSubdominios: true`. Nunca se usa búsqueda de texto parcial (RF-002).
2. Protección contra destinos no públicos en el momento de conectar. La función `lookup` de la petición HTTPS resuelve el nombre, rechaza si cualquiera de las direcciones es privada o reservada y entrega a la conexión la dirección ya validada. Así se evita el cambio de DNS entre la validación y la conexión (RF-005).
3. Redirecciones manuales. Se desactiva el seguimiento automático, se vuelve a ejecutar toda la validación en cada salto y se limita a 3 (RF-007).
4. Límites duros. Tamaño sobre los bytes recibidos y sobre los descomprimidos (contados manualmente durante el flujo, sin depender de la opción `maxOutputLength` de `zlib`), y un temporizador de la operación completa (RF-008).
5. Huella SHA-256 del contenido ya descomprimido y del texto extraído (RF-010).
6. Vigencia como constante congelada, con una prueba que recorre todas las rutas y comprueba que ningún resultado trae otro valor (RF-011).
7. Contenido tratado como dato no confiable. El resultado lo marca así y el módulo no interpreta ni ejecuta nada del contenido (RF-012).
8. Sin exposición como servidor MCP en la versión 1. Se mantiene en CLI y módulo para no introducir una dependencia de SDK. Queda como mejora futura.

## Riesgos Técnicos y Mitigación

1. Extractor de texto sin dependencias: un analizador HTML propio es menos robusto que una biblioteca. Se implementó como recorrido lineal de una sola pasada (no con expresiones regulares perezosas, que con HTML hostil tardaban más de 25 s; ver research.md D-06). Mitigación: pruebas con páginas de muestra de cada tipo de sitio, aviso de baja calidad cuando el texto sea muy corto y registro de la limitación en `research.md` (D-06).
2. Dominios candidatos sin verificar: la lista parte inactiva. Ninguna lectura funciona hasta que un responsable verifique cada dominio y registre fecha y fuente (D-03).
3. Inconsistencias previas del repositorio: ver `research.md` (D-03 y hallazgos), por ejemplo hosts distintos para una misma entidad entre `mcp-config.json` y el código.
4. Sitios oficiales con certificados defectuosos o desafíos anti-robot: se rechazan o se informan, sin forzar la lectura.
