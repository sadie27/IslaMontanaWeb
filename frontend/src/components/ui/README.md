# components/ui/

Componentes de interfaz genéricos y reutilizables sin lógica de negocio.

## Estado

Pendiente de poblar. La carpeta existe como placeholder.

## Plan

Componentes a crear cuando se necesiten (no antes):
- `Button` — envuelve los estilos `.btn`, `.btn--primary`, `.btn--ghost` de `globals.css`
- `Card` — wrapper genérico con bordes y sombra
- `Input`, `Select` — para los formularios de contacto y filtros

## Reglas

- Sin imports de `lib/` ni llamadas a API
- Sin `'use client'` salvo que el componente maneje foco, estado propio de UI (ej. toggle, dropdown)
- Reutilizar variables CSS de `globals.css` (`--color-primary`, `--color-dark`, etc.) en lugar de valores hardcodeados
- Nunca pasar `#0d200c`, `#3aa023` u otros colores directamente como strings — usar `var(--color-dark)`, `var(--color-primary)`
