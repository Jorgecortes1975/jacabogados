---
name: learn
license: MIT
metadata:
  version: "0.1.0"
  source: "https://github.com/Hainrixz/aprende-skill"
description: |
  English alias for the `aprende` skill. Review the current conversation and
  surface reusable learnings across four categories (memory, lesson, skill,
  project-doc). Numbered candidate list first; writes to disk only after the
  user confirms. Trigger when the user types /learn, "reflect on this", "save
  what we learned", "remember this for next time", or after correcting the
  agent on a recurring mistake. Alias en inglés de `aprende` — hace exactamente
  lo mismo.
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - Bash
  - AskUserQuestion
---

# `learn` — alias of `aprende`

This skill is a thin alias. **Load and follow `.claude/skills/aprende/SKILL.md`
in full** — the 5-pass workflow (A Scan → B Generate → C Dedup → D Confirm →
E Execute), the four categories, and every guardrail live there.

Read these before Pass A:

- `.claude/skills/aprende/SKILL.md` — the workflow itself
- `.claude/skills/aprende/references/signal-patterns.md` — generic signals
- `.claude/skills/aprende/references/signal-patterns-juridico.md` — **JA Abogados
  legal signals**: normative corrections, hallucination detection, competence
  and deadline rules, and the hard client-confidentiality rule

The single most important rule, repeated here so it is never missed:

> **Nothing is written to disk before Pass D.** No Write, no Edit, no mutating
> Bash call between showing the numbered list and the user's reply.

Flags behave identically: `--review`, `--portable`, `--dry-run`.
