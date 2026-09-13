import type { Metadata } from "next"
import localFont from "next/font/local"
import { Bebas_Neue } from "next/font/google"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import "@/styles/globals.css"
import type { NavItem } from "@/lib/types"
import { getNavMenu } from "@/lib/api"
import { adaptNavItem } from "@/lib/adapters"
import { ROUTES } from "@/config/routes"
import { ASSETS } from "@/config/assets"

const switzer = localFont({
  src: "../fonts/Switzer-Variable.woff2",
  variable: "--font-outfit",
  display: "swap",
  weight: "300 900",
})

const bebas = Bebas_Neue({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
  variable: "--font-bebas",
})

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const metadata: Metadata = {
  title: "Islamontana Travel",
  description:
    "Agencia de viajes especializada en turismo de naturaleza en Ecuador. Expertos en Galápagos, nuestro destino insignia, con tours también a la Amazonía y los Andes.",
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
    subItems: [],
  },
  {
    label: "Galería",
    href: ROUTES.GALLERY,
    subItems: [],
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
    <html lang="es" className={`${switzer.variable} ${bebas.variable}`}>
      <body>
        <Navbar navData={navData} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
