# Lista de Verificación de Calidad de la Especificación: Lector Web de Fuentes Oficiales

**Propósito**: Validar la completitud y calidad de la especificación antes de planear
**Creado**: 2026-10-10
**Funcionalidad**: [spec.md](../spec.md)

## Calidad del Contenido

- [x] Sin detalles de implementación (lenguajes, frameworks, APIs)
- [x] Enfocada en el valor para el usuario y la necesidad del despacho
- [x] Redactada para interesados no técnicos
- [x] Todas las secciones obligatorias completas

## Completitud de Requisitos

- [x] No quedan marcadores [NEEDS CLARIFICATION]
- [x] Los requisitos son comprobables y no ambiguos
- [x] Los criterios de éxito son medibles
- [x] Los criterios de éxito no dependen de tecnología
- [x] Todos los escenarios de aceptación están definidos
- [x] Los casos límite están identificados
- [x] El alcance está claramente delimitado
- [x] Dependencias y suposiciones identificadas

## Preparación de la Funcionalidad

- [x] Todos los requisitos funcionales tienen criterios de aceptación claros
- [x] Los escenarios de usuario cubren los flujos principales
- [x] La funcionalidad cumple los resultados medibles definidos
- [x] No se filtran detalles de implementación en la especificación

## Notas

- Los dominios concretos de la lista inicial NO están verificados; la especificación los declara candidatos y exige su verificación contra fuente oficial antes de activarlos (Suposiciones).
- La restricción de lenguaje del ecosistema aparece solo como suposición; el detalle técnico se resuelve en `/speckit-plan`.
- Alcance v1 excluye PDF; es la decisión por defecto más relevante para revisar con el usuario.

## Resultado de la implementación (2026-10-10)

Escenarios de `quickstart.md` ejecutados en la sesión de implementación:

- Escenario A (pruebas sin internet): `node --test tests/lector-web/*.test.js` → 262 pruebas, todas aprobadas, en unos 4 segundos.
- Escenario B (`fuentes-web`): lista los 9 dominios candidatos, todos "pendiente de verificación", Total: 9 | Activos: 0.
- Escenario C (`leer` de dominio no autorizado): `FUENTE_NO_AUTORIZADA`, mensaje en español, código de salida 1, sin conexión de red.
- Escenario F (bitácora): un registro por ejecución, sin el contenido, carpeta 0700 y archivo 0600.
- Escenario E (PDF): cubierto por pruebas automáticas (tipo declarado y firma `%PDF-`); no se ejecutó contra un sitio real.
- Escenario D (lectura real de un dominio activado): NO ejecutado. Ningún dominio está activo porque no se ha verificado ninguno (tareas de gobierno G001 a G003). Tampoco se midió CE-004 (menos de 15 s en el 95 % de las lecturas), que exige lecturas reales.
- CE-006 (comprensión del resultado por abogados sin formación técnica): validación posterior al uso, pendiente.

Hallazgo de la revisión adversarial (T041): el extractor inicial, basado en expresiones regulares perezosas, tardaba más de 25 s con 5 MiB de HTML roto u hostil y bloqueaba el proceso. Se reemplazó por un recorrido lineal (10 a 184 ms en los mismos casos) con pruebas de regresión.

Tercera pasada de `/speckit-analyze` sobre el código terminado (T043): sin hallazgos críticos ni altos nuevos. Corregidos J1 a J4 (contrato de `requestFn`, cabecera `Accept` en D-07, árbol de pruebas del plan y 6 pruebas de rutas atípicas: deflate, br, codificación desconocida, gzip corrupto, redirección protocolo-relativa, 3xx sin Location y cabeceras de más de 16 KB). Pendientes por decisión o entorno: J5 (política de retención de la bitácora), J6 (probar en Node 20; solo se ejecutó en Node 22.22.0) y J7 (comando `consulta`, G005).
