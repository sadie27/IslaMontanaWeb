# DISCREPANCIAS.md — Contradicciones doc↔código detectadas

> Generado el 2026-06-11 al construir el sistema de documentación activo en
> `docs/`. Para cada discrepancia: qué decía el doc histórico, qué dice el código
> real, y cómo quedó reflejado en la documentación activa.

---

## D-01 · Subpáginas de destinos: rutas estáticas vs ruta dinámica

**Doc (ARCHITECTURE.md §auditoría):**
> Listaba rutas estáticas individuales:
> `src/app/destinations/galapagos/page.tsx`,
> `src/app/destinations/amazonia/page.tsx`,
> `src/app/destinations/andes-cultura/page.tsx`,
> `src/app/destinations/andes-naturaleza/page.tsx`.

**Código real (verificado 2026-06-11):**
`frontend/src/app/destinations/` contiene únicamente:
- `page.tsx` (listado de destinos)
- `[slug]/page.tsx` (ruta dinámica única)
- `README.md`

No existe ninguna ruta estática por destino; todas se sirven desde `[slug]`.

**En documentación activa:** `docs/Frontend.md` refleja la estructura real con
`[slug]/page.tsx`. Las rutas estáticas no se mencionan como existentes.

---

## D-02 · Número de ficheros en `components/destinations/`

**Doc (CONVENTIONS.md §10, OPTIMIZATION_PLAN.md §2.1):**
> "los 13 archivos completos" de `src/components/destinations/`.
> La lista original incluía: DestinationPageClient, DestinationHero, WhyVisit,
> Tours, TourCard, GalleryCta, FAQ, FinalCta, DestinationCard,
> DestinationMapAnimation, DestinationMapAnimationMobile,
> DestinationMapAnimationWrapper — 12 explícitos, "13 archivos" en total.

**Código real (verificado 2026-06-11):**
El directorio contiene **14 ficheros**:
- Los 12 listados arriba
- `EcuadorMap.tsx` — no estaba en la lista del plan original
- `DestinationHighlights.tsx` — no estaba en la lista del plan original

**En documentación activa:** `docs/ZonaIntocable.md` lista los 14 ficheros
reales; los 2 ficheros adicionales están marcados con ⚠️ e incluidos como
intocables por pertenecer al directorio.

---

## D-03 · Estado de `README.md` raíz: Supabase y Vercel

**Doc (README.md raíz):**
> "Backend: FastAPI, Python, **Supabase (PostgreSQL)**"
> "Deploy: **Vercel** (frontend), VPS Linux (backend)"

**Código real (verificado 2026-06-11):**
- `next.config.js` usa `output: 'export'`, `basePath: /IslaMontanaWeb`,
  `assetPrefix: /IslaMontanaWeb/` → GitHub Pages, no Vercel.
- El backend en `backend/.env.example` define `DATABASE_URL=postgresql://...`
  sin mención de Supabase (el ORM es SQLAlchemy). No hay cliente Supabase en
  ningún fichero de código.

**En documentación activa:** `docs/CONTEXT.md` refleja GitHub Pages y
PostgreSQL+SQLAlchemy. El `README.md` raíz no se ha modificado (no es un
fichero de código; se deja como está). La discrepancia en el README es deuda
documental conocida.

---

## D-04 · Lista de Client Components: "solo Navbar y MegaMenu"

**Doc (README.md raíz, referencias en docs históricos):**
> Implicaba que Navbar y MegaMenu eran los únicos Client Components relevantes.

**Código real (verificado a través de OPTIMIZATION_PLAN.md §4.1 y AUDIT_REPORT):**
Hay más Client Components en uso activo:
- `src/components/home/HomeHero.tsx` (o `src/app/page.tsx` antes de la extracción)
- `src/components/home/Stats.tsx`
- `src/components/ui/ErrorPageClient.tsx`
- `src/components/layout/Navbar.tsx`
- `src/components/layout/MegaMenu.tsx`
- Posiblemente `src/components/ui/MegaMenuImage.tsx`

**En documentación activa:** `docs/ConventionsCode-Frontend.md` define cuándo
usar `"use client"` por condición (hooks de estado/efecto, APIs de browser,
event handlers, librerías client-only) sin pretender dar una lista exhaustiva.

---

## D-05 · Estado del backend: "operativo" vs "sin código"

**Doc (README.md raíz):**
> "Backend: FastAPI, Python, Supabase (PostgreSQL)" — implica existencia de código.
> ARCHITECTURE.md listaba `src/app/destinations/amazonia/page.tsx` con estado
> "✅ Corregido" (haciendo `fetch()` al backend).

**Código real (verificado 2026-06-11):**
`backend/` contiene únicamente READMEs y `.env.example`. No hay ningún `.py`.
El `fetch()` mencionado en ARCHITECTURE apunta a `localhost:8000` que no existe;
el fallback a `src/data/destinations.ts` es el flujo real en producción.

**En documentación activa:** `docs/Backend.md` declara explícitamente el estado
real: "backend SIN implementar". `docs/DecisionesPendientes.md` recoge DB-2 como
decisión abierta.

---

## D-06 · Case mismatch `Computer/` vs `computer/` en `assets.ts`

**Doc (OPTIMIZATION_PLAN.md §2.3):**
> Describía el bug: "Computer/" (mayúscula) → 404s en GitHub Pages (Linux).
> Marcaba la corrección como excepción permitida.

**Código real (verificado 2026-06-11):**
`src/config/assets.ts:29-41` ya usa `computer/` (minúscula) en todas las
referencias. El bug **ya está corregido** en el código actual.

**En documentación activa:** No se menciona como problema activo. En
`docs/DecisionesPendientes.md` no aparece porque está resuelto. Se registra aquí
como discrepancia para constatar que el plan histórico lo describía como pendiente
pero el código ya lo tiene resuelto.

---

## D-07 · `lib/types.ts`: README decía "NavItem/SubItem" como tipos principales

**Doc (README.md y docs históricos):**
> El README citaba `NavItem` y `SubItem` como tipos representativos de
> `src/lib/types.ts`.

**Código real (verificado 2026-06-11):**
`src/lib/types.ts` contiene además: `StatItem`, `WhyVisitItem`, `TourItem`,
`ToursByCategory`, `FaqItem`, `Destination` — los tipos del dominio de
destinos, que son la parte principal del fichero (líneas 14-63).

**En documentación activa:** `docs/ConventionsCode-Frontend.md` describe
correctamente las dos capas de tipos sin limitar la descripción a NavItem/SubItem.

---

## D-08 · DB-4 (bundle-analyzer): "decisión pendiente" vs ya instalado

**Doc (OPTIMIZATION_PLAN.md §3 DB-4):**
> Marcaba la instalación de `@next/bundle-analyzer` como "decisión bloqueante
> abierta" con opciones A/B.

**Código real (verificado 2026-06-11):**
`frontend/package.json` ya tiene `@next/bundle-analyzer` en `devDependencies`
y el script `analyze` en `scripts`. La decisión ya fue tomada e implementada.

**En documentación activa:** `docs/DecisionesPendientes.md` marca DB-4 como
CERRADA con explicación.

---

## D-09 · Paleta Tailwind (azules) vs tokens CSS (verdes)

**Doc (CONVENTIONS.md §8, OPTIMIZATION_PLAN.md §4.6 G):**
> Describían la paleta de marca como verde. No mencionaban divergencia con la
> configuración de Tailwind.

**Código real (verificado 2026-06-11):**
`frontend/tailwind.config.ts` define la escala `primary` con azules (50–900):
`#f0f9ff` … `#0c4a6e`. Los tokens CSS en `globals.css :root` son verdes:
`--color-primary: #3aa023`, `--color-accent: #abd430`. Son dos fuentes que
describen "la marca" con colores completamente distintos.

**En documentación activa:** `docs/ConventionsStyle-Frontend.md` documenta la
divergencia, establece que **la fuente de verdad son los tokens CSS** (verdes),
y advierte de no usar la escala `primary` de Tailwind como si fuera la marca.
La unificación de ambas fuentes está pendiente de decisión del dueño.

---

## Resumen de discrepancias

| ID | Categoría | Origen | Estado en doc activo |
|----|-----------|--------|----------------------|
| D-01 | Rutas de destinos | ARCHITECTURE.md | Corregido |
| D-02 | Número de ficheros intocables | CONVENTIONS.md | Corregido (14, no 13) |
| D-03 | Backend Supabase/Vercel vs GH Pages/SQLAlchemy | README.md | Corregido en docs/ |
| D-04 | Lista de Client Components incompleta | README.md | Corregido |
| D-05 | Estado del backend (operativo vs sin código) | README.md, ARCHITECTURE | Corregido |
| D-06 | Case mismatch `Computer/` ya resuelto | OPTIMIZATION_PLAN.md | Documentado como resuelto |
| D-07 | `lib/types.ts` más completo de lo descrito | README.md | Corregido |
| D-08 | DB-4 bundle-analyzer ya instalado | OPTIMIZATION_PLAN.md | Marcada como CERRADA |
| D-09 | Paleta Tailwind azules vs tokens CSS verdes | tailwind.config.ts vs globals.css | Documentado; fuente de verdad = tokens CSS |
