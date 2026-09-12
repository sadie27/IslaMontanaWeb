import { ABOUT_HISTORY } from '@/data/about'

export default function AboutHistory() {
  return (
    <section className="about-history">
      <div className="about-history__inner">
        <div>
          <p className="about-history__label">{ABOUT_HISTORY.eyebrow}</p>
          <h2 className="about-history__title">{ABOUT_HISTORY.title}</h2>
          <p className="about-history__body">{ABOUT_HISTORY.body}</p>
        </div>

        <div className="about-history__milestone">
          <span className="about-history__milestone-value">{ABOUT_HISTORY.milestone.value}</span>
          <span className="about-history__milestone-label">{ABOUT_HISTORY.milestone.label}</span>
        </div>
      </div>
    </section>
  )
}
