# 🚀 Configuración CI/CD - Programa Skills JAC

> **Sistema automatizado de testing, auditoría y validación de código**

---

## 📋 Resumen

Este documento describe los flujos de CI/CD (Continuous Integration / Continuous Deployment) que se ejecutan automáticamente en el repositorio para garantizar la calidad y confiabilidad del Programa Skills JAC.

---

## 🔄 Flujos de Trabajo (Workflows)

### 1. **tests-and-audit.yml** - Tests y Auditoría (Cada Push/PR)

**Disparo**: 
- Push a cualquier rama `claude/**`
- Push a `main`
- Pull Request a `main`

**Pasos**:
1. ✅ Checkout del código
2. ✅ Setup de Node.js (18.x, 20.x)
3. ✅ Instalación de dependencias
4. ✅ Ejecutar tests unitarios con coverage
5. ✅ Ejecutar auditoría de sentencias
6. ✅ Validar cobertura mínima (70%)
7. ✅ Comentar resultados en PR
8. ✅ Fallar si hay alucinaciones detectadas

**Tiempo**: ~3-5 minutos

**Resultado**: 
- Aprueba si: Tests pasan + Coverage ≥70% + 0 alucinaciones
- Falla si: Hay fallos en tests, coverage bajo, o alucinaciones

---

### 2. **code-quality.yml** - Validación de Calidad

**Disparo**:
- Push a cualquier rama `claude/**`
- Push a `main`
- Pull Request a `main`

**Validaciones**:
1. ✅ Estructura de `package.json`
2. ✅ Existencia de documentación en skills
3. ✅ Validez de `SKILLS.yaml`
4. ✅ Referencia a fuentes oficiales
5. ✅ Búsqueda de patrones sospechosos

**Tiempo**: ~1-2 minutos

**Resultado**: Valida estructura sin bloquear, reporta en comentarios

---

### 3. **audit-monitoring.yml** - Monitoreo Continuo

**Disparo**:
- Automáticamente cada domingo a las 00:00 UTC
- Manualmente con `workflow_dispatch`

**Acciones**:
1. ✅ Ejecutar auditoría completa (tests + audit:sentencias)
2. ✅ Generar reporte semanal
3. ✅ Crear issue si hay fallos
4. ✅ Comentar en PRs abiertos
5. ✅ Guardar artefactos por 30 días

**Tiempo**: ~3-5 minutos

**Resultado**: Reporte semanal + alertas si hay problemas

---

## 📊 Scripts Utilizados

Estos workflows ejecutan los scripts de `package.json`:

```bash
# Tests unitarios con cobertura
npm run test:coverage

# Auditoría de sentencias
npm run audit:sentencias

# Auditoría completa (tests + audit)
npm run audit:full
```

---

## 🎯 Métricas y Umbrales

| Métrica | Umbral | Estado |
|---------|--------|--------|
| **Coverage Total** | ≥70% | ✅ Requerido |
| **Statements** | ≥70% | ✅ Requerido |
| **Branches** | ≥70% | ✅ Requerido |
| **Functions** | ≥70% | ✅ Requerido |
| **Lines** | ≥70% | ✅ Requerido |
| **Alucinaciones** | 0 | ✅ Obligatorio |
| **Sentencias Válidas** | ≥96% | ✅ Target |

---

## 🔐 Protecciones Configuradas

### Branch Protection Rules (Recomendado)

Para `main` y `claude/**`:

```yaml
- Require status checks to pass:
  ✅ Tests y Auditoría de Sentencias
  ✅ Validación de Calidad de Código
  
- Require code reviews:
  - Mínimo 1 revisión
  - Dismissal de revisiones anticuadas: sí

- Require branches to be up to date:
  - Sí, debe estar actualizado con main
```

---

## 📝 Registros y Artefactos

### Acceso a Resultados

1. **En GitHub Actions**:
   - Ir a: `Actions` → filtrar por workflow
   - Ver logs completos
   - Descargar artefactos

2. **En PRs**:
   - Comentarios automáticos con resumen
   - Link a run completo en Actions
   - Status checks en el PR

3. **Artefactos Guardados**:
   - `audit-reports/`: Reportes semanales (30 días)
   - `coverage/`: Reporte de cobertura (por run)

---

## 🐛 Troubleshooting

### Coverage bajo

```bash
# Ver qué no está cubierto
npm run test:coverage

# Abrir reporte
open coverage/index.html
```

### Tests fallando localmente pero pasando en CI

```bash
# Reproducir ambiente CI
NODE_ENV=test npm run test

# Con node 20.x específicamente
nvm use 20
npm ci
npm run test
```

### Alucinaciones detectadas

Ver `tests/audit/sentencias-audit.js` para entender las reglas de validación.

---

## 🚀 Próximas Mejoras

- [ ] Integración con Codecov para reportes históricos
- [ ] Slack notifications para fallos críticos
- [ ] Ampliación de auditoría a 500+ sentencias
- [ ] API connections reales a fuentes oficiales
- [ ] Normas audit (NORMAS-SENTENCIAS)
- [ ] Benchmarking de performance

---

## 📚 Referencias

- `.github/workflows/tests-and-audit.yml` - Flujo principal
- `.github/workflows/code-quality.yml` - Validación
- `.github/workflows/audit-monitoring.yml` - Monitoreo
- `jest.config.js` - Configuración de tests
- `tests/README.md` - Guía de testing
- `AUDITORÍA-SENTENCIAS.md` - Reporte de auditoría

---

**CI/CD Setup | Versión 1.0 | JAC - Abogados Asociados**

Última actualización: 2026-09-12
