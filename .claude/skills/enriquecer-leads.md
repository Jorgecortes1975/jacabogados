# Manual: Cómo Enriquecer Leads — Completar Datos, Verificar Calidad

**Propósito:** Complementar datos faltantes (teléfono, correo, LinkedIn) sin inventar, verificar que cada empresa califica según perfil-cliente.md, y marcar confianza.

---

## 🎯 OBJETIVO

De 50 empresas crudas de data-empresarial, llegar a:
- 30-40 con teléfono verificado
- 25-35 con correo verificado
- 25-35 con Gerente RRHH identificado en LinkedIn
- 100% descartadas las que incumplen perfil

---

## 🔄 FLUJO DE ENRIQUECIMIENTO

```
1. Leer leads/YYYY-MM-DD-leads.csv (crudo)
   ↓
2. Para CADA empresa:
   a) Verificar si ya está en ya-contactados.csv → SALTAR si existe
   b) Aplicar descartes (perfil-cliente.md) → MOVER a descartados si aplica
   c) Contar señales de calificación (≥3 = califica)
   d) Buscar Gerente RRHH en LinkedIn → completar nombre, cargo, URL
   e) Buscar teléfono en web pública → completar si falta
   f) Buscar correo en web pública → completar si falta
   ↓
3. Guardar en leads/YYYY-MM-DD-enriquecido.csv
   ↓
4. Guardar rechazos en leads/YYYY-MM-DD-descartados.csv

---

## ✅ MATRIZ DE ENRIQUECIMIENTO

Para cada empresa, llenar esta matriz:

| Campo | Origen | Verificado | Confianza |
|-------|--------|-----------|-----------|
| Tamaño (empleados) | data-empresarial | Sí | Alta |
| Sector | data-empresarial | Sí | Alta |
| Teléfono | data-empresarial \| web | Verificar | Media-Alta |
| Correo | data-empresarial \| web | Verificar | Media |
| Gerente RRHH | linkedin-company-employees | Sí | Alta |
| LinkedIn URL | LinkedIn | Sí | Alta |
| Ubicación | data-empresarial | Sí | Alta |
| Estado | data-empresarial | Sí | Alta |

---

## 🔍 BÚSQUEDA DE DATOS FALTANTES

### Si falta Teléfono:
1. Buscar en Google: "[Empresa] Medellín teléfono"
2. Buscar en sitio web de la empresa
3. Llamar al 1900 de Cámara de Comercio (último recurso)
4. Si no encuentra: marcar como "sin dato" (NO inventar)

### Si falta Correo:
1. Buscar en sitio web de la empresa (contacto@)
2. Buscar en LinkedIn (empresa)
3. Buscar en directorio telefónico en línea
4. Si no encuentra: marcar como "sin dato" (NO inventar patrones)

### Si falta Gerente RRHH:
1. Buscar en LinkedIn: "[Empresa] Gerente RRHH"
2. Filtrar por ubicación: Medellín o Bogotá
3. Confirmar que está actualmente empleado (fecha de actualización reciente)
4. Si no encuentra: intentar con "Jefe RRHH" o "Director Talento"
5. Si no encuentra: marcar como "sin contacto específico"

---

## 🚫 DESCARTES AUTOMÁTICOS

Aplicar INMEDIATAMENTE sin revisar más datos:

**Si cumple CUALQUIERA de estos, DESCARTAR:**
- Multinacional extranjera (matriz en otro país)
- Sector público (dominio .gov.co)
- Sector financiero/asegurador (Banco, Seguros)
- < 50 empleados
- Persona natural (no NIT de empresa)

**Guardar descartes en:** `leads/YYYY-MM-DD-descartados.csv`

**Columnas:**
```
razonSocial | nit | razon_descarte | tipo_descarte
```

---

## ✅ CALIFICACIÓN: CONTAR SEÑALES

Para cada empresa que NO fue descartada:

| Señal | ¿Cumple? | Contador |
|-------|----------|----------|
| 50-500 empleados | Sí | +1 |
| Gerente RRHH identificado | Sí | +1 |
| Menciona nómina/RRHH | Sí | +1 |
| Ubicación Med/Bog | Sí | +1 |
| Activa (últimos 12 meses) | Sí | +1 |
| **Total** | | ? |

**Decisión:**
- Total ≥ 3 = **CALIFICA** (Grado A o B según datos disponibles)
- Total = 2 = **GRADO C** (revisar después)
- Total < 2 = **DESCARTE**

---

## 📊 ESTRUCTURA DE CSV ENRIQUECIDO

**Archivo:** `leads/YYYY-MM-DD-enriquecido.csv`

**Columnas:**
```
grado | negocio | nit | empleados | sector | ciudad | gerente_nombre | gerente_cargo | gerente_linkedin | telefono | correo | sitio_web | actividad_economica | estado | señales_calificacion | porque | confianza_gerente | confianza_telefono | confianza_correo | fuente | fecha
```

**Ejemplo:**
```
A | Empresa Medellín S.A.S. | 900123456 | 75 | Servicios Profesionales | Medellín | Juan Pérez | Gerente RRHH | https://linkedin.com/in/juanperez | +57 4 3123456 | contacto@empresa.com.co | https://empresa.com.co | 6201 | activa | 5 | Tamaño, Gerente identificado, nómina, ubicación, reciente | Alta | Alta | Media-Alta | data-empresarial + LinkedIn | 2026-09-21
```

---

## 🔐 REGLA DE ORO: NUNCA INVENTAR

- Teléfono: Si no existe, "sin dato"
- Correo: Si no existe, "sin dato"
- Gerente: Si no existe verificable, "sin identificación"
- Patrón de correo: NUNCA usar nombre@empresa.com si no lo verificaste

---

## 📝 NOTAS CRÍTICAS

1. **Confianza:** Marcar si dato viene de fuente oficial (Alto) o web (Medio) o estimado (Bajo)
2. **No completar RRHH inventado:** Si no aparece en LinkedIn, no inventar nombre
3. **No sobreescribir:** Siempre guardar enriquecido como archivo nuevo
4. **Rastreabilidad:** Cada dato debe traer origen (fuente) para después
