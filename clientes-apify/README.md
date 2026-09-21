# Clientes Apify - JAC Sistema Jurídico

> Gestión centralizada de clientes y extracción de datos jurídicos mediante Apify

## 📋 Descripción

Sistema de integración entre JAC (Abogados Asociados) y Apify para:

- Extracción automatizada de datos jurídicos
- Scraping de fuentes legales oficiales colombianas
- Gestión de múltiples clientes y sus configuraciones
- Automatización de reportes y análisis
- Documentación de actores (scrapers) personalizados

## 📁 Estructura

```
clientes-apify/
├── config/              # Configuraciones generales y globales
├── clients/             # Información y configuración de clientes
├── actors/              # Definiciones de actores de Apify
├── datasets/            # Datos extraídos por cliente/proyecto
├── logs/                # Registros de ejecuciones y errores
└── templates/           # Plantillas para nuevos clientes y actores
```

## 🚀 Inicio Rápido

### 1. Crear nuevo cliente

```bash
cp -r templates/cliente-template clients/nuevo-cliente
cd clients/nuevo-cliente
# Editar config.json con datos del cliente
```

### 2. Configurar actor

```bash
cp templates/actor-template.json actors/mi-actor.json
# Personalizar según necesidades de scraping
```

### 3. Ejecutar extracción

```bash
node scripts/run-actor.js --client <cliente> --actor <actor>
```

## 📊 Subdirectorios

### `/config`
- `apify-credentials.json` - Credenciales de Apify (gitignored)
- `global-settings.json` - Configuración global del sistema
- `actores-disponibles.json` - Registro de actores registrados

### `/clients`
- Directorio por cliente
- Estructura:
  ```
  clients/
  └── cliente-name/
      ├── config.json          # Configuración del cliente
      ├── proyectos.json       # Proyectos del cliente
      └── datos-extraidos/     # Datasets del cliente
  ```

### `/actors`
- Definiciones de actores de Apify
- Formatos: JSON con esquema de entrada/salida
- Incluir documentación de capabilidades

### `/datasets`
- Datos brutos extraídos
- Organización por cliente/fecha/proyecto
- Formatos: JSON, CSV, Parquet

### `/logs`
- Registros de ejecuciones
- Errores y excepciones
- Auditoría de cambios

### `/templates`
- `cliente-template/` - Estructura base para nuevo cliente
- `actor-template.json` - Plantilla de actor
- `proyecto-template.json` - Plantilla de proyecto

## 🔒 Seguridad

- Credenciales de Apify en `config/apify-credentials.json` (gitignored)
- Datos sensibles de clientes encriptados
- Auditoría de accesos en logs/
- Validación de datos extraídos

## 📝 Documentación Relacionada

- [CLAUDE.md](../CLAUDE.md) - Sistema principal JAC
- [INSTALAR.md](../INSTALAR.md) - Instalación
- [agente-juridico-especializado.js](../agente-juridico-especializado.js) - Agente legal

## 🔄 Workflow

1. **Configurar cliente** → `config.json`
2. **Definir actor** → `actors/mi-actor.json`
3. **Crear proyecto** → `clients/cliente/proyectos.json`
4. **Ejecutar extracción** → `run-actor.js`
5. **Procesar datos** → Agente jurídico especializado
6. **Generar reporte** → `datasets/cliente/reporte.json`

## 📞 Soporte

**Rama:** `claude/clientes-apify-setup-m82pnl`  
**Sistema:** Clientes Apify - JAC  
**Versión:** 1.0  
**Última actualización:** 2026-09-21

---

**JAC - Abogados Asociados | Sistema de Gestión de Clientes Apify**
