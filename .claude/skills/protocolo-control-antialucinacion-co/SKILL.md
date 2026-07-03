---
name: protocolo-control-antialucinacion-co
description: Ejecuta el gate final obligatorio de 12 fases del despacho antes de radicar, entregar o usar estratégicamente cualquier demanda, tutela, recurso, alegato, concepto jurídico, derecho de petición o contrato — triage de 24 campos, motor de hechos, motor probatorio de 14 criterios, control jurisprudencial de 11 puntos, control de procedibilidad de 20 puntos, control argumentativo y adversarial, control de redacción, y semáforo final de aprobación. Úsala cuando el usuario pida el control de calidad final antes de radicar un documento judicial o administrativo, auditar un borrador contra alucinaciones o vacíos probatorios, o clasificar el nivel de confiabilidad de una pieza jurídica antes de entregarla.
---

# Protocolo de Control y Protección contra Ambigüedades y Alucinaciones (Colombia)

**Modelo recomendado**: Claude Opus 4.8 (`claude-opus-4-8`) para el control
argumentativo y adversarial (Fases 8-9, requieren simular la mejor tesis de
la contraparte). Claude Sonnet 5 (`claude-sonnet-5`) para el resto de fases,
que son más mecánicas (triage, checklists, verificación de citas).

Este protocolo es la **Fase Final obligatoria** del ecosistema LEXA-LAB antes
de que cualquier documento con impacto externo salga del despacho — coordina
con `verificacion-citas-co` (verificación de citas puntuales),
`control-conflictos-intake-co` (intake), `redaccion-tutela-co`,
`revision-contrato-mercantil-co` y cualquier otra skill que redacte un
documento litigioso o corporativo. Ninguna de esas skills reemplaza este
gate: producen el borrador, este protocolo decide si el borrador puede
avanzar. Las reglas breves y permanentes de tolerancia cero ya viven también
en `CLAUDE.md` (capa siempre activa); este skill es la capa pesada que se
invoca específicamente antes de radicar o entregar.

Documentos cubiertos: demandas, contestaciones, tutelas, recursos, alegatos,
conceptos jurídicos, contratos, derechos de petición y documentos
administrativos.

## Regla de veracidad obligatoria (no negociable) — tolerancia cero

Estas prohibiciones aplican sin excepción, sin importar la urgencia, la
complejidad del asunto o el grado de certeza aparente del análisis previo:

No inventar hechos. No inventar pruebas. No inventar fechas. No inventar
normas. No inventar sentencias. No inventar radicados. No inventar
autoridades. No inventar citas doctrinales. No presentar hipótesis como
certezas. No ocultar debilidades ni vacíos probatorios. No citar
jurisprudencia sin identificar corporación, sala, número de sentencia,
fecha, regla jurídica y pertinencia fáctica. No afirmar vigencia normativa
sin verificación en fuente oficial o advertencia expresa. No confundir hecho
probado con afirmación de parte. No confundir indicio con prueba plena. No
cerrar una pretensión sin soporte fáctico, probatorio y normativo.

**Marcadores obligatorios ante información ausente o no verificada** (úsalos
literalmente, no los parafrasees):
- `[DATO NO SUMINISTRADO]` — falta información crítica que impide completar el análisis.
- `[REFERENCIA NO VERIFICADA]` — una norma o sentencia no puede confirmarse en fuente oficial.
- `[CONCLUSIÓN CONDICIONADA A SOPORTE PROBATORIO]` — la conclusión depende de una prueba ausente o pendiente de obtención.
- `[Reformación pendiente]` — etiqueta de máximo riesgo: existe posibilidad de que una norma, decreto o línea jurisprudencial haya sido modificada después de la fecha de corte del modelo. Obligatoria ante reformas laborales, cambios en el CPTSS, virajes de precedente constitucional o actualizaciones de reglamentación especial.

**Fuentes de validación autorizadas**, en orden de prioridad, para remover
cualquier etiqueta de incertidumbre: Diario Oficial, SUIN-Juriscol,
Secretaría del Senado, relatorías oficiales (Corte Constitucional, CSJ,
Consejo de Estado), LexisNexis Colombia (si el despacho tiene suscripción
activa), Rama Judicial (motor de búsqueda de procesos), Función Pública
(actos administrativos). Si no tienes acceso real a estas fuentes en el
entorno de trabajo, dilo explícitamente en vez de simular la verificación —
igual que exige `verificacion-citas-co`.

## Cuándo usar esta skill

Antes de radicar, entregar o usar estratégicamente cualquier demanda,
tutela, recurso, alegato, concepto jurídico, contrato, derecho de petición o
documento administrativo. También cuando el usuario pida auditar un borrador
ya escrito (propio o de un tercero) contra alucinaciones, vacíos probatorios
o citas no verificadas antes de firmarlo.

## Proceso operativo — 12 fases secuenciales

Ningún documento avanza a la fase siguiente sin superar el control de la
anterior. Si una fase detecta un riesgo crítico, el documento se devuelve con
la matriz de vacíos y la ruta de corrección — nunca avanza "con reservas" sin
que quede escrito qué reserva es.

**Fase 1 — Control de entrada.** Completa la ficha de triage de 24 campos
antes de revisar cualquier documento (tipo de documento, área jurídica, rol
del usuario, objetivo, autoridad destinataria, jurisdicción, competencia,
etapa procesal, fecha crítica, pretensiones, contraparte, hechos conocidos y
no probados, pruebas disponibles y faltantes, normas y jurisprudencia
invocadas, riesgos, resultado esperado, urgencia, responsables). Ver
`references/fase1-2-triage-y-clasificacion.md` para la ficha completa. Si
falta un campo crítico, el documento no avanza — márcalo `[DATO NO
SUMINISTRADO]` y pide el dato antes de continuar.

**Fase 2 — Clasificación documental y ruta de control.** Cada tipo de
documento (demanda, tutela, recurso, concepto, contrato, derecho de
petición, alegato, documento administrativo) activa su propio checklist
específico — ver `references/fase1-2-triage-y-clasificacion.md`.

**Fase 3 — Motor de hechos.** Reconstruye los hechos en orden cronológico y
clasifica cada uno en una de 7 categorías (probado, afirmado, inferido,
controvertido, perjudicial, por probar, irrelevante). Ningún hecho relevante
queda sin categoría. Ver `references/fase3-6-hechos-pruebas-normas-jurisprudencia.md`.

**Fase 4 — Motor probatorio.** Evalúa cada prueba bajo 14 criterios
(pertinencia, conducencia, utilidad, legalidad, autenticidad, integridad,
credibilidad, fuerza persuasiva, riesgo de exclusión/objeción, necesidad de
autenticación/peritaje, relación con hechos y con pretensiones). Ver mismo
archivo de referencias.

**Fases 5 y 6 — Motores normativo y jurisprudencial.** Para cada norma:
contenido aplicable, vigencia, conflicto normativo y prevalencia, relación
con la pretensión. Para cada cita jurisprudencial, control de 11 puntos
(corporación, sala, número/radicado, fecha, tema, ratio decidendi, carácter
vinculante u orientador, pertinencia fáctica, uso estratégico, riesgo de
inaplicación). Si no se puede confirmar el radicado exacto: marcar `[No
verificado]` y NO citarla. Ver mismo archivo de referencias.

**Fase 7 — Control de procedibilidad.** Verifica los 20 puntos (jurisdicción,
competencia, legitimación, oportunidad, prescripción, caducidad, requisito
de procedibilidad, contradictorio, notificación, congruencia, carga de
prueba, pretensiones ejecutables, anexos, poder, cuantía, recursos
procedentes, riesgos de inadmisión/rechazo/nulidad/improcedencia). Ver
`references/fase7-9-procedibilidad-argumentacion-adversarial.md`.

**Fase 8 — Control argumentativo.** Cada argumento sigue la fórmula de 9
pasos: afirmación jurídica, hecho probado que la soporta, prueba que lo
acredita, norma aplicable, regla jurisprudencial pertinente, subsunción,
conclusión jurídica, riesgo de ataque de la contraparte, respuesta al
ataque. Un argumento que no conecte hecho-prueba-norma-consecuencia se
corrige o se elimina. Ver mismo archivo de referencias.

**Fase 9 — Control adversarial.** Simula la mejor contraparte posible:
identifica qué hecho atacará, qué prueba objetará, qué norma
reinterpretará, qué precedente usará en su favor, qué excepción o nulidad
propondrá. Por cada vector de ataque identificado, el documento debe
contener respuesta jurídica sustantiva, refuerzo probatorio y, si aplica,
ajuste de redacción. Ver mismo archivo de referencias.

**Fase 10 — Control de redacción jurídica.** Verifica las 14 reglas de
redacción (lenguaje claro, oraciones sin ambigüedad, voz activa, un párrafo
una idea, estructura antecedentes→hechos→fundamentos→pretensiones, sin
frases genéricas, sin conclusiones no respaldadas, sin estilo
detectablemente artificial). Ver
`references/fase10-12-redaccion-semaforo-acta.md`.

**Fase 11 — Semáforo final de aprobación.** Clasifica el documento en Verde,
Amarillo, Naranja o Rojo (definiciones completas en el archivo de
referencia). Solo Verde y Amarillo permiten continuar; Naranja y Rojo se
devuelven con matriz de vacíos.

**Fase 12 — Acta de control de despacho.** Deja registro trazable del
resultado de las 12 fases y del nivel de confiabilidad final (Alto/Medio/
Bajo) en el expediente del caso. Ver mismo archivo de referencia para el
formato de acta.

## Mini-ejemplo (aplicación parcial a un derecho de petición)

**Documento**: derecho de petición por estabilidad laboral reforzada de un
trabajador con diagnóstico médico (caso ficticio, sin datos reales de
cliente).

- **Fase 1 (extracto)**: tipo=derecho de petición; hecho crítico faltante →
  `[DATO NO SUMINISTRADO: fecha exacta de notificación del diagnóstico al
  empleador]`.
- **Fase 3 (motor de hechos)**: "el trabajador tiene diagnóstico médico" →
  **Probado** (hay historia clínica aportada). "El empleador conocía el
  diagnóstico antes del despido" → **Por probar** (esencial para el fuero;
  bloqueo si no se consigue el soporte). "El despido fue represalia por el
  diagnóstico" → **Inferido**, no presentar como certeza sin el hecho
  anterior probado.
- **Fase 6 (control jurisprudencial)**: si el borrador cita una sentencia de
  estabilidad laboral reforzada sin poder confirmar el número exacto de
  radicado en este momento → `[No verificado]`, no se cita hasta confirmar
  contra relatoría oficial.
- **Fase 9 (adversarial)**: vector de ataque probable del empleador → alegar
  que desconocía el diagnóstico al momento del despido. Respuesta requerida
  en el documento → el soporte documental de notificación previa (Fase 1) es
  exactamente lo que falta — el documento no debe cerrar la pretensión como
  certeza mientras ese vacío siga abierto.
- **Fase 11 (semáforo)**: con el hecho crítico de la Fase 3 sin probar →
  **Amarillo** (puede usarse con la reserva señalada) o **Naranja** si ese
  hecho es indispensable para la pretensión — se devuelve para completar
  soporte antes de radicar.

## Cierre — límite de esta skill

Esta skill nunca radica, envía ni firma un documento por sí sola — clasifica
su nivel de confiabilidad y su ruta de corrección. La decisión de radicar
con reservas señaladas (estado Amarillo), de completar el expediente antes
de continuar (Naranja/Rojo), y la responsabilidad final ante el despacho
judicial, la autoridad, el cliente o la contraparte, es siempre del abogado
que firma el documento.
