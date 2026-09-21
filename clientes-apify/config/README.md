# Configuración - Clientes Apify

Directorio de configuración global del sistema de Clientes Apify.

## 📄 Archivos

### `global-settings.json`
Configuración general del sistema:
- Credenciales de Apify
- Rutas de almacenamiento
- Parámetros de logging
- Políticas de seguridad

**Importante:** NO commitar `apify-credentials.json` (está en .gitignore)

### `actores-disponibles.json`
Registro centralizado de actores de Apify:
- ID y nombre de cada actor
- Fuentes de datos que maneja
- Estado de integración
- IDs de Apify (ActorId, TaskId)

## 🔧 Uso

### 1. Configurar Credenciales

```bash
# Crear archivo de credenciales (NO será commiteado)
cat > apify-credentials.json << 'EOF'
{
  "apiToken": "your-apify-token-here",
  "userId": "your-apify-user-id"
}
EOF
```

### 2. Registrar Nuevo Actor

Agregar entrada en `actores-disponibles.json`:

```json
{
  "id": "nuevo-actor",
  "nombre": "Descripción del Actor",
  "apifyActorId": "actor-id-from-apify",
  "estado": "disponible"
}
```

### 3. Actualizar Configuración Global

Editar `global-settings.json` para cambiar comportamiento del sistema.

## 🔒 Seguridad

- ✓ Credenciales gitignored
- ✓ Permisos restrictivos en config/
- ✓ Auditoría de cambios en logs/
- ✓ Validación de configuración en startup

## 📋 Checklist de Configuración Inicial

- [ ] Crear `apify-credentials.json`
- [ ] Validar token de Apify
- [ ] Registrar actores disponibles
- [ ] Configurar rutas de almacenamiento
- [ ] Establecer políticas de logging

---

**Última actualización:** 2026-09-21
