# Contrato del CLI

Subcomandos nuevos en `agente-juridico-especializado.js`. No modifican el comportamiento de `activar`, `fuentes`, `consulta` ni `help`.

## `leer <url>`

```bash
node agente-juridico-especializado.js leer "https://<dominio-autorizado>/<ruta>"
```

Salida en español:
1. Si hay éxito: encabezado con autoridad, dirección consultada y final, fecha y hora, huellas, y la línea "Vigencia: PENDIENTE DE VERIFICACION. Este texto no confirma que la norma o providencia esté vigente." Luego el texto y las advertencias.
2. Si hay fallo: código, mensaje explicativo y, cuando aplique, la recomendación de consultar la fuente manualmente.

Opción `--json`: imprime el objeto de resultado o de fallo tal como lo define el [contrato del módulo](./modulo-lector.md).

Código de salida: 0 en éxito, 1 en fallo de lectura, 2 en uso incorrecto (falta la URL).

## `fuentes-web`

```bash
node agente-juridico-especializado.js fuentes-web
```

Lista los dominios de la lista, su autoridad y si están activos o pendientes de verificación. Cambia el texto de ayuda para incluir ambos subcomandos.
