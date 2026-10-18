---
name: skill-contestacion-demanda-forense
description: >
  Se activa cuando el abogado pide redactar, estructurar o auditar una contestación de demanda
  (CGP, CPTSS o CPACA), proponer excepciones previas o de mérito, o pronunciarse sobre los hechos
  de un libelo. Requiere EXPEDIENTE.md del caso.
---

# Contestación de demanda

Pendiente de verificación antes de uso real: los artículos 96 del CGP, 31 del CPTSS y 175 del CPACA, los términos de traslado (10, 20 y 30 días hábiles, según el manual) y los artículos de prescripción citados (488 del CST, 151 del CPTSS, 2536 del Código Civil) deben confirmarse en fuente oficial. El manual no los verificó.

## Fase 1: montaje de memoria
1. Cargar el recurso expediente://{expediente_id}/constitucion. Si no existe, detener el trabajo.
2. Extraer los hechos y pretensiones numerados de la demanda.
3. Ejecutar calcular_termino_judicial_colombia para confirmar que la contestación está dentro del término.

## Fase 2: matriz hecho por hecho
Clasificación única: ES CIERTO, NO ES CIERTO, PARCIALMENTE CIERTO o NO CONSTA AL DEMANDADO.
Todo hecho que se niegue o no conste lleva en la misma cláusula la razón exacta con el folio de EXPEDIENTE.md.

## Fase 3: excepciones
Evaluar prescripción o caducidad con el cómputo determinista, inexistencia de la obligación, pago, compensación y buena fe, esta última sujeta a la jurisprudencia de la Sala de Casación Laboral que se confirme.

## Fase 4: compuerta
Pasar el borrador por Agente-06-Contralor-Senior. Sin dictamen APPROVED no se entrega.

## Fuentes oficiales

Aplicar fabrica_legal/agentes/PROTOCOLO_FUENTES_OFICIALES.md. Herramientas: texto_sentencia_cc para cada providencia que se cite como precedente, y confirmar_norma_oficial para cada norma de la excepción. Toda cita sin resultado OK queda PENDIENTE DE VERIFICACIÓN en el memorial borrador.
