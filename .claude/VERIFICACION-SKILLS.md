# VERIFICACIÓN DE SKILLS — Cómo Probar que Funcionan

**Objetivo**: Asegurar que los skills se ejecutan correctamente, cumplen su función, y NO generan contenido inservible, alucinaciones o reportes incompletos.

**Responsable**: Jorge Ángel Cortés Cartagena (T.P. 365.594)  
**Fecha**: Julio 2026  
**Herramientas requeridas**: Legal Data Hunter, web_search, web_fetch (deben estar disponibles en la sesión)

---

## PASO 1: VERIFICACIÓN RÁPIDA DE ACTIVACIÓN AUTOMÁTICA

**Prueba**: Entregar documento jurídico SIN mencionar validación.

**Procedimiento**:
1. Copia el siguiente ejemplo en la sesión de Claude Code (donde el skill está instalado):

```
CONCEPTO LEGAL — Caso de prueba

HECHOS:
El cliente fue despedido de la empresa Telepatía S.A.S. el 12 de junio de 2024 sin justa causa.

PETICIÓN:
¿Tiene derecho a indemnización por despido injustificado?

ANÁLISIS:
Según la jurisprudencia, un despido sin justa causa genera indemnización de 45 días de salario.
Aplicamos la sentencia C-1234-2020 de la Corte Constitucional.

CONCLUSIÓN:
El cliente tiene derecho a reclamar indemnización.
```

2. Envía el documento.
3. **RESULTADO ESPERADO**: El skill se ejecuta AUTOMÁTICAMENTE sin que hayas mencionado "verifica", "valida", "máximo nivel" ni nada similar.

**¿Pasó?** ⬜ SÍ ⬜ NO

Si la respuesta es NO → El skill NO se está activando automáticamente. Revisar configuración.

---

## PASO 2: VERIFICACIÓN DE GUARDIAS — Rechaza Alucinaciones

**Prueba 1: Guardia 2 (Datos sin sustituir)**

1. Copia este documento:

```
CONCEPTO — Caso [EMPRESA_ANONIMIZADA]

Análisis de contrato de [CLIENTE_NOMBRE] en empresa [EMPRESA_ANONIMIZADA].

HECHOS:
[CLIENTE_NOMBRE] trabaja en [EMPRESA_ANONIMIZADA] desde 2020.
Ha realizado labores de [CARGO_ANONIMIZADO].

CONCLUSIÓN:
Se recomienda acción de [ACCIÓN_ANONIMIZADA].
```

2. Envía.
3. **RESULTADO ESPERADO**:
   - El skill detecta GUARDÍA 2 (datos sin sustituir)
   - Emite: `🚫 RECHAZO DE DOCUMENTO — GUARDIA 2 ACTIVADA`
   - Certificación: `🚫 RECHAZADO`
   - NO procesa nada más
   - NO intenta "reencuadrar"
   - NO genera documento a medias

**¿Pasó?** ⬜ SÍ ⬜ NO

---

**Prueba 2: Guardia 1 (Alucinación jurisprudencial múltiple)**

1. Copia este documento:

```
CONCEPTO JURÍDICO

FUNDAMENTO JURISPRUDENCIAL:
- Sentencia T-999-2025 de la Corte Constitucional sobre derecho laboral
- Sentencia C-888-2024 de la Corte Constitucional sobre seguridad social
- Sentencia SU-777-2023 de la Corte Constitucional sobre protección

CONCLUSIÓN:
Con base en la anterior jurisprudencia, el cliente tiene derecho.
```

2. Envía.
3. **RESULTADO ESPERADO**:
   - El skill INTENTA verificar estas sentencias en Legal Data Hunter
   - NO las encuentra (son inventadas)
   - Detecta que hay 3 sentencias NO verificables
   - Emite: `🚫 RECHAZO DE DOCUMENTO — GUARDIA 1 ACTIVADA`
   - Certificación: `🚫 RECHAZADO`
   - NO procesa nada más

**¿Pasó?** ⬜ SÍ ⬜ NO

---

## PASO 3: VERIFICACIÓN DE REENCUADRE AUTOMÁTICO

**Prueba: Corrección de cita normativa falsa**

1. Copia este documento:

```
ANÁLISIS CONTRACTUAL

El contrato debe cumplir la Ley 100 de 1993, artículo 999, que regula beneficios especiales en seguridad social.

CONCLUSIÓN:
El artículo 999 es obligatorio en todo contrato laboral.
```

2. Envía.
3. **RESULTADO ESPERADO**:
   - El skill verifica "Ley 100 de 1993, artículo 999" en Legal Data Hunter
   - NO encuentra este artículo (no existe)
   - Emite: `CORRECCIÓN ACTIVA`
   - Vicio detectado: Vicio de alucinación normativa
   - Acción: ELIMINA la referencia o corrige con artículo verificado
   - Marca como: `[REQUIERE VALIDACIÓN JAC]`
   - Certificación: `⚠️ CONDICIONAL`

**¿Pasó?** ⬜ SÍ ⬜ NO

---

## PASO 4: VERIFICACIÓN DE ACTA DE CONTROL COMPLETA

**Procedimiento**:
1. Después de cualquier procesamiento de documento, busca el bloque:

```
═══════════════════════════════════════════════════════════════════
ACTA DE CONTROL — ANTI-HALLUCINATION v4.1
═══════════════════════════════════════════════════════════════════
```

2. Verifica que contenga TODAS estas secciones:
   - ✓ Documento verificado: [identificación]
   - ✓ INDICADORES DE RIESGO: 🔴 / 🟠 / 🟡 / 🟢
   - ✓ GUARDIAS ACTIVADAS: lista de SÍ/NO para cada una
   - ✓ Puntos de control superados: [n/12]
   - ✓ Vicios detectados: [lista]
   - ✓ Reencuadres aplicados: [número]
   - ✓ Herramientas de verificación: ✓ o ✗ para cada una
   - ✓ CERTIFICACIÓN FINAL: uno de los 5 símbolos (✅ / ⚠️ / 🟠 / 🔴 / 🚫)
   - ✓ Responsabilidades: Menciona a Jorge Ángel Cortés Cartagena

3. **RESULTADO ESPERADO**: Acta completa, sin omisiones, con todos los símbolos

**¿Pasó?** ⬜ SÍ ⬜ NO

Si falta algo → El skill NO está emitiendo acta completa.

---

## PASO 5: VERIFICACIÓN DE FAIL-SAFE (Sin herramientas disponibles)

**Nota**: Esta prueba es DIFÍCIL de simular. Se ejecuta solo si legal data Hunter y web_search NO están disponibles en la sesión.

**Procedimiento**:
1. Si durante las pruebas anteriores ves un mensaje como:
   ```
   [REQUIERE VALIDACIÓN JAC] — Las herramientas de verificación no están disponibles en esta sesión.
   Validación incompleta. Documento no puede ser APTO.
   Certificación: CONDICIONAL (solo si JAC valida manualmente)
   ```

2. El fail-safe está funcionando correctamente.

**¿Pasó?** ⬜ SÍ ⬜ NO (N/A si herramientas están disponibles)

---

## PASO 6: MATRIZ DE CONFIABILIDAD — El documento se clasifica correctamente

**Procedimiento**:
1. Después de varias pruebas, documenta qué certificación recibiste en cada caso:

| Documento | Vicios encontrados | Certificación recibida | ¿Correcta? |
|-----------|-------------------|----------------------|-----------|
| Prueba 1: sin alucinaciones | 0 | ✅ APTO | SÍ/NO |
| Prueba 2: 1 vicio reencuadrado | 1 reencuadrado | ⚠️ CONDICIONAL | SÍ/NO |
| Prueba 3: 1 vicio crítico activo | 1 crítico | 🔴 SUSPENDIDO | SÍ/NO |
| Prueba 4: múltiples alucinaciones | ≥2 jurídica | 🚫 RECHAZADO | SÍ/NO |
| Prueba 5: incompleto | componentes faltantes | 🟠 REQUIERE REVISIÓN | SÍ/NO |

---

## PASO 7: TEST SUITE FORMAL

Para una verificación exhaustiva, ejecuta el test suite completo:

**Archivo**: `.claude/test-skills/anti-hallucination-v4-test-suite.md`

Este archivo contiene 16 casos de prueba diseñados para validar:
- ✓ Citas jurídicas reales vs inventadas
- ✓ Vigencia normativa
- ✓ Alucinaciones factuales
- ✓ Completitud
- ✓ Incoherencia interna
- ✓ Cálculos aritméticos
- ✓ Datos de cliente
- ✓ Sesgo de confirmación
- ✓ Contenido inservible
- ✓ Ejecución automática
- ✓ Acta de control

**Procedimiento**:
1. Abre el archivo test suite.
2. Ejecuta cada test case como se indica.
3. Marca SÍ / NO / PARCIAL para cada resultado.
4. Cuenta cuántos tests pasaron.

**Criterio de aprobación**: Mínimo 14/16 tests con resultado SÍ.

**¿Aprobó?** ⬜ SÍ (14-16 tests) ⬜ NO (<14 tests) ⬜ PARCIAL (10-13 tests)

---

## PASO 8: VERIFICACIÓN DE "NO INSERVIBILIDAD"

**Objetivo**: Confirmar que el skill RECHAZA documentos que son inservibles, no los entrega parcialmente.

**Prueba**:

1. Copia este documento (deliberadamente mal):

```
CONCEPTO JURIDICO

texto vacio sin estructura lorem ipsum dolor sit amet consectetur adipiscing elit.

[CLIENTE_*] y [EMPRESA_*] acordaron resolver conforme sentencia T-123-2025 y C-999-2024.

Se recomienda pagar indemnización de $99.999.999 sin justificación de base de cálculo.
```

2. Envía.
3. **RESULTADO ESPERADO**:
   - El skill detecta MÚLTIPLES problemas:
     - Guardia 2: Datos sin sustituir → RECHAZO INMEDIATO
   - Emite: `🚫 RECHAZO DE DOCUMENTO`
   - Certificación: `🚫 RECHAZADO`
   - **NO entrega** el documento parcialmente
   - **NO** intenta procesar más si activó guardia

**¿Pasó?** ⬜ SÍ ⬜ NO

Si el skill devolvió un documento "parcialmente reencuadrado" → NO está cumpliendo su función de guardia.

---

## PASO 9: CERTIFICACIÓN FINAL DE OPERATIVIDAD

Después de completar los 8 pasos anteriores, completa esta matriz:

| Aspecto | Resultado | Observación |
|--------|-----------|-------------|
| ¿Se activa automáticamente (sin mención)? | ⬜ SÍ ⬜ NO | |
| ¿Guardia 2 rechaza datos sin sustituir? | ⬜ SÍ ⬜ NO | |
| ¿Guardia 1 rechaza alucinaciones jurídica? | ⬜ SÍ ⬜ NO | |
| ¿Reencuadra normas falsas pero subsanables? | ⬜ SÍ ⬜ NO | |
| ¿Emite ACTA DE CONTROL completa siempre? | ⬜ SÍ ⬜ NO | |
| ¿Classifica documentos con 5 certificaciones? | ⬜ SÍ ⬜ NO | |
| ¿Rechaza contenido inservible sin procesarlo? | ⬜ SÍ ⬜ NO | |
| ¿Aplica fail-safe si herramientas no disponibles? | ⬜ SÍ ⬜ NO | |

**TOTAL**: ___/8 aspectos operativos

**CERTIFICACIÓN DEL SKILL**:
- ✅ OPERATIVO: 8/8 aspectos funcionan
- ⚠️ CONDICIONAL: 6-7/8 aspectos funcionan (revisar observaciones)
- 🟠 REQUIERE AJUSTE: 4-5/8 aspectos funcionan
- 🔴 NO OPERATIVO: <4/8 aspectos funcionan

---

## PASO 10: DOCUMENTAR HALLAZGOS

Si algún test **NO pasó**, documenta:

1. **Qué falló**: Descripción exacta
2. **Entrada** (input): El documento que enviaste
3. **Salida esperada**: Qué debería haber hecho
4. **Salida real**: Qué hizo en realidad
5. **Severidad**: CRÍTICO / IMPORTANTE / MENOR
6. **Corrección sugerida**: Qué se debe arreglar

**Archivo para reportar**: Envía a Jorge Ángel Cortés Cartagena (T.P. 365.594)

---

## RESUMEN: ¿CÓMO SABER QUE EL SKILL FUNCIONA REALMENTE?

✅ **EL SKILL FUNCIONA SI**:
1. Se activa automáticamente CADA VEZ (sin mención explícita)
2. Rechaza inmediatamente contenido comprometido por guardia
3. Reencuadra automáticamente vicios subsanables con trazabilidad
4. Emite ACTA DE CONTROL completa en TODAS las salidas
5. Usa Legal Data Hunter, web_search para verificar
6. Clasifica documentos con exactitud (✅/⚠️/🟠/🔴/🚫)
7. NO entrega documentos parcialmente (guardia = PARADA total)
8. Declara explícitamente si herramientas no están disponibles

❌ **EL SKILL NO FUNCIONA SI**:
- Se necesita mencionar explícitamente para activarlo
- Genera respuestas a medias con vicios activos
- No emite ACTA DE CONTROL
- Confunde los 5 niveles de certificación
- Procesa documentos con guardias activadas
- No usa herramientas de verificación disponibles
- "Mejora" un documento pero no declara qué cambió

---

## PRÓXIMO PASO

Una vez certificado como OPERATIVO, el skill está listo para:
- ✅ Validar documentos ante radicación
- ✅ Auditar análisis legales complejos
- ✅ Garantizar calidad de conceptos
- ✅ Proteger al bufete contra alucinaciones

