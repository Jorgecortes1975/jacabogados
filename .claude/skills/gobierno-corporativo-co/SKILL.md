---
name: gobierno-corporativo-co
description: Redacta actas y resoluciones societarias, verifica su coherencia con los estatutos vigentes, arma el checklist de registro ante Cámara de Comercio y mantiene el calendario anual de obligaciones societarias en Colombia. Úsala cuando el usuario pida redactar un acta de junta directiva o asamblea, o preparar el registro de una decisión societaria ante Cámara de Comercio.
---

# Housekeeping de gobierno corporativo (Colombia)

Modelo recomendado: Claude Sonnet 5. Este skill apoya el housekeeping documental de sociedades colombianas: actas de asamblea y junta directiva, resoluciones societarias, verificación registral ante Cámara de Comercio y calendario de obligaciones anuales.

## Advertencia de seguridad obligatoria (no negociable)

- Nunca marques una cita jurisprudencial como "verificada" sin advertencia explícita. Toda referencia a sentencias, conceptos de la Superintendencia de Sociedades o doctrina debe ir acompañada de una nota indicando que el abogado responsable debe confirmarla en la fuente oficial antes de usarla.
- Los artículos del Código de Comercio de conocimiento general muy asentado (p. ej. arts. 158 y 187 y ss. sobre actas y decisiones societarias) y la Circular Única de la Superintendencia de Sociedades pueden citarse como referencia porque son normas estables y públicas. **Cualquier otro número de artículo específico usado en un borrador concreto —incluidos los de quórum, facultades del representante legal o mayorías decisorias— debe marcarse siempre como "[confirmar número de artículo contra el texto vigente del Código de Comercio y los estatutos]"**, incluso si el modelo lo presenta con aparente seguridad: un número de artículo equivocado en un acta que se registra ante la Cámara de Comercio no es un detalle menor, y es indistinguible en apariencia de uno correcto hasta que se verifica.
- Nunca presentes un borrador de acta o resolución como definitivo. Es siempre un proyecto sujeto a revisión y aprobación del abogado y de los órganos sociales.

## Proceso de 4 pasos

### 1. Generar el borrador de acta o resolución
Identifica el tipo de decisión societaria (aumento de capital, nombramiento o remoción de representante legal, distribución de utilidades, reforma estatutaria, disolución, etc.) y genera el borrador siguiendo la estructura formal exigida por el Código de Comercio: encabezado del órgano, lugar/fecha/hora, forma de convocatoria, verificación del quórum, orden del día, deliberación, texto de la decisión con la votación exacta, y constancia de cierre y firmas. Usa siempre lenguaje societario preciso (número de acciones o cuotas, mayorías decisorias, capital suscrito y pagado si aplica).

### 2. Verificar coherencia con los estatutos vigentes
Antes de dar el borrador por bueno, contrástalo contra los estatutos de la sociedad cargados en el Project: quórum estatutario (¿es el legal supletivo o uno reforzado?), mayorías exigidas para ese tipo de decisión, facultades del órgano que decide (junta directiva vs. asamblea), y si la decisión requiere autorización previa de otro órgano. Si los estatutos no están cargados o hay una sección ilegible/faltante, decláralo expresamente y no asumas el contenido supletivo del Código de Comercio como si fuera el texto estatutario.

### 3. Checklist de registro ante Cámara de Comercio
Genera la lista de trámites de inscripción derivados de la decisión: formulario de registro único empresarial (RUES) correspondiente, copia del acta con los requisitos de autenticación exigidos (acta original o copia auténtica, extracto si aplica), formulario adicional para cambios de representante legal o de junta directiva, pago de derechos de inscripción, y el plazo legal para inscribir (los actos sujetos a registro deben inscribirse dentro del término que fije la cámara, normalmente antes de que la decisión surta efectos frente a terceros). Señala siempre que el plazo y los formularios exactos deben confirmarse en la Cámara de Comercio con jurisdicción sobre el domicilio social, porque varían por trámite y pueden cambiar por circular de la cámara.

### 4. Calendario de obligaciones societarias anuales
Mantén y actualiza un calendario con al menos: renovación de la matrícula mercantil (dentro de los tres primeros meses del año), presentación y aprobación de estados financieros de fin de ejercicio, reunión ordinaria de asamblea o junta de socios (dentro de los tres meses siguientes al cierre del ejercicio, salvo estatutos con plazo distinto), reporte de información exógena y de estados financieros a la Superintendencia de Sociedades cuando la sociedad esté vigilada o controlada según la Circular Única, y actualización del RUES. Marca cada obligación con su fuente normativa y la advertencia de verificación vigente.

## Modelo de acta de junta directiva (nombramiento de representante legal)

El modelo completo de acta (encabezado, convocatoria, verificación de quórum, orden del día, desarrollo y cierre), incluidas sus advertencias de verificación de artículos, está en `references/modelo-acta-junta.md`. Cárgalo como punto de partida al ejecutar el paso 1 del proceso y ajústalo al tipo de decisión societaria concreto; mantén intactas las marcas "[CONFIRMAR NÚMERO EXACTO ...]" del modelo.

## Cierre explícito de alcance

Este skill nunca decide quién debe ser nombrado representante legal, ni recomienda una estrategia societaria, ni sustituye el criterio de los órganos sociales. Su función es exclusivamente documental: redactar el borrador conforme a una decisión ya adoptada por el órgano competente, verificar su coherencia formal con los estatutos, listar los trámites de registro y llevar el calendario de obligaciones. La decisión de fondo, su conveniencia y su validez jurídica son responsabilidad del abogado y de los órganos sociales de la compañía.
