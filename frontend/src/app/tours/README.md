# app/tours/

Ruta `/tours` — listado de tours disponibles.

## Estado

**PENDIENTE — PRIORIDAD CRÍTICA.** La carpeta existe como placeholder.

El CTA "Nuestros tours" en el Hero de la página principal (`page.tsx` línea 70) apunta a `/tours`. Mientras no exista `page.tsx`, ese botón genera un 404.

## Plan

- `page.tsx` — Server Component, fetch de `GET /api/tours`, grid de `TourCard`
- Paginación o infinite scroll si el catálogo crece
- Filtros por destino, duración, precio (client-side o via query params)

## Dependencias

- Componente `TourCard` en `src/components/destinations/TourCard.tsx` — ya existe, usado en las páginas de destino individuales
- Tipos del tour en `src/lib/types.ts` — verificar que el tipo `Tour` esté definido o añadirlo
