#!/bin/bash

# SCRIPT: Capturar búsqueda jurídica con timestamp y guardar resultado

if [ $# -lt 2 ]; then
    echo "❌ USO: capturar-busqueda.sh <tipo> <consulta>"
    echo ""
    echo "TIPOS: jurisprudencia, norma, analisis, verificar, reporte"
    echo ""
    echo "EJEMPLO:"
    echo "  capturar-busqueda.sh jurisprudencia \"despido sin justa causa\""
    exit 1
fi

TIPO=$1
CONSULTA=$2
FECHA=$(date +%Y-%m-%d)
HORA=$(date +%H-%M-%S)
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
CARPETA="/home/user/jacabogados/busquedas-juridicas/diarias"

# Crear archivo de salida
ARCHIVO_SALIDA="$CARPETA/busqueda_${TIMESTAMP}_${TIPO}.txt"

# Encabezado
{
    echo "=========================================="
    echo "BÚSQUEDA JURÍDICA AUTOMATIZADA"
    echo "=========================================="
    echo ""
    echo "FECHA: $FECHA"
    echo "HORA: $HORA"
    echo "TIPO: $TIPO"
    echo "CONSULTA: $CONSULTA"
    echo ""
    echo "=========================================="
    echo "COMANDO EJECUTADO:"
    echo "=========================================="
    echo "node agente-juridico-especializado.js consulta $TIPO \"$CONSULTA\""
    echo ""
    echo "=========================================="
    echo "RESULTADOS:"
    echo "=========================================="

    # Ejecutar búsqueda y capturar salida
    node /home/user/jacabogados/agente-juridico-especializado.js consulta $TIPO "$CONSULTA"

} > "$ARCHIVO_SALIDA" 2>&1

echo ""
echo "✓ Búsqueda completada"
echo "✓ Resultado guardado en: $ARCHIVO_SALIDA"
echo ""
echo "Próximo paso: Revisar el archivo y copiar citas al documento"
