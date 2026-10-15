# Research: Validación de Escritos Legales Completos

**Feature**: `001-validar-escritos-legales` · **Fecha**: 2026-08-20

Este documento resuelve las incógnitas técnicas de `plan.md` antes de diseñar el modelo de datos y
los contratos.

## 1. ¿Sobre qué base de código se integra `validar-escrito`?

**Decisión**: Se integra como un caso nuevo en el `switch (args.command)` de
`agente-juridico-especializado.js`, delegando la lógica a un módulo nuevo
`lib/validar-escrito.js`, en vez de mezclar la lógica de extracción/verificación dentro del
archivo principal (349 líneas hoy).

**Rationale**: El repo ya sigue un patrón de un único archivo CLI con un switch de comandos; añadir
un módulo pequeño y requerirlo desde ahí respeta ese patrón sin hacer crecer indefinidamente
`agente-juridico-especializado.js`. Coincide con la Regla V de la constitución (simplicidad sobre
extensión del ecosistema): no se crea un agente ni un transporte nuevo, solo una capacidad dentro
del agente jurídico ya existente.

**Alternativas consideradas**:
- Agregar toda la lógica directamente en `agente-juridico-especializado.js` — rechazada, mezclaría
  parsing de texto largo con el dispatcher de comandos.
- Crear un agente/proceso separado — rechazada, viola la Regla V (no crear un orquestador nuevo
  para una capacidad que es una extensión natural del agente jurídico existente).

## 2. Hallazgo importante: la verificación contra fuentes oficiales todavía no existe como código

**Hallazgo**: Al revisar `agente-juridico-especializado.js`, el caso `consulta` del switch (líneas
317-326) no ejecuta ninguna llamada HTTP real a las fuentes definidas en `mcp-config.json` — imprime
mensajes de progreso ("Ejecutando búsqueda...", "Validando información...") sin lógica detrás. Esto
aplica a los 5 tipos de consulta existentes, incluido `verificar`, que el spec de esta feature toma
como referencia de comportamiento.

**Decisión**: Este plan asume que la función de verificación contra fuentes oficiales
(`verificarContraFuentesOficiales(dato, fuentesRelevantes)`) es una capacidad **compartida** que
todavía no existe y que `validar-escrito` necesita tanto como `verificar` ya la necesitaba. Se
diseña como una función exportada de `lib/verificacion-fuentes.js`, reutilizable por ambos tipos de
consulta, en vez de construir una versión duplicada solo para `validar-escrito`.

**Rationale**: Construir la verificación dos veces (una implícita en `verificar`, otra en
`validar-escrito`) violaría la Regla V y garantizaría que las dos implementaciones diverjan con el
tiempo. Compartir la función es la lectura más simple de "igual que el tipo de consulta verificar"
del spec.

**Alternativas consideradas**:
- Ignorar el hallazgo y asumir que la verificación ya funciona — rechazada, produciría un plan
  técnicamente falso y, peor, un `validar-escrito` que marca citas como "verificada" sin haberlas
  verificado de verdad (violación directa de la Regla I).
- Duplicar la lógica de verificación solo dentro de `lib/validar-escrito.js` — rechazada por la
  razón de simplicidad ya explicada.

## 3. Extracción de citas normativas y jurisprudenciales de texto libre

**Decisión**: Extracción basada en expresiones regulares por familia de patrón (no un parser
genérico ni una llamada a un modelo de lenguaje adicional):
- Sentencias: `(C|T|SU|A)-\d{1,4}(?:/|\s+de\s+)\d{4}` (Corte Constitucional) y variantes análogas
  para Corte Suprema / Consejo de Estado, ya usadas informalmente en el estilo de redacción del
  despacho.
- Normas: `Ley\s+\d+\s+de\s+\d{4}`, `Decreto\s+\d+\s+de\s+\d{4}`, `artículo\s+\d+\s+(del|de la)\s+...`.

**Rationale**: El spec (Assumptions) ya asume que las citas siguen convenciones reconocibles de
redacción jurídica colombiana. Un conjunto de expresiones regulares cubre esas convenciones sin
agregar dependencias npm nuevas (restricción explícita del usuario) ni introducir una llamada a un
servicio externo de NLP.

**Alternativas consideradas**:
- Usar una librería NLP externa — rechazada, viola la restricción de no agregar dependencias npm.
- Pedirle a un modelo de lenguaje que extraiga las citas — rechazada para la primera versión: añade
  una dependencia de red adicional y un costo variable por escrito; queda como posible extensión
  futura si las expresiones regulares resultan insuficientes en uso real.

## 4. Testing

**Hallazgo**: El repositorio no tiene `package.json` ni carpeta `tests/`; ningún tipo de consulta
existente tiene pruebas automatizadas.

**Decisión**: Para esta primera versión, la validación es manual vía `quickstart.md` (ejecutar la
CLI contra escritos de ejemplo y revisar el reporte). Si en el futuro el despacho decide adoptar
pruebas automatizadas, `node --test` (runner nativo desde Node 18+) es la opción que no requiere
agregar dependencias — se deja documentado aquí, no implementado.

**Rationale**: Introducir un framework de pruebas es una decisión que afecta a todo el repo, no
solo a esta feature; está fuera del alcance de `validar-escrito` y debería decidirse aparte.

## 5. Formato de salida del reporte

**Decisión**: Salida por consola en texto legible (mismo estilo que `fuentes` y `activar`, con
símbolos ✓/✗ y separadores), más un modo `--json` opcional que imprime el mismo contenido como JSON
estructurado, para permitir que el reporte se integre después con otras herramientas (p. ej. un
dashboard ejecutivo) sin tener que re-parsear texto.

**Rationale**: Consistente con el estilo ya usado por el resto de comandos del CLI; el modo JSON es
de bajo costo (mismo dato, dos serializaciones) y evita que una futura integración tenga que
adivinar la estructura del texto.

**Alternativas consideradas**: Solo JSON — rechazada, rompería la consistencia con el resto de la
CLI, que hoy es texto legible por defecto.
