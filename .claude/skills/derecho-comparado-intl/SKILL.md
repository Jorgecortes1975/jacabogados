---
name: derecho-comparado-intl
description: >
  Investigación de derecho comparado multijurisdiccional (230+ jurisdicciones
  vía Legal Data Hunter) como módulo INFORMATIVO INDEPENDIENTE: informes
  comparados que NO se incorporan a escritos colombianos (muro de separación).
  Activar ante: derecho comparado, cómo se regula en otros países, qué dice la
  ley de [país], benchmarking normativo, GDPR vs Ley 1581, legislación extranjera,
  estándar internacional, tendencia regulatoria global. SIEMPRE activar ante
  derecho de jurisdicción distinta de Colombia o comparaciones entre jurisdicciones.
---

# DERECHO COMPARADO MULTIJURISDICCIONAL
## Módulo informativo independiente — con muro de separación

---

## MURO DE SEPARACIÓN (regla constitutiva — decisión del despacho, 18-jul-2026)

Este skill opera **AISLADO** del resto del ecosistema. Sus salidas son de
**validación e información**, nunca insumo de producción:

1. **Nada de lo que produce se incorpora, cita ni fusiona** en demandas,
   contestaciones, recursos, tutelas, conceptos, informes a clientes ni en la
   salida de ningún otro skill del despacho. El derecho comparado NO es fuente
   del derecho colombiano y aquí ni siquiera se usa como argumento de autoridad.
2. Si el usuario pide mezclar un resultado comparado en un escrito o concepto:
   recordar este muro y detenerse. Solo con **levantamiento expreso del muro por
   el usuario en esa conversación** puede entregarse el material — y aun así
   como **anexo separado y marcado**, jamás fundido en el cuerpo del documento.
3. Los entregables viven en la carpeta **`/comparado/`** — nunca en `/casos/`
   ni junto a expedientes de clientes.
4. Todo informe abre con esta leyenda fija, textual:

```
INFORME DE DERECHO COMPARADO — USO INFORMATIVO
Este documento es investigación comparada independiente. No constituye
asesoría legal en ninguna jurisdicción extranjera, no es fuente de derecho
colombiano y no debe incorporarse a escritos judiciales, conceptos ni
comunicaciones a clientes del despacho. Decisiones que dependan de derecho
extranjero requieren abogado habilitado en esa jurisdicción.
```

5. Razón del muro: el despacho ejerce en Colombia; el derecho extranjero
   analizado a distancia es orientación de contexto, y mezclarlo con la
   producción local crea riesgo profesional. El muro es versionado: el usuario
   puede redefinirlo a futuro editando esta sección.

---

## HERRAMIENTAS (en orden de preferencia)

1. **MCP Legal Data Hunter** — 230+ jurisdicciones, 38M+ documentos primarios:
   `discover_countries` (códigos disponibles) → `discover_sources` (fuentes por
   país y namespace) → `search` (namespace: `legislation` / `case_law` /
   `doctrine`, filtrando por `country`) → `get_document` (texto, empezar con el
   snippet; `include_full_text` solo si hace falta). Cada documento trae URL
   oficial citable. ⚠️ La cuota gratuita diaria se agota rápido: si ocurre,
   declararlo y continuar con la vía 2 — nunca rellenar de memoria.
2. **WebSearch / WebFetch sobre la fuente oficial de cada jurisdicción**
   (identificarla antes de afirmar: EUR-Lex para la UE, legislation.gov.uk,
   Légifrance, BOE España, eCFR/LII para EE.UU., portales oficiales
   latinoamericanos). Prensa y blogs jurídicos = solo señal, jamás confirmación.
3. **Regla heredada de `vigilancia-normativa-col`**: el conocimiento de memoria
   del modelo es HIPÓTESIS de búsqueda. En derecho extranjero el riesgo de
   alucinación es máximo — cero normas o fallos extranjeros de memoria.

---

## FLUJO

### 1. Delimitar la pregunta comparada
Tema preciso + jurisdicciones (o criterio para elegirlas: socios comerciales,
referentes del tema, familia jurídica) + para qué se quiere el contexto
(recordar: informativo). Si la pregunta real es de derecho colombiano, este
skill NO aplica — remitir al ecosistema nacional.

### 2. Confirmar cobertura
`discover_countries` y `discover_sources` antes de prometer jurisdicciones.
Lo no cubierto por las herramientas se declara fuera del alcance, no se
improvisa.

### 2.5 Método funcional (regla de oro del comparatista)

Comparar **funciones, no etiquetas**: la pregunta correcta es "¿cómo resuelve
esta jurisdicción el problema X?" y no "¿existe la figura Y?" (la misma función
puede cumplirla una ley, un precedente, un convenio colectivo o una práctica
administrativa según la familia jurídica). Antes de la tabla comparativa,
fijar el **tertium comparationis**: el criterio común contra el que se compara
cada jurisdicción (el problema regulado, no la institución local) — sin ese
criterio explícito, la tabla compara peras con manzanas y el informe no se
entrega.

### 3. Investigar por jurisdicción
Una jurisdicción a la vez: norma aplicable → estado (vigente/reformada, hasta
donde la fuente lo indique) → contenido relevante → fallo(s) clave si el tema
lo exige (solo leídos, con identificador completo).

### 4. Verificar (capa anti-fallas adaptada)
- Cita inline obligatoria: cada afirmación jurídica con su URL oficial y fecha
  de consulta, en la misma oración.
- **[Vigencia no verificada]** cuando la fuente extranjera no permita confirmar
  que la norma sigue vigente — decirlo, no asumirlo.
- **Falsos amigos jurídicos**: una figura extranjera "parecida" no es la
  colombiana (despido ≠ dismissal at-will; tutela ≠ amparo ≠ judicial review).
  Toda equivalencia funcional se marca [Inferencia] y se explica la diferencia.
- Diferencias de sistema explícitas (civil law / common law; federal / unitario;
  qué nivel de gobierno regula el tema).
- Traducciones propias marcadas: "traducción no oficial".

### 5. Informe comparado (en `/comparado/{tema}-{AAAA-MM}.md`)

```
[LEYENDA FIJA]

# [Tema] — panorama comparado
Fecha · Jurisdicciones cubiertas · Herramientas usadas (con estado)

## Síntesis (5-10 líneas: convergencias, divergencias, tendencia)
## Tabla comparativa (jurisdicción × criterios relevantes)
## Análisis por jurisdicción (con citas inline)
## Colombia como punto de referencia (solo descriptivo, tomado de fuentes
   colombianas ya verificadas — sin recomendaciones de acción local)
## Límites y advertencias (cobertura, cuota, vigencias no verificadas)
## Fuentes consolidadas
```

---

## REGLAS DURAS

1. **El muro de separación es incondicional** salvo levantamiento expreso del
   usuario en la conversación — y aun entonces, solo como anexo marcado.
2. Cero derecho extranjero de memoria: todo leído en fuente de la jurisdicción
   durante la sesión, con URL y fecha.
3. Etiquetas de certidumbre de `anti-hallucination-v3` + [Vigencia no
   verificada] + [Inferencia] en equivalencias.
4. Cobertura siempre declarada: jurisdicciones consultadas vs. pedidas, cuota
   agotada, fuentes caídas (protocolo de falla: reintento → vía alterna →
   declarar).
5. Señal/ruido: síntesis primero, sin narrar el proceso.

## VINCULACIÓN (restringida por diseño)

| Skill | Relación |
|---|---|
| `anti-hallucination-v3` | ÚNICA capa vinculada — control de calidad del informe |
| Todos los demás skills del ecosistema | **SIN vinculación** — muro de separación: este módulo no alimenta ni recibe producción de escritos, conceptos o casos |
