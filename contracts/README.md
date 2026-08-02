# Seguimiento de Contratos — JA Abogados

Archivo centralizado de contratos ejecutados, en borrador, y pendientes de firma.

## Estructura

```
contracts/
  ├── executed/               # PDFs de contratos firmados (ejecutados)
  │   ├── {counterparty}-{YYYY-MM-DD}.pdf
  │   └── ...
  ├── drafts/                 # Borradores en Google Drive (referencias)
  ├── signed-copies/          # Copias firmadas digitalmente
  └── README.md
```

## Tracking Centralizado

Toda la información de contratos (contraparty, fecha firma, plazo, renovación automática) se mantiene en `counterparty-tracker.json` en la raíz del proyecto. El asesor jurídico actualiza automáticamente:

- **Fecha ejecución**
- **Plazo** (si aplica)
- **Renovación automática** (sí/no + período de preaviso)
- **Derecho aplicable** (ley colombiana vs internacional)
- **Obligaciones clave** (breve resumen)
- **Ruta de copia firmada**

## Cálculo de Deadlines

El asesor calcula automáticamente:
- **Fecha crítica** = Fecha renovación - Periodo de preaviso
- Ejemplo: Contrato se renueva automáticamente 31 dic 2026, período preaviso 60 días → alerta 1 nov 2026

Ver `deadline-calendar.json` para próximas fechas límite.

---

**Última actualización**: 2026-08-02
