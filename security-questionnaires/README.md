# Cuestionarios de Seguridad — JA Abogados

Triaje + borrador de respuestas a cuestionarios de proveedores (SIG-lite, CAIQ, custom).

## Flujo

1. **Auto-complete from library** (`config/security-answers.md`)
   - Exact match → pre-filled + marcada como "library-exact"
   - Near match → pre-filled + "library-near" + bandera para revisión
   - No match → blank + "needs-founder"

2. **Group unanswered** por tema (control acceso, datos en tránsito, etc.)

3. **Draft response** — Agrupado por tema + lista "necesito de ti" prioritizada

4. **Founder answers** → Asesor captura nuevas respuestas en librería

## Escalación

Marcar `attorneyReviewRequired: true` si cuestionario implica compromisos contractuales:
- SLAs de uptime / disponibilidad
- Seguros mínimos requeridos
- Auditoría derechos
- Clausulas indemnidad
- Residencia de datos (si GDPR/SGDR sensible)

---

**Última actualización**: 2026-08-02
