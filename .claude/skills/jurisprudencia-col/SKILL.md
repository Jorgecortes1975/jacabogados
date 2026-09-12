---
name: jurisprudencia-col
description: >
  Auditoría y análisis de líneas jurisprudenciales colombianas con verificación
  EN VIVO en relatorías oficiales y controles anti-alucinación. Verifica existencia
  de fallos (Corporación, Sala, Tipo/Número, Fecha, M.P.), extrae ratio con método
  (Wambaugh/Goodhart), detecta progresión (fundadora→hitos→consolidadora),
  identifica hitos de cambio, y retorna veredicto: CONFIRMADA/PARCIAL/INCONSISTENTE.
  Activar ante: audita esta línea jurisprudencial, verifica este fallo, ¿es correcta
  la cita?, existe este precedente, qué dice la línea sobre [tema], está vigente esta
  jurisprudencia, cómo ha evolucionado el criterio sobre [asunto], contrasta dos
  líneas. SIEMPRE activar cuando se aporte línea jurisprudencial para auditoría o
  cuando REDACTOR-JURIDICO genere una línea que requiera verificación EN VIVO.
---

# AUDITORÍA DE LÍNEAS JURISPRUDENCIALES — Colombia

**Despacho**: JA Abogados  
**Función**: Verificación rigurosa de líneas jurisprudenciales aportadas o generadas por REDACTOR-JURIDICO-COL

---

## POR QUÉ EXISTE ESTE SKILL

REDACTOR-JURIDICO exige líneas jurisprudenciales (fundadora → hitos → consolidadora) como estructura de autoridad. Pero una línea construida con fallos alucinados es peor que ninguna línea.

**Regla fundacional**:
> Ninguna línea jurisprudencial se entrega como auditoría sin que cada fallo haya sido verificado EN VIVO durante la sesión en relatoría oficial (corporación, sala, tipo/número, fecha, M.P., ratio extraída correctamente).

---

## HERRAMIENTAS DE VERIFICACIÓN

1. **WebFetch sobre relatorías oficiales** (si accessible):
   - Corte Constitucional: www.corteconstitucional.gov.co/Relatoria
   - Corte Suprema de Justicia: www.cortesuprema.gov.co/Relatoria
   - Consejo de Estado: www.consejoestado.gov.co (salas especializadas)
   - Juzgados: bases de datos especializadas por fuero

2. **Fallos aportados por usuario** (PDF, texto): se verifican contra el identificador y se extrae la ratio del texto mismo.

3. **Método de extracción de ratio** (Wambaugh/Goodhart):
   - Leer: circunstancias fácticas + pregunta de derecho + respuesta de la corte
   - Comparar: si circunstancias fueran diferentes (X en lugar de Y), ¿cambiaría la respuesta?
   - Si sí: la ratio es la regla que depende de X
   - Si no: probablemente es obiter dicta

---

## FLUJO DE AUDITORÍA (5 FASES)

### FASE 1: Ingesta de la línea propuesta
- Usuario aporta: "Línea C-481/2005 → C-123/2010 → T-456/2015: estabilidad reforzada en fuero sindical"
- Desglosar: fundadora (C-481/2005), hitos (C-123/2010), consolidadora (T-456/2015)
- Listar identificadores completos esperados

### FASE 2: Verificación de existencia en relatoría
- Cada fallo: ¿Existe en corporación+sala+tipo/número+fecha?
- Veredicto por fallo: EXISTE / NO EXISTE / IDENTIFICADOR AMBIGUO

**Si NO EXISTE**: Marca [ALUCINACIÓN DETECTADA] y se detiene ahí.

### FASE 3: Lectura de cada fallo (si accessible)
- Obtener texto completo o extracto de relatoría
- Verificar: M.P., fecha exacta, partes, problema jurídico que trata

### FASE 4: Extracción de ratio (método Wambaugh)
- Identificar hechos relevantes del caso
- Identificar pregunta de derecho y respuesta de corte
- Aplicar método: si los hechos cambian, ¿la regla sigue siendo válida?
- Etiqueta: [Ratio confirmada] o [Ratio dudosa — requiere lectura completa]

### FASE 5: Validación de progresión
- ¿Fundadora establece regla clara? (sí/no/parcial)
- ¿Hitos afinan, reafirman o cambian la regla? (sí, reafirman / sí, cambian / no son hitos relevantes)
- ¿Consolidadora es reciente y vigente? (sí/no/parcial)

**Veredicto final**:
- **CONFIRMADA**: Todos los fallos existen, ratio es consistente, progresión clara, vigencia verificada
- **PARCIAL**: Algunos fallos no accesibles, pero los que se verificaron son consistentes
- **INCONSISTENTE**: Fallos contradictorios, ratio ambigua, o alguno alucinado
- **NO CONFIRMADA**: Fallo(s) alucinado(s) o identificador incorrecto

---

## FORMATO DE ENTREGA

### Veredicto inmediato (primeras líneas)
```
AUDITORÍA DE LÍNEA: Estabilidad reforzada en fuero sindical

Fallos: C-481/2005 → C-123/2010 → T-456/2015

VEREDICTO: [CONFIRMADA] ✓

Verificación:
- C-481/2005 (SU, M.P. Escobar Gil) [Existe + Ratio confirmada]
- C-123/2010 (SU, M.P. Henao) [Existe + Hito de precisión]
- T-456/2015 (T, M.P. Betancur) [Existe + Consolidadora vigente]
```

### Detalle técnico
```
FUNDADORA — C-481/2005
Corporación: Corte Constitucional | Sala: SU | Tipo: C | Número: 481 | Año: 2005 | Fecha: [DD-MM-YYYY]
M.P.: Rodrigo Escobar Gil
Partes: [demandante] vs. [demandado]
Problema: ¿Trabajador sindicalista puede ser despedido sin proceso disciplinario?
Respuesta: No. Estabilidad reforzada por fuero sindical.
Ratio [Wambaugh]: Trabajadores sindicalistas + despido sin proceso = nulo
Jerarquía: Corte Constitucional, SU (Unificación) = VINCULANTE

HITO 1 — C-123/2010
[Idem estructura]
Aporte: Precisó que formación previa es REQUISITO del proceso disciplinario; 
       el abandono de cargo no existe sin inasistencias sistemáticas + formación previa.
Consistencia con fundadora: REAFIRMA + PRECISA

CONSOLIDADORA — T-456/2015
[Idem estructura]
Aporte: Confirmó vigencia de la línea en contexto de negociación colectiva.
Consistencia: REAFIRMA sin variación
Vigencia: Fallo de 2015, aún vigente (no derogado, no reformado, posterior jurisprudencia aplica)
```

### Pendientes de verificación
```
[Si algún fallo no fue accessible en relatoría]
- Fallo X: No accesible en relatoría oficial en esta sesión.
  Acción: Usuario debe verificar manualmente en www.corteconstitucional.gov.co
  Veredicto parcial hasta verificación completa.
```

---

## REGLAS DURAS

1. **Cero fallos de memoria.** Fallo no verificado EN VIVO = [No confirmado] o [ALUCINACIÓN DETECTADA].

2. **Identificador completo o nada.** "C-481" es ambiguo (¿del 2005? ¿2010?). Exigir: Corporación+Sala+Tipo/Número+Año.

3. **Wambaugh es obligatorio para ratio.** La ratio NO es "la frase favorita de la sentencia". Es la regla que se aplica si los hechos son X, y que NO se aplica si los hechos son NOT-X.

4. **M.P. verificado.** El magistrado ponente importa: de el depende la interpretación y la solidez de la ratio. Errores aquí son críticos.

5. **Jerarquía transparente.** Sentencias de Corte Constitucional (C-, SU): vinculantes. Sentencias T (tutelas): auxiliares, no vinculantes pero influyentes. Consejo de Estado: contencioso. CSJ: casación. Diferencia clara.

6. **Vigencia no es "sin reformar".** Una sentencia sigue siendo vigente aunque haya nuevas sentencias posteriores, siempre que el criterio no haya sido explícitamente revisado o rechazado.

7. **Etiquetas obligatorias.** [Acreditado], [No confirmado], [ALUCINACIÓN DETECTADA], [Veredicto parcial].

8. **Cambio de jurisprudencia es evento.** Si la línea fue reversada (Corte cambió criterio explícitamente), marcarlo. No es debilidad; es transparencia. C-836/2001 enseña cómo cambiar jurisprudencia: transparencia + argumentación.

---

## INTEGRACIÓN CON REDACTOR-JURIDICO-COL

Cuando REDACTOR-JURIDICO genera un escrito que contiene líneas jurisprudenciales:

1. REDACTOR entrega: línea propuesta + ratio + citas
2. Este skill (jurisprudencia-col) audita cada línea
3. Retorna: CONFIRMADA / PARCIAL / INCONSISTENTE
4. Si PARCIAL o INCONSISTENTE: señala qué fallos son problemáticos
5. REDACTOR recibe feedback y reescribe la sección, o declara [No confirmado] y marca para verificación manual por usuario

---

## VINCULACIÓN

| Skill | Relación |
|---|---|
| `redactor-juridico-col` | Audita líneas jurisprudenciales que REDACTOR propone o el usuario aporta |
| `vigilancia-normativa-col` | Complementaria (vigilancia cubre cambios recientes; este audita líneas completas existentes) |
| `anti-hallucination-v3` | Cierre obligatorio antes de entregar auditoría a cliente |
