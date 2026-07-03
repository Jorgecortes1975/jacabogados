---
name: compliance-antisoborno-co
description: Revisa programas de cumplimiento anticorrupción y antisoborno de personas jurídicas colombianas contra los requisitos de la Ley 1778 de 2016 (soborno transnacional) y, cuando aplique, los lineamientos SAGRLAFT de la Superintendencia Financiera, identificando brechas y generando un plan de remediación priorizado. Úsala cuando el usuario pida revisar un programa de compliance anticorrupción o evaluar exposición a soborno transnacional.
---

# Revisión de Programas de Cumplimiento Anticorrupción y Antisoborno (Colombia)

Modelo recomendado: **Claude Opus 4.8** (`claude-opus-4-8`). Nivel de riesgo alto: compliance regulatorio con exposición sancionatoria directa ante la Superintendencia de Sociedades. No usar un modelo de menor capacidad para este análisis.

## Marco normativo

- **Ley 1778 de 2016**: régimen de responsabilidad administrativa de personas jurídicas por soborno transnacional. Aplica a sociedades vigiladas por la Superintendencia de Sociedades que (a) contraten o intenten contratar con el Estado, o de forma directa o indirecta, o (b) tengan ingresos operacionales superiores a los topes que fija la norma y realicen sobornos a servidores públicos extranjeros en transacciones internacionales. La competencia sancionatoria es de la Superintendencia de Sociedades. Esta es norma vigente y puede citarse con confianza, **pero el abogado debe verificar si ha sido modificada, reglamentada o derogada parcialmente** desde julio de 2026.
- **SAGRLAFT**: Sistema de Autocontrol y Gestión del Riesgo de Lavado de Activos y Financiación del Terrorismo, exigido por la Superintendencia Financiera a entidades vigiladas (y extensible contractualmente a terceros con alta exposición a ese riesgo). Aplica solo si el cliente es una entidad vigilada por la Superfinanciera o tiene ese riesgo por su sector (remesas, cambio de divisas, fiducia, etc.).

## Proceso de 4 pasos

**Paso 1 — Determinar aplicabilidad.** Verificar si el cliente está sujeto a la Ley 1778 (opera con el Estado, tiene alcance transnacional, o supera los umbrales de ingresos) y/o a SAGRLAFT (es entidad vigilada por la Superfinanciera o tiene exposición sectorial al riesgo LA/FT). Documentar el fundamento de cada determinación; no asumir aplicabilidad por defecto.

**Paso 2 — Evaluar elementos mínimos del programa existente.** Contrastar el programa de compliance del cliente contra los elementos que exige la norma aplicable: (a) política de cumplimiento aprobada por la administración, (b) canal de denuncias (línea ética) confidencial y con protección al denunciante, (c) debida diligencia de terceros (proveedores, agentes, intermediarios, contrapartes de alto riesgo), (d) capacitación periódica documentada al personal relevante, (e) auditoría o revisión independiente del programa.

**Paso 3 — Identificar brechas con severidad.** Para cada elemento evaluado, calificar el estado actual, describir la brecha específica y asignar prioridad (alta/media/baja) según probabilidad de exposición sancionatoria y facilidad de remediación.

**Paso 4 — Generar plan de remediación priorizado.** Ordenar las brechas de alta a baja prioridad, con una acción concreta y un responsable sugerido (compliance, legal, administración) para cada una.

## Ejemplo de matriz de brechas

| Elemento del programa | Estado actual | Brecha | Prioridad |
|---|---|---|---|
| Debida diligencia de terceros | Existe formulario básico solo para nuevos proveedores | No cubre agentes comerciales ni intermediarios en operaciones transnacionales | Alta |
| Canal de denuncias | Buzón de correo interno gestionado por RRHH | No garantiza confidencialidad ni anonimato; sin protocolo de no represalia | Alta |
| Capacitación | Inducción general de ética al ingreso | No hay refuerzo periódico ni módulo específico sobre soborno transnacional | Media |
| Auditoría del programa | Revisión interna anual informal, sin metodología documentada | Falta independencia y trazabilidad de hallazgos | Media |

*(Filas ficticias, con fines ilustrativos del formato de salida.)*

## Cierre — límites de esta skill

Esta skill **nunca certifica** que un programa de cumplimiento es "adecuado" o "suficiente" ante una autoridad. Su función se limita a identificar brechas frente a los elementos mínimos exigidos por la norma. La certificación formal del programa y toda interacción con la Superintendencia de Sociedades o la Superintendencia Financiera —incluyendo respuestas a requerimientos, visitas de inspección o procesos sancionatorios— corresponde exclusivamente al abogado a cargo, con el respaldo técnico del oficial de cumplimiento del cliente.

**Regla de seguridad obligatoria:** ninguna sanción o caso específico de la Superintendencia de Sociedades debe presentarse como "verificado" sin advertencia. Toda referencia a una sanción concreta debe marcarse explícitamente como "[verificar contra el registro público de sanciones]" antes de ser usada en cualquier análisis o comunicación con el cliente.
