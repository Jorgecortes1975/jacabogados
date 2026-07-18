# RADAR NORMATIVO — Lista de vigilancia del despacho

Qué vigilar, con qué frecuencia y por qué. Este archivo es EDITABLE: cuando el
despacho gane clientes en nuevos sectores o cierre áreas, actualizar el radar
(y dejar constancia con fecha al pie).

Los valores monetarios de referencia viven en el CLAUDE.md del despacho
(SMLMV, auxilio de transporte, UPC del año en curso). En cada barrido de valores
anuales: contrastar el valor del CLAUDE.md contra el decreto/resolución que lo fija;
si cambió, la alerta debe incluir la propuesta de actualización del CLAUDE.md.

---

## GRUPO 1 — Valores y parámetros anuales (barrido: diciembre-enero, y ante rumor de cambio)

| Ítem | Norma que lo fija | Dónde confirmar (Nivel A) |
|---|---|---|
| Salario mínimo (SMLMV) | Decreto de fin de año (o CETCP) | presidencia.gov.co + Diario Oficial |
| Auxilio de transporte | Decreto de fin de año | presidencia.gov.co + Diario Oficial |
| UPC (unidad de pago por capitación) | Resolución de Minsalud | minsalud.gov.co + Diario Oficial |
| Bases y topes de cotización (IBC) | Ley 100 art. 18 y normas que lo modifiquen | SUIN-Juriscol |
| Porcentajes de aportes (salud 12.5%, pensión 16%, ARL por clase de riesgo) | Ley 100 / Ley 1562 y modificaciones | SUIN-Juriscol / Secretaría del Senado |
| Interés de cesantías, dotación, prima | CST y normas concordantes | Secretaría del Senado |

## GRUPO 2 — Laboral (barrido: mensual — es el corazón del despacho)

| Tema | Qué vigilar | Señales típicas |
|---|---|---|
| Reforma laboral | Trámite en Congreso, sanción, reglamentación, demandas de inexequibilidad | camara.gov.co, comunicados C. Constitucional |
| Jornada laboral (Ley 2101 de 2021) | Fases de reducción de jornada y su reglamentación | SUIN-Juriscol, Mintrabajo |
| Recargos (nocturno, dominical, festivo) | Cambios legales y su vigencia gradual | Mintrabajo, Diario Oficial |
| Contratación y tercerización | Decretos y circulares sobre intermediación ilegal | Mintrabajo, Consejo de Estado |
| Teletrabajo / trabajo remoto / desconexión | Reglamentación y circulares | Mintrabajo, MinTIC |
| Estabilidad reforzada (salud, maternidad, prepensión) | Jurisprudencia SU- y de Sala Laboral | Relatorías |
| Acoso laboral (Ley 1010) y comités de convivencia | Modificaciones y resoluciones | Mintrabajo |
| SG-SST (Decreto 1072, Res. 0312) | Estándares mínimos, plazos de reporte | Mintrabajo |

## GRUPO 3 — Seguridad social (barrido: mensual)

| Tema | Qué vigilar | Señales típicas |
|---|---|---|
| Reforma pensional | Implementación por fases, decretos reglamentarios, fallos de constitucionalidad | C. Constitucional, Minsalud/MinTrabajo, Colpensiones |
| Régimen de salud (EPS, giro directo, UPC) | Resoluciones Minsalud, intervenciones Supersalud | minsalud.gov.co, supersalud.gov.co |
| PILA y fiscalización UGPP | Cambios en planilla, esquemas de presunción, acuerdos de pago | ugpp.gov.co, minsalud.gov.co |
| Riesgos laborales (Ley 1562) | Tablas de enfermedades, clases de riesgo, reglamentación | Mintrabajo, Diario Oficial |
| Independientes y contratistas | IBC de independientes, retención de aportes | UGPP, SUIN-Juriscol |

## GRUPO 4 — Jurisprudencia de Altas Cortes (barrido: mensual)

| Corporación | Qué rastrear |
|---|---|
| Corte Constitucional | Sentencias C- sobre normas laborales/pensionales; SU- de unificación en materia laboral y de seguridad social; comunicados de sala plena (marcar como EN TRÁMITE hasta texto publicado) |
| CSJ — Sala Laboral | Cambios de doctrina en casación: despidos, cálculo de prestaciones, ius variandi, pensiones |
| Consejo de Estado | Nulidades y suspensiones de decretos/resoluciones laborales y de seguridad social (un decreto suspendido cambia el consejo al cliente de un día para otro) |

## GRUPO 5 — Cobertura secundaria (barrido: trimestral, ligado al seguimiento de clientes)

| Área | Temas | Skill relacionado |
|---|---|---|
| Mercantil / societario | Reformas al C. de Comercio, supersociedades, insolvencia | `lexa-mercantil-col` |
| Digital y datos personales | Ley 1581, SIC, regulación de IA | `derecho-digital-col` |
| Startups | Régimen SAS, inversión extranjera, ESOP | `startups-col` |
| Tributario-laboral (frontera) | Cambios tributarios que toquen nómina (solo alertar y remitir a contador — límite del despacho) | — |

---

## PERIODICIDAD SUGERIDA

- **Mensual**: Grupos 2, 3 y 4 (núcleo laboral + seguridad social + jurisprudencia).
- **Trimestral**: Grupo 5, alineado con los seguimientos `05-SEGUIMIENTO-{TRIM}.md` de clientes.
- **Diciembre-enero**: Grupo 1 completo (valores del año nuevo) — barrido obligatorio.
- **Extraordinario**: ante cualquier señal de reforma mayor o fallo de constitucionalidad
  sobre normas del radar.

---

**Historial del radar**

| Fecha | Cambio |
|---|---|
| Jul 18, 2026 | v1.0 — Radar inicial: laboral + seguridad social como núcleo, cobertura secundaria mercantil/digital/startups |
