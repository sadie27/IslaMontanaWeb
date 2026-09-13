#!/usr/bin/env node

/* ── scripts/generate-icons.mjs ─────────────────────────────
   Genera el set completo de iconos del sitio (favicon multi-tamaño,
   apple-touch-icon, iconos PWA) a partir del logo cuadrado fuente,
   y el fichero site.webmanifest.

   Uso: npm run generate:icons
──────────────────────────────────────────────────────────── */

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SOURCE_LOGO = path.join(__dirname, '..', 'public', 'images', 'logos', 'logo-simple.webp')
const PUBLIC_DIR = path.join(__dirname, '..', 'public')

const PNG_SIZES = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
]

async function generateIcons() {
  if (!fs.existsSync(SOURCE_LOGO)) {
    console.error(`❌ Logo fuente no encontrado: ${SOURCE_LOGO}`)
    process.exit(1)
  }

  console.log('🎨 Generando iconos desde logo-simple.webp...\n')

  for (const { name, size } of PNG_SIZES) {
    const outPath = path.join(PUBLIC_DIR, name)
    await sharp(SOURCE_LOGO).resize(size, size).png().toFile(outPath)
    console.log(`   ✅ ${name} (${size}x${size})`)
  }

  // favicon.ico multi-resolución (16 + 32) — sharp no exporta .ico directamente,
  // así que reusamos el favicon.ico existente si ya está bien formado y solo
  // generamos los PNG modernos (referenciados explícitamente en metadata.icons).
  console.log('\nℹ️  favicon.ico existente se mantiene sin cambios (los navegadores modernos usan los PNG).')

  const manifest = {
    name: 'Islamontana Travel',
    short_name: 'Islamontana',
    description:
      'Agencia de viajes especializada en turismo de naturaleza en Ecuador: Galápagos, Amazonía y los Andes.',
    icons: [
      { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    theme_color: '#1a7a5a',
    background_color: '#ffffff',
    display: 'standalone',
    start_url: '.',
  }

  fs.writeFileSync(
    path.join(PUBLIC_DIR, 'site.webmanifest'),
    JSON.stringify(manifest, null, 2) + '\n',
    'utf-8'
  )
  console.log('   ✅ site.webmanifest')

  console.log('\n✅ Iconos generados en /public\n')
}

try {
  await generateIcons()
} catch (error) {
  console.error('❌ Error generando iconos:', error)
  process.exit(1)
}
