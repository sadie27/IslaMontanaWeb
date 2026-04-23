# styles/

## Archivos

### `globals.css`

Único archivo de estilos del proyecto. Estructura interna:

| Sección | Contenido |
|---|---|
| Tokens | Variables CSS: colores (`--color-primary`, `--color-accent`, etc.), tipografía, layout |
| Reset | Box-sizing, márgenes, scroll behavior |
| NAVBAR | Sistema de clases `.navbar`, `.navbar--scrolled`, `.navbar--transparent`, `.navbar__*` |
| HERO | `.hero`, `.hero__*`, animación `scrollBounce` |
| BOTONES GLOBALES | `.btn`, `.btn--primary`, `.btn--ghost` |
| FOOTER | `.footer`, `.footer__*` |
| MEGA MENU ANIMATIONS | `@keyframes fade-up`, `.animate-fade-up` |
| RESPONSIVE | Media queries: `< 768px`, `< 640px`, `< 480px`, `< 374px`, `< 320px` |

## Tokens principales

```css
--color-primary:   #3aa023   /* verde marca */
--color-accent:    #abd430   /* lima */
--color-dark:      #0d200c   /* fondo oscuro */
--nav-height:      70px
--max-width:       1280px
--px:              clamp(20px, 4vw, 40px)
```

## Convención de estilos

Los componentes estructurales (Navbar, Hero, Footer) usan clases BEM definidas aquí. Los componentes nuevos (MegaMenu, futuros componentes de página) usan utilidades Tailwind directamente. No mezclar: no añadir Tailwind a selectores BEM existentes ni viceversa.

La fuente Outfit se carga via `next/font/google` en `app/layout.tsx` (no via `@import` en este archivo).

## Regla sobre colores

Nunca usar valores hexadecimales directamente en componentes. Siempre referenciar los tokens:
- `var(--color-dark)` en lugar de `#0d200c`
- `var(--color-primary)` en lugar de `#3aa023`
- `var(--color-accent)` en lugar de `#abd430`

**Bug actual:** `DestinationHero.tsx` (líneas 82-83) y `TourCard.tsx` (líneas 123, 129) usan `#0d200c` hardcodeado en inline event handlers. Reemplazar con `var(--color-dark)`.
