---
name: artefactos-juridicos-lexa
description: >
  Guía para crear artefactos jurídicos interactivos en Claude: calculadoras de
  prescripción y liquidación, dashboards de causas, plantillas procesales editables
  y mini apps para el Bufete y sus clientes. Activar cuando el usuario pida:
  crea una calculadora, hazme una app, quiero un dashboard interactivo, artefacto
  HTML, mini herramienta, calculadora de prestaciones, liquidador de honorarios,
  calculadora de prescripción, dashboard de causas interactivo, plantilla editable
  HTML, formulario jurídico, herramienta visual, quiero algo que pueda usar en
  reuniones, presentación interactiva, app para el cliente, calculadora laboral,
  calculadora de daños, liquidador de cesantías. SIEMPRE activar cuando el usuario
  necesite convertir un cálculo jurídico o proceso repetitivo en una herramienta
  visual e interactiva reutilizable.
---

# ARTEFACTOS JURÍDICOS LEXA-LAB — v1.0
## Bufete Cortés Cartagena

**Abogado titular:** Jorge Ángel Cortés Cartagena — T.P. 365.594
**Versión:** 1.0 — Junio 2026
**Fuente metodológica:** Módulo de Artefactos Claude — B.IAcademy (Colussi, 2026), adaptado al contexto jurídico colombiano

---

## QUÉ ES UN ARTEFACTO EN ESTE CONTEXTO

Un artefacto jurídico es una herramienta que Claude construye en HTML interactivo
o documento editable, que puede abrirse en navegador, copiarse, presentarse a
clientes o reutilizarse en múltiples casos. No es una respuesta de chat: es un
producto terminado y operativo.

**Chat normal:** Claude explica cómo calcular la prescripción.
**Artefacto:** Claude crea una calculadora donde introduces la fecha y te da el
resultado con semáforo de urgencia.

---

## CATÁLOGO DE ARTEFACTOS JURÍDICOS DISPONIBLES

### TIPO A: CALCULADORAS JURÍDICAS (Mini Apps HTML)

Herramientas interactivas para cálculos frecuentes del despacho.

| Calculadora | Para qué sirve | Cuándo pedirla |
|---|---|---|
| Prescripción laboral | Calcula si la acción está prescrita | Antes de radicar una demanda |
| Liquidación de prestaciones | Calcula cesantías, primas, vacaciones | Al estimar pretensiones |
| Intereses de mora | Calcula intereses comerciales y de CCO | Para demandas ejecutivas |
| Honorarios del despacho | Estima honorarios según cuantía y tipo | Al cotizar servicios |
| Caducidad contenciosa | Calcula si venció el plazo CPACA | Antes de demanda administrativa |
| Tabla de alimentos | Estima porcentaje por ingresos y rango | Para procesos de familia |

---

### TIPO B: DASHBOARDS DE CAUSAS (Panel Visual HTML)

Tableros para presentar el estado del despacho o de un caso específico a clientes.

| Dashboard | Audiencia | Contenido |
|---|---|---|
| Estado del despacho | Socios / JAC | Causas activas, etapas, términos críticos, KPIs |
| Estado de un caso | Cliente | Etapas completadas, próxima actuación, docs pendientes |
| Análisis de cliente empresa | Gerentes / CEO | Riesgos jurídicos, estado de contratos, recomendaciones |
| Seguimiento de términos | JAC | Calendario procesal por urgencia |

---

### TIPO C: DOCUMENTOS EDITABLES (Plantillas HTML)

Plantillas interactivas que el cliente o el despacho completa en el navegador.

| Plantilla | Para qué sirve |
|---|---|
| Formulario de ingesta de cliente | Captar datos del nuevo cliente antes de la primera reunión |
| Checklist de documentos requeridos | Por tipo de proceso (laboral, civil, penal, etc.) |
| Contrato de prestación de servicios jurídicos | Plantilla editable con campos prellenados |
| Cuestionario previo para tutela | Recolectar hechos para redactar la tutela |

---

## FÓRMULA PARA PEDIR UN ARTEFACTO JURÍDICO

Usa siempre esta estructura. Sin ella, Claude genera respuestas genéricas:

```
Crea un artefacto de tipo [mini app / dashboard / plantilla].

Tipo: [calculadora / tablero / documento / formulario]
Objetivo: [para qué lo voy a usar exactamente]
Contenido: [qué campos, secciones o cálculos debe incluir]
Audiencia: [para mí / para el cliente / para presentar en reunión]
Estilo: [paleta Bufete Cortés Cartagena #1F3864 / #B8860B]
Formato: HTML interactivo, autocontenido, sin dependencias externas.
Datos reales: [pegar los datos del caso si los tienes]
```

---

## PROMPTS LISTOS PARA COPIAR — ARTEFACTOS JURÍDICOS

### Artefacto 1: Calculadora de Prescripción Laboral

```
Crea un artefacto HTML interactivo en español que calcule si una
acción laboral en Colombia está prescrita.

Campos de entrada:
1. Tipo de acción (cesantías / primas / vacaciones / indemnización / otro)
2. Fecha del hecho o último pago
3. Si hubo requerimiento o reclamación (sí/no + fecha)

El artefacto debe calcular:
- Plazo de prescripción aplicable (3 años para ordinario, según CST art. 151)
- Fecha exacta de vencimiento
- Días restantes o días de mora

Resultado visual:
- Semáforo: VERDE (no prescrita) / AMARILLO (menos de 90 días) / ROJO (prescrita)
- Advertencia si venció el plazo
- Nota: "[Reformación pendiente — verificar si reforma laboral modificó plazos]"

Diseño:
- Colores corporativos: #1F3864 (azul) y #B8860B (dorado)
- Interfaz limpia y profesional
- Texto en español colombiano
- Sin JavaScript externo

Nota legal visible: "Esta calculadora es orientativa. Consultar al abogado
titular antes de tomar decisiones procesales."
```

---

### Artefacto 2: Liquidador de Prestaciones Sociales

```
Crea un artefacto HTML interactivo que calcule las prestaciones
sociales de un trabajador colombiano según el CST.

Campos:
1. Salario básico mensual (COP)
2. Fecha de ingreso
3. Fecha de retiro (o "activo" si sigue)
4. Si recibe auxilio de transporte (sí/no)
5. Si recibe comisiones o bonificaciones habituales (monto mensual promedio)

Calcular automáticamente:
- Cesantías (art. 249 CST): salario × días / 360
- Intereses a cesantías (12% anual sobre saldo)
- Prima de servicios (art. 306 CST): semestral
- Vacaciones (art. 186 CST): 15 días hábiles / año
- Si aplica indemnización por despido sin justa causa (art. 64 CST)

Mostrar:
- Tabla de resultados por concepto
- Total bruto a pagar
- Notas sobre conceptos que requieren verificación contable

Diseño: colores #1F3864 / #B8860B, interfaz premium, texto en español.
Nota legal: "Cálculo orientativo. Verificar con contador y validar
deducciones de ley antes de liquidar."
```

---

### Artefacto 3: Dashboard Interactivo de Estado de un Caso

```
Crea un artefacto HTML de dashboard ejecutivo para presentarle
al cliente el estado de su proceso judicial.

Secciones obligatorias:
1. Header: nombre del cliente, tipo de proceso, radicado, estado general (semáforo)
2. Línea de tiempo del proceso: etapas completadas y pendientes con barras de progreso
3. Próxima actuación: fecha, tipo, qué se espera lograr
4. Documentos pendientes del cliente: tabla con documento, estado, urgencia
5. Riesgos identificados: tabla con riesgo, nivel, acción recomendada
6. Resumen ejecutivo: qué ha pasado, qué sigue, qué necesita el cliente hacer

Usa estos datos:
[PEGAR: nombre del cliente, tipo de proceso, etapas del caso,
próxima audiencia, documentos pendientes, riesgos conocidos]

Diseño: colores #1F3864 / #B8860B, tipografía profesional, semáforos
verde/amarillo/rojo, tarjetas con bordes suaves. Sin JavaScript externo.
Texto en español colombiano. Incluir fecha de generación.
```

---

### Artefacto 4: Formulario de Ingesta de Nuevo Cliente

```
Crea un artefacto HTML que funcione como formulario de ingesta
profesional para nuevos clientes del Bufete Cortés Cartagena.

Secciones del formulario:
1. Datos personales: nombre, cédula, dirección, teléfono, email
2. Tipo de asunto: laboral / civil / penal / mercantil / familia / administrativo / tutela
3. Descripción del problema (campo de texto amplio)
4. Documentos que tiene disponibles (checklist)
5. Urgencia declarada: ¿hay términos próximos?
6. Cómo llegó al despacho (referido / redes / búsqueda / otro)
7. ¿Ha tenido asesoría anterior sobre este asunto? (sí/no)

Al final:
- Botón "Imprimir / Guardar formulario"
- Espacio para firma del cliente
- Nota de habeas data según Ley 1581/2012

Diseño: membrete con "Bufete Cortés Cartagena — T.P. 365.594",
colores institucionales, aspecto formal. Texto en español.
```

---

### Artefacto 5: Calculadora de Honorarios Profesionales

```
Crea un artefacto HTML para calcular honorarios del Bufete
Cortés Cartagena según tipo de servicio.

Campos:
1. Tipo de servicio: consulta / contrato / proceso ordinario / tutela / otro
2. Cuantía del asunto (si aplica, en COP)
3. Horas estimadas
4. Valor hora del despacho: [COMPLETAR]
5. Gastos adicionales estimados (desplazamientos, copias, aranceles)
6. ¿Incluye resultado exitoso contingente? (sí/no + porcentaje)

Calcular:
- Honorarios base por horas
- Honorarios por cuantía (si aplica tabla de referencia)
- Gastos adicionales
- IVA 19% (si el cliente es responsable del IVA)
- Propuesta final (mínimo / estándar / contingencia)

Mostrar resultado como:
- Propuesta de honorarios profesionales presentable al cliente
- Desglose claro por concepto
- Nota sobre honorarios en contingencia

Diseño: membrete Bufete, colores corporativos, estilo formal.
```

---

## TIPOS DE ARTEFACTOS — REFERENCIA RÁPIDA

```
MINI APP       → Calculadoras, liquidadores, herramientas de cálculo
DASHBOARD      → Tableros, paneles, reportes visuales con semáforos
PLANTILLA      → Documentos editables, formularios, checklists
PRESENTACIÓN   → Material para reunión con cliente o directivos
```

---

## REGLAS DE DISEÑO PARA TODOS LOS ARTEFACTOS DEL BUFETE

```css
/* Paleta Bufete Cortés Cartagena */
--azul-institucional: #1F3864;
--dorado: #B8860B;
--verde-ok: #2ECC71;
--amarillo-alerta: #F39C12;
--rojo-critico: #E74C3C;

/* Sin JavaScript externo */
/* HTML + CSS autocontenido */
/* Texto en español colombiano */
/* Nota legal al final */
/* Fecha de generación visible */
```

---

## INTEGRACIÓN CON EL ECOSISTEMA

```
biblioteca-prompts-lexa → prompt para pedirlo
artefactos-juridicos-lexa (ESTA SKILL) → guía qué tipo de artefacto crear
      ↓
Claude genera el HTML en artefacto
      ↓
kit-entregables-col → guarda en /mnt/user-data/outputs/ si se necesita archivo
      ↓
dashboard-ejecutivo-col → para dashboards más complejos y completos
```

---

*Bufete Cortés Cartagena — Jorge Ángel Cortés Cartagena T.P. 365.594 — Medellín, Colombia — 2026*
