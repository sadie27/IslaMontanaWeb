# app/destinations/

Ruta `/destinations` — página de destinos.

## Estado

**IMPLEMENTADA.** Incluye la página de listado y las 4 páginas de destino individuales.

| Archivo | Estado |
|---|---|
| `page.tsx` | Implementada — listado de los 4 destinos con cards |
| `galapagos/page.tsx` | Implementada |
| `amazonia/page.tsx` | Implementada |
| `andes-cultura/page.tsx` | Implementada |
| `andes-naturaleza/page.tsx` | Implementada |

## Bugs en page.tsx (listado)

**Alt text vacío** — Las cards de amazonia, andes-cultura y andes-naturaleza tienen `imageAlt: ''`.
Líneas 20, 33 y 46 de `page.tsx`. Corregir para cumplir WCAG:

```ts
// Amazonia
imageAlt: 'Canoas navegando el río Napo en la Amazonía ecuatoriana',

// Andes Cultura
imageAlt: 'Textiles indígenas y mercado tradicional de los Andes',

// Andes Naturaleza
imageAlt: 'Volcán Cotopaxi y páramos nevados de Ecuador',
```

**Metadatos inconsistentes** — El título usa "Isla Montaña" en lugar de "Islamontana Travel":
```ts
// Actual (incorrecto):
title: 'Destinos — Isla Montaña'

// Correcto:
title: 'Destinos — Islamontana Travel'
```

## Imágenes usadas

Las cards del listado usan imágenes de `public/images/mega-menu/`:
- `galapagos.webp` — presente
- `amazonia.webp` — presente
- `andes-cultura.webp` — **FALTA** (mostrará placeholder)
- `andes-naturaleza.webp` — presente
