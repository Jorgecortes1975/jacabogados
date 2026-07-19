# 🚀 OLLAMA — MODELOS LOCALES AGNÓSTICOS

**Integración con Ecosistema JA Abogados**  
**Fecha**: 19 de julio de 2026

---

## ¿QUÉ ES OLLAMA?

Ollama es un proyecto de código abierto que permite ejecutar **modelos de lenguaje grandes localmente** en tu máquina, sin necesidad de APIs externas o costos de nube.

### Características Clave

- ✅ **Ejecuta localmente** — Los modelos corren en tu hardware (CPU/GPU)
- ✅ **Sin costos por token** — Una sola descarga, uso ilimitado
- ✅ **Agnóstico** — Compatible con cualquier modelo: Llama 2, Mistral, Neural Chat, etc.
- ✅ **Privado** — Los datos nunca salen de tu máquina
- ✅ **Rápido** — Latencia baja para respuestas inmediatas

---

## INSTALACIÓN

### Opción 1: Descargar Ollama (Recomendado)

```bash
# macOS
brew install ollama

# Linux
curl https://ollama.ai/install.sh | sh

# Windows
# Descarga desde https://ollama.ai/download

# Docker
docker pull ollama/ollama
docker run -d -p 11434:11434 ollama/ollama
```

### Opción 2: Ejecutar en Docker (Completo)

```bash
# Pull y run
docker run -d \
  --name ollama \
  -p 11434:11434 \
  -v ollama:/root/.ollama \
  ollama/ollama

# Ejecuta un modelo
docker exec -it ollama ollama run llama2
```

---

## MODELOS DISPONIBLES

Ollama soporta decenas de modelos. Los más útiles para trabajo jurídico:

### Pequeños (Rápidos, <10GB)

```bash
ollama pull mistral          # 7B params, rápido y preciso
ollama pull neural-chat      # 7B params, especializado en chat
ollama pull orca-mini        # 3B params, muy pequeño
```

**Tiempo**: ~2-5 segundos por respuesta

### Medianos (Equilibrio, 10-20GB)

```bash
ollama pull llama2           # 7B, modelo base popular
ollama pull llama2:13b       # 13B, más capacidad
ollama pull mistral:large    # 12B, especializado
```

**Tiempo**: ~5-10 segundos por respuesta

### Grandes (Potentes, >20GB)

```bash
ollama pull llama2:70b       # 70B params, máxima capacidad
ollama pull mixtral          # 8x7B MoE, excelente razonamiento
```

**Tiempo**: ~10-30 segundos por respuesta (o más)

### Para Jurídica Española/Colombiana

```bash
# No hay modelos especializados en derecho colombiano en Ollama (aún)
# Pero puedes usar:
ollama pull mistral          # Mejor para lenguaje y razonamiento
ollama pull neural-chat      # Mejor para conversación
```

**Limitación actual**: Los modelos locales en Ollama son genéricos. No tienen entrenamiento jurídico colombiano específico. Para máxima precisión jurídica, usa Claude/GPT en la nube con `arnés_agente.py`.

---

## USO CON ARNÉS_AGENTE.PY

Tu archivo `arnés_agente.py` **ya está preparado para Ollama**. Solo cambia una variable de entorno:

### Paso 1: Inicia Ollama

```bash
# En una terminal aparte:
ollama serve

# O si está en Docker, ya está corriendo
```

### Paso 2: Descarga un modelo

```bash
ollama pull mistral
# o
ollama pull llama2
```

Espera a que termine (descarga 5-15 GB dependiendo del modelo).

### Paso 3: Ejecuta el arnés con Ollama

```bash
# Usa mistral (recomendado para jurídica)
MODELO=ollama/mistral python arnés_agente.py "Redacta una demanda de tutela"

# o usa llama2
MODELO=ollama/llama2 python arnés_agente.py "Tu pregunta jurídica"

# o Mixtral (más potente)
MODELO=ollama/mixtral python arnés_agente.py "Analiza este contrato"
```

### Paso 4: Observa las respuestas

El arnés usa LiteLLM, que:
1. Convierte tu `MODELO=ollama/...` a formato OpenAI
2. Conecta a `localhost:11434` (puerto por defecto de Ollama)
3. Ejecuta el agente localmente
4. NO consume tokens en APIs externas

---

## COMPARATIVA: OLLAMA vs CLAUDE/GPT

| Aspecto | Ollama Local | Claude (API) | GPT-4 (API) |
|---------|--------------|--------------|-----------|
| **Costo** | Gratis (después de descargar) | ~$0.003/k tokens | ~$0.03/k tokens |
| **Privacidad** | 100% privado | Enviado a Anthropic | Enviado a OpenAI |
| **Calidad jurídica** | Buena (genérica) | Excelente (especializacion) | Muy buena |
| **Velocidad** | Variable (5-30s) | Rápida (~2s) | Rápida (~2s) |
| **Disponibilidad** | Offline | Requiere internet | Requiere internet |
| **Capacidad local** | GPU/CPU propia | Nube | Nube |
| **Mejor para** | Experimentos, testing, privacidad | Producción jurídica | Producción de alto riesgo |

---

## RECOMENDACIÓN PARA JA ABOGADOS

### Desarrollo e Iteración

```bash
# Usa Ollama local para probar flujos rápidamente sin costos
MODELO=ollama/mistral python arnés_agente.py "Prueba rápida"
```

**Ventaja**: Itera 100 veces sin costos. Perfecto para debugging.

### Producción y Radiación

```bash
# Usa Claude/GPT para máxima precisión antes de radicar
MODELO=claude-opus-4-8 python arnés_agente.py "Demanda final"
```

**Ventaja**: Máxima garantía jurídica. Anti-hallucination-v4 validará cada claim.

### Flujo Híbrido (Recomendado)

```bash
# 1. Prototipo rápido con Ollama local
MODELO=ollama/mistral python arnés_agente.py "¿Cuáles son los argumentos?"

# 2. Refinamiento con Claude
MODELO=claude-opus-4-8 python arnés_agente.py "Redacta versión final"

# 3. Validación con Anti-Hallucination v4
# Automático en el flujo de redactor-jurídico-col
```

**Resultado**: Velocidad + costo bajo + máxima precisión = flujo óptimo.

---

## CONFIGURACIÓN AVANZADA

### Custom System Prompt para Jurídica

Puedes crear un `system-prompt-juridico.txt`:

```
Eres un asistente jurídico especializado en derecho laboral y corporativo colombiano.
Respuestas basadas en:
- Código Sustantivo del Trabajo (CST)
- Ley 100/1993 (Seguridad Social)
- Ley 1581/2012 (Protección de Datos)
- Código de Comercio
Tu objetivo es redactar escritos de máximo rigor magistral.
```

Úsalo con:

```bash
# Ollama con custom prompt (manual, sin arnés)
curl -X POST http://localhost:11434/api/generate \
  -d '{
    "model": "mistral",
    "prompt": "Redacta demanda de tutela...",
    "system": "$(cat system-prompt-juridico.txt)"
  }'
```

### Configuración de Parámetros

```bash
# Baja temperatura para respuestas más deterministas (jurídica)
MODELO=ollama/mistral python arnés_agente.py \
  --temperature 0.3 "Tu pregunta"

# Aumenta tokens máximos para respuestas más largas
MODELO=ollama/mixtral python arnés_agente.py \
  --max-tokens 4096 "Tu pregunta"
```

---

## INTEGRACIÓN CON SKILLS JURÍDICOS

Tus skills jurídicos (redactor-juridico-col, anti-hallucination-v4, etc.) pueden usar Ollama como modelo base:

### Opción 1: Skills en Claude, Modelo en Ollama (NO ideal)

```
Skills (Claude) → Arnés (Ollama) = Mezcla de providers
```

**Problema**: Los skills están optimizados para Claude, no para Ollama genérico.

### Opción 2: Skills en Claude, Ollama para Testing (RECOMENDADO)

```
1. Desarrollo: Skills + Ollama (iteración rápida)
2. Producción: Skills + Claude (máxima precisión)
```

**Ventaja**: Bajos costos en desarrollo, máxima calidad en radiación.

### Opción 3: Ollama para todo (NO recomendado para jurídica)

```
Skills jurídicos completos con Ollama = Calidad genérica
```

**Riesgo**: Los modelos de Ollama no tienen especialización jurídica colombiana.

---

## TROUBLESHOOTING

### "Connection refused" al ejecutar arnés

```bash
# Verifica que Ollama esté corriendo
curl http://localhost:11434/api/tags

# Si no funciona, inicia Ollama:
ollama serve
```

### Modelo no disponible

```bash
# Lista modelos descargados
ollama list

# Descarga el que necesitas
ollama pull mistral

# Espera a que termine (5-30 min según conexión)
```

### Respuestas lentísimas

```bash
# Usa un modelo más pequeño
MODELO=ollama/neural-chat python arnés_agente.py "Tu pregunta"

# O reduce tokens máximos
# (Modifica arnés_agente.py línea ~215)
```

### GPU no se usa (solo CPU)

```bash
# Ollama intenta detectar GPU automáticamente
# En Linux, verifica:
nvidia-smi  # Si tienes NVIDIA GPU

# En macOS, Ollama usa Metal automáticamente

# En Windows, activa CUDA o ROCm en instalación
```

---

## ROADMAP: FUTURO DE OLLAMA + JA ABOGADOS

| Hito | Descripción | Estado |
|------|-----------|--------|
| v1 (Hoy) | Ollama como modelo agnóstico local | ✅ ACTIVO |
| v2 | Fine-tuning de mistral con casos colombianos | 📋 Planeado |
| v3 | Integración con Legal Data Hunter + Ollama | 📋 Planeado |
| v4 | Modelo jurídico colombiano especializado en Ollama | 🔮 Futuro |

---

## PRÓXIMOS PASOS

1. ✅ Instala Ollama: https://ollama.ai/download
2. ✅ Descarga un modelo: `ollama pull mistral`
3. ✅ Prueba el arnés: `MODELO=ollama/mistral python arnés_agente.py "Prueba"`
4. 📋 Documenta feedback sobre precisión jurídica
5. 📋 Considera fine-tuning con casos reales

---

## REFERENCIAS

- **Repositorio Ollama**: https://github.com/ollama/ollama
- **Modelos disponibles**: https://ollama.ai/library
- **Documentación**: .ollama/docs/
- **Arnés Python**: arnés_agente.py (ya soporta Ollama via LiteLLM)

---

**Responsable**: Jorge Ángel Cortés Cartagena — T.P. 365.594  
**Integración**: JA Abogados + LEXA-LAB + Ollama  
**Licencia**: MIT (Ollama) + Propietaria (JA Abogados)
