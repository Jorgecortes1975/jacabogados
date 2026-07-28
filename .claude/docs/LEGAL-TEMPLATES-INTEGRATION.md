# Legal Templates Integration Guide

**Versión**: 1.0 (Julio 28, 2026)  
**Componente**: Legal Templates Specialist (Subagente + Skill)  
**Integración**: Con project-coordinator y FASE 5 (Operations)

---

## 📋 Resumen Ejecutivo

Se ha integrado el sistema LEXA-LAB de 12 ramas de templates jurídicos verificados como:

1. **Subagente Especializado**: `@legal-templates-specialist`
   - Invocable desde cualquier sesión Claude Code
   - Genera documentos verificados listos para abogado
   - Mantiene memoria persistente de documentos generados

2. **Skill** (herramienta de usuario): `/legal-templates-specialist`
   - Accesible desde Claude Code CLI o web
   - Guía paso a paso para cada rama
   - Ejemplos y checklist pre-radicar

3. **Integración con Infraestructura**: Complementa FASE 5
   - Post-infraestructura: generar contratos, políticas, compliance
   - Pre-litigio: generar demandas, tutelas, defensa

---

## 🎯 Cómo Invocar

### Opción 1: Directa (Subagente — Recomendado)

```bash
# En Claude Code, simplemente:
@legal-templates-specialist genera demanda laboral por despido injustificado
[Proporciona datos cliente]
```

El subagente:
- ✅ Carga template RAMA 8
- ✅ Personaliza con datos reales
- ✅ Genera documento 15-20 páginas
- ✅ Marca [Pendiente: ...] para datos faltantes
- ✅ Incluye checklist completitud pre-radicar
- ✅ Advierte sobre riesgos procesales

### Opción 2: Skill (Si prefieres guía paso a paso)

```bash
/legal-templates-specialist
# → Muestra menú de 12 ramas
# → Selecciona rama
# → Solicita datos en orden
# → Genera documento
```

### Opción 3: Integración con project-coordinator

```bash
# El coordinador puede invocar para doc post-FASE 5:
@project-coordinator ejecuta FASE 5 + genera contrato de trabajo para cliente nuevo
```

project-coordinator delegaría a operations-manager (FASE 5) y luego a legal-templates-specialist.

---

## 📂 Estructura de Archivos

```
.claude/
├── agents/
│   ├── legal-templates-specialist.md          [Subagente definición]
│   ├── project-coordinator.md                 [Orchestrador principal]
│   └── [otros 4 especializados]
│
├── skills/
│   └── legal-templates-specialist/
│       ├── SKILL.md                           [Definición skill pública]
│       └── EXAMPLES.md                        [Ejemplos uso (Rama 8, 3)]
│
├── templates/
│   └── TEMPLATES-LEXA-LAB-12-RAMAS-VERIFICADO.md
│       [Todas 12 ramas verificadas]
│
├── agent-memory/
│   └── legal-templates-specialist/
│       └── MEMORY.md                          [Histórico docs generados]
│       [Se crea automáticamente en primer uso]
│
└── docs/
    └── LEGAL-TEMPLATES-INTEGRATION.md         [Este archivo]
```

---

## 🔄 Flujo de Trabajo Completo

### Escenario: Cliente nuevo solicita demanda laboral

```
1. INTAKE (Recepción)
   Cliente: "Necesito demanda por despido"
   Usuario ingresa: nombre, cédula, empresa, hechos

2. DIAGNÓSTICO (Opcional)
   @legal-templates-specialist revisa situación
   → Identifica rama aplicable (RAMA 8)
   → Alerta sobre riesgos (ej: estabilidad reforzada)

3. GENERACIÓN
   @legal-templates-specialist genera demanda laboral
   + Datos cliente
   → Documento 15-20 páginas

4. REVISIÓN (Abogado)
   - Checklist: ¿Están todas partes identificadas?
   - Riesgos: ¿Se previó defensa empresa?
   - Completitud: ¿[Pendiente: ...] resuelto?
   
5. FIRMA Y RADICAR
   - Abogado firma digitalmente
   - Se radicar en juzgado
   - Documento tracked en MEMORY.md

6. SEGUIMIENTO
   - operations-manager (FASE 5) crea reminder para respuesta
   - Hito: 20 días para contestación (CPTSS)
```

---

## 📊 Las 12 Ramas Disponibles

| # | Rama | Área | Cuándo Usar | Invocación |
|---|------|------|-----------|-----------|
| 1 | Demanda Civil Ordinaria | Civil | Responsabilidad, incumplimiento, daño | `@legal-templates-specialist genera demanda civil ordinaria` |
| 2 | Memorial Casación Civil | Civil | Recurso ante CSJ | `@legal-templates-specialist genera memorial de casación` |
| 3 | Acción de Tutela | Constitucional | Derechos fundamentales urgentes | `@legal-templates-specialist genera tutela urgente` |
| 4 | Habeas Data | Administrativo | Derechos ARCO (acceso, rectif., cancel., oposi.) | `@legal-templates-specialist genera habeas data` |
| 5 | Protección Consumidor | Consumidor | Garantía legal, defectos, devolución | `@legal-templates-specialist genera acción consumidor` |
| 6 | Derecho de Petición | Administrativo | Solicitudes a entes públicos | `@legal-templates-specialist genera petición administrativa` |
| 7 | Nulidad Administrativa | Administrativo | Vicios acto administrativo | `@legal-templates-specialist genera demanda nulidad` |
| 8 | Demanda Laboral—Despido | Laboral | Despido injustificado, seguridad social | `@legal-templates-specialist genera demanda laboral despido` |
| 9 | Defensa Penal | Penal | Audiencia imputación, derechos | `@legal-templates-specialist genera defensa penal` |
| 10 | Nulidad Reforma Estatutaria | Societario | Abuso poder mayoritario SAS | `@legal-templates-specialist genera demanda nulidad estatutaria` |
| 11 | Revocación Licencia Ambiental | Ambiental | Incumplimiento condiciones, daño ambiental | `@legal-templates-specialist genera solicitud revocación ambiental` |
| 12 | Contrato Comercial Internacional | Contrato | Compraventa, suministro, servicios | `@legal-templates-specialist genera contrato internacional` |

---

## 🔐 Seguridad y Anti-Alucinación

### Normas Verificadas (Baseline Julio 2026)

```
✅ CST Art. 64 (Despido injustificado) — vigente desde 1950
✅ Ley 2381/2024 (Reforma pensional) — vigente desde 01-07-2025
✅ Decreto 560/2020 (Insolvencia laboral) — vigente
✅ CGP Ley 1564/2012 (Código General Proceso) — vigente
✅ CP Arts. 86-87 (Tutelas) — vigente
✅ Ley 1581/2012 (Habeas data) — vigente
✅ Ley 1480/2011 (Protección consumidor) — vigente

❌ Ley 2270/2024 — NO EXISTE (eliminada de templates)
❌ Ley 2261/2024 — NO EXISTE (eliminada de templates)
```

### Marca de Incertidumbre

Cuando normativa es dinámica, templates marcan:

```
[Pendiente: Completar nombre testigo]           ← Dato faltante
[Reformación pendiente — Verificar CC post-2024] ← Línea jurisprudencial en evolución
[s/d]                                            ← Sin definición oficial (raro)
```

### Prohibiciones Integradas

El subagente **nunca**:
- ❌ Radicar documento (solo abogado)
- ❌ Inventar normas o jurisprudencia
- ❌ Prometer resultado litigio
- ❌ Reemplazar análisis estratégico abogado
- ❌ Firmar documentos

---

## 💾 Persistencia de Memoria

Cada uso genera entrada en `.claude/agent-memory/legal-templates-specialist/MEMORY.md`:

```json
{
  "fecha": "2026-07-28T14:30:00Z",
  "rama": 8,
  "cliente": "Juan Carlos López Ramírez",
  "documento": "Demanda Laboral Despido Injustificado",
  "estado": "generado - pendiente firma",
  "riesgos_identificados": [
    "Empresa puede alegar justa causa en contestación",
    "Estabilidad reforzada — verificada NO aplica"
  ],
  "normativa_consultada": [
    "CST Art. 64 (VIGENTE)",
    "Ley 2381/2024 (VIGENTE desde 01-07-2025)"
  ],
  "próximo_hito": "2026-08-17 (respuesta empresa)"
}
```

La memoria permite:
- Tracking de documentos generados
- Histórico de riesgos por rama
- Patrón de cambios normativos
- Métricas de uso (qué ramas son populares)

---

## 📋 Validación Pre-Radicar

Cada documento incluye checklist automático:

```
COMPLETITUD (8 items)
[?] Todas partes identificadas (cédula/NIT)
[?] Juzgado competente (municipio, especialidad)
[?] Cuantía correcta
[?] Hechos etiquetados [Acreditado/Afirmado/Controvertido]
[?] Pretensiones claras y congruentes
[?] Normas vigentes citadas
[?] Jurisprudencia verificable (con radicado)
[?] Pruebas disponibles

RIESGOS (rama-específico)
[ ] Estabilidad reforzada — ¿Aplica? [RAMA 8]
[ ] Plazo de caducidad — ¿Vigente? [RAMA 8, 7, etc]
[ ] Subsidiariedad probada — ¿Sí? [RAMA 3]
```

---

## 🚀 Casos de Uso

### Caso 1: Empresa nueva contratación
```
FASE 5 (operations-manager) crea nuevos contratos
→ @legal-templates-specialist RAMA 1 (Demanda Civil) NO aplica
→ @legal-templates-specialist genera CONTRATO LABORAL [no es rama, es anexo]
→ O: manualmente en Word con checklist de compliance
```

### Caso 2: Dispute resolución
```
Cliente tiene conflicto laboral
→ @legal-templates-specialist RAMA 8 (Despido) → Demanda 15 pág
→ Abogado firma
→ operations-manager (FASE 5) crea reminder: "Respuesta empresa vence 20-ago"
```

### Caso 3: Compliance post-reforma normativa
```
Ley 2381/2024 entra (01-07-2025)
→ legal-templates-specialist MEMORY.md marca: "Aportes pensionales cambiaeron"
→ Próximo uso de templates laboral: actualiza automáticamente
```

### Caso 4: Contrato internacional
```
Cliente exporta a Perú
→ @legal-templates-specialist RAMA 12
→ Genera contrato con CISG (si aplica) + INCOTERMS 2020
→ Bilingüe (Esp/Ing) si especifica
```

---

## 🔗 Integración con project-coordinator

```
Entrada usuario: "Necesito contrato de 3 empleados + demanda cliente antiguo"
                    ↓
          project-coordinator
                    ├─ FASE 5 (operations-manager)
                    │  └─ Crea checklist compliance nuevas contrataciones
                    │
                    └─ @legal-templates-specialist
                       ├─ RAMA 8 → Demanda laboral cliente
                       ├─ RAMA 1 → Contrato empleado 1-3
                       └─ → Todos documentos generados, MEMORY.md actualizado
```

---

## ⚙️ Configuración

### Modelo y Herramientas

```yaml
legal-templates-specialist:
  model: sonnet                    # Balanceado velocidad/capacidad
  tools: [Read, Write, Bash, Grep, Glob]
  memory_scope: project            # Persistente entre sesiones
  access_level: restricted         # No puede radicar ni firmar
  rate_limit: 10 docs/hora         # Evita abuso
```

### Variables de Entorno (Opcional)

```bash
export TEMPLATES_VERSION="2.0-jul-2026"
export NORMATIVA_BASELINE="2026-07-28"
export VERIFICATION_REQUIRED="true"
```

---

## 📞 Troubleshooting

### Problema: Subagente no aparece en typeahead

```bash
# Solución: Reinicia Claude Code
# Los subagentes se detectan al iniciar
# Esperado ver: @legal-templates-specialist en @mention menu
```

### Problema: Documento tiene [Pendiente: ...]

```bash
# Esto es CORRECTO — indica dato faltante
# Abogado debe ingresar valor mancionado
# Ej: [Pendiente: Nombre testigos] → Ingresa: Pedro García, Juan López
```

### Problema: ¿"Reformación pendiente" qué significa?

```
[Reformación pendiente — Verificar línea CC post-2024]
= La línea jurisprudencial ESTÁ VIGENTE pero podría cambiar
= Antes de radicar, abogado revisa sentencias recientes de ese juzgado
= Ej: Estabilidad reforzada tiene cambios recientes post-2024
```

### Problema: Normativa diferente en mi municipio

```
Templates usan baselines nacionales (CST, CP, leyes nacionales)
Si municipio tiene: Acuerdo local (Medellín, Bogotá), decreto regional
→ Abogado AGREGA eso específico antes de radicar
→ El subagente avisará: "Verificar si aplica normativa local"
```

---

## 📚 Referencias

- **Subagente**: `.claude/agents/legal-templates-specialist.md`
- **Skill**: `.claude/skills/legal-templates-specialist/SKILL.md`
- **Templates**: `.claude/templates/TEMPLATES-LEXA-LAB-12-RAMAS-VERIFICADO.md`
- **Ejemplos**: `.claude/skills/legal-templates-specialist/EXAMPLES.md`
- **Coordinador**: `.claude/agents/project-coordinator.md`
- **Operaciones**: `.claude/agents/operations-manager.md`

---

## ✅ Checklist de Validación

- [x] Subagente creado: `.claude/agents/legal-templates-specialist.md`
- [x] 12 templates verificados: `.claude/templates/...`
- [x] Skill pública: `.claude/skills/legal-templates-specialist/SKILL.md`
- [x] Ejemplos documentados: `EXAMPLES.md` (Rama 8, 3)
- [x] Invocable: `@legal-templates-specialist` aparece en typeahead
- [x] Integración: project-coordinator puede delegar
- [x] Memoria: `.claude/agent-memory/legal-templates-specialist/MEMORY.md` (créase en primer uso)
- [x] Normativa: Verificada vigente julio 2026
- [x] Anti-alucinación: Referencias falsas eliminadas

---

**Estado**: 🟢 Operacional  
**Próximo**: Documentar integraciones adicionales + casos de uso por industria  
**Mantenimiento**: Revisar normativa trimestral (vigilancia-normativa-col)

---

**Autor**: Legal Templates Specialist v1.0  
**Fecha**: Julio 28, 2026  
**Bufete**: Cortés Cartagena — Jorge Ángel Cortés T.P. 365.594
