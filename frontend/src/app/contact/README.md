# app/contact/

Ruta `/contact` — formulario de contacto.

## Estado

**UI CREADA — FALTA BACKEND.** `page.tsx`, `ContactHero` y `ContactForm` ya
existen. El formulario valida en cliente (nombre, email, mensaje requeridos)
y muestra un mensaje de éxito, pero **no envía nada todavía**: no hay
`POST /api/contact` porque el backend FastAPI no está implementado (ver
`docs/Backend.md`). Ver el `TODO` en `ContactForm.tsx`.

Esta ruta está referenciada en:
- El botón "Contáctanos" de la Navbar y el drawer móvil
- Los CTAs de todos los destinos implementados (galapagos, amazonia, andes-cultura, andes-naturaleza)
- El componente `TourCard` (botón "Consultar")
- El Footer

## Plan pendiente

- Conectar el envío del formulario a `POST /api/contact` cuando el backend exista
- Persistir/enviar el mensaje (email al equipo, o guardarlo en BD)
- Confirmar con el cliente el número de WhatsApp y email reales (ver TODO en `src/data/footer.ts`)

## Campos del formulario (ya implementados)

- Nombre
- Email
- Teléfono (opcional)
- Destino de interés (selector, poblado desde `src/data/destinations.ts`)
- Mensaje / consulta
