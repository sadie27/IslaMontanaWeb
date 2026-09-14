/* ─── PlanGalapagos.tsx — Server Component ─────────────────────
   Responde las cuatro dudas que frenan la decisión de ir a Galápagos.
   Sin estas respuestas el visitante se va a resolverlas a Google y
   muchas veces no vuelve. */

import Link from 'next/link'
import { ROUTES } from '@/config/routes'

const PLAN_ITEMS = [
  {
    q: '¿Crucero o dormir en las islas?',
    a: 'Esta es la decisión que más condiciona el viaje, y casi nadie la tiene clara al escribirnos. El crucero es la única forma de llegar a Fernandina y al oeste de Isabela, donde no vive nadie y está la fauna que sale en los documentales. A cambio duermes a bordo, sigues un itinerario cerrado y cuesta bastante más. Con base en Santa Cruz o Isabela pagas bastante menos y decides cada mañana qué hacer, aunque hay islas que no verás. Si solo vas a venir una vez en tu vida, nosotros tiramos al crucero.',
  },
  {
    q: '¿Cuántos días necesito?',
    a: 'De 5 a 8 en las islas. Con menos de 4 se te va medio viaje en vuelos y traslados. Suma 3 o 4 por cada región del continente que quieras añadir.',
  },
  {
    q: '¿Cuándo es mejor ir?',
    a: 'Cualquier mes es bueno; lo que cambia es qué ves. De diciembre a mayo el mar está más cálido y calmado y el snorkel es mejor. De junio a noviembre entra la corriente fría: hay ballenas y las aves marinas están mucho más activas. Nadie te va a decir que hay una mala época, porque no la hay.',
  },
  {
    q: '¿De qué depende el precio?',
    a: 'Del barco o el alojamiento, y de los días. Ojo con una cosa: los vuelos desde Quito o Guayaquil y la entrada al Parque Nacional van aparte y no son menores. Te los desglosamos desde la primera propuesta, porque es donde la gente se lleva el susto.',
  },
]

export default function PlanGalapagos() {
  return (
    <section className="plan-gal" aria-label="Cómo planificar tu viaje a Galápagos">
      <div className="plan-gal__inner">
        <div className="plan-gal__header">
          <h2 className="plan-gal__title">
            <span className="plan-gal__title-lead">Antes de decidir</span>
            Lo que casi todo el mundo nos pregunta.
          </h2>
          <p className="plan-gal__intro">
            Si es tu primera vez en Galápagos, estas cuatro dudas son siempre las
            mismas. Te las respondemos aquí para que llegues con criterio — y si
            quieres afinarlo con tu caso, nos escribes. Vayas por la fotografía,
            por el snorkel o por la fauna, el viaje no se arma igual.
          </p>
        </div>

        <ul className="plan-gal__grid" role="list">
          {PLAN_ITEMS.map((item) => (
            <li key={item.q} className="plan-gal__item">
              <h3 className="plan-gal__q">{item.q}</h3>
              <p className="plan-gal__a">{item.a}</p>
            </li>
          ))}
        </ul>

        <div className="plan-gal__footer">
          <Link href={ROUTES.CONTACT} className="btn btn--primary">
            Resolver mis dudas →
          </Link>
        </div>
      </div>
    </section>
  )
}
