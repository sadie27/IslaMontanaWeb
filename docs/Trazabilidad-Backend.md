# Trazabilidad-Backend — Log de cambios de Backend

> Log de cambios que afectan **solo al backend** (`backend/`). Los cambios
> transversales van en `Trazabilidad-Root.md`; los de frontend en
> `Trazabilidad-Frontend.md`. Log **independiente**.

**Cómo registrar:** al final de cada prompt que modifique backend, añade
**una línea por cambio**, la más reciente **arriba del todo** de la lista.

**Plantilla:**

```
- AAAA-MM-DD · <tipo> · <descripción breve> · Ficheros: <a, b, c> · Ticket: <id o ->
```

`<tipo>`: `feat` · `fix` · `refactor` · `chore` · `perf` · `ci` · `docs`.
Si no hay ticket asociado, usa `-`.

**Ejemplo:**

```
- 2026-06-11 · feat · Implementa router y service de destinations (GET /destinations) · Ficheros: backend/app/routers/destinations.py, backend/app/services/destination_service.py · Ticket: -
```

---

## Entradas

<!-- Añade aquí la entrada más reciente arriba del todo -->
