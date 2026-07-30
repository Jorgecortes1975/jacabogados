# PLAN DE MEJORA VERIDICO — JAC Ecosystem v1.1

**Fecha**: 16 de Julio, 2026
**Principio**: SOLO acciones verificables + test suite completo
**Responsable**: Anti-hallucination v4.2 obligatorio

---

## FASE 1: AUDITORÍA EXHAUSTIVA (EN PROGRESO)

**Agente**: Auditor independiente analizando claudeforlegalmain sin alucinaciones

**Objetivos Auditoría**:
- [x] Mapear estructura exacta (carpetas, archivos reales)
- [x] Inventariar skills existentes (con rutas)
- [x] Verificar 16-component protocol en cada skill
- [x] Contar guardias, ACTA, test suite implementados
- [x] Identificar errores concretos (línea número)
- [x] Documentar gaps explícitos (no inventados)
- [ ] **PENDING**: Resultado auditoría

**Criterios Anti-Hallucination**:
✅ TODO reportado con ruta exacta archivo
✅ Errores citados con línea específica
✅ Gaps listados como "NO ENCONTRADO" (no especulación)
✅ Capacidades solo si verificables en código

---

## FASE 2: MEJORA BASADA EN AUDITORÍA

### 2A. Skills Base (31 implementados, verificar funcionamiento)

**Acciones por Skill**:

Para CADA skill en `/home/user/jacabogados/.claude/skills/`:

#### Paso 1: Verificación Estructura (ACTA 16-punto)
```
✅ (1) Archivo SKILL.md existe? → Leer
✅ (2) Contiene 16-component protocol? → Verificar secciones 1-16
✅ (3) Guardias automáticas N listadas? → Contar y verificar
✅ (4) ACTA checklist? → Contar puntos
✅ (5) Test Suite? → Contar casos
✅ (6) Anti-Hallucination integrado? → Buscar "v4.2" o validación
✅ (7-10) Responsable, entregable, cierre, integración?
✅ (11-16) [Otros 6 puntos ACTA]
```

#### Paso 2: Verificación Funcionamiento
```
SI test suite existe:
  - Leer TODOS los casos (contar N)
  - Validar que son reales (no placeholder)
  - Ejecutar si es posible (reportar PASS/FAIL)

SI test suite NO existe:
  - CREAR 8-17 casos reales colombianos
  - Documentar entrada/salida esperada
  - Incluir edge cases
```

#### Paso 3: Verificación Anti-Hallucination
```
PARA CADA CITA (ley, jurisprudencia, concepto):
  - ¿Es verificable en fuente oficial?
    - Ley → Diario Oficial, Congreso
    - Jurisprudencia → Tribunal específico, radicado
    - Concepto → Texto legal exacto
  - Si NO verificable → MARCAR como "INTERPRETACIÓN"
  - Agregar Matriz Confianza: ALTA/MEDIA/BAJA
```

#### Paso 4: Documentar Estado Actual
```
Crear ESTADO-SKILL-{CODIGO}.md:
  - Verificación date
  - 16-component: X/16 ✅
  - Guardias: N implementadas
  - ACTA: M/16 puntos cumplidos
  - Test Suite: K/K casos PASS
  - Anti-Hallucination: SÍ/NO/PARCIAL
  - Errores encontrados: [lista]
  - Recomendaciones: [lista]
  - Próximo paso: [acción]
```

### 2B. Agentes Core (5 implementados, verificar existencia real)

**Agentes a verificar**:
1. lexa_router → `/home/user/jacabogados/.claude/agents/lexa_router.md`
2. control_entrada → `/home/user/jacabogados/.claude/agents/control_entrada.md`
3. auditor_control_final → `/home/user/jacabogados/.claude/agents/auditor_control_final.md`
4. auditor_redaccion → `/home/user/jacabogados/.claude/agents/auditor_redaccion.md`
5. socio_director → `/home/user/jacabogados/.claude/agents/socio_director.md`

**Verificación por Agente**:
- ¿Archivo existe? (ruta exacta)
- ¿Contiene misión clara?
- ¿Integración definida? (qué skills invoca)
- ¿Responsable identificado?
- ¿Test casos para agente?

### 2C. Comandos CLI (24 mapeados, verificar conectividad)

**Archivo**: `/home/user/jacabogados/.claude/commands/`

**Verificación**:
```
PARA CADA comando:
  - Archivo existe? (ej: /auditar.md)
  - ¿Mapea a skill real? (verificar en settings.json)
  - ¿Skill mapeado existe realmente? (verificar archivo)
  - Descripción clara? (qué hace)
  - Ejemplo de uso?
```

### 2D. Configuración Central

**Archivo**: `/home/user/jacabogados/.claude/settings.json`

**Verificación**:
- Todos los 24 comandos listados?
- Todos los 31 skills referenciados?
- 5 agentes core listados?
- MCP servers configurados? (notebooklm, Google)
- Quality gates definidas? (entry, intermediate, final)
- Protocols definidas? (Alta Corte, Anti-Hallucination v4.2, FLUJO-INTEGRADO)

---

## FASE 3: CREACIÓN DE AGENTES FALTANTES (36 PENDIENTES)

**Criterio Anti-Hallucination**: SOLO crear agentes que sean:
1. Explícitamente solicitados en LEXA-LAB inventory
2. Claramente necesarios (no especulativo)
3. Funcionales (no placeholder)
4. Probados (ACTA 16-punto + Test Suite)

### Agentes Prioritarios (10-12 esta semana)

#### Auditor Especializados (5)
```
[ ] auditor_laboral
    - Audita documentos derecho laboral
    - Verifica CST, Ley 1562/2012, Decreto 1072
    - ACTA 16-punto, 10 test cases
    - Test: revisar contrato indefinido, liquidación, prestaciones

[ ] auditor_tributario
    - Audita análisis tributarios
    - Verifica DIAN, Estatuto Tributario, cálculos
    - ACTA 14-punto, 12 test cases
    - Test: IR/IVA liquidación, retenciones

[ ] auditor_mercantil
    - Audita documentos comerciales
    - Verifica código de comercio, sociedades
    - ACTA 13-punto, 9 test cases

[ ] auditor_probatorio
    - Audita evidencia en litigio
    - Verifica CPC, cadena custodia, pruebas
    - ACTA 15-punto, 15 test cases

[ ] auditor_ugpp
    - Audita pensiones y UGPP
    - Verifica Ley 100, reformas, transiciones
    - ACTA 14-punto, 11 test cases
```

#### Investigadores (2-3)
```
[ ] legal_researcher
    - Busca jurisprudencia por tema
    - Integra con anti-hallucination-v4
    - Retorna citas OSCOLA verificables
    - ACTA 12-punto, 8 test cases

[ ] investigador-contenido-lexa
    - Investiga contenido normativo específico
    - Busca en oficial + jurisprudencia
    - ACTA 11-punto, 10 test cases
```

#### Redactores Especializados (2-3)
```
[ ] redactor_compraventa_medellin
    - Redacta contratos compraventa jurisdicción Medellín
    - Cumple protocolo notarial
    - ACTA 13-punto, 8 test cases

[ ] redactor_forense
    - Redacta peritajes y pruebas periciales
    - Cumple estándares judicial
    - ACTA 14-punto, 9 test cases
```

---

## FASE 4: INTEGRACIÓN CON LEXIUS

**Status Actual**: ✅ LEX-026 (Consultor Legal Lexius) 100% funcional

**Integraciones Requeridas**:

### 4A. Integración analisis-caso
```
TRIGGER: analisis-caso detecta que necesita fundametnación legal
ACTION:
  1. Invoca LEX-026.search(tipo='NORMA', query=identificado)
  2. Retorna REPORTE-LEXIUS con ACTA 15-punto
  3. Si confianza < MEDIA → BLOQUEA (requiere verificación)
  4. Si confianza ALTA → integra directo en análisis
  
TEST:
  - Caso laboral: busca CST, integra en análisis
  - Caso tributario: busca Estatuto Tributario, integra
  - Verificar que ACTA se propaga
```

### 4B. Integración redaccion-informes
```
TRIGGER: redaccion identifica cita necesaria
ACTION:
  1. Invoca LEX-026.search(tipo='JURISPRUDENCIA', query=radicado)
  2. Genera cita OSCOLA verificable
  3. Integra con URL Lexius + verificación oficial
  4. Bloquea si confianza BAJA sin advertencia

TEST:
  - Documento cliente: cita Corte Constitucional
  - Informe interno: cita jurisprudencia regional
  - Validar OSCOLA format
```

### 4C. Integración anti-hallucination-v4
```
TRIGGER: anti-hallucination valida citas en documento
ACTION:
  1. Si cita es de Lexius → VERDE ✅ (ya verificada)
  2. Si cita es de otra fuente → validar en oficial
  3. Marcar en Matriz Confianza
  4. Retornar VERDE/AMARILLO/ROJO

TEST:
  - 10 citas legales verdaderas → VERDE
  - 5 citas con fuentes dudosas → AMARILLO
  - 3 citas inventadas → ROJO
```

---

## FASE 5: VALIDACIÓN FINAL (PRE-ENTREGA)

### 5A. Test Suite Completo

Para CADA skill/agente mejorado:
```
✅ Crear 8-17 test cases reales
✅ Documentar entrada/salida esperada
✅ Ejecutar y verificar PASS
✅ Si FAIL → documentar error + solucionar
✅ Reporte: X/Y PASS (X% success rate)
```

### 5B. Anti-Hallucination Verificación

Para TODO documento entregable:
```
✅ Matriz Confianza 100% completa
✅ Cada cita tiene fuente verificable
✅ ACTA 16-punto completado
✅ Sin interpretaciones no documentadas
✅ Protocolo Alta Corte aplicado
```

### 5C. Documentación Actualizada

```
✅ SKILL.md → actualizado
✅ README → uso y ejemplos
✅ Test results → adjuntos
✅ ACTA → 14/16 mínimo
✅ Responsable → identificado
```

---

## CRONOGRAMA

| Fase | Tarea | Días | Start | End | Status |
|------|-------|------|-------|-----|--------|
| 1 | Auditoría exhaustiva | 1 | Hoy | Hoy | 🔄 IN-PROGRESS |
| 2A | Verificar 31 skills | 5 | Mañana | Miércoles | ⏳ PENDING |
| 2B | Verificar 5 agentes | 1 | Miércoles | Miércoles | ⏳ PENDING |
| 2C | Verificar 24 comandos | 1 | Jueves | Jueves | ⏳ PENDING |
| 2D | Revisar settings.json | 0.5 | Viernes | Viernes | ⏳ PENDING |
| 3 | Crear 10-12 agentes | 5 | Sábado | Miércoles | ⏳ PENDING |
| 4 | Integrar Lexius | 3 | Jueves | Sábado | ⏳ PENDING |
| 5 | Validación final | 2 | Domingo | Lunes | ⏳ PENDING |

**Total**: 2-3 semanas (intensivo, sin alucinaciones)

---

## PRINCIPIOS NO NEGOCIABLES

1. **Anti-Hallucination v4.2 Obligatorio**
   - TODO tiene fuente verificable
   - Matriz Confianza en CADA documento
   - Sin interpretaciones inventadas

2. **ACTA 16-Punto Mínimo**
   - 14/16 para PROFESIONAL
   - 15/16 para PREMIUM
   - < 8/16 → RECHAZAR

3. **Test Suite Antes de Instalar**
   - 8-17 casos por skill
   - 100% de casos PASS requerido
   - Edge cases incluidos

4. **Responsabilidad Clara**
   - Cada skill/agente tiene responsable
   - Firma de revisor antes de entregar cliente
   - Auditoría trimestral obligatoria

5. **Sin Credenciales Hardcodeadas**
   - Variables .env.local SOLO
   - .gitignore protege secretos
   - Logging sin exponer datos

---

## SIGUIENTE PASO

**ESPERAR RESULTADO AUDITORÍA** (agente en background analizando claudeforlegalmain)

Una vez auditoría complete:
1. Reportar hallazgos VERIFICABLES
2. Priorizar mejoras basadas en gaps REALES
3. Crear agentes FALTANTES (no especulativos)
4. Integrar verificablemente
5. Test Suite ANTES de instalar

**NO proceder con mejoras hasta tener mapa exacto de qué existe.**

---

**Principio**: VERDAD > Velocidad
**Criterio**: Verificable > Especulativo
**Estándar**: ACTA 16-punto + Test Suite + Anti-Hallucination v4.2

---

**Responsable**: Jorge Ángel Cortés Cartagena, T.P. 365.594
**Versión**: 1.0 — Julio 16, 2026
**Estado**: ⏳ ESPERANDO AUDITORÍA
