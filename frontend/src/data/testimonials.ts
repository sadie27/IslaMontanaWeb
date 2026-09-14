import type { Testimonial } from '@/lib/types'

/*
 * TESTIMONIOS — PENDIENTE DE RELLENAR
 * -----------------------------------
 * Este array está vacío a propósito. La sección de testimonios NO se renderiza
 * mientras no haya al menos uno, así que la web no muestra ningún hueco ni
 * ningún testimonio inventado.
 *
 * Para activarla, añade entradas con datos REALES (reseñas de Google,
 * TripAdvisor, emails o WhatsApp de clientes que hayan dado su permiso):
 *
 *   {
 *     quote: 'Cita literal del cliente, 1-3 frases. Mejor si menciona algo
 *             concreto (un guía, un momento, un cambio de plan bien resuelto)
 *             que si solo dice "todo genial".',
 *     name: 'Nombre y apellido o inicial',
 *     origin: 'Madrid, España',      // ciudad/país: aporta credibilidad
 *     trip: 'Galápagos, 8 días',     // qué viaje hizo
 *     date: 'marzo 2025',            // opcional
 *   }
 *
 * Prioriza testimonios que hablen de: trato cercano/personalización, la
 * experiencia en Galápagos, y cómo resolvisteis algún imprevisto. Esos son
 * los tres argumentos que sostiene el resto de la web.
 */
export const TESTIMONIALS: Testimonial[] = []
