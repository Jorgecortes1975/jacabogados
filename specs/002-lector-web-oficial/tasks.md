---

description: "Lista de tareas: Lector Web de Fuentes Oficiales"
---

# Tareas: Lector Web de Fuentes Oficiales

**Entrada**: Documentos de diseño en `specs/002-lector-web-oficial/`

**Requisitos previos**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Pruebas**: Se incluyen porque el plan (D-14) y la guía rápida las exigen: los controles de seguridad solo son confiables si se prueban de forma automática. Se escriben antes de la implementación y deben fallar primero.

**Organización**: Agrupadas por historia de usuario. Las tres historias P1 (US1, US2, US3) forman en conjunto el producto mínimo viable, porque una lectura sin control de fuente y de red no debe ponerse en uso.

## Formato: `[ID] [P?] [Historia] Descripción con ruta`

- **[P]**: se puede ejecutar en paralelo (archivos distintos, sin dependencia de tareas incompletas)
- **[Historia]**: US1 a US6, según spec.md
- Convenciones: código en `lector-web/`, pruebas en `tests/lector-web/`, ejecutadas con `node --test tests/lector-web/*.test.js` (pasar una carpeta como argumento falla en Node 22). Sin dependencias externas. Todo mensaje al usuario en español.

---

## Fase 1: Preparación

**Propósito**: estructura básica y utilidades de prueba

- [X] T001 Crear la estructura de carpetas `lector-web/`, `tests/lector-web/` y `tests/lector-web/fixtures/` según plan.md
- [X] T002 [P] Agregar `logs/` a `.gitignore` (bitácora de auditoría, decisión D-12)
- [X] T003 [P] Crear utilidades de prueba en `tests/lector-web/helpers.js`: resolutor DNS simulado, función de petición simulada, reloj fijo y servidor HTTPS local en un puerto de prueba. El certificado y la clave de prueba se generan al ejecutar las pruebas con `openssl` a partir de la plantilla `tests/lector-web/fixtures/openssl-prueba.cnf`; no se versiona ninguna clave privada (un escáner de secretos podría marcarla) y, si `openssl` no está disponible, las pruebas con TLS se omiten. El módulo `crypto` de Node no crea certificados X.509

---

## Fase 2: Fundamentos (bloquean todas las historias)

**Propósito**: constantes, configuración, resultados y auditoría compartidos

**⚠️ CRÍTICO**: ninguna historia puede empezar antes de terminar esta fase

- [X] T004 Implementar en `lector-web/resultado.js` la constante congelada `ESTADO_VIGENCIA = 'PENDIENTE_VERIFICACION'`, el objeto congelado `CODIGOS_FALLO`, el texto en español de cada código y los constructores `resultadoExitoso()` y `fallo()` según data-model.md. Ningún constructor acepta un estado de vigencia distinto
- [X] T005 [P] Escribir en `tests/lector-web/lista-autorizada.test.js` las pruebas de carga de configuración: `activo: true` sin `verificadoEn` o sin `fuenteVerificacion` invalida la configuración, hosts duplicados, host con IP, puerto, ruta, esquema o caracteres no ASCII, entradas inactivas ignoradas, y falla cerrada (`LECTOR_DESHABILITADO`). Incluir: una configuración con las claves `puerto`, `ca`, `permitirLoopback` u `opcionesRedPrueba` se rechaza (la configuración de producción no puede cambiar el puerto, el certificado de confianza ni exonerar la dirección local)
- [X] T006 Implementar en `lector-web/lista-autorizada.js` la carga y validación de `lectorWeb` desde `mcp-config.json` (o desde el objeto inyectado), con valores por defecto de data-model.md y conforme a `contracts/config-lector-web.schema.json`. Hacer pasar T005
- [X] T007 [P] Escribir en `tests/lector-web/auditoria.test.js` las pruebas de la bitácora: una línea JSON por solicitud, campos de data-model.md, sin texto de la página, creación de la carpeta si no existe
- [X] T008 [P] Implementar en `lector-web/auditoria.js` el registro JSON Lines con permisos restrictivos (0600 donde el sistema lo permita). Hacer pasar T007
- [X] T009 Crear en `lector-web/index.js` la clase `LectorWebOficial` con constructor inyectable (`config`, `resolver`, `requestFn`, `ahora`, `rutaAuditoria` y `opcionesRedPrueba` con `puerto`, `ca` y `permitirLoopback`, documentada como exclusiva de pruebas y leída solo del constructor), método `estado()` y `leer()` provisional que devuelve `LECTOR_DESHABILITADO` si la configuración es inválida. Exportar `LectorWebOficial`, `ESTADO_VIGENCIA` y `CODIGOS_FALLO` según contracts/modulo-lector.md

**Punto de control**: base lista; pueden comenzar las historias

---

## Fase 3: Historia 2 - Rechazar fuentes no autorizadas (Prioridad: P1) 🎯 MVP

**Meta**: ninguna dirección fuera de la lista activa genera conexión de red

**Prueba independiente**: enviar dominios no autorizados, engañosos, inactivos y redirecciones a dominios ajenos; verificar rechazo sin conexión y con motivo (RF-001 a RF-003, CE-001)

### Pruebas de la Historia 2 ⚠️ (escribir primero y comprobar que fallan)

- [X] T010 [P] [US2] Pruebas de normalización y validación en `tests/lector-web/validacion-url.test.js`: solo `https`, puerto 443, sin credenciales, mayúsculas, puerto explícito, nombres internacionales, host con punto final, direcciones IP literales (v4, v6, decimales y octales)
- [X] T011 [P] [US2] Pruebas de coincidencia en `tests/lector-web/lista-autorizada.test.js`: coincidencia exacta, subdominio solo con `incluyeSubdominios`, dominios engañosos (`dian.gov.co.ejemplo.com`, `www.dian.gov.co@ejemplo.com`, `dian.gov.co.` con punto final, `xdian.gov.co`), dominio inactivo rechazado
- [X] T012 [US2] Prueba de integración en `tests/lector-web/integracion.test.js` (modo: función de petición simulada): con `requestFn` espía, una dirección no autorizada devuelve `FUENTE_NO_AUTORIZADA` y el espía registra cero llamadas

### Implementación de la Historia 2

- [X] T013 [P] [US2] Implementar en `lector-web/validacion-url.js` la normalización con la clase `URL` y las reglas de esquema, puerto, credenciales y hosts IP. Devuelve `URL_INVALIDA` con motivo en español
- [X] T014 [US2] Implementar en `lector-web/lista-autorizada.js` el método de coincidencia por host exacto o subdominio declarado, que ignora entradas inactivas (D-04)
- [X] T015 [US2] Conectar en `lector-web/index.js` el flujo `validar URL → autorizar dominio` antes de cualquier acceso a red, con registro de auditoría del rechazo. Hacer pasar T010 a T012

**Punto de control**: el lector rechaza correctamente sin tocar la red

---

## Fase 4: Historia 3 - Proteger la confidencialidad y la red interna (Prioridad: P1) 🎯 MVP

**Meta**: solo se contactan hosts autorizados, nunca destinos no públicos, y nada se envía a terceros

**Prueba independiente**: registrar las conexiones salientes y probar destinos locales, privados y reservados, directos, resueltos y por redirección (RF-004 a RF-007, CE-003)

### Pruebas de la Historia 3 ⚠️

- [X] T016 [P] [US3] Pruebas de rangos en `tests/lector-web/red-segura.test.js` para cada rango de D-05 en IPv4 e IPv6, direcciones IPv4 mapeadas en IPv6, `169.254.169.254`, y direcciones públicas válidas aceptadas
- [X] T017 [US3] Pruebas de resolución en `tests/lector-web/red-segura.test.js` (mismo archivo que T016, por eso sin [P]): un nombre autorizado que resuelve a un rango prohibido devuelve `DESTINO_NO_PUBLICO`; si el resolutor devuelve varias direcciones y una es prohibida, se rechaza; el resolutor se vuelve a consultar en cada redirección; la `lookup` se prueba en sus dos modos de llamada (una dirección y todas las direcciones, `all: true`)
- [X] T018 [US3] Pruebas de redirección y de red en `tests/lector-web/integracion.test.js` (modo: servidor local con el código real de red): redirección a dominio no autorizado → `FUENTE_NO_AUTORIZADA`; a destino no público → `DESTINO_NO_PUBLICO`; a `http` → `URL_INVALIDA`; más de 3 saltos o ciclo → `DEMASIADAS_REDIRECCIONES`; las conexiones registradas solo van a hosts autorizados; la petición saliente no lleva cabeceras `Cookie` ni `Authorization` (RF-018); una dirección con puerto distinto de 443 → `URL_INVALIDA`

### Implementación de la Historia 3

- [X] T019 [P] [US3] Implementar en `lector-web/red-segura.js` la función `esDireccionProhibida()` con aritmética propia sobre `net` y los rangos de D-05
- [X] T020 [US3] Implementar en `lector-web/red-segura.js` la función `lookup` validada (debe atender tanto la llamada que pide una dirección como la que pide todas con `all: true`, y validar todas las devueltas; sujeto a verificación en Node 20 o superior) y la petición `https.request` con esa `lookup`, aplicando `opcionesRedPrueba` solo si el constructor las recibió (`permitirLoopback` exonera únicamente 127.0.0.0/8 y ::1, que es donde escucha el servidor de prueba; los demás rangos de D-05 siguen prohibidos), sin reutilizar conexiones, sin cookies, `GET` con `Accept: text/html, text/plain`, verificación TLS siempre activa y seguimiento automático de redirecciones desactivado (D-02)
- [X] T021 [US3] Implementar en `lector-web/red-segura.js` el manejo manual de redirecciones: cada salto vuelve a pasar por T013 y T014, con tope de `maxRedirecciones` (D-07) y registro de la cadena
- [X] T022 [US3] Conectar en `lector-web/index.js` el paso de descarga tras la autorización. Hacer pasar T016 a T018

**Punto de control**: el lector solo contacta destinos autorizados y públicos

---

## Fase 5: Historia 1 - Leer una página oficial con trazabilidad (Prioridad: P1) 🎯 MVP

**Meta**: devolver el texto con autoridad, direcciones, fecha, huellas y vigencia pendiente

**Prueba independiente**: leer una página de un dominio de prueba autorizado y verificar los metadatos, la vigencia y la estabilidad de la huella (RF-009 a RF-012, CE-002, CE-007)

**Dependencia**: requiere las Fases 3 y 4

### Pruebas de la Historia 1 ⚠️

- [X] T023 [P] [US1] Pruebas de extracción en `tests/lector-web/extraccion-texto.test.js` con fixtures HTML: eliminación de `script`, `style`, navegación y pie; saltos de línea por bloque; entidades nombradas y numéricas; codificaciones UTF-8 e ISO-8859-1 declaradas por cabecera y por `<meta>`; HTML mal formado
- [X] T024 [P] [US1] Prueba de integración en `tests/lector-web/integracion.test.js` (T026 va después por compartir archivo; modo: servidor local con el código real de red): lectura exitosa devuelve todos los metadatos de data-model.md, fecha en ISO 8601 UTC, `hashContenido` y `hashTexto` en SHA-256 hexadecimal, y dos lecturas del mismo contenido dan huellas iguales mientras un cambio las modifica
- [X] T025 [P] [US1] Prueba de invariante en `tests/lector-web/vigencia-invariante.test.js`: recorre todos los resultados exitosos de las pruebas de integración y falla si `estadoVigencia` no es `PENDIENTE_VERIFICACION`; comprueba que `resultado.js` no exporta forma alguna de establecer otro valor
- [X] T026 [US1] Prueba de contenido hostil en `tests/lector-web/integracion.test.js` (modo: función de petición simulada): una página con instrucciones dirigidas a un asistente de IA se devuelve como texto, con `tratamiento: DATO_NO_CONFIABLE`, sin alterar ningún comportamiento (CE-007)

### Implementación de la Historia 1

- [X] T027 [P] [US1] Implementar en `lector-web/extraccion-texto.js` la decodificación de caracteres con `TextDecoder` (cabecera, luego `<meta>`, luego UTF-8) y la limpieza de HTML de D-06
- [X] T028 [US1] Implementar en `lector-web/index.js` el cálculo de huellas con `crypto` y el armado del resultado con autoridad, dominio final, direcciones, redirecciones, fecha, estado HTTP, tipo de contenido y bytes, con `estadoVigencia` y `tratamiento` fijos
- [X] T029 [US1] Completar en `lector-web/index.js` el flujo `leer()` de extremo a extremo con registro de auditoría de los éxitos. Hacer pasar T023 a T026

**Punto de control (MVP)**: las historias P1 funcionan en conjunto. Es el mínimo para usar el lector una vez activados los dominios

---

## Fase 6: Historia 4 - Acotar tamaño y tiempo (Prioridad: P2)

**Meta**: ninguna página grande o lenta agota los recursos

**Prueba independiente**: leer una página sobre el límite de tamaño, un archivo comprimido que se expande en exceso y un servidor lento (RF-008, CE-004)

### Pruebas de la Historia 4 ⚠️

- [X] T030 [P] [US4] Pruebas en `tests/lector-web/red-segura.test.js` (modo: servidor local con el código real de red): cuerpo mayor a `maxBytes` → `TAMANO_EXCEDIDO` sin entregar contenido parcial; cuerpo comprimido pequeño que supera el límite al descomprimirse → `TAMANO_EXCEDIDO`; servidor que no responde o responde con lentitud → `TIEMPO_AGOTADO` en el tiempo configurado

### Implementación de la Historia 4

- [X] T031 [US4] Implementar en `lector-web/red-segura.js` el límite de bytes recibidos con interrupción de la descarga, la descompresión con `zlib` contando manualmente los bytes descomprimidos durante el flujo y cortando al exceder el límite (sin depender de `maxOutputLength`, cuyo alcance sobre flujos está sujeto a verificación), y el temporizador de toda la operación incluidas las redirecciones. Hacer pasar T030

---

## Fase 7: Historia 5 - Declarar con claridad lo que no se pudo leer (Prioridad: P2)

**Meta**: cada fallo tiene causa clara en español; nunca se entrega texto vacío como éxito

**Prueba independiente**: leer páginas con desafío anti-robot, PDF, otros formatos, sin texto, con certificado inválido y con servidor caído (RF-013, CE-005)

### Pruebas de la Historia 5 ⚠️

- [X] T032 [P] [US5] Pruebas en `tests/lector-web/extraccion-texto.test.js` y `integracion.test.js` (modo: función de petición simulada, salvo `CERTIFICADO_INVALIDO`, que usa el servidor local sin el certificado de confianza): estados 403, 429 y 503 con marcadores de desafío → `DESAFIO_ANTIROBOT`; `application/pdf` y firma `%PDF-` con tipo declarado distinto → `FORMATO_NO_SOPORTADO` con mensaje específico sobre PDF fuera de la versión 1; otros tipos → `FORMATO_NO_SOPORTADO`; texto extraído menor al umbral → `SIN_TEXTO`; certificado inválido → `CERTIFICADO_INVALIDO`; error de conexión o estado 5xx → `FUENTE_NO_DISPONIBLE`. Verificar además que el mensaje de cada uno de los 12 códigos de `CODIGOS_FALLO` está redactado en español y no está vacío (RF-017)

### Implementación de la Historia 5

- [X] T033 [P] [US5] Implementar en `lector-web/extraccion-texto.js` la detección de desafío anti-robot por estado y marcadores (D-09) y el umbral de texto mínimo con la advertencia de texto corto
- [X] T034 [US5] Implementar en `lector-web/index.js` el filtro de formatos de D-08 (tipo declarado y firma `%PDF-` sobre los primeros bytes) y la asignación de códigos de fallo para TLS y errores de conexión. Hacer pasar T032

---

## Fase 8: Historia 6 - Mantener y auditar la lista de dominios (Prioridad: P3)

**Meta**: consultar la lista con su estado, integrar el lector al agente y dejar documentado el procedimiento de activación

**Prueba independiente**: ejecutar `fuentes-web` y `leer` desde el CLI (RF-014 a RF-016, contracts/cli.md)

### Pruebas de la Historia 6 ⚠️

- [X] T035 [P] [US6] Pruebas en `tests/lector-web/cli.test.js`: `fuentes-web` lista dominios con autoridad y estado; `leer` sin URL sale con código 2; `leer` de dominio no autorizado sale con código 1 y mensaje en español; `--json` imprime la estructura del contrato; los subcomandos existentes (`activar`, `fuentes`, `consulta`, `help`) no cambian de comportamiento; tras ejecutar `activar` (que reconstruye y sobrescribe `agents['juridico-especializado']`) la capacidad `lectura-web-oficial` sigue presente en `mcp-config.json`, y la clave `lectorWeb` no se altera

### Implementación de la Historia 6

- [X] T036 [US6] Agregar en `lector-web/index.js` los métodos `fuentesAutorizadas()` y `estado()` completos según contracts/modulo-lector.md
- [X] T037 [US6] Agregar en `agente-juridico-especializado.js` el método `leerPaginaOficial(url)` y los subcomandos `leer` y `fuentes-web` con la salida de contracts/cli.md, incluida la línea "Vigencia: PENDIENTE DE VERIFICACION"; agregar la capacidad `lectura-web-oficial` al objeto que construye `crearAgenteJuridico()` para que `activar` no la borre; actualizar el texto de ayuda sin tocar el flujo de los demás comandos
- [X] T038 [US6] Agregar en `mcp-config.json` la clave `lectorWeb` con los límites por defecto y la lista de dominios candidatos de research.md D-03, todos con `activo: false`, `verificadoEn: null` y `fuenteVerificacion: null`; agregar la capacidad `lectura-web-oficial` al agente `juridico-especializado` (en coherencia con T037). Validar el archivo contra `contracts/config-lector-web.schema.json`
- [X] T039 [US6] Documentar en `CLAUDE.md` el comando `leer`, la lista de dominios y su estado, el requisito de Node.js 20 o superior y la advertencia de que el lector entrega texto sin verificar vigencia. Dejar expreso que la lista del lector es subordinada a las 9 fuentes oficiales y no agrega una décima fuente (nota, no fila de la tabla de fuentes). No describir `leer` como parte de `consulta`

---

## Fase 9: Pulido y verificación final

**Propósito**: cierre, revisión de seguridad y evidencia

- [X] T040 Ejecutar `node --test tests/lector-web/*.test.js` (no la carpeta: falla en Node 22) y confirmar que todas las pruebas pasan sin acceso a internet (Escenario A de quickstart.md)
- [X] T041 [P] Revisar adversarialmente `lector-web/` contra la lista de comprobación del plan: no hay dependencias externas, no hay llamadas a servicios de terceros, la verificación TLS nunca se desactiva, la vigencia no se puede cambiar, el contenido leído no se registra
- [X] T042 [P] Ejecutar los escenarios B, C, E y F de quickstart.md y anotar el resultado en `specs/002-lector-web-oficial/checklists/requirements.md`
- [ ] T043 Ejecutar `/speckit-analyze` otra vez sobre el código terminado y corregir las inconsistencias que aparezcan

---

## Tareas de gobierno (no son código; las realiza un responsable del despacho)

Estas tareas bloquean el uso real, no la construcción. Sin ellas, todos los dominios permanecen inactivos y el lector no lee nada.

- [ ] G001 Verificar, para cada dominio candidato de research.md D-03, que la dirección sea la oficial de la entidad, consultando su fuente institucional
- [ ] G002 Resolver las inconsistencias de hosts: Corte Constitucional (`api.` y `www.`), Corte Suprema y SUIN
- [ ] G003 Registrar `verificadoEn`, `fuenteVerificacion` y `activo: true` en `mcp-config.json` solo para los dominios verificados
- [ ] G004 Decidir qué dominios adicionales (relatoría de la Corte Constitucional, SUIN-Juriscol, Secretaría del Senado, Rama Judicial, Imprenta Nacional) se agregan, con el mismo procedimiento
- [ ] G005 Decidir, antes de publicar la documentación de T039, qué se hace con el comando `consulta` del agente: hoy solo imprime mensajes de verificación sin consultar nada, lo que choca con el principio I de la constitución y con las garantías de `CLAUDE.md`. Opciones: corregirlo en una especificación aparte o rotularlo como no operativo. Está fuera del alcance de esta funcionalidad, pero no debe quedar sin decisión

---

## Dependencias y orden de ejecución

1. Fase 1 → Fase 2 → resto. La Fase 2 bloquea todo.
2. Fase 3 (US2) y Fase 4 (US3) pueden avanzar en paralelo tras la Fase 2, pero ambas tocan `lector-web/index.js` y `lista-autorizada.js` o `red-segura.js`; coordinar los cambios sobre `index.js` (T015, T022).
3. Fase 5 (US1) requiere las Fases 3 y 4. Las tareas de prueba que comparten archivo (`integracion.test.js`, `red-segura.test.js`, `extraccion-texto.test.js`, `lista-autorizada.test.js`) no se ejecutan en paralelo entre sí: las marcas [P] solo se mantienen entre archivos distintos.
4. Fase 6 (US4) y Fase 7 (US5) requieren la Fase 5 y no dependen entre sí; ambas editan `red-segura.js` o `index.js`, por lo que T031 y T034 no deben ejecutarse en simultáneo.
5. Fase 8 (US6) requiere la Fase 5.
6. Fase 9 al final. Las tareas de gobierno pueden empezar desde ya.

### Dentro de cada historia

1. Pruebas primero, comprobando que fallan.
2. Utilidades puras antes que la integración en `index.js`.
3. Se cierra la historia cuando sus pruebas pasan.

### Oportunidades de paralelismo

1. Fase 1: T002 y T003.
2. Fase 2: T005 con T007; T006 con T008.
3. Pruebas de cada historia marcadas [P], por ejemplo T010 y T011 (archivos distintos), T023, T024 y T025.
4. Fase 6 y Fase 7 en paralelo, con la salvedad anterior.

## Estrategia de implementación

1. Producto mínimo viable: Fases 1 a 5 (US2, US3 y US1). Detener y validar con el Escenario A y las tareas de gobierno G001 a G003 antes de continuar.
2. Entrega incremental: agregar US4, US5 y US6, validando cada una por separado.
3. No activar ningún dominio en `mcp-config.json` antes de completar G001 a G003 para ese dominio.

## Resumen

Total de tareas de código: 43 (T001 a T043). Tareas de gobierno: 5 (G001 a G005).

| Fase | Historia | Tareas |
|---|---|---|
| 1 Preparación | sin historia | T001 a T003 (3) |
| 2 Fundamentos | sin historia | T004 a T009 (6) |
| 3 | US2 | T010 a T015 (6) |
| 4 | US3 | T016 a T022 (7) |
| 5 | US1 | T023 a T029 (7) |
| 6 | US4 | T030 a T031 (2) |
| 7 | US5 | T032 a T034 (3) |
| 8 | US6 | T035 a T039 (5) |
| 9 Pulido | sin historia | T040 a T043 (4) |
