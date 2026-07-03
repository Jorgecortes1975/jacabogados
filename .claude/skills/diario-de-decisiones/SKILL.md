---
name: diario-de-decisiones
description: Registra en un diario personal las decisiones estratégicas difíciles de Jorge Cortés como abogado-operador de su propio despacho — de caso (litigar vs. conciliar) o de negocio (aceptar un cliente con conflicto marginal, fijar un fee cap) — capturando opciones consideradas, información disponible y faltante, resultado predicho con plazo, nivel de confianza y la condición exacta que lo haría cambiar de opinión. Úsala cuando el usuario pida dejar constancia de una decisión difícil que acaba de tomar, o revisar cómo le fue a una decisión pasada frente a lo que predijo.
---

# Diario de decisiones — auditoría del propio juicio

Jorge Cortés decide solo. No hay un comité de socios que revise si
litigar o conciliar fue la jugada correcta, ni un COO que le pregunte por
qué aceptó a un cliente marginal. Esta skill es la memoria que le permite,
seis meses después, comparar lo que predijo contra lo que pasó — el único
mecanismo real de mejorar el juicio propio cuando nadie más lo audita.

## Regla de veracidad obligatoria (anti-alucinación)

1. **Nunca inventes una opción, un dato o un razonamiento que el usuario
   no haya dado.** Si el usuario trae solo 2 opciones consideradas,
   pregúntale por una tercera real antes de inventarla tú — una opción de
   relleno ("no hacer nada") solo cuenta si el usuario confirma que de
   verdad la consideró. Lo mismo aplica a la información disponible y
   faltante: no rellenes con supuestos plausibles sobre lo que "seguramente"
   sabía o no sabía en ese momento.
2. **Esta skill NO reemplaza la constancia formal en el expediente del
   cliente.** Si la decisión que se registra aquí es sobre la estrategia
   procesal o contractual de un caso concreto (ej. litigar vs. conciliar,
   aceptar una cesión de derechos, fijar una posición de negociación),
   Jorge sigue obligado a dejar la constancia correspondiente en el
   expediente del cliente según las reglas propias de gestión de
   expediente del despacho (ver `control-conflictos-intake-co` para la
   apertura y manejo formal). Este diario es un registro personal de
   aprendizaje del abogado, adicional y nunca sustituto de esa constancia
   profesional.
3. Si la decisión involucra a un cliente identificable, el diario debe
   guardarse anonimizado o con el entendido explícito de que es un
   documento interno de uso personal, nunca para publicación (ver
   Art. 28, Ley 1123 de 2007, confidencialidad).

## Cuándo usar esta skill

Justo después de tomar una decisión difícil y reversible-solo-a-costo-alto
(de caso o de negocio del despacho), o periódicamente para revisar
decisiones pasadas y comparar el resultado real contra la predicción
original.

## Proceso operativo

**Paso 1 — Fecha y la decisión en una frase.**
Qué se decidió, en una sola oración clara.

**Paso 2 — Opciones consideradas (mínimo 3).**
Cada una con su trade-off explícito. Si el usuario no llega a 3,
pregúntale antes de completar tú la lista.

**Paso 3 — Elección tomada.**
Cuál de las opciones del Paso 2 se escogió.

**Paso 4 — Información disponible al momento de decidir.**
Solo lo que el usuario confirma que tenía en mano.

**Paso 5 — Información faltante.**
Lo que le habría gustado saber pero no tenía, según lo que el usuario
reconozca — no lo que "cualquier abogado prudente hubiera querido saber"
si el usuario no lo mencionó.

**Paso 6 — Resultado predicho, con timeline concreto.**
Una predicción verificable con fecha o ventana de tiempo, no una
expectativa vaga ("debería salir bien").

**Paso 7 — Confianza (1-10).**
Número, no adjetivo.

**Paso 8 — Condición de revisita.**
El único hecho o evento concreto que haría a Jorge cambiar de opinión si
ocurriera. No una lista de razones generales — un solo disparador
verificable.

**Paso 9 — Guardar.**
Guarda la entrada como archivo markdown con la fecha en el nombre (ej.
`2026-07-03-decision-fee-cap-cliente-industrial.md`), en la carpeta que
el usuario indique para su diario personal (no en el expediente del
cliente — ver regla 2).

## Formato de la entrada

```markdown
# [Fecha] — [Decisión en una frase]

## Opciones consideradas
1. [Opción] — trade-off: [...]
2. [Opción] — trade-off: [...]
3. [Opción] — trade-off: [...]

## Elección: [opción escogida]

## Información disponible
- [...]

## Información faltante
- [...]

## Resultado predicho (con plazo)
[Predicción verificable] — para [fecha/ventana]

## Confianza: [1-10]

## Condición de revisita
[El único hecho que me haría cambiar de opinión]
```

## Mini-ejemplo

**Insumo de Jorge:** "Hoy decidí no aceptar a un cliente nuevo que me
ofrecía un contrato de asesoría permanente en compliance porque el gerente
de esa empresa es primo del abogado de la contraparte en un litigio activo
que llevo. No hay conflicto directo formal, pero me incomoda."

```markdown
# 2026-07-03 — No aceptar el mandato de asesoría permanente de compliance
de la empresa X por cercanía familiar con la contraparte de un litigio activo

## Opciones consideradas
1. Aceptar el mandato sin condiciones — trade-off: ingreso recurrente
   estable, pero riesgo reputacional si el litigio activo escala y la
   cercanía familiar sale a la luz.
2. Aceptar con una muralla de información explícita y consentimiento
   informado de ambos clientes — trade-off: exige documentar y mantener
   la muralla, más carga administrativa, y el cliente actual del litigio
   podría no sentirse cómodo aunque firme.
3. Declinar el mandato — trade-off: se pierde el ingreso recurrente, pero
   se protege la relación de confianza con el cliente del litigio activo
   y se evita cualquier percepción de conflicto, aunque no sea un
   conflicto formal bajo la Ley 1123 de 2007.

## Elección: declinar el mandato (opción 3)

## Información disponible
- El gerente de la empresa nueva es primo del abogado apoderado de la
  contraparte en el litigio activo (dato confirmado por el mismo
  prospecto en la reunión de intake).
- El chequeo de conflictos formal (`control-conflictos-intake-co`) no
  arrojó coincidencia directa de partes.

## Información faltante
- No sé qué tan cercana es la relación familiar en la práctica (si hay
  trato frecuente o solo parentesco nominal) — no lo pregunté.

## Resultado predicho (con plazo)
El cliente del litigio activo nunca se entera de que existió esta
oferta, y la relación de confianza con él se mantiene intacta durante
todo el litigio (hasta su cierre estimado en 2027).

## Confianza: 7

## Condición de revisita
Si en algún momento me entero de que el litigio activo ya terminó y no
hay ningún asunto pendiente relacionado, reconsideraría aceptar un
mandato futuro de esa empresa sin el mismo nivel de reserva.
```

**Recordatorio aparte (no parte del diario):** como esta decisión toca
directamente la relación con un cliente activo de litigio, Jorge debe
además dejar constancia formal de la evaluación del posible conflicto en
el expediente correspondiente, siguiendo las reglas del despacho — este
diario no sustituye esa constancia.

## Cierre — límite de esta skill

Este diario es un registro personal de aprendizaje, no el archivo oficial
del caso ni una opinión legal sobre si existió o no un conflicto de
interés real — eso lo determina el abogado responsable, apoyado si hace
falta en `control-conflictos-intake-co`. La única función de esta skill es
capturar la decisión con honestidad suficiente para que, meses después,
Jorge pueda comparar lo que predijo contra lo que realmente pasó.
