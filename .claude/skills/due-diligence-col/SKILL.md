---
name: due-diligence-col
description: >
  Extracción estructurada de hallazgos de due diligence para operaciones societarias
  colombianas: compraventa de acciones o cuotas, adquisición de SAS, inversión,
  fusiones y compra de establecimiento de comercio. Lee el data room (VDR), aplica
  filtro de materialidad y extrae hallazgos por área (societario, laboral/UGPP,
  contratos, litigios, datos personales, propiedad intelectual) en formato de memo
  con severidad CRÍTICO/MODERADO/BAJO. Activar ante: due diligence, debida diligencia,
  revisa el data room, extrae hallazgos del VDR, auditoría legal de la empresa,
  compraventa de acciones, adquisición de SAS, SPA, inversión en la sociedad, revisión
  de contingencias, contingencias UGPP, qué riesgos tiene esta empresa objetivo.
  SIEMPRE activar cuando el usuario aporte documentos de una empresa objetivo y pida
  identificar riesgos, contingencias o hallazgos para una operación de M&A o inversión
  en Colombia.
argument-hint: "[ruta del VDR o área a revisar]"
---

# /due-diligence-col

1. Cargar contexto del cliente: `{empresa}/01-INTAKE.md` y, si existe, `{empresa}/00-CONTEXTO-OPERACION.md` (tipo de operación, umbrales, ubicación del VDR). Si no existe, preguntar para qué operación/cliente es.
2. Seguir el flujo de abajo: inventario → filtro de materialidad → extracción por área → hallazgos en formato memo.
3. Verificar EN VIVO toda norma citada con `vigilancia-normativa-col` antes de afirmarla; cifras (SMLMV, aportes, sanciones UGPP) SOLO de la tabla maestra de `liquidador-aportes-col` (estado CONFIRMADO).
4. Hallazgos que impliquen acción pre-cierre → lista de cierre; términos y plazos → `vencimientos-procesales-col`.
5. Regla señal/ruido: respuesta primero, sin narrar proceso, sin secciones vacías.

---

## Propósito

El data room tiene 2.000 documentos. En algún lugar están los 30 que importan para la operación. Este skill lee los documentos contra las áreas de diligencia y los umbrales de materialidad pactados, extrae los hallazgos y los redacta en formato memo del despacho, listos para negociar declaraciones y garantías, ajustes de precio o condiciones de cierre.

**Límite del despacho**: si un hallazgo revela demanda o litigio activo que exija estrategia procesal, remitir a abogado especialista. La cuantificación de contingencias tributarias distintas de aportes a seguridad social es del CPA/contador — aquí solo se identifican y se marcan.

## Reglas de calidad (obligatorias — `anti-hallucination-v3`)

- **Etiquetas de origen en toda cita legal**: `[Legal_Data_Hunter]` u otra herramienta de investigación conectada; `[web — verificar]` para búsqueda web; `[conocimiento del modelo — verificar]` para lo recordado de entrenamiento; `[aportado por cliente/VDR]` para lo que viene del data room. Las citas de documentos conservan su referencia nativa (ruta VDR, nombre de archivo). Nunca quitar ni colapsar etiquetas; lo marcado "verificar" se revisa primero.
- **Base legal**: citar la norma como referencia de trabajo (p. ej. Ley 1258/2008, CST, Ley 1581/2012), pero NO afirmar contenidos específicos de artículos como verificados — marcar "base a verificar con `vigilancia-normativa-col` antes del primer uso". Prohibido inventar números de artículos, cuantías o valores.
- **Discrepancia con norma citada por el usuario o el vendedor**: si una nota del deal o un disclosure del vendedor cita una norma para algo que no cuadra y no se tiene el texto, NO inventar su descripción. Decir: "Esa disposición no coincide con lo esperable — necesito el texto oficial para caracterizarla. `[norma no recuperada — verificar]`", y (a) recuperarla con `vigilancia-normativa-col`, (b) pedir el texto, o (c) remitir a especialista.
- **Sin suplencia silenciosa**: si la búsqueda en la herramienta configurada devuelve poco o nada sobre la base legal de un hallazgo, reportar lo hallado y detenerse. Ofrecer opciones (ampliar búsqueda, otra fuente, web con etiqueta `[web — verificar]`, o dejar como no verificado). El abogado decide si acepta fuentes de menor confianza.

## Flujo

### Paso 1 — Inventariar el VDR

Mapear carpetas del VDR contra la lista de requerimientos de información. Anotar vacíos: categorías solicitadas sin documentos.

```markdown
## Inventario VDR: [Operación]

| Área solicitada | Carpeta VDR | Docs | Estado |
|---|---|---|---|
| Societario y registral | /01-Societario | 45 | Revisado |
| Contratos materiales | /02-Contratos | 312 | En curso |
| Laboral y seguridad social | /03-Laboral | 89 | Sin iniciar |
| [etc.] | | | |

**Vacíos:** [áreas sin documentos — requerimiento de información pendiente]
```

Documentos base mínimos a pedir siempre: certificado de existencia y representación legal (Cámara de Comercio, reciente), estatutos con reformas, libros de actas y de registro de accionistas, RUT, estados financieros, planilla PILA reciente, certificado de paz y salvo o estado de fiscalización UGPP, inventario de bases de datos y registro RNBD si aplica.

### Paso 2 — Aplicar filtro de materialidad

Según los umbrales del contexto de la operación (p. ej. contratos > $X COP, litigios > N SMLMV). No revisar todo si el umbral lo excluye. Para contratos: ordenar por valor declarado o relevancia de la contraparte y revisar de mayor a menor hasta agotar el umbral o la categoría. La conversión a SMLMV usa exclusivamente el valor CONFIRMADO de `liquidador-aportes-col`.

### Paso 3 — Extraer hallazgos por área

Para cada documento leído, contrastar contra el set estándar de su área:

**Societario (Ley 1258/2008, Código de Comercio — base a verificar) — set estándar:**
- Composición accionaria real vs. libro de registro de accionistas; opciones, acciones privilegiadas o con dividendo preferencial pendientes
- Autorizaciones estatutarias para la operación (asamblea, junta directiva, mayorías especiales)
- Restricciones a la negociación de acciones en estatutos o acuerdos de accionistas (derecho de preferencia, tag along, drag along)
- Situación de control o grupo empresarial inscrita (o que debió inscribirse) en el registro mercantil
- Filiales, vinculadas y operaciones intercompañía; conflictos de interés no autorizados
- Estado registral: renovación de matrícula mercantil, reformas no inscritas, causales de disolución (p. ej. pérdidas — verificar régimen vigente tras reformas recientes)

**Laboral y seguridad social / UGPP (CST, Ley 100/1993 — base a verificar) — set estándar:**
- Contratistas independientes con rasgos de subordinación (contrato realidad → contingencia de prestaciones, aportes e indemnizaciones)
- Aportes a seguridad social y parafiscales: exactitud del IBC, planillas PILA vs. nómina real; fiscalizaciones o requerimientos UGPP en curso (sanciones por inexactitud o mora — cuantía con `liquidador-aportes-col`)
- Sustitución patronal por la operación: continuidad de contratos y responsabilidad solidaria entre antiguo y nuevo empleador (base a verificar en CST)
- Pactos de exclusividad, no competencia y retención de empleados clave; bonificaciones o cláusulas activadas por cambio de control
- Litigios laborales en curso o amenazados; acoso laboral; pasivo pensional o cálculos actuariales
- Tercerización ilegal (uso indebido de SAS, cooperativas o contratistas para labores misionales permanentes — base a verificar)

**Contratos materiales — set estándar:**
- Cláusulas de cambio de control (¿la operación las activa? ¿se requiere consentimiento?)
- Restricciones de cesión (¿el contrato puede pasar al comprador?)
- Exclusividad / no competencia que restrinja el negocio del comprador
- Cliente más favorecido (MFN) y restricciones de precios
- Derechos de terminación que la contraparte pueda ejercer por la operación
- Indemnidades inusuales, cláusulas penales desproporcionadas, garantías otorgadas
- Contratos estatales: inhabilidades, cesión con autorización de la entidad, multas y cláusulas excepcionales (base a verificar en el estatuto de contratación)

**Litigios y sanciones — set estándar:**
- Procesos judiciales y arbitrales en curso; provisiones contables asociadas
- Reclamaciones amenazadas y actuaciones administrativas (SIC, DIAN, UGPP, Supersociedades, superintendencias del sector)
- Patrones de litigio (acciones de protección al consumidor, acciones de grupo)
- Medidas cautelares, embargos, pignoraciones sobre acciones o activos
- Programas de transparencia y ética empresarial / riesgo de soborno transnacional (Ley 1778/2016, Ley 2195/2022 — base a verificar) si el objetivo contrata con el Estado o exporta

**Datos personales (Ley 1581/2012, Decreto 1377/2013 — base a verificar) — set estándar:**
- Política de tratamiento, avisos de privacidad y autorizaciones de los titulares (¿la base de datos de clientes puede transferirse al comprador?)
- Registro Nacional de Bases de Datos (RNBD) si el objetivo está obligado
- Encargados de tratamiento y transferencias/transmisiones internacionales sin contrato o sin nivel adecuado
- Incidentes de seguridad no reportados a la SIC; requerimientos o sanciones SIC
- Si hay usuarios en la UE u otros regímenes: exposición extraterritorial (GDPR u otros) → `derecho-comparado-intl`

**Propiedad intelectual (Decisión 486 CAN, Ley 23/1982 — base a verificar) — set estándar:**
- Cadena de titularidad: cesiones de derechos patrimoniales de autor de fundadores, empleados y contratistas (la presunción por obra por encargo/contrato laboral tiene requisitos — base a verificar); software desarrollado por terceros sin cesión escrita
- Registros de marca ante la SIC (vigencia, titular correcto, coincidencia con los signos realmente usados); patentes y diseños si aplica
- Software libre / open source en el producto (riesgo copyleft)
- PI clave licenciada vs. propia; dependencia de licencias revocables
- Litigios u oposiciones de PI en curso o amenazados; secretos empresariales sin acuerdos de confidencialidad

### Paso 4 — Redactar cada hallazgo

```
Hallazgo #N: [Título]
Área: [societario | laboral/UGPP | contratos | litigios | datos personales | PI]
Severidad: [CRÍTICO 🔴 | MODERADO 🟡 | BAJO 🟢]
Documentos: [ruta VDR + nombre]
Hallazgo: [qué dice el documento y por qué importa para la operación]
Base legal: [norma de referencia + etiqueta de origen — base a verificar]
Recomendación: [ajuste de precio / indemnidad / consentimiento previo / declaración y garantía / condición de cierre / abstenerse]
```

Si el cliente ya tiene formato de memo propio, usar exactamente ese.

**Calibración de severidad (esquema del despacho):**
- 🔴 **CRÍTICO**: afecta valor o estructura de la operación. Cambio de control que exige consentimiento de cliente principal; fiscalización UGPP en curso no revelada; litigio material oculto; cadena de titularidad de PI rota; causal de disolución no enervada.
- 🟡 **MODERADO**: requiere atención, tiene solución. Consentimiento requerido pero obtenible; open source por remediar; contratistas por formalizar; RNBD desactualizado.
- 🟢 **BAJO**: se anota para el expediente. Consistente con las declaraciones; sin acción adicional.

### Paso 5 — Ensamblar por área

Agrupar por área; dentro de cada área, ordenar por severidad.

```markdown
> Documento de trabajo derivado de materiales confidenciales del VDR. Hereda su
> carácter reservado: la distribución fuera del círculo de la operación puede
> comprometer la confidencialidad pactada (NDA). Archivar en la carpeta privada
> del cliente y decidir la distribución deliberadamente.

# Hallazgos de Due Diligence: [Operación] — [Área]

**Documentos revisados:** [N] de [M] · **Cobertura:** [Todos | > umbral | Top N]
**Hallazgos:** [N]🔴 [N]🟡 [N]🟢

### Conclusión
[🔴 N bloqueantes · 🟡 N moderados · 🟢 N menores] — [lo único que el equipo de la operación necesita saber]

[Cada hallazgo en el formato del Paso 4]

## Vacíos
- [Requerimiento sin documento entregado]
- [Documento referenciado pero ausente del VDR]
```

## Responsabilidad del adquirente (analizar SIEMPRE)

Marcar: enajenación de establecimiento de comercio y responsabilidad solidaria del adquirente por obligaciones del enajenante (régimen del Código de Comercio — base a verificar); sustitución patronal y solidaridad laboral; solidaridad por aportes a seguridad social; obligaciones tributarias que persiguen al adquirente (identificar y remitir al CPA); pasivos ambientales; plan de disolución post-cierre del vendedor. Incluso comprando activos "limpios", en Colombia hay pasivos que siguen al negocio — este es el análisis que sorprende al comprador.

## Procesamiento por lotes

Para áreas grandes (300 contratos), procesar por lotes. Tras cada lote, actualizar la lista de hallazgos y reportar de inmediato todo 🔴 — no esperar a terminar el área para revelar un hallazgo que afecta la operación.

## Cierre

Terminar con árbol de próximos pasos adaptado a lo producido (redactar requerimiento adicional, negociar declaraciones y garantías, escalar a especialista, esperar documentos, otro — el abogado elige). Si hay más de ~10 hallazgos, ofrecer dashboard con `dashboard-ejecutivo-col` (conteos por severidad y área, grilla ordenable con fuente VDR). Cerrar con etiquetas de certidumbre y protocolo de `anti-hallucination-v3`: qué quedó VERIFICADO, qué quedó `[— verificar]`, y la instrucción de no radicar ni firmar nada basado en material no verificado.

## Lo que este skill NO hace

- No decide la materialidad en casos límite: aplica el umbral; el abogado decide el borde.
- No negocia declaraciones y garantías ni el SPA: produce los hallazgos que las informan (redacción → `playbook-contratos-col` / `lexa-mercantil-col`).
- No litiga contingencias activas ni cuantifica impuestos: especialista y CPA respectivamente (límites del despacho).
- No reemplaza revisión masiva con herramienta de IA de contratos si el cliente la tiene: este skill es la capa de criterio (side letters, otrosíes, lo atípico).

## VINCULACIÓN

| Skill | Rol en este flujo |
|---|---|
| `vigilancia-normativa-col` | Verificación EN VIVO de toda norma citada antes de afirmarla |
| `anti-hallucination-v3` | Etiquetas de certidumbre y checklist de cierre del memo |
| `liquidador-aportes-col` | Cifras CONFIRMADAS (SMLMV, IBC, aportes) para contingencias UGPP |
| `vencimientos-procesales-col` | Términos de procesos en curso hallados en el VDR |
| `lexa-mercantil-col` / `playbook-contratos-col` | Estructuración de la operación y redacción del SPA / D&G |
| `investigacion-juridica-corporativa-col` | Debida diligencia reputacional de contrapartes y hallazgos de fraude |
| `derecho-digital-col` | Profundizar hallazgos de datos personales, SaaS y comercio electrónico |
| `startups-col` | Objetivos en etapa temprana (cap table, vesting, SAFEs) |
| `derecho-comparado-intl` | Exposición a regímenes extranjeros (GDPR, inversión extranjera) |
| `kit-entregables-col` / `dashboard-ejecutivo-col` | Empaquetado del memo y dashboard para el cliente |

---

Adaptado de anthropics/claude-for-legal (licencia del repositorio oficial) para el sistema jurídico colombiano — JA Abogados / Bufete Cortés Cartagena, jul-2026.
