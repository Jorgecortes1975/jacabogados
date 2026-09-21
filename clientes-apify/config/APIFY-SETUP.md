# Configuración de Apify MCP - Guía Completa

> Guía paso a paso para integrar Apify con el sistema de clientes JAC

**Fecha:** 2026-09-21  
**Versión:** 1.0  
**Estado:** En Implementación

---

## 📋 Tabla de Contenidos

1. [Requisitos Previos](#requisitos-previos)
2. [Paso 1: Obtener Credenciales](#paso-1-obtener-credenciales)
3. [Paso 2: Configurar Archivo de Credenciales](#paso-2-configurar-archivo-de-credenciales)
4. [Paso 3: Verificar Conexión MCP](#paso-3-verificar-conexión-mcp)
5. [Paso 4: Registrar Actores](#paso-4-registrar-actores)
6. [Paso 5: Ejecutar Actor Piloto](#paso-5-ejecutar-actor-piloto)
7. [Troubleshooting](#troubleshooting)

---

## 🔐 Requisitos Previos

Antes de comenzar, asegúrate de tener:

- ✅ Cuenta activa en Apify (https://apify.com)
- ✅ Token de API de Apify
- ✅ ID de usuario de Apify
- ✅ Permisos de lectura/escritura en Apify
- ✅ Acceso a internet (conexión a https://mcp.apify.com)

---

## Paso 1: Obtener Credenciales

### 1.1 Obtener Token de API

```
Url: https://console.apify.com/account/integrations/api
1. Ir a Console de Apify
2. Click en "Account" (Cuenta)
3. Seleccionar "Integrations" → "API"
4. Copiar el "API Token" (comienza con "apk_")
```

### 1.2 Obtener ID de Usuario

```
URL: https://console.apify.com/account
1. Ir a Console de Apify
2. Click en "Account"
3. Tu ID está en "User ID" (ej: "Wx1hA2b3Cd4E5f6")
```

### 1.3 Guardar Credenciales Temporalmente

Mantén estos datos seguros (NO en git):

```
API Token:  apk_xxxxxxxxxxxxxxxxxxxx
User ID:    Wx1hA2b3Cd4E5f6
```

---

## Paso 2: Configurar Archivo de Credenciales

### 2.1 Crear Archivo de Credenciales

```bash
cd /home/user/jacabogados/clientes-apify/config/

# Crear archivo con credenciales
cat > apify-credentials.json << 'EOF'
{
  "apiToken": "apk_xxxxxxxxxxxxxxxxxxxx",
  "userId": "Wx1hA2b3Cd4E5f6",
  "baseUrl": "https://api.apify.com",
  "createdAt": "2026-09-21T02:15:00Z",
  "validado": false
}
EOF
```

**⚠️ IMPORTANTE:**
- Este archivo **NUNCA** debe ir a git (está en .gitignore)
- Proteger los permisos del archivo:

```bash
chmod 600 apify-credentials.json
```

### 2.2 Validar Credenciales

```bash
# Verificar formato JSON
jq . apify-credentials.json

# Debe mostrar estructura sin errores
```

---

## Paso 3: Verificar Conexión MCP

### 3.1 Probar Conexión a Servidor MCP

```bash
# Verificar accesibilidad del servidor MCP de Apify
curl -s -I https://mcp.apify.com | head -5

# Debe retornar HTTP 200 u otro código 2xx
```

### 3.2 Probar Autenticación

```bash
# Reemplazar con tu token
APIFY_TOKEN="apk_xxxxxxxxxxxxxxxxxxxx"

# Test básico de API
curl -H "Authorization: Bearer $APIFY_TOKEN" \
  https://api.apify.com/v2/account

# Debe retornar información de tu cuenta
```

### 3.3 Validar Configuración MCP

```bash
# Verificar que mcp-config.json incluye Apify
cd /home/user/jacabogados
jq '.transports."apify-mcp"' mcp-config.json

# Debe mostrar:
# {
#   "type": "http",
#   "url": "https://mcp.apify.com",
#   "enabled": true,
#   ...
# }
```

---

## Paso 4: Registrar Actores

### 4.1 Obtener IDs de Actores en Apify

```
URL: https://console.apify.com/actors
1. Ir a Console → Actors
2. Para cada actor a usar, copiar el "Actor ID"
3. Los IDs tienen formato: Wx1hA2b3Cd4E
```

### 4.2 Actualizar Registro de Actores

```bash
cd /home/user/jacabogados/clientes-apify/config

# Editar actores-disponibles.json
# Buscar cada actor y completar "apifyActorId"
```

**Ejemplo de actualización:**

```json
{
  "id": "web-scraper-jurisprudencia",
  "nombre": "Web Scraper Jurisprudencia",
  "apifyActorId": "Wx1hA2b3Cd4E5f6",
  "estado": "disponible",
  "version": "1.0"
}
```

### 4.3 Validar Configuración

```bash
# Verificar que todos los actores tienen ID
jq '.actores[] | select(.apifyActorId == null)' actores-disponibles.json

# No debe retornar resultados (todos deben tener ID)
```

---

## Paso 5: Ejecutar Actor Piloto

### 5.1 Crear Cliente Piloto

```bash
cd /home/user/jacabogados/clientes-apify

# Copiar plantilla
cp templates/cliente-template.json clients/cliente-piloto.json

# Editar con datos reales
nano clients/cliente-piloto.json
```

### 5.2 Crear Proyecto Piloto

```bash
# Copiar plantilla de proyecto
cp templates/proyecto-template.json \
  clients/cliente-piloto/proyecto-piloto.json

# Editar para usar actor disponible
nano clients/cliente-piloto/proyecto-piloto.json
```

### 5.3 Ejecutar Actor

```bash
# (En futuro, mediante script específico)
# Por ahora, ejecutar manualmente en consola de Apify

# Verificar que datos se reciben
ls -la datasets/cliente-piloto/proyecto-piloto/
```

---

## 📊 Integración Completa: Flujo de Datos

```
┌─────────────────────────────────────────────────┐
│     Usuario / Sistema de Clientes JAC            │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│    MCP Router (mcp-config.json)                  │
│  Selecciona: apify-mcp (https://mcp.apify.com)  │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│    Servidor MCP de Apify                        │
│  Autentica con token, ejecuta endpoints         │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│    Actor de Apify Especifico                    │
│  (web-scraper, extractor-normas, etc)          │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│    Extrae Datos de Fuentes Jurídicas            │
│  Retorna JSON al Dataset de Apify               │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│    Datos Almacenados en                         │
│    datasets/cliente/proyecto/actor/YYYY-MM-DD/  │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│    Agente Jurídico Especializado                │
│  Procesa y analiza datos contra jurisprudencia  │
└────────────────┬────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────┐
│    Reporte Final Generado                       │
│    analisis-juridico.json + reporte-final.json  │
└─────────────────────────────────────────────────┘
```

---

## 🔍 Verificación de Integración

### Checklist de Validación

- [ ] Archivo `apify-credentials.json` existe y es válido
- [ ] Token de Apify funciona (test curl exitoso)
- [ ] `mcp-config.json` incluye transporte `apify-mcp`
- [ ] `apify-mcp-config.json` está completo
- [ ] `actores-disponibles.json` tiene IDs de Apify válidos
- [ ] Cliente piloto creado
- [ ] Proyecto piloto configurado
- [ ] Primera ejecución completada
- [ ] Datos almacenados en `datasets/`
- [ ] Logs registran ejecución en `logs/executions-*.log`

### Comandos de Verificación

```bash
# 1. Verificar credenciales
ls -la config/apify-credentials.json

# 2. Verificar JSON
jq . config/apify-credentials.json config/apify-mcp-config.json config/actores-disponibles.json

# 3. Verificar directorios
ls -la clients/ datasets/ logs/

# 4. Contar archivos
find . -type f | wc -l
```

---

## 🐛 Troubleshooting

### Problema: "Connection refused" a MCP

```bash
# Verificar conectividad
ping mcp.apify.com
curl -I https://mcp.apify.com

# Solución: Verificar firewall/proxy
```

### Problema: "Invalid API Token"

```bash
# Verificar formato del token
grep "apiToken" config/apify-credentials.json

# Debe comenzar con "apk_"
# Token correcto: apk_xxxxxxxxxxxxxxxxxxxxx
```

### Problema: "Actor not found"

```bash
# Verificar que el ID existe
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.apify.com/v2/actors/ACTOR_ID

# ID correcto tiene formato: 32 caracteres hexadecimales
```

### Problema: "Dataset empty"

```bash
# Verificar que actor retornó datos
ls -la datasets/cliente/proyecto/actor/*/

# Ver contenido
jq . datasets/cliente/proyecto/actor/2026-09-21/run-001.json
```

### Problema: Datos no se guardan

```bash
# Verificar permisos de directorio
chmod -R 755 datasets/

# Verificar espacio en disco
df -h

# Ver logs de error
grep ERROR logs/errors-*.log
```

---

## 📞 Soporte y Recursos

- **Documentación Apify:** https://docs.apify.com/platform
- **API Reference:** https://docs.apify.com/api/v2
- **MCP Documentation:** https://docs.apify.com/platform/integrations/mcp
- **Ejemplos en Repositorio:** `templates/`
- **Configuración General:** `README.md`

---

## ✅ Siguiente Paso

Una vez completada esta configuración:

1. ✅ Sistema MCP configurado
2. ⏳ **Siguiente:** Crear cliente piloto real
3. ⏳ Ejecutar primer actor
4. ⏳ Procesar con agente jurídico
5. ⏳ Generar reporte

---

**Estado:** En Implementación  
**Última actualización:** 2026-09-21  
**Versión:** 1.0

Para más información, consulta `../README.md` y `apify-mcp-config.json`
