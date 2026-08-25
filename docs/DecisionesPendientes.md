# DecisionesPendientes.md — Decisiones abiertas y backlog de deuda

> Este fichero recoge las decisiones que **el dueño del repo debe resolver** antes
> de actuar, y los bugs/deuda técnica conocidos. No los resuelvas en silencio:
> propón, espera respuesta, luego ejecuta.

---

## Bloque 1 — Decisiones bloqueantes

### DB-1 · ¿Se mantiene `output: 'export'` (GitHub Pages) o se migra a runtime?

**Estado:** ABIERTA

El `next.config.js` confirma `output: 'export'` con `basePath: /IslaMontanaWeb`
y deploy a GitHub Pages. Si se migra a Vercel/VPS, el `revalidate: 3600` cobra
sentido real en runtime y el plan de optimización se amplía con ISR.

**Opciones:**
- A) Mantener GitHub Pages → ejecutar el plan tal cual.
- B) Migrar a Vercel/VPS en este ciclo → plan se amplía con ISR y cache headers.
- C) Migrar en el futuro → ejecutar el plan SSG ahora; migración como fase futura.

**Bloquea:** decisiones de caching, `revalidate`, y las rutas no implementadas
(`/contact`, `/tours`, `/about`, `/gallery`).

---

### DB-2 · ¿El backend (`NEXT_PUBLIC_API_URL`) está operativo en producción?

**Estado:** ABIERTA

El directorio `backend/` contiene solo estructura + READMEs; no hay código Python.
Si el backend no existe, `src/data/destinations.ts` es la fuente de verdad
permanente y las reglas de colocación se simplifican.

**Opciones:**
- A) Backend no operativo ahora, sí en el futuro → mantener estáticos + adapters.
- B) Backend operativo → constantes inline home (`TOURS`, `DESTINATIONS`) migran
  a llamadas API.
- C) Backend no se implementará → `src/lib/api.ts` puede simplificarse.

**Bloquea:** colocación de datos en home, estrategia de fallback, Fase 4 del plan.

---

### DB-3 · ¿Es aceptable añadir Vitest + Testing Library?

**Estado:** ABIERTA

No hay tests. Cada refactor va a producción sin red de seguridad.

**Opciones:**
- A) Añadir Vitest como prerequisito de Fase 3 (antes de refactorizar Navbar).
- B) No añadir ahora → verificación manual con `npm run build` + revisión visual.
- C) Solo tests de smoke.

---

### DB-4 · ¿Es aceptable añadir `@next/bundle-analyzer` como devDependency?

**Estado:** CERRADA ✅

`@next/bundle-analyzer` ya está instalado en `devDependencies` y el script
`analyze` ya existe en `package.json`. No hay nada que decidir.

---

### DB-5 · ¿Se renombra el directorio `movile/` → `mobile/` en `public/images/hero-main/`?

**Estado:** CERRADA ✅

Ya renombrado. Commit `98c1ba5` (2026-04-30) — "fix: rename hero-main/movile
to mobile (typo)". El directorio real y todas las referencias
(`scripts/generate-hero-manifest.mjs`, `src/config/hero-images.ts`,
`src/hooks/useHeroImages.ts`) usan `mobile/`. No hay nada que decidir.

---

### DB-6 · ¿Reemplazar `#0d200c` literal por `var(--color-dark)` en la zona intocable?

**Estado:** ABIERTA (bloqueada por zona intocable)

`DestinationHero.tsx` y `TourCard.tsx` (zona intocable) usan `#0d200c` en línea
en lugar del token CSS `var(--color-dark)`. El valor es idéntico; el riesgo de
regresión visual es bajo, pero cualquier toque a la zona intocable requiere
aprobación explícita.

**Opciones:**
- A) Aprobar la excepción → cambio puntual en 2-3 líneas + verificación visual.
- B) Denegar → colores quedan hardcodeados; no es un problema funcional.

---

### DB-7 · Nombre oficial de la marca: ¿"Islamontana Travel" o "Isla Montaña"?

**Estado:** CERRADA ✅

El código activo usa "Islamontana Travel" de forma consistente
(`destinations/page.tsx` línea 4, `layout.tsx` línea 20,
`destinations/[slug]/page.tsx` línea 17). La "inconsistencia" era deuda
documental en un README de intención histórico, no en el código. No hay
nada que corregir.

---

### DB-8 · ¿Las 9 imágenes faltantes del mega-menu se añaden o se rediseña la sección?

**Estado:** ABIERTA

`src/config/assets.ts` define referencias a imágenes que no existen en disco
(`ANDES_CULTURA`, `CRUCEROS`, `CIRCUITOS`, `DAY_TOURS`, `BIRDWATCHING`,
`GALLERY_FAUNA`, `GALLERY_PAISAJES`, `GALLERY_CULTURA`, `GALLERY_AVENTURA`).
El código usa `{imageExists && ...}` como fallback; el mega-menu muestra
secciones sin imagen.

**Opciones:**
- A) Añadir las imágenes → MegaMenu funciona como se diseñó.
- B) Rediseñar sin imágenes → eliminar referencias de `assets.ts` y simplificar
  `MegaMenu.tsx`.
- C) Mantener el estado actual → fallback como deuda temporal.

---

## Bloque 2 — Backlog de bugs y deuda técnica

Los bugs verificados contra el código real. Los que ya están resueltos no
aparecen aquí.

### BUG-1 · 9 imágenes faltantes del mega-menu

**Fichero:** `src/config/assets.ts`
**Estado:** abierto (ver DB-8)
Las referencias existen; los ficheros de imagen no. El fallback `imageExists`
previene errores de runtime pero el menú aparece incompleto visualmente.

---

### BUG-3 · `mapRegion` siempre devuelve `'galapagos'` en el adaptador

**Fichero:** `src/lib/adapters.ts:19` — `mapRegion: 'galapagos'` es un literal
fijo, ignora el destino real.
**Estado:** abierto. `adapters.ts` NO es zona intocable; puede corregirse. El tipo
`mapRegion: 'galapagos' | 'amazonia' | 'andes'` en `lib/types.ts` ya admite los
tres valores.

---

### BUG-4 · Colores hardcodeados `#0d200c` en la zona intocable

**Ficheros:** `src/components/destinations/DestinationHero.tsx`,
`src/components/destinations/TourCard.tsx`.
**Estado:** bloqueado hasta resolución de DB-6 (requiere excepción de zona
intocable).

---

### BUG-6 · `whyVisit` aplana las descripciones en el adaptador

**Fichero:** `src/lib/adapters.ts:21`
`why_visit` del backend es `string[]`; el adaptador lo convierte a
`{ title, desc: '' }` dejando `desc` siempre vacío. Cuando el backend esté
operativo habrá que coordinar el contrato o actualizar el adaptador.
**Estado:** abierto (dependiente de DB-2).

---

### BUG-7 · `photos` y `faq` siempre vacíos en el adaptador

**Fichero:** `src/lib/adapters.ts:28,38`
`photos: []` y `faq: []` son arrays vacíos fijos. Cuando el backend esté
operativo habrá que extender el schema `DestinationResponse` y el adaptador.
**Estado:** abierto (dependiente de DB-2).

---

### BUG-8 · `tours` del backend solo mapea a la categoría `dia`; el resto quedan vacíos

**Fichero:** `src/lib/adapters.ts:25-37`
`ToursByCategory` tiene cuatro categorías (`dia`, `cruceros`, `tierra`,
`personalizado`); el adaptador solo llena `dia` y deja las otras tres en `[]`.
**Estado:** abierto (dependiente de DB-2 y del contrato del backend).

---

### DEUDA-2 · Páginas no implementadas

**Rutas:** `/contact`, `/tours`, `/about`, `/gallery`, `/experiences` y subrutas
(`cruceros`, `circuitos`, `day-tours`, `birdwatching`).
**Estado:** abierto. Verificado en `AUDIT_REPORT.md` (raíz) — ninguna de estas
rutas existe todavía en `frontend/src/app/`.

---

## Manejo de errores (Frontend)

> Fusionado desde `Errors-Frontend.md` (archivado en `docs/historico/`). El caso
> transversal "cuando algo va mal" en el cliente: error boundaries, errores de
> API, validación de formularios y notificaciones al usuario.

### Error boundaries (Next.js App Router)

- `src/app/error.tsx` → boundary global para errores de runtime (500).
- `src/app/not-found.tsx` → manejo de 404.
- Ambos delegan en `ErrorPageClient` con la prop `type: '404' | '500'`.

Mantén este patrón: los errores de página se canalizan por estos dos ficheros y
el componente `ErrorPageClient`, no con boundaries ad-hoc dispersos.

### Errores de API

Estado actual (`lib/api.ts`): las llamadas hacen `try/catch` **silencioso** y
retornan `[]` o `null` en caso de fallo; nunca lanzan. Los componentes reciben
datos vacíos y muestran su fallback. No hay interceptores globales (no hay axios).

> ⚠️ Atención (deuda técnica): el patrón silencioso oculta fallos reales (un
> error de red se ve igual que "no hay datos"). No lo des por correcto. Regla a
> seguir cuando trabajes esta zona:
> - Distingue **"sin datos"** de **"error"**: no devuelvas `[]`/`null` para ambos.
> - Cuando un fallo deba ser visible al usuario, usa el sistema de notificación
>   (ver abajo) en lugar de tragarte el error.
> - No introduzcas axios/React Query sin proponerlo: el estándar es `fetch` en
>   `lib/api.ts`.

### Validación de formularios

Aún no hay formularios implementados (`src/app/contact/` no existe) y no hay
librería de validación instalada. **Decisión pendiente**: cuando se implemente
el formulario de contacto hay que elegir librería (p. ej. react-hook-form + Zod)
y documentar aquí el patrón de mensajes de error. No improvises una validación
manual sin proponer antes el enfoque.

### Notificaciones al usuario (toasts)

No hay sistema de toasts/notificaciones instalado. **Decisión pendiente**,
probablemente ligada al formulario de contacto. Cuando se añada, documenta aquí
su ubicación y cómo se disparan los mensajes de error.

### Logging / monitorización

No hay logging de cliente (sin Sentry ni similar). Si se añade observabilidad,
documéntala aquí.
