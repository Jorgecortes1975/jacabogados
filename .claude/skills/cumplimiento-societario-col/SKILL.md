---
name: cumplimiento-societario-col
description: >
  Calendario y control de cumplimiento societario de sociedades colombianas
  (SAS, SA, Ltda, sucursales de sociedad extranjera, ESAL): renovación de
  matrícula mercantil, asamblea ordinaria y actas, libros de comercio, reformas
  estatutarias, beneficiario final (RUB-DIAN), reportes a Supersociedades y
  situación de control. Mantiene un tracker YAML por cliente, calcula qué vence
  en 30/60/90 días y agenda los plazos con vencimientos-procesales-col.
  Activar ante: cumplimiento societario, renovación de matrícula mercantil,
  asamblea ordinaria, obligaciones de la SAS, qué le vence a la sociedad,
  calendario corporativo, RUB, beneficiario final, estados financieros a
  Supersociedades, libros y actas, reforma estatutaria, revisor fiscal
  obligatorio, certificado de existencia, auditoría de salud societaria,
  tracker de sociedades. SIEMPRE activar cuando se pida controlar, auditar o
  reportar las obligaciones periódicas de una sociedad o grupo en Colombia.
argument-hint: "[--init | --report [--dias N] | --update [--desde-certificado] | --barrido | --auditoria | --export [--formato csv|tabla]]"
---

# CUMPLIMIENTO SOCIETARIO — Colombia

Renovación de matrícula, asamblea ordinaria, RUB, reportes a Supersociedades:
cada sociedad tiene su propio calendario y sus propias consecuencias por
incumplir. Este skill mantiene UN tracker YAML por cliente que sabe qué vence,
cuándo y para cuál sociedad; Claude lo actualiza a demanda y lo exporta.

**Ruteo por bandera**:
- Sin bandera o `--init`: Modo 1 — inicializar tracker desde los datos del cliente
- `--report`: Modo 2 — vencimientos próximos y vencidos
- `--update`: Modo 3a (manual) o 3b (`--desde-certificado`: certificado de
  existencia y representación legal u otro reporte cargado)
- `--barrido`: Modo 3c — depurar ítems desconocidos/vencidos uno a uno
- `--auditoria`: Modo 4 — auditoría de salud societaria
- `--export`: Modo 5 — CSV o tabla

Tracker: `{empresa}/06-CUMPLIMIENTO/tracker-societario.yaml` (crear carpeta si
no existe). Tras cada actualización: resumen de cambios + próxima acción.

---

## ADVERTENCIA DE FECHAS Y NORMAS (obligatoria)

> Las obligaciones y fechas de esta guía son **base de trabajo, a verificar con
> `vigilancia-normativa-col` antes del primer uso y de cada informe a cliente**.
> Los plazos de Supersociedades y del RUB cambian por resolución anual; las
> cámaras de comercio publican circulares propias. La fuente autoritativa es la
> norma vigente y el certificado de existencia y representación legal reciente
> (≤ 30 días) — el tracker organiza esa información, no la reemplaza.
> PROHIBIDO inventar números de artículos, tarifas o fechas: lo no confirmado
> se marca `s/d`. Cifras en SMLMV solo de la tabla maestra CONFIRMADA de
> `liquidador-aportes-col`.

## DESAMBIGUACIÓN POR TIPO SOCIETARIO (error frecuente y costoso)

El calendario depende del **tipo de sociedad**, no solo de la ciudad o cámara.
Tratar "una sociedad colombiana" como una sola categoría produce vencimientos
falsos o, peor, omisiones reales. Confirmar SIEMPRE el tipo en el certificado
antes de calcular un plazo, y nunca copiar el plazo de un tipo a otro.
Diferencias que importan (todas: base a verificar con `vigilancia-normativa-col`):

- **SAS (Ley 1258/2008)**: reformas por documento privado registrado (salvo
  aporte de inmuebles); junta directiva opcional; revisor fiscal solo si supera
  topes de activos/ingresos en SMLMV (Ley 43/1990 — cifras: `liquidador-aportes-col`).
- **SA (C. de Comercio)**: revisor fiscal y junta directiva obligatorios;
  reformas por escritura pública; reunión por derecho propio si no se convoca
  la ordinaria (C.Co., libro II — base a verificar).
- **Ltda**: junta de socios; cesión de cuotas = reforma con escritura pública;
  responsabilidad solidaria laboral/fiscal de los socios.
- **Sucursal de sociedad extranjera**: matrícula y renovación propias; revisor
  fiscal obligatorio; régimen cambiario (Banco de la República) usualmente del
  contador: solo se agenda y se remite.
- **ESAL**: registro y renovación en cámara con reglas propias + inspección de
  Gobernación/Alcaldía, no de Supersociedades.

Si el tracker registra una sociedad sin tipo: marcar `tipo_desconocido` y
pedir el certificado antes de calcular cualquier plazo.

## OBLIGACIONES BASE DEL CALENDARIO COLOMBIANO

Tabla de referencia (¡base a verificar, NO fuente!). Los plazos concretos de
cada año se confirman EN VIVO y se agendan con `vencimientos-procesales-col`:

| Obligación | Ante | Cadencia orientativa | Base de trabajo |
|---|---|---|---|
| Renovación matrícula mercantil (sociedad y establecimientos) | Cámara de Comercio | Anual, primer trimestre (fecha límite legal: a verificar) | C.Co. + tarifas de la circular anual |
| Renovación RUP (si contrata con el Estado) | Cámara de Comercio | Anual, abril (fecha exacta: a verificar) | Decreto 1082/2015 |
| Asamblea/junta ordinaria | Órgano social | Primer trimestre (salvo estatuto); si no se convoca: reunión por derecho propio | C.Co. / Ley 1258/2008 / estatutos |
| Acta de la ordinaria + registro de nombramientos y reformas | Cámara de Comercio | Tras cada decisión sujeta a registro | C.Co., libro II |
| Libros de comercio (actas, accionistas) inscritos y al día | Cámara de Comercio | Permanente; registro electrónico disponible | Decreto-Ley 019/2012 |
| RUB — beneficiario final (registro y actualización) | DIAN | Alta inicial + actualización ante cambios (plazo: a verificar) | Res. DIAN sobre RUB |
| Estados financieros certificados/dictaminados | Supersociedades (si vigilada/controlada o requerida) | Anual, según calendario por NIT de la resolución del año | Ley 222/1995 + resolución anual |
| Inscripción situación de control / grupo empresarial | Cámara de Comercio | Dentro del plazo legal desde la configuración (a verificar) | Ley 222/1995, art. 30 |
| Informe 42 / SIRFIN y requerimientos | Supersociedades | Según requerimiento/resolución | Circulares Supersociedades |
| Renovación registros especiales (RNT turismo, vendedores, etc.) | Cámara / entidad sectorial | Anual, según sector | Normativa sectorial |

**Fuera de alcance del despacho** (límites CLAUDE.md): renta, IVA, exógena y
demás obligaciones tributarias son del contador/CPA — el tracker las ANOTA y
remite, nunca las calcula. Pleitos societarios activos → abogado especialista.

---

## ARCHIVO TRACKER

```yaml
# Tracker de cumplimiento societario — [Cliente]
# Generado: [fecha] | Última actualización: [fecha] | Última auditoría: [fecha o null]
# Advertencia: fechas de referencia — confirmar contra norma vigente y certificado reciente
metadata: {cliente: "", generado: "", actualizado: "", ultima_auditoria: null}
obligaciones_personalizadas: []   # obligaciones sectoriales o extranjeras capturadas manualmente
sociedades:
  - nombre: ""
    nit: ""
    tipo: "[SAS / SA / Ltda / sucursal extranjera / ESAL / tipo_desconocido]"
    camara_comercio: "[Medellín / Aburrá Sur / ...]"
    fecha_constitucion: "[fecha o null]"
    estado: "[activa / inactiva / en liquidación]"
    vigilada_supersociedades: "[sí / no / s/d]"
    revisor_fiscal: "[obligatorio / voluntario / no aplica / s/d]"
    gestor_externo: "[contador / agente local / null]"   # si gestiona cumplimiento, se marca gestionada_por_tercero
    obligaciones:
      - tipo: "[Renovación matrícula / Asamblea ordinaria / RUB / EEFF Supersociedades / ...]"
        vence: "[AAAA-MM-DD o s/d]"
        base_vencimiento: "[fecha fija / calendario por NIT / evento / s/d]"
        ultimo_cumplimiento: "[fecha o null]"
        ultimo_costo: "[valor o null]"
        estado: "[al_dia / proximo / vencido / desconocido]"
        certificado_reciente: "[fecha del último certificado revisado o null]"
        notas: ""
```

Estados: `al_dia` (cumplido, nada en 90 días) · `proximo` (vence en ≤ 90 días) ·
`vencido` (fecha pasada sin cumplimiento registrado) · `desconocido` (sin
información: confirmar con certificado, contador o entidad).

## MODO 1 — INICIALIZAR

1. **Cargar datos**: leer `{empresa}/01-INTAKE.md` y demás carpeta del cliente.
   Si no hay lista de sociedades: pedirla (o pedir los certificados).
2. **Por cada sociedad, confirmar obligaciones vigentes** — jamás poblar fechas
   desde memoria: (a) pedir certificado de existencia reciente y última
   renovación; (b) preguntar qué sabe el cliente (tipo de obligación, base del
   vencimiento, último cumplimiento, costo típico); (c) lo que nadie sepa se
   marca `desconocido`; (d) los plazos del año en curso se verifican EN VIVO
   con `vigilancia-normativa-col`. Obligaciones sectoriales o de jurisdicción
   extranjera → capturarlas con el diálogo de obligación personalizada (tipo,
   base del vencimiento, costo aproximado, gestor) y guardarlas en
   `obligaciones_personalizadas` para reutilizar en futuras sociedades.
   Sociedades cuyo cumplimiento lleva un tercero (contador, agente local):
   `gestionada_por_tercero: true` — el reporte las lista aparte con nota de
   "confirmar con el gestor", sin fecha calculada propia.
3. **Escribir el tracker** con estados iniciales y mostrar resumen:
   sociedades [N] · obligaciones [N] · ✅ al día [N] · ⏰ próximas [N] ·
   🔴 vencidas [N] · ❓ desconocidas [N].
4. **Agendar**: todo vencimiento con fecha confirmada pasa a
   `vencimientos-procesales-col` (cómputo verificado + Google Calendar +
   registro auditable). El tracker guarda el estado; el gestor de vencimientos
   guarda la alerta. La renovación de matrícula se trata como término FATAL de
   calendario regulatorio.

## MODO 2 — REPORTE (`--report [--dias 30|60|90|180]`; por defecto 90)

La respuesta va primero (señal/ruido): el semáforo, sin narrar el proceso, sin
secciones vacías.

```
REPORTE DE CUMPLIMIENTO SOCIETARIO — [fecha] — [Cliente]
🔴 VENCIDAS ([N]): [Sociedad] / [Obligación] — venció [fecha]
⏰ PRÓXIMAS ≤[N] DÍAS ([N]): [Sociedad] / [Obligación] — vence [fecha] [gestor]
✅ CUMPLIDAS (últimos 90 días): [Sociedad] / [Obligación] — [fecha]
❓ DESCONOCIDAS ([N]): [Sociedad] / [Obligación] — confirmar con certificado/entidad
🌐 GESTIONADAS POR TERCERO ([N]): [Sociedad] / [Obligación] — confirmar con [gestor]
CERTIFICADOS: última revisión [fecha]; sociedades sin certificado ≤ 12 meses: [lista]
```

Si hay >10 sociedades o el usuario lo pide: ofrecer dashboard con
`dashboard-ejecutivo-col` (conteos por estado, tabla ordenable por sociedad,
obligación y próximo vencimiento).

## MODO 3 — ACTUALIZAR

**Compuerta de acto con consecuencias**: antes de confirmar o dirigir una
radicación (renovación, registro de acta o reforma, RUB, envío a
Supersociedades) cuando quien opera NO es abogado del despacho: advertir que el
trámite es una manifestación formal de la sociedad con costos y efectos
(pérdida de beneficios, sanciones, ineficacia de nombramientos) y exigir
confirmación expresa de revisión profesional. Sin un "sí" explícito no se
registra `ultimo_cumplimiento`. Leer el tracker y reportar NO requiere compuerta.

- **3a Manual**: "Renovamos la matrícula de [X] el 28-mar, costó $[Y]" →
  actualizar `ultimo_cumplimiento`, `ultimo_costo`, `estado: al_dia`,
  `actualizado`, y cerrar el vencimiento en `vencimientos-procesales-col`
  (registro CUMPLIDO).
- **3b `--desde-certificado`**: el usuario carga certificado de existencia,
  reporte del contador o pantallazo RUES/DIAN (PDF/CSV/Excel — si es denso,
  convertir antes con `ahorro-tokens-markitdown`). Extraer por sociedad:
  renovación (año), nombramientos y reformas inscritas, situación de control,
  vigencia. Emparejar por NIT primero y nombre después ("Acme Holdings SAS" vs
  "ACME HOLDINGS S.A.S." = probablemente la misma — confirmar). Cierre:
  actualizadas [N] · en reporte pero no en tracker [lista] · sin novedad [lista].
- **3c `--barrido`**: recorrer ítems `desconocido`/`vencido` uno a uno
  ("[Sociedad] / [Obligación] figura [estado]. ¿Se cumplió? ¿Cuándo y costo?"),
  actualizar tras cada respuesta y resumir al final.

## MODO 4 — AUDITORÍA DE SALUD (`--auditoria`)

Revisión más amplia que el estado de radicaciones:
- **Cumplimiento**: vencidas + desconocidas (acción: `--barrido`).
- **Sociedades inactivas**: mantenerlas cuesta (renovación, contador, RUB);
  inactivas > 5 años = candidatas a disolución/liquidación voluntaria o a
  depuración de cámara — decisión del cliente con abogado.
- **Gobierno corporativo**: ¿asamblea ordinaria del año celebrada y acta
  asentada? ¿libros registrados y al día? ¿nombramientos vigentes inscritos
  (representante legal, junta, revisor fiscal)? ¿revisor fiscal exigible por
  topes y no designado? (topes: `liquidador-aportes-col`).
- **Certificados desactualizados**: sin certificado revisado ≤ 12 meses =
  riesgo si una operación (crédito, M&A, licitación) lo exige de urgencia.
- **Brechas estructurales**: situación de control/grupo sin inscribir (¡solo
  como pregunta al abogado — Claude no determina control!); contratos
  intercompañía inexistentes entre matrices y filiales que se prestan
  servicios; causal de disolución por pérdidas / hipótesis de negocio en
  marcha reportada y sin gestionar (remitir a especialista).
Salida: bloque AUDITORÍA con hallazgos clasificados CRÍTICO/MODERADO/BAJO
(convención del despacho) + acciones recomendadas priorizadas.

## MODO 5 — EXPORT (`--export [--formato csv|tabla]`; CSV por defecto)

CSV plano para finanzas, contador o cliente — columnas: `Sociedad, NIT, Tipo,
Cámara, Fecha constitución, Estado, Vigilada Supersociedades, Revisor fiscal,
Obligación, Vence, Último cumplimiento, Último costo, Certificado revisado,
Notas` (una fila por obligación). `--formato tabla`: tabla markdown solo con
los próximos 90 días. **Defensa contra inyección de fórmulas (obligatoria)**:
toda celda con texto de origen externo (nombres, notas, extractos de
certificados) que empiece por `=`, `+`, `-`, `@`, tab o salto de línea se
antepone con `'`; en CSV, entrecomillar según RFC 4180. Una hoja que dispara
macros en el Excel del cliente es un ataque de cadena de suministro.

## LO QUE ESTE SKILL NO HACE

No radica nada (el trámite lo hace el abogado, el cliente o su gestor) · no
descarga certificados (registra cuándo se revisaron) · no determina si existe
control societario ni presencia que exija registros adicionales (eso lo
confirma el abogado) · no liquida impuestos ni prepara exógena (contador/CPA)
· no lleva litigios societarios (especialista). Todo entregable a cliente
cierra con el protocolo y etiquetas de certidumbre de `anti-hallucination-v3`
([Verificado] / [Base de trabajo — a verificar] / s/d).

## VINCULACIÓN

| Skill | Relación |
|---|---|
| `vencimientos-procesales-col` | Agenda y computa TODOS los plazos del tracker (calendario + registro auditable) |
| `vigilancia-normativa-col` | Verificación EN VIVO de plazos, resoluciones anuales (Supersociedades, RUB) y reformas |
| `liquidador-aportes-col` | Única fuente de SMLMV y topes en cifras (tabla maestra CONFIRMADA) |
| `lexa-mercantil-col` | Fondo de derecho societario: actas, reformas, conflictos entre socios |
| `playbook-contratos-col` | Contratos intercompañía detectados como brecha en la auditoría |
| `startups-col` | Constitución y estructura de nuevas SAS que luego entran al tracker |
| `investigacion-juridica-corporativa-col` | Debida diligencia y hallazgos que disparan auditoría societaria |
| `dashboard-ejecutivo-col` / `kit-entregables-col` | Dashboard y empaquetado del reporte para el cliente |
| `anti-hallucination-v3` | Cierre obligatorio de todo entregable |

---
Adaptado de anthropics/claude-for-legal (licencia del repositorio oficial) para
el sistema jurídico colombiano — JA Abogados / Bufete Cortés Cartagena, jul-2026.
