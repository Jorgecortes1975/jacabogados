# ESTÁNDAR UNIVERSAL PARA SKILLS — Bufete Cortés Cartagena

**Objetivo**: Garantizar que TODOS los skills del ecosistema sean robustos, automáticos, anti-alucinación y no generen contenido inservible.

**Responsable**: Jorge Ángel Cortés Cartagena (T.P. 365.594)  
**Vigencia**: Efectivo Julio 2026  
**Aplicable a**: Todos los skills del ecosistema LEXA-LAB

---

## PRINCIPIOS FUNDAMENTALES

1. **AUTOMATICIDAD**: Ningún skill requiere activación explícita. Se ejecutan siempre cuando aplica su función.
2. **GARANTÍA DE CONTENIDO**: Cada skill garantiza la calidad de su salida. Si no puede hacerlo, rechaza y declara por qué.
3. **SIN ALUCINACIONES**: Guardias automáticas detectan y rechazan contenido comprometido antes de entregarlo.
4. **SIN PARCIALIDADES**: Si una guardia se activa, NO entrega resultado parcial. PARADA TOTAL.
5. **TRAZABILIDAD COMPLETA**: Toda corrección, rechazo o cambio se declara explícitamente con fuente.
6. **ACTA OBLIGATORIA**: Toda ejecución cierra con acta de control, sin excepto.

---

## ESTRUCTURA OBLIGATORIA DE CADA SKILL v2.0+

### 1. ENCABEZADO YAML (Identidad del Skill)

```yaml
---
name: [nombre-del-skill]
description: >
  [Una línea clara de qué hace, sin mezclar con instrucciones operativas].
  
  CARACTERÍSTICAS OPERATIVAS GARANTIZADAS:
  — Activación: AUTOMÁTICA (no requiere mención explícita)
  — Guardias: [número] filtros contra contenido comprometido
  — Rechazo: INMEDIATO si guardia se activa
  — Acta de control: OBLIGATORIA en toda salida
  — Certificación: [niveles específicos del skill]
  — Fail-safe: [qué ocurre si herramientas no disponibles]
---
```

---

### 2. ACTIVACIÓN AUTOMÁTICA (Sección obligatoria)

Cada skill debe incluir:

```markdown
## ACTIVACIÓN — Automática y Obligatoria

Este skill se ejecuta AUTOMÁTICAMENTE cada vez que:
[Listar condiciones de activación específicas para este skill]

NO requiere mención explícita. NO depende de "máximo nivel" ni instrucción especial.
La ejecución es INCONDICIONAL, sin excepto por urgencia.
```

**Ejemplo para anti-hallucination-v4**:
```
Este skill se ejecuta AUTOMÁTICAMENTE cada vez que:
- Se entrega, genera o revisa CUALQUIER documento jurídico
- Se solicita opinión legal sobre tema normativo en Colombia
- Se presentan cifras, hechos o jurisprudencia en contexto legal
```

---

### 3. GUARDIAS AUTOMÁTICAS (Sección obligatoria)

Cada skill debe tener MÍNIMO 3 guardias que:
- Detectan contenido comprometido
- Activan inmediatamente
- Producen RECHAZO sin reencuadre
- Se documentan en acta

**Estructura obligatoria**:

```markdown
## GUARDIAS AUTOMÁTICAS — Detención Inmediata

### GUARDIA 1: [Condición de fallo crítico]
**CONDICIÓN**: [qué activaría esta guardia]
**ACCIÓN INMEDIATA**:
🚫 RECHAZO — GUARDIA 1 ACTIVADA
Motivo: [motivo claro]
Riesgo: [riesgo si se procesa]
Qué se requiere: [cómo corregir]
Estado: DOCUMENTO BLOQUEADO
Certificación: 🚫 RECHAZADO

### GUARDIA 2: [Condición de fallo crítico]
[Mismo formato]

### GUARDIA 3: [Condición de fallo crítico]
[Mismo formato]
```

---

### 4. CERTIFICACIÓN FINAL (Estructura obligatoria)

Cada skill debe tener 3-5 niveles de certificación finales (máximo 5):

```markdown
## CERTIFICACIÓN FINAL

| Símbolo | Nombre | Criterio | Implicación |
|---------|--------|----------|------------|
| ✅ | EXITOSO/APTO | [Criterio de éxito] | Puede entregar/usar sin restricción |
| ⚠️ | CONDICIONAL | [Criterio con restricción] | Subsanar antes de entregar |
| 🟠 | REQUIERE REVISIÓN | [Criterio con revisión] | No usar sin validación manual |
| 🔴 | SUSPENDIDO | [Criterio de bloqueo] | Rehacer completamente |
| 🚫 | RECHAZADO | [Condición de rechazo] | No entregar bajo ninguna circunstancia |
```

**Máximo 5 niveles**. Deben ser mutuamente excluyentes (elegir solo UNO).

---

### 5. ACTA DE CONTROL OBLIGATORIA (Sección en toda salida)

Estructura mínima obligatoria para cada skill:

```markdown
═══════════════════════════════════════════════════════════════════
ACTA DE CONTROL — [NOMBRE DEL SKILL] v[VERSION]
═══════════════════════════════════════════════════════════════════

Entrada procesada: [identificación]
Fecha de procesamiento: [fecha/hora]

INDICADORES DE RIESGO:
[Indicadores específicos del skill, con símbolos 🔴 / 🟠 / 🟡 / 🟢]

GUARDIAS ACTIVADAS:
⚠️ Guardia 1: SÍ / NO
⚠️ Guardia 2: SÍ / NO
⚠️ Guardia 3: SÍ / NO

EVALUACIÓN TÉCNICA:
[Métricas específicas del skill]
[Hallazgos / Cambios / Validaciones]
Herramientas utilizadas: [lista]
Validaciones pendientes: [si aplica]

CERTIFICACIÓN FINAL:
  ✅ EXITOSO / ⚠️ CONDICIONAL / 🟠 REQUIERE REVISIÓN / 🔴 SUSPENDIDO / 🚫 RECHAZADO

RESPONSABILIDADES:
- Este documento NO sustituye la revisión de Jorge Ángel Cortés Cartagena (T.P. 365.594)
- Puntos marcados [REQUIERE VALIDACIÓN JAC] deben ser validados manualmente

═══════════════════════════════════════════════════════════════════
```

---

### 6. FAIL-SAFE (Sección obligatoria)

Si el skill depende de herramientas externas (API, búsqueda, validación), debe incluir:

```markdown
## FAIL-SAFE — Si Herramientas No Disponibles

Si [herramienta A], [herramienta B] NO están disponibles:

1. El skill NO asume nada como validado
2. Marca puntos críticos como [REQUIERE VALIDACIÓN JAC]
3. Emite certificación [CONDICIONAL], NUNCA [EXITOSO]
4. Acta declara explícitamente: "Validación incompleta por indisponibilidad de [herramientas]"
5. Documento puede avanzar SOLO si JAC valida manualmente

NUNCA emite [EXITOSO] con validación incompleta.
```

---

## CHECKLIST: Conformidad de Skill

Cada skill DEBE cumplir 100% con:

- ✅ Encabezado YAML con descripción clara
- ✅ Sección "Activación automática" (sin excepto por urgencia)
- ✅ Mínimo 3 guardias contra contenido comprometido
- ✅ Cada guardia produce RECHAZO (🚫), no reencuadre
- ✅ Rechazo por guardia = PARADA TOTAL (no procesa más)
- ✅ Certificación final (3-5 niveles, mutuamente excluyentes)
- ✅ Acta de control obligatoria en TODA salida
- ✅ Acta incluye: indicadores, guardias, certificación
- ✅ Fail-safe definido (si aplica)
- ✅ Test suite con casos de éxito y rechazo
- ✅ Documentación de "cómo probar que funciona"

**Calificación**: 
- 11/11 items = ✅ CONFORME a estándar
- 10/11 items = ⚠️ CONDICIONAL (subsanar lo faltante)
- <10/11 items = 🔴 NO CONFORME (rehacer skill)

---

## IMPLEMENTACIÓN POR SKILL

### SKILL: anti-hallucination-v4
- **Estado**: ✅ CONFORME (v4.1)
- **Versión**: 4.1 — Julio 2026
- **Guardias**: 6 (excede mínimo de 3)
- **Certificación**: 5 niveles (máximo permitido)
- **Acta**: ✅ Obligatoria con indicadores completos
- **Fail-safe**: ✅ Implementado

### SKILL: [Otros skills del ecosistema]
- **Estado**: ⏳ PENDIENTE DE AUDITORÍA
- **Acción**: Auditar contra checklist, aplicar mejoras, certificar

---

## AUDITORÍA DE SKILLS EXISTENTES

Para cada skill en el ecosistema:

1. **Leer el SKILL.md** actual
2. **Aplicar checklist** de conformidad (11 items)
3. **Documentar hallazgos**: qué le falta
4. **Ejecutar mejora**: agregar guardias, acta, fail-safe
5. **Test**: validar que funciona
6. **Certificar**: firma de conformidad

---

## PROTOCOLO DE MEJORA: De Skill v1 a v2

**Archivos a modificar**:
1. Encabezado YAML → Agregar descripción operativa
2. Agregar sección "Activación automática"
3. Agregar sección "Guardias automáticas" (mín 3)
4. Reescribir "Certificación final" (3-5 niveles)
5. Reescribir sección final → Incluir "Acta de control"
6. Agregar "Fail-safe" (si aplica)
7. Crear test suite (mín 10 casos)
8. Crear guía de verificación (10 pasos)

**Resultado**: Skill v2 conforme al estándar universal.

---

## DOCUMENTOS MAESTROS (Repositorio del Estándar)

| Archivo | Propósito |
|---------|-----------|
| `ESTANDAR-UNIVERSAL-SKILLS.md` | Este archivo (estándar) |
| `VERIFICACION-SKILLS.md` | Guía de prueba (10 pasos) |
| `PLANTILLA-SKILL-v2.md` | Template para skills nuevos |
| `CHECKLIST-AUDITORIA.md` | Auditoría de conformidad |

---

## INTEGRACIÓN CON ECOSISTEMA

```
Usuario entrega/genera contenido (jurídico, técnico, etc.)
                    ↓
            Skill aplicable activado AUTOMÁTICAMENTE
                    ↓
        Guardias detectan si hay contenido comprometido
                    ↓
        SÍ: PARADA INMEDIATA → 🚫 RECHAZADO
        NO: Procesamiento normal
                    ↓
        Reencuadre de vicios subsanables (si aplica)
        Validación contra fuentes/estándares
                    ↓
        Emisión de ACTA DE CONTROL obligatoria
        Certificación final (solo 1 de 5)
                    ↓
        Entrega al siguiente paso del flujo
        (cliente, juzgado, base de datos, etc.)
```

---

## PROPIEDAD INTELECTUAL Y RESPONSABILIDAD

- **Titular**: Jorge Ángel Cortés Cartagena (T.P. 365.594)
- **Bufete**: Cortés Cartagena, Medellín, Colombia
- **Vigencia**: 2026 en adelante
- **Aplicabilidad**: Todos los skills del ecosistema LEXA-LAB

---

## PRÓXIMAS ACCIONES

1. ✅ anti-hallucination-v4 → v4.1 CONFORME
2. ⏳ Auditar otros skills existentes
3. ⏳ Mejorar skills no conformes
4. ⏳ Crear PLANTILLA-SKILL-v2.md para skills nuevos
5. ⏳ Crear CHECKLIST-AUDITORIA.md para validaciones periódicas
6. ⏳ Documentar cada mejora con commits
7. ⏳ Certificar cada skill como CONFORME

