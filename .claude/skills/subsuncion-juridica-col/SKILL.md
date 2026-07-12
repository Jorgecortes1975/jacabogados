---
name: subsuncion-juridica-col
description: >
  Pulido y revisión de escritos judiciales colombianos para conectar jurisprudencia de
  Altas Cortes con hechos concretos del caso. Activa SIEMPRE después de redactar demandas,
  tutelas, contestaciones, recursos o cualquier escrito procesal en Colombia. Transforma
  citas jurisprudenciales sueltas en argumentación subsuntiva donde la doctrina de la
  Corte Constitucional, Corte Suprema o Consejo de Estado se aplica directamente a los
  hechos del caso. Trigger: "pulir escrito", "conectar jurisprudencia", "revisar fundamentos",
  "mejorar argumentación", "aplicar subsunción", "conectar doctrina con hechos", o
  automáticamente tras generar cualquier escrito judicial colombiano. También activar ante:
  "la sentencia no está conectada", "las citas están sueltas", "falta argumentación",
  "mejorar los fundamentos de derecho", o cuando el escrito tenga citas del TS/CC/CE sin
  conexión fáctica.
---

# Skill: Subsunción Jurídica Colombiana — Conexión Jurisprudencia-Hechos
## Bufete Cortés Cartagena

**Abogado titular**: Jorge Ángel Cortés Cartagena — T.P. 365.594
**Jurisdicción exclusiva**: República de Colombia
**Estándar de producción**: argumentación subsuntiva de Alta Corte — persuasiva, técnica, inobjetable

---

## VINCULACIÓN CON EL ECOSISTEMA DE SKILLS

| Skill | Relación |
|---|---|
| `ecosistema-juridico-col` | Protocolo transversal: Fase 0 + estándares de redacción |
| `jurisprudencia-col` | Provee las sentencias que esta skill conecta con los hechos |
| `demandas-civiles-col` | Escritos civiles que requieren subsunción |
| `defensa-penal-col` | Escritos penales que requieren subsunción |
| `redactor-juridico-col` | Depuración post-subsunción |

**Posición en la cadena de ejecución:**

```
1. [Skill de estructura] → Estructura del escrito + requisitos procesales
2. jurisprudencia-col → Localización de 4+ sentencias de Altas Cortes
3. subsuncion-juridica-col ← ESTA SKILL → Conexión doctrina-hechos
4. redactor-juridico-col → Depuración y validación final
5. docx → Generación del documento Word
```

---

## PROBLEMA QUE RESUELVE

### ANTES (Cita suelta sin conexión — error frecuente):

```
La Corte Constitucional en sentencia T-320/2015 estableció que el derecho
a la estabilidad laboral reforzada protege a las personas en situación de
debilidad manifiesta.
```

### DESPUÉS (Subsunción jurídica completa — estándar exigido):

```
La Corte Constitucional, en sentencia T-320/2015 (M.P. Gloria Stella Ortiz
Delgado), ha reiterado que el derecho a la estabilidad laboral reforzada
opera como garantía constitucional para aquellas personas que, por su
condición de salud, se encuentran en situación de debilidad manifiesta,
exigiendo del empleador la obligación de obtener autorización previa del
inspector de trabajo para proceder al despido.

Proyectando esta doctrina al caso que nos ocupa, la señora [nombre de la
demandante] se encontraba en las condiciones exactas que activa esta protección:

• **Debilidad manifiesta acreditada**: Tal y como consta en el Hecho Cuarto
  de la demanda, la demandante fue diagnosticada con [diagnóstico] el
  [fecha], hecho que fue oportunamente comunicado al empleador mediante
  [medio de comunicación] el [fecha] (Documento nº [X]).

• **Conocimiento del empleador**: Conforme al Hecho Quinto, la empresa
  [nombre] tuvo pleno conocimiento de la condición de salud de la
  trabajadora, como lo acredita [prueba específica].

• **Despido sin autorización**: El Hecho Séptimo constata que el despido
  se produjo el [fecha] sin que el empleador hubiera solicitado ni obtenido
  autorización del Inspector de Trabajo, como lo exige el artículo 26 de
  la Ley 361 de 1997, en concordancia con la doctrina constitucional citada.

**Conclusión jurídica**: Al verificarse la totalidad de los presupuestos
que la jurisprudencia constitucional ha definido para la activación de la
estabilidad laboral reforzada —debilidad manifiesta + conocimiento del
empleador + despido sin autorización—, el despido de la señora [nombre]
es ineficaz y debe ordenarse su reintegro con pago de salarios y
prestaciones dejados de percibir, más la indemnización del artículo 26
de la Ley 361 de 1997 equivalente a 180 días de salario.
```

---

## CRITERIOS DE ACTIVACIÓN

### Activación Automática
- Después de aplicar `jurisprudencia-col`
- Después de redactar cualquier Fundamento de Derecho
- Cuando el escrito contenga citas de Altas Cortes sin conexión fáctica

### Activación Manual (Triggers)
- "pulir el escrito"
- "conectar la jurisprudencia con los hechos"
- "mejorar la argumentación"
- "revisar los fundamentos"
- "aplicar subsunción"
- "las sentencias están sueltas"

---

## PRINCIPIO RECTOR: DOCTRINA → HECHOS → CONCLUSIÓN

Toda cita jurisprudencial debe seguir la estructura tripartita:

```
┌─────────────────────────────────────────────────────────────┐
│  1. DOCTRINA: Qué dice la Alta Corte (ratio decidendi)      │
│     ↓                                                        │
│  2. APLICACIÓN: Cómo encajan los hechos concretos del caso  │
│     ↓                                                        │
│  3. CONCLUSIÓN: Consecuencia jurídica inevitable            │
└─────────────────────────────────────────────────────────────┘
```

### Conectores Obligatorios (Puente Doctrina → Hechos)

| Conector | Uso | Contexto |
|---|---|---|
| "En el caso que nos ocupa..." | Aplicación directa | Universal |
| "Proyectando esta doctrina al supuesto sub judice..." | Más formal | Casación, tutela |
| "Subsumiendo los hechos probados en esta doctrina..." | Técnico | Fundamentos de derecho |
| "La conducta del demandado encaja plenamente en el supuesto descrito..." | Acusatorio | Demandas |
| "Pues bien, mi mandante se encuentra exactamente en la situación protegida..." | Defensa | Contestación, tutela |
| "Al contrastar los elementos jurisprudenciales con la realidad procesal..." | Analítico | Alegatos |

---

## FLUJO DE TRABAJO (Revisión de Escrito)

```
PASO 1: INVENTARIO DE CITAS
├── Identificar TODAS las sentencias citadas en el escrito
├── Verificar que cada una tiene identificación completa
└── Listar qué doctrina/ratio decidendi aporta cada una
         ↓
PASO 2: MAPEO HECHOS-DOCTRINA
├── Releer los HECHOS de la demanda/escrito
├── Para CADA sentencia, identificar qué hechos específicos encajan
└── Crear matriz de conexión:
    ┌──────────────────────┬────────────────────────┬──────────────────────┐
    │ SENTENCIA            │ RATIO DECIDENDI        │ HECHOS QUE ENCAJAN   │
    ├──────────────────────┼────────────────────────┼──────────────────────┤
    │ T-XXX/AAAA (CC)      │ [regla de derecho]     │ Hecho 2º, Hecho 3º   │
    │ SL XXXX-AAAA (CSJ)   │ [regla de derecho]     │ Hecho 1º, Hecho 5º   │
    │ Rad. XXXXX (CE)      │ [regla de derecho]     │ Hecho 4º, Hecho 6º   │
    └──────────────────────┴────────────────────────┴──────────────────────┘
         ↓
PASO 3: REESCRITURA SUBSUNTIVA
├── Para cada cita jurisprudencial:
│   ├── Mantener la doctrina de la Alta Corte (qué dice)
│   ├── AÑADIR conector obligatorio
│   ├── INCORPORAR hechos específicos (fechas, nombres, acciones, pruebas)
│   ├── CITAR el número del hecho de la demanda ("como consta en el Hecho Tercero")
│   └── CERRAR con conclusión jurídica inevitable
└── Verificar que NO quede ninguna cita "huérfana" sin conexión fáctica
         ↓
PASO 4: VERIFICACIÓN DE CALIDAD
├── ¿Cada sentencia tiene su proyección a los hechos?
├── ¿Se mencionan fechas, nombres y acciones concretas del caso?
├── ¿La conclusión de cada Fundamento es inevitable tras la subsunción?
├── ¿El texto fluye de forma persuasiva?
└── ¿Se usan los números de hechos correctos?
```

---

## PATRONES DE SUBSUNCIÓN

### Patrón 1: Desglose de Elementos (Constitucional)

Cuando la doctrina de la Corte Constitucional tiene varios elementos o test:

```markdown
La Corte Constitucional, en sentencia [T/SU]-[número]/[año] (M.P. [nombre]),
ha establecido que [institución jurídica] requiere la concurrencia de
[X elementos/presupuestos]:

• **[Elemento 1]:** [Definición de la Corte]. En el caso que nos ocupa,
  [cómo se manifiesta en los hechos, citando Hecho Xº y Documento nº X].

• **[Elemento 2]:** [Definición de la Corte]. Pues bien, mi mandante
  [acción/omisión concreta con fecha y prueba].

• **[Elemento 3]:** [Definición de la Corte]. Tal y como consta acreditado
  documentalmente en el Documento nº X aportado con la demanda, [hecho].

**Conclusión jurídica:** Al concurrir la totalidad de los presupuestos
exigidos por la jurisprudencia constitucional, [consecuencia jurídica
inevitable].
```

### Patrón 2: Confrontación Directa (Laboral / Civil)

Cuando la doctrina de la Corte Suprema define un estándar que la contraparte incumplió:

```markdown
La Sala de Casación [Laboral/Civil] de la Corte Suprema de Justicia, en
sentencia [referencia] (M.P. [nombre]), ha establecido con claridad que
"[extracto breve de la ratio decidendi]".

Sin embargo, la actuación del demandado constituye la antítesis exacta
de este estándar:

- Donde la ley exige [X], el demandado [hizo Y] (Hecho Xº)
- Donde la diligencia impone [A], el demandado [omitió B] (Hecho Xº)
- Donde el contrato establece [M], la realidad probada demuestra [N] (Doc. nº X)

Esta fractura del deber jurídico no admite justificación, pues [argumento
de cierre anclado en la ratio decidendi].
```

### Patrón 3: Proyección Temporal (Prescripción / Caducidad / Plazos)

Cuando la jurisprudencia define plazos, momentos o secuencias:

```markdown
La doctrina consolidada de [Alta Corte] ([referencia], M.P. [nombre])
exige que [acción] se realice [cuándo/en qué plazo/bajo qué condiciones].

Cronología acreditada de los hechos:
- [Fecha 1]: [Evento] (Hecho Xº, Documento nº X)
- [Fecha 2]: [Evento] (Hecho Xº, Documento nº X)
- [Fecha 3]: [Evento] (Hecho Xº, Documento nº X)

Como se observa, transcurrieron [X días/meses/años] entre [evento A] y
[evento B], [excediendo/cumpliendo] el plazo [jurisprudencialmente/legalmente]
establecido. [Consecuencia jurídica].
```

### Patrón 4: Test de Proporcionalidad (Alexy — Constitucional)

Cuando se ponderen derechos fundamentales:

```markdown
Conforme al test de proporcionalidad desarrollado por la Corte Constitucional
(sentencia C-[número]/[año], M.P. [nombre]), la restricción del derecho
fundamental de mi mandante debe superar tres escrutinios:

1. **Idoneidad**: ¿La medida adoptada por [demandado] es apta para el fin
   perseguido? [Análisis con hechos del caso].

2. **Necesidad**: ¿Era la medida menos restrictiva disponible? [Análisis:
   existían alternativas que no vulneraban el derecho — Hecho Xº].

3. **Proporcionalidad estricta**: ¿Los beneficios de la medida superan
   la afectación del derecho? [Análisis: el perjuicio causado a mi mandante
   es desproporcionado frente al fin alegado — Hechos Xº y Xº].

**Conclusión**: La medida adoptada por el demandado no supera el [primer/
segundo/tercer] escalón del test de proporcionalidad, lo que confirma la
vulneración del derecho fundamental [especificar].
```

### Patrón 5: Conclusión Jurídica Forzosa (Cierre de bloque)

```markdown
**Conclusión jurídica:** La concurrencia de [elementos probados] —
[resumen breve de cada uno, con referencia a Hechos y Documentos]—
constituye [calificación jurídica]. Como ha reiterado [Alta Corte]
en la sentencia citada, [paráfrasis breve de la ratio]; al verificarse
íntegramente [condiciones], [consecuencia inevitable: declaración,
condena, nulidad, reintegro, indemnización, etc.].
```

---

## VOCABULARIO DE IMPACTO

### Verbos de Conexión

| Verbo | Uso |
|---|---|
| "fractura" | Incumplimiento grave de estándar |
| "quebranta" | Violación de norma/deber/garantía |
| "encaja" | Adecuación hecho-norma |
| "subsume" | Técnico, para silogismo jurídico |
| "proyecta" | Aplicación de doctrina |
| "materializa" | Concreción de riesgo/daño |
| "configura" | Reunión de elementos de una institución jurídica |
| "desnaturaliza" | Contrato realidad, simulación |

### Locuciones Jurídicas Colombianas

- "Tal y como ha reiterado el Alto Tribunal..."
- "En perfecta coherencia con esta línea jurisprudencial..."
- "Resulta palmario que..."
- "No cabe sino concluir que..."
- "La subsunción es inevitable..."
- "En el sub judice se acredita fehacientemente que..."
- "La realidad procesal demuestra, sin asomo de duda, que..."

### PALABRAS PROHIBIDAS

- "creo que" / "pienso que" / "me parece"
- "quizás" / "tal vez" / "probablemente"
- "podría" (salvo para hipótesis de la contraparte)
- "en mi humilde opinión"
- Cualquier expresión de duda sobre la propia tesis

---

## CHECKLIST DE PULIDO

### Por cada sentencia citada:
- [ ] ¿Tiene identificación completa (tipo, número, año, M.P.)?
- [ ] ¿Se explica qué doctrina/ratio decidendi aporta?
- [ ] ¿Se conecta con hechos específicos del caso (fechas, nombres, acciones)?
- [ ] ¿Se citan los números de Hechos de la demanda?
- [ ] ¿Se citan los Documentos probatorios que soportan la conexión?
- [ ] ¿Hay conclusión jurídica tras la subsunción?

### Por el conjunto del escrito:
- [ ] ¿Fluye de forma persuasiva y cohesionada?
- [ ] ¿Las citas no interrumpen la argumentación?
- [ ] ¿La conclusión de cada Fundamento es inevitable tras la subsunción?
- [ ] ¿No hay citas "huérfanas" sin conexión fáctica?
- [ ] ¿El lenguaje es técnico-jurídico colombiano, no detectable como IA?
- [ ] ¿Se mantiene la coherencia con los números de Hechos reales de la demanda?

---

## NOTAS TÉCNICAS

- Esta skill NO busca jurisprudencia (eso lo hace `jurisprudencia-col`)
- Esta skill TRANSFORMA citas existentes en argumentación subsuntiva
- Siempre verificar que los números de Hechos citados correspondan con la demanda real
- Mantener coherencia terminológica con el resto del escrito
- Respetar el estándar anti-alucinación del ecosistema: no inventar hechos ni pruebas

---

## DATOS FIJOS DEL BUFETE

```
Abogado titular:    Jorge Ángel Cortés Cartagena
Tarjeta Profesional: T.P. 365.594
Ciudad:             Medellín, Antioquia
Firma en documentos: Jorge Ángel Cortés Cartagena
                     Abogado — T.P. 365.594
```
