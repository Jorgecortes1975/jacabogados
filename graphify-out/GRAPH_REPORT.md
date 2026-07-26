# Graph Report - jacabogados  (2026-07-26)

## Corpus Check
- 2 files · ~7,638 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 60 nodes · 126 edges · 9 communities
- Extraction: 83% EXTRACTED · 16% INFERRED · 1% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9622daa4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Segmentacion y Nurturing de Prospectos
- Nucleo del Generador CRM
- Matriz de Evaluacion de Prospectos
- Gestion y Seguimiento Comercial
- Contenido y Prospeccion en LinkedIn
- Canales Digitales y Presencia Local
- Hojas CRM y Dashboard
- Principios Eticos y Deontologicos del Marketing Juridico
- crear_matriz

## God Nodes (most connected - your core abstractions)
1. `crear_dashboard()` - 10 edges
2. `crear_crm()` - 10 edges
3. `crear_matriz()` - 7 edges
4. `header_fill()` - 6 edges
5. `center()` - 6 edges
6. `crear_mensajes()` - 6 edges
7. `main()` - 6 edges
8. `Portafolio de 8 Pilares de Servicio` - 6 edges
9. `Matriz de Evaluacion de Prospectos (Semaforo de Viabilidad)` - 6 edges
10. `Grupo A - Prioridad Alta (33-40 pts)` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Cadenas Booleanas de Busqueda de Decisores` --shares_data_with--> `Ocho Criterios de Puntuacion (0-40 puntos)`  [INFERRED]
  plan_marketing_digital_jaabogados.md → plan_marketing_digital_jaabogados.md  _Bridges community 2 → community 4_
- `Principios Eticos y Deontologicos del Marketing Juridico` --rationale_for--> `Acciones Diarias en LinkedIn (30 min/dia)`  [INFERRED]
  plan_marketing_digital_jaabogados.md → plan_marketing_digital_jaabogados.md  _Bridges community 3 → community 7_
- `Principios Eticos y Deontologicos del Marketing Juridico` --rationale_for--> `Pagina Web / Landing Page`  [INFERRED]
  plan_marketing_digital_jaabogados.md → plan_marketing_digital_jaabogados.md  _Bridges community 5 → community 7_
- `Directorios y Plataformas Juridicas en Colombia` --conceptually_related_to--> `SEO Local con Palabras Clave Colombia`  [INFERRED]
  plan_marketing_digital_jaabogados.md → plan_marketing_digital_jaabogados.md  _Bridges community 5 → community 0_
- `Ley 1581 de 2012 (Habeas Data)` --conceptually_related_to--> `Guias Descargables PDF (captura de emails)`  [INFERRED]
  plan_marketing_digital_jaabogados.md → plan_marketing_digital_jaabogados.md  _Bridges community 4 → community 7_

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Embudo de captacion: senal, calificacion, contacto, nurturing, cierre** — plan_marketing_digital_jaabogados_diecisiete_prospectos, plan_marketing_digital_jaabogados_matriz_evaluacion_prospectos, plan_marketing_digital_jaabogados_clasificacion_semaforo, plan_marketing_digital_jaabogados_secuencia_nurturing_30_dias, plan_marketing_digital_jaabogados_crm_simple, plan_marketing_digital_jaabogados_kpis [INFERRED 0.85]
- **Mix de canales digitales del despacho** — plan_marketing_digital_jaabogados_linkedin_canal_principal, plan_marketing_digital_jaabogados_instagram_marca_personal, plan_marketing_digital_jaabogados_whatsapp_business, plan_marketing_digital_jaabogados_landing_page_web, plan_marketing_digital_jaabogados_google_business_profile, plan_marketing_digital_jaabogados_directorios_juridicos [EXTRACTED 1.00]
- **Marco de cumplimiento deontologico del marketing juridico colombiano** — plan_marketing_digital_jaabogados_principios_eticos, plan_marketing_digital_jaabogados_ley_1123_2007, plan_marketing_digital_jaabogados_ley_1581_2012, plan_marketing_digital_jaabogados_confidencialidad_casos_exito, plan_marketing_digital_jaabogados_content_marketing_juridico [EXTRACTED 1.00]

## Communities (9 total, 0 thin omitted)

### Community 0 - "Segmentacion y Nurturing de Prospectos"
Cohesion: 0.25
Nodes (11): CapitalPocket/Pocki (fintech regulado SFC), Clasificacion Semaforo (Verde/Amarillo/Naranja/Rojo), Directorios y Plataformas Juridicas en Colombia, Drones Sky Solutions (regulacion Aerocivil), Grupo A - Prioridad Alta (33-40 pts), Grupo B - Nurturing a 30 dias (24-32 pts), Grupo C - Seguimiento Pasivo (15-23 pts), Health Prime Colombia (prospecto A, llegada 2025) (+3 more)

### Community 1 - "Nucleo del Generador CRM"
Cohesion: 0.50
Nodes (6): cell_font(), center(), crear_instrucciones(), crear_mensajes(), header_fill(), main()

### Community 2 - "Matriz de Evaluacion de Prospectos"
Cohesion: 0.32
Nodes (8): Ocho Criterios de Puntuacion (0-40 puntos), JA Abogados (despacho, Medellin), Matriz de Evaluacion de Prospectos (Semaforo de Viabilidad), Objetivo General del Sistema de Captacion, Plan de Marketing Digital JA Abogados v1.0, Portafolio de 8 Pilares de Servicio, Criterio de Competencia / Riesgo BigLaw, Telepatia (prospecto A, ronda US$42M a16z)

### Community 3 - "Gestion y Seguimiento Comercial"
Cohesion: 0.48
Nodes (7): Acciones Diarias en LinkedIn (30 min/dia), Sistema de Gestion de Prospectos (CRM Simple), Cartera de 17 Prospectos Identificados, Metricas e Indicadores (KPIs semanales y mensuales), Plan de Implementacion - Primeras 8 Semanas, Resumen Ejecutivo - 5 Pasos para Arrancar Hoy, Tabla de Seguimiento de Prospectos (esquema de campos)

### Community 4 - "Contenido y Prospeccion en LinkedIn"
Cohesion: 0.43
Nodes (7): Cadenas Booleanas de Busqueda de Decisores, Contenido Juridico para Posicionamiento, Guias Descargables PDF (captura de emails), Stack de Herramientas Digitales Recomendadas, LinkedIn como Canal Principal B2B Legal, Newsletter mensual 'Consulta Juridica Ejecutiva', Regla 3-2-1 de Contenido Semanal

### Community 5 - "Canales Digitales y Presencia Local"
Cohesion: 0.43
Nodes (7): Decreto 0581 de 2026 (tercerizacion laboral), Estrategia de Canales Digitales, Google Business Profile (visibilidad local), Instagram como Canal de Marca Personal, Pagina Web / Landing Page, SEO Local con Palabras Clave Colombia, WhatsApp Business como Canal de Conversion

### Community 6 - "Hojas CRM y Dashboard"
Cohesion: 0.60
Nodes (5): crear_crm(), crear_dashboard(), semaforo(), semaforo_fill(), semaforo_font()

### Community 7 - "Principios Eticos y Deontologicos del Marketing Juridico"
Cohesion: 0.50
Nodes (4): Confidencialidad en Casos de Exito (anonimizacion), Ley 1123 de 2007 (Codigo Disciplinario del Abogado), Ley 1581 de 2012 (Habeas Data), Principios Eticos y Deontologicos del Marketing Juridico

### Community 8 - "crear_matriz"
Cohesion: 0.67
Nodes (3): crear_matriz(), left(), thin_border()

## Ambiguous Edges - Review These
- `Criterio de Competencia / Riesgo BigLaw` → `Telepatia (prospecto A, ronda US$42M a16z)`  [AMBIGUOUS]
  plan_marketing_digital_jaabogados.md · relation: conceptually_related_to

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Criterio de Competencia / Riesgo BigLaw` and `Telepatia (prospecto A, ronda US$42M a16z)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `Clasificacion Semaforo (Verde/Amarillo/Naranja/Rojo)` connect `Segmentacion y Nurturing de Prospectos` to `Matriz de Evaluacion de Prospectos`, `Gestion y Seguimiento Comercial`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Why does `Matriz de Evaluacion de Prospectos (Semaforo de Viabilidad)` connect `Matriz de Evaluacion de Prospectos` to `Segmentacion y Nurturing de Prospectos`, `Gestion y Seguimiento Comercial`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **Why does `Grupo A - Prioridad Alta (33-40 pts)` connect `Segmentacion y Nurturing de Prospectos` to `Matriz de Evaluacion de Prospectos`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._