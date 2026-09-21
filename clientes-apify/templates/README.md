# Templates - Plantillas de Configuración

Directorio de plantillas reutilizables para crear nuevos clientes, actores y proyectos.

## 📋 Plantillas Disponibles

### 1. Cliente Template

**Archivo:** `cliente-template.json`

Estructura base para crear nuevos clientes:

```bash
cp cliente-template.json ../clients/nuevo-cliente/config.json
```

**Contiene:**
- Información del cliente (nombre, contacto, ubicación)
- Configuración de actores asignados
- Parámetros de extracción y retención de datos
- Metadata de creación

**Personalización:**
```json
{
  "cliente": {
    "id": "mi-empresa-legal",
    "nombre": "Mi Empresa Legal S.A.S.",
    "tipoUsuario": "corporativo"
  }
}
```

### 2. Actor Template

**Archivo:** `actor-template.json`

Estructura base para definir nuevos actores de Apify:

```bash
cp actor-template.json ../actors/mi-nuevo-actor.json
```

**Contiene:**
- Metadatos del actor (nombre, descripción, versión)
- Input schema (parámetros aceptados)
- Output schema (estructura de datos retornados)
- Configuración de ejecución (timeout, retries, memoria)

**Personalización:**
```json
{
  "actor": {
    "id": "scraper-jurisprudencia-custom",
    "nombre": "Scraper Jurisprudencia Custom",
    "apifyActorId": "abc123def456"
  }
}
```

### 3. Proyecto Template

**Archivo:** `proyecto-template.json`

Estructura base para crear nuevos proyectos:

```bash
cp proyecto-template.json ../clients/mi-cliente/proyectos.json
```

**Contiene:**
- Información del proyecto (nombre, objetivos, alcance)
- Configuración de actores a usar
- Parámetros de búsqueda y filtrado
- Cronograma y periodicidad
- Definición de entregables

**Personalización:**
```json
{
  "proyecto": {
    "id": "investigacion-jurisprudencia-2026",
    "nombre": "Investigación Jurisprudencia Civil 2026",
    "clienteId": "mi-cliente",
    "objetivos": [
      "Recopilar sentencias sobre responsabilidad civil",
      "Identificar precedentes relevantes",
      "Analizar tendencias jurisprudenciales"
    ]
  }
}
```

## 🚀 Flujo de Creación con Templates

### Escenario 1: Agregar Nuevo Cliente

```bash
# 1. Crear directorio del cliente
mkdir -p ../clients/cliente-nuevo

# 2. Copiar plantilla de cliente
cp cliente-template.json ../clients/cliente-nuevo/config.json

# 3. Editar configuración
nano ../clients/cliente-nuevo/config.json

# 4. Crear proyectos
cp proyecto-template.json ../clients/cliente-nuevo/proyectos.json

# 5. Editar proyectos
nano ../clients/cliente-nuevo/proyectos.json

# 6. Crear directorio de datos
mkdir -p ../datasets/cliente-nuevo
```

### Escenario 2: Registrar Nuevo Actor

```bash
# 1. Copiar plantilla de actor
cp actor-template.json ../actors/nuevo-actor.json

# 2. Personalizar configuración
nano ../actors/nuevo-actor.json

# 3. Registrar en sistema
# Editar config/actores-disponibles.json y agregar:
{
  "id": "nuevo-actor",
  "nombre": "Mi Actor Nuevo",
  "apifyActorId": "obtener-de-apify",
  "estado": "desarrollo"
}

# 4. Validar esquemas
# Verificar input y output schemas en actor.json
```

### Escenario 3: Crear Proyecto para Cliente Existente

```bash
# 1. Usar plantilla
cp proyecto-template.json ../clients/cliente-existente/nuevo-proyecto.json

# 2. Personalizar
nano ../clients/cliente-existente/nuevo-proyecto.json

# 3. Vincular actores
# En nuevo-proyecto.json, agregar IDs de actores a usar

# 4. Crear almacenamiento
mkdir -p ../datasets/cliente-existente/nuevo-proyecto
```

## 📝 Mejores Prácticas

### Al Usar Templates

1. **Copiar, NO editar original**
   ```bash
   ✓ cp actor-template.json ../actors/nuevo-actor.json
   ✗ Editar actor-template.json directamente
   ```

2. **Validar JSON después de personalizar**
   ```bash
   jq . ../actors/nuevo-actor.json
   ```

3. **Registrar cambios en sistema**
   - Agregar nuevo cliente a registro
   - Registrar nuevo actor en `actores-disponibles.json`
   - Documentar objetivo del proyecto

4. **Documentar decisiones**
   - ¿Por qué este actor?
   - ¿Qué datos se necesitan?
   - ¿Cuál es el objetivo?

## 🔍 Validación de Templates

Antes de usar un template:

```bash
# Verificar sintaxis JSON
jq . cliente-template.json > /dev/null && echo "OK" || echo "ERROR"

# Ver estructura
jq 'keys' cliente-template.json

# Ver ejemplo de entrada
jq '.entrada.ejemplo' actor-template.json
```

## 📦 Versionado de Templates

Los templates se versionan para mantener compatibilidad:

```json
{
  "metadata": {
    "templateVersion": "1.0",
    "createdAt": "2026-09-21",
    "compatibleConVersionSistema": "1.0"
  }
}
```

Cuando cambien los templates:
- Actualizar versión
- Mantener compatibilidad hacia atrás
- Documentar cambios en CHANGELOG

## 🛠️ Personalización Avanzada

### Extender un Template

```bash
# 1. Copiar plantilla
cp actor-template.json ../actors/custom-actor.json

# 2. Personalizar input schema
jq '.entrada.schema.properties |= . + {
  "filtroAvanazado": {
    "type": "object",
    "description": "Filtros personalizados"
  }
}' ../actors/custom-actor.json > temp && mv temp ../actors/custom-actor.json

# 3. Validar resultado
jq . ../actors/custom-actor.json
```

## 📞 Troubleshooting

**Problema:** Template JSON no válido
```bash
# Verificar sintaxis
jq . template.json
```

**Problema:** Campos faltantes
```bash
# Comparar con original
diff template.json cliente-template.json
```

**Problema:** Configuración incompatible
```bash
# Revisar templateVersion
jq '.metadata.templateVersion' template.json
```

---

**Última actualización:** 2026-09-21
