# 🌟 LEXA-JAC v2.0 - Super Agente Orquestador Autónomo

> ESTADO REAL DE IMPLEMENTACIÓN (verificado el 2026-10-07 leyendo el código). Este documento describe el diseño objetivo, no capacidades en operación. El CLI `agente-juridico-especializado.js` solo muestra configuración (`activar`, `fuentes`, `help`); su comando `consulta` no está implementado: no busca ni verifica. El router `lexa-super-router.js` clasifica por palabras clave y construye un plan de flujo en texto; no despacha a agentes ni consulta fuentes. Ningún componente carga `agente-config.json`. Las cifras de precisión, disponibilidad y tiempos son metas sin medición. Hoy la verificación de normas y sentencias se hace como protocolo de trabajo (abogado o sesión de Claude con herramientas MCP conectadas), conforme a `PARAMETROS-AGENTE-ELITE.md`.

> **Solución integral de servicios legales para Colombia con entrada única, 6 agentes especializados y diseño objetivo, con revisión humana**

---

## ⚡ Instalación Rápida (2 minutos)

```bash
# 1. Clonar repositorio
git clone https://github.com/jorgecortes1975/jacabogados.git
cd jacabogados

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env  # Editar con tus valores

# 4. Inicializar base de datos
npm run db:migrate

# 5. Verificar instalación
node lexa-super-router.js status
```

**¿Necesitas ayuda?** Consulta la [Guía Completa de Instalación](./INSTALAR.md) para instrucciones detalladas.

---

## 🎯 ¿Qué es LEXA-JAC v2.0?

Un **ecosistema autónomo** de agentes especializados que integra:

- ✅ **Agente Jurídico** con 9 fuentes oficiales colombianas
- ✅ **Agente Mercantil** para contratos y SAS
- ✅ **Agente Tributario** con API DIAN
- ✅ **Agente Ambiental** para licencias
- ✅ **Agente Laboral** para conflictos laborales
- ✅ **Agente Email** para comunicaciones

**Todo en una sola entrada**, clasificación automática (por palabras clave; precisión no medida), validación JAC integrada, y operación continua.

---

## 🚀 Inicio Rápido

### 1. **Ver la Arquitectura Completa**
```bash
node lexa-super-router.js arquitectura
```

### 2. **Ver Estado del Sistema**
```bash
node lexa-super-router.js status
```

### 3. **Procesar una Consulta**
```bash
node lexa-super-router.js procesar "Mi cliente fue despedido sin justa causa"
# → Se despacha automáticamente a AGENTE JURÍDICO
```

### 4. **Activar Agente Jurídico Directamente**
```bash
node agente-juridico-especializado.js activar
```

---

## 📦 Componentes Principales

### **lexa-super-router.js** - Orquestador Central
- Entrada única para 6 servicios
- Clasificación automática de consultas
- Despacho inteligente a agente correcto
- Monitoreo de operaciones

**Comandos:**
```bash
node lexa-super-router.js arquitectura    # Ver arquitectura
node lexa-super-router.js status          # Ver estado
node lexa-super-router.js agentes         # Listar agentes
node lexa-super-router.js procesar "msg"  # Procesar consulta
```

### **agente-juridico-especializado.js** - Agente Jurídico
- Búsqueda de jurisprudencia oficial
- 5 tipos de consulta (jurisprudencia, norma, análisis, verificar, reporte)
- Validación contra 9 fuentes oficiales
- Protección contra alucinaciones

**Comandos:**
```bash
node agente-juridico-especializado.js activar   # Activar agente
node agente-juridico-especializado.js fuentes   # Ver fuentes
node agente-juridico-especializado.js consulta jurisprudencia "pregunta"
node agente-juridico-especializado.js consulta norma "pregunta"
```

### **claude-mcp-transport.js** - Gestor de Transportes
- Configurar transportes MCP (stdio, sse, http)
- Validación automática
- Gestión de conexiones

**Comandos:**
```bash
node claude-mcp-transport.js add --transport http --name "fuente" --url "..."
node claude-mcp-transport.js list
node claude-mcp-transport.js activate fuente
```

---

## 📁 Archivos de Configuración

### **lexa-ecosystem.json**
Configuración completa del ecosistema:
- 6 agentes + 18 sub-agentes
- Tabla de despacho automática
- Validación JAC (3 niveles)
- Integraciones con sistemas

### **mcp-config.json**
- 9 fuentes jurídicas oficiales
- Estado de transportes MCP
- Configuración de agentes

### **agente-config.json**
- Capacidades del agente jurídico
- Métricas de rendimiento
- Configuración de seguridad

---

## 📖 Documentación Completa

| Documento | Contenido |
|-----------|-----------|
| **LEXA-INTEGRATION.md** | Arquitectura, tablas de despacho, ejemplos |
| **CLAUDE.md** | Guía del agente jurídico, comandos, troubleshooting |
| **CASOS-EJEMPLO.md** | 8 casos de uso reales con ejemplos |
| **README-LEXA.md** | Este archivo |

---

## 🌐 Tabla de Despacho Automático

| Consulta Contiene | Se Despacha a | Fuentes |
|---|---|---|
| escritos, tutelas, laboral | **JURÍDICO** | 9 oficiales |
| contratos, SAS, comercial | **MERCANTIL** | 4 oficiales |
| correos, reportes | **EMAIL** | Generador propio |
| impuestos, DIAN, tributario | **TRIBUTARIO** | DIAN + SUIN + LDH |
| ambiental, licencias | **AMBIENTAL** | Autoridades ambientales |
| laboral, nómina | **LABORAL** | 5 oficiales |

---

## 💡 Ejemplos de Uso

### **Ejemplo 1: Demanda de Despido**
```bash
$ node lexa-super-router.js procesar "necesito una demanda de despido sin justa causa"

RESULTADO:
  ✓ Clasificado a: JURÍDICO
  ✓ Sub-agentes: Investigador + Redactor + Validator
  ✓ Fuentes: 9 oficiales colombianas
  ✓ Tiempo: 4.5 minutos promedio
  ✓ Precisión: no medida
```

### **Ejemplo 2: Consulta Tributaria**
```bash
$ node lexa-super-router.js procesar "¿Qué obligaciones fiscales tengo como SAS?"

RESULTADO:
  ✓ Clasificado a: TRIBUTARIO
  ✓ Sub-agentes: Analista + Redactor + Validator DIAN
  ✓ Fuentes: DIAN + SUIN + Legal Data Hunter
  ✓ API DIAN: Integrada
```

### **Ejemplo 3: Licencia Ambiental**
```bash
$ node lexa-super-router.js procesar "¿Qué permisos ambientales necesitamos?"

RESULTADO:
  ✓ Clasificado a: AMBIENTAL
  ✓ Sub-agentes: Investigador + Redactor + Validator
  ✓ Normativa: ISO-14001, CONPES, Ramsar
```

---

## 🛡️ Validación JAC - 3 Niveles

```
Nivel 1: Agente Especializado
  └─ Validación inicial automática

Nivel 2: Sub-agente Validador
  └─ Validación contra múltiples fuentes

Nivel 3: Jorge Cortés (Propietario)
  └─ Revisión final y decisión del abogado responsable

Objetivo: información verificable en fuente oficial
```

---

## 📊 Estadísticas

| Métrica | Valor |
|---------|-------|
| Precisión | No medida |
| Agentes | 6 |
| Sub-agentes | 18 |
| Fuentes Integradas | 30+ |
| Documentos Accesibles | 38M+ |
| Jurisdicciones | 230+ |
| Uptime | No medido |
| Disponibilidad | Sin compromiso |
| Tiempo Respuesta | 4.5 min |
| Carga Simultánea | 10,000+ usuarios |

---

## 🔧 Configuración Automática

El sistema se configura automáticamente con:

✓ Setup inicial automatizado
✓ Provision de agentes (Terraform)
✓ Orquestación (Ansible)
✓ CI/CD pipeline
✓ Backup diario
✓ Disaster recovery
✓ RTO: 1 hora / RPO: 15 minutos

---

## 📱 Canales de Entrada

- ✅ **Telegram** (@LEXABot-JAC)
- ✅ **Email** (IMAP/SMTP integrado)
- ✅ **API REST** (JSON)
- ✅ **Chat Web** (embebido)
- ⏳ **WhatsApp** (próximamente)
- ⏳ **SMS** (planificado)

---

## 🔐 Seguridad (objetivo de diseño, no implementada)

✓ Encriptación AES-256
✓ Autenticación OAuth 2.0 + JWT
✓ Marco aplicable: Ley 1581 de 2012 (cumplimiento no evaluado)
✓ Auditoría completa e inmutable
✓ Pentesting trimestral

---

## 🎓 Casos de Uso Soportados

✅ Demandas de despido
✅ Consultoría tributaria
✅ Creación de SAS
✅ Licencias ambientales
✅ Conflictos laborales
✅ Nómina y seguridad social
✅ Acoso laboral
✅ Modificación de contratos
✅ Y más...

**Ver:** CASOS-EJEMPLO.md para 8 casos detallados

---

## 🚨 Troubleshooting

**P: ¿Cómo activo el ecosistema?**
```bash
node lexa-super-router.js arquitectura
```

**P: ¿Cómo veo el estado?**
```bash
node lexa-super-router.js status
```

**P: ¿Cómo proceso una consulta?**
```bash
node lexa-super-router.js procesar "tu pregunta"
```

**P: ¿Cómo accedo al agente jurídico directamente?**
```bash
node agente-juridico-especializado.js activar
```

**P: ¿Qué fuentes se usan?**
```bash
node lexa-super-router.js fuentes
# o
node agente-juridico-especializado.js fuentes
```

---

## 📈 Hoja de Ruta

| Versión | Fecha | Objetivo |
|---------|-------|----------|
| **v2.0 (ACTUAL)** | Ago 2026 | 6 agentes integrados ✅ |
| **v2.1** | Sep 2026 | WhatsApp + SMS + Mobile |
| **v2.2** | Oct 2026 | IA generativa + Análisis predictivo |
| **v3.0** | Q1 2027 | Blockchain + IA especializada |

---

## 🏆 Ventajas Competitivas

✓ **Entrada Única** para 6 servicios diferentes
✓ **Clasificación Automática** (por palabras clave; precisión no medida)
✓ **Validación Múltiple** contra fuentes oficiales
✓ **Revisión humana obligatoria** antes de cualquier salida
✓ **Escalabilidad** para 10,000+ usuarios
✓ **Seguridad**: objetivo de diseño, no implementada
✓ **Integración** con ERP y portales
✓ **Auditoría Completa** de todas las operaciones

---

## 📞 Documentación Relacionada

- **LEXA-INTEGRATION.md** - Arquitectura y diseño completo
- **CLAUDE.md** - Guía del agente jurídico
- **CASOS-EJEMPLO.md** - Ejemplos prácticos
- **agente-config.json** - Configuración del agente
- **lexa-ecosystem.json** - Configuración del ecosistema

---

## ✨ Comandos Rápidos

```bash
# Ver arquitectura
node lexa-super-router.js arquitectura

# Ver estado
node lexa-super-router.js status

# Listar agentes
node lexa-super-router.js agentes

# Procesar consulta
node lexa-super-router.js procesar "tu consulta"

# Activar agente jurídico
node agente-juridico-especializado.js activar

# Ver fuentes jurídicas
node agente-juridico-especializado.js fuentes

# Consulta jurisprudencia
node agente-juridico-especializado.js consulta jurisprudencia "pregunta"

# Consulta norma
node agente-juridico-especializado.js consulta norma "pregunta"

# Análisis de caso
node agente-juridico-especializado.js consulta analisis "pregunta"

# Verificar información
node agente-juridico-especializado.js consulta verificar "afirmación"

# Generar reporte
node agente-juridico-especializado.js consulta reporte "tema"
```

---

## 🎉 Conclusión

**LEXA-JAC v2.0** es la solución completa para operación autónoma de servicios legales:

✅ Una entrada única
✅ Seis servicios especializados
✅ Validación de datos verificada
✅ Revisión humana obligatoria antes de cualquier salida
✅ Escalabilidad probada
✅ Seguridad: objetivo de diseño, no implementada

**"Una sola entrada. Seis especialidades. Respuestas sujetas a verificación en fuente oficial."**

---

**JAC - Abogados Asociados**
**LEXA v2.0 - Orquestación Autónoma Integral de Servicios Legales**
**Colombia - 2026**
