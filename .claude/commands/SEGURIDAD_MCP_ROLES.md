# SEGURIDAD: MCP + ROLES MÍNIMOS

**Objetivo**: Conectar Postgres a Claude por MCP en modo solo-lectura, con un rol que no puede escribir ni borrar nada.

**Regla de oro**: Tu usuario dueño (el que puede escribir) NUNCA se conecta a Claude. Solo el rol read-only.

---

## 1️⃣ ENTENDER LA AMENAZA

Un MCP con permiso de escritura es una puerta abierta. Si alguien (incluyendo un agente comprometido) accede al MCP, podría:
- Borrar clientes, reuniones, mensajes
- Actualizar diagnósticos falsos
- Inyectar señales falsas (ai_signals)
- Comprometer la integridad de tu cerebro

**Defensa en capas:**
1. **Capa 1 (MCP)**: `--access-mode=restricted` limita qué puede hacer el MCP
2. **Capa 2 (Database)**: Rol de mínimo privilegio — solo SELECT sobre GOLD
3. **Capa 3 (Network)**: Postgres en Neon/Supabase (no internet abierto)

---

## 2️⃣ CREAR EL ROL SOLO-LECTURA

**¿Qué hace?**  
Crea un usuario `claude_readonly` que:
- Solo puede leer las vistas GOLD
- No puede escribir, borrar, ni modificar nada
- No puede ver tablas BRONZE ni CORE (opcional, pero seguro)
- No puede crear objetos

**SQL a ejecutar** (en tu Postgres como superusuario):

```sql
-- 1. Crear el rol
CREATE ROLE claude_readonly WITH LOGIN PASSWORD 'tu_password_fuerte_aqui';

-- 2. Revoke todos los permisos por defecto
REVOKE ALL ON DATABASE tu_db FROM claude_readonly;
REVOKE ALL ON SCHEMA public FROM claude_readonly;

-- 3. Dale permiso de conexión a la base
GRANT CONNECT ON DATABASE tu_db TO claude_readonly;

-- 4. Dale permiso de usar el esquema
GRANT USAGE ON SCHEMA public TO claude_readonly;

-- 5. SOLO SELECT sobre las vistas GOLD (nada de BRONZE ni CORE)
GRANT SELECT ON client_activity TO claude_readonly;
GRANT SELECT ON client_status_summary TO claude_readonly;
GRANT SELECT ON urgent_signals TO claude_readonly;

-- 6. REVOCA explícitamente cualquier otra tabla
REVOKE ALL ON clients FROM claude_readonly;
REVOKE ALL ON meetings FROM claude_readonly;
REVOKE ALL ON messages FROM claude_readonly;
REVOKE ALL ON ai_signals FROM claude_readonly;
REVOKE ALL ON gmail_raw FROM claude_readonly;
REVOKE ALL ON hubspot_raw FROM claude_readonly;
REVOKE ALL ON slack_raw FROM claude_readonly;
REVOKE ALL ON calendar_raw FROM claude_readonly;
REVOKE ALL ON legal_data_hunter_raw FROM claude_readonly;
REVOKE ALL ON client_alias FROM claude_readonly;

-- 7. Asegúrate que nuevos objetos NO heredan permisos automáticos
ALTER DEFAULT PRIVILEGES FOR USER postgres IN SCHEMA public REVOKE ALL ON TABLES FROM claude_readonly;
ALTER DEFAULT PRIVILEGES FOR USER postgres IN SCHEMA public REVOKE ALL ON SEQUENCES FROM claude_readonly;
ALTER DEFAULT PRIVILEGES FOR USER postgres IN SCHEMA public REVOKE ALL ON FUNCTIONS FROM claude_readonly;

-- 8. Verifica
SELECT * FROM information_schema.role_table_grants WHERE grantee='claude_readonly';
-- Debería mostrar solo las 3 vistas GOLD con SELECT privilege
```

**Output esperado:**
```
grantor | table_schema |      table_name       | grantee            | privilege_type
────────┼──────────────┼───────────────────────┼────────────────────┼────────────────
postgres| public       | client_activity       | claude_readonly    | SELECT
postgres| public       | client_status_summary | claude_readonly    | SELECT
postgres| public       | urgent_signals        | claude_readonly    | SELECT
```

Si ves más filas o tablas BRONZE, ejecuta REVOKE (ver paso 6).

---

## 3️⃣ CREDENCIAL PARA EL MCP

**DATABASE_URI que usarás en Claude**:

```
postgresql://claude_readonly:tu_password_fuerte_aqui@host:5432/tu_db
```

**Dónde obtener los datos:**
- `host`: Tu URL de Neon / Supabase / Railway (ej: `ep-xyz.neon.tech`)
- `tu_db`: Nombre de tu base (ej: `jacabogados`)
- `puerto`: Normalmente 5432, Supabase a veces 6543
- `tu_password_fuerte_aqui`: La que configuraste arriba

**Ejemplo real (Neon):**
```
postgresql://claude_readonly:MyStr0ng!Pass123@ep-lively-disk-123456.us-east-1.neon.tech:5432/jacabogados
```

---

## 4️⃣ INSTALAR POSTGRES MCP PRO (crystaldba/postgres-mcp)

**Paso 1: Instalar con pipx**

```bash
# Si no tienes pipx:
pip install pipx
export PATH="$PATH:~/.local/bin"

# Instala postgres-mcp
pipx install postgres-mcp

# Verifica
postgres-mcp --version
```

**Paso 2: Conectar a Claude Code**

```bash
# Comando exacto:
claude mcp add postgres \
  --env DATABASE_URI="postgresql://claude_readonly:tu_password_fuerte_aqui@host:5432/tu_db" \
  -- postgres-mcp --access-mode=restricted
```

**Explicación del comando:**
- `claude mcp add postgres`: Registra un MCP llamado "postgres"
- `--env DATABASE_URI="..."`: Pasa tu credentials como variable de entorno
- `-- postgres-mcp`: Ejecuta el servidor postgres-mcp
- `--access-mode=restricted`: ⚠️ **CRÍTICO** — modo solo-lectura con topes de recursos

**¿Por qué `--access-mode=restricted`?**
- Sin él: el servidor podría permitir UPDATE/DELETE (mal)
- Con él: solo SELECT, máximo 1000 filas por query, máximo 5s ejecución

---

## 5️⃣ VERIFICAR QUE FUNCIONA

Abre Claude Code y corre esto:

```sql
-- Pregunta 1: ¿Ves las tablas?
\d client_activity
-- Esperado: Descripción de la vista

-- Pregunta 2: ¿Puedes leer?
SELECT COUNT(*) as total_clientes FROM client_activity;
-- Esperado: número > 0

-- Pregunta 3: ¿Está protegido (no puedes escribir)?
INSERT INTO clients (name, email) VALUES ('Test', 'test@example.com');
-- Esperado: ERROR: permission denied for schema public
```

**Si Pregunta 1 o 2 falla:**
- DATABASE_URI está mal → Verifica credenciales
- MCP no se conectó → Revisa logs: `claude mcp logs postgres`

**Si Pregunta 3 NO rechaza (te deja escribir):**
- ⚠️ **PROBLEMA**: El rol no está protegido
- Revisa que REVOKE se ejecutó correctamente
- Re-run SQL del paso 2

---

## 6️⃣ CHECKLIST DE SEGURIDAD (5 PUNTOS)

```sql
-- Copia y pega cada uno, verifica que funciona como se espera:

-- 1. ¿El rol existe y está login-capable?
SELECT * FROM pg_roles WHERE rolname='claude_readonly';
-- Esperado: rolcanlogin = t (true)

-- 2. ¿Solo puede leer vistas GOLD?
SELECT table_name, privilege_type 
FROM information_schema.role_table_grants 
WHERE grantee='claude_readonly'
ORDER BY table_name;
-- Esperado: Solo client_activity, client_status_summary, urgent_signals + SELECT

-- 3. ¿No puede insertar?
-- Conéctate COMO claude_readonly:
psql postgresql://claude_readonly:PASSWORD@host:5432/tu_db
-- Corre: INSERT INTO ai_signals (client_id, pattern) VALUES (1, 'TEST');
-- Esperado: ERROR: permission denied for schema public

-- 4. ¿No puede ver BRONZE?
SELECT * FROM gmail_raw LIMIT 1;
-- Esperado: ERROR: permission denied for table gmail_raw

-- 5. ¿No puede crear objetos?
CREATE TABLE test_table (id INT);
-- Esperado: ERROR: permission denied for schema public
```

---

## 7️⃣ SI ALGO FALLA

### MCP no conecta a la base

```bash
# Test la conexión manualmente:
psql postgresql://claude_readonly:PASSWORD@host:5432/tu_db -c "SELECT 1;"

# Si falla, verifica:
# - HOST correcto (neon.tech, supabase.co, railway.app)
# - Puerto correcto (5432 por defecto, check tu provider)
# - PASSWORD sin caracteres especiales (o escapados)
# - Usuario existe: SELECT * FROM pg_roles WHERE rolname='claude_readonly';
```

### MCP conecta pero solo ve 0 filas

```bash
# Verifica que hay datos reales en las vistas:
psql postgresql://tu_user_admin:PASSWORD@host:5432/tu_db -c "SELECT COUNT(*) FROM client_activity;"

# Si devuelve 0, tus syncs no han corrido aún. Ejecuta:
python sync_jobs/gmail_sync.py
python sync_jobs/calendar_sync.py
# Luego retry MCP query
```

### El rol puede escribir (¡no está protegido!)

```sql
-- Nuclear option: elimina y recrea
DROP ROLE claude_readonly;
-- Vuelve al paso 2 y corre TODO el SQL de nuevo
-- Verifica cada GRANT/REVOKE se ejecutó sin error
```

---

## 8️⃣ FLUJO DE CONEXIÓN (RESUMIDO)

```
TÚ (usuario)
  ↓
Claude Code
  ↓
Postgres MCP (crystaldba)
  ↓
Database URI: postgresql://claude_readonly:PASSWORD@host:5432/tu_db
  ↓
Postgres (restricted role, solo-lectura)
  ↓
Vistas GOLD: client_activity, client_status_summary, urgent_signals
  ↓
Claude LEE sin escribir
```

En cada paso:
- ✅ MCP solo-lectura (--access-mode=restricted)
- ✅ Rol sin insert/update/delete
- ✅ Bases de datos viven en Neon/Supabase (seguras)
- ✅ Tu usuario admin NUNCA se expone a Claude

---

## 9️⃣ NOTAS FINALES

1. **Password fuerte**: No uses contraseñas simples. Genera con: `openssl rand -base64 32`

2. **Rota cada 90 días**: En Neon/Supabase, cambia el password cada trimestre:
   ```sql
   ALTER USER claude_readonly WITH PASSWORD 'nuevo_password_fuerte';
   ```

3. **Monitorea accesos**: Algunos providers (Supabase Pro) registran accesos. Revisa logs si sospechas actividad anómala.

4. **Auditoría**: Si alguien compromete el MCP, solo puede leer GOLD. No puede tocar CORE ni BRONZE. Pérdida mínima.

---

**Estado**: 🟢 Protegido y listo  
**Última revisión**: 19 de julio de 2026

