# Errors-Frontend.md — Manejo de errores (Frontend)

> El caso transversal "cuando algo va mal" en el cliente: error boundaries,
> errores de API, validación de formularios y notificaciones al usuario.

---

## Error boundaries (Next.js App Router)

- `src/app/error.tsx` → boundary global para errores de runtime (500).
- `src/app/not-found.tsx` → manejo de 404.
- Ambos delegan en `ErrorPageClient` con la prop `type: '404' | '500'`.

Mantén este patrón: los errores de página se canalizan por estos dos ficheros y
el componente `ErrorPageClient`, no con boundaries ad-hoc dispersos.

## Errores de API

Estado actual (lib/api.ts): las llamadas hacen `try/catch` **silencioso** y
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

## Validación de formularios

Aún no hay formularios implementados (`src/app/contact/` está vacío) y no hay
librería de validación instalada. **Decisión pendiente**: cuando se implemente
el formulario de contacto hay que elegir librería (p. ej. react-hook-form + Zod)
y documentar aquí el patrón de mensajes de error. No improvises una validación
manual sin proponer antes el enfoque.

## Notificaciones al usuario (toasts)

No hay sistema de toasts/notificaciones instalado. **Decisión pendiente**,
probablemente ligada al formulario de contacto. Cuando se añada, documenta aquí
su ubicación y cómo se disparan los mensajes de error.

## Logging / monitorización

No hay logging de cliente (sin Sentry ni similar). Si se añade observabilidad,
documéntala aquí.
