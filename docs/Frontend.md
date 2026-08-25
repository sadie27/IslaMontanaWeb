# Frontend.md — Router del dominio Frontend

> Router del frontend. Te da el contexto propio de la app Next.js y te enruta
> hacia los ficheros de contenido. **No** duplica las reglas: las referencia.
> Lee este fichero al empezar cualquier tarea de frontend; lee sus hijos
> **bajo demanda**, solo cuando la tarea concreta lo pida.

---

## Contexto del frontend

- **Framework:** Next.js 14, App Router, exportado como sitio estático
  (`output: 'export'` en `next.config.js`; en producción `basePath:
  /IslaMontanaWeb`).
- **Lenguaje:** TypeScript con `strict: true`. Alias `@/*` → `src/*`.
- **React:** 18. Server Components por defecto; `'use client'` explícito cuando
  se usan hooks o interacción (ver convenciones).
- **Organización:** feature-based híbrido. Componentes agrupados por dominio/
  sección, con capas separadas de `lib/`, `config/`, `data/`, `types/`.

```
src/
├── app/          # rutas (App Router): layout, page, error, not-found, [slug]
├── components/   # por sección: home/, destinations/, layout/, tours/, ui/
├── hooks/        # hooks propios (use*)
├── lib/          # api.ts, adapters.ts, types.ts, image-loader.ts
├── config/       # assets.ts, routes.ts, colors.ts
├── data/         # datos estáticos
├── styles/       # CSS modular por sección + breakpoints/
└── types/        # api.ts (contratos con el backend)
```

## A dónde ir según la tarea (enrutamiento)

- **Escribir/estructurar componentes, hooks, estado, imports, tipos, fetching**
  → lee `docs/ConventionsCode-Frontend.md`.
- **Estilos: Tailwind, CSS modular, design tokens, tipografía, responsive**
  → lee `docs/ConventionsStyle-Frontend.md`.
- **Manejo de errores: error boundaries, errores de API, validación de
  formularios, notificaciones al usuario** → lee la sección "Manejo de errores
  (Frontend)" en `docs/DecisionesPendientes.md`.

## Skills de frontend

Las skills propias del proyecto viven en `Skills/`. Aún no hay ninguna creada.
Cuando se añadan skills de frontend, aquí se listará **cuándo** invocar cada una
(su disparador), sin duplicar su contenido. Plantilla de entrada para el futuro:

```
- <nombre-skill> (Skills/<ruta>) — Úsala cuando: <disparador>.
```

## Convenciones clave que no debes romper

El frontend mantiene **dos capas de tipos**: `src/types/api.ts` (contratos del
backend, `snake_case`) y `src/lib/types.ts` (tipos internos, `camelCase`), con
adaptadores en `src/lib/adapters.ts`. Nunca uses directamente los tipos del
backend en los componentes: pasa siempre por el adaptador. (Detalle en
`ConventionsCode-Frontend.md`.)

## Zona intocable — OBLIGATORIO leer antes de tocar `/destinations`

El dominio `/destinations` tiene 16 ficheros con animaciones de precisión
calibradas a mano. **Prohibido modificarlos** sin aprobación explícita del dueño
del repo. Lee `docs/ZonaIntocable.md` para la lista completa y la política.
