# 🚀 GUÍA DE BÚSQUEDA JURÍDICA RÁPIDA

## ¿Cómo usar en 30 segundos?

### **OPCIÓN 1: Búsqueda rápida (recomendado)**

```bash
# Buscar jurisprudencia sobre un tema
jac-jurisprudencia "despido sin justa causa corte suprema"

# Buscar norma vigente
jac-norma "código sustantivo del trabajo artículos 50-60"

# Analizar caso
jac-analisis "Mi cliente fue despedido. ¿Qué dice jurisprudencia?"

# Verificar información
jac-verificar "El salario mínimo en Colombia es $1.800.000"

# Generar reporte completo
jac-reporte "Derechos de trabajadores en despido sin justa causa"
```

### **OPCIÓN 2: Capturar resultado y guardar automáticamente**

```bash
# Ejecutar búsqueda y guardar resultado en archivo
/home/user/jacabogados/capturar-busqueda.sh jurisprudencia "despido sin justa causa"

# El resultado se guarda en:
# /home/user/jacabogados/busquedas-juridicas/diarias/busqueda_YYYYMMDD_HHMMSS_jurisprudencia.txt
```

---

## EJEMPLOS PRÁCTICOS

### **Ejemplo 1: Caso laboral de despido**

```bash
# PASO 1: Buscar jurisprudencia
jac-jurisprudencia "despido sin justa causa compensación indemnización"

# PASO 2: Buscar normas aplicables
jac-norma "código sustantivo del trabajo artículos 62 63 64"

# PASO 3: Generar análisis para el cliente
jac-reporte "Derechos del trabajador en despido sin justa causa Colombia"
```

**Tiempo total: 2-3 minutos**  
**Resultado: 3 búsquedas verificadas, listas para usar en demanda**

---

### **Ejemplo 2: Validar contrato de trabajo**

```bash
# Verificar requisitos legales
jac-verificar "Contrato de trabajo debe incluir: acuerdo, remuneración, funciones"

# Buscar normas
jac-norma "requisitos contrato individual de trabajo"

# Buscar jurisprudencia sobre cláusulas nulas
jac-jurisprudencia "cláusulas nulas contrato trabajo sentencias"
```

**Tiempo total: 1-2 minutos**  
**Resultado: Validación completa del contrato**

---

### **Ejemplo 3: Conflicto de interés en empresa**

```bash
jac-analisis "Ejecutivo tiene conflicto de interés potencial. ¿Qué dice ley?"
jac-norma "conflicto de interés empresa prohibiciones"
jac-jurisprudencia "sentencias conflicto de interés funcionario"
```

**Tiempo total: 2 minutos**  
**Resultado: Marco legal completo**

---

## ARCHIVOS GENERADOS

Cada búsqueda con `capturar-busqueda.sh` genera un archivo en:
```
/home/user/jacabogados/busquedas-juridicas/diarias/
```

Ejemplo:
```
busqueda_20260918_143025_jurisprudencia.txt
busqueda_20260918_143030_norma.txt
busqueda_20260918_143035_reporte.txt
```

---

## TIPOS DE BÚSQUEDA

### **1. JURISPRUDENCIA**
Busca sentencias de Corte Constitucional, Suprema, Consejo de Estado

```bash
jac-jurisprudencia "tema específico"
```

**Retorna:**
- Sentencias de cortes
- Precedentes relevantes
- Análisis jurisprudencial

---

### **2. NORMA**
Busca leyes, decretos, resoluciones vigentes

```bash
jac-norma "ley o decreto específico"
```

**Retorna:**
- Texto normativo vigente
- Modificaciones posteriores
- Artículos relacionados

---

### **3. ANÁLISIS**
Analiza caso específico contra jurisprudencia

```bash
jac-analisis "Descripción del caso"
```

**Retorna:**
- Jurisprudencia aplicable
- Recomendaciones legales
- Precedentes relevantes

---

### **4. VERIFICAR**
Verifica si información legal es correcta

```bash
jac-verificar "Información a verificar"
```

**Retorna:**
- Validación contra fuentes oficiales
- Información actualizada
- Fuentes que lo confirman

---

### **5. REPORTE**
Genera reporte jurídico completo sobre tema

```bash
jac-reporte "Tema para reporte"
```

**Retorna:**
- Reporte estructurado
- Jurisprudencia completa
- Normativa aplicable
- Análisis profesional

---

## GARANTÍAS

✅ **Sin alucinaciones** - Valida contra 9 fuentes oficiales  
✅ **Información verificada** - Solo datos de instituciones oficiales  
✅ **Citable** - Todas las citas con referencias verificables  
✅ **Actualizada** - Jurisprudencia y normas vigentes  

---

## WORKFLOW RECOMENDADO

1. **Identificar caso** → Determinar qué necesitas buscar
2. **Ejecutar búsqueda** → Usar comando JAC apropiado
3. **Capturar resultado** → Guardar en archivo (capturar-busqueda.sh)
4. **Revisar citas** → Validar que sean relevantes para tu caso
5. **Copiar a documento** → Incluir en demanda/reporte/análisis

**Tiempo total por búsqueda: 2-3 minutos**

---

## NOTAS IMPORTANTES

- Las búsquedas se guardan automáticamente en `/busquedas-juridicas/diarios/`
- Puedes revisar histórico de todas tus búsquedas
- Los resultados están listos para copiar directamente en documentos
- No necesitas verificar manualmente en múltiples fuentes (ya lo hace el sistema)

---

**¿Preguntas?** Revisa los archivos guardados en `busquedas-juridicas/` o ejecuta:
```bash
jac-jurisprudencia "ayuda"
```
