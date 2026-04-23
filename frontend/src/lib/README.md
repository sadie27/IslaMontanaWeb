# lib/

Utilidades y tipos compartidos que no son componentes React.

## Archivos actuales

### `types.ts`

Tipos TypeScript compartidos entre Server y Client Components:

```ts
SubItem   // card del mega-menu: label, description, href, image
NavItem   // enlace de navegación: label, href, subItems[]
```

Importar siempre desde aquí. No redefinir estos tipos en componentes individuales.

**Pendiente:** Añadir el tipo `Tour` una vez definida la respuesta del backend `GET /api/tours`.

## Archivos pendientes

| Archivo | Contenido previsto |
|---|---|
| `api.ts` | Cliente HTTP + funciones para llamadas al backend FastAPI |
| `utils.ts` | Helpers: formateo de fechas, precios, slugs |
| `constants.ts` | Constantes de la aplicación (nombre de marca, URLs base, etc.) |

## Convención

Las funciones de fetch del servidor (como `getNavMenuData` en `layout.tsx`) deberían moverse aquí cuando crezcan en número o complejidad, para mantener `layout.tsx` limpio.

**Sobre el nombre de marca:** Usar siempre "Islamontana Travel" como string de marca (no "Isla Montaña"). Si se crea `constants.ts`, centralizar ahí: `export const BRAND_NAME = 'Islamontana Travel'`.
