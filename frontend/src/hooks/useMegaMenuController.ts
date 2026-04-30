import { useState, useEffect, useRef, useCallback } from "react"

interface MegaMenuController {
  activeMenu: string | null
  openMenu: (label: string) => void
  closeMenu: () => void
  toggleTabletDropdown: (label: string) => void
  handleKeyDown: (e: React.KeyboardEvent, label: string) => void
}

export function useMegaMenuController(isTablet: boolean): MegaMenuController {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
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

  const handleKeyDown = useCallback((e: React.KeyboardEvent, label: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setActiveMenu((prev) => (prev === label ? null : label))
    }
    if (e.key === "Escape") {
      setActiveMenu(null)
    }
  }, [])

  // Close tablet dropdown on outside click
  useEffect(() => {
    if (!isTablet || activeMenu === null) return
    const handleClickOutside = () => setActiveMenu(null)
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isTablet, activeMenu])

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    }
  }, [])

  return { activeMenu, openMenu, closeMenu, toggleTabletDropdown, handleKeyDown }
}
