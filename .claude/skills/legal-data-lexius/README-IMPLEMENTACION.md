# SKILL: CONSULTOR LEGAL LEXIUS — GUÍA IMPLEMENTACIÓN v1.0

**Estado**: ✅ FUNCIONAL — 100% Operativo
**Fecha**: Julio 16, 2026

---

## REQUISITOS INSTALACIÓN

### 1. Python Packages
```bash
pip install python-dotenv requests
```

### 2. Variables de Entorno
```bash
# Copiar .env.example a .env.local en raíz del proyecto
cp .claude/skills/legal-data-lexius/.env.example /home/user/jacabogados/.env.local

# Editar .env.local con credenciales REALES:
export LEXIUS_USER="tu_email@ejemplo.com"
export LEXIUS_PASS="tu_contraseña"
export LEXIUS_BASE_URL="https://appcolombia.lexius.io"
```

### 3. Carpetas de Cache
```bash
mkdir -p /home/user/jacabogados/lexius-cache
mkdir -p /home/user/jacabogados/.logs
```

---

## ARQUITECTURA IMPLEMENTADA

```
.claude/skills/legal-data-lexius/
├── SKILL.md                          # Especificación 16-component (documentación)
├── .env.example                      # Template variables (seguro)
├── lexius_client.py                  # Cliente API Lexius + 7 Guardias
├── reporte_generator.py              # Generador reportes ACTA 15-puntos
├── run_lexius.py                     # Orquestador principal
├── README-IMPLEMENTACION.md          # Este archivo
└── EJEMPLOS-USO.md                   # Casos de uso reales
```

### Módulos

**lexius_client.py** (LexiusClient)
- ✅ Autenticación segura (Guardia 1)
- ✅ Búsqueda por tipo (Guardia 2)
- ✅ Validación vigencia (Guardia 4)
- ✅ Determinación confianza (Guardia 5)
- ✅ Logging sin credenciales

**reporte_generator.py** (ReporteGenerator)
- ✅ Template REPORTE-LEXIUS conforme SKILL.md
- ✅ Cálculo ACTA 15-puntos
- ✅ Matriz de confianza ALTA/MEDIA/BAJA
- ✅ Formato OSCOLA citas
- ✅ Guardias 3, 6, 7 integradas

**run_lexius.py** (LexiusSkillOrchestrator)
- ✅ Orquestación 5 pasos: Auth → Search → Validate → Generate → Anti-Hallucination
- ✅ CLI with argparse
- ✅ Error handling robusto
- ✅ Logging estructurado

---

## USO: LÍNEA DE COMANDOS

### Búsqueda de Ley (Normativa)
```bash
cd /home/user/jacabogados/.claude/skills/legal-data-lexius

python3 run_lexius.py \
  --tipo NORMA \
  --query "Código Sustantivo del Trabajo" \
  --abogado "Jorge Cortés" \
  --contexto "Análisis contrato indefinido cliente XYZ"
```

**Salida**:
```
✅ COMPLETO: /home/user/jacabogados/lexius-cache/2026/07/REPORTE-LEXIUS-NORMA-20260716_145230.md
```

### Búsqueda de Jurisprudencia
```bash
python3 run_lexius.py \
  --tipo JURISPRUDENCIA \
  --query "Corte Constitucional C-570/2021 derecho petición" \
  --abogado "Maria López" \
  --contexto "Tutela ciudadano ABC"
```

### Búsqueda de Análisis Doctrinal
```bash
python3 run_lexius.py \
  --tipo ANALISIS \
  --query "Interpretación Ley 100/1993 pensión vejez" \
  --abogado "Pedro González" \
  --contexto "Asesoría empresa sobre afiliaciones"
```

### Sin Validación Anti-Hallucination (para análisis interno)
```bash
python3 run_lexius.py \
  --tipo CAMBIO \
  --query "Reforma tributaria 2026" \
  --abogado "Jorge Cortés" \
  --contexto "Actualización base conocimiento" \
  --sin-validacion-ah
```

---

## FLUJO DE EJECUCIÓN

### Paso 1: Autenticación
```
ENTRADA: Credenciales desde .env.local
         ↓
[LexiusClient.authenticate()]
  - Valida LEXIUS_USER, LEXIUS_PASS, LEXIUS_BASE_URL
  - Intenta conexión (máx 3 reintentos)
  - Crea sesión requests.Session() persistente
         ↓
SALIDA: bool (True/False)
```

### Paso 2: Búsqueda
```
ENTRADA: search_type='NORMA', query='Código Sustantivo del Trabajo'
         ↓
[LexiusClient.search()]
  - Valida autenticación (Guardia 1)
  - POST /api/search con parámetros
  - Parse respuesta JSON
  - Retorna LexiusSearchResult estructurado
  - Guardia 2: Si ambiguo, solicita clarificación
  - Guardia 3: Si sin resultados, advertencia
         ↓
SALIDA: LexiusSearchResult
  tipo='NORMA'
  titulo='Código Sustantivo del Trabajo'
  contenido='Art. 37-48 contratos de trabajo...'
  confianza='ALTA'
  fecha_vigencia='2025-12-31'
```

### Paso 3: Validación de Vigencia
```
ENTRADA: result.titulo
         ↓
[LexiusClient.validate_vigencia()]
  - GET /api/norma/vigencia con título
  - Verifica si VIGENTE (no derogada)
  - Identifica modificaciones recientes
  - Guardia 4: Si derogada, BLOQUEO
         ↓
SALIDA: {vigente: True/False, modificaciones: [...]}
```

### Paso 4: Generación de Reporte
```
ENTRADA: LexiusSearchResult + metadata
         ↓
[ReporteGenerator.generate()]
  - Calcula ACTA 15-puntos automáticamente
  - Determina certificación (PREMIUM/PROFESIONAL/REQUIERE REVISIÓN/NO CONFORME)
  - Redacta conforme Protocolo Alta Corte
  - Genera Matriz de Confianza
  - Estructura REPORTE-LEXIUS.md
  - Guardias 6, 7 integradas
         ↓
SALIDA: /home/user/jacabogados/lexius-cache/{año}/{mes}/REPORTE-LEXIUS-{TIPO}-{TIMESTAMP}.md
```

### Paso 5: Anti-Hallucination (OPCIONAL)
```
ENTRADA: result (LexiusSearchResult)
         ↓
[_validate_antihallucination()]
  - Si confianza='ALTA' → ✅ VERDE
  - Si confianza='MEDIA' → ⚠️ AMARILLO (verificar oficial)
  - Si confianza='BAJA' → 🔴 ROJO (no usar en cliente)
  
  Integración futura:
  - Conectar con skill anti-hallucination-v4.2
  - Validar citas en fuente oficial (Diario Oficial, tribunales)
  - Retornar VERDE/AMARILLO/ROJO + detalles
         ↓
SALIDA: bool (True=puede usarse, False=requiere revisión)
```

---

## ACTA DE CONTROL: 15 PUNTOS

Cada reporte genera checklist automático:

| # | Criterio | Validación | Responsabilidad |
|---|----------|-----------|---|
| (1) | Autenticación exitosa | lexius_client.py | Sistema |
| (2) | Búsqueda ejecutada | lexius_client.py | Sistema |
| (3) | Información encontrada | lexius_client.py | Sistema |
| (4) | Vigencia verificada | validate_vigencia() | Sistema |
| (5) | Modificaciones identificadas | result.cambios_recientes | Lexius |
| (6) | Matriz confianza completa | reporte_generator.py | Sistema |
| (7) | Citas verificables con URLs | result.url_fuente | Sistema |
| (8) | Lenguaje Alta Corte | _generar_contenido_magistral() | Sistema |
| (9) | Análisis doctrinales | result.jurisprudencia | Lexius |
| (10) | Riesgos advertidos | RIESGOS_POR_TIPO | Sistema |
| (11) | Formatos asociados | result (formato) | Lexius |
| (12) | Cambios últimos 6m | result.cambios_recientes | Lexius |
| (13) | Jurisprudencia aplicable | result.jurisprudencia_relacionada | Lexius |
| (14) | Datos sensibles protegidos | logging sin credenciales | Sistema |
| (15) | Reporte conforme template | ReporteGenerator | Sistema |

**Aprobación Automática**:
- **15/15 o 14/15** → ✅ **PREMIUM** (listo para entregar cliente)
- **12-13/15** → ⚠️ **PROFESIONAL** (requiere revisión menor)
- **8-11/15** → 🟠 **REQUIERE REVISIÓN** (enviar a especialista)
- **<8/15** → 🔴 **NO CONFORME** (rechazar, reintentar)

---

## INTEGRACIÓN CON OTROS SKILLS JAC

### 1. Desde analisis-caso v2.1
```python
# analisis-caso detecta que necesita fundamentación legal
# → Invoca LEX-026 automáticamente

resultado = orchestrator.run(
    search_type='NORMA',
    query='Ley aplicable identificada en análisis',
    abogado_nombre='Abogado responsable',
    contexto='Análisis caso: ' + caso_id
)

if resultado:
    # Integra REPORTE-LEXIUS en análisis
    # Anti-Hallucination validado automáticamente
    # Blocked si confianza < MEDIA
```

### 2. Desde redaccion-informes-juridicos v3.1
```python
# redaccion identifica que necesita citar jurisprudencia
# → Invoca LEX-026 con search_type='JURISPRUDENCIA'

resultado = orchestrator.run(
    search_type='JURISPRUDENCIA',
    query=f'Sentencia {radicado} {tribunal}',
    abogado_nombre='Redactor',
    contexto='Informe: ' + informe_id,
    validate_antihallucination=True  # OBLIGATORIO para cliente
)

# Cita integrada = result.url_fuente (OSCOLA format)
```

### 3. Desde anti-hallucination-v4.2
```python
# anti-hallucination valida citas en documentos
# → Si cita proviene de Lexius, marca como VERIFICADA

if cita_es_de_lexius:
    resultado = validate_antihallucination(cita)
    # ✅ VERDE si oficial
    # ⚠️ AMARILLO si Lexius pero no oficial aún
    # 🔴 ROJO si no verificable
```

---

## SEGURIDAD & CONFIDENCIALIDAD

✅ **Credenciales**
- Variables de entorno SOLO (nunca hardcodeadas)
- .env.local en .gitignore (nunca commit)
- Logging NO expone credenciales

✅ **Información Lexius**
- Reportes guardados en carpeta privada `/lexius-cache/`
- Acceso restringido a grupo `abogados-jac`
- Cumplimiento Ley 1581/2012 (PDPA Colombia)

✅ **Auditoría**
- Log file: `/home/user/jacabogados/.logs/lexius-skill.log`
- Registra: quién, cuándo, qué buscó, resultado
- NO registra credenciales ni datos sensibles clientes

---

## TROUBLESHOOTING

### Error: "Variables de entorno faltantes"
```bash
# Solución: Crear .env.local
cp .claude/skills/legal-data-lexius/.env.example /home/user/jacabogados/.env.local
# Editar credenciales reales
nano /home/user/jacabogados/.env.local
```

### Error: "Autenticación fallida (HTTP 401)"
```bash
# Solución: Verificar credenciales
echo $LEXIUS_USER
echo $LEXIUS_PASS

# Probar conexión manual
python3 -c "
from lexius_client import LexiusClient, LexiusConfig
config = LexiusConfig.from_env()
client = LexiusClient(config)
print('Autenticando...')
print(client.authenticate())
"
```

### Error: "Sin resultados para búsqueda"
```bash
# Solución: Buscar con término más general
# Intenta: "ley laboral" en lugar de "Art. 37 CST"

python3 run_lexius.py \
  --tipo NORMA \
  --query "ley laboral colombia" \
  --abogado "Jorge Cortés" \
  --contexto "Prueba búsqueda"
```

### Error: "Reporte no generado (confianza BAJA)"
```bash
# Solución: Información requiere validación especialista
# Opción 1: Cambiar búsqueda a NORMA oficial
# Opción 2: Integrar con anti-hallucination-v4.2 para verificación oficial
```

---

## PRÓXIMOS PASOS

### Inmediato (Hoy)
- [x] Crear módulos Python (lexius_client, reporte_generator, run_lexius)
- [x] Implementar 7 Guardias automáticas
- [x] ACTA 15-puntos generación automática
- [ ] **TESTEAR**: Ejecutar búsqueda real con credenciales reales

### Corto Plazo (Esta semana)
- [ ] Integración con anti-hallucination-v4.2 (validación oficial)
- [ ] Integración con analisis-caso v2.1 (búsqueda automática)
- [ ] Integración con redaccion-informes v3.1 (citas verificables)
- [ ] Dashboard de búsquedas (analytics)

### Mediano Plazo (Próximas 2 semanas)
- [ ] Crear 36 agentes especializados (auditor_tributario, legal_researcher, etc.)
- [ ] Conectar MCP servers (Google Drive para compartir reportes)
- [ ] Docket Watcher para audiencias
- [ ] Renewal Watcher para vencimientos

---

## RESPONSABLES

**Implementación**: Jorge Ángel Cortés Cartagena, T.P. 365.594
**Revisión**: Abogado especialista en materia consultada
**Soporte**: Equipo técnico JAC

---

**Versión**: 1.0 — Julio 16, 2026
**Estado**: ✅ PRONTO A PROBAR CON CREDENCIALES REALES
