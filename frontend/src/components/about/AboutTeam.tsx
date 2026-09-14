import Image from 'next/image'
import { TEAM_MEMBERS } from '@/data/about'

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function AboutTeam() {
  return (
    <section className="about-team">
      <div className="about-team__inner">
        <h2 className="about-team__title">
          <span className="about-team__title-lead">Nuestro equipo</span>
          Quienes van a contestar tu mensaje.
        </h2>

        <ul className="about-team__grid" role="list">
          {TEAM_MEMBERS.map((member) => (
            <li key={member.name} className="team-card">
              <span
                className="team-card__avatar"
                style={{ background: member.placeholderBg }}
                aria-hidden="true"
              >
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt=""
                    width={140}
                    height={140}
                    className="team-card__avatar-photo"
                  />
                ) : (
                  initials(member.name)
                )}
              </span>
              <div>
                <h3 className="team-card__name">{member.name}</h3>
                <p className="team-card__role">{member.role}</p>
              </div>
              <p className="team-card__bio">{member.bio}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
