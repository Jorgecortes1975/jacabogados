---
name: jurisprudencia-col
description: >
  Redacción de escritos procesales con estándar de casación certificado en Colombia.
  Requiere mínimo 4 sentencias de Altas Cortes colombianas verificables. Activación
  automática para demandas, contestaciones, reconvenciones, recursos, oposiciones,
  tutelas y cualquier escrito procesal que requiera respaldo jurisprudencial. Doble
  entregable: escrito procesal + resumen jurisprudencial en Word. Altas Cortes:
  Corte Constitucional (T-, C-, SU-), Corte Suprema de Justicia (casación laboral,
  civil, penal), Consejo de Estado. Activar ante: jurisprudencia, precedente, sentencia,
  ratio decidendi, casación, constitucional, tutela SU, unificación, línea jurisprudencial,
  Corte Suprema, Corte Constitucional, Consejo de Estado, o cualquier solicitud de
  respaldo jurisprudencial para escritos en Colombia. SIEMPRE activar cuando se pida
  fundamentar, respaldar o citar jurisprudencia colombiana.
---

# Skill: Jurisprudencia Colombiana — Estándar Certificado
## Bufete Cortés Cartagena

**Abogado titular**: Jorge Ángel Cortés Cartagena — T.P. 365.594
**Jurisdicción exclusiva**: República de Colombia
**Estándar de producción**: Altas Cortes — precedente verificable, anti-alucinación absoluta

---

## VINCULACIÓN CON EL ECOSISTEMA DE SKILLS

| Skill | Relación |
|---|---|
| `ecosistema-juridico-col` | Skill maestra — MOD-6 para análisis jurisprudencial profundo |
| `demandas-civiles-col` | Para demandas civiles/comerciales con respaldo jurisprudencial |
| `defensa-penal-col` | Para escritos penales con jurisprudencia de Sala Penal |
| `subsuncion-juridica-col` | Para conectar la jurisprudencia localizada con hechos del caso |
| `redactor-juridico-col` | Para depuración final del escrito con jurisprudencia integrada |
| `compilador-documental` | Para compilar escrito + resumen jurisprudencial |

**Orden de ejecución recomendado:**

```
1. ecosistema-juridico-col / demandas-civiles-col / defensa-penal-col
   → Estructura del escrito + requisitos procesales
2. jurisprudencia-col (ESTA SKILL)
   → Localización de 4+ sentencias de Altas Cortes
3. subsuncion-juridica-col
   → Conexión doctrina-hechos, pulido argumentativo
4. docx
   → Generación del documento Word final
```

---

## CRITERIOS DE ACTIVACIÓN (Trigger Automático)

**Activación OBLIGATORIA** al detectar cualquier intención de redactar:
- Demanda (civil, laboral, penal — parte civil, contencioso-administrativa)
- Contestación de demanda / excepciones
- Reconvención
- Recurso de apelación, casación, revisión, nulidad, queja
- Tutela o impugnación de tutela
- Alegatos de conclusión
- Oposición a cualquier recurso
- Concepto jurídico con fundamentación jurisprudencial
- Cualquier solicitud que contenga: "fundamenta", "respalda con jurisprudencia", "busca sentencias"

---

## DNA JURISPRUDENCIAL COLOMBIANO

### ESTÁNDAR DE ALTAS CORTES OBLIGATORIO

**PROHIBIDO** entregar un escrito procesal sin haber localizado **MÍNIMO 4 SENTENCIAS DE ALTAS CORTES COLOMBIANAS** que validen la tesis jurídica:

| Jurisdicción | Alta Corte | Sala/Sección |
|---|---|---|
| Constitucional | Corte Constitucional | Salas de Revisión / Pleno |
| Civil | Corte Suprema de Justicia | Sala de Casación Civil |
| Laboral | Corte Suprema de Justicia | Sala de Casación Laboral |
| Penal | Corte Suprema de Justicia | Sala de Casación Penal |
| Contencioso-administrativo | Consejo de Estado | Secciones 1ª a 5ª |
| Disciplinario | Consejo Superior de la Judicatura | Sala Jurisdiccional Disciplinaria |

### IDENTIFICACIÓN OBLIGATORIA DE SENTENCIAS

Para CADA sentencia citada, incluir obligatoriamente:

```
SENTENCIAS DE LA CORTE CONSTITUCIONAL:
  Formato: [T/C/SU]-[número]/[año]
  Ejemplo: T-428/2012, C-258/2013, SU-049/2017
  Magistrado Ponente: [nombre]
  Fuente: Relatoría de la Corte Constitucional

SENTENCIAS DE LA CORTE SUPREMA DE JUSTICIA:
  Formato: Radicación [número], [fecha], M.P. [nombre]
  Ejemplo: SL4360-2020, Rad. 76.929, M.P. Clara Cecilia Dueñas Quevedo
  Fuente: Relatoría de la CSJ

SENTENCIAS DEL CONSEJO DE ESTADO:
  Formato: Rad. [número], [fecha], C.P. [nombre]
  Ejemplo: Rad. 11001-03-25-000-2019-00050-00, C.P. Roberto Augusto Serrato Valdés
  Fuente: Relatoría del Consejo de Estado
```

### JERARQUÍA DE PRECEDENTE COLOMBIANO

```
1. Corte Constitucional — Sentencias SU- (unificación)  →  Precedente vinculante erga omnes
2. Corte Constitucional — Sentencias T- (tutela)        →  Precedente inter pares / obligatorio para casos análogos
3. Corte Constitucional — Sentencias C- (constitucionalidad) →  Cosa juzgada constitucional
4. Corte Suprema de Justicia — Sentencias de casación   →  Precedente vinculante en jurisdicción ordinaria
5. Consejo de Estado — Sentencias de unificación        →  Precedente vinculante contencioso-administrativo
6. Tribunales Superiores de Distrito                    →  Criterio auxiliar
7. Doctrina autorizada / SFC / Procuraduría             →  Criterio auxiliar no vinculante
```

### EXTRACCIÓN DE PRECEDENTE (Métodos obligatorios)

**Método Wambaugh**: Invertir la proposición jurídica central. Si al invertirla la decisión hubiera sido diferente → es ratio decidendi. Si la decisión se mantendría → es obiter dictum.

**Método Goodhart**: Identificar los hechos materialmente relevantes y la conclusión de derecho basada en ellos. Ratio decidendi = relación entre hechos materiales y conclusión.

Para cada sentencia:
- Extraer la **ratio decidendi** (regla de derecho vinculante)
- Separar del **obiter dictum** (afirmaciones incidentales)
- Verificar si el precedente ha sido **reiterado, modificado, distinguido o superado**
- Identificar la **línea jurisprudencial** (sentencia fundacional → reiteraciones → estado actual)

---

## PROTOCOLO ANTI-ALUCINACIÓN JURISPRUDENCIAL (CRÍTICO)

### PROHIBICIÓN ABSOLUTA

- **NO INVENTAR** sentencias, radicados, fechas, magistrados ponentes, ni extractos jurisprudenciales.
- **NO ATRIBUIR** doctrinas a sentencias que no las contienen.
- **NO SIMULAR** identificadores de sentencias.

### PROTOCOLO DE VERIFICACIÓN

1. Buscar con web_search: términos específicos + "Corte Constitucional" / "Corte Suprema" / "Consejo de Estado"
2. Verificar que la sentencia exista en la relatoría correspondiente
3. Confirmar que la ratio decidendi citada corresponde al contenido real de la sentencia
4. Si no se puede verificar: etiquetar `[No verificado — requiere confirmación en relatoría]`

### FUENTES DE VERIFICACIÓN

- **Corte Constitucional**: https://www.corteconstitucional.gov.co/relatoria/
- **Corte Suprema de Justicia**: https://consultajurisprudencial.ramajudicial.gov.co/
- **Consejo de Estado**: https://www.consejodeestado.gov.co/
- **SAMAI**: Sistema de consulta de providencias

### ETIQUETADO DE CERTEZA JURISPRUDENCIAL

- `[Verificado]` — Sentencia localizada y ratio decidendi confirmada
- `[Conocimiento de entrenamiento]` — Sentencia que Claude conoce pero no ha verificado en línea
- `[No verificado]` — Requiere confirmación en relatoría antes de usar en escrito real

---

## FLUJO DE TRABAJO

```
PASO 1: EXTRACCIÓN DE TESIS JURÍDICA
├── Analizar el caso del usuario
├── Identificar 2-3 problemas jurídicos centrales
└── Definir la tesis jurídica a defender
         ↓
PASO 2: MINERÍA JURISPRUDENCIAL (4+ SENTENCIAS MÍNIMO)
├── Buscar 4+ precedentes de Altas Cortes
├── PRIORIZAR:
│   ├── Sentencias de unificación (SU- / unificación CE)
│   ├── Sentencias de los últimos 36 meses
│   ├── Sentencias de casación con doctrina consolidada
│   └── Sentencias T- reiteradas en múltiples salas
├── Verificar vigencia del precedente
├── Obtener identificación completa de cada sentencia
└── Confirmar que no han sido superadas por doctrina posterior
         ↓
PASO 3: ¿SE LOCALIZARON 4+ SENTENCIAS?
├── SÍ → Continuar a Paso 4
└── NO → ACTIVAR BLOQUEO DE RESPUESTA (ver abajo)
         ↓
PASO 4: REDACCIÓN DEL ESCRITO
├── Integrar doctrina de forma orgánica en Fundamentos de Derecho
├── Citar sentencias con identificación completa
├── Extractar ratio decidendi relevante
├── Aplicar subsunción (activar subsuncion-juridica-col)
└── Aplicar estructura procesal según tipo de escrito
         ↓
PASO 5: GENERACIÓN DEL RESUMEN JURISPRUDENCIAL (Word)
├── Crear archivo: Resumen_Jurisprudencial_[NombreCaso].docx
├── Estructura en tabla ejecutiva
└── Incluir datos completos de cada sentencia
         ↓
PASO 6: VALIDACIÓN ADVERSARIAL
├── Analizar qué sentencias podría usar la contraparte
├── Argumentar superioridad de las sentencias seleccionadas
└── Identificar posibles contraargumentos y anticipar respuesta
```

---

## BLOQUEO DE RESPUESTA (Obligatorio)

Si **NO** se localizan las 4 sentencias de Altas Cortes, Claude **DEBE** informar:

```
⚠️ ALERTA ESTÁNDAR JURISPRUDENCIAL

No se puede proceder con el estándar de jurisprudencia certificada.
Solo se han localizado [X] sentencias de Altas Cortes colombianas.

OPCIONES DISPONIBLES:
1. 🔍 Ampliar búsqueda a Tribunales Superiores de Distrito
   (Se perderá la certificación "Jurisprudencia de Altas Cortes")
2. 🔄 Continuar buscando en Altas Cortes
   (Reformular términos de búsqueda)
3. ⚡ Proceder con las sentencias disponibles
   (Sin certificación — se indicará en el escrito)

¿Cómo desea proceder?
```

---

## DOBLE ENTREGABLE OBLIGATORIO

### Entregable 1: Escrito Procesal
Texto completo con jurisprudencia integrada orgánicamente en los Fundamentos de Derecho.

### Entregable 2: Resumen Jurisprudencial (Word)

```
═══════════════════════════════════════════════════════════════
RESUMEN JURISPRUDENCIAL CERTIFICADO
───────────────────────────────────
[NOMBRE DEL CASO]
[Tipo de escrito] — [Demandante] vs [Demandado]
Estándar: Jurisprudencia Certificada de Altas Cortes
Fecha de elaboración: [DD/MM/AAAA]
Abogado: Jorge Ángel Cortés Cartagena — T.P. 365.594
═══════════════════════════════════════════════════════════════

TESIS JURÍDICA DEFENDIDA
────────────────────────
[Descripción clara y concisa en 2-3 líneas]

JURISPRUDENCIA DE RESPALDO
──────────────────────────
┌──────────────────────┬────────────┬──────────────┬──────────────────────────────┐
│ ALTA CORTE / SALA    │ SENTENCIA  │ M.P./C.P.    │ RATIO DECIDENDI              │
├──────────────────────┼────────────┼──────────────┼──────────────────────────────┤
│ C. Const. / Sala X   │ T-XXX/AAAA │ [Nombre]     │ [Regla de derecho aplicable] │
│ CSJ / Sala Casación  │ SLXXXX-AAA │ [Nombre]     │ [Regla de derecho aplicable] │
│ C. Estado / Secc. X  │ Rad. XXXXX │ [Nombre]     │ [Regla de derecho aplicable] │
│ [Otra Alta Corte]    │ [Ref.]     │ [Nombre]     │ [Regla de derecho aplicable] │
└──────────────────────┴────────────┴──────────────┴──────────────────────────────┘

LÍNEA JURISPRUDENCIAL
─────────────────────
Sentencia fundacional → Reiteraciones → Estado actual → Tendencia

VALIDACIÓN ADVERSARIAL
──────────────────────
• [Sentencia que podría usar la contraparte] → [Por qué no prevalece]
• [Contraargumento identificado] → [Respuesta anticipada]

VERIFICACIÓN DE CERTEZA
───────────────────────
☑ Sentencias con identificación completa verificada
☑ Ratio decidendi extractada con método Wambaugh/Goodhart
☑ Vigencia del precedente confirmada
☑ Línea jurisprudencial trazada

═══════════════════════════════════════════════════════════════
              CERTIFICACIÓN JURISPRUDENCIAL
                 Documento generado con IA
              Verificación humana recomendada
═══════════════════════════════════════════════════════════════
```

---

## BÚSQUEDA JURISPRUDENCIAL — GUÍA TÉCNICA

### Términos de búsqueda efectivos

```
Para Corte Constitucional:
  "[tema] Corte Constitucional Colombia sentencia"
  "[derecho fundamental] tutela ratio decidendi"
  "SU [tema] unificación jurisprudencia"

Para Corte Suprema — Sala Laboral:
  "[tema] casación laboral Colombia"
  "contrato realidad Sala Laboral Corte Suprema"
  "[institución jurídica] SL casación laboral"

Para Corte Suprema — Sala Civil:
  "[tema] casación civil Colombia"
  "[institución] SC Corte Suprema Civil"

Para Consejo de Estado:
  "[tema] Consejo de Estado Colombia"
  "[materia] contencioso administrativo sentencia"
```

### Bases de datos de referencia

- Relatoría Corte Constitucional
- Sistema de Consulta de Jurisprudencia de la Rama Judicial
- LexBase
- vLex Colombia
- Ámbito Jurídico

---

## Checklist Jurisprudencia Certificada

Antes de entregar cualquier escrito, verificar:

- [ ] Mínimo 4 sentencias de Altas Cortes colombianas localizadas
- [ ] Todas las sentencias tienen identificación completa (tipo, número, año, M.P.)
- [ ] Sentencias priorizadas: últimos 36 meses, unificación, casación consolidada
- [ ] Vigencia del precedente verificada (no superado ni modificado)
- [ ] Ratio decidendi extractada correctamente (método Wambaugh/Goodhart)
- [ ] Doctrina integrada orgánicamente en Fundamentos de Derecho
- [ ] Archivo Resumen_Jurisprudencial generado
- [ ] Validación adversarial completada
- [ ] Ninguna sentencia inventada ni radicado simulado
- [ ] Etiquetado de certeza aplicado a cada sentencia

---

## DATOS FIJOS DEL BUFETE

```
Abogado titular:    Jorge Ángel Cortés Cartagena
Tarjeta Profesional: T.P. 365.594
Ciudad:             Medellín, Antioquia
Firma en documentos: Jorge Ángel Cortés Cartagena
                     Abogado — T.P. 365.594
```
