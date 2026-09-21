# Datasets - Almacenamiento de Datos Extraídos

Directorio central para almacenamiento de datos extraídos por los actores de Apify.

## 📁 Estructura de Organización

```
datasets/
└── cliente-id/
    └── proyecto-id/
        ├── actor-id/
        │   ├── 2026-09-21/
        │   │   ├── run-001.json
        │   │   └── run-001-metadata.json
        │   └── 2026-09-20/
        │       ├── run-001.json
        │       └── run-001-metadata.json
        └── reportes/
            ├── reporte-final.json
            └── resumen-ejecutivo.md
```

## 💾 Tipos de Datos

### 1. Datos Brutos (JSON)
Salida directa del actor de Apify

**Nombre:** `run-[numero].json`

```json
{
  "items": [
    {
      "url": "https://...",
      "titulo": "...",
      "contenido": "...",
      "fechaExtraccion": "2026-09-21T10:30:00Z"
    }
  ]
}
```

### 2. Metadata de Ejecución
Información sobre la ejecución del actor

**Nombre:** `run-[numero]-metadata.json`

```json
{
  "ejecucion": {
    "id": "run-001",
    "actor": "actor-id",
    "clienteId": "cliente-id",
    "proyectoId": "proyecto-id",
    "inicio": "2026-09-21T10:00:00Z",
    "fin": "2026-09-21T10:30:00Z",
    "duracionMs": 1800000,
    "estado": "exitoso",
    "itemsExtraidos": 150,
    "errores": []
  }
}
```

### 3. Reportes Procesados
Datos después de procesamiento y análisis

**Nombre:** `reporte-[tipo].json`

### 4. Análisis Jurídico
Análisis realizado por el agente especializado

**Nombre:** `analisis-juridico.json`

```json
{
  "proyecto": "proyecto-id",
  "fechaAnalisis": "2026-09-21T11:00:00Z",
  "datosExtraidos": 150,
  "datosAnalizados": 145,
  "hallazgos": [
    {
      "id": "hallazgo-001",
      "tipo": "jurisprudencia",
      "relevancia": "alta",
      "descripcion": "...",
      "fuente": "Corte Constitucional"
    }
  ]
}
```

## 🔄 Flujo de Datos

```
Actor de Apify
    ↓
run-XXX.json (datos brutos)
run-XXX-metadata.json (metadata)
    ↓
Agente Jurídico Especializado
    ↓
analisis-juridico.json (análisis)
reporte-final.json (reporte ejecutivo)
```

## 📊 Consultas de Datos

### Obtener datos más recientes de un proyecto

```bash
ls -lt datasets/cliente-id/proyecto-id/actor-id/ | head -1
```

### Ver metadata de una ejecución

```bash
cat datasets/cliente-id/proyecto-id/actor-id/2026-09-21/run-001-metadata.json
```

### Contar items extraídos

```bash
jq '.items | length' datasets/cliente-id/proyecto-id/actor-id/2026-09-21/run-001.json
```

## 🔒 Políticas de Retención

- **Datos brutos:** 90 días
- **Metadata:** 1 año
- **Reportes finales:** Indefinido
- **Datos sensibles:** Encriptados, retención reducida

## 🛡️ Backup y Recuperación

Datos importantes son respaldados automáticamente:

```bash
# Backup manual de un proyecto
tar -czf datasets/cliente-id/proyecto-id.tar.gz \
  datasets/cliente-id/proyecto-id/
```

## 📈 Monitoreo de Almacenamiento

```bash
# Ver tamaño total de datasets
du -sh datasets/

# Ver por cliente
du -sh datasets/*/

# Ver por proyecto
du -sh datasets/*/*/
```

## ✅ Validación de Datasets

Todo dataset debe incluir:
- [ ] `run-XXX.json` (datos brutos)
- [ ] `run-XXX-metadata.json` (metadata)
- [ ] Fechas consistentes
- [ ] Formato JSON válido
- [ ] Validación de esquema

---

**Última actualización:** 2026-09-21
