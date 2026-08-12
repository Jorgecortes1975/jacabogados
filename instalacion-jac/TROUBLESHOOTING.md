# 🛠️ Solucionar Problemas | JAC Automatización

Guía completa para resolver los problemas más comunes durante la instalación y uso del sistema JAC.

---

## ❌ Error: "Windows no puede ejecutar este archivo"

**Problema:** Al hacer click en `INSTALAR.bat`, aparece un aviso de seguridad de Windows.

**Solución:**

1. **Click en "Más información"** en el aviso
2. **Click en "Ejecutar de todas formas"**
3. **El script se ejecutará**

Esto es normal para archivos descargados de Internet. El script es seguro - yo lo creé.

**Alternativa:** Click derecho → Propiedades → Desbloquear → OK

---

## ❌ Error: "Requiere permisos de administrador"

**Problema:** El script dice que necesita permisos de administrador.

**Solución:**

1. **Click derecho** en `INSTALAR.bat`
2. Selecciona **"Ejecutar como administrador"**
3. Presiona **YES** en el aviso de UAC
4. Espera a que termine

---

## ❌ Error: "Node.js no está instalado"

**Problema:** El script dice que Node.js no se encuentra.

**Solución:**

1. Descarga Node.js desde: **https://nodejs.org/**
2. Selecciona la versión **LTS** (18.x o superior)
3. Instala con opciones por defecto
4. **Reinicia tu computador**
5. Ejecuta `INSTALAR.bat` nuevamente

**Verificar:** En PowerShell, escribe:
```powershell
node --version
```
Debe mostrar algo como `v18.16.0`

---

## ❌ Error: "Git no está instalado"

**Problema:** El script dice que Git no se encuentra.

**Solución:**

1. Descarga Git desde: **https://git-scm.com/**
2. Instala con opciones por defecto
3. **Cierra y reabre PowerShell**
4. Ejecuta `INSTALAR.bat` nuevamente

---

## ❌ PowerShell no ejecuta scripts

**Problema:** Al ejecutar los comandos, PowerShell dice que no puede ejecutar scripts.

**Solución:**

1. Abre PowerShell **como administrador**
2. Ejecuta este comando:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
   ```
3. Presiona **Y** (sí)
4. Cierra y reabre PowerShell
5. Intenta de nuevo

---

## ❌ Comando "audit" no se reconoce

**Problema:** En PowerShell, escribes `audit "Mi Caso"` y dice "no se reconoce".

**Solución:**

**A) El perfil no se cargó:**
```powershell
# Verifica la ruta del perfil
$PROFILE

# Copia el profile.ps1 manualmente
Copy-Item ".\profile.ps1" $PROFILE -Force

# Reinicia PowerShell
```

**B) Verificar que el perfil exista:**
```powershell
# Debe retornar $true
Test-Path $PROFILE
```

**C) Si aún no funciona:**
```powershell
# Edita el perfil manualmente
notepad $PROFILE

# Agrega estas líneas:
Set-Alias -Name audit -Value {node "C:\Users\%USERNAME%\.claude\scripts\auto-auditoria.js"} -Force
Set-Alias -Name legal -Value {node "C:\Users\%USERNAME%\.claude\scripts\auto-jurisprudencia.js"} -Force
Set-Alias -Name sync-downloads -Value {node "C:\Users\%USERNAME%\.claude\scripts\auto-descargas.js"} -Force
Set-Alias -Name alerts -Value {node "C:\Users\%USERNAME%\.claude\scripts\auto-notificaciones.js"} -Force
```

---

## ❌ El script "auto-auditoria.js" no funciona

**Problema:** Al ejecutar `audit "Mi Caso"`, hay un error.

**Solución:**

1. Verifica que Node.js está instalado:
   ```powershell
   node --version
   ```

2. Verifica que el paquete `docx` está instalado:
   ```powershell
   npm list -g docx
   ```
   
   Si no aparece, instálalo:
   ```powershell
   npm install -g docx
   ```

3. Verifica que el script está en la carpeta correcta:
   ```powershell
   ls "C:\Users\$env:USERNAME\.claude\scripts\auto-auditoria.js"
   ```

4. Prueba ejecutándolo directamente:
   ```powershell
   node "C:\Users\$env:USERNAME\.claude\scripts\auto-auditoria.js" "Mi Caso"
   ```

---

## ❌ Las auditorías no se guardan

**Problema:** El script se ejecuta pero no crea el archivo .docx

**Solución:**

1. Verifica que existe la carpeta de descargas:
   ```powershell
   ls "C:\Users\$env:USERNAME\Downloads"
   ```

2. Verifica permisos en la carpeta Downloads
   - Click derecho en Downloads
   - Propiedades
   - Seguridad
   - Verifica que tu usuario tiene permiso de escritura

3. Prueba creando la auditoría en una carpeta diferente:
   ```powershell
   cd "C:\Users\$env:USERNAME\Documents\JAC-Documentos"
   node "C:\Users\$env:USERNAME\.claude\scripts\auto-auditoria.js" "Mi Caso"
   ```

---

## ❌ "No se puede encontrar la ruta"

**Problema:** Error que menciona una ruta que no existe.

**Solución:**

1. Abre PowerShell **como administrador**
2. Ejecuta este comando para verificar la instalación:
   ```powershell
   $userdir = "C:\Users\$env:USERNAME\.claude"
   if (Test-Path $userdir) {
       Write-Host "✓ Directorio .claude existe" -ForegroundColor Green
       ls -Recurse $userdir
   } else {
       Write-Host "✗ Directorio .claude NO existe" -ForegroundColor Red
       Write-Host "Ejecuta INSTALAR.bat nuevamente como administrador"
   }
   ```

3. Si el directorio no existe, ejecuta `INSTALAR.bat` nuevamente

---

## ❌ "Acceso denegado" en scripts

**Problema:** El script no tiene permisos para leer/escribir archivos.

**Solución:**

1. Cierra el archivo si está abierto en otro programa
2. Abre PowerShell **como administrador**
3. Prueba de nuevo

**Si el problema persiste:**
```powershell
# Reinicia el terminal
exit

# Reabre PowerShell como administrador
# E intenta de nuevo
```

---

## ✅ Cómo verificar que todo está bien

```powershell
# 1. Verifica Node.js
node --version
# Debe mostrar: v18.x.x o superior

# 2. Verifica Git
git --version
# Debe mostrar: git version 2.x.x

# 3. Verifica los scripts están instalados
ls "C:\Users\$env:USERNAME\.claude\scripts\"
# Debe listar: auto-auditoria.js, auto-jurisprudencia.js, etc.

# 4. Verifica que puedes crear auditorías
audit "Test"
# Debe crear un archivo en Downloads
```

---

## 📞 Contacto / Más Ayuda

Si el problema persiste y no está aquí:

1. **Verifica la guía de instalación** en `INSTALAR-AHORA-GUIA.txt`
2. **Documenta el error** exacto que ves
3. **Incluye la salida de:**
   ```powershell
   node --version
   git --version
   $PROFILE
   ```

---

**JAC - Abogados Asociados | Sistema de Automatización Jurídica**  
Última actualización: 2026-08-12
