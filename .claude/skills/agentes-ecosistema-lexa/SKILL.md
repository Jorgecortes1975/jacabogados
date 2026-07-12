---
name: agentes-ecosistema-lexa
description: >
  Arquitectura y orquestación del ecosistema de agentes LEXA-LAB del Bufete Cortés
  Cartagena. Tres capas: Dashboard (monitoreo), Router (entrada única), Agentes
  especializados (Juridico, Mercantil, Email) con sus sub-agentes.
  Activar ante: ecosistema de agentes, multi-agente, agente autonomo, setup de agentes,
  agente juridico, agente mercantil, agente de email, dashboard de agentes, router de mensajes,
  orquestacion de agentes, como montar los agentes, status del ecosistema, que agente uso,
  a que agente le mando esto, sub-agentes, JAC agent, redactor agent, investigador agent.
  SIEMPRE activar cuando el usuario pregunte por el estado del ecosistema o quiera saber
  a qué agente corresponde una tarea del despacho.
---

# Ecosistema de Agentes — LEXA-LAB · Bufete Cortés Cartagena

Sistema de tres capas para operación autónoma del despacho. Cada mensaje del usuario viaja en una sola dirección: Router → Agente especializado → Sub-agentes → Outbox → Router → Usuario.

## Arquitectura

```
[Usuario / Telegram / Email]
          ↓
   [ROUTER] ~/agents/router/
   Clasifica y despacha
          ↓ ↓ ↓
[JURIDICO]  [MERCANTIL]  [EMAIL]
~/agents/juridico/  ~/agents/mercantil/  ~/agents/email/
          ↓               ↓               ↓
   Sub-agentes      Sub-agentes      Sub-agentes
 investigador     contratos       classifier
 redactor         litigio-merc    drafter
 jac-validator    invest-merc     summarizer
          ↑
   [DASHBOARD] ~/agents/dashboard/
   Monitorea todos 24/7
```

## Archivos del ecosistema

| Agente | CLAUDE.md | Sub-agentes |
|---|---|---|
| Dashboard | `~/agents/dashboard/CLAUDE.md` | — |
| Router | `~/agents/router/CLAUDE.md` | — |
| Email | `~/agents/email/CLAUDE.md` | classifier · drafter · summarizer |
| Juridico | `~/agents/juridico/CLAUDE.md` | investigador · redactor · jac-validator |
| Mercantil | `~/agents/mercantil/CLAUDE.md` | contratos · litigio-mercantil · investigador-mercantil |

## Dispatch table del Router

| Tema | Agente |
|---|---|
| Escritos procesales, jurisprudencia, tutelas, laboralista | `juridico` |
| Contratos, SAS, pagarés, litigio comercial | `mercantil` |
| Correos, comunicaciones con clientes | `email` |
| [REQUIERE VALIDACIÓN JAC] | `juridico` con `[ORIGEN-JAC]` |

## Flujo JAC — tres capas de calidad

```
Claude genera → [REQUIERE VALIDACIÓN JAC]
     ↓
JAC verifica contra LexisNexis Colombia + SUIN-Juriscol
     ↓
Jorge aprueba y firma → documento sale del ecosistema
```

## Cómo activar un agente

```bash
cd ~/agents/juridico && claude   # Agente jurídico
cd ~/agents/mercantil && claude  # Agente mercantil
cd ~/agents/email && claude      # Agente de email
cd ~/agents/router && claude     # Router (entrada de Telegram)
cd ~/agents/dashboard && claude  # Dashboard de monitoreo
```

## Referencia de carpetas

```
~/agents/
├── registry.json              ← Lista de agentes activos
├── dashboard/CLAUDE.md        ← Monitor del ecosistema
├── router/CLAUDE.md           ← Punto de entrada único
├── email/
│   ├── CLAUDE.md
│   ├── voz-institucional.md   ← Voz del Bufete para drafter
│   └── .claude/agents/        ← Sub-agentes: classifier, drafter, summarizer
├── juridico/
│   ├── CLAUDE.md
│   ├── kb/                    ← causas, jurisprudencia, normas, plantillas
│   └── .claude/agents/        ← Sub-agentes: investigador, redactor, jac-validator
└── mercantil/
    ├── CLAUDE.md
    ├── kb/                    ← contratos, societario, títulos valores
    └── .claude/agents/        ← Sub-agentes: contratos, litigio-mercantil, investigador-mercantil
```
