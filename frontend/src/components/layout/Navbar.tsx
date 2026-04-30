"use client"

import Link from "next/link"
import Image from "next/image"
import MegaMenu from "./MegaMenu"
import type { NavItem } from "@/lib/types"
import { ROUTES } from "@/config/routes"
import { ASSETS } from "@/config/assets"
import { useScrollState } from "@/hooks/useScrollState"
import { useTabletDetection } from "@/hooks/useTabletDetection"
import { useMegaMenuController } from "@/hooks/useMegaMenuController"
import { useBodyOverflowLock } from "@/hooks/useBodyOverflowLock"
import { useMobileMenuState } from "@/hooks/useMobileMenuState"

interface NavbarProps {
  navData: NavItem[]
}

export default function Navbar({ navData }: NavbarProps) {
  const scrolled = useScrollState()
  const isTablet = useTabletDetection()
  const { activeMenu, openMenu, closeMenu, toggleTabletDropdown, handleKeyDown } = useMegaMenuController(isTablet)
  const { mobileOpen, mobileExpanded, toggleMobile, closeMobile, toggleMobileExpand } = useMobileMenuState()
  useBodyOverflowLock(mobileOpen)

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
        <Link href={ROUTES.HOME} className="navbar__logo">
          <Image
            src={ASSETS.LOGOS.HORIZONTAL}
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
                      onClick={() => toggleTabletDropdown(link.label)}
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
          <Link href={ROUTES.CONTACT} className="navbar__cta">
            Reservar
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className={["navbar__hamburger", mobileOpen ? "navbar__hamburger--open" : ""].join(" ")}
          onClick={toggleMobile}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
        >
          <span className="navbar__hamburger-line"></span>
          <span className="navbar__hamburger-line"></span>
          <span className="navbar__hamburger-line"></span>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={["navbar__drawer", mobileOpen ? "navbar__drawer--open" : ""].join(" ")}
        onClick={closeMobile}
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
                            onClick={closeMobile}
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
                    onClick={closeMobile}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href={ROUTES.CONTACT}
              className="navbar__drawer-cta"
              onClick={closeMobile}
            >
              Reservar
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
