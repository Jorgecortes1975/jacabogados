# Librería de Respuestas a Cuestionarios de Seguridad — JA Abogados

Acumular aquí respuestas verificadas a cuestionarios de proveedores. Reutilizable entre clientes.
Formato: `## Tema\n**Q:** Pregunta\n**A:** Respuesta verificada\n(última actualización: YYYY-MM-DD)`

## Control de Acceso

**Q: ¿Requieren MFA en todas las cuentas admin?**  
A: Sí. MFA requerido en todas las cuentas admin de producción (AWS, GitHub, Google Workspace, DocuSign) a través de autenticación basada en tiempo (TOTP) o hardware keys. Reforzado desde junio 2026.

**Q: ¿Cómo manejan privilegios de acceso para personal?**  
A: Modelo RBAC (Role-Based Access Control). Acceso otorgado por necesidad de función (principle of least privilege). Auditoría de acceso trimestral. Revocación inmediata al salir personal.

**Q: ¿Existe control de acceso físico a servidores?**  
A: N/A — infraestructura 100% en la nube (AWS, Google Cloud). Servidores alojados en data centers certificados SOC 2 Type II.

## Autenticación

**Q: ¿Contraseñas se almacenan en plain text?**  
A: No. Hash bcrypt (salt + 12 rounds) en todos los sistemas. Contraseñas + MFA requeridas. Política mínima 12 caracteres complejos.

**Q: ¿Cada cuánto se requiere cambio de contraseña?**  
A: Anualmente (policy mínima). Cambio inmediato si breach detectada o sospecha compromiso.

## Datos en Reposo

**Q: ¿Cómo se encriptan datos de clientes en reposo?**  
A: AES-256. Encriptación manejada por proveedores cloud (AWS KMS, Google Cloud KMS) con claves rotadas automáticamente. Clientes datos almacenados en Bases de Datos (RDS/PostgreSQL) o Cloud Storage con encriptación en reposo habilitada.

**Q: ¿Dónde residen los datos?**  
A: Primariamente en **Región us-east-1 (N. Virginia, USA)** o **us-west-2 (Oregon, USA)** según preferencia cliente. Datos de clientes con requisitos UE pueden residir en **eu-west-1 (Irlanda)** bajo configuración específica GDPR.

## Datos en Tránsito

**Q: ¿Encriptación TLS/SSL?**  
A: Sí. TLS 1.2+ para todas las conexiones en tránsito. Certificados HTTPS válidos, sin SSL/TLS débiles habilitadas. Auditoría semestral con tools como SSL Labs.

**Q: ¿Qué tal conexiones internas (microservicios)?**  
A: Conexiones internas entre servicios usan mTLS (mutual TLS). API endpoints requieren bearer tokens con expiración < 1 hora.

## Residencia de Datos

**Q: ¿Pueden requisitar datos de clientes bajo GDPR/CCPA?**  
A: Bajo GDPR (clientes en UE), datos pueden solicitarse por autoridad competente bajo artículos 15–22. Notificamos a cliente antes de otorgar acceso (salvo prohibición legal). Bajo CCPA (datos calif.), derecho de acceso/eliminación dentro de 45 días. En **Colombia** bajo Ley SGDR, SIC tiene derecho auditoría.

**Q: Transferencias internacionales de datos?**  
A: GDPR → Cláusulas de Contratación Estándar (SCC) 2021 vigentes. Assessments riesgo actualizados post-Schrems II. CCPA → Asignación de responsabilidades bajo CCPA §1798.100 et seq. LGPD (si Brasil) → LGPD Art. 33 + cláusulas modelo.

## Subprocesadores

**Q: ¿Quién más accede a datos de clientes?**  
A: Solo subprocesadores listados en nuestra **Política de Privacidad** y actualizados mensualmente. Incluye:
- AWS (infraestructura)
- Google Workspace (colaboración inteligencia)
- Stripe (procesamiento pagos)
- Intercom (soporte cliente)
- Segment (analítica)
Todos con DPA/cláusulas de procesamiento vigentes.

**Q: Derecho a auditar subprocesadores?**  
A: Sí. Derecho a auditoría de subprocesadores críticos (AWS, Stripe). Auditorías SOC 2 Type II disponibles bajo confidencialidad NDA.

## Backup / Recuperación Desastres

**Q: ¿Backup de datos?**  
A: Backups automáticos diarios a almacenamiento redundante (AWS S3 cross-region replication). RPO < 24 horas, RTO < 4 horas.

**Q: ¿Plan de recuperación ante desastres (DR)?**  
A: Sí. DR plan documentado, testeado semestralmente. Failover automático a región secundaria en caso de outage región primaria.

## Respuesta a Incidentes

**Q: Protocolo de breach de datos?**  
A: Sí. Detectamos anómalías 24/7. En caso breach:
1. Contención inmediata (< 2 horas)
2. Análisis forense + scoping (< 24 horas)
3. Notificación a cliente (< 24 horas si datos PII; < 5 días si riesgo bajo bajo Ley SGDR)
4. Reporte a autoridades si requerido (SIC, GDPR si UE)

**Q: Equipo de respuesta?**  
A: Equipo IR dedicado + CTO oversight. Terceros DFIR contratados si necesario.

## Desarrollo Seguro

**Q: ¿SDLC (Secure Development Lifecycle)?**  
A: Sí. Code review obligatorio pre-merge. Tests de seguridad (SAST/DAST) en CI/CD. Scanning dependencias (Dependabot) automático.

**Q: ¿Gestión de vulnerabilidades?**  
A: Bug bounty responsable (HackerOne). Vulnerabilidades resueltas en SLA:
- Critical: < 24 horas
- High: < 1 semana
- Medium: < 2 semanas
- Low: < 1 mes

## Logging / Monitoreo

**Q: ¿Logs de acceso auditables?**  
A: Sí. Logs de acceso admin + cambios de datos almacenados en CloudTrail (AWS) o Cloud Logging (GCP) con retención ≥ 90 días. Análisis SIEM automático de patrones anómalos.

**Q: ¿Alertas en tiempo real?**  
A: Sí. Alertas para login fallidos recurrentes, cambios de permisos, acceso datos sensibles. Escalada automática si umbrales superados.

## Seguridad de Personal

**Q: ¿Verificación de antecedentes?**  
A: Sí. Verificación de antecedentes + referencias para personal con acceso datos/sistemas.

**Q: ¿Capacitación de seguridad?**  
A: Anual, obligatoria. Incluye GDPR, phishing, social engineering, manejo datos. Recordatorios mensuales.

**Q: ¿Offboarding?**  
A: Revocación inmediata de acceso al salir. Auditoría post-departure (30 días).

## Seguridad Física

**Q: Servidores físicos?**  
A: N/A — 100% cloud hosted. Data centers certificados SOC 2 II, ISO 27001.

## Certificaciones de Cumplimiento

**Q: ¿SOC 2 Type II?**  
A: Actualmente en programación. Esperado Q4 2026. (Última disponible: reporte de pruebas internas)

**Q: ¿ISO 27001?**  
A: Targetear 2027. Estándares ISO 27001:2022 implementándose.

**Q: ¿HIPAA?**  
A: N/A — no maneja Protected Health Information (PHI). Si cliente requiere: escalada a especialista + BAA.

**Q: ¿PCI DSS?**  
A: N/A — no almacenamos números de tarjeta (tokenización Stripe). Stripe es PCI DSS 3.2.1 compliant.

## IA / Modelos Lingüísticos

**Q: ¿Usan datos clientes para entrenar modelos IA?**  
A: No. Datos clientes NUNCA usados para entrenar modelos. Herramientas IA (Claude, GPT) usadas solo en modo "no datos de entrenamiento" con contractualmente vinculadas cláusulas de no-training.

**Q: ¿Qué procesos usan IA?**  
A: Análisis de documentos legales, extracción de información, redacción de borrador (siempre revisado por humano). Todas las salidas auditadas antes de usar.

## Acceso a Datos Soporte

**Q: ¿Soporte técnico accede datos de clientes?**  
A: Raramente, solo con consentimiento explícito + autorización. Todos los accesos auditados. MFA + logging obligatorio.

## Retención y Eliminación

**Q: ¿Cuánto se retienen datos después de eliminar cuenta?**  
A: Datos eliminados inmediatamente de sistemas activos. Backups retenidos por 30 días (período de recuperación). Después: eliminación segura (overwrite 7 pasos).

**Q: Derechos de eliminación GDPR?**  
A: Sí. GDPR Art. 17 (derecho al olvido) aplicado en < 30 días. Notificamos terceros (subprocesadores) de eliminación.

---

**Última actualización global**: 2026-08-02  
**Próxima revisión**: 2026-10-02
