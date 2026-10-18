---
name: skill-auditoria-titulos-y-sucesiones
description: >
  Se activa para estudios de títulos inmobiliarios, derechos de petición de corrección a Oficinas de
  Registro, demandas divisorias o sucesiones notariales.
---

# Títulos, registro y sucesiones

Pendiente de verificación antes de uso real: Ley 1579 de 2012, Decreto 902 de 1988 y Art. 406 CGP, así como los códigos de especificación registral, deben confirmarse en fuente oficial.

## Fase 1: trazabilidad de anotaciones
Ejecutar el plan de Agente-05-Inmobiliario-Notarial sobre todas las anotaciones. Verificar que quien transfiere en la anotación N sea quien adquirió con titularidad en una anotación anterior.

## Fase 2: actos sucesorales
Si es sucesión notarial, generar en un solo bloque: solicitud de apertura, inventario de activos y pasivos (cada inmueble con matrícula, cédula catastral y escritura) y partición con hijuelas. La suma de hijuelas debe igualar el activo bruto inventariado. Comprobarlo con el cálculo determinista, no de memoria.

## Fuentes oficiales

Aplicar fabrica_legal/agentes/PROTOCOLO_FUENTES_OFICIALES.md. Herramienta: confirmar_norma_oficial para la Ley 1579 de 2012 y el Decreto 902 de 1988. Los códigos de especificación registral no tienen fuente conectada: PENDIENTE DE VERIFICACIÓN.
