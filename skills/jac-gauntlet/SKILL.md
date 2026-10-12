---
name: jac-gauntlet
description: Protocolo JAC Gauntlet Elite de producción y control de calidad jurídico. Delimita el asunto, produce, verifica con herramientas, somete a revisión adversarial independiente, corrige, revalida y entrega con estado BLOCKED, CONDITIONAL o PASS. Usar cuando el usuario escriba /JAC-GAUNTLET ELITE o pida un escrito, demanda, tutela, recurso, poder, contrato o concepto de importancia.
---

# JAC Gauntlet Elite

Lea el protocolo completo con `python3 -m jac protocolo` (si falla, ver las instrucciones de PYTHONPATH en el skill jac-agente) y aplíquelo. Resumen operativo:

1. Tarea. Fije objetivo, producto, partes, radicado, jurisdicción y la fecha de referencia de la que derivará todo término o cálculo. Si hay una carpeta de expediente, ejecute `python3 -m jac inventario <carpeta>`; identifique cada documento por su contenido y no declare revisado el expediente mientras haya archivos sin leer.
2. Producción. Redacte la versión inicial. No la entregue.
3. Controles automáticos. Guarde el texto en un archivo y ejecute `python3 -m jac validar <archivo> --radicado <radicado> --json ronda1.json`. Corrija lo subsanable.
4. Revisión adversarial. Invoque el agente `jac-revisor` con la herramienta Agent, entregándole únicamente el documento, sus fuentes y el informe del paso 3, nunca su razonamiento. Si el plugin croma-jac está instalado, puede sumar su Release Gate (`/jac-release`). Si no hay agentes disponibles, haga la revisión usted mismo y declare que es interna, no independiente.
5. Corrección y revalidación. Corrija los hallazgos, vuelva a ejecutar `jac validar ... --previo ronda1.json --json ronda2.json` y revise solo lo afectado. Máximo dos rondas; una tercera solo si quedan fallos corregibles relevantes. Registre solo las rondas efectivamente hechas.
6. Entrega. El documento solicitado, completo y utilizable, con los datos faltantes marcados PENDIENTE DE VERIFICACIÓN, más un control final: estado, fuentes efectivamente consultadas, rondas reales, si la revisión fue independiente o interna, errores corregidos, pendientes y riesgos que requieren decisión del abogado.

Estados. BLOCKED: cita inexistente o discrepante, error procesal crítico, fecha imposible, contradicción sustancial o error de cálculo material. CONDITIONAL: verificaciones pendientes identificadas; no apto para firma ni radicación. PASS: todos los controles exigibles superados y revisión final del abogado. PASS_AUTOMATICO de la herramienta nunca equivale a PASS: no cubre vigencia de normas, hechos, términos ni cálculos.

Nunca invente hechos, normas, sentencias, radicados, fechas o cifras. No prometa porcentajes de exactitud. No sustituye la responsabilidad del abogado.
