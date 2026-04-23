# app/

Directorio raíz del App Router de Next.js. Cada carpeta es una ruta.

## Estado de rutas

| Ruta | Archivo | Estado |
|---|---|---|
| `/` | `page.tsx` | Implementada (Hero + CTAs) |
| `/destinations` | `destinations/page.tsx` | Implementada (listado de 4 destinos) |
| `/destinations/galapagos` | `destinations/galapagos/page.tsx` | Implementada |
| `/destinations/amazonia` | `destinations/amazonia/page.tsx` | Implementada |
| `/destinations/andes-cultura` | `destinations/andes-cultura/page.tsx` | Implementada |
| `/destinations/andes-naturaleza` | `destinations/andes-naturaleza/page.tsx` | Implementada |
| `/contact` | `contact/` | **PENDIENTE** — todos los CTAs de reserva apuntan aquí; genera 404 |
| `/tours` | `tours/` | **PENDIENTE** — CTA "Nuestros tours" del Hero apunta aquí; genera 404 |
| `/tours/[id]` | `tours/[id]/` | **PENDIENTE** |
| `/about` | — | **FALTA** — referenciada en navbar; genera 404 |
| `/gallery` | — | **FALTA** — referenciada en navbar; genera 404 |
| `/experiences/*` | — | **FALTA** — 4 sub-rutas referenciadas en navbar; generan 404 |

## layout.tsx

RootLayout async que:
1. Carga la fuente Outfit via `next/font/google`
2. Llama a `getNavMenuData()` — hoy devuelve datos estáticos, en el futuro fetcheará del backend con `revalidate: 3600`
3. Pasa `navData` como prop a `<Navbar>`
4. Renderiza `<Navbar>`, `<main>{children}</main>`, `<Footer>`

Los datos de navegación viven aquí (en `fallbackNavData`) hasta que el backend FastAPI exponga el endpoint `/nav-menu`.

**Nota:** Los metadatos del layout usan `title: "Islamontana Travel"`. Todas las páginas deben seguir el mismo patrón: `"<Sección> — Islamontana Travel"`.

## Rutas de máxima prioridad a implementar

1. **`/contact/page.tsx`** — Client Component con formulario; `POST /api/contact` al backend. Sin esta página todos los flujos de reserva están rotos.
2. **`/tours/page.tsx`** — Server Component; `GET /api/tours`; grid de TourCards.
