"use client"

import { useState } from "react"
import Image from "next/image"

interface MegaMenuImageProps {
  src: string
  alt: string
  fallbackColor: string
  style?: React.CSSProperties
}

export default function MegaMenuImage({ src, alt, fallbackColor, style }: MegaMenuImageProps) {
  const [failed, setFailed] = useState(false)

  return (
    <>
      {!failed && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover"
          style={style}
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backgroundColor: fallbackColor,
            opacity: 0,
            animation: "megaMenuFallbackFadeIn 200ms ease forwards",
          }}
        >
          <span className="text-xs font-medium text-white/40 uppercase tracking-widest text-center px-4">
            {alt}
          </span>
        </div>
      )}
      <style>{`
        @keyframes megaMenuFallbackFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </>
  )
}
