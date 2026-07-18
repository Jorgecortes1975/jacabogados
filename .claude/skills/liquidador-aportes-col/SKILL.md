---
name: liquidador-aportes-col
description: >
  Liquidación de nómina, aportes a seguridad social, parafiscales y prestaciones
  sociales en Colombia con validación previa de parámetros y doble control
  aritmético. Todo cálculo parte de la tabla de valores verificados del despacho
  (references/tabla-valores-2026.md) y ningún parámetro PENDIENTE se usa en un
  entregable a cliente sin verificación en vivo previa. Activar ante: liquidar
  nómina, calcular aportes, cotizaciones, PILA, seguridad social del trabajador,
  cuánto cuesta un empleado, costo de contratación, carga prestacional, liquidar
  prestaciones (cesantías, prima, vacaciones, intereses), liquidación final de
  contrato, recargos y horas extra, aportes de independientes, IBC, exoneración
  de parafiscales, provisión de nómina, presupuesto de personal. SIEMPRE activar
  cuando se pida cualquier cálculo de nómina, aportes o prestaciones bajo derecho
  laboral colombiano, incluso si el usuario solo pide "un estimado".
---

# LIQUIDADOR DE APORTES Y NÓMINA — Colombia

**Regla fundacional**: un cálculo con un parámetro desactualizado es una
alucinación con formato de tabla. Por eso este skill valida ANTES de calcular
y controla DESPUÉS de calcular. Nunca al revés.

---

## FASE 0 — VALIDACIÓN DE PARÁMETROS (obligatoria, antes de todo cálculo)

1. Leer `references/tabla-valores-2026.md` (la tabla maestra del despacho, con
   estado de verificación por parámetro).
2. Para cada parámetro que el cálculo vaya a usar:
   - **CONFIRMADO** (con fecha ≤ 12 meses y sin señal de cambio en el registro
     de vigilancia) → usar directamente, citando norma y fecha de verificación.
   - **PENDIENTE** o **s/d** → NO usar en entregable a cliente. Primero
     verificarlo en vivo con `vigilancia-normativa-col` (fuente primaria, URL,
     fecha) y actualizar la tabla maestra. Solo para borradores internos puede
     usarse marcado [Reformación pendiente] con advertencia visible.
3. Revisar en `normativa/registro-vigilancia.md` si hay pendientes que afecten
   los parámetros (ej. cambios de recargos en transición, reformas en trámite).
4. Enero de cada año: la tabla completa queda PENDIENTE hasta el barrido del
   Grupo 1 (valores anuales). El skill lo declara y no calcula con valores del
   año anterior sin decirlo.

## FASE 1 — INSUMOS DEL CASO (nunca inventar)

Pedir o extraer de los documentos del cliente; lo que falte se pregunta, no se
supone:
- Salario base y tipo (ordinario / integral / medio tiempo), variables del mes
  (comisiones, extras, recargos), fecha de ingreso.
- Clase de riesgo ARL de la actividad (I–V) — la asigna la actividad económica,
  no se adivina.
- Naturaleza del empleador (persona natural / jurídica) y si aplica exoneración
  de aportes (art. 114-1 E.T.): depende de tipo de empleador y salario.
- Para independientes: tipo de contrato e ingresos, para el IBC.
- Para liquidación final: fechas exactas, vacaciones tomadas, salario promedio.

## FASE 2 — LIQUIDACIÓN

Estructura estándar del cálculo mensual (empleado ordinario):

```
IBC = salario + variables que constituyen salario (sin auxilio de transporte)
     [respetar tope de 25 SMLMV y piso de 1 SMLMV]

SEGURIDAD SOCIAL          → % según tabla maestra (empleador / trabajador)
  Salud                   → sobre IBC
  Pensión                 → sobre IBC
  Fondo de Solidaridad    → solo si IBC ≥ 4 SMLMV (escala por rango)
  ARL                     → sobre IBC, tarifa por clase de riesgo (100% empleador)

PARAFISCALES              → sobre nómina (Caja, SENA, ICBF; verificar exoneración)

PRESTACIONES (provisión)  → base salario + auxilio de transporte (cuando aplique):
  Cesantías, intereses a las cesantías, prima de servicios
  Vacaciones              → base solo salario (sin auxilio)

AUXILIO DE TRANSPORTE     → solo si salario ≤ 2 SMLMV

RECARGOS (si hay trabajo nocturno/dominical/extra):
  usar los valores CONFIRMADOS de la tabla (franja nocturna, % vigente del
  dominical según fase de transición, límites de horas extra)
```

Reglas de cálculo:
- Redondeos: PILA aproxima al múltiplo de 100 más cercano por aporte (los
  pesos exactos se muestran, el ajuste PILA se anota aparte).
- Salario integral: factor prestacional incluido — solo cotiza sobre el 70%
  (verificar parámetro en tabla antes de aplicar).
- Todo cálculo muestra su fórmula: `concepto = base × % = resultado`, nunca
  solo el resultado.

## FASE 3 — DOBLE CONTROL (después de calcular, antes de entregar)

1. **Recomputar por vía alterna**: el total empleador debe reconstruirse
   sumando por columna Y por fila; si difieren, hay error — corregir antes de
   seguir.
2. **Rangos de sanidad**: costo total empleador ≈ 1.4–1.6 × salario para un
   ordinario ≤ 2 SMLMV sin recargos. Fuera de rango sin causa identificable →
   revisar, no entregar.
3. **Checklist**: ¿auxilio incluido/excluido correctamente en cada base?
   ¿exoneración aplicada solo si procede? ¿FSP solo desde 4 SMLMV? ¿tarifa ARL
   corresponde a la clase declarada por el cliente?
4. Cierre con `anti-hallucination-v3` si el resultado va al cliente.

## FASE 4 — ENTREGABLE

- Tabla de liquidación con: concepto, base, %, valor empleador, valor
  trabajador, norma fuente (de la tabla maestra) — y costo total mensual y
  anual del trabajador.
- Nota fija al pie: parámetros usados con su fecha de verificación + "cálculo
  ilustrativo profesional; la liquidación oficial se hace en PILA".
- Si el cliente lo va a reutilizar: generar calculadora interactiva con
  `artefactos-juridicos-lexa` (los parámetros de la calculadora salen de la
  tabla maestra, con su fecha, nunca incrustados sin fuente).

---

## REGLAS DURAS

1. FASE 0 no se salta ni "para un estimado rápido": un estimado con parámetro
   viejo es un error entregado rápido.
2. Parámetro PENDIENTE o s/d jamás aparece en un entregable a cliente como
   cifra firme.
3. Cada número del resultado es rastreable: base × % = valor, con norma.
4. Los insumos del cliente que falten se preguntan; el skill no rellena
   salarios, clases de riesgo ni fechas.
5. Si la liquidación toca un caso en litigio o una fiscalización UGPP en curso,
   advertir el límite del despacho (remitir a especialista) — CLAUDE.md.

## VINCULACIÓN

| Skill | Relación |
|---|---|
| `vigilancia-normativa-col` | Verifica en vivo todo parámetro PENDIENTE (FASE 0) |
| `anti-hallucination-v3` | Cierre obligatorio de entregables a cliente |
| `artefactos-juridicos-lexa` | Calculadoras interactivas reutilizables |
| `kit-entregables-col` | Formato final (Excel/PDF/HTML) para el cliente |
| `normalizador-datos-col` | Limpieza de nóminas o CSV aportados por el cliente |
