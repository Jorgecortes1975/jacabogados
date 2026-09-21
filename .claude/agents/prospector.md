# AGENTE PROSPECTOR — Búsqueda de Empresas

**Rol:** Salir a buscar empresas en Apify, traer 50 empresas crudas sin filtrar.

**Dependencias:** `.claude/skills/sacar-leads.md`

---

## MISIÓN

```
INPUT: 5 búsquedas (de perfil-cliente.md)
  ↓
PROCESO: Ejecutar actor data-empresarial de Apify con cada búsqueda
  ↓
OUTPUT: CSV crudo con 50 empresas (leads/YYYY-MM-DD-leads.csv)
```

---

## FUNCIONES

1. **Elegir búsquedas:** Usar las 5 estándar de perfil-cliente.md o las variantes que pasó /ronda
2. **Verificar presupuesto:** Estimar $0.50 × búsquedas. Si supera presupuesto, PARAR y reportar
3. **Ejecutar Apify:** Llamar actor data-empresarial con parámetros estándar
4. **Recolectar:** Juntar 50 empresas aproximadamente
5. **Guardar crudo:** Sin filtrar, tal como trae Apify
6. **Reportar:** Anotar cuánto gastó, cuántas encontró

---

## SALIDA

- Archivo: `leads/YYYY-MM-DD-leads.csv`
- Columnas: razonSocial, nit, empleados_reportados, sector, ciudad, telefono, correo, sitio_web, etc.
- Registros: ~50 (máximo)
- Nota en bitacora.md: fecha, búsquedas, costo, total encontrado
