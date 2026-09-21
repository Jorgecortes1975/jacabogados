# COMANDO /ronda — El Botón que Enciende el Agente

**Propósito:** Ejecutar el ciclo completo de prospección en una sola línea.

---

## SINTAXIS

```bash
/ronda [opciones]
```

---

## OPCIONES

### Sin opciones (estándar)
```bash
/ronda
```

Ejecuta con ciudades estándar (Medellín, Bogotá) y sectores estándar (Servicios, Retail, Manufactura).

### Cambiar ciudad
```bash
/ronda ciudad:Medellín
/ronda ciudad:Bogotá
```

### Cambiar sector
```bash
/ronda sector:Servicios
/ronda sector:Retail
/ronda sector:Manufactura
```

### Combinar opciones
```bash
/ronda ciudad:Medellín sector:Retail
/ronda ciudad:Bogotá sector:Servicios
```

---

## QUÉ HACE /ronda

### PASO 1: PROSPECTOR (Búsqueda)

1. Ejecutar 5 búsquedas en actor data-empresarial
2. Recolectar ~50 empresas
3. **Output:** `leads/YYYY-MM-DD-leads.csv` (crudo)

**Checkpoint:** ¿Costo < presupuesto restante? Si no, PARAR

---

### PASO 2: VERIFICADOR (Enriquecimiento + Calificación)

1. Filtrar duplicados (ya-contactados.csv)
2. Aplicar descartes (perfil-cliente.md)
3. Contar señales y enriquecer datos
4. **Output:** 
   - `leads/YYYY-MM-DD-enriquecido.csv`
   - `leads/YYYY-MM-DD-descartados.csv`

**Checkpoint:** ¿% de calificados ≥ 50%? Si no, avisar

---

### PASO 3: REDACTOR (Escritura)

1. Escribir correo único por empresa
2. Verificar dato real, ángulo, puente, cierre
3. **Output:** `correos/YYYY-MM-DD-correos.csv`

---

### PASO 4: REPORTE

1. Generar `reportes/YYYY-MM-DD-reporte.md`
2. Actualizar `memoria/bitacora.md`
3. **Estado:** Listo para tu revisión

---

## SEGURIDAD: LO QUE /ronda NO HACE

✗ Mandar correos por su cuenta  
✗ Gastar más de presupuesto mensual  
✗ Contactar a alguien en no-contactar.csv  
✗ Inventar datos

---

## EJEMPLOS

```bash
/ronda                           # Estándar
/ronda ciudad:Medellín           # Solo Medellín
/ronda sector:Retail             # Solo Retail
/ronda ciudad:Medellín sector:Retail  # Medellín + Retail
```

---

## TIEMPO ESTIMADO

Total: 7-10 minutos (Prospector 2-3min + Verificador 3-4min + Redactor 2-3min)

