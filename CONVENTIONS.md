# Convenciones del proyecto

> Repositorio: IslaMontana Travel — Frontend  
> Fecha: 2026-04-30  
> Basado en: `OPTIMIZATION_PLAN.md` y `AUDIT_REPORT.md` (raíz del repo)

---

## 0. Cómo usar este documento

**Quién**: cualquier persona o agente que vaya a tocar el frontend (`frontend/`).  
**Cuándo**: antes de abrir un PR. Las reglas de §11 son el checklist mínimo.  
**Si una regla no es clara**: abrir un issue en el tracker del proyecto o comentar en el PR antes de asumir una interpretación.  
**Si una regla ya no aplica**: proponer la actualización en el mismo PR que la viola, con justificación.

---

## 1. Principios rectores

| Principio | Frase resumen | Regla derivada |
|-----------|---------------|----------------|
| **Server First** | Un componente es Server por defecto; `"use client"` solo si hay razón concreta. | Ver §2 — árbol de decisión. |
| **Composición sobre configuración** | Dividir en sub-componentes especializados en vez de acumular props booleanas. | Ver §4 — cuándo dividir. |
| **Extraer la lógica** | La lógica que podría tener tests propios vive en hooks, no en JSX. | Ver §3 — cuándo extraer. |
| **Segregación de props** | Un componente recibe solo lo que usa. | Ver §5 — solo lo que usa. |
| **Colocación** | Los datos viven donde tiene sentido según su alcance y origen. | Ver §6 — reglas de colocación. |

---

## 2. Server vs Client Components

### La regla

Un componente lleva `"use client"` **solo** si cumple alguna de estas condiciones:

1. Usa hooks de estado/efecto (`useState`, `useEffect`, `useRef`, `useReducer`, `useLayoutEffect`).
2. Usa APIs de browser (`window`, `document`, `localStorage`, `IntersectionObserver`, `matchMedia`).
3. Necesita event handlers que no se pueden delegar a un hijo cliente más pequeño.
4. Importa una librería que solo corre en cliente.

Si no cumple ninguna → no marcar nada (Server Component por defecto).

### Árbol de decisión

```
¿El componente usa hooks / APIs de browser / event handlers propios?
├── Sí → "use client"
└── No → no marcar nada (server por defecto)
         ¿Algún hijo lo necesita?
         ├── Sí → extraer ese hijo a su propio archivo con "use client"
         └── No → componente server puro ✓
```

### Ejemplos del repo

**Correcto — Client necesario:**  
`src/components/home/HomeHero.tsx` — usa `useHeroImages` (hook con `useState` + `useEffect`).  
`src/components/home/Stats.tsx` — usa `IntersectionObserver` + RAF + `useState`.  
`src/components/layout/Navbar.tsx` — 5 `useState`, 5 `useEffect`, scroll y resize.

**Correcto — Server:**  
`src/app/page.tsx` (tras Fase 2) — no tiene hooks; importa sub-componentes directamente.  
`src/components/home/Tours.tsx` — renderiza datos estáticos sin hooks.

### Anti-patrón

Marcar `"use client"` en un componente padre cuando solo un hijo lo necesita.  
Solución: extraer ese hijo a su propio archivo client.

---

## 3. Extracción de lógica (hooks)

### La regla

La lógica que **podría tener tests propios** vive en hooks personalizados (`use*.ts`) en `src/hooks/`.

### Cuándo extraer

- Un componente tiene 2+ `useState` relacionados con la misma responsabilidad.
- Un `useEffect` tiene 5+ líneas o lógica condicional compleja.
- La misma lógica aparece en 2+ componentes.

### Cuándo NO extraer

- Si el hook resultante sería solo `useState` + setter trivial.
- Si la extracción no reduce complejidad real.
- Si el código tiene < 5 líneas y se usa en un único lugar.

### Ejemplos del repo

Extraídos en Fase 3 (cada uno en `src/hooks/`):

| Hook | Responsabilidad |
|------|-----------------|
| `useScrollState.ts` | `isScrolled: boolean` según `window.scrollY > 30` |
| `useTabletDetection.ts` | `isTablet: boolean` con `matchMedia` |
| `useMegaMenuController.ts` | `activeMenu`, `openMenu`, `closeMenu`, timer de debounce |
| `useBodyOverflowLock.ts` | Bloquear/desbloquear `overflow` del body |
| `useMobileMenuState.ts` | Estado del drawer mobile y submenús anidados |
| `useHeroImages.ts` | Carrusel de hero, preloading, detección mobile/desktop |

### Formato de nombre

`use[Sustantivo][Verbo?].ts`  
✅ `useScrollState.ts`, `useMegaMenuController.ts`  
❌ `useData.ts`, `useHelper.ts`

Hooks que devuelven 3+ valores retornan objeto con nombres descriptivos:  
`{ isOpen, open, close, toggle }` — no `[state, setState]`.

---

## 4. Composición vs configuración

### La regla

Si un componente acumula props booleanas (`isOpen`, `isMobile`, `hasError`) o variantes de tipo (`type: '404' | '500'`), considerar dividirlo en sub-componentes especializados.

### Umbral de tamaño

Un sub-componente se justifica cuando tiene **≥ 15 líneas útiles** de JSX/lógica propias. Por debajo, mantener inline.

### Qué no es composición

Crear wrappers triviales que solo reenvían props sin encapsular ninguna decisión.

### Ejemplos del repo

`src/components/ui/ErrorPageClient.tsx` descompuesto en:
- `ErrorHeader` — Badge + Headline + Subtitle (~30 líneas).
- `ErrorCTAs` — botones de acción por tipo de error (~35 líneas).
- `ErrorQuickLinks` — grid de links rápidos solo en 404 (~30 líneas).

`src/components/layout/Navbar.tsx` descompuesto con hooks extraídos + `MobileDrawer` sub-componente.

### Qué no descomponer

- `NavbarLogo` — 10 líneas de `Link` + `Image`, sin lógica.
- `handleKeyDown` en Navbar — 9 líneas, único uso.
- Sub-funciones locales bien acopladas (`MenuCard` dentro de `MegaMenu.tsx`).

---

## 5. Segregación de props

### La regla

Un componente recibe **solo lo que usa**. Pasar el objeto completo del dominio a un componente que solo necesita 2 campos viola esta regla.

### Excepción legítima

Tarjetas presentacionales que renderizan la mayoría de los campos de un modelo:  
`src/components/home/DestCard.tsx` recibe `{ d: DestinationItem }` y muestra casi todos sus campos — correcto.

### Ejemplo del repo

`src/components/layout/MegaMenu.tsx` recibe `isTablet` como prop desde `Navbar.tsx` (Fase 3) en vez de recalcularlo internamente con un `useEffect` duplicado. Esto elimina la duplicación de `matchMedia` que existía antes de Fase 3.

---

## 6. Colocación de datos

### Cinco reglas operacionales

**Regla 1** — Array ≤ 6 items, estático, usado en un solo componente → **inline**.  
Ejemplo: `STATS` en `src/components/home/Stats.tsx`.

**Regla 2** — Array que cruzará componentes o puede venir del backend → **`src/data/[nombre].ts`**.  
Ejemplos: `src/data/home-tours.ts`, `src/data/home-destinations.ts` (Fase 4).

**Regla 3** — Configuración de diseño (colores, breakpoints, tamaños) → **`src/config/[nombre].ts`**.  
Ejemplo: `DIFF_COLORS` en `src/config/colors.ts` (Fase 1).

**Regla 4** — Tipo usado en 2+ módulos → **`src/lib/types.ts`**. Tipo usado en 1 módulo → declarar en ese archivo.

**Regla 5** — Si dos arrays tienen formas de objeto distintas, son fuentes independientes. No forzar derivación.  
Ejemplo verificado: `HOME_DESTINATIONS` (`{slug, name, label, src, accent, desc}`) ≠ `DESTINATIONS` en `src/data/destinations.ts` (`{slug, name, tagline, description, heroImage, accentColor, ...}`). Son estructuras de presentación distintas; la derivación con `slice/pick` no es segura.

### Detección de duplicación

```bash
grep -r "DIFF_COLORS\|const TOURS\|const DESTINATIONS\|const STATS" src/components/ --include="*.tsx"
```

Si el mismo literal aparece en 2+ archivos → crear fuente única.

---

## 7. Dynamic imports

### Cuándo usar `next/dynamic`

✅ Componentes que solo se cargan en condiciones específicas (errores, modales, rutas raras).  
✅ Componentes below-the-fold no críticos para LCP.  
✅ Componentes que cargan librerías pesadas no usadas al inicio.

### Cuándo NO usar `next/dynamic`

❌ Componentes above-the-fold — empeoraría LCP.  
❌ Componentes siempre montados en el DOM aunque visualmente ocultos (`opacity-0`, `display: none`). El primer disparo del evento de apertura encontraría el componente sin cargar.  
❌ Componentes pequeños (< 3 KB minificados) — el coste del chunk separado supera el ahorro.

### Regla de CLS

Si el placeholder de `loading:` tiene altura cero, **añadir `min-height` al CSS en el mismo commit** para evitar CLS.

### Ejemplos del repo

| Componente | Decisión | Razón |
|------------|----------|-------|
| `src/components/ui/ErrorPageClient.tsx` | **GO** — dynamic con `ssr: false` | Solo aparece en rutas de error |
| `src/components/home/Stats.tsx` | **GO** — dynamic + `min-height` en `.stats` | Below-fold; CLS resuelto con `min-height: 220px` en `home.css` |
| `src/components/layout/MegaMenu.tsx` | **NO-GO** | Siempre en DOM (`opacity-0 pointer-events-none`); primer hover sin respuesta |
| `src/components/home/HomeHero.tsx` | **NO-GO** | Above-fold; crítico para LCP |

---

## 8. Estilos: BEM + Tailwind

### Regla dual

- **Estilos estructurales** (layout, shape, comportamiento visual del bloque) → **BEM** en archivo `.css` (`home.css`, `navbar.css`, `error-page.css`…).
- **Utilidades** (spacing, flex, alignment, color, text-size) → **Tailwind** inline en JSX.

### Nunca mezclar para la misma propiedad en el mismo elemento

✅ `className="navbar__logo"` — todo en CSS  
✅ `className="flex items-center gap-4"` — todo Tailwind  
❌ `className="navbar__logo flex items-center"` — mezcla en el mismo elemento

### Valores dinámicos

`style={{}}` inline es aceptable para valores calculados en runtime:  
`style={{ opacity: idx === currentIndex ? 1 : 0 }}`

### Animaciones reutilizables

`@keyframes` declarados en `src/styles/globals.css` con nombre descriptivo.

---

## 9. Convenciones de nombres

| Tipo | Convención | Ejemplos |
|------|-----------|---------|
| Archivos de componentes | `PascalCase.tsx` | `Navbar.tsx`, `HomeHero.tsx` |
| Hooks | `useNombre.ts` | `useScrollState.ts`, `useHeroImages.ts` |
| Archivos de datos | `kebab-case.ts` | `home-tours.ts`, `home-destinations.ts` |
| Archivos de config | `camelCase.ts` o `kebab-case.ts` consistente con los existentes | `assets.ts`, `hero-images.ts` |
| Archivos de estilos | `kebab-case.css` | `home.css`, `navbar.css`, `error-page.css` |
| Tipos / interfaces | `PascalCase` | `NavItem`, `DestinationItem`, `Tour` |
| Constantes globales | `SCREAMING_SNAKE_CASE` | `ROUTES`, `ASSETS`, `DIFF_COLORS` |

### Valores de retorno de hooks

Hooks que devuelven 3+ valores: objeto nombrado.  
`{ isOpen, open, close, toggle }` — no `[state, setState]`.

### Carpetas por dominio

`home/`, `destinations/`, `layout/` — no por tipo de componente (`cards/`, `sections/`).  
Nueva carpeta cuando el dominio alcanza 4+ componentes relacionados.

---

## 10. Zona intocable

### Definición

Archivos cuya modificación destructiva está **prohibida**. Son resultado de calibración manual costosa (animaciones scroll-driven de precisión, swipe mobile, timing LERP).

### Lista actual

**Pages:**
- `src/app/destinations/page.tsx`
- `src/app/destinations/[slug]/page.tsx`

**Componentes:**
- `src/components/destinations/` — los 13 archivos completos

**Datos y estilos:**
- `src/data/destinations.ts`
- `src/data/ecuadorPaths.ts`
- `src/data/southAmericaPaths.ts`
- `src/styles/destinations.css`

Ver inventario completo en `OPTIMIZATION_PLAN.md §2.1`.

### Política append-only para utilidades compartidas

Los siguientes archivos son usados por la zona intocable. Solo añadir; nunca renombrar ni eliminar entradas existentes:

| Archivo | Política |
|---------|----------|
| `src/config/routes.ts` | Solo añadir nuevas claves de `ROUTES`. |
| `src/config/assets.ts` | Solo añadir. |
| `src/lib/types.ts` | Solo añadir. La interfaz `Destination` no se modifica; usar `Omit`/`Pick`/extensión. |

Ver `OPTIMIZATION_PLAN.md §2.2`.

### Cómo levantar la prohibición

Solo el dueño del repositorio puede aprobar excepciones, una a una, con justificación explícita en el PR.

---

## 11. Checklist de PR

Completar antes de pedir merge:

- [ ] `npm run build` pasa sin errores.
- [ ] `npm run lint` pasa sin errores.
- [ ] `npx tsc --noEmit` pasa sin errores.
- [ ] Si se añade `"use client"`, está justificado por alguna condición del §2.
- [ ] Si se toca cualquier archivo de `src/app/destinations/` o `src/components/destinations/`, hay aprobación explícita del dueño del repo en el PR.
- [ ] Si se añade una nueva dependencia, está justificada en la descripción del PR.
- [ ] Si se añade un array nuevo, está colocado según las reglas del §6.
- [ ] Si se usa `next/dynamic`, sigue las reglas del §7 (incluyendo `min-height` si el placeholder tiene altura cero).
- [ ] Las imágenes nuevas usan `next/image` con el loader del repo (`src/lib/image-loader.ts`).
- [ ] Sin warnings de hydration en consola al correr `npm run dev`.
- [ ] Revisión visual en desktop y mobile antes de marcar como lista.

---

## 12. Glosario y referencias

### Glosario

| Término | Definición |
|---------|------------|
| **Server Component** | Componente renderizado en build o en servidor; no envía JS propio al cliente. |
| **Client Component** | Componente con `"use client"`; hidrata y ejecuta en el navegador. |
| **SSG** | Static Site Generation. Este repo usa `output: 'export'` → HTML estático sin runtime de servidor. |
| **LCP** | Largest Contentful Paint — tiempo hasta que el elemento principal visible termina de renderizar. |
| **CLS** | Cumulative Layout Shift — desplazamiento acumulado de layout inesperado. |
| **INP** | Interaction to Next Paint — latencia de respuesta a interacciones del usuario. |
| **Zona intocable** | Conjunto de archivos de `/destinations` con animaciones de precisión calibrada. Ver §10. |
| **Append-only** | Política que permite añadir pero prohíbe renombrar o eliminar entradas existentes. |
| **dynamic import** | `next/dynamic` — carga diferida de un componente en un chunk JS separado. |
| **BEM** | Block Element Modifier — metodología de nomenclatura CSS: `.block__element--modifier`. |

### Referencias internas

- `OPTIMIZATION_PLAN.md` — plan completo por fases con decisiones arquitectónicas.
- `AUDIT_REPORT.md` — auditoría del estado inicial del repo (2026-04-29).
- `frontend/src/styles/globals.css` — design tokens CSS (`--color-*`, `--nav-height`, `--px`).

### Referencias externas

- Web Vitals (LCP, CLS, INP): https://web.dev/vitals
- Next.js App Router: https://nextjs.org/docs/app
- Next.js dynamic imports: https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading

---

*Generado el 2026-04-30 como cierre operativo de `OPTIMIZATION_PLAN.md §5`. Las reglas reflejan el estado del repo tras Fases 1–4.*
