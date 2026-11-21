---
name: frontend-design-jac-abogados
description: Adaptación de frontend-design para JAC Abogados Asociados (Colombia). Úsala al diseñar o rediseñar la landing page, la página de servicios, piezas de Instagram o el perfil de WhatsApp Business del despacho. Incluye tokens de diseño de partida, reglas de contenido jurídico y verificación de la página en Playwright a 360 px y 1440 px. Complementa el skill frontend-design, que debe estar instalado.
---

# Diseño para JAC Abogados Asociados

Esta skill complementa a `frontend-design`. Aplique primero sus pautas de plan, revisión frente al brief y autocrítica. Lo que sigue fija el brief del despacho. Donde este documento fija una dirección visual, prevalece sobre cualquier valor por defecto.

## 1. Brief del cliente (confirmar antes de diseñar)

Fuentes del brief: `plan_marketing_digital_jaabogados.md` y `CLAUDE.md` del repositorio jacabogados.

1. Sujeto: firma de abogados colombiana con enfoque corporativo, de contratos y de pymes.
2. Audiencia: gerentes y fundadores de pymes, emprendedores y empresas extranjeras que entran a Colombia. Son personas ocupadas que buscan confianza antes que espectáculo.
3. Trabajo principal de la página: que la persona entienda en diez segundos qué resuelve el despacho y agende una consulta por WhatsApp o calendario.
4. Tono: formal, preciso y cercano. Lenguaje claro, sin jerga innecesaria y sin tono de anuncio.

Nombre oficial de la firma: no está resuelto. Los archivos del repositorio usan tres variantes: "JAC - Abogados Asociados" (CLAUDE.md), "JA Abogados" (mensaje de bienvenida del plan) y "jaabogados" (usuario de Instagram). Antes de publicar, confirme el nombre oficial. Mientras tanto, use "JAC Abogados Asociados" y márquelo como provisional.

## 2. Contenido y servicios

Los ocho pilares del portafolio son la estructura de la sección de servicios. Use estos nombres exactos:

1. Derecho Corporativo y M&A
2. Contratos y Compliance
3. Derecho Laboral y Litigios
4. Tributario y Financiero
5. Civil, Comercial y Administrativo
6. Redacción Jurídica Profesional
7. Consultoría para Pymes
8. Asesoría a Empresas Extranjeras

Cada pilar describe a quién sirve, con un lenguaje que el cliente entienda sin traducción. Ejemplo: "Para pymes con contratos comerciales recurrentes", no "Gestión integral de obligaciones contractuales".

## 3. Reglas de contenido jurídico (no negociables)

1. No invente cifras, resultados, casos, testimonios ni reseñas. Si falta contenido real, deje un marcador visible, por ejemplo [CASO PENDIENTE DE CONFIRMAR].
2. No prometa resultados ni use frases como "ganamos el 90 % de los casos".
3. No cite normas ni sentencias en el diseño sin verificarlas en fuente oficial. Para normas colombianas, la fuente de referencia es el Diario Oficial o SUIN Juriscol. El Decreto 0581 de 2026, citado en el plan, requiere verificación antes de publicarse.
4. Deje espacio para la tarjeta profesional, la matrícula o el registro que corresponda al abogado responsable. No los invente.
5. Antes de publicar, pida revisión del abogado responsable sobre las normas aplicables a la publicidad de servicios profesionales en Colombia. Este skill no determina esa regla.
6. Los enlaces de contacto son marcadores hasta que el despacho entregue el número real. Use la forma wa.me/57XXXXXXXXXX y no lo complete por cuenta propia.

## 4. Dirección visual de partida (a confirmar)

El plan propone azul marino con dorado. Úselo como punto de partida, no como respuesta final:

1. Base: azul marino profundo, con un blanco cálido para superficies de lectura.
2. Acento: un solo tono dorado o ámbar, reservado para la acción principal (agendar consulta).
3. Tipografía: una familia para titulares y cuerpo, o dos claramente distintas. Use peso y tamaño para la jerarquía, no una segunda fuente decorativa. Priorice letras legibles en móvil, porque la mayoría de las visitas vendrán de Instagram.
4. Evite el lenguaje visual de la abogacía genérica: balanzas, mazos, columnas griegas, fotos de apretón de manos y fondos de mármol. Si se usa una fotografía del abogado, debe ser real, con buena luz y sin filtros.

Si el despacho confirma otra identidad visual, esa identidad prevalece.

### Tokens de partida

Defina los colores como variables en `:root` y no los repita en el resto del CSS. Los valores son marcadores para ajustar con el despacho; los que aparecen como "pendiente" no deben publicarse sin confirmación.

```css
:root {
  --color-base: #0f1f3a;        /* azul marino, propuesto por el plan */
  --color-superficie: #faf7f2;  /* blanco cálido para lectura */
  --color-texto: #1a1a1a;
  --color-acento: #b8862b;      /* dorado, solo para la acción principal */
  --color-acento-texto: #0f1f3a;/* pendiente: verificar contraste sobre el acento */
  --fuente-titulo: "pendiente de elegir";
  --fuente-cuerpo: "pendiente de elegir";
  --radio: 4px;                 /* radio único en todo el sitio */
}
```

## 5. Estructura de la landing page

Según el plan del repositorio, la página debe seguir este orden:

1. Hero: una promesa concreta para empresas que crecen en Colombia, una línea de apoyo y un botón principal de consulta.
2. Servicios: los ocho pilares en una lista navegable.
3. Por qué el despacho: tres razones verificables. No use adjetivos vacíos.
4. Casos o resultados: solo con material confirmado y sin revelar información confidencial. Si no hay material, omita la sección; no la llene con texto de relleno.
5. Blog jurídico: espacio para artículos de SEO. Puede mostrarse como marcador.
6. Contacto: WhatsApp y agenda de consulta. El botón principal es el mismo en toda la página.
7. Pie de página: nombre oficial, ciudad de atención, matrícula o registro pendiente, redes y aviso de que la información es general y no reemplaza una asesoría personalizada.

## 6. Piezas de Instagram

1. Carruseles de 5 a 8 diapositivas en formato vertical de 1080 × 1350 px. Una idea por diapositiva y texto grande con contraste alto.
2. Use los títulos del plan como punto de partida, por ejemplo "SAS vs LTDA: cuál conviene más para su empresa en Colombia".
3. Mantenga una identidad reconocible en la portada: mismo fondo, misma tipografía, mismo lugar para el nombre de la firma.
4. Revise el texto en la vista previa de un teléfono. Debe leerse sin zoom.

## 7. Accesibilidad y calidad mínima

1. Contraste de texto de al menos 4.5:1 frente al fondo. Mida cada par de color, incluido el texto sobre el dorado.
2. Navegación completa por teclado, con foco visible.
3. Sin desplazamiento horizontal desde 360 px de ancho.
4. Respete la preferencia de movimiento reducido. No use animaciones de entrada en cada sección.
5. Textos alternativos en imágenes y etiquetas en formularios.

## 8. Verificación antes de entregar

Cuando la página exista en un entorno local, verifíquela con el skill `webapp-testing` (Playwright):

1. Abra la página a 360 px y a 1440 px de ancho. En ambos, confirme que `document.documentElement.scrollWidth` no supere `window.innerWidth`.
2. Tome capturas a escala 2 en ambos anchos y revise el hero, la lista de servicios y el botón de contacto.
3. Recorra la página con la tecla Tab y confirme que el foco es visible en cada control interactivo.
4. Revise la consola del navegador y reporte cualquier error.

Luego revise el contenido:

1. Cada cifra, caso, testimonio y norma tiene fuente confirmada o figura como pendiente.
2. Todo marcador que falte está listado en la entrega, para que el despacho lo complete.
3. La acción principal es la misma en toda la página.
4. Se indica al usuario qué decisiones de marca se tomaron y cuáles quedan pendientes de confirmar.
