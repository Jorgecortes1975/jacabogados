---
name: marketing-juridico-corporativo-col
description: Construye y actualiza portafolios de servicios y estrategias de marketing jurídico para despachos de abogados en Colombia. Incluye catálogo maestro de quince áreas de práctica con plantilla estándar, plantillas institucionales (quiénes somos, equipo, casos de éxito, encuesta de diagnóstico de cliente, FODA, objetivos) y once prompts R.A.C.F. de estrategia (mercado, competencia, cliente, tendencias, FODA/Porter, plan de lanzamiento, viaje del cliente, finanzas, riesgos, expansión, posicionamiento). Actívala siempre que pidan crear, unificar o mejorar el portafolio de servicios de un despacho, redactar estrategia de marketing jurídico o comercial, definir el posicionamiento de una firma legal, o cuando mencionen portafolio de servicios, plan de negocio de un despacho, catálogo de servicios legales, marca de un bufete o captación de clientes para abogados. También úsala si suben portafolios o planes de negocio legales dispersos para unificarlos.
---

# Marketing Jurídico y Corporativo para Despachos

Este skill convierte información dispersa de un despacho (varios documentos de portafolio, ideas sueltas de servicios, un plan de negocio incompleto) en un sistema de marketing y crecimiento comercial coherente: un catálogo de servicios con estructura profesional, la identidad institucional que lo respalda, y las herramientas de análisis estratégico para sostenerlo en el tiempo.

No genera textos genéricos de relleno. Cada pieza que produce debe conectarse con datos reales del despacho o quedar marcada explícitamente como pendiente de completar.

## Regla que gobierna todo el skill

Nunca inventes datos identificables del despacho: nombre de la firma, nombres de abogados, número de tarjeta profesional, cifras de facturación, casos de éxito, testimonios o años de fundación. Si el usuario no los ha dado, dejan un placeholder entre corchetes (`[NOMBRE DEL DESPACHO]`, `[ABOGADO TITULAR]`, `[TARJETA PROFESIONAL]`, etc.) y pregúntale directamente por los datos que falten antes de dar por terminado el entregable. Un portafolio con placeholders visibles es honesto y útil; un portafolio con datos inventados es un riesgo reputacional para un despacho real.

## Recursos de este skill

- `references/catalogo-servicios-maestro.md` — quince áreas de práctica con la plantilla estándar de seis campos (descripción, objetivo, metodología, actividades clave, modalidades de honorarios, público objetivo). Úsalo como banco de contenido: selecciona y adapta, no copies áreas que el despacho no ejerce.
- `references/plantillas-institucionales.md` — quiénes somos, equipo, casos de éxito y testimonios, encuesta de diagnóstico de cliente, FODA institucional y objetivos medibles.
- `references/prompts-estrategicos.md` — once prompts R.A.C.F. listos para ejecutar cuando el usuario necesite un análisis estratégico específico (mercado, competencia, cliente, tendencias, FODA/Porter, GTM, viaje del cliente, finanzas, riesgo, expansión, posicionamiento), con una tabla para elegir el prompt correcto según la situación del despacho.

Lee el archivo de referencia correspondiente completo antes de producir el entregable; no improvises contenido que ya está resuelto en esos archivos.

## Flujo de trabajo

### 1. Identifica qué necesita el usuario

Los pedidos típicos caen en una de estas categorías. Identifica cuál es antes de empezar, porque cada una usa un recurso distinto:

- **Portafolio de servicios completo** (documento para presentar a clientes) → combina `catalogo-servicios-maestro.md` con la sección "Quiénes somos" y "Equipo" de `plantillas-institucionales.md`.
- **Plan de negocio o estrategia de crecimiento interno** (para socios, no para clientes) → añade FODA, objetivos y, si aplica, uno o varios prompts de `prompts-estrategicos.md` ya ejecutados con los datos del despacho.
- **Pieza específica de marketing** (posicionamiento, plan de lanzamiento, análisis de competencia) → identifica el prompt correspondiente en la tabla de `prompts-estrategicos.md` y ejecútalo directamente con los datos que el usuario provea.
- **Unificación de documentos dispersos** (el usuario sube varios portafolios o borradores) → lee todos los documentos aportados, extrae qué áreas de práctica y qué datos institucionales reales contienen, y reconcilia duplicados o contradicciones preguntando al usuario cuál versión es la vigente antes de fusionar.

### 2. Recoge los datos reales del despacho

Antes de redactar, confirma con el usuario (o revisa lo que ya haya compartido en la conversación o en archivos adjuntos):

- Nombre del despacho, ciudad y año de fundación.
- Áreas de práctica que realmente ejerce (no ofrezcas las quince del catálogo maestro por defecto).
- Nombres, tarjeta profesional y trayectoria del equipo, si se autoriza publicarlos.
- Modalidades de honorarios que maneja.
- Casos de éxito o testimonios reales, si existen y están autorizados para publicarse.
- Objetivos de crecimiento del periodo actual, si los tiene definidos.

Si falta algo esencial para el entregable pedido, pregunta antes de avanzar en lugar de rellenar con supuestos — especialmente en nombres, cifras y casos de éxito.

### 3. Ensambla el entregable

Para documentos extensos (portafolio completo, plan de negocio), usa el skill `docx` para producir un archivo Word con diseño profesional: portada, tabla de contenido si el documento supera diez páginas, tipografía consistente y sin relleno promocional repetido entre secciones (ver la advertencia sobre frases genéricas en `catalogo-servicios-maestro.md`).

Para piezas cortas (un prompt ejecutado, un one-pager de posicionamiento), basta con entregarlo en la conversación o como archivo corto, según lo que pida el usuario.

### 4. Verificación final antes de entregar

Antes de dar el documento por terminado, revisa:

1. Que ningún dato identificable (nombre, tarjeta profesional, cifra, caso, testimonio) haya sido inventado.
2. Que las áreas de práctica incluidas sean las que el despacho realmente ejerce.
3. Que las referencias normativas mencionadas (DIAN, SAGRLAFT, SECOP, ANLA, Superintendencias, reformas en trámite) estén marcadas para verificación de vigencia si no se confirmaron con fuente oficial en esta conversación.
4. Que no queden frases de relleno repetidas entre secciones (revisa la nota sobre esto en `catalogo-servicios-maestro.md`).

## Cuándo usar los prompts estratégicos en vez de redactar directamente

Si el usuario pide un análisis (no un documento de portafolio) — por ejemplo "necesito saber qué tan grande es el mercado de derecho laboral en mi ciudad" o "ayúdame a definir el mensaje de mi despacho" — ve directo a `prompts-estrategicos.md`, elige el prompt correspondiente con la tabla de selección, complétalo con los datos reales que el usuario te dé y ejecútalo tú mismo en la conversación. No hace falta pasar por todo el flujo de ensamblaje de documento para estas solicitudes puntuales.
