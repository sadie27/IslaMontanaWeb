import DestinationMapAnimationWrapper from '@/components/destinations/DestinationMapAnimationWrapper';

export const metadata = {
  title: 'Destinos — Islamontana Travel',
  description:
    'Descubre los cuatro mundos de Ecuador: Galápagos, Amazonía, Andes Cultural y Andes Naturaleza. Viajes de naturaleza de alto impacto con Islamontana Travel.',
};

export default function DestinationsPage() {
  return (
    <main id="main-content" className="bg-[#0a1a09] min-h-[100dvh]">
      {/* ── Hero section ───────────────────────────────────────── */}
      <section aria-labelledby="destinations-heading" className="relative">
        {/* Grain overlay */}
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          }}
        />

        {/* Asymmetric header */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pb-20 relative z-10" style={{ paddingTop: 'calc(var(--nav-height) + clamp(40px, 6vw, 80px))' }}>
          {/* Eyebrow label */}
          <span className="uppercase text-xs tracking-[0.2em] text-[var(--color-accent)] mb-6 block animate-fade-up">
            Nuestros Destinos
          </span>

          <h1
            id="destinations-heading"
            className="font-[family-name:var(--font-outfit)] tracking-tighter leading-none font-black text-white mb-6 max-w-2xl animate-fade-up"
            style={{ animationDelay: '80ms', fontSize: 'clamp(36px, 7vw, 96px)' }}
          >
            Ecuador,
            <br />
            cuatro mundos.
          </h1>

          <p
            className="font-light text-white/70 max-w-[52ch] animate-fade-up"
            style={{ animationDelay: '160ms', fontSize: 'clamp(15px, 1.4vw, 20px)' }}
          >
            Desde archipiélagos volcánicos hasta selvas primarias y cumbres
            andinas. Elige tu forma de descubrir el país más biodiverso del
            planeta.
          </p>
        </div>

        {/* Accent separator */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pb-16 relative z-10">
          <div className="h-px bg-[var(--color-accent)]/30 w-full" />
        </div>
      </section>

      {/* ── Scroll-driven map animation ────────────────────────── */}
      <DestinationMapAnimationWrapper />
    </main>
  );
}
