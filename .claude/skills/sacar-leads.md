# SKILL: Sacar Leads con Apify

## Tu Trabajo en Esta Ronda

Traer una lista cruda de contactos sin filtrar, directamente del scraper elegido. La calidad se verifica después; aquí solo obtener datos.

## Proceso Paso a Paso

### 1️⃣ Lee y Entiende el Contexto
- Lee `CLAUDE-agente-prospection.md` (memoria del agente)
- Lee `perfil-cliente.md` (quién buscamos)
- Identifica qué ciudad/sector vamos a atacar hoy

### 2️⃣ Elige el Actor Correcto

Pregúntate:
- ¿Buscamos negocios locales? → Google Maps
- ¿Buscamos decisores por cargo? → LinkedIn
- ¿Buscamos validar empresas? → Google Places

**Decisión:**
- Primario: lukaskrivka/google-maps-with-contact-details (Google Maps + contacto)
- Secundario: harvestapi/linkedin-company-employees (LinkedIn empresas)
- Backup: compass/crawler-google-places (Google Places)

### 3️⃣ Arma los Parámetros Exactos

Antes de gastar un crédito, muestra los parámetros:

**Ejemplo Google Maps:**
```
Ubicación: Bogotá, Colombia
Categoría: Office / Business Services
Filtro mínimo: 4 estrellas, 20+ reseñas
Palabra clave: "empresas"
Resultados: 30 (prueba)
```

**Ejemplo LinkedIn:**
```
Título del puesto: "Gerente General"
Ubicación: Colombia
Tamaño empresa: 20-100 empleados
Experiencia mínima: 3 años
Resultados: 30 (prueba)
```

### 4️⃣ Estima Costo ANTES de Correr

**Fórmula:**
- Google Maps con contacto: ~$0.005 por resultado = $0.15 por 30
- LinkedIn por perfil: ~$0.003 por resultado = $0.09 por 30
- Google Places: ~$0.004 por resultado = $0.12 por 30

**Muestra el cálculo y espera OK** antes de gastar créditos.

### 5️⃣ Corre el Actor con los Parámetros Aprobados

Usa el MCP de Apify para llamar `call-actor` con:
- Actor ID exacto
- Parámetros validados
- Sin cambios sobre la marcha

Espera a que termine la ejecución.

### 6️⃣ Extrae los Datos al CSV

**Columnas exactas en este orden (NO CAMBIES):**

```
negocio | contacto | puesto | telefono | correo | sitio_web | instagram | linkedin | ciudad | rating | resenas | senal_de_calificacion | fuente | fecha
```

**Reglas para llenar:**

| Campo | Regla |
|-------|-------|
| **negocio** | Nombre exacto como aparece en Maps/LinkedIn |
| **contacto** | Nombre de la persona de contacto (si la hay) |
| **puesto** | "Gerente General", "Administrador", "CEO" (o sin dato) |
| **telefono** | Con indicativo (+57 si es Colombia) o "sin dato" |
| **correo** | Email exacto o "sin dato" (NUNCA inventar) |
| **sitio_web** | URL o "sin dato" |
| **instagram** | Usuario exacto (@...) o "sin dato" |
| **linkedin** | URL de perfil empresa o "sin dato" |
| **ciudad** | Bogotá, Medellín, Cali |
| **rating** | Número 1-5 o "sin dato" |
| **resenas** | Cantidad numérica o "sin dato" |
| **senal_de_calificacion** | Justificación según perfil-cliente.md (ej: "4.8 estrellas, 120 reseñas, sector comercial formal") |
| **fuente** | Actor exacto: "google-maps-with-contact" o "linkedin-company-employees" |
| **fecha** | YYYY-MM-DD |

### 7️⃣ Guarda en Carpeta Correcta

**Ruta:** `leads/YYYY-MM-DD.csv`
**Nombre:** Usa la fecha de hoy
**Formato:** UTF-8, sin BOM, separador pipe (|)

### 8️⃣ Reporte Rápido

Cuéntame sin adornos:

1. Actor elegido y por qué
2. Parámetros exactos que usaste
3. Costo total gastado en esta corrida
4. Número de resultados traídos
5. Si menos del 50% califica → propón cambiar búsqueda

---

## Lo Que NO Hagas

❌ **NO inventes datos.** Si no lo trae el scraper, escribe "sin dato"  
❌ **NO deduzcas correos** tipo contacto@empresa.com  
❌ **NO cambies parámetros sobre la marcha** sin avisar  
❌ **NO repitas contactos** que ya estén en leads/ o en memoria/  
❌ **NO gastes más del presupuesto** sin avisar antes  

---

## Checklist Antes de Guardar

- [ ] Columnas en orden exacto (negocio | contacto | ... | fecha)
- [ ] Sin datos inventados (todo es "sin dato" o verificable)
- [ ] Sin repetidos de leads/ o memoria/
- [ ] Costo informado y aprobado
- [ ] Archivo guardado como leads/YYYY-MM-DD.csv
- [ ] Reporte generado sin adornos

---

**Skill:** sacar-leads.md  
**Versión:** 1.0  
**Actualizado:** 2026-09-21
