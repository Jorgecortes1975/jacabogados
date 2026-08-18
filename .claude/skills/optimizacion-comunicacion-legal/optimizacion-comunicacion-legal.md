# Skill: Optimización de Comunicación Jurídica (Slack/Teams/Email)

**Versión:** 2.0  
**Tipo:** Communication Optimization  
**Ramas:** Todas (Laboral, Civil, Penal, Administrativo, Comercial, Corporativo)  
**Modelo:** Claude - Editor jurídico profesional  

## 📋 Descripción

Revisa y optimiza la comunicación legal interna garantizando que sea profesional, asertiva, clara y conforme a estándares de la rama jurídica específica. Elimina ambigüedades que podrían comprometer la solidez legal de los argumentos.

## 🎯 Casos de Uso

- Redacción de comunicaciones con clientes por Slack/Teams
- Optimización de emails antes de enviar a contraparte
- Revisión de notificaciones de demandas o acusaciones
- Mejora de propuestas de transacción o acuerdos
- Profesionalización de respuestas a reclamos
- Redacción de requerimientos administrativos

## 🔧 Prompt Maestro

```
Actúa como editor jurídico senior para [rama del derecho: laboral/civil/penal/administrativo/comercial/corporativo].

Revisa este borrador de comunicación:
"[Insertar borrador]"

Reescríbelo para que sea:
1. Profesional y asertivo (sin sonar agresivo)
2. Jurídicamente sólido (sin crear responsabilidad adicional)
3. Claro en el llamado a la acción
4. Conforme a estándares de [rama específica]
5. Educado pero firme

Especifica:
- Cambios realizados y por qué
- Riesgos que evitaste
- Nivel de asertividad (1-10)
- Si requiere revisión legal adicional
```

## 📊 Salida Esperada

```
ORIGINAL:
"Oye, necesitamos que contestes rápido o nos vamos a problemas"

OPTIMIZADO:
"Solicito respetuosamente su respuesta a la presente comunicación 
dentro de los 5 días hábiles. De no recibir respuesta, procederemos 
conforme a los términos establecidos en el contrato."

ANÁLISIS:
✓ Profesionalismo: 9/10
✓ Solidez jurídica: 9/10
✓ Claridad: 10/10
⚠ Requiere revisión: No
```

## 🔌 Integración

- **Trigger:** Manual (antes de enviar comunicación importante)
- **Interacción:** Consultor Legal de Comunicaciones
- **Salida:** Comunicación optimizada + análisis
- **Almacenamiento:** `outputs/comunicaciones/`

## ✅ Criterios de Calidad

- ✓ Lenguaje profesional
- ✓ Solidez legal verificada
- ✓ Claridad de instrucciones
- ✓ Respeto por los términos procesales
- ✓ Sin crear obligaciones adicionales
