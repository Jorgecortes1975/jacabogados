---
name: landing-page-lexa
version: "1.0"
description: >
  Genera landing pages premium Dark Mode para el Bufete Cortés Cartagena,
  LEXA-LAB y clientes empresariales colombianos. Produce HTML autocontenido
  con glassmorphism, animaciones, flip cards, sistema de partículas y branding
  corporativo. Activar cuando el usuario pida: landing page, página web, sitio
  de presentación, web del bufete, demo de LEXA-LAB, página de captación,
  diseñar landing, dark mode web, crear sitio web, presencia digital.
activation_triggers:
  - landing page
  - página web
  - sitio web
  - web para el cliente
  - demo LEXA-LAB
  - página de servicios
  - web del bufete
  - diseñar landing
  - dark mode web
  - crear sitio
  - presencia digital
  - página de captación
---

# SKILL: Landing Page Premium — LEXA-LAB Edition v1.0

## PROPÓSITO

Generar páginas web de presentación profesional, nivel Dark Luxury, para el
Bufete Cortés Cartagena, LEXA-LAB y clientes empresariales colombianos.

Salida: un archivo HTML único autocontenido (CSS y JS embebidos), listo para
abrir en navegador o publicar en servidor.

---

## INTAKE OBLIGATORIO

Solicitar o inferir antes de generar:

1. Nombre del negocio/marca
2. Tagline (frase de una línea)
3. Sector y tipo (Legal, Empresarial, Tech / corporativa, startup, personal)
4. Color de acento (default: #B8860B dorado para Bufete/LEXA-LAB)

Si el usuario no provee datos, inferir del contexto y declarar supuestos.

---

## SISTEMA DE DISEÑO — DARK LUXURY

### Fondos (invariables)
```
--bg-primary:   #000000
--bg-secondary: #09090B
--bg-tertiary:  #18181B
```

### Textos (invariables)
```
--text-primary:   #FFFFFF
--text-secondary: #E4E4E7
--text-tertiary:  #A1A1AA
```

### Acento para Bufete/LEXA-LAB (dorado #B8860B)
```
--primary-300: #D4A017
--primary-400: #C9920D
--primary-500: #B8860B
--primary-600: #9E7209
--primary-700: #7D5A07
--primary-rgb: 184, 134, 11
```

### Tipografía
- Títulos: Plus Jakarta Sans 700-800 (Google Fonts)
- Cuerpo: Inter 400-500 (Google Fonts)
- H1 hero: 72px, weight 800, letter-spacing -0.02em
- H2 secciones: 48px, weight 700
- H3 cards: 24px, weight 600

---

## SECCIONES OBLIGATORIAS (9 secciones)

1. Navbar fijo — logo, links, CTA, blur al scroll
2. Hero 100vh — badge, H1 gradiente, subtítulo, 2 CTAs, esfera CSS 3D, 50 partículas
3. Social proof — métricas con contadores animados
4. Servicios — 6 flip cards 3D (hover desktop, tap mobile)
5. Métricas/Dashboard — KPIs animados, gráfico CSS
6. Testimonios — 3 glass cards con estrellas
7. Sobre el negocio — grid 1:2 texto + elemento visual
8. CTA final — gradiente radial, botón pulse-glow
9. Footer — columnas, redes sociales SVG, copyright

---

## COMPONENTES CSS OBLIGATORIOS

### Glassmorphism
```css
.glass-card {
  background: linear-gradient(135deg,
    rgba(var(--primary-rgb), 0.08) 0%,
    rgba(var(--primary-rgb), 0.04) 50%,
    rgba(var(--primary-rgb), 0.08) 100%);
  backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(var(--primary-rgb), 0.15);
  border-radius: 24px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.3),
              inset 0 1px 0 0 rgba(255,255,255,0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card:hover {
  border-color: rgba(var(--primary-rgb), 0.35);
  box-shadow: 0 25px 50px -12px rgba(var(--primary-rgb), 0.35);
  transform: translateY(-4px);
}
```

### Botón CTA primario
```css
.btn-primary {
  background: linear-gradient(135deg,
    var(--primary-600) 0%, var(--primary-500) 50%, var(--primary-400) 100%);
  background-size: 200% 200%;
  animation: gradient-shift 4s ease infinite, pulse-glow 3s ease-in-out infinite;
  border-radius: 12px;
  padding: 16px 32px;
  font-weight: 600;
  color: #fff;
  border: none;
  cursor: pointer;
}
```

### Flip Card 3D
```css
.flip-card { perspective: 1000px; height: 320px; }
.flip-card-inner {
  position: relative; width: 100%; height: 100%;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}
.flip-card:hover .flip-card-inner,
.flip-card.flipped .flip-card-inner { transform: rotateY(180deg); }
.flip-card-front, .flip-card-back {
  position: absolute; width: 100%; height: 100%;
  backface-visibility: hidden; border-radius: 20px;
}
.flip-card-back { transform: rotateY(180deg); }
```

### Esfera hero CSS 3D
```css
.sphere {
  width: 350px; height: 350px;
  position: relative;
  animation: float 6s ease-in-out infinite;
}
.sphere-inner {
  width: 100%; height: 100%;
  background: linear-gradient(135deg,
    rgba(var(--primary-rgb), 0.1) 0%,
    rgba(var(--primary-rgb), 0.25) 100%);
  border-radius: 50%;
  border: 2px solid rgba(var(--primary-rgb), 0.35);
  box-shadow: 0 0 60px rgba(var(--primary-rgb), 0.4),
              0 0 120px rgba(var(--primary-rgb), 0.25),
              inset 0 0 60px rgba(var(--primary-rgb), 0.15);
  backdrop-filter: blur(10px);
}
```

---

## ANIMACIONES OBLIGATORIAS

```css
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(2deg); }
  75% { transform: translateY(-30px) rotate(-1deg); }
}

@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 1px rgba(var(--primary-rgb),0.5),
                         0 4px 24px rgba(var(--primary-rgb),0.4); }
  50%       { box-shadow: 0 0 0 2px rgba(var(--primary-rgb),0.8),
                         0 8px 40px rgba(var(--primary-rgb),0.7); }
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50%       { background-position: 100% 50%; }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes float-particle {
  0%, 100% { transform: translate(0,0); opacity: 0.3; }
  50%       { transform: translate(var(--tx), var(--ty)); opacity: 0.7; }
}
```

---

## JAVASCRIPT OBLIGATORIO

1. Sistema de 50 partículas flotantes con posición y velocidad aleatoria
2. Intersection Observer para animaciones fade-in-up al scroll
3. Contadores animados (0 → valor final en 2 segundos) para KPIs
4. Navbar: clase .scrolled al superar 50px de scroll
5. Smooth scroll para links internos
6. Flip cards: toggle clase .flipped en click (mobile) / hover (desktop)
7. Menú hamburguesa en mobile

---

## RESPONSIVE

- Desktop XL (≥1440px): layout completo
- Desktop (1024–1439px): ajustes de espaciado
- Tablet (768–1023px): grid 2 columnas en servicios
- Mobile (≤767px): 1 columna, hamburguesa, flip por tap, partículas reducidas a 20

---

## VARIANTES PRECONFIGURADAS

### VARIANTE A: LEXA-LAB (Tech/Legal)
```
Nombre: LEXA-LAB — Bufete Cortés Cartagena
Tagline: La inteligencia de las Altas Cortes, ahora en tu despacho
Acento: #B8860B
Sector: Legal Tech
Servicios: Litigio IA / Jurisprudencia / Contratos / Penal / Empresarial / Plataforma
CTA: "Solicitar demostración" / "Ver cómo funciona"
```

### VARIANTE B: Bufete Cortés Cartagena (corporativa)
```
Nombre: Bufete Cortés Cartagena
Tagline: Defensa jurídica de alto estándar en Medellín
Acento: #B8860B
Sector: Legal / Corporativa
Servicios: Laboral / Constitucional / Civil / Penal / Mercantil / Familia
CTA: "Consulta inicial" / "Conocer el equipo"
Footer: T.P. 365.594 — Medellín, Colombia
```

### VARIANTE C: Cliente empresarial
```
Nombre: [del cliente]
Acento: [definir en intake]
Servicios: [según giro]
Adaptar hero, CTA y footer al cliente
```

---

## REGLAS DE PRODUCCIÓN

1. HTML único autocontenido — CSS y JS embebidos en el mismo archivo
2. Sin imágenes externas — solo CSS, SVG inline y Canvas API
3. Sin CDN de JavaScript — solo Vanilla JS
4. Google Fonts: única dependencia de red permitida
5. Contenido en español salvo indicación contraria
6. Para Bufete/LEXA-LAB: T.P. 365.594 en footer, datos Medellín
7. Mínimo 450 líneas de código real (sin comentarios vacíos)
8. Todo el código comentado por sección

---

## CADENA DE INTEGRACIÓN

```
landing-page-lexa
  → kit-entregables-col     (entrega el .html como descargable)
  → dashboard-ejecutivo-col (si requiere datos integrados)
  → marketing-digital-col   (estrategia post-lanzamiento)
```

---

## CHECKLIST DE CALIDAD

- [ ] HTML válido y autocontenido
- [ ] 9 secciones presentes
- [ ] Flip cards: hover (desktop) + tap (mobile)
- [ ] 50 partículas flotantes en hero
- [ ] Contadores animados en KPIs
- [ ] Navbar sticky con blur
- [ ] Responsive en 4 breakpoints
- [ ] Smooth scroll activo
- [ ] Sin imágenes externas
- [ ] Sin librerías JS externas
- [ ] Footer correcto para el cliente
- [ ] Código comentado por sección

---

## NOTA ANTI-ALUCINACIÓN

Este skill genera solo código HTML/CSS/JS. No produce afirmaciones jurídicas
ni cita normas ni jurisprudencia. No aplica el sistema de etiquetas de certidumbre
jurídica. Sí aplica el estándar de calidad técnica y visual del ecosistema LEXA-LAB.
