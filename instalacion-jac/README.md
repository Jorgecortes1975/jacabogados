# 🚀 JAC - Automatización Jurídica | Paquete de Instalación

**Sistema completo de automatización legal para abogados colombianos**

Este paquete contiene todo lo necesario para instalar y configurar el sistema JAC en tu computador.

---

## 📋 Contenido del Paquete

```
instalacion-jac/
├── INSTALAR.bat                    ← Ejecutar esto primero
├── INSTALAR-AHORA-GUIA.txt        ← Instrucciones paso a paso
├── profile.ps1                     ← Configuración de PowerShell
├── scripts/
│   ├── auto-auditoria.js          ← Generar auditorías
│   ├── auto-jurisprudencia.js     ← Buscar jurisprudencia
│   ├── auto-descargas.js          ← Organizar descargas
│   └── auto-notificaciones.js     ← Gestionar alertas
├── TROUBLESHOOTING.md             ← Solucionar problemas
└── README.md                      ← Este archivo
```

---

## ⚡ Instalación Rápida (3 pasos)

### PASO 1: Ejecutar el Instalador

1. **Click derecho** en `INSTALAR.bat`
2. Selecciona **"Ejecutar como administrador"**
3. Presiona **YES** en el aviso de permisos
4. Espera a que termine (~1-2 minutos)

### PASO 2: Configurar PowerShell

1. Presiona **Windows + X**
2. Selecciona **"Windows PowerShell (Admin)"**
3. Copia y pega este comando:
   ```powershell
   New-Item -Path $PROFILE -Type File -Force | Out-Null
   Copy-Item ".\profile.ps1" $PROFILE -Force
   Write-Host "✓ Perfil instalado" -ForegroundColor Green
   ```
4. Presiona **ENTER**
5. Reinicia PowerShell

### PASO 3: Probar los Comandos

En PowerShell, ejecuta:
```powershell
audit "Mi Caso"              # Generar auditoría
legal "jurisprudencia"       # Buscar jurisprudencia
sync-downloads               # Organizar descargas
alerts check                 # Ver alertas
```

---

## 📁 Dónde se Instala

```
C:\Users\JorgeCortés\
├── .claude\
│   ├── scripts\             ← Scripts de automatización
│   └── config\              ← Configuración
├── Documents\
│   ├── JAC-Documentos\      ← Tus auditorías
│   ├── JAC-Alertas\         ← Vencimientos
│   └── JAC-Logs\            ← Registros
└── Downloads\               ← Se organiza automáticamente
```

---

## 🛠️ Requisitos

- ✅ Windows 10 o superior
- ✅ Node.js 18+ (se descarga si no lo tienes)
- ✅ Git (se descarga si no lo tienes)
- ✅ Permisos de administrador

---

## 📞 ¿Problemas?

Ver `TROUBLESHOOTING.md` para soluciones a los problemas más comunes.

---

## ✅ Verificación

Después de instalar, ejecuta:
```powershell
# Ver versiones instaladas
node --version
git --version
```

Ambos deben mostrar versiones (ej: v18.16.0).

---

**JAC - Abogados Asociados | Sistema de Automatización Jurídica**  
Última actualización: 2026-08-12
