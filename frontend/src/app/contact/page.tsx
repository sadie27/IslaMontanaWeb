import { Suspense } from 'react'
import ContactHero from '@/components/contact/ContactHero'
import ContactForm from '@/components/contact/ContactForm'

export const metadata = {
  title: 'Contáctanos — Islamontana Travel',
  description:
    'Escríbenos para planificar tu viaje a Galápagos, la Amazonía o los Andes de Ecuador. Te respondemos con un itinerario a medida.',
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
    </>
  )
}
