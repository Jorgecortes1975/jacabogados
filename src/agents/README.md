# JAC - Agentes de Automatización Jurídica Corporativa

Agentes autónomos de prospección, intake y análisis forense para automatizar captación y gestión de clientes corporativos.

## 🚀 Inicio Rápido

### Activar Social Listening (Fase 1)

Monitorea X, Facebook, Instagram, TikTok en busca de contingencias corporativas.

```bash
node src/agents/social-listening-agent.js
```

**Output esperado:**
- Detecciones de contingencias clasificadas por riesgo (alto/medio/bajo)
- Validación multi-fuente (SUIN, Diario Oficial, jurisprudencia)
- Ganchos técnicos generados (sin lenguaje comercial)
- Auditoría inmutable de cada paso

### Activar Intake Inteligente (Fase 2)

Procesa consultas WhatsApp/formulario web con validación de conflictos y triaje operativo.

```bash
node src/agents/intake-agent.js
```

**Output esperado:**
- Captura automática de datos
- Validación de conflicto de interés (escalada si falta certeza)
- Categorización en Prioridad Alta / Corporativo / Filtrado
- Respuesta automática profesional

---

## 🔧 Configuración

Todos los agentes operan con:

- **Modelo**: Claude Opus 5 (máxima precisión)
- **Temperatura**: 0.2 (énfasis en exactitud, no creatividad)
- **Fuentes de Datos**: 9 fuentes oficiales colombianas (SUIN, Diario Oficial, Cortes, DIAN, Superintendencia)
- **Auditoría**: Inmutable, 24/7

Ver `config.json` para detalles completos.

---

## 📋 Fases de Automatización (Roadmap)

| Fase | Agente | Estado | Descripción |
|------|--------|--------|-------------|
| **1** | Social Listening | ✅ Activo | Detección de contingencias en redes + ganchos técnicos |
| **2** | Intake Inteligente | ✅ Activo | Validación conflictos + triaje operativo |
| **3** | Dossier Ejecutivo | 📋 Planeado | Extrae calendario → genera perfiles + vulnerabilidades sector |
| **4** | Análisis Forense | 📋 Planeado | Procesa nóminas/contratos → matrices contingencia → reportes |

---

## ⚠️ Restricciones Operacionales

Estos agentes operan bajo estrictas salvaguardas éticas y deontológicas:

### 1. Sin Alucinaciones (Constitución I)
- Cero datos jurídicos inventados
- 100% verificables contra 9 fuentes oficiales
- Si no se puede verificar, el agente lo dice explícitamente

### 2. Verificación Multi-Fuente (Constitución II)
- Contingencias validadas contra MÍNIMO 2 fuentes
- Dossier usa SOLO datos públicos verificables
- Auditoría de cada validación

### 3. Secreto Profesional Inviolable (RF-011)
- Cero compartición de datos de cliente en canales públicos
- Documentos sensibles → correo corporativo + NDA
- Detección automática de información confidencial

### 4. Triaje Obligatorio con Human-in-the-Loop (RF-009)
- Conflictos de interés → Escalada manual a abogado senior
- Ganchos técnicos → Revisión manual antes de publicar
- Dossiers → Validación abogado antes de reunión
- Análisis forense → Aprobación abogado antes de entregar

### 5. Auditoría Inmutable (RF-010)
- Cada detección, validación, gancho, DM, respuesta queda registrado
- Timestamp, actor, datos procesados
- No se pueden borrar entradas (inmutable)

---

## 📊 Métricas Esperadas

### Social Listening (Fase 1)
- Precisión de detección: ≥90%
- Tasa de engagement en ganchos: ≥8%
- Tasa de conversión (gancho → DM → correo): ≥40%
- Tiempo latencia: <5min (detección → gancho publicado)

### Intake Inteligente (Fase 2)
- Tiempo de respuesta: <30s
- Precisión de detección de conflictos: ≥95%
- Tasa de escalada manual: <5%
- Satisfacción de cliente (respuesta profesional): ≥4/5

---

## 🔐 Modelos de Honorarios

Los agentes ajustan triaje y seguimiento según modalidad de pago:

### Cuota Fija
- Proyectos corporativos con alcance definido
- Asesoría contractual, estructura empresarial, blindaje patrimonial

### Cuota Liti (Contingencia)
- Litigio comercial (cliente paga % de recuperación si gana)
- Agente calcula exposición y semaforiza riesgos

### Retainer (Mensual)
- Asesoría corporativa continua
- Cliente tiene prioridad en intake y dossier

---

## 🛠️ Dependencias

```json
{
  "dependencies": {
    "@anthropic-ai/sdk": "^0.24.0"
  },
  "devDependencies": {
    "node": "^18.0.0"
  }
}
```

Instalar:
```bash
npm install
```

---

## 📝 Variables de Entorno

```bash
# .env
ANTHROPIC_API_KEY=sk-ant-...
JAC_ENV=production
JAC_AUDIT_LOG_PATH=/var/log/jac-audit/
```

---

## 🚨 Troubleshooting

**Error: "API key not found"**
```bash
export ANTHROPIC_API_KEY=tu_clave_aqui
```

**Error: "Social Listening no detecta publicaciones"**
- En desarrollo, usa datos simulados (archivo)
- En producción, conecta APIs reales de X, Meta, TikTok

**Error: "Intake no valida conflictos"**
- Verifica que la base de contrapartes esté poblada
- En producción, apunta a PostgreSQL en lugar de array simulado

---

## 📞 Soporte

Rama de desarrollo: `claude/social-listening-legal-agents-6031yv`
Equipo responsable: Jorge Cortés (socio), 4 especialistas corporativos

---

**JAC - Abogados Asociados | Automatización Jurídica Corporativa**
**v1.0.0 | 2026-09-09**
