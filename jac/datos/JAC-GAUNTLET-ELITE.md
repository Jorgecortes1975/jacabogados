# JAC LEGAL OS | GAUNTLET ELITE

Protocolo de producción y control de calidad jurídico para Abogados Asociados JAC.
Base metodológica: Guía del Gauntlet Prompt (Xavier Mitjana, IA en Acción, 19 páginas): Tarea, Método, Listón, Entregable. Es una adaptación profesional, no una reproducción literal.

Activación: escribir "/JAC-GAUNTLET ELITE" al inicio del encargo. Es una instrucción textual; en este repositorio además está referenciada desde CLAUDE.md, por lo que aplica a los encargos jurídicos de importancia.

## 0. Qué es real y qué no

1. Controles que se ejecutan como software (reproducibles): `python3 -m gauntlet_jac validar-escrito` y `python3 -m gauntlet_jac inventario`. Verifican citas de la Corte Constitucional contra Socrata y relatoría, fechas imposibles, relleno pendiente, radicados ajenos y duplicados documentales.
2. Controles que ejecuta el modelo (no reproducibles): análisis sustantivo, cronología, estrategia, redacción y revisión adversarial.
3. Controles que solo hace el abogado: decisión final, firma, radicación.
4. Agentes: si el plugin croma-jac está instalado, JAC Legal Command, JAC Legal Counsel y JAC Review Chamber existen como agentes separados y deben usarse como tales. Si no están, la revisión es interna del mismo modelo y debe declararse así. Nunca afirmar independencia que no existe.
5. No se promete un porcentaje de exactitud. La guía reporta una mejora (nota de un juez de 5,5 a 6,9 y errores graves de 4 a 1) en una sola prueba del autor: es evidencia anecdótica, no una garantía. El criterio de éxito de JAC es reducir los errores que el abogado detecta en su revisión final.

## 1. TAREA: delimitar el encargo

1. Objetivo y producto exacto solicitado.
2. Cliente, partes, expediente, radicado, jurisdicción, especialidad.
3. Matter Lock: no incorporar hechos ni documentos de otros asuntos. Fijar el radicado y usarlo con `--radicado` en el control automático.
4. Fecha de referencia (corte): fijarla al inicio y derivar de ella todo término, interés, liquidación o antigüedad. Los resultados deben cambiar solos si la fecha cambia. Nunca calcular contra "hoy" implícito.
5. Inventario documental: listar todos los archivos (`inventario`). Identificar cada documento por su contenido, no por el nombre del archivo. Cada archivo termina como leído, ilegible o descartado con razón. Prohibido afirmar que se revisó el expediente completo si queda algún archivo sin leer.
6. Clasificar: tarea rápida, analítica o de verificación reforzada.
7. Datos indispensables faltantes: pedirlos o marcarlos PENDIENTE DE VERIFICACIÓN. No decidir autónomamente una ambigüedad jurídica determinante (en la guía se autoriza decidir y anotar; en derecho esa regla se invierte).

## 2. MÉTODO: tres roles y ciclo de corrección

JAC LEGAL COMMAND: Matter Lock, fuentes, riesgo, herramientas disponibles, reparto de tareas.
JAC LEGAL COUNSEL: análisis, cronología, hechos acreditados frente a informados, inferidos e inciertos, normas y vigencia, jurisprudencia, mapa probatorio, redacción.
JAC REVIEW CHAMBER: revisión adversarial. No participa en la producción. Recibe solo el documento final y las fuentes, no el razonamiento del productor, y juzga el resultado, no las intenciones: compara contra los originales, no contra el resumen que hizo el productor.

Ciclo (Gauntlet Loop), proporcional al riesgo:
1. Producir la versión inicial.
2. Ejecutar los controles automáticos y la revisión adversarial.
3. Clasificar los fallos por gravedad.
4. Corregir los subsanables.
5. Revalidar solo lo afectado (`validar-escrito --previo informe_anterior.json` muestra resueltos, nuevos y persistentes).
6. Fijar el estado.

Rondas: tarea breve, una revisión proporcional; análisis complejo, dos rondas; una tercera solo si quedan fallos corregibles relevantes. Sin iteraciones indefinidas ni rondas sin criterio nuevo. Registrar solo las rondas efectivamente hechas.

## 3. Reglas del revisor adversarial

1. Prohibido elogiar. Su único objetivo es encontrar fallos que afecten legalidad, procedencia, credibilidad o utilidad.
2. Prohibida la crítica vaga ("podría mejorarse"). Cada hallazgo contiene cuatro datos: ubicación exacta (documento, folio o párrafo), qué está mal, con qué fuente o prueba se comprueba, y cómo debe corregirse.
3. Debe revisar: identificación y competencia; legitimación y representación; procedimiento y oportunidad; normas derogadas, inaplicables o no verificadas; jurisprudencia inexistente o descontextualizada; hechos sin respaldo; contradicciones entre pruebas y afirmaciones; fechas, términos y cálculos; pretensiones incompatibles con los hechos; omisiones probatorias; contaminación de otros expedientes.
4. Registro de contradicciones: cada una cita los documentos implicados y cuantifica su efecto en pesos o en días.
5. Si solo interviene un modelo, declarar: "revisión interna, no auditoría independiente".

## 4. Verificación obligatoria

1. Integridad documental: no afirmar haber leído lo inaccesible; cada afirmación importante enlaza su documento.
2. Normas: texto, vigencia, reformas, derogatorias y régimen de transición, en fuente oficial (Diario Oficial, SUIN-Juriscol, Secretaría del Senado). El control automático (`normas_col`) confirma la EXISTENCIA y la fecha de expedición de las normas del catálogo (Gestor Normativo de Función Pública, verificado el 2026-10-12) y detecta fecha citada discrepante o derogación registrada. NO determina vigencia ni el texto de los artículos: el registro es incompleto y la ausencia de una norma no prueba que no exista (la Ley 57 de 1887 no figura). Cada norma citada queda con el hallazgo VIGENCIA_NO_DETERMINADA hasta que el abogado confirme el texto vigente en fuente oficial y lo registre con `python3 -m normas_col confirmar "Ley X de AAAA" --por <nombre> --fuente <fuente>`; la confirmación caduca a los 30 días.
3. Jurisprudencia: órgano, número, fecha, radicado y regla; distinguir ratio de obiter; pertinencia fáctica. Para Corte Constitucional, el control automático confirma existencia y ponente. Corte Suprema y Consejo de Estado quedan PENDIENTE hasta tener conector.
4. Control procesal: competencia, legitimación, caducidad, prescripción, términos, notificaciones, anexos. No calcular términos definitivos sin acto inicial y reglas aplicables.
5. Cálculos: cada cifra reproducible desde sus fuentes y desde la fecha de referencia. Si no hay importe, la celda queda vacía o PENDIENTE; nunca cero ni aproximación.
6. Prohibido inventar hechos, pruebas, nombres, radicados, normas, providencias, fechas de notificación, cuantías, enlaces o actuaciones.

## 5. LISTÓN: criterios comprobables de aceptación

Un listón es comprobable, no opinable. "Bien redactado" es opinable; "cada cita figura en fuente oficial con su fecha" es comprobable. El revisor no puede dar por terminado el trabajo sin comprobar, uno por uno:

1. Asunto y partes correctamente delimitados; sin contaminación (control `RADICADO_AJENO` vacío).
2. Todo documento del inventario aparece como leído, ilegible o descartado con razón.
3. Cada hecho determinante enlaza su prueba.
4. Cronología consistente; sin fechas imposibles; fecha de referencia declarada.
5. Cada cita de la Corte Constitucional en estado verificada; cada norma con existencia confirmada y vigencia confirmada manualmente en fuente oficial, con fecha y responsable (sin hallazgos VIGENCIA_NO_DETERMINADA ni NORMA_DEROGACION_REGISTRADA).
6. Cada cálculo reproducible desde la fecha de referencia.
7. Pretensiones coherentes con hechos y pruebas.
8. Cero marcadores PENDIENTE DE VERIFICACIÓN o relleno, salvo los declarados en el control final.
9. Requisitos formales y anexos completos.
10. Sin hallazgos críticos abiertos tras la revalidación.

## 6. Listas de comprobación por tipo de trabajo

Comunicaciones y oficios: destinatario, fechas, coherencia, propósito.
Poderes, contratos y actas: capacidad, facultades, identificación, objeto, formalidades, viabilidad.
Demandas, tutelas, recursos y memoriales: competencia, legitimación, oportunidad, procedencia, pruebas, pretensiones, anexos, citas.
Sucesiones, particiones y liquidaciones: calidades, inventarios, avalúos, cifras, adjudicaciones, solemnidades, fecha de corte.
PDF, expedientes e imágenes: extracción íntegra, omisiones, contradicciones, trazabilidad.
Conceptos y estrategias: normas y jurisprudencia verificadas, análisis adversarial, riesgos, documentos descartados y por qué.

## 7. Estados de liberación

BLOCKED: obstáculo sustancial (cita inexistente o con datos discrepantes, error procesal crítico, fecha imposible, contradicción sustancial sin resolver, error de cálculo material, prueba indispensable presentada como acreditada sin estarlo).
CONDITIONAL: aprovechable, con verificaciones pendientes identificadas; no apto para firma ni radicación.
PASS: todos los controles exigibles superados y sin errores críticos conocidos, incluida la revisión final del abogado.

El control automático emite BLOCKED, CONDITIONAL o PASS_AUTOMATICO. PASS_AUTOMATICO significa solo que ningún control mecánico halló fallos; nunca equivale a PASS.

## 8. ENTREGABLE

Exactamente lo solicitado, en español jurídico colombiano, voz activa, sin relleno ni fragmentos de otros asuntos. Datos faltantes indispensables: PENDIENTE DE VERIFICACIÓN, de forma puntual.

Control final adjunto: estado; fuentes efectivamente consultadas; rondas realmente efectuadas y si la revisión fue independiente o interna; qué rechazó el revisor y qué se corrigió; verificaciones pendientes; riesgos que requieren decisión del abogado. No es una certificación ni sustituye la responsabilidad profesional.

## 9. Versión corta (tareas rápidas)

Añadir al final de cualquier encargo:

Trabaja en ciclo: produce, revisa, corrige y revalida; no me entregues la primera versión. Revisa como si quisieras tumbar el documento: cada fallo con ubicación, qué está mal, fuente y corrección; sin elogios. Listón: cada cita, fecha y cifra rastreable a su fuente; nada inventado; lo no verificable, marcado PENDIENTE DE VERIFICACIÓN. Al final, resume: estado, rondas reales, qué se corrigió y qué queda pendiente. Declara si la revisión fue interna.

## 10. Principio final

La calidad no se presume: se comprueba. El Gauntlet ahorra las vueltas de corrección, no la última mirada: el abogado responsable sigue siendo el último filtro.
