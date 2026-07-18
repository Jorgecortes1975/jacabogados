---
name: clasificacion-laboral-col
description: >
  Clasificación de trabajadores en Colombia: dependiente (contrato laboral),
  independiente (prestación de servicios), trabajador en misión (EST) o
  tercerización (contratista independiente). Aplica los elementos del contrato
  de trabajo y la presunción de subordinación (contrato realidad, primacía de
  la realidad), compara la estructura pretendida contra los hechos, marca
  brechas por semáforo y dimensiona el riesgo UGPP y las consecuencias de una
  mala clasificación. Activar ante: queremos contratar un contratista,
  prestación de servicios o nómina, contrato realidad, ¿es empleado o
  independiente?, tercerizar, outsourcing, empresa de servicios temporales,
  trabajador en misión, UGPP, fiscalización de aportes, PILA de independientes,
  riesgo de mala clasificación, ¿cómo vinculo a esta persona? SIEMPRE activar
  cuando se deba decidir o auditar la forma de vinculación de una persona
  natural que presta servicios a una empresa en Colombia.
argument-hint: "[describe la vinculación propuesta, o inicia y pregunto]"
---

# /clasificacion-laboral-col

Aplica el examen colombiano de clasificación (elementos del contrato de trabajo
+ presunción de subordinación) a una vinculación PROPUESTA y señala dónde los
hechos no coinciden con la figura que se pretende usar. Para relaciones ya en
ejecución, cambia a modo diagnóstico de contrato realidad (ver compuerta).

## Instrucciones

1. Cargar contexto del despacho (`CLAUDE.md` raíz): rol, límites, reglas de datos.
2. Ejecutar el flujo completo de abajo. Respuesta primero, sin narrar proceso,
   sin secciones vacías (regla señal/ruido).
3. Si el usuario ya dio detalles, extraer lo disponible y preguntar SOLO los
   vacíos. No re-preguntar lo ya informado.
4. Capas obligatorias del despacho:
   - Etiquetas de certidumbre y cierre estándar de `anti-hallucination-v3` en
     todo entregable.
   - Vigencia de normas y sentencias → verificación EN VIVO con
     `vigilancia-normativa-col`. Las bases legales citadas aquí son referencia
     de trabajo: **base a verificar con `vigilancia-normativa-col` antes del
     primer uso**. Prohibido inventar artículos o valores.
   - Cifras (SMLMV, IBC, porcentajes de aportes) SOLO de la tabla maestra de
     `liquidador-aportes-col` (CONFIRMADO). Si no está: "s/d".
   - Términos y plazos (prescripción, respuesta a UGPP) →
     `vencimientos-procesales-col`.

## Ejemplos

```
/clasificacion-laboral-col
Queremos vincular a una científica de datos por 6 meses, en nuestra oficina,
con nuestros equipos, integrada al equipo de analítica.
```

```
/clasificacion-laboral-col
¿Está bien nuestra reclutadora por prestación de servicios? Trabaja solo para
nosotros, maneja su horario, usa su portátil, cobra honorario por vacante.
```

---

## Propósito

La clasificación más costosa es la que nadie decidió conscientemente: se pide
"un contratista", el servicio arranca, y dos años después los hechos configuran
un contrato realidad — con prestaciones retroactivas, aportes con intereses y
fiscalización UGPP. Este skill corre el examen sobre la vinculación ANTES de
que empiece y avisa cuando lo descrito no encaja en la figura pretendida.

El skill enseña el patrón de razonamiento; no fija el derecho. Cada regla
concreta, umbral y excepción se verifica en fuente vigente antes de afirmarse.

## Compuerta previa — ¿propuesta o relación existente? (correr ANTES del intake)

Preguntar primero:

> ¿Este trabajo ya empezó? ¿La persona está prestando el servicio actualmente o
> lo prestó por algún periodo bajo este esquema?

**Si ya existe la relación**, esto deja de ser planeación y se convierte en
diagnóstico de riesgo de **contrato realidad** — ejercicio propio del despacho
(fase 02-DIAGNOSTICO), con estas reglas:

- Emitir aviso: el análisis retroactivo implica exposición ya causada
  (prestaciones sociales retroactivas, aportes omitidos con intereses,
  sanciones UGPP, indemnización moratoria — bases a verificar) que el análisis
  prospectivo NO cuantifica; la cuantificación va con `liquidador-aportes-col`
  y hallazgo CRÍTICO/MODERADO/BAJO en el diagnóstico del cliente.
- **Si hay demanda laboral en curso, requerimiento UGPP notificado o querella
  ante el Ministerio de Trabajo: DETENERSE.** Límite del despacho: los casos
  con litigio o fiscalización activa van a abogado especialista. Producir solo
  un brief de escalamiento (hechos, indicios, brechas, preguntas abiertas).
- Si no hay litigio activo, continuar el flujo completo marcando cada salida
  con el banner: `MODO DIAGNÓSTICO — RELACIÓN EXISTENTE: exposición
  retroactiva no cuantificada en este documento`.

Si la vinculación es genuinamente futura, continuar en modo prospectivo.

## Flujo

### Paso 1 — Levantamiento de información

Preguntar TODO en un solo bloque (no gotear preguntas), explicando brevemente
qué prueba cada grupo:

> Para aplicar el examen correcto necesito entender la vinculación propuesta.
> Responde lo que puedas — a mayor detalle, mejor análisis:
>
> **El trabajo**
> - ¿Qué hará la persona en el día a día?
> - ¿La labor es misional (núcleo del negocio) o accesoria? (desarrollador en
>   una software house = misional; soporte TI en un bufete = accesoria)
> - ¿Es un proyecto con fin definido y entregables, o labor continua indefinida?
> - ¿Qué tan especializado es el perfil? ¿Sabe algo que el equipo no sabe?
>
> **Subordinación (el factor decisivo en Colombia)**
> - ¿Quién fija horario y jornada — la persona o la empresa?
> - ¿Dónde trabajará — sede de la empresa, su propio sitio, o indistinto?
> - ¿La empresa dirigirá el CÓMO (métodos, proceso, orden) o solo el resultado?
> - ¿Recibirá órdenes de un jefe? ¿Estará en el organigrama? ¿Supervisará
>   empleados de la empresa?
> - ¿Debe pedir permisos, reportar asistencia o cumplir reglamento interno?
>
> **Economía**
> - ¿Cómo se paga — mensualidad fija, por hora, o precio por entregable?
> - ¿Herramientas y equipos: de la empresa o propios?
> - ¿Trabaja para otros clientes o será exclusividad de hecho?
> - ¿Asume riesgo propio (puede ganar más o perder) o solo cobra lo pactado?
> - ¿Tiene empresa propia (SAS, establecimiento) o factura como persona natural?
>   ¿Cotiza a seguridad social como independiente (PILA)?
>
> **La estructura pretendida**
> - ¿Cómo lo quieren montar: prestación de servicios directa, trabajador en
>   misión vía EST, o contrato con empresa contratista (tercerización/SOW)?
> - Si es EST: ¿causal invocada (labor ocasional, reemplazo, incremento de
>   producción) y duración prevista?
> - Si es tercerización: ¿el contratista tiene autonomía técnica y directiva y
>   asume la labor con sus propios medios y su propio personal?
> - ¿Habrá contrato escrito? ¿Duración estimada — semanas, meses, más de un año?
> - ¿Trabajará codo a codo con empleados de planta haciendo lo mismo?

Esperar respuestas. Registrar los vacíos que el cliente no pueda responder —
afectan el análisis y se listan en la salida.

### Paso 2 — Marco aplicable (verificar antes de aplicar)

Bases de trabajo (todas: **a verificar con `vigilancia-normativa-col`**):

| Figura | Base de referencia |
|---|---|
| Elementos del contrato de trabajo y presunción de subordinación | CST arts. 22-24; primacía de la realidad, art. 53 Constitución |
| Contratista independiente y solidaridad del beneficiario | CST art. 34; simple intermediario, art. 35 |
| Trabajador en misión: causales y límite temporal | Ley 50 de 1990 (régimen EST) |
| Prohibición de tercerizar lo misional permanente vulnerando derechos | Ley 1429 de 2010, art. 63; Decreto 1072 de 2015 (estado del Decreto 583/2016: verificar) |
| Fiscalización y sanciones por omisión/inexactitud/mora en aportes | Régimen UGPP (Ley 1607 de 2012 y reformas) |
| Indemnización moratoria y sanciones por no pago | CST art. 65 (verificar alcance jurisprudencial) |

Reglas de fuente (sin suplencia silenciosa):
- Si la verificación en vivo no confirma una regla, reportar qué se encontró y
  ofrecer opciones (ampliar búsqueda / marcar como no verificado y parar). El
  abogado decide si acepta fuente de menor confianza.
- Etiquetar cada cita con su origen: `[verificado en vivo]`, `[jurisprudencia a
  confirmar]`, `[conocimiento del modelo — verificar]`, `[aportado por el
  usuario]`. Nunca borrar las etiquetas.
- Jurisprudencia de respaldo (indicios de subordinación CSJ Sala Laboral, línea
  de contrato realidad) → mínimo con `jurisprudencia-col` si el entregable la cita.

### Paso 3 — Aplicar el examen a los hechos

Puntuar factor por factor — no resumir. El abogado necesita ver qué factores
están limpios y cuáles son problema. Estructura:

```
Examen: Elementos del contrato de trabajo + presunción de subordinación
Base: [cita verificada + fecha de verificación | "a verificar"]

| Factor / indicio | Hechos del intake | Señal |
|---|---|---|
| Prestación personal del servicio | ... | laboral / independiente / neutro |
| Subordinación: horario impuesto | ... | ... |
| Subordinación: órdenes sobre modo, tiempo y lugar | ... | ... |
| Subordinación: reglamento, permisos, supervisión jerárquica | ... | ... |
| Integración a la estructura (organigrama, equipo, correo corporativo) | ... | ... |
| Remuneración fija y periódica vs. precio por resultado | ... | ... |
| Herramientas y medios: de la empresa vs. propios | ... | ... |
| Exclusividad de hecho vs. pluralidad de clientes | ... | ... |
| Riesgo económico propio del contratista | ... | ... |
| Labor misional permanente vs. proyecto con fin definido | ... | ... |

Cómo pesa el examen: acreditada la prestación personal, la subordinación SE
PRESUME — la carga de desvirtuarla es del contratante. No es un balance de
factores al estilo estadounidense: pocos indicios fuertes de subordinación
bastan para el contrato realidad.

Resultado: [inclina a laboral / sostiene independencia / falla el requisito X
/ incierto — indicio disputado]
```

Si la estructura pretendida es EST o tercerización, correr además su examen
propio (causal y tope temporal EST; autonomía real, medios propios y no-
misionalidad permanente en tercerización — bases del Paso 2). Señalar
explícitamente los indicios disputados o fact-sensitive que requieren juicio
de abogado; no maquillarlos.

### Paso 4 — Clasificar, brechas y riesgo UGPP

**La llamada de clasificación** (una de):
- **Trabajador dependiente** (contrato laboral: indefinido / fijo / obra o labor)
- **Independiente genuino** (prestación de servicios)
- **Trabajador en misión vía EST** (verificar causal y tope; si la necesidad es
  permanente, la figura no aguanta)
- **Tercerización / contratista independiente** (empresa-a-empresa; la más
  limpia SI los hechos la sostienen; advertir solidaridad si la labor es del
  giro ordinario del beneficiario — a verificar)
- **Zona gris**: decir qué indicio la causa y por qué.

**Análisis de brechas** (la salida más importante):

```
Estructura pretendida: [lo que el cliente quiere]
Lo que los hechos sugieren: [lo que arroja el examen]

🔴 [Factor]: choca con [figura pretendida] por [regla + cita etiquetada].
   Riesgo significativo de contrato realidad si se ejecuta como está descrito.
🟡 [Factor]: punto débil; no descalifica solo, pero suma riesgo combinado.
✅ [Factor]: sostiene la figura pretendida. Sin problema.
```

**Riesgo UGPP y consecuencias de la mala clasificación** (siempre incluir;
bases a verificar; cifras solo de `liquidador-aportes-col`, si no: "s/d"):
- Prestaciones sociales retroactivas: cesantías e intereses, prima, vacaciones.
- Aportes a seguridad social omitidos + intereses moratorios; cálculo actuarial
  pensional en casos largos.
- Sanciones UGPP por omisión/inexactitud/mora; fiscalización con plazos duros de
  respuesta → `vencimientos-procesales-col`.
- Indemnización moratoria (CST art. 65) e indemnizaciones por despido si aplica.
- Multas del Ministerio de Trabajo por intermediación laboral ilegal.
- ARL: accidente sin afiliación = prestaciones a cargo del contratante.

**Escalamiento a especialista** si: labor misional permanente que se quiere
tercerizar; antecedente de fiscalización UGPP o demanda previa; el contratista
supervisará empleados; duración > 12 meses sin fin de proyecto claro; cualquier
indicio disputado que cambie el resultado; litigio activo (regla de compuerta).

### Paso 5 — Salida

```markdown
## Análisis de clasificación laboral — [empresa/caso]
**Vinculación propuesta:** | **Modo:** prospectivo / diagnóstico (banner) |
**Figuras examinadas:** | **Bases aplicadas:** [citas etiquetadas + estado de verificación]

### Conclusión operativa
[Puede avanzar / Corregir X antes / Detener — una frase con el porqué]

### Clasificación
**Figura más ajustada:** [dependiente / independiente / EST / tercerización / zona gris]
[Párrafo: resultado del examen en lenguaje claro, atado a las fuentes]

### Resultados del examen
[Tablas puntuadas del Paso 3, por figura examinada]

### Brechas
[🔴 / 🟡 / ✅ del Paso 4]

### Riesgo UGPP y consecuencias
[Lista aplicable al caso; cuantificación → liquidador-aportes-col o "s/d"]

### Escalamiento
[Ninguno | Escalar a especialista antes de avanzar — motivo]

### Próximos pasos
[Si independiente viable: contrato que refleje los términos que sostienen la
independencia → playbook-contratos-col. Si hay brechas: corregir lista antes de
usar la figura. Si EST/tercerización es más limpia: por qué. Si dependiente:
contrato laboral + afiliaciones EPS/AFP/ARL/CCF + aportes → liquidador-aportes-col.]
```

Cerrar con etiquetas de certidumbre y cierre estándar de `anti-hallucination-v3`
y el árbol de decisión de próximos pasos (redactar contrato / escalar / pedir
más hechos / esperar / otra cosa) — el abogado elige.

## Compuerta de acción consecuente

Antes de emitir un "avance como independiente / EST / tercerización" definitivo
para un cliente: recordar que la mala clasificación genera pasivos laborales,
aportes retroactivos y sanciones. Si el destinatario final es el cliente (no
abogado), el entregable sale marcado **BORRADOR — para revisión del abogado
responsable** y con el brief de puntos débiles; la recomendación definitiva la
firma el abogado del despacho.

## Lo que este skill NO hace

- Cuantificar exposición retroactiva (eso es `liquidador-aportes-col` dentro de
  un diagnóstico) ni sustituir el diagnóstico formal 02-DIAGNOSTICO.
- Litigar ni atender demanda o fiscalización en curso — va a especialista.
- Redactar el contrato resultante (→ `playbook-contratos-col`).
- Asesoría tributaria del contratista (retenciones, régimen) — eso es contador.
- Afirmar reglas no verificadas: toda base citada se confirma antes del primer uso.

## VINCULACIÓN

| Skill | Cuándo |
|---|---|
| `vigilancia-normativa-col` | Verificar EN VIVO cada base legal antes de afirmarla |
| `anti-hallucination-v3` | Etiquetas de certidumbre y cierre en todo entregable |
| `liquidador-aportes-col` | Cifras de aportes/IBC/SMLMV y cuantificación de exposición |
| `vencimientos-procesales-col` | Plazos de respuesta UGPP y prescripciones |
| `jurisprudencia-col` | Línea de contrato realidad e indicios (CSJ, Corte Constitucional) |
| `playbook-contratos-col` | Redactar el contrato de la figura elegida |
| `termination-review` / `ecosistema-juridico-col` | Terminaciones y actuaciones derivadas |
| `investigacion-juridica-corporativa-col` | Auditorías internas de plantas de contratistas |

---
Adaptado de anthropics/claude-for-legal (licencia del repositorio oficial) para
el sistema jurídico colombiano — JA Abogados / Bufete Cortés Cartagena, jul-2026.
