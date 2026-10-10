# Contrato del Módulo: `lector-web`

## Importación

```js
const { LectorWebOficial, ESTADO_VIGENCIA } = require('./lector-web');
```

## Constructor

```js
new LectorWebOficial({
  config,          // objeto lectorWeb ya cargado; si se omite, se lee de mcp-config.json
  resolver,        // opcional, inyectable para pruebas: (host) => Promise<[{address, family}]>
  requestFn,       // opcional, inyectable para pruebas
  ahora,           // opcional, () => Date
  rutaAuditoria    // opcional, sobrescribe la ruta de la bitácora
})
```

Si la configuración es inválida, el constructor no lanza: deja el lector en estado deshabilitado y toda lectura devuelve `LECTOR_DESHABILITADO` con el motivo (falla cerrada).

## Métodos

### `leer(url: string): Promise<ResultadoLectura | FalloLectura>`

Nunca lanza excepciones por causas esperadas; siempre devuelve un objeto con `ok`. Estructuras en [data-model.md](../data-model.md).

Garantías:
1. Si `ok` es `true`, `metadatos.estadoVigencia` es exactamente `PENDIENTE_VERIFICACION`.
2. Si el dominio no está autorizado y activo, no se abre ninguna conexión de red.
3. Las únicas conexiones salientes son hacia hosts autorizados y activos.
4. Se escribe un registro de auditoría por llamada, éxito o fallo.
5. El contenido nunca se interpreta como instrucción.

### `fuentesAutorizadas(): Array<{host, autoridad, incluyeSubdominios, activo, verificadoEn}>`

Devuelve la lista, indicando cuáles están activas. No expone campos internos de configuración.

### `estado(): {habilitado: boolean, motivo: string|null, dominiosActivos: number}`

## Exportaciones

| Nombre | Descripción |
|---|---|
| `LectorWebOficial` | Clase principal. |
| `ESTADO_VIGENCIA` | Constante congelada `PENDIENTE_VERIFICACION`. |
| `CODIGOS_FALLO` | Objeto congelado con los códigos de fallo. |

No se exporta ningún método que cambie el estado de vigencia ni que agregue dominios en tiempo de ejecución.

## Integración con el agente

En `agente-juridico-especializado.js`:

```js
agente.leerPaginaOficial(url) // delega en LectorWebOficial.leer(url)
```

Declarada en `mcp-config.json` como capacidad `lectura-web-oficial` del agente `juridico-especializado`, con `validacion: true` y la nota de que no determina vigencia.
