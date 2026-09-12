# Skill: Auto-Hallucination-Check — Validación automática de hechos

**Activación**: Automática cuando:
1. Un hook completa y genera output
2. Un sub-agente produce recomendación
3. Archivo entra a `.claude/agents/business-automation/pending-outputs/`

## Procedimiento

### 1. Listar outputs pendientes
```bash
ls -1 .claude/agents/business-automation/pending-outputs/*.md
```

### 2. Por cada output, validar

#### Fact-checking
- Extrae todas las CLAIMS (sentencias, normas, números)
- Verifica contra LexisNexis Colombia
- Verifica contra SUIN-Juriscol
- Marca con timestamp: `[2026-07-31 12:00:00]`

#### Coverage
```
Claim: "Sentencia SL-2018-00234"
Status: ✅ VERIFIED (encontrada en LexisNexis)
Confidence: 98%
Source: https://lexisnexis.co/...
```

### 3. Calcular confianza general

```
Confianza = (claims_verified / total_claims) * 100
```

Umbrales:
- **≥85%** → PASS (automático)
- **70-85%** → FLAGGED (requiere revisión Jorge)
- **<70%** → FAIL (requiere rewrite)

### 4. Reportar

#### PASS
```json
{
  "output_id": "output_001.md",
  "status": "PASS",
  "confidence": 96,
  "claims_checked": 23,
  "timestamp": "2026-07-31T12:00:00Z"
}
→ Archivo a .claude/agents/business-automation/validated/
```

#### FLAGGED
```json
{
  "output_id": "output_002.md",
  "status": "FLAGGED",
  "confidence": 78,
  "claims_checked": 15,
  "failures": [
    {
      "claim": "Sentencia C-123/2020",
      "status": "UNVERIFIED",
      "action": "REQUIERE REVISIÓN JORGE"
    }
  ],
  "timestamp": "2026-07-31T12:00:00Z"
}
→ Archivo a .claude/agents/business-automation/flagged/
→ Notifica Slack #jac-quality
→ Email a jorge@jacabogados.co
```

#### FAIL
```
❌ Recomendación: No enviar a cliente
Motivo: 3+ claims no verificados
Acción: Sub-agente debe reescribir
```

### 5. Logs

Escribe en: `.claude/agents/business-automation/logs/hallucination-check-YYYYMMDD.log`

```
[2026-07-31 12:00:00] 🛡️ Iniciando validación...
[2026-07-31 12:00:05] 📋 Encontrados 3 pending outputs
[2026-07-31 12:00:10] ✅ output_001.md: 96% confianza → PASS
[2026-07-31 12:00:15] ⚠️ output_002.md: 78% confianza → FLAGGED
[2026-07-31 12:00:20] ❌ output_003.md: 65% confianza → FAIL
[2026-07-31 12:00:21] 📊 RESUMEN: 3 checked, 1 PASS, 1 FLAGGED, 1 FAIL
```

## Configuración

- **Threshold**: 85% (configurable en settings.json)
- **Timeout**: 2 minutos por output
- **Fuentes**: LexisNexis, SUIN-Juriscol, Firecrawl KB

## Límite de herramientas

Máximo 20 llamadas a herramientas por validación. Si excede:
- Para y reporta: "Validación incompleta — demasiadas claims"
- Requiere revisión manual

**Chat gana sobre este skill.**
