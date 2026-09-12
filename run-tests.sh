#!/bin/bash

# Script interactivo para ejecutar pruebas del Business Automation System
# Uso: bash run-tests.sh

set -e

BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Colores
print_header() {
    echo -e "\n${BLUE}════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}════════════════════════════════════════════════════════${NC}\n"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_header "🤖 Business Automation System — Test Suite"

echo "Selecciona qué prueba quieres ejecutar:"
echo ""
echo "1) Prueba 1: Búsqueda Automática de Jurisprudencia (Firecrawl Daily)"
echo "2) Prueba 2: Respuesta Automática a Email (Email Auto-Response)"
echo "3) Prueba 3: Generación de Features (Feature Dev Continuous)"
echo "4) Prueba 4: Validación de Hallucinations (Hourly Check)"
echo "5) Prueba 5: Reporte Semanal (Weekly Report)"
echo "6) Prueba 6: Flujo Completo (4 Capas)"
echo "7) Ejecutar TODAS las pruebas"
echo "8) Ver logs en vivo"
echo "9) Ver dashboard"
echo "0) Salir"
echo ""
read -p "Ingresa número (0-9): " choice

case $choice in
    1)
        print_header "PRUEBA 1: Búsqueda Automática de Jurisprudencia"
        echo "Ejecutando Firecrawl Daily..."
        echo ""

        if [ -f .claude/hooks/firecrawl-daily.sh ]; then
            bash .claude/hooks/firecrawl-daily.sh
            print_success "Firecrawl completado"
            echo ""
            echo "Ver logs:"
            echo "  $ tail -f .claude/agents/business-automation/logs/hallucination-*.log"
        else
            print_error "Hook firecrawl-daily.sh no encontrado"
        fi
        ;;

    2)
        print_header "PRUEBA 2: Respuesta Automática a Email"
        echo "Simulando email entrante..."
        echo ""

        if [ -f .claude/hooks/email-auto-response.sh ]; then
            bash .claude/hooks/email-auto-response.sh \
                "Revisión de contrato comercial" \
                "Hola JAC, tenemos un contrato de arrendamiento que necesita revisión." \
                "cliente@empresa.co"
            print_success "Email procesado"
            echo ""
            echo "Ver respuesta guardada:"
            echo "  $ ls -la .claude/agents/business-automation/pending-emails/"
        else
            print_error "Hook email-auto-response.sh no encontrado"
        fi
        ;;

    3)
        print_header "PRUEBA 3: Generación de Features"
        echo "Simulando PR merge..."
        echo ""

        if [ -f .claude/hooks/feature-dev-continuous.sh ]; then
            bash .claude/hooks/feature-dev-continuous.sh \
                "100" \
                "feature/search-api" \
                "Endpoint para búsqueda de jurisprudencia" \
                "Implementar endpoint REST para búsqueda de jurisprudencia"
            print_success "Feature Dev completado"
            echo ""
            echo "Ver código generado:"
            echo "  $ ls -la .claude/agents/business-automation/generated-features/"
        else
            print_error "Hook feature-dev-continuous.sh no encontrado"
        fi
        ;;

    4)
        print_header "PRUEBA 4: Validación de Hallucinations"
        echo "Ejecutando validación horaria..."
        echo ""

        if [ -f .claude/hooks/hallucination-check-hourly.sh ]; then
            bash .claude/hooks/hallucination-check-hourly.sh
            print_success "Validación completada"
            echo ""
            echo "Ver reporte:"
            echo "  $ tail -f .claude/agents/business-automation/logs/hallucination-*.log"
        else
            print_error "Hook hallucination-check-hourly.sh no encontrado"
        fi
        ;;

    5)
        print_header "PRUEBA 5: Reporte Semanal"
        echo "Generando reporte semanal..."
        echo ""

        if [ -f .claude/hooks/weekly-business-report.sh ]; then
            bash .claude/hooks/weekly-business-report.sh
            print_success "Reporte generado"
            echo ""
            echo "Ver reporte:"
            echo "  $ cat .claude/agents/business-automation/reports/report-*.md"
        else
            print_error "Hook weekly-business-report.sh no encontrado"
        fi
        ;;

    6)
        print_header "PRUEBA 6: Flujo Completo (4 Capas)"
        echo "Ejecutando flujo integrado..."
        echo ""
        print_warning "Nota: Esta prueba ejecutará varias automatizaciones en secuencia"
        echo ""

        # 1. Buscar jurisprudencia
        print_header "Paso 1/4: INVESTIGACIÓN (Firecrawl)"
        if [ -f .claude/hooks/firecrawl-daily.sh ]; then
            bash .claude/hooks/firecrawl-daily.sh
            print_success "Investigación completada"
        fi

        # 2. Procesar email
        print_header "Paso 2/4: CLASIFICACIÓN (Email Router)"
        if [ -f .claude/hooks/email-auto-response.sh ]; then
            bash .claude/hooks/email-auto-response.sh \
                "Escritura de tutela constitucional" \
                "Necesito defenderme contra decisión administrativa" \
                "cliente@jacabc.co"
            print_success "Email clasificado y respondido"
        fi

        # 3. Validar outputs
        print_header "Paso 3/4: VALIDACIÓN (Anti-Hallucination)"
        if [ -f .claude/hooks/hallucination-check-hourly.sh ]; then
            bash .claude/hooks/hallucination-check-hourly.sh
            print_success "Validación completada"
        fi

        # 4. Generar reporte
        print_header "Paso 4/4: REPORTE (Dashboard)"
        echo "Dashboard disponible en: http://localhost:3000/dashboard"
        print_success "Flujo completo ejecutado"
        ;;

    7)
        print_header "Ejecutando TODAS las pruebas"
        echo "Esto puede tomar 10-15 minutos. Continuar? (s/n)"
        read -p "> " confirm

        if [ "$confirm" = "s" ] || [ "$confirm" = "S" ]; then
            print_header "PRUEBA 1/5: Firecrawl"
            [ -f .claude/hooks/firecrawl-daily.sh ] && bash .claude/hooks/firecrawl-daily.sh || print_error "No encontrado"

            print_header "PRUEBA 2/5: Email Auto-Response"
            [ -f .claude/hooks/email-auto-response.sh ] && bash .claude/hooks/email-auto-response.sh "Test" "Body" "test@test.co" || print_error "No encontrado"

            print_header "PRUEBA 3/5: Feature Dev"
            [ -f .claude/hooks/feature-dev-continuous.sh ] && bash .claude/hooks/feature-dev-continuous.sh "1" "test" "Test PR" "Test body" || print_error "No encontrado"

            print_header "PRUEBA 4/5: Hallucination Check"
            [ -f .claude/hooks/hallucination-check-hourly.sh ] && bash .claude/hooks/hallucination-check-hourly.sh || print_error "No encontrado"

            print_header "PRUEBA 5/5: Weekly Report"
            [ -f .claude/hooks/weekly-business-report.sh ] && bash .claude/hooks/weekly-business-report.sh || print_error "No encontrado"

            print_success "✅ Todas las pruebas completadas"
        else
            print_warning "Pruebas canceladas"
        fi
        ;;

    8)
        print_header "Mostrando logs en vivo"
        echo "Presiona CTRL+C para detener"
        echo ""
        tail -f .claude/agents/business-automation/logs/*.log
        ;;

    9)
        print_header "Dashboard"
        echo "Abriendo dashboard en navegador..."
        echo ""
        echo "📊 Dashboard disponible en:"
        echo "   http://localhost:3000/dashboard"
        echo ""
        echo "Si no se abre automáticamente, cópiala y pégala en tu navegador."
        echo ""

        # Intentar abrir en navegador
        if command -v open &> /dev/null; then
            open "http://localhost:3000/dashboard"
        elif command -v xdg-open &> /dev/null; then
            xdg-open "http://localhost:3000/dashboard"
        elif command -v start &> /dev/null; then
            start "http://localhost:3000/dashboard"
        fi
        ;;

    0)
        print_header "Saliendo"
        echo "Gracias por usar Business Automation System"
        exit 0
        ;;

    *)
        print_error "Opción no válida"
        exit 1
        ;;
esac

echo ""
print_header "Resumen de directorios importantes"
echo "Logs:                   .claude/agents/business-automation/logs/"
echo "Pending outputs:        .claude/agents/business-automation/pending-outputs/"
echo "Hallucination reports:  .claude/agents/business-automation/hallucination-reports/"
echo "Generated features:     .claude/agents/business-automation/generated-features/"
echo "Pending emails:         .claude/agents/business-automation/pending-emails/"
echo "Reports:                .claude/agents/business-automation/reports/"
echo ""

echo "Para más información, ver:"
echo "  $ cat SOLICITUD-PRUEBA-SISTEMA.md"
echo "  $ cat BUSINESS-AUTOMATION-SUMMARY.md"
echo ""

exit 0
