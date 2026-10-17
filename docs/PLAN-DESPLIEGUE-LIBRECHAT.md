# Plan de despliegue de LibreChat para JAC Abogados Asociados

Fecha de elaboración: 2026-10-17
Estado: plan preliminar, sujeto a verificación en la documentación oficial de LibreChat

## 0. Advertencia de verificación

No pude abrir la documentación oficial de LibreChat desde este entorno (el dominio librechat.ai no resolvió). Los nombres de variables y la sintaxis de librechat.yaml que aparecen abajo provienen de conocimiento previo y no están verificados contra la versión que se instale. Antes de ejecutar cada fase, confirme en el repositorio oficial de LibreChat (archivos .env.example y librechat.example.yaml de la versión elegida) que cada variable y cada campo existe. Nivel de certeza: medio.

La licencia MIT de LibreChat proviene de fuentes secundarias. Confírmela en el archivo LICENSE del repositorio oficial antes del despliegue.

## 1. Hallazgo que condiciona todo el plan

Este repositorio no contiene un servidor MCP. Verifiqué que:

1. mcp-config.json es un registro de fuentes de referencia, no un servidor.
2. claude-mcp-transport.js administra ese registro; no expone herramientas por el protocolo MCP.
3. Lo que sí funciona es la CLI `bin/jac` (consulta, sentencia, norma, validar, inventario, fuentes, doctor, prueba), que admite salida JSON con la opción `--json` en consulta y sentencia.

Consecuencia: LibreChat no puede conectarse hoy a este repositorio. Es necesario construir un servidor MCP delgado (jac-mcp) que envuelva la CLI. Esa es la fase 3 y es el trabajo de mayor valor.

Alcance real de lo que jac verifica (según CLAUDE.md del repositorio): conector real solo para la Corte Constitucional y un catálogo de 13 normas; verifica existencia y fecha, nunca vigencia. El servidor MCP no debe presentar más garantía que esa.

## 2. Decisiones de arquitectura

1. Entorno: servidor propio o equipo del despacho con Docker, no un equipo personal compartido.
2. Acceso: solo en red interna o detrás de una VPN. No exponer a internet en la fase de prueba.
3. Usuarios: registro público desactivado; cuentas creadas por el administrador.
4. Servidor MCP: contenedor separado, accesible únicamente desde la red interna de Docker, con transporte HTTP (streamable-http) o stdio según lo que soporte la versión instalada. Recomendación: contenedor separado, porque el contenedor de LibreChat no tiene Python ni este repositorio.
5. Modelos: una sola clave de API en la fase de prueba, con límite de gasto mensual configurado en el proveedor.
6. Datos: durante la prueba, solo información pública o ficticia. Ningún dato de clientes.

## 3. Fases

### Fase 0. Preparación (1 hora)

Requisitos: Docker y Docker Compose instalados, Git, 4 GB de RAM libres como mínimo, dominio o IP interna.

Acciones:

1. Cree un usuario de sistema sin privilegios para el despliegue.
2. Defina quién será el administrador de la herramienta y quién autoriza usuarios.
3. Consiga la clave de API de un proveedor de modelos y fije un tope de gasto.

Criterio de salida: Docker responde y existe una clave de API con tope de gasto.

### Fase 1. Instalación base (2 horas)

```bash
git clone https://github.com/danny-avila/LibreChat.git
cd LibreChat
git checkout <etiqueta de versión estable>   # no usar main en producción
cp .env.example .env
```

Acciones:

1. Elija una etiqueta de versión estable y regístrela en el acta de despliegue.
2. Genere valores únicos y aleatorios para las variables de secretos del .env (CREDS_KEY, CREDS_IV, JWT_SECRET, JWT_REFRESH_SECRET). No use los valores de ejemplo. Verifique los nombres exactos en .env.example de la versión elegida.
3. Desactive el registro público (ALLOW_REGISTRATION=false, nombre sujeto a verificación) después de crear la cuenta administradora.
4. Coloque la clave del proveedor de modelos en el .env y proteja el archivo (permisos 600; fuera del control de versiones).
5. Levante el sistema:

```bash
docker compose up -d
docker compose ps
```

Criterio de salida: la interfaz carga en la red interna, el administrador inicia sesión y obtiene respuesta de un modelo con una pregunta de prueba sin datos reales.

### Fase 2. Endurecimiento de seguridad (3 horas)

1. Ponga un proxy inverso con TLS delante de LibreChat. Sin TLS no se autentica a nadie.
2. Restrinja el acceso por VPN o por lista de IP.
3. Active copias de seguridad de los volúmenes de MongoDB y de archivos, con restauración probada una vez.
4. Configure la retención de conversaciones según la política del despacho (a definir en la Fase 5).
5. Revise el registro de contenedores y confirme que no se escriben claves en los logs.
6. Documente el procedimiento de actualización: leer las notas de versión, respaldar, actualizar etiqueta, probar.

Criterio de salida: acceso solo por TLS y red autorizada; restauración de respaldo comprobada.

### Fase 3. Servidor MCP jac-mcp (2 a 4 días de desarrollo)

Esta fase requiere una especificación previa. El repositorio ya usa Spec Kit; el flujo recomendado es /speckit-specify, /speckit-plan, /speckit-tasks y /speckit-implement, en cumplimiento de los principios de la constitución del proyecto.

Herramientas MCP propuestas, todas de solo lectura:

1. jac_verificar_sentencia: envuelve `jac sentencia <cita> --json`.
2. jac_verificar_norma: envuelve `jac norma <cita>`; devuelve existencia y fecha, nunca vigencia.
3. jac_consulta: envuelve `jac consulta <entrada> --json`.
4. jac_fuentes: envuelve `jac fuentes`, para informar qué fuentes respondieron.

Reglas de diseño obligatorias:

1. Cada respuesta debe reproducir los estados de la CLI sin mejorarlos: verificado, pendiente de verificación, fuente caída.
2. Una fuente caída produce estado pendiente, nunca "no existe".
3. Ninguna herramienta debe afirmar vigencia.
4. No se exponen las herramientas validar e inventario en la primera versión, porque leen archivos del servidor y ampliarían la superficie de ataque.
5. Validación estricta de entradas (longitud máxima, sin construcción de comandos por concatenación de texto; se pasan argumentos como lista).
6. Tiempo máximo por llamada y registro de cada invocación, sin guardar el texto de consultas confidenciales.

Pruebas de aceptación mínimas:

1. Una sentencia real de la Corte Constitucional devuelve verificada con fecha.
2. Una cita inexistente devuelve no confirmada, sin inventar contenido.
3. Con la red cortada, devuelve pendiente y lo informa.
4. Una norma fuera del catálogo devuelve pendiente, no inexistente.

Criterio de salida: las cuatro pruebas pasan y se ejecuta `bin/jac prueba` sin fallos.

### Fase 4. Conexión de LibreChat con jac-mcp (2 horas)

1. Monte un archivo librechat.yaml con la sección mcpServers que apunte a jac-mcp. La sintaxis exacta (tipo de transporte, campos url o command) debe confirmarse en librechat.example.yaml de la versión instalada.
2. Mapee el archivo al contenedor de la API mediante docker-compose.override.yml, siguiendo la documentación oficial.
3. Cree un agente en LibreChat con instrucciones de sistema que repliquen las reglas del despacho: responder en español formal, no citar sin verificar, declarar pendiente lo no verificado.
4. Reinicie y confirme que las herramientas aparecen en el agente.

Criterio de salida: una pregunta como "verifica la sentencia T-008 de 2020" invoca la herramienta y devuelve el estado de verificación de la CLI.

### Fase 5. Piloto controlado (1 semana)

1. Usuarios: máximo 2 o 3 abogados.
2. Datos: únicamente información pública o casos ficticios.
3. Registre diariamente: tiempo ahorrado, errores detectados, citas que el agente presentó sin verificar.
4. Comparación: ejecute las mismas 20 consultas en LibreChat y en las suscripciones actuales y compare calidad y costo.

Criterio de decisión al cierre: continuar, ajustar o descartar, con base en los registros y no en impresiones.

### Fase 6. Decisión sobre datos de clientes (solo si el piloto es favorable)

Antes de introducir cualquier dato de cliente, el despacho debe:

1. Revisar los términos de tratamiento de datos del proveedor de modelos elegido.
2. Verificar en fuente oficial la normativa colombiana vigente de protección de datos personales (régimen general de la Ley 1581 de 2012 y sus decretos reglamentarios) y las reglas de la Superintendencia de Industria y Comercio sobre transferencia y transmisión internacional. No he verificado su vigencia ni su texto actual en esta sesión.
3. Revisar el deber de reserva profesional aplicable a abogados y su relación con herramientas de terceros.
4. Definir política interna escrita, autorizaciones de clientes y registro de tratamiento.

Esta fase no debe iniciarse sin concepto del responsable de cumplimiento del despacho.

## 4. Riesgos

1. Mayor: fuga de información de clientes por mala configuración o por el proveedor del modelo. Mitigación: Fases 2 y 6; datos ficticios en el piloto.
2. Alto: el agente presenta citas no verificadas como ciertas. Mitigación: la herramienta jac-mcp reproduce los estados de la CLI; el abogado responsable sigue siendo el último filtro.
3. Medio: costos de API sin control. Mitigación: tope de gasto en el proveedor.
4. Medio: LibreChat tiene actualizaciones frecuentes; versiones sin mantenimiento acumulan vulnerabilidades. Mitigación: procedimiento de actualización de la Fase 2.
5. Medio: dependencia de una sola persona para administrar. Mitigación: documentar el procedimiento y designar un suplente.

## 5. Costo y esfuerzo estimado

1. Infraestructura: servidor pequeño o equipo existente; costo mensual a definir según proveedor, no cotizado.
2. API de modelos: variable según uso; se controla con el tope.
3. Desarrollo de jac-mcp: de 2 a 4 días de trabajo técnico (estimación sin validar).
4. Mantenimiento: de 2 a 4 horas al mes (estimación sin validar).

## 6. Orden de ejecución recomendado

1. Esta semana: Fases 0, 1 y 2 con datos ficticios.
2. Siguiente semana: Fase 3 y 4 mediante Spec Kit.
3. Tercera semana: Fase 5.
4. Después del piloto: decisión sobre la Fase 6.

## 7. Documentos y datos que debe conseguir

1. Archivos LICENSE, .env.example y librechat.example.yaml de la versión elegida de LibreChat.
2. Términos de tratamiento de datos del proveedor de modelos.
3. Política interna de confidencialidad del despacho.
4. Registro de la versión desplegada y de cada actualización.
