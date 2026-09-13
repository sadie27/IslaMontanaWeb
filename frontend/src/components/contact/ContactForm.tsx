'use client'

import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import { CONTACT_DESTINATION_OPTIONS } from '@/data/contact'
import { FOOTER_SOCIAL_LINKS } from '@/data/footer'

export default function ContactForm() {
  const searchParams = useSearchParams()
  const tourId = searchParams.get('tour')

  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim()
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim()
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim()

    if (!name || !email || !message) {
      setError('Completa nombre, email y mensaje para poder responderte.')
      return
    }

    // TODO: conectar con POST /api/contact cuando el backend FastAPI exista
    // (ver src/app/contact/README.md). Por ahora el formulario solo confirma
    // el envío en el cliente, sin persistir ni enviar el mensaje.
    setError(null)
    setSubmitted(true)
  }

  const whatsapp = FOOTER_SOCIAL_LINKS.find((l) => l.icon === 'whatsapp')

  if (submitted) {
    return (
      <div className="contact-form__success" role="status">
        <p className="contact-form__success-title">¡Mensaje recibido!</p>
        <p className="contact-form__success-body">
          Gracias por escribirnos. Te responderemos lo antes posible para
          preparar tu viaje a Galápagos.
        </p>
      </div>
    )
  }

  return (
    <>
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className="contact-form__row">
          <div className="contact-form__field">
            <label className="contact-form__label" htmlFor="name">Nombre</label>
            <input className="contact-form__input" type="text" id="name" name="name" autoComplete="name" />
          </div>
          <div className="contact-form__field">
            <label className="contact-form__label" htmlFor="email">Email</label>
            <input className="contact-form__input" type="email" id="email" name="email" autoComplete="email" />
          </div>
        </div>

        <div className="contact-form__row">
          <div className="contact-form__field">
            <label className="contact-form__label" htmlFor="phone">
              Teléfono <span className="contact-form__optional">(opcional)</span>
            </label>
            <input className="contact-form__input" type="tel" id="phone" name="phone" autoComplete="tel" />
          </div>
          <div className="contact-form__field">
            <label className="contact-form__label" htmlFor="destination">Destino de interés</label>
            <select
              className="contact-form__select"
              id="destination"
              name="destination"
              defaultValue={tourId ? 'galapagos' : ''}
            >
              {CONTACT_DESTINATION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="message">Mensaje</label>
          <textarea
            className="contact-form__textarea"
            id="message"
            name="message"
            placeholder="Cuéntanos tus fechas, cuántas personas viajan y qué te gustaría vivir en Ecuador."
            defaultValue={tourId ? `Estoy interesado/a en el tour "${tourId}". ` : ''}
          />
        </div>

        {error && <p className="contact-form__error">{error}</p>}

        <button type="submit" className="btn btn--primary contact-form__submit">
          Enviar mensaje →
        </button>
        <p className="contact-form__note">Sin costo ni compromiso — solo te ayudamos a planificar tu viaje.</p>
      </form>

      <div className="contact-direct">
        <span className="contact-direct__label">O escríbenos directo</span>
        <div className="contact-direct__links">
          {whatsapp && (
            <a className="contact-direct__link" href={whatsapp.href} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          )}
        </div>
      </div>
    </>
  )
}
