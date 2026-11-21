# Registro de estado de los agentes de marketing

Fecha de corte: 2026-11-21
Rama: ccr-a9bdd722-fzrp37

Marca de esta versión: solo cuatro de los quince agentes de la propuesta tienen nombre y función recibidos. Los demás aparecen como NO RECIBIDO y no han sido revisados ni construidos.

## Agentes de la propuesta

| Nº | Nombre propuesto | Función declarada | Estado | Dónde está | Observación |
|---|---|---|---|---|---|
| 01 | ADN | Centraliza identidad, servicios, público, estilo institucional y restricciones de publicidad jurídica | PLANTILLA CREADA, NO APROBADA. Agente de consulta (jac-adn) CONSTRUIDO Y PROBADO | marketing/ADN-despacho.md; .claude/agents/jac-adn.md | Prueba del 21/11: respondió NO PERMITIDO con sección citada a dos preguntas de prueba. Requiere datos del despacho y aprobación escrita del abogado responsable. Nombre oficial pendiente. |
| 02 | Copy | Redacta publicaciones, guiones, textos comerciales y respuestas institucionales | CONSTRUIDO Y PROBADO EN ESTRUCTURA. Sin ADN aprobado solo entrega esqueletos con placeholders | .claude/agents/jac-copy.md | Prueba del 21/11: entregó la estructura sin inventar contenido. Aún no se ha probado con un ADN aprobado. Falta confirmar que aparece en una sesión nueva. |
| 03 | Inteligencia de contenido | Analiza temas, resultados, audiencia y propone calendario editorial | CONSTRUIDO Y PROBADO CON DATOS FICTICIOS (jac-inteligencia) | .claude/agents/jac-inteligencia.md; marketing/pruebas/metricas-sinteticas.csv | Prueba del 21/11: las cifras se recalcularon y coinciden. Todas las conclusiones salieron PRELIMINARES por muestra pequeña. Requiere exportaciones reales autorizadas por el despacho. |
| 04 | Consejo | Somete cada pieza a revisión jurídica, comercial, reputacional, factual y editorial | DEFINIDO Y REGISTRADO | .claude/agents/jac-consejo.md | Ejecutado una vez como revisión independiente sobre el piloto (marketing/piloto/revision-consejo.md). Debe ejecutarse antes de cualquier publicación. |
| 05 | NO RECIBIDO | NO RECIBIDO | NO REVISADO | Ninguno | Nombre y función no recibidos. |
| 06 | NO RECIBIDO | NO RECIBIDO | NO REVISADO | Ninguno | Nombre y función no recibidos. |
| 07 | NO RECIBIDO | NO RECIBIDO | NO REVISADO | Ninguno | Nombre y función no recibidos. |
| 08 | NO RECIBIDO | NO RECIBIDO | NO REVISADO | Ninguno | Nombre y función no recibidos. |
| 09 | NO RECIBIDO | NO RECIBIDO | NO REVISADO | Ninguno | Nombre y función no recibidos. |
| 10 | NO RECIBIDO | NO RECIBIDO | NO REVISADO | Ninguno | Nombre y función no recibidos. |
| 11 | NO RECIBIDO | NO RECIBIDO | NO REVISADO | Ninguno | Nombre y función no recibidos. |
| 12 | NO RECIBIDO | NO RECIBIDO | NO REVISADO | Ninguno | Nombre y función no recibidos. |
| 13 | NO RECIBIDO | NO RECIBIDO | NO REVISADO | Ninguno | Nombre y función no recibidos. |
| 14 | NO RECIBIDO | NO RECIBIDO | NO REVISADO | Ninguno | Nombre y función no recibidos. |
| 15 | NO RECIBIDO | NO RECIBIDO | NO REVISADO | Ninguno | Nombre y función no recibidos. |

## Componentes que no están en la lista de quince

| Componente | Estado | Dónde está |
|---|---|---|
| Verificador determinista de publicidad | CONSTRUIDO Y PROBADO (11 pruebas) | marketing/verificador_publicidad.py |
| Lista de control de publicidad | CREADA | marketing/checklist-publicidad.md |
| Piloto de cuatro piezas | CREADO, NO PUBLICABLE | marketing/piloto/piezas-piloto.md |
| Publicación | MANUAL, NO AUTOMATIZADA | Decisión de diseño. Requiere aprobación del abogado responsable. |

## Pendientes para cerrar el registro

1. Recibir los nombres y funciones de los agentes 05 a 15, o confirmar que la propuesta tenía cuatro agentes.
2. Confirmar en una sesión nueva que jac-copy y jac-consejo aparecen como agentes del proyecto.
3. Aprobar el ADN por escrito y completar sus datos.
4. Verificar en fuente oficial la Ley 1581 de 2012 y los artículos 28, 34 y 35 de la Ley 1123 de 2007.
5. Entregar exportaciones reales de métricas agregadas, autorizadas por el despacho, para que Inteligencia de contenido trabaje con datos propios.
6. Probar Copy con un ADN aprobado y una pieza real para verificar que redacta contenido y que el Consejo lo revisa.

Este registro no certifica la calidad jurídica de ningún agente ni sustituye la revisión del abogado responsable.
