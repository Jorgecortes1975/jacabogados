# Extractor Datos Empresariales - Guía Completa

> Extracción de empresas de registros públicos colombianos (Cámara de Comercio, Superintendencia, DIAN)

**Versión:** 1.0  
**Fecha:** 2026-09-21  
**Estado:** Documentación Completa  
**Responsable:** Sistema de Clientes Apify JAC

---

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Casos de Uso](#casos-de-uso)
3. [Requisitos](#requisitos)
4. [Configuración](#configuración)
5. [Ejecución](#ejecución)
6. [Procesamiento de Datos](#procesamiento-de-datos)
7. [Consideraciones Legales](#consideraciones-legales)
8. [Integración con Perfil Cliente](#integración-con-perfil-cliente)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 Descripción General

**Extractor Datos Empresariales** es un actor especializado en:

- ✅ Búsqueda de empresas por ubicación, tamaño, sector
- ✅ Extracción de datos registrales (NIT, estado, constitución)
- ✅ Obtención de contacto (teléfono, email, sitio web)
- ✅ Información de propietarios y representantes
- ✅ Filtrado por palabras clave (ej: "nómina", "payroll")

**Fuentes:** Cámara de Comercio, Superintendencia de Sociedades, DIAN

---

## 💼 Casos de Uso

### 1. Búsqueda de Clientes Potenciales Medianos

```
Escenario: Encontrar empresas medianas en Medellín con problemas de nómina
Objetivo: Listar empresas 50-500 empleados activas
Salida: Nombre, teléfono, email, ubicación, sector
```

### 2. Búsqueda por Palabras Clave

```
Escenario: Empresas que mencionan "seguridad social" en descripción
Objetivo: Identificar empresas conscientes de cumplimiento normativo
Salida: Empresas potencialmente interesadas en servicios legales
```

### 3. Due Diligence Comercial

```
Escenario: Verificar información de cliente prospect
Objetivo: Validar datos registrales antes de contacto
Salida: Datos legales verificados de empresa
```

### 4. Análisis de Competencia

```
Escenario: Listar empresas competidoras del sector servicios profesionales
Objetivo: Obtener contactos y tamaño de competencia
Salida: Base de datos competitiva con información registral
```

### 5. Enriquecimiento de Leads

```
Escenario: Complementar lista LinkedIn con datos de Cámara de Comercio
Objetivo: Validar datos de contacto y tamaño de empresa
Salida: Leads enriquecidos con información registral
```

---

## 📋 Requisitos

### Requisitos Técnicos

✅ Cuenta activa en Apify  
✅ Token API de Apify  
✅ Acceso a datos públicos colombianos (no requiere login especial)

### Requisitos de Información

✅ Ubicación (ciudad o departamento)  
✅ Rango de empleados (ej: 50-500)  
✅ Sector económico (opcional)  
✅ Palabras clave (opcional)

### Requisitos Legales

✅ Verificar que uso sea comercial legítimo  
✅ Cumplir con leyes de protección de datos (GDPR si aplica)  
✅ Usar datos para propósitos permitidos (no spam, no venta masiva)

---

## ⚙️ Configuración

### Parámetros de Entrada (Obligatorios)

```json
{
  "ubicacion": "Medellín",
  "empleados_minimo": 50,
  "empleados_maximo": 500
}
```

### Parámetros Opcionales Principales

```json
{
  "sectores": [
    "Servicios Profesionales",
    "Retail"
  ],
  "keywords": [
    "nómina",
    "payroll",
    "seguridad social"
  ],
  "estado_empresa": "activa",
  "maximo_resultados": 50,
  "ordenar_por": "empleados_desc"
}
```

### Ejemplo Configuración Completa

```json
{
  "ubicacion": "Medellín",
  "empleados_minimo": 50,
  "empleados_maximo": 500,
  "sectores": [
    "Servicios Profesionales",
    "Consultoría",
    "Retail"
  ],
  "keywords": [
    "nómina",
    "payroll"
  ],
  "estado_empresa": "activa",
  "maximo_resultados": 50,
  "ordenar_por": "empleados_desc",
  "fuentes": [
    "Cámara de Comercio",
    "Superintendencia"
  ]
}
```

---

## 🚀 Ejecución

### Paso 1: Crear Proyecto Cliente

```bash
cd clientes-apify/clients

# Copiar plantilla
cp ../templates/proyecto-template.json \
  cliente-bdev/proyecto-prospection.json
```

### Paso 2: Configurar Búsqueda

```json
{
  "proyecto": {
    "id": "prospection-mde-2026",
    "nombre": "Prospección Medellín - Clientes Seguridad Social",
    "clienteId": "cliente-bdev",
    "tipo": "prospection"
  },
  "parametros": {
    "ubicacion": "Medellín",
    "empleados_minimo": 50,
    "empleados_maximo": 500,
    "keywords": [
      "nómina",
      "payroll"
    ]
  },
  "ejecucion": {
    "actorId": "data-empresarial",
    "actorConfig": {
      "ubicacion": "Medellín",
      "empleados_minimo": 50,
      "empleados_maximo": 500,
      "sectores": [
        "Servicios Profesionales",
        "Retail",
        "Manufactura"
      ],
      "keywords": [
        "nómina",
        "payroll"
      ],
      "maximo_resultados": 50
    }
  }
}
```

### Paso 3: Ejecutar Actor

```bash
# Opción 1: Mediante Apify Console
# URL: https://console.apify.com/actors
# 1. Seleccionar actor data-empresarial
# 2. Click "Run"
# 3. Completar parámetros
# 4. Click "Run"

# Opción 2: Mediante API de Apify
curl -X POST \
  https://api.apify.com/v2/actor-runs \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d @payload.json
```

### Paso 4: Monitorear Ejecución

```bash
# Ver estado
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.apify.com/v2/actor-runs/RUN_ID

# Ver dataset de salida
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.apify.com/v2/datasets/DATASET_ID/items
```

---

## 📊 Procesamiento de Datos

### Estructura de Datos Extraídos

```json
{
  "items": [
    {
      "razonSocial": "Empresa Medellín S.A.S.",
      "nit": "900123456",
      "digito": "7",
      "actividad_economica": "6201 - Servicios de Consultoría",
      "sector": "Servicios Profesionales",
      "empleados_reportados": 75,
      "ingresos_anuales": "2500",
      "estado": "activa",
      "ubicacion": {
        "ciudad": "Medellín",
        "departamento": "Antioquia",
        "direccion": "Cra 43A No 10-50"
      },
      "contacto": {
        "telefono": "+57 4 3123456",
        "correo": "contacto@empresa.com.co",
        "sitio_web": "https://www.empresa.com.co"
      },
      "propietarios": [
        {
          "nombre": "Juan Pérez",
          "cedula": "1234567890",
          "porcentaje": 51
        }
      ],
      "representante_legal": {
        "nombre": "María López",
        "cedula": "9876543210",
        "cargo": "Gerente General"
      },
      "fuente": "Cámara de Comercio",
      "extraido_en": "2026-09-21T02:30:00Z"
    }
  ]
}
```

### Almacenamiento

```
datasets/
└── cliente-bdev/
    └── proyecto-prospection/
        └── data-empresarial/
            └── 2026-09-21/
                ├── run-001.json           # Datos brutos
                └── run-001-metadata.json  # Metadata
```

### Enriquecimiento con LinkedIn

Una vez obtenidas empresas con data-empresarial:

```bash
# Para cada empresa encontrada:
# 1. Obtener empresa LinkedIn URL
# 2. Ejecutar linkedin-company-employees
# 3. Extraer Gerentes RRHH
# 4. Combinar datos
```

---

## ⚖️ Consideraciones Legales

### ✅ Uso Permitido

- Investigación comercial legítima
- Prospección de clientes B2B
- Due diligence empresarial
- Análisis de mercado
- Búsqueda de socios comerciales

### ❌ Uso Prohibido

- Spam o solicitudes masivas no autorizadas
- Venta de datos sin consentimiento
- Violación de privacidad
- Fines delictivos o fraudulentos

### Fuentes (Datos Públicos)

```
✅ Cámara de Comercio - Registros públicos
✅ Superintendencia de Sociedades - Registros públicos
✅ DIAN - Información tributaria pública
```

Todos son registros públicos de instituciones colombianas oficiales.

---

## 🔗 Integración con Perfil Cliente

Este actor se integra con el perfil de cliente definido en `perfil-cliente.md`:

### Filtros Aplicados

```json
{
  "ubicacion": "Medellín, Bogotá",
  "empleados_minimo": 50,
  "empleados_maximo": 500,
  "sectores": [
    "Servicios Profesionales",
    "Comercio Retail",
    "Manufactura"
  ],
  "keywords": [
    "nómina",
    "payroll",
    "seguridad social",
    "recursos humanos"
  ],
  "estado_empresa": "activa"
}
```

### Flujo Integrado

```
1. data-empresarial
   ↓
   Busca 50 empresas medianas Medellín
   Retorna: nombre, teléfono, email, sector
   
2. linkedin-company-employees
   ↓
   Para cada empresa: extrae Gerentes RRHH
   Retorna: nombre, puesto, LinkedIn URL
   
3. Enriquecimiento
   ↓
   Combina datos: negocio + contacto RRHH + teléfono
   Resultado: leads accionables
```

---

## 🔧 Troubleshooting

### Problema: "Ubicación no encontrada"

```
Causa: Ciudad/departamento no válido
Solución:
1. Verificar ortografía exacta (Medellín, no Medellin)
2. Usar nombre oficial (Bogotá D.C., no Bogotá)
3. Probar con región más general (Antioquia en lugar de Medellín)
```

### Problema: "Rango de empleados muy restrictivo"

```
Causa: Pocos resultados para rango 50-500
Solución:
1. Ampliar rango: 30-600
2. Quitar filtro de sector
3. Aumentar maximo_resultados
```

### Problema: "Sin resultados"

```
Causa: Criterios demasiado específicos
Solución:
1. Remover o ampliar keywords
2. Cambiar sector
3. Aceptar estado "inactiva" temporalmente
4. Consultar otra fuente
```

### Problema: "Teléfono incompleto"

```
Causa: Dato registral desactualizado o incompleto
Solución:
1. Validar número encontrado
2. Buscar teléfono actual en Google/LinkedIn
3. Considerar como dato parcial, no descartar empresa
```

---

## 📋 Checklist de Implementación

- [ ] Esquema de entrada definido (data-empresarial.json)
- [ ] Actor registrado en Apify
- [ ] Actor ID obtenido y documentado
- [ ] Parámetros de búsqueda configurados (ubicación, tamaño, sector)
- [ ] Primeras búsquedas testeadas
- [ ] Datos almacenados correctamente
- [ ] Integración con linkedin-company-employees validada
- [ ] Enriquecimiento de leads funcionando
- [ ] Reporte de prospectos generado
- [ ] Auditoría registrada

---

## 📊 Métricas de Éxito

| Métrica | Objetivo |
|---------|----------|
| Empresas encontradas | 50+ por búsqueda |
| Teléfono completado | >80% |
| Email completado | >60% |
| Tasa de contacto exitoso | >30% |
| Conversión a cliente | >5% |

---

## 📞 Recursos

| Recurso | URL |
|---------|-----|
| Cámara de Comercio | https://www.camcom.co/ |
| Superintendencia | https://www.supersociedades.gov.co/ |
| DIAN | https://www.dian.gov.co/ |
| Apify Docs | https://docs.apify.com/platform |

---

## ✅ Siguiente Paso

Después de implementar este actor:

1. Registrar en Apify
2. Testear con búsqueda piloto (Medellín, 50-500 empleados)
3. Enriquecer resultados con linkedin-company-employees
4. Generar reportes de prospectos
5. Automatizar búsquedas periódicas

---

**Estado:** Listo para Implementación  
**Versión:** 1.0  
**Última Actualización:** 2026-09-21

⚠️ **Recuerda:** Usar datos públicos solo para propósitos comerciales legítimos.
