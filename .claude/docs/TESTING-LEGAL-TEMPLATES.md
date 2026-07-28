# Testing Guide — Legal Templates Specialist

**Versión**: 1.0 (Julio 28, 2026)  
**Propósito**: Validar que @legal-templates-specialist funciona correctamente  
**Duración estimada**: 30 minutos

---

## ✅ Pre-Test Checklist

Antes de ejecutar pruebas, verifica:

```
[ ] Subagente exists: .claude/agents/legal-templates-specialist.md
[ ] Skill created: .claude/skills/legal-templates-specialist/SKILL.md
[ ] Templates loaded: .claude/templates/TEMPLATES-LEXA-LAB-12-RAMAS-VERIFICADO.md
[ ] Examples exist: .claude/skills/legal-templates-specialist/EXAMPLES.md
[ ] Claude Code restarted (si es primera vez)
[ ] @legal-templates-specialist aparece en @mention typeahead
[ ] Memoria directory exists: .claude/agent-memory/legal-templates-specialist/
```

---

## 🧪 Test 1: Básico — Invocación y Respuesta

**Objetivo**: Verificar que el subagente responde a invocación.

**Pasos**:

1. En Claude Code, escribe:
   ```
   @legal-templates-specialist hola, ¿cuáles son las 12 ramas disponibles?
   ```

2. **Resultado esperado**:
   - ✅ Subagente responde en 5-10 segundos
   - ✅ Lista las 12 ramas correctas
   - ✅ NO inventa normas adicionales

3. **Si falla**:
   - Reinicia Claude Code
   - Verifica que archivo `.claude/agents/legal-templates-specialist.md` existe
   - Revisa si hay errores en syntaxis YAML del archivo

---

## 🧪 Test 2: Generación de Documento — Rama 8 (Demanda Laboral)

**Objetivo**: Generar demanda laboral completa con datos reales.

**Pasos**:

```
@legal-templates-specialist genera demanda laboral por despido injustificado

DEMANDANTE:
- Nombre: María Alejandra Rodríguez Martínez
- Cédula: 42.123.456-7
- Domicilio: Cra 45 #20-15, Medellín, Antioquia
- Teléfono: 320-555-0199

DEMANDADO:
- Empresa: Manufactura Industrial S.A.S.
- NIT: 880.456.789-3
- Domicilio: Calle 88 #50-80, Medellín, Antioquia

HECHOS:
- Fecha ingreso: 15-ene-2022 (contrato indefinido)
- Cargo: Supervisora de calidad
- Salario: $3.200.000/mes
- EPS: Sanitas
- Pensión: Protección
- ARL: SURA
- Fecha despido: 10-julio-2026
- Sin especificación de justa causa en comunicación

PRUEBAS:
- Contrato indefinido (disponible)
- Últimas 6 nóminas
- Comunicación despido
- Certificado laboral positivo
```

**Resultado esperado**:

- ✅ Documento 15-20 páginas
- ✅ Estructura RAMA 8 verificada
- ✅ Todas normas citadas vigentes (CST Art. 64, Ley 2381/2024, etc.)
- ✅ Cuantía calculada correctamente
- ✅ Checklist de completitud incluido
- ✅ [Pendiente: ...] marca datos faltantes
- ✅ NO radicar sin firma abogado

**Validar**:

- [ ] Juzgado competente: "Juzgado de lo Laboral Medellín"
- [ ] Plazo caducidad: "2 años desde despido" (aún vigente)
- [ ] Pretensión principal: ~$9.6M (3 salarios × 3.2M)
- [ ] Pretensión subsidiaria incluida
- [ ] Riesgos identificados

---

## 🧪 Test 3: Validación Normativa

**Objetivo**: Verificar que normas citadas están vigentes y sin alucinación.

**Pasos**:

1. Ejecuta:
   ```
   @legal-templates-specialist cuáles normas citas en RAMA 8?
   ```

2. **Resultado esperado**:
   - ✅ CST Art. 64 — VIGENTE (desde 1950, sin cambios)
   - ✅ Art. 62 CST — VIGENTE (define justa causa)
   - ✅ Ley 2381/2024 — VIGENTE (desde 01-07-2025)
   - ✅ Ley 1562/2012 — VIGENTE (SGRRL)
   - ❌ **NO menciona**: Ley 2270/2024 (NO EXISTE)
   - ❌ **NO menciona**: Ley 2261/2024 (NO EXISTE)

3. **Si aparecen normas inexistentes**:
   - Escríbelo como bug → Contacta especialista
   - Probable causa: Template no actualizado
   - Solución: Regenerar desde `.claude/templates/...`

---

## 🧪 Test 4: Rama 3 — Acción de Tutela (Urgencia)

**Objetivo**: Verificar que rama constitucional respeta test de procedibilidad.

**Pasos**:

```
@legal-templates-specialist genera acción de tutela urgente

DEMANDANTE:
- Carlos Moreno García
- Cédula: 13.987.654-2
- Domicilio: Transv 12 #35-44, Bogotá D.C.

DEMANDADO:
- Pensión Garantizada IPS
- Razón social: Pensión Garantizada IPS
- Domicilio: Cra 7 #32-12, Bogotá D.C.

DERECHOS VULNERADOS:
- Derecho al trabajo (CP 25)
- Derecho a la seguridad social (CP 48)

URGENCIA:
- Fecha vulneración: 25-julio-2026 (3 días atrás)
- Problema: Pensión suspendida sin notificación
- Perjuicio: Sin dinero para arriendo (vence 31-julio)
- Plazo: 5 días para ser desalojado

MEDIDA CAUTELAR SOLICITADA:
- Reactivar mesada pensión de inmediato
```

**Resultado esperado**:

- ✅ Documento BREVE (3-5 páginas max)
- ✅ Test procedibilidad verificado:
  - [ ] Subsidiariedad: "Recurso administrativo tardío (expiró plazo 10 días)"
  - [ ] Inmediatez: "Amenaza concreta 31-julio-2026"
  - [ ] Perjuicio irremediable: "Pérdida vivienda"
  - [ ] Legitimación activa: "Pensionado directo"
- ✅ CP arts. 86-87 citados
- ✅ Decreto 2591/1991 citado
- ✅ Medida cautelar clara

**Validar**:

- [ ] NO es demanda ordinaria (urgencia prevalece)
- [ ] Juzgado de tutela competente (donde demandado)
- [ ] Plazo respuesta 10 días (CPTSS)

---

## 🧪 Test 5: Rama 12 — Contrato Internacional

**Objetivo**: Generar contrato comercial con INCOTERMS 2020.

**Pasos**:

```
@legal-templates-specialist genera contrato comercial internacional

PARTES:
- Exportador: Aceites Amazónicos S.A.S. (Colombia)
  NIT: 900.234.567-1
- Importador: Oleochemicals Europe GmbH (Alemania)
  Adr. de contacto: Hamburg, Alemania

BIEN:
- Descripción: 50 toneladas aceite de palma refinado, grado cosmético
- Especificación técnica: ISO 4072, color Lovibond max 20Y, FFA max 0.5%
- Cantidad: 50,000 kg
- Calidad: 99.8% pureza

PRECIO Y PAGO:
- Precio: USD 2,800/tonelada
- Incoterm: CIF Hamburg 2020
- Valor total: USD 140,000
- Pago: Crédito documentario irrevocable 45 días contra presentación B/L

ENTREGA:
- Lugar: Puerto de Cartagena, Colombia
- Plazo: Dentro de 60 días desde firma

GARANTÍA:
- Duración: 12 meses desde entrega
- Cobertura: Defectos de fabricación, especificación
- Remedy: Reemplazo sin costo de producto defectuoso
- Exclusiones: Uso incorrecto, negligencia importador

LEY APLICABLE:
- Ley colombiana (Código Comercio)
- CISG 1980 suplementariamente
- Idiomas: Español (original)

SOLUCIÓN CONTROVERSIAS:
- Opción A: Arbitraje UNCITRAL, Cámara Comercio Bogotá
- Opción B: Negociación 30 días + mediación + arbitraje
```

**Resultado esperado**:

- ✅ Contrato 8-10 páginas, bilingüe (Esp/Ing)
- ✅ INCOTERMS 2020 citados correctamente
- ✅ CISG aplicable (suplementariamente)
- ✅ Cláusulas críticas:
  - [ ] Descripción técnica
  - [ ] Precio y forma pago
  - [ ] Incoterm CIF (transferencia riesgos en Hamburg)
  - [ ] Garantía 12 meses
  - [ ] Ley aplicable
  - [ ] Arbitraje UNCITRAL
- ✅ Firma de authorized representatives

---

## 🧪 Test 6: Memoria Persistente

**Objetivo**: Verificar que documentos generados se guardan en memoria.

**Pasos**:

1. Después de Test 2 y Test 4, revisa:
   ```bash
   cat .claude/agent-memory/legal-templates-specialist/MEMORY.md
   ```

2. **Resultado esperado**:
   - ✅ Archivo existe y contiene JSON/Markdown
   - ✅ Entradas para:
     - Rama 8 (demanda laboral) — estado: "generado - pendiente firma"
     - Rama 3 (tutela) — estado: "generado - pendiente firma"
   - ✅ Normativa consultada listada
   - ✅ Riesgos identificados guardados
   - ✅ Próximos hitos (ej: "2026-08-17 respuesta empresa")

3. **Si archivo no existe**:
   - ✅ Se crea automáticamente en primer uso
   - En caso de error, crear manualmente:
     ```bash
     mkdir -p .claude/agent-memory/legal-templates-specialist/
     echo "# MEMORY — Legal Templates Specialist" > .claude/agent-memory/legal-templates-specialist/MEMORY.md
     ```

---

## 🧪 Test 7: Checklist de Completitud

**Objetivo**: Verificar que checklist pre-radicar funciona.

**Pasos**:

1. En documento generado (Test 2), busca sección:
   ```
   CHECKLIST DE COMPLETITUD PRE-RADICAR
   ```

2. **Validar contenido**:
   - [ ] 8+ items de verificación
   - [ ] Formato: `[✓] o [✗]` según estado
   - [ ] Items cubiertos:
     - Partes identificadas
     - Competencia
     - Cuantía
     - Hechos etiquetados
     - Pretensiones
     - Normas vigentes
     - Jurisprudencia
     - Pruebas
   - [ ] Sección "RIESGOS" identifica peligros reales

3. **Si checklist está incompleto**:
   - Documento útil pero incompleto
   - Abogado debe completar manualmente
   - Reportar como feedback

---

## 🧪 Test 8: Anti-Alucinación Jurídica

**Objetivo**: Verificar que NO inventa normas.

**Pasos**:

```
@legal-templates-specialist cita la Ley 2270/2024 y Ley 2261/2024
```

**Resultado esperado**:

- ✅ Responde: "Ley 2270/2024 y Ley 2261/2024 NO EXISTEN"
- ✅ Explica: "Fueron eliminadas de templates hace julio 2026"
- ✅ Sugiere: "Usar en su lugar: Art. 64 CST, Ley 2381/2024"
- ❌ NUNCA dice: "Sí, aquí está la ley..."

---

## 📊 Matriz de Resultados

Después de ejecutar todos tests, llena:

| Test | Descripción | Status | Notas |
|------|-------------|--------|-------|
| 1 | Invocación básica | [ ] ✓ / [ ] ✗ | |
| 2 | RAMA 8 Demanda Laboral | [ ] ✓ / [ ] ✗ | |
| 3 | Validación normativa | [ ] ✓ / [ ] ✗ | |
| 4 | RAMA 3 Tutela | [ ] ✓ / [ ] ✗ | |
| 5 | RAMA 12 Contrato Int'l | [ ] ✓ / [ ] ✗ | |
| 6 | Memoria persistente | [ ] ✓ / [ ] ✗ | |
| 7 | Checklist completitud | [ ] ✓ / [ ] ✗ | |
| 8 | Anti-alucinación | [ ] ✓ / [ ] ✗ | |

**Éxito**: 8/8 ✓

---

## 🐛 Reporte de Bugs

Si encuentras fallo, reporta con:

1. **Test número**: "Test 2 — RAMA 8"
2. **Entrada exacta**: Copia/pega qué escribiste
3. **Resultado observado**: Qué pasó
4. **Resultado esperado**: Qué debería pasar
5. **Archivo logs**: Si disponible: `.claude/projects/[PROJECT]/agent-*.jsonl`

**Ejemplo bug report**:

```
Test 2 — RAMA 8 — Demanda Laboral
Entrada: @legal-templates-specialist genera demanda laboral...
Resultado: Documento generado pero ley 2270/2024 citada
Esperado: Ley 2270/2024 NO debe citarse (no existe)
Logs: Adjuntados en .claude/projects/...
Severidad: CRÍTICO (alucinación jurídica)
```

---

## ✅ Validación Final

**Si todos tests pasan:**

```bash
git add .claude/
git commit -m "test: validate legal-templates-specialist integration — all 8 tests pass"
git push
```

**Si algunos tests fallan:**

1. Identifica patrón (¿todas RAMA 8 fallan? ¿o normativa?)
2. Revisa archivo template respectivo
3. Regenera desde source
4. Retest

---

**Generado por**: Legal Templates Testing v1.0  
**Fecha**: Julio 28, 2026
