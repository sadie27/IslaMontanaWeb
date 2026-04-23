# Frontend — Islamontana Travel

Aplicación Next.js 14 con App Router. Escaparate web para la agencia de viajes Islamontana: muestra destinos, cruceros y rutas en Ecuador (Galápagos, Amazonía, Andes, Costa).

## Stack

| Tecnología | Versión | Uso |
|---|---|---|
| Next.js | 14.2 | Framework, App Router, Image optimization |
| React | 18.3 | UI |
| TypeScript | 5.4 | Tipado estático |
| Tailwind CSS | 3.4 | Utilidades en componentes |
| CSS global | — | Sistema de clases BEM (`navbar__*`, `hero__*`, `btn--*`) |
| Outfit (Google Fonts) | — | Tipografía única del proyecto |

Sin librerías de animación (no framer-motion). Sin librerías de componentes externas.

## Comandos

```bash
npm run dev             # servidor de desarrollo en localhost:3000
npm run build           # build de producción
npm run start           # servidor de producción
npm run lint            # ESLint
npm run generate:hero   # regenera src/config/hero-images.ts desde public/images/hero-main/
```

## Estructura

```
src/
├── app/                        # App Router — rutas y layout raíz
│   ├── layout.tsx              # RootLayout async (Server Component): fetch nav data, monta Navbar + Footer
│   ├── page.tsx                # Página principal (Hero)
│   ├── contact/                # Ruta /contact — pendiente de implementar
│   ├── destinations/           # Ruta /destinations — IMPLEMENTADA
│   │   ├── page.tsx            # Listado de los 4 destinos
│   │   ├── galapagos/page.tsx
│   │   ├── amazonia/page.tsx
│   │   ├── andes-cultura/page.tsx
│   │   └── andes-naturaleza/page.tsx
│   └── tours/
│       └── [id]/               # Ruta dinámica /tours/:id — pendiente de implementar
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Navbar fija con mega-menu, scroll state, mobile drawer
│   │   ├── MegaMenu.tsx        # Panel de mega-menu con cards animadas (GPU-only transitions)
│   │   └── Footer.tsx          # Footer de marca
│   ├── destinations/           # Componentes de destinos: DestinationCard, Hero, Highlights, TourCard
│   ├── ui/                     # Componentes genéricos reutilizables (pendiente de poblar)
│   └── tours/                  # Componentes de dominio de tours (pendiente de poblar)
├── config/
│   └── hero-images.ts          # Manifiesto de imágenes del hero (auto-generado)
├── data/
│   └── destinations.ts         # Datos estáticos de los 4 destinos
├── hooks/
│   └── useHeroImages.ts        # Hook para rotación de imágenes del hero
├── lib/
│   └── types.ts                # Tipos compartidos: NavItem, SubItem
└── styles/
    └── globals.css             # Tokens CSS, reset, sistema BEM completo
```

## Patrones clave

**Server → Client para datos del nav**
`layout.tsx` es async Server Component. Llama a `getNavMenuData()` y pasa los datos como prop a `<Navbar navData={navData} />`. El cliente nunca fetchea datos de navegación. Cuando el backend FastAPI esté listo, solo hay que descomentar el bloque `fetch` en `getNavMenuData()` — Navbar y MegaMenu no cambian.

**Clases CSS BEM + Tailwind**
Los componentes estructurales (Navbar, Footer, Hero) usan clases BEM definidas en `globals.css`. Los componentes nuevos (MegaMenu, destinations) usan utilidades Tailwind directamente. No mezclar: no añadir Tailwind a las clases BEM existentes.

**`'use client'` mínimo**
Solo Navbar y MegaMenu son Client Components (necesitan estado de hover/scroll). El resto del layout es Server Component por defecto.

## Imágenes del mega-menu

Las imágenes de destinos están en `public/images/mega-menu/`:

| Archivo | Estado |
|---|---|
| `galapagos.webp` | Presente |
| `amazonia.webp` | Presente |
| `andes-naturaleza.webp` | Presente |
| `costa.webp` | Presente (no referenciada en el nav actualmente) |
| `andes-cultura.webp` | **FALTA** |
| `cruceros.webp` | **FALTA** |
| `circuitos.webp` | **FALTA** |
| `day-tours.webp` | **FALTA** |
| `birdwatching.webp` | **FALTA** |
| `gallery-fauna.webp` | **FALTA** |
| `gallery-paisajes.webp` | **FALTA** |
| `gallery-cultura.webp` | **FALTA** |
| `gallery-aventura.webp` | **FALTA** |

Las imágenes faltantes muestran un placeholder verde automáticamente vía el handler `onError` de `next/image`.

## Imágenes del hero

Las imágenes del hero están en `public/images/hero-main/`:

```
public/images/hero-main/
├── computer/       # Imágenes landscape (desktop)
│   ├── lobitos.webp
│   ├── paisaje.webp
│   └── piquero.webp
└── movile/         # TYPO: debería ser "mobile/" — corregir directorio y hero-images.ts
    ├── lobito.webp
    └── piqueros.webp
```

**Pendiente:** Renombrar `movile/` a `mobile/` y actualizar `src/config/hero-images.ts` + `scripts/generate-hero-manifest.mjs`.

## Variables de entorno

```env
NEXT_PUBLIC_API_URL=http://localhost:8000   # URL del backend FastAPI
```

Solo necesaria cuando se active el fetch real en `getNavMenuData()`.

## Bugs conocidos y deuda técnica

### Críticos
1. **9 imágenes faltantes** en `public/images/mega-menu/` — secciones "Experiencias" y "Galería" del nav muestran placeholder
2. **Páginas 404** — `/contact`, `/tours`, `/about`, `/gallery`, `/experiences/*` están referenciadas en el nav pero no implementadas
3. **Typo de directorio** — `public/images/hero-main/movile/` debería ser `mobile/`

### Accesibilidad
4. **Alt text vacío** — 3 `imageAlt: ''` en `src/app/destinations/page.tsx` (líneas 20, 33, 46)

### Consistencia
5. **Nombre de marca** — `layout.tsx` usa "Islamontana Travel" y `destinations/page.tsx` usa "Isla Montaña" en los metadatos

### Calidad de código
6. **Colores hardcodeados** — `#0d200c` en `DestinationHero.tsx` y `TourCard.tsx` debería usar `var(--color-dark)`
7. **`unoptimized` en MegaMenu** — deshabilita la optimización de Next.js Image; eliminar una vez que las imágenes estén presentes
