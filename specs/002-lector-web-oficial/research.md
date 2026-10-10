# Investigación (Fase 0): Lector Web de Fuentes Oficiales

**Fecha**: 2026-10-10

No quedan puntos marcados como pendientes de aclaración. Cada decisión indica su alternativa descartada. Las verificaciones sobre dominios reales NO se hicieron en esta fase (sin acceso a internet en la sesión) y quedan como tareas obligatorias previas a la activación.

## Hallazgos sobre el estado actual del repositorio

1. El comando `consulta` de `agente-juridico-especializado.js` es hoy una simulación: imprime mensajes ("Ejecutando búsqueda…", "Generando respuesta verificada…") sin realizar ninguna consulta real. Consecuencia: el lector no debe presentarse como parte de `consulta`, ni heredar su lenguaje de "verificado". Se expone como subcomando separado (`leer`).
2. Las entradas del código marcan `verificado: true` para los transportes, pero no hay evidencia en el repositorio de qué se verificó ni cuándo. No se reutiliza ese indicador como prueba de verificación de dominios.
3. Hay inconsistencias de hosts entre archivos para una misma entidad:
   1. Corte Constitucional: `api.corteconstitucional.gov.co` en `mcp-config.json` y `www.corteconstitucional.gov.co` en el código.
   2. Corte Suprema: `www.cortesupremajusticia.gov.co` en `mcp-config.json`.
   3. SUIN: `www.funcionpublica.gov.co/eva/gestornormativo/` en `mcp-config.json`.
   Estas diferencias se resuelven en la verificación previa a la activación (D-03).

## Decisiones

### D-01. Lenguaje y módulos
Decisión: Node.js (CommonJS) con módulos nativos únicamente.
Justificación: instrucción del usuario, consistencia con el ecosistema, superficie de ataque mínima y sin gestión de dependencias (no existe `package.json`).
Alternativas descartadas: `fetch` nativo de Node (ofrece menos control sobre la resolución DNS y las redirecciones por salto), bibliotecas HTTP externas (agregan dependencias).

### D-02. Cliente de red
Decisión: `https.request` con `lookup` personalizada y `agent` sin reutilización de conexiones.
Justificación: permite validar la dirección IP en el momento exacto de la conexión y entregar a la conexión esa misma dirección, lo que impide el cambio de DNS entre la validación y la conexión. Mantiene la verificación de certificados activa; no se desactiva en ningún caso.
Nota de implementación (sujeto a verificación en Node 20 o superior): la selección automática de familia de direcciones puede invocar `lookup` pidiendo todas las direcciones a la vez (`all: true`). La `lookup` debe manejar ambos modos de llamada y validar todas las direcciones devueltas; las pruebas cubren los dos modos.
Alternativas descartadas: validar con `dns.lookup` y luego conectar por nombre (vulnerable a cambio de DNS), `fetch` (no permite fijar la dirección validada de forma directa).

### D-03. Origen y activación de la lista de dominios
Decisión: la lista vive en `mcp-config.json`, bajo `lectorWeb.dominios`. Cada entrada tiene `activo: false` por defecto y solo pasa a `true` con `verificadoEn` (fecha) y `fuenteVerificacion` (referencia oficial) completos. El módulo ignora las entradas inactivas.
Candidatos iniciales, tomados de los hosts ya presentes en `mcp-config.json` y el código, todos sin verificar:
1. `www.corteconstitucional.gov.co` y `api.corteconstitucional.gov.co`
2. `www.consejodeestado.gov.co`
3. `www.cortesupremajusticia.gov.co`
4. `www.diariooficial.gov.co`
5. `www.funcionpublica.gov.co`
6. `www.congreso.gov.co`
7. `www.supersociedades.gov.co`
8. `www.dian.gov.co`
Candidatos adicionales a confirmar antes de incluirlos: relatoría de la Corte Constitucional, SUIN-Juriscol, Secretaría del Senado, Rama Judicial e Imprenta Nacional. No se registran en la configuración inicial porque no hay verificación de su dirección exacta.
Justificación: coherente con la constitución (la configuración es el contrato técnico) y con el principio de no afirmar lo no verificado.
Alternativas descartadas: aceptar cualquier `*.gov.co` (un dominio de cualquier entidad pública no equivale a fuente jurídica confiable, y se amplía la superficie de ataque), lista fija en el código (viola la restricción de configuración).

### D-04. Coincidencia de dominio
Decisión: se normaliza con la clase `URL` de Node (que convierte nombres internacionales a su forma ASCII y pasa a minúsculas) y se compara contra la lista. Coincidencia exacta del host, o sufijo `.` + host solo si la entrada declara `incluyeSubdominios: true`. Se rechazan direcciones IP escritas directamente, hosts con punto final ambiguo y hosts con caracteres no ASCII tras la normalización.
Justificación: evita dominios engañosos como `dian.gov.co.example.com` o `www.dian.gov.co@malicioso.com`.
Alternativas descartadas: expresiones regulares sobre el texto de la URL, uso de listas de sufijos públicos (agregan dependencia sin necesidad).

### D-05. Rangos de red prohibidos
Decisión: rechazar si alguna dirección resuelta cae en IPv4: 0.0.0.0/8, 10.0.0.0/8, 100.64.0.0/10, 127.0.0.0/8, 169.254.0.0/16, 172.16.0.0/12, 192.0.0.0/24, 192.0.2.0/24, 192.168.0.0/16, 198.18.0.0/15, 198.51.100.0/24, 203.0.113.0/24, 224.0.0.0/4, 240.0.0.0/4; o IPv6: `::`, `::1`, `fc00::/7`, `fe80::/10`, `ff00::/8`, `2001:db8::/32`, y direcciones IPv4 mapeadas (`::ffff:a.b.c.d`) evaluadas con las reglas IPv4. Se implementa con `net` y aritmética propia.
Justificación: cubre las direcciones locales, privadas, de enlace local, de metadatos de nube (169.254.169.254) y de documentación.
Alternativas descartadas: biblioteca externa de rangos IP (dependencia), solo bloquear 127.0.0.1 (insuficiente).

### D-06. Extracción de texto
Decisión: extractor propio por etapas: decodificación del conjunto de caracteres (cabecera `Content-Type`, luego `<meta charset>`, luego UTF-8) con `TextDecoder`; eliminación de `script`, `style`, `noscript`, `svg`, `nav`, `header`, `footer`, `aside`, `form` y comentarios; conversión de bloques a saltos de línea; decodificación de entidades; normalización de espacios.
Implementación (hallazgo de la revisión adversarial T041): la primera versión usaba expresiones regulares con búsqueda perezosa sobre todo el documento. Medido con 5 MiB de HTML roto u hostil (`<script>`, `<!--` o `<nav>` repetidos sin cierre, `<a` sin `>`), cada caso tardó más de 25 s por costo cuadrático y bloqueaba todo el proceso, sin que el temporizador de lectura pudiera interrumpirlo (el temporizador no actúa durante trabajo sincrónico). Se reemplazó por un recorrido lineal de una sola pasada que memoriza las búsquedas de cierre que fallan; los mismos casos tardan entre 10 y 184 ms y hay pruebas de regresión con umbral de 3 s.
Limitación aceptada y declarada: es menos robusto que un analizador HTML completo. Para mitigarlo, el resultado incluye `advertencias` cuando el texto es corto o el HTML estaba mal formado, y las pruebas usan páginas de muestra.
Alternativas descartadas: `cheerio` o `jsdom` (dependencias externas, contrarias a la instrucción salvo que sea imprescindible; se reconsidera si las pruebas con páginas reales muestran fallos graves), el servicio Jina Reader (envía la URL a un tercero, prohibido por el requisito).

### D-07. Límites
Decisión: tamaño máximo 5 MiB sobre bytes recibidos y 5 MiB sobre bytes descomprimidos (los bytes descomprimidos se cuentan manualmente durante el flujo y se corta al exceder el límite; no se depende de `maxOutputLength` de `zlib`, cuyo alcance sobre flujos queda sujeto a verificación); tiempo máximo 20 s para toda la operación; máximo 3 redirecciones; solo puerto 443; solo `GET`; cabecera `Accept` limitada a `text/html, text/plain`; sin cookies; `User-Agent` identificable del despacho.
Justificación: coherente con RF-008 y con el rango de valores del proyecto estudiado, con protección adicional contra archivos comprimidos que se expanden en exceso.
Alternativas descartadas: sin límite de descompresión (riesgo de agotar memoria), confiar solo en `maxOutputLength` (alcance no confirmado).

### D-08. Formatos y PDF (decisión confirmada por el usuario)
Decisión: se aceptan `text/html`, `application/xhtml+xml` y `text/plain`. Todo otro tipo falla con el código `FORMATO_NO_SOPORTADO`. Los PDF se detectan por `Content-Type: application/pdf` o por la firma `%PDF-` en los primeros bytes (aunque el servidor declare otro tipo) y fallan con un mensaje específico que indica que los PDF están fuera de la versión 1 y que debe consultarse el documento manualmente en la fuente.
Impacto reconocido: muchas providencias y diarios se publican en PDF, por lo que la versión 1 cubre menos fuentes de las deseables. Queda como candidato para una versión 2.

### D-09. Detección de desafío anti-robot
Decisión: estados 403, 429 y 503 combinados con marcadores conocidos en el cuerpo (`Just a moment`, `captcha`, `Attention Required`, `/cdn-cgi/challenge-platform/`) producen `DESAFIO_ANTIROBOT`. No se intenta eludir.
Justificación: el sistema no debe sortear controles de acceso del sitio. Se informa al abogado para consulta manual.

### D-10. Trazabilidad y huellas
Decisión: SHA-256 en hexadecimal del contenido ya descomprimido (`hashContenido`; no depende de la compresión de transporte) y del texto extraído (`hashTexto`). Fecha y hora en ISO 8601 UTC. Se registran URL solicitada, URL final y la cadena de redirecciones.
Justificación: permite a otro abogado comprobar que el texto citado corresponde a lo que publicó la autoridad en ese momento.

### D-11. Estado de vigencia
Decisión: constante `ESTADO_VIGENCIA = Object.freeze('PENDIENTE_VERIFICACION')`. El módulo no exporta ninguna función que acepte un estado distinto. Una prueba recorre los resultados de éxito de todas las pruebas de integración y falla si encuentra otro valor.
Justificación: RF-011 y principios I y II.

### D-12. Bitácora de auditoría
Decisión: JSON Lines en `logs/lector-web-auditoria.jsonl`, un registro por solicitud, con fecha, URL solicitada, dominio, resultado, código de fallo y huella. No guarda el contenido. Permisos de archivo restrictivos (0600 donde el sistema lo permita). Se agrega `logs/` a `.gitignore`.
Aviso: la bitácora puede contener direcciones que revelan el asunto consultado; por eso es local, no se versiona y debe protegerse como información reservada del despacho.
Alternativas descartadas: registrar el contenido (riesgo de reserva y tamaño), no registrar (sin auditoría, contrario a RF-015).

### D-13. Integración con el agente
Decisión: método `leerPaginaOficial(url)` en `AgentJuridicoEspecializado`; subcomandos `leer <url>` y `fuentes-web`; capacidad `lectura-web-oficial` declarada en `mcp-config.json` Y en el objeto que construye `crearAgenteJuridico()`. No se agrega servidor MCP.
Motivo del doble registro: el comando `activar` reconstruye `agents['juridico-especializado']` desde un objeto fijo en el código y sobrescribe lo que haya en el archivo; si la capacidad solo estuviera en `mcp-config.json`, `activar` la borraría. La clave `lectorWeb` no se ve afectada porque los scripts cargan y guardan el archivo completo.
Justificación: principio V de la constitución y ausencia de SDK MCP en el repositorio.
Alternativas descartadas: servidor MCP propio (dependencia de SDK y mayor superficie), integrarlo dentro de `consulta` (la simulación actual daría apariencia de verificación).

### D-14. Pruebas sin internet
Decisión: el constructor acepta `resolver`, `requestFn`, `ahora` y `rutaAuditoria` inyectables, y un objeto `opcionesRedPrueba` con `puerto`, `ca` (certificado de confianza) y `permitirLoopback`, documentado como exclusivo de pruebas. Las pruebas unitarias simulan DNS y respuestas; la prueba de integración levanta un servidor HTTPS local en un puerto de prueba, con un certificado generado al ejecutar las pruebas mediante `openssl` a partir de `tests/lector-web/fixtures/openssl-prueba.cnf` (el módulo `crypto` de Node no crea certificados X.509; no se versiona ninguna clave privada para no activar escáneres de secretos; si `openssl` falta, las pruebas con TLS se omiten), y una lista autorizada de prueba que no pertenece a producción.
El servidor de prueba escucha en la dirección local, que la regla D-05 prohíbe; por eso `permitirLoopback` exonera únicamente 127.0.0.0/8 y ::1 y deja prohibidos todos los demás rangos. Modos de prueba: las que ejercen el código real de red (`lookup`, tamaño, tiempo, redirecciones, TLS) usan el servidor local; las demás usan la función de petición simulada.
Salvaguardas: `opcionesRedPrueba` solo se lee del constructor, nunca de `mcp-config.json` (el esquema rechaza esas claves), y una prueba comprueba que una configuración de producción no puede cambiar el puerto ni el certificado de confianza. Sin esta opción, el código real de red (validación en `lookup`, límites, tiempo) no podría probarse, porque el puerto de producción es siempre 443.
Justificación: permite probar los controles de seguridad (rangos, redirecciones, límites) de forma determinista.

## Tareas obligatorias previas a la activación de dominios (fuera del código)

1. Para cada dominio candidato, un responsable confirma en la fuente oficial de la entidad que la dirección es la correcta, y registra `verificadoEn` y `fuenteVerificacion`.
2. Resolver las inconsistencias de hosts señaladas en los hallazgos.
3. Actualizar `CLAUDE.md` con la lista de dominios activos y la advertencia de que el lector no verifica vigencia.
