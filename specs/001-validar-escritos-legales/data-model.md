# Data Model: Validación de Escritos Legales Completos

**Feature**: `001-validar-escritos-legales`

Entidades extraídas de `spec.md` § Key Entities. No hay base de datos: estas estructuras viven en
memoria durante una ejecución de la CLI y, en modo `--json`, se serializan tal cual como salida.

## EscritoAValidar

El documento legal completo entregado por el abogado.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `tipo` | `"demanda" \| "tutela" \| "concepto" \| "recurso"` | Tipo de escrito, informado por el abogado o inferido del texto. |
| `texto` | `string` | Contenido completo del escrito, ya en texto plano (spec: Assumptions — conversión de formato no es parte de esta feature). |
| `fechaValidacion` | `string` (ISO 8601) | Momento en que se ejecutó la validación. |

## CitaDetectada

Una referencia normativa o jurisprudencial individual extraída del escrito.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `textoOriginal` | `string` | La cita tal como aparece escrita en el escrito. |
| `familia` | `"norma" \| "jurisprudencia"` | Clasificación según el patrón que la detectó (research.md §3). |
| `ubicacion` | `{ inicio: number, fin: number, fragmento: string }` | Posición en el texto (offsets de caracteres) y un fragmento de contexto legible para que el abogado la ubique (FR-006). |
| `estado` | `"verificada" \| "no_encontrada" \| "datos_discrepantes" \| "verificacion_pendiente"` | Resultado de la verificación (FR-004, FR-007). |
| `fuenteConfirmante` | `string \| null` | Nombre de la fuente oficial (de `mcp-config.json`) que confirmó o refutó la cita; `null` si `estado` es `no_encontrada` o `verificacion_pendiente`. |
| `datoOficial` | `{ campo: string, valorCitado: string, valorOficial: string } \| null` | Solo presente cuando `estado === "datos_discrepantes"` (FR-005): qué campo difiere (fecha, número de providencia, etc.), el valor citado y el valor real encontrado. |

**Reglas de validación**:
- `estado` nunca es `"verificada"` sin `fuenteConfirmante` distinto de `null` (Regla I de la
  constitución — Sin Alucinaciones).
- `datoOficial` solo existe cuando `estado === "datos_discrepantes"`; en cualquier otro estado debe
  ser `null`.

## ReporteDeValidacion

El resultado entregado al abogado.

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `escrito` | `EscritoAValidar` | Referencia al escrito validado. |
| `resumen` | `{ total: number, verificadas: number, noEncontradas: number, discrepantes: number, pendientes: number }` | Conteo por estado, mostrado antes del detalle (FR-008). |
| `citas` | `CitaDetectada[]` | Detalle completo, en el orden en que aparecen en el texto. |
| `sinCitasDetectadas` | `boolean` | `true` cuando `citas.length === 0`, para disparar el mensaje explícito del edge case correspondiente (FR-009) en vez de un reporte vacío silencioso. |

**Invariante**: `resumen.total === citas.length`, y
`resumen.verificadas + resumen.noEncontradas + resumen.discrepantes + resumen.pendientes === resumen.total`.
