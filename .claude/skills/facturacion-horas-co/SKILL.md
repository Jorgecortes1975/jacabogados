---
name: facturacion-horas-co
description: Revisa el registro de horas (time entries) y el WIP del periodo antes de facturar, señala descripciones vagas o no defendibles y horas que exceden el presupuesto pactado, y arma el borrador de cuenta de cobro con el desglose exigido por la cláusula de transparencia del Módulo 03 — sin decidir por sí sola qué se cobra. Úsala cuando el usuario pida revisar el registro de horas antes de facturar o preparar el borrador de una cuenta de cobro.
---

# Revisión de horas y WIP antes de facturar (Colombia)

Modelo recomendado: **Claude Haiku 4.5** (`claude-haiku-4-5`). Es una tarea de volumen (decenas o cientos de entradas por cliente al mes) y de bajo riesgo si se aplica la regla de seguridad de abajo, porque la skill nunca decide sola — solo señala.

## Regla de seguridad obligatoria (no negociable)

Esta skill **nunca decide** qué horas se le cobran o no al cliente, ni aplica descuentos, castigos ni redondeos por su cuenta. Su único producto es una lista de anomalías y un borrador de cuenta de cobro **pendiente de aprobación**. La decisión final —qué se cobra, qué se ajusta, qué se descarta— es siempre del socio a cargo de la facturación de ese cliente.

## Contexto

Esta skill hace cumplir, en la práctica, la cláusula de honorarios y transparencia del Módulo 03: "las eficiencias derivadas del uso de IA no representen una facturación adicional o duplicada de tiempo no efectivamente dedicado por el profesional." Si el uso de IA le ahorró tiempo al abogado, ese ahorro no se traslada al cliente como horas fantasma; y si el uso de IA generó trabajo extra por corregir un error suyo, ese tiempo tampoco se traslada al cliente.

## Proceso (4 pasos)

**1. Revisar cada entrada de tiempo del periodo.**
Lee la descripción tal como quedó registrada. Señala como "vaga" cualquier entrada que no permita reconstruir, sin preguntar a nadie más, qué se hizo, sobre qué documento o asunto, y para qué. Ejemplos de bandera roja: "trabajo en el caso", "revisión de documentos", "llamada con cliente", "varios". Una entrada defendible especifica el documento o trámite, la acción concreta y el objetivo (ej. "revisión de la cláusula de indemnidad del contrato de suministro con Proveedor XYZ para identificar exposición ante incumplimiento").

**2. Comparar el acumulado del mes contra el presupuesto pactado con el cliente.**
Suma las horas (o el valor) facturables del periodo por cliente/asunto y compáralas contra el presupuesto o fee cap acordado. Si el acumulado supera el **80%** del presupuesto, márcalo como alerta de sobrepaso inminente, aunque todavía no se haya excedido. Si ya lo superó, márcalo como alerta de sobrepaso confirmado. En ambos casos, indica que se requiere alerta previa al cliente si el acuerdo la exige.

**3. Verificar que ninguna hora facturada corresponda a configuración o corrección de un error de la IA.**
Revisa las notas o descripciones en busca de señales de que el tiempo registrado se usó para ajustar prompts, corregir una salida incorrecta de una herramienta de IA, revalidar un resultado que la IA produjo mal, o resolver un problema técnico de la herramienta. Ese tiempo no es facturable al cliente bajo ninguna circunstancia — señálalo para que se excluya de la cuenta de cobro, no para que se reclasifique como otra actividad.

**4. Generar el borrador de cuenta de cobro con desglose por actividad.**
Agrupa las horas no señaladas como problemáticas por tipo de actividad (ej. investigación, redacción, revisión, reuniones, litigio) con su tiempo y descripción, tal como exige la cláusula de transparencia. Incluye, en un anexo separado, la lista completa de anomalías detectadas en los pasos 1–3 para que el socio decida caso por caso antes de emitir la factura final.

## Mini-ejemplo de tabla de revisión

| Abogado | Descripción original | Problema detectado | Acción sugerida |
|---|---|---|---|
| J. Ramírez | "Trabajo en el caso Acme" | Descripción vaga — no se puede reconstruir la actividad ni el documento | Pedir al abogado que especifique el trabajo antes de incluirlo en la cuenta |
| M. Torres | "Revisión de documentos (3.5h)" | Vaga, sin especificar cuáles documentos ni para qué propósito | Solicitar detalle; no facturar hasta aclarar |
| C. Duarte | "Ajuste de prompt y reintento de resumen de contrato" (0.8h) | Corresponde a corrección de un error de la herramienta de IA, no a trabajo sustantivo para el cliente | Excluir de la cuenta de cobro; no se factura al cliente |
| A. Gómez | Acumulado del mes: 42h sobre un presupuesto de 50h | Supera el 80% del presupuesto pactado (84%) | Alertar al socio y al cliente antes de seguir facturando horas adicionales |

## Cierre

El socio a cargo de la cuenta del cliente es quien aprueba la factura final. Esta skill no reemplaza ese juicio profesional: reduce el riesgo de que lleguen a esa revisión horas mal descritas, no defendibles, o indebidamente facturadas — nada más.
