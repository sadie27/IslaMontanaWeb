# Audit Report
> Repositorio: IslaMontana Travel — Frontend  
> Fecha de auditoría: 2026-04-29  
> Herramienta: Claude Code (Sonnet 4.6) + 6 subagentes en paralelo  
> Modo: Solo lectura. Ningún archivo fue modificado.

---

## 0. Resumen ejecutivo

- **Stack**: Next.js 14 (output `export` → SSG puro), React 18, TypeScript 5.4 strict, Tailwind 3.4 + CSS plano BEM, gestor `npm`.
- **Renderizado**: Estático (GitHub Pages). No hay SSR ni ISR en runtime; el `revalidate: 3600` en `api.ts` solo aplica durante el build.
- **Animaciones**: 100 % hand-crafted (RAF + CSS keyframes). Sin Framer Motion, GSAP, Lenis ni Three.js.
- **Estado**: Solo `useState`/`useEffect` local. Sin Redux, Zustand, Jotai ni Context global.
- **Dependencias de producción**: únicamente `next`, `react`, `react-dom`. Lean por diseño.
- **Zona intocable (`/destinations`)**: 2 895 líneas en 17 archivos; dos sistemas de animación independientes (scroll-driven desktop / swipe mobile), ambos con RAF custom.
- **Problema crítico 1**: `src/app/page.tsx` marcado `"use client"` entero por el hook `useHeroImages`. Todos los componentes hijos (Stats, Destinations, Tours…) pierden SSR.
- **Problema crítico 2**: 7 archivos `.bak` / `.bak2` / `.bak3` / `.bak4` comprometidos en el repositorio.
- **Problema crítico 3**: Paths de imágenes con mayúscula (`Computer/`) vs directorio real (`computer/`) → 404s en producción.
- **Problema crítico 4**: 9 imágenes del mega-menu referenciadas en `assets.ts` no existen en disco.
- **Sin tests**: Cero frameworks de testing configurados; CI no ejecuta linter antes del deploy.
- **Mega-componente más urgente**: `Navbar.tsx` (297 líneas, 5 `useState`, 5 `useEffect`).
- **Archivos de cliente > 300 líneas**: `DestinationMapAnimation.tsx` (537), `DestinationMapAnimationMobile.tsx` (467), `ErrorPageClient.tsx` (274), `Navbar.tsx` (297).
- **Convención de nombre errónea**: directorio `movile/` (typo) hardcodeado en múltiples archivos.

---

## 1. Stack y configuración

### Framework
| Paquete | Versión | Nota |
|---------|---------|------|
| Next.js | ^14.2.0 | App Router, `output: 'export'` |
| React | ^18.3.0 | |
| React DOM | ^18.3.0 | |
| TypeScript | ^5.4.0 | `strict: true` |
| Tailwind CSS | ^3.4.0 | |
| PostCSS | ^8.4.0 | |
| Autoprefixer | ^10.4.0 | |
| ESLint | ^8.57.0 | |

**Gestor de paquetes:** npm (existe `package-lock.json`)  
**Versión de Node esperada:** No especificada (sin `.nvmrc`, sin `engines` en `package.json`).

### Build tool
**Next.js** es bundler y build tool (Turbopack no configurado explícitamente; usa Webpack por defecto en 14.x).

**`next.config.js` — configuración relevante:**
```js
output: 'export'                              // SSG puro → salida en /out
basePath: process.env.NODE_ENV === 'production' ? '/IslaMontanaWeb' : ''
assetPrefix: process.env.NODE_ENV === 'production' ? '/IslaMontanaWeb/' : ''
reactStrictMode: true
images.loader: 'custom'
images.loaderFile: './src/lib/image-loader.ts'
```

### Modo de renderizado
- **SSG puro** (`output: 'export'`). No hay runtime de servidor.
- El `next: { revalidate: 3600 }` en `src/lib/api.ts` opera solo durante el build.
- `generateStaticParams()` en `[slug]/page.tsx` genera rutas estáticas para los 4 destinos.

### TypeScript
- **`strict: true`** — todas las verificaciones estrictas activas.
- `target: ES2020`, `moduleResolution: bundler`, `isolatedModules: true`.
- **Path alias configurado:** `@/* → ./src/*`

### Variables de entorno expuestas al cliente
Archivo: `frontend/.env.local.example`

| Variable | Estado |
|----------|--------|
| `NEXT_PUBLIC_API_URL` | Activa (valor por defecto `http://localhost:8000`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Comentada / futura |
| `NEXT_PUBLIC_GA_TRACKING_ID` | Comentada / futura |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Comentada / futura |

---

## 2. Arquitectura

### Árbol de carpetas (3 niveles)
```
src/
├── app/                        → App Router: rutas, layouts y pages de Next.js
│   ├── layout.tsx              → Root layout (Server): carga fuentes, Navbar, Footer
│   ├── page.tsx                → Home page ⚠️ marcada "use client" (ver §4)
│   ├── error.tsx               → Error boundary (Client)
│   ├── not-found.tsx           → 404 page
│   ├── contact/                → Ruta /contact (solo README por ahora)
│   ├── destinations/           → Ruta /destinations (🚫 zona intocable)
│   │   ├── page.tsx            → Listado principal
│   │   └── [slug]/page.tsx     → Detalle dinámico por destino
│   └── tours/                  → Ruta /tours (en desarrollo)
│       ├── page.tsx
│       └── [id]/page.tsx
│
├── components/                 → Componentes React organizados por dominio
│   ├── destinations/           → 🚫 Zona intocable (12 archivos)
│   ├── home/                   → Secciones de la home (Stats, Destinations, Tours…)
│   ├── layout/                 → Shell global (Navbar, MegaMenu, Footer)
│   ├── tours/                  → Componentes de /tours (carpeta con solo README)
│   └── ui/                     → Primitivos UI reutilizables (ErrorPageClient, MegaMenuImage)
│
├── config/                     → Constantes de la aplicación
│   ├── assets.ts               → Rutas de assets (ASSETS constant)
│   ├── hero-images.ts          → Manifiesto de imágenes del hero por dispositivo
│   └── routes.ts               → Constantes de rutas (ROUTES constant)
│
├── data/                       → Datos estáticos de contenido
│   ├── destinations.ts         → Objetos de destinos (437 líneas)
│   ├── ecuadorPaths.ts         → Paths SVG Ecuador
│   └── southAmericaPaths.ts    → Paths SVG Sudamérica
│
├── hooks/                      → Custom React hooks
│   └── useHeroImages.ts        → Carrusel de hero + detección mobile/desktop
│
├── lib/                        → Utilidades y adaptadores
│   ├── api.ts                  → Cliente de API (fetch nativo)
│   ├── adapters.ts             → Transformadores de datos (adaptNavItem, adaptDestination)
│   ├── image-loader.ts         → Custom loader de Next.js Image
│   ├── image-path.ts           → Helper de rutas de imágenes
│   └── types.ts                → Tipos TypeScript compartidos
│
├── styles/                     → CSS global y por sección
│   ├── globals.css             → Design tokens + keyframes globales
│   ├── home.css                → Estilos de la home (~1 300 líneas)
│   ├── navbar.css              → Navegación (~441 líneas)
│   ├── footer.css              → Footer
│   ├── destinations.css        → Estilos de /destinations (111 líneas)
│   └── breakpoints/            → Overrides responsivos por dispositivo
│
└── types/                      → Definiciones de tipos TypeScript por módulo
    ├── api.ts                  → Tipos de respuestas de la API
    ├── assets.ts               → Tipo del mapa de assets
    └── hero-images.ts          → Tipos del manifiesto de hero
```

### Convenciones de nomenclatura
| Patrón | Uso |
|--------|-----|
| `PascalCase.tsx` | Componentes React |
| `camelCase.ts` | Hooks, utilidades, módulos |
| `kebab-case.css` | Archivos CSS |
| `SCREAMING_SNAKE_CASE` | Constantes (`ROUTES`, `ASSETS`) |
| `.bak`, `.bak2`, `.bak3`, `.bak4` | ⚠️ Archivos de respaldo comprometidos en repositorio |

### Separación UI vs lógica
- **Clara para componentes de home**: `DestCard.tsx`, `TourCard.tsx` (home) son Server Components puros, sin lógica.
- **Difusa en layout y /destinations**: `Navbar.tsx` mezcla 5 estados + 5 efectos con JSX de navegación.
- **Datos en componentes**: Arrays `STATS`, `TOURS`, `DESTINATIONS` embebidos directamente en algunos componentes home en lugar de vivir en `/data/`.

---

## 3. Patrones de componentes

### Componentes representativos

#### `src/app/layout.tsx` — 95 líneas — Server Component
- **Props**: `{ children: React.ReactNode }`
- **Hooks**: ninguno (función async de servidor)
- **Datos**: llama `getNavMenu()` con fallback estático, revalidate 3600
- **Olores**: ninguno. Patrón limpio.

#### `src/app/page.tsx` — 99 líneas — ⚠️ Client Component
- **Props**: ninguna
- **Hooks**: `useHeroImages()`
- **Olores**: `"use client"` en la raíz de la home page solo porque el Hero necesita el hook. Todos los hijos (Stats, Destinations, Tours, Gallery…) pasan a ser client-rendered innecesariamente.

#### `src/components/layout/Navbar.tsx` — 297 líneas — Client Component
- **Props**: `{ navData: NavItem[] }`
- **Hooks**: 5× `useState`, 5× `useEffect`, `useRef`, `useCallback`
- **Olores**:
  - Mega-componente: gestiona scroll, menú mobile, detección tablet, hover/click, teclado.
  - Props drilling: `navData` → Navbar → MegaMenu.
  - Múltiples event listeners en distintos efectos; correctamente limpiados pero difíciles de razonar.

#### `src/components/layout/MegaMenu.tsx` — 149 líneas — Client Component
- **Props**: `{ items, isOpen, parentLabel, onMouseEnter, onMouseLeave }`
- **Hooks**: `useState`, `useEffect` (media query)
- **Olores**: colores de fallback hardcodeados dentro del componente (deberían ir a config).

#### `src/components/home/Stats.tsx` — 117 líneas — Client Component
- **Props**: ninguna
- **Hooks**: `useRef`, `useState`, `useEffect` (IntersectionObserver + RAF)
- **Olores**: ninguno. Patrón excelente — hook interno `useCountUp` bien encapsulado, respeta `prefers-reduced-motion`.

#### `src/components/home/Destinations.tsx` — 84 líneas — Server Component
- **Props**: ninguna
- **Hooks**: ninguno
- **Olores**: array de datos `DESTINATIONS` embebido en el componente en lugar de en `/data/`.

#### `src/components/home/DestCard.tsx` — 62 líneas — Server Component
- **Props**: `{ d: DestinationItem, tall?: boolean }`
- **Olores**: ninguno. Componente presentacional limpio.

#### `src/components/ui/ErrorPageClient.tsx` — 275 líneas — Client Component
- **Props**: `{ type: '404' | '500', reset?: () => void }`
- **Hooks**: `useState`, `useEffect` (media query)
- **Olores**:
  - Mega-componente: 275 líneas con JSX profundamente anidado (10+ niveles).
  - Estilos inline masivos: layout/posicionamiento definido directamente en JSX.
  - Contenido hardcodeado mezclado con lógica de presentación.

#### `src/components/destinations/FAQ.tsx` — 81 líneas — 🚫 Client Component (zona intocable)
- **Props**: `{ destination: Destination, isMobile: boolean }`
- **Hooks**: `useState` (índice abierto del acordeón)
- **Olores**: estilos inline extensivos; mencionado solo para inventario.

#### `src/hooks/useHeroImages.ts` — Custom Hook — Client only
- **Propósito**: gestiona rotación de imágenes del hero (interval 5 s), preloading, detección mobile/desktop con debounce (150 ms).
- **Olores**: ninguno. Bien estructurado con `useCallback` para estabilizar dependencias.

---

## 4. Server vs Client

### Archivos con `"use client"` (fuera de /destinations)

| Archivo | Por qué lo necesita | ¿Sospechoso? |
|---------|---------------------|--------------|
| `src/app/page.tsx` | `useHeroImages()` requiere `useState`/`useEffect` | ⚠️ **SÍ** — demasiado alto; solo el Hero lo necesita |
| `src/app/error.tsx` | Callback `reset` de error boundary | ✓ Legítimo |
| `src/components/layout/Navbar.tsx` | 5 `useState`, event listeners (scroll, click, resize, teclado) | ✓ Legítimo pero inflado |
| `src/components/layout/MegaMenu.tsx` | `useState` hover, `useEffect` media query | ✓ Legítimo |
| `src/components/home/Stats.tsx` | `useState` + `useEffect` (IntersectionObserver, RAF) | ✓ Legítimo |
| `src/components/ui/ErrorPageClient.tsx` | `useState` + detección de media query | ✓ Legítimo |
| `src/components/ui/MegaMenuImage.tsx` | `useState` para manejo de error de imagen (`onError`) | ✓ Legítimo |

### Archivos con `"use client"` en zona /destinations (solo inventario, 🚫 no tocar)
`DestinationCard.tsx`, `DestinationHero.tsx`, `DestinationHighlights.tsx`, `DestinationMapAnimation.tsx`, `DestinationMapAnimationMobile.tsx`, `DestinationMapAnimationWrapper.tsx`, `DestinationPageClient.tsx`, `FAQ.tsx`, `Tours.tsx`, `WhyVisit.tsx`

### Server Components que importan librerías client-only
**Ninguno detectado.** Los Server Components solo usan primitivos de Next.js (`Image`, `Link`, `fetch`).

### Caso sospechoso principal
`src/app/page.tsx:1` — `"use client"` en la raíz de la home. Causa que Stats, Destinations, Tours, Gallery y FinalCta (todos Server-capaces) se hidraten en cliente.

---

## 5. Datos y estado

### Fetching de datos
**Librería**: `fetch` nativo con `next: { revalidate: 3600 }` (Next.js ISR durante build).  
**Base URL**: `process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'`

**Ejemplos reales** (`src/lib/api.ts`):
```ts
// src/lib/api.ts
export async function getDestinations(): Promise<DestinationResponse[]> {
  const res = await fetch(`${BASE_URL}/destinations`, { next: { revalidate: 3600 } })
  if (!res.ok) return []
  return res.json()
}
```
Todas las llamadas implementan fallback a array/null vacío ante error.

**Adaptadores** (`src/lib/adapters.ts`): `adaptDestination()` y `adaptNavItem()` convierten snake_case → camelCase.

**Datos estáticos**: `/src/data/destinations.ts` (fallback y `generateStaticParams()`).

### Estado global
**Ninguno.** Sin Redux, Zustand, Jotai ni Context API global.  
Todo el estado es local a componentes vía `useState`.

### Caché y revalidación
`next: { revalidate: 3600 }` en todas las llamadas a API. Con `output: 'export'` esto solo aplica en build time (no en runtime de producción en GitHub Pages).

### Formularios y validación
**No hay formularios activos.** La ruta `/contact` existe pero contiene solo un `README.md`.

---

## 6. Estilos y UI

### Sistema de estilos
**Tailwind CSS 3.4** + **CSS plano con nomenclatura BEM** (uso mixto).

- La mayoría de estilos estructurales viven en archivos CSS planos (`home.css`, `navbar.css`…).
- Tailwind se usa principalmente para utilidades inline en componentes nuevos.
- No hay CSS Modules.

### Librerías de componentes
**Ninguna.** Sin shadcn/ui, Radix, MUI, Chakra ni Headless UI. Todo construido from scratch.

### Tokens / variables CSS
**Ubicación principal**: `src/styles/globals.css`

```css
:root {
  --color-primary:  #3aa023;
  --color-accent:   #abd430;
  --color-dark:     #0d200c;
  --color-dark-mid: #1a3a18;
  --color-gray:     #6b7560;
  --color-light-bg: #f4f8f2;
  --color-white:    #ffffff;
  --font-base:      "Outfit", system-ui, sans-serif;
  --nav-height:     70px;
  --max-width:      1280px;
  --px:             clamp(20px, 4vw, 40px);
}
```

Paleta de color primario (azul) también extendida en `tailwind.config.ts`.  
⚠️ Colores hardcodeados detectados: `#0d200c` aparece literalmente en `DestinationHero.tsx` y `TourCard.tsx` en lugar de usar `var(--color-dark)`.

### Iconos
**Ninguna librería.** Se usan caracteres Unicode inline (`→`, `▾`) y SVGs inline. No hay imports de react-icons, heroicons ni similares.

### Fuentes
**`next/font/google`** — `Outfit` con pesos 300–900, `display: swap`, expuesta como variable CSS `--font-outfit`.

```ts
// src/app/layout.tsx
import { Outfit } from "next/font/google"
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" })
```

### Imágenes
- **`next/image`** con custom loader (`src/lib/image-loader.ts`) para manejar `basePath` en GitHub Pages.
- Formato: **WebP** en todo el directorio `/public/images/`.
- Lazy loading gestionado por `priority` prop de Next.js Image.
- Tamaños responsivos definidos con `sizes` en los componentes.

---

## 7. Dependencias y peso

### Dependencias de producción
Solo 3 dependencias de producción:

| Paquete | Versión | Peso estimado |
|---------|---------|---------------|
| `next` | ^14.2.0 | Bundle gestionado por Next.js |
| `react` | ^18.3.0 | ~42 KB min+gz |
| `react-dom` | ^18.3.0 | ~130 KB min+gz |

No hay lodash, moment, date-fns, axios, react-query, SWR, chart libraries, ni librerías de animación.

### Imports dinámicos
**Ninguno detectado.** Sin `import()`, `next/dynamic`, ni `React.lazy()`. No hay code splitting manual.

### Archivos JS/TS de cliente > 300 líneas (top 10 por tamaño)

| Archivo | Líneas | Notas |
|---------|--------|-------|
| `src/components/destinations/DestinationMapAnimation.tsx` | 537 | 🚫 Zona intocable |
| `src/components/destinations/DestinationMapAnimationMobile.tsx` | 467 | 🚫 Zona intocable |
| `src/data/destinations.ts` | 437 | Datos estáticos (no client bundle si es Server Component) |
| `src/components/layout/Navbar.tsx` | 297 | ⚠️ Mega-componente |
| `src/components/ui/ErrorPageClient.tsx` | 275 | ⚠️ Inline styles masivos |
| `src/components/destinations/DestinationHero.tsx` | 228 | 🚫 Zona intocable |
| `src/components/destinations/WhyVisit.tsx` | 165 | 🚫 Zona intocable |
| `src/components/layout/MegaMenu.tsx` | 149 | |
| `src/components/destinations/DestinationCard.tsx` | 141 | 🚫 Zona intocable |
| `src/styles/home.css` | ~1 300 | CSS (no JS bundle) |

---

## 8. Métodos JS a revisar

### 8.1 Cadenas filter().map() en render
**Ubicación**: `src/components/destinations/DestinationMapAnimation.tsx:519-530` 🚫

```tsx
{DESTINATIONS.filter(d => d.phase === 2).map(dest => (...))}
{DESTINATIONS.filter(d => d.phase === 5 && d.cardSide === 'left').map(dest => (...))}
```
**Por qué preocupa**: Cuatro `.filter()` separados sobre el mismo array en cada render. Array pequeño (4 elementos) → impacto mínimo actual. Si el array crece o se llama desde un loop, derivar los grupos fuera del JSX.

### 8.2 JSON.parse(JSON.stringify(...))
**No detectado.**

### 8.3 Spreads anidados en renders
**Ubicación**: `src/components/destinations/DestinationMapAnimation.tsx:158-159` 🚫  
`src/components/destinations/DestinationMapAnimationMobile.tsx:105-106` 🚫

```ts
const currentSAVB = useRef<ViewBox>({ ...SA_VB_INITIAL })
```
**Evaluación**: Inicialización de `useRef`, no está en un loop de render. Sin impacto.

### 8.4 useEffect con dependencias inestables
- `src/hooks/useHeroImages.ts` — `checkIfMobile` estabilizado con `useCallback`. ✓ Seguro.
- `src/components/layout/Navbar.tsx:42-99` — múltiples efectos, todos con cleanup. ✓ Seguro.
- `src/components/destinations/DestinationMapAnimation.tsx:183-256` — efecto vacío `[]` que monta el loop RAF. ✓ Intencional y correcto.

**No se detectaron dependencias genuinamente inestables.**

### 8.5 Funciones declaradas en render pasadas a hijos memoizados
**No detectado.** Los callbacks de Navbar (`openMenu`, `closeMenu`) están memoizados con `useCallback`. No hay `React.memo()` en hijos, por lo que no hay memoización que romper actualmente.

### 8.6 Regex compiladas dentro de funciones frecuentes
**No detectado.**

### 8.7 Cálculos pesados síncronos en render
- **Loops RAF** en `DestinationMapAnimation.tsx` y `DestinationMapAnimationMobile.tsx`: operaciones LERP (`a + (b-a)*t`), `Math.abs()`, `Math.min()` — ligeras, en RAF (no en React render). ✓ Aceptable.
- **Stats.tsx:42-48**: cálculo de easing en RAF con `Math.pow()`. ✓ Aceptable.
- **WhyVisit.tsx:37-106**: cálculo de rotación/z-index para stack de fotos (3 fotos, array pequeño). ✓ Aceptable.

### 8.8 Timeouts e intervals
Todos los timeouts/intervals encontrados tienen su correspondiente `clearTimeout`/`clearInterval`/`cancelAnimationFrame` en el return del efecto. ✓ Sin memory leaks detectados.

---

## 9. /destinations — 🚫 NO TOCAR

> **Esta sección es de solo inventario. Ningún archivo listado aquí debe modificarse en fases posteriores.**

### 9.1 Inventario completo de archivos

**Pages (Server Components):**
- `src/app/destinations/page.tsx` — 62 líneas
- `src/app/destinations/[slug]/page.tsx` — 28 líneas

**Client Components:**
- `src/components/destinations/DestinationPageClient.tsx` — 48 líneas
- `src/components/destinations/DestinationHero.tsx` — 228 líneas
- `src/components/destinations/WhyVisit.tsx` — 165 líneas
- `src/components/destinations/Tours.tsx` — 111 líneas
- `src/components/destinations/TourCard.tsx` — 93 líneas
- `src/components/destinations/GalleryCta.tsx` — 117 líneas
- `src/components/destinations/FAQ.tsx` — 81 líneas
- `src/components/destinations/FinalCta.tsx` — 71 líneas
- `src/components/destinations/DestinationCard.tsx` — 141 líneas

**Componentes de animación (🚨 CRÍTICOS):**
- `src/components/destinations/DestinationMapAnimation.tsx` — 537 líneas — Desktop scroll-driven
- `src/components/destinations/DestinationMapAnimationMobile.tsx` — 467 líneas — Mobile swipe carousel
- `src/components/destinations/DestinationMapAnimationWrapper.tsx` — 28 líneas — Switch responsive

**Datos:**
- `src/data/destinations.ts` — 437 líneas — Todos los datos de destinos
- `src/data/ecuadorPaths.ts` — 55 líneas — Paths SVG Ecuador + PHASE_VIEWBOXES
- `src/data/southAmericaPaths.ts` — 18 líneas — Paths SVG Sudamérica

**Estilos:**
- `src/styles/destinations.css` — 111 líneas — Keyframes + polaroid stack

**Total**: ~2 895 líneas en 17 archivos.

### 9.2 Librerías de animación en /destinations
**Ninguna librería externa de animación.** Todo implementado con:
- `requestAnimationFrame` + LERP manual (DestinationMapAnimation, DestinationMapAnimationMobile)
- `CSS @keyframes` (`destFadeUp`, `destScrollBounce`, `cardFadeIn`) en `destinations.css`
- `transform`/`opacity` inline con `cubic-bezier` hardcodeadas
- `IntersectionObserver` (DestinationCard para fade-in)

### 9.3 ¿Las mismas librerías se usan en otras rutas?
Al no haber librerías externas de animación, no hay riesgo de romper `/destinations` al optimizar otras rutas por ese motivo.

Sí se comparten **utilidades** que, si se modifican, pueden afectar `/destinations`:

| Utilidad | Usada en /destinations | También usada en | Riesgo |
|----------|----------------------|------------------|--------|
| `src/config/routes.ts` (ROUTES) | DestinationCard, GalleryCta, TourCard, FinalCta | Home page, Layout, todas las páginas | **ALTO** |
| `src/config/assets.ts` (ASSETS) | DestinationMapAnimation, DestinationCard | Home page, MegaMenu | **MEDIO** |
| `src/lib/types.ts` | Interfaz `Destination` en casi todo | Tours page | **MEDIO** |
| `src/data/ecuadorPaths.ts` | DestinationMapAnimation, DestinationMapAnimationMobile | Solo /destinations | Bajo |

### 9.4 Hooks y providers compartidos
- **Ningún Context Provider** — todo el estado es local.
- **`useHeroImages`** — NO se usa en /destinations; solo en la home.
- Las animaciones no dependen de hooks externos.

### 9.5 Mecánica de animación (para conciencia, no para tocar)
- **Desktop**: RAF mide `scrollY - offsetTop` / `scrollRange` → progreso 0-1 → mapeo a 6 fases → LERP de viewBox SVG cada tick.
- **Mobile**: touch start/end + velocidad → avance/retroceso de slide → índice 0-4 → PHASE_VIEWBOXES equivalentes.
- **LERP_FACTOR = 0.06** — calibrado cuidadosamente; cambios rompen la fluidez.
- **Breakpoint = 1024px** — el Wrapper usa `matchMedia('(max-width: 1023px)')` para elegir implementación.
- **`prefers-reduced-motion`** verificado en ambas implementaciones.

---

## 10. Performance y bundle

### Reportes existentes
**Ninguno.** No hay archivos `.lighthouseci/`, `stats.json`, `lighthouse-report.html`, ni bundle analyzer configurado.

### Imágenes
- Formato: **WebP** en todos los assets.
- `next/image` con custom loader para manejo de `basePath`.
- `priority` prop en primera imagen de cada sección.
- Atributo `sizes` con valores responsivos en componentes de grid.
- ⚠️ Hook `useHeroImages` precarga **todas** las imágenes del hero al montar (desktop + mobile) independientemente del dispositivo actual.

### Cache-Control
No hay configuración de `Cache-Control` en código fuente. GitHub Pages aplica sus propios headers por defecto.

### Service Worker / PWA / Prefetching
**Ninguno.** Sin `manifest.json`, service workers ni configuración de prefetch explícita.

---

## 11. Tests y CI

### Framework de tests
**Ninguno configurado.** Sin Jest, Vitest, Playwright, Cypress ni Testing Library. No hay archivos `.test.*` ni `.spec.*`. No hay scripts de test en `package.json`.

### Pre-commit hooks
**Sin hooks activos.** Solo archivos `.sample` en `.git/hooks/`. Sin Husky, lefthook ni lint-staged.

### Pipeline de CI
**Archivo**: `.github/workflows/deploy.yml`

Pasos:
1. Checkout (Node 20, cache npm)
2. `npm ci` en `/frontend`
3. `npm run generate:hero` (genera manifiesto de imágenes)
4. `npm run build`
5. Upload artifact `frontend/out` → Deploy a GitHub Pages

⚠️ El linter (`next lint`) está disponible pero **no se ejecuta en CI** antes del deploy.  
⚠️ No hay paso de tests ni verificación de tipos (`tsc --noEmit`) en el pipeline.

---

## 12. Hallazgos extra

### Archivos de respaldo comprometidos en git
7 archivos `.bak*` en el repositorio:
- `src/app/destinations/page.tsx.bak`
- `src/components/destinations/DestinationMapAnimation.tsx.bak` (.bak, .bak2, .bak3, .bak4)
- `src/data/ecuadorPaths.ts.bak` (.bak, .bak2)

**Recomendación**: eliminar y añadir `*.bak` al `.gitignore`.

### Imágenes faltantes
9 imágenes referenciadas en `src/config/assets.ts` no existen en disco (mega-menu: ANDES_CULTURA, CRUCEROS, CIRCUITOS, DAY_TOURS, BIRDWATCHING, y varias de galería).

### Case mismatch en paths de assets
`src/config/assets.ts:39-41` usa `Computer/` (mayúscula) pero el directorio real es `computer/` (minúscula). En servidores Linux/macOS esto causa 404s en producción.

### Typo histórico "movile"
Directorio `public/images/hero-main/movile/` (debería ser `mobile/`) hardcodeado en:
- `scripts/generate-hero-manifest.mjs`
- `src/config/hero-images.ts` (generado)
- `src/hooks/useHeroImages.ts`

Documentado en `ARCHITECTURE.md` como deuda técnica conocida.

### Inconsistencia de nombre de marca
- `src/app/layout.tsx`: metadatos usan "Islamontana Travel"
- `src/app/destinations/page.tsx`: metadatos usan "Isla Montaña"

### Colores hardcodeados fuera de tokens
`#0d200c` aparece literal en `src/components/destinations/DestinationHero.tsx` y `src/components/destinations/TourCard.tsx` en lugar de `var(--color-dark)`. (Zona intocable — solo para registro.)

### Datos embebidos en componentes
Arrays `STATS`, `TOURS`, `DESTINATIONS` viven dentro de sus componentes de home en lugar de en `/src/data/`. Si se mueven datos al backend, habría que editar componentes.

### Dos implementaciones de TourCard y DestCard
- `src/components/home/DestCard.tsx` vs `src/components/destinations/DestinationCard.tsx`
- `src/components/home/TourCard.tsx` vs `src/components/destinations/TourCard.tsx`

Diferencias justificadas por contexto (home vs página de detalle), pero conviene documentarlo explícitamente para evitar confusión.

### Carpetas vacías con solo README
- `src/components/tours/README.md` (carpeta sin componentes)
- `src/components/ui/README.md`
- `src/lib/README.md`

### TODOs / FIXMEs
**Ninguno detectado** en el código fuente. La deuda técnica conocida está documentada en archivos `README.md` y `ARCHITECTURE.md` por carpeta.

---

## 13. Preguntas abiertas

Estas preguntas deben resolverse con el dueño del repo antes de proponer cambios en fases posteriores:

1. **¿Se planea migrar de GitHub Pages a un servidor con runtime?** La elección `output: 'export'` es la restricción arquitectónica más importante. Si se migra a Vercel/VPS, `revalidate` pasaría a funcionar en runtime y abriría opciones de SSR/ISR real.

2. **¿El backend (`NEXT_PUBLIC_API_URL`) existe en producción?** El repo usa datos estáticos como fallback porque el API devuelve errores. ¿Es el backend operativo? ¿La home y /destinations leen datos reales en producción o siempre el fallback?

3. **¿El typo `movile/` se puede renombrar?** Requiere mover el directorio de imágenes y actualizar el script `generate:hero`. Es un cambio coordinado. ¿Hay alguna razón para mantenerlo?

4. **¿Las 9 imágenes faltantes del mega-menu van a añadirse?** El código actual usa `{imageExists && ...}` como fallback. ¿Es intencional dejar las secciones sin imagen por ahora?

5. **¿El case mismatch `Computer/` vs `computer/` produce 404s en producción?** Confirmar si GitHub Pages (Linux) distingue mayúsculas y si ya se han visto errores 404 en esas imágenes.

6. **¿La ruta `/tours` está en desarrollo activo?** La carpeta de componentes `/src/components/tours/` tiene solo un README. ¿Hay trabajo en curso que no deba tocarse?

7. **¿La ruta `/contact` va a implementarse?** Solo existe el README. ¿Hay un plazo o bloqueo?

8. **¿Se requiere añadir tests antes de cualquier refactor?** Sin framework de tests ni pre-commit hooks, cualquier cambio va a producción sin guardarraíles. ¿Es aceptable añadir Vitest + Testing Library como prerequisito del plan de optimización?

9. **Nombre de marca**: ¿"Islamontana Travel" o "Isla Montaña"? Los metadatos son inconsistentes. ¿Cuál es el nombre oficial?

10. **¿Los datos de destinos son exclusivamente estáticos?** `src/data/destinations.ts` es el único source of truth real. ¿El backend de destinos funciona o está planeado para el futuro?

---

*Generado automáticamente el 2026-04-29. Ningún archivo del repositorio fue modificado durante esta auditoría.*
