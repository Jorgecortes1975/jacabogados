---
name: disclosure-cliente
description: Genera automáticamente el aviso de tratamiento de datos y la autorización correspondiente para el cliente, ajustados al tipo de encargo, conforme a la Ley 1581 de 2012 y al Código Disciplinario del Abogado (Ley 1123 de 2007). Úsala cuando el usuario pida generar el aviso de privacidad de un cliente o la autorización de tratamiento de datos para un encargo nuevo.
---

# Disclosure y autorización de datos para el cliente

## Regla de seguridad obligatoria (anti-alucinación)

1. **Jurisprudencia y conceptos**: si en algún momento este Skill necesita referenciar un concepto de la Superintendencia de Industria y Comercio o una sentencia (por ejemplo, para justificar una base de legitimación distinta a la autorización en el Paso 5), esa referencia debe marcarse siempre como "[verificar contra el archivo de conceptos de la SIC o la Relatoría oficial]" — nunca se presenta como confirmada por defecto.
2. **Normas base**: la Ley 1581 de 2012, la Ley 1266 de 2008 y el Decreto 1377 de 2013 son normas públicas y estables, citables con confianza como marco general. Cualquier artículo específico de ellas que se invoque en un aviso o autorización concreta debe marcarse como "[confirmar numeración vigente]" si no es de conocimiento general asentado.
3. **Ningún aviso ni autorización generado aquí es definitivo**: ambos documentos quedan sujetos a revisión del abogado responsable y, cuando exista, del oficial de cumplimiento del despacho, antes de enviarse al cliente.

## Cuándo usar este Skill

Al iniciar cualquier encargo nuevo en el que el despacho vaya a tratar datos personales del cliente o de terceros relacionados con el caso (contraparte, testigos, familiares, empleados) — incluyendo encargos donde ese tratamiento se apoya en herramientas de IA como Claude. Este Skill también se activa cada vez que cambia el tipo de encargo de un cliente existente (ej. pasa de una consulta puntual a un litigio activo), porque el alcance del tratamiento de datos cambia con el tipo de encargo.

## Por qué es automático y no opcional

La Ley 1581 de 2012 exige autorización previa, expresa e informada del titular para el tratamiento de sus datos personales, y exige que el aviso de privacidad informe la finalidad del tratamiento. Cuando el despacho usa Claude u otras herramientas de IA para procesar información del cliente, esa finalidad debe quedar explícita en el aviso — no es una autorización genérica de "tratamiento de datos para fines del servicio jurídico", sino una que menciona específicamente el uso de asistencia de inteligencia artificial y las salvaguardas aplicadas (ver `conectores/permisos-scoped.md` para el detalle técnico de esas salvaguardas). Omitir esta mención expone al despacho a un doble riesgo: sancionatorio ante la Superintendencia de Industria y Comercio, y disciplinario ante el Consejo Superior de la Judicatura por falta a los deberes de información y confidencialidad del artículo 28 de la Ley 1123 de 2007.

## Proceso operativo

**Paso 1 — Identificar el tipo de encargo.**
Clasifica el encargo en una de estas categorías (u otra que el despacho use internamente), porque cada una tiene un alcance distinto de datos tratados y de finalidad:
- Consulta puntual / concepto jurídico
- Litigio activo (representación judicial)
- Transaccional (M&A, contratos, due diligence)
- Cumplimiento / auditoría interna para el cliente
- Representación ante autoridad administrativa

**Paso 2 — Identificar los datos que efectivamente se van a tratar.**
Pregunta o infiere del encargo qué categorías de datos personales estarán involucradas: datos de identificación, datos de contacto, datos financieros, datos de salud (sensibles — requieren mención expresa reforzada bajo la Ley 1581 de 2012), datos de terceros no clientes (contraparte, testigos).

**Paso 3 — Generar el aviso de tratamiento de datos.**
El aviso debe incluir, como mínimo, identificación del despacho como responsable, finalidad específica ajustada al tipo de encargo, mención expresa del uso de IA y sus salvaguardas cuando aplique, derechos del titular, canal para ejercerlos, y vigencia/conservación del expediente. Ver `references/plantilla-aviso-autorizacion.md` para el detalle de cada punto y ejemplos de lenguaje de finalidad por tipo de encargo.

**Paso 4 — Generar la autorización para firma del cliente.**
Documento separado y breve, en lenguaje llano (no jurídico denso), que el cliente pueda leer y firmar en un máximo de dos minutos. Debe declarar expresamente que el cliente autoriza el tratamiento descrito en el aviso del Paso 3, con espacio para firma, fecha, y — si el encargo involucra datos sensibles— una casilla de autorización reforzada separada. Ver `references/plantilla-aviso-autorizacion.md` para el detalle completo.

**Paso 5 — Adaptar automáticamente si el encargo involucra datos de terceros no clientes.**
Si el encargo requiere tratar datos de una contraparte, testigo, o tercero que no es el cliente que firma la autorización, el Skill debe alertar que ese tercero requiere su propio aviso o, cuando no sea practicable obtenerlo (ej. contraparte en litigio), documentar la base de legitimación distinta a la autorización (ej. cumplimiento de una obligación legal o interés legítimo en el marco del proceso judicial) que el abogado responsable debe validar.

## Entregable final

Dos documentos separados y listos para revisión: (1) aviso de tratamiento de datos ajustado al tipo de encargo, y (2) autorización para firma del cliente. Ambos quedan sujetos a revisión del abogado responsable antes de enviarse — este Skill genera el borrador ajustado al encargo, no sustituye la revisión de la política de datos del despacho por su oficial de cumplimiento.

## Mini-ejemplo: encargo de consulta puntual (datos ficticios)

**Encargo**: "Textiles del Norte S.A.S." (cliente ficticio) contrata al despacho para un concepto jurídico puntual sobre la validez de una cláusula de exclusividad en un contrato de distribución. No hay litigio ni tratamiento de datos sensibles — solo datos de identificación y de contacto del representante legal y de un analista comercial de la empresa.

**(1) Aviso de tratamiento de datos (extracto)**

> JA Abogados, identificado como responsable del tratamiento, informa a Textiles del Norte S.A.S. y a las personas naturales cuyos datos se relacionen con este encargo que sus datos de identificación y contacto (nombre, cargo, correo, teléfono) serán tratados con la finalidad exclusiva de prestar el servicio de consulta jurídica puntual sobre la cláusula de exclusividad referida, incluyendo el uso de herramientas de inteligencia artificial (Claude, de Anthropic) bajo permisos restringidos y sin entrenamiento de modelos con esta información [ver `conectores/permisos-scoped.md`]. El titular puede ejercer sus derechos de conocimiento, actualización, rectificación y supresión escribiendo a [correo del despacho]. Los datos se conservarán mientras dure el encargo y durante el término de archivo documental que aplique al despacho.

**(2) Autorización para firma (extracto)**

> Yo, ______________________, identificado con C.C./NIT ______________, actuando en representación de Textiles del Norte S.A.S., autorizo de manera previa, expresa e informada a JA Abogados para tratar mis datos personales de identificación y contacto conforme al aviso de tratamiento de datos entregado, con la finalidad exclusiva de la consulta jurídica descrita.
>
> Firma: ___________  Fecha: ___________

Este es un extracto ilustrativo del formato de salida esperado — el documento completo, con todas las cláusulas mínimas del Paso 3 y del Paso 4, se genera siguiendo `references/plantilla-aviso-autorizacion.md`. Como este encargo no involucra datos sensibles ni terceros no clientes, no aplica la casilla de autorización reforzada del Paso 4 ni la alerta del Paso 5.

## Cierre — límite de esta skill

Esta skill genera el borrador del aviso y de la autorización ajustados al tipo de encargo; **no decide** si el tratamiento descrito es jurídicamente suficiente frente a un caso límite (por ejemplo, una base de legitimación distinta a la autorización cuando el titular es un tercero no alcanzable), y **no reemplaza** la revisión del abogado responsable ni la del oficial de cumplimiento del despacho antes de enviar cualquiera de los dos documentos al cliente o de recabar su firma.
