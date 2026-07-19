# GUÍA DE USO — JA ABOGADOS REMOTE SETUP

**Versión**: 1.0  
**Fecha**: 19 Julio 2026  
**Status**: ✅ Sistema Configurado

---

## 1️⃣ CONFIGURACIÓN INICIAL (YA COMPLETADA)

### Entorno Remoto
- 🌍 Ambiente: Cloud Container (Claude Code Remote)
- 📦 Rama: `claude/remote-control-vrhu5u`
- 📂 Directorio: `/home/user/jacabogados`
- ✅ Git: Inicializado y rama activa

### Estructura Validada
```
jacabogados/
├── CLAUDE.md                    (Memoria permanente del sistema) ✅
├── GUIA-USO.md                  (Este archivo) ✅
├── README.md                    (Resumen general) ✅
├── normativa/                   (5 archivos con ley colombiana) ✅
├── templates/                   (8 templates de contratos/políticas) ✅
├── prompts/                     (4 prompts automatizados) ✅
├── casos/
│   ├── Recurly-2026/           (INTAKE → Diagnóstico → Recomendaciones) ✅
│   ├── Telepatia-2026/         (Diagnóstico → Recomendaciones, falta INTAKE) ⏳
│   └── 00-VENCIMIENTOS.md      (Control de fechas) ✅
└── comparado/                   (Análisis comparado — pendiente de poblar)
```

---

## 2️⃣ FLUJO DE TRABAJO POR CLIENTE

### Fase 1: INTAKE (1 hora)
**Archivo**: `{empresa}/01-INTAKE.md`  
**Prompt a usar**: `/prompts/PROMPT-INTAKE.md`

```bash
1. Crear carpeta: `/casos/{EmpresaNueva}-2026/`
2. Copiar template: `cp templates/TEMPLATE-INTAKE-CLIENTE.md casos/{Empresa}/01-INTAKE.md`
3. Llenar datos básicos: empresa, decisor, servicios, urgencia
4. Revisar con cliente en llamada de 1 hora
```

**Salida esperada**: Archivo 01-INTAKE.md completo + calendario de siguientes fases

---

### Fase 2: DIAGNÓSTICO (2-3 días)
**Archivo**: `{empresa}/02-DIAGNOSTICO.md`  
**Prompt a usar**: `/prompts/PROMPT-DIAGNOSTICO.md`

```bash
1. Recopilar documentos del cliente:
   - Nómina actual
   - Contratos vigentes
   - Constancias de afiliación (EPS, AFP, ARL, Caja)
   - Políticas internas
   - Última inspección (si aplica)

2. Ejecutar análisis con Claude:
   - Usar prompt DIAGNOSTICO
   - Clasificar hallazgos: CRÍTICO (< 30 días) | MODERADO (30-90) | BAJO (90+)
   - Calcular riesgos legales y financieros
   - Identificar empleados en riesgo

3. Salida: 02-DIAGNOSTICO.md con:
   - Resumen ejecutivo (riesgo general)
   - Tabla de hallazgos clasificados
   - Normativa incumplida por cada hallazgo
   - Acreencias y multas estimadas
```

**Ejemplo**: Ver `/casos/Telepatia-2026/02-DIAGNOSTICO.md`

---

### Fase 3: RECOMENDACIONES (1 día)
**Archivo**: `{empresa}/03-RECOMENDACIONES.md`  
**Prompt a usar**: `/prompts/PROMPT-RECOMENDACIONES.md`

```bash
1. Basarse en diagnóstico completado
2. Generar plan de acción con:
   - Priorización por riesgo (CRÍTICO primero)
   - Timeline: fechas concretas
   - Responsables (cliente vs. JA Abogados)
   - Deliverables específicos
   - Costo estimado

3. Salida: 03-RECOMENDACIONES.md con plan ejecutable
```

**Ejemplo**: Ver `/casos/Recurly-2026/03-RECOMENDACIONES.md`

---

### Fase 4: IMPLEMENTACIÓN (Variable)
**Carpeta**: `{empresa}/04-IMPLEMENTACION/`

```
04-IMPLEMENTACION/
├── 01-CONTRATOS/
│   ├── Empleado-1-CONTRATO-INDEFINIDO.md
│   ├── Empleado-2-CONTRATO-PLAZO-FIJO.md
│   └── ...
├── 02-AFILIACIONES/
│   ├── Empleado-1-FORM-EPS.pdf
│   ├── Empleado-1-FORM-AFP.pdf
│   └── ...
├── 03-POLITICAS/
│   ├── REGLAMENTO-INTERNO.md
│   ├── POLITICA-ACOSO-LABORAL.md
│   └── POLITICA-TELETRABAJO.md
└── 04-CHECKLISTS/
    └── CHECKLIST-SEGURIDAD-SOCIAL.md
```

**Usar templates**: Copiar de `/templates/` y personalizar con datos del cliente.

---

### Fase 5: SEGUIMIENTO (Trimestral)
**Archivo**: `{empresa}/05-SEGUIMIENTO-{TRIMESTRE}.md`

```bash
Crear cada trimestre:
- 05-SEGUIMIENTO-Q1-2026.md
- 05-SEGUIMIENTO-Q2-2026.md
- ...

Contenido:
- Validación de implementación (qué se hizo, qué falta)
- Nuevas contrataciones y sus afiliaciones
- Cambios normativos desde último seguimiento
- Hallazgos nuevos
- Recomendaciones de ajuste
```

---

## 3️⃣ CÁLCULOS RÁPIDOS (2026)

### Salarios y Auxilios
```
Salario Mínimo Legal Mensual: $1.750.905 (Decreto 1469/2025)
Auxilio Transporte: $249.095 (Decreto 1470/2025)
```

### Aportes a Seguridad Social
```
EPS (Salud):
  - Empleado: 8.5% del salario
  - Empleador: 12% del salario

AFP (Pensión):
  - Empleado: 10% del salario (aprox.)
  - Empleador: 3% del salario (comisión)

ARL (Riesgos): Variable por actividad (0.5% - 6.96%)
  - Paga: Empleador 100%

Caja de Compensación: 4% del salario
  - Paga: Empleador 100%
```

### UPC 2026
- **Valor**: s/d (sin definición confirmada)
  - Pendiente verificación en Resolución 2764/2025 (Minsalud)
  - Referencia Nivel C: ~$1.658.912 anuales
  - **NO usar en cálculos hasta confirmar en PDF oficial**

---

## 4️⃣ PROMPTS AUTOMATIZADOS

### PROMPT-INTAKE.md
Usa cuando: Cliente nuevo, reunión completada, documentos en mano  
Output: Resumen estructurado de datos del cliente

### PROMPT-DIAGNOSTICO.md
Usa cuando: INTAKE completo + documentos de cliente (nómina, contratos, afiliaciones)  
Output: Análisis de cumplimiento, hallazgos clasificados, riesgos estimados

### PROMPT-RECOMENDACIONES.md
Usa cuando: DIAGNÓSTICO completado  
Output: Plan de acción priorizado, timeline, responsables, costos

### PROMPT-ANALISIS-CASO.md
Usa cuando: Consulta puntual, análisis específico de contrato o situación  
Output: Análisis detallado con normativa aplicable

---

## 5️⃣ NORMATIVA CLAVE

### Laboral (CST)
- `normativa/CST-RESUMEN.md` — Código Sustantivo del Trabajo
  - Arts. 37-48: Tipos de contrato
  - Arts. 200-203: Obligación de afiliar
  - Arts. 62-63: Justa causa de terminación

### Seguridad Social (Ley 100/1993)
- `normativa/LEY-100-RESUMEN.md` — Sistema Integral
  - EPS, AFP, ARL, Familia

### Riesgos Laborales (Ley 1562/2012)
- Sistema de Riesgos Laborales (ARL)
- Prevención de accidentes

### Decreto Único (1072/2015)
- `normativa/DECRETO-1072-RESUMEN.md` — Regulaciones integradas

### Acoso Laboral (Ley 1010/2006)
- `normativa/LEY-1010-RESUMEN.md` — Tipificación y sanciones

---

## 6️⃣ TEMPLATES DISPONIBLES

| Archivo | Uso |
|---------|-----|
| `TEMPLATE-CONTRATO-INDEFINIDO.md` | Contrato sin plazo fijo |
| `TEMPLATE-CONTRATO-PLAZO-FIJO.md` | Contrato con fecha término |
| `TEMPLATE-CONTRATO-OBRA-Y-LABOR.md` | Contrato por proyecto |
| `TEMPLATE-CONTRATO-APRENDIZAJE.md` | Contrato de aprendiz/practicante |
| `TEMPLATE-ACTA-TERMINACION.md` | Acta de liquidación y despido |
| `TEMPLATE-REGLAMENTO-INTERNO.md` | Reglamento de la empresa |
| `TEMPLATE-POLITICA-ACOSO-LABORAL.md` | Política anti-acoso |
| `TEMPLATE-CHECKLIST-SEGURIDAD-SOCIAL.md` | Verificación de afiliaciones |

**Cómo usar**:
1. Copiar template a carpeta `/04-IMPLEMENTACION/{Empresa}/`
2. Personalizar con datos específicos
3. Validar contra normativa antes de firmar

---

## 7️⃣ ESTADO DE CLIENTES (Jul 19, 2026)

### Telepatia-2026
- ✅ Diagnóstico: Completo (riesgo ALTO — 5 hallazgos críticos)
- ✅ Recomendaciones: Completo
- ⏳ **TAREA PENDIENTE**: Crear 01-INTAKE.md retroactivamente
- ⏳ Implementación: No iniciada

**Hallazgos críticos**:
- 7 empleados sin EPS
- 5 sin AFP
- 3 sin ARL
- 12 sin Caja de Compensación
- **Riesgo**: $500K - $2M en multas

---

### Recurly-2026
- ✅ INTAKE: Completo (empresa nueva SaaS)
- ✅ Diagnóstico: Completo
- ✅ Recomendaciones: Completo
- ✅ Resumen ejecutivo: Completo
- ⏳ Implementación: No iniciada
- **Estado**: Listo para siguiente fase

---

## 8️⃣ GIT & COMMITS

### Rama Actual
```bash
Rama: claude/remote-control-vrhu5u
Remote: origin/claude/remote-control-vrhu5u
```

### Protocolo de Commits
```bash
# Después de completar fase:
git add casos/{Empresa}/{fase}.md
git commit -m "Fase {N}: {Empresa} — {Descripción breve}"

# Ejemplo:
git commit -m "Fase 2: Telepatía — Diagnóstico completo (5 críticos, riesgo alto)"

# Push a rama:
git push -u origin claude/remote-control-vrhu5u
```

---

## 9️⃣ CHECKLIST DE INICIO

- [x] Rama Git: `claude/remote-control-vrhu5u` activa
- [x] Estructura de carpetas: Validada
- [x] CLAUDE.md: Memoria del sistema ✅
- [x] Normativa: 5 resúmenes listos
- [x] Templates: 8 templates disponibles
- [x] Prompts: 4 prompts automatizados
- [x] Clientes: Recurly (3/5 fases) + Telepatía (2/5 fases)
- [x] GUIA-USO.md: Este documento
- [ ] Primer INTAKE de Telepatía (retroactivo)
- [ ] Implementación Telepatía iniciada
- [ ] Implementación Recurly iniciada

---

## 🔟 SOPORTE RÁPIDO

**¿Necesitas...?**

| Situación | Ir a |
|-----------|------|
| Nuevo cliente | Crear carpeta, copiar `01-INTAKE.md` |
| Análisis de contrato | Usar `PROMPT-ANALISIS-CASO.md` |
| Verificar afiliaciones | Usar `TEMPLATE-CHECKLIST-SEGURIDAD-SOCIAL.md` |
| Cálculo de aportes | Ver sección "Cálculos Rápidos" arriba |
| Normativa específica | Buscar en `/normativa/` |
| Caso complejo | Contactar especialista (ver CLAUDE.md) |

---

**Última actualización**: 19 Julio 2026 | **Versión**: 1.0 configuración inicial
