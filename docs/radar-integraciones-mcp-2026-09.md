# Radar de integraciones MCP, septiembre de 2026

Fuente: publicaciones de David Rodríguez Pinto en la comunidad Skool "Claude/Anthropic Latinoamérica", con enlaces a guías de ia.university.
Fecha de extracción: 2026-09-27.
Nivel de certeza: sujeto a verificación. Las fechas, endpoints y funcionalidades provienen de una fuente secundaria (publicación comunitaria) y no se han contrastado con la documentación oficial de cada proveedor.

## 1. Resumen ejecutivo

| No. | Herramienta | Fecha reportada | Qué hace | Relevancia para JAC | Decisión |
|---|---|---|---|---|---|
| 1 | Cloudflare MCP Server Portals | GA, 24 sep 2026 | Un endpoint único que agrupa servidores MCP aprobados, con registro de herramientas y prompts, DLP, OAuth y exportación de logs a SIEM | Alta | Evaluar |
| 2 | Discourse MCP | 18 sep 2026 | Conecta Claude o ChatGPT a un foro Discourse para buscar, resumir, responder y apoyar moderación | Media | Vigilar |
| 3 | Ninety MCP | GA, 24 sep 2026 | Conector a Ninety (metodología EOS): lectura de Rocks y Scorecard, creación de To-Dos e Issues | Media, sujeta a uso de Ninety | Vigilar |
| 4 | Omneky en ChatGPT | 24 sep 2026 | Agente de publicidad que lanza campañas en Meta, Google y TikTok con aprobación de creativos | Baja a media | No adoptar por ahora |
| 5 | IronWallet MCP | 24 sep 2026 | Billetera cripto autocustodiada que permite al agente consultar saldos, transferir y hacer swaps | Nula | Descartar |

## 2. Ficha por herramienta

### 2.1 Cloudflare MCP Server Portals

Datos extraídos:
1. Un portal de Cloudflare Access expone un solo endpoint con los servidores MCP aprobados.
2. Registro (logging) de herramientas, prompts y recursos invocados.
3. Integración con Gateway y DLP, Code Mode, OAuth estático y service tokens para agentes.
4. Logpush hacia SIEM.
5. Primer paso de configuración: agregar los servidores MCP en Zero Trust.

Aplicación al despacho: es la única de las cinco que resuelve un problema actual del repositorio. `mcp-config.json` registra nueve transportes a fuentes oficiales y el ecosistema LEXA suma conectores adicionales. Un portal permitiría centralizar qué servidores puede usar el agente, conservar trazabilidad de consultas y aplicar control de fuga de información de clientes. Encaja con la skill de gobernanza de IA del despacho y con el principio de trazabilidad de `.specify/memory/constitution.md`.

Riesgo: los registros de prompts pueden contener datos personales y datos sometidos a secreto profesional. Antes de activar Logpush se debe definir dónde se almacenan, por cuánto tiempo y quién accede, en el marco del régimen de protección de datos personales (Ley 1581 de 2012; vigencia a confirmar en fuente oficial).

### 2.2 Discourse MCP

Datos extraídos:
1. Servidor MCP nativo en Discourse; no requiere instalar `discourse-mcp` localmente.
2. Endpoint típico: `https://<comunidad>/mcp`.
3. Funciones: buscar topics, resumir hilos, responder y, si se habilita, apoyar moderación.

Aplicación al despacho: útil solo si JAC opera un foro o comunidad de clientes en Discourse. No existe hoy en el repositorio.

Riesgo: respuestas automáticas en un foro público pueden interpretarse como asesoría jurídica. Si se adopta, mantener aprobación humana previa a cada respuesta.

### 2.3 Ninety MCP

Datos extraídos:
1. Endpoint: `https://api.public.ninety.io/mcp`, como custom connector.
2. Compatible con Claude, ChatGPT, Grok y Antigravity.
3. Lectura de Rocks y Scorecard; creación de To-Dos e Issues.
4. Disponible en planes Thrive y Legacy; la sesión opera con los permisos del usuario.

Aplicación al despacho: pertinente si la gestión interna de JAC adopta la metodología EOS. Podría alimentar `kpi-juridico-col`, `plan-90-dias-col` y `dashboard-ejecutivo-col`. Sin cuenta Ninety, no aporta valor.

### 2.4 Omneky en ChatGPT

Datos extraídos:
1. Plugin de ChatGPT con un "AI Growth Agent" de publicidad y go-to-market.
2. Tras autorizar canales, lanza campañas en Meta, Google, TikTok y otras plataformas.
3. Creativos sujetos a aprobación y reportes dentro de la conversación.

Aplicación al despacho: se relaciona con `plan_marketing_digital_jaabogados.md`, pero opera sobre ChatGPT, no sobre Claude. El entorno actual ya dispone del conector Windsor.ai, que cubre lectura y escritura en Meta Ads, Google Ads, TikTok y LinkedIn con confirmación previa.

Riesgo: la publicidad de servicios jurídicos está sujeta a los deberes del Código Disciplinario del Abogado (Ley 1123 de 2007; vigencia a confirmar). Un agente que lanza campañas de forma autónoma eleva el riesgo de piezas no conformes. No delegar la publicación sin revisión del abogado responsable.

### 2.5 IronWallet MCP

Datos extraídos:
1. Instalación: `npx -y @ironwallet/mcp-server`.
2. Herramientas: `get_balance`, `send_transfer`, `execute_swap`.
3. Semilla cifrada en disco, firma local, cerca de 14 redes (BTC, ETH, Solana, Base).
4. Compatible con Cursor, Claude Code y Codex.

Aplicación al despacho: ninguna. Otorgar a un agente capacidad de transferir fondos es incompatible con los principios del sistema y no guarda relación con la práctica jurídica. No instalar en ningún entorno del despacho.

## 4. Uso en el despacho y límites del beneficio

Ninguna de estas herramientas ejecuta trabajo jurídico. Su valor es operativo: gobierno de la IA, gestión interna y comercialización. El beneficio termina donde empieza el criterio profesional. Ninguna verifica normas ni sentencias, ni traslada la responsabilidad del abogado sobre lo que firma o publica.

| Herramienta | Utilidad real | Beneficio | Condición para que valga la pena |
|---|---|---|---|
| Cloudflare MCP Portals | Control y auditoría del uso de IA | Alto | Varios usuarios o conectores con datos de clientes |
| Ninety MCP | Gestión gerencial del despacho | Medio | Adopción de la metodología EOS |
| Discourse MCP | Base de conocimiento interna o comunidad de clientes | Medio a bajo | Existencia de un foro Discourse |
| Omneky | Publicidad automatizada | Bajo | Solo con aprobación humana por pieza |
| IronWallet | Ninguna | Nulo | No aplica |

### 4.1 Cloudflare MCP Portals

Cómo se usa:
1. Todos los conectores (Croma, Legal Data Hunter, Gmail, Drive y los transportes de `mcp-config.json`) pasan por un solo punto de entrada.
2. Permisos por rol: el socio accede a correo y expedientes; el practicante, solo a fuentes normativas y jurisprudenciales.
3. Registro de qué consultó cada abogado y cuándo, útil para demostrar supervisión humana si se cuestiona un escrito asistido por IA.
4. DLP para bloquear la salida de cédulas, radicados o datos de clientes hacia herramientas no aprobadas.

Límite del beneficio:
1. No valida la existencia de sentencias ni la vigencia de normas; controla el acceso, no la calidad de la respuesta.
2. Los registros son una base de datos sensible, sujeta a secreto profesional, que debe custodiarse como un expediente.
3. En un despacho de uno a tres abogados con pocos conectores, el costo de configuración y mantenimiento puede superar el beneficio.

### 4.2 Ninety MCP

Cómo se usa:
1. Metas trimestrales (Rocks), por ejemplo radicar las demandas represadas o captar clientes corporativos.
2. Indicadores semanales (Scorecard): casos nuevos, términos próximos a vencer, cartera y horas facturables.
3. Resúmenes de la reunión semanal y creación de tareas desde Claude.

Límite del beneficio: es gerencia, no derecho. No reemplaza el control de términos procesales. Sin EOS adoptado, solo suma una suscripción. Complementa `kpi-juridico-col` y `plan-90-dias-col`.

### 4.3 Discourse MCP

Cómo se usa:
1. Foro interno de conocimiento: consultas entre abogados, criterios de la firma y modelos aprobados, con búsqueda y resumen de hilos previos.
2. Comunidad de clientes empresariales.

Límite del beneficio: una respuesta automática a un cliente equivale a asesoría jurídica sin supervisión. Toda respuesta a terceros requiere aprobación previa del abogado. El valor real está en el uso interno.

### 4.4 Omneky

Cómo podría usarse: variantes de creativos y consolidación de reportes.

Límite del beneficio: su función central, lanzar campañas de forma autónoma, es la que genera riesgo frente a los deberes de publicidad del abogado. Opera sobre ChatGPT. El despacho ya dispone de Windsor.ai, que ejecuta acciones solo con confirmación expresa.

### 4.5 IronWallet

Sin uso legítimo en el despacho. Aun al asesorar clientes del sector cripto, basta con exploradores de bloques de solo lectura; nunca se debe dar a un agente la facultad de firmar transferencias.

### 4.6 Riesgos

| Riesgo | Nivel | Herramienta |
|---|---|---|
| Filtración de datos de clientes o del secreto profesional en los registros | Alto | Cloudflare mal configurado |
| Asesoría no supervisada publicada a terceros | Alto | Discourse con respuestas automáticas |
| Publicidad jurídica no conforme | Alto | Omneky |
| Pérdida patrimonial por instrucción errónea del agente | Muy alto | IronWallet |
| Costo superior al beneficio | Medio | Cloudflare y Ninety en despachos pequeños |
| Confiar en que la herramienta verifica derecho | Alto | Todas |

Marco normativo de referencia, sujeto a verificación de vigencia en fuente oficial: Ley 1581 de 2012 (protección de datos personales) y Ley 1123 de 2007 (Código Disciplinario del Abogado: secreto profesional y publicidad). No se citan artículos específicos por no haber sido verificados.

### 4.7 Documentos necesarios

1. Política interna de uso de IA (base: skill `gobernanza-ia-despacho-col`).
2. Política de tratamiento de datos personales actualizada para incluir los registros de IA.
3. Cláusula de información al cliente sobre uso de IA en contratos de mandato u hojas de encargo.
4. Inventario de conectores activos con su responsable.
5. Documentación oficial y cotización de Cloudflare y, si aplica, de Ninety.

## 5. Acciones concretas

1. Urgente: adoptar la política escrita de uso de IA antes de cualquier infraestructura nueva.
2. Verificar en la documentación oficial de Cloudflare (developers.cloudflare.com) la disponibilidad general de MCP Server Portals y su costo en el plan Zero Trust aplicable.
3. Si se confirma, abrir una especificación con `/speckit-specify` para "Portal MCP centralizado con trazabilidad y DLP" antes de modificar `mcp-config.json` o `claude-mcp-transport.js`.
4. Definir con la política de gobernanza de IA del despacho la retención y el acceso a los logs de prompts.
5. Mantener Discourse y Ninety en observación hasta que exista una necesidad operativa concreta.
6. Usar Windsor.ai, y no Omneky, para cualquier automatización publicitaria, con aprobación humana por pieza.
7. Registrar IronWallet como herramienta prohibida.

## 6. Enlaces de la fuente

Los enlaces a ia.university aparecen truncados en la publicación original, salvo los endpoints transcritos arriba. Deben recuperarse desde la publicación completa antes de citarlos.
