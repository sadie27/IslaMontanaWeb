# components/layout/

Componentes estructurales presentes en todas las páginas. Se montan desde `app/layout.tsx`.

## Archivos

### `Navbar.tsx` — `'use client'`

Barra de navegación fija. Recibe `navData: NavItem[]` como prop desde el Server Component padre.

Comportamiento:
- Transparente en scroll = 0 sin mega-menu abierto
- Fondo blanco (`navbar--scrolled`) al hacer scroll > 30px **o** al abrir cualquier mega-menu
- Mobile: hamburguesa con drawer lateral + acordeón por sección

Estado interno:
- `scrolled` — detectado via `scroll` event listener
- `activeMenu` — label del mega-menu abierto (`null` = ninguno)
- `mobileMenuOpen` / `mobileExpanded` — estado del drawer mobile

Hover logic:
- `openMenu(label)` — limpia el timer de cierre y setea `activeMenu`
- `closeMenu()` — timer de 150ms antes de setear `null` (evita parpadeo al cruzar al panel)
- Mismos callbacks pasados a `<MegaMenu>` para que el panel también los use

---

### `MegaMenu.tsx` — `'use client'`

Panel de mega-menu full-width. `fixed`, `top: 70px`, `z-40`.

Props: `items`, `isOpen`, `parentLabel`, `onMouseEnter`, `onMouseLeave`

Animación del panel: `opacity` + `translateY` con CSS transition 220ms. `pointer-events-none` cuando cerrado.

Sub-componente interno `MenuCard`:
- Cada card tiene su propio `useState(hovered)`
- Imagen: `transform scale + filter blur` — solo propiedades GPU compositor, sin layout recalc
- Texto: anclado al centro del card con `top: 50%, left: 50%`, desplazado a bottom-left con `transform: translate(calc(-50% - 80px), calc(-50% + 98px))`. En hover vuelve a `translate(-50%, -50%)` = centro exacto
- Tamaño del texto crece con `transform: scale(1.5)` en el `<p>`, nunca con `font-size`
- `willChange: 'transform, filter'` en imagen; `contain: 'layout style'` en el grid

Franja decorativa lima (`#abd430`, `opacity: 0.25`, `4px`) al pie del panel.

**Bug conocido:** `unoptimized={true}` desactiva la optimización de Next.js Image. Se dejó temporalmente para evitar errores con imágenes faltantes. Eliminar cuando todos los archivos de `public/images/mega-menu/` estén presentes.

---

### `Footer.tsx`

Footer de marca. Server Component (sin estado). Estilos via clases BEM `.footer__*` en `globals.css`.

**Nota:** El Footer contiene un enlace a `/contact` (línea 20). Mientras esa ruta no esté implementada, el enlace genera un 404.

## Clases CSS

Todos los estilos de Navbar y Footer están en `src/styles/globals.css` bajo las secciones `NAVBAR` y `FOOTER`. No hay CSS Modules ni archivos de estilo separados por componente. MegaMenu usa Tailwind utilities directamente con algunos `style` inline para animaciones GPU.
