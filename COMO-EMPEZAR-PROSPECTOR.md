# Cómo Empezar | Prospector Jurídico JAC

## Antes de Todo: Verifica Requisitos

### ✅ Cuenta Apify Activa
1. Entra a [apify.com](https://apify.com)
2. Crea cuenta (5 USD gratis al mes sin tarjeta)
3. Copia tu token de API de Settings → API & Integrations

### ✅ MCP de Apify Conectado
Dentro de Claude Code, verifica que Apify responda:

```bash
/mcp
```

Deberías ver "apify" en la lista de conexiones. Si no está:

```bash
claude mcp add --transport http apify https://mcp.apify.com --header "Authorization: Bearer TU_TOKEN_APIFY"
```

### ✅ Carpeta correcta
Asegúrate de estar en la carpeta raíz del proyecto:

```bash
pwd
# Debe mostrar: /home/user/jacabogados
```

---

## Tu Primera Ronda: Paso a Paso

### Paso 1: Lee Tu Perfil

Abre `perfil-cliente.md` y léelo completo. Ese archivo es tu brújula — todas las decisiones del agente se basan en eso.

**Checklist:**
- ✅ Reconozco mis señales de calificación (4+)
- ✅ Reconozco mis descartables (si ve 1, se elimina)
- ✅ Tengo claro quién es mi decisor
- ✅ La primera búsqueda tiene sentido para mi negocio

### Paso 2: Dispara /ronda

En Claude Code, escribe:

```
/ronda
```

El agente te guiará paso a paso.

**Qué va a pasar:**

1. Te mostrará la búsqueda de hoy
2. Te dirá cuánto va a costar (el cálculo exacto)
3. Te pedirá OK antes de gastar
4. Correrá el actor de Apify
5. Enriquecerá datos (correos, teléfono)
6. Calificará contactos
7. Escribirá correos
8. Generará reporte

**Puntos donde se detiene esperando tu OK:**

- ✋ Antes de correr Apify (costo)
- ✋ Antes de cada lote de enriquecimiento (costo)
- ✋ Después de los 3 primeros correos (tono)

### Paso 3: Revisa y Aprueba Correos

Abre `correos/YYYY-MM-DD.csv` que acaba de generar.

**Para cada correo, pregúntate:**

- ¿El ángulo es creíble? (¿está basado en datos reales del scraper?)
- ¿El tono es tuyo? (¿se parece a cómo te comunicarías tú?)
- ¿La pregunta de cierre es fácil de contestar? (¿es sí/no?)
- ¿Tiene errores de ortografía o redacción? (revisa)

Si todo bien:
- Cambia estado a "aprobado" en la columna `estado`
- Guarda el archivo

Si necesita ajustes:
- Dile al agente qué cambiar
- Él reescribe y regenera

### Paso 4: Manda los Correos (Tú, No El Agente)

**Importante:** El agente escribe, pero TÚ mandas.

**Cómo:**

Opción A: Desde Gmail
```
1. Abre correos/YYYY-MM-DD.csv
2. Copia cada cuerpo
3. Pega en Gmail
4. Ajusta si necesario
5. Manda
```

Opción B: Desde tu cliente de correo
```
1. Configura dominio prospection.jacabogados.com
2. Abre CSV
3. Usa mail merge (Mailchimp, Yet Another Mail Merge, etc.)
4. Manda
```

**Regla de Oro:** Máximo 20 correos/día desde un dominio nuevo. Sube lentamente: 5 el primer día, 10 el segundo, 20 a partir del tercero.

### Paso 5: Monitorea Respuestas

Cuando recibas respuestas:

1. Anota en CSV: cambio estado a "respondio"
2. Agrega nombre de quien respondió a `memoria/ya-contactados.csv`
3. Si dice "no escribas más", agrégalo a `memoria/no-contactar.csv`

El agente usa esta memoria para no repetir.

### Paso 6: Segunda Ronda

Jueves o siguiente lunes, vuelves a `/ronda`.

El agente:
- Usa la siguiente búsqueda de perfil-cliente.md
- No repite a nadie de ya-contactados.csv
- Respeta no-contactar.csv
- Genera nuevos correos

---

## Reglas de Oro Que No Se Rompen

### 1. Nunca Automatices el Envío
El agente escribe, TÚ mandas. Los correos esperan tu OK.

**Por qué:** Un correo malo saliendo de tu dominio quema reputación que necesitas para clientes reales.

### 2. Respeta la Memoria
Si alguien pide "no escribas más", va a no-contactar.csv y NUNCA más le escribes.

**Por qué:** Compliance + reputación. Una demanda por spam cuesta más que todos los clientes de 2026.

### 3. Máximo 20 Correos/Día Desde Dominio Nuevo
Sube gradualmente la velocidad.

**Por qué:** Google Workspace detecta patrones. Mucha velocidad = spam folder.

### 4. Estima Costo Antes de Correr
El agente siempre te dice el número.

**Por qué:** No queremos sorpresas de créditos. Cada corrida debe ser consciente.

### 5. Si <50% Califica, Cambia Búsqueda
Si una ronda trae muchos contactos que no encajan, el agente lo detecta y te lo propone.

**Por qué:** No tiene sentido gastar créditos en basura. Mejor ajustar qué buscamos.

---

## Estructura de Carpetas (Para Tu Referencia)

```
jacabogados/
├─ CLAUDE-agente-prospection.md      ← Memoria permanente del agente
├─ perfil-cliente.md                 ← A quién buscas (CRÍTICO: léelo)
├─ COMO-EMPEZAR-PROSPECTOR.md        ← Este archivo
├─ .claude/
│  ├─ skills/
│  │  ├─ sacar-leads.md              ← Cómo traer contactos con Apify
│  │  ├─ enriquecer-leads.md         ← Cómo completar datos
│  │  └─ escribir-correos.md         ← Cómo escribir correos
│  └─ commands/
│     └─ ronda.md                    ← Comando /ronda (dispara todo)
├─ leads/                             ← CSVs crudos por fecha
├─ correos/                           ← CSVs de correos listos
├─ reportes/                          ← Reportes .md de cada ronda
└─ memoria/
   ├─ ya-contactados.csv             ← A quién ya tocaste (no repetir)
   ├─ no-contactar.csv               ← Quiénes dijeron que no (SAGRADA)
   └─ bitacora.md                    ← Registro de todas las rondas
```

---

## Primeros 7 Días: Calendario Sugerido

### Lunes (Hoy)
- Lectura: CLAUDE-agente-prospection.md + perfil-cliente.md (30 min)
- Primera /ronda manual (observa todo) (1 hora)
- Revisión de 3 correos de ejemplo (15 min)

### Miércoles
- Segunda /ronda (ya va más rápido) (45 min)
- Aprobación de correos
- Envío manual (20 correos máximo hoy)

### Viernes
- Tercera /ronda
- Monitoreo de respuestas (¿alguien contestó?)
- Ajustes si es necesario

### Siguiente Lunes
- Ya es rutina. /ronda cada lunes y jueves
- Revisión de respuestas del fin de semana
- Aprobación + envío

---

## Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| Apify no responde | Verifica token en `/mcp`, reconecta |
| Correos muy vendedor | Pídele al agente "quita 30% del tono vendedor" |
| Ángulo débil en correo | Agente reescribe con otro dato de ese contacto |
| Rebotes de email altos | Enriquecimiento encontró correos dudosos; verifica confianza |
| <50% de contactos califican | Agente propone cambiar búsqueda; áceptalo |
| Gasto se está pasando | Agente se detiene; redimensiona búsquedas |

---

## Próximos Pasos Después del Piloto

Una vez hayas hecho 3-4 rondas y estés cómodo:

1. **Automatización:** Configura /ronda para que corra automático (lunes + jueves 8 AM)
2. **Análisis:** Mira qué búsquedas dan mejores contactos
3. **Refinamiento:** Ajusta perfil-cliente.md con lo aprendido
4. **Expansión:** Agrega nuevas ciudades o sectores

---

## Contacto y Soporte

**Si algo no funciona:**
1. Revisa memoria/bitacora.md (historias previas)
2. Lee de nuevo el skill que se atoró
3. Pídele al agente que te explique paso a paso

**Cambios a reglas:**
- Edita CLAUDE-agente-prospection.md
- Edita perfil-cliente.md
- Agente las lee antes de cada /ronda

---

**Versión:** 1.0  
**Actualizado:** 2026-09-21  
**Sistema:** Prospector Jurídico JAC + Apify MCP
