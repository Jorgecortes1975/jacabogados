# Índice Maestro - Sistema Clientes Apify

Guía rápida de navegación y estado del sistema.

**Versión:** 1.0  
**Última actualización:** 2026-09-21  
**Estado:** ✅ Inicializado

---

## 📊 Estado del Sistema

| Componente | Estado | Descripción |
|------------|--------|-------------|
| Estructura | ✅ Completa | Directorios y archivos base creados |
| Configuración | 🔄 Pendiente | Requiere credenciales de Apify |
| Clientes | 📭 Vacío | Sin clientes registrados aún |
| Actores | 📋 Definidos | 3 actores en registro |
| Proyectos | 📭 Vacío | Sin proyectos activos |
| Datos | 📭 Vacío | Sin datasets aún |
| Logs | ✅ Listo | Sistema de logging configurado |

---

## 🗂️ Estructura de Directorios

```
clientes-apify/
│
├── config/                           # ⚙️ Configuración global
│   ├── global-settings.json         # Parámetros del sistema
│   ├── actores-disponibles.json     # Registro de actores
│   ├── apify-credentials.json       # 🔒 Credenciales (gitignored)
│   └── README.md
│
├── clients/                          # 👥 Gestión de clientes
│   ├── [cliente-id]/
│   │   ├── config.json
│   │   ├── proyectos.json
│   │   └── datos-extraidos/
│   └── README.md
│
├── actors/                           # 🎬 Actores de Apify
│   ├── jurisprudencia-cortes.json    # (pendiente)
│   ├── normas-leyes.json             # (pendiente)
│   ├── datos-empresariales.json      # (pendiente)
│   └── README.md
│
├── datasets/                         # 💾 Datos extraídos
│   ├── [cliente-id]/[proyecto-id]/
│   │   ├── [actor-id]/
│   │   │   └── 2026-09-21/
│   │   │       ├── run-001.json
│   │   │       └── run-001-metadata.json
│   │   └── reportes/
│   └── README.md
│
├── logs/                             # 📋 Registros del sistema
│   ├── executions-2026-09-21.log
│   ├── errors-2026-09-21.log
│   ├── audit-2026-09-21.log
│   ├── system-2026-09-21.log
│   └── README.md
│
├── templates/                        # 📝 Plantillas reutilizables
│   ├── cliente-template.json
│   ├── actor-template.json
│   ├── proyecto-template.json
│   └── README.md
│
├── README.md                         # 📖 Documentación principal
├── INDEX.md                          # 📑 Este archivo
├── .gitignore                        # 🔒 Archivos ignorados por git
└── CHANGELOG.md                      # 📜 Historial de cambios

```

---

## 🚀 Primeros Pasos

### 1. Configuración Inicial (⚠️ Requerido)

```bash
cd config/

# Crear credenciales de Apify
cat > apify-credentials.json << 'EOF'
{
  "apiToken": "YOUR_APIFY_TOKEN",
  "userId": "YOUR_APIFY_USER_ID"
}
EOF

# Validar configuración
jq . global-settings.json
```

### 2. Crear Primer Cliente

```bash
cd ..

# Copiar plantilla
cp templates/cliente-template.json clients/primer-cliente.json

# Editar datos
nano clients/primer-cliente.json

# Crear directorio de datos
mkdir -p datasets/primer-cliente
```

### 3. Registrar Actor

```bash
# Copiar plantilla de actor
cp templates/actor-template.json actors/mi-scraper.json

# Editar configuración
nano actors/mi-scraper.json

# Registrar en sistema
nano config/actores-disponibles.json
# Agregar entrada del actor
```

### 4. Crear Proyecto

```bash
# Copiar plantilla
cp templates/proyecto-template.json clients/primer-cliente/proyecto-1.json

# Editar parámetros
nano clients/primer-cliente/proyecto-1.json
```

---

## 📚 Documentación por Módulo

### Configuración
- 📖 [config/README.md](config/README.md)
- ⚙️ [config/global-settings.json](config/global-settings.json)
- 📋 [config/actores-disponibles.json](config/actores-disponibles.json)

### Clientes
- 📖 [clients/README.md](clients/README.md)
- 📝 [templates/cliente-template.json](templates/cliente-template.json)

### Actores
- 📖 [actors/README.md](actors/README.md)
- 📝 [templates/actor-template.json](templates/actor-template.json)
- 📋 [config/actores-disponibles.json](config/actores-disponibles.json)

### Datos
- 📖 [datasets/README.md](datasets/README.md)
- 📊 [clients/[id]/datos-extraidos/](clients/README.md)

### Logs
- 📖 [logs/README.md](logs/README.md)
- 📋 [logs/](logs/README.md)

### Plantillas
- 📖 [templates/README.md](templates/README.md)
- 📝 [templates/](templates/README.md)

---

## 🔄 Workflows Comunes

### Flujo: Agregar Nuevo Cliente

```
1. Crear directorio: clients/nombre-cliente/
2. Copiar config: templates/cliente-template.json → clients/nombre-cliente/config.json
3. Editar datos del cliente
4. Crear proyectos: templates/proyecto-template.json
5. Asignar actores a proyectos
6. Crear almacenamiento: datasets/nombre-cliente/
```

### Flujo: Ejecutar Extracción de Datos

```
1. Seleccionar cliente y proyecto
2. Elegir actor de Apify
3. Configurar parámetros de entrada
4. Ejecutar: node script-apify.js --client X --proyecto Y
5. Datos guardados en: datasets/cliente/proyecto/actor/YYYY-MM-DD/
6. Registrado en: logs/executions-YYYY-MM-DD.log
```

### Flujo: Procesar Datos con Agente Jurídico

```
1. Datos extraídos disponibles en: datasets/cliente/proyecto/
2. Activar agente jurídico especializado
3. Analizar contra jurisprudencia y normas
4. Generar: analisis-juridico.json
5. Crear reporte: reporte-final.json
```

---

## 🔐 Seguridad

✅ **Configurado:**
- Credenciales gitignored (.gitignore)
- Encriptación de datos sensibles
- Auditoría de cambios
- Validación de esquemas

⚠️ **Pendiente:**
- Implementar encriptación de datos
- Configurar permisos de archivo
- Establecer políticas de backup

---

## 📞 Contacto y Soporte

**Sistema:** JAC Clientes Apify  
**Rama de desarrollo:** `claude/clientes-apify-setup-m82pnl`  
**Versión:** 1.0  
**Mantenedor:** JAC - Abogados Asociados

---

## 📝 Checklist de Implementación

- [x] Crear estructura de directorios
- [x] Crear archivos de configuración
- [x] Crear plantillas base
- [x] Documentar cada módulo
- [ ] Implementar credenciales de Apify
- [ ] Registrar primeros actores
- [ ] Crear cliente piloto
- [ ] Ejecutar primera extracción
- [ ] Procesar con agente jurídico
- [ ] Generar primer reporte

---

**Última actualización:** 2026-09-21 02:15 UTC  
**Siguiente hito:** Implementación de credenciales de Apify
