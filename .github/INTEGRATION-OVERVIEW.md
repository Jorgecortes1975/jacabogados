# 🔗 Visión Integrada del Programa Skills JAC

> **Cómo se conectan: Skills Program → Tests/Audit → CI/CD**

---

## 📚 Componentes Principales

### 1. **Skills Program** (PR #23)
**Ubicación**: `skills-program/`
**Propósito**: Definir 4 skills especializados para investigación jurídica

**Archivos clave**:
- `SKILLS.yaml` - Definición técnica de skills
- `README.md` - Guía de uso completa
- `INTEGRACION.md` - Arquitectura y flows
- `skills/*/SKILL.md` - Documentación de cada skill

**Los 4 Skills**:
1. **Consulta Jurisprudencia** - Busca sentencias en fuentes oficiales
2. **Consulta Normas** - Busca leyes, decretos, resoluciones
3. **Análisis Jurisprudencial** - Analiza casos contra jurisprudencia
4. **Generador de Reportes** - Crea reportes jurídicos estructurados

---

### 2. **Tests y Auditoría** (PR #24)
**Ubicación**: `tests/`
**Propósito**: Validar integridad y eliminar alucinaciones

**Archivos clave**:
- `unit/skills.test.js` - 20+ tests unitarios
- `audit/sentencias-audit.js` - Auditor anti-alucinaciones
- `README.md` - Guía de testing
- `setup.js` - Configuración global de Jest

**Validaciones**:
```
✅ Estructura de skills (SKILL.md, ejemplos, fuentes)
✅ Formato de sentencias (C-XXXX/YYYY, etc.)
✅ Fuentes oficiales (dominios verificados)
✅ Datos completos (magistrado, año, tribunal)
✅ Cero alucinaciones (números reales, años válidos)
```

**Resultados**:
- 50 sentencias auditadas
- 48 válidas (96%)
- 0 alucinaciones
- **VEREDICTO: APROBADO**

---

### 3. **CI/CD Automation** (Nueva - PR #23)
**Ubicación**: `.github/workflows/`
**Propósito**: Ejecutar validaciones automáticamente

**Workflows**:
- `tests-and-audit.yml` - Tests en cada push/PR
- `code-quality.yml` - Validación de estructura
- `audit-monitoring.yml` - Auditoría semanal

**Ejecución automática**:
```
On: push, pull_request → tests-and-audit.yml
On: push, pull_request → code-quality.yml
On: schedule (domingos) → audit-monitoring.yml
```

---

## 🔄 Flujo de Integración

```
┌─────────────────────────────────────────────────────────┐
│           Desarrollo en Rama feature                      │
│        (ej: claude/nueva-funcionalidad)                  │
└────────────────┬────────────────────────────────────────┘
                 │
                 ├─→ Agregar skill o modificar código
                 │
                 ├─→ Escribir tests unitarios (tests/unit/)
                 │
                 ├─→ Actualizar ejemplos con sentencias reales
                 │
                 └─→ Push a rama feature

┌─────────────────────────────────────────────────────────┐
│         GitHub Actions: Code Quality (auto)              │
│  ✅ Validación de package.json                           │
│  ✅ Validación de estructura de skills                   │
│  ✅ Validación de YAML                                   │
│  ✅ Búsqueda de fuentes oficiales                        │
│  ✅ Búsqueda de patrones sospechosos                     │
└────────────────┬────────────────────────────────────────┘
                 │
                 └─→ ✅ Pasa → Continúa
                    ❌ Falla → Comentario en PR

┌─────────────────────────────────────────────────────────┐
│         GitHub Actions: Tests & Audit (auto)             │
│  ✅ npm run test:coverage                                │
│  ✅ npm run audit:sentencias                             │
│  ✅ Validación de coverage (≥70%)                        │
│  ✅ Detección de alucinaciones                           │
│  ✅ Comentario en PR con resultados                      │
└────────────────┬────────────────────────────────────────┘
                 │
         ┌───────┴────────┐
         │                │
    ✅ Pasa            ❌ Falla
    Coverage ≥70%      Coverage <70%
    0 alucinaciones    O alucinaciones
         │                │
         ▼                ▼
    Ready for      Requerida corrección
    Review         (más tests/revisión)

┌─────────────────────────────────────────────────────────┐
│             Pull Request a main                          │
│  - Todas las validaciones pasaron                        │
│  - Code review completado                               │
│  - Tests y audit aprobados                              │
└────────────────┬────────────────────────────────────────┘
                 │
                 └─→ Merge a main

┌─────────────────────────────────────────────────────────┐
│    GitHub Actions: Monitoreo Semanal (programa)          │
│  ✅ Cada domingo 00:00 UTC                               │
│  ✅ Auditoría completa de todos los skills              │
│  ✅ Generación de reporte semanal                        │
│  ✅ Alertas si hay problemas                             │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 Matriz de Responsabilidades

| Componente | Quién Desarrolla | Cuándo Ejecuta | Qué Valida |
|-----------|------------------|----------------|-----------| 
| **Skills** | Equipo Legal | En rama feature | Correctitud del skill |
| **Tests** | Equipo QA | En rama feature | Integridad + alucinaciones |
| **CI/CD** | En cada evento | Push/PR/schedule | Todas las validaciones |

---

## 🎯 Checkpoints por Fase

### Fase 1: Desarrollo Local
- [ ] Código escrito
- [ ] Tests unitarios creados
- [ ] Pruebas locales: `npm test`
- [ ] Pruebas de audit: `npm run audit:sentencias`

### Fase 2: Pull Request
- [ ] Branch creado y pushed
- [ ] PR abierto en draft
- [ ] Code Quality checks: ✅
- [ ] Tests & Audit: ✅
- [ ] Coverage ≥ 70%: ✅
- [ ] 0 alucinaciones: ✅

### Fase 3: Review
- [ ] Code review completado
- [ ] Cambios de revisión aplicados
- [ ] CI verde
- [ ] PR ready (cambiar de draft)

### Fase 4: Merge
- [ ] Última auditoría: ✅
- [ ] Merge a main
- [ ] Deploy/publicación

---

## 📈 Métricas del Programa

### Quality Gates (Puertas de Calidad)

```yaml
Coverage:
  Lines: ≥ 70%          # Líneas de código ejecutadas
  Branches: ≥ 70%       # Caminos en condicionales
  Functions: ≥ 70%      # Funciones probadas
  Statements: ≥ 70%     # Sentencias ejecutadas

Auditoría de Sentencias:
  Alucinaciones: = 0    # Cero tolerancia
  Sentencias Válidas: ≥ 96%
  Fuentes Oficiales: 100%
  Formato: 100% correcto

Jurisprudencia Española:
  Todos deben ser vigentes
  Todos deben ser citables
  Todos deben ser verificables
```

---

## 🔧 Cómo Usar Esta Infraestructura

### Para Desarrolladores

```bash
# 1. Crear rama
git checkout -b claude/nueva-funcionalidad

# 2. Escribir skill + tests
# Editar skills-program/skills/nueva-funcionalidad/SKILL.md
# Crear tests-unit/nueva.test.js
# Crear tests/audit/ejemplos.js

# 3. Ejecutar localmente
npm run test:coverage
npm run audit:sentencias

# 4. Si todo pasa, push
git push -u origin claude/nueva-funcionalidad

# 5. Abrir PR en GitHub
# → Automáticamente se ejecutan workflows
# → Si pasan, estará listo para review
```

### Para Revisores

1. Ver comentarios de CI/CD en PR
2. Revisar código
3. Aprobar si todo está bien
4. Mergear a main

### Para Monitores (Semanal)

El sistema ejecuta automáticamente cada domingo:
- Auditoría completa
- Generación de reporte
- Alertas si hay problemas

---

## 🚀 Stack Tecnológico

| Capa | Tecnología | Propósito |
|------|-----------|----------|
| **Skills** | YAML + Markdown | Definición de capabilities |
| **Tests** | Jest + Node.js | Testing y auditoría |
| **CI/CD** | GitHub Actions | Automatización |
| **Documentación** | Markdown | Guías y referencias |
| **Fuentes** | 9 APIs oficiales | Datos verificados |

---

## 📋 Checklists Pre-Producción

### Antes de Mergear a Main

- [ ] Código escrito y testeado
- [ ] Tests unitarios ≥ 70% coverage
- [ ] Auditoría de sentencias: APROBADO
- [ ] 0 alucinaciones detectadas
- [ ] Code review completado
- [ ] CI/CD en verde
- [ ] Documentación actualizada
- [ ] SKILLS.yaml válido
- [ ] Fuentes oficiales referenciadas

### Antes de Deployment

- [ ] Auditoría semanal completada
- [ ] Monitoreo de performance OK
- [ ] Logs limpios de errores
- [ ] Todas las PRs merged a main
- [ ] Versión incrementada en package.json

---

## 🔗 Referencias Cruzadas

| Documento | Propósito |
|-----------|-----------|
| `skills-program/README.md` | Guía de skills (usuario) |
| `skills-program/INTEGRACION.md` | Arquitectura técnica |
| `tests/README.md` | Guía de testing |
| `AUDITORÍA-SENTENCIAS.md` | Reporte de auditoría |
| `.github/CI-CD-SETUP.md` | Configuración de workflows |
| `CLAUDE.md` | Instrucciones maestras del proyecto |

---

## 🎯 Estado del Programa

**Versión**: 2.0 Integrada

| Componente | Status | PR | Merged |
|-----------|--------|----|---------| 
| Skills Program | ✅ Completo | #23 | No |
| Tests & Audit | ✅ Completo | #24 | No |
| CI/CD | ✅ Completo | #23 | No |
| **TOTAL** | **✅ LISTO** | **Ambas** | **Pendiente** |

**Próximas mejoras**:
- [ ] Integración con Codecov
- [ ] Ampliación a 500+ sentencias
- [ ] Real API connections
- [ ] Slack notifications
- [ ] Performance benchmarks

---

**Integración General | Versión 1.0 | JAC - Abogados Asociados**

Última actualización: 2026-09-12
