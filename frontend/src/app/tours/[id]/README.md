# app/tours/[id]/

Ruta dinámica `/tours/:id` — detalle de un tour específico.

## Estado

Pendiente de implementar. La carpeta existe como placeholder.

## Plan

- `page.tsx` — Server Component, fetch de `GET /api/tours/{id}`
- `generateStaticParams()` para pre-renderizar tours en build time
- Galería de imágenes, itinerario día a día, precio y botón de contacto/reserva
