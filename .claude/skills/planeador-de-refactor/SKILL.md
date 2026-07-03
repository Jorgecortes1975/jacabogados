---
name: planeador-de-refactor
description: Planea refactors de herramientas internas del despacho (el script que sincroniza el CRM de prospectos, el validador de skills, un futuro portal de clientes) en una secuencia de commits pequeños, shippables e independientes, nunca en un cambio "big-bang". Úsala cuando el usuario pida planear un refactor de un script interno, dividir un cambio grande en partes seguras de desplegar, o reorganizar código que ya funciona pero se volvió difícil de mantener.
---

# Planeador de refactor — herramientas internas de JA Abogados

Las herramientas internas del despacho suelen empezar como un script de un
solo archivo que alguien escribió rápido para resolver un problema puntual
(sincronizar la hoja de prospectos, validar una skill antes de subirla) y
que, con el tiempo, crece hasta volverse difícil de tocar sin miedo a
romper algo que ya está en producción — por ejemplo, un cron que le manda
recordatorios de WhatsApp a decisores reales. Esta skill planea cómo
reorganizar ese código sin apagar la herramienta ni arriesgar los datos de
un cliente en el proceso.

## Regla de seguridad obligatoria (anti-alucinación)

1. **Nunca afirmes que un commit del plan "no rompe nada" sin haberlo
   verificado ejecutando los tests o el código real.** Cada commit del plan
   debe decir qué se verificó y cómo, o marcarse explícitamente como
   **"riesgo no verificado — correr el test/la ruta real antes de
   mergear"**.
2. **Nunca inventes nombres de funciones, módulos o tablas que no existan
   en el código real que te compartieron.** Si el usuario solo describe el
   script en palabras y no comparte el código, dilo explícitamente antes de
   proponer un call graph — un call graph inventado sobre una descripción
   vaga es más peligroso que no tener call graph.
3. **Si el script toca datos de clientes o prospectos** (el CRM, un
   endpoint del portal de clientes, cualquier automatización de documentos
   con datos personales), cada commit que toque esa ruta de datos debe
   señalar explícitamente el riesgo de exposición o pérdida de datos bajo
   la Ley 1581 de 2012, y recomendar probar primero contra datos ficticios
   o un entorno de prueba, nunca contra la base real de clientes.

## Cuándo usar esta skill

Cuando haya un script o módulo interno del despacho que funciona pero se
volvió difícil de mantener (un archivo monolítico, lógica repetida, mezcla
de responsabilidades) y el usuario quiera un plan para reorganizarlo sin
apagarlo ni arriesgar los datos que maneja.

## Proceso operativo

**1. Pedir el código, el objetivo del refactor y la tolerancia al riesgo.**
No planees sobre una descripción de memoria. Pide el archivo o los archivos
reales, qué se quiere lograr (separar responsabilidades, facilitar agregar
un canal nuevo, reducir duplicación) y cuánto riesgo tolera el despacho
(¿puede estar caído un cron nocturno una noche mientras se prueba, o corre
algo crítico en horario de oficina que no puede fallar?).

**2. Construir el call graph real.**
Lista qué función llama a qué otra, qué I/O externo toca cada una (hoja de
cálculo, API de WhatsApp, sistema de archivos, base de datos), y qué parte
del código no tiene test alguno hoy. Si no puedes construir el call graph
completo con el código que te dieron, dilo explícitamente en vez de
rellenar los huecos con suposiciones.

**3. Dividir el refactor en 5 a 8 commits shippables e independientes.**
Cada commit debe poder mergearse y desplegarse solo, sin depender de que el
siguiente commit exista todavía, y sin cambiar el comportamiento observable
del sistema salvo que ese sea explícitamente el objetivo de ese commit
puntual. Evita el patrón "primero muevo todo, después lo pruebo" — cada
commit prueba lo que movió antes del siguiente.

**4. Para cada commit, especificar tres cosas:**
- **Cambios**: qué archivos y qué funciones se tocan, en una frase.
- **Tests**: qué se debe correr o verificar para confirmar que ese commit
  no rompió nada — y si no existe un test para esa ruta todavía, decirlo y
  proponer el mínimo necesario antes de continuar.
- **Rollback**: cómo revertir ese commit específico si algo sale mal en
  producción, sin tener que revertir los commits posteriores si ya se
  mergearon.

**5. Señalar el commit más riesgoso del plan.**
Casi siempre es el que cambia el "contrato" entre dos partes del sistema
(el formato de los datos que una función le pasa a otra, el nombre de una
columna, el orden de las llamadas a una API externa). Márcalo explícito y
explica por qué, y qué verificación adicional necesita antes de mergearse.

**6. Proponer un feature flag si aplica.**
Si el cambio más riesgoso puede convivir con el comportamiento anterior
detrás de una bandera (variable de entorno, columna de configuración), en
vez de un corte definitivo, decláralo. Si el tamaño del sistema no lo
justifica (un script de 200 líneas que corre un cron diario, sin usuarios
concurrentes), dilo explícitamente en vez de forzar un feature flag donde
no aporta nada.

## Reglas de formato

- 5 a 8 commits, nunca menos (sería big-bang) ni una lista interminable
  imposible de seguir.
- Cada commit con sus tres campos (cambios/tests/rollback) completos.
- El commit más riesgoso identificado explícitamente, no implícito en el
  orden de la lista.

## Mini-ejemplo completo

**Contexto**: un script `sync_prospectos.py` de 400 líneas que en un solo
archivo lee la hoja de Google Sheets del CRM de prospectos (sección 7 del
plan de marketing), calcula el puntaje semáforo, y manda un recordatorio de
WhatsApp al decisor cuando el estado lleva más de 7 días sin cambio. Todo
mezclado: lectura de la hoja, cálculo del puntaje, y envío de WhatsApp en la
misma función `correr()`.

**Call graph actual**: `correr()` → lee la hoja completa con `gspread` →
por cada fila, calcula el puntaje inline → si el puntaje bajó de "verde" o
pasaron más de 7 días, llama directo a la API de WhatsApp Business. No hay
tests. El riesgo real: si `correr()` falla a la mitad, no se sabe qué
prospectos ya recibieron el WhatsApp y cuáles no, y el CRM tiene datos de
decisores reales.

**Plan (6 commits):**

1. **Extraer `leer_prospectos()` como función pura, sin tocar `correr()`.**
   - Cambios: mover la lectura de `gspread` a su propia función que
     devuelve una lista de dicts; `correr()` la llama igual que antes.
   - Tests: no ejecutado — agregar un test que mockee `gspread` y confirme
     que `leer_prospectos()` devuelve la estructura esperada contra una
     hoja de prueba con datos ficticios.
   - Rollback: revertir el commit, `correr()` vuelve a leer inline.

2. **Extraer `calcular_puntaje(fila)` como función pura.**
   - Cambios: la lógica de puntaje sale de `correr()` a su propia función
     que recibe una fila y devuelve el puntaje semáforo.
   - Tests: no ejecutado — agregar los 3 casos boundary del puntaje (0,
     20, 40) con `generador-de-tests` antes de mergear.
   - Rollback: revertir el commit, lógica vuelve a estar inline.

3. **Extraer `debe_enviar_whatsapp(fila, hoy)` como función pura.**
   - Cambios: separa la decisión ("¿han pasado más de 7 días o bajó de
     verde?") del acto de enviar el mensaje.
   - Tests: no ejecutado — verificar el boundary exacto de "7 días" con
     fechas ficticias, no con datos reales del CRM.
   - Rollback: revertir el commit.

4. **Extraer `enviar_whatsapp(decisor, mensaje)` detrás de una interfaz.**
   - Cambios: aísla la llamada a la API de WhatsApp en su propia función,
     para poder mockearla en tests sin mandar mensajes reales a un decisor.
   - Tests: no ejecutado — confirmar con un mock que `enviar_whatsapp()` se
     llama con los argumentos correctos, sin pegarle a la API real durante
     la prueba.
   - Rollback: revertir el commit.
   - **Riesgo bajo Ley 1581/2012**: cualquier prueba de esta función debe
     correr contra un número de WhatsApp de prueba propio del despacho,
     nunca contra el teléfono real de un decisor.

5. **Commit más riesgoso — reescribir `correr()` para orquestar las 4
   funciones extraídas en vez de la lógica original inline.**
   - Cambios: `correr()` pasa de 400 líneas monolíticas a orquestar
     `leer_prospectos()` → `calcular_puntaje()` → `debe_enviar_whatsapp()`
     → `enviar_whatsapp()`, fila por fila.
   - Tests: no ejecutado — correr el flujo completo contra una copia de
     prueba de la hoja con prospectos ficticios (nunca la hoja real) y
     comparar el resultado contra el comportamiento documentado del script
     original antes del refactor.
   - Rollback: mantener la versión anterior de `sync_prospectos.py` en la
     rama por al menos un ciclo de cron completo antes de borrarla, para
     poder revertir con un solo `git revert` si algo falla en producción.
   - **Por qué es el más riesgoso**: es el único commit que cambia el
     "contrato" completo entre las cuatro piezas — un error de orden o de
     tipo de dato aquí puede mandar WhatsApp duplicados a decisores reales
     o dejar de mandarlos sin que nadie lo note hasta días después.

6. **Agregar logging de qué prospectos recibieron WhatsApp en cada corrida.**
   - Cambios: cada llamada exitosa a `enviar_whatsapp()` deja un registro
     (fecha, fila, resultado) para poder auditar si el commit 5 falló a la
     mitad de una corrida.
   - Tests: no ejecutado — confirmar que el log se escribe incluso si una
     fila individual falla, sin detener el resto de la corrida.
   - Rollback: revertir el commit, se pierde el registro pero no afecta el
     envío en sí.

**Feature flag**: no aplica en este caso — es un cron de un solo despacho,
sin usuarios concurrentes ni necesidad de correr dos versiones a la vez. Se
prefiere probar el commit 5 primero en un entorno de prueba con datos
ficticios antes de dejarlo correr una noche completa contra el CRM real.

## Cierre — límite de esta skill

Esta skill entrega el plan de commits, no los ejecuta ni corre los tests
por su cuenta. Cada marca de "no ejecutado" en este plan es una tarea
pendiente para quien lo implemente, no una garantía de que el commit
funciona. Si el refactor toca datos de prospectos o clientes reales, ningún
commit de este plan debe probarse contra esos datos reales antes de
confirmarse en un entorno de prueba — la Ley 1581 de 2012 aplica igual
durante el desarrollo que en producción.
