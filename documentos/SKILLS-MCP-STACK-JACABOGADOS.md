# Stack de Skills + MCP Servers — Jacabogados

**Guía de herramientas profesionales reutilizables para automatizar procesos legales**

**Versión:** 1.0  
**Fecha:** 2026-07-11  
**Responsable:** Equipo de Operaciones  
**Estado:** Plan de implementación

---

## Concepto Base

En Claude Code, trabajamos con **dos capas**:

1. **Skills** — Archivos Markdown que enseñan **procesos reutilizables**
   - Cómo redactar una demanda
   - Cómo analizar viabilidad
   - Cómo auditar un documento
   - Ubicación: `.claude/skills/nombre-skill/SKILL.md`

2. **MCP Servers** — Conexiones reales a **herramientas externas**
   - Legal Data Hunter → Jurisprudencia en tiempo real
   - Brave Search → Investigación web
   - GitHub → Control de versiones
   - Ubicación: configurar en `.claude/settings.json`

**Analogía:** Skills son recetas, MCP servers son ingredientes frescos que trae el distribuidor.

---

## Fases de Implementación

### FASE 1 — CRÍTICA (Semana 1-2)
Instalar skills que evitan errores legales costosos.

### FASE 2 — ALTA PRIORIDAD (Semana 3-4)
Instalar skills de automatización que ahorran horas.

### FASE 3 — MEDIA PRIORIDAD (Mes 2)
Instalar skills de optimización y marketing.

### FASE 4 — OPCIONAL (Mes 3+)
Instalar skills especializadas según necesidad.

---

## FASE 1 — SKILLS CRÍTICAS (INSTALAR YA)

Estas skills **evitan que pierdas un caso o violes normas colombianas**. Instalar = crear en `.claude/skills/`.

### Skill 1: Redacción Legal Colombia ✓ EXISTE
- **Ubicación:** `.claude/skills/redaccion-legal-colombia/SKILL.md`
- **Qué hace:** Enseña a redactar demandas, contratos, recursos según rama del derecho
- **Por qué es crítica:** Una demanda mal redactada se devuelve del juzgado. Esta skill evita eso.
- **Cuándo usar:** SIEMPRE antes de escribir documento legal
- **Normas que cubre:**
  - Código de Procedimiento Civil (CGP - Ley 1564/2012)
  - Código de Procedimiento Penal (Ley 906/2004)
  - Código Procedimiento Administrativo (CPACA - Ley 1437/2011)
  - Código Sustantivo del Trabajo
  - Código de Comercio
  - Constitución Política

**Status:** ✓ Completada (829 líneas documentadas)

---

### Skill 2: Análisis de Viabilidad Legal
- **Qué hace:** Evalúa si un caso es ganable antes de aceptarlo
- **Por qué es crítica:** Aceptar un caso no viable = perder dinero y tiempo
- **Cuándo usar:** Después de consulta inicial con cliente (P-001 Paso 6)
- **Entradas:** Narrativa del cliente, documentos, pruebas disponibles
- **Salidas:** Veredicto (VIABLE / RIESGO ALTO / NO VIABLE) con puntuación
- **Proceso:**
  1. Analizar fundamento legal normativo
  2. Calificar pruebas existentes
  3. Identificar pruebas faltantes
  4. Evaluar capacidad de pago del cliente
  5. Estimar probabilidad de ganar (%)
  6. Documentar veredicto final

**Status:** 🟡 Crear (usar procedimiento P-002 como base)

---

### Skill 3: Auditoría de Cumplimiento Normativo
- **Qué hace:** Revisa un documento legal para asegurar que cumple todas las normas colombianas
- **Por qué es crítica:** Un documento incompleto se rechaza en juzgado
- **Cuándo usar:** Antes de presentar CUALQUIER escrito ante juzgado
- **Checklist que incluye:**
  - ¿Identificación completa de partes?
  - ¿Normas colombianas correctamente citadas?
  - ¿Procedimiento correcto para la rama?
  - ¿Juzgado competente identificado?
  - ¿Petitorio claro y específico?
  - ¿Pruebas identificadas?
  - ¿Firmas presentes?
  - ¿Cumple SGDE (sistema digital)?

**Status:** 🟡 Crear

---

### Skill 4: Seguimiento de Plazos Procesales
- **Qué hace:** Monitorea vencimientos y alertas de casos en progreso
- **Por qué es crítica:** Perder un plazo = perder el caso (caducidad)
- **Cuándo usar:** Para cada caso activo, revisar semanal/mensual
- **Entrada:** Lista de casos con hitos y plazos
- **Salida:** Tabla de alertas (rojo=hoy, amarillo=7 días, verde=seguro)
- **Integraciones:** Conecta con log de seguimiento de cada caso

**Status:** 🟡 Crear

---

## FASE 2 — SKILLS DE AUTOMATIZACIÓN (Semana 3-4)

### Skill 5: Investigación Jurisprudencial
- **Qué hace:** Busca jurisprudencia favorable en cortes colombianas (Corte Const, Corte Suprema, etc)
- **Por qué:** Los jueces siguen precedentes. Si tienes sentencia a favor, te ganas el caso
- **Cuándo usar:** Durante preparación de estrategia (P-015 si existe)
- **Integración:** MCP Legal Data Hunter (ya configurado)
- **Salida:** Citas con links a jurisprudencia + resumen de fallo

**Status:** 🟡 Crear (MCP ya existe)

---

### Skill 6: Generador de Propuestas de Honorarios
- **Qué hace:** Crea propuestas profesionales con estructura clara de costos
- **Por qué:** Cliente ve profesionalismo, reduce objeciones de precio
- **Cuándo usar:** Después de evaluar viabilidad, antes de presentar al cliente
- **Template que genera:**
  - Descripción del caso
  - Horas estimadas o tarifa fija
  - Desglose de costos
  - Términos de pago
  - Estimado de duración

**Status:** 🟡 Crear

---

### Skill 7: Análisis de Riesgos Legales
- **Qué hace:** Identifica riesgos en un documento (ético, legal, reputacional)
- **Por qué:** Evita que representes a cliente que tiene problemas legales
- **Cuándo usar:** Evaluación inicial de cualquier caso complejo
- **Riesgos que detecta:**
  - Conflicto de intereses
  - Cliente potencialmente delincuente
  - Caso que puede traer mala reputación al despacho
  - Violaciones de normas profesionales

**Status:** 🟡 Crear

---

## FASE 3 — SKILLS DE OPTIMIZACIÓN (Mes 2)

### Skill 8: Redactor de Contenido Legal (LinkedIn/Web)
- **Qué hace:** Convierte casos/análisis legales en contenido educativo sin riesgos
- **Por qué:** Marketing del despacho, posicionamiento en Google
- **Cuándo usar:** Después de cerrar caso interesante
- **Output:** Posts LinkedIn, artículos blog, newsletters

**Status:** 🟡 Crear

---

### Skill 9: Automatización de Reportes Financieros
- **Qué hace:** Consolida datos de facturación de múltiples abogados
- **Por qué:** Ahorrar 3 horas de Excel manual cada mes
- **Integración:** Leer archivos de facturación, generar tablas/gráficos
- **Output:** Reporte ejecutivo para socios, alertas de morosidad

**Status:** 🟡 Crear

---

## MCP SERVERS RECOMENDADOS

Los MCP servers **dan acceso real a herramientas externas**. Recomendaciones por prioridad:

### MCP 1: Legal Data Hunter ✓ CONFIGURADO
```json
{
  "legal-data-hunter": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-legal-data-hunter"],
    "env": {
      "LEGAL_DATA_HUNTER_API_KEY": "${LEGAL_DATA_HUNTER_API_KEY}"
    }
  }
}
```
- **Qué:** Acceso a 230+ jurisdicciones, 38M+ documentos legales
- **Para qué:** Buscar jurisprudencia colombiana, fallos de cortes
- **Crítica:** SÍ
- **Ya instalado:** Sí (en settings.json)

---

### MCP 2: Brave Search ✓ CONFIGURADO
```json
{
  "brave-search": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-brave-search"],
    "env": {
      "BRAVE_API_KEY": "${BRAVE_API_KEY}"
    }
  }
}
```
- **Qué:** Búsqueda web privada (no tracking)
- **Para qué:** Investigar clientes, verificar información, buscar jurisprudencia no indexada
- **Crítica:** MEDIA
- **Ya instalado:** Sí (en settings.json)

---

### MCP 3: GitHub ✓ CONFIGURADO
```json
{
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
    }
  }
}
```
- **Qué:** Control de versiones y colaboración
- **Para qué:** Versionar procedimientos, skills, documentos legales
- **Crítica:** SÍ (es tu fuente de verdad)
- **Ya instalado:** Sí (en settings.json)

---

### MCP 4: Supabase (OPCIONAL)
**Usar si:** Quieres base de datos de casos en la nube

```json
{
  "supabase": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-supabase"],
    "env": {
      "SUPABASE_URL": "${SUPABASE_URL}",
      "SUPABASE_API_KEY": "${SUPABASE_API_KEY}"
    }
  }
}
```

---

### MCP 5: Obsidian (OPCIONAL)
**Usar si:** Tus procedimientos están en Obsidian + sincronización

---

## STACK MÍNIMO RECOMENDADO PARA JACABOGADOS

**Para empezar profesionalmente, necesitas:**

| Componente | Necesario | Ya Existe | Acción |
|-----------|----------|-----------|--------|
| CLAUDE.md | ✓ | ✓ | Completado |
| Skill: redaccion-legal-colombia | ✓ | ✓ | Completado |
| Skill: analisis-viabilidad | ✓ | ❌ | Crear esta semana |
| Skill: auditoria-cumplimiento | ✓ | ❌ | Crear esta semana |
| Skill: seguimiento-plazos | ✓ | ❌ | Crear semana 2 |
| MCP: Legal Data Hunter | ✓ | ✓ | Completado |
| MCP: Brave Search | ✓ | ✓ | Completado |
| MCP: GitHub | ✓ | ✓ | Completado |

**Total a crear en FASE 1:** 3 skills (2-3 horas)

---

## TEMPLATE PARA CREAR UNA SKILL NUEVA

Cuando crees una skill, sigue este template:

```yaml
---
name: nombre-de-la-skill
description: Una línea que explica qué hace, cuándo usarla y qué resultado entrega.
---

# Skill: Nombre Completo

## Objetivo
¿Qué problema resuelve esta skill?

## Cuándo usar esta skill
- Caso 1
- Caso 2
- Caso 3

## Instrucciones paso a paso
1. Paso 1
2. Paso 2
3. Paso 3

## Formato de salida esperado
- Bloque 1
- Bloque 2
- Bloque 3

## Criterios de calidad
- Criterio 1
- Criterio 2
- Criterio 3

## Referencias
- procedimientos/XX-nombre.md
- documentos/plantilla.md
```

**Ubicación:** `.claude/skills/nombre-skill/SKILL.md`

---

## ROADMAP DE IMPLEMENTACIÓN

### Semana 1
- [x] Crear CLAUDE.md
- [x] Crear procedimientos base (5 + README)
- [ ] Crear Skill: Análisis de Viabilidad
- [ ] Crear Skill: Auditoría de Cumplimiento
- [ ] Crear Skill: Seguimiento de Plazos

### Semana 2
- [ ] Crear Skill: Investigación Jurisprudencial
- [ ] Crear Skill: Generador de Honorarios
- [ ] Crear Skill: Análisis de Riesgos
- [ ] Documentar 5 procedimientos más

### Mes 2
- [ ] Crear Skill: Contenido Legal (marketing)
- [ ] Crear Skill: Reportes Financieros
- [ ] Documentar 10 procedimientos más
- [ ] Instalar /loop para alertas

### Mes 3+
- [ ] Skills especializadas por rama
- [ ] Automatizaciones específicas
- [ ] Expansión a otros MCP servers

---

## DIFERENCIA: SKILL vs MCP vs PROCEDIMIENTO

| Aspecto | Skill | MCP | Procedimiento |
|--------|-------|-----|--------------|
| Qué es | Instrucción Markdown | Conexión a herramienta | Proceso operacional |
| Dónde vive | `.claude/skills/` | `settings.json` | `procedimientos/` |
| Se carga | Solo si aplica | Siempre disponible | Manual (referencia) |
| Ejemplo | "Cómo redactar demanda" | "Acceso a jurisprudencia" | "Tomar nuevo caso" |
| Autoridad | Claude la sigue | Claude la ejecuta | Equipo la sigue |

---

## REFERENCIAS OFICIALES

- **Skills Oficiales de Anthropic:** github.com/anthropics/skills
- **Claude Code Docs (Skills):** code.claude.com/docs/es/skills
- **Superpowers Framework:** github.com/obra/superpowers
- **MCP Servers:** code.claude.com/docs/es/mcp
- **Trail of Bits Skills:** github.com/trailofbits/skills

---

## PRÓXIMAS ACCIONES

**Esta semana:**
1. Revisar este documento
2. Decidir si agregar más skills de Fase 2
3. Comenzar a crear Skill: Análisis de Viabilidad

**Meta:** Tener 3 skills críticas instaladas para fin de semana

---

## Contacto

¿Duda sobre qué skill crear?
- Mira si existe procedimiento relacionado en `/procedimientos/`
- Consulta CLAUDE.md
- Propone skill nueva en issue de repo

---

*Documento vivo. Actualizar cada vez que instales una skill nueva.*
