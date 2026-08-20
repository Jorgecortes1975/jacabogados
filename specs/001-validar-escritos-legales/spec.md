# Feature Specification: Validación de Escritos Legales Completos

**Feature Branch**: `001-validar-escritos-legales`

**Created**: 2026-08-20

**Status**: Draft

**Input**: User description: "Agregar un nuevo tipo de consulta 'validar-escrito' al agente jurídico especializado que reciba un escrito legal completo (demanda, tutela, concepto, recurso) ya redactado, extraiga cada cita normativa y jurisprudencial que contenga, verifique cada una contra las fuentes oficiales ya integradas (igual que el tipo de consulta 'verificar' pero aplicado a todo el documento en vez de una sola afirmación), y entregue al abogado un reporte que marque cada cita como verificada, no encontrada, o con datos discrepantes, para reducir el riesgo de alucinaciones antes de radicar el escrito."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Validar todas las citas de un escrito antes de radicarlo (Priority: P1)

Un abogado del despacho tiene un escrito ya redactado (demanda, tutela, concepto o recurso) y,
antes de radicarlo, se lo pasa al agente jurídico para que revise automáticamente cada norma y
cada sentencia citada, en vez de verificarlas una por una a mano.

**Why this priority**: Es el propósito central de la funcionalidad. Sin esto no hay producto: el
resto de historias son variaciones sobre este flujo base.

**Independent Test**: Se puede probar de forma aislada ejecutando
`node agente-juridico-especializado.js consulta validar-escrito "<ruta o texto del escrito>"`
sobre un documento con al menos una cita normativa y una jurisprudencial, y verificando que el
reporte cubra el 100% de las citas detectadas en el texto.

**Acceptance Scenarios**:

1. **Given** un escrito con 5 citas (normas y sentencias) todas correctas y vigentes,
   **When** el abogado ejecuta la validación, **Then** el reporte marca las 5 como "verificada" y
   cada una indica la fuente oficial que la confirmó.
2. **Given** un escrito con una cita a una norma derogada o una sentencia inexistente,
   **When** el abogado ejecuta la validación, **Then** esa cita específica aparece marcada como
   "no encontrada" o "discrepante", señalada de forma que no pueda confundirse con las citas
   verificadas, y el resto del escrito no se ve afectado por ese hallazgo.

---

### User Story 2 - Distinguir "no encontrada" de "datos discrepantes" (Priority: P1)

El abogado necesita saber no solo si una cita falló, sino por qué: si la fuente oficial nunca
encontró esa norma o sentencia, o si la encontró pero con datos distintos a los citados en el
escrito (fecha, número, texto).

**Why this priority**: Sin esta distinción el reporte no es accionable — un abogado no puede
corregir un error de transcripción de la misma forma que reemplaza una cita inexistente. Es tan
crítico como la Historia 1 para que el reporte cumpla su función.

**Independent Test**: Probar con dos citas fabricadas deliberadamente: una que no exista en
ninguna fuente oficial y otra que exista pero con una fecha alterada, y confirmar que el reporte
las distingue con etiquetas distintas y explica la discrepancia encontrada en el segundo caso.

**Acceptance Scenarios**:

1. **Given** una cita a una sentencia que ninguna fuente oficial reconoce, **When** se valida el
   escrito, **Then** el reporte la marca "no encontrada".
2. **Given** una cita a una sentencia real pero con la fecha o el número de providencia alterado
   respecto al dato oficial, **When** se valida el escrito, **Then** el reporte la marca "datos
   discrepantes" e indica el dato correcto encontrado en la fuente oficial, sin corregir el
   escrito por su cuenta.

---

### User Story 3 - Ver un resumen ejecutivo antes de radicar (Priority: P2)

Antes de radicar, el abogado (o el socio que revisa) quiere ver de un vistazo cuántas citas del
escrito están verificadas, cuántas fallaron y de qué tipo, sin tener que leer el detalle completo
si no lo necesita.

**Why this priority**: Mejora la usabilidad del reporte para revisión rápida, pero el valor
central de la funcionalidad (Historias 1 y 2) ya existe sin esto — es una mejora de presentación,
no un requisito para que el flujo funcione.

**Independent Test**: Ejecutar la validación sobre un escrito con una mezcla de citas correctas e
incorrectas y confirmar que el reporte abre con un resumen numérico (total de citas, verificadas,
no encontradas, discrepantes) antes del detalle cita por cita.

**Acceptance Scenarios**:

1. **Given** un escrito con 10 citas (7 verificadas, 2 no encontradas, 1 discrepante),
   **When** se genera el reporte, **Then** el resumen inicial muestra esos cuatro números sin que
   el abogado tenga que contarlos manualmente en el detalle.

---

### Edge Cases

- ¿Qué pasa si el escrito no contiene ninguna cita normativa ni jurisprudencial? El sistema debe
  informarlo explícitamente ("no se detectaron citas para validar") en vez de devolver un reporte
  vacío sin explicación.
- ¿Qué pasa si una fuente oficial necesaria para verificar una cita está temporalmente
  inaccesible? Esa cita puntual se marca como "verificación pendiente" (no como "no encontrada",
  que implicaría que la fuente sí respondió y no la halló), y el resto del escrito se valida con
  normalidad.
- ¿Qué pasa si el escrito cita la misma norma o sentencia varias veces? Cada aparición se reporta
  por separado, con su propia ubicación en el texto, para que el abogado corrija todas las
  ocurrencias y no solo la primera.
- ¿Qué pasa si el escrito es muy extenso (por ejemplo, un concepto de 40 páginas)? El sistema
  debe procesar el documento completo igual; si el volumen de citas hace que la validación tome
  más tiempo, el abogado debe recibir una indicación de que el proceso sigue en curso en vez de
  parecer congelado.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema MUST aceptar un escrito legal completo como entrada del nuevo tipo de
  consulta `validar-escrito` (demanda, tutela, concepto o recurso), igual que los tipos de
  consulta existentes (`jurisprudencia`, `norma`, `analisis`, `verificar`, `reporte`).
- **FR-002**: El sistema MUST extraer del texto del escrito cada cita normativa (leyes, decretos,
  resoluciones) y cada cita jurisprudencial (sentencias, providencias) que contenga.
- **FR-003**: El sistema MUST verificar cada cita extraída contra las fuentes oficiales ya
  integradas, siguiendo el mismo principio de verificación cruzada multi-fuente que ya aplica al
  tipo de consulta `verificar` (Regla II de la constitución del proyecto).
- **FR-004**: El sistema MUST clasificar cada cita en uno de tres estados: "verificada", "no
  encontrada" o "datos discrepantes", y nunca presentar como verificada una cita que no haya sido
  confirmada por al menos una fuente oficial (Regla I — Sin Alucinaciones).
- **FR-005**: Para cada cita marcada "datos discrepantes", el sistema MUST mostrar tanto el dato
  citado en el escrito como el dato oficial encontrado, sin modificar el escrito original.
- **FR-006**: El sistema MUST indicar la ubicación de cada cita dentro del escrito (por ejemplo,
  párrafo o fragmento de texto), de forma que el abogado pueda localizarla para corregirla.
- **FR-007**: El sistema MUST informar explícitamente cuando una fuente oficial necesaria no esté
  disponible durante la validación, en vez de omitir la cita o darla por no encontrada.
- **FR-008**: El sistema MUST presentar un resumen numérico (total de citas, verificadas, no
  encontradas, discrepantes, pendientes) antes del detalle cita por cita.
- **FR-009**: El sistema MUST informar explícitamente cuando no se detecte ninguna cita en el
  escrito analizado, en vez de devolver un reporte vacío.

### Key Entities

- **Escrito a validar**: El documento legal completo entregado por el abogado (demanda, tutela,
  concepto o recurso), identificado por tipo y fecha de validación.
- **Cita detectada**: Una referencia normativa o jurisprudencial individual extraída del escrito,
  con su ubicación en el texto, el dato tal como aparece citado, y su estado de verificación
  (verificada / no encontrada / datos discrepantes / verificación pendiente).
- **Reporte de validación**: El resultado entregado al abogado, compuesto por el resumen numérico
  y el detalle de cada cita detectada con su estado y su fuente de verificación.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: El abogado obtiene el estado de verificación de todas las citas de un escrito en una
  sola ejecución, sin tener que verificar cada cita manualmente una por una.
- **SC-002**: El 100% de las citas marcadas como "verificada" en el reporte cuentan con
  confirmación de al menos una fuente oficial; ninguna aparece verificada sin esa confirmación.
- **SC-003**: Toda cita marcada "no encontrada" o "datos discrepantes" incluye información
  suficiente (ubicación en el texto y, cuando aplique, el dato oficial correcto) para que el
  abogado la corrija sin tener que releer todo el escrito para encontrarla.
- **SC-004**: Un escrito sin ninguna cita irregular puede confirmarse como "listo para radicar" en
  el tiempo que toma leer el resumen numérico del reporte, no el detalle completo.

## Assumptions

- El abogado entrega el escrito como texto (pegado o desde un archivo ya convertido a texto); la
  conversión de formatos de documento (Word, PDF) a texto no es parte de esta funcionalidad y se
  asume resuelta por el flujo de entrada existente del despacho.
- Las citas normativas y jurisprudenciales del escrito siguen convenciones de redacción jurídica
  colombiana reconocibles (por ejemplo, "Sentencia C-XXX de AAAA", "Ley XXX de AAAA", "artículo N
  del Código..."), consistentes con el estilo que ya usan los abogados del despacho.
- La validación cubre las mismas 9 fuentes oficiales ya integradas al agente jurídico; no se
  requiere ninguna fuente nueva para que esta funcionalidad opere.
- Un escrito puede validarse más de una vez a medida que el abogado lo corrige (por ejemplo, tras
  reemplazar una cita marcada como "no encontrada"), sin que eso requiera ningún paso adicional de
  configuración.
