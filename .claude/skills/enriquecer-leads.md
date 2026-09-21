# SKILL: Enriquecer Leads sin Inventar

## Tu Trabajo en Esta Ronda

Completar huecos en teléfono, correo y redes usando otros actores de Apify. Cada dato nuevo va marcado con su origen y su confianza.

## Proceso Paso a Paso

### 1️⃣ Lee el CSV de Hoy

Abre `leads/YYYY-MM-DD.csv` que el paso anterior dejó.

Identifica cuántos tienen vacíos:
- Sin correo
- Sin teléfono
- Sin redes sociales

### 2️⃣ Prioriza Qué Completar

Orden de importancia:
1. **Correo** (más importante para contacto)
2. **Teléfono** (backup de contacto)
3. **Redes sociales** (validación de empresa)

### 3️⃣ Elige el Actor para Cada Hueco

**Si falta CORREO:**
- Entra al sitio web del negocio (usa: apify--web-fetch)
- Busca página "Contacto", "Nosotros", "Equipo"
- Extrae correo verificable o marca "no encontrado"

**Si falta TELÉFONO:**
- Google Maps trae teléfono si no lo trajo antes
- Usa: compass/crawler-google-places con el nombre del negocio

**Si falta REDES:**
- Instagram: apify/instagram-profile-scraper
- LinkedIn: harvestapi/linkedin-company-employees

### 4️⃣ Estima Costo por Lote

Divide los registros en lotes de 10-15 contactos.

**Ejemplo:**
```
Lote 1: 10 contactos sin correo
Costo estimado: 10 × $0.002 = $0.02 USD
Presupuesto disponible: $28 USD
¿Procedo? ✅ SÍ
```

**Muestra estimado y espera OK antes de cada lote.**

### 5️⃣ Corre el Actor y Extrae Datos

Guarda temporalmente en un CSV auxiliar:

```
negocio | dato_encontrado | origen | confianza | fecha
```

Donde:
- **origen:** "sitio_web" | "red_social" | "directorio" | "no_encontrado"
- **confianza:** "alta" | "media" | "baja" | "no_encontrado"

### 6️⃣ Fusiona con CSV Principal

Actualiza `leads/YYYY-MM-DD.csv` agregando:
- Datos nuevos en columnas correspondientes
- Nueva columna: **origen_correo** (si es correo nuevo)
- Nueva columna: **confianza** (nivel de confiabilidad)

**Reglas de confianza:**

| Origen | Confianza |
|--------|-----------|
| Email en sitio web oficial del negocio | ALTA |
| Email en Google My Business | MEDIA |
| Email en LinkedIn empresa | MEDIA |
| Email en directorio B2B | MEDIA |
| Email en red social pública | BAJA |
| Email genérico tipo info@, contacto@ | BAJA |
| Email de patrón (nombre.apellido@) | ❌ NO HAGAS ESTO |

### 7️⃣ Marca los Descartables

Mientras enriqueces, identifica empresas que deben salir:

**Descarta si:**
- Empresa cerró (aparece "Cerrado" en Maps)
- Cambió de ramo (ya no es formato)
- Email rebota (aparece inválido)
- No es un negocio formal

Crea archivo `descartados.csv` con motivo:

```
negocio | razon_descarte | fecha
```

### 8️⃣ Reporte de Enriquecimiento

Sin adornos:

1. Contactos iniciados: X
2. Con correo de confianza ALTA: Y
3. Con correo de confianza MEDIA: Z
4. Solo con teléfono (sin correo): W
5. Descartados y por qué: V
6. Costo total gastado
7. Próximo paso: "Listos para calificar" o "Necesita segunda pasada"

---

## Lo Que NO Hagas

❌ **NO inventes correos.** Si no lo encuentras, es "sin dato"  
❌ **NO uses generadores de patrón** (nombre.apellido@dominio)  
❌ **NO marques "media" cuando es "baja"** solo porque urgue terminar  
❌ **NO gastes más del presupuesto** sin avisar  
❌ **NO repitas trabajo** de actualizaciones previas  

---

## Regla de Oro

**Un contacto sin correo verificable se queda como "sin dato" y sigue en la lista con su teléfono.**

Prefiero llamarle a mandarle un correo que rebota. No quemamos reputación de dominio.

---

## Checklist Antes de Avanzar

- [ ] CSV actualizado con nuevos datos
- [ ] Cada nuevo dato tiene origen + confianza
- [ ] Archivo descartados.csv creado (si hay)
- [ ] Costo total informado y dentro de presupuesto
- [ ] Reporte generado con los 7 números
- [ ] Archivo guardado: leads/YYYY-MM-DD.csv (actualizado)

---

**Skill:** enriquecer-leads.md  
**Versión:** 1.0  
**Actualizado:** 2026-09-21
