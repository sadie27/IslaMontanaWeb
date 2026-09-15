# CHANGELOG.md — Log de cambios transversales

> Log **opcional** (recomendado, no obligatorio) de cambios transversales:
> infra, configuración global, dependencias compartidas y cualquier cambio que
> toque frontend y backend a la vez. Para el historial completo y detallado,
> `git log` es la fuente autoritativa; este fichero es un resumen legible de
> alto nivel para lo que vale la pena destacar.

**Cómo registrar (recomendado):** al terminar un cambio transversal
significativo, añade **una línea por cambio**, la más reciente **arriba del
todo** de la lista.

**Plantilla:**

```
- AAAA-MM-DD · <tipo> · <descripción breve> · Ficheros: <a, b, c> · Ticket: <id o ->
```

`<tipo>`: `feat` · `fix` · `refactor` · `chore` · `perf` · `ci` · `docs`.
Si no hay ticket asociado, usa `-`.

---

## Entradas

- 2026-09-15 · refactor · Las páginas de destino pasan a usar el TourCard y el BEM de la landing: se elimina la sección de tours con 4 tabs de categoría (con el catálogo actual solo mostraba categorías vacías) y se sustituye por "Experiencias en este destino", máximo 3 cards leídas de HOME_TOURS vía el nuevo helper getToursByDestination. Se borra destinations/TourCard.tsx (card duplicada de estilos inline) y el campo `tours` de destinations.ts queda sin consumir. Se añade el modificador .tours__grid--fit para que un destino con 1 o 2 experiencias no deje columnas vacías · Ficheros: frontend/src/components/destinations/Tours.tsx, frontend/src/components/destinations/TourCard.tsx, frontend/src/data/experiences.ts, frontend/src/styles/home.css, frontend/src/components/README.md, frontend/src/components/tours/README.md, frontend/src/app/tours/README.md · Ticket: -
- 2026-06-11 · docs · Se consolida el sistema de documentación de 15 a 6 ficheros activos: se fusiona Errors-Frontend en DecisionesPendientes, se fusionan Backend/ConventionsBackend/Errors-Backend en un único Backend.md, se reduce Grafo.md a una referencia en CONTEXT.md, se eliminan los logs de trazabilidad vacíos y Trazabilidad-Root se convierte en este CHANGELOG.md opcional. Al archivar Grafo.md se detectó que el hook Stop (`.claude/hooks/stop.ps1`) tenía dos referencias de texto estático a `docs/Grafo.md` (no lo leía como contenido, solo lo citaba como puntero); se corrigieron para apuntar a la skill `graphify` en su lugar — precedente para futuras migraciones de docs: revisar también scripts/hooks, no solo el markdown cruzado · Ficheros: docs/DecisionesPendientes.md, docs/Backend.md, docs/CONTEXT.md, CHANGELOG.md, .claude/hooks/stop.ps1 · Ticket: -
- 2026-06-11 · fix · Corrige hooks SessionStart/Stop: scripts movidos a .claude/hooks/*.ps1 y llamados con -File (evita el mangling de bash) · Ficheros: .claude/settings.local.json, .claude/hooks/session-start.ps1, .claude/hooks/stop.ps1 · Ticket: -
- 2026-06-11 · docs · Se completa ConventionsCode-Frontend (dynamic imports, composición, hooks, props, colocación de datos); se añade D-09 al informe de discrepancias (paleta Tailwind vs tokens CSS) · Ficheros: docs/ConventionsCode-Frontend.md, docs/historico/DISCREPANCIAS.md · Ticket: -
- 2026-06-11 · docs · Se construye el sistema de documentación de contexto y se archiva el histórico: ZonaIntocable, DecisionesPendientes, discrepancias, CONTEXT.md y Frontend.md actualizados · Ficheros: docs/CONTEXT.md, docs/ZonaIntocable.md, docs/DecisionesPendientes.md, docs/Frontend.md, docs/historico/* · Ticket: -
- 2026-06-11 · docs · Se crea el sistema de documentación de contexto (CLAUDE.md + docs/) · Ficheros: CLAUDE.md, docs/* · Ticket: -
