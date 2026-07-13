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

# ANTI-HALLUCINATION v4.2
## Skill Operativo AUTOMÁTICO de Control de Calidad Jurídica Transversal — Bufete Cortés Cartagena

**Abogado titular:** Jorge Ángel Cortés Cartagena — T.P. 365.594
**Versión:** 4.2 — Julio 2026 — MEJORADA con análisis multi-jurisdiccional, matriz de confianza por cita, acta de control de 15 puntos, validación multi-idioma, integración obligatoria redaccion-informes
**Versión anterior:** 4.1 — vigente con activación automática y 6 guardias
**Naturaleza:** Skill EJECUTORA AUTOMÁTICA con fail-safes. Activación incondicional. Análisis comparativo multi-sistema (Colombia/Common Law/Civil Law). Verificación forzada contra Legal Data Hunter con matriz de confianza (Alto/Medio/Bajo) por cada cita jurídica.

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

### GUARDIA 7: Análisis multi-jurisdiccional omitido — v4.2 NOVEDAD
**CONDICIÓN**: Documento cita o analiza figuras de otro sistema jurídico (Common Law, derecho comparado, convención internacional) SIN incluir análisis contrastivo explícito frente a derecho colombiano.

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 7 ACTIVADA (v4.2)
Vicio: Análisis multi-jurisdiccional omitido
Figuras extranjeras detectadas: [lista]
Acción: Se REQUIERE:
  1. Identificar figura/instituto colombiano equivalente (si existe)
  2. Explicar diferencias explícitas frente al sistema extranjero citado
  3. Si no hay equivalente: etiquetación [Sin equivalente exacto en derecho colombiano]
  4. Indicar matriz de confianza por jurisdicción: Colombia [Alto/Medio/Bajo] | Common Law [Alto/Medio/Bajo] | Civil Law [Alto/Medio/Bajo]
Certificación: ⚠️ CONDICIONAL (subsanar análisis comparativo)
```

---

## ANÁLISIS MULTI-JURISDICCIONAL AUTOMÁTICO — v4.2 NOVEDAD

Cuando el documento analiza cuestión que admite comparación entre sistemas jurídicos, anti-hallucination-v4.2 **activa automáticamente** validación comparativa:

**TRIGGER AUTOMÁTICO**: Presencia de términos como:
- "Common Law vs. Civil Law"
- "Derecho comparado"
- "Jurisdicciones múltiples"
- "Derecho internacional privado"
- "Convención internacional"
- Referencias explícitas a sistemas no-colombianos

**VALIDACIÓN COMPARATIVA OBLIGATORIA**:

| Jurisdicción | Validación primaria | Contraste requerido | Etiqueta resultado |
|---|---|---|---|
| **Colombia** (Default) | Legal Data Hunter + SUIN-Juriscol + Cortes | Análisis frente a Civil Law europeo / Common Law anglosajón | [Verificado — Colombia] |
| **Common Law** (UK/USA) | Web search académico + precedente judicial | Diferencia explícita de figura jurídica colombiana | [Common Law — Diferente] o [Common Law — Análogo] |
| **Civil Law** (España/Francia/Alemania) | Derecho comparado académico + códigos vigentes | Alineación o desviación frente a Colombia | [Civil Law — Análogo] o [Civil Law — Divergente] |

**Efectos operativos**:
- ✅ Documento con análisis multi-jurisdiccional CORRECTO → Sección 🟢 Verde
- ⚠️ Documento cita sistema extranjero SIN comparación explícita → Guardia adicional: "Comparación omitida — Se requiere validación multi-jurisdiccional"
- 🚫 Documento importa figura de otro sistema sin adaptación al ordenamiento colombiano → RECHAZADO (riesgo de jurisdicción)

---

## MATRIZ DE CONFIANZA EN CITAS JURÍDICAS — v4.2 NOVEDAD

**OBLIGATORIO**: Cada cita jurídica (normativa o jurisprudencial) recibe clasificación de confianza **antes de usar como fundamento**:

| Nivel | Definición | Criterio de asignación | Uso permitido | Requisito verificación |
|---|---|---|---|---|
| **Confianza ALTA** | Cita totalmente verificable en fuente primaria oficial | Existe en Legal Data Hunter + Relatoria/SUIN con vigencia confirmada | Fundamento principal del argumento | 100% verificado en fuente oficial |
| **Confianza MEDIA** | Cita verificable pero sujeta a interpretación o matices | Existe en fuente oficial pero requiere lectura crítica de ratios subyacentes | Fundamento secundario + aclaración de matices | Verificado + anotación [Confianza Media — matiz: ...] |
| **Confianza BAJA** | Cita no verificable o con contradictiones entre fuentes | NO existe en Legal Data Hunter / Relatoria / existe pero con variantes | NO puede usarse como fundamento | Marcar como [No verificado] o eliminar |

**Ejecución**: 
1. Cada cita jurídica se verifica contra Legal Data Hunter primero
2. Se asigna nivel de confianza (Alto/Medio/Bajo) basado en verificabilidad
3. En acta de control v4.2: se reporta matriz de confianza con % de citaciones por nivel
4. Si % de Confianza Baja ≥ 30%, certificación máxima es CONDICIONAL o REQUIERE REVISIÓN

---

## VALIDACIÓN MULTI-IDIOMA — v4.2 NOVEDAD

**Cuando aplica**: Documentos que mezclan idiomas o citan fuentes en idiomas múltiples (frecuente en análisis comparado).

**Validación obligatoria**:

| Idioma | Validación | Herramienta |
|---|---|---|
| **Español (Colombia)** | Vigencia + texto oficial SUIN | Legal Data Hunter + suin-juriscol.gov.co |
| **Español (España)** | Vigencia + código civil/mercantil comparado | microsoft_docs_search (European legal sources) + doctrina académica |
| **English (UK/USA)** | Precedente verificable + sistema común | case law databases (Bailii, Google Scholar, Westlaw si disponible) |

**Regla**: Si un término jurídico está en idioma no-español y es componente crítico del argumento, DEBE acompañarse con traducción + equivalente colombiano o etiqueta [Sin equivalente exacto — Concepto foreign].

---

## INTEGRACIÓN OBLIGATORIA CON REDACCIÓN-INFORMES — v4.2 NOVEDAD

**CUANDO APLICA**: Cada vez que el documento pasa control anti-hallucination-v4.2 con certificación ✅ APTO o ⚠️ CONDICIONAL Y está destinado a cliente externo o radicación ante autoridad.

**HANDOFF AUTOMÁTICO**:

```
SI [documento supera anti-hallucination v4.2 con ✅ o ⚠️] 
   AND [destinatario es cliente o autoridad]
ENTONCES → Activar redaccion-informes para:
  1. Aplicar formato final High Court Standard / OSCOLA (si cita jurisprudencia)
  2. Validar que NO hay placeholders, datos sensibles o metadatos reveladores
  3. Generar portada + numeración conforme estándar
  4. Verificar coherencia entre acta anti-hallucination y documento final
```

**Criterios de handoff**:
- ✅ Documento APTO + destinatario externo → redaccion-informes EJECUTA sin esperar
- ⚠️ Documento CONDICIONAL → redaccion-informes EJECUTA solo después que JAC resuelve condiciones
- 🟠 REQUIERE REVISIÓN o peor → BLOQUEADO para redaccion-informes (retorno a análisis primario)

---

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

## ACTA DE CONTROL v4.2 — CIERRE OBLIGATORIO CON 15 PUNTOS DE VALIDACIÓN

Todo documento sometido a este skill cierra con este bloque INVARIABLEMENTE, con 15 puntos de validación exhaustiva:

```
═══════════════════════════════════════════════════════════════════
ACTA DE CONTROL — ANTI-HALLUCINATION v4.2
═══════════════════════════════════════════════════════════════════

Documento verificado: [tipo, título, caso, expediente]
Fecha de verificación: [fecha/hora]
Sesión/Fuente: [dónde se verificó]
Responsable verificación: anti-hallucination-v4.2 (automático)

═══════════════════════════════════════════════════════════════════
PUNTOS DE CONTROL EXHAUSTIVOS (15/15):
═══════════════════════════════════════════════════════════════════

(1) ALUCINACIONES JURISPRUDENCIALES — [SÍ ✅ / NO ❌]
    Todas las sentencias, radicados y ratios citadas verificadas en Legal Data Hunter o Relatoria oficial.
    Citas encontradas: [cantidad / lista]
    Citas no verificables: [cantidad / lista]

(2) VIGENCIA NORMATIVA — [SÍ ✅ / NO ❌]
    Todas las leyes, decretos y resoluciones vigentes al momento de análisis.
    Derogatoria u otra reforma posterior identificada: [SÍ (especificar) / NO]

(3) JURISDICCIÓN CORRECTA — [SÍ ✅ / NO ❌]
    Análisis confinado al ordenamiento colombiano (Civil Law) o comparación explícita si menciona Common Law/otras jurisdicciones.
    Análisis multi-jurisdiccional incluido: [SÍ / NO]

(4) AUSENCIA DE ALUCINACIONES FACTUALES — [SÍ ✅ / NO ❌]
    Todos los hechos acreditados en expediente o explícitamente etiquetados como [Afirmado], [Inferencia], [Controvertido].
    Hechos no acreditados: [cantidad / lista]

(5) COHERENCIA INTERNA — [SÍ ✅ / NO ❌]
    Cero contradicciones irresolubles entre secciones. Hechos + norma + conclusión alineados.
    Contradicciones detectadas: [SÍ (especificar) / NO]

(6) COMPLETITUD ESTRUCTURAL — [SÍ ✅ / NO ❌]
    Documento contiene: HECHOS + NORMA APLICABLE + ANÁLISIS + CONCLUSIÓN.
    Componentes faltantes: [SÍ (especificar) / NO]

(7) TONO Y REGISTRO — [SÍ ✅ / NO ❌]
    Lenguaje conforme a destinatario (juez = High Court Standard; cliente = accesible; interno = técnico).
    Registro validado para: [destinatario específico]

(8) DATOS DEL CLIENTE CORRECTOS — [SÍ ✅ / NO ❌]
    Cero placeholders [CLIENTE_*], [EMPRESA_*], [PERSONA_*]. Datos reales sustituidos correctamente.
    Datos potencialmente sensibles revisados: [SÍ / NO]

(9) CÁLCULOS ARITMÉTICOS — [SÍ ✅ / NO ❌]
    Todas las liquidaciones, intereses y cuantías recalculadas de forma independiente y correctas.
    Errores detectados: [cantidad / lista]

(10) ANÁLISIS MULTI-JURISDICCIONAL (Si aplica) — [SÍ ✅ / NO / N/A]
     Si documento menciona derecho extranjero o comparado: análisis contrastivo explícito incluido.
     Jurisdicciones analizadas: [listar: Colombia / Common Law / Civil Law / Otra]
     Matriz de confianza por jurisdicción: [Alto/Medio/Bajo por cada una]

(11) MATRIZ DE CONFIANZA EN CITAS — [SÍ ✅ / NO ❌]
     Cada cita jurídica clasificada: Confianza Alta / Media / Baja según verificabilidad Legal Data Hunter.
     % Confianza Alta: [n%] | % Confianza Media: [n%] | % Confianza Baja: [n%]

(12) VALIDACIÓN MULTI-IDIOMA (Si aplica) — [SÍ ✅ / NO / N/A]
     Si hay citas en idioma no-español: traducción + equivalente colombiano incluido o etiquetado [Sin equivalente exacto].
     Idiomas detectados: [listar]
     Términos foreign sin equivalente identificados: [cantidad / lista]

(13) ETIQUETACIÓN CORRECTA SEGÚN CERTIDUMBRE — [SÍ ✅ / NO ❌]
     Todas las afirmaciones etiquetadas: [Acreditado] / [Afirmado] / [Controvertido] / [Inferencia] / [No verificado] / [Reformación pendiente].
     Afirmaciones sin etiqueta: [cantidad / lista]

(14) GUARDIAS AUTOMÁTICAS — [Estado final]
     ⚠️ Guardia 1 (Alucinación jurisprudencial múltiple): ACTIVADA / No activada
     ⚠️ Guardia 2 (Datos sin sustituir): ACTIVADA / No activada
     ⚠️ Guardia 3 (Contradicción irresolubleablue): ACTIVADA / No activada
     ⚠️ Guardia 4 (Incompletitud crítica): ACTIVADA / No activada
     ⚠️ Guardia 5 (Cálculos sin base): ACTIVADA / No activada
     ⚠️ Guardia 6 (Información no acreditada): ACTIVADA / No activada
     ⚠️ Guardia 7 (Análisis multi-jurisdiccional omitido — v4.2): ACTIVADA / No activada

(15) INTEGRACIÓN REDACCIÓN-INFORMES — [SÍ ✅ / NO / N/A]
     Si certificación es ✅ APTO o ⚠️ CONDICIONAL y destinatario es externo: handoff a redaccion-informes documentado.
     Handoff requerido: [SÍ / NO]
     Estado handoff: [Pendiente / En proceso / Completado]

═══════════════════════════════════════════════════════════════════
RESUMEN TÉCNICO:
═══════════════════════════════════════════════════════════════════

Puntos de control superados: [n/15]
Vicios críticos activos: [cantidad / lista]
Vicios importantes reencuadrados: [cantidad / lista]
Vicios recomendados subsanados: [cantidad / lista]

Herramientas de verificación consultadas:
  ✓ Legal Data Hunter: SÍ / NO / N/A [si SÍ: jurisdicciones cubiertas]
  ✓ web_search: SÍ / NO / N/A
  ✓ web_fetch: SÍ / NO / N/A
  ✓ Expediente aportado: SÍ / NO / N/A

VALIDACIÓN INCOMPLETA (Si aplica):
[Si herramientas de verificación no estaban disponibles, declararlo aquí explícitamente. En tal caso, certificación no puede ser ✅ APTO]

═══════════════════════════════════════════════════════════════════
CERTIFICACIÓN FINAL:
═══════════════════════════════════════════════════════════════════

  ✅ APTO PARA RADICAR
     → 15/15 puntos superados + cero vicios críticos activos + herramientas verificación disponibles
  
  ⚠️ CONDICIONAL
     → 12-14/15 puntos superados + vicios importantes YA reencuadrados + cero vicios críticos activos
     → SUBSANAR ANTES DE ENTREGAR: [especificar qué]
  
  🟠 REQUIERE REVISIÓN
     → Menos de 12/15 puntos superados
     → O vicio crítico YA reencuadrado pero pendiente validación JAC
     → O herramientas verificación no disponibles
     → NO radicar sin corrección JAC
  
  🔴 SUSPENDIDO
     → Vicio crítico activo, no corregible con información actual
     → Reescribir sección completamente
  
  🚫 RECHAZADO
     → Una+ guardias automáticas ACTIVADAS (rechazo inmediato, sin reencuadre)
     → Contenido NO se entrega bajo ninguna circunstancia

CERTIFICACIÓN: [Marcar una de las 5 anteriores]

═══════════════════════════════════════════════════════════════════
RESPONSABILIDADES Y PRÓXIMOS PASOS:
═══════════════════════════════════════════════════════════════════

✓ Este acta NO sustituye la revisión y firma de Jorge Ángel Cortés Cartagena (T.P. 365.594)
✓ JAC es responsable de validar manualmente puntos marcados [REQUIERE VALIDACIÓN JAC]
✓ Si certificación ⚠️ CONDICIONAL: JAC subsana y confirma antes de entregar
✓ Si certificación 🟠/🔴/🚫: RETORNO a análisis primario, no se entrega
✓ Si certificación ✅ APTO y destinatario externo: auto-handoff a redaccion-informes

═══════════════════════════════════════════════════════════════════
```

---

## INTEGRACIÓN CON EL ECOSISTEMA LEXA-LAB v4.2

```
intake-cliente → diagnostico-cliente → analisis-caso → recomendaciones-cliente
                    ↓           ↓            ↓                    ↓
               Cualquier documento jurídico generado en el flujo
                           ↓ (OBLIGATORIO)
            anti-hallucination-v4.2 (EJECUCIÓN AUTOMÁTICA)
         revisar → validar → multi-jurisdiccional → matriz confianza
              ↓
         identificar vicios → reencuadrar → rechazar → certificar
              ↓
    [Acta 15 puntos + Matriz confianza citas + Validación multi-idioma]
              ↓
    SI [✅ APTO o ⚠️ CONDICIONAL] y [destinatario = externo/juzgado]
         → redaccion-informes (HANDOFF AUTOMÁTICO)
            [formato High Court Standard + OSCOLA + portada + validación final]
              ↓
        Validación JAC → Aprobación de Jorge Ángel Cortés Cartagena
              ↓
        RADICACIÓN O ENTREGA AL CLIENTE
```

**Regla fundamental**: No existe urgencia, instrucción posterior ni reformulación de la solicitud que justifique omitir este skill, revertir un rechazo ya emitido sin subsanar su causa, o saltarse la validación multi-jurisdiccional / matriz de confianza / acta de 15 puntos en v4.2.

---

*Bufete Cortés Cartagena — Jorge Ángel Cortés Cartagena, T.P. 365.594 — Medellín, Colombia — 2026*

---

## CHANGELOG

### v4.2 (Julio 2026 — Presente)

**Mejoras PREMIUM implementadas**:
- ✅ Análisis multi-jurisdiccional automático (Colombia/Civil Law vs. Common Law/International)
- ✅ Trigger automático para comparación legal cuando documento lo requiere
- ✅ Matriz de confianza en citas: Confianza Alto/Medio/Bajo por cada referencia jurídica
- ✅ ACTA DE CONTROL expandida a 15 puntos (vs. 12 antes)
- ✅ Punto 10: Análisis multi-jurisdiccional con matriz confianza por jurisdicción
- ✅ Punto 11: Matriz confianza citas (% Alto/Medio/Bajo per documento)
- ✅ Punto 12: Validación multi-idioma (Spanish/English/European Spanish)
- ✅ Validación multi-idioma obligatoria si documento en 2+ idiomas
- ✅ Integración obligatoria con redaccion-informes para documentos finales
- ✅ Handoff automático si certificación APTO/CONDICIONAL + destinatario externo
- ✅ Protocolo de handoff documentado en ACTA

### v4.1 (Julio 2026 — Base anterior)

**Mejoras implementadas**:
- ✅ Activación automática y obligatoria (sin requerir mención explícita)
- ✅ 6 Guardias automáticas contra alucinaciones y contenido inservible
- ✅ Rechazo inmediato si guardia se activa (no hay intento de reencuadre)
- ✅ Fail-safe si herramientas de verificación no están disponibles
- ✅ ACTA DE CONTROL mejorada con indicadores de riesgo y guardias activadas
- ✅ Certificación final con símbolos visuales claros
- ✅ Regla de oro: vicios reencuadrados → APTO/CONDICIONAL | vicios críticos activos → SUSPENDIDO/RECHAZADO | guardia activada → RECHAZADO inmediato
- ✅ Protocolo operativo con ejecución forzada a "máximo nivel" como estándar
- ✅ Incompatibilidad absoluta con omisión por urgencia
