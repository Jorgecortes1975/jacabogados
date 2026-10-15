# Quickstart: Validar `validar-escrito` de punta a punta

**Feature**: `001-validar-escritos-legales`

Guía de validación manual (el repo no tiene framework de pruebas automatizadas — ver
`research.md` §4). Sirve para confirmar, una vez implementada la feature, que cumple las
historias de usuario del spec.

## Prerrequisitos

- Node.js 18+ (entorno de desarrollo usa v22.22.2).
- `mcp-config.json` presente en la raíz del repo con al menos una fuente `enabled: true`.
- Los tres módulos de `lib/` (ver `plan.md` § Project Structure) implementados.

## Escenario 1 — Escrito con citas correctas (Historia 1, aceptación 1)

1. Crear `escrito-prueba-ok.txt` con un párrafo que cite una sentencia y una norma reales y
   vigentes (verificarlas primero a mano en la fuente oficial correspondiente).
2. Ejecutar:
   ```bash
   node agente-juridico-especializado.js consulta validar-escrito escrito-prueba-ok.txt
   ```
3. **Esperado**: el resumen muestra el mismo número de citas detectadas que las que se escribieron
   a mano en el archivo, todas en estado `verificada`, cada una con su fuente confirmante.

## Escenario 2 — Cita inexistente vs. cita con dato alterado (Historia 2)

1. Crear `escrito-prueba-mixto.txt` con:
   - Una cita a una sentencia que no existe (número inventado).
   - Una cita a una sentencia real pero con la fecha cambiada a propósito.
2. Ejecutar la misma consulta sobre ese archivo.
3. **Esperado**:
   - La primera aparece como `no_encontrada`.
   - La segunda aparece como `datos_discrepantes`, con `datoOficial` mostrando la fecha correcta
     encontrada en la fuente oficial — sin que el archivo original se modifique.

## Escenario 3 — Resumen ejecutivo (Historia 3)

1. Ejecutar la validación sobre `escrito-prueba-mixto.txt` (Escenario 2) más un par de citas
   correctas adicionales, para tener una mezcla de los cuatro estados posibles.
2. **Esperado**: el resumen numérico aparece antes del detalle cita por cita y sus cuatro números
   suman el total de citas detectadas (invariante de `data-model.md`).

## Escenario 4 — Escrito sin citas (Edge Case)

1. Ejecutar la validación sobre un archivo de texto sin ninguna cita normativa ni jurisprudencial.
2. **Esperado**: el sistema informa explícitamente "no se detectaron citas para validar" — nunca un
   reporte vacío sin explicación (FR-009).

## Escenario 5 — Fuente oficial no disponible (Edge Case)

1. Deshabilitar temporalmente (`enabled: false`) la fuente oficial necesaria para verificar una de
   las citas del Escenario 1 en `mcp-config.json`.
2. Repetir la validación.
3. **Esperado**: esa cita puntual pasa a `verificacion_pendiente` (no a `no_encontrada`); el resto
   de citas, que dependen de otras fuentes, se validan con normalidad. Restaurar `enabled: true` al
   terminar la prueba.

## Escenario 6 — Modo `--json`

1. Repetir el Escenario 3 agregando `--json`.
2. **Esperado**: la salida es JSON válido que cumple el contrato de
   `contracts/cli-validar-escrito.md` y puede parsearse con `JSON.parse` sin errores.
