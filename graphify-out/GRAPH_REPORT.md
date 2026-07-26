# Graph Report - .  (2026-07-26)

## Corpus Check
- Corpus is ~7,638 words - fits in a single context window. You may not need a graph.

## Summary
- 107 nodes · 195 edges · 7 communities
- Extraction: 86% EXTRACTED · 13% INFERRED · 1% AMBIGUOUS · INFERRED: 26 edges (avg confidence: 0.82)
- Token cost: 92,183 input · 0 output

## Community Hubs (Navigation)
- Contenido, Nurturing y Deontologia
- Portafolio de Servicios y Prospectos Verdes
- Generador CRM en Excel
- Criterios de Scoring y Descarte
- Canales, KPIs y Plan de Implementacion
- Web, SEO Local y Stack de Herramientas
- Prospectos Amarillos de Energia y Tech

## God Nodes (most connected - your core abstractions)
1. `Matriz de Evaluacion de Prospectos (Semaforo de Viabilidad)` - 18 edges
2. `Portafolio de Ocho Pilares de Servicio` - 15 edges
3. `Plan de Implementacion - Primeras 8 Semanas` - 12 edges
4. `crear_dashboard()` - 10 edges
5. `crear_crm()` - 10 edges
6. `LinkedIn (Canal Principal B2B Legal)` - 9 edges
7. `Prospecto B - Semaforo Amarillo (24-32)` - 8 edges
8. `Directorios y Plataformas Juridicas en Colombia` - 8 edges
9. `Sistema de Gestion de Prospectos (CRM Simple)` - 8 edges
10. `Secuencia de Nurturing a 30 Dias` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Objetivo General del Sistema de Captacion` --rationale_for--> `Matriz de Evaluacion de Prospectos (Semaforo de Viabilidad)`  [INFERRED]
  plan_marketing_digital_jaabogados.md → plan_marketing_digital_jaabogados.md  _Bridges community 4 → community 3_
- `Google Business Profile (Visibilidad Local)` --semantically_similar_to--> `SEO Local con Palabras Clave para Colombia`  [INFERRED] [semantically similar]
  plan_marketing_digital_jaabogados.md → plan_marketing_digital_jaabogados.md  _Bridges community 5 → community 4_
- `Directorios y Plataformas Juridicas en Colombia` --semantically_similar_to--> `Google Business Profile (Visibilidad Local)`  [INFERRED] [semantically similar]
  plan_marketing_digital_jaabogados.md → plan_marketing_digital_jaabogados.md  _Bridges community 4 → community 1_
- `Sistema de Gestion de Prospectos (CRM Simple)` --conceptually_related_to--> `Ley 1581 de 2012 (Habeas Data)`  [INFERRED]
  plan_marketing_digital_jaabogados.md → plan_marketing_digital_jaabogados.md  _Bridges community 5 → community 0_
- `Contenido Juridico para Posicionamiento` --conceptually_related_to--> `Canva`  [INFERRED]
  plan_marketing_digital_jaabogados.md → plan_marketing_digital_jaabogados.md  _Bridges community 0 → community 4_

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Embudo de Captacion: calificacion, registro, nurturing y medicion** — plan_marketing_digital_jaabogados_matriz_evaluacion_prospectos, plan_marketing_digital_jaabogados_crm_simple, plan_marketing_digital_jaabogados_secuencia_nurturing, plan_marketing_digital_jaabogados_kpis_semanales, plan_marketing_digital_jaabogados_kpis_mensuales [INFERRED 0.85]
- **Stack de Canales Digitales del Despacho** — plan_marketing_digital_jaabogados_linkedin, plan_marketing_digital_jaabogados_instagram, plan_marketing_digital_jaabogados_whatsapp_business, plan_marketing_digital_jaabogados_landing_page, plan_marketing_digital_jaabogados_google_business_profile, plan_marketing_digital_jaabogados_directorios_juridicos [EXTRACTED 1.00]
- **Marco Deontologico que Restringe el Marketing Juridico** — plan_marketing_digital_jaabogados_ley_1123_2007, plan_marketing_digital_jaabogados_prohibicion_captacion_desleal, plan_marketing_digital_jaabogados_confidencialidad_art_28, plan_marketing_digital_jaabogados_publicidad_veraz_art_35, plan_marketing_digital_jaabogados_ley_1581_2012 [EXTRACTED 1.00]

## Communities (7 total, 0 thin omitted)

### Community 0 - "Contenido, Nurturing y Deontologia"
Cohesion: 0.10
Nodes (26): Aba Tech (22/40), Acciones Diarias en LinkedIn (30 min/dia), Azimut Energia (24/40), B2Chat (23/40), Brevo, Buffer / Hootsuite, Casos de Exito sin Datos Confidenciales, ChatGPT / Claude para Redaccion Juridica (+18 more)

### Community 1 - "Portafolio de Servicios y Prospectos Verdes"
Cohesion: 0.11
Nodes (24): Directorio Abogados Colombia (abogados.com.co), ACI Medellin (inversion extranjera), Asesoria a Empresas Extranjeras, Camara de Comercio de Medellin, CapitalPocket / Pocki (34/40), Civil, Comercial y Administrativo, Consultopedia, Consultoria para Pymes (+16 more)

### Community 2 - "Generador CRM en Excel"
Cohesion: 0.39
Nodes (14): cell_font(), center(), crear_crm(), crear_dashboard(), crear_instrucciones(), crear_matriz(), crear_mensajes(), header_fill() (+6 more)

### Community 3 - "Criterios de Scoring y Descarte"
Cohesion: 0.17
Nodes (13): Busquedas Booleanas de Decisores, Criterio: Acceso al Decisor, Criterio: Tamano y Capacidad de Pago, Criterio: Madurez Legal de la Empresa, Criterio: Competencia y Riesgo de BigLaw, Criterio: Senal de Oportunidad Reciente, Criterio: Urgencia del Problema Legal, Descartar - Semaforo Rojo (0-14) (+5 more)

### Community 4 - "Canales, KPIs y Plan de Implementacion"
Cohesion: 0.31
Nodes (13): Calendly, Canva, Estrategia de Canales Digitales, Google Business Profile (Visibilidad Local), Instagram (Canal de Marca Personal), KPIs Mensuales, KPIs Semanales, Objetivo General del Sistema de Captacion (+5 more)

### Community 5 - "Web, SEO Local y Stack de Herramientas"
Cohesion: 0.25
Nodes (9): Criterio: Presencia en Medellin/Colombia, Sistema de Gestion de Prospectos (CRM Simple), Google Analytics, Google Sheets, HubSpot CRM gratuito, Pagina Web o Landing Page, Notion, SEO Local con Palabras Clave para Colombia (+1 more)

### Community 6 - "Prospectos Amarillos de Energia y Tech"
Cohesion: 0.33
Nodes (6): Erco Energia (29/40), Golden Energy (28/40), Medvision (30/40), Netux (31/40), Prospecto B - Semaforo Amarillo (24-32), Somos Internet (27/40)

## Ambiguous Edges - Review These
- `Consultoria para Pymes` → `Camara de Comercio de Medellin`  [AMBIGUOUS]
  plan_marketing_digital_jaabogados.md · relation: conceptually_related_to
- `Secuencia de Nurturing a 30 Dias` → `Loom`  [AMBIGUOUS]
  plan_marketing_digital_jaabogados.md · relation: conceptually_related_to

## Knowledge Gaps
- **27 isolated node(s):** `Derecho Corporativo y M&A`, `Civil, Comercial y Administrativo`, `Criterio: Tamano y Capacidad de Pago`, `Criterio: Urgencia del Problema Legal`, `Descartar - Semaforo Rojo (0-14)` (+22 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Consultoria para Pymes` and `Camara de Comercio de Medellin`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Secuencia de Nurturing a 30 Dias` and `Loom`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `Matriz de Evaluacion de Prospectos (Semaforo de Viabilidad)` connect `Criterios de Scoring y Descarte` to `Contenido, Nurturing y Deontologia`, `Portafolio de Servicios y Prospectos Verdes`, `Canales, KPIs y Plan de Implementacion`, `Web, SEO Local y Stack de Herramientas`, `Prospectos Amarillos de Energia y Tech`?**
  _High betweenness centrality (0.259) - this node is a cross-community bridge._
- **Why does `Portafolio de Ocho Pilares de Servicio` connect `Portafolio de Servicios y Prospectos Verdes` to `Contenido, Nurturing y Deontologia`, `Criterios de Scoring y Descarte`, `Canales, KPIs y Plan de Implementacion`, `Web, SEO Local y Stack de Herramientas`?**
  _High betweenness centrality (0.187) - this node is a cross-community bridge._
- **Why does `Secuencia de Nurturing a 30 Dias` connect `Contenido, Nurturing y Deontologia` to `Canales, KPIs y Plan de Implementacion`, `Prospectos Amarillos de Energia y Tech`?**
  _High betweenness centrality (0.153) - this node is a cross-community bridge._
- **What connects `Derecho Corporativo y M&A`, `Civil, Comercial y Administrativo`, `Criterio: Tamano y Capacidad de Pago` to the rest of the system?**
  _27 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Contenido, Nurturing y Deontologia` be split into smaller, more focused modules?**
  _Cohesion score 0.09538461538461539 - nodes in this community are weakly interconnected._