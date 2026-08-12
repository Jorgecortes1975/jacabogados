#!/bin/bash

# Script para iniciar automáticamente los loops de agentes
# Agregar a crontab para que se ejecute al reiniciar el sistema

DIRECTORIO="/home/user/jacabogados"
LOG_FILE="$DIRECTORIO/logs/iniciar-loops.log"

# Crear directorio de logs si no existe
mkdir -p "$DIRECTORIO/logs"

echo "$(date '+%Y-%m-%d %H:%M:%S') - Iniciando loops automáticos..." >> "$LOG_FILE"

# Ejecutar loops en background
cd "$DIRECTORIO"
nohup node loops-agentes-automaticos.js activar > /dev/null 2>> "$LOG_FILE" &

# Registrar PID
echo "$(date '+%Y-%m-%d %H:%M:%S') - PID: $!" >> "$LOG_FILE"
echo "$!" > "$DIRECTORIO/.loops-pid"

echo "✅ Loops iniciados en background"
