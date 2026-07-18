# CATÁLOGO DE FUENTES — Vigilancia normativa Colombia

Jerarquía de tres niveles. La regla que gobierna todo el catálogo:

> **Nivel C detecta. Nivel B orienta. Solo Nivel A confirma.**

---

## NIVEL A — Fuentes primarias (las únicas que CONFIRMAN)

| Fuente | URL | Qué publica / para qué usarla |
|---|---|---|
| Diario Oficial (Imprenta Nacional) | imprenta.gov.co/diario-oficial · buscador: svrpubindc.imprenta.gov.co/diario/ | Publicación oficial de leyes y decretos — sin esto no hay exigibilidad. Buscador por temas, entidades y normas desde 1864 |
| SUIN-Juriscol (MinJusticia) | suin-juriscol.gov.co | Texto de normas CON análisis de vigencia (derogatorias, modificaciones, sentencias que la afectan). Fuente preferida para el CONTROL 1 |
| Secretaría del Senado | secretariasenado.gov.co | Leyes y códigos con notas de vigencia artículo por artículo (CST, Ley 100, etc.). Alterna de SUIN-Juriscol |
| Corte Constitucional — relatoría | corteconstitucional.gov.co/relatoria | Sentencias C-, T-, SU- con texto completo. Los comunicados de prensa de la Corte anticipan fallos: son Nivel B hasta que se publique el texto |
| Corte Suprema — Sala Laboral | cortesuprema.gov.co (consulta de providencias) | Casación laboral: doctrina probable en despidos, prestaciones, aportes |
| Consejo de Estado | consejodeestado.gov.co | Nulidad y suspensión de decretos y resoluciones (clave para el CONTROL 1 sobre actos administrativos) |
| Función Pública — Gestor Normativo | funcionpublica.gov.co/eva/gestornormativo | Normas compiladas con concordancias y vigencias. Buena alterna de verificación |

## NIVEL B — Fuentes oficiales institucionales (orientan, anticipan, NO confirman texto)

| Fuente | URL | Uso |
|---|---|---|
| Ministerio del Trabajo | mintrabajo.gov.co | Decretos y resoluciones del sector, circulares, conceptos. Anuncios de reforma = EN TRÁMITE |
| Ministerio de Salud | minsalud.gov.co | Resoluciones de UPC, cotizaciones, afiliación (normatividad del sector salud) |
| UGPP | ugpp.gov.co | Fiscalización de aportes: acuerdos, conceptos, esquemas de presunción de costos |
| Congreso — trámite legislativo | camara.gov.co / senado.gov.co (proyectos de ley) | Estado real de proyectos: radicación, debates, conciliación, sanción. Fuente correcta para veredicto EN TRÁMITE |
| Presidencia | presidencia.gov.co (decretos) | Decretos recién firmados, a veces antes de aparecer en compilaciones |
| Ministerio TIC / SIC | mintic.gov.co / sic.gov.co | Área digital y datos personales (cobertura secundaria del despacho) |

## NIVEL C — Señales de radar (SOLO detección de candidatos)

Prensa jurídica y boletines: Ámbito Jurídico (ambitojuridico.com), Asuntos Legales
(asuntoslegales.com.co), boletines de gremios (ANDI, Fenalco, Acopi), portales
contables (actualicese.com, comunidadcontable.com).

Reglas de uso del Nivel C:
- Sirven para enterarse de que "algo pasó" y obtener el identificador aproximado.
- NUNCA se cita un Nivel C como fuente de una alerta confirmada.
- Su interpretación de la norma se descarta: solo se toma el dato de existencia
  y se va a confirmar el texto al Nivel A.

---

## PATRONES DE BÚSQUEDA ÚTILES

Con WebSearch (ajustar términos al tema del barrido):

```
site:suin-juriscol.gov.co "ley 2101"                     → texto y vigencia de una ley
site:corteconstitucional.gov.co relatoria 2026 laboral    → fallos recientes
"diario oficial" [número de ley] 2026                     → confirmar publicación
site:mintrabajo.gov.co resolución 2026                    → actos del ministerio
salario mínimo 2027 decreto site:presidencia.gov.co       → valores anuales
site:camara.gov.co proyecto de ley reforma [materia]      → estado de trámite
```

Con MCP Legal Data Hunter (si está conectado): usar `discover_sources` para Colombia,
luego `search` por materia y fecha; `resolve_reference` para confirmar identificadores
de normas o sentencias detectadas en Nivel C.

Notas operativas:
- Los sitios estatales colombianos fallan con frecuencia (timeouts, certificados).
  Aplicar el protocolo de falla del CONTROL 5: reintento → fuente alterna → registro.
- Los buscadores internos de relatorías a veces no indexan lo más reciente; combinar
  con WebSearch general restringido por `site:`.
- Registrar SIEMPRE la fecha y hora de consulta de cada fuente usada.
