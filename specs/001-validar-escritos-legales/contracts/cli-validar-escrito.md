# Contrato CLI: `consulta validar-escrito`

**Feature**: `001-validar-escritos-legales`

Este es el único punto de entrada externo de la feature (no expone API HTTP ni librería pública):
un comando de `agente-juridico-especializado.js`.

## Invocación

```bash
node agente-juridico-especializado.js consulta validar-escrito "<texto del escrito o ruta a un archivo .txt>" [--tipo demanda|tutela|concepto|recurso] [--json]
```

- El primer argumento posicional (`arg2` en el parser existente) es el texto del escrito o la ruta
  a un archivo de texto plano que lo contiene. Si el valor es una ruta existente en disco, se lee
  el archivo; en caso contrario se trata como el texto directamente.
- `--tipo` es opcional; si se omite, el reporte no distingue tipo de escrito pero igual valida
  todas las citas encontradas.
- `--json` cambia el formato de salida de texto legible a JSON estructurado (ver más abajo).

## Salida — modo texto (por defecto)

```text
📋 VALIDACIÓN DE ESCRITO — <tipo o "no especificado">
════════════════════════════════════════════════════════════════
Resumen: 10 citas · 7 verificadas · 2 no encontradas · 1 discrepante

✓ [verificada] "Sentencia C-590 de 2005" — confirmada por Corte Constitucional
✗ [no encontrada] "Sentencia T-999 de 2019" — ninguna fuente oficial la reconoce
⚠ [datos discrepantes] "Ley 100 de 1994, art. 13" — la fuente oficial registra el artículo 13
  con otro texto vigente; verificar modificaciones posteriores
  ...
════════════════════════════════════════════════════════════════
```

Si `sinCitasDetectadas` es `true`, el modo texto imprime únicamente:

```text
📋 VALIDACIÓN DE ESCRITO — <tipo>
No se detectaron citas normativas ni jurisprudenciales para validar en este escrito.
```

## Salida — modo `--json`

Serializa directamente `ReporteDeValidacion` (ver `data-model.md`):

```json
{
  "escrito": { "tipo": "demanda", "fechaValidacion": "2026-08-20T10:00:00.000Z" },
  "resumen": { "total": 10, "verificadas": 7, "noEncontradas": 2, "discrepantes": 1, "pendientes": 0 },
  "sinCitasDetectadas": false,
  "citas": [
    {
      "textoOriginal": "Sentencia C-590 de 2005",
      "familia": "jurisprudencia",
      "ubicacion": { "inicio": 512, "fin": 535, "fragmento": "...conforme a la Sentencia C-590 de 2005, la acción..." },
      "estado": "verificada",
      "fuenteConfirmante": "corte-constitucional",
      "datoOficial": null
    }
  ]
}
```

## Códigos de salida

| Código | Condición |
|--------|-----------|
| `0` | El comando corrió correctamente, sin importar si hay citas no encontradas o discrepantes — esos son resultados válidos del reporte, no errores del programa. |
| `1` | Error real: no se pudo leer el archivo indicado, o el escrito está vacío. |

## Consistencia con comandos existentes

Sigue el mismo patrón de `parseArgs()` ya usado por `consulta jurisprudencia`, `consulta norma`,
etc. (`args.arg1` = tipo de consulta = `"validar-escrito"`, `args.arg2` = argumento principal); no
introduce un esquema de argumentos distinto al resto de la CLI.
