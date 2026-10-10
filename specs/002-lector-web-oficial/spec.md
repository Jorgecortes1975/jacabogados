# Especificación de Funcionalidad: Lector Web de Fuentes Oficiales

**Rama de trabajo**: `ccr-77a599ab-pcqqzx`

**Creado**: 2026-10-10

**Estado**: Borrador

**Entrada**: Descripción del usuario: "Lector web restringido a dominios oficiales colombianos para el agente jurídico JAC: dada una URL, valida que pertenezca a una lista blanca de dominios oficiales, la descarga directamente sin enviar la URL ni el contenido a terceros, limita el tamaño de respuesta, bloquea destinos no públicos, extrae el texto y devuelve el contenido con trazabilidad (fuente, autoridad, URL, fecha de consulta y huella de integridad). Todo resultado queda marcado como pendiente de verificación de vigencia y nunca como verificado automáticamente."

**Origen**: Evaluación del proyecto Agent-Reach (8 de octubre de 2026, commit `94f06c1`). Se descartó su integración y se adoptó únicamente la idea de un lector web acotado. Esta especificación no reutiliza código de ese proyecto.

## Escenarios de Usuario y Pruebas *(obligatorio)*

### Historia 1 - Leer una página de una fuente oficial con trazabilidad (Prioridad: P1)

El abogado, o el agente jurídico en su nombre, entrega la dirección de una página publicada por una autoridad colombiana (por ejemplo, una relatoría o un texto normativo) y recibe el texto de la página junto con los datos necesarios para citarla y para comprobar después que no cambió.

**Por qué esta prioridad**: Es el valor central. Sin lectura trazable, el agente no puede apoyar sus respuestas en el texto publicado por la autoridad (principios I y IV de la constitución).

**Prueba independiente**: Se entrega una dirección de un dominio de la lista autorizada y se verifica que la respuesta contenga el texto, la autoridad emisora, la dirección consultada, la fecha y hora de consulta y las huellas de integridad.

**Escenarios de aceptación**:

1. **Dado** una dirección cuyo dominio está en la lista autorizada, **cuando** se solicita su lectura, **entonces** el sistema devuelve el texto de la página y los metadatos de trazabilidad completos.
2. **Dado** una lectura exitosa, **cuando** se revisa el resultado, **entonces** el estado de vigencia figura como "pendiente de verificación" y no existe ningún campo que lo declare verificado.
3. **Dado** dos lecturas de la misma página sin cambios en su contenido, **cuando** se comparan, **entonces** las huellas de integridad son idénticas; si el contenido cambió, son distintas.

---

### Historia 2 - Rechazar fuentes no autorizadas (Prioridad: P1)

Cuando se entrega una dirección que no pertenece a una autoridad de la lista, el sistema la rechaza sin contactar el sitio y explica el motivo.

**Por qué esta prioridad**: Protege la garantía de "solo fuentes oficiales". Sin este control, el lector se convertiría en una vía para incorporar blogs o contenido no verificable.

**Prueba independiente**: Se envían direcciones de dominios no autorizados y se verifica que ninguna genere una conexión de red y que todas reciban un rechazo con motivo.

**Escenarios de aceptación**:

1. **Dado** una dirección de un dominio ajeno a la lista, **cuando** se solicita su lectura, **entonces** el sistema la rechaza indicando que la fuente no está autorizada y no realiza ninguna conexión.
2. **Dado** una dirección que imita un dominio oficial (por ejemplo, un dominio externo que contiene el nombre de una entidad en su texto), **cuando** se solicita su lectura, **entonces** el sistema la rechaza.
3. **Dado** una página autorizada que redirige a un dominio no autorizado, **cuando** se solicita su lectura, **entonces** el sistema detiene la lectura y la rechaza.

---

### Historia 3 - Proteger la confidencialidad y la red interna (Prioridad: P1)

El sistema nunca envía las direcciones consultadas ni el contenido leído a servicios externos de terceros, y nunca accede a destinos que no sean públicos.

**Por qué esta prioridad**: Las consultas pueden revelar la estrategia o la identidad de un cliente, información sujeta a reserva profesional y a la normativa de protección de datos personales. Un destino interno accesible por error expondría la red del despacho.

**Prueba independiente**: Se registran todas las conexiones salientes durante una lectura y se verifica que solo se contacte el dominio autorizado solicitado. Se intenta leer direcciones que apuntan a destinos locales o privados y se verifica el rechazo.

**Escenarios de aceptación**:

1. **Dado** una lectura exitosa, **cuando** se revisan las conexiones salientes, **entonces** solo existe contacto con el dominio autorizado solicitado.
2. **Dado** una dirección que apunta a la propia máquina, a una red privada o a una dirección reservada (directa, por nombre que resuelve a ella o por redirección), **cuando** se solicita su lectura, **entonces** el sistema la rechaza.
3. **Dado** una dirección con usuario y contraseña incrustados, **cuando** se solicita su lectura, **entonces** el sistema la rechaza.

---

### Historia 4 - Acotar el tamaño y el tiempo de la lectura (Prioridad: P2)

Una página excesivamente grande, o un servidor lento, no bloquea ni agota los recursos del agente; el sistema corta la lectura y lo informa.

**Por qué esta prioridad**: Es una protección de estabilidad y de costo, secundaria frente a las de confidencialidad y fuente.

**Prueba independiente**: Se lee una página que supera el límite de tamaño y otra que no responde dentro del tiempo máximo, y se verifica el aviso en ambos casos.

**Escenarios de aceptación**:

1. **Dado** una página que supera el tamaño máximo permitido, **cuando** se solicita su lectura, **entonces** el sistema interrumpe la descarga y devuelve un aviso de límite excedido, sin entregar contenido parcial como si fuera completo.
2. **Dado** un servidor que no responde dentro del tiempo máximo, **cuando** se solicita su lectura, **entonces** el sistema devuelve un aviso de tiempo agotado.

---

### Historia 5 - Declarar con claridad lo que no se pudo leer (Prioridad: P2)

Cuando la página exige acceso interactivo, es un documento que el lector no sabe interpretar, o está vacía, el sistema lo declara de forma explícita en lugar de devolver texto vacío o inventado.

**Por qué esta prioridad**: Responde al principio "Sin Alucinaciones": ante la imposibilidad de leer, el sistema debe decirlo.

**Prueba independiente**: Se leen páginas que requieren interacción, un formato no soportado y una página sin texto, y se verifica el mensaje de causa en cada caso.

**Escenarios de aceptación**:

1. **Dado** una página que presenta un desafío anti-robot, **cuando** se solicita su lectura, **entonces** el sistema informa que no se obtuvo el contenido y sugiere consultar la fuente manualmente.
2. **Dado** un tipo de contenido no soportado, **cuando** se solicita su lectura, **entonces** el sistema informa el tipo detectado y que no pudo leerlo.
3. **Dado** una página sin texto extraíble, **cuando** se solicita su lectura, **entonces** el sistema no devuelve un resultado exitoso vacío.

---

### Historia 6 - Mantener y auditar la lista de dominios autorizados (Prioridad: P3)

Un responsable del despacho puede consultar qué autoridades y dominios están autorizados, y modificar la lista de manera controlada y documentada.

**Por qué esta prioridad**: Hace sostenible la funcionalidad, pero la lista inicial permite operar desde el primer día.

**Prueba independiente**: Se consulta la lista vigente y se verifica que cada dominio tenga asociada su autoridad y que los cambios queden registrados.

**Escenarios de aceptación**:

1. **Dado** la lista autorizada, **cuando** se consulta, **entonces** cada dominio muestra la autoridad emisora a la que corresponde.
2. **Dado** un cambio en la lista, **cuando** se aplica, **entonces** el cambio queda documentado conforme a la gobernanza de la constitución (actualización de la configuración de fuentes y de la tabla de fuentes del `CLAUDE.md`).

---

### Casos Límite

- Dirección sin protocolo seguro (http): se rechaza; no se eleva automáticamente a https ni se lee en claro.
- Dirección con mayúsculas, caracteres internacionales o variantes de escritura del dominio: se normaliza antes de validar; las variantes engañosas se rechazan.
- Dirección con un puerto distinto del estándar de HTTPS (443): se rechaza; no se normaliza ni se acepta.
- Subdominios de un dominio autorizado: se aceptan únicamente si la regla de la lista los cubre expresamente.
- Sitio con certificado inválido o vencido: se rechaza la lectura y se informa; no se continúa.
- Redirecciones en cadena o en ciclo: se limita el número de saltos y cada salto se vuelve a validar.
- Documentos en PDF u otros formatos publicados por las cortes: fuera de la versión 1; se rechazan con aviso explícito y se indica consultar el documento manualmente en la fuente.
- Página que cambia entre dos lecturas: la huella y la fecha permiten detectar la diferencia.
- Contenido con instrucciones dirigidas a un asistente de IA: se trata siempre como texto a leer, nunca como orden a ejecutar.
- Fuente oficial caída o en mantenimiento: se informa la no disponibilidad y no se sustituye por otra fuente no autorizada.

## Requisitos *(obligatorio)*

### Requisitos Funcionales

- **RF-001**: El sistema DEBE aceptar una dirección web y devolver el texto de la página únicamente si su dominio pertenece a la lista de dominios autorizados.
- **RF-002**: El sistema DEBE comparar el dominio de forma exacta o por subdominio expresamente cubierto, y NO por coincidencia parcial de texto, de modo que los dominios engañosos queden rechazados.
- **RF-003**: El sistema DEBE rechazar toda dirección no autorizada sin establecer conexión con ella y DEBE informar el motivo.
- **RF-004**: El sistema DEBE descargar el contenido directamente desde el dominio autorizado y NO DEBE enviar la dirección ni el contenido a servicios intermediarios, de búsqueda o de conversión de terceros.
- **RF-005**: El sistema DEBE rechazar destinos no públicos: la propia máquina, redes privadas, direcciones reservadas o de enlace local, tanto escritas directamente como resueltas desde un nombre de dominio, y DEBE volver a validar el destino en cada redirección.
- **RF-006**: El sistema DEBE rechazar direcciones con credenciales incrustadas y direcciones con esquemas distintos de web segura.
- **RF-007**: El sistema DEBE limitar el número de redirecciones y DEBE validar la lista autorizada en cada una.
- **RF-008**: El sistema DEBE imponer un tamaño máximo de contenido y un tiempo máximo de lectura, y DEBE interrumpir y avisar al excederlos, sin entregar contenido parcial como completo.
- **RF-009**: El sistema DEBE extraer el texto legible de la página, eliminando elementos de navegación y de presentación que no forman parte del contenido jurídico.
- **RF-010**: El sistema DEBE devolver con cada lectura exitosa: autoridad emisora, dominio, dirección consultada, dirección final tras redirecciones, fecha y hora de consulta, huellas de integridad (del contenido recibido y del texto extraído) y estado de vigencia.
- **RF-011**: El sistema DEBE marcar todo resultado con estado de vigencia "pendiente de verificación" y NO DEBE ofrecer ninguna vía para marcarlo automáticamente como verificado. La verificación de vigencia seguirá el protocolo de verificación de las fuentes oficiales del agente.
- **RF-012**: El sistema DEBE tratar el contenido leído exclusivamente como datos y NO DEBE ejecutar ni obedecer instrucciones contenidas en él.
- **RF-013**: El sistema DEBE declarar de forma explícita las lecturas fallidas, parciales o vacías (desafío anti-robot, formato no soportado, sin texto, fuente caída, certificado inválido) y NO DEBE completar ni inferir contenido ausente.
- **RF-014**: El sistema DEBE mantener la lista de dominios autorizados en la configuración del ecosistema, con la autoridad asociada a cada dominio, y DEBE permitir consultarla.
- **RF-015**: El sistema DEBE registrar cada solicitud (dirección, resultado, motivo de rechazo o fallo, fecha y hora) para auditoría, sin almacenar el contenido leído más allá de lo que el usuario decida conservar.
- **RF-016**: El sistema DEBE integrarse como una capacidad más del agente jurídico existente y de su configuración de fuentes, sin crear un agente ni un orquestador paralelo, conforme al principio V de la constitución.
- **RF-017**: Todo mensaje dirigido al abogado DEBE redactarse en español; los identificadores técnicos pueden permanecer en inglés.
- **RF-018**: El sistema NO DEBE requerir credenciales, cookies de navegador ni sesiones de usuario para operar.

### Entidades Clave

- **Fuente Autorizada**: Dominio oficial permitido, con su autoridad emisora, reglas sobre subdominios y justificación de inclusión.
- **Solicitud de Lectura**: Dirección entregada, usuario o agente solicitante, fecha y hora.
- **Resultado de Lectura**: Texto extraído, autoridad, dirección consultada y final, fecha y hora, huellas de integridad, estado de vigencia (siempre "pendiente de verificación") y advertencias.
- **Rechazo o Fallo**: Motivo estructurado (fuente no autorizada, destino no público, tamaño excedido, tiempo agotado, formato no soportado, desafío anti-robot, fuente no disponible).
- **Registro de Auditoría**: Historial de solicitudes y resultados.

## Criterios de Éxito *(obligatorio)*

### Resultados Medibles

- **CE-001**: El 100 % de las direcciones de dominios no autorizados, de destinos no públicos y de dominios engañosos incluidos en el conjunto de pruebas se rechaza sin contactar el sitio solicitado.
- **CE-002**: En el 100 % de las lecturas exitosas, el resultado incluye los datos de trazabilidad (autoridad, dirección consultada, dirección final, fecha y hora, huellas de integridad, estado de vigencia), y el estado de vigencia es siempre "pendiente de verificación".
- **CE-003**: En el 100 % de las lecturas, el registro de conexiones salientes muestra únicamente contacto con el dominio autorizado solicitado y sus redirecciones autorizadas; ninguna con terceros.
- **CE-004**: Una lectura de una página oficial de tamaño habitual se completa en menos de 15 segundos en el 95 % de los casos, y nunca excede el tiempo máximo configurado.
- **CE-005**: En el 100 % de los casos de lectura fallida del conjunto de pruebas, el abogado recibe un mensaje en español que indica la causa, y en ninguno se entrega texto vacío como éxito.
- **CE-006**: Un abogado sin formación técnica identifica, a partir del resultado, la autoridad, la fecha de consulta y que la vigencia está pendiente, en menos de 1 minuto.
- **CE-007**: Cero incidencias de contenido leído que haya modificado el comportamiento del agente en el conjunto de pruebas de instrucciones incrustadas.

## Suposiciones

- Usuarios: abogados y personal del despacho JAC, y el propio agente jurídico actuando por ellos.
- Lista inicial: se deriva de las fuentes oficiales ya integradas. Los dominios candidatos son los de Corte Constitucional, Consejo de Estado, Corte Suprema de Justicia, SUIN-Juriscol, Diario Oficial / Imprenta Nacional, Secretaría del Senado, Congreso, Función Pública, Rama Judicial, Superintendencia de Sociedades y DIAN. **Cada dominio exacto debe verificarse contra la fuente oficial antes de activarse.** Esta especificación no declara como verificado ningún dominio.
- Alcance de formatos v1: páginas web con texto. Los PDF y demás formatos quedan EXCLUIDOS de la primera versión (decisión confirmada por el usuario el 2026-10-10); su lectura falla de forma explícita (RF-013).
- Alcance: lectura de una página por solicitud. No incluye rastreo masivo, búsqueda ni lectura de sitios que requieran inicio de sesión.
- La lista de dominios autorizados es subordinada a las 9 fuentes oficiales ya integradas: no agrega una décima fuente ni amplía el catálogo del agente. Sirve para leer páginas publicadas por esas autoridades u otras entidades expresamente autorizadas tras su verificación.
- Esta funcionalidad aporta el texto y su trazabilidad; no determina vigencia, modificaciones ni derogatorias. Esa verificación sigue siendo un paso posterior obligatorio del protocolo del agente (principios I y II).
- Restricción de ecosistema indicada por el usuario: se construye dentro del agente jurídico existente y su configuración de fuentes, en el mismo lenguaje del ecosistema, sin dependencias de otros lenguajes. Las decisiones técnicas detalladas corresponden al plan (`/speckit-plan`).
- Límites de tamaño, tiempo y redirecciones: valores por defecto razonables, ajustables por configuración; se fijarán en el plan.
- La conservación del contenido leído es decisión del usuario; el sistema solo conserva la bitácora de auditoría.
- Cambios a la lista de fuentes exigen actualizar la configuración de fuentes y la tabla de fuentes del `CLAUDE.md` (restricciones técnicas de la constitución).
- CE-004 se mide con lecturas reales una vez activado al menos un dominio verificado. CE-006 (comprensión del resultado por un abogado sin formación técnica) es una validación posterior al uso con usuarios del despacho; no tiene tarea de construcción asociada.
- Dependencia: disponibilidad pública de los sitios oficiales; su caída no se suple con fuentes no autorizadas.
