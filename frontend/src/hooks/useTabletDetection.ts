import { useState, useEffect } from "react"

export function useTabletDetection(): boolean {
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
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

  return isTablet
}
