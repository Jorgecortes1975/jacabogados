#!/usr/bin/env bash
# auditoria-juridica.sh — hook PostToolUse de auditoría jurídica colombiana
#
# QUÉ ES Y QUÉ NO ES
# ------------------
# Un hook es un script de shell. NO razona, NO consulta fuentes, NO interpreta
# derecho. Solo hace verificaciones MECÁNICAS y deterministas sobre el texto
# que se acaba de escribir a disco, y le inyecta el hallazgo al modelo para que
# actúe.
#
# El razonamiento jurídico (vigencia real, pertinencia, competencia,
# coherencia) lo hace @auditor-juridico-col apoyado en anti-hallucination-v4.
# Este script es el disparador que garantiza que esa auditoría no se olvide.
#
# QUÉ DETECTA
#   1. Leyes en la lista negra de normas inexistentes ya identificadas
#   2. Números de ley fuera de la banda plausible para su año
#   3. Sentencias citadas sin radicado o sin fecha
#   4. Marcadores de jurisdicción extranjera
#   5. Lenguaje de garantía de resultado (prohibido)
#   6. Documento jurídico sin bloque de auditoría
#
# Exit 0 siempre. Un hook que falla no debe romper la sesión.

set -uo pipefail

payload="$(cat 2>/dev/null || true)"
[ -z "$payload" ] && exit 0

field() {
  printf '%s' "$payload" | grep -o "\"$1\"[[:space:]]*:[[:space:]]*\"[^\"]*\"" \
    | head -1 | sed 's/.*:[[:space:]]*"//; s/"$//'
}

file="$(field file_path)"
[ -z "$file" ] && exit 0
[ -f "$file" ] || exit 0

# Solo texto. Nunca código, datos ni binarios.
case "$file" in
  *.md|*.txt|*.docx.md|*.rst) : ;;
  *) exit 0 ;;
esac

# ¿Parece documento jurídico colombiano? Si no, salir en silencio.
if ! grep -qiE 'juzgado|demanda|tutela|CST|CGP|CPACA|sentencia|pretension|radicar|contestaci|memorial|alegato|recurso de|Corte (Constitucional|Suprema)|Consejo de Estado' "$file" 2>/dev/null; then
  exit 0
fi

hallazgos=""
add() { hallazgos="${hallazgos}
- $1"; }

# --------------------------------------------------------------- 1. lista negra
# Normas cuya inexistencia ya fue verificada en este despacho.
while IFS='|' read -r num anio motivo; do
  [ -z "${num:-}" ] && continue
  # Solo cuenta como uso real si al menos una mención NO está en una línea que
  # la desmiente. Un documento que dice "Ley 2270/2024 — NO EXISTE" la está
  # advirtiendo, no citando: marcarla ahí sería un falso positivo.
  usos="$(grep -iE "[Ll]ey[[:space:]]+${num}[[:space:]]*(de|/|-)[[:space:]]*${anio}" "$file" 2>/dev/null \
        | grep -vicE 'NO EXISTE|inexistente|eliminad|falsa|no debe citarse|referencias? falsas' || true)"
  if [ "${usos:-0}" -gt 0 ]; then
    add "🔴 CRÍTICO — Ley ${num} de ${anio}: ${motivo}. Elimínala del documento."
  fi
done <<'DENYLIST'
2270|2024|norma inexistente, verificada como falsa en julio 2026
2261|2024|norma inexistente, verificada como falsa en julio 2026
DENYLIST

# ------------------------------------------- 2. número de ley fuera de banda
# Las leyes colombianas se numeran de forma continua (~50-90 por año).
# Anclas verificadas: Ley 100/1993, 527/1999, 906/2004, 1258/2008, 1437/2011,
# 1564/2012, 2220/2022, 2294/2023, 2381/2024.
# Se interpola la banda esperada y se marca lo que quede muy fuera.
# Esto NO prueba que la norma exista — solo señala una incoherencia aritmética
# que casi siempre indica una cita inventada o un año tecleado mal.
grep -oiE '[Ll]ey[[:space:]]+[0-9]{2,4}[[:space:]]*(de|/|-)[[:space:]]*[0-9]{4}' "$file" 2>/dev/null \
| while read -r cita; do
  num="$(printf '%s' "$cita" | grep -oE '[0-9]{2,4}' | head -1)"
  anio="$(printf '%s' "$cita" | grep -oE '[0-9]{4}$' | head -1)"
  [ -z "${num:-}" ] || [ -z "${anio:-}" ] && continue
  [ "$anio" -lt 1991 ] && continue          # antes de la Constitución vigente
  [ "$anio" -gt 2026 ] && continue

  # Banda esperada por interpolación lineal sobre las anclas.
  esperado="$(awk -v y="$anio" 'BEGIN{
    if      (y<=1993) e=100  + (y-1991)*35
    else if (y<=1999) e=100  + (y-1993)*71
    else if (y<=2004) e=527  + (y-1999)*76
    else if (y<=2011) e=906  + (y-2004)*76
    else if (y<=2022) e=1437 + (y-2011)*71
    else              e=2220 + (y-2022)*80
    printf "%d", e }')"
  delta=$(( num > esperado ? num - esperado : esperado - num ))

  if [ "$delta" -gt 150 ]; then
    printf -- '- 🟠 REVISAR — "%s": el número %s no encaja con la numeración esperada para %s (aprox. %s). Verifica en SUIN-Juriscol antes de citarla.\n' \
      "$cita" "$num" "$anio" "$esperado"
  fi
done > /tmp/.aud-banda.$$ 2>/dev/null
if [ -s /tmp/.aud-banda.$$ ]; then
  hallazgos="${hallazgos}
$(cat /tmp/.aud-banda.$$)"
fi
rm -f /tmp/.aud-banda.$$

# ------------------------------------------ 3. sentencia sin radicado o fecha
# Una sentencia citada debe traer identificador y año. "Sentencia C-123" sin
# año, o "la Corte ha dicho que" sin providencia, es cita no verificable.
# Se evalúa CADA cita por separado. La versión anterior era un AND de dos
# condiciones globales: bastaba con que UNA sola sentencia del documento
# trajera año para silenciar el chequeo entero, y las demás pasaban sin
# revisar. Detectado probando contra sentencias de tutela reales.
# Estas dos verificaciones necesitan lookahead por cita y una ventana que cruce
# saltos de línea. `grep -o` consume el texto que empareja, así que una cita
# seguida de otra se traga a la segunda; y trabajando línea a línea, el radicado
# que la extracción de PDF empujó al renglón siguiente queda invisible.
# Ambas cosas se resuelven en Python; si no está disponible, se omiten estas dos
# y el resto del hook sigue funcionando.
if command -v python3 >/dev/null 2>&1; then
  citas="$(python3 - "$file" <<'PYCHK' 2>/dev/null || true
import re, sys

texto = open(sys.argv[1], encoding="utf-8", errors="replace").read()
salida = []

# --- Sentencias de la Corte Constitucional sin año -------------------------
# Se mira SOLO la cola de cada cita hasta el siguiente "Sentencia", punto o
# punto y coma. Así una cita no se come a la que viene después.
sin_anio = []
for m in re.finditer(r'[Ss]entencia\s+(?:C|T|SU|SL|CSJ)[-\s]?\d{1,4}', texto):
    cola = texto[m.end():m.end() + 40]
    cola = re.split(r'[.;)]|[Ss]entencia', cola)[0]
    if not re.search(r'(19|20)\d{2}', cola):
        sin_anio.append(re.sub(r'\s+', ' ', m.group(0)).strip())
if sin_anio:
    vistos = list(dict.fromkeys(sin_anio))[:3]
    salida.append(
        "🟠 REVISAR — Sentencias citadas sin año: " + "; ".join(vistos) +
        ". Formato esperado C-123/2024 o T-456 de 2023; sin año no se ubica en la relatoría.")

# --- Providencias citadas por fecha sin radicado ---------------------------
# El texto se aplana antes de buscar, para que un radicado empujado al renglón
# siguiente por el salto de página siga contando como presente.
plano = re.sub(r'\s+', ' ', texto)
RAD = re.compile(r'rad(icado|\.)|exp(ediente|\.|\s*n)|\d{5}[\s-]*\d{2}[\s-]*\d{2}', re.I)
sin_rad = []
for m in re.finditer(
        r'(?:[Ss]entencia|[Ff]allo|[Aa]uto)\s+de[l]?\s+\d{1,2}\s+de\s+\w+\s+de\s+\d{4}', plano):
    if not RAD.search(plano[m.end():m.end() + 90]):
        sin_rad.append(m.group(0))
for cita in list(dict.fromkeys(sin_rad))[:3]:
    salida.append(
        f'🟠 REVISAR — "{cita}": providencia citada por fecha sin radicado ni '
        "expediente. Consejo de Estado y CSJ se identifican por radicado; sin él "
        "no se ubica en fuente oficial.")

print("\n".join(salida))
PYCHK
)"
  if [ -n "${citas// /}" ]; then
    while IFS= read -r c; do
      [ -n "$c" ] && add "$c"
    done <<< "$citas"
  fi
fi

if grep -qiE 'la (Corte|Sala) (ha (dicho|sostenido|señalado)|reiteró|estableció)' "$file" 2>/dev/null \
   && ! grep -qiE 'radicado|expediente|Sentencia[[:space:]]+[CTSU]+-|M\.?P\.?' "$file" 2>/dev/null; then
  add "🟠 REVISAR — Se atribuye un criterio a la Corte sin identificar la providencia. Agrega radicado y fecha, o marca [Pendiente verificación]."
fi

# Consejo de Estado y CSJ no numeran como la Constitucional (C-/T-/SU-): sus
# providencias se identifican por radicado o expediente. Citarlas solo por
# fecha y ponente las hace difíciles de verificar.

# ------------------------------- 3b. normas inexequibles o derogadas citadas
# Solo dispara si la norma se cita SIN advertir su estado. Un documento que
# dice "fue declarada inexequible" la está usando bien.
# El separador es @ y NO |, porque el regex que se arma abajo lleva
# alternancia (de|/|-) — con IFS='|' el patrón se partía en pedazos.
while IFS='@' read -r tipo num anio estado; do
  [ -z "${num:-}" ] && continue
  usos="$(grep -iE "${tipo}[[:space:]]+${num}[[:space:]]*(de|/|-)[[:space:]]*${anio}" "$file" 2>/dev/null \
        | grep -vicE 'inexequible|derogad|declarad[ao] contrari|ya no rige|sin vigencia|perdió vigencia|referencia histórica' || true)"
  if [ "${usos:-0}" -gt 0 ]; then
    add "🟠 REVISAR — Se aplica como vigente una norma con estado comprometido: ${estado}."
  fi
done <<'ESTADO'
[Ll]ey@1653@2013@Ley 1653/2013 (arancel judicial), declarada INEXEQUIBLE por C-169/2014
[Dd]ecreto@2700@1991@Decreto 2700/1991 (antiguo CPP), DEROGADO; solo válido como referencia histórica
[Ll]ey@600@2000@Ley 600/2000 (CPP anterior), régimen residual; verificar aplicabilidad temporal al caso
ESTADO

# ------------------------------------------ 4. jurisdicción extranjera
ext="$(grep -onEi 'Tribunal Supremo|Ley de Enjuiciamiento|LOPJ|amparo indirecto|SCJN|Código Civil español|certiorari|common law|stare decisis|Cámara Nacional de Apelaciones' "$file" 2>/dev/null | head -3)"
if [ -n "$ext" ]; then
  add "🔴 CRÍTICO — Posible institución de jurisdicción extranjera: $(printf '%s' "$ext" | tr '\n' ' '). Sustituye por la figura colombiana equivalente o identifícala expresamente como derecho comparado."
fi

# ------------------------------------------ 5. garantía de resultado
gar="$(grep -onEi 'garantiz[ao] (el|un) (éxito|resultado|fallo)|con seguridad (ganar|obtendr)|es seguro que (el juez|la corte)|resultado garantizado|sin riesgo de perder' "$file" 2>/dev/null | head -2)"
if [ -n "$gar" ]; then
  add "🔴 CRÍTICO — Lenguaje que garantiza resultado judicial: $(printf '%s' "$gar" | tr '\n' ' '). Prohibido: ningún resultado procesal se puede garantizar."
fi

lis="$(grep -onEi 'listo para radicar|puede radicarse sin revisi|no requiere revisión de abogado' "$file" 2>/dev/null | head -2)"
if [ -n "$lis" ]; then
  add "🟠 REVISAR — El documento se declara listo para radicar. Todo entregable es borrador sujeto a revisión de abogado habilitado."
fi

# ------------------------------------------ 6. falta bloque de auditoría
if grep -qiE 'juzgado|demanda|tutela|pretension|contestaci' "$file" 2>/dev/null \
   && ! grep -qiE 'RESULTADO DE LA AUDITOR|ACTA DE CONTROL|CHECKLIST DE COMPLETITUD' "$file" 2>/dev/null; then
  add "🟡 FALTA — El documento no trae bloque de auditoría (RESULTADO DE LA AUDITORÍA JURÍDICA). Ningún escrito procesal sale sin él."
fi

# ---------------------------------------------------------------- salida
[ -z "$hallazgos" ] && exit 0

nota="AUDITORÍA JURÍDICA AUTOMÁTICA — $(basename "$file")

Verificación mecánica sobre el archivo recién escrito. Estos hallazgos son
señales, no veredictos: confírmalos antes de actuar.
${hallazgos}

Acción requerida: corrige lo marcado 🔴 antes de continuar. Para la auditoría
completa (vigencia real, competencia, coherencia, jurisprudencia) delega en
@auditor-juridico-col, que aplica anti-hallucination-v4 contra fuente oficial."

# PostToolUse inyecta contexto al modelo vía additionalContext.
python3 - "$nota" <<'PY' 2>/dev/null || printf '%s\n' "$nota"
import json, sys
print(json.dumps({
    "hookSpecificOutput": {
        "hookEventName": "PostToolUse",
        "additionalContext": sys.argv[1],
    }
}))
PY

exit 0
