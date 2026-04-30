import { useState, useEffect, useCallback } from "react"

interface MobileMenuState {
  mobileOpen: boolean
  mobileExpanded: string | null
  openMobile: () => void
  closeMobile: () => void
  toggleMobile: () => void
  toggleMobileExpand: (label: string) => void
}

export function useMobileMenuState(): MobileMenuState {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)

  const openMobile = useCallback(() => setMobileOpen(true), [])
  const closeMobile = useCallback(() => setMobileOpen(false), [])
  const toggleMobile = useCallback(() => setMobileOpen((prev) => !prev), [])

  const toggleMobileExpand = useCallback((label: string) => {
    setMobileExpanded((prev) => (prev === label ? null : label))
  }, [])

  // Close on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Close on Escape key
  useEffect(() => {
    if (!mobileOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [mobileOpen])

  return { mobileOpen, mobileExpanded, openMobile, closeMobile, toggleMobile, toggleMobileExpand }
}
