---
name: generador-reportes-juridicos
description: Genera reportes jurídicos profesionales estructurados con jurisprudencia verificada, normativa aplicable, análisis y recomendaciones citables.
---

# Generador de Reportes Jurídicos

Skill para generación de reportes jurídicos profesionales documentados y citables.

## Capacidades

### Tipos de Reportes
1. **Reportes de Investigación Jurídica**
   - Análisis exhaustivo de temas legales
   - Jurisprudencia y normas aplicables
   - Comparativas internacionales cuando aplica

2. **Memorandos Jurídicos**
   - Asesoramiento sobre punto específico
   - Análisis de riesgos y oportunidades
   - Recomendaciones ejecutivas

3. **Análisis de Riesgo Legal**
   - Identificación de contingencias
   - Evaluación de exposición
   - Matriz de riesgos

4. **Reportes de Caso**
   - Análisis específico de caso
   - Jurisprudencia aplicable
   - Estrategia recomendada

5. **Reportes de Cumplimiento**
   - Verificación normativa
   - Estado de obligaciones
   - Recomendaciones de ajuste

## Cómo Usar

```bash
# Activar el agente
node agente-juridico-especializado.js activar

# Generar reporte de investigación
node agente-juridico-especializado.js consulta reporte \
  "Estado actual del derecho de huelga en Colombia"

# Generar memorando jurídico
node agente-juridico-especializado.js consulta reporte \
  "Memorando: requisitos para crear sociedad anónima"

# Análisis de riesgo legal
node agente-juridico-especializado.js consulta reporte \
  "Análisis de riesgo: contrato de arrendamiento comercial"
```

## Estructura de Reporte

### Encabezado
- Título del reporte
- Fecha de emisión
- Área jurídica
- Preparado por (Agente JAC)
- Clasificación (confidencial/público)

### Tabla de Contenidos
- Secciones principales
- Numeración clara
- Navegable

### Resumen Ejecutivo
- Hallazgos principales (3-5 puntos)
- Conclusiones clave
- Recomendaciones inmediatas

### Cuerpo del Reporte

#### 1. Planteamiento del Tema
- Definición clara del asunto
- Contexto y relevancia
- Alcance del análisis

#### 2. Marco Normativo
- Leyes aplicables
- Decretos relevantes
- Resoluciones administrativas
- Con citas y artículos específicos

#### 3. Jurisprudencia Relevante
- Sentencias de Corte Constitucional
- Decisiones de Corte Suprema
- Providencias de Consejo de Estado
- Análisis de línea jurisprudencial

#### 4. Análisis Especializado
- Interpretación de normas
- Aplicación de jurisprudencia
- Identificación de conflictos
- Resolución de ambigüedades

#### 5. Conclusiones
- Síntesis de hallazgos
- Respuesta a pregunta principal
- Incertidumbres o limitaciones

#### 6. Recomendaciones
- Acciones recomendadas
- Priorización
- Cronograma sugerido

### Fuentes y Anexos
- Bibliografía jurídica
- Sentencias citadas
- Normas aplicables
- Documentos de referencia
- Links a fuentes oficiales

## Ejemplos de Reportes

### Ejemplo 1: Reporte de Investigación
```
Título: "Derecho de Huelga en Colombia: Análisis 2024"
Secciones:
  1. Definición y protección constitucional
  2. Marco normativo: Ley 1000/2014
  3. Jurisprudencia: Corte Constitucional C-1234/2023
  4. Requisitos y limitaciones
  5. Jurisprudencia reciente sobre huelgas
  Conclusiones: 5 puntos clave
  Recomendaciones: Para empleadores y trabajadores
```

### Ejemplo 2: Memorando de Asesoramiento
```
Título: "Memorando: Constitución de Sociedad Anónima"
Consulta: "¿Cuál es el procedimiento y requisitos?"
Respuesta estructurada:
  1. Requisitos legales
  2. Documentos necesarios
  3. Procedimiento ante la Cámara de Comercio
  4. Tiempos esperados
  5. Costos y aranceles
  Recomendaciones: Paso a paso
```

### Ejemplo 3: Análisis de Riesgo
```
Título: "Análisis de Riesgo Legal: Contrato de Arrendamiento"
Matriz de riesgos:
  - Riesgo alto: Falta de garantía
  - Riesgo medio: Cláusula de reajuste
  - Riesgo bajo: Plazo de terminación
Jurisprudencia aplicable para cada riesgo
Mitigaciones recomendadas
```

## Garantías de Calidad

✓ Reportes profesionales y citables
✓ Jurisprudencia verificada y linkeable
✓ Normativa actualizada de SUIN
✓ Análisis imparcial y exhaustivo
✓ Formato compatible con sistemas de gestión legal

## Formatos de Salida

- **Markdown** - Para edición y colaboración
- **PDF** - Para presentación profesional
- **JSON** - Para integración con sistemas
- **HTML** - Para visualización web

## Integración con Agente JAC

Este skill se activa cuando se solicita un reporte. Integra datos de:
- Jurisprudencia (consulta-jurisprudencia)
- Normas (consulta-normas)
- Análisis (analisis-jurisprudencial)

## Archivos Relacionados

- `agente-juridico-especializado.js` - Motor de reportes
- `consulta-jurisprudencia/SKILL.md` - Datos de sentencias
- `consulta-normas/SKILL.md` - Normas aplicables
- `analisis-jurisprudencial/SKILL.md` - Análisis técnico

---

**Skill: Generador de Reportes | Versión 1.0 | JAC - Abogados Asociados**
