# Clientes - Gestión de Información

Directorio de información y configuración de cada cliente.

## 📁 Estructura por Cliente

Cada cliente tiene su propio directorio con la siguiente estructura:

```
clients/
└── nombre-cliente/
    ├── config.json           # Configuración del cliente
    ├── proyectos.json        # Proyectos asociados
    ├── contactos.json        # Datos de contacto
    └── datos-extraidos/      # Datasets del cliente
```

## 📋 Crear Nuevo Cliente

### 1. Copiar Plantilla

```bash
cp -r ../templates/cliente-template.json clientes/mi-cliente/config.json
```

### 2. Completar Información

```json
{
  "cliente": {
    "id": "mi-cliente",
    "nombre": "Nombre Empresa",
    "tipoUsuario": "corporativo",
    "contacto": {
      "email": "contacto@empresa.com",
      "telefono": "+57 1 XXXXXXX"
    }
  },
  "proyectos": ["proyecto-id-1"]
}
```

### 3. Agregar Proyectos

Crear `proyectos.json` con lista de proyectos activos.

## 🔐 Datos Confidenciales

**Nota:** Cualquier carpeta o archivo sensible debe agregarse a `.gitignore`:

```
clients/**/cliente-privado/
clients/**/*.encripted
clients/**/SSN/
clients/**/documentos-legales-privados/
```

## 📊 Monitoreo de Clientes

Ver estado de todos los clientes:

```bash
# Listar todos los clientes
ls -la clients/

# Ver configuración de un cliente
cat clients/mi-cliente/config.json

# Ver proyectos de un cliente
cat clients/mi-cliente/proyectos.json
```

## ✅ Validación

Antes de activar un cliente, verificar:
- [ ] ID único en el sistema
- [ ] Nombre completo del cliente
- [ ] Contacto válido
- [ ] Proyectos bien vinculados
- [ ] Permisos de archivo correctos

## 🔄 Ciclo de Vida

1. **Creación** → Copiar plantilla y completar datos
2. **Validación** → Revisar configuración
3. **Activación** → Estado "activo" en config.json
4. **Operación** → Ejecutar proyectos y extraer datos
5. **Archivo** → Cambiar estado a "inactivo" cuando finaliza

---

**Última actualización:** 2026-09-21
