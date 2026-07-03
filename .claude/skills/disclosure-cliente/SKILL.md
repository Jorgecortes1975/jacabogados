---
name: disclosure-cliente
description: Genera automáticamente el aviso de tratamiento de datos y la autorización correspondiente para el cliente, ajustados al tipo de encargo, conforme a la Ley 1581 de 2012 y al Código Disciplinario del Abogado (Ley 1123 de 2007).
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
El aviso debe incluir, como mínimo:
1. Identificación del despacho como responsable del tratamiento.
2. Finalidad específica del tratamiento, ajustada al tipo de encargo identificado en el Paso 1 (ej. para un litigio activo: "tratamiento de datos personales para la preparación, presentación y seguimiento de la acción judicial, incluyendo el uso de herramientas de asistencia de inteligencia artificial para análisis documental y redacción de escritos, bajo acceso restringido y sin entrenamiento de modelos con la información del cliente").
3. Mención expresa del uso de IA cuando aplique, y de las salvaguardas de acceso acotado (carpeta específica del caso, no acceso a la unidad completa del despacho).
4. Derechos del titular: conocer, actualizar, rectificar, solicitar prueba de la autorización, revocar la autorización y suprimir el dato cuando proceda, presentar quejas ante la SIC.
5. Canal y procedimiento para ejercer esos derechos.
6. Vigencia del tratamiento y política de conservación del expediente.

**Paso 4 — Generar la autorización para firma del cliente.**
Documento separado y breve, en lenguaje llano (no jurídico denso), que el cliente pueda leer y firmar en un máximo de dos minutos. Debe declarar expresamente que el cliente autoriza el tratamiento descrito en el aviso del Paso 3, con espacio para firma, fecha, y — si el encargo involucra datos sensibles— una casilla de autorización reforzada separada.

**Paso 5 — Adaptar automáticamente si el encargo involucra datos de terceros no clientes.**
Si el encargo requiere tratar datos de una contraparte, testigo, o tercero que no es el cliente que firma la autorización, el Skill debe alertar que ese tercero requiere su propio aviso o, cuando no sea practicable obtenerlo (ej. contraparte en litigio), documentar la base de legitimación distinta a la autorización (ej. cumplimiento de una obligación legal o interés legítimo en el marco del proceso judicial) que el abogado responsable debe validar.

## Entregable final

Dos documentos separados y listos para revisión: (1) aviso de tratamiento de datos ajustado al tipo de encargo, y (2) autorización para firma del cliente. Ambos quedan sujetos a revisión del abogado responsable antes de enviarse — este Skill genera el borrador ajustado al encargo, no sustituye la revisión de la política de datos del despacho por su oficial de cumplimiento.
