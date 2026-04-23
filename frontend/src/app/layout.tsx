import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import "@/styles/globals.css"
import type { NavItem } from "@/lib/types"
import { getNavMenu } from "@/lib/api"
import { adaptNavItem } from "@/lib/adapters"

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Islamontana Travel",
  description:
    "Agencia de viajes especializada en turismo de naturaleza en Ecuador. Tours a Galápagos, Amazonía, Andes y Costa del Pacífico.",
  icons: {
    icon: "/favicon.ico",
  },
}

const fallbackNavData: NavItem[] = [
  {
    label: "Inicio",
    href: "/",
    subItems: [],
  },
  {
    label: "Destinos",
    href: "/destinations",
    subItems: [
      { label: "Galápagos",        description: "Fauna única en el mundo",   href: "/destinations/galapagos",       image: "/images/mega-menu/galapagos.webp" },
      { label: "Amazonía",         description: "Selva virgen ecuatorial",    href: "/destinations/amazonia",        image: "/images/mega-menu/amazonia.webp" },
      { label: "Andes Cultural",   description: "Cultura viva andina",        href: "/destinations/andes-cultura",   image: "/images/mega-menu/andes-cultura.webp" },
      { label: "Andes Naturaleza", description: "Páramos y volcanes",         href: "/destinations/andes-naturaleza", image: "/images/mega-menu/andes-naturaleza.webp" },
    ],
  },
  {
    label: "Experiencias",
    href: "/experiences",
    subItems: [
      { label: "Cruceros",     description: "Navega las Galápagos",    href: "/experiences/cruceros",     image: "/images/mega-menu/cruceros.webp" },
      { label: "Circuitos",   description: "Rutas a tu medida",        href: "/experiences/circuitos",    image: "/images/mega-menu/circuitos.webp" },
      { label: "Day Tours",   description: "Escápate un día",          href: "/experiences/day-tours",    image: "/images/mega-menu/day-tours.webp" },
      { label: "Birdwatching", description: "Aves únicas del Ecuador", href: "/experiences/birdwatching", image: "/images/mega-menu/birdwatching.webp" },
    ],
  },
  {
    label: "Galería",
    href: "/gallery",
    subItems: [
      { label: "Fauna & Wildlife", description: "Vida silvestre única",    href: "/gallery?category=fauna-wildlife", image: "/images/mega-menu/gallery-fauna.webp" },
      { label: "Paisajes",         description: "Volcanes, selva, océano", href: "/gallery?category=paisajes",        image: "/images/mega-menu/gallery-paisajes.webp" },
      { label: "Cultura",          description: "Haciendas, mercados, gente", href: "/gallery?category=cultura",     image: "/images/mega-menu/gallery-cultura.webp" },
      { label: "Aventura",         description: "Buceo, trekking, birdwatching", href: "/gallery?category=aventura", image: "/images/mega-menu/gallery-aventura.webp" },
    ],
  },
  {
    label: "Nosotros",
    href: "/about",
    subItems: [],
  },
]

async function getNavMenuData(): Promise<NavItem[]> {
  const raw = await getNavMenu()
  if (raw.length > 0) {
    return raw.map(adaptNavItem)
  }
  return fallbackNavData
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navData = await getNavMenuData()

  return (
    <html lang="es" className={outfit.variable}>
      <body>
        <Navbar navData={navData} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
