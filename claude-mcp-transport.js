#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const CONFIG_FILE = path.join(process.cwd(), 'mcp-config.json');

class MCPTransportManager {
  constructor() {
    this.config = this.loadConfig();
  }

  loadConfig() {
    if (fs.existsSync(CONFIG_FILE)) {
      return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    }
    return { version: '1.0', transports: {}, servers: {} };
  }

  saveConfig() {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(this.config, null, 2));
  }

  addTransport(options) {
    const { name, type, command, url, args } = options;

    if (!name || !type) {
      throw new Error('Se requieren --name y --transport');
    }

    if (!['stdio', 'sse', 'http'].includes(type)) {
      throw new Error(`Tipo de transporte no válido: ${type}. Use: stdio, sse, http`);
    }

    const transport = {
      type,
      ...(type === 'stdio' && { command, args: args || [] }),
      ...(type === 'sse' && { url }),
      ...(type === 'http' && { url }),
      enabled: true,
      createdAt: new Date().toISOString(),
    };

    this.config.transports[name] = transport;
    this.saveConfig();

    console.log(`✓ Transporte '${name}' (${type}) agregado exitosamente`);
    return transport;
  }

  activateTransport(name) {
    const transport = this.config.transports[name];

    if (!transport) {
      throw new Error(`Transporte '${name}' no encontrado`);
    }

    try {
      this.validateTransport(transport);
      transport.enabled = true;
      transport.lastActivated = new Date().toISOString();
      this.saveConfig();
      console.log(`✓ Transporte '${name}' activado`);
    } catch (error) {
      throw new Error(`Error activando transporte: ${error.message}`);
    }
  }

  validateTransport(transport) {
    if (transport.type === 'stdio') {
      if (!transport.command) {
        throw new Error('Transporte stdio requiere --command');
      }
    }

    if (['sse', 'http'].includes(transport.type)) {
      if (!transport.url) {
        throw new Error(`Transporte ${transport.type} requiere --url`);
      }
      // Validar URL
      try {
        new URL(transport.url);
      } catch {
        throw new Error(`URL inválida: ${transport.url}`);
      }
    }
  }

  listTransports() {
    const transports = Object.entries(this.config.transports);
    if (transports.length === 0) {
      console.log('No hay transportes configurados');
      return;
    }

    console.log('\n📡 Transportes MCP configurados:');
    console.log('─'.repeat(60));

    transports.forEach(([name, config]) => {
      const status = config.enabled ? '✓' : '✗';
      console.log(`${status} ${name}`);
      console.log(`  Tipo: ${config.type}`);
      if (config.type === 'stdio') {
        console.log(`  Comando: ${config.command}`);
      } else {
        console.log(`  URL: ${config.url}`);
      }
      console.log(`  Creado: ${config.createdAt}`);
      if (config.lastActivated) {
        console.log(`  Último activado: ${config.lastActivated}`);
      }
      console.log();
    });
  }

  removeTransport(name) {
    if (!this.config.transports[name]) {
      throw new Error(`Transporte '${name}' no encontrado`);
    }
    delete this.config.transports[name];
    this.saveConfig();
    console.log(`✓ Transporte '${name}' eliminado`);
  }

  getTransport(name) {
    return this.config.transports[name];
  }
}

function parseArgs() {
  const args = process.argv.slice(2);
  const result = { command: args[0] };

  for (let i = 1; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].substring(2);
      const value = args[i + 1];
      if (value && !value.startsWith('--')) {
        result[key] = value;
        i++;
      } else {
        result[key] = true;
      }
    }
  }
  return result;
}

function printHelp() {
  console.log(`
Gestor de Transportes MCP para Claude

Uso:
  claude mcp add --transport <type> [opciones]
  claude mcp activate <nombre>
  claude mcp list
  claude mcp remove <nombre>

Tipos de transporte:
  stdio   - Comunicación por entrada/salida estándar
  sse     - Server-Sent Events para conexiones persistentes
  http    - Transporte HTTP/HTTPS

Opciones para 'add':
  --transport <type>  Tipo de transporte (required)
  --name <nombre>     Nombre del transporte (required)
  --command <cmd>     Comando a ejecutar (requerido para stdio)
  --url <url>         URL del servidor (requerido para sse/http)
  --args <args>       Argumentos adicionales (opcional)

Ejemplos:
  claude mcp add --transport stdio --name "legal-search" --command "node server.js"
  claude mcp add --transport sse --name "judicial-api" --url "http://localhost:3000"
  claude mcp list
  claude mcp activate legal-search
  claude mcp remove legal-search
`);
}

async function main() {
  try {
    const args = parseArgs();
    const manager = new MCPTransportManager();

    switch (args.command) {
      case 'add':
        if (!args.transport) {
          throw new Error('Se requiere --transport');
        }
        manager.addTransport({
          name: args.name || `transport-${Date.now()}`,
          type: args.transport,
          command: args.command,
          url: args.url,
          args: args.args,
        });
        // Automáticamente activar después de agregar
        manager.activateTransport(args.name || `transport-${Date.now()}`);
        break;

      case 'activate':
        if (!args._0) {
          throw new Error('Especifica el nombre del transporte');
        }
        manager.activateTransport(args._0);
        break;

      case 'list':
        manager.listTransports();
        break;

      case 'remove':
        if (!args._0) {
          throw new Error('Especifica el nombre del transporte');
        }
        manager.removeTransport(args._0);
        break;

      case 'help':
      case '--help':
      case '-h':
        printHelp();
        break;

      default:
        console.error('Comando desconocido:', args.command);
        printHelp();
        process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Exportar para uso como módulo
module.exports = { MCPTransportManager };

// Ejecutar si se invoca directamente
if (require.main === module) {
  main();
}
