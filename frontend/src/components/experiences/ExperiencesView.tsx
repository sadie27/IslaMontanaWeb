"use client"

import { useMemo, useState } from "react"
import TourCard from "@/components/home/TourCard"
import { EXPERIENCES, EXPERIENCE_CATEGORIES, type ExperienceCategory } from "@/data/experiences"

type FilterValue = ExperienceCategory | "todos"

export default function ExperiencesView() {
  const [filter, setFilter] = useState<FilterValue>("todos")

  const filteredExperiences = useMemo(() => {
    if (filter === "todos") return EXPERIENCES
    return EXPERIENCES.filter((exp) => exp.category === filter)
  }, [filter])

  return (
    <>
      <div className="experiences-note">
        <div className="experiences-note__inner">
          <span className="experiences-note__icon" aria-hidden="true">✎</span>
          <p className="experiences-note__text">
            Los precios y los días se ajustan a lo que necesites.
            <strong> Dinos cuál te encaja</strong> y lo adaptamos contigo, o lo armamos desde cero.
          </p>
        </div>
      </div>

      <div className="experiences-filters">
        <div className="experiences-filters__inner">
          <button
            type="button"
            className={[
              "experiences-filters__btn",
              filter === "todos" ? "experiences-filters__btn--active" : "",
            ].join(" ")}
            onClick={() => setFilter("todos")}
            aria-pressed={filter === "todos"}
          >
            Todas
          </button>
          {EXPERIENCE_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              className={[
                "experiences-filters__btn",
                filter === cat.value ? "experiences-filters__btn--active" : "",
              ].join(" ")}
              onClick={() => setFilter(cat.value)}
              aria-pressed={filter === cat.value}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="experiences-grid">
        {filteredExperiences.length === 0 ? (
          <p className="experiences-grid__empty">No hay experiencias en esta categoría todavía.</p>
        ) : (
          <ul className="experiences-grid__inner" role="list">
            {filteredExperiences.map((exp) => (
              <li key={exp.id}>
                <TourCard tour={exp} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
