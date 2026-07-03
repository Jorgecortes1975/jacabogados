# Instalación unificada de Skills — Bufete Cortés Cartagena / LEXA-LAB

Tres superficies distintas, un mismo origen: `.claude/skills/` en este
repositorio. Este documento une las tres vías de instalación en un solo
lugar, con los comandos ya adaptados a este proyecto.

---

## Vía 01 — Claude.ai web · Claude Desktop · Cowork

Subida manual por interfaz (`Settings → Skills → Add Skill`). Necesitas un
`.zip` individual por skill, con el mismo nombre que la skill.

**Ya generado**: corre `./scripts/package_skills_for_upload.sh` desde la raíz
del repo — valida cada `SKILL.md` con `validate_skill.py` y deja los 15 zips
en `dist/` (carpeta ignorada por git, se regenera cuando quieras).

```bash
./scripts/package_skills_for_upload.sh                      # las 15
./scripts/package_skills_for_upload.sh verificacion-citas-co # solo una
```

Luego: `claude.ai → Settings → Skills → Add Skill → sube el .zip`. El mismo
flujo aplica sin cambios en Claude Desktop y en Cowork — la skill queda
disponible en cualquier conversación nueva.

---

## Vía 02 — Claude Code (CLI), uso personal

`~/.claude/skills/<nombre>/SKILL.md` — vive en tu máquina, no en el
repositorio. Útil si quieres tener estas skills disponibles en *cualquier*
proyecto que abras con Claude Code, no solo en este repo.

```bash
mkdir -p ~/.claude/skills
cp -r .claude/skills/* ~/.claude/skills/
```

En la próxima sesión de Claude Code ya están cargadas — no hace falta
reiniciar nada más.

---

## Vía 03 — Equipo · multi-repo

`<repo>/.claude/skills/<nombre>/SKILL.md` — **esta vía ya está resuelta**:
las 15 skills viven en `.claude/skills/` de este repositorio y están
commiteadas en el branch `claude/lawyers-guide-toc-ss9zcm`. Cualquier
compañero que clone el repo y abra Claude Code las tiene disponibles de
inmediato, sin instalar nada a mano. Los cambios futuros a una skill se
revisan como cualquier otro archivo, vía pull request.

---

## Mantenimiento

- Antes de subir o commitear una skill nueva o editada, corre
  `python3 scripts/validate_skill.py --path .claude/skills/<nombre>/SKILL.md`.
- Para regenerar los zips de la Vía 01 después de cualquier cambio, vuelve a
  correr `package_skills_for_upload.sh` — no se versionan los `.zip` en git
  (`dist/` está en `.gitignore`), solo el script que los genera.
