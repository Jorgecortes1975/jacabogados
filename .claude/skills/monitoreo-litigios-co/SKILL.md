---
name: monitoreo-litigios-co
description: Monitorea el portafolio completo de litigios activos, detecta actuaciones nuevas mediante consulta de solo lectura a Rama Judicial y SAMAI, calcula términos con margen de seguridad, clasifica la exposición del cliente y genera un dashboard semanal para los socios.
---

# Monitoreo de Litigios Colombia

Monitoreo semanal del portafolio de litigios activos de un despacho colombiano de talla internacional. Esta skill nunca radica, nunca actúa procesalmente y nunca decide estrategia: solo detecta, calcula y reporta.

## Regla de seguridad obligatoria (no negociable)

- **Toda consulta a Rama Judicial, SAMAI (Consejo de Estado) o cualquier portal estatal es de solo lectura.** Bajo la clasificación de riesgo de Computer Use de la guía (bajo = solo lectura, medio = llenado sin enviar, alto = acción irreversible con confirmación humana), esta skill opera exclusivamente en nivel **bajo**. Nunca radica memoriales, nunca envía formularios, nunca confirma actuaciones desde estos portales.
- **Ninguna cita jurisprudencial de ejemplo se marca como "verificada" sin advertencia.** Toda sentencia citada como ilustración —salvo un fallo estructural universalmente conocido (p. ej. la despenalización del aborto, C-355 de 2006, o similar)— debe llevar la etiqueta **"[verificar contra la Relatoría]"**. Esta skill no tiene acceso confiable a la Relatoría de la Corte Constitucional ni al buscador de jurisprudencia del Consejo de Estado; cualquier número de sentencia mencionado en el dashboard es un marcador de posición hasta que el abogado lo confirme.

## Proceso (4 pasos)

**1. Barrido de solo lectura por expediente activo.**
Para cada expediente en el portafolio, consulta el estado actual en Rama Judicial (Ley 2213 de 2022, actuaciones electrónicas) o SAMAI si es proceso ante el Consejo de Estado. Compara la última actuación registrada contra la consulta anterior almacenada. Si hay una actuación nueva, extrae fecha, tipo de actuación y el término que dispara (si lo hay). Modelo recomendado: **Claude Haiku 4.5** (`claude-haiku-4-5`) — el barrido diario cubre decenas o cientos de expedientes con baja complejidad por consulta; Haiku 4.5 mantiene el costo bajo sin sacrificar precisión en la extracción estructurada.

**2. Cálculo de términos con margen de seguridad.**
Calcula el vencimiento contando días hábiles según el calendario judicial colombiano (excluye fines de semana y festivos). Aplica un **margen de seguridad de al menos 2 días hábiles** antes del vencimiento real para la alerta al abogado responsable — nunca reportar el término al límite exacto. Marca cualquier término calculado con incertidumbre sobre la fecha de notificación (p. ej. notificación por estado vs. notificación personal) como "estimado, verificar acto de notificación".

**3. Clasificación de exposición del cliente.**
Exposición = cuantía en litigio × probabilidad estimada de éxito (para el cliente representado). Clasifica en **alto / medio / bajo**:
- **Alto**: cuantía significativa (defínase por el despacho, ej. > COP 500.000.000) y probabilidad de éxito baja o incierta, o cuantía muy alta independientemente de la probabilidad.
- **Medio**: cuantía moderada con probabilidad media, o cuantía alta con probabilidad de éxito favorable.
- **Bajo**: cuantía menor y/o probabilidad de éxito alta y bien sustentada.

Toda estimación de probabilidad debe llevar un **nivel de certeza explícito** (alta / media / baja), según la disponibilidad de precedente comparable, la etapa procesal y la calidad de la evidencia documentada en el expediente. Nunca presentar una probabilidad como cifra exacta sin ese calificador.

**4. Dashboard semanal.**
Genera una tabla consolidada para los socios, ordenada por urgencia (término más próximo primero). Modelo recomendado para el análisis de exposición: **Claude Sonnet 5** (`claude-sonnet-5`) — el paso 3 exige razonamiento sobre cuantía, precedente y riesgo procesal, donde el mayor nivel de análisis de Sonnet 5 se justifica frente al costo de Haiku.

## Ejemplo de dashboard (expedientes ficticios)

| Proceso | Juzgado | Próxima actuación | Término (con margen) | Exposición estimada | Certeza |
|---|---|---|---|---|---|
| Contractual — Constructora Alfa vs. Municipio X | Juzgado 12 Administrativo de Bogotá | Notificación de auto que decreta pruebas | Vence en 5 días hábiles (margen 2 días aplicado) | **Alto** (COP 2.100M, probabilidad de éxito baja) | Media |
| Laboral — Torres vs. Industrias Beta S.A.S. | Juzgado 4 Laboral del Circuito de Medellín | Traslado de excepciones | Vence en 3 días hábiles | Medio (COP 180M, probabilidad media) | Alta |
| Civil ejecutivo — Banco Gamma vs. Deudor Ramírez | Juzgado 7 Civil del Circuito de Cali | Mandamiento de pago notificado | Vence en 8 días hábiles | Bajo (COP 45M, probabilidad de éxito alta) | Alta |
| Nulidad y restablecimiento — Comercial Delta vs. DIAN | Consejo de Estado, Sección Cuarta (SAMAI) | Fijación en lista | Vence en 12 días hábiles | Alto (COP 3.400M, incertidumbre sobre precedente [verificar contra la Relatoría]) | Baja |
| Responsabilidad civil extracontractual — Familia Ospina vs. Transportes Épsilon | Juzgado 2 Civil del Circuito de Barranquilla | Audiencia inicial (art. 372 CGP) | Vence en 6 días hábiles | Medio (COP 620M, probabilidad media-alta) | Media |

## Integración con Dispatch

Esta skill está pensada para ejecutarse mediante una rutina programada semanal (Dispatch) que dispare el barrido de todos los expedientes activos y entregue el dashboard a los socios por correo o canal interno. El barrido diario (paso 1) puede correr con mayor frecuencia que la generación del dashboard (semanal).

## Cierre

**Esta skill nunca radica documentos ni actúa procesalmente, y nunca decide estrategia procesal.** Solo informa: detecta actuaciones, calcula términos y clasifica exposición con niveles de certeza explícitos. La decisión de qué litigios priorizar, transar, escalar o cómo responder ante cada actuación es exclusiva del abogado responsable de cada caso.
