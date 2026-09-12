---
name: revision-tabular-col
description: >
  Revisión tabular MASIVA de contratos: una fila por contrato, columna por dato,
  semáforo ROJO/AMARILLO/VERDE. Convierte lotes de contratos (due diligence,
  auditoría proveedores, arrendamientos, laborales) en matriz comparable Excel/CSV/
  Markdown con evidencia rastreable. Activar ante: revisión tabular, matriz
  contratos, tabla de cláusulas, compara lote contratos, auditoría masiva,
  due diligence contractual, extrae campos de contratos, semáforo portafolio.
  SIEMPRE activar ante 3+ contratos para comparar, extraer datos o construir
  tabla de cláusulas, riesgos o hallazgos.
---

# Revisión Tabular de Contratos — Colombia

Lote de contratos → matriz: una fila por documento, una columna por dato, cada
celda citada a su fuente exacta. Pensada para due diligence de adquisiciones
(Ley 1258/2008, Código de Comercio — base a verificar con
`vigilancia-normativa-col` antes del primer uso), auditorías de contratos de
proveedores, portafolios de arrendamiento y lotes de contratos laborales de
clientes corporativos de JA Abogados.

**Qué NO es.** No es la revisión profunda de UN contrato (eso es
`playbook-contratos-col`): responde las mismas 15 preguntas sobre los 200
contratos. Y no reemplaza la lectura humana: **cada celda es una pista que exige
verificación, no un hallazgo**. La salida hace la verificación rápida, no
prescindible.

---

## Sistema de tipos de columna

Lo que hace útil una revisión tabular es que la columna C significa lo mismo en
la fila 1 y en la fila 200. El texto libre deriva; los tipos aguantan.

| Tipo | Qué devuelve | Úsalo para |
|---|---|---|
| `textual` | Cita exacta del documento, carácter por carácter | Términos definidos, lenguaje operativo de la cláusula |
| `clasificar` | Un valor de una lista cerrada que tú defines | Sí/No, presente/ausente, variantes de cláusula |
| `fecha` | Fecha ISO | Fecha de efectos, vencimiento, plazo de preaviso |
| `duracion` | Número + unidad | Plazo inicial, preaviso, supervivencia post-terminación |
| `moneda` | Número + código de moneda (COP por defecto) | Topes, cláusula penal, valor del contrato |
| `numero` | Número simple | Conteos, porcentajes, referencias de página |
| `semaforo` | 🔴 ROJO / 🟡 AMARILLO / 🟢 VERDE según el playbook del despacho | Calificación de riesgo de una cláusula o del contrato completo |
| `libre` | Resumen corto en texto libre | Con moderación: es el tipo que deriva. Solo si ningún otro encaja |

**Regla textual:** toda columna no-`textual` captura además, como campo
compañero, la cita exacta que sustenta la respuesta. El valor de la celda es la
interpretación; la cita es la evidencia. Un `clasificar` que dice
"cesión con consentimiento previo" no sirve sin la frase de la que salió, porque
el trabajo del revisor es comprobar si esa lectura es correcta.

## Los tres estados de "no encontrado"

Una celda en blanco esconde información. Cuando no hay respuesta positiva,
fuerza uno de tres estados explícitos:

| Estado | Significado |
|---|---|
| `no_presente` | El documento se leyó y la cláusula no está — la materia no se regula |
| `ambiguo` | Hay algo pero no se puede clasificar con confianza (redacción parcial, cláusulas en conflicto) |
| `requiere_revision` | Se encontró algo pero un abogado debe decidir (caso límite, redacción inusual, juicio que el esquema no captura) |

Son tres datos distintos. "El contrato guarda silencio sobre cesión" se maneja
muy diferente de "la cláusula de cesión es ambigua". Colapsarlos en un blanco
pierde la distinción.

## El semáforo del despacho (escala de riesgo)

Las columnas `semaforo` aplican los criterios de `playbook-contratos-col` —
cargar ese skill para el detalle. Resumen operativo:

- 🔴 **ROJO — bloqueante**: jurisdicción exclusiva extranjera en ejecución local,
  indemnidad asimétrica sin tope, penalidad superior al valor del contrato,
  exclusión de responsabilidad por dolo o culpa grave, modificación unilateral
  de condiciones esenciales, confidencialidad perpetua sin excepciones.
- 🟡 **AMARILLO — negociable**: prórroga automática sin aviso de no renovación
  ≥30 días, tope de responsabilidad inferior al valor del contrato, exclusividad
  unilateral sin contraprestación, arbitramento fuera del domicilio del cliente,
  preavisos de incumplimiento muy cortos.
- 🟢 **VERDE — aceptable**: ley y sede colombianas, penalidades proporcionadas
  (10-20% del valor), confidencialidad con excepciones estándar, renovación con
  preaviso ≥30 días.

Toda matriz incluye una columna `semaforo_contrato` (fila completa): ROJO si hay
al menos una cláusula roja, AMARILLO si solo hay amarillas, VERDE si nada objeta.
La celda del semáforo cita la(s) cláusula(s) que lo dispararon.

---

## Flujo de trabajo

### Paso 0 — Qué y dónde

Confirmar antes de empezar:
1. **Documentos.** ¿Dónde están? Carpeta local, Google Drive, lista de archivos.
   ¿Cuántos? Si >200, advertir la duración y ofrecer empezar por un subconjunto
   filtrado por materialidad. PDFs pesados → convertir primero con
   `ahorro-tokens-markitdown`.
2. **Esquema.** ¿Qué columnas? O el usuario parte del esquema colombiano por
   defecto (abajo), o describe las columnas en lenguaje natural y tú las
   estructuras con tipos.
3. **Salida.** ¿Excel (`.xlsx`) o Google Sheets? Preguntar, no adivinar. CSV y
   Markdown siempre se escriben como respaldo. Destino: la carpeta del cliente
   (`{empresa}/`) u otra que indique el usuario.

### Paso 1 — Construir y confirmar el esquema

Convertir la lista de columnas en un esquema tipado: `id` estable, `etiqueta`,
`tipo`, `pregunta` (la que se haría un revisor leyendo el documento) y, para
`clasificar`, la lista de `opciones`. Escribirlo en `.esquema-revision.yaml`
junto a la salida — es el artefacto reutilizable: se edita, se añade una
columna, se re-corre contra documentos nuevos. Mostrarlo y confirmar antes del
despliegue masivo.

**Esquema colombiano por defecto** (recorta o amplía según el encargo):
`contraparte` (textual) · `tipo_contrato` (clasificar: servicios, suministro,
compraventa, arrendamiento, distribución, agencia, NDA, SaaS, obra, laboral,
otro) · `fecha_efectos` (fecha) · `plazo_inicial` (duracion) ·
`prorroga_automatica` (clasificar) · `terminacion_unilateral` (clasificar:
ninguna, ambas_partes, solo_cliente, solo_contraparte) · `preaviso_terminacion`
(duracion) · `cesion` (clasificar: silencio, consentimiento_previo,
libre, solo_afiliadas, prohibida) · `cambio_de_control` (clasificar) ·
`exclusividad` (clasificar) · `clausula_penal` (moneda) · `tope_responsabilidad`
(moneda) · `indemnidad` (clasificar: ninguna, mutua, cliente_indemniza,
contraparte_indemniza) · `ley_aplicable_jurisdiccion` (textual — extranjera en
ejecución local = riesgo jurisdiccional) · `resolucion_conflictos` (clasificar:
juez_ordinario, arbitramento, conciliacion_previa, silencio) ·
`datos_personales` (clasificar — tratamiento conforme Ley 1581/2012 y Decreto
1377/2013, base a verificar con `vigilancia-normativa-col`) ·
`propiedad_intelectual` (clasificar) · `confidencialidad_supervivencia`
(duracion) · `indicio_laboralidad` (clasificar — subordinación encubierta en
contratos de servicios, referencia art. 23 CST, base a verificar) ·
`indicio_agencia_comercial` (clasificar — distribución que pueda configurar
agencia con prestaciones a la terminación, Código de Comercio, base a
verificar) · `semaforo_contrato` (semaforo).

Pase rápido de 6 columnas para un primer barrido urgente: contraparte,
fecha_efectos, plazo_inicial, cesion, terminacion_unilateral, semaforo_contrato.

### Paso 2 — Corrida de muestra

No desplegar sobre 200 documentos con un esquema sin probar. Correr 3-5 primero
y mirar: columnas donde casi todo sale `ambiguo` (pregunta mal planteada —
reescribir), `clasificar` cuyas respuestas no caben en las opciones (añadir
opciones o pasar a `libre`), columnas `textual` que devuelven paráfrasis
(reforzar el carácter-por-carácter). Ajustar, re-correr la muestra, confirmar.

### Paso 3 — Despliegue masivo

Un subagente por documento, en paralelo. Cada subagente: (1) lee el documento
COMPLETO, no un fragmento; (2) ubica la disposición relevante por columna;
(3) devuelve la fila estructurada: por columna `{valor, estado, cita, ubicacion}`.

**La cita no es opcional y la regla textual es mecánica, no exhortativa:**
- La `cita` DEBE ser copia carácter-por-carácter de texto contiguo, recuperable
  en la `ubicacion` citada (cláusula, numeral, página). PROHIBIDO componer una
  cita con encabezado + boilerplate esperado, parafrasear y llamarlo textual,
  reconstruir de memoria cómo "suelen" redactarse esas cláusulas, o coser con
  elipsis texto no contiguo. Si se corta, en límite de oración y marcado.
- Si no se puede localizar y copiar el texto exacto (fuente truncada, OCR
  ilegible, cláusula implícita pero no escrita): estado `requiere_revision`,
  valor nulo y nota `cita_no_disponible: <motivo>`. NUNCA `respondido` con cita
  compuesta. La regla aplica igual a las citas compañeras de todos los demás
  tipos, incluidas las celdas `semaforo`.

### Paso 4 — Normalización

Leer la tabla completa columna por columna — este pase caza el modo de falla de
toda revisión tabular: la misma cláusula interpretada distinto entre documentos.
- `clasificar`: todo valor debe estar en las opciones; outliers se reclasifican
  o pasan a `requiere_revision`. Mirar clusters: 195 dicen "consentimiento
  previo" y 5 "libre" → revisar los 5.
- `fecha`/`duracion`/`moneda`: normalizar formato; valores implausibles (plazo
  de 99 años, penal de $1.000) → `requiere_revision`.
- `semaforo`: verificar que cada ROJO/AMARILLO corresponde a un criterio del
  playbook y que la cita disparadora lo sustenta.
- **Spot-check textual**: reabrir la fuente en la `ubicacion` citada para una
  muestra aleatoria (mínimo 3-5 filas por columna o el 10%, lo que sea mayor) y
  comparar la cita carácter-por-carácter. Cualquier cita compuesta,
  parafraseada o ilocalizable → degradar a `requiere_revision` con nota
  `cita_no_coincide` y AMPLIAR el chequeo a toda la columna: si un subagente
  compuso una cita, otros pudieron hacerlo. Una celda `respondida` con cita
  falsa es falla más grave que un `ambiguo` — degradar con agresividad.

### Paso 5 — Salida

Tres formatos siempre: **Markdown** (revisión en sesión, con columna ⚠️ de
banderas), **CSV** (valores en un archivo + `_fuentes.csv` con citas y
ubicaciones), y **Excel/Sheets** según prefiera el usuario (`openpyxl` o skill
`xlsx` para Excel). En la hoja de cálculo: columna de fuente oculta por cada
dato con comentario visible al pasar el cursor; color por estado (blanco =
respondido, amarillo = ambiguo/requiere_revision, gris = no_presente) y color de
semáforo en su columna; columna `Verificado` en blanco que el abogado marca —
el patrón que hace la tabla auditable; hoja `_esquema` autodescriptiva.

Encabezado obligatorio en toda salida: "Documento de trabajo — JA Abogados.
Borrador sujeto a verificación profesional. Confidencial: derivado de documentos
amparados por secreto profesional; su circulación fuera del equipo del encargo
debe decidirse deliberadamente." Guardar en la carpeta del cliente.

### Paso 6 — Resumen (respuesta primero, sin narrar proceso)

Un pantallazo: documentos/columnas/filas completadas; conteo de `no_presente`,
`ambiguo`, `requiere_revision` por columna (esa es la carga de verificación);
distribución del semáforo (cuántos contratos ROJOS y cuáles); columnas con >10%
de filas marcadas en normalización; rutas de archivos; y el recordatorio: cada
celda es una pista, no un hallazgo — verificar antes de que informe una
recomendación, un otrosí o un memo. Cerrar con etiquetas de certidumbre y
protocolo de `anti-hallucination-v3`. Sin secciones vacías.

---

## Reglas del despacho

- Cifras (SMLMV, UPC, aportes) SOLO de la tabla maestra CONFIRMADA de
  `liquidador-aportes-col`; nunca de memoria.
- Vigencia de toda norma citada en el esquema o el semáforo: verificación EN
  VIVO con `vigilancia-normativa-col` antes de afirmarla.
- Plazos procesales detectados → `vencimientos-procesales-col`, no a mano.
- Si la matriz revela litigio activo o inminente: a abogado especialista — el
  despacho no litiga. Efectos tributarios: remitir a contador/CPA, no se emite
  asesoría tributaria integrada.

## Lo que este skill NO hace

- No reemplaza leer los documentos: dice dónde mirar.
- No produce puntajes de confianza — un 0.73 no es información; los estados y
  las citas textuales son la señal de confianza.
- No omite documentos en silencio: todo documento señalado recibe fila; el
  ilegible, fila de `requiere_revision` con nota.
- No hace pasar una paráfrasis por cita: el rastro de evidencia es el punto.

## VINCULACIÓN

| Skill | Cuándo |
|---|---|
| `playbook-contratos-col` | Criterios del semáforo; revisión profunda de los contratos que salgan ROJOS |
| `ahorro-tokens-markitdown` | Convertir PDFs/Word pesados antes del despliegue |
| `vigilancia-normativa-col` | Verificar vigencia de toda norma del esquema |
| `liquidador-aportes-col` | Cifras laborales/seguridad social en columnas de moneda |
| `anti-hallucination-v3` | Cierre y etiquetas de certidumbre del entregable |
| `lexa-mercantil-col` / `derecho-digital-col` | Profundizar hallazgos societarios / SaaS-datos |
| `termination-review` / `vencimientos-procesales-col` | Terminaciones y plazos detectados |
| `xlsx` / `kit-entregables-col` / `dashboard-ejecutivo-col` | Excel final, paquete cliente, tablero del portafolio |

---

Adaptado de anthropics/claude-for-legal (licencia del repositorio oficial) para
el sistema jurídico colombiano — JA Abogados / Bufete Cortés Cartagena, jul-2026.
