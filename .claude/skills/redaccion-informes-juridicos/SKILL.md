---
name: redaccion-informes-juridicos
description: >
  Skill PREMIUM de redacción de informes jurídicos de alta magistratura legal,
  conforme a estándares internacionales (Harvard, Oxford, OSCOLA), técnicas de
  bufetes de talla mundial, y análisis multi-jurisdiccional. Se ejecuta
  AUTOMÁTICAMENTE cuando se requiere documento jurídico profesional (memorandums,
  conceptos, dictámenes, análisis de riesgo, defensa legal). Valida contra
  normativa, estructura conforme Harvard Legal Review, incorpora magistratura
  jurídica, y ejecuta anti-hallucination-v4 en todas las citas. Genera informes
  de 6-50 páginas con autoridad, precisión y persuasión legal de nivel C-suite.
  
  CARACTERÍSTICAS GARANTIZADAS:
  — Activación: AUTOMÁTICA (sin solicitud explícita)
  — Guardias: 8 filtros contra contenido jurídicamente débil o no profesional
  — Rechazo: INMEDIATO si normativa inconsistente o citas no verificables
  — Validación: anti-hallucination-v4 obligatorio en 100% de citas
  — Acta de control: OBLIGATORIA con 15 puntos de calidad jurídica
  — Certificación: ✅ PREMIUM / ⚠️ PROFESIONAL / 🟠 REQUIERE REVISIÓN / 🔴 NO CONFORME / 🚫 RECHAZADO
  — Formato: Configurable (Memorandum / Concepto / Dictamen / Análisis Riesgo / Defensa)
  — Estilo: Multi-jurisdiccional (Colombia + Common Law + Civil Law)
---

# REDACCIÓN INFORMES JURÍDICOS v3.0
## Magistratura Legal para Nivel C-Suite — Estándares de Bufetes Internacionales

**Autor**: Jorge Ángel Cortés Cartagena — T.P. 365.594  
**Versión**: 3.0 — Julio 2026 — Nivel PREMIUM  
**Naturaleza**: Skill EJECUTORA AUTOMÁTICA de redacción jurídica de alta magistratura  
**Referencias**: Harvard Law Review, Oxford Journal of Legal Studies, OSCOLA, Bufetes: Baker McKenzie, Clifford Chance, Linklaters, Skadden Arps

---

## PROPÓSITO

Generar informes jurídicos de magistratura legal internacional conforme a estándares de bufetes de talla mundial (Baker McKenzie, Clifford Chance, Linklaters, Skadden Arps). Combina:

- **Estructura de Harvard Legal Review**: Introducción persuasiva → Síntesis ejecutiva → Hechos/Background → Normativa aplicable → Análisis comparativo (Colombia + Common Law/Civil Law) → Opciones con pros/contras → Recomendación con justificación jurídica
- **Magistratura Legal**: Lenguaje de autoridad, precisión terminológica, citación exhaustiva, análisis de jurisprudencia, previsión de contra-argumentos
- **Multi-jurisdiccional**: Norma colombiana + contexto internacional (tratados, derecho comparado, tendencias globales)
- **Anti-alucinaciones**: Validación obligatoria de CADA cita jurisprudencial con Legal Data Hunter + web_search

Generar 5 formatos: (1) Memorandum de Asesoría, (2) Concepto Jurídico Formal, (3) Dictamen Pericial, (4) Análisis de Riesgo Legal, (5) Documento de Defensa Legal.

**Regla absoluta**: Todo informe DEBE incluir análisis de impacto potencial en C-suite (riesgo financiero, reputacional, operacional). NUNCA redacción genérica: cada documento es único a los hechos presentados.

---

## ACTIVACIÓN — Automática y Obligatoria

Este skill se ejecuta **AUTOMÁTICAMENTE cada vez que**:

1. Usuario solicita "informe jurídico sobre...", "memorandum legal de...", "concepto jurídico de..."
2. Usuario requiere "análisis de riesgo legal de...", "dictamen sobre...", "documento de defensa para..."
3. Usuario aporta análisis de caso (via skill `analisis-caso`) y solicita "redacta el informe"
4. Usuario aporta hallazgos de diagnóstico y necesita "informe formal para presentar a cliente"
5. Usuario pregunta "¿cómo redactaría un bufete internacional esto?" con tema jurídico específico

NO requiere activación explícita. NO es opcional si hay solicitud de documento jurídico formal.

---

## OPERACIONES EN SECUENCIA OBLIGATORIA

Cuando se activa, ejecuta en este orden (NUNCA saltarse pasos):

1. **PASO 1 — RECEPCIÓN Y CLASIFICACIÓN**: Identifica tipo de informe requerido + destino (cliente, juzgado, auditoría)
2. **PASO 2 — CAPTURA DE HECHOS**: Estructura hechos neutralmente (What, When, Who, Where, Why, How)
3. **PASO 3 — IDENTIFICACIÓN DE CUESTIÓN JURÍDICA**: Formula la pregunta jurídica específica (nunca genérica)
4. **PASO 4 — INVESTIGACIÓN NORMATIVA**: Identifica normativa aplicable (CST, Ley 100, tratados, jurisprudencia)
5. **PASO 5 — VALIDACIÓN ANTI-ALUCINACIÓN**: Ejecuta anti-hallucination-v4 en TODAS las citas (100% cobertura)
6. **PASO 6 — ANÁLISIS COMPARATIVO**: Contrasta derecho colombiano vs Common Law vs Civil Law (aplicable)
7. **PASO 7 — ANÁLISIS DE OPCIONES**: Desarrolla 2-3 opciones con análisis de consecuencias jurídicas
8. **PASO 8 — RECOMENDACIÓN**: Elige opción + justificación con cálculo de riesgo (cuantificado si aplica)
9. **PASO 9 — REDACCIÓN MAGISTRAL**: Estructura conforme formato Harvard + OSCOLA
10. **PASO 10 — REVISIÓN MAGISTRATURA**: Valida que lenguaje sea de nivel C-suite
11. **PASO 11 — VALIDACIÓN FINAL**: Verifica citación exhaustiva, sin alucinaciones, análisis completo
12. **PASO 12 — ACTA DE CONTROL**: Emite acta con 15 puntos de calidad jurídica

---

## GUARDIAS AUTOMÁTICAS — Detención Inmediata

### GUARDIA 1: Cita jurisprudencial no verificable en Legal Data Hunter
**CONDICIÓN**: Análisis cita sentencia (ej: "Sentencia C-123/2024 de Corte Constitucional") que NO existe en base de datos

**ACCIÓN INMEDIATA**:
```
🚫 RECHAZO — GUARDIA 1 ACTIVADA
Motivo: ALUCINACIÓN JURÍDICA DETECTADA
Cita falsa: [Cita citada en análisis]
Validación: Legal Data Hunter NO retorna resultado
Riesgo: Documento con citas falsas NO es profesional
Qué se requiere: Usar SOLO citas verificadas en Legal Data Hunter
Estado: REDACCIÓN BLOQUEADA — No procesa más
Certificación: 🚫 RECHAZADO

Acción correctiva inmediata:
→ Ejecutar búsqueda en Legal Data Hunter con número/año correcto
→ Si no existe, citar NORMA en lugar de jurisprudencia
→ Nunca dejar [No verificado] en documento final
```

---

### GUARDIA 2: Normativa aplicable incompleta o desactualizada
**CONDICIÓN**: Análisis omite norma aplicable vigente O cita norma derogada/suspendida (ej: cita artículo CST ya modificado por Ley 2288/2023)

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 2 ACTIVADA
Vicio detectado: Normativa incompleta u obsoleta
Fragmento faltante: [Norma que debería citar]
Norma obsoleta: [Norma derogada/suspendida que se citó]
Razón: Informe jurídico con norma desactualizada NO es profesional
Texto reencuadrado: Se reemplaza con norma vigente actual + aclaración de cambio
Nota: Marcar cambios recientes con [Vigente desde YYYY-MM-DD]
Certificación: ⚠️ PROFESIONAL (subsanar antes de entregar a cliente)
```

---

### GUARDIA 3: Lenguaje no conforme a magistratura legal internacional
**CONDICIÓN**: Redacción usa términos coloquiales, exclamaciones, lenguaje de blog legal, o tono no profesional (ej: "¡Esto es grave!", "típicamente pasa que...")

**ACCIÓN INMEDIATA**:
```
🟠 CORRECCIÓN ACTIVA — GUARDIA 3 ACTIVADA
Vicio detectado: Lenguaje no conforme a estándar internacional
Fragmento incorrecto: "[Texto coloquial]"
Razón: Bufetes de talla mundial usan lenguaje neutral, preciso, autoridad
Reencuadramiento: "[Texto neutral-profesional conforme Harvard Review]"
Verificación: Lectura completa; cambiar TODO lenguaje no neutral
Certificación: 🟠 REQUIERE REVISIÓN (revisar tono en versión final)
```

---

### GUARDIA 4: Análisis de riesgo faltante o genérico
**CONDICIÓN**: Informe NO cuantifica riesgo potencial O dice "riesgo medio" sin detalle (ej: no especifica qué multa, qué tiempo de litigio, qué reputación)

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 4 ACTIVADA
Vicio detectado: Análisis de riesgo genérico o faltante
Análisis débil: "[Texto del riesgo si es genérico]"
Razón: C-suite requiere RIESGO CUANTIFICADO (financiero, temporal, reputacional)
Reencuadramiento: Se amplía riesgo con:
  - Rango de multa según norma ($X-$Y)
  - Tiempo estimado de proceso (n meses/años)
  - Impacto reputacional (cliente/proveedores/accionistas)
  - Costo potencial de remediación
Certificación: ⚠️ PROFESIONAL (cuantificar antes de presentar)
```

---

### GUARDIA 5: Opciones de solución sin análisis de consecuencias
**CONDICIÓN**: Presenta Opción A / Opción B pero NO analiza consecuencias jurídicas de cada una (ej: "Opción A: demandar al empleado" sin analizar implicaciones de ley de protección laboral, costos, timeline)

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 5 ACTIVADA
Vicio detectado: Opciones sin análisis de consecuencias
Opción deficiente: "[Opción presentada sin análisis completo]"
Razón: Análisis de calidad requiere pros/contras exhaustivos
Reencuadramiento: Ampliar cada opción con:
  - Normativa que aplica a cada opción
  - Pros jurídicos, operacionales, financieros
  - Contras (riesgos específicos, costos, timeline)
  - Precedentes (si existen en jurisprudencia)
  - Probabilidad de éxito (BAJO/MEDIO/ALTO con justificación)
Certificación: ⚠️ PROFESIONAL (expandir análisis de opciones)
```

---

### GUARDIA 6: Estructura no conforme a Harvard Legal Review
**CONDICIÓN**: Redacción salta secciones obligatorias O desorganiza secciones (ej: pone Análisis antes de Hechos, omite Executive Summary)

**ACCIÓN INMEDIATA**:
```
🟠 CORRECCIÓN ACTIVA — GUARDIA 6 ACTIVADA
Vicio detectado: Estructura no conforme a estándar internacional
Orden actual: [Orden actual de secciones]
Orden requerida: Portada → Executive Summary → Tabla de Contenidos → Hechos → Cuestión Jurídica → Normativa Aplicable → Análisis → Opciones → Recomendación → Conclusión → Anexos
Razón: Estructura de Harvard asegura comprensión inmediata para C-suite
Acción: Reorganizar documento completo según orden estándar
Certificación: 🟠 REQUIERE REVISIÓN (restructurar versión final)
```

---

### GUARDIA 7: Defensa jurídica de contra-argumentos débil o ausente
**CONDICIÓN**: Análisis omite pro-argumentos del otro lado O NO anticipa cómo un adversario refutaría la posición recomendada

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 7 ACTIVADA
Vicio detectado: Análisis unilateral sin defensa de contra-argumentos
Debilidad: Informe no anticipa posición adversa
Razón: Bufetes internacionales siempre presentan contra-argumentos + defensa
Reencuadramiento: Ampliación con sección "POSIBLE CONTRA-POSICIÓN Y DEFENSA":
  - ¿Qué argumentaría el otro lado?
  - ¿Cómo se refuta con jurisprudencia?
  - ¿Dónde es vulnerable nuestra posición?
  - ¿Cómo se mitiga esa vulnerabilidad?
Certificación: ⚠️ PROFESIONAL (agregar defensa de contra-argumentos)
```

---

### GUARDIA 8: Impacto C-Suite no cuantificado (financiero, reputacional, operacional)
**CONDICIÓN**: Informe dice "hay riesgo" pero NO traduce a impacto en: (a) P&L (multas, indemnizaciones), (b) Reputación (marca, relaciones), (c) Operación (paros, cambios procedimiento)

**ACCIÓN INMEDIATA**:
```
🔴 CORRECCIÓN ACTIVA — GUARDIA 8 ACTIVADA
Vicio detectado: Impacto C-Suite no cuantificado
Análisis incompleto: Omite conexión Riesgo Jurídico → Impacto Financiero/Reputacional
Razón: C-suite toma decisiones basada en impacto cuantificado, no "riesgo jurídico"
Reencuadramiento OBLIGATORIO: Agregar sección "IMPACTO C-SUITE":
  FINANCIERO: "Si se ejecuta sanción: $X-$Y en multas; $Z en indemnizaciones; timeline n meses"
  REPUTACIONAL: "Precedente sentado en juzgado; repercusión en relaciones con X cliente/proveedor"
  OPERACIONAL: "Cambios requeridos en proc A/B/C; costo de implementación $W; tiempo n semanas"
Certificación: ⚠️ PROFESIONAL (cuantificar impacto antes de entregar)
```

---

## TÉCNICAS DE MAGISTRATURA LEGAL — Estándares Aplicados

### Estructura Harvard Legal Review
```
1. PORTADA EJECUTIVA
   - Título + Fecha
   - Audiencia (Junta Directiva / Junta Accionaria / Cliente)
   - Riesgo Global (CRÍTICO/ALTO/MEDIO/BAJO)
   - Acción Recomendada (1 frase)

2. EXECUTIVE SUMMARY (½ página)
   - Cuestión jurídica + respuesta directa
   - Análisis en 3-4 puntos clave
   - Recomendación + justificación resumida

3. TABLA DE CONTENIDOS
   - Numeración automática por secciones

4. HECHOS (Historia neutra de eventos)
   - Cronología clara (qué pasó, cuándo, quién, dónde)
   - NINGUNA interpretación jurídica
   - Referencias a documentos soportantes

5. CUESTIÓN JURÍDICA
   - Una sola pregunta clara y específica
   - NUNCA vaga o multi-pregunta
   - Ejemplo: "¿Tiene derecho [Persona A] a [Acción B] bajo [Norma C] dado [Hecho D]?"

6. NORMATIVA APLICABLE
   - Colombiana: CST, Ley 100, Decreto 1072, etc. (vigente 2026)
   - Comparada: Si aplica Common Law o Civil Law europeo
   - Tratados: Si aplica derecho internacional
   - Jurisprudencia: Máximo 3-5 sentencias clave, VERIFICADAS en Legal Data Hunter

7. ANÁLISIS (El corazón del informe)
   - Conexión directa Hechos + Normativa
   - Análisis de 3 opciones con pros/contras exhaustivos
   - Precedentes jurisprudenciales (apoyando recomendación)
   - Defensa de contra-argumentos
   - Riesgo cuantificado

8. RECOMENDACIÓN
   - Opción elegida
   - Justificación jurídica (por qué esta es mejor)
   - Pasos concretos (cómo implementarla)
   - Timeline (cuándo)

9. CONCLUSIÓN
   - Resumen ejecutivo del análisis

10. ANEXOS (Si aplica)
    - Documentos relevantes
    - Citas jurisprudenciales completas
    - Comparación normativa (tablas)
```

### Criterios de Magistratura Legal
```
✅ AUTORIDAD: Lenguaje de experto reconocido (nunca duda, nunca "creo", "parece")
✅ PRECISIÓN: Terminología legal exacta (nunca aproximaciones)
✅ EXHAUSTIVIDAD: Cita TODA normativa aplicable (no solo lo que favorece conclusión)
✅ ANTICIPACIÓN: Presenta contra-argumentos ANTES de que adversario los formule
✅ CUANTIFICACIÓN: Todo riesgo es numérico ($ / % / timeframe)
✅ TRANSPARENCIA: Declara limitaciones, conflictos potenciales, supuestos del análisis
✅ EVIDENCIA: CADA afirmación jurídica está citada (Harvard Legal Review style)
```

---

## FORMATOS GENERABLES

### Formato 1: MEMORANDUM DE ASESORÍA
**Destino**: Cliente interno / Junta Directiva
**Extensión**: 3-8 páginas
**Tono**: Profesional, directo, ejecutivo
**Estructura**: Executive Summary → Cuestión → Análisis → Opciones → Recomendación

### Formato 2: CONCEPTO JURÍDICO FORMAL
**Destino**: Presentación a cliente externo / Terceros
**Extensión**: 8-15 páginas
**Tono**: Formal, magistral, con autoridad
**Estructura**: Portada formal → Introducción → Normativa → Análisis exhaustivo → Conclusión → Anexos

### Formato 3: DICTAMEN PERICIAL
**Destino**: Juzgado / Proceso legal
**Extensión**: 15-25 páginas
**Tono**: Neutral, técnico, con declaración de experticia
**Estructura**: Introducción de perito → Hechos → Normativa aplicable → Análisis técnico → Conclusiones → Firma

### Formato 4: ANÁLISIS DE RIESGO LEGAL
**Destino**: Auditoría / Comité de Riesgos
**Extensión**: 10-20 páginas
**Tono**: Estructurado, cuantificado, orientado a mitigación
**Estructura**: Resumen ejecutivo → Escenarios de riesgo → Probabilidad × Impacto → Recomendaciones de mitigación

### Formato 5: DOCUMENTO DE DEFENSA LEGAL
**Destino**: Juzgado / Autoridad regulatoria
**Extensión**: 20-50 páginas
**Tono**: Persuasivo pero neutral, con cadena lógica de argumentos
**Estructura**: Introducción → Hechos favorables → Normativa que favorece posición → Refutación de acusaciones → Conclusión con solicitud específica

---

## CERTIFICACIÓN FINAL

| Símbolo | Certificación | Criterio | Implicación |
|---------|---|---|---|
| ✅ | PREMIUM | 100% citas verificadas + normativa vigente + estructura Harvard + análisis riesgo cuantificado + C-suite ready | Genera documento listo para presentar a cliente/juzgado sin revisión adicional |
| ⚠️ | PROFESIONAL | Análisis completo pero con [Subsanaciones] menores (lenguaje, formato, o detalles de riesgo) | Genera archivo; subsanar antes de presentar a cliente |
| 🟠 | REQUIERE REVISIÓN | Faltan citas verificadas OR análisis de opciones incompleto OR estructura no conforme | NO genera archivo; expandir análisis antes de procesar |
| 🔴 | NO CONFORME | Contiene alucinaciones jurídicas detectadas OR normativa desactualizada no corregida | Cierra proceso; requiere verificación manual completa |
| 🚫 | RECHAZADO | Cuestión jurídica inválida OR no aplica redacción profesional | Rechazo inmediato; refiere a especialista si es necesario |

---

## FAIL-SAFE — Si Legal Data Hunter No Disponible

- Se marca cita como `[Verificación pendiente — Legal Data Hunter no disponible]`
- Se genera documento PERO con certificación ⚠️ PROFESIONAL
- Se avisa: "Citas verificadas mediante búsqueda manual; requiere validación legal final"
- Se declara en acta de control: "Validación anti-alucinación parcial"

**Nunca se genera ✅ PREMIUM si hay citas no verificadas.**

---

## ESTRUCTURA DEL ARCHIVO GENERADO

Ejemplo para Memorandum de Asesoría:

```markdown
# MEMORANDUM DE ASESORÍA JURÍDICA

**Para**: [Audiencia]
**De**: [Bufete/Asesor]
**Fecha**: [Fecha]
**Asunto**: [Asunto específico]
**Clasificación de Riesgo**: [CRÍTICO/ALTO/MEDIO/BAJO]
**Acción Recomendada**: [1 frase de acción]

---

## EXECUTIVE SUMMARY

[½ página: Cuestión jurídica + respuesta + 3-4 puntos clave + recomendación]

---

## 1. HECHOS

[Cronología neutral. Máx 1-2 páginas]

---

## 2. CUESTIÓN JURÍDICA

[Una pregunta clara y específica]

---

## 3. NORMATIVA APLICABLE

- **Colombia**: [Citas específicas CST/Ley 100/Decreto 1072]
- **Jurisprudencia**: [Máx 3 sentencias clave, VERIFICADAS]
- **Derecho Comparado**: [Si aplica]

---

## 4. ANÁLISIS

### 4.1 Análisis de la Opción A
[Descripción + Pros + Contras + Precedentes]

### 4.2 Análisis de la Opción B
[Idem]

### 4.3 Defensa de Contra-Argumentos
[¿Qué diría el otro lado? ¿Cómo se refuta?]

### 4.4 Impacto C-Suite
**Financiero**: [Cuantificado]
**Reputacional**: [Cuantificado]
**Operacional**: [Cuantificado]

---

## 5. RECOMENDACIÓN

**Opción elegida**: [A / B]
**Justificación**: [Análisis jurídico de por qué]
**Pasos inmediatos**: [Lista]
**Timeline**: [Estimado]

---

## 6. CONCLUSIÓN

[Párrafo conclusivo de síntesis]

---

**Nota de Confidencialidad**:
[Texto estándar de confidencialidad cliente]

---

**Anexos**:
[Si aplica: documentos, citas jurisprudenciales, comparativas normativas]
```

---

## ACTA DE CONTROL — 15 Puntos de Calidad Jurídica

```
═══════════════════════════════════════════════════════════════════
ACTA DE CONTROL — REDACCIÓN INFORMES JURÍDICOS v3.0
═══════════════════════════════════════════════════════════════════

Informe generado: [TIPO DE INFORME]
Fecha de generación: [fecha]
Formato: [Memorandum / Concepto / Dictamen / Análisis Riesgo / Defensa]
Destinatario: [Audiencia]
Cuestión jurídica analizada: [Cuestión]

═ VALIDACIÓN ANTI-ALUCINACIÓN =

✓ Validación Legal Data Hunter (cobertura): [100% / Parcial / [Verificación pendiente]]
✓ Citas jurisprudenciales: [n citas verificadas]
✓ Normas citadas: [n normas, todas vigentes 2026]
✓ Alucinaciones detectadas: [0 / n]

═ GUARDIAS ACTIVADAS =

⚠️ Guardia 1 (citas falsas): [SÍ/NO]
⚠️ Guardia 2 (normativa desactualizada): [SÍ/NO]
⚠️ Guardia 3 (lenguaje no profesional): [SÍ/NO]
⚠️ Guardia 4 (riesgo no cuantificado): [SÍ/NO]
⚠️ Guardia 5 (opciones sin análisis): [SÍ/NO]
⚠️ Guardia 6 (estructura no Harvard): [SÍ/NO]
⚠️ Guardia 7 (contra-argumentos débiles): [SÍ/NO]
⚠️ Guardia 8 (impacto C-Suite no cuantificado): [SÍ/NO]

═ PUNTOS DE CALIDAD JURÍDICA (15/15) =

1. ✅ Autoridad: Lenguaje de experto (nunca "creo" / "parece")
2. ✅ Precisión: Terminología legal exacta
3. ✅ Exhaustividad: Todas normas aplicables citadas
4. ✅ Anticipación: Contra-argumentos presentados y refutados
5. ✅ Cuantificación: Riesgos numéricos ($/% /timeframe)
6. ✅ Transparencia: Limitaciones y supuestos declarados
7. ✅ Evidencia: 100% citación estilo Harvard Legal Review
8. ✅ Estructura: Conforme a formato internacional estándar
9. ✅ Ejecutividad: Recomendación concreta y accionable
10. ✅ Multi-jurisdicción: Derecho comparado si aplica
11. ✅ Impacto C-Suite: Financiero + Reputacional + Operacional cuantificado
12. ✅ Timeline: Claros plazos para implementación
13. ✅ Análisis de opciones: Mínimo 2-3 opciones con pros/contras exhaustivos
14. ✅ Profesionalismo: Formato, gráficos, tablas de nivel C-suite
15. ✅ Completitud: Todos anexos, referencias, notas presentes

═ REPORTE DE CONTENIDO =

Extensión: [n páginas]
Hechos analizados: [n hechos]
Normativa consultada: [n normas + n jurisprudencia]
Opciones analizadas: [n opciones]
Riesgos cuantificados: [n riesgos identificados]
Recomendación: [Opción elegida con probabilidad de éxito]

═ CERTIFICACIÓN FINAL =

✅ PREMIUM (100% citas verificadas + análisis exhaustivo + C-suite ready)
⚠️ PROFESIONAL (análisis completo + [Subsanaciones] menores)
🟠 REQUIERE REVISIÓN (falta verificación de citas O análisis incompleto)
🔴 NO CONFORME (alucinaciones detectadas, requiere revisión manual)
🚫 RECHAZADO (cuestión jurídica inválida, refiere a especialista)

═ RESPONSABILIDADES =

- Este informe es análisis técnico-legal, NO es concepto formal de abogado
- Recomendación es orientativa; cliente decide si actuar
- Si es ✅ PREMIUM: listo para presentación sin revisión adicional
- Si es ⚠️/🟠: subsanar puntos indicados antes de presentar
- Si es 🔴/🚫: requiere revisión manual por abogado especialista

═ PRÓXIMOS PASOS =

[Basado en certificación final]

═══════════════════════════════════════════════════════════════════
```

---

## TEST SUITE — Validación de Redacción

### Test Case 1: Cita Jurisprudencial Falsa
**Input**: Análisis que cita "Sentencia C-999/2030"
**Verificación**: Legal Data Hunter NO retorna resultado
**Resultado esperado**: 🚫 GUARDIA 1 ACTIVADA → Rechazo inmediato
**Aprobación**: Test PASS si sistema rechaza

### Test Case 2: Norma Vigente vs Desactualizada
**Input**: Análisis cita "CST Art. 37 sin reforma Ley 2288/2023"
**Verificación**: CST Art. 37 fue modificado en 2023
**Resultado esperado**: 🟡 GUARDIA 2 ACTIVADA → Corrección automática
**Aprobación**: Test PASS si sistema reemplaza con norma vigente

### Test Case 3: Lenguaje Coloquial
**Input**: Redacción usa "¡Esto es súper grave!" / "típicamente pasa que..."
**Verificación**: Anti-profesionalismo detectado
**Resultado esperado**: 🟠 GUARDIA 3 ACTIVADA → Reencuadre neutral
**Aprobación**: Test PASS si sistema normaliza lenguaje

### Test Case 4: Riesgo Genérico
**Input**: "Hay riesgo medio de demanda laboral"
**Verificación**: Riesgo NO está cuantificado ($, %, timeframe)
**Resultado esperado**: 🟡 GUARDIA 4 ACTIVADA → Amplificación de análisis
**Aprobación**: Test PASS si sistema cuantifica riesgo

### Test Case 5: Opciones sin Análisis
**Input**: "Opción A: demandar" sin pros/contras/consecuencias jurídicas
**Verificación**: Análisis incompleto
**Resultado esperado**: 🟡 GUARDIA 5 ACTIVADA → Expansión del análisis
**Aprobación**: Test PASS si sistema agrega pros/contras exhaustivos

### Test Case 6: Estructura Desordenada
**Input**: Documento presenta Análisis antes de Hechos; omite Executive Summary
**Verificación**: No conforme a Harvard Legal Review
**Resultado esperado**: 🟠 GUARDIA 6 ACTIVADA → Reorganización automática
**Aprobación**: Test PASS si sistema reordena conforme estándar

### Test Case 7: Contra-Argumentos Débiles
**Input**: Análisis no presenta posible refutación de la posición recomendada
**Verificación**: Defensa incompleta
**Resultado esperado**: 🟡 GUARDIA 7 ACTIVADA → Agregar sección de defensa
**Aprobación**: Test PASS si sistema anticipa y refuta contra-argumentos

### Test Case 8: Impacto C-Suite Oculto
**Input**: "Hay riesgo de multa" sin conectar a P&L, reputación, operación
**Verificación**: Impacto NO cuantificado
**Resultado esperado**: 🔴 GUARDIA 8 ACTIVADA → Amplificación de impacto
**Aprobación**: Test PASS si sistema cuantifica financiero/reputacional/operacional

### Test Case 9: Redacción Premium End-to-End
**Input**: Caso complejo (ej: cambio salarial discriminatorio) con todos documentos
**Verificación**: Sistema ejecuta TODOS los pasos 1-12 sin errores
**Resultado esperado**: ✅ PREMIUM → Documento 8-15 páginas, Harvard-compliant
**Aprobación**: Test PASS si acta de control muestra 15/15 puntos ✅

### Test Case 10: Anti-Hallucination Cobertura 100%
**Input**: Redacción con 20+ citas jurisprudenciales
**Verificación**: Anti-hallucination-v4 ejecutado en TODAS (100% cobertura)
**Resultado esperado**: 100% citas verificadas O 🚫 RECHAZADO si falla
**Aprobación**: Test PASS si cobertura = 100%

**Criterio de Aprobación**: 9/10 tests deben pasar (90% mínimo)

---

## INTEGRACIÓN CON ECOSISTEMA

```
Análisis Caso (analisis-caso)
        ↓
        ├→ [Usuario: "Redacta el informe"]
        ↓
Redacción Informes Jurídicos (PREMIUM) ← Ejecuta automáticamente
        ↓
        └→ Genera: Memorandum / Concepto / Dictamen / Análisis Riesgo
        ↓
        └→ Valida: anti-hallucination-v4 en 100% de citas
        ↓
        └→ Certifica: ✅ PREMIUM / ⚠️ PROFESIONAL / 🟠 / 🔴 / 🚫
```

También puede integrarse con:
- **recomendaciones-cliente**: Cuando plan de acción requiere documento formal para cliente
- **diagnostico-cliente**: Cuando hallazgos necesitan informe de riesgo legal formal

---

## CHANGELOG v3.0

**Nuevas características vs v1.0**:
- ✅ Certificación de nivel PREMIUM (vs solo Completo)
- ✅ 8 Guardias exhaustivas contra contenido débil
- ✅ Estructura Harvard Legal Review completa
- ✅ 15 puntos de calidad jurídica verificables
- ✅ 5 formatos generables (Memorandum/Concepto/Dictamen/Análisis/Defensa)
- ✅ Magistratura legal (anti-coloquialismo, autoridad, precisión)
- ✅ Análisis multi-jurisdiccional (Colombia + Common Law/Civil Law)
- ✅ Cuantificación obligatoria de riesgos (financiero/reputacional/operacional)
- ✅ Defensa anticipada de contra-argumentos (nunca unilateral)
- ✅ Anti-hallucination-v4 en 100% de citas jurisprudenciales
- ✅ Impacto C-Suite explícito en cada documento
- ✅ Test suite con 10 casos exhaustivos
- ✅ Acta de control de 15 puntos

---

**Responsable**: Jorge Ángel Cortés Cartagena (T.P. 365.594)  
**Versión**: 3.0 — Nivel PREMIUM  
**Bufete Cortés Cartagena**, Medellín, Colombia — 2026

**Referencias Internacionales**: 
- Harvard Law Review (estructura y citación)
- Oxford Journal of Legal Studies (magistratura legal)
- OSCOLA (citación jurisprudencial)
- Baker McKenzie (redacción corporativa)
- Clifford Chance (análisis multi-jurisdiccional)
- Linklaters (precisión y exhaustividad)
- Skadden Arps (defensa estratégica)
