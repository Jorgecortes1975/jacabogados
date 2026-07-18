---
name: acuerdos-confidencialidad-col
description: >
  Revisión y redacción de acuerdos de confidencialidad (NDA) colombianos: triaje
  VERDE/AMARILLO/ROJO, redlines y redacción. Secreto empresarial (Decisión 486
  CAN), competencia desleal (Ley 256), cláusula penal, datos personales (Ley
  1581), límites laborales (CST). Activar ante: NDA, acuerdo/convenio/cláusula
  de confidencialidad, secreto empresarial, revisar NDA contraparte, redactar
  acuerdo reserva, cláusula penal revelación, due diligence información sensible,
  confidencialidad empleados/contratistas. SIEMPRE activar ante NDA o cláusula de
  confidencialidad para revisar, negociar o redactar en Colombia.
---

# Acuerdos de Confidencialidad (NDA) — Colombia

## Propósito

La mayoría de NDAs que llegan al despacho están bien. Unos pocos traen minas. Este skill
los clasifica en minutos para que el abogado solo lea a fondo los que lo ameritan, y
redacta minutas propias cuando la respuesta correcta es "usemos nuestro papel". **La
meta:** un VERDE solo necesita firma; un AMARILLO, ojos de abogado sobre uno o dos
puntos concretos; un ROJO se detiene antes de que alguien pierda tiempo.

## Marco jurídico de trabajo (Colombia)

Base de referencia — **verificar vigencia y texto con `vigilancia-normativa-col` antes
del primer uso en un entregable**; prohibido afirmar contenidos de artículos como
verificados sin ese barrido:

| Materia | Base a verificar |
|---|---|
| Secreto empresarial (definición, requisitos, protección) | Decisión 486 de 2000 (CAN), Título XVI |
| Competencia desleal (violación de secretos, inducción a la ruptura) | Ley 256 de 1996 |
| Cláusula penal (estimación anticipada, reducción de la pena enorme) | Código Civil y Código de Comercio |
| Deber de reserva del trabajador y libertad de trabajo | CST; Constitución (arts. 25, 26 y 53 — base a verificar) |
| Datos personales si la información incluye datos de personas | Ley 1581 de 2012 y Decreto 1377 de 2013 |
| Firma y mensajes de datos (NDA firmado electrónicamente) | Ley 527 de 1999 |
| Arbitraje como foro pactado | Ley 1563 de 2012 |
| Sanción penal por divulgación (agravantes contractuales) | Código Penal — utilización indebida de información privilegiada / divulgación de secretos (tipos exactos a verificar) |

## Determinar la posición

Antes de aplicar el playbook, definir de qué lado está el cliente: **revelante**,
**receptor** o **mutuo** (aun así hay un lado dominante: ¿de quién es el papel y en qué
dirección corre la evaluación?). Si no es obvio, preguntar; anotar el lado en la salida.

**Posiciones del despacho:** los umbrales de qué hace a un NDA VERDE, AMARILLO o ROJO
por cliente viven en `playbook-contratos-col` y en la carpeta del cliente (`{empresa}/`).
Este skill no trae posiciones por defecto: la tolerancia al riesgo de cada cliente
varía. Si no hay posición sobre un término del NDA, preguntar: "El playbook del cliente
no cubre [término]. ¿Cuál es la posición por defecto — cuándo VERDE, AMARILLO, ROJO?",
registrarla en la carpeta del cliente y continuar el triaje con la nueva posición.

## Verificación de alcance

**Antes de revisar cláusulas de confidencialidad, verificar si el documento hace más de
lo que su nombre sugiere.** Un "NDA" puede esconder: exclusividad, licencias de
propiedad intelectual, no captación de empleados o clientes, no competencia, cesión de
derechos, derecho de preferencia, cláusula de nación más favorecida, o pacto arbitral
que gobierna mucho más que disputas de confidencialidad.

Si el NDA contiene obligaciones más allá de la confidencialidad: **auto-AMARILLO sin
importar el análisis de términos**, señalando: "Este documento se titula NDA pero
contiene [exclusividad / licencia / no captación / cesión de PI / arbitraje amplio]. Es
más que un NDA. Va a revisión de abogado." No empujar en silencio por el triaje un
documento que en el fondo es un contrato de servicios, un term sheet o un paquete de
covenants disfrazado.

## El triaje

Clasificar el NDA en uno de tres niveles aplicando las posiciones del playbook. Las
definiciones de nivel son estables; los *criterios* que llenan cada nivel vienen del
playbook del cliente.

### VERDE — a firma

El NDA satisface todas las posiciones del playbook y ningún término dispara ROJO.
**VERDE exige posiciones revisadas por abogado del despacho.** Es la única ruta a firma
sin revisión jurídica, así que no puede emitirse contra posiciones ausentes o por
defecto. Si no hay posiciones validadas: emitir AMARILLO — pone el NDA frente a un
humano que decide.

```markdown
## Triaje NDA: [Contraparte] — lado: [revelante/receptor/mutuo]
VERDE — a firma
### Resumen ejecutivo
Sin banderas rojas bajo el playbook. A firma por el proceso estándar.
| Chequeo | Estado | Referencia de playbook |
|---|---|---|
**Siguiente paso:** [enviar a firma de {responsable según playbook}]
```

Si quien opera no es abogado del despacho: advertir que firmar obliga a la empresa,
generar un brief de 1 página (contraparte, dirección del NDA, chequeos corridos, lo que
el playbook no cubrió, qué puede salir mal, tres preguntas para el abogado) y **no
avanzar sin un sí explícito**.

### AMARILLO — ojos de abogado sobre puntos concretos

Uno o más términos se apartan del playbook sin ser rompe-tratos, O aparece un término
que el playbook no cubre. Presentar cada punto por separado para que el aprobador decida.

```markdown
## Triaje NDA: [Contraparte] — lado: [x]
AMARILLO — para [aprobador]
### Resumen ejecutivo
- [Edición accionable de una línea, p. ej. "Eliminar no captación (cláusula 6)"]
### Puntos señalados
**1. [Tema]** — Cláusula [X]
   Qué: [una línea]  |  Por qué: [posición de playbook afectada, o "playbook silente"]
   **Riesgo legal:** [🔴/🟠/🟡/🟢] | **Fricción de negocio:** [🔴 bloquea / 🟠 frena / 🟡 confunde / 🟢 invisible]
   Resolución probable: [aceptar / contraproponer X / depende del negocio]
### Lo demás
| Chequeo | Estado | Referencia |
|---|---|---|
**Siguiente paso:** consultar los puntos con [aprobador]; si los acepta, a firma.
```

### ROJO — detenerse, primero el abogado

El NDA toca una posición de la lista "nunca aceptar" del playbook, o su estructura es
incompatible con la postura estándar (p. ej., unilateral donde el playbook exige mutuo;
término perpetuo donde el playbook exige plazo; ley aplicable extranjera en la lista
"nunca"; cláusula penal desproporcionada; no competencia impuesta a trabajadores).

```markdown
## Triaje NDA: [Contraparte] — lado: [x]
ROJO — no enviar, hablar primero con el abogado
### Asuntos críticos
**1. [Tema]** — Cláusula [X]
   > "[cita textual]"
   Por qué es problema: [riesgo concreto; posición de playbook violada]
   **Riesgo legal:** [🔴/🟠/🟡/🟢] | **Fricción de negocio:** [🔴/🟠/🟡/🟢]
   Respuesta recomendada: [usar nuestra minuta | contrapropuesta específica | retirarse]
**Siguiente paso:** enviar este triaje a [escalamiento designado]. No prometer firma a la contraparte.
```

## Referencia de chequeos

El nivel (VERDE/AMARILLO/ROJO) de cada chequeo lo fija el playbook; este skill lista las
*categorías*, no umbrales:

- **Mutualidad.** ¿Mutuo o unilateral? Ante NDA unilateral no marcar ROJO de inmediato:
  preguntar (1) ¿solo el cliente revela?, (2) ¿es una revelación limitada y específica?,
  (3) ¿está ligado a M&A, laboral o inversión? — si (3) es sí, sale de este triaje y va
  a abogado (para laboral, coordinar con `rit` y `termination-review`).
- **Definición de información confidencial.** Alcance (solo marcada vs. todo lo
  revelado), exigencia de marcado, ventana de confirmación de revelaciones orales.
  Verificar que lo protegido pueda calificar como secreto empresarial (valor comercial
  por ser secreta + medidas razonables de reserva, conforme Decisión 486 — a verificar):
  lo que la empresa no trata como secreto difícilmente lo protegerá un juez.
- **Excepciones (carveouts).** Las cinco usuales: (1) información pública sin mediar
  incumplimiento; (2) ya conocida por el receptor; (3) desarrollada independientemente;
  (4) recibida de tercero sin restricción; (5) requerida por ley u orden de autoridad
  (con aviso al revelante cuando sea legalmente posible — en Colombia incluir
  requerimientos de SIC, DIAN, Fiscalía, UIAF y jueces).
- **Residuales.** Cláusula que permite usar lo retenido en memoria no asistida: riesgo
  alto para el revelante; posición de playbook obligatoria antes de aceptar.
- **Plazo y supervivencia.** Duración inicial, supervivencia post-terminación y carveout
  de secretos empresariales con protección mientras conserven ese carácter (la
  protección del secreto empresarial no depende del contrato sino de que siga siendo
  secreto — base a verificar en Decisión 486).
- **Cláusula penal.** ¿Existe? ¿Es estimación anticipada de perjuicios o apremio? ¿Es
  proporcionada al negocio? Recordar en la salida: el juez puede reducir la pena enorme
  y hay reglas sobre acumulación pena + perjuicios (C.C./C.Co. — base a verificar).
  Cláusula penal desproporcionada o unilateral contra el cliente: AMARILLO mínimo.
- **Covenants restrictivos.** No captación, no competencia, exclusividad. Son sensibles:
  frente a **trabajadores**, la confidencialidad sobrevive al contrato, pero la no
  competencia post-contractual choca con la libertad de trabajo y de empresa
  (Constitución y CST — base a verificar); la vía práctica es proteger el secreto
  empresarial vía Ley 256 de 1996 y cláusulas de confidencialidad bien delimitadas, no
  prohibir trabajar. Covenant post-contractual contra empleados: ROJO salvo posición
  expresa del playbook.
- **Costas y honorarios.** Cláusulas de asunción de honorarios de abogado: verificar
  reciprocidad; recordar que en juicio las costas y agencias en derecho las regula el
  CGP y las fija el juez (base a verificar).
- **Devolución/destrucción.** ¿Incluye excepción para copias de respaldo y archivo
  (backups) con confidencialidad continuada?
- **Ley aplicable y foro.** Posición estándar del despacho: ley colombiana y jueces
  colombianos o arbitraje nacional (Ley 1563 de 2012). Ley o foro extranjero: nivel
  según playbook; nunca VERDE sin posición expresa.

## Redacción de minutas (cuando la respuesta es "usemos nuestro papel")

Estructura mínima de la minuta colombiana: partes y calidad en que actúan; definición de
información confidencial anclada al estándar de secreto empresarial; obligaciones del
receptor (reserva, uso limitado al propósito, need-to-know, medidas de seguridad);
excepciones (las cinco); plazo y supervivencia con carveout de secreto empresarial;
cláusula penal proporcionada sin renuncia a perjuicios adicionales (redacción a validar
por abogado); remedios (cesación vía competencia desleal, medidas cautelares);
tratamiento de datos personales si aplica (Ley 1581 de 2012); devolución/destrucción con
excepción de backups; ley colombiana y foro; firma (electrónica válida — Ley 527 de
1999). Adaptar con datos del cliente; nunca inventar valores — cifras solo CONFIRMADAS
de la tabla maestra de `liquidador-aportes-col` cuando el NDA toque temas laborales.

## Granularidad del redline

**Editar en la menor escala posible.** Un redline es un artefacto de negociación, no
una reescritura: palabra antes que frase; frase antes que oración; reestructurar el
literal antes que reemplazar la oración; oración antes que cláusula; cláusula entera
solo cuando lo demás sería ilegible — y decirlo en la remisión. En la duda, más pequeño.

## Contexto de contraparte

**Grandes empresas:** rara vez negocian NDAs. Calibrar si la bandera roja es realmente
rompe-tratos o solo "distinto a nuestra minuta"; si la relación importa, la decisión de
aceptar su papel se escala. **Startups y pymes:** suelen aceptar nuestra minuta; ante
un NDA con problemas, la vía rápida es "usemos la nuestra".

## Reglas de salida

- **Filtro de complejidad:** si resolver un punto exige redactar lenguaje nuevo o
  reestructurar una cláusula, no intentarlo dentro del triaje: escribir "Cláusula [X] —
  a revisión de abogado" (la redacción va por la sección de minutas, como tarea aparte).
  El resumen ejecutivo solo lleva acciones mecánicas (eliminar, sustituir palabra/frase).
- **NDA limpio:** si pasa todo sin banderas, el resumen dice solo: "Sin banderas rojas.
  A firma por el proceso estándar." No producir informe largo para un NDA limpio.
- **Señal/ruido:** respuesta primero, sin narrar proceso, sin secciones vacías.
- **Capas del despacho:** etiquetas de certidumbre y cierre estándar de
  `anti-hallucination-v3` en todo entregable; normas citadas verificadas EN VIVO con
  `vigilancia-normativa-col` antes de salir al cliente; plazos contractuales o
  procesales cruzados con `vencimientos-procesales-col`.
- **Límites del despacho:** si ya hay demanda, denuncia por violación de secretos o
  conflicto activo con la contraparte, esto sale del triaje y va a abogado especialista.
  Efectos tributarios de la cláusula penal: al contador/CPA, no aquí.

## Lo que este skill NO hace

- No negocia: clasifica, marca redlines quirúrgicos y redacta minutas base.
- No decide los AMARILLOS: los presenta a un humano.
- No fija posiciones sobre términos: esas viven en el playbook del cliente.
- No litiga infracciones de secreto ya consumadas (especialista).

## VINCULACIÓN

| Skill | Cuándo |
|---|---|
| `playbook-contratos-col` | Fuente de las posiciones VERDE/AMARILLO/ROJO por cliente |
| `vigilancia-normativa-col` | Verificar EN VIVO Decisión 486, Ley 256/1996, C.C./C.Co. antes del primer uso |
| `anti-hallucination-v3` | Etiquetas de certidumbre y cierre estándar del entregable |
| `lexa-mercantil-col` | NDA dentro de operaciones societarias o M&A |
| `derecho-digital-col` | Información confidencial con datos personales, SaaS o incidentes |
| `investigacion-juridica-corporativa-col` | Fuga de información ya ocurrida, cadena de custodia |
| `rit` / `termination-review` | Confidencialidad de trabajadores y salidas laborales |
| `vencimientos-procesales-col` | Plazos de supervivencia y términos de reclamación |
| `kit-entregables-col` | Empaquetar el triaje o la minuta en Word/PDF para el cliente |

---

Adaptado de anthropics/claude-for-legal (licencia del repositorio oficial) para el
sistema jurídico colombiano — JA Abogados / Bufete Cortés Cartagena, jul-2026.
