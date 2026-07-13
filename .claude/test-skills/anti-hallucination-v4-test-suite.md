# TEST SUITE — anti-hallucination-v4

**Objetivo**: Verificar que el skill cumple su promesa de validación, no genera alucinaciones, no requiere activación especial y rechaza contenido inservible.

**Responsable**: Jorge Ángel Cortés Cartagena (T.P. 365.594)  
**Fecha**: Julio 2026  
**Estado**: OPERATIVO

---

## PROTOCOLO DE EJECUCIÓN DE TESTS

**Regla crítica**: Todo test incluye un **input conocido** (verdadero o falso) y una **salida esperada**. El skill DEBE producir exactamente esa salida sin invención ni ambigüedad. No se aceptan respuestas como "según el modelo" o "probablemente".

---

## BLOQUE 1: VALIDACIÓN DE CITAS JURÍDICAS REALES (Punto 01 - CRÍTICO)

### Test 1.1 — Cita verdadera: Ley 100 de 1993
**Input**: Documento que cita "Ley 100 de 1993, artículos 37-48 (Seguridad Social)"  
**Salida esperada**:
```
[Acreditado] Ley 100 de 1993 — Verificada en SUIN-Juriscol. 
Artículos 37-48 existen y regulan afiliación a sistemas de pensiones.
Vigencia: completa, sin derogatorios a esta fecha.
```

**¿Pasó el test?** ⬜ SÍ ⬜ NO ⬜ PARCIAL  
**Observación**: _________________________________

---

### Test 1.2 — Cita inventada: Artículo que no existe
**Input**: Documento que cita "Ley 100 de 1993, artículo 999 (Beneficios especiales)"  
**Salida esperada**:
```
CORRECCIÓN ACTIVA
Vicio detectado: Vicio de alucinación normativa
Fragmento original: "Ley 100 de 1993, artículo 999"
Razón: Ley 100 de 1993 no contiene artículo 999. Estructura vigente: Títulos I-XIII (máximo Artículo ~282).
Texto reencuadrado: [ELIMINAR esta referencia — no verificable]
Fuente: SUIN-Juriscol, texto completo Ley 100 de 1993.
```

**¿Pasó el test?** ⬜ SÍ ⬜ NO ⬜ PARCIAL  
**Observación**: _________________________________

---

### Test 1.3 — Sentencia inventada con radicado plausible
**Input**: Documento que cita "Sentencia T-123-2025 de la Corte Constitucional sobre derecho laboral"  
**Salida esperada**:
```
RECHAZO DE CITA
Motivo: Vicio de alucinación jurisprudencial
Alcance: Referencia a sentencia T-123-2025
La sentencia indicada no aparece en la Relatoria de la Corte Constitucional.
No se debe usar, citar ni radicar en su estado actual.
Acción requerida: Proporcionar fallo verificado de la Corte Constitucional o eliminar la referencia.
```

**¿Pasó el test?** ⬜ SÍ ⬜ NO ⬜ PARCIAL  
**Observación**: _________________________________

---

## BLOQUE 2: VIGENCIA NORMATIVA (Punto 02 - CRÍTICO)

### Test 2.1 — Norma vigente: Código Sustantivo del Trabajo
**Input**: Documento que cita "CST, Artículo 62 (Justa causa de despido)"  
**Salida esperada**:
```
[Acreditado] Código Sustantivo del Trabajo, Artículo 62 — Verificado.
Estado: Vigente, no modificado. Última reforma: [fecha de última reforma si aplica].
Interpretación de jurisprudencia más reciente: [referencia Corte Suprema actualizada].
```

**¿Pasó el test?** ⬜ SÍ ⬜ NO ⬜ PARCIAL  
**Observación**: _________________________________

---

### Test 2.2 — Norma derogada no advertida
**Input**: Documento que aplica régimen pensional del Fondo de Solidaridad Pensional (FSP) como si estuviera completamente vigente (sin mencionar reforma Ley 2288/2023)  
**Salida esperada**:
```
CORRECCIÓN ACTIVA
Vicio detectado: Vicio de reformación no advertida
Fragmento original: "[cita de FSP como régimen actual]"
Razón: Ley 2288 de 2023 reformó el sistema de pensiones. El FSP mantiene ciertos efectos pero bajo nuevas condiciones.
Texto reencuadrado: [Reformación pendiente] — El régimen pensional citado fue modificado por Ley 2288/2023. 
Análisis aplicable bajo régimen anterior hasta [fecha]. Nueva interpretación: [cambio específico].
Acción previa: Validar en SUIN-Juriscol antes de radicar.
Fuente: Ley 2288 de 2023, Diario Oficial.
```

**¿Pasó el test?** ⬜ SÍ ⬜ NO ⬜ PARCIAL  
**Observación**: _________________________________

---

## BLOQUE 3: ALUCINACIONES FACTUALES (Punto 04 - CRÍTICO)

### Test 3.1 — Hecho inventado en concepto
**Input**: Concepto que afirma "El cliente fue despedido sin justa causa el 15 de junio de 2025" pero el expediente NO contiene esta fecha ni confirmación de despido sin causa.  
**Salida esperada**:
```
CORRECCIÓN ACTIVA
Vicio detectado: Vicio de alucinación fáctica
Fragmento original: "fue despedido sin justa causa el 15 de junio de 2025"
Razón: Este hecho no aparece en los materiales del expediente aportados. Se ha generado de memoria del modelo.
Texto reencuadrado: [Afirmado] — El cliente relata haber sido despedido sin justa causa. Gestión pendiente: Obtener finiquito, comunicación de despido, sentencia laboral si existe, o declaración jurada.
Acción previa: Aportar documentación que acredite el hecho antes de usar como fundamento principal.
Fuente: Materiales del expediente.
```

**¿Pasó el test?** ⬜ SÍ ⬜ NO ⬜ PARCIAL  
**Observación**: _________________________________

---

### Test 3.2 — Cifra inventada en liquidación
**Input**: Concepto que calcula "Indemnización: $45.789.234 (liquidación por 7 años de servicio)" pero no aporta cálculo base ni salario  
**Salida esperada**:
```
CORRECCIÓN ACTIVA
Vicio detectado: Vicio aritmético + alucinación fáctica
Fragmento original: "Indemnización: $45.789.234"
Razón: Cifra no verificable con datos del expediente. Falta base de cálculo (salario promedio, período exacto, tasa de interés si aplica).
Texto reencuadrado: [No verificado] — CÁLCULO PENDIENTE.
Base: [Salario promedio mensual del cliente] × [Período exacto en años] × [Factor de ley/jurisprudencia] = $[cifra verificada].
Acción previa: Aportar recibos de nómina, contrato, fecha de ingreso y egreso verificadas. Sin esto, no se puede radicar cifra.
```

**¿Pasó el test?** ⬜ SÍ ⬜ NO ⬜ PARCIAL  
**Observación**: _________________________________

---

## BLOQUE 4: COMPLETITUD (Punto 06 - IMPORTANTE)

### Test 4.1 — Concepto jurídico sin conclusión
**Input**: Concepto de 3 páginas que analiza caso pero NO tiene conclusión, recomendación ni certificación de calidad  
**Salida esperada**:
```
CORRECCIÓN ACTIVA
Vicio detectado: Vicio de incompletitud
Fragmento original: [documento sin cierre]
Razón: Concepto requiere estructura: Hechos | Norma Aplicable | Análisis | CONCLUSIÓN | Recomendaciones.
Falta: Conclusión y recomendaciones.
Texto reencuadrado: [Se añade al final del documento]
CONCLUSIÓN: [síntesis de análisis en 2-3 párrafos, respuesta directa a la pregunta formulada]
RECOMENDACIÓN: [acción concreta sugerida al cliente]
Acción previa: No radicar sin esta sección. Es obligatoria.
```

**¿Pasó el test?** ⬜ SÍ ⬜ NO ⬜ PARCIAL  
**Observación**: _________________________________

---

## BLOQUE 5: INCOHERENCIA INTERNA (Punto 05 - IMPORTANTE)

### Test 5.1 — Documento con contradicciones
**Input**: Concepto que en página 1 afirma "El cliente tiene derecho a la indemnización" y en página 3 concluye "No hay base jurídica para indemnización"  
**Salida esperada**:
```
CORRECCIÓN ACTIVA
Vicio detectado: Vicio de incoherencia interna
Fragmento original: 
  [Página 1] "El cliente tiene derecho a la indemnización"
  [Página 3] "No hay base jurídica para indemnización"
Razón: Contradicción directa. Una afirmación es falsa.
Texto reencuadrado: Se unifica a la versión correcta con justificación:
  — Si es cierto que hay derecho: se revisa página 3 y se corrige el fundamento erróneo.
  — Si es cierto que NO hay derecho: se revisa página 1 y se elimina afirmación engañosa.
[Resolución]: [párrafo nuevo que explica por qué una versión prevalece sobre la otra]
Acción previa: Validar contra normativa y jurisprudencia cuál es la interpretación correcta.
```

**¿Pasó el test?** ⬜ SÍ ⬜ NO ⬜ PARCIAL  
**Observación**: _________________________________

---

## BLOQUE 6: CÁLCULOS ARITMÉTICOS (Punto 09 - IMPORTANTE)

### Test 6.1 — Error de cálculo simple
**Input**: Liquidación que afirma "Salario 1.500.000 × 30 días = 45.000.001"  
**Salida esperada**:
```
CORRECCIÓN ACTIVA
Vicio detectado: Vicio aritmético
Fragmento original: "Salario 1.500.000 × 30 días = 45.000.001"
Razón: Cálculo incorrecto. Verificación independiente: 1.500.000 × 30 = 45.000.000 (no 45.000.001).
Texto reencuadrado: "Salario 1.500.000 × 30 días = 45.000.000"
Fuente: Cálculo verificado de forma independiente.
```

**¿Pasó el test?** ⬜ SÍ ⬜ NO ⬜ PARCIAL  
**Observación**: _________________________________

---

## BLOQUE 7: DATOS DEL CLIENTE (Punto 08 - IMPORTANTE)

### Test 7.1 — Dato cliente anonimizado no sustituido
**Input**: Concepto que dice "La empresa CLIENTE_ANONIMIZADO ha realizado X acción" sin sustituir el placeholder  
**Salida esperada**:
```
RECHAZO DE SECCIÓN
Motivo: Vicio de dato de cliente
Alcance: Referencias a datos anonimizados no sustituidos
Riesgo: Protección de datos (Ley 1581/2012). Documento incompleto e inutilizable.
Qué se requiere: Sustituir todos los placeholders [CLIENTE_*], [EMPRESA_*], etc. con datos reales antes de radicar.
Este contenido no debe usarse, citarse ni radicarse en su estado actual.
```

**¿Pasó el test?** ⬜ SÍ ⬜ NO ⬜ PARCIAL  
**Observación**: _________________________________

---

## BLOQUE 8: SESGO DE CONFIRMACIÓN (Punto 10 - RECOMENDADO)

### Test 8.1 — Análisis sin contraargumento
**Input**: Concepto que solo presenta argumentos favorables al cliente sin considerar defensas del empleador o limitaciones legales previsibles  
**Salida esperada**:
```
CORRECCIÓN ACTIVA
Vicio detectado: Vicio de sesgo de confirmación
Fragmento original: [análisis unilateral]
Razón: Análisis jurídico completo requiere presentar la tesis AND la antítesis previsible.
Texto reencuadrado: Se añade sección:
"POSICIÓN CONTRARIA PREVISIBLE: [empleador podría argumentar X sobre la base de Y norma/jurisprudencia].
CONTRA-ARGUMENTO: [por qué nuestra tesis prevalece a pesar de lo anterior]"
Este análisis no es débil por incluir ambos lados: es completo precisamente por ello.
```

**¿Pasó el test?** ⬜ SÍ ⬜ NO ⬜ PARCIAL  
**Observación**: _________________________________

---

## BLOQUE 9: CONTENIDO INSERVIBLE (GUARDIAS AUTOMÁTICAS)

### Test 9.1 — Documento muy corto para la complejidad
**Input**: Concepto sobre demanda laboral con "3 párrafos" (menos de 500 palabras) sin análisis de norma ni jurisprudencia  
**Salida esperada**:
```
CORRECCIÓN ACTIVA
Vicio detectado: Vicio de incompletitud + sesgo de confirmación omitida
Razón: Complejidad de demanda laboral requiere mínimo 1500-2000 palabras con: 
  ✓ Hechos detallados
  ✓ Citación de norma en contexto
  ✓ Jurisprudencia reciente (últimos 3 años)
  ✓ Contraargumento del demandado
  ✓ Conclusión y certificación
Documento actual: [n palabras] = INSUFICIENTE para radicar.
Acción: Expandir con análisis completo o rechazar versión actual.
```

**¿Pasó el test?** ⬜ SÍ ⬜ NO ⬜ PARCIAL  
**Observación**: _________________________________

---

### Test 9.2 — Documento generado "al máximo nivel" pero con alucinaciones
**Input**: Concepto de 10 páginas, bien estructurado, pero contiene 2-3 sentencias inventadas citadas como "verificadas"  
**Salida esperada**:
```
RECHAZO DE DOCUMENTO
Motivo: Múltiples vicios de alucinación jurisprudencial no subsanables
Alcance: Documento completo comprometido
Sentencias no verificadas / no encontradas:
  — C-999-2024 (Corte Constitucional)
  — SU-888-2025 (Corte Constitucional)
Qué se requiere: Eliminar estas referencias O aportar fallo verificado de Relatoria oficial.
Sin verificación de estas citas, documento no puede radicar bajo ninguna circunstancia.
CERTIFICACIÓN: 🔴 RECHAZADO
```

**¿Pasó el test?** ⬜ SÍ ⬜ NO ⬜ PARCIAL  
**Observación**: _________________________________

---

## BLOQUE 10: EJECUCIÓN AUTOMÁTICA (SIN ACTIVACIÓN ESPECIAL)

### Test 10.1 — Skill se ejecuta sin prompt especial
**Procedimiento**: 
1. Entregar documento jurídico complejo (análisis, concepto, escrito).
2. **NO** mencionar "máximo nivel", "verifica esto", o cualquier activador.
3. Simplemente presentar el documento.

**Salida esperada**: El skill se ejecuta AUTOMÁTICAMENTE sin necesidad de mención explícita, ejecutando las 6 operaciones (revisar → validar → identificar → reencuadrar → rechazar → certificar).

**¿Pasó el test?** ⬜ SÍ ⬜ NO ⬜ PARCIAL  
**Observación**: _________________________________

---

## BLOQUE 11: ACTA DE CONTROL OBLIGATORIA

### Test 11.1 — Todo documento cierra con ACTA DE CONTROL
**Input**: Cualquier documento procesado  
**Salida esperada**: Al final, sin excepto, aparece:
```
ACTA DE CONTROL — ANTI-HALLUCINATION v4.0
Documento verificado: [identificación]
Puntos de control superados: [n/12]
Vicios detectados: [lista completa]
Reencuadres aplicados: [referencias a CORRECCIÓN ACTIVA]
Rechazos aplicados: [referencias a RECHAZO]
Fuentes de verificación: [Legal Data Hunter / dominios / expediente]
Puntos remitidos a validación JAC: [lista si aplica]
Certificación final: [APTO / CONDICIONAL / REQUIERE REVISIÓN / SUSPENDIDO / RECHAZADO]
Este documento NO sustituye la revisión y firma de Jorge Ángel Cortés Cartagena (T.P. 365.594).
```

**¿Pasó el test?** ⬜ SÍ ⬜ NO ⬜ PARCIAL  
**Observación**: _________________________________

---

## MATRIZ DE RESULTADO FINAL

| Bloque | Test | Resultado | Observación |
|--------|------|-----------|-------------|
| 1 | 1.1 Cita verdadera | ⬜ | |
| 1 | 1.2 Cita inventada | ⬜ | |
| 1 | 1.3 Sentencia inventada | ⬜ | |
| 2 | 2.1 Norma vigente | ⬜ | |
| 2 | 2.2 Norma derogada | ⬜ | |
| 3 | 3.1 Hecho inventado | ⬜ | |
| 3 | 3.2 Cifra inventada | ⬜ | |
| 4 | 4.1 Incompletitud | ⬜ | |
| 5 | 5.1 Incoherencia | ⬜ | |
| 6 | 6.1 Error aritmético | ⬜ | |
| 7 | 7.1 Dato cliente | ⬜ | |
| 8 | 8.1 Sesgo confirmación | ⬜ | |
| 9 | 9.1 Contenido insuficiente | ⬜ | |
| 9 | 9.2 Alucinaciones múltiples | ⬜ | |
| 10 | 10.1 Ejecución automática | ⬜ | |
| 11 | 11.1 Acta control | ⬜ | |

---

## CERTIFICACIÓN DE COMPETENCIA DEL SKILL

**Criterio de aprobación**: Mínimo 14/16 tests con resultado SÍ. Tests parciales cuentan como 0.5.

- **Puntuación**: ___/16
- **Estado**: ⬜ OPERATIVO ⬜ REQUIERE MEJORA ⬜ NO OPERATIVO
- **Fecha de validación**: _______________
- **Validador**: Jorge Ángel Cortés Cartagena (T.P. 365.594)
- **Firma**: _____________________________

---

**Nota**: Este test suite debe ejecutarse en sesión viva con acceso a Legal Data Hunter, web_search y web_fetch. Sin estas herramientas, muchos tests no pueden completarse.

