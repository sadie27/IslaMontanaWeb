# components/tours/

Componentes específicos del dominio de tours.

## Estado

Pendiente de poblar. La carpeta existe como placeholder.

**Nota:** `TourCard` vive en `src/components/home/TourCard.tsx` y es el único que se usa en toda la web (landing, `/experiences` y las páginas de destino). Cuando se implemente `/tours`, reutilízalo — no crees una card nueva.

## Plan

Componentes a crear cuando se implementen las rutas de tours:
- `TourCard` — card para listado: imagen, nombre, duración, precio, botón (ya existe en `destinations/`)
- `TourGallery` — galería de imágenes con lightbox
- `TourItinerary` — itinerario día a día
- `TourFilters` — filtros de búsqueda (destino, duración, precio)

## Convención

- Conocen la estructura del tipo `Tour` que devuelva el backend
- Reciben datos via props — no fetchean directamente
- Reutilizan componentes de `ui/` para elementos base (botones, inputs)
- No hardcodear colores: usar variables CSS de `globals.css`
