# Feature Specification: Décima Fuente Oficial — Tribunal Superior de Bogotá

**Feature Branch**: `001-tribunal-superior-bogota`

**Created**: 2026-08-20

**Status**: Draft

**Input**: User description: "Agregar una nueva fuente oficial de jurisprudencia al agente juridico especializado: integrar el Tribunal Superior de Bogota como decima fuente verificada, con busqueda de sentencias por sala (civil, penal, laboral) y verificacion cruzada contra Legal Data Hunter antes de mostrar un resultado al abogado."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Buscar jurisprudencia del Tribunal Superior de Bogotá por sala (Priority: P1)

Un abogado del despacho consulta al agente jurídico por una sentencia o línea jurisprudencial del
Tribunal Superior de Bogotá, indicando (o dejando implícita) la sala relevante para su caso —
civil, penal o laboral — y recibe resultados provenientes exclusivamente de esa fuente oficial.

**Why this priority**: Es el valor central de la funcionalidad: sin esto no hay décima fuente. Sin
esta historia no hay MVP.

**Independent Test**: Se puede probar de forma aislada ejecutando
`node agente-juridico-especializado.js consulta jurisprudencia "<pregunta>" --fuente tribunal-superior-bogota`
y verificando que el resultado cite sentencias reales del Tribunal Superior de Bogotá con sala,
número de providencia y fecha.

**Acceptance Scenarios**:

1. **Given** el agente jurídico activado con la fuente Tribunal Superior de Bogotá habilitada,
   **When** el abogado consulta jurisprudencia sobre un tema de la sala civil,
   **Then** el sistema devuelve únicamente sentencias de la sala civil del Tribunal Superior de
   Bogotá, cada una con número de providencia, fecha y magistrado ponente.
2. **Given** una consulta sin sala especificada, **When** el abogado pregunta por un tema que
   podría corresponder a más de una sala, **Then** el sistema pregunta o indica explícitamente en
   qué sala(s) buscó, en vez de mezclar resultados de salas distintas sin aclararlo.

---

### User Story 2 - Verificación cruzada contra Legal Data Hunter antes de mostrar el resultado (Priority: P1)

Antes de presentarle al abogado una sentencia del Tribunal Superior de Bogotá, el sistema confirma
su existencia y vigencia contra Legal Data Hunter (fuente ya integrada), conforme al principio de
verificación multi-fuente de la constitución del proyecto.

**Why this priority**: Sin esta verificación, la nueva fuente viola directamente el principio "Sin
Alucinaciones" y "Verificación Cruzada Multi-Fuente" ya vigentes en el resto del ecosistema — no es
opcional, es un requisito de confianza igual de crítico que la búsqueda misma.

**Independent Test**: Se puede probar simulando una sentencia inexistente devuelta por el
transporte del Tribunal Superior de Bogotá y confirmando que el sistema la marca como "no
verificada" o la descarta, en vez de mostrarla como resultado confiable.

**Acceptance Scenarios**:

1. **Given** una sentencia encontrada en el Tribunal Superior de Bogotá, **When** Legal Data Hunter
   confirma su existencia con los mismos datos clave (número, fecha, sala), **Then** el sistema la
   presenta al abogado marcada como "verificada en 2 fuentes".
2. **Given** una sentencia encontrada en el Tribunal Superior de Bogotá, **When** Legal Data Hunter
   no la encuentra o reporta datos distintos, **Then** el sistema NO la presenta como verificada:
   la marca explícitamente como "verificación pendiente" e informa la discrepancia, sin ocultarla
   ni descartarla en silencio.

---

### User Story 3 - Ver la nueva fuente en el listado de fuentes del sistema (Priority: P3)

Un socio del despacho ejecuta `node agente-juridico-especializado.js fuentes` y ve al Tribunal
Superior de Bogotá listado junto con las 9 fuentes existentes, con su estado y contenido.

**Why this priority**: Es transparencia operativa, no bloquea el valor central de las historias 1 y
2, pero es necesaria para que el despacho confíe en que la fuente está realmente activa.

**Independent Test**: Ejecutar el comando de listado de fuentes y confirmar que aparecen 10 fuentes,
no 9, con el Tribunal Superior de Bogotá marcado como "✓ Activo".

**Acceptance Scenarios**:

1. **Given** la fuente instalada y habilitada, **When** se listan las fuentes del sistema,
   **Then** el Tribunal Superior de Bogotá aparece con su contenido (jurisprudencia por sala) y
   estado activo, igual que las demás 9 fuentes.

---

### Edge Cases

- ¿Qué pasa si el Tribunal Superior de Bogotá está temporalmente inaccesible? El sistema debe
  decirlo explícitamente ("fuente no disponible") en vez de omitir la fuente sin aviso o devolver
  resultados de otra fuente como si fueran de esta.
- ¿Qué pasa si una sentencia pertenece a más de una sala (p. ej. sala mixta o de decisión)? El
  sistema debe conservar la sala tal como la reporta la fuente oficial, sin forzarla a una sola
  categoría.
- ¿Qué pasa si Legal Data Hunter y el Tribunal Superior de Bogotá reportan la misma sentencia con
  fechas distintas? Se trata como discrepancia y sigue la regla de la Historia 2 (no verificada
  automáticamente).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema MUST registrar al Tribunal Superior de Bogotá como una décima fuente
  oficial en la configuración de fuentes (`mcp-config.json`), con el mismo formato que las 9
  fuentes existentes (tipo, URL, contenido, estado habilitado).
- **FR-002**: El sistema MUST permitir consultar jurisprudencia del Tribunal Superior de Bogotá
  filtrando por sala (civil, penal, laboral) cuando el abogado la especifique.
- **FR-003**: El sistema MUST indicar explícitamente la sala de origen de cada sentencia devuelta
  de esta fuente en el resultado presentado al abogado.
- **FR-004**: El sistema MUST verificar cada sentencia del Tribunal Superior de Bogotá contra Legal
  Data Hunter antes de presentarla como resultado confiable, conforme al principio de verificación
  multi-fuente de `.specify/memory/constitution.md`.
- **FR-005**: El sistema MUST marcar explícitamente como "verificación pendiente" cualquier
  sentencia de esta fuente que no pueda confirmarse contra Legal Data Hunter, en vez de
  presentarla como verificada u ocultarla.
- **FR-006**: El sistema MUST incluir al Tribunal Superior de Bogotá en el listado de fuentes
  (`node agente-juridico-especializado.js fuentes`) una vez habilitado.
- **FR-007**: El sistema MUST citar, para cada sentencia devuelta, al menos número de providencia,
  fecha y sala, de forma que la respuesta sea rastreable a la fuente oficial (principio de
  Trazabilidad y Citabilidad).

### Key Entities

- **Fuente Tribunal Superior de Bogotá**: Entrada de configuración en `mcp-config.json` con tipo de
  transporte, URL oficial, contenido soportado (jurisprudencia por sala) y estado habilitado/
  deshabilitado.
- **Sentencia del Tribunal Superior de Bogotá**: Resultado individual con sala de origen, número de
  providencia, fecha, magistrado ponente y estado de verificación (verificada / verificación
  pendiente).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El abogado obtiene resultados de jurisprudencia del Tribunal Superior de Bogotá
  filtrados por sala en una sola consulta, sin tener que revisar manualmente resultados de otras
  salas.
- **SC-002**: El 100% de las sentencias del Tribunal Superior de Bogotá mostradas como "verificadas"
  cuentan con confirmación cruzada en Legal Data Hunter; ninguna se presenta como verificada sin
  esa confirmación.
- **SC-003**: El listado de fuentes del sistema pasa de 9 a 10 fuentes activas sin que ninguna de
  las 9 fuentes existentes deje de aparecer o cambie de comportamiento.

## Assumptions

- El Tribunal Superior de Bogotá expone o permite construir un transporte (HTTP/scraping
  autorizado) equivalente en formato a las fuentes ya integradas (Corte Constitucional, Consejo de
  Estado, Corte Suprema), reutilizando el mismo patrón de `mcp-config.json`.
- Legal Data Hunter ya indexa o puede indexar jurisprudencia de tribunales superiores
  departamentales, no solo de las altas cortes; si no es así, la verificación cruzada de la
  Historia 2 queda limitada a los casos donde exista cobertura, y esa limitación debe reportarse
  al abogado en vez de ocultarse.
- Las tres salas mencionadas (civil, penal, laboral) son las de mayor volumen de consulta para el
  despacho; otras salas del Tribunal (familia, disciplinaria, etc.) quedan fuera del alcance de
  esta primera versión y pueden agregarse después sin rediseñar la fuente.
- No se requiere autenticación especial para consultar las fuentes públicas del Tribunal Superior
  de Bogotá, igual que las demás fuentes ya integradas.
