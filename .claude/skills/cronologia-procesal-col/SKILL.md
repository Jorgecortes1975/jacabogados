---
name: cronologia-procesal-col
description: >
  Construye cronologías estructuradas de expedientes judiciales complejos, casos con
  múltiples actuaciones, incidentes procesales, recursos y pericias. Mapea el estado
  actual del proceso, identifica la próxima actuación urgente y produce el briefing
  estratégico para el abogado que ingresa a un caso o necesita ponerse al día.
  Activar ante: cronología del expediente, ponme al día en el caso, cuál es el
  estado del proceso, mapa del expediente, resumen del caso, qué pasó en este
  proceso, línea de tiempo del litigio, expediente de N años y necesito entenderlo,
  nueva incorporación al equipo para este caso, briefing estratégico del caso,
  cuáles son los puntos en disputa, cuántas actuaciones tiene el expediente.
  SIEMPRE activar cuando se aporte un expediente complejo con múltiples actuaciones.
---

# Cronología Procesal Colombiana — Mapa de Expedientes Complejos
## Sistema de Análisis y Briefing para Litigios en Curso

---

## PROPÓSITO DE ESTE SKILL

Los expedientes complejos —causas que llevan años, con múltiples incidentes,
peritos, recursos y escritos de ambas partes— generan el problema del árbol
tapando el bosque.

Este skill convierte un expediente caótico en un mapa estratégico que permite
al abogado entender dónde está parado el caso en 30 minutos en lugar de 3 días.

---

## FASE 0 — INVENTARIO DE MATERIALES

Antes de construir la cronología, clasifica lo que tienes:

```
INVENTARIO DEL EXPEDIENTE

Asunto: [nombre del caso]
Fecha de inicio: [año]
Jurisdicción: [Juzgado / Tribunal / Árbitro]
Tipo de proceso: [declarativo / ejecutivo / laboral / administrativo / arbitral]
Etapa actual: [primera instancia / apelación / casación / ejecución]

Documentos aportados:
□ Demanda / libelo
□ Contestación
□ Excepciones
□ Resoluciones interlocutorias
□ Pericias (cuántas: __)
□ Testimonios / interrogatorios
□ Recursos interpuestos
□ Sentencia de primera instancia
□ Apelaciones y sus resultados
□ Otros: [especificar]

Documentos NO disponibles pero relevantes: [listar]
```

---

## PRODUCTO 1 — CRONOLOGÍA ESTRUCTURADA EN TABLA

**Columnas obligatorias:**

| Fecha | Tipo de actuación | Autor / Parte | Contenido clave (1 línea) | Estado que genera |
|-------|-------------------|---------------|--------------------------|-------------------|
| DD/MM/AAAA | Escrito de parte / Resolución / Pericia / Recurso / Audiencia | Demandante / Demandado / Juez / Perito | Qué se pidió, decidió o aportó | Pendiente de respuesta / Resuelto / En apelación / Ejecutoriado |

**Reglas de la cronología:**
- Si una fecha no consta en los documentos: marcar [FECHA NO DISPONIBLE]
- Si el contenido de un escrito no está en los materiales: marcar [CONTENIDO NO APORTADO]
- Ordenar cronológicamente siempre (más antiguo arriba)
- Una fila por actuación — no agrupar distintas actuaciones

---

## PRODUCTO 2 — ESTADO ACTUAL DEL PROCESO

Al final de la tabla, generar esta sección:

```
══════════════════════════════════════
ESTADO ACTUAL DEL PROCESO
══════════════════════════════════════

ÚLTIMA ACTUACIÓN RELEVANTE:
[Qué fue lo último que ocurrió, quién lo hizo y en qué fecha]

PUNTO JURÍDICO EN DISCUSIÓN AHORA:
[Cuál es la cuestión que el juez / tribunal tiene que resolver]

PRÓXIMO VENCIMIENTO O DILIGENCIA:
[Fecha + qué se debe hacer + responsable]
Si no consta en los materiales: [VERIFICAR EN EL SISTEMA DE GESTIÓN]

ADVERTENCIAS PROCESALES:
[Plazos que corren, términos próximos a vencer, riesgo de preclusión]
```

---

## PRODUCTO 3 — BRIEFING ESTRATÉGICO (opcional — solicitar expresamente)

Para el abogado que ingresa al caso o el socio que necesita la visión global:

```
══════════════════════════════════════
BRIEFING ESTRATÉGICO
══════════════════════════════════════

LAS PARTES Y SUS INTERESES:
- [Demandante]: qué busca, qué argumenta, qué pruebas tiene
- [Demandado]: qué pide, cómo se defiende, qué pruebas tiene

LOS PUNTOS JURÍDICOS EN DISPUTA:
1. [Punto central]: cómo está posicionado actualmente
2. [Punto secundario]: estado
3. [Otros]

LO QUE EL JUEZ HA DECIDIDO HASTA AHORA:
[Solo las decisiones firmes — interlocutorias que definieron el rumbo]

LA POSICIÓN DE CADA PARTE EN ESTE MOMENTO:
- Ventajas de la posición del cliente: [lista]
- Riesgos de la posición del cliente: [lista]

PROBABILIDAD DE ÉXITO — ESTIMACIÓN PRELIMINAR:
[Favorable / Incierto / Desfavorable — con justificación en 2 líneas]
[Advertencia: esta estimación es preliminar con los materiales disponibles]

LAS PREGUNTAS QUE EL ABOGADO ANTERIOR DEBE RESPONDER:
1. [Qué no está claro en los documentos]
2. [Decisiones estratégicas tomadas que no constan en el expediente]
3. [Compromisos con el juez o la contraparte no documentados]
```

---

## TIPOS DE PROCESOS Y SUS ACTUACIONES TÍPICAS

### Proceso civil declarativo (CGP)
Demanda → Admisión → Contestación → Saneamiento → Audiencia de instrucción y
juzgamiento → Alegatos → Sentencia → Apelación → Tribunal → [Casación si aplica]

### Proceso laboral ordinario (CPT)
Demanda → Admisión → Notificación → Contestación → Audiencia de trámite →
Audiencia de juicio (interrogatorios, testimonios) → Alegatos → Sentencia →
Apelación → Sala Laboral del Tribunal → [Casación laboral CSJ]

### Proceso contencioso-administrativo (CPACA)
Demanda → Admisión → Contestación (entidad) → Alegaciones → Audiencia inicial →
Audiencia de pruebas → Audiencia de juzgamiento → Sentencia → Apelación →
Consejo de Estado

### Tutela
Admisión → Notificación a accionado → Contestación (48 horas) → Fallo (10 días)
→ [Impugnación] → [Revisión eventual en Corte Constitucional]

### Proceso ejecutivo
Mandamiento de pago → Notificación → Excepciones (o no) → Sentencia → [Apelación]
→ Liquidación → Embargo y remate

---

## REGLAS DE APLICACIÓN ANTI-ALUCINACIÓN

1. Solo trabajar con los documentos efectivamente aportados
2. No inferir actuaciones que no consten en los materiales
3. No completar fechas que no aparecen — marcar [FECHA NO DISPONIBLE]
4. No estimar plazos de vencimiento sin la fecha de notificación verificada
5. Si el estado del proceso depende de una actuación que no está disponible,
   indicar expresamente: [REQUIERE VERIFICACIÓN EN EL SISTEMA DE GESTIÓN]

---

## INTEGRACIÓN CON EL ECOSISTEMA

- **Input**: actuaciones del expediente (demanda, contestación, resoluciones, etc.)
- **Antes**: `ecosistema-juridico-col` para identificar el módulo procesal a activar
- **Después**: el briefing estratégico alimenta a `ecosistema-juridico-col` para
  redactar el próximo escrito desde contexto completo
- **Comunicación al cliente**: `traduccion-ejecutiva-col` para convertir el estado
  del proceso en carta de avance sin tecnicismos
