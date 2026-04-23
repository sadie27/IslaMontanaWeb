'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface DestinationCardProps {
  href: string;
  imageSrc: string;
  imageAlt: string;
  imageExists: boolean;
  label: string;
  title: string;
  description: string;
  index: number;
  aspectClass: string;
  colSpanClass: string;
  priority?: boolean;
  hideDescription?: boolean;
}

export default function DestinationCard({
  href,
  imageSrc,
  imageAlt,
  imageExists,
  label,
  title,
  description,
  index,
  aspectClass,
  colSpanClass,
  priority = false,
  hideDescription = false,
}: DestinationCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 120);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <li
      ref={cardRef}
      className={`${colSpanClass} ${aspectClass} overflow-hidden rounded-2xl relative bg-[var(--color-dark)] ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      } transition-all duration-700 ease-out`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <Link
        href={href}
        role="article"
        aria-label={`Ir a ${title}`}
        className="group block w-full h-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
      >
        {/* Image layer */}
        <div className="absolute inset-0 bg-[var(--color-dark)] overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 850px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority={priority}
            {...(!imageExists && {
              blurDataURL:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
              placeholder: 'blur' as const,
            })}
          />
        </div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 transition-all duration-500 ease-out"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.20) 50%, transparent 100%)',
          }}
          aria-hidden="true"
        />
        {/* Hover overlay — darker bottom */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        {/* Card content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10">
          {/* "Explorar" button — hidden until hover */}
          <div
            className="mb-4 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out"
            aria-hidden="true"
          >
            <span className="inline-flex items-center gap-2 text-sm font-medium text-white border border-white/30 rounded-full px-4 py-1.5 backdrop-blur-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors duration-300">
              Explorar &rarr;
            </span>
          </div>

          {/* Label */}
          <span className="uppercase text-xs tracking-[0.2em] text-[var(--color-accent)] mb-2 block">
            {label}
          </span>

          {/* Title */}
          <h2 className="font-[family-name:var(--font-outfit)] text-2xl md:text-3xl font-black text-white leading-tight tracking-tight mb-2">
            {title}
          </h2>

          {/* Description */}
          {!hideDescription && (
            <p className="text-sm font-light text-white/70 leading-relaxed line-clamp-3">
              {description}
            </p>
          )}
        </div>
      </Link>
    </li>
  );
}
