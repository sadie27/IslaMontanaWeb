import { Suspense } from 'react'
import ContactHero from '@/components/contact/ContactHero'
import ContactForm from '@/components/contact/ContactForm'
import ContactSteps from '@/components/contact/ContactSteps'

// Keyword primaria: "contacto agencia de viajes Ecuador"
const title = 'Contacto — Agencia de Viajes en Ecuador | Islamontana'
const description =
  'Escríbenos para planificar tu viaje a Galápagos, la Amazonía o los Andes. Te responde personalmente nuestro equipo con un itinerario a medida, sin coste ni compromiso.'

export const metadata = {
  title,
  description,
  alternates: { canonical: '/contact' },
  openGraph: { title, description, url: '/contact' },
  twitter: { title, description },
}

function ContactFormSkeleton() {
  return <div className="contact-form" style={{ minHeight: 420 }} />
}

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <section className="contact-section">
        <div className="contact-section__inner">
          <Suspense fallback={<ContactFormSkeleton />}>
            <ContactForm />
          </Suspense>
        </div>
      </section>
      {/* Explica el proceso tras enviar: baja la barrera de escribir. */}
      <ContactSteps />
    </>
  )
}
