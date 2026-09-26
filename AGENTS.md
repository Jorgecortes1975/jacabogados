# AGENTS.md | JAC Abogados Asociados

Instrucciones operativas para cualquier agente de codificación o agente de IA (Claude Code, Codex, Cursor, Gemini CLI, Copilot, Jules, entre otros) que trabaje en este repositorio. Este archivo complementa `CLAUDE.md` (visión del sistema) y `README-LEXA.md` (guía para personas). En caso de contradicción prevalecen, en este orden: la instrucción explícita del usuario en el chat, `.specify/memory/constitution.md` y este archivo.

## 1. Qué es este proyecto

Ecosistema de apoyo jurídico del despacho JAC Abogados Asociados (Colombia). Integra tres capas:

1. Configuración de fuentes oficiales colombianas como transportes MCP (`mcp-config.json`).
2. Agentes y orquestación LEXA-JAC: agente jurídico especializado, super router y ecosistema de agentes (`agente-juridico-especializado.js`, `lexa-super-router.js`, `lexa-ecosystem.json`, `agente-config.json`).
3. Gestión comercial del despacho: CRM de prospectos y plan de marketing (`generar_crm.py`, `crm_jaabogados.*`, `plan_marketing_digital_jaabogados.md`).

El usuario final es un abogado litigante y consultor colombiano. Todo lo que el sistema entrega puede terminar en un despacho judicial o en manos de un cliente. Un dato jurídico falso no es un bug menor: es un riesgo profesional y disciplinario.

## 2. Regla crítica: estado real de la verificación

Estado verificado del código al 2026-09-26:

1. `agente-juridico-especializado.js`, `lexa-super-router.js` y `claude-mcp-transport.js` no realizan ninguna petición HTTP ni llamada MCP. Solo leen y escriben `mcp-config.json` e imprimen texto.
2. El comando `consulta` imprime mensajes como «Ejecutando búsqueda en fuentes oficiales» y «Generando respuesta verificada», pero no consulta ninguna fuente. Ninguna salida de ese comando constituye verificación jurídica.
3. Las marcas `verificado: true`, `oficial: true` y `enabled: true` en la configuración describen la intención de diseño, no una comprobación ejecutada.

En consecuencia, los agentes deben:

1. No presentar la salida de estos scripts como prueba de existencia o vigencia de una norma o sentencia.
2. Verificar citas únicamente mediante consulta real a fuente oficial (conectores MCP disponibles en la sesión, como Croma para Corte Constitucional, Corte Suprema, Consejo de Estado, Función Pública, DIAN, SIC y Supersociedades, o Legal Data Hunter), o dejar la cita marcada como «sujeta a verificación».
3. No agregar nuevos mensajes de éxito simulados. Si una función no está implementada, la salida debe decirlo de forma explícita (por ejemplo: «Consulta no implementada: no se verificó ninguna fuente»).

## 3. Reglas jurídicas no negociables

Derivadas de la constitución del proyecto (principios I a V). Aplican al código, a los textos de salida, a las specs y a cualquier documento generado.

1. Sin alucinaciones. No inventar leyes, artículos, sentencias, radicados, fechas, magistrados ponentes, conceptos ni reglas jurisprudenciales, tampoco en datos de ejemplo, fixtures o pruebas. En ejemplos, usar marcadores evidentes como `SENTENCIA-EJEMPLO-000` o `[NORMA POR VERIFICAR]`.
2. Verificación cruzada. Vigencia de normas, cuantías, plazos y existencia de sentencias se confirman contra más de una fuente oficial cuando exista más de una aplicable. No desactivar `verificacionDatos.requiereMultiplesFuentes` sin justificación escrita en el PR.
3. Cita completa. Norma: nombre, número y año, artículo, estado de vigencia, fuente oficial y fecha de verificación. Sentencia: corporación, sala, número o radicado, fecha, ponente si está disponible, fuente oficial y fecha de verificación.
4. Tres estados de resultado, nunca dos. Toda verificación clasifica cada cita como `verificada`, `no encontrada` o `discrepante`. Una falla de conexión con la fuente se reporta como `no verificada por indisponibilidad`, nunca como verificada.
5. Distinguir categorías. Separar obligación legal, jurisprudencia aplicable, doctrina, práctica usual y criterio estratégico. No convertir un obiter dictum ni una opinión doctrinal en regla obligatoria.
6. Nivel de certeza. Las salidas jurídicas indican certeza alta, media o sujeta a verificación.
7. Frase obligatoria cuando no hay verificación real: «No puedo confirmar en este momento la vigencia o existencia exacta de las fuentes jurídicas. Entrego una respuesta preliminar sujeta a verificación en fuente oficial.»

## 4. Idioma y estilo de las salidas

1. Todo texto dirigido al abogado o al cliente (mensajes de CLI, reportes, specs, plantillas, documentación) va en español jurídico colombiano, formal y preciso.
2. Identificadores de código, nombres de variables y comentarios técnicos pueden ir en inglés o español; mantener la convención del archivo que se edita (los scripts actuales usan nombres en español: `transportes`, `fuentes`, `consulta`).
3. En documentos jurídicos generados: títulos y numeración, párrafos breves, sin asteriscos ni guiones como viñetas, sin frases decorativas y con cierre operativo (qué hacer, qué riesgo se asume).

## 5. Mapa del repositorio

| Ruta | Función | Observación para agentes |
|------|---------|--------------------------|
| `agente-juridico-especializado.js` | CLI del agente jurídico: `activar`, `fuentes`, `consulta`, `help` | `activar` sobrescribe el bloque `agents.juridico-especializado` de `mcp-config.json` |
| `lexa-super-router.js` | Router LEXA-JAC: `arquitectura`, `procesar`, `agentes`, `status` | Clasificación de mensajes por reglas; no invoca agentes reales |
| `claude-mcp-transport.js` | CLI de transportes: `add`, `list`, `activate`, `remove` | Único mecanismo autorizado para modificar transportes |
| `mcp-config.json` | Fuentes oficiales y agentes | Cambiar fuentes exige actualizar también la tabla de `CLAUDE.md` |
| `lexa-ecosystem.json` | Arquitectura de 3 niveles y 6 agentes | Consultar antes de crear un agente nuevo (principio V) |
| `agente-config.json` | Configuración del agente jurídico | |
| `generar_crm.py` | Genera `crm_jaabogados.xlsx` | Requiere `openpyxl` |
| `crm_jaabogados.csv`, `.xlsx` | CRM de prospectos | Contiene datos personales de terceros (ver sección 9) |
| `.specify/`, `specs/` | Spec Kit y especificaciones | `specs/001-validar-escritos-legales` en estado borrador |
| `.claude/skills/speckit-*` | Skills de Spec Kit | |
| `.env.example` | Plantilla de variables de entorno | Nunca commitear `.env` |

## 6. Comandos de entorno

Requisitos: Node.js 18 o superior (verificado con v22) y Python 3. No hay `package.json` ni dependencias npm; los scripts usan solo módulos nativos (`fs`, `path`).

```bash
# Agente jurídico
node agente-juridico-especializado.js help
node agente-juridico-especializado.js fuentes
node agente-juridico-especializado.js activar        # escribe en mcp-config.json

# Router LEXA-JAC
node lexa-super-router.js agentes
node lexa-super-router.js status
node lexa-super-router.js procesar "texto del mensaje"

# Transportes MCP
node claude-mcp-transport.js list

# CRM
pip install openpyxl
python3 generar_crm.py
```

Los comandos deben ejecutarse desde la raíz del repositorio, porque los scripts resuelven `mcp-config.json` con `process.cwd()`.

## 7. Pruebas y validación antes de commit

No existe suite de pruebas automatizada ni CI en `.github/workflows`. Mientras no exista, el agente ejecuta como mínimo:

```bash
node --check agente-juridico-especializado.js
node --check lexa-super-router.js
node --check claude-mcp-transport.js
node -e "for (const f of ['mcp-config.json','lexa-ecosystem.json','agente-config.json']) JSON.parse(require('fs').readFileSync(f,'utf8'))"
node agente-juridico-especializado.js fuentes
node lexa-super-router.js status
python3 -m py_compile generar_crm.py
```

Reglas adicionales:

1. Si un cambio altera `mcp-config.json` como efecto lateral de ejecutar `activar`, revisar el diff y revertir lo que no sea intencional (por ejemplo, `createdAt`).
2. Cualquier prueba nueva que involucre citas jurídicas usa datos ficticios marcados como tales o citas verificadas en fuente oficial con fecha de verificación en el propio fixture.
3. Al implementar verificación real, cubrir los tres estados de la regla 3.4 y el caso de fuente caída.

## 8. Flujo de trabajo para cambios

1. Cambios medianos o grandes (nuevo tipo de consulta, nueva fuente, nuevo agente, cambio del router) siguen Spec Kit: `/speckit-specify`, `/speckit-clarify` (opcional), `/speckit-plan`, `/speckit-tasks`, `/speckit-analyze`, `/speckit-implement`.
2. `/speckit-analyze` es obligatorio antes de implementar si el cambio toca verificación de datos o fuentes oficiales.
3. Antes de crear un agente, transporte o skill, comprobar que no exista ya en `lexa-ecosystem.json`, `mcp-config.json` o en las skills del despacho. Preferir extender sobre duplicar.
4. Mensajes de commit en español, en modo imperativo y descriptivos (ejemplo del historial: «Spec: validar-escrito — validación anti-alucinación de escritos completos»).
5. Pull requests en español con: qué cambia, por qué, cómo se validó y, si aplica, qué excepción a los principios I o II se acepta y con qué riesgo.

## 9. Seguridad, confidencialidad y datos personales

1. Secretos solo en `.env` (ignorado por git). Nunca escribir claves de Legal Data Hunter, DIAN, SMTP, Stripe, Twilio u otros servicios en código, configuración versionada, logs ni PR.
2. `crm_jaabogados.csv` y `.xlsx` contienen nombres, cargos, correos y teléfonos de personas naturales. Su tratamiento está sujeto al régimen de protección de datos personales (Ley 1581 de 2012 y normas reglamentarias; verificar vigencia y reglamentación aplicable en fuente oficial antes de usarlo como fundamento en un documento). El agente no debe enviar estos datos a servicios externos, publicarlos, copiarlos a artefactos públicos ni ampliarlos con datos obtenidos por scraping sin instrucción expresa del usuario.
3. No incorporar al repositorio información de expedientes o clientes reales (escritos, radicados de procesos en curso, datos sensibles). Si una tarea lo exige, usar datos seudonimizados.
4. Toda acción hacia afuera (enviar correos, publicar, crear documentos compartidos, abrir PR) requiere confirmación del usuario salvo autorización previa y expresa.

## 10. Ecosistema de agentes y reparto de tareas

Según `lexa-ecosystem.json`, la arquitectura tiene tres niveles: dashboard de monitoreo, super router y agentes especializados. Estado declarado de los agentes:

| Agente | Funciones | Estado declarado |
|--------|-----------|------------------|
| Jurídico Especializado | escritos procesales, tutelas, laboral; sub-agentes investigador, redactor y jac-validator | activo en configuración |
| Mercantil | contratos, SAS, litigio comercial | habilitado |
| Comunicaciones | correos, comunicaciones, reportes | habilitado |
| Tributario | impuestos, DIAN, cumplimiento tributario | nuevo |
| Ambiental | licencias, normativa y litigio ambiental | nuevo |
| Laboral Avanzado | conflictos laborales, nómina, seguridad social | nuevo |

«Estado declarado» significa lo que registra la configuración; ninguno de estos agentes ejecuta hoy lógica autónoma real (ver sección 2). Al documentar o comercializar el sistema, no describir capacidades que el código no implementa.

## 11. Prioridades de desarrollo sugeridas

1. Implementar verificación real en `consulta` (al menos `verificar` y `norma`) contra una fuente oficial, o reemplazar los mensajes simulados por un aviso de funcionalidad no implementada.
2. Completar `specs/001-validar-escritos-legales` con el flujo de Spec Kit.
3. Agregar `package.json` con scripts `check` y `test` y una prueba mínima de humo para los tres CLI.
4. Alinear la documentación (`CLAUDE.md`, `README-LEXA.md`, `LEXA-INTEGRATION.md`) con el estado real del código.
