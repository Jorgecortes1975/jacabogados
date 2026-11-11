---
name: plan-90-dias-col-v2
description: >
  Convierte un diagnóstico o una estrategia en un plan de ejecución de 30, 60 y 90 días
  con un responsable por acción, métricas con fórmula, criterio de cierre y decisiones
  pendientes para la dirección. Uso para el despacho, para clientes empresariales y para
  LEXA-LAB. Activar ante: plan de acción, plan de 90 días, plan 30/60/90, plan de
  ejecución, hoja de ruta, roadmap, plan de recuperación, plan de mejora, cronograma de
  ejecución, plan trimestral, plan de arranque. No inventa cifras: lo que no se conoce se
  marca como POR CONFIRMAR.
---

# Plan de ejecución 30/60/90 días (v2)

Versión 2 de `plan-90-dias-col`. Cambia el formato de salida para que sea ejecutable y
revisable por una dirección, sin cambiar la metodología base.

## 1. Propósito

Un plan es útil cuando cada acción tiene una persona, una fecha, una métrica medible y un
criterio objetivo de cierre. Si falta uno de esos cuatro elementos, la acción queda marcada
como incompleta y no se presenta como compromiso.

## 2. Reglas de integridad (obligatorias)

1. No inventar cifras. Facturación, número de clientes, márgenes, plazos y líneas base solo se usan si el usuario o una fuente los aporta. Si no existen, se escribe POR CONFIRMAR.
2. Los ejemplos de metas de la sección 9 son ilustrativos. No se trasladan a un plan real sin confirmación del usuario.
3. Un responsable por acción. Si son varios, se nombra uno como responsable y los demás como apoyo.
4. Una métrica por acción, con fórmula y fuente del dato (sistema, hoja, informe). "Mejorar la atención" no es una métrica.
5. Si una acción tiene un plazo legal o procesal, no se fija fecha por estimación. Se indica que la fecha debe confirmarse con el calendario procesal (`lit-core-terminos-notificaciones`) y se marca POR CONFIRMAR.
6. Si el usuario no indica el modo (despacho, cliente empresa, LEXA-LAB, caso jurídico o marketing), se pregunta antes de construir el plan.

## 3. Entrada mínima

Antes de construir el plan, debe quedar claro:

1. Problema u oportunidad que origina el plan.
2. Objetivo medible a 90 días y su línea base, o la indicación de que la línea base está POR CONFIRMAR.
3. Recursos disponibles: personas con su dedicación, presupuesto y tiempo.
4. Restricciones: contratos, términos, liquidez, aprobaciones.
5. Quién aprueba, ejecuta y mide cada acción.

Si falta la línea base o el diagnóstico, se usa primero `analisis-empresarial-col`.

## 4. Priorización

| Cuadrante | Descripción | Prioridad |
|---|---|---|
| Alto impacto y bajo esfuerzo | Ejecutar primero | P1 |
| Alto impacto y alto esfuerzo | Planificar con hitos | P2 |
| Bajo impacto y bajo esfuerzo | Después de P1 y P2 | P3 |
| Bajo impacto y alto esfuerzo | Descartar y dejar constancia | P4 |

## 5. Formato de salida

Orden fijo del entregable:

1. Decisiones para la dirección. Máximo tres, cada una con fecha límite y quién decide.
2. Resumen ejecutivo en un párrafo: objetivo, punto de partida, resultado esperado a 90 días, riesgo principal.
3. Condiciones de inicio (día 0), en lista de verificación.
4. Tres horizontes con tabla de acciones (ver sección 6).
5. Hito de cierre de cada mes, con su criterio de éxito.
6. Riesgos con probabilidad, impacto y mitigación.
7. Tablero semanal de seguimiento.

Estilo: español formal, frases cortas, voz activa. Sin asteriscos. Para enumerar, usar numeración o tablas, no viñetas con guion.

## 6. Tabla de acción (campos obligatorios)

| # | Acción | Responsable | Fecha límite | Métrica (fórmula y fuente) | Criterio de cierre | Prioridad | Estado |
|---|---|---|---|---|---|---|---|

Ejemplo de llenado correcto, con datos ficticios para ilustrar el formato:
Acción "Depurar base de clientes activos" | Responsable "Gerente comercial" | Fecha "Día 20" | Métrica "Clientes con contacto en 90 días / total activos; fuente: CRM" | Criterio "Base sin duplicados y cada registro con responsable asignado" | P1 | En curso.

## 7. Horizontes

Horizonte 1, días 1 a 30, "estabilizar y ganar rápido": atender lo urgente, activar acciones P1 y medir la línea base.
Horizonte 2, días 31 a 60, "construir y escalar": ejecutar los proyectos P2 y consolidar lo logrado.
Horizonte 3, días 61 a 90, "consolidar y medir": comparar contra la línea base del día 0, decidir continuar, ajustar o cambiar la estrategia.

El día 90 incluye siempre una acción de evaluación con responsable y fecha, marcada P1.

## 8. Tablero de seguimiento y alertas

Semáforo por acción: Verde (en tiempo), Amarillo (en riesgo, con fecha de revisión), Rojo (bloqueado, con decisión requerida).

Alerta de ejecución: si al día 30 más del 30 por ciento de las acciones están en rojo, el plan se revisa antes de continuar. La revisión decide entre reducir alcance, ampliar recursos o cambiar de estrategia.

## 9. Ejemplos de metas por modo (ilustrativos, no vinculantes)

Despacho: organizar causas con términos críticos; captar clientes empresariales; definir indicadores de gestión.
Cliente empresa en dificultades: diagnóstico financiero; identificar gastos a reducir; revisar contratos críticos.
LEXA-LAB: definir modelo de monetización; activar piloto con clientes; medir adquisición.
Marketing: definir calendario de contenido; medir captación por canal.

Cada meta de estos ejemplos debe reemplazarse por la cifra confirmada por el usuario antes de entregar el plan.

## 10. Entregable

Si el usuario pide documento, usar `kit-entregables-col` para el formato final. El tablero se puede construir con `dashboard-ejecutivo-col`.

## 11. Cierre

Terminar el plan con: qué debe confirmar la dirección, qué datos siguen POR CONFIRMAR y cuál es la primera acción que se ejecuta mañana.
