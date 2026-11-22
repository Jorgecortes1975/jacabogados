---
name: retomar-asunto
description: Procedimiento para retomar un asunto jurídico en una sesión nueva, avanzar un solo requisito y dejar el expediente de trabajo en estado limpio y documentado. Solo se activa por el usuario.
argument-hint: [identificador-del-asunto]
disable-model-invocation: true
allowed-tools: Bash(pwd) Bash(git log *) Bash(bin/jac prueba)
---

Este procedimiento aplica el principio de trabajo incremental en ejecuciones de larga duración. Cada sesión empieza sin memoria de las anteriores: la memoria está en el archivo de progreso, la lista de requisitos y el historial de git.

Asunto solicitado (Matter Lock): $ARGUMENTS

Historial reciente del repositorio (inyectado al iniciar el procedimiento):

!`git log --oneline -20`

Pasos obligatorios, en orden:

1. Fijar el asunto (Matter Lock). El identificador solicitado es el indicado arriba. Si no se indicó ninguno, pregunte al usuario antes de continuar. Si no coincide con el archivo de progreso del asunto, detenga el procedimiento. No lea documentos de otro asunto.
2. Ejecute `pwd` y confirme que el trabajo se hace en la carpeta del asunto autorizada.
3. Lea el archivo de progreso del asunto (plantillas/progreso-asunto.md, copiado y completado para el asunto) y revise el historial reciente mostrado arriba.
4. Lea la lista de requisitos del asunto (plantillas/requisitos-escrito.json, copiado y completado para el asunto). Elija un solo requisito con "passes": false, el de mayor prioridad.
5. Ejecute la verificación base con `bin/jac prueba`. Si falla, corrija primero el estado roto antes de avanzar. No empiece un requisito nuevo sobre una base rota.
6. Trabaje solo ese requisito. Documente cada fuente consultada, con fecha de consulta y estado (verificado, pendiente o no encontrado).
7. Verifique el resultado con evidencia: el comando ejecutado y su salida. Solo cambie "passes" a true cuando la verificación supere el requisito.
8. Edite la lista de requisitos únicamente cambiando el valor de "passes". Está prohibido eliminar o reescribir requisitos para que parezcan cumplidos.
9. Actualice el archivo de progreso: qué se hizo, qué queda pendiente, qué quedó sin verificar y por qué.
10. Confirme los cambios en git con un mensaje descriptivo, solo cuando el usuario lo autorice.

Reglas de cierre:

No declare terminado el asunto mientras existan requisitos con "passes": false. Un estado PASS_AUTOMATICO del control no equivale a la revisión del abogado responsable; el documento final debe pasar por el revisor independiente (agente jac-revisor) y por el abogado.

Deje el repositorio en estado limpio: sin cambios sin confirmar que una sesión siguiente tenga que adivinar, y con el progreso escrito.
