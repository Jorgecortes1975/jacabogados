---
name: anti-hallucination-v4
description: >
  Skill operativo AUTOMÁTICO Y OBLIGATORIO de control de calidad jurídica
  transversal. NO REQUIERE ACTIVACIÓN EXPLÍCITA — Se ejecuta automáticamente
  CADA VEZ que se entrega, genera o revisa CUALQUIER documento jurídico
  (análisis, concepto, escrito, contrato, dictamen). Validación FORZADA de
  todos los 12 puntos de control contra fuentes primarias (Legal Data Hunter,
  web_search, web_fetch). RECHAZA INMEDIATAMENTE: alucinaciones jurisprudenciales
  múltiples, datos cliente sin sustituir, contradicciones irresolubles,
  incompletitud crítica. REENCUADRA automáticamente vicios subsanables con
  trazabilidad completa. ACTA DE CONTROL obligatoria en TODAS las salidas.
  Certificación final: ✅ APTO / ⚠️ CONDICIONAL / 🟠 REQUIERE REVISIÓN /
  🔴 SUSPENDIDO / 🚫 RECHAZADO. Sin herramientas de verificación: marca todo
  como [REQUIERE VALIDACIÓN JAC], nunca asume vigencia. Imposible omitir o
  saltarse — no existe urgencia ni instrucción que lo justifique.
---

# ANTI-HALLUCINATION v4.1
## Skill Operativo AUTOMÁTICO de Control de Calidad Jurídica Transversal — Bufete Cortés Cartagena

**Abogado titular:** Jorge Ángel Cortés Cartagena — T.P. 365.594
**Versión:** 4.1 — Julio 2026 — MEJORADA con ejecución automática, guardias contra alucinaciones, rechazo de contenido inservible
**Versión anterior:** 4.0 — retirada
**Naturaleza:** Skill EJECUTORA AUTOMÁTICA con fail-safes. Activación incondicional. No explica cómo verificar: verifica sin pedirlo.

---

## POR QUÉ EXISTE ESTE MÓDULO

Los modelos de lenguaje predicen texto plausible, no texto verdadero. Un modelo puede generar el nombre de un fallo, su radicado y artículos que suenan perfectamente correctos pero que no existen o que ya no rigen. En materia jurídica ese error no es un inconveniente estilístico: es un riesgo disciplinario, procesal y patrimonial.

**Regla absoluta del ecosistema:** ningún documento jurídico abandona el despacho, se remite a un cliente o se radica ante autoridad sin pasar por este skill. La regla es incondicional, con independencia de la urgencia declarada.

---

## NATURALEZA OPERATIVA — QUÉ HACE ESTE SKILL EN CADA ACTIVACIÓN

**ACTIVACIÓN AUTOMÁTICA Y OBLIGATORIA**

Este skill se ejecuta AUTOMÁTICAMENTE cada vez que se entrega, genera o revisa:
- Cualquier texto jurídico (análisis, concepto, escrito, contrato, dictamen, consulta)
- Cualquier afirmación normativa o jurisprudencial en contexto legal colombiano
- Cualquier cifra, cálculo, dato o hecho en materia legal

NO requiere mención explícita. NO depende de "máximo nivel" ni petición especial. La ejecución es INCONDICIONAL, sin excepto por urgencia.

---

**EJECUCIÓN: SEIS OPERACIONES EN ORDEN OBLIGATORIO**

Cuando se procesa un texto, ejecuta en este orden — no es opcional saltar pasos:

1. **REVISAR** — Leer completo e inventariar: cada norma, cada cita jurisprudencial, cada hecho, cada cifra.
2. **VALIDAR** — Verificar cada elemento contra fuente oficial vigente (protocolo siguiente), NO contra memoria del modelo.
3. **IDENTIFICAR VICIOS Y ERRORES** — Clasificar hallazgos negativos según matriz de vicios.
4. **REENCUADRAR** — Corregir vicios subsanables con trazabilidad completa de cambio + razón.
5. **RECHAZAR** — Cuando vicio no es subsanable o compromete integridad del documento.
6. **CERTIFICAR** — Emitir acta de control + certificación final (APTO / CONDICIONAL / REQUIERE REVISIÓN / SUSPENDIDO / RECHAZADO).

---

## GUARDIAS AUTOMÁTICAS — DETENCIÓN INMEDIATA DE CONTENIDO COMPROMETIDO

Antes de procesar cualquier documento, el skill aplica estos **filtros de parada obligatoria**. Si se activa una guardia, la ejecución se DETIENE inmediatamente sin intento de reencuadre.

### GUARDIA 1: Alucinación jurisprudencial múltiple (≥2 referencias no verificables)
**CONDICIÓN**: Documento contiene 2+ sentencias, radicados o ratios que NO aparecen en Legal Data Hunter ni en fuentes oficiales.

**ACCIÓN INMEDIATA**:
```
🚫 RECHAZO DE DOCUMENTO — GUARDIA 1 ACTIVADA
Motivo: Alucinación jurisprudencial múltiple
Riesgo: Art. 1281 Código Disciplinario (falseamiento de citas, deshonestidad)
Citas no verificadas: [lista exacta]
Qué se requiere: Eliminar TODAS las referencias dudosas u aportar fallos verificados de Relatoria oficial.
Estado: DOCUMENTO BLOQUEADO — No procesa más.
Certificación: 🚫 RECHAZADO
```

---

### GUARDIA 2: Datos cliente sin sustituir (placeholders activos)
**CONDICIÓN**: Presencia de [CLIENTE_*], [EMPRESA_*], [PERSONA_*], o cualquier marcador anonimizado sin reemplazo.

**ACCIÓN INMEDIATA**:
```
🚫 RECHAZO DE DOCUMENTO — GUARDIA 2 ACTIVADA
Motivo: Datos cliente anonimizados SIN SUSTITUIR
Riesgo: Documento inutilizable. Ley 1581/2012 (protección de datos).
Placeholders encontrados: [lista exacta]
Qué se requiere: Sustituir TODOS con datos reales verificados antes de procesar.
Estado: DOCUMENTO BLOQUEADO — No puede avanzar.
Certificación: 🚫 RECHAZADO
```

---

### GUARDIA 3: Contradicción interna IRRE SOLUBLE
**CONDICIÓN**: Dos+ afirmaciones directamente contradictorias (ej: "hay derecho" AND "no hay derecho" sin jerarquía clara).

**ACCIÓN INMEDIATA**:
```
🚫 RECHAZO DE DOCUMENTO — GUARDIA 3 ACTIVADA
Motivo: Incoherencia interna irresolubleContradicciones identificadas:
  [Sección A]: "[Afirmación 1]"
  [Sección B]: "[Afirmación contradictoria]"
Acción: No pueden coexistir en mismo documento.
Qué se requiere: Identificar cuál es correcta (verificar contra normativa). Eliminar o corregir la falsa.
Responsabilidad: JAC debe validar cuál prevalece antes de radicar.
Estado: DOCUMENTO BLOQUEADO — Requiere resolución de contradicción.
Certificación: 🚫 RECHAZADO
```

---

### GUARDIA 4: Completitud mínima crítica <50%
**CONDICIÓN**: Documento carece de 3+ componentes OBLIGATORIOS:
- ✗ HECHOS (menos de 3 párrafos para asunto complejo)
- ✗ NORMA APLICABLE (sin artículos citados o números imprecisos)
- ✗ ANÁLISIS (sin conexión explícita hechos↔norma)
- ✗ CONCLUSIÓN (sin respuesta directa a pregunta)

**ACCIÓN INMEDIATA**:
```
🟠 CORRECCIÓN ACTIVA — GUARDIA 4 ACTIVADA
Vicio: Incompletitud estructural crítica
Componentes FALTANTES: [lista exacta]
Acción: Se generan secciones faltantes BASADAS EN MATERIALES APORTADOS.
⚠️ SECCIÓN GENERADA — Requiere validación JAC antes de radicar.
Responsabilidad: Jorge Ángel Cortés Cartagena DEBE revisar, validar y aprobar.
Certificación: 🟠 REQUIERE REVISIÓN (no APTO hasta validación JAC)
```

---

### GUARDIA 5: Cálculos múltiples sin base verificable (≥2 cifras)
**CONDICIÓN**: Documento presenta 2+ cuantías, liquidaciones o cálculos sin mostrar base, pasos, o con errores aritmético verificables.

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 5 ACTIVADA
Vicio: Alucinación aritmética / cálculos no verificables
Cifras analizadas: [lista]
Para cada cifra:
  Indicada: $[cantidad]
  Verificación independiente: $[cantidad calculada]
  ¿Coinciden? SÍ / NO
Si NO coinciden → Recálculo con base verificable.
Si NO hay base → Marcado como [No verificado], BLOQUEADO hasta aportar base.
Certificación: ⚠️ CONDICIONAL (subsanar cálculos antes de entrega)
```

---

### GUARDIA 6: Información fáctica no acreditada
**CONDICIÓN**: Documento afirma hecho (despido, accidente, incumplimiento) sin referencia a expediente que lo acredite y sin etiquetación como [Afirmado].

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 6 ACTIVADA
Vicio: Alucinación fáctica
Hecho no acreditado: "[texto exacto]"
Acción: Reetiquetación obligatoria:
  [Afirmado] — Relatado por cliente. Gestión pendiente: Obtener [documento específico].
  o
  [Inferencia] — Deducción de hechos probados X, Y, Z.
  o
  ELIMINAR si no hay base mínima en expediente.
Certificación: ⚠️ CONDICIONAL (subsanar etiquetación y gestión probatoria)
```

---

## LOS 12 PUNTOS DE CONTROL

Cada punto se verifica de forma independiente. La verificación no es retórica: exige, según el punto, la consulta efectiva de una fuente externa.

| N.º | Nivel | Punto de control | Verificación exigida |
|---|---|---|---|
| 01 | CRÍTICO | Citas jurídicas reales | Confirmar existencia exacta de cada norma y sentencia citada contra fuente primaria. |
| 02 | CRÍTICO | Vigencia normativa | Confirmar que la norma no ha sido derogada, subrogada o modificada desde su expedición o desde el corte del modelo. |
| 03 | CRÍTICO | Jurisdicción correcta | Confirmar que no se importaron principios o cargas probatorias de otro sistema jurídico ajeno a la tradición civilista colombiana. |
| 04 | CRÍTICO | Ausencia de alucinaciones factuales | Confirmar que todo hecho afirmado está en el expediente o en la instrucción del usuario, no generado por el modelo. |
| 05 | IMPORTANTE | Coherencia interna | Confirmar que hechos, fundamentos y pretensiones o conclusiones no se contradicen entre secciones. |
| 06 | IMPORTANTE | Completitud | Confirmar que ningún componente estructural exigido por el tipo de escrito falta. |
| 07 | IMPORTANTE | Tono y registro | Confirmar que el registro corresponde al destinatario real (juez, cliente, uso interno). |
| 08 | IMPORTANTE | Datos del cliente correctos | Confirmar que los datos reales sustituyeron correctamente a cualquier dato anonimizado usado en el análisis. |
| 09 | IMPORTANTE | Cálculos aritméticos | Recalcular de forma independiente toda liquidación, interés o cuantía. |
| 10 | RECOMENDADO | Sesgo de confirmación | Confirmar que el análisis incluye la defensa o argumento contrario previsible, no solo la tesis favorable. |
| 11 | RECOMENDADO | Actualidad del criterio jurisprudencial | Confirmar que la ratio citada no ha sido superada, matizada o diferenciada por pronunciamiento posterior. |
| 12 | RECOMENDADO | Declaración de incertidumbre | Confirmar que toda incertidumbre solicitada por la instrucción quedó efectivamente declarada, y no omitida. |

---

## PROTOCOLO OPERATIVO DE VERIFICACIÓN DE VIGENCIA — CÓMO SE EJECUTA, NO SOLO SE RECOMIENDA

Este skill no se limita a advertir "verifique en fuente oficial". EJECUTA directamente la verificación:

1. **Legal Data Hunter** (`discover_sources` país `CO`, `search` en `legislation` / `case_law`, `resolve_reference` para citas exactas) es la vía PREFERENTE para confirmar existencia, texto, vigencia de normas y sentencias colombianas.
2. **web_search + web_fetch** contra dominios oficiales si Legal Data Hunter no cubre fuente puntual: suin-juriscol.gov.co, secretariasenado.gov.co, diarioficial.gov.co, corteconstitucional.gov.co/relatoria, cortesuprema.ramajudicial.gov.co, consejodeestado.gov.co, funcionpublica.gov.co, ramajudicial.gov.co.
3. **FAIL-SAFE**: Si herramientas de verificación NO están disponibles en la sesión:
   - El skill NO asume nada como verificado.
   - Marca TODOS los puntos de control como `[REQUIERE VALIDACIÓN JAC]`.
   - DECLARA EXPLÍCITAMENTE en acta de control: "Validación incompleta por indisponibilidad de herramientas."
   - Emite certificación **CONDICIONAL**, NUNCA APTO.
   - Documento puede avanzar SOLO si Jorge Ángel Cortés Cartagena (T.P. 365.594) valida manualmente.
4. Nunca se cita jurisprudencia de memoria como si fuera verificada. Solo jurisprudencia encontrada en fuente oficial o aportada por usuario.

---

## MATRIZ DE VICIOS — CLASIFICACIÓN OBLIGATORIA DE CADA HALLAZGO NEGATIVO

Todo hallazgo negativo se clasifica en uno de estos vicios antes de decidir si se reencuadra o se rechaza:

| Vicio | Definición | Tratamiento por defecto |
|---|---|---|
| Vicio de alucinación normativa | Norma, artículo o número inexistente o inexacto | Reencuadrar si es corregible con la fuente verificada; rechazar la afirmación si no lo es |
| Vicio de alucinación jurisprudencial | Sentencia, radicado o ratio inexistente o no verificable | Rechazar la cita; nunca reencuadrar sustituyendo por otra sentencia no verificada |
| Vicio de reformación no advertida | Norma o precedente vigente al corte del modelo pero derogado, modificado o superado después | Reencuadrar con `[Reformación pendiente]` y la fuente que evidencia el cambio |
| Vicio de alucinación fáctica | Hecho afirmado sin respaldo en expediente o instrucción | Reencuadrar reclasificando como `[Afirmado]` o `[Inferencia]`, o eliminar |
| Vicio de jurisdicción | Importación de instituciones o cargas de otro sistema jurídico | Reencuadrar sustituyendo por la institución colombiana equivalente |
| Vicio de incoherencia interna | Contradicción entre secciones del mismo documento | Reencuadrar unificando la versión correcta; identificar cuál sección prevalece |
| Vicio de incompletitud | Falta un componente estructural exigido | Reencuadrar generando el componente faltante; si no hay insumo suficiente, señalarlo y no inventar contenido |
| Vicio de registro | Tono inapropiado para el destinatario | Reencuadrar ajustando el registro |
| Vicio de dato de cliente | Dato anonimizado no sustituido, o dato real filtrado en versión de prueba | Rechazar la versión hasta corregir; riesgo de protección de datos (Ley 1581/2012) |
| Vicio aritmético | Error de cálculo en liquidación, interés o cuantía | Reencuadrar con el cálculo recalculado de forma independiente |
| Vicio de sesgo de confirmación | Ausencia de contraargumento o defensa previsible | Reencuadrar incorporando la contraparte del análisis |
| Vicio de incertidumbre omitida | No se declaró una incertidumbre exigida por la instrucción | Reencuadrar incorporando la declaración faltante |

---

## LAS 6 ETIQUETAS DE CERTIDUMBRE

Uso obligatorio y exclusivo para clasificar cualquier afirmación normativa, fáctica o jurisprudencial en el documento reencuadrado:

| Etiqueta | Cuándo usar | Consecuencia operativa |
|---|---|---|
| `[Acreditado]` | Soporte documental incontrovertible disponible | Usar como fundamento principal |
| `[Afirmado]` | Alegado por la parte, sin prueba suficiente aún | Usar con cautela; gestionar la prueba faltante |
| `[Controvertido]` | Disputado entre las partes | Requiere estrategia probatoria propia |
| `[Inferencia]` | Deducción lógica de hechos conocidos | Identificar como tal, nunca como hecho probado |
| `[No verificado]` | Sin soporte en los materiales aportados | No usar como fundamento principal |
| `[Reformación pendiente]` | Norma o precedente que puede haber cambiado | Validar antes de radicar; obligatorio declarar la fuente pendiente |

---

## SEMÁFORO DE CUATRO NIVELES — ESTADO DEL DOCUMENTO POR SECCIÓN

| Semáforo | Significado | Regla de avance |
|---|---|---|
| 🟢 Verde | Sección sin vicios, o solo con observaciones de nivel recomendado subsanadas | Puede avanzar sin restricción |
| 🟡 Amarillo | Vicios de nivel importante identificados y reencuadrados | Puede avanzar; queda registrado en el acta |
| 🟠 Naranja | Vicios de nivel importante sin reencuadrar, o vicio crítico ya corregido pero pendiente de validación externa | No entregar al cliente hasta subsanar o validar |
| 🔴 Rojo | Vicio crítico activo, no corregible con la información disponible | Rechazo de la sección; no puede avanzar bajo ninguna circunstancia |

---

## PROTOCOLO DE REENCUADRE — CÓMO SE CORRIGE UN VICIO SUBSANABLE

Cuando un vicio admite corrección directa, el skill interviene el propio texto con esta fórmula, sin excepción:

```
CORRECCIÓN ACTIVA
Vicio detectado: [tipo de vicio, según la matriz]
Fragmento original: "[texto exacto afectado]"
Razón de la corrección: [explicación técnica y verificable]
Texto reencuadrado: "[versión corregida]"
Fuente de verificación: [Legal Data Hunter / dominio oficial consultado / expediente aportado]
```

El reencuadre nunca sustituye una cita no verificada por otra cita también no verificada. Si no hay fuente verificable disponible para reemplazar el fragmento, el fragmento se elimina y se declara la ausencia, no se rellena con una alternativa igualmente dudosa.

---

## PROTOCOLO DE RECHAZO — CUÁNDO NO SE REENCUADRA, SE RECHAZA

El rechazo procede, íntegro o por sección, cuando concurre cualquiera de estas condiciones:

1. Dos o más vicios críticos concurrentes en la misma sección.
2. Un vicio de alucinación jurisprudencial que no puede sustituirse por una fuente verificada dentro del alcance de la sesión.
3. Un vicio de dato de cliente que compromete información real de un tercero.
4. Instrucción expresa del usuario de rechazar sin intento de corrección.

Fórmula obligatoria de rechazo:

```
RECHAZO DE SECCIÓN / DOCUMENTO
Motivo: [vicio o vicios que lo justifican, según la matriz]
Alcance del rechazo: [sección específica / documento completo]
Qué se requiere para reintentar: [información, verificación o insumo faltante]
Este contenido no debe usarse, citarse ni radicarse en su estado actual.
```

---

## FÓRMULAS ESTÁNDAR DE INCERTIDUMBRE

Para usar directamente dentro del texto reencuadrado cuando la verificación queda pendiente:

**Norma sin vigencia confirmada:**
```
[Reformación pendiente] — La [Ley/Decreto/Resolución] citada requiere verificación de
vigencia actualizada. Análisis base: [continuar con el razonamiento disponible].
Acción previa: confirmar texto vigente en SUIN-Juriscol o Diario Oficial antes de radicar.
```

**Jurisprudencia no verificada:**
```
[No verificado — No citar] — La referencia jurisprudencial indicada no fue aportada ni
verificada en fuente oficial. Para incluirla: aportar el fallo de la relatoría oficial o
confirmar su existencia mediante Legal Data Hunter antes de usarla como fundamento.
```

**Dato fáctico sin soporte:**
```
[Afirmado] — Este hecho fue relatado por el cliente pero no cuenta con soporte documental
en los materiales del caso. Gestión pendiente: obtener [documento específico] antes de
usarlo como fundamento principal.
```

---

## FUENTES PRIMARIAS OBLIGATORIAS PARA COLOMBIA

| Tipo de fuente | Dónde verificar |
|---|---|
| Leyes y decretos | suin-juriscol.gov.co · secretariasenado.gov.co |
| Publicación oficial | diarioficial.gov.co |
| Corte Constitucional (T-, C-, SU-) | corteconstitucional.gov.co/relatoria |
| Corte Suprema de Justicia (todas las salas) | cortesuprema.ramajudicial.gov.co |
| Consejo de Estado | consejodeestado.gov.co/relatorios |
| Consulta de procesos | ramajudicial.gov.co |
| Normativa administrativa / función pública | funcionpublica.gov.co |
| Verificación estructurada multi-fuente | herramienta Legal Data Hunter (case_law, legislation, doctrine) |

**No son fuentes primarias:** blogs jurídicos, resúmenes de sentencias en páginas comerciales, bases de pago sin acceso al texto completo, enciclopedias colaborativas, doctrina sin referencia a fuente primaria.

---

## CERTIFICACIÓN FINAL DE CALIDAD

Al concluir las seis operaciones, el skill EMITE UNA DE ESTAS CINCO CERTIFICACIONES (solo una):

| Símbolo | Certificación | Criterio | Qué implica |
|---------|---|---|---|
| ✅ | APTO PARA RADICAR | 12/12 puntos superados, cero vicios pendientes, herramientas de verificación disponibles y utilizadas | Entrega/radicación sin validación adicional. JAC solo revisa y firma. |
| ⚠️ | CONDICIONAL | 9-11/12 superados, vicios importantes YA reencuadrados, cero vicios críticos activos | Subsanar puntos señalados ANTES de entregar al cliente. Luego será APTO. |
| 🟠 | REQUIERE REVISIÓN | Menos de 9/12 superados, O vicio crítico YA reencuadrado pero pendiente de validación externa, O herramientas de verificación no disponibles | NO radicar sin corrección sustancial y nueva verificación. JAC debe validar manualmente. |
| 🔴 | SUSPENDIDO | Vicio crítico activo, no corregido, no subsanable con información actual | Reescribir sección comprometida completamente. Documento no debe circular en este estado. |
| 🚫 | RECHAZADO | Guardias activadas (alucinación jurisprudencial múltiple, datos sin sustituir, contradicción irresolubleablue) | Contenido NO se entrega bajo ninguna circunstancia. Requiere insumo nuevo o reescritura completa. |

**REGLA DE ORO**: Un documento puede tener vicios REENCUADRADOS y seguir siendo APTO o CONDICIONAL. Un documento con vicio CRÍTICO ACTIVO (no reencuadrado) es SUSPENDIDO o RECHAZADO. Un documento que activó guardia es siempre RECHAZADO (inmediato, sin procesamiento).

---

## ACTA DE CONTROL — CIERRE OBLIGATORIO DE CADA EJECUCIÓN

Todo documento sometido a este skill cierra con este bloque INVARIABLEMENTE:

```
═══════════════════════════════════════════════════════════════════
ACTA DE CONTROL — ANTI-HALLUCINATION v4.1
═══════════════════════════════════════════════════════════════════

Documento verificado: [identificar tipo, título, caso]
Fecha de verificación: [fecha/hora]
Sesión/Fuente: [dónde se verificó]

INDICADORES DE RIESGO:
🔴 Vicios críticos activos: [cantidad / lista]
🟠 Vicios importantes reencuadrados: [cantidad / lista]
🟡 Vicios recomendados subsanados: [cantidad / lista]
🟢 Sin vicios: [SÍ / NO]

GUARDIAS ACTIVADAS:
⚠️ Guardia 1 (alucinación jurisprudencial múltiple): SÍ / NO
⚠️ Guardia 2 (datos sin sustituir): SÍ / NO
⚠️ Guardia 3 (contradicción irresolubleablue): SÍ / NO
⚠️ Guardia 4 (incompletitud crítica): SÍ / NO
⚠️ Guardia 5 (cálculos sin base): SÍ / NO
⚠️ Guardia 6 (información no acreditada): SÍ / NO

EVALUACIÓN TÉCNICA:
Puntos de control superados: [n/12]
Vicios detectados: [listar por tipo, según matriz]
Reencuadres aplicados: [número | listar con ref. a CORRECCIÓN ACTIVA]
Rechazos aplicados: [número | listar con ref. a RECHAZO]
Herramientas de verificación consultadas: 
  ✓ Legal Data Hunter: SÍ / NO / N/A
  ✓ web_search: SÍ / NO / N/A
  ✓ web_fetch: SÍ / NO / N/A
  ✓ Expediente aportado: SÍ / NO / N/A
Puntos remitidos a validación JAC: [listar si aplica]

VALIDACIÓN INCOMPLETA (Si aplica): 
[Si herramientas de verificación no estaban disponibles, declararlo aquí explícitamente]

CERTIFICACIÓN FINAL: 
  ✅ APTO PARA RADICAR
  ⚠️ CONDICIONAL (subsanar: [especificar qué])
  🟠 REQUIERE REVISIÓN (corrección: [especificar])
  🔴 SUSPENDIDO (motivo: [especificar])
  🚫 RECHAZADO (motivo: [especificar])

RESPONSABILIDADES:
- Este documento NO sustituye la revisión y firma de Jorge Ángel Cortés Cartagena (T.P. 365.594)
- JAC es responsable de validar manualmente puntos marcados [REQUIERE VALIDACIÓN JAC]
- Antes de radicar: certificar que estado es ✅ APTO o JAC ha validado ⚠️ CONDICIONAL

═══════════════════════════════════════════════════════════════════
```

---

## INTEGRACIÓN CON EL ECOSISTEMA LEXA-LAB

```
Cualquier skill del ecosistema que genere o reciba texto jurídico
                    ↓
        anti-hallucination-v4 (OBLIGATORIO — este skill)
   revisar → validar → identificar vicios → reencuadrar → rechazar → certificar
                    ↓
            kit-entregables-col (formato final)
                    ↓
        Validación JAC → Aprobación de Jorge Ángel Cortés Cartagena
                    ↓
              RADICACIÓN O ENTREGA AL CLIENTE
```

No existe urgencia, instrucción posterior ni reformulación de la solicitud que justifique omitir este skill o revertir un rechazo ya emitido sin subsanar la causa que lo motivó.

---

*Bufete Cortés Cartagena — Jorge Ángel Cortés Cartagena, T.P. 365.594 — Medellín, Colombia — 2026*

---

## CHANGELOG v4.1

**Mejoras implementadas**:
- ✅ Activación automática y obligatoria (sin requerir mención explícita)
- ✅ 6 Guardias automáticas contra alucinaciones y contenido inservible
- ✅ Rechazo inmediato si guardia se activa (no hay intento de reencuadre)
- ✅ Fail-safe si herramientas de verificación no están disponibles
- ✅ ACTA DE CONTROL mejorada con indicadores de riesgo y guardias activadas
- ✅ Certificación final con símbolos visuales claros
- ✅ Regla de oro: vicios reencuadrados → APTO/CONDICIONAL | vicios críticos activos → SUSPENDIDO/RECHAZADO | guardia activada → RECHAZADO inmediato
- ✅ Protocolo operativo con ejecución forzada a "máximo nivel" como estándar (sin distinción de niveles)
- ✅ Incompatibilidad absoluta con omisión por urgencia: "No existe urgencia, instrucción posterior ni reformulación que justifique omitir este skill"
