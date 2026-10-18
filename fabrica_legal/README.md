# Fábrica Legal Digital: estado de implementación

Implementa el manual de arquitectura del ciclo repetitivo del bufete. Esta carpeta contiene lo que puede ejecutarse y probarse en el repositorio. Lo que requiere servicios externos o verificación jurídica queda listado abajo.

## Qué funciona y está probado

Motor determinista en fabrica_legal/calculos.py, con 14 pruebas en tests_fabrica/test_calculos.py. Reproduce las cifras de la simulación del manual (término de 10 días hábiles, cesantías, intereses, prima, vacaciones e indemnización del Art. 64 CST).

Servidor MCP en fabrica_legal/servidor.py (FastMCP, mcp 2.x con respaldo para 1.x), con cinco herramientas de solo lectura y un recurso de expediente. Probado en tests_fabrica/test_servidor.py.

Plantilla EXPEDIENTE.md, siete agentes (fabrica_legal/agentes/) y seis skills (fabrica_legal/skills/). Son texto de configuración, no código; no tienen prueba automatizada.

## Cambios respecto del manual

SMLMV y auxilio de transporte ya no se fijan en el código. Son argumentos obligatorios de liquidar_contrato_laboral_colombia. El manual usaba 1.550.000 y 218.000 sin verificación, y la búsqueda de fuentes no confirmó esas cifras.

Los días de vacaciones pendientes ya no tienen valor por defecto. El manual usaba 270 días para cinco años y medio de servicio, cifra que contradice el Art. 186 del CST, según el propio agente laboral.

El 1 de enero y los demás festivos se mantienen, pero el calendario está marcado PENDIENTE DE VERIFICACIÓN.

Se implementa convertir_smlmv_uvt_colombia, que el manual referencia pero no define.

El manual referencia el servidor como mcp-legal-finance-colombia. Aquí se llama JAC-Fabrica-Legal-Colombia.

Se elimina la afirmación de experiencia profesional de cuarenta años de los roles de los agentes.

## Qué no está implementado

mcp_ocr_expediente (OCR de estados electrónicos) y agendar_vencimiento_critico (Google Calendar) requieren servicios externos que no existen en este repositorio.

La compuerta del Contralor Senior es una instrucción de agente. No hay un validador programático que impida entregar un documento sin APPROVED.

El flujo de n8n en n8n/ciclo-repetitivo.json no se ha ejecutado. El identificador de modelo está como marcador y debe configurarse en n8n.

## Pendiente de verificación jurídica antes de uso real

Normas y artículos citados en agentes y skills: CGP, CPACA, CPTSS, Ley 2213 de 2022, Ley 2101 de 2021, Código de Comercio, Ley 1258 de 2008, Ley 1579 de 2012, Decreto 902 de 1988, Sentencias SU-003 de 2018 y C-593 de 2014. El manual no las verificó.

Festivos 2026 y vacancia judicial. Los días de Semana Santa (lunes a miércoles) que el manual trata como no hábiles no se han confirmado.

SMLMV y auxilio de transporte de la vigencia, y UVT 2026 (52.374 según la Resolución 000238 de la DIAN, según INCP).

Ejecución: el resultado de cualquier término, liquidación o amortización debe revisarlo el abogado responsable. El motor calcula, no determina la norma aplicable.

## Ejecución

    pip install -r fabrica_legal/requirements.txt
    python3 -m unittest tests_fabrica.test_calculos tests_fabrica.test_servidor

## Fuentes oficiales en vivo (fabrica_legal/fuentes.py)

Cuatro herramientas MCP permiten a cualquier cliente MCP consultar fuentes oficiales:

1. buscar_jurisprudencia_cc: metadatos de sentencias de la Corte Constitucional (datos.gov.co), por texto y rango de años. Pagina el dataset; si no lo agota, informa limite_alcanzado.
2. texto_sentencia_cc: texto de una sentencia de la Corte Constitucional a partir de su cita, desde la relatoría oficial.
3. confirmar_norma_oficial: existencia y fecha de una norma del catálogo local, confirmada en su página oficial. No confirma vigencia.
4. estado_fuentes_oficiales: accesibilidad real de cada fuente desde el entorno de ejecución, y qué cubre cada una.

Cobertura real: Corte Constitucional (metadatos y texto), catálogo de normas. Sin conector confirmado: Consejo de Estado, Corte Suprema, SUIN, Diario Oficial, Congreso, Supersociedades y DIAN. Rama Judicial y SAMAI solo se diagnostican. Esas fuentes se marcan SIN_CONECTOR o PENDIENTE DE VERIFICACIÓN.

Limitación de acceso: en la sesión donde se escribió este código, los dominios oficiales (corteconstitucional.gov.co, consejodeestado.gov.co, cortesuprema.gov.co, suin-juriscol.gov.co, ramajudicial.gov.co, funcionpublica.gov.co, secretariasenado.gov.co, datos.gov.co, entre otros) respondieron 403 en el CONNECT del proxy. Por eso las pruebas de fuentes.py verifican solo la lógica con un cliente simulado. El acceso real debe probarse con estado_fuentes_oficiales desde un entorno que tenga salida a esos dominios.

Protocolo de uso por los agentes: fabrica_legal/agentes/PROTOCOLO_FUENTES_OFICIALES.md.

Ejecución del servidor MCP: python3 -m fabrica_legal.servidor
