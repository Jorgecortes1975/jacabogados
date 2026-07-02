# JA Abogados - CRM & Marketing Digital

Firma de abogados en Medellín, Colombia. Este repositorio contiene herramientas de desarrollo de negocio y gestión de prospectos.

## Contacto directo
- **WhatsApp: +57 321 704 7556** (`wa.me/573217047556`) — medio de comunicación directo del titular. Usar siempre como CTA en contenido promocional (infografías, carruseles, plan de marketing), nunca como placeholder genérico.

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
- `/infografia-linkedin [tema]` — Genera una infografía how-to (3 pasos) en HTML autocontenido + captura PNG 1080×1350, con la paleta de marca bloqueada. Reemplaza al plugin `frontend-design@claude-code-plugins` (no instalable en entornos remotos sin acceso a github.com fuera de este repo). Ver `infografias-linkedin/`.

## Identidad visual — Infografías LinkedIn/Instagram (v2)
- Fondo casi negro `#14141F`, texto blanco `#FFFFFF` / secundario `#B9BAC4`, un acento saturado por pieza (uno distinto por pilar — ver tabla en `.claude/commands/infografia-linkedin.md`)
- Tipografía sans del sistema, sin fuentes web externas (HTML 100% autocontenido)
- Sin degradados, sombras duras ni emojis en el cuerpo; iconos solo de línea fina
- Elementos de marca fijos: barra superior de 6px en el color de acento, monograma "JA" en círculo, ícono de línea fina por paso (documento → escudo → calendario), pie con ícono de WhatsApp
- Formato 1080×1350px (4:5), capturado con Playwright + Chromium (`/opt/pw-browsers/chromium`, requiere `NODE_PATH=$(npm root -g)` para resolver el paquete `playwright` global)

## Serie de infografías — cobertura de los 8 pilares
Los 8 pilares de servicio ya tienen su infografía en `infografias-linkedin/`: Derecho Corporativo (`blindaje-legal-pyme`), Derecho Laboral (`riesgo-laboral-pyme`), Contratos Comerciales (`contratos-comerciales-pyme`), Tributario (`riesgo-tributario-pyme`), Propiedad Intelectual (`propiedad-intelectual-pyme`), Litigios y Arbitraje (`litigio-primeras-48-horas`), Derecho Inmobiliario (`riesgo-inmobiliario-pyme`) y Cumplimiento Normativo (`cumplimiento-normativo-pyme`). Cada `.html` tiene su `.png` (1080×1350) y su `.md` con el caption listo para publicar.

## Contenido y publicación
- `ganchos-promocionales-jaabogados.md` — banco de ganchos (hooks) por pilar, listo para alimentar infografías, posts y reels
- `estrategia-publicacion-viral.md` — horarios, formato por red, estructura de caption, calendario semanal y KPIs de alcance para la serie de infografías
- `calendario-publicacion-sigss-2026.md` — calendario ejecutable de 30 días para la campaña SIGSS (diagnóstico empresarial de seguridad social: UGPP, PILA, contrato realidad, pensiones, PCL, incapacidades), con fecha/hora por publicación y protocolo de respuesta por palabra clave

## Convenciones
- Los archivos `.xlsx` y `.csv` son artefactos generados — siempre regenerar desde el script
- Los cambios a prospectos van en `generar_crm.py`, nunca en el Excel directamente
