---
name: cumplimiento-datos-co
description: Evalúa el cumplimiento de protección de datos personales de un cliente corporativo en Colombia (inventario de tratamientos, autorizaciones, riesgo e incidentes) bajo la Ley 1581 de 2012, la Ley 1266 de 2008 y el Decreto 1377 de 2013.
---

# Cumplimiento de datos personales (Colombia)

Esta skill apoya al abogado en el diagnóstico de compliance de protección de datos de un cliente corporativo. No sustituye el criterio jurídico del abogado ni decide por él en materias reputacionales o de exposición ante la autoridad.

Marco normativo estable citable con confianza: Ley 1581 de 2012 (régimen general de protección de datos personales), Ley 1266 de 2008 (habeas data financiero/crediticio) y Decreto 1377 de 2013 (reglamentario de la Ley 1581). Autoridad competente: Superintendencia de Industria y Comercio (SIC), a través de la Delegatura para la Protección de Datos Personales.

**Regla de seguridad obligatoria:** cualquier cita de jurisprudencia o de un concepto de la SIC debe marcarse siempre como "[verificar contra el archivo de conceptos de la SIC]". Nunca se presenta un concepto o precedente como verificado. Las tres normas mencionadas arriba (Leyes 1581/2012, 1266/2008 y Decreto 1377/2013) sí pueden citarse directamente por ser normas públicas y estables.

## Modelo recomendado
- Evaluación de impacto (riesgo alto): Claude Opus 4.8.
- Registro de actividades de tratamiento (tarea estructurada, riesgo medio): Claude Sonnet 5.

## Proceso de 4 pasos

**1. Inventariar tratamientos de datos**
Levantar, por área del cliente (RRHH, comercial, TI, proveedores), qué datos personales y sensibles se tratan (salud, biométricos, datos de menores, orientación sexual, afiliación sindical, etc.), con qué finalidad concreta, quién es el responsable/encargado, dónde se almacenan y si hay transferencia o transmisión internacional. El resultado es la base del Registro Nacional de Bases de Datos (RNBD) y del registro interno de actividades de tratamiento.

**2. Verificar autorización válida por finalidad**
Para cada finalidad identificada, confirmar si existe autorización del titular que sea: previa, expresa (o inequívoca según el caso), informada, y específica para esa finalidad — no una autorización genérica que cubra todo. Si falta autorización para alguna finalidad, o la existente es insuficiente (por ejemplo, no cubre datos sensibles o no menciona transferencias a terceros), generar el formulario faltante reutilizando el patrón de cláusulas y estructura del Módulo 03. Señalar expresamente cuáles finalidades quedan sin cobertura hasta que el cliente recabe la autorización.

**3. Evaluar el riesgo de cada tratamiento**
Para cada tratamiento del inventario, estimar probabilidad de incidente (baja/media/alta, según exposición: acceso remoto, volumen, terceros involucrados, controles existentes) e impacto sobre los titulares (bajo/medio/alto, según sensibilidad del dato y daño potencial). Cruzar ambas variables para asignar nivel de riesgo global y proponer una acción concreta (cifrado, minimización, actualización de autorización, control de acceso, contrato con encargado, etc.).

**4. Si hay un incidente real: protocolo de notificación**
Ante un incidente de seguridad confirmado, generar un borrador de protocolo que incluya: cronología de hechos, datos e individuos afectados, evaluación preliminar de riesgo para los titulares, plazo aplicable de notificación a la SIC (reporte en el Registro Nacional de Bases de Datos, según la reglamentación vigente [verificar contra el archivo de conceptos de la SIC] para plazos específicos actualizados), y comunicación a los titulares afectados cuando el riesgo lo amerite. Este borrador es insumo de trabajo, no una decisión de notificar.

## Mini-ejemplo: riesgo en tratamiento de datos de salud de empleados

| Tratamiento | Nivel de riesgo | Hallazgo | Acción recomendada |
|---|---|---|---|
| Historial de incapacidades médicas en carpeta compartida de RRHH sin cifrar | Alto | Dato sensible (salud) accesible a todo el equipo de RRHH sin control de acceso diferenciado | Migrar a repositorio cifrado con acceso restringido y registro de auditoría |
| Exámenes médicos ocupacionales enviados por correo a la EPS/ARL | Medio | Autorización de tratamiento no menciona expresamente el envío a terceros (EPS/ARL) | Actualizar formulario de autorización para incluir la finalidad y el tercero destinatario |
| Certificados de discapacidad usados solo para trámites de nómina, con acceso de un único analista autorizado | Bajo | Finalidad específica, acceso restringido y autorización vigente | Mantener control actual; revisar autorización cada 12 meses |

## Cierre

Esta skill nunca decide si un incidente se notifica o no a la Superintendencia de Industria y Comercio. Esa es una decisión legal y reputacional que corresponde exclusivamente al abogado y al cliente, con asesoría directa y caso por caso.
