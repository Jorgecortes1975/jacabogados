# Especificación de Funcionalidad: Sistema de Escucha Activa Jurídica Corporativa

**Rama de Desarrollo**: `claude/social-listening-legal-agents-6031yv`

**Creado**: 2026-09-09

**Estado**: Borrador

**Entrada del Usuario**: "Activación de agentes de marketing para automatizar prospección jurídica corporativa en redes sociales (X, Facebook, Instagram, TikTok) mediante detección de contingencias, intervención asimétrica de alto nivel y conversión hacia servicios de litigio y blindaje patrimonial, preservando sobriedad pericial y confidencialidad profesional."

---

## Historias de Usuario & Pruebas *(obligatorio)*

### Historia de Usuario 1: Detección Autónoma de Contingencias Corporativas en X (Twitter) — Prioridad P1

**Descripción**: El sistema monitorea automáticamente hilos públicos en X que revelan contingencias jurídicas corporativas (reformas tributarias, demandas entre socios, sanciones administrativas, bloqueos bancarios) usando palabras clave especializadas. Cuando detecta un hilo que implica una empresa verificada con riesgo patrimonial, lo clasifica por magnitud y relevancia.

**Por qué esta prioridad**: La detección en X es el punto de entrada de más alto valor porque:
- X es la plataforma donde se exponen públicamente reformas legislativas y contingencias corporativas
- Los decisores (fundadores, CFOs, abogados generales) participan activamente en estos debates
- La velocidad de detección genera primicia técnica (el despacho detecta y responde antes que el cliente se dé cuenta del riesgo completo)

**Prueba Independiente**: El sistema puede ser testeado completamente ejecutando una búsqueda de palabras clave en X, capturando 5 hilos relevantes, clasificándolos por riesgo corporativo (alto/medio/bajo), y validando que cada uno contiene una contingencia real verificable contra fuentes oficiales (DIAN, Superintendencia, jurisprudencia).

**Escenarios de Aceptación**:

1. **Dado** que existe un hilo público en X que menciona "requerimiento DIAN" + "empresa de comercio" + "plazo de respuesta", **Cuando** el agente ejecuta su ciclo de monitoreo, **Entonces** el sistema identifica el hilo, clasifica al autor como decisor corporativo (si tiene verificación de empresa), y lo marca como contingencia de "Fiscalización Tributaria - Alto Riesgo".

2. **Dado** que un hilo en X menciona "conflicto entre socios" + "acuerdo de accionistas", **Cuando** el agente valida la relevancia contra fuentes oficiales (Superintendencia de Sociedades, jurisprudencia de Consejo de Estado), **Entonces** el sistema confirma que la contingencia es real y la agrega a la cola de prospección.

3. **Dado** que un hilo detectado contiene menciones de cifras o normativa, **Cuando** el agente intenta validar contra SUIN, Diario Oficial o fuentes de Cortes, **Entonces** si la información no puede verificarse en múltiples fuentes, el sistema no procede con prospección (evita alucinación y litigiosidad).

---

### Historia de Usuario 2: Generación de Ganchos de Intervención Técnica Asimétrica — Prioridad P2

**Descripción**: Cuando se detecta un prospecto calificado (empresa con estructura formal, decisor verificado, contingencia real), el sistema genera automáticamente una respuesta técnica de alto nivel que:
- No es publicidad comercial
- Refuta un mito técnico común o aporta la variable normativa ignorada
- Proyecta autoridad sin solicitar la reunión en abierto
- Se redacta en tono senior (sin expresiones de venta tipo "contáctame", "asesoría gratis")

**Por qué esta prioridad**: La diferencia entre una respuesta genérica y una respuesta técnica que proyecta autoridad es la que convierte un "me gusta" en un "voy a seguir esta conversación". Los ganchos deben competir contra ruido publicitario, y la única arma que tiene un despacho senior es la precisión conceptual.

**Prueba Independiente**: El sistema puede ser testeado analizando 3 hilos públicos detectados (uno por plataforma: X, Instagram, TikTok), generando un gancho técnico para cada uno, mostrando que cada gancho:
- Contiene una afirmación jurídica verificable (citada contra norma o sentencia)
- No contiene lenguaje de venta ("oferta", "llamame", "agendar demo")
- Está redactado en español jurídico colombiano
- Proyecta distancia profesional

**Escenarios de Aceptación**:

1. **Dado** un hilo en X sobre reforma tributaria, **Cuando** el agente genera un gancho de intervención, **Entonces** el texto abre con precisión técnica ("El debate técnico suele centrarse en cuantía de gravamen, obviando riesgo de levantamiento del velo corporativo bajo artículo X..."), respalda con sentencia verificable (Corte Suprema, Consejo de Estado, o SUIN), y cierra sin solicitar contacto directo.

2. **Dado** un video viral en Instagram de un fundador mencionando plagio de marca, **Cuando** el agente genera un comentario técnico, **Entonces** el comentario explica el blindaje preventivo sin pedir que se contacte al despacho en ese momento.

3. **Dado** que la generación de ganchos requiere una fuente jurídica (norma, sentencia), **Cuando** el agente no puede validar la información contra fuentes oficiales, **Entonces** el gancho NO se genera; en su lugar, el sistema registra la contingencia como "no verifiable" y la marca para revisión manual del abogado (evita alucinación).

---

### Historia de Usuario 3: Canalización de Prospecto hacia Contacto Seguro con NDA — Prioridad P3

**Descripción**: Cuando un prospecto calificado interactúa con el gancho técnico (reply, retweet, seguidor del despacho en Instagram), el sistema ejecuta una secuencia de mensaje directo (DM) que:
- Reconoce la interacción sin presión comercial
- Ofrece un memorando ejecutivo de diagnóstico (2 páginas) como prueba de valor
- Canaliza la conversación hacia correo corporativo antes de compartir documentos o detalles sensibles
- Respeta principios de secreto profesional (no mata contingencias corporativas en chat público)

**Por qué esta prioridad**: La conversión no ocurre en público; ocurre cuando el prospecto ve que el despacho entiende realmente su riesgo específico. Los DMs privados son el canal seguro donde se valida conflicto de interés y se propone diagnóstico preliminar formal.

**Prueba Independiente**: El sistema puede ser testeado simulando un prospecto que interactúa con un gancho técnico publicado (reply a un tweet, comentario en Instagram). El flujo de conversión debe:
- Dispararse automáticamente
- Redactar un DM personalizado que mencione la contingencia detectada
- Ofertar un memorando sin pedir datos sensibles
- Canalizar hacia correo corporativo o NDA antes de siguiente paso
- Registrar la interacción para seguimiento manual

**Escenarios de Aceptación**:

1. **Dado** que un director de empresa responde un gancho técnico en X, **Cuando** el agente detecta la interacción y valida que es decisor corporativo verificado, **Entonces** envía un DM privado que abre con "He seguido su análisis relativo a la contingencia..." sin ser invasivo.

2. **Dado** un DM iniciado, **Cuando** el prospecto muestra interés, **Entonces** el sistema propone compartir memorando de diagnóstico y solicita un correo corporativo o acuerdo de confidencialidad (NDA) ANTES de enviar cualquier documento.

3. **Dado** que el prospecto no responde o rechaza, **Cuando** han pasado 7 días, **Entonces** el sistema registra la interacción como "cold" y no reintenta sin intervención manual del equipo de ventas.

---

### Casos Límite

- ¿Qué sucede si se detecta un hilo que menciona el nombre del despacho directamente? → Sistema clasifica como "mention inbound" y prioriza respuesta manual (no automatizada).
- ¿Cómo maneja el sistema un hilo que revela información sensible de un cliente existente? → Sistema cancela prospección automática e informa inmediatamente al equipo legal (riesgo de confidencialidad).
- ¿Qué ocurre si la contingencia detectada es relevante pero el prospecto es una cuenta falsa o bot? → Sistema descarta (valida autenticidad de cuenta contra indicadores de verificación de plataforma).
- ¿Cómo evita spam o multiplicación de contactos a la misma empresa? → Sistema mantiene registro de interacciones por dominio corporativo; no genera múltiples ganchos o DMs para la misma empresa en 90 días.

---

## Requisitos *(obligatorio)*

### Requisitos Funcionales

- **RF-001**: El sistema DEBE monitorear automáticamente X (Twitter), Facebook, Instagram y TikTok usando palabras clave especializadas que denotan contingencias corporativas (reformas tributarias, sanciones administrativas, conflictos de socios, plazo de respuesta a autoridades, registro de marca/oposición).

- **RF-002**: El sistema DEBE clasificar cada detección por magnitud corporativa (empresa verificada vs. individual, cuantía estimada de riesgo, sector) usando indicadores públicos (verificación de cuenta, número de seguidores, actividad comercial visible).

- **RF-003**: El sistema DEBE validar cada contingencia detectada contra al menos DOS fuentes oficiales (SUIN, Diario Oficial, jurisprudencia de Cortes, DIAN, Superintendencia de Sociedades) antes de proceder a generación de gancho. Si no puede verificarse, la contingencia se marca como "no verifiable" y no se prosigue con prospección.

- **RF-004**: El sistema DEBE generar ganchos técnicos que:
  - Abren con precisión conceptual (refutando un mito común o aportando variable normativa ignorada)
  - Incluyen cita verificable (sentencia, norma, decreto, con número/fecha/fuente)
  - NO incluyen lenguaje comercial ("contáctame", "oferta", "asesoría gratis", "agenda demo")
  - Están redactados en español jurídico colombiano
  - Proyectan distancia profesional y autoridad técnica
  - Son aptos para publicación en el hilo público sin ajustes

- **RF-005**: El sistema DEBE detectar cuando un prospecto calificado interactúa con un gancho publicado (reply, retweet, seguidor nuevo en Instagram, comentario en TikTok) y debe disparar automáticamente una secuencia de DM privado que:
  - Reconoce la interacción de forma natural (no robótica)
  - Ofrece un memorando de diagnóstico preliminar (máx. 2 páginas) como prueba de valor
  - Solicita confirmación de datos corporativos y autorización para compartir documentos bajo NDA
  - No reitera la venta en abierto

- **RF-006**: El sistema DEBE canalizar toda información sensible (documentos, análisis detallado, datos de litigio en curso) hacia correo corporativo o sala segura con NDA suscrito; NO debe permitir custodia de documentos reservados en DMs de redes sociales abiertas.

- **RF-007**: El sistema DEBE operar con temperatura stricta (0.2) en todas las generaciones de texto para evitar alucinaciones; prioritiza precisión conceptual sobre fluidez narrativa.

- **RF-008**: El sistema DEBE registrar cada detección, clasificación, gancho generado, interacción de prospecto y resultado (contact-accepted, contact-rejected, no-response) para análisis de tasa de conversión y refinamiento continuo de palabras clave.

- **RF-009**: El sistema DEBE respetar T&S de cada plataforma; no debe generar múltiples cuentas, usar bots de interacción, o spam. Cada intervención es manual (publicación del gancho) o automática pero contextual (respuesta a interacción real del prospecto).

- **RF-010**: El sistema DEBE inviolabilidad del secreto profesional; si detecta en una red pública que un cliente existente tiene contingencia, cancela prospección y escala internamente (no publicita contingencia de cliente en gancho público).

### Entidades Clave (datos involucrados)

- **Detección de Contingencia**: Hilo/publicación pública que revela riesgo corporativo (texto, autor, plataforma, URL, timestamp, palabras clave activadas)
- **Prospecto**: Perfil/usuario que originó la contingencia (nombre, cargo/empresa inferido, verificación de plataforma, historial de interacciones públicas)
- **Gancho Técnico**: Respuesta de alto nivel generada automáticamente (texto, citas, plataforma destino, status de publicación)
- **Interacción**: Cuando prospecto responde a gancho (tipo: reply/retweet/comment/follow/DM, timestamp, texto)
- **Conversión**: Transición de prospecto desde red pública a contacto corporativo seguro (correo, NDA, memorando compartido, status: accepted/rejected/pending)
- **Registro de Auditoría**: Toda acción del sistema (detección, validación, generación, interacción, DM) queda registrada para trazabilidad y cumplimiento de secreto profesional

---

## Criterios de Éxito *(obligatorio)*

### Resultados Medibles

- **SC-001**: Sistema detecta contingencias corporativas reales en X con precisión >= 90% (de 10 detecciones, al menos 9 se pueden validar contra fuentes oficiales en menos de 2 minutos de investigación manual).

- **SC-002**: Cada gancho técnico publicado contiene al menos una cita verificable (sentencia, norma con número y fecha) que puede corroborarse en fuente oficial (SUIN, Diario Oficial, jurisprudencia de Cortes colombianas).

- **SC-003**: Tasa de interacción (reply, retweet, follow) en ganchos publicados >= 8% (estándar para contenido técnico en X es 2-5%; objetivo es sobrepasar sector legal).

- **SC-004**: De prospectos que interactúan con ganchos, >= 40% aceptan recibir memorando de diagnóstico privadamente (tracción de DM → correo corporativo).

- **SC-005**: De prospectos que reciben memorando, >= 25% solicitan diagnóstico formal o agendamiento (conversión a pipeline de ventas).

- **SC-006**: Cero vulneraciones de secreto profesional (no se publica, en gancho o DM, información sensible de clientes existentes).

- **SC-007**: Tiempo de ciclo Detección → Gancho Publicado es <= 30 minutos (permite respuesta en tiempo real a contingencias públicas).

- **SC-008**: El sistema es capaz de monitorear simultáneamente 4 plataformas (X, Facebook, Instagram, TikTok) sin degradación de detección o aumento de falsos positivos.

---

## Supuestos

- **Supuesto 1**: Los tomadores de decisión corporativos (CFOs, directores legales, fundadores) son usuarios activos en X y siguen debates públicos sobre reforma tributaria, fiscalización y litigio corporativo. (Estándar: ejecutivos de empresas > $5M en ingresos anuales).

- **Supuesto 2**: Las contingencias detectadas en redes públicas reflejan disputas reales o cambios normativos verificables en fuentes oficiales; no se trata de rumores infundados. (Validación multi-fuente mitiga este riesgo).

- **Supuesto 3**: Los prospectos calificados preferirán una respuesta técnica asimétrica sobre spam comercial; se enganchan con precisión conceptual, no con ofertas.

- **Supuesto 4**: Las plataformas de redes sociales permitirán monitoreo y publicación de ganchos respetando T&S; no se requerirán tácticas evasivas o violación de T&S.

- **Supuesto 5**: El despacho cuenta con recursos para responder DMs de prospectos dentro de 24 horas (requerimiento de SLA para conversión efectiva).

- **Supuesto 6**: Las fuentes oficiales (SUIN, Diario Oficial, Cortes colombianas, DIAN, Superintendencia) están disponibles y accesibles vía APIs o web públicos para validación automática de contingencias.

- **Supuesto 7**: La generación de ganchos usará modelos de lenguaje con temperatura baja (0.2) para priorizar precisión sobre creatividad; esto es aceptable porque el objetivo es autoridad técnica, no viralidad.

- **Supuesto 8**: Cada prospecto contactado tiene acceso a correo corporativo verificable o cadena de contacto corporativa; los DMs de redes son canal preliminar, no final.

---

## Notas

- Esta especificación está alineada con los principios de la Constitución de JAC: Sin Alucinaciones (RF-003, RF-007), Verificación Cruzada Multi-Fuente (RF-003), Español Jurídico Colombiano (RF-004), Trazabilidad (RF-008), e Inviolabilidad de Secreto Profesional (RF-010).

- La matriz estratégica del usuario (Fase 1: Escucha Activa → Fase 2: Intervención Asimétrica → Fase 3: Conversión Institucional) se traduce aquí como RF-001/RF-002 (Fase 1), RF-004 (Fase 2), RF-005/RF-006 (Fase 3).

- Los "Modelos A y B" de secuencias de DM del usuario se implementarán como templates de prompt con variables dinámicas (nombre prospecto, contingencia detectada, memorando ofertado), asegurando personalización sin perder rigor.

- La erradicación del estilo publicitario (principio del usuario) se enforza técnicamente mediante: temperatura baja (RF-007), diccionario negativo de palabras comerciales, revisión manual previa de primeras 10 ganchos.
