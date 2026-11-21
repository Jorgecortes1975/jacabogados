#!/usr/bin/env bash
# Control local de piezas de marketing. No publica, no envía nada fuera del repositorio
# y no aprueba piezas. Solo genera informes en marketing/informes/ y ejecuta las pruebas.
#
# Código de salida: 0 si el control se ejecutó bien (aunque alguna pieza sea NO PUBLICABLE);
# 1 si fallan las pruebas del verificador o hay error de lectura.

set -u
cd "$(dirname "$0")/.." || exit 1

fecha=$(date +%F)
mkdir -p marketing/informes
errores=0

for archivo in marketing/piloto/piezas-piloto.md marketing/piezas/*.md; do
    [ -e "$archivo" ] || continue
    nombre=$(basename "$archivo" .md)
    salida="marketing/informes/${fecha}-${nombre}.md"
    python3 marketing/pipeline.py "$archivo" --informe "$salida" > /dev/null
    rc=$?
    case $rc in
        0) echo "$archivo: PUBLICABLE (sujeta a aprobación final). Informe: $salida" ;;
        1) echo "$archivo: NO PUBLICABLE. Informe: $salida" ;;
        *) echo "$archivo: ERROR de lectura (código $rc)"; errores=1 ;;
    esac
done

if python3 -m unittest marketing.test_verificador_publicidad > /dev/null 2>&1; then
    echo "Pruebas del verificador: OK"
else
    echo "Pruebas del verificador: FALLAN"
    errores=1
fi

exit $errores
