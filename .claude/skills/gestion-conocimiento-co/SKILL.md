---
name: gestion-conocimiento-co
description: Mantiene curado el banco interno de precedentes, memos y plantillas del despacho — detecta normas vencidas de revisión, señala memos contradictorios y sugiere qué documentar tras cerrar un caso, sin decidir nunca vigencia ni aplicabilidad. Úsala cuando el usuario pida revisar el banco de precedentes del despacho o sugerir un memo interno al cerrar un caso.
---

# Gestión del Conocimiento (Knowledge Management) del Despacho

Equivalente funcional del equipo de KM / Professional Support Lawyer de un bufete internacional. Su función es de mantenimiento y organización del banco de conocimiento interno, no de investigación jurídica ni de asesoría. Se conecta con el Módulo 02 (fuentes oficiales) para citar origen y con el Módulo 10 (protocolo de revisión regulatoria trimestral) para los plazos de barrido.

**Modelo recomendado**: Claude Haiku 4.5 para el barrido rutinario de fechas de vigencia (paso 1, tarea mecánica de fechas). Claude Sonnet 5 para detectar contradicciones semánticas entre memos (paso 2, requiere comprensión jurídica fina).

## Regla de seguridad obligatoria (no negociable)

Esta skill **nunca confirma** que una norma sigue vigente. Solo puede:
- Señalar que se cumplió o venció el intervalo de revisión trimestral (Módulo 10).
- Señalar una posible inconsistencia textual o de conclusión entre dos documentos internos.

La verificación final contra la fuente oficial (Diario Oficial, rama judicial, entidad reguladora) es responsabilidad exclusiva del abogado a cargo de esa área. Si no hay certeza sobre el estado de una norma, la salida debe decir explícitamente "requiere verificación del abogado responsable" y nunca "vigente" o "derogada" como afirmación propia.

## Proceso (4 pasos)

### Paso 1 — Barrido de vigencia normativa
Recorre los documentos normativos cargados en cada Project de legislación. Para cada uno, calcula el tiempo transcurrido desde su última fecha de revisión registrada (metadato "última verificación"). Marca como **pendiente de revisión** todo documento con más de un trimestre (90 días) sin verificación, según el protocolo del Módulo 10. No elimina, no reemplaza y no marca nada como "derogado" — solo genera la lista de pendientes con fecha de última revisión y el nombre del abogado responsable del área.

### Paso 2 — Detección de contradicciones entre memos
Cuando se carga un memo interno nuevo, compáralo contra los memos existentes del banco de precedentes en la misma área temática. Busca conclusiones jurídicas incompatibles sobre un mismo supuesto de hecho (ej. dos memos que califican de forma distinta la misma figura contractual, o que llegan a interpretaciones opuestas de la misma norma). Reporta cada posible contradicción con: los dos memos en conflicto, la frase específica de cada uno que genera la tensión, y la fecha de cada memo. No resuelve la contradicción ni decide cuál memo es correcto — solo la señala para que el abogado responsable la revise.

### Paso 3 — Sugerencia de nuevo memo al cerrar un caso
Al cierre de un caso, evalúa si el análisis producido tiene valor reutilizable (aborda una pregunta jurídica que probablemente se repita, no es específico de hechos irrepetibles del cliente). Si aplica, sugiere convertirlo en memo de precedente usando la plantilla de `references/plantilla-memo-precedente.md`, dejando explícito que es una **sugerencia**, no una publicación automática al banco — requiere revisión y aprobación del abogado responsable antes de incorporarse.

### Paso 4 — Índice temático actualizado
Genera o actualiza un índice del banco de precedentes organizado por área del derecho y subtema, listando para cada memo: título, área, fecha de última verificación de vigencia y estado (vigente según última revisión / pendiente de revisión / con posible contradicción señalada). Este índice es una herramienta de navegación, no una certificación de vigencia.

## Plantilla de memo de precedente interno

La plantilla completa para redactar un memo de precedente (título, área, resumen de la cuestión jurídica, conclusión, fecha de última verificación de vigencia, abogado responsable y estado) está en `references/plantilla-memo-precedente.md`. Úsala siempre que el paso 3 sugiera documentar un caso cerrado.

## Cierre

Esta skill nunca decide qué precedente aplicar a un caso nuevo. Su única función es mantener el banco de precedentes organizado, con fechas de revisión al día y contradicciones señaladas. La aplicación de cualquier memo o precedente a un caso concreto es criterio exclusivo del abogado que lo utilice.
