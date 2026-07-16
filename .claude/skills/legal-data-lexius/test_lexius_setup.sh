#!/bin/bash
# SCRIPT DE VERIFICACIÓN — Lexius Skill Setup

echo "════════════════════════════════════════════════════════"
echo "  VERIFICACIÓN INSTALACIÓN — CONSULTOR LEGAL LEXIUS"
echo "════════════════════════════════════════════════════════"

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SKILL_DIR"

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

check_mark() { echo -e "${GREEN}✅${NC}"; }
cross_mark() { echo -e "${RED}❌${NC}"; }
warning_mark() { echo -e "${YELLOW}⚠️${NC}"; }

# 1. Verificar archivos necesarios
echo ""
echo "1️⃣  VERIFICACIÓN ARCHIVOS"
echo "─────────────────────────────"

files=(
    "SKILL.md"
    ".env.example"
    "lexius_client.py"
    "reporte_generator.py"
    "run_lexius.py"
    "README-IMPLEMENTACION.md"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "$(check_mark) $file"
    else
        echo "$(cross_mark) $file — FALTANTE"
    fi
done

# 2. Verificar variables de entorno
echo ""
echo "2️⃣  VERIFICACIÓN VARIABLES DE ENTORNO"
echo "─────────────────────────────────────"

# Buscar .env.local en raíz del proyecto
ENV_LOCAL="${SKILL_DIR}/../../.env.local"

if [ -f "$ENV_LOCAL" ]; then
    echo "$(check_mark) .env.local encontrado"

    # Verificar que contiene las variables requeridas
    if grep -q "LEXIUS_USER" "$ENV_LOCAL"; then
        echo "$(check_mark)   - LEXIUS_USER configurado"
    else
        echo "$(cross_mark)   - LEXIUS_USER NO configurado"
    fi

    if grep -q "LEXIUS_PASS" "$ENV_LOCAL"; then
        echo "$(check_mark)   - LEXIUS_PASS configurado"
    else
        echo "$(cross_mark)   - LEXIUS_PASS NO configurado"
    fi

    if grep -q "LEXIUS_BASE_URL" "$ENV_LOCAL"; then
        echo "$(check_mark)   - LEXIUS_BASE_URL configurado"
    else
        echo "$(cross_mark)   - LEXIUS_BASE_URL NO configurado"
    fi
else
    echo "$(warning_mark) .env.local NO encontrado"
    echo "   Instrucciones:"
    echo "   cp $SKILL_DIR/.env.example /home/user/jacabogados/.env.local"
    echo "   nano /home/user/jacabogados/.env.local"
fi

# 3. Verificar Python packages
echo ""
echo "3️⃣  VERIFICACIÓN PYTHON PACKAGES"
echo "────────────────────────────────"

python3 -c "import requests" 2>/dev/null && echo "$(check_mark) requests" || echo "$(cross_mark) requests — pip install requests"
python3 -c "import dotenv" 2>/dev/null && echo "$(check_mark) python-dotenv" || echo "$(cross_mark) python-dotenv — pip install python-dotenv"

# 4. Verificar carpetas de cache
echo ""
echo "4️⃣  VERIFICACIÓN CARPETAS"
echo "─────────────────────────"

cache_dirs=(
    "/home/user/jacabogados/lexius-cache"
    "/home/user/jacabogados/.logs"
)

for dir in "${cache_dirs[@]}"; do
    if [ -d "$dir" ]; then
        echo "$(check_mark) $dir"
    else
        echo "$(warning_mark) $dir — creando..."
        mkdir -p "$dir"
        echo "$(check_mark)   creado"
    fi
done

# 5. Verificar sintaxis Python
echo ""
echo "5️⃣  VERIFICACIÓN SINTAXIS PYTHON"
echo "────────────────────────────────"

python3 -m py_compile lexius_client.py 2>/dev/null && echo "$(check_mark) lexius_client.py" || echo "$(cross_mark) lexius_client.py — error sintaxis"
python3 -m py_compile reporte_generator.py 2>/dev/null && echo "$(check_mark) reporte_generator.py" || echo "$(cross_mark) reporte_generator.py — error sintaxis"
python3 -m py_compile run_lexius.py 2>/dev/null && echo "$(check_mark) run_lexius.py" || echo "$(cross_mark) run_lexius.py — error sintaxis"

# 6. Test imports
echo ""
echo "6️⃣  VERIFICACIÓN IMPORTS PYTHON"
echo "──────────────────────────────"

python3 << 'EOF'
try:
    from lexius_client import LexiusClient, LexiusConfig
    print("✅ lexius_client importado correctamente")
except Exception as e:
    print(f"❌ Error importando lexius_client: {e}")

try:
    from reporte_generator import ReporteGenerator
    print("✅ reporte_generator importado correctamente")
except Exception as e:
    print(f"❌ Error importando reporte_generator: {e}")
EOF

# 7. Test de autenticación (si .env.local existe)
echo ""
echo "7️⃣  VERIFICACIÓN AUTENTICACIÓN LEXIUS"
echo "───────────────────────────────────"

if [ -f "$ENV_LOCAL" ]; then
    echo "Intentando autenticación con credenciales en .env.local..."
    python3 << 'EOF'
import sys
sys.path.insert(0, '.')
from lexius_client import LexiusClient, LexiusConfig
try:
    config = LexiusConfig.from_env()
    client = LexiusClient(config)
    if client.authenticate():
        print("✅ Autenticación EXITOSA")
        print(f"   Usuario: {config.user}")
        client.close()
    else:
        print("❌ Autenticación FALLIDA")
        print("   Verifica credenciales en .env.local")
except ValueError as e:
    print(f"⚠️  Error configuración: {e}")
except Exception as e:
    print(f"❌ Error conexión: {e}")
EOF
else
    echo "$(warning_mark) .env.local no configurado — saltando test autenticación"
fi

# Resumen final
echo ""
echo "════════════════════════════════════════════════════════"
echo "  RESUMEN VERIFICACIÓN"
echo "════════════════════════════════════════════════════════"
echo ""
echo "Próximos pasos:"
echo ""
echo "1. Si necesitas configurar credenciales:"
echo "   cp /home/user/jacabogados/.claude/skills/legal-data-lexius/.env.example /home/user/jacabogados/.env.local"
echo "   nano /home/user/jacabogados/.env.local"
echo ""
echo "2. Ejecutar búsqueda de prueba:"
echo "   cd /home/user/jacabogados/.claude/skills/legal-data-lexius"
echo "   python3 run_lexius.py --tipo NORMA --query 'Código Sustantivo del Trabajo' --abogado 'Jorge Cortés' --contexto 'Prueba'"
echo ""
echo "3. Revisar reporte generado:"
echo "   ls -la /home/user/jacabogados/lexius-cache/*/*/REPORTE-LEXIUS-*.md"
echo ""
echo "════════════════════════════════════════════════════════"
