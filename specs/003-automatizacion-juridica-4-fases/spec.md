# Especificación de Funcionalidad: Automatización Jurídica Corporativa en 4 Fases

**Rama de Desarrollo**: `claude/automatizacion-juridica-4-fases-[BRANCH_ID]`

**Creado**: 2026-09-09

**Estado**: Borrador

**Entrada del Usuario**: "Automatización jurídica corporativa en 4 fases (Prospección Quirúrgica → Intake Inteligente → Dossier Ejecutivo → Análisis Forense) con validación multi-fuente, secreto profesional, human-in-the-loop, cumplimiento Habeas Data y deontología profesional."

---

## Historias de Usuario & Pruebas *(obligatorio)*

### Historia de Usuario 1: Prospección Quirúrgica en LinkedIn — Prioridad P1

**Descripción**: El sistema identifica automáticamente en LinkedIn/directorios corporativos decisores jurídicos (Directores Legales, CFOs, Gerentes Generales, Fundadores) de empresas medianas/startups con detonantes de contingencia (rondas de inversión, litigios públicos, reformas legislativas, reestructuración corporativa). Genera secuencias de mensajes de prospección sin venta directa: validación de cargo → memorando ejecutivo → invitación a diagnóstico de 15 minutos.

**Por qué esta prioridad**: La prospección quirúrgica es el punto de entrada de captación corporativa. Automáticamente reemplaza búsqueda manual, elimina ruido comercial y asegura contacto con decisores verificados en el momento óptimo (cuando tienen contingencia urgente).

**Prueba Independiente**: El sistema puede testearse completamente:
- Identificando 10 prospectos califcados en LinkedIn con triggers reales (publicación de ronda de inversión + sector applicable)
- Generando 3 secuencias de mensajes personalizadas (paso 1: validación de cargo + variable de riesgo sector; paso 2: memorando de 1 pág; paso 3: invitación diagnóstico)
- Verificando que ningún mensaje contiene lenguaje comercial agresivo ("contáctame", "oferta", "asesoría gratis")
- Registrando tasa de engagement (apertura, respuesta, solicitud de diagnóstico)

**Escenarios de Aceptación**:

1. **Dado** que LinkedIn identifica a un "Director Legal" de una startup con publicación "Cerramos Ronda Serie A" en último mes, **Cuando** el sistema ejecuta prospección quirúrgica, **Entonces** envía conexión con mensaje que menciona "variable macro específica del sector" (ej: "He observado que en startups post-funding surge contingencia común en blindaje de propiedad intelectual y acuerdos de inversores...") sin solicitar reunión abiertamente.

2. **Dado** que se generó una secuencia de 3 pasos, **Cuando** el prospecto responde afirmativamente al paso 2 (memorando), **Entonces** el sistema traslada conversación a canal seguro (correo corporativo) antes de paso 3, con acuerdo de confidencialidad implícito.

3. **Dado** que un prospecto no responde a paso 1, **Cuando** han pasado 7 días, **Entonces** el sistema descarta contacto (sin reintento automático) y registra como "cold lead".

---

### Historia de Usuario 2: Intake Inteligente con Filtro de Conflictos — Prioridad P2

**Descripción**: Cuando un cliente potencial contacta vía WhatsApp, formulario web o correo, el sistema ejecuta un protocolo de admisión en 3 pasos: (1) Captura de datos básicos + descripción de caso; (2) Validación de conflicto de interés (escaneo automático de contrapartes registradas); (3) Triaje automático a categoría operativa (Prioridad Alta: Procesal/Términos; Corporativo: Propuestas contractuales; Filtrado: Declinación respetuosa). Sistema responde con mensaje profesional que establece términos de comunicación desde primer contacto.

**Por qué esta prioridad**: Intake es la puerta de control que previene aceptación de conflictos de interés y garantiza que clientes potenciales entienden que comunicación en canales públicos no constituye asesoría legal. Sin este filtro, se crean responsabilidades civiles no intencionales.

**Prueba Independiente**: El sistema puede testearse:
- Enviando 5 consultas simuladas vía WhatsApp/correo con diferentes perfiles (existing client, conflicto de interés, procesal urgente, corporativo, personal no-calificado)
- Verificando que cada una recibe respuesta apropiada (enrutamiento correcto, declinación respetuosa, etc.)
- Confirmando que conflictos de interés son identificados y bloqueados
- Validando que términos perentorios se extraen automáticamente (plazos de contestación, apelación, etc.)

**Escenarios de Aceptación**:

1. **Dado** un mensaje en WhatsApp de remitente no registrado diciendo "Tengo una demanda laboral, necesito abogado", **Cuando** el sistema ejecuta intake, **Entonces** responde con mensaje profesional estableciendo: solicitud de datos (nombre, empresa, objeto), verificación de conflicto, confirmación de que contacto vía WhatsApp no constituye retención formal de servicios, e invitación a radicar consulta formal vía correo corporativo con NDA.

2. **Dado** que la consulta revela que demandante es proveedor de JAC o proveedor de cliente existente de JAC, **Cuando** sistema valida contra base de contrapartes registradas, **Entonces** identifica conflicto potencial y traslada a revisión manual del abogado senior (no procede automáticamente).

3. **Dado** que mensaje menciona "comunicación de juzgado", "notificación DIAN" o "plazo de 3 días", **Cuando** sistema clasifica, **Entonces** categoriza como "Prioridad Alta" y genera alerta para revisión inmediata (no entra en cola normal).

---

### Historia de Usuario 3: Dossier Ejecutivo Automatizado para Reuniones — Prioridad P2

**Descripción**: Antes de cada reunión directiva o comité con cliente/prospecto, el sistema extrae automáticamente del calendario (nombre de asistentes, dominio de correo, invitación) y genera expediente sintético que incluye: (1) Perfil del decisor (historial profesional, áreas de especialidad, publicaciones); (2) Radiografía empresarial (objeto social, tamaño nómina estimada, registros mercantiles, litigios públicos); (3) Vulnerabilidades legales del sector (riesgos tercerización laboral, esquemas contractuales atípicos, Habeas Data); (4) Tesis de conversación (3 puntos de entrada estratégicos donde despacho ofrece ROI palpable).

**Por qué esta prioridad**: Dossier automatizado convierte conversación genérica en diagnóstico pericial. Abogado senior entra a reunión con inteligencia previa verificada, proyectando autoridad y justificando premium de tarifa corporativa.

**Prueba Independiente**: El sistema puede testearse:
- Extrayendo 5 invitaciones a reuniones corporativas (dominio empresa + nombres asistentes)
- Generando dossier completo para cada una en < 20 minutos
- Verificando que cada dossier contiene: perfil verificable del decisor, datos corporativos públicos confirmables, riesgos legales del sector derivados de fuentes oficiales
- Validando que las "tesis de conversación" son apoyadas en jurisprudencia o normativa registrada (no opinión especulativa)

**Escenarios de Aceptación**:

1. **Dado** invitación a reunión con "Director Financiero de TechStartup XYZ", **Cuando** sistema extrae datos, **Entonces** genera dossier que incluye: LinkedIn del decisor, datos de empresa en RUES, vulnerabilidades de startups post-seed (riesgo de problemas contractuales con inversores, blindaje de IP, conflictos societarios), y 3 tesis (ej: estructuración de acuerdos inversores, blindaje IP, planeación tributaria).

2. **Dado** que dossier se generó, **Cuando** abogado revisa antes de reunión, **Entonces** puede validar que información es pública, verificable y citables contra fuentes oficiales (no especulación).

3. **Dado** que surge contingencia nueva en reunión, **Cuando** abogado toma nota, **Entonces** sistema registra y traslada a intake formal ANTES de generar concepto o propuesta de honorarios (human-in-the-loop en decisión).

---

### Historia de Usuario 4: Análisis Forense de Datos Corporativos — Prioridad P3

**Descripción**: En litigio corporativo, reestructuración o insolvencia, el sistema procesa automáticamente listados de nóminas, contratos de prestación de servicios, acreencias y liquidaciones. Transforma datos dispersos en matrices estructuradas de contingencia, calculando exposición económica por concepto (indemnizaciones, liquidaciones, perjuicios indexados), generando tablas comparativas de tesis jurídicas vs. pruebas aportadas, cotejando estatutos y actas societarias. Resultado: reportes semanaforizados de riesgos.

**Por qué esta prioridad**: Análisis forense acelera tareas de paralegal que consumirían días/semanas. Permite al abogado senior enfocarse en estrategia y negociación, no en tabulación manual.

**Prueba Independiente**: El sistema puede testearse:
- Procesando listado de 50 empleados con datos de nómina, contrato y prestaciones
- Generando matriz de contingencia laboral (exposición por concepto: indemnización, prestaciones no pagadas, perjuicios morales, etc.)
- Cotejando actas societarias contra estatutos para identificar quórums defectuosos o cesiones no autorizadas
- Validando que todas las cuantías se calculan bajo normatividad colombiana vigente (no hallucinated numbers)
- Generando reporte ejecutivo (1 página) + tablas detalladas

**Escenarios de Aceptación**:

1. **Dado** un archivo Excel con nómina de 100 empleados (nombres, salarios, fechas de entrada), **Cuando** sistema procesa, **Entonces** genera matriz que calcula: (a) exposición a liquidación de prestaciones según CST; (b) riesgo de tutelas laborales si despidos fueron injustificados; (c) perjuicios morales estimados según jurisprudencia consolidada de Corte Suprema.

2. **Dado** que matriz contiene cálculos de liquidación, **Cuando** abogado revisa, **Entonces** cada cifra es citables contra tabla de salarios, jurisprudencia vigente, o norma SUIN (no números especulativos).

3. **Dado** que se identificó riesgo alto en contingencia laboral, **Cuando** abogado senior valida, **Entonces** sistema propone estrategia (ej: negociación previa, provisión contable, acuerdos de pago) basada en precedentes (no recomendación robótica).

---

### Casos Límite

- ¿Qué ocurre si LinkedIn prospecting identifica que el prospecto es abogado competidor? → Sistema descarata de inmediato (no contacta).
- ¿Cómo se maneja información sensible (balances financieros, litigios confidenciales) en Dossier? → Nunca se guardan datos sensibles en sistema automatizado; dossier contiene solo datos públicos y registro de que información sensible fue consultada manualmente.
- ¿Qué sucede si análisis forense descubre contingencia superior a capacidad del despacho? → Sistema alerta al abogado senior; se documenta en reporte y se ofrece derivación a especialista (no se oculta).
- ¿Cómo se garantiza que no se genera conflicto de interés involuntario en prospección? → Antes de cualquier contacto, sistema valida contra base de contrapartes existentes; si hay duda, escala a revisión humana.

---

## Requisitos *(obligatorio)*

### Requisitos Funcionales

- **RF-001**: El sistema DEBE ejecutar prospección en LinkedIn/directorios corporativos identificando automáticamente: título del puesto (Director Legal, CFO, Gerente General, Fundador), empresa, tamaño estimado de nómina, y detonantes de contingencia (publicación de ronda de inversión, cambio de junta directiva, litigios públicos, reformas legislativas aplicables al sector).

- **RF-002**: El sistema DEBE generar automáticamente 3 secuencias de mensajes de prospección: (1) Conexión con validación de cargo + variable de riesgo sector específico; (2) Memorando ejecutivo breve (máx. 1 página) sobre mitigación de contingencia; (3) Invitación a diagnóstico de 15 minutos sin costo. Ningún mensaje DEBE contener lenguaje comercial ("oferta", "contáctame", "asesoría gratis").

- **RF-003**: El sistema DEBE implementar protocolo de admisión que capture: (a) Datos básicos (nombre, empresa, cargo); (b) Descripción breve de consulta; (c) Validación automática de conflicto de interés contra base de contrapartes registradas; (d) Triaje a categoría (Prioridad Alta/Corporativo/Filtrado); (e) Respuesta profesional estableciendo términos de comunicación desde primer contacto.

- **RF-004**: El sistema DEBE responder automáticamente a primer contacto en WhatsApp/correo con mensaje profesional que establece: (1) Confirmación de recepción; (2) Aviso de que comunicación en canales públicos no constituye asesoría legal ni retención de servicios; (3) Solicitud de información clasificada; (4) Invitación a formalizar consulta vía correo corporativo con NDA.

- **RF-005**: El sistema DEBE extraer automáticamente de invitaciones de calendario: nombre de asistentes, dominio de correo, fecha/hora de reunión, y generar dossier ejecutivo que incluya: (a) Perfil del decisor (verificable en LinkedIn/públicos); (b) Radiografía empresarial (RUES, tamaño, sector); (c) Vulnerabilidades legales del sector (derivadas de jurisprudencia/normativa oficial); (d) Tesis de conversación (3 puntos de ROI) respaldados en precedentes.

- **RF-006**: El sistema DEBE procesar automáticamente archivos de nómina, contratos y acreencias, generando matrices de contingencia que calculen: exposición económica por concepto (indemnizaciones, liquidaciones, perjuicios), base normativa de cada cálculo (CST, SUIN, jurisprudencia), e identificación de riesgos o vulnerabilidades.

- **RF-007**: El sistema DEBE validar todos los cálculos de liquidación contra: (a) Tablas de salarios mínimo vigente; (b) Jurisprudencia consolidada (Corte Suprema, Consejo de Estado); (c) Normativa en SUIN. Ningún cálculo puede ser especulativo; todos deben ser citable.

- **RF-008**: El sistema DEBE cotejar automáticamente estatutos sociales, actas de asamblea y acuerdos de accionistas, identificando: quórums defectuosos, cesiones no autorizadas, incumplimientos de cláusulas, restricciones no comunicadas. Reporte DEBE ser semafórico (rojo=riesgo alto, amarillo=mediano, verde=conforme).

- **RF-009**: El sistema DEBE garantizar human-in-the-loop en: (a) Toda validación de conflicto de interés (requiere confirmación manual si existe duda); (b) Toda decisión de envío de concepto jurídico vinculante o memorial procesal (nunca se despacha sin aprobación abogado senior); (c) Toda propuesta de honorarios o aceptación de caso (requiere firma digital del abogado responsable).

- **RF-010**: El sistema DEBE registrar auditoría completa de toda acción: consultas prospectadas, mensajes enviados, datos extraídos, cálculos generados, decisiones de human-in-the-loop. Registro DEBE ser inmutable y verifiable contra fuentes originales.

- **RF-011**: El sistema DEBE cumplir estrictamente: (a) Secreto profesional (no compartir información de cliente en canales públicos o terceros no autorizados); (b) Ley de Habeas Data (consentimiento explícito para procesar datos personales); (c) Código Deontológico de Abogados (no crear conflictos de interés, no prometer resultados, no hacer publicidad de casos de clientes).

- **RF-012**: El sistema DEBE validar que toda información pública utilizada (LinkedIn, RUES, jurisprudencia, normativa) está citable y verificable. Si información no puede confirmarse en fuente oficial, NO se incluye en reporte.

### Entidades Clave (datos involucrados)

- **Prospecto**: Decisor corporativo identificado en LinkedIn (nombre, cargo, empresa, email, triggers de contingencia)
- **Mensaje de Prospección**: Secuencia de 3 pasos (validación + memorando + invitación) generada automáticamente, sin venta directa
- **Cliente Potencial / Consulta Entrante**: Contacto inicial vía WhatsApp/correo/formulario (datos básicos, descripción de caso, conflicto validado)
- **Dossier Ejecutivo**: Expediente sintético para reunión (perfil decisor, radiografía empresa, vulnerabilidades, tesis de conversación)
- **Matriz de Contingencia**: Tabulación de exposición económica por concepto (indemnización, liquidación, perjuicios, etc.) con base normativa
- **Reporte de Análisis Forense**: Documento final con matrices, cálculos verificables y recomendaciones estratégicas (NO conclusiones especulativas)
- **Registro de Auditoría**: Log inmutable de toda acción del sistema (prospección, intake, decisiones human-in-the-loop, cálculos, validaciones)

---

## Criterios de Éxito *(obligatorio)*

### Resultados Medibles

- **SC-001**: Prospección en LinkedIn identifica al menos 10 prospectos calificados por mes (empresas medianas/startups con triggers reales de contingencia corporativa).

- **SC-002**: Tasa de respuesta a secuencias de prospección >= 15% (de 100 contactos, al menos 15 responden a paso 1 o 2).

- **SC-003**: Tasa de conversión a diagnóstico formal >= 30% (de quienes responden, al menos 30% aceptan diagnóstico de 15 min sin costo).

- **SC-004**: De diagnósticos realizados, >= 25% convierten a cliente firmado (retención de servicios con contrato).

- **SC-005**: Protocolo de intake procesa consultas entrantes en < 5 minutos (captura datos + validación conflicto + triaje).

- **SC-006**: Cero conflictos de interés aceptados inadvertidamente (sistema bloquea; en caso de duda, escala a revisión manual).

- **SC-007**: Cero vulneraciones de secreto profesional (no se comparte información de cliente en canales públicos ni con terceros no autorizados).

- **SC-008**: Dossier ejecutivo se genera en < 20 minutos antes de reunión y contiene solo información verificable (citables contra fuentes públicas).

- **SC-009**: Análisis forense de nómina de 100+ empleados se completa en < 2 horas (vs. 2-3 días de trabajo manual).

- **SC-010**: Cien por ciento de cálculos de liquidación son citable contra normatividad colombiana vigente (SUIN, Corte Suprema, CST).

- **SC-011**: Auditoría completa de sistema es verificable contra fuentes originales (trazabilidad 100%).

- **SC-012**: Cero propuestas de honorarios, conceptos jurídicos o memoriales procesales se despachen sin aprobación humana (human-in-the-loop 100%).

---

## Supuestos

- **Supuesto 1**: LinkedIn y directorios corporativos permiten prospección respetando T&S; no se requieren tácticas evasivas.

- **Supuesto 2**: Base de contrapartes registradas está actualizada al momento de validación de conflicto; si hay falta de sincronización, sistema escala a revisión manual.

- **Supuesto 3**: Clientes potenciales contactarán vía WhatsApp, correo o formulario web; no se restringe a un canal único.

- **Supuesto 4**: Fuentes oficiales (SUIN, Diario Oficial, RUES, jurisprudencia de Cortes) están disponibles y accesibles para validación automática.

- **Supuesto 5**: Abogado senior está disponible para revisar y aprobar: conflictos de interés en caso de duda, conceptos jurídicos, propuestas de honorarios. (SLA: dentro de 24 horas).

- **Supuesto 6**: Despacho cuenta con capacidad técnica para mantener logs auditables, seguros y no manipulables (base de datos segura, encriptación, backup diario).

- **Supuesto 7**: Decisores corporativos validan información en LinkedIn como reflejo de realidad (no datos falsificados); sistema valida con datos complementarios (RUES, Cámara de Comercio).

- **Supuesto 8**: Procesar datos personales de prospectos y clientes requiere consentimiento explícito o base legal bajo Ley de Habeas Data; sistema gestiona consentimiento en primer contacto.

- **Supuesto 9**: Cada una de las 4 fases puede operar independientemente; pero prospección y intake están acopladas (el intake procesa leads de prospección).

- **Supuesto 10**: Términos procesales perentorios (contestación, apelación, etc.) son extraídos por el sistema pero NUNCA se usan para tomar decisiones estratégicas sin validación humana (human-in-the-loop obligatorio).

---

## Notas

- Esta especificación está alineada con Constitución de JAC: Sin Alucinaciones (RF-012, SC-010), Verificación Cruzada (RF-012, SC-008), Español Jurídico (redacción de mensajes y reportes), Trazabilidad (RF-010, SC-011), Secreto Profesional (RF-011, SC-007).

- Las 4 fases son **independientemente desplegables**: es posible implementar primero Prospección, luego Intake, etc. Pero prospección alimenta intake, y ambas alimentan análisis forense posterior.

- **Salvaguardas éticas son no-negociables**: Human-in-the-loop en decisiones legales, secreto profesional, cumplimiento Habeas Data. Cualquier reducción de estos controles requiere aprobación explícita de socio responsable.

- Los "Modelos A y B" de secuencias de DM del usuario se implementarán como templates de prompt con variables dinámicas; revisión manual de primeras 20 secuencias antes de automatización completa.

- Análisis forense NUNCA genera recomendación conclusiva sin aprobación abogado senior; sistema propone escenarios y riesgos, abogado elige estrategia.
