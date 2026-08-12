# JAC Legal Audit — Sistema de Auditoría Jurídica Automática

## 🏛️ Auditoría Legal + IA para Colombia

> **Dos puntuaciones independientes, nunca mezcladas.**  
> Un caso puede ser legal conforme el derecho civil pero incumplir obligaciones laborales.  
> **JAC Legal Audit** mide ambas dimensiones y te dice exactamente qué arreglar.

---

## 📋 ¿Qué es?

Sistema automático de auditoría jurídica para casos colombianos que analiza:
- **Solidez Legal** — vulnerabilidades normativas, jurisprudencia contraria, procedimiento
- **Estrategia de Defensa** — contramedicinas, argumentos del adversario, riesgos reales
- **Probabilidad de Éxito** — basada en jurisprudencia de Cortes colombianas

### Características
- ✅ **10 Agentes Especializados** por rama del derecho
- ✅ **Cero Alucinaciones** — verifica contra fuentes oficiales colombianas
- ✅ **Análisis en Paralelo** — auditoría completa en minutos
- ✅ **Recomendaciones Ejecutables** — qué cambiar, cómo cambiarlo
- ✅ **Integración GAL** — loops automáticos diarios + webhooks
- ✅ **6 Ramas del Derecho:** Civil, Laboral, Penal, Administrativa, Comercial, Corporativo

---

## 🚀 Instalación Rápida

### Como Plugin Claude Code
```bash
/plugin marketplace add jorgecortes1975/jac-legal-audit
/plugin install jac-legal-audit
/reload-plugins
```

### Local (Node.js)
```bash
cd /home/user/jacabogados/claude-jac-legal-audit
npm install
npm run setup
```

### Integración con GAL (Sistema Completo)
```bash
node /home/user/jacabogados/gal-automatizacion.js evento auditar-caso
```

---

## 💻 Comandos Disponibles

### Auditoría Legal Completa
```bash
/jac-legal-audit:audit <archivo-demanda.md> [--rama civil|laboral|penal|administrativa|comercial|corporativo]
```

**Retorna:**
- Puntuación de solidez legal (0-100)
- Puntuación de defensa estratégica (0-100)
- Hallazgos por categoría con jurisprudencia
- Probabilidad de éxito estimada
- Recomendaciones accionables

### Análisis Normativo Rápido
```bash
/jac-legal-audit:normativa <texto-consulta>
```

### Análisis de Jurisprudencia
```bash
/jac-legal-audit:jurisprudencia <pregunta-legal>
```

### Puntuación Actual
```bash
/jac-legal-audit:score
```

### Aplicar Mejoras (Dry-Run)
```bash
/jac-legal-audit:fix <archivo.md> [--categoria norma|estrategia|formato] [--dry-run]
```

---

## 📊 Dos Puntuaciones Independientes

**Solidez Legal:** Fundamentación normativa (0-100)  
**Estrategia de Defensa:** Defensa ante argumentos adversarios (0-100)

Bandas: A (90-100), B (80-89), C (70-79), D (60-69), E (50-59), F (0-49)

---

## 🏗️ Arquitectura

Orquestador JAC → 10 Agentes Especializados en Paralelo → Reporte Integrado

---

## 🔗 Integración GAL

```bash
node /home/user/jacabogados/gal-automatizacion.js evento auditar-caso
```

Resultados en: `/outputs/auditorias/` y `/logs/auditorias.log`

---

## 📚 Verificación Automática

✓ SUIN, Corte Constitucional, Corte Suprema, Consejo de Estado  
✓ Código Civil, Penal, Comercio, CST (Código Sustantivo del Trabajo)  
✓ Jurisprudencia actualizada 2020-2026  
✓ Cero alucinaciones — solo fuentes oficiales verificadas

---

## 🛠️ Requisitos

- Node.js 16+
- Claude Code o Claude API
- 2GB espacio (bases legales precompiladas)

---

**JAC Legal Audit v2.0** — Auditoría inteligente, verificada, lista para producción.
