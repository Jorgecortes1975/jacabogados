-- ============================================================================
-- SCHEMA POSTGRES COMPLETO — JA Abogados Cerebro
-- Fecha: 19 de julio de 2026
-- Estado: Listo para ejecutar en Neon / Supabase / Railway
-- ============================================================================

-- ============================================================================
-- PARTE 1: CORE (SILVER) — Las 4 tablas centrales
-- ============================================================================

-- TABLE: clients
-- PROPÓSITO: Centro del cerebro. Un cliente = persona o empresa con contacto.
CREATE TABLE IF NOT EXISTS clients (
  id BIGSERIAL PRIMARY KEY,

  -- Identidad del cliente
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  company VARCHAR(255),
  phone VARCHAR(20),

  -- Contexto de negocio
  deal_status VARCHAR(50), -- "INTAKE", "DIAGNÓSTICO", "IMPLEMENTACIÓN", "SEGUIMIENTO", "COMPLETADO"
  last_contact DATE,

  -- Trazabilidad de rastreo (OBLIGATORIO en todas las tablas core)
  source_app VARCHAR(50) NOT NULL, -- "hubspot", "gmail", "slack", "calendar"
  source_id VARCHAR(255) NOT NULL, -- ID en la fuente original
  updated_at TIMESTAMP, -- Cuándo cambió en la fuente
  synced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Cuándo lo copiamos aquí

  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  -- Restricción: no duplicar al re-sincronizar
  UNIQUE(source_app, source_id)
);
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_clients_company ON clients(company);
CREATE INDEX IF NOT EXISTS idx_clients_synced_at ON clients(synced_at DESC);

-- TABLE: meetings
-- PROPÓSITO: Reuniones (dates, temas, acciones). Un cliente puede tener muchas.
CREATE TABLE IF NOT EXISTS meetings (
  id BIGSERIAL PRIMARY KEY,
  client_id BIGINT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,

  -- Evento
  meeting_date TIMESTAMP NOT NULL,
  summary TEXT,
  description TEXT,
  action_items TEXT[], -- Array: ["Revisar contrato", "Enviar propuesta"]

  -- Trazabilidad de rastreo
  source_app VARCHAR(50) NOT NULL,
  source_id VARCHAR(255) NOT NULL,
  updated_at TIMESTAMP,
  synced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(source_app, source_id)
);
CREATE INDEX IF NOT EXISTS idx_meetings_client_id ON meetings(client_id);
CREATE INDEX IF NOT EXISTS idx_meetings_date ON meetings(meeting_date DESC);
CREATE INDEX IF NOT EXISTS idx_meetings_synced_at ON meetings(synced_at DESC);

-- TABLE: messages
-- PROPÓSITO: Comunicaciones (email, Slack, SMS). Un cliente puede tener cientos.
CREATE TABLE IF NOT EXISTS messages (
  id BIGSERIAL PRIMARY KEY,
  client_id BIGINT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,

  -- Contenido
  channel VARCHAR(50) NOT NULL, -- "email", "slack", "sms", "whatsapp"
  content TEXT NOT NULL,
  sent_at TIMESTAMP NOT NULL,
  sent_by VARCHAR(255), -- Quién envió (tu email, slack handle, etc.)
  direction VARCHAR(20), -- "inbound" (ellos a ti), "outbound" (tú a ellos)

  -- Trazabilidad de rastreo
  source_app VARCHAR(50) NOT NULL,
  source_id VARCHAR(255) NOT NULL,
  updated_at TIMESTAMP,
  synced_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  UNIQUE(source_app, source_id)
);
CREATE INDEX IF NOT EXISTS idx_messages_client_id ON messages(client_id);
CREATE INDEX IF NOT EXISTS idx_messages_sent_at ON messages(sent_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_channel ON messages(channel);
CREATE INDEX IF NOT EXISTS idx_messages_synced_at ON messages(synced_at DESC);

-- TABLE: ai_signals
-- PROPÓSITO: Patrones y alertas detectadas por análisis (NO por sync).
CREATE TABLE IF NOT EXISTS ai_signals (
  id BIGSERIAL PRIMARY KEY,
  client_id BIGINT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,

  -- Señal
  pattern VARCHAR(255) NOT NULL, -- "TÉRMINO_VENCIENDO", "REFORMA_NORMATIVA", "ACCIÓN_RECOMENDADA"
  description TEXT,
  sources TEXT[], -- Array de referencias: ["diagnósticos.id:42", "términos_procesales.id:15"]
  severity VARCHAR(20) DEFAULT 'INFO', -- "INFO", "WARNING", "CRITICAL"

  -- Timestamps
  flagged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP, -- Si ya se atendió

  -- Metadata (quién/qué escribió esto)
  created_by VARCHAR(100), -- "claude-agente", "manual", "scheduler"

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_ai_signals_client_id ON ai_signals(client_id);
CREATE INDEX IF NOT EXISTS idx_ai_signals_severity ON ai_signals(severity);
CREATE INDEX IF NOT EXISTS idx_ai_signals_flagged_at ON ai_signals(flagged_at DESC);

-- ============================================================================
-- PARTE 2: RESOLUCIÓN DE ENTIDADES — Deduplicación
-- ============================================================================

-- TABLE: client_alias
-- PROPÓSITO: Mapa de "este email/nombre pertenece a este cliente_id"
CREATE TABLE IF NOT EXISTS client_alias (
  id BIGSERIAL PRIMARY KEY,
  client_id BIGINT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,

  -- Alias
  alias_type VARCHAR(50) NOT NULL, -- "email", "slack_handle", "phone", "company_domain"
  alias_value VARCHAR(255) NOT NULL, -- El valor real (info@empresa.com, juan.garcia, etc.)
  reason TEXT, -- Por qué creamos este alias (ej: "HubSpot contact = Gmail from")

  -- Metadata
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(100), -- Quién/qué creó este alias ("sync_logic", "manual", "claude")

  UNIQUE(alias_type, alias_value) -- Un alias solo puede apuntar a un cliente
);
CREATE INDEX IF NOT EXISTS idx_client_alias_client_id ON client_alias(client_id);
CREATE INDEX IF NOT EXISTS idx_client_alias_value ON client_alias(alias_value);

-- ============================================================================
-- PARTE 3: BRONZE (RAW) — Capas crudas por fuente
-- ============================================================================

-- TABLE: gmail_raw
-- PROPÓSITO: Copia cruda de cada email descargado. JSON sin procesar.
CREATE TABLE IF NOT EXISTS gmail_raw (
  id BIGSERIAL PRIMARY KEY,
  sync_batch_id VARCHAR(100), -- "sync_2026_07_19_1430"
  payload JSONB NOT NULL, -- El email completo
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_gmail_raw_sync_batch ON gmail_raw(sync_batch_id);
CREATE INDEX IF NOT EXISTS idx_gmail_raw_payload ON gmail_raw USING GIN (payload);

-- TABLE: hubspot_raw
-- PROPÓSITO: Copia cruda de deals, contactos, cambios de HubSpot.
CREATE TABLE IF NOT EXISTS hubspot_raw (
  id BIGSERIAL PRIMARY KEY,
  sync_batch_id VARCHAR(100),
  payload JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_hubspot_raw_sync_batch ON hubspot_raw(sync_batch_id);
CREATE INDEX IF NOT EXISTS idx_hubspot_raw_payload ON hubspot_raw USING GIN (payload);

-- TABLE: slack_raw
-- PROPÓSITO: Copia cruda de mensajes de Slack.
CREATE TABLE IF NOT EXISTS slack_raw (
  id BIGSERIAL PRIMARY KEY,
  sync_batch_id VARCHAR(100),
  payload JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_slack_raw_sync_batch ON slack_raw(sync_batch_id);
CREATE INDEX IF NOT EXISTS idx_slack_raw_payload ON slack_raw USING GIN (payload);

-- TABLE: calendar_raw
-- PROPÓSITO: Copia cruda de eventos de Google Calendar.
CREATE TABLE IF NOT EXISTS calendar_raw (
  id BIGSERIAL PRIMARY KEY,
  sync_batch_id VARCHAR(100),
  payload JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_calendar_raw_sync_batch ON calendar_raw(sync_batch_id);
CREATE INDEX IF NOT EXISTS idx_calendar_raw_payload ON calendar_raw USING GIN (payload);

-- TABLE: legal_data_hunter_raw
-- PROPÓSITO: Copia cruda de cambios normativos, sentencias, reformas.
CREATE TABLE IF NOT EXISTS legal_data_hunter_raw (
  id BIGSERIAL PRIMARY KEY,
  sync_batch_id VARCHAR(100),
  payload JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_ldh_raw_sync_batch ON legal_data_hunter_raw(sync_batch_id);
CREATE INDEX IF NOT EXISTS idx_ldh_raw_payload ON legal_data_hunter_raw USING GIN (payload);

-- TABLE: github_raw
-- PROPÓSITO: Copia cruda de diagnósticos versionados en GitHub.
CREATE TABLE IF NOT EXISTS github_raw (
  id BIGSERIAL PRIMARY KEY,
  sync_batch_id VARCHAR(100),
  payload JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_github_raw_sync_batch ON github_raw(sync_batch_id);
CREATE INDEX IF NOT EXISTS idx_github_raw_payload ON github_raw USING GIN (payload);

-- ============================================================================
-- PARTE 4: GOLD (VIEWS) — Lo que el agente consulta
-- ============================================================================

-- VIEW: client_activity
-- PROPÓSITO: Por cada cliente, snapshot consolidado de actividad actual
CREATE OR REPLACE VIEW client_activity AS
SELECT
  c.id AS client_id,
  c.name,
  c.email,
  c.company,
  c.phone,
  c.deal_status,
  c.last_contact,
  c.synced_at,

  -- Última comunicación (email)
  (SELECT content FROM messages
   WHERE client_id = c.id AND channel = 'email'
   ORDER BY sent_at DESC LIMIT 1) AS last_email_content,

  (SELECT sent_at FROM messages
   WHERE client_id = c.id AND channel = 'email'
   ORDER BY sent_at DESC LIMIT 1) AS last_email_date,

  -- Última comunicación (Slack)
  (SELECT content FROM messages
   WHERE client_id = c.id AND channel = 'slack'
   ORDER BY sent_at DESC LIMIT 1) AS last_slack_message,

  (SELECT sent_at FROM messages
   WHERE client_id = c.id AND channel = 'slack'
   ORDER BY sent_at DESC LIMIT 1) AS last_slack_date,

  -- Última reunión
  (SELECT summary FROM meetings
   WHERE client_id = c.id
   ORDER BY meeting_date DESC LIMIT 1) AS last_meeting_summary,

  (SELECT meeting_date FROM meetings
   WHERE client_id = c.id
   ORDER BY meeting_date DESC LIMIT 1) AS last_meeting_date,

  -- Signals activos (sin resolver)
  (SELECT COUNT(*) FROM ai_signals
   WHERE client_id = c.id AND resolved_at IS NULL) AS active_signals_count,

  -- Signals críticos
  (SELECT COUNT(*) FROM ai_signals
   WHERE client_id = c.id AND severity = 'CRITICAL' AND resolved_at IS NULL) AS critical_signals_count

FROM clients c;

-- VIEW: client_status_summary
-- PROPÓSITO: Resumen legible de estado actual por cliente
CREATE OR REPLACE VIEW client_status_summary AS
SELECT
  c.id AS client_id,
  c.name,
  c.company,
  c.email,
  c.deal_status AS current_stage,
  c.last_contact,

  -- Últimas 3 comunicaciones (concatenadas)
  STRING_AGG(
    '[' || TO_CHAR(m.sent_at, 'YYYY-MM-DD HH24:MI') || '] ' ||
    m.channel || ': ' || LEFT(m.content, 50) || '...',
    E'\n' ORDER BY m.sent_at DESC
  ) FILTER (WHERE m.id IS NOT NULL) AS recent_communications,

  -- Próxima reunión
  MIN(mt.meeting_date) FILTER (WHERE mt.meeting_date > CURRENT_TIMESTAMP) AS next_meeting,

  -- Alertas críticas
  STRING_AGG(
    ai.pattern || ' (' || ai.severity || ')',
    ', ' ORDER BY ai.flagged_at DESC
  ) FILTER (WHERE ai.resolved_at IS NULL AND ai.severity = 'CRITICAL') AS critical_alerts

FROM clients c
LEFT JOIN messages m ON c.id = m.client_id AND m.sent_at > CURRENT_DATE - INTERVAL '14 days'
LEFT JOIN meetings mt ON c.id = mt.client_id
LEFT JOIN ai_signals ai ON c.id = ai.client_id
GROUP BY c.id, c.name, c.company, c.email, c.deal_status, c.last_contact
ORDER BY c.last_contact DESC NULLS LAST;

-- VIEW: urgent_signals
-- PROPÓSITO: Todas las alertas sin resolver, ordenadas por urgencia y fecha
CREATE OR REPLACE VIEW urgent_signals AS
SELECT
  s.id,
  s.client_id,
  c.name AS client_name,
  c.company,
  s.pattern,
  s.description,
  s.severity,
  s.flagged_at,
  s.created_by,

  -- Días desde que se flaggeó
  EXTRACT(DAY FROM CURRENT_TIMESTAMP - s.flagged_at) AS days_active

FROM ai_signals s
JOIN clients c ON s.client_id = c.id
WHERE s.resolved_at IS NULL
ORDER BY
  CASE WHEN s.severity = 'CRITICAL' THEN 1 WHEN s.severity = 'WARNING' THEN 2 ELSE 3 END,
  s.flagged_at DESC;

-- ============================================================================
-- PARTE 5: PERMISOS — Crear role solo-lectura (ejecutar por separado)
-- ============================================================================

-- INSTRUCCIONES:
-- 1. Ejecuta SOLO esta sección si quieres crear el rol READ-ONLY
-- 2. Reemplaza "tu_password_fuerte_aqui" con una contraseña real
-- 3. Usa este rol en PostgreSQL MCP (ver SEGURIDAD_MCP_ROLES.md)

/*
-- DESCOMENTA Y EJECUTA SOLO SI NECESITAS CREAR EL ROL:

CREATE ROLE claude_readonly WITH LOGIN PASSWORD 'tu_password_fuerte_aqui';
REVOKE ALL ON DATABASE tu_db FROM claude_readonly;
REVOKE ALL ON SCHEMA public FROM claude_readonly;
GRANT CONNECT ON DATABASE tu_db TO claude_readonly;
GRANT USAGE ON SCHEMA public TO claude_readonly;
GRANT SELECT ON client_activity, client_status_summary, urgent_signals TO claude_readonly;
REVOKE ALL ON clients, meetings, messages, ai_signals FROM claude_readonly;
REVOKE ALL ON gmail_raw, hubspot_raw, slack_raw, calendar_raw, legal_data_hunter_raw, github_raw FROM claude_readonly;
REVOKE ALL ON client_alias FROM claude_readonly;

-- Verifica:
SELECT * FROM information_schema.role_table_grants WHERE grantee='claude_readonly';
*/

-- ============================================================================
-- FIN DEL SCHEMA
-- ============================================================================
-- Estado: ✅ Listo para copiar-pegar en Neon / Supabase / Railway
-- Ejecución: Copia TODO (o por partes) y ejecuta en tu DB
-- ============================================================================
