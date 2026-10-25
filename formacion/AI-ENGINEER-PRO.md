# Formación AI Engineer PRO: guía adaptada a JAC Abogados

**Versión:** 1.0 | **Fecha de elaboración:** 2026-10-25 | **Uso:** interno, formación del equipo técnico y jurídico

---

## 0. Estado de verificación y alcance

**Origen.** Material de preparación de un workshop de formación en agentes de IA. Se extrajo su contenido, se reordenó, se depuró y se adaptó al ecosistema de este repositorio. No se reproduce el texto íntegro del material fuente.

**Alcance.** Esta guía es formativa. No es asesoría jurídica ni regla de cumplimiento. Su utilidad para el despacho está en los patrones de ingeniería que describe y en cómo aplicarlos al sistema JAC.

**Verificación de afirmaciones.**

No puedo confirmar en este momento la vigencia o existencia exacta de los productos y datos de mercado citados en el material fuente. Entrego una versión preliminar sujeta a verificación en la fuente original.

| Afirmación del material fuente | Estado | Acción |
|---|---|---|
| Modelos "Jev", "Laya" y "Clef": fechas de lanzamiento, licencias, tamaños de modelo y compatibilidad de API | No verificado | Confirmar en la documentación oficial de cada proveedor antes de usarlos o citarlos |
| Estadísticas de mercado (crecimiento de ofertas, salarios percentil 80, cuota de demanda de entrevistas) | No verificado | Tratar como referencia de contexto, no como dato para decisiones |
| Testimonios atribuidos a terceros | No verificado | No citar en materiales del despacho |
| Demos en repositorios externos de LIDR | No consultados | Clonar y revisar licencia antes de reutilizar código |

**Nivel de certeza de esta guía:** alto para los conceptos de ingeniería (agentes, herramientas, RAG, validación humana); sujeto a verificación para cualquier dato de producto o de mercado.

---

## 1. Respuesta directa

Un AI Engineer diseña, integra y opera sistemas de software que usan modelos de lenguaje (LLM) y modelos predictivos en producción. Su valor está en la fiabilidad, la seguridad, el coste y la conexión con datos y usuarios reales. No consiste en entrenar modelos.

Para JAC, el valor está en un patrón concreto: el modelo propone y redacta, mientras que herramientas deterministas verifican las citas y un revisor humano decide. El repositorio ya implementa esa separación (`python3 -m jac`, Gauntlet, revisor independiente). La formación debe reforzar ese patrón, no sustituirlo.

---

## 2. Decisión recomendada

1. Formar al equipo en tres competencias: integración de herramientas (tool calling), diseño de agentes con validación humana y evaluación en producción.
2. No ajustar modelos (fine-tuning) para conocimiento jurídico. El riesgo de citas inventadas se controla mejor con recuperación de fuentes oficiales y verificación determinista. El ajuste solo se considerará para formato o estilo, y con una evaluación previa.
3. No enviar expedientes, datos de clientes ni datos personales de terceros a servicios de modelos sin una evaluación previa de tratamiento de datos personales y confidencialidad profesional (ver sección 7).
4. Usar copias anonimizadas o sintéticas en cualquier demo, prueba o ejercicio.
5. Aplicar las demos del material a casos del despacho solo después de adaptarlas (sección 5).

**Lo que debe evitarse:** un agente que redacte escritos o conceptos con citas no verificadas, presentado como trabajo terminado. Esto contradice el principio I de la constitución del proyecto (`.specify/memory/constitution.md`).

**Ruta práctica:** comenzar por los módulos 3 y 4 (agentes y arquitecturas), porque se apoyan directamente en código existente. Los módulos 1, 2 y 5 son contexto.

---

## 3. Fundamento conceptual

### 3.1 AI Engineer frente a ML Engineer

| Aspecto | AI Engineer | ML Engineer |
|---|---|---|
| Objetivo principal | Integrar modelos existentes en productos y procesos | Entrenar, evaluar y optimizar modelos propios |
| Materia prima | APIs de LLM, datos del negocio, herramientas | Datos de entrenamiento, arquitecturas, experimentos |
| Riesgos centrales | Alucinaciones, fuga de datos, coste, latencia, dependencia de proveedor | Sesgo, generalización, drift del modelo |
| Perfil cercano | Ingeniero de software senior con producto | Científico de datos con ingeniería |

Para el despacho, el perfil relevante es el primero: software que conecta un modelo con fuentes oficiales y con el flujo de trabajo de los abogados.

### 3.2 Modelos de decisión (sistema 1)

El material distingue modelos que devuelven una decisión tipada, con un nivel de confianza, frente a los LLM que generan texto libre.

Tres tipos de pregunta: sí o no, elegir una opción entre varias, y puntuar un criterio.

Principio que debe retenerse: la forma de la respuesta está garantizada, pero el acierto no. Un modelo que siempre devuelve "urgente" o "no urgente" con formato válido puede estar equivocado. Por eso cualquier clasificación debe evaluarse con casos etiquetados por un abogado.

Aplicación potencial en JAC (sujeta a evaluación): clasificar un documento entrante por tipo de proceso o por urgencia de plazo, para ordenar la cola de trabajo. No debe usarse para decidir si una acción procede ni para calcular plazos. Los plazos se calculan con herramientas deterministas y se revisan por el abogado responsable.

### 3.3 Agentes

Un agente es un sistema que percibe un entorno, decide y actúa para cumplir un objetivo, con cierta autonomía. Sus rasgos son autonomía, reactividad, interacción con el entorno y proactividad.

La diferencia con una herramienta de IA es el grado de autonomía: una herramienta ejecuta una tarea acotada, mientras que un agente elige qué herramienta usar y en qué orden. A mayor autonomía, mayor necesidad de límites, registro y revisión humana.

---

## 4. Arquitecturas de agentes y su correspondencia con el repositorio

| Patrón | Qué resuelve | Dónde aparece en el repositorio | Recomendación para JAC |
|---|---|---|---|
| Tool calling (funciones y MCP) | El modelo invoca funciones externas en lugar de inventar datos | `python3 -m jac sentencia`, `norma`, `validar`, `inventario`; transportes en `mcp-config.json` | Patrón central. Toda cita pasa por una herramienta que la confirme |
| Router | Dirige cada consulta al especialista adecuado | `lexa-super-router.js`, `skills/jac-agente` | Mantener un único punto de entrada para evitar duplicar orquestadores (principio V) |
| Multi-agente | Varios agentes con roles separados (redactor y revisor) | `agents/jac-revisor.md` (revisor adversarial independiente) | El revisor no debe ser el mismo agente que redactó el documento |
| ReAct (razonar, actuar, observar) | Ciclos de razonamiento con herramientas | `skills/jac-agente` ejecuta herramientas y responde con lo que devuelven | Aceptable para investigación; registrar cada paso para auditoría |
| Chain-of-thought | Razonamiento intermedio explícito | Fase de análisis previa a la redacción | No sustituye la verificación: el razonamiento también puede ser incorrecto |
| Human in the loop | Punto de decisión humana antes de la salida | Gauntlet (`python3 -m gauntlet_jac validar-escrito`) y estados BLOCKED, CONDITIONAL, PASS | Obligatorio para cualquier documento que se radique o envíe |

### 4.1 Regla de diseño

Cada agente del sistema debe declarar tres cosas: qué herramientas puede usar, qué salida produce y qué revisión humana exige. Si un agente no puede declararlas, no debe ponerse en producción.

### 4.2 Dónde el sistema actual sigue el patrón

El agente no declara una cita como verificada sin confirmación de una fuente. Una fuente caída deja la cita pendiente, no verificada. Esto corresponde a la garantía "no se declara verificada una cita que ninguna fuente confirmó", descrita en `CLAUDE.md`.

---

## 5. Demos del material adaptadas al despacho

El material propone tres demos. Cada una se adapta a un caso del despacho, con reglas adicionales.

### 5.1 Agente que consulta un repositorio (origen: demo de GitHub)

**Patrón original.** Un agente que llama funciones de GitHub mediante function calling y que se construye con Pydantic AI.

**Adaptación.** El equivalente en JAC es un agente que consulta fuentes oficiales mediante las herramientas existentes (`jurisprudencia_col`, `normas_col`). El patrón del material (definir funciones con tipos y dejar que el modelo las invoque) ya está implementado con herramientas de línea de comandos.

**Ejercicio propuesto.** Añadir una función que devuelva el estado de verificación de una cita (verificada, pendiente, no encontrada) con su fuente, y comprobar que el agente nunca la presenta como verificada cuando la fuente no respondió. Usar `python3 -m jac prueba` como prueba de aceptación.

### 5.2 Texto a SQL (origen: demo de base de datos)

**Patrón original.** Traducir una pregunta en lenguaje natural a una consulta SQL, ejecutarla y mostrar el resultado en una interfaz de chat.

**Adaptación para JAC.** El archivo `crm_jaabogados.csv` contiene correos y teléfonos de personas identificables. No debe enviarse a un modelo ni usarse en la demo.

Reglas obligatorias:
1. Usar una copia anonimizada o sintética, sin columnas de contacto.
2. Ejecutar solo consultas de lectura (`SELECT`), con un usuario de base de datos de solo lectura.
3. Mostrar la consulta SQL generada junto con el resultado, para que el usuario pueda revisarla.
4. Limitar el número de filas devueltas.

**Ejercicio propuesto.** Generar una copia anonimizada del CRM, con columnas de contacto eliminadas, y responder cinco preguntas de negocio (por ejemplo, prospectos por sector o por estado). Comparar la respuesta del agente con el cálculo manual.

### 5.3 RAG listo para producción (origen: demo de estimación de proyectos)

**Patrón original.** Indexar documentos, dividirlos en fragmentos (chunking), vectorizarlos, buscar por similitud y usar el resultado para generar una estimación estructurada.

**Adaptación para JAC.** En el ámbito jurídico, el RAG solo es útil si cada fragmento conserva su fuente: autoridad, número de providencia o norma, fecha y enlace oficial. Un fragmento sin fuente no debe usarse en una respuesta.

Puntos específicos:
1. El índice debe construirse solo con documentos de fuentes oficiales o de documentos propios del despacho.
2. Cada fragmento lleva metadatos de fuente y fecha de verificación.
3. Si la búsqueda no devuelve fragmentos suficientes, el agente responde "no encontrado en las fuentes consultadas", no completa con conocimiento general.
4. La vigencia de una norma no se infiere del índice. El sistema actual solo confirma existencia y fecha, no vigencia (ver `CLAUDE.md`).

**Ejercicio propuesto.** Construir un índice pequeño con diez providencias verificadas, y probar con diez preguntas, incluidas dos sin respuesta en el índice. Medir cuántas veces el agente responde algo que no está en el índice.

---

## 6. Evaluación y operación en producción

Un sistema sin evaluación no debe usarse en el despacho. Las métricas mínimas son:

| Métrica | Qué mide | Umbral sugerido (a validar por el equipo) |
|---|---|---|
| Citas inventadas | Citas que no existen en la fuente | Cero en el conjunto de prueba |
| Citas pendientes mal declaradas | Citas no confirmadas presentadas como verificadas | Cero |
| Exactitud de clasificación | Coincidencia con la etiqueta del abogado | Definir por tipo de tarea |
| Latencia y coste por consulta | Coste operativo | Definir por caso de uso |
| Tasa de revisión humana | Fracción de salidas que el revisor corrige | Vigilar tendencia, no solo valor absoluto |

**Conjunto de prueba.** Construir un conjunto dorado de casos con respuestas verificadas por un abogado. Usar `python3 -m jac prueba` como base. Ampliarlo con cada error real detectado.

**Monitorización.** Registrar cada consulta, las herramientas usadas, las fuentes que respondieron y las que no. Esto coincide con la garantía "cada ejecución informa qué fuentes respondieron y cuáles no", descrita en `CLAUDE.md`.

---

## 7. Riesgos

| Riesgo | Tipo | Gravedad | Mitigación |
|---|---|---|---|
| Cita inventada presentada en un escrito | Profesional y reputacional | Alta | Verificación determinista y Gauntlet obligatorio antes de radicar |
| Envío de datos personales o de expedientes a un proveedor de modelos | Legal (protección de datos) y confidencialidad | Alta | Evaluación de tratamiento de datos antes de cualquier uso; anonimización en pruebas |
| Confianza excesiva en clasificaciones de un modelo | Operativa | Media | Evaluar con casos etiquetados; mantener decisión humana |
| Dependencia de un proveedor de modelos | Técnica y económica | Media | Mantener las herramientas deterministas independientes del modelo |
| Coste no controlado | Económica | Media | Límites de uso y medición por consulta |
| Uso de un modelo o producto cuya vigencia no se confirmó | Técnica | Media | Verificar fecha y documentación oficial antes de adoptarlo |

**Sobre protección de datos.** La Ley 1581 de 2012 regula el tratamiento de datos personales en Colombia y la Superintendencia de Industria y Comercio es la autoridad competente. Se identifica como referencia pendiente de verificación en la fuente oficial (SUIN Juriscol, Función Pública o el sitio de la SIC) y de revisión por el responsable de protección de datos del despacho, si existe.

---

## 8. Documentos y revisiones necesarias

1. Evaluación de tratamiento de datos para cada proveedor de modelos, con la política de retención y de entrenamiento del proveedor (verificar en su documentación oficial).
2. Acuerdo o cláusula de confidencialidad aplicable al proveedor, según la política interna del despacho.
3. Conjunto de prueba dorado, firmado por el abogado revisor.
4. Registro de cambios de cada agente, con herramientas declaradas y revisor asignado.
5. Acta de la revisión de cada demo antes de usar datos reales.

---

## 9. Acciones concretas

Orden por urgencia:

1. Anonimizar la copia del CRM y excluir las columnas de contacto de cualquier prueba. Responsable: equipo técnico. Inmediato.
2. Confirmar en documentación oficial los modelos y productos del material fuente antes de usarlos. Responsable: equipo técnico. Antes de cualquier prueba con datos reales.
3. Ejecutar `python3 -m jac prueba` y `python3 -m jac doctor --red` para confirmar el estado base del sistema. Responsable: equipo técnico.
4. Completar los ejercicios de la sección 5 con la copia anonimizada. Responsable: equipo técnico con un abogado revisor. Dos semanas.
5. Construir el conjunto dorado de la sección 6. Responsable: abogado revisor. Cuatro semanas.
6. Decidir, con base en los resultados, si algún ejercicio pasa a especificación con `/speckit-specify`. Responsable: socio responsable. Al cierre del ciclo.

---

## 10. Conclusión operativa

La formación debe producir una práctica concreta: agentes que solo afirman lo que una herramienta confirmó, revisión humana antes de cualquier salida de cara al cliente o al juzgado, y evaluación con casos reales antes de cualquier despliegue. Los datos de mercado y los productos del material fuente quedan como contexto no verificado hasta comprobarlos en su fuente oficial. Los ejercicios deben hacerse con copias anonimizadas.
