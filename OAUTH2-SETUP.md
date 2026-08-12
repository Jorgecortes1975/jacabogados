# 🔐 Configuración OAuth2 - Sistema Real de Correos Legales

> **Sistema de autenticación segura con Outlook y Gmail usando OAuth2**

---

## 📋 Resumen

Este documento te guía para configurar la **autenticación OAuth2 real** con:
- ✅ **Outlook** (abogadojr@aliado.co) - Microsoft 365
- ✅ **Gmail** (jorgeacortesc38@gmail.com)

El sistema es **100% funcional** y se conecta directamente a las APIs oficiales de Microsoft y Google.

---

## 🏗️ Arquitectura de Seguridad

```
┌─────────────────────────────────────────────────┐
│         Aplicación JAC (Local)                  │
│  - Procesa correos                              │
│  - Análisis legal automático                    │
└────────────┬────────────────────────────────────┘
             │ OAuth2 Flow
             ▼
┌─────────────────────────────────────────────────┐
│  OAuth2 Manager                                 │
│  - Maneja flujo de autenticación                │
│  - Refresca tokens automáticamente              │
│  - Encripta credenciales (AES-256-GCM)         │
└────────────┬────────────────────────────────────┘
             │ Tokens Encriptados
             ▼
┌─────────────────────────────────────────────────┐
│  Almacenamiento Seguro                          │
│  ~/.config/jac/tokens/                          │
│  - outlook-abogadojr@aliado.co.encrypted        │
│  - gmail-jorgeacortesc38@gmail.com.encrypted    │
└─────────────────────────────────────────────────┘

             ▲ API Calls
             │
┌────────────┴────────────┬────────────────────────┐
│                         │                        │
▼                         ▼                        ▼
Microsoft Graph API   Gmail API            Calendar APIs
(Outlook)             (Email)               (Events)
```

---

## 🔧 PASO 1: Configurar Microsoft 365 (Outlook)

### 1.1 Crear Aplicación en Azure Portal

1. Ve a https://portal.azure.com
2. Inicia sesión con tu cuenta Microsoft
3. Busca "App registrations"
4. Click en "New registration"
5. Rellena:
   - **Name**: `JAC Legal Automation`
   - **Supported account types**: "Accounts in any organizational directory and personal Microsoft accounts"
   - **Redirect URI**: `http://localhost:3000/auth/outlook/callback`
6. Click "Register"

### 1.2 Obtener Credenciales

En la página de la app registrada:

1. Copia el **Application (client) ID**
   - Esto es tu `OUTLOOK_CLIENT_ID`

2. Ve a "Certificates & secrets"
3. Click "New client secret"
4. Copia el valor (aparece solo una vez)
   - Esto es tu `OUTLOOK_CLIENT_SECRET`

### 1.3 Configurar Permisos (Scopes)

En "API permissions":

1. Click "Add a permission"
2. Selecciona "Microsoft Graph"
3. Selecciona "Delegated permissions"
4. Busca y selecciona:
   - `Mail.Read`
   - `Mail.Read.Shared`
   - `Calendars.Read`
   - `offline_access`
5. Click "Add permissions"

### 1.4 Guardar Variables de Entorno

```bash
# En tu shell (~/.bashrc, ~/.zshrc, etc.)
export OUTLOOK_CLIENT_ID="paste-your-client-id-here"
export OUTLOOK_CLIENT_SECRET="paste-your-client-secret-here"

# Luego:
source ~/.bashrc
```

**⚠️ SEGURIDAD**: Nunca comitees estas credenciales a Git. Se guardarán encriptadas en `~/.config/jac/tokens/`

---

## 🏗️ PASO 2: Configurar Google Cloud (Gmail)

### 2.1 Crear Proyecto

1. Ve a https://console.cloud.google.com
2. Click en "Create Project"
3. Nombre: `JAC-Legal-Automation`
4. Click "Create"

### 2.2 Habilitar Gmail API

1. Ve a "APIs & Services" → "Library"
2. Busca "Gmail API"
3. Click en ella
4. Click "Enable"

### 2.3 Crear Credenciales OAuth2

1. Ve a "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "OAuth client ID"
3. Si es primera vez, click "Configure OAuth consent screen"
4. Selecciona "External"
5. Rellena:
   - **App name**: `JAC Legal`
   - **User support email**: tu email
   - **Developer contact**: tu email
6. Agrega scopes (Clic en "Add or Remove Scopes"):
   - `https://www.googleapis.com/auth/gmail.readonly`
   - `https://www.googleapis.com/auth/gmail.modify`
   - `https://www.googleapis.com/auth/calendar.readonly`
7. Click "Save and Continue"
8. En "Test users", agrega: `jorgeacortesc38@gmail.com`
9. Click "Save and Continue"
10. Vuelve a "Credentials"
11. Click "Create Credentials" → "OAuth client ID"
12. Selecciona "Desktop app" (o "Web application")
13. Agrega URI autorizado: `http://localhost:3000/auth/google/callback`
14. Click "Create"

### 2.4 Descargar Credenciales

1. Descarga el archivo JSON de credenciales
2. Abre el archivo descargado
3. Copia:
   - `client_id` → `GOOGLE_CLIENT_ID`
   - `client_secret` → `GOOGLE_CLIENT_SECRET`

### 2.5 Guardar Variables de Entorno

```bash
# En tu shell
export GOOGLE_CLIENT_ID="paste-your-client-id-here"
export GOOGLE_CLIENT_SECRET="paste-your-client-secret-here"

# Luego:
source ~/.bashrc
```

---

## ✅ PASO 3: Verificar Configuración

```bash
# Verifica que las variables están configuradas
echo $OUTLOOK_CLIENT_ID
echo $OUTLOOK_CLIENT_SECRET
echo $GOOGLE_CLIENT_ID
echo $GOOGLE_CLIENT_SECRET

# Si ves valores vacíos, vuelve al PASO 1 o 2
```

---

## 🚀 PASO 4: Configurar Cuentas de Email

### 4.1 Ejecutar Setup Wizard para Outlook

```bash
node .claude/scripts/setup-correos.js --outlook
```

**Esto:**
1. Abre tu navegador
2. Te pide autorización en Microsoft
3. Guarda el token encriptado
4. Actualiza la configuración

### 4.2 Ejecutar Setup Wizard para Gmail

```bash
node .claude/scripts/setup-correos.js --gmail
```

**Esto:**
1. Abre tu navegador
2. Te pide autorización en Google
3. Guarda el token encriptado
4. Actualiza la configuración

---

## 🧪 PASO 5: Probar el Sistema

### 5.1 Verificar que todo está configurado

```bash
node .claude/scripts/verificar-correos.js
```

Debería mostrar:
```
✅ Outlook (abogadojr@aliado.co) - Conectado
✅ Gmail (jorgeacortesc38@gmail.com) - Conectado
✅ Tokens encriptados y válidos
```

### 5.2 Procesar correos reales

```bash
node procesador-correos-reales.js --procesar
```

Esto:
1. Se conecta a Outlook y Gmail reales
2. Obtiene tus últimos 5 correos
3. Detecta automáticamente correos legales
4. Genera análisis JSON
5. Guarda resultados en `~/Documents/JAC-Correos-Procesados/`

---

## 📊 Ver Resultados

```bash
# Ver análisis de hoy
cat ~/Documents/JAC-Correos-Procesados/consolidado/resumen-$(date +%Y-%m-%d).json

# Ver logs
tail -f ~/Documents/JAC-Logs/correos-$(date +%Y-%m-%d).log
```

---

## 🔒 Seguridad: Cómo Funciona la Encriptación

### Tokens Encriptados

Tus tokens de acceso a Outlook y Gmail se guardan así:

```
~/.config/jac/tokens/
├── outlook-abogadojr@aliado.co.encrypted
└── gmail-jorgeacortesc38@gmail.com.encrypted
```

**Cada token está encriptado con:**
- Algoritmo: AES-256-GCM (nivel de banco)
- Clave derivada de: sistema operativo + contraseña maestra
- IV aleatorio + Authentication Tag para integridad

**Nunca se guarda:**
- ❌ Credenciales en texto plano
- ❌ Contraseñas
- ❌ Client secrets en archivos

---

## 🐛 Troubleshooting

### Error: "OUTLOOK_CLIENT_ID no configurado"

**Solución:**
```bash
export OUTLOOK_CLIENT_ID="tu-id-aqui"
source ~/.bashrc
node procesador-correos-reales.js --procesar
```

### Error: "Token expirado"

**Solución automática:**
El sistema refresca tokens automáticamente. Si aún hay error:
```bash
# Reautenticar
node .claude/scripts/setup-correos.js --outlook
node .claude/scripts/setup-correos.js --gmail
```

### Error: "Gmail API no habilitada"

**Solución:**
Vuelve a PASO 2.2 y verifica que habilitaste la Gmail API en Google Cloud Console.

### Los correos no aparecen

**Verificar:**
1. ¿Tienes correos sin leer en las últimas 24 horas?
2. ¿Las cuentas están autenticadas?
   ```bash
   node .claude/scripts/verificar-correos.js
   ```
3. ¿Los correos tienen palabras clave legales?
   ```bash
   # Busca "sentencia", "contrato", "demanda", etc.
   ```

---

## 📈 Flujo Completo: De Correo a Análisis

```
1. Correo llega a Outlook o Gmail
   ↓
2. Sistema detecta automáticamente (si tiene palabras legales)
   ↓
3. Obtiene contenido completo vía API
   ↓
4. Clasifica tipo (sentencia, contrato, demanda, etc.)
   ↓
5. Extrae palabras clave jurídicas
   ↓
6. Asigna agentes especializados:
   - Investigador jurisprudencial
   - Auditor contractual
   - Consultor de comunicaciones
   ↓
7. Genera análisis JSON con:
   - Tipos de documento
   - Palabras clave
   - Acciones recomendadas
   - Agentes asignados
   ↓
8. Guarda en ~/Documents/JAC-Correos-Procesados/
   ↓
9. Registra en logs
```

---

## 📞 Referencia Rápida

| Tarea | Comando |
|-------|---------|
| Configurar Outlook | `node .claude/scripts/setup-correos.js --outlook` |
| Configurar Gmail | `node .claude/scripts/setup-correos.js --gmail` |
| Verificar estado | `node .claude/scripts/verificar-correos.js` |
| Procesar correos | `node procesador-correos-reales.js --procesar` |
| Ver logs | `tail -f ~/Documents/JAC-Logs/correos-*.log` |
| Ver análisis | `cat ~/Documents/JAC-Correos-Procesados/consolidado/*.json` |

---

## ✨ Características Implementadas

✅ **OAuth2 Real**
- Microsoft Graph API (Outlook)
- Gmail API v1
- Autenticación segura

✅ **Seguridad**
- Encriptación AES-256-GCM
- Tokens con expiración automática
- Refresh token flow
- Sin credenciales en texto plano

✅ **Funcionalidad**
- Lee correos reales
- Detecta información legal
- Procesa adjuntos
- Busca por palabras clave
- Genera análisis

✅ **Confiabilidad**
- Manejo de errores
- Logs detallados
- Recuperación automática
- Validación de tokens

---

**JAC - Abogados Asociados | Sistema Real de Integración de Correos**  
**Versión:** 1.0 | Producción Listo | Seguridad: Nivel Banco
