# MASTER_PLAN.md — IslaMontana Travel
> Fuente de verdad única para todos los subagentes. Fecha: 2026-04-23.

---

## RESUMEN EJECUTIVO

Adaptar el prototipo `C:\Users\Santiago Die\Downloads\Landing Page.html` a la aplicación Next.js existente en `C:\Users\Santiago Die\Desktop\IslaMontana\IslaMontanaWeb\frontend`. La landing page de la home actualmente solo tiene Hero + Navbar + Footer. Hay que añadir el resto de secciones del prototipo: Stats, Destinations, WhyUs, Tours, Gallery, FinalCta.

**Stack:** Next.js 14 + TypeScript + Tailwind CSS v3 + CSS Modules puros (el proyecto usa CSS custom en `/src/styles/`)

---

## SECCIÓN 1: ANÁLISIS DEL PROTOTIPO

### Estructura HTML completa (orden de renderizado)
```
App
├── Navbar          (fixed, transparent→scrolled, ya implementada)
├── Hero            (slideshow 3 imágenes, 100svh, YA implementada)
├── Stats           (4 contadores animados con IntersectionObserver)
├── Destinations    (grid asimétrico 2col, "Ecuador cuatro mundos")
├── WhyUs           (split 38%/62%, 4 trust-items grid 2x2)
├── Tours           (3 tour cards fondo oscuro)
├── Gallery         (grid asimétrico 2fr/1fr/1fr con 5 imágenes)
├── FinalCta        (dark bg + texto decorativo "EC", dos CTAs)
└── Footer          (ya implementado)
```

### Paleta de colores EXACTA
```css
:root {
  --color-primary:  #3aa023;   /* verde principal — botones, acentos */
  --color-accent:   #abd430;   /* amarillo-verde lima — badges, stats, highlights */
  --color-dark:     #0d200c;   /* fondo oscuro principal */
  --color-dark-mid: #1a3a18;   /* variante media oscura */
  --color-gray:     #6b7560;   /* texto secundario */
  --color-light-bg: #f4f8f2;   /* fondo claro secciones */
  --color-white:    #ffffff;

  /* Específicos secciones */
  --color-tour-card-bg: #0f1e0e;  /* fondo cards de tours */
  --color-footer-bg:    #071208;  /* fondo footer (más oscuro que --dark) */
}
```
> NOTA: Estas variables YA EXISTEN en `globals.css`. Solo usar las existentes.

### Tipografía
- **Familia:** Outfit (300, 400, 500, 600, 700, 800, 900) — ya cargada
- **Headlines:** font-weight 900, letter-spacing -0.035em, line-height 0.95
- **Labels/badges:** font-weight 700, letter-spacing 0.14-0.2em, text-transform uppercase, font-size 11px
- **Body:** font-weight 300-400, line-height 1.72-1.75
- **Stats números:** font-size clamp(40px,5vw,64px), font-weight 900, color var(--color-accent)

### Animaciones del prototipo
```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes countUp { /* para stats: opacity + translateY */ }
/* Delays escalonados: 60ms, 160ms, 280ms, 400ms, 520ms, 640ms */
```

---

## SECCIÓN 2: ANÁLISIS DEL PROYECTO EXISTENTE

### Estructura de archivos
```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← RootLayout: Navbar + main + Footer
│   │   ├── page.tsx            ← Home: actualmente solo Hero
│   │   ├── destinations/       ← páginas de destinos
│   │   ├── tours/              ← páginas de tours
│   │   ├── contact/            ← contacto
│   │   └── api/                ← rutas API
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      ← Navbar completa (responsive, mega-menu)
│   │   │   ├── Footer.tsx      ← Footer implementado
│   │   │   └── MegaMenu.tsx    ← Mega menu desktop
│   │   ├── destinations/       ← componentes páginas destinos
│   │   ├── tours/              ← componentes páginas tours
│   │   └── ui/                 ← UI genéricos
│   ├── styles/
│   │   ├── globals.css         ← Tokens + reset + import de módulos
│   │   ├── navbar.css          ← Estilos navbar
│   │   ├── footer.css          ← Estilos footer
│   │   ├── home.css            ← Estilos hero (AQUÍ van las nuevas secciones home)
│   │   └── breakpoints/
│   │       ├── mobile.css
│   │       ├── tablet.css
│   │       └── desktop.css
│   ├── hooks/
│   │   └── useHeroImages.ts
│   ├── lib/
│   │   ├── api.ts
│   │   ├── types.ts
│   │   └── adapters.ts
│   └── data/
├── public/
│   └── images/                 ← imágenes existentes
├── package.json                ← Next 14, React 18, Tailwind 3, TypeScript 5
└── tailwind.config.ts
```

### Convenciones del proyecto (CRÍTICO — seguir exactamente)
1. **CSS:** El proyecto usa CSS custom puro en `/src/styles/`, NO Tailwind para estilos complejos. Tailwind solo para utilidades simples.
2. **Hover siempre con media query:** `@media (hover: hover) and (pointer: fine)` — ya establecido en globals.css
3. **`min-h-[100dvh]` no `h-screen`** — ya en home.css
4. **Client Components** marcados con `'use client'` cuando usan hooks/estado
5. **Server Components** por defecto para layouts estáticos
6. **Imágenes** con `next/image` usando `fill` o `width/height`
7. **`--px` token** para padding horizontal consistente
8. **Nombres de clases BEM:** `.section__element--modifier`

### Archivos que hay que modificar/crear
- `src/app/page.tsx` — añadir Stats, Destinations, WhyUs, Tours, Gallery, FinalCta
- `src/styles/home.css` — añadir CSS de nuevas secciones
- `src/components/home/` — carpeta nueva con componentes de cada sección (client si necesitan animaciones)

---

## SECCIÓN 3: SKILLS DE FRONTEND DISPONIBLES

### SKILL 1: design-taste-frontend (SKILL 1.md)
- **Qué hace:** Reglas de diseño senior. DESIGN_VARIANCE=8, MOTION_INTENSITY=6, VISUAL_DENSITY=4
- **Aplicar para:** Anti-hover sin media query, asymmetric layouts, no center-bias, hardware acceleration
- **Reglas clave:**
  - ANTI-EMOJI: usar SVG icons, no emojis
  - Hover SIEMPRE con `@media (hover: hover) and (pointer: fine)`
  - `min-h-[100dvh]` no `h-screen`
  - CSS Grid sobre flex-math
  - Animate solo `transform` y `opacity`
  - Framer Motion solo si instalado (NO está en package.json — NO usar)

### SKILL 2: ui-ux-pro-max (SKILL 2.md)
- **Qué hace:** Guía UX exhaustiva, accesibilidad, touch targets, responsive
- **Aplicar para:** Touch targets ≥44px, prefers-reduced-motion, contrast ratios, nav patterns
- **Reglas clave:**
  - Touch targets mínimo 44×44px
  - Mobile-first breakpoints: 375 / 768 / 1024 / 1440
  - No hover-only interactions
  - `prefers-reduced-motion` respetado

### SKILL 3: emil-design-eng (SKILL 3.md)
- **Qué hace:** Filosofía de animación, easing curves, spring physics, clip-path
- **Aplicar para:** Todas las animaciones del proyecto
- **Reglas clave:**
  - Easing custom: `cubic-bezier(0.23, 1, 0.32, 1)` para ease-out
  - Nunca `scale(0)` — partir de `scale(0.95)` + `opacity: 0`
  - Exit más rápido que enter (enter: 300ms, exit: 180ms)
  - Stagger: 30-80ms entre items
  - Buttons: `scale(0.97)` en `:active`
  - `@media (hover: hover) and (pointer: fine)` obligatorio

---

## SECCIÓN 4: PLAN POR DISPOSITIVO

### Mobile (< 768px) — Touch-first, SIN hover effects
| Elemento | Comportamiento Mobile |
|----------|----------------------|
| Stats | Grid 2×2 (1fr 1fr), padding 52px 24px |
| Destinations | Stack vertical (flex-direction: column), altura card: 220px |
| WhyUs | Columna única, texto primero luego grid 1fr |
| Tours | Grid 1fr (stack vertical) |
| Gallery | Grid 2×2, 4 imágenes (cortar la 5ª con "+X fotos") |
| FinalCta | text-align left, align-items flex-start |
| Scroll hint Hero | `display: none` (ya implementado) |
| Hover effects | TODOS desactivados en mobile |
| Botones | `width: 100%; justify-content: center` en CTAs de section |
| Touch targets | mínimo 44px de alto en todos los links/botones |

### iPad/Tablet (768px–1023px) — Híbrido
| Elemento | Comportamiento Tablet |
|----------|----------------------|
| Stats | Grid 2×2 o 4 col según ancho disponible |
| Destinations | Grid 2 columnas (big card ocupa 1 col) |
| WhyUs | Row si hay espacio, column si no |
| Tours | Grid 2 columnas |
| Gallery | Grid asimétrico pero con alturas reducidas |
| FinalCta | Centrado |
| Hover | Permitido con `@media (hover: hover) and (pointer: fine)` |

### Desktop (> 1024px) — Full features
| Elemento | Comportamiento Desktop |
|----------|----------------------|
| Stats | Grid 4 columnas con separadores verticales |
| Destinations | Grid 2 col: primera ocupa 2 filas (tall card), resto 1 fila |
| WhyUs | Split 38%/62% horizontal |
| Tours | Grid 3 columnas |
| Gallery | Grid `2fr 1fr 1fr`, 2 filas de 240px cada una |
| FinalCta | Centrado, texto decorativo "EC" tamaño 280px |
| Hover | Todos los efectos activos |
| Scroll hint | Visible |

---

## SECCIÓN 5: DATA DEL PROTOTIPO (para hardcodear en componentes)

### STATS
```ts
const STATS = [
  { value: 10,   suffix: '+', label: 'Años de experiencia' },
  { value: 3800, suffix: '+', label: 'Viajeros satisfechos' },
  { value: 4,    suffix: '',  label: 'Regiones únicas' },
  { value: 98,   suffix: '%', label: 'Tasa de satisfacción' },
]
```

### DESTINATIONS
```ts
const DESTINATIONS = [
  { slug: 'galapagos',        name: 'Islas Galápagos',        label: 'Fauna & Snorkel',        src: '/images/galapagos.webp',        accent: '#1a7a8a', desc: 'Nada junto a leones marinos...' },
  { slug: 'amazonia',         name: 'Amazonía Ecuatoriana',   label: 'Selva & Biodiversidad',  src: '/images/amazonia.webp',         accent: '#2d6a1e', desc: '600 especies de aves...' },
  { slug: 'andes-naturaleza', name: 'Andes & Volcanes',       label: 'Trekking & Cumbres',     src: '/images/andes-naturaleza.webp', accent: '#4a6fa5', desc: 'Ocho volcanes activos...' },
  { slug: 'andes-cultura',    name: 'Andes Cultural',         label: 'Pueblos & Tradición',    src: '/images/galapagos.webp',        accent: '#8B4513', desc: 'Mercados indígenas...' },
]
```

### TOURS
```ts
const TOURS = [
  {
    id: 'galapagos-esencial', name: 'Galápagos Esencial',
    duration: '8 días / 7 noches', difficulty: 'Fácil', price: 'desde $1.890',
    badge: 'Más reservado', accent: '#1a7a8a', region: 'Galápagos',
    highlights: ['Snorkel en Kicker Rock', 'Colonia de leones marinos', 'Guía naturalista certificado']
  },
  {
    id: 'cuyabeno-inmersivo', name: 'Cuyabeno Inmersivo',
    duration: '7 días / 6 noches', difficulty: 'Fácil', price: 'desde $890',
    badge: 'Auténtico', accent: '#2d6a1e', region: 'Amazonía',
    highlights: ['Lodge en Reserva Cuyabeno', 'Delfines rosados del Amazonas', 'Cielos sin contaminación lumínica']
  },
  {
    id: 'quilotoa-loop', name: 'Quilotoa Loop',
    duration: '4 días / 3 noches', difficulty: 'Moderado', price: 'desde $310',
    badge: 'Trekking clásico', accent: '#4a6fa5', region: 'Andes',
    highlights: ['Laguna volcánica esmeralda', 'Trekking guiado 3 días', 'Pueblos Tigua y Zumbahua']
  },
]

const DIFF_COLORS: Record<string, string> = {
  Fácil: '#22c55e',
  Moderado: '#eab308',
  Exigente: '#ef4444',
}
```

### WHY US
```ts
const WHY_ITEMS = [
  { icon: 'compass', title: 'Guías expertos y locales',    desc: 'Todos nuestros guías son certificados por el Ministerio de Turismo de Ecuador...' },
  { icon: 'leaf',    title: 'Turismo responsable',         desc: 'El 15% de cada tour va directo a comunidades locales y proyectos de conservación...' },
  { icon: 'star',    title: 'Grupos reducidos',            desc: 'Máximo 12 personas por tour. Sin masificación, sin prisas...' },
  { icon: 'pin',     title: 'Itinerarios a medida',        desc: '¿Quieres algo diferente? Diseñamos tu viaje desde cero...' },
]
```
> NOTA: Los iconos son emojis en el prototipo pero hay que reemplazarlos por SVG inline (regla ANTI-EMOJI de las skills).

### GALLERY IMAGES
```ts
const GALLERY_IMGS = [
  { src: '/images/galapagos.webp',        span: 2 },
  { src: '/images/amazonia.webp',         span: 1 },
  { src: '/images/andes-naturaleza.webp', span: 1 },
  { src: '/images/paisaje.webp',          span: 1 },
  { src: '/images/lobitos.webp',          span: 1 },
]
```

---

## SECCIÓN 6: COMPONENTES A CREAR

### Estructura de carpetas
```
src/components/home/
├── Stats.tsx              ← 'use client' (IntersectionObserver + countUp)
├── Destinations.tsx       ← Server Component (datos estáticos)
├── DestCard.tsx           ← Server Component con CSS hover
├── WhyUs.tsx              ← Server Component
├── WhyIcon.tsx            ← SVG icons inline
├── Tours.tsx              ← Server Component
├── TourCard.tsx           ← Server Component con CSS hover
├── Gallery.tsx            ← Server Component
└── FinalCta.tsx           ← Server Component
```

### Stats.tsx — 'use client'
```tsx
'use client'
// useEffect + IntersectionObserver para triggear countUp
// useEffect con requestAnimationFrame para animación del número
// Props: ninguna (datos hardcodeados)
// Grid: mobile 2×2, desktop 4 col
// Números: color var(--color-accent), font-weight 900
// Labels: uppercase, letter-spacing 0.1em, color rgba(255,255,255,.42)
```

### Destinations.tsx — Server Component
```tsx
// No 'use client' — datos estáticos
// Importa DestCard.tsx
// Mobile: flex col
// Desktop: grid 2col, primera card ocupa grid-row: 1/3
// Link "Ver todos" en desktop arriba derecha, mobile al final
```

### WhyUs.tsx — Server Component
```tsx
// Importa WhyIcon.tsx para los SVG
// Mobile: col (texto arriba, grid abajo)
// Desktop: row, flex 0 0 38% / flex 1
// Trust items: grid 2×2 desktop, 1 col mobile
// Hover en trust items SOLO con @media (hover: hover)
```

### Tours.tsx — Server Component
```tsx
// Importa TourCard.tsx
// Desktop: grid 3 col
// Tablet: grid 2 col
// Mobile: grid 1 col
// Fondo: var(--color-dark)
```

### Gallery.tsx — Server Component
```tsx
// Desktop: grid `2fr 1fr 1fr`, 2 filas 240px
// Mobile: grid 2×2, 4 imágenes, 5ª oculta
// Última imagen desktop: overlay con "+80 fotos →"
// next/image con fill y sizes apropiados
```

### FinalCta.tsx — Server Component
```tsx
// Fondo: var(--color-dark)
// Texto decorativo "EC": position absolute, right, opacity 0.025
// Mobile: text-align left
// Desktop: text-align center, flex col align-items center
```

---

## SECCIÓN 7: CSS — INSTRUCCIONES EXACTAS

### Dónde añadir estilos
- **`src/styles/home.css`** — todo el CSS de las nuevas secciones home
- Las secciones siguen el patrón BEM existente: `.stats`, `.stats__item`, `.destinations`, `.dest-card`, etc.
- **NO crear archivos CSS separados** — todo en home.css

### Estructura CSS de cada sección en home.css

```css
/* ════════════════════
   STATS
════════════════════ */
.stats { /* sección completa */ }
.stats__grid { /* grid */ }
.stats__item { /* cada stat */ }
.stats__number { /* número animado */ }
.stats__label { /* etiqueta */ }
.stats__divider { /* línea separadora desktop */ }

/* ════════════════════
   DESTINATIONS
════════════════════ */
.destinations { }
.destinations__header { }
.destinations__grid { }
.destinations__grid-desktop { }
.dest-card { }
.dest-card__img { }
.dest-card__overlay { }
.dest-card__explore { /* botón hover desktop */ }
.dest-card__content { }
.dest-card__label { }
.dest-card__title { }
.dest-card__desc { /* solo tall card desktop */ }

/* ════════════════════
   WHY US
════════════════════ */
.why-us { }
.why-us__left { }
.why-us__right { }
.trust-item { }
.trust-item__icon { }
.trust-item__title { }
.trust-item__desc { }

/* ════════════════════
   TOURS
════════════════════ */
.tours { }
.tours__header { }
.tours__grid { }
.tour-card { } /* ya tiene hover en globals.css */
.tour-card__badge { }
.tour-card__region { }
.tour-card__title { }
.tour-card__meta { }
.tour-card__highlights { }
.tour-card__highlight-item { }
.tour-card__footer { }
.tour-card__price { }
.tour-card__cta { }

/* ════════════════════
   GALLERY
════════════════════ */
.gallery { }
.gallery__header { }
.gallery__grid { }
.gallery__item { }
.gallery__img-overlay { /* "+80 fotos" en el last item */ }

/* ════════════════════
   FINAL CTA
════════════════════ */
.final-cta { }
.final-cta__bg-text { /* "EC" decorativo */ }
.final-cta__content { }
.final-cta__ctas { }
```

### Hover siempre así (regla del proyecto):
```css
@media (hover: hover) and (pointer: fine) {
  .dest-card:hover .dest-card__img { transform: scale(1.04); }
  .dest-card:hover .dest-card__explore { opacity: 1; transform: translateY(0); }
  .trust-item:hover { background: rgba(58,160,35,.04); border-color: rgba(58,160,35,.2); }
}
/* Active states siempre disponibles (funciona en touch) */
.dest-card:active .dest-card__img { transform: scale(1.02); }
```

---

## SECCIÓN 8: INSTRUCCIONES POR SUBAGENTE

---

### SUBAGENTE A: Stats + Destinations

**Archivos a crear/editar:**
1. `src/components/home/Stats.tsx` — crear nuevo
2. `src/components/home/Destinations.tsx` — crear nuevo
3. `src/components/home/DestCard.tsx` — crear nuevo
4. `src/styles/home.css` — añadir CSS de Stats y Destinations al FINAL del archivo
5. `src/app/page.tsx` — añadir Stats y Destinations al HomePage

**Stats.tsx — Implementación detallada:**
```tsx
'use client'
import { useEffect, useRef, useState } from 'react'

function useCountUp(target: number, trigger: boolean) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!trigger) return
    let start: number | null = null
    const dur = 1400
    const step = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / dur, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(ease * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [trigger, target])
  return val
}
```

**CSS Stats a añadir en home.css:**
- `.stats`: `background: var(--color-dark); padding: 72px var(--px); border-top: 1px solid rgba(255,255,255,.05)`
- `.stats__grid`: mobile: `grid-template-columns: 1fr 1fr; gap: 40px 16px;` desktop: `grid-template-columns: repeat(4,1fr); gap: 0`
- `.stats__number`: `font-size: clamp(40px,5vw,64px); font-weight: 900; color: var(--color-accent)`
- Separadores entre items: border-right en desktop, none en mobile

**DestCard.tsx — Hover desktop only:**
- `dest-card__explore` (botón "Explorar →"): `opacity: 0; transform: translateY(-4px)` por defecto
- Con `@media (hover: hover)`: en hover → `opacity: 1; transform: translateY(0)`
- En `.dest-card:active`: scale leve para touch feedback

**page.tsx modificado:**
```tsx
import Stats from '@/components/home/Stats'
import Destinations from '@/components/home/Destinations'
// ...
return (
  <>
    <Hero />
    <Stats />
    <Destinations />
  </>
)
```

---

### SUBAGENTE B: WhyUs + Tours + Gallery + FinalCta

**Archivos a crear/editar:**
1. `src/components/home/WhyUs.tsx` — crear nuevo
2. `src/components/home/Tours.tsx` — crear nuevo
3. `src/components/home/TourCard.tsx` — crear nuevo
4. `src/components/home/Gallery.tsx` — crear nuevo
5. `src/components/home/FinalCta.tsx` — crear nuevo
6. `src/styles/home.css` — añadir CSS de estas secciones al FINAL
7. `src/app/page.tsx` — añadir todos al HomePage

**WhyUs.tsx — Iconos SVG inline (NO emojis):**
Usar SVG simples como:
- Compass para "Guías expertos"
- Leaf para "Turismo responsable"
- Users/Group para "Grupos reducidos"
- Map pin para "Itinerarios a medida"

**TourCard.tsx — Estilos clave:**
```css
.tour-card {
  background: #0f1e0e;
  border-radius: 14px;
  padding: 22px;
  border: 1px solid rgba(255,255,255,.06);
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
@media (hover: hover) and (pointer: fine) {
  .tour-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 48px rgba(0,0,0,.22);
  }
}
```

**Gallery.tsx — Grid exacto:**
```css
/* Desktop */
.gallery__grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-template-rows: 240px 240px;
  gap: 10px;
}
.gallery__item--tall {
  grid-row: 1 / 3;
}

/* Mobile */
@media (max-width: 767px) {
  .gallery__grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    gap: 8px;
  }
}
```

**FinalCta.tsx — Texto decorativo EC:**
```css
.final-cta__bg-text {
  position: absolute;
  right: 4%;
  top: 50%;
  transform: translateY(-50%);
  font-size: 280px;
  font-weight: 900;
  letter-spacing: -0.06em;
  color: rgba(255,255,255,.025);
  line-height: 1;
  user-select: none;
  pointer-events: none;
}
@media (max-width: 767px) {
  .final-cta__bg-text {
    font-size: 160px;
    right: -10%;
  }
}
```

---

## SECCIÓN 9: REGLAS DE ORO (NUNCA VIOLAR)

1. **`@media (hover: hover) and (pointer: fine)`** — SIEMPRE envolver hover effects
2. **`:active` states** — SIEMPRE añadir para feedback táctil (funciona en todos los dispositivos)
3. **`min-h-[100dvh]`** no `h-screen` — para evitar layout jump en iOS Safari
4. **Animate solo `transform` y `opacity`** — nunca `width`, `height`, `top`, `left`
5. **`next/image`** para todas las imágenes
6. **No emojis** — SVG inline o Phosphor icons (si instalado; NO está — usar SVG inline)
7. **No Framer Motion** — no está en package.json, NO instalar
8. **CSS Grid** sobre flexbox math para layouts complejos
9. **IntersectionObserver** para animaciones on-scroll (no scroll events)
10. **`prefers-reduced-motion`** — incluir en animaciones de Stats y Gallery
11. **Hover del dest-card `explore` button** — SOLO en desktop hover, no en mobile
12. **CSS en home.css** — no crear archivos CSS nuevos, agregar al existente

---

## SECCIÓN 10: BREAKPOINTS DEL PROYECTO

| Nombre | Rango | CSS |
|--------|-------|-----|
| Mobile XS | < 375px | `@media (max-width: 374px)` |
| Mobile | < 480px | `@media (max-width: 479px)` |
| Mobile Standard | < 768px | `@media (max-width: 767px)` |
| Tablet | 768–1023px | `@media (min-width: 768px) and (max-width: 1023px)` |
| Desktop | ≥ 1024px | `@media (min-width: 1024px)` |

---

## SECCIÓN 11: VERIFICACIÓN FINAL

Antes de entregar, cada subagente debe verificar:
- [ ] Todos los hover con `@media (hover: hover) and (pointer: fine)`
- [ ] `:active` añadido para touch feedback
- [ ] `next/image` usado en todas las imágenes
- [ ] No emojis en el código
- [ ] Mobile layout no tiene scroll horizontal
- [ ] Touch targets ≥ 44px de alto
- [ ] CSS en home.css, no archivos nuevos
- [ ] `prefers-reduced-motion` en animaciones
- [ ] Consistencia con tokens de color existentes (`var(--color-primary)` etc.)
- [ ] TypeScript correcto (no `any`, interfaces donde corresponda)
