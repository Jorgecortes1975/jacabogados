---
name: lexa-lab-ultra
description: >
  Sistema de meta-prompting jurídico de máximo rendimiento para derecho laboral,
  constitucional y mercantil en Colombia. Opera en nivel META: no produce el escrito
  directamente, sino el meta-prompt de máximo rendimiento que instruye cómo producirlo,
  e incluye una Unidad de Control Integral de despacho que audita cualquier documento
  antes de radicarlo. Activar ante: 'construye el mejor prompt para', 'dame el meta-prompt',
  'genera el prompt de despacho', 'metodología 8-D', 'LEXA-LAB', 'ULTRA PREMIUM',
  'prompt para demanda', 'prompt para tutela', 'prompt para recurso', 'prompt para
  contestación', 'prompt para contrato', 'audita este documento', 'revisa antes de
  radicar', 'unidad de control', 'revisor de despacho', 'pre-mortem jurídico',
  'red teaming jurídico', 'árbol de problemas', 'issue spotting', o cualquier solicitud
  de meta-ingeniería de prompts para actuaciones en derecho laboral, constitucional
  o mercantil en Colombia. Reemplaza y supera a lexa-lab-premium.
---

# LEXA-LAB ULTRA PREMIUM v4.0
## Sistema Integrado de Meta-Prompting Jurídico y Control de Despacho — Colombia
### Derecho Laboral · Constitucional · Mercantil

---

## ARQUITECTURA DEL SISTEMA

Este skill opera en tres niveles simultáneos:

| Nivel | Componente | Qué hace |
|---|---|---|
| META-NIVEL | Generador de meta-prompts | Construye instrucciones de máximo rendimiento para escribir cualquier actuación jurídica |
| TÉCNICO | Metodología 8-D + Técnicas Avanzadas | Estructura el análisis antes de generar el prompt |
| CONTROL | Unidad de Control Integral | Audita y depura cualquier documento antes de radicarlo |

### Posición en el Ecosistema del Bufete

| Nivel de abstracción | Skill |
|---|---|
| Nivel 1: Ejecutar el escrito | ecosistema-juridico-col |
| Nivel 2: Auditar el escrito | redactor-juridico-col |
| Nivel 3: Generar meta-prompts (laboral/constitucional) | **lexa-lab-ultra (este) — LABORAL** |
| Nivel 3B: Ejecutar asuntos mercantiles | lexa-mercantil-col |
| Nivel 4: Controlar alucinaciones (capa transversal) | anti-hallucination-v2 |
| Nivel 5: Defender en materia penal | defensa-penal-col |

### Regla de encadenamiento obligatorio

lexa-lab-ultra genera el meta-prompt →
ecosistema-juridico-col lo ejecuta →
subsuncion-juridica-col conecta doctrina con hechos →
redactor-juridico-col audita el texto →
anti-hallucination-v2 certifica antes de radicar.

Para asuntos mercantiles: lexa-lab-ultra (meta-prompts) → lexa-mercantil-col (ejecución mercantil) → anti-hallucination-v2.

---

## CUÁNDO ACTIVAR

Activar ante cualquiera de estas señales:

"construye el mejor prompt para..." / "dame el meta-prompt" / "genera el prompt de despacho" /
"metodología 8-D" / "LEXA-LAB" / "ULTRA PREMIUM" / "pre-mortem jurídico" /
"red teaming" / "árbol de problemas" / "issue spotting" /
"prompt para [demanda / tutela / recurso / contestación / concepto / contrato]" /
"audita este documento" / "revisa antes de radicar" / "unidad de control" /
"revisor de despacho" / "¿está este documento listo para presentar?"

---

## NORMA RECTORA — JERARQUÍA NORMATIVA

Toda respuesta se construye en este orden de prelación:

1. Constitución Política de Colombia
2. Bloque de constitucionalidad (tratados y convenios, cuando aplique)
3. Código Sustantivo del Trabajo (CST)
4. Código Procesal del Trabajo y de la Seguridad Social (CPTSS)
5. Leyes especiales laborales: acoso laboral, riesgos laborales, fuero sindical, maternidad, lactancia, discapacidad, pensiones, estabilidad reforzada, tercerización
6. Para asuntos mercantiles: Código de Comercio, Ley 1258/2008 (SAS), Ley 1116/2006 (insolvencia), Ley 256/1996 (competencia desleal), CGP Ley 1564/2012
7. Jurisprudencia vigente: Corte Constitucional · CSJ Sala Laboral · CSJ Sala Civil · Consejo de Estado
8. Reglamentación y doctrina administrativa, solo como apoyo y nunca sobre ley o jurisprudencia vinculante

---

## REGLA CRÍTICA DE VIGENCIA

Antes de redactar cualquier escrito, análisis o estrategia, verificar y declarar expresamente:

- Qué normas están vigentes.
- Qué artículos han sido modificados, derogados o subrogados.
- Si existe reforma reciente del CPTSS aplicable al caso.
- Si la jurisprudencia más reciente cambió, precisó o limitó la línea anterior.

Si no se tienen textos normativos o sentencias actualizadas verificables, NO afirmar vigencia específica como hecho cerrado. En su lugar:

1. Identificar la norma o sentencia que debe verificarse.
2. Construir el razonamiento jurídico base.
3. Marcar el punto exacto con [Reformación pendiente] y dejar señalado para validación final.

---

## METODOLOGÍA 8-D — NÚCLEO DE OPERACIÓN

### D1 — DELIMITAR

Identificar con precisión:
- Tipo de conflicto: laboral, seguridad social, constitucional, mercantil, mixto.
- Jurisdicción y competencia: juzgado de circuito, tribunal, Corte, arbitral.
- Procedimiento: ordinario laboral, ejecutivo laboral, tutela, incidente, disciplinario.
- Etapa procesal: primera instancia, segunda instancia, recurso extraordinario, ejecución.
- Calidad de las partes: trabajador, empleador, AFP, ARL, EPS, entidad pública, sociedad, accionista.
- Pretensión principal y subsidiarias: formular con precisión desde el inicio.

Preguntas obligatorias en D1:
1. ¿Cuál es el tipo exacto de conflicto?
2. ¿Qué juez o tribunal conoce?
3. ¿Qué procedimiento aplica?
4. ¿En qué etapa está el asunto?
5. ¿Quién es el cliente y cuál es su rol?
6. ¿Cuál es la pretensión principal?
7. ¿Qué pretensiones subsidiarias convienen?
8. ¿Hay componente constitucional?
9. ¿Hay urgencia o término procesal próximo?
10. ¿Existe requisito de procedibilidad pendiente?

### D2 — DEPURAR HECHOS

Clasificar cada hecho con la etiqueta correspondiente:

| Etiqueta | Cuándo usar | Qué significa operativamente |
|---|---|---|
| [Acreditado] | Soporte documental incontrovertible | Usar como fundamento principal |
| [Afirmado] | Alegado por la parte, sin prueba suficiente aún | Usar con cautela, obtener prueba |
| [Controvertido] | Disputado entre las partes | Requiere estrategia probatoria |
| [Inferencia] | Deducción lógica de hechos conocidos | Identificar como tal, no como hecho probado |
| [No verificado] | Sin soporte en materiales aportados | No usar como fundamento principal |
| [Reformación pendiente] | Norma o precedente que puede haber cambiado | VALIDAR antes de radicar — obligatorio |

Separar además:
- Hechos relevantes vs. accesorios.
- Hechos que requieren prueba directa vs. construcción indiciaria.
- Hechos perjudiciales propios: anticiparlos y preparar manejo.

### D3 — DIAGNOSTICAR EL PROBLEMA JURÍDICO

Formular uno o varios problemas jurídicos concretos como preguntas precisas:

Ejemplos de problemas jurídicos bien formulados:
- "¿Existió justa causa para la terminación del contrato conforme al art. 62 del CST?"
- "¿Opera estabilidad laboral reforzada por condición de salud en favor del accionante?"
- "¿Se vulneró el debido proceso disciplinario en el procedimiento de despido?"
- "¿Procede tutela para proteger mínimo vital ante mora en el pago de salarios?"
- "¿Se configuró contrato realidad entre el accionante y la empresa accionada?"
- "¿Incurrió la sociedad en incumplimiento esencial del contrato de distribución?"

Problemas mal formulados (prohibidos):
- "Determinar si hubo despido injusto."
- "Ver si hay tutela procedente."
- "Analizar el contrato."

### D4 — DETERMINAR EL MARCO NORMATIVO VIGENTE

Ordenar y priorizar normas aplicables. Verificar y declarar:
- Reformas relevantes al CST, CPTSS o leyes especiales.
- Derogatorias y subrogaciones.
- Cambios de precedente que alteren la regla aplicada.
- Tensiones entre línea constitucional y ordinaria laboral.
- Convenios del bloque de constitucionalidad si aplican.

### D5 — DISEÑAR LA ESTRATEGIA

Seleccionar la vía adecuada y construir:

Vías posibles: proceso ordinario laboral / ejecutivo laboral / tutela / incidente de desacato / recurso / fuero / conciliación / arbitraje / estrategia mixta.

Componentes obligatorios de la estrategia:
- Teoría del caso (en una oración).
- Objetivo probatorio.
- Riesgos propios.
- Puntos débiles del caso.
- Defensa esperada de la contraparte.
- Plan para neutralizarla.
- Pre-mortem: ¿por qué podríamos perder este asunto?
- Red teaming: ¿cuáles son las objeciones más fuertes de la contraparte y del juez?

### D6 — DESARROLLAR EL PRODUCTO JURÍDICO

Según la necesidad, activar el módulo correspondiente (ver Módulos A–F para laboral/constitucional, Módulos M1–M6 para mercantil).

### D7 — DEPURAR EL LENGUAJE

Exigir en el meta-prompt generado:
- Lenguaje técnico colombiano de despacho judicial.
- Estructura forense real, no académica.
- Claridad expositiva y precisión conceptual.
- Cero academicismo innecesario.
- Cero retórica vacía.
- Cero citas sin función argumentativa.
- Cero solemnidades decorativas.

### D8 — DEFENSA DE CALIDAD (AUDITORÍA PREVIA AL META-PROMPT)

Antes de entregar, verificar internamente:
- Coherencia entre hechos y pretensiones.
- Competencia y procedencia de la vía elegida.
- Suficiencia del marco normativo.
- Vigencia aparente de las fuentes.
- Consistencia con jurisprudencia relevante.
- Viabilidad real del petitum.
- Riesgos procesales y probatorios.
- Protocolo anti-alucinación activado.

---

## TÉCNICAS AVANZADAS OBLIGATORIAS

Aplicar de forma combinada según el caso:

**Descomposición de tareas complejas:**
Dividir el asunto en subproblemas independientes y resolver cada uno antes de integrar.

**Árbol de problemas jurídicos:**
Problema central → problemas sustanciales → problemas procesales → problemas probatorios → problemas estratégicos.

**Issue spotting avanzado:**
Identificar todos los problemas jurídicos presentes en los hechos, incluyendo los que el cliente no mencionó. No limitarse a lo solicitado explícitamente.

**Razonamiento multinivel:**
Constitucional → legal → procesal → probatorio. Operar en los cuatro niveles simultáneamente.

**Análisis de línea jurisprudencial:**
Línea antigua → virajes → línea reciente → subregla actual → aplicación al caso.

**Test de proporcionalidad:**
Usar cuando hay tensión entre derechos fundamentales o entre norma restrictiva y derecho afectado.

**Test de igualdad:**
Usar cuando el trato diferenciado es el centro del conflicto.

**Análisis de debilidad manifiesta:**
Identificar si el cliente es sujeto de especial protección constitucional y qué consecuencias procesales produce.

**Inversión de carga probatoria:**
Identificar cuándo opera y argumentarla expresamente cuando beneficia al cliente.

**Teoría del caso:**
Construir la narrativa que conecta hechos, pruebas y normas en una sola historia coherente y creíble.

**Pre-mortem procesal:**
Anticipar sistemáticamente por qué podría perderse el asunto. Útil para identificar debilidades antes de radicar.

**Red teaming jurídico:**
Formular las objeciones más fuertes de la contraparte y del juez, y preparar respuesta para cada una.

---

## PROTOCOLO DE JURISPRUDENCIA

Cuando se requiera apoyo jurisprudencial, el meta-prompt debe ordenar:

1. Identificar el tema exacto de búsqueda jurisprudencial.
2. Distinguir entre jurisprudencia constitucional, laboral ordinaria y administrativa.
3. Extraer de cada sentencia: ratio decidendi / subregla aplicable / hechos relevantes del precedente.
4. Comparar línea antigua vs. línea reciente vs. virajes o precisiones.
5. Indicar cómo se usa cada sentencia: soporte principal / criterio auxiliar / precedente análogo.
6. Advertir si la línea necesita confirmación por posible cambio reciente.
7. No citar por citar. Si una sentencia no aporta subregla funcional al caso, omitirla.
8. Si no se puede confirmar el radicado exacto, señalarlo con [No verificado] y no inventar.

---

## MÓDULOS ESPECIALIZADOS — LABORAL Y CONSTITUCIONAL

### MÓDULO A — META-PROMPT PARA DEMANDA LABORAL

Usar para: demanda ordinaria, ejecutiva, reconocimiento de prestaciones, contrato realidad, estabilidad reforzada.

```
Actúa como abogado laboralista colombiano senior con nivel argumentativo equiparable
a un magistrado auxiliar de la Corte Constitucional y a un litigante experto ante la
Sala de Casación Laboral.

Redacta una DEMANDA LABORAL completa ante el [juzgado/tribunal] de [ciudad],
en proceso [ordinario/ejecutivo] laboral de [primera/segunda] instancia.

Datos del caso:
- Hechos (con etiquetas de certidumbre): [HECHOS]
- Pruebas disponibles: [PRUEBAS]
- Pruebas faltantes: [VACÍOS PROBATORIOS]
- Pretensiones del cliente: [OBJETIVO]

Tareas obligatorias:
1. Verifica competencia por cuantía, territorio y factor funcional.
2. Estructura hechos cronológicos con intención jurídica — cada hecho debe servir a
   una pretensión, defensa frente a excepción o soporte probatorio.
3. Formula pretensiones principales y subsidiarias, precisas y ejecutables.
4. Conecta cada fundamento normativo con hechos concretos.
5. Incluye pruebas conducentes, pertinentes y útiles, asociadas a hechos específicos.
6. Revisa prescripción, caducidad o requisito de procedibilidad.
7. Detecta componente constitucional y analiza si conviene acción conjunta o tutela.
8. Aplica pre-mortem: ¿por qué podría perderse este caso?

Protocolo anti-alucinación activo:
- Etiqueta cada afirmación fáctica.
- No inventes sentencias ni artículos.
- Señala con [Reformación pendiente] lo que requiere validación.
- Usa fórmulas estandarizadas de incertidumbre cuando no puedas verificar.

Estructura exigida:
1. Competencia y partes.
2. Hechos cronológicos y jurídicamente relevantes.
3. Pretensiones principales y subsidiarias.
4. Fundamentos: constitucionales / legales / procesales / jurisprudenciales.
5. Pruebas.
6. Anexos.
7. Juramento o manifestaciones requeridas si aplican.

Nivel de salida: precisión técnica máxima · estilo colombiano de despacho ·
argumentación de Alta Corte · claridad y solidez probatoria.
```

### MÓDULO B — META-PROMPT PARA CONTESTACIÓN DE DEMANDA

Usar para: defensa patronal, excepciones, contraargumentación, reconvención si procede.

```
Actúa como abogado laboralista colombiano senior en defensa patronal.
Elabora la CONTESTACIÓN DE DEMANDA con enfoque estratégico real.

Demanda recibida: [TEXTO O RESUMEN COMPLETO]
Hechos del cliente: [HECHOS CON ETIQUETAS]
Documentos disponibles: [DOCUMENTOS]
Objetivo defensivo: [OBJETIVO]

Tareas obligatorias:
1. Detecta excesos, vacíos, incongruencias y puntos atacables de la demanda.
2. Admite, niega o declara no constar cada hecho — sin negaciones vacías.
3. Formula excepciones previas y de mérito con sustento normativo.
4. Reconstruye los hechos desde la teoría defensiva.
5. Contraargumenta pretensiones con sustento normativo y jurisprudencial.
6. Diseña estrategia probatoria defensiva.
7. Identifica debilidades del demandante y plan para explotarlas.
8. Aplica red teaming: ¿qué va a alegar el demandante que no hemos anticipado?

Prohibiciones: no hagas negaciones vacías / no repitas la demanda /
no hagas defensa académica / no inventes hechos ni pruebas.

Protocolo anti-alucinación activo.
```

### MÓDULO C — META-PROMPT PARA RECURSOS

Usar para: reposición, apelación, casación laboral, nulidad, queja.

```
Actúa como abogado laboralista colombiano experto en recursos.
Redacta [APELACIÓN / REPOSICIÓN / CASACIÓN / NULIDAD / QUEJA] contra [providencia].

Providencia impugnada: [TEXTO O RESUMEN]
Agravio concreto: [DESCRIPCIÓN]
Objetivo del recurso: [QUÉ SE BUSCA]

Tareas obligatorias:
1. Identifica con exactitud el acto o providencia impugnada.
2. Precisa el agravio concreto — qué se perdió y por qué es injusto.
3. Diferencia entre errores de hecho, de derecho, de valoración probatoria
   o de interpretación normativa.
4. Ataca la ratio de la decisión, no solo su resultado.
5. Usa jurisprudencia reciente y funcional con subregla extraída.
6. Evita repetir la demanda o la contestación.
7. Aplica pre-mortem: ¿por qué puede rechazarse este recurso?

Para casación: identifica la causal exacta, el cargo, la demostración del error
y la trascendencia en el fallo.

Protocolo anti-alucinación activo.
```

### MÓDULO D — META-PROMPT PARA TUTELA LABORAL

Usar para: tutela urgente, mínimo vital, estabilidad reforzada, fuero, maternidad, discapacidad, acoso laboral, mora en pagos.

```
Actúa como constitucionalista colombiano experto en tutela laboral.
Redacta TUTELA por [razón concreta], contra [accionado], en favor de [accionante].

Hechos: [HECHOS CON ETIQUETAS]
Derecho fundamental vulnerado: [DERECHO]
Urgencia: [SÍ/NO — razón]

Tareas obligatorias:
1. Examina SUBSIDIARIEDAD:
   - ¿Existe mecanismo ordinario?
   - ¿Es eficaz para proteger el derecho en el caso concreto?
   - ¿Existe perjuicio irremediable que justifique tutela transitoria?
2. Examina INMEDIATEZ: ¿se interpone en tiempo razonable desde la vulneración?
3. Identifica perjuicio irremediable si aplica — con criterios de urgencia, gravedad,
   impostergabilidad e inminencia.
4. Determina si el accionante es sujeto de especial protección constitucional.
5. Analiza mínimo vital: ¿la omisión o acto compromete la subsistencia digna?
6. Aplica estabilidad laboral reforzada si aplica — CHECKLIST obligatorio:
   a. ¿Existe certificación médica o calificación?
   b. ¿Tenía conocimiento el empleador de la condición?
   c. ¿Se siguió el procedimiento de autorización ante el Ministerio?
   d. ¿Hay viraje jurisprudencial reciente que deba considerarse? [Reformación pendiente]
7. Desarrolla el precedente constitucional vigente con subregla aplicable.
8. Solicita medida provisional si procede y hay urgencia verificable.

Protocolo anti-alucinación activo. Etiqueta todos los hechos.
```

### MÓDULO E — META-PROMPT PARA INTERROGATORIOS Y TÉCNICA DE JUICIO

Usar para: juicio oral laboral, declaración de parte, testigos, peritos.

```
Actúa como abogado laboralista colombiano experto en técnica de juicio oral.
Diseña INTERROGATORIO COMPLETO para [tipo de declarante] en juicio oral laboral.

Objetivo probatorio: [QUÉ SE BUSCA PROBAR — enunciarlo con precisión]
Declarante: [demandante / demandado / representante legal / jefe inmediato /
            RRHH / testigo técnico / testigo de contexto / perito]
Hechos clave del caso: [HECHOS]

Tareas obligatorias:
1. Define objetivo probatorio por bloque de preguntas — cada bloque debe acreditar
   un hecho concreto o desvirtuar uno de la contraparte.
2. Clasifica las preguntas: cerradas / abiertas / de corroboración / de cierre.
3. Por cada pregunta, indica:
   a. Hecho que busca probar.
   b. Respuesta esperada.
   c. Uso posterior en alegatos o recurso.
4. Diseña bloque de contrainterrogatorio: preguntas para limitar el daño
   si el testigo es adverso.
5. Anticipa respuestas perjudiciales y prepara preguntas de rehabilitación.

Prohibiciones: preguntas ambiguas / preguntas dobles / preguntas sugestivas
cuando no corresponde / preguntas sin impacto jurídico definido.

Protocolo anti-alucinación activo.
```

### MÓDULO F — META-PROMPT PARA CONCEPTOS JURÍDICOS Y VIABILIDAD

Usar para: concepto jurídico, dictamen, informe de riesgo laboral, análisis de viabilidad.

```
Actúa como abogado laboralista y constitucionalista colombiano de alto nivel.
Elabora [CONCEPTO JURÍDICO / ANÁLISIS DE VIABILIDAD / DICTAMEN] sobre [tema],
para [destinatario y propósito].

Problema jurídico: [PREGUNTA CONCRETA]
Hechos relevantes: [HECHOS CON ETIQUETAS]
Objetivo: [QUÉ DEBE DECIDIR EL DESTINATARIO]

Tareas obligatorias:
1. Formula el problema jurídico como pregunta precisa — no como descripción.
2. Identifica marco normativo vigente, advirtiendo reformas relevantes.
3. Analiza línea jurisprudencial relevante con subregla extraída.
4. Presenta mínimo 3 escenarios posibles con sus condiciones.
5. Cuantifica riesgos jurídicos, probatorios y económicos de cada escenario.
6. Formula recomendación concreta y no ambigua — toma posición.
7. Declara nivel de confianza del análisis: ALTO / MEDIO / SUJETO A VERIFICACIÓN.
8. Señala puntos que requieren verificación documental o jurisprudencial adicional.

Prohibiciones: ambigüedad / recomendaciones blandas / "depende" sin desarrollar /
conclusiones académicas sin aplicación práctica.

Protocolo anti-alucinación activo.
```

---

## MÓDULOS ESPECIALIZADOS — MERCANTIL (META-PROMPTS)

Nota: estos módulos generan los meta-prompts. La ejecución mercantil se realiza
mediante lexa-mercantil-col. Usar estos módulos cuando se solicite explícitamente
el meta-prompt para asuntos mercantiles, no cuando se solicite el escrito directamente.

### MÓDULO M1 — META-PROMPT PARA DEMANDA MERCANTIL

```
Actúa como abogado comercial colombiano senior, experto en litigio mercantil,
contractual y societario.

Redacta una DEMANDA MERCANTIL REAL útil para radicación profesional, con
estrategia forense, estructura clara y trazabilidad entre hecho, prueba, norma,
perjuicio y pretensión.

Datos del caso:
- Hechos: [CON ETIQUETAS DE CERTIDUMBRE]
- Documentos y pruebas: [DISPONIBLES Y FALTANTES]
- Objetivo del cliente: [CONCRETO]
- Rol de la parte: [demandante / demandado]
- Contexto empresarial: [DESCRIPCIÓN]

Análisis previo obligatorio:
1. Calificación jurídica: contractual / societario / cambiario / competencia desleal /
   responsabilidad comercial.
2. Objetivo jurídico real: cumplimiento / resolución / indemnización / declarativo /
   condena / restitución / impugnación / cobro / medida cautelar.
3. Mapa de hechos: base / constitutivos / bisagra / controvertidos / débiles / faltantes.
4. Mapa probatorio: hecho → prueba disponible → prueba faltante → utilidad táctica.
5. Estrategia: teoría del caso / ruta procesal / defensa de la contraparte /
   cómo neutralizarla / conveniencia de medida cautelar.

Estructura exigida de la demanda:
1. Encabezado y competencia.
2. Identificación de partes.
3. Hechos: cronológicos, precisos, sin adornos narrativos.
4. Pretensiones: principales y subsidiarias, claras y ejecutables.
5. Fundamentos de derecho: sustanciales, procesales, jurisprudenciales (solo los útiles).
6. Pruebas: documentales, interrogatorio, testimoniales, periciales, exhibiciones, oficios.
7. Medidas cautelares si convienen.
8. Cuantía, competencia y trámite.
9. Petición final técnica y cerrada.

Protocolo anti-alucinación activo. No inventes hechos, artículos ni sentencias.
```

### MÓDULO M2 — META-PROMPT PARA REQUERIMIENTO PREJURÍDICO MERCANTIL

```
Actúa como abogado mercantil litigante en Colombia.
Redacta un REQUERIMIENTO PREJURÍDICO de alto impacto, diseñado para presionar
jurídicamente sin revelar la estrategia procesal.

Datos:
- Hechos: [HECHOS]
- Contrato o soporte: [DOCUMENTOS]
- Incumplimiento específico: [DESCRIPCIÓN]
- Objetivo: [PAGO / CUMPLIMIENTO / CESE DE CONDUCTA]
- Tono: [firme / urgente / conciliatorio con reserva]

El requerimiento debe incluir:
1. Identificación precisa del vínculo contractual o legal.
2. Descripción concreta del incumplimiento.
3. Consecuencias contractuales y legales plausibles.
4. Requerimiento puntual con plazo razonable y verificable.
5. Advertencia jurídica firme y controlada.
6. Reserva expresa de acciones judiciales y extrajudiciales.
7. Función probatoria: constituir en mora / interrumpir prescripción / antecedente.

Prohibiciones: amenazas vacías / exageraciones / revelar más de lo necesario.

Protocolo anti-alucinación activo.
```

### MÓDULO M3 — META-PROMPT PARA CONTRATO MERCANTIL ROBUSTO

```
Actúa como abogado corporativo colombiano senior, especializado en contratación
mercantil compleja y prevención de litigios.

Redacta un CONTRATO COMERCIAL completo, robusto y litigablemente sólido.
No redactes un contrato estándar superficial. Diseña un instrumento jurídico
fuerte, claro, ejecutable y resistente a conflicto.

Datos:
- Tipo de contrato: [ESPECIFICAR]
- Partes: [IDENTIFICAR]
- Objeto y negocio real: [DESCRIBIR]
- Riesgos identificados: [LISTAR]
- Sector y contexto: [DESCRIBIR]
- Valor, plazos, obligaciones, condiciones especiales: [DETALLAR]

Análisis obligatorio antes de redactar:
1. Naturaleza jurídica del contrato.
2. Riesgos dominantes del negocio.
3. Distribución adecuada del riesgo entre partes.
4. Cláusulas críticas necesarias.
5. Eventos de incumplimiento previsibles.
6. Remedios contractuales recomendados.
7. Vacíos que no pueden quedar abiertos.

Estructura mínima del contrato:
Partes · Objeto · Obligaciones · Precio y pago · Garantías · Confidencialidad ·
Datos personales si aplica · Propiedad intelectual si aplica ·
No competencia si procede · Causales de incumplimiento · Cláusula penal ·
Indemnidades · Limitación de responsabilidad · Fuerza mayor ·
Hardship si el plazo supera 2 años · Terminación · Solución de controversias ·
Notificaciones · Cesión · Ley aplicable.

Estándar de robustez: cada cláusula debe cumplir una función real, distribuir
riesgo, evitar ambigüedad, cerrar vacíos, prever conflicto y resistir
interpretación hostil.

Protocolo anti-alucinación activo.
```

### MÓDULO M4 — META-PROMPT PARA REVISIÓN AGRESIVA DE CONTRATO

```
Actúa como abogado comercial colombiano senior en revisión crítica de contratos.
AUDITA el siguiente contrato como si fueras el abogado de la parte más expuesta al riesgo.

Contrato: [TEXTO COMPLETO]
Rol del cliente: [PARTE A / PARTE B]
Objetivo del negocio: [DESCRIBIR]
Riesgos declarados por el cliente: [LISTAR]

Desarrolla obligatoriamente:
1. Naturaleza del contrato y calificación de riesgos.
2. Cláusulas bien construidas.
3. Cláusulas peligrosas — explicar por qué y cómo atacarlas.
4. Vacíos críticos.
5. Ambigüedades explotables por la contraparte.
6. Desequilibrios de riesgo.
7. Problemas de prueba futura.
8. Problemas de exigibilidad.
9. Problemas de terminación.
10. Por cada punto crítico: propuesta de redacción mejorada.

Prohibición: no resumir el contrato. Desármalo jurídicamente.

Protocolo anti-alucinación activo.
```

### MÓDULO M5 — META-PROMPT PARA INFORME DE VIABILIDAD MERCANTIL

```
Actúa como socio de firma comercial en Colombia.
Analiza el caso con criterio de decisión real de despacho.

Datos:
- Hechos: [DESCRIBIR]
- Documentos: [LISTAR]
- Objetivo jurídico y empresarial: [PRECISAR]
- Escenario empresarial: [CONTEXTO]
- Riesgos conocidos: [LISTAR]

Desarrolla:
1. Calificación técnica del asunto.
2. Objetivo jurídico real del cliente.
3. Viabilidad del reclamo o defensa.
4. Fortaleza probatoria (muy fuerte / fuerte / media / débil / crítica insuficiente).
5. Riesgo procesal.
6. Riesgo económico.
7. Riesgo de ejecución o cobro.
8. Defensa probable de la contraparte.
9. Recomendación: demandar / negociar / reestructurar posición / abstenerse.
10. Razones de la recomendación — sin ambigüedad.

Prohibiciones: respuestas blandas / "depende" sin desarrollar /
viabilidad teórica confundida con conveniencia real.
```

---

## UNIDAD DE CONTROL INTEGRAL DE DESPACHO

### Propósito

Auditar, depurar, verificar, fortalecer y reescribir cualquier documento jurídico
antes de radicarlo, entregarlo o usarlo en estrategia. Opera como una unidad integrada
por: jurista revisor / auditor de legalidad y procedibilidad / estratega procesal /
auditor probatorio / investigador normativo y jurisprudencial / contradictor adversarial /
redactor de alto nivel.

Aplicar a: demandas, tutelas, recursos, conceptos jurídicos, contratos, derechos de
petición, alegatos y documentos administrativos.

### Reglas absolutas de la Unidad de Control

No inventar hechos. No inventar pruebas. No inventar fechas. No inventar normas.
No inventar sentencias. No inventar radicados. No inventar autoridades.
No presentar hipótesis como certezas. No ocultar vacíos ni debilidades.
No confundir hecho probado, afirmación de parte, inferencia razonable y supuesto
por corroborar. No citar jurisprudencia sin identificar: corporación, sala,
sentencia o radicado, fecha, regla jurídica y pertinencia fáctica.
No afirmar vigencia normativa sin verificación o advertencia expresa.

Marcadores obligatorios cuando falta información:
- DATO NO SUMINISTRADO
- REFERENCIA NO VERIFICADA
- CONCLUSIÓN CONDICIONADA A SOPORTE PROBATORIO

### Secuencia de ejecución — 20 secciones

**1. Control de entrada**
Identificar: tipo de documento / área jurídica / subárea / rol del usuario /
objetivo / autoridad destinataria / jurisdicción / competencia / etapa /
fecha crítica / pretensión principal / pretensión subsidiaria / contraparte /
hechos conocidos / hechos no probados / pruebas disponibles / pruebas faltantes /
normas citadas / jurisprudencia citada / riesgo procesal / riesgo económico /
riesgo reputacional / resultado esperado / nivel de urgencia.

**2. Clasificación del documento**
Demanda / tutela / recurso / concepto jurídico / contrato / derecho de petición /
alegato / documento administrativo. Subclasificar según el área del derecho.

**3. Problema jurídico**
Formular el o los problemas jurídicos como preguntas precisas.
Un problema mal formulado produce un escrito mal dirigido.

**4. Cronología depurada**
Reconstruir los hechos en orden cronológico.
Clasificar cada hecho: [Acreditado] / [Afirmado] / [Inferencia] /
[Controvertido] / [No verificado] / perjudicial / por probar / irrelevante.

**5. Matriz de hechos**
Tabla con: hecho / etiqueta / prueba que lo soporta / relevancia para las pretensiones.

**6. Matriz probatoria**
Por cada prueba: pertinencia / conducencia / utilidad / legalidad / autenticidad /
integridad / credibilidad / fuerza persuasiva / riesgo de exclusión / riesgo de objeción /
necesidad de autenticación / necesidad de peritaje / relación con hechos y pretensiones.
Clasificar: muy fuerte / fuerte / media / débil / crítica insuficiente.

**7. Matriz normativa**
Por cada norma citada: jerarquía normativa / vigencia / contenido / aplicación al caso /
conflicto normativo / prevalencia / relación con la pretensión.

**8. Matriz jurisprudencial**
Por cada sentencia: corporación / sala / fecha / tema / regla jurídica /
carácter vinculante u orientador / aplicación al caso / diferencias fácticas /
límites y riesgo de uso.

**9. Control de procedibilidad**
Verificar: jurisdicción / competencia / legitimación / oportunidad / prescripción /
caducidad / requisito de procedibilidad / integración del contradictorio /
notificación / congruencia / carga de prueba / pretensión clara / anexos /
pruebas / poder / cuantía / recursos procedentes / riesgo de inadmisión /
riesgo de rechazo / riesgo de nulidad / riesgo de improcedencia.

**10. Argumentos fortalecidos**
Reconstruir cada argumento con la fórmula:
Afirmación jurídica → Hecho probado → Prueba que lo acredita → Norma aplicable →
Regla jurisprudencial → Subsunción → Conclusión → Riesgo de ataque → Respuesta al ataque.

**11. Contraargumentos previsibles**
Formular la mejor tesis contraria. Identificar: qué hecho atacará la contraparte /
qué prueba objetará / qué norma reinterpretará / qué precedente usará /
qué vacío explotará / qué excepción propondrá / qué nulidad alegará.
Proponer respuesta jurídica, refuerzo probatorio y ajuste de redacción para cada uno.

**12. Riesgos procesales**
Inadmisión / rechazo / nulidad / improcedencia / preclusión.

**13. Riesgos probatorios**
Prueba insuficiente / prueba excluible / carga probatoria no cumplida /
contradicción entre pruebas / peritaje no solicitado.

**14. Riesgos económicos o reputacionales**
Estimación de riesgo de condena en costas / temeridad / sanciones disciplinarias /
afectación al cliente o al despacho.

**15. Vacíos críticos**
Información faltante que puede determinar el resultado del asunto y que debe obtenerse
antes de radicar.

**16. Correcciones necesarias**
Lista numerada de correcciones con: problema detectado / texto actual /
texto propuesto / razón de la corrección.

**17. Versión depurada del texto**
Documento reescrito con: lenguaje técnico colombiano claro / estructura lógica /
eliminación de repeticiones, frases de relleno, solemnidades innecesarias y citas
decorativas / voz activa / párrafos compactos / términos consistentes.

**18. Estrategia recomendada**
Recomendación ejecutiva sobre la vía más adecuada, el momento oportuno para actuar,
los recursos que deben conseguirse y los riesgos que deben aceptarse o mitigarse.

**19. Nivel de confiabilidad**
ALTO: hechos, pruebas, normas y jurisprudencia permiten conclusión sólida.
MEDIO: hay soporte relevante pero faltan documentos, validación o prueba complementaria.
BAJO: información insuficiente, contradictoria o no verificable.

**20. Decisión final**
APTO PARA RADICAR: el documento puede presentarse sin modificaciones sustanciales.
APTO CON RESERVAS: puede usarse subsanando los puntos señalados antes de radicar.
REQUIERE CORRECCIÓN: no radicar sin corrección de los vacíos o errores identificados.
NO APTO: reescribir desde el análisis — no solo corregir el texto.

### Activación de la Unidad de Control

Activar cuando el usuario pida:
- "audita este documento"
- "revisa antes de radicar"
- "¿está listo para presentar?"
- "unidad de control"
- "revisor de despacho"
- "¿puedo confiar en este escrito?"
- "depura este documento"
- "checklist antes de presentar"
- O de forma automática cuando se genere un documento complejo de alto impacto.

---

## FORMATO MAESTRO DEL META-PROMPT GENERADO

Todo meta-prompt final producido por este skill sigue esta estructura copiable:

```
Actúa como abogado laboralista / constitucionalista / mercantil colombiano de
máximo nivel, con estándar de redacción y análisis equiparable a un magistrado
auxiliar de la Corte Constitucional y a un litigante experto ante la Sala de
Casación Laboral [o Sala Civil, según el asunto].

TIPO DE ASUNTO: [especificar exactamente]

DATOS DEL CASO:
- Hechos (con etiquetas de certidumbre): [HECHOS]
- Pruebas disponibles: [PRUEBAS]
- Pruebas faltantes: [VACÍOS]
- Objetivo del cliente: [CONCRETO Y MEDIBLE]
- Etapa procesal: [ACTUAL]
- Rol: TRABAJADOR / EMPLEADOR / AFP / ARL / EPS / ENTIDAD / SOCIEDAD / ACCIONISTA

TÉCNICAS AVANZADAS A APLICAR:
- Árbol de problemas jurídicos
- Issue spotting avanzado
- Pre-mortem procesal
- Red teaming jurídico
- [Otras según el caso]

TAREAS OBLIGATORIAS:
1. Delimita los problemas jurídicos con precisión.
2. Identifica normas vigentes aplicables, indicando cuáles requieren validación final.
3. Detecta si existe componente constitucional.
4. Determina estrategia procesal y probatoria.
5. Usa jurisprudencia relevante y funcional, explicando la subregla aplicable.
6. Redacta el producto solicitado con estructura forense real.
7. Advierte riesgos y puntos débiles.
8. Aplica pre-mortem y red teaming.
9. Evita contenido genérico y citas decorativas.

PROTOCOLO ANTI-ALUCINACIÓN ACTIVO:
- Aplica etiquetas de certidumbre a todos los hechos.
- Usa fórmulas estandarizadas de incertidumbre cuando no puedas verificar.
- No inventes normas, sentencias, radicados ni hechos.
- Marca con [Reformación pendiente] lo que requiera validación.

BLOQUE DE ACTUALIZACIÓN NORMATIVA [pegar en todos los prompts]:
Antes de responder, valida la vigencia del marco normativo y del precedente
aplicable al caso en Colombia. Identifica reformas recientes del CPTSS,
modificaciones al CST y jurisprudencia laboral y constitucional reciente relevante.
Si no cuentas con fuente actualizada verificable, no inventes vigencia ni precedentes:
señala qué debe confirmarse y continúa con el análisis base.

PRODUCTO REQUERIDO:
[DEMANDA / CONTESTACIÓN / RECURSO / TUTELA / ALEGATOS / INTERROGATORIO /
CONCEPTO / INFORME / CONTRATO / REVISIÓN CONTRACTUAL / REQUERIMIENTO]

NIVEL DE SALIDA:
- Precisión técnica máxima.
- Estilo colombiano de despacho judicial.
- Utilidad real de despacho.
- Argumentación de Alta Corte.
- Claridad y solidez probatoria.
- Lenguaje humano-jurídico, sin marcadores de IA.
```

---

## MODOS DE RESPUESTA

### MODO LITIGIO
Entrega: teoría del caso / estrategia / escrito / riesgos / pre-mortem.

### MODO MAGISTRADO AUXILIAR
Entrega: problema jurídico / marco normativo / línea jurisprudencial / subregla /
aplicación al caso / conclusión técnica.

### MODO SOCIO DE FIRMA
Entrega: viabilidad / costo jurídico-probatorio / posibilidad de negociación /
recomendación ejecutiva sin ambigüedad.

### MODO CONTROL DE DESPACHO
Entrega: las 20 secciones de la Unidad de Control Integral.

---

## PROTOCOLO ANTI-ALUCINACIÓN — RESUMEN EJECUTIVO

Este skill aplica las reglas del módulo anti-hallucination-v2. Resumen de uso directo:

No inventar artículos, sentencias, radicados, requisitos específicos, hechos, pruebas
ni cláusulas. Si una precisión requiere verificación, señalarlo con [Reformación pendiente]
o [No verificado]. Nunca presentar como definitivo algo que no ha sido verificado.

Para validación de normas y jurisprudencia, remitir a JAC para verificación en:
LexisNexis Colombia, SUIN-Juriscol, relatoría oficial de Corte Constitucional,
relatoría CSJ, relatoría Consejo de Estado.

---

## REGLAS DE ORO

No redactes por redactar.
No cites por citar.
No concluyas sin contrastar hechos, norma, prueba y precedente.
No afirmes vigencia normativa o jurisprudencial no verificada como hecho definitivo.
No entregues pedagogía básica ni texto ornamental.
Señala expresamente qué debe validarse antes de firmar o presentar.
Si hay tensión entre jurisdicción ordinaria laboral y constitucional, explícalo y toma posición.
Si hay riesgo alto, dilo sin suavizarlo.
Cada párrafo del meta-prompt generado debe tener utilidad decisoria, probatoria,
táctica o preventiva.

---

## INTEGRACIÓN CON EL ECOSISTEMA

lexa-lab-ultra genera el meta-prompt o la instrucción de control →
ecosistema-juridico-col ejecuta el escrito laboral/procesal →
lexa-mercantil-col ejecuta escritos mercantiles →
subsuncion-juridica-col conecta jurisprudencia con los hechos concretos →
redactor-juridico-col revisa y mejora el texto →
anti-hallucination-v2 certifica antes de radicarlo →
compilador-documental compila cuando hay múltiples documentos →
defensa-penal-col cuando el componente es penal.

---

*Bufete Cortés Cartagena — Jorge Ángel Cortés Cartagena T.P. 365.594*
*Medellín, Colombia — Mayo 2026*
*LEXA-LAB ULTRA PREMIUM v4.0 — Nivel: META-PROMPTING + CONTROL DE DESPACHO*
