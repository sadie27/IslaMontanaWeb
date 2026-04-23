# Frontend Architecture — IslaMontana Travel

## Regla arquitectónica

El frontend obtiene datos ÚNICAMENTE vía `fetch()` al backend FastAPI (`NEXT_PUBLIC_API_URL`).  
No debe existir lógica de datos hardcodeada en componentes, ni llamadas directas a Supabase.

---

## Capas de datos

```
Backend FastAPI (VPS)
        │
        ▼
src/lib/api.ts          ← fetch() con revalidate:3600, fallback a [] / null
        │
        ▼
src/lib/adapters.ts     ← Convierte snake_case (API) → camelCase (frontend)
        │
        ▼
src/types/api.ts        ← Interfaces TypeScript alineadas con Pydantic schemas
        │
        ▼
Componentes / Páginas   ← Server Components: fetch directo. Client: useEffect/SWR
```

### Fallback strategy

Si la API no responde, las páginas usan los datos de `src/data/destinations.ts` como fallback temporal.  
Este archivo NO debe crecer ni usarse como fuente primaria de datos.

---

## Archivos clave

| Archivo | Rol |
|---|---|
| `src/types/api.ts` | Interfaces TS que reflejan los Pydantic schemas del backend |
| `src/lib/api.ts` | Funciones fetch al backend con manejo de errores |
| `src/lib/adapters.ts` | Convierte `DestinationResponse` → `Destination`, `NavItemResponse` → `NavItem` |
| `src/data/destinations.ts` | Datos de fallback (solo para cuando la API no responde) |

---

## Variables de entorno

```env
NEXT_PUBLIC_API_URL=https://api.islamontana.com   # URL del backend FastAPI en VPS
```

Copia `.env.local.example` → `.env.local` y ajusta la URL.

---

## Endpoints del backend consumidos

| Función | Endpoint | Revalidate |
|---|---|---|
| `getDestinations()` | `GET /destinations` | 3600s |
| `getDestination(slug)` | `GET /destinations/:slug` | 3600s |
| `getNavMenu()` | `GET /nav-menu` | 3600s |

---

## Convención de componentes

- **Server Components** (por defecto): `fetch()` directo en el cuerpo del componente.
- **Client Components** (`'use client'`): solo para interactividad (scroll, hover, animaciones). No hacen fetch de datos de negocio.
- **Error handling**: si la API falla → mostrar estado de error o usar fallback. Nunca datos ficticios en producción.

---

## Auditoría de origen de datos (2026-04-22)

| Archivo | Patrón actual | ¿Correcto? | Estado |
|---|---|---|---|
| `src/lib/api.ts` | fetch() a NEXT_PUBLIC_API_URL | ✅ | Nuevo — capa de API |
| `src/lib/adapters.ts` | Transformación de tipos | ✅ | Nuevo — adaptadores |
| `src/types/api.ts` | Interfaces TypeScript | ✅ | Nuevo — tipos API |
| `src/app/layout.tsx` | fetch() → fallback local | ✅ | Corregido |
| `src/app/destinations/page.tsx` | fetch() → fallback local | ✅ | Corregido |
| `src/app/destinations/galapagos/page.tsx` | fetch() → fallback local | ✅ | Corregido |
| `src/app/destinations/amazonia/page.tsx` | fetch() → fallback local | ✅ | Corregido |
| `src/app/destinations/andes-cultura/page.tsx` | fetch() → fallback local | ✅ | Corregido |
| `src/app/destinations/andes-naturaleza/page.tsx` | fetch() → fallback local | ✅ | Corregido |
| `src/data/destinations.ts` | Datos hardcodeados | ⚠️ Solo fallback | Mantener solo como fallback |
| `src/app/page.tsx` | useHeroImages (imágenes locales) | ✅ | Correcto — imágenes estáticas |
| `src/components/layout/Navbar.tsx` | Props (navData del layout) | ✅ | Correcto |
| `src/components/layout/MegaMenu.tsx` | Props (items del Navbar) | ✅ | Correcto |
| `src/components/layout/Footer.tsx` | Estático | ✅ | Correcto — contenido fijo |
| `src/components/destinations/*.tsx` | Props (datos del page) | ✅ | Correcto |

---

## Páginas pendientes de implementar

| Ruta | Estado | Notas |
|---|---|---|
| `/contact` | ❌ Pendiente | Form + `POST /contact` al backend |
| `/tours` | ❌ Pendiente | Server Component, `GET /tours` |
| `/about` | ❌ Pendiente | Contenido estático o `GET /about` |
| `/gallery` | ❌ Pendiente | `GET /gallery` paginado |
