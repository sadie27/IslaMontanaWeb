# components/

Componentes React organizados por responsabilidad.

## Estructura actual

```
components/
├── layout/         # Navbar, MegaMenu, Footer — presentes en todas las páginas
├── destinations/   # DestinationCard, DestinationHero, Highlights, TourCard — IMPLEMENTADOS
├── ui/             # Componentes genéricos sin lógica de negocio (pendiente)
└── tours/          # Componentes de dominio de tours (pendiente)
```

## Reglas

- `layout/` — reciben datos via props desde Server Components. No fetchean directamente.
- `destinations/` — conocen la estructura de datos de destinos. Reciben datos via props.
- `ui/` — sin imports de `lib/` ni llamadas a API. Solo props + estilos.
- `tours/` — conocen la estructura de datos `Tour` del backend. Pueden recibir datos via props o hooks.
- `'use client'` solo cuando el componente necesita estado, eventos del DOM, o efectos. Hoy solo Navbar y MegaMenu lo requieren.
- Tipos de props en `src/lib/types.ts`, no redefinir inline en cada componente.

## Bugs conocidos en componentes existentes

### `destinations/DestinationHero.tsx`
- Líneas 82-83: color `#0d200c` hardcodeado en inline event handlers. Reemplazar con `var(--color-dark)`.

### `destinations/TourCard.tsx`
- Líneas 123 y 129: color `#0d200c` hardcodeado. Reemplazar con `var(--color-dark)`.

### `layout/MegaMenu.tsx`
- `unoptimized={true}` en el componente `<Image>` deshabilita la optimización de Next.js. Eliminar una vez que todas las imágenes del mega-menu estén presentes.
