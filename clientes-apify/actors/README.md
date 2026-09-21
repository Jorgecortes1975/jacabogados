# Actores - Definiciones de Scrapers

Directorio de definiciones de actores de Apify que implementan la extracción de datos.

## 🎬 ¿Qué es un Actor?

Un **Actor en Apify** es un script ejecutable en la nube que:
- Extrae datos de fuentes web
- Procesa información estructurada
- Retorna datos en formato JSON/CSV
- Se ejecuta bajo demanda o en horario

## 📄 Formato de Definición

Cada actor se define en un archivo JSON con estructura:

```json
{
  "actor": {
    "id": "actor-unique-id",
    "nombre": "Nombre Descriptivo",
    "apifyActorId": "Wx1hA2b3Cd4E",
    "descripcion": "Qué extrae y de dónde"
  },
  "entrada": {
    "schema": {...},
    "ejemplo": {...}
  },
  "salida": {
    "formato": "json",
    "schema": {...}
  }
}
```

## 📋 Actores Disponibles

### 1. Jurisprudencia de Cortes

**Archivo:** `jurisprudencia-cortes.json`

Extrae sentencias de:
- Corte Constitucional
- Corte Suprema de Justicia
- Consejo de Estado

### 2. Normas y Leyes

**Archivo:** `normas-leyes.json`

Extrae de:
- SUIN Juriscol
- Diario Oficial
- Congreso de la República

### 3. Datos Empresariales

**Archivo:** `datos-empresariales.json`

Extrae información de:
- Cámaras de Comercio
- Superintendencia de Sociedades

## 🚀 Crear Nuevo Actor

### 1. Usar Plantilla

```bash
cp ../templates/actor-template.json mi-nuevo-actor.json
```

### 2. Personalizar Configuración

```json
{
  "actor": {
    "id": "mi-actor",
    "nombre": "Mi Actor Custom",
    "apifyActorId": "obtener-de-apify"
  },
  "entrada": {
    "schema": {
      "properties": {
        "palabraClave": {
          "type": "string",
          "description": "Término de búsqueda"
        }
      }
    }
  }
}
```

### 3. Registrar en Sistema

Agregar entrada en `config/actores-disponibles.json`:

```json
{
  "id": "mi-actor",
  "nombre": "Mi Actor Custom",
  "apifyActorId": "abc123def456",
  "estado": "desarrollo"
}
```

## 📦 Input Schema

Define qué parámetros acepta el actor:

```json
{
  "type": "object",
  "required": ["startUrl"],
  "properties": {
    "startUrl": {
      "type": "string",
      "description": "URL inicial"
    },
    "maxRequests": {
      "type": "integer",
      "default": 100
    }
  }
}
```

## 📤 Output Schema

Define la estructura de datos retornados:

```json
{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "url": {"type": "string"},
      "titulo": {"type": "string"},
      "fechaPublicacion": {"type": "string", "format": "date-time"},
      "contenido": {"type": "string"}
    }
  }
}
```

## 🔧 Configuración de Ejecución

```json
{
  "configuracion": {
    "timeout": 300000,
    "retries": 3,
    "buildTag": "latest",
    "memoryMbytes": 1024
  }
}
```

## 📊 Estados de Desarrollo

- **desarrollo** - En construcción y pruebas
- **beta** - Pruebas con clientes piloto
- **produccion** - Listo para uso general
- **mantenimiento** - En reparación
- **deprecado** - Será descontinuado

## ✅ Checklist de Validación

Antes de marcar un actor como "producción":

- [ ] Input schema validado
- [ ] Output schema completo
- [ ] Ejemplos de ejecución funcionando
- [ ] Manejo de errores implementado
- [ ] Documentación actualizada
- [ ] Registrado en `actores-disponibles.json`
- [ ] Pruebas con datos reales exitosas

---

**Última actualización:** 2026-09-21
