# 🔍 PROMPT MAESTRO: Auto-Crítica y Mejora de Calidad

## Sistema de Revisión Interna para Validación de Trabajo | JAC

---

## 📋 ESTRUCTURA BASE - Plantilla Mejorada

### BLOQUE 1: DEFINIR EL TRABAJO A REVISAR

**Mejora del original:**
```
"Completaste [TAREA]. Ahora DETENTE. No finalices aún.

CONTEXTO DEL TRABAJO:
├─ Tarea: [Descripción específica]
├─ Objetivo: [Qué se buscaba lograr]
├─ Requisitos: [Qué debía incluir]
├─ Audiencia: [Quién lo usa]
├─ Restricciones: [Qué no se puede hacer]
├─ Estándar de calidad: [Qué significa "bueno"]
└─ Deadline: [Cuándo se necesita]

LO QUE COMPLETASTE:
├─ Tipo: [Análisis / Reporte / Código / Plan]
├─ Extensión: [# palabras / # líneas / # páginas]
├─ Formato: [Markdown / HTML / JSON / PDF]
└─ Estado: BORRADOR, REQUIERE VALIDACIÓN

INSTRUCCIONES PARA REVISOR (Tú mismo):
├─ Rol: Revisor CRÍTICO externo (no el autor)
├─ Mentalidad: 'Quiero romper este trabajo'
├─ Estándar: Asume que el autor se equivocó
├─ Entrega: Versión mejorada DESPUÉS de revisar
└─ Tiempo: 20-30 min de revisión crítica
"
```

### BLOQUE 2: CHECKLIST DE VALIDACIÓN

**Mejora del original:**
```
FASE 1: ERRORES FACTUALES

☐ 1.1 Datos Numéricos
   └─ ¿Cada número es verificable?
      ├─ Cifra mencionada: "Área mercantil creció 35%"
      ├─ Fuente: ¿Viene de base de datos? ¿Cálculo propio? ¿Benchmarking?
      ├─ Validación: ¿Es el dato correcto?
      │  ├─ Si es dato conocido: ✓ Verificar contra fuente original
      │  ├─ Si es cálculo: ✓ Recalcular manualmente
      │  ├─ Si es benchmark: ✓ Revisar que metodología sea comparable
      │  └─ Si no es verificable: ⚠️ MARCAR como "No verificado"
      └─ Acción: ¿Cambiar número? ¿Agregar disclaimer? ¿Eliminar?

☐ 1.2 Fechas y Períodos
   └─ ¿Todas las fechas son consistentes?
      ├─ Ejemplo: "En últimos 24 meses, de enero 2024 a diciembre 2025"
      ├─ Validación: ¿Son 24 meses exactos? ¿O 23? ¿O diferente?
      └─ Acción: Corregir o clarificar período exacto

☐ 1.3 Referencias y Citas
   └─ ¿Cada afirmación fuerte tiene fuente?
      ├─ Fuerte: "Jurisprudencia muestra que..."
      ├─ Débil: "Creo que..."
      ├─ Validación: ¿Cita existe? ¿Es accesible? ¿Dice realmente eso?
      └─ Acción: Agregar cita o debilitar la afirmación

☐ 1.4 Consistencia Interna
   └─ ¿Documento contradice a sí mismo?
      ├─ Página 1: "Competencia es fuerte"
      ├─ Página 5: "Competencia es débil"
      ├─ Validación: ¿Cuál es la verdad?
      └─ Acción: Resolver contradicción, clarificar contexto

☐ 1.5 Lógica Causal
   └─ ¿Causas están bien establecidas o son correlaciones?
      ├─ Afirmación: "Mayor experiencia causa mejor resultado"
      ├─ Validación: ¿O simplemente se correlacionan?
      │  ├─ Variables confusoras: ¿Abogados experimen reciben casos simples?
      │  ├─ Temporal: ¿Experiencia fue ANTES de mejora?
      │  └─ Alternativas: ¿Hay explicación distinta?
      └─ Acción: Cambiar a "correlaciona" o establecer causalidad mejor


FASE 2: REQUISITOS FALTANTES

☐ 2.1 Requisitos Explícitos
   └─ ¿Checklist de requisitos se completó al 100%?
      ├─ Requisito 1: [Qué debía incluir]
      │  └─ ✓ Presente / ✗ Falta / ⚠️ Incompleto
      ├─ Requisito 2: [...]
      │  └─ ✓ / ✗ / ⚠️
      └─ Acción: Agregar cualquier requisito faltante

☐ 2.2 Requisitos Implícitos
   └─ ¿Falta algo obvio que NO estaba en requisitos?
      ├─ Ejemplo tarea: "Crea análisis de expansión mercantil"
      ├─ Requisitos explícitos: Viabilidad, mercado, financiero
      ├─ Requisito implícito que falta: ¿Riesgos competitivos?
      ├─ Requisito implícito que falta: ¿Plan de comunicación al equipo?
      └─ Acción: Agregar secciones que debían estar ahí

☐ 2.3 Contexto vs Alcance
   └─ ¿El trabajo se desvió del scope original?
      ├─ Scope: "Plan de expansión en 6 meses"
      ├─ Entrega: Incluye también plan de 24 meses
      ├─ Pregunta: ¿Fuera de scope? ¿Útil de todas formas?
      └─ Acción: ¿Mantener o eliminar?

☐ 2.4 Nivel de Detalle
   └─ ¿Está en el nivel de detalle correcto?
      ├─ Muy superficial: "Haz esto" sin explicar cómo
      ├─ Muy profundo: 50 páginas de detalles innecesarios
      ├─ Audiencia: ¿CEO necesita estrategia o abogado necesita steps?
      └─ Acción: Ajustar nivel de detalle


FASE 3: RAZONAMIENTO DÉBIL

☐ 3.1 Saltos Lógicos
   └─ ¿Hay pasos de lógica que no se justifican?
      ├─ Afirmación A: "Demanda existe"
      ├─ Afirmación B: "Por lo tanto, deberíamos expandir"
      ├─ Pregunta: ¿A implica necesariamente B?
      │  ├─ ¿Y si demanda baja en 6 meses?
      │  ├─ ¿Y si competencia entra?
      │  └─ ¿Hay supuestos no declarados?
      └─ Acción: Justificar mejor o debilitar conclusión

☐ 3.2 Supuestos No Declarados
   └─ ¿Análisis se basa en supuestos que no mencionaste?
      ├─ Supuesto: "Equipo puede escalar 2x en 6 meses"
      ├─ Pregunta: ¿Por qué eso es verdad?
      ├─ Validación: ¿Se basó en entrevistas? ¿O solo intuición?
      └─ Acción: Declarar supuestos explícitamente

☐ 3.3 Falsa Dicotomía
   └─ ¿Se presentan solo 2 opciones cuando hay más?
      ├─ Presentado: "O expandir agresivamente o no expandir"
      ├─ Realidad: Hay 4+ opciones (cautelosa, moderada, etc)
      └─ Acción: Agregar opciones intermedias

☐ 3.4 Afirmaciones Sin Evidencia
   └─ ¿Hay claims fuertes sin respaldo?
      ├─ Claim: "Esta es la solución óptima"
      ├─ Pregunta: ¿Optimiza por qué métrica?
      ├─ Pregunta: ¿Comparado con qué alternativa?
      └─ Acción: Agregar análisis comparativo


FASE 4: CONTENIDO INNECESARIO

☐ 4.1 Redundancia
   └─ ¿Algo se repite más de una vez?
      ├─ Párrafo 1: Explica que mercado existe
      ├─ Párrafo 5: Lo repite con otras palabras
      ├─ Pregunta: ¿Primera mención era suficiente?
      └─ Acción: Eliminar repetición, mantener una sola versión

☐ 4.2 Tangentes
   └─ ¿Hay contenido fuera del scope principal?
      ├─ Tarea: Análisis de expansión mercantil
      ├─ Tangente encontrada: 3 párrafos sobre historia de derecho mercantil
      ├─ Pregunta: ¿Es crítico para decisión? ¿O solo interesante?
      └─ Acción: Eliminar o mover a apéndice

☐ 4.3 Verbosidad Innecesaria
   └─ ¿Se usa demasiadas palabras para decir algo simple?
      ├─ Original: "Considerando que la naturaleza del mercado es tal que 
      │            presenta características de fragmentación..."
      ├─ Mejorado: "Mercado está fragmentado"
      └─ Acción: Simplificar lenguaje en todo el documento

☐ 4.4 Secciones Que No Aportan
   └─ ¿Hay secciones completas que podrían eliminarse?
      ├─ Sección: "Historia de la práctica mercantil en Colombia"
      ├─ Pregunta: ¿Es esencial para decisión?
      ├─ Si respuesta es NO: Eliminar o reducir a 1 párrafo
      └─ Acción: Evaluar ROI de cada sección


FASE 5: SUPUESTOS POCO CLAROS

☐ 5.1 Supuestos Explícitos
   └─ ¿Está clara sección de "Supuestos"?
      ├─ Bueno: "Este análisis asume que demanda se mantiene 15%/año"
      ├─ Malo: No menciona supuestos en absoluto
      └─ Acción: Agregar sección de supuestos si no existe

☐ 5.2 Alcance de Validez
   └─ ¿Está claro en qué contexto aplica?
      ├─ Ejemplo: Análisis es válido para mercado colombiano
      │           pero podría no aplicar a mercado internacional
      ├─ Pregunta: ¿Se deja esto claro?
      └─ Acción: Agregar sección de limitaciones

☐ 5.3 Condiciones Que Rompen Análisis
   └─ ¿Qué pasaría si un supuesto fuera falso?
      ├─ Si demanda baja 50% → Análisis se rompe
      ├─ Si ley cambia → ROI cambiaría drasticamente
      ├─ Pregunta: ¿Se mencionan estos "circuit breakers"?
      └─ Acción: Agregar análisis de sensibilidad


FASE 6: USABILIDAD

☐ 6.1 Estructura y Navegabilidad
   └─ ¿Fácil encontrar lo que buscas?
      ├─ ¿Hay tabla de contenidos?
      ├─ ¿Encabezados son claros?
      ├─ ¿Se puede saltar a sección específica?
      └─ Acción: Mejorar estructura si es confusa

☐ 6.2 Formato Visual
   └─ ¿Fácil de leer?
      ├─ ¿Párrafos muy largos? (>5 líneas = dividir)
      ├─ ¿Hay listas para enumeraciones? (No bullets = agregar)
      ├─ ¿Hay énfasis en puntos clave? (Sin negrita = agregar)
      └─ Acción: Mejorar formato visual

☐ 6.3 Claridad de Recomendación
   └─ ¿Queda 100% claro qué recomendas?
      ├─ Malo: "Podría ser buena idea considerar expandir"
      ├─ Bueno: "Recomendamos: Expandir mercantil, inversión $170K, ROI 3x"
      └─ Acción: Hacer recomendación más explícita

☐ 6.4 Próximos Pasos
   └─ ¿Está claro QUÉ HACER CON ESTE TRABAJO?
      ├─ ¿Quién toma decisión?
      ├─ ¿Para cuándo?
      ├─ ¿Qué necesitan hacer primero?
      └─ Acción: Agregar sección "Próximos Pasos"
```

### BLOQUE 3: LISTA PRIVADA DE MEJORAS

**Mejora del original:**
```
DESPUÉS DE REVISAR CADA SECCIÓN:

Crea lista de "MEJORAS REQUERIDAS" ordenada por:
1. CRÍTICO (Bloquea entrega)
2. IMPORTANTE (Afecta calidad)
3. ÚTIL (Mejora pero no esencial)

EJEMPLO DE LISTA PRIVADA:

═══════════════════════════════════════════════════════════════
🔴 CRÍTICO (REQUIERE ARREGLO):
═══════════════════════════════════════════════════════════════

[1] FALTA SECCIÓN DE RIESGOS COMPETITIVOS
    └─ Problema: Análisis no menciona competencia
    └─ Línea: (No existe en documento)
    └─ Acción: Agregar sección Riesgos antes de conclusión
    └─ Prioridad: CRÍTICA (es parte de requisitos implícitos)
    └─ Estimado: 30 min para investigar + redactar

[2] NÚMERO DE INGRESOS NO ESTÁ VERIFICADO
    └─ Problema: Dice "$800K potencial" pero fuente es desconocida
    └─ Línea: "Potencial ingresos $800K/año"
    └─ Acción: Recalcular o agregar disclaimer "Estimado, requiere validación"
    └─ Prioridad: CRÍTICA (es número central de decisión)
    └─ Estimado: 20 min para recalcular

[3] CONTRADICCIÓN EN DISPONIBILIDAD DE EQUIPO
    └─ Problema: Página 3 dice "equipo disponible", página 8 dice "equipo saturado"
    └─ Línea: Pg3 línea 5 vs Pg8 línea 12
    └─ Acción: Resolver contradicción, clarificar capacidad real
    └─ Prioridad: CRÍTICA (afecta viabilidad)
    └─ Estimado: 15 min para editar + clarificar

═══════════════════════════════════════════════════════════════
🟡 IMPORTANTE (MEJORA CALIDAD):
═══════════════════════════════════════════════════════════════

[4] SUPUESTO "RAMP-UP LINEAL" NO ES EXPLÍCITO
    └─ Problema: Modelo financiero asume crecimiento lineal pero nunca lo menciona
    └─ Línea: Tabla financiera mes 2-6
    └─ Acción: Agregar nota explicativa de metodología
    └─ Impacto: Sin esto, CEO podría pensar proyección es más sólida de lo que es
    └─ Estimado: 10 min para agregar nota

[5] BENCHMARKING COMPETENCIA SOLO USA 3 BUFETES
    └─ Problema: "3 bufetes consultados" es muestra muy pequeña
    └─ Línea: Pg4 benchmarking section
    └─ Acción: Agregar disclaimer "muestra limitada" o buscar 2-3 más
    └─ Impacto: Debilita credibilidad del análisis competitivo
    └─ Estimado: 30 min si buscas más, 5 min si solo agregas disclaimer

[6] FALTA ANÁLISIS DE SENSIBILIDAD
    └─ Problema: ¿Qué pasa si demanda baja 20%? ROI cambiaría mucho
    └─ Línea: (Debería existir en sección financiero)
    └─ Acción: Agregar tabla "Si demanda es X, ROI es Y"
    └─ Impacto: Ayuda CEO entender riesgos downside
    └─ Estimado: 45 min para construir análisis

═══════════════════════════════════════════════════════════════
🟢 ÚTIL (MEJORA PERO NO CRÍTICO):
═══════════════════════════════════════════════════════════════

[7] PÁRRAFOS SON LARGOS, DIFÍCILES DE LEER
    └─ Problema: Párrafo intro es 8 líneas
    └─ Línea: Pg1, párrafo 2
    └─ Acción: Dividir en 2-3 párrafos menores
    └─ Impacto: Mejor legibilidad
    └─ Estimado: 10 min

[8] FALTA VISUALIZACIÓN DE TIMELINE
    └─ Problema: Plan de 6 meses está en texto, sería mejor en diagrama
    └─ Línea: Sección Roadmap
    └─ Acción: Agregar simple Gantt chart o timeline visual
    └─ Impacto: Más fácil de entender para CEO
    └─ Estimado: 30 min si haces en Markdown, 60 min si es gráfico real

[9] MENCIONES DE "JAC" NO SON CONSISTENTES
    └─ Problema: A veces "JAC", a veces "Abogados Asociados", a veces "bufete"
    └─ Línea: Múltiples, especialmente en secciones 2-4
    └─ Acción: Standardizar a "JAC" en todo documento
    └─ Impacto: Profesionalismo
    └─ Estimado: 10 min búsqueda y reemplazo

═══════════════════════════════════════════════════════════════
```

### BLOQUE 4: PROCESO DE ITERACIÓN

**Mejora del original:**
```
PASO 1: HACER CAMBIOS CRÍTICOS

Tomar items 🔴 CRÍTICO y fijar en orden de impacto:

[1] FALTA RIESGOS COMPETITIVOS
    ├─ Redactar sección: "Riesgos: Competencia podría entrar..."
    ├─ Agregar datos: 3 bufetes grandes ya en mercado
    ├─ Agregar mitigation: "Timeline agresivo limita ventana de reacción"
    └─ Insertar en documento: Después de viabilidad, antes de conclusión

[2] NÚMERO INGRESOS NO VERIFICADO
    ├─ Opción A: Recalcular desde cero (tarifa × casos estimado)
    ├─ Opción B: Agregar disclaimer explícito
    ├─ Decisión: Hacer AMBAS
    │   └─ "Estimado $800K basado en: $20K promedio tarifa × 40 casos.
    │      Nota: Asume ocupación 80%, requiere validación con clientes."
    └─ Insertar: Mismo lugar, con explicación clara

[3] CONTRADICCIÓN EQUIPO
    ├─ Revisar contexto en ambas páginas
    ├─ Resolución: Página 3 habla de disponibilidad técnica
    │               Página 8 habla de carga ACTUAL
    ├─ Editar para clarificar:
    │   └─ "Equipo TÉCNICAMENTE puede hacer mercantil (disponibilidad)
    │      PERO está cargado en 20% (contexto actual)"
    └─ Insertar: Nueva sección "Análisis de Capacidad"


PASO 2: REVISAR CAMBIOS IMPORTANTES

Tomar items 🟡 IMPORTANTE y evaluar urgencia:

[4] SUPUESTO LINEAL
    └─ Acción RÁPIDA: 10 min, agregar nota explicativa
    └─ Insert: "Proyecciones asumen ramp-up lineal (10 clientes mes 2, 20 mes 3, etc)"

[5] BENCHMARKING LIMITADO
    └─ Decisión: No hay tiempo para buscar más bufetes
    └─ Acción: Agregar disclaimer "Basado en 3 bufetes, muestra limitada"
    └─ Insert: Nota al pie de sección benchmarking

[6] ANÁLISIS DE SENSIBILIDAD
    └─ Decisión: Crítico agregar
    └─ Acción: Construir tabla simple
    │   └─ Si demanda: 75% de proyección → ROI cae a 150%
    │   └─ Si demanda: 50% de proyección → ROI es 80% (marginal)
    │   └─ Si demanda: 125% de proyección → ROI es 400%
    └─ Insert: Nueva subsección en financiero


PASO 3: DECIDIR SOBRE MEJORAS ÚTILES

Items 🟢 ÚTIL:

[7] PÁRRAFOS LARGOS
    └─ Hacer: Sí, rápido, mejora legibilidad → HACER

[8] VISUALIZACIÓN TIMELINE
    └─ Hacer: No, no hay tiempo en deadline → SKIP

[9] CONSISTENCIA DE NOMBRE
    └─ Hacer: Sí, 10 min con buscar-reemplazar → HACER


PASO 4: VERSIÓN MEJORADA

After making all changes:
├─ Releer documento completo (10 min)
├─ Verificar que cambios se insertaron correctamente
├─ Validar que flujo lógico aún funciona
├─ Corregir cualquier error introducido durante edición
└─ Resultado: Versión 2.0 lista para entrega
```

### BLOQUE 5: VALIDACIÓN FINAL

**Mejora del original:**
```
CHECKLIST PRE-ENTREGA:

Antes de considerar trabajo "TERMINADO", validar:

☐ ERRORES FACTUALES
  ├─ ¿Todos los números tienen fuente?
  ├─ ¿Todas las fechas son consistentes?
  ├─ ¿Todas las citas son verificables?
  └─ ¿Documento NO contradice a sí mismo?

☐ REQUISITOS
  ├─ ¿100% de requisitos explícitos están cubiertos?
  ├─ ¿Requisitos implícitos agregados?
  └─ ¿Nada fuera de scope?

☐ RAZONAMIENTO
  ├─ ¿No hay saltos lógicos injustificados?
  ├─ ¿Supuestos están explícitos?
  ├─ ¿Alternativas consideradas?
  └─ ¿Evidencia respalda conclusiones?

☐ CONTENIDO
  ├─ ¿Sin redundancia innecesaria?
  ├─ ¿Sin tangentes fuera de scope?
  ├─ ¿Lenguaje es claro y conciso?
  └─ ¿Cada sección agrega valor?

☐ SUPUESTOS
  ├─ ¿Supuestos son explícitos?
  ├─ ¿Limitaciones del análisis claras?
  ├─ ¿Se explican "circuit breakers"?
  └─ ¿Análisis de sensibilidad incluido?

☐ USABILIDAD
  ├─ ¿Estructura es clara?
  ├─ ¿Formato visual es profesional?
  ├─ ¿Recomendación es explícita?
  └─ ¿Próximos pasos son claros?

☐ TONO Y ESTILO
  ├─ ¿Consistente con estilo de firma?
  ├─ ¿Apropiado para audiencia?
  ├─ ¿Profesional pero accesible?
  └─ ¿Sin errores gramaticales?

SI TODOS LOS ☐ ESTÁN CHECKADOS → LISTA PARA ENTREGA
SI ALGUNO SIN CHECK → REGRESAR A LISTA DE MEJORAS
```

### BLOQUE 6: TEMPLATE DE REPORTE DE AUTO-CRÍTICA

**Mejora del original:**
```
═══════════════════════════════════════════════════════════════════
📋 REPORTE DE AUTO-CRÍTICA | [TIPO TRABAJO] | [FECHA]
═══════════════════════════════════════════════════════════════════

TRABAJO REVISADO: [Análisis de expansión mercantil]
AUTOR ORIGINAL: [Tú]
REVISOR: [Tú como crítico externo]
FECHA DE REVISIÓN: [Hoy]

─────────────────────────────────────────────────────────────────

RESULTADO DE REVISIÓN:

Calidad INICIAL: 6.5/10 (borrador, necesita trabajo)
Calidad FINAL:   9.0/10 (después de iteraciones)

Cambios requeridos: 11 total
├─ Críticos: 3 (requieren arreglo)
├─ Importantes: 3 (mejoran calidad)
└─ Útiles: 5 (mejoran pero opcionales)

─────────────────────────────────────────────────────────────────

PROBLEMAS ENCONTRADOS

1. 🔴 CRÍTICO: Falta análisis de riesgos competitivos
   Severidad: ALTA (es parte de requisitos)
   Acción: ✓ ARREGLADO (agregada sección)

2. 🔴 CRÍTICO: Número de ingresos sin verificación
   Severidad: CRÍTICA (es central para decisión)
   Acción: ✓ ARREGLADO (recalculado + disclaimer)

3. 🔴 CRÍTICO: Contradicción sobre capacidad equipo
   Severidad: ALTA (afecta viabilidad)
   Acción: ✓ ARREGLADO (clarificada sección)

4. 🟡 IMPORTANTE: Supuesto lineal no es explícito
   Severidad: MEDIA (debilita credibilidad)
   Acción: ✓ ARREGLADO (agregada nota)

5. 🟡 IMPORTANTE: Benchmarking con muestra pequeña
   Severidad: MEDIA (afecta análisis competitivo)
   Acción: ✓ ARREGLADO (agregado disclaimer)

6. 🟡 IMPORTANTE: Falta análisis de sensibilidad
   Severidad: MEDIA (ayuda CEO entender riesgos)
   Acción: ✓ ARREGLADO (agregada tabla)

7. 🟢 ÚTIL: Párrafos demasiado largos
   Acción: ✓ ARREGLADO (divididos)

8. 🟢 ÚTIL: Falta visualización de timeline
   Acción: ⊘ SKIPPED (no hay tiempo, pero fue útil)

9. 🟢 ÚTIL: Inconsistencia de nombres
   Acción: ✓ ARREGLADO (estandarizado)

─────────────────────────────────────────────────────────────────

TIEMPO DE REVISIÓN E ITERACIÓN:

Fase de Revisión: 25 min (llenar checklists)
Fase de Edición: 40 min (hacer cambios)
Fase de Validación: 15 min (verificar todo)
TOTAL: 80 minutos

─────────────────────────────────────────────────────────────────

CAMBIOS PRINCIPALES:

✓ Agregada sección "Riesgos Competitivos" (500 palabras)
✓ Recalculados ingresos esperados con metodología clara
✓ Clarificada capacidad del equipo con números específicos
✓ Agregada tabla de análisis de sensibilidad
✓ Mejorada estructura visual de todo documento

─────────────────────────────────────────────────────────────────

CHECKLIST PRE-ENTREGA: ✅ 100% COMPLETO

☑ Errores factuales: Revisados y corregidos
☑ Requisitos: 100% cubiertos + implícitos agregados
☑ Razonamiento: Sin saltos lógicos, supuestos explícitos
☑ Contenido: Sin redundancia, lenguaje claro
☑ Supuestos: Explícitos, limitaciones claras
☑ Usabilidad: Estructura clara, profesional
☑ Tono: Consistente, apropiado para audiencia

─────────────────────────────────────────────────────────────────

CONFIANZA EN ENTREGA:

Antes de revisión: 6.5/10 ("Bueno pero necesita trabajo")
Después de revisión: 9.0/10 ("Listo para CEO, robusto")

Riesgos residuales:
├─ Riesgo bajo: Números requieren validación final con equipos
├─ Riesgo bajo: Benchmarking con muestra limitada
└─ Ningún riesgo crítico restante

VEREDICTO: ✅ APROBADO PARA ENTREGA

═══════════════════════════════════════════════════════════════════
```

### BLOQUE 7: GUÍA DE MENTALIDAD

**Mejora del original:**
```
MENTALIDAD DEL REVISOR CRÍTICO:

🎭 ROL A ASUMIR:
├─ NO eres el autor (que siempre defiende su trabajo)
├─ ERES un revisor externo que quiere encontrar problemas
├─ Tu objetivo: "Romper este trabajo para hacerlo más fuerte"
└─ Actitud: "El autor probablemente se equivocó en algo"


PRINCIPIOS A SEGUIR:

1. TRUST NOTHING
   ├─ Asume cada número está mal hasta que verificas
   ├─ Asume cada cita necesita validación
   ├─ No aceptes "creo que..." sin evidencia
   └─ Pregunta: "¿Cómo sé que esto es verdad?"

2. BUSCA PATRONES DE ERROR
   ├─ Si encontraste 1 error → probablemente hay más
   ├─ Si hay error en sección financiero → revisar 3x en otra sección
   ├─ Si falta un requisito → revisar qué otros requisitos faltan
   └─ Acción: Busca "clusters" de problemas

3. PRUEBA LA LÓGICA BAJO ESTRÉS
   ├─ "¿Qué pasa si demanda baja 50%?" → ¿Aún funciona?
   ├─ "¿Qué pasa si suposición X es falsa?" → ¿Análisis se rompe?
   ├─ "¿Qué pasa si competencia reacciona rápido?" → ¿Aún es viable?
   └─ Si análisis se rompe con cambios pequeños → DÉBIL

4. SIMPATIZA PERO SÉ DURO
   ├─ Comprende que el autor hizo lo mejor que pudo
   ├─ PERO eso no significa que el trabajo es bueno
   ├─ Tu trabajo es MEJORAR, no validar
   └─ Sé amable al reportar, pero sé claro en crítica

5. DIFERENCIA ENTRE ERROR vs PREFERENCIA
   ├─ ERROR: "Número es incorrecto" ← Arreglar siempre
   ├─ PREFERENCIA: "Yo escribiría esto diferente" ← Opcional
   ├─ CALIDAD: "Esto weakens el análisis" ← Arreglar
   └─ SCOPE: "Esto es fuera de requisitos" ← Considerar eliminar


SEÑALES DE PROBLEMA:
├─ 🚩 "Probablemente nadie notará" ← ¿Debería notarse?
├─ 🚩 "Es solo una pequeña cosa" ← ¿Suma con otros problemas?
├─ 🚩 "Todos lo hacen" ← ¿Eso lo hace correcto?
├─ 🚩 "No importa mucho" ← ¿Seguro? ¿Para CEO importaría?
└─ 🚩 "Puede estar bien así" ← ¿O podría estar mejor?


CÓMO MANEJAR DESCUBRIMIENTOS:

Si encuentras error CRÍTICO:
├─ Reacción inicial: "Oh no, esto es malo"
├─ Paso seguido: "¿Es realmente tan malo?"
├─ Validación: "Sí, afecta conclusión central"
├─ Acción: DEBE ser arreglado antes de entrega
└─ Tono: Neutral, "Encontré que necesita arreglo"

Si encuentras error IMPORTANTE pero NO CRÍTICO:
├─ Reacción: "Interesante, esto weakens el análisis"
├─ Validación: "¿Afecta credibilidad? Sí, moderadamente"
├─ Acción: Debería arreglarse pero no bloquea entrega
└─ Decisión: ¿Tiempo para arreglar? ¿O agregar disclaimer?

Si encuentras área MEJORABLE:
├─ Reacción: "Esto podría ser mejor"
├─ Validación: "¿Cuánto mejor? ¿Cuánto tiempo?"
├─ Acción: Evaluar ROI de mejora
└─ Decisión: ¿Vale la pena? ¿O skip?
```

---

## 🎯 CASO DE USO: AUTO-CRÍTICA EN ACCIÓN

```
EJEMPLO: Revisando "Análisis de Expansión Mercantil"

PASO 1: REVISOR SE "PONE EL SOMBRERO"
└─ Mentalidad: "Soy abogado de otra firma, critiqué este análisis"

PASO 2: LEE DOCUMENTO CON SKEPTICISMO
├─ Párrafo 1: "Demanda de 40+ clientes potenciales"
│  └─ Pregunta: ¿De dónde vienen estos 40? ¿Verificado?
│     Respuesta: No está clara la fuente. ⚠️ Marcar

├─ Párrafo 5: "Ingresos $630K año 1"
│  └─ Pregunta: $630K = ¿Cómo se calcula? ¿40 clientes × $20K?
│     Respuesta: No está explicado. ⚠️ Marcar

└─ Página 8: "Equipo está saturado en 20%"
   └─ Pregunta: ¿Pero página 3 decía que había capacidad?
      Respuesta: CONTRADICCIÓN. 🔴 Crítico

PASO 3: LLENA CHECKLIST DE VALIDACIÓN
├─ Errores factuales: 3 encontrados
├─ Requisitos faltantes: 2 encontrados (riesgos competitivos, sensibilidad)
├─ Razonamiento débil: 1 encontrado (salto lógico)
└─ Contenido innecesario: 2 encontrados (párrafos largos, tangentes)

PASO 4: CREA LISTA PRIVADA
├─ 🔴 CRÍTICO: 3 items (sería inútil entregar sin arreglar)
├─ 🟡 IMPORTANTE: 2 items (debería arreglar)
└─ 🟢 ÚTIL: 2 items (opcionales)

PASO 5: ITERA DOCUMENTO
├─ Arregla críticos (40 min)
├─ Arregla importantes (20 min)
├─ Arregla útiles (10 min)
└─ Total: 70 min de trabajo

PASO 6: VALIDACIÓN FINAL
├─ Relee documento completo
├─ Verifica cada cambio se insertó bien
├─ Checklist pre-entrega: ✅ 100%
└─ Confianza: 9/10

RESULTADO: Documento mejorado 6.5→9.0 de calidad
```

---

**JAC - Abogados Asociados**  
**Sistema de Auto-Crítica y Validación**  
**Versión 2.0 - Prompt Mejorado**  
**Última actualización: 15/08/2026**
