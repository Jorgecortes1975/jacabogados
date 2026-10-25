---
name: jac-reporte-reunion
description: Convierte notas desordenadas de una reunión con cliente en un reporte profesional con formato fijo, sin inventar avances, con máximo tres próximos pasos y sin incluir información confidencial ni de terceros. Usar cuando el usuario pida un reporte, resumen o acta de una reunión con cliente, o escriba /jac-reporte-reunion.
---

# JAC Reporte de Reunión con Cliente

Transfiere el criterio del abogado responsable al reporte: qué incluir, qué excluir y qué no inventar. Esta Skill no verifica normas ni sentencias. Si la reunión menciona una norma o una providencia, la menciona como dicha por las partes, sin citarla como verificada.

## Entrada

Notas de la reunión, en cualquier formato. Si faltan datos básicos (fecha, participantes del cliente, asunto), pedirlos antes de redactar; no suponerlos.

## Proceso

1. Identificar el asunto y la fecha de la reunión a partir de las notas.
2. Clasificar cada línea de las notas en una de estas categorías: tema tratado, avance, compromiso del cliente, compromiso del despacho, próximo paso, observación interna, información excluida.
3. Aplicar los criterios de inclusión y exclusión de la sección siguiente.
4. Redactar el reporte con el formato fijo.
5. Marcar con [POR CONFIRMAR] cualquier dato ambiguo en las notas.

## Criterios de inclusión y exclusión

Incluir en el reporte:
1. Temas tratados con el cliente.
2. Avances efectivamente ocurridos, según las notas.
3. Compromisos del cliente y del despacho, con responsable y fecha si constan.
4. Hasta tres próximos pasos.

Excluir del reporte, en la salida al cliente:
1. Observaciones internas del abogado, como valoraciones de estrategia o del estado emocional de personas.
2. Datos personales o sensibles de terceros que no sean parte del asunto.
3. Información de otros clientes del despacho.
4. Opiniones sobre la contraparte que no hayan sido dichas en la reunión.

Las observaciones internas no se descartan: van en una sección separada, marcada como "Uso interno, no enviar al cliente".

## Reglas obligatorias

1. Máximo tres próximos pasos. Si las notas tienen más, seleccionar los tres de mayor prioridad y listar el resto en la sección interna.
2. Si no hubo avances, escribir "No hubo avances en esta reunión". No inventar avances para completar el formato.
3. No añadir hechos que no estén en las notas.
4. No citar normas, sentencias ni cifras que no consten en las notas.
5. Usar siempre el mismo formato y la misma nomenclatura de archivo: `Reporte_Reunion_AAAA-MM-DD_[asunto-abreviado].md`.

## Salida

```
# Reporte de reunión con cliente

Fecha: [AAAA-MM-DD]
Asunto: [asunto]
Participantes del cliente: [nombres y cargos, si constan]
Participantes del despacho: [nombres, si constan]

## 1. Resumen ejecutivo
[Dos a cuatro líneas]

## 2. Temas tratados
- [tema]

## 3. Avances
- [avance, o "No hubo avances en esta reunión"]

## 4. Compromisos
| Parte | Compromiso | Fecha |
|---|---|---|

## 5. Próximos pasos (máximo tres)
1. [paso]

---

## Uso interno, no enviar al cliente

- Observaciones internas: [...]
- Pasos adicionales no incluidos: [...]
- Datos excluidos por confidencialidad o por ser de terceros: [solo se indica la categoría, no el dato]
- Puntos por confirmar: [...]
```

## Revisión antes de enviar

El reporte no sale del despacho sin revisión del abogado responsable. La Skill no envía correos ni comparte documentos.

## Límites

1. No sustituye el criterio del abogado sobre qué debe conocer el cliente.
2. No verifica hechos ni fechas que no estén en las notas.
3. Si las notas están incompletas, el reporte lo indica; no lo completa con suposiciones.
