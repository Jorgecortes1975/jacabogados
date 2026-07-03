---
name: derecho-peticion-co
description: Genera el borrador estructurado de un derecho de petición colombiano (Art. 23 de la Constitución Política y Ley 1755 de 2015, que regula el derecho de petición dentro del CPACA, artículos 13 a 33) ante entidades públicas, particulares que cumplen función pública o particulares sin función pública especial, incluyendo la insistencia por falta de respuesta o respuesta evasiva. Úsala cuando el usuario pida redactar un derecho de petición de información, documentos, consulta, queja, reclamo o petición entre particulares, o preparar la insistencia porque venció el plazo de respuesta o la respuesta recibida fue evasiva o incompleta.
---

# Derecho de petición (Colombia)

## Regla de veracidad obligatoria (no negociable)

Este Skill nunca inventa hechos, y nunca inventa el destinatario de la
petición ni su competencia si el usuario no los suministró: si falta ese
dato, se marca `[DATO NO SUMINISTRADO]` y se pregunta antes de continuar. No
se asume que una entidad es competente para resolver la petición solo porque
"suena razonable" — la competencia se confirma con el usuario o se deja
marcada como pendiente.

Los plazos de respuesta de la Ley 1755 de 2015 **varían según el tipo de
petición** — no es el mismo término para una petición de información o
documentos, una consulta, una queja o reclamo, o una petición dirigida a un
particular. Este Skill nunca asume un plazo único "por defecto". Todo plazo
específico en días que el borrador mencione debe marcarse
`[REFERENCIA NO VERIFICADA]` a menos que se haya confirmado en esta sesión
contra el texto vigente de la Ley 1755 de 2015 (y sus eventuales
modificaciones posteriores) en una fuente oficial — nunca se completa desde
memoria del modelo, porque el texto puede haber sido modificado después de
la fecha de corte o mediante normativa de emergencia posterior. Lo mismo
aplica a cualquier cita puntual del articulado del Art. 23 constitucional o
de los artículos 13 a 33 del CPACA: si no se verifica en esta sesión, se
marca y se remite a `verificacion-citas-co`.

Tampoco se inventan pruebas, fechas de radicación anteriores, números de
radicado, ni el contenido de una respuesta previa de la entidad si el
usuario no la aportó textualmente.

## Cuándo usar esta skill

Cuando el abogado o el cliente necesitan un primer borrador de un derecho de
petición (Art. 23 de la Constitución Política; Ley 1755 de 2015, que
sustituyó el título II de la Parte Primera del CPACA, artículos 13 a 33)
dirigido a:
- una entidad pública,
- un particular que cumple una función o presta un servicio público, o
- un particular sin función pública especial (petición entre particulares).

Cubre peticiones de información, de copia de documentos o actos
administrativos, consultas, quejas, reclamos, y la **insistencia** cuando ya
existió una petición anterior sin respuesta dentro del término o con una
respuesta evasiva, incompleta o que no resuelve de fondo.

## Proceso operativo

1. **Identificar tipo de petición, destinatario y plazo aplicable.**
   Clasificar la petición en uno de: información/documentos, consulta,
   queja/reclamo, o petición ante particular. Confirmar el destinatario
   exacto y su competencia — si no fue suministrado, usar
   `[DATO NO SUMINISTRADO]`. Calcular el plazo de respuesta que
   correspondería según esa clasificación, marcándolo
   `[REFERENCIA NO VERIFICADA]` si no se confirma contra el texto vigente de
   la Ley 1755 de 2015 en esta sesión.

2. **Aplicar el contrato de salida estructurada para el análisis previo.**
   Antes de redactar el texto final, producir internamente (y mostrar al
   usuario si lo pide) un análisis con estos campos: `hechos_confirmados`,
   `hechos_no_confirmados`, `problema_juridico`, `fuentes_y_soportes`,
   `analisis`, `riesgos`, `texto_final`, `validaciones_pendientes`,
   `nivel_de_confianza`. Este contrato no reemplaza el texto final del
   derecho de petición; lo precede y lo sustenta.

3. **Verificar el checklist mínimo de la Fase 2 del protocolo** (ver
   `protocolo-control-antialucinacion-co`, `references/fase1-2-triage-y-clasificacion.md`,
   apartado "Derecho de petición"): peticionario, destinatario, hechos,
   solicitudes concretas y numeradas, fundamento constitucional (Art. 23) y
   legal (Ley 1755 de 2015), pruebas si aplica, medio de notificación, y
   petición expresa de respuesta de fondo. Si falta cualquiera de estos
   elementos, el borrador no se da por completo — se marca el vacío.

4. **Redactar el texto final** con la estructura estándar: (i) encabezado
   con destinatario y ciudad/fecha, (ii) identificación del peticionario y
   medio de notificación, (iii) hechos en orden cronológico, (iv)
   fundamento constitucional y legal, (v) solicitudes/peticiones concretas
   y numeradas, (vi) pruebas o anexos si aplica, (vii) petición expresa de
   respuesta de fondo dentro del término legal, (viii) firma.

5. **Si se trata de una insistencia** por falta de respuesta o respuesta
   evasiva, adaptar la estructura anterior para: citar expresamente la
   petición original (fecha de radicación, número de radicado si existe,
   destinatario), señalar el vencimiento del plazo legal aplicable o la
   insuficiencia de la respuesta recibida (transcribiendo o describiendo
   solo lo que el usuario efectivamente aportó, nunca inventando el
   contenido de esa respuesta), y reiterar las solicitudes originales de
   forma numerada, sin diluirlas.

6. **Remitir al gate final.** Antes de radicar o enviar el derecho de
   petición, correr `protocolo-control-antialucinacion-co` como control de
   calidad final (Fase 2, ruta "Derecho de petición", más el resto de fases
   aplicables) y, si el borrador cita artículos puntuales de la Ley 1755 de
   2015 o del Art. 23 constitucional que no se verificaron en el paso 1,
   correr también `verificacion-citas-co` sobre esas citas puntuales antes
   de completar el documento.

## Reglas de formato

- Las solicitudes van siempre numeradas (PRIMERO, SEGUNDO, TERCERO...) y
  cada una pide una sola cosa concreta y verificable — nunca una solicitud
  compuesta o ambigua tipo "que se resuelva lo pertinente".
- Lenguaje claro y directo: oraciones cortas, sin fórmulas de cortesía
  excesivas que diluyan la solicitud.
- Evitar redacción genérica: cada hecho y cada solicitud deben anclarse a
  los datos concretos del caso aportados por el usuario, nunca a una
  plantilla de relleno.

## Mini-ejemplo completo (hechos ficticios)

**Hechos aportados por el usuario**: la peticionaria, "Constructora Andina
Ltda." (nombre ficticio), radicó ante la Secretaría de Planeación del
municipio ficticio de "San Rafael de Oriente" una solicitud de licencia de
construcción hace tres meses. Necesita ahora copia del acto administrativo
que resolvió (o del estado actual) ese trámite para presentarlo ante su
entidad financiera. No ha recibido respuesta alguna sobre el estado del
trámite pese a haber llamado telefónicamente dos veces.

**Salida estructurada (contrato previo aplicado)**

```
hechos_confirmados:
  - La Constructora Andina Ltda. radicó solicitud de licencia de
    construcción ante la Secretaría de Planeación de San Rafael de Oriente
    hace aproximadamente 3 meses.
  - No existe respuesta escrita conocida sobre el estado del trámite.
  - Hubo dos llamadas telefónicas de seguimiento sin resultado formal.

hechos_no_confirmados:
  - Número de radicado exacto de la solicitud original: [DATO NO SUMINISTRADO]
  - Fecha exacta de radicación (día preciso, no solo "hace 3 meses"): [DATO NO SUMINISTRADO]
  - Si la Secretaría es efectivamente la autoridad competente para expedir
    o negar la licencia (se asume por el hecho narrado, no se verificó el
    manual de funciones de la entidad): [DATO NO SUMINISTRADO]

problema_juridico:
  Determinar si procede un derecho de petición de información/documentos
  para obtener copia del acto administrativo que resolvió (o constancia del
  estado de) la solicitud de licencia de construcción radicada ante la
  Secretaría de Planeación de San Rafael de Oriente.

fuentes_y_soportes:
  - Constitución Política, Art. 23 (derecho de petición) — cita general
    aceptada por notoriedad; no requiere verificación puntual adicional.
  - Ley 1755 de 2015 (CPACA, arts. 13 a 33) como marco legal del derecho de
    petición — el plazo específico aplicable a peticiones de información o
    documentos se marca `[REFERENCIA NO VERIFICADA]` hasta confirmarse
    contra el texto vigente en esta sesión.
  - Constancia de radicación de la solicitud original: `[DATO NO SUMINISTRADO]`
    (el usuario debe aportar el comprobante o el número de radicado).

analisis:
  Los hechos confirmados permiten fundamentar una petición de información
  para obtener copia del estado del trámite y del acto administrativo, si
  existe. La ausencia del número de radicado y de la fecha exacta no impide
  redactar el borrador, pero sí impide afirmar con precisión el vencimiento
  de un plazo legal — ese cálculo queda `[CONCLUSIÓN CONDICIONADA A SOPORTE
  PROBATORIO]` hasta que el usuario aporte la constancia de radicación.

riesgos:
  - Si la Secretaría de Planeación no es la autoridad competente (p. ej. el
    trámite fue reasignado a Curaduría Urbana u otra dependencia), la
    petición podría dirigirse a la entidad equivocada — riesgo mitigado
    pidiendo al usuario confirmar competencia antes de radicar.
  - Sin el número de radicado, la entidad podría alegar que no ubica el
    expediente — se recomienda anexar cualquier soporte de las llamadas
    telefónicas previas si existe.

texto_final: |
  Ver borrador completo más abajo.

validaciones_pendientes:
  - Confirmar el plazo de respuesta aplicable a peticiones de información
    contra el texto vigente de la Ley 1755 de 2015 (verificacion-citas-co).
  - Obtener del usuario el número de radicado y la fecha exacta de la
    solicitud original.
  - Confirmar competencia de la Secretaría de Planeación frente al trámite.

nivel_de_confianza: Medio — el fundamento constitucional y legal general es
  sólido; el vacío está en los datos identificadores del trámite original y
  en el plazo exacto, ambos pendientes de verificación.
```

**Fragmento del borrador que produciría esta skill:**

> Señores
> **SECRETARÍA DE PLANEACIÓN — MUNICIPIO DE SAN RAFAEL DE ORIENTE**
> Referencia: derecho de petición de información — estado y copia del acto
> administrativo del trámite de licencia de construcción radicado por
> Constructora Andina Ltda.
>
> **Hechos**
> 1. Constructora Andina Ltda., a través de su representante legal, radicó
> ante esta Secretaría una solicitud de licencia de construcción
> aproximadamente hace tres meses. Fecha exacta y número de radicado:
> `[DATO NO SUMINISTRADO]` — se anexará constancia de radicación tan pronto
> el peticionario la ubique.
> 2. A la fecha no se ha recibido respuesta escrita sobre el estado de dicho
> trámite.
> 3. El peticionario ha realizado dos llamadas telefónicas de seguimiento
> sin obtener información formal sobre el estado del expediente.
>
> **Fundamento constitucional y legal**: se invoca el derecho de petición
> consagrado en el artículo 23 de la Constitución Política, en concordancia
> con la Ley 1755 de 2015. El plazo de respuesta que corresponde a esta
> petición, por tratarse de una solicitud de información/documentos,
> `[REFERENCIA NO VERIFICADA — confirmar término específico contra el texto
> vigente de la Ley 1755 de 2015 antes de radicar]`.
>
> **Solicitudes**
> PRIMERO. Informar el estado actual del trámite de licencia de
> construcción radicado por Constructora Andina Ltda.
> SEGUNDO. Expedir copia íntegra del acto administrativo que haya resuelto
> dicho trámite, si ya fue proferido.
> TERCERO. En caso de no haberse resuelto aún, indicar la fecha estimada de
> resolución conforme al término legal aplicable.
>
> **Notificaciones**: el peticionario recibirá respuesta en
> `[DATO NO SUMINISTRADO — correo físico o electrónico de notificación]`.
>
> Se solicita respuesta de fondo dentro del término legal.

Nótese que el borrador deja abiertos, con sus marcadores literales, el
número de radicado, la fecha exacta, el medio de notificación y el plazo de
respuesta específico — ninguno se completó por conveniencia narrativa.

## Cierre — límite de esta skill

Este Skill produce un borrador de trabajo, no un derecho de petición listo
para radicar. Nunca envía ni radica la petición por sí sola ante la entidad
o el particular destinatario, y nunca decide si hubo o no vulneración del
derecho de petición por falta de respuesta o por respuesta evasiva — esa
calificación requiere el análisis completo de procedibilidad y, si procede,
la vía de tutela, que corresponde al abogado responsable del caso. Antes de
radicar o enviar cualquier borrador producido aquí, debe pasar por el gate
de `protocolo-control-antialucinacion-co` y por la revisión humana del
abogado con matrícula vigente.
