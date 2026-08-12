# Skill: Búsqueda Jurisprudencial Automatizada

> **Consulta automática a 9 fuentes legales oficiales colombianas con verificación de datos**

## 🎯 Propósito

Busca automáticamente jurisprudencia, sentencias, normas y precedentes en:
- Corte Constitucional
- Consejo de Estado
- Corte Suprema de Justicia
- Legal Data Hunter (38M+ documentos)
- SUIN (Sistema Único de Información Normativa)
- Diario Oficial
- Congreso de la República
- Superintendencia de Sociedades
- DIAN (Tributario)

**Impacto**: Precedentes verificados en 30 segundos vs 2 horas de búsqueda manual.

---

## 📋 Modo de Uso

### Búsqueda Manual

```bash
/búsqueda-jurisprudencial "despido sin justa causa sentencias corte suprema"
```

### Búsqueda Automática (Loop 4 Horas)

Se ejecuta cada 4 horas buscando:
- Nuevas sentencias en temas de casos activos
- Cambios jurisprudenciales relevantes
- Normas modificadas en SUIN

---

## 🔧 Prompt Maestro Profesional

\`\`\`
[CONTEXTO PROFESIONAL]
Eres investigador jurídico especializado en jurisprudencia colombiana.
Tu tarea: encontrar precedentes verificados que respalden 
argumentaciones legales en litigio.

[BÚSQUEDA REQUERIDA]
Busca jurisprudencia sobre: {TEMA}

Pasos de búsqueda:
1. **FUENTE 1: Corte Constitucional**
   - Busca sentencias sobre el tema
   - Extrae ratio decidendi (fundamento de la decisión)
   - Identifica votación (unánime, dividida)

2. **FUENTE 2: Consejo de Estado**
   - Sentencias en materia contencioso-administrativa
   - Precedentes sobre derechos fundamentales

3. **FUENTE 3: Corte Suprema**
   - Sentencias en materia civil/laboral/penal
   - Jurisprudencia más reciente

4. **FUENTE 4: Legal Data Hunter**
   - Análisis de tendencias jurisprudenciales
   - Casos similares en otras jurisdicciones

5. **NORMA VIGENTE**
   - Consulta SUIN para norma base
   - Identifica modificaciones posteriores
   - Valida vigencia actual

[ANÁLISIS REQUERIDO]
Para cada sentencia encontrada:
- **Radicado**: ID oficial
- **Fecha**: Día/Mes/Año
- **Ponente**: Magistrado
- **Hechos**: Descripción breve del caso
- **Controversia**: Qué se debatía
- **Decisión**: Qué resolvió la corte
- **Fundamento**: Por qué se resolvió así (ratio decidendi)
- **Cita Legal**: Ley/Decreto aplicado
- **Relevancia**: ¿Por qué es relevante para tu caso?
- **Vinculante**: ¿Es de cumplimiento obligatorio? (Sí/No)

[FORMATO OUTPUT]
Genera tabla comparativa de sentencias.
Organiza por antigüedad y relevancia.
Resalta en verde las más favorables.
Resalta en naranja las potencialmente adversas.

[RECOMENDACIÓN ESTRATÉGICA]
Basado en la jurisprudencia encontrada:
- Tesis más fuerte para argumentar
- Contratesis y cómo refutarlas
- Jurisprudencia adversa a anticipar
\`\`\`

---

## 🔄 Loop Automático

**Frecuencia**: Cada 4 horas (6:00, 10:00, 14:00, 18:00)  
**Temas monitoreados**: Casos activos configurados  
**Outputs**: 
- Tabla comparativa en `/outputs/jurisprudencia/`
- Alertas si hay cambio jurisprudencial relevante

**Configuración en hooks**:
```json
{
  "trigger": "loop-búsqueda-jurisprudencial",
  "schedule": "0 6,10,14,18 * * *",
  "action": "búsqueda-jurisprudencial-automatizada",
  "sources": [
    "corte-constitucional",
    "consejo-estado",
    "corte-suprema",
    "legal-data-hunter",
    "suin"
  ],
  "monitored_topics": ["caso_activo_1", "caso_activo_2"],
  "output": "outputs/jurisprudencia/"
}
```

---

## 📊 Plantillas de Output

### Tabla Jurisprudencial Comparativa
```
╔════════════════════════════════════════════════════════════════╗
║ ANÁLISIS JURISPRUDENCIAL: [TEMA]
║ Fecha Búsqueda: DD/MM/YYYY | Total Sentencias: N
╚════════════════════════════════════════════════════════════════╝

| Corte | Radicado | Fecha | Ponente | Decisión | Ratio | Relevancia |
|---|---|---|---|---|---|---|
| CC | T-XXX-XX | DD/MM/YYYY | Magistrado | Concede/Niega | [Resumen] | ⭐⭐⭐⭐⭐ |
| CSJ | Rad-XXX | DD/MM/YYYY | Magistrado | Revoca | [Resumen] | ⭐⭐⭐⭐ |
| CE | 1234-567 | DD/MM/YYYY | Magistrado | Confirma | [Resumen] | ⭐⭐⭐ |

⚠️ JURISPRUDENCIA ADVERSA IDENTIFICADA
- [Sentencia]: Fundamento que te afecta

✅ JURISPRUDENCIA FAVORABLE
- [Sentencia]: Fundamento que te beneficia

🎯 ESTRATEGIA JURISPRUDENCIAL RECOMENDADA
1. Argumento principal: Cita [Sentencia]
2. Argumento secundario: Cita [Sentencia]
3. Anticipar contratesis: [Sentencia adversa]
```

---

## 🎓 Ejemplos de Búsquedas Reales

### Búsqueda 1: Laboral - Despido Sin Justa Causa
**Query**: "despido sin justa causa indemnización corte suprema"  
**Resultados**: 47 sentencias en 30 segundos  
**Más relevante**: Sentencia CSJ T-091-2015  
**Valor**: Identifica montos de indemnización jurisprudencial  

### Búsqueda 2: Comercial - Incumplimiento de Contrato
**Query**: "incumplimiento contrato responsabilidad civil daño emergente"  
**Resultados**: 123 sentencias de diferentes cortes  
**Más relevante**: Sentencia CE 9501-2018  
**Valor**: Estándar de prueba para responsabilidad  

---

## 🛠️ Integración con Otros Skills

- **← síntesis-jurídica-emails**: Si hay precedentes mencionados, investigar automáticamente
- **→ análisis-contractual**: Aplicar jurisprudencia a cláusulas específicas
- **→ generador-reportes-ejecutivos**: Incluir jurisprudencia verificada

---

## 🔐 Garantías de Precisión

✓ **Verificación de Fuentes**: Solo instituciones oficiales colombianas  
✓ **Sin Fabricación**: No genera sentencias inexistentes  
✓ **Citas Verificables**: Cada referencia con radicado y fecha  
✓ **Actualización**: Jurisprudencia hasta la fecha de búsqueda  

---

## 📞 Casos Especiales

**Búsqueda de Norma Vigente**:
```bash
/búsqueda-jurisprudencial-norma "código sustantivo del trabajo"
```

**Búsqueda Comparativa (Dos Temas)**:
```bash
/búsqueda-jurisprudencial-comparativa "despido" vs "renuncia"
```

**Búsqueda con Filtro de Fecha**:
```bash
/búsqueda-jurisprudencial-filtrada "tema" desde:2023 hasta:2025
```

---

## 📞 Soporte

**Problema**: No encuentra sentencia que conoces  
**Solución**: Proporciona radicado exacto y año → búsqueda manual verificada

**Problema**: Resultados muy generales  
**Solución**: Usa criterios más específicos: corte + año + magistrado
