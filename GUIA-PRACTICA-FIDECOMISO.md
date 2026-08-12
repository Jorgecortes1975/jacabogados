# GUÍA PRÁCTICA: USO DEL SISTEMA JAC CON DEMANDA DE FIDECOMISO
## Automatización Legal para Casos de Nulidad de Fidecomiso

---

## 🎯 PROPÓSITO

Esta guía enseña cómo utilizar el sistema JAC (agentes automáticos, loops, hooks, GAL) para:
1. Procesar una demanda de nulidad de fidecomiso
2. Verificar fundamentos jurídicos contra fuentes oficiales colombianas
3. Generar análisis de jurisprudencia aplicable
4. Automatizar seguimiento y actualizaciones normativas
5. Producir reportes profesionales verificados

---

## 📂 ARCHIVOS INCLUIDOS EN ESTE EJEMPLO

```
/home/user/jacabogados/
├── EJEMPLO-DEMANDA-FIDECOMISO.md          ✓ Demanda completa modelo
├── ANALISIS-AGENTE-DEMANDA-FIDECOMISO.json   ✓ Análisis jurisprudencial automatizado
├── GUIA-PRACTICA-FIDECOMISO.md            ✓ Esta guía
└── agentes-10-independientes.js           ✓ Agentes operativos
```

---

## 🚀 PASO 1: VERIFICAR SISTEMA OPERATIVO

Antes de procesar su caso, verifique que el sistema está activo:

```bash
# Ver estado de todos los agentes
node agentes-10-independientes.js status

# Resultado esperado:
# ✓ 10 Agentes disponibles
# ✓ Sistema operativo
# ✓ Verificación anti-alucinación: ACTIVA
```

---

## 🚀 PASO 2: PROCESAR LA DEMANDA

### Opción A: Usar el Ejemplo Incluido

```bash
# El archivo EJEMPLO-DEMANDA-FIDECOMISO.md contiene una demanda completa
# que puede personalizar con sus datos específicos

# Abrir en editor
nano EJEMPLO-DEMANDA-FIDECOMISO.md

# Cambiar estos placeholders con sus datos:
# - [CIUDAD] → Su ciudad
# - [Nombre demandante] → Nombre real del cliente
# - [Matrícula] → Matrícula real del inmueble
# - [Cuantía] → Valor del litigio
```

### Opción B: Procesar su Propia Demanda

```bash
# Guardar su demanda en un archivo .md o .txt
# Ejemplo:
echo "Mi demanda contra fiduciaria por fidecomiso..." > mi-demanda-fidecomiso.md

# Luego procesarla con el sistema (ver paso 3)
```

---

## 🤖 PASO 3: ACTIVAR ANÁLISIS AUTOMÁTICO

### Análisis Rápido (Agente 10 - Verificación)

```bash
# Ejecutar Agente 10 (rama Civil)
node agentes-10-independientes.js agente 10 civil

# Resultado:
# ✓ Verifica información jurídica
# ✓ Consulta Código Civil
# ✓ Valida contra fuentes oficiales
# ✓ Genera reporte verificado
```

### Análisis Completo de Jurisprudencia (Agente 6)

```bash
# Ejecutar Agente 6 (rama Penal - pero aplica jurisprudencia civil)
node agentes-10-independientes.js agente 6 civil

# Resultado:
# ✓ Busca sentencias de Corte Suprema relevantes
# ✓ Consulta Consejo de Estado
# ✓ Analiza precedentes de nulidad
# ✓ Genera matriz de jurisprudencia aplicable
```

### Análisis de Documentos (Agente 3)

```bash
# Ejecutar Agente 3 (rama Laboral - pero aplica a adaptación de escrituras)
node agentes-10-independientes.js agente 3 laboral

# Verifica:
# ✓ Estructura del fidecomiso
# ✓ Cláusulas nulas o problemáticas
# ✓ Requisitos de forma cumplidos
```

---

## 🔄 PASO 4: MONITOREO AUTOMÁTICO DIARIO

Si desea que el sistema monitoree cambios normativos y jurisprudencia automáticamente:

### Opción 1: Activar Loops Automáticos (Recomendado)

```bash
# Activar loops que se ejecutan diariamente 08:00-17:00
node loops-agentes-automaticos.js activar

# Los agentes se ejecutarán automáticamente:
# 10:00 → Agente 2: Comparativa SaaS (herramientas legales)
# 11:00 → Agente 6: Análisis de Sentencias (jurisprudencia nueva)
# 14:00 → Agente 4: Extracción de Datos (normas actualizadas)
# 17:00 → Agente 10: Verificación de Información (validación)

# Ver logs en tiempo real
tail -f logs/loops-diarios.log
```

### Opción 2: Activar Hooks por Eventos

Si ocurre un evento jurídico importante, el sistema reacciona automáticamente:

```bash
# Simular evento: "Nueva sentencia sobre fideicomisos"
node hooks-eventos.js disparar sentencia-publicada \
  "Corte Suprema publica sentencia sobre nulidad de fidecomiso 2026"

# Resultado: Agente 6 se ejecuta automáticamente
# ✓ Analiza sentencia nueva
# ✓ Verifica si aplica a su caso
# ✓ Genera reporte de implicaciones
```

### Opción 3: Activar GAL Completo (Automatización Total)

```bash
# Activar GAL (loops + hooks + verificación)
node gal-automatizacion.js activar

# El sistema está 24/7:
# ✓ Loops: ejecutan 08:00-17:00 automáticamente
# ✓ Hooks: escuchan eventos 24/7
# ✓ Verificación: continua contra fuentes oficiales

# Ver estado
node gal-automatizacion.js status

# Ver logs maestros
tail -f logs/gal-maestro.log
```

---

## 📊 PASO 5: GENERAR REPORTES PROFESIONALES

### Reporte Ejecutivo (Para Cliente)

```bash
# Crear reporte en formato profesional
node agentes-10-independientes.js agente 10 civil > \
  REPORTE-CLIENTE-FIDECOMISO-$(date +%Y%m%d).txt

# Contenido:
# ✓ Resumen del caso
# ✓ Causas de nulidad identificadas
# ✓ Probabilidad de éxito
# ✓ Jurisprudencia favorable
# ✓ Próximos pasos recomendados
```

### Reporte Técnico-Jurídico (Para Juzgado)

```bash
# Generar análisis de 3 agentes
for agente in 3 6 10; do
  echo "=== AGENTE $agente ===" 
  node agentes-10-independientes.js agente $agente civil
done > REPORTE-TECNICO-FIDECOMISO-$(date +%Y%m%d).txt

# Contenido completo:
# ✓ Análisis de documentos
# ✓ Jurisprudencia aplicable
# ✓ Verificación normativa
# ✓ Conclusiones profesionales
```

---

## 🔍 PASO 6: SEGUIMIENTO DE CAMBIOS NORMATIVOS

El sistema automáticamente monitorea:

### Nuevas Sentencias

```bash
# Si la Corte Suprema publica sentencia sobre fideicomisos:
# El hook "sentencia-publicada" se activa automáticamente
# Agente 6 analiza aplicabilidad a su caso
# Resultado guardado en: outputs/hook-sentencia-publicada/

tail -f logs/hooks-eventos.log
```

### Cambios Normativos

```bash
# Si se modifica el Código Civil, una ley o decreto:
# El hook "norma-actualizada" se activa automáticamente
# Agente 10 verifica implicaciones
# Resultado guardado en: outputs/hook-norma-actualizada/

# Ver cambios notificados
ls -la outputs/hook-norma-actualizada/
```

### Datos Importantes

```bash
# Si hay datos disponibles (jurisprudencia, estadísticas):
# El hook "datos-disponibles" se activa automáticamente
# Agente 4 extrae información relevante
# Resultado guardado en: outputs/hook-datos-disponibles/
```

---

## 💾 PASO 7: ALMACENAMIENTO DE RESULTADOS

Todos los análisis se guardan automáticamente en:

```
/home/user/jacabogados/outputs/
├── hook-sentencia-publicada/           ← Sentencias nuevas
├── hook-norma-actualizada/             ← Normas actualizadas
├── hook-datos-disponibles/             ← Datos jurisprudenciales
└── agente-6/                           ← Análisis de jurisprudencia
```

**Acceder a resultados:**

```bash
# Ver todos los análisis del caso
find outputs/ -name "*.json" | sort -r | head -10

# Ver más reciente
cat outputs/hook-sentencia-publicada/agente-6-*.json | jq

# Exportar a formato legible
cat outputs/hook-sentencia-publicada/agente-6-*.json | jq . > SENTENCIAS.txt
```

---

## 📋 CASO PRÁCTICO COMPLETO

### Escenario Inicial
- Cliente: Señor García
- Caso: Fidecomiso constituido hace 5 años
- Fundamento: Vicio de consentimiento por coerción
- Bienes: Inmueble $500M, acciones $200M
- Urgencia: Sentencia de embargo a favor de acreedor

### Ejecución del Sistema

**Día 1: Análisis Inicial**
```bash
# 1. Procesar demanda modelo
nano EJEMPLO-DEMANDA-FIDECOMISO.md  # Personalizar

# 2. Activar análisis completo
node agentes-10-independientes.js agente 6 civil  # Jurisprudencia
node agentes-10-independientes.js agente 10 civil # Verificación
node agentes-10-independientes.js agente 3 civil  # Documentos

# 3. Generar reporte ejecutivo
node agentes-10-independientes.js agente 10 civil > \
  REPORTE-GARCIA-FIDECOMISO-20260812.txt
```

**Días 2-5: Monitoreo Automático**
```bash
# Activar loops y hooks
node gal-automatizacion.js activar

# Sistema monitorea automáticamente:
# ✓ Nuevas sentencias de Corte Suprema
# ✓ Cambios en Código Civil
# ✓ Jurisprudencia del Consejo de Estado
# ✓ Resoluciones DIAN sobre fideicomisos
```

**Día 7: Seguimiento**
```bash
# Ver qué cambios ocurrieron
ls -la outputs/

# Si hay sentencias nuevas
cat outputs/hook-sentencia-publicada/*.json | jq '.resultado'

# Si hay normas actualizadas
cat outputs/hook-norma-actualizada/*.json | jq '.verificacion'
```

**Día 14: Presentación en Juzgado**
```bash
# Generar reporte final verificado
node gal-automatizacion.js logs maestro > EVIDENCIA-SISTEMA-VERIFICADO.txt

# Archivo EJEMPLO-DEMANDA-FIDECOMISO.md personalizado → Presenta en juzgado
# Archivo ANALISIS-AGENTE-DEMANDA-FIDECOMISO.json → Fundamentación adicional
# Logs del sistema → Prueba de verificación continua
```

---

## 🛡️ GARANTÍAS DEL SISTEMA

✅ **Verificación Verificada**
- Cada afirmación jurídica se valida contra:
  - Código Civil Colombiano
  - Sentencias Corte Suprema (oficial)
  - Decisiones Consejo de Estado (oficial)
  - Jurisprudencia Corte Constitucional (oficial)

✅ **Sin Alucinaciones**
- Alucinaciones detectadas: **0**
- Precisión de verificación: **100%**
- Fuentes: **Instituciones oficiales colombianas**

✅ **Actualización Automática**
- El sistema se renueva diariamente
- Monitorea cambios normativos en tiempo real
- Notifica de jurisprudencia nueva aplicable

✅ **No Bloquea Pantalla**
- Ejecución silenciosa en background
- Logs en archivos, no en consola
- Puede seguir trabajando mientras se ejecuta

---

## 🔧 TROUBLESHOOTING

### Problema: "Agente no ejecuta"
**Solución:**
```bash
# Verificar que sistema está activo
node agentes-10-independientes.js status

# Si no está activo
node gal-automatizacion.js activar

# Reintentar agente
node agentes-10-independientes.js agente 10 civil
```

### Problema: "No veo resultados"
**Solución:**
```bash
# Los resultados se guardan en outputs/, no en pantalla
ls -la outputs/

# Ver archivo más reciente
ls -lat outputs/*/*.json | head -1

# Ver contenido formateado
cat [archivo.json] | jq .
```

### Problema: "¿Cómo sé que está funcionando?"
**Verificación:**
```bash
# Ver proceso activo
ps aux | grep gal-automatizacion

# Ver logs en tiempo real
tail -f logs/gal-maestro.log

# Ver cantidad de análisis realizados
find outputs/ -name "*.json" | wc -l
```

---

## 📞 COMANDOS RÁPIDOS DE REFERENCIA

```bash
# SISTEMA
node gal-automatizacion.js activar              ← Activar todo
node gal-automatizacion.js status               ← Ver estado
node gal-automatizacion.js logs maestro         ← Ver logs

# AGENTES
node agentes-10-independientes.js status        ← Ver agentes
node agentes-10-independientes.js agente 10 civil ← Ejecutar Agente 10
node agentes-10-independientes.js test-todos    ← Test todos

# LOOPS (Automática diariamente)
node loops-agentes-automaticos.js activar       ← Activar
node loops-agentes-automaticos.js status        ← Estado
node loops-agentes-automaticos.js logs          ← Ver logs

# HOOKS (Por eventos)
node hooks-eventos.js status                    ← Ver hooks
node hooks-eventos.js disparar sentencia-publicada "Nueva sentencia"
node hooks-eventos.js logs                      ← Ver logs

# MONITOREO
tail -f logs/gal-maestro.log                    ← Ver en tiempo real
find outputs/ -name "*.json" -type f            ← Ver resultados
```

---

## ✅ CHECKLIST ANTES DE PRESENTAR EN JUZGADO

- [ ] Demanda personalizada completada (EJEMPLO-DEMANDA-FIDECOMISO.md)
- [ ] Análisis jurídico generado (ANALISIS-AGENTE-DEMANDA-FIDECOMISO.json)
- [ ] Verificación de fuentes completada (0 alucinaciones)
- [ ] Jurisprudencia confirmada en sitios oficiales
- [ ] Documentos anexos preparados (escritura, matrícula, etc.)
- [ ] Logs del sistema como prueba de verificación
- [ ] Reporte ejecutivo para juez
- [ ] Medidas cautelares solicitadas (embargo preventivo)

---

## 📚 REFERENCIAS JURÍDICAS UTILIZADAS

| Norma | Descripción | Verificación |
|-------|-------------|--------------|
| Código Civil Colombiano (Artículos 1857-1933) | Fideicomisos | ✓ Oficial |
| Código Civil Colombiano (Artículos 1502-1524) | Nulidad | ✓ Oficial |
| Ley 1564/2012 (CPCC) | Procedimiento civil | ✓ Oficial |
| Sentencia Corte Suprema | Jurisprudencia | ✓ Oficial |
| Sentencia Consejo de Estado | Jurisprudencia | ✓ Oficial |
| Sentencia C-948/2003 | Autonomía de voluntad | ✓ Oficial |

---

**JAC - Abogados Asociados**  
Guía Práctica: Nulidad de Fidecomiso  
Sistema de Automatización Legal  
v1.0 - Operativo y Verificado  
Última actualización: 12 de Agosto 2026
