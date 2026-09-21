# Agente de Prospección Autónomo — Memoria Permanente

> **Sistema automatizado de búsqueda, verificación y redacción de correos para clientes legales**

**Versión:** 1.0  
**Fecha:** 2026-09-21  
**Propietario:** Jorge Acortés  
**Estado:** Operativo

---

## 📌 NEGOCIO

**Qué vendemos:** Servicios legales y corporativos generales (seguridad social, tributario, laboral, constitución, contratos)

**A quién:** Empresas medianas (50-500 empleados) en Medellín y Bogotá, sector Servicios Profesionales, Retail y Manufactura

**Quien decide:** Gerente de Recursos Humanos

**Valor por cliente:** $250 USD/mes

**Objetivo mensual:** 10 clientes nuevos = $2,500 USD

---

## 🎯 CLIENTE IDEAL — SEÑALES DE CALIFICACIÓN

Sí es cliente si cumple AL MENOS 3 de estas:

1. **Tamaño:** 50-500 empleados reportados
2. **Rol:** Gerente de RRHH identificable y verificable
3. **Actividad:** Menciona "nómina", "payroll", "seguridad social", "recursos humanos" en descripción o sitio web
4. **Ubicación:** Confirma sede en Medellín o Bogotá
5. **Recencia:** Empresa activa con actividad registral en últimos 12 meses

---

## 🚫 SEÑALES DE DESCARTE — NUNCA CONTACTAR

Descarta sin dudarlo si:

1. **Multinacional extranjera** — tiene compliance global centralizado
2. **Sector público o infraestructura estatal** — regulación especializada, presupuesto diferente
3. **Sector financiero/asegurador** — cumplimiento regulatorio propio (SFC, Superintendencia)
4. **Menos de 50 empleados** — nómina muy pequeña, no es prospect
5. **Persona natural o unipersonal** — no hay rol de decisión corporativo

---

## 💰 PRESUPUESTO Y LÍMITES

| Concepto | Valor |
|----------|-------|
| Presupuesto Apify/mes | $30 USD |
| Leads/ronda | 50 |
| Frecuencia de rondas | Cada semana (4/mes) |
| Total leads/mes | 200 |
| Costo máximo/lead | $0.15 USD |

**REGLA:** Si una ronda se pasa de $30 USD, el agente la pausa y reporta en la bitácora.

---

## ✉️ CORREOS: TONO, ESTRUCTURA Y REGLAS

### Tono General

- Formal, jurídico, profesional
- Lenguaje corporativo sin jerga innecesaria
- Directo: dato real + problema + pregunta de cierre
- Máximo 90 palabras por correo

### Estructura Obligatoria

```
Asunto: Dos versiones (máx 6 palabras cada una)

Saludo formal (nombre + empresa)

Primera línea: UN DATO REAL verificable de la empresa
(No: "creemos que", "probablemente". Sí: "vi que", "encontré que")

Ángulo: Por qué el dato les importa
(Si no hay ángulo claro, marca como "sin ángulo" → revisar después)

Puente: Qué ofreces en relación al dato

Cierre: Pregunta específica para agendar
(No: "¿te interesa?" Sí: "¿Tienes 20 minutos esta semana?")

Firma: Jorge Acortés | Servicios Legales | jorgeacortesc38@gmail.com
```

### Reglas de Oro

- **Nunca inventes un dato.** Si no lo verificas en Apify, LinkedIn, web pública, no lo escribas.
- **Nunca uses patrones de email.** No generes direcciones tipo nombre@empresa.com si no la verificaste.
- **Un correo por empresa.** Cada empresa recibe su versión personalizada, no templates genéricos.
- **Dato real siempre.** Sin dato real, el correo se marca como "pendiente revisión".

---

## 🔐 REGLAS DE SEGURIDAD Y CONTROL

### Lo que el agente PUEDE hacer

✓ Buscar empresas en Apify (actores: data-empresarial, linkedin-company-employees)  
✓ Verificar contra perfil-cliente.md  
✓ Enriquecer datos de teléfono, email, LinkedIn  
✓ Escribir correos personalizados  
✓ Generar reportes de cada ronda  
✓ Guardar en leads/, correos/, reportes/  
✓ Actualizar memoria/ (ya-contactados.csv, no-contactar.csv, bitacora.md)

### Lo que el agente NUNCA debe hacer

✗ Mandar correos por su cuenta. SIEMPRE espera tu OK.  
✗ Contactar a alguien que ya está en ya-contactados.csv  
✗ Contactar a alguien en no-contactar.csv  
✗ Inventar datos, teléfonos, correos o direcciones  
✗ Sobreescribir archivos de leads/, correos/, memoria/  
✗ Gastar más de $30 USD/mes en Apify sin avisar  
✗ Insistir si una búsqueda trae < 50% de calificados

### Protocolo de Pausa

Si ocurre:
- Presupuesto Apify agotado
- Menos del 50% de leads califican
- Rebote de correo > 3%
- Error en verificación

**El agente pausa, anota en bitacora.md y reporta.**

---

## 📂 ESTRUCTURA DE ARCHIVOS

```
jacabogados/
├── CLAUDE-AGENTE.md (este archivo — memoria permanente)
├── perfil-cliente.md (señales detalladas, 5 búsquedas)
├── leads/
│   └── YYYY-MM-DD-leads.csv (resultado crudo de búsqueda)
├── correos/
│   └── YYYY-MM-DD-correos.csv (correos listos para enviar)
├── reportes/
│   └── YYYY-MM-DD-reporte.md (resumen de la ronda)
├── memoria/
│   ├── ya-contactados.csv (empresas que ya tocamos — NUNCA repetir)
│   ├── no-contactar.csv (pidieron parar, respondieron no, etc.)
│   └── bitacora.md (log de cada ronda: fecha, qué buscó, cuánto gastó, qué encontró)
└── .claude/
    ├── skills/
    │   ├── sacar-leads.md (manual: cómo elegir actor, estimar costo)
    │   ├── enriquecer-leads.md (manual: completar datos, verificar calidad)
    │   └── escribir-correos.md (manual: ángulo, estructura, tono)
    └── agents/
        ├── prospector.md (busca en Apify, trae crudo)
        ├── verificador.md (valida contra perfil, descarta, marca dudosos)
        └── redactor.md (escribe correos personalizados)
```

---

## 🎛️ CÓMO ACTIVAR EL AGENTE

### Comando: /ronda

Ejecuta el ciclo completo:

```bash
/ronda
```

Busca 50 empresas → Verifica → Enriquece → Escribe correos → Reporta

### Variantes (cambiar ciudad o sector esa ronda)

```bash
/ronda ciudad:Cali
/ronda sector:Manufactura
/ronda ciudad:Bogotá sector:Servicios
```

### Salida

Genera:
- `leads/YYYY-MM-DD-leads.csv` — empresas encontradas
- `correos/YYYY-MM-DD-correos.csv` — correos listos
- `reportes/YYYY-MM-DD-reporte.md` — resumen de la ronda
- Actualiza `memoria/bitacora.md`

---

## 📋 MÉTRICAS DE ÉXITO

| Métrica | Objetivo |
|---------|----------|
| Empresas encontradas/ronda | 50+ |
| % que califican | >50% |
| Teléfono completado | >70% |
| Email completado | >60% |
| Rebote de email | <3% |
| Tasa de apertura | >25% |
| Tasa de respuesta | >10% |
| Conversión a cita | >5% |

---

## 🔄 PRÓXIMOS PASOS (POST-CONSTRUCCIÓN)

1. Completar `.claude/skills/` con manuales detallados
2. Completar `.claude/agents/` con lógica de búsqueda y verificación
3. Crear `/ronda` command
4. Inicializar `memoria/` con archivos vacíos
5. Ejecutar prueba de 10 leads (sin gastos reales)
6. Ajustar según resultados

---

**Última actualización:** 2026-09-21  
**Próxima revisión:** Después de primera ronda real
