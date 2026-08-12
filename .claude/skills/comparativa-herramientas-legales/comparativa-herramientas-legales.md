# Skill: Comparativa de Herramientas Jurídicas y SaaS Legal

**Versión:** 2.0  
**Tipo:** Analysis & Comparison  
**Ramas:** Todas (Laboral, Civil, Penal, Administrativo, Comercial, Corporativo)  
**Modelo:** Claude - Análisis de herramientas legales  

## 📋 Descripción

Analiza y compara herramientas SaaS legales, software de gestión de casos, y plataformas jurídicas para ayudarte a elegir la solución correcta según tus necesidades específicas por rama del derecho.

## 🎯 Casos de Uso

- Comparar software de gestión de casos para diferentes ramas
- Evaluar plataformas de jurisprudencia (SUIN, Legal Data Hunter, etc.)
- Analizar herramientas de facturación legal y gestión de tiempo
- Seleccionar plataformas de análisis de riesgos contractuales
- Comparar sistemas de gestión documental para archivos legales

## 🔧 Prompt Maestro

```
Actúa como experto en tecnología legal. Analiza las herramientas SaaS 
abiertas en esta pestaña y compáralas específicamente para [rama del derecho].

Crea una tabla que incluya:
- Nombre de la herramienta
- Precio inicial (en COP si es posible)
- 3 funciones principales para [rama específica]
- Ventajas para [rama específica]
- Desventajas para [rama específica]
- Integraciones con sistemas colombianos (SUIN, fuentes oficiales)
- Recomendación final según prioridad: [bajo costo / mejor funcionalidad / seguridad]

Ejemplo ramas: Laboral (expedientes laborales), Civil (responsabilidad civil), 
Penal (defensa penal), Administrativo (actos administrativos), Comercial (sociedades).
```

## 📊 Salida Esperada

```
| Herramienta | Precio | Función 1 | Función 2 | Función 3 | Ventajas | Desventajas | Recomendación |
|-------------|--------|-----------|-----------|-----------|----------|-------------|---------------|
| Herramienta A | $X/mes | ... | ... | ... | ... | ... | ✓ RECOMENDADA |
```

## 🔌 Integración

- **Trigger:** Manual (antes de contratar nueva herramienta)
- **Interacción:** Consultor Legal de Comunicaciones
- **Salida:** Matriz comparativa + recomendación
- **Almacenamiento:** `outputs/comparativas/`

## ✅ Criterios de Calidad

- ✓ Precios verificables
- ✓ Funcionalidades reales y documentadas
- ✓ Análisis específico por rama del derecho
- ✓ Sin sesgos comerciales
- ✓ Recomendación justificada
