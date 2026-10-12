---
name: jac-verificar
description: Verificación rápida de citas jurídicas colombianas. Recibe una sentencia, una norma o un texto con citas y devuelve el estado de cada una (verificada, no encontrada, datos discrepantes, pendiente). Usar cuando el usuario pida comprobar si una cita existe o esté bien citada.
---

# JAC Verificar

Si puede ejecutar código, ejecute `python3 -m jac consulta "<texto con las citas>"` (si falla con "No module named jac", ver las instrucciones de PYTHONPATH en el skill jac-agente) y reporte el resultado sin modificarlo:

1. Para cada cita: estado, dato oficial encontrado y fuente. Distinga "no encontrada" (las fuentes respondieron y no la conocen) de "pendiente" (la fuente no respondió o no hay conector).
2. En normas, existencia no es vigencia: indique que la vigencia debe confirmarse en fuente oficial.
3. No agregue citas, magistrados ni fechas que la herramienta no devolvió, ni interpretaciones sobre qué fuentes respondieron: transcriba el campo de detalle de cada cita. Una cita descartada por año o formato imposible no consultó ninguna fuente.
4. Si el entorno bloquea la red, informe que las citas de la Corte Constitucional quedan pendientes y sugiera `python3 -m jac fuentes` desde un equipo con acceso.
5. Sin ejecución de código: aplique el procedimiento manual del skill jac-agente (sección Modo sin herramientas). Ninguna cita puede quedar como verificada si no abrió la fuente o no figura en el catálogo de normas; use PENDIENTE DE VERIFICACIÓN.
