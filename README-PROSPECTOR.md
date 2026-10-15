# Prospector Jurídico JAC | Sistema de Prospección Automatizado

**Estado:** ✅ Estructura base completada  
**Versión:** 1.0  
**Última actualización:** 2026-09-21

---

## Qué es Este Sistema

Sistema autónomo de prospección de clientes para JAC (Abogados Asociados) que:

1. **Busca** contactos en Google Maps, LinkedIn e Instagram usando Apify
2. **Enriquece** datos (correo, teléfono, redes) automáticamente
3. **Califica** por probabilidad (grado A, B, C)
4. **Escribe** correos personalizados con datos reales de cada contacto
5. **Mantiene memoria** para no repetir contactos
6. **Genera reportes** de cada ronda

Todo local, sin plataforma externa. Tú controlas, tú mandas.

---

## Estructura de Carpetas

```
jacabogados/
│
├── CLAUDE-agente-prospection.md       Memoria permanente del agente
├── perfil-cliente.md                  Definición exacta del cliente ideal
├── COMO-EMPEZAR-PROSPECTOR.md         Guía paso a paso (EMPIEZA AQUÍ)
├── README-PROSPECTOR.md               Este archivo
│
├── .claude/
│   ├── skills/
│   │   ├── sacar-leads.md             Cómo elegir actor y traer contactos
│   │   ├── enriquecer-leads.md        Cómo completar correos y teléfono
│   │   └── escribir-correos.md        Cómo escribir correos sin inventar
│   │
│   └── commands/
│       └── ronda.md                   El comando /ronda (ciclo completo)
│
├── leads/                             CSVs crudos de cada ronda (YYYY-MM-DD.csv)
├── correos/                           Correos listos para mandar (YYYY-MM-DD.csv)
├── reportes/                          Reportes de análisis (ronda-YYYY-MM-DD.md)
│
└── memoria/
    ├── ya-contactados.csv             A quién ya tocaste (no repetir)
    ├── no-contactar.csv               Quiénes dijeron que NO (SAGRADA)
    └── bitacora.md                    Registro de todas las rondas
```

---

## Cómo Funciona en 3 Pasos

### 1️⃣ Dispara la Ronda
```bash
/ronda
```
El agente te guía todo el camino.

### 2️⃣ Aprueba Correos
Revisas los 3 primeros ejemplos.
El agente regenera los demás con el tono que le indiques.

### 3️⃣ Manda (Tú, No El Agente)
Los correos están listos en `correos/YYYY-MM-DD.csv`.
Tú los copias a Gmail o a tu cliente de correo y mandas.

---

## Antes de Empezar

### ✅ Requisitos

1. **Apify conectado en Claude Code**
   ```bash
   /mcp
   ```
   Deberías ver "apify" en verde.

2. **5 búsquedas concretas** en `perfil-cliente.md`
   (Están listas, solo verifica que apliquen a tu negocio)

3. **Dominio de envío configurado**
   - prospection.jacabogados.com (SPF, DKIM configurados)
   - Correo: contacto@prospection.jacabogados.com

4. **Presupuesto Apify**
   - Créditos gratis: $5 USD/mes (alcanza para 50-100 contactos)
   - O agrega tarjeta para más volumen

---

## Primera Ronda: Qué Esperar

**Tiempo:** ~1 hora (interactiva, observando todo)

1. Eliges ciudad/búsqueda (o agente sugiere la siguiente)
2. Agente te muestra actor exacto y costo
3. ✋ Espera tu OK
4. Trae 25-30 contactos crudos
5. Enriquece datos (busca correos en sitios web)
6. Califica cada contacto (A, B, C)
7. Escribe 3 ejemplos de correos
8. ✋ Espera aprobación de tono
9. Genera el resto (20+ correos)
10. Reporte final con números

---

## Reglas Inquebrantables

✋ **Nunca manda correos solo.** Tú mandas siempre.

💰 **Estima costo antes.** Te muestra el número exacto.

📝 **Nunca inventa datos.** "sin dato" es válido, creación de datos no.

🔐 **Memoria sagrada.** no-contactar.csv NUNCA se limpia.

📊 **50% mínimo.** Si <50% de contactos califican, propone cambiar búsqueda.

⏸️ **Respeta PAUSA.** Si creas archivo PAUSA, agente se detiene.

---

## Flujo Típico Semanal

| Día | Acción | Tiempo |
|-----|--------|--------|
| **Lunes 8 AM** | /ronda automático (si está programado) | — |
| **Lunes 9 AM** | Revisas reporte y correos | 15 min |
| **Lunes 10 AM** | Apruebas y mandas 10-15 correos | 10 min |
| **Martes-Miércoles** | Monitoreas respuestas | 5 min/día |
| **Jueves 8 AM** | Segunda /ronda de la semana | — |
| **Viernes** | Revisas respuestas, aprendes qué funcionó | 20 min |

**Total:** ~1 hora/semana después de la curva de aprendizaje inicial.

---

## Indicadores de Éxito

### Mes 1
- ✅ 100+ contactos traídos
- ✅ 60+ con correo
- ✅ 40+ correos enviados
- ✅ 2-3 respuestas (5-7% es excelente en frío)

### Mes 2
- ✅ 200+ contactos traídos
- ✅ Identificaste qué búsquedas dan mejores contactos
- ✅ 80+ correos enviados
- ✅ 5-6 respuestas (mejora con refino)

### Mes 3+
- ✅ Sistema rutinario (lunes + jueves automático)
- ✅ 300+ contactos/mes
- ✅ 120+ correos/mes
- ✅ 10+ respuestas
- ✅ 2-3 clientes cerrados

---

## Costos Reales (Mes 1)

| Concepto | Costo | Nota |
|----------|-------|------|
| Apify créditos/mes | $5-30 USD | Gratis primeros 5, luego pagas por resultado |
| Dominio de prospección | $0 | Subdominio de tu dominio actual |
| Tiempo tu: 1 hora/semana | — | Después de setup inicial (2 horas) |
| **Total** | **$5-30 USD** | Costo variable por volumen |

**ROI:** 1 cliente cerrado = $800-3000/mes de retención → payback instantáneo

---

## Preguntas Frecuentes

### ¿El agente puede mandar correos solo?
No. Escribe, tú mandas. Así proteges tu dominio de rebotes y spam.

### ¿Qué pasa si se me olvida un contacto?
Está en `memoria/ya-contactados.csv`. El agente no repite.

### ¿Puedo cambiar a quién buscamos?
Sí. Edita `perfil-cliente.md` y agente lo usa en la siguiente ronda.

### ¿Cuánto cuesta un contacto?
~$0.05-0.10 USD por contacto scrapeado + verificado.
Con respuesta: ~$0.50-1.00 USD por contacto que contesta.

### ¿Se puede programar automático?
Sí, en siguiente versión. Por ahora es /ronda manual.

### ¿Qué si alguien pide "no escribas más"?
Va a `memoria/no-contactar.csv`. Nunca más le escribes. Cumplimiento + reputación.

---

## Siguientes Pasos

1. **Hoy:** Lee `COMO-EMPEZAR-PROSPECTOR.md`
2. **Hoy:** Lee `perfil-cliente.md` completo
3. **Mañana:** Primera `/ronda` observando todo
4. **Esta semana:** 2-3 rondas manuales para ajustar
5. **Próxima semana:** Programar automático si quieres
6. **Mes 2:** Análisis de qué funciona y refino

---

## Soporte y Actualizaciones

**¿No funciona algo?**
1. Revisa `memoria/bitacora.md` (qué pasó antes)
2. Lee el skill correspondiente (sacar-leads, enriquecer, escribir-correos)
3. Pídele al agente que reexplique paso a paso

**¿Quieres cambiar una regla?**
- Edita `CLAUDE-agente-prospection.md` (memoria)
- Edita `perfil-cliente.md` (búsquedas)
- Agente lee ambas antes de cada /ronda

**¿Quieres agregar algo?**
- Nuevo skill → carpeta `.claude/skills/`
- Nuevo comando → carpeta `.claude/commands/`
- Agente lo detecta automáticamente

---

## Licencia y Compliance

✅ **Datos públicos:** Todos son datos públicos de Google Maps, LinkedIn, Instagram  
✅ **Compliance:** LPDP Colombia (Ley 1581/2012)  
✅ **Baja:** Respetamos "no escribas más" de inmediato  
✅ **Seguridad:** Todo local, sin servidor externo  

---

## Información Técnica

**Tecnología:**
- Claude Code + Claude API
- Apify MCP (Model Context Protocol)
- CSVs locales (memoria)
- Markdown (reportes)

**Actores Apify Usados:**
- lukaskrivka/google-maps-with-contact-details
- harvestapi/linkedin-company-employees
- compass/crawler-google-places
- apify/instagram-profile-scraper

**Requerimientos:**
- Claude Code en computadora o web
- Cuenta Apify (gratis con $5/mes)
- Dominio verificado para envio de correos

---

## Créditos y Origen

**Basado en:** [Guía Apify de tododeia](https://tododeia.com)  
**Adaptado para:** JAC - Abogados Asociados  
**Especialización:** Servicios jurídicos en Colombia  
**Contacto:** contacto@jacabogados.com

---

**🚀 ¡Listo para prosperar!**

Empieza leyendo `COMO-EMPEZAR-PROSPECTOR.md`

