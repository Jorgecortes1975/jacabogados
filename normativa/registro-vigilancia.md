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

(Sin barridos registrados aún — el primer barrido inaugura esta bitácora.)
