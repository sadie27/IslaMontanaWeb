#!/usr/bin/env node

/* ── scripts/generate-image-variants.mjs ────────────────────
   Genera variantes redimensionadas (srcset real) para las imágenes de
   contenido servidas vía next/image con el loader personalizado
   (src/lib/image-loader.ts). Necesario porque el sitio es un export
   estático: no hay servidor que redimensione bajo demanda, así que las
   variantes tienen que existir ya en disco en build time.

   Escanea las carpetas de public/images/ listadas en CONTENT_DIRS,
   genera <nombre>-<ancho>w.webp en una subcarpeta resized/ junto a cada
   original, y escribe un manifiesto (src/config/image-variants.json)
   que el loader usa para mapear (src, width pedido) -> variante real.

   No toca /images/hero-main/ (tiene su propio pipeline, ver
   generate-hero-manifest.mjs) ni /images/logos/ o /images/footer/
   (logos e ilustraciones vectoriales/pequeñas, no lo necesitan).

   Uso: npm run generate:image-variants
──────────────────────────────────────────────────────────── */

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const IMAGES_ROOT = path.join(__dirname, '..', 'public', 'images')
const MANIFEST_FILE = path.join(__dirname, '..', 'src', 'config', 'image-variants.json')

// Carpetas de contenido a procesar. Cada una es relativa a public/images/.
const CONTENT_DIRS = ['amazonia', 'galapagos', 'mega-menu', 'andes-cultura', 'andes-naturaleza', 'tours']

// Anchos objetivo — cubren mega-menu (pequeño), cards (medio) y hero-like
// full-bleed (grande). El loader elige el más pequeño que sea >= al width
// que next/image pide.
const WIDTHS = [400, 800, 1200, 1920]

function listImages(dirPath) {
  if (!fs.existsSync(dirPath)) return []
  return fs
    .readdirSync(dirPath)
    .filter((f) => /\.(webp|jpg|jpeg|png)$/i.test(f) && !fs.statSync(path.join(dirPath, f)).isDirectory())
}

async function generateVariant(srcPath, destPath, width) {
  const metadata = await sharp(srcPath).metadata()
  if (metadata.width && metadata.width <= width) {
    fs.copyFileSync(srcPath, destPath)
    return
  }
  await sharp(srcPath).resize({ width }).webp({ quality: 82 }).toFile(destPath)
}

async function processDir(relDir) {
  const dirPath = path.join(IMAGES_ROOT, relDir)
  const files = listImages(dirPath)
  if (files.length === 0) return {}

  const resizedDir = path.join(dirPath, 'resized')
  fs.mkdirSync(resizedDir, { recursive: true })

  const manifestForDir = {}

  for (const file of files) {
    const srcPath = path.join(dirPath, file)
    const publicSrc = `/images/${relDir}/${file}`
    const ext = path.extname(file)
    const baseName = file.slice(0, -ext.length)

    const variants = {}
    for (const width of WIDTHS) {
      const variantName = `${baseName}-${width}w.webp`
      const destPath = path.join(resizedDir, variantName)
      await generateVariant(srcPath, destPath, width)
      variants[width] = `/images/${relDir}/resized/${variantName}`
    }

    manifestForDir[publicSrc] = variants
    console.log(`   ✅ ${publicSrc} → ${WIDTHS.length} variantes`)
  }

  return manifestForDir
}

async function main() {
  console.log('🖼️  Generando variantes de imágenes de contenido...\n')

  let manifest = {}
  for (const dir of CONTENT_DIRS) {
    console.log(`📁 ${dir}/`)
    const dirManifest = await processDir(dir)
    manifest = { ...manifest, ...dirManifest }
  }

  fs.mkdirSync(path.dirname(MANIFEST_FILE), { recursive: true })
  fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2) + '\n', 'utf-8')

  console.log(`\n✅ Manifiesto de variantes: ${path.relative(process.cwd(), MANIFEST_FILE)}`)
  console.log(`📊 Total: ${Object.keys(manifest).length} imágenes procesadas\n`)
}

try {
  await main()
} catch (error) {
  console.error('❌ Error generando variantes de imágenes:', error)
  process.exit(1)
}
