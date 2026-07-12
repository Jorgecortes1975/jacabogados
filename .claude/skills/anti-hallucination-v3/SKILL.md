---
name: anti-hallucination-v3
description: >
  Capa de control de calidad jurídica transversal OBLIGATORIA. Previene, detecta y
  corrige alucinaciones en documentos jurídicos colombianos antes de llegar a un
  despacho judicial o al cliente. Versión 3 incorpora protocolo de verificación de
  3 niveles, instrucción de cierre estándar y checklist de entrega. Activar ante:
  verifica, existe esta sentencia, está vigente esta norma, audita este documento,
  revisa antes de radicar, puedo confiar en esto, valida las fuentes, certifica
  calidad, checklist antes de presentar, etiquetas de certidumbre. SIEMPRE activar
  de forma automática antes de entregar cualquier documento jurídico complejo.
---

# ANTI-HALLUCINATION v3.0
## Control de Calidad Jurídica Transversal — Protocolo de Verificación de 3 Niveles

---

## POR QUÉ EXISTE ESTE MÓDULO

Los modelos de lenguaje predicen texto plausible, no texto verdadero.
Un modelo puede generar el nombre de un fallo, su carátula, su número de expediente
y citar artículos que suenan perfectamente correctos pero que no existen.

En materia legal, este error no es un inconveniente: es un riesgo profesional grave.

**Regla absoluta del ecosistema:**
Ningún documento jurídico abandona el despacho sin pasar por anti-hallucination-v3.
Esta regla es incondicional, independientemente de la urgencia.

---

## LAS 6 ETIQUETAS DE CERTIDUMBRE

Uso obligatorio en todos los documentos del ecosistema:

| Etiqueta | Cuándo usar | Consecuencia operativa |
|---|---|---|
| [Acreditado] | Soporte documental incontrovertible disponible | Usar como fundamento principal |
| [Afirmado] | Alegado por la parte, sin prueba suficiente aún | Usar con cautela — obtener prueba |
| [Controvertido] | Disputado entre las partes | Requiere estrategia probatoria |
| [Inferencia] | Deducción lógica de hechos conocidos | Identificar como tal, no como hecho probado |
| [No verificado] | Sin soporte en materiales aportados al análisis | No usar como fundamento principal |
| [Reformación pendiente] | Norma o precedente que puede haber cambiado | VALIDAR antes de radicar — obligatorio |

---

## PROTOCOLO DE VERIFICACIÓN DE 3 NIVELES

### NIVEL 1 — Verificación de normas

Para cada norma citada en el documento:

```
CHECKLIST NORMA POR NORMA:
□ La norma existe (nombre completo + número + año)
□ El artículo citado corresponde a la materia analizada
□ La norma está vigente (no derogada, no modificada en lo esencial)
□ Si fue modificada: usar la versión vigente y notar el cambio
□ Fuente de verificación disponible: SUIN-Juriscol / Diario Oficial / Secretaría del Senado

Si falla alguna verificación: marcar [REFORMACIÓN PENDIENTE] y describir el problema.
```

### NIVEL 2 — Verificación de jurisprudencia

**REGLA ABSOLUTA:** Nunca citar jurisprudencia de memoria. La IA solo debe analizar
fallos que el usuario aporta. El proceso correcto:

1. El usuario busca los fallos en fuentes verificadas:
   - Relatoría oficial de la Corte Constitucional (corteconstitucional.gov.co/relatoria)
   - Relatoría de la Corte Suprema de Justicia (cortesuprema.ramajudicial.gov.co)
   - Relatoría del Consejo de Estado (consejodeestado.gov.co/relatorios)
   - Rama Judicial (ramajudicial.gov.co)
2. El usuario aporta los PDFs o textos de los fallos
3. La IA analiza los fallos aportados — nunca genera jurisprudencia de memoria

```
CHECKLIST JURISPRUDENCIA:
□ El fallo fue aportado por el usuario (no generado por la IA de memoria)
□ Los datos identificadores son correctos: corporación, sala, número, fecha, M.P.
□ El holding citado corresponde efectivamente al fallo aportado
□ No se está confundiendo ratio decidendi con obiter dicta
□ La doctrina del fallo es aplicable al caso en cuestión

Si la IA genera jurisprudencia sin que el usuario la aporte: marcar [NO VERIFICADO — NO CITAR]
```

### NIVEL 3 — Verificación de coherencia del escrito

```
CHECKLIST DE COHERENCIA:
□ Las pretensiones son técnicamente posibles según la vía procesal elegida
□ Los hechos numerados en la demanda corresponden exactamente a los que se debaten
□ Las normas citadas respaldan efectivamente los argumentos donde se invocan
□ Las fechas y plazos son internamente coherentes
□ La competencia invocada es correcta según la materia y cuantía
□ El procedimiento seleccionado es el aplicable al tipo de conflicto
□ Las etiquetas de certidumbre son consistentes en todo el documento
```

---

## INSTRUCCIÓN DE CIERRE ESTÁNDAR — OBLIGATORIA

Incluir textualmente al final de cualquier análisis, concepto o escrito:

```
NOTA DE VERIFICACIÓN:
Las citas normativas de este documento fueron contrastadas con las fuentes
disponibles. Los elementos marcados con [VERIFICAR] o [REFORMACIÓN PENDIENTE]
requieren confirmación en las fuentes primarias oficiales (SUIN-Juriscol,
Diario Oficial, relatorías de Altas Cortes) antes de radicar o entregar al cliente.

No se citan fallos de Altas Cortes sin que hayan sido aportados como documentos verificables.
```

---

## CHECKLIST DE ENTREGA — EJECUTAR ANTES DE CADA RADICIÓN

```
PROTOCOLO PREVIO A LA RADICIÓN

NORMAS:
□ Cada norma citada tiene: nombre completo + número + año + artículo
□ La vigencia fue verificada en SUIN-Juriscol (o Diario Oficial para decretos)
□ Las modificaciones relevantes están referenciadas

JURISPRUDENCIA:
□ Cada fallo tiene: corporación + sala + número/radicado + fecha + M.P.
□ El fallo fue aportado como documento o verificado en la relatoría oficial
□ El holding citado fue leído directamente — no inferido

HECHOS:
□ Cada hecho tiene su etiqueta de certidumbre aplicada
□ No hay hechos [No verificado] siendo usados como fundamento principal
□ Las fechas son internamente coherentes

PRETENSIONES Y COMPETENCIA:
□ Las pretensiones son claras, determinadas o determinables
□ La competencia está fundamentada (materia + cuantía + domicilio)
□ La vía procesal es la procedente

SELLO DE CALIDAD:
□ El escrito pasó por anti-hallucination-v3 completo
□ La instrucción de cierre estándar está incluida
```

---

## FÓRMULAS ESTÁNDAR DE INCERTIDUMBRE

Copiar directamente en el documento cuando aplique:

**Norma sin verificar vigencia:**
```
[Reformación pendiente] — La [Ley/Decreto/Resolución] citada requiere verificación
de vigencia actualizada. Análisis base: [continuar con el razonamiento disponible].
Acción previa: confirmar texto vigente en SUIN-Juriscol antes de radicar.
```

**Jurisprudencia no aportada:**
```
[No verificado — No citar] — La referencia jurisprudencial indicada no fue aportada
como documento verificable. Para incluir en el escrito: aportar el fallo de la
relatoría oficial y verificar el holding exacto.
```

**Dato fáctico sin soporte:**
```
[Afirmado] — Este hecho fue relatado por el cliente pero no cuenta con soporte
documental disponible en los materiales del caso. Gestión pendiente: obtener
[documento específico] antes de incluirlo como fundamento principal.
```

---

## FUENTES PRIMARIAS OBLIGATORIAS PARA COLOMBIA

| Tipo de fuente | Dónde verificar |
|---|---|
| Leyes y decretos | suin-juriscol.gov.co — Secretaría del Senado (secretariasenado.gov.co) |
| Publicación oficial | Diario Oficial (diarioficial.gov.co) |
| Corte Constitucional (T-, C-, SU-) | corteconstitucional.gov.co/relatoria |
| CSJ — Sala Civil | cortesuprema.ramajudicial.gov.co |
| CSJ — Sala Laboral | cortesuprema.ramajudicial.gov.co |
| CSJ — Sala Penal | cortesuprema.ramajudicial.gov.co |
| Consejo de Estado | consejodeestado.gov.co/relatorios |
| Consultas de proceso | ramajudicial.gov.co |
| Normativa laboral / DAFP | funcionpublica.gov.co |

**Fuentes que NO son fuentes primarias:**
- Blogs jurídicos
- Resúmenes de sentencias en páginas comerciales
- Bases de datos de pago sin acceso al texto completo
- Wikipedia o páginas de enciclopedia
- Textos de doctrina sin referencia a la fuente primaria

---

## INTEGRACIÓN CON EL ECOSISTEMA

Este skill es la última capa de calidad antes de cualquier entrega.

```
Cualquier skill del ecosistema
           ↓
anti-hallucination-v3 (OBLIGATORIO)
           ↓
kit-entregables-col (formato final)
           ↓
RADICIÓN O ENTREGA AL CLIENTE
```

No existe urgencia que justifique omitir este paso.
