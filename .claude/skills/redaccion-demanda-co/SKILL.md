---
name: redaccion-demanda-co
description: >
  Genera el borrador estructurado de una demanda judicial colombiana en las
  principales áreas del derecho — civil, laboral, comercial/mercantil y
  administrativo — con un análisis previo de hechos y soporte probatorio, la
  estructura formal completa (encabezado, hechos numerados, fundamentos de
  derecho, pretensiones, pruebas, anexos, notificaciones) y remisión
  obligatoria al gate de control final del despacho antes de radicar. Úsala
  cuando el usuario pida redactar una demanda civil (incumplimiento
  contractual, responsabilidad civil, proceso ejecutivo o declarativo), una
  demanda laboral (despido sin justa causa, acreencias laborales, fuero de
  estabilidad), una demanda comercial o mercantil (conflicto societario,
  incumplimiento de contrato mercantil), o una demanda administrativa
  (nulidad y restablecimiento del derecho, reparación directa, controversias
  contractuales con el Estado) a partir de los hechos del caso.
---

# Redacción de demanda (Colombia)

Este Skill produce el primer borrador de trabajo de una demanda judicial
colombiana, en cualquiera de las cuatro grandes áreas del derecho que litiga
el despacho (civil, laboral, comercial/mercantil, administrativo). No
reemplaza `protocolo-control-antialucinacion-co`: ese protocolo es el gate
final obligatorio de 12 fases que decide si el borrador puede radicarse; esta
skill se ocupa exclusivamente de la etapa de **redacción** — construir el
borrador con la estructura y el rigor fáctico/probatorio que ese gate
después audita.

## Cuándo usar esta skill

Cuando el abogado necesita un primer borrador de demanda a partir de los
hechos, pretensiones y pruebas de un caso, en materia civil (incumplimiento
contractual, responsabilidad civil contractual o extracontractual, procesos
ejecutivos o declarativos bajo el Código General del Proceso), laboral
(despido sin justa causa, acreencias laborales, fuero de estabilidad,
recargos y horas extra), comercial/mercantil (conflictos societarios,
incumplimiento de contratos mercantiles) o administrativa (nulidad y
restablecimiento del derecho, reparación directa, controversias
contractuales estatales bajo el CPACA). No se usa para tutelas (existe
`redaccion-tutela-co` para ese caso, con su propio estándar de procedibilidad
y términos).

## Regla de veracidad obligatoria (no negociable)

Esta skill hereda sin excepción las reglas de tolerancia cero de `CLAUDE.md`
y de `protocolo-control-antialucinacion-co`:

- **Nunca inventar** hechos, pruebas, cuantías, fechas, normas, sentencias,
  radicados o autoridades. Un borrador con huecos marcados es aceptable; un
  borrador con datos fabricados no lo es, bajo ninguna circunstancia,
  incluida la urgencia expresada por el usuario.
- **Marcadores obligatorios**, literales, tal como están definidos en
  `CLAUDE.md` — no se parafrasean ni se sustituyen por variantes propias:
  - `[DATO NO SUMINISTRADO]` — falta un hecho o dato crítico para completar
    el hecho, la cuantía o el fundamento correspondiente.
  - `[REFERENCIA NO VERIFICADA]` — un artículo, código o norma procesal
    específica no puede confirmarse en fuente oficial dentro de esta sesión
    (aplica en particular a los artículos puntuales del CGP, el CPTSS o el
    CPACA que se citen en Fundamentos de derecho).
  - `[CONCLUSIÓN CONDICIONADA A SOPORTE PROBATORIO]` — una pretensión o una
    afirmación depende de una prueba que todavía no existe en el expediente
    o está pendiente de recaudo.
  - `[Reformación pendiente]` — existe riesgo de que la norma, el
    precedente o la regla procesal invocada haya sido modificada después de
    la fecha de corte del modelo (frecuente en reformas laborales, cambios
    del CPTSS o virajes jurisprudenciales recientes).
- **Nunca cerrar una pretensión sin soporte fáctico y probatorio.** Si el
  soporte no está completo, la pretensión se redacta igual (el cliente
  necesita ver la pieza completa) pero queda marcada
  `[CONCLUSIÓN CONDICIONADA A SOPORTE PROBATORIO]` en el análisis previo y
  no se presenta como hecho cierto en el texto final.
- **Toda cita jurisprudencial** debe poder identificar corporación, sala,
  número de sentencia o radicado, fecha, tema y ratio decidendi (el control
  de 11 puntos de la Fase 6 del protocolo). Si falta cualquiera de esos
  datos, la cita se marca `[No verificado]` y no se usa como soporte de una
  pretensión — se remite a `verificacion-citas-co` antes de radicar.
- Separar siempre, en el análisis previo: lo **probado**, lo **afirmado sin
  prueba suficiente**, lo **inferido** y lo **no verificado**. Nunca se
  presenta una hipótesis como certeza en el texto final de la demanda.

## Proceso operativo

1. **Identificar el área del derecho y la jurisdicción/competencia
   aplicable.** Antes de redactar una sola línea, confirmar en qué
   jurisdicción se tramita el asunto y qué código procesal gobierna:
   - **Civil y comercial/mercantil** → Código General del Proceso (Ley 1564
     de 2012).
   - **Laboral** → Código Procesal del Trabajo y de la Seguridad Social
     (CPTSS).
   - **Administrativo** → Código de Procedimiento Administrativo y de lo
     Contencioso Administrativo (CPACA, Ley 1437 de 2011).
   Marca `[REFERENCIA NO VERIFICADA]` cualquier número de artículo específico
   de estos códigos que no puedas confirmar contra fuente oficial en esta
   sesión — no lo completes desde memoria paramétrica. Confirma también
   competencia por cuantía, por factor territorial y por factor funcional
   (juez, tribunal, sección) antes de continuar.

2. **Aplicar el contrato de salida estructurada al análisis previo.** Antes
   del texto final de la demanda, produce siempre este análisis en 9 campos
   — es la base que Fase 3 a 9 del protocolo final va a auditar, así que
   debe quedar explícito y no implícito en la redacción:
   - `hechos_confirmados` — hechos que cuentan con soporte documental o
     testimonial ya aportado por el usuario.
   - `hechos_no_confirmados` — hechos afirmados por el cliente que aún no
     tienen soporte, marcados `[DATO NO SUMINISTRADO]` o
     `[CONCLUSIÓN CONDICIONADA A SOPORTE PROBATORIO]` según corresponda.
   - `problema_juridico` — la pregunta jurídica concreta que la demanda debe
     resolver, en una o dos frases.
   - `fuentes_y_soportes` — normas, jurisprudencia y pruebas documentales
     invocables, cada una con su estado de verificación.
   - `analisis` — subsunción de los hechos confirmados en la norma aplicable,
     distinguiendo lo probado de lo inferido.
   - `riesgos` — vectores de ataque previsibles de la contraparte (anticipo
     de la Fase 9 del protocolo) y vacíos procesales o probatorios propios.
   - `texto_final` — el borrador de la demanda en sí, con la estructura del
     paso 4.
   - `validaciones_pendientes` — lista concreta de lo que falta verificar
     antes de radicar (citas sin confirmar, pruebas por recaudar, poder por
     firmar).
   - `nivel_de_confianza` — Alto/Medio/Bajo, coherente con el semáforo que
     luego aplicará `protocolo-control-antialucinacion-co` (nunca "Alto" si
     hay un hecho esencial marcado `[DATO NO SUMINISTRADO]`).

3. **Verificar los requisitos formales mínimos según el área.** Antes de
   redactar el texto final, confirma que estén cubiertos: identificación
   completa de las partes (demandante, demandado, apoderado), hechos
   numerados, pretensiones, fundamentos de derecho, cuantía (si el proceso lo
   exige por competencia), pruebas solicitadas y aportadas, anexos, y
   competencia del despacho judicial. Cualquier requisito que no puedas
   confirmar con la información disponible se marca `[DATO NO SUMINISTRADO]`
   en el análisis previo — no se asume ni se completa por defecto.

4. **Redactar el texto final de la demanda** con la estructura estándar, en
   este orden: (1) Encabezado (juez competente, partes, apoderado), (2)
   Hechos numerados en orden cronológico, (3) Fundamentos de derecho, (4)
   Pretensiones, (5) Pruebas, (6) Anexos, (7) Notificaciones. Ninguna sección
   se omite aunque esté incompleta — se entrega con las marcas de
   incertidumbre visibles en vez de omitir la sección.

5. **Remitir explícitamente a `protocolo-control-antialucinacion-co` como
   gate final obligatorio antes de radicar.** Esta skill nunca se considera
   "lista para radicar" por sí sola. Todo borrador producido aquí debe pasar
   las 12 fases de ese protocolo (triage, motor de hechos, motor probatorio
   de 14 criterios, control jurisprudencial de 11 puntos, control de
   procedibilidad de 20 puntos, control argumentativo y adversarial, control
   de redacción, semáforo final) antes de que el abogado responsable decida
   radicarlo. Si el borrador cita normas o jurisprudencia puntual, recuerda
   además correr `verificacion-citas-co` sobre esas citas específicas.

## Reglas de formato

- Hechos siempre numerados de forma consecutiva (1, 2, 3…), un hecho por
  párrafo, un hecho una idea — nunca varios hechos distintos en el mismo
  numeral.
- Lenguaje claro y directo: oraciones cortas, voz activa, sin relleno
  retórico ni frases genéricas ("es evidente que", "sin lugar a dudas") que
  no aporten sustento jurídico — coherente con el control de redacción
  (Fase 10 del protocolo) que evalúa exactamente esto.
- Evitar redacción detectable como generada por IA: sin fórmulas repetidas
  entre secciones, sin enumeraciones vacías de contenido, sin conclusiones
  que no se deriven de un hecho probado y una norma citada. Cada afirmación
  jurídica debe conectar hecho → prueba → norma → consecuencia; si esa
  cadena no se puede completar, la afirmación se recorta o se marca con el
  marcador de incertidumbre correspondiente en vez de suavizarla con
  lenguaje ambiguo.
- Pretensiones redactadas siempre como órdenes judiciales ejecutables
  ("Declárese...", "Condénese a..."), nunca en términos genéricos o
  aspiracionales.

## Mini-ejemplo (demanda laboral ficticia, hechos anonimizados)

**Caso**: despido sin justa causa de un trabajador con recargo de horas
extra no pagadas. Empresa ficticia "Textiles del Norte S.A.S.", trabajador
ficticio "JP".

**Análisis previo — contrato de salida estructurada:**

- **hechos_confirmados**: JP laboró para Textiles del Norte S.A.S. entre el
  3 de febrero de 2023 y el 15 de mayo de 2026, con contrato a término
  indefinido (soporte: contrato de trabajo aportado por el cliente). El
  último salario base certificado fue de $2.100.000 mensuales (soporte:
  desprendibles de pago de los últimos 6 meses aportados).
- **hechos_no_confirmados**: el cliente afirma haber trabajado
  habitualmente de 6:00 p.m. a 10:00 p.m. de lunes a viernes durante los
  últimos 8 meses, pero no ha aportado registro de control de horario ni
  testimonios que lo acrediten — `[DATO NO SUMINISTRADO: soporte documental
  o testimonial de la jornada extra alegada]`. La afirmación de que el
  despido fue represalia por reclamar el pago de esas horas extra es
  `[CONCLUSIÓN CONDICIONADA A SOPORTE PROBATORIO]` mientras no se acredite
  la reclamación previa y su cercanía temporal con el despido.
- **problema_juridico**: si la terminación del contrato de JP, ocurrida sin
  invocación de causal alguna por parte del empleador, da lugar a
  indemnización por despido sin justa causa, y si procede además el pago de
  recargo por horas extra no remuneradas durante el periodo alegado.
- **fuentes_y_soportes**: Código Sustantivo del Trabajo, normas sobre
  terminación del contrato sin justa causa y sobre recargo por trabajo
  suplementario — `[REFERENCIA NO VERIFICADA: número exacto de artículo del
  CST aplicable a indemnización por despido injusto y a recargo nocturno/
  extra, pendiente de confirmar contra fuente oficial]`. No se invoca
  jurisprudencia puntual en este borrador porque ninguna fue cargada ni
  verificada en esta sesión.
- **analisis**: el contrato a término indefinido y la fecha de terminación
  están probados; la ausencia de invocación de justa causa por el empleador
  también está confirmada por la carta de terminación aportada. La
  procedencia de la indemnización por despido sin justa causa se apoya en
  hechos probados. La procedencia del recargo por horas extra queda
  condicionada al soporte documental o testimonial pendiente — no puede
  presentarse como hecho cierto todavía.
- **riesgos**: la contraparte previsiblemente negará la jornada extra
  alegada por falta de registro de control de horario — vector de ataque
  directo sobre el hecho no confirmado. También podría alegar una causal de
  terminación no documentada en la carta de despido; se debe verificar que
  el expediente no contenga comunicación previa de la empresa citando causal
  alguna.
- **texto_final**: ver fragmento redactado abajo.
- **validaciones_pendientes**: (1) conseguir soporte de la jornada extra
  alegada (testimonios de compañeros, registros de acceso, mensajería
  interna); (2) confirmar el artículo exacto del CST sobre indemnización y
  recargo contra fuente oficial (`verificacion-citas-co`); (3) correr
  `protocolo-control-antialucinacion-co` completo antes de radicar.
- **nivel_de_confianza**: Medio — la pretensión de indemnización por despido
  sin justa causa tiene soporte fáctico sólido; la pretensión de recargo por
  horas extra depende de un hecho todavía no probado.

**Fragmento del texto final que produciría esta skill:**

> **HECHOS**
>
> 1. El demandante JP laboró para la demandada Textiles del Norte S.A.S.
>    desde el 3 de febrero de 2023 hasta el 15 de mayo de 2026, mediante
>    contrato de trabajo a término indefinido.
> 2. El último salario base mensual certificado del demandante fue de
>    $2.100.000, según los desprendibles de pago correspondientes a los
>    últimos seis (6) meses de la relación laboral.
> 3. La demandada terminó el contrato de trabajo del demandante el 15 de
>    mayo de 2026 mediante comunicación escrita que no invoca causal alguna
>    de las previstas para la terminación con justa causa.
> 4. El demandante afirma haber laborado habitualmente de 6:00 p.m. a 10:00
>    p.m. de lunes a viernes durante los ocho (8) meses anteriores a la
>    terminación del contrato, sin que a la fecha exista soporte documental
>    o testimonial que acredite esta jornada `[DATO NO SUMINISTRADO: soporte
>    de la jornada extra alegada]`.
>
> **PRETENSIONES**
>
> PRIMERO. Declárese que la terminación del contrato de trabajo del
> demandante JP, ocurrida el 15 de mayo de 2026, se produjo sin justa causa.
>
> SEGUNDO. Condénese a Textiles del Norte S.A.S. a pagar al demandante la
> indemnización por despido sin justa causa que corresponda conforme al
> tiempo de servicio y al salario probado.
>
> TERCERO. Condénese a Textiles del Norte S.A.S. a pagar el recargo por
> trabajo suplementario causado durante la relación laboral
> `[CONCLUSIÓN CONDICIONADA A SOPORTE PROBATORIO: pendiente de acreditar la
> jornada extra alegada en el hecho 4]`.

Nótese que el hecho 4 y la pretensión tercera quedan marcados en vez de
presentarse como ciertos: el usuario no aportó soporte de la jornada extra,
así que la skill no completa ese vacío con un supuesto razonable ni lo
oculta — lo deja visible para que el abogado decida si se recauda la prueba
antes de radicar o se radica con esa reserva expresa.

## Cierre — límite de esta skill

Esta skill produce un borrador de trabajo con su análisis previo, no una
demanda lista para radicar. Nunca decide por sí sola la viabilidad procesal
de las pretensiones, ni presenta el borrador ante el juzgado, tribunal o
autoridad competente. Antes de radicar, el borrador debe pasar
obligatoriamente el gate de `protocolo-control-antialucinacion-co` (triage,
motor de hechos, motor probatorio, motores normativo y jurisprudencial,
control de procedibilidad, control argumentativo y adversarial, control de
redacción, semáforo final) y la revisión sustantiva del abogado responsable
del caso — solo esa combinación autoriza la radicación.
