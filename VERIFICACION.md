# Verificación del sistema JAC

Este documento explica cómo comprobar que el sistema de agentes, la puerta de verificación y los controles funcionan, y qué no puede comprobar un script.

## 1. Comando único

Desde la raíz del repositorio:

```
sh scripts/verificar-todo.sh
```

Debe terminar con "RESULTADO: todas las comprobaciones automáticas pasaron" y código 0. Si alguna comprobación falla, el script indica cuál y muestra las últimas líneas de la salida.

Requisitos: Python 3 con pytest (`pip install -r requirements-dev.txt`), Node.js y la CLI `claude`.

## 2. Qué comprueba el comando

1. Suite `tests_jac`: pruebas de citas, normas, prueba de aceptación y regresión del agente de Node.
2. `bin/jac prueba`: prueba de aceptación con escrito sintético y fuentes simuladas.
3. Puerta de verificación: ejecuta el mismo script que el hook Stop de Claude Code.
4. Copias del revisor: `agents/jac-revisor.md` y `.claude/agents/jac-revisor.md` deben ser idénticas.
5. Sintaxis de JSON, shell y Node.
6. `claude plugin validate` sobre las carpetas de agentes.

El comando no modifica archivos versionados.

## 3. Qué NO comprueba (pendiente, debe hacerlo una persona)

1. Carga de hooks y subagentes en una sesión interactiva. En la sesión interactiva, abra Claude Code en la carpeta del repositorio, acepte el diálogo de confianza, ejecute `/hooks` (debe aparecer el hook Stop) y pida "lista los subagentes disponibles" (debe aparecer `jac-revisor`).
2. Habilidad `/retomar-asunto`. En la sesión interactiva, ejecute `/retomar-asunto ASUNTO-FICTICIO-001`. Debe detenerse en Matter Lock, porque no existe el progreso del asunto.
3. Verificación real de sentencias. Desde la red del despacho, ejecute `bin/jac sentencia "T-008/20"`. Debe confirmar la cita contra la relatoría. Si las fuentes no responden, el resultado debe ser PENDIENTE, nunca inexistente.

## 4. Cómo interpretar los resultados de la verificación

1. Una norma aparece como "verificada" cuando existe en el catálogo local. Eso no prueba su vigencia: la vigencia la confirma el abogado en la fuente oficial.
2. Una cita marcada como PENDIENTE significa que la fuente no respondió o no se consultó. Nunca significa que la cita no existe.
3. PASS_AUTOMATICO de los controles no equivale a revisión final. El abogado responsable sigue siendo el último filtro.
4. Ninguna comprobación de este repositorio evalúa la calidad jurídica de un análisis.

## 5. Antes de usar con expedientes reales

1. Confirme la decisión sobre el archivo `crm_jaabogados.csv`, que contiene datos personales y está versionado.
2. Cree las carpetas de expedientes con los nombres que usen y revise que las reglas de denegación de `.claude/settings.json` las cubran.
3. Active el sandbox (`/sandbox`) si va a trabajar con documentos de clientes.
4. Ejecute el comando de la sección 1 y confirme que todo pasa.
