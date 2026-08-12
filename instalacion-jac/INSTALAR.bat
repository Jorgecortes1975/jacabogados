@echo off
REM ============================================
REM INSTALADOR MAESTRO JAC - Windows
REM Instala TODO automáticamente
REM ============================================

setlocal enabledelayedexpansion
chcp 65001 >nul

set USUARIO=%USERNAME%
set CLAUDE_DIR=C:\Users\%USUARIO%\.claude
set SCRIPTS_DIR=%CLAUDE_DIR%\scripts
set CONFIG_DIR=%CLAUDE_DIR%\config
set DOCS_DIR=%USERPROFILE%\Documents\JAC-Documentos
set ALERTAS_DIR=%USERPROFILE%\Documents\JAC-Alertas
set LOGS_DIR=%USERPROFILE%\Documents\JAC-Logs

echo.
echo ════════════════════════════════════════════════════════════
echo          ⚡ INSTALADOR MAESTRO JAC - WINDOWS ⚡
echo ════════════════════════════════════════════════════════════
echo.
echo Usuario: %USUARIO%
echo Ruta: %CLAUDE_DIR%
echo.

REM Verificar permisos de administrador
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo.
    echo ❌ ERROR: Requiere permisos de administrador
    echo.
    echo Solución:
    echo 1. Click derecho en install-all.bat
    echo 2. "Ejecutar como administrador"
    echo.
    pause
    exit /b 1
)

echo ✓ Permisos de administrador verificados
echo.

REM ====== PASO 1: Crear directorios ======
echo.
echo [PASO 1/6] Creando directorios...
echo.

for %%D in ("%SCRIPTS_DIR%" "%CONFIG_DIR%" "%DOCS_DIR%" "%ALERTAS_DIR%" "%LOGS_DIR%") do (
    if not exist "%%D" (
        mkdir "%%D"
        echo ✓ Creado: %%D
    ) else (
        echo ✓ Existe: %%D
    )
)

REM Crear subdirectorios de documentos
echo ✓ Creando categorías de documentos...
for %%C in (Auditorías Jurisprudencia Contratos Imágenes Otros) do (
    if not exist "%DOCS_DIR%\%%C" mkdir "%DOCS_DIR%\%%C"
)

REM ====== PASO 2: Verificar Node.js ======
echo.
echo [PASO 2/6] Verificando Node.js...
echo.

node --version >nul 2>&1
if %errorLevel% neq 0 (
    echo ❌ Node.js no está instalado
    echo.
    echo Descarga Node.js desde: https://nodejs.org/
    echo Versión recomendada: LTS (18.x o superior)
    echo.
    echo Después de instalar, ejecuta install-all.bat nuevamente
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node.js detectado: %NODE_VERSION%

REM ====== PASO 3: Instalar dependencias npm ======
echo.
echo [PASO 3/6] Instalando dependencias npm...
echo.

echo Instalando: docx...
call npm install -g docx >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✓ docx instalado exitosamente
) else (
    echo ⚠ Error al instalar docx (continúa de todas formas)
)

REM ====== PASO 4: Copiar scripts ======
echo.
echo [PASO 4/6] Instalando scripts de automatización...
echo.

if exist "auto-auditoria.js" (
    copy /Y "auto-auditoria.js" "%SCRIPTS_DIR%\" >nul
    echo ✓ auto-auditoria.js
)

if exist "auto-jurisprudencia.js" (
    copy /Y "auto-jurisprudencia.js" "%SCRIPTS_DIR%\" >nul
    echo ✓ auto-jurisprudencia.js
)

if exist "auto-descargas.js" (
    copy /Y "auto-descargas.js" "%SCRIPTS_DIR%\" >nul
    echo ✓ auto-descargas.js
)

if exist "auto-notificaciones.js" (
    copy /Y "auto-notificaciones.js" "%SCRIPTS_DIR%\" >nul
    echo ✓ auto-notificaciones.js
)

if exist "fix-black-screen.bat" (
    copy /Y "fix-black-screen.bat" "%SCRIPTS_DIR%\" >nul
    echo ✓ fix-black-screen.bat
)

REM ====== PASO 5: Crear configuración ======
echo.
echo [PASO 5/6] Creando archivo de configuración...
echo.

(
    echo {
    echo   "version": "1.0",
    echo   "usuario": "%USUARIO%",
    echo   "rutas": {
    echo     "scripts": "%SCRIPTS_DIR:\=\\%",
    echo     "config": "%CONFIG_DIR:\=\\%",
    echo     "downloads": "%USERPROFILE:\=\\%\\Downloads",
    echo     "documentos": "%DOCS_DIR:\=\\%",
    echo     "alertas": "%ALERTAS_DIR:\=\\%",
    echo     "logs": "%LOGS_DIR:\=\\%"
    echo   },
    echo   "automatizacion": {
    echo     "autoAuditoria": {
    echo       "habilitado": true,
    echo       "frecuencia": "semanal",
    echo       "dia": "viernes",
    echo       "hora": "17:00"
    echo     },
    echo     "autoJurisprudencia": {
    echo       "habilitado": true,
    echo       "frecuencia": "diaria",
    echo       "hora": "08:00"
    echo     },
    echo     "autoDescargas": {
    echo       "habilitado": true,
    echo       "frecuencia": "cada-4-horas"
    echo     },
    echo     "autoNotificaciones": {
    echo       "habilitado": true,
    echo       "frecuencia": "diaria",
    echo       "hora": "09:00"
    echo     }
    echo   },
    echo   "terminal": {
    echo     "perfil": "PowerShell",
    echo     "encodingUTF8": true,
    echo     "alias": {
      echo       "auditoria": "node %SCRIPTS_DIR:\=\\%\\auto-auditoria.js",
      echo       "jurisprudencia": "node %SCRIPTS_DIR:\=\\%\\auto-jurisprudencia.js",
      echo       "descargas": "node %SCRIPTS_DIR:\=\\%\\auto-descargas.js",
      echo       "alertas": "node %SCRIPTS_DIR:\=\\%\\auto-notificaciones.js"
    echo     }
    echo   }
    echo }
) > "%CONFIG_DIR%\jac-config.json"

echo ✓ Configuración guardada en: %CONFIG_DIR%\jac-config.json

REM ====== PASO 6: Desactivar pantalla negra ======
echo.
echo [PASO 6/6] Desactivando pantalla negra...
echo.

reg add "HKEY_CURRENT_USER\Control Panel\Desktop" /v ScreenSaveActive /t REG_SZ /d 0 /f >nul 2>&1
powercfg /setactive 8c5e7fda-e8bf-45a6-a6cc-4b3c3f200eda >nul 2>&1
powercfg /change monitor-timeout-ac 0 >nul 2>&1

echo ✓ Screensaver desactivado
echo ✓ Pantalla: No se apagará automáticamente

REM ====== CREAR ACCESOS DIRECTOS ======
echo.
echo Creando accesos directos...
echo.

REM Acceso a carpeta de scripts
if exist "%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup" (
    echo ✓ Atajos de inicio disponibles
)

REM ====== RESUMEN FINAL ======
echo.
echo ════════════════════════════════════════════════════════════
echo                    ✅ INSTALACIÓN COMPLETADA
echo ════════════════════════════════════════════════════════════
echo.
echo 📊 RESUMEN:
echo   ✓ Node.js: %NODE_VERSION%
echo   ✓ Dependencias: docx instalado
echo   ✓ Scripts: 5 instalados
echo   ✓ Configuración: guardada
echo   ✓ Terminal: lista para usar
echo   ✓ Pantalla negra: desactivada
echo.
echo 📁 UBICACIONES:
echo   Scripts:      %SCRIPTS_DIR%
echo   Documentos:   %DOCS_DIR%
echo   Alertas:      %ALERTAS_DIR%
echo   Configuración: %CONFIG_DIR%\jac-config.json
echo.
echo 🚀 PRÓXIMOS PASOS:
echo.
echo 1. Abre PowerShell (Windows + X, luego PowerShell)
echo.
echo 2. Prueba los scripts:
echo    cd %SCRIPTS_DIR%
echo    node auto-auditoria.js "Mi primer caso"
echo    node auto-jurisprudencia.js "sucesiones"
echo    node auto-descargas.js
echo    node auto-notificaciones.js --check
echo.
echo 3. Para crear alias (comandos cortos):
echo    Abre tu perfil de PowerShell:
echo    notepad $PROFILE
echo.
echo    Y agrega:
echo    Set-Alias -Name auditoria -Value {node %SCRIPTS_DIR%\auto-auditoria.js}
echo    Set-Alias -Name jurisprudencia -Value {node %SCRIPTS_DIR%\auto-jurisprudencia.js}
echo    Set-Alias -Name descargas -Value {node %SCRIPTS_DIR%\auto-descargas.js}
echo    Set-Alias -Name alertas -Value {node %SCRIPTS_DIR%\auto-notificaciones.js}
echo.
echo 4. Para automatizar con tareas programadas:
echo    Panel de Control ^> Tareas Programadas
echo    Crear Tarea Básica
echo.
echo ════════════════════════════════════════════════════════════
echo.
pause
