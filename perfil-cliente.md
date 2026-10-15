# Perfil de Cliente Ideal | JAC

## Descripción en Párrafo

**Cliente Ideal:** Gerente General o Administrador de una PyME formal (5-100 empleados) en sector comercial, servicios o manufactura ubicada en Bogotá, Medellín o Cali. Empresa con RUT activo en Cámara de Comercio hace >1 año, que genera ingresos anuales entre $500M y $5B y que reconoce la necesidad de asesoramiento jurídico permanente para reducir riesgos laborales, comerciales y administrativos.

---

## Señales de Calificación (Verifica MÍNIMO 4)

### Señal 1: Registro Formal Verificable
- ✅ Aparece en Cámara de Comercio (búsqueda online visible)
- ✅ Tiene RUT/NIT activo (no cancelado)
- ✅ Tiene sitio web funcionando o Facebook empresarial activo
- ❌ Descarta: Nombre sin registro o empresa de hace <6 meses

### Señal 2: Tamaño Identificable
- ✅ Mínimo 5 empleados mencionados en redes o sitio
- ✅ Oficina física identificable en Google Maps
- ✅ Reseñas de empleados actuales o recientes (indicio de operación activa)
- ❌ Descarta: "Autoempleado", "0 empleados", o <5 personas

### Señal 3: Sector Economía Formal
- ✅ Comercio, retail, servicios, manufactura, logística, consultoría, tecnología
- ✅ Banca, seguros, inmobiliario (aunque sea más grande)
- ✅ Hospitales, clínicas, farmacias (si son formales)
- ❌ Descarta: Informalidad, economía informal, vendedores de tráfico

### Señal 4: Decisor Identificable
- ✅ Linkedin: "Gerente General", "Administrador", "Director Ejecutivo", "CEO"
- ✅ Nombre de decisor en sitio web o contacto público
- ✅ Contacto visible (teléfono, email o formulario)
- ❌ Descarta: Contacto solo a través de switchboard o "envidar CV"

### Señal 5: Ingresos Inferibles
- ✅ Número de empleados + sector = estimado >$500M/año
- ✅ Múltiples sucursales o cobertura regional
- ✅ Publicidad activa en Google Ads o redes (inversión visible)
- ✅ Reseñas consistentes (>20 reseñas = operación estable)
- ❌ Descarta: Ingresos <$300M/año o operación muy pequeña

---

## Señales de Descarte (ELIMINA SI TIENE 1+)

### Descarte 1: Competencia Directa
- 🚫 Firma de abogados, despacho jurídico, consultoría legal
- 🚫 Empresa de servicios jurídicos, notaría, procuraduría
- 🚫 Cualquier empresa cuyo negocio es VENDER servicios jurídicos

### Descarte 2: Tamaño No Calificado
- 🚫 <5 empleados (autoempleado, pequeño taller)
- 🚫 >300 empleados (va a firmas grandes, no a nosotros)
- 🚫 Persona natural sin empresa constituida

### Descarte 3: Informalidad
- 🚫 Sin registro Cámara de Comercio verificable
- 🚫 "Trabajador independiente", "vendedor", "comerciante"
- 🚫 Sin sitio web, sin teléfono fijo, sin dirección física clara

### Descarte 4: Ya Contactado o No Contactar
- 🚫 Aparece en memoria/ya-contactados.csv
- 🚫 Aparece en memoria/no-contactar.csv
- 🚫 Email rebotó 2+ veces antes (quita automáticamente)

### Descarte 5: Sector Alto Riesgo
- 🚫 Empresas de vigilancia privada (marco legal complejo)
- 🚫 Casinos, bares, discotecas (cumplimiento distinto)
- 🚫 Financieras no reguladas (riesgo reputacional)

### Descarte 6: Contacto No Verificable
- 🚫 Email genérico tipo info@, contacto@, hola@ (sin verificación de entrega)
- 🚫 Solo Facebook o WhatsApp (no es correo)
- 🚫 Email invalido según verificador (dominio no existe, sintaxis mala)

---

## Red Donde Buscar y Por Qué

### Google Maps (PRIMARIO - 60% del esfuerzo)
**Por qué:** Cubre negocios locales formales, filtros por tamaño/reseñas, encontramos correo en sitio web.
- Búsquedas: "empresas Bogotá", "oficinas administrativas", por sector
- Actor: lukaskrivka/google-maps-with-contact-details
- Cobertura: Bogotá, Medellín, Cali (expansión)

### LinkedIn (SECUNDARIO - 30% del esfuerzo)
**Por qué:** Encontramos decisores por cargo, verificamos perfil corporativo, evitamos gente equivocada.
- Búsquedas: "Gerente General", "CEO", "Director" + empresa + Colombia
- Actor: harvestapi/linkedin-company-employees
- Cobertura: B2B, grandes ciudades, decisores identificables

### Google Places/Directorios (BACKUP - 10% del esfuerzo)
**Por qué:** Valida empresas cuando Google Maps no trae suficiente.
- Búsquedas: Por sector + ciudad + tamaño
- Actor: compass/crawler-google-places
- Cobertura: Cuando Maps se agota

---

## 5 Búsquedas Concretas para Arrancar

### Búsqueda 1: Empresas Bogotá - Comercio Formal
```
"Empresas comerciales Bogotá con 10 a 50 empleados, 4 estrellas o más, con sitio web"
```
- Google Maps: Bogotá, categoría "Office" o "Business Services"
- Filtros: Rating 4+, mínimo 30 reseñas
- Objetivo: Gerentes o Administradores

### Búsqueda 2: Servicios Bogotá - Sector Consultoría/Tech
```
"Oficinas de consultoría, asesoría o empresas de software en Bogotá, 5-50 personas"
```
- Google Maps: Bogotá, categoría "Consulting Agency" o "Office"
- Filtros: Rating 4+, activos últimos 6 meses
- Objetivo: Directores o Socios

### Búsqueda 3: Medellín - Manufactura y Logística
```
"Empresas de manufactura, logística, distribución en Medellín con 15-80 empleados"
```
- Google Maps: Medellín, categoría "Warehouse" o "Factory"
- Filtros: Rating 3.5+, teléfono verificado
- Objetivo: Administradores Operativos

### Búsqueda 4: LinkedIn - Gerentes Colombia
```
"Gerentes Generales en empresas de 20-100 empleados, experiencia >5 años, Colombia"
```
- LinkedIn: "Gerente General" o "CEO" + Colombia
- Filtros: Empresas formales, actuales
- Objetivo: Decisores directos

### Búsqueda 5: Cali - Comercio y Servicios
```
"Empresas comerciales, retail o servicios en Cali, 8-60 empleados, con sitio web activo"
```
- Google Maps: Cali, categoría "Retail" o "Office"
- Filtros: Rating 3.5+, reseñas recientes
- Objetivo: Gerentes o Dueños

---

## Métrica de Éxito

**Meta de Calificación:** Mínimo 50% de contactos por ronda deben cumplir 4+ señales
**Descarte Permitido:** Máximo 20% de la lista puede ir a descartados.csv
**Correos Enviables:** Mínimo 70% de leads debe traer correo de confianza alta o media

---

**Actualizado:** 2026-09-21  
**Dueño:** Jorge Cortés | JAC
