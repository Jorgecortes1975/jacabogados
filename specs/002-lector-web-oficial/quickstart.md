# Guía de Validación Rápida: Lector Web de Fuentes Oficiales

Esta guía describe cómo comprobar que la funcionalidad cumple la especificación. Los detalles de estructuras están en [data-model.md](./data-model.md) y los contratos en [contracts/](./contracts/).

## Requisitos previos

1. Node.js 20 o superior (`node --version`).
2. Estar en la raíz del repositorio.
3. Para el escenario con red real: al menos un dominio verificado y activado en `lectorWeb.dominios` de `mcp-config.json`, con `verificadoEn` y `fuenteVerificacion`.

## Escenario A: pruebas automáticas sin internet

```bash
node --test tests/lector-web/*.test.js
```

Nota: con una carpeta como argumento (`node --test tests/lector-web/`) la ejecución falla en Node 22 (verificado: 1 prueba fallida, 0 aprobadas). Se usa el patrón de archivos. En Linux y macOS el intérprete de comandos expande el patrón; en Windows con Node 21 o superior se escribe entre comillas.

Resultado esperado: todas las pruebas pasan. Cubren:
1. Rechazo de dominios no autorizados y de dominios engañosos, sin abrir conexión (Historia 2, CE-001).
2. Rechazo de destinos no públicos directos, resueltos y por redirección, y de credenciales incrustadas (Historia 3).
3. Límites de tamaño, de descompresión, de tiempo y de redirecciones (Historia 4).
4. Fallos explícitos: desafío anti-robot, PDF y otros formatos, página sin texto, certificado inválido (Historia 5, CE-005).
5. Metadatos completos en cada éxito y vigencia siempre `PENDIENTE_VERIFICACION` (Historia 1, CE-002).
6. Solo conexiones a hosts autorizados (CE-003).
7. Contenido con instrucciones dirigidas a una IA tratado como texto (CE-007).
8. Falla cerrada ante configuración inválida, por ejemplo `activo: true` sin verificación.

## Escenario B: lista de dominios

```bash
node agente-juridico-especializado.js fuentes-web
```

Resultado esperado: tabla con cada dominio, su autoridad y su estado. Antes de la verificación, todos figuran como pendientes de verificación.

## Escenario C: rechazo en línea de comandos

```bash
node agente-juridico-especializado.js leer "https://ejemplo.com/pagina"
echo $?
```

Resultado esperado: mensaje en español `FUENTE_NO_AUTORIZADA`, sin tráfico de red, código de salida 1.

## Escenario D: lectura real de un dominio activado

```bash
node agente-juridico-especializado.js leer "https://<dominio-activo>/<ruta-publica>"
```

Resultado esperado: encabezado de trazabilidad completo, línea "Vigencia: PENDIENTE DE VERIFICACION" y texto extraído. Repetir la lectura: las huellas del contenido y del texto son iguales si la página no cambió. Medir el tiempo de al menos 20 lecturas de páginas oficiales de tamaño habitual y registrar cuántas terminan en menos de 15 segundos (CE-004: 95 % o más).

## Escenario E: PDF excluido

Entregar la dirección de un PDF publicado en un dominio activo.

Resultado esperado: `FORMATO_NO_SOPORTADO` con el mensaje de que los PDF están fuera de la versión 1.

## Escenario F: bitácora

```bash
tail -n 5 logs/lector-web-auditoria.jsonl
```

Resultado esperado: un registro por cada ejecución anterior, sin el texto de las páginas.

## Validación posterior al uso (fuera de la construcción)

CE-006: mostrar un resultado de lectura a abogados del despacho sin formación técnica y comprobar que identifican la autoridad, la fecha de consulta y que la vigencia está pendiente en menos de 1 minuto. Se hace con usuarios reales una vez activado el lector.

## Comprobación de la constitución

1. No se agregó ninguna dependencia ni `package.json`.
2. Solo cambiaron `mcp-config.json`, `agente-juridico-especializado.js`, `CLAUDE.md`, `.gitignore`, `lector-web/` y `tests/lector-web/`.
3. Antes de implementar, ejecutar `/speckit-analyze`, como exige la constitución para funcionalidades que tocan fuentes oficiales.
