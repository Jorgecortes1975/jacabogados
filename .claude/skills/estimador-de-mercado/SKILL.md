---
name: estimador-de-mercado
description: Construye modelos TAM/SAM/SOM con rigor citation-grade para dimensionar el mercado potencial de un segmento de servicio del despacho (ej. pymes tecnológicas de Antioquia que necesitan compliance laboral, empresas extranjeras entrando a Colombia), mostrando cada multiplicación, etiquetando cada supuesto y sometiéndolo a un stress test — nunca presenta una estimación sin fuente como dato duro. Úsala cuando el usuario pida estimar el tamaño de mercado de una línea de servicio, decidir en qué pilar invertir más marketing, o dimensionar cuántos clientes potenciales existen para un segmento.
---

# Estimador de mercado (TAM/SAM/SOM para líneas de servicio jurídico)

El despacho tiene 8 pilares de servicio y presupuesto de marketing limitado (ver plan de marketing digital, secciones 1 y 12). Antes de decidir dónde invertir más tiempo comercial o contenido, conviene saber, con matemática visible y fuentes citadas, cuántas empresas hay realmente en el segmento objetivo — no una intuición de "el mercado tech está creciendo".

## Regla de veracidad obligatoria (no negociable)

1. **Cada número del modelo lleva una fuente citada o la etiqueta "supuesto sin fuente".** No hay una tercera opción. Nunca se presenta una cifra de mercado como dato verificado si no proviene de una fuente primaria real (DANE, Confecámaras/Cámaras de Comercio, Supersociedades, gremios sectoriales, ProColombia, informes de consultoras con metodología pública citable).
2. **Si no tienes acceso real de búsqueda en el entorno de trabajo en este momento, dilo explícitamente** antes de construir el modelo — no rellenes el conteo de compradores o la disposición a pagar con una cifra inventada que suene razonable.
3. **Toda cifra que no se pudo verificar en vivo se etiqueta como "estimación" con su nivel de confianza** (alto/medio/bajo), y el modelo final debe dejar visible cuántas de sus entradas son fuente primaria confirmada vs. estimación.
4. Si la afirmación de mercado depende de una norma colombiana específica (ej. un umbral legal que define "pyme"), verifica esa norma con `verificacion-citas-co` antes de usarla como supuesto del modelo.

## Cuándo usar esta skill

Para decidir en qué pilar de servicio invertir más marketing o tiempo comercial, dimensionando cuántos clientes potenciales reales existen en un segmento (geografía + sector + tamaño de empresa + necesidad legal específica).

## Proceso operativo

**Paso 1 — Define al comprador en una frase.**
Pide producto/servicio (uno de los 8 pilares o un sub-segmento), geografía (Medellín, Antioquia, Colombia) y horizonte de tiempo. Ejemplo de comprador en una frase: "pyme tecnológica con sede en Antioquia, entre 10 y 200 empleados, sin abogado laboral interno".

**Paso 2 — Busca 3 fuentes independientes para el conteo de compradores y la disposición a pagar.**
Fuentes aceptadas: registros de Cámara de Comercio de Medellín/Confecámaras (número de empresas activas por sector y tamaño), DANE (clasificación empresarial, encuestas sectoriales), Supersociedades (estados financieros por sector), gremios (ej. Fenalco, ANDI, Colombia Fintech, según el segmento), ProColombia/ACI Medellín (empresas extranjeras con presencia formal), informes de consultoras reconocidas con metodología publicada. Registra fuente, fecha y el número exacto extraído de cada una.

**Paso 3 — Calcula TAM/SAM/SOM mostrando cada multiplicación.**
- **TAM**: universo total de empresas que en teoría necesitan el servicio en la geografía definida.
- **SAM**: TAM filtrado por el segmento realista que el despacho puede atender (tamaño de empresa, sector, madurez legal — ver Matriz de Evaluación de Prospectos del plan de marketing, sección 3).
- **SOM**: SAM filtrado por la capacidad real de captación del despacho en el horizonte de tiempo dado (basado en KPIs de conversión reales del plan de marketing, sección 10, si están disponibles; si no, marcarlo como supuesto).
Cada paso muestra la cuenta completa (ej. "3.200 empresas × 12% que cumplen el filtro de tamaño = 384"), nunca solo el resultado.

**Paso 4 — Etiqueta cada supuesto.**
Todo número que no venga directo de una fuente primaria (porcentaje de conversión asumido, tasa de crecimiento sectorial proyectada, disposición a pagar estimada) se marca "SUPUESTO" con una frase de justificación.

**Paso 5 — Stress test.**
Recalcula el SOM cortando a la mitad cada supuesto marcado, uno a la vez, para mostrar cuánto cambia el resultado. Si el SOM se derrumba con un solo supuesto reducido, el modelo es frágil y debe decirse así explícitamente.

**Paso 6 — Entrega un brief de una página** con la matemática visible y cada número citado o etiquetado como supuesto/estimación.

## Mini-ejemplo (pymes tecnológicas de Antioquia — compliance laboral)

**Comprador en una frase**: pyme tecnológica con sede en Antioquia, 10-200 empleados, sin abogado laboral interno, horizonte 12 meses.

| Paso | Cálculo | Fuente / etiqueta |
|---|---|---|
| TAM | Total empresas de software/TI activas en Antioquia | [pendiente — cifra a extraer de Cámara de Comercio de Medellín o DANE en el momento de correr la skill; no se hizo búsqueda real en este ejemplo] |
| Filtro tamaño (10-200 empleados) | TAM × % de empresas en ese rango | **SUPUESTO** — porcentaje ilustrativo, requiere fuente sectorial real |
| SAM | TAM filtrado × % sin abogado laboral interno (madurez legal media/baja) | **SUPUESTO** — no hay encuesta pública citada aún sobre este dato específico |
| SOM (12 meses) | SAM × tasa de conversión asumida del embudo comercial del despacho | **SUPUESTO** — usar tasa real del CRM del despacho (plan de marketing, sección 10) cuando exista histórico suficiente |

**Stress test**: si el porcentaje "sin abogado laboral interno" se corta a la mitad, el SOM se reduce proporcionalmente — el modelo depende críticamente de ese único supuesto, que es justo el que menos fuente primaria tiene. Antes de tomar una decisión de inversión de marketing basada en este número, ese supuesto debe validarse con una fuente real (encuesta gremial, o una muestra propia de llamadas de diagnóstico).

**Nota de honestidad**: este mini-ejemplo no ejecutó una búsqueda real contra Cámara de Comercio de Medellín ni DANE — todas las cifras de conteo quedan marcadas como pendientes en vez de inventarse, precisamente para ilustrar cómo debe verse un modelo honesto cuando la búsqueda aún no se ha hecho.

## Cierre — límite de esta skill

Esta skill construye el modelo y expone su fragilidad; no decide la estrategia de inversión de marketing ni reemplaza una validación comercial directa (llamadas de diagnóstico reales, conversaciones con prospectos). La decisión de en qué pilar invertir, y la responsabilidad de no presentar una estimación como dato duro frente a un socio o un tercero, es siempre del abogado o socio que usa este brief.
