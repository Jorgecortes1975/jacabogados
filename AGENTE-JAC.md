# JAC Legal OS: agente jurídico de derecho colombiano

Verificación determinista de citas y normas, control Gauntlet de escritos e inventario documental, más un agente (Claude) que razona sobre esas verificaciones. No requiere instalar nada: solo Python 3.9 o superior.

## Tres formas de usarlo

1. Como comando, sin instalar: `bin/jac consulta "<cita, texto, archivo o carpeta>"` o `python3 -m jac ...` desde la raíz del repositorio. Instalado con `pip install .`, el comando es `jac`.
2. Como plugin de Claude Code: `claude plugin marketplace add jorgecortes1975/jacabogados` y `claude plugin install jac-legal-os@jac-abogados`. Dentro de una sesión, `/jac-legal-os:jac-agente <consulta>`, `/jac-legal-os:jac-gauntlet` (protocolo completo) o `/jac-legal-os:jac-verificar <citas>`.
3. Como plugin de Claude Cowork: `python3 -m jac empaquetar` genera `jac-legal-os.plugin`. Se instala cargando ese archivo en Cowork y aceptando el plugin.

Modo automático desde terminal, sin abrir sesión: `jac agente "<consulta abierta>"` (usa la CLI `claude` con el plugin cargado).

## Instalación en un solo archivo (recomendada para Cowork)

`python3 -m jac empaquetar --instalador instalar_jac_cowork.py` genera un único archivo Python con el agente completo incrustado. Se lleva a cualquier equipo con Python 3.9 o superior y no necesita `git`, `pip` ni internet:

```
python3 instalar_jac_cowork.py            # instala, crea jac-legal-os.plugin y ejecuta la prueba de aceptación
python3 instalar_jac_cowork.py --red      # además comprueba si la red alcanza las fuentes oficiales
```

Solo declara éxito si la prueba de aceptación pasa. No sobrescribe carpetas ajenas (exige `--forzar`), verifica su integridad con SHA-256 y, si el archivo llega cortado o alterado, falla con un mensaje claro. Códigos de salida: 0 correcto, 1 la prueba falló, 2 archivo dañado o alterado, 3 error de uso o de entorno.

## Paquete de archivos .md para Cowork

`python3 -m jac empaquetar --cowork-md cowork-jac` genera, desde las mismas fuentes que el plugin, una carpeta con: instrucciones del proyecto, los tres skills (en .md y en .zip con la estructura de carpeta que exige la carga de skills), el protocolo Gauntlet, el catálogo de normas verificadas, un caso de prueba y una guía de carga. Sirve cuando Cowork no puede ejecutar código: los skills incluyen un modo sin herramientas que verifica abriendo fuentes y declara pendiente lo que no pudo comprobar.

Evidencia del modo solo .md: se ejecutó el paquete sin herramientas y sin el plugin sobre el caso de prueba, en dos corridas independientes; ambas cumplieron los 13 criterios comprobables (estado BLOCKED, errores detectados, sentencias no verificadas dejadas como pendientes, ninguna vigencia afirmada, revisión declarada interna). Son dos corridas con un solo modelo: indicativo, no una garantía estadística.

## Incluir los agentes de otro plugin (croma-jac) en el mismo archivo

`python3 -m jac empaquetar --con-agentes auto` agrega al `.plugin` los agentes del plugin `croma-jac` instalado (`jac-legal-command`, `jac-legal-counsel`, `jac-review-chamber`), **sin modificarlos** (se verifica byte a byte), y rechaza colisiones de nombre. La opción también existe en `--instalador`. `--con-agentes RUTA` acepta la raíz de otro plugin o su carpeta `agents`.

Modos (`--modo-agentes`): `solo` incluye únicamente los agentes; `apoyo` (por defecto) añade los skills que los agentes necesitan para funcionar como fueron diseñados (calculados por menciones, sin expandir enrutadores); `completo` añade todos los skills de ese plugin. En `apoyo` con croma-jac se agregan `croma` (con sus tres referencias), `croma-release` y `croma-revisar`. El enrutador `croma` nombra otros 13 comandos que no se incluyen: en ese modo `/croma expediente` y similares no existen. Use `completo` si los necesita.

El contenido de croma-jac no se versiona en este repositorio (es público): el archivo se genera en su equipo a partir de su instalación local.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `jac consulta "<entrada>"` | Enruta solo: cita, texto con citas, búsqueda de jurisprudencia, archivo o carpeta |
| `jac sentencia T-008/20` | Verifica una sentencia de la Corte Constitucional |
| `jac norma "Ley 1437 de 2011"` | Existencia y fecha de una norma del catálogo (nunca vigencia) |
| `jac validar escrito.docx --radicado <r>` | Control Gauntlet: BLOCKED, CONDITIONAL o PASS_AUTOMATICO |
| `jac inventario <carpeta>` | Inventario por contenido y duplicados |
| `jac prueba [--red]` | Prueba de aceptación reproducible |
| `jac doctor [--red]` | Diagnóstico de instalación y de acceso a las fuentes |
| `jac empaquetar` | Crea el archivo .plugin |

## Cómo comprobar que funciona

`jac prueba` ejecuta un escrito sintético con 8 errores sembrados, mide cuántos detecta, comprueba que no marque como error lo correcto y recorre el ciclo completo (ronda 1 BLOCKED, corrección, ronda 2 PASS_AUTOMATICO). `jac prueba --red` añade citas reales contra las fuentes oficiales. `jac doctor --red` informa qué hosts son alcanzables desde su red.

## Qué garantiza y qué no

Garantiza: no declara verificada una cita que ninguna fuente confirmó; no declara inexistente una norma por no figurar en el catálogo; no afirma vigencia; informa qué fuentes respondieron y cuáles no.

No hace: determinar vigencia de normas ni el texto de sus artículos, verificar hechos, términos o cálculos, ni cubrir Corte Suprema y Consejo de Estado con conector propio (con herramientas de Croma conectadas, el agente puede consultarlas y lo declara). PASS_AUTOMATICO no equivale a PASS del protocolo. El abogado responsable es el último filtro.

## Confidencialidad

Las consultas a fuentes oficiales envían solo la cita normalizada (por ejemplo `T-008/20`), nunca el texto del escrito. El texto del escrito lo procesa Claude bajo las condiciones de su plan. El archivo .plugin no incluye datos de clientes, CRM ni prospectos.
