# CAPA ANTI-FALLAS — Los 5 controles de verificación rigurosa

Ningún candidato detectado en el barrido pasa a la alerta sin superar estos
5 controles, en orden. Cada control termina en un veredicto parcial; el veredicto
final del candidato es el peor de los cinco (el control más estricto manda).

---

## CONTROL 1 — ANTI-VICIOS (existencia, vigencia y validez)

Una norma puede existir y aun así no ser aplicable. Este control detecta los
"vicios ocultos" que hacen que una cita formalmente correcta sea jurídicamente falsa.

```
CHECKLIST ANTI-VICIOS (por cada norma candidata):
□ Existe: tipo + número + año + entidad emisora confirmados en fuente primaria
□ Fue publicada en el Diario Oficial (sin publicación no es exigible)
□ Ya entró en vigencia (ojo con vacancia legislativa y vigencia diferida o gradual)
□ No ha sido derogada expresamente
□ No ha sido derogada tácitamente por norma posterior sobre la misma materia
□ No ha sido modificada o subrogada en el artículo/apartado relevante
□ Corte Constitucional: no declarada inexequible (total o parcialmente);
  si es exequibilidad CONDICIONADA, registrar el condicionamiento
□ Actos administrativos: sin suspensión provisional ni nulidad del Consejo de Estado
□ Si es sentencia: no ha sido anulada, aclarada o modulada posteriormente
```

**El vicio más frecuente en vigilancia normativa**: reportar como "cambio de ley"
algo que es un proyecto de ley, un anuncio ministerial, un borrador en consulta
pública o una norma sancionada pero aún no publicada. Todo eso es EN TRÁMITE.
Registrar el estado exacto: radicado, debate en que va, sanción, publicación pendiente.

**Veredictos**: VIGENTE PLENA · VIGENTE CON MODIFICACIONES (citar la versión vigente) ·
VIGENCIA CONDICIONADA/DIFERIDA · EN TRÁMITE · DEROGADA/INEXEQUIBLE (descartada como
derecho vigente, útil solo como antecedente).

---

## CONTROL 2 — ANTI-VACÍOS (el silencio no se rellena)

Cuando la búsqueda no arroja resultado, distinguir SIEMPRE entre tres situaciones
que exigen respuestas distintas:

| Situación | Cómo se reconoce | Qué se reporta |
|---|---|---|
| (a) No hubo cambio | Las fuentes primarias del periodo fueron consultadas con éxito y no registran novedad | "Sin novedad en [área] para [periodo], fuentes consultadas: [lista]" |
| (b) No se pudo verificar | Una o más fuentes fallaron o no cubren el periodo | "s/d — no verificable en esta sesión" + qué fuente falta |
| (c) Laguna normativa real | La materia existe pero ninguna norma la regula | Señalar la laguna; si se sugiere analogía o principios, marcarlo como [Inferencia], nunca como norma |

Reglas:
- Prohibido rellenar un vacío con contenido plausible ("la norma seguramente dice...").
- Prohibido convertir (b) en (a): no poder verificar NO es lo mismo que "no hubo cambio".
- El marcador del despacho es **"s/d" (sin definición)** — usarlo tal cual (CLAUDE.md).

---

## CONTROL 3 — ANTI-AMBIGÜEDADES (las contradicciones se exhiben, no se resuelven en silencio)

```
CHECKLIST ANTI-AMBIGÜEDADES:
□ ¿Dos fuentes afirman cosas distintas sobre el mismo punto?
   → Jerarquía: fuente primaria (Nivel A) SIEMPRE gana sobre institucional (B) y prensa (C).
   → Si el conflicto es entre dos fuentes Nivel A: reportar AMBAS versiones, marcar
     [Controvertido] y recomendar concepto de especialista. Nunca elegir en silencio.
□ ¿El texto de la norma admite más de una lectura razonable en el punto relevante?
   → Presentar las lecturas, marcar [Ambiguo — criterio pendiente], indicar qué
     resolvería la duda (reglamentación, circular, jurisprudencia).
□ ¿Hay régimen de transición? (norma nueva y vieja conviven por un periodo)
   → Explicitar qué regla aplica a quién y desde cuándo. Los regímenes de transición
     son la fuente #1 de alertas equivocadas.
□ ¿La señal de prensa "interpreta" la norma más allá de su texto?
   → Reportar solo lo que dice el texto verificado; la interpretación de prensa se descarta.
```

---

## CONTROL 4 — ANTI-ALUCINACIONES (verificación en vivo, no de memoria)

Extiende `anti-hallucination-v3` con una regla específica de vigilancia:

> Lo que el modelo "recuerda" sobre normas colombianas es HIPÓTESIS de búsqueda.
> Solo se reporta como hecho lo LEÍDO en una fuente oficial DURANTE esta sesión.

```
CHECKLIST ANTI-ALUCINACIONES (por cada dato de la alerta):
□ El dato proviene de un fetch/búsqueda ejecutado en esta sesión (no de memoria)
□ URL de la fuente oficial registrada + fecha de consulta
□ Identificadores completos y copiados de la fuente (no reconstruidos):
   - Norma: tipo + número + año + entidad + artículo relevante
   - Sentencia: corporación + sala + tipo y número (C-/T-/SU-/radicado) + fecha + M.P.
□ Las cifras (salarios, UPC, porcentajes, plazos) fueron transcritas del texto
  oficial, no calculadas ni recordadas
□ El resumen del contenido es fiel al texto leído (releer antes de afirmar)
```

Si un dato no supera el checklist: baja a `[No verificado]` y sale de los hallazgos
confirmados. Aplicar además las 6 etiquetas de certidumbre de `anti-hallucination-v3`.

---

## CONTROL 5 — ANTI-FALLAS OPERATIVAS (degradación honesta)

Las herramientas fallan: páginas caídas, bloqueos 403, resultados vacíos, MCP
desconectado. La falla operativa no se oculta — se administra:

```
PROTOCOLO DE FALLA DE FUENTE:
1. Reintentar una vez (las fallas transitorias son comunes).
2. Intentar la fuente alterna del catálogo (ej. SUIN-Juriscol ↔ Secretaría del
   Senado para leyes; comunicado oficial de la corporación para sentencias).
3. Si ninguna responde: registrar la falla en "Cobertura y limitaciones" con
   fuente + hora + tipo de error, y marcar los ítems dependientes como
   "s/d — pendiente de verificación manual".
4. Si el ítem afectado es potencialmente CRÍTICO: decirlo de forma destacada y
   proponer al usuario la ruta manual exacta (URL + qué buscar) o un nuevo
   intento programado.
```

Reglas:
- Un barrido con fuentes caídas NUNCA se presenta como completo.
- La sección "Cobertura y limitaciones" es obligatoria aunque esté vacía
  ("todas las fuentes respondieron" también es información).
- Autochequeo final antes de entregar: ¿cada hallazgo confirmado tiene URL + fecha?
  ¿el perímetro está declarado? ¿los pendientes del barrido anterior se retomaron?
  Si algo falla, la alerta no se entrega: se corrige.

---

## FÓRMULAS ESTÁNDAR (copiar tal cual en los reportes)

**Señal detectada sin confirmación primaria:**
```
[No verificado] — Señal detectada en [fuente Nivel C] el [fecha]: "[qué afirma]".
No confirmada aún en fuente primaria ([cuál se intentó] — [resultado]).
No usar como fundamento. Próximo paso: [acción concreta de confirmación].
```

**Proyecto o trámite reportado como si fuera ley (corrección):**
```
EN TRÁMITE — [Proyecto de ley / decreto en consulta] sobre [materia].
Estado verificado al [fecha]: [radicado/debate/sanción/publicación pendiente], fuente: [URL].
NO es norma vigente. Hito a vigilar: [siguiente etapa del trámite].
```

**Fuente caída:**
```
s/d — [Fuente] no respondió en esta sesión ([error/hora]). Los siguientes ítems
quedan pendientes de verificación manual: [lista]. Ruta manual: [URL + qué buscar].
```

**Conflicto entre fuentes primarias:**
```
[Controvertido] — [Fuente A] indica [X] ([URL], [fecha]); [Fuente B] indica [Y]
([URL], [fecha]). No se adopta posición. Recomendación: [concepto de especialista /
esperar reglamentación / consulta directa a la entidad].
```
