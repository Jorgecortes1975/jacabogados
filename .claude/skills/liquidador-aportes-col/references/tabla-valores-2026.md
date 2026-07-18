# TABLA MAESTRA DE VALORES — Vigencia 2026

Única fuente de parámetros para `liquidador-aportes-col`. Cada fila tiene
ESTADO: **CONFIRMADO** (leído en fuente oficial, con URL y fecha) o
**PENDIENTE** (base legal identificada, transcripción literal aún no leída en
esta u otra sesión — verificar con `vigilancia-normativa-col` antes del primer
entregable a cliente que lo use, y ascenderlo aquí a CONFIRMADO con fecha).

Actualizar esta tabla SOLO con verificaciones en vivo; registrar cada ascenso
de estado en `normativa/registro-vigilancia.md`.

## Valores monetarios anuales

| Parámetro | Valor 2026 | Norma | Estado |
|---|---|---|---|
| SMLMV | $1.750.905 | Decreto 1469 del 29-dic-2025, art. 1 | **CONFIRMADO** 18-jul-2026 — transcripción oficial en Concepto DAFP 062131/2026 (funcionpublica.gov.co/eva/gestornormativo/norma.php?i=276596) |
| Auxilio de transporte (salario ≤ 2 SMLMV) | $249.095 | Decreto 1470 del 29-dic-2025, art. 1 | **CONFIRMADO** 18-jul-2026 — transcripción oficial en Concepto DAFP 005171/2026 (funcionpublica.gov.co/eva/gestornormativo/norma.php?i=274217) |
| UPC (referencia sectorial, no insumo de nómina) | s/d | Resolución 2764 de 2025, Minsalud | **PENDIENTE** — PDF oficial inaccesible el 18-jul-2026; no usar cifra alguna |

## Jornada y recargos (verificados en sesión del 18-jul-2026)

| Parámetro | Valor | Norma | Estado |
|---|---|---|---|
| Jornada máxima | 42 h/semana, 8 h/día (flexible pactada 4–9 h) | Ley 2101/2021 art. 3 (fase final 15-jul-2026); art. 161 CST mod. Ley 2466/2025 art. 11 | **CONFIRMADO** 18-jul-2026 (texto leído: funcionpublica.gov.co/eva/gestornormativo/norma.php?i=166506 y ?i=260676) |
| Divisor horario mensual | 210 h (42×5 sem.) | [Inferencia aritmética estándar — la ley no fija divisor único] | Usar declarándolo como inferencia |
| Franja nocturna | 7:00 p.m.–6:00 a.m. (desde 25-dic-2025) | Ley 2466/2025 art. 10 (art. 160 CST) | **CONFIRMADO** 18-jul-2026 |
| Recargo nocturno | 35% (NO cambió con la reforma) | Art. 168 CST (red. Ley 50/1990 art. 24) | **CONFIRMADO** 18-jul-2026 (art. 168 verificado sin modificación en la Ley 2466) |
| Horas extra | diurna 25% · nocturna 75% · máx. 2 h/día y 12 h/sem., con registro obligatorio | Art. 168 CST; art. 22 Ley 50/1990 mod. art. 13 Ley 2466/2025 | **CONFIRMADO** 18-jul-2026 |
| Recargo día de descanso obligatorio/festivo | **90% (1-jul-2026 a 30-jun-2027)** → 100% desde 1-jul-2027 | Art. 179 CST mod. Ley 2466/2025 art. 14, parágrafo transitorio | **CONFIRMADO** 18-jul-2026 — ¡verificar fase vigente en cada uso posterior a jun-2027! |

## Aportes a seguridad social — PENDIENTES de transcripción literal

Base legal identificada y fuente localizada (Ley 100 compilada con notas de
vigencia: secretariasenado.gov.co/senado/basedoc/ley_0100_1993_pr004.html —
accesible vía navegador remoto, verificado 18-jul-2026). Los porcentajes NO se
han transcrito de la fuente en sesión: ascender a CONFIRMADO antes del primer
entregable.

| Parámetro | Valor de trabajo | Base legal | Estado |
|---|---|---|---|
| Salud (total 12.5%: empleador 8.5% + trabajador 4%) | 12.5% del IBC | Ley 100 art. 204 (mod. Ley 1122/2007 art. 10) | **PENDIENTE** |
| Pensión (total 16%: empleador 12% + trabajador 4%) | 16% del IBC | Ley 100 art. 20 (mod. Ley 797/2003 art. 7) | **PENDIENTE** |
| Fondo de Solidaridad Pensional (IBC ≥ 4 SMLMV) | 1% + escala adicional desde 16 SMLMV | Ley 100 art. 27 (mod. Ley 797/2003) | **PENDIENTE** |
| ARL (100% empleador) | clases I–V: 0.522%–6.960% | Decreto 1772/1994 art. 13; Decreto 1607/2002 (clasificación) | **PENDIENTE** |
| Parafiscales: Caja 4% · SENA 2% · ICBF 3% | sobre nómina | Ley 21/1982; Ley 89/1988; Ley 789/2002 | **PENDIENTE** |
| Exoneración salud empleador + SENA + ICBF (trabajadores < 10 SMLMV, empleadores del art.) | según art. 114-1 E.T. | Art. 114-1 Estatuto Tributario (Ley 1819/2016 y mod.) | **PENDIENTE** |
| IBC independientes | 40% del ingreso mensualizado (con presunción de costos) | Ley 2277/2022 art. 89; señal: Decreto 0379/2026 nuevas reglas — pendiente del barrido | **PENDIENTE** |
| Salario integral (factor y base de cotización 70%) | ≥ 13 SMLMV (10 + 3 factor) | Art. 132 CST (Ley 50/1990) | **PENDIENTE** |
| Tope IBC | 25 SMLMV | Ley 797/2003 art. 5; Decreto 1833/2016 | **PENDIENTE** |

## Prestaciones sociales — PENDIENTES de transcripción literal

| Parámetro | Valor de trabajo | Base legal | Estado |
|---|---|---|---|
| Cesantías | 1 mes de salario/año (≈8.33% mensual) | Art. 249 CST | **PENDIENTE** |
| Intereses a las cesantías | 12% anual sobre saldo | Ley 52/1975 | **PENDIENTE** |
| Prima de servicios | 30 días de salario/año, pagadera jun/dic (≈8.33%) | Art. 306 CST (mod. Ley 1788/2016) | **PENDIENTE** |
| Vacaciones | 15 días hábiles/año (≈4.17%, base sin auxilio) | Art. 186 CST | **PENDIENTE** |
| Dotación | 3 entregas/año, salario ≤ 2 SMLMV | Art. 230 CST | **PENDIENTE** |

---

**Historial de la tabla**

| Fecha | Cambio |
|---|---|
| 18-jul-2026 | v1.0 — Creación: monetarios y jornada/recargos CONFIRMADOS en sesión (barrido Grupo 1 + verificaciones de la Ley 2466); aportes y prestaciones PENDIENTES de transcripción con fuente localizada |
