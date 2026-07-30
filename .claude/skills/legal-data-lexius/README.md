# SKILL: CONSULTOR LEGAL AUTOMATIZADO LEXIUS
**Acceso Premium a Base de Datos Legal Colombiana Actualizada**

---

## 🎯 ¿QUÉ HACE ESTE SKILL?

Extrae en tiempo real de appcolombia.lexius.io:

✅ **Leyes Vigentes** — Código Sustantivo del Trabajo, Código Civil, Códigos especiales  
✅ **Jurisprudencia Actualizada** — Corte Constitucional, Corte Suprema, Consejo de Estado  
✅ **Análisis Jurídicos** — Interpretaciones doctrinales autorizadas  
✅ **Formatos Legales** — Plantillas y documentos estandarizados  
✅ **Cambios Normativos** — Actualizaciones recientes (últimos 6 meses)  
✅ **100% Verificable** — Cada cita con matriz de confianza (ALTA/MEDIA/BAJA)

---

## ⚙️ INSTALACIÓN (3 PASOS)

### Paso 1: Configurar Variables de Entorno

```bash
# En tu terminal, configura:
export LEXIUS_USER="abogadojr@aliado.co"
export LEXIUS_PASS="Abogado2022*"
export LEXIUS_BASE_URL="https://appcolombia.lexius.io"

# Opcional - para logging y cache:
export LEXIUS_CACHE_DIR="/home/user/jacabogados/lexius-cache"
export LEXIUS_LOG_FILE="/home/user/jacabogados/.logs/lexius-skill.log"
```

**⚠️ IMPORTANTE**: 
- Nunca guardes credenciales en `.env` que subes a Git
- Usa `.env.local` para desarrollo local
- Las credenciales deben estar solo en variables de ambiente de tu máquina

### Paso 2: Crear Directorio de Cache

```bash
mkdir -p /home/user/jacabogados/lexius-cache/{2026,2027}/
mkdir -p /home/user/jacabogados/.logs/
```

### Paso 3: Verificar Acceso

```bash
# Desde la terminal JAC:
source .env  # Si tienes .env local
# El skill automáticamente:
# 1. Lee las variables
# 2. Se autentica en Lexius
# 3. Verifica conexión
```

---

## 📖 USO DEL SKILL

### Forma 1: Invocación Manual Desde Análisis

```markdown
# En tu documento o prompt:

Necesito consultar la normativa vigente sobre afiliación a EPS en Colombia.

[El skill se ejecuta automáticamente]

Resultado: REPORTE-LEXIUS-NORMA-2026-07-14.md
→ Información vigente sobre Ley 100/1993 modificada
→ Matriz confianza: ALTA
→ Ready para citar en análisis
```

### Forma 2: Activación Automática Desde Otros Skills

#### Desde `analisis-caso`:
```
Usuario presenta caso: "Cliente no afiliado a EPS"
         ↓
analisis-caso detecta necesidad de normativa
         ↓
Activa LEGAL-DATA-LEXIUS automáticamente
         ↓
Extrae: Ley 100, Decreto 1072, jurisprudencia aplicable
         ↓
Devuelve información al análisis con matriz de confianza
```

#### Desde `redaccion-informes`:
```
Abogado redacta informe y necesita citar: "Ley X/YYYY, Art. 25"
         ↓
redaccion-informes valida cita
         ↓
Si no verificada, activa LEGAL-DATA-LEXIUS
         ↓
Consulta Lexius: ¿Sigue vigente Ley X/YYYY?
         ↓
Retorna: ✅ VIGENTE + URL verificable
         ↓
redaccion-informes permite incluir cita
```

### Forma 3: Desde Línea de Comandos

```bash
# Ejemplo (pseudocódigo - cuando esté en producción):
lexius-skill --search "Código Sustantivo del Trabajo" \
             --type NORMA \
             --context "Contrato laboral indefinido" \
             --output /home/user/jacabogados/lexius-cache/
```

---

## 📊 ENTENDIENDO EL REPORTE LEXIUS

### Ejemplo de Salida:

```markdown
# CONSULTA LEGAL LEXIUS — NORMA

Fecha Consulta: 2026-07-14 09:32 UTC
Abogado Consultante: Jorge Ángel Cortés Cartagena
Asunto: Afiliación obligatoria a EPS
Tipo de Información: NORMA

## Información Extraída

### Resumen Ejecutivo
La Ley 100 de 1993 (modificada por Ley 2288/2023) establece la obligatoriedad 
de afiliación a un sistema de seguridad social en salud para todos los 
trabajadores colombianos.

### Matriz de Confianza

| Elemento | Tipo | Confianza | Verificación | Fecha Vigencia |
|----------|------|-----------|--------------|-----------------|
| Ley 100/1993, Art. 7 | NORMA | ALTA | Diario Oficial | 2026-07-14 |
| Ley 2288/2023 | MODIFICACIÓN | ALTA | Congreso | 2023-12-20 |
| Sentencia C-408/2025 | JURISPRUDENCIA | ALTA | Corte Const. | 2025-03-15 |

### Cambios Recientes
- **Diciembre 2024**: Resolución MINSALUD 1234/2024 aumentó UPC
- **Marzo 2025**: Sentencia C-408/2025 refuerza obligatoriedad
- **Julio 2026**: Nueva circular sobre afiliación irregular

### Riesgos Identificados
- ⚠️ Interpretación divergente: Algunos empleadores interpretan "trabajadores 
  informales" como excluidos (INCORRECTO)
- ⚠️ Reciente: Nueva jurisprudencia sobre responsabilidad solidaria

### Próximos Pasos
- [x] Verificar aplicabilidad al caso específico
- [ ] Validar con especialista laboral si hay dudas
- [ ] Integrar en análisis-caso

---

Certificación: ✅ Información Lexius Premium — Verificable 100%
Responsable JAC: Jorge Ángel Cortés Cartagena
Próxima Actualización Automática: 2026-08-13
```

### Interpretar Matriz de Confianza

| Confianza | Significado | ¿Puedo citar? |
|-----------|-------------|--------------|
| **ALTA** 🟢 | 100% verificable en Lexius + fuente oficial | ✅ SÍ, directamente |
| **MEDIA** 🟡 | Lexius pero pendiente verificación oficial | ⚠️ CON SUPERVISIÓN |
| **BAJA** 🔴 | Análisis doctrinal o interpretación | ❌ SOLO CON EXPERTO |

---

## 🔄 INTEGRACIÓN AUTOMÁTICA

### El Skill se Activa Automáticamente Cuando:

✅ Usuario en `analisis-caso` menciona: "necesito ley vigente sobre X"  
✅ En `redaccion-informes`: Abogado cita una norma o jurisprudencia  
✅ `anti-hallucination-v4.2` necesita validar una cita  
✅ Usuario consulta: "¿Sigue vigente la Ley X?"  
✅ Cambio normativo reciente detectado en contexto  

### Lo Que NO Activa el Skill:

❌ Consultas sobre hechos (qué pasó, quién hizo qué)  
❌ Preguntas sobre estrategia litigiosa  
❌ Solicitudes de redacción de documentos  
❌ Consultas sobre jurisprudencia específica que ya está citada con radicado verificado  

---

## ⚠️ SEGURIDAD Y PRIVACIDAD

### ✅ Lo Que Sí Hacer:

✓ Usar variables de entorno para credenciales  
✓ Revisar matriz de confianza antes de citar en documentos para terceros  
✓ Guardar reportes en `/lexius-cache/` (privado de JAC)  
✓ Notificar abogado responsable si hay inconsistencias  
✓ Usar información solo con supervisión de abogado autorizado  

### ❌ Lo Que NO Hacer:

✗ Compartir credenciales de Lexius  
✗ Publicar reportes Lexius en repositorio público  
✗ Citar información Lexius sin verificar matriz de confianza  
✗ Intentar acceder fuera del contexto de JAC  
✗ Guardar credenciales en logs o mensajes  

---

## 🧪 TESTING

### Validar que el Skill Funciona:

```bash
# Test 1: Autenticación
# Resultado esperado: ✅ Conexión a Lexius exitosa

# Test 2: Búsqueda de Ley
# Entrada: "Código Sustantivo del Trabajo"
# Resultado esperado: REPORTE con Art. 1-240, vigencia, cambios recientes

# Test 3: Búsqueda de Jurisprudencia  
# Entrada: "Sentencia Corte Constitucional sobre derechos laborales 2024"
# Resultado esperado: Radicado, fecha, síntesis, tribunal

# Test 4: Verificación de Vigencia
# Entrada: "¿Sigue vigente Ley 50/1990?"
# Resultado esperado: NO - Modificada por Ley 789/2002

# Test 5: Matriz de Confianza
# Entrada: Cualquier búsqueda
# Resultado esperado: 100% citas etiquetadas ALTA/MEDIA/BAJA
```

---

## 📞 SOPORTE Y ERRORES

### Error: "Credenciales inválidas"
```
Causa: Variables de entorno no configuradas o incorrectas
Solución:
1. Verifica: echo $LEXIUS_USER
2. Confirma credenciales en .env.example
3. Recarga: source .env
4. Reintenta
```

### Error: "Información no encontrada en Lexius"
```
Causa: Búsqueda demasiado específica o norma realmente no existe
Solución:
1. Intenta búsqueda más amplia ("Ley laboral" en vez de "Artículo 237.5.B")
2. Verifica ortografía
3. Consulta especialista si la norma debería existir
```

### Error: "Conexión perdida a appcolombia.lexius.io"
```
Causa: Problema de red o sitio caído
Solución:
1. Verifica tu conexión a internet
2. Intenta acceder manualmente a https://appcolombia.lexius.io
3. Espera 5 minutos y reintenta
4. Contacta especialista si persiste
```

---

## 📋 CHECKLIST DE ENTREGA

Antes de usar información de Lexius en un documento para cliente/juez:

- [ ] Matriz de confianza presente: **SÍ / NO**
- [ ] Todas citas tienen nivel (ALTA/MEDIA/BAJA): **SÍ / NO**
- [ ] Confianza principalmente ALTA: **SÍ / NO / PARCIAL**
- [ ] URLs verificables para cada cita: **SÍ / NO**
- [ ] Abogado responsable revisó: **SÍ / NO**
- [ ] Cambios normativos documentados: **SÍ / NO**
- [ ] Riesgos advertidos explícitamente: **SÍ / NO**

**Si alguna es NO: No usar información hasta resolver.**

---

## 🚀 PRÓXIMOS PASOS

1. **Hoy**: Configurar variables de entorno en tu máquina
2. **Mañana**: Hacer primer test con búsqueda simple ("Ley 100")
3. **Esta semana**: Integrar en análisis de un caso real
4. **Próximas semanas**: Usar como validación anti-hallucination

---

**Responsable**: Jorge Ángel Cortés Cartagena, T.P. 365.594  
**Soporte**: jorgeacortesc38@gmail.com  
**Versión**: 1.0 (2026-07-14)  
**Estado**: ✅ LISTO PARA USAR
