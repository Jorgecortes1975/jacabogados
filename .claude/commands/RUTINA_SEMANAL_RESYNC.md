# RUTINA SEMANAL DE RE-SYNC — El Corazón del Cerebro

**Cuándo**: Lunes 10:00 AM (después que Calendar se sincronizó a las 8 AM)  
**Duración**: 15 minutos  
**Responsable**: Tú + Claude (vía este script)  
**Guardar esta rutina**: Cada "re-sync semanal" significa estos 5 pasos, en orden.

---

## ¿POR QUÉ?

Un cerebro que se ve fresco pero está viejo es peor que uno que admite su fecha de corte. Esta rutina **verifica que todos tus syncs corren, te dice qué dato es fresco y cuál está ranció, y atestigua integridad**. Sin ella, terminarás confiando en datos que hace 3 días que no se actualizan — y no te darás cuenta hasta que falles una acción importante.

---

## 5 PASOS DE LA RUTINA (COPY-PASTE READY)

### PASO 1️⃣: REFRESCA LOS SYNCS SEGÚN SU PLAN

**Qué hace:**  
Dispara manualmente cada sync según su cadencia. dlt batch corre; Airbyte ya está continuo; n8n ya recibió eventos todo el fin de semana.

**Comando:**
```bash
# dlt Gmail (cada hora, pero forzamos ahora)
python sync_jobs/gmail_sync.py

# dlt Calendar (diario, pero forzamos si hace falta)
python sync_jobs/calendar_sync.py

# dlt GitHub (semanal, AHORA es el momento)
python sync_jobs/github_sync.py

# dlt Legal Data Hunter (diario, forzamos)
python sync_jobs/legal_data_hunter_sync.py

# Airbyte HubSpot: ya corre continuo (no toques)
# n8n Slack: ya recibió eventos todo el fin de semana (no toques)

echo "✅ Syncs disparados. Esperando 2 minutos..."
sleep 120
```

**¿Qué esperar?**
```
✅ gmail_sync.py: "Sincronizados 3 correos nuevos"
✅ calendar_sync.py: "0 cambios (ya estaban sincronizados)"
✅ github_sync.py: "Sincronizados 1 diagnóstico nuevo (2026-07-21)"
✅ legal_data_hunter_sync.py: "0 cambios (no hay reformas nuevas)"
```

Si alguno falla, anota el error. Vea [TROUBLESHOOTING](#troubleshooting).

---

### PASO 2️⃣: VERIFICA FRESCURA POR CADA TABLA

**Qué hace:**  
Te digo cuál es el dato más viejo y el más nuevo en cada tabla. Si synced_at está fuera de rango, lo marcas en ROJO.

**Consulta SQL:**
```sql
-- Copia y pega en psql o DBeaver:

WITH frescura AS (
  SELECT 
    'Gmail' as source,
    (SELECT COUNT(*) FROM messages WHERE channel='email') as records,
    (SELECT MAX(synced_at) FROM messages WHERE channel='email') as last_sync,
    (SELECT MIN(synced_at) FROM messages WHERE channel='email') as oldest_sync,
    EXTRACT(HOUR FROM CURRENT_TIMESTAMP - (SELECT MAX(synced_at) FROM messages WHERE channel='email')) as hours_old,
    1 as priority
  
  UNION ALL
  
  SELECT 'Slack', COUNT(*), MAX(synced_at), MIN(synced_at), EXTRACT(HOUR FROM CURRENT_TIMESTAMP - MAX(synced_at)), 1
  FROM messages WHERE channel='slack'
  
  UNION ALL
  
  SELECT 'Calendar', COUNT(*), MAX(synced_at), MIN(synced_at), EXTRACT(HOUR FROM CURRENT_TIMESTAMP - MAX(synced_at)), 2
  FROM meetings
  
  UNION ALL
  
  SELECT 'HubSpot', COUNT(*), MAX(synced_at), MIN(synced_at), EXTRACT(HOUR FROM CURRENT_TIMESTAMP - MAX(synced_at)), 1
  FROM clients WHERE source_app='hubspot'
  
  UNION ALL
  
  SELECT 'GitHub', COUNT(*), MAX(synced_at), MIN(synced_at), EXTRACT(DAY FROM CURRENT_TIMESTAMP - MAX(synced_at)) * 24, 7
  FROM recomendaciones WHERE source_app='github'
  
  UNION ALL
  
  SELECT 'Legal Data Hunter', COUNT(*), MAX(synced_at), MIN(synced_at), EXTRACT(HOUR FROM CURRENT_TIMESTAMP - MAX(synced_at)), 2
  FROM ai_signals WHERE created_by='legal_data_hunter'
)
SELECT 
  source,
  records,
  TO_CHAR(last_sync, 'YYYY-MM-DD HH24:MI') as last_sync,
  TO_CHAR(oldest_sync, 'YYYY-MM-DD HH24:MI') as oldest_sync,
  hours_old::INT as hours_old,
  CASE 
    WHEN source='Slack' AND hours_old > 1 THEN '🔴 VIEJO (>1h)'
    WHEN source='Gmail' AND hours_old > 60 THEN '🔴 VIEJO (>60min)'
    WHEN source='HubSpot' AND hours_old > 0.1 THEN '🔴 VIEJO (>6min)'
    WHEN source='Calendar' AND hours_old > 48 THEN '🔴 VIEJO (>48h)'
    WHEN source='GitHub' AND hours_old > 168 THEN '🔴 VIEJO (>7 días)'
    WHEN source='Legal Data Hunter' AND hours_old > 48 THEN '🔴 VIEJO (>48h)'
    ELSE '✅ FRESCO'
  END as status
FROM frescura
ORDER BY priority DESC;
```

**¿Qué esperar?**
```
source                | records | last_sync            | oldest_sync          | hours_old | status
──────────────────────┼─────────┼──────────────────────┼──────────────────────┼───────────┼──────────────
Slack                 | 2341    | 2026-07-21 10:04:30  | 2026-07-01 08:15:22  | 0         | ✅ FRESCO
HubSpot               | 45      | 2026-07-21 10:02:15  | 2026-03-15 14:22:10  | 0         | ✅ FRESCO
Gmail                 | 156     | 2026-07-21 10:00:00  | 2026-07-01 06:30:00  | 0         | ✅ FRESCO
Calendar              | 23      | 2026-07-21 08:00:00  | 2026-06-01 10:00:00  | 2         | ✅ FRESCO (daily OK)
GitHub                | 8       | 2026-07-21 08:00:00  | 2026-06-15 09:00:00  | 169       | ✅ FRESCO (weekly OK)
Legal Data Hunter     | 12      | 2026-07-21 09:00:00  | 2026-07-01 10:00:00  | 25        | ✅ FRESCO (daily OK)
```

Si ves 🔴, anota la fuente y busca en [TROUBLESHOOTING](#troubleshooting).

---

### PASO 3️⃣: INTEGRIDAD — BUSCA FILAS HUÉRFANAS

**Qué hace:**  
Verifica que cada mensaje, reunión, etc., esté vinculado a un cliente válido. Si hay orfandad, significa que el sync de HubSpot o client_alias falló.

**Consulta SQL:**
```sql
-- Huérfanas en messages
SELECT COUNT(*) as orphaned_messages
FROM messages 
WHERE client_id NOT IN (SELECT id FROM clients);

-- Huérfanas en meetings
SELECT COUNT(*) as orphaned_meetings
FROM meetings
WHERE client_id NOT IN (SELECT id FROM clients);

-- Clientes duplicados por email (solo debería haber 1 por email)
SELECT email, COUNT(*) as count
FROM clients
WHERE email IS NOT NULL
GROUP BY email
HAVING COUNT(*) > 1;

-- Clientes sin email que podrían aliasarse
SELECT COUNT(*) as clients_sin_email
FROM clients
WHERE email IS NULL AND company IS NOT NULL;
```

**¿Qué esperar?**
```
orphaned_messages: 0
orphaned_meetings: 0
(no hay duplicados por email)
clients_sin_email: 0 o 1-2 (normal si hay genéricos como "info@empresa.com")
```

**Si encuentras orfandad:**
- emails huérfanas → El sync de Gmail trayó email de alguien no en HubSpot. Crea alias o nuevo cliente.
- clientes duplicados → El sync pasó clientes duplicados o alias falló. Merge manual o fix en client_alias.

---

### PASO 4️⃣: COSTO — CUÁNTO LLEVAMOS GASTADO

**Qué hace:**  
Suma tu gasto mensual en syncs y te dice qué fuente se está comiendo el presupuesto.

**Log manual** (o automatizar):
```
Mes: Julio 2026
─────────────────────────────────────────
dlt (Gmail, Calendar, GitHub, LDH):   $0
Airbyte (HubSpot self-host):          $0 (o ~$10 si cloud)
n8n (Slack webhook, free tier):       $0
─────────────────────────────────────────
TOTAL JULIO:                          $0

Proyección anual:                      $0-120
Status:                               ✅ DENTRO DE PRESUPUESTO ($20/mes target)
```

**Si excedes $20/mes:**
- ¿Airbyte cloud está sincronizando cada 5 min? → Cambiar a 15 min
- ¿n8n está logging todo? → Desactivar logs verbosos
- ¿Hay una tabla de alta rotación? → Pasar a conector vivo, no sync

---

### PASO 5️⃣: RESUMEN (5 LÍNEAS)

Escribe esto en un archivo de log (`logs/re-sync-semanal.log`):

```
─ RE-SYNC SEMANAL ─ 2026-07-21, Lunes 10:00 AM ─

✅ REFRESCADO:
   Gmail: 3 correos nuevos
   Calendar: 0 cambios (ya estaban)
   GitHub: 1 diagnóstico nuevo
   HubSpot: 2 deals cambio de etapa
   Slack: 47 mensajes del fin de semana

⏳ VIEJO (esperado):
   Nada. Todas las fuentes dentro de su umbral.

🔴 ISSUES:
   Ninguno.

📊 COSTO ACUMULADO:
   Julio 2026: $0 (on track)

🔮 SIGUIENTE RE-SYNC:
   Lunes 28 de julio, 10:00 AM

────────────────────────────────────────
```

---

## 🧪 CHECKLIST DE ANTES DE MARCAR "COMPLETO"

```
[ ] Dispara todos los syncs sin error
[ ] Consulta de frescura devuelve ✅ en todas las filas
[ ] 0 filas huérfanas en messages y meetings
[ ] 0 clientes duplicados por email
[ ] Costo total del mes ≤ $20
[ ] Escribi resumen de 5 líneas en log
[ ] Próximo re-sync programado en calendario (lunes próximo 10 AM)
```

---

## 🚨 TROUBLESHOOTING: QUÉS FALLA Y CÓMO ARREGLARLO

### ❌ "dlt gmail_sync.py: módulo no encontrado"
```bash
# Solución:
cd ~/jacabogados/sync_jobs
python -m venv venv
source venv/bin/activate
pip install dlt[postgres] google-auth-oauthlib google-auth-httplib2 google-api-python-client
```

### ❌ "Airbyte: HubSpot sync falló con '401 Unauthorized'"
```
1. Ve a HubSpot → Settings → Integrations → API Keys
2. Genera un nuevo token (el anterior expiró)
3. Airbyte → Connections → HubSpot → Edit
4. Paste nuevo token y re-test
5. Corre sync manual
```

### ❌ "n8n: Slack webhook no recibe eventos"
```
1. Slack App → Settings → Event Subscriptions
2. Verifica URL del webhook: debe ser pública (n8n.io/webhook/...)
3. Slack → Subscribe to bot events → agrega:
   ✅ message.channels
   ✅ message.im
   ✅ message.groups
4. Prueba: envía mensaje en Slack, verifica n8n lo recibe
```

### ❌ "Mensajes de Slack duplicados en la tabla"
```sql
-- Limpiar duplicados:
DELETE FROM messages m1
WHERE source_app='slack' AND source_id IN (
  SELECT source_id FROM messages m2
  WHERE m2.channel='slack' 
  GROUP BY source_id 
  HAVING COUNT(*) > 1
) AND m1.id NOT IN (
  SELECT MAX(id) FROM messages m3
  WHERE m3.channel='slack'
  GROUP BY source_id
);
```

### ❌ "GitHub sync: no encuentra los diagnósticos"
```bash
# Verifica que los archivos 02-DIAGNOSTICO.md existen:
find /home/user/jacabogados -name "02-DIAGNOSTICO.md" -type f

# Si faltan, corre manualmente:
python sync_jobs/github_sync.py --verbose --dry-run
```

### ❌ "Legal Data Hunter: ningún cambio normativo nuevo"
```
1. Verifica que Legal Data Hunter API está disponible
2. Corre query: SELECT * FROM legal_data_hunter_raw ORDER BY created_at DESC LIMIT 1;
3. Si último es > 24h, algo está mal:
   - API key expiró → Regenera en Legal Data Hunter
   - Query de búsqueda vacía → Agregar keywords más amplios
```

---

## 📞 CUÁNDO ESCALAR

Si después de troubleshooting algo sigue fallando:
1. Toma screenshot del error
2. Anota qué sinc es, cuándo falló, qué dice el error
3. Pásalo a Claude con contexto: "re-sync semanal falla en [fuente], error: [...]"
4. NO lo ignores "para la próxima semana" — un sync roto significa datos viejos

---

## 🔄 PATRÓN SEMANAL (COPY THIS)

Copia esto a tu calendario recurrente:

```
EVENTO: RE-SYNC SEMANAL — CEREBRO JACABOGADOS
CUÁNDO: Lunes, 10:00 AM
RECURRENCIA: Cada semana
DURACIÓN: 15 minutos
CHECKLIST:
  1. Dispara syncs (5 min)
  2. Consulta frescura (3 min)
  3. Verifica integridad (3 min)
  4. Anota costo (2 min)
  5. Escribe resumen (2 min)
DESPUÉS: Pasa al agente el resumen para que lo documente
```

---

**Guardar esta rutina. Cada re-sync semanal significa ESTO, exactamente en este orden.**

