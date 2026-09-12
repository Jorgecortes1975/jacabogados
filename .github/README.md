# 📦 Configuración y Automatización - JAC Skills Program

> **Infraestructura de CI/CD, testing y auditoría para el Programa de Skills del Agente Jurídico JAC**

---

## 📂 Contenido de Este Directorio

```
.github/
├── workflows/                      # Flujos de GitHub Actions
│   ├── tests-and-audit.yml        # Tests + auditoría de sentencias (cada push/PR)
│   ├── code-quality.yml           # Validación de estructura (cada push/PR)
│   └── audit-monitoring.yml       # Monitoreo semanal automático
│
├── INTEGRATION-OVERVIEW.md         # Visión completa del sistema
├── CI-CD-SETUP.md                  # Documentación técnica de workflows
├── README.md                        # Este archivo
└── [Más archivos futuros]          # Plantillas de PR, issue templates, etc.
```

---

## 🚀 Inicio Rápido

### Para Desarrolladores

```bash
# 1. Haz cambios en rama feature
git checkout -b claude/nueva-funcionalidad

# 2. Escribe tests localmente
npm run test:coverage

# 3. Ejecuta auditoría
npm run audit:sentencias

# 4. Si pasa, push
git push -u origin claude/nueva-funcionalidad

# 5. Abre PR en GitHub
#    → Los workflows se ejecutan automáticamente
#    → Aparecen comentarios con resultados
```

### Para Revisores

1. Ver comentarios de CI/CD
2. Revisar código
3. Aprobar
4. Mergear

---

## 🔄 Workflows Disponibles

### 1. **Tests y Auditoría** (`tests-and-audit.yml`)
**Cuándo**: Cada push y PR
**Qué hace**:
- ✅ Tests unitarios con coverage
- ✅ Auditoría anti-alucinaciones
- ✅ Validación de coverage (≥70%)
- ✅ Comentarios en PRs
- ✅ Fail si hay alucinaciones

**Status en PR**: `Tests y Auditoría de Sentencias`

---

### 2. **Validación de Código** (`code-quality.yml`)
**Cuándo**: Cada push y PR
**Qué valida**:
- ✅ Estructura de `package.json`
- ✅ Documentación de skills
- ✅ Validez de YAML
- ✅ Referencia a fuentes oficiales

**Status en PR**: `Validación de Calidad de Código`

---

### 3. **Monitoreo Semanal** (`audit-monitoring.yml`)
**Cuándo**: Cada domingo 00:00 UTC
**Qué hace**:
- ✅ Auditoría completa
- ✅ Genera reporte
- ✅ Crea issues si hay fallos
- ✅ Comenta en PRs abiertos
- ✅ Guarda artefactos

**Acceso**: [Actions](https://github.com/jorgecortes1975/jacabogados/actions)

---

## 📊 Métricas y Umbrales

| Métrica | Mínimo | Status |
|---------|--------|--------|
| Coverage Total | 70% | 🔴 Bloqueante |
| Statements | 70% | 🔴 Bloqueante |
| Branches | 70% | 🔴 Bloqueante |
| Functions | 70% | 🔴 Bloqueante |
| Lines | 70% | 🔴 Bloqueante |
| Alucinaciones | 0 | 🔴 Bloqueante |
| Sentencias Válidas | 96% | 🟡 Target |

---

## 📝 Cómo Interpretar Resultados

### En una PR

```markdown
✅ Tests y Auditoría de Sentencias — All checks passed
```
Significa: Tests ✅ + Coverage ≥70% ✅ + 0 alucinaciones ✅

```markdown
❌ Tests y Auditoría de Sentencias — Tests failed
```
Significa: Hay fallos en tests o coverage bajo

```markdown
❌ Validación de Calidad de Código — Some checks failed
```
Significa: Hay problemas de estructura o formato

---

## 🔧 Configuración Recomendada en GitHub

### Branch Protection Rules (para `main`)

```yaml
Require status checks to pass:
✅ Tests y Auditoría de Sentencias
✅ Validación de Calidad de Código

Require code reviews: 1
```

---

## 📚 Documentación Completa

| Documento | Descripción |
|-----------|------------|
| **INTEGRATION-OVERVIEW.md** | Visión completa del sistema integrado |
| **CI-CD-SETUP.md** | Detalles técnicos de workflows |
| **../tests/README.md** | Guía de testing |
| **../AUDITORÍA-SENTENCIAS.md** | Reporte de auditoría |
| **../skills-program/README.md** | Guía de skills |
| **../CLAUDE.md** | Instrucciones maestras |

---

## 🐛 Troubleshooting

### Tests fallan pero pasan localmente

```bash
# Reproducir ambiente CI
NODE_ENV=test npm ci
npm run test
```

### Coverage bajo

```bash
# Ver qué no está cubierto
npm run test:coverage
open coverage/index.html
```

### Auditoría detecta alucinaciones

Ver `tests/audit/sentencias-audit.js` para reglas de validación.

---

## 🔗 Enlaces Útiles

- [GitHub Actions en este repo](https://github.com/jorgecortes1975/jacabogados/actions)
- [PRs abiertas](https://github.com/jorgecortes1975/jacabogados/pulls)
- [Issues](https://github.com/jorgecortes1975/jacabogados/issues)

---

## 📊 Estado Actual

| Componente | Estado | PR | Status |
|-----------|--------|----|---------| 
| **Skills Program** | ✅ Completo | #23 | En review |
| **Tests & Audit** | ✅ Completo | #24 | En review |
| **CI/CD** | ✅ Completo | #23 | En review |

---

## 🚀 Próximas Mejoras Planeadas

- [ ] Codecov integration
- [ ] Slack notifications
- [ ] 500+ sentences audit
- [ ] Real API connections
- [ ] Performance benchmarks
- [ ] Automated releases

---

**GitHub Workflows | Versión 1.0 | JAC - Abogados Asociados**

Última actualización: 2026-09-12
