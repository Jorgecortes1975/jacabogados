---
name: acuerdos-datos-col
description: >
  Revisión contractual de acuerdos de tratamiento de datos personales bajo el
  régimen colombiano (Ley 1581/2012 y Decreto 1377/2013, compilado en el
  Decreto 1074/2015): detecta si el cliente actúa como Responsable o Encargado
  y aplica la revisión cláusula por cláusula correspondiente — encargo y
  contrato de transmisión, subencargados, seguridad, incidentes, auditoría,
  transmisiones y transferencias internacionales, supresión y responsabilidad —
  más chequeo de coherencia con la Política de Tratamiento y el RNBD, y deberes
  ante la SIC. Equivalencias GDPR solo como referencia comparada. Activar ante:
  revisar acuerdo de tratamiento de datos, contrato de transmisión, data
  processing agreement o DPA de contraparte, anexo de datos personales de un
  SaaS o proveedor, cláusulas de encargo, transferencia internacional de datos,
  ¿podemos firmar este acuerdo de datos? SIEMPRE activar cuando se aporte un
  DPA o acuerdo de datos para revisión o negociación contractual.
argument-hint: "[archivo | enlace Drive | texto pegado]"
---

# ACUERDOS DE TRATAMIENTO DE DATOS — REVISIÓN CONTRACTUAL (COLOMBIA)

Revisión de acuerdos de tratamiento de datos personales (el "DPA" colombiano:
contrato de encargo / contrato de transmisión) para clientes del despacho.
**División de trabajo**: `derecho-digital-col` cubre el marco general de datos
(políticas, avisos, incidentes, SaaS); **este skill hace solo la revisión y
negociación del contrato de datos concreto** entre Responsable y Encargado.

---

## REGLA DE HONESTIDAD NORMATIVA

Toda base legal citada aquí es **referencia de trabajo, a verificar con
`vigilancia-normativa-col` antes del primer uso en un entregable**. Etiquetas
de certidumbre (heredadas de `anti-hallucination-v3`), obligatorias en cada cita:

- `[estable]` — referencia estructural conocida (Ley 1581/2012, Decreto
  1377/2013, GDPR art. 28 como comparado). Verificar antes de radicar o enviar.
- `[verificar]` — reglamentación específica, circulares SIC, umbrales,
  vigencias. Verificación EN VIVO obligatoria antes de afirmar.
- `[verificar-puntual]` — artículos, numerales o plazos exactos: máximo riesgo
  de fabricación; NUNCA se entregan sin confirmación en fuente oficial.

Prohibido inventar números de artículos, plazos o cuantías de multas. Si hay
valores en dinero o UVT: solo cifras CONFIRMADAS (tabla maestra de
`liquidador-aportes-col` o verificación en vivo); si no, "s/d".

---

## PRIMERO: ¿EN QUÉ ROL ESTÁ EL CLIENTE?

Errar el rol invierte todas las recomendaciones. Establecer antes de todo:

- **Cliente = Encargado** (procesa datos por cuenta de otro: SaaS, BPO,
  agencia, plataforma) → el Responsable le envía su acuerdo → revisión
  **defensiva** (proteger la operación del cliente).
- **Cliente = Responsable** (decide sobre la base de datos y contrata a un
  proveedor) → revisión **protectora** (proteger los datos del cliente y de
  sus titulares).
- Si el papel real no coincide con la etiqueta del contrato (dicen "encargado"
  a quien decide finalidades), señalarlo: en Colombia el rol lo definen los
  hechos del tratamiento, no el rótulo contractual `[estable]`.

Si es ambiguo, preguntar. No asumir.

## MARCO COLOMBIANO DE LA REVISIÓN (base a verificar)

- **Roles y deberes**: Ley 1581/2012 — definiciones de Responsable y Encargado
  y catálogos de deberes de cada uno `[verificar-puntual]` (arts. de referencia:
  3, 17 y 18 — confirmar antes de citar).
- **Transmisión vs. transferencia** (distinción clave que el GDPR no usa así):
  *transferencia* = envío de datos a otro **Responsable**; *transmisión* =
  envío a un **Encargado** para tratamiento por cuenta del Responsable
  `[verificar]` (Decreto 1074/2015, capítulo 25 del libro 2, parte 2).
- **Contrato de transmisión**: el Decreto 1377/2013 (compilado) exige que la
  transmisión a Encargado conste en contrato con obligaciones mínimas
  (finalidades, deberes del Encargado, seguridad, confidencialidad) y, en
  transmisiones internacionales, ese contrato hace innecesaria la nueva
  autorización del titular `[verificar-puntual]`.
- **Transferencias internacionales**: prohibición de transferir a países sin
  nivel adecuado de protección, con excepciones tasadas (autorización expresa
  del titular, ejecución de contrato, etc.) `[verificar]`; estándar de nivel
  adecuado y lista de países en la Circular Externa 005 de 2017 de la SIC,
  incorporada a la Circular Única `[verificar]`.
- **RNBD**: Registro Nacional de Bases de Datos ante la SIC; obligados
  delimitados por decreto (referencia: Decreto 090 de 2018 — sociedades sobre
  cierto umbral de activos y entidades públicas) `[verificar]`; los incidentes
  de seguridad se reportan a la SIC vía RNBD en el plazo de la Circular Única
  vigente — plazo SIEMPRE "a verificar en fuente oficial", nunca de memoria.
- **GDPR solo como comparado**: controller≈Responsable, processor≈Encargado,
  art. 28≈contrato de encargo/transmisión, art. 33≈reporte de incidentes. Útil
  para negociar con contrapartes extranjeras, pero NUNCA presentar una regla
  GDPR (72 horas, SCCs, DPIA) como derecho colombiano vigente. Comparaciones a
  fondo → `derecho-comparado-intl` (respetando su muro de separación).

## CONTEXTO PREVIO DEL CLIENTE

Antes de revisar, mirar la carpeta del cliente (`{empresa}/` según flujo del
despacho): intakes, diagnósticos, revisiones anteriores de la misma contraparte
o actividad. Una revisión previa fija expectativas; si esta se aparta, decirlo
y explicar por qué. **La severidad previa es piso**: un riesgo marcado 🔴 antes
no se degrada en silencio a 🟢. Si no hay antecedentes, declararlo: "Sin
revisión previa de esta contraparte en el expediente".

## CAPA DE REGÍMENES ESPECIALES (preguntar antes de la revisión cláusula a cláusula)

¿Los datos del acuerdo incluyen alguna categoría con régimen reforzado?

- **Datos financieros / crediticios** → Ley 1266/2008 (habeas data financiero)
  con reglas y vigilancia propias `[verificar]`.
- **Datos de salud / historia clínica** → reserva legal sanitaria y carácter
  sensible `[verificar]`.
- **Datos sensibles** (biometría, salud, orientación, ideología) → tratamiento
  restringido y autorización explícita `[verificar]`.
- **Datos de niños, niñas y adolescentes** → tratamiento excepcional, interés
  superior del menor `[verificar]`.

Si aplica alguno: el régimen especial manda sobre el playbook genérico —
investigar la regla operativa y citarla con etiqueta. Si no aplica ninguno,
dejarlo escrito ("sin categorías de régimen especial identificadas") para que
conste que el chequeo se hizo.

## REVISIÓN TÉRMINO A TÉRMINO (toda revisión pasa por esta tabla)

| Término | Qué buscar | Pelea típica |
|---|---|---|
| **Roles** | Designación Responsable/Encargado que coincida con la realidad | Etiquetas que no reflejan quién decide finalidades |
| **Alcance del encargo** | Limitado a instrucciones documentadas y finalidades definidas | Ampliadores abiertos ("y fines relacionados") |
| **Subencargados** | Lista actual revelada + mecanismo de cambio definido | Aprobación general vs. veto vs. solo aviso |
| **Medidas de seguridad** | Anexo con controles o estándar nombrado | "Medidas apropiadas" sin anexo = promesa vacía |
| **Incidentes de seguridad** | Disparador definido (conocimiento vs. confirmación) + plazo + quién reporta a la SIC/titulares | Plazos GDPR trasplantados sin base colombiana; silencio sobre el reporte vía RNBD |
| **Auditoría** | Método (informe vs. in situ), frecuencia, preaviso, costos | Auditorías in situ con preaviso mínimo |
| **Transmisión/transferencia internacional** | Figura correcta (transmisión↔Encargado / transferencia↔Responsable) + habilitación (contrato de transmisión, autorización, país adecuado) | Mecanismo ausente o figura mal calificada |
| **Supresión/devolución** | Plazo post-terminación, certificación, salvedad de backups | "Supresión comercialmente razonable" = nada |
| **Responsabilidad** | Dentro del tope del contrato marco o régimen separado; carve-outs | Responsabilidad por datos sin tope = existencial; sanciones SIC no son asegurables por pacto |
| **Atención de titulares** | Quién responde consultas y reclamos y en qué plazo (términos legales → `vencimientos-procesales-col`) | Encargado cargado con plazos que la ley pone al Responsable, o viceversa |

## CLIENTE ENCARGADO: REVISIÓN DEFENSIVA

El Responsable intenta trasladar carga operativa. Comparar cada exigencia con
lo operativamente posible y con el piso legal colombiano (verificado):

| Cláusula recibida | Riesgo | Posición de trabajo |
|---|---|---|
| Veto sobre subencargados | No se puede cambiar infraestructura cliente por cliente | Lista publicada + aviso previo con derecho a terminar |
| Auditoría in situ con preaviso corto | Inviable a escala | Informe independiente primero; in situ con preaviso amplio y costos del solicitante |
| Plazo de incidentes agresivo (ej. horas, calco GDPR) | Exige avisar antes de saber qué pasó | Aviso "sin dilación injustificada" desde confirmación + piso legal colombiano verificado `[verificar]` |
| Residencia de datos forzosa en un país | Puede no coincidir con la arquitectura | Comprometer solo lo real; documentar corredores internacionales con su habilitación |
| Responsabilidad sin tope | Riesgo existencial | Tope alineado al contrato marco; carve-outs negociados y explícitos |
| "Instrucciones" abiertas del Responsable | Control operativo ilimitado | Instrucciones = las documentadas en el contrato o acordadas por escrito |
| Supresión en plazo mínimo | Backups y logs lo hacen imposible | Plazo realista + salvedad de rotación de backups con supresión diferida |

## CLIENTE RESPONSABLE: REVISIÓN PROTECTORA

El proveedor intenta no comprometerse a nada. El cliente sigue respondiendo
ante la SIC y los titulares por el tratamiento que delega `[estable]`:

| Vacío del proveedor | Brecha | Exigencia |
|---|---|---|
| Sin lista de subencargados | No se sabe quién toca los datos | Lista vigente publicada + aviso previo de cambios |
| "Seguridad estándar de la industria" | No significa nada | Anexo de controles o estándar nombrado (ISO 27001, SOC 2) |
| Sin plazo de incidentes | Avisan cuando quieran | Plazo definido que permita al cliente cumplir su propio reporte a la SIC |
| Sin derecho de auditoría | Nada verificable | Mínimo: informe de auditoría independiente periódico |
| Uso de datos para "mejorar el servicio" / entrenar IA | Finalidad no autorizada por los titulares | Tachar; tratamiento limitado a prestar el servicio (coherente con checklist de `derecho-digital-col`) |
| Sin habilitación para envío internacional | Transmisión/transferencia sin soporte legal | Contrato de transmisión u otra habilitación verificada para cada corredor — si falta y hay envío internacional: 🔴 automático |
| Sin compromiso de supresión | Los datos viven para siempre | Supresión/devolución con plazo + certificación a solicitud |

## CHEQUEO DE COHERENCIA: POLÍTICA DE TRATAMIENTO Y RNBD

El acuerdo no puede prometer lo que la Política de Tratamiento del cliente no
cubre, ni al revés:

- ¿Las finalidades del acuerdo están en la Política de Tratamiento y en la
  autorización de los titulares?
- ¿El aviso de privacidad y la política reflejan la existencia de Encargados y
  del envío internacional que el acuerdo crea?
- Si el cliente está obligado al RNBD `[verificar]`: ¿el registro de la base
  refleja el nuevo Encargado, las finalidades y el canal internacional?

Los desajustes suelen ser política desactualizada, no acuerdo malo — pero
alguien tiene que corregir uno de los dos. Redacción de la política corregida
→ `derecho-digital-col`.

## GRANULARIDAD DEL REDLINE

Editar en la menor unidad posible: palabra antes que frase, frase antes que
oración, oración antes que cláusula; reemplazar una cláusula entera solo cuando
la versión ajena esté tan lejos que el remiendo sea ilegible — y decirlo en la
remisión. Un redline quirúrgico dice "leímos con cuidado"; uno total dice
"botamos tu borrador". En la duda: más pequeño.

## SALIDA (memo de revisión)

```markdown
# Revisión de acuerdo de datos: [Contraparte]
**Rol del cliente:** [Responsable / Encargado] · **Fecha:** [fecha]
**Anexo a:** [contrato marco / independiente]

## Conclusión
[Dos frases: ¿se puede firmar? ¿qué debe cambiar?]
**Hallazgos:** [N]🟢 [N]🟡 [N]🟠 [N]🔴

## Término a término
[Por término: qué dice el acuerdo → posición nuestra → brecha → riesgo →
redline propuesto. Bloques cortos, escaneables.]

## Regímenes especiales
[Aplican / "sin categorías de régimen especial identificadas"]

## Coherencia con Política de Tratamiento y RNBD
[🟢 Coherente | 🟡 Ajustes: lista]

## Redlines recomendados (consolidados, listos para devolver)

## Si la contraparte no cede
[Por hallazgo: posición de repliegue o escalamiento al abogado]

[Cierre estándar y etiquetas de certidumbre de anti-hallucination-v3]
```

Regla señal/ruido: la conclusión primero, sin narrar el proceso, sin secciones
vacías. Entregable en Word/PDF para cliente → `kit-entregables-col`.

## COMPUERTA ANTES DE FIRMAR

Revisar es análisis; **firmar es el acto jurídico**: obliga al cliente ante la
SIC y los titulares. Antes de recomendar firma: (1) verificación EN VIVO con
`vigilancia-normativa-col` de toda base marcada `[verificar]`/`[verificar-puntual]`
usada en el memo; (2) validación del abogado del despacho. Si el asunto ya está
en litigio o en procedimiento sancionatorio ante la SIC → **abogado
especialista** (regla del despacho: no litigio activo sin especialista). Los
efectos tributarios del contrato no se asesoran aquí (van al CPA/contador).

## LO QUE ESTE SKILL NO HACE

- No redacta desde cero políticas, avisos de privacidad ni T&C, ni gestiona
  incidentes → `derecho-digital-col`.
- No hace la evaluación de impacto ni el análisis de nivel adecuado del país de
  destino — los exige y los deja señalados.
- No decide aceptar términos fuera de las posiciones de repliegue — eso escala
  al abogado responsable.

## VINCULACIÓN

| Skill | Relación |
|---|---|
| `derecho-digital-col` | Marco general de datos, políticas, incidentes, SaaS — este skill es su pieza contractual específica (vinculación, no duplicación) |
| `vigilancia-normativa-col` | Verificación EN VIVO de Ley 1581, decretos, circulares SIC y plazos antes de entregar |
| `anti-hallucination-v3` | Etiquetas de certidumbre y cierre estándar en cada memo |
| `vencimientos-procesales-col` | Plazos legales de consultas, reclamos y reportes que el acuerdo distribuye |
| `liquidador-aportes-col` | Única fuente de cifras CONFIRMADAS si el análisis toca valores (UVT, umbrales) |
| `playbook-contratos-col` | Posiciones estándar y de repliegue del despacho por cláusula |
| `lexa-mercantil-col` | Contrato marco (SaaS, servicios) al que el acuerdo de datos se anexa |
| `derecho-comparado-intl` | Comparaciones GDPR/otras jurisdicciones a fondo (respetando su muro de separación) |
| `investigacion-juridica-corporativa-col` | Debida diligencia sobre la contraparte cuando el riesgo lo amerite |
| `kit-entregables-col` | Empaquetado del memo y los redlines para el cliente |

---

Adaptado de anthropics/claude-for-legal (licencia del repositorio oficial) para
el sistema jurídico colombiano — JA Abogados / Bufete Cortés Cartagena, jul-2026.
