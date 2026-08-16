# 📦 Guía de Instalación - LEXA-JAC v2.0

> **Instalación completa del ecosistema de agentes legales colombianos**

---

## ✅ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

| Requisito | Versión Mínima | Verificar |
|-----------|---|---|
| **Node.js** | 16.x o superior | `node --version` |
| **npm** | 8.x o superior | `npm --version` |
| **Git** | 2.20+ | `git --version` |
| **Python** | 3.8+ (opcional) | `python3 --version` |

---

## 🚀 Instalación Paso a Paso

### **Paso 1: Clonar el Repositorio**

```bash
# Clonar el repositorio
git clone https://github.com/jorgecortes1975/jacabogados.git

# Acceder al directorio
cd jacabogados

# Verificar la rama correcta
git branch -a
```

### **Paso 2: Instalar Dependencias de Node.js**

```bash
# Instalar todas las dependencias del proyecto
npm install

# Verificar instalación
npm list
```

### **Paso 3: Configurar Variables de Entorno**

Crea un archivo `.env` en la raíz del proyecto:

```bash
# Crear archivo de configuración
touch .env

# Editar con tu editor de texto favorito
nano .env  # o vim, VS Code, etc.
```

**Contenido recomendado del `.env`:**

```env
# === CONFIGURACIÓN LEXA-JAC v2.0 ===

# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_NAME=jacabogados
DB_USER=postgres
DB_PASSWORD=tu_contraseña_segura

# API Keys
DIAN_API_KEY=tu_api_key_dian
LEGAL_DATA_HUNTER_KEY=tu_api_key_ldh

# Telegram Bot
TELEGRAM_BOT_TOKEN=tu_token_bot_telegram
TELEGRAM_CHAT_ID=tu_chat_id

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu_email@gmail.com
SMTP_PASSWORD=tu_contraseña_app

# Configuración General
NODE_ENV=development
PORT=3000
LOG_LEVEL=info
TIMEZONE=America/Bogota

# URLs
API_BASE_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3001
```

### **Paso 4: Inicializar Base de Datos**

```bash
# Si usas PostgreSQL (recomendado)
createdb jacabogados

# Ejecutar migraciones (si existen)
npm run db:migrate

# Cargar datos iniciales
npm run db:seed
```

### **Paso 5: Verificar la Instalación**

```bash
# Ver la arquitectura del ecosistema
node lexa-super-router.js arquitectura

# Ver estado del sistema
node lexa-super-router.js status

# Listar agentes disponibles
node lexa-super-router.js agentes

# Listar fuentes jurídicas
node lexa-super-router.js fuentes
```

---

## 🔧 Configuración Detallada

### **A. Configurar el Agente Jurídico**

```bash
# Activar el agente jurídico
node agente-juridico-especializado.js activar

# Ver configuración de fuentes
node agente-juridico-especializado.js fuentes

# Probar con una consulta
node agente-juridico-especializado.js consulta jurisprudencia "despido sin justa causa"
```

**Archivo de configuración:** `agente-config.json`

### **B. Configurar Transportes MCP**

```bash
# Listar transportes actuales
node claude-mcp-transport.js list

# Agregar un nuevo transporte HTTP
node claude-mcp-transport.js add \
  --transport http \
  --name "corte-constitucional" \
  --url "https://www.corteconstitucional.gov.co"

# Activar transporte
node claude-mcp-transport.js activate corte-constitucional

# Ver estado de transportes
node claude-mcp-transport.js status
```

**Archivo de configuración:** `mcp-config.json`

### **C. Configurar el Ecosistema LEXA**

```bash
# Revisar configuración del ecosistema
cat lexa-ecosystem.json

# Validar configuración
npm run validate:config

# Recargar configuración en tiempo real
node lexa-super-router.js reload-config
```

**Archivo de configuración:** `lexa-ecosystem.json`

---

## 🧪 Pruebas de Funcionamiento

### **Prueba 1: Router Básico**

```bash
# Procesar una consulta simple
node lexa-super-router.js procesar "Hola, ¿cómo estás?"

# Resultado esperado: Router responde y clasifica la consulta
```

### **Prueba 2: Agente Jurídico**

```bash
# Consultar jurisprudencia
node agente-juridico-especializado.js consulta jurisprudencia \
  "¿Cuál es la indemnización por despido sin justa causa?"

# Resultado esperado: Respuesta con jurisprudencia verificada
```

### **Prueba 3: Análisis de Caso**

```bash
# Analizar un caso completo
node agente-juridico-especializado.js consulta analisis \
  "Mi cliente fue despedido el 15 de agosto sin justificación"

# Resultado esperado: Análisis jurisprudencial completo
```

### **Prueba 4: Generación de Reporte**

```bash
# Generar reporte jurídico
node agente-juridico-especializado.js consulta reporte \
  "Derechos de trabajadores en Colombia"

# Resultado esperado: Reporte documentado con citas verificables
```

---

## 📊 Verificar la Instalación Completa

Ejecuta este script para verificar que todo está instalado correctamente:

```bash
#!/bin/bash
# instalar-verificar.sh

echo "=== VERIFICACIÓN DE INSTALACIÓN LEXA-JAC ==="
echo ""

echo "✓ Node.js:"
node --version

echo "✓ npm:"
npm --version

echo "✓ Git:"
git --version

echo "✓ Archivos de configuración:"
ls -la *.json *.md

echo "✓ Scripts ejecutables:"
ls -la *.js

echo "✓ Estado del ecosistema:"
node lexa-super-router.js status

echo ""
echo "✅ Instalación verificada exitosamente"
```

Guarda como `instalar-verificar.sh` y ejecuta:

```bash
chmod +x instalar-verificar.sh
./instalar-verificar.sh
```

---

## 🐛 Solución de Problemas Comunes

### **Error: "Cannot find module 'express'"**

```bash
# Solución: Instalar dependencias
npm install

# Si persiste, limpiar cache
npm cache clean --force
npm install
```

### **Error: "Database connection failed"**

```bash
# Verificar conexión PostgreSQL
psql -U postgres -h localhost

# Verificar variables en .env
cat .env | grep DB_

# Recrear base de datos
dropdb jacabogados
createdb jacabogados
npm run db:migrate
```

### **Error: "Router no clasifica consultas"**

```bash
# Revisar configuración del router
cat lexa-ecosystem.json | grep dispatch_table

# Reiniciar router
node lexa-super-router.js restart

# Verificar logs
cat logs/router.log
```

### **Error: "Agente jurídico no responde"**

```bash
# Activar agente
node agente-juridico-especializado.js activar

# Verificar fuentes
node agente-juridico-especializado.js fuentes

# Limpiar cache
rm -rf .cache/

# Reintentar
node agente-juridico-especializado.js consulta jurisprudencia "test"
```

### **Error: "Puerto 3000 ya está en uso"**

```bash
# Cambiar puerto en .env
sed -i 's/PORT=3000/PORT=3001/g' .env

# O liberar puerto
lsof -ti:3000 | xargs kill -9
```

---

## 🚀 Iniciar el Sistema Completo

### **Opción 1: Modo Desarrollo**

```bash
# Terminal 1: Dashboard
npm run dev:dashboard

# Terminal 2: Router principal
npm run dev:router

# Terminal 3: Agentes
npm run dev:agents
```

### **Opción 2: Modo Producción**

```bash
# Compilar
npm run build

# Iniciar con PM2 (recomendado)
npm install -g pm2
pm2 start ecosystem.config.js

# Ver logs
pm2 logs
```

### **Opción 3: Con Docker (Recomendado)**

```bash
# Compilar imagen
docker build -t lexa-jac:latest .

# Ejecutar contenedor
docker run -d \
  --name lexa-jac \
  -p 3000:3000 \
  -p 3001:3001 \
  --env-file .env \
  lexa-jac:latest

# Verificar contenedor
docker logs lexa-jac
```

---

## ✨ Comandos Rápidos Útiles

```bash
# Ver ayuda del router
node lexa-super-router.js help

# Ver ayuda del agente jurídico
node agente-juridico-especializado.js help

# Ver estadísticas del sistema
node lexa-super-router.js stats

# Exportar configuración
npm run export:config

# Importar configuración
npm run import:config

# Ejecutar tests
npm test

# Verificar calidad de código
npm run lint

# Generar documentación
npm run docs
```

---

## 📖 Guías Relacionadas

Después de instalar, consulta estos documentos:

| Documento | Propósito |
|-----------|-----------|
| **README-LEXA.md** | Visión general del sistema |
| **LEXA-INTEGRATION.md** | Arquitectura y diseño técnico |
| **CLAUDE.md** | Guía del agente jurídico |
| **CASOS-EJEMPLO.md** | Ejemplos de uso práctico |
| **agente-config.json** | Configuración del agente |
| **lexa-ecosystem.json** | Configuración del ecosistema |

---

## 🆘 Soporte y Contacto

Si tienes problemas durante la instalación:

1. **Revisar logs:** `cat logs/*.log`
2. **Ejecutar verificación:** `./instalar-verificar.sh`
3. **Contactar soporte:** `jorgeacortesc38@gmail.com`

---

## 📋 Checklist de Instalación

Usa este checklist para verificar que todo está correcto:

- [ ] Node.js v16+ instalado
- [ ] npm v8+ instalado
- [ ] Repositorio clonado
- [ ] Dependencias instaladas (`npm install`)
- [ ] Archivo `.env` creado y configurado
- [ ] Base de datos creada
- [ ] Migraciones ejecutadas
- [ ] Agentes activados
- [ ] Router funcionando (`node lexa-super-router.js status`)
- [ ] Pruebas pasadas exitosamente
- [ ] Documentación leída (al menos README-LEXA.md)

---

## 🎉 Instalación Completada

Cuando veas este mensaje, ¡estás listo!

```
✅ LEXA-JAC v2.0 instalado correctamente
✅ Todos los agentes operacionales
✅ Base de datos sincronizada
✅ Fuentes jurídicas accesibles
✅ Sistema listo para producción
```

**Próximo paso:** Consulta `CASOS-EJEMPLO.md` para ver ejemplos prácticos.

---

**JAC - Abogados Asociados | LEXA v2.0**  
**Guía de Instalación | Versión 1.0**  
**Actualizado: Agosto 2026**
