---
name: meta-prompt-maestro-col
description: >
  Capa maestra de meta-prompts jurídicos y corporativos de alta exigencia para
  Colombia. Eleva y depura la producción de lexa-lab-ultra, lexa-lab-premium y
  biblioteca-prompts-lexa: todo meta-prompt sale con 5 capas (rol y estándar,
  insumos verificados, producción avanzada, control anti-alucinación,
  señal/ruido) y con estándar de alta magistratura — el registro argumentativo
  de las Altas Cortes — o de mixtura técnico-ejecutiva para audiencias
  corporativas. Activar ante: meta-prompt, prompt profesional o maestro, refina
  o mejora mi prompt, prompt de alta magistratura, texto con nivel de casación,
  prompt corporativo o para junta, capas de control del prompt, depura la
  biblioteca de prompts, estándar de producción de texto jurídico. SIEMPRE
  activar cuando se genere, refine o audite un prompt o meta-prompt jurídico o
  corporativo del despacho: define el estándar mínimo de salida.
---

# META-PROMPT MAESTRO — Estándar de generación de prompts del despacho

**Función**: capa de CALIDAD sobre los generadores de prompts del ecosistema.
No reemplaza a `lexa-lab-ultra` (metodología 8-D, módulos) ni a
`biblioteca-prompts-lexa` (prompts copiables R.A.C.F.): **define el estándar
que la salida de cualquiera de ellos debe cumplir** antes de entregarse.

Precedencia depurada del ecosistema de prompting (evita duplicados):

| Necesidad | Skill que ejecuta | Este skill aporta |
|---|---|---|
| Prompt rápido copiable | `biblioteca-prompts-lexa` | Auditoría de las 5 capas antes de entregar |
| Meta-prompt complejo (laboral/constitucional/mercantil) | `lexa-lab-ultra` (reemplaza a `lexa-lab-premium` — preferir siempre ultra) | Estándar de alta magistratura + capa corporativa |
| Prompt corporativo no litigioso (juntas, clientes, informes) | este skill directamente | Plantilla maestra completa |

---

## LAS 5 CAPAS OBLIGATORIAS DE TODO META-PROMPT

Un meta-prompt entregado sin alguna de estas capas es un producto defectuoso.

### CAPA 1 — ROL Y ESTÁNDAR (quién escribe y con qué vara)

El rol no es decorativo: fija el estándar de exigencia del texto. Definir SIEMPRE:
- **Rol técnico**: especialidad + jurisdicción + nivel ("abogado laboralista
  colombiano con estándar argumentativo de la Sala de Casación Laboral").
- **Estándar de producción**: qué vara mide el resultado (ver Registros, abajo).
- **Audiencia real**: juez / contraparte / gerente / junta — cambia todo lo demás.

### CAPA 2 — INSUMOS VERIFICADOS (con qué materiales se escribe)

- Todo dato del caso entra por campo explícito `[COMPLETAR: ...]` — el meta-prompt
  NUNCA trae hechos, nombres, cifras ni fechas inventadas como ejemplo realista
  (un ejemplo plausible es una alucinación sembrada: alguien lo dejará sin borrar).
- Toda norma o sentencia que el meta-prompt ordene citar debe venir con la
  instrucción de verificación en vivo adjunta: "verificar vigencia y texto con
  `vigilancia-normativa-col` antes de citar" — nunca "cita el art. X" a secas.
- Jurisprudencia: el meta-prompt debe exigir que los fallos sean aportados o
  verificados en relatoría oficial (regla absoluta de `anti-hallucination-v3`).

### CAPA 3 — PRODUCCIÓN AVANZADA (cómo se construye el texto)

Tres modos; el meta-prompt declara cuál usa y puede combinarlos por secciones:

**ANÁLISIS** — antes de redactar, obligar a producir:
problema jurídico central en una oración → tesis → antítesis (mejor argumento
de la contraparte, en serio, no de paja) → síntesis con regla aplicable →
consecuencias. Sin este esqueleto no se redacta.

**REDACCIÓN DE ALTA MAGISTRATURA** — el registro de las Altas Cortes
(leer SIEMPRE `references/estandar-altas-cortes.md`: problema jurídico
canónico, disciplina de precedente, tests completos, citación pinpoint y
verificación viva integrada):
- Estructura de providencia: hechos relevantes → problema jurídico → marco
  normativo y jurisprudencial → subsunción (el silogismo explícito: premisa
  normativa, premisa fáctica, conclusión) → decisión/petición.
- Una idea por párrafo; cada párrafo hace avanzar el argumento o sobra.
- Precisión terminológica absoluta (los términos técnicos no se varían por
  elegancia: "terminación con justa causa" no muta a "despido justificado").
- Cero retórica vacía, cero citas decorativas, cero latinismos de adorno;
  un latinismo solo si es categoría técnica (ratio decidendi, ultra petita).
- Distinguir SIEMPRE ratio decidendi de obiter dicta al usar precedente.

**MIXTURA TÉCNICO-EJECUTIVA** — para audiencias corporativas o documentos
híbridos (concepto para gerencia, informe a junta, comunicación a cliente):
- Apertura ejecutiva: decisión/riesgo/costo en lenguaje de negocios (párrafo
  inicial que un gerente entiende sin abogado al lado — estándar de
  `traduccion-ejecutiva-col`).
- Cuerpo técnico con rigor pleno de alta magistratura (el rigor no se rebaja,
  se ordena distinto).
- Cierre operativo: qué hacer, quién, cuándo, qué pasa si no.
- La mixtura es de REGISTROS, nunca de rigor: la parte ejecutiva no puede
  afirmar nada que el cuerpo técnico no sostenga con fuente.

### CAPA 4 — CONTROL ANTI-ALUCINACIÓN (el blindaje va DENTRO del prompt)

Todo meta-prompt generado incluye, textualmente, su propio bloque de control:

```
CONTROL DE VERACIDAD (obligatorio en tu respuesta):
1. No inventes normas, sentencias, hechos ni cifras. Lo que no esté en los
   insumos o en fuente oficial verificada en vivo, márcalo [No verificado]
   o s/d y sigue sin él.
2. Aplica las 6 etiquetas de certidumbre ([Acreditado], [Afirmado],
   [Controvertido], [Inferencia], [No verificado], [Reformación pendiente]).
3. Toda norma citada: nombre + número + año + artículo + estado de vigencia
   verificado. Toda sentencia: corporación + sala + número + fecha + M.P.,
   solo si fue aportada o leída en relatoría oficial.
4. Cierra con la NOTA DE VERIFICACIÓN estándar del despacho
   (anti-hallucination-v3) y el checklist de entrega.
```

### CAPA 5 — SEÑAL/RUIDO (forma del entregable)

Heredada de `vigilancia-normativa-col` (regla dura 8): el meta-prompt ordena
que el documento final responda primero, no narre su proceso ni su metodología,
omita secciones vacías y tenga extensión proporcional al contenido. El lector
recibe conclusiones fundadas, no el andamiaje.

---

## PLANTILLA MAESTRA (usar para generar; adaptar, no mutilar)

```
# META-PROMPT — [producto: demanda / concepto / informe a junta / ...]

## ROL Y ESTÁNDAR
Actúa como [rol técnico + jurisdicción]. Estándar de producción: [alta
magistratura / mixtura técnico-ejecutiva]. Audiencia: [juez X / junta de Y].

## INSUMOS DEL CASO (verificados — no agregues nada que no esté aquí)
- [COMPLETAR: partes, hechos con fechas, pruebas disponibles]
- Normas base a verificar antes de citar: [COMPLETAR — verificar con
  vigilancia-normativa-col]
- Fallos aportados: [COMPLETAR o "ninguno — no cites jurisprudencia"]

## PROCESO DE PRODUCCIÓN
1. ANÁLISIS: problema jurídico en una oración; tesis; mejor argumento de la
   contraparte; síntesis con la regla aplicable.
2. REDACCIÓN: [estructura del producto, sección por sección, con el modo de
   la Capa 3 que corresponda a cada sección].
3. AUTOAUDITORÍA: relee contra el CONTROL DE VERACIDAD antes de entregar.

## CONTROL DE VERACIDAD
[bloque textual de la Capa 4]

## FORMATO DE SALIDA
[entregable exacto: memorial/tabla/informe; extensión objetivo; qué va primero]
Responde primero con [la decisión/la petición/el concepto]; no narres tu proceso.
```

---

## DEPURACIÓN DE PROMPTS EXISTENTES

Cuando el usuario pida "depura/refina este prompt" (propio o de la biblioteca):

1. Diagnosticar contra las 5 capas: ¿cuáles faltan? (lo típico: falta Capa 2 —
   ejemplos con datos inventados — y falta Capa 4 completa).
2. Reescribirlo con la plantilla maestra conservando la intención original.
3. Entregar en dos bloques: el prompt depurado listo para copiar + un párrafo
   de "qué cambió y por qué" (máximo 5 líneas — regla señal/ruido).
4. Si el prompt original induce alucinación (pide citar jurisprudencia sin
   aportarla, trae cifras de ejemplo realistas, da por vigente una norma sin
   verificar), señalarlo como DEFECTO CRÍTICO explícito.

---

## VINCULACIÓN

| Skill | Relación |
|---|---|
| `lexa-lab-ultra` | Ejecuta la metodología 8-D; esta capa audita su salida |
| `biblioteca-prompts-lexa` | Sus prompts se depuran con la sección anterior |
| `anti-hallucination-v3` | Fuente del bloque de control y las etiquetas |
| `vigilancia-normativa-col` | Verificación en vivo de toda norma citada |
| `traduccion-ejecutiva-col` | Estándar de la apertura ejecutiva en mixtura |
| `redactor-juridico-col` | Depuración final del texto producido |
