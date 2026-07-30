# EJEMPLOS DE USO — SKILL LEGAL-DATA-LEXIUS

---

## EJEMPLO 1: Consulta de Norma Laboral Vigente

### Contexto
Abogado de JAC está analizando caso de cliente con trabajadores informales.

### Consulta
```
Necesito verificar la normativa vigente sobre OBLIGACIÓN DE AFILIACIÓN
a seguridad social para trabajadores informales en Colombia.
```

### Ejecución del Skill
```
[Consultor Legal Lexius se activa automáticamente]

✓ Autenticación → Sesión abierta
✓ Búsqueda → "Afiliación obligatoria trabajadores informales"
✓ Fuente → appcolombia.lexius.io
✓ Resultados encontrados → Ley 100/1993, Decreto 1072/2015, Sentencias
```

### Resultado: REPORTE-LEXIUS-NORMA-2026-07-14.md

```markdown
# CONSULTA LEGAL LEXIUS — NORMA

**Asunto**: Obligación de afiliación a seguridad social para trabajadores informales

## Resumen Ejecutivo
La ley colombiana NO exime a trabajadores informales de la obligación de 
afiliarse a sistema de seguridad social en salud. La Ley 100/1993 es obligatoria 
para TODOS los trabajadores, independientemente de formalidad de relación laboral.

## Matriz de Confianza

| Elemento | Confianza | Verificación | Vigencia |
|----------|-----------|--------------|----------|
| Ley 100/1993, Art. 7 | **ALTA** | Diario Oficial | 2026-07-14 ✓ |
| Decreto 1072/2015, Cap. 2 | **ALTA** | Función Pública | 2026-07-14 ✓ |
| Ley 2288/2023 (reforma pensional) | **ALTA** | Congreso | 2026-07-14 ✓ |
| Sent. C-408/2025 (Corte Const.) | **ALTA** | CC, Radicado T-2025-001234 | 2025-03-15 ✓ |

## Extracto de Normativa

**Ley 100 de 1993 — Artículo 7**
> "La afiliación al Sistema General de Seguridad Social es obligatoria para 
> todos los trabajadores que celebren contrato de trabajo indefinido, a término 
> fijo, de duración inferior a un año, para la obra labor y los trabajadores 
> independientes, y no admite exclusión ni excepción alguna."

**Decreto 1072 de 2015 — Artículos 2.1.1.1 a 2.1.1.20**
Reglamenta obligación de afiliación inmediata (máximo 2 días después de ingreso)

**Ley 2288 de 2023 (Reforma Pensional)**
- No modifica obligatoriedad de afiliación
- Aumenta contribución empleador del 12% al 12.5% (gradual 2024-2025)
- Mantiene vigencia obligación para independientes

## Jurisprudencia Aplicable

### RECIENTE - Corte Constitucional Sentencia C-408/2025
**Tema**: Responsabilidad empleador por no afiliación
**Radicado**: T-2025-001234
**Fecha**: 15 de marzo de 2025
**Magistrado Ponente**: Jaime Bernal Pulido

**Síntesis**: Declara EXEQUIBLE artículo de Código Sustantivo del Trabajo 
que impone responsabilidad solidaria al empleador por no afiliación oportuna. 
Reitera que trabajadores informales tienen derecho a seguridad social INCLUSO 
cuando contratante no cumple obligación.

**Implicación para JAC**: Cliente puede reclamar afiliación retroactiva aunque 
empleador incumplió.

### Línea Jurisprudencial
- Sent. C-426/1992: Derecho a seguridad social es derecho fundamental
- Sent. T-597/1998: Trabajador informal tiene derecho a EPS
- Sent. C-408/2025: Última línea, MÁS FAVORABLE a trabajador

## Cambios Normativos (Últimos 6 Meses)

### Diciembre 2024: Resolución MINSALUD 1234/2024
- Nueva UPC (Unidad de Pago por Capitación): $314.020
- Afecta cálculo de contribuciones empleador
- Vigencia: Enero 2025

### Enero 2025: Circular Superintendencia Financiera
- Supervisión sobre AFP debe verificar afiliaciones retroactivas
- Empleadores inadimplentes pueden recibir sanciones hasta 50 UVT

### Marzo 2025: Sentencia C-408/2025 (ver arriba)

## Análisis Doctrinal (Lexius)

**Interpretación de Lexius sobre "trabajadores informales"**:
- Trabajador INFORMAL = independiente, freelancer, ocasional
- NO exime de AFILIACIÓN a seguridad social
- Empleador contratante RESPONSABLE de afiliación y aportes
- Trabajador puede exigir retroactivamente (hasta 3 años)

## Riesgos Identificados

⚠️ **RIESGO 1**: Algunos empleadores (incorrectamente) creen que trabajadores 
informales no requieren afiliación
- **Mitigación**: Documentar obligación en contrato, adjuntar copia de Ley 100

⚠️ **RIESGO 2**: Cálculo de aportes retroactivos es complejo
- **Mitigación**: Usar calculadora MINSALUD 2026, validar con contador

🟡 **RIESGO 3**: Prescripción: Acciones para reclamar afiliación prescriben a los 3 años
- **Mitigación**: Accionar inmediatamente si cliente descubre incumplimiento

## Próximos Pasos Recomendados

- [ ] Validar si cliente fue afiliado o no (solicitar constancias EPS)
- [ ] Calcular monto aportes no pagados (últimos 3 años máximo)
- [ ] Redactar derecho de petición a empleador
- [ ] Si empleador rechaza: Preparar demanda laboral por derechos fundamentales
- [ ] Integrar esta información en análisis-caso formal

## Referencias Verificables

- Ley 100/1993: https://appcolombia.lexius.io/ley-100-1993
- Decreto 1072/2015: https://appcolombia.lexius.io/decreto-1072-2015-cap-2
- Sent. C-408/2025: https://appcolombia.lexius.io/sent-c-408-2025
- Resolución MINSALUD 1234/2024: https://appcolombia.lexius.io/resol-minsalud-1234-2024

---

**Certificación**: ✅ INFORMACIÓN LEXIUS PREMIUM — VERIFICABLE 100%  
**Abogado Responsable**: Jorge Ángel Cortés Cartagena  
**Próxima Actualización Automática**: 13 de agosto de 2026
```

---

## EJEMPLO 2: Validación de Cita Jurisprudencial

### Contexto
Abogado está redactando informe para cliente sobre derechos laborales.

### Consulta
```
En mi análisis cité: "Corte Constitucional, Sentencia C-426/1992: 
Derecho a seguridad social es fundamental"

¿Es esta cita verificable? ¿Sigue siendo jurisprudencia vigente?
¿Hay sentencias MÁS RECIENTES que la complementen?
```

### Ejecución
```
[anti-hallucination-v4.2 se activa]

✓ Detecta cita jurisprudencial
✓ Activa LEGAL-DATA-LEXIUS automáticamente
✓ Búsqueda: "Corte Constitucional C-426/1992"
✓ Validación en Lexius
```

### Resultado

```markdown
# VALIDACIÓN ANTI-HALLUCINATION — CITA JURISPRUDENCIAL

## Cita Original
"Corte Constitucional, Sentencia C-426/1992: Derecho a seguridad social es derecho fundamental"

## Validación Lexius

### ✅ VERDE — CITA VERIFICABLE

| Aspecto | Resultado |
|---------|-----------|
| Tribunal | ✅ Corte Constitucional (correcto) |
| Radicado | ✅ C-426/1992 (verificado) |
| Tema | ✅ Derecho a seguridad social (correcto) |
| Vigencia | ✅ VIGENTE (no derogada) |
| Confianza | **ALTA** |

### Datos Completos de la Sentencia

**Radicado**: C-426/1992  
**Fecha**: 3 de junio de 1992  
**Magistrado Ponente**: Jaime Bernal Pulido  
**Tema**: Demanda de inconstitucionalidad contra artículos del Código Sustantivo del Trabajo

**Síntesis Oficial**:
> "El derecho a la seguridad social es un derecho fundamental derivado 
> directamente de los derechos a la vida y a la dignidad humana. El Estado 
> tiene obligación de garantizar el acceso a sistema de seguridad social 
> integral a todos los trabajadores colombianos."

### Jurisprudencia Posterior (Línea de Precedente)

Esta sentencia ha sido citada/ratificada por:
- C-408/2025: Reafirma criterio (MÁS RECIENTE)
- T-597/1998: Aplica a trabajadores informales
- C-955/2003: Amplía cobertura

### Recomendación

**PUEDE CITAR SEGURAMENTE**. Además, recomiendo:
1. Citar C-426/1992 como fundamento base
2. Actualizar con C-408/2025 como sentencia más reciente
3. Usar ambas para argumento reforzado

---

**Validación**: ✅ VERDE — Cita 100% verificable  
**Nivel Confianza**: ALTA  
**Recomendación**: Incluir en documento para cliente/juez  
**URL Verificación**: https://appcolombia.lexius.io/sent-c-426-1992
```

---

## EJEMPLO 3: Búsqueda de Formato Legal

### Contexto
Abogado de JAC necesita contrato de trabajo modelo para cliente con empleados.

### Consulta
```
Necesito un FORMATO/TEMPLATE de contrato de trabajo indefinido conforme 
normativa colombiana 2026, con cláusulas de seguridad social.
```

### Ejecución
```
[Skill se activa]
✓ Búsqueda: "Formato contrato de trabajo indefinido"
✓ Tipo: FORMATO
✓ Resultados: 3 templates disponibles en Lexius
```

### Resultado

```markdown
# CONSULTA LEGAL LEXIUS — FORMATO

**Asunto**: Formato Contrato de Trabajo Indefinido

## Formatos Disponibles

### 1. TEMPLATE BÁSICO (Recomendado)
**Fuente**: Appcolombia.lexius.io  
**Vigencia**: Actualizado 2026  
**Cumple**: Ley 100/1993, CST, Decreto 1072/2015, Ley 1581/2012  

**Estructura**:
- Encabezado (partes, domicilio)
- Objeto del contrato
- Ubicación, funciones, jornada
- Salario y beneficios
- Seguridad social (EPS, AFP, ARL, Caja)
- Terminación
- Causas de terminación sin justa causa
- Causas de terminación con justa causa
- Firma de partes

**Descargar**: [ENLACE LEXIUS]

### 2. TEMPLATE CON CLÁUSULAS ADICIONALES
Incluye: teletrabajo, confidencialidad, propiedad intelectual, no competencia

**Descargar**: [ENLACE LEXIUS]

### 3. TEMPLATE PARA CONTRATACIÓN TEMPORAL
Contrato a término fijo (1 mes a 2 años)

**Descargar**: [ENLACE LEXIUS]

## Validación Normativa

Todos los templates incluyen:
✅ Cláusulas seguridad social obligatorias  
✅ Protección datos personales (Ley 1581/2012)  
✅ Lenguaje conforme Código Sustantivo del Trabajo  
✅ Compatibilidad con afiliaciones ARL, EPS, AFP  

---

**Recomendación**: Usar Template #1 como base, personalizar con cliente  
**Próximo Paso**: Consultor JAC revisa antes de usar con cliente
```

---

## EJEMPLO 4: Alerta de Cambio Normativo Reciente

### Contexto
Skill se ejecuta automáticamente (no fue solicitado)

### Trigger
Sistema detecta que JAC ha citado "UPC 2025" múltiples veces = normativa relacionada

### Ejecución Automática
```
[Skill LEGAL-DATA-LEXIUS se activa automáticamente]

✓ Detecta: Normativa relacionada a UPC
✓ Búsqueda: "UPC 2026, Resolución MINSALUD"
✓ Resultado: CAMBIO NORMATIVO RECIENTE
✓ Notificación → Abogado responsable
```

### Notificación

```
📢 ALERTA DE CAMBIO NORMATIVO

**Norma**: Unidad de Pago por Capitación (UPC) — 2026
**Cambio**: Se incrementó de $314.020 (2025) a $318.560 (2026)
**Fecha Vigencia**: Enero 1, 2026
**Impacto**: Afecta cálculos de cotizaciones salud para empleadores

**Documentos JAC que deben revisarse**:
- 03-RECOMENDACIONES (Telepatía) — Presupuesto puede estar desactualizado
- Cualquier análisis que cite UPC 2025

**Próxima acción**: Revisar y actualizar documentos con nuevo valor

---

**Fuente**: Resolución MINSALUD 1234/2024  
**Confianza**: ALTA  
**Actualización Automática**: Mensual
```

---

## EJEMPLO 5: Integración Automática con análisis-caso

### Flujo Completo

```
Cliente llama: "Fui despedido sin justa causa hace 3 meses. 
               Nunca me afiliaron a seguridad social. ¿Qué hago?"

         ↓

INTAKE-CLIENTE v2.1
✓ Registra datos: Despido, falta afiliación SS, demanda potencial
✓ Urgencia: ALTA
✓ Pasa a → DIAGNOSTICO

         ↓

DIAGNOSTICO-CLIENTE v2.1
✓ Identifica problemas: Despido + incumplimiento SS
✓ Necesita: Normativa sobre despido injustificado + seguridad social
✓ Activa automáticamente → LEGAL-DATA-LEXIUS

         ↓

LEGAL-DATA-LEXIUS v1.0
✓ Búsqueda 1: "Despido sin justa causa — indemnización"
  → Extrae: CST Art. 61, Ley 789/2002, jurisprudencia reciente
✓ Búsqueda 2: "No afiliación seguridad social — retroactivo"
  → Extrae: Ley 100, C-408/2025, derechos trabajador
✓ Matriz Confianza: TODAS ALTA
✓ Devuelve → DIAGNOSTICO con información verificada

         ↓

DIAGNOSTICO-CLIENTE v2.1 (continúa)
✓ Incluye normativa de Lexius en análisis
✓ Identifica VIABILIDAD: MUY ALTA (jurisprudencia favorable)
✓ Clasifica riesgos: BAJO (prescripción dentro de plazo)
✓ Pasa a → ANALISIS-CASO

         ↓

ANALISIS-CASO v2.1
✓ Construye TEORÍA DEL CASO:
  - Hecho 1: Despido injustificado (CST Art. 61 — verificado Lexius)
  - Hecho 2: No afiliación SS (violación Ley 100 — verificado)
  - Derecho: Indemnización + cotizaciones retroactivas (C-408/2025)
  
✓ DEFENSA ANTICIPADA (≥3 contra-argumentos):
  - Empleador dirá: "Trabajador era independiente"
    → Refutación: No importa si había dependencia, obligación era igual
  
  - Empleador dirá: "Ya prescribió"
    → Refutación: Prescripción es 3 años, solo han pasado 3 meses
  
  - Empleador dirá: "No había dinero para afiliación"
    → Refutación: Obligación legal, cliente tiene derecho a reclamar al estado

✓ Recomendación: DEMANDAR

         ↓

REDACCION-INFORMES v3.1 (si cliente solicita)
✓ Redacta Memorando de Litigio
✓ Integra citas de Lexius con matriz de confianza ALTA
✓ Usa URLs verificables de appcolombia.lexius.io
✓ Cliente recibe: Informe profesional, 100% citado, listo para juez

         ↓

ANTI-HALLUCINATION v4.2 (automático)
✓ Valida cada cita: C-408/2025, CST Art. 61, Ley 100
✓ Todos pasan validación ✅ VERDE
✓ Informe está listo para presentar

         ↓

RESULTADO FINAL: Caso analizado, fundamentado legalmente, 
                 con información verificable de Lexius,
                 listo para demandar

```

---

## CHECKLIST: ¿CUÁNDO USAR ESTE SKILL?

✅ **USA ESTE SKILL CUANDO**:
- Necesitas ley o jurisprudencia VIGENTE
- Necesitas verificar si una norma sigue vigente
- Necesitas citar jurisprudencia con radicado exacto
- Necesitas cambios normativos recientes
- Necesitas formatos legales actualizados
- Necesitas validar citas antes de usar en documentos

❌ **NO USES CUANDO**:
- Ya tienes información de fuente directa (Diario Oficial)
- Tienes radicado exacto de jurisprudencia (usa directamente)
- Necesitas consulta tributaria (usa contador/CPA)
- Necesitas estrategia de litigio (usa ANALISIS-CASO)
- Necesitas redacción (usa REDACCION-INFORMES)

---

**Creado por**: Jorge Ángel Cortés Cartagena, T.P. 365.594  
**Versión**: 1.0 — Julio 2026  
**Estado**: ✅ EJEMPLOS LISTOS PARA REFERENCIA
