# Señales jurídicas — JA Abogados / Bufete Cortés Cartagena

> Extensión de `signal-patterns.md` para el trabajo diario del despacho.
> Pass A debe leer **ambos** archivos. Estas señales son de **alta prioridad**
> porque un error jurídico cristalizado cuesta un rechazo de auto o una condena
> en costas, no un test rojo.

---

## 1. Correcciones normativas del abogado (confidence: **high**, siempre)

Cuando el abogado corrige una norma, una cifra o una cita, **siempre** es
candidato `memory` o `project-doc`. Nunca `low`.

Frases gatillo:

- "esa ley no existe" / "esa sentencia no existe" / "ese radicado está mal"
- "esa norma está derogada" / "eso lo derogó la Ley X"
- "el artículo correcto es" / "no es el art. X, es el Y"
- "ese valor no es el de este año" / "el SMLMV de 2026 es"
- "eso ya no aplica desde" / "eso cambió con la reforma"
- "no cites eso sin verificar" / "verifica antes de citar"
- "la jurisprudencia vigente es" / "esa línea cambió"

**Categoría:** `project-doc` si es un valor o norma que aplica a todo el
despacho (va a `CLAUDE.md`, sección de normativa). `lesson` si el agente
llegó a la cita incorrecta por un razonamiento que se puede repetir.

**Ejemplo real de este repo:** Ley 2270/2024 y Ley 2261/2024 no existen y
estaban citadas en los templates. Eso es una `lesson` con las 4 secciones
Reflexion, no una nota suelta.

---

## 2. Alucinación jurídica detectada (confidence: **high**)

Señal más fuerte del sistema. Si en la sesión se detectó que el agente
inventó una norma, sentencia, radicado, magistrado o cifra:

- **Siempre** genera un candidato `lesson`.
- La sección "Señal de detección" debe decir **cómo reconocer el patrón antes
  de repetirlo** (ej: "cité una ley con número de 4 dígitos posterior a 2200
  sin haberla buscado en fuente oficial").
- Marca `confidence: high` sin excepción.

Patrones de detección en la transcripción:
- Una cita normativa que después el abogado marcó como falsa.
- Un radicado sin fecha ni magistrado que después se corrigió.
- Un valor monetario (SMLMV, UPC, auxilio) que no vino de fuente oficial.
- Uso de `[Pendiente verificación]` retirado sin haber verificado.

---

## 3. Preferencias de redacción del despacho (confidence: **medium/high**)

- "en este despacho no usamos tablas en los contratos"
- "siempre texto corrido con negritas"
- "el encabezado va así"
- "la firma va al final, no al margen"
- "no uses ese tono, es muy informal"
- "los hechos siempre etiquetados [Acreditado/Afirmado/Controvertido]"

**Categoría:** `memory` con `type: feedback`, o `project-doc` si es
convención de todo el bufete.

---

## 4. Competencia, plazos y procedimiento (confidence: **high**)

- "ese juzgado no es competente" / "va a circuito, no a municipal"
- "ese término ya caducó" / "el plazo es de X días, no Y"
- "eso se radica en" / "ese trámite es por"
- "la cuantía cambia la competencia"

**Categoría:** `lesson` (el agente aplicó mal una regla procesal) o
`project-doc` (regla estable del procedimiento colombiano).

---

## 5. Cliente y expediente (confidence: **medium**)

- "este cliente prefiere" / "con este cliente siempre"
- "en este expediente ya intentamos eso"
- "la contraparte suele responder con"

**Categoría:** `memory` con `type: project`. **Regla de confidencialidad:**
guarda el patrón, no los datos personales. Escribe "cliente del sector
manufactura prefiere X", no el nombre y la cédula. Los datos identificados
van al expediente en Drive, nunca a `~/.claude/`.

---

## 6. Workflows del despacho repetidos (confidence: **medium** → `skill`)

Si en la sesión apareció 3+ veces una secuencia de pasos del despacho
(intake → diagnóstico → recomendaciones, o verificar norma → buscar
jurisprudencia → redactar → auditar), es candidato a `skill` stub.

Antes de proponerlo, revisa si ya existe en `.claude/skills/` — este repo ya
tiene 18+ skills jurídicas. Si hay overlap, anótalo:
`[overlaps with: jurisprudencia-col]`.

---

## 7. Lo que NUNCA se guarda

Regla dura, por encima de cualquier señal:

- ❌ Datos personales de clientes (nombre completo + cédula + domicilio)
- ❌ Contenido de expedientes activos con litigio en curso
- ❌ Credenciales, tokens, connection strings
- ❌ Estrategia procesal de un caso concreto identificable
- ❌ Honorarios pactados con un cliente nombrado

Si una señal contiene algo de lo anterior, **desidentifícala antes de
proponerla como candidato**, o descártala. Esto no es negociable: está en
`CLAUDE.md` bajo Confidencialidad.

---

## 8. Ajuste de confidence para el dominio jurídico

| Señal | Confidence base | Motivo |
|---|---|---|
| Corrección de norma o cifra | `high` | Costo de error alto |
| Alucinación detectada | `high` | Es el modo de falla crítico del sistema |
| Regla de competencia/plazo | `high` | Rechazo de auto si falla |
| Preferencia de redacción | `medium` | Estilo, reversible |
| Patrón de cliente | `medium` | Puede no generalizar |
| Workflow repetido | `medium` | Verificar overlap primero |

En el resto del sistema, "si dudas, no guardes". **Aquí es al revés para las
correcciones normativas**: si el abogado corrigió una norma, guárdalo. Repetir
esa alucinación es peor que tener una memoria de más.
