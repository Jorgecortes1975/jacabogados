# 📧 Configuración de Correos Legales - JAC Automatización

> **Sistema multi-cuenta que procesa automáticamente información legal de Outlook y Gmail**

---

## 🎯 Cuentas Configuradas

### 1. **Outlook - Trabajo**
- **Email:** abogadojr@aliado.co
- **Proveedor:** Microsoft 365 Outlook
- **Tipo:** Profesional
- **Estado:** ⏳ Pendiente de autenticación

### 2. **Gmail - Personal**
- **Email:** jorgeacortesc38@gmail.com
- **Proveedor:** Google Gmail
- **Tipo:** Personal
- **Estado:** ⏳ Pendiente de autenticación

---

## 🚀 Instalación Paso a Paso

### PASO 1: Conectar Outlook (abogadojr@aliado.co)

#### Opción A: Automática (Recomendado)
```bash
node .claude/scripts/setup-correos.js --outlook
```

El script abrirá automáticamente:
1. Tu navegador
2. Página de login de Microsoft
3. Solicitud de permisos (Mail.Read, Calendar.Read, offline_access)
4. Confirmación de conexión

#### Opción B: Manual
1. Ve a: https://login.microsoftonline.com/
2. Inicia sesión con: **abogadojr@aliado.co**
3. Autoriza los permisos cuando se solicite
4. Regresa a esta ventana y presiona Enter

#### Permisos que se solicitan:
- ✅ Leer correos (Mail.Read)
- ✅ Leer carpetas compartidas (Mail.Read.Shared)
- ✅ Leer calendario (Calendars.Read)
- ✅ Acceso sin conexión (offline_access)

---

### PASO 2: Conectar Gmail (jorgeacortesc38@gmail.com)

#### Opción A: Automática (Recomendado)
```bash
node .claude/scripts/setup-correos.js --gmail
```

El script abrirá automáticamente:
1. Tu navegador
2. Página de login de Google
3. Solicitud de permisos (Gmail, Calendar)
4. Confirmación de conexión

#### Opción B: Manual
1. Ve a: https://accounts.google.com/o/oauth2/v2/auth
2. Inicia sesión con: **jorgeacortesc38@gmail.com**
3. Autoriza los permisos cuando se solicite
4. Regresa a esta ventana y presiona Enter

#### Permisos que se solicitan:
- ✅ Leer correos (gmail.readonly)
- ✅ Acceso completo a correos (gmail.modify)
- ✅ Leer calendario (calendar.readonly)

---

### PASO 3: Verificar Configuración

```bash
# Ver estado de ambas cuentas
node .claude/scripts/verificar-correos.js

# Debería mostrar:
✅ Outlook (abogadojr@aliado.co) - Conectado
✅ Gmail (jorgeacortesc38@gmail.com) - Conectado
```

---

### PASO 4: Activar Procesamiento Automático

```bash
# Activar hooks de procesamiento
node .claude/scripts/activar-hooks-correos.js

# Esto iniciará:
✓ Monitoreo en tiempo real
✓ Procesamiento automático de correos legales
✓ Análisis con agentes
✓ Notificaciones y reportes
```

---

## 📊 ¿Qué Hace el Sistema?

### Automáticamente Detecta:
- 📋 **Sentencias** - Jurisprudencia de cortes
- 📄 **Contratos** - Documentos legales
- ⚖️ **Demandas** - Solicitudes legales
- 📖 **Leyes/Decretos** - Normativa
- 🏛️ **Recursos** - Apelaciones y recursos legales
- 📌 **Información jurídica** - Cualquier contenido legal

### Procesa Automáticamente:
1. ✅ Extrae palabras clave jurídicas
2. ✅ Identifica tipos de documentos
3. ✅ Localiza referencias normativas
4. ✅ Detecta artículos y leyes citadas
5. ✅ Ejecuta agentes especializados
6. ✅ Actualiza ecosistema legal
7. ✅ Genera análisis detallados
8. ✅ Crea reportes ejecutivos

### Ejecuta Automáticamente:
- 🤖 **Investigador Jurisprudencial** - Busca precedentes
- 🤖 **Auditor Contractual** - Analiza contratos
- 🤖 **Consultor de Comunicaciones** - Resume información
- 🤖 **Redactor Ejecutivo** - Genera reportes

---

## 🎯 Palabras Clave Jurídicas Monitoreadas

El sistema busca automáticamente estas palabras en tus correos:

**Básicas:**
- sentencia, jurisprudencia, fallo, recurso, apelación
- demanda, contrato, acuerdo, ley, decreto
- resolución, artículo, legal, litigio

**Especializadas:**
- conflicto, derecho, obligación, responsabilidad
- indemnización, daño, perjuicio, cláusula
- incumplimiento, sanción, multa, procedimiento
- vencimiento, caducidad, tribunal, juzgado
- corte, magistrado, juez, abogado, letrado

**Total:** 43 palabras clave jurídicas

---

## 📁 Dónde Se Guardan los Análisis

```
Documents/
├── JAC-Correos-Procesados/
│   ├── outlook/
│   │   ├── 2026-08-12/
│   │   │   ├── analisis-msg-001.json
│   │   │   ├── analisis-msg-002.json
│   │   │   └── resumen-diario.json
│   │   └── ecosistema-estado.json
│   │
│   ├── gmail/
│   │   ├── 2026-08-12/
│   │   │   ├── analisis-msg-001.json
│   │   │   └── resumen-diario.json
│   │   └── ecosistema-estado.json
│   │
│   └── consolidado/
│       └── resumen-multi-cuenta.json
│
└── JAC-Logs/
    ├── correos-2026-08-12.log
    ├── cuentas-correo-2026-08-12.log
    └── agentes-ejecucion-2026-08-12.log
```

---

## 📞 Ver Resultados

### Resumen Diario (Automático cada 08:00)

```bash
# Abrir reporte del día actual
cat ~/Documents/JAC-Correos-Procesados/consolidado/resumen-diario-$(date +%Y-%m-%d).json
```

### Búsqueda de Análisis Específicos

```bash
# Buscar análisis por tipo
ls ~/Documents/JAC-Correos-Procesados/outlook/*/analisis-*.json

# Ver análisis específico
cat ~/Documents/JAC-Correos-Procesados/outlook/2026-08-12/analisis-msg-001.json
```

### Monitoreo en Tiempo Real

```bash
# Ver logs en vivo
tail -f ~/Documents/JAC-Logs/correos-$(date +%Y-%m-%d).log
```

---

## ✅ Verificación de Instalación

Ejecuta este script para verificar que todo está conectado:

```bash
node .claude/scripts/test-correos.js
```

**Salida esperada:**

```
════════════════════════════════════════════
✅ VERIFICACIÓN DE CUENTAS DE CORREO
════════════════════════════════════════════

✅ Outlook (abogadojr@aliado.co)
   • Conectado: SÍ
   • Últimos correos: 47
   • Correos procesados hoy: 3
   • Carpe tas: Inbox, Seguimiento, Clientes

✅ Gmail (jorgeacortesc38@gmail.com)
   • Conectado: SÍ
   • Últimos correos: 123
   • Correos procesados hoy: 2
   • Carpetas: INBOX, IMPORTANT, STARRED

🔄 Procesamiento
   • Estado: ACTIVO
   • Hooks: HABILITADOS
   • Agentes: 4 (ACTIVOS)

📊 Hoy
   • Correos legales detectados: 5
   • Análisis generados: 5
   • Agentes ejecutados: 12

════════════════════════════════════════════
✅ TODO FUNCIONANDO CORRECTAMENTE
════════════════════════════════════════════
```

---

## 🛠️ Troubleshooting

### Error: "Autenticación fallida"

**Solución:**
1. Verifica que estés usando las direcciones correctas:
   - Outlook: abogadojr@aliado.co
   - Gmail: jorgeacortesc38@gmail.com
2. Reinicia: `node .claude/scripts/setup-correos.js --force`
3. Limpia cache: `rm -rf ~/.claude-oauth-cache`

### Error: "Permisos insuficientes"

**Solución:**
1. Revoca acceso anterior:
   - Outlook: https://account.live.com/consent/manage
   - Gmail: https://myaccount.google.com/permissions
2. Reinicia la configuración
3. Autoriza todos los permisos cuando se solicite

### Los correos no se procesan automáticamente

**Solución:**
```bash
# Verifica que los hooks estén activos
node .claude/scripts/verificar-hooks.js

# Reinicia el procesamiento
node .claude/scripts/activar-hooks-correos.js --restart
```

---

## 📈 Configuración Avanzada

### Cambiar Frecuencia de Procesamiento

Edita `.claude/config/cuentas-correo.json`:

```json
"procesamiento_global": {
  "frecuencia_chequeo": "tiempo-real"  // O: "5-minutos", "15-minutos", "hourly"
}
```

### Agregar Palabras Clave Personalizadas

```json
"procesamiento_global": {
  "palabrasClaveJuridicas": [
    // ... palabras existentes ...
    "mi-palabra-personalizada"
  ]
}
```

### Cambiar Carpetas Monitoreadas

Para Outlook:
```json
"outlook-trabajo": {
  "carpetas_monitorizar": [
    "Inbox",
    "Seguimiento",
    "Clientes",
    "Mi-carpeta-personalizada"
  ]
}
```

Para Gmail:
```json
"gmail-personal": {
  "carpetas_monitorizar": [
    "INBOX",
    "IMPORTANT",
    "STARRED",
    "[Gmail]/MiCarpeta"
  ]
}
```

---

## 🎯 Resumen Rápido

| Paso | Comando | Tiempo |
|------|---------|--------|
| 1. Conectar Outlook | `node .claude/scripts/setup-correos.js --outlook` | 2 min |
| 2. Conectar Gmail | `node .claude/scripts/setup-correos.js --gmail` | 2 min |
| 3. Verificar | `node .claude/scripts/verificar-correos.js` | 30 seg |
| 4. Activar | `node .claude/scripts/activar-hooks-correos.js` | 1 min |
| **TOTAL** | | **5-6 minutos** |

---

## 📞 Soporte

**Documentación:**
- `.claude/config/cuentas-correo.json` - Configuración completa
- `.claude/hooks/hook-correos-legales.js` - Hook de procesamiento
- `procesador-correos-legales.js` - Script maestro

**Logs:**
- `~/Documents/JAC-Logs/correos-*.log` - Log diario
- `~/Documents/JAC-Logs/cuentas-correo-*.log` - Log de cuentas
- `~/Documents/JAC-Logs/agentes-*.log` - Log de agentes

**Contacto:**
- Email: abogadojr@aliado.co / jorgeacortesc38@gmail.com
- Sistema: JAC Automatización Jurídica v2.0

---

**JAC - Abogados Asociados | Sistema de Automatización Jurídica**  
**Versión:** 2.0 | Última actualización: 2026-08-12
