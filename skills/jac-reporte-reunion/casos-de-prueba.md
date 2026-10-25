# Casos de prueba: jac-reporte-reunion

Notas inventadas. Los nombres de personas y empresas son ficticios. No usar datos reales en estas pruebas.

Cómo se ejecuta: pegar cada entrada en una sesión con la Skill activa y comparar la salida con el resultado esperado. No hay ejecución automática; la comprobación es manual y con la lista de verificación de la Skill.

## Caso 1: reunión completa con cinco próximos pasos

Entrada:

```
Reunión con Cliente Ficticio A, 2026-09-14. Asunto: contrato de suministro.
Presentes: Laura Pérez (gerente jurídica), Abogado del despacho.
- Revisaron la cláusula 9 (penalidades). Quieren reducir el tope a 10%.
- Ya enviaron la lista de proveedores afectados (avance).
- Laura dice que el otro socio está molesto con la demora. Esto no es para el cliente.
- Compromiso cliente: enviar el anexo técnico el viernes.
- Próximos pasos: (1) redactar contrapropuesta de la cláusula 9; (2) revisar anexo técnico;
  (3) agendar llamada con el proveedor; (4) preparar cuadro de penalidades; (5) confirmar fecha de firma.
```

Resultado esperado:
1. Reporte para el cliente con dos temas (cláusula 9 y anexo técnico), un avance (lista de proveedores), un compromiso del cliente (anexo el viernes) y exactamente tres próximos pasos: contrapropuesta, revisión del anexo y llamada con el proveedor.
2. La molestia del socio no aparece en el reporte. Aparece en la nota interna como categoría ("valoración sobre persona del cliente"), sin el contenido.
3. Pasos 4 y 5 aparecen en la nota interna como pasos adicionales no incluidos.
4. La fecha de la reunión es 2026-09-14, sin [POR CONFIRMAR].
5. El compromiso "enviar el anexo técnico el viernes" aparece como "viernes (fecha por confirmar)", sin convertirlo en fecha concreta.
6. Las notas no fijan prioridad: los tres pasos se toman en el orden de las notas, con [POR CONFIRMAR: criterio de prioridad], y los pasos cuarto y quinto aparecen en la nota interna.

## Caso 2: sin avances y datos faltantes

Entrada:

```
Llamada con Cliente Ficticio B sobre el arrendamiento de la bodega. Hablamos del aumento del canon.
No quedó nada decidido. Creo que el gerente pidió ver el contrato anterior, no sé si lo envió.
```

Resultado esperado:
1. Fecha: [POR CONFIRMAR]. Nomenclatura con `SIN-FECHA`.
2. Avances: "No hubo avances en esta reunión".
3. Compromisos: el gerente pidió revisar el contrato anterior; la fecha y el responsable de enviarlo quedan [POR CONFIRMAR].
4. No hay próximos pasos inventados. Si se listan, deben derivarse solo de la solicitud del gerente, marcada como [POR CONFIRMAR].
5. La nota interna lista como datos faltantes: fecha, participantes, y si el contrato anterior fue enviado.

## Caso 3: notas de dos clientes mezcladas

Entrada:

```
Reunión con Cliente Ficticio C sobre la licencia de software, y después con Cliente Ficticio D
sobre el pleito laboral. Ambos quieren respuesta esta semana.
```

Resultado esperado:
1. No se genera ningún reporte.
2. La respuesta indica que las notas corresponden a dos asuntos y pide enviarlas por separado.
3. No se resume ni se nombra ningún tema de ninguno de los dos asuntos.
