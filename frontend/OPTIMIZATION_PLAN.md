# Plan de optimización del frontend

> Repositorio: IslaMontana Travel — Frontend  
> Fecha: 2026-04-29  
> Basado en: `AUDIT_REPORT.md` (2026-04-29)  
> Revisado: 2026-04-29 (Prompt 3 — verificación in situ + correcciones)  
> Modo: Solo planificación. Ningún archivo del producto fue modificado.

---

## Changelog vs versión anterior

### Qué se modificó y por qué

| Sección | Cambio | Motivo |
|---------|--------|--------|
| §3 DB-4 | Cambiado de **Opción B** (no instalar) a **Opción A** (instalar `@next/bundle-analyzer` como prerequisito de Fase 2) | B.2.b: sin baseline objetivo no se puede medir el efecto real de Fase 2 + Fase 4. 5 minutos de instalación desbloquean esa visibilidad. |
| §3 DB-7 | Cerrado como "no se requiere cambio" | V1 ✅ VERIFICADO IN SITU: `destinations/page.tsx` (línea 4) usa "Islamontana Travel". El audit citaba un `README.md` de documentación, no el código activo. |
| §3 DB-2 | Urgencia subida: ahora bloqueante antes de Fase 4 (no solo antes de Fase 1) | B.2.c: si el backend se activa, Fase 4 tendrá que volver a tocar `useHeroImages` — resolver DB-2 antes de iniciar Fase 4. |
| §4.2.B | Árbol de sub-componentes consolidado: 8 → 3 archivos propuestos | V4 ✅ VERIFICADO IN SITU: 5 de los 8 sub-componentes tendrían < 15 líneas útiles, violando §4.2.C. Árbol revisado: `ErrorHeader` (fusión de Badge+Headline+Subtitle), `ErrorCTAs`, `ErrorQuickLinks`. Secuencia de commits actualizada (5 → 4 commits). |
| §4.3.A | Fila `DESTINATIONS` (home): estrategia corregida a **constante independiente** | V5 ✅ VERIFICADO IN SITU: `DestinationItem` y `Destination` tienen campos distintos (`label`, `src`, `accent`, `desc` vs `tagline`, `heroImage`, `accentColor`, `description`). Derivación con `slice/pick` **no es segura**. |
| §4.3.D regla 5 | Corregida: eliminada la afirmación de que `HOME_DESTINATIONS = DESTINATIONS.slice(0,4)` es posible | V5: los objetos son distintos; la derivación asumida en la versión anterior era incorrecta. |
| §4.4.A paso 3 | Fallback cambiado de `setTimeout(preloadRest, 2000)` a `setTimeout(preloadRest, 1000)` | B.2.d: el carrusel rota cada 5s; 2000ms es ajustado. 1000ms deja 4s de margen para precargar antes del primer cambio. |
| §4.4.B MegaMenu | Cambiado de **GO** a **NO-GO** | V3 ✅ VERIFICADO IN SITU: MegaMenu está **siempre en el DOM** (visible u oculto por `opacity-0 pointer-events-none`). Dynamic import con `ssr:false` produciría un primer hover sin respuesta hasta que el chunk cargue. 148 líneas × 25 bytes ≈ 3.7 KB — ahorro no justifica el coste de UX. Commit 5 de Fase 4 eliminado; métricas actualizadas. |
| §4.4.B Stats | Añadida condición obligatoria: `min-height` en `.stats` en el mismo commit | V2 ✅ VERIFICADO IN SITU: `.stats` no declara `min-height` ni `height` — solo `padding: 72px var(--px)`. El placeholder `<div className="stats" />` tendría altura 0 al hidratar → CLS confirmado. |
| §4.5.D | Cerrado DB-7 con veredicto definitivo | V1: el README de `destinations/` documenta la inconsistencia como deuda histórica, pero el código activo ya es consistente. No hay nada que corregir. |
| §5 | Añadida sub-sección `5.0 Compatibilidad con desarrollo en curso` | B.2.a: aclara qué fases son paralelas, cuáles requieren coordinación y el orden recomendado si la página sigue en construcción. |
| §5 Fase 4 commit 5 | **Eliminado** (dynamic import de MegaMenu) | V3: NO-GO. El plan ahora tiene 6 commits en Fase 4 en vez de 7. |
| §5 Fase 4 commit 7 | Ahora commit 6. Añadida nota: incluir `min-height` en `.stats` en el mismo commit | V2: sin esta adición el dynamic import de Stats produce CLS. |
| §6 métricas | Fila "Dynamic imports": objetivo tras Fase 4 cambiado de 3 a 2 | MegaMenu eliminado de la lista. |
| §3 DB-4 (comentario en §4.4.D) | Actualizado para reflejar decisión GO | B.2.b. |
| §4.2.B commits | Actualizados de 5 a 4 commits | Árbol consolidado reduce pasos. |

### Decisiones resueltas en esta revisión
- **DB-7** (nombre de marca): cerrada. Código activo es consistente. ✅
- **V2** (CLS en Stats dynamic): resuelta condicionando el GO a añadir `min-height`. ✅
- **V3** (MegaMenu dynamic): resuelta como NO-GO. ✅
- **V4** (árbol ErrorPageClient): árbol corregido a 3 sub-componentes. ✅
- **V5** (HOME_DESTINATIONS): estrategia corregida a constante independiente. ✅

### Decisiones que siguen abiertas
Ver §3: DB-1, DB-2, DB-3, DB-5, DB-6, DB-8.

---

## 0. Resumen ejecutivo

- **Diana principal**: `src/app/page.tsx` lleva `"use client"` por un único hook del Hero; extraer `<HomeHero/>` a su propio archivo client convierte la home en Server Component y sus hijos (Stats, Destinations, Tours, Gallery, FinalCta) pasan a ser potencialmente server-rendered.
- **Zona intocable respetada**: ninguno de los 17 archivos de `/destinations` se modifica; toda optimización queda fuera de ese perímetro.
- **Limpieza urgente antes de cualquier otra cosa**: eliminar 7 archivos `.bak*`, corregir case mismatch `Computer/` → `computer/` en `assets.ts` (produce 404s en producción), añadir `*.bak` al `.gitignore`.
- **CI sin guardarraíles**: el pipeline despliega sin ejecutar linter ni type-check; añadir ambos pasos es de bajo riesgo y alto valor.
- **Mega-componentes**: `Navbar.tsx` (297 líneas, 5 estados, 5 efectos) y `ErrorPageClient.tsx` (275 líneas, estilos inline masivos) son candidatos de refactor; se propone descomposición por pasos pequeños y commits no-rompedores.
- **Duplicación de datos**: `DIFF_COLORS` está literalmente duplicado en `home/TourCard.tsx` y `destinations/TourCard.tsx`; mover a `src/config/colors.ts` elimina el riesgo de divergencia.
- **Dynamic imports**: dos candidatos confirmados — `ErrorPageClient` y `Stats` — con un coste de implementación de menos de 15 minutos cada uno. `MegaMenu` descartado: siempre en el DOM, dynamic import produciría primer hover sin respuesta. ✅ VERIFICADO IN SITU
- **Precarga de imágenes**: `useHeroImages` precarga ambos sets (desktop y mobile) al montar; precargando solo el set activo y difiriendo el otro con `requestIdleCallback` se reduce trabajo innecesario.
- **Convenciones escritas**: el equipo no tiene reglas formales para decidir cuándo usar `"use client"`, dónde colocar datos o cómo nombrar archivos; la Fase 5 produce ese documento.
- **Decisiones bloqueantes**: 6 preguntas siguen abiertas (DB-1, DB-2, DB-3, DB-5, DB-6, DB-8); DB-7 resuelta.
- **Sin tests**: cualquier refactor se ejecuta sin red de seguridad automatizada; se recomienda añadir Vitest como prerequisito o al menos ejecutar `npm run build` + revisión visual entre commits.
- **Node version**: no hay `.nvmrc`; crear uno con `20` cuesta 30 segundos y evita inconsistencias.
- **Bundle analyzer**: añadir `@next/bundle-analyzer` como prerequisito de Fase 2 (no opcional) — sin baseline objetivo no se puede medir si Fase 2 + Fase 4 entregaron mejora real.
- **Nada de memoización defensiva**: el audit confirma que no hay hijos memoizados ni cálculos pesados en render; no se propone `React.memo`, `useMemo` ni `useCallback` adicionales.

---

## 1. Contexto y restricciones

**Stack fijo para este plan:**
- Next.js 14.x, App Router, `output: 'export'` (SSG puro → GitHub Pages).
- React 18, TypeScript 5.4 strict, Tailwind 3.4 + CSS BEM.
- 3 dependencias de producción: `next`, `react`, `react-dom`.
- 0 librerías de animación externas.
- 0 tests, 0 pre-commit hooks.

**Implicaciones de `output: 'export'`:**
- No hay runtime de servidor en producción; el `revalidate: 3600` en `api.ts` solo opera en build time.
- `next/dynamic` con `ssr: false` es seguro y recomendado para componentes client-only.
- La distinción Server/Client sigue importando para el tamaño del bundle JS enviado al navegador.
- Si el hosting migra a Vercel o VPS con runtime, ISR real se activa y el plan se amplía (ver §3, decisión 1).

**Lo que este plan NO hace:**
- No migra el framework, el bundler ni el hosting.
- No instala dependencias sin listarlas como decisión bloqueante.
- No propone memoización sin caso de uso medible.
- No toca `/destinations` salvo las dos excepciones explícitas del §2.

---

## 2. Zona intocable y excepciones

### 2.1 Archivos prohibidos de modificar

Todos los listados en `AUDIT_REPORT.md §9.1`:

**Pages:**
- `src/app/destinations/page.tsx`
- `src/app/destinations/[slug]/page.tsx`

**Componentes:**
- `src/components/destinations/DestinationPageClient.tsx`
- `src/components/destinations/DestinationHero.tsx`
- `src/components/destinations/WhyVisit.tsx`
- `src/components/destinations/Tours.tsx`
- `src/components/destinations/TourCard.tsx`
- `src/components/destinations/GalleryCta.tsx`
- `src/components/destinations/FAQ.tsx`
- `src/components/destinations/FinalCta.tsx`
- `src/components/destinations/DestinationCard.tsx`
- `src/components/destinations/DestinationMapAnimation.tsx`
- `src/components/destinations/DestinationMapAnimationMobile.tsx`
- `src/components/destinations/DestinationMapAnimationWrapper.tsx`

**Datos y estilos:**
- `src/data/destinations.ts`
- `src/data/ecuadorPaths.ts`
- `src/data/southAmericaPaths.ts`
- `src/styles/destinations.css`

### 2.2 Utilidades compartidas — política append-only

| Archivo | Política |
|---------|----------|
| `src/config/routes.ts` | Solo añadir nuevas claves. No renombrar ni eliminar `ROUTES.*` existentes. |
| `src/config/assets.ts` | Solo añadir. **Excepción permitida**: corregir case mismatch `Computer/` → `computer/` (ver §2.3). |
| `src/lib/types.ts` | Solo añadir. La interfaz `Destination` no se modifica; si necesitas variantes, usa `Omit`/`Pick`/`extend`. |

### 2.3 Excepciones explícitas

#### Excepción 1 — Corregir case mismatch en `assets.ts` ✅ PERMITIDA

**Justificación**: `src/config/assets.ts:39-41` usa `Computer/` (C mayúscula) pero el directorio real es `computer/`. En GitHub Pages (Linux) esto produce 404s reales. No altera el comportamiento de `/destinations` porque las imágenes afectadas son `LOBITOS`, `PIQUERO` y `PAISAJE` del hero — estas no las consume directamente `/destinations`.

**Cambio exacto** (3 líneas en `src/config/assets.ts`):
```diff
- LOBITOS: '/images/hero-main/Computer/lobitos.webp',
- PIQUERO: '/images/hero-main/Computer/piquero.webp',
- PAISAJE: '/images/hero-main/Computer/paisaje.webp',
+ LOBITOS: '/images/hero-main/computer/lobitos.webp',
+ PIQUERO: '/images/hero-main/computer/piquero.webp',
+ PAISAJE: '/images/hero-main/computer/paisaje.webp',
```

**Verificación**: `grep -r "ASSETS.HERO" src/ --include="*.tsx" --include="*.ts"` — confirmar que solo `src/data/destinations.ts` importa estas claves, no ningún archivo de `/destinations/`.

#### Excepción 2 — Reemplazar `#0d200c` literal en archivos de `/destinations` ⛔ BLOQUEADA

Esta excepción queda bloqueada hasta que el humano la apruebe explícitamente (ver §3, decisión 6). Los colores hardcodeados están en `DestinationHero.tsx` y `TourCard.tsx` de `/destinations`. No se tocan hasta resolución.

---

## 3. Decisiones bloqueantes para el humano

Resolver antes de ejecutar cualquier fase. El plan no asume ninguna respuesta.

---

### DB-1 — ¿Se mantiene `output: 'export'` (GitHub Pages) o se migra a runtime?

**Por qué es bloqueante**: Si se migra a Vercel/VPS, ISR funciona en runtime, `revalidate: 3600` cobra sentido real, y se abren opciones de SSR parcial. Las optimizaciones del plan son válidas en ambos casos pero las prioridades cambian.

**Opciones:**
- A) Mantener `output: 'export'` → ejecutar el plan tal cual.
- B) Migrar a Vercel/VPS en este ciclo → el plan se amplía con ISR y cache headers.
- C) Migrar en el futuro → ejecutar el plan para SSG ahora, preparar la migración como Fase 6 futura.

**Recomendación del arquitecto**: Opción A o C. Migrar hosting es un proyecto separado; no bloquea las optimizaciones de este plan.

---

### DB-2 — ¿El backend (`NEXT_PUBLIC_API_URL`) está operativo en producción?

**Por qué es bloqueante**: Afecta al §4.3 (datos y colocación) y a Fase 4. Si el backend no existe en producción, los datos viven permanentemente en `src/data/destinations.ts` y las reglas de colocación se simplifican. Si sí existe, los datos inline en componentes home son deuda acumulada. Adicionalmente, si el backend se activa mientras Fase 4 está en curso, `useHeroImages` tendrá que revisarse — resolver DB-2 **antes de iniciar Fase 4**. ✅ VERIFICADO IN SITU (urgencia subida)

**Opciones:**
- A) Backend no operativo ahora, pero sí en el futuro → mantener datos estáticos como fuente de verdad + añadir adaptadores para cuando llegue el backend.
- B) Backend operativo → las constantes inline en home (`TOURS`, `DESTINATIONS`) deben migrar a llamadas API.
- C) Backend no se implementará → los datos estáticos son permanentes; `src/lib/api.ts` puede simplificarse.

**Recomendación del arquitecto**: Independientemente de la respuesta, extraer `DIFF_COLORS` a `src/config/colors.ts` es beneficioso en todos los escenarios.

---

### DB-3 — ¿Es aceptable añadir Vitest + Testing Library como prerequisito del plan?

**Por qué es bloqueante**: Sin tests, cada refactor va a producción sin red de seguridad. El plan se puede ejecutar sin tests (usando `npm run build` + revisión visual como verificación), pero el riesgo aumenta en Fase 3 (refactor de mega-componentes).

**Opciones:**
- A) Añadir Vitest como prerequisito de Fase 3 → se instala antes de refactorizar Navbar.
- B) No añadir tests ahora → ejecutar el plan con verificación manual y commits pequeños.
- C) Añadir solo tests de smoke (build pass + no hydration errors) → posición intermedia.

**Recomendación del arquitecto**: Opción B para Fases 0-2 (sin riesgo), Opción A antes de Fase 3 (Navbar es el componente más crítico del layout).

---

### DB-4 — ¿Es aceptable añadir `@next/bundle-analyzer` como devDependency?

**Por qué es bloqueante**: Nueva dependencia de desarrollo. Es prerequisito de Fase 2: sin baseline objetivo no se puede medir si los dynamic imports del §4.4 realmente crean chunks separados ni cuánto peso ahorran. Con 5 minutos de instalación se gana visibilidad objetiva sobre el efecto de Fase 2 y Fase 4.

**Opciones:**
- A) Añadir → instalar + añadir script `"analyze": "ANALYZE=true npm run build"` en `package.json`. **Recomendado.**
- B) No añadir → verificar manualmente que `.next/static/chunks/` contiene los chunks esperados tras dynamic imports.

**Recomendación del arquitecto**: **Opción A**. Los dynamic imports de Fase 4 producen chunks separados cuyo tamaño solo es objetivamente verificable con esta herramienta. Instalar antes de Fase 2 para tener baseline. (Cambiado respecto a versión anterior — ver Changelog.)

---

### DB-5 — ¿Se renombra el directorio `movile/` → `mobile/` en este ciclo?

**Por qué es bloqueante**: Requiere mover el directorio de imágenes en `/public/images/hero-main/movile/` y actualizar `scripts/generate-hero-manifest.mjs`, `src/config/hero-images.ts` (generado) y `src/hooks/useHeroImages.ts`. Es un cambio coordinado de más de un archivo.

**Opciones:**
- A) Renombrar ahora → una sola operación coordinada + regenerar el manifiesto.
- B) Dejar para después → aceptar el typo como deuda técnica documentada.

**Recomendación del arquitecto**: Opción A si el humano confirma que no hay enlace externo ni CDN que apunte al path `movile/`. El cambio es pequeño pero requiere coordinación.

---

### DB-6 — ¿Reemplazar `#0d200c` literal por `var(--color-dark)` en archivos de `/destinations`?

**Por qué es bloqueante**: Toca archivos de la zona intocable (`DestinationHero.tsx`, `TourCard.tsx` de destinations). El riesgo de regresión visual es bajo (el valor es idéntico), pero cualquier toque a `/destinations` requiere aprobación explícita.

**Opciones:**
- A) Aprobar la excepción → cambio puntual en 2-3 líneas, verificación visual inmediata.
- B) Denegar → los colores quedan hardcodeados; no es un problema funcional.

**Recomendación del arquitecto**: Opción A si la excepción se aprueba, con verificación visual inmediata en la página `/destinations`. Si hay cualquier duda, Opción B — no es urgente.

---

### DB-7 — Nombre oficial de la marca: ¿"Islamontana Travel" o "Isla Montaña"? ✅ CERRADA

**Veredicto**: No se requiere ningún cambio. ✅ VERIFICADO IN SITU (líneas 4 y 6 de `src/app/destinations/page.tsx`, línea 20 de `src/app/layout.tsx`, línea 17 de `src/app/destinations/[slug]/page.tsx`) — todos los archivos activos usan "Islamontana Travel". El audit citaba `src/app/destinations/README.md` (archivo de documentación que describe la inconsistencia como deuda histórica ya resuelta), no el código activo. El nombre de marca en producción es **consistente**.

**Mejora opcional futura**: centralizar en `src/lib/constants.ts`:
```ts
export const BRAND_NAME = 'Islamontana Travel'
```

---

### DB-8 — ¿Las 9 imágenes faltantes del mega-menu se añadirán o se rediseña esa sección?

**Por qué es bloqueante**: `src/config/assets.ts` referencia 9 imágenes que no existen en disco (`ANDES_CULTURA`, `CRUCEROS`, `CIRCUITOS`, `DAY_TOURS`, `BIRDWATCHING`, y varias de galería). El código actual usa `{imageExists && ...}` como fallback. Mientras no se resuelva, el mega-menu muestra secciones sin imagen.

**Opciones:**
- A) Añadir las imágenes → el MegaMenu funciona como se espera.
- B) Rediseñar sin imágenes → eliminar las referencias de `assets.ts` y simplificar `MegaMenu.tsx`.
- C) Mantener el estado actual → aceptar el fallback como temporal.

**Recomendación del arquitecto**: Opción A o B. La Opción C acumula deuda visual.

---

## 4. Plan por subagente

### 4.1 Server/Client boundaries

#### A. Tabla antes/después por componente

| Archivo | Estado actual | Razón actual | Estado propuesto | Razón nueva | Riesgo | Verificación |
|---------|---------------|--------------|------------------|-------------|--------|--------------|
| `src/app/page.tsx` | `"use client"` (línea 6) | Hook `useHeroImages()` en función `Hero()` interna (línea 33) | **Server** tras extraer `<HomeHero/>` | La home no necesita estado propio | Medio | `npm run build` + navegar a `/`, comprobar hero anima |
| `src/components/layout/Navbar.tsx` | `"use client"` (línea 1) | 5× `useState`, 5× `useEffect`, scroll, resize, matchMedia, timers | **Mantener client** | Interacción compleja legítima | Bajo | Probar hover desktop + hamburger mobile |
| `src/components/layout/MegaMenu.tsx` | `"use client"` (línea 1) | 2× `useState`, `useEffect` matchMedia | **Mantener client** | Hover state + detección tablet | Bajo | Probar hover en desktop y tablet |
| `src/components/home/Stats.tsx` | `"use client"` (línea 1) | IntersectionObserver + RAF + `useState` | **Mantener client** | Animación de contadores legítima | Bajo | Verificar que contadores animan al entrar en viewport |
| `src/components/ui/ErrorPageClient.tsx` | `"use client"` (línea 1) | `useState` + matchMedia | **Mantener client** | Detección mobile en tiempo real | Bajo | Verificar padding en resize |
| `src/components/ui/MegaMenuImage.tsx` | `"use client"` (línea 1) | `useState` para fallback `onError` | **Refactor opcional**: separar Server wrapper + Client error handler | Reduce JS en el camino feliz | Medio | Simular error de imagen en DevTools; verificar fallback |

#### B. Diseño concreto: extracción de `<HomeHero/>`

**Archivo a crear**: `src/components/home/HomeHero.tsx`

**Qué se mueve** (desde `src/app/page.tsx`, función `Hero()`, líneas 33–98):
- Directiva `"use client"`
- Import de `useHeroImages`
- Todo el JSX de la sección `<header className="hero">` con la lógica de `images.map(...)` y `currentIndex`

**Qué queda en `page.tsx`** (pseudocódigo, ≤ 15 líneas):
```tsx
// src/app/page.tsx — Server Component (sin "use client")
import HomeHero from '@/components/home/HomeHero'
import Stats from '@/components/home/Stats'
import Destinations from '@/components/home/Destinations'
import WhyUs from '@/components/home/WhyUs'
import Tours from '@/components/home/Tours'
import Gallery from '@/components/home/Gallery'
import FinalCta from '@/components/home/FinalCta'

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Stats />
      <Destinations />
      <WhyUs />
      <Tours />
      <Gallery />
      <FinalCta />
    </>
  )
}
```

#### C. Server Components que emergen tras la extracción

| Componente | Estado antes | Estado después | Razón |
|------------|-------------|----------------|-------|
| `src/app/page.tsx` | Client (contaminado por `Hero()`) | **Server** | Ya no contiene hooks |
| `src/components/home/Destinations.tsx` | Ya era Server | Confirma Server | Sin hooks, ya correcto |
| `src/components/home/WhyUs.tsx` | Ya era Server | Confirma Server | Sin hooks, ya correcto |
| `src/components/home/Tours.tsx` | Ya era Server | Confirma Server | Sin hooks, ya correcto |
| `src/components/home/Gallery.tsx` | Ya era Server | Confirma Server | Sin hooks, ya correcto |
| `src/components/home/FinalCta.tsx` | Ya era Server | Confirma Server | Sin hooks, ya correcto |
| `src/components/home/Stats.tsx` | Client | **Mantiene Client** | IntersectionObserver + RAF legítimos |

#### D. Riesgo de la extracción

**Riesgo global: BAJO.**

Posibles puntos de ruptura y cómo detectarlos:

| Ruptura | Señal | Detección |
|---------|-------|-----------|
| Import incorrecto de `useHeroImages` en `HomeHero` | Error de runtime en consola | Abrir `/` en navegador, revisar consola |
| Hydration mismatch si algún hijo tenía estado implícito | Warning "Hydration mismatch" en consola | DevTools → Console después del build |
| Imports circulares | Error en `npm run build` | Siempre ejecutar build antes de subir |
| Hero muestra solo gradiente, sin imágenes | Hook retorna array vacío | Verificar que `hero-images.ts` existe y tiene rutas válidas |

---

### 4.2 Refactor de mega-componentes

#### A. Navbar.tsx — estado actual y descomposición propuesta

**Estado actual** (`src/components/layout/Navbar.tsx`, 297 líneas):

| Elemento | Líneas | Responsabilidad |
|----------|--------|-----------------|
| `scrolled` state | 16 | Apariencia del navbar según scroll |
| `mobileMenuOpen` state | 17 | Drawer mobile abierto/cerrado |
| `activeMenu` state | 18 | Label del menú activo (hover desktop / dropdown tablet) |
| `mobileExpanded` state | 19 | Submenú expandido en drawer mobile |
| `isTablet` state | 20 | Detección tablet (hover:none + 768–1023px) |
| `closeTimerRef` | 21 | Debounce de cierre de menú |
| `openMenu` / `closeMenu` callbacks | 23–40 | Control del megamenú con timer |
| `useEffect` tablet detection | 42–58 | matchMedia listeners |
| `useEffect` scroll | 60–64 | `window.scrollY > 30` |
| `useEffect` resize reset | 66–74 | Resetear menú mobile en resize |
| `useEffect` body overflow | 76–85 | Bloquear scroll al abrir drawer |
| `useEffect` click outside tablet | 88–93 | Cerrar dropdown al click fuera |
| `useEffect` cleanup | 95–99 | Limpiar timer al desmontar |

**Árbol de componentes propuesto:**
```
Navbar.tsx (Client — orquestador, ~80 líneas)
├── [desktop] NavbarLinks (Client — activeMenu, isTablet)
│   └── MegaMenu (Client, existente — refactorizado con isTablet como prop)
└── [mobile] MobileDrawer (Client — mobileMenuOpen, mobileExpanded)
    └── MobileDrawerLink (presentacional)
```

**Hooks a extraer** (nuevos archivos en `src/hooks/`):

| Hook | Firma | Líneas de origen |
|------|-------|-----------------|
| `useScrollState.ts` | `(): { isScrolled: boolean }` | 16, 60–64 |
| `useTabletDetection.ts` | `(): { isTablet: boolean }` | 20, 42–58 |
| `useMegaMenuController.ts` | `(): { activeMenu, openMenu, closeMenu, toggleTabletDropdown, closeTimerRef }` | 18, 21, 23–40, 88–93 |
| `useBodyOverflowLock.ts` | `(shouldLock: boolean): void` | 76–85 |
| `useMobileMenuState.ts` | `(): { mobileMenuOpen, mobileExpanded, toggleMobileMenu, closeMobileMenu, toggleMobileExpand }` | 17, 19, 111–116 |

**Segregación de props — mejora en MegaMenu:**

`MegaMenu.tsx` recalcula `isTablet` internamente (líneas 108–114) duplicando la detección de `Navbar.tsx` (línea 20). ✅ VERIFICADO IN SITU: confirmado en `src/components/layout/MegaMenu.tsx:106-114`. Solución: pasar `isTablet` como prop desde Navbar:

```tsx
// En Navbar.tsx (línea ~203), añadir isTablet:
<MegaMenu
  items={link.subItems}
  isOpen={activeMenu === link.label}
  parentLabel={link.label}
  isTablet={isTablet}          // ← añadir
  onMouseEnter={() => openMenu(link.label)}
  onMouseLeave={closeMenu}
/>
```

Esto elimina el `useEffect` duplicado en `MegaMenu.tsx:108-114`.

**Nota**: Sub-fase 3C es deliberadamente quirúrgica. MegaMenu tiene 148 líneas con lógica de animación de cards, hover state en `MenuCard`, y cálculos de `labelTransformRest`. Un refactor mayor de `MegaMenu.tsx` queda fuera del alcance de este plan y se evaluará tras Fase 3.

**Secuencia de commits (cada uno no-rompedor):**

1. `refactor: extract useScrollState hook`
2. `refactor: extract useTabletDetection hook`
3. `refactor: extract useMegaMenuController hook`
4. `refactor: extract useBodyOverflowLock hook`
5. `refactor: extract useMobileMenuState hook`
6. `refactor: use extracted hooks in Navbar.tsx` (Navbar queda como orquestador)
7. `refactor: pass isTablet as prop to MegaMenu, remove duplicate matchMedia effect`
8. `refactor: extract MobileDrawer sub-component`

#### B. ErrorPageClient.tsx — descomposición propuesta ✅ ÁRBOL REVISADO

**Estado actual** (`src/components/ui/ErrorPageClient.tsx`, 275 líneas):
- Línea 36: `useState<boolean | null>(null)` para `isMobile`
- Líneas 38–44: `useEffect` con matchMedia `(max-width: 767px)`
- El resto son ~230 líneas de JSX con estilos inline masivos

**Análisis de líneas útiles por sub-componente propuesto en versión anterior:**

| Sub-componente propuesto | Líneas útiles estimadas | ¿Justifica archivo propio? |
|--------------------------|------------------------|----------------------------|
| ErrorBg | ~8 | no |
| ErrorContent | ~6 (solo wrapper) | no |
| ErrorBadge | ~10 | no |
| ErrorHeadline | ~12 | no |
| ErrorSubtitle | ~8 | no |
| ErrorCTAs | ~35 | **sí** |
| ErrorQuickLinks | ~30 | **sí** |
| ErrorDecoration | ~10 | no |

✅ VERIFICADO IN SITU — 5 de los 8 sub-componentes propuestos violarían el umbral de 15 líneas útiles del §4.2.C.

**Árbol revisado (3 sub-componentes en vez de 8):**
```
ErrorPageClient (Client — solo isMobile state + BgIllustration + ErrorBg inline, ~60 líneas)
├── ErrorHeader (presentacional — fusión de Badge+Headline+Subtitle, ~30 líneas)
├── ErrorCTAs (Client — botón reset solo en 500, Link a home y destinations, ~35 líneas)
└── ErrorQuickLinks (presentacional — grid 4 links, solo en 404, ~30 líneas)
```

Notas:
- `BgIllustration` (SVG inline, 12 líneas): se mantiene como función interna — es correcto.
- `ErrorBg` (image + overlay, ~8 líneas): se mantiene inline en `ErrorPageClient`.
- `ErrorDecoration` (decoration bottom, ~10 líneas): se mantiene inline en `ErrorPageClient`.
- `ErrorContent` (wrapper div, ~6 líneas): no tiene sentido como componente propio.

**Archivo de estilos a crear**: `src/styles/error-page.css`  
Todas las propiedades `style={{...}}` estáticas migran a clases CSS BEM: `.error-page`, `.error-page__bg-image`, `.error-page__overlay`, `.error-page__content`, `.error-page__badge`, `.error-page__headline`, `.error-page__ctas`, `.error-page__quick-grid`, etc.

**Secuencia de commits (4 commits):**
1. `refactor: create src/styles/error-page.css, migrate static inline styles`
2. `refactor: extract ErrorHeader (Badge+Headline+Subtitle), ErrorCTAs`
3. `refactor: extract ErrorQuickLinks`
4. `refactor: simplify ErrorPageClient.tsx to ~60 lines`

#### C. Qué NO descomponer

- `NavbarLogo` — 10 líneas de `Link` + `Image`; sin lógica propia.
- `handleKeyDown` en Navbar — 9 líneas, único uso en el mismo componente.
- `MenuCard` dentro de MegaMenu — sub-función local correctamente acoplada.
- Cualquier componente que resulte en menos de 15 líneas útiles.

---

### 4.3 Datos y colocación

#### A. Tabla de decisión por constante

| Constante | Ubicación actual | Propuesta | Razón | Riesgo |
|-----------|-----------------|-----------|-------|--------|
| `STATS` | `src/components/home/Stats.tsx:16` inline | **Mantener inline** | 4 items, solo Stats los usa, métricas de empresa estables | Bajo |
| `TOURS` (home) | `src/components/home/Tours.tsx:6` inline | **Mover a `src/data/home-tours.ts`** | Puede crecer, candidato a venir del backend | Medio |
| `DESTINATIONS` (home) | `src/components/home/Destinations.tsx:11` inline | **Mover a `src/data/home-destinations.ts`** como constante **independiente** | Los datos son distintos de `src/data/destinations.ts` (ver nota abajo) | Alto |
| `DIFF_COLORS` | `src/components/home/TourCard.tsx:15` Y `src/components/destinations/TourCard.tsx:5` | **Mover a `src/config/colors.ts`** | Literalmente duplicado; cualquier cambio requiere editar 2 archivos | Alto |
| `TABS` (destinations Tours) | `src/components/destinations/Tours.tsx:7` inline | **Mantener inline** 🚫 zona intocable | Solo lo usa ese componente; es config de UI, no datos de dominio | N/A |

**Nota sobre `DESTINATIONS` (home)**: ✅ VERIFICADO IN SITU — `DestinationItem` (home) tiene campos `{slug, name, label, src, accent, desc}` mientras que `Destination` (destinations.ts) tiene `{slug, name, tagline, description, heroImage, accentColor, placeholderBg, mapRegion, stats[], whyVisit[], bestTime, photos[], tours{}}`. Son estructuras distintas para contextos de presentación distintos. **La derivación `HOME_DESTINATIONS = DESTINATIONS.slice(0,4).map(pick)` NO es segura** — los campos `label` (copy corto de categoría), `src` (imagen del mega-menu), y `desc` (copy de 1 línea) no tienen equivalente directo en `Destination`. La duplicación es de datos de presentación, no estructural, y mantener dos fuentes está justificado.

**Acción más urgente**: `DIFF_COLORS` — mover a `src/config/colors.ts` y actualizar los dos `TourCard`. Cambio de 10 minutos, riesgo bajo, elimina divergencia permanente.

#### B. Política dual TourCard / DestCard

**Diferencias reales entre las dos versiones de `TourCard`:**

| Aspecto | `home/TourCard.tsx` | `destinations/TourCard.tsx` 🚫 |
|---------|---------------------|--------------------------------|
| Tipo de entrada | `Tour` (interfaz local) | `TourItem` (desde `lib/types`) |
| Fuente del accent | `tour.accent` | Prop separada `accentColor` |
| Estilos | CSS classes (home.css) | Inline styles |
| CTA link | `ROUTES.TOUR(id)` | `ROUTES.TOUR_CONTACT(id)` |
| Badge | Siempre presente | Condicional |

**Veredicto**: Las diferencias son de presentación, no de dominio. Es duplicación accidental.

**Recomendación**: En una fase posterior (no urgente), crear `src/components/TourCard.tsx` compartido con un prop `layout?: 'home' | 'destinations'`. Hacer esto **solo si el humano aprueba tocar el TourCard de destinations** (es zona intocable). Si no, documentar explícitamente por qué existen dos versiones.

`DestCard` (home) vs `DestinationCard` (destinations): mismo análisis — diferente contexto visual. El home muestra un grid simple; destinations muestra con animación de fade-in. Son suficientemente distintos para justificar coexistencia temporal.

#### C. Tipos — análisis de colocación

| Tipo | Ubicación actual | Propuesta |
|------|-----------------|-----------|
| `NavItem`, `SubItem` | `src/lib/types.ts` | Mantener — usados en Navbar, MegaMenu, layout |
| `Destination`, `TourItem`, `FaqItem`, `WhyVisitItem`, `ToursByCategory` | `src/lib/types.ts` | Mantener — usados en 6+ archivos |
| `StatItem` (local) | `src/components/home/Stats.tsx:10` | **Unificar** con `src/lib/types.ts` si ya existe ahí; eliminar definición duplicada |
| `Tour` (local home) | `src/components/home/TourCard.tsx:3` | Evaluar si se puede reemplazar por `TourItem` de lib; en ese caso eliminar |
| `TourResponse`, `DestinationResponse` | `src/types/api.ts` | Mantener — son contratos HTTP para cuando el backend sea operativo |

#### D. Convención para datos futuros (5 reglas falsables)

1. **Array ≤ 6 items, estático, usado en un solo componente → inline.** Ejemplo legítimo: `STATS` en `Stats.tsx`.

2. **Array que cruzará componentes o crecerá con el backend → `src/data/[nombre].ts`.** Ejemplo: mover `TOURS` de home a `src/data/home-tours.ts`.

3. **Configuración de diseño (colores, tamaños, breakpoints) → `src/config/[nombre].ts`.** Nunca en un componente. Ejemplo: `DIFF_COLORS` va a `src/config/colors.ts`.

4. **Tipo usado en 2+ módulos → `src/lib/types.ts`.** Tipo usado en 1 módulo → en ese archivo. Ejecutar `grep -r "interface StatItem" src/` para detectar duplicados.

5. **Si hay un array home y un array de datos en `src/data/`, son fuentes independientes si sus formas de objeto son distintas.** No forzar derivación cuando los campos son diferentes. Verificar siempre la forma real antes de proponer `slice`/`pick`. ✅ VERIFICADO IN SITU: `DestinationItem` ≠ `Destination`.

---

### 4.4 Assets, preloading y bundle

#### A. Precarga condicional en useHeroImages

**Problema actual** (`src/hooks/useHeroImages.ts:45-54`): precarga todos los items del set activo en un `forEach` al montar. Para desktop: potencialmente 9 imágenes; para mobile: 3.

**Plan en 3 pasos:**

**Paso 1** (sin cambio — ya implementado): `checkIfMobile()` en línea 32-34 detecta el device al montar.

**Paso 2**: Precargar solo `images[0]` eagerly (reemplaza el `forEach` en líneas 45-54):
```tsx
// useHeroImages.ts — reemplazar el useEffect de precarga (líneas 45-54)
useEffect(() => {
  if (images.length === 0 || hasPreloadedRef.current) return
  const img = new window.Image()
  img.src = images[0]
  hasPreloadedRef.current = true
}, [images])
```

**Paso 3**: Diferir las restantes con `requestIdleCallback` (fallback: `setTimeout` 1000ms): ✅ CORREGIDO

El valor 1000ms (en vez de 2000ms de la versión anterior) deja 4 segundos de margen antes del primer cambio del carrusel a los 5s. Ajustar si el carrusel cambia su intervalo.

```tsx
useEffect(() => {
  if (images.length <= 1) return
  const preloadRest = () => {
    images.slice(1).forEach(src => {
      const img = new window.Image()
      img.src = src
    })
  }
  if ('requestIdleCallback' in window) {
    requestIdleCallback(preloadRest)
  } else {
    setTimeout(preloadRest, 1000)
  }
}, [images])
```

**Riesgo**: Bajo. En SSG puro las imágenes están en HTTP cache del navegador; la precarga diferida no produce parpadeo visible en el carrusel de 5 segundos.

#### B. Candidatos a dynamic import ✅ REVISADO

| Componente | GO / NO-GO | Razón | Patrón |
|------------|-----------|-------|--------|
| `MegaMenu` | **NO-GO** ✅ VERIFICADO IN SITU | Siempre montado en el DOM (visible/oculto por `opacity-0 pointer-events-none`, líneas 124-131 de `MegaMenu.tsx`). 148 líneas ≈ 3.7 KB. Dynamic import produciría primer hover sin respuesta hasta que el chunk cargue — coste de UX supera el ahorro de bundle. | — |
| `ErrorPageClient` | **GO** | Solo en rutas error; ~4.1 KB. | `const ErrorPageClient = dynamic(() => import('@/components/ui/ErrorPageClient'), { ssr: false })` |
| `Stats` | **GO con condición** ✅ VERIFICADO IN SITU | Below-fold; ~1.8 KB + hooks. **Condición**: añadir `min-height` a `.stats` en `home.css` en el mismo commit. Sin esa adición, el placeholder `<div className="stats" />` tiene altura 0 → CLS confirmado. `.stats` solo declara `padding: 72px var(--px)` sin `min-height` (línea 262-266 de `home.css`). | `const Stats = dynamic(() => import('@/components/home/Stats'), { loading: () => <div className="stats" />, ssr: false })` + añadir `min-height` a `.stats` |
| `HomeHero` | **NO-GO** | Above-fold; crítico para LCP. Dinamizar empeoraría LCP. | — |
| Componentes de `/destinations` | **NO-GO** | Zona intocable. | — |

**Implementación de ErrorPageClient** (en `src/app/error.tsx` y `src/app/not-found.tsx`):
```tsx
import dynamic from 'next/dynamic'
const ErrorPageClient = dynamic(
  () => import('@/components/ui/ErrorPageClient'),
  { ssr: false }
)
```

**Implementación de Stats** (en `src/app/page.tsx` tras Fase 2, cuando ya es Server Component):
```tsx
import dynamic from 'next/dynamic'
const Stats = dynamic(
  () => import('@/components/home/Stats'),
  { loading: () => <div className="stats" />, ssr: false }
)
```
Con `min-height` en `home.css` en el mismo commit:
```css
/* Añadir a .stats en home.css */
.stats {
  min-height: 220px; /* reservar espacio para evitar CLS — ajustar si el diseño cambia */
}
```

#### C. Fix case mismatch `Computer/` → `computer/`

Ver §2.3 Excepción 1. Cambio exacto: líneas 39-41 de `src/config/assets.ts`. Verificar con `grep -r "ASSETS.HERO" src/` antes de hacer el cambio.

#### D. @next/bundle-analyzer ✅ CAMBIADO A GO

**Decisión: GO** — instalar como prerequisito de Fase 2. Añadir script `"analyze": "ANALYZE=true npm run build"` en `package.json`. Tomar snapshot antes de Fase 2 y después de Fase 4 para medir el efecto de los dynamic imports. (Ver DB-4 en §3.)

#### E. Import hygiene

**Estado confirmado: CORRECTO.** No hay imports de módulos enteros cuando solo se usa parte. Tailwind tree-shaking está bien configurado en `tailwind.config.ts` (el campo `content` cubre todas las rutas de componentes).

---

### 4.5 Limpieza de deuda técnica

#### A. Eliminación de archivos .bak

**Archivos a eliminar** (verificados en filesystem):
- `src/app/destinations/page.tsx.bak`
- `src/components/destinations/DestinationMapAnimation.tsx.bak`
- `src/components/destinations/DestinationMapAnimation.tsx.bak2`
- `src/components/destinations/DestinationMapAnimation.tsx.bak3`
- `src/components/destinations/DestinationMapAnimation.tsx.bak4`
- `src/data/ecuadorPaths.ts.bak`
- `src/data/ecuadorPaths.ts.bak2`

**Plan**: Un único `git rm` de los 7 archivos + commit:
```
chore: remove backup files

Eliminación de 7 archivos .bak* que no se usan en producción.
```

**Actualizar `.gitignore`** (añadir al final de `frontend/.gitignore`):
```
# backup files
*.bak
*.bak[0-9]*
```

**Verificación**: `git status` limpio tras la operación. **Riesgo**: cero.

#### B. Mejoras al pipeline de CI

**Archivo**: `.github/workflows/deploy.yml`

**YAML a insertar** (después del paso `Install dependencies`, antes de `Generate hero manifest`):
```yaml
- name: Lint
  working-directory: frontend
  run: npm run lint

- name: Type check
  working-directory: frontend
  run: npx tsc --noEmit
```

**Prerequisito**: Ejecutar `npm run lint` y `npx tsc --noEmit` en local antes de mergear este cambio. Si alguno falla, corregir los errores primero (si los hay, son errores reales en el código).

**Riesgo**: Bajo. Ambos comandos son idempotentes y no modifican archivos.

#### C. Política de carpetas placeholder

| Carpeta | Estado | Recomendación |
|---------|--------|---------------|
| `src/components/tours/` | Solo README | **Mantener** — la ruta `/tours` existe en ROUTES; el placeholder facilita el desarrollo futuro |
| `src/components/ui/` | README + 2 componentes activos | **No está vacía** — mantener como está |
| `src/lib/` | README + 6 archivos funcionales | **No está vacía** — mantener como está |

#### D. Nombre de marca ✅ CERRADO (DB-7 resuelta)

**Estado actual**: consistente en código activo. `layout.tsx` (línea 20), `destinations/page.tsx` (línea 4) y `destinations/[slug]/page.tsx` (línea 17) usan "Islamontana Travel". ✅ VERIFICADO IN SITU. El `destinations/README.md` documentaba la inconsistencia como deuda histórica ya resuelta. **No se requiere cambio.**

**Mejora opcional futura**: centralizar en `src/lib/constants.ts`:
```ts
export const BRAND_NAME = 'Islamontana Travel'
```

#### E. Pinning de Node

**Crear `frontend/.nvmrc`** con contenido `20`. Cero riesgo; solo documentación.

#### F. Color `#0d200c` en archivos de `/destinations`

**BLOQUEADO** hasta aprobación de DB-6. Ver §2.3 Excepción 2.

Archivos afectados si se aprueba: `src/components/destinations/DestinationHero.tsx` y `src/components/destinations/TourCard.tsx`. Cambio: reemplazar `#0d200c` literal por `var(--color-dark)`.

---

### 4.6 Convenciones para código futuro

#### A. Árbol de decisión: `"use client"`

Un componente necesita `"use client"` si cumple **cualquiera** de estas condiciones:

1. Usa hooks de estado/efecto (`useState`, `useEffect`, `useRef`, `useReducer`, `useLayoutEffect`) → **Client**
   - *Ejemplo en este repo*: `src/components/home/Stats.tsx` (IntersectionObserver + RAF + `useState`)

2. Usa APIs de browser (`window`, `document`, `localStorage`, `matchMedia`, `IntersectionObserver`) → **Client**
   - *Ejemplo*: `src/hooks/useHeroImages.ts:33` — `window.innerWidth < MOBILE_BREAKPOINT`

3. Necesita event handlers interactivos propios que no pueden delegarse a un hijo más pequeño → **Client**
   - *Ejemplo*: `src/components/layout/Navbar.tsx:101-109` — `handleKeyDown` para accesibilidad de teclado

4. Importa una librería que solo corre en navegador → **Client**

5. **Ninguna de las anteriores → Server Component.** Sin directiva `"use client"`.
   - *Ejemplo*: `src/components/home/Tours.tsx` — solo renderiza datos estáticos, sin hooks ni APIs de browser.
   - *Ejemplo*: `src/app/layout.tsx` — `async` server function, llama API con `fetch`.

**Anti-patrón a evitar**: marcar un componente padre como `"use client"` cuando solo un sub-componente lo necesita. Extraer ese sub-componente a su propio archivo client.

#### B. Reglas de extracción a custom hook

**Extraer a hook si:**
- Combina 2+ hooks de forma no trivial (state + effect + ref).
- La lógica tiene ciclos de vida complejos (timers, listeners con cleanup).
- Se reutiliza en 2+ componentes.

*Ejemplo positivo*: `src/hooks/useHeroImages.ts` — combina `useState`, `useRef` (×3), `useEffect` (×3), `useCallback`. Justificado.

*Ejemplo positivo*: `useCountUp` dentro de `Stats.tsx` — combina `useState` + `useEffect` + RAF para animación de easing. Justificado aunque sea interno.

**No extraer si:**
- El hook sería solo `useState` + setter trivial (es ruido, no abstracción).
- La lógica cabe en 10 líneas y se usa en un solo componente.
- El nombre del hook sería más confuso que el código inline.

**Formato de nombre**: `use[Sustantivo][Acción?.ts]`
- ✅ `useHeroImages.ts`, `useScrollState.ts`, `useMegaMenuController.ts`
- ❌ `useEffect.ts`, `useData.ts`, `useHelper.ts`

#### C. Reglas de colocación de datos

1. **Constantes globales (rutas, paths de assets, breakpoints) → `src/config/`**. No en componentes.
2. **Datos de dominio que vienen del backend → `src/lib/api.ts` (fetch) + `src/lib/adapters.ts` (transform) + `src/lib/types.ts` (tipos)**.
3. **Arrays de contenido editorial que no vienen del backend y se usan en múltiples lugares → `src/data/`**.
4. **Estado de UI (drawer abierto, índice activo, scroll) → `useState` en componente o hook custom**. No en archivos de datos.
5. **Si un dato aparece en 2 archivos idéntico → duplicación. Crear una fuente única.** Detección: `grep -r "DIFF_COLORS\|const TOURS" src/components/`.

#### D. Política de dynamic imports

1. Usar `next/dynamic` para componentes > 100 líneas que no estén above-the-fold Y se carguen condicionalmente (hover, error, scroll).
2. **Excepción**: no dinamizar componentes que estén siempre montados en el DOM aunque estén visualmente ocultos (p.ej. MegaMenu con `opacity-0`) — el primer disparo del evento de apertura encontraría el componente sin cargar. ✅ VERIFICADO IN SITU
3. Siempre `ssr: false` para componentes que usan `window`/`document` directamente.
4. Si el placeholder del loading tiene altura cero, **añadir `min-height` al CSS en el mismo commit** para prevenir CLS. ✅ VERIFICADO IN SITU
5. No dinamizar componentes above-the-fold (Hero, Navbar) — empeora LCP.
6. Verificar que el chunk aparece en `.next/static/chunks/` tras el build.

#### E. Convenciones de estructura y nombres

- **Carpetas por dominio, no por tipo**: `home/`, `destinations/`, `layout/` — no `cards/`, `sections/`, `common/`.
- **Nueva carpeta**: cuando el dominio tiene 4+ componentes relacionados.
- **Componentes**: `PascalCase.tsx`
- **Hooks**: `camelCase` con prefijo `use`, extensión `.ts`
- **Utilidades**: `camelCase.ts` en `src/lib/`
- **Constantes de config**: `camelCase.ts` en `src/config/`
- **Umbral de tamaño**: componente > 150 líneas → reevaluar responsabilidades. > 200 líneas → casi seguro hay un sub-componente que extraer.

#### F. PR checklist (sin tests automatizados — 10 items)

- [ ] Todo nuevo `"use client"` tiene comentario de 1 línea explicando por qué (hooks, browser API, etc.)
- [ ] Nuevos componentes > 150 líneas tienen justificación en la PR description
- [ ] No se hardcodean rutas: usar `ROUTES.*` de `src/config/routes.ts`
- [ ] No se hardcodean paths de imágenes: usar `ASSETS.*` de `src/config/assets.ts`
- [ ] Accesos a `window`/`document` están dentro de `useEffect` o protegidos con `typeof window !== 'undefined'`
- [ ] Botones y elementos interactivos tienen `aria-label` o texto accesible
- [ ] Nuevos estilos estructurales → BEM en archivo `.css`. Utilidades → Tailwind inline. Nunca ambos en el mismo elemento
- [ ] `npm run build` pasa sin errores
- [ ] `npm run lint` pasa sin errores
- [ ] Revisión visual manual en desktop y mobile antes de marcar PR como lista

#### G. Convención CSS: BEM + Tailwind

- **Estilos estructurales** (layout, shape, comportamiento visual del bloque) → BEM en archivo `.css` correspondiente (`home.css`, `navbar.css`…)
- **Utilidades** (spacing, flex, alignment, color, text-size) → Tailwind inline en JSX
- **Nunca mezclar BEM y Tailwind en el mismo elemento** para la misma propiedad:
  - ✅ `className="navbar__logo"` (todo en CSS)
  - ✅ `className="flex items-center gap-4"` (todo Tailwind)
  - ❌ `className="navbar__logo flex items-center"` (mezcla)
- **Valores dinámicos** → `style={{}}` inline aceptable (ej: `opacity: idx === currentIndex ? 1 : 0`)
- **Animaciones reutilizables** → `@keyframes` en `src/styles/globals.css` con nombre descriptivo

---

## 5. Roadmap por fases

### 5.0 Compatibilidad con desarrollo en curso

**Fases que pueden ejecutarse en rama paralela sin congelar ningún trabajo en curso:**
- Fase 1 entera (limpieza de `.bak`, case mismatch, `.nvmrc`, CI) — no toca lógica de negocio.
- Mover `DIFF_COLORS` a `src/config/colors.ts` — cambio aislado, no toca páginas.

**Fases que requieren coordinación activa:**
- **Fase 2** toca `src/app/page.tsx` — si alguien está añadiendo secciones a la home en otra rama, hacer Fase 2 primero y mergear antes de que la otra rama comience. Conflictos de merge en `page.tsx` son fáciles de resolver pero hay que anticiparlos.
- **Fase 3** toca `Navbar.tsx` — incompatible con cambios simultáneos en navegación. Coordinar: nadie toca `Navbar.tsx` o `MegaMenu.tsx` mientras Fase 3 esté en curso.

**Fases que pueden esperar:**
- Fase 4 (dynamic imports, precarga) — sin urgencia funcional; ejecutar cuando las fases anteriores estén validadas en producción.
- Fase 5 (documentación de convenciones) — puede ejecutarse en cualquier momento; cero riesgo de conflicto.

**Orden recomendado si la página sigue en construcción activa:**
1. Fase 1 → mover `DIFF_COLORS` a `src/config/colors.ts` (puede ir en Fase 1 como commit 0)
2. Fase 2 (antes de añadir nuevas secciones a la home)
3. Continuar construyendo features
4. Fase 3 cuando haya una pausa de navegación (coordinar con el equipo)
5. Fase 4 al final, cuando la estructura de la home esté estabilizada
6. Fase 5 en cualquier momento

---

### Fase 0 — Prerequisitos (resolver antes de ejecutar cualquier otra fase)

**Objetivo**: Obtener respuestas a las decisiones bloqueantes y limpiar el repositorio sin riesgo de regresión.

**Cambios concretos:**

1. **El humano responde DB-1 a DB-8** (ver §3). Solo con DB-1, DB-2, DB-3 y DB-5 resueltos se puede proceder a Fase 1.
2. Ningún archivo de código del producto se toca en esta fase.

**Criterio de salida**: DB-1, DB-2, DB-3, DB-5 respondidas.  
**Riesgo**: Cero (no hay cambios de código).  
**Rollback**: N/A.

---

### Fase 1 — Limpieza (sin riesgo de regresión)

**Objetivo**: Eliminar deuda técnica inmediata sin tocar lógica de negocio.

**Cambios (en orden recomendado de commits):**

| # | Commit | Archivos | Riesgo |
|---|--------|----------|--------|
| 0 | `refactor: move DIFF_COLORS to src/config/colors.ts` | Crear `colors.ts`, actualizar `home/TourCard.tsx` | Bajo |
| 1 | `chore: add .nvmrc with node 20` | `frontend/.nvmrc` (crear) | Cero |
| 2 | `chore: remove backup files` | 7 archivos `.bak*` (eliminar) | Cero |
| 3 | `chore: add *.bak to .gitignore` | `frontend/.gitignore` | Cero |
| 4 | `fix: correct case mismatch in assets.ts (Computer→computer)` | `src/config/assets.ts:39-41` | Bajo |
| 5 | `ci: add lint and type-check steps before build` | `.github/workflows/deploy.yml` | Bajo¹ |

¹ Prerequisito: verificar que `npm run lint` y `npx tsc --noEmit` pasan en local antes de subir el step 5.

Nota: commit 0 (`DIFF_COLORS`) adelantado a Fase 1 por ser la acción más urgente y de bajo riesgo (ver §5.0).

**Validación manual**:
- Tras commit 4: hacer `npm run build`, verificar que las imágenes del hero se sirven sin 404 en producción.
- Tras commit 5: hacer push a rama de test, verificar que el pipeline CI pasa.

**Criterio de salida**: CI pasa con lint + type-check, no hay archivos `.bak*`, no hay 404 por case mismatch.  
**Rollback**: `git revert` de cada commit es seguro e inmediato.

---

### Fase 2 — Server First (extracción del Hero)

**Objetivo**: Convertir `src/app/page.tsx` en Server Component extrayendo `<HomeHero/>` como componente client aislado.

**Prerequisito nuevo**: Instalar `@next/bundle-analyzer` y tomar snapshot de bundle antes de esta fase (baseline).

**Dependencia**: Fase 1 completada.

**Cambios:**

| # | Commit | Archivos | Riesgo |
|---|--------|----------|--------|
| 0 | `chore: add @next/bundle-analyzer, add analyze script` | `package.json`, `next.config.js` | Bajo |
| 1 | `refactor: extract HomeHero client component` | Crear `src/components/home/HomeHero.tsx` | Medio |
| 2 | `refactor: convert page.tsx to Server Component` | `src/app/page.tsx` — eliminar `"use client"`, importar `HomeHero` | Medio |

**Validación manual**:
1. `npm run build` — sin errores.
2. `npm run dev` → navegar a `/` — hero carga con transición suave entre imágenes.
3. DevTools → Console — cero warnings de "Hydration mismatch".
4. Mobile: navbar hamburger funciona, Stats cuenta al entrar en viewport.
5. Desktop: MegaMenu aparece al hover.
6. `npm run analyze` — tomar snapshot de bundle como baseline.

**Criterio de salida**: build limpio, hero funcional, cero hydration warnings, snapshot de bundle tomado.  
**Riesgo**: Medio — si hay hydration mismatch, revertir al commit anterior y depurar.  
**Rollback**: `git revert` de los 2 commits restaura el estado anterior completamente.

---

### Fase 3 — Refactor de mega-componentes

**Objetivo**: Descomponer `Navbar.tsx` y `ErrorPageClient.tsx` aplicando extracción de lógica, composición y segregación de props.

**Dependencia**: Fase 2 completada. Recomendado: DB-3 resuelta favorablemente (añadir Vitest).

**Sub-fase 3A: hooks de Navbar** (8 commits, ver §4.2.A)  
**Sub-fase 3B: descomposición visual de ErrorPageClient** (4 commits, ver §4.2.B — árbol revisado)  
**Sub-fase 3C: pass `isTablet` como prop a MegaMenu** (1 commit — elimina useEffect duplicado en líneas 108-114 de `MegaMenu.tsx`)

Nota sobre 3C: es quirúrgica por diseño. El refactor mayor de `MegaMenu.tsx` (148 líneas con lógica de `MenuCard`, animaciones hover, `FALLBACK_COLORS`) queda fuera del alcance de este plan.

**Validación manual entre cada commit:**
- Probar navegación desktop (hover en links con submenús, cierre al salir).
- Probar navegación mobile (hamburger, drawer, submenús anidados).
- Probar error pages: navegar a una ruta inexistente (404), verificar layout correcto en mobile y desktop.

**Criterio de salida**: `Navbar.tsx` ≤ 100 líneas (resto en hooks/sub-componentes), `ErrorPageClient.tsx` ≤ 60 líneas, build limpio, interacción visual sin regresiones.  
**Riesgo**: Medio — Navbar es el componente más crítico del layout. Commits pequeños minimizan el riesgo.  
**Rollback**: Cada commit es revertible individualmente.

---

### Fase 4 — Datos, assets y bundle

**Objetivo**: Optimizar precarga de imágenes, añadir dynamic imports, mover constantes de datos.

**Dependencia**: Fase 1 completada (el case mismatch ya está corregido). Fase 2 recomendada (si `page.tsx` es Server, el dynamic import de `Stats` es más relevante). **DB-2 resuelta** (si el backend se activa, revisar `useHeroImages` antes de iniciar esta fase).

**Cambios:**

| # | Commit | Archivos | Riesgo |
|---|--------|----------|--------|
| 1 | `refactor: move HOME_TOURS to src/data/home-tours.ts` | Crear `home-tours.ts`, actualizar `home/Tours.tsx` | Bajo |
| 2 | `refactor: move HOME_DESTINATIONS to src/data/home-destinations.ts` | Crear `home-destinations.ts`, actualizar `home/Destinations.tsx` | Bajo |
| 3 | `perf: conditional image preloading in useHeroImages` | `src/hooks/useHeroImages.ts:45-54` | Bajo |
| 4 | `perf: dynamic import for ErrorPageClient` | `src/app/error.tsx`, `src/app/not-found.tsx` | Bajo |
| 5 | `perf: dynamic import for Stats + add min-height to .stats` | `src/app/page.tsx` (si ya es Server Component), `src/styles/home.css` | Bajo |
| 6 | `chore: run bundle analyzer, document baseline vs post-Fase4` | Solo snapshot — no toca código | Cero |

Nota: el commit 5 incluye **obligatoriamente** añadir `min-height` a `.stats` en `home.css` en el mismo commit para evitar CLS. ✅ VERIFICADO IN SITU

**Validación manual**:
- Tras commits 1-2: verificar que el grid de destinos y tours de la home se muestra completo.
- Tras commit 3: verificar que el hero carga imágenes correctamente; comprobar en DevTools Network que solo se precarga 1 imagen al inicio.
- Tras commits 4-5: verificar en `.next/static/chunks/` que existen chunks separados para ErrorPageClient y Stats.
- Tras commit 6: comparar snapshot de bundle con baseline de Fase 2.

**Criterio de salida**: build limpio, dynamic imports generan chunks separados, hero precarga correctamente, sin CLS en Stats.  
**Riesgo**: Bajo en todos los pasos.  
**Rollback**: cada commit revertible individualmente.

---

### Fase 5 — Convenciones documentadas

**Objetivo**: Escribir las reglas del §4.6 en un documento accesible para el equipo.

**Cambios:**

| # | Commit | Archivos | Riesgo |
|---|--------|----------|--------|
| 1 | `docs: add CONVENTIONS.md with team coding guidelines` | Crear `CONVENTIONS.md` en raíz | Cero |

**Contenido de `CONVENTIONS.md`**: árbol de decisión `"use client"`, reglas de extracción de hooks, política de colocación de datos, política de dynamic imports (incluyendo regla de no dinamizar componentes siempre montados), convenciones de nombres, PR checklist, convención CSS BEM+Tailwind.

**Criterio de salida**: documento existe, es legible y referencia archivos reales del repo como ejemplos.  
**Riesgo**: Cero.

---

## 6. Criterios de éxito y métricas

| Métrica | Antes | Objetivo tras Fase 2 | Objetivo tras Fase 3 | Objetivo tras Fase 4 |
|---------|-------|---------------------|---------------------|---------------------|
| Archivos con `"use client"` innecesario | 1 (`page.tsx`) | 0 | 0 | 0 |
| Líneas en `Navbar.tsx` | 297 | 297 | ≤ 100 | ≤ 100 |
| Líneas en `ErrorPageClient.tsx` | 275 | 275 | ≤ 60 | ≤ 60 |
| Fuentes de `DIFF_COLORS` | 2 (duplicado) | 1 (Fase 1) | 1 | 1 |
| Archivos `.bak*` en repo | 7 | 0 (Fase 1) | 0 | 0 |
| Pasos de CI (lint + tsc) | 0 | 2 (Fase 1) | 2 | 2 |
| Dynamic imports | 0 | 0 | 0 | 2 |
| Hydration warnings en consola | Desconocido | 0 | 0 | 0 |

Nota: "Dynamic imports" cambiado de 3 a 2 (MegaMenu descartado — NO-GO confirmado in situ). ✅ VERIFICADO IN SITU

**Métricas no incluidas** (sin baseline previo y sin herramientas de medición activas):
- Lighthouse scores (no hay reporte previo — tomar antes de Fase 2 como baseline artesanal).
- Bundle size en KB — disponible tras instalar `@next/bundle-analyzer` en Fase 2.
- LCP / CLS / FID (no hay Web Vitals tracking).

**Recomendación**: tomar capturas de Lighthouse en DevTools antes de Fase 2 y después de Fase 4 como baseline artesanal.

---

## 7. Plan de rollback por fase

| Fase | Estrategia de rollback | Tiempo estimado |
|------|----------------------|-----------------|
| Fase 0 | N/A (solo decisiones, no hay código) | — |
| Fase 1 | `git revert <commit>` por cada commit individualmente | < 5 min |
| Fase 2 | `git revert` de los 2 commits; `page.tsx` vuelve a `"use client"` | < 5 min |
| Fase 3 | Cada sub-commit es revertible; en el peor caso `git revert` de los últimos N commits | < 15 min |
| Fase 4 | Cada commit independiente y revertible | < 5 min por commit |
| Fase 5 | `git rm CONVENTIONS.md` | < 1 min |

**Regla de oro**: nunca hacer squash de los commits de estas fases hasta que la fase completa esté validada en producción. Los commits atómicos son el mecanismo de rollback.

---

## 8. Apéndice: comandos y checks útiles

### Verificación del estado actual
```bash
# Contar "use client" fuera de /destinations
grep -rl '"use client"' src/ | grep -v "src/.*destinations"

# Buscar duplicaciones de DIFF_COLORS o datos inline
grep -r "DIFF_COLORS\|const TOURS\|const DESTINATIONS\|const STATS" src/components/ --include="*.tsx"

# Confirmar que no hay archivos .bak en el repo
find src/ -name "*.bak*"

# Type check sin generar archivos
npx tsc --noEmit

# Lint
npm run lint

# Build local (siempre antes de un PR)
npm run build

# Bundle analysis (tras instalar @next/bundle-analyzer)
npm run analyze
```

### Verificación post-Fase 2
```bash
# Confirmar que page.tsx ya no tiene "use client"
grep -n "use client" src/app/page.tsx  # No debe encontrar nada

# Confirmar que HomeHero existe y tiene "use client"
grep -n "use client" src/components/home/HomeHero.tsx  # Debe encontrar la directiva
```

### Verificación post-Fase 4 (dynamic imports)
```bash
# Tras npm run build, verificar que existen chunks separados
ls .next/static/chunks/ | grep -E "(ErrorPage|Stats)"
```

### Verificación de importadores de ASSETS.HERO (antes de Fase 1, commit 4)
```bash
grep -r "ASSETS.HERO\|ASSETS\.COMPUTER\|ASSETS\.LOBITOS\|ASSETS\.PIQUERO\|ASSETS\.PAISAJE" src/ --include="*.tsx" --include="*.ts"
```

### Verificación de nombre de marca (para referencia)
```bash
# Confirmar consistencia — debe devolver solo "Islamontana Travel"
grep -rn "Islamontana\|Isla Montaña\|Isla Montana" src/app/ --include="*.tsx"
```

---

*Generado automáticamente el 2026-04-29. Revisado el 2026-04-29 (Prompt 3 — verificaciones in situ). Ningún archivo del producto fue modificado durante la elaboración de este plan.*
