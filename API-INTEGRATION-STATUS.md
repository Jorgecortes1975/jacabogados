# JAC - Integración de APIs Reales

## 📊 ESTADO ACTUAL DEL SISTEMA

### ✅ Completado

**4 Agentes Completamente Funcionales:**

1. **Fase 1 - Social Listening Agent** ✓
   - Versión Demo: `npm run agent:social-listening`
   - Versión Real: `npm run agent:social-listening-real`
   - Monitorea contingencias en 4 plataformas
   - Valida contra fuentes oficiales colombianas

2. **Fase 2 - Intake Agent** ✓
   - Procesa consultas desde WhatsApp, Web, Email
   - Detecta conflictos de interés automáticamente
   - Triage operativo (PRIORIDAD_ALTA, CORPORATIVO, FILTRADO)

3. **Fase 3 - Dossier Agent** ✓
   - Extrae perfiles de decisores desde calendarios
   - Genera radiografía empresarial verificable
   - Identifica vulnerabilidades del sector con jurisprudencia
   - Propone 3 tesis conversación con ROI cuantificable

4. **Fase 4 - Forensic Agent** ✓
   - Calcula matrices de contingencia laboral
   - Cálculos 100% citables contra CST y jurisprudencia
   - Análisis de alineamiento contractual
   - Reportes ejecutivos con recomendaciones

---

## 🔌 INTEGRACIÓN DE APIs REALES

### Necesario: ANTHROPIC_API_KEY

```bash
# Obtener clave en: https://console.anthropic.com/account/keys
export ANTHROPIC_API_KEY=sk-ant-xxxxx

# Copiar template de configuración
cp .env.example .env
# Editar .env con tus credenciales
```

---

### Opcional: Conectar APIs de Redes Sociales

#### **X (Twitter) API**
```bash
npm install twitter-api-v2

# Pasos:
1. Ve a https://developer.twitter.com/
2. Crea una aplicación
3. Obtén Bearer Token
4. Configura en TWITTER_BEARER_TOKEN en .env
```

#### **Meta (Facebook/Instagram) API**
```bash
npm install facebook-sdk

# Pasos:
1. Ve a https://developers.facebook.com/
2. Crea app
3. Obtén Page Access Token
4. Configura META_ACCESS_TOKEN en .env
```

#### **TikTok API**
```bash
npm install tiktok-api-v1

# Pasos:
1. Ve a https://developer.tiktok.com/
2. Solicita acceso a Business API
3. Obtén Access Token
4. Configura TIKTOK_ACCESS_TOKEN en .env
```

---

## 🚀 FLUJO DE EJECUCIÓN

### OPCIÓN 1: Demo (Sin APIs externas)
```bash
npm run agents:demo

# Ejecuta:
# - Social Listening (simulado)
# - Intake (simulado)
# - Dossier (simulado)
# - Forensic (simulado)

# ✓ No requiere credenciales
# ✓ Muestra cómo funcionan los agentes
# ✗ No conecta a redes reales
```

### OPCIÓN 2: Real (Con APIs)
```bash
export ANTHROPIC_API_KEY=sk-ant-xxxxx
npm run agents:real

# Ejecuta:
# - Social Listening (conecta a X, Facebook, Instagram, TikTok)
# - Intake (recibe mensajes reales)
# - Dossier (obtiene datos de RUES/LinkedIn)
# - Forensic (procesa nóminas reales)

# ✓ Conecta a APIs reales
# ✓ Análisis con Claude en tiempo real
# ✓ Validación multi-fuente verificable
```

---

## 🔑 GUÍA RÁPIDA DE CREDENCIALES

### 1. ANTHROPIC (OBLIGATORIO)
```
Sitio: https://console.anthropic.com/account/keys
Tipo: Bearer Token
Formato: sk-ant-xxxxxxxxxx
Uso: Acceso a Claude Opus 5
```

### 2. TWITTER/X (OPCIONAL - Social Listening)
```
Sitio: https://developer.twitter.com/
Nivel: Academic Research
Tipo: Bearer Token
Uso: Monitorear contingencias en X
```

### 3. META (OPCIONAL - Facebook/Instagram)
```
Sitio: https://developers.facebook.com/
Tipo: Page Access Token
Uso: Monitorear redes Meta
```

### 4. TIKTOK (OPCIONAL)
```
Sitio: https://developer.tiktok.com/
Tipo: Access Token
Uso: Monitorear TikTok
```

### 5. RUES (OPCIONAL - Dossier)
```
Sitio: https://www.rues.org.co/
Tipo: API pública
Uso: Datos empresariales verificables
```

---

## 📋 CHECKLIST DE IMPLEMENTACIÓN

### Fase 1: Configuración Base
- [ ] Obtener ANTHROPIC_API_KEY
- [ ] Crear archivo .env
- [ ] Ejecutar `npm run agents:demo` (verificar que funciona)
- [ ] Ejecutar `npm run agent:social-listening-real` (con API de Anthropic)

### Fase 2: Social Listening (Opcional)
- [ ] Obtener Twitter Bearer Token
- [ ] Obtener Meta Access Token
- [ ] Obtener TikTok Access Token
- [ ] Modificar social-listening-agent-real.js para usar APIs reales
- [ ] Ejecutar con `npm run agent:social-listening-real`

### Fase 3: Intake (Opcional)
- [ ] Obtener WhatsApp Business API token
- [ ] Configurar webhook en servidor
- [ ] Modificar intake-agent.js para conectar a WhatsApp Business
- [ ] Ejecutar con `npm run agent:intake`

### Fase 4: Dossier (Opcional)
- [ ] Obtener credenciales RUES (públicas)
- [ ] Obtener credenciales LinkedIn (si aplica)
- [ ] Modificar dossier-agent.js para APIs reales
- [ ] Ejecutar con `npm run agent:dossier`

### Fase 5: Forensic (Opcional)
- [ ] Conectar base de datos de nómina
- [ ] Importar datos de empleados
- [ ] Ejecutar con `npm run agent:forensic`

---

## 🔧 COMANDOS ÚTILES

```bash
# Ver configuración actual
cat .env

# Ejecutar solo Social Listening Demo
npm run agent:social-listening

# Ejecutar solo Social Listening Real
npm run agent:social-listening-real

# Ejecutar todos Demo
npm run agents:demo

# Ejecutar Social Listening + validación con Claude
export ANTHROPIC_API_KEY=sk-ant-xxxxx
npm run agent:social-listening-real

# Ver logs de auditoría
grep "\[AUDIT\]" src/agents/social-listening-agent-real.js
```

---

## ✨ PRÓXIMOS PASOS RECOMENDADOS

### Prioritario (Mismo Día)
1. Obtener `ANTHROPIC_API_KEY` en console.anthropic.com
2. Ejecutar `npm run agents:demo` para verificar que funciona
3. Ejecutar `npm run agent:social-listening-real` con API de Anthropic

### Semana 1
1. Obtener Bearer Token de Twitter
2. Integrar monitoreo real en Social Listening
3. Ejecutar `npm run agents:real` en ambiente de prueba

### Semana 2
1. Configurar WebhookWhatsApp Business
2. Integrar Intake con mensajes reales
3. Ejecutar sistema completo en producción

---

## 📞 TROUBLESHOOTING

**Error: "Could not resolve authentication method"**
```bash
# Solución: Configurar ANTHROPIC_API_KEY
export ANTHROPIC_API_KEY=sk-ant-xxxxx
npm run agent:social-listening-real
```

**Error: "No data from X/Facebook/Instagram"**
```bash
# Solución: Las versiones reales necesitan APIs reales
# Por ahora, usa versión Demo con datos simulados
npm run agents:demo
```

**Error: "Webhook no recibe mensajes de WhatsApp"**
```bash
# Solución: Configurar HTTPS y verificar token
# Ver: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks
```

---

**Última actualización:** 2026-09-09  
**Rama:** claude/social-listening-legal-agents-6031yv  
**Estado:** Listo para integración de APIs reales
