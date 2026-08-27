import { ROUTES } from "@/config/routes"
import type { FooterLink, SocialLink } from "@/lib/types"

// TODO: /privacy no existe todavía como ruta. Cuando se cree, añadir aquí
// y renderizar el link en Footer.tsx (ver footer__nav en FooterNav.tsx).
export const FOOTER_NAV_LINKS: FooterLink[] = [
  { label: "Inicio",       href: ROUTES.HOME },
  { label: "Destinos",     href: ROUTES.DESTINATIONS },
  { label: "Experiencias", href: ROUTES.EXPERIENCES },
  { label: "Galería",      href: ROUTES.GALLERY },
  { label: "Nosotros",     href: ROUTES.ABOUT },
]

// TODO: URLs reales de redes sociales pendientes de confirmar por el cliente.
export const FOOTER_SOCIAL_LINKS: SocialLink[] = [
  { label: "Facebook", href: "https://www.facebook.com/", icon: "facebook" },
  { label: "WhatsApp",  href: "https://wa.me/", icon: "whatsapp" },
]

export const FOOTER_CTA = {
  title: "¡Tu próxima aventura!",
  subtitle: "¿Listo para descubrir las Islas Galápagos?",
  buttonLabel: "¡Contáctanos!",
  href: ROUTES.CONTACT,
}
