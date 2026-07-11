# CLAUDE.md — Jacabogados

**Última actualización:** 2026-07-11  
**Responsable:** Equipo de Operaciones

---

## Resumen del Proyecto

**Jacabogados** es un despacho legal profesional especializado en derecho civil, penal, laboral, administrativo, comercial y constitucional en Colombia.

El objetivo es:
- Estandarizar procesos legales
- Documentar procedimientos operacionales
- Automatizar análisis y redacción legal
- Mejorar eficiencia sin sacrificar calidad legal

---

## Stack Tecnológico

- **Plataforma Legal:** Claude Code (Claude 3.5 Sonnet)
- **MCP Servers:** Legal Data Hunter (jurisprudencia), Brave Search (investigación)
- **Versionado:** Git + GitHub (rama: claude/fable-skills-guide-i6psqy)
- **Gestión de Documentos:** Sistema de carpetas (casos/, documentos/, procedimientos/)
- **Presentación Digital:** SGDE (Sistema General Digital Electrónico)
- **Herramientas de Soporte:** Obsidian/Markdown para documentación

---

## Estructura del Repositorio

```
/home/user/jacabogados/
├── CLAUDE.md                          # Este archivo (contexto del proyecto)
├── .claude/
│   ├── settings.json                  # Config de permisos y MCP servers
│   └── skills/                        # Skills profesionales reutilizables
│       ├── redaccion-legal-colombia/
│       │   └── SKILL.md
│       ├── analisis-viabilidad-legal/
│       │   └── SKILL.md
│       ├── seguimiento-plazos/
│       │   └── SKILL.md
│       ├── auditoria-cumplimiento/
│       │   └── SKILL.md
│       └── [otras skills]
│
├── procedimientos/                    # Wiki de procesos operacionales
│   ├── README.md                      # Índice maestro
│   ├── 01-tomar-nuevo-caso.md
│   ├── 02-evaluar-viabilidad-legal.md
│   ├── 03-realizar-demanda.md
│   ├── [... 20+ procedimientos]
│
├── documentos/                        # Plantillas, guías, referencias
│   ├── plantillas/
│   │   ├── contrato-servicios.md
│   │   ├── propuesta-honorarios.md
│   │   └── [otras plantillas]
│   └── jurisprudencia/
│       └── [casos precedentes]
│
└── casos/                             # Carpetas de clientes (cifradas si aplica)
    ├── [APELLIDO_CLIENTE]/
    │   └── [AÑO]-[MES]/
    │       ├── 01_evaluacion_viabilidad.md
    │       ├── 02_documentos/
    │       ├── 03_comunicaciones/
    │       └── 04_estrategia_legal.md
```

---

## Diferencia: Agentes vs Skills

En **Jacabogados** usamos dos formas de guiar a Claude:

### 1. **CLAUDE.md** — Contexto del Despacho (Este archivo)
- Explica **qué es** el proyecto y cómo trabajamos
- Define **reglas, comandos y estructura**
- Se carga **siempre** que Claude entra al proyecto
- Es **estable** y cambia poco (trimestral)

**Ejemplo en este proyecto:**
- "Jacabogados es un despacho legal en Colombia"
- "Usamos Git en rama claude/fable-skills-guide-i6psqy"
- "Antes de redactar cualquier demanda, consulta skill redaccion-legal-colombia"

### 2. **Skills** — Procesos Reutilizables (Carpeta .claude/skills/)
- Son **plantillas para tareas específicas y repetidas**
- Se cargan **solo cuando aplican**
- Ejemplo: "Analizar viabilidad legal de un caso" → Skill `analisis-viabilidad-legal`
- Otra tarea: "Revisar si cumplimos plazos procesales" → Skill `seguimiento-plazos`

**Ventaja:** No repites instrucciones cada vez. La skill es la autoridad.

---

## Comandos Importantes

### Desarrollo y Git
```bash
# Ver estado actual
git status

# Crear rama local si no existe
git checkout -b claude/fable-skills-guide-i6psqy

# Actualizar rama local
git fetch origin claude/fable-skills-guide-i6psqy
git pull origin claude/fable-skills-guide-i6psqy

# Agregar cambios
git add procedimientos/
git add .claude/skills/

# Commit con mensaje claro
git commit -m "Documentar procedimiento: tomar nuevo caso"

# Push a rama designada
git push -u origin claude/fable-skills-guide-i6psqy
```

### Consultas Legales
```bash
# Ver procedimientos disponibles
ls procedimientos/

# Ver skills instaladas
ls .claude/skills/

# Buscar jurisprudencia sobre tema específico
# (Usar Claude con skill redaccion-legal-colombia)

# Verificar normas colombianas
# (Claude + MCP Legal Data Hunter)
```

---

## Reglas del Proyecto

### 1. Redacción Legal
- **SIEMPRE** cita normas colombianas específicas (Código, artículo, ley)
- **NUNCA** cites normas de otros países (este es despacho en Colombia)
- Si redactas demanda, consulta skill `redaccion-legal-colombia` primero
- Verifica: ¿El juzgado correcto? ¿El procedimiento correcto? ¿La rama correcta?

### 2. Procedimientos
- Cada procedimiento operacional está en `/procedimientos/`
- Si necesitas hacer algo repetido, **busca si ya existe procedimiento**
- Si no existe, **propón crear uno** en lugar de improvisa
- Los procedimientos se revisan **trimestralmente** (meses 1, 4, 7, 10)

### 3. Documentación de Casos
- Cada caso va en `/casos/[APELLIDO_CLIENTE]/[AÑO]-[MES]/`
- Subcarpetas estándar: `documentos/`, `comunicaciones/`, `escritos_legales/`
- Archivo `01_evaluacion_viabilidad.md` es **obligatorio** antes de aceptar caso
- Archivo `log_seguimiento.md` se actualiza **cada vez** que hay movimiento

### 4. Versionado Git
- Rama designada: `claude/fable-skills-guide-i6psqy`
- **NO** empujes a `main` sin aprobación
- Commits deben ser **descriptivos y claros**
- Si hay cambios pendientes: `git status` antes de comprometerse a nada

### 5. Confidencialidad
- Datos de clientes: **cifrados o fuera del repo público**
- Información sensible: **nunca en CLAUDE.md o skills públicas**
- Contraseñas/tokens: Use variables de entorno (nunca hardcodeadas)

### 6. Calidad Legal
- Antes de presentar escrito al juzgado:
  - ✓ Revisar skill `redaccion-legal-colombia`
  - ✓ Verificar normas en Legal Data Hunter
  - ✓ Consultar procedimiento P-003 (Realizar demanda)
  - ✓ Auditoría de cumplimiento P-014
  - ✓ Humano: **Socio revisa antes de presentar**

---

## Validaciones Antes de Terminar

### Para Redacción Legal
- [ ] ¿Cité la norma colombiana correcta? (no vaga, no de otro país)
- [ ] ¿Es el procedimiento correcto? (ordinario/sumario/verbal)
- [ ] ¿El juzgado competente?
- [ ] ¿Identidades completas de partes?
- [ ] ¿Petitorio claro y específico?
- [ ] ¿Pruebas identificadas?

### Para Procedimientos
- [ ] ¿Está documentado cada paso?
- [ ] ¿Hay checklist al final?
- [ ] ¿Hay contacto para escalaciones?
- [ ] ¿Hay métricas de éxito?
- [ ] ¿Está en rama correcta?

### Para Casos
- [ ] ¿Evaluación de viabilidad completa?
- [ ] ¿Contrato de servicios firmado?
- [ ] ¿Depósito inicial recibido?
- [ ] ¿Carpeta de caso creada?
- [ ] ¿Log de seguimiento iniciado?

### Para Commits
- [ ] ¿Mensaje descriptivo?
- [ ] ¿Archivos relacionados incluidos?
- [ ] ¿Sin datos sensibles?
- [ ] ¿Push a rama correcta?

---

## Documentos Para Leer si Aplica

### Onboarding Inicial
- **procedimientos/README.md** — Mapa completo de procesos (leer primero)
- **procedimientos/01-tomar-nuevo-caso.md** — Ciclo de vida de un caso (leer segundo)
- **.claude/skills/redaccion-legal-colombia/SKILL.md** — Cómo redactar legalmente en Colombia

### Para Tareas Específicas
- **procedimientos/02-evaluar-viabilidad-legal.md** — ¿Es viable el caso?
- **procedimientos/03-realizar-demanda.md** — Cómo preparar y presentar escrito
- **procedimientos/04-seguimiento-judicial.md** — Monitoreo de procesos
- **.claude/skills/seguimiento-plazos/SKILL.md** — Alertas de vencimientos

### Para Finanzas y Operaciones
- **procedimientos/06-facturar-casos.md** — Cómo cobrar honorarios
- **procedimientos/08-reporte-financiero.md** — Análisis mensual
- **procedimientos/11-reuniones-de-equipo.md** — Protocolos de equipo

### Para Cumplimiento
- **procedimientos/13-presentacion-sgde.md** — Sistema digital juzgados
- **procedimientos/14-auditoria-legal.md** — Verificación de normas
- **.claude/skills/auditoria-cumplimiento/SKILL.md** — Auditar un documento

---

## Stack de Herramientas Profesionales

| Herramienta | Uso | En Este Proyecto |
|-------------|-----|-----------------|
| Claude Code | Automatización legal y redacción | Principal |
| Legal Data Hunter MCP | Jurisprudencia y normas | settings.json |
| Brave Search MCP | Investigación general | settings.json |
| GitHub | Versionado y colaboración | Rama claude/fable-skills-guide-i6psqy |
| Markdown | Documentación | Toda la estructura |
| Git | Control de cambios | Commits diarios |

---

## Errores Comunes a Evitar

❌ **Redactar demanda SIN consultar skill redaccion-legal-colombia**  
✓ Siempre consulta la skill primero

❌ **Aceptar caso sin evaluación formal de viabilidad**  
✓ Completa el procedimiento P-002 y documenta veredicto

❌ **No documentar un procedimiento nuevo**  
✓ Si algo se repite, crea procedimiento en /procedimientos/

❌ **Citar "la ley" sin ser específico**  
✓ "Artículo 82 Código de Procedimiento Civil (Ley 1564 de 2012)"

❌ **Guardar documentos legales sin estructura de carpeta**  
✓ /casos/[APELLIDO]/[AÑO]-[MES]/[tipo_documento]/

❌ **Push a rama equivocada o sin testing**  
✓ `git push -u origin claude/fable-skills-guide-i6psqy` siempre

❌ **Datos sensibles en textos públicos**  
✓ Usa variables de entorno o documenta solo procesos genéricos

---

## Convenciones del Proyecto

### Nombres de Archivos
- Procedimientos: `NN-nombre-del-procedimiento.md` (ej: `01-tomar-nuevo-caso.md`)
- Skills: `nombre-skill/SKILL.md` (ej: `redaccion-legal-colombia/SKILL.md`)
- Casos: `/casos/[APELLIDO]/[AAAA]-[MM]/`
- Documentos: `nombre_documento_claro.md`

### Títulos en Documentos
```markdown
# Procedimiento: Nombre
## Objetivo
## Alcance
## Paso a Paso
## Excepciones
## Métricas
## Checklist
## Contacto
```

### Commits Git
```
"Documentar procedimiento: tomar nuevo caso"
"Crear skill: análisis de viabilidad legal"
"Actualizar normas colombianas en redaccion-legal-colombia"
"Cerrar caso: Juan García (civil - resuelto)"
```

---

## Cómo Claude Debe Trabajar Aquí

1. **Al llegar al proyecto:** Lee este CLAUDE.md primero
2. **Para redactar documentos legales:** Carga skill `redaccion-legal-colombia`
3. **Para analizar viabilidad:** Carga skill `analisis-viabilidad-legal`
4. **Para seguimiento:** Carga skill `seguimiento-plazos`
5. **Para auditar:** Carga skill `auditoria-cumplimiento`
6. **Para cualquier tarea repetida:** Busca procedimiento en `/procedimientos/`
7. **Si nada aplica:** Propone crear nuevo procedimiento o skill

---

## Contacto y Escalación

| Pregunta | Contactar | Documento |
|----------|-----------|-----------|
| ¿Cómo redacto una demanda? | Skill redaccion-legal-colombia | .claude/skills/ |
| ¿Cuál es el procedimiento para X? | Procedimiento específico | procedimientos/ |
| ¿Es viable este caso? | Skill analisis-viabilidad-legal | .claude/skills/ |
| ¿Qué plazos vencen? | Skill seguimiento-plazos | .claude/skills/ |
| ¿Cumplimos normas? | Skill auditoria-cumplimiento | .claude/skills/ |
| Duda sobre estructura repo | Este CLAUDE.md | /CLAUDE.md |

---

## Historial de Actualizaciones

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0 | 2026-07-11 | Documento base creado con estructura profesional |

---

## Próximas Fases (Timeline)

**Fase 1 (Semanas 1-2):** Documentación de 20 procedimientos operacionales ✓ En progreso  
**Fase 2 (Semanas 3-4):** Crear 6 skills reutilizables de alto valor  
**Fase 3 (Mes 2):** Sistema de alertas y automatización con /loop  
**Fase 4 (Mes 2+):** Marketing y comunicación del despacho  

---

*Este documento es autoridad en el proyecto. Cualquier cambio significativo debe ser revisado por el Socio responsable.*
