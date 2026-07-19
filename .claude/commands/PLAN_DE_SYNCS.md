# PLAN DE SYNCS — Tu cerebro siempre fresco

**Fecha**: 19 de julio de 2026  
**Versión**: 1.0  
**Responsable**: Jorge Ángel Cortés Cartagena — T.P. 365.594

---

## 🎯 OBJETIVO

Sincronizar tus 6 fuentes hacia Postgres sin overspend. Mezcla: batch para lo lento, webhooks para lo vivo, y nada de CDC innecesario.

---

## 📊 MATRIZ DE SYNCS (Tu arquitectura)

| Fuente | Tabla Destino | Cambios/semana | Cadencia | Herramienta | Costo/mes | Razón |
|--------|---|---|---|---|---|---|
| **Gmail** | messages | ~50-100 | Cada hora (batch) | dlt | $0 | El correo puede esperar 60 min |
| **Slack** | messages | ~500-1000 | Tiempo real (webhook) | n8n | $0-5 | Conversaciones críticas; webhook dispara en cada msg |
| **Calendar** | meetings | ~5-10 | Diario, 8 AM | dlt | $0 | Reuniones no cambian; batch diario es suficiente |
| **HubSpot** | clients + deals | ~20-50 | Tiempo real (CDC) | Airbyte | $5-10 | Cambio de etapa es crítico; CDC mantiene sincro |
| **Legal Data Hunter** | ai_signals | ~2-5 | Diario, 9 AM | dlt | $0 | Reformas/sentencias se publican diarias, no minuto a minuto |
| **GitHub** | recomendaciones (diagnósticos) | ~1-3 | Semanal, lunes 8 AM | dlt | $0 | Diagnósticos son documentos, no stream; semanal sobra |

---

## 💰 COSTO ESTIMADO

```
dlt (batch local)              : $0/mes (self-host, ejecuta en tu máquina)
Airbyte (HubSpot CDC)          : $5-10/mes (si self-host, gratis; si cloud $10)
n8n (Slack webhook)            : $0-5/mes (webhook gratis en n8n.io; self-host si quieres)
Legal Data Hunter (fetch diario): $0/mes (ya tienes acceso)

TOTAL: $5-15/mes ← bajo budget, listo.
```

---

## 🛠️ HERRAMIENTAS: QUÉ ELEGIR PARA CADA FUENTE

### 1. **dlt** — Para Batch Lento (Gmail, Calendar, GitHub, Legal Data Hunter)

**¿Qué es?**  
Librería Python. Escribes un script corto, lo programas con cron/scheduler, y trae datos a Postgres. Cero overhead.

**Instalación:**
```bash
pip install dlt[postgres]
```

**Cómo funciona:**
```python
import dlt
from dlt.sources.rest_api import rest_api_source

# Gmail (cada hora)
@dlt.resource(name="gmail_messages")
def fetch_gmail():
    # Obtener emails nuevos desde last_synced
    # Insertar en messages table
    pass

pipeline = dlt.pipeline("jacabogados", destination="postgres")
pipeline.run(fetch_gmail(), table_name="gmail_raw")
```

**Cadencia:**
- Gmail: `0 * * * *` (cada hora, minuto 0)
- Calendar: `0 8 * * *` (diario a las 8 AM)
- GitHub: `0 8 * * 1` (lunes a las 8 AM)
- Legal Data Hunter: `0 9 * * *` (diario a las 9 AM)

**Ventaja:** Eres tú quien controla. Si algo falla, ves el error en tu cron job.

---

### 2. **Airbyte** — Para CDC en Tiempo Real (HubSpot)

**¿Qué es?**  
Panel visual + conectores. Configuras fuente (HubSpot) y destino (Postgres), y Airbyte sincroniza continuamente.

**Instalación** (self-host):
```bash
# Docker + Docker Compose
git clone https://github.com/airbytehq/airbyte.git
cd airbyte
docker-compose up

# Luego abre http://localhost:8000
```

**Configuración en panel:**
1. Source: HubSpot (connector oficial)
2. Destination: Postgres (connector oficial)
3. Sync mode: "Incremental" (only new/changed records)
4. Schedule: "Every 5 minutes" (CDC near-real-time)

**Costo:**
- Self-host: $0 (solo tu CPU/RAM)
- Cloud managed: ~$10/mes

**Ventaja:** Visual, robusto, + 600 conectores.

---

### 3. **n8n** — Para Webhooks en Tiempo Real (Slack)

**¿Qué es?**  
Workflow por eventos. Slack dispara un evento → n8n lo captura → inserta en Postgres.

**Instalación** (cloud gratis o self-host):
```bash
# Cloud: https://n8n.io (free tier, suficiente)
# Self-host: docker run -d -p 5678:5678 n8nio/n8n
```

**Flujo en n8n:**
```
Slack Webhook (evento nuevo mensaje)
  ↓
Extraer: channel, user, text, timestamp
  ↓
Postgres INSERT en messages table
  ↓
Log de éxito
```

**Costo:**
- Cloud free tier: Suficiente para tu caso (webhooks no tienen cuota)
- Self-host: $0

**Ventaja:** Sub-segundo. Cada mensaje de Slack va a Postgres en < 100ms.

---

## 📋 SETUP PASO A PASO

### Semana 1: dlt + Calendar + Gmail

```
Día 1: Instalar dlt, conectar Postgres, escribir script Gmail
Día 2: Testear script Gmail (fetch últimas 24h)
Día 3: Programar con cron (0 * * * *)
Día 4: Instalar dlt/Calendar, script Calendar
Día 5: Testear Calendar script (fetch eventos próximos 30 días)
Día 6: Programar Calendar con cron (0 8 * * *)
Día 7: Verificar que ambas corren sin error, revisar datos en Postgres
```

### Semana 2: Airbyte + HubSpot

```
Día 1: Instalar Airbyte Docker local
Día 2: Conectar HubSpot API (generar token)
Día 3: Crear connector HubSpot → Postgres en panel
Día 4: Testear primeros datos (contacts, deals)
Día 5: Configurar Incremental + Schedule cada 5 min
Día 6: Verificar sync continuo
Día 7: Documentar errores encontrados
```

### Semana 3: n8n + Slack + GitHub + Legal Data Hunter

```
Día 1: Registrarse en n8n.io (cloud gratis)
Día 2: Crear webhook para Slack events
Día 3: Testear flujo: Slack msg → Postgres
Día 4: Agregar dlt/GitHub (fetch diagnósticos)
Día 5: Agregar dlt/Legal Data Hunter (fetch cambios normativos)
Día 6: Verificar todos los syncs funcionan
Día 7: Turno de revisión semanal (ver siguiente sección)
```

---

## 🔄 LA RUTINA SEMANAL DE RE-SYNC

**Cuándo:** Lunes 10 AM (después que Calendar se sincronizó a las 8 AM)

**Qué haces:**
```
1. REFRESCA todos los syncs según su plan
   dlt Gmail (ya corrió hace < 1 hora)      ✅
   dlt Calendar (ya corrió hace 2 horas)    ✅
   Airbyte HubSpot (corriendo continuo)     ✅
   n8n Slack (tiempo real)                  ✅
   dlt GitHub (corre después del resync)    ▶️
   dlt Legal Data Hunter (corre después)    ▶️

2. VERIFICA FRESCURA
   Por cada tabla, examina synced_at:
   - Gmail: últimas 24h                     ✅
   - Calendar: últimas 48h                  ✅
   - Slack: últimas 1h                      ✅
   - HubSpot: últimos 5 min                 ✅
   - GitHub: últimas 7 días                 ✅
   - Legal Data Hunter: últimas 24h         ✅
   
   Si alguno tiene synced_at > su umbral, anota en ROJO.

3. INTEGRIDAD
   SELECT COUNT(DISTINCT client_id) FROM messages WHERE client_id IS NULL;
   Si hay filas huérfanas, dímelo (puede haber que revisar alias).

4. COSTO
   "Este mes usé: $0 en dlt, $7 en Airbyte, $2 en n8n = $9 total"
   (track manualmente o automatizar con cron log)

5. RESUMEN (5 líneas)
   - Qué se refrescó normalmente
   - Qué quedó viejo y por qué
   - Filas huérfanas o issues de integridad
   - Si algo debería salir del cerebro
   - Siguiente revisión: Lunes próximo
```

---

## 🧪 TEST DE CADA FUENTE (ANTES DE PROGRAMAR)

### Test: Gmail → messages
```sql
-- Después de correr dlt gmail, verifica:
SELECT COUNT(*) as total_emails FROM messages WHERE channel='email';
SELECT MAX(synced_at) as last_sync FROM messages WHERE channel='email';
SELECT DISTINCT direction FROM messages WHERE channel='email';
```

**Esperado:**
- total_emails > 0
- last_sync = hoy
- direction IN ('inbound', 'outbound')

---

### Test: Calendar → meetings
```sql
SELECT COUNT(*) as total_meetings FROM meetings;
SELECT MAX(synced_at) as last_sync FROM meetings;
SELECT COUNT(*) as future FROM meetings WHERE meeting_date > CURRENT_DATE;
```

**Esperado:**
- total_meetings > 0
- last_sync = hoy
- future > 0 (próximas reuniones)

---

### Test: HubSpot → clients
```sql
SELECT COUNT(*) as total_clients FROM clients WHERE source_app='hubspot';
SELECT MAX(synced_at) as last_sync FROM clients WHERE source_app='hubspot';
SELECT DISTINCT deal_status FROM clients WHERE source_app='hubspot';
```

**Esperado:**
- total_clients = número en HubSpot
- last_sync ≤ 5 minutos
- deal_status tiene varios valores (INTAKE, DIAGNÓSTICO, etc.)

---

### Test: Slack → messages
```sql
SELECT COUNT(*) as total_slack FROM messages WHERE channel='slack';
SELECT MAX(synced_at) as last_sync FROM messages WHERE channel='slack';
SELECT COUNT(*) as today FROM messages WHERE channel='slack' AND DATE(sent_at) = CURRENT_DATE;
```

**Esperado:**
- total_slack > 0
- last_sync ≤ 5 minutos
- today > 0 (hay mensajes de hoy)

---

## 🚨 TROUBLESHOOTING

### "dlt no encuentra Postgres"
```bash
# Verifica conexión:
dlt init <project_name>
# Edita .dlt/secrets.toml con tu DATABASE_URL
# Test: python -c "import psycopg2; psycopg2.connect(os.environ['DATABASE_URL'])"
```

### "Airbyte HubSpot sincroniza cada 30 min, no cada 5"
```
Airbyte → Connections → HubSpot → Sync frequency
Cambia a "Every 5 minutes"
```

### "n8n no recibe eventos de Slack"
```
Slack App → Event Subscriptions → Subscribe to bot events
✅ message.channels
✅ message.im
Agrega webhook URL de n8n
```

### "Mensajes de Slack duplicados en la tabla"
```sql
-- Verifica unique constraint:
ALTER TABLE messages ADD UNIQUE(source_app, source_id);
-- Limpia duplicados:
DELETE FROM messages m1 
WHERE EXISTS (SELECT 1 FROM messages m2 
             WHERE m2.source_id = m1.source_id 
             AND m2.id < m1.id);
```

---

## 📊 DASHBOARD SIMPLE (Monitor en 1 min)

```sql
-- Copia esto, córrelo cada lunes:

SELECT 
  'Gmail' as source, 
  COUNT(*) as records,
  MAX(synced_at) as last_sync,
  EXTRACT(HOUR FROM CURRENT_TIMESTAMP - MAX(synced_at)) as hours_old
FROM messages WHERE channel='email'

UNION ALL

SELECT 'Slack', COUNT(*), MAX(synced_at), EXTRACT(HOUR FROM CURRENT_TIMESTAMP - MAX(synced_at))
FROM messages WHERE channel='slack'

UNION ALL

SELECT 'Calendar', COUNT(*), MAX(synced_at), EXTRACT(HOUR FROM CURRENT_TIMESTAMP - MAX(synced_at))
FROM meetings

UNION ALL

SELECT 'HubSpot', COUNT(*), MAX(synced_at), EXTRACT(HOUR FROM CURRENT_TIMESTAMP - MAX(synced_at))
FROM clients WHERE source_app='hubspot'

ORDER BY last_sync DESC;
```

**Salida esperada:**
```
source           | records | last_sync                      | hours_old
─────────────────┼─────────┼────────────────────────────────┼───────────
Slack            | 2341    | 2026-07-21 10:04:30            | 0
HubSpot          | 45      | 2026-07-21 10:02:15            | 0
Gmail            | 156     | 2026-07-21 10:00:00            | 0
Calendar         | 23      | 2026-07-21 08:00:00            | 2
Legal Data Hunt. | 12      | 2026-07-20 09:00:00            | 25  ← VIEJO (aceptable, es semanal)
GitHub           | 8       | 2026-07-14 08:00:00            | 169 ← VIEJO (normal, es semanal)
```

Verde si hours_old ≤ umbral de la fuente. Rojo si mayor.

---

## ✅ CHECKLIST: ANTES DE DECIR "LISTO"

```
[ ] dlt instalado y funcionando
[ ] Gmail sync cada hora, al menos 5 correos en messages
[ ] Calendar sync diario, al menos 3 reuniones en meetings
[ ] Airbyte corriendo y sincronizando HubSpot cada 5 minutos
[ ] n8n recibiendo eventos de Slack (⚡ webhook)
[ ] GitHub y Legal Data Hunter sincronizando diarios
[ ] Rutina semanal documentada y lista para ejecutar
[ ] Dashboard simple de frescura, probado
[ ] Costo total ≤ $15/mes
[ ] Toda tabla CORE tiene updated_at y synced_at
```

---

**Próximo paso**: Documento de SETUP técnico paso a paso para cada herramienta.

