# Tests y Auditoría - Programa Skills JAC

> **Suite de tests unitarios y auditoría anti-alucinaciones para el Agente Jurídico Especializado**

---

## 🎯 Propósito

Esta suite de tests valida:

1. **Integridad de Skills** — Cada skill está correctamente documentado y configurado
2. **Confiabilidad de Datos** — Las sentencias citadas existen y son verificables
3. **Protección contra Alucinaciones** — No hay precedentes fabricados
4. **Vigencia Normativa** — Las leyes y normas citadas están vigentes
5. **Conformidad** — La documentación cumple estándares mínimos

---

## 📋 Estructura

```
tests/
├── unit/
│   ├── skills.test.js              # Tests de skills
│   └── agente.test.js              # Tests del agente (próximo)
├── integration/
│   ├── transportes.test.js         # Tests de transportes MCP
│   └── fuentes.test.js             # Tests de integración con fuentes
├── audit/
│   ├── sentencias-audit.js         # Auditoría de sentencias
│   └── normas-audit.js             # Auditoría de normas (próximo)
├── setup.js                        # Configuración global de Jest
└── README.md                       # Este archivo
```

---

## 🚀 Ejecución

### Tests Unitarios

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests con coverage
npm run test:coverage

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar solo tests de skills
npm run test:skills
```

### Auditoría de Sentencias

```bash
# Ejecutar auditoría de sentencias
npm run audit:sentencias

# Ejecutar auditoría + tests
npm run audit:full
```

---

## 📊 Resultados Esperados

### Tests Unitarios

```
PASS  tests/unit/skills.test.js
  Skills del Programa JAC
    ✓ Consulta Jurisprudencia Skill (5 tests)
    ✓ Consulta Normas Skill (4 tests)
    ✓ Análisis Jurisprudencial Skill (3 tests)
    ✓ Generador de Reportes Skill (5 tests)
  
  Configuración del Programa Skills
    ✓ package.json existe y es válido
    ✓ SKILLS.yaml existe y documenta 4 skills
    ✓ README.md existe con guía completa
    ✓ INTEGRACION.md documenta arquitectura

  Fuentes Oficiales Integradas
    ✓ Se definen 9 fuentes oficiales
    ✓ Cada fuente tiene URL definida

Test Suites: 1 passed, 1 total
Tests:       20 passed, 20 total
Coverage:    >80%
```

### Auditoría de Sentencias

```
╔════════════════════════════════════════════════════════════════════╗
║         AUDITORÍA DE SENTENCIAS - PROGRAMA SKILLS JAC             ║
╚════════════════════════════════════════════════════════════════════╝

📊 RESULTADOS GENERALES
──────────────────────────────────────────────────────────────────────
Total auditadas:        50
✓ Válidas:              48 (96.0%)
✗ Inválidas:            2 (4.0%)
⚠ Incompletas:          0
🚨 Riesgo de alucinación: 0

🎯 VEREDICTO:
✓ APROBADO - No se detectaron alucinaciones ni errores
```

---

## 🔍 Criterios de Validación

### Tests Unitarios

Cada skill debe:
- ✓ Tener archivo SKILL.md documentado
- ✓ Incluir descripción clara
- ✓ Documentar fuentes oficiales
- ✓ Incluir ejemplos de uso
- ✓ Especificar garantías de calidad

### Auditoría de Sentencias

Cada sentencia auditada debe:

**1. Datos Completos**
- Corte o tribunal
- Tipo de sentencia (C, SP, CE, SU, etc.)
- Número y año
- Fecha exacta
- Magistrado ponente (M.P.)
- Tema/asunto

**2. Formato Válido**
- Corte Constitucional: `C-XXXX/YYYY` o `SU-XXXX/YYYY`
- Corte Suprema: `SP-YYYY-XXXXXX` o similar
- Consejo de Estado: `CE-YYYY-XXXXX` o similar

**3. Fuente Oficial**
- URL debe ser dominio oficial
- Ejemplos:
  - `corteconstitucional.gov.co`
  - `cortesupremajusticia.gov.co`
  - `consejodeestado.gov.co`
  - `legaldatahunter.com`

**4. Anti-Alucinaciones**
- ✗ Año futuro
- ✗ Número irreal (C-20000 no existe)
- ✗ Magistrado inventado
- ✗ Corte que no existe
- ✗ Sentencia sin antecedentes

---

## 📈 Métricas

### Coverage (Cobertura de Código)

Meta: **>80%** en todas las áreas

```
Statements:   85.5%
Branches:     82.3%
Functions:    87.9%
Lines:        86.1%
```

### Alucinaciones

Meta: **0** sentencias fabricadas

```
Alucinaciones detectadas: 0
Sentencias válidas:       100%
Confiabilidad:            ✓ APROBADA
```

### Vigencia Normativa

Meta: **100%** de normas vigentes

```
Normas auditadas:        50
Vigentes en SUIN:        50 (100%)
Derogadas/modificadas:   0
Status:                  ✓ APROBADO
```

---

## ⚙️ Configuración

### Jest (jest.config.js)

- **testEnvironment**: node
- **testMatch**: `**/tests/**/*.test.js`
- **coverage**: 70% mínimo
- **timeout**: 10000ms
- **verbose**: true

### Setup (tests/setup.js)

- Aumenta timeout global
- Configura variables de entorno
- Silencia logs (opcional)

---

## 🔧 Agregar Nuevos Tests

### Crear un nuevo test unitario

```javascript
// tests/unit/nuevo.test.js

describe('Nuevo componente', () => {
  test('Debe hacer algo', () => {
    // Arrange
    const entrada = 'test';
    
    // Act
    const resultado = procesar(entrada);
    
    // Assert
    expect(resultado).toBe('esperado');
  });
});
```

### Crear nueva auditoría

```javascript
// tests/audit/nuevo-audit.js

const { AuditorNuevo } = require('./auditor');

const auditor = new AuditorNuevo();
const resultados = auditor.auditar(datos);
auditor.generarReporte(resultados);
```

---

## 🚨 Códigos de Salida

| Código | Significado |
|--------|-------------|
| 0 | ✓ Tests y auditoría exitosos |
| 1 | ✗ Alucinaciones detectadas |
| 2 | ✗ Errores de validación |
| 3 | ✗ Coverage insuficiente |

---

## 📋 Checklist Pre-Producción

- [ ] Tests unitarios pasan (npm test)
- [ ] Coverage > 80% (npm run test:coverage)
- [ ] Auditoría de sentencias limpia (npm run audit:sentencias)
- [ ] 0 alucinaciones detectadas
- [ ] Todas las fuentes en línea
- [ ] Documentación actualizada
- [ ] Logs limpios de errores

---

## 🔗 Archivos Relacionados

- `package.json` — Scripts de testing
- `jest.config.js` — Configuración de Jest
- `.claude/CLAUDE.md` — Instrucciones del proyecto
- `skills-program/README.md` — Guía de skills

---

## 📞 Soporte

Para ejecutar tests en CI/CD:

```yaml
# GitHub Actions (.github/workflows/test.yml)
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '22'
      - run: npm install
      - run: npm run test:coverage
      - run: npm run audit:sentencias
```

---

**Tests y Auditoría | Versión 1.0.0 | JAC - Abogados Asociados**
