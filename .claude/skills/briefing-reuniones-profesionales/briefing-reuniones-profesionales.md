# Skill: Briefing para Reuniones Profesionales y Negociaciones

**Versión:** 2.0  
**Tipo:** Business Intelligence & Preparation  
**Ramas:** Todas (Laboral, Civil, Penal, Administrativo, Comercial, Corporativo)  
**Modelo:** Claude - Análisis de perfiles profesionales  

## 📋 Descripción

Prepara un briefing ejecutivo antes de reuniones clave analizando el perfil profesional de la otra parte, su trayectoria, intereses potenciales y puntos de conexión estratégica para maximizar resultados de la negociación.

## 🎯 Casos de Uso

- Preparación antes de reunión con contraparte
- Análisis de perfil de juez o magistrado
- Briefing de cliente nuevo (fondo empresarial)
- Preparación de negociación de transacción
- Análisis de contraparte en litigio
- Reunión con autoridad administrativa

## 🔧 Prompt Maestro

```
Voy a tener una reunión de [tipo: negociación/litigio/auditoría/consultoría] 
con esta persona/empresa en el contexto de [rama del derecho].

Analiza el perfil disponible (LinkedIn, web, antecedentes) y proporciona:

BRIEFING ESTRATÉGICO (3 puntos clave):
1. Trayectoria profesional + intereses detectados
2. Logros recientes y posición actual en el mercado
3. Puntos de conexión y 3 preguntas estratégicas

ANÁLISIS DE NEGOCIACIÓN:
- Posible posición de la otra parte
- Puntos de alineación vs conflicto
- Alternativas si la negociación falla
- Concesiones que puedas ofrecer sin perder ventaja

CONTEXTO JURÍDICO [rama específica]:
- Jurisprudencia reciente que afecta esta negociación
- Términos estándar para este tipo de acuerdo
- Riesgos legales a monitorear
```

## 📊 Salida Esperada

```
REUNIÓN CON: [Nombre]
RAMA: Derecho Corporativo

TRAYECTORIA:
- Posición actual: CEO en empresa X
- Experiencia: 15 años en M&A
- Interés probable: Valor de empresa > Protección de minoritarios

PUNTOS ESTRATÉGICOS:
1. Conexión potencial: Ambos en industria fintech
2. Pregunta estratégica: "¿Cuál es su visión de largo plazo?"
3. Concesión sin riesgo: Timeline flexible

CONTEXTO JURÍDICO:
- Ley 1258/2008: SAS aplicable a la transacción
- Jurisprudencia: SS ha protegido derechos de minorías
- Riesgo legal: Cláusulas de no-compete

RECOMENDACIÓN: Iniciar con punto de alineación, no conflicto
```

## 🔌 Integración

- **Trigger:** Manual (24h antes de reunión importante)
- **Interacción:** Consultor Legal de Comunicaciones
- **Salida:** Briefing ejecutivo + estrategia de negociación
- **Almacenamiento:** `outputs/briefings/`

## ✅ Criterios de Calidad

- ✓ Análisis verificable del perfil
- ✓ Puntos estratégicos específicos
- ✓ Jurisprudencia aplicable citada
- ✓ Preguntas genuinas (no genéricas)
- ✓ Estrategia sin comprometer posición legal
