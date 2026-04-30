"use client"

import Link from "next/link"
import type { NavItem } from "@/lib/types"
import { ROUTES } from "@/config/routes"

interface MobileDrawerProps {
  navData: NavItem[]
  mobileOpen: boolean
  mobileExpanded: string | null
  closeMobile: () => void
  toggleMobileExpand: (label: string) => void
}

export default function MobileDrawer({
  navData,
  mobileOpen,
  mobileExpanded,
  closeMobile,
  toggleMobileExpand,
}: MobileDrawerProps) {
  return (
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
  )
}
