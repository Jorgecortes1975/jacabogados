---
name: repro-de-bug
description: Aísla un bug reportado en una herramienta interna del despacho (el script de sincronización del CRM de prospectos, el validador de skills, un endpoint del futuro portal de clientes, una automatización de documentos) en un repro mínimo y verificable, sin adivinar la causa. Úsala cuando el usuario reporte que algo "no funciona" o "falla a veces" en una herramienta interna y necesites aislar el problema antes de tocar código, o cuando pida convertir un bug reportado en pasos de reproducción exactos.
---

# Repro de bug — herramientas internas de JA Abogados

Las herramientas internas del despacho (script de sincronización del CRM de
prospectos, `scripts/validate_skill.py`, `scripts/package_skills_for_upload.sh`,
y cualquier automatización de documentos o portal de clientes que se llegue a
construir) casi nunca tienen un equipo de QA detrás. Cuando algo falla, el
reporte suele llegar como "el script duplicó el prospecto" o "la skill no
pasó la validación y no sé por qué" — sin stack trace, sin pasos, sin
versión. Esta skill convierte ese reporte vago en un repro mínimo que
cualquiera (incluyendo un desarrollador externo contratado, que no conoce el
contexto del despacho) puede reproducir y depurar sin adivinar.

## Regla de seguridad obligatoria (anti-alucinación)

1. **Nunca afirmes que identificaste la causa raíz sin haberla verificado
   ejecutando el código.** Toda causa propuesta que no se haya confirmado
   corriendo el repro real debe marcarse explícitamente como
   **"hipótesis, no verificada — confirmar ejecutando el repro"**, nunca
   como un hecho.
2. **Nunca inventes nombres de funciones, columnas, campos o mensajes de
   error que no aparezcan en el código o el log real que te dieron.** Si no
   tienes el código fuente de la parte que falla, dilo explícitamente
   ("no tengo acceso a `sync_prospectos.py`, esta hipótesis asume su
   estructura habitual y debe confirmarse contra el archivo real") en vez de
   describir funciones que no has visto.
3. **Si el bug involucra datos de clientes** (un registro del CRM de
   prospectos, un campo del portal de clientes, cualquier dato personal),
   el repro debe usar datos ficticios o anonimizados — nunca el nombre, NIT,
   correo o teléfono real de un prospecto o cliente, ni siquiera como
   "ejemplo rápido". Esto es exigencia de la Ley 1581 de 2012, no una
   preferencia de estilo.
4. Cuando falte un hecho necesario para reproducir (versión de una
   librería, sistema operativo, volumen de datos, hora exacta del fallo),
   márcalo como **"desconocido — pídele este dato al usuario"**, nunca lo
   asumas.

## Cuándo usar esta skill

Cuando el usuario reporte una falla en cualquier herramienta interna del
despacho — el script del CRM, el validador de skills, el empaquetador de
zips, o un endpoint del portal de clientes si ya existe — y necesite un
repro mínimo antes de poder arreglarlo o antes de pedirle ayuda a un
desarrollador externo.

## Proceso operativo

**1. Esperado vs. real.**
Escribe en una línea qué se esperaba que pasara y en otra qué pasó de
verdad. Si el usuario no fue específico en alguno de los dos, pregúntale
antes de continuar — "no funciona" no es ni esperado ni real verificables.

**2. Cinco hechos mínimos del entorno.**
Pide (o extrae si ya están en la conversación) al menos cinco de estos:
versión de Python/Node/librería relevante, sistema operativo, hora y fecha
exacta del fallo, volumen de datos involucrado (¿1 prospecto o 200?),
frecuencia (¿siempre, a veces, solo la primera vez?), y si hubo un cambio
reciente al código o a los datos justo antes de que empezara a fallar. Si
falta alguno, márcalo "desconocido — preguntar al usuario", no lo rellenes
con una suposición razonable.

**3. Reducir el fallo al código más chico que aún falla.**
Quita todo lo que no sea indispensable para que el bug ocurra: manejo de
errores no relacionado, llamadas a APIs externas que no participan en el
fallo, lógica de otras rutas del programa. El resultado debe ser un
fragmento de menos de 30 líneas que un desarrollador pueda pegar y correr
sin configurar el entorno completo del despacho. Si no puedes reducirlo a
menos de 30 líneas sin perder el bug, dilo explícitamente en vez de forzar
el límite con un fragmento que ya no reproduce el problema.

**4. Pasos exactos de reproducción, numerados.**
Cada paso debe ser una acción literal y ejecutable (comando exacto, input
exacto, clic exacto si es una interfaz), no una descripción vaga como
"correr el script normalmente". Incluye el resultado observado después del
último paso.

**5. Tres causas raíz probables, ranqueadas.**
Ordénalas de más a menos probable, cada una con la evidencia concreta que la
sostiene (una línea de código, un patrón en los datos, un comportamiento
conocido de la librería) y marcada como hipótesis no verificada si no la
confirmaste ejecutando el código. Nunca presentes la primera de la lista
como si ya fuera un hecho comprobado.

## Reglas de formato

- Nunca adivines: todo lo no confirmado se marca explícito como
  "desconocido" o "hipótesis, no verificada".
- El repro mínimo va en un bloque de código aparte, bajo 30 líneas.
- Los pasos de reproducción se numeran y cada uno es una acción, no una
  explicación.

## Mini-ejemplo completo

**Reporte del usuario**: "El script que sincroniza la hoja de prospectos con
los recordatorios de WhatsApp a veces mete al mismo prospecto dos veces en
la hoja de Google Sheets."

**1. Esperado vs. real.**
Esperado: cada prospecto nuevo detectado en el formulario de intake se
agrega una sola vez a la hoja `Prospectos`. Real: algunos prospectos
aparecen dos veces, con la misma Empresa y Decisor pero Fecha de contacto
distinta.

**2. Cinco hechos del entorno.**
- Script en Python 3.11, usa `gspread` (versión exacta: desconocido —
  preguntar al usuario, pedir `pip show gspread`).
- Corre como cron job diario a las 7:00 a.m.
- Ocurre con volumen bajo (2-3 duplicados de ~40 prospectos/mes), no con
  todos.
- Empezó a notarse hace "unas semanas" (fecha exacta: desconocido —
  preguntar al usuario).
- No hay cambio de código reciente confirmado; el usuario no está seguro
  (desconocido — preguntar si hubo despliegue reciente).

**3. Repro mínimo (< 30 líneas, datos ficticios).**
```python
# Repro mínimo — usa datos ficticios, nunca un prospecto real (Ley 1581/2012)
existentes = [
    {"empresa": "Acme Textiles S.A.S.", "nit": "900123456"},
]

def ya_existe(nuevo, lista):
    # Bug sospechoso: compara solo por 'empresa' en minúsculas exactas,
    # sin normalizar tildes ni espacios extra.
    return any(p["empresa"].lower() == nuevo["empresa"].lower()
               for p in lista)

nuevo_prospecto = {"empresa": "Acme Textiles S.A.S. ", "nit": "900123456"}
print(ya_existe(nuevo_prospecto, existentes))  # Esperado: True. Real: False
# por el espacio final en "S.A.S. " que rompe la comparación exacta.
```

**4. Pasos exactos de reproducción.**
1. Cargar la lista `existentes` con un prospecto de prueba (dato ficticio).
2. Llamar a `ya_existe()` con el mismo NIT pero un espacio extra al final
   del campo `empresa` (como lo produce el formulario de intake cuando el
   decisor pega el nombre desde otro documento).
3. Observar que la función devuelve `False` en vez de `True`, permitiendo
   que el script agregue el duplicado a la hoja.

**5. Tres causas raíz probables, ranqueadas.**
1. **(Más probable, hipótesis no verificada)**: `ya_existe()` compara
   cadenas exactas en minúsculas sin `strip()`, así que un espacio extra al
   inicio o final del campo `empresa` capturado desde el formulario rompe la
   deduplicación. Confirmar revisando el código real de la función.
2. **(Hipótesis no verificada)**: la deduplicación compara por nombre de
   empresa en vez de por NIT, que es el campo que realmente identifica de
   forma única a un prospecto — dos formas de escribir el mismo nombre
   producen falsos negativos. Confirmar si el NIT está disponible en todos
   los registros de origen.
3. **(Menos probable, hipótesis no verificada)**: condición de carrera si el
   cron corre dos veces el mismo día (por ejemplo, tras un reinicio del
   servidor) y ambas ejecuciones leen la hoja antes de que la primera
   termine de escribir. Confirmar revisando los logs de ejecución del cron
   en las fechas donde aparecieron duplicados.

## Cierre — límite de esta skill

Esta skill aísla el bug y ordena las hipótesis; no corrige el código ni
confirma cuál causa es la real. Cualquier causa listada aquí sigue siendo
una hipótesis hasta que alguien la verifique ejecutando el repro contra el
código real — nunca se debe pasar a producción una corrección basada en una
causa "probable" sin antes confirmarla. Si el repro necesitó datos de
clientes reales para reproducirse, esos datos deben anonimizarse antes de
compartir el repro con cualquier tercero, incluido un desarrollador externo.
