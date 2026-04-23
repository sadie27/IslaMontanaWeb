"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import MegaMenu from "./MegaMenu"
import type { NavItem } from "@/lib/types"

interface NavbarProps {
  navData: NavItem[]
}

export default function Navbar({ navData }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [isTablet, setIsTablet] = useState(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openMenu = useCallback((label: string) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setActiveMenu(label)
  }, [])

  const closeMenu = useCallback(() => {
    closeTimerRef.current = setTimeout(() => {
      setActiveMenu(null)
      closeTimerRef.current = null
    }, 150)
  }, [])

  const toggleTabletDropdown = useCallback((label: string) => {
    setActiveMenu((prev) => (prev === label ? null : label))
  }, [])

  useEffect(() => {
    // Usa el menú táctil (dropdown) si el dispositivo no tiene hover real
    // (cubre tablets, iPads en portrait y landscape, y cualquier touch-only)
    // independientemente del ancho de pantalla.
    const mqTouch = window.matchMedia("(hover: none)")
    const mqTabletWidth = window.matchMedia("(min-width: 768px) and (max-width: 1023px)")

    const evaluate = () => setIsTablet(mqTouch.matches || mqTabletWidth.matches)
    evaluate()

    mqTouch.addEventListener("change", evaluate)
    mqTabletWidth.addEventListener("change", evaluate)
    return () => {
      mqTouch.removeEventListener("change", evaluate)
      mqTabletWidth.removeEventListener("change", evaluate)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  // Cerrar dropdown tablet al hacer click fuera
  useEffect(() => {
    if (!isTablet || activeMenu === null) return
    const handleClickOutside = () => setActiveMenu(null)
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isTablet, activeMenu])

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent, label: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setActiveMenu(activeMenu === label ? null : label)
    }
    if (e.key === "Escape") {
      setActiveMenu(null)
    }
  }

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)
  const closeMobileMenu = () => setMobileMenuOpen(false)

  const toggleMobileExpand = (label: string) => {
    setMobileExpanded(mobileExpanded === label ? null : label)
  }

  const isMenuOpen = activeMenu !== null

  return (
    <nav
      className={[
        "navbar",
        (scrolled || isMenuOpen) ? "navbar--scrolled" : "navbar--transparent",
      ].join(" ")}
    >
      <div className="navbar__inner">
        {/* Logo */}
        <Link href="/" className="navbar__logo">
          <Image
            src="/images/logos/Logo-horizontal-sf.webp"
            alt="Islamontana Travel"
            width={180}
            height={50}
            priority
            className="navbar__logo-img"
          />
        </Link>

        {/* Desktop / Tablet links */}
        <div className="navbar__links navbar__links--desktop">
          {navData.map((link) => (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={() => !isTablet && link.subItems.length > 0 ? openMenu(link.label) : undefined}
              onMouseLeave={() => !isTablet ? closeMenu() : undefined}
            >
              {/* Tablet: botón que despliega dropdown; Desktop: link con hover megamenu */}
              {isTablet && link.subItems.length > 0 ? (
                <button
                  className="navbar__link navbar__link--has-sub"
                  aria-expanded={activeMenu === link.label}
                  aria-haspopup="true"
                  onClick={(e) => { e.stopPropagation(); toggleTabletDropdown(link.label) }}
                  onKeyDown={(e) => handleKeyDown(e, link.label)}
                >
                  {link.label}
                  <span
                    className="navbar__link-arrow"
                    aria-hidden="true"
                    style={{
                      display: "inline-block",
                      marginLeft: 4,
                      transition: "transform 0.2s ease",
                      transform: activeMenu === link.label ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >▾</span>
                </button>
              ) : (
                <Link
                  href={link.href}
                  className="navbar__link"
                  aria-expanded={link.subItems.length > 0 ? activeMenu === link.label : undefined}
                  aria-haspopup={link.subItems.length > 0 ? "true" : undefined}
                  onKeyDown={(e) => link.subItems.length > 0 ? handleKeyDown(e, link.label) : undefined}
                >
                  {link.label}
                </Link>
              )}

              {/* Tablet: dropdown simple inline */}
              {isTablet && link.subItems.length > 0 && (
                <div
                  className={["navbar__tablet-dropdown", activeMenu === link.label ? "navbar__tablet-dropdown--open" : ""].join(" ")}
                  onClick={(e) => e.stopPropagation()}
                >
                  {link.subItems.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="navbar__tablet-dropdown-item"
                      onClick={() => setActiveMenu(null)}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}

              {/* Desktop: MegaMenu hover */}
              {!isTablet && link.subItems.length > 0 && (
                <MegaMenu
                  items={link.subItems}
                  isOpen={activeMenu === link.label}
                  parentLabel={link.label}
                  onMouseEnter={() => openMenu(link.label)}
                  onMouseLeave={closeMenu}
                />
              )}
            </div>
          ))}
          <Link href="/contact" className="navbar__cta">
            Reservar
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className={["navbar__hamburger", mobileMenuOpen ? "navbar__hamburger--open" : ""].join(" ")}
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileMenuOpen}
        >
          <span className="navbar__hamburger-line"></span>
          <span className="navbar__hamburger-line"></span>
          <span className="navbar__hamburger-line"></span>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={["navbar__drawer", mobileMenuOpen ? "navbar__drawer--open" : ""].join(" ")}
        onClick={closeMobileMenu}
      >
        <div className="navbar__drawer-content" onClick={(e) => e.stopPropagation()}>
          <div className="navbar__drawer-links">
            {navData.map((link) => (
              <div key={link.label}>
                {link.subItems.length > 0 ? (
                  <>
                    <button
                      className="navbar__drawer-link w-full text-left flex items-center justify-between"
                      onClick={() => toggleMobileExpand(link.label)}
                      aria-expanded={mobileExpanded === link.label}
                    >
                      <span>{link.label}</span>
                      <span
                        className="transition-transform duration-200"
                        style={{
                          display: "inline-block",
                          transform: mobileExpanded === link.label ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      >
                        ▾
                      </span>
                    </button>
                    {mobileExpanded === link.label && (
                      <div className="pl-4 pb-2">
                        {link.subItems.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="navbar__drawer-link block text-sm py-2"
                            onClick={closeMobileMenu}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="navbar__drawer-link"
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/contact"
              className="navbar__drawer-cta"
              onClick={closeMobileMenu}
            >
              Reservar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
