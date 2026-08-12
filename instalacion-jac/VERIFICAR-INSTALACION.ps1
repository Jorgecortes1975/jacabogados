# ════════════════════════════════════════════════════════════
# VERIFICAR INSTALACIÓN - JAC Automatización
# ════════════════════════════════════════════════════════════

Write-Host ""
Write-Host "╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║        VERIFICADOR DE INSTALACIÓN - JAC                   ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

$checks = @()
$allPass = $true

# ════════════════════════════════════════════════════════════
# CHECK 1: Node.js
# ════════════════════════════════════════════════════════════
Write-Host "[1/8] Verificando Node.js..." -ForegroundColor Yellow
$nodeVersion = & {
    try {
        node --version 2>$null
    } catch {
        $null
    }
}
if ($nodeVersion) {
    Write-Host "  ✓ Node.js: $nodeVersion" -ForegroundColor Green
    $checks += "Node.js"
} else {
    Write-Host "  ✗ Node.js no está instalado" -ForegroundColor Red
    $allPass = $false
}
Write-Host ""

# ════════════════════════════════════════════════════════════
# CHECK 2: Git
# ════════════════════════════════════════════════════════════
Write-Host "[2/8] Verificando Git..." -ForegroundColor Yellow
$gitVersion = & {
    try {
        git --version 2>$null
    } catch {
        $null
    }
}
if ($gitVersion) {
    Write-Host "  ✓ Git: $gitVersion" -ForegroundColor Green
    $checks += "Git"
} else {
    Write-Host "  ✗ Git no está instalado" -ForegroundColor Red
    $allPass = $false
}
Write-Host ""

# ════════════════════════════════════════════════════════════
# CHECK 3: .claude directory
# ════════════════════════════════════════════════════════════
Write-Host "[3/8] Verificando directorio .claude..." -ForegroundColor Yellow
$claudeDir = "C:\Users\$env:USERNAME\.claude"
if (Test-Path $claudeDir) {
    Write-Host "  ✓ Directorio: $claudeDir" -ForegroundColor Green
    $checks += ".claude directory"
} else {
    Write-Host "  ✗ Directorio .claude no existe" -ForegroundColor Red
    $allPass = $false
}
Write-Host ""

# ════════════════════════════════════════════════════════════
# CHECK 4: Scripts folder
# ════════════════════════════════════════════════════════════
Write-Host "[4/8] Verificando carpeta de scripts..." -ForegroundColor Yellow
$scriptsDir = "$claudeDir\scripts"
if (Test-Path $scriptsDir) {
    $scriptCount = (Get-ChildItem $scriptsDir -Filter "*.js" 2>$null).Count
    Write-Host "  ✓ Carpeta de scripts: $scriptsDir" -ForegroundColor Green
    Write-Host "  ✓ Scripts encontrados: $scriptCount" -ForegroundColor Green
    $checks += "Scripts folder"
} else {
    Write-Host "  ✗ Carpeta de scripts no existe" -ForegroundColor Red
    $allPass = $false
}
Write-Host ""

# ════════════════════════════════════════════════════════════
# CHECK 5: PowerShell Profile
# ════════════════════════════════════════════════════════════
Write-Host "[5/8] Verificando perfil de PowerShell..." -ForegroundColor Yellow
$profilePath = $PROFILE
if (Test-Path $profilePath) {
    $hasAudit = Select-String -Path $profilePath -Pattern "function Audit" -Quiet
    if ($hasAudit) {
        Write-Host "  ✓ Perfil configurado: $profilePath" -ForegroundColor Green
        Write-Host "  ✓ Función Audit encontrada" -ForegroundColor Green
        $checks += "PowerShell Profile"
    } else {
        Write-Host "  ✗ Perfil existe pero funciones no configuradas" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ✗ Perfil de PowerShell no configurado" -ForegroundColor Yellow
}
Write-Host ""

# ════════════════════════════════════════════════════════════
# CHECK 6: docx module
# ════════════════════════════════════════════════════════════
Write-Host "[6/8] Verificando módulo docx..." -ForegroundColor Yellow
$docxInstalled = & {
    try {
        npm list -g docx 2>$null | Select-String "docx" -Quiet
    } catch {
        $false
    }
}
if ($docxInstalled) {
    Write-Host "  ✓ Módulo docx instalado" -ForegroundColor Green
    $checks += "docx module"
} else {
    Write-Host "  ⚠ Módulo docx no instalado (requerido para auditorías)" -ForegroundColor Yellow
    Write-Host "    Instálalo con: npm install -g docx" -ForegroundColor Yellow
}
Write-Host ""

# ════════════════════════════════════════════════════════════
# CHECK 7: JAC Documentos
# ════════════════════════════════════════════════════════════
Write-Host "[7/8] Verificando carpetas de documentos..." -ForegroundColor Yellow
$docsDir = "C:\Users\$env:USERNAME\Documents\JAC-Documentos"
if (Test-Path $docsDir) {
    Write-Host "  ✓ Documentos: $docsDir" -ForegroundColor Green
    $checks += "JAC-Documentos"
} else {
    Write-Host "  ⚠ Carpeta JAC-Documentos no existe" -ForegroundColor Yellow
}
Write-Host ""

# ════════════════════════════════════════════════════════════
# CHECK 8: Configuration
# ════════════════════════════════════════════════════════════
Write-Host "[8/8] Verificando configuración..." -ForegroundColor Yellow
$configDir = "$claudeDir\config"
if (Test-Path $configDir) {
    Write-Host "  ✓ Configuración: $configDir" -ForegroundColor Green
    $checks += "Configuration"
} else {
    Write-Host "  ⚠ Directorio config no existe" -ForegroundColor Yellow
}
Write-Host ""

# ════════════════════════════════════════════════════════════
# RESUMEN
# ════════════════════════════════════════════════════════════
Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Gray

if ($allPass) {
    Write-Host ""
    Write-Host "🎉 ¡INSTALACIÓN COMPLETA Y VERIFICADA!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Componentes verificados:" -ForegroundColor Green
    foreach ($check in $checks) {
        Write-Host "  ✓ $check" -ForegroundColor Green
    }
    Write-Host ""
    Write-Host "Próximos pasos:" -ForegroundColor Cyan
    Write-Host "  1. Abre PowerShell en una nueva ventana" -ForegroundColor Cyan
    Write-Host "  2. Prueba: audit 'Mi Caso'" -ForegroundColor Cyan
    Write-Host "  3. Prueba: legal 'jurisprudencia'" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "⚠ HAY PROBLEMAS CON LA INSTALACIÓN" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Soluciones:" -ForegroundColor Yellow
    Write-Host "  1. Verifica TROUBLESHOOTING.md" -ForegroundColor Yellow
    Write-Host "  2. Ejecuta INSTALAR.bat como administrador" -ForegroundColor Yellow
    Write-Host "  3. Reinicia tu computador" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "════════════════════════════════════════════════════════════" -ForegroundColor Gray
Write-Host ""
Write-Host "JAC - Abogados Asociados | Sistema de Automatización Jurídica" -ForegroundColor Gray
Write-Host "Versión: 2.0 | Última actualización: 2026-08-12" -ForegroundColor Gray
Write-Host ""

pause
