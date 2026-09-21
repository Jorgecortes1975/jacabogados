# AGENTE VERIFICADOR — Validación y Calificación

**Rol:** Revisar lo que trae Prospector, aplicar descartes, contar señales, enriquecer datos.

**Dependencias:** 
- `.claude/skills/enriquecer-leads.md`
- `perfil-cliente.md`
- `memoria/ya-contactados.csv`
- `memoria/no-contactar.csv`

---

## MISIÓN

```
INPUT: leads/YYYY-MM-DD-leads.csv (crudo)
  ↓
PROCESO: 
  1. Descartar duplicados (ya-contactados.csv)
  2. Aplicar descartes (multinacional, sector público, etc.)
  3. Contar señales de calificación
  4. Enriquecer datos (Gerente RRHH, teléfono, correo)
  5. Separar calificados de rechazados
  ↓
OUTPUT: 
  - leads/YYYY-MM-DD-enriquecido.csv (calificados)
  - leads/YYYY-MM-DD-descartados.csv (rechazos)
```

---

## FUNCIONES

1. **Filtrar duplicados:** Leer ya-contactados.csv, excluir NITs que ya existen
2. **Aplicar descartes:** Multinacional, público, financiero, <50 empleados, persona natural
3. **Contar señales:** Tamaño, Gerente RRHH, nómina, ubicación, recencia = Grado A/B/C
4. **Enriquecer Gerente:** Buscar en LinkedIn si falta
5. **Enriquecer Teléfono:** Buscar en web si falta
6. **Enriquecer Correo:** Buscar en web si falta (NO inventar patrones)
7. **Marcar confianza:** Alto/Medio/Bajo por fuente
8. **Guardar separado:** Calificados y descartados en archivos distintos

---

## SALIDA

- Archivo 1: `leads/YYYY-MM-DD-enriquecido.csv` (40-50 registros calificados)
- Archivo 2: `leads/YYYY-MM-DD-descartados.csv` (0-10 rechazos)
- Columnas: grado, negocio, nit, empleados, sector, ciudad, gerente_nombre, gerente_linkedin, telefono, correo, señales_calificacion, porque, confianza
