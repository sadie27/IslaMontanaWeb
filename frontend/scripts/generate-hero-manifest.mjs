#!/usr/bin/env node

/* ── scripts/generate-hero-manifest.mjs ────────────────────
   Script que genera automáticamente el manifiesto estático
   de imágenes del Hero leyendo las carpetas:
   - public/images/hero-main/computer/
   - public/images/hero-main/mobile/

   Uso: npm run generate:hero
──────────────────────────────────────────────────────────── */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'images', 'hero-main')
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'config', 'hero-images.ts')

function readImagesFromDir(dirName) {
  const dirPath = path.join(PUBLIC_DIR, dirName)

  if (!fs.existsSync(dirPath)) {
    console.warn(`⚠️  Carpeta no encontrada: ${dirPath}`)
    return []
  }

  const files = fs.readdirSync(dirPath)
  const webpFiles = files
    .filter(file => file.endsWith('.webp'))
    .sort()
    .map(file => `/images/hero-main/${dirName}/${file}`)

  return webpFiles
}

function generateManifest() {
  console.log('🔍 Leyendo imágenes del Hero...\n')

  const computerImages = readImagesFromDir('computer')
  const mobileImages = readImagesFromDir('mobile')

  console.log(`📁 Computer (desktop): ${computerImages.length} imágenes`)
  computerImages.forEach(img => console.log(`   - ${img}`))

  console.log(`\n📱 Mobile: ${mobileImages.length} imágenes`)
  mobileImages.forEach(img => console.log(`   - ${img}`))

  const fileContent = `/* ── config/hero-images.ts ─────────────────────────────────
   Manifiesto estático de imágenes del Hero.

   IMPORTANTE: Este archivo se genera automáticamente.
   Ejecutar: npm run generate:hero
   cada vez que agregues o elimines imágenes en:
   - /public/images/hero-main/computer/ (landscape desktop)
   - /public/images/hero-main/mobile/   (portrait mobile)
──────────────────────────────────────────────────────────── */

export const heroImages = {
  computer: [
${computerImages.map(img => `    '${img}',`).join('\n')}
  ],
  mobile: [
${mobileImages.map(img => `    '${img}',`).join('\n')}
  ],
}
`

  fs.writeFileSync(OUTPUT_FILE, fileContent, 'utf-8')

  console.log(`\n✅ Manifiesto generado: ${path.relative(process.cwd(), OUTPUT_FILE)}`)
  console.log(`📊 Total: ${computerImages.length + mobileImages.length} imágenes\n`)
}

try {
  generateManifest()
} catch (error) {
  console.error('❌ Error generando manifiesto:', error)
  process.exit(1)
}
