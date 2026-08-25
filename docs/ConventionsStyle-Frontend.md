# ConventionsStyle-Frontend.md — Convenciones de estilo (Frontend)

> Cómo se **ve** el frontend: enfoque de estilos, design tokens, tipografía y
> responsive. La lógica de los componentes está en `ConventionsCode-Frontend.md`.

---

## Enfoque de estilos (mixto, deliberado)

Conviven dos mecanismos. Elige según el caso:

- **Tailwind (utility classes en el JSX)** para layout y estilos puntuales de
  componente (`className="overflow-hidden rounded-2xl relative"`).
- **CSS modular en `src/styles/`** para secciones completas o componentes
  complejos, con nomenclatura **BEM** (`hero`, `hero__bg-image`,
  `hero__content`). Un fichero por sección: `home.css`, `navbar.css`,
  `footer.css`, `destinations.css`, `error-page.css`.

Regla práctica: si es un ajuste local y simple → Tailwind inline. Si es el
estilo estructural de una sección → CSS modular BEM en `src/styles/`.

## Design tokens (fuente única de verdad)

Los tokens viven como variables CSS en `:root` dentro de `globals.css`. **Esta es
la paleta y las medidas oficiales del proyecto.** Úsalas siempre (en CSS y en
`style={{}}` inline vía `var(--token)`), nunca colores hardcodeados.

```css
--color-primary:  #3aa023;   /* verde principal */
--color-accent:   #abd430;
--color-dark:     #0d200c;
--color-dark-mid: #1a3a18;
--color-gray:     #6b7560;
--color-light-bg: #f4f8f2;
--color-white:    #ffffff;
--font-base: "Outfit", system-ui, sans-serif;
--nav-height: 70px;
--max-width:  1280px;
--px: clamp(20px, 4vw, 40px);   /* padding horizontal responsivo */
```

> ⚠️ Deuda técnica conocida — **importante**: `tailwind.config.ts` define una
> escala `primary` de **azules** (50–900) que **no coincide** con los tokens CSS
> reales (verdes). Es una divergencia sin resolver. **La fuente de verdad son los
> tokens CSS de `:root`** (verdes). No uses la paleta azul de Tailwind como si
> fuera la marca; si necesitas tonos de marca en Tailwind, alinéalos con los
> tokens CSS o usa directamente `var(--color-*)`. Si tocas el tema, propón
> unificar ambas fuentes.

## Tipografía

- Fuente única: **Outfit** (Google Fonts), pesos 300–900.
- Cargada con `next/font/google`, expuesta como `var(--font-outfit)` /
  `--font-base`.

## Responsive / breakpoints

Breakpoints en ficheros separados dentro de `src/styles/breakpoints/`:

- **Mobile:** `mobile.css` → `max-width: 767px` (con sub-breakpoints 479/480/320).
- **Tablet:** `tablet.css` (rango ~768–1024px; el valor exacto lo decide
  `useTabletDetection` — confírmalo en el hook si necesitas el número preciso).
- **Desktop:** `desktop.css`.

## Librería de UI

Ninguna externa (sin shadcn, MUI, Radix, Chakra). El diseño es **100% propio**.
No introduzcas una librería de componentes sin proponerlo antes.
