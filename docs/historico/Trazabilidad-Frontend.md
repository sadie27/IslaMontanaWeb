> ⚠️ **Documento histórico (junio 2026).** La fuente activa es `docs/`. Este log
> estaba vacío (solo plantilla, cero entradas reales) — `git log` cubre lo
> mismo sin mantenimiento manual. La obligación de registrar trazabilidad por
> prompt se ha eliminado de `docs/CONTEXT.md`. Este fichero se conserva como
> referencia del estado anterior.

# Trazabilidad-Frontend — Log de cambios de Frontend

> Log de cambios que afectan **solo al frontend** (`frontend/`). Los cambios
> transversales van en `Trazabilidad-Root.md`; los de backend en
> `Trazabilidad-Backend.md`. Log **independiente**.

**Cómo registrar:** al final de cada prompt que modifique frontend, añade
**una línea por cambio**, la más reciente **arriba del todo** de la lista.

**Plantilla:**

```
- AAAA-MM-DD · <tipo> · <descripción breve> · Ficheros: <a, b, c> · Ticket: <id o ->
```

`<tipo>`: `feat` · `fix` · `refactor` · `chore` · `perf` · `ci` · `docs`.
Si no hay ticket asociado, usa `-`.

**Ejemplo:**

```
- 2026-06-11 · fix · Corrige mapRegion para usar la región real del destino · Ficheros: src/lib/adapters.ts · Ticket: -
```

---

## Entradas

<!-- Añade aquí la entrada más reciente arriba del todo -->
