---
name: seguimiento-plazos-procesales
description: Monitorea vencimientos de plazos procesales en casos activos. Calcula fechas clave, genera alertas y previene caducidades. Usar semanal o mensual para cada caso en progreso. Perder un plazo = perder el caso.
---

# Skill: Seguimiento de Plazos Procesales

## Objetivo

Prevenir que **pierda un plazo procesal** en cualquier caso activo.

En derecho procesal, perder un plazo es **perder el caso** (caducidad = muerte procesal).

Esta skill mantiene un sistema de alertas y recordatorios para cada caso.

---

## Cuándo usar esta skill

✓ **Semanal:** Para casos en pleito activo (demanda presentada)
✓ **Mensual:** Para revisar todos los casos a la vez
✓ **Cuando algo sucede:** Siempre que hay movimiento del juzgado
✓ **Antes de vacaciones:** Doble verificación de plazos
✓ **Cuando cliente pregunta:** "¿Cuál es la próxima fecha?"

❌ **No usar para:**
- Casos cerrados (archivo definitivo)
- Consultas iniciales (aún no hay plazos)

---

## Instrucciones paso a paso

### PASO 1: Identifica rama y procedimiento

Crea tabla para cada caso:

```
CASO: ____________________________________
Cliente: _______________________________
Rama: ☐ Civil ☐ Penal ☐ Laboral ☐ Admin ☐ Comercial
Procedimiento: ☐ Ordinario ☐ Sumario ☐ Verbal ☐ Admin
Juzgado: __________________________________
Número de radicado: _______________________
```

**Cada rama tiene plazos diferentes.** Por ejemplo:
- Civil ordinario: 3 años de tramite (muchos plazos intermedios)
- Laboral sumario: 4 meses máximo
- Penal: depende de etapa

---

### PASO 2: Obtén plazos según rama

**Consulta códigos colombianos:**

#### Procedimiento Civil (CGP - Ley 1564/2012):

```
DEMANDA PRESENTADA
☐ Juzgado notifica demanda al demandado → Plazo: 5 días
☐ Demandado puede allanarse → Plazo: Dentro de 5 días de notificado
☐ Demandado contesta demanda → Plazo: 20 días hábiles
☐ Demandado puede reconvenir → Plazo: Junto con contestación
☐ Demandante replica → Plazo: 10 días hábiles después notif. contestación
☐ Audiencia de prueba → Juzgado fija fecha (máx 60 días después)
☐ Sentencia → Juzgado dicta (máx 120 días después de audiencia)

PLAZO TOTAL ORDINARIO: 3 años
```

#### Procedimiento Laboral (Ley 1149/2007):

```
DEMANDA PRESENTADA
☐ Juzgado notifica → Plazo: 5 días
☐ Demandado contesta → Plazo: 10 días hábiles
☐ Audiencia única → Se cita con max 30 días
☐ En audiencia: se desahogan todas las pruebas (TODO en 1 audiencia)
☐ Sentencia → Juzgado dicta dentro de 60 días de audiencia

PLAZO TOTAL SUMARIO: 4 meses máx
```

#### Procedimiento Penal (Código Penal - Ley 906/2004):

```
INVESTIGACIÓN
☐ Fiscalía tiene 60 días para investigar
☐ Puede solicitar prórroga (máx 60 días más)

ETAPA INTERMEDIA
☐ Audiencia preparatoria: Dentro de 60 días de investigación

JUZGAMIENTO
☐ Audiencia de juzgamiento: Dentro de 90 días de audiencia intermedia

PLAZO TOTAL: 1-2 años según complejidad
```

#### Procedimiento Administrativo (CPACA - Ley 1437/2011):

```
ACCIÓN CONTENCIOSO ADMINISTRATIVA
☐ Demanda presentada → Juzgado tiene 10 días para admitir
☐ Si falta algo → Devuelve (no se admite)
☐ Demanda admitida → Se notifica al demandado
☐ Demandado contesta → Plazo: 30 días hábiles
☐ Pruebas → Se desahogan en audiencia
☐ Sentencia → Juzgado dicta

PLAZO TOTAL: 2-3 años
```

**Referencia:** Skill `redaccion-legal-colombia` tiene detalle de plazos por rama

---

### PASO 3: Construye Calendario de Plazos del Caso

Para cada caso, crea tabla con **FECHAS CLAVE:**

```
CALENDARIO DE HITOS — CASO: [Cliente]

| Evento | Fecha Real | Plazo Máx | Plazo Vence | Estado | Alerta |
|--------|-----------|-----------|------------|--------|--------|
| Demanda presentada | 01-08-2025 | N/A | N/A | ✓ Hecho | |
| Notif. demandado | 05-08-2025 | 5d | 10-08-2025 | ✓ Hecho | |
| Contestación demandado | -------- | 20 dhábiles | 30-09-2025 | ⏳ Pendiente | 🔴 7 días |
| Audiencia prueba | -------- | 60d máx | 05-11-2025 | ⏳ Pendiente | 🟡 20 días |
| Sentencia | -------- | 120d máx | 05-03-2026 | ⏳ Pendiente | 🟢 Seguro |
| Apelación (si aplica) | -------- | 10d | -------- | ⏳ Pendiente | |
```

**Colores:**
- 🔴 ROJO = Hoy o mañana (actúa YA)
- 🟠 NARANJA = Esta semana (atención urgente)
- 🟡 AMARILLO = En 2-4 semanas (prepararse)
- 🟢 VERDE = Seguro (no hay prisa)

---

### PASO 4: Identifica Plazos de Mi Despacho (Obligaciones Nuestras)

No solo son plazos del juzgado. El **despacho también tiene plazos.**

```
PLAZOS QUE LE CORRESPONDEN AL DESPACHO:

CONTESTACIÓN (si soy demandado)
Plazo: 20 días desde notificación
Fecha notificación: ______________
Vence: ______________
Yo debo: ☐ Preparar contestación (10 días antes de vencer)
         ☐ Revisar auditoría cumplimiento
         ☐ Socio aprueba
         ☐ Presentar (1-2 días antes)

PRUEBAS A APORTAR
Plazo: Normalmente 5 días antes de audiencia
Fecha audiencia: ______________
Vence: ______________
Yo debo: ☐ Compilar todas las pruebas
         ☐ Verificar que están completas
         ☐ Presentar con tiempo

RECURSOS (Apelación, Revisión, Tutela)
Plazo: Varía según recurso (10-15 días típicamente)
Fecha sentencia: ______________
Vence: ______________
Yo debo: ☐ Analizar si apelo
         ☐ Preparar escrito
         ☐ Presentar dentro de plazo

RESPUESTA A DEMANDA RECONVENCIONAL
Plazo: 10 días tras notificación
Fecha notificación: ______________
Vence: ______________
```

---

### PASO 5: Sistema de Alertas Automáticas

Crea un archivo de alertas para **monitoreo semanal:**

**Archivo:** `/casos/[APELLIDO]/[AÑO]-[MES]/alertas_plazos.md`

```markdown
# ALERTAS DE PLAZOS — Caso [Cliente]

## ESTA SEMANA (Rojo 🔴)
- [ ] Contestación vence en 2 días → PREPARE ESCRITO YA
- [ ] Apelación vence mañana → ACTÚE YA

## PRÓXIMAS 2 SEMANAS (Naranja 🟠)
- [ ] Audiencia será en 10 días → Prepare pruebas
- [ ] Respuesta juzgado esperada → Verifique correo diario

## PRÓXIMAS 4 SEMANAS (Amarillo 🟡)
- [ ] Se cumplen 2 meses de demanda → Verificar estado
- [ ] Sentencia esperada en 30 días → Preparar estrategia de apelación

## PRÓXIMAS 8 SEMANAS (Verde 🟢)
- [ ] Todo bajo control

---

## Checklist de esta semana
- [ ] ¿Recibí notificaciones del juzgado?
- [ ] ¿Hay movimiento en el caso?
- [ ] ¿Algún plazo vence esta semana?
- [ ] ¿Cliente debe actuar en algo?

Actualizado: [Fecha]
Próxima revisión: [Fecha + 7 días]
```

---

### PASO 6: Diferencia Plazos Ordinarios vs. Extraordinarios

Algunos plazos pueden **extenderse.**

```
PLAZO ORDINARIO (plazo normal)
Ejemplo: 20 días para contestar demanda

PRÓRROGA (extensión concedida por juzgado)
Ejemplo: Juzgado concede 10 días más → plazo total 30 días
Acción: Debe solicitarse ANTES de vencer plazo ordinario
Documento: Oficio al juzgado pidiendo prórroga (motivo justificado)

SUSPENSIÓN DE PLAZO (se pausa el reloj)
Ejemplo: Audiencia de conciliación → se suspende término contestación
Acción: Automática según procedimiento
Resultado: El plazo se reanuda desde donde paró

CADUCIDAD (el plazo pasó sin actuar)
Ejemplo: Demandado no contesta en 20 días → Demanda sin contestación
Resultado: Juzgado da por aceptados los hechos (malo para demandado)
         o Nulidad del proceso (malo para todos)

REGLA DE ORO: Nunca confíes en "mañana". Actúa HOY cuando falta 1-2 días.
```

---

### PASO 7: Alertas Específicas por Rama

#### CIVIL ORDINARIO:
```
ALERTA CRÍTICA: Contestación vence
→ Acción: Preparar escrito, auditoría, revisión Socio (3-5 días antes)

ALERTA: Juzgado no fija audiencia en 60 días
→ Acción: Solicitar fijación de audiencia (oficio al juzgado)

ALERTA: Falta información del juzgado
→ Acción: Consultar expediente en línea (SGDE) o presencialmente
```

#### LABORAL SUMARIO:
```
ALERTA CRÍTICA: Todo debe estar listo para audiencia única
→ Acción: Revisar 2 semanas antes que todas las pruebas estén completas

ALERTA: Juzgado no cita audiencia en 30 días
→ Acción: Solicitar señalamiento urgente (laboral es sumario)

ALERTA: Cliente no aparece a audiencia
→ Acción: Comunicar consecuencias ANTES de audiencia
```

#### PENAL:
```
ALERTA: Investigación llega a 120 días (60+prórroga)
→ Acción: Verificar si se presentó acusación o archivo

ALERTA: Acusación presentada
→ Acción: Estudiar acusación, preparar descargos, estrategia defensa

ALERTA: Audiencia intermedia se acerca
→ Acción: Revisar si hay vicios de investigación (motions)
```

---

### PASO 8: Crea Dashboard Mensual

**Cada mes, consolida todos los casos en UNA tabla:**

```markdown
# DASHBOARD DE PLAZOS — [MES/AÑO]

## ALERTAS CRÍTICAS ESTA SEMANA
| Caso | Cliente | Evento | Vence En | Acción |
|------|---------|--------|----------|--------|
| 001 | María G | Contestación | Hoy | Presentar YA |
| 005 | ABC Ltd | Apelación | 3 días | Revisar escrito |

## CASOS CON MOVIMIENTO ESPERADO
| Caso | Cliente | Evento Esperado | Fecha Aprox | Estado |
|------|---------|-----------------|-------------|--------|
| 002 | Juan P | Notif. sentencia | 01-08-2025 | ✓ Listo |
| 008 | Empresa | Audiencia | 15-08-2025 | 🟡 Preparar pruebas |

## CASOS EN TRÁMITE NORMAL
| Caso | Cliente | Última Actividad | Próximo Hito | Tiempo Restante |
|------|---------|-----------------|-------------|-----------------|
| 003 | Rosa M | Contestación 22-07 | Audiencia | ~40 días |
| 010 | Corp XYZ | Demanda 05-07 | Respuesta Juzgado | ~15 días |

## CASOS POR RESOLVER
- [ ] Caso 004: Caso pendiente de sentencia (¿Dónde está?)
- [ ] Caso 007: Cliente no ha enviado documentos (recordar)
```

---

### PASO 9: Sistema de Escaladas

Si un plazo está **por vencer y no actuamos,** escala inmediatamente:

```
PROTOCOLO DE ESCALADA

ROJO 🔴 (Hoy o mañana vence)
→ Comunica al ABOGADO responsable del caso (llamada + email)
→ Si abogado no responde en 1 hora → Socio
→ Acción: Pedir prórroga al juzgado (si aplica) o actuar de emergencia

NARANJA 🟠 (Esta semana)
→ Email al abogado con la fecha específica
→ Recordatorio 3 días antes
→ Revisar que esté avanzando

AMARILLO 🟡 (2-4 semanas)
→ Email informativo
→ Preparación de documentos

VERDE 🟢 (Todo bien)
→ Monitoreo de rutina
```

---

### PASO 10: Auditoría Trimestral de Plazos

Cada trimestre (mes 1, 4, 7, 10), revisa:

```
AUDITORÍA TRIMESTRAL

☐ ¿Algunos casos perdieron plazo? (caducidad)
  Si SÍ → Investigar por qué, crear procedimiento para evitar
  
☐ ¿Hubo apelaciones perdidas?
  Si SÍ → Analizar si era por falta de seguimiento

☐ ¿Hubo prorrogas solicitadas?
  Contar: _____ prorrogas
  Aprendizaje: ¿Podemos ser más ágiles?

☐ ¿Sistema de alertas funciona?
  ¿Recibimos alertas a tiempo? ☐ Sí ☐ No
  Si No → Mejorar sistema

☐ ¿Clientes confirmaron recepciones de alertas?
  Tasa de comunicación: _____%
```

---

## FORMATO DE SALIDA

Cuando revises plazos, entrega:

```markdown
# SEGUIMIENTO DE PLAZOS — [Caso/Cliente]

**Revisión:** [Fecha]
**Abogado responsable:** [Nombre]
**Estado general:** [Verde/Amarillo/Naranja/Rojo]

---

## PLAZOS CRÍTICOS (Próximas 48 horas)
- [X] Acción requerida
  - Deadline: [Fecha]
  - Responsible: [Persona]
  - Status: [Completado/En progreso/Pendiente]

---

## PLAZOS IMPORTANTES (Próximas 4 semanas)
| Plazo | Vence En | Preparación |
|-------|----------|-------------|
| [X] | [fecha] | [acción necesaria] |

---

## PRÓXIMOS HITOS (Mes siguiente)
- [X] Evento esperado (~[fecha])

---

## Alertas
- [ ] Comunique a cliente sobre próximo movimiento
- [ ] Revisar expediente en SGDE
- [ ] Preparar [documento específico]

---

## Checklist
- [ ] Todos los plazos identificados
- [ ] Alertas activas en calendario
- [ ] Cliente informado
- [ ] Socio revisó
```

---

## Criterios de Calidad

✓ Todos los plazos están **documentados con fechas específicas**
✓ Sistema de alertas es **automático** (no depende de memoria)
✓ Escaladas son **claras** (quién actúa si pasa X)
✓ Dashboard se **actualiza semanalmente**
✓ Cliente siempre **sabe cuál es el próximo paso**

---

## Herramientas Recomendadas

- **Google Calendar:** Alertas automáticas (email + teléfono)
- **Archivo de caso:** `/casos/[APELLIDO]/alertas_plazos.md`
- **Dashboard mensual:** `/procedimientos/dashboard-plazos.md`
- **MCP Legal Data Hunter:** Para verificar cambios en normas de plazos

---

## Referencias

- Procedimiento P-001: Tomar Nuevo Caso
- Procedimiento P-004: Seguimiento Judicial
- Código de Procedimiento Civil (CGP - Ley 1564/2012)
- Código Sustantivo del Trabajo
- Código de Procedimiento Penal (Ley 906/2004)
- CPACA (Ley 1437/2011)

---

## Regla de Oro

**PERDER UN PLAZO = PERDER EL CASO**

No hay segunda oportunidad en plazos procesales. La caducidad es **irreversible**.

Por eso este sistema debe ser:
1. **Automático** (no confiar en memoria)
2. **Redundante** (múltiples recordatorios)
3. **Escalable** (si alguien falla, otro actúa)

---

*Esta skill evita los errores más costosos en litigio. Usa diligentemente.*
