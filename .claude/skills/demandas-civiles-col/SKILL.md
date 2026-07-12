---
name: demandas-civiles-col
description: >
  Demandas civiles y comerciales conforme al CGP (Ley 1564/2012) colombiano. Activar para
  redactar o revisar demandas: reclamación de cantidad, ejecutivo, restitución de inmueble,
  verbal, verbal sumario, monitorio, responsabilidad civil, nulidad contractual, simulación,
  pertenencia, acciones posesorias, familia (divorcio, custodia, alimentos, liquidación
  sociedad conyugal). Incluye competencia por cuantía y factor, requisitos art. 82 CGP,
  medidas cautelares y formato Word. Activar ante: demanda civil, ejecutivo, monitorio,
  restitución, desahucio, lanzamiento, responsabilidad civil, familia, CGP, pertenencia.
---

# Skill: Demandas Civiles y Comerciales — Derecho Colombiano
## Bufete Cortés Cartagena

**Abogado titular**: Jorge Ángel Cortés Cartagena — T.P. 365.594
**Jurisdicción exclusiva**: República de Colombia
**Marco procesal**: Código General del Proceso (Ley 1564/2012)
**Estándar de producción**: documento listo para radicación, lenguaje de Alta Corte

---

## VINCULACIÓN CON EL ECOSISTEMA DE SKILLS

| Skill | Relación |
|---|---|
| `ecosistema-juridico-col` | Skill maestra — usar MOD-1 para estructura base de demandas |
| `jurisprudencia-col` | Para respaldo jurisprudencial con estándar certificado |
| `subsuncion-juridica-col` | Para conectar jurisprudencia con hechos del caso |
| `redactor-juridico-col` | Para depuración y validación del escrito final |
| `compilador-documental` | Para compilar demanda + anexos probatorios |
| `contrato-arrendamiento-col` | Para demandas derivadas de contratos de arrendamiento |

**Orden de ejecución recomendado:**

```
1. ecosistema-juridico-col (MOD-1) → Estructura + protocolo transversal
2. demandas-civiles-col (ESTA SKILL) → Especificaciones civiles/comerciales
3. jurisprudencia-col → Respaldo jurisprudencial certificado
4. subsuncion-juridica-col → Conexión doctrina-hechos
5. docx → Generación del documento Word
```

---

## Marco Normativo Procesal

### Normas Fundamentales

1. **Constitución Política**: arts. 29 (debido proceso), 228-230 (administración de justicia)
2. **Ley 1564 de 2012 (CGP)** — Código General del Proceso
3. **Código Civil colombiano** — Derecho sustancial
4. **Código de Comercio** — Títulos valores, contratos mercantiles, sociedades
5. **Ley 1480 de 2011** — Protección al consumidor
6. **Ley 1676 de 2013** — Garantías mobiliarias
7. **Ley 1996 de 2019** — Régimen de capacidad legal y apoyos
8. **Ley 2213 de 2022** — Virtualidad procesal permanente

### Principios Procesales CGP (arts. 1-14)

- Oralidad y publicidad
- Inmediación y concentración
- Igualdad procesal
- Buena fe y lealtad procesal
- Carga dinámica de la prueba (art. 167 CGP)

---

## Clasificación de Procesos Civiles (CGP)

### Por su naturaleza

| Tipo de proceso | Artículos CGP | Características |
|---|---|---|
| **Verbal** | Arts. 368-373 | Proceso tipo. Dos audiencias: inicial + instrucción y juzgamiento |
| **Verbal sumario** | Arts. 390-392 | Única audiencia. Asuntos de menor cuantía y específicos del art. 390 |
| **Ejecutivo** | Arts. 422-445 | Título ejecutivo que contiene obligación clara, expresa y exigible |
| **Monitorio** | Arts. 419-421 | Deudas hasta 40 SMLMV sin título ejecutivo |
| **Liquidación** | Arts. 486-531 | Sucesiones, sociedades conyugales |

### Por cuantía (arts. 25-26 CGP)

| Cuantía | Competencia | Instancia | Abogado |
|---|---|---|---|
| Mínima: hasta 40 SMLMV | Juez Municipal en pequeñas causas | Única | No preceptivo |
| Menor: > 40 hasta 150 SMLMV | Juez Municipal civil | Primera | Preceptivo |
| Mayor: > 150 SMLMV | Juez del Circuito civil | Primera | Preceptivo |

> **SMLMV 2026**: Verificar valor vigente antes de clasificar. En 2025 fue $1.423.500.

### Competencia territorial (arts. 28-30 CGP)

**Regla general**: domicilio del demandado (art. 28.1 CGP).

**Fueros especiales relevantes:**
- **Inmuebles**: lugar de ubicación del bien (art. 28.7 CGP)
- **Contratos**: lugar de cumplimiento de la obligación o domicilio del demandado (art. 28.3 CGP)
- **Responsabilidad extracontractual**: lugar donde ocurrió el hecho (art. 28.4 CGP)
- **Alimentos**: domicilio del alimentario o del demandado, a elección del demandante (art. 28.9 CGP)
- **Consumidor**: domicilio del consumidor (art. 58.5 Ley 1480/2011)
- **Sucesiones**: último domicilio del causante (art. 28.5 CGP)

---

## Requisitos de la Demanda (Art. 82 CGP)

### Contenido obligatorio

```
1. Designación del juez a quien se dirige
2. Nombre, domicilio, dirección y datos del demandante y apoderado
3. Nombre, domicilio y dirección del demandado (si se conoce)
4. Pretensiones (principales y subsidiarias)
5. Hechos que sirven de fundamento (numerados y clasificados)
6. Pruebas que se pretende hacer valer
7. Fundamentos de derecho
8. Cuantía (cuando sea necesario determinar competencia)
9. Dirección de notificación judicial del demandante y demandado
10. Anexos documentales
```

### Anexos obligatorios (art. 84 CGP)

- Poder para actuar
- Prueba de existencia y representación legal (personas jurídicas)
- Prueba de la calidad en que actúa el demandante (si no es a nombre propio)
- Pruebas documentales en poder del demandante
- Certificados y constancias que se requieran según el proceso

---

## Procesos Civiles Especializados

### Proceso de Restitución de Inmueble Arrendado (art. 384 CGP)

- **Competencia**: Juez Municipal del lugar del inmueble
- **Requisito previo**: Requerimiento al arrendatario (art. 384 par. 2 CGP)
- **Caución**: No se requiere para iniciar
- **Medida cautelar**: Puede solicitarse la restitución provisional (art. 384.4 CGP)
- **Remisión**: arts. 22-24 Ley 820/2003 (causales de terminación)

### Proceso Ejecutivo (arts. 422-445 CGP)

- **Título ejecutivo**: Obligación clara, expresa y exigible (art. 422 CGP)
- **Mandamiento de pago**: Juez ordena pagar dentro de 5 días (art. 430 CGP)
- **Excepciones**: En 10 días siguientes a la notificación (art. 442 CGP)
- **Medidas cautelares**: Embargo y secuestro previos o simultáneos (art. 599 CGP)

### Proceso Monitorio (arts. 419-421 CGP)

- **Cuantía máxima**: 40 SMLMV
- **No requiere título ejecutivo**: Solo declaración juramentada + soportes
- **Si el demandado no contesta**: Sentencia condenatoria automática
- **Si contesta**: Se convierte en proceso verbal sumario

### Proceso de Pertenencia / Prescripción Adquisitiva (art. 375 CGP)

- **Extraordinaria**: 10 años de posesión (art. 2531 CC) / 5 años bienes muebles
- **Ordinaria**: 5 años con justo título y buena fe (art. 2529 CC) / 3 años muebles
- **Agraria**: 5 años (Ley 4 de 1973)
- **Anexo especial**: Certificado de tradición + plano del inmueble + avalúo + listado colindantes

### Procesos de Familia

- **Divorcio contencioso**: Proceso verbal ante Juez de Familia (art. 390 CGP)
- **Divorcio de mutuo acuerdo**: Ante notario o ante juez (Ley 25/1992)
- **Alimentos**: Proceso verbal sumario. Alimentos provisionales desde la admisión
- **Custodia**: Proceso verbal. Competencia: Juez de Familia o Promiscuo
- **Liquidación de sociedad conyugal**: Proceso de liquidación (art. 486 CGP)

---

## Medidas Cautelares (Arts. 588-604 CGP)

### Innominadas (art. 590 CGP)

El CGP permite medidas cautelares innominadas: cualquier medida que el juez encuentre razonable para la protección del derecho amenazado.

### Requisitos

1. **Apariencia de buen derecho** (fumus boni iuris)
2. **Peligro por la demora** (periculum in mora)
3. **Caución** (salvo excepciones legales)
4. **Proporcionalidad**: la medida debe ser adecuada y no excesiva

### Medidas comunes

- Inscripción de la demanda (bienes sujetos a registro)
- Embargo y secuestro (procesos ejecutivos y en procesos declarativos con caución)
- Secuestro de inmueble arrendado (restitución)
- Medidas sobre bienes muebles o derechos

---

## Estructura de la Demanda Civil Colombiana

```
ENCABEZADO
  Ciudad, fecha
  
  Señor(a) Juez [Civil Municipal / del Circuito / de Familia / Promiscuo]
  [Municipio]
  E. S. D.
  
  REF.:  Proceso [verbal / verbal sumario / ejecutivo / monitorio / restitución]
         [Demandante] contra [Demandado(s)]
         Pretensión: [resumen de 1 línea]

IDENTIFICACIÓN DEL APODERADO
  [Nombre], identificado con C.C. [número], abogado en ejercicio portador de la
  Tarjeta Profesional No. [número], actuando como apoderado judicial de [parte]...

PARTES
  DEMANDANTE: Nombre, cédula, domicilio, dirección, correo electrónico
  DEMANDADO: Nombre/razón social, cédula/NIT, rep. legal, domicilio, dirección

HECHOS (numerados cronológicamente)
  Solo hechos concretos, verificados, en tiempo pasado
  Vincular cada hecho con su soporte probatorio

FUNDAMENTOS DE DERECHO
  I.   Competencia (territorial + factor + cuantía)
  II.  Legitimación (activa y pasiva)
  III. Marco normativo sustancial
  IV.  Jurisprudencia aplicable (Altas Cortes)
  V.   Argumentación jurídica (subsunción CREAC)

PRETENSIONES
  PRIMERA.-  Que se declare/condene/ordene...
  SEGUNDA.-  Que se condene al pago de...
  [Subsidiarias si aplica]
  ÚLTIMA.-   Que se condene en costas al demandado.

PRUEBAS
  I.   Documentales (relacionar cada documento con su pertinencia)
  II.  Testimoniales (nombre + hecho a probar)
  III. Interrogatorio de parte (hechos a acreditar)
  IV.  Peritajes (materia técnica requerida)
  V.   Oficios (entidad + información solicitada)
  VI.  Inspección judicial (si aplica)

MEDIDAS CAUTELARES (si aplica)
  Solicitud específica + fundamento + caución ofrecida

ESTIMACIÓN RAZONADA DE LA CUANTÍA

ANEXOS
  Relación numerada de todos los documentos adjuntos

NOTIFICACIONES
  Del apoderado: [dirección física y electrónica]
  Del demandado: [dirección conocida para notificación personal]

FIRMA
  Jorge Ángel Cortés Cartagena
  Abogado — T.P. 365.594
```

---

## Términos Procesales Clave (CGP)

| Actuación | Término | Fundamento |
|---|---|---|
| Contestación de demanda (verbal) | 20 días hábiles | Art. 369 CGP |
| Contestación (verbal sumario) | 10 días hábiles | Art. 391 CGP |
| Excepciones previas | Dentro del traslado de la demanda | Art. 100 CGP |
| Recurso de reposición | 3 días | Art. 318 CGP |
| Recurso de apelación | 3 días (auto) / 10 días (sentencia) | Arts. 322-323 CGP |
| Casación | 30 días | Art. 336 CGP |
| Prescripción ordinaria civil | 10 años | Art. 2536 CC |
| Prescripción extracontractual | 2 años | Art. 2358 CC |
| Caducidad acciones rescisión | 4 años | Art. 1954 CC |

---

## Errores Críticos que Generan Inadmisión

| Error | Consecuencia | Corrección |
|---|---|---|
| Falta de poder | Inadmisión (art. 90 CGP) | Adjuntar poder con facultades expresas |
| Demandado mal identificado | Nulidad parcial | Verificar en RUES / Cámara de Comercio |
| Pretensiones incongruentes | Inadmisión | Reformular de forma clara y congruente |
| Cuantía no estimada | Inadmisión | Incluir estimación razonada |
| Falta de pruebas documentales | Debilidad procesal | Aportar con la demanda (art. 173 CGP) |
| Competencia errada | Remisión por incompetencia | Verificar cuantía + territorio + factor |
| Caducidad vencida | Rechazo de plano | Verificar término antes de radicar |

---

## Checklist Pre-Radicación

- [ ] Dirigida al Juez competente (Municipal/Circuito/Familia + ubicación)
- [ ] Poder adjunto con facultades suficientes
- [ ] Demandado correctamente identificado (nombre, cédula/NIT, rep. legal)
- [ ] Hechos numerados cronológicamente, concretos, sin argumentos
- [ ] Pretensiones claras, congruentes, cuantificadas
- [ ] Fundamentos de derecho con normas vigentes verificadas
- [ ] Jurisprudencia real y pertinente (no inventada)
- [ ] Pruebas relacionadas con su pertinencia y conducencia
- [ ] Cuantía estimada razonadamente
- [ ] Medidas cautelares solicitadas (si procede) con caución
- [ ] Notificaciones completas del apoderado y demandado
- [ ] Documento íntegro, sin truncamientos
- [ ] Firmado con datos del Dr. Cortés Cartagena, T.P. 365.594

---

## DATOS FIJOS DEL BUFETE

```
Abogado titular:    Jorge Ángel Cortés Cartagena
Tarjeta Profesional: T.P. 365.594
Ciudad:             Medellín, Antioquia
Firma en documentos: Jorge Ángel Cortés Cartagena
                     Abogado — T.P. 365.594
```
