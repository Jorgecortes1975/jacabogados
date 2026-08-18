# ════════════════════════════════════════════════════════════
# PERFIL DE POWERSHELL - JAC AUTOMATIZACIÓN
# ════════════════════════════════════════════════════════════

# Configuración de encoding UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# Rutas
$CLAUDE_DIR = "$env:USERPROFILE\.claude"
$SCRIPTS_DIR = "$CLAUDE_DIR\scripts"
$DOCS_DIR = "$env:USERPROFILE\Documents\JAC-Documentos"

# ════════════════════════════════════════════════════════════
# ALIAS - COMANDOS CORTOS
# ════════════════════════════════════════════════════════════

# Scripts de automatización
Set-Alias -Name auditoria -Value { & node "$SCRIPTS_DIR\auto-auditoria.js" } -Force
Set-Alias -Name jurisprudencia -Value { & node "$SCRIPTS_DIR\auto-jurisprudencia.js" } -Force
Set-Alias -Name descargas -Value { & node "$SCRIPTS_DIR\auto-descargas.js" } -Force
Set-Alias -Name alertas -Value { & node "$SCRIPTS_DIR\auto-notificaciones.js" } -Force

# Navegación rápida
Set-Alias -Name docs -Value { Set-Location $DOCS_DIR } -Force
Set-Alias -Name scripts -Value { Set-Location $SCRIPTS_DIR } -Force
Set-Alias -Name home -Value { Set-Location $env:USERPROFILE } -Force

# Utilidades
Set-Alias -Name ll -Value { Get-ChildItem -Force } -Force
Set-Alias -Name clear-all -Value { Clear-Host } -Force

# ════════════════════════════════════════════════════════════
# FUNCIONES PERSONALIZADAS
# ════════════════════════════════════════════════════════════

# Auditoría rápida
function Audit {
    param(
        [string]$CaseName = "Mi-Caso"
    )
    Write-Host "🔍 Generando auditoría: $CaseName" -ForegroundColor Cyan
    & node "$SCRIPTS_DIR\auto-auditoria.js" "$CaseName"
}

# Búsqueda de jurisprudencia
function Legal {
    param(
        [string]$Tema = "derecho"
    )
    Write-Host "📚 Buscando jurisprudencia: $Tema" -ForegroundColor Cyan
    & node "$SCRIPTS_DIR\auto-jurisprudencia.js" "$Tema"
}

# Sincronizar descargas
function Sync-Downloads {
    Write-Host "📁 Sincronizando descargas..." -ForegroundColor Cyan
    & node "$SCRIPTS_DIR\auto-descargas.js"
}

# Gestionar alertas
function Alerts {
    param(
        [string]$Action = "check"
    )

    if ($Action -eq "check") {
        Write-Host "⏰ Verificando alertas..." -ForegroundColor Cyan
        & node "$SCRIPTS_DIR\auto-notificaciones.js" --check
    }
    elseif ($Action -eq "new") {
        Write-Host "➕ Crear nueva alerta" -ForegroundColor Cyan
        Write-Host "Uso: Alerts new '2026-09-15' 'Descripción'" -ForegroundColor Yellow
    }
    else {
        & node "$SCRIPTS_DIR\auto-notificaciones.js" $Action
    }
}

# Abrir directorio en Explorer
function Open {
    param(
        [string]$Path = "."
    )
    explorer $Path
}

# ════════════════════════════════════════════════════════════
# PROMPT PERSONALIZADO
# ════════════════════════════════════════════════════════════

function prompt {
    $identity = [System.Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object System.Security.Principal.WindowsPrincipal($identity)
    $isAdmin = $principal.IsInRole([System.Security.Principal.WindowsBuiltInRole]::Administrator)

    $currentPath = Get-Location
    $pathDisplay = if ($currentPath.Path -eq $env:USERPROFILE) { "~" } else { Split-Path $currentPath -Leaf }

    $adminIndicator = if ($isAdmin) { "⚡" } else { ">" }
    $timestamp = Get-Date -Format "HH:mm"

    Write-Host "[$timestamp] " -NoNewline -ForegroundColor Gray
    Write-Host "JAC " -NoNewline -ForegroundColor Cyan -BackgroundColor DarkBlue
    Write-Host "$pathDisplay " -NoNewline -ForegroundColor White
    Write-Host "$adminIndicator " -ForegroundColor Green -NoNewline

    return ""
}

# ════════════════════════════════════════════════════════════
# MENSAJE DE BIENVENIDA
# ════════════════════════════════════════════════════════════

Write-Host ""
Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║           🚀 JAC - AUTOMATIZACIÓN JURÍDICA                 ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

Write-Host "Comandos disponibles:" -ForegroundColor Yellow
Write-Host ""
Write-Host "  Auditorías:"  -ForegroundColor Green
Write-Host "    audit 'Nombre del caso'           - Generar auditoría"
Write-Host ""
Write-Host "  Jurisprudencia:" -ForegroundColor Green
Write-Host "    legal 'tema'                      - Buscar sentencias"
Write-Host ""
Write-Host "  Descargas:" -ForegroundColor Green
Write-Host "    sync-downloads                    - Organizar Downloads"
Write-Host ""
Write-Host "  Alertas:" -ForegroundColor Green
Write-Host "    alerts check                      - Ver alertas"
Write-Host "    alerts new '2026-09-15' 'desc'   - Crear alerta"
Write-Host ""
Write-Host "  Navegación:" -ForegroundColor Green
Write-Host "    docs                              - Ir a documentos JAC"
Write-Host "    scripts                           - Ir a scripts"
Write-Host "    open                              - Abrir Explorer"
Write-Host ""
Write-Host "  Utilidades:" -ForegroundColor Green
Write-Host "    ll                                - Listar archivos"
Write-Host "    clear-all                         - Limpiar pantalla"
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════" -ForegroundColor Gray
Write-Host ""
