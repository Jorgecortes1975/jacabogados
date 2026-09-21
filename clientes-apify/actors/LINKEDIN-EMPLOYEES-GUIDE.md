# LinkedIn Company Employees Extractor - Guía de Implementación

> Integración del actor de Apify para extracción de empleados de LinkedIn en sistema JAC

**Versión:** 1.0  
**Fecha:** 2026-09-21  
**Estado:** Disponible  
**Responsable:** Sistema de Clientes Apify JAC

---

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Casos de Uso](#casos-de-uso)
3. [Requisitos](#requisitos)
4. [Configuración](#configuración)
5. [Ejecución](#ejecución)
6. [Procesamiento de Datos](#procesamiento-de-datos)
7. [Consideraciones Legales](#consideraciones-legales)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Descripción General

**LinkedIn Company Employees Extractor** es un actor de Apify especializado en:

- ✅ Extracción de lista completa de empleados de una empresa en LinkedIn
- ✅ Recopilación de información de perfil (nombre, cargo, ubicación)
- ✅ Análisis de estructura organizacional
- ✅ Identificación de conexiones y contactos

**Fuente:** https://github.com/tuhinmallick/apify-linkedin-company-employees

---

## 💼 Casos de Uso

### 1. Investigación Jurídica Corporativa
```
Escenario: Analizar estructura de empresa en litigio
Objetivo: Identificar directivos, responsables, estructura
Salida: Lista de empleados clave con puestos
```

### 2. Due Diligence en M&A
```
Escenario: Verificar equipo en adquisición
Objetivo: Validar composición de equipo y especialidades
Salida: Análisis de capacidades del equipo
```

### 3. Investigación de Competencia
```
Escenario: Analizar estrategia competitiva
Objetivo: Identificar expertos, líderes, especialistas
Salida: Mapeo de talento competidor
```

### 4. Reclutamiento Objetivo
```
Escenario: Identificar candidatos calificados
Objetivo: Localizar profesionales con experiencia específica
Salida: Lista de candidatos potenciales
```

### 5. Análisis de Estructura Empresarial
```
Escenario: Entender organización de empresa cliente
Objetivo: Mapear departamentos y jerarquía
Salida: Organigrama basado en datos de LinkedIn
```

---

## 📋 Requisitos

### Requisitos Técnicos

✅ Cuenta activa en Apify  
✅ Token API de Apify  
✅ Proxy de Apify habilitado  
✅ Cuota disponible en Apify

### Requisitos de Información

✅ URL de LinkedIn de empresa (ej: https://www.linkedin.com/company/google)  
✅ Número máximo de empleados a extraer  
✅ Configuración de concurrencia

### Requisitos Legales

⚠️ **CRÍTICO:** Revisar antes de usar:
- Términos de Servicio de LinkedIn (Sección 8.2)
- Leyes de protección de datos (GDPR, CCPA, etc.)
- Leyes locales de privacidad
- Políticas de robots.txt

---

## ⚙️ Configuración

### 1. Registrar Actor en Apify

```bash
# 1. Ir a Apify Console
# URL: https://console.apify.com/actors

# 2. Buscar "linkedin-company-employees"
# O importar desde repositorio:
# https://github.com/tuhinmallick/apify-linkedin-company-employees

# 3. Copiar el Actor ID (formato: 32 caracteres)
# Ej: Wx1hA2b3Cd4E5f6Gh7Ij8Kl9Mn0Op1Qr

# 4. Actualizar en actores-disponibles.json
```

### 2. Configurar Parámetros de Entrada

**Archivo:** `linkedin-company-employees.json`

```json
{
  "entrada": {
    "ejemplo": {
      "companyLinkedInUrl": "https://www.linkedin.com/company/google",
      "maxRequests": 1000,
      "maxConcurrency": 1,
      "useApifyProxy": true
    }
  }
}
```

### 3. Configurar Proxy de Apify

```json
{
  "proxyConfiguration": {
    "useApifyProxy": true,
    "proxyUrls": ["http://proxy.apify.com:8000"]
  }
}
```

---

## 🚀 Ejecución

### Paso 1: Crear Proyecto Cliente

```bash
cd clientes-apify/clients

# Copiar plantilla
cp ../templates/proyecto-template.json \
  cliente-investigacion/proyecto-linkedin.json
```

### Paso 2: Configurar Proyecto

```json
{
  "proyecto": {
    "id": "investigacion-linkedin-2026",
    "nombre": "Investigación LinkedIn - Empresa X",
    "clienteId": "cliente-investigacion",
    "tipo": "investigacion_competencia"
  },
  "parametros": {
    "palabrasClave": [
      "Empresa X",
      "Estructura organizacional"
    ],
    "periodicity": "unica"
  },
  "ejecucion": {
    "actorId": "linkedin-company-employees",
    "actorConfig": {
      "companyLinkedInUrl": "https://www.linkedin.com/company/empresa-x",
      "maxRequests": 500,
      "useApifyProxy": true
    }
  }
}
```

### Paso 3: Ejecutar Actor

```bash
# Opción 1: Mediante Apify Console
# URL: https://console.apify.com/actors
# 1. Seleccionar actor
# 2. Click "Run"
# 3. Completar parámetros
# 4. Click "Run"

# Opción 2: Mediante API de Apify
curl -X POST \
  https://api.apify.com/v2/actor-runs \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d @payload.json
```

### Paso 4: Monitorear Ejecución

```bash
# Ver estado
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.apify.com/v2/actor-runs/RUN_ID

# Ver dataset de salida
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.apify.com/v2/datasets/DATASET_ID/items
```

---

## 📊 Procesamiento de Datos

### Estructura de Datos Extraídos

```json
{
  "items": [
    {
      "name": "John Doe",
      "linkedInUrl": "https://www.linkedin.com/in/johndoe",
      "title": "Senior Software Engineer",
      "location": "San Francisco, CA",
      "profilePictureUrl": "https://media.licdn.com/...",
      "connectionDegree": 2,
      "mutualConnections": 5,
      "company": "Empresa X",
      "extractedAt": "2026-09-21T12:00:00Z"
    }
  ]
}
```

### Almacenamiento

```
datasets/
└── cliente-investigacion/
    └── proyecto-linkedin/
        └── linkedin-company-employees/
            └── 2026-09-21/
                ├── run-001.json           # Datos brutos
                └── run-001-metadata.json  # Metadata
```

### Procesamiento con Agente Jurídico

```bash
# El agente jurídico especializado puede:
# 1. Analizar estructura organizacional
# 2. Identificar directivos clave
# 3. Evaluar expertise del equipo
# 4. Correlacionar con jurisprudencia
# 5. Generar reporte ejecutivo
```

---

## ⚖️ Consideraciones Legales

### ⚠️ ADVERTENCIA CRÍTICA

**LinkedIn NO autoriza web scraping en sus términos de servicio.**

**Antes de usar, verificar:**

1. **Términos de Servicio de LinkedIn**
   - Sección 8.2: "Prohibición de scraping"
   - No autoriza extracción no autorizada de datos

2. **Leyes de Protección de Datos**
   - **GDPR** (UE): Requiere consentimiento explícito
   - **CCPA** (California): Derechos de privacidad
   - **LGPD** (Brasil): Protección de datos
   - **LSSI-CE** (España): Regulación de cookies

3. **Uso Ético**
   - ✅ Investigación jurídica autorizada
   - ✅ Due diligence en M&A
   - ✅ Análisis académico
   - ❌ Spam/phishing
   - ❌ Venta de datos
   - ❌ Extracción masiva no autorizada

### Recomendaciones

```
1. Obtener consentimiento del cliente
2. Documentar propósito legal
3. Cumplir con leyes locales
4. Usar solo para caso específico
5. Mantener seguridad de datos
6. Considerar alternativas legales (API oficial, directorios)
```

---

## 🔧 Troubleshooting

### Problema: "LinkedIn is blocking requests"

```
Causa: Detectado como bot
Solución:
1. Usar proxy de Apify (useApifyProxy: true)
2. Reducir maxConcurrency a 1
3. Aumentar retries a 5+
4. Esperar antes de reintentar
```

### Problema: "No employees found"

```
Causa: URL incorrecta o empresa con perfil privado
Solución:
1. Verificar formato: https://www.linkedin.com/company/SLUG
2. Verificar que empresa tiene empleados públicos
3. Probar con empresa conocida primero
```

### Problema: "Proxy error"

```
Causa: Problema con proxy de Apify
Solución:
1. Verificar token de Apify válido
2. Verificar cuota disponible
3. Revisar logs en Apify Console
4. Contactar soporte de Apify
```

### Problema: "Timeout"

```
Causa: Extracción toma demasiado tiempo
Solución:
1. Reducir maxRequests
2. Aumentar timeout en configuracion
3. Usar maxConcurrency: 1
4. Dividir en múltiples ejecuciones
```

---

## 📋 Checklist de Implementación

- [ ] Actor registrado en Apify
- [ ] Actor ID obtenido y documentado
- [ ] Parámetros configurados
- [ ] Verificación legal completada
- [ ] Consentimiento del cliente obtenido
- [ ] Política de privacidad cumple con GDPR/CCPA
- [ ] Proxy de Apify habilitado
- [ ] Primera prueba exitosa
- [ ] Datos almacenados correctamente
- [ ] Agente jurídico procesa datos
- [ ] Reporte generado
- [ ] Auditoría registrada

---

## 📞 Recursos

| Recurso | URL |
|---------|-----|
| Repositorio | https://github.com/tuhinmallick/apify-linkedin-company-employees |
| Apify Marketplace | https://apify.com/marketplace |
| Apify Docs | https://docs.apify.com/platform |
| LinkedIn Terms | https://www.linkedin.com/legal/user-agreement |
| GDPR Info | https://gdpr-info.eu |

---

## ✅ Siguiente Paso

Después de implementar este actor:

1. Integrar con agente jurídico especializado
2. Crear templates para casos de uso comunes
3. Desarrollar reportes automatizados
4. Establecer políticas de gobernanza de datos

---

**Estado:** Listo para Implementación  
**Versión:** 1.0  
**Última Actualización:** 2026-09-21

⚠️ **RECUERDA:** Usar solo con autorización legal y consentimiento del cliente.
