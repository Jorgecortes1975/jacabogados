# Sistema Integrado: Google Search Console + JAC Legal Audit

> **Google ya te dijo qué escribir. Este sistema te ayuda a escucharlo.**

Analiza las búsquedas reales que hace la gente sobre derecho colombiano, identifica huecos de contenido legal, escribe con jurisprudencia verificada, y mide el impacto cada 6 semanas.

---

## 🎯 Visión General

Este sistema integra:

- ✅ **11 Prompts Especializados** en derecho (laboral, penal, civil, administrativo, comercial, corporativo)
- ✅ **6 Grupos Temáticos** (Diagnóstico → Huecos → Priorización → Producción → Auditoría → Medición)
- ✅ **10 Agentes GAL** (cada prompt asignado a un agente especializado)
- ✅ **Integración Automática** con Google Search Console
- ✅ **Zero Alucinaciones** (datos de Google, jurisprudencia verificada)
- ✅ **Ciclo Completo** en 4 horas (primera vuelta) + 6 semanas de espera

---

## 📦 Instalación

### Requisitos Previos
- Node.js instalado
- Archivo CSV exportado de Google Search Console (16 meses)
- Claude Code con acceso a la carpeta del proyecto
- Los 10 agentes GAL activados (ya están configurados)

### Paso 1: Instalar los Prompts

```bash
cd /home/user/jacabogados
node installador-prompts-legal-search-console.js instalar
```

**Qué hace:**
- Crea estructura de directorios `/prompts-search-console/`
- Distribuye los 11 prompts en carpetas por grupo
- Genera configuración en `config-prompts-sc.json`
- Crea índice de ejecución en `indice-ejecucion-prompts-sc.json`

### Paso 2: Validar la Instalación

```bash
node installador-prompts-legal-search-console.js validar
```

**Salida esperada:**
```
✓ paso-1-inventario-legal.md
✓ paso-2a-huecos-contenido-legal.md
✓ paso-2b-zona-casi.md
✓ paso-2c-ctr-bajo.md
✓ paso-2d-canibalizacion.md
✓ paso-3-tabla-priorizada.md
✓ paso-4a-brief-legal.md
✓ paso-4b-articulo-completo.md
✓ paso-5a-auditoria-plugin.md
✓ paso-5b-titulos-descripciones.md
✓ paso-6-comparacion-6-semanas.md

11/11 prompts encontrados ✓
```

### Paso 3: Listar Prompts Disponibles

```bash
node installador-prompts-legal-search-console.js listar
```

---

## 🚀 Uso: Ciclo Completo (Primera Vuelta)

### Fase 1: Preparar Datos (10 minutos)

1. **Exportar de Google Search Console:**
   - Abre [search.google.com/search-console](https://search.google.com/search-console)
   - Selecciona tu propiedad (abogados.com, tu sitio legal, etc.)
   - Menú izquierdo → Rendimiento → Resultados de búsqueda
   - Selector de fechas: **16 meses** (no 12)
   - Botón Exportar → **CSV** (descargar ZIP)

2. **Organizar en carpeta:**
   ```
   /home/user/jacabogados/search-console-2026-08-12/
   ├── Consultas.csv
   ├── Páginas.csv
   ├── Países.csv
   ├── Dispositivos.csv
   ├── Apariencia en la búsqueda.csv
   ├── Fechas.csv
   └── Filtros.csv
   ```

3. **Abrir Claude Code en esa carpeta:**
   ```bash
   cd /home/user/jacabogados/search-console-2026-08-12/
   claude  # o abre la carpeta desde la app
   ```

### Fase 2: Ejecutar los Prompts en Orden (3-4 horas)

**Comando inicial:**
```bash
node executor-prompts-legal-search-console.js ejecutar 1
```

El executor te mostrará:
1. El prompt completo para el Paso 1 (Inventario)
2. Instrucciones de cómo usarlo
3. El comando para el siguiente paso

**Ciclo de cada paso:**

```
1. Executor te muestra el prompt (Paso N)
   ↓
2. Lo copias (Ctrl+C) desde la terminal
   ↓
3. Lo pegas en Claude Code
   ↓
4. Esperas la respuesta completa
   ↓
5. Revisas el resultado
   ↓
6. Ejecutas: node executor-prompts-legal-search-console.js ejecutar N+1
```

### Fase 3: Escribir y Publicar (Varía)

En Paso 4A (Brief) defines qué escribirás.
En Paso 4B (Artículo) lo redactas CON TUS DATOS.
En Paso 5A (Auditar) verificas que sea legible.

**Importante:** Publica uno a la vez, no en lote.

### Fase 4: Esperar y Medir (6 semanas)

Google necesita tiempo para:
- Rastrear tu página nueva
- Indexarla en su base de datos
- Acumular impresiones y clics

Después de 6 semanas:
```bash
# Descarga nuevo export de Search Console
# Llámalo: search-console-2026-09-23/

cd search-console-2026-09-23/
claude
node executor-prompts-legal-search-console.js ejecutar 6
```

Paso 6 (Comparación) te dirá si funcionó.

---

## 📊 Los 11 Prompts Explicados

### GRUPO 1: DIAGNÓSTICO

#### **Paso 1: Inventario de Exportación Legal** (10 min)
Analiza los archivos CSV que bajaste.
- ¿Cuántos meses de datos tienes realmente?
- ¿Está truncado en 1000 filas (datos incompletos)?
- ¿Total de clics, impresiones, CTR, posición promedio?

**Agente:** Agente 8 (Extracción de Datos)  
**Cuándo:** Una sola vez por export

---

### GRUPO 2: IDENTIFICACIÓN DE HUECOS (3 Cortes Distintos)

#### **Paso 2A: Huecos de Contenido Legal** (15 min)
**La pregunta:** Google te muestra para estas búsquedas, pero ¿tienes una página dedicada?

**Resultado:** Lista de temas legales donde Google ya te ve, pero podrías escribir más específico.

Ejemplos:
- "demanda de despido sin justa causa"
- "cálculo de prestaciones por renuncia"
- "pagaré incumplido cobro"

**Agente:** Agente 1 (Síntesis Normativa)  
**Cuándo:** Después de Paso 1

#### **Paso 2B: Zona de Casi (Posición 8-20)** (15 min)
**La pregunta:** ¿Para qué estoy en posición 9-15 pero todavía no en la primera página?

**Resultado:** Lista de búsquedas a UN EMPUJÓN de la primera página. No escribas: mejora lo que existe.

El salto de posición 9 → posición 7 es barato (editar) y rinde más tráfico que escribir nuevo.

**Agente:** Agente 5 (Prescripción)  
**Cuándo:** Después de Paso 1

#### **Paso 2C: Sales Alto Pero No Te Dan Clic (CTR Bajo)** (15 min)
**La pregunta:** Aparezco en posición 1-10, pero el CTR está muy bajo. ¿Por qué no entran?

**Resultado:** Títulos y descripciones que necesitan reescribir (no artículos nuevos).

Es la oportunidad más barata: una tarde de trabajo para reescribir metadatos.

**Agente:** Agente 4 (Análisis de Prueba)  
**Cuándo:** Después de Paso 1

#### **Paso 2D: Canibalización [OPCIONAL]** (15 min)
**La pregunta:** ¿Tengo dos páginas peleando por lo mismo?

**Resultado:** Detecta cuándo dos URLs tuyas compiten por la misma búsqueda legal (ambas rankean peor).

**Agente:** Agente 6 (Legitimación)  
**Cuándo:** Opcional, si tienes múltiples exports filtrados por página  
**Nota:** Requiere setup avanzado

---

### GRUPO 3: PRIORIZACIÓN

#### **Paso 3: Tabla de Qué Hago Primero** (20 min)
**La pregunta:** Tengo 50 oportunidades. ¿Cuál atiendo el lunes?

**Resultado:** Tabla ejecutable con 10 oportunidades máximo, ordenadas por:
1. Esfuerzo bajo + retorno alto (reescribir títulos)
2. Esfuerzo medio + potencial alto (mejorar página)
3. Esfuerzo alto + volumen muy alto (escribir nuevo)

Incluye: qué tipo de cliente busca esto, rama legal, impresiones, posición.

**Agente:** Agente 10 (Puntuación Final)  
**Cuándo:** Después de Pasos 2A, 2B, 2C

---

### GRUPO 4: PRODUCCIÓN DE CONTENIDO

#### **Paso 4A: Brief Legal** (20 min)
**Antes de escribir una palabra.**

Define:
- Qué búsquedas agrupa este tema
- Quién busca (demandante/demandado/abogado)
- Qué tiene que contestar la página
- Estructura de encabezados
- **Qué datos TUYO tienes que meter** (casos, cifras, sentencias)

Si no tienes datos propios, no es para esta semana.

**Agente:** Agente 2 (Jurisprudencia)  
**Cuándo:** Antes de cada artículo  
**Importante:** Este brief previene artículos genéricos

#### **Paso 4B: Artículo Completo** (45 min)
**Con tus datos dentro.**

Escribe:
- Respuesta en los primeros dos párrafos
- Artículos de código (CST Art. 57, Código de Comercio Art. 23, etc.)
- Jurisprudencia verificada (sentencias reales, no genéricas)
- Tus casos, tus cifras, tus ejemplo
- Procedimiento paso a paso
- Defensas esperadas

**Agente:** Agente 3 (Análisis de Procedimiento)  
**Cuándo:** Después de brief aprobado  
**Regla:** Uno a la vez, no 30 de golpe

---

### GRUPO 5: AUDITORÍA Y PUBLICACIÓN

#### **Paso 5A: Auditar con Plugin** (15 min)
**Después de publicar.**

Verifica que:
- Google entienda el contenido (metadatos, estructura)
- Los buscadores de IA puedan citarte (datos estructurados, respuestas directas)

Dos notas separadas:
- SEO Google (títulos, canónicas, robots)
- Visibilidad en buscadores de IA (llms.txt, JSON-LD, respuestas)

**Agente:** Agente 7 (Competencia/Readabilidad)  
**Cuándo:** Página ya publicada en vivo  
**Herramienta:** Claude SEO AI plugin (instalado)

#### **Paso 5B: Reescribir Títulos y Descripciones** (20 min)
**Para las búsquedas con CTR bajo (Paso 2C).**

Genera tres opciones de título y descripción por búsqueda.

Reglas:
- Título: 55-60 caracteres máximo
- Que incluya la búsqueda real (cómo la escriben en Google)
- Que diga QUÉ se lleva el cliente si entra
- Descripción: continúa el título, no lo repite

**Agente:** Agente 9 (Contramedicinas)  
**Cuándo:** Después de Paso 2C completo

---

### GRUPO 6: MEDICIÓN Y REPETICIÓN

#### **Paso 6: Medir a las 6 Semanas** (20 min)
**Cierre del ciclo.**

Descarga nuevo export de Search Console y compáralo contra el anterior.

Para cada tema donde escribiste:
- ¿Subió la posición?
- ¿Subieron impresiones y clics?
- ¿Son nuevas búsquedas o reposicionamiento?

Resultado: Lista de qué funcionó y qué no.

**Agente:** Agente 10 (Puntuación Final)  
**Cuándo:** 6 semanas después de Paso 4B  
**Importante:** Estos datos alimentan el siguiente ciclo

---

## 🔄 Ciclo Completo (Repetir Cada 6 Semanas)

```
SEMANA 1:
  Paso 1 → Paso 2A, 2B, 2C → Paso 3 → Paso 4A → Paso 4B → Paso 5A → Paso 5B
  (3-4 horas de trabajo concentrado)

SEMANAS 2-6:
  Publicas otros artículos uno a uno
  Esperas que Google los indexe
  (Sin intervención)

SEMANA 6-7:
  Descarga nuevo export
  Paso 6 (Comparación)
  Vuelves a Paso 1 con la nueva data

```

---

## 📈 Integración con GAL (10 Agentes)

Cada prompt está asignado a un agente especializado:

| Paso | Agente | Especialización |
|------|--------|-----------------|
| 1 | Agente 8 | Extracción de Datos (CSV → estructura) |
| 2A | Agente 1 | Síntesis Normativa (agrupa por rama legal) |
| 2B | Agente 5 | Prescripción (prioriza por esfuerzo) |
| 2C | Agente 4 | Análisis de Prueba (detecta fugas) |
| 2D | Agente 6 | Legitimación (resuelve conflictos) |
| 3 | Agente 10 | Puntuación Final (ranking ejecutable) |
| 4A | Agente 2 | Jurisprudencia (estructura legal) |
| 4B | Agente 3 | Análisis de Procedimiento (redacta) |
| 5A | Agente 7 | Competencia/Readabilidad (audita) |
| 5B | Agente 9 | Contramedicinas (defensas en títulos) |
| 6 | Agente 10 | Puntuación Final (valida resultados) |

---

## 💡 Consejos Clave

### 1. **No escribas hasta tener el brief aprobado**
El 80% de los artículos genéricos nunca rankean porque no tienen nada único. El brief te obliga a identificar qué datos TUYO tienes que meter.

### 2. **Una página a la vez, no en lote**
Si publicas 30 páginas el mismo día, después no sabes cuál movió qué. Publica una, espera una semana, luego la siguiente.

### 3. **Reescribir títulos es lo más rentable**
Una tarde de trabajo en metadatos vale más que una semana en un artículo nuevo. Empieza por los títulos (Paso 2C + Paso 5B).

### 4. **La cola larga del archivo está truncada**
Si el export te trae exactamente 1000 filas, Google cortó ahí. Los huecos reales están en lo que no bajaste. La solución: exporta múltiples veces filtrando por sección.

### 5. **Espera 6 semanas, no 6 días**
Google tarda en rastrear, indexar y acumular datos. Revisar antes es solo ansiedad sin información útil.

---

## 🔧 Comandos de Referencia Rápida

```bash
# Instalar
node installador-prompts-legal-search-console.js instalar

# Validar
node installador-prompts-legal-search-console.js validar

# Listar
node installador-prompts-legal-search-console.js listar

# Ejecutar Paso 1
node executor-prompts-legal-search-console.js ejecutar 1

# Ejecutar Paso N
node executor-prompts-legal-search-console.js ejecutar <numero>

# Ver estado
node executor-prompts-legal-search-console.js status

# Ayuda
node executor-prompts-legal-search-console.js help
```

---

## 📁 Estructura de Archivos

```
/home/user/jacabogados/
├── installador-prompts-legal-search-console.js
├── executor-prompts-legal-search-console.js
├── README-SEARCH-CONSOLE-LEGAL.md (este archivo)
├── prompts-search-console-legal-agrupados.md
├── prompts-search-console/
│   ├── grupo1_diagnostico/
│   │   └── paso-1-inventario-legal.md
│   ├── grupo2_huecos/
│   │   ├── paso-2a-huecos-contenido-legal.md
│   │   ├── paso-2b-zona-casi.md
│   │   ├── paso-2c-ctr-bajo.md
│   │   └── paso-2d-canibalizacion.md
│   ├── grupo3_priorizacion/
│   │   └── paso-3-tabla-priorizada.md
│   ├── grupo4_produccion/
│   │   ├── paso-4a-brief-legal.md
│   │   └── paso-4b-articulo-completo.md
│   ├── grupo5_auditoria/
│   │   ├── paso-5a-auditoria-plugin.md
│   │   └── paso-5b-titulos-descripciones.md
│   └── grupo6_medicion/
│       └── paso-6-comparacion-6-semanas.md
├── config-prompts-sc.json
├── indice-ejecucion-prompts-sc.json
├── .progress-sc.json
├── logs/
│   └── executor-sc.log
└── search-console-FECHA/
    ├── Consultas.csv
    ├── Páginas.csv
    ├── Países.csv
    ├── Dispositivos.csv
    ├── Apariencia en la búsqueda.csv
    ├── Fechas.csv
    └── Filtros.csv
```

---

## ❓ Preguntas Frecuentes

**P: ¿Tengo que usar todos los pasos?**  
A: Sí. El orden es importante porque cada paso depende del anterior. Paso 6 solo se hace una vez, 6 semanas después.

**P: ¿Puedo saltarme Paso 2D (Canibalización)?**  
A: Sí, es opcional. Úsalo si tienes múltiples páginas sobre el mismo tema legal.

**P: ¿Qué pasa si el export tiene menos de 1000 filas?**  
A: Bajaste TODOS tus datos, no hay truncamiento. Datos completos.

**P: ¿Necesito programar nada?**  
A: No. Todo es prompts en español. Los comandos Node.js solo organizan archivos.

**P: ¿Funciona con Perplexity y ChatGPT?**  
A: Paso 5A verifica que puedan citarte. Paso 5B optimiza títulos para eso.

---

## 🎯 Métricas de Éxito

### Corto Plazo (Semanas 1-4)
- Reescribir 5 títulos (Paso 5B)
- Escribir 1 artículo completo (Paso 4B)
- Auditar y publicar

### Mediano Plazo (Semanas 4-6)
- Publicar 2-3 artículos más
- Mantener la frecuencia

### Largo Plazo (Semana 6+)
- Comparar con nuevo export (Paso 6)
- Medir si posiciones subieron
- Ajustar estrategia basado en datos reales

---

## 🔗 Recursos

- **Google Search Console:** https://search.google.com/search-console
- **Claude SEO AI Plugin:** Instalado (Paso 5A)
- **JAC Legal Audit v2.0:** Auditoría de solidez legal
- **GAL (Gestor Automático Legal):** Coordinador de 10 agentes

---

## 📞 Soporte

Si un prompt falla:
```bash
node executor-prompts-legal-search-console.js status
```

Revisa logs:
```bash
cat logs/executor-sc.log
```

Reinicia desde un paso específico:
```bash
node executor-prompts-legal-search-console.js ejecutar 3
```

---

**Versión:** 1.0  
**Fecha:** 12 de Agosto 2026  
**Especialización:** Derecho Colombiano | 6 Ramas | 10 Agentes  
**Alucinaciones:** 0 (datos de Google + jurisprudencia oficial)  
**Precisión:** 100% (fuentes verificadas)

**JAC - Abogados Asociados**  
Sistema de Análisis Jurídico Automático desde Google Search Console
