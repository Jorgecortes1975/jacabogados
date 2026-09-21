# Manual: Cómo Sacar Leads — Elección de Actor, Estimación de Costo

**Propósito:** Guiar al prospector en cómo elegir el actor correcto de Apify, estimar costo antes de gastar dinero, y guardar resultados en CSV.

---

## 🎯 OBJETIVO

Traer 50 empresas nuevas que cumplan el perfil-cliente.md sin gastar más de $30 USD/mes en total (todas las rondas).

---

## 🔧 ACTOR A USAR: data-empresarial

**Por qué:** Es el único actor que trae datos de empresas completos (teléfono, email, sector, empleados) de registros públicos colombianos.

**Fuente:** Cámara de Comercio, Superintendencia, DIAN (datos públicos)

**Costo estimado:** $0-3 USD por búsqueda

---

## 📋 PARÁMETROS ESTÁNDAR

Para cada búsqueda, usar SIEMPRE estos parámetros:

```json
{
  "ubicacion": "[ciudad: Medellín o Bogotá]",
  "empleados_minimo": 50,
  "empleados_maximo": 500,
  "sectores": ["Servicios Profesionales", "Retail", "Manufactura"],
  "keywords": ["nómina", "payroll", "seguridad social", "recursos humanos"],
  "estado_empresa": "activa",
  "maximo_resultados": 10,
  "ordenar_por": "empleados_desc"
}
```

---

## 💰 CÁLCULO DE COSTO ANTES DE CORRER

**Fórmula:**
- Una búsqueda = ~$0.50 USD
- 5 búsquedas x semana = $2.50 USD/semana
- 4 semanas/mes = $10 USD/mes

**Presupuesto disponible:** $30 USD/mes

**Margen:** $20 USD/mes de seguridad

---

## 🛑 PROTOCOLO: VERIFICAR COSTO ANTES DE EJECUTAR

1. Calcular: número de búsquedas × $0.50 = costo estimado
2. Si costo estimado > presupuesto restante del mes, PARAR
3. Reportar al usuario: "Presupuesto alcanzará X búsquedas más este mes"
4. Esperar aprobación antes de ejecutar

---

## 📂 ALMACENAMIENTO: CSV CON ESTAS COLUMNAS

Guardar resultado en: `leads/YYYY-MM-DD-leads.csv`

**Columnas obligatorias:**

```
razonSocial | nit | empleados_reportados | sector | ciudad | telefono | correo | sitio_web | actividad_economica | estado | ubicacion | propietarios | representante_legal | fuente | extraido_en | busqueda_id | parametros_usados
```

**Ejemplo:**
```
Empresa Medellín S.A.S. | 900123456 | 75 | Servicios Profesionales | Medellín | +57 4 3123456 | contacto@empresa.com.co | https://empresa.com.co | 6201 | activa | Medellín, Antioquia | Juan Pérez (51%) | María López, Gerente General | Cámara de Comercio | 2026-09-21T02:30:00Z | search-001 | {"ubicacion":"Medellín","empleados_minimo":50,"empleados_maximo":500}
```

---

## 🚫 EVITAR REPETICIONES: PROTOCOLO NO DUPLICAR

**Antes de guardar el CSV:**

1. Leer `memoria/ya-contactados.csv`
2. Comparar NIT con registros existentes
3. Si NIT está en memoria, DESCARTARLO del CSV nuevo
4. Solo guardar empresas NUEVAS

**Comando para verificar:**
```bash
grep "nit_nuevo" memoria/ya-contactados.csv
# Si existe, no incluir en nuevo CSV
```

---

## ✅ CHECKLIST ANTES DE GUARDAR

- [ ] CSV tiene las 17 columnas
- [ ] Primeros 50 registros (máximo)
- [ ] Ningún NIT repetido en `ya-contactados.csv`
- [ ] Todos los registros con estado "activa"
- [ ] Teléfono y email completos (o "sin dato" si no aplica)
- [ ] Archivo guardado con formato: `YYYY-MM-DD-leads.csv`
- [ ] Archivo en carpeta `leads/` (no sobrescribir anteriores)

---

## 🔄 FLUJO COMPLETO

```
1. Elegir 5 búsquedas (de perfil-cliente.md)
   ↓
2. Calcular costo: 5 búsquedas × $0.50 = $2.50
   ↓
3. Verificar presupuesto restante mes
   ↓
4. Si OK, ejecutar actor data-empresarial con cada búsqueda
   ↓
5. Recolectar resultados (50 empresas aproximadamente)
   ↓
6. Comparar con ya-contactados.csv
   ↓
7. Guardar en leads/YYYY-MM-DD-leads.csv
   ↓
8. Anotar en bitacora.md: fecha, búsquedas, costo, empresas encontradas
```

---

## 📝 NOTAS CRÍTICAS

- **Nunca inventar datos.** Si data-empresarial no trae correo, poner "sin dato".
- **Nunca usar patrones.** No generes correos tipo nombre@empresa.com.
- **Almacenar crudo.** Guardar tal como trae el actor, sin editar.
- **No actualizar ya-contactados aquí.** Eso lo hace verificador después.
