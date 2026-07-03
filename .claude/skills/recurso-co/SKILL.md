---
name: recurso-co
description: Redacta recursos procesales colombianos (reposición, apelación, queja y súplica) en sede judicial y administrativa, y prepara el análisis previo de recursos extraordinarios de nivel superior (casación y revisión), identificando la providencia atacada, el error o vicio concreto, y verificando procedencia y oportunidad antes de sustentar el agravio. Úsala cuando el usuario pida redactar un recurso de reposición, apelación, queja o súplica contra una providencia judicial o un acto administrativo, o preparar el análisis previo de un recurso de casación o de revisión.
---

# Redacción de recursos procesales (Colombia)

## Regla de veracidad obligatoria (no negociable)

Nunca se inventa el error o vicio atacado de la providencia recurrida. Este
Skill solo sustenta el agravio a partir de lo que el usuario haya descrito
explícitamente sobre la providencia (su parte resolutiva, su motivación, el
error señalado). Si el usuario no ha descrito con precisión qué le agravia de
la decisión, el Skill pide ese dato antes de redactar — no completa el vacío
con un error "típico" de ese tipo de proceso.

Nunca se afirma la procedencia o la oportunidad de un recurso sin verificar
el término aplicable contra la norma procesal concreta (CGP, CPACA, CPTSS,
CPP, según el proceso). Si el Skill no puede confirmar en esta sesión el
término exacto (días, ejecutoria, notificación) contra la norma vigente, lo
marca `[REFERENCIA NO VERIFICADA]` — nunca asume el término "usual" de
memoria ni lo presenta como confirmado.

Nunca se cita jurisprudencia (de casación o de cualquier otra sede) sin los
11 puntos de control de la Fase 6 del protocolo maestro (corporación, sala,
número/radicado, fecha, tema, ratio decidendi, carácter vinculante u
orientador, pertinencia fáctica, uso estratégico, riesgo de inaplicación,
verificación en fuente oficial). Si no se puede confirmar el radicado exacto,
se marca `[No verificado]` y no se cita — se recomienda correr
`verificacion-citas-co` antes de completar esa sección.

## Cuándo usar esta skill

Cuando el abogado necesita redactar un recurso ordinario (reposición,
apelación, queja o súplica) contra una providencia judicial o un acto
administrativo, en cualquier jurisdicción (civil, laboral, penal, familia,
contencioso-administrativa) o sede (judicial o administrativa). También
cuando necesita el análisis previo — no necesariamente el texto final — de un
recurso extraordinario de nivel superior: casación (ante la Corte Suprema de
Justicia o el Consejo de Estado) o revisión, donde el control de causal
específica y de requisitos de admisibilidad es más estricto que en los
recursos ordinarios.

## Proceso operativo

1. **Identificar el tipo de recurso, la providencia atacada y la autoridad
   competente para resolverlo.** Pedir al usuario, si no los ha dado ya: qué
   providencia se recurre (auto o sentencia, número, fecha, autoridad que la
   dictó), qué resolvió en la parte que agravia al usuario, y ante quién se
   presenta y quién lo decide (la misma autoridad en reposición, el superior
   funcional en apelación, el superior en queja cuando se niega la
   apelación, la misma sala en súplica contra autos del ponente, la Corte
   Suprema o el Consejo de Estado en casación, la misma corporación en
   revisión). Si falta cualquiera de estos datos, marcar
   `[DATO NO SUMINISTRADO]` y pedirlo antes de continuar.

2. **Verificar procedencia y oportunidad.** Confirmar dos cosas por
   separado: (i) ¿este recurso cabe contra esta providencia en este tipo de
   proceso? — no todo auto es recurrible, no toda sentencia admite
   apelación, no toda decisión administrativa admite reposición y apelación
   a la vez; (ii) ¿se está dentro del término? — contar el término exacto
   (días hábiles u ordinarios según la norma aplicable) desde la
   notificación o ejecutoria. Si el Skill no puede confirmar el término
   exacto contra la norma procesal vigente en esta sesión, marcar
   `[REFERENCIA NO VERIFICADA]` de forma explícita en vez de asumir un plazo
   "estándar". No declarar procedente ni oportuno un recurso mientras ese
   punto esté marcado.

3. **Identificar el agravio concreto y el error atacado.** A partir de lo que
   el usuario haya descrito, clasificar el error en una categoría concreta
   — nunca genérica: error de hecho (valoración indebida de una prueba,
   prueba no valorada, hecho no probado que se dio por probado), error de
   derecho (norma inaplicada, norma mal interpretada, norma indebidamente
   aplicada), falta de motivación (ausencia de sustento fáctico o jurídico
   de la decisión), o violación directa/indirecta de la norma sustancial
   (relevante en casación laboral y civil: directa = sin discusión
   probatoria; indirecta = a través de error de hecho o de derecho en la
   apreciación de la prueba). Si el usuario no ha señalado con precisión cuál
   es el error, el Skill pregunta — no elige uno por su cuenta ni presenta
   una hipótesis como el error real.

4. **Aplicar el contrato de salida estructurada** (ver sección siguiente)
   como análisis previo, antes de redactar el texto final del recurso.

5. **Redactar el texto final** con la estructura estándar: (i)
   identificación de la providencia recurrida (autoridad, radicado, fecha,
   fecha de notificación); (ii) fundamento de procedencia y oportunidad
   (norma que habilita el recurso contra esa providencia, cómputo del
   término); (iii) sustentación del agravio (el error concreto, con
   remisión puntual a la parte de la providencia y al hecho o prueba que lo
   demuestra — nunca una crítica genérica a "la valoración del juez");
   (iv) pretensión recursiva concreta y ejecutable (revocar, modificar,
   aclarar, o remitir en queja/súplica según corresponda — nunca un pedido
   difuso de "que se haga justicia").

6. **Remitir a `protocolo-control-antialucinacion-co`** como gate final
   antes de presentar el recurso. Este Skill produce el borrador; el
   protocolo aplica el control de procedibilidad de 20 puntos (Fase 7,
   donde vive el detalle de oportunidad, legitimación, riesgo de
   inadmisión) y el control adversarial (Fase 9) antes de que el documento
   pueda salir del despacho. Ninguna providencia sobre procedencia final la
   toma este Skill por sí solo.

## Contrato de salida estructurada (análisis previo)

Antes del texto final del recurso, producir siempre este análisis en el
siguiente orden. No reemplaza el recurso mismo — lo precede y lo sustenta.

- **hechos_confirmados**: lo que el usuario ha descrito con precisión sobre
  la providencia y el trámite (qué resolvió, cuándo se notificó, qué prueba
  o argumento se omitió o se valoró mal).
- **hechos_no_confirmados**: lo que falta — fecha exacta de notificación,
  texto literal de la parte resolutiva, si hubo o no recurso de reposición
  previo cuando la apelación lo exige en subsidio.
- **problema_juridico**: en una frase, qué error concreto de la providencia
  se ataca y bajo qué categoría (hecho, derecho, motivación, violación
  directa/indirecta de la norma sustancial).
- **fuentes_y_soportes**: norma que habilita el recurso y fija el término,
  y cualquier jurisprudencia invocada — cada una con los 11 puntos de
  control o marcada `[No verificado]`.
- **analisis**: por qué el error atacado, si se confirma, debería llevar a
  la revocatoria, modificación o remisión pedida — conectando hecho, prueba
  y norma (misma lógica de la Fase 8 del protocolo maestro).
- **riesgos**: riesgo de inadmisión, de rechazo por extemporaneidad, o de
  que el superior confirme la providencia por una razón distinta a la
  discutida.
- **texto_final**: el recurso redactado según la estructura del paso 5.
- **validaciones_pendientes**: toda referencia normativa o jurisprudencial
  marcada `[REFERENCIA NO VERIFICADA]` o `[No verificado]` que debe
  confirmarse antes de radicar, y el recordatorio de correr
  `verificacion-citas-co`.
- **nivel_de_confianza**: Alto, Medio o Bajo, según cuántos de los puntos
  anteriores queden con marcadores de incertidumbre abiertos.

## Reglas de formato

La sustentación del agravio debe ser concreta, con remisión puntual a la
parte de la providencia que se ataca — nunca una crítica genérica del tipo
"el juez valoró mal las pruebas" sin decir cuál prueba ni cómo debió
valorarse. Lenguaje claro y directo, en voz activa, un párrafo por idea.
Evitar citar jurisprudencia decorativa: cada cita jurisprudencial debe
conectarse a la regla concreta que sustenta el agravio, no usarse como
relleno de autoridad. Si una cita no aporta una regla aplicable al error
atacado, se omite.

## Mini-ejemplo completo (recurso de apelación laboral, hechos ficticios)

**Datos aportados por el usuario**: sentencia de primera instancia dictada
por el Juzgado Segundo Laboral del Circuito de Medellín (caso ficticio,
radicado ficticio 05001-31-05-002-2025-00123-00), que condenó a la empresa
demandada "Textiles Andinos S.A.S." (ficticia) a pagar indemnización por
despido sin justa causa, pero tasó la indemnización con el salario base
anterior al último incremento pactado en el otrosí de 2024, que el usuario
sí aportó como prueba documental en el proceso. Notificada por estado el
2026-06-10. El usuario (apoderado de la demandada, que apela porque considera
que el monto quedó mal tasado a su favor... en este ejemplo se redacta desde
la parte demandante, inconforme porque el monto quedó por debajo del salario
real) confirma que el otrosí de incremento salarial obra en el expediente
como prueba documental admitida y no fue mencionado en la parte motiva de
la sentencia.

**hechos_confirmados**: (1) la sentencia condenó por despido sin justa
causa; (2) tasó la indemnización con el salario base anterior al otrosí de
2024; (3) el otrosí de incremento salarial fue admitido como prueba
documental en el proceso; (4) notificación por estado el 2026-06-10.

**hechos_no_confirmados**: `[DATO NO SUMINISTRADO]` — si el otrosí fue
citado o no en cualquier parte de la sentencia (el usuario afirma que no,
pero no se ha confirmado con el texto literal de la parte motiva).

**problema_juridico**: error de hecho por prueba no valorada — la sentencia
tasó la indemnización sin considerar el otrosí de incremento salarial de
2024, admitido como prueba documental, lo que llevó a una base salarial
inferior a la real.

**fuentes_y_soportes**: procedencia y término de apelación contra sentencias
laborales de primera instancia — `[REFERENCIA NO VERIFICADA: confirmar el
término exacto de ejecutoria y de sustentación del recurso de apelación
contra la sentencia de primera instancia bajo el Código Procesal del
Trabajo y de la Seguridad Social vigente para este tipo de proceso, antes de
afirmar oportunidad]`. Jurisprudencia sobre error de hecho por prueba
documental no valorada en materia laboral: `[No verificado — pendiente
confirmar radicado exacto en la relatoría de la Sala Laboral de la Corte
Suprema de Justicia antes de citarla]`.

**analisis**: el otrosí de 2024 es prueba documental admitida y no
tachada; si la sentencia, en efecto, no la valoró al fijar la base salarial,
existe un error de hecho manifiesto y trascendente, porque cambia
directamente el monto de la condena. La pretensión recursiva debe pedir la
modificación de la tasación, no la revocatoria total, porque la
responsabilidad por despido sin justa causa no se discute — solo el monto.

**riesgos**: riesgo de que el superior considere que el otrosí sí fue
considerado implícitamente (si la parte motiva usa una fórmula genérica de
"salario devengado" sin especificar), lo que exigiría anexar la liquidación
comparativa como refuerzo probatorio en la sustentación.

**texto_final** (fragmento):

> **1. Identificación de la providencia recurrida**: sentencia de primera
> instancia proferida por el Juzgado Segundo Laboral del Circuito de
> Medellín el [DATO NO SUMINISTRADO: fecha exacta de la sentencia],
> radicado 05001-31-05-002-2025-00123-00, notificada por estado el
> 2026-06-10.
>
> **2. Fundamento de procedencia y oportunidad**: se interpone recurso de
> apelación contra la sentencia de primera instancia dentro del término
> legal. `[REFERENCIA NO VERIFICADA: confirmar el término exacto de
> ejecutoria y sustentación aplicable antes de radicar]`.
>
> **3. Sustentación del agravio**: la sentencia recurrida, al tasar la
> indemnización por despido sin justa causa, tomó como base el salario
> vigente antes del otrosí de incremento salarial suscrito en 2024, prueba
> documental admitida y no tachada dentro del proceso (folio [DATO NO
> SUMINISTRADO: número de folio]). Al omitir esa prueba en la fijación de
> la base salarial, la sentencia incurrió en un error de hecho manifiesto
> que redujo indebidamente el monto de la condena.
>
> **4. Pretensión recursiva**: se solicita al superior funcional modificar
> el numeral [DATO NO SUMINISTRADO] de la parte resolutiva de la sentencia,
> para que la indemnización se tase con el salario resultante del otrosí de
> 2024, manteniendo en firme la declaración de despido sin justa causa.

**validaciones_pendientes**: confirmar el término de ejecutoria y
sustentación de la apelación laboral contra la norma procesal vigente;
confirmar si la parte motiva de la sentencia menciona o no el otrosí (texto
literal); localizar el radicado exacto de cualquier jurisprudencia de la
Sala Laboral sobre error de hecho por prueba documental no valorada antes de
citarla; correr `verificacion-citas-co` sobre cualquier cita que se agregue
al texto final.

**nivel_de_confianza**: Medio — el error atacado y la prueba que lo sustenta
están confirmados por el usuario, pero la oportunidad del recurso y el texto
literal de la parte motiva siguen sin verificar.

## Cierre — límite de esta skill

Este Skill produce el análisis previo y el borrador del recurso, no el
recurso listo para presentar. Nunca decide por sí solo la procedencia final
de un recurso, ni lo presenta ante la autoridad competente. Todo borrador
producido aquí pasa por el gate de `protocolo-control-antialucinacion-co`
(en particular la Fase 7 de procedibilidad y la Fase 9 adversarial) y por la
revisión y firma del abogado responsable del caso antes de radicarse.
