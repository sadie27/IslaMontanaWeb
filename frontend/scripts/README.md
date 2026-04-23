# Scripts del Proyecto

## generate-hero-manifest.mjs

Script que genera automáticamente el manifiesto estático de imágenes del Hero.

### Uso

```bash
npm run generate:hero
```

### ¿Cuándo ejecutarlo?

Ejecuta este script cada vez que:
- Agregues nuevas imágenes a `/public/images/hero-main/computer/` o `/public/images/hero-main/mobile/`
- Elimines imágenes de estas carpetas
- Renombres archivos de imagen

### Qué hace

1. Lee las carpetas:
   - `public/images/hero-main/computer/` (imágenes landscape para desktop)
   - `public/images/hero-main/mobile/` (imágenes portrait para mobile)

2. Filtra solo archivos `.webp`

3. Genera automáticamente el archivo `src/config/hero-images.ts` con las rutas públicas

### Salida esperada

```
🔍 Leyendo imágenes del Hero...

📁 Computer (desktop): 3 imágenes
   - /images/hero-main/computer/lobitos.webp
   - /images/hero-main/computer/paisaje.webp
   - /images/hero-main/computer/piquero.webp

📱 Mobile (mobile): 2 imágenes
   - /images/hero-main/mobile/lobito.webp
   - /images/hero-main/mobile/piqueros.webp

✅ Manifiesto generado: src/config/hero-images.ts
📊 Total: 5 imágenes
```

### Notas

- El script usa módulos ES6 (`.mjs`)
- No requiere dependencias externas, solo Node.js nativo
- Las imágenes se ordenan alfabéticamente en el manifiesto

### Pendiente — Typo en directorio

El directorio actualmente se llama `movile/` (typo). Antes de usar este script, renombrar:

```bash
# En el directorio public/images/hero-main/
mv movile mobile
```

Y actualizar la referencia en `src/config/hero-images.ts` de `movile` a `mobile`. El script también usa el nombre del directorio internamente — verificar que quede consistente.
