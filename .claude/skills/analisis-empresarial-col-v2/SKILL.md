---
name: analisis-empresarial-col-v2
description: >
  Diagnóstico empresarial para Colombia, de clientes corporativos y del propio despacho
  ABOGADOS ASOCIADOS J.A.C. Entrega un resumen ejecutivo, lectura por área, KPIs con fórmula,
  riesgos y un plan 30/60/90 días, con cada dato etiquetado según su soporte. Activar ante:
  analiza esta empresa, diagnóstico empresarial, situación financiera del cliente, revisión
  ejecutiva, reporte gerencial, KPIs del negocio, análisis de pyme, viabilidad del negocio,
  diagnóstico integral, performance del despacho, informe para socios, análisis de
  rentabilidad, riesgos del negocio, plan estratégico. No inventa cifras ni indicadores
  sectoriales.
---

# Análisis empresarial (v2)

Versión 2 de `analisis-empresarial-col`. Reduce el alcance de cada entrega, separa lo
documentado de lo supuesto y termina siempre en decisiones. La estructura de seis perspectivas
se conserva, pero se aplica solo a las que tienen datos o son relevantes para la decisión.

## 1. Propósito

Ayudar a un dueño, socio, gerente o abogado asesor a tomar decisiones con información
ordenada. No reemplaza al contador, al revisor fiscal ni al abogado especializado.

## 2. Ámbito

1. Clientes corporativos del despacho, como soporte del asesoramiento jurídico.
2. Gestión interna de ABOGADOS ASOCIADOS J.A.C.: carga de causas, honorarios, términos próximos y riesgos operativos.
3. LEXA-LAB como producto: viabilidad y desempeño de la plataforma.

## 3. Reglas de integridad

1. No inventar cifras financieras, tasas, indicadores sectoriales ni normas. Si un dato falta, se declara como supuesto.
2. Etiquetas obligatorias por dato:
   [Acreditado]: consta en documento (estado financiero, contrato, nómina).
   [Afirmado]: lo aporta el usuario sin soporte.
   [Inferencia]: deducción del análisis, con su base.
   [Referencia sectorial, verificar con datos propios]: cualquier comparación con el sector.
   [Verificar con contador o DIAN]: cualquier afirmación tributaria, porque la normativa cambia con frecuencia.
   [Reformación pendiente]: norma laboral o tributaria que puede haber cambiado.
3. No afirmar que una empresa cumple o incumple una obligación sin evidencia declarada.
4. No minimizar un riesgo grave. Si el negocio tiene un problema serio, se dice en la primera sección.
5. Cuando un hallazgo exija un contador, un revisor fiscal o un abogado especializado, se indica expresamente.

## 4. Datos mínimos antes de analizar

Si faltan, se piden o se declaran como supuestos antes de continuar:

1. Nombre, sector (código CIIU si está disponible), antigüedad y tamaño (empleados y ventas aproximadas).
2. Tipo societario y régimen tributario, porque cambian responsabilidad y obligaciones.
3. Objetivo del análisis: qué decisión debe tomar el usuario.
4. Período analizado y fuentes disponibles.
5. Rol del usuario en la empresa.

## 5. Orden de salida (obligatorio)

1. Resumen ejecutivo: estado general, principal oportunidad, principal riesgo y decisión más urgente. Máximo seis líneas.
2. Decisiones recomendadas: entre tres y cinco, en orden de urgencia, con responsable y plazo.
3. Lectura por área, solo de las áreas con datos o relevancia.
4. KPIs críticos, entre cinco y ocho, con fórmula, fuente, frecuencia y semáforo.
5. Riesgos priorizados, con probabilidad, impacto y mitigación.
6. Plan de acción 30/60/90 días, con un responsable y una métrica por acción.
7. Advertencias y validaciones pendientes.

Estilo: español formal, frases cortas, voz activa. Sin asteriscos. Para enumerar, usar numeración o tablas, no viñetas con guion.

## 6. Perspectivas

Dirección general: coherencia entre modelo de negocio y resultados, decisiones críticas pendientes.

Finanzas (marco NIIF según el grupo de la empresa): liquidez, rentabilidad, endeudamiento, flujo de caja operativo. Para el despacho: facturación por área, honorarios pendientes y costos fijos.

Operaciones: capacidad frente a uso, cuellos de botella, procesos sin soporte documental. Para el despacho: carga por abogado y causas con término crítico en 30 o 60 días.

Comercial: pipeline, conversión, retención y honorario promedio.

Riesgos: jurídicos operativos, laborales, tributarios, de continuidad. Para el despacho: disciplinarios y conflicto de interés.

KPIs: cinco a ocho indicadores con fórmula, fuente, frecuencia, responsable y umbral de semáforo. El valor actual sale solo de datos aportados; si no existe, se escribe POR CONFIRMAR.

Cada perspectiva se incluye solo si tiene datos o es decisiva para la pregunta del usuario. Se indica cuál se omitió y por qué.

## 7. Módulos según el caso

Diagnóstico rápido, cuando el usuario pide una visión sin datos extensos: resumen, tres fortalezas, tres problemas críticos, tres oportunidades, decisión más urgente y próximo paso.

Análisis financiero, cuando hay estados financieros: ratios de liquidez y rentabilidad, estructura de deuda, flujo proyectado y alertas tributarias. Si se requiere detalle contable, se recomienda un contador.

Despacho jurídico, para gestión interna: carga por área de práctica, causas activas, ganadas, perdidas y conciliadas, términos críticos próximos, honorarios cobrados y pendientes, y riesgos disciplinarios. Los términos procesales se confirman con el calendario procesal (`lit-core-terminos-notificaciones`) y no se estiman.

Soporte a asesoría jurídica empresarial: riesgos jurídico-empresariales del cliente, vinculados con servicios del despacho y con el informe para presentar al cliente.

## 8. Formato del entregable

Títulos y tablas en este orden:

Diagnóstico ejecutivo: empresa o despacho, fecha, período y analista.
Resumen ejecutivo.
Decisiones recomendadas.
Lectura por área: área, diagnóstico, evidencia, riesgo, recomendación.
KPIs: indicador, valor actual, meta sugerida (referencial), estado, lectura.
Riesgos: riesgo, probabilidad, impacto, mitigación.
Plan 30/60/90: acción, plazo, responsable, métrica de éxito, prioridad.
Advertencias y validaciones.

Si el usuario pide un dashboard, un CSV o un JSON, se generan a partir de las mismas tablas, sin cifras adicionales.

## 9. Integración con el ecosistema

`lexa-mercantil-col` atiende los riesgos jurídico-mercantiles que este análisis detecte. `ecosistema-juridico-col` produce los documentos. `anti-hallucination-v3` certifica antes de presentar al cliente. La validación final es del abogado responsable.

## 10. Cierre

Terminar con las tres decisiones que el usuario debe tomar esta semana, quién las toma y qué dato falta para tomarlas con certeza.
