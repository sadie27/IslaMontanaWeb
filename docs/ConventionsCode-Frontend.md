# ConventionsCode-Frontend.md — Convenciones de código (Frontend)

> Cómo se **escribe** el código del frontend: naming, componentes, hooks,
> estado, imports, fetching y tipos. Lo visual (CSS/Tailwind) está en
> `ConventionsStyle-Frontend.md`. El manejo de fallos está en la sección
> "Manejo de errores (Frontend)" de `DecisionesPendientes.md`. Estas reglas
> reflejan el patrón ya consolidado en el repo: respétalas para mantener la
> coherencia.

---

## Naming

- **Componentes:** `PascalCase`, un componente por fichero, nombre de fichero =
  nombre del componente (`DestinationCard.tsx`, `HomeHero.tsx`, `MegaMenu.tsx`).
- **Hooks:** `camelCase` con prefijo `use` (`useScrollState`,
  `useMegaMenuController`), en `src/hooks/`.
- **Config / lib / data:** `camelCase.ts` (`routes.ts`, `assets.ts`,
  `image-loader.ts`).

## Exports (consistente, no lo cambies)

- **Componentes:** `export default function NombreComponente() { … }`.
- **Hooks:** named export → `export function useNombre() { … }`.
- **Constantes de config:** named export → `export const ROUTES = …`.

## Server vs Client Components

- Server Components por defecto (sin directiva): root layout y páginas estáticas.
- `'use client'` **explícito** en cualquier componente que use hooks de React o
  interacción del usuario.
- Componentes pesados o solo-cliente se cargan con `dynamic(() => …, { ssr:
  false })` (p. ej. `Stats`, `ErrorPageClient`).

## Estado

No hay librería de estado global (ni Zustand, ni Redux, ni Context). El patrón es:

- Estado local con `useState`.
- Lógica de UID encapsulada en **hooks propios** que devuelven un objeto con
  nombre (`{ valor, setter, handlers }`). Ej.: `useMegaMenuController()` →
  `{ activeMenu, openMenu, closeMenu, toggleTabletDropdown, handleKeyDown }`.

Si una tarea pareciera necesitar estado global, **no introduzcas una librería
sin proponerlo antes**: es una decisión de arquitectura, no de implementación.

## Imports

- Usa el alias `@/` para todo lo que venga de `src/` (`@/components/…`,
  `@/lib/…`, `@/config/…`).
- **Sin barrels** (`index.ts`): imports directos al fichero.
- Orden: imports de Next → de React → componentes locales → hooks →
  config/lib → types.

## Data fetching

- `fetch` nativo, **centralizado en `src/lib/api.ts`**. No se usa axios ni React
  Query.
- Las llamadas llevan `next: { revalidate: 3600 }`.
- El manejo de errores de estas llamadas se rige por la sección "Manejo de
  errores (Frontend)" de `DecisionesPendientes.md` (no lo dupliques aquí).

## Tipos y adaptadores (regla importante)

Dos capas, separadas a propósito:

- `src/types/api.ts` → contratos exactos del backend, en `snake_case`.
- `src/lib/types.ts` → tipos internos del frontend, en `camelCase`.
- `src/lib/adapters.ts` → convierte de una capa a la otra.

**Los componentes consumen siempre los tipos internos (`lib/types.ts`), nunca
los del backend directamente.** Toda conversión pasa por un adaptador.

> ⚠️ Deuda técnica conocida: en `src/lib/adapters.ts`, `mapRegion` devuelve
> siempre `'galapagos'` ignorando el destino. Es un placeholder/bug: si tocas
> esa zona, corrígelo para mapear la región real; no lo tomes como patrón.

## Dynamic imports

`dynamic(() => import('…'))` se usa para diferir la carga de un componente.
Úsalo solo cuando aplique:

- Componente que **nunca está en el viewport inicial** (below-the-fold) y es
  costoso de parsear.
- Componente que usa `window`/`document` directamente → añadir `{ ssr: false }`.
- Componente pesado que se monta solo bajo interacción (drawer, modal).

**NO uses dynamic import cuando:**
- El componente es above-the-fold (retrasa el primer render significativo).
- El componente siempre está montado pero solo está oculto con CSS.
- La ganancia de bundle sea inapreciable (<5 KB).

**Al usar `ssr: false`:** si el placeholder tiene altura cero, añade un
`min-height` al wrapper en el mismo commit para evitar layout shift (CLS).

Ejemplos reales en el repo: `ErrorPageClient` (cargado con `ssr: false` desde
`error.tsx` y `not-found.tsx`).

## Composición sobre configuración

Prefiere componer componentes sobre parametrizarlos en exceso. Umbral práctico:
**si un sub-bloque supera ~15 líneas útiles** de JSX con semántica propia,
extráelo como sub-componente (en el mismo fichero si es solo-uso, o en un
fichero propio si se reutiliza).

Evita el anti-patrón de una `prop` que controla radicalmente el layout o la
semántica de un componente (`variant="a" | "b"` que duplica el árbol de render).
Eso es configuración disfrazada de composición: usa componentes separados.

## Extracción a hooks

Extrae a un hook cuando:
- La lógica usa 2+ efectos o manejadores de evento que comparten estado.
- La misma lógica se necesita en más de un componente.
- El componente supera ~150 líneas y la causa es lógica mezclada con render.

No extraigas cuando sea un efecto aislado de 5 líneas que no se reutiliza.

**Naming:** `use[Sustantivo][Acción opcional]`. Ejemplos del repo:
`useMegaMenuController`, `useScrollState`, `useTabletDetection`.

**Valor de retorno:** si el hook devuelve 3 o más valores, usa un **objeto con
nombres** en lugar de un array. Esto previene errores de posición y mejora la
legibilidad en el consumidor.

```ts
// ✅ Objeto nombrado (≥3 valores)
return { activeMenu, openMenu, closeMenu, toggleTabletDropdown, handleKeyDown }

// ✅ Array (≤2 valores, análogo a useState)
return [value, setValue] as const
```

## Segregación de props

Cada componente recibe **solo las props que necesita**. No pases objetos enteros
por comodidad si el componente usa dos campos:

```tsx
// ✗ — el componente no necesita el objeto Destination completo
<TourCard destination={destination} />

// ✅ — solo lo que usa
<TourCard name={destination.name} tours={destination.tours.dia} />
```

Excepción documentada: **tarjetas presentacionales** (ej. `DestinationCard`,
`TourCard`) que renderizan casi todos los campos de una entidad pueden recibir
el tipo completo si es más limpio que enumerar 8+ props.

## Colocación de datos (dónde vive cada dato)

Cinco reglas de ubicación, en orden de preferencia:

1. **Inline** en el componente: datos que solo usa ese componente y tienen ≤6
   entradas. Ej: `STATS` en `Stats.tsx`.
2. **`src/data/`**: datos estáticos que varios componentes comparten o que
   tienen >6 entradas. `destinations.ts` es el fallback offline. **No hagas
   crecer `src/data/` cuando el backend esté operativo**: su rol es fallback,
   no fuente primaria.
3. **`src/config/`**: constantes de configuración que gobiernan comportamiento
   (`routes.ts`, `assets.ts`). No son datos de dominio; son contratos internos.
4. **`src/lib/types.ts`**: tipos del dominio compartidos por todo el frontend.
   Solo añadir (append-only); nunca modificar interfaces existentes.
5. **`src/lib/api.ts` + `src/lib/adapters.ts`**: datos que vienen del backend.
   Los adaptadores convierten de `snake_case` (`types/api.ts`) a `camelCase`
   (`lib/types.ts`).

Regla transversal: **fuentes independientes no se derivan entre sí**. Si
`destinations.ts` y la API devuelven el mismo dato, el componente elige una
fuente con fallback a la otra; no fusiones ni sincronices las dos fuentes.
