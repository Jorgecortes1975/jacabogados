# JAC - Abogados Asociados | Sistema MCP Jurídico Constitution

## Core Principles

### I. Sin Alucinaciones (NON-NEGOTIABLE)
Ninguna funcionalidad puede presentar como cierta una norma, sentencia, cifra o dato jurídico que
no provenga de una fuente oficial verificable. Toda respuesta jurídica generada por el sistema debe
poder rastrearse hasta al menos una de las 9 fuentes oficiales integradas (Corte Constitucional,
Consejo de Estado, Corte Suprema, Legal Data Hunter, Diario Oficial, SUIN, Congreso, Superintendencia
de Sociedades, DIAN). Si una fuente no está disponible o el dato no puede verificarse, el sistema
debe decirlo explícitamente en vez de completar con una suposición.

### II. Verificación Cruzada Multi-Fuente
Los datos jurídicos sensibles (vigencia de normas, cuantías, plazos, existencia de sentencias) deben
confirmarse contra más de una fuente oficial cuando exista más de una fuente aplicable. La
configuración `verificacionDatos.requiereMultiplesFuentes` en `mcp-config.json` es el contrato técnico
de este principio y no se desactiva sin justificación documentada en el PR correspondiente.

### III. Español Jurídico Colombiano por Defecto
Todo artefacto orientado al usuario final (specs, reportes, mensajes del agente, documentos
generados) se redacta en español, con terminología jurídica colombiana precisa (CGP, CST, Ley 906,
Habeas Data, etc.). El código, nombres de variables y comentarios técnicos pueden mantenerse en
inglés cuando sea el estándar del ecosistema (Node.js, MCP), pero nunca la salida dirigida al abogado
o al cliente.

### IV. Trazabilidad y Citabilidad
Cada afirmación jurídica relevante debe incluir su fuente citable (institución, número de sentencia
o norma, fecha, enlace oficial cuando exista). Un reporte o análisis sin citas verificables se
considera incompleto, no una versión preliminar aceptable.

### V. Simplicidad sobre Extensión del Ecosistema
Antes de crear un nuevo agente, transporte MCP o skill, se debe verificar que la capacidad no exista
ya en `lexa-ecosystem.json`, `mcp-config.json` o en las skills activas del despacho. Se prefiere
extender lo existente sobre duplicar orquestadores o agentes con funciones solapadas.

## Restricciones Técnicas del Ecosistema

- Los transportes MCP se gestionan exclusivamente vía `claude-mcp-transport.js` y se documentan en
  `mcp-config.json`; no se agregan fuentes fuera de ese archivo de configuración.
- Las credenciales y secretos viven en variables de entorno (`.env`, ver `.env.example`) y nunca se
  commitean en texto plano.
- Cambios que afecten la lista de fuentes oficiales (activar/desactivar una fuente) requieren
  actualizar tanto `mcp-config.json` como la tabla de fuentes en `CLAUDE.md`.

## Flujo de Trabajo Spec-Driven

- Toda funcionalidad nueva de tamaño mediano o mayor (nuevo tipo de consulta, nueva fuente, nuevo
  agente, cambio de flujo del router) pasa por `/speckit-specify` → `/speckit-plan` → `/speckit-tasks`
  → `/speckit-implement` antes de escribir código de producción.
- Los documentos de spec y plan generados en `specs/` se redactan también en español, salvo
  identificadores técnicos.
- `/speckit-analyze` se ejecuta antes de `/speckit-implement` en features que toquen verificación de
  datos o fuentes oficiales, dado el principio "Sin Alucinaciones".

## Governance

Esta constitución prevalece sobre convenciones informales del repositorio. Cualquier excepción a los
principios I o II (alucinaciones, verificación multi-fuente) debe quedar documentada explícitamente
en la spec o el PR que la introduce, con la razón y el riesgo aceptado. Modificar esta constitución
requiere actualizar el número de versión y la fecha de última modificación abajo.

**Version**: 1.0.0 | **Ratified**: 2026-08-20 | **Last Amended**: 2026-08-20
