# Perfil de Cliente Ideal — Criterios de Calificación

**Última actualización:** 2026-09-21  
**Propietario:** Agente de Prospección

---

## 🎯 CLIENTE IDEAL RESUMIDO

| Atributo | Valor |
|----------|-------|
| **Tamaño** | 50-500 empleados |
| **Ubicación** | Medellín, Bogotá |
| **Rol Decisor** | Gerente de RRHH |
| **Sectores** | Servicios Profesionales, Retail, Manufactura |
| **Estado** | Empresa activa |

---

## ✅ SEÑALES DE CALIFICACIÓN (Sí es cliente si cumple ≥3)

### 1. Tamaño: 50-500 Empleados

**Verificación:**
- Buscar en Cámara de Comercio: "empleados_reportados"
- Confirmar en LinkedIn: tamaño de compañía
- Fuente: data-empresarial actor de Apify

**Por qué:** Nómina pequeña (<50) = no tiene problema. Nómina grande (>500) = ya tiene equipo legal.

### 2. Gerente de RRHH Identificable

**Verificación:**
- Buscar nombre completo en LinkedIn (empresa + puesto)
- Confirmar que es "Gerente RRHH", "Jefe RRHH", "Director Talento"
- NO acepta: "Coordinador", "Asistente", "Analista"
- Fuente: linkedin-company-employees actor de Apify

**Por qué:** Quien toma decisiones de servicios legales en nómina. Nivel clave = poder de decisión.

### 3. Mención de Nómina / Payroll / Seguridad Social

**Verificación:**
- Buscar en descripción de empresa en Cámara de Comercio: "nómina", "payroll", "seguridad social", "RRHH"
- Buscar en sitio web de la empresa: mencionan servicios relacionados
- Buscar en LinkedIn: descripción de empresa o descripción del Gerente RRHH
- Fuente: data-empresarial + web scraping

**Por qué:** Indica que ya es consciente del tema. Menor tiempo de venta.

### 4. Ubicación Confirmada: Medellín o Bogotá

**Verificación:**
- Cámara de Comercio: ciudad de registro
- LinkedIn: "ubicación de la empresa"
- Sitio web: dirección física
- Fuente: data-empresarial actor de Apify

**Por qué:** Restricción geográfica por cliente actual. Expandir solo después de consolidar.

### 5. Recencia: Actividad en Últimos 12 Meses

**Verificación:**
- Cámara de Comercio: estado "activa"
- Fecha de última actualización registral < 1 año
- LinkedIn: actividad reciente (posts, actualizaciones)
- Fuente: data-empresarial actor de Apify

**Por qué:** Empresa viva = decisor disponible. Empresa muerta = tiempo perdido.

---

## 🚫 SEÑALES DE DESCARTE — NUNCA CONTACTAR

Descarta inmediatamente si detectas cualquiera de estas:

### 1. Multinacional Extranjera

**Indicadores:**
- Razón social contiene: "S.A.", "GmbH", "LLC", "Inc."
- Tiene matriz en otro país
- Más de 1000 empleados globales
- Compliance corporativo centralizado

**Ejemplo:** Adecco, Manpower, DHL, Nestlé

### 2. Sector Público o Infraestructura Estatal

**Indicadores:**
- Razón social contiene: "Municipio", "Gobernación", "Instituto", "Servicio"
- Descripción menciona: "economía mixta", "entidad pública"
- Código CIIU: 8411-8430
- Sitio web: dominio .gov.co

**Ejemplo:** GEB, EAAB, Alcaldía

### 3. Sector Financiero / Asegurador

**Indicadores:**
- Razón social contiene: "Banco", "Seguros", "Financiera", "Caja"
- Código CIIU: 6411-6610
- Supervisado por SFC

**Ejemplo:** Bancolombia, Seguros Bolívar, Caja

### 4. Menos de 50 Empleados

**Indicadores:**
- Cámara de Comercio: "empleados_reportados" < 50
- LinkedIn: "tamaño 1-50"

**Ejemplo:** Startups, pequeños negocios

### 5. Persona Natural o Unipersonal

**Indicadores:**
- Cédula en lugar de NIT
- Tipo: "Persona Natural Comerciante"
- Sin estructura corporativa

**Ejemplo:** Consultores independientes

---

## 🔍 CINCO BÚSQUEDAS OPERACIONALES

### Búsqueda 1: Medellín — Servicios Profesionales
```json
{
  "ubicacion": "Medellín",
  "empleados_minimo": 50,
  "empleados_maximo": 500,
  "sectores": ["Servicios Profesionales"],
  "keywords": ["nómina", "payroll", "RRHH"],
  "maximo_resultados": 10
}
```

### Búsqueda 2: Bogotá — Retail
```json
{
  "ubicacion": "Bogotá",
  "empleados_minimo": 50,
  "empleados_maximo": 500,
  "sectores": ["Comercio Retail"],
  "keywords": ["nómina", "recursos humanos"],
  "maximo_resultados": 10
}
```

### Búsqueda 3: Medellín — Manufactura
```json
{
  "ubicacion": "Medellín",
  "empleados_minimo": 50,
  "empleados_maximo": 500,
  "sectores": ["Manufactura"],
  "keywords": ["seguridad social"],
  "maximo_resultados": 10
}
```

### Búsqueda 4: Bogotá — Servicios Profesionales
```json
{
  "ubicacion": "Bogotá",
  "empleados_minimo": 50,
  "empleados_maximo": 500,
  "sectores": ["Servicios Profesionales"],
  "keywords": ["nómina", "payroll", "RRHH"],
  "maximo_resultados": 10
}
```

### Búsqueda 5: Medellín — Retail
```json
{
  "ubicacion": "Medellín",
  "empleados_minimo": 50,
  "empleados_maximo": 500,
  "sectores": ["Comercio Retail"],
  "keywords": ["recursos humanos"],
  "maximo_resultados": 10
}
```

---

**Vigencia:** Revisión cada mes o después de cambios.
