---
name: constitucion-empresa-colombia
description: Ayuda a fundadores y pequeñas empresas en Colombia a elegir la forma jurídica (persona natural comerciante, sociedad por acciones simplificada SAS, sociedad limitada, sociedad anónima, sucursal de sociedad extranjera), constituirla e inscribirla en el registro mercantil de la Cámara de Comercio, redactar estatutos o un acuerdo de accionistas que cubra la entrada de socios, las salidas forzosas y voluntarias, el bloqueo, el derecho de preferencia, los asuntos reservados, la no competencia y la valoración, y orientar a los nuevos administradores sobre sus deberes. Crea también un registro y un calendario anual de cumplimiento. Útil para "debo constituir una empresa", "persona natural o SAS", "registrar una empresa", "SAS", "sociedad limitada", "cofundador", "acuerdo de accionistas", "reparto de acciones", "deberes del administrador", "RUT", "registro mercantil", "beneficiario final" o "calendario de cumplimiento".
metadata:
  adaptado_de: "Sprintlaw, skill business-setup (descripción pública; texto original no disponible en esta sesión)"
  jurisdiccion: "Colombia"
  version: "0.1.0"
  complementa: "venta-empresa-colombia (transferencia de la sociedad), investigacion-juridica-colombia (verificación de normas)"
---

# Constitución de empresa en Colombia

Esta skill acompaña la decisión de constituir una empresa y los acuerdos iniciales entre socios. Las normas se confirman en fuente oficial antes de citarlas: las marcadas "a confirmar" son puntos de verificación.

## No negociables

1. Cada norma se verifica antes de citarla con `python3 -m jac norma "<norma>"` o con los conectores de Función Pública. La existencia de una norma no prueba su vigencia.
2. Los requisitos de registro, tasas y trámites cambian. Se confirman en la Cámara de Comercio competente y en el RUES antes de presentar cualquier documento.
3. Los datos del cliente (nombres, cédulas, participaciones, capital) se confirman con documento y no se completan con supuestos.

## Paso 1. Elegir la forma jurídica

Pregunte primero por el número de socios, el capital, si habrá inversionistas externos, si hay un socio extranjero y la actividad.

| Forma | Cuándo suele convenir | Punto a confirmar |
|---|---|---|
| Persona natural comerciante | Un solo titular, riesgo bajo, operación simple | Responsabilidad ilimitada del titular con su patrimonio |
| SAS (Ley 1258 de 2008) | Dos o más socios, flexibilidad estatutaria, inversión posterior | Régimen de administración y acuerdos de accionistas. Artículos a confirmar |
| Sociedad limitada (Código de Comercio) | Socios cercanos, estructura conocida | Limitaciones a la cesión de cuotas. Artículos a confirmar |
| Sociedad anónima (Código de Comercio) | Estructuras con junta directiva y muchos accionistas | Mayor formalidad y costo. Artículos a confirmar |
| Sucursal de sociedad extranjera | La matriz está fuera de Colombia | Registro de la sociedad extranjera y poderes. Artículos a confirmar |

No recomiende una forma sin conocer el número de socios, el capital y el plan de inversión.

## Paso 2. Constitución e inscripción

1. Redacte los estatutos o el documento de constitución con: denominación, domicilio, objeto social, capital suscrito y pagado, forma de administración, causales de disolución y reglas de cesión.
2. Inscriba la sociedad en el registro mercantil de la Cámara de Comercio del domicilio. La inscripción es requisito para su existencia frente a terceros. Verifique la norma que la exige y el momento en que surte efecto.
3. Obtenga el Registro Único Tributario (RUT) ante la DIAN, con la actividad económica correspondiente y los responsables que apliquen.
4. Registre el beneficiario final cuando la normativa lo exija. Artículo a confirmar.
5. Verifique los requisitos de apertura de cuentas bancarias y de licencias sectoriales, si la actividad los exige.

## Paso 3. Acuerdo de accionistas o de socios

Cubra, como mínimo:

1. Aportes y participaciones, con el calendario de capitalización.
2. Entrada de nuevos socios: procedimiento y precio.
3. Salidas voluntarias, con derecho de preferencia y plazo.
4. Salidas forzosas: incumplimiento, muerte, incapacidad, separación del cargo. Defina las causales y el precio de salida.
5. Bloqueo y arrastre: cuándo un socio puede obligar a los demás a vender.
6. Asuntos reservados que requieren mayoría calificada o unanimidad.
7. Valoración para salidas: método y tercero valorador.
8. No competencia y confidencialidad para los socios.
9. Solución de controversias.

Verifique si cada cláusula es oponible a la sociedad o solo entre las partes. Algunas reglas requieren constar en los estatutos para producir efecto frente a la sociedad. Artículo a confirmar en la Ley 1258 de 2008.

## Paso 4. Deberes de los administradores

Informe a los nuevos administradores sobre sus deberes de lealtad, diligencia y cuidado, y sobre la responsabilidad que surge de incumplirlos. Verifique el régimen de la Ley 222 de 1995 y del Código de Comercio. Artículos a confirmar. No redacte esta explicación como asesoría individual: es información general.

## Paso 5. Registro y calendario de cumplimiento

Cree un registro con: fecha de constitución, número de matrícula mercantil, renovación anual, estados financieros, asamblea ordinaria, revisor fiscal si aplica, declaraciones tributarias, actualización del RUT y del beneficiario final.

Calendario anual: renovación de la matrícula mercantil antes de la fecha límite de cada año, asamblea de accionistas o socios, declaraciones tributarias según el calendario de la DIAN, y actualización de datos ante la Cámara de Comercio. Confirme cada fecha en la fuente oficial del año correspondiente.

## Riesgos

1. Socios sin acuerdo de salida, que bloquean la empresa.
2. Estatutos genéricos que no resuelven la administración.
3. Responsabilidad personal por omitir inscripciones o declaraciones.
4. Compromisos de socios no inscritos que no producen efecto frente a la sociedad.

## Documentos necesarios

Cédulas de los socios, documento de constitución o estatutos, comprobante de aportes, poderes si hay representación, RUT, registro de beneficiario final, acuerdo de accionistas, calendario de cumplimiento.

## Límites

Esta skill no reemplaza al abogado que constituye la sociedad ni al contador. Las normas marcadas "a confirmar" no se citan hasta verificarlas en fuente oficial.
