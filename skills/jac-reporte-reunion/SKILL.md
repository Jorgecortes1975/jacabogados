---
name: jac-reporte-reunion
description: Convierte notas desordenadas de una reunión con cliente en dos documentos separados, un reporte para el cliente con formato fijo y una nota interna, sin inventar avances, con máximo tres próximos pasos y sin incluir información confidencial ni de terceros. Usar cuando el usuario pida un reporte, resumen o acta de una reunión con cliente, o escriba /jac-reporte-reunion.
---

# JAC Reporte de Reunión con Cliente

Transfiere el criterio del abogado responsable al reporte: qué incluir, qué excluir y qué no inventar. Esta Skill no verifica normas ni sentencias. Si la reunión menciona una norma o una providencia, la registra como dicha por las partes y no la cita como verificada.

## Paso 0: control de aislamiento

Antes de redactar, revisar si las notas corresponden a un solo cliente y un solo asunto.

Si las notas mencionan más de un cliente o más de un asunto, detenerse. No redactar ningún reporte. Responder que las notas deben separarse por asunto y pedir al usuario que las envíe por separado. Mezclar asuntos es un error de confidencialidad, no un problema de formato.

## Paso 1: entrega preliminar cuando faltan datos

Si faltan datos básicos (fecha, asunto, participantes), no detener el trabajo. Redactar con [POR CONFIRMAR] en el lugar del dato faltante y listar los datos faltantes en la nota interna. No suponer ningún dato.

## Proceso

1. Identificar asunto, fecha y participantes a partir de las notas.
2. Clasificar cada línea de las notas: tema tratado, avance, compromiso del cliente, compromiso del despacho, próximo paso, observación interna o información excluida.
3. Aplicar los criterios de inclusión y exclusión.
4. Redactar los dos documentos de salida.
5. Ejecutar la lista de verificación final antes de entregar.

## Criterios de inclusión y exclusión

Incluir en el reporte para el cliente:
1. Temas tratados con el cliente.
2. Avances ocurridos, según las notas.
3. Compromisos del cliente y del despacho, con responsable y fecha si constan.
4. Hasta tres próximos pasos.

Excluir del reporte para el cliente:
1. Observaciones internas del abogado, como valoraciones de estrategia o juicios sobre personas.
2. Datos personales o sensibles de terceros que no sean parte del asunto.
3. Información de otros clientes del despacho.
4. Opiniones sobre la contraparte que no hayan sido expresadas en la reunión.

Las exclusiones no se pierden. Van en la nota interna, indicando la categoría del dato y nunca el dato.

## Reglas obligatorias

1. Máximo tres próximos pasos. Si las notas tienen más, seleccionar los tres de mayor prioridad y pasar el resto a la nota interna.
2. Si no hubo avances, escribir "No hubo avances en esta reunión". No inventar avances para completar el formato.
3. No añadir hechos que no estén en las notas.
4. No citar normas, sentencias ni cifras que no consten en las notas.
5. Nomenclatura fija: `Reporte_Cliente_AAAA-MM-DD_[asunto-abreviado].md` y `Nota_Interna_AAAA-MM-DD_[asunto-abreviado].md`. Si falta la fecha, usar `SIN-FECHA` y marcarlo en el documento.

## Documento 1: reporte para el cliente

```
# Reporte de reunión con cliente

Fecha: [AAAA-MM-DD o POR CONFIRMAR]
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
```

Este documento no contiene observaciones internas. Sin datos de terceros, sin valoraciones de estrategia y sin [POR CONFIRMAR] que revelen notas internas. Los [POR CONFIRMAR] se resuelven antes de enviar.

## Documento 2: nota interna

```
# Nota interna. Uso interno, no enviar al cliente

Asunto: [asunto]
Fecha: [AAAA-MM-DD o POR CONFIRMAR]

## Observaciones del abogado
- [observación]

## Pasos adicionales no incluidos (más de tres)
- [paso]

## Datos excluidos por confidencialidad o por ser de terceros
- [categoría del dato, sin el dato]

## Datos faltantes y puntos por confirmar
- [dato]
```

## Lista de verificación final

Antes de entregar, confirmar cada punto. Si uno falla, corregir antes de entregar.

1. Las notas corresponden a un solo asunto.
2. El reporte para el cliente no contiene observaciones internas ni datos de terceros.
3. Hay como máximo tres próximos pasos en el reporte.
4. Cada avance del reporte aparece en las notas.
5. No hay normas, sentencias ni cifras que no consten en las notas.
6. Los datos faltantes aparecen como [POR CONFIRMAR] y listados en la nota interna.
7. Los nombres de archivo siguen la nomenclatura fija.

## Revisión antes de enviar

El reporte no sale del despacho sin revisión del abogado responsable. La Skill no envía correos ni comparte documentos.

## Límites

1. No sustituye el criterio del abogado sobre qué debe conocer el cliente.
2. No verifica hechos ni fechas que no estén en las notas.
3. Si las notas están incompletas, lo indica con [POR CONFIRMAR]; no lo completa con suposiciones.
