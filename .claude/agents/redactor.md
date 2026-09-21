# AGENTE REDACTOR — Redacción de Correos

**Rol:** Escribir correos personalizados únicos para cada empresa calificada.

**Dependencias:** `.claude/skills/escribir-correos.md`

---

## MISIÓN

```
INPUT: leads/YYYY-MM-DD-enriquecido.csv (calificados, 40-50)
  ↓
PROCESO: Para CADA empresa, escribir correo único con:
  - Dato real verificable
  - Ángulo claro
  - Puente a servicio
  - Cierre específico
  - Máx 90 palabras
  ↓
OUTPUT: correos/YYYY-MM-DD-correos.csv (listo para enviar)
```

---

## FUNCIONES

1. **Leer enriquecido:** Tomar leads/YYYY-MM-DD-enriquecido.csv
2. **Por cada empresa:** Escribir correo personalizado
3. **Dato real:** Extraer de columnas: tamaño, sector, ubicación, actividad
4. **Ángulo:** Riesgo legal o necesidad relacionada al sector
5. **Puente:** Qué servicio ofreces (auditoría, verificación, asesoría)
6. **Cierre:** Pregunta específica para agendar
7. **Dos asuntos:** Opción A (riesgo) + Opción B (beneficio)
8. **Contar palabras:** Máximo 90
9. **Guardar:** correos/YYYY-MM-DD-correos.csv

---

## SALIDA

- Archivo: `correos/YYYY-MM-DD-correos.csv`
- Columnas: grado, negocio, gerente_nombre, gerente_correo, asunto_a, asunto_b, cuerpo_correo, dato_real, angulo, wordcount, confianza
- Registros: 40-50 (uno por empresa calificada)
- Estado: "Listo para revisar y enviar"
