/* ─── ContactSteps.tsx — Server Component ──────────────────────
   Explica qué ocurre tras enviar el formulario. Reduce el abandono:
   nadie escribe a una agencia sin saber a qué se está exponiendo. */

const STEPS = [
  {
    n: '1',
    title: 'Nos escribes',
    desc: 'Con lo que sepas: unas fechas aproximadas y cuántos sois ya nos sirve para empezar a mirar barcos y disponibilidad.',
  },
  {
    n: '2',
    title: 'Te respondemos en 24-48 h',
    desc: 'Te escribe Irene o Luis. Si lo que pides no nos cuadra — fechas imposibles, demasiado apretado — te lo decimos antes de mandarte nada.',
  },
  {
    n: '3',
    title: 'Ajustamos hasta que encaje',
    desc: 'Te mandamos una propuesta con el precio desglosado y la cambiamos las veces que haga falta. Es la parte más larga y la que más vale la pena: aquí es donde un viaje genérico se convierte en el tuyo.',
  },
  {
    n: '4',
    title: 'Reservas si quieres',
    desc: 'Hasta aquí no has pagado nada.',
  },
]

export default function ContactSteps() {
  return (
    <section className="contact-steps" aria-label="Cómo funciona">
      <div className="contact-steps__inner">
        <h2 className="contact-steps__title">Qué pasa cuando nos escribes</h2>
        <ol className="contact-steps__list">
          {STEPS.map((step) => (
            <li key={step.n} className="contact-step">
              <span className="contact-step__num" aria-hidden="true">{step.n}</span>
              <div>
                <h3 className="contact-step__title">{step.title}</h3>
                <p className="contact-step__desc">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
