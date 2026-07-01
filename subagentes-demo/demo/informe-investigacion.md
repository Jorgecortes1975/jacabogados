# Informe de investigación — jacabogados

Generado lanzando **3 subagentes en paralelo** (patrón "al vuelo"), cada uno
mirando una faceta distinta del proyecto. Al agente principal solo le llegó
la señal de cada uno (la sección "Conclusión" de cada informe), no el
proceso de búsqueda completo.

> Nota de los propios subagentes: en este entorno no tuvieron acceso a
> búsqueda web en tiempo real, así que las respuestas se basan en
> conocimiento general de arquitecturas SaaS y normativa española/UE, no en
> fuentes verificadas en vivo. Antes de tomar decisiones de producto o
> legales reales, conviene contrastar con fuentes actualizadas y con un
> profesional legal.

## 1. Stack técnico

Recomendación: **NestJS (TypeScript) + PostgreSQL con Row Level Security
para aislamiento multi-tenant + Auth0/Supabase Auth para autenticación +
hosting en Render/Fly.io (región UE)**.

Esta combinación minimiza carga operativa para un equipo pequeño, delega
seguridad crítica (MFA, sesiones, recuperación de contraseña) a proveedores
especializados, y facilita cumplir requisitos de residencia de datos y
RGPD al manejar expedientes legales sensibles en España.

## 2. Cumplimiento legal y protección de datos

Requisitos que deben condicionar el diseño técnico desde el día uno:

- Cifrado extremo a extremo de documentos y comunicaciones (secreto
  profesional del abogado, más estricto que el RGPD).
- Control de acceso granular por expediente/caso, no solo por rol.
- Logs de auditoría inmutables (trazabilidad exigida por el principio de
  responsabilidad proactiva del RGPD).
- Motor de retención y bloqueo de expedientes configurable (no borrado
  automático ni conservación indefinida).
- Alojamiento en UE/EEE con contrato de encargado de tratamiento si se usa
  cloud de terceros.

## 3. Funcionalidades base del MVP

Orden de prioridad recomendado:

1. Gestión de expedientes/casos (núcleo del sistema).
2. Gestión de clientes (CRM básico, personas físicas y jurídicas).
3. Plazos y calendario procesal — crítico por el riesgo de responsabilidad
   civil del abogado ante un plazo perdido.
4. Gestión documental (repositorio por expediente, versionado).
5. Facturación y control de horas por expediente.
6. Comunicación con clientes (portal o notificaciones).

Integraciones como LexNET, firma electrónica o BI avanzado pueden
posponerse a fases posteriores del producto.

## Conclusión del orquestador

Con tres subagentes trabajando en paralelo se obtuvo, en menos de un
minuto, una base técnica + legal + funcional coherente para arrancar
"jacabogados", sin que el agente principal tuviera que leer ningún proceso
de búsqueda intermedio — solo las conclusiones ya filtradas.
