# AUDIT_REPORT.md — Auditoría de retoma (4 meses sin tocar el repo)

> Generado: 2026-08-25. Snapshot documentado previo: 2026-04-29 (último commit real: 2026-04-30).
> Solo lectura — no se ha modificado ningún archivo de código fuente para este informe.

---

## 1. Resumen ejecutivo

El repo está **más sano de lo que la deuda documentada sugería**: el último commit (`aba049c`, 2026-04-30) coincide casi exactamente con la fecha del snapshot, así que en términos de código **no han pasado 4 meses de trabajo — han pasado 4 meses de inactividad total**. No hay ramas locales con commits sin mergear, el remoto está sincronizado, y `npm run build` compila sin errores ahora mismo. De los 7 puntos de deuda técnica documentados, **4 se resolvieron** (case mismatch `Computer/`, typo `movile/`, archivos `.bak` en git, inconsistencia de marca en páginas reales), **1 sigue exactamente igual** (mega-menu: 9 de 13 imágenes referenciadas siguen sin existir), y **2 son verificaciones de infraestructura que no cambiaron** (sigue en `output: export` / GitHub Pages, backend sigue sin una sola línea de Python). Lo que sí es nuevo y no estaba documentado: hay una reorganización completa de la documentación en curso en el working tree (nuevo sistema `docs/` + `CLAUDE.md`, sustituyendo `CONVENTIONS.md`, `MASTER_PLAN.md`, `frontend/ARCHITECTURE.md` y otros, que aparecen borrados pero sin commitear), y **9 vulnerabilidades de severidad alta** en dependencias, varias en el propio `next`. El entorno local (Node 24) no coincide con el `.nvmrc` del proyecto (Node 20), algo que antes ni siquiera era verificable porque el archivo no existía.

## 2. Alertas de seguridad y dependencias (prioridad alta — bloquea otras decisiones)

`npm audit` reporta **9 vulnerabilidades de severidad alta**, ninguna crítica:

| Paquete | Rango afectado | Vía | Fix disponible |
|---|---|---|---|
| `next` | 9.3.4-canary.0 – 16.3.0-preview.10 (incluye la versión actual 14.2.35) | dependencia directa | `npm audit fix --force` → salta a `next@16.3.3` (**breaking change**, major) |
| `postcss` | ≤8.5.22 | vía `next` | mismo fix, mismo breaking change |
| `glob` | 10.2.0–10.4.5 | vía `eslint-config-next` | `npm audit fix --force` → `eslint-config-next@16.3.3` (breaking) |
| `brace-expansion` | varios rangos | transitiva (glob, typescript-eslint) | `npm audit fix` (no breaking) |
| `js-yaml` | 4.0.0–4.3.0 | transitiva | `npm audit fix` (no breaking) |
| `nanoid` | ≤3.3.17 | transitiva | `npm audit fix` (no breaking) |
| `ws` | 7.0.0–7.5.10 | transitiva | `npm audit fix` (no breaking) |

**Lectura:** las vulnerabilidades de `next` incluyen varios DoS y un XSS (CSP nonces, `beforeInteractive` scripts). El proyecto exporta estático (`output: 'export'`) y no corre `next start` en producción (GitHub Pages sirve HTML estático), lo que **reduce mucho la superficie real de explotación** de los CVEs de servidor (Server Actions, Middleware, Image Optimizer runtime) — no hay servidor Next corriendo en producción. Aun así, el `next dev` local sí es vulnerable en desarrollo, y quedarse en `14.2.35` dos major versions por detrás (`16.3.3` es la última) va a doler más cuanto más se espere.

**Recomendación:** ejecutar `npm audit fix` (sin `--force`) primero — resuelve 5 de las 9 sin tocar `next`/`postcss`/`eslint-config-next`. La actualización de `next` a v16 es una decisión aparte, de mayor alcance (ver §6).

Adicional: `.nvmrc` en `frontend/` fija **Node 20**, pero el Node local instalado es **v24.15.0**. El build funcionó igualmente en esta sesión, pero no es la versión soportada — usar `nvm use` o equivalente antes de seguir trabajando.

## 3. Deuda técnica documentada vs. estado real

| Issue | Estado documentado (2026-04-29) | Estado real ahora | ¿Cambió? |
|---|---|---|---|
| Case mismatch `Computer/` vs `computer/` | Inconsistencia entre `assets.ts` y el directorio real | `assets.ts` referencia `/images/hero-main/computer/` (minúscula), directorio real es `computer/` (minúscula) — coinciden | ✅ **Resuelto** |
| Typo `movile/` → `mobile/` | Presente en `generate-hero-manifest.mjs`, `hero-images.ts`, `useHeroImages.ts` | `grep -rn "movile"` no encuentra nada; el directorio real es `mobile/` | ✅ **Resuelto** |
| Archivos `.bak*` comprometidos en git | `destinations/page.tsx.bak`, `DestinationMapAnimation.tsx.bak[2-4]`, `ecuadorPaths.ts.bak[1-2]` | `git ls-files \| grep bak` no devuelve nada. `.gitignore` ahora tiene `*.bak` y `*.bak[0-9]` | ✅ **Resuelto** |
| Inconsistencia de marca ("Islamontana Travel" vs "Isla Montaña") | `layout.tsx` vs `destinations/page.tsx` | Ambos archivos usan ahora "Islamontana Travel". "Isla Montaña" solo aparece en dos `README.md` de documentación, no en contenido real | ✅ **Resuelto** (en código de producción) |
| Mega-menu: imágenes faltantes | 9 de 12 referenciadas no existían | `assets.ts` referencia 13 imágenes de mega-menu; el directorio solo tiene 4 (`amazonia.webp`, `andes-naturaleza.webp`, `costa.webp`, `galapagos.webp`). **9 siguen faltando**: `andes-cultura`, `cruceros`, `circuitos`, `day-tours`, `birdwatching`, `gallery-fauna`, `gallery-paisajes`, `gallery-cultura`, `gallery-aventura` | ❌ **Sin cambios** (mismo número, 9/13) |
| Remanentes `andes.jpg`, `costa.webp` sueltos en `public/images/` | Sin usar, sin referenciar | No existen en `public/images/` raíz — ya no están | ✅ **Resuelto** (o nunca existieron con esos nombres exactos; el `costa.webp` actual vive dentro de `mega-menu/` y sí está referenciado) |
| `image-loader.ts`, `output: 'export'`, `basePath` en `next.config.js` | Presentes, deploy a GitHub Pages, sin migrar a Vercel | Los tres siguen presentes tal cual: `src/lib/image-loader.ts` existe, `next.config.js` tiene `output: 'export'` y `basePath: '/IslaMontanaWeb'` en prod | ➖ **Sin cambios** (confirmado, no es deuda resuelta ni nueva — es una decisión de arquitectura aún abierta, ver `docs/DecisionesPendientes.md` DB-1) |

## 4. Estado de páginas y componentes

| Ruta / archivo | Existe | Líneas | Estado |
|---|---|---|---|
| `/` (`page.tsx`) | Sí | 26 | Real — compone 6 secciones (`HomeHero`, `Stats` con dynamic import, `Destinations`, `WhyUs`, `Tours`, `Gallery`, `FinalCta`), no es placeholder |
| `/destinations` | Sí | 61 | Real, con metadata SEO propia |
| `/destinations/[slug]` | Sí | 27 | Real, SSG (`getStaticProps`), 4 rutas generadas: galapagos, amazonia, andes-cultura, andes-naturaleza |
| `/tours` | **No existe** | — | Pendiente |
| `/tours/[id]` | **No existe** | — | Pendiente |
| `/contact` | **No existe** | — | Pendiente |
| `/experiences` | **No existe** | — | Pendiente |
| `/experiences/cruceros` | **No existe** | — | Pendiente |
| `/experiences/circuitos` | **No existe** | — | Pendiente |
| `/experiences/day-tours` | **No existe** | — | Pendiente |
| `/experiences/birdwatching` | **No existe** | — | Pendiente |
| `/gallery` | **No existe** | — | Pendiente |
| `/about` | **No existe** | — | Pendiente |
| `src/components/tours/` | — | — | Solo `README.md`, sin implementación (sin cambios) |
| `src/components/ui/` | — | — | **Ya no es solo README** — ahora tiene `ErrorCTAs.tsx`, `ErrorHeader.tsx`, `ErrorPageClient.tsx`, `ErrorQuickLinks.tsx`, `MegaMenuImage.tsx` implementados (avance real desde el snapshot) |

`npm run build` genera correctamente las 9 páginas estáticas actuales (home, destinations, 4 slugs, not-found) sin errores de compilación ni de tipos.

## 5. Backend

Sin cambios respecto al snapshot — sigue siendo únicamente estructura + intención:

- `backend/app/` contiene solo archivos `README.md` (uno por carpeta: `migrations/`, `migrations/versions/`, `models/`, `routers/`, `schemas/`, `services/`, `tests/`, y uno raíz). **Cero archivos `.py`.**
- `requirements.txt` **no existe** (solo hay `backend/.env.example`).
- `docker-compose.yml` **no existe** en absoluto (ni siquiera como placeholder).
- `migrations/versions/` solo tiene un `README.md`, ningún archivo Alembic generado.

## 6. CI/CD y deploy

- `.github/workflows/deploy.yml` sigue apuntando a **GitHub Pages** (`actions/checkout` → `setup-node@v4` con Node 20 fijado en CI → `npm ci` → `npm run generate:hero` → **`npm run lint`** → build → deploy a Pages).
- **Novedad no documentada:** el pipeline de CI ahora incluye un paso de `lint` explícito antes del build — esto no estaba en el snapshot y responde a la pregunta de la sección 7.
- No pude consultar el histórico de runs de GitHub Actions: la CLI `gh` no está instalada en este entorno. Para verificar si los últimos runs pasaron o fallaron, ejecuta tú:
  ```bash
  gh run list --workflow=deploy.yml --limit 10
  ```
- DNS/dominio de producción: no verificable desde el repo — revisión manual pendiente por tu parte (Cloudflare/registrador).

## 7. Tests y calidad

- **Sigue sin haber ningún test configurado.** Búsqueda de `*.test.*` / `*.spec.*` (excluyendo `node_modules`) no devuelve resultados. No hay `jest.config.*` ni `vitest.config.*`.
- `docs/DecisionesPendientes.md` (nuevo, ver §8) ya recoge esto como decisión abierta (DB-3: ¿añadir Vitest + Testing Library?) — sigue sin resolver.
- `next lint` **ahora sí está en el pipeline de CI** (ver §6) — esto es un cambio real desde el snapshot, aunque no hay tests unitarios/integración todavía.

## 8. Hallazgo no documentado: reorganización de documentación en curso

El `git status` muestra un cambio estructural importante **sin commitear**:

- Borrados (working tree, no en HEAD todavía): `CONVENTIONS.md`, `MASTER_PLAN.md`, `frontend/ARCHITECTURE.md`, `frontend/AUDIT_REPORT.md` (versión anterior), `frontend/OPTIMIZATION_PLAN.md`.
- Nuevos, sin trackear: `CLAUDE.md` (raíz) y una carpeta `docs/` completa con 13 ficheros (`CONTEXT.md`, `Frontend.md`, `Backend.md`, `ConventionsCode-Frontend.md`, `ConventionsStyle-Frontend.md`, `Errors-Frontend.md`, `Errors-Backend.md`, `ConventionsBackend.md`, `DecisionesPendientes.md`, `ZonaIntocable.md`, `Grafo.md`, `Trazabilidad-Frontend.md`, `Trazabilidad-Backend.md`, `Trazabilidad-Root.md`, y un directorio `historico/`), además de `.claude/`.
- Este nuevo sistema **ya documenta correctamente** varias de las decisiones abiertas que antes solo estaban en `MASTER_PLAN.md` (p. ej. la duda sobre GitHub Pages vs. Vercel está en `docs/DecisionesPendientes.md` como "DB-1", sin resolver).
- **No es deuda ni un error** — parece trabajo intencional de una sesión anterior que quedó a medio commitear. Como esta tarea es solo de lectura, lo dejo tal cual está; decide tú si quieres commitear esta reorganización antes de seguir.

## 9. Estado de git — detalle

- Working tree: `main`, sincronizada con `origin/main` (mismo commit, sin adelantos ni atrasos).
- Sin ramas locales con trabajo sin mergear: `docs/fase-5-conventions`, `refactor/fase-1-limpieza`, `refactor/fase-2-server-first`, `refactor/fase-4-datos-assets-bundle` — las 4 tienen **0 commits** por delante de `main` (ya mergeadas o vacías; candidatas a borrar si ya no se usan, pero eso es una decisión tuya, no la tomo aquí).
- Cambios sin commitear: la reorganización de docs (§8) más cambios menores en `.obsidian/graph.json` y `.obsidian/workspace.json` (metadata del vault de Obsidian, no código) y `graphify-out/PENDING_UPDATE.md`.

---

## 10. Recomendación de por dónde retomar

El estado real es mejor de lo que la deuda documentada hacía pensar: el código no se tocó en 4 meses, así que no hay regresión, solo desactualización de dependencias y una fase de "escaparate" (páginas) que sigue a medias. Orden sugerido:

**1. Cerrar cabos sueltos de git antes de escribir nada nuevo (10 min).**
Decide si commiteas la reorganización de `docs/`/`CLAUDE.md` (§8) — parece trabajo terminado y con valor, no un experimento a medias. Si la dejas sin commitear, cualquier trabajo nuevo se va a mezclar con ella en el próximo diff y será más difícil de revisar. Aprovecha para borrar las 4 ramas locales sin commits pendientes si confirmas que ya no las necesitas.

**2. Alinear el entorno y aplicar los fixes de seguridad no disruptivos (15-20 min).**
`nvm use` (o equivalente) para pasar de Node 24 a Node 20 según `.nvmrc`, y `npm audit fix` (sin `--force`) para resolver 5 de las 9 vulnerabilidades altas sin tocar `next`. Esto es barato, reversible, y evita que seguir escribiendo código nuevo sobre un entorno no soportado esconda bugs de compatibilidad más adelante.

**3. Decidir sobre la actualización mayor de `next` (14→16) — pero como decisión, no como ejecución inmediata.**
No lo hagas a ciegas: v16 es un salto de dos majors con breaking changes reales (afecta `eslint-config-next` también). Dado que el proyecto exporta estático y no corre servidor Next en producción, la urgencia real es menor de lo que sugiere el audit — pero cuanto más se espere, más grande será el salto. Recomiendo abrir esto como una tarea aislada con su propio build/smoke test, no mezclada con trabajo de páginas nuevas.

**4. Solo después de lo anterior, retomar las páginas pendientes (`/tours`, `/contact`, `/about`, `/gallery`, `/experiences/*`).**
Es la fase en la que estabas (documentada como DB-1/DB-2 en `docs/DecisionesPendientes.md`), y sigue bloqueada por las mismas decisiones abiertas de arquitectura (GitHub Pages vs. Vercel, backend operativo o no). Antes de escribir código de página nueva, esas dos decisiones bloqueantes deberían resolverse — si no, el riesgo es escribir `/tours` dos veces (estático primero, con llamada a API después).

**5. Arreglo puntual y de bajo riesgo, en paralelo o cuando haya un hueco: mega-menu.**
9 de 13 imágenes referenciadas en `assets.ts` siguen sin existir — es un bug visible en producción ahora mismo (roturas de imagen en el menú), aislado, no bloquea nada más, y no toca la zona intocable de `/destinations`. Buen candidato para una sesión corta independiente.

**No recomiendo** empezar por tests (DB-3) ni por el backend todavía — ambos son inversión real sin páginas que testear o servir. Tiene más sentido una vez el frontend esté completo y estable en dependencias.
