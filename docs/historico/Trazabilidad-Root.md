> ⚠️ **Documento histórico (junio 2026).** El contenido de este fichero ha sido
> migrado a `CHANGELOG.md` en la raíz del repo, donde el registro pasa a ser
> **opcional/recomendado** en lugar de obligatorio por prompt. Este fichero se
> conserva como referencia del estado anterior.

# Trazabilidad-Root — Log de cambios transversales

> Log de cambios **transversales**: infra, configuración global, dependencias
> compartidas y cualquier cambio que toque frontend y backend a la vez.
> Los cambios solo-frontend van en `Trazabilidad-Frontend.md`; los solo-backend
> en `Trazabilidad-Backend.md`. Logs **independientes**: no se duplican entradas.

**Cómo registrar:** al final de cada prompt que modifique algo transversal, añade
**una línea por cambio**, la más reciente **arriba del todo** de la lista.

**Plantilla:**

```
- AAAA-MM-DD · <tipo> · <descripción breve> · Ficheros: <a, b, c> · Ticket: <id o ->
```

`<tipo>`: `feat` · `fix` · `refactor` · `chore` · `perf` · `ci` · `docs`.
Si no hay ticket asociado, usa `-`.

---

## Entradas

- 2026-06-11 · fix · Corrige hooks SessionStart/Stop: scripts movidos a .claude/hooks/*.ps1 y llamados con -File (evita el mangling de bash) · Ficheros: .claude/settings.local.json, .claude/hooks/session-start.ps1, .claude/hooks/stop.ps1 · Ticket: -
- 2026-06-11 · docs · Se completa ConventionsCode-Frontend (dynamic imports, composición, hooks, props, colocación de datos); se añade D-09 al informe de discrepancias (paleta Tailwind vs tokens CSS) · Ficheros: docs/ConventionsCode-Frontend.md, docs/historico/DISCREPANCIAS.md · Ticket: -
- 2026-06-11 · docs · Se construye el sistema de documentación de contexto y se archiva el histórico: ZonaIntocable, DecisionesPendientes, discrepancias, CONTEXT.md y Frontend.md actualizados · Ficheros: docs/CONTEXT.md, docs/ZonaIntocable.md, docs/DecisionesPendientes.md, docs/Frontend.md, docs/historico/* · Ticket: -
- 2026-06-11 · docs · Se crea el sistema de documentación de contexto (CLAUDE.md + docs/) · Ficheros: CLAUDE.md, docs/* · Ticket: -
