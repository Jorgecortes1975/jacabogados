---
name: control-conflictos-intake-co
description: Cruza cliente potencial, contraparte y terceros relacionados contra el historial de clientes/casos del despacho para señalar coincidencias de conflicto de interés, y genera el formulario de apertura de expediente — sin decidir nunca por sí misma si hay o no conflicto.
---

# Control de Conflictos de Interés e Intake de Nuevos Clientes (Colombia)

## Regla de seguridad no negociable

Esta skill **nunca** determina que "no hay conflicto de interés". Solo puede reportar:
1. Coincidencias encontradas en la base histórica del despacho, con su clasificación, o
2. Ausencia de coincidencias en la búsqueda realizada.

En ambos casos debe dejarse constancia expresa de que **la ausencia de coincidencia no equivale a ausencia de conflicto**. Pueden existir relaciones societarias, familiares, de representación o de interés económico real que no estén registradas en la base de datos del despacho. Bajo la Ley 1123 de 2007 (Código Disciplinario del Abogado), el conflicto de interés no declarado es una de las faltas más graves de la profesión — la responsabilidad de verificar exhaustivamente y de decidir recae siempre en un humano, nunca en esta herramienta.

## Modelo recomendado

- **Claude Sonnet 5** (`claude-sonnet-5`) para el cruce estándar de nombres, razones sociales y NITs contra la base histórica.
- **Claude Opus 4.8** (`claude-opus-4-8`) cuando el asunto involucra grupos empresariales, estructuras matriz-filial, o cadenas de control societario complejas que requieren razonamiento sobre relaciones indirectas.

## Proceso de 5 pasos

**1. Extraer las partes relevantes del nuevo asunto.**
Identificar y listar de forma explícita: cliente potencial (persona natural o jurídica, con NIT/cédula si está disponible), contraparte(s), terceros con interés en el resultado, sociedades relacionadas o vinculadas (matrices, filiales, subordinadas, socios comunes), y representantes legales o apoderados de cada parte.

**2. Cruzar cada nombre contra el histórico del despacho.**
Buscar cada nombre extraído en la base de clientes y casos cargada en el Project (histórico de clientes activos, clientes anteriores, contrapartes en litigios previos, y terceros intervinientes). Buscar coincidencias exactas y también variaciones razonables (razón social abreviada, error tipográfico evidente, nombre comercial vs. razón social registrada).

**3. Clasificar cada coincidencia encontrada.**
- **Sin conflicto aparente**: el nombre coincide pero el contexto documentado (tipo de asunto, fecha, partes) no sugiere relación con el nuevo caso.
- **Conflicto potencial (requiere análisis)**: existe alguna relación indirecta, societaria, temporal o de representación que amerita revisión humana antes de aceptar.
- **Conflicto real**: el despacho representó o representa a la contraparte del nuevo asunto, o a una parte con interés directo y opuesto, en un asunto relacionado.

Cada clasificación debe ir acompañada de la evidencia concreta encontrada (nombre del caso histórico, fecha, rol de la parte) — nunca como una afirmación sin sustento.

**4. Generar el formulario de apertura de expediente.**
Con los datos ya verificados (nombres correctos, NITs, roles de las partes), producir el formulario de apertura de expediente que use el despacho, incluyendo: datos del cliente, datos de la contraparte, tipo de asunto, socio responsable propuesto, y una sección de "Resultado del chequeo de conflictos" con el resumen de los pasos 2 y 3.

**5. Dejar constancia cuando no se encontró ninguna coincidencia.**
Si la búsqueda no arroja resultados, indicarlo expresamente en el formulario con una nota como:

> "No se encontraron coincidencias en la base de datos histórica del despacho para las partes listadas. Esta ausencia de coincidencia NO garantiza la ausencia de conflicto de interés: pueden existir relaciones societarias, familiares o de representación no registradas en la base de datos. Se recomienda verificación adicional por el socio responsable antes de aceptar el asunto."

## Mini-ejemplo de resultado de cruce

| Parte buscada | Tipo de coincidencia encontrada | Clasificación |
|---|---|---|
| Constructora Andina S.A.S. (contraparte del nuevo asunto) | El despacho representó a esta misma sociedad como cliente en el expediente 2023-114 (contrato de obra) | **Conflicto real** — requiere declinar o evaluar muralla de información |
| Inversiones del Valle Ltda. (sociedad relacionada al cliente potencial, mismo representante legal) | Aparece como tercero interviniente en el expediente 2021-058, sin relación de representación directa por el despacho | **Conflicto potencial** — requiere análisis del socio responsable |
| Juan Pablo Restrepo Ocampo (representante legal del cliente potencial) | Coincidencia de nombre con un cliente de asesoría laboral en 2019, sin relación con el asunto actual | **Sin conflicto aparente** — verificar de todos modos que sea la misma persona |

## Cierre: la decisión nunca la toma esta skill

Esta herramienta señala coincidencias y su ausencia; **no decide**. La decisión de aceptar el asunto, declinarlo, o levantar una muralla de información (information barrier) frente a un conflicto potencial o real corresponde **siempre y exclusivamente** al socio responsable del caso o al comité de ética del despacho. Ningún resultado generado por esta skill constituye autorización para abrir el expediente sin esa revisión humana.
