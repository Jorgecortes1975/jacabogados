---
name: riesgo-ia-proveedores-col
description: >
  Evaluación del riesgo legal de proveedores y herramientas de IA para empresas
  colombianas: revisión término a término de contratos, anexos de IA y ToS contra el
  derecho colombiano — datos personales (Ley 1581/2012 y Decreto 1377/2013, SIC),
  confidencialidad y secreto empresarial, propiedad intelectual de entradas y salidas,
  responsabilidad por outputs, cláusulas contractuales recomendadas y regulación de IA
  en trámite. Activar ante: revisa este contrato de IA, el proveedor mandó un anexo de
  IA, ¿podemos usar esta herramienta de IA?, términos de OpenAI/Anthropic/Microsoft,
  ¿el proveedor entrena con nuestros datos?, riesgo de IA de un proveedor, due
  diligence de herramienta de IA, cláusulas para contrato de IA, política interna de
  IA vs contrato. SIEMPRE activar cuando el usuario pida evaluar, negociar o auditar
  términos de un proveedor de IA o el riesgo legal de adoptar una herramienta de IA
  en una empresa colombiana.
argument-hint: "[nombre del proveedor, o adjuntar el contrato]"
---

# riesgo-ia-proveedores-col

Respuesta primero, sin narrar proceso, sin secciones vacías (regla señal/ruido).

## Propósito

Los términos del proveedor de IA son donde las posiciones de gobernanza del cliente se ponen a prueba. La política interna captura lo que el cliente *quiere*; este skill verifica lo que *acordó* — y marca las brechas entre ambos. La postura es siempre la misma: somos el adquirente/implementador que revisa los términos del proveedor (no hay inversión de roles como en un contrato de encargo de datos).

Lo que varía es el *insumo*: (a) contrato o anexo de IA independiente (lo más estructurado); (b) términos de servicio universales con cláusulas de IA embebidas (a menudo enterradas); (c) política de uso aceptable — dice qué NO puede hacer el cliente, pero nada sobre qué puede hacer el proveedor con datos y salidas; (d) combinación: contrato marco + acuerdo de tratamiento de datos + anexo de IA. Si ya existe acuerdo de tratamiento de datos (transmisión/encargo bajo Ley 1581/2012), esta revisión lo complementa, no lo sustituye: aquel gobierna la protección de datos; los términos de IA gobiernan derechos y riesgos específicos del modelo. Ambos se revisan.

## Marco jurídico colombiano (base de trabajo)

Base a verificar EN VIVO con `vigilancia-normativa-col` antes del primer uso; no afirmar contenidos de artículos como verificados sin esa pasada. Prohibido inventar artículos o valores.

| Dimensión | Base colombiana de referencia |
|---|---|
| Datos personales | Ley 1581/2012, Decreto 1377/2013 (compilado en Decreto 1074/2015); autoridad: SIC. Roles Responsable/Encargado; autorización del titular y finalidad; transferencia y transmisión internacional de datos (régimen SIC — verificar circular vigente) |
| Confidencialidad / secreto empresarial | Decisión Andina 486/2000 (secreto empresarial); Ley 256/1996 (competencia desleal); pactos de confidencialidad contractuales |
| PI de entradas y salidas | Ley 23/1982 y Decisión Andina 351/1993 (derecho de autor). Punto crítico: la protección de obras generadas por IA sin autor humano es incierta en Colombia — la titularidad de outputs debe resolverse por contrato, no asumirse por ley |
| Responsabilidad contractual | Código Civil (efectos de las obligaciones y responsabilidad); límites a cláusulas exonerativas (dolo/culpa grave no dispensables — verificar); Ley 1480/2011 si hay relación de consumo |
| Comercio electrónico / mensajes de datos | Ley 527/1999 (validez de mensajes de datos y firmas electrónicas) |
| Regulación de IA | **EN TRÁMITE — ver sección propia.** No existe hoy ley estatutaria de IA vigente en Colombia; no citar ninguna como vigente |

**Regulación de IA en Colombia — EN TRÁMITE / VIGILAR.** Hay política pública e iniciativas legislativas de IA en curso y lineamientos de la SIC sobre tratamiento de datos en sistemas de IA, pero ningún régimen general vigente y consolidado equiparable al AI Act europeo. Antes de cada revisión, correr `vigilancia-normativa-col` para: (1) estado de proyectos de ley de IA en el Congreso; (2) documentos CONPES y lineamientos sectoriales de IA; (3) circulares/guías de la SIC sobre IA y datos personales. Todo hallazgo entra al informe con etiqueta de certidumbre; lo no confirmado se marca "s/d".

## Flujo

1. Cargar el playbook del cliente: `{empresa}/` (política interna de IA, posiciones de negociación) si existe; si no, ofrecer **modo provisional** (abajo).
2. Confirmar tipo de documento (anexo de IA / cláusulas de IA del contrato marco / ToS). Si solo entregaron política de uso aceptable, pedir los términos completos.
3. Revisión término a término (tabla siguiente).
4. Chequeo de brecha: acuerdo de datos sin anexo de IA.
5. Chequeo de consistencia contra la política interna de IA del cliente.
6. Salida: conclusión, término a término, cláusulas recomendadas, ruta si el proveedor no cede.

**Modo provisional** (cliente sin playbook): revisar con defaults genéricos — jurisdicción Colombia, apetito de riesgo medio, sin posiciones preconfiguradas, marcando todos los riesgos comunes desde primeros principios. Etiquetar cada hallazgo `[PROVISIONAL]` y cerrar ofreciendo levantar el playbook del cliente (intake → posiciones estándar/aceptable/inaceptable por término) para que la próxima revisión sea calibrada.

**Antes de leer el documento** — si el usuario no aportó los términos reales: "¿Puedes compartir los términos de IA del proveedor? Lo útil es el lenguaje contractual real — el anexo de IA si existe, o el contrato con las cláusulas de IA. Una política de uso aceptable sola no dice qué puede hacer el proveedor con nuestras entradas; solo qué nos está prohibido a nosotros."

## Revisión término a término

Para cada término: extraer lo que el contrato realmente dice y compararlo con la posición del cliente (estándar / alternativa aceptable / inaceptable automático). Las posiciones salen del playbook del cliente, no de este skill.

| Término | Qué buscar |
|---|---|
| **Entrenamiento con nuestros datos** | ¿El proveedor usa entradas para entrenar, ajustar o "mejorar" modelos? ¿Prohibición expresa u opt-out? ¿Opt-in u opt-out por defecto? Si hay datos personales: ¿la finalidad "entrenamiento" está cubierta por la autorización de los titulares (Ley 1581)? Casi siempre el término más importante |
| **Confidencialidad de las entradas** | ¿Prompts, documentos y datos son confidenciales? ¿Excepciones de "revisión de calidad" o revisión humana que permitan a personal del proveedor leer entradas? ¿Compatible con secreto empresarial y deberes de reserva profesional del cliente? |
| **Rol de datos personales** | ¿El proveedor actúa como Encargado del tratamiento? ¿Hay contrato de transmisión/encargo conforme a Ley 1581 y Decreto 1377? ¿Instrucciones documentadas, deber de seguridad, supresión al terminar? |
| **Transferencia internacional** | ¿Dónde se procesan y almacenan los datos (residencia)? ¿A qué países van para inferencia? ¿Cumple el régimen de transferencia internacional de la SIC (nivel adecuado de protección o autorización — verificar)? |
| **Cambios de modelo** | ¿Obligación de aviso ante cambios materiales del modelo? ¿Fijación de versión disponible? |
| **Titularidad / PI de salidas** | ¿Quién es titular del contenido generado? ¿Licencia de vuelta al proveedor sobre outputs? ¿Indemnidad por infracción de PI de terceros? Recordar: en Colombia la titularidad de outputs se asegura por contrato |
| **Responsabilidad por salidas** | ¿El proveedor asume alguna responsabilidad por outputs dañinos, erróneos o infractores? ¿Tope y estructura? ¿Exclusiones? Cláusulas exonerativas totales: contrastar con límites del derecho colombiano (dolo/culpa grave) y con Ley 1480 si aplica |
| **Notificación de incidentes** | ¿Cómo y cuándo nos avisan si el sistema falla, es comprometido o produce errores sistemáticos? ¿Compatible con el deber del Responsable de reportar incidentes de seguridad a la SIC (verificar términos)? |
| **Revisión humana** | ¿Podemos exigir revisión humana de salidas en casos específicos? ¿Apelar o disputar una decisión del sistema? |
| **Restricciones de uso** | ¿Qué nos prohíben? ¿Coincide con el uso que el cliente realmente quiere darle? Definiciones amplias (p. ej. "decisiones automatizadas") que capturen usos previstos |
| **Auditoría** | SOC 2, auditorías de terceros, pruebas de sesgo — ¿algún derecho de auditoría del cliente? |
| **Subencargados / proveedores de modelo** | ¿El proveedor usa sub-proveedores para el modelo? ¿Divulgados? ¿Qué términos gobiernan? |
| **Terminación** | ¿Qué pasa con nuestros datos al terminar? ¿Plazos de supresión/devolución? |
| **Responsabilidad en cadena (stack)** | ¿El proveedor ES el desarrollador del modelo (Anthropic, OpenAI, Google) o un implementador/revendedor (SaaS sobre Claude/GPT; Bedrock, Vertex, Azure)? Si es lo segundo, hay DOS juegos de términos en juego. Identificar: (a) qué términos gobiernan entrenamiento, retención y seguridad; (b) quién responde contractualmente por el comportamiento del modelo; (c) si cada compromiso del proveedor de modelo ("no entrenamos con entradas") se traslada al cliente o queda solo entre proveedor e intermediario. Marcar toda cláusula donde una parte se desentiende de la otra y verificar si el otro contrato cierra la brecha. No revisar los dos contratos por separado |

Si el playbook del cliente no define posición para un término: preguntarla (estándar / alternativa aceptable / inaceptable) y registrarla en `{empresa}/` para que la próxima revisión sea consistente.

**Formato por término:**

> **[Término]** — 🟢 / 🟡 / 🟠 / 🔴
> **El proveedor dice:** [resumen de lo que el contrato realmente dice, con cláusula citada]
> **Nuestra posición:** [del playbook del cliente, o default provisional]
> **Brecha:** [delta específico — o "Alineado"]
> **Ajuste propuesto:** [redacción concreta de la cláusula, o "escalar — fuera de alternativa aceptable"]

Semáforo: 🟢 **Alineado** (igual o mejor que la posición estándar) · 🟡 **Nota** (dentro de la alternativa aceptable pero peor que el estándar; no bloquea) · 🟠 **Significativo** (fuera del estándar pero dentro de la alternativa; exige ajuste antes de firmar) · 🔴 **Crítico** (fuera de toda alternativa; no desplegar sin resolverlo; escalar).

## Chequeo de brecha: datos sí, IA no

**Si hay acuerdo de tratamiento de datos pero no anexo de IA:** "Hay acuerdo de datos (Ley 1581) pero no anexo de IA. Aquel cubre protección de datos pero no: entrenamiento con nuestros datos, aviso de cambios de modelo, responsabilidad por salidas, ni incidentes del sistema de IA. Para un caso de uso de criticidad [estándar/elevada/alta] esta brecha es [aceptable / bloqueante]. Recomendación: exigir anexo de IA o negociar términos de IA en la próxima renovación."

**Si no hay términos de IA en absoluto:** "El proveedor presta un servicio con IA bajo términos generales — cero protección contractual en los rubros de mayor riesgo (entrenamiento, responsabilidad, cambios de modelo). Es 🔴 para cualquier uso de criticidad elevada o alta."

## Consistencia con la política interna de IA

Cruzar los términos del proveedor con la política de IA del cliente. Conflictos típicos: la política prohíbe entrenamiento con datos propios y el contrato lo permite por defecto (exigir prohibición expresa u opt-out confirmado por escrito); la política exige revisión humana y el contrato trata las salidas como finales (el paso humano lo impone el flujo interno, no el proveedor); el proveedor no está en la lista aprobada del cliente — o está en la vetada; la política exige transparencia frente a terceros afectados y el contrato impone confidencialidad sobre las capacidades del sistema. Marcar cada choque: uno de los dos tiene que cambiar.

## Ajustes contractuales (redlines)

**Editar en la granularidad mínima posible.** Un ajuste es un artefacto de negociación, no una reescritura: palabra antes que frase, frase antes que oración, reestructurar el literal antes que reemplazar la oración, y cláusula completa solo cuando la versión del proveedor está tan lejos que el ajuste quirúrgico sería más ilegible que un texto nuevo — y en ese caso decirlo en la remisión. Ante la duda, más pequeño.

**Prueba de traslado en cadena (flow-down).** Para cada término marcado con stack de proveedores — sobre todo entrenamiento, retención, cambio de subencargados y responsabilidad — no basta "verificar aguas arriba": HACER la verificación. (1) Buscar en el contrato lenguaje de traslado ("obligaciones no menos protectoras", "subencargados vinculados por", "términos espejo"). (2) Si existe: citarlo, verificar que cubra el término marcado y señalar quién puede exigirlo (¿el cliente, o solo el intermediario?). (3) Si no existe, proponer cláusula: "El Proveedor garantizará que todo proveedor de modelo, de infraestructura o subencargado utilizado en la prestación del Servicio quede vinculado por obligaciones sobre [datos del Cliente / entrenamiento / retención / confidencialidad] no menos protectoras que las de este contrato, y responderá por los incumplimientos causados por dichos terceros." (4) Severidad: 🔴 si el término es entrenamiento o responsabilidad y no hay traslado; 🟡 si es menos sensible o el traslado es parcial.

**Notas prácticas.** La cláusula de entrenamiento es la que más se escapa: los proveedores varían y cambian de posición en el tiempo — confirmar por escrito en el contrato concreto, nunca asumir por reputación. Mapear el stack antes de revisar (app SaaS → pasarela/orquestación → proveedor de modelo → base de conocimiento/RAG → subencargados) y revisar términos en CADA capa. Las renovaciones son punto de apalancamiento: documentar brechas hoy y condicionar la renovación al anexo de IA. Si el cliente construye producto sobre el modelo del proveedor, las restricciones de uso gobiernan también lo que puede ofrecer a sus propios clientes: contrastarlas con el roadmap, no solo con el uso interno.

## Salida

```markdown
*Documento de trabajo confidencial derivado de términos contractuales normalmente
cubiertos por acuerdo de confidencialidad. Hereda esa reserva: no reenviar al
proveedor ni circular fuera del círculo cliente–asesor.*

# Revisión IA de proveedor: [Nombre]
**Documento revisado:** [anexo IA / cláusulas IA del contrato / ToS] · **Fecha:** [..]
**Caso de uso:** [..] · **Criticidad:** [Estándar / Elevada / Alta]

## Conclusión
[Dos frases: ¿se puede desplegar con estos términos? ¿Qué debe cambiar primero?]
**Hallazgos:** [N]🔴 [N]🟠 [N]🟡 [N]🟢

## Término a término
[Formato por término, arriba]

## Estado del anexo de IA
[Presente / Ausente — y qué implica para este despliegue]

## Consistencia con política interna de IA
[🟢 Consistente | 🟡 Choques: lista]

## Regulación IA Colombia (radar)
[Resultado de vigilancia-normativa-col con etiquetas de certidumbre; lo no confirmado = s/d]

## Ajustes recomendados
[Redlines consolidados, granularidad mínima. Revisar con el abogado antes de enviar.]

## Si el proveedor no cede
[Por cada 🔴/🟠: alternativa aceptable del playbook, o "escalar — fuera de alternativa"]

## Próximos pasos
[Árbol de decisión: redactar el anexo / escalar / pedir más términos del stack / documentar
para renovación / otro. El abogado elige.]
```

Todo entregable pasa por `anti-hallucination-v3`: etiquetas de certidumbre en cada cita normativa y cierre estándar antes de entregar. Cifras (sanciones, topes, valores) SOLO de la tabla maestra de `liquidador-aportes-col` cuando estén CONFIRMADAS; si no, "s/d". Plazos y términos → `vencimientos-procesales-col`.

## Límites (CLAUDE.md del despacho)

- Si el proveedor firmante es un no-abogado del cliente: advertir que firmar tiene consecuencias legales y entregar brief de una página para su abogado antes de recomendar firma. La revisión de borradores no exige esa compuerta; la firma sí.
- No decide aceptar términos fuera de las alternativas: los escala al abogado responsable.
- No evalúa la postura de seguridad informática del proveedor más allá del contrato (función del equipo de seguridad).
- Litigio activo con el proveedor o siniestro en curso → abogado especialista. Efectos tributarios del contrato → contador/CPA, no este skill.

## VINCULACIÓN

| Skill | Cuándo |
|---|---|
| `vigilancia-normativa-col` | Verificación EN VIVO del marco y del estado de la regulación de IA (obligatoria antes del primer uso y en cada revisión) |
| `anti-hallucination-v3` | Etiquetas de certidumbre y cierre de calidad de todo entregable |
| `derecho-digital-col` | Contratos SaaS, T&C, políticas de privacidad y gobernanza de IA del propio cliente |
| `playbook-contratos-col` | Construir/mantener las posiciones de negociación (estándar/aceptable/inaceptable) del cliente |
| `lexa-mercantil-col` | Negociación del contrato marco y aspectos societarios/comerciales |
| `investigacion-juridica-corporativa-col` | Debida diligencia reputacional del proveedor |
| `startups-col` | Cliente que construye producto sobre el modelo del proveedor |
| `liquidador-aportes-col` | Única fuente de cifras confirmadas |
| `vencimientos-procesales-col` | Plazos contractuales y términos ante la SIC |
| `kit-entregables-col` | Empaquetar el informe (Word/PDF/HTML) para el cliente |

---

Adaptado de anthropics/claude-for-legal (licencia del repositorio oficial) para el sistema jurídico colombiano — JA Abogados / Bufete Cortés Cartagena, jul-2026.
