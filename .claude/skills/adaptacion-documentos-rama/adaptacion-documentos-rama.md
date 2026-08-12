# Skill: Adaptación de Documentos y Argumentos por Rama Jurídica

**Versión:** 2.0  
**Tipo:** Document Adaptation & Personalization  
**Ramas:** Todas (Laboral, Civil, Penal, Administrativo, Comercial, Corporativo)  
**Modelo:** Claude - Especialista en ramas del derecho  

## 📋 Descripción

Adapta documentos, argumentos, o estrategias legales de una rama del derecho a otra, o personaliza argumentarios para casos específicos resaltando exactamente lo que la autoridad jurisdiccional (juez, magistrado, funcionario) busca.

## 🎯 Casos de Uso

- Adaptación de demanda civil a contexto laboral
- Personalización de argumentos para juez específico
- Ajuste de estrategia de defensa penal por tipo de tribunal
- Adaptación de recurso administrativo por autoridad
- Personalización de propuesta transaccional para cliente
- Argumentos reforzados por jurisprudencia de magistrado específico

## 🔧 Prompt Maestro

```
Adapta este documento/argumento jurídico:

DOCUMENTO ORIGINAL:
[Copiar documento o argumento]

CONTEXTO DE ADAPTACIÓN:
- Rama destino: [laboral/civil/penal/administrativo/comercial/corporativo]
- Autoridad: [Juez X / Magistrado Y / Funcionario Z]
- Caso específico: [breve descripción]
- Objetivo: [qué quiero lograr]

INSTRUCCIONES:
1. Identifica 5 palabras clave que [autoridad/rama] valora
2. Destaca 3 precedentes aplicables del magistrado/corte competente
3. Refuerza argumentos débiles con jurisprudencia específica
4. Elimina argumentos genéricos que no apliquen
5. Personaliza para maximizar impacto en [rama específica]

RESULTADO:
Documento adaptado + justificación de cambios
```

## 📊 Salida Esperada

```
ADAPTACIÓN REALIZADA PARA: Rama Laboral

CAMBIOS PRINCIPALES:
1. Énfasis en protección del trabajador (jurisprudencia CSJ)
2. Argumento sobre favorabilidad de la norma (CST Art. 1)
3. Precedentes de Consejo de Estado en caso similar

PALABRAS CLAVE DETECTADAS EN JURISPRUDENCIA:
- Favorabilidad
- Protección integral
- Presunción de vigencia

ARGUMENTOS REFORZADOS:
[Argumentos con citas específicas]

RESULTADO: Solicitud de indemnización integral + reintegro
```

## 🔌 Integración

- **Trigger:** Manual (personalización de documentos)
- **Interacción:** Redactor Ejecutivo Automatizado
- **Salida:** Documento adaptado + matriz de cambios
- **Almacenamiento:** `outputs/documentos-adaptados/`

## ✅ Criterios de Calidad

- ✓ Adaptación específica a rama/autoridad
- ✓ Precedentes verificables
- ✓ Argumentos reforzados sin cambiar esencia
- ✓ Palabras clave documentadas
- ✓ Estrategia coherente con rama jurídica
