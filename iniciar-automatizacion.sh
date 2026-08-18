#!/bin/bash

# INICIAR-AUTOMATIZACIÓN
# Script que inicia el sistema automático de loops y hooks
# Uso: ./iniciar-automatizacion.sh

set -e

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  INICIAR SISTEMA AUTOMÁTICO DE LOOPS Y HOOKS                  ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo

# 1. Verificar dependencias
echo "1️⃣  Verificando dependencias..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    exit 1
fi
echo "✓ Node.js disponible"

if ! npm list cron-parser &> /dev/null; then
    echo "⚠️  Instalando cron-parser..."
    npm install cron-parser --save
fi
echo "✓ cron-parser disponible"

# 2. Crear directorios necesarios
echo
echo "2️⃣  Creando directorios..."
mkdir -p logs
mkdir -p search-console-data
echo "✓ Directorios listos"

# 3. Verificar archivos de configuración
echo
echo "3️⃣  Verificando configuración..."
if [ ! -f ".claude/settings.json" ]; then
    echo "❌ No existe .claude/settings.json"
    exit 1
fi
echo "✓ settings.json encontrado"

if [ ! -f "executor-prompts-legal-search-console.js" ]; then
    echo "❌ No existe executor-prompts-legal-search-console.js"
    exit 1
fi
echo "✓ Executor encontrado"

if [ ! -f "orquestador-loops-hooks.js" ]; then
    echo "❌ No existe orquestador-loops-hooks.js"
    exit 1
fi
echo "✓ Orquestador encontrado"

# 4. Ver estado actual
echo
echo "4️⃣  Estado actual del sistema..."
node orquestador-loops-hooks.js status

# 5. Iniciar orquestador
echo
echo "5️⃣  INICIANDO ORQUESTADOR..."
echo "═══════════════════════════════════════════════════════════════"
echo "✓ El sistema está escuchando eventos y ejecutando loops automáticamente"
echo "✓ Puedes ver los logs en: logs/orquestador.log"
echo "✓ Presiona Ctrl+C para detener"
echo "═══════════════════════════════════════════════════════════════"
echo

node orquestador-loops-hooks.js iniciar
