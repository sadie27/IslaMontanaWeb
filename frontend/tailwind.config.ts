import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      colors: {
        // Verde de marca real — usa var(--color-primary) del CSS. `brand` (no `primary`)
        // para no chocar con la convención Tailwind por defecto de "primary = color de marca".
        brand: {
          DEFAULT: "#3aa023",
          dark: "#0d200c",
          accent: "#abd430",
        },
        // Renombrada desde `primary`: esta escala es azul y no tiene relación con la marca.
        sky: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
      },
    },
  },
  plugins: [],
}
export default config
