Genera una infografía vertical de LinkedIn/Instagram (formato how-to de 3 pasos) en un único HTML autocontenido, lista para captura, con la identidad visual de JA Abogados.

**Contexto — por qué existe este comando:** El plugin oficial `frontend-design@claude-code-plugins` (marketplace `anthropics/claude-code`) no está disponible en entornos remotos de Claude Code en la web (sin acceso a `github.com` fuera del repo del proyecto). Este comando replica manualmente el flujo de esa skill, ya con la paleta y las reglas de marca de JA Abogados bloqueadas — no hay que redefinir estilo cada vez.

## Uso

```
/infografia-linkedin [tema o argumento del usuario]
```

Ejemplo: `/infografia-linkedin cómo blindar legalmente una pyme antes de firmar con un cliente extranjero`

Si el usuario no da tema, propone uno alineado a los 8 pilares de servicio (ver `CLAUDE.md`) y a los prospectos activos del CRM.

## Paso 1 — Definir el contenido (antes de tocar HTML)

Completa estos campos siguiendo reglas estrictas de redacción:

- **Etiqueta** (categoría, MAYÚSCULAS): uno de los 8 pilares, ej. `DERECHO CORPORATIVO`, `CONTRATOS COMERCIALES`, `CUMPLIMIENTO NORMATIVO`.
- **Título how-to**: qué consigue el lector, no qué es el tema. Formato "Cómo [resultado]" o "[Número] señales de que [problema]". Máx. ~10 palabras.
- **3 bloques numerados**: cada uno "[título de 2-4 palabras]" + "[frase de 6-10 palabras, verbatim, sin relleno]". Deben ser pasos accionables en secuencia (1→2→3), no una lista plana de datos.
- **Pie**: `@jaabogados.co` (o el handle real de la red destino) + ciudad `Medellín, Colombia` + WhatsApp `+57 321 704 7556` (medio de contacto directo — ver `CLAUDE.md`, incluir siempre, nunca dejarlo como placeholder).

Reglas de redacción (no negociables):
- Narrativa, no keywords: cada frase describe una acción o consecuencia concreta, no una lista de adjetivos.
- Texto verbatim: una vez definido el contenido, no lo parafrasees al ponerlo en el HTML.
- Nada de promesas de resultado garantizado ni datos de clientes identificables (Ley 1123 de 2007, Art. 34 y 28 — ver sección 13 de `plan_marketing_digital_jaabogados.md`).

## Paso 2 — Composición (bloqueada)

3 bloques en columna, como pasos verticales (1 → 2 → 3):
- Cápsula de categoría centrada arriba de todo.
- Título how-to centrado debajo, ancho máx. ~85% del lienzo.
- Cada bloque: número grande a la izquierda + (título en una línea, frase debajo) a la derecha + separador de línea fina entre bloques.
- Pie centrado al final, separado por una línea de acento delgada.

## Paso 3 — Estilo (bloqueado — paleta de marca JA Abogados)

- Lienzo: **1080×1350px** (4:5, vertical LinkedIn/Instagram).
- Fondo: `#14141F` (oscuro casi negro, tono navy de marca).
- Texto principal: `#FFFFFF`. Texto secundario: `#B9BAC4`.
- Acento único: `#C9A84C` (dorado JA Abogados) — solo en números, la cápsula de categoría y la línea del pie. No introducir un segundo color de acento.
- Tipografía sans del sistema (`-apple-system, "Segoe UI", Inter, Arial, sans-serif`) con contraste de peso: números y títulos en 800/900, cuerpo en 400/500. No usar fuentes web externas (el HTML debe ser 100% autocontenido, sin llamadas de red).
- Colores planos, sin degradados, sin sombras duras, sin emojis. Iconos únicamente de línea fina (SVG stroke, `stroke-width` ~1.5-2px) si se usan — opcionales, nunca obligatorios.
- Mucho aire: padding generoso (~90-100px laterales), espaciado vertical claro entre bloques.

## Paso 4 — Generar y capturar

1. Escribe el HTML+CSS autocontenido en `infografias-linkedin/[slug-del-tema].html`.
2. Captura a 1080×1350px con Playwright/Chromium:
   ```bash
   node -e "
   const { chromium } = require('playwright');
   (async () => {
     const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
     const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
     await page.goto('file://' + process.cwd() + '/infografias-linkedin/[slug-del-tema].html');
     await page.screenshot({ path: 'infografias-linkedin/[slug-del-tema].png' });
     await browser.close();
   })();
   "
   ```
3. Si algo no cuadra (texto cortado, desbalance visual), ajusta el HTML y repite la captura — no aceptes la primera versión si no se ve premium.

## Paso 5 — Caption de publicación

Añade, junto al HTML/PNG, un bloque de texto para publicar (el caption completo con CTA y hashtags), siguiendo el mismo formato usado en `entrega2_carrusel_legal.md` y `entrega3_carrusel_financiero.md`.
