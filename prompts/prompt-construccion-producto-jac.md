# 🚀 PROMPT MAESTRO: Construcción de Producto de IA

## De Idea a Producto Funcional en Producción | JAC

---

## 📋 ESTRUCTURA BASE - Plantilla Mejorada

### BLOQUE 1: VALIDAR LA IDEA

**Mejora del original:**
```
"Tienes la idea de construir [PRODUCTO/APLICACIÓN].

ANTES DE EMPEZAR A CODEAR, VALIDAR:

CONTEXTO DE LA IDEA:
├─ Nombre del producto: [Portal de clientes / Dashboard para abogados / etc]
├─ Propósito: [Por qué existe]
│  └─ Ejemplo: "Portal para que clientes vean estado de expediente en tiempo real"
│  └─ Ejemplo: "Dashboard para abogados monitorear productividad de equipo"
│
├─ Problema que resuelve: [Qué duele hoy]
│  └─ Problema actual: "Clientes llaman 10x al mes preguntando por estado"
│  └─ Costo del problema: "5 llamadas/día × 5 min = 25 min/día = 100+ horas/año"
│  └─ Impacto: "Abogados interrumpidos, clientes insatisfechos"
│
├─ Usuarios objetivo: [Quién lo usa]
│  ├─ Usuario 1: Clientes del bufete (externos)
│  │  └─ # de usuarios: 50-100 concurrentes
│  │  └─ Técnicamente sofisticados: Medio (saben email, web básico)
│  │  └─ Expectativa: Simple, intuitivo, móvil-friendly
│  │
│  └─ Usuario 2: Abogados/staff (internos)
│     └─ # de usuarios: 20 concurrentes
│     └─ Técnicamente sofisticados: Bajo (mayoría 50+)
│     └─ Expectativa: Fácil, información clara
│
├─ Resultado deseado: [Qué ganamos]
│  ├─ Métrica 1: Reducir llamadas 80% → 2 llamadas/día (de 5)
│  ├─ Métrica 2: Satisfacción cliente sube de 6/10 a 8/10 (NPS)
│  ├─ Métrica 3: Ahorro tiempo staff: 80 horas/año
│  └─ Métrica 4: Retención cliente sube 15%
│
├─ Plataforma preferida: [Web / Móvil / Desktop / Todas]
│  ├─ Web (React): Fácil acceso, no requiere descarga
│  ├─ Móvil (React Native): Notificaciones push, offline
│  └─ Decisión: MVP web first, mobile después
│
├─ Herramientas disponibles:
│  ├─ APIs propias: CRM JAC, sistema de casos
│  ├─ Servicios externos: SendGrid (email), Slack (notificaciones)
│  ├─ Stack actual: Node.js + React + PostgreSQL
│  └─ Infraestructura: AWS (EC2, RDS, S3)
│
├─ Limitaciones técnicas:
│  ├─ Limitación 1: Acceso a BD restringido (solo lectura de ciertos datos)
│  ├─ Limitación 2: APIs de terceros tienen rate limits
│  ├─ Limitación 3: No hay budget para nuevos servicios (cloud caro)
│  └─ Decisión: Diseñar considerando estas límites
│
└─ Éxito se mide por:
   ├─ Métrica 1 (Uso): >70% clientes usando portal en mes 1
   ├─ Métrica 2 (Satisfacción): NPS >7/10
   ├─ Métrica 3 (Económico): ROI positivo en 6 meses
   ├─ Métrica 4 (Operacional): 0 data breaches, 99.5% uptime
   └─ Métrica 5 (Mantenimiento): <4 horas/semana de soporte
"
```

### BLOQUE 2: REFINAR CONCEPTO

**Mejora del original:**
```
PREGUNTAS CRÍTICAS ANTES DE CONSTRUIR:

PREGUNTA 1: ¿Problema es REAL o imaginado?
├─ Validación: ¿Clientes realmente quieren esto?
│  └─ Evidencia: Encuesta 10 clientes ¿Cuántos dicen SÍ?
│  └─ Evidencia: ¿Clientes piden esto específicamente?
│  └─ Evidencia: Contador llamadas/mes (dato verificable)
│
├─ Si evidencia = DÉBIL
│   └─ Acción: Hacer más research antes de empezar
│   └─ Riesgo: Gastar meses en algo que nadie quiere
│
└─ Si evidencia = FUERTE
    └─ Acción: Continuar con confianza


PREGUNTA 2: ¿MVP es pequeño o demasiado grande?
├─ MVP = Minimum Viable Product (lo mínimo para validar valor)
│
├─ MALO (Demasiado grande):
│  ├─ Features que quieres: Estado expediente + Documentos + Chat + Pagos + etc
│  ├─ Tiempo estimado: 6 meses
│  ├─ Riesgo: Sobre-engineered, toma demasiado tiempo
│  └─ Resultado: Lanzas perfectamente tarde (después perdiste oportunidad)
│
├─ BUENO (MVP mínimo):
│  ├─ Features v1: Solo estado del expediente en tiempo real
│  ├─ Tiempo estimado: 4 semanas
│  ├─ Riesgo: Menor (menos código, menos bugs)
│  └─ Resultado: Lanzas rápido, validas con usuarios, iterás
│
└─ DECISIÓN MVP PARA PORTAL:
    ├─ Incluir en v1: Login + Ver estado expediente + Ver documentos
    ├─ NO incluir en v1: Chat, pagos, comparativas, analytics
    ├─ Tiempo: 3-4 semanas
    └─ Justificación: 80% del valor en 20% del esfuerzo


PREGUNTA 3: ¿Viabilidad técnica es real?
├─ Pregunta: ¿Con equipo/tiempo/dinero disponible, es posible?
│
├─ Checklist:
│   ├─ ¿Tenemos acceso a datos? SÍ (CRM + BD)
│   ├─ ¿Tenemos stack? SÍ (React + Node.js)
│   ├─ ¿Tenemos experiencia? SÍ (team ha hecho aplicaciones web)
│   ├─ ¿Recursos humanos? SÍ (1-2 devs pueden hacerlo)
│   ├─ ¿Tiempo? SÍ (4 semanas disponibles)
│   ├─ ¿Budget? SÍ (infraestructura existente)
│   └─ ¿Seguridad es posible? SÍ (podemos encriptar)
│
└─ Conclusión: VIABLE


PREGUNTA 4: ¿Riesgos principales son manejables?
├─ Riesgo 1: Datos sensibles expuestos
│   └─ Severidad: CRÍTICA
│   └─ Probabilidad: MEDIA
│   └─ Mitigación: Encriptación + RBAC + Auditoría
│   └─ Veredicto: Manejable
│
├─ Riesgo 2: Performance (muchos usuarios simultáneos)
│   └─ Severidad: ALTA
│   └─ Probabilidad: BAJA (solo 50-100 usuarios)
│   └─ Mitigación: Caching + Database indexing
│   └─ Veredicto: Manejable
│
├─ Riesgo 3: Cambio de requisitos durante dev
│   └─ Severidad: MEDIA
│   └─ Probabilidad: MEDIA
│   └─ Mitigación: Scope fijo + feedback durante sprint
│   └─ Veredicto: Manejable
│
└─ Conclusión: Sin riesgos no-manejables


PREGUNTA 5: ¿Valor para usuario es claro?
├─ Usuario: Cliente del bufete
├─ Problema de hoy: Llama 10 veces para saber estado
├─ Valor mañana: Se inicia sesión, ve estado en 10 segundos
├─ Diferencia: 5 minutos × 10 llamadas = 50 minutos/mes economizados
├─ ¿Es suficiente valor? SÍ, para cliente es obvio
└─ Conclusión: Value proposition es CLARA


DECISIÓN FINAL: PROCEDER CON CONSTRUCCIÓN
├─ Problema es real: ✓
├─ MVP es pequeño y manejable: ✓
├─ Viabilidad técnica es alta: ✓
├─ Riesgos son manejables: ✓
├─ Valor es claro: ✓
└─ GO/NO-GO: ✅ GO
```

### BLOQUE 3: DISEÑAR ARQUITECTURA

**Mejora del original:**
```
ARQUITECTURA TÉCNICA DEL PORTAL:

┌───────────────────────────────────────────────────────────┐
│ CAPA PRESENTACIÓN (Frontend)                              │
│                                                           │
│  ┌─ Dashboard Cliente (React)                            │
│  │  ├─ Login/Auth (formulario)                           │
│  │  ├─ Lista de expedientes (tabla)                      │
│  │  ├─ Detalle de expediente (status, documentos, timeline)
│  │  ├─ Descargar documentos (PDF viewer)                 │
│  │  └─ Perfil (editar email/teléfono)                    │
│  │                                                        │
│  └─ Dashboard Abogado (Admin React)                      │
│     ├─ Analytics (clientes activos, expedientes)         │
│     ├─ Gestión de clientes                               │
│     ├─ Auditoría de accesos                              │
│     └─ Configuración                                     │
│                                                           │
│  Deployment: Vercel / AWS CloudFront                      │
│  Build: npm run build → minified + optimizado            │
│  SSR: No (CSR es suficiente)                             │
└───────────────────────────────────────────────────────────┘
                           ↓
┌───────────────────────────────────────────────────────────┐
│ CAPA API (Backend)                                        │
│                                                           │
│  ┌─ Node.js + Express                                     │
│  │  ├─ GET /api/auth/login (retorna JWT)                 │
│  │  ├─ GET /api/expedientes (lista del cliente)          │
│  │  ├─ GET /api/expedientes/:id (detalles)              │
│  │  ├─ GET /api/documentos/:id (descarga)                │
│  │  ├─ POST /api/profile (actualizar datos)              │
│  │  ├─ GET /api/admin/analytics (admin only)             │
│  │  └─ POST /api/admin/audit (admin only)                │
│  │                                                        │
│  │  Middleware:                                          │
│  │  ├─ Authentication (JWT)                              │
│  │  ├─ Authorization (role-based)                        │
│  │  ├─ Rate limiting (100 req/min por IP)               │
│  │  ├─ Logging (Winston)                                │
│  │  └─ Error handling                                    │
│  │                                                        │
│  └─ Deployment: AWS EC2 (t3.small) o ECS                │
│     ├─ Health check: /api/health                         │
│     ├─ Auto-scaling: Si CPU >70%                         │
│     └─ Load balancer: ALB                                │
│                                                           │
└───────────────────────────────────────────────────────────┘
                           ↓
┌───────────────────────────────────────────────────────────┐
│ CAPA DATOS                                                │
│                                                           │
│  ┌─ PostgreSQL (Existente)                               │
│  │  └─ Tablas:                                           │
│  │     ├─ users (clientes)                               │
│  │     ├─ expedientes (cases)                            │
│  │     ├─ documentos (files)                             │
│  │     └─ audit_logs (accesos)                           │
│  │                                                        │
│  │  Índices: ON expedientes.cliente_id, ON documentos.expediente_id
│  │  Backups: Diario (AWS RDS automated)                  │
│  │                                                        │
│  ├─ Redis (Cache)                                        │
│  │  ├─ Sesiones JWT                                      │
│  │  ├─ Lista de expedientes (5 min TTL)                  │
│  │  ├─ Detalle expediente (10 min TTL)                   │
│  │  └─ Rate limit counters                               │
│  │                                                        │
│  └─ S3 (Documentos)                                      │
│     ├─ Bucket: jac-expedientes-documents                 │
│     ├─ Versionado: ON (recuperación)                     │
│     ├─ Encriptación: SSE-S3                              │
│     ├─ Presigned URLs: 1 hora de expiración              │
│     └─ Logging: CloudTrail                               │
│                                                           │
└───────────────────────────────────────────────────────────┘
                           ↓
┌───────────────────────────────────────────────────────────┐
│ SERVICIOS EXTERNOS                                        │
│                                                           │
│  ├─ Slack: Notificaciones de eventos críticos            │
│  ├─ SendGrid: Emails de bienvenida, reseteo password     │
│  ├─ Auth0: Opcional, autenticación SSO                   │
│  └─ Sentry: Error tracking                               │
│                                                           │
└───────────────────────────────────────────────────────────┘

FLUJO DE DATOS:

1. Cliente inicia sesión
   └─ Frontend: POST /api/auth/login (email, password)
   └─ Backend: Verifica credenciales, genera JWT
   └─ Redis: Almacena sesión
   └─ Frontend: Guarda JWT en localStorage
   └─ Cliente: Autenticado

2. Cliente ve expedientes
   └─ Frontend: GET /api/expedientes (+ JWT en header)
   └─ Backend: Verifica JWT, obtiene cliente_id
   └─ Backend: Query PostgreSQL (expedientes del cliente)
   └─ Redis: Cachea resultado (5 min)
   └─ Frontend: Muestra tabla de expedientes

3. Cliente ve detalle expediente
   └─ Frontend: GET /api/expedientes/:id
   └─ Backend: Verifica permisos (cliente own this expediente?)
   └─ Backend: Obtiene datos de PostgreSQL
   └─ Backend: Obtiene documentos de S3
   └─ Frontend: Muestra detalle completo

4. Cliente descarga documento
   └─ Frontend: GET /api/documentos/:id
   └─ Backend: Genera Presigned URL (1 hora validez)
   └─ Frontend: Redirige a S3
   └─ S3: Entrega archivo (encriptado en tránsito)
   └─ Audit: Log del acceso


SEGURIDAD:

├─ Autenticación:
│  ├─ JWT con expiración 24 horas
│  ├─ Refresh token con expiración 7 días
│  ├─ Password hashing: bcrypt (salt rounds: 10)
│  └─ 2FA: Opcional (email verification)
│
├─ Autorización:
│  ├─ Roles: CLIENT, LAWYER, ADMIN
│  ├─ Clientes solo ven sus expedientes
│  ├─ Abogados ven clientes asignados
│  └─ Admin ve todo
│
├─ Datos:
│  ├─ Encriptación en tránsito: TLS/HTTPS
│  ├─ Encriptación en reposo: RDS encryption, S3 SSE
│  ├─ Tokens en base de datos: Hashados
│  └─ Documentos en S3: Privados (no public)
│
├─ Auditoría:
│  ├─ Todos los accesos loguados
│  ├─ Campo user_id + timestamp + action
│  ├─ Retención: 90 días
│  └─ Alertas: Accesos anómalos
│
└─ Compliance:
   ├─ LGPD: Datos personales protegidos
   ├─ Secreto profesional: Datos de expediente confidenciales
   ├─ Data minimization: Solo necesario guardado
   └─ Right to be forgotten: Eliminar datos on request


PERFORMANCE:

├─ Frontend:
│  ├─ Tamaño bundle: <200KB (minified + gzipped)
│  ├─ First contentful paint: <2 segundos
│  ├─ Lazy loading: Para listas grandes
│  └─ Caching: Service worker para offline
│
├─ Backend:
│  ├─ Response time: <500ms para 95% de requests
│  ├─ Queries optimizadas con índices
│  ├─ Connection pooling: 10-20 conexiones
│  └─ Rate limiting: 100 requests/min per IP
│
├─ Database:
│  ├─ Query time: <100ms para queries típicas
│  ├─ índices en foreign keys
│  ├─ Particionado si datos > 1GB
│  └─ Vacuum automático
│
└─ Infraestructura:
   ├─ CDN: CloudFront para assets estáticos
   ├─ Caching: Redis 5 min para datos calientes
   ├─ Load balancer: Distribuye tráfico
   └─ Auto-scaling: UP en CPU >70%, DOWN en CPU <30%
```

### BLOQUE 4: FLUJO DE USUARIO

**Mejora del original:**
```
HAPPY PATH (Caso ideal - Cliente descubre estado del expediente):

1. Cliente abre navegador
   └─ URL: portal.jac.com.co
   └─ Página: Login (email + password)
   └─ Tiempo: 2 segundos

2. Cliente inicia sesión
   └─ Input: Email: "cliente@empresa.com", Password: "xxx"
   └─ Validación: Email existe en DB, password es correcto
   └─ JWT generado: Token guardado en localStorage
   └─ Tiempo: 3 segundos

3. Cliente ve dashboard
   └─ Página: Lista de expedientes
   └─ Muestra: 3 expedientes activos
   │  ├─ Expediente 2026-0001: Demanda laboral, "En investigación"
   │  ├─ Expediente 2026-0002: Contrato, "Completado"
   │  └─ Expediente 2026-0003: Nuevo, "Ingresado hace 2 días"
   └─ Tiempo: 1 segundo

4. Cliente hace clic en expediente
   └─ Acción: Click en "Expediente 2026-0001"
   └─ Página: Detalle de expediente
   └─ Muestra:
      ├─ Título: "Demanda por Despido Injustificado"
      ├─ Estado: "En investigación" (progreso: 40%)
      ├─ Última actualización: "Hace 2 días"
      ├─ Documentos: 5 archivos
      │   ├─ demanda_original.pdf
      │   ├─ prueba_email.pdf
      │   ├─ respuesta_demandada.pdf
      │   ├─ despacho_notificación.pdf
      │   └─ jurisprudencia_relevante.pdf
      ├─ Timeline:
      │   ├─ [15 ago] Expediente ingresado
      │   ├─ [20 ago] Demanda presentada
      │   ├─ [25 ago] Respuesta demandada recibida
      │   └─ [30 ago] Análisis en proceso
      └─ Tiempo: 1 segundo

5. Cliente descarga documento
   └─ Acción: Click en "demanda_original.pdf"
   └─ Confirmación: "¿Descargar demanda_original.pdf?"
   └─ Resultado: Archivo descargado en 5 segundos
   └─ Nota: URL tiene expiración (1 hora de seguridad)

6. Cliente logout
   └─ Acción: Click en "Cerrar sesión"
   └─ Validación: JWT invalidado en Redis
   └─ Redirección: Login page
   └─ Tiempo: 1 segundo


CASOS LÍMITE (Errores que pueden ocurrir):

CASO 1: Cliente olvida contraseña

1. Cliente hace clic en "¿Olvidó su contraseña?"
2. Ingresa email: "cliente@empresa.com"
3. Backend:
   ├─ Valida que email existe
   ├─ Genera reset token (aleatorio, 1 hora validez)
   ├─ Guarda token en DB
   └─ Envía email con link: "portal.jac.com.co/reset?token=xxx"
4. Cliente abre email, click en link
5. Ingresa nueva contraseña (con validación: 8+ caracteres, letras + números)
6. Backend:
   ├─ Valida token aún válido
   ├─ Verifica nueva contraseña
   ├─ Hashea password con bcrypt
   ├─ Guarda en DB
   ├─ Invalida token (una sola vez)
   └─ Muestra: "Contraseña actualizada"
7. Cliente puede login con nueva contraseña


CASO 2: Cliente intenta ver expediente de otro cliente

1. Cliente A inicia sesión (cliente_id = 123)
2. Cliente A intenta acceder: GET /api/expedientes/999 (otro cliente)
3. Backend:
   ├─ Extrae cliente_id de JWT = 123
   ├─ Query: SELECT * FROM expedientes WHERE id=999
   ├─ Resultado: expediente_id=999, cliente_id=456 (diferente)
   ├─ Validación: cliente_id JWT (123) != cliente_id expediente (456)
   └─ Acción: Retorna 403 Forbidden
4. Frontend: Muestra "No tiene permiso"
5. Audit log: Registra intento de acceso no autorizado


CASO 3: Base de datos no responde

1. Cliente hace request: GET /api/expedientes
2. Backend intenta query
3. Database timeout después de 5 segundos
4. Backend:
   ├─ Captura error de timeout
   ├─ Log: "Database unavailable"
   ├─ Alert: Notifica a ops team en Slack
   └─ Retorna: 503 Service Unavailable
5. Frontend: Muestra "Sistema temporalmente no disponible. Reintentando..."
6. Frontend: Reintenta cada 10 segundos
7. Cuando BD vuelve, request funciona
8. Client: No nota la interrupción (graceful degradation)


CASO 4: Usuario no cierra sesión (JWT expirado)

1. Cliente login a las 10:00 AM
2. JWT válido por 24 horas (hasta 10:00 AM día siguiente)
3. Cliente deja navegador abierto
4. A las 11:00 PM (13 horas después), usuario intenta una acción
5. Frontend envía request con JWT
6. Backend:
   ├─ Valida JWT
   ├─ Verifica expiración: 24 - 13 = 11 horas restantes
   ├─ ✓ JWT aún válido
   └─ Procesa request
7. Si fuera > 24 horas:
   ├─ JWT expirado
   ├─ Backend retorna 401 Unauthorized
   ├─ Frontend redirige a login
   ├─ Cliente debe volver a ingresar contraseña
   └─ Nuevo JWT generado


CASO 5: Documento no está en S3

1. Cliente intenta descargar documentos
2. Backend busca en S3
3. S3 retorna: 404 Not Found
4. Backend:
   ├─ Log: "Documento no encontrado en S3"
   ├─ Alert: Notifica a admin
   └─ Retorna: 404 Not Found al cliente
5. Frontend muestra: "Documento no disponible"
6. Admin investigación:
   ├─ ¿Fue eliminado accidentalmente?
   ├─ ¿S3 backup tiene copia?
   ├─ Restaurar desde backup si existe
   └─ Notificar cliente si permanentemente perdido
```

### BLOQUE 5: PLAN DE DESARROLLO

**Mejora del original:**
```
SPRINT-BASED DEVELOPMENT (4 semanas para MVP):

═══════════════════════════════════════════════════════════════

SEMANA 1: SETUP & INFRA
─────────────────────────────────────────────────────────────

TAREA 1.1: Configurar repositorio Git
├─ Acción: Crear repo en GitHub
├─ Estructura:
│   ├─ /frontend (React)
│   ├─ /backend (Node.js)
│   ├─ /database (SQL migrations)
│   ├─ /docker (Docker files)
│   └─ README.md
├─ Responsable: Dev 1
└─ Tiempo: 2 horas

TAREA 1.2: Setup desarrollo local (Docker)
├─ Acción: Docker compose con PostgreSQL, Redis
├─ Comando: "docker-compose up" = ambiente completo
├─ Responsable: Dev 1
└─ Tiempo: 4 horas

TAREA 1.3: Setup CI/CD pipeline (GitHub Actions)
├─ Acción: Tests corren automático en cada push
├─ Flujo: Lint → Tests → Build → Deploy to staging
├─ Responsable: Dev 1
└─ Tiempo: 3 horas

TAREA 1.4: Setup bases de datos
├─ Acción: Crear tablas (users, expedientes, documentos, audit_logs)
├─ Responsable: Dev 2
└─ Tiempo: 2 horas

TAREA 1.5: Documentación técnica inicial
├─ Acción: README + Setup guide
├─ Responsable: Dev 1
└─ Tiempo: 2 horas

WEEK 1 TOTAL: 13 horas
GOAL: Ambiente listo para development


═══════════════════════════════════════════════════════════════

SEMANA 2: AUTENTICACIÓN & DASHBOARD BÁSICO
─────────────────────────────────────────────────────────────

TAREA 2.1: Backend - Auth endpoints
├─ Endpoints:
│   ├─ POST /api/auth/login
│   ├─ POST /api/auth/logout
│   ├─ POST /api/auth/refresh
│   └─ POST /api/auth/reset-password
├─ Funcionalidad: JWT + bcrypt + Rate limiting
├─ Testing: Unit tests (>80% coverage)
├─ Responsable: Dev 2
└─ Tiempo: 8 horas

TAREA 2.2: Frontend - Login page
├─ Componentes: Formulario login, error handling
├─ Validación: Email format, password requirements
├─ Testing: Component tests
├─ Responsable: Dev 1
└─ Tiempo: 6 horas

TAREA 2.3: Backend - List expedientes endpoint
├─ Endpoint: GET /api/expedientes
├─ Funcionalidad: Retorna expedientes del cliente autenticado
├─ Filtrado: Por cliente_id del JWT
├─ Testing: Tests para verificar seguridad
├─ Responsable: Dev 2
└─ Tiempo: 4 horas

TAREA 2.4: Frontend - Dashboard básico
├─ Componentes: Tabla de expedientes, navigation
├─ Features: Click para ver detalles (mock data aún)
├─ Styling: Bootstrap / Tailwind
├─ Responsable: Dev 1
└─ Tiempo: 6 horas

TAREA 2.5: Testing integration básico
├─ Test: Login → Ver dashboard
├─ Test: Logout → Redirect a login
├─ Responsable: Dev 1 + 2
└─ Tiempo: 3 horas

WEEK 2 TOTAL: 27 horas
GOAL: Autenticación funcional + dashboard básico


═══════════════════════════════════════════════════════════════

SEMANA 3: DETALLE DE EXPEDIENTE & DOCUMENTOS
─────────────────────────────────────────────────────────────

TAREA 3.1: Backend - Detalle expediente endpoint
├─ Endpoint: GET /api/expedientes/:id
├─ Retorna: Datos completos + documentos + timeline
├─ Seguridad: Verificar que cliente_id coincide
├─ Responsable: Dev 2
└─ Tiempo: 5 horas

TAREA 3.2: Backend - Descarga de documentos (presigned URL)
├─ Endpoint: GET /api/documentos/:id
├─ Retorna: Presigned URL de S3
├─ Validación: Documento pertenece a cliente
├─ Responsable: Dev 2
└─ Tiempo: 4 horas

TAREA 3.3: Frontend - Página de detalle expediente
├─ Componentes: Header, estado, documentos, timeline
├─ Funcionalidad: Click para descargar
├─ Responsable: Dev 1
└─ Tiempo: 8 horas

TAREA 3.4: Frontend - Componente PDF viewer
├─ Funcionalidad: Preview de PDF en navegador
├─ Fallback: Descarga si preview no funciona
├─ Responsable: Dev 1
└─ Tiempo: 4 horas

TAREA 3.5: Auditoría logging
├─ Funcionalidad: Log todos los accesos
├─ Tabla: audit_logs con user_id, action, timestamp
├─ Responsable: Dev 2
└─ Tiempo: 3 horas

TAREA 3.6: Testing E2E
├─ Test: Login → Ver expediente → Descargar documento
├─ Tool: Cypress
├─ Responsable: Dev 1
└─ Tiempo: 4 horas

WEEK 3 TOTAL: 28 horas
GOAL: Funcionalidad completa de cliente


═══════════════════════════════════════════════════════════════

SEMANA 4: SEGURIDAD, TESTING, & DEPLOYMENT
─────────────────────────────────────────────────────────────

TAREA 4.1: Seguridad - Full audit
├─ Review: HTTPS, JWT, bcrypt, SQL injection prevention
├─ Testing: Security scans (npm audit, SonarQube)
├─ Responsable: Dev 2
└─ Tiempo: 4 horas

TAREA 4.2: Performance optimization
├─ Medidas: Minify, compress, cache optimization
├─ Testing: Lighthouse scores
├─ Target: >90 score
├─ Responsable: Dev 1
└─ Tiempo: 4 horas

TAREA 4.3: Testing - Casos límite & errores
├─ Test: Password reset, JWT expiry, permisos
├─ Test: Database errors, network failures
├─ Coverage: >85% del código
├─ Responsable: Dev 1 + 2
└─ Tiempo: 6 horas

TAREA 4.4: Documentación final
├─ API docs: OpenAPI/Swagger
├─ User guide: Cómo usar portal
├─ Admin guide: Gestión de clientes
├─ Responsable: Dev 1
└─ Tiempo: 4 horas

TAREA 4.5: Staging deployment
├─ Deploy: A staging environment
├─ Testing: Smoke tests en staging
├─ Sign-off: Product manager aprueba
├─ Responsable: Dev 2
└─ Tiempo: 3 horas

TAREA 4.6: Buffer & fixes
├─ Reserva: Para bugs encontrados
├─ Responsable: Dev 1 + 2
└─ Tiempo: 4 horas

WEEK 4 TOTAL: 25 horas
GOAL: Producto listo para production


RESUMEN:
├─ Total horas: 93 horas (poco más de 2 semanas x 2 devs)
├─ Devs: 2 (frontend specialist + backend specialist)
├─ Costo estimado: $15K (93 horas × $160/hora)
├─ Timeline: 4 semanas
└─ Entrega: MVP funcional en producción
```

### BLOQUE 6: LANZAMIENTO & MONITOREO

**Mejora del original:**
```
ANTES DE LANZAR (Pre-Launch Checklist):

☐ FUNCIONALIDAD
  ☐ Todos los features del MVP funcionan
  ☐ No hay bugs críticos
  ☐ Tests pasan (>85% coverage)
  ☐ Performance está dentro de targets
  ☐ Todos los casos límite handled

☐ SEGURIDAD
  ☐ HTTPS/TLS configurado
  ☐ Contraseñas hasheadas (bcrypt)
  ☐ JWT implementado correctamente
  ☐ SQL injection prevención verificada
  ☐ XSS prevention implementada
  ☐ CSRF tokens en forms
  ☐ Rate limiting funciona
  ☐ Auditoría logging active
  ☐ Datos personales protegidos (LGPD)

☐ INFRAESTRUCTURA
  ☐ Database backups funcionando
  ☐ Monitoring & alerting configurado
  ☐ Logs centralizados
  ☐ CDN configurado
  ☐ Load balancer testeado
  ☐ Auto-scaling policies setup

☐ DOCUMENTACIÓN
  ☐ API documentation completa
  ☐ User guide escrito
  ☐ Admin manual escrito
  ☐ Runbook para ops team
  ☐ Incident response plan

☐ PREPARACIÓN USUARIO
  ☐ Email de bienvenida preparado
  ☐ Tutorial de cómo usar
  ☐ Support email / phone ready
  ☐ FAQ preparado
  ☐ Training completado (team interno)

☐ GO/NO-GO DECISION
  ☐ Product manager: Aprobado
  ☐ Tech lead: Aprobado
  ☐ Security review: Aprobado
  ☐ Operations: Aprobado
  ☐ Management: Aprobado
  └─ DECISION: ✅ GO LIVE


LANZAMIENTO (Go-Live):

DÍA 1: SOFT LAUNCH (50% de clientes)

├─ Fase 1: Notificar a subset de clientes
│   └─ Email: "Tenemos nueva portal. ¿Quieres probar?"
│   └─ Target: 50 clientes (representativos)
│
├─ Fase 2: Monitoreo 24/7
│   ├─ Team on-call disponible
│   ├─ Verificar: Usuarios pueden login
│   ├─ Verificar: Pueden ver expedientes
│   ├─ Verificar: Pueden descargar documentos
│   ├─ Verificar: No hay errores 5xx
│   ├─ Verificar: Performance OK (<1 segundo)
│   └─ Verificar: 0 security incidents
│
├─ Fase 3: Feedback de usuarios
│   ├─ Enviar encuesta: "¿Qué te parece?"
│   ├─ Monitorear Slack/email para complaints
│   ├─ Registrar bugs reportados
│   └─ Priorizar fixes críticos
│
└─ Duración: 2-3 días


DÍA 4-7: RAMP UP (100% de clientes)

├─ Fase 1: Análisis de soft launch
│   ├─ Métricas: ¿Cuántos users activos?
│   ├─ Métricas: ¿Qué features más usados?
│   ├─ Bugs: ¿Cuántos y qué severidad?
│   ├─ Decisión: ¿Proceder a 100%?
│   └─ Si problemas: Aplica fixes antes
│
├─ Fase 2: Lanzamiento a 100% de clientes
│   ├─ Enviar email a todos: "Portal disponible para todos"
│   ├─ Publicar en website
│   ├─ Anunciar en social media
│   └─ Notificar a abogados que clientes lo usan
│
├─ Fase 3: Monitoreo intensivo
│   ├─ Doblar el team on-call
│   ├─ Verificar uptime cada 15 minutos
│   ├─ Estar listo para rollback si falla
│   └─ Duración: 1 semana


DESPUÉS DEL LANZAMIENTO (Post-Launch):

SEMANA 1:
├─ Daily standup con team
├─ Monitoreo de bugs/feedback
├─ Fixes de bugs críticos (same day)
├─ Fixes de bugs menores (en backlog)
└─ Suporte al usuario (email, teléfono)

SEMANA 2-4:
├─ Menos monitoreo (cada 4 horas)
├─ Bug fixes semanal
├─ Performance monitoring
├─ User adoption metrics
└─ Feedback collection para v1.1

SEMANA 5+:
├─ Mantenimiento normal
├─ Bugs asignados por sprint
├─ Planning para features v1.1
└─ Monthly retrospective


MÉTRICAS DE ÉXITO (Primeras 2 semanas):

☐ ADOPCIÓN
  ├─ Target: 70% de clientes se loguean al menos 1x
  ├─ Métrica: User logins / Total clientes
  └─ Rojo: <50% → Problema de usabilidad

☐ SATISFACCIÓN
  ├─ Target: NPS >7/10
  ├─ Medición: Encuesta post-uso
  └─ Rojo: <6/10 → Requiere mejoras

☐ CONFIABILIDAD
  ├─ Target: 99.5% uptime
  ├─ Métrica: Downtime / Total time
  └─ Rojo: <99% → Problema infraestructura

☐ SEGURIDAD
  ├─ Target: 0 data breaches
  ├─ Métrica: Security incidents
  └─ Rojo: >0 → Incident response

☐ PERFORMANCE
  ├─ Target: <1 segundo response time (95%)
  ├─ Métrica: Latency percentiles
  └─ Rojo: >2 segundos → Optimization needed


CONTINGENCY PLAN (Si algo falla):

ESCENARIO 1: Portal está caído
├─ Acción: Rollback a versión anterior (1 click)
├─ Notificación: Email a clientes "Portal en mantenimiento"
├─ Investigación: Qué causó la caída
├─ Fix: Deploy hotfix
├─ Re-launch: Cuando está estable

ESCENARIO 2: Brecha de seguridad
├─ Acción: INMEDIATO shutdown de feature vulnerable
├─ Notificación: Equipo legal, compliance, clientes
├─ Investigación: Qué fue comprometido
├─ Medidas: Encriptación, password reset, monitoring
├─ Fix: Security patch
├─ Re-launch: Después de validación

ESCENARIO 3: Bajo adoption (<50%)
├─ Acción: No es crítico (aún es v1)
├─ Investigación: Por qué clientes no usan
├─ Soluciones: Tutorial, email reminder, usability fixes
├─ Espera: 2 semanas más para medir progreso
├─ Decision: Iteración rápida vs strategy change

ESCENARIO 4: Performance pobre (>3 segundos)
├─ Acción: Investigar bottleneck
├─ Posibles causas: Database query lenta, network
├─ Solución: Caching, query optimization, load balancer
├─ Deploy: Fix en <4 horas
└─ Monitoreo: Verificar que se resuelve
```

### BLOQUE 7: ITERACIÓN Y ESCALADO (V1.1+)

**Mejora del original:**
```
DESPUÉS DE 2 SEMANAS DE MVP EXITOSO:

Features para V1.1 (Próximas 4 semanas):

☐ FEATURE 1: Push notifications
  ├─ Descripción: Notificar cliente cuando hay cambio en expediente
  ├─ Valor: Cliente NO tiene que hacer login cada día
  ├─ Esfuerzo: 2 semanas (1 dev)
  ├─ Dependencia: Firebase Push (service externo)
  └─ Prioridad: ALTA

☐ FEATURE 2: Email notifications
  ├─ Descripción: Enviar email resumen de expedientes
  ├─ Valor: Cliente recibe updates sin portal
  ├─ Esfuerzo: 1 semana
  ├─ Dependencia: SendGrid
  └─ Prioridad: MEDIA

☐ FEATURE 3: Mobile app (React Native)
  ├─ Descripción: App nativa para iOS + Android
  ├─ Valor: Acceso más conveniente para clientes
  ├─ Esfuerzo: 6-8 semanas
  ├─ Dependencia: React Native setup + Apple/Google review
  └─ Prioridad: MEDIA (después de v1.0 estable)

☐ FEATURE 4: Mensajes entre abogado y cliente
  ├─ Descripción: Chat simple en portal
  ├─ Valor: Comunicación sin email
  ├─ Esfuerzo: 3 semanas
  ├─ Dependencia: WebSocket o polling
  └─ Prioridad: BAJA (MVP no necesita esto)


MONITOREO CONTINUO:

├─ Weekly Analytics Review:
│   ├─ # activos users
│   ├─ Engagement (% usando features)
│   ├─ Performance (latency, errors)
│   ├─ Bugs (# new, # resolved)
│   └─ User feedback (sentiment analysis)
│
├─ Monthly Retrospective:
│   ├─ What went well
│   ├─ What could improve
│   ├─ Next priorities
│   └─ Resource allocation for next month
│
└─ Quarterly Planning:
    ├─ Major features for Q3
    ├─ Technical debt to address
    ├─ Infrastructure improvements
    └─ Team growth / hiring


ESCALABILIDAD:

Si usuarios crecen 10x:

├─ Database: Particionar datos
├─ Cache: Aumentar Redis memory
├─ Frontend: CDN global
├─ Backend: Horizontal scaling (más servers)
├─ Infrastructure: Kubernetes auto-scaling
├─ Monitoring: Más granular (per-endpoint metrics)
└─ Team: Contratar +1-2 devs

Cost estimate: +$5K/mes en infraestructura
```

---

## 🎯 CASO DE USO: PORTAL DE CLIENTES JAC

```
APLICANDO ESTE PROMPT A PORTAL CLIENTE JAC:

IDEA: "Portal donde clientes ven estado de expediente en tiempo real"

PASO 1: VALIDAR IDEA
├─ Problema es real: SÍ (clientes llaman 10x/mes)
├─ MVP es pequeño: SÍ (3-4 features main)
├─ Viabilidad: SÍ (team puede hacerlo)
├─ Riesgos: Manejables (datos sensibles)
└─ DECISIÓN: ✅ GO

PASO 2: DISEÑAR ARQUITECTURA
├─ Frontend: React web + opcional mobile después
├─ Backend: Node.js + Express
├─ BD: PostgreSQL existente
├─ Seguridad: JWT + bcrypt + RBAC
└─ Infraestructura: AWS (existente)

PASO 3: MVP FEATURES
├─ Login (email + password)
├─ Ver lista de expedientes
├─ Ver detalle de expediente (estado + documentos)
├─ Descargar documentos
└─ Logout

PASO 4: DEVELOPMENT
├─ Semana 1: Setup + Auth
├─ Semana 2: Dashboard + Auth
├─ Semana 3: Detalle + Documentos
├─ Semana 4: Seguridad + Testing + Deploy
└─ Total: 4 semanas

PASO 5: LANZAMIENTO
├─ Soft launch: 50 clientes (2-3 días)
├─ Full launch: 100% clientes (después de fixes)
├─ Monitoreo: 24/7 primera semana
└─ Success metric: 70% adoption, NPS >7

PASO 6: ITERACIÓN
├─ V1.1: Push notifications
├─ V1.2: Email alerts
├─ V2.0: Mobile app
└─ V3.0: Chat entre abogado + cliente
```

---

**JAC - Abogados Asociados**  
**Construcción de Productos de IA**  
**Versión 2.0 - Prompt Mejorado**  
**Última actualización: 15/08/2026**
