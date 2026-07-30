# CHECKLIST DE AUDITORÍA — Conformidad de Skills con Estándar v2.0

**Propósito**: Validar que cada skill cumple 100% con el Estándar Universal de Skills.

**Responsable**: Jorge Ángel Cortés Cartagena (T.P. 365.594)  
**Fecha de auditoría**: ________________  
**Skill auditado**: ________________

---

## PARTE I: ESTRUCTURA DEL SKILL (YAML + Secciones)

| Item | Descripción | ¿Presente? | ¿Completo? | Observaciones |
|------|-------------|-----------|-----------|---------------|
| 1.1 | Encabezado YAML con `name` y `description` | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 1.2 | Descripción menciona: activación automática | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 1.3 | Descripción menciona: guardias (número) | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 1.4 | Descripción menciona: rechazo automático | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 1.5 | Descripción menciona: acta de control obligatoria | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 1.6 | Descripción menciona: certificación (símbolos) | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 1.7 | Descripción menciona: fail-safe | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |

**Subtotal 1.x**: __/7 items

---

## PARTE II: ACTIVACIÓN AUTOMÁTICA

| Item | Descripción | ¿Presente? | ¿Correcto? | Observaciones |
|------|-------------|-----------|-----------|---------------|
| 2.1 | Sección "Activación" existe | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 2.2 | Define claramente condiciones de activación | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 2.3 | Afirma que NO requiere mención explícita | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 2.4 | Afirma que es INCONDICIONAL (sin excepto por urgencia) | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 2.5 | No hay instrucciones tipo "puedes pedir" o "si quieres" | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |

**Subtotal 2.x**: __/5 items

---

## PARTE III: GUARDIAS AUTOMÁTICAS

### 3.1: Existencia y cantidad
| Item | Descripción | ¿Presente? | ¿Correcto? | Observaciones |
|------|-------------|-----------|-----------|---------------|
| 3.1.1 | Sección "Guardias automáticas" existe | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 3.1.2 | Tiene MÍNIMO 3 guardias | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | **Cuántas**: ___ |
| 3.1.3 | Cada guardia tiene nombre descriptivo | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |

### 3.2: Estructura de cada guardia
| Item | Descripción | Guardia 1 | Guardia 2 | Guardia 3+ |
|------|-------------|-----------|-----------|-----------|
| 3.2.1 | Define CONDICIÓN de activación | ⬜ | ⬜ | ⬜ |
| 3.2.2 | Define ACCIÓN INMEDIATA (rechazo) | ⬜ | ⬜ | ⬜ |
| 3.2.3 | Incluye: Motivo del rechazo | ⬜ | ⬜ | ⬜ |
| 3.2.4 | Incluye: Riesgo si se procesa | ⬜ | ⬜ | ⬜ |
| 3.2.5 | Incluye: Qué se requiere para reintentar | ⬜ | ⬜ | ⬜ |
| 3.2.6 | Emite 🚫 RECHAZO (símbolo correcto) | ⬜ | ⬜ | ⬜ |
| 3.2.7 | Declara: DOCUMENTO BLOQUEADO (parada total) | ⬜ | ⬜ | ⬜ |

**Subtotal 3.x**: __/10+ items

---

## PARTE IV: CERTIFICACIÓN FINAL

| Item | Descripción | ¿Presente? | ¿Correcto? | Observaciones |
|------|-------------|-----------|-----------|---------------|
| 4.1 | Sección "Certificación final" existe | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 4.2 | Define 3-5 niveles de certificación | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | **Cantidad**: ___ |
| 4.3 | Cada nivel tiene: Símbolo único (✅/⚠️/🟠/🔴/🚫) | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 4.4 | Cada nivel tiene: Nombre claro | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 4.5 | Cada nivel tiene: Criterio de cuándo aplicar | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 4.6 | Cada nivel tiene: Implicación clara | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 4.7 | Los niveles son MUTUAMENTE EXCLUYENTES (solo 1 por ejecución) | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |

**Subtotal 4.x**: __/7 items

---

## PARTE V: ACTA DE CONTROL

| Item | Descripción | ¿Presente? | ¿Completa? | Observaciones |
|------|-------------|-----------|-----------|---------------|
| 5.1 | Acta incluida en TODA salida | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 5.2 | Acta tiene encabezado: "ACTA DE CONTROL" | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 5.3 | Acta identifica: Entrada procesada | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 5.4 | Acta incluye: Indicadores de riesgo (🔴/🟠/🟡/🟢) | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 5.5 | Acta incluye: Estado de guardias (SÍ/NO cada una) | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 5.6 | Acta incluye: Evaluación técnica del skill | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 5.7 | Acta incluye: Herramientas de verificación utilizadas | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 5.8 | Acta incluye: Certificación final (solo 1 de 5) | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 5.9 | Acta menciona responsabilidad de JAC | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 5.10 | Acta está bien formateada (línea separadora, clara) | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |

**Subtotal 5.x**: __/10 items

---

## PARTE VI: FAIL-SAFE

| Item | Descripción | ¿Presente? | ¿Correcto? | Observaciones |
|------|-------------|-----------|-----------|---------------|
| 6.1 | Sección "Fail-safe" existe (si aplica) | ⬜ SÍ ⬜ NO ⬜ N/A | ⬜ SÍ ⬜ NO | |
| 6.2 | Define qué herramientas son críticas | ⬜ SÍ ⬜ NO ⬜ N/A | ⬜ SÍ ⬜ NO | |
| 6.3 | Define qué ocurre si herramientas NO disponibles | ⬜ SÍ ⬜ NO ⬜ N/A | ⬜ SÍ ⬜ NO | |
| 6.4 | Afirma: marca como [REQUIERE VALIDACIÓN JAC] | ⬜ SÍ ⬜ NO ⬜ N/A | ⬜ SÍ ⬜ NO | |
| 6.5 | Afirma: certifica CONDICIONAL (nunca EXITOSO/APTO) | ⬜ SÍ ⬜ NO ⬜ N/A | ⬜ SÍ ⬜ NO | |
| 6.6 | Afirma: documento avanza solo si JAC valida | ⬜ SÍ ⬜ NO ⬜ N/A | ⬜ SÍ ⬜ NO | |

**Subtotal 6.x**: __/6 items (máximo si N/A = 0)

---

## PARTE VII: TESTS Y DOCUMENTACIÓN

| Item | Descripción | ¿Presente? | ¿Completo? | Observaciones |
|------|-------------|-----------|-----------|---------------|
| 7.1 | Archivo `.claude/test-skills/[skill]-test-suite.md` existe | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 7.2 | Test suite contiene MÍNIMO 10 casos | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | **Cantidad**: ___ |
| 7.3 | Tests incluyen casos de éxito | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 7.4 | Tests incluyen casos de rechazo (guardias) | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 7.5 | Tests especifican input esperado y salida esperada | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 7.6 | Archivo `.claude/VERIFICACION-[skill].md` existe (guía 10 pasos) | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |
| 7.7 | Guía de verificación tiene MÍNIMO 10 pasos | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | **Cantidad**: ___ |
| 7.8 | Guía explica cómo probar cada aspecto | ⬜ SÍ ⬜ NO | ⬜ SÍ ⬜ NO | |

**Subtotal 7.x**: __/8 items

---

## PARTE VIII: CONFORMIDAD OPERATIVA

| Item | Descripción | Resultado | Observaciones |
|------|-------------|-----------|---------------|
| 8.1 | ¿El skill se ejecuta automáticamente (sin mención)? | ⬜ SÍ ⬜ NO ⬜ NO PROBADO | |
| 8.2 | ¿Las guardias rechazan contenido comprometido? | ⬜ SÍ ⬜ NO ⬜ NO PROBADO | |
| 8.3 | ¿El rechazo por guardia es INMEDIATO (parada total)? | ⬜ SÍ ⬜ NO ⬜ NO PROBADO | |
| 8.4 | ¿Emite ACTA DE CONTROL en TODAS las salidas? | ⬜ SÍ ⬜ NO ⬜ NO PROBADO | |
| 8.5 | ¿La acta está completa (indicadores + guardias + certificación)? | ⬜ SÍ ⬜ NO ⬜ NO PROBADO | |
| 8.6 | ¿Certifica con solo 1 de los 5 niveles? | ⬜ SÍ ⬜ NO ⬜ NO PROBADO | |
| 8.7 | ¿Aplica fail-safe si herramientas no disponibles? | ⬜ SÍ ⬜ NO ⬜ N/A ⬜ NO PROBADO | |
| 8.8 | ¿Los tests pasan (mínimo 8/10)? | ⬜ SÍ ⬜ NO ⬜ NO EJECUTADO | **Resultado**: ___/10 |

**Subtotal 8.x**: __/8 items

---

## RESULTADO FINAL DE AUDITORÍA

**Totales por sección**:
- Sección I (Estructura): __/7
- Sección II (Activación): __/5
- Sección III (Guardias): __/10+
- Sección IV (Certificación): __/7
- Sección V (Acta): __/10
- Sección VI (Fail-safe): __/6
- Sección VII (Tests): __/8
- Sección VIII (Operativa): __/8

**TOTAL ITEMS**: __/61 (máximo si todas N/A = 0)

**PORCENTAJE DE CONFORMIDAD**: ___% = (TOTAL / 61) × 100

---

## CLASIFICACIÓN FINAL

- ✅ **CONFORME**: 55-61/61 items (90-100%)
  - Skill listo para uso
  - Puede ser referenciado por otros skills
  
- ⚠️ **CONDICIONAL**: 45-54/61 items (73-89%)
  - Subsanar items faltantes antes de usar
  - Crear plan de mejora

- 🟠 **REQUIERE REVISIÓN**: 35-44/61 items (57-72%)
  - Revisar estructura completa
  - Rehacer secciones faltantes
  
- 🔴 **NO CONFORME**: <35/61 items (<57%)
  - Skill no cumple estándar
  - Debe reescribirse completamente

---

## HALLAZGOS Y PLAN DE MEJORA

**Secciones que FALTAN o tienen DEFICIENCIAS**:
1. [Sección]: [Qué falta específicamente]
2. [Sección]: [Qué falta específicamente]
3. [...]

**Acciones correctivas requeridas**:
1. [Acción 1]: [Descripción clara de qué hacer]
2. [Acción 2]: [Descripción clara de qué hacer]
3. [...]

**Responsable de corrección**: ________________  
**Fecha de corrección comprometida**: ________________  
**Fecha de re-auditoría**: ________________

---

## CERTIFICACIÓN

🔏 **Auditado por**: Jorge Ángel Cortés Cartagena (T.P. 365.594)  
📅 **Fecha de auditoría**: ________________  
✍️ **Firma/Validación**: ________________  

**Skill**: [nombre]  
**Versión**: [número]  
**Resultado**: ✅ CONFORME / ⚠️ CONDICIONAL / 🟠 REQUIERE REVISIÓN / 🔴 NO CONFORME

---

## CÓMO USAR ESTE CHECKLIST

1. **Imprimir o copiar** este checklist
2. **Completar** todas las secciones (I-VIII)
3. **Contar** items con resultado "SÍ" en cada sección
4. **Calcular** porcentaje final
5. **Clasificar** como CONFORME, CONDICIONAL, etc.
6. **Documentar** hallazgos y plan de mejora
7. **Archivar** checklist completado con skill
8. **Re-auditar** después de correcciones

