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
import { SITE_URL, SITE_NAME, SITE_LOCALE } from "@/config/site"

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

const description =
  "Agencia de viajes a medida en Ecuador, especializada en Galápagos. Un equipo pequeño que diseña tu itinerario contigo y te acompaña antes, durante y después del viaje."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Sin `template`: cada página construye su propio título completo
  // (incluyendo "— Islamontana Travel") — un template aquí duplicaría el
  // sufijo de marca en esos títulos. `title` es solo el fallback para
  // páginas que no exporten metadata propio.
  title: SITE_NAME,
  description,
  icons: {
    icon: [
      { url: `${base}/favicon.ico` },
      { url: `${base}/favicon-16x16.png`, sizes: '16x16', type: 'image/png' },
      { url: `${base}/favicon-32x32.png`, sizes: '32x32', type: 'image/png' },
    ],
    apple: `${base}/apple-touch-icon.png`,
  },
  manifest: `${base}/site.webmanifest`,
  openGraph: {
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}${ASSETS.LOGOS.HORIZONTAL}`,
  description,
  areaServed: {
    "@type": "Country",
    name: "Ecuador",
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <Navbar navData={navData} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
