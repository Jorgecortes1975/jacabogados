# JAC - Abogados Asociados | Configuración MCP

## Sistema de Transportes MCP

Este proyecto utiliza transportes MCP (Model Context Protocol) para conectar herramientas legales y servidores especializados.

### Configuración de Transportes

Los transportes se almacenan en `mcp-config.json` y se gestionan mediante el CLI `claude-mcp-transport.js`.

### Uso del Comando CLI

```bash
# Agregar un nuevo transporte
node claude-mcp-transport.js add --transport stdio --name "legal-search" --command "node server.js"

# Listar transportes activos
node claude-mcp-transport.js list

# Activar un transporte
node claude-mcp-transport.js activate legal-search

# Eliminar un transporte
node claude-mcp-transport.js remove legal-search
```

### Tipos de Transporte Soportados

#### 1. **stdio** (Entrada/Salida Estándar)
Comunicación directa con procesos locales.

```bash
node claude-mcp-transport.js add --transport stdio \
  --name "colombian-courts" \
  --command "node services/courts-service.js"
```

#### 2. **sse** (Server-Sent Events)
Conexiones persistentes bidireccionales para servidores remotos.

```bash
node claude-mcp-transport.js add --transport sse \
  --name "judicial-api" \
  --url "http://localhost:3000"
```

#### 3. **http** (HTTP/HTTPS)
Transporte REST para APIs legales.

```bash
node claude-mcp-transport.js add --transport http \
  --name "legal-database" \
  --url "https://api.legal-db.com"
```

### Estructura de Configuración

```json
{
  "version": "1.0",
  "transports": {
    "legal-search": {
      "type": "stdio",
      "command": "node server.js",
      "enabled": true,
      "createdAt": "2026-08-02T15:30:00Z",
      "lastActivated": "2026-08-02T15:32:00Z"
    },
    "judicial-api": {
      "type": "sse",
      "url": "http://localhost:3000",
      "enabled": true,
      "createdAt": "2026-08-02T15:35:00Z"
    }
  },
  "servers": {}
}
```

### Validación de Transportes

El sistema valida:
- ✓ Tipo de transporte válido (stdio, sse, http)
- ✓ Parámetros requeridos (command para stdio, url para sse/http)
- ✓ URLs bien formadas
- ✓ Disponibilidad del servidor

### Activación Automática

Al agregar un transporte, se activa automáticamente. Para desactivar:

```bash
# Editar mcp-config.json y cambiar "enabled": false
```

### Ejemplo: Agregar Servidor de Jurisprudencia Colombiana

```bash
node claude-mcp-transport.js add \
  --transport http \
  --name "corte-constitucional" \
  --url "https://api.corteconstitucional.gov.co/v1"
```

### Troubleshooting

**Error: "Transporte no encontrado"**
- Verifica el nombre exacto con `node claude-mcp-transport.js list`

**Error: "URL inválida"**
- Asegúrate que la URL sea completa (incluye http:// o https://)

**Error: "Comando no existe"**
- Para stdio, verifica que el comando sea ejecutable: `which node`

---

**Rama:** `claude/colombia-legal-prospects-gask4u`  
**Última actualización:** 2026-08-02
