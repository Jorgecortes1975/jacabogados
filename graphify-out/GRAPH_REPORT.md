# Graph Report - jacabogados  (2026-07-26)

## Corpus Check
- 4 files · ~12,512 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 176 nodes · 391 edges · 10 communities (9 shown, 1 thin omitted)
- Extraction: 72% EXTRACTED · 27% INFERRED · 2% AMBIGUOUS · INFERRED: 105 edges (avg confidence: 0.86)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `98ed5361`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Cartera de Prospectos del CRM
- Prospeccion Diaria en LinkedIn
- Scoring C1-C8 y Bandas de Semaforo
- Portafolio de Servicios y Directorios
- Esquema y Operativa del CRM
- Plantillas de Mensaje y Nurturing
- Generador CRM en Excel
- Prospectos Naranja y Revision Mensual
- Directorios y Plataformas Juridicas en Colombia
- graphify

## God Nodes (most connected - your core abstractions)
1. `Matriz de Evaluacion de Prospectos (Semaforo de Viabilidad)` - 33 edges
2. `Sheet: CRM Prospectos` - 26 edges
3. `Portafolio de Ocho Pilares de Servicio` - 17 edges
4. `Secuencia de Nurturing a 30 Dias` - 15 edges
5. `Semáforo Amarillo — Prospecto B (24–32)` - 14 edges
6. `Sheet: Matriz de Evaluación` - 13 edges
7. `Sistema de Gestion de Prospectos (CRM Simple)` - 13 edges
8. `Puntaje TOTAL /40 (suma C1–C8)` - 12 edges
9. `Plan de Implementacion - Primeras 8 Semanas` - 12 edges
10. `crear_dashboard()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Mensaje Personalizado de Alto Valor (prospectos Verde)` --semantically_similar_to--> `Secuencia de Nurturing a 30 Dias`  [INFERRED] [semantically similar]
  graphify-out/converted/crm_jaabogados_f5624444.md → plan_marketing_digital_jaabogados.md
- `Sheet: Dashboard` --conceptually_related_to--> `KPIs Mensuales`  [AMBIGUOUS]
  graphify-out/converted/crm_jaabogados_f5624444.md → plan_marketing_digital_jaabogados.md
- `Tabla de Clasificación (Semáforo)` --semantically_similar_to--> `Matriz de Evaluacion de Prospectos (Semaforo de Viabilidad)`  [INFERRED] [semantically similar]
  graphify-out/converted/crm_jaabogados_f5624444.md → plan_marketing_digital_jaabogados.md
- `Límite Anti-Spam: 10–15 mensajes/día en LinkedIn` --conceptually_related_to--> `KPIs Semanales`  [AMBIGUOUS]
  graphify-out/converted/crm_jaabogados_f5624444.md → plan_marketing_digital_jaabogados.md
- `Workbook CRM JA Abogados (crm_jaabogados.xlsx)` --implements--> `Sistema de Gestion de Prospectos (CRM Simple)`  [INFERRED]
  graphify-out/converted/crm_jaabogados_f5624444.md → plan_marketing_digital_jaabogados.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Pipeline de puntuación: criterios C1–C8 → TOTAL /40 → clasificación semáforo en el CRM** — graphify_out_converted_crm_jaabogados_f5624444_c1_senal_reciente, graphify_out_converted_crm_jaabogados_f5624444_c2_alineacion_servicios, graphify_out_converted_crm_jaabogados_f5624444_c3_tamano_capacidad_pago, graphify_out_converted_crm_jaabogados_f5624444_c4_acceso_al_decisor, graphify_out_converted_crm_jaabogados_f5624444_c5_madurez_legal, graphify_out_converted_crm_jaabogados_f5624444_c6_presencia_en_medellin, graphify_out_converted_crm_jaabogados_f5624444_c7_urgencia_del_problema, graphify_out_converted_crm_jaabogados_f5624444_c8_sin_riesgo_biglaw, graphify_out_converted_crm_jaabogados_f5624444_puntaje_total_40, graphify_out_converted_crm_jaabogados_f5624444_tabla_clasificacion_semaforo, graphify_out_converted_crm_jaabogados_f5624444_crm_prospectos [EXTRACTED 1.00]
- **Rutina operativa semanal: lunes Verde, martes Amarillo/nurturing, viernes altas nuevas, fin de mes Naranja** — graphify_out_converted_crm_jaabogados_f5624444_flujo_semanal_recomendado, graphify_out_converted_crm_jaabogados_f5624444_semaforo_verde, graphify_out_converted_crm_jaabogados_f5624444_semaforo_amarillo, graphify_out_converted_crm_jaabogados_f5624444_semaforo_naranja, graphify_out_converted_crm_jaabogados_f5624444_procedimiento_agregar_prospecto, graphify_out_converted_crm_jaabogados_f5624444_campo_estado_prospecto, graphify_out_converted_crm_jaabogados_f5624444_revision_mensual_naranja [EXTRACTED 1.00]
- **Secuencia de outreach en LinkedIn: conexión → DM inicial → seguimiento, bajo las reglas de oro** — graphify_out_converted_crm_jaabogados_f5624444_mensaje_de_conexion_linkedin, graphify_out_converted_crm_jaabogados_f5624444_primer_mensaje_dm, graphify_out_converted_crm_jaabogados_f5624444_mensaje_de_seguimiento, graphify_out_converted_crm_jaabogados_f5624444_oferta_revision_gratuita, graphify_out_converted_crm_jaabogados_f5624444_regla_conversacion_no_venta, graphify_out_converted_crm_jaabogados_f5624444_limite_mensajes_linkedin [INFERRED 0.85]
- **Embudo de Captacion: calificacion, registro, nurturing y medicion** — plan_marketing_digital_jaabogados_matriz_evaluacion_prospectos, plan_marketing_digital_jaabogados_crm_simple, plan_marketing_digital_jaabogados_secuencia_nurturing, plan_marketing_digital_jaabogados_kpis_semanales, plan_marketing_digital_jaabogados_kpis_mensuales [INFERRED 0.85]
- **Stack de Canales Digitales del Despacho** — plan_marketing_digital_jaabogados_linkedin, plan_marketing_digital_jaabogados_instagram, plan_marketing_digital_jaabogados_whatsapp_business, plan_marketing_digital_jaabogados_landing_page, plan_marketing_digital_jaabogados_google_business_profile, plan_marketing_digital_jaabogados_directorios_juridicos [EXTRACTED 1.00]
- **Marco Deontologico que Restringe el Marketing Juridico** — plan_marketing_digital_jaabogados_ley_1123_2007, plan_marketing_digital_jaabogados_prohibicion_captacion_desleal, plan_marketing_digital_jaabogados_confidencialidad_art_28, plan_marketing_digital_jaabogados_publicidad_veraz_art_35, plan_marketing_digital_jaabogados_ley_1581_2012 [EXTRACTED 1.00]

## Communities (10 total, 1 thin omitted)

### Community 0 - "Cartera de Prospectos del CRM"
Cohesion: 0.19
Nodes (17): Prospecto: Azimut Energía, Prospecto: Erco Energía, Prospecto: Golden Energy, Señal: Selección Medellín Next 2026, Prospecto: Medvision, Prospecto: MovilBox, Prospecto: Netux, Plantilla Genérica con Placeholder [TEMA RELEVANTE AL SECTOR] (+9 more)

### Community 1 - "Prospeccion Diaria en LinkedIn"
Cohesion: 0.13
Nodes (27): Acciones Diarias en LinkedIn (30 min/dia), Busquedas Booleanas de Decisores, Calendly, Canva, Checklist de Optimizacion del Perfil LinkedIn, Criterio: Acceso al Decisor, Criterio: Presencia en Medellin/Colombia, Decreto 0581 de 2026 (tercerizacion laboral) (+19 more)

### Community 2 - "Scoring C1-C8 y Bandas de Semaforo"
Cohesion: 0.16
Nodes (25): C1: Señal Reciente, C2: Alineación Servicios, C3: Tamaño / Capacidad de Pago, C4: Acceso al Decisor, C5: Madurez Legal, C6: Presencia en Medellín, C7: Urgencia del Problema, C8: Sin Riesgo BigLaw (+17 more)

### Community 3 - "Portafolio de Servicios y Directorios"
Cohesion: 0.14
Nodes (26): Campo Servicio Principal, Prospecto: CapitalPocket / Pocki, Conteo por Semáforo (5 Verde / 8 Amarillo / 4 Naranja / 0 Rojo / 17 total), Workbook CRM JA Abogados (crm_jaabogados.xlsx), Sheet: CRM Prospectos, Sheet: Dashboard, Prospecto: Drones Sky Solutions, Prospecto: Health Prime Colombia (+18 more)

### Community 4 - "Esquema y Operativa del CRM"
Cohesion: 0.14
Nodes (21): Campo ESTADO del Prospecto (Prospecto Nuevo / Seguimiento Pasivo), Campo Próxima Acción y Fecha Próxima Acción, Campo Señal de Oportunidad, Esquema de Columnas del CRM (A–Z: Empresa, Sector, Decisor, Contacto, C1–C8, TOTAL, Semáforo), Flujo Semanal Recomendado (30 min/semana), Guía: Cómo subir el archivo a Google Sheets, Sheet: Instrucciones, Ley 1581/2012 (Habeas Data) — no compartir la base con terceros (+13 more)

### Community 5 - "Plantillas de Mensaje y Nurturing"
Cohesion: 0.14
Nodes (20): Plantilla: Mensaje de Conexión LinkedIn (≤300 caracteres), Plantilla: Mensaje de Seguimiento, Sheet: Mensajes, Nurturing 30 días (acción operativa para prospectos Amarillo), Gancho: Primera Revisión Jurídica Sin Costo, Plantilla: Primer Mensaje (DM LinkedIn), Regla: Los mensajes son conversaciones, no ventas (primero valor, luego oferta), Brevo (+12 more)

### Community 6 - "Generador CRM en Excel"
Cohesion: 0.39
Nodes (14): cell_font(), center(), crear_crm(), crear_dashboard(), crear_instrucciones(), crear_matriz(), crear_mensajes(), header_fill() (+6 more)

### Community 7 - "Prospectos Naranja y Revision Mensual"
Cohesion: 0.22
Nodes (11): Prospecto: Aba Tech, Prospecto: B2Chat, Revisión de Fin de Mes de Prospectos Naranja (ascenso a Amarillo), Semáforo Naranja — Prospecto C (15–23), Prospecto: SiembraViva, Aba Tech (22/40), Azimut Energia (24/40), B2Chat (23/40) (+3 more)

### Community 8 - "Directorios y Plataformas Juridicas en Colombia"
Cohesion: 0.22
Nodes (10): Directorio Abogados Colombia (abogados.com.co), ACI Medellin (inversion extranjera), Asesoria a Empresas Extranjeras, Camara de Comercio de Medellin, Consultopedia, Consultoria para Pymes, Directorios y Plataformas Juridicas en Colombia, Health Prime Colombia (34/40) (+2 more)

## Ambiguous Edges - Review These
- `Sheet: Dashboard` → `KPIs Mensuales`  [AMBIGUOUS]
  graphify-out/converted/crm_jaabogados_f5624444.md · relation: conceptually_related_to
- `Sheet: Matriz de Evaluación` → `PDF fuente: 'Tu Buscador de Clientes Potenciales'`  [AMBIGUOUS]
  graphify-out/converted/crm_jaabogados_f5624444.md · relation: conceptually_related_to
- `Límite Anti-Spam: 10–15 mensajes/día en LinkedIn` → `KPIs Semanales`  [AMBIGUOUS]
  graphify-out/converted/crm_jaabogados_f5624444.md · relation: conceptually_related_to
- `PDF fuente: 'Tu Buscador de Clientes Potenciales'` → `Sistema de Gestion de Prospectos (CRM Simple)`  [AMBIGUOUS]
  graphify-out/converted/crm_jaabogados_f5624444.md · relation: conceptually_related_to
- `Consultoria para Pymes` → `Camara de Comercio de Medellin`  [AMBIGUOUS]
  plan_marketing_digital_jaabogados.md · relation: conceptually_related_to
- `Secuencia de Nurturing a 30 Dias` → `Loom`  [AMBIGUOUS]
  plan_marketing_digital_jaabogados.md · relation: conceptually_related_to

## Knowledge Gaps
- **18 isolated node(s):** `graphify-mcp`, `Versión 1.0 — Junio 2026 (generado con Claude para JA Abogados)`, `Derecho Corporativo y M&A`, `Civil, Comercial y Administrativo`, `Criterio: Tamano y Capacidad de Pago` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Sheet: Dashboard` and `KPIs Mensuales`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Sheet: Matriz de Evaluación` and `PDF fuente: 'Tu Buscador de Clientes Potenciales'`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Límite Anti-Spam: 10–15 mensajes/día en LinkedIn` and `KPIs Semanales`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `PDF fuente: 'Tu Buscador de Clientes Potenciales'` and `Sistema de Gestion de Prospectos (CRM Simple)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Consultoria para Pymes` and `Camara de Comercio de Medellin`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Secuencia de Nurturing a 30 Dias` and `Loom`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `Matriz de Evaluacion de Prospectos (Semaforo de Viabilidad)` connect `Scoring C1-C8 y Bandas de Semaforo` to `Cartera de Prospectos del CRM`, `Prospeccion Diaria en LinkedIn`, `Portafolio de Servicios y Directorios`, `Esquema y Operativa del CRM`, `Prospectos Naranja y Revision Mensual`?**
  _High betweenness centrality (0.258) - this node is a cross-community bridge._