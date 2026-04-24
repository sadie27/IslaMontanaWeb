# Design System — Islamontana Travel

> Documento de referencia exhaustivo. Cubre tokens, componentes, layouts, interacciones y estilo visual.  
> Fuente de verdad extraída directamente del código fuente (globals.css, navbar.css, home.css, footer.css, destinations.css, breakpoints/*.css y todos los componentes TSX).

---

## 1. TOKENS DE DISEÑO

### 1.1 Paleta de colores

#### Colores de marca (CSS custom properties en `:root`)

| Token CSS | Hex | RGB | HSL | Uso |
|---|---|---|---|---|
| `--color-primary` | `#3aa023` | `rgb(58, 160, 35)` | `hsl(109, 64%, 38%)` | CTA principal, acentos activos, links, iconos |
| `--color-accent` | `#abd430` | `rgb(171, 212, 48)` | `hsl(77, 62%, 51%)` | Estadísticas, labels de sección, badges, kickers |
| `--color-dark` | `#0d200c` | `rgb(13, 32, 12)` | `hsl(117, 45%, 9%)` | Fondo oscuro, texto principal sobre claro |
| `--color-dark-mid` | `#1a3a18` | `rgb(26, 58, 24)` | `hsl(117, 42%, 16%)` | Fondos intermedios oscuros (referenciado en datos) |
| `--color-gray` | `#6b7560` | `rgb(107, 117, 96)` | `hsl(94, 10%, 42%)` | Texto secundario, subtítulos, taglines |
| `--color-light-bg` | `#f4f8f2` | `rgb(244, 248, 242)` | `hsl(110, 27%, 96%)` | Fondo de secciones alternas en claro |
| `--color-white` | `#ffffff` | `rgb(255, 255, 255)` | `hsl(0, 0%, 100%)` | Fondo base, texto sobre oscuro |

#### Colores de acento por destino (inline, no tokens globales)

| Destino | Hex | Uso |
|---|---|---|
| Galápagos | `#1a7a8a` | Badges, precios, bullets en TourCard, bordes |
| Amazonía | `#2d6a1e` | Ídem |
| Andes Cultural | `#8B4513` | Ídem |
| Andes Naturaleza | `#4a6fa5` | Ídem |

#### Colores semánticos (dificultad de tours)

| Semántico | Hex | Uso |
|---|---|---|
| Éxito / Fácil | `#22c55e` | Badge dificultad "Fácil" en TourCard |
| Advertencia / Moderado | `#eab308` | Badge dificultad "Moderado" |
| Error / Exigente | `#ef4444` | Badge dificultad "Exigente" |

#### Colores de UI situacional (sin token, valores literales)

| Contexto | Valor |
|---|---|
| Navbar scrolled bg | `rgba(255, 255, 255, 0.97)` |
| Navbar transparent link | `rgba(255, 255, 255, 0.92)` |
| Navbar transparent sub | `rgba(255, 255, 255, 0.60)` |
| Navbar transparent CTA bg | `rgba(255, 255, 255, 0.12)` |
| Navbar transparent CTA border | `rgba(255, 255, 255, 0.40)` |
| Navbar CTA hover (scrolled) | `#2d8c1b` |
| Mobile drawer overlay | `rgba(0, 0, 0, 0.50)` |
| Mobile drawer bg | `#ffffff` |
| Drawer shadow | `-4px 0 24px rgba(0, 0, 0, 0.20)` |
| Tablet dropdown bg | `#ffffff` |
| Tablet dropdown shadow | `0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)` |
| Hero overlay top | `rgba(13, 32, 12, 0.25)` |
| Hero overlay mid | `rgba(13, 32, 12, 0.15)` |
| Hero overlay bottom | `rgba(13, 32, 12, 0.35)` |
| Tour card bg | `#0f1e0e` |
| Tour card border | `rgba(255, 255, 255, 0.06)` |
| Gallery overlay (last img) | `rgba(13, 32, 12, 0.55)` |
| Gallery overlay hover | `rgba(13, 32, 12, 0.68)` |
| Error page bg | `#0d200c` |
| Polaroid card border | `#d4cfc8` |
| Polaroid card bg | `#ffffff` |
| Polaroid image placeholder | `#e2ead6` |

#### Colores de fallback mega-menu (DOM computed keys)

| Imagen | Color de fallback |
|---|---|
| amazonia.webp | `#0a1f08` |
| andes-cultura.webp | `#1a0e06` |
| andes-naturaleza.webp | `#060d1a` |
| cruceros.webp | `#061520` |
| circuitos.webp | `#0d200c` |
| day-tours.webp | `#1a1506` |
| birdwatching.webp | `#0a1f08` |
| gallery-fauna.webp | `#0a1f08` |
| gallery-paisajes.webp | `#061520` |
| gallery-cultura.webp | `#1a0e06` |
| gallery-aventura.webp | `#0d200c` |

---

### 1.2 Tipografía

#### Familia de fuentes

```
--font-base: "Outfit", system-ui, sans-serif
```

Outfit se carga desde Google Fonts con los pesos: **300, 400, 500, 600, 700, 800, 900**. No hay fuentes monospace ni serif en el sistema. El `display: swap` garantiza FOUT mínimo.

#### Escala tipográfica completa

| Nivel | font-size | font-weight | line-height | letter-spacing | Color por defecto | Dónde aparece |
|---|---|---|---|---|---|---|
| **H1 Hero** | `clamp(52px, 7.5vw, 96px)` | 900 | 0.95 | -0.025em | `#ffffff` | `.hero__title` |
| **H1 Error** | `clamp(64px, 6vw, 96px)` (desktop) / `clamp(44px, 12vw, 68px)` (mobile) | 900 | 0.90 | -0.035em | `#ffffff` | `ErrorPageClient` |
| **H2 Section** | `clamp(32px, 4vw, 52px)` | 900 | 0.95 | -0.03em | `var(--color-dark)` | `.destinations__title`, `.why-us__title` |
| **H2 Dark Section** | `clamp(28px, 3.2vw, 44px)` | 900 | 1.05 | -0.03em | `#ffffff` | `.tours__title`, `.gallery__title`, `.final-cta__title` |
| **H2 Final CTA** | `clamp(36px, 4.5vw, 64px)` | 900 | 0.95 | -0.035em | `#ffffff` | `.final-cta__title` |
| **H2 Destinations page** | `clamp(32px, 4vw, 56px)` | 900 | 1.0 | -0.03em | `#111827` | Map animation hero text |
| **H3 TourCard** | `clamp(20px, 1.8vw, 24px)` | 800 | 1.1 | -0.02em | `#ffffff` | `.tour-card__title` |
| **H3 DestCard** | `clamp(18px, 2vw, 24px)` | 800 | 1.1 | -0.02em | `#ffffff` | `.dest-card__title` |
| **H3 TrustItem** | `15px` | 700 | — | -0.01em | `var(--color-dark)` | `.trust-item__title` |
| **Body** | `clamp(15px, 1.1vw, 16px)` | 400 | 1.72 | — | `var(--color-gray)` | `.why-us__body` |
| **Body Hero** | `clamp(15px, 1.4vw, 18px)` | 400 | 1.75 | — | `rgba(255,255,255,0.80)` | `.hero__subtitle` |
| **Body small** | `14px` | 400 | 1.65 | — | `var(--color-gray)` | `.trust-item__desc`, `.footer__tagline` |
| **Caption / Kicker** | `11px` | 700 | — | 0.18–0.20em | `var(--color-primary)` | `.destinations__kicker`, `.why-us__label`, etc. |
| **Label uppercase** | `10–11px` | 700 | — | 0.14–0.20em | Depende de contexto | `.stats__label`, `.tour-card__region`, `.dest-card__label` |
| **Nav link** | `15px` (desktop) / `13px` (tablet) | 500 | — | 0.02em | Hereda del estado navbar | `.navbar__link` |
| **Nav CTA** | `14px` (desktop) / `13px` (tablet) | 600 | — | 0.04em | `#ffffff` | `.navbar__cta` |
| **Footer link** | `14px` | 400 | — | — | `rgba(255,255,255,0.65)` | `.footer__link` |
| **Footer copyright** | `12px` | 400 | — | — | `rgba(255,255,255,0.42)` | `.footer__bottom` |
| **Stats number** | `clamp(40px, 5vw, 64px)` | 900 | 1.0 | -0.03em | `var(--color-accent)` | `.stats__number` |
| **Badge hero** | `12px` | 600 | — | 0.10em | `var(--color-accent)` | `.hero__badge` |
| **Tour price** | `clamp(18px, 1.6vw, 22px)` | 900 | — | -0.02em | Acento del destino | `.tour-card__price` |
| **Scroll hint** | `10px` | — | — | 0.20em | `rgba(255,255,255,0.30)` | `.hero__scroll-hint` |
| **Mega menu card** | `1rem` (16px) | 700 | 1.2 | 0.04em | `#ffffff` | `.mega-menu__label p` |

---

### 1.3 Espaciado

#### Token global de padding horizontal

```css
--px: clamp(20px, 4vw, 40px)   /* base (≥768px) */
--px: 20px                      /* mobile <768px */
--px: 18px                      /* mobile <480px */
--px: 16px                      /* mobile <320px */
--px: clamp(24px, 3vw, 32px)   /* tablet 768–1023px */
```

#### Alturas fijas

```css
--nav-height: 70px     /* desktop y tablet */
--nav-height: 52px     /* mobile landscape */
```

#### Anchura máxima de contenido

```css
--max-width: 1280px
```

#### Escala de padding de secciones

| Sección | Desktop | Tablet | Mobile |
|---|---|---|---|
| Stats | `72px var(--px)` | ídem | `52px 24px` |
| Destinations | `80px 0` (padding lateral via inner) | `80px 0` | `64px 0` (inner con --px) |
| WhyUs | `100px var(--px)` | `80px var(--px)` | `64px 24px` |
| Tours | `100px var(--px)` | `80px var(--px)` | `64px 24px` |
| Gallery | `100px var(--px)` | `80px var(--px)` | `64px 24px` |
| Final CTA | `100px var(--px)` | `80px var(--px)` | `64px 24px` |
| Footer | `72px var(--px) 36px` | `64px var(--px) 32px` | `56px var(--px) 28px` |

#### Gaps recurrentes

| Contexto | Valor |
|---|---|
| Navbar links (desktop) | `36px` |
| Navbar links (tablet) | `20px` |
| Drawer links gap | `8px` |
| Hero CTAs gap | `14px` |
| Destination grid gap | `12px` |
| Tours grid gap | `20px` (desktop/mobile) / `18px` (tablet) |
| Gallery grid gap | `10px` (desktop) / `8px` (mobile/tablet) |
| Trust grid gap | `16px` |
| Footer grid gap | `clamp(32px, 5vw, 64px)` (desktop) |
| Tour card inner gap | `12px` |
| Trust item inner gap | `10px` |

---

### 1.4 Bordes y radios

| Componente | border-radius | border |
|---|---|---|
| `.btn` (todos) | `10px` | variable según variante |
| `.btn--outline` | `10px` | `1.5px solid rgba(13,32,12,0.30)` |
| `.navbar__cta` | `8px` | depende del estado navbar |
| `.navbar__drawer-link` | `8px` | ninguno |
| `.navbar__drawer-cta` | `8px` | ninguno |
| `.navbar__tablet-dropdown` | `10px` | `0 0 0 1px rgba(0,0,0,0.05)` (via shadow) |
| `.navbar__tablet-dropdown-item` | `7px` | ninguno |
| `.mega-menu__card` | ninguno (overflow hidden en contenedor) | ninguno |
| `.dest-card` | `16px` | ninguno |
| `.tour-card` | `14px` | `1px solid rgba(255,255,255,0.06)` |
| `.trust-item` | `12px` | `1px solid rgba(13,32,12,0.07)` |
| `.gallery__item` | `12px` | ninguno |
| `.gallery__item--tall` | `14px` | ninguno |
| `.hero__badge` | `100px` (pill) | `1px solid rgba(171,212,48,0.30)` |
| `.dest-card__explore` | `100px` (pill) | ninguno |
| `.tour-card__badge` | `100px` (pill) | ninguno |
| `ErrorPageClient` links rápidos | `10px` | `1px solid rgba(255,255,255,0.07)` |
| `.polaroid-card` | ninguno | `1px solid #d4cfc8` |
| TourCard destinos CTA | `7px–8px` | `1px solid ${accentColor}55` |
| Dest hero badge | `100px` (pill) | `1px solid ${accentColor}45` |

---

### 1.5 Sombras

| Componente / Estado | box-shadow |
|---|---|
| Navbar scrolled | `0 1px 24px rgba(0,0,0,0.07)` |
| Mobile drawer content | `-4px 0 24px rgba(0,0,0,0.20)` |
| Tablet dropdown | `0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)` |
| `.btn--primary` (default) | `0 8px 32px rgba(58,160,35,0.42)` |
| `.btn--primary` hover | `0 12px 36px rgba(58,160,35,0.50)` |
| `.btn--primary` active | `0 4px 16px rgba(58,160,35,0.40)` |
| `.tour-card` hover | `0 12px 36px rgba(0,0,0,0.25)` |

> **Regla:** Sombras con color de marca (`rgba(58,160,35,…)`) solo en `.btn--primary`. Sombras neutras (`rgba(0,0,0,…)`) en UI chrome (navbar, drawer, card hover).

---

### 1.6 Opacidades y overlays

| Elemento | Opacidad / valor |
|---|---|
| Imagen hero (crossfade) | `opacity: 0 → 1` vía CSS transition |
| Imagen hero overlay (top) | `rgba(13,32,12, 0.25)` |
| Imagen hero overlay (mid) | `rgba(13,32,12, 0.15)` |
| Imagen hero overlay (bottom) | `rgba(13,32,12, 0.35)` |
| Dest hero bg image | `opacity: 0.50` |
| Dest hero overlay (desktop) | `linear-gradient(to right, rgba(13,32,12,0.97) 0%, 0.80 50%, 0.10 100%)` |
| Dest hero overlay (tablet) | `linear-gradient(to bottom, rgba(13,32,12,0.45), 0.82)` |
| Dest hero overlay (mobile) | `linear-gradient(to bottom, rgba(13,32,12,0.50), 0.85)` |
| Error page bg image | `opacity: 0.18` |
| Error page gradient overlay | `rgba(13,32,12,0.60) 0%, 0.92 60%, #0d200c 100%` |
| Texto blanco secundario | `rgba(255,255,255,0.80)` hero subtitle |
| Texto blanco terciario | `rgba(255,255,255,0.62)` footer tagline, body dark sections |
| Texto blanco muted | `rgba(255,255,255,0.42)` footer copyright |
| Texto blanco ghost | `rgba(255,255,255,0.38)` tour region label |
| Separador vertical stats | `rgba(255,255,255,0.10)` |
| Border footer bottom | `rgba(255,255,255,0.07)` |
| Tour card border | `rgba(255,255,255,0.06)` |
| Tour card footer border | `rgba(255,255,255,0.07)` |
| Dest card overlay (default) | gradient de `rgba(0,0,0,0.05)` → `0.18` → `0.72` |
| "EC" decorativo final-cta | `rgba(255,255,255,0.025)` |
| Trust item bg (default) | `rgba(244,248,242, 0.60)` |
| SA Map SVG | `opacity: 0.65` (visible) → `0` (fade out) |

---

### 1.7 Transiciones y animaciones

#### Easing functions usadas

| Nombre interno | Valor CSS | Carácter |
|---|---|---|
| `EASE_OUT` (JS) | `cubic-bezier(0.23, 1, 0.32, 1)` | Entrada rápida, salida suave |
| `EASE_INOUT` (JS) | `cubic-bezier(0.77, 0, 0.175, 1)` | S-curve pronunciada |
| `EASE_IN` (JS) | `cubic-bezier(0.32, 0, 0.67, 0)` | Arranque lento |
| `ease-out` (CSS) | `cubic-bezier(0,0,0.58,1)` | Genérico ligero |
| `ease-in-out` | `cubic-bezier(0.42,0,0.58,1)` | Animaciones de loop |

#### Catálogo de transiciones por componente

| Componente | Propiedad | Duración | Easing |
|---|---|---|---|
| Navbar bg/shadow/blur | `background-color, box-shadow, backdrop-filter` | `0.20s` | `ease-out` |
| Navbar brand-name color | `color` | `0.35s` | — |
| Navbar link color | `color` | `0.30s` | — |
| Navbar CTA | `all` | `0.35s` | — |
| Hamburger lines | `all` | `0.30s` | `ease` |
| Mobile drawer overlay | `opacity` | `0.30s` | `ease` |
| Mobile drawer panel | `transform` | `0.30s` | `ease` |
| Drawer link bg | `background` | `0.20s` | — |
| Tablet dropdown | `opacity, transform` | `0.18s` | `ease` |
| Tablet dropdown item bg | `background, color` | `0.15s` | — |
| MegaMenu panel | `opacity, transform` | `220ms` | — |
| MegaMenu card image | `transform, filter` | `0.45s` | `cubic-bezier(0.16,1,0.3,1)` |
| MegaMenu card label | `transform` | `0.42s` | `cubic-bezier(0.16,1,0.3,1)` |
| MegaMenu label scale text | `transform` | `0.42s` | `cubic-bezier(0.16,1,0.3,1)` |
| Hero image crossfade | `opacity` | `0.60s` | `ease-in-out` |
| `.btn` | `all` | `0.25s` | — |
| `.btn--primary` hover | `transform: translateY(-1px)` | `0.25s` | — |
| `.dest-card__img` | `transform` | `0.50s` | `cubic-bezier(0.23,1,0.32,1)` |
| `.dest-card__explore` | `opacity, transform` | `0.25s` | `cubic-bezier(0.23,1,0.32,1)` |
| `.dest-card__overlay` | `opacity` | `0.30s` | `ease` |
| `.gallery__img` | `transform` | `0.40s` | `cubic-bezier(0.23,1,0.32,1)` |
| `.tour-card` | `transform, box-shadow` | `0.20s` | `ease` |
| `.why-us__link` | `opacity` | `0.20s` | — |
| `.trust-item` | `background, border-color` | `0.22s` | — |
| `.footer__link` | `color` | `0.20s` | — |
| Polaroid pseudo-elements | `transform` | `0.50s` | `cubic-bezier(0.16,1,0.3,1)` |
| Map SVG opacity | `opacity` | `800ms` | `ease` |
| Map region fill | `fill, fill-opacity` | `800ms` | `ease` |
| Map card enter | `opacity, transform` | `280ms` | `cubic-bezier(0.23,1,0.32,1)` |
| Map card exit | `opacity, transform` | `160ms` | `cubic-bezier(0.32,0,0.67,0)` |

#### Keyframe animations

| Nombre | Descripción | Duración | Delay system |
|---|---|---|---|
| `fade-up` (global) | `opacity:0 translateY(12px)` → visible | `0.30s` | Ninguno |
| `fadeUp` (destinos) | `opacity:0 translateY(18px)` → visible | `0.55s` | `.fade-up-1` 80ms, `-2` 200ms, `-3` 340ms, `-4` 450ms, `-5` 560ms |
| `destFadeUp` (hero destino) | `opacity:0 translateY(24px)` → visible | `0.70s` | Inline via stagger |
| `cardFadeIn` | `opacity:0 translateY(20px)` → visible | `0.60s` | — |
| `scrollBounce` | Bounce vertical `translateY(0) → translateY(6px)` | `2s` | `ease-in-out infinite` |
| `destScrollBounce` | Idéntico al anterior | `2s` | `ease-in-out infinite` |

---

## 2. COMPONENTES UI

### 2.1 Button

#### Variantes

| Clase | Background | Color texto | Border | Shadow |
|---|---|---|---|---|
| `.btn--primary` | `#3aa023` | `#ffffff` | ninguno | `0 8px 32px rgba(58,160,35,0.42)` |
| `.btn--ghost` | `rgba(255,255,255,0.07)` | `rgba(255,255,255,0.88)` | `1.5px solid rgba(255,255,255,0.28)` | ninguno |
| `.btn--outline` | `transparent` | `#0d200c` | `1.5px solid rgba(13,32,12,0.30)` | ninguno |

#### Estados

| Estado | Primary | Ghost | Outline |
|---|---|---|---|
| **hover** | bg `#2d8c1b`, `translateY(-1px)`, shadow `0 12px 36px rgba(58,160,35,0.50)` | bg `rgba(255,255,255,0.15)` | bg `#0d200c`, color `#fff`, border `#0d200c` |
| **active** | bg `#2d8c1b`, `scale(0.97)`, shadow `0 4px 16px rgba(58,160,35,0.40)` | bg `rgba(255,255,255,0.15)` | `scale(0.97)`, bg `#0d200c`, color `#fff` |
| **disabled** | No definido (sin clase) | — | — |

> Hover solo en `@media (hover: hover) and (pointer: fine)`.

#### Tamaños (padding)

| Breakpoint | Padding |
|---|---|
| Base | `clamp(13px, 1.2vw, 16px) clamp(24px, 2.5vw, 36px)` |
| Tablet | `13px 28px` |
| Mobile | Full-width, `justify-content: center` |

#### Tokens aplicados

- `border-radius: 10px`
- `font-size: clamp(14px, 1.1vw, 15px)`
- `font-weight: 700`
- `letter-spacing: 0.03em`
- `transition: all 0.25s`
- `display: inline-flex; align-items: center`

---

### 2.2 Navbar

#### Variantes de estado

| Estado | Background | Sombra | Texto links |
|---|---|---|---|
| **Transparente** (hero visible) | `transparent` | ninguna | `rgba(255,255,255,0.92)` |
| **Scrolled** (scrollY > 30px) | `rgba(255,255,255,0.97)` | `0 1px 24px rgba(0,0,0,0.07)` | `#0d200c` |
| **Mobile** (siempre) | `rgba(255,255,255,0.97)` | `0 1px 24px rgba(0,0,0,0.07)` | `#0d200c` |

**backdrop-filter:** `blur(16px)` cuando scrolled o mobile.

#### Tokens

- `height: 70px` (`--nav-height`)
- `position: fixed; z-index: 100`
- `max-width: 1280px` en `navbar__inner`
- Logo: `180×50px` desktop, `140px` tablet/mobile, `120px` ≤479px, `100px` ≤374px, `90px` ≤320px

#### Modo desktop (≥1024px)

- Links en fila horizontal, `gap: 36px`
- MegaMenu se abre con hover (delay de cierre: `150ms` con `setTimeout`)
- CTA "Reservar" a la derecha: `padding: 10px 22px`, `border-radius: 8px`

#### Modo tablet (768–1023px)

- Links visibles en fila horizontal, `gap: 20px`, `font-size: 13px`
- Ítems con submenú: `<button>` en lugar de `<Link>`; click despliega dropdown inline
- Dropdown: `border-radius: 10px`, anclado a la izquierda del trigger, flecha CSS decorativa (`clip-path: polygon`)
- MegaMenu desactivado (se usa dropdown simple)

#### Modo mobile (≤767px)

- Hamburger visible (`display: flex`), desktop links ocultos
- Drawer lateral derecho: `width: 280px`, slide-in con `translateX(100% → 0)`
- Overlay semitransparente: `rgba(0,0,0,0.50)`
- `padding-top: calc(70px + 20px)` para no solapar navbar
- Landscape: `--nav-height: 52px`, drawer `max-width: 300px`

---

### 2.3 MegaMenu

- **Ancho:** full-width (posición `fixed left-0 right-0`)
- **Top:** `70px` (altura del navbar)
- **Grid:** 4 columnas iguales (`repeat(4, 1fr)`)
- **Altura card:** `299px` desktop / `220px` tablet
- **Entrada/salida:** `opacity` + `translateY(-2px → 0)`, duración `220ms`
- **Overlay verde al fondo:** `height: 4px; background: #abd430; opacity: 0.25`

#### Hover de card

- Imagen: `scale(1.06) translateZ(0)`, `blur(3px) brightness(0.75)` — transición `0.45s cubic-bezier(0.16,1,0.3,1)` (GPU compositor con `will-change: transform, filter`)
- Label: translada de la esquina inferior-izquierda al centro (`translate: calc(-50% - 80px), calc(-50% + 98px)` → `translate(-50%, -50%)`)
- Texto en hover: `scale(1.5)`
- Delay cierre: `150ms` setTimeout para permitir mover el cursor entre nav y panel

---

### 2.4 DestinationCard (en sección Destinations home)

**Clase base:** `.dest-card`

| Propiedad | Valor |
|---|---|
| `border-radius` | `16px` |
| `min-height` | `220px` (base) / `280px` (tall) |
| `overflow` | `hidden` |
| `will-change` | `transform` |

**Capas internas (z-index):**
1. Imagen (`<Image fill>`) — z-index 0
2. Overlay degradado — z-index 1, `rgba(0,0,0,0.05→0.18→0.72)`
3. Contenido (label + title + desc) — z-index 2, `position: absolute bottom-0`
4. Badge "Explorar →" — z-index 3, `position: absolute top-20px right-20px`

**Hover (pointer fine):**
- Imagen: `scale(1.04)` en `0.5s cubic-bezier(0.23,1,0.32,1)`
- Badge "Explorar →": `opacity 0→1`, `translateY(-4px→0)` en `0.25s`
- Overlay: se oscurece

**Variante tall (`.dest-card--tall`):** Ocupa 2 filas del grid en desktop; muestra la descripción (`.dest-card__desc`, `font-size: 14px`, `font-weight: 300`, `rgba(255,255,255,0.72)`).

---

### 2.5 TourCard (home)

**Clase base:** `.tour-card`

| Propiedad | Valor |
|---|---|
| `background` | `#0f1e0e` |
| `border-radius` | `14px` |
| `padding` | `22px` |
| `border` | `1px solid rgba(255,255,255,0.06)` |

**Hover:** `translateY(-2px)`, `box-shadow: 0 12px 36px rgba(0,0,0,0.25)`

**Elementos internos:**
- Badge (esquina top-right): `position: absolute top-14px right-14px`, `border-radius: 100px`, bg = accent color del destino, color `#fff`
- Precio: `clamp(18px, 1.6vw, 22px)`, `font-weight: 900`, color = accent
- CTA "Consultar →": `border: 1.5px solid`, `border-radius: 8px`, `padding: 8px 16px`, `min-height: 44px`
- Bullet puntos: `6×6px`, `border-radius: 1px` (cuadrado redondeado), color = accent
- Separador footer interno: `border-top: 1px solid rgba(255,255,255,0.07)`
- Dificultad colores: Fácil `#22c55e`, Moderado `#eab308`, Exigente `#ef4444`

---

### 2.6 TrustItem (WhyUs)

**Clase base:** `.trust-item`

| Propiedad | Valor |
|---|---|
| `background` | `rgba(244,248,242, 0.60)` |
| `border` | `1px solid rgba(13,32,12,0.07)` |
| `border-radius` | `12px` |
| `padding` | `24px 22px` |

**Hover:** bg `rgba(58,160,35,0.04)`, border `rgba(58,160,35,0.20)`

**Icono:** SVG inline 22×22px, `stroke: currentColor`, `strokeWidth: 1.5`, color `--color-primary`.

---

### 2.7 StatItem

Fondo `--color-dark`. Número en `--color-accent` (`clamp(40px, 5vw, 64px)`, `font-weight: 900`). Label en `rgba(255,255,255,0.42)` uppercase `11px` `letter-spacing: 0.14em`. Separador vertical en desktop: `1px×48px rgba(255,255,255,0.10)`.

---

### 2.8 Hero Badge (pill)

```css
background: rgba(171, 212, 48, 0.12);
border: 1px solid rgba(171, 212, 48, 0.30);
border-radius: 100px;
padding: 6px 18px;
color: #abd430;
font-size: 12px;
font-weight: 600;
letter-spacing: 0.10em;
```

Con punto decorativo: `6×6px`, `border-radius: 50%`, `background: #abd430`.

---

### 2.9 Gallery Grid

Desktop: `grid-template-columns: 2fr 1fr 1fr`, `grid-template-rows: 240px 240px`, `gap: 10px`. Primera imagen: `grid-row: 1/3` (tall). Última imagen tiene overlay oscuro con texto "+80 fotos →".

Tablet: filas reducidas a `180px 180px`.

Mobile: `grid-template-columns: 1fr 1fr`, `gap: 8px`, items con `aspect-ratio: 4/3`, 5ª imagen oculta.

---

### 2.10 Polaroid Card (destinos — WhyVisit)

Tarjeta fotográfica estilo polaroid con pseudo-elementos apilados:
- Base: `background: #fff`, `border: 1px solid #d4cfc8`, `padding: 5% 5% 14% 5%`
- `::before`: `rotate(-5deg)` en reposo
- `::after`: `rotate(5deg)` en reposo
- Hover (`.polaroid-stack-hovered`): ambos pseudo-elementos rotan a `0deg` suavemente
- Placeholder de imagen: `background: #e2ead6`

---

### 2.11 FAQ Item

Clase `.faq-item`. En hover: el ícono (`.faq-icon`) muestra `border-color: currentColor`. Animación de contenido expandido manejada vía JS (estado React).

---

### 2.12 ErrorPageClient

Pantalla completa (`position: fixed; inset: 0; z-index: 9999`). Fondo `#0d200c`. Imagen de fondo `opacity: 0.18` con gradiente oscurecedor. Badge con `background: rgba(171,212,48,0.10)`, `border: 1px solid rgba(171,212,48,0.25)`, `border-radius: 100px`. Animaciones `fade-up-1` a `fade-up-5` para entrada escalonada. Ilustración SVG decorativa de Ecuador a la derecha.

---

## 3. LAYOUTS Y GRID

### 3.1 Sistema de grid

La app usa CSS Grid nativo + Flexbox. No hay librería de grid de terceros (Bootstrap, MUI, etc.).

**Principio de contenedor:**
```css
max-width: 1280px;
margin: 0 auto;
padding: 0 var(--px);   /* clamp(20px, 4vw, 40px) */
```

### 3.2 Breakpoints exactos

| Breakpoint | Rango | Variable/Nombre |
|---|---|---|
| Mobile portrait pequeño | `≤320px` | `--px: 16px` |
| Mobile small | `≤374px` | fuentes reducidas |
| Mobile | `≤479px` | `--px: 18px` |
| Mobile base | `≤767px` | `--px: 20px`, hamburger visible |
| Mobile landscape | `≤767px + orientation: landscape` | `--nav-height: 52px` |
| Tablet | `768px – 1023px` | `--px: clamp(24px, 3vw, 32px)` |
| Desktop | `≥1024px` | grid layouts completos |

### 3.3 Patrones de layout recurrentes

#### Navbar sticky full-width
- `position: fixed; top: 0; z-index: 100`
- Contenido interno con `max-width: 1280px`, centrado
- Transición de estado transparente → opaco en scroll > 30px

#### Hero full-viewport
- `min-height: 100dvh`
- `margin-top: calc(-1 * var(--nav-height))` para solaparse con navbar
- Contenido con `padding-top: var(--nav-height)` para compensar

#### Sección two-column (WhyUs)
- Mobile: columna única, `flex-direction: column`, `gap: 52px`
- Tablet: ídem columna única, `gap: 52px`
- Desktop: `flex-direction: row`, `gap: 80px`, left `flex: 0 0 38%`, right `flex: 1`

#### Grid asimétrico destinations
- Mobile/tablet: 2 columnas iguales (`1fr 1fr`), sin tall
- Desktop: `grid-template-columns: 1fr 1fr`, primera card `grid-row: 1/3` (tall)

#### Stats bar
- Mobile: `grid-template-columns: 1fr 1fr`, `gap: 40px 16px`
- Tablet/Desktop: `grid-template-columns: repeat(4, 1fr)`
- Desktop: separadores verticales visibles con pseudo-elemento

#### Footer three-column
- Desktop: `grid-template-columns: 2fr 1fr 1fr`
- Tablet: `1.5fr 1fr 1fr`
- Mobile: `1fr 1fr`, brand en `grid-column: 1 / -1`

#### Gallery masonry-like
- Ver sección 2.9

#### Map animation (destinos)
- Desktop: `position: sticky; height: 100vh`, sección de `500vh`
- Mobile: slider horizontal con touch, mapa 55dvh + contenido debajo

### 3.4 Reorganización responsive

| Elemento | Desktop | Tablet | Mobile |
|---|---|---|---|
| Navbar links | Visible fila horizontal | Visible fila (font menor) | Ocultos → drawer |
| Hamburger | Oculto | Oculto | Visible |
| "Ver todos" destinations | En header (derecha) | En header (derecha) | Debajo del grid |
| Tours grid | 3 col | 2 col | 1 col |
| Gallery grid | 2fr 1fr 1fr, 2 rows | 2fr 1fr 1fr, rows 180px | 2 col, aspect 4:3 |
| Final CTA content | Centrado horizontalmente | Centrado | Alineado izq., CTAs en columna |
| Hero scroll hint | Visible | Visible | Oculto |
| Hero CTAs | Fila, ancho auto | Fila | Columna, ancho 100% |
| WhyUs layout | Row 38/62 split | Columna | Columna |
| MegaMenu | Full-width hover | Reemplazado por dropdown inline | Reemplazado por drawer |
| Stats separadores | Visibles (pseudo-elem) | Ocultos | Ocultos |

---

## 4. PATRONES DE INTERACCIÓN

### 4.1 Hover y focus

**Regla global:** Todos los hovers están protegidos con `@media (hover: hover) and (pointer: fine)`, garantizando que en tablets táctiles y móviles no haya estados hover pegajosos.

**Patrón estándar de interactividad:**
1. Hover → transformación visual (color, scale, opacity, shadow)
2. Active → versión más pronunciada del hover, siempre definida
3. Sin `:focus` explícito en la mayoría de elementos (se usa `:focus-visible` implícito del navegador)

**Excepción accesibilidad:** Los botones de skip (keyboard navigation) en el mapa móvil usan `focus:not-sr-only` para aparecer solo con teclado.

### 4.2 Microinteracciones

| Microinteracción | Componente | Descripción |
|---|---|---|
| **Crossfade de imágenes** | Hero | Stack de imágenes, solo la activa tiene `opacity: 1`, transición `0.6s ease-in-out` |
| **Zoom en hover** | DestCard, GalleryItem, MegaMenuCard | `scale(1.04–1.06)` en imagen |
| **Badge emerge** | DestCard hover | "Explorar →" aparece de arriba `translateY(-4px → 0)` |
| **Scroll bounce** | Hero, DestHero | Indicator de scroll anima verticalmente 2s infinito |
| **Entrada escalonada** | ErrorPage, DestHero | `.fade-up-1` a `.fade-up-5` con delays 80–560ms |
| **Polaroid stack** | WhyVisit destinos | Pseudo-cartas detrás se alinean en hover del contenedor |
| **Map viewbox lerp** | DestinationMapAnimation | SVG viewBox interpola con factor 0.06 en RAF, efecto zoom suave |
| **Card enter/exit** | MapAnimation | Entrada 280ms `EASE_OUT`, salida 160ms `EASE_IN` |
| **Dropdown reveal** | Navbar tablet | `opacity + translateY(-6px → 0)` en `0.18s` |
| **Drawer slide** | Navbar mobile | `translateX(100% → 0)` en `0.30s ease` |
| **Tour card lift** | TourCard | `translateY(-2px)` + sombra mayor en hover |
| **MegaMenu blur** | MegaMenu card | Imagen: `blur(3px) brightness(0.75)` en hover, label va al centro |

**No hay:** spinners, skeletons, toasts, tooltips, modals, ni Framer Motion. Las animaciones son exclusivamente CSS transitions y keyframes nativos + RAF manual para el mapa.

### 4.3 Patrones de navegación

| Breakpoint | Patrón |
|---|---|
| Desktop (≥1024px) | Navbar links visibles. Items con submenú: hover abre MegaMenu full-width. CTA "Reservar" siempre visible. |
| Tablet (768–1023px) | Navbar links visibles (más pequeños). Items con submenú: click abre dropdown inline `10px` radius. Click fuera cierra. |
| Mobile (≤767px) | Solo hamburger visible. Click abre drawer lateral derecho `280px`. Items con submenú se expanden en acordeón vertical. CTA "Reservar" al final del drawer. |

### 4.4 Feedback en formularios

No hay formularios implementados actualmente (contact y tours están pendientes). El patrón de diseño establece que las rutas `/contact` y `/tours` están en estado PENDING. Cuando se implementen deberán seguir el design system existente.

---

## 5. ESTILO VISUAL GENERAL

### 5.1 Mood y estética

**Clasificación:** **Editorial dark-nature premium** con rasgos de **high-contrast minimal**.

- **No es:** glassmorphism, material design, skeuomorphic, brutalist, soft-UI pastel.
- **Es:** Typography-led, fotografía dominante, verde oscuro profundo como color de fondo principal, tipografía sans-serif display ultrabold, máximo contraste entre secciones claras y oscuras.
- **Referente estético:** Agencias de turismo de lujo europeas + estética de revistas de naturaleza (National Geographic).

**Contraste de secciones:** La app alterna deliberadamente entre fondos claros y oscuros:
- Claro: Hero (imagen), Destinations (`#f4f8f2`), WhyUs (`#fff`), Gallery (`#fff`)
- Oscuro: Stats (`#0d200c`), Tours (`#0d200c`), FinalCta (`#0d200c`), Footer (`#0d200c`)

### 5.2 Fotografía y assets

**Estilo fotográfico:**
- Fotografía de naturaleza y fauna silvestre de alta calidad: vida marina en Galápagos, selva amazónica, volcanes andinos
- Composición: sujetos en entornos naturales, luz natural, paleta verde-azul dominante
- Formato: WebP exclusivamente, optimizado para web
- Ratio dominante: landscape (16:9 en hero), cuadrado o vertical en mega-menu (299px height, cuadrado aproximado), 4:3 en cards de destino

**Sin ilustraciones** de terceros. La única "ilustración" es el SVG custom de Ecuador y Sudamérica (datos de path propietarios), y el `BgIllustration()` inline de la página de error.

**Iconografía:**
- SVG inline en el componente `WhyUs` (sin librería de iconos)
- 4 iconos: Compass, Leaf, Users, MapPin
- Trazo: `stroke: currentColor`, `strokeWidth: 1.5`, `strokeLinecap: round`, `strokeLinejoin: round`
- Tamaño: `22×22px` viewBox `24×24`
- No hay Heroicons, Lucide, ni Font Awesome

**Logo:** WebP con y sin fondo, versión horizontal (navbar `180×50px`), versión simple (footer).

### 5.3 Espacio negativo

La app es **generosa en espacio negativo**. Secciones con `100px` de padding vertical en desktop. Los contenidos nunca tocan los bordes del viewport gracias al token `--px`. Las tarjetas tienen gaps de `12–20px`. Los textos están limitados en ancho (`max-width: 420–560px`) para legibilidad óptima incluso en pantallas anchas.

### 5.4 Contraste y accesibilidad

| Par de colores | Relación de contraste aproximada |
|---|---|
| `#3aa023` sobre `#ffffff` | ~3.8:1 (falla AA para texto pequeño) — usado como acento, no texto largo |
| `#abd430` sobre `#0d200c` | ~8.2:1 — pasa AAA |
| `#ffffff` sobre `#0d200c` | ~17.5:1 — pasa AAA |
| `rgba(255,255,255,0.80)` sobre `#0d200c` | ~13.2:1 — pasa AAA |
| `rgba(255,255,255,0.62)` sobre `#0d200c` | ~10.1:1 — pasa AA |
| `rgba(255,255,255,0.42)` sobre `#0d200c` | ~6.6:1 — pasa AA |
| `#0d200c` sobre `#f4f8f2` | ~17.3:1 — pasa AAA |
| `#6b7560` sobre `#ffffff` | ~4.8:1 — pasa AA |

**Touch targets:** Mínimo `44×44px` en mobile (`min-height: 44px` en `button, a`).

**Reduced motion:** Todas las transiciones no esenciales se desactivan con `@media (prefers-reduced-motion: reduce)`.

**Hover guard:** `@media (hover: hover) and (pointer: fine)` en todos los efectos hover para evitar estados pegajosos en touch.

---

## 6. GUÍA DE USO PARA IA

### Resumen del estilo visual (10 líneas)

Islamontana Travel es una web de turismo de naturaleza premium con estética editorial dark-nature. El fondo oscuro dominante es `#0d200c` (verde muy oscuro, casi negro). El acento primario es `#3aa023` (verde vibrante) con un acento secundario amarillo-lima `#abd430` para estadísticas y kickers. La tipografía es exclusivamente **Outfit** (Google Fonts) en pesos 300–900, con títulos en peso 900 y letter-spacing negativo fuerte (`-0.03em`). Las secciones alternan entre fondo claro (`#f4f8f2`, `#fff`) y oscuro (`#0d200c`) creando un ritmo visual de alto contraste. Las imágenes de naturaleza (fauna de Galápagos, selva, volcanes) son protagonistas absolutas con zoom suave en hover. Los bordes son redondeados moderados (8–16px). No hay sombras decorativas excepto en botones primarios (verde glowy) y en UI chrome (navbar, drawer). La app es mobile-first con breakpoints en 768px y 1024px. No hay Framer Motion ni librerías de animación: todo es CSS nativo + RAF.

---

### Las 5 reglas más importantes al crear nuevos componentes

1. **Paleta cerrada.** Solo los 7 tokens de color globales + los 4 acentos de destino + los 3 colores semánticos de dificultad. Ningún azul, rojo, naranja ni gris fuera de los valores exactos documentados.

2. **Tipografía: solo Outfit.** Pesos: 300 (light body), 400 (body), 500 (nav), 600 (CTA secondary), 700 (labels, uppercase), 800 (card titles), 900 (headings). Siempre `letter-spacing: -0.025em` a `-0.035em` en headings. Los kickers y labels usan `letter-spacing: 0.14–0.20em` + `text-transform: uppercase`.

3. **Hover guard obligatorio.** Todo efecto hover debe estar dentro de `@media (hover: hover) and (pointer: fine)`. Siempre definir también el estado `:active` con el mismo efecto para táctil.

4. **Border-radius por tipo:** Pills `100px` (badges, dots), botones `10px`, cards `12–16px`, dropdowns `7–10px`, tour cards `14px`. No inventar radios fuera de esta escala.

5. **Secciones con alternancia claro/oscuro.** Los componentes que van sobre fondo oscuro (`#0d200c`) usan texto blanco con opacidades escalonadas (100%, 80%, 62%, 42%, 38%). Los que van sobre fondo claro usan `#0d200c` para títulos y `#6b7560` para body. No mezclar.

---

### Prohibiciones explícitas

- ❌ Fuentes distintas de **Outfit** (no Inter, no Roboto, no system-ui como principal)
- ❌ Colores fuera de la paleta documentada (ningún azul primario, ningún rojo fuera de `#ef4444` para dificultad, ningún gris neutro frío)
- ❌ `box-shadow` inventadas fuera del catálogo de la sección 1.5
- ❌ `border-radius` de valores arbitrarios (solo los documentados en 1.4)
- ❌ Animaciones con Framer Motion, React Spring, o cualquier librería JS de animación
- ❌ Efectos de glassmorphism, gradientes de colores saturados, neomorphism, ni fondos con patrones
- ❌ Iconos de librerías externas (Heroicons, Lucide, etc.) — solo SVG inline con `strokeWidth: 1.5`
- ❌ Hover sin guard `@media (hover: hover) and (pointer: fine)`
- ❌ Texto sobre fondos oscuros con opacidad inferior a `0.38` (mínimo de legibilidad del sistema)
- ❌ Imágenes con filtros de color (duotone, sepia, etc.) — la fotografía es siempre natural y sin tratamiento

---

### Ejemplo de prompt listo para usar

```
Crea un componente [NombreComponente] en Next.js (TypeScript, Server Component a menos que necesite estado) siguiendo el design system de Islamontana Travel:

ESTILO: Editorial dark-nature premium. Alternancia claro/oscuro entre secciones.
FUENTE: Solo "Outfit" (Google Font). Headings: weight 900, letter-spacing -0.03em, line-height 0.95–1.05. Body: weight 400, line-height 1.7. Labels/kickers: weight 700, uppercase, letter-spacing 0.14–0.20em.
COLORES: primary #3aa023, accent #abd430, dark #0d200c, gray #6b7560, light-bg #f4f8f2, white #ffffff. Texto sobre oscuro: rgba(255,255,255,0.92/0.80/0.62/0.42) escalonado.
BORDER-RADIUS: Botones 10px, cards 12–16px, pills 100px.
SOMBRAS: Solo btn--primary usa sombra verde (0 8px 32px rgba(58,160,35,0.42)). UI chrome: 0 1px 24px rgba(0,0,0,0.07).
HOVER: Siempre dentro de @media (hover: hover) and (pointer: fine). Siempre definir :active equivalente.
TRANSICIONES: CSS nativo. Duración 0.2–0.5s. Easing preferido: cubic-bezier(0.23, 1, 0.32, 1).
SPACING: --px: clamp(20px, 4vw, 40px) como padding horizontal. --max-width: 1280px centrado. Secciones: padding vertical 64–100px según breakpoint.
BREAKPOINTS: mobile <768px, tablet 768–1023px, desktop ≥1024px.
ICONOS: SVG inline, stroke currentColor, strokeWidth 1.5, strokeLinecap/Join round, 22×22px.

El componente debe funcionar en los tres breakpoints y usar BEM para clases CSS.
```

---

*Generado el 2026-04-24. Fuente: análisis directo del código fuente en `frontend/src/styles/` + componentes TSX + knowledge graph (Community 1: "CSS Design System & Master Plan").*
