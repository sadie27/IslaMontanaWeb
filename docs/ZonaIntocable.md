# ZonaIntocable.md — Guardrail: ficheros prohibidos de modificar

> Estos ficheros contienen animaciones scroll-driven, swipe mobile y timing LERP
> calibrados a mano con coste elevado. **Modificarlos sin aprobación es una
> infracción grave**: un cambio aparentemente inocuo puede romper un timing de
> precisión que tardó horas en calibrar.

---

## La norma

**Prohibido modificar cualquier fichero de esta lista** (editar, renombrar,
eliminar, mover). Solo se puede hacer con **aprobación explícita del dueño del
repositorio, justificada en el PR, una excepción a la vez**.

---

## Lista verificada (estado: 2026-06-11)

> Lista verificada contra el código real en `frontend/src/`. Los ficheros marcados
> con ⚠️ no estaban en el plan original pero existen en el directorio y forman
> parte del sistema de animaciones, por lo que se incluyen como intocables.

### Pages

- `src/app/destinations/page.tsx`
- `src/app/destinations/[slug]/page.tsx`

### Componentes (`src/components/destinations/`)

- `DestinationPageClient.tsx`
- `DestinationHero.tsx`
- `WhyVisit.tsx`
- `Tours.tsx`
- `TourCard.tsx`
- `GalleryCta.tsx`
- `FAQ.tsx`
- `FinalCta.tsx`
- `DestinationCard.tsx`
- `DestinationMapAnimation.tsx`
- `DestinationMapAnimationMobile.tsx`
- `DestinationMapAnimationWrapper.tsx`
- `EcuadorMap.tsx` ⚠️ (no estaba en el plan original; presente en el directorio)
- `DestinationHighlights.tsx` ⚠️ (no estaba en el plan original; presente en el directorio)

### Datos y estilos

- `src/data/destinations.ts`
- `src/data/ecuadorPaths.ts`
- `src/data/southAmericaPaths.ts`
- `src/styles/destinations.css`

---

## Política append-only para utilidades compartidas

Estos ficheros son consumidos por la zona intocable. Nunca renombres ni elimines
entradas existentes; solo añade:

| Fichero | Política |
|---------|----------|
| `src/config/routes.ts` | Solo añadir nuevas claves a `ROUTES`. |
| `src/config/assets.ts` | Solo añadir. |
| `src/lib/types.ts` | Solo añadir. La interfaz `Destination` no se modifica; usa `Omit`/`Pick`/extensión si necesitas variantes. |

---

## Cómo levantar la prohibición

1. Abre el PR con el cambio propuesto.
2. Describe **exactamente** qué se cambia y por qué.
3. Obtén aprobación explícita del dueño del repo **antes** de hacer merge.
4. Las excepciones se aprueban una a una; una aprobación no es un cheque en blanco
   para el fichero completo.

Referencia: `docs/CONTEXT.md §6` — la prohibición está listada como regla
transversal del repo.
