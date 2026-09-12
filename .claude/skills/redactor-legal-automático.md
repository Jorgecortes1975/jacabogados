# Redactor Legal Automático

## Descripción
Agente especializado en redacción de documentos legales, demandas, tutelas, conceptos jurídicos y análisis contractual para despachos de abogados. Optimizado para derecho colombiano (J.A.C.).

## Capacidades
- ✅ Redactar demandas civiles, mercantiles, laborales
- ✅ Redactar tutelas y acciones de amparo
- ✅ Revisar y mejorar contratos
- ✅ Generar conceptos jurídicos y opiniones legales
- ✅ Análisis de jurisprudencia
- ✅ Redacción de escritos procesales
- ✅ Subsunción jurídica (aplicar normas a casos)

## Pasos Rápidos

### 1. Para demandas civiles
**Input**: Cuéntame los hechos (demandante, demandado, pretensión, fundamentos)
**Output**: Demanda lista para firmar, con citas de jurisprudencia

### 2. Para conceptos jurídicos
**Input**: La pregunta legal y el contexto
**Output**: Concepto estructurado: Problema jurídico → Normas aplicables → Análisis → Conclusión

### 3. Para revisión de contratos
**Input**: El contrato y preocupaciones específicas
**Output**: Análisis de riesgos, cláusulas problemáticas, recomendaciones

### 4. Para análisis de jurisprudencia
**Input**: Tema jurídico (ej: responsabilidad civil en accidentes de tránsito)
**Output**: Tendencia de la jurisprudencia, casos clave, tesis predominante

## Requisitos Previos
- Claude Desktop o claude.ai en navegador
- Conocimiento básico de derecho colombiano (el agente pregunta si necesita contexto)
- Acceso a jurisprudencia (SJU, Corte Constitucional, etc.)

## Prompts Listos para Copiar

### Prompt 1: Redactar demanda civil
```
SOY ABOGADO Y NECESITO REDACTAR UNA DEMANDA CIVIL

Demandante: [nombre, cédula]
Demandado: [nombre, cédula]
Pretensión: [qué pido: pago dinero, restitución, indemnización]
Hechos: [cuéntame con detalle qué pasó]
Fundamentos: [artículos del CC, leyes aplicables que ya conoces]
Pruebas: [documentos, testigos, peritos]

Por favor:
1. Redacta la demanda completa (encabezamiento, hechos numerados, fundamentos, pretensión)
2. Cita jurisprudencia relevante de la Corte Suprema o Juzgados
3. Usa estructura estándar: demandante, demandado, hechos, derechos, petitorio
4. Deja espacios para mi firma y la del cliente
```

### Prompt 2: Concepto jurídico estructurado
```
NECESITO UN CONCEPTO JURÍDICO

Pregunta: [Tu pregunta legal exacta]
Contexto: [Hechos relevantes, si aplica]
Jurisdicción: [Colombia / otro país]
Urgencia: [Normal / Rápido]

Dame:
1. Planteamiento del problema jurídico
2. Normas aplicables (códigos, leyes, decretos)
3. Jurisprudencia relevante
4. Análisis: aplicación de normas al caso
5. Conclusión respaldada
```

### Prompt 3: Revisión de contrato
```
REVISA ESTE CONTRATO PARA RIESGOS LEGALES

[Pega el contrato completo]

Enfócate en:
1. Cláusulas problemáticas para mi cliente [demandante/demandado/partes]
2. Riesgos de ejecución y cobro
3. Cláusulas abusivas (Ley 1480/2011 si es consumo)
4. Jurisdicción y ley aplicable
5. Arbitraje vs. litigio

Dame: tabla de riesgos con nivel (alto/medio/bajo) y recomendación
```

### Prompt 4: Análisis de jurisprudencia
```
ANALIZA LA TENDENCIA JURISPRUDENCIAL EN:

Tema: [ej: responsabilidad civil extracontractual, indemnización por lucro cesante]
Periodo: [últimos 5 años / últimos 10 años]
Corte: [Corte Suprema / Corte Constitucional / Juzgados]

Dime:
1. Tesis predominante (qué dice mayoritariamente la corte)
2. 3 casos emblemáticos (año, referencia, ratio decidendi)
3. Excepciones o variaciones en la jurisprudencia
4. Cómo usar esto en mi demanda/concepto
```

## Categorías de Documentos

### Área Civil
- Demandas por cobro de dinero
- Reclamos por daño moral
- Acciones de desahucio
- Resolución de controversias entre particulares

### Área Laboral
- Demandas por despido injusto
- Reclamos de prestaciones
- Tutelas en relación laboral
- Acuerdos de conciliación

### Área Mercantil
- Demandas por incumplimiento de contrato
- Disputas comerciales
- Insolvencia y quiebra
- Seguros y responsabilidad

### Área Penal
- Escritos de defensa
- Recursos de apelación
- Análisis de delitos
- Defensa en procesos penales

### Área Constitucional
- Tutelas
- Demandas de inconstitucionalidad
- Habeas corpus
- Derechos fundamentales

## Flujo de Trabajo Recomendado

1. **Recopila información** → Hechos, partes, pretensión
2. **Consulta con Claude** → Usa los prompts listos
3. **Recibe primer borrador** → Revísalo con el cliente
4. **Ajusta detalles** → Nombres exactos, cifras, citas
5. **Firma y presenta** → Despacho listo

## Solución de Problemas

**P: ¿Claude puede firmar documentos?**
R: No. Tú firmas como abogado responsable. Claude redacta, tú revisas y firmas.

**P: ¿Qué tan confiable es la jurisprudencia que genera?**
R: Debes verificar todas las citas en SJU (jurisprudencia.co) o bases oficiales. Claude da tendencias, no es fuente oficial.

**P: ¿Puede reemplazar a un abogado?**
R: No. Es una herramienta para ahorrar tiempo en redacción. La responsabilidad legal sigue siendo tuya.

**P: ¿Para qué casos sirve?**
R: Civiles, mercantiles, laborales, constitucionales. Menos para penales por complejidad (pero ayuda en escritos).

## Métricas de Éxito
- ⏱️ Reduce tiempo de redacción de demanda: de 3h a 30 min
- 📄 Demandas mejor fundamentadas con jurisprudencia
- 🔍 Contratos analizados en 10 minutos
- 💼 Conceptos jurídicos listos para presentar

## Integraciones Recomendadas
- **Con investigador jurídico**: Para jurisprudencia completa
- **Con compilador documental**: Para armar expedientes
- **Con subsunción jurídica**: Para análisis más profundos

## Fuentes Jurídicas Integradas
- Corte Suprema de Justicia
- Corte Constitucional
- Juzgados y Tribunales
- Código Civil Colombiano
- Código de Comercio
- Código Procesal Penal
- Código General del Proceso

---

**Ahora estás listo.** Copia los prompts, elige tu caso, y empieza a generar documentos legales en minutos.
