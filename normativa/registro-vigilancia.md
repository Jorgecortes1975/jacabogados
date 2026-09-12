# REGISTRO DE VIGILANCIA NORMATIVA — JA Abogados

Bitácora auditable de todos los barridos ejecutados con el skill
`vigilancia-normativa-col`. Cada barrido se registra AUNQUE no encuentre novedades:
el silencio documentado también es información.

Reglas del registro:
- Un bloque por barrido, el más reciente arriba.
- Los pendientes NO CONFIRMADOS de un barrido se retoman en el siguiente.
- Los hallazgos CRÍTICOS incluyen referencia a la alerta entregada y a los clientes notificados.

---

## Plantilla de entrada

```
## Barrido — [AAAA-MM-DD]
- **Perímetro**: ventana [fechas] · áreas [grupos del radar] · ejecutado por [sesión/routine]
- **Fuentes consultadas**: [lista con estado OK / FALLA(motivo)]
- **Hallazgos**: [n] confirmados ([CRÍTICO/MODERADO/BAJO]) · [n] en trámite · [n] no confirmados · [n] descartados
  - [veredicto] [identificador completo] — [síntesis 1 línea] — [URL] (consultado [fecha])
- **Pendientes para el próximo barrido**: [lista o "ninguno"]
- **Limitaciones**: [fuentes caídas / periodos sin cubrir / "ninguna"]
- **Alerta entregada**: [ruta del archivo o "no ameritó alerta"]
```

---

## Barrido — 2026-07-18
- **Perímetro**: chequeo Grupo 1 (valores anuales 2026: SMLMV, auxilio de transporte, UPC) contra las normas que los fijan · ejecutado en sesión con el usuario
- **Fuentes consultadas**: presidencia.gov.co FALLA(403 proxy) · minsalud.gov.co PDF Res. 2764 FALLA(500) · Legal Data Hunter FALLA(cuota diaria agotada) · Gestor Normativo de Función Pública vía navegador remoto OK (Conceptos DAFP 005171/2026 y 062131/2026 con transcripción literal de los decretos) · página UPC de Minsalud OK (sin valores en texto)
- **Hallazgos**: 2 confirmados (CRÍTICO) · 1 no confirmado · 0 descartados
  - CONFIRMADO — Decreto 1469 del 29-dic-2025, art. 1: SMLMV 2026 = $1.750.905 (+23%) — transcripción oficial en Concepto DAFP 062131/2026, funcionpublica.gov.co/eva/gestornormativo/norma.php?i=276596 (consultado 18-jul-2026)
  - CONFIRMADO — Decreto 1470 del 29-dic-2025, art. 1: auxilio de transporte 2026 = $249.095 (hasta 2 SMLMV) — transcripción oficial en Concepto DAFP 005171/2026, funcionpublica.gov.co/eva/gestornormativo/norma.php?i=274217 (consultado 18-jul-2026)
  - [No verificado] — UPC 2026 (Resolución 2764 de 2025, Minsalud): la resolución existe (PDF oficial identificado en minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/DIJ/resolucion-2764-2025.pdf, error 500) pero los valores (señal: UPC-C $1.658.912,01/año, UPC-S $1.541.706,27/año) solo aparecen en réplicas no estatales — no confirman. Ruta manual: abrir el PDF oficial o SUIN cuando se restablezcan
- **Control anti-vicios**: decretos 1469/1470 rigen desde 1-ene-2026, reemplazan los valores 2025 por sustitución anual ordinaria; sin señales de suspensión o nulidad al 18-jul-2026. Los valores anteriores del CLAUDE.md ($1.576.500 / $163.286 / $314.020) no corresponden a ninguna norma 2026 detectada — corregidos
- **Pendientes para el próximo barrido**: confirmar UPC 2026 en texto oficial (Res. 2764/2025 y posibles modificaciones — señal de Res. 276/2026); heredados: C-081/26, C-507/23, Decreto 1561/2022, circular Mintrabajo de jornada, Res. 196/2026 Minsalud
- **Limitaciones**: portales .gov.co bloqueados por proxy (403) — verificación lograda por Gestor Normativo vía navegador remoto; referencia "Ley 2288 de 2023: Reforma pensional" del CLAUDE.md luce errada (la reforma pensional es la Ley 2381 de 2024, suspendida por Auto 841/25) — no se corrigió por estar fuera del alcance pedido; decisión del usuario
- **Alerta entregada**: reporte en sesión + CLAUDE.md actualizado (v. historial Jul 18, 2026)
