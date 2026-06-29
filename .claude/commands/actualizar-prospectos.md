Actualiza o agrega prospectos al CRM de JA Abogados.

## Pasos
1. Abre `generar_crm.py` y localiza la lista `prospectos` (approx línea 50-200)
2. Agrega un nuevo prospecto siguiendo la estructura existente:
   - `nombre`, `empresa`, `sector`, `ciudad`
   - `servicios_interes` (lista de servicios legales)
   - Puntajes de evaluación (0-5 cada uno, máx 40 total)
   - `estado_semaforo`: verde/amarillo/naranja/rojo
3. Ejecuta `/generar-crm` para regenerar el Excel

## Escala de puntajes
- 0-10: Rojo (baja prioridad)
- 11-20: Naranja (potencial medio)
- 21-30: Amarillo (buena oportunidad)
- 31-40: Verde (alta prioridad)
