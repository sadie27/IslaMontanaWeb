# app/contact/

Ruta `/contact` — formulario de contacto.

## Estado

**PENDIENTE — PRIORIDAD CRÍTICA.** La carpeta existe como placeholder.

Esta ruta está referenciada en:
- El botón "Reservar" de la Navbar (`layout.tsx` línea 136)
- Los CTAs de todos los destinos implementados (galapagos, amazonia, andes-cultura, andes-naturaleza)
- El componente `TourCard` (línea 116)
- El Footer

Mientras no exista `page.tsx`, todos estos enlaces generan un 404.

## Plan

- `page.tsx` con un Client Component para el formulario (`'use client'`)
- Validación client-side sin librerías externas (o react-hook-form si se añade)
- Envío vía `POST /api/contact` al backend FastAPI
- Mensaje de confirmación tras envío exitoso

## Campos del formulario (mínimo)

- Nombre
- Email
- Teléfono (opcional)
- Destino de interés (selector)
- Mensaje / consulta
