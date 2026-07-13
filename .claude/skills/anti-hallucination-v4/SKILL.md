---
name: anti-hallucination-v4
description: >
  Skill operativo OBLIGATORIO de control de calidad jurídica transversal del
  ecosistema LEXA-LAB. A diferencia de una guía de referencia, EJECUTA
  directamente la revisión, validación, identificación de vicios y errores,
  reencuadre, rechazo y certificación final de cualquier texto, análisis,
  concepto o escrito jurídico colombiano aportado, verificando activamente
  —mediante Legal Data Hunter, web_search y web_fetch contra fuentes
  oficiales— su vigencia normativa, jurisprudencial y doctrinal actual.
  Reemplaza y supera a anti-hallucination-v3, que queda retirado. Activar
  ante: verifica, valida esto, revisa antes de radicar, existe esta
  sentencia, está vigente esta norma, audita este documento, identifica
  vicios, hay errores en este texto, reencuadra esto, esto se puede
  rechazar, certifica calidad, checklist antes de presentar, puedo confiar
  en esto, esto está actualizado, control de calidad, 12 puntos de control,
  etiquetas de certidumbre. SIEMPRE activar de forma automática antes de
  entregar cualquier documento jurídico complejo del ecosistema, y siempre
  que el usuario pida revisar, validar, auditar o verificar un texto
  jurídico ya existente.
---

# ANTI-HALLUCINATION v4.0
## Skill Operativo de Control de Calidad Jurídica Transversal — Bufete Cortés Cartagena

**Abogado titular:** Jorge Ángel Cortés Cartagena — T.P. 365.594
**Versión:** 4.0 — Julio 2026 — Reemplaza y retira anti-hallucination-v3
**Naturaleza:** Skill EJECUTORA, no descriptiva. No explica cómo verificar: verifica.

---

## POR QUÉ EXISTE ESTE MÓDULO

Los modelos de lenguaje predicen texto plausible, no texto verdadero. Un modelo puede generar el nombre de un fallo, su radicado y artículos que suenan perfectamente correctos pero que no existen o que ya no rigen. En materia jurídica ese error no es un inconveniente estilístico: es un riesgo disciplinario, procesal y patrimonial.

**Regla absoluta del ecosistema:** ningún documento jurídico abandona el despacho, se remite a un cliente o se radica ante autoridad sin pasar por este skill. La regla es incondicional, con independencia de la urgencia declarada.

---

## NATURALEZA OPERATIVA — QUÉ HACE ESTE SKILL EN CADA ACTIVACIÓN

Cuando se activa este skill sobre un texto, análisis, concepto o escrito aportado por el usuario, ejecuta —en este orden— las seis operaciones siguientes. No es opcional saltar pasos.

1. **REVISAR** — Leer el texto completo e inventariar cada norma, cada cita jurisprudencial, cada hecho afirmado y cada cifra calculada.
2. **VALIDAR** — Verificar activamente cada elemento del inventario contra fuente oficial vigente (protocolo de la sección siguiente), no contra la memoria del modelo.
3. **IDENTIFICAR VICIOS Y ERRORES** — Clasificar cada hallazgo negativo según la matriz de vicios de la sección correspondiente.
4. **REENCUADRAR** — Corregir en el propio texto los vicios subsanables, dejando trazabilidad completa de qué se cambió y por qué (protocolo de reencuadre).
5. **RECHAZAR** — Cuando el vicio no es subsanable en el momento o compromete la integridad del documento, rechazar la sección o el documento completo, con motivación expresa.
6. **CERTIFICAR** — Emitir la certificación final de calidad y el acta de control, conforme a la escala de la sección final.

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

Este skill no se limita a advertir "verifique en fuente oficial". Cuando las herramientas estén disponibles en la sesión, las usa directamente antes de certificar:

1. **Legal Data Hunter** (`discover_sources` para país `CO`, `search` en namespace `legislation` o `case_law`, `resolve_reference` para citas puntuales) es la vía preferente para confirmar existencia, texto y vigencia de normas y sentencias colombianas.
2. **web_search + web_fetch** contra dominios oficiales cuando Legal Data Hunter no cubra la fuente puntual: suin-juriscol.gov.co, secretariasenado.gov.co, diarioficial.gov.co, corteconstitucional.gov.co/relatoria, cortesuprema.ramajudicial.gov.co, consejodeestado.gov.co, funcionpublica.gov.co, ramajudicial.gov.co.
3. Si ninguna herramienta de verificación está disponible en la sesión, el skill NO asume vigencia: marca el punto como `[REQUIERE VALIDACIÓN JAC]` y lo declara expresamente en el acta de control, en vez de guardar silencio sobre la limitación.
4. Nunca se cita jurisprudencia generada de memoria por el modelo como si fuera un fallo aportado o verificado. Solo se presenta como tal la jurisprudencia efectivamente encontrada en la fuente o aportada por el usuario.

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

Al concluir las seis operaciones, el skill declara una de estas cinco certificaciones:

| Certificación | Criterio | Significado |
|---|---|---|
| ✅ APTO PARA RADICAR | 12/12 puntos superados, sin vicios pendientes | Puede entregarse o radicarse sin validación adicional |
| ⚠️ CONDICIONAL | 9-11/12 superados, sin vicios críticos activos | Subsanar los puntos señalados antes de la entrega al cliente |
| 🟠 REQUIERE REVISIÓN | menos de 9/12, o un vicio crítico ya reencuadrado pendiente de validación externa | No radicar sin corrección sustancial y nueva verificación |
| 🔴 SUSPENDIDO | vicio crítico activo, no corregido | Reescribir la sección comprometida; el documento no debe circular |
| 🚫 RECHAZADO | condiciones de rechazo de la sección correspondiente | El contenido no se entrega en ninguna forma; se requiere insumo nuevo |

---

## ACTA DE CONTROL — CIERRE OBLIGATORIO DE CADA EJECUCIÓN

Todo documento sometido a este skill cierra con este bloque, sin excepción:

```
ACTA DE CONTROL — ANTI-HALLUCINATION v4.0
Documento verificado: [identificar el escrito, concepto o comunicación]
Puntos de control superados: [n/12 — detallar los que fallaron]
Vicios detectados: [listar por tipo, según la matriz]
Reencuadres aplicados: [listar, con referencia a la fórmula CORRECCIÓN ACTIVA]
Rechazos aplicados: [listar, con referencia a la fórmula de RECHAZO]
Fuentes de verificación consultadas: [Legal Data Hunter / dominios oficiales / documentos aportados]
Puntos remitidos a validación JAC: [listar]
Certificación final: [APTO PARA RADICAR / CONDICIONAL / REQUIERE REVISIÓN / SUSPENDIDO / RECHAZADO]
Este documento NO sustituye la revisión y firma del abogado titular.
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
