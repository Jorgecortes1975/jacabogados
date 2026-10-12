# JAC - Abogados Asociados | Sistema MCP Jurídico Especializado

> **Sistema autónomo de consulta jurídica colombiana con verificación de datos en fuentes oficiales**

## 🎯 Visión General

Sistema completo que integra:
- 9 fuentes oficiales colombianas registradas; **conector real** para la Corte Constitucional y un catálogo verificado de normas (ver tabla de estado)
- ✅ **Agente jurídico automatizado** para investigación autónoma
- **Verificación de datos** contra las fuentes con conector real (no contra todas)
- **Diseñado contra alucinaciones**: no se declara verificada una cita que ninguna fuente confirmó, y lo no verificable se informa como pendiente
- ✅ **Jurisprudencia verificada** de cortes colombianas
- ✅ **Leyes y normas actualizadas**

---

## 🚀 INICIO RÁPIDO: Activar Agente Jurídico

```bash
# Activar agente jurídico especializado
node agente-juridico-especializado.js activar

# Ver fuentes integradas
node agente-juridico-especializado.js fuentes

# Ver ejemplos de consultas
node agente-juridico-especializado.js help
```

---

## 📚 Agente Jurídico Especializado

### ¿Qué es?

Un agente autónomo que consulta automáticamente jurisprudencia, leyes, normas, decretos y resoluciones de fuentes oficiales colombianas verificadas.

### Capacidades

1. **Búsqueda de Jurisprudencia**
   - Sentencias de Corte Constitucional
   - Decisiones de Corte Suprema
   - Providencias de Consejo de Estado

2. **Consulta de Normas**
   - Leyes vigentes
   - Decretos presidenciales
   - Resoluciones ministeriales
   - Via SUIN (Sistema Único de Información Normativa)

3. **Análisis de Casos**
   - Compara tu caso con jurisprudencia oficial
   - Identifica precedentes relevantes
   - Genera análisis fundamentado

4. **Verificación de Datos**
   - Valida información contra múltiples fuentes
   - Evita alucinaciones
   - Garantiza información verificada

5. **Generación de Reportes**
   - Reportes jurídicos documentados
   - Citas verificables
   - Análisis profesional

### Fuentes Integradas (9 Instituciones Oficiales)

| Fuente | Contenido | Conector local (estado real, verificado 2026-10-12) |
|--------|-----------|--------|
| **Corte Constitucional** | Jurisprudencia, sentencias | SÍ: Socrata (metadatos) y relatoría (existencia), con tolerancia a fuentes caídas |
| **Normas (Función Pública, Gestor Normativo)** | Leyes y decretos | PARCIAL: catálogo de 17 normas; existencia y fecha, nunca vigencia |
| **Rama Judicial (relatoría unificada)** y **SAMAI** | Jurisprudencia y procesos | SOLO DIAGNÓSTICO: comprueban disponibilidad; la búsqueda no está automatizada |
| **Consejo de Estado** | Jurisprudencia | NO (con Croma conectado, el agente puede consultarla) |
| **Corte Suprema de Justicia** | Jurisprudencia | NO (con Croma conectado, el agente puede consultarla) |
| **Legal Data Hunter** | Multijurisdiccional | NO local; disponible solo si el servidor MCP está conectado |
| **Diario Oficial** | Decretos, resoluciones | NO |
| **SUIN** | Leyes, decretos | NO (sustituido por el catálogo de normas) |
| **Congreso de la República** | Proyectos de ley, leyes | NO |
| **Superintendencia de Sociedades** | Circulares, resoluciones | NO |
| **DIAN** | Normas tributarias, conceptos | NO |

Las fuentes sin conector local figuran en la configuración como referencia; no se consultan automáticamente. Lo que no tiene conector queda **pendiente de verificación**, nunca "verificado".

--------|-----------|--------|
| **Corte Constitucional** | Jurisprudencia, sentencias, auto-acordos | ✓ Activo |
| **Consejo de Estado** | Jurisprudencia, sentencias, decisiones | ✓ Activo |
| **Corte Suprema de Justicia** | Jurisprudencia, sentencias, providencias | ✓ Activo |
| **Legal Data Hunter** | 38M+ documentos, 230+ jurisdicciones | ✓ Activo |
| **Diario Oficial** | Decretos, resoluciones, normas, edictos | ✓ Activo |
| **SUIN** | Leyes, decretos, resoluciones normativas | ✓ Activo |
| **Congreso de la República** | Proyectos de ley, leyes, actos legislativos | ✓ Activo |
| **Superintendencia de Sociedades** | Jurisprudencia, circulares, resoluciones | ✓ Activo |
| **DIAN** | Normas tributarias, conceptos, resoluciones | ✓ Activo |

---

## 💻 Comandos de Consulta

### Sintaxis General

```bash
node agente-juridico-especializado.js consulta <tipo> "<pregunta>"
```

### Tipos de Consulta

> Estado real: `jurisprudencia`, `norma`, `verificar` y `validar-escrito` ejecutan consultas reales (Corte Constitucional y catálogo de normas). `analisis` y `reporte` requieren el agente (Claude): use `bin/jac consulta "<entrada>"` o `/jac-legal-os:jac-agente`. Los resultados descritos como "Retorna" más abajo son el objetivo de diseño, no lo que cada comando imprime hoy.

#### 1. **Jurisprudencia** - Buscar sentencias oficiales

```bash
node agente-juridico-especializado.js consulta jurisprudencia \
  "despido sin justa causa sentencias corte suprema"
```

**Retorna:**
- Sentencias de Corte Constitucional
- Decisiones de Corte Suprema
- Precedentes del Consejo de Estado
- Análisis de jurisprudencia

#### 2. **Norma** - Buscar leyes, decretos, resoluciones

```bash
node agente-juridico-especializado.js consulta norma \
  "código sustantivo del trabajo artículos 1 a 30"
```

**Retorna:**
- Texto normativo vigente
- Modificaciones posteriores
- Normas relacionadas
- Fuente oficial

#### 3. **Análisis** - Analizar caso contra jurisprudencia

```bash
node agente-juridico-especializado.js consulta analisis \
  "Mi cliente fue despedido sin justa causa. ¿Qué dice la jurisprudencia?"
```

**Retorna:**
- Jurisprudencia aplicable
- Precedentes relevantes
- Análisis caso a caso
- Recomendaciones legales

#### 4. **Verificar** - Verificar información legal

```bash
node agente-juridico-especializado.js consulta verificar \
  "El salario mínimo en Colombia es $1.600.000"
```

**Retorna:**
- Verificación contra fuentes oficiales
- Estado actual de la norma
- Fuentes que lo confirman
- Validez de la información

#### 5. **Reporte** - Generar reporte jurídico completo

```bash
node agente-juridico-especializado.js consulta reporte \
  "Análisis completo sobre derechos de trabajadores en Colombia"
```

**Retorna:**
- Reporte estructurado
- Jurisprudencia relevante
- Normativa aplicable
- Citas verificables
- Análisis profesional

---

## 🛡️ Garantías de diseño y su alcance real

### Qué se garantiza (probado con pruebas automáticas)

- No se declara **verificada** una cita que ninguna fuente confirmó.
- Una fuente caída deja la cita **pendiente**; nunca se presume que no existe.
- Una norma ausente del catálogo queda **pendiente**: su ausencia no prueba que no exista.
- Existir no es estar vigente: el sistema **no determina vigencia** de normas ni el texto de artículos.
- Cada ejecución informa qué fuentes respondieron y cuáles no.

### Qué NO se garantiza

- Verificación de hechos, pruebas, términos ni cálculos.
- Cobertura de Consejo de Estado, Corte Suprema, Diario Oficial, SUIN, Congreso, Supersociedades ni DIAN sin conector local.
- Validación cruzada en todos los casos: solo cuando hay más de una fuente con conector (Corte Constitucional).
- PASS_AUTOMATICO no equivale a PASS del protocolo; el abogado responsable es el último filtro.

Comprobación: `bin/jac prueba` (escrito sintético con 8 errores sembrados) y `bin/jac doctor --red`.

---

## 📋 Sistema de Transportes MCP

### Configuración de Transportes

Los transportes se almacenan en `mcp-config.json` y se gestionan mediante el CLI `claude-mcp-transport.js`.

### Uso del Comando CLI

```bash
# Agregar un nuevo transporte
node claude-mcp-transport.js add --transport stdio --name "legal-search" --command "node server.js"

# Listar transportes activos
node claude-mcp-transport.js list

# Activar un transporte
node claude-mcp-transport.js activate legal-search

# Eliminar un transporte
node claude-mcp-transport.js remove legal-search
```

### Tipos de Transporte Soportados

#### 1. **stdio** (Entrada/Salida Estándar)
Comunicación directa con procesos locales.

#### 2. **sse** (Server-Sent Events)
Conexiones persistentes bidireccionales para servidores remotos.

#### 3. **http** (HTTP/HTTPS)
Transporte REST para APIs legales.

---

## 🔧 Configuración Avanzada

### Estructura de Configuración

```json
{
  "version": "1.0",
  "transports": {
    "corte-constitucional": {
      "type": "http",
      "url": "https://www.corteconstitucional.gov.co",
      "api": "https://www.corteconstitucional.gov.co/wp-json/wp/v2",
      "fuente": "Corte Constitucional de Colombia",
      "contenido": ["jurisprudencia", "sentencias", "auto-acordos"],
      "enabled": true,
      "oficial": true
    }
  },
  "agents": {
    "juridico-especializado": {
      "nombre": "Agente Jurídico Especializado JAC",
      "tipo": "investigador-juridico-automatizado",
      "funciones": ["búsqueda-jurisprudencia", "consulta-normas", ...],
      "verificacionDatos": {
        "enabled": true,
        "requiereMultiplesFuentes": true,
        "validarContraOficial": true
      }
    }
  }
}
```

---

## 🛡️ Protocolo JAC Gauntlet Elite (control de calidad jurídico)

Para encargos jurídicos de importancia (demandas, tutelas, recursos, poderes, contratos, conceptos, liquidaciones), aplicar `jac/datos/JAC-GAUNTLET-ELITE.md`: delimitar el asunto (Matter Lock, fecha de referencia, inventario documental), producir, someter a revisión adversarial, corregir, revalidar y entregar con control final (estado BLOCKED, CONDITIONAL o PASS, rondas reales y pendientes). No inventar normas, sentencias ni datos; lo no verificable se marca PENDIENTE DE VERIFICACIÓN.

Comando único y plugin (`AGENTE-JAC.md`): `bin/jac consulta "<entrada>"`, `bin/jac prueba`, `bin/jac empaquetar`. Controles automáticos reproducibles (no sustituyen la revisión del abogado):

```bash
python3 -m gauntlet_jac validar-escrito escrito.docx --radicado <radicado> [--previo ronda1.json --json ronda2.json]
python3 -m gauntlet_jac inventario ./expediente
python3 -m normas_col consultar "Ley 1437 de 2011"   # existencia, nunca vigencia
```

---

### Registro de sentencias verificadas (jurisprudencia_col/registro.py)

`jurisprudencia_col/datos/registro_sentencias.json` guarda fichas de sentencias de las que se leyó el texto o la relatoría (C-683/14, SC4855-2021, SC455-2023, SC2157-2025): corporación, fecha, radicado, ponente, decisión, regla en palabras propias y límites. Estar en el registro no prueba vigencia de la regla ni que sea precedente obligatorio. Las tres sentencias de la Sala Civil se contrastaron solo con el texto aportado por el usuario; falta confirmarlas en la relatoría oficial. Las minutas, los modelos de escritos y los textos de libros de un despacho NO se publican en este repositorio.

## 🧭 Spec Kit: Desarrollo Guiado por Especificaciones

Este repositorio integra [Spec Kit](https://github.com/github/spec-kit) (GitHub), instalado como
skills de Claude Code en `.claude/skills/speckit-*`. Se usa para planear y construir cambios
medianos o grandes del ecosistema (nuevas fuentes, nuevos tipos de consulta, nuevos agentes) antes
de escribir código, en lugar de improvisar directamente sobre `agente-juridico-especializado.js`,
`lexa-super-router.js` o los transportes MCP.

### Principios del proyecto

Los principios rectores (sin alucinaciones, verificación multi-fuente, español jurídico por
defecto, trazabilidad, simplicidad) están en `.specify/memory/constitution.md`, derivados
directamente de las garantías de este documento. Actualízalos con:

```bash
/speckit-constitution
```

### Flujo recomendado para una funcionalidad nueva

```bash
/speckit-specify   "Descripción de la funcionalidad en términos de qué y por qué"
/speckit-clarify    # opcional: resolver ambigüedades antes de planear
/speckit-plan       "Stack y decisiones técnicas (Node.js, MCP, fuente X, etc.)"
/speckit-tasks
/speckit-analyze    # opcional pero recomendado si toca verificación de datos
/speckit-implement
```

Cada spec y plan se genera en español dentro de `specs/`, salvo identificadores técnicos, siguiendo
el principio III de la constitución.

---

## 📖 Ejemplos de Uso Práctico

### Caso 1: Consulta Rápida de Jurisprudencia

```bash
node agente-juridico-especializado.js consulta jurisprudencia \
  "abandono injustificado del trabajo consecuencias"
```

### Caso 2: Verificación Normativa

```bash
node agente-juridico-especializado.js consulta norma \
  "requisitos para terminar contrato por justa causa"
```

### Caso 3: Análisis de Situación Específica

```bash
node agente-juridico-especializado.js consulta analisis \
  "Cliente tiene conflicto de interés con su empleador. ¿Cómo procede?"
```

### Caso 4: Reporte Profesional

```bash
node agente-juridico-especializado.js consulta reporte \
  "Estado actual del derecho de huelga en Colombia"
```

---

## 🐛 Troubleshooting

**Error: "Agente no activado"**
- Ejecuta: `node agente-juridico-especializado.js activar`

**Error: "Fuente no disponible"**
- Verifica: `node agente-juridico-especializado.js fuentes`

**Resultado no verificado**
- El agente requiere múltiples fuentes - algunos temas pueden tener menos cobertura

---

## 📞 Soporte

**Rama:** `claude/colombia-legal-prospects-gask4u`  
**Sistema:** Agente Jurídico Especializado JAC  
**Versión:** 1.0  
**Última actualización:** 2026-08-02

---

**JAC - Abogados Asociados | Sistema de Investigación Jurídica Automatizada**
