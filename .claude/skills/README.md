# 🤖 Agentes Automáticos para J.A.C. - Guía Completa

## ¿Qué es esto?

Esta carpeta contiene **3 agentes automáticos** basados en la guía "Skills para Claude" de AIMAX Agency, adaptados y mejorados para el despacho J.A.C.

Estos agentes te permiten:
- ⚡ **Ahorrar 2-3 horas diarias** en tareas repetitivas
- 📚 **Acceder a 329+ superpoderes** (skills, agentes, comandos) listos para instalar
- ⚖️ **Redactar documentos legales** automáticamente con jurisprudencia
- 🔍 **Investigar jurisprudencia** en segundos
- 🏢 **Hacer due diligence** de empresas de forma rápida

---

## 📦 Los 3 Agentes

### 1️⃣ **Instalador de Skills para Claude**
`instalador-skills-claude.md`

**Para qué sirve**: Instala y configura los 329+ superpoderes del repo `alirezarezvani/claude-skills`

**Casos de uso**:
- Necesito instalar 5 skills en la terminal (rápido)
- Quiero preparar ZIPs para la app de escritorio
- Voy a probar skills sin tocar mi instalación principal

**Prompts listos**: 3 prompts copiables para instalar, preparar ZIPs, catalogar

---

### 2️⃣ **Redactor Legal Automático**
`redactor-legal-automático.md`

**Para qué sirve**: Redacta demandas, tutelas, conceptos jurídicos, revisa contratos

**Casos de uso**:
- Necesito una demanda lista para firmar
- Quiero un concepto jurídico estructurado en 20 min
- Voy a revisar este contrato para riesgos legales
- Dame análisis de jurisprudencia sobre mi tema

**Prompts listos**: 4 prompts para demandas, conceptos, revisión de contratos, jurisprudencia

---

### 3️⃣ **Investigador Jurídico Corporativo**
`investigador-juridico-corporativo.md`

**Para qué sirve**: Investiga jurisprudencia, hace due diligence, analiza riesgos legales

**Casos de uso**:
- Necesito investigación profunda sobre un tema legal
- Haz due diligence de esta empresa antes de contratarla
- Dame análisis de riesgos para este tipo de contrato
- Genera checklist de cumplimiento para mi empresa

**Prompts listos**: 5 prompts para jurisprudencia, due diligence, riesgos, compliance, comparativas

---

## 🚀 Cómo Usar (En 3 Pasos)

### Paso 1: Verifica Requisitos (2 min)
```
✅ Claude Desktop instalado (descarga en claude.ai/download)
   o acceso a claude.ai desde navegador
✅ Settings → Capabilities → Code Execution: ACTIVADO
✅ Settings → Capabilities → File Creation: ACTIVADO
✅ (Opcional) Claude Code instalado para terminal
```

### Paso 2: Elige un Agente
```
¿Qué necesitas hacer HOY?

→ Instalar superpoderes              = Instalador de Skills
→ Redactar demanda o concepto        = Redactor Legal
→ Investigar jurisprudencia o riesgos = Investigador Corporativo
```

### Paso 3: Copia un Prompt
Cada agente tiene 3-5 prompts listos. Ábrealos, cópia el que necesites, pégalo en Claude Code o Claude Desktop, y listo.

---

## 📋 Ejemplos Rápidos

### Ejemplo 1: Instalar Skills en 5 minutos
```
Abre: instalador-skills-claude.md
Copia: "Prompt 1: Instalar por nombre"
Cambia: [NOMBRES] por "marketing-skill, redactor-legal, investigador"
Pega en: Claude Code
Espera: 2 min
Reinicia: Claude Code
Listo: Las 3 skills funcionan
```

### Ejemplo 2: Redactar demanda en 30 min
```
Abre: redactor-legal-automático.md
Copia: "Prompt 1: Redactar demanda civil"
Completa: Demandante, demandado, hechos, pretensión
Pega en: Claude Desktop o claude.ai
Espera: Demanda completa con jurisprudencia
Edita: Nombres, cifras, detalles
Firma: Lista para presentar ante juzgado
```

### Ejemplo 3: Due diligence de empresa en 15 min
```
Abre: investigador-juridico-corporativo.md
Copia: "Prompt 2: Due diligence de empresa"
Completa: Razón social, NIT, sector, transacción
Pega en: Claude
Espera: Reporte de riesgos
Revisa: Antecedentes, demandas, sanciones
Usa: Para tomar decisión (contratar, comprar, asociarse)
```

---

## 🎯 Matriz: ¿Cuál Agente Necesito?

| Necesidad | Agente | Tiempo | Complexity |
|-----------|--------|--------|-----------|
| Instalar superpoderes | Instalador Skills | 5-10 min | Baja |
| Redactar demanda | Redactor Legal | 30 min | Media |
| Concepto jurídico | Redactor Legal | 20 min | Media |
| Revisar contrato | Redactor Legal | 15 min | Media |
| Investigar jurisprudencia | Investigador Corp | 10 min | Media |
| Due diligence empresa | Investigador Corp | 15 min | Alta |
| Riesgos legales | Investigador Corp | 20 min | Alta |
| Compliance checklist | Investigador Corp | 20 min | Alta |

---

## ⭐ Reglas de Oro

1. **Empieza con poco**
   - Instala 3-5 skills, no 50
   - Usa 1-2 agentes esta semana, no los 3 a la vez
   - Prueba 1 semana antes de escalar

2. **Verifica siempre**
   - Jurisprudencia → Verifica en SJU
   - Normas → Comprueba en fuentes oficiales
   - Antecedentes empresariales → Valida en Cámara de Comercio

3. **Tú eres responsable**
   - Claude redacta, tú firmas
   - Claude investiga, tú decides
   - Los agentes son herramientas, no reemplazan tu juicio

4. **Ahorra contexto**
   - Copia prompts, no escribas desde cero
   - Reutiliza los mismos prompts para casos similares
   - Documenta qué funcionó (crea tu propia biblioteca)

---

## 🔧 Instalación de los Agentes

### En Claude Desktop (Más Sencillo)
1. Abre Claude Desktop
2. Settings → Capabilities → Skills
3. Click en "Upload skill"
4. Selecciona cualquiera de estos archivos (.md)
5. Menciona el agente por nombre en un chat nuevo
6. Claude lo activa automáticamente

### En Claude Code / Terminal (Más Rápido)
```bash
# Ver agentes disponibles
/skill list

# O menciónalo en cualquier mensaje
"Necesito ayuda del Redactor Legal"
```

---

## 📚 Catálogo Completo de Agentes

### Agentes en esta carpeta

| Archivo | Nombre | Función Principal |
|---------|--------|------------------|
| `instalador-skills-claude.md` | Instalador Skills | Instalar los 329+ superpoderes |
| `redactor-legal-automático.md` | Redactor Legal | Redactar documentos legales |
| `investigador-juridico-corporativo.md` | Investigador Corp | Investigar jurisprudencia y riesgos |
| `README.md` | Esta guía | Orientación rápida |

### Skills Recomendados para Instalar (Próximo Paso)
Si usas el Instalador Skills, considera estas después:
- `marketing-juridico` → Para marketing del despacho
- `marketing-skill` → Copywriting en general
- `product-management` → Gestión de proyectos legales
- `research-skill` → Investigación adicional

---

## ❓ Preguntas Frecuentes

**P: ¿Cuánto cuesta?**
R: Los agentes aquí son gratis. Los 329+ superpoderes del repo claudeskills también son gratis. Necesitas solo acceso a Claude (gratis o pago).

**P: ¿Puedo usar esto en juicio?**
R: Sí. Los documentos que redacta Claude deben ser revisados y firmados por ti. La responsabilidad legal es tuya.

**P: ¿Qué tan confiable es la jurisprudencia?**
R: Informativa. Siempre verifica en SJU (jurisprudencia.co) o bases oficiales antes de usar en documentos formales.

**P: ¿Funciona en móvil?**
R: Los agentes trabajan en Claude Desktop, claude.ai (navegador) y Claude Code. Todavía no en app móvil.

**P: ¿Cómo sé cuál agente usar?**
R: Mira la matriz "¿Cuál Agente Necesito?" en esta guía.

**P: ¿Puedo crear mis propios agentes?**
R: Sí. Copia la estructura de estos .md y crea uno personalizado. Lee `instalador-skills-claude.md` para ver cómo.

**P: ¿Qué pasa si falla?**
R: Revisa que Code Execution y File Creation estén activados en Settings. Ese es el error más común.

---

## 🔄 Flujo de Trabajo Típico

```
DÍA 1: SETUP (10 min)
├─ Verifica requisitos previos
├─ Instala los 3 agentes
└─ Lee esta guía

DÍA 2-7: PRUEBA (1-2 horas)
├─ Redacta una demanda con Redactor Legal
├─ Investiga jurisprudencia con Investigador Corp
├─ Instala 5 skills con Instalador Skills
└─ Observa qué funciona mejor

SEMANA 2+: ESCALA (30 min daily)
├─ Usa Redactor Legal para demandas recurrentes
├─ Usa Investigador Corp para contratos nuevos
├─ Instala más skills según necesidad
└─ Crea tu propia biblioteca de prompts
```

---

## 📖 Fuentes y Créditos

- **Guía original**: "Skills para Claude paso a paso" de AIMAX Agency (@david_ai_pro)
- **Repositorio de skills**: `alirezarezvani/claude-skills` (329 skills + 30 agentes + 70 comandos)
- **Adaptación jurídica**: Para despacho ABOGADOS ASOCIADOS J.A.C.
- **Basado en**: Marco RACF (Rol, Acción, Contexto, Formato) para legal

---

## 🎓 Siguientes Pasos

1. **Hoy**: Lee esta guía completa (10 min)
2. **Mañana**: Instala los 3 agentes (5 min)
3. **Próxima semana**: Usa cada agente una vez (2 horas)
4. **Mes 1**: Personaliza prompts según tus casos
5. **Mes 2**: Enseña a tu equipo cómo usarlos

---

## 💬 Soporte y Feedback

- ¿Necesitas help? Abre cualquiera de los .md y copia un prompt
- ¿Algo no funciona? Verifica Settings → Capabilities
- ¿Quieres mejoras? Este archivo es vivo, mejora se actualizan

---

**Bienvenido al futuro del trabajo legal. 🚀**

Ahora tienes 3 superpoderes. Úsalos sabiamente.
