"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import type { SubItem } from "@/lib/types"
import MegaMenuImage from "@/components/ui/MegaMenuImage"

const FALLBACK_COLORS: Record<string, string> = {
  "/images/mega-menu/amazonia.webp":         "#0a1f08",
  "/images/mega-menu/andes-cultura.webp":    "#1a0e06",
  "/images/mega-menu/andes-naturaleza.webp": "#060d1a",
  "/images/mega-menu/cruceros.webp":         "#061520",
  "/images/mega-menu/circuitos.webp":        "#0d200c",
  "/images/mega-menu/day-tours.webp":        "#1a1506",
  "/images/mega-menu/birdwatching.webp":     "#0a1f08",
  "/images/mega-menu/gallery-fauna.webp":    "#0a1f08",
  "/images/mega-menu/gallery-paisajes.webp": "#061520",
  "/images/mega-menu/gallery-cultura.webp":  "#1a0e06",
  "/images/mega-menu/gallery-aventura.webp": "#0d200c",
}

interface MegaMenuProps {
  items: SubItem[]
  isOpen: boolean
  parentLabel: string
  onMouseEnter: () => void
  onMouseLeave: () => void
}

function MenuCard({ item, tabIndex, isTablet }: { item: SubItem; tabIndex: number; isTablet: boolean }) {
  const [hovered, setHovered] = useState(false)

  // En tablet (220px) el offset vertical es menor: mitad=110px, bottom-16px → +66px
  // En desktop (299px): mitad=149.5px, bottom-16px → +98px
  const labelTransformRest = isTablet
    ? "translate(calc(-50% - 60px), calc(-50% + 66px))"
    : "translate(calc(-50% - 80px), calc(-50% + 98px))"

  return (
    <Link
      href={item.href}
      className="mega-menu__card relative overflow-hidden cursor-pointer block"
      tabIndex={tabIndex}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Imagen: solo transform + filter — GPU compositor */}
      <MegaMenuImage
        src={item.image}
        alt={item.label}
        fallbackColor={FALLBACK_COLORS[item.image] ?? "#0d200c"}
        style={{
          willChange: "transform, filter",
          transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1), filter 0.4s ease-out",
          transform: hovered ? "scale(1.06) translateZ(0)" : "scale(1) translateZ(0)",
          filter: hovered ? "blur(3px) brightness(0.75)" : "blur(0px) brightness(1)",
        }}
      />

      {/* Texto: anclado al centro de la card, desplazado a bottom-left con transform */}
      <div
        className="mega-menu__label"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          willChange: "transform",
          transition: "transform 0.42s cubic-bezier(0.16,1,0.3,1)",
          transform: hovered
            ? "translate(-50%, -50%)"
            : labelTransformRest,
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <p
          style={{
            color: "white",
            fontWeight: "700",
            lineHeight: "1.2",
            textShadow: "0 2px 16px rgba(0,0,0,0.95)",
            whiteSpace: "nowrap",
            willChange: "transform",
            transition: "transform 0.42s cubic-bezier(0.16,1,0.3,1)",
            transform: hovered ? "scale(1.5)" : "scale(1)",
            display: "inline-block",
            fontSize: "1rem",
            letterSpacing: "0.04em",
          }}
        >
          {item.label}
        </p>
      </div>
    </Link>
  )
}

export default function MegaMenu({
  items,
  isOpen,
  parentLabel,
  onMouseEnter,
  onMouseLeave,
}: MegaMenuProps) {
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px) and (max-width: 1023px)')
    setIsTablet(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsTablet(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  if (items.length === 0) return null

  return (
    <div
      role="region"
      aria-label={`Submenu de ${parentLabel}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={[
        "fixed left-0 right-0 z-40 bg-white overflow-hidden",
        "transition-all duration-[220ms]",
        isOpen
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none",
      ].join(" ")}
      style={{ top: "70px" }}
    >
      <div className="mega-menu__grid w-full" style={{ contain: "layout style" }}>
        {items.map((item) => (
          <MenuCard key={item.href} item={item} tabIndex={isOpen ? 0 : -1} isTablet={isTablet} />
        ))}
      </div>
      <div
        style={{
          height: "4px",
          background: "#abd430",
          opacity: 0.25,
          width: "100%",
        }}
      />
    </div>
  )
}
