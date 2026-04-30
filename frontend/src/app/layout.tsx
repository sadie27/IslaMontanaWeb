import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import "@/styles/globals.css"
import type { NavItem } from "@/lib/types"
import { getNavMenu } from "@/lib/api"
import { adaptNavItem } from "@/lib/adapters"
import { ROUTES } from "@/config/routes"
import { ASSETS } from "@/config/assets"

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
})

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const metadata: Metadata = {
  title: "Islamontana Travel",
  description:
    "Agencia de viajes especializada en turismo de naturaleza en Ecuador. Tours a Galápagos, Amazonía, Andes y Costa del Pacífico.",
  icons: {
    icon: `${base}/favicon.ico`,
  },
}

const fallbackNavData: NavItem[] = [
  {
    label: "Inicio",
    href: ROUTES.HOME,
    subItems: [],
  },
  {
    label: "Destinos",
    href: ROUTES.DESTINATIONS,
    subItems: [
      { label: "Galápagos",        description: "Fauna única en el mundo",   href: ROUTES.DESTINATION('galapagos'),       image: ASSETS.MEGA_MENU.GALAPAGOS },
      { label: "Amazonía",         description: "Selva virgen ecuatorial",    href: ROUTES.DESTINATION('amazonia'),        image: ASSETS.MEGA_MENU.AMAZONIA },
      { label: "Andes Cultural",   description: "Cultura viva andina",        href: ROUTES.DESTINATION('andes-cultura'),   image: ASSETS.MEGA_MENU.COSTA },
      { label: "Andes Naturaleza", description: "Páramos y volcanes",         href: ROUTES.DESTINATION('andes-naturaleza'), image: ASSETS.MEGA_MENU.ANDES_NATURALEZA },
    ],
  },
  {
    label: "Experiencias",
    href: ROUTES.EXPERIENCES,
    subItems: [
      { label: "Cruceros",     description: "Navega las Galápagos",    href: ROUTES.EXPERIENCE('cruceros'),     image: ASSETS.MEGA_MENU.GALAPAGOS },
      { label: "Circuitos",   description: "Rutas a tu medida",        href: ROUTES.EXPERIENCE('circuitos'),    image: ASSETS.MEGA_MENU.ANDES_NATURALEZA },
      { label: "Day Tours",   description: "Escápate un día",          href: ROUTES.EXPERIENCE('day-tours'),    image: ASSETS.MEGA_MENU.COSTA },
      { label: "Birdwatching", description: "Aves únicas del Ecuador", href: ROUTES.EXPERIENCE('birdwatching'), image: ASSETS.MEGA_MENU.AMAZONIA },
    ],
  },
  {
    label: "Galería",
    href: ROUTES.GALLERY,
    subItems: [
      { label: "Fauna & Wildlife", description: "Vida silvestre única",    href: ROUTES.GALLERY_CATEGORY('fauna-wildlife'), image: ASSETS.MEGA_MENU.GALAPAGOS },
      { label: "Paisajes",         description: "Volcanes, selva, océano", href: ROUTES.GALLERY_CATEGORY('paisajes'),        image: ASSETS.MEGA_MENU.ANDES_NATURALEZA },
      { label: "Cultura",          description: "Haciendas, mercados, gente", href: ROUTES.GALLERY_CATEGORY('cultura'),     image: ASSETS.MEGA_MENU.COSTA },
      { label: "Aventura",         description: "Buceo, trekking, birdwatching", href: ROUTES.GALLERY_CATEGORY('aventura'), image: ASSETS.MEGA_MENU.AMAZONIA },
    ],
  },
  {
    label: "Nosotros",
    href: ROUTES.ABOUT,
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
