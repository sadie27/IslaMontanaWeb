# components/tours/

Componentes específicos del dominio de tours.

## Estado

Pendiente de poblar. La carpeta existe como placeholder.

**Nota:** `TourCard` ya existe en `src/components/destinations/TourCard.tsx` y se usa en las páginas de destino individuales. Cuando se implemente `/tours`, evaluar si moverlo aquí o mantenerlo en `destinations/`.

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
