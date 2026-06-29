# JA Abogados - CRM & Marketing Digital

Firma de abogados en Medellín, Colombia. Este repositorio contiene herramientas de desarrollo de negocio y gestión de prospectos.

## Stack
- **Python 3** + `openpyxl` para generación de Excel
- **Excel/Google Sheets** como frontend del CRM
- **Markdown** para documentación estratégica

## Archivos principales
| Archivo | Descripción |
|---|---|
| `generar_crm.py` | Script principal — genera `crm_jaabogados.xlsx` |
| `crm_jaabogados.xlsx` | CRM Excel generado (no editar manualmente) |
| `crm_jaabogados.csv` | Exportación CSV del CRM |
| `plan_marketing_digital_jaabogados.md` | Plan estratégico de marketing digital |

## Cómo ejecutar
```bash
pip3 install openpyxl   # solo la primera vez
python3 generar_crm.py
```

## Estructura del CRM
- **17 prospectos** con datos de empresa, sector y ciudad
- **Sistema de puntuación** de 8 criterios (0-5 c/u, máx 40 pts)
- **Semáforo de prioridad**: verde / amarillo / naranja / rojo
- **Paleta de marca**: azul marino (#1B2A4A) + dorado (#C9A84C)

## Servicios legales (8 pilares)
1. Derecho corporativo y societario
2. Contratos comerciales
3. Derecho laboral
4. Derecho tributario
5. Propiedad intelectual
6. Litigios y arbitraje
7. Derecho inmobiliario
8. Cumplimiento normativo

## Slash commands disponibles
- `/generar-crm` — Regenera el Excel CRM completo
- `/actualizar-prospectos` — Guía para agregar/modificar prospectos

## Convenciones
- Los archivos `.xlsx` y `.csv` son artefactos generados — siempre regenerar desde el script
- Los cambios a prospectos van en `generar_crm.py`, nunca en el Excel directamente
