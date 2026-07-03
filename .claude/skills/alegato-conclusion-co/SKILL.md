---
name: alegato-conclusion-co
description: Redacta el borrador de un alegato de conclusión (alegato de cierre, alegato de bien probado) para un proceso judicial colombiano, aplicando a cada argumento la fórmula de 9 pasos y el control adversarial del protocolo maestro del despacho antes de la petición final al juez. Úsala cuando el usuario pida redactar un alegato de conclusión, un alegato de cierre, un alegato de bien probado, o el escrito final de parte en un proceso civil, laboral, de familia o contencioso administrativo — siempre en la etapa procesal posterior a la práctica de pruebas y anterior al fallo, nunca antes de que las pruebas decretadas hayan sido efectivamente practicadas.
---

# Redacción de alegato de conclusión (Colombia)

## Cuándo usar esta skill

Cuando el abogado necesita el borrador de un alegato de conclusión (también
llamado alegato de cierre o alegato de bien probado, según la jurisdicción y
el tipo de proceso) para un proceso civil, laboral, de familia o contencioso
administrativo colombiano. El momento procesal es específico y no negociable:
**después de que las pruebas decretadas fueron efectivamente practicadas**
(no basta con que hayan sido pedidas o decretadas) **y antes de que el juez
profiera sentencia** — típicamente al cierre de la audiencia de trámite y
juzgamiento, o dentro del término que el juez conceda para alegar de
conclusión por escrito. Si las pruebas aún no se practicaron, esta skill no
debe usarse todavía: no hay todavía un "hecho probado" del cual partir.

## Regla de veracidad obligatoria (no negociable)

Un alegato de conclusión existe para persuadir al juez con lo que **quedó
probado en el proceso**, no con lo que la parte querría que estuviera
probado. Por eso esta skill aplica, sin excepción, dos reglas:

**1. "Hecho probado" es una etiqueta técnica, no retórica.** Esta skill nunca
presenta como "hecho probado" algo que no tenga soporte en una prueba
efectivamente practicada dentro del expediente. Todo hecho relevante del
proceso se clasifica primero según las 7 categorías del motor de hechos de la
Fase 3 de `protocolo-control-antialucinacion-co` (probado, afirmado, inferido,
controvertido, perjudicial, por probar, irrelevante) — ver
`references/fase3-6-hechos-pruebas-normas-jurisprudencia.md` de esa skill.
Solo lo clasificado como **probado** puede llamarse "hecho probado" en el
texto del alegato. Lo **afirmado** sin prueba practicada que lo respalde se
presenta como afirmación de parte, nunca como hecho. Lo **inferido** se
presenta como inferencia razonable a partir de hechos probados, nunca como
certeza. Si una conclusión jurídica depende de un hecho que quedó en
categoría "por probar" y no se logró acreditar, el alegato no puede cerrar
esa pretensión como si estuviera resuelta: debe usar el marcador
`[CONCLUSIÓN CONDICIONADA A SOPORTE PROBATORIO]`. Si falta un dato del
expediente indispensable para completar el análisis (por ejemplo, qué
pruebas fueron realmente practicadas en una audiencia), se marca
`[DATO NO SUMINISTRADO]` y se pide antes de continuar — nunca se asume.

**2. Un alegato que no anticipa el argumento más fuerte de la contraparte es
un alegato débil, no uno prudente.** Omitir el control adversarial no es una
forma de "no darle ideas al otro lado" — el otro lado ya tiene esas ideas,
o las tendrá en su propio alegato o en el recurso. Un alegato que ignora la
objeción más obvia le regala al juez la sensación de que esa objeción no
tiene respuesta. Por eso el control adversarial de la Fase 9 del protocolo
(ver más abajo) no es opcional ni se relega a una nota interna: su respuesta
se redacta **dentro del cuerpo del alegato**, como parte de la argumentación
que el juez va a leer.

Toda cita normativa o jurisprudencial sin los datos completos de
identificación (corporación, sala, número/radicado, fecha) se marca
`[REFERENCIA NO VERIFICADA]` y se remite a `verificacion-citas-co` antes de
completarla — nunca se rellena desde memoria del modelo. Ante una reforma
reciente (laboral, procesal, de familia) o un viraje de línea jurisprudencial
que pueda haber ocurrido después de la fecha de corte del modelo, se usa
`[Reformación pendiente]`.

## Proceso operativo

1. **Reconstruir las pruebas efectivamente practicadas.** Pide al usuario
   (o extrae del acta de audiencia y del expediente cargado) el listado de
   pruebas que fueron **practicadas**, no las que fueron simplemente pedidas
   o decretadas — un dictamen decretado y no rendido, o un testigo citado y
   no interrogado, no cuenta como prueba practicada. Con ese listado,
   clasifica cada hecho relevante del proceso según las 7 categorías del
   motor de hechos de la Fase 3 del protocolo maestro (probado, afirmado,
   inferido, controvertido, perjudicial, por probar, irrelevante). Ningún
   hecho relevante queda sin categoría. Este paso es la base de todo lo
   demás: un argumento no puede construirse sobre un hecho que no pasó por
   esta clasificación.

2. **Aplicar la fórmula de 9 pasos de la Fase 8 a cada argumento del
   alegato.** Para cada tesis que el alegato vaya a sostener, completar en
   orden los 9 pasos definidos en `references/fase7-9-procedibilidad-argumentacion-adversarial.md`
   de `protocolo-control-antialucinacion-co`:
   1. Afirmación jurídica (qué se sostiene).
   2. Hecho probado que la soporta (del listado del paso 1, categoría
      "probado" — nunca "afirmado" ni "inferido").
   3. Prueba que acredita ese hecho (la prueba practicada concreta:
      testimonio de quién, documento cuál, folio cuál).
   4. Norma aplicable.
   5. Regla jurisprudencial pertinente.
   6. Subsunción: cómo se conecta el hecho probado con la norma y la regla
      jurisprudencial.
   7. Conclusión jurídica.
   8. Riesgo de ataque de la contraparte.
   9. Respuesta al ataque.
   Un argumento que no complete los 9 pasos no entra al alegato tal como
   está: se completa la información faltante o se elimina. No se disfraza
   un hueco (por ejemplo, la ausencia del paso 2 o 3) con lenguaje enfático
   o retórico — la fuerza de un alegato de conclusión está en la cadena
   hecho-prueba-norma-consecuencia, no en el tono.

3. **Ejecutar el control adversarial de la Fase 9 y redactarlo dentro del
   alegato.** Para el conjunto del alegato (no solo argumento por
   argumento), identifica los vectores de ataque más probables de la
   contraparte siguiendo la Fase 9 del protocolo: qué hecho atacará, qué
   prueba objetará, qué norma reinterpretará, qué precedente usará a su
   favor, qué hecho negará o calificará distinto, qué vacío probatorio
   explotará, qué excepción propondrá, qué nulidad alegará, qué argumento
   propio debilitará, qué pretensión intentará reducir o enervar. Por cada
   vector identificado, redacta dentro del texto del alegato: (i) la
   respuesta jurídica sustantiva, (ii) el refuerzo probatorio disponible que
   cierra el vacío que la contraparte explotaría, y (iii) si el texto actual
   facilita el ataque, el ajuste de redacción correspondiente. Esta
   refutación anticipada no va en un anexo aparte ni en una nota para uso
   interno del abogado: va en la sección de refutación del propio alegato,
   como argumento dirigido al juez.

4. **Redactar el texto final del alegato con esta estructura estándar**:
   (a) hechos probados (solo categoría "probado", con remisión al folio o
   medio de prueba), (b) análisis probatorio (por qué esas pruebas
   practicadas acreditan esos hechos y no otra cosa), (c) fundamentos de
   derecho aplicados mediante subsunción (el resultado del paso 2, argumento
   por argumento), (d) refutación anticipada de la tesis contraria (el
   resultado del paso 3), (e) petición concreta al juez (pretensión
   ejecutable, coherente con los hechos y fundamentos ya expuestos — nunca
   una petición más amplia de lo que la prueba practicada permite sostener).

5. **Remitir a `protocolo-control-antialucinacion-co` como gate final antes
   de presentar el alegato.** Esta skill produce el borrador; no lo
   certifica. Antes de que el alegato salga del despacho, debe pasar por las
   12 fases del protocolo maestro (en particular la Fase 7 de
   procedibilidad, que verifica congruencia entre hechos, fundamentos y
   pretensiones, y el semáforo final de la Fase 11) y, si contiene citas
   normativas o jurisprudenciales puntuales que quedaron marcadas
   `[REFERENCIA NO VERIFICADA]`, por `verificacion-citas-co` para cerrarlas
   antes de radicar.

## Reglas de formato

- Cada argumento del alegato debe completar los 9 pasos de la Fase 8 o se
  corrige/elimina antes de entregarse — no hay término medio.
- Ningún párrafo usa retórica, adjetivación o énfasis tipográfico para
  compensar la ausencia de un hecho probado, una prueba practicada o una
  norma aplicable. Si el argumento no tiene esos tres elementos, no se
  redacta ese argumento.
- La sección de refutación anticipada de la tesis contraria es obligatoria;
  un borrador sin esa sección no está completo, sin importar cuán sólida
  parezca la sección de fundamentos.
- Toda petición al juez debe ser ejecutable y proporcional a lo que los
  hechos probados y las pruebas practicadas permiten sostener — no se pide
  más de lo acreditado "por si acaso".

## Mini-ejemplo (alegato de conclusión en proceso laboral, hechos ficticios)

**Contexto ficticio**: proceso ordinario laboral de primera instancia.
Demandante, "MM" (identidad real conocida solo por el abogado, no incluida en
el borrador de trabajo), pretende la declaración de existencia de un contrato
de trabajo (no un contrato de prestación de servicios como lo calificó la
demandada) y el pago de prestaciones sociales correspondientes. En la
audiencia de trámite y juzgamiento se practicaron: (i) interrogatorio de
parte al representante legal de la demandada, (ii) tres testimonios de
excompañeros de trabajo, (iii) documentales: correos con instrucciones
diarias de horario y funciones, y los contratos de prestación de servicios
suscritos. No se practicó el dictamen pericial contable que había sido
decretado, porque la parte que lo solicitó desistió de él en audiencia — por
tanto, ese medio no puede usarse como sustento en el alegato.

**Fragmento del alegato que produciría esta skill (un argumento completo con
los 9 pasos):**

> **1. Afirmación jurídica**: entre MM y la demandada existió un verdadero
> contrato de trabajo, con independencia del nombre que las partes le dieron
> al vínculo.
>
> **2. Hecho probado**: MM prestó el servicio bajo subordinación continuada
> — recibía instrucciones diarias sobre horario de ingreso, funciones y
> reporte de resultados directamente de su superior jerárquico en la
> demandada.
>
> **3. Prueba que lo acredita**: los tres testimonios practicados en
> audiencia (excompañeros de trabajo) coinciden en describir el mismo
> patrón de instrucciones diarias, y las documentales aportadas (correos
> electrónicos incorporados como prueba documental) registran, con fecha y
> remitente, órdenes de horario y funciones enviadas por ese superior
> jerárquico a MM.
>
> **4. Norma aplicable**: artículo 23 del Código Sustantivo del Trabajo,
> que define los tres elementos del contrato de trabajo (actividad personal,
> subordinación y remuneración), y el artículo 24 del mismo Código, que
> establece la presunción de contrato de trabajo cuando se acredita la
> prestación personal del servicio.
>
> **5. Regla jurisprudencial pertinente**: la Sala Laboral de la Corte
> Suprema de Justicia ha establecido de manera reiterada que la denominación
> que las partes le den al contrato (civil, comercial o de prestación de
> servicios) no desvirtúa la naturaleza laboral del vínculo cuando en la
> práctica se acredita subordinación continuada `[REFERENCIA NO VERIFICADA:
> pendiente confirmar número de radicado y fecha exactos de la sentencia de
> la Sala Laboral CSJ aplicable a este punto — correr `verificacion-citas-co`
> antes de radicar]`.
>
> **6. Subsunción**: la prestación personal del servicio de MM (probada por
> los tres testimonios y no controvertida por la demandada) activa la
> presunción del artículo 24 del CST; el patrón de instrucciones diarias
> acreditado por testimonios y documentales satisface el elemento de
> subordinación del artículo 23; la denominación contractual civil que le
> dio la demandada no desvirtúa, según la regla jurisprudencial citada, la
> naturaleza laboral del vínculo así acreditada.
>
> **7. Conclusión jurídica**: entre MM y la demandada existió un contrato de
> trabajo, y no un contrato de prestación de servicios, durante el período
> en que se acreditó la prestación personal bajo subordinación.
>
> **8. Riesgo de ataque de la contraparte**: la demandada argumentará que las
> instrucciones enviadas por correo eran simples "coordinaciones de
> resultado" propias de cualquier contrato de prestación de servicios, y no
> subordinación en sentido laboral, e insistirá en que los contratos
> firmados por MM son prueba de su voluntad expresa de vincularse bajo esa
> modalidad.
>
> **9. Respuesta al ataque**: los correos practicados como prueba no fijan
> únicamente un resultado a entregar, sino horario de ingreso y permanencia,
> lo que excede la coordinación propia de un contrato de prestación de
> servicios y corresponde al elemento de subordinación continuada del
> artículo 23 del CST; además, según la regla jurisprudencial citada en el
> paso 5, la sola firma de un contrato de prestación de servicios no
> desvirtúa la realidad probada en el proceso — es exactamente el supuesto
> que esa regla cubre. La firma del contrato civil por MM no es, por sí
> sola, prueba de la verdadera naturaleza del vínculo; lo es la conducta
> efectivamente probada en el proceso.

Nótese lo que este fragmento **no** hace: no presenta el dictamen pericial
contable (desistido, nunca practicado) como si respaldara algo, no convierte
la firma del contrato de prestación de servicios en un hecho "perjudicial
irrefutable" sin responderlo, y deja marcada `[REFERENCIA NO VERIFICADA]` la
cita de la Sala Laboral en vez de inventar un número de radicado que suene
plausible.

## Cierre — límite de esta skill

Esta skill produce un borrador de alegato de conclusión, no un alegato listo
para presentar ante el juez. Nunca lo presenta por sí sola ante el despacho
judicial ni decide la estrategia procesal final — antes de radicarlo debe
pasar por el gate completo de `protocolo-control-antialucinacion-co` (en
particular su semáforo final) y, si contiene citas puntuales pendientes de
verificar, por `verificacion-citas-co`. La decisión de presentar el alegato,
de ajustar la estrategia frente a lo que efectivamente ocurrió en la práctica
de pruebas, y la firma del escrito, corresponden siempre al abogado
responsable del caso.
