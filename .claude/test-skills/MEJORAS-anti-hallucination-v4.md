# MEJORAS A anti-hallucination-v4
## Guardias Automáticas | Ejecución Forzada | Detección de Inservibilidad

**Versión**: 4.1 (Enhancement)  
**Estatus**: PROPUESTA DE IMPLEMENTACIÓN  
**Fecha**: Julio 2026

---

## PROBLEMA IDENTIFICADO

El skill v4.0 **depende de activación explícita**. El usuario puede:
- Entregar documento sin mencionar validación
- Recibir respuesta incompleta o con alucinaciones
- No recibir rechazo de contenido inservible
- Requerir "máximo nivel" para forzar ejecución completa

**Solución**: Convertir a modo **EJECUCIÓN AUTOMÁTICA Y OBLIGATORIA** con guardias que detengan y rechacen contenido comprometido.

---

## MEJORA 1: ACTIVACIÓN AUTOMÁTICA (Siempre activo)

### Cambio en descripción del skill:

**ANTES**:
```
Activar ante: verifica, valida esto, revisa antes de radicar, existe esta sentencia...
SIEMPRE activar de forma automática antes de entregar cualquier documento jurídico complejo
```

**DESPUÉS**:
```
ACTIVACIÓN AUTOMÁTICA Y OBLIGATORIA — No requiere mención explícita.

Este skill se ACTIVA AUTOMÁTICAMENTE cada vez que:
1. Se entrega, genera, recibe o revisa CUALQUIER documento jurídico (análisis, concepto, escrito, contrato, dictamen)
2. Se solicita opinión legal sobre tema normativo en Colombia
3. Se presentan cifras, hechos o jurisprudencia en contexto legal

La activación es INCONDICIONAL. No depende de mención explícita del usuario.
No existe urgencia, brevedad ni instrucción que justifique omitir el protocolo.

RESULTADO: El usuario recibe SIEMPRE la validación completa (6 operaciones + acta de control)
o bien recibe RECHAZO motivado de contenido comprometido.
```

---

## MEJORA 2: GUARDIAS CONTRA ALUCINACIONES (Detección automática)

Insertar NUEVA SECCIÓN después de "PROTOCOLO OPERATIVO":

```markdown
## GUARDIAS AUTOMÁTICAS — DETENCIÓN DE CONTENIDO COMPROMETIDO

Antes de ejecutar reencuadre o certificación, el skill aplica estos **filtros de parada**:

### GUARDIA 1: Alucinación jurisprudencial múltiple
**CONDICIÓN**: El documento contiene 2 o más referencias jurisprudenciales que no pueden verificarse 
en Legal Data Hunter o fuentes oficiales.

**ACCIÓN INMEDIATA**: PARADA OBLIGATORIA
```
RECHAZO DE DOCUMENTO — GUARDIA ACTIVADA
Motivo: Alucinación jurisprudencial múltiple (≥2 referencias no verificables)
Riesgo disciplinario: Art. 1281 Código Disciplinario (falseamiento de citas, deshonestidad)
Qué se requiere: Eliminar TODAS las referencias no verificadas u aportar fallos de Relatoria oficial.
Alternativa: Reescribir sección sin jurisprudencia dudosa.
Estado: 🔴 RECHAZADO — No se procesa más.
```

---

### GUARDIA 2: Datos cliente no sustituidos
**CONDICIÓN**: Presencia de cualquier placeholder, variable anonimizada o marcador de tipo [CLIENTE_*], [EMPRESA_*], etc.

**ACCIÓN INMEDIATA**: PARADA OBLIGATORIA
```
RECHAZO DE DOCUMENTO — GUARDIA ACTIVADA
Motivo: Datos de cliente anonimizados no sustituidos
Riesgo: Documento inútil e inutilizable. Protección de datos (Ley 1581/2012).
Hallazgos: [lista exact de placeholders sin sustituir]
Qué se requiere: Sustituir TODOS los placeholders con datos reales verificados.
Estado: 🔴 RECHAZADO — Documento no procesa hasta corrección.
```

---

### GUARDIA 3: Completitud mínima no alcanzada
**CONDICIÓN**: Documento jurídico con menos de estas estructuras OBLIGATORIAS:
- ✓ HECHOS (al menos 3 párrafos para asuntos complejos)
- ✓ NORMA APLICABLE (al menos 1 artículo citado con número exacto)
- ✓ ANÁLISIS (conexión explícita entre hechos y norma)
- ✓ CONCLUSIÓN (respuesta directa a la pregunta o pretensión)

**ACCIÓN INMEDIATA**: PARADA + REENCUADRE FORZADO
```
CORRECCIÓN ACTIVA — GUARDIA ACTIVADA
Vicio: Incompletitud estructural crítica
Componentes detectados: [listar los que faltan]
Acción: Se generan secciones faltantes CON ESTA FÓRMULA:
  [GENERADO POR GUARDIA 3 — Requiere validación JAC antes de radicar]
  [Tipo de sección faltante]: [contenido base sin invención]
Responsabilidad: Jorge Ángel Cortés Cartagena debe revisar y aprobar las secciones generadas.
```

---

### GUARDIA 4: Contradicción interna detectada
**CONDICIÓN**: Dos o más afirmaciones directamente contradictorias en el mismo documento 
(ej: "hay derecho" vs "no hay derecho", "norma vigente" vs "norma derogada").

**ACCIÓN INMEDIATA**: PARADA OBLIGATORIA
```
CORRECCIÓN ACTIVA — GUARDIA ACTIVADA
Vicio: Incoherencia interna crítica
Contradiciones identificadas:
  [Sección A, línea X]: "[Afirmación 1]"
  [Sección B, línea Y]: "[Afirmación contradictoria]"
Acción: Ambas afirmaciones no pueden coexistir en documento enviado.
Se requiere: Identificar cuál es la afirmación correcta (verificar contra normativa).
Reencuadre: Se mantendrá versión correcta; se elimina o corrije la falsa.
Responsabilidad JAC: Validar cuál prevalece antes de radicar.
```

---

### GUARDIA 5: Cifra o cálculo no verificable
**CONDICIÓN**: Documento presenta cuantía, liquidación, interés u otro cálculo matemático 
sin mostrar base de cálculo, paso a paso, o con cifra que no coincide con verificación independiente.

**ACCIÓN INMEDIATA**: PARADA + RECALCULO
```
CORRECCIÓN ACTIVA — GUARDIA ACTIVADA
Vicio: Alucinación aritmética o cálculo no verificable
Cifra indicada: $[cantidad]
Verificación independiente: $[cantidad calculada]
¿Coinciden? ⬜ SÍ ⬜ NO

Si NO coinciden:
  Fragmento original: "[cifra presentada]"
  Cálculo correcto: [paso 1] → [paso 2] → [resultado verificado]
  Base de cálculo: [explicación de parámetros: salario, período, tasa, ley/jurisprudencia aplicable]
  
Si NO hay base de cálculo visible:
  Acción: BLOQUEAR cifra como [No verificado].
  Requerimiento: Aportar cálculo paso a paso con fuente de cada parámetro.
```

---

### GUARDIA 6: Información fáctica no respaldada
**CONDICIÓN**: Documento afirma "el cliente fue despedido", "la empresa no pagó", "hubo accidente" 
u otros hechos sin referencia a documento del expediente que lo acredite.

**ACCIÓN INMEDIATA**: REENCUADRE FORZADO + ETIQUETADO
```
CORRECCIÓN ACTIVA — GUARDIA ACTIVADA
Vicio: Alucinación fáctica
Fragmento original: "[hecho afirmado]"
Acción: Se reetiqueta con:
  [Afirmado] — Relatado por el cliente. Gestión pendiente: Obtener [documento específico].
  o
  [Inferencia] — Deducción de [hechos probados X, Y, Z].
  o
  ELIMINAR si no hay base mínima en expediente.

Regla: Todo hecho debe estar acreditado o declararse explícitamente como alegación sin prueba.
No puede presentarse como verdad factuales no verificadas.
```

---

## MEJORA 3: MODO "MÁXIMO NIVEL" COMO PARÁMETRO INNECESARIO

### Cambio:

**ANTES**: "Ejecutar a máximo nivel requiere mención explícita del usuario"

**DESPUÉS**: 
```
MÁXIMO NIVEL = NIVEL ESTÁNDAR (no hay distinción)

El skill SIEMPRE ejecuta con estas profundidades:
- Verificación: 100% contra fuentes (Legal Data Hunter + web_search + web_fetch)
- Reencuadre: Automático de todo vicio subsanable
- Rechazo: Inmediato de vicio crítico no subsanable
- Acta de control: Siempre incluida, sin excepto

No existe "nivel básico" vs "nivel máximo". Existe "operativo" vs "no operativo".

Si el usuario dice "sin revisar a fondo" o "solo una primera opinión rápida", 
el skill responde:
  [IMPOSIBLE] — Protocolo anti-hallucination no admite "revisión parcial" en materia jurídica.
  Si necesita análisis preliminar rápido, use otro recurso. Este skill valida para radicar.
```

---

## MEJORA 4: RECHAZO AUTOMÁTICO DE DOCUMENTO "INSERVIBLE"

Agregar nueva sección:

```markdown
## CRITERIOS DE INSERVIBILIDAD — RECHAZO AUTOMÁTICO

Un documento se considera INSERVIBLE (rechazo inmediato, sin intento de reencuadre) si:

| Criterio | Ejemplos | Acción |
|----------|----------|--------|
| Alucinación jurisprudencial ≥2 | Sentencias inventadas, radicados falsos, ratios no verificables | RECHAZO INMEDIATO |
| Datos cliente sin sustituir | [CLIENTE_NOMBRE], [EMPRESA_ID] sin reemplazo | RECHAZO INMEDIATO |
| Contradicción interna no resoluble | "hay derecho" AND "no hay derecho" simultáneamente, sin una versión correcta clara | RECHAZO INMEDIATO |
| Completitud <50% de estructura requerida | Falta HECHOS, falta NORMA, falta CONCLUSIÓN, falta 2+ componentes críticos | RECHAZO + REENCUADRE FORZADO |
| Cálculos sin base verificable ≥2 cifras | Liquidación de $X sin paso a paso, salario no referenciado, tasas de interés sacadas de la nada | CORRECCIÓN ACTIVA + BLOQUEO |
| Jurisprudencia usada sin verificación | Sentencia citada "según tengo entendido" o "probablemente" | ELIMINAR cita o RECHAZO de sección |

---

## MEJORA 5: PROTOCOLO DE PARADA Y ROLLBACK

Insertar nueva sección:

```markdown
## PROTOCOLO DE PARADA OBLIGATORIA

El skill puede, en cualquier momento de la validación, DETENER completamente 
el procesamiento si detecta:

1. **Riesgo disciplinario**: Documento que radicar expone al abogado a proceso disciplinario 
   (falsedad de citas, falsedad de hechos, protección de datos comprometida).
2. **Riesgo procesal**: Documento que radicar puede ser rechazado o sancionado en juzgado.
3. **Vicios críticos múltiples**: 2+ vicios de nivel CRÍTICO en la misma sección.

**FÓRMULA OBLIGATORIA DE PARADA**:

```
PARADA OBLIGATORIA — DOCUMENTO BLOQUEADO
Motivo(s): [lista vicios que justifican parada]
Riesgo asociado: [disciplinario / procesal / integridad documental]
Certificación: 🔴 DOCUMENTO NO RADICAR EN NINGÚN CASO
Qué se requiere para reintentar: [especificar pasos de corrección]
Responsable de validación posterior: Jorge Ángel Cortés Cartagena (T.P. 365.594)
Este documento no puede avanzar, no puede consultarse con cliente, no puede entregarse.
Debe ser reescrito completamente o abandonado.
```

---

## MEJORA 6: INTEGRACIÓN CON HOOKS DE CLAUDE CODE

Si el proyecto usa `.claude/settings.json` con hooks, agregar:

```json
{
  "hooks": {
    "document_submit": {
      "description": "Antes de radicar cualquier documento jurídico",
      "command": "Ejecutar skill anti-hallucination-v4 automáticamente. No permitir avance sin certificación APTO.",
      "blocking": true
    },
    "analysis_generation": {
      "description": "Cada vez que se genera análisis legal",
      "command": "anti-hallucination-v4 automático. Si resultado es CONDICIONAL o inferior, notificar a usuario antes de entrega.",
      "blocking": false
    }
  }
}
```

---

## MEJORA 7: ETIQUETA DE CONFIANZA VISIBLE

En lugar de solo incluir etiqueta en el texto, agregar al inicio del acta:

```
🔴 RIESGO DETECTADO: [lista vicios críticos, si aplica]
🟠 CONDICIONAL: [lista vicios importantes reencuadrados]
🟡 OBSERVACIONES: [lista vicios recomendados subsanados]
🟢 CONFIANZA TOTAL: Todos los puntos superados sin vicios.

SÍMBOLO FINAL: 
  ✅ APTO PARA RADICAR
  ⚠️ CONDICIONAL (subsanar antes de entrega)
  🟠 REQUIERE REVISIÓN (corrección sustancial)
  🔴 SUSPENDIDO (vicio crítico sin resolver)
  🚫 RECHAZADO (documento comprometido, reescribir)
```

---

## MEJORA 8: FAIL-SAFE SI HERRAMIENTAS NO ESTÁN DISPONIBLES

Modificar sección "Protocolo Operativo de Verificación":

```markdown
Si Legal Data Hunter, web_search o web_fetch NO están disponibles en la sesión:

1. El skill NO ASUME nada como verificado.
2. Marca TODOS los puntos de control como [REQUIERE VALIDACIÓN JAC].
3. Emite certificación CONDICIONAL, no APTO.
4. Acta de control declara: "Validación incompleta por indisponibilidad de herramientas de verificación."
5. El documento puede avanzar SOLO si el usuario (Jorge Ángel Cortés Cartagena) lo valida manualmente.

NUNCA se emite APTO si la validación fue parcial por falta de herramientas.
```

---

## RESUMEN DE IMPACTO

| Aspecto | ANTES (v4.0) | DESPUÉS (v4.1) |
|--------|------------|----------|
| **Activación** | Requiere mención explícita | Automática y obligatoria |
| **Nivel de detalle** | Depende de petición del usuario | Siempre máximo (estándar) |
| **Alucinaciones** | Se detectan pero requiere corrección manual | Se detienen automáticamente con GUARDIA |
| **Contenido inservible** | Se procesa y entrega parcialmente | Se rechaza inmediatamente sin procesamiento |
| **Completitud** | Se marca como incompleta | Se reencuadra o rechaza automáticamente |
| **Acta de control** | Incluida si se pide | Obligatoria en TODAS las salidas |
| **Garantía de funcionamiento** | Depende de usuario | Sistema robusto con fail-safes |

---

## IMPLEMENTACIÓN

Estos cambios se implementan en **SKILL.md** reescribiendo:

1. Encabezado YAML (descripción)
2. Sección "Naturaleza operativa"
3. Agregar nueva sección "Guardias automáticas"
4. Agregar nueva sección "Criterios de inservibilidad"
5. Agregar nueva sección "Protocolo de parada obligatoria"
6. Modificar "Protocolo operativo" con fail-safe
7. Modificar "Certificación final de calidad" con símbolos y cambio de lógica

**Archivo actualizado se llamará**: `anti-hallucination-v4-enhanced.md`  
**Será reemplazo directo de** `SKILL.md`

