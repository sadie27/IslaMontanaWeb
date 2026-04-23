/* ── hooks/useHeroImages.ts ────────────────────────────────
   Hook que gestiona las imágenes del Hero:
   - Carga del manifiesto estático de imágenes
   - Detección de mobile/desktop con debounce en resize
   - Rotación automática cada 5 segundos
   - Precarga de TODAS las imágenes del set activo al montar
──────────────────────────────────────────────────────────── */

'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { heroImages } from '@/config/hero-images'

interface UseHeroImagesReturn {
  images: string[]
  currentIndex: number
}

const MOBILE_BREAKPOINT = 768
const ROTATION_INTERVAL = 5000 // 5 segundos
const RESIZE_DEBOUNCE = 150

export function useHeroImages(): UseHeroImagesReturn {
  const [isMobile, setIsMobile] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const resizeTimerRef = useRef<NodeJS.Timeout | null>(null)
  const rotationTimerRef = useRef<NodeJS.Timeout | null>(null)
  const hasPreloadedRef = useRef(false)

  // Detectar si estamos en mobile
  const checkIfMobile = useCallback(() => {
    return typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT
  }, [])

  // Detectar mobile inicial al montar
  useEffect(() => {
    setIsMobile(checkIfMobile())
  }, [checkIfMobile])

  // Seleccionar el set de imágenes correcto según mobile/desktop
  const images = isMobile ? heroImages.movile : heroImages.computer

  // Precargar TODAS las imágenes del set activo al montar
  useEffect(() => {
    if (images.length === 0 || hasPreloadedRef.current) return

    images.forEach(src => {
      const img = new Image()
      img.src = src
    })

    hasPreloadedRef.current = true
  }, [images])

  // Listener de resize con debounce
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current)
      }

      resizeTimerRef.current = setTimeout(() => {
        const wasMobile = isMobile
        const nowMobile = checkIfMobile()

        if (wasMobile !== nowMobile) {
          setIsMobile(nowMobile)
          // Al cambiar de set, resetear al índice 0
          setCurrentIndex(0)
          // Permitir precarga del nuevo set
          hasPreloadedRef.current = false
        }
      }, RESIZE_DEBOUNCE)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current)
      }
    }
  }, [isMobile, checkIfMobile])

  // Rotación automática cada 5 segundos
  useEffect(() => {
    // No rotar si no hay imágenes o solo hay una
    if (images.length <= 1) return

    rotationTimerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length)
    }, ROTATION_INTERVAL)

    return () => {
      if (rotationTimerRef.current) {
        clearInterval(rotationTimerRef.current)
      }
    }
  }, [images.length])

  return {
    images,
    currentIndex,
  }
}
