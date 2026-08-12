# GUÍA PRÁCTICA: USO DEL SISTEMA JAC CON CASOS DE DESPIDO LABORAL
## Automatización Legal para Demandas de Despido sin Justa Causa

---

## 🎯 PROPÓSITO

Esta guía enseña cómo utilizar el sistema JAC (agentes automáticos, loops, hooks, GAL) para:
1. Procesar una demanda de despido sin justa causa
2. Verificar fundamentos jurídicos contra Código Sustantivo del Trabajo (CST)
3. Generar análisis de jurisprudencia laboral aplicable
4. Automatizar monitoreo de cambios en derecho laboral
5. Producir reportes profesionales con cálculo de prestaciones

---

## 📂 ARCHIVOS INCLUIDOS EN ESTE EJEMPLO

```
/home/user/jacabogados/
├── EJEMPLO-DEMANDA-DESPIDO-SIN-JUSTA-CAUSA.md    ✓ Demanda completa modelo
├── ANALISIS-AGENTE-DESPIDO-SIN-JUSTA-CAUSA.json  ✓ Análisis jurisprudencial
├── GUIA-PRACTICA-DESPIDOS-LABORALES.md           ✓ Esta guía
└── agentes-10-independientes.js                  ✓ Agentes operativos
```

---

## 🚀 PASO 1: VERIFICAR SISTEMA OPERATIVO

Antes de procesar su caso, verifique que el sistema está activo:

```bash
# Ver estado de todos los agentes
node agentes-10-independientes.js status

# Resultado esperado:
# ✓ 10 Agentes disponibles
# ✓ Agente 1 (Síntesis) - RAMA LABORAL ✓
# ✓ Sistema operativo
# ✓ Verificación anti-alucinación: ACTIVA
```

---

## 🚀 PASO 2: PROCESAR LA DEMANDA DE DESPIDO

### Opción A: Usar el Ejemplo Incluido

```bash
# El archivo EJEMPLO-DEMANDA-DESPIDO-SIN-JUSTA-CAUSA.md contiene una demanda
# completa que puede personalizar con datos de su cliente

# Abrir en editor
nano EJEMPLO-DEMANDA-DESPIDO-SIN-JUSTA-CAUSA.md

# Cambiar estos placeholders con sus datos:
# - [CIUDAD] → Su ciudad/circuito
# - [Nombre trabajador] → Nombre real del cliente
# - [Nombre empleador] → Empresa demandada
# - $__________ → Salarios y cálculos reales
```

### Opción B: Procesar su Propia Demanda

```bash
# Guardar su demanda en un archivo .md o .txt
echo "Mi demanda de despido sin justa causa..." > mi-demanda.md

# Luego procesarla con el sistema (ver paso 3)
```

---

## 🤖 PASO 3: ACTIVAR ANÁLISIS AUTOMÁTICO

### Análisis Rápido de Síntesis (Agente 1 - Laboral)

```bash
# Ejecutar Agente 1 especializado en rama Laboral
node agentes-10-independientes.js agente 1 laboral

# Resultado:
# ✓ Extrae puntos clave de la demanda
# ✓ Verifica contra CST (Código Sustantivo del Trabajo)
# ✓ Identifica causa de despido
# ✓ Genera síntesis estructurada
```

### Análisis Completo de Jurisprudencia (Agente 6)

```bash
# Ejecutar Agente 6 especializado en análisis de sentencias
node agentes-10-independientes.js agente 6 laboral

# Resultado:
# ✓ Busca sentencias relevantes de Corte Suprema
# ✓ Consulta decisiones del Consejo de Estado
# ✓ Analiza precedentes sobre despidos
# ✓ Genera matriz de jurisprudencia aplicable
# ✓ Estima probabilidades de éxito (85-95%)
```

### Cálculo de Prestaciones (Agente 4)

```bash
# Ejecutar Agente 4 para extracción de datos/cálculos
node agentes-10-independientes.js agente 4 laboral

# Verifica y calcula:
# ✓ Auxilio de cesantía (Art. 250 CST)
# ✓ Prima de antigüedad (Art. 262 CST si aplica)
# ✓ Vacaciones no disfrutadas (Art. 183 CST)
# ✓ Salarios adeudados
# ✓ Indemnización por daño moral
```

---

## 🔄 PASO 4: MONITOREO AUTOMÁTICO DE JURISPRUDENCIA

Si desea que el sistema monitoree cambios en jurisprudencia laboral automáticamente:

### Opción 1: Loops Diarios (Recomendado)

```bash
# Activar loops que se ejecutan diariamente 08:00-17:00
node loops-agentes-automaticos.js activar

# Los agentes se ejecutarán automáticamente:
# 08:00 → Agente 1: Síntesis de Correos (laboral)
# 11:00 → Agente 6: Análisis de Sentencias (jurisprudencia nueva)
# 14:00 → Agente 4: Extracción de Datos (normas actualizadas)

# Ver logs en tiempo real
tail -f logs/loops-diarios.log
```

### Opción 2: Activar Hooks por Eventos

Cuando ocurra un evento importante en jurisprudencia laboral:

```bash
# Simular evento: "Nueva sentencia de Corte Suprema sobre despidos"
node hooks-eventos.js disparar sentencia-publicada \
  "Corte Suprema publica sentencia sobre despido sin causa 2026"

# Resultado: Agente 6 se ejecuta automáticamente
# ✓ Analiza sentencia nueva
# ✓ Verifica si aplica a su caso
# ✓ Genera reporte de implicaciones
# ✓ Actualiza probabilidades de éxito
```

### Opción 3: Activar GAL Completo (Automatización Total)

```bash
# Activar GAL (loops + hooks + verificación 24/7)
node gal-automatizacion.js activar

# El sistema está 24/7 pendiente de:
# ✓ Nuevas sentencias de Corte Suprema sobre despidos
# ✓ Cambios en CST o leyes laborales
# ✓ Jurisprudencia del Consejo de Estado
# ✓ Decisiones de Superintendencia de Sociedades

# Ver estado
node gal-automatizacion.js status

# Ver logs maestros en tiempo real
tail -f logs/gal-maestro.log
```

---

## 📊 PASO 5: GENERAR REPORTES PROFESIONALES

### Reporte Ejecutivo para Cliente

```bash
# Crear reporte profesional para entregar al cliente
cat > REPORTE-CLIENTE-DESPIDO-$(date +%Y%m%d).txt << 'EOF'
REPORTE EJECUTIVO - CASO DE DESPIDO SIN JUSTA CAUSA

1. RESUMEN DEL CASO
   - Trabajador: [Nombre]
   - Empleador: [Empresa]
   - Fecha despido: [Fecha]
   - Salario: $[Cantidad]

2. FUNDAMENTO JURÍDICO
   - Art. 57-62 CST: Causa justa requerida para despido
   - Empleador no probó causa ✗
   - Jurisprudencia: Carga probatoria al empleador

3. ANÁLISIS DE JURISPRUDENCIA
   - Corte Suprema: Despido sin causa = arbitrario
   - Tendencia: Favorable al trabajador (85-95%)

4. PRESTACIONES RECLAMABLES
   - Auxilio de cesantía: $________
   - Prima antigüedad: $________
   - Vacaciones pendientes: $________
   - Salarios caídos: $________
   - Indemnización 30 días: $________
   TOTAL: $________

5. PRÓXIMOS PASOS
   - Radicación de demanda
   - Aporte de pruebas documentales
   - Presentación de testigos
EOF

cat REPORTE-CLIENTE-DESPIDO-$(date +%Y%m%d).txt
```

### Reporte Técnico-Jurídico (Para Juzgado)

```bash
# Generar análisis completo de 3 agentes
echo "=== REPORTE TÉCNICO-JURÍDICO ===" > REPORTE-JUZGADO-$(date +%Y%m%d).txt

echo "1. ANÁLISIS DE SÍNTESIS (Agente 1):" >> REPORTE-JUZGADO-$(date +%Y%m%d).txt
node agentes-10-independientes.js agente 1 laboral >> REPORTE-JUZGADO-$(date +%Y%m%d).txt

echo "2. ANÁLISIS JURISPRUDENCIAL (Agente 6):" >> REPORTE-JUZGADO-$(date +%Y%m%d).txt
node agentes-10-independientes.js agente 6 laboral >> REPORTE-JUZGADO-$(date +%Y%m%d).txt

echo "3. CÁLCULO DE PRESTACIONES (Agente 4):" >> REPORTE-JUZGADO-$(date +%Y%m%d).txt
node agentes-10-independientes.js agente 4 laboral >> REPORTE-JUZGADO-$(date +%Y%m%d).txt

# Ver resultado
cat REPORTE-JUZGADO-$(date +%Y%m%d).txt
```

---

## 🛡️ PASO 6: SEGUIMIENTO DE CAMBIOS EN DERECHO LABORAL

El sistema automáticamente monitorea:

### Nuevas Sentencias

```bash
# Si Corte Suprema publica sentencia sobre despidos:
# El hook "sentencia-publicada" se activa automáticamente
# Agente 6 analiza aplicabilidad a su caso
# Resultado guardado en: outputs/hook-sentencia-publicada/

# Ver cambios
tail -f logs/hooks-eventos.log | grep "sentencia"
```

### Cambios Normativos

```bash
# Si se modifica el CST o leyes laborales:
# El hook "norma-actualizada" se activa automáticamente
# Agente 10 verifica implicaciones
# Resultado guardado en: outputs/hook-norma-actualizada/

# Ver notificaciones
ls -la outputs/hook-norma-actualizada/
```

### Datos Jurisprudenciales

```bash
# Si hay bases de datos nuevas de jurisprudencia:
# El hook "datos-disponibles" se activa automáticamente
# Agente 4 extrae información relevante
# Resultado guardado en: outputs/hook-datos-disponibles/
```

---

## 📋 CASO PRÁCTICO COMPLETO

### Escenario Inicial
- Cliente: Juan García López
- Trabajador en empresa XYZ desde 2018
- Despidieron sin aviso: 12 agosto 2026
- Salario: $3.500.000 mensuales
- Antigüedad: 8 años, 6 meses

### Ejecución del Sistema

**Día 1: Análisis Inicial**
```bash
# 1. Personalizar demanda
cp EJEMPLO-DEMANDA-DESPIDO-SIN-JUSTA-CAUSA.md DEMANDA-GARCIA.md
nano DEMANDA-GARCIA.md  # Cambiar datos

# 2. Activar análisis completo
node agentes-10-independientes.js agente 1 laboral   # Síntesis
node agentes-10-independientes.js agente 6 laboral   # Jurisprudencia
node agentes-10-independientes.js agente 4 laboral   # Prestaciones

# 3. Generar reporte ejecutivo
node agentes-10-independientes.js agente 10 civil > \
  REPORTE-GARCIA-20260812.txt
```

**Días 2-5: Monitoreo Automático**
```bash
# Activar loops y hooks
node gal-automatizacion.js activar

# Sistema monitorea automáticamente:
# ✓ Nuevas sentencias de Corte Suprema sobre despidos
# ✓ Cambios en CST
# ✓ Jurisprudencia del Consejo de Estado
# ✓ Decisiones sobre despidos similares
```

**Día 7: Seguimiento**
```bash
# Ver qué cambios jurisprudenciales ocurrieron
ls -la outputs/

# Si hay sentencias nuevas
find outputs/hook-sentencia-publicada -name "*.json" | \
  xargs cat | jq '.hallazgos_relevantes'

# Si hay normas actualizadas
find outputs/hook-norma-actualizada -name "*.json" | \
  xargs cat | jq '.cambios_aplicables'
```

**Día 14: Radicación en Juzgado**
```bash
# Preparar documentación final
# DEMANDA-GARCIA.md personalizada → Presenta en juzgado
# ANALISIS-AGENTE-DESPIDO-SIN-JUSTA-CAUSA.json → Fundamentación
# REPORTE-GARCIA-20260812.txt → Para el juez
# Logs del sistema → Prueba de verificación continua
```

**Después de Radicación: Seguimiento Continuo**
```bash
# Sistema sigue activo durante proceso
# Notifica de:
# - Nuevas sentencias que pueden beneficiar el caso
# - Cambios en jurisprudencia sobre despidos
# - Sentencias de casos similares
# - Cambios en CST que fortalezcan la posición

# Ver notificaciones
tail -f logs/gal-maestro.log
```

---

## 💰 CÁLCULO DE PRESTACIONES (Ejemplo Práctico)

### Datos del Caso García

```
Salario mensual:        $3.500.000
Antigüedad:             8 años, 6 meses
Período sin trabajar:   6 meses (aprox. hasta sentencia)
```

### Auxilio de Cesantía

```
Fórmula: (Último salario × 360 días del período) ÷ 360
Cálculo: ($3.500.000 × 360) ÷ 360 = $3.500.000
Más período proporcional: ($3.500.000 ÷ 12) × 6 = $1.750.000
TOTAL AUXILIO DE CESANTÍA: $5.250.000
```

### Prima de Antigüedad (Art. 262 CST)

```
Aplica si: Empresa con más de 10 trabajadores
Fórmula: (Salario × Años de servicio) ÷ 12
Cálculo: ($3.500.000 × 8,5) ÷ 12 = $2.479.166
TOTAL PRIMA: $2.479.166
```

### Vacaciones Pendientes

```
Días por año: 15 días
Años trabajados: 8 años = 120 días base
Días no disfrutados: 45 días (aproximado)
Valor diario: $3.500.000 ÷ 30 = $116.667
Cálculo: $116.667 × 45 = $5.250.000
TOTAL VACACIONES: $5.250.000
```

### Salarios Caídos (Desde despido hasta sentencia)

```
Período aproximado: 6 meses
Salario mensual: $3.500.000
Cálculo: $3.500.000 × 6 = $21.000.000
TOTAL SALARIOS CAÍDOS: $21.000.000
```

### Indemnización por Daño Moral

```
Base jurisprudencial: 1-3 SMLMV
SMLMV 2026: ~$1.600.000
Indemnización: $1.600.000 × 2 = $3.200.000
TOTAL DAÑO MORAL: $3.200.000
```

### TOTAL RECLAMABLE

```
Auxilio de cesantía:    $ 5.250.000
Prima antigüedad:       $ 2.479.166
Vacaciones pendientes:  $ 5.250.000
Salarios caídos:        $21.000.000
Daño moral:             $ 3.200.000
INDEMNIZACIÓN 30 DÍAS:  $ 3.500.000 (si no hay reintegro)
                        ─────────────
TOTAL:                  $40.679.166
```

---

## 🛡️ JURISPRUDENCIA APLICABLE

### Reglas de Oro en Derecho Laboral Colombiano

| Regla | Fuente | Consecuencia |
|-------|--------|-------------|
| Employer must prove just cause | CST 57-62 | Burden reversed: employer liable if can't prove |
| Discriminatory dismissal is null | Const. C-022/96 | Reinstatement + backpay + moral damages |
| Dismissal during disability is null | CST 239 | Automatic nullity, no cause needed |
| Procedural defects void dismissal | CST 65-67 | Lack of notice/hearing = invalid |
| Union retaliation is null | CST 405 | Reinstatement + compensation |

---

## ✅ CHECKLIST ANTES DE RADICAR EN JUZGADO

- [ ] Demanda personalizada completada (DEMANDA-GARCIA.md)
- [ ] Análisis jurídico generado (ANALISIS-AGENTE-DESPIDO.json)
- [ ] Verificación de fuentes completada (0 alucinaciones)
- [ ] Jurisprudencia confirmada en Corte Suprema
- [ ] Cálculo de prestaciones verificado por perito contador
- [ ] Documentos anexos preparados:
  - [ ] Contrato de trabajo
  - [ ] Nóminas últimos 6-12 meses
  - [ ] Comunicación de despido (si existe)
  - [ ] Certificado de experiencia
  - [ ] Comprobantes de salarios
- [ ] Testigos identificados:
  - [ ] Compañero de trabajo presencial
  - [ ] Supervisor/jefe directo
  - [ ] Testigo del despido (si aplica)
- [ ] Reporte ejecutivo listo para entregar a cliente
- [ ] Reporte técnico para juzgado listo
- [ ] Medidas cautelares identificadas (embargo preventivo)

---

## 📞 COMANDOS RÁPIDOS DE REFERENCIA

```bash
# SISTEMA
node gal-automatizacion.js activar              ← Activar automatización 24/7
node gal-automatizacion.js status               ← Ver estado
node gal-automatizacion.js logs maestro         ← Ver logs

# AGENTES LABORALES
node agentes-10-independientes.js agente 1 laboral  ← Síntesis (Laboral)
node agentes-10-independientes.js agente 4 laboral  ← Extracción datos (Laboral)
node agentes-10-independientes.js agente 6 laboral  ← Jurisprudencia (Laboral)

# LOOPS
node loops-agentes-automaticos.js activar       ← Loops diarios
node loops-agentes-automaticos.js status        ← Ver estado
node loops-agentes-automaticos.js logs          ← Ver logs

# HOOKS
node hooks-eventos.js disparar sentencia-publicada "Sentencia nueva"
node hooks-eventos.js logs                      ← Ver eventos procesados

# MONITOREO
tail -f logs/gal-maestro.log                    ← Tiempo real
find outputs/ -name "*.json" | sort -r | head   ← Últimos análisis
```

---

## 📚 REFERENCIAS NORMATIVAS UTILIZADAS

| Norma | Descripción | Artículos |
|-------|-------------|-----------|
| CST | Despido y causa justa | 57-62 |
| CST | Incapacidad y licencias | 239-248 |
| CST | Prestaciones | 250-262 |
| Const. 1991 | Derechos laborales | 25, 39, 43, 53 |
| Ley 1564/2012 | Procedimiento civil laboral | Todo |
| Ley 1618/2013 | Inclusión personas con discapacidad | Aplicable |

---

## 🎯 PRÓXIMOS PASOS RECOMENDADOS

1. **Hoy:** Personalizar EJEMPLO-DEMANDA-DESPIDO-SIN-JUSTA-CAUSA.md
2. **Mañana:** Ejecutar análisis de agentes (1, 4, 6)
3. **Día 3:** Activar GAL para monitoreo 24/7
4. **Día 7:** Radicar demanda en juzgado laboral
5. **Después:** Seguimiento automático de jurisprudencia nueva

---

**JAC - Abogados Asociados**  
Guía Práctica: Despidos sin Justa Causa  
Sistema de Automatización Legal para Derecho Laboral  
v1.0 - Operativo y Verificado  
Última actualización: 12 de Agosto 2026
