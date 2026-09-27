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

## 3. Acciones concretas

1. Verificar en la documentación oficial de Cloudflare (developers.cloudflare.com) la disponibilidad general de MCP Server Portals y su costo en el plan Zero Trust aplicable.
2. Si se confirma, abrir una especificación con `/speckit-specify` para "Portal MCP centralizado con trazabilidad y DLP" antes de modificar `mcp-config.json` o `claude-mcp-transport.js`.
3. Definir con la política de gobernanza de IA del despacho la retención y el acceso a los logs de prompts.
4. Mantener Discourse y Ninety en observación hasta que exista una necesidad operativa concreta.
5. Usar Windsor.ai, y no Omneky, para cualquier automatización publicitaria, con aprobación humana por pieza.
6. Registrar IronWallet como herramienta prohibida.

## 4. Enlaces de la fuente

Los enlaces a ia.university aparecen truncados en la publicación original, salvo los endpoints transcritos arriba. Deben recuperarse desde la publicación completa antes de citarlos.
