# Fase 1 — Instrucciones de Envío de Seguimientos

**Archivos de seguimiento:**
- `2026-09-21-FASE1-SEGUIMIENTO-1.csv` — Máximo 50 palabras
- `2026-09-21-FASE1-SEGUIMIENTO-2.csv` — Máximo 35 palabras

---

## Protocolo de Seguimientos

### Regla de Oro

**SOLO envía seguimiento si no hay respuesta del correo inicial.**

Si la empresa responde al correo inicial, aunque sea para decir que no está interesada, **retírala de toda secuencia de seguimiento** — se acabó.

---

## Seguimiento 1 — Día 3 Hábil

**Cuándo:** 3 días hábiles después de enviar el correo inicial (no 3 días calendario)

Ejemplo:
- Correo inicial enviado: lunes 21 de septiembre
- Seguimiento 1 enviado: jueves 24 de septiembre

**Quién:** Solo empresas que NO respondieron

**Cómo:**

1. Abre Gmail
2. Nuevo correo
3. Copia dirección de email de columna `email_contacto` en `2026-09-21-FASE1-SEGUIMIENTO-1.csv`
4. Asunto: **(SEGUIMIENTO)** — Análisis de cumplimiento en seguridad social
5. Cuerpo: Copia el texto de columna `cuerpo_seguimiento_1`
6. Envía

**Tono:** Más directo que el inicial. Refuerza el riesgo específico de la empresa. Propone tiempo concreto.

**Wordcount:** Máximo 50 palabras — todos cumplidos en el CSV.

---

## Seguimiento 2 — Día 7 Hábil

**Cuándo:** 7 días hábiles después de enviar el correo inicial

Ejemplo:
- Correo inicial enviado: lunes 21 de septiembre
- Seguimiento 2 enviado: lunes 28 de septiembre

**Quién:** Solo empresas que:
- No respondieron al correo inicial
- No respondieron al Seguimiento 1

**Cómo:**

1. Abre Gmail
2. Nuevo correo
3. Copia dirección de email
4. Asunto: **(ÚLTIMO LLAMADO)** — Sesión de cumplimiento en seguridad social
5. Cuerpo: Copia texto de columna `cuerpo_seguimiento_2`
6. Envía

**Tono:** Urgencia máxima. Síntesis del riesgo. Opción de tiempo muy específica ("¿mañana o el martes?").

**Wordcount:** Máximo 35 palabras — todos cumplidos en el CSV.

**Después de esto:** Se acabó. No hay Seguimiento 3. El prospecto pasa a categoría "sin respuesta — esperar 30 días antes de recontactar".

---

## Registro de Seguimientos

Actualiza `2026-09-21-FASE1-tracking-respuestas.csv` con estas columnas adicionales:

| Columna | Contenido | Ejemplo |
|---------|-----------|---------|
| `fecha_seguimiento_1_enviado` | Fecha exacta Seguimiento 1 | 2026-09-24 |
| `fecha_seguimiento_2_enviado` | Fecha exacta Seguimiento 2 | 2026-09-28 |
| `respondio_a_seguimiento_1` | Sí/No | No |
| `respondio_a_seguimiento_2` | Sí/No | Sí |
| `fecha_respuesta_seguimiento_2` | Fecha de respuesta a Seguimiento 2 | 2026-09-29 |
| `respuesta_seguimiento_2` | Contenido breve de la respuesta | "Enviamos RRHH a revisión de costos" |
| `decision_final` | Conversión/No interesado/Sin respuesta | Conversión pendiente |

---

## Casos Especiales

### Caso 1: Respuesta a Seguimiento 1

Si la empresa responde al Seguimiento 1:
- No envíes Seguimiento 2
- Registra respuesta en tracking.csv
- Cambia estado a "conversación abierta" en ya-contactados.csv
- Procede con ciclo de ventas normal

### Caso 2: Rechazo Explícito

Si la empresa responde "no estamos interesados" o similar:
- No envíes más seguimientos
- Registra en no-contactar.csv con razón "Explícitamente rechazaron"
- Cierra para esta empresa

### Caso 3: Respuesta Automatizada

Si recibe autoresponder ("fuera de oficina", "vacaciones"):
- Procede a enviar Seguimiento 2 normalmente (espera a que vuelvan)
- Registra que fue autoresponder en tracking.csv

### Caso 4: Bounce de Email

Si el correo rebota:
- Marca como "bounce" en tracking.csv
- Investiga email correcto en LinkedIn/web
- Si encuentras nuevo email: re-envía correo inicial a nueva dirección (comienza desde cero)
- Si no encuentras: descarta empresa

---

## Métricas a Medir (Después de Seguimiento 2)

Después de 7 días hábiles (28 de septiembre):

1. **Tasa de respuesta a inicial:** X de 15 respondieron
2. **Tasa de respuesta a Seguimiento 1:** Y de (15-X) respondieron
3. **Tasa de respuesta a Seguimiento 2:** Z de (15-X-Y) respondieron
4. **Tasa de conversión total:** (X+Y+Z) / 15 = %
5. **Tasa de rechazo explícito:** Cuántos dijeron "no"
6. **Sin respuesta:** 15 - (X+Y+Z) = no respondieron nunca

**Objetivo mínimo:** 3+ respuestas = Perfil cliente válido
**Objetivo máximo:** 5+ respuestas = Perfil cliente sólido

---

## Checklist de Envío

- [ ] Correo inicial enviado a 15 empresas (21 sept)
- [ ] Registradas fechas de envío en tracking.csv
- [ ] Esperar a día 3 hábil (24 sept)
- [ ] Filtrar empresas sin respuesta
- [ ] Enviar Seguimiento 1 a empresas sin respuesta
- [ ] Registrar envío en tracking.csv
- [ ] Esperar a día 7 hábil (28 sept)
- [ ] Filtrar empresas que siguen sin respuesta (ni inicial, ni Seguimiento 1)
- [ ] Enviar Seguimiento 2 a esas empresas
- [ ] Registrar envío en tracking.csv
- [ ] Contar total de respuestas y conversiones
- [ ] Actualizar memoria/bitacora.md con resultados

---

**Última actualización:** 2026-09-21  
**Próximo hito:** 28 de septiembre (medición final Phase 1)
