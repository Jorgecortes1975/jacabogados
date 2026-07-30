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

# REDACCIÓN INFORMES JURÍDICOS v3.1
## Magistratura Legal para Nivel C-Suite — Estándares de Bufetes Internacionales + Integración anti-hallucination-v4.2

**Autor**: Jorge Ángel Cortés Cartagena — T.P. 365.594  
**Versión**: 3.1 — Julio 2026 — Nivel PREMIUM con matriz confianza + validación multi-idioma  
**Versión anterior**: 3.0 — vigente con 8 guardias + acta 15 puntos
**Naturaleza**: Skill EJECUTORA AUTOMÁTICA de redacción jurídica de alta magistratura con handoff integrado anti-hallucination-v4.2  
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

### GUARDIA 9: Validación multi-idioma omitida — v3.1 NOVEDAD
**CONDICIÓN**: Documento contiene citas o análisis en idioma no-español (English, Spanish europeo, otras jurisdicciones) sin validación de equivalentes legales o traducción.

**ACCIÓN INMEDIATA**:
```
🟡 CORRECCIÓN ACTIVA — GUARDIA 9 ACTIVADA (v3.1)
Vicio detectado: Términos jurídicos multi-idioma sin validación
Idiomas detectados: [listar: Spanish(CO), English(UK/USA), Spanish(ES), etc.]
Acción: Se REQUIERE:
  1. Cada término legal en idioma no-español: traducción exacta + equivalente colombiano
  2. Si no hay equivalente exacto: etiquetación [Sin equivalente exacto en derecho colombiano]
  3. Matriz de validación: término original | traducción | equivalente colombiano | confianza (Alto/Medio/Bajo)
Certificación: ⚠️ PROFESIONAL (subsanar validación multi-idioma)
```

---

## INTEGRACIÓN CON ANTI-HALLUCINATION-v4.2 — v3.1 NOVEDAD

**AUTOMATISMO OBLIGATORIO**: Cada documento de redacción-informes-juridicos v3.1 se somete automáticamente a anti-hallucination-v4.2 ANTES de ser considerado final.

**FLUJO DE INTEGRACIÓN**:

```
Redacción-Informes v3.1 (generación de documento)
         ↓
    [Documento completo con todas las citas]
         ↓
    anti-hallucination-v4.2 (EJECUCIÓN AUTOMÁTICA)
         ├→ Verificación de citas en Legal Data Hunter (100% cobertura)
         ├→ Análisis multi-jurisdiccional (si aplica)
         ├→ Matriz de confianza por cita (Alto/Medio/Bajo)
         ├→ Validación multi-idioma (si aplica)
         └→ Genera ACTA v4.2 con 15 puntos + certificación
         ↓
    SI certificación anti-hallucination = [✅ APTO o ⚠️ CONDICIONAL]
         ↓
    Redacción-Informes emite documento FINAL
    CON acta anti-hallucination adjunta en ANEXO
         ↓
    Certificación redaccion-informes = [Mismo nivel anti-hallucination]
    
    SI certificación anti-hallucination = [🟠 REQUIERE REVISIÓN o peor]
         ↓
    Redacción-Informes RETORNA a análisis primario
    NO emite documento (BLOQUEADO hasta corregir)
```

**Regla**: Redaccion-informes v3.1 NUNCA emite documento con certificación ✅ PREMIUM si anti-hallucination-v4.2 retorna [🟠 REQUIERE REVISIÓN] o peor.

---

## MATRIZ DE CONFIANZA EN CITAS — v3.1 NOVEDAD

Cada cita jurídica en el documento recibe clasificación de confianza integrada con anti-hallucination-v4.2:

| Confianza | Criterio | Uso en redacción | Marca en ACTA |
|---|---|---|---|
| **ALTA** | Cita 100% verificable Legal Data Hunter + Relatoria oficial, vigencia confirmada | Fundamento principal + análisis de ratio | ✅ Confianza ALTA |
| **MEDIA** | Cita verificable pero requiere interpretación o matiz, o vigencia con cambios posteriores | Fundamento secundario + aclaración, etiqueta [Confianza Media — detalle: ...] | ⚠️ Confianza MEDIA |
| **BAJA** | Cita no verificable o con contradicciones entre fuentes | NO usar como fundamento principal | ❌ Confianza BAJA |

**Reporte obligatorio en ACTA de control v3.1**:
- % Citas Confianza ALTA: [n%]
- % Citas Confianza MEDIA: [n%]
- % Citas Confianza BAJA: [n%]

Si % Confianza BAJA ≥ 15%, certificación máxima es ⚠️ PROFESIONAL (no PREMIUM).

---

## VALIDACIÓN MULTI-IDIOMA — v3.1 NOVEDAD

**CUANDO APLICA**: Documento contiene citas, análisis o comparación en idiomas múltiples (Spanish(CO)/Spanish(ES)/English/French/otros).

**VALIDACIÓN OBLIGATORIA POR IDIOMA**:

| Idioma | Fuente primaria | Validación requerida |
|---|---|---|
| **Español (Colombia)** | SUIN-Juriscol, Correlatoria, MINSALUD | Vigencia + Equivalente en CST |
| **Español (España)** | BOE, Boletines oficiales, Códigos civiles | Vigencia + Equivalencia Civil Law europea |
| **English (UK)** | Bailii, UK Parliament, Case Law databases | Precedente verificable + equivalente colombiano |
| **English (USA)** | US Courts, Federal Reporter, state databases | Jurisprudencia verificable + equivalencia Common Law |
| **Francés/Alemán/otros** | Derecho comparado académico | Traducción + equivalencia ordenamiento colombiano |

**Etiquetación multi-idioma obligatoria**:
- `[Equivalente colombiano: ...]` — Cuando término foreign tiene equivalente exacto
- `[Sin equivalente exacto en derecho colombiano]` — Cuando figura es extranjera sin equivalencia
- `[Traducción: ...]` — Cuando se traduce término legal de otro idioma

**Reporte en ACTA v3.1**:
- Idiomas detectados: [listar]
- Términos foreign con equivalente: [cantidad]
- Términos sin equivalente documentados: [cantidad]
- Validación multi-idioma completada: [SÍ / NO]

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

## ACTA DE CONTROL v3.1 — 15 Puntos de Calidad Jurídica + Integración anti-hallucination-v4.2

```
═══════════════════════════════════════════════════════════════════
ACTA DE CONTROL — REDACCIÓN INFORMES JURÍDICOS v3.1
═══════════════════════════════════════════════════════════════════

Informe generado: [TIPO DE INFORME]
Fecha de generación: [fecha]
Formato: [Memorandum / Concepto / Dictamen / Análisis Riesgo / Defensa]
Destinatario: [Audiencia]
Cuestión jurídica analizada: [Cuestión]

═══════════════════════════════════════════════════════════════════
PUNTOS DE VALIDACIÓN v3.1 (15 PUNTOS EXHAUSTIVOS):
═══════════════════════════════════════════════════════════════════

(1) CITAS JURISPRUDENCIALES VERIFICADAS — [SÍ ✅ / NO ❌]
    100% de citas en Legal Data Hunter + Relatoria oficial, sin alucinaciones.
    Citas jurisprudenciales: [cantidad verificada / total]
    Alucinaciones detectadas: [cantidad]

(2) NORMATIVA VIGENTE Y ACTUALIZADA — [SÍ ✅ / NO ❌]
    Todas las leyes, decretos y resoluciones vigentes en 2026. Sin derogatorias aplicables no mencionadas.
    Normas vigentes: [cantidad confirmada]
    Reformas posteriores identificadas: [SÍ (especificar) / NO]

(3) LENGUAJE CONFORME MAGISTRATURA INTERNACIONAL — [SÍ ✅ / NO ❌]
    Redacción neutral, profesional, sin coloquialismo. Estándar Harvard/OSCOLA.
    Tono validado como: [C-suite ready / Profesional / Requiere revisión]

(4) ANÁLISIS DE RIESGO CUANTIFICADO — [SÍ ✅ / NO ❌]
    Todo riesgo con cifra ($), probabilidad (%), y timeline. No "riesgo medio genérico".
    Riesgos cuantificados: [cantidad / total]

(5) OPCIONES CON ANÁLISIS EXHAUSTIVO — [SÍ ✅ / NO ❌]
    Mínimo 2-3 opciones analizadas con pros/contras/normativa/consecuencias jurídicas completas.
    Opciones analizadas: [cantidad con análisis completo / total opciones presentadas]

(6) ESTRUCTURA CONFORME HARVARD LEGAL REVIEW — [SÍ ✅ / NO ❌]
    Documento sigue: Portada → Executive Summary → Hechos → Cuestión Jurídica → Normativa → Análisis → Opciones → Recomendación → Conclusión → Anexos.
    Orden conforme: [SÍ / NO]

(7) DEFENSA DE CONTRA-ARGUMENTOS ANTICIPADA — [SÍ ✅ / NO ❌]
    Análisis incluye posición adversa + refutación jurídica explícita.
    Contra-argumentos anticipados: [SÍ / NO]

(8) IMPACTO C-SUITE CUANTIFICADO — [SÍ ✅ / NO ❌]
    Riesgo traducido a Financiero ($), Reputacional (escala), Operacional (cambios/costo).
    Impacto cuantificado en: [Financiero / Reputacional / Operacional] — [todos / algunos / ninguno]

(9) DATOS DEL CLIENTE Y CONFIDENCIALIDAD — [SÍ ✅ / NO ❌]
    Cero datos sensibles sin protección. Cero placeholders [CLIENTE_*]. Nota de confidencialidad presente.
    Protección de datos: [Completa / Parcial / Faltante]

(10) ANÁLISIS MULTI-JURISDICCIONAL (Si aplica) — [SÍ ✅ / NO / N/A]
     Si documento menciona derecho comparado: análisis contrastivo Colombia vs Common Law vs Civil Law incluido.
     Jurisdicciones analizadas: [listar: Colombia / Common Law / Civil Law / Otra]

(11) MATRIZ DE CONFIANZA EN CITAS (v3.1) — [SÍ ✅ / NO ❌]
     Cada cita clasificada por confianza verificabilidad: Alto/Medio/Bajo según anti-hallucination-v4.2.
     % Confianza ALTA: [n%] | % MEDIA: [n%] | % BAJA: [n%]

(12) VALIDACIÓN MULTI-IDIOMA (v3.1 — Si aplica) — [SÍ ✅ / NO / N/A]
     Si hay citas en idioma no-español: traducción + equivalente colombiano incluido o etiquetado.
     Idiomas detectados: [listar]
     Términos foreign con equivalente: [cantidad]
     Términos sin equivalente documentados: [cantidad]

(13) INTEGRACIÓN ANTI-HALLUCINATION-v4.2 (v3.1) — [SÍ ✅ / NO ❌]
     Documento completó ejecución anti-hallucination-v4.2 automática con acta adjunta.
     ACTA anti-hallucination adjunta: [SÍ / NO]
     Certificación anti-hallucination: [✅ APTO / ⚠️ CONDICIONAL / 🟠 REQUIERE REVISIÓN / 🔴 / 🚫]

(14) GUARDIAS AUTOMÁTICAS REDACCIÓN-INFORMES — [Estado final]
     ⚠️ Guardia 1 (citas falsas): ACTIVADA / No activada
     ⚠️ Guardia 2 (normativa desactualizada): ACTIVADA / No activada
     ⚠️ Guardia 3 (lenguaje no profesional): ACTIVADA / No activada
     ⚠️ Guardia 4 (riesgo no cuantificado): ACTIVADA / No activada
     ⚠️ Guardia 5 (opciones sin análisis): ACTIVADA / No activada
     ⚠️ Guardia 6 (estructura no Harvard): ACTIVADA / No activada
     ⚠️ Guardia 7 (contra-argumentos débiles): ACTIVADA / No activada
     ⚠️ Guardia 8 (impacto C-Suite no cuantificado): ACTIVADA / No activada
     ⚠️ Guardia 9 (validación multi-idioma omitida — v3.1): ACTIVADA / No activada

(15) CERTIFICACIÓN FINAL ACORDE ANTI-HALLUCINATION-v4.2 — [SÍ ✅ / NO ❌]
     Certificación redaccion-informes = Certificación anti-hallucination-v4.2.
     Si anti-hallucination [🟠 o peor]: redaccion-informes NO emite documento (BLOQUEADO).
     Concordancia certificaciones: [SÍ / NO]

═══════════════════════════════════════════════════════════════════
REPORTE DE CONTENIDO:
═══════════════════════════════════════════════════════════════════

Extensión: [n páginas]
Hechos analizados: [n hechos]
Normativa consultada: [n normas + n jurisprudencia]
Opciones analizadas: [n opciones]
Riesgos cuantificados: [n riesgos identificados]
Recomendación: [Opción elegida con probabilidad de éxito]

═══════════════════════════════════════════════════════════════════
CERTIFICACIÓN FINAL:
═══════════════════════════════════════════════════════════════════

✅ PREMIUM
   → 15/15 puntos superados + anti-hallucination ✅ APTO
   → Listo para presentar sin revisión adicional

⚠️ PROFESIONAL
   → 13-14/15 puntos + anti-hallucination ⚠️ CONDICIONAL
   → Subsanar puntos indicados antes de entregar: [especificar]

🟠 REQUIERE REVISIÓN
   → Menos de 13/15 puntos O anti-hallucination 🟠
   → NO emitir documento hasta corregir

🔴 NO CONFORME
   → Anti-hallucination 🔴 SUSPENDIDO
   → Alucinaciones jurídicas detectadas

🚫 RECHAZADO
   → Anti-hallucination 🚫 RECHAZADO
   → Guardias activadas o cuestión jurídica inválida
   → NO se emite documento bajo ninguna circunstancia

CERTIFICACIÓN FINAL: [Marcar una de las 5 anteriores]

═══════════════════════════════════════════════════════════════════
RESPONSABILIDADES Y PRÓXIMOS PASOS:
═══════════════════════════════════════════════════════════════════

✓ Este informe es análisis técnico-legal, NO sustituye concepto de abogado
✓ ACTA anti-hallucination-v4.2 está adjunta como ANEXO obligatorio
✓ Si ✅ PREMIUM: listo para presentar a cliente/juzgado sin revisión adicional
✓ Si ⚠️ PROFESIONAL: JAC subsana puntos antes de entregar
✓ Si 🟠/🔴/🚫: RETORNO a análisis primario, NO se entrega

═══════════════════════════════════════════════════════════════════
```

---

## TEST SUITE v3.1 — Validación de Redacción (17 Test Cases)

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
**Verificación**: Anti-hallucination-v4.2 ejecutado en TODAS (100% cobertura)
**Resultado esperado**: 100% citas verificadas O 🚫 RECHAZADO si falla
**Aprobación**: Test PASS si cobertura = 100%

### Test Case 11: Matriz de Confianza en Citas — v3.1 NOVEDAD
**Input**: Redacción con mix de citas: 5 Alta confianza, 3 Media, 2 Baja
**Verificación**: Cada cita clasificada según verificabilidad Legal Data Hunter
**Resultado esperado**: ACTA muestra % Confianza (Alto/Medio/Bajo) + certificación ⚠️ PROFESIONAL si % Baja ≥ 15%
**Aprobación**: Test PASS si matriz de confianza generada correctamente

### Test Case 12: Validación Multi-Idioma Omitida — v3.1 NOVEDAD
**Input**: Documento cita "UK Common Law principle: 'estoppel'" sin equivalente colombiano
**Verificación**: Término legal foreign SIN traducción ni equivalencia
**Resultado esperado**: 🟡 GUARDIA 9 ACTIVADA → Agregar traducción + equivalente
**Aprobación**: Test PASS si sistema etiqueta [Sin equivalente exacto en derecho colombiano]

### Test Case 13: Validación Multi-Idioma Correcta — v3.1 NOVEDAD
**Input**: Documento analiza "sentencia española sobre no-discriminación" con equivalente colombiano
**Verificación**: Término foreign CON traducción + equivalente + confianza indicada
**Resultado esperado**: ✅ Punto (12) de ACTA validado correctamente
**Aprobación**: Test PASS si ACTA muestra: "Validación multi-idioma completada"

### Test Case 14: Integración anti-hallucination-v4.2 — v3.1 NOVEDAD
**Input**: Redacción v3.1 generada, sometida a anti-hallucination-v4.2
**Verificación**: anti-hallucination-v4.2 ejecuta automáticamente; ACTA v4.2 adjunta; certificaciones concordadas
**Resultado esperado**: ACTA v4.2 adjunta como ANEXO + certificación redaccion = certificación anti-hallucination
**Aprobación**: Test PASS si ambas actas presentes y certificaciones iguales

### Test Case 15: Bloqueo si anti-hallucination Falla — v3.1 NOVEDAD
**Input**: anti-hallucination-v4.2 retorna 🟠 REQUIERE REVISIÓN
**Verificación**: Sistema valida que redaccion-informes NO emite documento
**Resultado esperado**: redaccion-informes BLOQUEADA hasta corregir anti-hallucination
**Aprobación**: Test PASS si documento NO se emite (BLOQUEADO)

### Test Case 16: Análisis Multi-Jurisdiccional Completo
**Input**: Documento analiza institución laboral colombiana vs UK/USA precedentes
**Verificación**: Contrastación explícita Colombia vs Common Law incluida
**Resultado esperado**: Punto (10) ACTA validado: análisis multi-jurisdiccional ✅
**Aprobación**: Test PASS si análisis comparativo presente

### Test Case 17: PREMIUM Nivel C-Suite 15/15 + anti-hallucination ✅
**Input**: Caso corporativo complejo integral end-to-end v3.1 PREMIUM
**Verificación**: Todos los 15 puntos ACTA + anti-hallucination ✅ APTO
**Resultado esperado**: ✅ PREMIUM → Documento listo sin revisión + ACTA v4.2 ✅ APTO adjunta
**Aprobación**: Test PASS si certificación final = ✅ PREMIUM + ambas actas ✅

**Criterio de Aprobación v3.1**: 15/17 tests deben pasar (88%+ mínimo)

---

## INTEGRACIÓN CON ECOSISTEMA v3.1

```
intake-cliente → diagnostico-cliente → analisis-caso → recomendaciones-cliente
                     ↓                      ↓
        [Usuario: "Redacta el informe" / "Documento formal para cliente"]
                     ↓
        Redacción-Informes-Jurídicos v3.1 (AUTOMÁTICO)
        Genera: Memorandum / Concepto / Dictamen / Análisis Riesgo / Defensa
                     ↓ (MANDATORIO)
        anti-hallucination-v4.2 (EJECUCIÓN AUTOMÁTICA)
        ├→ Verificación 100% citas (Legal Data Hunter)
        ├→ Matriz confianza: Alto/Medio/Bajo
        ├→ Validación multi-idioma (si aplica)
        └→ Genera ACTA v4.2 (15 puntos)
                     ↓
        SI [anti-hallucination ✅ APTO o ⚠️ CONDICIONAL]
        → Redacción emite DOCUMENTO FINAL + ACTA v4.2 como ANEXO
        → Certificación = [✅ PREMIUM o ⚠️ PROFESIONAL]
                     ↓
        SI [anti-hallucination 🟠 o peor]
        → Redacción BLOQUEADA (NO emite documento)
        → RETORNA a análisis primario
```

También se integra con:
- **recomendaciones-cliente**: Cuando plan de acción requiere documento formal para cliente
- **diagnostico-cliente**: Cuando hallazgos necesitan informe de riesgo legal formal
- **anti-hallucination-v4.2**: Handoff obligatorio después de generar documento

---

## CHANGELOG

### v3.1 (Julio 2026 — Presente)

**Mejoras PREMIUM implementadas**:
- ✅ 9º Guardia: Validación multi-idioma automática (v3.1)
- ✅ Matriz de confianza en citas (Alto/Medio/Bajo) integrada con anti-hallucination-v4.2
- ✅ Validación multi-idioma para documentos con citas en 2+ idiomas
- ✅ Integración obligatoria anti-hallucination-v4.2 post-generación
- ✅ Handoff automático: redaccion → anti-hallucination → ACTA adjunta
- ✅ Bloqueo automático si anti-hallucination retorna 🟠 o peor
- ✅ ACTA v3.1 con 15 puntos incluye validación anti-hallucination + matriz confianza + multi-idioma
- ✅ Test suite expandida: 17 test cases (vs 10 en v3.0)
- ✅ Criterio aprobación: 88%+ (15/17 tests pass)

### v3.0 (Julio 2026 — Base anterior)

**Nuevas características**:
- ✅ Certificación de nivel PREMIUM
- ✅ 8 Guardias exhaustivas contra contenido débil
- ✅ Estructura Harvard Legal Review completa
- ✅ 15 puntos de calidad jurídica verificables
- ✅ 5 formatos generables
- ✅ Magistratura legal
- ✅ Análisis multi-jurisdiccional
- ✅ Cuantificación de riesgos (financiero/reputacional/operacional)
- ✅ Defensa anticipada de contra-argumentos
- ✅ Anti-hallucination-v4 en 100% de citas (v3.0 baseline)
- ✅ Impacto C-Suite explícito
- ✅ Test suite con 10 casos
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
