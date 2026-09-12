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
2. Correr el flujo completo. Respuesta primero, sin narrar proceso, sin
   secciones vacías (regla señal/ruido). Si el usuario ya dio detalles,
   preguntar SOLO los vacíos — no re-preguntar lo informado.
3. Capas obligatorias del despacho:
   - Etiquetas de certidumbre y cierre estándar de `anti-hallucination-v3` en
     todo entregable.
   - Vigencia de normas y sentencias → verificación EN VIVO con
     `vigilancia-normativa-col`. Las bases legales citadas aquí son referencia
     de trabajo: **base a verificar con `vigilancia-normativa-col` antes del
     primer uso**. Prohibido inventar artículos o valores.
   - Cifras (SMLMV, IBC, porcentajes de aportes) SOLO de la tabla maestra de
     `liquidador-aportes-col` (CONFIRMADO). Si no está: "s/d".
   - Términos y plazos (prescripción, respuesta UGPP) → `vencimientos-procesales-col`.

## Ejemplo

```
/clasificacion-laboral-col
¿Está bien nuestra reclutadora por prestación de servicios? Trabaja solo para
nosotros, maneja su horario, usa su portátil, cobra honorario por vacante.
```

## Propósito

La clasificación más costosa es la que nadie decidió conscientemente: se pide
"un contratista", el servicio arranca, y dos años después los hechos configuran
un contrato realidad — prestaciones retroactivas, aportes con intereses y
fiscalización UGPP. Este skill corre el examen ANTES de que la vinculación
empiece y avisa cuando lo descrito no encaja en la figura pretendida. Enseña el
patrón de razonamiento; no fija el derecho: cada regla concreta se verifica en
fuente vigente antes de afirmarse.

## Compuerta previa — ¿propuesta o relación existente? (correr ANTES del intake)

Preguntar primero: **¿este trabajo ya empezó o la persona ya prestó el servicio
bajo este esquema por algún periodo?**

**Si ya existe la relación**, esto deja de ser planeación y pasa a diagnóstico
de riesgo de **contrato realidad** (fase 02-DIAGNOSTICO del despacho):

- Avisar: el análisis retroactivo implica exposición ya causada (prestaciones
  retroactivas, aportes omitidos con intereses, sanciones UGPP, indemnización
  moratoria — bases a verificar) que este análisis NO cuantifica; la
  cuantificación va con `liquidador-aportes-col` y hallazgo
  CRÍTICO/MODERADO/BAJO en el diagnóstico del cliente.
- **Si hay demanda laboral en curso, requerimiento UGPP notificado o querella
  ante el Ministerio de Trabajo: DETENERSE.** Límite del despacho: litigio o
  fiscalización activa va a abogado especialista. Producir solo un brief de
  escalamiento (hechos, indicios, brechas, preguntas abiertas).
- Sin litigio activo: continuar el flujo marcando cada salida con el banner
  `MODO DIAGNÓSTICO — RELACIÓN EXISTENTE: exposición retroactiva no
  cuantificada en este documento`.

Si la vinculación es genuinamente futura, continuar en modo prospectivo.

## Flujo

### Paso 1 — Levantamiento de información

Preguntar TODO en un solo bloque (no gotear), explicando qué prueba cada grupo:

> Para aplicar el examen correcto necesito entender la vinculación. Responde lo
> que puedas — a mayor detalle, mejor análisis:
>
> **El trabajo**: ¿qué hará en el día a día? ¿La labor es misional (núcleo del
> negocio) o accesoria? ¿Proyecto con fin y entregables definidos, o labor
> continua indefinida? ¿Qué tan especializado es el perfil?
>
> **Subordinación (el factor decisivo en Colombia)**: ¿quién fija horario y
> jornada? ¿Dónde trabajará — sede de la empresa, sitio propio, indistinto?
> ¿La empresa dirige el CÓMO (métodos, proceso, orden) o solo el resultado?
> ¿Recibirá órdenes de un jefe, estará en el organigrama, supervisará empleados?
> ¿Debe pedir permisos, reportar asistencia o cumplir reglamento interno?
>
> **Economía**: ¿pago mensual fijo, por hora, o precio por entregable?
> ¿Herramientas de la empresa o propias? ¿Otros clientes o exclusividad de
> hecho? ¿Asume riesgo propio (puede ganar más o perder)? ¿Tiene empresa propia
> (SAS) o factura como persona natural? ¿Cotiza como independiente en PILA?
>
> **Estructura pretendida**: ¿prestación de servicios directa, trabajador en
> misión vía EST, o contrato con empresa contratista (tercerización/SOW)?
> Si EST: ¿causal invocada (labor ocasional, reemplazo, incremento de
> producción) y duración? Si tercerización: ¿el contratista tiene autonomía
> técnica y directiva, medios propios y su propio personal? ¿Habrá contrato
> escrito? ¿Duración — semanas, meses, más de un año? ¿Trabajará codo a codo
> con empleados de planta haciendo lo mismo?

Esperar respuestas. Registrar los vacíos — afectan el análisis y se listan en
la salida.

### Paso 2 — Marco aplicable (verificar antes de aplicar)

Bases de trabajo (todas: **a verificar con `vigilancia-normativa-col`**):

| Figura | Base de referencia |
|---|---|
| Elementos del contrato de trabajo y presunción de subordinación | CST arts. 22-24; primacía de la realidad, art. 53 Constitución |
| Contratista independiente y solidaridad del beneficiario | CST art. 34; simple intermediario, art. 35 |
| Trabajador en misión: causales y límite temporal | Ley 50 de 1990 (régimen EST) |
| Prohibición de tercerizar lo misional permanente vulnerando derechos | Ley 1429 de 2010, art. 63; Decreto 1072 de 2015 (estado del Decreto 583/2016: verificar) |
| Fiscalización y sanciones por omisión/inexactitud/mora en aportes | Régimen UGPP (Ley 1607 de 2012 y reformas) |
| Indemnización moratoria por no pago | CST art. 65 (alcance jurisprudencial: verificar) |

Reglas de fuente (sin suplencia silenciosa): si la verificación en vivo no
confirma una regla, reportar lo encontrado y ofrecer opciones (ampliar búsqueda
/ marcar no verificado y parar) — el abogado decide. Etiquetar cada cita:
`[verificado en vivo]`, `[jurisprudencia a confirmar]`, `[conocimiento del
modelo — verificar]`, `[aportado por el usuario]`; nunca borrar etiquetas. Si
el entregable cita jurisprudencia (indicios CSJ Sala Laboral, línea de contrato
realidad) → respaldar con `jurisprudencia-col`.

### Paso 3 — Aplicar el examen a los hechos

Puntuar factor por factor — no resumir. El abogado necesita ver qué factores
están limpios y cuáles son problema:

```
Examen: elementos del contrato de trabajo + presunción de subordinación
Base: [cita verificada + fecha | "a verificar"]

| Factor / indicio | Hechos del intake | Señal |
|---|---|---|
| Prestación personal del servicio | ... | laboral / independiente / neutro |
| Horario impuesto | ... | ... |
| Órdenes sobre modo, tiempo y lugar | ... | ... |
| Reglamento, permisos, supervisión jerárquica | ... | ... |
| Integración a la estructura (organigrama, equipo, correo corporativo) | ... | ... |
| Remuneración fija periódica vs. precio por resultado | ... | ... |
| Herramientas y medios: de la empresa vs. propios | ... | ... |
| Exclusividad de hecho vs. pluralidad de clientes | ... | ... |
| Riesgo económico propio | ... | ... |
| Labor misional permanente vs. proyecto con fin | ... | ... |

Cómo pesa el examen: acreditada la prestación personal, la subordinación SE
PRESUME — la carga de desvirtuarla es del contratante. No es un balance de
factores al estilo estadounidense: pocos indicios fuertes bastan para el
contrato realidad.

Resultado: [inclina a laboral / sostiene independencia / falla requisito X /
incierto — indicio disputado]
```

Si la estructura pretendida es EST o tercerización, correr además su examen
propio (causal y tope temporal EST; autonomía real, medios propios y
no-misionalidad permanente en tercerización). Señalar explícitamente los
indicios disputados o fact-sensitive que requieren juicio de abogado.

### Paso 4 — Clasificar, brechas y riesgo UGPP

**La llamada de clasificación** (una de): **dependiente** (contrato laboral:
indefinido / fijo / obra o labor) · **independiente genuino** (prestación de
servicios) · **trabajador en misión vía EST** (si la necesidad es permanente,
la figura no aguanta) · **tercerización / contratista independiente**
(empresa-a-empresa; la más limpia SI los hechos la sostienen; advertir
solidaridad si la labor es del giro ordinario del beneficiario — a verificar) ·
**zona gris** (decir qué indicio la causa y por qué).

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
prestaciones sociales retroactivas (cesantías e intereses, prima, vacaciones);
aportes omitidos + intereses moratorios y cálculo actuarial pensional en casos
largos; sanciones UGPP por omisión/inexactitud/mora, con plazos duros de
respuesta → `vencimientos-procesales-col`; indemnización moratoria (CST art.
65) e indemnizaciones por despido si aplica; multas del Ministerio de Trabajo
por intermediación laboral ilegal; ARL: accidente sin afiliación = prestaciones
a cargo del contratante.

**Escalamiento a especialista** si: labor misional permanente que se quiere
tercerizar; antecedente de fiscalización UGPP o demanda previa; el contratista
supervisará empleados; duración > 12 meses sin fin de proyecto claro; indicio
disputado que cambie el resultado; litigio activo (regla de compuerta).

### Paso 5 — Salida

```markdown
## Análisis de clasificación laboral — [empresa/caso]
**Vinculación propuesta:** | **Modo:** prospectivo / diagnóstico (banner) |
**Figuras examinadas:** | **Bases aplicadas:** [citas etiquetadas + estado]

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
[Lista aplicable; cuantificación → liquidador-aportes-col o "s/d"]

### Escalamiento
[Ninguno | Escalar a especialista antes de avanzar — motivo]

### Próximos pasos
[Independiente viable → contrato que refleje los términos que sostienen la
independencia (playbook-contratos-col). Brechas → corregir lista antes de usar
la figura. EST/tercerización más limpia → por qué. Dependiente → contrato
laboral + afiliaciones EPS/AFP/ARL/CCF + aportes (liquidador-aportes-col).]
```

Cerrar con etiquetas de certidumbre y cierre estándar de `anti-hallucination-v3`
y el árbol de decisión de próximos pasos (redactar contrato / escalar / pedir
más hechos / esperar / otra cosa) — el abogado elige.

## Compuerta de acción consecuente

Antes de emitir un "avance como independiente / EST / tercerización" definitivo:
la mala clasificación genera pasivos laborales, aportes retroactivos y
sanciones. Si el destinatario final es el cliente (no abogado), el entregable
sale marcado **BORRADOR — para revisión del abogado responsable** con el brief
de puntos débiles; la recomendación definitiva la firma el abogado del despacho.

## Lo que este skill NO hace

- Cuantificar exposición retroactiva (eso es `liquidador-aportes-col` dentro de
  un diagnóstico) ni sustituir el diagnóstico formal 02-DIAGNOSTICO.
- Litigar ni atender demanda o fiscalización en curso — va a especialista.
- Redactar el contrato resultante (→ `playbook-contratos-col`).
- Asesoría tributaria del contratista (retenciones, régimen) — eso es contador.
- Afirmar reglas no verificadas: toda base se confirma antes del primer uso.

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
