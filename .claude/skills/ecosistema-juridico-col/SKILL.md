---
name: ecosistema-juridico-col
description: >
  SKILL MAESTRA de litigio estratégico colombiano. Activar ante CUALQUIER solicitud
  jurídica: demandas, contestaciones, interrogatorios, alegatos, recursos (reposición,
  apelación, casación, nulidad), tutelas, conceptos jurídicos, análisis de expedientes,
  revisión de contratos laborales, estrategia procesal y minería jurisprudencial.
  Actívala también ante términos como: demanda, contestar, interrogatorio, alegatos,
  recurso, tutela, expediente, jurisprudencia, Corte Constitucional, Corte Suprema,
  Consejo de Estado, derecho laboral, disciplinario, civil, administrativo, seguridad
  social, o cualquier actuación ante juzgados y tribunales colombianos. Usar SIEMPRE
  para cualquier tarea jurídica en Colombia, aunque no se pida escrito formal.
---

# Ecosistema Jurídico Colombiano
## Litigio Estratégico Asistido por IA — Protocolo MDI-J v5.0

**Jurisdicción exclusiva**: República de Colombia
**Estándar de producción**: Altas Cortes — lenguaje técnico, preciso, no detectable como IA

---

## ARQUITECTURA DE LA SKILL — 6 MÓDULOS PROCESALES

| Encargo | Módulo | Método |
|---|---|---|
| Demanda, libelo, subsanación | **MOD-1** | 3 etapas: matriz → encuadre → redacción |
| Contestación, excepciones, réplica | **MOD-2** | Matriz de negaciones + posición jurídica |
| Interrogatorio, contrainterrogatorio | **MOD-3** | Banco de preguntas por objetivo estratégico |
| Alegatos de conclusión | **MOD-4** | Síntesis probatoria + cierre jurídico |
| Recursos: reposición, apelación, casación, nulidad | **MOD-5** | Estructura de agravios JECA |
| Concepto jurídico, análisis, minería jurisprudencial | **MOD-6** | Marco HCAC |

---

## PROTOCOLO TRANSVERSAL OBLIGATORIO (TODOS LOS MÓDULOS)

### FASE 0 — Depuración fáctica (NUNCA omitir)

**0.1 Ingesta de materiales**
Lee íntegramente todos los documentos aportados. Extrae: hechos, partes, pretensiones,
fechas, pruebas, decisiones previas. Registra: vacíos, contradicciones, hechos sin soporte.

**0.2 Clasificación fáctica con etiquetas de certidumbre**

| Etiqueta | Cuándo usar |
|---|---|
| [Acreditado] | Soporte documental incontrovertible |
| [Afirmado] | Alegado por el cliente, sin prueba suficiente aún |
| [Controvertido] | Disputado entre las partes |
| [Inferencia] | Deducción razonable de hechos conocidos |
| [No verificado] | Sin soporte en los materiales aportados |
| [Reformación pendiente] | Norma o precedente que puede haber cambiado |

**0.3 Delimitación jurídica**
- Jurisdicción competente y rama del derecho
- Problema jurídico central + secundarios
- Mecanismo procesal procedente
- Etapa procesal actual y términos vigentes

**0.4 Verificación normativa — OBLIGATORIA**
Antes de citar cualquier norma: verificar existencia, vigencia y texto aplicable.
Si hay duda: marcar [VERIFICAR EN SUIN-JURISCOL] y proceder con el análisis.

**0.5 Instrucción anti-alucinación — INCLUIR SIEMPRE EN EL ESCRITO**
Al final de cualquier análisis o concepto: "Si no se tiene certeza sobre algún dato
normativo o jurisprudencial, se indica explícitamente con [VERIFICAR]. No se citan
fallos sin fuente verificable."

---

## MOD-1 — DEMANDA / LIBELO DEMANDATORIO

### El proceso en 3 etapas (OBLIGATORIO — no saltarse ninguna)

**Etapa 1 — Matriz de hechos** (validar antes de continuar)

Construir tabla cronológica antes de redactar una sola línea:

| Fecha | Hecho | Relevancia jurídica | Prueba disponible | Etiqueta |
|-------|-------|---------------------|-------------------|----------|
| [fecha] | [hecho concreto] | [por qué importa jurídicamente] | [documento / testigo] | [Acreditado/Afirmado/etc.] |

El usuario revisa y valida la tabla antes de continuar.

**Regla:** ningún hecho inventado ingresa al escrito. La tabla es el filtro.

**Etapa 2 — Encuadre normativo** (validar antes de continuar)

Con la matriz validada, identificar:
- Normas aplicables a cada hecho (Código Civil, CGP, leyes especiales, CCT si es laboral)
- Jurisprudencia de soporte (solo la que se puede verificar — no fabricar)
- Cuestiones constitucionales o de tratados si aplican
- Competencia, cuantía, procedimiento

**Etapa 3 — Redacción del escrito**

Solo con matriz y encuadre validados. Estructura estándar conforme al art. 82 CGP:

```
I. PARTES [Demandante / Demandado con datos completos]
II. PRETENSIONES [Principales y subsidiarias — enumeradas]
III. HECHOS [Numerados — solo los de la matriz validada]
IV. FUNDAMENTOS DE DERECHO [Solo normas verificadas]
V. PRUEBAS [Documentales, testimoniales, periciales, indicios]
VI. CUANTÍA Y COMPETENCIA [Fundamento jurídico]
VII. JURAMENTO ESTIMATORIO [Si aplica — art. 206 CGP]
VIII. NOTIFICACIONES
IX. PETICIÓN [Clara, concreta, determinada]
```

---

## MOD-2 — CONTESTACIÓN / EXCEPCIONES

### Matriz de negaciones (herramienta central)

Antes de redactar la contestación, construir esta tabla a partir de la demanda:

| N° hecho | Afirmación del actor (transcripción fiel) | Tipo (hecho / derecho / valoración) | Nuestra posición | Observación |
|---|---|---|---|---|
| 1 | [texto exacto o paráfrasis fiel] | Hecho | [Admitir / Negar / Negar por desconocimiento] | [Prueba que desvirtúa / Razón de la negativa] |

**Reglas de negación (art. 96 CGP):**
- La omisión de negar un hecho puede interpretarse como admisión tácita
- "Negar por desconocimiento" requiere justificación razonable
- Los hechos de derecho se controvierten jurídicamente, no se niegan fácticamente

**Estructura del escrito:**
```
I. HECHOS (respuesta hecho por hecho, usando la matriz)
II. EXCEPCIONES DE MÉRITO (con fundamento normativo verificado)
III. EXCEPCIONES PREVIAS (si aplican — art. 100 CGP)
IV. PRONUNCIAMIENTO SOBRE PRUEBAS DEL DEMANDANTE
V. PRUEBAS DE LA DEFENSA
VI. PETICIÓN
```

---

## MOD-5 — RECURSOS / APELACIÓN / CASACIÓN

### Estructura de agravios JECA (para cada argumento impugnable)

Por cada afirmación del juez que se cuestiona:

```
AGRAVIO N°[X]:
J — Lo que dijo el juez: [cita textual o paráfrasis exacta del fallo]
E — El error: [qué norma, principio procesal o lógica jurídica viola esa afirmación]
C — La consecuencia: [cómo ese error impactó en la parte resolutiva del fallo]
A — La actuación en alzada: [qué debe hacer el superior para corregirlo]
```

**Clasificación de agravios por fortaleza:**
- [AGRAVIO PRINCIPAL]: mayor probabilidad de prosperar — desarrollar con máximo detalle
- [AGRAVIO DE REFUERZO]: secundario, apoya los principales
- [AGRAVIO DE RESERVA]: incluir pero no desarrollar si debilita los principales

**Orden de presentación:** de mayor a menor gravedad.

**Para casación:** adicionar:
- Causal de casación invocada (art. 336 CGP)
- Infracción directa o indirecta de la norma
- Sentido de la decisión pedida al máximo tribunal

---

## MOD-6 — CONCEPTO JURÍDICO / ANÁLISIS

### Marco HCAC (estructura obligatoria)

```
H — HECHOS RELEVANTES
[Solo los determinantes — no los irrelevantes ni los secundarios]

C — CUESTIÓN CONSULTADA
[El problema jurídico que responde el concepto — una pregunta precisa]

A — ANÁLISIS NORMATIVO Y JURISPRUDENCIAL
[Normas aplicables + jurisprudencia verificable + doctrina si refuerza]
[IMPORTANTE: si no se puede verificar una cita, marcar [VERIFICAR]]

C — CONCLUSIÓN CON RECOMENDACIÓN CONCRETA
[No "depende de varios factores" — dar posición clara]
[Incluir: opción más segura + opción más eficiente + riesgo de no actuar]
```

---

## ESTÁNDAR DE REDACCIÓN — APLICABLE A TODOS LOS MÓDULOS

**Características del texto jurídico de Altas Cortes:**
- Frases directas, sin subordinadas excesivas
- Voz activa en la mayoría de los párrafos
- Términos técnicos usados con precisión — no como adorno
- Coherencia entre hechos, normas y pretensiones
- Sin repeticiones innecesarias entre secciones
- Sin jurisprudencia inventada — solo la que se puede verificar

**Marcadores de calidad:**
- ¿Cada hecho tiene su etiqueta de certidumbre?
- ¿Cada norma citada está verificada como vigente?
- ¿Las pretensiones son técnicamente posibles según la vía procesal elegida?
- ¿La conclusión responde exactamente la cuestión planteada?

---

## CIERRE ANTI-ALUCINACIÓN — OBLIGATORIO EN CADA ENTREGA

Incluir al final de cualquier escrito o análisis:

> "Las citas normativas de este documento fueron verificadas contra las fuentes
> disponibles. Las referencias marcadas con [VERIFICAR] requieren confirmación
> en SUIN-Juriscol, el Diario Oficial o las relatorías oficiales de las Altas Cortes
> antes de radicar o entregar al cliente."

---

## CADENA DE SKILLS RECOMENDADA

```
ecosistema-juridico-col (orquestación + redacción)
       ↓
jurisprudencia-col (si requiere fundamento jurisprudencial)
       ↓
subsuncion-juridica-col (conectar doctrina con hechos del caso)
       ↓
anti-hallucination-v2 (OBLIGATORIO antes de radicar)
       ↓
kit-entregables-col (formato Word / PDF para entrega)
```
