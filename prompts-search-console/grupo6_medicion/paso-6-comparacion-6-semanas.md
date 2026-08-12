### Paso 6: Medir a las Seis Semanas (Cierre del Ciclo)
**Contexto:** Volviste a exportar. Compara contra la exportación vieja. ¿Funcionó?

```
Te voy a dar dos exportaciones de Search Console: la vieja (donde decidimos qué escribir) y la nueva (que acabas de bajar hace poco).

Compáralas y dime si funcionó mi estrategia legal.

1. Para cada tema/consulta en el que publiqué o mejoré algo, dime:
   - Consulta
   - Rama legal
   - Cómo se movió la posición promedio (posición vieja → posición nueva)
   - Cómo se movieron las impresiones
   - Cómo se movieron los clics
   - El cambio en porcentaje

2. Sepárame lo que SUBIÓ (gané posiciones, impresiones o clics), lo que se quedó IGUAL, y lo que BAJÓ.

3. Dime qué consultas NUEVAS aparecieron que no estaban en la exportación vieja. Esas son las que gané de cero.

4. Dime qué consultas DESAPARECIERON (si desaparecieron, no si bajaron a la fila 1001).

5. Con eso, arma la lista de qué hago en la siguiente vuelta (va al paso 2, ciclo nuevo).

DOS ADVERTENCIAS antes de sacar conclusiones:

TRAMPA 1: El techo de las mil filas.
Si los dos archivos tienen exactamente 1000 filas en consultas O páginas, la cola larga no es comparable.
Una búsqueda puede haber "desaparecido" solo porque otra creció y la empujó fuera del corte. No se cayó, se salió de la foto.
Avísame si pasa.

TRAMPA 2: Los periodos.
Si un archivo cubre 30 días y el otro 45, o si uno cae en temporada alta de demandas laborales y el otro en temporada muerta, las cifras no se pueden leer de frente.
Si los periodos no son iguales, dímelo antes de conclusiones.

RESULTADO: Una lista de lo que funcionó, lo que no, y qué cambio hago en la siguiente exportación.
Esto cierra el ciclo: exportas → analizas → escribes → publicas → auditas → esperas 6 semanas → comparas → repites.
```

---

## 🔗 MAPEO AL SISTEMA GAL

### Integración con Agentes (10 Agentes Especializados)

| Paso | Prompt | Agente GAL Asignado | Descripción |
|------|--------|-------------------|-------------|
| 1 | Inventario | Agente 8: Extracción de Datos | Lee CSV, estructura información |
| 2A | Huecos de Contenido | Agente 1: Síntesis Normativa | Agrupa por rama legal, identifica temas |
| 2B | Zona de Casi | Agente 5: Prescripción | Prioriza por posición, esfuerzo |
| 2C | CTR Bajo | Agente 4: Análisis de Prueba | Detecta fugas, calcula impacto |
| 2D | Canibalización | Agente 6: Legitimación | Resuelve conflictos entre páginas |
| 3 | Priorización | Agente 10: Puntuación Final | Ranking ejecutable |
| 4A | Brief Legal | Agente 2: Jurisprudencia | Estructura con jurisprudencia |
| 4B | Artículo Completo | Agente 3: Análisis de Procedimiento | Redacta con normas aplicables |
| 5A | Auditoría Plugin | Agente 7: Competencia/Readabilidad | Verifica lectura Google + IA |
| 5B | Títulos y Descripciones | Agente 9: Contramedicinas | Redacta títulos defensivos |
| 6 | Comparación 6 Semanas | Agente 10: Puntuación Final | Valida resultados, ciclo nuevo |

---

## ⚙️ INSTALACIÓN Y EJECUCIÓN

### Comandos de Instalación (Previos)
```bash
# 1. Agrupar prompts en un archivo único
node installador-prompts-legal-sc.js agrupar

# 2. Integrar con GAL (Gestor Automático Legal)
node gal-automatizacion.js integrar-search-console

# 3. Validar que los 10 agentes leen el archivo
node agentes-10-independientes.js validar-prompts-sc

# 4. Activar el sistema de loops automáticos (diario: exportación > análisis > escritura)
node loops-agentes-automaticos.js activar-ciclo-search-console

# 5. Activar webhooks de nuevo contenido publicado
node hooks-eventos.js activar contenido-publicado
```

### Ejecución en Orden (Claude Code)
```
Carpeta: /home/user/jacabogados

1. Descarga el CSV de Search Console (16 meses, todas las ramas)
2. Guárdalo en: /home/user/jacabogados/search-console-2026-08-12/
3. Abre Claude Code en esa carpeta
4. Copia EXACTAMENTE este prompt:

[COPIAR EL PROMPT DEL PASO 1 - INVENTARIO]

5. Espera el inventario completo
6. Copia el prompt del paso que sigue (2A, 2B, etc.)
7. Repite hasta llegar a paso 6 (comparación)
```

---

**Guía de Integración JAC + Search Console + GAL**  
Versión 1.0 | 12 de Agosto 2026  
Adaptada de: "Google ya te dijo qué escribir" (11 paradas)  
Especializada en: Derecho Colombiano | 6 Ramas | 10 Agentes | Zero Alucinaciones