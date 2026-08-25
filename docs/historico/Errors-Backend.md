> ⚠️ **Documento histórico (junio 2026).** La fuente activa es `docs/`. El
> contenido de este fichero ha sido migrado a la sección "Manejo de errores
> previsto" de `docs/Backend.md`. Este fichero se conserva como referencia
> del estado anterior.

# Errors-Backend.md — Manejo de errores (Backend)

> El caso transversal "cuando algo va mal" en el servidor: excepciones de
> dominio, formato de respuesta de error, status HTTP y logging. Reglas
> **previstas** (backend aún sin código): defínelas al implementar y documenta
> aquí las decisiones reales.

---

## Flujo de errores (intención documentada)

Según la arquitectura prevista: los **services lanzan excepciones de dominio** y
los **routers las capturan** y las traducen a respuesta HTTP. Mantén esa
dirección: la lógica de negocio no construye respuestas HTTP; el router sí.

## Decisiones pendientes (definir al implementar y documentar aquí)

- **Jerarquía de excepciones de dominio:** crear excepciones propias (p. ej.
  `NotFoundError`, `ValidationError`, `ConflictError`) en un módulo común, en
  lugar de lanzar `HTTPException` desde los services.
- **Formato único de respuesta de error:** FastAPI por defecto devuelve
  `{ "detail": "mensaje" }`. Decidir si se personaliza a un formato propio
  (p. ej. `{ "error": { "code": ..., "message": ... } }`) y aplicarlo de forma
  consistente vía exception handlers globales.
- **Mapeo a status HTTP:** definir la correspondencia excepción de dominio →
  código HTTP en un único punto (exception handlers / middleware), no repartido
  por los routers.
- **Logging y observabilidad:** elegir librería y niveles; incluir un
  identificador de correlación (trace id) por petición.

## Regla de coherencia con el frontend

El frontend espera contratos estables (`frontend/src/types/api.ts`). Si cambias
el formato de error, coordínalo con el manejo de errores de cliente descrito en
`Errors-Frontend.md`.
