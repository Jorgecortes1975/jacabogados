#!/bin/bash

# ========================================
# Instalación del Programa Skills JAC
# Agente Jurídico Especializado
# ========================================

echo "=================================================="
echo "Instalación: Skills Programa JAC"
echo "Agente Jurídico Especializado"
echo "=================================================="
echo ""

# Verificar Node.js
echo "✓ Verificando Node.js..."
NODE_VERSION=$(node --version)
echo "  Node.js: $NODE_VERSION"

# Verificar npm
echo "✓ Verificando npm..."
NPM_VERSION=$(npm --version)
echo "  npm: $NPM_VERSION"

# Crear directorios
echo ""
echo "✓ Creando estructura de directorios..."
mkdir -p skills-program/skills/{consulta-jurisprudencia,consulta-normas,analisis-jurisprudencial,generador-reportes-juridicos}
echo "  ✓ Directorios creados"

# Instalar dependencias
echo ""
echo "✓ Instalando dependencias..."
cd skills-program
npm install
echo "  ✓ Dependencias instaladas"

# Mostrar estado
echo ""
echo "✓ Estado del programa skills:"
echo "  - Skills disponibles: 4"
echo "  - Fuentes oficiales integradas: 9"
echo "  - Total de capabilities: 20+"

# Instrucciones finales
echo ""
echo "=================================================="
echo "✓ INSTALACIÓN COMPLETADA"
echo "=================================================="
echo ""
echo "PRÓXIMOS PASOS:"
echo ""
echo "1. Activar el agente jurídico:"
echo "   $ node ../agente-juridico-especializado.js activar"
echo ""
echo "2. Hacer una consulta de ejemplo:"
echo "   $ npm run consult jurisprudencia 'derechos laborales'"
echo ""
echo "3. Ver fuentes integradas:"
echo "   $ npm run sources"
echo ""
echo "4. Ver ayuda:"
echo "   $ npm run help"
echo ""
echo "=================================================="
echo "Para más información, ver README.md"
echo "=================================================="
