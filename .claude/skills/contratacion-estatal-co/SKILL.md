---
name: contratacion-estatal-co
description: Analiza pliegos de condiciones de SECOP II para clientes proponentes en Colombia, verifica requisitos habilitantes, detecta cláusulas de riesgo en la minuta y redacta borradores de observaciones al pliego.
---

# Contratación estatal Colombia — revisión de pliegos como proponente

Modelo recomendado: Claude Sonnet 5. Consultar SECOP II vía Computer Use (Módulo 06) es nivel bajo (solo lectura de pliegos, adendas, respuestas a observaciones). Cargar una propuesta o documento en la plataforma es nivel alto y requiere autorización explícita del abogado responsable antes de ejecutarse.

## Marco normativo

Ley 80 de 1993 (Estatuto General de Contratación de la Administración Pública), Ley 1150 de 2007 (medidas de eficiencia y transparencia) y Decreto 1082 de 2015 (reglamentario único del sector) son la base normativa de esta skill y pueden citarse con confianza como parte del estatuto vigente — pero siempre aclarando al usuario que debe confirmarse su vigencia y posibles modificaciones posteriores antes de usarlas en un documento final.

**Regla de seguridad no negociable:** nunca marques una sentencia o decisión específica del Consejo de Estado como "verificada" sin advertencia. Toda referencia a jurisprudencia del Consejo de Estado debe presentarse como "[verificar contra la relatoría del Consejo de Estado]", sin excepción, incluso si el modelo tiene alta confianza en el contenido.

## Proceso de 4 pasos

**1. Extraer y tabular los requisitos habilitantes del pliego.**
Leer el pliego de condiciones (y sus anexos técnicos) publicado en SECOP II y construir una tabla con los requisitos jurídicos, financieros, técnicos y de experiencia exigidos, citando el numeral exacto del pliego de donde proviene cada uno. No resumir ni interpretar todavía — solo extraer.

**2. Verificar cumplimiento del cliente frente a cada requisito.**
Con la información que el cliente entregue (certificados, RUP, estados financieros, certificaciones de experiencia), marcar cada requisito como Cumple / No cumple / Cumple parcialmente. Todo requisito no verificable con la información disponible debe marcarse explícitamente como **[BRECHA — falta soporte]**, nunca darse por cumplido por omisión.

**3. Identificar cláusulas de riesgo en la minuta del contrato.**
Revisar la minuta anexa al pliego y señalar: régimen de multas, cláusula penal pecuniaria, cláusula de indemnidad, causales de incumplimiento y terminación, y cualquier asimetría entre las obligaciones de la entidad y las del contratista. Indicar para cada cláusula el riesgo concreto que representa para el proponente (ej. multas sin tope, indemnidad ilimitada, causales de incumplimiento redactadas en términos abiertos).

**4. Generar un borrador de observaciones al pliego.**
Cuando se detecten ambigüedades, requisitos desproporcionados o restrictivos de la competencia, redactar un borrador de observación por cada hallazgo, citando el numeral del pliego, explicando el problema y proponiendo la corrección solicitada. Este borrador es un insumo para que el abogado lo revise, edite y radique en el plazo de observaciones — no se envía directamente a la entidad.

## Ejemplo de tabla de requisitos habilitantes (datos ficticios)

| Requisito (numeral pliego) | Descripción | Cumple / No cumple | Acción |
|---|---|---|---|
| 3.1 Jurídico | Certificado de existencia y representación legal vigente (< 30 días) | Cumple | Ninguna |
| 3.4 Financiero | Índice de liquidez ≥ 1.5 | No cumple (cliente reporta 1.2) | Evaluar estados financieros actualizados o cofinanciación con socio |
| 3.6 Técnico | Experiencia en máximo 3 contratos con objeto similar en últimos 5 años | Cumple parcialmente (2 contratos certificados) | Solicitar certificación del tercer contrato antes del cierre |
| 3.8 Experiencia específica | Contratos ejecutados por valor ≥ 2.000 SMMLV cada uno | [BRECHA — falta soporte] | Requerir al cliente actas de liquidación o certificaciones de valor |

## Cierre — límites de la skill

Esta skill **no decide** si el cliente debe presentarse a la licitación ni redacta la propuesta técnica o económica final. Esa es una decisión comercial y técnica que corresponde al cliente en conjunto con el abogado, con base en el análisis de brechas, riesgos y observaciones generado aquí — no en su lugar.
