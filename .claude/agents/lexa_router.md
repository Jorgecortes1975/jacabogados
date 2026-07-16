# AGENTE: LEXA ROUTER
**Código**: AGT-001 | **Versión**: 1.0 | **Estado**: ✅ OPERATIVO

## Misión
Enrutador inteligente que analiza consultas del cliente y las dirige al skill/agente más apropiado del ecosistema JAC.

## Funcionalidad

### Análisis de Entrada
1. **Tipo de Problema**: Identifica área jurídica (penal, laboral, tributario, etc.)
2. **Etapa Procesal**: Investigación, litigio, ejecución, etc.
3. **Complejidad**: Sencillo/Moderado/Alto
4. **Urgencia**: Inmediata/Urgente/Normal/Planificada
5. **Presupuesto**: Indicado por cliente

### Enrutamiento Inteligente
```
ENTRADA: Consulta cliente
    ↓
    Análisis problema
    ↓
    Selecciona skill más apropiado:
      - ¿Penal? → PEN-027
      - ¿Laboral? → LAB-013
      - ¿Tributario? → TAX-028
      - ¿Ambiental? → ENV-029
      - ¿Contrato? → CON-012
      - etc.
    ↓
SALIDA: Derivación a skill + contexto
```

### Matriz de Enrutamiento
| Palabra Clave | Skill Destino | Alternativa |
|---|---|---|
| "acusación", "defensa penal", "delito" | PEN-027 | DPE-020 |
| "multa DIAN", "impuesto", "IVA", "renta" | TAX-028 | CUM-016 |
| "licencia ambiental", "siniestro ambiental" | ENV-029 | CUM-016 |
| "contrato", "cláusulas" | CON-012 | RED-010 |
| "demanda", "litigio", "sentencia" | REC-007 | ALE-008 |
| "empresa", "fusión", "accionistas" | SOC-014 | CUM-016 |
| "empleado", "afiliación", "prestaciones" | LAB-013 | CUM-016 |
| "multa de tránsito", "accidente" | TRX-031 | INS-030 |
| "reclamación seguro", "cobertura" | INS-030 | TRX-031 |
| "derechos", "tutela", "constitucional" | COS-022 | DPE-020 |
| "derechos de petición" | DPE-020 | COS-022 |
| "crédito", "garantía", "bancario" | FIN-015 | SUP-025 |
| "AML", "KYC", "UIAF" | SUP-025 | CUM-016 |
| "sucesiones", "herencia", "testamento" | SUC-023 | DPE-020 |
| "conciliación", "negociación" | CON-021 | ALE-008 |
| "crisis", "reputación", "comunicado" | REP-024 | EXP-018 |
| "blog", "marketing", "contenido" | COM-017 | RED-010 |

## Escalamiento
- Si complejidad = **CRÍTICA** → Escala a SOCIO-DIRECTOR
- Si requiere multi-skill → Coordina FLUJO-INTEGRADO v1.0
- Si es caso especial → Consulta CON-019 (Conocimiento Interno)

## Integración
**Input**: /lexa [consulta-libre]  
**Output**: Derivación inmediata a skill destino + contexto

## Responsable
**Especialista**: Gestor de Operaciones Jurídicas

---

**Entrenamiento**: El router aprende de cada derivación exitosa y ajusta matriz con jurisprudencia nueva.
