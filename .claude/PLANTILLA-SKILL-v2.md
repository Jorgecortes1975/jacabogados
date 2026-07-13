# PLANTILLA SKILL v2.0 — Estándar Universal

**Copia este archivo y reemplaza los placeholders `[...]` para crear un nuevo skill conforme al estándar.**

```yaml
---
name: [nombre-en-minusculas-con-guiones]
description: >
  [UNA LÍNEA: qué hace el skill, sin instrucciones de activación].
  
  CARACTERÍSTICAS GARANTIZADAS:
  — Activación: AUTOMÁTICA (sin requerir mención)
  — Guardias: [número: 3+] filtros contra contenido comprometido
  — Rechazo: INMEDIATO al activarse guardia
  — Acta de control: OBLIGATORIA en toda salida
  — Certificación: ✅ EXITOSO / ⚠️ CONDICIONAL / 🟠 REQUIERE REVISIÓN / 🔴 SUSPENDIDO / 🚫 RECHAZADO
  — Fail-safe: [descripción breve si aplica]
---
```

---

# [NOMBRE DEL SKILL] v2.0
## [Subtítulo descriptivo]

**Autor**: Jorge Ángel Cortés Cartagena — T.P. 365.594  
**Versión**: 2.0 — Julio 2026 — Conforme a Estándar Universal de Skills  
**Naturaleza**: Skill EJECUTORA AUTOMÁTICA con guardias anti-alucinación

---

## PROPÓSITO

[Describir brevemente qué problema resuelve, sin superar 3 párrafos]

**Regla absoluta**: [Afirmación clara de cuándo este skill DEBE ejecutarse]

---

## ACTIVACIÓN — Automática y Obligatoria

Este skill se ejecuta **AUTOMÁTICAMENTE cada vez que**:
1. [Condición 1]
2. [Condición 2]
3. [Condición 3]

NO requiere mención explícita. NO depende de urgencia. La activación es INCONDICIONAL.

---

## QUÉ HACE — Operaciones en Secuencia Obligatoria

Cuando se activa, ejecuta en este orden (no es opcional saltarse):

1. **PASO 1**: [Primera operación específica del skill]
2. **PASO 2**: [Segunda operación]
3. **PASO 3**: [Tercera operación]
4. **PASO 4**: [Etc.]
5. **PASO 5**: [Validación/verificación]
6. **PASO 6**: [Certificación + Acta]

---

## GUARDIAS AUTOMÁTICAS — Detención Inmediata de Contenido Comprometido

Antes de procesar, el skill aplica estos **filtros de parada obligatoria**:

### GUARDIA 1: [Nombre de la guardia]
**CONDICIÓN**: [Qué triggers esta guardia]

**ACCIÓN INMEDIATA**:
```
🚫 RECHAZO — GUARDIA 1 ACTIVADA
Motivo: [Motivo claro del rechazo]
Riesgo: [Por qué es riesgoso procesar]
Qué se requiere: [Cómo corregir para reintentar]
Estado: DOCUMENTO BLOQUEADO — No procesa más
Certificación: 🚫 RECHAZADO
```

---

### GUARDIA 2: [Nombre de la guardia]
**CONDICIÓN**: [Qué triggers esta guardia]

**ACCIÓN INMEDIATA**:
[Mismo formato que GUARDIA 1]

---

### GUARDIA 3: [Nombre de la guardia]
**CONDICIÓN**: [Qué triggers esta guardia]

**ACCIÓN INMEDIATA**:
[Mismo formato que GUARDIA 1]

---

## MATRIZ DE CORRECCIONES SUBSANABLES

[Si el skill puede "reencuadrar" o corregir automáticamente, describe qué puede corregir y cómo]:

| Tipo de hallazgo | ¿Se puede corregir? | Cómo se corrige |
|------------------|-------------------|-----------------|
| [Ejemplo 1] | SÍ | [Procedimiento] |
| [Ejemplo 2] | NO | [Por qué no se puede corregir] |
| [Ejemplo 3] | PARCIALMENTE | [Qué se corrige + qué requiere validación JAC] |

---

## PROTOCOLO DE REENCUADRE (Si aplica)

Cuando un hallazgo es corregible, el skill interviene con esta fórmula obligatoria:

```
CORRECCIÓN ACTIVA
Hallazgo detectado: [tipo, según matriz]
Fragmento original: "[texto/datos exactos]"
Razón de la corrección: [explicación técnica]
Texto/Datos reencuadrados: "[versión corregida]"
Fuente de verificación: [de dónde se obtiene la corrección]
```

---

## PROTOCOLO DE RECHAZO (Si aplica)

El rechazo procede cuando:
1. [Condición de rechazo 1]
2. [Condición de rechazo 2]
3. [Condición de rechazo 3]

Fórmula obligatoria:

```
RECHAZO DE [ELEMENTO]
Motivo: [vicio/problema que justifica rechazo]
Alcance: [qué se rechaza: elemento, sección, todo]
Qué se requiere para reintentar: [qué información falta o qué se debe arreglar]
Este contenido NO debe [usarse/procesarse/entregarse/radicar] en su estado actual.
```

---

## CERTIFICACIÓN FINAL

Al concluir, el skill emite **UNA SOLA** de estas certificaciones:

| Símbolo | Certificación | Criterio | Implicación |
|---------|---|---|---|
| ✅ | EXITOSO | [Criterio de éxito: qué debe cumplir] | Puede [entregarse/usarse/procesarse] sin restricción |
| ⚠️ | CONDICIONAL | [Criterio con restricciones] | Subsanar [qué] antes de [siguiente paso] |
| 🟠 | REQUIERE REVISIÓN | [Criterio de revisión] | NO [usar/entregar] sin validación manual de JAC |
| 🔴 | SUSPENDIDO | [Criterio de suspensión] | Rehacer [qué] completamente |
| 🚫 | RECHAZADO | [Condición de rechazo] | NO entrega bajo ninguna circunstancia |

**REGLA**: Solo UNA certificación por ejecución. Si hay ambigüedad, emite la más restrictiva.

---

## FAIL-SAFE — Si Herramientas No Disponibles

Si el skill depende de [herramienta A], [herramienta B], [herramienta C]:

1. **Si herramientas NO están disponibles**:
   - El skill NO asume nada como verificado
   - Marca puntos críticos como `[REQUIERE VALIDACIÓN JAC]`
   - Emite certificación **⚠️ CONDICIONAL**, NUNCA ✅ EXITOSO
   - Acta declara: "Validación incompleta por indisponibilidad de [herramientas]"
   - Contenido puede avanzar SOLO si JAC valida manualmente

2. **Nunca emite ✅ EXITOSO con validación incompleta.**

---

## ACTA DE CONTROL — Cierre Obligatorio

Todo documento/entrada procesada cierra con este bloque SIN EXCEPTO:

```
═══════════════════════════════════════════════════════════════════
ACTA DE CONTROL — [NOMBRE DEL SKILL] v2.0
═══════════════════════════════════════════════════════════════════

Entrada procesada: [identificación de lo que se procesó]
Fecha de procesamiento: [fecha/hora]
Sesión/Fuente: [dónde se ejecutó]

INDICADORES DE RIESGO:
🔴 Problemas críticos: [cantidad | lista si aplica]
🟠 Problemas importantes: [cantidad | lista si aplica]
🟡 Problemas recomendados: [cantidad | lista si aplica]
🟢 Sin problemas: [SÍ / NO]

GUARDIAS ACTIVADAS:
⚠️ Guardia 1 ([nombre]): SÍ / NO
⚠️ Guardia 2 ([nombre]): SÍ / NO
⚠️ Guardia 3 ([nombre]): SÍ / NO

EVALUACIÓN TÉCNICA:
[Resumen de hallazgos específicos del skill]
[Métrica 1]: [valor]
[Métrica 2]: [valor]
[Métrica 3]: [valor]

Herramientas de verificación consultadas:
  ✓ [Herramienta 1]: SÍ / NO / N/A
  ✓ [Herramienta 2]: SÍ / NO / N/A
  ✓ [Herramienta 3]: SÍ / NO / N/A

Correcciones aplicadas: [número | lista breve]
Elementos rechazados: [número | lista breve]
Validaciones pendientes: [si aplica, listar]

CERTIFICACIÓN FINAL:
  ✅ EXITOSO
  ⚠️ CONDICIONAL (subsanar: [qué])
  🟠 REQUIERE REVISIÓN (razón: [qué])
  🔴 SUSPENDIDO (razón: [qué])
  🚫 RECHAZADO (razón: [qué])

RESPONSABILIDADES:
- Este acta NO sustituye la revisión de Jorge Ángel Cortés Cartagena (T.P. 365.594)
- Puntos marcados [REQUIERE VALIDACIÓN JAC] requieren validación manual
- Antes de avanzar a siguiente paso: asegurar que certificación es ✅ o ⚠️ (con validación JAC)

═══════════════════════════════════════════════════════════════════
```

---

## FUENTES PRIMARIAS / VERIFICACIÓN

[Si el skill valida contra fuentes, listar dónde verificar]:

| Elemento a validar | Dónde verificar |
|-------------------|-----------------|
| [Ejemplo] | [Fuente oficial] |
| [Ejemplo] | [Fuente oficial] |

**No son fuentes válidas**: [Listar qué NO se acepta como verificación]

---

## INTEGRACIÓN CON ECOSISTEMA

```
[Entrada al skill]
        ↓
[Activación automática]
        ↓
[Guardias: SÍ → RECHAZO | NO → Procesar]
        ↓
[Pasos 1-5: Procesamiento]
        ↓
[Paso 6: Certificación + Acta]
        ↓
[Salida: Contenido + Acta de Control]
```

---

## CASOS DE PRUEBA (Test Suite Mínimo)

Crear mínimo 10 casos de prueba que validen:

### Test 1: [Caso exitoso básico]
- Input: [Entrada que debe funcionar]
- Salida esperada: ✅ EXITOSO
- ¿Pasó? ⬜ SÍ ⬜ NO

### Test 2: [Caso que activa Guardia 1]
- Input: [Entrada que triggers guardia 1]
- Salida esperada: 🚫 RECHAZADO — GUARDIA 1
- ¿Pasó? ⬜ SÍ ⬜ NO

[... tests 3-10 ...]

**Criterio de aprobación**: Mínimo 8/10 tests deben pasar.

---

## GUÍA DE VERIFICACIÓN (10 PASOS)

[Describir cómo probar que el skill funciona, con 10 pasos concretos]

1. Paso 1: [Verificar activación automática]
2. Paso 2: [Verificar que se ejecuta sin urgencia que lo interrumpa]
3. Paso 3: [Verificar guardia 1]
4. Paso 4: [Verificar guardia 2]
5. Paso 5: [Verificar guardia 3]
6. Paso 6: [Verificar reencuadre automático]
7. Paso 7: [Verificar acta de control]
8. Paso 8: [Verificar certificación]
9. Paso 9: [Verificar test suite]
10. Paso 10: [Certificación final de operatividad]

---

## CHANGELOG v2.0

**Mejoras vs v1.0**:
- ✅ Activación automática (sin requerir mención)
- ✅ [Número] Guardias automáticas contra contenido comprometido
- ✅ Rechazo inmediato al activarse guardia
- ✅ Acta de control obligatoria
- ✅ Certificación final clara (5 niveles)
- ✅ Fail-safe implementado
- ✅ Test suite con [número] casos
- ✅ Protocolo de corrección con trazabilidad

---

**Responsable**: Jorge Ángel Cortés Cartagena (T.P. 365.594)  
**Bufete**: Cortés Cartagena, Medellín, Colombia — 2026
```

---

## CÓMO USAR ESTA PLANTILLA

1. **Copiar** este archivo completo
2. **Reemplazar** todos los `[placeholders]` con contenido específico del skill
3. **Agregar** secciones adicionales si el skill lo requiere
4. **Crear** test suite (mínimo 10 casos)
5. **Crear** guía de verificación (10 pasos)
6. **Testear** el skill contra test suite
7. **Verificar** conformidad con ESTANDAR-UNIVERSAL-SKILLS.md
8. **Commit** con mensaje referenciando "Conforme a estándar universal v2.0"

