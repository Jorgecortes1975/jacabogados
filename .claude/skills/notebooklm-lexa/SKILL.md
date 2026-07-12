---
name: notebooklm-lexa
version: "1.0"
description: >
  Integración de NotebookLM (Google) como memoria persistente y motor de análisis
  profundo para el ecosistema LEXA-LAB del Bufete Cortés Cartagena. Gestiona el
  Cerebro Maestro del despacho, crea notebooks jurídicos temáticos, analiza fuentes
  y guarda memoria de sesiones. Activar cuando el usuario pida: instalar notebooklm,
  conectar notebooklm, memoria persistente, cerebro maestro, guardar sesión, wrap-up
  de sesión, analizar videos en notebooklm, crear notebook, añadir fuentes a
  notebooklm, renovar conexión notebooklm, investigación jurídica con notebooklm,
  que claude recuerde, que no olvide, guardar contexto, notebook para el caso,
  analizar jurisprudencia en notebooklm. También activar ante: fin de sesión +
  guardar, resumen de trabajo hoy, guardar lo que hicimos, investigación audiovisual
  jurídica, analizar contenido de YouTube con IA. SIEMPRE activar cuando se pida
  memoria persistente entre sesiones o análisis de fuentes múltiples con IA gratuita.
license: MIT
compatibility: "Claude Code, Cowork"
metadata:
  author: "Bufete Cortés Cartagena — LEXA-LAB v1.0"
  locale: es-CO
  base-original: "Guía NotebookLM + Claude Code por @AlvaroMoralesIA"
  upgraded: "Junio 2026 — LEXA-LAB standard — Adaptación jurídica Colombia"
  mcp-package: "notebooklm-mcp-cli (jacob-bd/notebooklm-mcp-cli)"
---

# NOTEBOOKLM LEXA — MEMORIA PERSISTENTE DEL DESPACHO v1.0
## Bufete Cortés Cartagena

**Abogado titular:** Jorge Ángel Cortés Cartagena — T.P. 365.594
**Jurisdicción exclusiva:** República de Colombia
**Versión:** 1.0 — Junio 2026

---

## NATURALEZA DE LA SKILL

Esta skill gestiona la integración entre Claude Code y NotebookLM de Google para
resolver el problema central de la IA conversacional: **cada sesión empieza desde cero**.

NotebookLM actúa como la memoria externa del despacho: guarda contexto, acumula
conocimiento jurídico, analiza fuentes (videos, PDFs, textos) y responde consultas
sin consumir tokens del modelo principal.

**El resultado práctico:** Claude Code consulta NotebookLM antes de responder sobre
el bufete, los casos activos o la estrategia, y guarda cada sesión de trabajo para
que la próxima comience informada.

**Costo:** Gratis. NotebookLM es una herramienta gratuita de Google.

---

## ARQUITECTURA DEL SISTEMA

```
CLAUDE CODE (LEXA-LAB)
        │
        ▼ MCP (notebooklm-mcp-cli)
   NOTEBOOKLM
        │
        ├── 📓 Cerebro Maestro LEXA-LAB  ← Memoria del despacho
        ├── 📓 [Caso X] — 2026           ← Memoria por caso
        ├── 📓 Jurisprudencia Laboral     ← Base de conocimiento
        ├── 📓 Investigación [Tema]       ← Notebooks de investigación
        └── 📓 Sesiones [Mes]            ← Registro de trabajo
```

---

## VINCULACIÓN CON EL ECOSISTEMA LEXA-LAB

| Skill | Relación |
|---|---|
| `youtube-search` | Aporta URLs de videos para cargar como fuentes en NotebookLM |
| `ecosistema-juridico-col` | Los escritos generados pueden guardarse en NotebookLM |
| `jurisprudencia-col` | Las sentencias encontradas se almacenan para análisis futuro |
| `analista-sentencias-col` | Los análisis de providencias se guardan en notebooks de caso |
| `marketing-digital-col` | Investigación de contenido externo para estrategia |
| `anti-hallucination-v2` | Capa transversal: verificar fuentes antes de guardar |

---

## MÓDULO 1 — INSTALACIÓN Y CONFIGURACIÓN MCP

Ejecutar una sola vez al configurar el entorno.

### Prompt de instalación (copiar y pegar en Claude Code)

```
Necesito que instales y configures el servidor MCP de NotebookLM para que
puedas usarlo desde aquí. Usa el paquete notebooklm-mcp-cli del repositorio
de jacob-bd en GitHub.

Encárgate tú de todo el proceso: instalar el paquete, configurar el servidor
MCP en mis archivos de configuración y preparar el skill experto para que
sepas cómo usar NotebookLM.

Cuando llegues al paso de autenticación con Google, abre el navegador y dime
exactamente qué tengo que hacer para iniciar sesión. Guíame paso a paso en
ese momento.

Al terminar, verifica que la conexión funciona listando mis notebooks de
NotebookLM y dime cuántos tienes y sus nombres.
```

### Qué sucede durante la instalación

1. Claude Code descarga e instala `notebooklm-mcp-cli` desde GitHub
2. Configura el servidor MCP en los archivos de Claude Code
3. Solicita autenticación con cuenta Google (abrir navegador, entrar con cuenta de Google)
4. Verifica la conexión listando los notebooks existentes
5. Confirma que está listo para usar

**Tiempo estimado:** 2–4 minutos. No cerrar la ventana durante el proceso.
**Señal de éxito:** Claude Code lista el nombre de los notebooks de NotebookLM.

---

## MÓDULO 2 — CEREBRO MAESTRO LEXA-LAB

El Cerebro Maestro es el notebook permanente del despacho. Se crea una sola vez
y crece con el tiempo. Contiene el contexto esencial del bufete, la estrategia,
los proyectos activos y las preferencias de trabajo.

### Prompt de creación del Cerebro Maestro

```
Usando NotebookLM, comprueba si ya existe un notebook llamado "Cerebro LEXA-LAB".
Si no existe, créalo.

Después añade como fuente de texto este contexto sobre el despacho:

IDENTIDAD DEL DESPACHO:
- Nombre: Bufete Cortés Cartagena
- Abogado titular: Jorge Ángel Cortés Cartagena — T.P. 365.594
- Ciudad: Medellín, Colombia
- Especialidades: Derecho laboral, constitucional, civil, penal, disciplinario,
  comercial, administrativo y familia

ECOSISTEMA TECNOLÓGICO:
- Sistema de IA: LEXA-LAB — ecosistema de skills jurídicos instalado en Claude Code
- Herramientas: Claude Projects, Google Drive, NotebookLM, LexisNexis Colombia,
  SUIN-Juriscol, Rama Judicial
- Control de calidad: Flujo JAC → validación → aprobación Jorge antes de radicar

PROYECTOS ACTIVOS:
- LEXA-LAB: plataforma de IA jurídica para el despacho y escalable como producto
- Posicionamiento LinkedIn: marca personal como abogado experto en IA jurídica
- Herramientas client-facing: generación de leads y revenue

REGLAS DE TRABAJO:
- Anti-alucinación absoluta: cero fuentes inventadas en documentos para radicar
- Validación JAC obligatoria antes de cualquier documento judicial
- Estándar argumentativo: Corte Constitucional y Sala de Casación Laboral CSJ
- Fuentes verificadas: SUIN-Juriscol, LexisNexis Colombia, Relatorías oficiales

Cuando termines, dime que el notebook está creado y confírmame su nombre exacto.
```

### Instrucción de activación (añadir al inicio de sesiones importantes)

```
Antes de responder sobre el despacho, los casos activos o la estrategia LEXA-LAB,
consulta siempre el notebook "Cerebro LEXA-LAB" en NotebookLM.
```

---

## MÓDULO 3 — INVESTIGACIÓN JURÍDICA AUDIOVISUAL

Pipeline completo para investigar un tema jurídico usando YouTube + NotebookLM.

### Prompt de investigación jurídica

```
Quiero que hagas lo siguiente en orden y me confirmes cada paso antes de continuar:

PASO 1 → Busca en YouTube los 10 mejores videos sobre "[TEMA JURÍDICO COLOMBIANO]"
publicados en los últimos 12 meses. Muéstrame el listado con título, canal y enlace.
Prioriza canales de Altas Cortes, universidades colombianas, abogados litigantes
y centros de investigación jurídica.

PASO 2 → Crea un notebook nuevo en NotebookLM llamado "Investigación - [TEMA] - [AÑO]"
y añade esos videos como fuentes. Avísame cuando estén todos cargados.

PASO 3 → Pídele a NotebookLM que analice esos videos y te diga:
- Las 5 reglas o subreglas jurídicas más mencionadas sobre el tema
- Qué sentencias o normas se citan con mayor frecuencia
- Qué posiciones doctrinales existen y si hay contradicción entre líneas
- Qué aspectos prácticos del tema no se explican bien en ningún video

PASO 4 → Con ese análisis, prepara un resumen ejecutivo para uso en litigio:
- Problema jurídico central
- Estado actual de la línea jurisprudencial
- Puntos controvertidos
- Advertencias para escritos: qué no citar, qué debe verificarse en fuente oficial
```

**Sustitución de variables:**
- `[TEMA JURÍDICO COLOMBIANO]` → ej: "estabilidad laboral reforzada", "contrato realidad", "acoso laboral"
- `[AÑO]` → ej: "2026"

### Casos de uso frecuentes

```bash
# Jurisprudencia laboral reciente
"tutela por acoso laboral Colombia Corte Constitucional"

# Reformas normativas
"reforma laboral Colombia 2025 impacto empresas"

# Doctrina académica
"contrato realidad Colombia Universidad"

# Precedentes de casación
"Sala Casación Laboral CSJ Colombia 2024 2025"
```

---

## MÓDULO 4 — WRAP-UP DE SESIÓN (MEMORIA AL FINALIZAR)

Al terminar cualquier sesión importante de trabajo, usar este prompt para guardar
la memoria en NotebookLM. La próxima sesión comenzará informada sin que el usuario
tenga que re-explicar nada.

### Prompt de wrap-up estándar

```
Haz un resumen de todo lo que hemos trabajado en esta sesión. Incluye:
- Qué hemos hecho (skills usados, documentos generados, análisis realizados)
- Decisiones importantes que hemos tomado
- Tareas que quedan pendientes con su prioridad
- Casos activos mencionados y su estado actual
- Skills o herramientas que se configuraron o mejoraron
- Cualquier cosa que deba recordar la próxima sesión

Guarda ese resumen como nueva fuente de texto en el notebook "Cerebro LEXA-LAB"
de NotebookLM. El título del documento debe ser la fecha de hoy más el tema
principal (ej: "2026-06-24 — Instalación NotebookLM y mejora skills").

Cuando lo hayas guardado, dime el nombre exacto del documento guardado.
```

### Prompt de wrap-up por caso específico

```
Haz un resumen del trabajo realizado hoy sobre el caso [NOMBRE O REFERENCIA DEL CASO].
Incluye: hechos clave, estrategia definida, documentos generados, próximos pasos
procesales y fechas críticas.

Guarda ese resumen en el notebook "[NOMBRE DEL CASO]" de NotebookLM.
Si ese notebook no existe, créalo primero. Título del documento: "[Fecha] — Avance".
```

---

## MÓDULO 5 — RENOVACIÓN DE CONEXIÓN

NotebookLM MCP expira periódicamente (cada 2–4 semanas). Cuando Claude Code indique
que la sesión expiró o que no puede acceder a los notebooks, usar:

### Prompt de renovación

```
Renueva la conexión con NotebookLM. Abre el navegador para que entre con
mi cuenta de Google y reconecta el servidor MCP. Cuando esté listo,
lista mis notebooks para confirmar que funciona.
```

**Señal de que se necesita renovación:**
- Claude Code dice que no puede acceder a los notebooks
- Error de autenticación al intentar listar o crear notebooks
- Han pasado más de 4 semanas desde la última renovación

---

## MÓDULO 6 — NOTEBOOKS RECOMENDADOS PARA EL DESPACHO

Estructura de notebooks sugerida para el Bufete Cortés Cartagena:

| Notebook | Contenido | Frecuencia de actualización |
|---|---|---|
| `Cerebro LEXA-LAB` | Contexto del despacho, estrategia, preferencias | Cada sesión importante |
| `Jurisprudencia Laboral` | Sentencias clave CSJ Sala Laboral + Corte CC | Mensual |
| `Jurisprudencia Constitucional` | Tutelas y providencias CC relevantes | Mensual |
| `LEXA-LAB Desarrollo` | Progreso del sistema, skills instalados, mejoras | Cada sesión técnica |
| `Casos Activos — [Año]` | Resúmenes de avance por caso | Por sesión de caso |
| `Marketing y LinkedIn` | Estrategia de contenido, análisis de audiencia | Quincenal |
| `Investigación [Tema]` | Notebooks temporales por proyecto de investigación | Por investigación |

---

## PROTOCOLO ANTI-ALUCINACIÓN

- NO afirmar que un video o fuente "dice X" si NotebookLM no lo ha analizado.
- NO guardar en el Cerebro Maestro información no verificada.
- NO presentar como vigente una norma o sentencia guardada en NotebookLM sin
  verificar su fecha: `[Reformación pendiente — verificar vigencia actual]`
- Si NotebookLM no puede acceder a una fuente (video privado, URL rota), indicarlo
  expresamente: `[Fuente no accesible — requiere verificación manual]`
- El Cerebro Maestro es memoria operativa, NO es fuente jurídica certificada.
  Todo contenido relevante para escritos judiciales debe pasar por validación JAC.

---

## SECCIÓN OBLIGATORIA DE ADVERTENCIAS

```
ADVERTENCIAS DE USO — NOTEBOOKLM LEXA

1. NotebookLM no reemplaza las fuentes jurídicas oficiales (SUIN-Juriscol, relatorías).
2. Los resúmenes guardados en NotebookLM son memoria operativa, no documentos certificados.
3. Antes de citar en un escrito cualquier información extraída de NotebookLM,
   verificar en fuente oficial y aplicar el protocolo de anti-hallucination-v2.
4. La conexión MCP expira cada 2-4 semanas. Si hay error, usar MÓDULO 5.
5. El Cerebro Maestro crece con el tiempo. Revisar y depurar cada 3 meses.
```

---

## DECLARACIÓN DE SALIDA

Al activarse, declarar en una línea: módulo ejecutado, resultado, y si corresponde,
nombre del notebook creado/actualizado y número de fuentes cargadas.

---

*Bufete Cortés Cartagena — Jorge Ángel Cortés Cartagena T.P. 365.594 — LEXA-LAB v1.0 — Medellín, Colombia — 2026*
