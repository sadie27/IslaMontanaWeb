# Plan — Páginas Experiencias (/experiences) y Nosotros (/about)

> Cubre DEUDA-2 de `docs/DecisionesPendientes.md` para estas dos rutas
> concretas. Ambas usan datos estáticos locales (sin backend, ver DB-2
> abierta) y siguen el patrón de implementación de `/gallery`
> (`GalleryHero` + vista + `page.tsx` con metadata). Todo trabajo visual
> debe seguir la skill `islamontana-styles`
> (`.claude/skills/islamontana-styles/SKILL.md`).

## Decisiones de alcance (confirmadas con el dueño del repo)

- **Experiencias = Tours renombrado.** `/experiences` es el listado público
  de tours/experiencias que hoy solo existe embebido en la home
  (`HOME_TOURS` en `Tours.tsx`/`TourCard.tsx`). No es una categoría nueva.
- **Nosotros = About completo.** Hero + historia + equipo + valores + CTA
  final (patrón estándar de "About Us" de agencia de turismo).
- **Datos estáticos locales** para ambas páginas — mismo patrón que
  `src/data/destinations.ts` / `src/data/home-tours.ts`. Sin llamadas a API.

## Fuera de alcance (ambas páginas)

- Formulario de contacto real, backend, o integración con `NEXT_PUBLIC_API_URL`.
- Subrutas de experiencia individual (`/experiences/[slug]`) — solo el
  listado en esta fase.
- Tocar cualquier fichero de la zona intocable (`src/components/destinations/**`,
  `src/styles/destinations.css`, `src/data/destinations.ts`,
  `src/data/ecuadorPaths.ts`, `src/data/southAmericaPaths.ts`).

---

## Step 1 — Modelo de datos de Experiencias

**Intent**: Crear `src/data/experiences.ts` con un array `EXPERIENCES: TourItem[]`
(reutilizando el tipo `TourItem`/`Tour` ya definido en `src/lib/types.ts` y
`TourCard.tsx`) que cubra las 4 categorías de `ToursByCategory`
(`dia`, `cruceros`, `tierra`, `personalizado`), migrando/ampliando el
contenido actual de `HOME_TOURS`. Añadir el tipo de categoría como campo
`category` en cada item para poder filtrar en el listado.

## Step 2 — Modelo de datos de Nosotros

**Intent**: Crear `src/data/about.ts` con constantes tipadas para historia
(texto + hito opcional), equipo (`{name, role, photo, bio}[]`) y valores
(`{icon, title, desc}[]`), siguiendo el mismo patrón de arrays estáticos
tipados que `destinations.ts`. Añadir los tipos nuevos a `src/lib/types.ts`
(`TeamMember`, `CompanyValue`) siguiendo la política append-only si algún
tipo tocado fuera parte de la zona intocable — no lo es en este caso.

## Step 3 — Página /experiences: hero + listado + filtros

**Intent**: Crear `src/app/experiences/page.tsx` (Server Component, con
`metadata` como en `gallery/page.tsx`) que renderiza un hero de sección
(nuevo, siguiendo el patrón BEM `.experiences-hero` en un `experiences.css`
propio, consistente con `gallery-hero`) y un listado de `TourCard` filtrable
por categoría (adaptar `TourCard.tsx` de home o crear una variante de página
si el diseño de listado difiere del embebido en home). Sigue
`islamontana-styles` §1 para decidir BEM vs Tailwind, §2 para tokens de
color, §5 para breakpoints, §6 para hover/active.

## Step 4 — Página /about: hero + historia + equipo + valores + CTA

**Intent**: Crear `src/app/about/page.tsx` con: hero de sección (reutilizar
patrón `.gallery-hero`/`.hero` adaptado), bloque de historia, grid de equipo
(cards con foto/nombre/rol), grid de valores (reutilizar patrón visual de
`.trust-item`/`.trust-grid` de `WhyUs.tsx` en home.css si aplica, o CSS BEM
nuevo `.about-*` si el diseño difiere lo suficiente), y CTA final
(reutilizar `.final-cta`/`FinalCta` si el mensaje encaja, o una variante).
Sigue `islamontana-styles` para toda decisión de estilo.

## Step 5 — Navegación: activar los links reales

**Intent**: Los links a `ROUTES.EXPERIENCES` y `ROUTES.ABOUT` ya existen en
`routes.ts`; verificar/actualizar Navbar, MegaMenu y Footer para que apunten
a estas rutas ahora que existen (hoy pueden estar ocultos o ausentes al no
existir la página destino). No modificar `ROUTES` salvo añadir claves nuevas
(política append-only de `docs/ZonaIntocable.md` si algún consumidor fuera
zona intocable — MegaMenu/Navbar no lo son).

## Step 6 — Revisión visual y responsive end-to-end

**Intent**: Verificar ambas páginas en mobile/tablet/desktop (los tres
rangos exactos del proyecto: <768px / 768–1023px / ≥1024px), estados
hover/active, `prefers-reduced-motion`, y que ningún color hardcodeado se
haya colado (todo vía `var(--color-*)`). Confirmar que no se ha usado
`bg-primary-*` de Tailwind pensando que era el verde de marca.

---

## Batch execution

```bash
/ecc:orchestrate custom "ecc:planner,ecc:typescript-reviewer" "[Plan: docs/plan/experiencias-y-nosotros.md#step-1] Crear src/data/experiences.ts con EXPERIENCES: (TourItem & {category: keyof ToursByCategory})[] cubriendo las 4 categorías dia/cruceros/tierra/personalizado, migrando el contenido de HOME_TOURS (src/data/home-tours.ts) y ampliándolo; reutilizar el tipo TourItem de src/lib/types.ts sin modificarlo; Acceptance: build de TypeScript sin errores; al menos 2 items por categoría; ningún dato duplicado exacto de HOME_TOURS sin revisar; Out of scope: formulario de contacto, backend, subrutas /experiences/[slug]"

/ecc:orchestrate custom "ecc:planner,ecc:typescript-reviewer" "[Plan: docs/plan/experiencias-y-nosotros.md#step-2] Crear src/data/about.ts con historia (texto+hito opcional), equipo (TeamMember[]: name/role/photo/bio) y valores (CompanyValue[]: icon/title/desc); añadir los tipos TeamMember y CompanyValue a src/lib/types.ts sin tocar tipos existentes; Acceptance: build de TypeScript sin errores; al menos 3 miembros de equipo y 3 valores de ejemplo; tipos exportados y usados por el array; Out of scope: formulario de contacto, backend, integración con NEXT_PUBLIC_API_URL"

/ecc:orchestrate custom "ecc:architect,ecc:tdd-guide,ecc:typescript-reviewer" "[Plan: docs/plan/experiencias-y-nosotros.md#step-3] Crear frontend/src/app/experiences/page.tsx (Server Component con metadata, patrón de frontend/src/app/gallery/page.tsx) con hero de sección BEM nuevo (.experiences-hero en experiences.css importado desde globals.css) y listado filtrable de TourCard por categoría de src/data/experiences.ts; seguir la skill islamontana-styles para tokens de color (var(--color-*), nunca bg-primary-* de Tailwind), decisión BEM vs Tailwind, breakpoints exactos (767/768-1023/1024) y patrón hover (@media (hover: hover) and (pointer: fine)) + :active; Acceptance: npm run build pasa; página responsive en los 3 rangos; ningún color hardcodeado; Out of scope: tocar cualquier fichero de la zona intocable listada en docs/ZonaIntocable.md"

/ecc:orchestrate custom "ecc:architect,ecc:tdd-guide,ecc:typescript-reviewer" "[Plan: docs/plan/experiencias-y-nosotros.md#step-4] Crear frontend/src/app/about/page.tsx con hero, bloque de historia, grid de equipo y grid de valores (reutilizando patrón visual .trust-item/.trust-grid de home.css si encaja) y CTA final, usando datos de src/data/about.ts; seguir la skill islamontana-styles para toda decisión de estilo (tokens var(--color-*), BEM vs Tailwind, breakpoints, hover/active, prefers-reduced-motion); Acceptance: npm run build pasa; página responsive en los 3 rangos; equipo y valores renderizan desde src/data/about.ts sin datos inline; Out of scope: tocar cualquier fichero de la zona intocable listada en docs/ZonaIntocable.md"

/ecc:orchestrate custom "ecc:typescript-reviewer" "[Plan: docs/plan/experiencias-y-nosotros.md#step-5] Verificar y actualizar Navbar, MegaMenu y Footer (frontend/src/components/layout/) para que los links a ROUTES.EXPERIENCES y ROUTES.ABOUT apunten correctamente ahora que /experiences y /about existen; no modificar routes.ts salvo añadir claves nuevas si faltan; Acceptance: los 3 componentes navegan correctamente a ambas rutas; ningún link roto a rutas inexistentes; Out of scope: rediseñar Navbar/MegaMenu/Footer más allá de los links"

/ecc:orchestrate custom "ecc:code-reviewer" "[Plan: docs/plan/experiencias-y-nosotros.md#step-6] Revisión visual y responsive end-to-end de /experiences y /about en los 3 rangos del proyecto (<768px, 768-1023px, >=1024px), verificando estados hover/active, prefers-reduced-motion, y ausencia de colores hardcodeados o uso incorrecto de bg-primary-* de Tailwind (trampa conocida en islamontana-styles); Acceptance: sin colores hex hardcodeados fuera de tokens; sin bg-primary-*/text-primary-* de Tailwind; hover envuelto en @media (hover: hover) and (pointer: fine) con :active equivalente; Out of scope: cambios funcionales nuevos, solo revisión y fixes de estilo"
```
