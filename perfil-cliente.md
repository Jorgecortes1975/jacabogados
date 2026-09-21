# Perfil de Cliente Ideal - Seguridad Social Payroll

## Cliente Ideal - Párrafo Ejecutivo

**Empresa mediana (50-500 empleados) en Medellín o Bogotá, sector servicios, retail o manufactura, con Gerente de RRHH como decisor. Enfrenta retos específicos en nómina, AFP, salud, parafiscales y cumplimiento normativo de seguridad social. NO es multinacional con compliance internacional ni microempresa.**

---

## 5 Señales de Calificación (Mínimas)

1. **Rango de empleados verificable:** 50-500 empleados listados en LinkedIn o datos de registro mercantil
2. **Presencia RRHH:** Gerente de Recursos Humanos identificable en LinkedIn o sitio web
3. **Mención explícita de payroll/nómina:** En descripción de empresa, posts recientes o site ("nómina", "payroll", "seguridad social", "AFC", "salud", "parafiscales")
4. **Ubicación confirmada:** Oficina registrada en Medellín o Bogotá (validar con Cámara de Comercio / LinkedIn company page)
5. **Actividad reciente:** Empresa con publicaciones o actualizaciones < 3 meses (indica operación activa)

---

## 5 Señales Disqualificantes (Descarta Inmediatamente)

1. **Multinacional o sucursal extranjera:** Matriz fuera de Colombia (ya tiene compliance corporativo internacional)
2. **Microempresa:** < 50 empleados (foco en empresas medianas, no startups)
3. **Sector público:** Entidad estatal, municipal, Gobierno, universidades públicas (compliance diferente)
4. **Sector financiero/asegurador:** Bancos, seguros, fondos (compliance propio muy especializado)
5. **Persona natural/unipersonal:** No es empresa constituida (no es mercado objetivo)

---

## Rationale de Selección de Red

- **LinkedIn Company Employees Extractor:** Identifica estructura RRHH, confirma tamaño (50+ empleados visibles), encuentra decisor (Gerente RRHH).
- **Data Empresarial Extractor:** Filtra por tamaño legal, ubicación registral, sector, actividad financiera.
- **Estrategia:** Ejecutar Data Empresarial primero (filtrar universo), luego LinkedIn (profundizar en decisor + estructura).

---

## 5 Búsquedas Concretas para Scraper

### Búsqueda 1: Medellín - Sector Servicios
```
Criterios: Medellín, 50-500 empleados, Sector "Servicios Profesionales" (consultoría, recursos humanos, administración de personal)
Señal: "gerente rrhh" OR "jefe recursos humanos" OR "director talento humano"
```

### Búsqueda 2: Medellín - Sector Retail
```
Criterios: Medellín, 50-500 empleados, Sector "Comercio al por menor"
Señal: "nómina" OR "payroll" OR "seguridad social" en descripción
```

### Búsqueda 3: Medellín - Sector Manufactura
```
Criterios: Medellín, 50-500 empleados, Sector "Industria Manufacturera"
Señal: Presencia de múltiples cargos RRHH o "administrador de personal"
```

### Búsqueda 4: Bogotá - Sector Servicios
```
Criterios: Bogotá, 50-500 empleados, Sector "Servicios Profesionales"
Señal: "afiliación" OR "fondos de pensión" OR "aportes" en descripción
```

### Búsqueda 5: Medellín/Bogotá - Keywords Payroll
```
Criterios: Medellín + Bogotá, 50-500 empleados, Cualquier sector
Señal: "nómina" OR "seguridad social" OR "parafiscales" en empresa name/description
```

---

## Consultas de Búsqueda Operacional

```json
{
  "busquedas": [
    {
      "id": "search_1",
      "ubicacion": "Medellín",
      "sector": ["Servicios Profesionales", "Consultoría"],
      "empleados_min": 50,
      "empleados_max": 500,
      "keywords": ["gerente rrhh", "jefe recursos humanos", "director talento"],
      "orden_prioridad": 1
    },
    {
      "id": "search_2",
      "ubicacion": "Medellín",
      "sector": ["Comercio Retail"],
      "empleados_min": 50,
      "empleados_max": 500,
      "keywords": ["nómina", "payroll"],
      "orden_prioridad": 2
    },
    {
      "id": "search_3",
      "ubicacion": "Bogotá",
      "sector": ["Servicios Profesionales"],
      "empleados_min": 50,
      "empleados_max": 500,
      "keywords": ["seguridad social", "aportes"],
      "orden_prioridad": 3
    }
  ]
}
```

---

## Metadata

- **Creado:** 2026-09-21
- **Versión:** 1.0
- **Estado:** Listo para prueba de actor
- **Próximo paso:** Ejecutar Data Empresarial (búsqueda 1) + muestra 10 empresas
