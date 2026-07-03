---
name: mapeador-de-tendencias
description: Detecta tendencias regulatorias y de negocio relevantes para los clientes del despacho (nuevos decretos, cambios de compliance, inversión extranjera, movimientos sectoriales en Antioquia) antes de que lleguen a prensa masiva, con evidencia concreta y fechada para alimentar el banco de contenido del despacho. Úsala cuando el usuario pida detectar tendencias regulatorias o de negocio en un nicho, preparar temas para el banco de contenido de LinkedIn/Instagram/newsletter, o anticipar cambios que afecten a un sector de clientes.
---

# Mapeador de tendencias regulatorias y de negocio

El plan de marketing digital del despacho (sección 9) depende de tener temas concretos y a tiempo para el contenido educativo semanal — posts de LinkedIn, carruseles de Instagram, la newsletter mensual "Consulta Jurídica Ejecutiva". Esta skill alimenta ese banco de contenido detectando tendencias regulatorias y de negocio con evidencia concreta, antes de que se vuelvan un tema genérico que ya todo el mundo está publicando.

## Regla de veracidad obligatoria (no negociable)

1. **Cada punto de prueba debe ser un hecho concreto y fechado con fuente identificable** (un decreto publicado, un comunicado oficial, una cifra de una entidad, una noticia firmada) — nunca una impresión general ("se siente que está creciendo") ni una tendencia inventada que suena plausible.
2. **Si no tienes acceso real de búsqueda en el entorno de trabajo en este momento, dilo explícitamente** en vez de presentar tendencias como si hubieras revisado fuentes actuales. Una tendencia sin evidencia verificable no se entrega como tendencia — se entrega como hipótesis a validar.
3. **Toda cifra de crecimiento, inversión o adopción sectorial que no venga de una fuente primaria confirmada se marca como "estimación no verificada"** con su nivel de confianza.
4. **Si una tendencia se apoya en un decreto, ley o sentencia colombiana específica, esa cita puntual debe pasar por `verificacion-citas-co` antes de publicarse** como contenido — esta skill detecta la tendencia y su evidencia general, no reemplaza ese control de citas normativas.

## Cuándo usar esta skill

Cuando el despacho necesite temas para el banco de contenido, o cuando un socio quiera anticipar un cambio regulatorio o de mercado que vaya a afectar a un sector de clientes (tecnología, energía, fintech, exportadoras, empresas extranjeras entrando a Colombia).

## Proceso operativo

**Paso 1 — Pide el nicho y la ventana de tiempo.**
Nicho: un sector de cliente (fintech, tecnología, energía, exportadoras) o un área de práctica (laboral, tributario, compliance, societario). Ventana de tiempo por defecto: 90 días hacia atrás, salvo que el usuario pida otra.

**Paso 2 — Busca evidencia concreta y fechada para cada candidata a tendencia.**
Fuentes: diarios oficiales y comunicados de entidades (Mintrabajo, DIAN, Superintendencias, Banco de la República), gremios sectoriales, prensa económica especializada con firma, informes de ProColombia/ACI Medellín sobre inversión extranjera, movimientos públicos de Cámara de Comercio de Medellín. Descarta rumores, publicaciones sin fecha, y contenido genérico de otros despachos que solo repiten una tendencia sin evidencia propia.

**Paso 3 — Para cada una de 5 tendencias, entrega:**
1. **Nombre en 5 palabras o menos.**
2. **3 puntos de prueba concretos**, cada uno con fecha y fuente.
3. **Rating de velocidad**: qué tan rápido se está moviendo (lenta/moderada/acelerada), justificado por la densidad de evidencia encontrada en la ventana de tiempo.
4. **Quién gana / quién pierde**: qué tipo de cliente del despacho se beneficia y cuál queda expuesto.
5. **Una opinión contraintuitiva**: algo que contradiga el consenso obvio, con su propia justificación — no "la IA está de moda", sino algo específico y verificable.

**Paso 4 — Descarta lo genérico.**
Si una tendencia no puede sostenerse con 3 puntos de prueba concretos y fechados, no entra en la lista final — se reporta como "insuficiente evidencia en la ventana de tiempo dada" en vez de forzarla.

**Paso 5 — Marca cualquier cita normativa puntual para verificación** con `verificacion-citas-co` antes de que el tema pase a producción de contenido.

## Mini-ejemplo (nicho: empresas extranjeras entrando a Colombia, ventana 90 días)

| Campo | Contenido |
|---|---|
| Nombre de la tendencia | Aceleración de nearshoring hacia Antioquia |
| 3 puntos de prueba | (1) [pendiente — comunicado o cifra de ACI Medellín/ProColombia sobre nuevas empresas extranjeras registradas en el periodo, a confirmar en el momento de correr la skill]; (2) [pendiente — nota de prensa económica firmada sobre el mismo fenómeno]; (3) [pendiente — dato de Cámara de Comercio de Medellín sobre constituciones de sociedades con capital extranjero] |
| Rating de velocidad | No se puede calificar sin los 3 puntos de prueba confirmados — queda como "insuficiente evidencia" hasta validar |
| Quién gana / quién pierde | Gana: pymes de servicios que atienden montaje de operación local (legal, contable, inmobiliario). Pierde: empresas extranjeras que subestiman el tiempo de constitución y registro y llegan sin asesoría previa. |
| Opinión contraintuitiva | El cuello de botella real casi nunca es tributario, sino laboral: subestimar el costo de la liquidación de personal si la operación no funciona en los primeros 12 meses — esto habría que confirmarlo con casos reales del despacho antes de publicarlo como afirmación. |

**Nota de honestidad**: este ejemplo no ejecutó una búsqueda real contra ACI Medellín, ProColombia o Cámara de Comercio de Medellín — por eso los puntos de prueba quedan marcados como pendientes en vez de inventarse. Al usar la skill en producción real de contenido, ninguna fila puede quedar así: se completa con la fuente confirmada o la tendencia se descarta.

## Cierre — límite de esta skill

Esta skill detecta y documenta tendencias con su evidencia; no redacta el post o el hilo final (para eso están `arquitecto-de-hilos` y `esqueleto-de-articulo`), ni verifica por sí sola una cita normativa puntual (para eso está `verificacion-citas-co`). La decisión de qué tendencia usar como contenido público, y la responsabilidad de que lo publicado sea veraz bajo la Ley 1123 de 2007, es siempre del abogado que aprueba la publicación.
