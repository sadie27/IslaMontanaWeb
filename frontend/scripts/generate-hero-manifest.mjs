#!/usr/bin/env node

/* ── scripts/generate-hero-manifest.mjs ────────────────────
   Script que genera automáticamente:
   1. Variantes redimensionadas de cada imagen del Hero (srcset real,
      sin depender del optimizador de servidor de next/image — el sitio
      es un export estático y el loader personalizado solo hace passthrough).
   2. El manifiesto estático src/config/hero-images.ts con
      { src, srcset, alt } por imagen, leyendo:
      - public/images/hero-main/computer/
      - public/images/hero-main/mobile/

   Uso: npm run generate:hero
──────────────────────────────────────────────────────────── */

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { HERO_ALT_TEXT, HERO_ALT_FALLBACK } from './hero-alt-text.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'images', 'hero-main')
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'config', 'hero-images.ts')

// Anchos de las variantes generadas para srcset. El navegador elige la que
// mejor encaje según el viewport real, en vez de descargar siempre el
// original a tamaño completo.
const COMPUTER_WIDTHS = [768, 1280, 1920]
const MOBILE_WIDTHS = [480, 768, 1080]

async function resizeVariant(srcPath, destPath, width) {
  const image = sharp(srcPath)
  const metadata = await image.metadata()

  // No ampliar imágenes más pequeñas que el ancho objetivo.
  if (metadata.width && metadata.width <= width) {
    fs.copyFileSync(srcPath, destPath)
    return
  }

  await sharp(srcPath).resize({ width }).webp({ quality: 82 }).toFile(destPath)
}

async function processImages(dirName, widths) {
  const dirPath = path.join(PUBLIC_DIR, dirName)

  if (!fs.existsSync(dirPath)) {
    console.warn(`⚠️  Carpeta no encontrada: ${dirPath}`)
    return []
  }

  const resizedDir = path.join(dirPath, 'resized')
  fs.mkdirSync(resizedDir, { recursive: true })

  const files = fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith('.webp'))
    .sort()

  const entries = []

  for (const file of files) {
    const srcPath = path.join(dirPath, file)
    const publicSrc = `/images/hero-main/${dirName}/${file}`
    const baseName = file.replace(/\.webp$/, '')

    const srcsetParts = []
    for (const width of widths) {
      const variantName = `${baseName}-${width}w.webp`
      const destPath = path.join(resizedDir, variantName)
      await resizeVariant(srcPath, destPath, width)
      srcsetParts.push(`/images/hero-main/${dirName}/resized/${variantName} ${width}w`)
    }

    entries.push({
      src: publicSrc,
      srcset: srcsetParts.join(', '),
      alt: HERO_ALT_TEXT[file] ?? HERO_ALT_FALLBACK,
    })
  }

  return entries
}

function formatEntry(entry) {
  return `    { src: '${entry.src}', srcset: '${entry.srcset}', alt: '${entry.alt.replace(/'/g, "\\'")}' },`
}

async function generateManifest() {
  console.log('🔍 Leyendo y redimensionando imágenes del Hero...\n')

  const computerImages = await processImages('computer', COMPUTER_WIDTHS)
  const mobileImages = await processImages('mobile', MOBILE_WIDTHS)

  console.log(`📁 Computer (desktop): ${computerImages.length} imágenes`)
  computerImages.forEach((img) => console.log(`   - ${img.src}`))

  console.log(`\n📱 Mobile: ${mobileImages.length} imágenes`)
  mobileImages.forEach((img) => console.log(`   - ${img.src}`))

  const fileContent = `/* ── config/hero-images.ts ─────────────────────────────────
   Manifiesto estático de imágenes del Hero.

   IMPORTANTE: Este archivo se genera automáticamente.
   Ejecutar: npm run generate:hero
   cada vez que agregues o elimines imágenes en:
   - /public/images/hero-main/computer/ (landscape desktop)
   - /public/images/hero-main/mobile/   (portrait mobile)

   Cada entrada incluye \`srcset\` con variantes redimensionadas reales
   (generadas en build con sharp) y \`alt\` descriptivo — ver
   scripts/hero-alt-text.mjs para el mapeo de alt text por fichero.
──────────────────────────────────────────────────────────── */

export interface HeroImage {
  src: string
  srcset: string
  alt: string
}

export const heroImages: { computer: HeroImage[]; mobile: HeroImage[] } = {
  computer: [
${computerImages.map(formatEntry).join('\n')}
  ],
  mobile: [
${mobileImages.map(formatEntry).join('\n')}
  ],
}
`

  fs.writeFileSync(OUTPUT_FILE, fileContent, 'utf-8')

  console.log(`\n✅ Manifiesto generado: ${path.relative(process.cwd(), OUTPUT_FILE)}`)
  console.log(`📊 Total: ${computerImages.length + mobileImages.length} imágenes\n`)
}

try {
  await generateManifest()
} catch (error) {
  console.error('❌ Error generando manifiesto:', error)
  process.exit(1)
}
