---
name: vigilancia-normativa-col
description: >
  Vigilancia de cambios normativos y jurisprudenciales de Colombia con verificación
  EN VIVO en fuentes oficiales y 5 controles anti-fallas. Detecta leyes, decretos,
  resoluciones y sentencias nuevas, verifica existencia y vigencia, produce alertas
  con registro auditable. Activar ante: vigilancia normativa, cambios normativos,
  reforma laboral/pensional/tributaria, nueva sentencia, ¿está vigente?, valores del
  año (SMLMV, UPC, auxilio transporte), radar normativo. SIEMPRE activar cuando se
  pida detectar cambios en normas o jurisprudencia colombiana.
---

# VIGILANCIA NORMATIVA COLOMBIA
## Radar de cambios normativos y jurisprudenciales con verificación rigurosa

**Despacho**: JA Abogados / Bufete Cortés Cartagena — Medellín, Colombia
**Enfoque prioritario**: Derecho laboral y seguridad social (servicios corporativos)
**Cobertura secundaria**: Mercantil, digital/datos personales, startups

---

## POR QUÉ EXISTE ESTE SKILL

El rol #4 del despacho (CLAUDE.md) es alertar sobre cambios normativos. Una alerta
equivocada es peor que ninguna alerta: si el despacho le dice a un cliente que una
norma cambió y no es cierto (o al revés), el daño es directo y profesional.

Por eso este skill tiene una regla fundacional:

> **El conocimiento de memoria del modelo es solo una HIPÓTESIS de búsqueda,
> nunca una fuente.** Ningún cambio normativo o jurisprudencial se reporta sin
> haber sido confirmado EN VIVO, durante la sesión, en una fuente oficial, con
> URL y fecha de consulta registradas.

La diferencia con `anti-hallucination-v3` (que sigue siendo obligatorio):
aquel audita documentos antes de entregarlos; este skill **sale a buscar** los
cambios y los verifica contra las fuentes en el momento. Son capas complementarias.

---

## HERRAMIENTAS DE VERIFICACIÓN EN VIVO

Usar en este orden de preferencia según disponibilidad:

1. **WebFetch / WebSearch** sobre fuentes oficiales (ver `references/fuentes-oficiales.md`
   para el catálogo completo con URLs y patrones de búsqueda).
2. **MCP Legal Data Hunter** (si está conectado): búsqueda estructurada de normas y
   jurisprudencia por jurisdicción Colombia. Útil para confirmar identificadores.
3. **Documentos aportados por el usuario** (PDFs de sentencias, textos de ley).

Si ninguna herramienta de acceso web está disponible en la sesión: el skill NO puede
emitir alertas confirmadas. Declararlo de inmediato y limitar la salida a hipótesis
marcadas `[No verificado]` con la instrucción exacta de dónde confirmar. Nunca
disfrazar memoria de vigilancia.

---

## FLUJO DE VIGILANCIA — 5 FASES

### FASE 1 — Definir el perímetro del barrido

Antes de buscar, fijar y declarar:
- **Ventana temporal**: qué fechas cubre el barrido (ej. "1–18 de julio de 2026").
- **Áreas**: por defecto las del radar (`references/radar-normativo.md`); el usuario
  puede ampliar o restringir.
- **Fuentes a consultar**: mínimo las de Nivel A y B del catálogo para las áreas activas.

El perímetro se declara en el reporte final. Un barrido sin perímetro explícito no
permite interpretar el silencio ("no encontré nada" solo significa algo si se sabe
dónde se buscó y qué periodo se cubrió).

### FASE 2 — Barrido (detección de candidatos)

Buscar señales de cambio en dos frentes:
- **Fuentes primarias y oficiales** (Nivel A y B): Diario Oficial, SUIN-Juriscol,
  Secretaría del Senado, relatorías de Altas Cortes, comunicados de Mintrabajo,
  Minsalud, UGPP, trámite legislativo en Congreso.
- **Señales de radar** (Nivel C): prensa jurídica especializada y boletines gremiales,
  SOLO para detectar candidatos — jamás como confirmación.

Cada hallazgo entra a la lista de candidatos con: qué es, dónde se detectó, qué
afirma la señal.

### FASE 3 — Verificación rigurosa (CAPA ANTI-FALLAS)

**Ningún candidato pasa a la alerta sin superar los 5 controles.** El detalle
operativo con checklists y fórmulas está en `references/capa-antifallas.md` —
leerlo antes de verificar. Resumen:

| Control | Pregunta que responde | Falla que previene |
|---|---|---|
| 1. ANTI-VICIOS | ¿La norma existe Y está vigente y aplicable? | Citar normas derogadas, inexequibles, suspendidas, o proyectos de ley como si fueran ley |
| 2. ANTI-VACÍOS | ¿"No encontré" significa "no existe"? | Rellenar lagunas con contenido plausible; confundir falta de acceso con inexistencia |
| 3. ANTI-AMBIGÜEDADES | ¿Las fuentes coinciden y el texto es unívoco? | Resolver silenciosamente contradicciones o textos ambiguos con una interpretación propia |
| 4. ANTI-ALUCINACIONES | ¿Cada dato fue leído en una fuente oficial ESTA sesión? | Reportar de memoria; identificadores incompletos o inventados |
| 5. ANTI-FALLAS OPERATIVAS | ¿Qué no pude verificar y por qué? | Presentar un barrido parcial como completo; omitir fuentes caídas en silencio |

Veredictos posibles por candidato:
- **CONFIRMADO** — superó los 5 controles; puede ir a la alerta como hecho.
- **EN TRÁMITE** — existe pero no es norma vigente (proyecto, pendiente de sanción
  o publicación, vigencia diferida). Se reporta con su estado exacto, nunca como cambio vigente.
- **NO CONFIRMADO** — la señal existe pero la fuente primaria no la respalda (aún).
  Se reporta solo en la sección de pendientes, marcado `[No verificado]`.
- **DESCARTADO** — la señal era falsa, duplicada o irrelevante. Se registra el descarte.

### FASE 4 — Alerta clasificada

Solo con candidatos CONFIRMADOS y EN TRÁMITE. Usar SIEMPRE esta estructura:

```
# ALERTA DE VIGILANCIA NORMATIVA — [fecha]

## Perímetro del barrido
Ventana: [fechas] | Áreas: [lista] | Fuentes consultadas: [lista con estado OK/FALLA]

## Resumen ejecutivo
[3-5 líneas en lenguaje de negocios: qué cambió y a quién le importa]

## Hallazgos confirmados
### [CRÍTICO / MODERADO / BAJO] — [Nombre completo de la norma o sentencia]
- **Qué es**: [tipo + número + año + entidad emisora / corporación + sala + M.P.]
- **Qué cambia**: [síntesis fiel del contenido verificado]
- **Vigencia**: [desde cuándo rige; régimen de transición si existe]
- **Clientes afectados**: [cuáles carpetas de /casos/ y por qué]
- **Acción requerida**: [qué debe hacer el despacho y en qué plazo]
- **Verificación**: [URL oficial] — consultado [fecha]. Veredicto anti-fallas: CONFIRMADO.

## En trámite (NO son norma vigente todavía)
[mismo formato, con estado exacto del trámite y qué hito seguir]

## Pendientes de confirmación
[señales NO CONFIRMADAS: qué se detectó, dónde, y qué falta para confirmar]

## Cobertura y limitaciones
[fuentes que fallaron, periodos no cubiertos, qué requiere verificación manual]

## Nota de verificación
Todo hallazgo confirmado fue contrastado en vivo contra la fuente oficial citada,
con URL y fecha de consulta. Los elementos [No verificado] o EN TRÁMITE no deben
usarse como fundamento de decisiones hasta su confirmación en fuente primaria.
```

**Proporcionalidad del formato**: la plantilla completa es para barridos. Para un
chequeo puntual ("¿es cierto que...?", "¿está vigente...?") usar el formato compacto:
veredicto directo en las primeras líneas → fundamento verificado con URL + fecha →
acciones → una sola sección final "Pendientes y limitaciones". Sin secciones vacías.

Clasificación de impacto (alineada con el flujo de diagnóstico del despacho):
- **CRÍTICO**: exige acción del cliente en < 30 días o genera riesgo de sanción/litigio.
- **MODERADO**: exige ajuste en el trimestre (contratos, aportes, políticas).
- **BAJO**: informativo; vigilar evolución.

### FASE 5 — Registro auditable

Registrar cada barrido (incluso los que no encuentran nada) en
`normativa/registro-vigilancia.md`: fecha, perímetro, hallazgos con veredicto,
fuentes que fallaron. El registro es la memoria del radar: el próximo barrido
parte de la fecha del anterior y retoma los pendientes NO CONFIRMADOS.

Si el hallazgo es CRÍTICO, ofrecer además: (a) actualizar el radar y el CLAUDE.md
si cambia un valor base (SMLMV, UPC, auxilio de transporte), y (b) generar la
comunicación al cliente con `traduccion-ejecutiva-col` + `kit-entregables-col`.

---

## REGLAS DURAS (sin excepción)

1. **Cero alertas de memoria.** Dato no leído en fuente oficial durante la sesión =
   dato no confirmado. Sin importar cuán seguro parezca.
2. **Proyecto ≠ ley.** Anuncios de prensa, borradores, proyectos en debate y normas
   sancionadas pero no publicadas se reportan EN TRÁMITE, con su estado exacto.
3. **Toda afirmación confirmada lleva URL oficial + fecha de consulta.** Una alerta
   sin fuente verificable es un defecto de fabricación: no se entrega.
4. **"s/d" antes que inventar.** Si la norma es ambigua o el dato no aparece, se marca
   sin definición — regla del despacho (CLAUDE.md).
5. **El silencio se explica.** Todo reporte declara qué fuentes se consultaron, cuáles
   fallaron y qué quedó fuera del perímetro.
6. **Etiquetas de certidumbre** de `anti-hallucination-v3` en todo el reporte, y ese
   skill se ejecuta completo antes de entregar la alerta al cliente.
7. **Valores anuales** (SMLMV, UPC, auxilio de transporte, bases de cotización) se
   verifican contra el decreto/resolución que los fija, no contra páginas de resumen.
8. **Señal, no ruido.** El rigor va en el FONDO (verificación), no en la FORMA
   (burocracia). En el entregable: la respuesta va PRIMERO, en las primeras líneas;
   el proceso no se narra (no mencionar el skill, sus fases ni sus controles — el
   lector recibe conclusiones, no metodología); cada control interno se ejecuta pero
   solo deja huella visible cuando encontró algo (una sección sin contenido se reduce
   a una línea o se omite); la extensión es proporcional a los hallazgos — un chequeo
   puntual de dos normas no puede ocupar más que su propio fundamento. Un reporte que
   da vueltas antes de responder es un reporte defectuoso, igual que uno sin fuentes.

---

## VINCULACIÓN CON EL ECOSISTEMA

| Skill | Relación |
|---|---|
| `anti-hallucination-v3` | Capa final obligatoria antes de entregar cualquier alerta |
| `jurisprudencia-col` | Análisis profundo de fallos detectados por el radar |
| `ecosistema-juridico-col` | Skill maestra; recibe los hallazgos para estrategia |
| `traduccion-ejecutiva-col` | Convertir la alerta en comunicación para clientes |
| `kit-entregables-col` | Empaquetar la alerta (HTML/Word/PDF) para envío |
| `playbook-contratos-col` / `rit` | Ajustar contratos y reglamentos tras un cambio CONFIRMADO |

---

## REFERENCIAS DEL SKILL

- `references/capa-antifallas.md` — Los 5 controles en detalle: checklists, veredictos
  y fórmulas estándar. **Leer siempre antes de la FASE 3.**
- `references/fuentes-oficiales.md` — Catálogo de fuentes por nivel (A/B/C) con URLs,
  qué publica cada una y patrones de búsqueda. **Leer antes de la FASE 2.**
- `references/radar-normativo.md` — Lista de vigilancia del despacho: temas, valores
  anuales y jurisprudencia a rastrear, con periodicidad sugerida.
