# Perfiles CLAUDE.md — JAC Abogados

Cinco perfiles de instrucciones operativas. Elige uno según la tarea.

## 🎯 Usa CLAUDE-codigo.md cuando...
- Desarrollas features, cambios a hooks, mejoras al sistema
- Escribes o editas scripts (Bash, Python)
- Testeas código antes de producción
- **Activación**: Automática al trabajar en archivos de código

**Ejemplo**: "Mejora el script firecrawl-daily.sh para detectar más sentencias"

---

## 🤖 Usa CLAUDE-agentes.md cuando...
- Los hooks se ejecutan solos (sin ti leyendo la respuesta)
- El output lo consume otro programa (JSON a dashboard, webhook a Slack)
- Los loops están corriendo en background
- Quieres cero charla, solo resultados estructurados
- **Activación**: Automática cuando un hook ejecuta

**Ejemplo**: El hook hallucination-check-hourly.sh corre a las 3 PM UTC

---

## 📊 Usa CLAUDE-analisis.md cuando...
- Necesitas revisar métricas del sistema (tareas completadas, hallucinations, coverage)
- Haces reportes de performance
- Analizas logs para encontrar patrones
- **Activación**: Manual + chequeo automático de datos

**Ejemplo**: "Qué hallucinations tuvimos esta semana y por qué"

---

## 💼 Usa CLAUDE-operaciones.md cuando...
- Tomas decisiones sobre servicios, clientes, prioridades
- Necesitas recomendación operativa (qué hacer ahora)
- Revisas notas de reuniones
- Gestión de equipo, recursos, restricciones
- **Activación**: Manual, cuando necesitas asesoría operativa

**Ejemplo**: "¿Expandimos a servicios tributarios o profundizamos en laboral?"

---

## 📋 CLAUDE.md (raíz) — Base
Aplica siempre. Solo: cómo trabajas, cómo respondes, límites duros, lo que nunca se toca.

---

## Cómo cargan

| Archivo | Cuándo | Aplica a |
|---------|--------|----------|
| CLAUDE.md (raíz) | Siempre, al arrancar | Todo |
| CLAUDE-codigo.md | Al abrir archivos en `.claude/` o `src/` | Desarrollo |
| CLAUDE-agentes.md | Al ejecutar hooks o loops | Automatización |
| CLAUDE-analisis.md | Manual + logs con datos | Métricas |
| CLAUDE-operaciones.md | Manual en decisiones | Negocio |

---

## Ejemplo: Flujo de una tarea compleja

```
1. "Quiero mejorar el hook de firecrawl"
   → Usa CLAUDE-codigo

2. Termina cambio y commit
   → Se ejecuta automáticamente con CLAUDE-agentes

3. "Cuántas sentencias encontró esta semana"
   → Usa CLAUDE-analisis

4. "¿Vale la pena invertir en Firecrawl premium?"
   → Usa CLAUDE-operaciones
```

---

## Switchear de perfil en el chat

No necesitas hacer nada. Los perfiles se cargan automáticamente según el contexto. Si quieres ser explícito:

```
Usa el perfil CLAUDE-operaciones: ¿hacemos más énfasis en laboral o mercantil?
```

---

**Versión**: 1.0 — Julio 31, 2026  
**Sistema**: JAC Business Automation v4  
**Autor**: Claude + Jorge Cortés
